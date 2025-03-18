"use client";

import { useEffect } from "react";
import SideBar from "../components/user/sideBar";

export default function User() {
  const getUser = async () => {
    console.log("Hello World !");
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <SideBar />
      <h1 className="text-3xl text-white font-bold">User</h1>
    </div>
  );
}
