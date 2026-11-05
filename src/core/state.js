/**
 * Mutable runtime state (timers, particles, weather, ending state).
 */

const DU = Array.from({ length: 14 }, (_, i) => ({
  x: 60 + hs(i) * 170,
  y: 40 + hs(i + 50) * 100,
  p: hs(i + 9) * 6,
}));

let ES = null,
  wx = 0,
  flT = 5,
  flash = 0;

let T = 0,
  sc = 0,
  si = cl(S.stage | 0, 0, 6),
  stT = 0,
  prevSky = ST[si].sky,
  spd = 1,
  curt = 0,
  curtT = 0,
  opn = 0,
  opnT = 0,
  shk = 0,
  spT = 8,
  pax = null,
  fl = [],
  pt = [],
  drops = [],
  steam = [],
  fw = [],
  flies = [],
  birds = [],
  rs = [],
  tun = 0,
  tunT = rnd(50, 80),
  onc = null,
  oncT = rnd(40, 70),
  fwT = 2,
  bdT = 6,
  bookI = 0;

const stars = Array.from({ length: 44 }, (_, i) => [hs(i), hs(i + 99), hs(i + 7)]);

for (let i = 0; i < 16; i++)
  flies.push({ x: rnd(0, 208), y: rnd(55, 86), p: rnd(0, 6), s: rnd(4, 10) });

for (let i = 0; i < 40; i++) rs.push({ x: rnd(0, 208), y: rnd(0, 90) });
