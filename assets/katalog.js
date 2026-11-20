(function () {
  var CATEGORIES = ['Clearcoats & Hardener', 'Primer & Epoxy', 'Basecoat & Top Coat', 'Thinner & Degreaser'];
  var WA_SVG = '<svg class="h-4 w-4 shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>';
  var state = { category: '', search: '' };
  var filters = document.getElementById('filters');
  var results = document.getElementById('results');
  var input = document.getElementById('search');
  var form = document.getElementById('search-form');

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function waLink(text) {
    var base = 'https://wa.me/' + (typeof WA_NUMBER !== 'undefined' && WA_NUMBER ? WA_NUMBER : '');
    return base + '?text=' + encodeURIComponent(text);
  }

  function renderFilters() {
    var base = 'rounded-xl border px-4 py-2.5 text-sm font-black transition ';
    var html = '<button type="button" data-cat="" class="' + base +
      (state.category === '' ? 'border-[#0B2D6B] bg-[#0B2D6B] text-white shadow-sm' : 'border-slate-200 bg-white text-slate-600 hover:border-[#0B2D6B] hover:text-[#0B2D6B]') +
      '">Semua Produk</button>';
    CATEGORIES.forEach(function (c) {
      html += '<button type="button" data-cat="' + esc(c) + '" class="' + base +
        (state.category === c ? 'border-[#D91B24] bg-[#D91B24] text-white shadow-sm' : 'border-slate-200 bg-white text-slate-600 hover:border-[#D91B24] hover:text-[#D91B24]') +
        '">' + esc(c) + '</button>';
    });
    filters.innerHTML = html;
  }

  function matches(group, serie, q) {
    if (!q) return true;
    var hay = (serie.name + ' ' + serie.sizes.join(' ') + ' ' + group.category + ' huber').toLowerCase();
    return hay.indexOf(q) !== -1;
  }

  function renderResults() {
    var q = state.search.trim().toLowerCase();
    var html = '';
    (window.KATALOG || []).forEach(function (group) {
      if (state.category && group.category !== state.category) return;
      var list = group.series.filter(function (s) { return matches(group, s, q); });
      if (!list.length) return;
      html += '<div class="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8 hover:shadow-md transition">' +
        '<div class="mb-2 flex items-center gap-3"><span class="inline-block h-1.5 w-8 rounded-full bg-[#D91B24]"></span>' +
        '<h2 class="text-xl font-black text-[#0B2D6B]">' + esc(group.category) + '</h2></div>' +
        '<p class="text-xs text-slate-400 mb-5 ml-11">' + list.length + ' seri tersedia</p>' +
        '<div class="mt-4 grid gap-4 lg:grid-cols-2">';
      list.forEach(function (s) {
        var sizes = s.sizes.map(function (z) {
          return '<span class="rounded-full border border-blue-200 bg-white px-3 py-1.5 text-xs font-black text-[#0B2D6B] shadow-sm">' + esc(z) + '</span>';
        }).join('');
        html += '<article class="group rounded-2xl border border-slate-200 bg-slate-50 p-5 hover:border-[#0B2D6B] hover:bg-blue-50/40 transition">' +
          '<div class="flex items-start justify-between gap-3"><h3 class="font-black text-slate-900 group-hover:text-[#0B2D6B] transition">' + esc(s.name) + '</h3>' +
          '<span class="shrink-0 rounded-full bg-[#0B2D6B]/10 px-2.5 py-1 text-xs font-black text-[#0B2D6B]">' + s.sizes.length + ' ukuran</span></div>' +
          '<div class="mt-3 flex flex-wrap gap-2">' + sizes + '</div>' +
          '<div class="mt-3 flex items-center gap-2 text-xs text-slate-500">Kemasan: <strong>' + (s.box.length ? esc(s.box.join(' / ')) : '—') + ' pcs/dus</strong></div>' +
          '<div class="mt-4"><a href="' + waLink('Halo PT Auto Prima Sukses, saya ingin menanyakan penawaran untuk ' + s.name) + '" target="_blank" rel="noopener" ' +
          'class="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-bold text-white hover:bg-emerald-700 hover:shadow-md transition">' +
          WA_SVG + 'Ajukan Penawaran</a></div></article>';
      });
      html += '</div></div>';
    });
    if (!html) {
      html = '<div class="rounded-2xl border border-slate-200 bg-white p-12 text-center shadow-sm"><p class="font-bold text-slate-500">Produk tidak ditemukan untuk pencarian "<em>' +
        esc(state.search) + '</em>".</p><button type="button" id="reset" class="mt-4 inline-block text-sm font-black text-[#0B2D6B] hover:underline">Lihat semua produk →</button></div>';
    }
    results.innerHTML = html;
  }

  function render() { renderFilters(); renderResults(); }

  filters.addEventListener('click', function (e) {
    var b = e.target.closest('button[data-cat]');
    if (!b) return;
    state.category = b.getAttribute('data-cat');
    render();
  });
  results.addEventListener('click', function (e) {
    if (e.target.id === 'reset') { state.search = ''; state.category = ''; input.value = ''; render(); }
  });
  form.addEventListener('submit', function (e) { e.preventDefault(); state.search = input.value; renderResults(); });
  input.addEventListener('input', function () { state.search = input.value; renderResults(); });

  render();
})();
