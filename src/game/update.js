/**
 * Per-frame simulation: stage changes, passengers, particles, events.
 */

function nextStage() {
  const was = si,
    s0 = sea();
  prevSky = ST[si].sky;
  si = (si + 1) % 7;
  stT = 0;
  S.stage = si;
  if (si == 0) S.loop = (S.loop | 0) + 1;
  save();
  bell();
  const s1 = sea();
  toast(
    (si == 0 ? 'Mùa ' + SN[s1] + ' · ' : 'Đến ') +
      (si == 3 && s1 == 1 ? ST[si].n.slice(0, -1) + '▒' : ST[si].n),
    3500,
  );
  vs = stageSeed();
  xfT = 0;
  const b = [0, 3, 6].indexOf(si);
  if (b >= 0) setTimeout(() => toast('Chuyện mùa ' + SN[s1] + ': ' + SS[s1][b], 9000), 4200);
  if (si == 5 && s1 == 3) setTimeout(() => toast(TH[S.truth], 4200), 4200);
  if (was == 6 && s0 == 3 && !S.fin) setTimeout(finale, 2500);
  const q = ST[si];
  if (q.r0 === undefined) q.r0 = q.rain;
  wx = Math.random() < 0.35 ? 1 : 0;
  if (q.r0 && Math.random() < 0.4) wx = 2;
  q.rain = wx == 2 ? 1 : q.r0;
  if (wx)
    setTimeout(
      () =>
        toast(wx == 1 ? 'Sương xuống dày ngoài cửa sổ' : 'Sấm rền xa xa, trời sắp mưa lớn', 3500),
      1500,
    );
}

