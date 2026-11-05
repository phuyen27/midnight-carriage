/**
 * Passenger sprite generation and per-frame passenger effects.
 */

function paxFx() {
  if (!pax || pax.st == 'in' || pax.st == 'leave') return;
  const d = pax.d,
    x = Math.round(pax.x),
    y = Math.round(
      pax.y + Math.sin(T * 1.6) * 0.6 + (pax.st == 'talk' ? Math.sin(T * 9) * 0.7 : 0),
    ),
    ph = T + d.n.length * 3,
    doze = pax.st == 'done' && stT > 22,
    ex = d.k == 'owl' ? [11, 18] : [11, 17],
    ey = d.k == 'h' ? 12 : 10;
  if (doze || ph % 4.3 < 0.14)
    ex.forEach((v) => {
      R(d.skin, x + v + 1, y + ey + 1, 2, 2);
      R('#1a0e08', x + v + 1, y + ey + 2, 2, 1);
    });
  if (doze) {
    const k = (T * 5) % 18;
    g.globalAlpha = 1 - k / 18;
    R('#f6e3bf', x + 24 + k / 3, y - k, 3, 1);
    R('#f6e3bf', x + 25 + k / 3, y + 1 - k, 1, 1);
    R('#f6e3bf', x + 24 + k / 3, y + 2 - k, 3, 1);
    g.globalAlpha = 1;
  } else if (pax.st != 'talk' && ph % 13 < 2.6) {
    R('#e8dcc0', x + 4, y + 24, 6, 4);
    R('#8a4a1a', x + 5, y + 24, 4, 1);
    g.globalAlpha = 0.5;
    R('#fff4e0', x + 6, y + 21 - (ph % 2) * 2, 1, 2);
    g.globalAlpha = 1;
  }
}

function mkPax(p) {
  const c = mkc(30, 40),
    x = c.getContext('2d'),
    f = (col, a, b, w, h) => {
      x.fillStyle = col;
      x.fillRect(a, b, w, h);
    };
  f(p.shirt, 5, 18, 20, 22);
  f('rgba(255,255,255,.18)', 5, 18, 20, 2);
  f('rgba(0,0,0,.25)', 21, 18, 4, 22);
  if (p.k == 'cat') {
    f(p.skin, 8, 4, 14, 14);
    f(p.skin, 8, 1, 3, 4);
    f(p.skin, 19, 1, 3, 4);
    f('#e8a090', 9, 2, 1, 2);
    f('#e8a090', 20, 2, 1, 2);
    f('rgba(0,0,0,.25)', 14, 4, 2, 3);
    f('rgba(0,0,0,.25)', 11, 5, 1, 2);
    f('rgba(0,0,0,.25)', 18, 5, 1, 2);
    f('#1a0e08', 11, 10, 2, 2);
    f('#1a0e08', 17, 10, 2, 2);
    f('#e08080', 14, 13, 2, 1);
    f('#1a0e08', 13, 14, 1, 1);
    f('#1a0e08', 16, 14, 1, 1);
    f('#fff6', 5, 12, 3, 1);
    f('#fff6', 22, 12, 3, 1);
  } else if (p.k == 'owl') {
    f(p.skin, 7, 3, 16, 15);
    f(p.skin, 7, 1, 3, 3);
    f(p.skin, 20, 1, 3, 3);
    f('#fff4d0', 9, 8, 5, 5);
    f('#fff4d0', 16, 8, 5, 5);
    f('#1a0e08', 11, 10, 2, 2);
    f('#1a0e08', 18, 10, 2, 2);
    f('#e8a030', 14, 13, 3, 3);
    f('#d8b080', 10, 15, 10, 2);
  } else {
    f(p.skin, 8, 5, 14, 14);
    f(p.hair, 7, 3, 16, 5);
    f(p.hair, 7, 8, 2, 6);
    f(p.hair, 21, 8, 2, 6);
    f('#1a0e08', 11, 12, 2, 2);
    f('#1a0e08', 17, 12, 2, 2);
    f('rgba(232,100,100,.5)', 10, 15, 2, 1);
    f('rgba(232,100,100,.5)', 18, 15, 2, 1);
    f('#8a3a2a', 13, 16, 4, 1);
    f('#8a3a2a', 12, 15, 1, 1);
    f('#8a3a2a', 17, 15, 1, 1);
  }
  if (p.acc == 'khan') {
    f('#e8c060', 6, 18, 18, 3);
    f(p.hair, 12, 1, 6, 3);
  }
  if (p.acc == 'beret') {
    f('#a83a2a', 6, 1, 18, 4);
    f('#a83a2a', 13, 0, 3, 2);
    f('#3a2414', 10, 11, 5, 1);
    f('#3a2414', 16, 11, 5, 1);
  }
  if (p.acc == 'lantern') {
    f(p.hair, 5, 9, 3, 6);
    f(p.hair, 22, 9, 3, 6);
    f('#e8503a', 22, 28, 6, 8);
    f('#ffd070', 23, 30, 4, 4);
  }
  if (p.acc == 'hat') {
    f('#6a4a2a', 6, 3, 18, 3);
    f('#6a4a2a', 9, 0, 12, 4);
    f('#d8d0c0', 11, 15, 8, 1);
  }
  return outline(c, '#1a0e08');
}

PX.forEach((p) => (p.spr = mkPax(p)));
