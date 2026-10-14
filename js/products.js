window.UrbanThreads = window.UrbanThreads || {};

function getProductById(productId) {
  return window.UrbanThreads.storage.getProducts().find((product) => product.id === productId);
}

function renderStars(rating = 0) {
  return '&#9733;'.repeat(Math.round(rating));
}

function createProductCard(product) {
  const wishlist = window.UrbanThreads.storage.getWishlist();
  const isWishlisted = wishlist.includes(product.id);
  const salePercent = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
  return `
    <article class="product-card">
      <div class="product-image">
        <img src="${product.image}" alt="${product.name}" />
        <div class="product-badges">
          ${product.tags.includes('new') ? '<span class="badge badge-new">Mới</span>' : ''}
          ${product.tags.includes('bestseller') ? '<span class="badge badge-sale">Bán chạy</span>' : ''}
        </div>
        <div class="product-actions">
          <button class="icon-button add-to-wishlist" data-product-id="${product.id}" aria-label="Thêm vào yêu thích">
            <i class="${isWishlisted ? 'fa-solid fa-heart' : 'fa-regular fa-heart'}"></i>
          </button>
        </div>
      </div>
      <div class="product-body">
        <div class="product-category">${product.category}</div>
        <div class="product-name">${product.name}</div>
        <div class="product-price">
          <span class="price-current">${window.UrbanThreads.storage.formatCurrency(product.price)}</span>
          <span class="price-old">${window.UrbanThreads.storage.formatCurrency(product.originalPrice)}</span>
          <span class="price-discount">-${salePercent}%</span>
        </div>
        <div class="card-actions">
          <a href="product-detail.html?id=${product.id}" class="btn btn-outline btn-sm">Xem</a>
          <button class="btn btn-primary btn-sm add-to-cart" data-product-id="${product.id}">Thêm vào giỏ</button>
        </div>
      </div>
    </article>
  `;
}

function renderHome() {
  const products = window.UrbanThreads.storage.getProducts();
  const latest = products.slice(0, 4);
  const best = products.filter((product) => product.tags.includes('bestseller')).slice(0, 4);

  document.getElementById('page-content').innerHTML = `
    <section class="hero">
      <div class="container">
        <div class="hero-content">
          <span class="section-tag">Urban Streetwear</span>
          <h1>XÁC ĐỊNH PHONG CÁCH CỦA BẠN.</h1>
          <p>Trang phục hiện đại, phong cách sống động.</p>
          <div class="hero-actions">
            <a href="shop.html" class="btn btn-primary">MUA NGAY</a>
            <a href="shop.html" class="btn btn-outline" style="background: rgba(255,255,255,0.08); color: white; border-color: rgba(255,255,255,0.2);">KHÁM PHÁ BỘ SƯU TẬP</a>
          </div>
          <div class="hero-stats">
            <div class="stat-box"><strong>24K</strong><span>Người theo dõi</span></div>
            <div class="stat-box"><strong>120+</strong><span>Phong cách</span></div>
            <div class="stat-box"><strong>4.9</strong><span>Đánh giá</span></div>
          </div>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="section-header">
          <div>
            <span class="section-tag">Hàng mới</span>
            <h2 class="section-title">Bộ sưu tập mới</h2>
          </div>
          <a href="shop.html" class="btn btn-outline">Xem tất cả</a>
        </div>
        <div class="grid-4">
          ${latest.map(createProductCard).join('')}
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="section-header">
          <div>
            <span class="section-tag">Bán chạy</span>
            <h2 class="section-title">Yêu thích của khách hàng</h2>
          </div>
        </div>
        <div class="grid-4">
          ${best.map(createProductCard).join('')}
        </div>
      </div>
    </section>

    <section class="section" id="categories">
      <div class="container">
        <div class="section-header">
          <div>
            <span class="section-tag">Theo danh mục</span>
            <h2 class="section-title">Khám phá theo danh mục</h2>
          </div>
        </div>
        <div class="category-grid">
          ${['T-Shirts','Hoodies','Jackets','Pants','Jeans','Accessories'].map((category, index) => `
            <a href="shop.html?category=${encodeURIComponent(category)}" class="category-card">
              <i class="fa-solid ${['fa-shirt','fa-person-dress','fa-jacket','fa-masks-theater','fa-gem','fa-sunglasses'][index]}"></i>
              <h4>${category}</h4>
            </a>
          `).join('')}
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="featured-banner">
          <img src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1000&q=80" alt="Bộ sưu tập nổi bật" />
          <div>
            <span class="section-tag">Bộ sưu tập nổi bật</span>
            <h2 class="section-title" style="margin: 18px 0;">Hãy biến thành phố thành sàn diễn của bạn.</h2>
            <p style="color: var(--color-muted); margin-bottom: 18px;">Được làm từ nguyên liệu chất lượng cao, phù hợp cho mọi ngày.</p>
            <a href="shop.html" class="btn btn-primary">Khám phá ngay</a>
          </div>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="section-header">
          <div>
            <span class="section-tag">Xu hướng</span>
            <h2 class="section-title">Phong cách nổi bật</h2>
          </div>
        </div>
        <div class="grid-4">
          ${products.slice(2, 6).map(createProductCard).join('')}
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="newsletter-box">
          <div>
            <span class="section-tag">Thành viên</span>
            <h3 style="font-size: 2rem; margin-top: 12px;">Luôn cập nhật xu hướng mới.</h3>
          </div>
          <form class="newsletter-form" style="min-width: min(420px, 100%);">
            <input type="email" placeholder="Nhập email của bạn" />
            <button type="submit" class="btn btn-primary">Đăng ký</button>
          </form>
        </div>
      </div>
    </section>
  `;

  bindProductActions();
}

