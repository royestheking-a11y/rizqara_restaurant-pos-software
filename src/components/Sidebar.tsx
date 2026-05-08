"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, ShoppingCart, Grid3X3, ChefHat,
  Utensils, ClipboardList, CreditCard, Package,
  Users, UserCheck, BarChart3, Settings, LogOut,
  Bell, Store
} from "lucide-react";
import { useEffect, useState } from "react";

// Premium per-icon colors — each nav item has its own accent color
const ALL_NAV = [
  { href: "/dashboard", label: "Dashboard",  icon: LayoutDashboard, color: "#6366F1", roles: ["admin","manager"] },
  { href: "/pos",       label: "POS Screen",  icon: ShoppingCart,    color: "#8B0000", roles: ["admin","cashier","waiter"] },
  { href: "/tables",    label: "Tables",      icon: Grid3X3,         color: "#0EA5E9", roles: ["admin","manager","waiter"] },
  { href: "/kitchen",   label: "Kitchen",     icon: ChefHat,         color: "#F97316", roles: ["admin","kitchen"] },
  { href: "/menu",      label: "Menu",        icon: Utensils,        color: "#EC4899", roles: ["admin","manager"] },
  { href: "/orders",    label: "Orders",      icon: ClipboardList,   color: "#10B981", roles: ["admin","manager","cashier","waiter"] },
  { href: "/billing",   label: "Billing",     icon: CreditCard,      color: "#8B5CF6", roles: ["admin","cashier"] },
  { href: "/inventory", label: "Inventory",   icon: Package,         color: "#F59E0B", roles: ["admin","manager"] },
  { href: "/customers", label: "Customers",   icon: Users,           color: "#EF4444", roles: ["admin","manager","cashier"] },
  { href: "/staff",     label: "Staff",       icon: UserCheck,       color: "#06B6D4", roles: ["admin","manager"] },
  { href: "/reports",   label: "Reports",     icon: BarChart3,       color: "#84CC16", roles: ["admin","manager"] },
  { href: "/settings",  label: "Settings",    icon: Settings,        color: "#94A3B8", roles: ["admin"] },
];

const BADGE_COUNTS: Record<string, number> = {
  "/orders": 5,
  "/kitchen": 4,
};

const ROLE_LABELS: Record<string, string> = {
  admin:   "Administrator",
  manager: "Manager",
  cashier: "Cashier",
  waiter:  "Waiter",
  kitchen: "Kitchen Staff",
};

export default function Sidebar() {
  const pathname  = usePathname();
  const [role, setRole]         = useState("admin");
  const [userName, setUserName] = useState("Admin User");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setRole(sessionStorage.getItem("rizqara_role") || "admin");
      setUserName(sessionStorage.getItem("rizqara_user") || "Admin User");
    }
  }, []);

  const navItems = role === "admin"
    ? ALL_NAV
    : ALL_NAV.filter((item) => item.roles.includes(role));

  return (
    <aside className="sidebar">
      {/* ── Brand ── */}
      <div style={{ padding: "22px 18px 16px", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{
            width: 44, height: 44, flexShrink: 0,
            background: "linear-gradient(135deg,rgba(255,255,255,0.25),rgba(255,255,255,0.08))",
            borderRadius: 12, border: "1px solid rgba(255,255,255,0.2)",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 4px 16px rgba(0,0,0,0.2)",
          }}>
            <Store size={22} color="white" strokeWidth={2} />
          </div>
          <div>
            <div style={{ color: "white", fontFamily: "Poppins,sans-serif", fontWeight: 700, fontSize: 17, lineHeight: 1 }}>
              Rizqara
            </div>
            <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 11, marginTop: 3 }}>Point of Sale</div>
          </div>
        </div>
      </div>

      {/* ── User pill ── */}
      <div style={{ padding: "13px 14px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{
          display: "flex", alignItems: "center", gap: 10,
          background: "rgba(255,255,255,0.07)", borderRadius: 12, padding: "10px 12px",
        }}>
          {/* Avatar */}
          <div style={{
            width: 36, height: 36, flexShrink: 0,
            background: "linear-gradient(135deg,#FF6B6B,#8B0000)",
            borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 14, fontWeight: 700, color: "white",
            boxShadow: "0 2px 8px rgba(139,0,0,0.5)",
          }}>
            {userName.charAt(0).toUpperCase()}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ color: "white", fontWeight: 700, fontSize: 13, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              {userName}
            </div>
            <div style={{ color: "rgba(255,255,255,0.45)", fontSize: 11, marginTop: 1 }}>
              {ROLE_LABELS[role] || "User"}
            </div>
          </div>
          <div style={{
            width: 28, height: 28, borderRadius: 8, cursor: "pointer",
            background: "rgba(255,255,255,0.08)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <Bell size={14} color="rgba(255,255,255,0.5)" />
          </div>
        </div>
      </div>

      {/* ── Navigation ── */}
      <nav style={{ flex: 1, padding: "10px 10px", overflowY: "auto", overflowX: "hidden" }}>
        {navItems.map((item) => {
          const active = pathname === item.href || pathname.startsWith(item.href + "/");
          const badge  = BADGE_COUNTS[item.href];

          return (
            <Link key={item.href} href={item.href}
              style={{
                display: "flex", alignItems: "center", gap: 12,
                padding: "8px 10px", borderRadius: 12, marginBottom: 2,
                textDecoration: "none", transition: "all 0.15s",
                background: active ? "rgba(255,255,255,0.12)" : "transparent",
              }}
            >
              {/* ── Premium icon box ── */}
              <div style={{
                width: 34, height: 34, flexShrink: 0, borderRadius: 10,
                display: "flex", alignItems: "center", justifyContent: "center",
                transition: "all 0.15s",
                background: active
                  ? item.color                               // solid accent when active
                  : `${item.color}28`,                       // very subtle when inactive
                boxShadow: active
                  ? `0 4px 12px ${item.color}80`             // glowing shadow when active
                  : "none",
              }}>
                <item.icon
                  size={16}
                  strokeWidth={active ? 2.5 : 2}
                  color={active ? "white" : item.color}
                />
              </div>

              <span style={{
                fontSize: 13, flex: 1,
                fontWeight: active ? 700 : 500,
                color: active ? "white" : "rgba(255,255,255,0.6)",
              }}>
                {item.label}
              </span>

              {badge && (
                <span style={{
                  background: item.href === "/kitchen" ? "#F97316" : `${item.color}CC`,
                  color: "white", fontSize: 10, fontWeight: 800,
                  padding: "2px 7px", borderRadius: 99, lineHeight: 1.5,
                }}>
                  {badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* ── Footer ── */}
      <div style={{ padding: "10px 10px 14px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ fontSize: 10, color: "rgba(255,255,255,0.25)", padding: "0 10px 8px", fontWeight: 600 }}>
          v1.0.0 &nbsp;·&nbsp; Rizqara POS
        </div>
        <Link href="/login"
          onClick={() => typeof window !== "undefined" && sessionStorage.clear()}
          style={{
            display: "flex", alignItems: "center", gap: 12,
            padding: "9px 10px", borderRadius: 12,
            textDecoration: "none", transition: "all 0.15s",
            color: "rgba(255,255,255,0.5)",
          }}
        >
          <div style={{
            width: 34, height: 34, borderRadius: 10,
            background: "rgba(239,68,68,0.15)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <LogOut size={16} color="#EF4444" strokeWidth={2} />
          </div>
          <span style={{ fontSize: 13, fontWeight: 500 }}>Sign Out</span>
        </Link>
      </div>
    </aside>
  );
}
