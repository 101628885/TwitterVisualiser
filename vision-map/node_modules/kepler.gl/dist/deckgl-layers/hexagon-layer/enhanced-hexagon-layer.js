'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

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

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _deck = require('deck.gl');

var _hexagonAggregator = require('./hexagon-aggregator');

var _utils = require('../layer-utils/utils');

var _enhancedHexagonCellLayer = require('./enhanced-hexagon-cell-layer');

var _enhancedHexagonCellLayer2 = _interopRequireDefault(_enhancedHexagonCellLayer);

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

var defaultProps = (0, _extends3.default)({}, _deck.HexagonLayer.defaultProps, {
  hexagonAggregator: _hexagonAggregator.pointToHexbin,
  colorScale: 'quantile'
});

var EnhancedHexagonLayer = function (_HexagonLayer) {
  (0, _inherits3.default)(EnhancedHexagonLayer, _HexagonLayer);

  function EnhancedHexagonLayer() {
    (0, _classCallCheck3.default)(this, EnhancedHexagonLayer);
    return (0, _possibleConstructorReturn3.default)(this, (EnhancedHexagonLayer.__proto__ || Object.getPrototypeOf(EnhancedHexagonLayer)).apply(this, arguments));
  }

  (0, _createClass3.default)(EnhancedHexagonLayer, [{
    key: 'getDimensionUpdaters',
    value: function getDimensionUpdaters() {
      var dimensionUpdaters = (0, _get3.default)(EnhancedHexagonLayer.prototype.__proto__ || Object.getPrototypeOf(EnhancedHexagonLayer.prototype), 'getDimensionUpdaters', this).call(this);
      // add colorScale to dimension updates
      dimensionUpdaters.getColor[1].triggers.push('colorScale');
      return dimensionUpdaters;
    }

    /*
     * override default layer method to calculate color domain
     * and scale function base on color scale type
     */

  }, {
    key: 'getColorValueDomain',
    value: function getColorValueDomain() {
      (0, _utils.getColorValueDomain)(this);
    }
  }, {
    key: 'getColorScale',
    value: function getColorScale() {
      (0, _utils.getColorScaleFunction)(this);
    }

    /*
     * override default getSubLayerClass to return customized cellLayer
     */

  }, {
    key: 'getSubLayerClass',
    value: function getSubLayerClass() {
      return _enhancedHexagonCellLayer2.default;
    }
  }]);
  return EnhancedHexagonLayer;
}(_deck.HexagonLayer);

exports.default = EnhancedHexagonLayer;


