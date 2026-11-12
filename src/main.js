/**
 * Entry point: main loop and first-run messages.
 */

let last = performance.now();

function frame(n) {
  const dt = Math.min(0.05, (n - last) / 1000);
  last = n;
  update(dt);
  g.save();
  if (shk > 0) g.translate(0, ((T * 40) | 0) & 1);
  room(dt);
  g.restore();
  if (ES) {
    ES.t += dt;
    endDraw(dt);
    if (ES.t > 9) {
      $('book').style.display = 'flex';
      ES = null;
    }
  }
  requestAnimationFrame(frame);
}

requestAnimationFrame(frame);

toast('Chạm vào đèn, tách trà, rèm cửa, cửa sổ… hoặc nhặt vật nhỏ trôi qua', 4500);

setTimeout(() => toast('Mùa ' + SN[sea()] + ' · ' + stName(ST[si]), 3000), 5200);

if (si == 0) setTimeout(() => toast('Chuyện mùa ' + SN[sea()] + ': ' + SS[sea()][0], 9000), 9500);

if (!S.intro) {
  S.intro = 1;
  save();
  setTimeout(
    () =>
      say(
        'Lá thư dang dở',
        'Bạn đang ngồi trên chuyến tàu đêm, tay cầm một lá thư mới có dòng đầu: “Gửi người đã đợi ở ga cuối,”. Sáu hành khách ở đây mỗi người giữ một lời bạn chưa kịp nói. Nghe họ kể, mỗi người sẽ giúp bạn viết thêm một dòng. Tàu chạy hết bốn mùa thì tới ga cuối, bạn nghe được càng nhiều, lá thư càng đầy. (chạm để đóng)',
      ),
    6500,
  );
}
