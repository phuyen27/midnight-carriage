/**
 * Toast, speech box and sound-button label.
 */

let tt;

function toast(m, ms) {
  const e = $('toast');
  e.textContent = m;
  e.style.opacity = 1;
  clearTimeout(tt);
  tt = setTimeout(() => (e.style.opacity = 0), ms || 2600);
}

function say(n, t, more) {
  const e = $('say');
  e.innerHTML = '<b>' + esc(n) + '</b>' + esc(t) + (more ? '<i>▶</i>' : '');
  e.style.display = 'block';
}

/** Speech box with answer buttons; cb(i) gets the index of the chosen option. */
function ask(n, t, opts, cb) {
  const e = $('say');
  e.innerHTML =
    '<b>' +
    esc(n) +
    '</b>' +
    esc(t) +
    '<div class="ch">' +
    opts.map((o, i) => '<button data-i="' + i + '">' + esc(o) + '</button>').join('') +
    '</div>';
  e.style.display = 'block';
  e.querySelectorAll('button').forEach((b) => {
    b.onclick = (ev) => {
      ev.stopPropagation();
      cb(+b.dataset.i);
    };
  });
}

const hideSay = () => ($('say').style.display = 'none');

function sndLabel() {
  $('bSnd').textContent = 'Âm: ' + (S.snd ? 'Bật' : 'Tắt');
}

sndLabel();
