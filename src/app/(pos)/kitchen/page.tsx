"use client";
import { useState, useEffect, useCallback } from "react";
import { useKitchenStore, KitchenStatus } from "@/lib/store";
import { Clock, CheckCircle2, ChefHat, Timer as TimerIcon, Utensils, Truck, Package, MessageSquare, Flame, CheckCircle, Bell } from "lucide-react";
import PremiumIcon, { ICON_COLORS } from "@/components/PremiumIcon";

const STATUS_CONFIG: Record<KitchenStatus, { label: string; cardClass: string; color: string; nextStatus: KitchenStatus | null; actionLabel: string; icon: any; iconSet: any }> = {
  new:     { label: "New Order", cardClass: "kitchen-card kitchen-card-new",     color: "#F97316", nextStatus: "cooking", actionLabel: "Start Cooking", icon: Bell,      iconSet: ICON_COLORS.warning },
  cooking: { label: "Cooking",   cardClass: "kitchen-card kitchen-card-cooking", color: "#D97706", nextStatus: "ready",   actionLabel: "Mark Ready",    icon: Flame,     iconSet: ICON_COLORS.orders },
  ready:   { label: "Ready",     cardClass: "kitchen-card kitchen-card-ready",   color: "#16A34A", nextStatus: "served",  actionLabel: "Mark Served",   icon: CheckCircle, iconSet: ICON_COLORS.success },
  served:  { label: "Served",    cardClass: "kitchen-card kitchen-card-served",  color: "#94A3B8", nextStatus: null,     actionLabel: "",              icon: Package,    iconSet: ICON_COLORS.staff },
};

function Timer({ createdAt }: { createdAt: string }) {
  const [elapsed, setElapsed] = useState(0);

  const calc = useCallback(() => {
    const diff = Math.floor((Date.now() - new Date(createdAt).getTime()) / 1000);
    setElapsed(diff);
  }, [createdAt]);

  useEffect(() => {
    calc();
    const id = setInterval(calc, 1000);
    return () => clearInterval(id);
  }, [calc]);

  const mins = Math.floor(elapsed / 60);
  const secs = elapsed % 60;
  const isLong = mins >= 15;
  const isMed = mins >= 8;

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6, fontWeight: 700, fontSize: 13,
      color: isLong ? "#DC2626" : isMed ? "#D97706" : "#16A34A" }}>
      <Clock size={14} className={isLong ? "pulse-dot" : ""} />
      {mins}:{secs.toString().padStart(2, "0")}
      {isLong && <span style={{ fontSize: 10, background: "#FEE2E2", color: "#DC2626", padding: "1px 5px", borderRadius: 99 }}>LATE</span>}
    </div>
  );
}

