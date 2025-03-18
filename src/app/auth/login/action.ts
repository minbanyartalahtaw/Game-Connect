"use server";

import { db } from "@/app/libs/firebase";
import bcrypt from "bcrypt";
import { doc, getDoc } from "firebase/firestore";
import { cookies } from "next/headers";

export const login = async (email: string, password: string) => {
  // Check if email exists in the "accounts" collection
  const emailRef = doc(db, "accounts", email);
  // if user not found return false verify false
  const emailSnapshot = await getDoc(emailRef);
  if (!emailSnapshot.exists()) {
    return {
      status: false,
      message: "Email not found.",
    };
  }
  // if user exit get user data Method start here
  const user = emailSnapshot.data();
  const passwordHash = user.password;
  // Compare the provided password with the stored password hash
  const passwordMatch = await bcrypt.compare(password, passwordHash);
  if (!passwordMatch) {
    return {
      status: false,
      message: "Incorrect password.",
    };
  }
  // set cookie
  const generate_cookie = (userId: string) => {
    const length = 32;
    const chars =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const specialChars = "@#$%^&*()_=+[]{}|;,.<>?";
    let password = "";
    for (let i = 0; i < length - 4; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    // Insert 4 random special characters at secure positions
    for (let i = 0; i < 4; i++) {
      let pos = Math.floor(Math.random() * password.length);
      password =
        password.slice(0, pos) +
        specialChars.charAt(Math.floor(Math.random() * specialChars.length)) +
        password.slice(pos);
    }
    // Append userId at the end
    return `${password}-${userId}`;
  };
  const setCookie = async () => {
    (await cookies()).set({
    name: "login-token",
      value: generate_cookie(user.user_id),
      httpOnly: false, // Prevents client-side access
      secure: true, // Ensures HTTPS usage
      path: "/",
      maxAge: 60 * 60 * 24 * 30, // 30 days
    });
  };
  await setCookie();

  return {
    status: true,
    message: "Login successful.",
  };
};
