/**
 * The small station that glides past the window, and its waiting figure.
 */

let stn = null,
  snT = rnd(8, 14);

const WL = [
  'Trên sân ga nhỏ, ai đó ôm chiếc ô chưa kịp mở, nhìn theo tàu.',
  'Dưới mái ga, một bóng người đếm tàu qua, rồi mỉm cười như chưa thất vọng.',
  'Người ấy ngồi dưới ngọn đèn, cúi viết gì đó rất lâu.',
  'Người ấy giấu lá thư vào áo, vẫy tay thật khẽ.',
];

const WP = [
  '',
  'Người ấy dường như nhận ra bạn, và nhìn theo lâu hơn lần trước.',
  'Lần này người ấy cầm theo một chiếc đèn nhỏ, như đã quen đợi chuyến tàu này.',
  'Người ấy chạy theo tàu vài bước, giơ cao một tờ giấy gấp.',
];

function seeStn() {
  const se = sea(),
    b = 1 << se,
    n = S.wsee | 0,
    nw = !(n & b),
    pg = Math.min(3, stn.pg | 0),
    q = [WL[se]];
  S.wsee = n | b;
  save();
  stn.hit = 1;
  if (WP[pg]) q.push(WP[pg]);
  if (nw) {
    const c = [0, 1, 2, 3].filter((i) => (S.wsee >> i) & 1).length;
    q.push(
      c < 4
        ? 'Bạn đã thấy người ấy ' + c + '/4 mùa'
        : 'Bạn đã thấy người ấy đủ bốn mùa. Trên lá thư ghim ở vách toa, một dòng chữ lạ vừa hiện ra.',
    );
  }
  q.forEach((m, i) => (i ? setTimeout(() => toast(m, 3600), i * 3800) : toast(m, 3600)));
  tone(660, 1.2, 0.04, 'sine');
}
