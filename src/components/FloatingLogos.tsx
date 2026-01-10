import { useEffect, useState } from "react";

// import your logos here
import RicohLogo from "../assets/pics/Ricoh_Logo.png";
import RBCLogo from "../assets/pics/RBC_Logo.png";
import TikTokLogo from "../assets/pics/TikTok_Logo.png";
import BMOLogo from "../assets/pics/BMO_Logo.png";
import MetaLogo from "../assets/pics/Meta_Logo.png";
import MetaLogoDark from "../assets/pics/Meta_Logo_Dark.png";
import TikTokLogoDark from "../assets/pics/TikTok_Logo_Dark.png";
import PythonLogo from "../assets/pics/Python_Logo.png";
import GoLogo from "../assets/pics/Go_Logo.png";
import CppLogo from "../assets/pics/Cpp_Logo.png"
import TensorflowLogo from "../assets/pics/Tensorflow_Logo.png";
import PytorchLogo from "../assets/pics/Pytorch_Logo.png";
import PytorchLogoDark from "../assets/pics/Pytorch_Logo_Dark.svg";
import JavaLogo from "../assets/pics/Java_Logo.png";
import SQLLogo from "../assets/pics/Sql_Logo.png";


interface FloatingLogosProps {
  isLight?: boolean;
}

interface FloatingLogo {
  lightSrc: string;
  darkSrc?: string;
  alt: string;
  top: number;   // percentage (0–100)
  left: number;  // percentage (0–100)
  depth: number; // parallax strength
  rotate: number; // degrees
  size: number;   // px
}

const LOGOS: FloatingLogo[] = [
  { lightSrc: RicohLogo, alt: "Ricoh",       top: 12, left: 70, depth: 0.5, rotate: -18, size: 70 },
  { lightSrc: RBCLogo,   alt: "RBC",         top: 45, left: 90, depth: 0.8, rotate:  8, size: 50 },
  { lightSrc: TikTokLogo, darkSrc: TikTokLogoDark, alt: "TikTok",      top: 30, left: 50, depth: 0.6, rotate: -10, size: 140 },
  { lightSrc: BMOLogo,   alt: "BMO",         top: 85, left: 20, depth: 0.9, rotate:  16, size: 100 },
  { lightSrc: MetaLogo,  darkSrc: MetaLogoDark, alt: "Meta",        top: 18, left: 12, depth: 1.0, rotate: -22, size: 120 },
  { lightSrc: PythonLogo,alt: "Python",      top: 8, left: 40, depth: 0.9, rotate:  10, size: 60 },
  { lightSrc: GoLogo,    alt: "Go",          top: 75, left: 5,  depth: 0.7, rotate: -16, size: 60 },
  { lightSrc: CppLogo, alt: "Cpp", top: 78, left: 60, depth: 0.6, rotate: 8, size: 60 },
  {
    lightSrc: PytorchLogo,
    darkSrc: PytorchLogoDark,
    alt: "PyTorch",
    top: 20,
    left: 50,
    depth: 0.9,
    rotate: 4,
    size: 120,
  },
  {
    lightSrc: JavaLogo,
    alt: "Java",
    top: 82,
    left: 90,
    depth: 0.5,
    rotate: 18,
    size: 65,
  },
  {
    lightSrc: SQLLogo,
    alt: "SQL",
    top: 10,
    left: 3,
    depth: 0.7,
    rotate: -16,
    size: 60,
  },
   {
    lightSrc: TensorflowLogo,
    alt: "TensorFlow",
    top: 23,
    left: 85,
    depth: 0.55,
    rotate: 10,
    size: 130,
  },
];

export function FloatingLogos({ isLight }: FloatingLogosProps) {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth - 0.5) * 2;
      const ny = (e.clientY / window.innerHeight - 0.5) * 2;
      setMouse({ x: nx, y: ny });
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  const baseOpacity = isLight ? 0.18 : 0.25;

  return (
    <div className="pointer-events-none absolute inset-0 -z-0">
      {LOGOS.map((logo, idx) => {
        const offsetX = mouse.x * logo.depth * 30;
        const offsetY = mouse.y * logo.depth * 30;

        // pick correct logo for current theme
        const src =
          isLight || !logo.darkSrc ? logo.lightSrc : logo.darkSrc;

        return (
          <div
            key={idx}
            className="absolute"
            style={{
              top: `${logo.top}%`,
              left: `${logo.left}%`,
              transform: `translate3d(${offsetX}px, ${offsetY}px, 0) rotate(${logo.rotate}deg)`,
            }}
          >
            <img
              src={src}
              alt={logo.alt}
              style={{
                width: `${logo.size}px`,
                opacity: BMOLogo? 0.3: baseOpacity,
                filter: "brightness(0.75) saturate(0.7) blur(0.3px)",
                transition: "transform 0.2s ease-out",
              }}
            />
          </div>
        );
      })}
    </div>
  );
}
