/* ============================================================
   ENGINEERING SECTIONS JS - Extreme Fire Design Inc
   Checklist, before/after sliders, resources gate
   ============================================================ */
(function () {
  'use strict';

  /* ---------- Before / After Sliders ---------- */
  var sliders = document.querySelectorAll('[data-ba]');
  function initSlider(slider) {
    var before = slider.querySelector('.ba-before');
    var handle = slider.querySelector('[data-handle]');
    function setPos(x) {
      var rect = slider.getBoundingClientRect();
      if (!rect.width) return;
      var pct = ((x - rect.left) / rect.width) * 100;
      pct = Math.max(0, Math.min(100, pct));
      before.style.clipPath = 'inset(0 ' + (100 - pct) + '% 0 0)';
      if (handle) handle.style.left = pct + '%';
    }
    function onMove(clientX) {
      var rect = slider.getBoundingClientRect();
      setPos(clientX);
    }
    slider.addEventListener('mousedown', function (e) {
      e.preventDefault();
      onMove(e.clientX);
      function mm(m) { onMove(m.clientX); }
      function mu() {
        document.removeEventListener('mousemove', mm);
        document.removeEventListener('mouseup', mu);
      }
      document.addEventListener('mousemove', mm);
      document.addEventListener('mouseup', mu);
    });
    slider.addEventListener('touchstart', function (e) {
      var t = e.touches[0];
      onMove(t.clientX);
      function tm(m) { onMove(m.touches[0].clientX); }
      function tu() {
        slider.removeEventListener('touchmove', tm);
        slider.removeEventListener('touchend', tu);
      }
      slider.addEventListener('touchmove', tm, { passive: true });
      slider.addEventListener('touchend', tu);
    });
  }
  sliders.forEach(initSlider);

  /* ---------- Fire Safety Checklist ---------- */
  var checklist = document.getElementById('fire-checklist');
  var resultBox = document.getElementById('checklist-result');
  var resultScore = document.getElementById('result-score');
  var resultText = document.getElementById('result-text');
  var answers = [];
  if (checklist) {
    var questions = checklist.querySelectorAll('.checklist-q');
    var current = 0;
    checklist.addEventListener('click', function (e) {
      var btn = e.target.closest('.q-opt');
      if (!btn) return;
      var val = btn.getAttribute('data-val');
      var qEl = btn.closest('.checklist-q');
      var qIndex = parseInt(qEl.getAttribute('data-q'), 10);
      answers[qIndex] = val;

      /* Visual feedback */
      qEl.querySelectorAll('.q-opt').forEach(function (b) { b.classList.remove('selected'); });
      btn.classList.add('selected');

      /* Next question or result */
      if (qIndex < questions.length - 1) {
        questions[qIndex].classList.remove('active');
        questions[qIndex + 1].classList.add('active');
        current = qIndex + 1;
      } else {
        showResult();
      }
    });

    function showResult() {
      var yes = answers.filter(function (a) { return a === 'yes'; }).length;
      var percent = Math.round((yes / 5) * 100);
      var score = percent;
      var msg;
      if (percent >= 80) {
        msg = 'Excellent! Your building shows strong fire safety compliance. Regular maintenance will keep it that way — contact us for an audit.';
      } else if (percent >= 50) {
        msg = 'Reasonable compliance, but several areas need attention. Book a professional fire safety assessment to close the gaps.';
      } else {
        msg = 'Your building has significant fire safety gaps that could put lives and property at risk. Contact us today for an urgent compliance review.';
      }
      if (resultBox) {
        resultBox.hidden = false;
        if (resultScore) resultScore.textContent = score + '%';
        if (resultText) resultText.textContent = msg;
        questions.forEach(function (q) { q.classList.remove('active'); });
      }
    }
  }

  /* ---------- Downloadable Resources (email gate) ---------- */
  var resBtns = document.querySelectorAll('.res-dl-btn');
  resBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var card = btn.closest('.res-card');
      var email = card ? card.querySelector('.res-email').value.trim() : '';
      var resType = card ? card.getAttribute('data-res') : '';
      var emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      if (!emailOk) {
        var input = card.querySelector('.res-email');
        input.style.borderColor = '#ef4444';
        input.focus();
        setTimeout(function () { input.style.borderColor = ''; }, 1500);
        return;
      }
      /* Simulate a download + thank you. Replace with real email capture / PDF link. */
      btn.textContent = 'Sending...';
      var link = '';
      if (resType === 'checklist') link = 'documents/fire-safety-checklist.pdf';
      else if (resType === 'maintenance') link = 'documents/fire-maintenance-schedule.pdf';
      else if (resType === 'evacuation') link = 'documents/evacuation-plan-template.pdf';
      setTimeout(function () {
        if (link) {
          var a = document.createElement('a');
          a.href = link;
          a.download = '';
          a.style.display = 'none';
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
        }
        btn.textContent = 'Download PDF';
        alert('Thank you! Your guide is downloading shortly.');
      }, 1000);
    });
  });
})();
