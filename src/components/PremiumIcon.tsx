/**
 * PremiumIcon — A styled icon box with gradient background and glow shadow.
 * Use throughout the app to replace plain icons in KPI cards, stat rows, etc.
 */
import { type LucideIcon } from "lucide-react";

interface PremiumIconProps {
  icon: LucideIcon;
  color: string;       // base accent color, e.g. "#6366F1"
  color2?: string;     // optional second gradient color
  size?: number;       // icon size (default 20)
  boxSize?: number;    // container size in px (default 48)
  radius?: number;     // border radius (default 14)
  glow?: boolean;      // whether to add glow shadow (default true)
  soft?: boolean;      // use 15% opacity bg (default false = full gradient)
}

export default function PremiumIcon({
  icon: Icon,
  color,
  color2,
  size = 20,
  boxSize = 48,
  radius = 14,
  glow = true,
  soft = false,
}: PremiumIconProps) {
  const bg = soft
    ? `${color}20`
    : color2
    ? `linear-gradient(135deg, ${color}, ${color2})`
    : `linear-gradient(135deg, ${color}EE, ${color}88)`;

  return (
    <div
      style={{
        width: boxSize,
        height: boxSize,
        flexShrink: 0,
        borderRadius: radius,
        background: bg,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: glow && !soft
          ? `0 4px 16px ${color}50`
          : "none",
        transition: "box-shadow 0.2s",
      }}
    >
      <Icon size={size} color="white" strokeWidth={2} />
    </div>
  );
}

/** Convenience list of KPI / module colors used consistently across pages */
export const ICON_COLORS = {
  revenue:    { c1: "#8B0000", c2: "#D32F2F" },
  orders:     { c1: "#6366F1", c2: "#818CF8" },
  tables:     { c1: "#0EA5E9", c2: "#38BDF8" },
  kitchen:    { c1: "#F97316", c2: "#FB923C" },
  menu:       { c1: "#EC4899", c2: "#F472B6" },
  billing:    { c1: "#8B5CF6", c2: "#A78BFA" },
  inventory:  { c1: "#F59E0B", c2: "#FCD34D" },
  customers:  { c1: "#EF4444", c2: "#F87171" },
  staff:      { c1: "#06B6D4", c2: "#22D3EE" },
  reports:    { c1: "#84CC16", c2: "#A3E635" },
  success:    { c1: "#16A34A", c2: "#22C55E" },
  warning:    { c1: "#D97706", c2: "#F59E0B" },
  danger:     { c1: "#DC2626", c2: "#EF4444" },
  purple:     { c1: "#7C3AED", c2: "#8B5CF6" },
};
