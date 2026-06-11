"use client";

import { useLanguage } from "@/context/LanguageContext";
import Iridescence from "@/components/MainBackground/Iridescence";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const { t, language } = useLanguage();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="relative min-h-[calc(100vh-80px)] w-full overflow-hidden flex flex-col items-center justify-center bg-neutral-950">
      {/* Background Component */}
      <div className="absolute inset-0 z-0">
        <Iridescence
          color={[0.145, 0.588, 0.745]}
          speed={0.8}
          amplitude={0.15}
          mouseReact={true}
        />
        {/* Overlay to ensure readability and corporate feel */}
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/20 via-transparent to-neutral-950/40" />
      </div>

      {/* Hero Content */}
      <div className="container relative z-10 mx-auto px-6 text-center">
        <div
          className={`max-w-5xl mx-auto transition-all duration-1000 ease-out transform ${
            mounted ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
          }`}
        >
          {/* Main Headline */}
          <h1 className="text-5xl md:text-5xl lg:text-5xl font-black text-white mb-8  drop-shadow-[0_10px_30px_rgba(0,0,0,0.3)]">
            {language === "mn" ? (
              <>
                Сайныг хамтдаа <br className="hidden md:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-100 to-white">
                  бүтээнэ
                </span>
              </>
            ) : (
              <>
                Excellence <br className="hidden md:block" />
                <span className="bg-clip-text">together</span>
              </>
            )}
          </h1>

          {/* Subtext */}
          <p className="text-lg md:text-xl text-white/80 font-medium mb-12 leading-relaxed max-w-3xl mx-auto drop-shadow-md">
            {t("footertext")}
          </p>

          {/* CTA Buttons */}
        </div>
      </div>

      {/* Subtle Floating Glows */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-blue-500/20 rounded-full blur-[120px] pointer-events-none animate-float opacity-50" />
      <div className="absolute -bottom-20 -right-20 w-[30rem] h-[30rem] bg-cyan-500/10 rounded-full blur-[150px] pointer-events-none animate-float-delayed opacity-50" />

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }
          50% {
            transform: translate(30px, -30px) scale(1.1);
          }
        }
        @keyframes float-delayed {
          0%,
          100% {
            transform: translate(0, 0) scale(1.1);
          }
          50% {
            transform: translate(-40px, 20px) scale(1);
          }
        }
        .animate-float {
          animation: float 12s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 18s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
