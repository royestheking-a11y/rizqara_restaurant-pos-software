import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  qty: number;
  notes?: string;
  image?: string;
}

interface CartStore {
  items: CartItem[];
  orderType: "dine-in" | "takeaway" | "delivery";
  tableId: string | null;
  discount: number;
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  setOrderType: (type: "dine-in" | "takeaway" | "delivery") => void;
  setTable: (id: string | null) => void;
  setDiscount: (amount: number) => void;
  clearCart: () => void;
  getSubtotal: () => number;
  getTax: () => number;
  getTotal: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
  orderType: "dine-in",
  tableId: null,
  discount: 0,

  addItem: (item) =>
    set((state) => {
      const existing = state.items.find((i) => i.id === item.id);
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.id === item.id ? { ...i, qty: i.qty + 1 } : i
          ),
        };
      }
      return { items: [...state.items, { ...item, qty: 1 }] };
    }),

  removeItem: (id) =>
    set((state) => ({ items: state.items.filter((i) => i.id !== id) })),

  updateQty: (id, qty) =>
    set((state) => ({
      items:
        qty <= 0
          ? state.items.filter((i) => i.id !== id)
          : state.items.map((i) => (i.id === id ? { ...i, qty } : i)),
    })),

  setOrderType: (type) => set({ orderType: type }),
  setTable: (id) => set({ tableId: id }),
  setDiscount: (amount) => set({ discount: amount }),
  clearCart: () => set({ items: [], discount: 0, tableId: null }),

  getSubtotal: () => {
    const { items } = get();
    return items.reduce((sum, i) => sum + i.price * i.qty, 0);
  },

  getTax: () => {
    const subtotal = get().getSubtotal();
    return Math.round(subtotal * 0.05);
  },

  getTotal: () => {
    const { discount } = get();
    const subtotal = get().getSubtotal();
    const tax = get().getTax();
      return Math.max(0, subtotal + tax - discount);
    },
  }),
  {
    name: 'rizqara-cart-storage',
    storage: createJSONStorage(() => localStorage),
  }
));

// ─── Kitchen Store ───────────────────────────────────────
export type KitchenStatus = "new" | "cooking" | "ready" | "served";

export interface KitchenOrder {
  id: string;
  tableNum: number | null;
  type: string;
  items: { name: string; qty: number; notes?: string }[];
  status: KitchenStatus;
  createdAt: string;
}

interface KitchenStore {
  orders: KitchenOrder[];
  updateStatus: (id: string, status: KitchenStatus) => void;
}

export const useKitchenStore = create<KitchenStore>()(
  persist(
    (set) => ({
      orders: [
    {
      id: "ORD-002",
      tableNum: 6,
      type: "dine-in",
      items: [
        { name: "Cheese Pizza (M)", qty: 1 },
        { name: "French Fries", qty: 2 },
        { name: "Mango Lassi", qty: 2 },
      ],
      status: "cooking",
      createdAt: new Date(Date.now() - 8 * 60000).toISOString(),
    },
    {
      id: "ORD-005",
      tableNum: 8,
      type: "dine-in",
      items: [
        { name: "Chicken Pizza (L)", qty: 1 },
        { name: "Chocolate Cake", qty: 2 },
        { name: "Fresh Lime Soda", qty: 3, notes: "Extra ice" },
      ],
      status: "new",
      createdAt: new Date(Date.now() - 3 * 60000).toISOString(),
    },
    {
      id: "ORD-003",
      tableNum: null,
      type: "delivery",
      items: [
        { name: "Kacchi Biryani", qty: 2 },
        { name: "Cold Coffee", qty: 2 },
      ],
      status: "ready",
      createdAt: new Date(Date.now() - 22 * 60000).toISOString(),
    },
    {
      id: "ORD-004",
      tableNum: null,
      type: "takeaway",
      items: [
        { name: "Crispy Chicken Burger", qty: 1 },
        { name: "French Fries", qty: 1 },
      ],
      status: "new",
      createdAt: new Date(Date.now() - 1 * 60000).toISOString(),
    },
  ],
  updateStatus: (id, status) =>
    set((state) => ({
      orders: state.orders.map((o) => (o.id === id ? { ...o, status } : o)),
    })),
  }),
  {
    name: 'rizqara-kitchen-storage',
    storage: createJSONStorage(() => localStorage),
  }
));
