import { requestFile } from './browser-request-file';
var pathPrefix = '';
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
  return new Promise(function (resolve, reject) {
    try {
      var image = new Image();

      image.onload = function () {
        return resolve(image);
      };

      image.onerror = function () {
        return reject(new Error("Could not load image ".concat(url, ".")));
      };

      image.crossOrigin = opts && opts.crossOrigin || 'anonymous';
      image.src = url;
    } catch (error) {
      reject(error);
    }
  });
}
//# sourceMappingURL=browser-load.js.map