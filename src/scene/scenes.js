/**
 * Extra station scenes (kinds 7-11), drawn from outside() in window.js.
 * Each one is a small set piece built from the same parallax strips as the base scenes
 * and tinted by season (sea()) and night (nf).
 *   7 windmill hill   8 paddy fields   9 lake   10 mountains   11 night festival
 */

/** Filled ellipse made of pixel rows (ry >= 1). */
function ellip(cx, cy, rx, ry, col) {
  for (let j = -ry; j <= ry; j++) {
    const w = Math.round(rx * Math.sqrt(1 - (j * j) / (ry * ry)));
    R(col, cx - w, cy + j, 2 * w + 1, 1);
  }
}

/** Additive glow wrapper so scene code stays short. */
function lamp(x, y, r, rgba) {
  g.globalCompositeOperation = 'lighter';
  glow(x, y, r, rgba);
  g.globalCompositeOperation = 'source-over';
}

function sceneK(k, nf, lc, BY) {
  const sn = sea();
  if (k == 7) windmillHill(nf, sn, BY);
  else if (k == 8) paddy(nf, sn, BY);
  else if (k == 9) lake(nf, sn, BY);
  else if (k == 10) mountains(nf, sn, BY, lc);
  else if (k == 11) festival(nf, sn, BY);
}

/* ---------- 7. windmill hill: kites in spring, hay rolls and falling leaves in autumn ---------- */

function windmill(x, base, h, nf, ang) {
  const bd = sh('#d8c8a8', nf),
    rf = sh('#8a4a2a', nf),
    hub = base - h + 2;
  for (let j = 0; j < h; j++) {
    const w = 7 - ((j * 3 / h) | 0);
    R(bd, x - (w >> 1), base - h + j, w, 1);
  }
  R(rf, x - 3, base - h - 2, 7, 2);
  R(rf, x - 1, base - h - 3, 3, 1);
  R(sh('#4a3020', nf), x - 1, base - 3, 2, 3);
  if (nf > 0.3) R('#ffc65a', x, base - h + 6, 1, 2);
  for (let i = 0; i < 4; i++) {
    const a = ang + (i * Math.PI) / 2,
      c = Math.cos(a),
      s = Math.sin(a);
    for (let d = 2; d < 11; d++) {
      R(sh(d > 6 ? '#f4ead4' : '#b8a888', nf), x + c * d, hub + s * d, 1, 1);
      if (d > 6) R(sh('#f4ead4', nf), x + c * d - s, hub + s * d + c, 1, 1);
    }
  }
  R(sh('#3a2a20', nf), x, hub, 1, 1);
}

function kite(x, y, col, t) {
  R(col, x, y - 2, 1, 1);
  R(col, x - 1, y - 1, 3, 1);
  R(col, x - 2, y, 5, 1);
  R(col, x - 1, y + 1, 3, 1);
  R(col, x, y + 2, 1, 1);
  for (let i = 1; i < 7; i++)
    R(i & 1 ? '#fff6e0' : col, x + Math.round(Math.sin(t * 3 + i * 0.8) * 1.5), y + 2 + i, 1, 1);
}

function windmillHill(nf, sn, BY) {
  strip(170, 0.1, (x, r) => {
    if (hs(r + 11) < 0.35) return;
    windmill(WX + x + 20, WY + 70, 17 + ((hs(r) * 6) | 0), nf, T * (0.7 + hs(r + 2) * 0.6));
  });
  if (sn == 0 && nf < 0.75) {
    g.globalAlpha = 1 - nf;
    ['#f06a8a', '#ffd070', '#7ab8f0'].forEach((c, i) =>
      kite(WX + 40 + i * 58 + Math.round(Math.sin(T * 0.8 + i) * 3), WY + 14 + i * 7 + Math.round(Math.sin(T * 1.1 + i * 2) * 2), c, T + i),
    );
    g.globalAlpha = 1;
  }
  if (sn == 2)
    strip(90, 0.6, (x, r) => {
      if (hs(r + 6) < 0.45) return;
      ellip(WX + x, BY - 12, 4, 3, sh('#d8b04a', nf));
      R(sh('#a8822a', nf), WX + x - 2, BY - 12, 5, 1);
    });
}