export default function KitchenPage() {
  const { orders, updateStatus } = useKitchenStore();
  const [filter, setFilter] = useState<KitchenStatus | "all">("all");

  const filtered = filter === "all" ? orders.filter(o => o.status !== "served") : orders.filter(o => o.status === filter);
  const counts = {
    new: orders.filter(o => o.status === "new").length,
    cooking: orders.filter(o => o.status === "cooking").length,
    ready: orders.filter(o => o.status === "ready").length,
    served: orders.filter(o => o.status === "served").length,
  };

  return (
    <div style={{ padding: "24px 28px", background: "#0F172A", minHeight: "100vh" }} className="animate-fade-in">
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <PremiumIcon icon={ChefHat} color={ICON_COLORS.menu.c1} color2={ICON_COLORS.menu.c2} size={24} boxSize={52} radius={16} />
          <div>
            <h1 style={{ fontFamily: "Poppins,sans-serif", fontSize: 24, fontWeight: 700, color: "white" }}>Kitchen Display</h1>
            <p style={{ color: "#94A3B8", fontSize: 13, marginTop: 2 }}>
              {new Date().toLocaleTimeString("en-BD", { hour: "2-digit", minute: "2-digit" })} · {orders.filter(o => o.status !== "served").length} active orders
            </p>
          </div>
        </div>

        <div style={{ display: "flex", gap: 8 }}>
          {(["all", "new", "cooking", "ready"] as const).map((f) => (
            <button key={f} onClick={() => setFilter(f === "all" ? "all" : f as KitchenStatus)}
              style={{ padding: "8px 16px", borderRadius: 99, border: "2px solid", fontWeight: 600, fontSize: 13, cursor: "pointer", textTransform: "capitalize",
                borderColor: filter === f ? "white" : "#334155",
                background: filter === f ? "white" : "transparent",
                color: filter === f ? "#0F172A" : "#94A3B8",
              }}>
              {f === "all" ? "All" : f.charAt(0).toUpperCase() + f.slice(1)}
              {f !== "all" && counts[f as KitchenStatus] > 0 && (
                <span style={{ marginLeft: 6, background: f === "new" ? "#F97316" : f === "cooking" ? "#D97706" : "#16A34A", color: "white", borderRadius: 99, padding: "0 6px", fontSize: 11 }}>
                  {counts[f as KitchenStatus]}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Status bars */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginBottom: 24 }}>
        {(["new", "cooking", "ready", "served"] as KitchenStatus[]).map((s) => {
          const cfg = STATUS_CONFIG[s];
          return (
            <div key={s} style={{ background: "#1E293B", borderRadius: 12, padding: "14px 18px", borderLeft: `4px solid ${cfg.color}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontSize: 24, fontWeight: 800, color: "white", fontFamily: "Poppins,sans-serif" }}>{counts[s]}</div>
                <div style={{ fontSize: 12, color: "#94A3B8", fontWeight: 700, marginTop: 2 }}>{cfg.label}</div>
              </div>
              <PremiumIcon icon={cfg.icon} color={cfg.iconSet.c1} color2={cfg.iconSet.c2} size={18} boxSize={40} radius={10} glow={false} />
            </div>
          );
        })}
      </div>

      {/* Kitchen Cards Grid */}
      {filtered.length === 0 ? (
        <div style={{ textAlign: "center", padding: "100px 20px", color: "#475569" }}>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 20 }}>
            <PremiumIcon icon={CheckCircle2} color="#16A34A" color2="#34D399" size={40} boxSize={80} radius={40} soft />
          </div>
          <p style={{ fontSize: 18, fontWeight: 700, color: "white" }}>All caught up!</p>
          <p style={{ fontSize: 14, marginTop: 6, color: "#64748B" }}>No pending orders in the kitchen</p>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: 16 }}>
          {filtered.map((order) => {
            const cfg = STATUS_CONFIG[order.status];
            return (
              <div key={order.id} className={cfg.cardClass} style={{ animation: "fadeIn 0.3s ease" }}>
                {/* Card header */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
                  <div>
                    <div style={{ fontFamily: "Poppins,sans-serif", fontSize: 18, fontWeight: 800, color: "#1A0000" }}>{order.id}</div>
                    <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
                      <span style={{ fontSize: 11, fontWeight: 700, background: "rgba(0,0,0,0.06)", padding: "3px 10px", borderRadius: 99, display: "flex", alignItems: "center", gap: 5, color: "#4A0000" }}>
                        {order.type === "dine-in" ? <><Utensils size={11} /> Table {order.tableNum}</> : order.type === "delivery" ? <><Truck size={11} /> Delivery</> : <><Package size={11} /> Takeaway</>}
                      </span>
                    </div>
                  </div>
                  <Timer createdAt={order.createdAt} />
                </div>

                {/* Items */}
                <div style={{ marginBottom: 16 }}>
                  {order.items.map((item, idx) => (
                    <div key={idx} style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 8 }}>
                      <div style={{ width: 28, height: 28, background: "rgba(0,0,0,0.08)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 13, flexShrink: 0 }}>
                        {item.qty}×
                      </div>
                      <div>
                        <div style={{ fontSize: 14, fontWeight: 600, color: "#1A0000" }}>{item.name}</div>
                        {item.notes && <div style={{ fontSize: 12, color: "#A16207", fontStyle: "italic", display: "flex", alignItems: "center", gap: 4, marginTop: 1 }}>
                          <MessageSquare size={11} /> {item.notes}
                        </div>}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Status badge + action */}
                <div style={{ display: "flex", gap: 8 }}>
                  <span style={{ fontSize: 12, fontWeight: 700, padding: "4px 12px", borderRadius: 99, background: `${cfg.color}20`, color: cfg.color }}>
                    {cfg.label}
                  </span>
                  {cfg.nextStatus && (
                    <button
                      onClick={() => updateStatus(order.id, cfg.nextStatus!)}
                      style={{ flex: 1, padding: "8px 14px", borderRadius: 10, border: "none", cursor: "pointer", fontWeight: 700, fontSize: 13,
                        background: cfg.color, color: "white",
                      }}>
                      {cfg.actionLabel} →
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
