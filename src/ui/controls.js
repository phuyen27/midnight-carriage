/**
 * Top-bar buttons and the diary modal (sound, restart, save note).
 */

$('bSnd').onclick = () => {
  initAudio();
  S.snd = !S.snd;
  if (MG) MG.gain.setTargetAtTime(S.snd ? 0.9 : 0, AC.currentTime, 0.1);
  sndLabel();
  save();
};

$('nX').onclick = () => ($('note').style.display = 'none');

$('nS').onclick = () => {
  const v = $('nt').value.trim();
  if (v) {
    S.diary.push({ s: ST[si].n, t: v });
    save();
    toast('Đã viết vào nhật ký');
  }
  $('nt').value = '';
  $('note').style.display = 'none';
};

/** Skip ahead to the next station (the dissolve covers the cut). */
$('bSk').onclick = () => {
  if (ES || xfT < XF) return;
  initAudio();
  if (pax) hideSay();
  pax = null;
  stn = null;
  nextStage();
};

let rc = 0;

$('bRe').onclick = () => {
  if (!rc) {
    $('bRe').textContent = 'Chắc chứ?';
    rc = setTimeout(() => {
      rc = 0;
      $('bRe').textContent = 'Chơi lại';
    }, 3000);
    return;
  }
  clearTimeout(rc);
  rc = 0;
  $('bRe').textContent = 'Chơi lại';
  const sn = S.snd,
    sk = S.seen,
    ws = S.wsee | 0;
  S = DEF();
  S.snd = sn;
  S.seen = sk;
  S.wsee = ws;
  save();
  si = 0;
  stT = 0;
  prevSky = 0;
  pax = null;
  fl = [];
  hideSay();
  toast('Chuyến tàu mới bắt đầu');
};

$('bFs').onclick = () => {
  const d = document,
    el = d.documentElement;
  if (d.fullscreenElement) d.exitFullscreen();
  else if (el.requestFullscreen)
    el.requestFullscreen()
      .then(
        () =>
          screen.orientation &&
          screen.orientation.lock &&
          screen.orientation.lock('landscape').catch(() => {}),
      )
      .catch(() => {});
  else toast('iPhone: bấm Chia sẻ → Thêm vào MH chính để chơi toàn màn hình', 5000);
};
// One-time hint on touch devices that are not already fullscreen/installed.
setTimeout(() => {
  if (
    window.matchMedia &&
    matchMedia('(pointer:coarse)').matches &&
    !matchMedia('(display-mode: fullscreen), (display-mode: standalone)').matches &&
    !document.fullscreenElement
  )
    toast('Bấm ⛶ để chơi toàn màn hình', 4000);
}, 7000);
