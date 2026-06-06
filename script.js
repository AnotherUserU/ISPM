const roleMeta = {
  customer: {
    avatar: "CU",
    title: "Customer Portal",
    subtitle: "Reservasi storage, daftar SKU, monitor stok, outbound, dan invoice.",
    menu: ["overview", "profile", "reservation", "products", "inventory", "pickup", "outbound", "billing", "notifications", "exports"]
  },
  admin: {
    avatar: "AD",
    title: "Admin Ops Portal",
    subtitle: "Kontrol kapasitas, approval, courier assignment, reporting, dan risiko.",
    menu: ["overview", "warehouse", "reservationApproval", "outboundAdmin", "courierAssign", "reports", "risk"]
  },
  staff: {
    avatar: "ST",
    title: "Warehouse Staff Portal",
    subtitle: "Inbound verification, putaway, cycle count, dan stock correction.",
    menu: ["overview", "inbound", "cycleCount", "risk"]
  },
  finance: {
    avatar: "FI",
    title: "Finance Portal",
    subtitle: "Billing calculation, invoice, payment status, dan revenue summary.",
    menu: ["overview", "billing", "invoiceStatus", "reports"]
  },
  courier: {
    avatar: "CO",
    title: "Courier Portal",
    subtitle: "Melihat tugas yang di-assign admin dan mengupdate status pengambilan.",
    menu: ["overview", "courierTasks"]
  }
};

const viewMeta = {
  overview: ["Overview", "Ringkasan pekerjaan dan indikator role."],
  profile: ["Business Profile", "Profil bisnis customer untuk verifikasi akun."],
  reservation: ["Storage Reservation", "Customer memesan kapasitas penyimpanan."],
  products: ["Product / SKU Registration", "Customer mendaftarkan produk dan label."],
  inventory: ["Inventory Monitoring", "Stok, lokasi, status, dan volume."],
  outbound: ["Outbound Request", "Customer membuat request barang keluar."],
  billing: ["Billing & Invoice", "Tagihan dan status invoice sesuai role."],
  notifications: ["Notifications", "Threshold alert dan status penting."],
  exports: ["API/CSV Export", "Customer mengekspor data stok, transaksi, dan invoice."],
  warehouse: ["Warehouse Setup", "Zona, rak, kapasitas, dan tipe storage."],
  reservationApproval: ["Reservation Approval", "Admin approval queue."],
  outboundAdmin: ["Outbound Management", "Admin proses request outbound."],
  courierAssign: ["Courier Assignment", "Admin menugaskan kurir."],
  reports: ["Operational Reports", "Laporan okupansi, movement, revenue, dan SLA."],
  risk: ["Risk Control", "Risk plan R03: selisih stok fisik vs digital."],
  inbound: ["Inbound Verification", "Staff scan dan validasi barang masuk."],
  cycleCount: ["Cycle Count", "Kontrol stok berkala per zona."],
  invoiceStatus: ["Invoice Status", "Update status Paid/Unpaid."],
  pickup: ["Pickup Request", "Pickup request dari customer."],
  courierTasks: ["Assigned Tasks", "Kurir melihat tugas dari admin dan mengupdate status."]
};

const defaultState = {
  zones: [
    { id: "A", name: "Zone A Regular", capacity: 120, used: 72, type: "Regular Rack" },
    { id: "B", name: "Zone B Fast Moving", capacity: 90, used: 46, type: "Regular Rack" },
    { id: "C", name: "Zone C Cold Storage", capacity: 60, used: 28, type: "Temperature Controlled" },
    { id: "D", name: "Zone D High Value", capacity: 40, used: 22, type: "High Value Cage" }
  ],
  products: [
    { sku: "SKU-FS-102", name: "Wireless Keyboard", qty: 48, unitVolume: 0.08, need: "Regular Rack", location: "A-02-03", status: "Stored" },
    { sku: "SKU-FS-221", name: "Smart Lamp Kit", qty: 30, unitVolume: 0.12, need: "High Value Cage", location: "D-01-02", status: "Stored" },
    { sku: "SKU-FS-307", name: "Organic Face Serum", qty: 65, unitVolume: 0.04, need: "Temperature Controlled", location: "C-03-01", status: "Stored" },
    { sku: "SKU-FS-418", name: "Reusable Food Box", qty: 100, unitVolume: 0.06, need: "Regular Rack", location: "Pending", status: "Inbound Pending" }
  ],
  reservations: [
    { id: "RSV-2401", business: "Nusantara Digital Store", type: "Regular Rack", volume: 12, date: "2026-06-04", status: "Approved" },
    { id: "RSV-2402", business: "Bumi Beauty", type: "Temperature Controlled", volume: 8, date: "2026-06-06", status: "Pending Approval" }
  ],
  outbound: [
    { id: "OUT-7101", sku: "SKU-FS-307", qty: 8, destination: "Jakarta Selatan pickup point", date: "2026-06-03", status: "Assigned", courier: "Raka" }
  ],
  pickups: [
    { id: "PCK-3101", business: "Bumi Beauty", address: "Jl. Kemang Raya 12", date: "2026-06-06", status: "Pending Approval", courier: "-" }
  ],
  invoices: [
    { id: "INV-9001", customer: "Nusantara Digital Store", total: 1820000, status: "Unpaid" },
    { id: "INV-9002", customer: "Bumi Beauty", total: 640000, status: "Paid" }
  ],
  movements: [
    "Inbound SKU-FS-102 verified at A-02-03",
    "Outbound OUT-7101 assigned to courier Raka",
    "Invoice INV-9001 generated for Nusantara Digital Store",
    "Cycle count completed for Zone C"
  ],
  notifications: [
    "SKU-FS-418 menunggu inbound verification.",
    "Zone A mencapai 60% kapasitas.",
    "Invoice INV-9001 masih Unpaid."
  ],
  users: [
    { name: "Dovin", role: "Admin Ops", status: "Active" },
    { name: "Raihan", role: "Warehouse Staff", status: "Active" },
    { name: "Rafael", role: "Finance", status: "Active" },
    { name: "Fajar", role: "Courier", status: "Active" }
  ],
  profile: {
    business: "Nusantara Digital Store",
    email: "ops@nusantaradigital.test",
    owner: "Dovin Berky Aditya",
    phone: "+62 812 0000 2401",
    status: "Email Verified"
  }
};

