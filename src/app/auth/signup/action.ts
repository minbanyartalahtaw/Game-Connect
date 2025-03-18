"use server"
{
  /*
  - Check if user exists
  - Encrypt password
  - Create User in User Collection
  - Create User in Account Collection
  */
}
import { db } from "@/app/libs/firebase";
import { hashPassword } from "@/app/libs/hash";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { cookies } from "next/headers";

export const signup = async (
  displayName: string,
  email: string,
  password: string,
  profile_id: Number,
) => {
    // check if user exits ---> return to f:73
    // i only check Ref.id because i use email email doc ID  in accounts
  const emailRef = doc(db, "accounts", email);
  const emailDoc = await getDoc(emailRef);
  if (emailDoc.exists()) return {
    error: "User already exists",
  };

  const encryptedPassword = await hashPassword(password);
   // create user ----> users
   const userRef = doc(collection(db, "users"));
   await setDoc(userRef, {
     user_id: userRef.id,
     display_name: displayName,
     profile_id: profile_id,
     friend_status: {
       friends: [],
       friend_request: [],
     },
     join_at: new Date().toISOString(),
   });
  // create user ----> users_account
  const accountRef = doc(collection(db, "accounts"),email);
  await setDoc(accountRef, {
    user_id: userRef.id,
    display_name: displayName,
    email,
    password: encryptedPassword,
  });

  // set cookie
  const generate_cookie = ( userId: string) => {
      const length = 32;
      const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      const specialChars = "@#$%^&*()_=+[]{}|;,.<>?";
      let password = "";
      for (let i = 0; i < length - 4; i++) {
          password += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      // Insert 4 random special characters at secure positions
      for (let i = 0; i < 4; i++) {
          let pos = Math.floor(Math.random() * password.length);
          password = password.slice(0, pos) + specialChars.charAt(Math.floor(Math.random() * specialChars.length)) + password.slice(pos);
      }
      // Append userId at the end
      return `${password}-${userId}`;
  }
  const setCookie = async () => {
    (await cookies()).set({
     name: "login-token",
     value: generate_cookie(userRef.id ),
     httpOnly: false, // Prevents client-side access
     secure: true, // Ensures HTTPS usage
     path: "/",
     maxAge: 60 * 60 * 24 * 30, // 30 days
   });
  };
  await setCookie();
  return {
    success : true
  }
};