EnhancedHexagonLayer.layerName = 'EnhancedHexagonLayer';
EnhancedHexagonLayer.defaultProps = defaultProps;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kZWNrZ2wtbGF5ZXJzL2hleGFnb24tbGF5ZXIvZW5oYW5jZWQtaGV4YWdvbi1sYXllci5qcyJdLCJuYW1lcyI6WyJkZWZhdWx0UHJvcHMiLCJIZXhhZ29uTGF5ZXIiLCJoZXhhZ29uQWdncmVnYXRvciIsInBvaW50VG9IZXhiaW4iLCJjb2xvclNjYWxlIiwiRW5oYW5jZWRIZXhhZ29uTGF5ZXIiLCJkaW1lbnNpb25VcGRhdGVycyIsImdldENvbG9yIiwidHJpZ2dlcnMiLCJwdXNoIiwiRW5oYW5jZWRIZXhhZ29uQ2VsbExheWVyIiwibGF5ZXJOYW1lIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBb0JBOztBQUNBOztBQUVBOztBQUNBOzs7Ozs7QUF4QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBUUEsSUFBTUEsMENBQ0RDLG1CQUFhRCxZQURaO0FBRUpFLHFCQUFtQkMsZ0NBRmY7QUFHSkMsY0FBWTtBQUhSLEVBQU47O0lBTXFCQyxvQjs7Ozs7Ozs7OzsyQ0FDSTtBQUNyQixVQUFNQyxrTEFBTjtBQUNBO0FBQ0FBLHdCQUFrQkMsUUFBbEIsQ0FBMkIsQ0FBM0IsRUFBOEJDLFFBQTlCLENBQXVDQyxJQUF2QyxDQUE0QyxZQUE1QztBQUNBLGFBQU9ILGlCQUFQO0FBQ0Q7O0FBRUQ7Ozs7Ozs7MENBSXNCO0FBQ3BCLHNDQUFvQixJQUFwQjtBQUNEOzs7b0NBRWU7QUFDZCx3Q0FBc0IsSUFBdEI7QUFDRDs7QUFFRDs7Ozs7O3VDQUdtQjtBQUNqQixhQUFPSSxrQ0FBUDtBQUNEOzs7RUF6QitDVCxrQjs7a0JBQTdCSSxvQjs7O0FBNEJyQkEscUJBQXFCTSxTQUFyQixHQUFpQyxzQkFBakM7QUFDQU4scUJBQXFCTCxZQUFyQixHQUFvQ0EsWUFBcEMiLCJmaWxlIjoiZW5oYW5jZWQtaGV4YWdvbi1sYXllci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgMjAxOCBVYmVyIFRlY2hub2xvZ2llcywgSW5jLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbi8vIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbi8vIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbi8vIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbi8vIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuLy8gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuLy8gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4vLyBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbi8vIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbi8vIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4vLyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4vLyBUSEUgU09GVFdBUkUuXG5cbmltcG9ydCB7SGV4YWdvbkxheWVyfSBmcm9tICdkZWNrLmdsJztcbmltcG9ydCB7cG9pbnRUb0hleGJpbn0gZnJvbSAnLi9oZXhhZ29uLWFnZ3JlZ2F0b3InO1xuXG5pbXBvcnQge2dldENvbG9yVmFsdWVEb21haW4sIGdldENvbG9yU2NhbGVGdW5jdGlvbn0gZnJvbSAnLi4vbGF5ZXItdXRpbHMvdXRpbHMnO1xuaW1wb3J0IEVuaGFuY2VkSGV4YWdvbkNlbGxMYXllciBmcm9tICcuL2VuaGFuY2VkLWhleGFnb24tY2VsbC1sYXllcic7XG5cbmNvbnN0IGRlZmF1bHRQcm9wcyA9IHtcbiAgLi4uSGV4YWdvbkxheWVyLmRlZmF1bHRQcm9wcyxcbiAgaGV4YWdvbkFnZ3JlZ2F0b3I6IHBvaW50VG9IZXhiaW4sXG4gIGNvbG9yU2NhbGU6ICdxdWFudGlsZSdcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEVuaGFuY2VkSGV4YWdvbkxheWVyIGV4dGVuZHMgSGV4YWdvbkxheWVyIHtcbiAgZ2V0RGltZW5zaW9uVXBkYXRlcnMoKSB7XG4gICAgY29uc3QgZGltZW5zaW9uVXBkYXRlcnMgPSBzdXBlci5nZXREaW1lbnNpb25VcGRhdGVycygpO1xuICAgIC8vIGFkZCBjb2xvclNjYWxlIHRvIGRpbWVuc2lvbiB1cGRhdGVzXG4gICAgZGltZW5zaW9uVXBkYXRlcnMuZ2V0Q29sb3JbMV0udHJpZ2dlcnMucHVzaCgnY29sb3JTY2FsZScpO1xuICAgIHJldHVybiBkaW1lbnNpb25VcGRhdGVycztcbiAgfVxuXG4gIC8qXG4gICAqIG92ZXJyaWRlIGRlZmF1bHQgbGF5ZXIgbWV0aG9kIHRvIGNhbGN1bGF0ZSBjb2xvciBkb21haW5cbiAgICogYW5kIHNjYWxlIGZ1bmN0aW9uIGJhc2Ugb24gY29sb3Igc2NhbGUgdHlwZVxuICAgKi9cbiAgZ2V0Q29sb3JWYWx1ZURvbWFpbigpIHtcbiAgICBnZXRDb2xvclZhbHVlRG9tYWluKHRoaXMpO1xuICB9XG5cbiAgZ2V0Q29sb3JTY2FsZSgpIHtcbiAgICBnZXRDb2xvclNjYWxlRnVuY3Rpb24odGhpcyk7XG4gIH1cblxuICAvKlxuICAgKiBvdmVycmlkZSBkZWZhdWx0IGdldFN1YkxheWVyQ2xhc3MgdG8gcmV0dXJuIGN1c3RvbWl6ZWQgY2VsbExheWVyXG4gICAqL1xuICBnZXRTdWJMYXllckNsYXNzKCkge1xuICAgIHJldHVybiBFbmhhbmNlZEhleGFnb25DZWxsTGF5ZXI7XG4gIH1cbn1cblxuRW5oYW5jZWRIZXhhZ29uTGF5ZXIubGF5ZXJOYW1lID0gJ0VuaGFuY2VkSGV4YWdvbkxheWVyJztcbkVuaGFuY2VkSGV4YWdvbkxheWVyLmRlZmF1bHRQcm9wcyA9IGRlZmF1bHRQcm9wcztcbiJdfQ==