let state = normalizeState(loadState());
let activeView = "";

const formatter = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0
});

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function loadState() {
  const saved = localStorage.getItem("flowspace-role-state");
  if (!saved) return clone(defaultState);
  try {
    return JSON.parse(saved);
  } catch {
    return clone(defaultState);
  }
}

function normalizeState(value) {
  const normalized = { ...clone(defaultState), ...value };
  for (const key of ["zones", "products", "reservations", "outbound", "pickups", "invoices", "movements", "notifications", "users"]) {
    if (!Array.isArray(normalized[key])) normalized[key] = clone(defaultState[key]);
  }
  if (!normalized.profile) normalized.profile = clone(defaultState.profile);
  return normalized;
}

function persist() {
  localStorage.setItem("flowspace-role-state", JSON.stringify(state));
}

function qs(selector, root = document) {
  return root.querySelector(selector);
}

function qsa(selector, root = document) {
  return Array.from(root.querySelectorAll(selector));
}

function byId(id) {
  return document.getElementById(id);
}

function showToast(message) {
  const toast = byId("toast");
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove("show"), 2600);
}

function addMovement(message) {
  state.movements.unshift(message);
  state.movements = state.movements.slice(0, 12);
}

function addNotification(message) {
  state.notifications.unshift(message);
  state.notifications = state.notifications.slice(0, 12);
}

function statusClass(status) {
  if (/paid|stored|approved|completed|active/i.test(status)) return "status";
  if (/pending|assigned|reserved|picked/i.test(status)) return "status amber";
  if (/discrepancy|unpaid|failed|abnormal|rejected/i.test(status)) return "status red";
  return "status blue";
}

function statusBadge(status) {
  return `<span class="${statusClass(status)}">${status}</span>`;
}

function totalCapacity() {
  const used = state.zones.reduce((sum, zone) => sum + Number(zone.used), 0);
  const capacity = state.zones.reduce((sum, zone) => sum + Number(zone.capacity), 0);
  return { used, capacity, percent: capacity ? Math.round((used / capacity) * 100) : 0 };
}

function nextId(prefix, collection, base = 2401) {
  return `${prefix}-${base + collection.length}`;
}

function getFormData(form) {
  return Object.fromEntries(new FormData(form).entries());
}

function todayValue() {
  return new Date().toISOString().slice(0, 10);
}

function productOptions() {
  return state.products
    .map((product) => `<option value="${product.sku}">${product.sku} - ${product.name}</option>`)
    .join("");
}

function locationOptions() {
  return ["A-01-01", "A-02-03", "B-01-04", "C-03-01", "D-01-02"]
    .map((location) => `<option>${location}</option>`)
    .join("");
}

function roleOptions() {
  return ["Customer", "Admin Ops", "Warehouse Staff", "Finance", "Courier"]
    .map((role) => `<option>${role}</option>`)
    .join("");
}

function getViewDescription(view, role) {
  if (view === "billing" && role === "customer") return "Customer melihat invoice dan status pembayaran.";
  if (view === "billing" && role === "finance") return "Finance menghitung biaya penyimpanan dan handling.";
  return viewMeta[view][1];
}

function renderLanding() {
  const total = totalCapacity();
  if (byId("heroCapacity")) byId("heroCapacity").textContent = `${total.percent}%`;
  if (byId("heroSku")) byId("heroSku").textContent = state.products.length;
  if (byId("heroTasks")) {
    const tasks = state.products.filter((p) => p.status === "Inbound Pending").length +
      state.reservations.filter((r) => r.status === "Pending Approval").length +
      state.invoices.filter((i) => i.status === "Unpaid").length;
    byId("heroTasks").textContent = tasks;
  }
  initMotion();
}

function initMotion() {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const targets = qsa([
    ".hero-copy",
    ".launch-panel",
    ".trust-row span",
    ".hero-metrics div",
    ".pain-grid article",
    ".flow-steps li",
    ".role-card"
  ].join(","));

  if (reduceMotion || !("IntersectionObserver" in window)) {
    targets.forEach((element) => element.classList.add("in-view"));
    return;
  }

  targets.forEach((element, index) => {
    element.classList.add("motion-item");
    element.style.setProperty("--motion-delay", `${Math.min(index * 45, 240)}ms`);
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("in-view");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.18 });

  targets.forEach((element) => observer.observe(element));
}

