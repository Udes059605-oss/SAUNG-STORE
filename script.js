/* ═══════════════════════════════════════════
   SAUNG STOR — script.js
   Untuk ubah produk, harga, WA → edit file ini
   Jangan ubah toko-online.html atau style.css
═══════════════════════════════════════════ */

/* ──────────────────────────────────────
   ★ KONFIGURASI TOKO — ★
────────────────────────────────────── */
const WA_NUMBER = '6285694710980'; // Nomor WhatsApp toko (format: 62xxx)
const NAMA_TOKO = 'SAUNG STORE';
const NAMA_ADMIN = 'Dipsy';

/* ──────────────────────────────────────
   DATA PRODUK
   foto:
   • src: null        = tampil warna placeholder
   • src: 'foto.jpg'  = tampil foto Anda
   Letakkan foto satu folder dengan HTML
────────────────────────────────────── */
const PRODUCTS = [
  {
    id: 1, cat: 'Pakaian Pria', badge: 'new',
    name: 'Kemeja Linen Premium',
    desc: 'Kemeja linen organik premium dengan sirkulasi udara sempurna. Cocok untuk tampilan kasual maupun semi-formal.',
    price: 385000, oldPrice: 520000, rating: 5, reviews: 128,
    feats: [
      'Material: 100% Linen Organik',
      'Ukuran: S, M, L, XL, XXL',
      'Warna: Putih Krem, Biru Muda, Sage',
      'Mesin cuci friendly'
    ],
    imgs: [
      { src: 'icon.png', label: 'Tampak Depan',    grad: 'linear-gradient(145deg,#1a2a40,#2c4a6e)' },
      { src: 'icon.png', label: 'Tampak Belakang', grad: 'linear-gradient(145deg,#0f2030,#1e3a5a)' },
      { src: 'icon.png', label: 'Detail Bahan',    grad: 'linear-gradient(145deg,#142035,#253d5e)' },
    ]
  },
  {
    id: 2, cat: 'Aksesoris', badge: 'sale',
    name: 'Tas Kulit Selempang',
    desc: 'Tas selempang berbahan genuine leather dengan jahitan tangan presisi. Desain minimalis elegan untuk berbagai kesempatan.',
    price: 750000, oldPrice: 1100000, rating: 5, reviews: 94,
    feats: [
      'Material: Genuine Leather',
      'Dimensi: 26×18×8 cm',
      'Warna: Cognac, Hitam, Tan',
      'Tali adjustable metal buckle'
    ],
    imgs: [
      { src: 'icon.png', label: 'Tampak Depan',   grad: 'linear-gradient(145deg,#2d1a0e,#5a3418)' },
      { src: 'icon.png', label: 'Tampak Samping', grad: 'linear-gradient(145deg,#3d2210,#6b4020)' },
      { src: 'icon.png', label: 'Interior Tas',   grad: 'linear-gradient(145deg,#221508,#4a2c12)' },
    ]
  },
  {
    id: 3, cat: 'Alas Kaki', badge: 'best',
    name: 'Sneakers Suede Classic',
    desc: 'Sneakers suede premium dengan sole karet anti-slip. Desain timeless untuk segala outfit dan kesempatan.',
    price: 620000, oldPrice: 'icon.png', rating: 5, reviews: 211,
    feats: [
      'Material: Suede Asli Premium',
      'Ukuran: 38–44 EU',
      'Warna: Navy, Putih, Camel',
      'Anti-slip rubber outsole'
    ],
    imgs: [
      { src: 'icon.png', label: 'Tampak Samping', grad: 'linear-gradient(145deg,#121220,#1e2040)' },
      { src: 'icon.png', label: 'Tampak Atas',    grad: 'linear-gradient(145deg,#0a0a1a,#18183a)' },
      { src: 'icon.png', label: 'Detail Sole',    grad: 'linear-gradient(145deg,#080818,#141430)' },
    ]
  },
  {
    id: 4, cat: 'Aksesoris', badge: null,
    name: 'Jam Tangan Minimalis',
    desc: 'Jam tangan Skandinavian minimalis dengan dial bersih dan tali genuine leather. Gerakan quartz Jepang presisi tinggi.',
    price: 1250000, oldPrice: 1600000, rating: 5, reviews: 77,
    feats: [
      'Gerakan: Japanese Quartz',
      'Kaca: Mineral Crystal',
      'Tali: Leather 22mm',
      'Water resistant 50m'
    ],
    imgs: [
      { src: 'icon.png', label: 'Tampak Depan',   grad: 'linear-gradient(145deg,#2a1e08,#5a4010)' },
      { src: null, label: 'Tampak Samping', grad: 'linear-gradient(145deg,#1e1605,#48340c)' },
      { src: null, label: 'Detail Tali',    grad: 'linear-gradient(145deg,#140e02,#382808)' },
    ]
  },
  {
    id: 5, cat: 'Kecantikan', badge: 'new',
    name: 'Parfum Oud Royale',
    desc: 'Parfum eksklusif aroma oud Arabia kaya dan mewah. Ketahanan hingga 12 jam untuk siang maupun malam.',
    price: 890000, oldPrice: null, rating: 5, reviews: 156,
    feats: [
      'Volume: 100ml EDP',
      'Top: Bergamot, Saffron',
      'Heart: Rose, Oud Wood',
      'Base: Musk, Amber, Vanilla'
    ],
    imgs: [
      { src: 'icon.png', label: 'Botol Depan',   grad: 'linear-gradient(145deg,#1e0838,#4a1870)' },
      { src: null, label: 'Botol Samping', grad: 'linear-gradient(145deg,#28085a,#5e2088)' },
      { src: null, label: 'Detail Tutup',  grad: 'linear-gradient(145deg,#140428,#360c58)' },
    ]
  },
  {
    id: 6, cat: 'Pakaian Pria', badge: 'sale',
    name: 'Celana Chino Slim Fit',
    desc: 'Celana chino slim fit cotton stretch berkualitas tinggi. Nyaman, stylish, dan versatile untuk tampilan sehari-hari.',
    price: 295000, oldPrice: 420000, rating: 4, reviews: 183,
    feats: [
      'Material: 97% Cotton 3% Elastane',
      'Ukuran: 28–38 Waist',
      'Warna: Khaki, Navy, Olive, Hitam',
      'Stretch untuk kenyamanan gerak'
    ],
    imgs: [
      { src: 'icon.png', label: 'Tampak Depan',    grad: 'linear-gradient(145deg,#28200a,#4a3a14)' },
      { src: 'icon.png', label: 'Tampak Belakang', grad: 'linear-gradient(145deg,#1e180a,#3a2c10)' },
    ]
  },
  {
    id: 7, cat: 'Aksesoris', badge: 'new',
    name: 'Sunglasses Aviator Gold',
    desc: 'Kacamata aviator frame titanium ringan dengan lensa polarized UV400. Gaya klasik yang tak lekang waktu.',
    price: 480000, oldPrice: 650000, rating: 4, reviews: 62,
    feats: [
      'Frame: Titanium Alloy',
      'Lensa: Polarized UV400',
      'Warna: Gold, Silver, Black',
      'Berat: 18 gram ultra ringan'
    ],
    imgs: [
      { src: 'icon.png', label: 'Tampak Depan',   grad: 'linear-gradient(145deg,#201800,#483800)' },
      { src: 'icon.png', label: 'Tampak Samping', grad: 'linear-gradient(145deg,#301e00,#584000)' },
    ]
  },
  {
    id: 8, cat: 'Kecantikan', badge: 'best',
    name: 'Serum Retinol Night',
    desc: 'Serum retinol 0.5% formulasi advanced untuk regenerasi kulit optimal saat tidur. Anti-aging & cerahkan kulit.',
    price: 320000, oldPrice: null, rating: 5, reviews: 247,
    feats: [
      'Kandungan: Retinol 0.5%',
      'Volume: 30ml',
      'Cocok untuk semua jenis kulit',
      'Clinically tested'
    ],
    imgs: [
      { src: 'icon.png', label: 'Produk',  grad: 'linear-gradient(145deg,#081820,#102a38)' },
      { src: null, label: 'Tekstur', grad: 'linear-gradient(145deg,#041018,#0c2030)' },
      { src: null, label: 'Detail',  grad: 'linear-gradient(145deg,#060c10,#0e1e28)' },
    ]
  },
];

