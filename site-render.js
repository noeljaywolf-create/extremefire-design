/* Renders the shared, fact-gated blocks from window.EFD_CONFIG.
   Rule: anything not explicitly confirmed stays hidden rather than being
   shown as a placeholder. No section renders invented numbers, unverified
   client names, or unconfirmed standards. */

(function () {
  'use strict';

  var cfg = window.EFD_CONFIG || {};

  var esc = function (s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  };

  var show = function (el) { if (el) el.hidden = false; };

  /* ---- Standards ("Compliant With") ---------------------------------- */
  var stdMount = document.getElementById('standards-mount');
  if (stdMount) {
    var stds = (cfg.standards || []).filter(function (s) { return s && s.confirmed === true; });
    if (stds.length) {
      stdMount.innerHTML = stds.map(function (s) {
        return '<div class="std-badge"><span class="std-name">' + esc(s.code) + '</span>' +
          '<span class="std-desc">' + esc(s.desc) + '</span></div>';
      }).join('');
    } else {
      // Nothing confirmed: hide the whole strip rather than show an empty bar.
      var strip = stdMount.closest('section');
      if (strip) strip.hidden = true;
    }
  }

  /* ---- Credentials ---------------------------------------------------- */
  var credMount = document.getElementById('credentials-mount');
  if (credMount) {
    var creds = (cfg.credentials || []).filter(function (c) { return c && c.confirmed === true; });
    if (creds.length) {
      credMount.innerHTML = creds.map(function (c) {
        return '<div class="cred-item"><span class="cred-label">' + esc(c.label) + '</span>' +
          (c.detail ? '<span class="cred-detail">' + esc(c.detail) + '</span>' : '') + '</div>';
      }).join('');
      show(credMount.closest('section'));
    } else {
      var credSection = credMount.closest('section');
      if (credSection) credSection.hidden = true;
    }
  }

  /* ---- Client logo strip ---------------------------------------------- */
  var clientMount = document.getElementById('clients-mount');
  if (clientMount) {
    var clients = (cfg.clients || []).filter(function (c) { return c && c.permissionConfirmed === true; });
    if (clients.length) {
      clientMount.innerHTML = clients.map(function (c) {
        return '<div class="client-logo-item"><span class="client-logo-text">' + esc(c.name) + '</span></div>';
      }).join('');
      show(clientMount.closest('section'));
    } else {
      // Spec: default to hiding the strip until written permission exists.
      var clientSection = clientMount.closest('section');
      if (clientSection) clientSection.hidden = true;
    }
  }

  /* ---- Statistics ----------------------------------------------------- */
  var statsMount = document.getElementById('stats-mount');
  if (statsMount) {
    var s = cfg.stats || {};
    var rows = [
      { v: s.projectsCompleted, l: 'Projects Completed' },
      { v: s.yearsOperating, l: 'Years in Operation' },
      { v: s.industriesServed, l: 'Industries Served' },
      { v: s.clientsServed, l: 'Clients Served' }
    ].filter(function (r) { return typeof r.v === 'number' && isFinite(r.v) && r.v > 0; });

    if (rows.length) {
      statsMount.innerHTML = rows.map(function (r) {
        return '<div class="stat-item" data-stat>' +
          '<div class="stat-number"><span data-count="' + esc(r.v) + '">0</span>' +
          '<span class="stat-suffix">+</span></div>' +
          '<div class="stat-label">' + esc(r.l) + '</div>' +
          '<div class="stat-divider"></div></div>';
      }).join('');
      show(document.getElementById('stats-mount-wrap'));
    }
  }

  /* ---- Contact details ------------------------------------------------ */
  // Rewrites every element carrying a data-efd attribute so the phone number,
  // WhatsApp link, email and address can only be corrected in one place.
  var apply = function (sel, value, attr) {
    if (value == null) return;
    document.querySelectorAll(sel).forEach(function (el) {
      if (attr) el.setAttribute(attr, value); else el.textContent = value;
    });
  };

  if (cfg.phoneDisplay) apply('[data-efd="phone"]', cfg.phoneDisplay);
  if (cfg.phoneDial) apply('[data-efd="phone-link"]', 'tel:' + cfg.phoneDial, 'href');
  if (cfg.phoneSecondaryDisplay) apply('[data-efd="phone2"]', cfg.phoneSecondaryDisplay);
  if (cfg.phoneSecondaryDial) apply('[data-efd="phone2-link"]', 'tel:' + cfg.phoneSecondaryDial, 'href');
  if (cfg.whatsappDisplay) apply('[data-efd="whatsapp"]', cfg.whatsappDisplay);
  if (cfg.whatsappUrl) apply('[data-efd="whatsapp-link"]', cfg.whatsappUrl, 'href');
  if (cfg.email) {
    apply('[data-efd="email"]', cfg.email);
    apply('[data-efd="email-link"]', 'mailto:' + cfg.email, 'href');
  }
  if (cfg.facebookUrl) apply('[data-efd="facebook"]', cfg.facebookUrl, 'href');
  if (cfg.address && cfg.address.line1) {
    apply('[data-efd="address"]', cfg.address.line1 + ', ' + cfg.address.city + ', ' + cfg.address.country);
  }

  /* ---- Analytics events ------------------------------------------------ */
  // GA4 key events: click_whatsapp, click_call, click_email, form_submit,
  // quiz_complete, pdf_download, generate_lead.
  window.efdTrack = function (name, params) {
    if (typeof window.gtag !== 'function') return;
    window.gtag('event', name, params || {});
  };

  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a');
    if (!a) return;
    var href = a.getAttribute('href') || '';
    if (a.hasAttribute('data-efd-track')) {
      window.efdTrack(a.getAttribute('data-efd-track'), { link_url: a.href });
    } else if (/^tel:/i.test(href)) {
      window.efdTrack('click_call', { link_url: a.href });
    } else if (/wa\.me|whatsapp/i.test(href)) {
      window.efdTrack('click_whatsapp', { link_url: a.href });
    } else if (/^mailto:/i.test(href)) {
      window.efdTrack('click_email', { link_url: a.href });
    }
  }, true);
})();
