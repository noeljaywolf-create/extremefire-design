/* Same film and mobile/data/motion policy as the home page. */
(function () {
  'use strict';
  var video = document.getElementById('services-page-video');
  if (!video) return;
  var connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  var small = window.matchMedia('(max-width: 768px)');
  if (small.matches || reduced.matches || (connection && (connection.saveData || /(^|-)2g$/.test(connection.effectiveType || '')))) return;
  video.muted = true;
  video.src = 'Background/extreme-fire-video.mp4';
  function fallback() { document.body.classList.remove('services-video-playing');video.pause(); }
  video.addEventListener('error', fallback);
  video.addEventListener('playing', function () { document.body.classList.add('services-video-playing'); });
  var play = video.play();
  if (play && play.catch) play.catch(fallback);
  reduced.addEventListener('change', function (event) { if (event.matches) fallback(); });
  small.addEventListener('change', function (event) { if (event.matches) fallback(); });
  document.addEventListener('visibilitychange', function () {
    if (document.hidden) video.pause();
    else if (!small.matches && !reduced.matches) { var resumed = video.play();if (resumed && resumed.catch) resumed.catch(fallback); }
  });
})();
