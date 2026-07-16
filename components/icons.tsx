import type { NivelRiesgo } from "@/lib/types";

export function IconSearch({ dark = false }: { dark?: boolean }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      stroke={dark ? "#166534" : "rgba(255,255,255,0.85)"}
      strokeWidth="2.2"
      strokeLinecap="round"
    >
      <circle cx="11" cy="11" r="7" />
      <path d="M20 20l-3.5-3.5" />
    </svg>
  );
}

export function IconGrid() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <rect x="3" y="3" width="8" height="8" rx="1.5" />
      <rect x="13" y="3" width="8" height="8" rx="1.5" />
      <rect x="3" y="13" width="8" height="8" rx="1.5" />
      <rect x="13" y="13" width="8" height="8" rx="1.5" />
    </svg>
  );
}

export function IconHistory() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden
    >
      <path d="M3 12a9 9 0 1 0 3-6.7" strokeLinecap="round" />
      <path d="M3 4v5h5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 7v5l3 2" strokeLinecap="round" />
    </svg>
  );
}

export function IconPin() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z" />
    </svg>
  );
}

export function IconClock() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" strokeLinecap="round" />
    </svg>
  );
}

export function IconThermo({ size = 14 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden
    >
      <path
        d="M10 14.5V5a2 2 0 1 1 4 0v9.5a3.5 3.5 0 1 1-4 0z"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function IconDrop({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 3s6 7 6 11a6 6 0 1 1-12 0c0-4 6-11 6-11z" />
    </svg>
  );
}

export function IconWind({ size = 14 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden
    >
      <path d="M3 8h11a3 3 0 1 0-3-3" strokeLinecap="round" />
      <path d="M3 12h14a3 3 0 1 1-3 3" strokeLinecap="round" />
      <path d="M3 16h8a2.5 2.5 0 1 1-2.5 2.5" strokeLinecap="round" />
    </svg>
  );
}

export function IconEye() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden
    >
      <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

export function IconLeaf() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="12" fill="white" fillOpacity="0.2" />
      <path
        d="M12 18c0-4 2.5-7 6-8-1 4-3.5 6-6 8zm0 0c0-4-2.5-7-6-8 1 4 3.5 6 6 8z"
        fill="white"
      />
      <path d="M12 18V9" stroke="white" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function WeatherEmptyIcon() {
  return (
    <svg width="72" height="72" viewBox="0 0 72 72" aria-hidden>
      <circle cx="36" cy="30" r="16" fill="#FBBF24" />
      <ellipse cx="44" cy="42" rx="18" ry="12" fill="#E5E7EB" />
      <ellipse cx="30" cy="44" rx="14" ry="10" fill="#F3F4F6" />
    </svg>
  );
}

export function NivelIcon({ nivel }: { nivel: NivelRiesgo }) {
  switch (nivel) {
    case "alto":
    case "critico":
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="white" aria-hidden>
          <path d="M12 2c1.5 3.5-1 5.5-1 8a4 4 0 0 0 8 0c0-3.5-3-5.5-3-9 3 2.5 6 6 6 10.5a8 8 0 1 1-16 0C6 9 9 5 12 2z" />
        </svg>
      );
    case "optimo":
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M12 20V11" stroke="white" strokeWidth="2" strokeLinecap="round" />
          <path
            d="M12 12c3.2-1.2 5.2-4 5.5-7.5-4 .8-6.5 3.8-5.5 7.5z"
            fill="white"
          />
          <path
            d="M12 12c-3.2-1.2-5.2-4-5.5-7.5 4 .8 6.5 3.8 5.5 7.5z"
            fill="white"
          />
        </svg>
      );
    case "medio":
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M7 15a5 5 0 0 1 9.9-1H18a3.5 3.5 0 1 1 0 7H7.5a4.5 4.5 0 1 1-.5-9"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      );
    case "bajo":
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
          <circle cx="12" cy="12" r="9" stroke="white" strokeWidth="2" />
          <path
            d="M8 12.5l2.5 2.5L16 9.5"
            stroke="white"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
  }
}
