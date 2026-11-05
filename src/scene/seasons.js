/**
 * Season-specific scenery layers, called from outside() in window.js:
 * sky (sun, clouds, aurora, geese), trees, ground flora and the seaside station.
 */

const TREE_PAL = [
  ['#e88aa4', '#f8bcd0', '#ffe4ec'], // spring blossom: shadow, body, highlight
  ['#2a7a34', '#48a448', '#8acc5a'], // summer leaves
  ['#a8321e', '#d8602a', '#f0b040'], // autumn maple
  ['#9aa8bc', '#dde6f0', '#ffffff'], // winter snow
];
const NIGHT_TINT = [14, 24, 38];
const sh = (c, nf) => rgb(mixA(hex(c), NIGHT_TINT, nf * 0.55));

/** Filled circle made of pixel rows. */
function blob(cx, cy, r, col) {
  for (let j = -r; j <= r; j++) {
    const w = Math.round(Math.sqrt(r * r - j * j));
    R(col, cx - w, cy + j, 2 * w + 1, 1);
  }
}

/** One tree: trunk plus a layered canopy (or snowy bare branches in winter). */
function tree(x, base, h, r, sn, nf) {
  const p = TREE_PAL[sn],
    top = base - h,
    bark = sh('#4a3020', nf);
  R(bark, x, top + r, 2, h - r);
  R(sh('#2e1c12', nf), x + 1, top + r, 1, h - r);
  if (sn == 3) {
    for (let i = 0; i < 3; i++) {
      const y = top + r - i * 4,
        d = i % 2 ? 1 : -1;
      R(bark, d > 0 ? x + 2 : x - 5, y, 5, 1);
      R('#ffffff', d > 0 ? x + 5 : x - 5, y - 1, 2, 1);
    }
    blob(x + 1, top + 2, 3, sh('#f4f8fc', nf));
    return;
  }
  blob(x + 1, top + r, r, sh(p[0], nf));
  blob(x, top + r - 1, r - 1, sh(p[1], nf));
  blob(x - 1, top + r - 3, Math.max(2, r >> 1), sh(p[2], nf));
  for (let i = 0; i < 5; i++) {
    const dx = ((hs(x + i) * 2 * r) | 0) - r,
      dy = ((hs(x + i + 9) * r) | 0) - r + top + r;
    R(sn == 0 ? '#ffffff' : sn == 1 ? sh('#1e5a28', nf) : sh('#ffe070', nf), x + dx, dy, 1, 1);
  }
}

function cloud(x, y, w, col) {
  R(col, x, y, w, 2);
  R(col, x + 3, y - 2, w - 7, 2);
  R(col, x + (w >> 2), y - 4, w >> 1, 2);
}

/** Sky layer: clouds, sun, aurora, migrating geese. Drawn behind the hills. */
function seasonSky(nf) {
  const sn = sea(),
    day = 1 - nf;
  rainbow(nf);
  g.globalAlpha = 0.3 + 0.55 * day;
  strip(sn == 1 ? 90 : 120, 0.03, (x, r) => {
    if (hs(r + sn * 5) > 0.3)
      cloud(
        WX + x,
        WY + 8 + ((hs(r) * 22) | 0),
        24 + ((hs(r + 4) * 22) | 0),
        sh(['#fff0f4', '#ffffff', '#ffd8b0', '#c4ccd8'][sn], nf),
      );
  });
  g.globalAlpha = 1;
  if (sn == 0) {
    g.globalAlpha = 0.12 * day;
    R('#ffc0d0', WX, WY + 40, WW, 22);
    g.globalAlpha = 1;
  }
  const sx = WX + [150, 150, 110, 150][sn],
    sy = WY + [22, 16, 54, 20][sn],
    sr = [5, 6, 10, 4][sn];
  if (nf < 0.5) {
    glow(sx, sy, sr * 5, 'rgba(255,230,170,' + (0.5 * (1 - 2 * nf)).toFixed(2) + ')');
    blob(sx, sy, sr, ['#fff2d0', '#fff6c0', '#ffb050', '#f4f0e8'][sn]);
    if (sn == 1)
      for (let i = 0; i < 12; i++) {
        const a = (i / 12) * 6.28 + T * 0.1;
        for (let d = 9; d < 15; d++)
          R('rgba(255,246,192,.4)', sx + Math.cos(a) * d, sy + Math.sin(a) * d, 1, 1);
      }
  }
  if (sn == 3 && nf > 0.45) {
    // aurora ribbons
    g.globalCompositeOperation = 'lighter';
    for (let x = 0; x < WW; x += 2) {
      const y = WY + 12 + Math.sin(x * 0.045 + T * 0.5) * 7 + Math.sin(x * 0.11 - T * 0.8) * 2;
      for (let j = 0; j < 16; j++) {
        g.globalAlpha = (nf - 0.45) * 0.2 * (1 - j / 16);
        R(j < 8 ? '#50ffb0' : '#a070ff', WX + x, y + j, 2, 1);
      }
    }
    g.globalCompositeOperation = 'source-over';
    g.globalAlpha = 1;
  }
  if (sn == 2 && nf < 0.7)
    for (let i = 0; i < 7; i++) {
      const d = Math.abs(i - 3);
      R(
        '#2a1a14',
        WX + WW - ((T * 9) % (WW + 70)) + (i - 3) * 6,
        WY + 20 + d * 4 + Math.sin(T * 6 + i),
        2,
        1,
      );
    }
}

