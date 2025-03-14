"use client";

import { useState } from "react";

import Link from "next/link";
import SnackBar from "@/app/components/snackBar";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [snackBar, setSnackBar] = useState({
    message: "",
    isOpen: false,
    type: "error",
  });

  const closeSnackBar = () => {
    setTimeout(() => {
      setSnackBar({
        message: "",
        isOpen: false,
        type: "error",
      });
    }, 3000);
  };

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };
  // const [isLoading, setIsLoading] = useState(false);
  const handleSignup = async () => {
    console.log("Top Line");
    if (!isValidEmail(email)) {
      setSnackBar({
        message: "Please enter a valid email.",
        isOpen: true,
        type: "error",
      });
      closeSnackBar();
      return;
    }

    if (username === "banyar") {
      setSnackBar({
        message: "Username already taken!",
        isOpen: true,
        type: "warning",
      });
      closeSnackBar();
      return;
    }

    console.log(email, password, username);
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-full relative">
      <div className="absolute top-6 left-6 z-10 flex items-center">
        <Link
          href="/"
          className="text-white hover:text-cyan-400 transition-colors flex items-center gap-2 border-2 border-white/50 rounded-full p-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </Link>
      </div>

      <div
        className="w-full max-w-md px-10 py-12 z-10 mx-4 rounded-2xl border-5 border-white/10 shadow-xl shadow-cyan-500/5"
        style={{
          background: `linear-gradient(145deg, rgba(0,0,0,0.85), rgba(15,15,15,0.75))`,
          backdropFilter: "blur(10px)",
          boxShadow:
            "inset 0 1px 0 rgba(255,255,255,0.05), 0 20px 40px rgba(0,0,0,0.4)",
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4' viewBox='0 0 4 4'%3E%3Cpath fill='%23ffffff' fill-opacity='0.05' d='M1 3h1v1H1V3zm2-2h1v1H3V1z'%3E%3C/path%3E%3C/svg%3E")`,
        }}>
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1/3 h-0.5 bg-gradient-to-r from-cyan-500/0 via-cyan-500 to-cyan-500/0 blur-sm"></div>

        <h1 className="text-3xl font-bold text-white text-center animate-fadeIn">
          Create Account
        </h1>

        <div className="space-y-1">
          <div className="relative group">
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-3 w-full px-4 py-3 bg-black/20 border-5 border-white/10 rounded-lg focus:outline-none transition-all duration-300 text-white placeholder:text-white/30"
              placeholder="Email"
            />
          </div>
        </div>

        <div className="space-y-1">
          <div className="relative group">
            <input
              id="email"
              type="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="mt-3 w-full px-4 py-3 bg-black/20 border-5 border-white/10 rounded-lg focus:outline-none transition-all duration-300 text-white placeholder:text-white/30"
              placeholder="username"
            />
          </div>
        </div>

        <div className="space-y-1">
          <div className="relative group">
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="my-3 w-full px-4 py-3 bg-black/20 border-5 border-white/10 rounded-lg focus:outline-none transition-all duration-300 text-white placeholder:text-white/30"
              placeholder="passw0rd"
            />
          </div>
        </div>

        <button
          className="btn w-full mt-8"
          onClick={handleSignup}
          disabled={email === "" || password === "" || username === ""}>
          Sign Up
        </button>
        <div className="mt-10 text-center text-sm">
          <p className="text-white/70">
            Already have an account?{" "}
            <Link
              href="/auth/login"
              className="text-cyan-400 hover:text-cyan-300 border-b border-cyan-400/30 hover:border-cyan-300 transition-colors">
              Sign in
            </Link>
          </p>
        </div>
      </div>

      <SnackBar
        message={snackBar.message}
        isOpen={snackBar.isOpen}
        type={snackBar.type as "error" | "success" | "info" | "warning"}
      />
    </div>
  );
}
