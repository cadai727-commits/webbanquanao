window.UrbanThreads = window.UrbanThreads || {};

function renderOrderSuccessPage() {
  const page = document.getElementById('page-content');
  if (!page) return;

  const params = new URLSearchParams(window.location.search);
  const orderId = params.get('id');
  const orders = window.UrbanThreads.storage.getOrders();
  const latest = orderId ? orders.find((order) => order.id === orderId) : orders[orders.length - 1] || null;

  if (!latest) {
    page.innerHTML = '<div class="container page-shell"><div class="empty-state">Không tìm thấy đơn hàng.</div></div>';
    return;
  }

  page.innerHTML = `
    <div class="container page-shell">
      <div class="auth-card" style="max-width: 760px; margin: 0 auto; text-align:center;">
        <div class="section-tag">Hoàn tất</div>
        <h1 style="margin-top: 16px;">Đặt hàng thành công</h1>
        <p class="subtext">Đơn hàng ${latest.id} của bạn đang được xử lý.</p>
        <div class="summary-list" style="text-align:left; margin-top: 18px;">
          <div class="summary-item"><span>Mã đơn</span><strong>${latest.id}</strong></div>
          <div class="summary-item"><span>Ngày</span><strong>${new Date(latest.createdAt).toLocaleString('vi-VN')}</strong></div>
          <div class="summary-item"><span>Tổng</span><strong>${window.UrbanThreads.storage.formatCurrency(latest.total)}</strong></div>
          <div class="summary-item"><span>Thanh toán</span><strong>${latest.paymentMethod}</strong></div>
          <div class="summary-item"><span>Giao hàng</span><strong>${latest.address}</strong></div>
        </div>
        <div style="display:flex; justify-content:center; gap: 12px; margin-top: 24px; flex-wrap: wrap;">
          <a href="index.html" class="btn btn-primary">Tiếp tục mua sắm</a>
          <a href="order-tracking.html" class="btn btn-outline">Theo dõi đơn</a>
        </div>
      </div>
    </div>
  `;
}

function renderOrderTrackingPage() {
  const page = document.getElementById('page-content');
  if (!page) return;

  const orders = window.UrbanThreads.storage.getOrders();
  const listing = orders.length ? orders : [];

  page.innerHTML = `
    <div class="container page-shell">
      <div class="topbar">
        <div class="breadcrumbs">
          <a href="index.html">Trang chủ</a><span>/</span><span>Theo dõi đơn hàng</span>
        </div>
        <h1 style="font-size: 2.5rem;">Theo dõi đơn hàng</h1>
      </div>

      ${listing.length ? `
        <div class="panel">
          ${listing.map((order) => `
            <div style="padding: 20px; border-bottom: 1px solid var(--color-border);">
              <h3>${order.id}</h3>
              <p style="color: var(--color-muted);">${window.UrbanThreads.storage.formatCurrency(order.total)} • ${new Date(order.createdAt).toLocaleDateString('vi-VN')}</p>
              <div class="summary-list" style="margin-top: 12px;">
                <div class="summary-item"><span>Trạng thái</span><strong>${order.status}</strong></div>
              </div>
            </div>
          `).join('')}
        </div>
      ` : '<div class="empty-state">Chưa có đơn hàng nào được đặt.</div>'}
    </div>
  `;
}

window.UrbanThreads.initOrderSuccess = function () {
  renderOrderSuccessPage();
};

window.UrbanThreads.initOrderTracking = function () {
  renderOrderTrackingPage();
};