/* ---------- 8. paddy fields: seedlings & farmers in spring, gold rice & scarecrows in autumn ---------- */

function paddy(nf, sn, BY) {
  const top = WY + 64,
    base = ['#8cbcae', '#4e9a58', '#c8a040', '#d8e4ee'][sn],
    row = ['#6ab04a', '#3a8a3a', '#e8c050', '#ffffff'][sn];
  R(sh(base, nf), WX, top, WW, BY - top);
  if (sn == 0)
    for (let y = top + 2; y < BY - 2; y += 4)
      strip(26, 0.25 + (y - top) * 0.012, (x, r) => {
        if (hs(r + y) > 0.45) R(sh('#e8f4f4', nf), WX + x, y, 10, 1);
      });
  for (let i = 0; i < 5; i++) {
    const y = top + 7 + i * 6;
    strip(4, 0.25 + i * 0.2, (x, r) => {
      const sway = sn == 1 || sn == 2 ? ((Math.sin(T * 2 + r * 0.7) + 1) | 0) : 0;
      R(sh(row, nf), WX + x, y - sway, 1, 2 + (i >> 1) + (sn == 2 ? 1 : 0));
    });
  }
  strip(150, 0.3, (x, r) => {
    if (hs(r + 3) < 0.45) return;
    const bx = WX + x,
      by = top + 12;
    if (sn == 0) {
      R(sh('#3a5a8a', nf), bx, by - 5, 3, 5);
      R(sh('#e8d098', nf), bx - 2, by - 7, 7, 1);
      R(sh('#e8d098', nf), bx - 1, by - 8, 5, 1);
      R(sh('#e8d098', nf), bx, by - 9, 3, 1);
      R(sh('#2a2a2a', nf), bx + 3, by - 4, 1, 4);
    } else if (sn == 2) {
      R(sh('#6a4a2a', nf), bx, by - 12, 1, 12);
      R(sh('#6a4a2a', nf), bx - 4, by - 9, 9, 1);
      R(sh('#a8503a', nf), bx - 1, by - 9, 3, 4);
      R(sh('#c8a050', nf), bx - 2, by - 13, 5, 1);
      R(sh('#c8a050', nf), bx - 1, by - 14, 3, 1);
    } else if (sn == 1) {
      const c = sh('#4a4a52', nf);
      R(c, bx, by - 4, 8, 4);
      R(c, bx + 8, by - 5, 3, 2);
      R(sh('#d8d0c0', nf), bx + 9, by - 7, 1, 2);
      R(c, bx + 1, by, 1, 2);
      R(c, bx + 6, by, 1, 2);
    } else ellip(bx, by - 2, 5, 3, sh('#f4f8fc', nf));
  });
  if (sn < 2 && nf < 0.6)
    for (let i = 0; i < 3; i++) {
      const bx = WX + WW - ((T * 12 + i * 70) % (WW + 20)),
        by = WY + 54 + Math.sin(T * 2 + i) * 3 + i * 3,
        f = Math.sin(T * 7 + i) > 0 ? 1 : -1;
      R('#ffffff', bx, by, 1, 1);
      R('#ffffff', bx - 2, by - f, 2, 1);
      R('#ffffff', bx + 1, by - f, 2, 1);
    }
  if (sn == 2 && nf < 0.8)
    for (let i = 0; i < 4; i++)
      R('#1a1210', WX + ((i * 47 + T * 9) % WW), WY + 40 + Math.sin(T * 2 + i * 2) * 4 + i * 4, 2, 1);
}

/* ---------- 9. lake: willows & petals in spring, lotus in summer, floating leaves, thin ice ---------- */

