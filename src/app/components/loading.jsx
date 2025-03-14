"use client";

import React from "react";

const JellyLoader = ({ size = 80, color = "white", speed = 0.9 }) => {
  return (
    <>
      <div
        className="jelly-loader"
        style={{
          "--uib-size": `${size}px`,
          "--uib-color": color,
          "--uib-speed": `${speed}s`,
        }}></div>
      <svg width="0" height="0" className="jelly-svg">
        <defs>
          <filter id="uib-jelly-ooze">
            <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
              result="ooze"
            />
            <feBlend in="SourceGraphic" in2="ooze" />
          </filter>
        </defs>
      </svg>

      <style jsx>{`
        .jelly-loader {
          --uib-size: ${size}px;
          --uib-color: ${color};
          --uib-speed: ${speed}s;
          position: relative;
          height: calc(var(--uib-size) / 2);
          width: var(--uib-size);
          filter: url("#uib-jelly-ooze");
          animation: rotate calc(var(--uib-speed) * 2) linear infinite;
          will-change: transform;
        }

        .jelly-loader::before,
        .jelly-loader::after {
          content: "";
          position: absolute;
          top: 0%;
          left: 25%;
          width: 50%;
          height: 100%;
          background-color: var(--uib-color);
          border-radius: 100%;
          will-change: transform;
          transition: background-color 0.3s ease;
        }

        .jelly-loader::before {
          animation: shift-left var(--uib-speed) ease infinite;
        }

        .jelly-loader::after {
          animation: shift-right var(--uib-speed) ease infinite;
        }

        .jelly-svg {
          width: 0;
          height: 0;
          position: absolute;
        }

        @keyframes rotate {
          0%,
          49.999%,
          100% {
            transform: none;
          }

          50%,
          99.999% {
            transform: rotate(90deg);
          }
        }

        @keyframes shift-left {
          0%,
          100% {
            transform: translateX(0%);
          }
          50% {
            transform: scale(0.65) translateX(-75%);
          }
        }

        @keyframes shift-right {
          0%,
          100% {
            transform: translateX(0%);
          }
          50% {
            transform: scale(0.65) translateX(75%);
          }
        }
      `}</style>
    </>
  );
};

export default JellyLoader;