function portalShell(role) {
  const meta = roleMeta[role];
  return `
    <header class="portal-header">
      <nav class="portal-nav" aria-label="Navigasi portal">
        <a class="brand" href="index.html">
          <span class="brand-mark">FS</span>
          <span><strong>FlowSpace</strong><small>Warehouse</small></span>
        </a>
        <div class="portal-links">
          <a href="customer.html">Customer</a>
          <a href="admin.html">Admin</a>
          <a href="staff.html">Staff</a>
          <a href="finance.html">Finance</a>
          <a href="courier.html">Courier</a>
        </div>
      </nav>
    </header>
    <main class="portal-layout">
      <aside class="app-sidebar">
        <button class="sidebar-toggle" id="sidebarToggle" type="button" aria-expanded="true" aria-controls="portalMenu">›</button>
        <div class="profile-card">
          <span class="avatar">${meta.avatar}</span>
          <div>
            <strong>${meta.title}</strong>
            <small>${meta.subtitle}</small>
          </div>
        </div>
        <nav class="app-menu" id="portalMenu" aria-label="Menu ${meta.title}">
          ${meta.menu.map((view, index) => `
            <button class="menu-item ${index === 0 ? "active" : ""}" type="button" data-view="${view}" title="${viewMeta[view][0]}" aria-label="${viewMeta[view][0]}">
              <span>${viewMeta[view][0]}</span>
            </button>
          `).join("")}
        </nav>
        <button class="button button-secondary full-width" id="resetDemo" type="button">Reset Demo Data</button>
        <a class="button button-secondary full-width" href="index.html">Kembali ke Landing</a>
      </aside>
      <section class="app-main">
        <div class="app-topbar">
          <div>
            <h1 id="viewTitle">${viewMeta[meta.menu[0]][0]}</h1>
            <p class="view-subtitle" id="viewSubtitle">${getViewDescription(meta.menu[0], role)}</p>
          </div>
          <label class="search-box" id="globalSearchBox">
            <span>Cari SKU</span>
            <input id="searchInput" type="search" placeholder="contoh: SKU-FS-102" />
          </label>
        </div>
        <div id="viewRoot"></div>
      </section>
    </main>
  `;
}

function renderOverview(role) {
  const total = totalCapacity();
  const pendingInbound = state.products.filter((p) => p.status === "Inbound Pending").length;
  const unpaid = state.invoices.filter((invoice) => invoice.status === "Unpaid").length;
  const pendingReservations = state.reservations.filter((r) => r.status === "Pending Approval").length;
  const activeOutbound = state.outbound.filter((o) => o.status !== "Completed").length;
  return `
    <div class="kpi-grid">
      <article class="kpi-card"><span>SKU aktif</span><strong>${state.products.length}</strong><small>Produk terdaftar</small></article>
      <article class="kpi-card"><span>Kapasitas terpakai</span><strong>${total.percent}%</strong><small>${total.used} / ${total.capacity} m3</small></article>
      <article class="kpi-card"><span>Inbound menunggu</span><strong>${pendingInbound}</strong><small>Perlu scan staff</small></article>
      <article class="kpi-card"><span>Invoice belum lunas</span><strong>${unpaid}</strong><small>Perlu follow-up</small></article>
    </div>
    <div class="split-grid">
      <section class="card">
        <h3>Fokus role</h3>
        <p>${roleMeta[role].subtitle}</p>
        <dl class="compact-dl">
          <div><dt>Reservasi menunggu</dt><dd>${pendingReservations}</dd></div>
          <div><dt>Outbound aktif</dt><dd>${activeOutbound}</dd></div>
          <div><dt>Log pergerakan</dt><dd>${state.movements.length}</dd></div>
        </dl>
      </section>
      <section class="card">
        <h3>Aktivitas terbaru</h3>
        <ul class="activity-list">${state.movements.slice(0, 5).map((item) => `<li>${item}</li>`).join("")}</ul>
      </section>
    </div>
  `;
}

function renderProfile() {
  return `
    <section class="form-card">
      <h3>Customer Account</h3>
      <p class="form-help">Prototype profil bisnis untuk verifikasi customer sebelum barang diterima.</p>
      <form id="profileForm" class="form-grid">
        <label>Nama bisnis<input name="business" required value="${state.profile.business}" /></label>
        <label>Email verifikasi<input name="email" type="email" required value="${state.profile.email}" /></label>
        <label>Business owner<input name="owner" required value="${state.profile.owner}" /></label>
        <label>Nomor telepon<input name="phone" required value="${state.profile.phone}" /></label>
        <button class="button button-primary" type="submit">Simpan Profil</button>
      </form>
    </section>
    <section class="card verification-card">
      <h3>Verification Status</h3>
      <dl class="compact-dl">
        <div><dt>Business</dt><dd>${state.profile.business}</dd></div>
        <div><dt>Email</dt><dd>${state.profile.email}</dd></div>
        <div><dt>Status</dt><dd>${state.profile.status}</dd></div>
      </dl>
    </section>
  `;
}

function renderReservation() {
  return `
    <section class="form-card">
      <h3>Storage Reservation</h3>
      <p class="form-help">Customer memesan kapasitas agar gudang tidak overbooking.</p>
      <form id="reservationForm" class="form-grid">
        <label>Nama bisnis<input name="business" required value="Nusantara Digital Store" /></label>
        <label>Tipe storage<select name="type"><option>Regular Rack</option><option>Temperature Controlled</option><option>High Value Cage</option></select></label>
        <label>Volume (m3)<input name="volume" type="number" min="1" max="150" required value="12" /></label>
        <label>Target inbound<input name="date" type="date" required value="${todayValue()}" /></label>
        <button class="button button-primary" type="submit">Buat Reservasi</button>
      </form>
    </section>
    ${reservationTable("Customer Reservation History")}
  `;
}

