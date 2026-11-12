/* ============================================================
   ENGINEERING SECTIONS JS - Extreme Fire Design Inc
   Checklist, resources gate
   ============================================================ */
(function () {
  'use strict';

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
      var msg = 'This brief checklist is a starting point only, not a compliance determination. Discuss your answers and site conditions with a qualified fire safety professional for an assessment.';
      if (resultBox) {
        resultBox.hidden = false;
        if (resultScore) resultScore.textContent = yes + ' of ' + questions.length + ' answered yes';
        if (resultText) resultText.textContent = msg;
        questions.forEach(function (q) { q.classList.remove('active'); });
      }
    }
  }

})();
