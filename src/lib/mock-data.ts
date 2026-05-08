// =========================================================
// Rizqara POS — Mock Data
// =========================================================

export const RESTAURANT = {
  name: "Rizqara Kitchen",
  tagline: "Fine Dining & Fast Service",
  address: "42 Gulshan Avenue, Dhaka 1212",
  phone: "+880 1700-000000",
  email: "info@rizqara.com",
  website: "www.rizqara.com",
  taxRate: 0.05,
  currency: "৳",
};

export const MENU_CATEGORIES = [
  { id: "cat1", name: "Burgers", icon: "🍔", color: "#E74C3C" },
  { id: "cat2", name: "Pizza", icon: "🍕", color: "#E67E22" },
  { id: "cat3", name: "Rice", icon: "🍚", color: "#27AE60" },
  { id: "cat4", name: "Drinks", icon: "🥤", color: "#2980B9" },
  { id: "cat5", name: "Desserts", icon: "🍰", color: "#8E44AD" },
  { id: "cat6", name: "Snacks", icon: "🍟", color: "#F39C12" },
];

export const MENU_ITEMS = [
  { id: "m1", name: "Classic Beef Burger", category: "cat1", price: 320, image: "🍔", description: "Juicy beef patty with fresh veggies", prepTime: 12, available: true, tax: 5, addons: ["Extra Cheese +30", "Bacon +50", "Large Size +40"] },
  { id: "m2", name: "Crispy Chicken Burger", category: "cat1", price: 290, image: "🍗", description: "Crispy fried chicken with coleslaw", prepTime: 10, available: true, tax: 5, addons: ["Extra Sauce +20", "Large Size +40"] },
  { id: "m3", name: "Veggie Burger", category: "cat1", price: 220, image: "🥦", description: "100% vegetarian delight", prepTime: 8, available: true, tax: 5, addons: ["Extra Cheese +30"] },
  { id: "m4", name: "Cheese Pizza (M)", category: "cat2", price: 480, image: "🍕", description: "Classic margherita with extra mozzarella", prepTime: 20, available: true, tax: 5, addons: ["Extra Cheese +60", "Extra Sauce +30"] },
  { id: "m5", name: "Chicken Pizza (L)", category: "cat2", price: 650, image: "🍕", description: "BBQ chicken on crispy thin crust", prepTime: 25, available: true, tax: 5, addons: ["Extra Toppings +80"] },
  { id: "m6", name: "Kacchi Biryani", category: "cat3", price: 380, image: "🍛", description: "Traditional dum cooked mutton biryani", prepTime: 15, available: true, tax: 5, addons: ["Extra Meat +100", "Raita +30"] },
  { id: "m7", name: "Chicken Fried Rice", category: "cat3", price: 280, image: "🍚", description: "Wok-tossed with veggies and egg", prepTime: 12, available: true, tax: 5, addons: ["Extra Egg +20"] },
  { id: "m8", name: "Veg Fried Rice", category: "cat3", price: 220, image: "🌾", description: "Fresh vegetable stir-fried rice", prepTime: 10, available: true, tax: 5, addons: [] },
  { id: "m9", name: "Fresh Lime Soda", category: "cat4", price: 80, image: "🥤", description: "Refreshing lime with soda", prepTime: 3, available: true, tax: 5, addons: ["Extra Sugar", "Salt"] },
  { id: "m10", name: "Mango Lassi", category: "cat4", price: 120, image: "🥭", description: "Thick creamy mango yogurt drink", prepTime: 5, available: true, tax: 5, addons: [] },
  { id: "m11", name: "Cold Coffee", category: "cat4", price: 150, image: "☕", description: "Blended iced coffee with milk", prepTime: 5, available: true, tax: 5, addons: ["Extra Shot +30"] },
  { id: "m12", name: "Chocolate Cake", category: "cat5", price: 200, image: "🎂", description: "Rich dark chocolate cake slice", prepTime: 5, available: true, tax: 5, addons: ["Ice Cream +60"] },
  { id: "m13", name: "Ice Cream Sundae", category: "cat5", price: 180, image: "🍨", description: "Three scoops with chocolate sauce", prepTime: 4, available: true, tax: 5, addons: ["Extra Scoop +50"] },
  { id: "m14", name: "French Fries", category: "cat6", price: 130, image: "🍟", description: "Golden crispy potato fries", prepTime: 8, available: true, tax: 5, addons: ["Extra Sauce +20", "Cheese +30"] },
  { id: "m15", name: "Onion Rings", category: "cat6", price: 110, image: "🧅", description: "Beer-battered crunchy rings", prepTime: 8, available: true, tax: 5, addons: [] },
];

