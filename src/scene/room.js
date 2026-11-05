/**
 * The carriage interior: furniture, lighting and passengers.
 */

function room(dt) {
  R('#4a2e1e', 0, 0, W, H);
  for (let x = 0; x < W; x += 16) {
    R('#3c2418', x, 0, 1, H);
    R('#573623', x + 1, 0, 1, H);
  }
  R('#2e1a10', 0, 0, W, 14);
  R('#6a4428', 0, 14, W, 1);
  R('#b8863a', 6, 12, 308, 2);
  for (let x = 20; x < W; x += 70) R('#8a5a2a', x, 14, 2, 6);
  R('#7a4a2a', 24, 3, 34, 9);
  R('#9a6438', 24, 3, 34, 1);
  R('#3a2414', 38, 1, 6, 2);
  R('#4a5a3a', 250, 4, 28, 8);
  R('#6a7a4a', 250, 4, 28, 1);
  R('#3a2314', 0, 118, W, 62);
  R('#6a4428', 0, 118, W, 1);
  outside(dt);
  glass(dt); // glass + rain sit behind the curtains
  R('#3a2314', 52, 18, 216, 4);
  R('#3a2314', 52, 18, 4, 98);
  R('#3a2314', 264, 18, 4, 98);
  R('#6a4428', 48, 112, 224, 6);
  R('#8a5a30', 48, 112, 224, 1);
  R('#b8863a', 150, 110, 20, 3);
  if (sea() == 3) {
    // window-sill snow is drawn before the seat so it never covers it
    R('#f4f8f8', 48, 110, 224, 2);
    for (let x = 52; x < 270; x += 14) R('#fff', x, 109, 6, 1);
  }
  furnSill();
  const cw = lerp(24, 106, curt),
    sv = 1 + opn * 2.5;
  for (let s = 0; s < 2; s++)
    for (let i = 0; i < cw; i++) {
      const u = s ? i : cw - 1 - i,
        xx = s ? W - 44 - cw + i + 8 : 44 + i;
      void u;
      const yb = 116 + Math.sin(T * 1.5 + i * 0.4) * sv;
      R(
        (i + (s ? 0 : 3)) % 6 < 3 ? '#a8402e' : '#8a3022',
        s ? 276 - cw + i : 44 + i,
        18,
        1,
        yb - 18,
      );
    }
  R('#b8863a', 40, 16, 240, 2);
  R('#e8b050', 44 + cw - 2, 60, 3, 12);
  R('#e8b050', 276 - cw - 1, 60, 3, 12);
  R(SCOL()[0], 210, 92, 62, 60);
  R(SCOL()[1], 210, 92, 62, 2);
  for (let i = 0; i < 3; i++) R('#4a1410', 224 + i * 18, 110, 2, 2);
  furnSeat();
  if (pax) {
    const y = pax.y + Math.sin(T * 1.6) * 0.6 + (pax.st == 'talk' ? Math.sin(T * 9) * 0.7 : 0);
    g.drawImage(pax.d.spr, Math.round(pax.x), Math.round(y));
    if (pax.st == 'wait') {
      const b = Math.sin(T * 3) > 0 ? 0 : -1;
      R('#f6e3bf', pax.x + 8, pax.y - 10 + b, 14, 7);
      R('#1a0e08', pax.x + 11, pax.y - 7 + b, 2, 1);
      R('#1a0e08', pax.x + 15, pax.y - 7 + b, 2, 1);
      R('#1a0e08', pax.x + 19, pax.y - 7 + b, 2, 1);
    }
  }
  R('#7a4a2a', 58, 136, 150, 6);
  R('#9a6438', 58, 136, 150, 1);
  R('#4a2a18', 58, 142, 150, 2);
  g.drawImage(PL, 60, 126);
  const on = S.lamp;
  R('#b8863a', 90, 126, 2, 10);
  R('#8a5a2a', 86, 134, 10, 2);
  for (let j = 0; j < 8; j++)
    R(on ? '#f0b34a' : '#6a5a3a', Math.round(91 - (5 + j * 0.5)), 118 + j, 10 + j, 1);
  R(on ? '#ffe0a0' : '#8a7a5a', 87, 118, 8, 1);
  R('#e8dcc0', 134, 134, 16, 2);
  R('#e8dcc0', 136, 128, 12, 6);
  R('#8a4a1a', 137, 129, 10, 1);
  R('#b8a888', 136, 133, 12, 1);
  R('#e8dcc0', 148, 130, 3, 3);
  R('#3a5a3a', 162, 131, 24, 5);
  R('#5a8a5a', 162, 131, 24, 1);
  R('#f0e0b8', 163, 135, 22, 1);
  R('#7a2a2a', 192, 131, 16, 5);
  R('#e8c060', 200, 131, 2, 5);
  steamT += dt;
  if (steamT > 0.28) {
    steamT = 0;
    steam.push({ x: 142, y: 127, a: 1, v: rnd(9, 13) });
  }
  for (let i = steam.length - 1; i >= 0; i--) {
    const s = steam[i];
    s.y -= s.v * dt;
    s.a -= dt * 0.5;
    s.x += Math.sin(T * 2 + s.y * 0.3) * 5 * dt;
    if (s.a <= 0) steam.splice(i, 1);
    else {
      g.globalAlpha = s.a * 0.5;
      R('#fff4e0', s.x, s.y, 2, 2);
    }
  }
  g.globalAlpha = 1;
  const bx = 160 + Math.sin(T * 1.1) * (2 + sw);
  R('#222', bx, 0, 1, 12);
  R('#ffe0a0', bx - 1, 12, 3, 3);
  R(SCOL()[2], 0, 156, W, 24);
  R(SCOL()[3], 0, 156, W, 2);
  for (let x = 14; x < W; x += 28) R('#3a1410', x, 166, 2, 2);
  furnFloor();
  R('#4a2a18', 0, 146, 18, 34);
  R('#6a4428', 0, 146, 18, 2);
  for (const o of fl)
    if (o.in) {
      g.drawImage(SP[o.k], Math.round(o.x), Math.round(o.y));
      if (Math.sin(T * 4 + o.ph) > 0) R('#fff3c8', o.x + 8, o.y - 2, 1, 1);
    }
  for (const p of pt) {
    g.globalAlpha = cl(p.l, 0, 1);
    R('#fff3c8', p.x, p.y, 2, 2);
  }
  g.globalAlpha = 1;
  for (let x = 6; x < W - 4; x++)
    R('#1a0e06', x, 17 + Math.round(3 * Math.sin((((x - 6) % 62) / 62) * Math.PI)), 1, 1);
  const FC = ['#ffd070', '#ff9a5a', '#fff0b0', '#e8c870'];
  for (let k = 0, x = 11; x < W - 6; x += 10, k++) {
    const y = 17 + Math.round(3 * Math.sin((((x - 6) % 62) / 62) * Math.PI));
    g.globalAlpha = 0.65 + 0.35 * Math.sin(T * 2 + k * 1.7);
    R(FC[k % 4], x, y + 1, 2, 2);
  }
  g.globalAlpha = 1;
  g.globalCompositeOperation = 'lighter';
  for (let k = 0, x = 11; x < W - 6; x += 10, k++) {
    const y = 17 + Math.round(3 * Math.sin((((x - 6) % 62) / 62) * Math.PI));
    glow(x + 1, y + 2, 8, 'rgba(255,170,70,' + (0.16 + 0.1 * Math.sin(T * 2 + k * 1.7)) + ')');
  }
  g.globalCompositeOperation = 'source-over';
  for (const d of DU) {
    d.x += Math.sin(T * 0.4 + d.p) * 3 * dt;
    d.y -= 2 * dt;
    if (d.y < 30) d.y = 140;
    g.globalAlpha = (S.lamp ? 0.4 : 0.12) * (0.5 + 0.5 * Math.sin(T + d.p * 3));
    R('#ffe0a0', d.x, d.y, 1, 1);
  }
  g.globalAlpha = 1;
  sdec();
  decoDraw();
  letterDraw();
  g.drawImage(RD, 100, 129);
  if (S.radio != 3) {
    g.globalAlpha = 0.6 + 0.4 * Math.sin(T * 3);
    R('#ffd070', 104, 131, 2, 2);
    g.globalAlpha = 1;
  }
  catDraw();
  paxFx();
  g.globalCompositeOperation = 'lighter';
  if (S.deco.lamp) glow(292, 32, 45, 'rgba(255,170,60,.3)');
  g.globalCompositeOperation = 'source-over';
  /* lighting */
  g.fillStyle = 'rgba(8,4,2,' + (S.lamp ? 0.16 : 0.34) + ')';
  g.beginPath();
  g.rect(0, 0, W, H);
  g.rect(WX, WY, WW, WH);
  g.fill('evenodd');
  g.globalCompositeOperation = 'lighter';
  glow(bx, 16, 150, 'rgba(255,170,70,.2)');
  if (S.lamp) {
    glow(91, 122, 115, 'rgba(255,170,60,.36)');
    glow(91, 142, 65, 'rgba(255,200,100,.26)');
    glow(142, 128, 24, 'rgba(255,190,90,.12)');
  }
  if (pax && pax.d.glow && pax.st != 'leave')
    glow(pax.x + 25, pax.y + 32, 50, 'rgba(255,170,60,.3)');
  g.globalCompositeOperation = 'source-over';
  tunnelFx();
  const v = g.createRadialGradient(160, 90, 70, 160, 90, 210);
  v.addColorStop(0, 'rgba(0,0,0,0)');
  v.addColorStop(1, 'rgba(0,0,0,.55)');
  g.fillStyle = v;
  g.fillRect(0, 0, W, H);
}

let steamT = 0;
