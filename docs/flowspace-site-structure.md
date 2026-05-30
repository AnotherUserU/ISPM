# Struktur Situs FlowSpace Warehouse

## Arah Produk Web

Web dibuat sebagai single-page product website dengan dashboard preview. Struktur ini paling efisien untuk tugas akademik dan presentasi karena semua informasi penting tersedia dalam satu alur scroll, tetapi tetap terasa seperti produk SaaS nyata.

## Sitemap MVP

1. Home
2. Solution
3. Platform
4. Operations Flow
5. Business Case
6. Project Plan
7. Risk Control
8. Demo CTA

Pada implementasi awal, semua item menjadi anchor section dalam satu halaman. Jika perlu dikembangkan, `Platform` dapat menjadi halaman dashboard demo terpisah.

## Sitemap Produk Lengkap

Struktur berikut berasal dari analisis sub-agent dan dipakai sebagai batas arah produk. Tidak semuanya harus dibangun pada iterasi web pertama.

### Public Website

- Home.
- Layanan Gudang Fleksibel.
- Platform SaaS.
- IoT and Stock Security.
- Pricing.
- Use Case: UKM e-commerce dan enterprise multi-lokasi.
- FAQ.
- Request Demo atau Contact.
- Login/Register.

### Customer Portal

- Overview.
- Business Profile.
- Storage Reservation.
- Product and SKU Registration.
- Inventory and Stock Monitoring.
- Inbound Status.
- Outbound Request.
- Billing and Invoice.
- Notifications.
- Settings.

### Admin/Ops Portal

- Admin Overview.
- Customer Management.
- Warehouse Zone and Capacity.
- Reservation Approval.
- Inbound Verification.
- Outbound Queue.
- Courier Assignment.
- Billing Management.
- Tariff Rules.
- Operational Reports.
- Audit Trail and Stock Adjustment.
- User and Role Management.

### Warehouse Staff Portal

- Scan Inbound.
- Putaway and Rack Assignment.
- Cycle Count.
- Picking Outbound.
- Stock Correction with Approval.

## Homepage Section

### 1. Hero

Tujuan: menjelaskan FlowSpace secara langsung.

Konten:

- Headline: FlowSpace Warehouse.
- Subheadline: gudang fleksibel dengan dashboard SaaS dan visibilitas stok real-time.
- Primary CTA: Lihat Demo Dashboard.
- Secondary CTA: Lihat Alur Operasional.
- Visual utama: dashboard warehouse atau ilustrasi operasional gudang digital, bukan hero abstrak.

### 2. Problem

Tujuan: menjelaskan masalah nyata.

Konten:

- UKM menyimpan stok tanpa pencatatan rapi.
- Bisnis multi-lokasi kesulitan sinkronisasi stok.
- Proses manual memicu selisih stok dan billing tidak akurat.

### 3. Solution

Tujuan: memperlihatkan paket solusi.

Konten:

- Flexible storage.
- SaaS dashboard.
- IoT monitoring.
- Inbound/outbound workflow.
- Billing and reporting.

### 4. Platform Preview

Tujuan: memperlihatkan produk digital.

Komponen:

- Occupancy card.
- Stock accuracy card.
- Active reservations card.
- Inbound/outbound status list.
- SKU table.
- Warehouse zone capacity map.
- Billing summary.

### 5. Operations Flow

Tujuan: menampilkan alur dari customer sampai invoice.

Flow:

1. Customer membuat akun dan profil bisnis.
2. Customer melakukan storage reservation.
3. Customer mendaftarkan SKU dan detail barang.
4. Staff melakukan inbound verification dengan scan label.
5. Customer memonitor stok dan lokasi.
6. Customer membuat outbound request.
7. Finance membuat billing dan invoice.

### 6. Feature Grid

Fitur utama:

- Account and role access.
- Capacity reservation.
- Product and SKU registration.
- Inbound verification.
- Stock monitoring.
- Outbound request.
- Billing calculation.
- Threshold notification.
- ERP/API export.
- Operational reporting.

### 7. Business Case

Tujuan: membuktikan kelayakan bisnis.

Konten:

- Model pendapatan: sewa gudang, langganan SaaS, handling inbound/outbound, integrasi enterprise.
- Proyeksi pendapatan tahun 1 sampai tahun 3.
- Payback sekitar 2,2 tahun.
- Target okupansi dan retensi.

### 8. Project Timeline

Tujuan: menampilkan rencana 9 bulan.

Fase:

- Planning.
- Business and location.
- Facility and IoT.
- SaaS development.
- Integration and testing.
- Soft launch.
- Full launch and handover.

### 9. Risk Control

Tujuan: menunjukkan bahwa proyek punya kontrol risiko.

Highlight:

- Risiko utama: selisih stok fisik vs digital.
- Kontrol: scan label, validasi dua tahap, audit trail, cycle count, stock opname darurat.
- Risiko IoT dan koneksi gateway.
- Risiko scope creep ERP/API.

### 10. Demo CTA

Tujuan: menutup dengan tindakan jelas.

Konten:

- Ajakan untuk melihat demo dashboard atau request reservasi.
- Form ringan: nama bisnis, email, kebutuhan kapasitas, tipe barang.

### 11. FAQ

Tujuan: menjawab pertanyaan dasar sebelum demo.

Konten:

- Apakah FlowSpace menyediakan last-mile delivery? Tidak, di luar scope awal.
- Apakah pickup tersedia? Bisa menjadi layanan tambahan atau fase berikutnya.
- Apakah dashboard terhubung IoT real-time? Untuk MVP web hanya simulasi; produk penuh menargetkan integrasi sensor.
- Apakah enterprise bisa integrasi ERP? Masuk fase lanjutan melalui API/CSV export.

## Wireframe Tekstual

```text
[Nav: Logo | Solution | Platform | Flow | Business Case | Risk | Demo]

[Hero]
FlowSpace Warehouse
Gudang fleksibel dengan dashboard SaaS dan IoT monitoring.
[Lihat Demo Dashboard] [Alur Operasional]
[Visual dashboard / warehouse operations]

[Problem Band]
3 problem cards: penyimpanan manual, stok lintas lokasi, billing tidak akurat

[Solution Band]
5 capability columns: Storage, SaaS, IoT, Inbound/Outbound, Billing

[Dashboard Preview]
Left: metrics + warehouse zone map
Right: stock table + inbound/outbound activity

[Operations Flow]
Account -> Reservation -> SKU -> Inbound -> Monitoring -> Outbound -> Invoice

[Business Case]
Revenue chart/cards tahun 1-3 + payback + occupancy target

[Project Timeline]
9-month horizontal timeline

[Risk Control]
Main risk panel + mitigation checklist

[CTA Form]
Request demo / reservation interest
```

## Gaya Visual

- Domain: SaaS operasional/logistik, bukan landing page dekoratif.
- Nuansa: profesional, padat, mudah dipindai.
- Layout: dashboard-like, table/card secukupnya, banyak data ringkas.
- Warna: netral dengan aksen hijau/biru untuk status operasional; hindari dominasi satu warna.
- Tipografi: heading jelas, body text ringkas.
- UI: gunakan icon untuk fitur, status chip untuk proses, progress/timeline untuk schedule, table untuk stok.

## Keputusan Implementasi Sementara

- Single-page app lebih tepat untuk fase pertama.
- Dashboard preview cukup memakai data statis dari PDF.
- Tidak perlu backend pada iterasi pertama.
- Bila menggunakan framework, pilih stack ringan dan cepat diverifikasi.

## Scope Frontend MVP Yang Disetujui Untuk Implementasi Awal

Implementasi awal sebaiknya membuktikan alur inti: barang masuk, stok akurat, barang keluar, tagihan muncul.

Masuk:

- Public product website.
- Dashboard preview customer.
- Role switcher simulasi untuk customer/admin/staff jika dibutuhkan.
- Capacity overview.
- Storage reservation form statis.
- SKU table.
- Inbound/outbound activity.
- Billing and invoice status.
- Risk control panel.

Ditunda:

- Backend autentikasi.
- Database.
- Payment gateway.
- Integrasi sensor IoT real-time.
- WhatsApp/email production automation.
- ERP/API enterprise.
- Courier live tracking.
- Export PDF/Excel.