/* ──────────────────────────────────────
   HELPER FUNCTIONS
────────────────────────────────────── */
const fmt = n => 'Rp ' + n.toLocaleString('id-ID');

const waIconSVG = `<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.114.554 4.099 1.523 5.82L.057 23.928l6.204-1.428A11.949 11.949 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/>
</svg>`;

const bagIconSVG = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
  <circle cx="9" cy="21" r="1"/>
  <circle cx="20" cy="21" r="1"/>
  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
</svg>`;

function makePlaceholder(img, cls = '') {
  return `<div class="ph-wrap ${cls}" style="background:${img.grad}">
    <svg class="ph-icon" width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1">
      <rect x="3" y="3" width="18" height="18" rx="2.5"/>
      <circle cx="8.5" cy="8.5" r="1.5"/>
      <polyline points="21 15 16 10 5 21"/>
    </svg>
    <span class="ph-label">${img.label}</span>
  </div>`;
}

/* ──────────────────────────────────────
   FILTER KATEGORI
────────────────────────────────────── */
let activeFilter = 'Semua';
const categories = ['Semua', ...new Set(PRODUCTS.map(p => p.cat))];

function renderFilters() {
  document.getElementById('filterTabs').innerHTML = categories.map(cat =>
    `<button class="filter-tab ${cat === activeFilter ? 'active' : ''}" data-cat="${cat}">${cat}</button>`
  ).join('');

  document.querySelectorAll('.filter-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      activeFilter = btn.dataset.cat;
      renderFilters();
      renderGrid();
    });
  });
}

/* ──────────────────────────────────────
   RENDER GRID PRODUK
────────────────────────────────────── */
function renderGrid() {
  const list = activeFilter === 'Semua'
    ? PRODUCTS
    : PRODUCTS.filter(p => p.cat === activeFilter);

  const badgeClass = { new: 'badge-new', sale: 'badge-sale', best: 'badge-best' };
  const badgeText  = { new: 'NEW', sale: 'SALE', best: 'BEST' };

  document.getElementById('productsGrid').innerHTML = list.map(p => {
    const i0 = p.imgs[0];
    const i1 = p.imgs[1] || p.imgs[0];
    const stars = '★'.repeat(p.rating) + '☆'.repeat(5 - p.rating);

    const mainImg  = i0.src ? `<img class="img-main" src="${i0.src}" alt="${p.name}">` : makePlaceholder(i0, 'ph-main');
    const hoverImg = i1.src ? `<img class="img-hover" src="${i1.src}" alt="${p.name}">` : makePlaceholder(i1, 'ph-hover');

    return `
    <div class="product-card" data-id="${p.id}">
      <div class="card-img-wrap">
        ${p.badge ? `<div class="badge ${badgeClass[p.badge]}">${badgeText[p.badge]}</div>` : ''}
        <button class="wl-btn" data-wl="${p.id}" title="Wishlist">♡</button>
        ${mainImg}
        ${hoverImg}
        <div class="quick-btn" data-quick="${p.id}">✦ Lihat Detail</div>
      </div>
      <div class="card-body">
        <div class="card-cat">${p.cat}</div>
        <div class="card-name">${p.name}</div>
        <div class="card-desc">${p.desc}</div>
        <div class="card-stars">${stars} <span>(${p.reviews})</span></div>
        <div class="card-footer">
          <div>
            <div class="card-price">${fmt(p.price)}</div>
            ${p.oldPrice ? `<div class="card-old">${fmt(p.oldPrice)}</div>` : ''}
          </div>
          <div class="card-actions">
            <button class="btn-bag" data-bag="${p.id}" title="Tambah ke Keranjang">${bagIconSVG}</button>
            <button class="btn-wa"  data-buy="${p.id}">${waIconSVG} Beli</button>
          </div>
        </div>
      </div>
    </div>`;
  }).join('');

  // Pasang event listener ke card
  document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('click', () => openModal(+card.dataset.id));
  });
  document.querySelectorAll('.wl-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      showToast('Ditambahkan ke wishlist ❤️');
    });
  });
  document.querySelectorAll('.quick-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      openModal(+btn.dataset.quick);
    });
  });
  document.querySelectorAll('.btn-bag').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      addCart(+btn.dataset.bag);
    });
  });
  document.querySelectorAll('.btn-wa').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      buyWA(+btn.dataset.buy);
    });
  });
}

/* ──────────────────────────────────────
   MODAL DETAIL PRODUK
────────────────────────────────────── */
let curProd = null;
let mIdx = 0;

function openModal(id) {
  curProd = PRODUCTS.find(p => p.id === id);
  if (!curProd) return;
  mIdx = 0;

  document.getElementById('mSlides').innerHTML = curProd.imgs.map(img =>
    `<div class="m-slide">
      ${img.src
        ? `<img src="${img.src}" alt="${img.label}">`
        : `<div class="ms-ph" style="background:${img.grad}">
             <svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1" opacity=".22">
               <rect x="3" y="3" width="18" height="18" rx="2.5"/>
               <circle cx="8.5" cy="8.5" r="1.5"/>
               <polyline points="21 15 16 10 5 21"/>
             </svg>
             <span>${img.label}</span>
           </div>`
      }
    </div>`
  ).join('');

  document.getElementById('mThumbs').innerHTML = curProd.imgs.map((img, i) =>
    `<div class="m-thumb ${i === 0 ? 'active' : ''}" data-idx="${i}">
      ${img.src
        ? `<img src="${img.src}" alt="${img.label}">`
        : `<div class="th-ph" style="background:${img.grad}">📷</div>`
      }
    </div>`
  ).join('');

  document.querySelectorAll('.m-thumb').forEach(t => {
    t.addEventListener('click', () => mGo(+t.dataset.idx));
  });

  const disc  = curProd.oldPrice ? Math.round((1 - curProd.price / curProd.oldPrice) * 100) : 0;
  const stars = '★'.repeat(curProd.rating) + '☆'.repeat(5 - curProd.rating);

  document.getElementById('mInfo').innerHTML = `
    <div>
      <div class="m-cat">${curProd.cat}</div>
      <div class="m-name">${curProd.name}</div>
      <div class="m-stars-row">
        <div class="m-stars">${stars}</div>
        <div class="m-reviews">${curProd.reviews} ulasan</div>
      </div>
      <div class="m-price-row">
        <div class="m-price">${fmt(curProd.price)}</div>
        ${curProd.oldPrice ? `<div class="m-old">${fmt(curProd.oldPrice)}</div>` : ''}
        ${disc ? `<div class="m-disc">-${disc}%</div>` : ''}
      </div>
      <div class="m-div"></div>
      <div class="m-desc">${curProd.desc}</div>
      <ul class="m-feats">${curProd.feats.map(f => `<li>${f}</li>`).join('')}</ul>
    </div>
    <div class="m-btns">
      <button class="btn-m-cart" id="btnModalCart">${bagIconSVG} + Keranjang</button>
      <button class="btn-m-wa"   id="btnModalWA">${waIconSVG} Beli Sekarang</button>
    </div>`;

  document.getElementById('btnModalCart').addEventListener('click', () => addCart(curProd.id));
  document.getElementById('btnModalWA').addEventListener('click', () => buyWA(curProd.id));

  document.getElementById('modalBg').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function mGo(i) {
  mIdx = i;
  document.getElementById('mSlides').style.transform = `translateX(-${i * 100}%)`;
  document.querySelectorAll('.m-thumb').forEach((t, j) => t.classList.toggle('active', j === i));
}

function closeModal() {
  document.getElementById('modalBg').classList.remove('open');
  document.body.style.overflow = '';
}

/* ──────────────────────────────────────
   KERANJANG (CART)
────────────────────────────────────── */
let cart = [];

function addCart(id) {
  const p  = PRODUCTS.find(x => x.id === id);
  const ex = cart.find(c => c.id === id);
  if (ex) ex.qty++;
  else cart.push({ ...p, qty: 1 });
  updateCart();
  showToast(`${p.name} ditambahkan ke keranjang 🛍️`);
}

function removeCart(id) {
  cart = cart.filter(c => c.id !== id);
  updateCart();
}

function changeQty(id, delta) {
  const item = cart.find(c => c.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) removeCart(id);
  else updateCart();
}

function updateCart() {
  const total = cart.reduce((s, c) => s + c.price * c.qty, 0);
  const count = cart.reduce((s, c) => s + c.qty, 0);

  document.getElementById('cartCount').textContent = count;
  document.getElementById('cartTotal').textContent = fmt(total);

  const body = document.getElementById('cartBody');

  if (!cart.length) {
    body.innerHTML = `
      <div class="cart-empty">
        <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
          <circle cx="9" cy="21" r="1"/>
          <circle cx="20" cy="21" r="1"/>
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
        </svg>
        <p>Keranjang masih kosong</p>
      </div>`;
    return;
  }

  body.innerHTML = cart.map(c => {
    const img = c.imgs[0];
    return `
    <div class="cart-item">
      <div class="ci-img">
        ${img.src
          ? `<img src="${img.src}" alt="${c.name}">`
          : `<div class="ci-ph" style="background:${img.grad}">🛍️</div>`}
      </div>
      <div class="ci-info">
        <div class="ci-name">${c.name}</div>
        <div class="ci-price">${fmt(c.price)}</div>
        <div class="ci-qty">
          <button class="qty-btn" data-qminus="${c.id}">−</button>
          <span class="qty-n">${c.qty}</span>
          <button class="qty-btn" data-qplus="${c.id}">+</button>
        </div>
      </div>
      <button class="ci-del" data-del="${c.id}">🗑</button>
    </div>`;
  }).join('');

  // Event listener tombol qty & hapus
  body.querySelectorAll('[data-qminus]').forEach(b => b.addEventListener('click', () => changeQty(+b.dataset.qminus, -1)));
  body.querySelectorAll('[data-qplus]').forEach(b  => b.addEventListener('click', () => changeQty(+b.dataset.qplus, 1)));
  body.querySelectorAll('[data-del]').forEach(b    => b.addEventListener('click', () => removeCart(+b.dataset.del)));
}

function openCart() {
  document.getElementById('cartDrawer').classList.add('open');
  document.getElementById('cartOv').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeCart() {
  document.getElementById('cartDrawer').classList.remove('open');
  document.getElementById('cartOv').classList.remove('open');
  document.body.style.overflow = '';
}

/* ──────────────────────────────────────
   CHECKOUT MODAL
────────────────────────────────────── */
let selectedPay = '';

function openCheckout() {
  if (!cart.length) { showToast('Keranjang masih kosong!'); return; }

  document.getElementById('ckProductList').innerHTML = cart.map(c => {
    const img = c.imgs[0];
    return `
    <div class="ck-product-item">
      <div class="ck-prod-img">
        ${img.src
          ? `<img src="${img.src}" alt="${c.name}">`
          : `<div class="ck-prod-ph" style="background:${img.grad}">🛍️</div>`}
      </div>
      <div class="ck-prod-info">
        <div class="ck-prod-cat">${c.cat}</div>
        <div class="ck-prod-name">${c.name}</div>
        <div class="ck-prod-meta">
          <span class="ck-prod-qty">Qty: ${c.qty}</span>
          <span class="ck-prod-price">${fmt(c.price * c.qty)}</span>
        </div>
      </div>
    </div>`;
  }).join('');

  const subtotal  = cart.reduce((s, c) => s + c.price * c.qty, 0);
  const itemCount = cart.reduce((s, c) => s + c.qty, 0);

  document.getElementById('ckTotalBox').innerHTML = `
    <div class="ck-total-row">
      <span class="ck-total-label">Jumlah Item</span>
      <span class="ck-total-val">${itemCount} item</span>
    </div>
    <div class="ck-total-row">
      <span class="ck-total-label">Subtotal</span>
      <span class="ck-total-val">${fmt(subtotal)}</span>
    </div>
    <div class="ck-total-row">
      <span class="ck-total-label">Ongkir</span>
      <span class="ck-total-val">Dikonfirmasi admin</span>
    </div>
    <div class="ck-total-row main">
      <span class="ck-grand-label">Total Belanja</span>
      <span class="ck-grand-val">${fmt(subtotal)}</span>
    </div>`;

  // Reset form
  selectedPay = '';
  document.querySelectorAll('.pay-card').forEach(c => c.classList.remove('selected'));
  document.getElementById('bankInfo').classList.remove('show');
  ['ckNama','ckWa','ckAlamat','ckPos','ckNote'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = '';
  });
  document.getElementById('ckKurir').value = '';
  ['ckKabupaten','ckKecamatan','ckKelurahan'].forEach((id, i) => {
    const labels = ['-- Pilih Kabupaten/Kota --','-- Pilih Kecamatan --','-- Pilih Kelurahan/Desa --'];
    const el = document.getElementById(id);
    el.innerHTML = `<option value="">${labels[i]}</option>`;
    el.disabled = true;
  });
  document.getElementById('ckProvinsi').value = '';

  document.getElementById('ckBg').classList.add('open');
  closeCart();
  document.body.style.overflow = 'hidden';
}

function closeCheckout() {
  document.getElementById('ckBg').classList.remove('open');
  document.body.style.overflow = '';
}

/* ──────────────────────────────────────
   WHATSAPP
────────────────────────────────────── */
function openWA(msg) {
  window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`, '_system');
}

