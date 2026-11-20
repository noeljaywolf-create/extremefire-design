/* A quiet crossfade; visitor choice and reduced-motion settings take priority. */
(function () {
  'use strict';
  var slides = Array.from(document.querySelectorAll('.journal-slide'));
  var controls = document.querySelector('.journal-slide-controls');
  if (slides.length < 2 || !controls) return;
  var titles = ['The storage equation', 'The water supply behind the system', 'Precision at the point of discharge'];
  var title = document.getElementById('journal-slide-title');
  var count = document.getElementById('journal-slide-count');
  var status = document.getElementById('journal-slide-status');
  var toggle = controls.querySelector('[data-slide="toggle"]');
  var motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  var index = 0, timer = null, paused = motion.matches, focusWithin = false;
  function show(next, announce) {
    var target = (next + slides.length) % slides.length;
    var image = slides[target].querySelector('img');
    if (!image.complete || !image.naturalWidth) return;
    slides[index].classList.remove('is-active');
    index = target;
    slides[index].classList.add('is-active');
    title.textContent = titles[index];
    count.textContent = String(index + 1).padStart(2, '0') + ' / 03';
    if (announce) status.textContent = 'Background ' + (index + 1) + ' of 3: ' + titles[index];
  }
  function schedule() {
    clearInterval(timer);
    toggle.textContent = paused ? 'Play slideshow' : 'Pause slideshow';
    if (!paused && !focusWithin && !document.hidden) timer = setInterval(function () { show(index + 1, false); }, 8000);
  }
  controls.hidden = false;
  controls.addEventListener('click', function (event) {
    var button = event.target.closest('button[data-slide]');
    if (!button) return;
    var action = button.dataset.slide;
    if (action === 'toggle') { paused = !paused; if (!paused) focusWithin = false; }
    else { paused = true; show(index + (action === 'next' ? 1 : -1), true); }
    schedule();
  });
  controls.addEventListener('focusin', function () { focusWithin = true; schedule(); });
  controls.addEventListener('focusout', function (event) {
    if (!controls.contains(event.relatedTarget)) { focusWithin = false; schedule(); }
  });
  document.addEventListener('visibilitychange', schedule);
  motion.addEventListener('change', function (event) { if (event.matches) paused = true; schedule(); });
  schedule();
})();