function renderProducts() {
  return `
    <section class="form-card">
      <h3>Product Registration</h3>
      <p class="form-help">Daftarkan produk agar SKU dan label bisa dipakai saat inbound.</p>
      <form id="productForm" class="form-grid">
        <label>Nama produk<input name="name" required placeholder="Wireless Keyboard" /></label>
        <label>Qty awal<input name="qty" type="number" min="1" required value="30" /></label>
        <label>Volume per unit (m3)<input name="unitVolume" type="number" min="0.01" step="0.01" required value="0.08" /></label>
        <label>Storage need<select name="need"><option>Regular Rack</option><option>Temperature Controlled</option><option>High Value Cage</option></select></label>
        <button class="button button-primary" type="submit">Daftarkan SKU</button>
      </form>
    </section>
    <section class="card">
      <h3>Generated Labels</h3>
      <div class="label-grid">
        ${state.products.map((product) => `
          <article class="sku-label">
            <div class="qr-box" aria-hidden="true"></div>
            <strong>${product.sku}</strong>
            <p>${product.name}</p>
            <small>${product.need}</small>
          </article>
        `).join("")}
      </div>
    </section>
  `;
}

function renderInventory() {
  const query = (byId("searchInput")?.value || "").trim().toLowerCase();
  const rows = state.products.filter((product) => {
    return !query || product.sku.toLowerCase().includes(query) || product.name.toLowerCase().includes(query);
  });
  return `
    <section class="card">
      <div class="card-heading-row">
        <h3>Stock Monitoring</h3>
        <span class="tag blue">${rows.length} item</span>
      </div>
      <div class="table-wrap">
        <table>
          <thead><tr><th>SKU</th><th>Product</th><th>Qty</th><th>Location</th><th>Status</th><th>Volume</th></tr></thead>
          <tbody>${rows.map((product) => `
            <tr>
              <td>${product.sku}</td>
              <td>${product.name}</td>
              <td>${product.qty}</td>
              <td>${product.location}</td>
              <td>${statusBadge(product.status)}</td>
              <td>${(product.qty * product.unitVolume).toFixed(2)} m3</td>
            </tr>
          `).join("")}</tbody>
        </table>
      </div>
    </section>
  `;
}

function renderOutbound() {
  return `
    <section class="form-card">
      <h3>Outbound Request</h3>
      <p class="form-help">Customer memilih SKU dan sistem memvalidasi stok tersedia.</p>
      <form id="outboundForm" class="form-grid">
        <label>Pilih SKU<select name="sku">${productOptions()}</select></label>
        <label>Qty keluar<input name="qty" type="number" min="1" required value="5" /></label>
        <label>Tujuan<input name="destination" required value="Customer pickup point" /></label>
        <label>Jadwal<input name="date" type="date" required value="${todayValue()}" /></label>
        <button class="button button-primary" type="submit">Buat Outbound</button>
      </form>
    </section>
    ${outboundList("Outbound Request Saya")}
  `;
}

function renderCustomerBilling() {
  return invoiceTable("Invoice & Payment Status", false);
}

function renderNotifications() {
  return `
    <section class="card">
      <h3>Threshold Notifications</h3>
      <ul class="notification-list">
        ${state.notifications.map((item) => `<li>${item}</li>`).join("")}
      </ul>
    </section>
  `;
}

function renderWarehouse() {
  return `
    <section class="form-card">
      <h3>Warehouse Setup</h3>
      <p class="form-help">Admin mendefinisikan zona, kapasitas, dan tipe penyimpanan.</p>
      <form id="zoneForm" class="form-grid">
        <label>Nama zona<input name="name" required placeholder="Zone E Oversize" /></label>
        <label>Kapasitas (m3)<input name="capacity" type="number" min="1" required value="80" /></label>
        <label>Used awal (m3)<input name="used" type="number" min="0" required value="0" /></label>
        <label>Tipe<select name="type"><option>Regular Rack</option><option>Temperature Controlled</option><option>High Value Cage</option></select></label>
        <button class="button button-primary" type="submit">Tambah Zona</button>
      </form>
    </section>
    <section class="card">
      <h3>Capacity Map</h3>
      <div class="zone-list">${state.zones.map(zoneRow).join("")}</div>
    </section>
  `;
}

function zoneRow(zone) {
  const percent = Math.round((zone.used / zone.capacity) * 100);
  const level = percent >= 85 ? "danger" : percent >= 70 ? "warning" : "";
  return `
    <div class="zone-row">
      <strong>${zone.name}<br><small>${zone.type}</small></strong>
      <div class="progress ${level}" aria-label="${zone.name} ${percent}% used"><i style="--value:${percent}%"></i></div>
      <span>${percent}%</span>
    </div>
  `;
}

function renderReservationApproval() {
  return reservationTable("Reservation Approval", true);
}

function reservationTable(title, withActions = false) {
  return `
    <section class="card">
      <h3>${title}</h3>
      <div class="table-wrap">
        <table>
          <thead><tr><th>ID</th><th>Business</th><th>Volume</th><th>Date</th><th>Status</th>${withActions ? "<th>Action</th>" : ""}</tr></thead>
          <tbody>${state.reservations.map((item) => `
            <tr>
              <td>${item.id}</td>
              <td>${item.business}<br><small>${item.type}</small></td>
              <td>${item.volume} m3</td>
              <td>${item.date}</td>
              <td>${statusBadge(item.status)}</td>
              ${withActions ? `<td><button class="button button-secondary" data-approve-reservation="${item.id}" type="button">Approve</button></td>` : ""}
            </tr>
          `).join("")}</tbody>
        </table>
      </div>
    </section>
  `;
}

function renderOutboundAdmin() {
  return outboundList("Outbound Management", true);
}

