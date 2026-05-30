# Decision Log FlowSpace Web

## 2026-05-29 - Step 2: PRD, Sitemap, dan Agent Delegation

### Context

User meminta pembuatan web berdasarkan PDF FlowSpace Warehouse secara step-by-step, tidak langsung implementasi. Pada lanjutan ini user meminta penggunaan `.skill`, agent manager, dan sub-agent.

### Skill Yang Digunakan

- `agent-manager-skill` dari katalog Antigravity Awesome Skills.
- `web-design-guidelines` sebagai referensi review UI tahap berikutnya.

Catatan: `agent-manager-skill` asli mengandalkan tmux dan local CLI agent manager. Environment saat ini lebih cocok memakai sub-agent manager bawaan Codex, sehingga pola delegasi skill tersebut diterapkan melalui `multi_agent_v1`.

### Sub-Agent Yang Dijalankan

- Product Analyst: mengekstrak PRD, target user, value proposition, fitur MVP, nice-to-have, sitemap, dan asumsi dari PDF.
- UX/Sitemap Analyst: menyusun sitemap, homepage sections, user flow, wireframe tekstual, gaya visual, dan batasan frontend MVP.

### Keputusan Produk

- Web fase pertama adalah single-page product website dengan dashboard preview.
- Fokus implementasi awal adalah public product website, bukan sistem SaaS penuh.
- Dashboard customer/admin/staff diperlakukan sebagai preview atau roadmap, bukan backend produksi.
- Alur inti yang harus terlihat: reservation, SKU registration, inbound verification, stock monitoring, outbound request, billing.

### Keputusan Scope

Masuk implementasi awal:

- Landing/product page.
- Dashboard preview berbasis data statis.
- Capacity overview.
- Inventory table.
- Inbound/outbound activity.
- Billing summary.
- Risk control section.
- Business case and timeline section.

Ditunda:

- Login asli.
- Database.
- Payment gateway.
- Integrasi IoT real-time.
- ERP/API enterprise.
- Courier tracking.
- Export PDF/Excel.

### Gate Berikutnya

Sebelum coding, putuskan stack dan bentuk output:

1. Static HTML/CSS/JS: paling cepat, mudah dibuka langsung, cukup untuk presentasi.
2. React/Vite: lebih cocok jika dashboard preview dibuat interaktif dan ingin dikembangkan.

Rekomendasi: React/Vite jika tersedia di workspace atau bisa dibuat tanpa dependensi berat; static HTML jika targetnya hanya presentasi cepat.