export const TABLES = [
  { id: "t1", number: 1, capacity: 2, status: "available", x: 60, y: 60 },
  { id: "t2", number: 2, capacity: 4, status: "occupied", x: 180, y: 60 },
  { id: "t3", number: 3, capacity: 4, status: "reserved", x: 300, y: 60 },
  { id: "t4", number: 4, capacity: 6, status: "available", x: 60, y: 200 },
  { id: "t5", number: 5, capacity: 2, status: "cleaning", x: 180, y: 200 },
  { id: "t6", number: 6, capacity: 4, status: "occupied", x: 300, y: 200 },
  { id: "t7", number: 7, capacity: 8, status: "available", x: 60, y: 340 },
  { id: "t8", number: 8, capacity: 4, status: "occupied", x: 220, y: 340 },
  { id: "t9", number: 9, capacity: 2, status: "available", x: 380, y: 340 },
  { id: "t10", number: 10, capacity: 6, status: "reserved", x: 420, y: 120 },
];

export const ORDERS = [
  { id: "ORD-001", tableId: "t2", customerId: "c1", type: "dine-in", status: "served", items: [{ itemId: "m1", name: "Classic Beef Burger", qty: 2, price: 320 }, { itemId: "m9", name: "Fresh Lime Soda", qty: 2, price: 80 }], subtotal: 800, tax: 40, discount: 0, total: 840, paymentMethod: "cash", createdAt: "2026-04-21T08:00:00Z" },
  { id: "ORD-002", tableId: "t6", customerId: "c2", type: "dine-in", status: "cooking", items: [{ itemId: "m4", name: "Cheese Pizza (M)", qty: 1, price: 480 }, { itemId: "m14", name: "French Fries", qty: 2, price: 130 }, { itemId: "m10", name: "Mango Lassi", qty: 2, price: 120 }], subtotal: 980, tax: 49, discount: 50, total: 979, paymentMethod: null, createdAt: "2026-04-21T09:30:00Z" },
  { id: "ORD-003", tableId: null, customerId: "c3", type: "delivery", status: "pending", items: [{ itemId: "m6", name: "Kacchi Biryani", qty: 2, price: 380 }, { itemId: "m11", name: "Cold Coffee", qty: 2, price: 150 }], subtotal: 1060, tax: 53, discount: 0, total: 1113, paymentMethod: "bkash", createdAt: "2026-04-21T10:15:00Z" },
  { id: "ORD-004", tableId: null, customerId: "c4", type: "takeaway", status: "ready", items: [{ itemId: "m2", name: "Crispy Chicken Burger", qty: 1, price: 290 }, { itemId: "m14", name: "French Fries", qty: 1, price: 130 }], subtotal: 420, tax: 21, discount: 0, total: 441, paymentMethod: "card", createdAt: "2026-04-21T10:45:00Z" },
  { id: "ORD-005", tableId: "t8", customerId: "c5", type: "dine-in", status: "cooking", items: [{ itemId: "m5", name: "Chicken Pizza (L)", qty: 1, price: 650 }, { itemId: "m12", name: "Chocolate Cake", qty: 2, price: 200 }, { itemId: "m9", name: "Fresh Lime Soda", qty: 3, price: 80 }], subtotal: 1290, tax: 64.5, discount: 100, total: 1254.5, paymentMethod: null, createdAt: "2026-04-21T11:00:00Z" },
];

export const CUSTOMERS = [
  { id: "c1", name: "Ahmed Hassan", phone: "01711-234567", email: "ahmed@email.com", address: "Gulshan, Dhaka", points: 840, totalOrders: 12, totalSpent: 9800, joinDate: "2025-12-01" },
  { id: "c2", name: "Fatima Begum", phone: "01811-345678", email: "fatima@email.com", address: "Dhanmondi, Dhaka", points: 1200, totalOrders: 18, totalSpent: 15200, joinDate: "2025-10-15" },
  { id: "c3", name: "Kabir Hossain", phone: "01611-456789", email: "kabir@email.com", address: "Mirpur, Dhaka", points: 450, totalOrders: 7, totalSpent: 5500, joinDate: "2026-01-20" },
  { id: "c4", name: "Nusrat Jahan", phone: "01911-567890", email: "nusrat@email.com", address: "Uttara, Dhaka", points: 2100, totalOrders: 30, totalSpent: 28000, joinDate: "2025-08-05" },
  { id: "c5", name: "Rakib Islam", phone: "01511-678901", email: "rakib@email.com", address: "Mohammadpur, Dhaka", points: 670, totalOrders: 9, totalSpent: 7800, joinDate: "2025-11-10" },
];