function outboundList(title, withActions = false) {
  return `
    <section class="card">
      <h3>${title}</h3>
      <ul class="task-list">
        ${state.outbound.map((item) => `
          <li>
            <strong>${item.id}</strong> ${item.sku}, ${item.qty} unit<br>
            <small>${item.destination} - ${item.date} - Courier: ${item.courier || "-"}</small><br>
            ${statusBadge(item.status)}
            ${withActions ? `<div class="action-row"><button class="button button-secondary" data-outbound-status="${item.id}" data-next="Ready for Pickup" type="button">Ready</button><button class="button button-secondary" data-outbound-status="${item.id}" data-next="Completed" type="button">Complete</button></div>` : ""}
          </li>
        `).join("") || "<li>Belum ada outbound request.</li>"}
      </ul>
    </section>
  `;
}

function renderCourierAssign() {
  return `
    <section class="form-card">
      <h3>Courier Assignment</h3>
      <form id="courierAssignForm" class="form-grid">
        <label>Outbound<select name="outboundId">${state.outbound.map((o) => `<option value="${o.id}">${o.id} - ${o.sku}</option>`).join("")}</select></label>
        <label>Courier<select name="courier"><option>Raka</option><option>Daniel</option><option>Fajar</option></select></label>
        <button class="button button-primary" type="submit">Assign Courier</button>
      </form>
    </section>
    ${outboundList("Assigned Outbound", false)}
  `;
}

function renderReports() {
  const total = totalCapacity();
  const units = state.products.reduce((sum, p) => sum + Number(p.qty), 0);
  const revenue = state.invoices.reduce((sum, invoice) => sum + Number(invoice.total), 0);
  return `
    <section class="card">
      <h3>Operational Reporting</h3>
      <dl class="compact-dl">
        <div><dt>Occupancy</dt><dd>${total.percent}%</dd></div>
        <div><dt>Total stock unit</dt><dd>${units}</dd></div>
        <div><dt>Invoice revenue</dt><dd>${formatter.format(revenue)}</dd></div>
        <div><dt>Movement logs</dt><dd>${state.movements.length}</dd></div>
      </dl>
    </section>
  `;
}

function renderExports() {
  return `
    <section class="card">
      <h3>ERP/API Integration</h3>
      <p class="form-help">API/CSV preview hanya ditampilkan di Customer sesuai scope terbaru.</p>
      <pre class="code-block">${JSON.stringify({ stock: state.products, outbound: state.outbound, invoices: state.invoices }, null, 2)}</pre>
    </section>
  `;
}

function renderRisk() {
  return `
    <div class="risk-layout">
      <section class="card risk-card">
        <span class="tag red">R03 Critical</span>
        <h3>Selisih stok fisik dan digital</h3>
        <p>Kontrol utama: scan label, validasi qty, lokasi rak, audit trail, cycle count, dan stock adjustment dengan approval.</p>
        <button class="button button-secondary" id="simulateDiscrepancy" type="button">Simulasikan Discrepancy</button>
      </section>
      <section class="card">
        <h3>Mitigation Checklist</h3>
        <ul class="check-list">
          <li>Scan QR/RFID sebelum stok aktif.</li>
          <li>Validasi dua tahap untuk inbound/outbound.</li>
          <li>Cycle count setiap shift.</li>
          <li>Audit trail untuk koreksi stok.</li>
          <li>Sensor cadangan untuk IoT failure.</li>
        </ul>
      </section>
    </div>
  `;
}

function renderInbound() {
  return `
    <section class="form-card">
      <h3>Inbound Verification</h3>
      <p class="form-help">Staff mencocokkan qty aktual, lalu menentukan zona/rak.</p>
      <form id="inboundForm" class="form-grid">
        <label>Pilih SKU<select name="sku">${productOptions()}</select></label>
        <label>Qty aktual diterima<input name="actualQty" type="number" min="1" required value="10" /></label>
        <label>Lokasi rak<select name="location">${locationOptions()}</select></label>
        <label>Kondisi label<select name="labelCondition"><option>Label terbaca</option><option>Label buram - perlu reprint</option></select></label>
        <button class="button button-primary" type="submit">Konfirmasi Inbound</button>
      </form>
    </section>
    <section class="card">
      <h3>Inbound Queue</h3>
      <ul class="task-list">
        ${state.products.filter((p) => p.status === "Inbound Pending").map((product) => `
          <li><strong>${product.sku}</strong> ${product.name}<br><small>Expected qty: ${product.qty}, need: ${product.need}</small></li>
        `).join("") || "<li>Tidak ada inbound pending.</li>"}
      </ul>
    </section>
  `;
}

function renderCycleCount() {
  return `
    <section class="form-card">
      <h3>Cycle Count / Stock Check</h3>
      <p class="form-help">Staff membandingkan qty fisik di rak dengan qty sistem. Jika berbeda, status masuk Discrepancy Review.</p>
      <form id="cycleForm" class="form-grid">
        <label>SKU yang dicek<select name="sku">${state.products.map((product) => `<option value="${product.sku}">${product.sku} - ${product.name} - system ${product.qty}</option>`).join("")}</select></label>
        <label>Qty fisik hasil hitung<input name="countedQty" type="number" min="0" required value="${state.products[0]?.qty || 0}" /></label>
        <label>Lokasi pengecekan<select name="location">${locationOptions()}</select></label>
        <label>Catatan<input name="note" required value="Routine cycle count per shift" /></label>
        <button class="button button-primary" type="submit">Simpan Count</button>
      </form>
    </section>
    <section class="card">
      <h3>Stock Check Reference</h3>
      <div class="table-wrap">
        <table>
          <thead><tr><th>SKU</th><th>Product</th><th>System Qty</th><th>Location</th><th>Status</th></tr></thead>
          <tbody>${state.products.map((product) => `
            <tr>
              <td>${product.sku}</td>
              <td>${product.name}</td>
              <td>${product.qty}</td>
              <td>${product.location}</td>
              <td>${statusBadge(product.status)}</td>
            </tr>
          `).join("")}</tbody>
        </table>
      </div>
    </section>
  `;
}

