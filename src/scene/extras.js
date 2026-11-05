/**
 * Carriage life: the letter pinned on the wall, seasonal furniture,
 * Mướp the cat, and the flickering dark when the train enters a tunnel.
 */

/* ───────────────────────── Letter on the wall ───────────────────────── */

/** Fragment name -> write progress (0..1); a freshly earned line writes itself. */
const LW = {};
const LB = { x: 284, y: 46, w: 30, h: 46 };

function inkLine(x0, y0, len, sd, p, col) {
  const n = Math.floor(len * p);
  for (let i = 0; i < n; i++)
    if (i % 6 != 5) R(col, x0 + i, y0 + (hs(i * 3 + sd) > 0.72 ? 1 : 0), 1, 1);
  return n;
}

function letterDraw() {
  const { x, y, w, h } = LB,
    ink = '#4a2e1a',
    fk = Object.keys(S.frag),
    all = fk.length >= 6,
    writing = Object.keys(LW).length > 0;
  R('rgba(20,10,4,.45)', x + 2, y + 2, w, h);
  R('#f0e4c8', x, y, w, h);
  R('#fbf2dc', x, y, w, 1);
  R('#d8c8a4', x, y + h - 1, w, 1);
  R('#d8c8a4', x + w - 1, y, 1, h);
  R('#c8402a', x + (w >> 1) - 1, y - 2, 3, 3);
  inkLine(x + 3, y + 4, 18, 1, 1, ink);
  R(ink, x + 22, y + 5, 1, 1);
  for (let i = 0; i < 6; i++) {
    const y0 = y + 9 + i * 5;
    if (i < fk.length) {
      const nm = fk[i],
        p = LW[nm] ?? 1,
        len = 12 + ((hs(nm.length * 5 + i) * 12) | 0),
        n = inkLine(x + 3, y0, len, i * 11, p, ink);
      if (p < 1) {
        R('#3a2210', x + 3 + n, y0 - 2, 1, 3);
        if (Math.sin(T * 20) > 0) R('#ffe9a0', x + 3 + n, y0 - 3, 1, 1);
      }
    } else {
      g.globalAlpha = 0.28;
      for (let k = 0; k < 18; k += 3) R(ink, x + 3 + k, y0, 1, 1);
      g.globalAlpha = 1;
    }
  }
  if (S.fin) inkLine(x + 14, y + 40, 12, 7, 1, ink);
  if (((S.wsee | 0) & 15) == 15) inkLine(x + 3, y + 43, 10, 9, 1, '#3a5a8a');
  const a = writing ? 0.22 : all && !S.fin ? 0.12 + 0.08 * Math.sin(T * 3) : 0;
  if (a > 0) {
    g.globalCompositeOperation = 'lighter';
    glow(x + w / 2, y + h / 2, 34, 'rgba(255,200,110,' + a.toFixed(3) + ')');
    g.globalCompositeOperation = 'source-over';
  }
}

/* ───────────────────────── Seasonal furniture ───────────────────────── */

/** Cushion on the seat, drawn before the passenger. */
function furnSeat() {
  const s = sea(),
    x = 212,
    y = 130,
    B = ['#e89ab0', '#e8c040', '#c8502a', '#a8302a'][s],
    D = ['#c87890', '#c09a20', '#9a3a1a', '#2a1214'][s];
  R(D, x, y + 1, 14, 11);
  R(B, x, y, 14, 10);
  if (s == 0) {
    R('#fff0f4', x + 3, y + 3, 2, 2);
    R('#fff0f4', x + 8, y + 5, 2, 2);
    R('#fff0f4', x + 5, y + 7, 1, 1);
  } else if (s == 1) {
    R('#fff2a0', x + 2, y + 2, 10, 1);
    R('#fff2a0', x + 2, y + 7, 10, 1);
    R('#58b868', x + 6, y + 3, 2, 4);
  } else if (s == 2) {
    for (let i = 0; i < 3; i++) R('#e8b040', x + 2 + i * 4, y + 2 + (i & 1) * 3, 2, 2);
  } else {
    for (let i = 0; i < 14; i += 4) R(D, x + i, y, 1, 10);
    for (let j = 0; j < 10; j += 4) R(D, x, y + j, 14, 1);
  }
  R('#f4e0a0', x - 1, y, 1, 2);
  R('#f4e0a0', x + 14, y, 1, 2);
}

