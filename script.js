/* ═══════════════════════════════════════════
   SAUNG STOR — script.js (Fullstack Edition)
   Produk diambil dari database Supabase
═══════════════════════════════════════════ */

const SUPABASE_URL = 'https://ityybmkjyjizxyvpabza.supabase.co';
const SUPABASE_KEY = 'sb_publishable_o6kxP8JFwNZwv7CBHzwfCg_3HUKEuYs';
const WA_NUMBER    = '6285694710980';
const NAMA_TOKO    = 'SAUNG STOR';
const NAMA_ADMIN   = 'Dipsy';

/* ── SUPABASE HELPER ── */
async function sbFetch(endpoint, options = {}) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${endpoint}`, {
    headers: {
      'apikey': SUPABASE_KEY,
      'Authorization': `Bearer ${SUPABASE_KEY}`,
      'Content-Type': 'application/json',
      ...options.headers
    },
    ...options
  });
  const text = await res.text();
  return text ? JSON.parse(text) : [];
}

/* ── HELPER ── */
const fmt = n => 'Rp ' + Number(n).toLocaleString('id-ID');

const waIconSVG = `<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.114.554 4.099 1.523 5.82L.057 23.928l6.204-1.428A11.949 11.949 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/></svg>`;
const bagIconSVG = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>`;

function makeImgEl(src, alt) {
  if (src && src.trim() !== '') return `<img src="${src}" alt="${alt}" style="width:100%;height:100%;object-fit:cover;">`;
  return `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:linear-gradient(145deg,#1a1a2e,#2d2d44);font-size:32px;">🛍️</div>`;
}

/* ── STATE ── */
let PRODUCTS = [];
let activeFilter = 'Semua';

/* ── LOAD PRODUK DARI SUPABASE ── */
async function loadProducts() {
  const grid = document.getElementById('productsGrid');
  grid.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:60px;color:#7a7068;"><div style="font-size:32px;margin-bottom:12px;">⏳</div><div>Memuat produk...</div></div>`;
  try {
    const data = await sbFetch('products?select=*&order=id.asc');
    PRODUCTS = data.map(p => ({
      id: p.id, cat: p.cat, badge: p.badge,
      name: p.name, desc: p.deskripsi || '',
      price: p.price, oldPrice: p.old_price,
      rating: p.rating || 5, reviews: p.reviews || 0,
      feats: p.feats || [],
      imgs: [
        p.img1 ? { src: p.img1, label: 'Foto 1' } : null,
        p.img2 ? { src: p.img2, label: 'Foto 2' } : null,
        p.img3 ? { src: p.img3, label: 'Foto 3' } : null,
      ].filter(Boolean)
    }));
    if (PRODUCTS.length === 0) {
      grid.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:60px;color:#7a7068;"><div style="font-size:48px;margin-bottom:16px;">📦</div><div style="font-size:18px;margin-bottom:8px;color:#a09080;">Belum ada produk</div><div style="font-size:13px;">Tambah produk melalui halaman Admin</div></div>`;
      return;
    }
    renderFilters();
    renderGrid();
  } catch (err) {
    grid.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:60px;color:#e05252;"><div style="font-size:32px;margin-bottom:12px;">⚠️</div><div>Gagal memuat produk. Cek koneksi internet.</div></div>`;
  }
}

/* ── FILTER ── */
function renderFilters() {
  const cats = ['Semua', ...new Set(PRODUCTS.map(p => p.cat))];
  document.getElementById('filterTabs').innerHTML = cats.map(cat =>
    `<button class="filter-tab ${cat === activeFilter ? 'active' : ''}" data-cat="${cat}">${cat}</button>`
  ).join('');
  document.querySelectorAll('.filter-tab').forEach(btn => {
    btn.addEventListener('click', () => { activeFilter = btn.dataset.cat; renderFilters(); renderGrid(); });
  });
}

