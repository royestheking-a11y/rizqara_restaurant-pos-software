"use client";
import { useState } from "react";
import { MENU_ITEMS, MENU_CATEGORIES } from "@/lib/mock-data";
import { Plus, Edit2, Trash2, Search, ToggleLeft, ToggleRight, Clock, Tag, Folder, Pizza, Beef, Coffee, Cake, Sandwich, Utensils, XCircle } from "lucide-react";
import PremiumIcon, { ICON_COLORS } from "@/components/PremiumIcon";

type MenuItem = typeof MENU_ITEMS[0] & { available: boolean };

export default function MenuPage() {
  const [items, setItems] = useState<MenuItem[]>(MENU_ITEMS.map(i => ({ ...i })));
  const [activeCategory, setActiveCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<MenuItem | null>(null);
  const [form, setForm] = useState({ name: "", price: "", category: "cat1", description: "", prepTime: "10", image: "🍔" });

  const CATEGORY_ICONS: Record<string, any> = {
    cat1: { icon: Beef,     color: ICON_COLORS.revenue.c1,  color2: ICON_COLORS.revenue.c2 },
    cat2: { icon: Pizza,    color: ICON_COLORS.warning.c1,  color2: ICON_COLORS.warning.c2 },
    cat3: { icon: Utensils, color: ICON_COLORS.success.c1,  color2: ICON_COLORS.success.c2 },
    cat4: { icon: Coffee,   color: ICON_COLORS.orders.c1,   color2: ICON_COLORS.orders.c2 },
    cat5: { icon: Cake,     color: ICON_COLORS.menu.c1,     color2: ICON_COLORS.menu.c2 },
    cat6: { icon: Sandwich, color: ICON_COLORS.inventory.c1, color2: ICON_COLORS.inventory.c2 },
  };

  const filtered = items.filter(
    (i) =>
      (activeCategory === "all" || i.category === activeCategory) &&
      i.name.toLowerCase().includes(search.toLowerCase())
  );

  const openAdd = () => {
    setEditing(null);
    setForm({ name: "", price: "", category: "cat1", description: "", prepTime: "10", image: "🍽️" });
    setShowModal(true);
  };

  const openEdit = (item: MenuItem) => {
    setEditing(item);
    setForm({ name: item.name, price: String(item.price), category: item.category, description: item.description, prepTime: String(item.prepTime), image: item.image });
    setShowModal(true);
  };

  const handleSave = () => {
    if (!form.name || !form.price) return;
    if (editing) {
      setItems(prev => prev.map(i => i.id === editing.id ? { ...i, ...form, price: parseFloat(form.price), prepTime: parseInt(form.prepTime) } : i));
    } else {
      const newItem: MenuItem = { id: `m${Date.now()}`, name: form.name, price: parseFloat(form.price), category: form.category, description: form.description, prepTime: parseInt(form.prepTime), image: form.image, available: true, tax: 5, addons: [] };
      setItems(prev => [...prev, newItem]);
    }
    setShowModal(false);
  };

  const toggleAvailability = (id: string) => {
    setItems(prev => prev.map(i => i.id === id ? { ...i, available: !i.available } : i));
  };

  const deleteItem = (id: string) => {
    if (confirm("Delete this item?")) setItems(prev => prev.filter(i => i.id !== id));
  };

  const getCatName = (id: string) => MENU_CATEGORIES.find(c => c.id === id)?.name || id;
  const currency = "৳";

  return (
    <div style={{ padding: "32px" }} className="animate-fade-in">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 28 }}>
        <div>
          <h1 style={{ fontFamily: "Poppins,sans-serif", fontSize: 28, fontWeight: 700, color: "var(--text)" }}>Menu Management</h1>
          <p style={{ color: "var(--text-muted)", marginTop: 4, fontSize: 14 }}>{items.length} items across {MENU_CATEGORIES.length} categories</p>
        </div>
        <button onClick={openAdd} className="btn-primary" style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14 }}>
          <Plus size={16} /> Add Item
        </button>
      </div>

      {/* Filters */}
      <div style={{ display: "flex", gap: 10, marginBottom: 24, alignItems: "center", flexWrap: "wrap" }}>
        <div style={{ position: "relative", flex: 1, minWidth: 200 }}>
          <Search size={16} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
          <input className="form-input" style={{ paddingLeft: 38, fontSize: 13 }} placeholder="Search items..." value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <div style={{ display: "flex", gap: 8, overflowX: "auto" }}>
          <button onClick={() => setActiveCategory("all")} style={{ padding: "8px 16px", borderRadius: 99, border: "2px solid", cursor: "pointer", fontWeight: 600, fontSize: 13, whiteSpace: "nowrap",
            borderColor: activeCategory === "all" ? "var(--primary)" : "var(--border)",
            background: activeCategory === "all" ? "var(--primary)" : "white",
            color: activeCategory === "all" ? "white" : "var(--text-muted)" }}>
            All
          </button>
          {MENU_CATEGORIES.map(cat => {
            const cfg = CATEGORY_ICONS[cat.id] || { icon: Utensils, color: "var(--primary)" };
            return (
              <button key={cat.id} onClick={() => setActiveCategory(cat.id)}
                style={{ padding: "6px 16px 6px 8px", borderRadius: 99, border: "2px solid", cursor: "pointer", fontWeight: 700, fontSize: 13, whiteSpace: "nowrap",
                  display: "flex", alignItems: "center", gap: 8,
                  borderColor: activeCategory === cat.id ? "var(--primary)" : "var(--border)",
                  background: activeCategory === cat.id ? "var(--primary)" : "white",
                  color: activeCategory === cat.id ? "white" : "var(--text-muted)" }}>
                <div style={{ width: 28, height: 28, borderRadius: 99, background: activeCategory === cat.id ? "rgba(255,255,255,0.2)" : "var(--primary-50)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <cfg.icon size={14} color={activeCategory === cat.id ? "white" : "var(--primary)"} />
                </div>
                {cat.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Items Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))", gap: 16 }}>
        {filtered.map((item) => (
          <div key={item.id} className="card" style={{ padding: 20, opacity: item.available ? 1 : 0.65 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
              <div style={{ position: "relative" }}>
                 <div style={{ width: 64, height: 64, background: "var(--primary-50)", borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32, border: "1px solid var(--border)" }}>
                   {item.image}
                 </div>
                 {!item.available && (
                   <div style={{ position: "absolute", inset: 0, background: "rgba(255,255,255,0.6)", borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center" }}>
                     <XCircle size={24} color="#DC2626" />
                   </div>
                 )}
              </div>
              <div style={{ display: "flex", gap: 6 }}>
                <button onClick={() => toggleAvailability(item.id)} style={{ background: "none", border: "none", cursor: "pointer", color: item.available ? "var(--success)" : "var(--text-muted)" }}>
                  {item.available ? <ToggleRight size={22} /> : <ToggleLeft size={22} />}
                </button>
                <button onClick={() => openEdit(item)} style={{ background: "var(--primary-50)", border: "none", cursor: "pointer", borderRadius: 8, padding: 6, color: "var(--primary)" }}>
                  <Edit2 size={14} />
                </button>
                <button onClick={() => deleteItem(item.id)} style={{ background: "#FEE2E2", border: "none", cursor: "pointer", borderRadius: 8, padding: 6, color: "#DC2626" }}>
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
            <div style={{ fontSize: 14, fontWeight: 700, color: "var(--text)", marginBottom: 4 }}>{item.name}</div>
            <div style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 10, lineHeight: 1.4 }}>{item.description}</div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: 18, fontWeight: 800, color: "var(--primary)" }}>{currency}{item.price}</span>
              <span className={`badge ${item.available ? "badge-success" : "badge-danger"}`}>{item.available ? "Available" : "Unavailable"}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 12, fontSize: 11, color: "var(--text-muted)", paddingTop: 10, borderTop: "1px dashed var(--border)" }}>
              <span style={{ display: "flex", alignItems: "center", gap: 4 }}><Folder size={12} /> {getCatName(item.category)}</span>
              <span style={{ display: "flex", alignItems: "center", gap: 4 }}><Clock size={12} /> {item.prepTime} min</span>
              <span style={{ display: "flex", alignItems: "center", gap: 4 }}><Tag size={12} /> {item.tax}% tax</span>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <h2 style={{ fontFamily: "Poppins,sans-serif", fontSize: 20, fontWeight: 700, marginBottom: 24, color: "var(--text)" }}>
              {editing ? "Edit Menu Item" : "Add New Item"}
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 700, color: "var(--text)", display: "block", marginBottom: 6 }}>Item Name *</label>
                  <input className="form-input" placeholder="e.g. Cheese Burger" value={form.name} onChange={(e) => setForm(p => ({ ...p, name: e.target.value }))} />
                </div>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 700, color: "var(--text)", display: "block", marginBottom: 6 }}>Price (৳) *</label>
                  <input className="form-input" type="number" placeholder="e.g. 320" value={form.price} onChange={(e) => setForm(p => ({ ...p, price: e.target.value }))} />
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 700, color: "var(--text)", display: "block", marginBottom: 6 }}>Category</label>
                  <select className="form-input" value={form.category} onChange={(e) => setForm(p => ({ ...p, category: e.target.value }))}>
                    {MENU_CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 700, color: "var(--text)", display: "block", marginBottom: 6 }}>Prep Time (min)</label>
                  <input className="form-input" type="number" value={form.prepTime} onChange={(e) => setForm(p => ({ ...p, prepTime: e.target.value }))} />
                </div>
              </div>
              <div>
                <label style={{ fontSize: 12, fontWeight: 700, color: "var(--text)", display: "block", marginBottom: 6 }}>Emoji Icon</label>
                <input className="form-input" value={form.image} onChange={(e) => setForm(p => ({ ...p, image: e.target.value }))} placeholder="Paste an emoji" />
              </div>
              <div>
                <label style={{ fontSize: 12, fontWeight: 700, color: "var(--text)", display: "block", marginBottom: 6 }}>Description</label>
                <textarea className="form-input" rows={2} value={form.description} onChange={(e) => setForm(p => ({ ...p, description: e.target.value }))} placeholder="Short description..." style={{ resize: "vertical" }} />
              </div>
              <div style={{ display: "flex", gap: 10 }}>
                <button onClick={handleSave} className="btn-primary" style={{ flex: 1 }}>{editing ? "Save Changes" : "Add Item"}</button>
                <button onClick={() => setShowModal(false)} className="btn-outline">Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
