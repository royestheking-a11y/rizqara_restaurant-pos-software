"use client";
import { useState } from "react";
import { INVENTORY } from "@/lib/mock-data";
import { Plus, Edit2, Trash2, Search, AlertTriangle, Package, DollarSign, XCircle } from "lucide-react";
import PremiumIcon, { ICON_COLORS } from "@/components/PremiumIcon";

type InventoryItem = typeof INVENTORY[0];

export default function InventoryPage() {
  const [items, setItems] = useState<InventoryItem[]>(INVENTORY);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<InventoryItem | null>(null);
  const [form, setForm] = useState({ name: "", unit: "kg", quantity: "", minQuantity: "", costPerUnit: "", supplier: "", category: "Protein", expiry: "" });

  const categories = ["all", ...Array.from(new Set(items.map(i => i.category)))];

  const filtered = items.filter(i =>
    (categoryFilter === "all" || i.category === categoryFilter) &&
    i.name.toLowerCase().includes(search.toLowerCase())
  );

  const lowStockCount = items.filter(i => i.quantity <= i.minQuantity).length;
  const totalValue = items.reduce((sum, i) => sum + i.quantity * i.costPerUnit, 0);

  const openAdd = () => {
    setEditing(null);
    setForm({ name: "", unit: "kg", quantity: "", minQuantity: "", costPerUnit: "", supplier: "", category: "Protein", expiry: "" });
    setShowModal(true);
  };

  const openEdit = (item: InventoryItem) => {
    setEditing(item);
    setForm({ name: item.name, unit: item.unit, quantity: String(item.quantity), minQuantity: String(item.minQuantity), costPerUnit: String(item.costPerUnit), supplier: item.supplier, category: item.category, expiry: item.expiry });
    setShowModal(true);
  };

  const handleSave = () => {
    if (!form.name || !form.quantity) return;
    if (editing) {
      setItems(prev => prev.map(i => i.id === editing.id ? { ...i, ...form, quantity: parseFloat(form.quantity), minQuantity: parseFloat(form.minQuantity), costPerUnit: parseFloat(form.costPerUnit) } : i));
    } else {
      const newItem: InventoryItem = { id: `inv${Date.now()}`, name: form.name, unit: form.unit, quantity: parseFloat(form.quantity), minQuantity: parseFloat(form.minQuantity), costPerUnit: parseFloat(form.costPerUnit), supplier: form.supplier, category: form.category, expiry: form.expiry };
      setItems(prev => [...prev, newItem]);
    }
    setShowModal(false);
  };

  const deleteItem = (id: string) => { if (confirm("Delete?")) setItems(prev => prev.filter(i => i.id !== id)); };

  const getStockStatus = (item: InventoryItem) => {
    if (item.quantity === 0) return { cls: "badge-danger", label: "Out of Stock" };
    if (item.quantity <= item.minQuantity) return { cls: "badge-warning", label: "Low Stock" };
    return { cls: "badge-success", label: "In Stock" };
  };

  const isExpiringSoon = (expiry: string) => {
    const diff = (new Date(expiry).getTime() - Date.now()) / (1000 * 60 * 60 * 24);
    return diff <= 2;
  };

  return (
    <div style={{ padding: "32px" }} className="animate-fade-in">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 28 }}>
        <div>
          <h1 style={{ fontFamily: "Poppins,sans-serif", fontSize: 28, fontWeight: 700, color: "var(--text)" }}>Inventory Management</h1>
          <p style={{ color: "var(--text-muted)", marginTop: 4, fontSize: 14 }}>{items.length} items · Total value: ৳{totalValue.toLocaleString()}</p>
        </div>
        <button onClick={openAdd} className="btn-primary" style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14 }}>
          <Plus size={16} /> Add Stock
        </button>
      </div>

      {/* Summary cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, marginBottom: 24 }}>
        {[
          { label: "Total Items",     value: items.length,                               icon: Package,       ...ICON_COLORS.inventory },
          { label: "Low Stock",       value: lowStockCount,                              icon: AlertTriangle, ...ICON_COLORS.warning },
          { label: "Out of Stock",    value: items.filter(i => i.quantity === 0).length, icon: XCircle,       ...ICON_COLORS.danger },
          { label: "Total Value",     value: `৳${(totalValue/1000).toFixed(1)}k`,        icon: DollarSign,    ...ICON_COLORS.success },
        ].map(card => (
          <div key={card.label} className="card" style={{ padding: "18px 20px", display: "flex", alignItems: "center", gap: 16 }}>
            <PremiumIcon icon={card.icon} color={card.c1} color2={card.c2} size={22} boxSize={50} radius={14} />
            <div>
              <div style={{ fontSize: 22, fontWeight: 800, color: card.c1, fontFamily: "Poppins,sans-serif" }}>{card.value}</div>
              <div style={{ fontSize: 12, color: "var(--text-muted)", fontWeight: 600 }}>{card.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Low stock alert banner */}
      {lowStockCount > 0 && (
        <div style={{ background: "#FEF3C7", border: "1.5px solid #FCD34D", borderRadius: 12, padding: "12px 18px", marginBottom: 20, display: "flex", alignItems: "center", gap: 12 }}>
          <AlertTriangle size={20} color="#D97706" />
          <span style={{ fontSize: 13, fontWeight: 600, color: "#92400E" }}>
            {lowStockCount} items are running low. Please restock soon!
          </span>
          <a href="#" style={{ marginLeft: "auto", color: "#D97706", fontSize: 13, fontWeight: 700, textDecoration: "none" }}>View all →</a>
        </div>
      )}

      {/* Filters */}
      <div style={{ display: "flex", gap: 12, marginBottom: 20, flexWrap: "wrap" }}>
        <div style={{ position: "relative", flex: 1, minWidth: 200 }}>
          <Search size={16} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
          <input className="form-input" style={{ paddingLeft: 38, fontSize: 13 }} placeholder="Search inventory..." value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        {categories.map(cat => (
          <button key={cat} onClick={() => setCategoryFilter(cat)}
            style={{ padding: "8px 16px", borderRadius: 99, border: "2px solid", cursor: "pointer", fontWeight: 600, fontSize: 13,
              borderColor: categoryFilter === cat ? "var(--primary)" : "var(--border)",
              background: categoryFilter === cat ? "var(--primary)" : "white",
              color: categoryFilter === cat ? "white" : "var(--text-muted)",
              textTransform: "capitalize",
            }}>
            {cat === "all" ? "All Categories" : cat}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="card" style={{ overflow: "hidden" }}>
        <table className="data-table">
          <thead>
            <tr>
              <th>Item Name</th>
              <th>Category</th>
              <th>Quantity</th>
              <th>Min. Level</th>
              <th>Cost/Unit</th>
              <th>Supplier</th>
              <th>Expiry</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((item) => {
              const status = getStockStatus(item);
              const expiringSoon = isExpiringSoon(item.expiry);
              return (
                <tr key={item.id}>
                  <td style={{ fontWeight: 600 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <Package size={16} color="var(--primary)" />
                      {item.name}
                    </div>
                  </td>
                  <td><span className="badge badge-primary" style={{ fontSize: 11 }}>{item.category}</span></td>
                  <td style={{ fontWeight: 700, color: item.quantity <= item.minQuantity ? "#DC2626" : "var(--text)" }}>
                    {item.quantity} {item.unit}
                  </td>
                  <td style={{ color: "var(--text-muted)" }}>{item.minQuantity} {item.unit}</td>
                  <td>৳{item.costPerUnit}</td>
                  <td style={{ color: "var(--text-muted)", fontSize: 13 }}>{item.supplier}</td>
                  <td>
                    <span style={{ color: expiringSoon ? "#DC2626" : "var(--text-muted)", fontWeight: expiringSoon ? 700 : 400, fontSize: 13 }}>
                    {item.expiry}
                    </span>
                  </td>
                  <td><span className={`badge ${status.cls}`}>{status.label}</span></td>
                  <td>
                    <div style={{ display: "flex", gap: 6 }}>
                      <button onClick={() => openEdit(item)} style={{ background: "var(--primary-50)", border: "none", borderRadius: 8, padding: "6px 10px", cursor: "pointer", color: "var(--primary)" }}>
                        <Edit2 size={14} />
                      </button>
                      <button onClick={() => deleteItem(item.id)} style={{ background: "#FEE2E2", border: "none", borderRadius: 8, padding: "6px 10px", cursor: "pointer", color: "#DC2626" }}>
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <h2 style={{ fontFamily: "Poppins,sans-serif", fontSize: 20, fontWeight: 700, marginBottom: 24, color: "var(--text)" }}>
              {editing ? "Edit Inventory Item" : "Add New Stock"}
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 700, display: "block", marginBottom: 6 }}>Item Name *</label>
                  <input className="form-input" value={form.name} onChange={(e) => setForm(p => ({ ...p, name: e.target.value }))} placeholder="e.g. Chicken Breast" />
                </div>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 700, display: "block", marginBottom: 6 }}>Unit</label>
                  <select className="form-input" value={form.unit} onChange={(e) => setForm(p => ({ ...p, unit: e.target.value }))}>
                    {["kg", "g", "ltr", "ml", "pcs", "box"].map(u => <option key={u}>{u}</option>)}
                  </select>
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 700, display: "block", marginBottom: 6 }}>Quantity *</label>
                  <input className="form-input" type="number" value={form.quantity} onChange={(e) => setForm(p => ({ ...p, quantity: e.target.value }))} />
                </div>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 700, display: "block", marginBottom: 6 }}>Min Level</label>
                  <input className="form-input" type="number" value={form.minQuantity} onChange={(e) => setForm(p => ({ ...p, minQuantity: e.target.value }))} />
                </div>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 700, display: "block", marginBottom: 6 }}>Cost/Unit (৳)</label>
                  <input className="form-input" type="number" value={form.costPerUnit} onChange={(e) => setForm(p => ({ ...p, costPerUnit: e.target.value }))} />
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 700, display: "block", marginBottom: 6 }}>Category</label>
                  <input className="form-input" value={form.category} onChange={(e) => setForm(p => ({ ...p, category: e.target.value }))} />
                </div>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 700, display: "block", marginBottom: 6 }}>Expiry Date</label>
                  <input className="form-input" type="date" value={form.expiry} onChange={(e) => setForm(p => ({ ...p, expiry: e.target.value }))} />
                </div>
              </div>
              <div>
                <label style={{ fontSize: 12, fontWeight: 700, display: "block", marginBottom: 6 }}>Supplier</label>
                <input className="form-input" value={form.supplier} onChange={(e) => setForm(p => ({ ...p, supplier: e.target.value }))} placeholder="Supplier name" />
              </div>
              <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
                <button onClick={handleSave} className="btn-primary" style={{ flex: 1 }}>{editing ? "Save Changes" : "Add Stock"}</button>
                <button onClick={() => setShowModal(false)} className="btn-outline">Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
