// ====== DATA ======
const products = [
  { id:1, name:"Gulbahar Embroidered Lawn", cat:"Women's Unstitched", price:4850, orig:null, badge:"New", colors:["#c4a882","#7a9e8a","#c4847a"], sizes:["S","M","L","XL"], desc:"A delicate floral masterpiece in premium lawn fabric. Features intricate embroidery on the front, sleeves and dupatta. Perfect for summer gatherings and casual festivities.", bg:"#f0e8dc", image:"images/women1.jpg" },
  { id:2, name:"Midnight Chiffon Maxi", cat:"Women's Stitched", price:7200, orig:9500, badge:"Sale", colors:["#1a1a1a","#2d3050","#5a2020"], sizes:["XS","S","M","L","XL"], desc:"Flowing midnight chiffon maxi dress with subtle shimmer. Flattering empire waist with ruffle detailing. Ideal for evening events and formal gatherings.", bg:"#1a1a28", image:"images/women2.jpg" },
  { id:3, name:"Kashmiri Shawl Wrap", cat:"Accessories", price:3200, orig:null, badge:null, colors:["#8B4513","#2d4a2d","#1a1a50"], sizes:["One Size"], desc:"Authentic Kashmiri-inspired shawl in a rich wool blend. Hand-woven patterns with traditional motifs. Warm, luxurious, and timeless.", bg:"#2d1a0a", image:"images/women3.jpg" },
  { id:4, name:"Linen Kurta Pajama Set", cat:"Men's Stitched", price:5500, orig:null, badge:"New", colors:["#e8e0d0","#4a5a3a","#1a1a1a"], sizes:["S","M","L","XL","XXL"], desc:"Premium linen kurta pajama in a relaxed contemporary silhouette. Breathable fabric perfect for summer wear. Minimalist design with tonal buttons.", bg:"#d4cfc0", image:"images/men1.jpg" },
  { id:5, name:"Floral Printed Dupatta", cat:"Accessories", price:1850, orig:2400, badge:"Sale", colors:["#d4a0b0","#a0c4b0","#f0e080"], sizes:["One Size"], desc:"Lightweight chiffon dupatta with hand-block printed florals. Adds a pop of color to any outfit. Available in multiple colorways.", bg:"#f0d4dc", image:"images/women4.jpg" },
  { id:6, name:"Oxford Formal Shirt", cat:"Men's Stitched", price:3800, orig:null, badge:null, colors:["#f0f0f0","#b0c4d8","#c4b0b0"], sizes:["S","M","L","XL","XXL"], desc:"Crisp Oxford weave formal shirt with a classic fit. Double-stitched seams for durability. Suitable for office and semi-formal occasions.", bg:"#e0e8f0", image:"images/men2.jpg" },
  { id:7, name:"Embroidered Gharara Set", cat:"Women's Stitched", price:12500, orig:15000, badge:"Sale", colors:["#d4a060","#c4847a","#8a7090"], sizes:["XS","S","M","L"], desc:"Exquisitely embroidered gharara set with gold thread work. Includes kameez, gharara, and matching dupatta. A statement ensemble for weddings and celebrations.", bg:"#2a2010", image:"images/women5.jpg" },
  { id:8, name:"Kids Festive Kurta", cat:"Kids' Wear", price:2200, orig:null, badge:"New", colors:["#e08040","#4080c0","#80c040"], sizes:["2-3Y","4-5Y","6-7Y","8-9Y"], desc:"Adorable festive kurta for little ones. Soft cotton blend with playful embroidery. Easy-care fabric that's comfortable all day long.", bg:"#f0e8d8", image:"images/kd1.jpg" },
];

const productColors = {
  "#c4a882":"Sand","#7a9e8a":"Sage","#c4847a":"Rose","#1a1a1a":"Black",
  "#2d3050":"Navy","#5a2020":"Burgundy","#e8e0d0":"Ivory","#4a5a3a":"Olive",
  "#f0f0f0":"White","#b0c4d8":"Sky","#d4a060":"Gold","#8a7090":"Mauve",
  "#e08040":"Tangerine","#4080c0":"Blue","#80c040":"Green",
};

// ====== STATE ======
let cart = [];
let currentProduct = null;
let selectedSize = null;

// Active filter state
let activeFilters = {
  category: null,   // string keyword like "Men", "Women", "Kids", "Accessories", "Sale"
  maxPrice: 20000,
  searchQuery: '',
  sortBy: ''
};

