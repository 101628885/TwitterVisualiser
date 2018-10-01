function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

import isElectron from './is-electron';
var isNode = (typeof process === "undefined" ? "undefined" : _typeof(process)) === 'object' && String(process) === '[object process]' && !process.browser;
var isBrowser = !isNode || isElectron;
export var isBrowserMainThread = isBrowser && typeof document !== 'undefined';
export default isBrowser;
//# sourceMappingURL=is-browser.js.map