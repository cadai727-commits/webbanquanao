window.UrbanThreads = window.UrbanThreads || {};

const navLinks = [
  { label: 'Trang chủ', href: 'index.html' },
  { label: 'Cửa hàng', href: 'shop.html' },
  { label: 'Hàng mới', href: 'shop.html?filter=new' },
  { label: 'Bán chạy', href: 'shop.html?filter=bestseller' },
  { label: 'Danh mục', href: 'shop.html#categories' }
];

function getPageName() {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  return path;
}

function getCurrentUserName() {
  const user = window.UrbanThreads.storage.getCurrentUser();
  return user ? user.fullName : 'Tài khoản';
}

function updateAllBadges() {
  const cart = window.UrbanThreads.storage.getCart();
  const wishlist = window.UrbanThreads.storage.getWishlist();
  const cartBadge = document.querySelectorAll('[data-cart-badge]');
  const wishlistBadge = document.querySelectorAll('[data-wishlist-badge]');

  const cartCount = cart.reduce((sum, item) => sum + Number(item.quantity || 0), 0);
  const wishlistCount = wishlist.length;

  cartBadge.forEach((badge) => {
    badge.textContent = cartCount;
    badge.style.display = cartCount > 0 ? 'flex' : 'none';
  });

  wishlistBadge.forEach((badge) => {
    badge.textContent = wishlistCount;
    badge.style.display = wishlistCount > 0 ? 'flex' : 'none';
  });
}

function getHeaderMarkup() {
  const currentUser = window.UrbanThreads.storage.getCurrentUser();
  const userLabel = currentUser ? currentUser.fullName : 'Tài khoản';
  const isAdminPage = window.location.pathname.includes('/admin/');

  return `
    <div class="container header-inner">
      <a href="${isAdminPage ? '../index.html' : 'index.html'}" class="brand" aria-label="Urban Threads home">
        <span class="brand-mark">UT</span>
        <span>Urban Threads</span>
      </a>

      <nav class="main-nav" aria-label="Main navigation">
        ${navLinks.map((link) => {
          const isActive = (getPageName() === 'index.html' && link.href === 'index.html') || (link.href !== 'index.html' && window.location.pathname.includes(link.href.replace('.html', '')));
          return `<a href="${isAdminPage ? '../' + link.href : link.href}" class="${isActive ? 'active' : ''}">${link.label}</a>`;
        }).join('')}
      </nav>

      <div class="header-tools">
        <div class="search-box">
          <i class="fa-solid fa-magnifying-glass"></i>
          <input type="search" aria-label="Tìm sản phẩm" placeholder="Tìm kiếm" />
        </div>

        <a href="wishlist.html" class="icon-button" aria-label="Wishlist">
          <i class="fa-regular fa-heart"></i>
          <span class="count-badge" data-wishlist-badge>0</span>
        </a>

        <a href="cart.html" class="icon-button" aria-label="Cart">
          <i class="fa-solid fa-bag-shopping"></i>
          <span class="count-badge" data-cart-badge>0</span>
        </a>

        <a href="${currentUser ? 'profile.html' : 'login.html'}" class="icon-button" aria-label="User account">
          <i class="fa-regular fa-user"></i>
        </a>
      </div>
    </div>
  `;
}

function getFooterMarkup() {
  return `
    <div class="container footer-grid">
      <div>
        <div class="brand" style="margin-bottom: 18px;">
          <span class="brand-mark">UT</span>
          <span>Urban Threads</span>
        </div>
        <p>Premium street essentials for everyday identity. Wear your identity.</p>
      </div>
      <div>
        <h4 class="footer-title">Cửa hàng</h4>
        <ul class="footer-links">
          <li><a href="shop.html">Hàng mới</a></li>
          <li><a href="shop.html">Bán chạy</a></li>
          <li><a href="shop.html?filter=hoodies">Áo khoác</a></li>
          <li><a href="shop.html?filter=jeans">Quần jeans</a></li>
        </ul>
      </div>
      <div>
        <h4 class="footer-title">Hỗ trợ</h4>
        <ul class="footer-links">
          <li><a href="order-tracking.html">Theo dõi đơn</a></li>
          <li><a href="notifications.html">Thông báo</a></li>
          <li><a href="profile.html">Tài khoản</a></li>
          <li><a href="login.html">Đăng nhập</a></li>
        </ul>
      </div>
      <div>
        <h4 class="footer-title">Thư tin</h4>
        <p>Nhận thông tin về bộ sưu tập mới và ưu đãi đặc biệt.</p>
        <form class="newsletter-form">
          <input type="email" placeholder="Địa chỉ email" />
          <button class="btn btn-secondary btn-sm" type="submit">Đăng ký</button>
        </form>
      </div>
    </div>
    <div class="container footer-bottom">
      <span>© 2026 Urban Threads</span>
      <span>Thiết kế demo bán hàng trực tuyến</span>
    </div>
  `;
}

function renderGlobalLayout() {
  const header = document.getElementById('site-header');
  const footer = document.getElementById('site-footer');
  if (header) header.innerHTML = getHeaderMarkup();
  if (footer) footer.innerHTML = getFooterMarkup();
  updateAllBadges();
  bindGlobalEvents();
}