// ====== PRODUCT CARD RENDER ======
function renderProductCard(p) {
  const gradients = {
    "#f0e8dc":"linear-gradient(135deg,#f0e8dc,#e0d4c0)",
    "#1a1a28":"linear-gradient(135deg,#1a1a28,#0e0e18)",
    "#2d1a0a":"linear-gradient(135deg,#2d1a0a,#1a0e04)",
    "#d4cfc0":"linear-gradient(135deg,#d4cfc0,#c4bfb0)",
    "#f0d4dc":"linear-gradient(135deg,#f0d4dc,#e0c0cc)",
    "#e0e8f0":"linear-gradient(135deg,#e0e8f0,#d0d8e0)",
    "#2a2010":"linear-gradient(135deg,#2a2010,#1a1008)",
    "#f0e8d8":"linear-gradient(135deg,#f0e8d8,#e0d8c8)",
  };
  const textColors = {
    "#f0e8dc":"#5a4030","#1a1a28":"#c0c0d0","#2d1a0a":"#d0a060",
    "#d4cfc0":"#4a3a2a","#f0d4dc":"#5a2a3a","#e0e8f0":"#2a4a6a",
    "#2a2010":"#d0a040","#f0e8d8":"#5a3a20",
  };
  const bg = gradients[p.bg] || "linear-gradient(135deg,#f0e8dc,#e0d4c0)";
  const tc = textColors[p.bg] || "#5a4030";
  const badgeClass = p.badge === 'Sale' ? 'sale' : (p.badge === 'New' ? 'new' : '');
  const discount = p.orig ? Math.round((1 - p.price / p.orig) * 100) : 0;
  const colorsHTML = p.colors.slice(0, 4).map(c =>
    `<div class="color-swatch" style="background:${c}" title="${productColors[c] || c}"></div>`
  ).join('');

  return `
    <div class="product-card" onclick="showProduct(${p.id})">
      <div class="product-img-wrap">
        <div class="product-img-placeholder" style="background:${p.image ? 'none' : bg}">
          ${p.image
            ? `<img src="${p.image}" alt="${p.name}" style="width:100%;height:100%;object-fit:cover;" loading="lazy">`
            : renderProductSVG(p, tc)}
        </div>
        ${p.badge ? `<span class="product-badge ${badgeClass}">${p.badge}</span>` : ''}
        <button class="product-wishlist" onclick="event.stopPropagation();toggleWishlist(this)" aria-label="Wishlist">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
        </button>
        <div class="product-actions">
          <button class="add-to-cart-btn" onclick="event.stopPropagation();quickAddToCart(${p.id})">Quick Add</button>
        </div>
      </div>
      <div class="product-info">
        <div class="product-category">${p.cat}</div>
        <div class="product-name">${p.name}</div>
        <div class="product-colors">${colorsHTML}</div>
        <div class="product-price">
          <span class="price-current">PKR ${p.price.toLocaleString()}</span>
          ${p.orig ? `<span class="price-original">PKR ${p.orig.toLocaleString()}</span><span class="price-off">${discount}% off</span>` : ''}
        </div>
      </div>
    </div>
  `;
}

