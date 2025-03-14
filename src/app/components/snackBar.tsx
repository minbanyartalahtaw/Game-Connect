"use client";

import { useState, useEffect } from "react";

interface SnackBarProps {
  message: string;
  isOpen: boolean;
  duration?: number;
  type?: "success" | "error" | "info" | "warning";
}

const SnackBar: React.FC<SnackBarProps> = ({
  message,
  isOpen,
  duration = 3000,
  type = "info",
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);

      if (duration > 0) {
        const timer = setTimeout(() => {
          setIsVisible(false);
        }, duration);

        return () => clearTimeout(timer);
      }
    } else {
      setIsVisible(false);
    }
  }, [isOpen, duration]);

  if (!isVisible) return null;

  const typeStyles = {
    success: "bg-green-500",
    error: "bg-red-500",
    info: "bg-blue-500",
    warning: "bg-yellow-500",
  };

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
      <div
        className={`px-6 py-3 rounded-lg shadow-lg ${typeStyles[type]} ${
          type === "warning" ? "text-black" : "text-white"
        } flex items-center text-center justify-between min-w-[300px] max-w-md`}>
        <span>{message}</span>
      </div>
    </div>
  );
};

export default SnackBar;