function buyWA(id) {
  const p = PRODUCTS.find(x => x.id === id);
  if (!p) return;
  const ex = cart.find(c => c.id === id);
  if (!ex) { cart.push({ ...p, qty: 1 }); updateCart(); }
  openCheckout();
}

function sendToWA() {
  const nama      = document.getElementById('ckNama').value.trim();
  const noWa      = document.getElementById('ckWa').value.trim();
  const provinsi  = document.getElementById('ckProvinsi');
  const kabupaten = document.getElementById('ckKabupaten');
  const kecamatan = document.getElementById('ckKecamatan');
  const kelurahan = document.getElementById('ckKelurahan');
  const alamat    = document.getElementById('ckAlamat').value.trim();
  const pos       = document.getElementById('ckPos').value.trim();
  const kurir     = document.getElementById('ckKurir').value;
  const note      = document.getElementById('ckNote').value.trim();

  const provText = provinsi.options[provinsi.selectedIndex]?.text  || '';
  const kabText  = kabupaten.options[kabupaten.selectedIndex]?.text || '';
  const kecText  = kecamatan.options[kecamatan.selectedIndex]?.text || '';
  const kelText  = kelurahan.options[kelurahan.selectedIndex]?.text || '';

  // Validasi
  if (!nama)            { showToast('⚠️ Nama lengkap wajib diisi!'); return; }
  if (!noWa)            { showToast('⚠️ Nomor WhatsApp wajib diisi!'); return; }
  if (!provinsi.value)  { showToast('⚠️ Pilih Provinsi dulu!'); return; }
  if (!kabupaten.value) { showToast('⚠️ Pilih Kabupaten/Kota dulu!'); return; }
  if (!kecamatan.value) { showToast('⚠️ Pilih Kecamatan dulu!'); return; }
  if (!kelurahan.value) { showToast('⚠️ Pilih Kelurahan/Desa dulu!'); return; }
  if (!alamat)          { showToast('⚠️ Detail alamat wajib diisi!'); return; }
  if (!kurir)           { showToast('⚠️ Pilih jasa pengiriman!'); return; }
  if (!selectedPay)     { showToast('⚠️ Pilih metode pembayaran!'); return; }

  const itemLines = cart.map(c =>
    `┌ 🛍️ *${c.name}*\n│ Kategori : ${c.cat}\n│ Harga    : ${fmt(c.price)}\n│ Jumlah   : ${c.qty} pcs\n└ Subtotal : *${fmt(c.price * c.qty)}*`
  ).join('\n\n');

  const subtotal = cart.reduce((s, c) => s + c.price * c.qty, 0);

  const msg =
`╔══════════════════════╗
   🛒 *PESANAN BARU — ${NAMA_TOKO}*
╚══════════════════════╝

📦 *DETAIL PRODUK:*
${itemLines}

──────────────────────
💰 *Total Belanja: ${fmt(subtotal)}*
   _(belum termasuk ongkir)_

──────────────────────
👤 *DATA PEMBELI:*
• Nama     : ${nama}
• No. WA   : ${noWa}

📍 *ALAMAT PENGIRIMAN:*
• Jalan    : ${alamat}
• Kelurahan: ${kelText}
• Kecamatan: ${kecText}
• Kab/Kota : ${kabText}
• Provinsi : ${provText}${pos ? `\n• Kode Pos : ${pos}` : ''}

🚚 *Pengiriman:* ${kurir}
💳 *Pembayaran:* ${selectedPay}
${note ? `\n📝 *Catatan:* ${note}` : ''}

──────────────────────
Mohon konfirmasi ketersediaan & total ongkir.
Terima kasih Kak ${NAMA_ADMIN}! 🙏`;

  openWA(msg);
  closeCheckout();
}

