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
     Three registration windows. Opening TIMES are not yet announced, so the
     counter works at DATE level only (whole days), computed in Vietnam time
     (UTC+7) so it rolls over at local midnight.                     */
  var countdownBox = document.getElementById('countdown');
  if (countdownBox) {
    var MILESTONES = [
      { key: 'group',   date: [2026, 9, 10], label: 'Group registration opens in' },      // 10 Oct 2026
      { key: 'early',   date: [2026, 9, 17], label: 'Early bird registration opens in' }, // 17 Oct 2026
      { key: 'regular', date: [2026, 9, 24], label: 'Regular registration opens in' }     // 24 Oct 2026
    ];

    var daysEl = document.getElementById('countdownDays');
    var labelEl = document.getElementById('countdownLabel');
    var unitEl = document.getElementById('countdownUnit');
    var openEl = document.getElementById('countdownOpen');
    var timerId;

    // today's [y, m, d] in Vietnam time (UTC+7)
    var todayICT = function () {
      var t = new Date(Date.now() + 7 * 3600 * 1000);
      return [t.getUTCFullYear(), t.getUTCMonth(), t.getUTCDate()];
    };

    // whole calendar days from a -> b (both [y, m, d])
    var dayDiff = function (a, b) {
      return Math.round((Date.UTC(b[0], b[1], b[2]) - Date.UTC(a[0], a[1], a[2])) / 86400000);
    };

    var markTiers = function (activeIndex, today) {
      MILESTONES.forEach(function (m, i) {
        var card = document.getElementById('tier-' + m.key);
        if (!card) {
          return;
        }
        var badge = card.querySelector('.tier-badge');
        var opened = dayDiff(m.date, today) > 0; // its date is in the past
        card.classList.toggle('is-open', opened);
        card.classList.toggle('is-next', i === activeIndex);
        if (badge) {
          badge.hidden = i !== activeIndex;
        }
      });
    };

    var tick = function () {
      var today = todayICT();
      var next = null;

      for (var i = 0; i < MILESTONES.length; i++) {
        if (dayDiff(today, MILESTONES[i].date) >= 0) { // today or later
          next = { m: MILESTONES[i], index: i };
          break;
        }
      }

      if (!next) {
        // every window has opened
        countdownBox.style.display = 'none';
        if (labelEl) labelEl.style.display = 'none';
        if (openEl) openEl.hidden = false;
        markTiers(-1, today);
        if (timerId) clearInterval(timerId);
        return;
      }

      var days = dayDiff(today, next.m.date);

      if (labelEl) {
        labelEl.textContent = days === 0 ? next.m.label.replace(' opens in', ' opens') : next.m.label;
      }
      if (daysEl) daysEl.textContent = days === 0 ? '—' : String(days);
      if (unitEl) unitEl.textContent = days === 0 ? 'Today!' : (days === 1 ? 'Day' : 'Days');

      markTiers(next.index, today);
    };

    tick();
    timerId = setInterval(tick, 60000); // date-level: a minute is plenty
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
