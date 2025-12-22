import React from "react";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
}

export const PageHeader = ({ title, subtitle }: PageHeaderProps) => {
  return (
    <div className="pt-40 pb-20 px-6 text-center relative z-10">
      <div className="overflow-hidden mb-4">
        <h1 className="font-display text-6xl md:text-8xl text-mercury mix-blend-overlay reveal-text tracking-tighter animate-in fade-in slide-in-from-bottom-10 duration-1000">
          {title}
        </h1>
      </div>
      {subtitle && (
        <p className="font-sans text-sm md:text-base text-platinum/60 tracking-[0.2em] uppercase animate-in fade-in slide-in-from-bottom-5 duration-1000 delay-200">
          {subtitle}
        </p>
      )}
    </div>
  );
};
