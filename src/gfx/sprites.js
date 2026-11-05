/**
 * Pixel-art sprites generated from character grids, with automatic outlines.
 */

const mkc = (w, h) => {
  const c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  return c;
};

function outline(c, col) {
  const o = mkc(c.width + 2, c.height + 2),
    x = o.getContext('2d'),
    s = c.getContext('2d').getImageData(0, 0, c.width, c.height).data;
  x.fillStyle = col;
  const A = (i, j) =>
    i >= 0 && j >= 0 && i < c.width && j < c.height && s[(j * c.width + i) * 4 + 3] > 0;
  for (let j = -1; j <= c.height; j++)
    for (let i = -1; i <= c.width; i++)
      if (!A(i, j) && (A(i - 1, j) || A(i + 1, j) || A(i, j - 1) || A(i, j + 1)))
        x.fillRect(i + 1, j + 1, 1, 1);
  x.drawImage(c, 1, 1);
  return o;
}

function grid(rows, pal) {
  const c = mkc(rows[0].length, rows.length),
    x = c.getContext('2d');
  rows.forEach((r, j) =>
    [...r].forEach((ch, i) => {
      if (pal[ch]) {
        x.fillStyle = pal[ch];
        x.fillRect(i, j, 1, 1);
      }
    }),
  );
  return outline(c, '#1a0e08');
}

const IT = {
  leaf: {
    n: 'Lá thu',
    p: { a: '#c8862a', b: '#f0b34a' },
    g: ['...aa..', '..aaba.', '.aabaa.', '.aabaa.', '..aaa..', '...a...', '...a...'],
  },
  shell: {
    n: 'Vỏ sò',
    p: { a: '#e8a090', b: '#ffe0c8' },
    g: ['..aba..', '.abbba.', 'abbabba', 'aabaaba', '.aaaaa.', '..aaa..', '.......'],
  },
  ticket: {
    n: 'Vé tàu cũ',
    p: { a: '#d9c08a', b: '#f5ebc8' },
    g: ['.......', 'aaaaaaa', 'abbbbba', 'abababa', 'abbbbba', 'aaaaaaa', '.......'],
  },
  card: {
    n: 'Bưu thiếp',
    p: { a: '#c9b890', b: '#fff3d6', k: '#c8503a' },
    g: ['.......', 'aaaaaaa', 'abbbbka', 'abababa', 'abbbbba', 'aaaaaaa', '.......'],
  },
  gift: {
    n: 'Quà',
    p: { a: '#f0b34a', b: '#c0503a' },
    g: ['.a...a.', '..aaa..', 'bbbabbb', 'bbbabbb', 'bbbabbb', 'bbbabbb', '.......'],
  },
};

const SP = {};

for (const k in IT) SP[k] = grid(IT[k].g, IT[k].p);

function pine(w, h) {
  const c = mkc(w, h),
    x = c.getContext('2d'),
    m = w >> 1;
  for (let j = 0; j < h - 2; j++) {
    const hw = Math.min(m, Math.max(1, Math.round((j / (h - 2)) * m) + (j % 4 == 3 ? 1 : 0)));
    for (let i = m - hw; i <= m + hw; i++) {
      x.fillStyle = i < m ? '#2f5a3c' : '#1d3a2a';
      x.fillRect(i, j, 1, 1);
    }
  }
  x.fillStyle = '#4a2c18';
  x.fillRect(m, h - 2, 1, 2);
  return outline(c, '#0b1410');
}

const P1 = pine(9, 14),
  P2 = pine(13, 20);

const HS = (() => {
  const c = mkc(14, 11),
    x = c.getContext('2d');
  x.fillStyle = '#5a3a2a';
  x.fillRect(1, 5, 12, 6);
  x.fillStyle = '#8a3a2a';
  for (let j = 0; j < 5; j++) {
    const h = j + 2;
    x.fillRect(7 - h, j, h * 2, 1);
  }
  x.fillStyle = '#ffc65a';
  x.fillRect(3, 7, 3, 3);
  x.fillRect(8, 7, 3, 3);
  return outline(c, '#120a08');
})();

const RD = grid(
  ['.aaaaaaaaaaaa.', 'abbbbbbaccdcca', 'abbbbbbaccdcca', 'abbbbbbaeeeeea', '.aaaaaaaaaaaa.'],
  { a: '#5a3a22', b: '#2a1a10', c: '#c8a060', d: '#ffd070', e: '#8a5a2a' },
);

const CT = grid(
  [
    'a..a........',
    'aaaa........',
    'aeea........',
    'aaaa..aaa...',
    '.aaaaaaaaaa.',
    '.aabaabaaaaa',
    '.aaaaaaaaaab',
    '.aaa.aaa.aa.',
  ],
  { a: '#c89a5a', b: '#a87a3a', e: '#1a0e08' },
);

/** Returns a copy of sprite `c` with its bright pixels blended toward `tint` by `a` (0-1). */
function recolor(c, tint, a) {
  const o = mkc(c.width, c.height),
    x = o.getContext('2d');
  x.drawImage(c, 0, 0);
  if (!a) return o;
  const im = x.getImageData(0, 0, o.width, o.height),
    d = im.data,
    t = hex(tint);
  for (let i = 0; i < d.length; i += 4) {
    if (d[i + 3] && d[i] + d[i + 1] + d[i + 2] > 90)
      for (let j = 0; j < 3; j++) d[i + j] += (t[j] - d[i + j]) * a;
  }
  x.putImageData(im, 0, 0);
  return o;
}