function renderShopPage() {
  const params = new URLSearchParams(window.location.search);
  const keyword = (params.get('q') || '').toLowerCase();
  const category = params.get('category') || '';
  const filter = params.get('filter') || '';
  let products = window.UrbanThreads.storage.getProducts();

  if (keyword) {
    products = products.filter((product) =>
      product.name.toLowerCase().includes(keyword) ||
      product.id.toLowerCase().includes(keyword) ||
      product.category.toLowerCase().includes(keyword)
    );
  }

  if (category) {
    products = products.filter((product) => product.category === category);
  }

  if (filter === 'new') {
    products = products.filter((product) => product.tags.includes('new'));
  }

  if (filter === 'bestseller') {
    products = products.filter((product) => product.tags.includes('bestseller'));
  }

  document.getElementById('page-content').innerHTML = `
    <div class="container page-shell">
      <div class="topbar">
        <div class="breadcrumbs">
          <a href="index.html">Trang chủ</a>
          <span>/</span>
          <span>Cửa hàng</span>
        </div>
        <h1 style="font-size: 2.4rem;">Mua sắm</h1>
      </div>

      <div class="filter-bar">
        <select id="filter-category">
          <option value="">Tất cả danh mục</option>
          <option value="T-Shirts">Áo thun</option>
          <option value="Hoodies">Áo khoác</option>
          <option value="Jackets">Áo khoác</option>
          <option value="Pants">Quần</option>
          <option value="Jeans">Quần jeans</option>
          <option value="Accessories">Phụ kiện</option>
        </select>
        <select id="filter-sort">
          <option value="">Sắp xếp</option>
          <option value="new">Mới nhất</option>
          <option value="asc">Giá thấp đến cao</option>
          <option value="desc">Giá cao đến thấp</option>
          <option value="name">Tên A-Z</option>
        </select>
      </div>

      <div class="grid-4">
        ${products.length ? products.map(createProductCard).join('') : '<div class="empty-state" style="grid-column: 1 / -1;">Không có sản phẩm phù hợp với tìm kiếm của bạn.</div>'}
      </div>
    </div>
  `;

  bindProductActions();
}

