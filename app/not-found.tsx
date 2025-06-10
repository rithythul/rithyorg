// src/app/not-found.tsx
import Link from "next/link";

function CuteGhost() {
  return (
    <svg viewBox="0 0 100 100" className="w-32 h-32 mb-6 text-solarized-blue">
      {/* Ghost body */}
      <path
        d="M15 50 Q15 15 50 15 Q85 15 85 50 L85 85 Q85 90 80 85 L65 70 Q60 65 55 70 L50 75 L45 70 Q40 65 35 70 L20 85 Q15 90 15 85 Z"
        fill="currentColor"
        className=""
      />
      {/* Eyes */}
      <circle cx="35" cy="45" r="5" className="fill-solarized-base3" />
      <circle cx="65" cy="45" r="5" className="fill-solarized-base3" />
      {/* Cute smile */}
      <path
        d="M40 60 Q50 70 60 60"
        fill="none"
        stroke="#fdf6e3"
        strokeWidth="2"
        className=""
      />
    </svg>
  );
}

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] sm:min-h-[60vh] text-center px-4">
      <CuteGhost />
      <h1 className="text-3xl sm:text-4xl font-medium mb-4 text-solarized-yellow">
        404
      </h1>
      <p className="text-sm font-light mb-6 sm:mb-8 text-solarized-base0 max-w-sm">
        oops! looks like you've wandered into uncharted territory
      </p>
      <Link
        href="/"
        className="px-4 sm:px-6 py-3 bg-solarized-base2 text-solarized-base01 hover:bg-solarized-blue hover:text-solarized-base3 border border-solarized-base2 text-sm"
      >
        Head Back Home
      </Link>
    </div>
  );
}
