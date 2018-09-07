'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _get2 = require('babel-runtime/helpers/get');

var _get3 = _interopRequireDefault(_get2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _deck = require('deck.gl');

var _getCellLayerVertext = require('../layer-utils/get-cell-layer-vertext');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Copyright (c) 2018 Uber Technologies, Inc.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

var EnhancedHexagonCellLayer = function (_HexagonCellLayer) {
  (0, _inherits3.default)(EnhancedHexagonCellLayer, _HexagonCellLayer);

  function EnhancedHexagonCellLayer() {
    (0, _classCallCheck3.default)(this, EnhancedHexagonCellLayer);
    return (0, _possibleConstructorReturn3.default)(this, (EnhancedHexagonCellLayer.__proto__ || Object.getPrototypeOf(EnhancedHexagonCellLayer)).apply(this, arguments));
  }

  (0, _createClass3.default)(EnhancedHexagonCellLayer, [{
    key: 'getShaders',
    value: function getShaders() {
      var shaders = (0, _get3.default)(EnhancedHexagonCellLayer.prototype.__proto__ || Object.getPrototypeOf(EnhancedHexagonCellLayer.prototype), 'getShaders', this).call(this);
      var vs = (0, _getCellLayerVertext.getCellLayerVertex)(shaders.vs, { highlightPicked: true });
      return (0, _extends3.default)({}, shaders, { vs: vs });
    }
  }]);
  return EnhancedHexagonCellLayer;
}(_deck.HexagonCellLayer);

exports.default = EnhancedHexagonCellLayer;


EnhancedHexagonCellLayer.layerName = 'EnhancedHexagonCellLayer';
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kZWNrZ2wtbGF5ZXJzL2hleGFnb24tbGF5ZXIvZW5oYW5jZWQtaGV4YWdvbi1jZWxsLWxheWVyLmpzIl0sIm5hbWVzIjpbIkVuaGFuY2VkSGV4YWdvbkNlbGxMYXllciIsInNoYWRlcnMiLCJ2cyIsImhpZ2hsaWdodFBpY2tlZCIsIkhleGFnb25DZWxsTGF5ZXIiLCJsYXllck5hbWUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFvQkE7O0FBQ0E7Ozs7QUFyQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0lBS3FCQSx3Qjs7Ozs7Ozs7OztpQ0FDTjtBQUNYLFVBQU1DLHNLQUFOO0FBQ0EsVUFBTUMsS0FBSyw2Q0FBbUJELFFBQVFDLEVBQTNCLEVBQStCLEVBQUNDLGlCQUFpQixJQUFsQixFQUEvQixDQUFYO0FBQ0Esd0NBQVdGLE9BQVgsSUFBb0JDLE1BQXBCO0FBQ0Q7OztFQUxtREUsc0I7O2tCQUFqQ0osd0I7OztBQVFyQkEseUJBQXlCSyxTQUF6QixHQUFxQywwQkFBckMiLCJmaWxlIjoiZW5oYW5jZWQtaGV4YWdvbi1jZWxsLWxheWVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSAyMDE4IFViZXIgVGVjaG5vbG9naWVzLCBJbmMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuLy8gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuLy8gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuLy8gdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuLy8gY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4vLyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4vLyBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4vLyBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbi8vIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuLy8gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuLy8gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbi8vIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbi8vIFRIRSBTT0ZUV0FSRS5cblxuaW1wb3J0IHtIZXhhZ29uQ2VsbExheWVyfSBmcm9tICdkZWNrLmdsJztcbmltcG9ydCB7Z2V0Q2VsbExheWVyVmVydGV4fSBmcm9tICcuLi9sYXllci11dGlscy9nZXQtY2VsbC1sYXllci12ZXJ0ZXh0JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRW5oYW5jZWRIZXhhZ29uQ2VsbExheWVyIGV4dGVuZHMgSGV4YWdvbkNlbGxMYXllciB7XG4gIGdldFNoYWRlcnMoKSB7XG4gICAgY29uc3Qgc2hhZGVycyA9IHN1cGVyLmdldFNoYWRlcnMoKTtcbiAgICBjb25zdCB2cyA9IGdldENlbGxMYXllclZlcnRleChzaGFkZXJzLnZzLCB7aGlnaGxpZ2h0UGlja2VkOiB0cnVlfSk7XG4gICAgcmV0dXJuIHsuLi5zaGFkZXJzLCB2c307XG4gIH1cbn1cblxuRW5oYW5jZWRIZXhhZ29uQ2VsbExheWVyLmxheWVyTmFtZSA9ICdFbmhhbmNlZEhleGFnb25DZWxsTGF5ZXInO1xuIl19