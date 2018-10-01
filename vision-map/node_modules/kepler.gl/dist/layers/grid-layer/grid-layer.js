'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.gridVisConfigs = undefined;

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

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

var _aggregationLayer = require('../aggregation-layer');

var _aggregationLayer2 = _interopRequireDefault(_aggregationLayer);

var _enhancedGridLayer = require('../../deckgl-layers/grid-layer/enhanced-grid-layer');

var _enhancedGridLayer2 = _interopRequireDefault(_enhancedGridLayer);

var _gridUtils = require('./grid-utils');

var _gridLayerIcon = require('./grid-layer-icon');

var _gridLayerIcon2 = _interopRequireDefault(_gridLayerIcon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var gridVisConfigs = exports.gridVisConfigs = {
  opacity: 'opacity',
  worldUnitSize: 'worldUnitSize',
  colorRange: 'colorRange',
  coverage: 'coverage',
  sizeRange: 'elevationRange',
  percentile: 'percentile',
  elevationPercentile: 'elevationPercentile',
  elevationScale: 'elevationScale',
  'hi-precision': 'hi-precision',
  colorAggregation: 'aggregation',
  sizeAggregation: 'sizeAggregation',
  enable3d: 'enable3d'
}; // Copyright (c) 2018 Uber Technologies, Inc.
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

var GridLayer = function (_AggregationLayer) {
  (0, _inherits3.default)(GridLayer, _AggregationLayer);

  function GridLayer(props) {
    (0, _classCallCheck3.default)(this, GridLayer);

    var _this = (0, _possibleConstructorReturn3.default)(this, (GridLayer.__proto__ || Object.getPrototypeOf(GridLayer)).call(this, props));

    _this.registerVisConfig(gridVisConfigs);
    _this.visConfigSettings.worldUnitSize.label = 'Grid Size (km)';
    return _this;
  }

  (0, _createClass3.default)(GridLayer, [{
    key: 'formatLayerData',
    value: function formatLayerData(_, allData, filteredIndex, oldLayerData) {
      var opt = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};

      var formattedData = (0, _get3.default)(GridLayer.prototype.__proto__ || Object.getPrototypeOf(GridLayer.prototype), 'formatLayerData', this).call(this, _, allData, filteredIndex, oldLayerData, opt);

      var getPosition = formattedData.getPosition,
          data = formattedData.data;

      // TODO: fix this in deck.gl layer

      var cleaned = data.filter(function (d) {
        var pos = getPosition(d);
        return pos.every(Number.isFinite);
      });

      // All data processing is done in deck.gl layer
      return (0, _extends3.default)({}, formattedData, {
        data: cleaned
      });
    }
  }, {
    key: 'renderLayer',
    value: function renderLayer(_ref) {
      var data = _ref.data,
          idx = _ref.idx,
          layerInteraction = _ref.layerInteraction,
          objectHovered = _ref.objectHovered,
          mapState = _ref.mapState,
          interaction = _ref.interaction,
          layerCallbacks = _ref.layerCallbacks;

      var zoomFactor = this.getZoomFactor(mapState);
      var eleZoomFactor = this.getElevationZoomFactor(mapState);
      var visConfig = this.config.visConfig;

      var cellSize = visConfig.worldUnitSize * 1000;

      return [new _enhancedGridLayer2.default((0, _extends3.default)({}, data, layerInteraction, {
        id: this.id,
        idx: idx,
        cellSize: cellSize,
        coverage: visConfig.coverage,

        // color
        colorRange: this.getColorRange(visConfig.colorRange),
        colorScale: this.config.colorScale,
        opacity: visConfig.opacity,
        upperPercentile: visConfig.percentile[1],
        lowerPercentile: visConfig.percentile[0],

        // elevation
        extruded: visConfig.enable3d,
        elevationScale: visConfig.elevationScale * eleZoomFactor,
        elevationLowerPercentile: visConfig.elevationPercentile[0],
        elevationUpperPercentile: visConfig.elevationPercentile[1],

        // render
        fp64: visConfig['hi-precision'],
        pickable: true,
        lightSettings: this.meta && this.meta.lightSettings,

        // callbacks
        onSetColorDomain: layerCallbacks.onSetLayerDomain
      }))].concat((0, _toConsumableArray3.default)(this.isLayerHovered(objectHovered) && !visConfig.enable3d ? [new _deck.GeoJsonLayer({
        id: this.id + '-hovered',
        data: [(0, _gridUtils.pointToPolygonGeo)({
          object: objectHovered.object,
          cellSize: cellSize,
          coverage: visConfig.coverage,
          properties: { lineColor: this.config.highlightColor },
          mapState: mapState
        })],
        lineWidthScale: 8 * zoomFactor
      })] : []));
    }
  }, {
    key: 'type',
    get: function get() {
      return 'grid';
    }
  }, {
    key: 'layerIcon',
    get: function get() {
      return _gridLayerIcon2.default;
    }
  }]);
  return GridLayer;
}(_aggregationLayer2.default);

