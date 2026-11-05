/**
 * Small math, colour and drawing helpers shared by every module.
 */

const rnd = (a, b) => a + Math.random() * (b - a),
  lerp = (a, b, t) => a + (b - a) * t,
  cl = (v, a, b) => Math.max(a, Math.min(b, v));

const hex = (h) => [1, 3, 5].map((i) => parseInt(h.substr(i, 2), 16)),
  mixA = (A, B, u) => A.map((v, i) => v + (B[i] - v) * u),
  rgb = (A) => 'rgb(' + A.map(Math.round).join() + ')';

const hs = (n) => {
  n = Math.sin(n * 127.1) * 43758.5;
  return n - Math.floor(n);
};

const R = (c, x, y, w, h) => {
  g.fillStyle = c;
  g.fillRect(Math.round(x), Math.round(y), w, h);
};

const esc = (s) =>
  String(s).replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' })[c]);

const GC = {};

function glow(x, y, r, c) {
  const m = /rgba\((\d+),(\d+),(\d+),([\d.]+)\)/.exec(c);
  if (!m) return;
  const a = +m[4];
  if (a < 0.003) return;
  const k = r + ',' + m[1] + ',' + m[2] + ',' + m[3];
  let s = GC[k];
  if (!s) {
    s = mkc(r * 2, r * 2);
    const x2 = s.getContext('2d'),
      q = x2.createRadialGradient(r, r, 0, r, r, r),
      b = 'rgba(' + m[1] + ',' + m[2] + ',' + m[3] + ',';
    q.addColorStop(0, b + '1)');
    q.addColorStop(1, b + '0)');
    x2.fillStyle = q;
    x2.fillRect(0, 0, r * 2, r * 2);
    GC[k] = s;
  }
  const pa = g.globalAlpha;
  g.globalAlpha = pa * Math.min(1, a);
  g.drawImage(s, Math.round(x - r), Math.round(y - r));
  g.globalAlpha = pa;
}