/** Two parallax rows of seasonal trees standing on the hills. */
function seasonTrees(nf, k) {
  if (k == 1 || k == 3 || k == 5 || k == 6) return;
  const sn = sea(),
    BY = WY + WH;
  strip(34, 0.16, (x, r) => {
    if (hs(r + 3) > 0.3) tree(WX + x, WY + 70, 9 + ((hs(r) * 5) | 0), 4, sn, nf + 0.15);
  });
  strip(52, 0.3, (x, r) => {
    if (hs(r + 7) > 0.4)
      tree(WX + x, BY - 6, 20 + ((hs(r) * 12) | 0), 7 + ((hs(r + 2) * 4) | 0), sn, nf);
  });
}

/** Ground flora and critters in the foreground. */
function seasonGround(nf, k) {
  if (sea() == 3 && si < 3) fogBands(nf);
  if (k == 3 || k == 6) return;
  if (k == 2 && sea() == 1) sunflowerField(nf);
  const sn = sea(),
    BY = WY + WH;
  strip(9, 0.9, (x, r) => {
    const h = hs(r + sn * 9),
      y = (h * 4) | 0;
    if (sn == 0 && h > 0.4) {
      R(['#ffd0e0', '#ffffff', '#ffe070', '#c8a0f0'][r & 3], WX + x, BY - 8 - y, 2, 2);
      R('#3a8a3a', WX + x, BY - 6 - y, 1, 2);
    } else if (sn == 1) {
      if (h > 0.62) {
        R('#2a7a2a', WX + x, BY - 12, 1, 7);
        R('#f0c020', WX + x - 1, BY - 14, 3, 3);
        R('#5a3010', WX + x, BY - 13, 1, 1);
      } else R('#3a9a3a', WX + x, BY - 8 - (y >> 1), 1, 3);
    } else if (sn == 2 && h > 0.5)
      R(['#d8502a', '#e8902a', '#c8302a', '#f0b040'][r & 3], WX + x, BY - 5 - y, 2, 2);
    else if (sn == 3) {
      if (h > 0.45) {
        R('#ffffff', WX + x - 1, BY - 6, 5, 2);
        R('#dce6f2', WX + x, BY - 4, 4, 1);
      }
      if (h > 0.8 && Math.sin(T * 3 + r) > 0.6) R('#ffffff', WX + x, BY - 10, 1, 1);
    }
  });
  if (sn < 2 && nf < 0.5)
    for (let i = 0; i < 4; i++)
      R(
        i % 2 ? '#ffe070' : '#ffffff',
        WX + ((i * 53 + T * 6) % WW),
        WY + 60 + Math.sin(T * 1.3 + i * 2) * 8 + i * 3,
        Math.sin(T * 14 + i) > 0 ? 2 : 1,
        1,
      );
}

