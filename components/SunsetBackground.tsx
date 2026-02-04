"use client";

import { useEffect, useState } from "react";

export default function SunsetBackground() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden -z-1">
      {/* Sky gradient layer - static base */}
      <div 
        className="absolute inset-0 w-full h-[120%]"
        style={{
          background: `
            linear-gradient(
              180deg,
              #ffecd2 0%,
              #fcb69f 15%,
              #ff9a9e 35%,
              #fecfef 55%,
              #fecfef 70%,
              #e2c2c6 85%,
              #f8f4f0 100%
            )
          `,
        }}
      />

      {/* Sun layer - barely moves */}
      <div
        className="absolute w-64 h-64 md:w-96 md:h-96 rounded-full blur-2xl opacity-60"
        style={{
          background: "radial-gradient(circle, rgba(255,236,180,0.9) 0%, rgba(255,154,158,0.5) 40%, transparent 70%)",
          left: "60%",
          top: `calc(15% + ${scrollY * 0.02}px)`,
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* Clouds layer - medium parallax */}
      <div
        className="absolute w-full h-full pointer-events-none"
        style={{
          transform: `translateY(${scrollY * 0.08}px)`,
        }}
      >
        {/* Cloud 1 */}
        <div
          className="absolute w-96 h-32 bg-white/20 blur-3xl rounded-full"
          style={{
            left: "10%",
            top: "25%",
          }}
        />
        {/* Cloud 2 */}
        <div
          className="absolute w-80 h-28 bg-white/15 blur-3xl rounded-full"
          style={{
            left: "55%",
            top: "35%",
          }}
        />
        {/* Cloud 3 */}
        <div
          className="absolute w-72 h-24 bg-white/10 blur-3xl rounded-full"
          style={{
            left: "75%",
            top: "20%",
          }}
        />
        {/* Cloud 4 */}
        <div
          className="absolute w-64 h-20 bg-white/12 blur-2xl rounded-full"
          style={{
            left: "30%",
            top: "45%",
          }}
        />
      </div>

      {/* Foreground haze layer - fastest parallax */}
      <div
        className="absolute w-full h-[50%] bottom-0 pointer-events-none"
        style={{
          transform: `translateY(${scrollY * 0.15}px)`,
          background: `
            linear-gradient(
              to top,
              rgba(248, 244, 240, 0.95) 0%,
              rgba(248, 244, 240, 0.7) 30%,
              rgba(248, 244, 240, 0.3) 60%,
              transparent 100%
            )
          `,
        }}
      />

      {/* Atmospheric haze overlay */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(
              ellipse at 60% 20%,
              rgba(255, 236, 180, 0.15) 0%,
              transparent 50%
            )
          `,
        }}
      />
    </div>
  );
}
