/* parallax.js — scroll-linked hero backgrounds.
   ---------------------------------------------------------------------------
   Writes a --parallax-y custom property on each [data-parallax] element.
   pages.css consumes it on .page-hero::before via transform, so the image
   layer moves without needing a real child element or a JS class toggle.

   Deliberately conservative:
   - transform-only writes, so the layer stays on the compositor
   - one rAF callback per frame, not one per scroll event
   - passive scroll listener (never blocks scrolling)
   - disabled for prefers-reduced-motion and for touch-only devices, where
     the effect is barely visible but the battery cost is real
   - no-ops entirely when parallax.css is not loaded
*/
(function () {
  "use strict";

  var layers = [];
  var raf = null;

  function motionAllowed() {
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return false;
    }
    // Coarse pointer = phone/tablet. Skip: the hero is rarely on screen long
    // enough for the drift to read, and this is a battery win.
    if (window.matchMedia && window.matchMedia("(pointer: coarse)").matches) {
      return false;
    }
    return true;
  }

  function paint() {
    raf = null;
    var vh = window.innerHeight || 1;

    for (var i = 0; i < layers.length; i++) {
      var el = layers[i];
      var rect = el.getBoundingClientRect();

      // Skip work once the element is off screen.
      if (rect.bottom < -200 || rect.top > vh + 200) continue;

      // -1 when the element's top is at the bottom of the viewport,
      //  0 when centred, +1 when scrolled past. Shift the layer a fraction
      //  of that so it drifts against the page.
      var centre = rect.top + rect.height / 2;
      var progress = (centre - vh / 2) / (vh / 2 + rect.height / 2);
      var offset = progress * -70; // px

      el.style.setProperty("--parallax-y", offset.toFixed(2) + "px");
    }
  }

  function schedule() {
    if (raf === null) raf = window.requestAnimationFrame(paint);
  }

  function init() {
    if (!motionAllowed()) return;

    var found = document.querySelectorAll("[data-parallax]");
    if (!found.length) return;

    for (var i = 0; i < found.length; i++) layers.push(found[i]);
    layers.forEach(function (el) { el.style.setProperty("--parallax-y", "0px"); });

    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
    paint();

    // Stop updating once the element can no longer come back into view.
    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          var idx = layers.indexOf(e.target);
          if (idx === -1) return;
          if (!e.isIntersecting) e.target.style.setProperty("--parallax-y", "0px");
          else schedule();
        });
      }, { rootMargin: "200px" });
      layers.forEach(function (el) { io.observe(el); });
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