/** Something small on the window sill, behind the curtains. */
function furnSill() {
  const s = sea(),
    x = 192,
    b = 111,
    sw = Math.round(Math.sin(T * 1.2) * 0.5);
  if (s == 0) {
    R('#6a98b8', x, b - 8, 7, 8);
    R('#9ac4dc', x, b - 8, 7, 1);
    R('#5a8aa8', x + 5, b - 7, 1, 7);
    R('#5a3a22', x + 3, b - 22, 1, 14);
    R('#5a3a22', x + 1, b - 17, 3, 1);
    R('#5a3a22', x + 4, b - 14, 3, 1);
    [
      [2, -24],
      [5, -22],
      [0, -19],
      [7, -17],
      [3, -15],
    ].forEach((o, i) => R(i % 2 ? '#fff0f4' : '#f4a8b8', x + o[0] + sw, b + o[1], 2, 2));
  } else if (s == 1) {
    R('#e0f4f8', x, b - 10, 7, 10);
    R('#f0d860', x + 1, b - 7, 5, 7);
    R('#fff6b0', x + 1, b - 7, 5, 1);
    R('#e84a4a', x + 5, b - 15, 1, 9);
    R('#e84a4a', x + 3, b - 15, 3, 1);
    R('#f4e060', x - 1, b - 11, 3, 3);
    if (Math.sin(T * 3) > 0.5) R('#ffffff', x + 2, b - 5, 1, 1);
    R('#3a8a3a', x + 13, b - 8, 3, 8);
    R('#3a8a3a', x + 11, b - 6, 2, 1);
    R('#3a8a3a', x + 16, b - 5, 2, 1);
    R('#b8683a', x + 12, b - 3, 5, 3);
  } else if (s == 2) {
    R('#b85a14', x, b - 8, 11, 8);
    R('#d8701e', x + 1, b - 9, 9, 8);
    R('#b85a14', x + 4, b - 9, 1, 8);
    R('#b85a14', x + 7, b - 9, 1, 8);
    R('#4a3a1a', x + 5, b - 11, 2, 2);
    R('#d8502a', x + 10, b - 11, 3, 2);
    R('#8a5a2a', x - 5, b - 3, 3, 3);
    R('#5a3a1a', x - 5, b - 3, 3, 1);
  } else {
    R('#d8e4ec', x + 1, b - 9, 7, 9);
    R('#f4ece0', x + 3, b - 7, 3, 7);
    R('#2a1a10', x + 4, b - 9, 1, 2);
    R('#ffe9a0', x + 4, b - 11, 1, 2);
    R('#ffb040', x + 3 + (Math.sin(T * 7) > 0.6 ? 1 : 0), b - 10, 2, 2);
    g.globalCompositeOperation = 'lighter';
    glow(x + 4, b - 9, 24, 'rgba(255,190,90,' + (0.22 + 0.06 * Math.sin(T * 9)).toFixed(2) + ')');
    g.globalCompositeOperation = 'source-over';
  }
}

