import React from "react";
import { LucideIcon } from "lucide-react";

interface AboutCardProps {
  title: string;
  description?: string;
  icon: LucideIcon;
  bgColor?: string;
  children?: React.ReactNode;
  className?: string;
}

export const AboutCard: React.FC<AboutCardProps> = ({
  title,
  description,
  icon: Icon,
  bgColor = "bg-[#f4f7f9]",
  children,
  className = "",
}) => {
  return (
    <div
      className={`${bgColor} p-8 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 border border-transparent hover:border-[#0082b4]/10 group ${className}`}
    >
      <div className="bg-white w-14 h-14 rounded-xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform duration-300">
        <Icon className="w-8 h-8 text-gray-800" strokeWidth={1.5} />
      </div>
      <h3 className="text-xl font-bold mb-4 text-gray-900">{title}</h3>
      {description && (
        <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">
          {description}
        </p>
      )}
      {children}
    </div>
  );
};
