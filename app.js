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
     Three registration windows, all opening 00:00 Vietnam time (UTC+7).
     The timer counts down to the NEXT window, labels it, and flags the
     matching tier card.                                        */
  var countdownBox = document.getElementById('countdown');
  if (countdownBox) {
    var MILESTONES = [
      { key: 'group',   time: new Date('2026-10-10T00:00:00+07:00').getTime(), label: 'Group registration opens in' },
      { key: 'early',   time: new Date('2026-10-17T00:00:00+07:00').getTime(), label: 'Early bird registration opens in' },
      { key: 'regular', time: new Date('2026-10-24T00:00:00+07:00').getTime(), label: 'Regular registration opens in' }
    ];

    var el = {
      months: document.getElementById('countdownMonths'),
      days: document.getElementById('countdownDays'),
      hours: document.getElementById('countdownHours'),
      minutes: document.getElementById('countdownMinutes'),
      seconds: document.getElementById('countdownSeconds')
    };
    var labelEl = document.getElementById('countdownLabel');
    var openEl = document.getElementById('countdownOpen');
    var pad = function (n) {
      return n < 10 ? '0' + n : String(n);
    };
    var timerId;

    var nextMilestone = function () {
      var now = Date.now();
      for (var i = 0; i < MILESTONES.length; i++) {
        if (MILESTONES[i].time > now) {
          return { m: MILESTONES[i], index: i };
        }
      }
      return null;
    };

    var markTiers = function (activeIndex) {
      MILESTONES.forEach(function (m, i) {
        var card = document.getElementById('tier-' + m.key);
        if (!card) {
          return;
        }
        var badge = card.querySelector('.tier-badge');
        card.classList.toggle('is-open', m.time <= Date.now());
        card.classList.toggle('is-next', i === activeIndex);
        if (badge) {
          badge.hidden = i !== activeIndex;
        }
      });
    };

    var tick = function () {
      var next = nextMilestone();

      if (!next) {
        // All windows have opened — retire the countdown.
        countdownBox.style.display = 'none';
        if (labelEl) {
          labelEl.style.display = 'none';
        }
        if (openEl) {
          openEl.hidden = false;
        }
        markTiers(-1);
        if (timerId) {
          clearInterval(timerId);
        }
        return;
      }

      var target = new Date(next.m.time);
      var now = new Date();
      var diff = target.getTime() - now.getTime();

      if (labelEl) {
        labelEl.textContent = next.m.label;
      }
      markTiers(next.index);

      // Calendar-accurate months & days (not a fixed 30-day month)
      var months =
        (target.getFullYear() - now.getFullYear()) * 12 + (target.getMonth() - now.getMonth());
      var anchor = new Date(target.getFullYear(), target.getMonth(), now.getDate());
      if (anchor > target) {
        months--;
      }
      var afterMonths = new Date(now);
      afterMonths.setMonth(afterMonths.getMonth() + months);
      var days = Math.floor((target.getTime() - afterMonths.getTime()) / (1000 * 60 * 60 * 24));

      el.months.textContent = String(Math.max(months, 0));
      el.days.textContent = String(Math.max(days, 0));
      el.hours.textContent = pad(Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
      el.minutes.textContent = pad(Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)));
      el.seconds.textContent = pad(Math.floor((diff % (1000 * 60)) / 1000));
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
