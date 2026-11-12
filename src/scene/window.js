/**
 * Everything seen through the window: sky, landscape, weather and glass.
 */

const skyNow = () => {
  const a = SKY[prevSky],
    b = SKY[ST[si].sky],
    u = Math.min(1, stT / 8);
  return { t: mixA(a.t, b.t, u), b: mixA(a.b, b.b, u), d: lerp(a.d, b.d, u) };
};

const WX = 56,
  WY = 22,
  WW = 208,
  WH = 90;

/**
 * Per-visit variation: every (season, station) pair gets its own seed, so the same
 * station never lays out its hills, trees and houses the same way twice.
 */
const stageSeed = () => (((S.loop | 0) * 7 + si) * 131 + 17) % 9973;

/** Station-to-station dissolve: the last frame of the old view fades into the new one. */
const XF = 3.2,
  SNAP = mkc(WW, WH);

let vs = stageSeed(),
  xfT = XF,
  rA = ST[si].rain ? 1 : 0,
  mA = wx == 1 ? 1 : 0;

const house = (r) => (sea() == 3 ? HSWV : HSV)[(hs(r + 3) * HSV.length) | 0];

const DR = mkc(WW, WH),
  PL = grid(
    [
      '..a...a..',
      '.aba.aba.',
      '.abaaaba.',
      '..aabaa..',
      '...aba...',
      '..ppppp..',
      '..ppppp..',
      '...ppp...',
    ],
    { a: '#4a7a44', b: '#7ab85a', p: '#a0522a' },
  );

const FOG = (() => {
  const c = mkc(WW, WH),
    x = c.getContext('2d'),
    B = [0, 8, 12, 4, 14, 6, 10, 2, 3, 11, 1, 9, 15, 7, 13, 5];
  for (let j = 0; j < WH; j++)
    for (let i = 0; i < WW; i++) {
      const d = Math.min(
          Math.hypot(i, WH - j),
          Math.hypot(WW - i, WH - j) * 1.2,
          Math.hypot(WW - i, j) * 2.2,
        ),
        v = 1 - d / 46;
      if (v > 0 && v * 16 > B[(j & 3) * 4 + (i & 3)]) {
        x.fillStyle = v > 0.6 ? '#e8dcc8' : '#c8b898';
        x.fillRect(i, j, 1, 1);
      }
    }
  return c;
})();

function strip(per, sp, fn) {
  const o = sc * sp,
    i0 = Math.floor(o / per),
    off = o - i0 * per;
  for (let k = 0, x = -off; x < WW + per; x += per, k++) fn(x, i0 + k + vs);
}

function ridge(base, amp, off, col, f1, f2, pk) {
  g.fillStyle = col;
  const ph = vs * 0.37;
  for (let i = 0; i < WW; i++) {
    const u = i + off + vs * 53,
      m = pk ? 1 - Math.abs(Math.sin(u * f1 + ph)) : 0.5 + 0.5 * Math.sin(u * f1 + ph),
      y = Math.round(
        base -
          amp *
            (0.58 * m +
              0.27 * (0.5 + 0.5 * Math.sin(u * f2 + 1.7 + ph * 1.9)) +
              0.15 * (0.5 + 0.5 * Math.sin(u * 0.0313 + ph * 0.6))),
      );
    g.fillRect(WX + i, y, 1, base + 40 - y);
  }
}

