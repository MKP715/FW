/* Life Pillars check-in: rate each pillar, see a live radar chart, set three value-based actions.
   Answers stay in this browser only (localStorage). */
(function () {
  "use strict";
  var root = document.querySelector("[data-pillars]");
  if (!root) return;
  var KEY = "fw-life-pillars-v1";
  var inputs = Array.prototype.slice.call(root.querySelectorAll("input[type=range]"));
  var texts = Array.prototype.slice.call(root.querySelectorAll("[data-pillars-text]"));
  var svg = root.querySelector("svg.radar");
  var avgEl = root.querySelector("[data-avg]");
  var lowEl = root.querySelector("[data-low]");
  var n = inputs.length;
  var cx = 160, cy = 160, R = 120;

  function load() {
    try {
      var saved = JSON.parse(window.localStorage.getItem(KEY) || "null");
      if (!saved) return;
      inputs.forEach(function (inp) { if (saved.r && saved.r[inp.name] != null) inp.value = saved.r[inp.name]; });
      texts.forEach(function (t) { if (saved.t && saved.t[t.name] != null) t.value = saved.t[t.name]; });
    } catch (e) { /* storage unavailable */ }
  }
  function save() {
    var data = { r: {}, t: {} };
    inputs.forEach(function (inp) { data.r[inp.name] = +inp.value; });
    texts.forEach(function (t) { data.t[t.name] = t.value; });
    try { window.localStorage.setItem(KEY, JSON.stringify(data)); } catch (e) { /* ignore */ }
  }
  function point(i, v) {
    var a = (Math.PI * 2 * i) / n - Math.PI / 2;
    var r = (v / 10) * R;
    return [cx + r * Math.cos(a), cy + r * Math.sin(a)];
  }
  function draw() {
    var grid = "";
    [2, 4, 6, 8, 10].forEach(function (lvl) {
      var pts = [];
      for (var i = 0; i < n; i++) pts.push(point(i, lvl).map(function (x) { return x.toFixed(1); }).join(","));
      grid += '<polygon points="' + pts.join(" ") + '" fill="none" stroke="rgba(21,18,42,.12)" />';
    });
    var axes = "", labels = "";
    inputs.forEach(function (inp, i) {
      var p = point(i, 10);
      axes += '<line x1="' + cx + '" y1="' + cy + '" x2="' + p[0].toFixed(1) + '" y2="' + p[1].toFixed(1) + '" stroke="rgba(21,18,42,.12)" />';
      var l = point(i, 12.2);
      var anchor = Math.abs(l[0] - cx) < 8 ? "middle" : l[0] > cx ? "start" : "end";
      labels += '<text x="' + l[0].toFixed(1) + '" y="' + (l[1] + 4).toFixed(1) + '" text-anchor="' + anchor + '" font-size="11" font-weight="700" fill="#4a4566" font-family="Manrope, sans-serif">' + inp.getAttribute("data-label") + "</text>";
    });
    var pts = inputs.map(function (inp, i) { return point(i, +inp.value).map(function (x) { return x.toFixed(1); }).join(","); });
    var dots = inputs.map(function (inp, i) { var p = point(i, +inp.value); return '<circle cx="' + p[0].toFixed(1) + '" cy="' + p[1].toFixed(1) + '" r="4" fill="#ee6a4d" />'; }).join("");
    svg.innerHTML = '<defs><linearGradient id="rg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f3d98c" stop-opacity=".75"/><stop offset="1" stop-color="#ee6a4d" stop-opacity=".55"/></linearGradient></defs>' +
      grid + axes + '<polygon class="radar-shape" points="' + pts.join(" ") + '" fill="url(#rg)" stroke="#ee6a4d" stroke-width="2" stroke-linejoin="round" />' + dots + labels;

    var sum = 0, low = inputs[0];
    inputs.forEach(function (inp) {
      sum += +inp.value;
      if (+inp.value < +low.value) low = inp;
      var out = root.querySelector('output[for="' + inp.id + '"]');
      if (out) out.textContent = inp.value;
    });
    if (avgEl) avgEl.textContent = (sum / n).toFixed(1);
    if (lowEl) lowEl.textContent = low.getAttribute("data-label");
  }

  load();
  draw();
  inputs.forEach(function (inp) { inp.addEventListener("input", function () { draw(); save(); }); });
  texts.forEach(function (t) { t.addEventListener("input", save); });
  var reset = root.querySelector("[data-reset]");
  if (reset) reset.addEventListener("click", function () {
    inputs.forEach(function (inp) { inp.value = 5; });
    texts.forEach(function (t) { t.value = ""; });
    try { window.localStorage.removeItem(KEY); } catch (e) { /* ignore */ }
    draw();
  });
})();
