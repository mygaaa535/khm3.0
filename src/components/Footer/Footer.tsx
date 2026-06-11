"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export default function Footer() {
  const { language, t } = useLanguage();

  return (
    <footer className="bg-[#2596be] border-t border-white text-white">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 xl:px-10 py-6 md:py-8">
        <div className="flex flex-col items-center text-center space-y-6">
          {/* Logo */}
          <Link href="/" className="inline-block">
            <div className="relative w-[180px] h-[50px] sm:w-[240px] sm:h-[70px] transition-transform duration-300 hover:scale-105">
              <Image
                src={language === "mn" ? "/logo.png" : "/logo-en.png"}
                alt="Khan Khugshin"
                fill
                className="object-contain"
                priority
              />
            </div>
          </Link>

          {/* Slogan (Uria ug) */}
          <div className="max-w-4xl">
            <p className="text-base leading-relaxed text-white">
              {t("footertext")}
            </p>
          </div>

          {/* Contact Info - Structured in 2 rows */}
          <div className="w-full pt-6 border-t border-white/20 flex flex-col items-center space-y-4">
            {/* First Row: Phone & Email */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12">
              <div className="flex items-center gap-3 group">
                <svg
                  className="w-5 h-5 text-white group-hover:scale-110 transition-transform shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <a
                  href="tel:78001100"
                  className="text-base hover:underline decoration-2 underline-offset-4 transition-all tracking-wider"
                >
                  78001100
                </a>
              </div>

              <div className="flex items-center gap-3 group">
                <svg
                  className="w-5 h-5 text-white group-hover:scale-110 transition-transform shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <a
                  href="mailto:info@khm.mn"
                  className="text-base hover:underline decoration-2 underline-offset-4 transition-all tracking-wider"
                >
                  info@khm.mn
                </a>
              </div>
            </div>

            {/* Second Row: Address */}
            <div className="flex items-center justify-center gap-3 group max-w-3xl px-4">
              <svg
                className="w-5 h-5 text-white group-hover:scale-110 transition-transform translate-y-[-2px] translate-x-1 shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <p className="text-base leading-snug ">{t("AddressDetail")}</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-4 border-t border-white/10 flex flex-col items-center">
          <p className="text-sm text-white/60 text-center">
            {t("Copyright by Khankhugshin International LLC")}
          </p>
        </div>
      </div>
    </footer>
  );
}
