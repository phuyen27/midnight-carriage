/**
 * Canvas setup: logical resolution, 2D context and responsive scaling.
 */

const W = 320,
  H = 180,
  cv = document.getElementById('c'),
  g = cv.getContext('2d'),
  $ = (i) => document.getElementById(i);

g.imageSmoothingEnabled = false;

function fit() {
  const s = Math.min(innerWidth / W, innerHeight / H);
  cv.style.width = W * s + 'px';
  cv.style.height = H * s + 'px';
}

addEventListener('resize', fit);

fit();

// Re-fit when the browser UI shows/hides or fullscreen toggles.
document.addEventListener('fullscreenchange', fit);
addEventListener('orientationchange', () => setTimeout(fit, 200));
if (window.visualViewport) visualViewport.addEventListener('resize', fit);
