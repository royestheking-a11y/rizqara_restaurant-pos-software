"use client";
import { useState } from "react";
import { RESTAURANT } from "@/lib/mock-data";
import {
  Banknote, Wallet, Rocket, Scissors, CheckCircle2, Zap,
  Store, CreditCard, Printer, Shield, Database, Bell, Globe,
  ChevronRight, Save, Smartphone, MessageSquare, HardDrive, Clock, Cloud, RefreshCw, Mail
} from "lucide-react";
import PremiumIcon, { ICON_COLORS } from "@/components/PremiumIcon";

const NAV = [
  { id: "restaurant", label: "Restaurant Info", icon: Store,      iconSet: ICON_COLORS.revenue },
  { id: "payment",    label: "Payment Methods", icon: CreditCard, iconSet: ICON_COLORS.orders },
  { id: "printer",    label: "Printer Setup",   icon: Printer,    iconSet: ICON_COLORS.staff },
  { id: "tax",        label: "Tax & Billing",   icon: Globe,      iconSet: ICON_COLORS.revenue },
  { id: "notifications", label: "Notifications", icon: Bell,      iconSet: ICON_COLORS.warning },
  { id: "security",   label: "Security",        icon: Shield,     iconSet: ICON_COLORS.danger },
  { id: "backup",     label: "Backup & Restore",icon: Database,   iconSet: ICON_COLORS.inventory },
];

const PAYMENT_OPTS = [
  { id: "cash", icon: Banknote,   label: "Cash",      desc: "Physical currency payments",        iconSet: ICON_COLORS.success },
  { id: "card", icon: CreditCard, label: "Credit/Debit Card", desc: "Visa, MasterCard, etc.",    iconSet: ICON_COLORS.orders },
  { id: "bkash", icon: Smartphone, label: "bKash",    desc: "Bangladesh mobile banking",         iconSet: ICON_COLORS.revenue },
  { id: "nagad", icon: Zap,        label: "Nagad",    desc: "Bangladesh mobile banking",         iconSet: ICON_COLORS.warning },
  { id: "rocket", icon: Smartphone, label: "Rocket",  desc: "Dutch-Bangla mobile banking",       iconSet: ICON_COLORS.inventory },
  { id: "split", icon: Scissors,   label: "Split Payment", desc: "Multiple methods",            iconSet: ICON_COLORS.staff },
];

const PRINTER_LIST = [
  { title: "Receipt Printer", desc: "POS terminal receipt", icon: Printer, status: "Connected", port: "USB001" },
  { title: "Kitchen Printer", desc: "Kitchen order tickets", icon: Printer, status: "Connected", port: "USB002" },
  { title: "Label Printer", desc: "Item labels", icon: Printer, status: "Disconnected", port: "—" },
];

const BACKUP_CARDS = [
  { title: "Manual Backup", desc: "Backup right now",   icon: HardDrive, action: "Backup Now", iconSet: ICON_COLORS.revenue },
  { title: "Schedule Backup", desc: "Auto daily",      icon: Clock,     action: "Configure",  iconSet: ICON_COLORS.orders },
  { title: "Cloud Sync",     desc: "Sync to cloud",    icon: Cloud,     action: "Connect",    iconSet: ICON_COLORS.staff },
  { title: "Restore Data",   desc: "Restore files",    icon: RefreshCw, action: "Restore",    iconSet: ICON_COLORS.warning },
];

const NOTIF_CHANNELS = [
  { id: "sms", icon: MessageSquare, label: "SMS" },
  { id: "email", icon: Mail, label: "Email" },
  { id: "push", icon: Bell, label: "Push" },
];

