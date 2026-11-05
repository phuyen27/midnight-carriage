/**
 * Collecting and storing small items drifting past the window.
 */

function give(name, k) {
  const o = S.items[name] || (S.items[name] = { c: 0, k });
  o.c++;
  save();
}

function collect(o) {
  fl.splice(fl.indexOf(o), 1);
  const nm = o.k == 'card' ? 'Bưu thiếp · ' + ST[si].n : IT[o.k].n;
  give(nm, o.k);
  plink();
  toast('Nhặt được: ' + nm);
  for (let i = 0; i < 10; i++)
    pt.push({ x: o.x + 3, y: o.y + 3, vx: rnd(-30, 30), vy: rnd(-40, 10), l: 1 });
}
