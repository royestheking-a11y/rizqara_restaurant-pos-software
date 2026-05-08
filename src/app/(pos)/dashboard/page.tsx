"use client";
import { DAILY_SALES, MONTHLY_SALES, TOP_ITEMS, ORDERS, INVENTORY, RESTAURANT } from "@/lib/mock-data";
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";
import {
  TrendingUp, ShoppingBag, Grid3X3, Users,
  AlertTriangle, CreditCard, ChefHat, DollarSign, Star
} from "lucide-react";
import PremiumIcon, { ICON_COLORS } from "@/components/PremiumIcon";

const KPI = [
  {
    label: "Today's Revenue", value: "৳31,500", change: "+12.4%", up: true,
    icon: TrendingUp, ...ICON_COLORS.revenue,
  },
  {
    label: "Total Orders", value: "112", change: "+8.2%", up: true,
    icon: ShoppingBag, ...ICON_COLORS.orders,
  },
  {
    label: "Active Tables", value: "4 / 10", change: "40% occupied", up: null,
    icon: Grid3X3, ...ICON_COLORS.tables,
  },
  {
    label: "New Customers", value: "18", change: "+3 today", up: true,
    icon: Users, ...ICON_COLORS.customers,
  },
];

const QUICK_STATS = [
  { label: "Avg Order Value",       value: "৳731",   icon: DollarSign, ...ICON_COLORS.billing },
  { label: "Kitchen Queue",         value: "4 orders", icon: ChefHat,    ...ICON_COLORS.kitchen },
  { label: "Staff On Duty",         value: "5 / 6",  icon: Users,      ...ICON_COLORS.staff },
  { label: "Today's New Customers", value: "18",      icon: Star,       ...ICON_COLORS.warning },
];

const recentOrders = ORDERS.slice(0, 5);

const STATUS_BADGE: Record<string, string> = {
  pending:   "badge-warning",
  cooking:   "badge-info",
  ready:     "badge-success",
  served:    "badge-primary",
  cancelled: "badge-danger",
};

const lowStock = INVENTORY.filter((i) => i.quantity <= i.minQuantity);

