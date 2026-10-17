/* Francine D. Ward — site interactions. No dependencies. */
(function () {
  "use strict";

  var doc = document.documentElement;
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var $ = function (sel, ctx) { return (ctx || document).querySelector(sel); };
  var $$ = function (sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); };

  /* ---------- Header: scrolled state, hide on scroll down, progress bar ---------- */
  var header = $(".site-header");
  var progress = $(".scroll-progress");
  var toTop = $(".to-top");
  var toTopCircle = toTop ? $("circle.progress", toTop) : null;
  var lastY = window.scrollY;
  var ticking = false;

  function onScroll() {
    var y = window.scrollY;
    var max = Math.max(1, document.body.scrollHeight - window.innerHeight);
    var ratio = Math.min(1, y / max);
    if (header) {
      header.classList.toggle("is-scrolled", y > 24);
      var navOpen = document.body.classList.contains("nav-open");
      header.classList.toggle("is-hidden", !navOpen && y > 420 && y > lastY + 4);
      if (y < lastY - 4) header.classList.remove("is-hidden");
    }
    if (progress) progress.style.transform = "scaleX(" + ratio + ")";
    if (toTop) {
      toTop.classList.toggle("is-visible", y > 900);
      if (toTopCircle) toTopCircle.style.strokeDashoffset = String(119.4 * (1 - ratio));
    }
    lastY = y;
    ticking = false;
  }
  window.addEventListener("scroll", function () {
    if (!ticking) { window.requestAnimationFrame(onScroll); ticking = true; }
  }, { passive: true });
  onScroll();

  if (toTop) toTop.addEventListener("click", function () { window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" }); });

  /* ---------- Skip link (works even under the 404 page's <base>) ---------- */
  var skip = $(".skip-link");
  if (skip) skip.addEventListener("click", function (e) {
    var m = document.getElementById("main");
    if (!m) return;
    e.preventDefault();
    m.setAttribute("tabindex", "-1");
    m.focus();
    m.scrollIntoView();
  });

  /* ---------- Mobile navigation ---------- */
  var toggle = $(".nav-toggle");
  if (toggle) {
    // While the full-screen menu is open, keep focus and scrolling inside it.
    var setInert = function (on) {
      [$(".skip-link"), $("main"), $(".site-footer"), toTop].forEach(function (el) { if (el) el.inert = on; });
      doc.classList.toggle("nav-lock", on);
    };
    var closeNav = function (restoreFocus) {
      var wasOpen = document.body.classList.contains("nav-open");
      document.body.classList.remove("nav-open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Open menu");
      setInert(false);
      if (wasOpen && restoreFocus === true) toggle.focus();
    };
    toggle.addEventListener("click", function () {
      var open = document.body.classList.toggle("nav-open");
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      setInert(open);
      if (open && header) header.classList.remove("is-hidden");
    });
    $$(".nav a").forEach(function (a) { a.addEventListener("click", function () { closeNav(false); }); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape" && document.body.classList.contains("nav-open")) closeNav(true); });
    window.addEventListener("resize", function () { if (window.innerWidth > 1160) closeNav(false); });
  }

  /* ---------- Reveal on scroll ---------- */
  var revealEls = $$(".reveal, .reveal-mask, .timeline li, .step");
  if ("IntersectionObserver" in window && !reduceMotion) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  }

  // Stagger children: [data-stagger] gives each .reveal child an incremental delay.
  $$("[data-stagger]").forEach(function (group) {
    var step = parseFloat(group.getAttribute("data-stagger")) || 0.08;
    $$(".reveal", group).forEach(function (el, i) { el.style.setProperty("--delay", (i * step).toFixed(2) + "s"); });
  });

  /* ---------- Animated counters ---------- */
  var counters = $$("[data-count]");
  function runCounter(el) {
    var target = parseFloat(el.getAttribute("data-count"));
    var duration = 1800;
    var start = null;
    if (reduceMotion) { el.textContent = String(target); return; }
    function frame(ts) {
      if (!start) start = ts;
      var t = Math.min(1, (ts - start) / duration);
      var eased = 1 - Math.pow(1 - t, 4);
      el.textContent = String(Math.round(target * eased));
      if (t < 1) window.requestAnimationFrame(frame);
    }
    window.requestAnimationFrame(frame);
  }
  if (counters.length && "IntersectionObserver" in window) {
    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { runCounter(entry.target); cio.unobserve(entry.target); }
      });
    }, { threshold: 0.5 });
    counters.forEach(function (c) { cio.observe(c); });
  } else {
    counters.forEach(function (c) { c.textContent = c.getAttribute("data-count"); });
  }

  /* ---------- Rotating words ---------- */
  $$(".rotator").forEach(function (rot) {
    var words = $$("span", rot);
    if (words.length < 2) return;
    var i = 0;
    words[0].classList.add("is-active");
    if (reduceMotion) return;
    setInterval(function () {
      var current = words[i];
      i = (i + 1) % words.length;
      var next = words[i];
      current.classList.remove("is-active");
      current.classList.add("is-leaving");
      next.classList.remove("is-leaving");
      next.classList.add("is-active");
      setTimeout(function () { current.classList.remove("is-leaving"); }, 700);
    }, 2600);
  });

  /* ---------- Pointer glow on cards ---------- */
  if (!reduceMotion && window.matchMedia("(hover: hover)").matches) {
    document.addEventListener("pointermove", function (e) {
      var card = e.target.closest && e.target.closest(".card");
      if (!card) return;
      var r = card.getBoundingClientRect();
      card.style.setProperty("--mx", (e.clientX - r.left) + "px");
      card.style.setProperty("--my", (e.clientY - r.top) + "px");
    }, { passive: true });

    // Gentle parallax tilt on the hero portrait
    var portrait = $(".hero-portrait");
    if (portrait) {
      var hero = portrait.closest(".hero");
      hero.addEventListener("pointermove", function (e) {
        var r = hero.getBoundingClientRect();
        var x = (e.clientX - r.left) / r.width - 0.5;
        var y = (e.clientY - r.top) / r.height - 0.5;
        portrait.style.transform = "perspective(1200px) rotateY(" + (x * 8).toFixed(2) + "deg) rotateX(" + (-y * 8).toFixed(2) + "deg)";
      });
      hero.addEventListener("pointerleave", function () { portrait.style.transform = ""; });
      portrait.style.transition = "transform .6s cubic-bezier(.16,1,.3,1)";
    }
  }

  /* ---------- Word-by-word quote reveal tied to scroll ---------- */
  $$(".word-reveal").forEach(function (el) {
    var words = el.textContent.trim().split(/\s+/);
    el.innerHTML = words.map(function (w) { return '<span class="w">' + w + "</span>"; }).join(" ");
    var spans = $$(".w", el);
    if (reduceMotion) { spans.forEach(function (s) { s.classList.add("on"); }); return; }
    function update() {
      var r = el.getBoundingClientRect();
      var vh = window.innerHeight;
      // Fully lit by the time the quote's bottom edge reaches 80% of the viewport.
      var p = Math.min(1, Math.max(0, (vh * 0.95 - r.top) / (r.height + vh * 0.15)));
      var n = Math.round(p * spans.length);
      spans.forEach(function (s, idx) { s.classList.toggle("on", idx < n); });
    }
    window.addEventListener("scroll", update, { passive: true });
    update();
  });

  /* ---------- Timeline progress line ---------- */
  $$(".timeline").forEach(function (tl) {
    var bar = document.createElement("span");
    bar.className = "tl-progress";
    tl.appendChild(bar);
    function update() {
      var r = tl.getBoundingClientRect();
      var p = Math.min(1, Math.max(0, (window.innerHeight * 0.6 - r.top) / r.height));
      bar.style.height = (p * (r.height - 12)) + "px";
    }
    window.addEventListener("scroll", update, { passive: true });
    update();
  });

  /* ---------- Testimonials carousel ---------- */
  $$("[data-carousel]").forEach(function (root) {
    var track = $(".t-track", root);
    var slides = $$(".t-slide", root);
    var dotsWrap = $(".t-dots", root);
    if (!track || slides.length < 2) return;
    var index = 0;
    var timer = null;
    var dots = slides.map(function (_, i) {
      var b = document.createElement("button");
      b.type = "button";
      b.setAttribute("aria-label", "Show testimonial " + (i + 1));
      b.addEventListener("click", function () { go(i); restart(); });
      dotsWrap.appendChild(b);
      return b;
    });
    function go(i) {
      index = (i + slides.length) % slides.length;
      track.style.transform = "translateX(" + (-100 * index) + "%)";
      slides.forEach(function (s, k) { s.setAttribute("aria-hidden", String(k !== index)); });
      dots.forEach(function (d, k) { d.setAttribute("aria-current", String(k === index)); });
    }
    function restart() {
      if (reduceMotion) return;
      clearInterval(timer);
      timer = setInterval(function () { go(index + 1); }, 7000);
    }
    var prev = $("[data-prev]", root), next = $("[data-next]", root);
    if (prev) prev.addEventListener("click", function () { go(index - 1); restart(); });
    if (next) next.addEventListener("click", function () { go(index + 1); restart(); });
    root.addEventListener("pointerenter", function () { clearInterval(timer); });
    root.addEventListener("pointerleave", restart);
    root.addEventListener("focusin", function () { clearInterval(timer); });
    root.addEventListener("focusout", function (e) { if (!root.contains(e.relatedTarget)) restart(); });
    // Swipe support
    var startX = null;
    track.addEventListener("touchstart", function (e) { startX = e.touches[0].clientX; }, { passive: true });
    track.addEventListener("touchend", function (e) {
      if (startX === null) return;
      var dx = e.changedTouches[0].clientX - startX;
      if (Math.abs(dx) > 40) { go(index + (dx < 0 ? 1 : -1)); restart(); }
      startX = null;
    });
    go(0);
    restart();
  });

  /* ---------- Filters + search (news, legal blog, journal) ---------- */
  var newsRoot = $("[data-news]");
  if (newsRoot) {
    var cards = $$("[data-cat]", newsRoot);
    // Match typed text regardless of curly quotes and hyphens; data-q adds a post's section headings.
    var norm = function (s) { return String(s).toLowerCase().replace(/[\u2018\u2019\u02bc]/g, "'").replace(/[\u2010-\u2015-]/g, " ").replace(/\s+/g, " ").trim(); };
    cards.forEach(function (c) { c._q = norm(c.textContent + " " + (c.getAttribute("data-q") || "")); });
    var chips = $$(".chip", newsRoot);
    var search = $(".search-field input", newsRoot);
    var empty = $(".news-empty", newsRoot);
    var countEl = $("[data-news-count]", newsRoot);
    var one = countEl && countEl.getAttribute("data-one") || "story";
    var many = countEl && countEl.getAttribute("data-many") || "stories";
    var fallback = newsRoot.getAttribute("data-default") || "all";
    var active = fallback;
    var params = new URLSearchParams(window.location.search);
    // Ignore unknown topics (typos, old links) instead of showing an empty list.
    var t = params.get("topic");
    if (t && chips.some(function (c) { return c.getAttribute("data-filter") === t; })) active = t;
    // Long lists start collapsed to data-limit items until the visitor filters, searches or asks for all.
    var limit = parseInt(newsRoot.getAttribute("data-limit"), 10) || Infinity;
    var expanded = false;
    var more = $("[data-news-more]", newsRoot);

    function apply() {
      var q = norm(search && search.value || "");
      var cap = (!expanded && active === fallback && !q) ? limit : Infinity;
      var shown = 0;
      cards.forEach(function (card) {
        var matchCat = active === "all" || card.getAttribute("data-cat") === active;
        var matchQ = !q || card._q.indexOf(q) !== -1;
        var match = matchCat && matchQ;
        card.classList.toggle("is-hidden", !(match && shown < cap));
        if (match) shown++;
      });
      chips.forEach(function (c) { c.setAttribute("aria-pressed", String(c.getAttribute("data-filter") === active)); });
      if (empty) empty.classList.toggle("is-visible", shown === 0);
      if (countEl) countEl.textContent = shown + " " + (shown === 1 ? one : many);
      if (more) { more.hidden = !(cap !== Infinity && shown > cap); more.textContent = "Show all " + shown + " " + many; }
    }
    // On phones the chip row scrolls sideways; keep the selected chip in view.
    var showChip = function () {
      var on = chips.filter(function (c) { return c.getAttribute("aria-pressed") === "true"; })[0];
      if (!on) return;
      var row = on.parentNode;
      if (row.scrollWidth > row.clientWidth) row.scrollLeft += on.getBoundingClientRect().left - row.getBoundingClientRect().left - 16;
    };
    if (more) more.addEventListener("click", function () { expanded = true; apply(); });
    var resetBtn = $("[data-news-reset]", newsRoot);
    if (resetBtn) resetBtn.addEventListener("click", function () {
      active = fallback;
      if (search) search.value = "";
      var url = new URL(window.location.href);
      url.searchParams.delete("topic");
      window.history.replaceState(null, "", url);
      apply();
    });
    chips.forEach(function (chip) {
      chip.addEventListener("click", function () {
        active = chip.getAttribute("data-filter");
        var url = new URL(window.location.href);
        if (active === fallback) url.searchParams.delete("topic"); else url.searchParams.set("topic", active);
        window.history.replaceState(null, "", url);
        apply();
        showChip();
      });
    });
    if (search) search.addEventListener("input", apply);
    apply();
    showChip();
    // A link like news/?topic=… should land on the filtered list, not the top of the page.
    if (active !== fallback && !window.location.hash) {
      var bar = $(".news-toolbar", newsRoot);
      if (bar) { bar.classList.remove("reveal"); bar.scrollIntoView(); }
    }
  }

  /* ---------- Video facades: load YouTube only when the visitor asks for it ---------- */
  $$("[data-yt]").forEach(function (fig) {
    var link = $(".video-facade", fig);
    if (!link) return;
    link.addEventListener("click", function (e) {
      e.preventDefault();
      var id = fig.getAttribute("data-yt");
      var title = ($(".video-title", fig) || {}).textContent || "Video";
      var frame = document.createElement("iframe");
      frame.src = "https://www.youtube-nocookie.com/embed/" + encodeURIComponent(id) + "?autoplay=1&rel=0";
      frame.title = title;
      frame.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
      frame.allowFullscreen = true;
      link.replaceWith(frame);
      frame.focus();
    });
  });

  /* ---------- Contact form: Formspree-style endpoint if configured, else mailto ---------- */
  $$("form[data-contact]").forEach(function (form) {
    var status = $(".form-status", form);
    function show(msg, ok) {
      if (!status) return;
      status.textContent = msg;
      status.className = "form-status is-visible " + (ok ? "ok" : "err");
    }
    var clearInvalid = function (e) {
      if (e.target.validity && e.target.validity.valid) e.target.removeAttribute("aria-invalid");
      if (status && status.classList.contains("err") && form.checkValidity()) status.className = "form-status";
    };
    form.addEventListener("input", clearInvalid);
    form.addEventListener("change", clearInvalid);
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.classList.add("was-validated");
        $$(":invalid", form).forEach(function (el) { el.setAttribute("aria-invalid", "true"); });
        show("Please complete the highlighted fields.", false);
        form.reportValidity();
        return;
      }
      var data = new FormData(form);
      if (data.get("_gotcha")) return; // honeypot
      var endpoint = form.getAttribute("data-endpoint");
      if (endpoint) {
        var btn = $("button[type=submit]", form);
        if (btn) btn.disabled = true;
        fetch(endpoint, { method: "POST", body: data, headers: { Accept: "application/json" } })
          .then(function (r) {
            if (!r.ok) throw new Error("Request failed");
            form.reset();
            show("Thank you — your message is on its way. We'll be in touch shortly.", true);
          })
          .catch(function () { show("Sorry, something went wrong. Please email or call the office directly.", false); })
          .then(function () { if (btn) btn.disabled = false; });
        return;
      }
      var to = form.getAttribute("data-mailto");
      var subject = (data.get("topic") || "Website inquiry") + " — " + (data.get("name") || "");
      var lines = [];
      ["name", "email", "phone", "topic", "message"].forEach(function (k) {
        if (data.get(k)) lines.push(k.charAt(0).toUpperCase() + k.slice(1) + ": " + data.get(k));
      });
      window.location.href = "mailto:" + to + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(lines.join("\n\n"));
      show("Your email app should open with your message ready to send. If it doesn't, email " + to + " directly.", true);
    });
  });

  /* ---------- Newsletter (footer) ---------- */
  $$("form[data-newsletter]").forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var email = $("input[type=email]", form);
      if (!email || !email.value) return;
      var to = form.getAttribute("data-mailto");
      window.location.href = "mailto:" + to + "?subject=" + encodeURIComponent("Please email me when new posts are published") + "&body=" + encodeURIComponent("Please add this address to your new-post emails: " + email.value);
      // Nothing is sent until the visitor presses Send in their email app, so say so.
      var status = $(".nl-status", form);
      if (status) status.textContent = "Your email app should open with the request ready. Press Send to finish, or email " + to + " directly.";
    });
  });

  /* ---------- Table of contents highlighting ---------- */
  var tocLinks = $$(".toc a");
  if (tocLinks.length && "IntersectionObserver" in window) {
    var map = {};
    tocLinks.forEach(function (a) { map[a.getAttribute("href").slice(1)] = a; });
    var tio = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          tocLinks.forEach(function (a) { a.classList.remove("is-active"); });
          var link = map[entry.target.id];
          if (link) link.classList.add("is-active");
        }
      });
    }, { rootMargin: "-30% 0px -60% 0px" });
    Object.keys(map).forEach(function (id) { var el = document.getElementById(id); if (el) tio.observe(el); });
  }

  /* ---------- Copy-to-clipboard buttons (media kit) ---------- */
  $$("[data-copy]").forEach(function (btn) {
    var original = btn.innerHTML, timer;
    var live = document.createElement("span");
    live.className = "sr-only";
    live.setAttribute("aria-live", "polite");
    btn.after(live);
    btn.addEventListener("click", function () {
      var target = $(btn.getAttribute("data-copy"));
      if (!target) return;
      var text = target.innerText.trim();
      var done = function () {
        clearTimeout(timer);
        btn.textContent = "Copied ✦";
        live.textContent = "Copied to clipboard";
        timer = setTimeout(function () { btn.innerHTML = original; live.textContent = ""; }, 2000);
      };
      // If the clipboard is blocked, select the bio so the visitor can copy it themselves.
      var manual = function () {
        var r = document.createRange();
        r.selectNodeContents(target);
        var sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(r);
        clearTimeout(timer);
        btn.textContent = "Press Ctrl/⌘+C";
        live.textContent = "Bio selected. Press Control or Command plus C to copy.";
        timer = setTimeout(function () { btn.innerHTML = original; live.textContent = ""; }, 4000);
      };
      if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(text).then(done, manual);
      else {
        var ta = document.createElement("textarea");
        ta.value = text; ta.style.position = "fixed"; ta.style.opacity = "0";
        document.body.appendChild(ta); ta.select();
        try { if (document.execCommand("copy")) done(); else manual(); } catch (e) { manual(); }
        document.body.removeChild(ta);
      }
    });
  });

  /* ---------- Print buttons (checklists & worksheets) ---------- */
  $$("[data-print]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var section = btn.closest("[data-printable]");
      if (section) section.classList.add("print-this");
      document.body.classList.add("printing-section");
      window.addEventListener("afterprint", function () {
        document.body.classList.remove("printing-section");
        if (section) section.classList.remove("print-this");
      }, { once: true });
      window.print();
    });
  });

  /* ---------- Footer year ---------- */
  $$("[data-year]").forEach(function (el) { el.textContent = String(new Date().getFullYear()); });

  doc.classList.add("is-ready");
})();
