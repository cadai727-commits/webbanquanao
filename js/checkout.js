window.UrbanThreads = window.UrbanThreads || {};

function getDeliveryOptions() {
  return [
    { id: 'standard', label: 'Giao hàng tiêu chuẩn', price: 30000, eta: '3-5 ngày làm việc' },
    { id: 'express', label: 'Giao hàng nhanh', price: 60000, eta: '2-3 ngày làm việc' },
    { id: 'priority', label: 'Giao hàng ưu tiên', price: 90000, eta: '1-2 ngày làm việc' }
  ];
}

function getPaymentOptions() {
  return [
    { id: 'cod', label: 'Thanh toán khi nhận hàng', note: 'Demo' },
    { id: 'bank', label: 'Chuyển khoản ngân hàng (demo)', note: 'Demo' },
    { id: 'wallet', label: 'Ví điện tử (demo)', note: 'Demo' }
  ];
}

function renderCheckoutPage() {
  const page = document.getElementById('page-content');
  if (!page) return;
  const cart = window.UrbanThreads.storage.getCart();
  const products = window.UrbanThreads.storage.getProducts();

  let subtotal = 0;
  cart.forEach((item) => {
    const product = products.find((entry) => entry.id === item.productId);
    if (product) subtotal += product.price * Number(item.quantity || 0);
  });

  const shipping = 30000;
  const total = subtotal + shipping;

  page.innerHTML = `
    <div class="container page-shell">
      <div class="topbar">
        <div class="breadcrumbs">
          <a href="cart.html">Giỏ hàng</a><span>/</span><span>Thanh toán</span>
        </div>
        <h1 style="font-size: 2.5rem;">Thanh toán</h1>
      </div>

      <div class="checkout-layout">
        <div class="checkout-card">
          <h3>Thông tin giao hàng</h3>
          <form id="checkout-form" style="margin-top: 20px;">
            <div class="form-grid">
              <div class="form-group">
                <label>Họ tên</label>
                <input name="fullName" required />
              </div>
              <div class="form-group">
                <label>Số điện thoại</label>
                <input name="phone" required />
              </div>
              <div class="form-group" style="grid-column: 1 / -1;">
                <label>Email</label>
                <input name="email" type="email" required />
              </div>
              <div class="form-group">
                <label>Tỉnh/Thành phố</label>
                <input name="province" required />
              </div>
              <div class="form-group">
                <label>Quận/Huyện</label>
                <input name="district" required />
              </div>
              <div class="form-group">
                <label>Phường/Xã</label>
                <input name="ward" required />
              </div>
              <div class="form-group" style="grid-column: 1 / -1;">
                <label>Địa chỉ</label>
                <input name="address" required />
              </div>
              <div class="form-group" style="grid-column: 1 / -1;">
                <label>Ghi chú đơn hàng</label>
                <textarea name="note" rows="4"></textarea>
              </div>
            </div>

            <h3 style="margin-top: 30px;">Phương thức vận chuyển</h3>
            <div class="form-row" style="margin-top: 16px; flex-wrap: wrap;">
              ${getDeliveryOptions().map((option) => `
                <label style="flex: 1; min-width: 180px; border:1px solid var(--color-border); padding: 14px; border-radius: 14px;">
                  <input type="radio" name="delivery" value="${option.id}" ${option.id === 'standard' ? 'checked' : ''} />
                  <strong>${option.label}</strong><br />
                  <span style="color: var(--color-muted);">${window.UrbanThreads.storage.formatCurrency(option.price)} • ${option.eta}</span>
                </label>
              `).join('')}
            </div>

            <h3 style="margin-top: 30px;">Phương thức thanh toán</h3>
            <div class="form-row" style="margin-top: 16px; flex-wrap: wrap;">
              ${getPaymentOptions().map((option) => `
                <label style="flex: 1; min-width: 180px; border:1px solid var(--color-border); padding: 14px; border-radius: 14px;">
                  <input type="radio" name="payment" value="${option.id}" ${option.id === 'cod' ? 'checked' : ''} />
                  <strong>${option.label}</strong><br />
                  <span style="color: var(--color-muted);">${option.note}</span>
                </label>
              `).join('')}
            </div>

            <div style="margin-top: 28px;">
              <input id="voucher-input" type="text" placeholder="Mã voucher" />
              <button type="button" class="btn btn-outline" id="apply-voucher" style="margin-top: 10px;">Áp dụng voucher</button>
            </div>

            <div style="margin-top: 22px; display:flex; justify-content:flex-end;">
              <button class="btn btn-primary" type="submit">Đặt hàng</button>
            </div>
          </form>
        </div>

        <aside class="summary-card">
          <h3>Tóm tắt đơn hàng</h3>
          <div class="summary-list" style="margin-top: 18px;">
            ${cart.map((item) => {
              const product = products.find((entry) => entry.id === item.productId);
              return product ? `<div class="summary-item"><span>${product.name} x ${item.quantity}</span><strong>${window.UrbanThreads.storage.formatCurrency(product.price * item.quantity)}</strong></div>` : '';
            }).join('')}
            <div class="summary-item"><span>Tạm tính</span><strong>${window.UrbanThreads.storage.formatCurrency(subtotal)}</strong></div>
            <div class="summary-item"><span>Phí vận chuyển</span><strong>${window.UrbanThreads.storage.formatCurrency(shipping)}</strong></div>
            <div class="summary-item"><span>Giảm giá</span><strong id="discount-value">- ${window.UrbanThreads.storage.formatCurrency(0)}</strong></div>
            <div class="summary-item total"><span>Tổng cộng</span><strong id="total-value">${window.UrbanThreads.storage.formatCurrency(total)}</strong></div>
          </div>
        </aside>
      </div>
    </div>
  `;

  const form = document.getElementById('checkout-form');
  const applyButton = document.getElementById('apply-voucher');
  let discount = 0;

  applyButton.addEventListener('click', () => {
    const code = document.getElementById('voucher-input').value.trim();
    const vouchers = window.UrbanThreads.storage.getVouchers();
    const voucher = vouchers.find((item) => item.id.toLowerCase() === code.toLowerCase() && item.active && new Date(item.endDate) >= new Date());
    if (!voucher) {
      window.UrbanThreads.app.showToast('Voucher không hợp lệ hoặc đã hết hạn.', 'error');
      discount = 0;
      return;
    }
    const subtotalValue = cart.reduce((sum, item) => sum + products.find((entry) => entry.id === item.productId).price * item.quantity, 0);
    if (voucher.minOrder > subtotalValue) {
      window.UrbanThreads.app.showToast('Giá trị đơn hàng chưa đủ để áp dụng voucher.', 'error');
      discount = 0;
      return;
    }
    discount = voucher.type === 'percent' ? Math.min((subtotalValue * voucher.value) / 100, voucher.maxDiscount || subtotalValue) : Math.min(voucher.value, voucher.maxDiscount || voucher.value);
    document.getElementById('discount-value').textContent = `- ${window.UrbanThreads.storage.formatCurrency(discount)}`;
    document.getElementById('total-value').textContent = window.UrbanThreads.storage.formatCurrency(subtotalValue + shipping - discount);
    window.UrbanThreads.app.showToast('Áp dụng voucher thành công.');
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!cart.length) {
      window.UrbanThreads.app.showToast('Giỏ hàng của bạn đang trống.', 'error');
      return;
    }

    const formData = new FormData(form);
    const delivery = formData.get('delivery');
    const payment = formData.get('payment');
    const orderData = {
      id: `UT-${Date.now()}`,
      customerName: formData.get('fullName'),
      phone: formData.get('phone'),
      email: formData.get('email'),
      address: `${formData.get('province')}, ${formData.get('district')}, ${formData.get('ward')}, ${formData.get('address')}`,
      note: formData.get('note') || '',
      shippingMethod: delivery,
      paymentMethod: payment,
      subtotal,
      shipping,
      discount,
      total: subtotal + shipping - discount,
      status: 'Waiting for confirmation',
      items: cart,
      createdAt: new Date().toISOString()
    };

    const orders = window.UrbanThreads.storage.getOrders();
    orders.push(orderData);
    window.UrbanThreads.storage.setStorageData(window.UrbanThreads.storage.STORAGE_KEYS.ORDERS, orders);
    window.UrbanThreads.storage.setStorageData(window.UrbanThreads.storage.STORAGE_KEYS.CART, []);
    window.UrbanThreads.app.updateAllBadges();
    window.UrbanThreads.app.showToast('Đặt hàng thành công.');
    setTimeout(() => window.location.href = `order-success.html?id=${orderData.id}`, 700);
  });
}

window.UrbanThreads.initCheckout = function () {
  renderCheckoutPage();
};
