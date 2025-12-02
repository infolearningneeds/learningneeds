/* eslint-disable react/no-unescaped-entities */
'use client'

import React from 'react'

const Marquee = () => {
  return (
    <div className="relative w-full overflow-hidden bg-blue-600 py-4 shadow-lg">
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,.2)_50%,transparent_75%,transparent_100%)] bg-[length:250%_250%] animate-shimmer"></div>
      </div>

      {/* ⛔ Removed gradient left & right fade overlays */}

      {/* Marquee content */}
      <div className="flex animate-marquee whitespace-nowrap">
        <span className="mx-8 inline-flex items-center gap-3 text-lg font-bold text-white drop-shadow-lg">
          <span className="inline-block h-2 w-2 rounded-full bg-yellow-300 animate-pulse"></span>
          Exciting news! We're launching our online sales service very soon. Stay tuned for updates!
          <span className="inline-block h-2 w-2 rounded-full bg-yellow-300 animate-pulse"></span>
        </span>

        <span className="mx-8 inline-flex items-center gap-3 text-lg font-bold text-white drop-shadow-lg">
          <span className="inline-block h-2 w-2 rounded-full bg-yellow-300 animate-pulse"></span>
          Exciting news! We're launching our online sales service very soon. Stay tuned for updates!
          <span className="inline-block h-2 w-2 rounded-full bg-yellow-300 animate-pulse"></span>
        </span>

        <span className="mx-8 inline-flex items-center gap-3 text-lg font-bold text-white drop-shadow-lg">
          <span className="inline-block h-2 w-2 rounded-full bg-yellow-300 animate-pulse"></span>
          Exciting news! We're launching our online sales service very soon. Stay tuned for updates!
          <span className="inline-block h-2 w-2 rounded-full bg-yellow-300 animate-pulse"></span>
        </span>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-66.666%);
          }
        }

        @keyframes shimmer {
          0% {
            background-position: -250% 0;
          }
          100% {
            background-position: 250% 0;
          }
        }

        .animate-marquee {
          animation: marquee 25s linear infinite;
        }

        .animate-shimmer {
          animation: shimmer 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}

export default Marquee
