import { isBrowser } from '../utils';
const isPage = isBrowser && typeof document !== 'undefined';
let isPageLoaded = isPage && document.readyState === 'complete';
export const pageLoadPromise = isPage ? new Promise((resolve, reject) => {
  if (isPageLoaded) {
    resolve(document);
    return;
  }

  window.onload = () => {
    isPageLoaded = true;
    resolve(document);
  };
}) : Promise.resolve({});
export function getPageLoadPromise() {
  return pageLoadPromise;
}
export function createCanvas({
  width = 800,
  height = 600,
  id = 'gl-canvas',
  insert = true
}) {
  const canvas = document.createElement('canvas');
  canvas.id = id;
  canvas.style.width = Number.isFinite(width) ? `${width}px` : '100%';
  canvas.style.height = Number.isFinite(height) ? `${height}px` : '100%';

  if (insert) {
    const body = document.body;
    body.insertBefore(canvas, body.firstChild);
  }

  return canvas;
}
export function getCanvas({
  canvas,
  width,
  height,
  onError = () => {}
}) {
  let targetCanvas;

  if (typeof canvas === 'string') {
    if (!isPageLoaded) {
      onError(`createGLContext called on canvas '${canvas}' before page was loaded`);
    }

    targetCanvas = document.getElementById(canvas);
  } else if (canvas) {
    targetCanvas = canvas;
  } else {
    targetCanvas = createCanvas({
      id: 'lumagl-canvas',
      width,
      height,
      onError
    });
  }

  return targetCanvas;
}
//# sourceMappingURL=create-canvas.js.map