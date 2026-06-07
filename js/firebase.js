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
    name: "ProBook Elite X1",
    brand: "HP",
    category: "business",
    badge: "bestseller",
    price: 189999,
    oldPrice: 229999,
    images: [
      "images/products/laptop1.jpg",
      "images/products/laptop1b.jpg",
      "images/products/laptop1c.jpg"
    ],
    rating: 4.8,
    reviews: 124,
    shortDesc: "Ultra-thin business powerhouse with an all-day battery and stunning 4K display.",
    description: `The HP ProBook Elite X1 is engineered for professionals who demand the best. Featuring Intel's latest Core i7 processor and a blazing-fast NVMe SSD, this machine handles everything from complex spreadsheets to light creative work with ease. The 14-inch 4K OLED display delivers stunning color accuracy, while the premium aluminum chassis ensures durability without sacrificing elegance.`,
    specs: {
      "Processor": "Intel Core i7-1365U (12th Gen)",
      "RAM": "16 GB LPDDR5",
      "Storage": "512 GB NVMe SSD",
      "Display": "14\" 4K OLED, 400 nits",
      "Graphics": "Intel Iris Xe Graphics",
      "Battery": "72 Wh, up to 16 hrs",
      "OS": "Windows 11 Pro",
      "Weight": "1.39 kg",
      "Ports": "2x USB-C, 2x USB-A, HDMI 2.0",
      "Warranty": "1 Year On-site"
    },
    colors: ["Space Silver", "Midnight Black"],
    inStock: true,
    tags: ["business", "ultrabook", "4k", "oled"],
    featured: true
  },

  // ── PRODUCT 2 ──────────────────────────────
  {
    id: "p002",
    name: "MacBook Air M3",
    brand: "Apple",
    category: "ultrabook",
    badge: "new",
    price: 299999,
    oldPrice: null,
    images: [
      "images/products/laptop2.jpg",
      "images/products/laptop2b.jpg",
      "images/products/laptop2c.jpg"
    ],
    rating: 4.9,
    reviews: 312,
    shortDesc: "The thinnest, lightest MacBook Air ever. Powered by the M3 chip for extraordinary performance.",
    description: `Apple's MacBook Air M3 redefines what a laptop can be. The M3 chip delivers a massive leap in performance and battery life, all in the iconic fanless design. The Liquid Retina display is breathtaking, and with up to 18 hours of battery, you can work all day and into the night.`,
    specs: {
      "Processor": "Apple M3 (8-core CPU, 10-core GPU)",
      "RAM": "16 GB Unified Memory",
      "Storage": "512 GB SSD",
      "Display": "15.3\" Liquid Retina, 2880×1864",
      "Graphics": "10-core GPU",
      "Battery": "Up to 18 hours",
      "OS": "macOS Sonoma",
      "Weight": "1.51 kg",
      "Ports": "2x Thunderbolt 4, MagSafe 3, 3.5mm",
      "Warranty": "1 Year AppleCare"
    },
    colors: ["Midnight", "Starlight", "Space Grey", "Silver"],
    inStock: true,
    tags: ["apple", "ultrabook", "m3", "fanless"],
    featured: true
  },

  // ── PRODUCT 3 ──────────────────────────────
  {
    id: "p003",
    name: "ROG Zephyrus G16",
    brand: "ASUS",
    category: "gaming",
    badge: "hot",
    price: 359999,
    oldPrice: 399999,
    images: [
      "images/products/laptop3.jpg",
      "images/products/laptop3b.jpg",
      "images/products/laptop3c.jpg"
    ],
    rating: 4.7,
    reviews: 89,
    shortDesc: "Dominate every game with RTX 4080, 240Hz QHD display and ultra-fast DDR5 memory.",
    description: `Built for elite gaming, the ASUS ROG Zephyrus G16 combines an Intel Core i9 processor with NVIDIA GeForce RTX 4080 in an impossibly slim chassis. The 16-inch QHD 240Hz Nebula display with Dolby Vision delivers silky-smooth visuals with stunning color accuracy.`,
    specs: {
      "Processor": "Intel Core i9-13900H",
      "RAM": "32 GB DDR5 4800MHz",
      "Storage": "1 TB NVMe PCIe 4.0 SSD",
      "Display": "16\" QHD 240Hz, Dolby Vision",
      "Graphics": "NVIDIA GeForce RTX 4080 12GB",
      "Battery": "90 Wh, up to 10 hrs",
      "OS": "Windows 11 Home",
      "Weight": "1.95 kg",
      "Ports": "2x USB-C (TB4), 2x USB-A, HDMI 2.1, SD",
      "Warranty": "2 Year ROG Warranty"
    },
    colors: ["Eclipse Gray", "Platinum White"],
    inStock: true,
    tags: ["gaming", "rtx4080", "240hz", "rog"],
    featured: true
  },

  // ── PRODUCT 4 ──────────────────────────────
  {
    id: "p004",
    name: "ThinkPad X1 Carbon",
    brand: "Lenovo",
    category: "business",
    badge: null,
    price: 219999,
    oldPrice: 259999,
    images: [
      "images/products/laptop4.jpg",
      "images/products/laptop4b.jpg",
      "images/products/laptop4c.jpg"
    ],
    rating: 4.6,
    reviews: 201,
    shortDesc: "MIL-STD-810H certified ultra-light business laptop with legendary ThinkPad reliability.",
    description: `The ThinkPad X1 Carbon Gen 11 is the gold standard for business laptops. Weighing just 1.12 kg, it passes 12 military-spec durability tests and features the iconic ThinkPad keyboard loved by professionals worldwide.`,
    specs: {
      "Processor": "Intel Core i7-1365U vPro",
      "RAM": "32 GB LPDDR5",
      "Storage": "1 TB PCIe Gen 4 SSD",
      "Display": "14\" IPS, 2.8K 120Hz, HDR500",
      "Graphics": "Intel Iris Xe",
      "Battery": "57 Wh, up to 15 hrs",
      "OS": "Windows 11 Pro",
      "Weight": "1.12 kg",
      "Ports": "2x TB4, 2x USB-A, HDMI, SD, 4G LTE",
      "Warranty": "3 Year On-site Premier"
    },
    colors: ["Deep Black"],
    inStock: true,
    tags: ["business", "thinkpad", "lightweight", "vpro"],
    featured: false
  },

  // ── PRODUCT 5 ──────────────────────────────
  {
    id: "p005",
    name: "Dell XPS 15",
    brand: "Dell",
    category: "creator",
    badge: "sale",
    price: 279999,
    oldPrice: 329999,
    images: [
      "images/products/laptop5.jpg",
      "images/products/laptop5b.jpg",
      "images/products/laptop5c.jpg"
    ],
    rating: 4.7,
    reviews: 156,
    shortDesc: "The perfect creator's laptop with OLED touch display and RTX 4060 for serious content creation.",
    description: `The Dell XPS 15 OLED is built for creators who demand perfection. The 15.6-inch 3.5K OLED display delivers 100% DCI-P3 color accuracy, while the RTX 4060 handles video editing, 3D rendering, and photography workflows effortlessly.`,
    specs: {
      "Processor": "Intel Core i9-13900H",
      "RAM": "32 GB DDR5",
      "Storage": "1 TB NVMe SSD",
      "Display": "15.6\" 3.5K OLED Touch, 100% DCI-P3",
      "Graphics": "NVIDIA RTX 4060 8GB",
      "Battery": "86 Wh, up to 13 hrs",
      "OS": "Windows 11 Home",
      "Weight": "1.86 kg",
      "Ports": "2x TB4, USB-C, SD, 3.5mm",
      "Warranty": "1 Year Premium"
    },
    colors: ["Platinum Silver", "Graphite"],
    inStock: true,
    tags: ["creator", "oled", "rtx4060", "xps"],
    featured: false
  },

  // ── PRODUCT 6 ──────────────────────────────
  {
    id: "p006",
    name: "Surface Laptop 5",
    brand: "Microsoft",
    category: "ultrabook",
    badge: "new",
    price: 169999,
    oldPrice: null,
    images: [
      "images/products/laptop6.jpg",
      "images/products/laptop6b.jpg",
      "images/products/laptop6c.jpg"
    ],
    rating: 4.5,
    reviews: 78,
    shortDesc: "Elegant, refined, and incredibly fast. The Surface Laptop 5 is Windows perfected.",
    description: `Microsoft's Surface Laptop 5 is a masterpiece of design and engineering. The PixelSense touchscreen display is stunning, and the Alcantara keyboard deck makes typing a pleasure. Powered by Intel Evo platform for instant-on performance.`,
    specs: {
      "Processor": "Intel Core i7-1265U (Intel Evo)",
      "RAM": "16 GB LPDDR5x",
      "Storage": "512 GB SSD",
      "Display": "13.5\" PixelSense Touch, 2256×1504",
      "Graphics": "Intel Iris Xe",
      "Battery": "Up to 17 hours",
      "OS": "Windows 11 Home",
      "Weight": "1.27 kg",
      "Ports": "USB-C, USB-A, Surface Connect, 3.5mm",
      "Warranty": "1 Year Limited"
    },
    colors: ["Sage", "Matte Black", "Platinum", "Sandstone"],
    inStock: false,
    tags: ["microsoft", "ultrabook", "touchscreen", "evo"],
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

