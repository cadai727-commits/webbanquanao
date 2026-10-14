window.UrbanThreads = window.UrbanThreads || {};

function buildAdminSidebar() {
  const menu = [
    { label: 'Bảng điều khiển', href: 'dashboard.html', icon: 'fa-gauge-medium' },
    { label: 'Sản phẩm', href: 'products.html', icon: 'fa-box' },
    { label: 'IMEI', href: 'imei.html', icon: 'fa-barcode' },
    { label: 'Hóa đơn', href: 'invoices.html', icon: 'fa-receipt' },
    { label: 'Khách hàng', href: 'customers.html', icon: 'fa-users' },
    { label: 'Voucher', href: 'vouchers.html', icon: 'fa-ticket' },
    { label: 'Doanh thu', href: 'revenue.html', icon: 'fa-chart-column' },
    { label: 'Đăng xuất', href: '../index.html', icon: 'fa-right-from-bracket', logout: true }
  ];

  return `
    <div class="admin-page">
      <div class="admin-layout">
        <aside class="admin-sidebar">
          <div class="admin-brand">
            <span class="brand-mark">UT</span>
            <span>Urban Threads</span>
          </div>
          <nav class="admin-nav">
            ${menu.map((item) => `
              <a href="${item.href}" class="${window.location.pathname.endsWith(item.href) ? 'active' : ''}" ${item.logout ? 'data-logout="true"' : ''}>
                <i class="fa-solid ${item.icon}"></i>
                <span>${item.label}</span>
              </a>
            `).join('')}
          </nav>
        </aside>
        <main class="admin-main">
          <div class="admin-topbar">
            <div>
              <h2 style="font-size: 2rem; margin-bottom: 8px;">Quản trị</h2>
              <p style="color: var(--color-muted);">Bảng điều khiển quản lý</p>
            </div>
            <div class="admin-actions">
              <button class="btn btn-outline btn-sm">Xuất</button>
              <button class="btn btn-primary btn-sm">Đơn mới</button>
            </div>
          </div>
          <div class="admin-content">
  `;
}

function closeAdminShell() {
  return `
          </div>
        </main>
      </div>
    </div>
  `;
}

function renderDashboard() {
  const products = window.UrbanThreads.storage.getProducts();
  const orders = window.UrbanThreads.storage.getOrders();
  const users = window.UrbanThreads.storage.getUsers();
  const totalRevenue = orders.filter((order) => order.status !== 'Cancelled').reduce((sum, order) => sum + Number(order.total || 0), 0);

  const markup = `
    ${buildAdminSidebar()}
      <div class="kpi-grid">
        <div class="kpi-card">
          <div class="kpi-label">Doanh thu</div>
          <div class="kpi-value">${window.UrbanThreads.storage.formatCurrency(totalRevenue)}</div>
        </div>
        <div class="kpi-card">
          <div class="kpi-label">Đơn hàng</div>
          <div class="kpi-value">${orders.length}</div>
        </div>
        <div class="kpi-card">
          <div class="kpi-label">Sản phẩm</div>
          <div class="kpi-value">${products.length}</div>
        </div>
        <div class="kpi-card">
          <div class="kpi-label">Khách hàng</div>
          <div class="kpi-value">${users.length}</div>
        </div>
      </div>

      <div class="panel" style="margin-top: 24px;">
        <canvas id="revenueChart"></canvas>
      </div>

      <div class="panel" style="margin-top: 24px;">
        <h3>Đơn hàng gần đây</h3>
        <table class="admin-table" style="margin-top: 16px;">
          <thead>
            <tr>
              <th>Mã đơn</th>
              <th>Khách hàng</th>
              <th>Tổng</th>
              <th>Trạng thái</th>
            </tr>
          </thead>
          <tbody>
            ${orders.slice(-5).reverse().map((order) => `
              <tr>
                <td>${order.id}</td>
                <td>${order.customerName || 'Khách'}</td>
                <td>${window.UrbanThreads.storage.formatCurrency(order.total)}</td>
                <td><span class="status-pill confirmed">${order.status}</span></td>
              </tr>
            `).join('') || '<tr><td colspan="4">Chưa có đơn hàng nào.</td></tr>'}
          </tbody>
        </table>
      </div>
    ${closeAdminShell()}
  `;

  const page = document.getElementById('page-content');
  if (page) page.innerHTML = markup;

  const canvas = document.getElementById('revenueChart');
  if (canvas && window.Chart) {
    new Chart(canvas, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
          label: 'Revenue',
          data: [1200000, 1800000, 2300000, 2600000, 3200000, 3900000],
          borderColor: '#111111',
          backgroundColor: 'rgba(200,255,0,0.18)',
          fill: true,
          tension: 0.35
        }]
      },
      options: { responsive: true, maintainAspectRatio: false }
    });
  }

  document.querySelectorAll('[data-logout]').forEach((button) => {
    button.addEventListener('click', (event) => {
      event.preventDefault();
      window.UrbanThreads.storage.setCurrentUser(null);
      window.location.href = '../index.html';
    });
  });
}

