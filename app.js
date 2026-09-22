/* ============================================================
   THE VLX 2027 — static site behaviour (vanilla JS, no deps)
   - mobile menu toggle
   - registration countdown timer
   - gallery slideshow (prev/next, thumbnails, swipe, counter)
   - scroll-to-top button
   ============================================================ */
(function () {
  'use strict';

  /* ---------------------------------------------------------- mobile menu */
  var menuToggle = document.getElementById('mobileMenuToggle');
  var mobileMenu = document.getElementById('mobileMenu');
  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', function () {
      var open = mobileMenu.classList.toggle('active');
      menuToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    // Close after choosing a destination
    mobileMenu.querySelectorAll('.mobile-nav-link').forEach(function (link) {
      link.addEventListener('click', function () {
        mobileMenu.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* --------------------------------------------------- scroll-to-top button */
  var toTop = document.getElementById('scrollToTopBtn');
  if (toTop) {
    var toggleBtn = function () {
      toTop.classList.toggle('visible', window.pageYOffset > 300);
    };
    window.addEventListener('scroll', toggleBtn, { passive: true });
    toggleBtn();
    toTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ------------------------------------------------------- copyright year */
  var yearEl = document.getElementById('copyrightYear');
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  /* ----------------------------------------------------- registration timer
     Two registration windows. Opening times are Vietnam time (UTC+7).
     Group registration opens at a confirmed 18:00 ICT; the later windows are
     assumed at the same time of day until confirmed. Counts down at second
     resolution to the next window, then advances on its own. */
  var countdownBox = document.getElementById('countdown');
  if (countdownBox) {
    // 18:00 ICT (UTC+7) == 11:00 UTC
    var MILESTONES = [
      { key: 'group',      ts: Date.UTC(2026, 9, 10, 11, 0, 0), label: 'Group registration opens in' },      // Sat 10 Oct 2026, 18:00 ICT
      { key: 'individual', ts: Date.UTC(2026, 9, 17, 11, 0, 0), label: 'Individual registration opens in' } // Sat 17 Oct 2026, 18:00 ICT
    ];

    var daysEl = document.getElementById('countdownDays');
    var hoursEl = document.getElementById('countdownHours');
    var minutesEl = document.getElementById('countdownMinutes');
    var secondsEl = document.getElementById('countdownSeconds');
    var labelEl = document.getElementById('countdownLabel');
    var unitEl = document.getElementById('countdownUnit');
    var openEl = document.getElementById('countdownOpen');
    var timerId;

    var pad = function (n) {
      return (n < 10 ? '0' : '') + n;
    };

    var markTiers = function (activeIndex, now) {
      MILESTONES.forEach(function (m, i) {
        var card = document.getElementById('tier-' + m.key);
        if (!card) {
          return;
        }
        var badge = card.querySelector('.tier-badge');
        var opened = now >= m.ts; // its instant is in the past
        card.classList.toggle('is-open', opened);
        card.classList.toggle('is-next', i === activeIndex);
        if (badge) {
          badge.hidden = i !== activeIndex;
        }
      });
    };

    var tick = function () {
      var now = Date.now();
      var next = null;

      for (var i = 0; i < MILESTONES.length; i++) {
        if (now < MILESTONES[i].ts) { // first window still in the future
          next = { m: MILESTONES[i], index: i };
          break;
        }
      }

      if (!next) {
        // every window has opened
        countdownBox.style.display = 'none';
        if (labelEl) labelEl.style.display = 'none';
        if (openEl) openEl.hidden = false;
        markTiers(-1, now);
        if (timerId) clearInterval(timerId);
        return;
      }

      var diff = next.m.ts - now;
      var days = Math.floor(diff / 86400000);
      var hours = Math.floor((diff % 86400000) / 3600000);
      var minutes = Math.floor((diff % 3600000) / 60000);
      var seconds = Math.floor((diff % 60000) / 1000);

      if (labelEl) labelEl.textContent = next.m.label;
      if (daysEl) daysEl.textContent = String(days);
      if (unitEl) unitEl.textContent = days === 1 ? 'Day' : 'Days';
      if (hoursEl) hoursEl.textContent = pad(hours);
      if (minutesEl) minutesEl.textContent = pad(minutes);
      if (secondsEl) secondsEl.textContent = pad(seconds);

      markTiers(next.index, now);
    };

    tick();
    timerId = setInterval(tick, 1000);
  }

  /* ------------------------------------------------------------ gallery */
  var mainImage = document.getElementById('mainImage');
  var thumbnailContainer = document.getElementById('thumbnailContainer');
  var counter = document.getElementById('imageCounter');
  if (mainImage && thumbnailContainer) {
    var thumbs = Array.prototype.slice.call(
      thumbnailContainer.querySelectorAll('.thumbnail')
    );
    var current = 0;
    var total = thumbs.length;

    var setActive = function () {
      thumbs.forEach(function (t, i) {
        t.classList.toggle('active', i === current);
      });
      var img = thumbs[current].querySelector('img');
      mainImage.src = img.getAttribute('src');
      mainImage.alt = img.getAttribute('alt');
      if (counter) {
        counter.textContent = current + 1 + ' / ' + total;
      }
      // centre the active thumbnail in the filmstrip
      var active = thumbs[current];
      if (active && thumbnailContainer.scrollTo) {
        var left =
          active.offsetLeft -
          thumbnailContainer.offsetWidth / 2 +
          active.offsetWidth / 2;
        thumbnailContainer.scrollTo({ left: left, behavior: 'smooth' });
      }
    };

    var goTo = function (i) {
      current = (i + total) % total;
      setActive();
    };
    var next = function () {
      goTo(current + 1);
    };
    var prev = function () {
      goTo(current - 1);
    };

    var nextBtn = document.getElementById('nextBtn');
    var prevBtn = document.getElementById('prevBtn');
    if (nextBtn) nextBtn.addEventListener('click', next);
    if (prevBtn) prevBtn.addEventListener('click', prev);

    thumbs.forEach(function (t, i) {
      t.addEventListener('click', function () {
        goTo(i);
      });
      t.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          goTo(i);
        }
      });
    });

    // swipe support
    var slideImage = document.getElementById('slideImage');
    if (slideImage) {
      var touchStartX = 0;
      slideImage.addEventListener(
        'touchstart',
        function (e) {
          touchStartX = e.changedTouches[0].screenX;
        },
        { passive: true }
      );
      slideImage.addEventListener(
        'touchend',
        function (e) {
          var diff = touchStartX - e.changedTouches[0].screenX;
          if (Math.abs(diff) > 50) {
            if (diff > 0) {
              next();
            } else {
              prev();
            }
          }
        },
        { passive: true }
      );
    }

    // keyboard navigation for the slideshow
    document.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    });
  }
})();

