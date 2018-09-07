'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.pointVisConfigs = exports.pointOptionalColumns = exports.pointRequiredColumns = exports.pointPosResolver = exports.pointPosAccessor = undefined;

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

var _baseLayer = require('../base-layer');

var _baseLayer2 = _interopRequireDefault(_baseLayer);

var _lodash = require('lodash.memoize');

var _lodash2 = _interopRequireDefault(_lodash);

var _deck = require('deck.gl');

var _scatterplotBrushingLayer = require('../../deckgl-layers/scatterplot-brushing-layer/scatterplot-brushing-layer');

var _scatterplotBrushingLayer2 = _interopRequireDefault(_scatterplotBrushingLayer);

var _colorUtils = require('../../utils/color-utils');

var _pointLayerIcon = require('./point-layer-icon');

var _pointLayerIcon2 = _interopRequireDefault(_pointLayerIcon);

var _defaultSettings = require('../../constants/default-settings');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var pointPosAccessor = exports.pointPosAccessor = function pointPosAccessor(_ref) {
  var lat = _ref.lat,
      lng = _ref.lng,
      altitude = _ref.altitude;
  return function (d) {
    return [d.data[lng.fieldIdx], d.data[lat.fieldIdx], altitude && altitude.fieldIdx > -1 ? d.data[altitude.fieldIdx] : 0];
  };
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

var pointPosResolver = exports.pointPosResolver = function pointPosResolver(_ref2) {
  var lat = _ref2.lat,
      lng = _ref2.lng,
      altitude = _ref2.altitude;
  return lat.fieldIdx + '-' + lng.fieldIdx + '-' + (altitude ? altitude.fieldIdx : 'z');
};
var pointRequiredColumns = exports.pointRequiredColumns = ['lat', 'lng'];
var pointOptionalColumns = exports.pointOptionalColumns = ['altitude'];

var pointVisConfigs = exports.pointVisConfigs = {
  radius: 'radius',
  fixedRadius: 'fixedRadius',
  opacity: 'opacity',
  outline: 'outline',
  thickness: 'thickness',
  colorRange: 'colorRange',
  radiusRange: 'radiusRange',
  'hi-precision': 'hi-precision'
};

var PointLayer = function (_Layer) {
  (0, _inherits3.default)(PointLayer, _Layer);

  function PointLayer(props) {
    (0, _classCallCheck3.default)(this, PointLayer);

    var _this = (0, _possibleConstructorReturn3.default)(this, (PointLayer.__proto__ || Object.getPrototypeOf(PointLayer)).call(this, props));

    _this.registerVisConfig(pointVisConfigs);
    _this.getPosition = (0, _lodash2.default)(pointPosAccessor, pointPosResolver);
    return _this;
  }

  (0, _createClass3.default)(PointLayer, [{
    key: 'formatLayerData',
    value: function formatLayerData(_, allData, filteredIndex, oldLayerData) {
      var _this2 = this;

      var opt = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};
      var _config = this.config,
          colorScale = _config.colorScale,
          colorDomain = _config.colorDomain,
          colorField = _config.colorField,
          color = _config.color,
          columns = _config.columns,
          sizeField = _config.sizeField,
          sizeScale = _config.sizeScale,
          sizeDomain = _config.sizeDomain,
          _config$visConfig = _config.visConfig,
          radiusRange = _config$visConfig.radiusRange,
          fixedRadius = _config$visConfig.fixedRadius,
          colorRange = _config$visConfig.colorRange;

      // point color

      var cScale = colorField && this.getVisChannelScale(colorScale, colorDomain, colorRange.colors.map(_colorUtils.hexToRgb));

      // point radius
      var rScale = sizeField && this.getVisChannelScale(sizeScale, sizeDomain, radiusRange, fixedRadius);

      var getPosition = this.getPosition(columns);

      if (!oldLayerData || oldLayerData.getPosition !== getPosition) {
        this.updateLayerMeta(allData, getPosition);
      }

      var data = void 0;
      if (oldLayerData && oldLayerData.data && opt.sameData && oldLayerData.getPosition === getPosition) {
        data = oldLayerData.data;
      } else {
        data = filteredIndex.reduce(function (accu, index) {
          var pos = getPosition({ data: allData[index] });

          // if doesn't have point lat or lng, do not add the point
          // deck.gl can't handle position = null
          if (!pos.every(Number.isFinite)) {
            return accu;
          }

          accu.push({
            data: allData[index]
          });

          return accu;
        }, []);
      }

      var getRadius = function getRadius(d) {
        return rScale ? _this2.getEncodedChannelValue(rScale, d.data, sizeField) : 1;
      };

      var getColor = function getColor(d) {
        return cScale ? _this2.getEncodedChannelValue(cScale, d.data, colorField) : color;
      };

      return {
        data: data,
        getPosition: getPosition,
        getColor: getColor,
        getRadius: getRadius
      };
    }
  }, {
    key: 'updateLayerMeta',
    value: function updateLayerMeta(allData, getPosition) {
      var bounds = this.getPointsBounds(allData, function (d) {
        return getPosition({ data: d });
      });
      this.updateMeta({ bounds: bounds });
    }
  }, {
    key: 'renderLayer',
    value: function renderLayer(_ref3) {
      var data = _ref3.data,
          idx = _ref3.idx,
          layerInteraction = _ref3.layerInteraction,
          objectHovered = _ref3.objectHovered,
          mapState = _ref3.mapState,
          interactionConfig = _ref3.interactionConfig;

      var layerProps = (0, _extends3.default)({
        outline: this.config.visConfig.outline,
        radiusMinPixels: 1,
        fp64: this.config.visConfig['hi-precision'],
        strokeWidth: this.config.visConfig.thickness,
        radiusScale: this.getRadiusScaleByZoom(mapState)
      }, this.config.visConfig.fixedRadius ? {} : { radiusMaxPixels: 500 });

      var baseLayerProp = (0, _extends3.default)({}, layerProps, layerInteraction, data, {
        idx: idx,
        opacity: this.config.visConfig.opacity,
        pickable: true,
        updateTriggers: {
          getRadius: {
            sizeField: this.config.sizeField,
            radiusRange: this.config.visConfig.radiusRange,
            fixedRadius: this.config.visConfig.fixedRadius,
            sizeScale: this.config.sizeScale
          },
          getColor: {
            color: this.config.color,
            colorField: this.config.colorField,
            colorRange: this.config.visConfig.colorRange,
            colorScale: this.config.colorScale
          }
        }
      });

      return [
      // base layer
      interactionConfig.brush.enabled ? new _scatterplotBrushingLayer2.default((0, _extends3.default)({}, baseLayerProp, {
        id: this.id + '-brush',
        enableBrushing: true,
        brushRadius: interactionConfig.brush.config.size * 1000
      })) : new _deck.ScatterplotLayer((0, _extends3.default)({
        id: this.id
      }, baseLayerProp))].concat((0, _toConsumableArray3.default)(this.isLayerHovered(objectHovered) ? [new _deck.ScatterplotLayer((0, _extends3.default)({}, layerProps, {
        id: this.id + '-hovered',
        data: [{
          color: this.config.highlightColor,
          position: data.getPosition(objectHovered.object),
          radius: data.getRadius(objectHovered.object)
        }],
        pickable: false
      }))] : []));
    }
  }, {
    key: 'type',
    get: function get() {
      return 'point';
    }
  }, {
    key: 'isAggregated',
    get: function get() {
      return false;
    }
  }, {
    key: 'layerIcon',
    get: function get() {
      return _pointLayerIcon2.default;
    }
  }, {
    key: 'requiredLayerColumns',
    get: function get() {
      return pointRequiredColumns;
    }
  }, {
    key: 'optionalColumns',
    get: function get() {
      return pointOptionalColumns;
    }
  }, {
    key: 'columnPairs',
    get: function get() {
      return this.defaultPointColumnPairs;
    }
  }, {
    key: 'noneLayerDataAffectingProps',
    get: function get() {
      return [].concat((0, _toConsumableArray3.default)((0, _get3.default)(PointLayer.prototype.__proto__ || Object.getPrototypeOf(PointLayer.prototype), 'noneLayerDataAffectingProps', this)), ['radius']);
    }
  }, {
    key: 'visualChannels',
    get: function get() {
      return (0, _extends3.default)({}, (0, _get3.default)(PointLayer.prototype.__proto__ || Object.getPrototypeOf(PointLayer.prototype), 'visualChannels', this), {
        size: (0, _extends3.default)({}, (0, _get3.default)(PointLayer.prototype.__proto__ || Object.getPrototypeOf(PointLayer.prototype), 'visualChannels', this).size, {
          range: 'radiusRange',
          property: 'radius',
          channelScaleType: 'radius'
        })
      });
    }
  }], [{
    key: 'findDefaultLayerProps',
    value: function findDefaultLayerProps(_ref4) {
      var _ref4$fieldPairs = _ref4.fieldPairs,
          fieldPairs = _ref4$fieldPairs === undefined ? [] : _ref4$fieldPairs;

      var props = [];

      // Make layer for each pair
      fieldPairs.forEach(function (pair) {
        // find fields for tableFieldIndex
        var latField = pair.pair.lat;
        var lngField = pair.pair.lng;
        var layerName = pair.defaultName;

        var prop = {
          label: layerName.length ? layerName : 'Point'
        };

        // default layer color for begintrip and dropoff point
        if (latField.value in _defaultSettings.DEFAULT_LAYER_COLOR) {
          prop.color = (0, _colorUtils.hexToRgb)(_defaultSettings.DEFAULT_LAYER_COLOR[latField.value]);
        }

        // set the first layer to be visible
        if (props.length === 0) {
          prop.isVisible = true;
        }

        // const newLayer = new KeplerGlLayers.PointLayer(prop);
        prop.columns = {
          lat: latField,
          lng: lngField,
          altitude: { value: null, fieldIdx: -1, optional: true }
        };

        props.push(prop);
      });

      return props;
    }
  }]);
  return PointLayer;
}(_baseLayer2.default);