/* ── GRID ── */
function renderGrid() {
  const list = activeFilter === 'Semua' ? PRODUCTS : PRODUCTS.filter(p => p.cat === activeFilter);
  if (list.length === 0) {
    document.getElementById('productsGrid').innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:60px;color:#7a7068;">Tidak ada produk di kategori ini</div>`;
    return;
  }
  const bClass = { new:'badge-new', sale:'badge-sale', best:'badge-best' };
  const bText  = { new:'NEW', sale:'SALE', best:'BEST' };
  document.getElementById('productsGrid').innerHTML = list.map(p => {
    const stars = '★'.repeat(p.rating) + '☆'.repeat(5 - p.rating);
    const img0  = p.imgs[0] || { src: '' };
    const img1  = p.imgs[1] || img0;
    const sold  = getSoldCount(p.id);
    return `
    <div class="product-card" data-id="${p.id}">
      <div class="card-img-wrap">
        ${p.badge ? `<div class="badge ${bClass[p.badge]||''}">${bText[p.badge]||p.badge}</div>` : ''}
        <button class="wl-btn" data-wl="${p.id}">♡</button>
        <div class="img-main" style="position:absolute;inset:0;">${makeImgEl(img0.src, p.name)}</div>
        <div class="img-hover" style="position:absolute;inset:0;opacity:0;transition:opacity .5s;">${makeImgEl(img1.src, p.name)}</div>
        <div class="quick-btn" data-quick="${p.id}">✦ Lihat Detail</div>
      </div>
      <div class="card-body">
        <div class="card-cat">${p.cat}</div>
        <div class="card-name">${p.name}</div>
        <div class="card-desc">${p.desc}</div>
        <div class="card-stars">${stars} <span>(${p.reviews})</span></div>
        ${sold > 0 ? `<div class="card-sold">✅ <strong>${sold}</strong> terjual</div>` : ''}
        <div class="card-footer">
          <div>
            <div class="card-price">${fmt(p.price)}</div>
            ${p.oldPrice ? `<div class="card-old">${fmt(p.oldPrice)}</div>` : ''}
          </div>
          <div class="card-actions">
            <button class="btn-bag" data-bag="${p.id}">${bagIconSVG}</button>
            <button class="btn-wa"  data-buy="${p.id}">${waIconSVG} Beli</button>
          </div>
        </div>
      </div>
    </div>`;
  }).join('');

  document.querySelectorAll('.product-card').forEach(card => card.addEventListener('click', () => openModal(+card.dataset.id)));
  document.querySelectorAll('.wl-btn').forEach(btn => btn.addEventListener('click', e => { e.stopPropagation(); showToast('Ditambahkan ke wishlist ❤️'); }));
  document.querySelectorAll('.quick-btn').forEach(btn => btn.addEventListener('click', e => { e.stopPropagation(); openModal(+btn.dataset.quick); }));
  document.querySelectorAll('.btn-bag').forEach(btn => btn.addEventListener('click', e => { e.stopPropagation(); addCart(+btn.dataset.bag); }));
  document.querySelectorAll('.btn-wa').forEach(btn => btn.addEventListener('click', e => { e.stopPropagation(); buyWA(+btn.dataset.buy); }));
  document.querySelectorAll('.product-card').forEach(card => {
    const main = card.querySelector('.img-main'), hover = card.querySelector('.img-hover');
    if (!main || !hover) return;
    card.addEventListener('mouseenter', () => { main.style.opacity='0'; hover.style.opacity='1'; });
    card.addEventListener('mouseleave', () => { main.style.opacity='1'; hover.style.opacity='0'; });
  });
}