function renderProductSVG(p, tc) {
  const svgs = {
    1: `<svg viewBox="0 0 200 280" width="65%" style="position:relative;z-index:1">
          <ellipse cx="100" cy="44" rx="28" ry="30" fill="${tc}" opacity="0.6"/>
          <path d="M72 74 Q55 130 48 240 L152 240 Q145 130 128 74 Z" fill="${tc}" opacity="0.5"/>
          <path d="M72 74 L48 120 L38 240 L70 240 L84 120 Z" fill="${tc}" opacity="0.4"/>
          <path d="M128 74 L152 120 L162 240 L130 240 L116 120 Z" fill="${tc}" opacity="0.4"/>
          <ellipse cx="100" cy="135" rx="30" ry="2" fill="${tc}" opacity="0.4"/>
          <path d="M70 85 Q100 100 130 85" stroke="${tc}" stroke-width="1" fill="none" opacity="0.6"/>
        </svg>`,
    2: `<svg viewBox="0 0 200 280" width="65%" style="position:relative;z-index:1">
          <ellipse cx="100" cy="42" rx="26" ry="28" fill="${tc}" opacity="0.9"/>
          <path d="M74 70 Q50 160 46 280 L154 280 Q150 160 126 70 Z" fill="${tc}" opacity="0.7"/>
          <path d="M46 200 Q100 220 154 200" stroke="${tc}" stroke-width="0.5" fill="none" opacity="0.5"/>
        </svg>`,
    3: `<svg viewBox="0 0 200 180" width="65%" style="position:relative;z-index:1">
          <path d="M20 40 Q100 20 180 40 L160 160 Q100 180 40 160 Z" fill="${tc}" opacity="0.6"/>
          <path d="M35 45 Q100 28 165 45" stroke="${tc}" stroke-width="2" fill="none" opacity="0.8"/>
          <path d="M30 80 Q100 65 170 80" stroke="${tc}" stroke-width="1" fill="none" opacity="0.5"/>
        </svg>`,
    4: `<svg viewBox="0 0 200 260" width="65%" style="position:relative;z-index:1">
          <ellipse cx="100" cy="42" rx="28" ry="30" fill="${tc}" opacity="0.7"/>
          <path d="M72 72 Q55 130 50 210 L150 210 Q145 130 128 72 Z" fill="${tc}" opacity="0.6"/>
          <path d="M60 210 L55 260 L80 260 L100 215 L120 260 L145 260 L140 210 Z" fill="${tc}" opacity="0.5"/>
          <rect x="68" y="100" width="64" height="8" rx="2" fill="${tc}" opacity="0.4"/>
        </svg>`,
    5: `<svg viewBox="0 0 200 140" width="65%" style="position:relative;z-index:1">
          <path d="M10 30 Q100 10 190 30 L180 120 Q100 140 20 120 Z" fill="${tc}" opacity="0.5"/>
          <path d="M20 35 Q100 18 180 35" stroke="${tc}" stroke-width="1.5" fill="none" opacity="0.7"/>
          <circle cx="50" cy="80" r="8" fill="${tc}" opacity="0.3"/>
          <circle cx="100" cy="70" r="10" fill="${tc}" opacity="0.3"/>
          <circle cx="150" cy="80" r="8" fill="${tc}" opacity="0.3"/>
        </svg>`,
    6: `<svg viewBox="0 0 200 220" width="65%" style="position:relative;z-index:1">
          <path d="M60 20 L140 20 L150 60 L160 200 L40 200 L50 60 Z" fill="${tc}" opacity="0.6"/>
          <path d="M60 20 L30 80 L60 100 L80 60 Z" fill="${tc}" opacity="0.5"/>
          <path d="M140 20 L170 80 L140 100 L120 60 Z" fill="${tc}" opacity="0.5"/>
          <rect x="70" y="55" width="60" height="4" rx="1" fill="${tc}" opacity="0.5"/>
          <rect x="75" y="70" width="50" height="2" rx="1" fill="${tc}" opacity="0.4"/>
        </svg>`,
    7: `<svg viewBox="0 0 220 300" width="65%" style="position:relative;z-index:1">
          <ellipse cx="110" cy="42" rx="28" ry="30" fill="${tc}" opacity="0.8"/>
          <path d="M82 72 Q65 120 62 160 L158 160 Q155 120 138 72 Z" fill="${tc}" opacity="0.7"/>
          <path d="M50 160 L30 300 L90 300 L110 200 L130 300 L190 300 L170 160 Z" fill="${tc}" opacity="0.6"/>
          <path d="M65 165 Q110 180 155 165" stroke="${tc}" stroke-width="1.5" fill="none" opacity="0.8"/>
        </svg>`,
    8: `<svg viewBox="0 0 160 220" width="65%" style="position:relative;z-index:1">
          <ellipse cx="80" cy="36" rx="24" ry="26" fill="${tc}" opacity="0.7"/>
          <path d="M56 62 Q44 110 42 190 L118 190 Q116 110 104 62 Z" fill="${tc}" opacity="0.6"/>
          <path d="M56 62 L32 100 L50 110 L66 80 Z" fill="${tc}" opacity="0.5"/>
          <path d="M104 62 L128 100 L110 110 L94 80 Z" fill="${tc}" opacity="0.5"/>
          <circle cx="80" cy="90" r="5" fill="${tc}" opacity="0.5"/>
          <circle cx="65" cy="105" r="4" fill="${tc}" opacity="0.4"/>
          <circle cx="95" cy="105" r="4" fill="${tc}" opacity="0.4"/>
        </svg>`,
  };
  return svgs[p.id] || svgs[1];
}