export default function SettingsPage() {
  const [tab, setTab] = useState("restaurant");
  const [saved, setSaved] = useState(false);

  const [form, setForm] = useState({
    name: RESTAURANT.name,
    tagline: RESTAURANT.tagline,
    address: RESTAURANT.address,
    phone: RESTAURANT.phone,
    email: RESTAURANT.email,
    website: RESTAURANT.website,
    taxRate: "5",
    currency: "৳",
    openTime: "10:00",
    closeTime: "23:00",
  });

  const [payments, setPayments] = useState<Record<string, boolean>>({
    cash: true, card: true, bkash: true, nagad: true, rocket: false, split: true,
  });

  const [notifs, setNotifs] = useState<Record<string, boolean>>({
    newOrder: true, orderReady: true, lowStock: true, paymentReceived: false,
    sms: false, email: true, push: true,
  });

  const handleSave = async () => {
    setSaved(true);
    await new Promise((r) => setTimeout(r, 1500));
    setSaved(false);
  };

  // ── SAVE BUTTON ──
  const SaveBtn = () => (
    <button onClick={handleSave} className="btn-primary"
      style={{ marginTop: 24, display: "flex", alignItems: "center", gap: 10, padding: "12px 28px" }}>
      {saved ? <><CheckCircle2 size={18} /> Saved!</> : <><Save size={18} /> Save Changes</>}
    </button>
  );

  return (
    <div style={{ padding: "32px", display: "flex", gap: 24 }} className="animate-fade-in">

      {/* ── Left nav ── */}
      <div style={{ width: 230, flexShrink: 0 }}>
        <div className="card" style={{ padding: 8, position: "sticky", top: 24 }}>
          <p style={{ fontSize: 10, fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.8px", padding: "10px 12px 6px" }}>
            Settings
          </p>
          {NAV.map((item) => (
            <button key={item.id} onClick={() => setTab(item.id)}
              style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "8px 12px", borderRadius: 12, border: "none", cursor: "pointer", marginBottom: 4, transition: "all 0.2s",
                background: tab === item.id ? "var(--primary-50)" : "transparent",
                color: tab === item.id ? "var(--primary)" : "var(--text-muted)",
              }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <PremiumIcon icon={item.icon} color={item.iconSet.c1} color2={item.iconSet.c2} size={15} boxSize={34} radius={8} glow={false} />
                <span style={{ fontSize: 13, fontWeight: tab === item.id ? 700 : 600 }}>{item.label}</span>
              </div>
              <ChevronRight size={14} opacity={tab === item.id ? 1 : 0.3} />
            </button>
          ))}
        </div>
      </div>

      {/* ── Content ── */}
      <div style={{ flex: 1 }}>

        {/* Restaurant Info */}
        {tab === "restaurant" && (
          <div className="card" style={{ padding: 32 }}>
            <h2 style={{ fontFamily: "Poppins,sans-serif", fontSize: 20, fontWeight: 700, marginBottom: 6, color: "var(--text)" }}>Restaurant Information</h2>
            <p style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 28 }}>Basic details about your restaurant</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
              {([
                { label: "Restaurant Name", field: "name" as const, placeholder: "Rizqara Kitchen" },
                { label: "Tagline", field: "tagline" as const, placeholder: "Fine Dining & Fast Service" },
                { label: "Phone Number", field: "phone" as const, placeholder: "+880 1700-000000" },
                { label: "Email Address", field: "email" as const, placeholder: "info@rizqara.com" },
                { label: "Website", field: "website" as const, placeholder: "www.rizqara.com" },
                { label: "Currency Symbol", field: "currency" as const, placeholder: "৳" },
              ]).map(({ label, field, placeholder }) => (
                <div key={field}>
                  <label style={{ fontSize: 12, fontWeight: 700, display: "block", marginBottom: 6, color: "var(--text)" }}>{label}</label>
                  <input className="form-input" value={form[field]} placeholder={placeholder}
                    onChange={(e) => setForm((p) => ({ ...p, [field]: e.target.value }))} />
                </div>
              ))}
            </div>
            <div style={{ marginTop: 18 }}>
              <label style={{ fontSize: 12, fontWeight: 700, display: "block", marginBottom: 6, color: "var(--text)" }}>Address</label>
              <textarea className="form-input" rows={2} value={form.address}
                onChange={(e) => setForm((p) => ({ ...p, address: e.target.value }))} style={{ resize: "vertical" }} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 18, marginTop: 18 }}>
              {([
                { label: "Opening Time", field: "openTime" as const, type: "time" },
                { label: "Closing Time", field: "closeTime" as const, type: "time" },
                { label: "Tax Rate (%)", field: "taxRate" as const, type: "number" },
              ]).map(({ label, field, type }) => (
                <div key={field}>
                  <label style={{ fontSize: 12, fontWeight: 700, display: "block", marginBottom: 6, color: "var(--text)" }}>{label}</label>
                  <input className="form-input" type={type} value={form[field]}
                    onChange={(e) => setForm((p) => ({ ...p, [field]: e.target.value }))} />
                </div>
              ))}
            </div>
            <SaveBtn />
          </div>
        )}

        {/* Payment Methods */}
        {tab === "payment" && (
          <div className="card" style={{ padding: 32 }}>
            <h2 style={{ fontFamily: "Poppins,sans-serif", fontSize: 20, fontWeight: 700, marginBottom: 6, color: "var(--text)" }}>Payment Methods</h2>
            <p style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 28 }}>Enable or disable payment options for your POS</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {PAYMENT_OPTS.map((method) => {
                const active = payments[method.id] ?? false;
                return (
                  <div key={method.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center",
                    padding: "16px 20px", border: "1.5px solid", borderRadius: 14, transition: "all 0.2s",
                    borderColor: active ? "var(--primary)" : "var(--border)",
                    background: active ? "var(--primary-50)" : "white",
                    boxShadow: active ? "0 4px 12px rgba(139,0,0,0.05)" : "none",
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                      <PremiumIcon icon={method.icon} color={method.iconSet.c1} color2={method.iconSet.c2} size={20} boxSize={46} radius={12} glow={false} />
                      <div>
                        <div style={{ fontWeight: 700, fontSize: 14, color: "var(--text)" }}>{method.label}</div>
                        <div style={{ fontSize: 12, color: "var(--text-muted)" }}>{method.desc}</div>
                      </div>
                    </div>
                    {/* Toggle switch */}
                    <label style={{ position: "relative", cursor: "pointer", width: 48, height: 26, flexShrink: 0 }}>
                      <input type="checkbox" checked={active}
                        onChange={(e) => setPayments((p) => ({ ...p, [method.id]: e.target.checked }))}
                        style={{ opacity: 0, width: 0, height: 0, position: "absolute" }} />
                      <div style={{ width: 48, height: 26, borderRadius: 99, background: active ? "var(--primary)" : "#CBD5E1", position: "relative", transition: "background 0.2s" }}>
                        <div style={{ position: "absolute", top: 3, left: active ? 25 : 3, width: 20, height: 20,
                          background: "white", borderRadius: "50%", transition: "left 0.2s",
                          boxShadow: "0 1px 4px rgba(0,0,0,0.2)" }} />
                      </div>
                    </label>
                  </div>
                );
              })}
            </div>
            <SaveBtn />
          </div>
        )}

        {/* Printer */}
        {tab === "printer" && (
          <div className="card" style={{ padding: 32 }}>
            <h2 style={{ fontFamily: "Poppins,sans-serif", fontSize: 20, fontWeight: 700, marginBottom: 6, color: "var(--text)" }}>Printer Configuration</h2>
            <p style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 28 }}>Configure receipt and kitchen printers</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {PRINTER_LIST.map((printer) => (
                <div key={printer.title} style={{ display: "flex", justifyContent: "space-between", alignItems: "center",
                  padding: "20px 24px", border: "1.5px solid var(--border)", borderRadius: 16, transition: "all 0.2s" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                    <PremiumIcon icon={printer.icon} color={ICON_COLORS.staff.c1} color2={ICON_COLORS.staff.c2} size={24} boxSize={52} radius={14} glow={false} />
                    <div>
                      <div style={{ fontWeight: 800, fontSize: 15, color: "var(--text)" }}>{printer.title}</div>
                      <div style={{ fontSize: 12, color: "var(--text-muted)" }}>{printer.desc} · Port: {printer.port}</div>
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <span className={`badge ${printer.status === "Connected" ? "badge-success" : "badge-danger"}`}>
                      {printer.status}
                    </span>
                    <button style={{ background: "var(--primary-50)", color: "var(--primary)", border: "1.5px solid var(--primary-200)",
                      borderRadius: 8, padding: "7px 14px", cursor: "pointer", fontSize: 12, fontWeight: 600 }}>
                      Test Print
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Notifications */}
        {tab === "notifications" && (
          <div className="card" style={{ padding: 32 }}>
            <h2 style={{ fontFamily: "Poppins,sans-serif", fontSize: 20, fontWeight: 700, marginBottom: 6, color: "var(--text)" }}>Notification Settings</h2>
            <p style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 28 }}>Configure when and how you receive alerts</p>

            <h3 style={{ fontSize: 13, fontWeight: 700, marginBottom: 12, color: "var(--text)" }}>Event Triggers</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 28 }}>
              {[
                { id: "newOrder", label: "New Order", desc: "Alert when a new order is placed" },
                { id: "orderReady", label: "Order Ready", desc: "Alert when kitchen marks order done" },
                { id: "lowStock", label: "Low Stock", desc: "Alert when item runs below minimum" },
                { id: "paymentReceived", label: "Payment Received", desc: "Alert on successful payment" },
              ].map((item) => (
                <div key={item.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center",
                  padding: "14px 18px", background: "var(--surface)", borderRadius: 12 }}>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 14, color: "var(--text)" }}>{item.label}</div>
                    <div style={{ fontSize: 12, color: "var(--text-muted)" }}>{item.desc}</div>
                  </div>
                  <input type="checkbox" checked={notifs[item.id] ?? false}
                    onChange={(e) => setNotifs((p) => ({ ...p, [item.id]: e.target.checked }))}
                    style={{ width: 18, height: 18, accentColor: "var(--primary)" }} />
                </div>
              ))}
            </div>

            <h3 style={{ fontSize: 13, fontWeight: 700, marginBottom: 12, color: "var(--text)" }}>Delivery Channels</h3>
            <div style={{ display: "flex", gap: 12 }}>
              {NOTIF_CHANNELS.map((ch) => {
                const active = notifs[ch.id] ?? false;
                return (
                  <label key={ch.id} style={{ flex: 1, padding: "18px 12px", border: "1.5px solid", borderRadius: 14,
                    cursor: "pointer", textAlign: "center", transition: "all 0.15s",
                    borderColor: active ? "var(--primary)" : "var(--border)",
                    background: active ? "var(--primary-50)" : "white",
                  }}>
                    <input type="checkbox" checked={active}
                      onChange={(e) => setNotifs((p) => ({ ...p, [ch.id]: e.target.checked }))}
                      style={{ display: "none" }} />
                    <div style={{ display: "flex", justifyContent: "center", marginBottom: 8 }}>
                      <PremiumIcon icon={ch.icon} color={active ? ICON_COLORS.revenue.c1 : "#94A3B8"} color2={active ? ICON_COLORS.revenue.c2 : "#CBD5E1"} size={20} boxSize={44} radius={12} glow={active} />
                    </div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: active ? "var(--primary)" : "var(--text-muted)" }}>
                      {ch.label}
                    </div>
                  </label>
                );
              })}
            </div>
            <SaveBtn />
          </div>
        )}

        {/* Backup */}
        {tab === "backup" && (
          <div className="card" style={{ padding: 32 }}>
            <h2 style={{ fontFamily: "Poppins,sans-serif", fontSize: 20, fontWeight: 700, marginBottom: 6, color: "var(--text)" }}>Backup & Restore</h2>
            <p style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 28 }}>Protect your data with regular backups</p>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 24 }}>
              {BACKUP_CARDS.map((card) => (
                <div key={card.title} style={{ padding: "22px", border: "1.5px solid var(--border)", borderRadius: 16, transition: "all 0.2s" }}>
                  <div style={{ marginBottom: 14 }}>
                    <PremiumIcon icon={card.icon} color={card.iconSet.c1} color2={card.iconSet.c2} size={22} boxSize={48} radius={12} glow={false} />
                  </div>
                  <div style={{ fontWeight: 800, fontSize: 15, marginBottom: 6, color: "var(--text)" }}>{card.title}</div>
                  <div style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 16 }}>{card.desc}</div>
                  <button style={{ background: "var(--primary)", color: "white", border: "none", borderRadius: 10,
                    padding: "9px 18px", cursor: "pointer", fontWeight: 700, fontSize: 13, width: "100%" }}
                    onClick={() => alert(`${card.action} triggered!`)}>
                    {card.action}
                  </button>
                </div>
              ))}
            </div>

            <div style={{ padding: "16px 20px", background: "var(--primary-50)", border: "1px solid var(--primary-200)",
              borderRadius: 12, display: "flex", alignItems: "center", gap: 14 }}>
              <div style={{ width: 40, height: 40, background: "#DCFCE7", borderRadius: 10,
                display: "flex", alignItems: "center", justifyContent: "center" }}>
                <CheckCircle2 size={22} color="#16A34A" />
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 14, color: "var(--primary)" }}>Last Backup: Today at 00:00 AM</div>
                <div style={{ fontSize: 12, color: "var(--text-muted)" }}>Next: Tomorrow at 00:00 AM &nbsp;·&nbsp; Cloud sync: Active</div>
              </div>
            </div>
          </div>
        )}

        {/* Tax */}
        {tab === "tax" && (
          <div className="card" style={{ padding: 32 }}>
            <h2 style={{ fontFamily: "Poppins,sans-serif", fontSize: 20, fontWeight: 700, marginBottom: 6, color: "var(--text)" }}>Tax & Billing Configuration</h2>
            <p style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 32 }}>Configure tax rates and billing options</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              {[
                { label: "Default Tax Rate (%)", value: "5", type: "number" },
                { label: "Service Charge (%)", value: "0", type: "number" },
                { label: "Invoice Prefix", value: "ORD-", type: "text" },
              ].map((field) => (
                <div key={field.label}>
                  <label style={{ fontSize: 12, fontWeight: 700, display: "block", marginBottom: 6, color: "var(--text)" }}>{field.label}</label>
                  <input className="form-input" type={field.type} defaultValue={field.value} style={{ maxWidth: 300 }} />
                </div>
              ))}
              <div>
                <label style={{ fontSize: 12, fontWeight: 700, display: "block", marginBottom: 8, color: "var(--text)" }}>Tax Display Mode</label>
                <div style={{ display: "flex", gap: 12 }}>
                  {["Inclusive", "Exclusive"].map((opt) => (
                    <label key={opt} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, cursor: "pointer" }}>
                      <input type="radio" name="tax-display" defaultChecked={opt === "Exclusive"} style={{ accentColor: "var(--primary)" }} />
                      {opt}
                    </label>
                  ))}
                </div>
              </div>
            </div>
            <SaveBtn />
          </div>
        )}

        {/* Security */}
        {tab === "security" && (
          <div className="card" style={{ padding: 32 }}>
            <h2 style={{ fontFamily: "Poppins,sans-serif", fontSize: 20, fontWeight: 700, marginBottom: 6, color: "var(--text)" }}>Security Settings</h2>
            <p style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 32 }}>Manage access control and permissions</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {[
                { label: "Two-Factor Authentication", desc: "Adds extra security to all accounts", enabled: false },
                { label: "Activity Logging", desc: "Log all user actions in the system", enabled: true },
                { label: "Session Timeout", desc: "Auto-logout after 30 minutes of inactivity", enabled: true },
                { label: "IP Whitelisting", desc: "Restrict access to specific IP addresses", enabled: false },
              ].map((item) => (
                <div key={item.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center",
                  padding: "16px 20px", border: "1.5px solid var(--border)", borderRadius: 12 }}>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 14, color: "var(--text)" }}>{item.label}</div>
                    <div style={{ fontSize: 12, color: "var(--text-muted)" }}>{item.desc}</div>
                  </div>
                  <span className={`badge ${item.enabled ? "badge-success" : "badge-warning"}`}>
                    {item.enabled ? "Enabled" : "Disabled"}
                  </span>
                </div>
              ))}
            </div>
            <SaveBtn />
          </div>
        )}

      </div>
    </div>
  );
}