/* ──────────────────────────────────────
   WILAYAH INDONESIA (Dropdown Berantai)
────────────────────────────────────── */
const API_WILAYAH = 'https://www.emsifa.com/api-wilayah-indonesia/api';

async function loadProvinsi() {
  const sel = document.getElementById('ckProvinsi');
  try {
    const res  = await fetch(`${API_WILAYAH}/provinces.json`);
    const data = await res.json();
    data.forEach(p => {
      const opt = document.createElement('option');
      opt.value = p.id;
      opt.textContent = p.name;
      sel.appendChild(opt);
    });
  } catch {
    // Fallback jika offline
    const fallback = [
      {id:'11',name:'ACEH'},{id:'12',name:'SUMATERA UTARA'},{id:'13',name:'SUMATERA BARAT'},
      {id:'14',name:'RIAU'},{id:'15',name:'JAMBI'},{id:'16',name:'SUMATERA SELATAN'},
      {id:'17',name:'BENGKULU'},{id:'18',name:'LAMPUNG'},{id:'19',name:'KEP. BANGKA BELITUNG'},
      {id:'21',name:'KEP. RIAU'},{id:'31',name:'DKI JAKARTA'},{id:'32',name:'JAWA BARAT'},
      {id:'33',name:'JAWA TENGAH'},{id:'34',name:'DI YOGYAKARTA'},{id:'35',name:'JAWA TIMUR'},
      {id:'36',name:'BANTEN'},{id:'51',name:'BALI'},{id:'52',name:'NUSA TENGGARA BARAT'},
      {id:'53',name:'NUSA TENGGARA TIMUR'},{id:'61',name:'KALIMANTAN BARAT'},
      {id:'62',name:'KALIMANTAN TENGAH'},{id:'63',name:'KALIMANTAN SELATAN'},
      {id:'64',name:'KALIMANTAN TIMUR'},{id:'65',name:'KALIMANTAN UTARA'},
      {id:'71',name:'SULAWESI UTARA'},{id:'72',name:'SULAWESI TENGAH'},
      {id:'73',name:'SULAWESI SELATAN'},{id:'74',name:'SULAWESI TENGGARA'},
      {id:'75',name:'GORONTALO'},{id:'76',name:'SULAWESI BARAT'},
      {id:'81',name:'MALUKU'},{id:'82',name:'MALUKU UTARA'},
      {id:'91',name:'PAPUA BARAT'},{id:'92',name:'PAPUA'}
    ];
    fallback.forEach(p => {
      const opt = document.createElement('option');
      opt.value = p.id;
      opt.textContent = p.name;
      sel.appendChild(opt);
    });
  }
}