// ====== FILTERING ENGINE ======
// Master function: applies all active filters + sort and re-renders the shop grid
function applyShopFilters() {
  const sgrid = document.getElementById('shop-grid');
  const countEl = document.getElementById('shop-count');
  if (!sgrid) return;

  let filtered = [...products];

  // 1. Category filter
  if (activeFilters.category) {
    const cat = activeFilters.category.toLowerCase();
    if (cat === 'sale') {
      filtered = filtered.filter(p => p.badge === 'Sale');
    } else {
      filtered = filtered.filter(p => p.cat.toLowerCase().includes(cat));
    }
  }

  // 2. Price range filter
  filtered = filtered.filter(p => p.price <= activeFilters.maxPrice);

  // 3. Search query filter
  if (activeFilters.searchQuery.trim()) {
    const q = activeFilters.searchQuery.trim().toLowerCase();
    filtered = filtered.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.cat.toLowerCase().includes(q) ||
      p.desc.toLowerCase().includes(q)
    );
  }

  // 4. Sort
  if (activeFilters.sortBy === 'low') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (activeFilters.sortBy === 'high') {
    filtered.sort((a, b) => b.price - a.price);
  } else if (activeFilters.sortBy === 'new') {
    filtered = filtered.filter(p => p.badge === 'New').concat(filtered.filter(p => p.badge !== 'New'));
  }

  // Render
  if (filtered.length === 0) {
    sgrid.innerHTML = `
      <div style="grid-column:1/-1;text-align:center;padding:80px 20px;color:var(--stone);">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" style="margin-bottom:16px;opacity:0.4"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
        <p style="font-family:'Cormorant Garamond',serif;font-size:22px;margin-bottom:8px;">No products found</p>
        <p style="font-size:13px;margin-bottom:24px;">Try adjusting your filters or search term.</p>
        <button class="btn-primary" onclick="clearAllFilters()">Clear Filters</button>
      </div>`;
  } else {
    sgrid.innerHTML = filtered.map(p => renderProductCard(p)).join('');
  }

  if (countEl) countEl.textContent = `Showing ${filtered.length} of ${products.length} products`;

  // Hide load-more when a filter is active or nothing more to load
  const loadMoreBtn = document.getElementById('load-more-btn');
  if (loadMoreBtn) {
    const hasActiveFilter = activeFilters.category || activeFilters.searchQuery || activeFilters.maxPrice < 20000;
    loadMoreBtn.style.display = hasActiveFilter ? 'none' : 'inline-block';
  }
}

// Called when nav links (Men / Women / Kids / Accessories / Sale) are clicked
function filterAndShowShop(categoryKeyword) {
  activeFilters.category = categoryKeyword;
  activeFilters.searchQuery = '';
  activeFilters.maxPrice = 20000;
  activeFilters.sortBy = '';

  // Reset price slider UI
  const slider = document.getElementById('price-range-input');
  const sliderLabel = document.getElementById('price-range-label');
  if (slider) slider.value = 20000;
  if (sliderLabel) sliderLabel.textContent = 'PKR 20,000';

  // Reset sort select
  const sortSel = document.getElementById('sort-select');
  if (sortSel) sortSel.value = '';

  // Clear category checkbox highlights in sidebar
  document.querySelectorAll('.filter-check').forEach(c => c.classList.remove('checked'));

  // Show shop page
  showPage('shop');

  // Apply the filter after the page switch
  applyShopFilters();

  // Show a toast so user knows what happened
  showToast(`Showing: ${categoryKeyword}`);
}

// Live price-range slider handler (fires on every input event)
function handlePriceRange(val) {
  activeFilters.maxPrice = parseInt(val, 10);
  const label = document.getElementById('price-range-label');
  if (label) label.textContent = 'PKR ' + Number(val).toLocaleString();
  applyShopFilters();
}

// ====== SEARCH ======
function toggleSearch() {
  const so = document.getElementById('search-overlay');
  so.classList.toggle('active');
  if (so.classList.contains('active')) {
    setTimeout(() => document.getElementById('search-input').focus(), 100);
  }
}

