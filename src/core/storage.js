/**
 * Save data: defaults, loading from and writing to localStorage.
 */

const KEY = 'toatauDem1';

let S;

try {
  S = JSON.parse(localStorage.getItem(KEY));
} catch (e) {}

const DEF = () => ({
  stage: 0,
  items: {},
  stories: {},
  diary: [],
  lamp: true,
  snd: true,
  pi: 0,
  frag: {},
  intro: 0,
  fin: 0,
  loop: 0,
  gifted: {},
  ans: {},
  deco: {},
  radio: 0,
  order: [0, 1, 2, 3, 4, 5].sort(() => Math.random() - 0.5),
  st: { w: 0 },
  seen: {},
});

S = Object.assign(DEF(), S || {});

const save = () => {
  try {
    localStorage.setItem(KEY, JSON.stringify(S));
  } catch (e) {}
};
