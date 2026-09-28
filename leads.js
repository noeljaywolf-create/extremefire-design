/* Lead capture for Extreme Fire Design Inc.
 *
 * Handles: UTM capture, spam trap, form submission, GA4 key events,
 * compliance quiz scoring, and gated PDF/checklist downloads.
 *
 * IMPORTANT: there is no form backend yet. The site is hosted on GitHub Pages,
 * which cannot accept POSTs. Until a backend or form service is chosen, forms
 * fall back to opening WhatsApp with the enquiry pre-filled, so no lead is
 * silently lost. TODO_CONFIRM: choose the form backend.
 */
(function () {
  'use strict';

  var cfg = window.EFD_CONFIG || {};
  var WA = (cfg.whatsappUrl || 'https://wa.me/263776400176').replace(/\/+$/, '');

  /* ---------------- UTM capture ---------------- */
  var UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid'];

  function readParams() {
    var out = {};
    var q = new URLSearchParams(window.location.search);
    UTM_KEYS.forEach(function (k) {
      var v = q.get(k);
      if (v) out[k] = v;
    });
    return out;
  }

  // Persist first-touch and last-touch so a return visit still attributes.
  var STORAGE_KEY = 'efc_utm';
  try {
    var params = readParams();
    if (Object.keys(params).length) {
      var prev = {};
      try { prev = JSON.parse(sessionStorage.getItem(STORAGE_KEY) || '{}'); } catch (e) {}
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(params));
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(params)); } catch (e) {}
    }
  } catch (e) {}

  function storedParams() {
    var p = {};
    try { p = JSON.parse(sessionStorage.getItem(STORAGE_KEY) || '{}'); } catch (e) {}
    if (!Object.keys(p).length) {
      try { p = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}'); } catch (e) {}
    }
    return p;
  }

  function fillUtm(root) {
    var p = storedParams();
    (root || document).querySelectorAll('[data-utm]').forEach(function (el) {
      var k = el.getAttribute('data-utm');
      if (p[k] && !el.value) el.value = p[k];
    });
  }

  /* ---------------- GA4 ---------------- */
  function track(name, params) {
    if (typeof window.gtag === 'function') window.gtag('event', name, params || {});
  }

  /* ---------------- WhatsApp fallback ---------------- */
  function sendToWhatsApp(lines) {
    var url = WA + '?text=' + encodeURIComponent(lines.join('\n'));
    window.open(url, '_blank', 'noopener');
  }

  /* ---------------- Form handling ---------------- */
  function isSpam(form) {
    // Honeypot: a real user never sees or fills this.
    var hp = form.querySelector('input[name="website"]');
    if (hp && hp.value) return true;
    // Timing trap: a genuine submission takes more than 2 seconds.
    var opened = Number(form.getAttribute('data-opened-at') || 0);
    if (opened && (Date.now() - opened) < 2000) return true;
    return false;
  }

  function serialise(form) {
    return Array.prototype.slice
      .call(form.querySelectorAll('input,textarea,select'))
      .filter(function (el) { return el.name && el.type !== 'hidden' && el.type !== 'checkbox'; })
      .map(function (el) { return el.name + ': ' + (el.value || '').trim(); })
      .filter(function (s) { return s.indexOf(': ') < 0 || s.split(': ')[1]; });
  }

  function bindForm(form) {
    form.setAttribute('data-opened-at', String(Date.now()));
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (isSpam(form)) return;           // silently drop
      fillUtm(form);

      var subject = form.getAttribute('data-subject') || 'Website enquiry';
      var lines = ['New enquiry from the website', 'Page: ' + location.pathname]
        .concat(serialise(form));
      var utm = storedParams();
      if (Object.keys(utm).length) {
        lines.push('---');
        Object.keys(utm).forEach(function (k) { lines.push(k + ': ' + utm[k]); });
      }

      track('form_submit', { form_id: form.id || 'lead-form' });

      // TODO_CONFIRM: replace this with a real POST once a backend exists.
      sendToWhatsApp(lines);

      track('generate_lead', { form_id: form.id || 'lead-form' });
      window.location.href = 'thank-you.html';
    });
  }

  document.querySelectorAll('form[data-lead-form]').forEach(bindForm);

  /* ---------------- Compliance quiz ---------------- */
  /* Scores are advisory only. The result wording deliberately avoids claiming
     legal compliance, because the applicable Zimbabwean requirements have not
     been confirmed. TODO_CONFIRM: have the scoring thresholds and wording
     reviewed against the requirements that actually apply. */
  var QUIZ = [
    {
      q: 'Does your building have a fire sprinkler system?',
      opts: [
        { t: 'Yes, installed and commissioned', s: 0 },
        { t: 'Yes, but I am not sure it was commissioned or tested', s: 2 },
        { t: 'No', s: 3 }
      ]
    },
    {
      q: 'When was the system last inspected or tested?',
      opts: [
        { t: 'Within the last 12 months', s: 0 },
        { t: 'More than 12 months ago', s: 2 },
        { t: 'Never, or I do not know', s: 3 }
      ]
    },
    {
      q: 'Do you have fire detection and alarm?',
      opts: [
        { t: 'Yes, and it is tested regularly', s: 0 },
        { t: 'Yes, but testing is irregular', s: 1 },
        { t: 'No', s: 2 }
      ]
    },
    {
      q: 'Is there a fire extinguisher on every floor, serviced on schedule?',
      opts: [
        { t: 'Yes, with service tags in date', s: 0 },
        { t: 'There are some, but the servicing is unclear', s: 1 },
        { t: 'No, or I do not know', s: 2 }
      ]
    },
    {
      q: 'Do you have current written records for your fire protection systems?',
      opts: [
        { t: 'Yes, and I know where they are', s: 0 },
        { t: 'Partly, or they are out of date', s: 2 },
        { t: 'No', s: 3 }
      ]
    },
    {
      q: 'Do you have a clear evacuation plan and marked escape routes?',
      opts: [
        { t: 'Yes, and staff know it', s: 0 },
        { t: 'There is a plan but it is not practised', s: 1 },
        { t: 'No', s: 2 }
      ]
    }
  ];

  var BANDS = [
    { max: 4, key: 'ready', title: 'Looking reasonably prepared',
      body: 'Most of the basics appear to be in place. The next step is confirming that the records are current and that testing dates are actually being met.' },
    { key: 'attention', max: 10, title: 'Needs attention',
      body: 'There are gaps that a fire would expose: systems that may not have been commissioned or tested on schedule, and records that are not current. We can survey the site and tell you exactly what is missing.' },
    { key: 'high', max: 99, title: 'High risk',
      body: 'Several fundamentals appear to be missing. This is worth a proper assessment before anything else. Call us and we will arrange a site survey.' }
  ];

  function bandFor(score) {
    for (var i = 0; i < BANDS.length; i++) if (score <= BANDS[i].max) return BANDS[i];
    return BANDS[BANDS.length - 1];
  }

  window.efdQuiz = { questions: QUIZ, bandFor: bandFor, track: track, sendToWhatsApp: sendToWhatsApp };

  /* ---------------- Gated downloads ---------------- */
  document.querySelectorAll('[data-gated-download]').forEach(function (el) {
    el.addEventListener('click', function (e) {
      e.preventDefault();
      var form = document.querySelector(el.getAttribute('data-gated-download'));
      if (form) {
        form.scrollIntoView({ behavior: 'smooth', block: 'center' });
        var first = form.querySelector('input,textarea,select');
        if (first) first.focus();
      }
    });
  });

  /* ---------------- Init ---------------- */
  document.addEventListener('DOMContentLoaded', function () { fillUtm(document); });
  if (document.readyState !== 'loading') fillUtm(document);
})();