// Live search: fires on every keystroke in the search input
function handleSearch(val) {
  const q = val.trim().toLowerCase();
  const suggestionsBlock = document.getElementById('search-suggestions-block');
  const previewBlock = document.getElementById('search-results-preview');

  if (!q) {
    if (suggestionsBlock) suggestionsBlock.style.display = '';
    if (previewBlock) previewBlock.innerHTML = '';
    return;
  }

  if (suggestionsBlock) suggestionsBlock.style.display = 'none';

  const matched = products.filter(p =>
    p.name.toLowerCase().includes(q) ||
    p.cat.toLowerCase().includes(q) ||
    p.desc.toLowerCase().includes(q)
  );

  if (!previewBlock) return;

  if (matched.length === 0) {
    previewBlock.innerHTML = `<p style="font-size:14px;color:var(--stone);margin-top:16px;">No results for "<strong>${val}</strong>"</p>`;
    return;
  }

  previewBlock.innerHTML = `
    <p style="font-size:11px;letter-spacing:0.15em;text-transform:uppercase;color:var(--stone);margin-bottom:16px;">${matched.length} result${matched.length !== 1 ? 's' : ''}</p>
    <div style="display:flex;flex-direction:column;gap:12px;">
      ${matched.map(p => `
        <div onclick="searchGoToProduct(${p.id})" style="display:flex;align-items:center;gap:16px;cursor:pointer;padding:10px;border:1px solid var(--border);transition:background 0.2s;" onmouseover="this.style.background='var(--cream)'" onmouseout="this.style.background='transparent'">
          <div style="width:48px;height:60px;background:${p.bg};flex-shrink:0;overflow:hidden;">
            ${p.image ? `<img src="${p.image}" alt="${p.name}" style="width:100%;height:100%;object-fit:cover;">` : ''}
          </div>
          <div>
            <div style="font-family:'Cormorant Garamond',serif;font-size:16px;">${p.name}</div>
            <div style="font-size:12px;color:var(--stone);">${p.cat} &middot; PKR ${p.price.toLocaleString()}</div>
          </div>
        </div>
      `).join('')}
    </div>
    <button class="btn-primary" style="margin-top:20px;width:100%;" onclick="commitSearch('${val.replace(/'/g,"\\'")}')">See all results for "${val}"</button>
  `;
}

// Navigate directly to a product from search preview
function searchGoToProduct(id) {
  toggleSearch();
  document.getElementById('search-input').value = '';
  const previewBlock = document.getElementById('search-results-preview');
  if (previewBlock) previewBlock.innerHTML = '';
  showProduct(id);
}

// Commit search: close overlay, go to shop with query filter applied
function commitSearch(term) {
  activeFilters.searchQuery = term;
  activeFilters.category = null;
  toggleSearch();
  document.getElementById('search-input').value = '';
  const previewBlock = document.getElementById('search-results-preview');
  if (previewBlock) previewBlock.innerHTML = '';
  showPage('shop');
  applyShopFilters();
  showToast(`Results for "${term}"`);
}

// Quick-search tag buttons in the overlay
function searchFor(term) {
  document.getElementById('search-input').value = term;
  handleSearch(term);
}

// ====== INIT ======
function init() {
  // Render new arrivals on home page
  const narr = document.getElementById('new-arrivals-grid');
  if (narr) narr.innerHTML = products.slice(0, 8).map(p => renderProductCard(p)).join('');

  // Render full shop grid
  const sgrid = document.getElementById('shop-grid');
  if (sgrid) sgrid.innerHTML = products.map(p => renderProductCard(p)).join('');

  // Wire price-range slider
  const slider = document.getElementById('price-range-input');
  if (slider) {
    slider.addEventListener('input', function () {
      handlePriceRange(this.value);
    });
  }

  // Inject mobile filter toggle button
  injectMobileFilterToggle();

  // Countdown timer
  startCountdown();

  // Sticky header on scroll
  window.addEventListener('scroll', () => {
    const header = document.getElementById('main-header');
    if (header) header.classList.toggle('scrolled', window.scrollY > 20);
  });
}

// ====== PAGES ======
function showPage(name) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const target = document.getElementById('page-' + name);
  if (target) target.classList.add('active');
  window.scrollTo(0, 0);
  closeAll();

  if (name === 'shop') {
    // If shop grid is empty on first visit, populate it
    const sgrid = document.getElementById('shop-grid');
    if (sgrid && !sgrid.innerHTML.trim()) {
      applyShopFilters();
    }
  }
}

