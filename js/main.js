// ============================================
// THE REMARKABLE — Main JS
// ============================================

// ── Cart State ──────────────────────────────
let cart = JSON.parse(localStorage.getItem('tr_cart') || '[]');

function saveCart() {
  localStorage.setItem('tr_cart', JSON.stringify(cart));
  updateCartUI();
}

function updateCartUI() {
  const count = cart.reduce((s, i) => s + i.qty, 0);
  document.querySelectorAll('.cart-count').forEach(el => {
    el.textContent = count;
    el.classList.toggle('visible', count > 0);
  });
}

function getCartTotal() {
  return cart.reduce((s, i) => s + i.price * i.qty, 0);
}

function addToCart(product, color = '', qty = 1) {
  const existing = cart.find(i => i.id === product.id && i.color === color);
  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      brand: product.brand,
      price: product.price,
      image: product.images[0],
      color,
      qty
    });
  }
  saveCart();
  showToast('Added to cart', `${product.name}`, 'success', 'fa-cart-shopping');
}

function removeFromCart(id, color) {
  cart = cart.filter(i => !(i.id === id && i.color === color));
  saveCart();
}

function updateQty(id, color, delta) {
  const item = cart.find(i => i.id === id && i.color === color);
  if (!item) return;
  item.qty = Math.max(1, item.qty + delta);
  saveCart();
}

window.cartAPI = { cart: () => cart, add: addToCart, remove: removeFromCart, updateQty, getTotal: getCartTotal };

// ── Fly to Cart Animation ────────────────────
function flyToCart(originEl) {
  const cartEl = document.querySelector('.nav-icon-btn[data-cart]') || document.querySelector('#open-cart-btn');
  if (!cartEl || !originEl) return;

  const fromRect = originEl.getBoundingClientRect();
  const toRect = cartEl.getBoundingClientRect();

  const fly = document.createElement('div');
  fly.className = 'fly-item';
  fly.innerHTML = '<i class="fa-solid fa-laptop"></i>';
  fly.style.cssText = `left:${fromRect.left + fromRect.width / 2 - 20}px;top:${fromRect.top + fromRect.height / 2 - 20}px;`;
  document.body.appendChild(fly);

  requestAnimationFrame(() => {
    fly.style.transition = 'all 0.65s cubic-bezier(0.4,0,0.2,1)';
    fly.style.left = `${toRect.left + toRect.width / 2 - 20}px`;
    fly.style.top = `${toRect.top + toRect.height / 2 - 20}px`;
    fly.style.opacity = '0';
    fly.style.transform = 'scale(0.3)';
  });

  setTimeout(() => {
    fly.remove();
    document.querySelectorAll('.cart-count').forEach(el => {
      el.classList.add('bump');
      setTimeout(() => el.classList.remove('bump'), 400);
    });
  }, 700);
}
window.flyToCart = flyToCart;

// ── Toast Notifications ──────────────────────
let toastContainer;
function initToasts() {
  toastContainer = document.getElementById('toast-container');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.id = 'toast-container';
    document.body.appendChild(toastContainer);
  }
}

