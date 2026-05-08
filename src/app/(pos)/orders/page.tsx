"use client";
import { useState } from "react";
import { ORDERS, RESTAURANT } from "@/lib/mock-data";
import { Search, Filter, Eye, X, ClipboardList, MapPin, Package, Truck, Clock, CheckCircle2, CookingPot, XCircle, Utensils } from "lucide-react";
import PremiumIcon, { ICON_COLORS } from "@/components/PremiumIcon";

type OrderStatus = "pending" | "cooking" | "ready" | "served" | "cancelled";

const STATUS_STYLE: Record<OrderStatus, { cls: string; label: string; icon: any; iconSet: any }> = {
  pending:   { cls: "badge badge-warning", label: "Pending",   icon: Clock,       iconSet: ICON_COLORS.warning },
  cooking:   { cls: "badge badge-info",    label: "Cooking",   icon: CookingPot,  iconSet: ICON_COLORS.orders },
  ready:     { cls: "badge badge-success", label: "Ready",     icon: CheckCircle2, iconSet: ICON_COLORS.success },
  served:    { cls: "badge badge-primary", label: "Served",    icon: Utensils,    iconSet: ICON_COLORS.revenue },
  cancelled: { cls: "badge badge-danger",  label: "Cancelled", icon: XCircle,     iconSet: ICON_COLORS.danger },
};

const TYPE_CONFIG: Record<string, { icon: any; label: string }> = {
  "dine-in": { icon: Utensils, label: "Dine-in" },
  takeaway:  { icon: Package,  label: "Takeaway" },
  delivery:  { icon: Truck,    label: "Delivery" },
};

