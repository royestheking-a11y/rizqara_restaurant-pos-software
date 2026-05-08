"use client";
import { useState } from "react";
import { CUSTOMERS } from "@/lib/mock-data";
import { Plus, Edit2, Search, Star, Phone, Mail, MapPin, X, MessageSquare, Send, Users, DollarSign, ClipboardList } from "lucide-react";
import PremiumIcon, { ICON_COLORS } from "@/components/PremiumIcon";

type Customer = typeof CUSTOMERS[0];

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>(CUSTOMERS);
  const [search, setSearch] = useState("");
  const [viewing, setViewing] = useState<Customer | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", email: "", address: "" });

  const filtered = customers.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.phone.includes(search)
  );

  const handleSave = () => {
    if (!form.name || !form.phone) return;
    const newCustomer: Customer = { id: `c${Date.now()}`, name: form.name, phone: form.phone, email: form.email, address: form.address, points: 0, totalOrders: 0, totalSpent: 0, joinDate: new Date().toISOString().slice(0, 10) };
    setCustomers(prev => [...prev, newCustomer]);
    setForm({ name: "", phone: "", email: "", address: "" });
    setShowAdd(false);
  };

  const getLoyaltyTier = (points: number) => {
    if (points >= 2000) return { label: "Platinum", color: "#7C3AED", bg: "#EDE9FE" };
    if (points >= 1000) return { label: "Gold", color: "#D97706", bg: "#FEF3C7" };
    if (points >= 500) return { label: "Silver", color: "#64748B", bg: "#F1F5F9" };
    return { label: "Bronze", color: "#A52A2A", bg: "#FDF2F2" };
  };

  return (
    <div style={{ padding: "32px" }} className="animate-fade-in">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 28 }}>
        <div>
          <h1 style={{ fontFamily: "Poppins,sans-serif", fontSize: 28, fontWeight: 700, color: "var(--text)" }}>Customer Management</h1>
          <p style={{ color: "var(--text-muted)", marginTop: 4, fontSize: 14 }}>{customers.length} registered customers</p>
        </div>
        <button onClick={() => setShowAdd(true)} className="btn-primary" style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14 }}>
          <Plus size={16} /> Add Customer
        </button>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, marginBottom: 28 }}>
        {[
          { label: "Total Customers",      value: customers.length,                                                 icon: Users,         ...ICON_COLORS.customers },
          { label: "Total Revenue",         value: `৳${(customers.reduce((s,c)=>s+c.totalSpent,0)/1000).toFixed(0)}k`, icon: DollarSign,    ...ICON_COLORS.success },
          { label: "Avg. Orders/Customer",  value: (customers.reduce((s,c)=>s+c.totalOrders,0)/customers.length).toFixed(1), icon: ClipboardList, ...ICON_COLORS.orders },
          { label: "Loyalty Points Issued", value: customers.reduce((s,c)=>s+c.points,0),                          icon: Star,          ...ICON_COLORS.warning },
        ].map(card => (
          <div key={card.label} className="card" style={{ padding: "18px 20px", display: "flex", alignItems: "center", gap: 16 }}>
            <PremiumIcon icon={card.icon} color={card.c1} color2={card.c2} size={22} boxSize={50} radius={14} />
            <div>
              <div style={{ fontSize: 22, fontWeight: 800, color: card.c1, fontFamily: "Poppins,sans-serif" }}>{card.value}</div>
              <div style={{ fontSize: 11, color: "var(--text-muted)", fontWeight: 600 }}>{card.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Search */}
      <div style={{ position: "relative", marginBottom: 20, maxWidth: 400 }}>
        <Search size={16} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
        <input className="form-input" style={{ paddingLeft: 38, fontSize: 13 }} placeholder="Search by name or phone..." value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>

      {/* Customer grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: 16 }}>
        {filtered.map(customer => {
          const tier = getLoyaltyTier(customer.points);
          return (
            <div key={customer.id} className="card" style={{ padding: 20, cursor: "pointer" }} onClick={() => setViewing(customer)}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 48, height: 48,
                    background: "linear-gradient(135deg, #8B0000, #D32F2F)",
                    borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
                    color: "white", fontWeight: 800, fontSize: 18,
                    boxShadow: "0 4px 12px rgba(139,0,0,0.4)" }}>
                    {customer.name[0]}
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 15, color: "var(--text)" }}>{customer.name}</div>
                    <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 2 }}>{customer.phone}</div>
                  </div>
                </div>
                <span style={{ background: tier.bg, color: tier.color, fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 99, display: "flex", alignItems: "center", gap: 4 }}>
                  <Star size={10} /> {tier.label}
                </span>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 14 }}>
                {[
                  { label: "Orders", value: customer.totalOrders },
                  { label: "Spent", value: `৳${(customer.totalSpent / 1000).toFixed(1)}k` },
                  { label: "Points", value: customer.points },
                ].map(s => (
                  <div key={s.label} style={{ textAlign: "center", padding: "10px", background: "var(--surface)", borderRadius: 10 }}>
                    <div style={{ fontWeight: 800, fontSize: 16, color: "var(--primary)" }}>{s.value}</div>
                    <div style={{ fontSize: 10, color: "var(--text-muted)", marginTop: 2 }}>{s.label}</div>
                  </div>
                ))}
              </div>

              <div style={{ fontSize: 12, color: "var(--text-muted)", display: "flex", alignItems: "center", gap: 6 }}>
                <MapPin size={12} /> {customer.address}
              </div>
              <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 4 }}>Member since {customer.joinDate}</div>
            </div>
          );
        })}
      </div>

      {/* View Modal */}
      {viewing && (
        <div className="modal-overlay" onClick={() => setViewing(null)}>
          <div className="modal-box" onClick={e => e.stopPropagation()}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
              <h2 style={{ fontFamily: "Poppins,sans-serif", fontSize: 20, fontWeight: 700, color: "var(--text)" }}>{viewing.name}</h2>
              <button onClick={() => setViewing(null)} style={{ background: "#F5F5F5", border: "none", borderRadius: 8, padding: 8, cursor: "pointer" }}><X size={16} /></button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                { icon: <Phone size={16} />, label: "Phone", value: viewing.phone },
                { icon: <Mail size={16} />, label: "Email", value: viewing.email },
                { icon: <MapPin size={16} />, label: "Address", value: viewing.address },
              ].map(row => (
                <div key={row.label} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 16px", background: "var(--surface)", borderRadius: 10 }}>
                  <span style={{ color: "var(--primary)" }}>{row.icon}</span>
                  <span style={{ fontSize: 13, color: "var(--text-muted)", width: 60 }}>{row.label}</span>
                  <span style={{ fontSize: 14, fontWeight: 600, color: "var(--text)" }}>{row.value}</span>
                </div>
              ))}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginTop: 8 }}>
                {[
                  { label: "Orders", value: viewing.totalOrders },
                  { label: "Total Spent", value: `৳${viewing.totalSpent.toLocaleString()}` },
                  { label: "Loyalty Points", value: viewing.points },
                ].map(s => (
                  <div key={s.label} style={{ textAlign: "center", padding: "16px", background: "var(--primary-50)", borderRadius: 12 }}>
                    <div style={{ fontWeight: 800, fontSize: 18, color: "var(--primary)" }}>{s.value}</div>
                    <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 4 }}>{s.label}</div>
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
                <button className="btn-primary" style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                  <MessageSquare size={15} /> Send SMS
                </button>
                <button className="btn-outline" style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                  <Send size={15} /> Send Email
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Modal */}
      {showAdd && (
        <div className="modal-overlay" onClick={() => setShowAdd(false)}>
          <div className="modal-box" onClick={e => e.stopPropagation()}>
            <h2 style={{ fontFamily: "Poppins,sans-serif", fontSize: 20, fontWeight: 700, marginBottom: 24, color: "var(--text)" }}>Add New Customer</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {[
                { label: "Full Name *", field: "name" as const, placeholder: "e.g. Ahmed Hassan" },
                { label: "Phone Number *", field: "phone" as const, placeholder: "e.g. 01711-234567" },
                { label: "Email", field: "email" as const, placeholder: "email@example.com" },
                { label: "Address", field: "address" as const, placeholder: "Dhaka, Bangladesh" },
              ].map(({ label, field, placeholder }) => (
                <div key={field}>
                  <label style={{ fontSize: 12, fontWeight: 700, display: "block", marginBottom: 6 }}>{label}</label>
                  <input className="form-input" placeholder={placeholder} value={form[field]} onChange={e => setForm(p => ({ ...p, [field]: e.target.value }))} />
                </div>
              ))}
              <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
                <button onClick={handleSave} className="btn-primary" style={{ flex: 1 }}>Add Customer</button>
                <button onClick={() => setShowAdd(false)} className="btn-outline">Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
