window.UrbanThreads = window.UrbanThreads || {};

function calculateCartTotals() {
  const cart = window.UrbanThreads.storage.getCart();
  const products = window.UrbanThreads.storage.getProducts();

  let subtotal = 0;
  cart.forEach((item) => {
    const product = products.find((entry) => entry.id === item.productId);
    if (!product) return;
    subtotal += product.price * Number(item.quantity || 0);
  });

  const shipping = subtotal > 1500000 ? 0 : 30000;
  const total = subtotal + shipping;

  return { subtotal, shipping, total, itemCount: cart.reduce((sum, item) => sum + Number(item.quantity || 0), 0) };
}

function renderCartPage() {
  const page = document.getElementById('page-content');
  if (!page) return;

  const cart = window.UrbanThreads.storage.getCart();
  const products = window.UrbanThreads.storage.getProducts();
  const totals = calculateCartTotals();

  page.innerHTML = `
    <div class="container page-shell">
      <div class="topbar">
        <div class="breadcrumbs">
          <a href="index.html">Trang chủ</a><span>/</span><span>Giỏ hàng</span>
        </div>
        <h1 style="font-size: 2.5rem;">Giỏ hàng</h1>
      </div>

      ${cart.length ? `
        <div class="checkout-layout">
          <div>
            ${cart.map((item) => {
              const product = products.find((entry) => entry.id === item.productId);
              if (!product) return '';
              const lineTotal = product.price * Number(item.quantity || 0);
              return `
                <div class="cart-item">
                  <img src="${product.image}" alt="${product.name}" />
                  <div>
                    <h3>${product.name}</h3>
                    <p style="color: var(--color-muted);">${product.category} • ${item.color || product.colors[0]} • ${item.size || product.sizes[0]}</p>
                    <div style="margin-top: 10px; display:flex; gap: 10px; align-items:center;">
                      <div class="cart-qty">
                        <button type="button" data-cart-action="decrease" data-id="${item.id}">−</button>
                        <span>${item.quantity}</span>
                        <button type="button" data-cart-action="increase" data-id="${item.id}">+</button>
                      </div>
                      <button class="btn btn-outline btn-sm" data-cart-action="remove" data-id="${item.id}">Xóa</button>
                    </div>
                  </div>
                  <div style="font-weight:800;">${window.UrbanThreads.storage.formatCurrency(lineTotal)}</div>
                </div>
              `;
            }).join('')}
          </div>

          <aside class="summary-card">
            <h3>Tóm tắt đơn hàng</h3>
            <div class="summary-list" style="margin-top: 18px;">
              <div class="summary-item"><span>Số lượng</span><strong>${totals.itemCount}</strong></div>
              <div class="summary-item"><span>Tạm tính</span><strong>${window.UrbanThreads.storage.formatCurrency(totals.subtotal)}</strong></div>
              <div class="summary-item"><span>Phí vận chuyển</span><strong>${window.UrbanThreads.storage.formatCurrency(totals.shipping)}</strong></div>
              <div class="summary-item total"><span>Tổng cộng</span><strong>${window.UrbanThreads.storage.formatCurrency(totals.total)}</strong></div>
            </div>
            <div style="margin-top: 18px; display:flex; flex-direction:column; gap:10px;">
              <a href="shop.html" class="btn btn-outline">Tiếp tục mua sắm</a>
              <a href="checkout.html" class="btn btn-primary">Thanh toán</a>
            </div>
          </aside>
        </div>
      ` : `<div class="empty-state">Giỏ hàng của bạn đang trống. <a href="shop.html">Mua sắm ngay.</a></div>`}
    </div>
  `;

  document.querySelectorAll('[data-cart-action]').forEach((button) => {
    const id = button.dataset.id;
    const action = button.dataset.cartAction;

    button.addEventListener('click', () => {
      const cart = window.UrbanThreads.storage.getCart();
      const index = cart.findIndex((item) => item.id === id);
      if (index === -1) return;
      if (action === 'increase') cart[index].quantity += 1;
      if (action === 'decrease') cart[index].quantity = Math.max(1, cart[index].quantity - 1);
      if (action === 'remove') cart.splice(index, 1);
      window.UrbanThreads.storage.setStorageData(window.UrbanThreads.storage.STORAGE_KEYS.CART, cart);
      window.UrbanThreads.app.updateAllBadges();
      renderCartPage();
    });
  });
}

window.UrbanThreads.initCart = function () {
  renderCartPage();
};
