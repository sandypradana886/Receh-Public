// Pengalih bahasa situs Receh. Urutan: pilihan tersimpan, bahasa browser,
// lalu Indonesia. Judul halaman diambil dari data-title-id / data-title-en
// pada tag <script> ini, dan tautan ber-data-href-en ikut berganti.
(function () {
  var script = document.currentScript;
  var root = document.documentElement;
  var saved = null;
  try { saved = localStorage.getItem('receh.lang'); } catch (e) {}
  var initial = saved || ((navigator.language || 'id').toLowerCase().indexOf('id') === 0 ? 'id' : 'en');

  function apply(lang) {
    root.setAttribute('data-lang', lang);
    root.setAttribute('lang', lang);
    var title = script && script.getAttribute('data-title-' + lang);
    if (title) document.title = title;
    document.querySelectorAll('[data-href-en]').forEach(function (a) {
      if (!a.dataset.hrefId) a.dataset.hrefId = a.getAttribute('href');
      a.setAttribute('href', lang === 'en' ? a.dataset.hrefEn : a.dataset.hrefId);
    });
  }

  apply(initial);
  var button = document.getElementById('lang');
  if (button) {
    button.addEventListener('click', function () {
      var next = root.getAttribute('data-lang') === 'id' ? 'en' : 'id';
      apply(next);
      try { localStorage.setItem('receh.lang', next); } catch (e) {}
    });
  }
})();
