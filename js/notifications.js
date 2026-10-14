window.UrbanThreads = window.UrbanThreads || {};

function renderNotificationsPage() {
  const page = document.getElementById('page-content');
  if (!page) return;

  const notifications = window.UrbanThreads.storage.getNotifications();

  page.innerHTML = `
    <div class="container page-shell">
      <div class="topbar">
        <div class="breadcrumbs">
          <a href="index.html">Trang chủ</a><span>/</span><span>Thông báo</span>
        </div>
        <h1 style="font-size: 2.5rem;">Trung tâm thông báo</h1>
      </div>

      <div class="panel">
        <div class="admin-actions" style="margin-bottom: 18px;">
          <button class="btn btn-outline btn-sm" id="mark-all-read">Đánh dấu đã đọc tất cả</button>
        </div>
        <div>
          ${notifications.length ? notifications.map((item) => `
            <div style="padding: 18px; border-bottom: 1px solid var(--color-border); display:flex; justify-content:space-between; gap: 12px; align-items:start;">
              <div>
                <strong>${item.title}</strong>
                <p style="color: var(--color-muted); margin-top: 6px;">${item.message}</p>
                <small style="color: var(--color-muted);">${new Date(item.createdAt).toLocaleString('vi-VN')}</small>
              </div>
              <div class="admin-actions">
                <button class="btn btn-outline btn-sm mark-read" data-id="${item.id}">${item.read ? 'Đã đọc' : 'Đánh dấu đã đọc'}</button>
              </div>
            </div>
          `).join('') : '<div class="empty-state">Hiện không có thông báo nào.</div>'}
        </div>
      </div>
    </div>
  `;

  document.getElementById('mark-all-read')?.addEventListener('click', () => {
    const list = window.UrbanThreads.storage.getNotifications().map((item) => ({ ...item, read: true }));
    window.UrbanThreads.storage.setStorageData(window.UrbanThreads.storage.STORAGE_KEYS.NOTIFICATIONS, list);
    renderNotificationsPage();
  });

  document.querySelectorAll('.mark-read').forEach((button) => {
    button.addEventListener('click', () => {
      const list = window.UrbanThreads.storage.getNotifications().map((item) => item.id === button.dataset.id ? { ...item, read: true } : item);
      window.UrbanThreads.storage.setStorageData(window.UrbanThreads.storage.STORAGE_KEYS.NOTIFICATIONS, list);
      renderNotificationsPage();
    });
  });
}

window.UrbanThreads.initNotifications = function () {
  renderNotificationsPage();
};
