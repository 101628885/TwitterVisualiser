'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mapboxRequiredColumns = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _baseLayer = require('./base-layer');

var _baseLayer2 = _interopRequireDefault(_baseLayer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mapboxRequiredColumns = exports.mapboxRequiredColumns = ['lat', 'lng']; // Copyright (c) 2018 Uber Technologies, Inc.
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

var MapboxLayerGL = function (_Layer) {
  (0, _inherits3.default)(MapboxLayerGL, _Layer);

  function MapboxLayerGL() {
    (0, _classCallCheck3.default)(this, MapboxLayerGL);
    return (0, _possibleConstructorReturn3.default)(this, (MapboxLayerGL.__proto__ || Object.getPrototypeOf(MapboxLayerGL)).apply(this, arguments));
  }

  (0, _createClass3.default)(MapboxLayerGL, [{
    key: 'shouldRenderLayer',


    // this layer is rendered at mapbox level
    // todo: maybe need to find a better solution for this one
    value: function shouldRenderLayer() {
      return false;
    }
  }, {
    key: 'overlayType',
    get: function get() {
      return _baseLayer.OVERLAY_TYPE.mapboxgl;
    }
  }, {
    key: 'type',
    get: function get() {
      return null;
    }
  }, {
    key: 'isAggregated',
    get: function get() {
      return true;
    }
  }, {
    key: 'requiredLayerColumns',
    get: function get() {
      return mapboxRequiredColumns;
    }
  }, {
    key: 'columnPairs',
    get: function get() {
      return this.defaultPointColumnPairs;
    }
  }, {
    key: 'noneLayerDataAffectingProps',
    get: function get() {
      return [];
    }
  }, {
    key: 'visualChannels',
    get: function get() {
      return {};
    }
  }]);
  return MapboxLayerGL;
}(_baseLayer2.default);

exports.default = MapboxLayerGL;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9sYXllcnMvbWFwYm94Z2wtbGF5ZXIuanMiXSwibmFtZXMiOlsibWFwYm94UmVxdWlyZWRDb2x1bW5zIiwiTWFwYm94TGF5ZXJHTCIsIk9WRVJMQVlfVFlQRSIsIm1hcGJveGdsIiwiZGVmYXVsdFBvaW50Q29sdW1uUGFpcnMiLCJMYXllciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFvQkE7Ozs7OztBQUVPLElBQU1BLHdEQUF3QixDQUFDLEtBQUQsRUFBUSxLQUFSLENBQTlCLEMsQ0F0QlA7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0lBTU1DLGE7Ozs7Ozs7Ozs7OztBQThCSjtBQUNBO3dDQUNvQjtBQUNsQixhQUFPLEtBQVA7QUFDRDs7O3dCQWhDaUI7QUFDaEIsYUFBT0Msd0JBQWFDLFFBQXBCO0FBQ0Q7Ozt3QkFFVTtBQUNULGFBQU8sSUFBUDtBQUNEOzs7d0JBRWtCO0FBQ2pCLGFBQU8sSUFBUDtBQUNEOzs7d0JBRTBCO0FBQ3pCLGFBQU9ILHFCQUFQO0FBQ0Q7Ozt3QkFFaUI7QUFDaEIsYUFBTyxLQUFLSSx1QkFBWjtBQUNEOzs7d0JBRWlDO0FBQ2hDLGFBQU8sRUFBUDtBQUNEOzs7d0JBRW9CO0FBQ25CLGFBQU8sRUFBUDtBQUNEOzs7RUE1QnlCQyxtQjs7a0JBc0NiSixhIiwiZmlsZSI6Im1hcGJveGdsLWxheWVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSAyMDE4IFViZXIgVGVjaG5vbG9naWVzLCBJbmMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuLy8gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuLy8gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuLy8gdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuLy8gY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4vLyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4vLyBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4vLyBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbi8vIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuLy8gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuLy8gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbi8vIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbi8vIFRIRSBTT0ZUV0FSRS5cblxuaW1wb3J0IExheWVyLCB7T1ZFUkxBWV9UWVBFfSBmcm9tICcuL2Jhc2UtbGF5ZXInO1xuXG5leHBvcnQgY29uc3QgbWFwYm94UmVxdWlyZWRDb2x1bW5zID0gWydsYXQnLCAnbG5nJ107XG5cbmNsYXNzIE1hcGJveExheWVyR0wgZXh0ZW5kcyBMYXllciB7XG5cbiAgZ2V0IG92ZXJsYXlUeXBlKCkge1xuICAgIHJldHVybiBPVkVSTEFZX1RZUEUubWFwYm94Z2w7XG4gIH1cblxuICBnZXQgdHlwZSgpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIGdldCBpc0FnZ3JlZ2F0ZWQoKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBnZXQgcmVxdWlyZWRMYXllckNvbHVtbnMoKSB7XG4gICAgcmV0dXJuIG1hcGJveFJlcXVpcmVkQ29sdW1ucztcbiAgfVxuXG4gIGdldCBjb2x1bW5QYWlycygpIHtcbiAgICByZXR1cm4gdGhpcy5kZWZhdWx0UG9pbnRDb2x1bW5QYWlycztcbiAgfVxuXG4gIGdldCBub25lTGF5ZXJEYXRhQWZmZWN0aW5nUHJvcHMoKSB7XG4gICAgcmV0dXJuIFtdO1xuICB9XG5cbiAgZ2V0IHZpc3VhbENoYW5uZWxzKCkge1xuICAgIHJldHVybiB7fTtcbiAgfVxuXG4gIC8vIHRoaXMgbGF5ZXIgaXMgcmVuZGVyZWQgYXQgbWFwYm94IGxldmVsXG4gIC8vIHRvZG86IG1heWJlIG5lZWQgdG8gZmluZCBhIGJldHRlciBzb2x1dGlvbiBmb3IgdGhpcyBvbmVcbiAgc2hvdWxkUmVuZGVyTGF5ZXIoKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgTWFwYm94TGF5ZXJHTDtcbiJdfQ==