async function loadKabupaten() {
  const provId = document.getElementById('ckProvinsi').value;
  const sel    = document.getElementById('ckKabupaten');
  const loader = document.getElementById('loadKab');

  ['ckKabupaten','ckKecamatan','ckKelurahan'].forEach((id, i) => {
    const labels = ['-- Pilih Kabupaten/Kota --','-- Pilih Kecamatan --','-- Pilih Kelurahan/Desa --'];
    const el = document.getElementById(id);
    el.innerHTML = `<option value="">${labels[i]}</option>`;
    el.disabled = true;
  });

  if (!provId) return;

  loader.style.display = 'block';
  sel.disabled = true;

  try {
    const res  = await fetch(`${API_WILAYAH}/regencies/${provId}.json`);
    const data = await res.json();
    sel.innerHTML = '<option value="">-- Pilih Kabupaten/Kota --</option>';
    data.forEach(k => {
      const opt = document.createElement('option');
      opt.value = k.id;
      opt.textContent = k.name;
      sel.appendChild(opt);
    });
    sel.disabled = false;
  } catch {
    sel.innerHTML = '<option value="">Gagal memuat, coba lagi</option>';
    sel.disabled = false;
  }
  loader.style.display = 'none';
}

async function loadKecamatan() {
  const kabId  = document.getElementById('ckKabupaten').value;
  const sel    = document.getElementById('ckKecamatan');
  const loader = document.getElementById('loadKec');

  ['ckKecamatan','ckKelurahan'].forEach((id, i) => {
    const labels = ['-- Pilih Kecamatan --','-- Pilih Kelurahan/Desa --'];
    const el = document.getElementById(id);
    el.innerHTML = `<option value="">${labels[i]}</option>`;
    el.disabled = true;
  });

  if (!kabId) return;

  loader.style.display = 'block';
  sel.disabled = true;

  try {
    const res  = await fetch(`${API_WILAYAH}/districts/${kabId}.json`);
    const data = await res.json();
    sel.innerHTML = '<option value="">-- Pilih Kecamatan --</option>';
    data.forEach(k => {
      const opt = document.createElement('option');
      opt.value = k.id;
      opt.textContent = k.name;
      sel.appendChild(opt);
    });
    sel.disabled = false;
  } catch {
    sel.innerHTML = '<option value="">Gagal memuat, coba lagi</option>';
    sel.disabled = false;
  }
  loader.style.display = 'none';
}