function renderFinanceBilling() {
  return `
    <section class="form-card">
      <h3>Billing Calculation</h3>
      <form id="billingForm" class="form-grid">
        <label>Customer<input name="customer" required value="Nusantara Digital Store" /></label>
        <label>Storage days<input name="days" type="number" min="1" required value="14" /></label>
        <label>Volume billed (m3)<input name="volume" type="number" min="1" required value="24" /></label>
        <label>Handling count<input name="handling" type="number" min="0" required value="3" /></label>
        <button class="button button-primary" type="submit">Generate Invoice</button>
      </form>
    </section>
    ${invoiceTable("Generated Invoices", true)}
  `;
}

function renderInvoiceStatus() {
  return invoiceTable("Invoice Payment Status", true);
}

function invoiceTable(title, withActions) {
  return `
    <section class="card">
      <h3>${title}</h3>
      <div class="table-wrap">
        <table>
          <thead><tr><th>Invoice</th><th>Customer</th><th>Total</th><th>Status</th>${withActions ? "<th>Action</th>" : ""}</tr></thead>
          <tbody>${state.invoices.map((invoice) => `
            <tr>
              <td>${invoice.id}</td>
              <td>${invoice.customer}</td>
              <td>${formatter.format(invoice.total)}</td>
              <td>${statusBadge(invoice.status)}</td>
              ${withActions ? `<td><button class="button button-secondary" data-pay="${invoice.id}" type="button">${invoice.status === "Paid" ? "Mark Unpaid" : "Mark Paid"}</button></td>` : ""}
            </tr>
          `).join("")}</tbody>
        </table>
      </div>
    </section>
  `;
}

function renderPickup() {
  return `
    <section class="form-card">
      <h3>Pickup Request</h3>
      <form id="pickupForm" class="form-grid">
        <label>Business<input name="business" required value="Nusantara Digital Store" /></label>
        <label>Alamat pickup<input name="address" required value="Jl. Asia Afrika 8" /></label>
        <label>Jadwal<input name="date" type="date" required value="${todayValue()}" /></label>
        <label>Catatan<input name="note" value="Pickup 4 karton" /></label>
        <button class="button button-primary" type="submit">Buat Pickup Request</button>
      </form>
    </section>
    ${pickupList("Pickup Queue", false)}
  `;
}

function pickupList(title, withActions) {
  return `
    <section class="card">
      <h3>${title}</h3>
      <ul class="task-list">
        ${state.pickups.map((pickup) => `
          <li>
            <strong>${pickup.id}</strong> ${pickup.business}<br>
            <small>${pickup.address} - ${pickup.date} - Courier: ${pickup.courier}</small><br>
            ${statusBadge(pickup.status)}
            ${withActions ? `<div class="action-row"><button class="button button-secondary" data-pickup-status="${pickup.id}" data-next="Picked Up" type="button">Picked Up</button><button class="button button-secondary" data-pickup-status="${pickup.id}" data-next="Completed" type="button">Complete</button></div>` : ""}
          </li>
        `).join("") || "<li>Tidak ada pickup task.</li>"}
      </ul>
    </section>
  `;
}

function nextCourierStatus(status) {
  const flow = {
    Assigned: "Picked Up",
    "Ready for Pickup": "Picked Up",
    "Picked Up": "In Transit",
    "In Transit": "Completed"
  };
  return flow[status] || null;
}

function courierStatusLabel(status) {
  const next = nextCourierStatus(status);
  if (next === "Picked Up") return "Update: Barang Diambil";
  if (next === "In Transit") return "Update: Dalam Perjalanan";
  if (next === "Completed") return "Update: Selesai";
  return "";
}

function renderCourierTasks() {
  const assigned = state.outbound.filter((item) => item.courier && item.courier !== "-");
  return `
    <section class="card">
      <h3>Assigned Courier Tasks</h3>
      <p class="form-help">Hanya tugas outbound yang sudah di-assign oleh Admin Ops yang tampil di sini.</p>
      <ul class="task-list">
        ${assigned.map((item) => {
          const next = nextCourierStatus(item.status);
          return `
            <li>
              <strong>${item.id}</strong> ${item.sku}, ${item.qty} unit<br>
              <small>Tujuan: ${item.destination} - Jadwal: ${item.date} - Courier: ${item.courier}</small><br>
              ${statusBadge(item.status)}
              ${next ? `<div class="action-row"><button class="button button-primary" data-courier-progress="${item.id}" data-next="${next}" type="button">${courierStatusLabel(item.status)}</button></div>` : `<div class="action-row"><span class="tag">Tugas selesai</span></div>`}
            </li>
          `;
        }).join("") || "<li>Belum ada tugas yang di-assign admin.</li>"}
      </ul>
    </section>
  `;
}

function renderView(view, role) {
  const root = byId("viewRoot");
  const renderers = {
    overview: () => renderOverview(role),
    profile: renderProfile,
    reservation: renderReservation,
    products: renderProducts,
    inventory: renderInventory,
    outbound: renderOutbound,
    billing: role === "finance" ? renderFinanceBilling : renderCustomerBilling,
    notifications: renderNotifications,
    exports: renderExports,
    warehouse: renderWarehouse,
    reservationApproval: renderReservationApproval,
    outboundAdmin: renderOutboundAdmin,
    courierAssign: renderCourierAssign,
    reports: renderReports,
    risk: renderRisk,
    inbound: renderInbound,
    cycleCount: renderCycleCount,
    invoiceStatus: renderInvoiceStatus,
    pickup: renderPickup,
    courierTasks: renderCourierTasks
  };
  activeView = view;
  byId("viewTitle").textContent = viewMeta[view][0];
  byId("viewSubtitle").textContent = getViewDescription(view, role);
  root.innerHTML = renderers[view]();
  qsa(".menu-item").forEach((item) => item.classList.toggle("active", item.dataset.view === view));
  attachViewEvents(role);
}

