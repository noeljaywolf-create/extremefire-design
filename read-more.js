/* Expand only copy that actually occupies more than four rendered lines.
   Full text remains available without JavaScript and in print. */
(function () {
  'use strict';
  var items = [], serial = 0;
  document.querySelectorAll('main p, .live-footer-about p').forEach(function (paragraph) {
    if (paragraph.closest('form, details, dialog, [role="dialog"], [aria-hidden="true"], .section-heading, .journal-section-head, .journal-slideshow, .journal-news-meta, .breadcrumb, .breadcrumbs, [data-no-read-more]')) return;
    if (paragraph.matches('.eyebrow, .journal-kicker, .journal-edition, .publication-meta, .journal-note, .journal-reviewed, .journal-image-credit, .form-note') || paragraph.querySelector('a, button, input, select, textarea')) return;
    if (!paragraph.textContent.trim()) return;
    paragraph.classList.add('copy-managed');
    items.push({ paragraph: paragraph, button: null, expanded: false });
  });
  function update(item) {
    var p = item.paragraph;
    if (!p.getClientRects().length || p.clientWidth === 0) return;
    p.classList.remove('copy-collapsed');
    var style = getComputedStyle(p);
    var height = parseFloat(style.lineHeight);
    if (!Number.isFinite(height)) height = parseFloat(style.fontSize) * 1.6;
    var long = p.scrollHeight > height * 4 + 2;
    if (long && !item.button) {
      var button = document.createElement('button');
      button.type = 'button'; button.className = 'copy-more';
      if (!p.id) p.id = 'expandable-copy-' + (++serial);
      button.setAttribute('aria-controls', p.id);
      button.addEventListener('click', function () {
        item.expanded = !item.expanded;
        p.classList.toggle('copy-collapsed', !item.expanded);
        button.textContent = item.expanded ? 'Read less' : 'Read more';
        button.setAttribute('aria-expanded', String(item.expanded));
      });
      p.insertAdjacentElement('afterend', button);item.button = button;
    }
    if (item.button) {
      item.button.hidden = !long;
      item.button.textContent = item.expanded ? 'Read less' : 'Read more';
      item.button.setAttribute('aria-expanded', String(item.expanded));
    }
    p.classList.toggle('copy-collapsed', long && !item.expanded);
  }
  function refresh() { items.forEach(update); }
  refresh();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(refresh);
  var pending;
  window.addEventListener('resize', function () { clearTimeout(pending);pending = setTimeout(refresh, 120); });
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var item = items.find(function (candidate) { return candidate.paragraph === entry.target; });
        if (item) update(item);
        observer.unobserve(entry.target);
      });
    });
    items.forEach(function (item) { observer.observe(item.paragraph); });
  }
})();