async function loadKelurahan() {
  const kecId  = document.getElementById('ckKecamatan').value;
  const sel    = document.getElementById('ckKelurahan');
  const loader = document.getElementById('loadKel');

  sel.innerHTML = '<option value="">-- Pilih Kelurahan/Desa --</option>';
  sel.disabled = true;

  if (!kecId) return;

  loader.style.display = 'block';

  try {
    const res  = await fetch(`${API_WILAYAH}/villages/${kecId}.json`);
    const data = await res.json();
    sel.innerHTML = '<option value="">-- Pilih Kelurahan/Desa --</option>';
    data.forEach(k => {
      const opt = document.createElement('option');
      opt.value = k.id;
      opt.textContent = k.name;
      sel.appendChild(opt);
    });
    sel.disabled = false;
  } catch {
    sel.innerHTML = '<option value="">Gagal memuat, coba lagi</option>';
    sel.disabled = false;
  }
  loader.style.display = 'none';
}

/* ──────────────────────────────────────
   TOAST NOTIFIKASI
────────────────────────────────────── */
let toastTimer;
function showToast(msg) {
  const el = document.getElementById('toast');
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('show'), 2600);
}

/* ──────────────────────────────────────
   EVENT LISTENERS — dipasang setelah DOM siap
────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {

  // HERO buttons
  document.getElementById('btnScrollKatalog').addEventListener('click', () => {
    document.getElementById('katalog').scrollIntoView({ behavior: 'smooth' });
  });
  document.getElementById('btnKonsultasi').addEventListener('click', () => {
    openWA(`Halo Kak ${NAMA_ADMIN}! Saya ingin konsultasi produk ${NAMA_TOKO}.`);
  });

  // Cart
  document.getElementById('btnOpenCart').addEventListener('click', openCart);
  document.getElementById('btnCloseCart').addEventListener('click', closeCart);
  document.getElementById('cartOv').addEventListener('click', closeCart);
  document.getElementById('btnCheckout').addEventListener('click', openCheckout);

  // Modal produk
  document.getElementById('btnCloseModal').addEventListener('click', closeModal);
  document.getElementById('modalBg').addEventListener('click', e => {
    if (e.target === document.getElementById('modalBg')) closeModal();
  });
  document.getElementById('btnSlidePrev').addEventListener('click', () => {
    if (curProd) mGo((mIdx - 1 + curProd.imgs.length) % curProd.imgs.length);
  });
  document.getElementById('btnSlideNext').addEventListener('click', () => {
    if (curProd) mGo((mIdx + 1) % curProd.imgs.length);
  });

  // Checkout modal
  document.getElementById('btnCloseCk').addEventListener('click', closeCheckout);
  document.getElementById('ckBg').addEventListener('click', e => {
    if (e.target === document.getElementById('ckBg')) closeCheckout();
  });
  document.getElementById('btnSendWA').addEventListener('click', sendToWA);

  // Footer WA
  document.getElementById('btnFooterWA').addEventListener('click', e => {
    e.preventDefault();
    openWA(`Halo Kak ${NAMA_ADMIN}!`);
  });

  // Dropdown wilayah
  document.getElementById('ckProvinsi').addEventListener('change', loadKabupaten);
  document.getElementById('ckKabupaten').addEventListener('change', loadKecamatan);
  document.getElementById('ckKecamatan').addEventListener('change', loadKelurahan);

  // Metode pembayaran
  document.querySelectorAll('.pay-card').forEach(card => {
    card.addEventListener('click', () => {
      selectedPay = card.dataset.pay;
      document.querySelectorAll('.pay-card').forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');

      const info = document.getElementById('bankInfo');
      const txt  = document.getElementById('bankInfoText');

      if (selectedPay.includes('COD') || selectedPay.includes('QRIS')) {
        info.classList.remove('show');
      } else {
        txt.innerHTML = `ℹ️ <strong>${selectedPay}</strong><br>Nomor rekening akan dikonfirmasi oleh Kak ${NAMA_ADMIN} via WhatsApp setelah order masuk.`;
        info.classList.add('show');
      }
    });
  });

  // Init
  renderFilters();
  renderGrid();
  updateCart();
  loadProvinsi();
});
