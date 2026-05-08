"use client";
import { useState } from "react";
import { DAILY_SALES, MONTHLY_SALES, TOP_ITEMS, INVENTORY } from "@/lib/mock-data";
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from "recharts";
import { Download, DollarSign, TrendingUp, BarChart3, Target, Calculator, Package, Users, CheckCircle2 } from "lucide-react";
import PremiumIcon, { ICON_COLORS } from "@/components/PremiumIcon";

const PIE_COLORS = ["#8B0000", "#A52A2A", "#D97706", "#2563EB", "#16A34A", "#7C3AED"];

export default function ReportsPage() {
  const [period, setPeriod] = useState<"daily" | "monthly">("daily");
  const [reportTab, setReportTab] = useState<"sales" | "inventory" | "staff">("sales");

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const salesData: any[] = period === "daily" ? DAILY_SALES : MONTHLY_SALES;
  const totalRevenue = MONTHLY_SALES.reduce((s, m) => s + m.revenue, 0);
  const totalProfit = MONTHLY_SALES.reduce((s, m) => s + m.profit, 0);
  const totalExpenses = MONTHLY_SALES.reduce((s, m) => s + m.expenses, 0);

  const handleExport = () => alert("📊 Exporting report as CSV...\n(In production this would download a file)");

  return (
    <div style={{ padding: "32px" }} className="animate-fade-in">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 28 }}>
        <div>
          <h1 style={{ fontFamily: "Poppins,sans-serif", fontSize: 28, fontWeight: 700, color: "var(--text)" }}>Reports & Analytics</h1>
          <p style={{ color: "var(--text-muted)", marginTop: 4, fontSize: 14 }}>Business intelligence and performance insights</p>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <div style={{ display: "flex", background: "white", border: "1.5px solid var(--border)", borderRadius: 10, overflow: "hidden" }}>
            {(["daily", "monthly"] as const).map(p => (
              <button key={p} onClick={() => setPeriod(p)}
                style={{ padding: "9px 18px", border: "none", cursor: "pointer", fontWeight: 600, fontSize: 13, textTransform: "capitalize",
                  background: period === p ? "var(--primary)" : "transparent",
                  color: period === p ? "white" : "var(--text-muted)",
                }}>
                {p}
              </button>
            ))}
          </div>
          <button onClick={handleExport} className="btn-outline" style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13 }}>
            <Download size={16} /> Export
          </button>
        </div>
      </div>

      {/* Summary KPIs */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, marginBottom: 28 }}>
        {[
          { label: "Total Revenue", value: `৳${(totalRevenue / 1000).toFixed(0)}k`, icon: DollarSign,  ...ICON_COLORS.revenue, change: "+22%" },
          { label: "Total Profit",  value: `৳${(totalProfit / 1000).toFixed(0)}k`,  icon: TrendingUp,  ...ICON_COLORS.success, change: "+18%" },
          { label: "Total Expenses", value: `৳${(totalExpenses / 1000).toFixed(0)}k`, icon: Calculator,  ...ICON_COLORS.warning, change: "-5%" },
          { label: "Profit Margin", value: `${Math.round((totalProfit / totalRevenue) * 100)}%`, icon: Target, ...ICON_COLORS.orders,  change: "+3%" },
        ].map(card => (
          <div key={card.label} className="kpi-card">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <p style={{ fontSize: 12, color: "var(--text-muted)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 8 }}>{card.label}</p>
                <p style={{ fontSize: 26, fontWeight: 800, color: "var(--text)", fontFamily: "Poppins,sans-serif" }}>{card.value}</p>
                <p style={{ fontSize: 12, color: card.change.startsWith("+") ? "#16A34A" : "#DC2626", fontWeight: 600, marginTop: 6 }}>{card.change} vs last period</p>
              </div>
              <PremiumIcon icon={card.icon} color={card.c1} color2={card.c2} size={22} boxSize={48} radius={12} />
            </div>
          </div>
        ))}
      </div>

      {/* Report tab nav */}
      <div style={{ display: "flex", gap: 2, background: "var(--primary-50)", borderRadius: 12, padding: 4, marginBottom: 24, width: "fit-content" }}>
        {[
          { id: "sales",     label: "Sales",     icon: DollarSign,  iconSet: ICON_COLORS.success },
          { id: "inventory", label: "Inventory", icon: Package,     iconSet: ICON_COLORS.inventory },
          { id: "staff",     label: "Staff",     icon: Users,       iconSet: ICON_COLORS.staff },
        ].map(tab => (
          <button key={tab.id} onClick={() => setReportTab(tab.id as typeof reportTab)}
            style={{ padding: "9px 20px", borderRadius: 10, border: "none", cursor: "pointer", fontWeight: 700, fontSize: 13, display: "flex", alignItems: "center", gap: 8,
              background: reportTab === tab.id ? "white" : "transparent",
              color: reportTab === tab.id ? "var(--primary)" : "var(--text-muted)",
              boxShadow: reportTab === tab.id ? "0 4px 12px rgba(139,0,0,0.15)" : "none",
              transition: "all 0.2s",
            }}>
            <tab.icon size={16} strokeWidth={reportTab === tab.id ? 2.5 : 2} />
            {tab.label}
          </button>
        ))}
      </div>

      {reportTab === "sales" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {/* Revenue over time */}
          <div className="card" style={{ padding: 24 }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 6, color: "var(--text)" }}>Revenue Trend</h3>
            <p style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 20 }}>{period === "daily" ? "This week" : "This year"} revenue overview</p>
            <ResponsiveContainer width="100%" height={260}>
              <AreaChart data={salesData}>
                <defs>
                  <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8B0000" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#8B0000" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#F0E0E0" />
                <XAxis dataKey={period === "daily" ? "day" : "month"} tick={{ fontSize: 12, fill: "#6B4C4C" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "#6B4C4C" }} axisLine={false} tickLine={false} tickFormatter={(v) => `৳${(v / 1000).toFixed(0)}k`} />
                <Tooltip formatter={(v) => [`৳${Number(v ?? 0).toLocaleString()}`, "Revenue"]} contentStyle={{ borderRadius: 10, fontSize: 13 }} />
                <Area type="monotone" dataKey="revenue" stroke="#8B0000" strokeWidth={2.5} fill="url(#revenueGrad)" dot={{ fill: "#8B0000", r: 4 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
            {/* Monthly P&L */}
            <div className="card" style={{ padding: 24 }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 20, color: "var(--text)" }}>Profit vs Expenses</h3>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={MONTHLY_SALES}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F0E0E0" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
                  <Tooltip formatter={(v) => `৳${Number(v ?? 0).toLocaleString()}`} contentStyle={{ borderRadius: 10, fontSize: 13 }} />
                  <Legend />
                  <Bar dataKey="profit" fill="#8B0000" name="Profit" radius={[6, 6, 0, 0]} />
                  <Bar dataKey="expenses" fill="#F0E0E0" name="Expenses" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Top items */}
            <div className="card" style={{ padding: 24 }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 20, color: "var(--text)" }}>Top Items by Revenue</h3>
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie data={TOP_ITEMS} dataKey="revenue" nameKey="name" cx="50%" cy="50%" outerRadius={80} label={({ name, percent }: { name?: string; percent?: number }) => `${(name ?? "").split(" ")[0]} ${((percent ?? 0) * 100).toFixed(0)}%`} labelLine={false}>
                    {TOP_ITEMS.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
                  </Pie>
                  <Tooltip formatter={(v) => `৳${Number(v ?? 0).toLocaleString()}`} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Top items table */}
          <div className="card" style={{ overflow: "hidden" }}>
            <div style={{ padding: "20px 24px", borderBottom: "1px solid var(--border)" }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: "var(--text)" }}>Detailed Item Performance</h3>
            </div>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Item Name</th>
                  <th>Units Sold</th>
                  <th>Revenue</th>
                  <th>Trend</th>
                </tr>
              </thead>
              <tbody>
                {TOP_ITEMS.sort((a, b) => b.revenue - a.revenue).map((item, i) => (
                  <tr key={item.name}>
                    <td>
                      <div style={{ width: 28, height: 28, background: i < 3 ? "var(--primary)" : "var(--border)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", color: i < 3 ? "white" : "var(--text-muted)", fontSize: 13, fontWeight: 700 }}>
                        {i + 1}
                      </div>
                    </td>
                    <td style={{ fontWeight: 600 }}>{item.name}</td>
                    <td>{item.sold} units</td>
                    <td style={{ fontWeight: 700, color: "var(--primary)" }}>৳{item.revenue.toLocaleString()}</td>
                    <td><span style={{ color: "#16A34A", fontWeight: 700 }}>↑ +{(Math.random() * 20 + 5).toFixed(1)}%</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {reportTab === "inventory" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div className="card" style={{ overflow: "hidden" }}>
            <div style={{ padding: "20px 24px", borderBottom: "1px solid var(--border)" }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: "var(--text)" }}>Inventory Stock Report</h3>
            </div>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Category</th>
                  <th>Current Stock</th>
                  <th>Min Level</th>
                  <th>Value</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {INVENTORY.map(item => {
                  const isLow = item.quantity <= item.minQuantity;
                  return (
                    <tr key={item.id}>
                      <td style={{ fontWeight: 600 }}>{item.name}</td>
                      <td><span className="badge badge-primary" style={{ fontSize: 11 }}>{item.category}</span></td>
                      <td style={{ fontWeight: 700, color: isLow ? "#DC2626" : "var(--text)" }}>{item.quantity} {item.unit}</td>
                      <td>{item.minQuantity} {item.unit}</td>
                      <td>৳{(item.quantity * item.costPerUnit).toLocaleString()}</td>
                      <td>
                        <span className={`badge ${isLow ? "badge-danger" : "badge-success"}`} style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
                          {isLow ? <><TrendingUp size={12} style={{ transform: "rotate(180deg)" }} /> Low</> : <><CheckCircle2 size={12} /> OK</>}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {reportTab === "staff" && (
        <div className="card" style={{ overflow: "hidden" }}>
          <div style={{ padding: "20px 24px", borderBottom: "1px solid var(--border)" }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: "var(--text)" }}>Staff Performance Report</h3>
          </div>
          <table className="data-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Role</th>
                <th>Shift</th>
                <th>Hours</th>
                <th>Salary</th>
                <th>Performance</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {[...Array(6)].map((_, i) => {
                const names = ["Md. Karim", "Rina Akter", "Arif Hossain", "Jamal Uddin", "Sumaiya Khan", "Babul Mia"];
                const roles = ["Manager", "Cashier", "Waiter", "Waiter", "Kitchen Staff", "Kitchen Staff"];
                const shifts = ["Morning", "Morning", "Evening", "Morning", "Morning", "Evening"];
                const hours = [176, 168, 172, 180, 174, 160];
                const salaries = [35000, 22000, 18000, 18000, 20000, 20000];
                const perfs = [94, 88, 90, 92, 96, 85];
                return (
                  <tr key={i}>
                    <td style={{ fontWeight: 600 }}>{names[i]}</td>
                    <td>{roles[i]}</td>
                    <td>{shifts[i]}</td>
                    <td>{hours[i]}h</td>
                    <td>৳{salaries[i].toLocaleString()}</td>
                    <td>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <div style={{ flex: 1, height: 8, background: "var(--border)", borderRadius: 99, overflow: "hidden" }}>
                          <div style={{ width: `${perfs[i]}%`, height: "100%", background: perfs[i] >= 90 ? "#16A34A" : "#D97706", borderRadius: 99 }} />
                        </div>
                        <span style={{ fontSize: 12, fontWeight: 700, color: "var(--text)", width: 34 }}>{perfs[i]}%</span>
                      </div>
                    </td>
                    <td><span className={`badge ${i === 5 ? "badge-warning" : "badge-success"}`}>{i === 5 ? "Off" : "Active"}</span></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
