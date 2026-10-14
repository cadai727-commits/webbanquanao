const STORAGE_KEYS = {
  PRODUCTS: 'urbanThreads_products',
  CART: 'urbanThreads_cart',
  WISHLIST: 'urbanThreads_wishlist',
  USERS: 'urbanThreads_users',
  ORDERS: 'urbanThreads_orders',
  VOUCHERS: 'urbanThreads_vouchers',
  NOTIFICATIONS: 'urbanThreads_notifications',
  SETTINGS: 'urbanThreads_settings',
  CURRENT_USER: 'urbanThreads_currentUser',
  CURRENT_ROLE: 'urbanThreads_currentRole',
  DEMO_SEED: 'urbanThreads_demoSeeded'
};

const demoProducts = [
  {
    id: 'UT-1001', name: 'Midnight Runner Tee', category: 'T-Shirts', brand: 'Urban Threads',
    price: 420000, originalPrice: 520000, discount: 19, image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80'
    ],
    colors: ['Black', 'Sand', 'Forest'], sizes: ['S', 'M', 'L', 'XL'], stock: 28,
    tags: ['new', 'bestseller'], rating: 4.8, description: 'Essential everyday tee with a relaxed drape and premium cotton composition.',
    features: ['Soft brushed cotton', 'Unisex silhouette', 'Streetwear staple']
  },
  {
    id: 'UT-1002', name: 'Signal Hoodie', category: 'Hoodies', brand: 'Urban Threads',
    price: 780000, originalPrice: 980000, discount: 20, image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=800&q=80'
    ], colors: ['Ash', 'Black'], sizes: ['S', 'M', 'L', 'XL'], stock: 16, tags: ['bestseller'], rating: 4.7,
    description: 'A heavyweight hoodie with oversized fit, clean seams and a premium brushed finish.',
    features: ['Heavy fleece', 'Drop shoulder', 'Front kangaroo pocket']
  },
  {
    id: 'UT-1003', name: 'Drift Utility Jacket', category: 'Jackets', brand: 'Urban Threads',
    price: 1100000, originalPrice: 1380000, discount: 20, image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80'
    ], colors: ['Stone', 'Black'], sizes: ['M', 'L', 'XL'], stock: 12, tags: ['new'], rating: 4.9,
    description: 'Weather-ready shell with a clean silhouette and multiple pockets for everyday layering.',
    features: ['Water-resistant finish', 'Utility pockets', 'Structured fit']
  },
  {
    id: 'UT-1004', name: 'Metro Cargo', category: 'Pants', brand: 'Urban Threads',
    price: 690000, originalPrice: 860000, discount: 20, image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80'
    ], colors: ['Black', 'Olive'], sizes: ['S', 'M', 'L', 'XL'], stock: 22, tags: ['bestseller'], rating: 4.8,
    description: 'Relaxed cargo fit designed for movement, texture and everyday streetwear styling.',
    features: ['Tapered leg', 'Utility pockets', 'Stretch cotton blend']
  },
  {
    id: 'UT-1005', name: 'Trail Denim', category: 'Jeans', brand: 'Urban Threads',
    price: 760000, originalPrice: 950000, discount: 20, image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80'
    ], colors: ['Indigo', 'Washed Blue'], sizes: ['S', 'M', 'L', 'XL'], stock: 18, tags: ['new'], rating: 4.7,
    description: 'Authentic denim with a modern straight leg fit, built for daily rotation.',
    features: ['Heavyweight denim', 'Soft wash', 'Classic straight fit']
  },
  {
    id: 'UT-1006', name: 'Accessorize Cap', category: 'Accessories', brand: 'Urban Threads',
    price: 290000, originalPrice: 350000, discount: 17, image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80'
    ], colors: ['Black', 'Cream'], sizes: ['One Size'], stock: 31, tags: ['new'], rating: 4.5,
    description: 'A structured cap with logo embroidery and premium cotton twill structure.',
    features: ['Adjustable fit', 'Curved brim', 'Embroidered detail']
  },
  {
    id: 'UT-1007', name: 'City Block Tee', category: 'T-Shirts', brand: 'Urban Threads',
    price: 390000, originalPrice: 500000, discount: 22, image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80'
    ], colors: ['White', 'Black'], sizes: ['S', 'M', 'L', 'XL'], stock: 33, tags: ['bestseller'], rating: 4.8,
    description: 'Clean silhouette tee built around premium cotton and a sharp streetwear print.',
    features: ['Premium jersey', 'Relaxed fit', 'Soft hand feel']
  },
  {
    id: 'UT-1008', name: 'Vanta Overshirt', category: 'Jackets', brand: 'Urban Threads',
    price: 950000, originalPrice: 1190000, discount: 20, image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80'
    ], colors: ['Black', 'Khaki'], sizes: ['M', 'L', 'XL'], stock: 10, tags: ['new'], rating: 4.9,
    description: 'The perfect layering piece with rugged detailing and elevated minimalism.',
    features: ['Relaxed boxy fit', 'Structured collar', 'Hidden snap placket']
  },
  {
    id: 'UT-1009', name: 'Eastline Pants', category: 'Pants', brand: 'Urban Threads',
    price: 640000, originalPrice: 820000, discount: 22, image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80'
    ], colors: ['Stone', 'Charcoal'], sizes: ['S', 'M', 'L', 'XL'], stock: 19, tags: ['bestseller'], rating: 4.7,
    description: 'Straight-leg relaxed pants with a textured finish for versatility across seasons.',
    features: ['Soft-touch woven', 'Elastic waistband', 'Clean drape']
  },
  {
    id: 'UT-1010', name: 'Orbit Hoodie', category: 'Hoodies', brand: 'Urban Threads',
    price: 820000, originalPrice: 1050000, discount: 22, image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=80'
    ], colors: ['Black', 'Cream'], sizes: ['S', 'M', 'L', 'XL'], stock: 14, tags: ['new'], rating: 4.8,
    description: 'A sleek oversized hoodie with tonal details and premium interior fleece.',
    features: ['Fleece lined interior', 'Oversize drape', 'Front drawcord']
  },
  {
    id: 'UT-1011', name: 'Urban Rush Bag', category: 'Accessories', brand: 'Urban Threads',
    price: 510000, originalPrice: 650000, discount: 22, image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80'
    ], colors: ['Jet Black', 'Sand'], sizes: ['One Size'], stock: 20, tags: ['bestseller'], rating: 4.6,
    description: 'Minimal carry-all designed to complement everyday city wear.',
    features: ['Utility compartments', 'Laptop sleeve', 'Adjustable straps']
  },
  {
    id: 'UT-1012', name: 'Monarch Denim', category: 'Jeans', brand: 'Urban Threads',
    price: 790000, originalPrice: 1010000, discount: 22, image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=800&q=80'
    ], colors: ['Mid Blue', 'Ink'], sizes: ['S', 'M', 'L', 'XL'], stock: 15, tags: ['bestseller'], rating: 4.8,
    description: 'A premium cargo jean featuring a structured denim feel with modern tapering.',
    features: ['Soft cotton denim', 'Relaxed waist', 'Urban fit']
  },
  {
    id: 'UT-1013', name: 'Street Light Tee', category: 'T-Shirts', brand: 'Urban Threads',
    price: 360000, originalPrice: 460000, discount: 22, image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80'
    ], colors: ['White', 'Black', 'Sand'], sizes: ['S', 'M', 'L', 'XL'], stock: 27, tags: ['new'], rating: 4.7,
    description: 'An everyday staple crafted for comfort, durability and clean layering.',
    features: ['Airlight cotton', 'Ultra-soft finish', 'Daily essential']
  },
  {
    id: 'UT-1014', name: 'Forge Bomber', category: 'Jackets', brand: 'Urban Threads',
    price: 1290000, originalPrice: 1590000, discount: 19, image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80'
    ], colors: ['Black', 'Olive'], sizes: ['M', 'L', 'XL'], stock: 9, tags: ['bestseller'], rating: 5,
    description: 'A premium bomber with a sharp silhouette and utility-inspired detailing.',
    features: ['Stand collar', 'Insulated lining', 'Reinforced trim']
  },
  {
    id: 'UT-1015', name: 'Cinder Cargo', category: 'Pants', brand: 'Urban Threads',
    price: 710000, originalPrice: 890000, discount: 20, image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=800&q=80'
    ], colors: ['Charcoal', 'Stone'], sizes: ['S', 'M', 'L', 'XL'], stock: 17, tags: ['new'], rating: 4.7,
    description: 'Utility-inspired pants built with mobility in mind and easy styling in mind.',
    features: ['High-rise fit', 'Stretch waist', 'Side cargo pockets']
  },
  {
    id: 'UT-1016', name: 'Aerial Beanie', category: 'Accessories', brand: 'Urban Threads',
    price: 240000, originalPrice: 300000, discount: 20, image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80'
    ], colors: ['Black', 'Cream', 'Terracotta'], sizes: ['One Size'], stock: 26, tags: ['new'], rating: 4.5,
    description: 'Layerable knit beanie designed for comfort and cold-weather styling.',
    features: ['Soft knit', 'Stretch fit', 'Minimal logo tag']
  },
  {
    id: 'UT-1017', name: 'Modular Layer', category: 'Hoodies', brand: 'Urban Threads',
    price: 830000, originalPrice: 990000, discount: 16, image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80'
    ], colors: ['Forest', 'Black'], sizes: ['S', 'M', 'L', 'XL'], stock: 13, tags: ['bestseller'], rating: 4.8,
    description: 'The premium hooded layer for an understated, elevated street look.',
    features: ['Boxy silhouette', 'Heavyweight cotton', 'Relaxed pocketing']
  },
  {
    id: 'UT-1018', name: 'Apex Overshirt', category: 'Jackets', brand: 'Urban Threads',
    price: 980000, originalPrice: 1280000, discount: 23, image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80'
    ], colors: ['Graphite', 'Stone'], sizes: ['M', 'L', 'XL'], stock: 11, tags: ['new'], rating: 4.9,
    description: 'A layered overshirt that balances structure, warmth and mobility.',
    features: ['Soft brushed lining', 'Reinforced shoulders', 'Utility pocketing']
  },
  {
    id: 'UT-1019', name: 'Velvet Denim', category: 'Jeans', brand: 'Urban Threads',
    price: 860000, originalPrice: 1080000, discount: 20, image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=80'
    ], colors: ['Indigo', 'Black'], sizes: ['S', 'M', 'L', 'XL'], stock: 12, tags: ['new'], rating: 4.8,
    description: 'Premium denim with volume, structure and an elevated all-day silhouette.',
    features: ['Premium wash', 'Straight leg', 'Comfort stretch']
  },
  {
    id: 'UT-1020', name: 'Threaded Sling', category: 'Accessories', brand: 'Urban Threads',
    price: 420000, originalPrice: 520000, discount: 19, image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=800&q=80'
    ], colors: ['Black', 'Olive'], sizes: ['One Size'], stock: 22, tags: ['bestseller'], rating: 4.6,
    description: 'Compact crossbody crafted in a clean silhouette with city-ready practicality.',
    features: ['Functional pockets', 'Adjustable strap', 'Minimal finish']
  }
];

