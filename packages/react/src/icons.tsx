import type { SVGAttributes } from "react";

export const iconNames = [
  "arrowRight",
  "box",
  "chart",
  "check",
  "chevronDown",
  "chevronLeft",
  "chevronRight",
  "chevronUp",
  "close",
  "cloud",
  "copy",
  "dashboard",
  "database",
  "download",
  "externalLink",
  "eye",
  "eyeOff",
  "file",
  "info",
  "lock",
  "menu",
  "minus",
  "moon",
  "plus",
  "refresh",
  "search",
  "server",
  "settings",
  "success",
  "sun",
  "terminal",
  "trash",
  "upload",
  "user",
  "warning",
] as const;

export type IconName = (typeof iconNames)[number];

export interface IconProps extends SVGAttributes<SVGSVGElement> {
  name: IconName;
  size?: number;
  label?: string;
}

export function Icon({ name, size = 20, label, className = "", ...props }: IconProps) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className: `bui-icon ${className}`,
    "aria-hidden": label ? undefined : true,
    role: label ? "img" : undefined,
  };

  const paths = (() => {
    if (name === "arrowRight") return <><path d="M5 12h14" /><path d="m14 7 5 5-5 5" /></>;
    if (name === "box") return <><path d="m12 3 8 4.5-8 4.5-8-4.5L12 3Z" /><path d="M4 7.5V16.5L12 21l8-4.5V7.5" /><path d="M12 12v9" /></>;
    if (name === "chart") return <><path d="M4 20V10" /><path d="M10 20V4" /><path d="M16 20v-7" /><path d="M22 20V7" /></>;
    if (name === "check" || name === "success") return <><path d="m5 12 4 4L19 6" />{name === "success" ? <rect x="3" y="3" width="18" height="18" rx="2" /> : null}</>;
    if (name === "chevronDown") return <path d="m7 9 5 5 5-5" />;
    if (name === "chevronLeft") return <path d="m14 7-5 5 5 5" />;
    if (name === "chevronRight") return <path d="m10 7 5 5-5 5" />;
    if (name === "chevronUp") return <path d="m7 15 5-5 5 5" />;
    if (name === "close") return <><path d="m6 6 12 12" /><path d="M18 6 6 18" /></>;
    if (name === "cloud") return <path d="M7 18h10a4 4 0 0 0 .7-7.94A6 6 0 0 0 6.2 8.4 4.8 4.8 0 0 0 7 18Z" />;
    if (name === "copy") return <><rect x="8" y="8" width="12" height="12" rx="2" /><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2" /></>;
    if (name === "dashboard") return <><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></>;
    if (name === "database") return <><ellipse cx="12" cy="5" rx="8" ry="3" /><path d="M4 5v6c0 1.7 3.6 3 8 3s8-1.3 8-3V5" /><path d="M4 11v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6" /></>;
    if (name === "download") return <><path d="M12 3v12" /><path d="m7 10 5 5 5-5" /><path d="M4 21h16" /></>;
    if (name === "externalLink") return <><path d="M14 4h6v6" /><path d="m20 4-9 9" /><path d="M18 13v6a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h6" /></>;
    if (name === "eye" || name === "eyeOff") return <>{name === "eyeOff" ? <path d="m3 3 18 18" /> : null}<path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z" /><circle cx="12" cy="12" r="2.5" /></>;
    if (name === "file") return <><path d="M6 3h8l4 4v14H6V3Z" /><path d="M14 3v5h5" /></>;
    if (name === "info") return <><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M12 10v6" /><path d="M12 7h.01" /></>;
    if (name === "lock") return <><rect x="5" y="10" width="14" height="11" rx="2" /><path d="M8 10V7a4 4 0 0 1 8 0v3" /></>;
    if (name === "menu") return <><path d="M4 7h16" /><path d="M4 12h16" /><path d="M4 17h16" /></>;
    if (name === "minus") return <path d="M5 12h14" />;
    if (name === "moon") return <path d="M20 15.5A8 8 0 0 1 8.5 4 8.5 8.5 0 1 0 20 15.5Z" />;
    if (name === "plus") return <><path d="M12 5v14" /><path d="M5 12h14" /></>;
    if (name === "refresh") return <><path d="M20 6v5h-5" /><path d="M4 18v-5h5" /><path d="M6.1 8A7 7 0 0 1 18.7 6.7L20 11" /><path d="m4 13 1.3 4.3A7 7 0 0 0 17.9 16" /></>;
    if (name === "search") return <><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></>;
    if (name === "server") return <><rect x="3" y="4" width="18" height="6" rx="2" /><rect x="3" y="14" width="18" height="6" rx="2" /><path d="M7 7h.01" /><path d="M7 17h.01" /></>;
    if (name === "settings") return <><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-2.8 2.8-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6v.2h-4V21a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1L4.2 17l.1-.1a1.7 1.7 0 0 0 .3-1.9A1.7 1.7 0 0 0 3 14H2.8v-4H3a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9L4.2 7 7 4.2l.1.1a1.7 1.7 0 0 0 1.9.3A1.7 1.7 0 0 0 10 3v-.2h4V3a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1L19.8 7l-.1.1a1.7 1.7 0 0 0-.3 1.9A1.7 1.7 0 0 0 21 10h.2v4H21a1.7 1.7 0 0 0-1.6 1Z" /></>;
    if (name === "sun") return <><circle cx="12" cy="12" r="4" /><path d="M12 2v2" /><path d="M12 20v2" /><path d="m4.93 4.93 1.42 1.42" /><path d="m17.65 17.65 1.42 1.42" /><path d="M2 12h2" /><path d="M20 12h2" /><path d="m6.35 17.65-1.42 1.42" /><path d="m19.07 4.93-1.42 1.42" /></>;
    if (name === "terminal") return <><rect x="3" y="4" width="18" height="16" rx="2" /><path d="m7 9 3 3-3 3" /><path d="M13 15h4" /></>;
    if (name === "trash") return <><path d="M4 7h16" /><path d="M9 7V4h6v3" /><path d="m6 7 1 14h10l1-14" /><path d="M10 11v6" /><path d="M14 11v6" /></>;
    if (name === "upload") return <><path d="M12 21V9" /><path d="m7 14 5-5 5 5" /><path d="M4 3h16" /></>;
    if (name === "user") return <><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></>;
    return <><path d="M12 3 2.5 20h19L12 3Z" /><path d="M12 9v5" /><path d="M12 17h.01" /></>;
  })();

  return <svg {...common} {...props}>{label ? <title>{label}</title> : null}{paths}</svg>;
}