function showToast(title, subtitle = '', type = 'default', icon = 'fa-circle-check') {
  if (!toastContainer) initToasts();
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    <i class="fa-solid ${icon} toast-icon"></i>
    <div class="toast-text">
      <div class="toast-title">${title}</div>
      ${subtitle ? `<div class="toast-sub">${subtitle}</div>` : ''}
    </div>`;
  toastContainer.appendChild(toast);
  requestAnimationFrame(() => { requestAnimationFrame(() => toast.classList.add('show')); });
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  }, 3500);
}

window.showToast = showToast;

// ── Cart Drawer ──────────────────────────────
function initCartDrawer() {
  const overlay = document.getElementById('cart-overlay');
  const openBtns = document.querySelectorAll('[data-cart], #open-cart-btn');
  const closeBtn = document.querySelector('.cart-drawer-close');

  if (!overlay) return;

  openBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      overlay.classList.add('open');
      renderCartDrawer();
      document.body.style.overflow = 'hidden';
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', closeCartDrawer);
  }
  overlay.addEventListener('click', e => {
    if (e.target === overlay) closeCartDrawer();
  });
}

function closeCartDrawer() {
  const overlay = document.getElementById('cart-overlay');
  if (overlay) overlay.classList.remove('open');
  document.body.style.overflow = '';
}

function renderCartDrawer() {
  const body = document.querySelector('.cart-drawer-body');
  const subtotalEl = document.querySelector('.cart-subtotal-val');
  if (!body) return;

  if (cart.length === 0) {
    body.innerHTML = `
      <div class="cart-empty">
        <i class="fa-solid fa-cart-shopping"></i>
        <p>Your cart is empty.<br>Add some remarkable laptops!</p>
        <a href="/shop/" class="btn btn-outline btn-sm" onclick="closeCartDrawer()">
          <i class="fa-solid fa-shop"></i> Shop Now
        </a>
      </div>`;
  } else {
    body.innerHTML = cart.map(item => `
      <div class="cart-item" data-id="${item.id}" data-color="${item.color || ''}">
        <img class="cart-item-img" src="${item.image}" alt="${item.name}" onerror="this.src='images/placeholder.jpg'">
        <div class="cart-item-info">
          <div class="cart-item-name">${item.name}</div>
          ${item.color ? `<div class="cart-item-variant">${item.color}</div>` : ''}
          <div class="cart-item-controls">
            <button class="qty-btn" onclick="cartQty('${item.id}','${item.color}',-1)">
              <i class="fa-solid fa-minus"></i>
            </button>
            <span class="qty-num">${item.qty}</span>
            <button class="qty-btn" onclick="cartQty('${item.id}','${item.color}',1)">
              <i class="fa-solid fa-plus"></i>
            </button>
          </div>
        </div>
        <div style="display:flex;flex-direction:column;align-items:flex-end;gap:8px;">
          <span class="cart-item-price">PKR ${(item.price * item.qty).toLocaleString()}</span>
          <button class="cart-item-remove" onclick="cartRemove('${item.id}','${item.color}')">
            <i class="fa-solid fa-trash"></i>
          </button>
        </div>
      </div>`).join('');
  }

  if (subtotalEl) {
    subtotalEl.textContent = `PKR ${getCartTotal().toLocaleString()}`;
  }
}

window.cartQty = (id, color, delta) => {
  updateQty(id, color, delta);
  renderCartDrawer();
};
window.cartRemove = (id, color) => {
  removeFromCart(id, color);
  renderCartDrawer();
  showToast('Item removed', '', 'default', 'fa-trash');
};
window.closeCartDrawer = closeCartDrawer;

// ── Navbar ───────────────────────────────────
function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });

  const hamburger = document.querySelector('.nav-hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');

  if (hamburger && mobileMenu) {

    hamburger.addEventListener('click', (e) => {
      const rect = hamburger.getBoundingClientRect();

      // set origin for burst
      mobileMenu.style.setProperty('--menu-x', `${rect.left + rect.width / 2}px`);
      mobileMenu.style.setProperty('--menu-y', `${rect.top + rect.height / 2}px`);

      if (!mobileMenu.classList.contains('open')) {
        mobileMenu.classList.remove('closing');
        mobileMenu.classList.add('open');
        hamburger.classList.add('open');
      } else {
        closeMenu();
      }
    });

    // Close when clicking links
    document.querySelectorAll('.mobile-menu a').forEach(link => {
      link.addEventListener('click', closeMenu);
    });

    function closeMenu() {
      mobileMenu.classList.remove('open');
      mobileMenu.classList.add('closing');
      hamburger.classList.remove('open');

      setTimeout(() => {
        mobileMenu.classList.remove('closing');
      }, 500);
    }
  }

  const sectionAnchors = ['about', 'faq', 'contact'];
  const navLinks = document.querySelectorAll('.nav-links a, .mobile-menu a');

  const getPathname = () => window.location.pathname.replace(/\/$/, '') || '/';
  const getHomeSectionHash = () => {
    if (getPathname() !== '/') return '';
    const checkpoint = window.scrollY + window.innerHeight / 3;
    let activeHash = '';
    sectionAnchors.forEach(id => {
      const section = document.getElementById(id);
      if (!section) return;
      if (section.offsetTop <= checkpoint) {
        activeHash = `#${id}`;
      }
    });
    return activeHash;
  };

  const updateActiveLinks = (hashOverride = null) => {
    const pathname = getPathname();
    const activeHash = hashOverride !== null ? hashOverride : window.location.hash || '';
    navLinks.forEach(link => link.classList.remove('active'));
    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (!href) return;
      const url = new URL(href, window.location.origin);
      const linkPath = url.pathname.replace(/\/$/, '') || '/';
      const linkHash = url.hash || '';
      if (linkPath !== pathname) return;
      if (linkHash) {
        if (linkHash === activeHash) {
          link.classList.add('active');
        }
      } else if (!activeHash) {
        link.classList.add('active');
      }
    });
  };

  const onScrollUpdateActive = () => {
    if (getPathname() !== '/') return;
    updateActiveLinks(getHomeSectionHash());
  };

  updateActiveLinks();
  window.addEventListener('hashchange', () => updateActiveLinks());
  window.addEventListener('scroll', onScrollUpdateActive, { passive: true });
}

