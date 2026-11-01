/* =========================================================================
   assets/ripples.js — a very soft background animation for the Home page:
   two slow wave sources whose ripples interfere. Deliberately faint.
   Pauses when off-screen, and shows a still frame if the visitor prefers
   reduced motion.

   To make it even calmer: lower  ALPHA  or  SPEED.
   To remove it: delete the  <script src="assets/ripples.js">  line in index.html
   ========================================================================= */
(function () {
  'use strict';
  var cv = document.getElementById('ripples');
  if (!cv) return;
  var ctx = cv.getContext('2d');
  var root = document.documentElement;
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;

  var CELL = 5;          // bigger = softer & cheaper
  var SPEED = 0.0011;    // wave speed (radians per millisecond)
  var K = 0.36;          // wave number (smaller = longer wavelength)
  var ALPHA = 158;        // peak opacity, 0–255
  var w = 1, h = 1, raf = 0, running = false, visible = true, last = 0;

  function isDark() {
    return root.dataset.theme ? root.dataset.theme === 'dark' : (window.matchMedia && matchMedia('(prefers-color-scheme: dark)').matches);
  }

  function size() {
    w = cv.width = Math.max(1, Math.round(cv.offsetWidth / CELL));
    h = cv.height = Math.max(1, Math.round(cv.offsetHeight / CELL));
  }

  function paint(ms) {
    var img = ctx.createImageData(w, h), d = img.data, t = ms * SPEED;
    var col = isDark() ? [255, 122, 82] : [228, 87, 46];
    var ax = w * 0.22, ay = h * 0.62, bx = w * 0.80, by = h * 0.40;
    for (var y = 0; y < h; y++) {
      for (var x = 0; x < w; x++) {
        var r1 = Math.hypot(x - ax, y - ay), r2 = Math.hypot(x - bx, y - by);
        var v = (Math.sin(r1 * K - t) / Math.sqrt(1 + r1 * 0.05) + Math.sin(r2 * K - t) / Math.sqrt(1 + r2 * 0.05)) / 1.5;
        var a = Math.max(0, v); a = a * a * ALPHA;
        var i = (y * w + x) * 4;
        d[i] = col[0]; d[i + 1] = col[1]; d[i + 2] = col[2]; d[i + 3] = a;
      }
    }
    ctx.putImageData(img, 0, 0);
  }

  function loop(now) {
    if (!running) return;
    raf = requestAnimationFrame(loop);
    if (now - last < 40) return;          // ~25 fps is plenty for something this slow
    last = now; paint(now);
  }
  function start() { if (running || reduce) return; running = true; raf = requestAnimationFrame(loop); }
  function stop() { running = false; cancelAnimationFrame(raf); }
  function sync() { (visible && !document.hidden) ? start() : stop(); }

  size(); paint(reduce ? 4000 : 0);
  if ('ResizeObserver' in window) {
    var tm; new ResizeObserver(function () { clearTimeout(tm); tm = setTimeout(function () { size(); paint(reduce ? 4000 : performance.now()); }, 120); }).observe(cv);
  } else window.addEventListener('resize', function () { size(); paint(performance.now()); });
  if ('IntersectionObserver' in window) new IntersectionObserver(function (es) { visible = es[0].isIntersecting; sync(); }).observe(cv);
  document.addEventListener('visibilitychange', sync);
  sync();
})();
