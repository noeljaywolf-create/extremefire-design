/* ============================================================
   SCRIPT.JS - Extreme Fire Design Inc
   Premium Enterprise Experience
   ============================================================ */
(function () {
  'use strict';

  /* --------------------------------------------------------
     UTILITY HELPERS
     -------------------------------------------------------- */
  var $ = function (sel, ctx) { return (ctx || document).querySelector(sel); };
  var $$ = function (sel, ctx) { return Array.from((ctx || document).querySelectorAll(sel)); };
  var on = function (el, evt, fn, opts) { if (el) el.addEventListener(evt, fn, opts); };

  /* --------------------------------------------------------
     CONTACT FORM
     -------------------------------------------------------- */
  /* Contact form now uses native mailto: action — no JS override needed */

  /* --------------------------------------------------------
     TYPEWRITER: Recent Work ("It's What We Do")
     Only runs when element is in viewport.
     -------------------------------------------------------- */
  var recentWorkTw = $('#recent-work-typewriter');
  if (recentWorkTw) {
    var rwText = "It's What We Do";
    var rwI = 0, rwDel = false, rwTimer = null, rwStarted = false;

    function rwStep() {
      if (!rwDel) {
        recentWorkTw.textContent = rwText.slice(0, rwI + 1);
        rwI++;
        if (rwI >= rwText.length) { rwDel = true; rwTimer = setTimeout(rwStep, 2200); return; }
        rwTimer = setTimeout(rwStep, rwI === 1 ? 350 : 90);
      } else {
        rwI--;
        recentWorkTw.textContent = rwText.slice(0, rwI);
        if (rwI <= 0) { rwDel = false; rwTimer = setTimeout(rwStep, 700); return; }
        rwTimer = setTimeout(rwStep, 45);
      }
    }

    var rwObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting && !rwStarted) {
          rwStarted = true;
          rwStep();
          rwObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    rwObs.observe(recentWorkTw);
  }

  /* --------------------------------------------------------
     TYPEWRITER: Services Main Heading (one-shot, viewport)
     -------------------------------------------------------- */
  var servicesH = $('#services-main-heading');
  if (servicesH) {
    var svcText = servicesH.textContent;
    servicesH.textContent = '';
    var svcI = 0, svcStarted = false;
    function svcStep() {
      if (svcI < svcText.length) {
        servicesH.textContent += svcText[svcI];
        svcI++;
        setTimeout(svcStep, svcI === 1 ? 300 : 40);
      }
    }
    var svcObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting && !svcStarted) {
          svcStarted = true;
          svcStep();
          svcObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    svcObs.observe(servicesH);
  }

  /* --------------------------------------------------------
     READ MORE TOGGLES (Why Choose + Welcome)
     -------------------------------------------------------- */
  var whyBtn = $('#why-choose-read-more-btn');
  var whyMore = $('#why-choose-more');
  if (whyBtn && whyMore) {
    on(whyBtn, 'click', function () {
      var open = whyBtn.getAttribute('aria-expanded') === 'true';
      whyMore.hidden = open;
      whyBtn.innerHTML = '<span>' + (open ? 'Read more' : 'Read less') + '</span>';
      whyBtn.setAttribute('aria-expanded', String(!open));
    });
  }

  var readBtn = $('#read-more-btn');
  var welcomeMore = $('#welcome-more');
  if (readBtn && welcomeMore) {
    on(readBtn, 'click', function () {
      var open = readBtn.getAttribute('aria-expanded') === 'true';
      var actions = readBtn.closest('.welcome-actions');
      welcomeMore.hidden = open;
      if (actions) actions.classList[open ? 'remove' : 'add']('expanded');
      readBtn.innerHTML = '<span class="read-more-spinner" aria-hidden="true"></span><span>' + (open ? 'Read more' : 'Read less') + '</span>';
      readBtn.setAttribute('aria-expanded', String(!open));
    });
  }

  /* --------------------------------------------------------
     HERO BACKGROUND SLIDES / VIDEO
     -------------------------------------------------------- */
  var heroBg = $('.hero-bg');
  var heroVideo = heroBg ? $('.hero-bg__video', heroBg) : null;
  var heroSlides = heroBg ? $$('.hero-bg__slide', heroBg) : [];
  var videoCandidates = [
    'Background/extreme-fire-video.mp4',
    'Background/background.mp4', 'Background/background.webm', 'Background/background.ogg',
    'Background/video.mp4', 'Background/video.webm', 'Background/video.ogg'
  ];
  var slideSources = [];

  function preloadImages(urls) {
    urls.forEach(function (url) { var img = new Image(); img.src = url; });
  }
  function setSlideBackgrounds(slides, urls) {
    slides.forEach(function (s, i) {
      s.style.backgroundImage = "url('" + encodeURI(urls[i % urls.length]) + "')";
    });
  }
  async function resolveSlideSources() {
    try {
      var r = await fetch('Background/slides.json');
      if (!r.ok) throw 0;
      var d = await r.json();
      if (Array.isArray(d) && d.length) return d;
    } catch (e) { /* fallback */ }
    return [
      'Background/slide4.jpg', 'Background/slide5.jpg',
      'Background/WhatsApp Image 2026-07-07 at 11.28.57 (1).jpeg',
      'Background/WhatsApp Image 2026-07-07 at 11.28.58 (1).jpeg',
      'Background/WhatsApp Image 2026-07-07 at 11.28.58.jpeg',
      'Background/WhatsApp Image 2026-07-07 at 11.28.59.jpeg',
      'Background/WhatsApp Image 2026-07-07 at 12.34.27.jpeg',
      'Background/WhatsApp Image 2026-07-07 at 12.34.29.jpeg',
      'Background/WhatsApp Image 2026-07-07 at 12.34.30.jpeg'
    ];
  }
  function cycleHeroSlides(slides, interval) {
    if (!slides.length) return;
    var ci = 0;
    slides[ci].classList.add('active');
    setInterval(function () {
      slides[ci].classList.remove('active');
      ci = (ci + 1) % slides.length;
      slides[ci].classList.add('active');
    }, interval || 6000);
  }
  async function findVideoSource() {
    for (var i = 0; i < videoCandidates.length; i++) {
      try {
        var r = await fetch(videoCandidates[i], { method: 'HEAD' });
        if (r.ok) return videoCandidates[i];
      } catch (e) { /* skip */ }
    }
    return null;
  }
  if (heroBg && heroVideo) {
    findVideoSource().then(function (src) {
      if (src) {
        heroBg.classList.add('has-video');
        heroVideo.src = src;
        heroVideo.load();
        return;
      }
      if (heroSlides.length) {
        resolveSlideSources().then(function (s) {
          slideSources = s;
          preloadImages(s);
          setSlideBackgrounds(heroSlides, s);
          cycleHeroSlides(heroSlides);
        });
      }
    });
  } else if (heroSlides.length) {
    resolveSlideSources().then(function (s) {
      slideSources = s;
      preloadImages(s);
      setSlideBackgrounds(heroSlides, s);
      cycleHeroSlides(heroSlides);
    });
  }

  /* --------------------------------------------------------
     REVIEWS CAROUSEL
     -------------------------------------------------------- */
  var reviewsTrack = $('#reviews-track');
  var dotsContainer = $('#reviews-dots');
  var reviewSlides = reviewsTrack ? $$('.review-slide', reviewsTrack) : [];
  var currentReview = 0, reviewInterval = null;

  function showReview(idx) {
    reviewSlides.forEach(function (s, i) { s.classList.toggle('active', i === idx); });
    var dots = dotsContainer ? $$('.active', dotsContainer) : [];
    $$('button', dotsContainer).forEach(function (d, i) { d.classList.toggle('active', i === idx); });
    currentReview = idx;
  }
  function nextReview() { showReview((currentReview + 1) % reviewSlides.length); }
  function startReviewAutoPlay() { stopReviewAutoPlay(); reviewInterval = setInterval(nextReview, 5000); }
  function stopReviewAutoPlay() { if (reviewInterval) { clearInterval(reviewInterval); reviewInterval = null; } }

  if (reviewSlides.length && dotsContainer) {
    reviewSlides.forEach(function (_, i) {
      var dot = document.createElement('button');
      dot.setAttribute('aria-label', 'Review ' + (i + 1));
      on(dot, 'click', function () { showReview(i); startReviewAutoPlay(); });
      dotsContainer.appendChild(dot);
    });
    showReview(0);
    startReviewAutoPlay();
    var reviewsSection = reviewsTrack.closest('.latest-news-section');
    on(reviewsSection, 'mouseenter', stopReviewAutoPlay);
    on(reviewsSection, 'mouseleave', startReviewAutoPlay);
  }

  /* --------------------------------------------------------
     FAQ ACCORDION
     -------------------------------------------------------- */
  $$('.faq-question').forEach(function (btn) {
    on(btn, 'click', function () {
      var item = btn.closest('.faq-item');
      var open = item.classList.toggle('open');
      btn.setAttribute('aria-expanded', open);
      item.style.animation = 'none';
      item.style.borderColor = 'var(--accent)';
    });
  });
  $$('details.faq-item').forEach(function (detail) {
    on(detail, 'toggle', function () {
      if (detail.open) {
        detail.style.animation = 'none';
        detail.style.borderColor = 'var(--accent)';
      }
    });
  });

  /* --------------------------------------------------------
     HERO TYPEWRITER (viewport-activated, pause on click)
     -------------------------------------------------------- */
  var heroTw = $('#hero-typewriter');
  if (heroTw) {
    var heroTexts = [
      'Our Passion Is Helping You Protect Your People & Property.',
      'Your Safety Is Our Mission \u2014 Every System, Every Time.',
      'Protecting What Matters Most With Expert Fire Solutions.',
      'From Design To Maintenance \u2014 We Keep You Compliant & Protected.'
    ];
    var htI = 0, htC = 0, htDel = false, htStarted = false;

    function heroTypeStep() {
      var cur = heroTexts[htI];
      if (heroTw.closest('.hero-section') && heroTw.closest('.hero-section').dataset.livePaused) return;
      if (!htDel) {
        heroTw.textContent = cur.slice(0, htC + 1);
        htC++;
        if (htC === cur.length) { htDel = true; setTimeout(heroTypeStep, 3000); return; }
        setTimeout(heroTypeStep, 40 + Math.random() * 35);
      } else {
        heroTw.textContent = cur.slice(0, htC - 1);
        htC--;
        if (htC === 0) { htDel = false; htI = (htI + 1) % heroTexts.length; setTimeout(heroTypeStep, 500); return; }
        setTimeout(heroTypeStep, 20 + Math.random() * 15);
      }
    }

    var heroTwObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting && !htStarted) {
          htStarted = true;
          heroTypeStep();
          heroTwObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    heroTwObs.observe(heroTw);

    on(heroTw.closest('.hero-section'), 'click', function () {
      this.dataset.livePaused = 'true';
      heroTw.textContent = heroTexts[htI];
      var cursor = heroTw.nextElementSibling;
      if (cursor) cursor.style.display = 'none';
    });
  }

  /* --------------------------------------------------------
     PASSION CTA TYPEWRITER (viewport-activated, pause on click)
     -------------------------------------------------------- */
  var passionTw = $('#typewriter-text');
  if (passionTw) {
    var passionTexts = [
      'We truly have a passion for helping you protect your people and property.',
      'Your safety is our mission \u2014 every system, every inspection, every time.',
      'Protecting what matters most with expert fire protection solutions.',
      'From design to maintenance \u2014 we keep you compliant and protected.'
    ];
    var ptI = 0, ptC = 0, ptDel = false, ptStarted = false;

    function passionTypeStep() {
      var cur = passionTexts[ptI];
      if (passionTw.closest('.passion-cta') && passionTw.closest('.passion-cta').dataset.livePaused) return;
      if (!ptDel) {
        passionTw.textContent = cur.slice(0, ptC + 1);
        ptC++;
        if (ptC === cur.length) { ptDel = true; setTimeout(passionTypeStep, 2500); return; }
        setTimeout(passionTypeStep, 50 + Math.random() * 40);
      } else {
        passionTw.textContent = cur.slice(0, ptC - 1);
        ptC--;
        if (ptC === 0) { ptDel = false; ptI = (ptI + 1) % passionTexts.length; setTimeout(passionTypeStep, 400); return; }
        setTimeout(passionTypeStep, 25 + Math.random() * 20);
      }
    }

    var ptObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting && !ptStarted) {
          ptStarted = true;
          passionTypeStep();
          ptObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    ptObs.observe(passionTw);

    on(passionTw.closest('.passion-cta'), 'click', function () {
      this.dataset.livePaused = 'true';
      passionTw.textContent = passionTexts[ptI];
      var cursor = passionTw.nextElementSibling;
      if (cursor) cursor.style.display = 'none';
    });
  }

  /* --------------------------------------------------------
     LIVE ROTATOR (Featured Services / Passion CTA)
     Crossfade with dots, progress bar, pause on hover.
     -------------------------------------------------------- */
  var liveSlides = $$('.live-slide');
  var rotatorDots = $$('.live-rotator-dot');
  var rotatorProgress = $('.live-rotator-progress-bar');
  var rotatorContainer = $('.live-rotator');
  var liveIndex = 0, liveTimeout = null, liveDuration = 6000;

  function showLiveSlide(idx) {
    liveSlides.forEach(function (s, i) { s.classList.toggle('active', i === idx); });
    rotatorDots.forEach(function (d, i) { d.classList.toggle('active', i === idx); });
    liveIndex = idx;
    startLiveProgress();
  }
  function startLiveProgress() {
    if (!rotatorProgress) return;
    rotatorProgress.style.transition = 'none';
    rotatorProgress.style.width = '0%';
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        rotatorProgress.style.transition = 'width ' + liveDuration + 'ms linear';
        rotatorProgress.style.width = '100%';
      });
    });
  }
  function nextLiveSlide() { showLiveSlide((liveIndex + 1) % liveSlides.length); }
  function startLiveRotation() { stopLiveRotation(); liveTimeout = setTimeout(nextLiveSlide, liveDuration); startLiveProgress(); }
  function stopLiveRotation() {
    clearTimeout(liveTimeout);
    if (rotatorProgress) {
      var w = getComputedStyle(rotatorProgress).width;
      rotatorProgress.style.transition = 'none';
      rotatorProgress.style.width = w;
    }
  }

  if (liveSlides.length > 1) {
    rotatorDots.forEach(function (dot, i) {
      on(dot, 'click', function () { showLiveSlide(i); startLiveRotation(); });
    });
    if (rotatorContainer) {
      on(rotatorContainer, 'mouseenter', function () { stopLiveRotation(); });
      on(rotatorContainer, 'mouseleave', function () { startLiveRotation(); });
    }
    showLiveSlide(0);
    startLiveRotation();
  }

  /* --------------------------------------------------------
     REVEAL OBSERVERS (data-reveal + data-section-reveal)
     Base CSS lives in styles.css; this adds .revealed class.
     -------------------------------------------------------- */
  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  if (prefersReducedMotion.matches) {
    $$('[data-reveal], [data-section-reveal]').forEach(function (el) {
      el.classList.add('revealed');
    });
  } else {
    var revealObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          revealObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    $$('[data-reveal]').forEach(function (el) { revealObs.observe(el); });

    var sectionObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          sectionObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
    $$('[data-section-reveal]').forEach(function (el) { sectionObs.observe(el); });
  }

  /* --------------------------------------------------------
     WHY CHOOSE ROTATOR (rotating messages)
     -------------------------------------------------------- */
  var whyRotator = $('#why-choose-rotator');
  if (whyRotator) {
    var msgs = $$('.rotating-message', whyRotator);
    if (msgs.length > 1) {
      var rIdx = 0;
      msgs[rIdx].classList.add('active');
      on(whyRotator, 'click', function () { whyRotator.dataset.livePaused = 'true'; });
      setInterval(function () {
        if (whyRotator.dataset.livePaused) return;
        msgs[rIdx].classList.remove('active');
        rIdx = (rIdx + 1) % msgs.length;
        msgs[rIdx].classList.add('active');
      }, 5000);
    }
  }

  /* ============================================================
     ENHANCED FEATURES - Premium Enterprise Experience
     ============================================================ */

  /* 1. Page Loader - hide after content ready */
  on(window, 'load', function () {
    var loader = $('#page-loader');
    if (loader) {
      setTimeout(function () { loader.classList.add('hidden'); }, 800);
      setTimeout(function () { loader.remove(); }, 1500);
    }
    document.documentElement.classList.remove('loading');
  });

  /* 2. Sticky Header - glass effect on scroll */
  var siteHeader = $('#site-header');
  if (siteHeader) {
    on(window, 'scroll', function () {
      siteHeader.classList.toggle('scrolled', window.scrollY > 60);
    }, { passive: true });
  }

  /* 3. Mobile Navigation Toggle */
  var navToggle = $('#nav-toggle');
  var mainNav = $('#main-nav');
  if (navToggle && mainNav) {
    on(navToggle, 'click', function () {
      navToggle.classList.toggle('open');
      mainNav.classList.toggle('open');
    });
    $$('a', mainNav).forEach(function (a) {
      on(a, 'click', function () {
        navToggle.classList.remove('open');
        mainNav.classList.remove('open');
      });
    });
  }

  /* 4. Stats Counter Animation - triggers when visible, handles background tabs */
  var statObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        var el = entry.target;
        var counter = $('[data-count]', el);
        if (counter && !counter.dataset.animated) {
          counter.dataset.animated = 'true';
          var target = parseInt(counter.dataset.count, 10);
          var duration = 2000;
          var startTime = performance.now();
          var paused = false;
          var pausedAt = 0;

          function updateCounter(now) {
            if (document.hidden) {
              if (!paused) { paused = true; pausedAt = performance.now(); }
              requestAnimationFrame(updateCounter);
              return;
            }
            if (paused) {
              startTime += performance.now() - pausedAt;
              paused = false;
            }
            var elapsed = now - startTime;
            var progress = Math.min(elapsed / duration, 1);
            var eased = 1 - Math.pow(1 - progress, 3);
            counter.textContent = Math.floor(eased * target);
            if (progress < 1) requestAnimationFrame(updateCounter);
            else counter.textContent = target;
          }
          requestAnimationFrame(updateCounter);
        }
        statObserver.unobserve(el);
      }
    });
  }, { threshold: 0.3 });
  $$('[data-stat]').forEach(function (el) { statObserver.observe(el); });

  /* 5. Back to Top Button */
  var backToTop = $('#back-to-top');
  if (backToTop) {
    on(window, 'scroll', function () {
      backToTop.classList.toggle('visible', window.scrollY > 400);
    }, { passive: true });
    on(backToTop, 'click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* 6. Image Lazy Reveal - observer-managed images only */
  var imgObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        var img = entry.target;
        if (img.complete) {
          img.classList.add('loaded');
        } else {
          on(img, 'load', function () { img.classList.add('loaded'); }, { once: true });
          on(img, 'error', function () { img.classList.add('loaded'); }, { once: true });
        }
        imgObserver.unobserve(img);
      }
    });
  }, { threshold: 0.01 });
  $$('img[data-lazy-reveal]').forEach(function (img) {
    if (img.complete) img.classList.add('loaded');
    else imgObserver.observe(img);
  });

  /* 7. Smooth scroll for anchor links */
  $$('a[href^="#"]').forEach(function (anchor) {
    on(anchor, 'click', function (e) {
      var href = anchor.getAttribute('href');
      if (!href || href === '#' || href.length < 2) return;
      var target = $(href);
      if (target) {
        e.preventDefault();
        var headerH = siteHeader ? siteHeader.offsetHeight : 0;
        var top = target.getBoundingClientRect().top + window.scrollY - headerH - 20;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });

  /* --------------------------------------------------------
     8. SERVICE CARD SLIDER
     IntersectionObserver activation + touch swipe on mobile
     -------------------------------------------------------- */
  var serviceTrack = $('.services-slider-track');
  if (serviceTrack) {
    /* IntersectionObserver: pause animation when off-screen, resume when visible */
    var sliderInView = false;
    var sliderObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          if (!sliderInView) {
            sliderInView = true;
            serviceTrack.classList.remove('is-paused');
          }
        } else {
          sliderInView = false;
          serviceTrack.classList.add('is-paused');
        }
      });
    }, { threshold: 0.05 });
    sliderObs.observe(serviceTrack);

    /* Touch swipe for mobile */
    var touchStartX = 0;
    var touchDeltaX = 0;
    var isSwiping = false;

    on(serviceTrack, 'touchstart', function (e) {
      isSwiping = true;
      touchStartX = e.touches[0].clientX;
      touchDeltaX = 0;
      serviceTrack.classList.add('is-paused');
    }, { passive: true });

    on(serviceTrack, 'touchmove', function (e) {
      if (!isSwiping) return;
      touchDeltaX = e.touches[0].clientX - touchStartX;
    }, { passive: true });

    on(serviceTrack, 'touchend', function () {
      isSwiping = false;
      /* Resume auto-scroll after a short delay */
      setTimeout(function () {
        if (sliderInView) {
          serviceTrack.classList.remove('is-paused');
        }
      }, 1500);
    });
  }

})();
