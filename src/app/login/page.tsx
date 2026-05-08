"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  MonitorCheck, Package, Users, TrendingUp, ArrowRight, ShieldCheck,
  Crown, BarChart2, CreditCard, Utensils, ChefHat, BarChart3, Mail, EyeOff, Eye, Lock
} from "lucide-react";
import PremiumIcon, { ICON_COLORS } from "@/components/PremiumIcon";

const ROLES = [
  {
    id: "admin",
    label: "Admin",
    icon: Crown,
    desc: "Full system access",
    iconSet: ICON_COLORS.revenue,
    email: "admin@rizqara.com",
    password: "admin123",
    redirect: "/dashboard",
  },
  {
    id: "manager",
    label: "Manager",
    icon: BarChart2,
    desc: "Reports & operations",
    iconSet: ICON_COLORS.menu,
    email: "manager@rizqara.com",
    password: "manager123",
    redirect: "/reports",
  },
  {
    id: "cashier",
    label: "Cashier",
    icon: CreditCard,
    desc: "Billing & payments",
    iconSet: ICON_COLORS.orders,
    email: "cashier@rizqara.com",
    password: "cashier123",
    redirect: "/billing",
  },
  {
    id: "waiter",
    label: "Waiter",
    icon: Utensils,
    desc: "Orders & tables",
    iconSet: ICON_COLORS.success,
    email: "waiter@rizqara.com",
    password: "waiter123",
    redirect: "/tables",
  },
  {
    id: "kitchen",
    label: "Kitchen",
    icon: ChefHat,
    desc: "Kitchen display",
    iconSet: ICON_COLORS.warning,
    email: "kitchen@rizqara.com",
    password: "kitchen123",
    redirect: "/kitchen",
  },
];

const FEATURES = [
  { icon: BarChart3, label: "Real-time Analytics" },
  { icon: MonitorCheck, label: "Kitchen Display" },
  { icon: CreditCard, label: "Multi-Payment" },
  { icon: Package, label: "Smart Inventory" },
  { icon: Users, label: "Customer CRM" },
  { icon: TrendingUp, label: "Profit Reports" },
];

