/**
 * Station stages, sky palettes and landscape parameters.
 */

const ST = [
  { n: 'Ga Sương Mù', k: 0, sky: 0, rain: 0 },
  { n: 'Ga Rừng Thông', k: 1, sky: 1, rain: 1 },
  { n: 'Ga Đồng Lúa', k: 2, sky: 1, rain: 0 },
  { n: 'Ga Biển Nhỏ', k: 3, sky: 1, rain: 0 },
  { n: 'Ga Làng Đèn Dầu', k: 4, sky: 1, rain: 1 },
  { n: 'Ga Phố Sáng Đèn', k: 5, sky: 1, rain: 0 },
  { n: 'Ga Cầu Dài', k: 6, sky: 2, rain: 0 },
];

const SKY = [
  { t: hex('#4a2a2a'), b: hex('#f09a48'), d: 0.35 },
  { t: hex('#06161a'), b: hex('#1d3a40'), d: 1 },
  { t: hex('#2a3a44'), b: hex('#f4a890'), d: 0.4 },
];

const LC = {
  far: [hex('#7a4a46'), hex('#22383c')],
  mid: [hex('#4a3030'), hex('#183036')],
  near: [hex('#2a1e1c'), hex('#0f1e20')],
};

const KP = [
  { fa: 26, ma: 14, pk: 1 },
  { fa: 16, ma: 10 },
  { fa: 5, ma: 4 },
  { fa: 7, ma: 0 },
  { fa: 12, ma: 7 },
  { fa: 6, ma: 3 },
  { fa: 5, ma: 0 },
];

const LEN = 48;

/** Per-season landscape palettes: [day, night] colours per layer, sky tint, foliage tint. */
const SEAS = [
  {
    far: ['#9a6a7a', '#2a3a44'],
    mid: ['#6a8a58', '#1c3a34'],
    near: ['#4e8a44', '#12301f'],
    sky: '#ffc8d8',
    foliage: '#f4a8b8',
    fa: 0.45,
  },
  {
    far: ['#4a7a6a', '#1c3a3c'],
    mid: ['#2e7a3e', '#143a26'],
    near: ['#1f6a2a', '#0c2616'],
    sky: '#8ac8ff',
    foliage: '#4a9a3a',
    fa: 0,
  },
  {
    far: ['#a0602a', '#3a2a24'],
    mid: ['#b8742e', '#3a2618'],
    near: ['#8a4a16', '#24160e'],
    sky: '#ffb070',
    foliage: '#d8802a',
    fa: 0.6,
  },
  {
    far: ['#b8c4d4', '#2c3c4c'],
    mid: ['#dde4ee', '#34465a'],
    near: ['#f0f4f8', '#4a5e72'],
    sky: '#c8d4e4',
    foliage: '#ffffff',
    fa: 0.75,
  },
].map((s) => {
  for (const k of ['far', 'mid', 'near']) s[k] = s[k].map(hex);
  s.sky = hex(s.sky);
  return s;
});

/** Season-tinted tree sprites: TR[season] = [small, tall]. */
const TR = SEAS.map((s) => [recolor(P1, s.foliage, s.fa), recolor(P2, s.foliage, s.fa)]);

/** Snow-dusted house sprite for winter. */
const HSW = recolor(HS, '#ffffff', 0.45);

/** House variants so a village is never a row of identical cottages. */
const HSV = [HS, recolor(HS, '#5a86b4', 0.42), recolor(HS, '#d6b45c', 0.38), recolor(HS, '#7a9a5a', 0.4)];
const HSWV = HSV.map((h) => recolor(h, '#ffffff', 0.45));
