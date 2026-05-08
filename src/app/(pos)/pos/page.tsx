"use client";
import { useState, useEffect, useRef } from "react";
import { MENU_CATEGORIES, MENU_ITEMS, TABLES, RESTAURANT } from "@/lib/mock-data";
import { useCartStore } from "@/lib/store";
import { Plus, Minus, Trash2, Search, ChevronDown, Printer, Tag, ShoppingCart, Utensils, Truck, Package, Clock, XCircle, CreditCard, Banknote, Smartphone, Zap, Scissors, MessageSquare, CheckCircle2 } from "lucide-react";
import PremiumIcon, { ICON_COLORS } from "@/components/PremiumIcon";
import { useReactToPrint } from "react-to-print";
import { ReceiptPrint } from "@/components/ReceiptPrint";

type OrderType = "dine-in" | "takeaway" | "delivery";

export default function POSPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [showPayModal, setShowPayModal] = useState(false);
  const [selectedTable, setSelectedTable] = useState<string | null>(null);
  const [orderType, setOrderType] = useState<OrderType>("dine-in");
  const [payMethod, setPayMethod] = useState("cash");
  const [discountInput, setDiscountInput] = useState("");
  const [orderNote, setOrderNote] = useState("");
  const [paid, setPaid] = useState(false);

  const receiptRef = useRef<HTMLDivElement>(null);
  const handlePrint = useReactToPrint({ contentRef: receiptRef });

  const { items, addItem, removeItem, updateQty, clearCart, setDiscount, discount, getSubtotal, getTax, getTotal } = useCartStore();

  const filteredItems = MENU_ITEMS.filter(
    (item) =>
      item.available &&
      (activeCategory === "all" || item.category === activeCategory) &&
      item.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleAddItem = (item: typeof MENU_ITEMS[0]) => {
    addItem({ id: item.id, name: item.name, price: item.price, qty: 1, image: item.image });
  };

  const handleDiscount = (val: string) => {
    setDiscountInput(val);
    const n = parseFloat(val);
    setDiscount(isNaN(n) ? 0 : n);
  };

  const handlePayNow = async () => {
    await new Promise((r) => setTimeout(r, 800));
    setPaid(true);
    setTimeout(() => {
      clearCart();
      setShowPayModal(false);
      setPaid(false);
      setPayMethod("cash");
      setDiscountInput("");
    }, 2000);
  };

  const currency = RESTAURANT.currency;

  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      {/* ─── Left: Categories + Menu ─── */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        {/* Top bar */}
        <div style={{ padding: "18px 24px", background: "white", borderBottom: "1px solid var(--border)", display: "flex", gap: 12, alignItems: "center" }}>
          <div style={{ position: "relative", flex: 1 }}>
            <Search size={16} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
            <input className="form-input" style={{ paddingLeft: 38, fontSize: 14 }} placeholder="Search menu items..." value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          {/* Order Type */}
          {(["dine-in", "takeaway", "delivery"] as OrderType[]).map((t) => (
            <button key={t} onClick={() => setOrderType(t)}
              style={{ padding: "8px 16px", borderRadius: 99, fontSize: 13, fontWeight: 700, cursor: "pointer", border: "2px solid", transition: "all 0.15s",
                display: "flex", alignItems: "center", gap: 8,
                borderColor: orderType === t ? "var(--primary)" : "var(--border)",
                background: orderType === t ? "var(--primary)" : "white",
                color: orderType === t ? "white" : "var(--text-muted)",
                textTransform: "capitalize",
              }}>
              {t === "dine-in" ? <Utensils size={14} /> : t === "takeaway" ? <Package size={14} /> : <Truck size={14} />} 
              {t}
            </button>
          ))}
          {orderType === "dine-in" && (
            <select className="form-input" style={{ width: 140, fontSize: 13 }} value={selectedTable || ""} onChange={(e) => setSelectedTable(e.target.value || null)}>
              <option value="">Select Table</option>
              {TABLES.filter(t => t.status === "available" || t.status === "occupied").map(t => (
                <option key={t.id} value={t.id}>Table {t.number} ({t.status})</option>
              ))}
            </select>
          )}
        </div>

        {/* Category tabs */}
        <div style={{ display: "flex", gap: 8, padding: "14px 24px", background: "white", borderBottom: "1px solid var(--border)", overflowX: "auto" }}>
          <button onClick={() => setActiveCategory("all")}
            style={{ padding: "8px 18px", borderRadius: 99, fontSize: 13, fontWeight: 700, whiteSpace: "nowrap", border: "2px solid", cursor: "pointer",
              display: "flex", alignItems: "center", gap: 8,
              borderColor: activeCategory === "all" ? "var(--primary)" : "var(--border)",
              background: activeCategory === "all" ? "var(--primary)" : "white",
              color: activeCategory === "all" ? "white" : "var(--text-muted)",
            }}>
            <Utensils size={14} /> All Items
          </button>
          {MENU_CATEGORIES.map((cat) => (
            <button key={cat.id} onClick={() => setActiveCategory(cat.id)}
              style={{ padding: "8px 18px", borderRadius: 99, fontSize: 13, fontWeight: 700, whiteSpace: "nowrap", border: "2px solid", cursor: "pointer",
                display: "flex", alignItems: "center", gap: 8,
                borderColor: activeCategory === cat.id ? "var(--primary)" : "var(--border)",
                background: activeCategory === cat.id ? "var(--primary)" : "white",
                color: activeCategory === cat.id ? "white" : "var(--text-muted)",
              }}>
              {/* Note: In a real app we'd map cat.id to Lucide icons like in Menu page */}
              {cat.name}
            </button>
          ))}
        </div>

        {/* Menu grid */}
        <div style={{ flex: 1, overflowY: "auto", padding: "20px 24px" }}>
          {filteredItems.length === 0 ? (
            <div style={{ textAlign: "center", padding: 60, color: "var(--text-muted)" }}>
              <div style={{ display: "flex", justifyContent: "center", marginBottom: 20 }}>
                <PremiumIcon icon={Search} color={ICON_COLORS.revenue.c1} color2={ICON_COLORS.revenue.c2} size={32} boxSize={74} radius={37} soft />
              </div>
              <p style={{ fontWeight: 700, fontSize: 16, color: "var(--text)" }}>No items found</p>
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(180px,1fr))", gap: 16 }}>
              {filteredItems.map((item) => {
                const inCart = items.find((i) => i.id === item.id);
                return (
                  <div key={item.id} className="menu-item-card" onClick={() => handleAddItem(item)}
                    style={{ borderColor: inCart ? "var(--primary)" : "var(--border)", background: inCart ? "var(--primary-50)" : "white" }}>
                    <div style={{ fontSize: 40, textAlign: "center", marginBottom: 8, lineHeight: 1 }}>{item.image}</div>
                    <p style={{ fontSize: 13, fontWeight: 700, color: "var(--text)", marginBottom: 4, lineHeight: 1.3 }}>{item.name}</p>
                    <p style={{ fontSize: 11, color: "var(--text-muted)", marginBottom: 10, lineHeight: 1.4 }}>{item.description}</p>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontSize: 16, fontWeight: 800, color: "var(--primary)" }}>{currency}{item.price}</span>
                      <div style={{ width: 28, height: 28, background: inCart ? "var(--primary)" : "var(--primary-100)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <Plus size={16} color={inCart ? "white" : "var(--primary)"} />
                      </div>
                    </div>
                    {inCart && (
                      <div style={{ position: "absolute", top: 8, right: 8, background: "var(--primary)", color: "white", borderRadius: 99, width: 22, height: 22, fontSize: 11, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>
                        {inCart.qty}
                      </div>
                    )}
                    <div style={{ position: "absolute", bottom: 8, left: 8, fontSize: 10, color: "var(--text-muted)", display: "flex", alignItems: "center", gap: 3 }}>
                      <Clock size={10} /> {item.prepTime}m
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* ─── Right: Cart ─── */}
      <div className="cart-panel" style={{ width: 360, borderLeft: "1px solid var(--border)" }}>
        {/* Cart Header */}
        <div style={{ padding: "18px 20px", borderBottom: "1px solid var(--border)", background: "var(--primary)", color: "white" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <ShoppingCart size={20} />
              <span style={{ fontWeight: 700, fontSize: 16 }}>Order Cart</span>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              {items.length > 0 && (
                <button onClick={() => clearCart()} style={{ background: "rgba(255,255,255,0.2)", border: "none", color: "white", borderRadius: 8, padding: "6px 10px", cursor: "pointer", fontSize: 12 }}>
                  Clear
                </button>
              )}
              <span style={{ background: "rgba(255,255,255,0.25)", borderRadius: 99, padding: "3px 10px", fontSize: 13, fontWeight: 700 }}>{items.length} items</span>
            </div>
          </div>
          <div style={{ marginTop: 8, fontSize: 12, opacity: 0.8, textTransform: "capitalize" }}>
            {orderType} {selectedTable ? `· Table ${TABLES.find(t => t.id === selectedTable)?.number}` : ""}
          </div>
        </div>

        {/* Cart Items */}
        <div style={{ flex: 1, overflowY: "auto", padding: "12px 16px" }}>
          {items.length === 0 ? (
            <div style={{ textAlign: "center", padding: "80px 20px", color: "var(--text-muted)" }}>
              <div style={{ display: "flex", justifyContent: "center", marginBottom: 20 }}>
                <PremiumIcon icon={ShoppingCart} color={ICON_COLORS.orders.c1} color2={ICON_COLORS.orders.c2} size={32} boxSize={74} radius={37} soft />
              </div>
              <p style={{ fontWeight: 700, fontSize: 15, color: "var(--text)" }}>Cart is empty</p>
              <p style={{ fontSize: 12, marginTop: 4 }}>Click menu items to add</p>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} style={{ display: "flex", gap: 12, alignItems: "center", padding: "12px 0", borderBottom: "1px solid var(--border)" }}>
                <div style={{ fontSize: 28 }}>{item.image || "🍽️"}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: 13, fontWeight: 600, color: "var(--text)", lineHeight: 1.3 }}>{item.name}</p>
                  <p style={{ fontSize: 13, color: "var(--primary)", fontWeight: 700, marginTop: 2 }}>{currency}{(item.price * item.qty).toFixed(0)}</p>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <button onClick={() => updateQty(item.id, item.qty - 1)}
                    style={{ width: 26, height: 26, border: "1.5px solid var(--border)", borderRadius: 8, background: "white", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Minus size={12} />
                  </button>
                  <span style={{ fontSize: 14, fontWeight: 700, width: 20, textAlign: "center" }}>{item.qty}</span>
                  <button onClick={() => updateQty(item.id, item.qty + 1)}
                    style={{ width: 26, height: 26, border: "none", background: "var(--primary)", borderRadius: 8, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Plus size={12} color="white" />
                  </button>
                </div>
                <button onClick={() => removeItem(item.id)} style={{ background: "#FEE2E2", border: "none", color: "#DC2626", borderRadius: 8, padding: 6, cursor: "pointer" }}>
                  <Trash2 size={14} />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Order Note */}
        {items.length > 0 && (
          <div style={{ padding: "8px 16px", position: "relative" }}>
            <MessageSquare size={13} style={{ position: "absolute", left: 28, top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
            <input className="form-input" style={{ fontSize: 12, paddingLeft: 30 }} placeholder="Order note (optional)" value={orderNote} onChange={(e) => setOrderNote(e.target.value)} />
          </div>
        )}

        {/* Summary */}
        <div style={{ padding: "16px 20px", borderTop: "1px solid var(--border)", background: "var(--surface)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "var(--text-muted)", marginBottom: 8 }}>
            <span>Subtotal</span><span style={{ fontWeight: 600, color: "var(--text)" }}>{currency}{getSubtotal().toFixed(0)}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "var(--text-muted)", marginBottom: 8 }}>
            <span>Tax (5%)</span><span style={{ fontWeight: 600, color: "var(--text)" }}>{currency}{getTax().toFixed(0)}</span>
          </div>
          <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 8 }}>
            <Tag size={14} color="var(--text-muted)" />
            <input className="form-input" style={{ fontSize: 12, padding: "6px 10px" }} placeholder="Discount (৳)" type="number" value={discountInput} onChange={(e) => handleDiscount(e.target.value)} />
          </div>
          {discount > 0 && (
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "var(--success)", marginBottom: 8 }}>
              <span>Discount</span><span style={{ fontWeight: 600 }}>-{currency}{discount}</span>
            </div>
          )}
          <div style={{ display: "flex", justifyContent: "space-between", borderTop: "2px solid var(--border)", paddingTop: 12, marginTop: 4 }}>
            <span style={{ fontSize: 17, fontWeight: 700, color: "var(--text)" }}>Total</span>
            <span style={{ fontSize: 22, fontWeight: 800, color: "var(--primary)", fontFamily: "Poppins,sans-serif" }}>{currency}{getTotal().toFixed(0)}</span>
          </div>
          <button
            onClick={() => items.length > 0 && setShowPayModal(true)}
            className="btn-primary"
            style={{ width: "100%", marginTop: 14, padding: "14px", fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center", gap: 10, opacity: items.length === 0 ? 0.5 : 1 }}
          >
            💳 Proceed to Pay
          </button>
          <button
            onClick={() => items.length > 0 && alert("Order sent to kitchen!")}
            className="btn-outline"
            style={{ width: "100%", marginTop: 8, padding: "11px", fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, opacity: items.length === 0 ? 0.5 : 1 }}
          >
            🍳 Send to Kitchen
          </button>
        </div>
      </div>

      {/* ─── Payment Modal ─── */}
      {showPayModal && (
        <div className="modal-overlay" onClick={(e) => { if (e.target === e.currentTarget && !paid) setShowPayModal(false); }}>
          <div className="modal-box" style={{ maxWidth: 480 }}>
            {paid ? (
              <div style={{ textAlign: "center", padding: "32px" }}>
                <div style={{ display: "flex", justifyContent: "center", marginBottom: 24 }}>
                  <PremiumIcon icon={CheckCircle2} color="#16A34A" color2="#34D399" size={48} boxSize={100} radius={50} />
                </div>
                <h2 style={{ fontFamily: "Poppins,sans-serif", fontSize: 24, color: "var(--success)", fontWeight: 800 }}>Payment Successful!</h2>
                <p style={{ color: "var(--text-muted)", marginTop: 8 }}>Order has been placed. Printing receipt...</p>
                <div style={{ marginTop: 20 }}>
                  <button onClick={() => handlePrint()} className="btn-primary" style={{ padding: "10px 20px" }}>Print Receipt Duplicate</button>
                </div>
              </div>
            ) : (
              <>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
                  <h2 style={{ fontFamily: "Poppins,sans-serif", fontSize: 20, fontWeight: 700, color: "var(--text)" }}>Complete Payment</h2>
                  <button onClick={() => setShowPayModal(false)} style={{ background: "#F5F5F5", border: "none", borderRadius: 8, padding: "8px 12px", cursor: "pointer", fontSize: 13 }}>✕ Close</button>
                </div>

                {/* Receipt summary */}
                <div style={{ background: "var(--surface)", borderRadius: 12, padding: 16, marginBottom: 20 }}>
                  {items.map((i) => (
                    <div key={i.id} style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 6 }}>
                      <span>{i.name} × {i.qty}</span>
                      <span style={{ fontWeight: 600 }}>{currency}{(i.price * i.qty).toFixed(0)}</span>
                    </div>
                  ))}
                  <div style={{ borderTop: "1px dashed var(--border)", marginTop: 10, paddingTop: 10 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 4 }}>
                      <span>Subtotal</span><span>{currency}{getSubtotal().toFixed(0)}</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 4 }}>
                      <span>Tax</span><span>{currency}{getTax().toFixed(0)}</span>
                    </div>
                    {discount > 0 && (
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "var(--success)", marginBottom: 4 }}>
                        <span>Discount</span><span>-{currency}{discount}</span>
                      </div>
                    )}
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 18, fontWeight: 800, color: "var(--primary)", marginTop: 8 }}>
                      <span>Total</span><span>{currency}{getTotal().toFixed(0)}</span>
                    </div>
                  </div>
                </div>

                {/* Payment methods */}
                <p style={{ fontSize: 13, fontWeight: 700, color: "var(--text)", marginBottom: 10 }}>Select Payment Method</p>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 20 }}>
                  {[
                    { id: "cash", icon: Banknote,    label: "Cash",  iconSet: ICON_COLORS.success },
                    { id: "card", icon: CreditCard,  label: "Card",  iconSet: ICON_COLORS.orders },
                    { id: "bkash", icon: Smartphone, label: "bKash", iconSet: ICON_COLORS.revenue },
                    { id: "nagad", icon: Zap,        label: "Nagad", iconSet: ICON_COLORS.warning },
                    { id: "rocket", icon: Smartphone, label: "Rocket", iconSet: ICON_COLORS.inventory },
                    { id: "split", icon: Scissors,   label: "Split", iconSet: ICON_COLORS.staff },
                  ].map((m) => (
                    <button key={m.id} onClick={() => setPayMethod(m.id)}
                      style={{ padding: "16px 8px", borderRadius: 14, border: "2px solid", cursor: "pointer", textAlign: "center", transition: "all 0.2s",
                        display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
                        borderColor: payMethod === m.id ? "var(--primary)" : "var(--border)",
                        background: payMethod === m.id ? "var(--primary-50)" : "white",
                        boxShadow: payMethod === m.id ? "0 4px 12px rgba(139,0,0,0.1)" : "none",
                      }}>
                      <PremiumIcon icon={m.icon} color={m.iconSet.c1} color2={m.iconSet.c2} size={20} boxSize={44} radius={12} glow={false} />
                      <div style={{ fontSize: 12, fontWeight: 700, color: payMethod === m.id ? "var(--primary)" : "var(--text-muted)" }}>{m.label}</div>
                    </button>
                  ))}
                </div>

                <div style={{ display: "flex", gap: 10 }}>
                  <button onClick={handlePayNow} className="btn-primary" style={{ flex: 1, padding: "14px", fontSize: 15, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                    💳 Confirm Payment
                  </button>
                  <button onClick={() => handlePrint()} className="btn-outline" style={{ padding: "14px 18px", display: "flex", alignItems: "center", gap: 8 }}>
                    <Printer size={16} /> Print
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Hidden Receipt for react-to-print */}
      <div style={{ display: "none" }}>
        <ReceiptPrint
          ref={receiptRef}
          items={items}
          subtotal={getSubtotal()}
          tax={getTax()}
          discount={discount}
          total={getTotal()}
          orderType={orderType}
          tableId={selectedTable}
          paymentMethod={payMethod}
        />
      </div>
    </div>
  );
}
