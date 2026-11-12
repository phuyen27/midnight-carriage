/**
 * The notebook modal: letter, collection, stories, diary and endings.
 */

/** The letter as written so far, in passenger order so it always reads as one letter. */
function letterHTML(done) {
  const got = PX.filter((p) => S.frag[p.n]);
  if (!got.length)
    return '<p>Bạn mang theo một lá thư chỉ mới có dòng đầu. Sáu hành khách giữ sáu lời bạn chưa kịp nói: nghe họ, mỗi người sẽ giúp bạn viết thêm một dòng.</p>';
  return (
    '<p>Gửi người đã đợi ở ga cuối,</p>' +
    got.map((p) => '<p>' + esc(S.frag[p.n]) + ' <i>(' + esc(p.n) + ')</i></p>').join('') +
    (done
      ? got.length >= 6
        ? '<p>Cảm ơn người vì đã đợi. Mình đến rồi.</p>'
        : '<p>…còn nhiều điều mình chưa kịp viết. Mong người đợi mình thêm một chuyến nữa.</p>'
      : '') +
    (done ? '<p>— Người gửi, trên chuyến tàu đêm.</p>' : '')
  );
}

function openBook() {
  const fk = Object.keys(S.frag);
  let h =
    '<h3>Lá thư dang dở (' +
    fk.length +
    '/6)</h3>' +
    letterHTML(S.fin);
  if (((S.wsee | 0) & 15) == 15)
    h += '<p><i>Tái bút, bằng nét chữ lạ: “Tôi vẫn đang đợi bạn ở ga cuối.”</i></p>';
  h +=
    '<p>Người đứng đợi trên sân ga: ' +
    [0, 1, 2, 3].filter((i) => ((S.wsee | 0) >> i) & 1).length +
    '/4 mùa</p><h3>Hồi ức (' +
    PX.filter((p) => secretOK(p.n)).length +
    '/6)</h3>' +
    (PX.filter((p) => secretOK(p.n))
      .map((p) => '<p><b>' + esc(p.n) + '</b>: ' + esc(TRUE[p.n]) + '</p>')
      .join('') || '<p>Nhận quà của một hành khách ở hai mùa khác nhau để nghe điều họ giấu.</p>') +
    '<h3>Sưu tầm</h3><p>Chạm vào món đồ để bày lên toa (✓ là đang bày).</p>';
  const ks = Object.keys(S.items);
  h += ks.length
    ? ks
        .map(
          (n) =>
            '<span class="it" data-n="' +
            esc(n) +
            '" style="cursor:pointer"><img src="' +
            SP[S.items[n].k].toDataURL() +
            '">' +
            esc(n) +
            (S.items[n].c > 1 ? ' ×' + S.items[n].c : '') +
            (isD(n) ? ' ✓' : '') +
            '</span>',
        )
        .join('')
    : '<p>Chưa có gì. Hãy nhặt vật nhỏ trôi qua cửa sổ nhé.</p>';
  h += '<h3>Câu chuyện đã nghe</h3>';
  const sk = Object.keys(S.stories);
  h += sk.length
    ? sk.map((n) => '<p><b>' + esc(n) + '</b>: “' + esc(S.stories[n]) + '”</p>').join('')
    : '<p>Hãy trò chuyện với hành khách.</p>';
  h +=
    '<h3>Nhật ký</h3>' +
    (S.diary.length
      ? S.diary.map((d) => '<p>[' + esc(d.s) + '] ' + esc(d.t) + '</p>').join('')
      : '<p>Chạm vào quyển nhật ký trên bàn để viết.</p>');
  const sk2 = Object.keys(S.seen);
  h +=
    '<h3>Những chuyến đã đi (' +
    sk2.length +
    '/9)</h3>' +
    (sk2.length
      ? sk2.map((k) => '<p>• ' + esc(EN[k][0]) + '</p>').join('')
      : '<p>Chưa có chuyến nào đến ga cuối.</p>');
  $('bk').innerHTML = h;
  $('book').style.display = 'flex';
}

$('bSo').onclick = openBook;

$('bk').onclick = (e) => {
  const w = e.target.closest('.who');
  if (w) {
    talkEnd(w.dataset.w);
    return;
  }
  const el = e.target.closest('.it');
  if (el) {
    toggleDeco(el.dataset.n);
    openBook();
  }
};

$('bX').onclick = () => ($('book').style.display = 'none');

/** Epilogue chat: each tap on a passenger shows their next line. */
const EC = {};
function talkEnd(n) {
  const L = [
    EG[S.lastEnd | 0],
    FQ[n],
    secretOK(n) ? TRUE[n] : 'Người ấy mỉm cười, như còn điều chưa muốn nói hết.',
    'Hẹn bạn ở chuyến sau.',
  ];
  const i = (EC[n] = ((EC[n] ?? -1) + 1) % L.length);
  $('ft').innerHTML = '<p><b>' + esc(n) + '</b>: ' + esc(L[i]) + '</p>';
}