/* ── MODAL PRODUK ── */
let curProd = null, mIdx = 0;
function openModal(id) {
  curProd = PRODUCTS.find(p => p.id === id);
  if (!curProd) return;
  mIdx = 0;
  const imgs = curProd.imgs.length > 0 ? curProd.imgs : [{ src: '', label: curProd.name }];
  document.getElementById('mSlides').innerHTML = imgs.map(img => `<div class="m-slide" style="min-width:100%;height:100%;">${makeImgEl(img.src, img.label)}</div>`).join('');
  document.getElementById('mThumbs').innerHTML = imgs.map((img, i) =>
    `<div class="m-thumb ${i===0?'active':''}" data-idx="${i}" style="width:54px;height:54px;border-radius:10px;overflow:hidden;border:2px solid ${i===0?'#c8a96e':'transparent'};cursor:pointer;flex-shrink:0;opacity:${i===0?1:.6};">${makeImgEl(img.src, img.label)}</div>`
  ).join('');
  document.querySelectorAll('.m-thumb').forEach(t => t.addEventListener('click', () => mGo(+t.dataset.idx)));
  const disc = curProd.oldPrice ? Math.round((1-curProd.price/curProd.oldPrice)*100) : 0;
  const stars = '★'.repeat(curProd.rating)+'☆'.repeat(5-curProd.rating);
  const feats = Array.isArray(curProd.feats) ? curProd.feats : [];
  document.getElementById('mInfo').innerHTML = `
    <div>
      <div class="m-cat">${curProd.cat}</div>
      <div class="m-name">${curProd.name}</div>
      <div class="m-stars-row"><div class="m-stars">${stars}</div><div class="m-reviews">${curProd.reviews} ulasan</div></div>
      <div class="m-price-row">
        <div class="m-price">${fmt(curProd.price)}</div>
        ${curProd.oldPrice?`<div class="m-old">${fmt(curProd.oldPrice)}</div>`:''}
        ${disc?`<div class="m-disc">-${disc}%</div>`:''}
      </div>
      <div class="m-div"></div>
      <div class="m-desc">${curProd.desc}</div>
      ${feats.length?`<ul class="m-feats">${feats.map(f=>`<li>${f}</li>`).join('')}</ul>`:''}
    </div>
    <div class="m-btns">
      <button class="btn-m-cart" id="btnModalCart">${bagIconSVG} + Keranjang</button>
      <button class="btn-m-wa" id="btnModalWA">${waIconSVG} Beli Sekarang</button>
    </div>`;
  document.getElementById('btnModalCart').addEventListener('click', () => addCart(curProd.id));
  document.getElementById('btnModalWA').addEventListener('click', () => buyWA(curProd.id));
  document.getElementById('modalBg').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function mGo(i) {
  mIdx = i;
  document.getElementById('mSlides').style.transform = `translateX(-${i*100}%)`;
  document.querySelectorAll('.m-thumb').forEach((t,j) => { t.style.borderColor=j===i?'#c8a96e':'transparent'; t.style.opacity=j===i?'1':'.6'; });
}
function closeModal() { document.getElementById('modalBg').classList.remove('open'); document.body.style.overflow=''; }

/* ── KERANJANG ── */
let cart = [];
function addCart(id) {
  const p=PRODUCTS.find(x=>x.id===id); if(!p) return;
  const ex=cart.find(c=>c.id===id);
  if(ex) ex.qty++; else cart.push({...p,qty:1});
  updateCart(); showToast(`${p.name} ditambahkan ke keranjang 🛍️`);
}
function removeCart(id) { cart=cart.filter(c=>c.id!==id); updateCart(); }
function changeQty(id,delta) {
  const item=cart.find(c=>c.id===id); if(!item) return;
  item.qty+=delta; if(item.qty<=0) removeCart(id); else updateCart();
}
function updateCart() {
  const total=cart.reduce((s,c)=>s+c.price*c.qty,0);
  const count=cart.reduce((s,c)=>s+c.qty,0);
  document.getElementById('cartCount').textContent=count;
  document.getElementById('cartTotal').textContent=fmt(total);
  const body=document.getElementById('cartBody');
  if(!cart.length){
    body.innerHTML=`<div class="cart-empty"><svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg><p>Keranjang masih kosong</p></div>`;
    return;
  }
  body.innerHTML=cart.map(c=>{
    const img=c.imgs&&c.imgs[0]?c.imgs[0]:{src:''};
    return `<div class="cart-item">
      <div class="ci-img">${makeImgEl(img.src,c.name)}</div>
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
  body.querySelectorAll('[data-qminus]').forEach(b=>b.addEventListener('click',()=>changeQty(+b.dataset.qminus,-1)));
  body.querySelectorAll('[data-qplus]').forEach(b=>b.addEventListener('click',()=>changeQty(+b.dataset.qplus,1)));
  body.querySelectorAll('[data-del]').forEach(b=>b.addEventListener('click',()=>removeCart(+b.dataset.del)));
}
function openCart() { document.getElementById('cartDrawer').classList.add('open'); document.getElementById('cartOv').classList.add('open'); document.body.style.overflow='hidden'; }
function closeCart() { document.getElementById('cartDrawer').classList.remove('open'); document.getElementById('cartOv').classList.remove('open'); document.body.style.overflow=''; }

/* ── CHECKOUT ── */
function openCheckout() {
  if(!cart.length){showToast('Keranjang masih kosong!');return;}
  document.getElementById('ckProductList').innerHTML=cart.map(c=>{
    const img=c.imgs&&c.imgs[0]?c.imgs[0]:{src:''};
    return `<div class="ck-product-item">
      <div class="ck-prod-img">${makeImgEl(img.src,c.name)}</div>
      <div class="ck-prod-info">
        <div class="ck-prod-cat">${c.cat}</div>
        <div class="ck-prod-name">${c.name}</div>
        <div class="ck-prod-meta"><span class="ck-prod-qty">Qty: ${c.qty}</span><span class="ck-prod-price">${fmt(c.price*c.qty)}</span></div>
      </div>
    </div>`;
  }).join('');
  const subtotal=cart.reduce((s,c)=>s+c.price*c.qty,0);
  const itemCount=cart.reduce((s,c)=>s+c.qty,0);
  document.getElementById('ckTotalBox').innerHTML=`
    <div class="ck-total-row"><span class="ck-total-label">Jumlah Item</span><span class="ck-total-val">${itemCount} item</span></div>
    <div class="ck-total-row"><span class="ck-total-label">Subtotal</span><span class="ck-total-val">${fmt(subtotal)}</span></div>
    <div class="ck-total-row"><span class="ck-total-label">Ongkir</span><span class="ck-total-val">Dikonfirmasi admin</span></div>
    <div class="ck-total-row main"><span class="ck-grand-label">Total Belanja</span><span class="ck-grand-val">${fmt(subtotal)}</span></div>`;

  ['ckNama','ckWa','ckAlamat','ckPos','ckNote'].forEach(id=>{const el=document.getElementById(id);if(el)el.value='';});
  document.getElementById('ckKurir').value='';
  ['ckKabupaten','ckKecamatan','ckKelurahan'].forEach((id,i)=>{
    const el=document.getElementById(id);
    el.innerHTML=`<option value="">${['-- Pilih Kabupaten/Kota --','-- Pilih Kecamatan --','-- Pilih Kelurahan/Desa --'][i]}</option>`;
    el.disabled=true;
  });
  document.getElementById('ckProvinsi').value='';
  document.getElementById('ckBg').classList.add('open');
  closeCart(); document.body.style.overflow='hidden';
}
function closeCheckout(){document.getElementById('ckBg').classList.remove('open');document.body.style.overflow='';}

/* ── WHATSAPP ── */
function openWA(msg){window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`,'_system');}
function buyWA(id){
  const p=PRODUCTS.find(x=>x.id===id);if(!p)return;
  const ex=cart.find(c=>c.id===id);
  if(!ex){cart.push({...p,qty:1});updateCart();}
  openCheckout();
}
function sendToWA(){
  const nama=document.getElementById('ckNama').value.trim();
  const noWa=document.getElementById('ckWa').value.trim();
  const provinsi=document.getElementById('ckProvinsi');
  const kabupaten=document.getElementById('ckKabupaten');
  const kecamatan=document.getElementById('ckKecamatan');
  const kelurahan=document.getElementById('ckKelurahan');
  const alamat=document.getElementById('ckAlamat').value.trim();
  const pos=document.getElementById('ckPos').value.trim();
  const kurir=document.getElementById('ckKurir').value;
  const note=document.getElementById('ckNote').value.trim();
  const provText=provinsi.options[provinsi.selectedIndex]?.text||'';
  const kabText=kabupaten.options[kabupaten.selectedIndex]?.text||'';
  const kecText=kecamatan.options[kecamatan.selectedIndex]?.text||'';
  const kelText=kelurahan.options[kelurahan.selectedIndex]?.text||'';
  if(!nama){showToast('⚠️ Nama lengkap wajib diisi!');return;}
  if(!noWa){showToast('⚠️ Nomor WhatsApp wajib diisi!');return;}
  if(!provinsi.value){showToast('⚠️ Pilih Provinsi dulu!');return;}
  if(!kabupaten.value){showToast('⚠️ Pilih Kabupaten/Kota dulu!');return;}
  if(!kecamatan.value){showToast('⚠️ Pilih Kecamatan dulu!');return;}
  if(!kelurahan.value){showToast('⚠️ Pilih Kelurahan/Desa dulu!');return;}
  if(!alamat){showToast('⚠️ Detail alamat wajib diisi!');return;}
  if(!kurir){showToast('⚠️ Pilih jasa pengiriman!');return;}
  const itemLines=cart.map(c=>`┌ 🛍️ *${c.name}*\n│ Kategori : ${c.cat}\n│ Harga    : ${fmt(c.price)}\n│ Jumlah   : ${c.qty} pcs\n└ Subtotal : *${fmt(c.price*c.qty)}*`).join('\n\n');
  const subtotal=cart.reduce((s,c)=>s+c.price*c.qty,0);
  const msg=`╔══════════════════════╗\n   🛒 *PESANAN BARU — ${NAMA_TOKO}*\n╚══════════════════════╝\n\n📦 *DETAIL PRODUK:*\n${itemLines}\n\n──────────────────────\n💰 *Total Belanja: ${fmt(subtotal)}*\n   _(belum termasuk ongkir)_\n\n──────────────────────\n👤 *DATA PEMBELI:*\n• Nama     : ${nama}\n• No. WA   : ${noWa}\n\n📍 *ALAMAT PENGIRIMAN:*\n• Jalan    : ${alamat}\n• Kelurahan: ${kelText}\n• Kecamatan: ${kecText}\n• Kab/Kota : ${kabText}\n• Provinsi : ${provText}${pos?`\n• Kode Pos : ${pos}`:''}\n\n🚚 *Pengiriman:* ${kurir}${note?`\n\n📝 *Catatan:* ${note}`:''}\n\n──────────────────────\nMohon konfirmasi ketersediaan & total ongkir.\nTerima kasih Kak ${NAMA_ADMIN}! 🙏`;
  cart.forEach(c=>recordSale(c.id,c.qty));
  openWA(msg); closeCheckout(); renderGrid();
}

/* ── PENJUALAN ── */
function getSales(){try{return JSON.parse(localStorage.getItem('saungstor_sales')||'{}');}catch{return{};}}
function saveSales(d){try{localStorage.setItem('saungstor_sales',JSON.stringify(d));}catch{}}
function recordSale(id,qty){const s=getSales();s[id]=(s[id]||0)+qty;saveSales(s);}
function getSoldCount(id){return getSales()[id]||0;}

/* ── WILAYAH ── */
const API_WILAYAH='https://www.emsifa.com/api-wilayah-indonesia/api';
async function loadProvinsi(){
  const sel=document.getElementById('ckProvinsi');
  try{
    const data=await(await fetch(`${API_WILAYAH}/provinces.json`)).json();
    data.forEach(p=>{const o=document.createElement('option');o.value=p.id;o.textContent=p.name;sel.appendChild(o);});
  }catch{
    [{id:'11',name:'ACEH'},{id:'12',name:'SUMATERA UTARA'},{id:'13',name:'SUMATERA BARAT'},{id:'14',name:'RIAU'},{id:'15',name:'JAMBI'},{id:'16',name:'SUMATERA SELATAN'},{id:'17',name:'BENGKULU'},{id:'18',name:'LAMPUNG'},{id:'19',name:'KEP. BANGKA BELITUNG'},{id:'21',name:'KEP. RIAU'},{id:'31',name:'DKI JAKARTA'},{id:'32',name:'JAWA BARAT'},{id:'33',name:'JAWA TENGAH'},{id:'34',name:'DI YOGYAKARTA'},{id:'35',name:'JAWA TIMUR'},{id:'36',name:'BANTEN'},{id:'51',name:'BALI'},{id:'52',name:'NUSA TENGGARA BARAT'},{id:'53',name:'NUSA TENGGARA TIMUR'},{id:'61',name:'KALIMANTAN BARAT'},{id:'62',name:'KALIMANTAN TENGAH'},{id:'63',name:'KALIMANTAN SELATAN'},{id:'64',name:'KALIMANTAN TIMUR'},{id:'65',name:'KALIMANTAN UTARA'},{id:'71',name:'SULAWESI UTARA'},{id:'72',name:'SULAWESI TENGAH'},{id:'73',name:'SULAWESI SELATAN'},{id:'74',name:'SULAWESI TENGGARA'},{id:'75',name:'GORONTALO'},{id:'76',name:'SULAWESI BARAT'},{id:'81',name:'MALUKU'},{id:'82',name:'MALUKU UTARA'},{id:'91',name:'PAPUA BARAT'},{id:'92',name:'PAPUA'},{id:'93',name:'PAPUA SELATAN'},{id:'94',name:'PAPUA TENGAH'},{id:'95',name:'PAPUA PEGUNUNGAN'},{id:'96',name:'PAPUA BARAT DAYA'}]
    .forEach(p=>{const o=document.createElement('option');o.value=p.id;o.textContent=p.name;sel.appendChild(o);});
  }
}
async function loadKabupaten(){
  const provId=document.getElementById('ckProvinsi').value;
  const sel=document.getElementById('ckKabupaten');
  const loader=document.getElementById('loadKab');
  ['ckKabupaten','ckKecamatan','ckKelurahan'].forEach((id,i)=>{const el=document.getElementById(id);el.innerHTML=`<option value="">${['-- Pilih Kabupaten/Kota --','-- Pilih Kecamatan --','-- Pilih Kelurahan/Desa --'][i]}</option>`;el.disabled=true;});
  if(!provId)return;
  loader.style.display='block';sel.disabled=true;
  try{const data=await(await fetch(`${API_WILAYAH}/regencies/${provId}.json`)).json();sel.innerHTML='<option value="">-- Pilih Kabupaten/Kota --</option>';data.forEach(k=>{const o=document.createElement('option');o.value=k.id;o.textContent=k.name;sel.appendChild(o);});sel.disabled=false;}
  catch{sel.innerHTML='<option value="">Gagal memuat</option>';sel.disabled=false;}
  loader.style.display='none';
}
async function loadKecamatan(){
  const kabId=document.getElementById('ckKabupaten').value;
  const sel=document.getElementById('ckKecamatan');
  const loader=document.getElementById('loadKec');
  ['ckKecamatan','ckKelurahan'].forEach((id,i)=>{const el=document.getElementById(id);el.innerHTML=`<option value="">${['-- Pilih Kecamatan --','-- Pilih Kelurahan/Desa --'][i]}</option>`;el.disabled=true;});
  if(!kabId)return;
  loader.style.display='block';sel.disabled=true;
  try{const data=await(await fetch(`${API_WILAYAH}/districts/${kabId}.json`)).json();sel.innerHTML='<option value="">-- Pilih Kecamatan --</option>';data.forEach(k=>{const o=document.createElement('option');o.value=k.id;o.textContent=k.name;sel.appendChild(o);});sel.disabled=false;}
  catch{sel.innerHTML='<option value="">Gagal memuat</option>';sel.disabled=false;}
  loader.style.display='none';
}
async function loadKelurahan(){
  const kecId=document.getElementById('ckKecamatan').value;
  const sel=document.getElementById('ckKelurahan');
  const loader=document.getElementById('loadKel');
  sel.innerHTML='<option value="">-- Pilih Kelurahan/Desa --</option>';sel.disabled=true;
  if(!kecId)return;
  loader.style.display='block';
  try{const data=await(await fetch(`${API_WILAYAH}/villages/${kecId}.json`)).json();sel.innerHTML='<option value="">-- Pilih Kelurahan/Desa --</option>';data.forEach(k=>{const o=document.createElement('option');o.value=k.id;o.textContent=k.name;sel.appendChild(o);});sel.disabled=false;}
  catch{sel.innerHTML='<option value="">Gagal memuat</option>';sel.disabled=false;}
  loader.style.display='none';
}

/* ── TOAST ── */
let toastTimer;
function showToast(msg){const el=document.getElementById('toast');el.textContent=msg;el.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.classList.remove('show'),2600);}

/* ── INIT ── */
document.addEventListener('DOMContentLoaded',()=>{
  document.getElementById('btnScrollKatalog').addEventListener('click',()=>document.getElementById('katalog').scrollIntoView({behavior:'smooth'}));
  document.getElementById('btnKonsultasi').addEventListener('click',()=>openWA(`Halo Kak ${NAMA_ADMIN}! Saya ingin konsultasi produk ${NAMA_TOKO}.`));
  document.getElementById('btnOpenCart').addEventListener('click',openCart);
  document.getElementById('btnCloseCart').addEventListener('click',closeCart);
  document.getElementById('cartOv').addEventListener('click',closeCart);
  document.getElementById('btnCheckout').addEventListener('click',openCheckout);
  document.getElementById('btnCloseModal').addEventListener('click',closeModal);
  document.getElementById('modalBg').addEventListener('click',e=>{if(e.target===document.getElementById('modalBg'))closeModal();});
  document.getElementById('btnSlidePrev').addEventListener('click',()=>{if(curProd&&curProd.imgs.length)mGo((mIdx-1+curProd.imgs.length)%curProd.imgs.length);});
  document.getElementById('btnSlideNext').addEventListener('click',()=>{if(curProd&&curProd.imgs.length)mGo((mIdx+1)%curProd.imgs.length);});
  document.getElementById('btnCloseCk').addEventListener('click',closeCheckout);
  document.getElementById('ckBg').addEventListener('click',e=>{if(e.target===document.getElementById('ckBg'))closeCheckout();});
  document.getElementById('btnSendWA').addEventListener('click',sendToWA);
  document.getElementById('btnFooterWA').addEventListener('click',e=>{e.preventDefault();openWA(`Halo Kak ${NAMA_ADMIN}!`);});
  document.getElementById('ckProvinsi').addEventListener('change',loadKabupaten);
  document.getElementById('ckKabupaten').addEventListener('change',loadKecamatan);
  document.getElementById('ckKecamatan').addEventListener('change',loadKelurahan);
  });
  updateCart();
  loadProvinsi();
  loadProducts();
});