exports.default = GridLayer;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9sYXllcnMvZ3JpZC1sYXllci9ncmlkLWxheWVyLmpzIl0sIm5hbWVzIjpbImdyaWRWaXNDb25maWdzIiwib3BhY2l0eSIsIndvcmxkVW5pdFNpemUiLCJjb2xvclJhbmdlIiwiY292ZXJhZ2UiLCJzaXplUmFuZ2UiLCJwZXJjZW50aWxlIiwiZWxldmF0aW9uUGVyY2VudGlsZSIsImVsZXZhdGlvblNjYWxlIiwiY29sb3JBZ2dyZWdhdGlvbiIsInNpemVBZ2dyZWdhdGlvbiIsImVuYWJsZTNkIiwiR3JpZExheWVyIiwicHJvcHMiLCJyZWdpc3RlclZpc0NvbmZpZyIsInZpc0NvbmZpZ1NldHRpbmdzIiwibGFiZWwiLCJfIiwiYWxsRGF0YSIsImZpbHRlcmVkSW5kZXgiLCJvbGRMYXllckRhdGEiLCJvcHQiLCJmb3JtYXR0ZWREYXRhIiwiZ2V0UG9zaXRpb24iLCJkYXRhIiwiY2xlYW5lZCIsImZpbHRlciIsInBvcyIsImQiLCJldmVyeSIsIk51bWJlciIsImlzRmluaXRlIiwiaWR4IiwibGF5ZXJJbnRlcmFjdGlvbiIsIm9iamVjdEhvdmVyZWQiLCJtYXBTdGF0ZSIsImludGVyYWN0aW9uIiwibGF5ZXJDYWxsYmFja3MiLCJ6b29tRmFjdG9yIiwiZ2V0Wm9vbUZhY3RvciIsImVsZVpvb21GYWN0b3IiLCJnZXRFbGV2YXRpb25ab29tRmFjdG9yIiwidmlzQ29uZmlnIiwiY29uZmlnIiwiY2VsbFNpemUiLCJFbmhhbmNlZEdyaWRMYXllciIsImlkIiwiZ2V0Q29sb3JSYW5nZSIsImNvbG9yU2NhbGUiLCJ1cHBlclBlcmNlbnRpbGUiLCJsb3dlclBlcmNlbnRpbGUiLCJleHRydWRlZCIsImVsZXZhdGlvbkxvd2VyUGVyY2VudGlsZSIsImVsZXZhdGlvblVwcGVyUGVyY2VudGlsZSIsImZwNjQiLCJwaWNrYWJsZSIsImxpZ2h0U2V0dGluZ3MiLCJtZXRhIiwib25TZXRDb2xvckRvbWFpbiIsIm9uU2V0TGF5ZXJEb21haW4iLCJpc0xheWVySG92ZXJlZCIsIkdlb0pzb25MYXllciIsIm9iamVjdCIsInByb3BlcnRpZXMiLCJsaW5lQ29sb3IiLCJoaWdobGlnaHRDb2xvciIsImxpbmVXaWR0aFNjYWxlIiwiR3JpZExheWVySWNvbiIsIkFnZ3JlZ2F0aW9uTGF5ZXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBb0JBOztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7Ozs7O0FBRU8sSUFBTUEsMENBQWlCO0FBQzVCQyxXQUFTLFNBRG1CO0FBRTVCQyxpQkFBZSxlQUZhO0FBRzVCQyxjQUFZLFlBSGdCO0FBSTVCQyxZQUFVLFVBSmtCO0FBSzVCQyxhQUFXLGdCQUxpQjtBQU01QkMsY0FBWSxZQU5nQjtBQU81QkMsdUJBQXFCLHFCQVBPO0FBUTVCQyxrQkFBZ0IsZ0JBUlk7QUFTNUIsa0JBQWdCLGNBVFk7QUFVNUJDLG9CQUFrQixhQVZVO0FBVzVCQyxtQkFBaUIsaUJBWFc7QUFZNUJDLFlBQVU7QUFaa0IsQ0FBdkIsQyxDQTFCUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7SUF1QnFCQyxTOzs7QUFDbkIscUJBQVlDLEtBQVosRUFBbUI7QUFBQTs7QUFBQSxvSUFDWEEsS0FEVzs7QUFHakIsVUFBS0MsaUJBQUwsQ0FBdUJkLGNBQXZCO0FBQ0EsVUFBS2UsaUJBQUwsQ0FBdUJiLGFBQXZCLENBQXFDYyxLQUFyQyxHQUE2QyxnQkFBN0M7QUFKaUI7QUFLbEI7Ozs7b0NBU2VDLEMsRUFBR0MsTyxFQUFTQyxhLEVBQWVDLFksRUFBd0I7QUFBQSxVQUFWQyxHQUFVLHVFQUFKLEVBQUk7O0FBQ2pFLFVBQU1DLG9KQUNKTCxDQURJLEVBRUpDLE9BRkksRUFHSkMsYUFISSxFQUlKQyxZQUpJLEVBS0pDLEdBTEksQ0FBTjs7QUFEaUUsVUFTMURFLFdBVDBELEdBU3JDRCxhQVRxQyxDQVMxREMsV0FUMEQ7QUFBQSxVQVM3Q0MsSUFUNkMsR0FTckNGLGFBVHFDLENBUzdDRSxJQVQ2Qzs7QUFXakU7O0FBQ0EsVUFBTUMsVUFBVUQsS0FBS0UsTUFBTCxDQUFZLGFBQUs7QUFDL0IsWUFBTUMsTUFBTUosWUFBWUssQ0FBWixDQUFaO0FBQ0EsZUFBT0QsSUFBSUUsS0FBSixDQUFVQyxPQUFPQyxRQUFqQixDQUFQO0FBQ0QsT0FIZSxDQUFoQjs7QUFLQTtBQUNBLHdDQUNLVCxhQURMO0FBRUVFLGNBQU1DO0FBRlI7QUFJRDs7O3NDQVVFO0FBQUEsVUFQREQsSUFPQyxRQVBEQSxJQU9DO0FBQUEsVUFORFEsR0FNQyxRQU5EQSxHQU1DO0FBQUEsVUFMREMsZ0JBS0MsUUFMREEsZ0JBS0M7QUFBQSxVQUpEQyxhQUlDLFFBSkRBLGFBSUM7QUFBQSxVQUhEQyxRQUdDLFFBSERBLFFBR0M7QUFBQSxVQUZEQyxXQUVDLFFBRkRBLFdBRUM7QUFBQSxVQUREQyxjQUNDLFFBRERBLGNBQ0M7O0FBQ0QsVUFBTUMsYUFBYSxLQUFLQyxhQUFMLENBQW1CSixRQUFuQixDQUFuQjtBQUNBLFVBQU1LLGdCQUFnQixLQUFLQyxzQkFBTCxDQUE0Qk4sUUFBNUIsQ0FBdEI7QUFGQyxVQUdNTyxTQUhOLEdBR21CLEtBQUtDLE1BSHhCLENBR01ELFNBSE47O0FBSUQsVUFBTUUsV0FBV0YsVUFBVXhDLGFBQVYsR0FBMEIsSUFBM0M7O0FBRUEsY0FDRSxJQUFJMkMsMkJBQUosNEJBQ0tyQixJQURMLEVBRUtTLGdCQUZMO0FBR0VhLFlBQUksS0FBS0EsRUFIWDtBQUlFZCxnQkFKRjtBQUtFWSwwQkFMRjtBQU1FeEMsa0JBQVVzQyxVQUFVdEMsUUFOdEI7O0FBUUU7QUFDQUQsb0JBQVksS0FBSzRDLGFBQUwsQ0FBbUJMLFVBQVV2QyxVQUE3QixDQVRkO0FBVUU2QyxvQkFBWSxLQUFLTCxNQUFMLENBQVlLLFVBVjFCO0FBV0UvQyxpQkFBU3lDLFVBQVV6QyxPQVhyQjtBQVlFZ0QseUJBQWlCUCxVQUFVcEMsVUFBVixDQUFxQixDQUFyQixDQVpuQjtBQWFFNEMseUJBQWlCUixVQUFVcEMsVUFBVixDQUFxQixDQUFyQixDQWJuQjs7QUFlRTtBQUNBNkMsa0JBQVVULFVBQVUvQixRQWhCdEI7QUFpQkVILHdCQUFnQmtDLFVBQVVsQyxjQUFWLEdBQTJCZ0MsYUFqQjdDO0FBa0JFWSxrQ0FBMEJWLFVBQVVuQyxtQkFBVixDQUE4QixDQUE5QixDQWxCNUI7QUFtQkU4QyxrQ0FBMEJYLFVBQVVuQyxtQkFBVixDQUE4QixDQUE5QixDQW5CNUI7O0FBcUJFO0FBQ0ErQyxjQUFNWixVQUFVLGNBQVYsQ0F0QlI7QUF1QkVhLGtCQUFVLElBdkJaO0FBd0JFQyx1QkFBZSxLQUFLQyxJQUFMLElBQWEsS0FBS0EsSUFBTCxDQUFVRCxhQXhCeEM7O0FBMEJFO0FBQ0FFLDBCQUFrQnJCLGVBQWVzQjtBQTNCbkMsU0FERiwwQ0ErQk0sS0FBS0MsY0FBTCxDQUFvQjFCLGFBQXBCLEtBQXNDLENBQUNRLFVBQVUvQixRQUFqRCxHQUNBLENBQ0UsSUFBSWtELGtCQUFKLENBQWlCO0FBQ2ZmLFlBQU8sS0FBS0EsRUFBWixhQURlO0FBRWZ0QixjQUFNLENBQ0osa0NBQWtCO0FBQ2hCc0Msa0JBQVE1QixjQUFjNEIsTUFETjtBQUVoQmxCLDRCQUZnQjtBQUdoQnhDLG9CQUFVc0MsVUFBVXRDLFFBSEo7QUFJaEIyRCxzQkFBWSxFQUFDQyxXQUFXLEtBQUtyQixNQUFMLENBQVlzQixjQUF4QixFQUpJO0FBS2hCOUI7QUFMZ0IsU0FBbEIsQ0FESSxDQUZTO0FBV2YrQix3QkFBZ0IsSUFBSTVCO0FBWEwsT0FBakIsQ0FERixDQURBLEdBZ0JBLEVBL0NOO0FBaUREOzs7d0JBOUZVO0FBQ1QsYUFBTyxNQUFQO0FBQ0Q7Ozt3QkFFZTtBQUNkLGFBQU82Qix1QkFBUDtBQUNEOzs7RUFkb0NDLDBCOztrQkFBbEJ4RCxTIiwiZmlsZSI6ImdyaWQtbGF5ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIDIwMTggVWJlciBUZWNobm9sb2dpZXMsIEluYy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4vLyBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4vLyBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4vLyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4vLyBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbi8vIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbi8vIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1Jcbi8vIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuLy8gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4vLyBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4vLyBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuLy8gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuLy8gVEhFIFNPRlRXQVJFLlxuXG5pbXBvcnQge0dlb0pzb25MYXllcn0gZnJvbSAnZGVjay5nbCc7XG5pbXBvcnQgQWdncmVnYXRpb25MYXllciBmcm9tICcuLi9hZ2dyZWdhdGlvbi1sYXllcic7XG5pbXBvcnQgRW5oYW5jZWRHcmlkTGF5ZXIgZnJvbSAnZGVja2dsLWxheWVycy9ncmlkLWxheWVyL2VuaGFuY2VkLWdyaWQtbGF5ZXInO1xuaW1wb3J0IHtwb2ludFRvUG9seWdvbkdlb30gZnJvbSAnLi9ncmlkLXV0aWxzJztcbmltcG9ydCBHcmlkTGF5ZXJJY29uIGZyb20gJy4vZ3JpZC1sYXllci1pY29uJztcblxuZXhwb3J0IGNvbnN0IGdyaWRWaXNDb25maWdzID0ge1xuICBvcGFjaXR5OiAnb3BhY2l0eScsXG4gIHdvcmxkVW5pdFNpemU6ICd3b3JsZFVuaXRTaXplJyxcbiAgY29sb3JSYW5nZTogJ2NvbG9yUmFuZ2UnLFxuICBjb3ZlcmFnZTogJ2NvdmVyYWdlJyxcbiAgc2l6ZVJhbmdlOiAnZWxldmF0aW9uUmFuZ2UnLFxuICBwZXJjZW50aWxlOiAncGVyY2VudGlsZScsXG4gIGVsZXZhdGlvblBlcmNlbnRpbGU6ICdlbGV2YXRpb25QZXJjZW50aWxlJyxcbiAgZWxldmF0aW9uU2NhbGU6ICdlbGV2YXRpb25TY2FsZScsXG4gICdoaS1wcmVjaXNpb24nOiAnaGktcHJlY2lzaW9uJyxcbiAgY29sb3JBZ2dyZWdhdGlvbjogJ2FnZ3JlZ2F0aW9uJyxcbiAgc2l6ZUFnZ3JlZ2F0aW9uOiAnc2l6ZUFnZ3JlZ2F0aW9uJyxcbiAgZW5hYmxlM2Q6ICdlbmFibGUzZCdcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdyaWRMYXllciBleHRlbmRzIEFnZ3JlZ2F0aW9uTGF5ZXIge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcblxuICAgIHRoaXMucmVnaXN0ZXJWaXNDb25maWcoZ3JpZFZpc0NvbmZpZ3MpO1xuICAgIHRoaXMudmlzQ29uZmlnU2V0dGluZ3Mud29ybGRVbml0U2l6ZS5sYWJlbCA9ICdHcmlkIFNpemUgKGttKSc7XG4gIH1cblxuICBnZXQgdHlwZSgpIHtcbiAgICByZXR1cm4gJ2dyaWQnO1xuICB9XG5cbiAgZ2V0IGxheWVySWNvbigpIHtcbiAgICByZXR1cm4gR3JpZExheWVySWNvbjtcbiAgfVxuICBmb3JtYXRMYXllckRhdGEoXywgYWxsRGF0YSwgZmlsdGVyZWRJbmRleCwgb2xkTGF5ZXJEYXRhLCBvcHQgPSB7fSkge1xuICAgIGNvbnN0IGZvcm1hdHRlZERhdGEgPSBzdXBlci5mb3JtYXRMYXllckRhdGEoXG4gICAgICBfLFxuICAgICAgYWxsRGF0YSxcbiAgICAgIGZpbHRlcmVkSW5kZXgsXG4gICAgICBvbGRMYXllckRhdGEsXG4gICAgICBvcHRcbiAgICApO1xuXG4gICAgY29uc3Qge2dldFBvc2l0aW9uLCBkYXRhfSA9IGZvcm1hdHRlZERhdGE7XG5cbiAgICAvLyBUT0RPOiBmaXggdGhpcyBpbiBkZWNrLmdsIGxheWVyXG4gICAgY29uc3QgY2xlYW5lZCA9IGRhdGEuZmlsdGVyKGQgPT4ge1xuICAgICAgY29uc3QgcG9zID0gZ2V0UG9zaXRpb24oZCk7XG4gICAgICByZXR1cm4gcG9zLmV2ZXJ5KE51bWJlci5pc0Zpbml0ZSk7XG4gICAgfSk7XG5cbiAgICAvLyBBbGwgZGF0YSBwcm9jZXNzaW5nIGlzIGRvbmUgaW4gZGVjay5nbCBsYXllclxuICAgIHJldHVybiB7XG4gICAgICAuLi5mb3JtYXR0ZWREYXRhLFxuICAgICAgZGF0YTogY2xlYW5lZFxuICAgIH07XG4gIH1cblxuICByZW5kZXJMYXllcih7XG4gICAgZGF0YSxcbiAgICBpZHgsXG4gICAgbGF5ZXJJbnRlcmFjdGlvbixcbiAgICBvYmplY3RIb3ZlcmVkLFxuICAgIG1hcFN0YXRlLFxuICAgIGludGVyYWN0aW9uLFxuICAgIGxheWVyQ2FsbGJhY2tzXG4gIH0pIHtcbiAgICBjb25zdCB6b29tRmFjdG9yID0gdGhpcy5nZXRab29tRmFjdG9yKG1hcFN0YXRlKTtcbiAgICBjb25zdCBlbGVab29tRmFjdG9yID0gdGhpcy5nZXRFbGV2YXRpb25ab29tRmFjdG9yKG1hcFN0YXRlKTtcbiAgICBjb25zdCB7dmlzQ29uZmlnfSA9IHRoaXMuY29uZmlnO1xuICAgIGNvbnN0IGNlbGxTaXplID0gdmlzQ29uZmlnLndvcmxkVW5pdFNpemUgKiAxMDAwO1xuXG4gICAgcmV0dXJuIFtcbiAgICAgIG5ldyBFbmhhbmNlZEdyaWRMYXllcih7XG4gICAgICAgIC4uLmRhdGEsXG4gICAgICAgIC4uLmxheWVySW50ZXJhY3Rpb24sXG4gICAgICAgIGlkOiB0aGlzLmlkLFxuICAgICAgICBpZHgsXG4gICAgICAgIGNlbGxTaXplLFxuICAgICAgICBjb3ZlcmFnZTogdmlzQ29uZmlnLmNvdmVyYWdlLFxuXG4gICAgICAgIC8vIGNvbG9yXG4gICAgICAgIGNvbG9yUmFuZ2U6IHRoaXMuZ2V0Q29sb3JSYW5nZSh2aXNDb25maWcuY29sb3JSYW5nZSksXG4gICAgICAgIGNvbG9yU2NhbGU6IHRoaXMuY29uZmlnLmNvbG9yU2NhbGUsXG4gICAgICAgIG9wYWNpdHk6IHZpc0NvbmZpZy5vcGFjaXR5LFxuICAgICAgICB1cHBlclBlcmNlbnRpbGU6IHZpc0NvbmZpZy5wZXJjZW50aWxlWzFdLFxuICAgICAgICBsb3dlclBlcmNlbnRpbGU6IHZpc0NvbmZpZy5wZXJjZW50aWxlWzBdLFxuXG4gICAgICAgIC8vIGVsZXZhdGlvblxuICAgICAgICBleHRydWRlZDogdmlzQ29uZmlnLmVuYWJsZTNkLFxuICAgICAgICBlbGV2YXRpb25TY2FsZTogdmlzQ29uZmlnLmVsZXZhdGlvblNjYWxlICogZWxlWm9vbUZhY3RvcixcbiAgICAgICAgZWxldmF0aW9uTG93ZXJQZXJjZW50aWxlOiB2aXNDb25maWcuZWxldmF0aW9uUGVyY2VudGlsZVswXSxcbiAgICAgICAgZWxldmF0aW9uVXBwZXJQZXJjZW50aWxlOiB2aXNDb25maWcuZWxldmF0aW9uUGVyY2VudGlsZVsxXSxcblxuICAgICAgICAvLyByZW5kZXJcbiAgICAgICAgZnA2NDogdmlzQ29uZmlnWydoaS1wcmVjaXNpb24nXSxcbiAgICAgICAgcGlja2FibGU6IHRydWUsXG4gICAgICAgIGxpZ2h0U2V0dGluZ3M6IHRoaXMubWV0YSAmJiB0aGlzLm1ldGEubGlnaHRTZXR0aW5ncyxcblxuICAgICAgICAvLyBjYWxsYmFja3NcbiAgICAgICAgb25TZXRDb2xvckRvbWFpbjogbGF5ZXJDYWxsYmFja3Mub25TZXRMYXllckRvbWFpblxuICAgICAgfSksXG5cbiAgICAgIC4uLih0aGlzLmlzTGF5ZXJIb3ZlcmVkKG9iamVjdEhvdmVyZWQpICYmICF2aXNDb25maWcuZW5hYmxlM2RcbiAgICAgICAgPyBbXG4gICAgICAgICAgICBuZXcgR2VvSnNvbkxheWVyKHtcbiAgICAgICAgICAgICAgaWQ6IGAke3RoaXMuaWR9LWhvdmVyZWRgLFxuICAgICAgICAgICAgICBkYXRhOiBbXG4gICAgICAgICAgICAgICAgcG9pbnRUb1BvbHlnb25HZW8oe1xuICAgICAgICAgICAgICAgICAgb2JqZWN0OiBvYmplY3RIb3ZlcmVkLm9iamVjdCxcbiAgICAgICAgICAgICAgICAgIGNlbGxTaXplLFxuICAgICAgICAgICAgICAgICAgY292ZXJhZ2U6IHZpc0NvbmZpZy5jb3ZlcmFnZSxcbiAgICAgICAgICAgICAgICAgIHByb3BlcnRpZXM6IHtsaW5lQ29sb3I6IHRoaXMuY29uZmlnLmhpZ2hsaWdodENvbG9yfSxcbiAgICAgICAgICAgICAgICAgIG1hcFN0YXRlXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgbGluZVdpZHRoU2NhbGU6IDggKiB6b29tRmFjdG9yXG4gICAgICAgICAgICB9KVxuICAgICAgICAgIF1cbiAgICAgICAgOiBbXSlcbiAgICBdO1xuICB9XG59XG4iXX0=