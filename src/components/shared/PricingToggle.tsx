"use client";

import { useState } from "react";

interface PricingToggleProps {
  monthlyPrice: string;
  annualPrice: string;
  className?: string;
  isAnnual?: boolean;
  onChange?: (isAnnual: boolean) => void;
}

/**
 * Sliding pill toggle for Monthly ↔ Annual pricing.
 * The active side gets the yellow background; the inactive side is muted.
 */
export function PricingToggle({
  monthlyPrice,
  annualPrice,
  className = "",
  isAnnual: controlledIsAnnual,
  onChange,
}: PricingToggleProps) {
  const [internalIsAnnual, setInternalIsAnnual] = useState(false);
  const isAnnual = controlledIsAnnual !== undefined ? controlledIsAnnual : internalIsAnnual;

  const handleSetAnnual = (value: boolean) => {
    if (controlledIsAnnual === undefined) {
      setInternalIsAnnual(value);
    }
    onChange?.(value);
  };

  return (
    <div
      className={`inline-flex items-stretch rounded-full bg-white p-1 shadow-md ${className}`}
    >
      <button
        onClick={() => handleSetAnnual(false)}
        className={`flex flex-col items-center justify-center rounded-full px-6 py-2 transition-colors duration-300 cursor-pointer ${
          !isAnnual
            ? "bg-yellow text-navy"
            : "bg-transparent text-gray-400"
        }`}
        aria-pressed={!isAnnual}
      >
        <span className="text-[11px] font-medium tracking-wide">Monthly</span>
        <span className="text-lg font-bold leading-tight">{monthlyPrice}</span>
      </button>
      <button
        onClick={() => handleSetAnnual(true)}
        className={`flex flex-col items-center justify-center rounded-full px-6 py-2 transition-colors duration-300 cursor-pointer ${
          isAnnual
            ? "bg-yellow text-navy"
            : "bg-transparent text-gray-400"
        }`}
        aria-pressed={isAnnual}
      >
        <span className="text-[11px] font-medium tracking-wide">Annually</span>
        <span className="text-lg font-bold leading-tight">{annualPrice}</span>
      </button>
    </div>
  );
}
