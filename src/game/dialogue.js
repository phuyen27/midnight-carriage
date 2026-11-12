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
  say(pax.d.n, pax.say[pax.line], 1);
}

function advance() {
  if (!pax || pax.st != 'talk') return;
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
    const fr = FR[pax.d.n];
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