export default function DashboardPage() {
  const currency = RESTAURANT.currency;

  return (
    <div style={{ padding: "32px 32px 48px" }} className="animate-fade-in">

      {/* ── Header ── */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 32 }}>
        <div>
          <h1 style={{ fontFamily: "Poppins,sans-serif", fontSize: 28, fontWeight: 700, color: "var(--text)" }}>
            Dashboard
          </h1>
          <p style={{ color: "var(--text-muted)", marginTop: 4, fontSize: 14 }}>
            {new Date().toLocaleDateString("en-BD", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
            {" · "}{RESTAURANT.name}
          </p>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <select className="form-input" style={{ width: "auto", fontSize: 13 }}>
            <option>Today</option>
            <option>This Week</option>
            <option>This Month</option>
          </select>
          <a href="/pos" className="btn-primary"
            style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14, textDecoration: "none" }}>
            <CreditCard size={16} /> Open POS
          </a>
        </div>
      </div>

      {/* ── KPI Cards ── */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 20, marginBottom: 28 }}>
        {KPI.map((k) => (
          <div key={k.label} className="card"
            style={{ padding: "22px 24px", boxShadow: "0 2px 16px rgba(0,0,0,0.06)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 11, color: "var(--text-muted)", fontWeight: 700,
                  textTransform: "uppercase", letterSpacing: "0.6px", marginBottom: 10 }}>
                  {k.label}
                </p>
                <p style={{ fontSize: 28, fontWeight: 800, color: "var(--text)", fontFamily: "Poppins,sans-serif" }}>
                  {k.value}
                </p>
                <p style={{ fontSize: 12, marginTop: 6, fontWeight: 600,
                  color: k.up === true ? "#16A34A" : k.up === false ? "#DC2626" : "var(--text-muted)" }}>
                  {k.up === true ? "↑ " : k.up === false ? "↓ " : ""}{k.change}
                </p>
              </div>
              <PremiumIcon icon={k.icon} color={k.c1} color2={k.c2} size={22} boxSize={52} radius={14} />
            </div>
          </div>
        ))}
      </div>

      {/* ── Charts Row ── */}
      <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: 20, marginBottom: 28 }}>
        {/* Sales chart */}
        <div className="card" style={{ padding: 24 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <PremiumIcon icon={TrendingUp} color={ICON_COLORS.revenue.c1} color2={ICON_COLORS.revenue.c2} size={18} boxSize={40} radius={11} />
              <div>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: "var(--text)", lineHeight: 1 }}>Weekly Revenue</h3>
                <p style={{ color: "var(--text-muted)", fontSize: 12, marginTop: 3 }}>This week vs last week</p>
              </div>
            </div>
            <span className="badge badge-success">৳142,500 total</span>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={DAILY_SALES}>
              <defs>
                <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#8B0000" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#8B0000" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#F0E0E0" />
              <XAxis dataKey="day" tick={{ fontSize: 12, fill: "#6B4C4C" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#6B4C4C" }} axisLine={false} tickLine={false}
                tickFormatter={(v) => `৳${(v / 1000).toFixed(0)}k`} />
              <Tooltip formatter={(v) => [`৳${Number(v ?? 0).toLocaleString()}`, "Revenue"]}
                contentStyle={{ borderRadius: 10, border: "1px solid #F0E0E0", fontSize: 13 }} />
              <Area type="monotone" dataKey="revenue" stroke="#8B0000" strokeWidth={2.5}
                fill="url(#revGrad)" dot={{ fill: "#8B0000", r: 4 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Top items */}
        <div className="card" style={{ padding: 24 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
            <PremiumIcon icon={ShoppingBag} color={ICON_COLORS.orders.c1} color2={ICON_COLORS.orders.c2} size={18} boxSize={40} radius={11} />
            <div>
              <h3 style={{ fontSize: 15, fontWeight: 700, color: "var(--text)", lineHeight: 1 }}>Top Selling Items</h3>
              <p style={{ color: "var(--text-muted)", fontSize: 12, marginTop: 3 }}>By quantity sold</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={TOP_ITEMS} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#F0E0E0" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 11, fill: "#6B4C4C" }} axisLine={false} tickLine={false} />
              <YAxis dataKey="name" type="category" tick={{ fontSize: 11, fill: "#6B4C4C" }} axisLine={false} tickLine={false} width={110} />
              <Tooltip formatter={(v) => [v ?? 0, "Units sold"]} contentStyle={{ borderRadius: 10, fontSize: 13 }} />
              <Bar dataKey="sold" radius={[0, 6, 6, 0]}
                fill="url(#barGrad)" />
              <defs>
                <linearGradient id="barGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%"   stopColor="#8B0000" />
                  <stop offset="100%" stopColor="#D32F2F" />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ── Bottom Row ── */}
      <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 20 }}>

        {/* Recent Orders */}
        <div className="card" style={{ padding: 24 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <PremiumIcon icon={ShoppingBag} color="#16A34A" color2="#22C55E" size={18} boxSize={40} radius={11} />
              <h3 style={{ fontSize: 15, fontWeight: 700, color: "var(--text)" }}>Recent Orders</h3>
            </div>
            <a href="/orders" style={{ color: "var(--primary)", fontSize: 13, fontWeight: 600, textDecoration: "none" }}>
              View all →
            </a>
          </div>
          <table className="data-table">
            <thead>
              <tr><th>Order</th><th>Type</th><th>Amount</th><th>Status</th></tr>
            </thead>
            <tbody>
              {recentOrders.map((o) => (
                <tr key={o.id}>
                  <td style={{ fontWeight: 600, color: "var(--primary)" }}>{o.id}</td>
                  <td style={{ textTransform: "capitalize" }}>{o.type}</td>
                  <td style={{ fontWeight: 600 }}>{currency}{o.total.toFixed(0)}</td>
                  <td>
                    <span className={`badge ${STATUS_BADGE[o.status] || "badge-primary"}`}>
                      {o.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Right column */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

          {/* Low Stock Alerts */}
          <div className="card" style={{ padding: 20 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}>
              <PremiumIcon icon={AlertTriangle} color="#D97706" color2="#F59E0B" size={18} boxSize={40} radius={11} />
              <div>
                <h3 style={{ fontSize: 14, fontWeight: 700, color: "var(--text)", lineHeight: 1 }}>Low Stock Alerts</h3>
                <p style={{ color: "var(--text-muted)", fontSize: 12, marginTop: 3 }}>{lowStock.length} items need restocking</p>
              </div>
            </div>
            {lowStock.map((item) => (
              <div key={item.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center",
                padding: "8px 12px", background: "#FFF7ED", borderRadius: 8, marginBottom: 8, border: "1px solid #FED7AA" }}>
                <div>
                  <p style={{ fontSize: 13, fontWeight: 600, color: "var(--text)" }}>{item.name}</p>
                  <p style={{ fontSize: 11, color: "var(--text-muted)" }}>{item.category}</p>
                </div>
                <div style={{ textAlign: "right" }}>
                  <p style={{ fontSize: 13, fontWeight: 700, color: "#DC2626" }}>{item.quantity} {item.unit}</p>
                  <p style={{ fontSize: 11, color: "var(--text-muted)" }}>Min: {item.minQuantity}</p>
                </div>
              </div>
            ))}
            <a href="/inventory" className="btn-outline"
              style={{ display: "block", textAlign: "center", textDecoration: "none", fontSize: 13, marginTop: 8 }}>
              Manage Inventory
            </a>
          </div>

          {/* Quick Stats */}
          <div className="card" style={{ padding: 20 }}>
            <h3 style={{ fontSize: 14, fontWeight: 700, color: "var(--text)", marginBottom: 14 }}>Quick Stats</h3>
            {QUICK_STATS.map((s) => (
              <div key={s.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center",
                padding: "10px 0", borderBottom: "1px solid var(--border)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <PremiumIcon icon={s.icon} color={s.c1} color2={s.c2} size={15} boxSize={34} radius={9} />
                  <span style={{ fontSize: 13, color: "var(--text-muted)" }}>{s.label}</span>
                </div>
                <span style={{ fontSize: 14, fontWeight: 700, color: "var(--text)" }}>{s.value}</span>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}