function showProduct(id) {
  const p = products.find(x => x.id === id);
  if (!p) return;
  currentProduct = p;
  selectedSize = null;

  document.getElementById('pd-breadcrumb').textContent = p.name;
  document.getElementById('pd-cat').textContent = p.cat;
  document.getElementById('pd-title').textContent = p.name;
  document.getElementById('pd-price').innerHTML = `PKR ${p.price.toLocaleString()}${p.orig
    ? ` <span style="font-size:16px;color:var(--stone);text-decoration:line-through;margin-left:10px">PKR ${p.orig.toLocaleString()}</span>`
    : ''}`;
  document.getElementById('pd-desc').textContent = p.desc;

  // Colors
  document.getElementById('pd-colors').innerHTML = p.colors.map((c, i) =>
    `<div class="pd-color ${i === 0 ? 'active' : ''}" style="background:${c}" onclick="selectColor(this,'${c}')" title="${productColors[c] || c}"></div>`
  ).join('');

  // Sizes
  document.getElementById('pd-sizes').innerHTML = p.sizes.map(s =>
    `<button class="pd-size" onclick="selectSize(this,'${s}')">${s}</button>`
  ).join('');

  // Main Image
  document.getElementById('pd-main-img').innerHTML = p.image
    ? `<img src="${p.image}" alt="${p.name}" style="width:100%;height:100%;object-fit:cover;">`
    : `<div style="width:100%;height:100%;background:${p.bg};display:flex;align-items:center;justify-content:center;">${renderProductSVG(p, '#8a6a50')}</div>`;

  // Thumbnails
  document.getElementById('pd-thumbs').innerHTML = p.image
    ? `<div class="pd-thumb active" style="overflow:hidden;"><img src="${p.image}" style="width:100%;height:100%;object-fit:cover;"></div>`
    : `<div class="pd-thumb active" style="background:${p.bg};display:flex;align-items:center;justify-content:center;">${renderProductSVG(p, '#8a6a50')}</div>`;

  // Related products (different category preferred, then fallback)
  const related = products
    .filter(x => x.id !== id)
    .sort((a, b) => (a.cat === p.cat ? -1 : 1))
    .slice(0, 4);
  document.getElementById('related-grid').innerHTML = related.map(rp => renderProductCard(rp)).join('');

  showPage('product');
}

function selectColor(el, color) {
  document.querySelectorAll('.pd-color').forEach(x => x.classList.remove('active'));
  el.classList.add('active');
}

function selectSize(el, size) {
  document.querySelectorAll('.pd-size').forEach(x => x.classList.remove('active'));
  el.classList.add('active');
  selectedSize = size;
}

// ====== CART ======
function toggleCart() {
  const drawer = document.getElementById('cart-drawer');
  const overlay = document.getElementById('overlay');
  drawer.classList.toggle('open');
  overlay.classList.toggle('active');
  if (drawer.classList.contains('open')) renderCart();
}

function renderCart() {
  const body = document.getElementById('cart-body');
  const footer = document.getElementById('cart-footer');
  if (!body || !footer) return;

  if (cart.length === 0) {
    body.innerHTML = `
      <div class="cart-empty">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" style="width:48px;height:48px;stroke-width:1">
          <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
          <line x1="3" y1="6" x2="21" y2="6"/>
          <path d="M16 10a4 4 0 01-8 0"/>
        </svg>
        <p>Your bag is empty</p>
      </div>`;
    footer.style.display = 'none';
    return;
  }

  footer.style.display = 'block';

  body.innerHTML = cart.map((item, idx) => `
    <div class="cart-item">
      <div class="cart-item-img" style="overflow:hidden;">
        ${item.image
          ? `<img src="${item.image}" alt="${item.name}" style="width:100%;height:100%;object-fit:cover;">`
          : `<div class="cart-item-img-ph" style="background:${item.bg}">
               <svg viewBox="0 0 80 100" width="60%">
                 <ellipse cx="40" cy="20" rx="14" ry="15" fill="#8a8680" opacity="0.5"/>
                 <path d="M26 35 Q18 65 16 100 L64 100 Q62 65 54 35 Z" fill="#8a8680" opacity="0.4"/>
               </svg>
             </div>`
        }
      </div>
      <div class="cart-item-details">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-meta">${item.size ? 'Size: ' + item.size + ' · ' : ''}${item.cat}</div>
        <div class="cart-item-footer">
          <div class="qty-control">
            <button class="qty-btn" onclick="updateQty(${idx},-1)">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><line x1="5" y1="12" x2="19" y2="12"/></svg>
            </button>
            <span class="qty-num">${item.qty}</span>
            <button class="qty-btn" onclick="updateQty(${idx},1)">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            </button>
          </div>
          <span class="cart-item-price">PKR ${(item.price * item.qty).toLocaleString()}</span>
        </div>
        <button class="cart-remove" onclick="removeFromCart(${idx})">Remove</button>
      </div>
    </div>
  `).join('');

  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const FREE_SHIPPING_THRESHOLD = 3000;

  document.getElementById('cart-total').textContent = 'PKR ' + total.toLocaleString();
  document.getElementById('cart-count').textContent = cart.reduce((s, i) => s + i.qty, 0);

  // Shipping message logic
  const shippingMsg = document.getElementById('cart-shipping');
  if (shippingMsg) {
    if (total >= FREE_SHIPPING_THRESHOLD) {
      shippingMsg.textContent = '🎉 You qualify for free shipping!';
      shippingMsg.style.color = 'var(--sage)';
    } else {
      const remaining = FREE_SHIPPING_THRESHOLD - total;
      shippingMsg.textContent = `Add PKR ${remaining.toLocaleString()} more for free shipping`;
      shippingMsg.style.color = 'var(--stone)';
    }
  }
}

