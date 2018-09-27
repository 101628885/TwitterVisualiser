"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.promisify = promisify;

function promisify(func) {
  return function promisifiedFunction() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return new Promise(function (resolve, reject) {
      function callback(error, data) {
        try {
          if (error) {
            reject(error);
          } else {
            resolve(data);
          }
        } catch (e) {
          reject(e);
        }
      }

      func.apply(void 0, args.concat([callback]));
    });
  };
}
//# sourceMappingURL=promise-utils.js.map