function bindGlobalEvents() {
  document.querySelectorAll('.newsletter-form').forEach((form) => {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      showToast('Cảm ơn bạn đã đăng ký!');
      form.reset();
    });
  });

  document.querySelectorAll('.search-box input').forEach((input) => {
    input.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        const query = input.value.trim();
        const url = query ? `shop.html?q=${encodeURIComponent(query)}` : 'shop.html';
        window.location.href = url;
      }
    });
  });

  document.querySelectorAll('[data-logout]').forEach((button) => {
    button.addEventListener('click', () => {
      window.UrbanThreads.storage.setCurrentUser(null);
      showToast('Đăng xuất thành công.');
      setTimeout(() => window.location.href = 'index.html', 600);
    });
  });
}

function showToast(message, tone = 'success') {
  const container = document.getElementById('toast-container') || document.body.appendChild(Object.assign(document.createElement('div'), { id: 'toast-container', className: 'toast-container' }));
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  toast.style.background = tone === 'error' ? '#d32f2f' : '#111111';
  container.appendChild(toast);
  setTimeout(() => {
    toast.remove();
  }, 2600);
}

function addToCart(productId, quantity = 1, selectedColor = '', selectedSize = '') {
  const cart = window.UrbanThreads.storage.getCart();
  const existing = cart.find((item) => item.productId === productId && item.color === selectedColor && item.size === selectedSize);

  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({
      id: `cart-${Date.now()}`,
      productId,
      color: selectedColor,
      size: selectedSize,
      quantity
    });
  }

  window.UrbanThreads.storage.setStorageData(window.UrbanThreads.storage.STORAGE_KEYS.CART, cart);
  updateAllBadges();
  showToast('Đã thêm vào giỏ hàng.');
}

function addToWishlist(productId) {
  const wishlist = window.UrbanThreads.storage.getWishlist();
  if (!wishlist.includes(productId)) {
    wishlist.push(productId);
    window.UrbanThreads.storage.setStorageData(window.UrbanThreads.storage.STORAGE_KEYS.WISHLIST, wishlist);
    updateAllBadges();
    showToast('Đã thêm vào yêu thích.');
  } else {
    showToast('Sản phẩm đã có trong danh sách yêu thích.');
  }
}

function updatePageTitle(title) {
  document.title = `${title} | Urban Threads`;
}

function applySettings() {
  const settings = window.UrbanThreads.storage.getSettings();
  document.body.classList.toggle('dark-mode', !!settings.darkMode);
}

document.addEventListener('DOMContentLoaded', () => {
  renderGlobalLayout();
  applySettings();
  const page = document.body.dataset.page;

  if (window.UrbanThreads.initHome && page === 'home') window.UrbanThreads.initHome();
  if (window.UrbanThreads.initShop && page === 'shop') window.UrbanThreads.initShop();
  if (window.UrbanThreads.initProductDetail && page === 'product-detail') window.UrbanThreads.initProductDetail();
  if (window.UrbanThreads.initWishlist && page === 'wishlist') window.UrbanThreads.initWishlist();
  if (window.UrbanThreads.initCart && page === 'cart') window.UrbanThreads.initCart();
  if (window.UrbanThreads.initCheckout && page === 'checkout') window.UrbanThreads.initCheckout();
  if (window.UrbanThreads.initOrderTracking && page === 'order-tracking') window.UrbanThreads.initOrderTracking();
  if (window.UrbanThreads.initNotifications && page === 'notifications') window.UrbanThreads.initNotifications();
  if (window.UrbanThreads.initProfile && page === 'profile') window.UrbanThreads.initProfile();
  if (window.UrbanThreads.initRegister && page === 'register') window.UrbanThreads.initRegister();
  if (window.UrbanThreads.initLogin && page === 'login') window.UrbanThreads.initLogin();
  if (window.UrbanThreads.initForgot && page === 'forgot-password') window.UrbanThreads.initForgot();
  if (window.UrbanThreads.initAdminDashboard && page === 'admin-dashboard') window.UrbanThreads.initAdminDashboard();
  if (window.UrbanThreads.initAdminProducts && page === 'admin-products') window.UrbanThreads.initAdminProducts();
  if (window.UrbanThreads.initAdminImei && page === 'admin-imei') window.UrbanThreads.initAdminImei();
  if (window.UrbanThreads.initAdminInvoices && page === 'admin-invoices') window.UrbanThreads.initAdminInvoices();
  if (window.UrbanThreads.initAdminCustomers && page === 'admin-customers') window.UrbanThreads.initAdminCustomers();
  if (window.UrbanThreads.initAdminVouchers && page === 'admin-vouchers') window.UrbanThreads.initAdminVouchers();
  if (window.UrbanThreads.initAdminRevenue && page === 'admin-revenue') window.UrbanThreads.initAdminRevenue();
});

window.UrbanThreads.app = {
  showToast,
  updateAllBadges,
  addToCart,
  addToWishlist,
  formatCurrency: window.UrbanThreads.storage.formatCurrency,
  getCurrentUser: window.UrbanThreads.storage.getCurrentUser,
  updatePageTitle
};
