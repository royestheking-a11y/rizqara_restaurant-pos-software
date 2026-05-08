"use client";
import { useState } from "react";
import { STAFF } from "@/lib/mock-data";
import { Plus, Edit2, Clock, Search, Users, UserCheck, DollarSign, Star, Zap, Play, Square } from "lucide-react";
import PremiumIcon, { ICON_COLORS } from "@/components/PremiumIcon";

type StaffMember = typeof STAFF[0];

const ROLE_CONFIG: Record<string, { color: string; bg: string; icon: any; iconSet: any }> = {
  Manager: { color: "#7C3AED", bg: "#EDE9FE", icon: UserCheck, iconSet: ICON_COLORS.staff },
  Cashier: { color: "#2563EB", bg: "#DBEAFE", icon: UserCheck, iconSet: ICON_COLORS.orders },
  Waiter: { color: "#16A34A", bg: "#DCFCE7", icon: UserCheck, iconSet: ICON_COLORS.success },
  "Kitchen Staff": { color: "#D97706", bg: "#FEF3C7", icon: UserCheck, iconSet: ICON_COLORS.kitchen },
};

export default function StaffPage() {
  const [staff, setStaff] = useState<StaffMember[]>(STAFF);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<StaffMember | null>(null);
  const [form, setForm] = useState({ name: "", role: "Waiter", phone: "", salary: "", shift: "Morning" });

  const roles = ["all", ...Array.from(new Set(staff.map(s => s.role)))];

  const filtered = staff.filter(s =>
    (roleFilter === "all" || s.role === roleFilter) &&
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  const toggleStatus = (id: string) => {
    setStaff(prev => prev.map(s => s.id === id ? { ...s, status: s.status === "active" ? "off" : "active" as "active" | "off" } : s));
  };

  const handleSave = () => {
    if (!form.name) return;
    if (editing) {
      setStaff(prev => prev.map(s => s.id === editing.id ? { ...s, ...form, salary: parseInt(form.salary) } : s));
    } else {
      const newStaff: StaffMember = { id: `s${Date.now()}`, name: form.name, role: form.role, phone: form.phone, salary: parseInt(form.salary) || 0, shift: form.shift, status: "active" as "active" | "off", clockIn: "08:00", totalHours: 0, performance: 0 };
      setStaff(prev => [...prev, newStaff]);
    }
    setShowModal(false);
  };

  const activeCount = staff.filter(s => s.status === "active").length;
  const totalSalary = staff.reduce((sum, s) => sum + s.salary, 0);
  const avgPerformance = Math.round(staff.reduce((sum, s) => sum + s.performance, 0) / staff.length);

  return (
    <div style={{ padding: "32px" }} className="animate-fade-in">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 28 }}>
        <div>
          <h1 style={{ fontFamily: "Poppins,sans-serif", fontSize: 28, fontWeight: 700, color: "var(--text)" }}>Staff Management</h1>
          <p style={{ color: "var(--text-muted)", marginTop: 4, fontSize: 14 }}>{staff.length} employees · {activeCount} on duty</p>
        </div>
        <button onClick={() => { setEditing(null); setForm({ name: "", role: "Waiter", phone: "", salary: "", shift: "Morning" }); setShowModal(true); }} className="btn-primary" style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14 }}>
          <Plus size={16} /> Add Employee
        </button>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, marginBottom: 28 }}>
        {[
          { label: "Total Staff",      value: staff.length,                               icon: Users,     ...ICON_COLORS.staff },
          { label: "On Duty Today",   value: activeCount,                                icon: Zap,       ...ICON_COLORS.success },
          { label: "Monthly Payroll", value: `৳${(totalSalary / 1000).toFixed(0)}k`,   icon: DollarSign, ...ICON_COLORS.revenue },
          { label: "Avg. Performance", value: `${avgPerformance}%`,                      icon: Star,      ...ICON_COLORS.warning },
        ].map(card => (
          <div key={card.label} className="card" style={{ padding: "18px 20px", display: "flex", alignItems: "center", gap: 14 }}>
            <PremiumIcon icon={card.icon} color={card.c1} color2={card.c2} size={22} boxSize={50} radius={14} />
            <div>
              <div style={{ fontSize: 22, fontWeight: 800, color: card.c1, fontFamily: "Poppins,sans-serif" }}>{card.value}</div>
              <div style={{ fontSize: 11, color: "var(--text-muted)", fontWeight: 600 }}>{card.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div style={{ display: "flex", gap: 12, marginBottom: 20, flexWrap: "wrap" }}>
        <div style={{ position: "relative", flex: 1, minWidth: 200 }}>
          <Search size={16} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
          <input className="form-input" style={{ paddingLeft: 38, fontSize: 13 }} placeholder="Search staff..." value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        {roles.map(role => (
          <button key={role} onClick={() => setRoleFilter(role)}
            style={{ padding: "8px 16px", borderRadius: 99, border: "2px solid", cursor: "pointer", fontWeight: 600, fontSize: 13,
              borderColor: roleFilter === role ? "var(--primary)" : "var(--border)",
              background: roleFilter === role ? "var(--primary)" : "white",
              color: roleFilter === role ? "white" : "var(--text-muted)",
            }}>
            {role === "all" ? "All Roles" : role}
          </button>
        ))}
      </div>

      {/* Staff Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: 16 }}>
        {filtered.map((member) => {
          const cfg = ROLE_CONFIG[member.role] || { color: "var(--primary)", bg: "var(--primary-50)", icon: UserCheck, iconSet: ICON_COLORS.staff };
          return (
            <div key={member.id} className="card" style={{ padding: 22 }}>
              {/* Header */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <PremiumIcon icon={cfg.icon} color={cfg.iconSet.c1} color2={cfg.iconSet.c2} size={22} boxSize={52} radius={26} glow={false} />
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 15, color: "var(--text)" }}>{member.name}</div>
                    <span style={{ background: cfg.bg, color: cfg.color, fontSize: 11, fontWeight: 700, padding: "2px 8px", borderRadius: 99 }}>{member.role}</span>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <div style={{ width: 10, height: 10, borderRadius: "50%", background: member.status === "active" ? "#16A34A" : "#94A3B8" }} />
                  <span style={{ fontSize: 11, color: member.status === "active" ? "#16A34A" : "#94A3B8", fontWeight: 600 }}>{member.status === "active" ? "On Duty" : "Off"}</span>
                </div>
              </div>

              {/* Stats */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 14 }}>
                <div style={{ textAlign: "center", padding: 10, background: "var(--surface)", borderRadius: 10 }}>
                  <div style={{ fontWeight: 800, fontSize: 14, color: "var(--primary)" }}>৳{member.salary.toLocaleString()}</div>
                  <div style={{ fontSize: 10, color: "var(--text-muted)" }}>Salary</div>
                </div>
                <div style={{ textAlign: "center", padding: 10, background: "var(--surface)", borderRadius: 10 }}>
                  <div style={{ fontWeight: 800, fontSize: 14, color: "var(--primary)" }}>{member.totalHours}h</div>
                  <div style={{ fontSize: 10, color: "var(--text-muted)" }}>This Month</div>
                </div>
              </div>

              {/* Performance bar */}
              <div style={{ marginBottom: 14 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 5 }}>
                  <span style={{ color: "var(--text-muted)", fontWeight: 600 }}>Performance</span>
                  <span style={{ color: member.performance >= 90 ? "#16A34A" : "#D97706", fontWeight: 700 }}>{member.performance}%</span>
                </div>
                <div style={{ height: 8, background: "var(--border)", borderRadius: 99, overflow: "hidden" }}>
                  <div style={{ width: `${member.performance}%`, height: "100%", background: member.performance >= 90 ? "#16A34A" : member.performance >= 75 ? "#D97706" : "#DC2626", borderRadius: 99, transition: "width 0.5s" }} />
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 12, color: "var(--text-muted)", marginBottom: 14 }}>
                <span style={{ display: "flex", alignItems: "center", gap: 5 }}><Clock size={14} /> {member.shift} Shift</span>
                {member.clockIn && <span style={{ display: "flex", alignItems: "center", gap: 4, fontWeight: 600, color: "var(--text)" }}>{member.clockIn}</span>}
              </div>

              <div style={{ display: "flex", gap: 8 }}>
                <button onClick={() => toggleStatus(member.id)} style={{ flex: 1, padding: "8px", borderRadius: 10, border: "1.5px solid", cursor: "pointer", fontWeight: 700, fontSize: 12, display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
                  borderColor: member.status === "active" ? "#DC2626" : "#16A34A",
                  background: member.status === "active" ? "#FEE2E2" : "#DCFCE7",
                  color: member.status === "active" ? "#DC2626" : "#16A34A",
                }}>
                  {member.status === "active" ? <><Square size={13} fill="currentColor" /> Clock Out</> : <><Play size={13} fill="currentColor" /> Clock In</>}
                </button>
                <button onClick={() => { setEditing(member); setForm({ name: member.name, role: member.role, phone: member.phone, salary: String(member.salary), shift: member.shift }); setShowModal(true); }}
                  style={{ background: "var(--primary-50)", border: "none", borderRadius: 10, padding: "8px 12px", cursor: "pointer", color: "var(--primary)" }}>
                  <Edit2 size={15} />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-box" onClick={e => e.stopPropagation()}>
            <h2 style={{ fontFamily: "Poppins,sans-serif", fontSize: 20, fontWeight: 700, marginBottom: 24, color: "var(--text)" }}>
              {editing ? "Edit Employee" : "Add New Employee"}
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 700, display: "block", marginBottom: 6 }}>Full Name *</label>
                  <input className="form-input" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} />
                </div>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 700, display: "block", marginBottom: 6 }}>Phone</label>
                  <input className="form-input" value={form.phone} onChange={e => setForm(p => ({ ...p, phone: e.target.value }))} />
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 700, display: "block", marginBottom: 6 }}>Role</label>
                  <select className="form-input" value={form.role} onChange={e => setForm(p => ({ ...p, role: e.target.value }))}>
                    {["Manager", "Cashier", "Waiter", "Kitchen Staff"].map(r => <option key={r}>{r}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 700, display: "block", marginBottom: 6 }}>Salary (৳)</label>
                  <input className="form-input" type="number" value={form.salary} onChange={e => setForm(p => ({ ...p, salary: e.target.value }))} />
                </div>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 700, display: "block", marginBottom: 6 }}>Shift</label>
                  <select className="form-input" value={form.shift} onChange={e => setForm(p => ({ ...p, shift: e.target.value }))}>
                    {["Morning", "Evening", "Night"].map(s => <option key={s}>{s}</option>)}
                  </select>
                </div>
              </div>
              <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
                <button onClick={handleSave} className="btn-primary" style={{ flex: 1 }}>{editing ? "Save" : "Add Employee"}</button>
                <button onClick={() => setShowModal(false)} className="btn-outline">Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