export const STAFF = [
  { id: "s1", name: "Md. Karim", role: "Manager", phone: "01712-100001", salary: 35000, shift: "Morning", status: "active", clockIn: "08:00", totalHours: 176, performance: 94 },
  { id: "s2", name: "Rina Akter", role: "Cashier", phone: "01812-100002", salary: 22000, shift: "Morning", status: "active", clockIn: "08:30", totalHours: 168, performance: 88 },
  { id: "s3", name: "Arif Hossain", role: "Waiter", phone: "01612-100003", salary: 18000, shift: "Evening", status: "active", clockIn: "14:00", totalHours: 172, performance: 90 },
  { id: "s4", name: "Jamal Uddin", role: "Waiter", phone: "01912-100004", salary: 18000, shift: "Morning", status: "active", clockIn: "08:00", totalHours: 180, performance: 92 },
  { id: "s5", name: "Sumaiya Khan", role: "Kitchen Staff", phone: "01512-100005", salary: 20000, shift: "Morning", status: "active", clockIn: "09:00", totalHours: 174, performance: 96 },
  { id: "s6", name: "Babul Mia", role: "Kitchen Staff", phone: "01312-100006", salary: 20000, shift: "Evening", status: "off", clockIn: null, totalHours: 160, performance: 85 },
];

export const INVENTORY = [
  { id: "inv1", name: "Chicken Breast", unit: "kg", quantity: 15, minQuantity: 5, costPerUnit: 380, supplier: "Fresh Farm Co.", expiry: "2026-04-23", category: "Protein" },
  { id: "inv2", name: "Beef Mince", unit: "kg", quantity: 8, minQuantity: 3, costPerUnit: 650, supplier: "Dhaka Meat House", expiry: "2026-04-22", category: "Protein" },
  { id: "inv3", name: "Pizza Dough", unit: "kg", quantity: 2, minQuantity: 3, costPerUnit: 120, supplier: "Bakery Supplies BD", expiry: "2026-04-22", category: "Bakery" },
  { id: "inv4", name: "Mozzarella Cheese", unit: "kg", quantity: 4, minQuantity: 2, costPerUnit: 900, supplier: "Dairy Fresh", expiry: "2026-04-28", category: "Dairy" },
  { id: "inv5", name: "Basmati Rice", unit: "kg", quantity: 50, minQuantity: 10, costPerUnit: 85, supplier: "Grain Masters", expiry: "2027-01-01", category: "Grains" },
  { id: "inv6", name: "Cooking Oil", unit: "ltr", quantity: 20, minQuantity: 5, costPerUnit: 180, supplier: "Fresh Oil Co.", expiry: "2026-12-01", category: "Oil" },
  { id: "inv7", name: "Tomato Sauce", unit: "ltr", quantity: 3, minQuantity: 4, costPerUnit: 220, supplier: "Sauce World", expiry: "2026-08-01", category: "Sauces" },
  { id: "inv8", name: "Burger Buns", unit: "pcs", quantity: 60, minQuantity: 20, costPerUnit: 12, supplier: "Bakery Supplies BD", expiry: "2026-04-24", category: "Bakery" },
  { id: "inv9", name: "Lettuce", unit: "kg", quantity: 2, minQuantity: 2, costPerUnit: 80, supplier: "Green Veggie Farm", expiry: "2026-04-22", category: "Vegetables" },
  { id: "inv10", name: "Mango Pulp", unit: "ltr", quantity: 8, minQuantity: 3, costPerUnit: 160, supplier: "Fruit Express", expiry: "2026-06-01", category: "Fruits" },
];

export const DAILY_SALES = [
  { day: "Mon", revenue: 12400, orders: 42 },
  { day: "Tue", revenue: 15200, orders: 55 },
  { day: "Wed", revenue: 11800, orders: 38 },
  { day: "Thu", revenue: 18600, orders: 67 },
  { day: "Fri", revenue: 24200, orders: 89 },
  { day: "Sat", revenue: 31500, orders: 112 },
  { day: "Sun", revenue: 28800, orders: 98 },
];

export const MONTHLY_SALES = [
  { month: "Jan", revenue: 320000, expenses: 210000, profit: 110000 },
  { month: "Feb", revenue: 285000, expenses: 195000, profit: 90000 },
  { month: "Mar", revenue: 410000, expenses: 260000, profit: 150000 },
  { month: "Apr", revenue: 378000, expenses: 230000, profit: 148000 },
];

export const TOP_ITEMS = [
  { name: "Kacchi Biryani", sold: 234, revenue: 88920 },
  { name: "Chicken Pizza (L)", sold: 198, revenue: 128700 },
  { name: "Classic Beef Burger", sold: 312, revenue: 99840 },
  { name: "Mango Lassi", sold: 445, revenue: 53400 },
  { name: "French Fries", sold: 521, revenue: 67730 },
];