function addToCart(product, size) {
  const existing = cart.find(i => i.id === product.id && i.size === size);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({ ...product, qty: 1, size });
  }
  document.getElementById('cart-count').textContent = cart.reduce((s, i) => s + i.qty, 0);
  showToast(`${product.name} added to bag`);
}

function quickAddToCart(id) {
  const p = products.find(x => x.id === id);
  if (!p) return;
  addToCart(p, p.sizes[0]);
}

function addCurrentToCart() {
  if (!currentProduct) return;
  if (!selectedSize && currentProduct.sizes.length > 1) {
    showToast('Please select a size first');
    return;
  }
  addToCart(currentProduct, selectedSize || currentProduct.sizes[0]);
  toggleCart();
}

function updateQty(idx, delta) {
  if (!cart[idx]) return;
  cart[idx].qty += delta;
  if (cart[idx].qty <= 0) cart.splice(idx, 1);
  renderCart();
  document.getElementById('cart-count').textContent = cart.reduce((s, i) => s + i.qty, 0);
}

function removeFromCart(idx) {
  cart.splice(idx, 1);
  renderCart();
  document.getElementById('cart-count').textContent = cart.reduce((s, i) => s + i.qty, 0);
}

// ====== SORT ======
function handleSort(val) {
  activeFilters.sortBy = val;
  applyShopFilters();
  showToast('Sorted by: ' + (val === 'low' ? 'Price: Low to High' : val === 'high' ? 'Price: High to Low' : val === 'new' ? 'Newest First' : 'Featured'));
}

// ====== FILTER SIDEBAR CONTROLS ======
function toggleFilter(btn) {
  const check = btn.querySelector('.filter-check');
  check.classList.toggle('checked');
}

// Clear all filter state and reset UI
function clearAllFilters() {
  activeFilters.category = null;
  activeFilters.maxPrice = 20000;
  activeFilters.searchQuery = '';
  activeFilters.sortBy = '';

  document.querySelectorAll('.filter-check').forEach(c => c.classList.remove('checked'));
  document.querySelectorAll('.size-opt').forEach(s => s.classList.remove('active'));

  const slider = document.getElementById('price-range-input');
  const sliderLabel = document.getElementById('price-range-label');
  if (slider) slider.value = 20000;
  if (sliderLabel) sliderLabel.textContent = 'PKR 20,000';

  const sortSel = document.getElementById('sort-select');
  if (sortSel) sortSel.value = '';

  applyShopFilters();
  showToast('All filters cleared');
}

// Legacy alias used by sidebar "Clear All" button
function clearFilters() {
  clearAllFilters();
}

// ====== ACCORDION ======
function toggleAcc(btn) {
  const isOpen = btn.classList.contains('open');
  // Close all accordions first
  document.querySelectorAll('.acc-header.open').forEach(h => {
    h.classList.remove('open');
    h.nextElementSibling.classList.remove('open');
    h.querySelector('.acc-icon').textContent = '+';
  });
  // If this one was closed, open it
  if (!isOpen) {
    btn.classList.add('open');
    btn.nextElementSibling.classList.add('open');
    btn.querySelector('.acc-icon').textContent = '−';
  }
}

