"use client";

import Squares from "../components/squareBackground";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-black bg-grain bg-opacity-50 bg-repeat pattern-grain pattern-size-4 pattern-opacity-50">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">{children}</div>
    </div>
  );
}