function lake(nf, sn, BY) {
  const hz = WY + 64,
    top = hex(['#9ac8d8', '#58b4cc', '#c89070', '#e2eef8'][sn]),
    bot = hex(['#5a98b8', '#2a7aa0', '#6a4a50', '#b4cde0'][sn]);
  for (let y = hz; y < BY; y += 2)
    R(rgb(mixA(mixA(top, bot, (y - hz) / (BY - hz)), NIGHT_TINT, nf * 0.7)), WX, y, WW, 2);
  g.globalAlpha = 0.28 * (sn == 3 ? 0.5 : 1);
  for (let r = 0; r < 8; r++)
    R('#ffffff', WX + ((r * 31 + T * (3 + r)) % (WW + 8)), hz + 3 + r * 4, 3 + r, 1);
  g.globalAlpha = 1;
  if (nf > 0.4) {
    g.globalAlpha = 0.45;
    for (let y = hz + 1; y < BY - 4; y += 2) {
      const w = 2 + ((y - hz) >> 2) + Math.round(Math.sin(T * 2 + y) * 2);
      R('#f6e3b0', WX + 150 - (w >> 1) + Math.round(Math.sin(T * 1.5 + y * 0.7) * 2), y, w, 1);
    }
    g.globalAlpha = 1;
  }
  if (sn == 0) {
    strip(70, 0.18, (x, r) => {
      if (hs(r + 2) < 0.4) return;
      const bx = WX + x;
      R(sh('#4a3020', nf), bx, hz - 10, 2, 10);
      blob(bx + 1, hz - 12, 5, sh('#7aa850', nf));
      for (let i = -4; i <= 4; i += 2)
        R(sh('#6a9a40', nf), bx + 1 + i + Math.round(Math.sin(T + i + r)), hz - 8, 1, 5 + ((hs(r + i) * 4) | 0));
    });
    for (let i = 0; i < 18; i++)
      R('#f8b8c8', WX + ((i * 37 + T * 4) % WW), hz + 6 + ((i * 11) % 32), 2, 1);
  } else if (sn == 1) {
    strip(240, 0.07, (x, r) => {
      if (hs(r + 6) < 0.4) return;
      const bx = WX + x;
      R(sh('#3a2a22', nf), bx - 6, hz - 3, 12, 2);
      R(sh('#4a3020', nf), bx - 5, hz - 8, 1, 5);
      R(sh('#4a3020', nf), bx + 4, hz - 8, 1, 5);
      R(sh('#8a3a2a', nf), bx - 8, hz - 10, 16, 2);
      R(sh('#8a3a2a', nf), bx - 5, hz - 12, 10, 2);
      R(sh('#8a3a2a', nf), bx - 2, hz - 13, 4, 1);
      if (nf > 0.3) {
        R('#ffc65a', bx - 1, hz - 7, 2, 3);
        lamp(bx, hz - 6, 14, 'rgba(255,200,110,' + (0.5 * nf).toFixed(2) + ')');
      }
    });
    strip(26, 0.4, (x, r) => {
      if (hs(r + 4) < 0.35) return;
      const ly = hz + 8 + ((hs(r) * 30) | 0);
      ellip(WX + x, ly, 5, 1, sh('#2e7a3e', nf));
      if (hs(r + 9) > 0.5) {
        R(sh('#f8a0c0', nf), WX + x - 1, ly - 3, 3, 2);
        R(sh('#ffe0ec', nf), WX + x, ly - 4, 1, 1);
      }
    });
  } else if (sn == 2) {
    for (let i = 0; i < 16; i++)
      R(['#d8602a', '#e8902a', '#a8321e'][i % 3], WX + ((i * 41 + T * 3) % WW), hz + 5 + ((i * 13) % 34), 2, 1);
  } else {
    strip(40, 0.3, (x, r) => {
      if (hs(r + 1) > 0.5) R(sh('#9ab8d0', nf), WX + x, hz + 4 + ((hs(r) * 22) | 0), 12, 1);
    });
    const sx = WX + 40 + (Math.sin(T * 0.5) * 0.5 + 0.5) * 120,
      d = Math.cos(T * 0.5) > 0 ? 1 : -1,
      sy = BY - 15;
    g.globalAlpha = 0.5;
    R('#ffffff', sx - d * 8, sy + 3, 8, 1);
    g.globalAlpha = 1;
    R(sh('#c83a3a', nf), sx, sy - 5, 3, 5);
    R(sh('#e0b088', nf), sx, sy - 8, 3, 3);
    R(sh('#f4ecd8', nf), sx - 1, sy - 4, 1, 3);
    R(sh('#2a1a10', nf), sx, sy, 3, 1);
  }
  const rd = sn == 3 ? '#9aa8b0' : sn == 2 ? '#7a5a2a' : '#4a7a3a';
  strip(14, 0.9, (x, r) => {
    if (hs(r + 5) < 0.4) return;
    const h = 7 + ((hs(r) * 5) | 0);
    R(sh(rd, nf), WX + x, BY - 4 - h, 1, h);
    if (sn != 3 && sn != 1) R(sh('#5a3a1a', nf), WX + x - 1, BY - 6 - h, 3, 3);
  });
  R(sh(['#7a9a5a', '#4e8a44', '#9a7a3a', '#e8eef4'][sn], nf), WX, BY - 3, WW, 3);
}

