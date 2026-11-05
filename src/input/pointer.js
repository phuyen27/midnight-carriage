/**
 * Pointer input: hit testing for the room and doodling on the glass.
 */

function tap(px, py) {
  initAudio();
  for (const o of fl)
    if (Math.abs(px - o.x - 4) < 10 && Math.abs(py - o.y - 4) < 10) {
      collect(o);
      return;
    }
  if (
    pax &&
    pax.st != 'leave' &&
    px > pax.x - 4 &&
    px < pax.x + 34 &&
    py > pax.y - 4 &&
    py < pax.y + 44
  ) {
    talk();
    return;
  }
  if (stn && curt < 0.5) {
    const fx = WX + stn.x + 70 + (stn.fo || 0);
    if (px > fx - 8 && px < fx + 16 && py > 80 && py < 116) {
      seeStn();
      return;
    }
  }
  if (catTap(px, py)) return;
  const I = (a, b, w, h) => px >= a && px < a + w && py >= b && py < b + h;
  if (I(80, 114, 24, 26)) {
    S.lamp = !S.lamp;
    save();
    noise('bandpass', 2000, 800, 0.05, 0.1);
  } else if (I(130, 122, 26, 16)) {
    noise('lowpass', 900, 2600, 1.3, 0.18);
    for (let i = 0; i < 8; i++)
      steam.push({ x: 142 + rnd(-3, 3), y: 126 - i * 2, a: 1, v: rnd(8, 16) });
    if (S.deco.tea) toast('Pha ' + S.deco.tea.toLowerCase() + ', hương thơm lan khắp toa');
  } else if (I(160, 126, 28, 12)) {
    say('Quyển sách cũ', BOOK[bookI++ % 4]);
    setTimeout(hideSay, 4500);
  } else if (I(190, 126, 22, 12)) {
    $('note').style.display = 'flex';
  } else if (I(LB.x - 2, LB.y - 4, LB.w + 4, LB.h + 6)) {
    plink();
    openBook();
  } else if (curtT ? I(44, 16, 232, 100) : I(0, 16, 58, 100) || I(262, 16, 58, 100)) {
    curtT = curtT ? 0 : 1;
    noise('lowpass', 1500, 400, 0.5, 0.12);
  } else if (I(110, 104, 80, 16)) {
    opnT = opnT ? 0 : 1;
    noise('bandpass', 500, 300, 0.4, 0.12);
  } else if (I(100, 127, 16, 9)) {
    S.radio = (S.radio + 1) % 4;
    save();
    toast('Đài: ' + RNm[S.radio]);
    plink();
  } else if (I(140, 0, 40, 18)) {
    sw = 7;
    noise('bandpass', 1200, 500, 0.2, 0.08);
  } else if (I(60, 124, 14, 14)) {
    plink();
    toast(
      ['Cây nảy chồi non', 'Cây xanh mướt dưới đèn', 'Lá cây ngả vàng', 'Cây được ủ ấm trong toa'][
        sea()
      ],
    );
  } else if (I(70, 24, 180, 80)) {
    dd = 1;
    doodle(px, py);
  }
}

cv.addEventListener('pointerdown', (e) => {
  const r = cv.getBoundingClientRect();
  tap(((e.clientX - r.left) / r.width) * W, ((e.clientY - r.top) / r.height) * H);
});

let dd = 0,
  sw = 0,
  fdT = 0;

function doodle(px, py) {
  const x = DR.getContext('2d');
  x.fillStyle = '#fff6e8';
  x.fillRect(Math.round(px - WX) - 1, Math.round(py - WY) - 1, 2, 2);
}

cv.addEventListener('pointermove', (e) => {
  if (!dd) return;
  const r = cv.getBoundingClientRect(),
    px = ((e.clientX - r.left) / r.width) * W,
    py = ((e.clientY - r.top) / r.height) * H;
  if (px > WX && px < WX + WW && py > WY && py < WY + WH) doodle(px, py);
});

addEventListener('pointerup', () => {
  dd = 0;
});