/* ------------------------------------------ registration local-time converter
   Shows the registration moment (Sat 10 Oct 2026, 18:00 ICT = 11:00 UTC) in the
   visitor's own time zone, and converts a typed city via Open-Meteo geocoding. */
(function () {
  var input = document.getElementById('tzInput');
  var result = document.getElementById('tzResult');
  if (!input || !result) {
    return;
  }

  var INSTANT = Date.UTC(2026, 9, 10, 11, 0, 0); // 18:00 ICT (UTC+7)

  var timeIn = function (tz) {
    try {
      return new Intl.DateTimeFormat('en-GB', {
        timeZone: tz,
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      }).format(new Date(INSTANT));
    } catch (e) {
      return null;
    }
  };

  var show = function (tz, label) {
    var s = timeIn(tz);
    if (!s) {
      result.textContent = 'We could not read that place — try a nearby city.';
      return;
    }
    result.innerHTML =
      'In ' + (label ? '<strong>' + label + '</strong> — ' : 'your location — ') +
      '<strong>' + s + '</strong>';
  };

  // 1) auto-detect the visitor's own time zone
  try {
    var mine = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (mine) {
      show(mine, null);
    }
  } catch (e) {}

  // 2) quick chips (no network needed)
  var quick = document.getElementById('tzQuick');
  if (quick) {
    quick.addEventListener('click', function (e) {
      var b = e.target.closest ? e.target.closest('button') : null;
      if (!b) {
        return;
      }
      var lbl = b.getAttribute('data-label') || '';
      input.value = lbl;
      show(b.getAttribute('data-tz'), lbl);
    });
  }

  // 3) type-ahead: city -> time zone (Open-Meteo geocoding, free, no key)
  var timer;
  var seq = 0;
  var resolve = function () {
    var q = input.value.trim();
    if (q.length < 2) {
      return;
    }
    if (q.indexOf('/') > -1 && timeIn(q)) { // raw IANA zone name, e.g. Asia/Seoul
      show(q, q);
      return;
    }
    var mySeq = ++seq;
    fetch('https://geocoding-api.open-meteo.com/v1/search?count=1&language=en&format=json&name=' +
          encodeURIComponent(q))
      .then(function (r) { return r.json(); })
      .then(function (d) {
        if (mySeq !== seq) {
          return;
        }
        var hit = d && d.results && d.results[0];
        if (!hit) {
          result.textContent = 'No match — try another spelling or a nearby city.';
          return;
        }
        var label = hit.name + (hit.country ? ', ' + hit.country : '');
        show(hit.timezone, label);
      })
      .catch(function () {
        if (mySeq === seq) {
          result.textContent = 'Could not look that up right now — try again.';
        }
      });
  };
  input.addEventListener('input', function () {
    clearTimeout(timer);
    timer = setTimeout(resolve, 450);
  });
})();
