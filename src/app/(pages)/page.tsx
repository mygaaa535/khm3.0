"use client";

import { useLanguage } from "@/context/LanguageContext";

export default function Home() {
  const { t, language } = useLanguage();

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] py-12 px-4 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-1/4 -left-20 w-64 h-64 bg-blue-100/50 dark:bg-blue-900/20 rounded-full blur-3xl -z-10 animate-pulse"></div>
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-indigo-100/50 dark:bg-indigo-900/20 rounded-full blur-3xl -z-10 animate-pulse transition-delay-1000"></div>

      <div className="text-center max-w-3xl bg-white/70 dark:bg-neutral-900/70 backdrop-blur-xl p-12 rounded-[40px] shadow-2xl border border-white dark:border-neutral-800 transition-all duration-500 hover:shadow-blue-500/10 hover:border-blue-500/30">
        <h1 className="text-5xl font-black tracking-tight text-neutral-900 dark:text-white sm:text-7xl mb-6">
          <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 bg-clip-text text-transparent">
            {language === "mn" ? "Khan Khugshin" : "Welcome to"}
          </span>
          <br />
          {language === "mn" ? "олон улсын ХХК" : "Khan Khugshin"}
        </h1>
        
        <p className="text-xl text-neutral-600 dark:text-neutral-400 font-medium mb-10 leading-relaxed">
          {t("footertext")}
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <button className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold shadow-lg shadow-blue-600/20 transition-all hover:scale-105 active:scale-95">
            {t("Our projects")}
          </button>
          <button className="px-8 py-4 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white border border-neutral-200 dark:border-neutral-700 rounded-2xl font-bold transition-all hover:bg-neutral-50 dark:hover:bg-neutral-700">
            {t("About us")}
          </button>
        </div>
      </div>
    </div>
  );
}