/** Floor corner by the door. */
function furnFloor() {
  const s = sea();
  if (s == 0) {
    R('#9a6a2a', 30, 166, 14, 8);
    R('#b8863a', 30, 166, 14, 2);
    for (let i = 0; i < 14; i += 3) R('#7a4a1a', 30 + i, 168, 1, 6);
    [
      [31, 162, '#f4a8b8'],
      [34, 160, '#fff0f4'],
      [37, 163, '#ffe070'],
      [40, 161, '#c8a0f0'],
      [42, 164, '#f4a8b8'],
    ].forEach((f) => {
      R('#3a8a3a', f[0] + 1, f[1] + 2, 1, 5);
      R(f[2], f[0], f[1], 2, 2);
    });
  } else if (s == 1) {
    R('#3a3a3a', 32, 170, 10, 2);
    R('#5a5a5a', 36, 162, 2, 8);
    R('#8a8a8a', 33, 154, 8, 1);
    R('#8a8a8a', 33, 162, 8, 1);
    R('#8a8a8a', 33, 154, 1, 9);
    R('#8a8a8a', 40, 154, 1, 9);
    for (let k = 0; k < 3; k++) {
      const a = T * 18 + k * 2.09;
      R('#e0e0e0', 37 + Math.cos(a) * 3, 158 + Math.sin(a) * 3, 1, 1);
    }
    R('#c8402a', 37, 158, 1, 1);
  } else if (s == 2) {
    R('#a8321e', 28, 172, 20, 2);
    for (let i = 0; i < 34; i++) {
      const lx = 26 + ((hs(i * 3) * 24) | 0),
        ly = 172 - ((hs(i + 7) * Math.max(1, 6 - Math.abs(lx - 38) / 3)) | 0);
      R(['#c8502a', '#e8902a', '#a8321e', '#f0b040'][i & 3], lx, ly, 2, 1 + (i & 1));
    }
  } else {
    R('#8a2a2e', 24, 166, 32, 8);
    R('#c8402a', 24, 166, 32, 1);
    for (let i = 0; i < 8; i++) R('#f4e0a0', 25 + i * 4, 170, 2, 2);
    for (let i = 0; i < 32; i += 2) R('#e8dcc8', 24 + i, 174, 1, 2);
    R('#e8dcc8', 32, 163, 5, 3);
    R('#d0c0a8', 32, 165, 5, 1);
    R('#e8dcc8', 40, 163, 5, 3);
    R('#d0c0a8', 40, 165, 5, 1);
  }
}

/* ───────────────────────── Mướp the cat ───────────────────────── */

/** Zones: 0 = window sill, 1 = top of the seat, 2 = table. y is the sprite's top edge. */
const CZ = [
  { y: 104, a: 66, b: 178 },
  { y: 84, a: 214, b: 258 },
  { y: 128, a: 66, b: 196 },
];
const CAT = { x: 90, y: 104, z: 0, tz: 0, st: 'sit', t: 0, nt: 5, dir: -1, tx: 90, run: 0, j: null, yawn: 0, tap: 0, taps: 0, then: 0, sw: 0 };
const PTR = { x: 160, y: 90, t: 99 };
const HR = [];
const CMS = [
  'Mướp rừ rừ…',
  'Mướp dụi đầu vào tay bạn',
  'Mướp ngáp một cái thật dài',
  'Meo!',
  'Mướp nheo mắt, có vẻ rất hài lòng',
];

function catHere() {
  return (
    Object.keys(S.gifted).some((k) => k.startsWith('Chú mèo Mướp')) && !(pax && pax.d.k == 'cat')
  );
}

function catArrive() {
  const c = CAT;
  c.st = 'sit';
  c.run = 0;
  c.nt = rnd(4, 8);
  if (c.then == 'sleep') {
    c.then = 0;
    c.st = 'sleep';
    c.nt = rnd(14, 32);
  }
}

function catGo(z, x, run) {
  const c = CAT,
    Z = CZ[z];
  c.tz = z;
  c.tx = cl(x, Z.a, Z.b);
  if (z != c.z) {
    c.j = { x0: c.x, y0: c.y, x1: c.tx, y1: Z.y, u: 0 };
    c.st = 'jump';
  } else if (Math.abs(c.tx - c.x) > 2) {
    c.st = 'walk';
    c.run = run;
  } else catArrive();
}

