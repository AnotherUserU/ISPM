# PRD FlowSpace Warehouse Web

## Ringkasan

FlowSpace Warehouse adalah layanan pergudangan fleksibel yang menggabungkan fasilitas fisik, platform SaaS, dan sensor IoT. Web yang akan dibuat berfungsi sebagai product website sekaligus demo visual dari sistem FlowSpace agar konsep proyek mudah dipahami oleh evaluator, calon pengguna UKM, dan calon klien enterprise.

## Tujuan Produk

1. Menjelaskan masalah penyimpanan dan kontrol stok yang dialami UKM serta perusahaan lintas lokasi.
2. Menampilkan FlowSpace sebagai solusi gudang fleksibel dengan monitoring digital.
3. Memvisualisasikan modul SaaS utama tanpa membangun backend penuh pada fase awal.
4. Mengemas output proyek ISPM seperti business case, backlog, schedule, dan risk plan dalam format web yang profesional.

## Target Pengguna

- UKM e-commerce yang membutuhkan ruang penyimpanan fleksibel tanpa membangun gudang sendiri.
- Perusahaan menengah hingga besar yang membutuhkan visibilitas stok lintas lokasi.
- Evaluator akademik yang menilai kelayakan proyek, scope, risiko, dan rencana eksekusi.

## Masalah

- Banyak UKM menyimpan barang di rumah, ruko, atau gudang kecil tanpa pencatatan stok yang kuat.
- Perusahaan dengan beberapa lokasi sering mengalami sinkronisasi stok yang buruk.
- Proses inbound dan outbound manual meningkatkan risiko selisih stok.
- Billing penyimpanan dan handling rentan tidak akurat bila dihitung manual.

## Value Proposition

- Kapasitas gudang fleksibel berdasarkan volume dan kebutuhan barang.
- Dashboard stok, lokasi barang, status inbound/outbound, dan riwayat pergerakan.
- Reservasi kapasitas untuk mencegah overbooking.
- Proses scan label untuk mengurangi selisih stok fisik dan digital.
- Billing otomatis berdasarkan volume, durasi, dan aktivitas tambahan.
- IoT alert untuk kondisi penting seperti suhu abnormal atau threshold stok.

## Ruang Lingkup MVP Web

MVP web adalah frontend presentasi dan dashboard preview. Tidak ada autentikasi, database, pembayaran asli, atau integrasi IoT nyata pada fase ini.

Termasuk:

- Landing/product homepage FlowSpace.
- Section fitur utama.
- Simulasi dashboard SaaS dengan data statis.
- Ringkasan alur reservasi, inbound, stock monitoring, outbound, dan billing.
- Section business case dan proyeksi 3 tahun.
- Timeline proyek 9 bulan.
- Risk highlight untuk selisih stok fisik vs digital.
- Call to action untuk demo atau reservasi.

Tidak termasuk:

- Backend login dan role-based access asli.
- Upload dokumen dan email verification.
- Payment gateway.
- API ERP nyata.
- Integrasi sensor IoT nyata.
- Last-mile delivery, produksi klien, atau packaging khusus.

## Fitur Yang Direpresentasikan

### Core MVP

- Customer account dan role access sebagai konsep dashboard.
- Warehouse zone dan capacity setup.
- Storage reservation.
- Product registration.
- Inbound verification.
- Stock monitoring.
- Outbound request.
- Billing calculation.
- Invoice and payment status.

### Supporting Features

- Pickup request.
- Courier assignment.
- Threshold notification.
- ERP/API export preview.
- Operational reporting.

## Indikator Keberhasilan Web

- Pengunjung memahami apa itu FlowSpace dalam 10 detik pertama.
- Alur warehouse digital terlihat jelas dari reservasi sampai invoice.
- Dashboard preview memperlihatkan stok, kapasitas, inbound/outbound, dan billing.
- Konten project output ISPM tersaji ringkas tanpa terasa seperti PDF yang dipindahkan mentah.
- Layout responsif dan mudah dipresentasikan di laptop maupun mobile.

## Data Konten Dari PDF

- Investasi awal: sekitar Rp 3.000.000.000.
- Estimasi payback: sekitar 2,2 tahun.
- Target okupansi tahun 1: 50%-70%.
- Target okupansi tahun 2: 80%-85%.
- Target okupansi tahun 3: 90% dan ekspansi lokasi.
- Revenue tahun 1: Rp 1.500.000.000.
- Revenue tahun 2: Rp 3.200.000.000.
- Revenue tahun 3: Rp 5.500.000.000.
- Indikator proyek: selisih stok fisik dan digital maksimal 0,1%, okupansi minimal 70% akhir tahun pertama, retensi pengguna 85% bulan ke-12.
- Durasi proyek: 9 bulan sampai peluncuran penuh.

## Risiko Produk Yang Perlu Ditampilkan

- Selisih stok fisik dan digital akibat kesalahan inbound/outbound.
- Sensor IoT gagal membaca data karena debu, lembap, atau posisi rak.
- Data sensor terlambat masuk karena koneksi gateway tidak stabil.
- Keterlambatan legal atau kontrak lokasi gudang.
- Scope creep dari permintaan integrasi ERP enterprise.
- Adopsi user lambat karena alur dashboard terlalu kompleks.

