/* Testimonials renderer.
   Reads window.EFD_CONFIG.testimonials. Renders NOTHING unless at least one
   entry has permissionConfirmed === true. No star ratings and no Review
   schema markup are emitted, because no verified review source exists yet. */

(function () {
  'use strict';

  var cfg = (window.EFD_CONFIG || {});
  var list = Array.isArray(cfg.testimonials) ? cfg.testimonials : [];
  var confirmed = list.filter(function (t) {
    return t && t.permissionConfirmed === true && t.quote && t.name;
  });

  var mount = document.getElementById('testimonials-mount');
  if (!mount) return;

  if (!confirmed.length) {
    // Leave the section empty rather than showing invented or placeholder praise.
    var section = mount.closest('section');
    if (section) section.hidden = true;
    return;
  }

  var esc = function (s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  };

  var html = confirmed.map(function (t) {
    var meta = [t.role, t.company].filter(Boolean).join(', ');
    return '<article class="review-card">' +
      '<blockquote class="review-text">' + esc(t.quote) + '</blockquote>' +
      '<div class="review-author"><strong>' + esc(t.name) + '</strong>' +
      (meta ? '<span>' + esc(meta) + '</span>' : '') +
      '</div></article>';
  }).join('');

  mount.innerHTML = html;

  // Only now is it safe to emit Review markup, and only for confirmed quotes.
  var ld = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: confirmed.map(function (t, i) {
      return {
        '@type': 'ListItem',
        position: i + 1,
        item: {
          '@type': 'Review',
          reviewBody: t.quote,
          author: { '@type': 'Person', name: t.name },
          itemReviewed: { '@type': 'Organization', name: (cfg.businessName || 'Extreme Fire Design Inc') }
        }
      };
    })
  };
  var s = document.createElement('script');
  s.type = 'application/ld+json';
  s.textContent = JSON.stringify(ld);
  document.head.appendChild(s);
})();