function catUpdate(dt) {
  PTR.t += dt;
  for (let i = HR.length - 1; i >= 0; i--) {
    const h = HR[i];
    h.y -= 14 * dt;
    h.x += h.vx * dt;
    h.l -= dt * 0.8;
    if (h.l <= 0) HR.splice(i, 1);
  }
  if (!catHere()) return;
  const c = CAT;
  c.t += dt;
  c.yawn = Math.max(0, c.yawn - dt);
  c.sw = Math.max(0, c.sw - dt);
  if (c.st == 'jump') {
    const j = c.j;
    j.u += dt / 0.55;
    const u = Math.min(1, j.u);
    c.x = lerp(j.x0, j.x1, u);
    c.y = lerp(j.y0, j.y1, u) - 56 * u * (1 - u);
    c.dir = j.x1 < j.x0 ? -1 : 1;
    if (u >= 1) {
      c.z = c.tz;
      c.x = c.tx;
      c.y = CZ[c.z].y;
      catArrive();
    }
    return;
  }
  if (c.tap > 0) c.tap -= dt;
  if (c.st == 'sleep') {
    if (tun > 0.4 || (PTR.t < 0.4 && Math.hypot(PTR.x - c.x - 6, PTR.y - c.y - 4) < 26)) {
      c.st = 'sit';
      c.yawn = 1.2;
      c.nt = 3;
    } else if ((c.nt -= dt) <= 0) {
      c.st = 'sit';
      c.yawn = 1.5;
      c.nt = rnd(5, 10);
    }
    return;
  }
  if (PTR.t < 2.5 && PTR.y > 20 && c.tap <= 0) {
    const z = PTR.y >= 120 ? 2 : PTR.x >= 214 ? 1 : 0,
      tx = PTR.x - 6;
    if (z != c.z) {
      catGo(z, tx, 1);
      return;
    }
    if (Math.abs(tx - c.x) > 8) {
      c.tx = cl(tx, CZ[z].a, CZ[z].b);
      c.st = 'walk';
      c.run = 1;
    } else if (c.st == 'walk') c.st = 'sit';
  }
  if (c.st == 'walk') {
    const d = c.tx - c.x,
      sp = (c.run ? 52 : 22) * dt;
    c.dir = d < 0 ? -1 : 1;
    if (Math.abs(d) <= sp) {
      c.x = c.tx;
      catArrive();
    } else c.x += Math.sign(d) * sp;
    return;
  }
  // sitting: watch things drift past the glass, and swat at them
  if (c.z == 0)
    for (const o of fl)
      if (!o.in && o.x > WX && o.x < WX + WW) {
        c.dir = o.x < c.x ? -1 : 1;
        if (Math.abs(o.x - c.x - 6) < 16 && c.sw <= 0 && Math.random() < dt * 2) c.sw = 0.35;
        break;
      }
  if ((c.nt -= dt) <= 0) {
    const r = Math.random();
    if (r < 0.38) {
      const z = Math.random() < 0.55 ? 1 : 0;
      c.then = 'sleep';
      catGo(z, rnd(CZ[z].a, CZ[z].b), 0);
    } else if (r < 0.7) {
      const z = (Math.random() * 3) | 0;
      catGo(z, rnd(CZ[z].a, CZ[z].b), 0);
    } else c.nt = rnd(4, 9);
  }
}

function catTap(px, py) {
  const c = CAT;
  if (!catHere() || c.st == 'jump' || px < c.x - 3 || px > c.x + 15 || py < c.y - 5 || py > c.y + 11)
    return false;
  c.taps++;
  if (c.st == 'sleep') c.yawn = 1.4;
  c.st = 'sit';
  c.tap = 4;
  c.nt = Math.max(c.nt, 4);
  toast(CMS[c.taps % CMS.length], 1800);
  tone(140, 1.2, 0.05, 'sine');
  if (c.taps % 5 == 0) {
    tone(520, 0.25, 0.05, 'triangle');
    tone(380, 0.3, 0.04, 'triangle', 0.12);
  }
  for (let i = 0; i < 3; i++) HR.push({ x: c.x + 4 + rnd(-3, 3), y: c.y - 2, l: 1, vx: rnd(-6, 6) });
  return true;
}