function update(dt) {
  T += dt;
  stT += dt;
  xfT += dt;
  rA += ((ST[si].rain ? 1 : 0) - rA) * Math.min(1, dt * 0.7);
  mA += ((wx == 1 ? 1 : 0) - mA) * Math.min(1, dt * 0.7);
  spd = stT < 3 ? lerp(0.25, 1, stT / 3) : stT > LEN - 4 ? lerp(1, 0.25, (stT - LEN + 4) / 4) : 1;
  if (tun > 0) spd = 1;
  sc += 60 * spd * dt;
  if (stT >= LEN) nextStage();
  curt += (curtT - curt) * Math.min(1, dt * 3);
  opn += (opnT - opn) * Math.min(1, dt * 3);
  if (shk > 0) shk -= dt;
  if (opn > 0.5) S.st.w += dt;
  sw *= 1 - Math.min(1, dt * 1.5);
  if (wx == 2 && (flT -= dt) <= 0) {
    flT = rnd(5, 11);
    flash = 0.5;
    setTimeout(() => noise('lowpass', 250, 60, 1.8, 0.3), 700);
  }
  flash = Math.max(0, flash - dt * 1.6);
  if ((fdT += dt) > 0.1) {
    fdT = 0;
    const x = DR.getContext('2d');
    x.globalCompositeOperation = 'destination-out';
    x.fillStyle = 'rgba(0,0,0,.04)';
    x.fillRect(0, 0, WW, WH);
    x.globalCompositeOperation = 'source-over';
  }
  if (AC && (ac += dt) > 0.5) {
    ac = 0;
    rainG.gain.setTargetAtTime(ST[si].rain ? 0.03 : 0, AC.currentTime, 0.5);
    windG.gain.setTargetAtTime(opn * 0.12, AC.currentTime, 0.4);
  }
  if (!pax && stT > 3 && stT < LEN - 12) {
    const d = PX[S.order[S.pi++ % 6]],
      hl = sea() == 3 ? 2 : sea() >= 1 ? 0 : -1,
      sy = d.say.slice();
    sy.splice(1, 0, SL[d.n][sea()]);
    if (hl >= 0) sy.splice(sy.length - 1, 0, HT[S.truth][hl + (S.pi & 1)]);
    sy[sy.length - 1] = GL[d.n](SG[d.n][sea()]);
    if (secretOK(d.n)) sy.splice(sy.length - 1, 0, TRUE[d.n]);
    save();
    pax = { d, say: sy, x: 340, y: 104, st: 'in', line: 0 };
  }
  if (pax) {
    if (pax.st == 'in') {
      pax.x -= 70 * dt;
      if (pax.x <= 226) {
        pax.x = 226;
        pax.st = 'wait';
      }
    }
    if (
      (stT > LEN - 5 && pax.st != 'talk' && pax.st != 'in' && pax.st != 'leave') ||
      (stT > LEN - 1 && pax.st == 'talk')
    ) {
      if (pax.st == 'talk') hideSay();
      pax.st = 'leave';
    }
    if (pax.st == 'leave') {
      pax.x += 70 * dt;
      if (pax.x > 340) pax = null;
    }
  }
  if ((spT -= dt) <= 0) {
    spT = rnd(10, 18);
    const ks = ['leaf', 'shell', 'ticket', 'card'],
      k = ks[(Math.random() * 4) | 0];
    if (Math.random() < 0.7 || (opn < 0.2 && Math.random() < 0.5))
      fl.push({ k, x: WX + WW, y: rnd(WY + 14, WY + 60), vx: -rnd(40, 60), ph: rnd(0, 6), in: 0 });
    else fl.push({ k, x: rnd(70, 190), y: 16, vx: 0, ph: rnd(0, 6), in: 1, fall: 1 });
  }
  for (let i = fl.length - 1; i >= 0; i--) {
    const o = fl[i];
    if (o.in) {
      if (o.fall) {
        o.y += 40 * dt;
        if (o.y >= 146) {
          o.y = 146;
          o.fall = 0;
        }
      }
    } else {
      o.x += o.vx * dt;
      o.y += Math.sin(T * 3 + o.ph) * 8 * dt;
      if (o.x < WX - 10) fl.splice(i, 1);
    }
  }
  if (fl.filter((o) => o.in).length > 3)
    fl.splice(
      fl.findIndex((o) => o.in),
      1,
    );
  for (let i = pt.length - 1; i >= 0; i--) {
    const p = pt[i];
    p.x += p.vx * dt;
    p.y += p.vy * dt;
    p.vy += 60 * dt;
    p.l -= dt * 1.6;
    if (p.l <= 0) pt.splice(i, 1);
  }
  if ((bdT -= dt) <= 0) {
    bdT = rnd(15, 28);
    for (let i = 0; i < 6; i++) birds.push({ x: WW + i * 9, y: rnd(14, 36) + i * 3, p: i });
  }
  for (let i = birds.length - 1; i >= 0; i--) {
    birds[i].x -= 22 * dt;
    if (birds[i].x < -6) birds.splice(i, 1);
  }
  if (ST[si].k == 5 && (fwT -= dt) <= 0) {
    fwT = rnd(1.5, 3.5);
    const cx = rnd(40, 170),
      cy = rnd(10, 40),
      c = ['#ffc65a', '#ff8a5a', '#fff0b0'][(Math.random() * 3) | 0];
    for (let i = 0; i < 28; i++) {
      const a = (i / 28) * 6.28,
        s = rnd(16, 30);
      fw.push({ x: cx, y: cy, vx: Math.cos(a) * s, vy: Math.sin(a) * s, l: 1.4, c });
    }
  }
  for (let i = fw.length - 1; i >= 0; i--) {
    const p = fw[i];
    p.x += p.vx * dt;
    p.y += p.vy * dt;
    p.vy += 14 * dt;
    p.l -= dt;
    if (p.l <= 0) fw.splice(i, 1);
  }
  if (ST[si].k != 6 && tun <= 0 && (tunT -= dt) <= 0) {
    tunT = rnd(60, 100);
    tunA = 5.5;
    tunnelStart();
  }
  if (tunA > 0) {
    tunA -= dt;
    tun = tunA > 4.5 ? 5.5 - tunA : tunA < 1 ? tunA : 1;
  } else tun = 0;
  if ((oncT -= dt) <= 0 && !onc) {
    oncT = rnd(40, 80);
    onc = { x: WW + 10 };
    whoosh();
  }
  if (onc) {
    onc.x -= 520 * dt;
    if (onc.x < -190) onc = null;
  }
  if (!stn && !onc && tun <= 0 && ST[si].k != 6 && stT > 5 && stT < LEN - 9 && (snT -= dt) <= 0) {
    snT = rnd(22, 38);
    stn = { x: WW + 4, pg: [0, 1, 2, 3].filter((i) => ((S.wsee | 0) >> i) & 1).length, fo: 0 };
  }
  if (stn) {
    stn.x -= (40 + 12 * spd) * dt;
    if (stn.x < -120) stn = null;
    else if (stn.pg >= 3) stn.fo = cl((100 - stn.x) * 0.5, 0, 38);
  }
  extrasUpdate(dt);
}

let tunA = 0;

function whoosh() {
  noise('bandpass', 300, 2000, 0.7, 0.3);
}
