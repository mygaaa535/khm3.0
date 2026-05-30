"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";

export default function Header() {
  const pathname = usePathname();
  const { language, setLanguage, t } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: t("About us"), path: "/about" },
    { name: t("Projects"), path: "/projects" },
    { name: t("Blog"), path: "/news" },
    { name: "TOONO 1", path: "/toono-1" },
    { name: t("Human resource"), path: "/hr" },
    { name: t("Contact"), path: "/contact" },
  ];

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "mn" : "en");
  };

  return (
    <header
      ref={headerRef}
      className="fixed top-0 w-full z-50 h-[80px] bg-[#2596be] border-b border-white"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 xl:px-10 h-full flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="relative z-50 shrink-0">
          <div className="relative w-[170px] h-[60px] sm:w-[180px] sm:h-[60px] transition-all duration-500 group">
            <Image
              src={language === "mn" ? "/logo.png" : "/logo-en.png"}
              alt="Khan Khugshin"
              fill
              className="object-contain transition-transform duration-400 group-hover:scale-105"
              priority
            />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden xl:flex items-center gap-10 h-full">
          {navLinks.map((link) => {
            const isActive = pathname === link.path;
            return (
              <Link
                key={link.path}
                href={link.path}
                className={`px-3 flex items-center h-full text-[14px] tracking-wide transition-all duration-500 relative group whitespace-nowrap ${
                  isActive
                    ? "text-gray-900"
                    : "text-white hover:text-white/80"
                }`}
              >
                {link.name}
                <span
                  className={`absolute bottom-[-1] left-1/2 -translate-x-1/2 h-[4px] rounded-full transition-all duration-420 ease-out ${
                    isActive
                      ? "bg-white w-[60%] opacity-100"
                      : "bg-white/60 w-0 opacity-0 group-hover:w-[60%] group-hover:opacity-100"
                  }`}
                ></span>
              </Link>
            );
          })}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Language Switcher - Desktop */}
          <button
            onClick={toggleLanguage}
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-white/30 hover:bg-white/10 text-white text-xs transition-all duration-300 group"
          >
            <div className="relative w-4 h-3 overflow-hidden rounded-sm shadow-sm">
              <Image
                src={language === "en" ? "/images/icons/mn.png" : "/en.png"}
                alt={language === "en" ? "Mongolian" : "English"}
                fill
                className="object-cover"
              />
            </div>
            <span className="font-bold uppercase tracking-wider">
              {language === "en" ? "MN" : "EN"}
            </span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`xl:hidden relative z-50 p-2 rounded-lg transition-all duration-300 ${
              isMobileMenuOpen
                ? "text-neutral-800 dark:text-neutral-200"
                : "text-white hover:bg-white/10"
            }`}
            aria-label="Toggle menu"
          >
            <div className="w-6 h-5 relative flex flex-col justify-between">
              <span
                className={`block h-[2px] rounded-full transition-all duration-300 origin-center ${
                  isMobileMenuOpen
                    ? "bg-neutral-800 dark:bg-white rotate-45 translate-y-[9px]"
                    : "bg-white w-full"
                }`}
              />
              <span
                className={`block h-[2px] rounded-full transition-all duration-300 ${
                  isMobileMenuOpen
                    ? "opacity-0 scale-0"
                    : "bg-white w-4/5 opacity-100"
                }`}
              />
              <span
                className={`block h-[2px] rounded-full transition-all duration-300 origin-center ${
                  isMobileMenuOpen
                    ? "bg-neutral-800 dark:bg-white -rotate-45 translate-y-[-9px]"
                    : "bg-white w-3/5"
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 xl:hidden transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isMobileMenuOpen
            ? "opacity-100 visible"
            : "opacity-0 invisible pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-black/20 backdrop-blur-sm transition-opacity duration-500 ${
            isMobileMenuOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* Menu Panel - minimal sidebar */}
        <div
          className={`absolute top-0 right-0 w-[260px] sm:w-[280px] bg-white/95 dark:bg-neutral-900/95 backdrop-blur-xl shadow-2xl rounded-bl-2xl transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex flex-col pt-[72px] pb-4 px-4">
            {/* Nav Links */}
            <nav className="flex flex-col">
              {navLinks.map((link, index) => {
                const isActive = pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    href={link.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center gap-2 px-3 py-[10px] text-[14px] font-medium border-b border-neutral-100 dark:border-neutral-800/60 transition-colors duration-200 ${
                      isActive
                        ? "text-blue-600 dark:text-blue-400"
                        : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100"
                    }`}
                    style={{
                      transitionProperty: "opacity, transform, color",
                      transitionDuration: "0.25s",
                      transitionTimingFunction: "ease-out",
                      transitionDelay: isMobileMenuOpen
                        ? `${index * 30 + 60}ms`
                        : "0ms",
                      opacity: isMobileMenuOpen ? 1 : 0,
                      transform: isMobileMenuOpen
                        ? "translateX(0)"
                        : "translateX(12px)",
                    }}
                  >
                    {isActive && (
                      <span className="w-[3px] h-[3px] rounded-full bg-blue-600 dark:bg-blue-400 shrink-0" />
                    )}
                    {link.name}
                  </Link>
                );
              })}
            </nav>

            {/* Language Switcher */}
            <div
              className="mt-2"
              style={{
                transitionProperty: "opacity, transform",
                transitionDuration: "0.3s",
                transitionTimingFunction: "ease",
                transitionDelay: isMobileMenuOpen ? "320ms" : "0ms",
                opacity: isMobileMenuOpen ? 1 : 0,
                transform: isMobileMenuOpen
                  ? "translateY(0)"
                  : "translateY(6px)",
              }}
            >
              <button
                onClick={() => {
                  toggleLanguage();
                  setIsMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-neutral-50 dark:bg-neutral-800/80 text-neutral-600 dark:text-neutral-300 text-[14px] font-medium hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
              >
                <Image
                  src={language === "en" ? "/images/icons/mn.png" : "/en.png"}
                  alt="Switch Language"
                  width={16}
                  height={11}
                  className="rounded-sm"
                />
                {language === "en" ? "Монгол хэл" : "English"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
