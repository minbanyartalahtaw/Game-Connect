import TrueFocus from "./components/trueFocus";
import Squares from "./components/squareBackground";
import FallingText from "./components/fallenText";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center h-screen">
      <button className="btn absolute top-4 right-4 bg-transparent border-2 border-white/20 text-white px-6 py-2 rounded-lg font-geist-sans transition-all duration-300 hover:bg-white/10 hover:border-white/40 hover:scale-105 active:scale-95 backdrop-blur-sm">
        Login
      </button>
      <TrueFocus sentence="Game Connect" />
      <FallingText
        text={`Share and Connect with your friends. Create and share your favorite games with Game Connect.`}
        highlightWords={["Share", "Connect", "Favorite", "Create", "friends"]}
        highlightClass="highlighted"
        trigger="hover"
        backgroundColor="transparent"
        wireframes={false}
        gravity={0.56}
        fontSize="2rem"
        mouseConstraintStiffness={0.9}
      />
      <button className="btn btn-primary absolute lg:bottom-140 md:bottom-120 z-10 bottom-50 ">
        Explore More
      </button>
      <Squares />
    </main>
  );
}