const demoAccounts = [
  { id: 'user-admin', fullName: 'Admin Urban', email: 'admin@urbanthreads.demo', phone: '0900000001', password: 'Admin123!', role: 'Admin', status: 'active' },
  { id: 'user-staff', fullName: 'Staff Urban', email: 'staff@urbanthreads.demo', phone: '0900000002', password: 'Staff123!', role: 'Staff', status: 'active' },
  { id: 'user-customer', fullName: 'Customer Demo', email: 'customer@urbanthreads.demo', phone: '0900000003', password: 'Customer123!', role: 'Customer', status: 'active' }
];

const demoVouchers = [
  { id: 'VIP10', name: 'VIP 10%', type: 'percent', value: 10, minOrder: 500000, maxDiscount: 150000, startDate: '2026-01-01', endDate: '2026-12-31', usageLimit: 100, used: 34, active: true },
  { id: 'SAVE500', name: 'New Customer', type: 'fixed', value: 50000, minOrder: 400000, maxDiscount: 50000, startDate: '2026-01-01', endDate: '2026-12-31', usageLimit: 50, used: 10, active: true },
  { id: 'FREESHIP', name: 'Free shipping', type: 'fixed', value: 30000, minOrder: 700000, maxDiscount: 30000, startDate: '2026-09-01', endDate: '2026-09-30', usageLimit: 20, used: 20, active: false }
];