function rerender(role) {
  renderView(activeView, role);
}

function attachPortalEvents(role) {
  const sidebarToggle = byId("sidebarToggle");
  const portalLayout = document.querySelector(".portal-layout");
  if (sidebarToggle && portalLayout) {
    sidebarToggle.addEventListener("click", () => {
      const collapsed = portalLayout.classList.toggle("sidebar-collapsed");
      sidebarToggle.setAttribute("aria-expanded", String(!collapsed));
      sidebarToggle.textContent = collapsed ? "‹" : "›";
    });
  }
  qsa(".menu-item").forEach((button) => {
    button.addEventListener("click", () => renderView(button.dataset.view, role));
  });
  byId("resetDemo").addEventListener("click", () => {
    state = clone(defaultState);
    persist();
    rerender(role);
    showToast("Data demo dikembalikan ke kondisi awal.");
  });
  byId("searchInput").addEventListener("input", () => {
    if (activeView === "inventory" || activeView === "cycleCount") rerender(role);
  });
}

function attachViewEvents(role) {
  const reservationForm = byId("reservationForm");
  if (reservationForm) {
    reservationForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const data = getFormData(event.currentTarget);
      const volume = Number(data.volume);
      const total = totalCapacity();
      if (total.used + volume > total.capacity) {
        showToast("Kapasitas tidak cukup. Kurangi volume atau hubungi admin.");
        return;
      }
      const reservation = {
        id: nextId("RSV", state.reservations),
        business: data.business,
        type: data.type,
        volume,
        date: data.date,
        status: "Pending Approval"
      };
      state.reservations.unshift(reservation);
      addMovement(`${reservation.id} submitted for ${volume} m3`);
      addNotification(`${reservation.id} menunggu approval admin.`);
      persist();
      rerender(role);
      showToast("Reservasi dibuat.");
    });
  }

  const profileForm = byId("profileForm");
  if (profileForm) {
    profileForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const data = getFormData(event.currentTarget);
      state.profile = {
        business: data.business,
        email: data.email,
        owner: data.owner,
        phone: data.phone,
        status: "Email Verified"
      };
      addMovement(`Customer profile updated for ${data.business}`);
      addNotification(`Profil ${data.business} sudah terverifikasi.`);
      persist();
      rerender(role);
      showToast("Profil bisnis disimpan.");
    });
  }

  const productForm = byId("productForm");
  if (productForm) {
    productForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const data = getFormData(event.currentTarget);
      const sku = `SKU-FS-${state.products.length + 501}`;
      state.products.unshift({
        sku,
        name: data.name,
        qty: Number(data.qty),
        unitVolume: Number(data.unitVolume),
        need: data.need,
        location: "Pending",
        status: "Inbound Pending"
      });
      addMovement(`${sku} registered and waiting inbound verification`);
      addNotification(`${sku} siap untuk inbound scan.`);
      persist();
      rerender(role);
      showToast(`SKU baru dibuat: ${sku}`);
    });
  }

  const inboundForm = byId("inboundForm");
  if (inboundForm) {
    inboundForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const data = getFormData(event.currentTarget);
      const product = state.products.find((item) => item.sku === data.sku);
      if (!product) return;
      product.qty = Number(data.actualQty);
      product.location = data.location;
      product.status = "Stored";
      const zone = state.zones.find((item) => data.location.startsWith(item.id));
      if (zone) zone.used = Math.min(zone.capacity, zone.used + product.qty * product.unitVolume);
      addMovement(`${product.sku} inbound verified at ${data.location}`);
      addNotification(`${product.sku} sudah aktif di stok.`);
      persist();
      rerender(role);
      showToast("Inbound dikonfirmasi.");
    });
  }

  const outboundForm = byId("outboundForm");
  if (outboundForm) {
    outboundForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const data = getFormData(event.currentTarget);
      const product = state.products.find((item) => item.sku === data.sku);
      const qty = Number(data.qty);
      if (!product || product.qty < qty) {
        showToast("Outbound ditolak. Stok tidak cukup.");
        return;
      }
      product.qty -= qty;
      state.outbound.unshift({
        id: nextId("OUT", state.outbound, 7102),
        sku: product.sku,
        qty,
        destination: data.destination,
        date: data.date,
        status: "Pending Approval",
        courier: "-"
      });
      addMovement(`Outbound created for ${product.sku}, ${qty} units`);
      persist();
      rerender(role);
      showToast("Outbound request dibuat.");
    });
  }

  const billingForm = byId("billingForm");
  if (billingForm) {
    billingForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const data = getFormData(event.currentTarget);
      const total = Number(data.days) * Number(data.volume) * 3500 + Number(data.handling) * 75000;
      const invoice = {
        id: nextId("INV", state.invoices, 9003),
        customer: data.customer,
        total,
        status: "Unpaid"
      };
      state.invoices.unshift(invoice);
      addMovement(`${invoice.id} generated for ${data.customer}`);
      addNotification(`${invoice.id} diterbitkan dengan status Unpaid.`);
      persist();
      rerender(role);
      showToast(`Invoice dibuat: ${formatter.format(total)}`);
    });
  }

  const zoneForm = byId("zoneForm");
  if (zoneForm) {
    zoneForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const data = getFormData(event.currentTarget);
      const id = String.fromCharCode(65 + state.zones.length);
      state.zones.push({
        id,
        name: data.name,
        capacity: Number(data.capacity),
        used: Number(data.used),
        type: data.type
      });
      addMovement(`${data.name} added to warehouse setup`);
      persist();
      rerender(role);
      showToast("Zona gudang ditambahkan.");
    });
  }

  const courierAssignForm = byId("courierAssignForm");
  if (courierAssignForm) {
    courierAssignForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const data = getFormData(event.currentTarget);
      const item = state.outbound.find((out) => out.id === data.outboundId);
      if (!item) return;
      item.courier = data.courier;
      item.status = "Assigned";
      addMovement(`${item.id} assigned to courier ${data.courier}`);
      persist();
      rerender(role);
      showToast("Courier assigned.");
    });
  }

  const cycleForm = byId("cycleForm");
  if (cycleForm) {
    cycleForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const data = getFormData(event.currentTarget);
      const product = state.products.find((item) => item.sku === data.sku);
      if (!product) return;
      const countedQty = Number(data.countedQty);
      const systemQty = Number(product.qty);
      const difference = countedQty - systemQty;
      product.status = difference === 0 ? "Stored" : "Discrepancy Review";
      product.qty = countedQty;
      if (data.location) product.location = data.location;
      addMovement(`Cycle count ${product.sku}: system ${systemQty}, physical ${countedQty}, diff ${difference}`);
      if (difference !== 0) addNotification(`${product.sku} discrepancy ${difference}. Perlu approval koreksi stok.`);
      persist();
      rerender(role);
      showToast(difference === 0 ? "Cycle count cocok dengan sistem." : "Cycle count menemukan discrepancy.");
    });
  }

  const pickupForm = byId("pickupForm");
  if (pickupForm) {
    pickupForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const data = getFormData(event.currentTarget);
      const pickup = {
        id: nextId("PCK", state.pickups, 3102),
        business: data.business,
        address: data.address,
        date: data.date,
        status: "Pending Approval",
        courier: "-"
      };
      state.pickups.unshift(pickup);
      addMovement(`${pickup.id} pickup request created`);
      persist();
      rerender(role);
      showToast("Pickup request dibuat.");
    });
  }

  qsa("[data-approve-reservation]").forEach((button) => {
    button.addEventListener("click", () => {
      const reservation = state.reservations.find((item) => item.id === button.dataset.approveReservation);
      if (!reservation) return;
      reservation.status = "Approved";
      addMovement(`${reservation.id} approved by admin`);
      persist();
      rerender(role);
      showToast("Reservasi approved.");
    });
  });

  qsa("[data-pay]").forEach((button) => {
    button.addEventListener("click", () => {
      const invoice = state.invoices.find((item) => item.id === button.dataset.pay);
      if (!invoice) return;
      invoice.status = invoice.status === "Paid" ? "Unpaid" : "Paid";
      addMovement(`${invoice.id} marked as ${invoice.status}`);
      persist();
      rerender(role);
      showToast(`${invoice.id} menjadi ${invoice.status}.`);
    });
  });

  qsa("[data-outbound-status]").forEach((button) => {
    button.addEventListener("click", () => {
      const item = state.outbound.find((out) => out.id === button.dataset.outboundStatus);
      if (!item) return;
      item.status = button.dataset.next;
      addMovement(`${item.id} changed to ${item.status}`);
      persist();
      rerender(role);
      showToast("Status outbound diupdate.");
    });
  });

  qsa("[data-courier-progress]").forEach((button) => {
    button.addEventListener("click", () => {
      const item = state.outbound.find((out) => out.id === button.dataset.courierProgress);
      if (!item) return;
      item.status = button.dataset.next;
      addMovement(`${item.id} courier updated status to ${item.status}`);
      if (item.status === "Completed") addNotification(`${item.id} sudah selesai dikirim.`);
      persist();
      rerender(role);
      showToast(`Status tugas diupdate: ${item.status}.`);
    });
  });

  qsa("[data-pickup-status]").forEach((button) => {
    button.addEventListener("click", () => {
      const item = state.pickups.find((pickup) => pickup.id === button.dataset.pickupStatus);
      if (!item) return;
      item.status = button.dataset.next;
      addMovement(`${item.id} changed to ${item.status}`);
      persist();
      rerender(role);
      showToast("Status pickup diupdate.");
    });
  });

  const simulate = byId("simulateDiscrepancy");
  if (simulate) {
    simulate.addEventListener("click", () => {
      if (!state.products.length) return;
      state.products[0].status = "Discrepancy Review";
      addMovement(`Discrepancy review opened for ${state.products[0].sku}`);
      addNotification(`${state.products[0].sku} masuk review karena selisih stok.`);
      persist();
      rerender(role);
      showToast("Discrepancy disimulasikan.");
    });
  }
}

function initPortal() {
  const role = document.body.dataset.role;
  const root = byId("portalRoot");
  root.innerHTML = portalShell(role);
  activeView = roleMeta[role].menu[0];
  attachPortalEvents(role);
  renderView(activeView, role);
}

function initNavToggle() {
  const toggle = qs(".nav-toggle");
  const links = byId("navLinks");
  if (!toggle || !links) return;
  toggle.addEventListener("click", () => {
    const isOpen = links.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });
}

initNavToggle();
if (document.body.dataset.page === "portal") {
  initPortal();
} else {
  renderLanding();
}
