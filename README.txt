SITUS PROFIL PT AUTO PRIMA SUKSES (statis)
==========================================
Isi: index.html (profil), katalog.html (katalog), assets/, images/

UPLOAD KE CLOUDFLARE PAGES
1. Cloudflare > Workers & Pages > Create > Pages > Upload assets
2. Upload ISI folder ini (index.html harus ada di paling atas, bukan di dalam subfolder)
3. Setelah deploy: Custom domains > Set up a custom domain > autoprimasukses.my.id

YANG PERLU DIISI / DIUBAH
- Nomor WhatsApp : buka assets/site.js, isi WA_NUMBER (contoh "6281234567890")
- Data produk    : edit assets/produk.js (nama seri, ukuran, isi per dus)
- Email kontak   : cari "info@autoprimasukses.my.id" di index.html dan katalog.html
  (pastikan email ini memang dipakai; kalau belum, ganti atau hapus)

Catatan: file ini tidak berisi .env, database, harga, stok, atau data invoice.
