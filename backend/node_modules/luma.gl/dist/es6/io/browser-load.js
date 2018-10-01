import { requestFile } from './browser-request-file';
let pathPrefix = '';
export function setPathPrefix(prefix) {
  pathPrefix = prefix;
}
export function loadFile(url, opts) {
  if (typeof url !== 'string' && !opts) {
    opts = url;
    url = opts.url;
  }

  opts.url = pathPrefix ? pathPrefix + url : url;
  return requestFile(opts);
}
export function loadImage(url, opts) {
  url = pathPrefix ? pathPrefix + url : url;
  return new Promise((resolve, reject) => {
    try {
      const image = new Image();

      image.onload = () => resolve(image);

      image.onerror = () => reject(new Error(`Could not load image ${url}.`));

      image.crossOrigin = opts && opts.crossOrigin || 'anonymous';
      image.src = url;
    } catch (error) {
      reject(error);
    }
  });
}
//# sourceMappingURL=browser-load.js.map