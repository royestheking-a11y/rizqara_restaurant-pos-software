import React, { forwardRef } from "react";
import { RESTAURANT } from "@/lib/mock-data";
import { CartItem } from "@/lib/store";

interface ReceiptProps {
  items: CartItem[];
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
  orderType: string;
  tableId: string | null;
  paymentMethod: string;
}

export const ReceiptPrint = forwardRef<HTMLDivElement, ReceiptProps>(
  ({ items, subtotal, tax, discount, total, orderType, tableId, paymentMethod }, ref) => {
    const currency = RESTAURANT.currency;
    const date = new Date().toLocaleString("en-BD", {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });

    return (
      <div ref={ref} style={{ padding: "10mm", width: "80mm", margin: "0 auto", background: "white", color: "black", fontFamily: "monospace" }}>
        <style type="text/css" media="print">
          {`
            @page { size: auto; margin: 0mm; }
            body { margin: 0; padding: 0; background: white; }
          `}
        </style>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "4mm" }}>
          <h1 style={{ margin: 0, fontSize: "16pt", fontWeight: "bold", textTransform: "uppercase" }}>{RESTAURANT.name}</h1>
          <p style={{ margin: "1mm 0", fontSize: "10pt" }}>{RESTAURANT.address}</p>
          <p style={{ margin: "1mm 0", fontSize: "10pt" }}>Tel: {RESTAURANT.phone}</p>
        </div>

        <div style={{ borderBottom: "1px dashed black", marginBottom: "4mm" }} />

        {/* Order Details */}
        <div style={{ fontSize: "10pt", marginBottom: "4mm", lineHeight: "1.4" }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span>Date: {date}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span>Type: {orderType}</span>
            {tableId && <span>Table: {tableId.replace("t", "")}</span>}
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span>Payment: {paymentMethod.toUpperCase()}</span>
          </div>
        </div>

        <div style={{ borderBottom: "1px dashed black", marginBottom: "4mm" }} />

        {/* Items */}
        <table style={{ width: "100%", fontSize: "10pt", textAlign: "left", marginBottom: "4mm", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ paddingBottom: "2mm", width: "60%" }}>Item</th>
              <th style={{ paddingBottom: "2mm", width: "15%", textAlign: "center" }}>Qty</th>
              <th style={{ paddingBottom: "2mm", width: "25%", textAlign: "right" }}>Amt</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, idx) => (
              <tr key={idx}>
                <td style={{ paddingBottom: "1.5mm", verticalAlign: "top" }}>{item.name}</td>
                <td style={{ paddingBottom: "1.5mm", textAlign: "center", verticalAlign: "top" }}>{item.qty}</td>
                <td style={{ paddingBottom: "1.5mm", textAlign: "right", verticalAlign: "top" }}>{(item.price * item.qty).toFixed(0)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div style={{ borderBottom: "1px dashed black", marginBottom: "4mm" }} />

        {/* Summary */}
        <div style={{ fontSize: "10pt", lineHeight: "1.4" }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span>Subtotal</span>
            <span>{currency}{subtotal.toFixed(0)}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span>Tax (5%)</span>
            <span>{currency}{tax.toFixed(0)}</span>
          </div>
          {discount > 0 && (
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span>Discount</span>
              <span>-{currency}{discount.toFixed(0)}</span>
            </div>
          )}
          
          <div style={{ borderBottom: "1px dashed black", margin: "2mm 0" }} />
          
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12pt", fontWeight: "bold" }}>
            <span>Total</span>
            <span>{currency}{total.toFixed(0)}</span>
          </div>
        </div>

        <div style={{ borderBottom: "1px dashed black", margin: "4mm 0" }} />

        {/* Footer */}
        <div style={{ textAlign: "center", fontSize: "9pt", marginTop: "4mm" }}>
          <p style={{ margin: "1mm 0" }}>Thank you for visiting!</p>
          <p style={{ margin: "1mm 0" }}>{RESTAURANT.website}</p>
        </div>
      </div>
    );
  }
);
ReceiptPrint.displayName = "ReceiptPrint";