function renderProductDetail(productId) {
  const product = getProductById(productId);
  if (!product) {
    document.getElementById('page-content').innerHTML = '<div class="container page-shell"><div class="empty-state">Product not found.</div></div>';
    return;
  }

  const related = window.UrbanThreads.storage.getProducts().filter((item) => item.category === product.category && item.id !== product.id).slice(0, 4);
  document.getElementById('page-content').innerHTML = `
    <div class="container page-shell">
      <div class="breadcrumbs" style="margin-bottom: 24px;">
        <a href="index.html">Home</a><span>/</span><a href="shop.html">Shop</a><span>/</span><span>${product.name}</span>
      </div>
      <div class="grid-4" style="grid-template-columns: 1.2fr 1fr; align-items: start;">
        <div>
          <div class="product-image" style="min-height: 620px; border-radius: 22px; overflow: hidden;">
            <img src="${product.gallery[0]}" alt="${product.name}" id="detail-main-image" />
          </div>
          <div class="grid-4" style="margin-top: 16px; grid-template-columns: repeat(2, minmax(0, 1fr));">
            ${product.gallery.map((image, index) => `
              <button class="thumb-btn" data-image="${image}" style="padding:0; border-radius:14px; overflow:hidden; border:1px solid var(--color-border); background: white;">
                <img src="${image}" alt="${product.name} ${index + 1}" style="height: 180px; object-fit: cover; width: 100%;" />
              </button>
            `).join('')}
          </div>
        </div>

        <div>
          <div class="product-category">${product.category}</div>
          <h1 style="font-size: 2.8rem; line-height: 1; margin: 10px 0 14px;">${product.name}</h1>
          <div class="product-price">
            <span class="price-current">${window.UrbanThreads.storage.formatCurrency(product.price)}</span>
            <span class="price-old">${window.UrbanThreads.storage.formatCurrency(product.originalPrice)}</span>
            <span class="price-discount">-${Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%</span>
          </div>
          <p style="margin: 18px 0; color: var(--color-muted);">${product.description}</p>
          <div>Đánh giá: <strong>${product.rating}</strong> <span style="color: var(--color-warning);">★★★★★</span></div>

          <div style="margin-top: 24px;">
            <label>Màu sắc</label>
            <div class="filter-bar" style="margin-top: 10px;">
              ${product.colors.map((color) => `<button class="btn btn-outline btn-sm choose-color" data-color="${color}">${color}</button>`).join('')}
            </div>
          </div>

          <div style="margin-top: 20px;">
            <label>Kích thước</label>
            <div class="filter-bar" style="margin-top: 10px;">
              ${product.sizes.map((size) => `<button class="btn btn-outline btn-sm choose-size" data-size="${size}">${size}</button>`).join('')}
            </div>
          </div>

          <div style="margin-top: 22px; display: flex; gap: 12px; align-items: center;">
            <div class="cart-qty" style="padding: 0.5rem 0.8rem;">
              <button type="button" data-qty-change="decrease">−</button>
              <span id="detail-qty">1</span>
              <button type="button" data-qty-change="increase">+</button>
            </div>
            <button class="btn btn-primary" id="detail-add-cart">Thêm vào giỏ</button>
            <button class="btn btn-outline" id="detail-wishlist">Yêu thích</button>
          </div>

          <div class="notice-box" style="margin-top: 18px;">Còn hàng: ${product.stock} sản phẩm</div>

          <ul style="margin-top: 20px; color: var(--color-muted); display: grid; gap: 8px;">
            ${product.features.map((feature) => `<li>• ${feature}</li>`).join('')}
          </ul>
        </div>
      </div>

      <div style="margin-top: 52px;">
        <div class="section-header">
          <div>
            <span class="section-tag">Sản phẩm liên quan</span>
            <h2 class="section-title">Có thể bạn cũng thích</h2>
          </div>
        </div>
        <div class="grid-4">
          ${related.map(createProductCard).join('')}
        </div>
      </div>
    </div>
  `;

  let selectedColor = product.colors[0];
  let selectedSize = product.sizes[0];
  let qty = 1;

  document.querySelectorAll('.choose-color').forEach((button) => {
    button.addEventListener('click', () => {
      selectedColor = button.dataset.color;
      document.querySelectorAll('.choose-color').forEach((el) => el.classList.remove('btn-primary'));
      button.classList.add('btn-primary');
    });
  });

  document.querySelectorAll('.choose-size').forEach((button) => {
    button.addEventListener('click', () => {
      selectedSize = button.dataset.size;
      document.querySelectorAll('.choose-size').forEach((el) => el.classList.remove('btn-primary'));
      button.classList.add('btn-primary');
    });
  });

  document.querySelectorAll('[data-qty-change]').forEach((button) => {
    button.addEventListener('click', () => {
      const change = button.dataset.qtyChange === 'increase' ? 1 : -1;
      qty = Math.max(1, Math.min(product.stock, qty + change));
      document.getElementById('detail-qty').textContent = qty;
    });
  });

  document.getElementById('detail-add-cart').addEventListener('click', () => {
    if (!selectedColor || !selectedSize) {
      window.UrbanThreads.app.showToast('Vui lòng chọn màu sắc và kích thước.', 'error');
      return;
    }
    window.UrbanThreads.app.addToCart(product.id, qty, selectedColor, selectedSize);
  });

  document.getElementById('detail-wishlist').addEventListener('click', () => {
    window.UrbanThreads.app.addToWishlist(product.id);
  });

  document.querySelectorAll('.thumb-btn').forEach((button) => {
    button.addEventListener('click', () => {
      document.getElementById('detail-main-image').src = button.dataset.image;
    });
  });

  bindProductActions();
}

function bindProductActions() {
  document.querySelectorAll('.add-to-cart').forEach((button) => {
    button.addEventListener('click', (event) => {
      event.preventDefault();
      const productId = button.dataset.productId;
      const product = getProductById(productId);
      if (!product) return;
      window.UrbanThreads.app.addToCart(productId, 1, product.colors[0], product.sizes[0]);
    });
  });

  document.querySelectorAll('.add-to-wishlist').forEach((button) => {
    button.addEventListener('click', (event) => {
      event.preventDefault();
      const productId = button.dataset.productId;
      window.UrbanThreads.app.addToWishlist(productId);
      const icon = button.querySelector('i');
      icon.classList.remove('fa-regular');
      icon.classList.add('fa-solid');
    });
  });
}

window.UrbanThreads.initHome = function () {
  window.UrbanThreads.app.updatePageTitle('Trang chủ');
  renderHome();
};

window.UrbanThreads.initShop = function () {
  window.UrbanThreads.app.updatePageTitle('Cửa hàng');
  renderShopPage();
};

window.UrbanThreads.initProductDetail = function () {
  const params = new URLSearchParams(window.location.search);
  const productId = params.get('id');
  window.UrbanThreads.app.updatePageTitle(productId ? 'Chi tiết sản phẩm' : 'Sản phẩm');
  renderProductDetail(productId || 'UT-1001');
};

window.UrbanThreads.products = {
  getProductById,
  renderHome,
  renderShopPage,
  renderProductDetail,
  bindProductActions
};
