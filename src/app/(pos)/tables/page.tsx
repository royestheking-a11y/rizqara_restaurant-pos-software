"use client";
import { useState } from "react";
import { TABLES } from "@/lib/mock-data";
import {
  Users, ClipboardList, Brush, Coffee,
  CheckCircle2, Circle, ArrowLeftRight, GitMerge,
  Scissors, Plus, ArrowRight
} from "lucide-react";
import PremiumIcon, { ICON_COLORS } from "@/components/PremiumIcon";

type TableStatus = "available" | "occupied" | "reserved" | "cleaning";

const STATUS_CONFIG: Record<
  TableStatus,
  { label: string; color: string; bg: string; border: string; icon: any; dotColor: string; iconSet: any }
> = {
  available: {
    label: "Available",
    color: "#16A34A",
    bg: "#F0FDF4",
    border: "#86EFAC",
    icon: CheckCircle2,
    dotColor: "#16A34A",
    iconSet: ICON_COLORS.success,
  },
  occupied: {
    label: "Occupied",
    color: "#DC2626",
    bg: "#FEF2F2",
    border: "#FCA5A5",
    icon: Users,
    dotColor: "#DC2626",
    iconSet: ICON_COLORS.danger,
  },
  reserved: {
    label: "Reserved",
    color: "#CA8A04",
    bg: "#FEFCE8",
    border: "#FDE047",
    icon: ClipboardList,
    dotColor: "#CA8A04",
    iconSet: ICON_COLORS.warning,
  },
  cleaning: {
    label: "Cleaning",
    color: "#2563EB",
    bg: "#EFF6FF",
    border: "#93C5FD",
    icon: Brush,
    dotColor: "#2563EB",
    iconSet: ICON_COLORS.orders,
  },
};

type TableData = (typeof TABLES)[0] & { status: TableStatus };