const demoNotifications = [
  { id: crypto.randomUUID ? crypto.randomUUID() : 'n1', title: 'Order confirmed', message: 'Your order #UT-2026001 has been confirmed and prepared.', type: 'success', read: false, createdAt: new Date().toISOString() },
  { id: crypto.randomUUID ? crypto.randomUUID() : 'n2', title: 'Welcome to Urban Threads', message: 'Your account is ready for a premium shopping experience.', type: 'info', read: true, createdAt: new Date().toISOString() }
];

function safeParseValue(text, fallback) {
  try {
    return text ? JSON.parse(text) : fallback;
  } catch (error) {
    return fallback;
  }
}

function getStorageData(key, fallback) {
  const raw = localStorage.getItem(key);
  return safeParseValue(raw, fallback);
}

function setStorageData(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function ensureDemoData() {
  if (localStorage.getItem(STORAGE_KEYS.DEMO_SEED) === 'done') return;

  setStorageData(STORAGE_KEYS.PRODUCTS, demoProducts);
  setStorageData(STORAGE_KEYS.USERS, demoAccounts);
  setStorageData(STORAGE_KEYS.VOUCHERS, demoVouchers);
  setStorageData(STORAGE_KEYS.NOTIFICATIONS, demoNotifications);
  setStorageData(STORAGE_KEYS.CART, []);
  setStorageData(STORAGE_KEYS.WISHLIST, []);
  setStorageData(STORAGE_KEYS.ORDERS, []);
  setStorageData(STORAGE_KEYS.SETTINGS, {
    darkMode: false,
    emailNotifications: true,
    pushNotifications: true,
    showWishlist: true,
    currency: 'VND'
  });

  localStorage.setItem(STORAGE_KEYS.DEMO_SEED, 'done');
}

function getCurrentUser() {
  const user = getStorageData(STORAGE_KEYS.CURRENT_USER, null);
  return user || null;
}

function setCurrentUser(user) {
  if (!user) {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    localStorage.removeItem(STORAGE_KEYS.CURRENT_ROLE);
    return;
  }
  setStorageData(STORAGE_KEYS.CURRENT_USER, user);
  localStorage.setItem(STORAGE_KEYS.CURRENT_ROLE, user.role || 'Customer');
}

function getCart() {
  return getStorageData(STORAGE_KEYS.CART, []);
}

function getWishlist() {
  return getStorageData(STORAGE_KEYS.WISHLIST, []);
}

function getProducts() {
  return getStorageData(STORAGE_KEYS.PRODUCTS, demoProducts);
}

function getOrders() {
  return getStorageData(STORAGE_KEYS.ORDERS, []);
}

function getVouchers() {
  return getStorageData(STORAGE_KEYS.VOUCHERS, demoVouchers);
}

function getUsers() {
  return getStorageData(STORAGE_KEYS.USERS, demoAccounts);
}

function getNotifications() {
  return getStorageData(STORAGE_KEYS.NOTIFICATIONS, demoNotifications);
}

function getSettings() {
  return getStorageData(STORAGE_KEYS.SETTINGS, {
    darkMode: false,
    emailNotifications: true,
    pushNotifications: true,
    showWishlist: true,
    currency: 'VND'
  });
}

function formatCurrency(value) {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(Number(value || 0));
}

function formatDate(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value || '—';
  return new Intl.DateTimeFormat('vi-VN', { dateStyle: 'medium' }).format(date);
}

function generateId(prefix) {
  if (window.crypto && crypto.randomUUID) return `${prefix}-${crypto.randomUUID()}`;
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 9)}`;
}

window.UrbanThreads = window.UrbanThreads || {};
window.UrbanThreads.storage = {
  STORAGE_KEYS,
  demoProducts,
  demoAccounts,
  demoVouchers,
  getStorageData,
  setStorageData,
  ensureDemoData,
  getCurrentUser,
  setCurrentUser,
  getCart,
  getWishlist,
  getProducts,
  getOrders,
  getVouchers,
  getUsers,
  getNotifications,
  getSettings,
  formatCurrency,
  formatDate,
  generateId
};

if (typeof window !== 'undefined') {
  try {
    ensureDemoData();
  } catch (error) {
    console.error('Failed to initialize demo storage', error);
  }
}