function renderProductsTable() {
  const products = window.UrbanThreads.storage.getProducts();
  const page = document.getElementById('page-content');
  if (!page) return;

  page.innerHTML = `
    ${buildAdminSidebar()}
      <div class="panel">
        <div class="admin-actions" style="justify-content: space-between; align-items:center; margin-bottom: 18px;">
          <h3>Sản phẩm</h3>
          <a class="btn btn-primary btn-sm" href="product-form.html">Thêm sản phẩm</a>
        </div>
        <div class="filter-bar">
          <input type="text" placeholder="Tìm sản phẩm" />
          <select>
            <option>Tất cả danh mục</option>
            <option>Áo thun</option>
            <option>Áo khoác</option>
            <option>Áo khoác</option>
            <option>Quần</option>
            <option>Quần jeans</option>
            <option>Phụ kiện</option>
          </select>
        </div>
        <table class="admin-table">
          <thead>
            <tr>
              <th>Mã</th>
              <th>Hình ảnh</th>
              <th>Tên</th>
              <th>Danh mục</th>
              <th>Giá</th>
              <th>Tồn kho</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            ${products.map((product) => `
              <tr>
                <td>${product.id}</td>
                <td><img class="product-thumb" src="${product.image}" alt="${product.name}" /></td>
                <td>${product.name}</td>
                <td>${product.category}</td>
                <td>${window.UrbanThreads.storage.formatCurrency(product.price)}</td>
                <td>${product.stock}</td>
                <td><button class="btn btn-outline btn-sm">Sửa</button></td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    ${closeAdminShell()}
  `;
}

function renderImeiPage() {
  const page = document.getElementById('page-content');
  if (!page) return;
  page.innerHTML = `${buildAdminSidebar()}<div class="panel"><h3>Quản lý IMEI</h3><div class="notice-box">Hệ thống nhập từ Excel và kiểm tra dữ liệu demo đã sẵn sàng.</div><button class="btn btn-primary btn-sm">Tải Excel</button></div>${closeAdminShell()}`;
}

function renderInvoicesPage() {
  const page = document.getElementById('page-content');
  if (!page) return;
  page.innerHTML = `${buildAdminSidebar()}<div class="panel"><h3>Hóa đơn</h3><div class="notice-box">Quy trình hóa đơn và trạng thái thanh toán được mô phỏng trong demo.</div><a href="invoice-create.html" class="btn btn-primary btn-sm">Hóa đơn mới</a></div>${closeAdminShell()}`;
}

function renderCustomersPage() {
  const users = window.UrbanThreads.storage.getUsers();
  const page = document.getElementById('page-content');
  if (!page) return;
  page.innerHTML = `${buildAdminSidebar()}<div class="panel"><h3>Khách hàng</h3><table class="admin-table"><thead><tr><th>Họ tên</th><th>Email</th><th>Điện thoại</th><th>Vai trò</th></tr></thead><tbody>${users.map((user) => `<tr><td>${user.fullName}</td><td>${user.email}</td><td>${user.phone}</td><td>${user.role}</td></tr>`).join('')}</tbody></table></div>${closeAdminShell()}`;
}

function renderVouchersPage() {
  const vouchers = window.UrbanThreads.storage.getVouchers();
  const page = document.getElementById('page-content');
  if (!page) return;
  page.innerHTML = `${buildAdminSidebar()}<div class="panel"><h3>Voucher</h3><table class="admin-table"><thead><tr><th>ID</th><th>Tên</th><th>Loại</th><th>Giá trị</th><th>Trạng thái</th></tr></thead><tbody>${vouchers.map((voucher) => `<tr><td>${voucher.id}</td><td>${voucher.name}</td><td>${voucher.type}</td><td>${voucher.value}</td><td>${voucher.active ? 'Hoạt động' : 'Không hoạt động'}</td></tr>`).join('')}</tbody></table></div>${closeAdminShell()}`;
}

function renderRevenuePage() {
  const page = document.getElementById('page-content');
  if (!page) return;
  page.innerHTML = `${buildAdminSidebar()}<div class="panel"><h3>Phân tích doanh thu</h3><div class="notice-box">Biểu đồ doanh thu được cập nhật dựa trên dữ liệu đơn hàng trong demo.</div><canvas id="revenueCanvas"></canvas></div>${closeAdminShell()}`;
  if (window.Chart) {
    const canvas = document.getElementById('revenueCanvas');
    if (canvas) {
      new Chart(canvas, { type: 'bar', data: { labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'], datasets: [{ label: 'Sales', data: [1200000, 1700000, 1400000, 2500000, 2800000, 3200000], backgroundColor: '#c8ff00' }] }, options: { responsive: true } });
    }
  }
}

window.UrbanThreads.initAdminDashboard = function () {
  renderDashboard();
};

window.UrbanThreads.initAdminProducts = function () {
  renderProductsTable();
};

window.UrbanThreads.initAdminImei = function () {
  renderImeiPage();
};

window.UrbanThreads.initAdminInvoices = function () {
  renderInvoicesPage();
};

window.UrbanThreads.initAdminCustomers = function () {
  renderCustomersPage();
};

window.UrbanThreads.initAdminVouchers = function () {
  renderVouchersPage();
};

window.UrbanThreads.initAdminRevenue = function () {
  renderRevenuePage();
};
