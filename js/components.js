// ============================================
// THE REMARKABLE — Shared HTML Components
// ============================================

export function getNavbarHTML(activePage = '') {
  return `
<div id="page-loader">
  <div class="loader-inner">
    <div class="loader-logo">The Remarkable</div>
    <div class="loader-bar"></div>
  </div>
</div>

<nav id="navbar">
  <div class="nav-inner">
    <a href="index.html" class="nav-logo">The <span>Remarkable</span></a>
    <ul class="nav-links">
      <li><a href="index.html" ${activePage === 'home' ? 'class="active"' : ''}>Home</a></li>
      <li><a href="shop.html" ${activePage === 'shop' ? 'class="active"' : ''}>Shop</a></li>
      <li><a href="cart.html" ${activePage === 'cart' ? 'class="active"' : ''}>Cart</a></li>
      <li><a href="index.html#about">About</a></li>
      <li><a href="index.html#contact">Contact</a></li>
    </ul>
    <div class="nav-actions">
      <a href="cart.html" class="nav-icon-btn" title="Cart">
        <i class="fa-solid fa-bag-shopping"></i>
        <span class="cart-count"></span>
      </a>
      <button class="nav-icon-btn" data-cart title="Quick Cart">
        <i class="fa-solid fa-cart-shopping"></i>
        <span class="cart-count"></span>
      </button>
      <div class="nav-hamburger" role="button" aria-label="Menu">
        <span></span><span></span><span></span>
      </div>
    </div>
  </div>
</nav>

<div class="mobile-menu">
  <a href="index.html">Home</a>
  <a href="shop.html">Shop</a>
  <a href="cart.html">Cart</a>
  <a href="index.html#about">About</a>
  <a href="index.html#faq">FAQs</a>
  <a href="index.html#contact">Contact</a>
</div>`;
}

export function getCartDrawerHTML() {
  return `
<div id="cart-overlay">
  <div id="cart-drawer">
    <div class="cart-drawer-head">
      <h2 class="cart-drawer-title">Your Cart</h2>
      <button class="cart-drawer-close" onclick="closeCartDrawer()">
        <i class="fa-solid fa-xmark"></i>
      </button>
    </div>
    <div class="cart-drawer-body"></div>
    <div class="cart-drawer-foot">
      <div class="cart-subtotal">
        <span class="cart-subtotal-label">Subtotal</span>
        <span class="cart-subtotal-val">PKR 0</span>
      </div>
      <p class="cart-note"><i class="fa-solid fa-truck"></i> Free delivery on orders above PKR 50,000</p>
      <a href="checkout.html" class="cart-checkout-btn">
        <i class="fa-solid fa-lock"></i> Proceed to Checkout
      </a>
      <a href="cart.html" class="btn btn-ghost btn-sm" style="width:100%;justify-content:center;margin-top:8px;">
        View Full Cart
      </a>
    </div>
  </div>
</div>`;
}

export function getFooterHTML() {
  return `
<footer>
  <div class="container">
    <div class="footer-grid">
      <div class="footer-brand">
        <div class="footer-logo">The <span>Remarkable</span></div>
        <p class="footer-desc">Pakistan's premier destination for premium laptops. We curate only the finest machines for professionals, creators, and gamers.</p>
        <div class="footer-socials">
          <a href="#" class="social-btn"><i class="fa-brands fa-instagram"></i></a>
          <a href="#" class="social-btn"><i class="fa-brands fa-facebook-f"></i></a>
          <a href="#" class="social-btn"><i class="fa-brands fa-youtube"></i></a>
          <a href="https://wa.me/923001234567" class="social-btn"><i class="fa-brands fa-whatsapp"></i></a>
        </div>
      </div>
      <div>
        <div class="footer-col-title">Quick Links</div>
        <ul class="footer-links">
          <li><a href="index.html">Home</a></li>
          <li><a href="shop.html">Shop</a></li>
          <li><a href="cart.html">My Cart</a></li>
          <li><a href="index.html#about">About Us</a></li>
          <li><a href="index.html#faq">FAQs</a></li>
        </ul>
      </div>
      <div>
        <div class="footer-col-title">Categories</div>
        <ul class="footer-links">
          <li><a href="shop.html?cat=business">Business</a></li>
          <li><a href="shop.html?cat=gaming">Gaming</a></li>
          <li><a href="shop.html?cat=ultrabook">Ultrabooks</a></li>
          <li><a href="shop.html?cat=creator">Creator</a></li>
          <li><a href="shop.html">All Laptops</a></li>
        </ul>
      </div>
      <div>
        <div class="footer-col-title">Get in Touch</div>
        <div class="footer-contact-item">
          <i class="fa-solid fa-location-dot"></i>
          <span>Shop #14, Tech Bazaar, Saddar, Karachi, Pakistan</span>
        </div>
        <div class="footer-contact-item">
          <i class="fa-brands fa-whatsapp"></i>
          <span>+92 300 1234567</span>
        </div>
        <div class="footer-contact-item">
          <i class="fa-solid fa-envelope"></i>
          <span>hello@theremarkable.pk</span>
        </div>
        <div class="footer-contact-item">
          <i class="fa-solid fa-clock"></i>
          <span>Mon – Sat: 10am – 8pm</span>
        </div>
      </div>
    </div>
  </div>
  <div class="container">
    <div class="footer-bottom">
      <span>© 2026 The Remarkable. All rights reserved.
</span>
      <span>Made with <i class="fa-solid fa-heart" style="color:var(--red)"></i> in Pakistan</span>
    </div>
  </div>
</footer>

<a href="https://wa.me/923001234567?text=Hello!%20I%20need%20help%20with%20a%20laptop%20purchase." 
   id="whatsapp-btn" target="_blank" title="Chat on WhatsApp">
  <i class="fa-brands fa-whatsapp"></i>
</a>

<button id="scroll-top" title="Back to top">
  <i class="fa-solid fa-chevron-up"></i>
</button>`;
}

export function renderProductCard(product, index = 0) {
  const { id, name, brand, price, oldPrice, images, badge, rating, specs } = product;
  const badgeHTML = badge ? `<div class="product-badge ${badge}">${badge}</div>` : '';
  const oldPriceHTML = oldPrice ? `<span class="price-old">PKR ${oldPrice.toLocaleString()}</span>` : '';
  const specItems = specs ? Object.entries(specs).slice(0, 3).map(([k, v]) =>
    `<span><i class="fa-solid fa-circle-dot"></i>${v}</span>`).join('') : '';

  return `
<div class="product-card reveal" style="transition-delay:${index * 0.08}s" data-product-id="${id}">
  <a href="product.html?id=${id}">
    <div class="product-img-wrap">
      ${badgeHTML}
      <img src="${images[0]}" alt="${name}" loading="lazy" onerror="this.src='images/placeholder.jpg'">
      <div class="product-actions-overlay">
        <a href="product.html?id=${id}" class="btn btn-outline btn-sm" style="flex:1">
          <i class="fa-solid fa-eye"></i> View
        </a>
      </div>
    </div>
    <div class="product-info">
      <div class="product-brand">${brand}</div>
      <h3 class="product-name">${name}</h3>
      <div class="product-specs">${specItems}</div>
      <div class="product-footer">
        <div class="product-price">
          <span class="price-current">PKR ${price.toLocaleString()}</span>
          ${oldPriceHTML}
        </div>
        <button class="add-to-cart-btn" title="Add to Cart" data-product-id="${id}">
          <i class="fa-solid fa-cart-plus"></i>
        </button>
      </div>
    </div>
  </a>
</div>`;
}
