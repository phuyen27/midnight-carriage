/**
 * Seasonal decorations and the shelf/lamp/tea/wall slots.
 */

const SCOL = () =>
  [
    ['#8a3a52', '#a85470', '#6a2640', '#b85a78'],
    ['#3a6a48', '#4a8a5a', '#2a5236', '#5a9a6a'],
    ['#9a5a22', '#b8742e', '#7a4216', '#c8843a'],
    ['#7a2a2e', '#9a3a3e', '#5a1c20', '#aa4a4e'],
  ][sea()];

function sdec() {
  const s = sea();
  if (s == 0) {
    R('#5a3a22', 8, 22, 1, 28);
    R('#5a3a22', 8, 36, 12, 1);
    R('#5a3a22', 19, 30, 1, 7);
    for (let i = 0; i < 14; i++) {
      g.globalAlpha = 0.6 + 0.4 * Math.sin(T + i);
      R(i % 3 ? '#f4a8b8' : '#fff0f4', 6 + ((i * 7) % 16), 26 + ((i * 5) % 22), 2, 2);
    }
    g.globalAlpha = 1;
  } else if (s == 1) {
    for (let i = 0; i < 9; i++)
      R(
        i % 2 ? '#f0d890' : '#d8a040',
        10 + i * 2,
        26 + Math.abs(i - 4) * 2,
        2,
        10 - Math.abs(i - 4),
      );
    R('#5a3a22', 19, 38, 2, 10);
  } else if (s == 2) {
    for (let a = 0; a < 16; a++)
      R(
        ['#c8502a', '#d8802a', '#e8b040'][a % 3],
        Math.round(22 + Math.cos((a / 16) * 6.28) * 10),
        Math.round(36 + Math.sin((a / 16) * 6.28) * 10),
        3,
        3,
      );
  } else {
    R('#3a2a1a', 18, 22, 2, 2);
    for (let i = 0; i < 10; i++) R(i % 2 ? '#c83a3a' : '#f4ece0', 16, 24 + i * 3, 6, 3);
    R('#c83a3a', 22, 48, 4, 8);
  }
}

const slotOf = (n) =>
    /đèn|Đèn|lồng|Lồng/.test(n)
      ? 'lamp'
      : /trà/.test(n)
        ? 'tea'
        : /phác thảo|Bưu thiếp/.test(n)
          ? 'wall'
          : 'shelf',
  isD = (n) => {
    const D = S.deco;
    return D.lamp == n || D.tea == n || D.wall == n || (D.shelf || []).includes(n);
  };

function toggleDeco(n) {
  const o = S.items[n];
  if (!o) return;
  const s = slotOf(n),
    D = S.deco;
  if (s == 'shelf') {
    const a = (D.shelf = D.shelf || []),
      i = a.indexOf(n);
    if (i >= 0) a.splice(i, 1);
    else if (a.length < 5) a.push(n);
    else {
      toast('Giá hành lý đã đầy, hãy cất bớt một món');
      return;
    }
  } else D[s] = D[s] == n ? null : n;
  save();
  plink();
}

function decoDraw() {
  const D = S.deco;
  if (D.lamp) {
    R('#2a1a10', 292, 16, 1, 10);
    R('#e8503a', 288, 26, 9, 10);
    R('#ffd070', 290, 28, 5, 6);
    R('#c8402a', 288, 36, 9, 1);
  }
  if (D.tea) {
    R('#8a6a3a', 122, 131, 9, 5);
    R('#e8d8a0', 123, 132, 7, 1);
  }
  if (D.wall && S.items[D.wall]) {
    R('#3a2414', 70, 1, 14, 12);
    g.drawImage(SP[S.items[D.wall].k], 72, 2);
  }
  (D.shelf || []).forEach((n, i) => {
    const o = S.items[n];
    if (o) g.drawImage(SP[o.k], [92, 112, 196, 216, 236][i], 3);
  });
}
