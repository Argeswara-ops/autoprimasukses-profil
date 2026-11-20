// ====== PENGATURAN ======
// Isi nomor WhatsApp perusahaan (format internasional, tanpa + dan spasi), contoh: "6281234567890"
// Kalau dikosongkan, tombol WhatsApp akan membuka WhatsApp tanpa nomor tujuan.
var WA_NUMBER = "";
// ========================

(function () {
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  if (WA_NUMBER) {
    document.querySelectorAll('a[href^="https://wa.me/?"]').forEach(function (a) {
      a.href = a.href.replace('https://wa.me/?', 'https://wa.me/' + WA_NUMBER + '?');
    });
  }
})();