export default function LoginPage() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState(ROLES[0]);
  const [email, setEmail] = useState(ROLES[0].email);
  const [password, setPassword] = useState(ROLES[0].password);
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRoleSelect = (role: typeof ROLES[0]) => {
    setSelectedRole(role);
    setEmail(role.email);
    setPassword(role.password);
    setError("");
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError("Please enter your credentials.");
      return;
    }
    // Validate credentials
    const matched = ROLES.find(
      (r) => r.email === email.trim() && r.password === password
    );
    if (!matched) {
      setError("Invalid email or password. Try the demo credentials shown.");
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    // Store role in session
    if (typeof window !== "undefined") {
      sessionStorage.setItem("rizqara_role", matched.id);
      sessionStorage.setItem("rizqara_user", matched.label);
    }
    router.push(matched.redirect);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        background:
          "linear-gradient(135deg, #4A0000 0%, #8B0000 55%, #A52A2A 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative circles */}
      {[200, 320, 480, 600, 160, 260].map((size, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            width: size,
            height: size,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.04)",
            top: `${[5, 35, 60, -10, 70, 20][i]}%`,
            left: `${[-5, 10, 20, 35, 5, 45][i]}%`,
            pointerEvents: "none",
          }}
        />
      ))}

      {/* Left branding panel */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "48px 56px",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div style={{ textAlign: "center", color: "white", maxWidth: 480 }}>
          {/* Logo icon */}
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 32 }}>
            <PremiumIcon icon={Utensils} color="#FFFFFF" color2="rgba(255,255,255,0.4)" size={32} boxSize={80} radius={24} glow />
          </div>

          <h1
            style={{
              fontFamily: "Poppins,sans-serif",
              fontSize: 48,
              fontWeight: 800,
              marginBottom: 14,
              lineHeight: 1.1,
              letterSpacing: "-1px",
            }}
          >
            Rizqara POS
          </h1>
          <p
            style={{
              fontSize: 16,
              opacity: 0.8,
              lineHeight: 1.7,
              marginBottom: 44,
            }}
          >
            The complete restaurant management system for modern dining
            experiences.
          </p>

          {/* Feature grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 10,
            }}
          >
            {FEATURES.map((f) => (
              <div
                key={f.label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  background: "rgba(255,255,255,0.08)",
                  borderRadius: 14,
                  padding: "12px 16px",
                  border: "1px solid rgba(255,255,255,0.12)",
                }}
              >
                <PremiumIcon icon={f.icon} color="white" color2="rgba(255,255,255,0.4)" size={14} boxSize={32} radius={8} glow={false} />
                <span style={{ fontSize: 13, fontWeight: 500 }}>{f.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right login panel */}
      <div
        style={{
          width: "100%",
          maxWidth: 540,
          background: "white",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "40px 44px",
          position: "relative",
          zIndex: 1,
          boxShadow: "-24px 0 80px rgba(0,0,0,0.25)",
          overflowY: "auto",
        }}
      >
        {/* Top brand mark */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginBottom: 36,
          }}
        >
          <div style={{ width: 44, height: 44 }}>
            <PremiumIcon icon={Utensils} color={ICON_COLORS.revenue.c1} color2={ICON_COLORS.revenue.c2} size={20} boxSize={44} radius={12} glow={false} />
          </div>
          <div>
            <div
              style={{
                fontFamily: "Poppins,sans-serif",
                fontWeight: 700,
                fontSize: 18,
                color: "var(--primary)",
                lineHeight: 1,
              }}
            >
              Rizqara POS
            </div>
            <div style={{ color: "var(--text-muted)", fontSize: 11, marginTop: 2 }}>
              Restaurant Management System
            </div>
          </div>
        </div>

        <h2
          style={{
            fontFamily: "Poppins,sans-serif",
            fontSize: 24,
            fontWeight: 700,
            color: "var(--text)",
            marginBottom: 4,
          }}
        >
          Welcome back
        </h2>
        <p
          style={{
            color: "var(--text-muted)",
            fontSize: 13,
            marginBottom: 24,
          }}
        >
          Select your role and sign in to continue
        </p>

        {/* Role selector */}
        <div style={{ marginBottom: 24 }}>
          <p
            style={{
              fontSize: 11,
              fontWeight: 700,
              color: "var(--text-muted)",
              textTransform: "uppercase",
              letterSpacing: "0.6px",
              marginBottom: 10,
            }}
          >
            Select Role
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(5, 1fr)",
              gap: 8,
            }}
          >
            {ROLES.map((role) => {
              const active = selectedRole.id === role.id;
              return (
                <button
                  key={role.id}
                  onClick={() => handleRoleSelect(role)}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 8,
                    padding: "14px 6px",
                    borderRadius: 16,
                    border: "2px solid",
                    cursor: "pointer",
                    transition: "all 0.2s",
                    borderColor: active ? "var(--primary)" : "var(--border)",
                    background: active ? "var(--primary-50)" : "white",
                    boxShadow: active ? "0 4px 12px rgba(139,0,0,0.1)" : "none",
                  }}
                >
                  <PremiumIcon icon={role.icon} color={role.iconSet.c1} color2={role.iconSet.c2} size={18} boxSize={40} radius={12} glow={active} />
                  <span
                    style={{
                      fontSize: 11,
                      fontWeight: 700,
                      color: active ? "var(--primary)" : "var(--text-muted)",
                    }}
                  >
                    {role.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Demo credentials hint */}
        <div
          style={{
            background: "var(--primary-50)",
            border: "1px solid var(--primary-200)",
            borderRadius: 10,
            padding: "10px 14px",
            marginBottom: 20,
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <selectedRole.icon
            size={16}
            color="var(--primary)"
            strokeWidth={2}
          />
          <div>
            <span
              style={{
                fontSize: 12,
                fontWeight: 700,
                color: "var(--primary)",
              }}
            >
              {selectedRole.label} credentials auto-filled.{" "}
            </span>
            <span style={{ fontSize: 11, color: "var(--text-muted)" }}>
              {selectedRole.desc} · Routes to{" "}
              <code
                style={{ fontWeight: 700, color: "var(--primary)" }}
              >
                {selectedRole.redirect}
              </code>
            </span>
          </div>
        </div>

        {/* Form */}
        <form
          onSubmit={handleLogin}
          style={{ display: "flex", flexDirection: "column", gap: 14 }}
        >
          <div>
            <label
              style={{
                display: "block",
                fontSize: 12,
                fontWeight: 700,
                color: "var(--text)",
                marginBottom: 6,
              }}
            >
              Email Address
            </label>
            <div style={{ position: "relative" }}>
              <Mail
                size={15}
                style={{
                  position: "absolute",
                  left: 14,
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "var(--text-muted)",
                }}
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-input"
                style={{ paddingLeft: 40 }}
              />
            </div>
          </div>

          <div>
            <label
              style={{
                display: "block",
                fontSize: 12,
                fontWeight: 700,
                color: "var(--text)",
                marginBottom: 6,
              }}
            >
              Password
            </label>
            <div style={{ position: "relative" }}>
              <Lock
                size={15}
                style={{
                  position: "absolute",
                  left: 14,
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "var(--text-muted)",
                }}
              />
              <input
                type={showPass ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-input"
                style={{ paddingLeft: 40, paddingRight: 44 }}
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                style={{
                  position: "absolute",
                  right: 12,
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "var(--text-muted)",
                  padding: 4,
                }}
              >
                {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <label
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                fontSize: 13,
                color: "var(--text-muted)",
                cursor: "pointer",
              }}
            >
              <input
                type="checkbox"
                defaultChecked
                style={{ accentColor: "var(--primary)" }}
              />
              Remember me
            </label>
            <a
              href="#"
              style={{
                color: "var(--primary)",
                fontSize: 13,
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              Forgot password?
            </a>
          </div>

          {error && (
            <div
              style={{
                background: "#FEE2E2",
                color: "#DC2626",
                padding: "10px 14px",
                borderRadius: 10,
                fontSize: 13,
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <Lock size={14} />
              {error}
            </div>
          )}

          <button
            type="submit"
            className="btn-primary"
            disabled={loading}
            style={{
              padding: "14px",
              fontSize: 15,
              marginTop: 4,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
            }}
          >
            {loading ? (
              <>
                <div
                  style={{
                    width: 18,
                    height: 18,
                    border: "2.5px solid rgba(255,255,255,0.3)",
                    borderTopColor: "white",
                    borderRadius: "50%",
                    animation: "spin 0.8s linear infinite",
                  }}
                />
                Signing in...
              </>
            ) : (
              <>
                Sign In
                <ArrowRight size={18} />
              </>
            )}
          </button>
        </form>

        {/* Footer */}
        <div
          style={{
            marginTop: 28,
            paddingTop: 20,
            borderTop: "1px solid var(--border)",
            textAlign: "center",
            fontSize: 12,
            color: "var(--text-muted)",
          }}
        >
          <div style={{ marginTop: "auto", textAlign: "center", color: "var(--text-muted)", fontSize: "12px" }}>
            &copy; 2026 Rizqara Tech
          </div>
          <p style={{ marginTop: 3, fontSize: 11 }}>
            Version 1.0 &nbsp;·&nbsp; All rights reserved
          </p>
        </div>
      </div>

    </div>
  );
}
