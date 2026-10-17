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

  /* ---------- Mobile navigation ---------- */
  var toggle = $(".nav-toggle");
  if (toggle) {
    var closeNav = function () {
      document.body.classList.remove("nav-open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Open menu");
    };
    toggle.addEventListener("click", function () {
      var open = document.body.classList.toggle("nav-open");
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      if (open && header) header.classList.remove("is-hidden");
    });
    $$(".nav a").forEach(function (a) { a.addEventListener("click", closeNav); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeNav(); });
    window.addEventListener("resize", function () { if (window.innerWidth > 1120) closeNav(); });
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
      var p = Math.min(1, Math.max(0, (vh * 0.85 - r.top) / (r.height + vh * 0.35)));
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

  /* ---------- News filters + search ---------- */
  var newsRoot = $("[data-news]");
  if (newsRoot) {
    var cards = $$(".news-card", newsRoot);
    var chips = $$(".chip", newsRoot);
    var search = $(".search-field input", newsRoot);
    var empty = $(".news-empty", newsRoot);
    var countEl = $("[data-news-count]", newsRoot);
    var active = "all";
    var params = new URLSearchParams(window.location.search);
    if (params.get("topic")) active = params.get("topic");

    function apply() {
      var q = (search && search.value || "").trim().toLowerCase();
      var shown = 0;
      cards.forEach(function (card) {
        var matchCat = active === "all" || card.getAttribute("data-cat") === active;
        var matchQ = !q || card.textContent.toLowerCase().indexOf(q) !== -1;
        var show = matchCat && matchQ;
        card.classList.toggle("is-hidden", !show);
        if (show) shown++;
      });
      chips.forEach(function (c) { c.setAttribute("aria-pressed", String(c.getAttribute("data-filter") === active)); });
      if (empty) empty.classList.toggle("is-visible", shown === 0);
      if (countEl) countEl.textContent = shown + (shown === 1 ? " story" : " stories");
    }
    chips.forEach(function (chip) {
      chip.addEventListener("click", function () {
        active = chip.getAttribute("data-filter");
        var url = new URL(window.location.href);
        if (active === "all") url.searchParams.delete("topic"); else url.searchParams.set("topic", active);
        window.history.replaceState(null, "", url);
        apply();
      });
    });
    if (search) search.addEventListener("input", apply);
    apply();
  }

  /* ---------- Contact form: Formspree-style endpoint if configured, else mailto ---------- */
  $$("form[data-contact]").forEach(function (form) {
    var status = $(".form-status", form);
    function show(msg, ok) {
      if (!status) return;
      status.textContent = msg;
      status.className = "form-status is-visible " + (ok ? "ok" : "err");
    }
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.reportValidity()) return;
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
      window.location.href = "mailto:" + to + "?subject=" + encodeURIComponent("Please add me to the Esteemable Acts newsletter") + "&body=" + encodeURIComponent("Please subscribe: " + email.value);
      email.value = "";
      var btn = $("button", form);
      if (btn) { btn.textContent = "Thank you ✦"; setTimeout(function () { btn.textContent = "Subscribe"; }, 4000); }
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
    btn.addEventListener("click", function () {
      var target = $(btn.getAttribute("data-copy"));
      if (!target) return;
      var text = target.innerText.trim();
      var done = function () {
        var original = btn.innerHTML;
        btn.textContent = "Copied ✦";
        setTimeout(function () { btn.innerHTML = original; }, 2000);
      };
      if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(text).then(done, function () {});
      else {
        var ta = document.createElement("textarea");
        ta.value = text; ta.style.position = "fixed"; ta.style.opacity = "0";
        document.body.appendChild(ta); ta.select();
        try { document.execCommand("copy"); done(); } catch (e) { /* ignore */ }
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
      window.print();
      setTimeout(function () {
        document.body.classList.remove("printing-section");
        if (section) section.classList.remove("print-this");
      }, 500);
    });
  });

  /* ---------- Footer year ---------- */
  $$("[data-year]").forEach(function (el) { el.textContent = String(new Date().getFullYear()); });

  doc.classList.add("is-ready");
})();
