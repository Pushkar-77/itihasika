"use client";

import { useState } from "react";

interface PricingToggleProps {
  monthlyPrice?: string;
  annualPrice?: string;
  className?: string;
  isAnnual?: boolean;
  onChange?: (isAnnual: boolean) => void;
}

/**
 * Sliding pill toggle for Monthly ↔ Annual pricing.
 * Matches design/home-04.png:
 * - Width 19.8vw, height 3.7vw, fully rounded
 * - No shadow, no border
 * - Yellow #FFC800 active half, white inactive half
 * - Sliding pill animation
 */
export function PricingToggle({
  monthlyPrice = "$9.99",
  annualPrice = "$101",
  className = "",
  isAnnual: controlledIsAnnual,
  onChange,
}: PricingToggleProps) {
  const [internalIsAnnual, setInternalIsAnnual] = useState(false);
  const isAnnual =
    controlledIsAnnual !== undefined ? controlledIsAnnual : internalIsAnnual;

  const handleSetAnnual = (value: boolean) => {
    if (controlledIsAnnual === undefined) {
      setInternalIsAnnual(value);
    }
    onChange?.(value);
  };

  return (
    <div
      className={`relative inline-flex items-center rounded-full bg-white select-none overflow-hidden p-0 shadow-none border-0 w-[260px] h-[50px] sm:w-[300px] sm:h-[56px] lg:w-[19.8vw] lg:h-[3.7vw] ${className}`}
    >
      {/* Sliding yellow active background pill */}
      <div
        className={`absolute top-0 bottom-0 left-0 w-1/2 rounded-full bg-[#FFC800] transition-transform duration-300 ease-in-out ${
          isAnnual ? "translate-x-full" : "translate-x-0"
        }`}
        aria-hidden="true"
      />

      {/* Monthly Button */}
      <button
        type="button"
        onClick={() => handleSetAnnual(false)}
        className="relative z-10 w-1/2 h-full flex flex-col items-center justify-center cursor-pointer transition-colors duration-200"
        aria-pressed={!isAnnual}
      >
        <span
          className={`font-body text-[11px] sm:text-xs lg:text-[0.72vw] font-medium leading-none transition-colors duration-200 ${
            !isAnnual ? "text-[#0B0B0B]" : "text-[#777777]"
          }`}
        >
          Monthly
        </span>
        <span
          className={`font-body text-base sm:text-lg lg:text-[1.3vw] font-bold leading-tight mt-0.5 lg:mt-[0.1vw] transition-colors duration-200 ${
            !isAnnual ? "text-[#0B0B0B]" : "text-[#777777]"
          }`}
        >
          {monthlyPrice}
        </span>
      </button>

      {/* Annually Button */}
      <button
        type="button"
        onClick={() => handleSetAnnual(true)}
        className="relative z-10 w-1/2 h-full flex flex-col items-center justify-center cursor-pointer transition-colors duration-200"
        aria-pressed={isAnnual}
      >
        <span
          className={`font-body text-[11px] sm:text-xs lg:text-[0.72vw] font-medium leading-none transition-colors duration-200 ${
            isAnnual ? "text-[#0B0B0B]" : "text-[#777777]"
          }`}
        >
          Annually
        </span>
        <span
          className={`font-body text-base sm:text-lg lg:text-[1.3vw] font-bold leading-tight mt-0.5 lg:mt-[0.1vw] transition-colors duration-200 ${
            isAnnual ? "text-[#0B0B0B]" : "text-[#777777]"
          }`}
        >
          {annualPrice}
        </span>
      </button>
    </div>
  );
}