/* ---------- 10. mountains: snowy peaks, pines and a cabin with a smoking chimney ---------- */

function peaks(x0, base, h, ratio, col, snowCol, snow, r) {
  for (let j = 0; j < h; j++) {
    const half = Math.round((j + 1) * ratio),
      y = base - h + j;
    R(col, x0 - half, y, 2 * half + 1, 1);
    if (j < h * snow) {
      const jag = j > h * snow * 0.6 && hs(j * 3 + r) > 0.5 ? 1 : 0;
      R(snowCol, x0 - half + jag, y, 2 * (half - jag) + 1, 1);
    }
  }
}

function mountains(nf, sn, BY, lc) {
  const snow = [0.12, 0, 0.18, 0.4][sn],
    sc2 = sh(sn == 3 ? '#f4f8fc' : sn == 2 ? '#eadcc4' : '#dde6f0', nf);
  strip(120, 0.05, (x, r) => {
    const h = 34 + ((hs(r) * 20) | 0);
    peaks(WX + x + 55, WY + 66, h, 0.95, lc('far'), sc2, snow, r);
  });
  strip(84, 0.1, (x, r) => {
    const h = 22 + ((hs(r + 7) * 14) | 0);
    peaks(WX + x + 40, WY + 72, h, 0.9, lc('mid'), sc2, snow * 0.8, r);
  });
  const pine = sn == 3 ? '#2a5a44' : sn == 2 ? '#5a4a20' : '#1f5a30';
  strip(18, 0.5, (x, r) => {
    if (hs(r + 3) < 0.25) return;
    const tx = WX + x,
      ph = 10 + ((hs(r) * 8) | 0);
    for (let j = 0; j < ph; j++) {
      const w = 1 + (((j * 5) / ph) | 0) * 2;
      R(sh(pine, nf), tx - (w >> 1), BY - 8 - ph + j, w, 1);
      if (sn == 3 && j % 3 == 0) R(sh('#ffffff', nf), tx - (w >> 1), BY - 8 - ph + j, w, 1);
    }
    R(sh('#3a2414', nf), tx, BY - 8, 1, 3);
  });
  strip(230, 0.35, (x, r) => {
    if (hs(r + 8) < 0.45) return;
    const bx = WX + x,
      by = BY - 9,
      roof = sh(sn == 3 ? '#f0f4f8' : '#7a3a2a', nf);
    R(sh('#6a4a30', nf), bx, by - 10, 16, 10);
    for (let j = 0; j < 6; j++) R(roof, bx - 2 + j, by - 11 - j, 20 - 2 * j, 1);
    R(nf > 0.3 ? '#ffd070' : sh('#a8c8d8', nf), bx + 3, by - 7, 4, 4);
    R(sh('#3a2414', nf), bx + 10, by - 6, 3, 6);
    R(sh('#5a3a2a', nf), bx + 12, by - 17, 3, 6);
    if (nf > 0.3) lamp(bx + 5, by - 5, 14, 'rgba(255,200,110,' + (0.45 * nf).toFixed(2) + ')');
    for (let i = 0; i < 4; i++) {
      const p = (T * 6 + i * 5 + r * 3) % 20;
      g.globalAlpha = 0.45 * (1 - p / 20);
      R('#e8e8f0', bx + 13 + Math.round(Math.sin(T + i) * 2) + ((p / 6) | 0), by - 19 - p, 2, 2);
    }
    g.globalAlpha = 1;
  });
}

