'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.clusterVisConfigs = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _deck = require('deck.gl');

var _aggregationLayer = require('../aggregation-layer');

var _aggregationLayer2 = _interopRequireDefault(_aggregationLayer);

var _clusterLayer = require('../../deckgl-layers/cluster-layer/cluster-layer');

var _clusterLayer2 = _interopRequireDefault(_clusterLayer);

var _defaultSettings = require('../../constants/default-settings');

var _clusterLayerIcon = require('./cluster-layer-icon');

var _clusterLayerIcon2 = _interopRequireDefault(_clusterLayerIcon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var clusterVisConfigs = exports.clusterVisConfigs = {
  opacity: 'opacity',
  clusterRadius: 'clusterRadius',
  colorRange: 'colorRange',
  radiusRange: 'clusterRadiusRange',
  'hi-precision': 'hi-precision',
  colorAggregation: 'aggregation'
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

var ClusterLayer = function (_AggregationLayer) {
  (0, _inherits3.default)(ClusterLayer, _AggregationLayer);

  function ClusterLayer(props) {
    (0, _classCallCheck3.default)(this, ClusterLayer);

    var _this = (0, _possibleConstructorReturn3.default)(this, (ClusterLayer.__proto__ || Object.getPrototypeOf(ClusterLayer)).call(this, props));

    _this.registerVisConfig(clusterVisConfigs);
    return _this;
  }

  (0, _createClass3.default)(ClusterLayer, [{
    key: 'renderLayer',
    value: function renderLayer(_ref) {
      var _this2 = this;

      var data = _ref.data,
          idx = _ref.idx,
          layerInteraction = _ref.layerInteraction,
          objectHovered = _ref.objectHovered,
          mapState = _ref.mapState,
          interaction = _ref.interaction,
          layerCallbacks = _ref.layerCallbacks;
      var visConfig = this.config.visConfig;


      return [new _clusterLayer2.default((0, _extends3.default)({}, data, layerInteraction, {
        id: this.id,
        idx: idx,
        radiusScale: 1,
        radiusRange: visConfig.radiusRange,
        clusterRadius: visConfig.clusterRadius,
        colorRange: this.getColorRange(visConfig.colorRange),
        colorScale: this.config.colorScale,
        pickable: true,
        opacity: visConfig.opacity,
        fp64: visConfig['hi-precision'],
        lightSettings: this.meta.lightSettings,

        // call back from layer after calculate clusters
        onSetColorDomain: layerCallbacks.onSetLayerDomain
      }))].concat((0, _toConsumableArray3.default)(this.isLayerHovered(objectHovered) ? [new _deck.ScatterplotLayer({
        id: this.id + '-hovered',
        data: [objectHovered.object],
        getColor: function getColor(d) {
          return _this2.config.highlightColor;
        }
      })] : []));
    }
  }, {
    key: 'type',
    get: function get() {
      return 'cluster';
    }
  }, {
    key: 'layerIcon',
    get: function get() {
      return _clusterLayerIcon2.default;
    }
  }, {
    key: 'visualChannels',
    get: function get() {
      return {
        color: {
          aggregation: 'colorAggregation',
          channelScaleType: _defaultSettings.CHANNEL_SCALES.colorAggr,
          defaultMeasure: 'Point Count',
          domain: 'colorDomain',
          field: 'colorField',
          key: 'color',
          property: 'color',
          range: 'colorRange',
          scale: 'colorScale'
        }
      };
    }
  }]);
  return ClusterLayer;
}(_aggregationLayer2.default);

exports.default = ClusterLayer;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9sYXllcnMvY2x1c3Rlci1sYXllci9jbHVzdGVyLWxheWVyLmpzIl0sIm5hbWVzIjpbImNsdXN0ZXJWaXNDb25maWdzIiwib3BhY2l0eSIsImNsdXN0ZXJSYWRpdXMiLCJjb2xvclJhbmdlIiwicmFkaXVzUmFuZ2UiLCJjb2xvckFnZ3JlZ2F0aW9uIiwiQ2x1c3RlckxheWVyIiwicHJvcHMiLCJyZWdpc3RlclZpc0NvbmZpZyIsImRhdGEiLCJpZHgiLCJsYXllckludGVyYWN0aW9uIiwib2JqZWN0SG92ZXJlZCIsIm1hcFN0YXRlIiwiaW50ZXJhY3Rpb24iLCJsYXllckNhbGxiYWNrcyIsInZpc0NvbmZpZyIsImNvbmZpZyIsIkRlY2tHTENsdXN0ZXJMYXllciIsImlkIiwicmFkaXVzU2NhbGUiLCJnZXRDb2xvclJhbmdlIiwiY29sb3JTY2FsZSIsInBpY2thYmxlIiwiZnA2NCIsImxpZ2h0U2V0dGluZ3MiLCJtZXRhIiwib25TZXRDb2xvckRvbWFpbiIsIm9uU2V0TGF5ZXJEb21haW4iLCJpc0xheWVySG92ZXJlZCIsIlNjYXR0ZXJwbG90TGF5ZXIiLCJvYmplY3QiLCJnZXRDb2xvciIsImhpZ2hsaWdodENvbG9yIiwiQ2x1c3RlckxheWVySWNvbiIsImNvbG9yIiwiYWdncmVnYXRpb24iLCJjaGFubmVsU2NhbGVUeXBlIiwiQ0hBTk5FTF9TQ0FMRVMiLCJjb2xvckFnZ3IiLCJkZWZhdWx0TWVhc3VyZSIsImRvbWFpbiIsImZpZWxkIiwia2V5IiwicHJvcGVydHkiLCJyYW5nZSIsInNjYWxlIiwiQWdncmVnYXRpb25MYXllciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQW9CQTs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7Ozs7OztBQUVPLElBQU1BLGdEQUFvQjtBQUMvQkMsV0FBUyxTQURzQjtBQUUvQkMsaUJBQWUsZUFGZ0I7QUFHL0JDLGNBQVksWUFIbUI7QUFJL0JDLGVBQWEsb0JBSmtCO0FBSy9CLGtCQUFnQixjQUxlO0FBTS9CQyxvQkFBa0I7QUFOYSxDQUExQixDLENBMUJQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztJQWlCcUJDLFk7OztBQUNuQix3QkFBWUMsS0FBWixFQUFtQjtBQUFBOztBQUFBLDBJQUNYQSxLQURXOztBQUVqQixVQUFLQyxpQkFBTCxDQUF1QlIsaUJBQXZCO0FBRmlCO0FBR2xCOzs7O3NDQWlDRTtBQUFBOztBQUFBLFVBUERTLElBT0MsUUFQREEsSUFPQztBQUFBLFVBTkRDLEdBTUMsUUFOREEsR0FNQztBQUFBLFVBTERDLGdCQUtDLFFBTERBLGdCQUtDO0FBQUEsVUFKREMsYUFJQyxRQUpEQSxhQUlDO0FBQUEsVUFIREMsUUFHQyxRQUhEQSxRQUdDO0FBQUEsVUFGREMsV0FFQyxRQUZEQSxXQUVDO0FBQUEsVUFEREMsY0FDQyxRQUREQSxjQUNDO0FBQUEsVUFDTUMsU0FETixHQUNtQixLQUFLQyxNQUR4QixDQUNNRCxTQUROOzs7QUFHRCxjQUNFLElBQUlFLHNCQUFKLDRCQUNLVCxJQURMLEVBRUtFLGdCQUZMO0FBR0VRLFlBQUksS0FBS0EsRUFIWDtBQUlFVCxnQkFKRjtBQUtFVSxxQkFBYSxDQUxmO0FBTUVoQixxQkFBYVksVUFBVVosV0FOekI7QUFPRUYsdUJBQWVjLFVBQVVkLGFBUDNCO0FBUUVDLG9CQUFZLEtBQUtrQixhQUFMLENBQW1CTCxVQUFVYixVQUE3QixDQVJkO0FBU0VtQixvQkFBWSxLQUFLTCxNQUFMLENBQVlLLFVBVDFCO0FBVUVDLGtCQUFVLElBVlo7QUFXRXRCLGlCQUFTZSxVQUFVZixPQVhyQjtBQVlFdUIsY0FBTVIsVUFBVSxjQUFWLENBWlI7QUFhRVMsdUJBQWUsS0FBS0MsSUFBTCxDQUFVRCxhQWIzQjs7QUFlRTtBQUNBRSwwQkFBa0JaLGVBQWVhO0FBaEJuQyxTQURGLDBDQW9CTSxLQUFLQyxjQUFMLENBQW9CakIsYUFBcEIsSUFDQSxDQUNFLElBQUlrQixzQkFBSixDQUFxQjtBQUNuQlgsWUFBTyxLQUFLQSxFQUFaLGFBRG1CO0FBRW5CVixjQUFNLENBQUNHLGNBQWNtQixNQUFmLENBRmE7QUFHbkJDLGtCQUFVO0FBQUEsaUJBQUssT0FBS2YsTUFBTCxDQUFZZ0IsY0FBakI7QUFBQTtBQUhTLE9BQXJCLENBREYsQ0FEQSxHQVFBLEVBNUJOO0FBOEJEOzs7d0JBaEVVO0FBQ1QsYUFBTyxTQUFQO0FBQ0Q7Ozt3QkFFZTtBQUNkLGFBQU9DLDBCQUFQO0FBQ0Q7Ozt3QkFDb0I7QUFDbkIsYUFBTztBQUNMQyxlQUFPO0FBQ0xDLHVCQUFhLGtCQURSO0FBRUxDLDRCQUFrQkMsZ0NBQWVDLFNBRjVCO0FBR0xDLDBCQUFnQixhQUhYO0FBSUxDLGtCQUFRLGFBSkg7QUFLTEMsaUJBQU8sWUFMRjtBQU1MQyxlQUFLLE9BTkE7QUFPTEMsb0JBQVUsT0FQTDtBQVFMQyxpQkFBTyxZQVJGO0FBU0xDLGlCQUFPO0FBVEY7QUFERixPQUFQO0FBYUQ7OztFQTNCdUNDLDBCOztrQkFBckJ6QyxZIiwiZmlsZSI6ImNsdXN0ZXItbGF5ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIDIwMTggVWJlciBUZWNobm9sb2dpZXMsIEluYy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4vLyBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4vLyBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4vLyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4vLyBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbi8vIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbi8vIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1Jcbi8vIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuLy8gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4vLyBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4vLyBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuLy8gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuLy8gVEhFIFNPRlRXQVJFLlxuXG5pbXBvcnQge1NjYXR0ZXJwbG90TGF5ZXJ9IGZyb20gJ2RlY2suZ2wnO1xuaW1wb3J0IEFnZ3JlZ2F0aW9uTGF5ZXIgZnJvbSAnLi4vYWdncmVnYXRpb24tbGF5ZXInO1xuaW1wb3J0IERlY2tHTENsdXN0ZXJMYXllciBmcm9tICdkZWNrZ2wtbGF5ZXJzL2NsdXN0ZXItbGF5ZXIvY2x1c3Rlci1sYXllcic7XG5pbXBvcnQge0NIQU5ORUxfU0NBTEVTfSBmcm9tICdjb25zdGFudHMvZGVmYXVsdC1zZXR0aW5ncyc7XG5pbXBvcnQgQ2x1c3RlckxheWVySWNvbiBmcm9tICcuL2NsdXN0ZXItbGF5ZXItaWNvbic7XG5cbmV4cG9ydCBjb25zdCBjbHVzdGVyVmlzQ29uZmlncyA9IHtcbiAgb3BhY2l0eTogJ29wYWNpdHknLFxuICBjbHVzdGVyUmFkaXVzOiAnY2x1c3RlclJhZGl1cycsXG4gIGNvbG9yUmFuZ2U6ICdjb2xvclJhbmdlJyxcbiAgcmFkaXVzUmFuZ2U6ICdjbHVzdGVyUmFkaXVzUmFuZ2UnLFxuICAnaGktcHJlY2lzaW9uJzogJ2hpLXByZWNpc2lvbicsXG4gIGNvbG9yQWdncmVnYXRpb246ICdhZ2dyZWdhdGlvbidcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENsdXN0ZXJMYXllciBleHRlbmRzIEFnZ3JlZ2F0aW9uTGF5ZXIge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLnJlZ2lzdGVyVmlzQ29uZmlnKGNsdXN0ZXJWaXNDb25maWdzKTtcbiAgfVxuXG4gIGdldCB0eXBlKCkge1xuICAgIHJldHVybiAnY2x1c3Rlcic7XG4gIH1cblxuICBnZXQgbGF5ZXJJY29uKCkge1xuICAgIHJldHVybiBDbHVzdGVyTGF5ZXJJY29uO1xuICB9XG4gIGdldCB2aXN1YWxDaGFubmVscygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgY29sb3I6IHtcbiAgICAgICAgYWdncmVnYXRpb246ICdjb2xvckFnZ3JlZ2F0aW9uJyxcbiAgICAgICAgY2hhbm5lbFNjYWxlVHlwZTogQ0hBTk5FTF9TQ0FMRVMuY29sb3JBZ2dyLFxuICAgICAgICBkZWZhdWx0TWVhc3VyZTogJ1BvaW50IENvdW50JyxcbiAgICAgICAgZG9tYWluOiAnY29sb3JEb21haW4nLFxuICAgICAgICBmaWVsZDogJ2NvbG9yRmllbGQnLFxuICAgICAgICBrZXk6ICdjb2xvcicsXG4gICAgICAgIHByb3BlcnR5OiAnY29sb3InLFxuICAgICAgICByYW5nZTogJ2NvbG9yUmFuZ2UnLFxuICAgICAgICBzY2FsZTogJ2NvbG9yU2NhbGUnXG4gICAgICB9XG4gICAgfTtcbiAgfVxuXG4gIHJlbmRlckxheWVyKHtcbiAgICBkYXRhLFxuICAgIGlkeCxcbiAgICBsYXllckludGVyYWN0aW9uLFxuICAgIG9iamVjdEhvdmVyZWQsXG4gICAgbWFwU3RhdGUsXG4gICAgaW50ZXJhY3Rpb24sXG4gICAgbGF5ZXJDYWxsYmFja3NcbiAgfSkge1xuICAgIGNvbnN0IHt2aXNDb25maWd9ID0gdGhpcy5jb25maWc7XG5cbiAgICByZXR1cm4gW1xuICAgICAgbmV3IERlY2tHTENsdXN0ZXJMYXllcih7XG4gICAgICAgIC4uLmRhdGEsXG4gICAgICAgIC4uLmxheWVySW50ZXJhY3Rpb24sXG4gICAgICAgIGlkOiB0aGlzLmlkLFxuICAgICAgICBpZHgsXG4gICAgICAgIHJhZGl1c1NjYWxlOiAxLFxuICAgICAgICByYWRpdXNSYW5nZTogdmlzQ29uZmlnLnJhZGl1c1JhbmdlLFxuICAgICAgICBjbHVzdGVyUmFkaXVzOiB2aXNDb25maWcuY2x1c3RlclJhZGl1cyxcbiAgICAgICAgY29sb3JSYW5nZTogdGhpcy5nZXRDb2xvclJhbmdlKHZpc0NvbmZpZy5jb2xvclJhbmdlKSxcbiAgICAgICAgY29sb3JTY2FsZTogdGhpcy5jb25maWcuY29sb3JTY2FsZSxcbiAgICAgICAgcGlja2FibGU6IHRydWUsXG4gICAgICAgIG9wYWNpdHk6IHZpc0NvbmZpZy5vcGFjaXR5LFxuICAgICAgICBmcDY0OiB2aXNDb25maWdbJ2hpLXByZWNpc2lvbiddLFxuICAgICAgICBsaWdodFNldHRpbmdzOiB0aGlzLm1ldGEubGlnaHRTZXR0aW5ncyxcblxuICAgICAgICAvLyBjYWxsIGJhY2sgZnJvbSBsYXllciBhZnRlciBjYWxjdWxhdGUgY2x1c3RlcnNcbiAgICAgICAgb25TZXRDb2xvckRvbWFpbjogbGF5ZXJDYWxsYmFja3Mub25TZXRMYXllckRvbWFpblxuICAgICAgfSksXG5cbiAgICAgIC4uLih0aGlzLmlzTGF5ZXJIb3ZlcmVkKG9iamVjdEhvdmVyZWQpXG4gICAgICAgID8gW1xuICAgICAgICAgICAgbmV3IFNjYXR0ZXJwbG90TGF5ZXIoe1xuICAgICAgICAgICAgICBpZDogYCR7dGhpcy5pZH0taG92ZXJlZGAsXG4gICAgICAgICAgICAgIGRhdGE6IFtvYmplY3RIb3ZlcmVkLm9iamVjdF0sXG4gICAgICAgICAgICAgIGdldENvbG9yOiBkID0+IHRoaXMuY29uZmlnLmhpZ2hsaWdodENvbG9yXG4gICAgICAgICAgICB9KVxuICAgICAgICAgIF1cbiAgICAgICAgOiBbXSlcbiAgICBdO1xuICB9XG59XG4iXX0=