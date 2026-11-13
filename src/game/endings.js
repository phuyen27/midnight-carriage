/**
 * Ending selection and the ending cutscene.
 */

function endDraw(dt) {
  const t = ES.t,
    e = ES.e,
    u = Math.min(1, t / 8),
    a = Math.min(1, t / 1.2) * (t > 8 ? Math.max(0, 9 - t) : 1);
  g.globalAlpha = a;
  for (let y = 0; y < H; y += 3) {
    g.fillStyle = rgb(mixA(hex('#2a1810'), hex('#f6b070'), u * (0.5 + (y / H) * 0.5)));
    g.fillRect(0, y, W, 3);
  }
  g.globalCompositeOperation = 'lighter';
  glow(160, 128 - Math.round(u * 18), 70, 'rgba(255,200,120,' + (0.7 * u).toFixed(2) + ')');
  g.globalCompositeOperation = 'source-over';
  R('#1a0e08', 0, 128, W, 52);
  R('#3a2414', 0, 126, W, 2);
  for (let x = 0; x < W; x += 16) R('#2a1a10', x + ((((t * -30) % 16) + 16) % 16), 132, 8, 2);
  const X = 236;
  R('#1a0e08', X, 104, 6, 22);
  R('#1a0e08', X + 1, 98, 4, 5);
  if (e == 8)
    for (let i = 0; i < 6; i++) {
      g.globalCompositeOperation = 'lighter';
      glow(70 + i * 36, 112 - ((t * 9 + i * 11) % 70), 16, 'rgba(255,200,120,.55)');
      g.globalCompositeOperation = 'source-over';
    }
  if (e == 0 || e == 4 || e == 7 || e == 8) {
    g.globalCompositeOperation = 'lighter';
    glow(X + 9, 112, 24, 'rgba(255,190,90,.6)');
    g.globalCompositeOperation = 'source-over';
    R('#ffd070', X + 8, 110, 3, 4);
  }
  if (e == 1 || e == 5) {
    g.globalAlpha = a * 0.35;
    R('#e8dcc8', 0, 110, W, 30);
    g.globalAlpha = a;
  }
  if (e == 6)
    for (let i = 0; i < 40; i++) {
      R('#ffd9a0', 160 - i * 2, 128 + i, 1, 1);
      R('#ffd9a0', 160 + i * 2, 128 + i, 1, 1);
    }
  if (e == 2 || e == 3) {
    g.globalAlpha = a * Math.max(0, (t - 4) / 4) * 0.5;
    R('#fff4e0', 0, 0, W, H);
    g.globalAlpha = a;
  }
  R('#120a06', 0, 0, W, 12);
  R('#120a06', 0, H - 12, W, 12);
  g.globalAlpha = 1;
}

function finale() {
  S.fin = 1;
  const fk = Object.keys(S.frag).length,
    ks = new Set(Object.values(S.items).map((o) => o.k));
  const br = Object.values(S.ans).filter((v) => v === 0).length; // brave answers
  let e;
  if (PX.every((p) => secretOK(p.n))) e = 8;
  else if ((S.wsee | 0) == 15 && fk >= 6 && S.seen[6]) e = 7;
  else if (fk >= 6 && ['leaf', 'shell', 'ticket', 'card', 'gift'].every((k) => ks.has(k))) e = 6;
  // otherwise the ending follows how much of the letter was written, and how boldly
  else if (fk >= 6) e = br >= 4 ? 4 : br >= 2 ? 0 : 1;
  else if (fk >= 4) e = S.diary.length ? 0 : 2;
  else if (fk >= 2) e = 3;
  else e = fk == 1 ? 1 : 5;
  S.seen[e] = 1;
  S.lastEnd = e;
  save();
  $('bk').innerHTML =
    '<h3>Chiếc vé</h3><p>' +
    esc(TK[4]) +
    '</p><h3>Lá thư bạn đã viết</h3>' +
    letterHTML(1) +
    '<h3>' +
    esc(EN[e][0]) +
    '</h3><p>' +
    esc(EN[e][1]) +
    '</p><p><i>Kết thúc ' +
    Object.keys(S.seen).length +
    '/9. Bấm Chơi lại để đi một chuyến khác: nghe thêm lời ai, lá thư sẽ đổi.</i></p>' +
    '<h3>Nói chuyện với hành khách</h3><div id="ft"><p>Chạm vào một người để trò chuyện.</p></div>' +
    PX.map((p) => '<span class="who" data-w="' + esc(p.n) + '">' + esc(p.n) + '</span>').join('');
  ES = { e, t: 0 };
}