/* ---------- 11. night festival: stalls, string lights, sky lanterns (autumn), red lanterns (winter) ---------- */

function festival(nf, sn, BY) {
  const awn = sn == 3 ? ['#c83a3a', '#e8b040'] : ['#c83a3a', '#f4ecd8'],
    bulbs = ['#ff6a5a', '#ffd070', '#7ad8ff', '#a8f080'];
  R(sh('#3a2a20', nf), WX, BY - 6, WW, 6);
  strip(70, 0.45, (x, r) => {
    const bx = WX + x,
      by = BY - 7;
    R(sh('#4a3020', nf), bx, by - 6, 16, 6);
    for (let i = 0; i < 8; i++) R(sh(awn[i & 1], nf), bx - 1 + i * 2, by - 12, 2, 3);
    R(sh('#4a3020', nf), bx, by - 12, 1, 6);
    R(sh('#4a3020', nf), bx + 15, by - 12, 1, 6);
    for (let i = 0; i < 3; i++) R(bulbs[(r + i) & 3], bx + 2 + i * 4, by - 8, 2, 2);
    R('#ffc65a', bx + 7, by - 9, 2, 3);
    lamp(bx + 8, by - 8, 16, 'rgba(255,190,100,' + (0.25 + 0.4 * nf).toFixed(2) + ')');
  });
  strip(46, 0.62, (x, r) => {
    if (hs(r + 4) < 0.4) return;
    const bx = WX + x + 20,
      by = BY - 7;
    R(sh('#2a1a14', nf), bx, by - 6, 3, 6);
    R(sh('#2a1a14', nf), bx, by - 9, 3, 3);
    if (hs(r + 9) > 0.5) {
      R('#ffb050', bx + 3, by - 5, 2, 3);
      lamp(bx + 4, by - 4, 8, 'rgba(255,170,80,.45)');
    }
  });
  strip(52, 0.25, (x) => {
    for (let i = 0; i < 52; i++) {
      const y = WY + 14 + Math.sin((Math.PI * i) / 52) * 5;
      R(sh('#2a1a14', nf), WX + x + i, y, 1, 1);
      if (i % 9 == 4) {
        R(sn == 3 ? '#e83a3a' : bulbs[(i / 9) & 3], WX + x + i, y + 1, 2, sn == 3 ? 3 : 2);
        lamp(WX + x + i, y + 2, 7, 'rgba(255,190,110,' + (0.2 + 0.35 * nf).toFixed(2) + ')');
      }
    }
  });
  if (sn == 2)
    for (let i = 0; i < 9; i++) {
      const p = (T * 5 + i * 23) % 90,
        lx = WX + 14 + ((i * 53) % 176) + Math.sin(T * 0.7 + i) * 5,
        ly = BY - 12 - p;
      g.globalAlpha = Math.max(0, 1 - p / 90);
      R('#ffb050', lx, ly, 3, 4);
      R('#ff7a30', lx, ly + 3, 3, 1);
      lamp(lx + 1, ly + 2, 10, 'rgba(255,170,80,.55)');
      g.globalAlpha = 1;
    }
}
