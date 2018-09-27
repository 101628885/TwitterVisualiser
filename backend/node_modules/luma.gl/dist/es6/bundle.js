import 'babel-polyfill';
import './index';
import * as addons from './addons';
import luma from './globals';
luma.addons = addons;

if (typeof window !== 'undefined') {
  window.LumaGL = luma;
}
//# sourceMappingURL=bundle.js.map