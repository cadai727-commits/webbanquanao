window.UrbanThreads = window.UrbanThreads || {};

function renderWishlistPage() {
  const products = window.UrbanThreads.storage.getProducts();
  const wishlist = window.UrbanThreads.storage.getWishlist();
  const items = products.filter((item) => wishlist.includes(item.id));

  const page = document.getElementById('page-content');
  if (!page) return;

  page.innerHTML = `
    <div class="container page-shell">
      <div class="topbar">
        <div class="breadcrumbs">
          <a href="index.html">Trang chủ</a>
          <span>/</span>
          <span>Yêu thích</span>
        </div>
        <h1 style="font-size: 2.5rem;">Danh sách yêu thích</h1>
      </div>

      ${items.length ? `
        <div class="grid-4">
          ${items.map((product) => `
            <article class="product-card">
              <div class="product-image">
                <img src="${product.image}" alt="${product.name}" />
                <div class="product-actions">
                  <button class="icon-button remove-from-wishlist" data-product-id="${product.id}"><i class="fa-solid fa-xmark"></i></button>
                </div>
              </div>
              <div class="product-body">
                <div class="product-category">${product.category}</div>
                <div class="product-name">${product.name}</div>
                <div class="product-price">
                  <span class="price-current">${window.UrbanThreads.storage.formatCurrency(product.price)}</span>
                  <span class="price-old">${window.UrbanThreads.storage.formatCurrency(product.originalPrice)}</span>
                </div>
                <div class="card-actions">
                  <a href="product-detail.html?id=${product.id}" class="btn btn-outline btn-sm">Chi tiết</a>
                  <button class="btn btn-primary btn-sm add-to-cart" data-product-id="${product.id}">Thêm vào giỏ</button>
                </div>
              </div>
            </article>
          `).join('')}
        </div>
      ` : `<div class="empty-state">Danh sách yêu thích của bạn đang trống. Khám phá các bộ sưu tập mới nhất.</div>`}
    </div>
  `;

  document.querySelectorAll('.remove-from-wishlist').forEach((button) => {
    button.addEventListener('click', () => {
      const id = button.dataset.productId;
      const wishlist = window.UrbanThreads.storage.getWishlist().filter((item) => item !== id);
      window.UrbanThreads.storage.setStorageData(window.UrbanThreads.storage.STORAGE_KEYS.WISHLIST, wishlist);
      window.UrbanThreads.app.updateAllBadges();
      renderWishlistPage();
    });
  });

  document.querySelectorAll('.add-to-cart').forEach((button) => {
    button.addEventListener('click', () => {
      const product = window.UrbanThreads.storage.getProducts().find((item) => item.id === button.dataset.productId);
      if (product) {
        window.UrbanThreads.app.addToCart(product.id, 1, product.colors[0], product.sizes[0]);
      }
    });
  });
}

window.UrbanThreads.initWishlist = function () {
  renderWishlistPage();
};
