/**
 * Scripted one-off moments at particular stations, so a journey is not four copies of the
 * same rhythm. Each event fires once per visit: { s: season, i: station slot, t: seconds
 * after arrival, run }.
 */

/** While > 0 the train stands still (see update()). */
let stopT = 0;

const EV = [
  {
    // spring: the lights die and a voice speaks (the first hint that someone is waiting)
    s: 0,
    i: 3,
    t: 22,
    run() {
      tunA = 5.5;
      tunnelStart();
      setTimeout(() => toast('Trong bóng tối, ai đó thì thầm: “Đến rồi à?”', 4200), 3200);
    },
  },
  {
    // summer: the train halts mid-festival; a ticket drifts past the window
    s: 1,
    i: 4,
    t: 18,
    run() {
      stopT = 6;
      shk = 0.5;
      bell();
      fwT = 0;
      toast('Tàu khựng lại giữa tiếng pháo. Ngoài kia ai cũng vẫy tay, như đang chào bạn.', 5000);
      fl.push({ k: 'ticket', x: WX + WW, y: rnd(WY + 20, WY + 50), vx: -30, ph: 0, in: 0 });
    },
  },
  {
    // autumn: a gust of leaves, a small race to catch them
    s: 2,
    i: 3,
    t: 18,
    run() {
      toast('Gió thu cuốn một trận lá qua cửa sổ. Nhặt nhanh kẻo trôi mất!', 4000);
      for (let i = 0; i < 6; i++)
        setTimeout(
          () =>
            fl.push({
              k: 'leaf',
              x: WX + WW,
              y: rnd(WY + 14, WY + 64),
              vx: -rnd(45, 75),
              ph: rnd(0, 6),
              in: 0,
            }),
          i * 700,
        );
    },
  },
  {
    // winter: the train stops on the ice, a skater waves with a folded umbrella
    s: 3,
    i: 2,
    t: 20,
    run() {
      stopT = 5;
      shk = 0.3;
      tone(660, 1.2, 0.04, 'sine');
      toast('Tàu dừng giữa hồ băng. Một người trượt qua, ô gấp dưới tay, vẫy về phía bạn.', 5000);
      setTimeout(() => toast('Chiếc vé trong túi áo ấm lên.', 3200), 5400);
    },
  },
];

function eventsUpdate() {
  const q = ST[si];
  if (q.evd || ES || tun > 0 || tunA > 0) return;
  const e = EV.find((o) => o.s == sea() && o.i == si);
  if (e && stT > e.t && stT < LEN - 8) {
    q.evd = 1;
    e.run();
  }
}
