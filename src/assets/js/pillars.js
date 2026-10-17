/* Life Pillars check-in: rate each of Francine's ten Life Pillars, see a live radar chart,
   and set three value-based actions. Answers stay in this browser only (localStorage).
   Works with any number of sliders: the chart reads its axes from the markup. */
(function () {
  "use strict";
  var root = document.querySelector("[data-pillars]");
  if (!root) return;
  // The value fields and Reset button sit outside the slider grid, so look in the whole section.
  var scope = root.closest("section") || document;
  var KEY = "fw-life-pillars-v2"; // v2: ten pillars, saved by pillar name
  var OLD_KEY = "fw-life-pillars-v1"; // v1: nine pillars, saved by position
  var inputs = Array.prototype.slice.call(root.querySelectorAll("input[type=range]"));
  var texts = Array.prototype.slice.call(scope.querySelectorAll("[data-pillars-text]"));
  var svg = root.querySelector("svg.radar");
  var avgEl = root.querySelector("[data-avg]");
  var lowEl = root.querySelector("[data-low]");
  var n = inputs.length;
  if (!n || !svg) return;

  // Geometry (SVG user units, centred on 0,0). The chart is rotated so the axes nearest
  // horizontal carry shorter labels, which keeps the labels large on a phone.
  var R = 110, LABEL_R = R + 16, FONT = 14, LINE = 15;
  var START = n === 10 ? -Math.PI * 0.7 : -Math.PI / 2;

  function band(v) { return v <= 3 ? "running on fumes" : v <= 7 ? "adequate" : "supported"; }
  function label(inp) { return inp.getAttribute("data-label") || inp.name; }
  function escText(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;"); }

  function load() {
    var saved = null, old = false;
    try {
      saved = JSON.parse(window.localStorage.getItem(KEY) || "null");
      if (!saved) { saved = JSON.parse(window.localStorage.getItem(OLD_KEY) || "null"); old = !!saved; }
    } catch (e) { saved = null; }
    if (!saved) return;
    // v1 ratings were stored by position for a different pillar list, so only its notes carry over.
    if (!old) inputs.forEach(function (inp) { if (saved.r && saved.r[inp.name] != null) inp.value = saved.r[inp.name]; });
    texts.forEach(function (t) { if (saved.t && saved.t[t.name] != null) t.value = saved.t[t.name]; });
    if (old) { save(); try { window.localStorage.removeItem(OLD_KEY); } catch (e) { /* ignore */ } }
  }
  function save() {
    var data = { r: {}, t: {} };
    inputs.forEach(function (inp) { data.r[inp.name] = +inp.value; });
    texts.forEach(function (t) { data.t[t.name] = t.value; });
    try { window.localStorage.setItem(KEY, JSON.stringify(data)); } catch (e) { /* storage unavailable */ }
  }
  function point(i, v) {
    var a = START + (Math.PI * 2 * i) / n;
    var d = (v / 10) * R;
    return [d * Math.cos(a), d * Math.sin(a)];
  }
  function f(x) { return x.toFixed(1); }

  // Static parts: rings, spokes and labels. Labels with "&" wrap onto two lines.
  var frame = "";
  [2, 4, 6, 8, 10].forEach(function (lvl) {
    var pts = [];
    for (var i = 0; i < n; i++) pts.push(point(i, lvl).map(f).join(","));
    frame += '<polygon points="' + pts.join(" ") + '" fill="none" stroke="rgba(21,18,42,' + (lvl === 10 ? ".2" : ".1") + ')" />';
  });
  inputs.forEach(function (inp, i) {
    var p = point(i, 10);
    frame += '<line x1="0" y1="0" x2="' + f(p[0]) + '" y2="' + f(p[1]) + '" stroke="rgba(21,18,42,.1)" />';
  });
  inputs.forEach(function (inp, i) {
    var a = START + (Math.PI * 2 * i) / n;
    var x = LABEL_R * Math.cos(a), y = LABEL_R * Math.sin(a);
    var parts = label(inp).replace(/ & /, " &\n").split("\n");
    var anchor = Math.abs(x) < 10 ? "middle" : x > 0 ? "start" : "end";
    var s = Math.sin(a);
    // Above the chart: last line sits on the label point. Below: first line hangs from it. Sides: centred.
    var y0 = s < -0.5 ? y - (parts.length - 1) * LINE - 2 : s > 0.5 ? y + FONT - 2 : y + FONT * 0.35 - ((parts.length - 1) * LINE) / 2;
    frame += '<text x="' + f(x) + '" y="' + f(y0) + '" text-anchor="' + anchor + '" font-size="' + FONT + '" font-weight="700" fill="#4a4566">' +
      parts.map(function (t, k) { return '<tspan x="' + f(x) + '"' + (k ? ' dy="' + LINE + '"' : "") + ">" + escText(t) + "</tspan>"; }).join("") + "</text>";
  });

  function draw() {
    var pts = inputs.map(function (inp, i) { return point(i, +inp.value).map(f).join(","); });
    var dots = inputs.map(function (inp, i) { var p = point(i, +inp.value); return '<circle cx="' + f(p[0]) + '" cy="' + f(p[1]) + '" r="4" fill="#ee6a4d" />'; }).join("");
    svg.innerHTML = '<defs><linearGradient id="rg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f3d98c" stop-opacity=".75"/><stop offset="1" stop-color="#ee6a4d" stop-opacity=".55"/></linearGradient></defs>' +
      frame + '<polygon class="radar-shape" points="' + pts.join(" ") + '" fill="url(#rg)" stroke="#ee6a4d" stroke-width="2" stroke-linejoin="round" />' + dots;

    var sum = 0, low = inputs[0], desc = [];
    inputs.forEach(function (inp) {
      var v = +inp.value;
      sum += v;
      if (v < +low.value) low = inp;
      inp.setAttribute("aria-valuetext", v + " — " + band(v));
      var out = scope.querySelector('output[for="' + inp.id + '"]');
      if (out) out.textContent = v;
      desc.push(label(inp) + " " + v);
    });
    if (avgEl) avgEl.textContent = (sum / n).toFixed(1);
    if (lowEl) lowEl.textContent = label(low);
    svg.setAttribute("aria-label", "Radar chart of your Life Pillar ratings out of 10: " + desc.join(", "));
  }

  // Fit the viewBox to the drawn chart and labels (label widths depend on the loaded font).
  function fit() {
    try {
      var b = svg.getBBox();
      if (!b.width) return;
      var pad = 6;
      svg.setAttribute("viewBox", [b.x - pad, b.y - pad, b.width + pad * 2, b.height + pad * 2].map(f).join(" "));
    } catch (e) { /* not rendered yet: keep the viewBox from the markup */ }
  }

  load();
  draw();
  fit();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(fit);
  inputs.forEach(function (inp) { inp.addEventListener("input", function () { draw(); save(); }); });
  texts.forEach(function (t) { t.addEventListener("input", save); });
  var reset = scope.querySelector("[data-reset]");
  if (reset) reset.addEventListener("click", function () {
    if (!window.confirm("Clear your ratings and answers?")) return;
    inputs.forEach(function (inp) { inp.value = 5; });
    texts.forEach(function (t) { t.value = ""; });
    try { window.localStorage.removeItem(KEY); } catch (e) { /* ignore */ }
    draw();
  });
})();