function outside(dt) {
  const sk = skyNow(),
    nf = cl((sk.d - 0.35) / 0.65, 0, 1),
    k = ST[si].k,
    kp = KP[k],
    lc = (n) =>
      k == 3 || k == 5 || k == 6
        ? rgb(mixA(LC[n][0], LC[n][1], nf))
        : rgb(mixA(SEAS[sea()][n][0], SEAS[sea()][n][1], nf)),
    BY = WY + WH;
  g.save();
  g.beginPath();
  g.rect(WX, WY, WW, WH);
  g.clip();
  for (let y = 0; y < WH; y += 3) {
    g.fillStyle = rgb(
      mixA(mixA(sk.t, sk.b, Math.pow(y / WH, 1.4)), SEAS[sea()].sky, 0.16 * (1 - nf)),
    );
    g.fillRect(WX, WY + y, WW, 3);
  }
  if (nf > 0.4) {
    for (const s of stars) {
      g.globalAlpha = (nf - 0.4) * 1.6 * (0.5 + 0.5 * Math.sin(T * 2 + s[2] * 9));
      R('#fff3c8', WX + s[0] * WW, WY + s[1] * 50, 1, 1);
    }
    g.globalAlpha = 1;
    for (let j = -6; j <= 6; j++)
      for (let i = -6; i <= 6; i++)
        if (i * i + j * j <= 36) {
          g.fillStyle = (i - 2) * (i - 2) + (j + 2) * (j + 2) < 5 ? '#d8c08a' : '#f6e3b0';
          g.globalAlpha = nf;
          g.fillRect(WX + 150 + i, WY + 16 + j, 1, 1);
        }
    g.globalAlpha = 1;
  }
  g.globalCompositeOperation = 'lighter';
  glow(WX + 70, WY + 68, 110, 'rgba(255,150,60,' + 0.3 * (1 - nf) + ')');
  if (nf > 0.4) glow(WX + 150, WY + 16, 26, 'rgba(255,230,160,' + 0.25 * nf + ')');
  g.globalCompositeOperation = 'source-over';
  if (nf < 0.6) {
    for (const b of birds) {
      const f = Math.sin(T * 10 + b.p) > 0;
      [
        [0, 0],
        [-2, f ? -1 : 1],
        [2, f ? -1 : 1],
        [-1, f ? 0 : 1],
        [1, f ? 0 : 1],
      ].forEach((o) => R('#1a0e08', WX + b.x + o[0], WY + b.y + o[1], 1, 1));
    }
  }
  seasonSky(nf);
  ridge(WY + 62, kp.fa, sc * 0.05, lc('far'), k == 0 ? 0.02 : 0.017, 0.05, kp.pk);
  if (kp.ma) ridge(WY + 72, kp.ma, sc * 0.12 + 40, lc('mid'), 0.021, 0.06);
  if (k == 3) seaScene(nf);
  if (k == 6) {
    const wc = rgb(mixA(hex('#2a4a52'), hex('#102a32'), nf));
    R(wc, WX, WY + 68, WW, WH - 68);
    R('rgba(240,150,70,' + 0.3 * (1 - nf) + ')', WX, WY + 68, WW, 4);
    if (nf > 0.5)
      for (let r = 0; r < 8; r++) {
        g.globalAlpha = 0.5;
        R(
          '#f6e3b0',
          WX + 150 + ((hs(r * 7 + Math.floor(T * 4)) * 10 - 5) | 0),
          WY + 70 + r * 3,
          4 + ((hs(r) * 6) | 0),
          1,
        );
      }
    g.globalAlpha = 1;
    for (let r = 0; r < 6; r++)
      for (let i = 0; i < WW; i += 6)
        if (Math.sin(i * 0.3 + T * 2 + r * 1.7 + sc * 0.02) > 0.7)
          R('rgba(255,255,255,.12)', WX + i, WY + 72 + r * 6, 4, 1);
  }
  if (k == 5) {
    strip(16, 0.12, (x, r) => {
      const bh = 14 + ((hs(r) * 22) | 0),
        bw = 10 + ((hs(r + 9) * 6) | 0);
      R(lc('mid'), WX + x, WY + 66 - bh, bw, bh + 26);
      if (nf > 0.3)
        for (let j = 0; j < bh; j += 4)
          for (let i = 2; i < bw - 2; i += 3)
            if (hs(r * 31 + i * 7 + j) > 0.55) R('#ffc65a', WX + x + i, WY + 66 - bh + j + 2, 1, 2);
    });
    strip(34, 0.45, (x, r) => {
      const bh = 26 + ((hs(r + 3) * 26) | 0),
        bw = 18 + ((hs(r + 5) * 10) | 0);
      R(lc('near'), WX + x, BY - bh - 4, bw, bh + 6);
      if (nf > 0.3)
        for (let j = 2; j < bh; j += 5)
          for (let i = 2; i < bw - 3; i += 4)
            if (hs(r * 17 + i * 5 + j) > 0.5) R('#ffc65a', WX + x + i, BY - bh - 4 + j, 2, 2);
    });
  }
  if (k >= 7) sceneK(k, nf, lc, BY);
  if (k != 3 && k != 6 && k != 5 && k < 8) ridge(BY - 7, 4, sc * 0.3, lc('near'), 0.05, 0.13);
  seasonTrees(nf, k);
  if (k == 0)
    strip(46, 0.5, (x, r) => {
      if (hs(r + 21) < 0.35) return;
      const s = TR[sea()][hs(r + 5) > 0.7 ? 1 : 0];
      g.drawImage(
        s,
        WX + x + Math.round(hs(r + 8) * 24 - 12),
        BY - s.height - 4 - ((hs(r + 2) * 3) | 0),
      );
    });
  if (k == 1) {
    strip(22, 0.3, (x, r) => {
      if (hs(r + 13) < 0.12) return;
      const s = hs(r) > 0.5 ? TR[sea()][1] : TR[sea()][0];
      g.drawImage(s, WX + x + Math.round(hs(r + 4) * 8 - 4), BY - s.height - 8);
    });
    strip(26, 0.7, (x, r) => {
      if (hs(r + 17) < 0.1) return;
      const s = hs(r) > 0.4 ? TR[sea()][1] : TR[sea()][0];
      g.drawImage(s, WX + x + Math.round(hs(r + 6) * 10 - 5), BY - s.height - 2);
    });
  }
  if (k == 2) {
    const c = rgb(
      mixA(hex(['#6a9a40', '#c8a030', '#a06a20', '#dfe6ee'][sea()]), hex('#2a2a1a'), nf),
    );
    for (let i = 0; i < 6; i++)
      strip(10, 0.6 + i * 0.25, (x) => R(c, WX + x, BY - 19 + i * 3, 5, 1));
    strip(150, 0.35, (x, r) => {
      if (hs(r + 4) < 0.4) return;
      const s = house(r);
      g.drawImage(s, WX + x + Math.round(hs(r + 6) * 50 - 25), BY - s.height - 18);
    });
  }
  if (k == 4)
    strip(48, 0.45, (x, r) => {
      if (hs(r + 9) < 0.22) return;
      const s = house(r);
      g.drawImage(
        s,
        WX + x + Math.round(hs(r + 3) * 22 - 11),
        BY - s.height - 6 - ((hs(r) * 4) | 0),
      );
    });
  if (k == 0) {
    g.globalAlpha = 0.14;
    R('#ffe0c0', WX, WY + 54, WW, 22);
    g.globalAlpha = 1;
  }
  if (stn) {
    const tx = Math.round(WX + stn.x),
      pb = BY - 9,
      se = sea(),
      nm = nextStation(si).n,
      ga = 0.25 + 0.35 * nf;
    R('#1c130d', tx, pb, 118, 2);
    R('#2e1f14', tx, pb + 2, 118, 7);
    R('#3a2414', tx + 6, pb - 30, 106, 3);
    R('#2a1a10', tx + 6, pb - 27, 106, 1);
    [10, 50, 100].forEach((q) => R('#2a1a10', tx + q, pb - 27, 2, 27));
    R('#e8d8a0', tx + 30, pb - 25, 58, 9);
    R('#8a6a3a', tx + 30, pb - 25, 58, 1);
    R('#8a6a3a', tx + 30, pb - 17, 58, 1);
    g.font = '11px VT323';
    g.fillStyle = '#3a2414';
    g.textAlign = 'center';
    g.fillText(nm, tx + 59, pb - 17);
    g.textAlign = 'left';
    R('#ffd070', tx + 19, pb - 24, 3, 3);
    R('#ffd070', tx + 97, pb - 24, 3, 3);
    const pg = Math.min(3, stn.pg | 0),
      fo = Math.round(stn.fo || 0),
      lg = fo > 0 && fo < 37 && Math.sin(T * 16) > 0 ? 1 : 0,
      fx = tx + 70 + fo,
      fy = pb - 14,
      col = ['#8a5a7a', '#6a8a9a', '#a0602a', '#7a2a2e'][se],
      wv = stn.x < (pg ? 118 : 100) && stn.x > 10 && Math.sin(T * (pg ? 8 : 6)) > 0;
    g.globalCompositeOperation = 'lighter';
    glow(tx + 20, pb - 22, 22, 'rgba(255,200,110,' + ga.toFixed(2) + ')');
    glow(tx + 98, pb - 22, 22, 'rgba(255,200,110,' + ga.toFixed(2) + ')');
    if (!stn.hit)
      glow(
        fx + 3,
        fy + 7,
        13,
        'rgba(255,225,160,' + (0.18 + 0.1 * Math.sin(T * 3)).toFixed(2) + ')',
      );
    g.globalCompositeOperation = 'source-over';
    R(col, fx, fy + 4, 6, 8);
    R('#1a1210', fx + 1 - lg, fy + 12, 2, 2);
    R('#1a1210', fx + 3 + lg, fy + 12, 2, 2);
    R('#e0b088', fx + 1, fy, 4, 4);
    R('#2a1a10', fx + 1, fy, 4, 2);
    if (wv) R('#e0b088', fx - 2, fy + 1, 1, 4);
    else R(col, fx - 1, fy + 6, 1, 4);
    if (pg == 2) {
      R('#8a5a2a', fx - 4, fy + 6, 1, 2);
      R('#c8402a', fx - 5, fy + 8, 3, 3);
      R('#ffd070', fx - 4, fy + 9, 1, 1);
      g.globalCompositeOperation = 'lighter';
      glow(fx - 4, fy + 9, 10, 'rgba(255,200,110,.45)');
      g.globalCompositeOperation = 'source-over';
    } else if (pg >= 3) {
      R('#f4ecd8', fx - 5, fy + 1, 3, 4);
      R('#c8b898', fx - 5, fy + 2, 3, 1);
    }
    // the umbrella: open in spring, summer and autumn, folded under the arm in winter
    if (se < 3) {
      const uc = ['#d8647a', '#4a8ac8', '#d8802a'][se];
      R(uc, fx - 2, fy - 2, 10, 2);
      R(uc, fx - 1, fy - 3, 8, 1);
      R(uc, fx + 1, fy - 4, 4, 1);
      R('#e8d8a0', fx + 3, fy - 5, 1, 1);
      R('#3a2414', fx + 3, fy, 1, 2);
    } else {
      R('#7a7a90', fx + 7, fy + 3, 1, 10);
      R('#c83a3a', fx, fy + 4, 6, 2);
      g.globalAlpha = 0.9;
      R('#ffd070', fx + 2, fy + 8, 2, 2);
      g.globalAlpha = 1;
    }
  }
  seasonGround(nf, k);
  if (k != 6) {
    strip(110, 1.6, (x) => {
      R('#0e0806', WX + x, WY + 26, 2, WH - 26);
      R('#0e0806', WX + x - 4, WY + 30, 10, 1);
      for (let i = 0; i < 110; i += 3)
        R('#0e0806', WX + x + i, WY + 31 + Math.sin((Math.PI * i) / 110) * 4, 2, 1);
    });
  }
  if (k == 6) {
    const c = '#120a06';
    R(c, WX, WY + 7, WW, 3);
    R(c, WX, BY - 7, WW, 4);
    strip(52, 2.4, (x) => {
      for (let i = 0; i < 52; i++) {
        const y = WY + 10 + (i * (WH - 17)) / 52;
        R(c, WX + x + i, y, 2, 2);
        R(c, WX + x + i, WY + WH - 7 - (y - WY - 10) - 3, 2, 2);
      }
      R(c, WX + x, WY + 7, 3, WH - 13);
    });
  }
  if (k == 0 || k == 1 || k == 2 || k == 4 || k == 7 || k == 10) {
    strip(20, 3.2, (x) => R('#0b0807', WX + x, BY - 8, 2, 8));
    R('#0b0807', WX, BY - 7, WW, 1);
  }
  R('#0b0807', WX, BY - 2, WW, 2);
  const se = sea();
  if (se != 1 && rA < 0.95) {
    const c = ['#f4a8b8', 0, '#d8802a', '#fff'][se];
    g.globalAlpha = 0.8 * (1 - rA);
    for (const r of rs) {
      r.y += (se == 3 ? 18 : 11) * dt;
      r.x -= (se == 3 ? 6 : 16) * dt + Math.sin(T + r.y * 0.1) * 4 * dt;
      if (r.y > WH || r.x < 0) {
        r.x = rnd(0, WW + 40);
        r.y = -3;
      }
      R(c, WX + r.x, WY + r.y, se == 3 ? 1 : 2, 1);
    }
    g.globalAlpha = 1;
  }
  if (rA > 0.02) {
    g.globalAlpha = 0.25 * rA;
    for (const r of rs) {
      r.x -= 120 * dt;
      r.y += 190 * dt;
      if (r.y > WH || r.x < 0) {
        r.x = rnd(0, WW + 40);
        r.y = -4;
      }
      R('#dfe8e8', WX + r.x, WY + r.y, 1, 3);
    }
    g.globalAlpha = 1;
  }
  if (nf > 0.6 && (k == 1 || k == 2 || k == 4 || k == 8 || (k == 9 && sea() != 3)))
    for (const f of flies) {
      f.x += Math.sin(T * f.s * 0.3 + f.p) * 10 * dt - 4 * dt;
      f.y += Math.cos(T * 0.7 + f.p) * 6 * dt;
      if (f.x < 0) f.x = WW;
      const a = 0.5 + 0.5 * Math.sin(T * 2 + f.p * 3);
      g.globalAlpha = 0.2 * a;
      R('#d8ff70', WX + f.x - 1, WY + f.y - 1, 3, 3);
      g.globalAlpha = a;
      R('#f0ff90', WX + f.x, WY + f.y, 1, 1);
    }
  g.globalAlpha = 1;
  g.globalCompositeOperation = 'lighter';
  for (const p of fw) {
    g.globalAlpha = cl(p.l, 0, 1);
    R(p.c, WX + p.x, WY + p.y, 1, 1);
  }
  g.globalAlpha = 1;
  g.globalCompositeOperation = 'source-over';
  for (const o of fl) if (!o.in) g.drawImage(SP[o.k], Math.round(o.x), Math.round(o.y));
  if (onc) {
    const tx = WX + onc.x;
    R('#0e0806', tx, WY + 54, 170, 26);
    for (let i = 0; i < 12; i++) R('#ffd070', tx + 8 + i * 14, WY + 60, 8, 6);
    R('#1a1210', tx, WY + 80, 170, 2);
    if (onc.x < WW && onc.x > WW - 60) {
      g.globalAlpha = 0.12;
      R('#fff', WX, WY, WW, WH);
      g.globalAlpha = 1;
    }
  }
  if (tun > 0) {
    g.globalAlpha = tun;
    R('#060403', WX, WY, WW, WH);
    g.globalAlpha = tun * 0.9;
    strip(70, 3, (x) => R('#ffb050', WX + x, WY + 10, 10, 2));
    g.globalAlpha = 1;
  }
  {
    const tc = ['#ffb6c8', '#ffe070', '#e07a30', '#a8c8ff'][sea()];
    g.globalAlpha = 0.07;
    R(tc, WX, WY, WW, WH);
    g.globalAlpha = 1;
  }
  if (mA > 0.01) {
    g.globalAlpha = (0.32 + 0.06 * Math.sin(T * 0.4)) * mA;
    R('#e8dcc8', WX, WY + 36, WW, WH - 36);
    g.globalAlpha = 0.18 * mA;
    R('#f4ece0', WX, WY + 20, WW, 24);
    g.globalAlpha = 1;
  }
  if (flash > 0) {
    g.globalAlpha = Math.min(0.6, flash);
    R('#fff6e0', WX, WY, WW, WH);
    g.globalAlpha = 1;
  }
  if (xfT >= XF) SNAP.getContext('2d').drawImage(cv, WX, WY, WW, WH, 0, 0, WW, WH);
  else {
    // old view dissolves away while a mist veil rises, peaks and clears
    const u = xfT / XF,
      e = u * u * (3 - 2 * u),
      veil = Math.sin(Math.PI * u),
      mc = nf > 0.5 ? '#7a90a4' : '#e8dcc8';
    g.globalAlpha = 1 - e;
    g.drawImage(SNAP, WX, WY);
    for (let y = 0; y < WH; y += 3) {
      g.globalAlpha = veil * (0.18 + 0.5 * (y / WH));
      R(mc, WX, WY + y, WW, 3);
    }
    g.globalAlpha = 1;
  }
  g.restore();
}

