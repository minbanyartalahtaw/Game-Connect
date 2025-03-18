"use client"

import { useEffect, useState } from "react"

export default function CountingLoader() {
  const [count, setCount] = useState(1)

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevCount) => {
        if (prevCount >= 3) return 1
        return prevCount + 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black w-full h-full z-50 animate-[fadeIn_0.5s_ease-in-out] group-[.unmounting]:animate-[fadeOut_0.5s_ease-in-out]">
      {/* Gray line shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 border border-gray-700 rotate-45 opacity-20"></div>
        <div className="absolute top-1/3 right-1/4 w-48 h-48 border border-gray-700 rotate-12 opacity-30"></div>
        <div className="absolute bottom-1/4 left-1/3 w-64 h-64 border border-gray-700 -rotate-12 opacity-20"></div>
        <div className="absolute bottom-1/3 right-1/3 w-40 h-40 border border-gray-700 rotate-45 opacity-30"></div>

        {/* Animated squares */}
        <div className="absolute top-1/2 left-1/2 w-72 h-72 border border-gray-600 -translate-x-1/2 -translate-y-1/2 animate-[spin_8s_linear_infinite] opacity-20"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 border border-gray-700 -translate-x-1/2 -translate-y-1/2 animate-[spin_12s_linear_infinite_reverse] opacity-10"></div>
      </div>

      {/* Number counter with format 00X */}
      <div className="relative z-10 flex items-center justify-center">
        {/* Static "00" part */}
        <div className="text-[20vmin] font-bold text-white">00</div>

        {/* Animated changing digit */}
        <div className="relative h-[20vmin] w-[10vmin] overflow-hidden">
          {[1, 2, 3].map((num) => (
            <div
              key={num}
              className="absolute inset-0 flex items-center justify-center transition-all duration-700"
              style={{
                opacity: count === num ? 1 : 0,
                transform: `translateY(${count === num ? 0 : count < num ? "-100%" : "100%"})`,
                filter: `blur(${count === num ? 0 : "8px"})`,
              }}
            >
              <span className="text-[20vmin] font-bold text-white">{num}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