// ====== WISHLIST ======
function toggleWishlist(btn) {
  btn.classList.toggle('active');
  showToast(btn.classList.contains('active') ? 'Added to wishlist ♡' : 'Removed from wishlist');
}

// ====== MOBILE MENU ======
function toggleMobileMenu() {
  document.getElementById('mobile-menu').classList.toggle('open');
}

// ====== MOBILE FILTER TOGGLE (injected into sidebar on small screens) ======
function injectMobileFilterToggle() {
  const filterPanel = document.querySelector('.filters-panel');
  if (!filterPanel) return;
  if (document.getElementById('mobile-filter-toggle-btn')) return;

  const toggleBtn = document.createElement('button');
  toggleBtn.id = 'mobile-filter-toggle-btn';
  toggleBtn.className = 'btn-ghost';
  toggleBtn.style.cssText = 'width:100%;margin-bottom:16px;display:none;';
  toggleBtn.textContent = 'Show Filters +';

  function updateVisibility() {
    toggleBtn.style.display = window.innerWidth <= 900 ? 'block' : 'none';
  }

  toggleBtn.addEventListener('click', () => {
    filterPanel.classList.toggle('expanded');
    toggleBtn.textContent = filterPanel.classList.contains('expanded') ? 'Hide Filters —' : 'Show Filters +';
  });

  filterPanel.insertBefore(toggleBtn, filterPanel.firstChild);
  updateVisibility();
  window.addEventListener('resize', updateVisibility);
}

// ====== MISC ======
function closeAll() {
  document.getElementById('cart-drawer').classList.remove('open');
  document.getElementById('search-overlay').classList.remove('active');
  document.getElementById('overlay').classList.remove('active');
  document.getElementById('mobile-menu').classList.remove('open');
}

function scrollToSection(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}

function showToast(msg) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2800);
}

function handleNewsletterSignup(btn) {
  const input = btn.previousElementSibling;
  if (input && input.value && input.value.includes('@')) {
    showToast('Welcome to the HypeWear circle! 🎉');
    input.value = '';
  } else {
    showToast('Please enter a valid email address');
  }
}

// ====== LOAD MORE (pagination simulation) ======
function loadMoreProducts() {
  const shopGrid = document.getElementById('shop-grid');
  const loadMoreBtn = document.getElementById('load-more-btn');
  const countEl = document.getElementById('shop-count');
  if (!shopGrid || !loadMoreBtn) return;

  loadMoreBtn.textContent = 'Loading...';
  loadMoreBtn.disabled = true;
  loadMoreBtn.style.opacity = '0.5';

  setTimeout(() => {
    // Append a second batch (simulated — re-uses existing products with offset IDs)
    const batch = products.map(item => ({ ...item, id: item.id + 100 + shopGrid.children.length }));
    shopGrid.insertAdjacentHTML('beforeend', batch.map(p => renderProductCard(p)).join(''));

    const count = shopGrid.children.length;
    if (countEl) countEl.textContent = `Showing ${count} of ${products.length * 3} products`;

    if (count >= 24) {
      loadMoreBtn.textContent = 'All Items Loaded';
      loadMoreBtn.disabled = true;
      loadMoreBtn.style.opacity = '0.35';
      loadMoreBtn.style.cursor = 'not-allowed';
    } else {
      loadMoreBtn.textContent = 'Load More Products';
      loadMoreBtn.disabled = false;
      loadMoreBtn.style.opacity = '1';
    }
  }, 700);
}

// ====== COUNTDOWN ======
function startCountdown() {
  let h = 11, m = 59, s = 59;
  const fh = () => document.getElementById('cd-h');
  const fm = () => document.getElementById('cd-m');
  const fs = () => document.getElementById('cd-s');

  setInterval(() => {
    s--;
    if (s < 0) { s = 59; m--; }
    if (m < 0) { m = 59; h--; }
    if (h < 0) { h = 23; m = 59; s = 59; }
    if (fh()) fh().textContent = String(h).padStart(2, '0');
    if (fm()) fm().textContent = String(m).padStart(2, '0');
    if (fs()) fs().textContent = String(s).padStart(2, '0');
  }, 1000);
}

// ====== KEY EVENTS ======
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeAll();
  if (e.key === 'Enter' && document.getElementById('search-overlay').classList.contains('active')) {
    const val = document.getElementById('search-input').value.trim();
    if (val) commitSearch(val);
  }
});

// ====== BOOT ======
document.addEventListener('DOMContentLoaded', init);