const SEA_C = [
  ['#9ad8e8', '#4a9ac0'],
  ['#58d4e4', '#1878b0'],
  ['#f0b070', '#7a5a60'],
  ['#a8b4c4', '#506074'],
].map((a) => a.map(hex));
const SAND = ['#ecdcb8', '#f4e0a8', '#cdb084', '#e4e9ef'];

/** The seaside station: gradient sea, sun/moon path, waves, boats, lighthouse, gulls, beach. */
function seaScene(nf) {
  const sn = sea(),
    hz = WY + 58,
    BY = WY + WH,
    [top, bot] = SEA_C[sn];
  for (let y = hz; y < BY; y += 2)
    R(rgb(mixA(mixA(top, bot, (y - hz) / (BY - hz)), NIGHT_TINT, nf * 0.7)), WX, y, WW, 2);
  g.globalAlpha = (sn == 2 || sn == 0 ? 0.5 : 0.2) * (1 - nf * 0.6);
  R(sn == 2 ? '#ffc080' : '#ffe8d0', WX, hz - 1, WW, 2);
  const cx = WX + (sn == 2 ? 110 : 150),
    rc = nf > 0.5 ? '#f6e3b0' : sn == 2 ? '#ffb060' : '#fff4c0';
  for (let y = hz + 1; y < BY - 8; y += 2) {
    g.globalAlpha = 0.5 * (nf > 0.5 ? nf : 1);
    const w = 2 + ((y - hz) >> 2) + Math.round(Math.sin(T * 2 + y) * 2);
    R(rc, cx - (w >> 1) + Math.round(Math.sin(T * 1.5 + y * 0.7) * 2), y, w, 1);
  }
  g.globalAlpha = 0.28;
  for (let r = 0; r < 8; r++)
    for (let i = 0; i < WW; i += 22)
      R(
        '#ffffff',
        WX + ((i + r * 9 + T * (4 + r * 2)) % (WW + 8)),
        hz + 4 + r * 4 + (r >> 1),
        3 + r,
        1,
      );
  g.globalAlpha = 1;
  strip(230, 0.08, (x, r) => {
    if (hs(r + 5) < 0.55) return;
    const bx = WX + x;
    R('#e8e0d0', bx, hz - 16, 4, 16);
    R('#c8402a', bx, hz - 12, 4, 3);
    R('#c8402a', bx, hz - 6, 4, 3);
    R('#2a1a14', bx - 1, hz - 18, 6, 2);
    R('#ffd070', bx + 1, hz - 17, 2, 1);
    if (nf > 0.3) {
      g.globalCompositeOperation = 'lighter';
      glow(
        bx + 2,
        hz - 16,
        26,
        'rgba(255,230,150,' + (nf * 0.6 * (0.3 + Math.max(0, Math.sin(T * 1.6)))).toFixed(2) + ')',
      );
      g.globalCompositeOperation = 'source-over';
    }
  });
  strip(120, 0.14, (x, r) => {
    if (hs(r + 3) < 0.45) return;
    const bx = WX + x,
      by = hz + 5 + ((hs(r) * 6) | 0);
    R('#3a2a22', bx, by, 11, 2);
    R('#3a2a22', bx + 2, by + 2, 7, 1);
    R('#4a3a30', bx + 5, by - 9, 1, 9);
    for (let j = 0; j < 7; j++)
      R(sn == 2 ? '#ffd8a0' : '#f4ecd8', bx + 6, by - 8 + j, 1 + (j >> 1), 1);
    if (nf > 0.4) {
      g.globalCompositeOperation = 'lighter';
      glow(bx + 5, by - 1, 9, 'rgba(255,190,90,.5)');
      g.globalCompositeOperation = 'source-over';
    }
  });
  if (sn == 3)
    strip(60, 0.2, (x, r) => {
      R('#e8f0f8', WX + x, hz + 8 + ((hs(r) * 22) | 0), 10 + ((hs(r + 3) * 10) | 0), 2);
    });
  if (sn == 0)
    for (let i = 0; i < 14; i++)
      R('#f8b8c8', WX + ((i * 37 + T * 5) % WW), hz + 8 + ((i * 7) % 36), 2, 1);
  if (sn == 1)
    for (let i = 0; i < 26; i++)
      if (Math.sin(T * 3 + i * 5) > 0.8)
        R('#ffffff', WX + ((hs(i) * WW) | 0), hz + 3 + ((hs(i + 9) * 34) | 0), 1, 1);
  if (nf < 0.6)
    for (let i = 0; i < 3; i++) {
      const f = Math.sin(T * 8 + i) > 0,
        gx = WX + WW - ((T * 14 + i * 60) % (WW + 20)),
        gy = WY + 30 + Math.sin(T * 2 + i) * 4 + i * 5;
      [
        [0, 0],
        [-2, f ? -1 : 1],
        [2, f ? -1 : 1],
      ].forEach((o) => R('#ffffff', gx + o[0], gy + o[1], 1, 1));
    }
  R(sh(SAND[sn], nf), WX, BY - 9, WW, 9);
  for (let i = 0; i < WW; i++) {
    g.globalAlpha = 0.8;
    R('#ffffff', WX + i, BY - 10 + Math.round(Math.sin(i * 0.2 + T * 2) * 1.5), 1, 1);
  }
  g.globalAlpha = 1;
}

