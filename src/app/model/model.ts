// use in ["auth/signup"]
export interface account_info  {
  userId: string;
  email: string;
  password: string;
}

export interface user {
  userId: string;
  email: string;
  profile_id: number;
  displayName: string;
  friendStatus: {
    friends: string[];
    friend_request: string[];
  };
  joind_At: string;
}
