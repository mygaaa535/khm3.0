"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

export default function ContactPage() {
  const { t } = useLanguage();
  const [isMounted, setIsMounted] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [formState, setFormState] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    setIsMounted(true);

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name) newErrors.name = "Required";
    if (!formData.phone) newErrors.phone = "Required";
    if (!formData.email) {
      newErrors.email = "Required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email";
    }
    if (!formData.message) newErrors.message = "Required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setFormState("loading");

    // Simulate API call
    setTimeout(() => {
      setFormState("success");
      setFormData({ name: "", phone: "", email: "", message: "" });

      // Reset after 5 seconds
      setTimeout(() => setFormState("idle"), 5000);
    }, 1500);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[60vh] w-full overflow-hidden">
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            transform: `translateY(${scrollY * 0.4}px)`,
          }}
        >
          <Image
            src="/images/icons/contactZurag.png"
            alt="Contact Hero"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/20" />
        </div>

        <div className="absolute inset-0 flex items-center justify-center text-center px-4">
          <div
            className={`transition-all duration-1000 ease-out transform ${
              isMounted
                ? "translate-y-0 opacity-100"
                : "translate-y-12 opacity-0"
            }`}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight  ">
              {t("Contact")}
            </h1>
          </div>
        </div>
      </section>

      <div className="max-w-[1000px] mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Column: Contact Info */}
          <div
            className={`space-y-8 transition-all duration-1000 delay-300 transform ${
              isMounted
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }`}
          >
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-8 tracking-tight">
                {t("Contact")}
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-8">
                {/* Address */}
                <div>
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5">
                    {t("Address")}
                  </h3>
                  <p className="text-gray-600 text-base leading-relaxed max-w-xs">
                    {t("AddressDetail")}
                  </p>
                </div>

                {/* Phone & Email */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5">
                      {t("Tel")}
                    </h3>
                    <a
                      href="tel:78001100"
                      className="text-gray-900 text-base hover:text-gray-600 transition-colors"
                    >
                      78001100
                    </a>
                  </div>

                  <div>
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5">
                      {t("Email")}
                    </h3>
                    <a
                      href="mailto:Info@khm.mn"
                      className="text-gray-900 text-base hover:text-gray-600 transition-colors"
                    >
                      Info@khm.mn
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Feedback Form */}
          <div
            className={`transition-all duration-1000 delay-500 transform ${
              isMounted
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }`}
          >
            <h2 className="text-lg font-medium text-gray-900 mb-8 tracking-tight">
              {t("Feedback")}
            </h2>

            {formState === "success" ? (
              <div className="py-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h3 className="text-xl font-light text-gray-900 mb-2">
                  {t("Thank you for your message!")}
                </h3>
                <p className="text-gray-500 text-base">
                  {t("We will contact you shortly.")}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-1.5 border-b border-gray-100 pb-1">
                    <label
                      htmlFor="name"
                      className="text-xs font-bold text-gray-400 uppercase tracking-widest"
                    >
                      {t("Name")}
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Name"
                      className="w-full py-1 bg-transparent text-base text-gray-900 outline-none placeholder:text-gray-300"
                    />
                    {errors.name && (
                      <span className="text-xs text-red-500 uppercase tracking-tighter">
                        {errors.name}
                      </span>
                    )}
                  </div>

                  <div className="space-y-1.5 border-b border-gray-100 pb-1">
                    <label
                      htmlFor="phone"
                      className="text-xs font-bold text-gray-400 uppercase tracking-widest"
                    >
                      {t("Tel")}
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Phone"
                      className="w-full py-1 bg-transparent text-base text-gray-900 outline-none placeholder:text-gray-300"
                    />
                    {errors.phone && (
                      <span className="text-xs text-red-500 uppercase tracking-tighter">
                        {errors.phone}
                      </span>
                    )}
                  </div>
                </div>

                <div className="space-y-1.5 border-b border-gray-100 pb-1">
                  <label
                    htmlFor="email"
                    className="text-xs font-bold text-gray-400 uppercase tracking-widest"
                  >
                    {t("Email")}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Email"
                    className="w-full py-1 bg-transparent text-base text-gray-900 outline-none placeholder:text-gray-300"
                  />
                  {errors.email && (
                    <span className="text-xs text-red-500 uppercase tracking-tighter">
                      {errors.email}
                    </span>
                  )}
                </div>

                <div className="space-y-1.5 border-b border-gray-100 pb-1">
                  <label
                    htmlFor="message"
                    className="text-xs font-bold text-gray-400 uppercase tracking-widest"
                  >
                    {t("Message")}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={2}
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Your message"
                    className="w-full py-1 bg-transparent text-base text-gray-900 outline-none resize-none placeholder:text-gray-300"
                  />
                  {errors.message && (
                    <span className="text-xs text-red-500 uppercase tracking-tighter">
                      {errors.message}
                    </span>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={formState === "loading"}
                  className="w-full sm:w-auto px-8 py-3 bg-gray-900 text-white text-xs font-bold uppercase tracking-widest hover:bg-gray-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {formState === "loading" ? "Sending..." : t("Submit")}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