export default function TablesPage() {
  const [tables, setTables] = useState<TableData[]>(
    TABLES.map((t) => ({ ...t, status: t.status as TableStatus }))
  );
  const [selected, setSelected] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState<TableStatus | "all">("all");

  const selectedTable = tables.find((t) => t.id === selected);

  const updateStatus = (id: string, status: TableStatus) => {
    setTables((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status } : t))
    );
    setShowModal(false);
    setSelected(null);
  };

  const filteredTables =
    filterStatus === "all"
      ? tables
      : tables.filter((t) => t.status === filterStatus);

  const counts = {
    available: tables.filter((t) => t.status === "available").length,
    occupied: tables.filter((t) => t.status === "occupied").length,
    reserved: tables.filter((t) => t.status === "reserved").length,
    cleaning: tables.filter((t) => t.status === "cleaning").length,
  };

  return (
    <div style={{ padding: "32px" }} className="animate-fade-in">
      {/* ── Header ── */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: 28,
        }}
      >
        <div>
          <h1
            style={{
              fontFamily: "Poppins,sans-serif",
              fontSize: 28,
              fontWeight: 700,
              color: "var(--text)",
            }}
          >
            Table Management
          </h1>
          <p
            style={{
              color: "var(--text-muted)",
              marginTop: 4,
              fontSize: 14,
            }}
          >
            {tables.length} tables total &mdash; click any table to manage
          </p>
        </div>
        <button
          className="btn-primary"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            fontSize: 14,
          }}
        >
          <Plus size={16} /> Add Table
        </button>
      </div>

      {/* ── Status summary cards ── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 16,
          marginBottom: 28,
        }}
      >
        {(
          Object.entries(STATUS_CONFIG) as [
            TableStatus,
            (typeof STATUS_CONFIG)[TableStatus]
          ][]
        ).map(([status, cfg]) => {
          const active = filterStatus === status;
          return (
            <div
              key={status}
              className="card"
              onClick={() =>
                setFilterStatus(filterStatus === status ? "all" : status)
              }
              style={{
                padding: "16px 20px",
                display: "flex",
                alignItems: "center",
                gap: 16,
                cursor: "pointer",
                border: `2px solid ${
                  active ? cfg.color : "var(--border)"
                }`,
                background: active ? cfg.bg : "white",
                transition: "all 0.15s",
                boxShadow: active ? `0 4px 12px ${cfg.color}15` : "none",
              }}
            >
              <PremiumIcon icon={cfg.icon} color={cfg.iconSet.c1} color2={cfg.iconSet.c2} size={20} boxSize={48} radius={12} glow={active} />
              <div>
                <div
                  style={{
                    fontSize: 24,
                    fontWeight: 800,
                    color: cfg.color,
                    fontFamily: "Poppins,sans-serif",
                    lineHeight: 1,
                  }}
                >
                  {counts[status]}
                </div>
                <div
                  style={{
                    fontSize: 12,
                    color: "var(--text-muted)",
                    fontWeight: 600,
                    marginTop: 4,
                  }}
                >
                  {cfg.label}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Floor Plan ── */}
      <div className="card" style={{ padding: 28 }}>
        {/* Card header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 24,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <PremiumIcon icon={Coffee} color={ICON_COLORS.menu.c1} color2={ICON_COLORS.menu.c2} size={18} boxSize={40} radius={10} />
            <div>
              <h3
                style={{
                  fontSize: 15,
                  fontWeight: 700,
                  color: "var(--text)",
                  lineHeight: 1,
                }}
              >
                Restaurant Floor Plan
              </h3>
              <p
                style={{
                  fontSize: 12,
                  color: "var(--text-muted)",
                  marginTop: 2,
                }}
              >
                {filteredTables.length} table
                {filteredTables.length !== 1 ? "s" : ""} shown
              </p>
            </div>
          </div>

          {/* Legend */}
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            {Object.entries(STATUS_CONFIG).map(([s, c]) => (
              <div
                key={s}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  fontSize: 12,
                  color: "var(--text-muted)",
                  fontWeight: 500,
                }}
              >
                <div
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    background: c.dotColor,
                  }}
                />
                {c.label}
              </div>
            ))}
          </div>
        </div>

        {/* Floor plan container */}
        <div
          style={{
            background: "#FAFAFA",
            border: "2px solid var(--border)",
            borderRadius: 16,
            padding: 24,
            position: "relative",
          }}
        >
          {/* Zone labels */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 20,
              paddingBottom: 14,
              borderBottom: "2px dashed var(--border)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                background: "#16A34A",
                color: "white",
                borderRadius: 8,
                padding: "6px 14px",
                fontSize: 12,
                fontWeight: 700,
              }}
            >
              <ArrowRight size={14} />
              Entrance
            </div>
            <div
              style={{
                fontSize: 12,
                fontWeight: 700,
                color: "var(--text-muted)",
                letterSpacing: "1px",
                textTransform: "uppercase",
              }}
            >
              Main Dining Hall
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                background: "var(--primary)",
                color: "white",
                borderRadius: 8,
                padding: "6px 14px",
                fontSize: 12,
                fontWeight: 700,
              }}
            >
              Kitchen
              <ArrowRight size={14} />
            </div>
          </div>

          {/* Tables grid — 3 zones / rows */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {/* Row 1 — Window zone */}
            <div>
              <p
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: "var(--text-muted)",
                  textTransform: "uppercase",
                  letterSpacing: "0.6px",
                  marginBottom: 12,
                }}
              >
                Window Zone
              </p>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "repeat(auto-fill, minmax(130px, 1fr))",
                  gap: 12,
                }}
              >
                {filteredTables
                  .filter((t) => t.number <= 3 || t.number === 10)
                  .map((table) => (
                    <TableCard
                      key={table.id}
                      table={table}
                      onSelect={() => {
                        setSelected(table.id);
                        setShowModal(true);
                      }}
                    />
                  ))}
              </div>
            </div>

            {/* Separator */}
            <div
              style={{
                borderTop: "1.5px dashed var(--border)",
                marginTop: 4,
              }}
            />

            {/* Row 2 — Center zone */}
            <div>
              <p
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: "var(--text-muted)",
                  textTransform: "uppercase",
                  letterSpacing: "0.6px",
                  marginBottom: 12,
                }}
              >
                Center Zone
              </p>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "repeat(auto-fill, minmax(130px, 1fr))",
                  gap: 12,
                }}
              >
                {filteredTables
                  .filter((t) => t.number >= 4 && t.number <= 6)
                  .map((table) => (
                    <TableCard
                      key={table.id}
                      table={table}
                      onSelect={() => {
                        setSelected(table.id);
                        setShowModal(true);
                      }}
                    />
                  ))}
              </div>
            </div>

            {/* Separator */}
            <div style={{ borderTop: "1.5px dashed var(--border)" }} />

            {/* Row 3 — Back zone */}
            <div>
              <p
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: "var(--text-muted)",
                  textTransform: "uppercase",
                  letterSpacing: "0.6px",
                  marginBottom: 12,
                }}
              >
                Back Zone
              </p>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "repeat(auto-fill, minmax(130px, 1fr))",
                  gap: 12,
                }}
              >
                {filteredTables
                  .filter((t) => t.number >= 7 && t.number <= 9)
                  .map((table) => (
                    <TableCard
                      key={table.id}
                      table={table}
                      onSelect={() => {
                        setSelected(table.id);
                        setShowModal(true);
                      }}
                    />
                  ))}
              </div>
            </div>
          </div>

          {/* Exit label */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: 20,
              paddingTop: 14,
              borderTop: "2px dashed var(--border)",
            }}
          >
            <div
              style={{
                background: "#2563EB",
                color: "white",
                borderRadius: 8,
                padding: "6px 14px",
                fontSize: 12,
                fontWeight: 700,
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              Exit / Restrooms
            </div>
          </div>
        </div>
      </div>

      {/* ── Table Action Modal ── */}
      {showModal && selectedTable && (
        <div
          className="modal-overlay"
          onClick={() => {
            setShowModal(false);
            setSelected(null);
          }}
        >
          <div
            className="modal-box"
            style={{ maxWidth: 440 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal header */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                marginBottom: 20,
              }}
            >
              <div>
                <h2
                  style={{
                    fontFamily: "Poppins,sans-serif",
                    fontSize: 22,
                    fontWeight: 700,
                    color: "var(--text)",
                  }}
                >
                  Table {selectedTable.number}
                </h2>
                <p
                  style={{
                    fontSize: 13,
                    color: "var(--text-muted)",
                    marginTop: 4,
                  }}
                >
                  Capacity: <strong>{selectedTable.capacity} seats</strong>{" "}
                  &nbsp;&middot;&nbsp; Current:{" "}
                  <strong
                    style={{
                      color:
                        STATUS_CONFIG[selectedTable.status].color,
                    }}
                  >
                    {STATUS_CONFIG[selectedTable.status].label}
                  </strong>
                </p>
              </div>
              <button
                onClick={() => {
                  setShowModal(false);
                  setSelected(null);
                }}
                style={{
                  background: "#F5F5F5",
                  border: "none",
                  borderRadius: 8,
                  width: 32,
                  height: 32,
                  cursor: "pointer",
                  fontSize: 16,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--text-muted)",
                }}
              >
                ✕
              </button>
            </div>

            {/* Status change */}
            <p
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: "var(--text-muted)",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
                marginBottom: 12,
              }}
            >
              Change Status
            </p>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 10,
                marginBottom: 20,
              }}
            >
              {(
                Object.entries(STATUS_CONFIG) as [
                  TableStatus,
                  (typeof STATUS_CONFIG)[TableStatus]
                ][]
              ).map(([s, cfg]) => {
                const Icon = cfg.icon;
                const isCurrent = selectedTable.status === s;
                return (
                  <button
                    key={s}
                    onClick={() => updateStatus(selectedTable.id, s)}
                    style={{
                      padding: "14px 16px",
                      border: "2px solid",
                      borderRadius: 12,
                      cursor: "pointer",
                      fontWeight: 700,
                      fontSize: 13,
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      transition: "all 0.15s",
                      borderColor: isCurrent ? cfg.color : "var(--border)",
                      background: isCurrent ? cfg.bg : "white",
                      color: cfg.color,
                    }}
                  >
                    <Icon size={16} strokeWidth={2} />
                    {cfg.label}
                  </button>
                );
              })}
            </div>

            {/* Quick actions */}
            <p
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: "var(--text-muted)",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
                marginBottom: 12,
              }}
            >
              Quick Actions
            </p>
            <div
              style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 20 }}
            >
              {[
                { icon: ClipboardList, label: "Open Order", href: "/pos", primary: true },
                { icon: GitMerge, label: "Merge", href: "#", primary: false },
                { icon: Scissors, label: "Split", href: "#", primary: false },
                { icon: ArrowLeftRight, label: "Transfer", href: "#", primary: false },
              ].map((action) => (
                <a
                  key={action.label}
                  href={action.href}
                  style={{
                    padding: "10px 8px",
                    borderRadius: 10,
                    border: "1.5px solid",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 6,
                    textDecoration: "none",
                    fontSize: 11,
                    fontWeight: 700,
                    transition: "all 0.15s",
                    borderColor: action.primary
                      ? "var(--primary)"
                      : "var(--border)",
                    background: action.primary ? "var(--primary)" : "white",
                    color: action.primary ? "white" : "var(--text-muted)",
                    cursor: "pointer",
                  }}
                >
                  <action.icon size={16} strokeWidth={2} />
                  {action.label}
                </a>
              ))}
            </div>

            <button
              onClick={() => {
                setShowModal(false);
                setSelected(null);
              }}
              className="btn-outline"
              style={{ width: "100%" }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ── Table Card sub-component ── */
function TableCard({
  table,
  onSelect,
}: {
  table: TableData;
  onSelect: () => void;
}) {
  const cfg = STATUS_CONFIG[table.status];
  const Icon = cfg.icon;

  return (
    <div
      onClick={onSelect}
      style={{
        background: cfg.bg,
        border: `2.5px solid ${cfg.border}`,
        borderRadius: 16,
        padding: "18px 12px",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 8,
        transition: "all 0.2s",
        position: "relative",
        boxShadow: `0 2px 12px ${cfg.color}18`,
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)";
        (e.currentTarget as HTMLElement).style.boxShadow = `0 8px 24px ${cfg.color}30`;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
        (e.currentTarget as HTMLElement).style.boxShadow = `0 2px 12px ${cfg.color}18`;
      }}
    >
      {/* Status dot */}
      <div
        style={{
          position: "absolute",
          top: 10,
          right: 10,
          width: 8,
          height: 8,
          borderRadius: "50%",
          background: cfg.dotColor,
        }}
      />

      {/* Status icon */}
      <div
        style={{
          width: 40,
          height: 40,
          borderRadius: 12,
          background: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: `0 2px 8px ${cfg.color}20`,
        }}
      >
        <Icon size={20} color={cfg.color} strokeWidth={2} />
      </div>

      {/* Table number */}
      <div
        style={{
          fontFamily: "Poppins,sans-serif",
          fontWeight: 800,
          fontSize: 20,
          color: cfg.color,
          lineHeight: 1,
        }}
      >
        T{table.number}
      </div>

      {/* Capacity */}
      <div
        style={{
          fontSize: 11,
          color: cfg.color,
          opacity: 0.75,
          fontWeight: 600,
          display: "flex",
          alignItems: "center",
          gap: 4,
        }}
      >
        <Users size={11} />
        {table.capacity} seats
      </div>

      {/* Status label */}
      <div
        style={{
          fontSize: 10,
          fontWeight: 700,
          color: cfg.color,
          background: "white",
          padding: "2px 8px",
          borderRadius: 99,
          letterSpacing: "0.3px",
          textTransform: "uppercase",
        }}
      >
        {cfg.label}
      </div>
    </div>
  );
}
