"use client";
import { useRouter } from "next/navigation";
import TrueFocus from "./components/trueFocus";
import Squares from "./components/squareBackground";
import FallingText from "./components/fallenText";

export default function Home() {
  const router = useRouter();
  return (
    <main className="flex flex-col items-center justify-center h-screen">
      <button
        className="btn absolute top-4 right-4"
        onClick={() => router.push("/auth/login")}>
        Login
      </button>
      <TrueFocus sentence="Game Connect" />
      <FallingText
        text={`Share and Connect with your friends. Create and share your favorite games with Game-Connect.`}
        highlightWords={[
          "Share",
          "Connect",
          "Favorite",
          "Create",
          "friends",
          "Game-Connect",
        ]}
        trigger="hover"
        backgroundColor="transparent"
        wireframes={false}
        gravity={0.56}
        fontSize="1.5rem"
        mouseConstraintStiffness={0.9}
      />

      <Squares />
    </main>
  );
}
