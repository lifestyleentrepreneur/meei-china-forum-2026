"use client";

import { useEffect, useState } from "react";

const TARGET = new Date("2026-10-17T09:00:00+08:00"); // Opening, Guangzhou time

function getTimeLeft() {
  const diff = TARGET.getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days:    Math.floor(diff / 86_400_000),
    hours:   Math.floor((diff % 86_400_000) / 3_600_000),
    minutes: Math.floor((diff % 3_600_000)  / 60_000),
    seconds: Math.floor((diff % 60_000)     / 1_000),
  };
}

type Variant = "dark" | "light";

function Bubble({
  value,
  label,
  variant,
}: {
  value: number;
  label: string;
  variant: Variant;
}) {
  const light = variant === "light";
  const textShadow = light ? "none" : "0 1px 10px rgba(0,0,0,0.6)";
  return (
    <div className="flex flex-col items-center gap-1.5">
      <div
        className="flex h-16 w-16 items-center justify-center rounded-full border sm:h-[72px] sm:w-[72px]"
        style={{
          borderColor: light ? "rgba(0,0,0,0.14)" : "rgba(255,255,255,0.28)",
          background: light ? "rgba(255,255,255,0.55)" : "rgba(0,0,0,0.28)",
          backdropFilter: "blur(12px)",
        }}
      >
        <span
          className="font-heading font-bold leading-none tabular-nums"
          style={{
            fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)",
            color: light ? "#111111" : "#ffffff",
            textShadow,
          }}
        >
          {String(value).padStart(2, "0")}
        </span>
      </div>
      <span
        className="font-body text-[9px] font-semibold uppercase tracking-[0.2em]"
        style={{
          color: light ? "rgba(0,0,0,0.55)" : "rgba(255,255,255,0.85)",
          textShadow,
        }}
      >
        {label}
      </span>
    </div>
  );
}

export default function CountdownTimer({
  variant = "dark",
}: {
  variant?: Variant;
}) {
  const [time, setTime] = useState(getTimeLeft);

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex items-end gap-3 sm:gap-4" aria-label="Countdown to summit opening">
      <Bubble value={time.days}    label="Days"  variant={variant} />
      <Bubble value={time.hours}   label="Hours" variant={variant} />
      <Bubble value={time.minutes} label="Min"   variant={variant} />
      <Bubble value={time.seconds} label="Sec"   variant={variant} />
    </div>
  );
}
