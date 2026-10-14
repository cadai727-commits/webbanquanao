window.UrbanThreads = window.UrbanThreads || {};

function renderProfilePage() {
  const page = document.getElementById('page-content');
  if (!page) return;

  const user = window.UrbanThreads.storage.getCurrentUser() || window.UrbanThreads.storage.getUsers()[0];
  const settings = window.UrbanThreads.storage.getSettings();

  page.innerHTML = `
    <div class="container page-shell">
      <div class="topbar">
        <div class="breadcrumbs">
          <a href="index.html">Trang chủ</a><span>/</span><span>Tài khoản</span>
        </div>
        <h1 style="font-size: 2.5rem;">Hồ sơ của tôi</h1>
      </div>
      <div class="checkout-layout">
        <div class="panel">
          <h3>Thông tin cá nhân</h3>
          <div class="form-grid" style="margin-top: 18px;">
            <div class="form-group">
              <label>Họ tên</label>
              <input id="profile-name" value="${user.fullName}" />
            </div>
            <div class="form-group">
              <label>Email</label>
              <input id="profile-email" value="${user.email}" />
            </div>
            <div class="form-group">
              <label>Số điện thoại</label>
              <input id="profile-phone" value="${user.phone}" />
            </div>
            <div class="form-group">
              <label>Ngày sinh</label>
              <input type="date" id="profile-dob" value="" />
            </div>
          </div>
          <button class="btn btn-primary" id="save-profile" style="margin-top: 16px;">Cập nhật hồ sơ</button>
        </div>

        <div class="panel">
          <h3>Cài đặt</h3>
          <div style="display:grid; gap: 14px; margin-top:18px;">
            <label><input type="checkbox" id="setting-email" ${settings.emailNotifications ? 'checked' : ''} /> Thông báo qua email</label>
            <label><input type="checkbox" id="setting-dark" ${settings.darkMode ? 'checked' : ''} /> Chế độ tối</label>
            <label><input type="checkbox" id="setting-show-wishlist" ${settings.showWishlist ? 'checked' : ''} /> Hiển thị danh sách yêu thích</label>
            <button class="btn btn-outline" id="save-settings">Lưu cài đặt</button>
          </div>
        </div>
      </div>
    </div>
  `;

  document.getElementById('save-profile').addEventListener('click', () => {
    const users = window.UrbanThreads.storage.getUsers();
    const target = users.find((entry) => entry.id === user.id) || users[0];
    target.fullName = document.getElementById('profile-name').value.trim();
    target.email = document.getElementById('profile-email').value.trim();
    target.phone = document.getElementById('profile-phone').value.trim();
    window.UrbanThreads.storage.setStorageData(window.UrbanThreads.storage.STORAGE_KEYS.USERS, users);
    window.UrbanThreads.storage.setCurrentUser(target);
    window.UrbanThreads.app.showToast('Cập nhật hồ sơ thành công.');
  });

  document.getElementById('save-settings').addEventListener('click', () => {
    const settingsData = window.UrbanThreads.storage.getSettings();
    settingsData.darkMode = document.getElementById('setting-dark').checked;
    settingsData.emailNotifications = document.getElementById('setting-email').checked;
    settingsData.showWishlist = document.getElementById('setting-show-wishlist').checked;
    window.UrbanThreads.storage.setStorageData(window.UrbanThreads.storage.STORAGE_KEYS.SETTINGS, settingsData);
    window.UrbanThreads.app.showToast('Đã lưu cài đặt.');
    window.location.reload();
  });
}

window.UrbanThreads.initProfile = function () {
  renderProfilePage();
};
