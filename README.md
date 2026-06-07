# The Remarkable — Premium Laptop Store

A fully-featured, modern e-commerce website for premium laptops.

---

## 📁 Folder Structure

```
the-remarkable/
├── index.html          ← Home / Landing Page
├── shop.html           ← Shop with filters & sorting
├── product.html        ← Product detail page (dynamic)
├── cart.html           ← Cart page (full)
├── checkout.html       ← Checkout (COD only, saves to Firebase)
├── admin/
│   └── index.html      ← Admin panel (login + order management)
├── css/
│   ├── style.css       ← Global design system
│   ├── home.css        ← Home page styles
│   └── pages.css       ← Shop/Product/Cart/Checkout/Admin styles
├── js/
│   ├── firebase.js     ← Firebase config + PRODUCTS database
│   ├── main.js         ← Cart logic, animations, shared JS
│   └── components.js   ← Reusable HTML component helpers
└── images/
    └── products/       ← Place your product images here
        ├── laptop1.jpg
        ├── laptop1b.jpg
        ├── laptop1c.jpg
        ├── laptop2.jpg
        ... (follow naming pattern)
```

---

## 🛍️ Adding Products

Open `js/firebase.js` and find the `PRODUCTS` array.

**To add a new product:**
1. Find the comment `// ── ADD MORE PRODUCTS BELOW ──`
2. Copy any product block (from the `{` to the matching `},`)
3. Paste it below
4. Change the `id` to a new unique value (e.g. `"p007"`)
5. Update all the fields: name, brand, price, images, specs, etc.
6. Add your image files to `images/products/`

That's it! The product will automatically appear in the shop and homepage (if `featured: true`).

---

## 🖼️ Product Images

- Place images in the `images/products/` folder
- Name them matching what's in your product's `images` array
- Recommended size: **800×600px** minimum, **4:3 ratio**
- Formats: `.jpg`, `.webp`, `.png`
- Each product supports multiple images (main + thumbnails)
- If an image is missing, it falls back to an Unsplash placeholder automatically

**Naming convention (recommended):**
```
laptop7.jpg    ← main image
laptop7b.jpg   ← second image (gallery)
laptop7c.jpg   ← third image (gallery)
```

---

## 🔥 Firebase Setup

Your Firebase config is already included in `js/firebase.js`.

**Make sure these are enabled in your Firebase console:**
- ✅ Firestore Database (test mode)
- ✅ Authentication → Email/Password provider

**To create admin users:**
1. Go to Firebase Console → Authentication
2. Click "Add user"
3. Enter email & password
4. Use those credentials at `/admin`

**Firestore collections created automatically:**
- `orders` — All customer orders with status tracking

---

## 🛒 Features

### Customer Side
- ✅ Home page with hero, featured products, categories, testimonials, FAQ, about, contact
- ✅ Shop page with real-time filtering (category, brand, price, search, stock)
- ✅ Grid/List view toggle with sorting
- ✅ Detailed product page with image gallery, tabs, related products
- ✅ Add to cart with fly animation
- ✅ Cart drawer (slide-in) + full cart page
- ✅ Coupon codes: `WELCOME10`, `SAVE15`, `REMARKABLE20`
- ✅ Checkout (COD only) saved to Firebase
- ✅ Order success page with order ID
- ✅ Breadcrumbs on all pages
- ✅ Floating WhatsApp button
- ✅ Scroll to top button
- ✅ Toast notifications
- ✅ Page loader
- ✅ Fully responsive (mobile, tablet, desktop)
- ✅ Custom styled selects throughout
- ✅ Reveal animations on scroll

### Admin Panel (`/admin`)
- ✅ Secure email/password login (Firebase Auth)
- ✅ Dashboard with live stats (total orders, pending, confirmed, revenue)
- ✅ All orders table with search & status filter
- ✅ Pending orders view
- ✅ Order detail modal (customer info, items, totals)
- ✅ One-click: Confirm / Mark Delivered / Reject
- ✅ Direct WhatsApp link to customer from order

---

## 🎨 Design

- **Theme:** Dark luxury minimal
- **Display Font:** Cormorant Garamond (serif, elegant)
- **Body Font:** DM Sans (clean, modern)
- **Mono Font:** Space Mono (prices, labels, codes)
- **Accent Color:** Gold `#c9a84c`
- **Background:** Deep dark `#0a0a0a`

---

## ⚙️ Running Locally

Since this uses ES Modules (import/export), you need a local server:

**Option 1 — VS Code Live Server:**
Right-click `index.html` → "Open with Live Server"

**Option 2 — Python:**
```bash
cd the-remarkable
python -m http.server 8080
# Open http://localhost:8080
```

**Option 3 — Node.js:**
```bash
npx serve the-remarkable
```

> ⚠️ Do NOT open HTML files directly via `file://` — Firebase and ES modules require a server.

---

## 📱 WhatsApp

Replace `923243183053` with your actual WhatsApp number (with country code, no +) in:
- `index.html`
- `shop.html`
- `product.html`
- `cart.html`
- `checkout.html`
- `admin/index.html`

---

## 🔧 Customization

| What | Where |
|------|-------|
| Store name | Search & replace "The Remarkable" |
| Phone number | Replace `923243183053` |
| WhatsApp number | Replace in all HTML files |
| Address | `index.html` contact section + footer |
| Colors | `css/style.css` `:root` variables |
| Coupon codes | `cart.html` `COUPONS` object |
| Delivery charge | `cart.html` and `checkout.html` (currently PKR 500 under PKR 50,000) |
