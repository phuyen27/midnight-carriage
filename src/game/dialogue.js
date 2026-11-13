/**
 * Talking to passengers and advancing dialogue.
 */

function talk() {
  if (!pax || pax.st == 'in' || pax.st == 'leave') return;
  if (pax.st == 'wait') {
    pax.st = 'talk';
    pax.line = 0;
    S.stories[pax.d.n] = pax.say[0];
    save();
    showLine();
  } else if (pax.st == 'talk') advance();
  else
    say(
      pax.d.n,
      [
        'Ngồi tàu đêm thế này, thích thật nhỉ.',
        'Cháu nhìn xem, ngoài kia đẹp quá.',
        'Tiếng bánh xe nghe dễ chịu ghê.',
      ][(Math.random() * 3) | 0],
    );
}

function showLine() {
  const l = pax.say[pax.line];
  if (typeof l == 'string') {
    say(pax.d.n, l, 1);
    return;
  }
  // a question: the answer is stored, shapes the letter line, and gets a reply
  const who = pax.d;
  ask(
    who.n,
    l.ask.q,
    l.ask.o.map((o) => o.t),
    (i) => {
      if (!pax || pax.d !== who || pax.st != 'talk') return;
      S.ans[who.n] = i;
      save();
      plink();
      pax.say[pax.line] = l.ask.o[i].r;
      showLine();
    },
  );
}

function advance() {
  if (!pax || pax.st != 'talk') return;
  if (typeof pax.say[pax.line] != 'string') return; // must answer the question first
  pax.line++;
  if (pax.line >= pax.say.length) {
    pax.st = 'done';
    hideSay();
    const gf = SG[pax.d.n][sea()],
      gk = pax.d.n + sea(),
      ng = !S.gifted[gk];
    if (ng) {
      S.gifted[gk] = 1;
      give(gf, 'gift');
    }
    plink();
    const fr = FR[pax.d.n][S.ans[pax.d.n] === 0 ? 0 : 1];
    if (fr && !S.frag[pax.d.n]) {
      S.frag[pax.d.n] = fr;
      LW[pax.d.n] = 0;
      save();
      const n = Object.keys(S.frag).length;
      toast(
        (ng ? 'Nhận được: ' + gf + ' · ' : '') +
          'Lá thư có thêm dòng (' +
          n +
          '/6): “' +
          fr +
          '”',
        7000,
      );
    } else if (ng) toast('Nhận được: ' + gf);
    else toast('Mùa này bạn đã có quà của họ rồi, cảm ơn vì đã ghé nghe.');
  } else showLine();
}

$('say').onclick = () => {
  if (pax && pax.st == 'talk') advance();
  else hideSay();
};
