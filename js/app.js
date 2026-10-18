/* ShopNest storefront: data, cart, layout, page logic */
(function () {
  "use strict";

  /* ---------- Catalog (edit freely; add img:"images/x.jpg" to show a real photo) ---------- */
  const CATS = [
    {name:"Electronics",em:"🎧",bg:"#e4e8ef"},
    {name:"Fashion",em:"👗",bg:"#efe4e1"},
    {name:"Home",em:"🛋️",bg:"#e7eadf"},
    {name:"Beauty",em:"🧴",bg:"#f1e6da"},
    {name:"Sports",em:"🏋️",bg:"#e0eae8"}
  ];
  const SWATCH = {Black:"#151515",White:"#f4f4f2",Sand:"#d8c7a6",Silver:"#c4c7cc",Olive:"#66714a",Navy:"#1f3556",Tan:"#b88a5a",Tortoise:"#7a4a2b",Rose:"#e8b4bc",Teal:"#2a8c88",Charcoal:"#3b3d42",Plum:"#6b2d5c"};
  const P = (id,name,cat,price,old,rate,rev,em,stock,desc,specs,opts) => ({id,name,cat,price,old,rate,rev,em,stock,desc,specs,opts:opts||[]});
  const PRODUCTS = [
    P(1,"Wireless Noise-Cancelling Headphones","Electronics",129,179,4.7,812,"🎧",24,"Over-ear headphones with adaptive noise cancellation, 40-hour battery life and memory-foam cushions. Pair with two devices at once and fold flat for travel.",[["Battery","40 hours"],["Connectivity","Bluetooth 5.3"],["Weight","250 g"],["Warranty","2 years"]],[{n:"Color",v:["Black","White","Sand"]}]),
    P(2,"Smart Watch Series 5","Electronics",199,249,4.6,530,"⌚",15,"Track workouts, heart rate and sleep on a bright AMOLED display. The battery lasts a full week between charges.",[["Display","1.8\" AMOLED"],["Battery","7 days"],["Water resistance","5 ATM"],["Warranty","1 year"]],[{n:"Color",v:["Black","Silver"]},{n:"Size",v:["40 mm","44 mm"]}]),
    P(3,"Mechanical Gaming Keyboard","Electronics",89,0,4.5,421,"⌨️",32,"Hot-swappable switches, per-key RGB lighting and a sturdy aluminium frame with a detachable USB-C cable.",[["Switches","Hot-swap red"],["Layout","Full size"],["Lighting","RGB"],["Cable","USB-C detachable"]]),
    P(4,"Portable Bluetooth Speaker","Electronics",59,79,4.4,298,"🔊",40,"Rugged, waterproof speaker with deep bass and 12 hours of playtime. Clips to a bag or stands on a shelf.",[["Battery","12 hours"],["Rating","IP67"],["Output","20 W"],["Weight","540 g"]],[{n:"Color",v:["Black","Olive","Navy"]}]),
    P(5,"Classic Denim Jacket","Fashion",69,95,4.5,365,"🧥",28,"A relaxed-fit denim jacket in heavyweight cotton with durable stitching. Layers over anything.",[["Material","100% cotton"],["Fit","Regular"],["Care","Machine wash cold"],["Origin","Imported"]],[{n:"Size",v:["S","M","L","XL"]}]),
    P(6,"Everyday Running Sneakers","Fashion",79,110,4.8,954,"👟",50,"Lightweight, breathable sneakers with responsive cushioning for daily runs and long days on your feet.",[["Upper","Breathable mesh"],["Sole","Rubber"],["Weight","270 g"],["Fit","True to size"]],[{n:"Color",v:["White","Black"]},{n:"Size",v:["7","8","9","10","11"]}]),
    P(7,"Leather Crossbody Bag","Fashion",99,0,4.6,210,"👜",12,"Full-grain leather bag with three compartments and an adjustable strap. Holds a phone, wallet and small tablet.",[["Material","Genuine leather"],["Capacity","6 L"],["Closure","Zip"],["Lining","Cotton"]],[{n:"Color",v:["Tan","Black"]}]),
    P(8,"Polarized Sunglasses","Fashion",45,60,4.3,187,"🕶️",60,"UV400 polarized lenses in a lightweight, flexible frame. Includes a hard case and cleaning cloth.",[["Lens","Polarized"],["UV protection","UV400"],["Frame","TR90"],["Case","Included"]],[{n:"Color",v:["Black","Tortoise"]}]),
    P(9,"Ceramic Table Lamp","Home",49,0,4.5,144,"💡",22,"Handmade ceramic base with a linen shade that gives a warm, even glow. Works with any E27 bulb.",[["Height","42 cm"],["Bulb","E27 (not included)"],["Material","Ceramic and linen"],["Cord","1.8 m"]]),
    P(10,"Memory Foam Pillow Set","Home",39,55,4.7,688,"🛏️",70,"Two ergonomic pillows that adapt to your sleeping position, with removable bamboo-blend covers.",[["Pieces","2"],["Filling","Memory foam"],["Cover","Bamboo blend"],["Care","Removable cover"]],[{n:"Size",v:["Standard","King"]}]),
    P(11,"Stainless Steel Cookware Set","Home",149,210,4.6,402,"🍳",9,"Ten-piece cookware set with even heat distribution and tempered glass lids. Works on induction.",[["Pieces","10"],["Material","18/10 steel"],["Induction","Yes"],["Dishwasher","Safe"]]),
    P(12,"Indoor Plant Trio","Home",35,0,4.8,276,"🪴",35,"Three low-maintenance plants in matte pots. Thrives in low to medium light.",[["Plants","3"],["Light","Low to medium"],["Pot size","12 cm"],["Care","Easy"]]),
    P(13,"Vitamin C Glow Serum","Beauty",28,36,4.6,590,"🧴",80,"A brightening serum with 15% vitamin C and hyaluronic acid. Apply to clean skin each morning.",[["Volume","30 ml"],["Skin type","All"],["Key ingredient","Vitamin C"],["Cruelty-free","Yes"]]),
    P(14,"Professional Hair Dryer","Beauty",65,90,4.4,233,"💨",0,"A 2200 W ionic dryer with three heat settings for fast, frizz-free drying.",[["Power","2200 W"],["Technology","Ionic"],["Settings","3 heat, 2 speed"],["Cable","3 m"]],[{n:"Color",v:["Black","Rose"]}]),
    P(15,"Yoga Mat Pro","Sports",34,0,4.7,445,"🧘",45,"Non-slip, eco-friendly 6 mm mat with alignment lines and a carry strap.",[["Thickness","6 mm"],["Size","183 x 61 cm"],["Material","TPE"],["Strap","Included"]],[{n:"Color",v:["Teal","Charcoal","Plum"]}]),
    P(16,"Adjustable Dumbbell Set","Sports",159,199,4.5,312,"🏋️",11,"Space-saving adjustable dumbbells from 2 to 24 kg with a quick-change dial.",[["Range","2 to 24 kg"],["Increments","2 kg"],["Material","Steel and ABS"],["Warranty","2 years"]])
  ];
  const COUPONS = {SAVE10:{pct:10,label:"10% off"},WELCOME20:{pct:20,label:"20% off"},FREESHIP:{ship:true,label:"Free shipping"}};
  const FREE_SHIP = 100, TAX = 0.07, SHIP = {std:6.99, exp:14.99};

  /* ---------- Helpers ---------- */
  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
  const money = n => "$" + Number(n).toFixed(2);
  const byId = id => PRODUCTS.find(p => p.id === Number(id));
  const bgOf = p => (CATS.find(c => c.name === p.cat) || CATS[0]).bg;
  const param = k => new URLSearchParams(location.search).get(k);
  const load = (k, d) => { try { const v = JSON.parse(localStorage.getItem(k)); return v == null ? d : v; } catch (e) { return d; } };
  const save = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} };
  const esc = s => String(s).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  const stars = r => "★".repeat(Math.round(r)) + "☆".repeat(5 - Math.round(r));
  const off = p => p.old ? Math.round((1 - p.price / p.old) * 100) : 0;
  const priceHTML = p => p.old ? `<span class="price"><span class="now">${money(p.price)}</span><s>${money(p.old)}</s></span>` : `<span class="price">${money(p.price)}</span>`;
  const IC = {
    search:'<svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></svg>',
    user:'<svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 21c1-4 4-6 8-6s7 2 8 6"/></svg>',
    bag:'<svg viewBox="0 0 24 24"><path d="M5 8h14l-1 12H6L5 8z"/><path d="M9 8V6a3 3 0 016 0v2"/></svg>',
    menu:'<svg viewBox="0 0 24 24"><path d="M4 7h16M4 12h16M4 17h16"/></svg>',
    close:'<svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18"/></svg>',
    truck:'<svg viewBox="0 0 24 24"><path d="M3 6h11v10H3zM14 9h4l3 3v4h-7"/><circle cx="7" cy="18" r="1.8"/><circle cx="17" cy="18" r="1.8"/></svg>',
    ret:'<svg viewBox="0 0 24 24"><path d="M4 12a8 8 0 108-8H7"/><path d="M10 1L7 4l3 3"/></svg>',
    lock:'<svg viewBox="0 0 24 24"><rect x="5" y="11" width="14" height="9" rx="1.5"/><path d="M8 11V8a4 4 0 018 0v3"/></svg>',
    chat:'<svg viewBox="0 0 24 24"><path d="M4 5h16v11H9l-5 4V5z"/></svg>'
  };

  /* ---------- Cart ---------- */
  const Cart = {
    get: () => load("sn_cart", []),
    set(c) { save("sn_cart", c); badge(); drawerRender(); },
    count: () => Cart.get().reduce((a, i) => a + i.qty, 0),
    add(id, qty, variant) {
      const p = byId(id); if (!p || p.stock < 1) return;
      const key = id + "|" + (variant || ""), c = Cart.get(), it = c.find(i => i.key === key);
      if (it) it.qty = Math.min(p.stock, it.qty + qty); else c.push({key, id, variant: variant || "", qty: Math.min(p.stock, qty)});
      Cart.set(c);
    },
    setQty(key, qty) {
      let c = Cart.get();
      if (qty < 1) c = c.filter(i => i.key !== key);
      else { const it = c.find(i => i.key === key); if (it) it.qty = Math.min(byId(it.id).stock, qty); }
      Cart.set(c);
    },
    clear() { Cart.set([]); },
    totals() {
      const items = Cart.get().map(i => ({...i, p: byId(i.id)})).filter(i => i.p);
      const subtotal = items.reduce((a, i) => a + i.p.price * i.qty, 0);
      const code = load("sn_coupon", null), cp = code && COUPONS[code];
      const discount = cp && cp.pct ? subtotal * cp.pct / 100 : 0;
      const method = load("sn_ship", "std");
      let shipping = 0;
      if (items.length) {
        if (method === "exp") shipping = SHIP.exp;
        else shipping = (cp && cp.ship) || subtotal - discount >= FREE_SHIP ? 0 : SHIP.std;
      }
      const tax = (subtotal - discount) * TAX;
      return {items, subtotal, discount, shipping, tax, method, total: subtotal - discount + shipping + tax, code: cp ? code : null, cp};
    }
  };
  function badge() { const n = Cart.count(); $$(".count").forEach(b => { b.textContent = n; b.style.display = n ? "grid" : "none"; }); }
  function toast(msg) {
    let t = $("#toast");
    if (!t) { t = document.createElement("div"); t.id = "toast"; t.className = "toast"; t.setAttribute("role", "status"); document.body.appendChild(t); }
    t.textContent = msg; t.classList.add("show"); clearTimeout(t._t); t._t = setTimeout(() => t.classList.remove("show"), 2400);
  }

  /* ---------- Drawers ---------- */
  function openDrawer(id) { closeAll(); $("#" + id).classList.add("open"); $("#overlay").classList.add("open"); document.body.style.overflow = "hidden"; }
  function closeAll() { $$(".drawer.open").forEach(d => d.classList.remove("open")); const o = $("#overlay"); if (o) o.classList.remove("open"); document.body.style.overflow = ""; }
  function drawerRender() {
    const box = $("#cartBody"); if (!box) return;
    const t = Cart.totals();
    $("#cartTitle").textContent = "Cart (" + Cart.count() + ")";
    if (!t.items.length) {
      box.innerHTML = `<div class="empty"><h3>Your cart is empty</h3><p class="muted">Add something you like and it will show up here.</p><button class="btn" data-close>Continue shopping</button></div>`;
      $("#cartFoot").style.display = "none"; $("#shipBar").style.display = "none"; return;
    }
    const left = Math.max(0, FREE_SHIP - (t.subtotal - t.discount));
    $("#shipBar").style.display = "block";
    $("#shipBar").innerHTML = left > 0 ? `Add <b>${money(left)}</b> more for free shipping<div class="track"><div class="fill" style="width:${Math.min(100, 100 - left / FREE_SHIP * 100)}%"></div></div>` : `You've unlocked <b>free shipping</b><div class="track"><div class="fill" style="width:100%"></div></div>`;
    box.innerHTML = t.items.map(i => `
      <div class="line-item">
        <a class="th" href="product.html?id=${i.id}" style="background:${bgOf(i.p)}">${i.p.em}</a>
        <div><h4><a href="product.html?id=${i.id}">${esc(i.p.name)}</a></h4>
          ${i.variant ? `<small>${esc(i.variant)}</small>` : ""}
          <div class="qty"><button data-dec="${i.key}" aria-label="Decrease quantity">−</button><span>${i.qty}</span><button data-inc="${i.key}" aria-label="Increase quantity">+</button></div>
          <div><button class="rm" data-rm="${i.key}">Remove</button></div></div>
        <div class="price">${money(i.p.price * i.qty)}</div>
      </div>`).join("");
    $("#cartFoot").style.display = "block";
    $("#cartFoot").innerHTML = `<div class="row total" style="border:none;margin:0;padding-top:0"><span>Subtotal</span><span>${money(t.subtotal)}</span></div>
      <p class="note" style="margin:4px 0 16px">Taxes and shipping are calculated at checkout.</p>
      <a class="btn full lg" href="checkout.html">Check out</a>
      <p class="center" style="margin-top:12px"><a class="link" href="cart.html">View cart</a></p>`;
  }

  /* ---------- Layout ---------- */
  function layout() {
    const page = document.body.dataset.page || "", minimal = document.body.dataset.layout === "minimal";
    const user = load("sn_user", null);
    const links = [["index.html","Home","home"],["shop.html","Shop","shop"],["about.html","About","about"],["contact.html","Contact","contact"],["faq.html","FAQ","faq"]];
    const H = $("#site-header"), F = $("#site-footer");
    if (minimal) {
      H.innerHTML = `<div class="co-bar"><div class="wrap"><a class="logo" href="index.html">ShopNest</a></div></div>`;
    } else {
      H.innerHTML = `
      <div class="announce">Free shipping on orders over <b>$100</b>. Use code <b>WELCOME20</b> for 20% off your first order.</div>
      <header class="hdr">
        <div class="wrap hdr-in">
          <div><button class="icon-btn burger" id="burger" aria-label="Open menu">${IC.menu}</button><a class="logo dsk" href="index.html">ShopNest</a></div>
          <div><nav class="nav-links" aria-label="Main">${links.map(l => `<a href="${l[0]}" class="${page === l[2] ? "active" : ""}">${l[1]}</a>`).join("")}</nav><a class="logo mob" href="index.html">ShopNest</a></div>
          <div class="icons">
            <button class="icon-btn" id="searchBtn" aria-label="Search">${IC.search}</button>
            <a class="icon-btn hide-m" href="login.html" aria-label="${user ? "Account" : "Log in"}">${IC.user}</a>
            <button class="icon-btn" id="cartBtn" aria-label="Open cart">${IC.bag}<span class="count"></span></button>
          </div>
        </div>
        <div class="searchbar" id="searchbar"><div class="wrap">
          <form action="shop.html" method="get" id="searchForm" autocomplete="off">${IC.search.replace("<svg","<svg width='20' height='20' fill='none' stroke='currentColor' stroke-width='1.7'")}
            <input name="q" id="searchIn" placeholder="Search products" aria-label="Search products"><button type="button" class="icon-btn" id="searchX" aria-label="Close search">${IC.close}</button></form>
          <div class="results" id="results" style="display:none"></div>
        </div></div>
      </header>
      <div class="overlay" id="overlay"></div>
      <aside class="drawer left" id="menuDrawer" aria-label="Menu"><div class="drawer-h"><h3>Menu</h3><button class="icon-btn" data-close aria-label="Close">${IC.close}</button></div>
        <div class="drawer-b mobile-links">${links.map(l => `<a href="${l[0]}">${l[1]}</a>`).join("")}<a href="login.html">${user ? "My account" : "Log in"}</a></div></aside>
      <aside class="drawer" id="cartDrawer" aria-label="Cart"><div class="drawer-h"><h3 id="cartTitle">Cart</h3><button class="icon-btn" data-close aria-label="Close cart">${IC.close}</button></div>
        <div class="ship-bar" id="shipBar"></div><div class="drawer-b" id="cartBody"></div><div class="drawer-f" id="cartFoot"></div></aside>`;
      $("#burger").onclick = () => openDrawer("menuDrawer");
      $("#cartBtn").onclick = () => openDrawer("cartDrawer");
      $("#overlay").onclick = closeAll;
      const sb = $("#searchbar"), si = $("#searchIn"), rs = $("#results");
      $("#searchBtn").onclick = () => { sb.classList.toggle("open"); if (sb.classList.contains("open")) si.focus(); };
      $("#searchX").onclick = () => { sb.classList.remove("open"); rs.style.display = "none"; si.value = ""; };
      si.oninput = () => {
        const q = si.value.trim().toLowerCase();
        if (!q) { rs.style.display = "none"; return; }
        const hit = PRODUCTS.filter(p => (p.name + " " + p.cat).toLowerCase().includes(q)).slice(0, 6);
        rs.style.display = "block";
        rs.innerHTML = hit.length ? hit.map(p => `<a href="product.html?id=${p.id}"><span class="th" style="background:${bgOf(p)}">${p.em}</span><span><b style="font-weight:500;color:var(--ink)">${esc(p.name)}</b><br><small>${money(p.price)}</small></span></a>`).join("") : `<p class="muted" style="padding:18px 0">No results for “${esc(si.value)}”. Try a different word.</p>`;
      };
    }
    if (!minimal) F.innerHTML = `
      <section class="news"><div class="wrap news-in">
        <div><h2>Get 10% off your first order</h2><p>Join our list for new arrivals and offers. Unsubscribe anytime.</p></div>
        <form id="nlForm"><input type="email" required placeholder="Email address" aria-label="Email address"><button class="btn">Subscribe</button></form>
      </div></section>
      <footer class="ftr"><div class="wrap">
        <div class="ftr-grid">
          <div><a class="logo" href="index.html">ShopNest</a><p>Everyday essentials, chosen with care and delivered fast.</p></div>
          <div><h4>Shop</h4><ul>${CATS.slice(0, 4).map(c => `<li><a href="shop.html?cat=${c.name}">${c.name}</a></li>`).join("")}<li><a href="shop.html">All products</a></li></ul></div>
          <div><h4>Help</h4><ul><li><a href="faq.html">Shipping and returns</a></li><li><a href="faq.html">FAQ</a></li><li><a href="contact.html">Contact us</a></li><li><a href="login.html">Track an order</a></li></ul></div>
          <div><h4>Company</h4><ul><li><a href="about.html">About ShopNest</a></li><li><a href="login.html">My account</a></li><li><a href="contact.html">Support</a></li></ul></div>
        </div>
        <div class="ftr-b"><span>© ${new Date().getFullYear()} ShopNest. All rights reserved.</span><div class="pay"><span>Visa</span><span>Mastercard</span><span>Cash on delivery</span></div></div>
      </div></footer>`;
    else if (F) F.innerHTML = "";
    document.addEventListener("click", e => {
      if (e.target.closest("[data-close]")) closeAll();
      const a = e.target.closest("[data-quick]");
      if (a) { quick(Number(a.dataset.quick)); }
      const inc = e.target.closest("[data-inc]"), dec = e.target.closest("[data-dec]"), rm = e.target.closest("[data-rm]");
      if (inc || dec || rm) {
        const key = (inc || dec || rm).dataset.inc || (inc || dec || rm).dataset.dec || (inc || dec || rm).dataset.rm;
        const it = Cart.get().find(i => i.key === key); if (!it) return;
        Cart.setQty(key, rm ? 0 : it.qty + (inc ? 1 : -1));
        if (typeof window.__cartPage === "function") window.__cartPage();
      }
    });
    document.addEventListener("keydown", e => { if (e.key === "Escape") { closeAll(); const sb = $("#searchbar"); if (sb) sb.classList.remove("open"); } });
    const nl = $("#nlForm"); if (nl) nl.onsubmit = e => { e.preventDefault(); nl.reset(); toast("You're subscribed. Check your inbox for your code."); };
    badge(); drawerRender();
  }
  function quick(id) {
    const p = byId(id);
    if (p.opts.length) { location.href = "product.html?id=" + id; return; }
    Cart.add(id, 1, ""); openDrawer("cartDrawer");
  }

  /* ---------- Components ---------- */
  function card(p) {
    const out = p.stock < 1, o = off(p);
    return `<article class="pcard">
      <div class="pimg" style="background:${bgOf(p)}">
        <a href="product.html?id=${p.id}" aria-label="${esc(p.name)}" style="position:absolute;inset:0;display:grid;place-items:center">${p.img ? `<img src="${p.img}" alt="${esc(p.name)}" loading="lazy">` : `<span class="em" aria-hidden="true">${p.em}</span>`}</a>
        ${out ? `<span class="tag out">Sold out</span>` : o ? `<span class="tag">Save ${o}%</span>` : ""}
        <button class="quick" data-quick="${p.id}" ${out ? "disabled" : ""}>${p.opts.length ? "Choose options" : "Quick add"}</button>
      </div>
      <div class="pinfo"><a href="product.html?id=${p.id}">${esc(p.name)}</a>${priceHTML(p)}</div>
    </article>`;
  }
  const rowsHTML = t => `
    <div class="row"><span>Subtotal</span><span>${money(t.subtotal)}</span></div>
    ${t.discount ? `<div class="row"><span>Discount (${t.code})</span><span>−${money(t.discount)}</span></div>` : ""}
    <div class="row"><span>Shipping</span><span>${t.shipping ? money(t.shipping) : "Free"}</span></div>
    <div class="row"><span>Estimated tax</span><span>${money(t.tax)}</span></div>
    <div class="row total"><span>Total</span><span>${money(t.total)}</span></div>`;

  /* ---------- Pages ---------- */
  const pages = {
    home() {
      $("#colls").innerHTML = CATS.map(c => `<a class="coll" href="shop.html?cat=${c.name}" style="background:${c.bg}"><span class="em">${c.em}</span><span class="nm">${c.name}<small>${PRODUCTS.filter(p => p.cat === c.name).length}</small></span></a>`).join("");
      $("#best").innerHTML = PRODUCTS.slice().sort((a, b) => b.rev - a.rev).slice(0, 8).map(card).join("");
      $("#sale").innerHTML = PRODUCTS.filter(p => p.old && p.stock).sort((a, b) => off(b) - off(a)).slice(0, 4).map(card).join("");
    },

    shop() {
      const S = {cat: param("cat") || "All", q: (param("q") || "").toLowerCase(), max: 250, sort: "featured", stock: false};
      const cf = $("#catFilters"), rng = $("#priceRange"), pv = $("#priceVal"), si = $("#shopSearch");
      cf.innerHTML = ["All", ...CATS.map(c => c.name)].map(c => `<label><input type="radio" name="cat" value="${c}" ${S.cat === c ? "checked" : ""}>${c}</label>`).join("");
      si.value = param("q") || "";
      function render() {
        let l = PRODUCTS.filter(p => (S.cat === "All" || p.cat === S.cat) && p.price <= S.max && (!S.stock || p.stock > 0) && (p.name + " " + p.cat).toLowerCase().includes(S.q));
        if (S.sort === "low") l.sort((a, b) => a.price - b.price);
        if (S.sort === "high") l.sort((a, b) => b.price - a.price);
        if (S.sort === "best") l.sort((a, b) => b.rev - a.rev);
        if (S.sort === "rating") l.sort((a, b) => b.rate - a.rate);
        $("#collTitle").textContent = S.q ? `Results for “${param("q") || si.value}”` : (S.cat === "All" ? "All products" : S.cat);
        $("#count").textContent = l.length + (l.length === 1 ? " product" : " products");
        $("#shopGrid").innerHTML = l.map(card).join("");
        $("#noResults").style.display = l.length ? "none" : "block";
      }
      cf.onchange = e => { S.cat = e.target.value; render(); };
      rng.oninput = () => { S.max = +rng.value; pv.textContent = "$" + rng.value; render(); };
      $("#stockOnly").onchange = e => { S.stock = e.target.checked; render(); };
      $("#sortSel").onchange = e => { S.sort = e.target.value; render(); };
      si.oninput = () => { S.q = si.value.trim().toLowerCase(); render(); };
      $("#resetBtn").onclick = () => { S.cat = "All"; S.q = ""; S.max = 250; S.sort = "featured"; S.stock = false; rng.value = 250; pv.textContent = "$250"; si.value = ""; $("#sortSel").value = "featured"; $("#stockOnly").checked = false; $$("input[name=cat]")[0].checked = true; render(); };
      $("#filterToggle").onclick = () => $("#filters").classList.toggle("open");
      render();
    },

    product() {
      const p = byId(param("id")), box = $("#pdp");
      if (!p) { box.innerHTML = `<div class="empty" style="grid-column:1/-1"><h3>We couldn't find that product</h3><p class="muted">It may have been removed or the link is out of date.</p><a class="btn" href="shop.html">Browse all products</a></div>`; return; }
      document.title = p.name + " | ShopNest";
      $("#crumbName").textContent = p.name;
      const sel = {}; p.opts.forEach(o => sel[o.n] = o.v[0]);
      const variant = () => p.opts.map(o => sel[o.n]).join(" / ");
      const out = p.stock < 1, shades = [bgOf(p), "#ecebe6", "#dddcd5", "#f4f3ef"], tf = ["", "rotate(-14deg) scale(.95)", "scale(.7) translateY(18px)", "scaleX(-1) scale(.9)"];
      box.innerHTML = `
      <div class="gallery">
        <div class="thumbs">${shades.map((s, i) => `<button data-th="${i}" class="${i ? "" : "on"}" style="background:${s}" aria-label="View image ${i + 1}"><span style="transform:${tf[i]};display:block;font-size:1.6rem">${p.em}</span></button>`).join("")}</div>
        <div class="stage" id="stage" style="background:${shades[0]}"><span class="em" id="stageEm">${p.em}</span>${off(p) ? `<span class="tag">Save ${off(p)}%</span>` : ""}</div>
      </div>
      <div>
        <p class="muted"><a href="shop.html?cat=${p.cat}" class="link" style="font-weight:400">${p.cat}</a></p>
        <h1>${esc(p.name)}</h1>
        <div class="rate"><span class="st">${stars(p.rate)}</span>${p.rate} (${p.rev} reviews)</div>
        <p style="margin-top:14px">${priceHTML(p)}</p>
        <p class="note" style="margin-top:2px">Tax included. Shipping calculated at checkout.</p>
        ${p.opts.map(o => `<div class="opt" data-opt="${o.n}"><div class="opt-l">${o.n}: <b>${sel[o.n]}</b></div><div class="chips">${o.v.map((v, i) => o.n === "Color" ? `<button class="sw ${i ? "" : "on"}" data-v="${v}" title="${v}" aria-label="${v}" style="background:${SWATCH[v] || "#ccc"}"></button>` : `<button class="chip ${i ? "" : "on"}" data-v="${v}">${v}</button>`).join("")}</div></div>`).join("")}
        <div class="buy" id="buyBox">
          <div class="qrow"><div class="qty"><button id="qm" aria-label="Decrease quantity">−</button><input id="qv" value="1" inputmode="numeric" aria-label="Quantity"><button id="qp" aria-label="Increase quantity">+</button></div>
            <button class="btn ghost lg" id="addBtn" style="flex:1" ${out ? "disabled" : ""}>${out ? "Sold out" : "Add to cart"}</button></div>
          <button class="btn lg" id="buyNow" ${out ? "disabled" : ""}>Buy it now</button>
        </div>
        <div class="stockline"><span class="dot ${out ? "out" : p.stock < 15 ? "low" : ""}"></span>${out ? "Out of stock" : p.stock < 15 ? `Low stock, only ${p.stock} left` : "In stock, ready to ship"}</div>
        <div style="margin-top:28px">
          <details open><summary>Description</summary><div class="in"><p>${esc(p.desc)}</p></div></details>
          <details><summary>Specifications</summary><div class="in"><table>${p.specs.map(s => `<tr><td>${s[0]}</td><td>${s[1]}</td></tr>`).join("")}</table></div></details>
          <details><summary>Shipping and returns</summary><div class="in"><p>Orders ship within 1 business day and arrive in 3 to 5 days. Shipping is free over $100. Return anything unused within 30 days for a full refund.</p></div></details>
        </div>
      </div>`;
      const qv = $("#qv"), clamp = () => { let v = parseInt(qv.value, 10) || 1; qv.value = Math.max(1, Math.min(p.stock || 1, v)); return +qv.value; };
      $("#qm").onclick = () => { qv.value = +qv.value - 1; clamp(); };
      $("#qp").onclick = () => { qv.value = +qv.value + 1; clamp(); };
      qv.onchange = clamp;
      $$("[data-opt]").forEach(g => g.addEventListener("click", e => {
        const b = e.target.closest("[data-v]"); if (!b) return;
        sel[g.dataset.opt] = b.dataset.v; $$("[data-v]", g).forEach(x => x.classList.toggle("on", x === b)); $(".opt-l b", g).textContent = b.dataset.v;
        sticky();
      }));
      $$("[data-th]").forEach(b => b.onclick = () => { const i = +b.dataset.th; $$("[data-th]").forEach(x => x.classList.toggle("on", x === b)); $("#stage").style.background = shades[i]; $("#stageEm").style.transform = tf[i]; });
      $("#addBtn").onclick = () => { Cart.add(p.id, clamp(), variant()); openDrawer("cartDrawer"); };
      $("#buyNow").onclick = () => { Cart.add(p.id, clamp(), variant()); location.href = "checkout.html"; };
      // Sticky add-to-cart
      const bar = document.createElement("div"); bar.className = "sticky-buy";
      function sticky() { bar.innerHTML = `<b>${esc(p.name)}${p.opts.length ? " · " + esc(variant()) : ""}</b><span class="price">${money(p.price)}</span><button class="btn sm" ${out ? "disabled" : ""}>${out ? "Sold out" : "Add to cart"}</button>`; $("button", bar).onclick = () => { Cart.add(p.id, clamp(), variant()); openDrawer("cartDrawer"); }; }
      sticky(); document.body.appendChild(bar);
      if ("IntersectionObserver" in window) new IntersectionObserver(([en]) => bar.classList.toggle("show", !en.isIntersecting && en.boundingClientRect.top < 0)).observe($("#buyBox"));
      $("#related").innerHTML = PRODUCTS.filter(x => x.cat === p.cat && x.id !== p.id).concat(PRODUCTS.filter(x => x.cat !== p.cat)).slice(0, 4).map(card).join("");
    },

    cart() {
      const wrap = $("#cartWrap");
      function render() {
        const t = Cart.totals();
        if (!t.items.length) { wrap.innerHTML = `<div class="empty"><h3>Your cart is empty</h3><p class="muted">Find something you like and add it to your cart.</p><a class="btn" href="shop.html">Continue shopping</a></div>`; return; }
        wrap.innerHTML = `<div class="cart-grid">
          <div>
            <div class="cart-head"><span>Product</span><span>Quantity</span><span style="text-align:right">Total</span></div>
            ${t.items.map(i => `<div class="cart-line">
              <div class="prod"><a class="th" href="product.html?id=${i.id}" style="background:${bgOf(i.p)}">${i.p.em}</a>
                <div><h4 style="font-weight:500"><a href="product.html?id=${i.id}">${esc(i.p.name)}</a></h4>${priceHTML(i.p)}${i.variant ? `<p class="note">${esc(i.variant)}</p>` : ""}</div></div>
              <div><div class="qty" style="margin:0"><button data-dec="${i.key}" aria-label="Decrease quantity">−</button><span>${i.qty}</span><button data-inc="${i.key}" aria-label="Increase quantity">+</button></div>
                <button class="rm link" data-rm="${i.key}" style="background:none;border:none;margin-left:12px;font-weight:400;color:var(--mute)">Remove</button></div>
              <div class="t price">${money(i.p.price * i.qty)}</div></div>`).join("")}
            <p style="margin-top:24px"><a class="link" href="shop.html">Continue shopping</a></p>
          </div>
          <aside class="summary"><h3>Order summary</h3>
            <div class="code-row"><input class="input" id="codeIn" placeholder="Discount code" value="${t.code || ""}" aria-label="Discount code"><button class="btn ghost" id="codeBtn">Apply</button></div>
            <p class="note ${t.code ? "ok" : ""}" style="margin-bottom:16px">${t.code ? t.cp.label + " applied" : "Try SAVE10, WELCOME20 or FREESHIP."}</p>
            ${rowsHTML(t)}<br><a class="btn full lg" href="checkout.html">Check out</a></aside></div>`;
        $("#codeBtn").onclick = () => {
          const c = $("#codeIn").value.trim().toUpperCase();
          if (!c) save("sn_coupon", null); else if (COUPONS[c]) save("sn_coupon", c); else { toast("That code isn't valid. Check it and try again."); return; }
          render(); drawerRender();
        };
      }
      window.__cartPage = render; render();
    },

    checkout() {
      const wrap = $("#coWrap"), t0 = Cart.totals();
      if (!t0.items.length) { wrap.innerHTML = `<div class="empty"><h3>Your cart is empty</h3><p class="muted">Add a product before checking out.</p><a class="btn" href="shop.html">Continue shopping</a></div>`; return; }
      const user = load("sn_user", null);
      if (user) { $("#cEmail").value = user.email; $("#cName").value = user.name; }
      function sum() {
        const t = Cart.totals();
        $("#coItems").innerHTML = t.items.map(i => `<div class="co-item"><div class="th" style="background:${bgOf(i.p)}">${i.p.em}<span class="q">${i.qty}</span></div><div>${esc(i.p.name)}${i.variant ? `<small>${esc(i.variant)}</small>` : ""}</div><span class="price">${money(i.p.price * i.qty)}</span></div>`).join("");
        $("#coTotals").innerHTML = rowsHTML(t);
        $("#stdPrice").textContent = (t.cp && t.cp.ship) || t.subtotal - t.discount >= FREE_SHIP ? "Free" : money(SHIP.std);
        $("#expPrice").textContent = money(SHIP.exp);
      }
      $$("input[name=ship]").forEach(r => { r.checked = r.value === t0.method; r.onchange = () => { save("sn_ship", r.value); sum(); }; });
      $$("input[name=pay]").forEach(r => r.onchange = () => { $("#cardBox").style.display = $("input[name=pay]:checked").value === "card" ? "block" : "none"; });
      $("#cNum").oninput = e => { e.target.value = e.target.value.replace(/\D/g, "").slice(0, 16).replace(/(\d{4})(?=\d)/g, "$1 "); };
      $("#cExp").oninput = e => { let v = e.target.value.replace(/\D/g, "").slice(0, 4); if (v.length > 2) v = v.slice(0, 2) + "/" + v.slice(2); e.target.value = v; };
      $("#codeBtn").onclick = () => {
        const c = $("#codeIn").value.trim().toUpperCase(), m = $("#codeMsg");
        if (!c) save("sn_coupon", null); else if (COUPONS[c]) save("sn_coupon", c); else { m.textContent = "That code isn't valid. Check it and try again."; m.style.color = "var(--sale)"; return; }
        m.textContent = c && COUPONS[c] ? COUPONS[c].label + " applied" : ""; m.style.color = "var(--ok)"; sum();
      };
      $("#coForm").onsubmit = e => {
        e.preventDefault();
        const f = e.target, pay = f.pay.value, err = $("#cardErr"); err.style.display = "none";
        if (pay === "card" && (f.cNum.value.replace(/\s/g, "").length < 13 || !/^\d{2}\/\d{2}$/.test(f.cExp.value) || f.cCvc.value.length < 3)) { err.textContent = "Enter a valid card number, expiry date and security code."; err.style.display = "block"; return; }
        const t = Cart.totals(), id = "SN" + Date.now().toString().slice(-8);
        const order = {id, date: new Date().toLocaleDateString(), email: f.cEmail.value, name: f.cName.value, address: `${f.addr.value}, ${f.city.value} ${f.zip.value}`, pay, ship: t.method, items: t.items.map(i => ({name: i.p.name, variant: i.variant, qty: i.qty, price: i.p.price})), totals: {subtotal: t.subtotal, discount: t.discount, shipping: t.shipping, tax: t.tax}, total: t.total};
        const o = load("sn_orders", []); o.unshift(order); save("sn_orders", o);
        Cart.clear(); save("sn_coupon", null); save("sn_ship", "std");
        location.href = "order-success.html?order=" + id;
      };
      sum();
    },

    success() {
      const o = load("sn_orders", []).find(x => x.id === param("order")), b = $("#doneBox");
      if (!o) { b.innerHTML = `<h1>We couldn't find that order</h1><p class="muted" style="margin:10px 0 24px">The link may be out of date.</p><a class="btn" href="shop.html">Continue shopping</a>`; return; }
      b.innerHTML = `<div class="ok">✓</div><p class="muted">Order #${o.id}</p><h1 style="margin:6px 0 12px">Thank you, ${esc(o.name.split(" ")[0])}</h1>
        <p style="margin-bottom:28px">Your order is confirmed. We sent the details to ${esc(o.email)}. Estimated delivery is ${o.ship === "exp" ? "1 to 2" : "3 to 5"} business days.</p>
        <div class="card"><h3 style="margin-bottom:14px">Order summary</h3>
          ${o.items.map(i => `<div class="row"><span>${esc(i.name)}${i.variant ? " (" + esc(i.variant) + ")" : ""} × ${i.qty}</span><span>${money(i.price * i.qty)}</span></div>`).join("")}
          <div class="row total"><span>Total</span><span>${money(o.total)}</span></div></div>
        <div class="card" style="margin-top:14px"><b style="color:var(--ink)">Shipping address</b><p>${esc(o.address)}</p><br><b style="color:var(--ink)">Payment</b><p>${o.pay === "cod" ? "Cash on delivery" : "Credit or debit card"}</p></div>
        <p style="margin-top:28px"><a class="btn" href="shop.html">Continue shopping</a></p>`;
    },

    login() {
      const w = $("#authWrap"), u = load("sn_user", null);
      if (u) {
        const os = load("sn_orders", []);
        w.innerHTML = `<h2 style="margin-bottom:4px">Hi, ${esc(u.name)}</h2><p class="muted" style="margin-bottom:28px">${esc(u.email)}</p>
          <h3 style="margin-bottom:12px">Order history</h3>
          ${os.length ? os.map(o => `<div class="row" style="border-bottom:1px solid var(--line);padding:14px 0"><span>#${o.id}<br><small class="muted">${o.date}</small></span><b style="color:var(--ink)">${money(o.total)}</b></div>`).join("") : `<p class="muted">You haven't placed any orders yet.</p>`}
          <br><button class="btn ghost" id="outBtn">Log out</button>`;
        $("#outBtn").onclick = () => { localStorage.removeItem("sn_user"); location.reload(); };
        return;
      }
      w.innerHTML = `<div class="tabs2"><button class="on" data-m="in">Log in</button><button data-m="up">Create account</button></div>
        <form id="authForm">
          <div class="field" id="nf" style="display:none"><label for="aN">Full name</label><input class="input" id="aN" autocomplete="name"></div>
          <div class="field"><label for="aE">Email</label><input class="input" id="aE" type="email" required autocomplete="email"></div>
          <div class="field"><label for="aP">Password</label><input class="input" id="aP" type="password" minlength="6" required autocomplete="current-password"></div>
          <button class="btn full lg" id="aB">Log in</button>
          <p class="note" style="margin-top:14px">This is a demo store. Accounts are saved in your browser only.</p>
        </form>`;
      let m = "in";
      $$(".tabs2 button").forEach(b => b.onclick = () => { m = b.dataset.m; $$(".tabs2 button").forEach(x => x.classList.toggle("on", x === b)); $("#nf").style.display = m === "up" ? "block" : "none"; $("#aB").textContent = m === "up" ? "Create account" : "Log in"; });
      $("#authForm").onsubmit = e => { e.preventDefault(); const em = $("#aE").value.trim(); save("sn_user", {name: (m === "up" && $("#aN").value.trim()) || em.split("@")[0], email: em}); location.href = param("next") || "index.html"; };
    },

    about() {
      $$("[data-count]").forEach(el => { const end = +el.dataset.count, suf = el.dataset.suffix || "", step = Math.max(1, Math.round(end / 50)); let n = 0; const t = setInterval(() => { n = Math.min(end, n + step); el.textContent = n.toLocaleString() + suf; if (n >= end) clearInterval(t); }, 24); });
    },
    contact() { $("#contactForm").onsubmit = e => { e.preventDefault(); e.target.reset(); toast("Message sent. We'll reply within one business day."); }; }
  };

  document.addEventListener("DOMContentLoaded", () => {
    layout();
    const fn = pages[document.body.dataset.init]; if (fn) fn();
  });
})();
