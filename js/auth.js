window.UrbanThreads = window.UrbanThreads || {};

function getUserByEmail(email) {
  return window.UrbanThreads.storage.getUsers().find((user) => user.email.toLowerCase() === String(email).toLowerCase());
}

window.UrbanThreads.initRegister = function () {
  const form = document.getElementById('register-form');
  if (!form) return;

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const fullName = document.getElementById('full-name').value.trim();
    const email = document.getElementById('register-email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const password = document.getElementById('register-password').value;
    const confirm = document.getElementById('confirm-password').value;
    const terms = document.getElementById('terms').checked;

    const users = window.UrbanThreads.storage.getUsers();
    if (!fullName || !window.UrbanThreads.validation.required(fullName)) {
      window.UrbanThreads.validation.setError(document.getElementById('full-name'), 'Vui lòng nhập họ tên.');
      return;
    }
    if (!window.UrbanThreads.validation.email(email)) {
      window.UrbanThreads.validation.setError(document.getElementById('register-email'), 'Email không hợp lệ.');
      return;
    }
    if (users.some((user) => user.email.toLowerCase() === email.toLowerCase())) {
      window.UrbanThreads.validation.setError(document.getElementById('register-email'), 'Email này đã được đăng ký.');
      return;
    }
    if (!window.UrbanThreads.validation.phone(phone)) {
      window.UrbanThreads.validation.setError(document.getElementById('phone'), 'Số điện thoại không hợp lệ.');
      return;
    }
    if (!window.UrbanThreads.validation.password(password)) {
      window.UrbanThreads.validation.setError(document.getElementById('register-password'), 'Mật khẩu phải có ít nhất 8 ký tự.');
      return;
    }
    if (password !== confirm) {
      window.UrbanThreads.validation.setError(document.getElementById('confirm-password'), 'Mật khẩu xác nhận không khớp.');
      return;
    }
    if (!terms) {
      window.UrbanThreads.app.showToast('Vui lòng đồng ý với điều khoản.', 'error');
      return;
    }

    users.push({
      id: window.UrbanThreads.storage.generateId('user'),
      fullName,
      email,
      phone,
      password,
      role: 'Customer',
      status: 'active',
      createdAt: new Date().toISOString()
    });

    window.UrbanThreads.storage.setStorageData(window.UrbanThreads.storage.STORAGE_KEYS.USERS, users);
    window.UrbanThreads.app.showToast('Đăng ký thành công.');
    form.reset();
    setTimeout(() => window.location.href = 'login.html', 700);
  });
};

window.UrbanThreads.initLogin = function () {
  const form = document.getElementById('login-form');
  if (!form) return;

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const inputValue = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value;

    const matchedUser = window.UrbanThreads.storage.getUsers().find((user) => {
      const loginMatches = user.email.toLowerCase() === inputValue.toLowerCase() || user.fullName.toLowerCase() === inputValue.toLowerCase();
      return loginMatches && user.password === password;
    });

    if (!matchedUser) {
      window.UrbanThreads.app.showToast('Thông tin đăng nhập không đúng.', 'error');
      return;
    }

    window.UrbanThreads.storage.setCurrentUser(matchedUser);
    showToast('Đăng nhập thành công.');
    setTimeout(() => {
      if (matchedUser.role === 'Admin' || matchedUser.role === 'Staff') {
        window.location.href = 'admin/dashboard.html';
      } else {
        window.location.href = 'index.html';
      }
    }, 600);
  });

  document.querySelectorAll('.toggle-password').forEach((button) => {
    button.addEventListener('click', () => {
      const input = document.getElementById(button.dataset.target);
      const isPassword = input.type === 'password';
      input.type = isPassword ? 'text' : 'password';
      button.textContent = isPassword ? 'Ẩn' : 'Hiện';
    });
  });
};

window.UrbanThreads.initForgot = function () {
  const form = document.getElementById('forgot-form');
  if (!form) return;

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const email = document.getElementById('forgot-email').value.trim();
    if (!window.UrbanThreads.validation.email(email)) {
      window.UrbanThreads.validation.setError(document.getElementById('forgot-email'), 'Email không hợp lệ.');
      return;
    }

    const existing = getUserByEmail(email);
    if (!existing) {
      window.UrbanThreads.validation.setError(document.getElementById('forgot-email'), 'Email chưa được đăng ký.');
      return;
    }

    window.UrbanThreads.validation.clearError(document.getElementById('forgot-email'));
    window.UrbanThreads.app.showToast(`Hướng dẫn khôi phục đã sẵn sàng cho ${existing.email}. Đây là phiên bản demo.`);
    form.reset();
  });
};

window.UrbanThreads.auth = {
  getUserByEmail
};
