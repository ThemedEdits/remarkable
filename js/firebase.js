// ============================================
// THE REMARKABLE — Firebase Config & Products
// ============================================

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, doc, updateDoc, query, orderBy, serverTimestamp }
  from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged }
  from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyBEjhgQXMZ-dAv86qPmr7TJt2Rzinv4MvI",
  authDomain: "the-remarkable.firebaseapp.com",
  projectId: "the-remarkable",
  storageBucket: "the-remarkable.firebasestorage.app",
  messagingSenderId: "333747805889",
  appId: "1:333747805889:web:6d8ed6835021805f223e40"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

// ── Firebase Helpers ──
export async function saveOrder(orderData) {
  try {
    const docRef = await addDoc(collection(db, "orders"), {
      ...orderData,
      createdAt: serverTimestamp(),
      status: "pending"
    });
    return docRef.id;
  } catch (e) {
    console.error("Error saving order:", e);
    throw e;
  }
}

export async function getOrders() {
  try {
    const q = query(collection(db, "orders"), orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
  } catch (e) {
    console.error("Error fetching orders:", e);
    return [];
  }
}

export async function updateOrderStatus(orderId, status) {
  try {
    const ref = doc(db, "orders", orderId);
    await updateDoc(ref, { status, updatedAt: serverTimestamp() });
    return true;
  } catch (e) {
    console.error("Error updating order:", e);
    throw e;
  }
}

export { signInWithEmailAndPassword, signOut, onAuthStateChanged };

// ============================================
// PRODUCTS DATABASE
// To add a product: duplicate one product object below
// and change the values (id must be unique)
// ============================================

export const PRODUCTS = [
  // ── PRODUCT 1 ──────────────────────────────
  {
    id: "p001",
    name: "Chromebook 11 G5",
    brand: "HP",
    category: "chromebook",
    badge: "sale",
    price: 7999,
    oldPrice: 12999,
    images: [
      "/images/products/laptop1.png",
      "/images/products/laptop1b.png",
      "/images/products/laptop1c.png",
      "/images/products/laptop1d.png"
    ],
    rating: 5.0,
    reviews: 62,
    shortDesc: "Affordable and portable 11.6\" Chromebook with 4GB RAM and 16GB storage, perfect for everyday computing.",
    description: `The HP Chromebook 11 G5 is a budget-friendly, lightweight laptop designed for students and everyday users. With its reliable performance and extended battery life, it's perfect for browsing, productivity, and entertainment. The dual-core processor ensures smooth multitasking while keeping power consumption low.`,
    specs: {
      "Processor": "Intel Celeron N3050 Dual Core",
      "RAM": "4 GB",
      "Storage": "16 GB SSD",
      "Display": "11.6\" HD LCD (1366×768)",
      "Graphics": "Intel HD Graphics",
      "Battery": "Up to 12 hours",
      "OS": "Chrome OS",
      "Weight": "1.24 kg",
      "Ports": "2x USB 3.0, HDMI, 3.5mm, SD Card",
      "Warranty": "1 Year Limited"
    },
    colors: ["Silver", "Dark Gray"],
    inStock: true,
    tags: ["chromebook", "budget", "portable", "education"],
    featured: true
  },

  // ── PRODUCT 2 ──────────────────────────────
  {
    id: "p002",
    name: "ThinkPad Yoga",
    brand: "Lenovo",
    category: "convertible",
    badge: "sale",
    price: 11000,
    oldPrice: 18644,
    images: [
      "/images/products/laptop2.png",
      "/images/products/laptop2b.png",
      "/images/products/laptop2c.png",
      "/images/products/laptop2d.png",
      "/images/products/laptop2e.png",
      "/images/products/laptop2f.png"
    ],
    rating: 5.0,
    reviews: 80,
    shortDesc: "Flexible 2-in-1 convertible laptop with touchscreen, perfect for work and entertainment on the go.",
    description: `The Lenovo ThinkPad Yoga combines versatility with ThinkPad reliability. Its innovative 360-degree hinge allows you to use it as a laptop, tent, stand, or tablet mode. With Windows support and a responsive touchscreen, it's ideal for professionals and creative users who need flexibility.`,
    specs: {
      "Processor": "Intel Core i5-6200U (6th Gen)",
      "RAM": "8 GB DDR4",
      "Storage": "256 GB SSD",
      "Display": "12.5\" FHD IPS Touchscreen (1920×1080)",
      "Graphics": "Intel HD Graphics 520",
      "Battery": "Up to 11 hours",
      "OS": "Windows 10/11",
      "Weight": "1.42 kg",
      "Ports": "2x USB 3.0, USB-C, HDMI, 3.5mm",
      "Warranty": "2 Year On-site"
    },
    colors: ["Graphite Black"],
    inStock: true,
    tags: ["convertible", "2-in-1", "touchscreen", "business"],
    featured: true
  },

  // ── PRODUCT 3 ──────────────────────────────
  {
    id: "p003",
    name: "Chromebook 11 3120 P22T",
    brand: "Dell",
    category: "chromebook",
    badge: "sale",
    price: 8000,
    oldPrice: 15094,
    images: [
      "/images/products/laptop3.png",
      "/images/products/laptop3b.png",
      "/images/products/laptop3c.png",
      "/images/products/laptop3d.png",
      "/images/products/laptop3e.png"
    ],
    rating: 5.0,
    reviews: 54,
    shortDesc: "Compact 11\" Dell Chromebook with 4GB RAM and 16GB storage, designed for students and professionals.",
    description: `The Dell Chromebook 11 3120 P22T is a reliable, budget-conscious choice for education and business. Built to withstand the demands of daily use with a durable design, it delivers fast performance and excellent battery life. Chrome OS provides instant access to Google apps and services.`,
    specs: {
      "Processor": "Intel Celeron N3050 Dual Core",
      "RAM": "4 GB",
      "Storage": "16 GB eMMC",
      "Display": "11.6\" HD LED (1366×768)",
      "Graphics": "Intel HD Graphics",
      "Battery": "Up to 13 hours",
      "OS": "Chrome OS",
      "Weight": "1.19 kg",
      "Ports": "2x USB 3.0, HDMI, 3.5mm, SD Card Slot",
      "Warranty": "1 Year Limited"
    },
    colors: ["Black", "Silver"],
    inStock: true,
    tags: ["chromebook", "budget", "education", "portable"],
    featured: false
  },

  // ── PRODUCT 4 ──────────────────────────────
  {
    id: "p004",
    name: "Chromebook 3100",
    brand: "Dell",
    category: "chromebook",
    badge: "sale",
    price: 14000,
    oldPrice: 17073,
    images: [
      "/images/products/laptop4.png",
      "/images/products/laptop4b.png",
      "/images/products/laptop4c.png",
      "/images/products/laptop4d.png",
      "/images/products/laptop4e.png",
      "/images/products/laptop4f.png",
      "/images/products/laptop4g.png"
    ],
    rating: 5.0,
    reviews: 17,
    shortDesc: "Premium 11.6\" Dell Chromebook with Intel Celeron processor, 4GB RAM, and 32GB storage for enhanced productivity.",
    description: `The Dell Chromebook 3100 offers improved performance with an Intel Celeron N4000 processor and expanded 32GB storage. Designed for professional use and students, it features a durable construction, responsive touchpad, and long battery life. 2029 Updateable ensures extended software support.`,
    specs: {
      "Processor": "Intel Celeron N4000 Dual Core (1.1 GHz)",
      "RAM": "4 GB DDR4",
      "Storage": "32 GB eMMC",
      "Display": "11.6\" HD LED (1366×768)",
      "Graphics": "Intel UHD Graphics 600",
      "Battery": "Up to 14 hours",
      "OS": "Chrome OS (2029 Updateable)",
      "Weight": "1.26 kg",
      "Ports": "2x USB 3.0, USB-C, HDMI, 3.5mm, SD Card Slot",
      "Warranty": "1 Year Limited"
    },
    colors: ["Black", "Silver"],
    inStock: true,
    tags: ["chromebook", "intel-celeron", "productivity", "education"],
    featured: false
  }

  // ── ADD MORE PRODUCTS BELOW ──────────────────
  // Duplicate any product block above, change the id (e.g. "p007"),
  // update name, price, images, specs, etc.
  // That's it — the product will appear automatically in the shop!
];

// Helper: format PKR price
export function formatPrice(price) {
  return "PKR " + price.toLocaleString("en-PK");
}

// Helper: get product by id
export function getProductById(id) {
  return PRODUCTS.find(p => p.id === id) || null;
}

// Helper: get featured products
export function getFeaturedProducts() {
  return PRODUCTS.filter(p => p.featured);
}

// Helper: get related products (same category, excluding current)
export function getRelatedProducts(product, limit = 3) {
  return PRODUCTS
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, limit);
}