export default function OrdersPage() {
  const [orders, setOrders] = useState(ORDERS.map((o: any) => ({ ...o, status: o.status as OrderStatus })));
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<OrderStatus | "all">("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [viewOrder, setViewOrder] = useState<any | null>(null);
  const currency = RESTAURANT.currency;

  const filtered = orders.filter(
    (o: any) =>
      (statusFilter === "all" || o.status === statusFilter) &&
      (typeFilter === "all" || o.type === typeFilter) &&
      (o.id.toLowerCase().includes(search.toLowerCase()))
  );

  const updateStatus = (id: string, status: OrderStatus) => {
    setOrders((prev: any[]) => prev.map((o: any) => (o.id === id ? { ...o, status } : o)));
    if (viewOrder?.id === id) setViewOrder((prev: any) => (prev ? { ...prev, status } : null));
  };

  return (
    <div style={{ padding: "32px" }} className="animate-fade-in">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 28 }}>
        <div>
          <h1 style={{ fontFamily: "Poppins,sans-serif", fontSize: 28, fontWeight: 700, color: "var(--text)" }}>Order Management</h1>
          <p style={{ color: "var(--text-muted)", marginTop: 4, fontSize: 14 }}>{orders.length} total orders today</p>
        </div>
        <a href="/pos" className="btn-primary" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 8, fontSize: 14 }}>
          + New Order
        </a>
      </div>

      {/* Status summary pills */}
      <div style={{ display: "flex", gap: 10, marginBottom: 20, flexWrap: "wrap" }}>
        {(["all", "pending", "cooking", "ready", "served", "cancelled"] as const).map((s) => {
          const count = s === "all" ? orders.length : orders.filter((o: any) => o.status === s).length;
          return (
            <button key={s} onClick={() => setStatusFilter(s)}
              style={{ padding: "7px 16px", borderRadius: 99, border: "2px solid", cursor: "pointer", fontWeight: 600, fontSize: 13,
                borderColor: statusFilter === s ? "var(--primary)" : "var(--border)",
                background: statusFilter === s ? "var(--primary)" : "white",
                color: statusFilter === s ? "white" : "var(--text-muted)",
                display: "flex", alignItems: "center", gap: 6,
              }}>
              <span style={{ textTransform: "capitalize" }}>{s === "all" ? "All Orders" : s}</span>
              <span style={{ background: statusFilter === s ? "rgba(255,255,255,0.25)" : "var(--primary-100)", color: statusFilter === s ? "white" : "var(--primary)", borderRadius: 99, padding: "0 7px", fontSize: 11, fontWeight: 700 }}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Filters row */}
      <div style={{ display: "flex", gap: 12, marginBottom: 20 }}>
        <div style={{ position: "relative", flex: 1 }}>
          <Search size={16} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
          <input className="form-input" style={{ paddingLeft: 38, fontSize: 13 }} placeholder="Search by order ID..." value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <select className="form-input" style={{ width: 160, fontSize: 13 }} value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
          <option value="all">All Types</option>
          <option value="dine-in">Dine-in</option>
          <option value="takeaway">Takeaway</option>
          <option value="delivery">Delivery</option>
        </select>
      </div>

      {/* Orders Table */}
      <div className="card" style={{ overflow: "hidden" }}>
        <table className="data-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Type</th>
              <th>Table</th>
              <th>Items</th>
              <th>Total</th>
              <th>Payment</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((order) => (
              <tr key={order.id}>
                <td style={{ fontWeight: 700, color: "var(--primary)" }}>{order.id}</td>
                <td style={{ fontSize: 13 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                    {(() => {
                      const cfg = TYPE_CONFIG[order.type];
                      return cfg ? <><cfg.icon size={14} color="var(--text-muted)" /> {cfg.label}</> : order.type;
                    })()}
                  </div>
                </td>
                <td>{order.tableId ? `Table ${order.tableId.replace("t", "")}` : "—"}</td>
                <td>{order.items.length} items</td>
                <td style={{ fontWeight: 700 }}>{currency}{order.total.toFixed(0)}</td>
                <td>
                  {order.paymentMethod ? (
                    <span className="badge badge-success">{order.paymentMethod}</span>
                  ) : (
                    <span className="badge badge-warning">Pending</span>
                  )}
                </td>
                <td>
                  <span className={STATUS_STYLE[order.status as OrderStatus]?.cls || "badge badge-primary"}>
                    {STATUS_STYLE[order.status as OrderStatus]?.label || order.status}
                  </span>
                </td>
                <td>
                  <button onClick={() => setViewOrder(order)} style={{ background: "var(--primary-50)", border: "none", borderRadius: 8, padding: "6px 10px", cursor: "pointer", color: "var(--primary)", display: "flex", alignItems: "center", gap: 6, fontSize: 12, fontWeight: 600 }}>
                    <Eye size={14} /> View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: 60, color: "var(--text-muted)" }}>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>
               <PremiumIcon icon={ClipboardList} color={ICON_COLORS.orders.c1} color2={ICON_COLORS.orders.c2} size={32} boxSize={70} radius={24} soft />
            </div>
            <p style={{ fontWeight: 700, fontSize: 16, color: "var(--text)" }}>No orders found</p>
            <p style={{ fontSize: 13 }}>Try adjusting your filters or search term</p>
          </div>
        )}
      </div>

      {/* Order Detail Modal */}
      {viewOrder && (
        <div className="modal-overlay" onClick={() => setViewOrder(null)}>
          <div className="modal-box" style={{ maxWidth: 520 }} onClick={(e) => e.stopPropagation()}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <div>
                <h2 style={{ fontFamily: "Poppins,sans-serif", fontSize: 20, fontWeight: 700, color: "var(--text)" }}>{viewOrder.id}</h2>
                <p style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 2 }}>
                  {new Date(viewOrder.createdAt).toLocaleString("en-BD")} · {viewOrder.type}
                </p>
              </div>
              <button onClick={() => setViewOrder(null)} style={{ background: "#F5F5F5", border: "none", borderRadius: 8, padding: "8px 12px", cursor: "pointer" }}>
                <X size={16} />
              </button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 20 }}>
              {viewOrder.items.map((item: any, i: number) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "10px 14px", background: "var(--surface)", borderRadius: 10 }}>
                  <span style={{ fontSize: 14 }}>{item.name} × {item.qty}</span>
                  <span style={{ fontSize: 14, fontWeight: 700, color: "var(--primary)" }}>{currency}{(item.price * item.qty).toFixed(0)}</span>
                </div>
              ))}
            </div>

            <div style={{ background: "var(--primary-50)", borderRadius: 12, padding: 16, marginBottom: 20 }}>
              {[
                { label: "Subtotal", value: `${currency}${viewOrder.subtotal.toFixed(0)}` },
                { label: "Tax", value: `${currency}${viewOrder.tax.toFixed(0)}` },
                { label: "Discount", value: viewOrder.discount > 0 ? `-${currency}${viewOrder.discount}` : "—" },
                { label: "TOTAL", value: `${currency}${viewOrder.total.toFixed(0)}`, bold: true },
              ].map((row) => (
                <div key={row.label} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", fontSize: row.bold ? 18 : 13, fontWeight: row.bold ? 800 : 400, color: row.bold ? "var(--primary)" : "var(--text)" }}>
                  <span>{row.label}</span><span>{row.value}</span>
                </div>
              ))}
            </div>

            <div style={{ marginBottom: 20 }}>
              <p style={{ fontSize: 12, fontWeight: 700, marginBottom: 8, color: "var(--text)" }}>Update Status</p>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {(["pending", "cooking", "ready", "served", "cancelled"] as OrderStatus[]).map((s) => (
                  <button key={s} onClick={() => updateStatus(viewOrder.id, s)}
                    style={{ padding: "8px 16px", borderRadius: 99, border: "2px solid", cursor: "pointer", fontSize: 12, fontWeight: 700, textTransform: "capitalize", display: "flex", alignItems: "center", gap: 6,
                      borderColor: viewOrder.status === s ? "var(--primary)" : "var(--border)",
                      background: viewOrder.status === s ? "var(--primary)" : "white",
                      color: viewOrder.status === s ? "white" : "var(--text-muted)",
                    }}>
                    {(() => {
                      const cfg = STATUS_STYLE[s];
                      return cfg ? <><cfg.icon size={13} /> {cfg.label}</> : s;
                    })()}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ display: "flex", gap: 10 }}>
              <button className="btn-primary" style={{ flex: 1 }} onClick={() => setViewOrder(null)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
