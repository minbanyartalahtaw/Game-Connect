"use client";

import { useState } from "react";
import JellyLoader from "@/app/components/loading";
import Link from "next/link";
import SnackBar from "@/app/components/snackBar";
import { login } from "./action";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
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

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // handleSignIn
  const handleSignIn = async () => {
    // Check if email is valid f:28
    if (!validateEmail(email)) {
      setSnackBar({
        message: "Please enter a valid email.",
        isOpen: true,
        type: "error",
      });
      closeSnackBar();
      return;
    }
    // Login Method
    setLoading(true);

    // Check Backend for login f:8
    const response = await login(email, password);
    // Destructure response {staus : boolean, message : string}
    const { status, message } = response;
    if (!status) {
      setSnackBar({ message: message, isOpen: true, type: "error" });
      closeSnackBar();
      setLoading(false);
      return;
    }
    // if status is true backend will set Cookie b:30 and redirect to /user
    router.push("/user");
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-full relative ">
      {/* Loading */}
      {loading && (
        <div className="fixed flex flex-col gap-4 inset-0 items-center justify-center bg-black/50 z-50">
          <JellyLoader size={100} color="white" />
          <h1 className="text-white text-2xl font-bold">Loading...</h1>
        </div>
      )}
      <div className="absolute top-6 left-6 z-10 flex items-center">
        <Link
          href="/"
          className="text-white hover:text-cyan-400 transition-colors flex items-center gap-2 border-2 border-white/50 rounded-full p-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
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
        }}
      >
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1/3 h-0.5 bg-gradient-to-r from-cyan-500/0 via-cyan-500 to-cyan-500/0 blur-sm"></div>

        <h1 className="text-2xl font-bold text-white text-center animate-fadeIn">
          Login
        </h1>
        <div className="space-y-1">
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-3 w-full px-4 py-3 bg-black/20 border-3 border-white/20 rounded-lg focus:outline-none transition-all duration-300 text-white placeholder:text-white/30"
            placeholder="Email"
          />
        </div>

        <div className="space-y-1">
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mt-3 w-full px-4 py-3 bg-black/20 border-3 border-white/20  rounded-lg focus:outline-none transition-all duration-300 text-white placeholder:text-white/30"
            placeholder="password"
          />
        </div>

        <button
          type="submit"
          disabled={email === "" || password === ""}
          className="btn w-full mt-8 bg-cyan-700 hover:bg-cyan-600"
          onClick={handleSignIn}
        >
          Sign In
        </button>

        <div className="mt-10 text-center text-sm">
          <p className="text-white/70">
            Don&apos;t have an account?{" "}
            <Link
              href="/auth/signup"
              className="text-cyan-400 hover:text-cyan-300 border-b border-cyan-400/30 hover:border-cyan-300 transition-colors"
            >
              Sign up
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
