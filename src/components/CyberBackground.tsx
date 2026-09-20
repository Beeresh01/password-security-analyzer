import { useEffect } from "react";

interface CyberBackgroundProps {
  darkMode: boolean;
}

const CyberBackground = ({ darkMode }: CyberBackgroundProps) => {
  useEffect(() => {
    const styleId = "cyber-background-styles";

    if (document.getElementById(styleId)) return;

    const style = document.createElement("style");
    style.id = styleId;

    style.innerHTML = `
      @keyframes cyberOrb1 {
        0%, 100% {
          transform: translate3d(0, 0, 0) scale(1);
        }

        50% {
          transform: translate3d(140px, 80px, 0) scale(1.2);
        }
      }

      @keyframes cyberOrb2 {
        0%, 100% {
          transform: translate3d(0, 0, 0) scale(1);
        }

        50% {
          transform: translate3d(-120px, 100px, 0) scale(1.15);
        }
      }

      @keyframes cyberOrb3 {
        0%, 100% {
          transform: translate3d(0, 0, 0) scale(1);
        }

        50% {
          transform: translate3d(100px, -100px, 0) scale(1.18);
        }
      }

      @keyframes cyberParticle {
        0%, 100% {
          transform: translate3d(0, 0, 0);
          opacity: 0.25;
        }

        50% {
          transform: translate3d(20px, -35px, 0);
          opacity: 1;
        }
      }

      @keyframes cyberGrid {
        0% {
          transform: translate3d(0, 0, 0);
        }

        100% {
          transform: translate3d(50px, 50px, 0);
        }
      }

      @media (prefers-reduced-motion: reduce) {
        .cyber-animated {
          animation: none !important;
        }
      }
    `;

    document.head.appendChild(style);

    return () => {
      const existing = document.getElementById(styleId);

      if (existing) {
        existing.remove();
      }
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        overflow: "hidden",

        background: darkMode
          ? "radial-gradient(circle at 50% 0%, rgba(37,99,235,0.18), transparent 40%), #020617"
          : "radial-gradient(circle at 50% 0%, rgba(59,130,246,0.12), transparent 45%), #f8fafc",
      }}
    >
      {/* ========================================
          BLUE AURORA
      ======================================== */}

      <div
        className="cyber-animated"
        style={{
          position: "absolute",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          top: "-180px",
          left: "-120px",

          background: darkMode
            ? "radial-gradient(circle, rgba(37,99,235,0.45) 0%, rgba(37,99,235,0.18) 35%, transparent 70%)"
            : "radial-gradient(circle, rgba(59,130,246,0.24) 0%, rgba(59,130,246,0.10) 35%, transparent 70%)",

          filter: "blur(35px)",
          animation: "cyberOrb1 14s ease-in-out infinite",
        }}
      />

      {/* ========================================
          CYAN AURORA
      ======================================== */}

      <div
        className="cyber-animated"
        style={{
          position: "absolute",
          width: "520px",
          height: "520px",
          borderRadius: "50%",
          top: "15%",
          right: "-220px",

          background: darkMode
            ? "radial-gradient(circle, rgba(6,182,212,0.40) 0%, rgba(6,182,212,0.15) 35%, transparent 70%)"
            : "radial-gradient(circle, rgba(6,182,212,0.20) 0%, rgba(6,182,212,0.08) 35%, transparent 70%)",

          filter: "blur(40px)",
          animation: "cyberOrb2 17s ease-in-out infinite",
        }}
      />

      {/* ========================================
          PURPLE AURORA
      ======================================== */}

      <div
        className="cyber-animated"
        style={{
          position: "absolute",
          width: "550px",
          height: "550px",
          borderRadius: "50%",
          bottom: "-260px",
          left: "30%",

          background: darkMode
            ? "radial-gradient(circle, rgba(124,58,237,0.35) 0%, rgba(124,58,237,0.12) 35%, transparent 70%)"
            : "radial-gradient(circle, rgba(139,92,246,0.18) 0%, rgba(139,92,246,0.07) 35%, transparent 70%)",

          filter: "blur(45px)",
          animation: "cyberOrb3 20s ease-in-out infinite",
        }}
      />

      {/* ========================================
          CYBER GRID
      ======================================== */}

      <div
        className="cyber-animated"
        style={{
          position: "absolute",
          inset: "-50px",

          opacity: darkMode ? 0.06 : 0.035,

          backgroundImage: darkMode
            ? `
              linear-gradient(
                rgba(96,165,250,0.8) 1px,
                transparent 1px
              ),
              linear-gradient(
                90deg,
                rgba(96,165,250,0.8) 1px,
                transparent 1px
              )
            `
            : `
              linear-gradient(
                rgba(59,130,246,0.6) 1px,
                transparent 1px
              ),
              linear-gradient(
                90deg,
                rgba(59,130,246,0.6) 1px,
                transparent 1px
              )
            `,

          backgroundSize: "50px 50px",
          animation: "cyberGrid 20s linear infinite",
        }}
      />

      {/* ========================================
          CENTER VIGNETTE
      ======================================== */}

      <div
        style={{
          position: "absolute",
          inset: 0,

          background: darkMode
            ? "radial-gradient(circle at center, transparent 20%, rgba(2,6,23,0.35) 70%, rgba(2,6,23,0.8) 100%)"
            : "radial-gradient(circle at center, transparent 20%, rgba(248,250,252,0.15) 70%, rgba(248,250,252,0.65) 100%)",
        }}
      />

      {/* ========================================
          FLOATING PARTICLES
      ======================================== */}

      {[
        ["12%", "20%", "0s"],
        ["75%", "30%", "1s"],
        ["20%", "65%", "2s"],
        ["82%", "78%", "3s"],
        ["45%", "42%", "4s"],
        ["60%", "15%", "5s"],
        ["40%", "85%", "6s"],
        ["90%", "55%", "7s"],
        ["30%", "15%", "2.5s"],
        ["70%", "65%", "4.5s"],
      ].map(([left, top, delay], index) => (
        <span
          key={index}
          className="cyber-animated"
          style={{
            position: "absolute",
            left,
            top,

            width: "4px",
            height: "4px",

            borderRadius: "50%",

            background: darkMode
              ? "rgba(56,189,248,0.9)"
              : "rgba(37,99,235,0.55)",

            boxShadow: darkMode
              ? "0 0 8px rgba(56,189,248,0.9), 0 0 18px rgba(56,189,248,0.5)"
              : "0 0 6px rgba(37,99,235,0.45), 0 0 12px rgba(37,99,235,0.2)",

            animation: "cyberParticle 7s ease-in-out infinite",
            animationDelay: delay,
          }}
        />
      ))}
    </div>
  );
};

export default CyberBackground;