const RAINBOW = ['#ff6a6a', '#ffa860', '#ffe070', '#7ad87a', '#6ab8ff', '#8a7aff', '#c07ae8'];

/** Spring: a soft rainbow appears at the station right after a rainy one. */
function rainbow(nf) {
  if (sea() != 0 || ST[si].rain || !ST[(si + 6) % 7].rain || nf > 0.6) return;
  g.globalAlpha = Math.max(0, 0.42 * (1 - nf * 1.6));
  const cx = WX + 110,
    cy = WY + 70;
  for (let a = 0; a <= Math.PI; a += 0.018)
    RAINBOW.forEach((c, b) =>
      R(c, cx + Math.cos(a) * (62 - b * 2), cy - Math.sin(a) * (50 - b * 1.6), 2, 2),
    );
  g.globalAlpha = 1;
}

function sunflower(x, base, h, nf) {
  R(sh('#2f7a2a', nf), x, base - h, 1, h);
  R(sh('#3f9a35', nf), x - 2, base - (h >> 1), 2, 1);
  R(sh('#3f9a35', nf), x + 1, base - (h >> 1) + 2, 2, 1);
  blob(x, base - h, 3, sh('#f4c020', nf));
  blob(x, base - h, 1, sh('#5a3010', nf));
  R(sh('#ffe060', nf), x - 4, base - h, 1, 1);
  R(sh('#ffe060', nf), x + 4, base - h, 1, 1);
}

/** Summer fields: two parallax rows of sunflowers swaying toward the sun. */
function sunflowerField(nf) {
  const BY = WY + WH;
  strip(11, 0.45, (x, r) => sunflower(WX + x, BY - 10, 9 + ((hs(r) * 4) | 0), nf));
  strip(17, 1.1, (x, r) => sunflower(WX + x, BY - 3, 15 + ((hs(r + 5) * 6) | 0), nf));
}

/** Early winter: layered, slowly drifting ground fog. */
function fogBands(nf) {
  const BY = WY + WH;
  for (let l = 0; l < 4; l++) {
    g.globalAlpha = 0.13 + 0.1 * (1 - nf);
    strip(70 + l * 30, 0.08 + l * 0.07, (x, r) => {
      R(
        nf > 0.5 ? '#8aa0b8' : '#e8eef4',
        WX + x,
        BY - 20 - l * 8 + Math.sin(T * 0.4 + r) * 2,
        60 + ((hs(r + l) * 30) | 0),
        5,
      );
      R(
        nf > 0.5 ? '#8aa0b8' : '#e8eef4',
        WX + x + 8,
        BY - 23 - l * 8 + Math.sin(T * 0.4 + r) * 2,
        40,
        3,
      );
    });
  }
  g.globalAlpha = 1;
}