function catDraw() {
  for (const h of HR) {
    g.globalAlpha = cl(h.l, 0, 1);
    const hx = Math.round(h.x),
      hy = Math.round(h.y);
    R('#ff8aa0', hx, hy, 1, 1);
    R('#ff8aa0', hx + 2, hy, 1, 1);
    R('#ff8aa0', hx, hy + 1, 3, 1);
    R('#ff8aa0', hx + 1, hy + 2, 1, 1);
  }
  g.globalAlpha = 1;
  if (!catHere()) return;
  const c = CAT,
    x = Math.round(c.x),
    y = Math.round(c.y + (c.st == 'sit' ? Math.sin(T * 1.5) * 0.5 : 0)),
    body = '#c89a5a',
    dark = '#a87a3a',
    flip = (fn) => {
      if (c.dir > 0) {
        g.save();
        g.translate(x + 12, 0);
        g.scale(-1, 1);
        fn(0);
        g.restore();
      } else fn(x);
    };
  if (c.st == 'sleep') {
    const br = Math.round(Math.sin(T * 2) * 0.6 + 0.4);
    flip((X) => {
      R(body, X, y + 3 - br, 12, 5 + br);
      R(dark, X + 5, y + 3 - br, 1, 3);
      R(dark, X + 8, y + 3 - br, 1, 3);
      R(body, X, y + 1, 1, 2);
      R(body, X + 3, y + 1, 1, 2);
      R('#3a2414', X + 1, y + 5, 1, 1);
      R('#3a2414', X + 3, y + 5, 1, 1);
      R(dark, X + 9, y + 7, 3, 1);
    });
    for (let i = 0; i < 2; i++) {
      const ph = (T * 0.5 + i * 0.5) % 1,
        zx = (c.dir < 0 ? x + 2 : x + 8) + ph * 5,
        zy = y - 2 - ph * 10;
      g.globalAlpha = (1 - ph) * 0.9;
      R('#f6e3bf', zx, zy, 3, 1);
      R('#f6e3bf', zx + 1, zy + 1, 1, 1);
      R('#f6e3bf', zx, zy + 2, 3, 1);
    }
    g.globalAlpha = 1;
  } else if (c.st == 'walk') {
    const f = Math.sin(T * (c.run ? 22 : 12)) > 0 ? 1 : 0;
    flip((X) => {
      g.drawImage(CT, 0, 0, 12, 7, X, y, 12, 7);
      R(body, X + 1 + f, y + 7, 1, 1);
      R(body, X + 3 - f, y + 7, 1, 1);
      R(body, X + 7 + f, y + 7, 1, 1);
      R(body, X + 9 - f, y + 7, 1, 1);
      R(dark, X + 11, y + 3, 1, 2);
    });
  } else if (c.st == 'jump') {
    flip((X) => {
      g.drawImage(CT, 0, 0, 12, 7, X, y, 12, 7);
      R(body, X - 1, y + 7, 2, 1);
      R(body, X + 10, y + 7, 2, 1);
    });
  } else {
    flip((X) => {
      g.drawImage(CT, X, y);
      R(dark, X + 11, y + 6 - (Math.sin(T * 4) > 0.3 ? 2 : 0), 1, 1);
      if (c.yawn > 0) R('#7a2a2a', X + 1, y + 3, 2, 1);
      else if (T % 4 < 0.12) R(body, X + 1, y + 2, 2, 1);
      if (c.sw > 0) R(body, X - 2, y + 5 - (Math.sin(T * 30) > 0 ? 1 : 0), 2, 1);
    });
  }
}

/* ───────────────────────── Tunnel: the carriage goes dark ───────────────────────── */

let tnc = 0;

function tunnelStart() {
  noise('lowpass', 160, 45, 4.5, 0.28);
  tone(70, 4, 0.05, 'sawtooth', 0, 1.2);
  if (++tnc <= 2) toast('Tàu chui vào hầm, đèn trong toa chập chờn', 3200);
}

function tunnelFx() {
  if (tun <= 0.01) return;
  const f = 0.5 + 0.5 * Math.sin(T * 41) * Math.sin(T * 9.3);
  g.fillStyle = 'rgba(6,3,2,' + (tun * (0.38 + 0.22 * f)).toFixed(3) + ')';
  g.fillRect(0, 0, W, H);
  g.globalCompositeOperation = 'lighter';
  for (let i = 0; i < 4; i++)
    glow(W + 40 - ((T * 230 + i * 130) % (W + 160)), 58, 46, 'rgba(255,160,60,' + (0.16 * tun).toFixed(3) + ')');
  g.globalCompositeOperation = 'source-over';
}

/* ───────────────────────── Plumbing ───────────────────────── */

function extrasUpdate(dt) {
  for (const k in LW) if ((LW[k] += dt / 2.4) >= 1) delete LW[k];
  catUpdate(dt);
  if (tun > 0.3) shk = Math.max(shk, 0.06);
}

function ptrMove(e) {
  const r = cv.getBoundingClientRect();
  PTR.x = ((e.clientX - r.left) / r.width) * W;
  PTR.y = ((e.clientY - r.top) / r.height) * H;
  PTR.t = 0;
}

cv.addEventListener('pointermove', ptrMove);
cv.addEventListener('pointerdown', ptrMove);
