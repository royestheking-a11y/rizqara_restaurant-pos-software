"use client";
import { useState } from "react";
import { ORDERS, RESTAURANT } from "@/lib/mock-data";
import { Printer, RefreshCw, Check, Banknote, CreditCard, Smartphone, Wallet, Rocket, Scissors, AlertCircle, CheckCircle2, Utensils, Receipt, Zap } from "lucide-react";
import PremiumIcon, { ICON_COLORS } from "@/components/PremiumIcon";

const PAYMENT_METHODS = [
  { id: "cash", icon: Banknote,   label: "Cash",      iconSet: ICON_COLORS.success },
  { id: "card", icon: CreditCard, label: "Card",      iconSet: ICON_COLORS.orders },
  { id: "bkash", icon: Smartphone, label: "bKash",    iconSet: ICON_COLORS.revenue },
  { id: "nagad", icon: Zap,        label: "Nagad",    iconSet: ICON_COLORS.warning },
  { id: "rocket", icon: Smartphone, label: "Rocket",  iconSet: ICON_COLORS.inventory },
  { id: "split", icon: Scissors,   label: "Split Pay", iconSet: ICON_COLORS.staff },
];

export default function BillingPage() {
  const [selectedOrderId, setSelectedOrderId] = useState(ORDERS[0].id);
  const [payMethod, setPayMethod] = useState("cash");
  const [paid, setPaid] = useState(false);
  const [refundMode, setRefundMode] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);

  const order = ORDERS.find(o => o.id === selectedOrderId) || ORDERS[0];
  const currency = RESTAURANT.currency;

  const handlePay = () => {
    setPaid(true);
    setShowReceipt(true);
  };

  const handleRefund = () => {
    alert(`Refund of ${currency}${order.total.toFixed(0)} initiated for ${order.id}`);
    setRefundMode(false);
  };

  return (
    <div style={{ padding: "32px" }} className="animate-fade-in">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 28 }}>
        <div>
          <h1 style={{ fontFamily: "Poppins,sans-serif", fontSize: 28, fontWeight: 700, color: "var(--text)" }}>Billing & Payments</h1>
          <p style={{ color: "var(--text-muted)", marginTop: 4, fontSize: 14 }}>Process payments and print receipts</p>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 24 }}>
        {/* Left — Order selector + summary */}
        <div>
          <div className="card" style={{ padding: 24, marginBottom: 20 }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 16, color: "var(--text)" }}>Select Order</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {ORDERS.map(o => (
                <div key={o.id} onClick={() => { setSelectedOrderId(o.id); setPaid(false); setShowReceipt(false); }}
                  style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 18px", borderRadius: 14, cursor: "pointer", border: "2px solid", transition: "all 0.2s",
                    borderColor: selectedOrderId === o.id ? "var(--primary)" : "var(--border)",
                    background: selectedOrderId === o.id ? "var(--primary-50)" : "white",
                    boxShadow: selectedOrderId === o.id ? "0 4px 12px rgba(139,0,0,0.1)" : "none",
                  }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <PremiumIcon icon={Receipt} color={selectedOrderId === o.id ? ICON_COLORS.revenue.c1 : "#94A3B8"} color2={selectedOrderId === o.id ? ICON_COLORS.revenue.c2 : "#CBD5E1"} size={16} boxSize={38} radius={10} glow={false} />
                    <div>
                      <div style={{ fontWeight: 800, color: selectedOrderId === o.id ? "var(--primary)" : "var(--text)", fontSize: 14 }}>{o.id}</div>
                      <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 2, textTransform: "capitalize" }}>{o.type} · {o.items.length} items</div>
                    </div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontWeight: 800, fontSize: 16, color: "var(--text)" }}>{currency}{o.total.toFixed(0)}</div>
                    <span className={`badge badge-${o.paymentMethod ? "success" : "warning"}`} style={{ fontSize: 10 }}>
                      {o.paymentMethod ? "Paid" : "Unpaid"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order items breakdown */}
          <div className="card" style={{ padding: 24 }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 16, color: "var(--text)" }}>Order Details — {selectedOrderId}</h3>
            {order.items.map((item, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid var(--border)", fontSize: 14 }}>
                <div>
                  <span style={{ fontWeight: 600 }}>{item.name}</span>
                  <span style={{ color: "var(--text-muted)", marginLeft: 8 }}>× {item.qty}</span>
                </div>
                <span style={{ fontWeight: 700, color: "var(--primary)" }}>{currency}{(item.price * item.qty).toFixed(0)}</span>
              </div>
            ))}
            <div style={{ marginTop: 16, background: "var(--primary-50)", borderRadius: 12, padding: 16 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 6 }}>
                <span style={{ color: "var(--text-muted)" }}>Subtotal</span>
                <span style={{ fontWeight: 600 }}>{currency}{order.subtotal.toFixed(0)}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 6 }}>
                <span style={{ color: "var(--text-muted)" }}>Tax (5%)</span>
                <span style={{ fontWeight: 600 }}>{currency}{order.tax.toFixed(0)}</span>
              </div>
              {order.discount > 0 && (
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 6, color: "var(--success)" }}>
                  <span>Discount</span>
                  <span style={{ fontWeight: 600 }}>-{currency}{order.discount}</span>
                </div>
              )}
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 20, fontWeight: 800, color: "var(--primary)", borderTop: "1px solid var(--border)", paddingTop: 10, marginTop: 6 }}>
                <span>Total</span>
                <span>{currency}{order.total.toFixed(0)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right — Payment + Receipt */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {/* Payment methods */}
          <div className="card" style={{ padding: 24 }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 16, color: "var(--text)" }}>Payment Method</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 20 }}>
              {PAYMENT_METHODS.map(m => {
                const active = payMethod === m.id;
                return (
                  <button key={m.id} onClick={() => setPayMethod(m.id)}
                    style={{ padding: "16px 8px", borderRadius: 14, border: "2px solid", cursor: "pointer", textAlign: "center", transition: "all 0.2s",
                      borderColor: active ? "var(--primary)" : "var(--border)",
                      background: active ? "var(--primary-50)" : "white",
                      color: active ? "var(--primary)" : "var(--text-muted)",
                      display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
                      boxShadow: active ? "0 4px 12px rgba(139,0,0,0.1)" : "none",
                    }}>
                    <PremiumIcon icon={m.icon} color={m.iconSet.c1} color2={m.iconSet.c2} size={18} boxSize={42} radius={12} glow={false} />
                    <div style={{ fontSize: 11, fontWeight: 700 }}>{m.label}</div>
                  </button>
                );
              })}
            </div>

            {!paid ? (
              <button onClick={handlePay} className="btn-primary" style={{ width: "100%", padding: "16px", fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
                <Check size={20} /> Confirm Payment — {currency}{order.total.toFixed(0)}
              </button>
            ) : (
              <div style={{ background: "#DCFCE7", border: "2px solid #16A34A", borderRadius: 12, padding: "24px 16px", textAlign: "center" }}>
                <div style={{ display: "flex", justifyContent: "center", marginBottom: 12 }}>
                  <PremiumIcon icon={CheckCircle2} color="#16A34A" color2="#34D399" size={28} boxSize={56} radius={28} />
                </div>
                <p style={{ color: "#16A34A", fontWeight: 800, fontSize: 16 }}>Payment Received!</p>
                <p style={{ color: "#15803D", fontSize: 13, marginTop: 4 }}>{payMethod.toUpperCase()} — {currency}{order.total.toFixed(0)}</p>
              </div>
            )}

            <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
              <button onClick={() => setShowReceipt(!showReceipt)} className="btn-outline" style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, fontSize: 13 }}>
                <Printer size={16} /> {showReceipt ? "Hide" : "Print"} Receipt
              </button>
              <button onClick={() => setRefundMode(!refundMode)} style={{ flex: 1, background: refundMode ? "#DC2626" : "#FEE2E2", color: refundMode ? "white" : "#DC2626", border: "none", borderRadius: 10, padding: "10px", fontSize: 13, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                <RefreshCw size={16} /> {refundMode ? "Confirm Refund" : "Refund"}
              </button>
            </div>

            {refundMode && (
              <button onClick={handleRefund} style={{ width: "100%", marginTop: 10, background: "#DC2626", color: "white", border: "none", borderRadius: 10, padding: "12px", fontSize: 14, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                <AlertCircle size={16} /> Process Full Refund — {currency}{order.total.toFixed(0)}
              </button>
            )}
          </div>

          {/* Receipt preview */}
          {showReceipt && (
            <div className="card" style={{ padding: 24 }}>
              <div className="receipt-paper">
                  <div style={{ textAlign: "center", marginBottom: 12 }}>
                    <div style={{ fontWeight: 700, fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                      <Utensils size={16} /> {RESTAURANT.name}
                    </div>
                  <div style={{ fontSize: 11 }}>{RESTAURANT.address}</div>
                  <div style={{ fontSize: 11 }}>Tel: {RESTAURANT.phone}</div>
                  <div style={{ marginTop: 6, borderTop: "1px dashed #ccc", paddingTop: 6 }}>
                    Order: <strong>{order.id}</strong>
                  </div>
                  <div style={{ fontSize: 11 }}>{new Date().toLocaleString("en-BD")}</div>
                  <div style={{ borderBottom: "1px dashed #ccc", marginBottom: 10, paddingBottom: 6, marginTop: 6 }} />
                </div>
                {order.items.map((item, i) => (
                  <div key={i} style={{ display: "flex", justifyContent: "space-between", marginBottom: 4, fontSize: 12 }}>
                    <span>{item.name} x{item.qty}</span>
                    <span>{currency}{(item.price * item.qty).toFixed(0)}</span>
                  </div>
                ))}
                <div style={{ borderTop: "1px dashed #ccc", marginTop: 10, paddingTop: 10 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12 }}><span>Subtotal</span><span>{currency}{order.subtotal.toFixed(0)}</span></div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12 }}><span>Tax (5%)</span><span>{currency}{order.tax.toFixed(0)}</span></div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, fontWeight: 700, marginTop: 6 }}><span>TOTAL</span><span>{currency}{order.total.toFixed(0)}</span></div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginTop: 4, color: "#555" }}><span>Payment</span><span>{payMethod.toUpperCase()}</span></div>
                </div>
                <div style={{ textAlign: "center", marginTop: 16, fontSize: 11, borderTop: "1px dashed #ccc", paddingTop: 10 }}>
                  Thank you for visiting!<br />
                  Please come again &mdash; See you soon!<br />
                  <strong>{RESTAURANT.website}</strong>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