exports.default = PointLayer;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9sYXllcnMvcG9pbnQtbGF5ZXIvcG9pbnQtbGF5ZXIuanMiXSwibmFtZXMiOlsicG9pbnRQb3NBY2Nlc3NvciIsImxhdCIsImxuZyIsImFsdGl0dWRlIiwiZCIsImRhdGEiLCJmaWVsZElkeCIsInBvaW50UG9zUmVzb2x2ZXIiLCJwb2ludFJlcXVpcmVkQ29sdW1ucyIsInBvaW50T3B0aW9uYWxDb2x1bW5zIiwicG9pbnRWaXNDb25maWdzIiwicmFkaXVzIiwiZml4ZWRSYWRpdXMiLCJvcGFjaXR5Iiwib3V0bGluZSIsInRoaWNrbmVzcyIsImNvbG9yUmFuZ2UiLCJyYWRpdXNSYW5nZSIsIlBvaW50TGF5ZXIiLCJwcm9wcyIsInJlZ2lzdGVyVmlzQ29uZmlnIiwiZ2V0UG9zaXRpb24iLCJfIiwiYWxsRGF0YSIsImZpbHRlcmVkSW5kZXgiLCJvbGRMYXllckRhdGEiLCJvcHQiLCJjb25maWciLCJjb2xvclNjYWxlIiwiY29sb3JEb21haW4iLCJjb2xvckZpZWxkIiwiY29sb3IiLCJjb2x1bW5zIiwic2l6ZUZpZWxkIiwic2l6ZVNjYWxlIiwic2l6ZURvbWFpbiIsInZpc0NvbmZpZyIsImNTY2FsZSIsImdldFZpc0NoYW5uZWxTY2FsZSIsImNvbG9ycyIsIm1hcCIsImhleFRvUmdiIiwiclNjYWxlIiwidXBkYXRlTGF5ZXJNZXRhIiwic2FtZURhdGEiLCJyZWR1Y2UiLCJhY2N1IiwiaW5kZXgiLCJwb3MiLCJldmVyeSIsIk51bWJlciIsImlzRmluaXRlIiwicHVzaCIsImdldFJhZGl1cyIsImdldEVuY29kZWRDaGFubmVsVmFsdWUiLCJnZXRDb2xvciIsImJvdW5kcyIsImdldFBvaW50c0JvdW5kcyIsInVwZGF0ZU1ldGEiLCJpZHgiLCJsYXllckludGVyYWN0aW9uIiwib2JqZWN0SG92ZXJlZCIsIm1hcFN0YXRlIiwiaW50ZXJhY3Rpb25Db25maWciLCJsYXllclByb3BzIiwicmFkaXVzTWluUGl4ZWxzIiwiZnA2NCIsInN0cm9rZVdpZHRoIiwicmFkaXVzU2NhbGUiLCJnZXRSYWRpdXNTY2FsZUJ5Wm9vbSIsInJhZGl1c01heFBpeGVscyIsImJhc2VMYXllclByb3AiLCJwaWNrYWJsZSIsInVwZGF0ZVRyaWdnZXJzIiwiYnJ1c2giLCJlbmFibGVkIiwiU2NhdHRlcnBsb3RCcnVzaGluZ0xheWVyIiwiaWQiLCJlbmFibGVCcnVzaGluZyIsImJydXNoUmFkaXVzIiwic2l6ZSIsIlNjYXR0ZXJwbG90TGF5ZXIiLCJpc0xheWVySG92ZXJlZCIsImhpZ2hsaWdodENvbG9yIiwicG9zaXRpb24iLCJvYmplY3QiLCJQb2ludExheWVySWNvbiIsImRlZmF1bHRQb2ludENvbHVtblBhaXJzIiwicmFuZ2UiLCJwcm9wZXJ0eSIsImNoYW5uZWxTY2FsZVR5cGUiLCJmaWVsZFBhaXJzIiwiZm9yRWFjaCIsImxhdEZpZWxkIiwicGFpciIsImxuZ0ZpZWxkIiwibGF5ZXJOYW1lIiwiZGVmYXVsdE5hbWUiLCJwcm9wIiwibGFiZWwiLCJsZW5ndGgiLCJ2YWx1ZSIsIkRFRkFVTFRfTEFZRVJfQ09MT1IiLCJpc1Zpc2libGUiLCJvcHRpb25hbCIsIkxheWVyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQW9CQTs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7OztBQUNBOzs7O0FBRU8sSUFBTUEsOENBQW1CLFNBQW5CQSxnQkFBbUI7QUFBQSxNQUFFQyxHQUFGLFFBQUVBLEdBQUY7QUFBQSxNQUFPQyxHQUFQLFFBQU9BLEdBQVA7QUFBQSxNQUFZQyxRQUFaLFFBQVlBLFFBQVo7QUFBQSxTQUEwQjtBQUFBLFdBQUssQ0FDN0RDLEVBQUVDLElBQUYsQ0FBT0gsSUFBSUksUUFBWCxDQUQ2RCxFQUU3REYsRUFBRUMsSUFBRixDQUFPSixJQUFJSyxRQUFYLENBRjZELEVBRzdESCxZQUFZQSxTQUFTRyxRQUFULEdBQW9CLENBQUMsQ0FBakMsR0FBcUNGLEVBQUVDLElBQUYsQ0FBT0YsU0FBU0csUUFB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a0Isb0NBQUwsRUFBSzs7QUFDOUMsVUFBTXhFLFFBQVEsRUFBZDs7QUFFQTtBQUNBd0UsaUJBQVdDLE9BQVgsQ0FBbUIsZ0JBQVE7QUFDekI7QUFDQSxZQUFNQyxXQUFXQyxLQUFLQSxJQUFMLENBQVU3RixHQUEzQjtBQUNBLFlBQU04RixXQUFXRCxLQUFLQSxJQUFMLENBQVU1RixHQUEzQjtBQUNBLFlBQU04RixZQUFZRixLQUFLRyxXQUF2Qjs7QUFFQSxZQUFNQyxPQUFPO0FBQ1hDLGlCQUFPSCxVQUFVSSxNQUFWLEdBQW1CSixTQUFuQixHQUErQjtBQUQzQixTQUFiOztBQUlBO0FBQ0EsWUFBSUgsU0FBU1EsS0FBVCxJQUFrQkMsb0NBQXRCLEVBQTJDO0FBQ3pDSixlQUFLbkUsS0FBTCxHQUFhLDBCQUFTdUUscUNBQW9CVCxTQUFTUSxLQUE3QixDQUFULENBQWI7QUFDRDs7QUFFRDtBQUNBLFlBQUlsRixNQUFNaUYsTUFBTixLQUFpQixDQUFyQixFQUF3QjtBQUN0QkYsZUFBS0ssU0FBTCxHQUFpQixJQUFqQjtBQUNEOztBQUVEO0FBQ0FMLGFBQUtsRSxPQUFMLEdBQWU7QUFDYi9CLGVBQUs0RixRQURRO0FBRWIzRixlQUFLNkYsUUFGUTtBQUdiNUYsb0JBQVUsRUFBQ2tHLE9BQU8sSUFBUixFQUFjL0YsVUFBVSxDQUFDLENBQXpCLEVBQTRCa0csVUFBVSxJQUF0QztBQUhHLFNBQWY7O0FBTUFyRixjQUFNaUMsSUFBTixDQUFXOEMsSUFBWDtBQUNELE9BNUJEOztBQThCQSxhQUFPL0UsS0FBUDtBQUNEOzs7RUFsRnFDc0YsbUI7O2tCQUFuQnZGLFUiLCJmaWxlIjoicG9pbnQtbGF5ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIDIwMTggVWJlciBUZWNobm9sb2dpZXMsIEluYy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4vLyBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4vLyBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4vLyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4vLyBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbi8vIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbi8vIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1Jcbi8vIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuLy8gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4vLyBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4vLyBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuLy8gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuLy8gVEhFIFNPRlRXQVJFLlxuXG5pbXBvcnQgTGF5ZXIgZnJvbSAnLi4vYmFzZS1sYXllcic7XG5pbXBvcnQgbWVtb2l6ZSBmcm9tICdsb2Rhc2gubWVtb2l6ZSc7XG5pbXBvcnQge1NjYXR0ZXJwbG90TGF5ZXJ9IGZyb20gJ2RlY2suZ2wnO1xuaW1wb3J0IFNjYXR0ZXJwbG90QnJ1c2hpbmdMYXllciBmcm9tICdkZWNrZ2wtbGF5ZXJzL3NjYXR0ZXJwbG90LWJydXNoaW5nLWxheWVyL3NjYXR0ZXJwbG90LWJydXNoaW5nLWxheWVyJztcbmltcG9ydCB7aGV4VG9SZ2J9IGZyb20gJ3V0aWxzL2NvbG9yLXV0aWxzJztcbmltcG9ydCBQb2ludExheWVySWNvbiBmcm9tICcuL3BvaW50LWxheWVyLWljb24nO1xuaW1wb3J0IHtERUZBVUxUX0xBWUVSX0NPTE9SfSBmcm9tICdjb25zdGFudHMvZGVmYXVsdC1zZXR0aW5ncyc7XG5cbmV4cG9ydCBjb25zdCBwb2ludFBvc0FjY2Vzc29yID0gKHtsYXQsIGxuZywgYWx0aXR1ZGV9KSA9PiBkID0+IFtcbiAgZC5kYXRhW2xuZy5maWVsZElkeF0sXG4gIGQuZGF0YVtsYXQuZmllbGRJZHhdLFxuICBhbHRpdHVkZSAmJiBhbHRpdHVkZS5maWVsZElkeCA+IC0xID8gZC5kYXRhW2FsdGl0dWRlLmZpZWxkSWR4XSA6IDBcbl07XG5cbmV4cG9ydCBjb25zdCBwb2ludFBvc1Jlc29sdmVyID0gKHtsYXQsIGxuZywgYWx0aXR1ZGV9KSA9PlxuICBgJHtsYXQuZmllbGRJZHh9LSR7bG5nLmZpZWxkSWR4fS0ke2FsdGl0dWRlID8gYWx0aXR1ZGUuZmllbGRJZHggOiAneid9YDtcbmV4cG9ydCBjb25zdCBwb2ludFJlcXVpcmVkQ29sdW1ucyA9IFsnbGF0JywgJ2xuZyddO1xuZXhwb3J0IGNvbnN0IHBvaW50T3B0aW9uYWxDb2x1bW5zID0gWydhbHRpdHVkZSddO1xuXG5leHBvcnQgY29uc3QgcG9pbnRWaXNDb25maWdzID0ge1xuICByYWRpdXM6ICdyYWRpdXMnLFxuICBmaXhlZFJhZGl1czogJ2ZpeGVkUmFkaXVzJyxcbiAgb3BhY2l0eTogJ29wYWNpdHknLFxuICBvdXRsaW5lOiAnb3V0bGluZScsXG4gIHRoaWNrbmVzczogJ3RoaWNrbmVzcycsXG4gIGNvbG9yUmFuZ2U6ICdjb2xvclJhbmdlJyxcbiAgcmFkaXVzUmFuZ2U6ICdyYWRpdXNSYW5nZScsXG4gICdoaS1wcmVjaXNpb24nOiAnaGktcHJlY2lzaW9uJ1xufTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUG9pbnRMYXllciBleHRlbmRzIExheWVyIHtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG5cbiAgICB0aGlzLnJlZ2lzdGVyVmlzQ29uZmlnKHBvaW50VmlzQ29uZmlncyk7XG4gICAgdGhpcy5nZXRQb3NpdGlvbiA9IG1lbW9pemUocG9pbnRQb3NBY2Nlc3NvciwgcG9pbnRQb3NSZXNvbHZlcik7XG4gIH1cblxuICBnZXQgdHlwZSgpIHtcbiAgICByZXR1cm4gJ3BvaW50JztcbiAgfVxuXG4gIGdldCBpc0FnZ3JlZ2F0ZWQoKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgZ2V0IGxheWVySWNvbigpIHtcbiAgICByZXR1cm4gUG9pbnRMYXllckljb247XG4gIH1cbiAgZ2V0IHJlcXVpcmVkTGF5ZXJDb2x1bW5zKCkge1xuICAgIHJldHVybiBwb2ludFJlcXVpcmVkQ29sdW1ucztcbiAgfVxuXG4gIGdldCBvcHRpb25hbENvbHVtbnMoKSB7XG4gICAgcmV0dXJuIHBvaW50T3B0aW9uYWxDb2x1bW5zO1xuICB9XG5cbiAgZ2V0IGNvbHVtblBhaXJzKCkge1xuICAgIHJldHVybiB0aGlzLmRlZmF1bHRQb2ludENvbHVtblBhaXJzO1xuICB9XG5cbiAgZ2V0IG5vbmVMYXllckRhdGFBZmZlY3RpbmdQcm9wcygpIHtcbiAgICByZXR1cm4gWy4uLnN1cGVyLm5vbmVMYXllckRhdGFBZmZlY3RpbmdQcm9wcywgJ3JhZGl1cyddO1xuICB9XG5cbiAgZ2V0IHZpc3VhbENoYW5uZWxzKCkge1xuICAgIHJldHVybiB7XG4gICAgICAuLi5zdXBlci52aXN1YWxDaGFubmVscyxcbiAgICAgIHNpemU6IHtcbiAgICAgICAgLi4uc3VwZXIudmlzdWFsQ2hhbm5lbHMuc2l6ZSxcbiAgICAgICAgcmFuZ2U6ICdyYWRpdXNSYW5nZScsXG4gICAgICAgIHByb3BlcnR5OiAncmFkaXVzJyxcbiAgICAgICAgY2hhbm5lbFNjYWxlVHlwZTogJ3JhZGl1cydcbiAgICAgIH1cbiAgICB9O1xuICB9XG5cbiAgc3RhdGljIGZpbmREZWZhdWx0TGF5ZXJQcm9wcyh7ZmllbGRQYWlycyA9IFtdfSkge1xuICAgIGNvbnN0IHByb3BzID0gW107XG5cbiAgICAvLyBNYWtlIGxheWVyIGZvciBlYWNoIHBhaXJcbiAgICBmaWVsZFBhaXJzLmZvckVhY2gocGFpciA9PiB7XG4gICAgICAvLyBmaW5kIGZpZWxkcyBmb3IgdGFibGVGaWVsZEluZGV4XG4gICAgICBjb25zdCBsYXRGaWVsZCA9IHBhaXIucGFpci5sYXQ7XG4gICAgICBjb25zdCBsbmdGaWVsZCA9IHBhaXIucGFpci5sbmc7XG4gICAgICBjb25zdCBsYXllck5hbWUgPSBwYWlyLmRlZmF1bHROYW1lO1xuXG4gICAgICBjb25zdCBwcm9wID0ge1xuICAgICAgICBsYWJlbDogbGF5ZXJOYW1lLmxlbmd0aCA/IGxheWVyTmFtZSA6ICdQb2ludCdcbiAgICAgIH07XG5cbiAgICAgIC8vIGRlZmF1bHQgbGF5ZXIgY29sb3IgZm9yIGJlZ2ludHJpcCBhbmQgZHJvcG9mZiBwb2ludFxuICAgICAgaWYgKGxhdEZpZWxkLnZhbHVlIGluIERFRkFVTFRfTEFZRVJfQ09MT1IpIHtcbiAgICAgICAgcHJvcC5jb2xvciA9IGhleFRvUmdiKERFRkFVTFRfTEFZRVJfQ09MT1JbbGF0RmllbGQudmFsdWVdKTtcbiAgICAgIH1cblxuICAgICAgLy8gc2V0IHRoZSBmaXJzdCBsYXllciB0byBiZSB2aXNpYmxlXG4gICAgICBpZiAocHJvcHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHByb3AuaXNWaXNpYmxlID0gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgLy8gY29uc3QgbmV3TGF5ZXIgPSBuZXcgS2VwbGVyR2xMYXllcnMuUG9pbnRMYXllcihwcm9wKTtcbiAgICAgIHByb3AuY29sdW1ucyA9IHtcbiAgICAgICAgbGF0OiBsYXRGaWVsZCxcbiAgICAgICAgbG5nOiBsbmdGaWVsZCxcbiAgICAgICAgYWx0aXR1ZGU6IHt2YWx1ZTogbnVsbCwgZmllbGRJZHg6IC0xLCBvcHRpb25hbDogdHJ1ZX1cbiAgICAgIH07XG5cbiAgICAgIHByb3BzLnB1c2gocHJvcCk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gcHJvcHM7XG4gIH1cblxuICBmb3JtYXRMYXllckRhdGEoXywgYWxsRGF0YSwgZmlsdGVyZWRJbmRleCwgb2xkTGF5ZXJEYXRhLCBvcHQgPSB7fSkge1xuICAgIGNvbnN0IHtcbiAgICAgIGNvbG9yU2NhbGUsXG4gICAgICBjb2xvckRvbWFpbixcbiAgICAgIGNvbG9yRmllbGQsXG4gICAgICBjb2xvcixcbiAgICAgIGNvbHVtbnMsXG4gICAgICBzaXplRmllbGQsXG4gICAgICBzaXplU2NhbGUsXG4gICAgICBzaXplRG9tYWluLFxuICAgICAgdmlzQ29uZmlnOiB7cmFkaXVzUmFuZ2UsIGZpeGVkUmFkaXVzLCBjb2xvclJhbmdlfVxuICAgIH0gPSB0aGlzLmNvbmZpZztcblxuICAgIC8vIHBvaW50IGNvbG9yXG4gICAgY29uc3QgY1NjYWxlID1cbiAgICAgIGNvbG9yRmllbGQgJiZcbiAgICAgIHRoaXMuZ2V0VmlzQ2hhbm5lbFNjYWxlKFxuICAgICAgICBjb2xvclNjYWxlLFxuICAgICAgICBjb2xvckRvbWFpbixcbiAgICAgICAgY29sb3JSYW5nZS5jb2xvcnMubWFwKGhleFRvUmdiKVxuICAgICAgKTtcblxuICAgIC8vIHBvaW50IHJhZGl1c1xuICAgIGNvbnN0IHJTY2FsZSA9XG4gICAgICBzaXplRmllbGQgJiZcbiAgICAgIHRoaXMuZ2V0VmlzQ2hhbm5lbFNjYWxlKHNpemVTY2FsZSwgc2l6ZURvbWFpbiwgcmFkaXVzUmFuZ2UsIGZpeGVkUmFkaXVzKTtcblxuICAgIGNvbnN0IGdldFBvc2l0aW9uID0gdGhpcy5nZXRQb3NpdGlvbihjb2x1bW5zKTtcblxuICAgIGlmICghb2xkTGF5ZXJEYXRhIHx8IG9sZExheWVyRGF0YS5nZXRQb3NpdGlvbiAhPT0gZ2V0UG9zaXRpb24pIHtcbiAgICAgIHRoaXMudXBkYXRlTGF5ZXJNZXRhKGFsbERhdGEsIGdldFBvc2l0aW9uKTtcbiAgICB9XG5cbiAgICBsZXQgZGF0YTtcbiAgICBpZiAoXG4gICAgICBvbGRMYXllckRhdGEgJiZcbiAgICAgIG9sZExheWVyRGF0YS5kYXRhICYmXG4gICAgICBvcHQuc2FtZURhdGEgJiZcbiAgICAgIG9sZExheWVyRGF0YS5nZXRQb3NpdGlvbiA9PT0gZ2V0UG9zaXRpb25cbiAgICApIHtcbiAgICAgIGRhdGEgPSBvbGRMYXllckRhdGEuZGF0YTtcbiAgICB9IGVsc2Uge1xuICAgICAgZGF0YSA9IGZpbHRlcmVkSW5kZXgucmVkdWNlKChhY2N1LCBpbmRleCkgPT4ge1xuICAgICAgICBjb25zdCBwb3MgPSBnZXRQb3NpdGlvbih7ZGF0YTogYWxsRGF0YVtpbmRleF19KTtcblxuICAgICAgICAvLyBpZiBkb2Vzbid0IGhhdmUgcG9pbnQgbGF0IG9yIGxuZywgZG8gbm90IGFkZCB0aGUgcG9pbnRcbiAgICAgICAgLy8gZGVjay5nbCBjYW4ndCBoYW5kbGUgcG9zaXRpb24gPSBudWxsXG4gICAgICAgIGlmICghcG9zLmV2ZXJ5KE51bWJlci5pc0Zpbml0ZSkpIHtcbiAgICAgICAgICByZXR1cm4gYWNjdTtcbiAgICAgICAgfVxuXG4gICAgICAgIGFjY3UucHVzaCh7XG4gICAgICAgICAgZGF0YTogYWxsRGF0YVtpbmRleF1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGFjY3U7XG4gICAgICB9LCBbXSk7XG4gICAgfVxuXG4gICAgY29uc3QgZ2V0UmFkaXVzID0gZCA9PlxuICAgICAgclNjYWxlID8gdGhpcy5nZXRFbmNvZGVkQ2hhbm5lbFZhbHVlKHJTY2FsZSwgZC5kYXRhLCBzaXplRmllbGQpIDogMTtcblxuICAgIGNvbnN0IGdldENvbG9yID0gZCA9PlxuICAgICAgY1NjYWxlID8gdGhpcy5nZXRFbmNvZGVkQ2hhbm5lbFZhbHVlKGNTY2FsZSwgZC5kYXRhLCBjb2xvckZpZWxkKSA6IGNvbG9yO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIGRhdGEsXG4gICAgICBnZXRQb3NpdGlvbixcbiAgICAgIGdldENvbG9yLFxuICAgICAgZ2V0UmFkaXVzXG4gICAgfTtcbiAgfVxuXG4gIHVwZGF0ZUxheWVyTWV0YShhbGxEYXRhLCBnZXRQb3NpdGlvbikge1xuICAgIGNvbnN0IGJvdW5kcyA9IHRoaXMuZ2V0UG9pbnRzQm91bmRzKGFsbERhdGEsIGQgPT4gZ2V0UG9zaXRpb24oe2RhdGE6IGR9KSk7XG4gICAgdGhpcy51cGRhdGVNZXRhKHtib3VuZHN9KTtcbiAgfVxuXG4gIHJlbmRlckxheWVyKHtcbiAgICBkYXRhLFxuICAgIGlkeCxcbiAgICBsYXllckludGVyYWN0aW9uLFxuICAgIG9iamVjdEhvdmVyZWQsXG4gICAgbWFwU3RhdGUsXG4gICAgaW50ZXJhY3Rpb25Db25maWdcbiAgfSkge1xuICAgIGNvbnN0IGxheWVyUHJvcHMgPSB7XG4gICAgICBvdXRsaW5lOiB0aGlzLmNvbmZpZy52aXNDb25maWcub3V0bGluZSxcbiAgICAgIHJhZGl1c01pblBpeGVsczogMSxcbiAgICAgIGZwNjQ6IHRoaXMuY29uZmlnLnZpc0NvbmZpZ1snaGktcHJlY2lzaW9uJ10sXG4gICAgICBzdHJva2VXaWR0aDogdGhpcy5jb25maWcudmlzQ29uZmlnLnRoaWNrbmVzcyxcbiAgICAgIHJhZGl1c1NjYWxlOiB0aGlzLmdldFJhZGl1c1NjYWxlQnlab29tKG1hcFN0YXRlKSxcbiAgICAgIC4uLih0aGlzLmNvbmZpZy52aXNDb25maWcuZml4ZWRSYWRpdXMgPyB7fSA6IHtyYWRpdXNNYXhQaXhlbHM6IDUwMH0pXG4gICAgfTtcblxuICAgIGNvbnN0IGJhc2VMYXllclByb3AgPSB7XG4gICAgICAuLi5sYXllclByb3BzLFxuICAgICAgLi4ubGF5ZXJJbnRlcmFjdGlvbixcbiAgICAgIC4uLmRhdGEsXG4gICAgICBpZHgsXG4gICAgICBvcGFjaXR5OiB0aGlzLmNvbmZpZy52aXNDb25maWcub3BhY2l0eSxcbiAgICAgIHBpY2thYmxlOiB0cnVlLFxuICAgICAgdXBkYXRlVHJpZ2dlcnM6IHtcbiAgICAgICAgZ2V0UmFkaXVzOiB7XG4gICAgICAgICAgc2l6ZUZpZWxkOiB0aGlzLmNvbmZpZy5zaXplRmllbGQsXG4gICAgICAgICAgcmFkaXVzUmFuZ2U6IHRoaXMuY29uZmlnLnZpc0NvbmZpZy5yYWRpdXNSYW5nZSxcbiAgICAgICAgICBmaXhlZFJhZGl1czogdGhpcy5jb25maWcudmlzQ29uZmlnLmZpeGVkUmFkaXVzLFxuICAgICAgICAgIHNpemVTY2FsZTogdGhpcy5jb25maWcuc2l6ZVNjYWxlXG4gICAgICAgIH0sXG4gICAgICAgIGdldENvbG9yOiB7XG4gICAgICAgICAgY29sb3I6IHRoaXMuY29uZmlnLmNvbG9yLFxuICAgICAgICAgIGNvbG9yRmllbGQ6IHRoaXMuY29uZmlnLmNvbG9yRmllbGQsXG4gICAgICAgICAgY29sb3JSYW5nZTogdGhpcy5jb25maWcudmlzQ29uZmlnLmNvbG9yUmFuZ2UsXG4gICAgICAgICAgY29sb3JTY2FsZTogdGhpcy5jb25maWcuY29sb3JTY2FsZVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcblxuICAgIHJldHVybiBbXG4gICAgICAvLyBiYXNlIGxheWVyXG4gICAgICBpbnRlcmFjdGlvbkNvbmZpZy5icnVzaC5lbmFibGVkXG4gICAgICAgID8gbmV3IFNjYXR0ZXJwbG90QnJ1c2hpbmdMYXllcih7XG4gICAgICAgICAgICAuLi5iYXNlTGF5ZXJQcm9wLFxuICAgICAgICAgICAgaWQ6IGAke3RoaXMuaWR9LWJydXNoYCxcbiAgICAgICAgICAgIGVuYWJsZUJydXNoaW5nOiB0cnVlLFxuICAgICAgICAgICAgYnJ1c2hSYWRpdXM6IGludGVyYWN0aW9uQ29uZmlnLmJydXNoLmNvbmZpZy5zaXplICogMTAwMFxuICAgICAgICAgIH0pXG4gICAgICAgIDogbmV3IFNjYXR0ZXJwbG90TGF5ZXIoe1xuICAgICAgICAgICAgaWQ6IHRoaXMuaWQsXG4gICAgICAgICAgICAuLi5iYXNlTGF5ZXJQcm9wXG4gICAgICAgICAgfSksXG5cbiAgICAgIC8vIGhvdmVyIGxheWVyXG4gICAgICAuLi4odGhpcy5pc0xheWVySG92ZXJlZChvYmplY3RIb3ZlcmVkKVxuICAgICAgICA/IFtcbiAgICAgICAgICAgIG5ldyBTY2F0dGVycGxvdExheWVyKHtcbiAgICAgICAgICAgICAgLi4ubGF5ZXJQcm9wcyxcbiAgICAgICAgICAgICAgaWQ6IGAke3RoaXMuaWR9LWhvdmVyZWRgLFxuICAgICAgICAgICAgICBkYXRhOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgY29sb3I6IHRoaXMuY29uZmlnLmhpZ2hsaWdodENvbG9yLFxuICAgICAgICAgICAgICAgICAgcG9zaXRpb246IGRhdGEuZ2V0UG9zaXRpb24ob2JqZWN0SG92ZXJlZC5vYmplY3QpLFxuICAgICAgICAgICAgICAgICAgcmFkaXVzOiBkYXRhLmdldFJhZGl1cyhvYmplY3RIb3ZlcmVkLm9iamVjdClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgIHBpY2thYmxlOiBmYWxzZVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICBdXG4gICAgICAgIDogW10pXG4gICAgXTtcbiAgfVxufVxuIl19