function glass(dt) {
  const oy = 30 * opn;
  g.save();
  g.beginPath();
  g.rect(WX, WY + oy, WW, WH - oy);
  g.clip();
  const ref = 0.07 + 0.12 * tun + (ST[si].rain ? 0.03 : 0);
  g.globalCompositeOperation = 'lighter';
  glow(WX + 60, WY + 66, 45, 'rgba(255,170,70,' + ref + ')');
  glow(WX + 110, WY + 8, 40, 'rgba(255,170,70,' + ref * 0.7 + ')');
  g.globalAlpha = 0.05;
  for (let y = 0; y < WH; y += 2) R('#fff', WX + 30 - y * 0.55, WY + y, 32, 2);
  g.globalAlpha = 1;
  glow(WX, WY + WH, 50, 'rgba(255,230,200,' + (0.1 + (ST[si].rain ? 0.08 : 0)) + ')');
  glow(WX + WW, WY + WH, 40, 'rgba(255,230,200,.08)');
  g.globalCompositeOperation = 'source-over';
  g.globalAlpha = (0.42 + 0.08 * Math.sin(T * 0.5)) * (1 - opn * 0.85);
  g.drawImage(FOG, WX, WY);
  g.globalAlpha = 0.85;
  g.drawImage(DR, WX, WY);
  g.globalAlpha = 1;
  if (rA > 0.05 && Math.random() < dt * 14 * rA)
    drops.push({ x: rnd(0, WW), y: rnd(0, 30), v: rnd(6, 22), l: rnd(2, 5) | 0 });
  for (let i = drops.length - 1; i >= 0; i--) {
    const d = drops[i];
    d.y += d.v * dt;
    d.v *= 0.995;
    if (d.y > WH) drops.splice(i, 1);
    else {
      g.globalAlpha = 0.3;
      R('#e8f0f0', WX + d.x, WY + d.y - d.l, 1, d.l);
      g.globalAlpha = 0.7;
      R('#f4fafa', WX + d.x, WY + d.y, 1, 1);
    }
  }
  g.globalAlpha = 1;
  g.restore();
  if (oy > 1) {
    R('#2a1a10', WX, WY + oy, WW, 2);
    R('#6a8a8a', WX, WY + oy + 2, WW, 1);
    g.globalAlpha = 0.25;
    for (let i = 0; i < 6; i++)
      R('#fff', WX + WW - ((T * 400 + i * 53) % WW), WY + 3 + i * 4, 12, 1);
    g.globalAlpha = 1;
  }
}
