/**
 * Procedural audio: ambience, chords and sound effects (Web Audio).
 */

const CHM = [1.122, 1, 0.89, 0.794],
  CHS = { get: (i) => CH.map((c) => c.map((f) => f * CHM[i])) },
  RNm = ['Theo mùa', 'Nhạc xuân', 'Đêm đông', 'Tắt đài'];

let AC,
  MG,
  NB,
  rainG,
  windG,
  ci = 0,
  ac = 0;

const CH = [
    [174.6, 220, 261.6, 329.6],
    [164.8, 196, 246.9, 293.7],
    [146.8, 174.6, 220, 261.6],
    [130.8, 164.8, 196, 246.9],
  ],
  PE = [523, 587, 659, 784, 880];

function noise(type, f0, f1, dur, vol, delay) {
  if (!AC) return;
  const t = AC.currentTime + (delay || 0),
    s = AC.createBufferSource(),
    fl = AC.createBiquadFilter(),
    gn = AC.createGain();
  s.buffer = NB;
  fl.type = type;
  fl.frequency.setValueAtTime(f0, t);
  fl.frequency.exponentialRampToValueAtTime(f1, t + dur);
  gn.gain.setValueAtTime(vol, t);
  gn.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  s.connect(fl);
  fl.connect(gn);
  gn.connect(MG);
  s.start(t, Math.random());
  s.stop(t + dur + 0.05);
}

function tone(f, dur, vol, type, delay, att) {
  if (!AC) return;
  const t = AC.currentTime + (delay || 0),
    o = AC.createOscillator(),
    gn = AC.createGain();
  o.type = type || 'sine';
  o.frequency.value = f;
  gn.gain.setValueAtTime(0.0001, t);
  gn.gain.linearRampToValueAtTime(vol, t + (att || 0.01));
  gn.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  o.connect(gn);
  gn.connect(MG);
  o.start(t);
  o.stop(t + dur + 0.05);
}

const clack = (d) => noise('lowpass', 320, 90, 0.09, 0.12, d),
  bell = () => {
    tone(880, 1.8, 0.12);
    tone(660, 1.8, 0.1, 'sine', 0.35);
    tone(880, 1.4, 0.08, 'sine', 0.7);
  },
  plink = () => {
    tone(1320, 0.25, 0.08);
    tone(1760, 0.3, 0.06, 'sine', 0.08);
  };

function chord() {
  if (!AC || S.radio == 3) return;
  (S.radio == 0 ? CHS.get(sea()) : CHS.get(S.radio == 1 ? 0 : 3))[ci++ % 4].forEach((f, i) =>
    tone(f, 4.2, 0.02, 'triangle', i * 0.04, 0.6),
  );
  if (Math.random() < 0.8) tone(PE[(Math.random() * 5) | 0], 1.8, 0.012, 'sine', 1.2);
  if (Math.random() < 0.6) tone(PE[(Math.random() * 5) | 0], 1.8, 0.012, 'sine', 2.4);
}

function initAudio() {
  if (AC) {
    if (AC.state == 'suspended') AC.resume();
    return;
  }
  try {
    AC = new (window.AudioContext || window.webkitAudioContext)();
  } catch (e) {
    return;
  }
  MG = AC.createGain();
  MG.gain.value = S.snd ? 0.9 : 0;
  MG.connect(AC.destination);
  NB = AC.createBuffer(1, AC.sampleRate * 2, AC.sampleRate);
  const d = NB.getChannelData(0);
  for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
  const loop = (f, q) => {
    const s = AC.createBufferSource(),
      fl = AC.createBiquadFilter(),
      gn = AC.createGain();
    s.buffer = NB;
    s.loop = true;
    fl.type = 'bandpass';
    fl.frequency.value = f;
    fl.Q.value = q;
    gn.gain.value = 0;
    s.connect(fl);
    fl.connect(gn);
    gn.connect(MG);
    s.start();
    return gn;
  };
  rainG = loop(3500, 0.5);
  windG = loop(600, 0.7);
  setInterval(() => {
    clack(0);
    clack(0.17);
    if (spd > 0.5) shk = 0.07;
  }, 900);
  chord();
  setInterval(chord, 3600);
}
