/* Explicitly marked standalone explanations only. Never targets paragraphs/cards. */
(function () {
  'use strict';
  var entries = [], serial = 0;
  document.querySelectorAll('[data-explanation]').forEach(function (root) {
    if (root.closest('[class*="card"], article, form, details, [role="dialog"]')) return;
    var full = root.querySelector('.explanation-text');
    if (!full || full.querySelector('a, button, input, select, textarea')) return;
    var preview = document.createElement('p');
    preview.className = 'explanation-preview';
    preview.textContent = Array.from(full.querySelectorAll('p')).map(function (p) { return p.textContent.trim(); }).join(' ');
    preview.hidden = true;
    var button = document.createElement('button');
    button.type = 'button';button.className = 'explanation-toggle';button.textContent = 'Read more';button.hidden = true;
    if (!full.id) full.id = 'explanation-full-' + (++serial);
    button.setAttribute('aria-controls', full.id);button.setAttribute('aria-expanded', 'false');
    root.appendChild(preview);root.appendChild(button);
    var item = { root:root, full:full, preview:preview, button:button, expanded:false };
    function paint(long) {
      full.hidden = long && !item.expanded;
      preview.hidden = !long || item.expanded;
      preview.classList.toggle('explanation-preview-clamped', long && !item.expanded);
      button.hidden = !long;
      button.textContent = item.expanded ? 'Read less' : 'Read more';
      button.setAttribute('aria-expanded', String(item.expanded));
    }
    item.measure = function () {
      if (!root.getClientRects().length || !root.clientWidth) return;
      preview.hidden = false;preview.classList.remove('explanation-preview-clamped');
      var style = getComputedStyle(preview), lineHeight = parseFloat(style.lineHeight);
      if (!Number.isFinite(lineHeight)) lineHeight = parseFloat(style.fontSize) * 1.75;
      item.long = preview.scrollHeight > 4 * lineHeight + 1;
      paint(item.long);
    };
    button.addEventListener('click', function () { item.expanded = !item.expanded;paint(item.long); });
    entries.push(item);
  });
  function refresh() { entries.forEach(function (item) { item.measure(); }); }
  refresh();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(refresh);
  var pending;
  window.addEventListener('resize', function () {clearTimeout(pending);pending=setTimeout(refresh,120);});
})();