// ── Scroll to Top ────────────────────────────
function initScrollTop() {
  const btn = document.getElementById('scroll-top');
  if (!btn) return;
  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

// ── Reveal Animations ────────────────────────
function initReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;
  const obs = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('visible'), i * 80);
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });
  els.forEach(el => obs.observe(el));
}

// ── Page Loader ──────────────────────────────
function initLoader() {
  const loader = document.getElementById('page-loader');
  if (!loader) return;
  window.addEventListener('load', () => {
    setTimeout(() => loader.classList.add('hidden'), 600);
  });
}

// ── Custom Select Visual ─────────────────────
function initCustomSelects() {
  document.querySelectorAll('.custom-select-wrap .custom-select').forEach(sel => {
    sel.addEventListener('focus', () => sel.closest('.custom-select-wrap').classList.add('open'));
    sel.addEventListener('blur', () => sel.closest('.custom-select-wrap').classList.remove('open'));
  });
}

// ── FAQ Accordion ────────────────────────────
function initFAQ() {
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const answer = item.querySelector('.faq-answer');
      const inner = answer.querySelector('.faq-answer-inner');
      const isOpen = item.classList.contains('open');

      document.querySelectorAll('.faq-item.open').forEach(openItem => {
        openItem.classList.remove('open');
        openItem.querySelector('.faq-answer').style.height = '0';
      });

      if (!isOpen) {
        item.classList.add('open');
        answer.style.height = inner.offsetHeight + 'px';
      }
    });
  });
}

// ── Shared ATC helper used by all pages ──────
// Each page calls this after rendering its product cards.
// Pass the PRODUCTS array so it can look up product data.
window.initATCButtons = function (PRODUCTS) {
  document.querySelectorAll('.add-to-cart-btn[data-product-id]').forEach(btn => {
    // Guard: skip if listener already attached
    if (btn.dataset.atcReady) return;
    btn.dataset.atcReady = '1';

    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();

      const pid = btn.dataset.productId;
      const product = PRODUCTS.find(p => p.id === pid);
      if (!product || !product.inStock) return;

      btn.classList.add('adding');
      setTimeout(() => btn.classList.remove('adding'), 500);

      // Fly animation
      const cartBtn = document.querySelector('.nav-icon-btn[data-cart]');
      if (cartBtn) {
        const from = btn.getBoundingClientRect();
        const to = cartBtn.getBoundingClientRect();
        const fly = document.createElement('div');
        fly.className = 'fly-item';
        fly.innerHTML = '<i class="fa-solid fa-laptop"></i>';
        fly.style.cssText = `left:${from.left + from.width / 2 - 20}px;top:${from.top + from.height / 2 - 20}px;`;
        document.body.appendChild(fly);
        requestAnimationFrame(() => {
          fly.style.transition = 'all 0.65s cubic-bezier(0.4,0,0.2,1)';
          fly.style.left = `${to.left + to.width / 2 - 20}px`;
          fly.style.top = `${to.top + to.height / 2 - 20}px`;
          fly.style.opacity = '0';
          fly.style.transform = 'scale(0.3)';
        });
        setTimeout(() => fly.remove(), 700);
      }

      addToCart(product);
    });
  });
};

// ── Init ─────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initLoader();
  initNavbar();
  initCartDrawer();
  initScrollTop();
  initReveal();
  initCustomSelects();
  initFAQ();
  updateCartUI();
  initToasts();
});

