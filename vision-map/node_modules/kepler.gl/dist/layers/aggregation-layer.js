'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.aggregateRequiredColumns = exports.getValueAggr = exports.pointPosResolver = exports.pointPosAccessor = undefined;

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

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

var _lodash = require('lodash.memoize');

var _lodash2 = _interopRequireDefault(_lodash);

var _baseLayer = require('./base-layer');

var _baseLayer2 = _interopRequireDefault(_baseLayer);

var _colorUtils = require('../utils/color-utils');

var _aggregateUtils = require('../utils/aggregate-utils');

var _defaultSettings = require('../constants/default-settings');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var pointPosAccessor = exports.pointPosAccessor = function pointPosAccessor(_ref) {
  var lat = _ref.lat,
      lng = _ref.lng;
  return function (d) {
    return [d[lng.fieldIdx], d[lat.fieldIdx]];
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
      lng = _ref2.lng;
  return lat.fieldIdx + '-' + lng.fieldIdx;
};

var getValueAggr = exports.getValueAggr = function getValueAggr(field, aggregation) {
  return function (points) {
    return (0, _aggregateUtils.aggregate)(points.map(function (p) {
      return p[field.tableFieldIndex - 1];
    }), aggregation);
  };
};

var aggrResolver = function aggrResolver(field, aggregation) {
  return field.name + '-' + aggregation;
};

var getLayerColorRange = function getLayerColorRange(colorRange) {
  return colorRange.colors.map(_colorUtils.hexToRgb);
};

var aggregateRequiredColumns = exports.aggregateRequiredColumns = ['lat', 'lng'];

var AggregationLayer = function (_Layer) {
  (0, _inherits3.default)(AggregationLayer, _Layer);

  function AggregationLayer(props) {
    (0, _classCallCheck3.default)(this, AggregationLayer);

    var _this = (0, _possibleConstructorReturn3.default)(this, (AggregationLayer.__proto__ || Object.getPrototypeOf(AggregationLayer)).call(this, props));

    _this.getPosition = (0, _lodash2.default)(pointPosAccessor, pointPosResolver);
    _this.getColorValue = (0, _lodash2.default)(getValueAggr, aggrResolver);
    _this.getColorRange = (0, _lodash2.default)(getLayerColorRange);
    _this.getElevationValue = (0, _lodash2.default)(getValueAggr, aggrResolver);
    return _this;
  }

  (0, _createClass3.default)(AggregationLayer, [{
    key: 'getVisualChannelDescription',


    /**
     * Get the description of a visualChannel config
     * @param key
     * @returns {{label: string, measure: (string|string)}}
     */
    value: function getVisualChannelDescription(key) {
      // e.g. label: Color, measure: Average of ETA
      var _visualChannels$key = this.visualChannels[key],
          range = _visualChannels$key.range,
          field = _visualChannels$key.field,
          defaultMeasure = _visualChannels$key.defaultMeasure,
          aggregation = _visualChannels$key.aggregation;

      return {
        label: this.visConfigSettings[range].label,
        measure: this.config[field] ? this.config.visConfig[aggregation] + ' of ' + this.config[field].name : defaultMeasure
      };
    }
  }, {
    key: 'getHoverData',
    value: function getHoverData(object) {
      // return aggregated object
      return object;
    }

    /**
     * Aggregation layer handles visual channel aggregation inside deck.gl layer
     */

  }, {
    key: 'updateLayerVisualChannel',
    value: function updateLayerVisualChannel(_ref3, channel) {
      var data = _ref3.data,
          allData = _ref3.allData;

      this.validateVisualChannel(channel);
    }

    /**
     * Validate aggregation type on top of basic layer visual channel validation
     * @param channel
     */

  }, {
    key: 'validateVisualChannel',
    value: function validateVisualChannel(channel) {

      // field type decides aggregation type decides scale type
      this.validateFieldType(channel);
      this.validateAggregationType(channel);
      this.validateScale(channel);
    }

    /**
     * Validate aggregation type based on selected field
     */

  }, {
    key: 'validateAggregationType',
    value: function validateAggregationType(channel) {
      var visualChannel = this.visualChannels[channel];
      var field = visualChannel.field,
          aggregation = visualChannel.aggregation;

      var aggregationOptions = this.getAggregationOptions(channel);

      if (!aggregation) {
        return;
      }

      if (!aggregationOptions.length) {
        // if field cannot be aggregated, set field to null
        this.updateLayerConfig((0, _defineProperty3.default)({}, field, null));
      } else if (!aggregationOptions.includes(this.config.visConfig[aggregation])) {
        // current aggregation type is not supported by this field
        // set aggregation to the first supported option
        this.updateLayerVisConfig((0, _defineProperty3.default)({}, aggregation, aggregationOptions[0]));
      }
    }
  }, {
    key: 'getAggregationOptions',
    value: function getAggregationOptions(channel) {
      var visualChannel = this.visualChannels[channel];
      var field = visualChannel.field,
          channelScaleType = visualChannel.channelScaleType;


      return Object.keys(this.config[field] ? _defaultSettings.FIELD_OPTS[this.config[field].type].scale[channelScaleType] : _defaultSettings.DEFAULT_AGGREGATION[channelScaleType]);
    }

    /**
     * Get scale options based on current field and aggregation type
     * @param {string} channel
     * @returns {string[]}
     */

  }, {
    key: 'getScaleOptions',
    value: function getScaleOptions(channel) {
      var visualChannel = this.visualChannels[channel];
      var field = visualChannel.field,
          aggregation = visualChannel.aggregation,
          channelScaleType = visualChannel.channelScaleType;

      var aggregationType = this.config.visConfig[aggregation];
      return this.config[field] ?
      // scale options based on aggregation
      _defaultSettings.FIELD_OPTS[this.config[field].type].scale[channelScaleType][aggregationType] :
      // default scale options for point count
      _defaultSettings.DEFAULT_AGGREGATION[channelScaleType][aggregationType];
    }

    /**
     * Aggregation layer handles visual channel aggregation inside deck.gl layer
     */

  }, {
    key: 'updateLayerDomain',
    value: function updateLayerDomain(dataset, newFilter) {
      return this;
    }
  }, {
    key: 'updateLayerMeta',
    value: function updateLayerMeta(allData, getPosition) {
      // get bounds from points
      var bounds = this.getPointsBounds(allData, getPosition);

      // get lightSettings from points
      var lightSettings = this.getLightSettingsFromBounds(bounds);

      this.updateMeta({ bounds: bounds, lightSettings: lightSettings });
    }
  }, {
    key: 'formatLayerData',
    value: function formatLayerData(_, allData, filteredIndex, oldLayerData) {
      var opt = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};

      var getPosition = this.getPosition(this.config.columns);

      if (!oldLayerData || oldLayerData.getPosition !== getPosition) {
        this.updateLayerMeta(allData, getPosition);
      }

      var getColorValue = this.config.colorField ? this.getColorValue(this.config.colorField, this.config.visConfig.colorAggregation) : undefined;

      var getElevationValue = this.config.sizeField ? this.getElevationValue(this.config.sizeField, this.config.visConfig.sizeAggregation) : undefined;

      var data = void 0;
      if (oldLayerData && oldLayerData.data && opt.sameData && oldLayerData.getPosition === getPosition) {
        data = oldLayerData.data;
      } else {
        data = filteredIndex.map(function (i) {
          return allData[i];
        });
      }

      return (0, _extends3.default)({
        data: data,
        getPosition: getPosition
      }, getColorValue ? { getColorValue: getColorValue } : {}, getElevationValue ? { getElevationValue: getElevationValue } : {});
    }
  }, {
    key: 'isAggregated',
    get: function get() {
      return true;
    }
  }, {
    key: 'requiredLayerColumns',
    get: function get() {
      return aggregateRequiredColumns;
    }
  }, {
    key: 'columnPairs',
    get: function get() {
      return this.defaultPointColumnPairs;
    }
  }, {
    key: 'noneLayerDataAffectingProps',
    get: function get() {
      return [].concat((0, _toConsumableArray3.default)((0, _get3.default)(AggregationLayer.prototype.__proto__ || Object.getPrototypeOf(AggregationLayer.prototype), 'noneLayerDataAffectingProps', this)), ['enable3d', 'colorRange', 'colorScale', 'colorDomain', 'sizeRange', 'sizeScale', 'sizeDomain', 'percentile', 'coverage', 'elevationPercentile', 'elevationScale']);
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
        },
        size: {
          aggregation: 'sizeAggregation',
          channelScaleType: _defaultSettings.CHANNEL_SCALES.sizeAggr,
          condition: function condition(config) {
            return config.visConfig.enable3d;
          },
          defaultMeasure: 'Point Count',
          domain: 'sizeDomain',
          field: 'sizeField',
          key: 'size',
          property: 'height',
          range: 'sizeRange',
          scale: 'sizeScale'
        }
      };
    }
  }]);
  return AggregationLayer;
}(_baseLayer2.default);

exports.default = AggregationLayer;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9sYXllcnMvYWdncmVnYXRpb24tbGF5ZXIuanMiXSwibmFtZXMiOlsicG9pbnRQb3NBY2Nlc3NvciIsImxhdCIsImxuZyIsImQiLCJmaWVsZElkeCIsInBvaW50UG9zUmVzb2x2ZXIiLCJnZXRWYWx1ZUFnZ3IiLCJmaWVsZCIsImFnZ3JlZ2F0aW9uIiwicG9pbnRzIiwibWFwIiwicCIsInRhYmxlRmllbGRJbmRleCIsImFnZ3JSZXNvbHZlciIsIm5hbWUiLCJnZXRMYXllckNvbG9yUmFuZ2UiLCJjb2xvclJhbmdlIiwiY29sb3JzIiwiaGV4VG9SZ2IiLCJhZ2dyZWdhdGVSZXF1aXJlZENvbHVtbnMiLCJBZ2dyZWdhdGlvbkxheWVyIiwicHJvcHMiLCJnZXRQb3NpdGlvbiIsImdldENvbG9yVmFsdWUiLCJnZXRDb2xvclJhbmdlIiwiZ2V0RWxldmF0aW9uVmFsdWUiLCJrZXkiLCJ2aXN1YWxDaGFubmVscyIsInJhbmdlIiwiZGVmYXVsdE1lYXN1cmUiLCJsYWJlbCIsInZpc0NvbmZpZ1NldHRpbmdzIiwibWVhc3VyZSIsImNvbmZpZyIsInZpc0NvbmZpZyIsIm9iamVjdCIsImNoYW5uZWwiLCJkYXRhIiwiYWxsRGF0YSIsInZhbGlkYXRlVmlzdWFsQ2hhbm5lbCIsInZhbGlkYXRlRmllbGRUeXBlIiwidmFsaWRhdGVBZ2dyZWdhdGlvblR5cGUiLCJ2YWxpZGF0ZVNjYWxlIiwidmlzdWFsQ2hhbm5lbCIsImFnZ3JlZ2F0aW9uT3B0aW9ucyIsImdldEFnZ3JlZ2F0aW9uT3B0aW9ucyIsImxlbmd0aCIsInVwZGF0ZUxheWVyQ29uZmlnIiwiaW5jbHVkZXMiLCJ1cGRhdGVMYXllclZpc0NvbmZpZyIsImNoYW5uZWxTY2FsZVR5cGUiLCJPYmplY3QiLCJrZXlzIiwiRklFTERfT1BUUyIsInR5cGUiLCJzY2FsZSIsIkRFRkFVTFRfQUdHUkVHQVRJT04iLCJhZ2dyZWdhdGlvblR5cGUiLCJkYXRhc2V0IiwibmV3RmlsdGVyIiwiYm91bmRzIiwiZ2V0UG9pbnRzQm91bmRzIiwibGlnaHRTZXR0aW5ncyIsImdldExpZ2h0U2V0dGluZ3NGcm9tQm91bmRzIiwidXBkYXRlTWV0YSIsIl8iLCJmaWx0ZXJlZEluZGV4Iiwib2xkTGF5ZXJEYXRhIiwib3B0IiwiY29sdW1ucyIsInVwZGF0ZUxheWVyTWV0YSIsImNvbG9yRmllbGQiLCJjb2xvckFnZ3JlZ2F0aW9uIiwidW5kZWZpbmVkIiwic2l6ZUZpZWxkIiwic2l6ZUFnZ3JlZ2F0aW9uIiwic2FtZURhdGEiLCJpIiwiZGVmYXVsdFBvaW50Q29sdW1uUGFpcnMiLCJjb2xvciIsIkNIQU5ORUxfU0NBTEVTIiwiY29sb3JBZ2dyIiwiZG9tYWluIiwicHJvcGVydHkiLCJzaXplIiwic2l6ZUFnZ3IiLCJjb25kaXRpb24iLCJlbmFibGUzZCIsIkxheWVyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFvQkE7Ozs7QUFDQTs7OztBQUNBOztBQUNBOztBQUNBOzs7O0FBRU8sSUFBTUEsOENBQW1CLFNBQW5CQSxnQkFBbUI7QUFBQSxNQUFFQyxHQUFGLFFBQUVBLEdBQUY7QUFBQSxNQUFPQyxHQUFQLFFBQU9BLEdBQVA7QUFBQSxTQUFnQjtBQUFBLFdBQUssQ0FDbkRDLEVBQUVELElBQUlFLFFBQU4sQ0FEbUQsRUFFbkRELEVBQUVGLElBQUlHLFFBQU4sQ0FGbUQsQ0FBTDtBQUFBLEdBQWhCO0FBQUEsQ0FBekIsQyxDQTFCUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFhTyxJQUFNQyw4Q0FBbUIsU0FBbkJBLGdCQUFtQjtBQUFBLE1BQUVKLEdBQUYsU0FBRUEsR0FBRjtBQUFBLE1BQU9DLEdBQVAsU0FBT0EsR0FBUDtBQUFBLFNBQzNCRCxJQUFJRyxRQUR1QixTQUNYRixJQUFJRSxRQURPO0FBQUEsQ0FBekI7O0FBR0EsSUFBTUUsc0NBQWUs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ZUFBSyxNQVBEO0FBUUp5RCxvQkFBVSxRQVJOO0FBU0p2RCxpQkFBTyxXQVRIO0FBVUoyQixpQkFBTztBQVZIO0FBWkQsT0FBUDtBQXlCRDs7O0VBakUyQ2lDLG1COztrQkFBekJwRSxnQiIsImZpbGUiOiJhZ2dyZWdhdGlvbi1sYXllci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgMjAxOCBVYmVyIFRlY2hub2xvZ2llcywgSW5jLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbi8vIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbi8vIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbi8vIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbi8vIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuLy8gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuLy8gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4vLyBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbi8vIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbi8vIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4vLyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4vLyBUSEUgU09GVFdBUkUuXG5cbmltcG9ydCBtZW1vaXplIGZyb20gJ2xvZGFzaC5tZW1vaXplJztcbmltcG9ydCBMYXllciBmcm9tICcuL2Jhc2UtbGF5ZXInO1xuaW1wb3J0IHtoZXhUb1JnYn0gZnJvbSAndXRpbHMvY29sb3ItdXRpbHMnO1xuaW1wb3J0IHthZ2dyZWdhdGV9IGZyb20gJ3V0aWxzL2FnZ3JlZ2F0ZS11dGlscyc7XG5pbXBvcnQge0NIQU5ORUxfU0NBTEVTLCBGSUVMRF9PUFRTLCBERUZBVUxUX0FHR1JFR0FUSU9OfSBmcm9tICdjb25zdGFudHMvZGVmYXVsdC1zZXR0aW5ncyc7XG5cbmV4cG9ydCBjb25zdCBwb2ludFBvc0FjY2Vzc29yID0gKHtsYXQsIGxuZ30pID0+IGQgPT4gW1xuICBkW2xuZy5maWVsZElkeF0sXG4gIGRbbGF0LmZpZWxkSWR4XVxuXTtcblxuZXhwb3J0IGNvbnN0IHBvaW50UG9zUmVzb2x2ZXIgPSAoe2xhdCwgbG5nfSkgPT5cbiAgYCR7bGF0LmZpZWxkSWR4fS0ke2xuZy5maWVsZElkeH1gO1xuXG5leHBvcnQgY29uc3QgZ2V0VmFsdWVBZ2dyID0gKGZpZWxkLCBhZ2dyZWdhdGlvbikgPT4gcG9pbnRzID0+XG4gIGFnZ3JlZ2F0ZShwb2ludHMubWFwKHAgPT4gcFtmaWVsZC50YWJsZUZpZWxkSW5kZXggLSAxXSksIGFnZ3JlZ2F0aW9uKTtcblxuY29uc3QgYWdnclJlc29sdmVyID0gKGZpZWxkLCBhZ2dyZWdhdGlvbikgPT4gYCR7ZmllbGQubmFtZX0tJHthZ2dyZWdhdGlvbn1gO1xuXG5jb25zdCBnZXRMYXllckNvbG9yUmFuZ2UgPSBjb2xvclJhbmdlID0+IGNvbG9yUmFuZ2UuY29sb3JzLm1hcChoZXhUb1JnYik7XG5cbmV4cG9ydCBjb25zdCBhZ2dyZWdhdGVSZXF1aXJlZENvbHVtbnMgPSBbJ2xhdCcsICdsbmcnXTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQWdncmVnYXRpb25MYXllciBleHRlbmRzIExheWVyIHtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG5cbiAgICB0aGlzLmdldFBvc2l0aW9uID0gbWVtb2l6ZShwb2ludFBvc0FjY2Vzc29yLCBwb2ludFBvc1Jlc29sdmVyKTtcbiAgICB0aGlzLmdldENvbG9yVmFsdWUgPSBtZW1vaXplKGdldFZhbHVlQWdnciwgYWdnclJlc29sdmVyKTtcbiAgICB0aGlzLmdldENvbG9yUmFuZ2UgPSBtZW1vaXplKGdldExheWVyQ29sb3JSYW5nZSk7XG4gICAgdGhpcy5nZXRFbGV2YXRpb25WYWx1ZSA9IG1lbW9pemUoZ2V0VmFsdWVBZ2dyLCBhZ2dyUmVzb2x2ZXIpO1xuICB9XG5cbiAgZ2V0IGlzQWdncmVnYXRlZCgpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGdldCByZXF1aXJlZExheWVyQ29sdW1ucygpIHtcbiAgICByZXR1cm4gYWdncmVnYXRlUmVxdWlyZWRDb2x1bW5zO1xuICB9XG5cbiAgZ2V0IGNvbHVtblBhaXJzKCkge1xuICAgIHJldHVybiB0aGlzLmRlZmF1bHRQb2ludENvbHVtblBhaXJzO1xuICB9XG5cbiAgZ2V0IG5vbmVMYXllckRhdGFBZmZlY3RpbmdQcm9wcygpIHtcbiAgICByZXR1cm4gW1xuICAgICAgLi4uc3VwZXIubm9uZUxheWVyRGF0YUFmZmVjdGluZ1Byb3BzLFxuICAgICAgJ2VuYWJsZTNkJyxcbiAgICAgICdjb2xvclJhbmdlJyxcbiAgICAgICdjb2xvclNjYWxlJyxcbiAgICAgICdjb2xvckRvbWFpbicsXG4gICAgICAnc2l6ZVJhbmdlJyxcbiAgICAgICdzaXplU2NhbGUnLFxuICAgICAgJ3NpemVEb21haW4nLFxuICAgICAgJ3BlcmNlbnRpbGUnLFxuICAgICAgJ2NvdmVyYWdlJyxcbiAgICAgICdlbGV2YXRpb25QZXJjZW50aWxlJyxcbiAgICAgICdlbGV2YXRpb25TY2FsZSdcbiAgICBdO1xuICB9XG5cbiAgZ2V0IHZpc3VhbENoYW5uZWxzKCkge1xuICAgIHJldHVybiB7XG4gICAgICBjb2xvcjoge1xuICAgICAgICBhZ2dyZWdhdGlvbjogJ2NvbG9yQWdncmVnYXRpb24nLFxuICAgICAgICBjaGFubmVsU2NhbGVUeXBlOiBDSEFOTkVMX1NDQUxFUy5jb2xvckFnZ3IsXG4gICAgICAgIGRlZmF1bHRNZWFzdXJlOiAnUG9pbnQgQ291bnQnLFxuICAgICAgICBkb21haW46ICdjb2xvckRvbWFpbicsXG4gICAgICAgIGZpZWxkOiAnY29sb3JGaWVsZCcsXG4gICAgICAgIGtleTogJ2NvbG9yJyxcbiAgICAgICAgcHJvcGVydHk6ICdjb2xvcicsXG4gICAgICAgIHJhbmdlOiAnY29sb3JSYW5nZScsXG4gICAgICAgIHNjYWxlOiAnY29sb3JTY2FsZSdcbiAgICAgIH0sXG4gICAgICBzaXplOiB7XG4gICAgICAgIGFnZ3JlZ2F0aW9uOiAnc2l6ZUFnZ3JlZ2F0aW9uJyxcbiAgICAgICAgY2hhbm5lbFNjYWxlVHlwZTogQ0hBTk5FTF9TQ0FMRVMuc2l6ZUFnZ3IsXG4gICAgICAgIGNvbmRpdGlvbjogY29uZmlnID0+IGNvbmZpZy52aXNDb25maWcuZW5hYmxlM2QsXG4gICAgICAgIGRlZmF1bHRNZWFzdXJlOiAnUG9pbnQgQ291bnQnLFxuICAgICAgICBkb21haW46ICdzaXplRG9tYWluJyxcbiAgICAgICAgZmllbGQ6ICdzaXplRmllbGQnLFxuICAgICAgICBrZXk6ICdzaXplJyxcbiAgICAgICAgcHJvcGVydHk6ICdoZWlnaHQnLFxuICAgICAgICByYW5nZTogJ3NpemVSYW5nZScsXG4gICAgICAgIHNjYWxlOiAnc2l6ZVNjYWxlJ1xuICAgICAgfVxuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBkZXNjcmlwdGlvbiBvZiBhIHZpc3VhbENoYW5uZWwgY29uZmlnXG4gICAqIEBwYXJhbSBrZXlcbiAgICogQHJldHVybnMge3tsYWJlbDogc3RyaW5nLCBtZWFzdXJlOiAoc3RyaW5nfHN0cmluZyl9fVxuICAgKi9cbiAgZ2V0VmlzdWFsQ2hhbm5lbERlc2NyaXB0aW9uKGtleSkge1xuICAgIC8vIGUuZy4gbGFiZWw6IENvbG9yLCBtZWFzdXJlOiBBdmVyYWdlIG9mIEVUQVxuICAgIGNvbnN0IHtyYW5nZSwgZmllbGQsIGRlZmF1bHRNZWFzdXJlLCBhZ2dyZWdhdGlvbn0gPSB0aGlzLnZpc3VhbENoYW5uZWxzW2tleV07XG4gICAgcmV0dXJuIHtcbiAgICAgIGxhYmVsOiB0aGlzLnZpc0NvbmZpZ1NldHRpbmdzW3JhbmdlXS5sYWJlbCxcbiAgICAgIG1lYXN1cmU6IHRoaXMuY29uZmlnW2ZpZWxkXVxuICAgICAgICA/IGAke3RoaXMuY29uZmlnLnZpc0NvbmZpZ1thZ2dyZWdhdGlvbl19IG9mICR7dGhpcy5jb25maWdbZmllbGRdLm5hbWV9YFxuICAgICAgICA6IGRlZmF1bHRNZWFzdXJlXG4gICAgfVxuICB9XG5cbiAgZ2V0SG92ZXJEYXRhKG9iamVjdCkge1xuICAgIC8vIHJldHVybiBhZ2dyZWdhdGVkIG9iamVjdFxuICAgIHJldHVybiBvYmplY3Q7XG4gIH1cblxuICAvKipcbiAgICogQWdncmVnYXRpb24gbGF5ZXIgaGFuZGxlcyB2aXN1YWwgY2hhbm5lbCBhZ2dyZWdhdGlvbiBpbnNpZGUgZGVjay5nbCBsYXllclxuICAgKi9cbiAgdXBkYXRlTGF5ZXJWaXN1YWxDaGFubmVsKHtkYXRhLCBhbGxEYXRhfSwgY2hhbm5lbCkge1xuICAgIHRoaXMudmFsaWRhdGVWaXN1YWxDaGFubmVsKGNoYW5uZWwpO1xuICB9XG5cbiAgLyoqXG4gICAqIFZhbGlkYXRlIGFnZ3JlZ2F0aW9uIHR5cGUgb24gdG9wIG9mIGJhc2ljIGxheWVyIHZpc3VhbCBjaGFubmVsIHZhbGlkYXRpb25cbiAgICogQHBhcmFtIGNoYW5uZWxcbiAgICovXG4gIHZhbGlkYXRlVmlzdWFsQ2hhbm5lbChjaGFubmVsKSB7XG5cbiAgICAvLyBmaWVsZCB0eXBlIGRlY2lkZXMgYWdncmVnYXRpb24gdHlwZSBkZWNpZGVzIHNjYWxlIHR5cGVcbiAgICB0aGlzLnZhbGlkYXRlRmllbGRUeXBlKGNoYW5uZWwpO1xuICAgIHRoaXMudmFsaWRhdGVBZ2dyZWdhdGlvblR5cGUoY2hhbm5lbCk7XG4gICAgdGhpcy52YWxpZGF0ZVNjYWxlKGNoYW5uZWwpO1xuICB9XG5cbiAgLyoqXG4gICAqIFZhbGlkYXRlIGFnZ3JlZ2F0aW9uIHR5cGUgYmFzZWQgb24gc2VsZWN0ZWQgZmllbGRcbiAgICovXG4gIHZhbGlkYXRlQWdncmVnYXRpb25UeXBlKGNoYW5uZWwpIHtcbiAgICBjb25zdCB2aXN1YWxDaGFubmVsID0gdGhpcy52aXN1YWxDaGFubmVsc1tjaGFubmVsXTtcbiAgICBjb25zdCB7ZmllbGQsIGFnZ3JlZ2F0aW9ufSA9IHZpc3VhbENoYW5uZWw7XG4gICAgY29uc3QgYWdncmVnYXRpb25PcHRpb25zID0gdGhpcy5nZXRBZ2dyZWdhdGlvbk9wdGlvbnMoY2hhbm5lbCk7XG5cbiAgICBpZiAoIWFnZ3JlZ2F0aW9uKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKCFhZ2dyZWdhdGlvbk9wdGlvbnMubGVuZ3RoKSB7XG4gICAgICAvLyBpZiBmaWVsZCBjYW5ub3QgYmUgYWdncmVnYXRlZCwgc2V0IGZpZWxkIHRvIG51bGxcbiAgICAgIHRoaXMudXBkYXRlTGF5ZXJDb25maWcoe1tmaWVsZF06IG51bGx9KTtcblxuICAgIH0gZWxzZSBpZiAoIWFnZ3JlZ2F0aW9uT3B0aW9ucy5pbmNsdWRlcyh0aGlzLmNvbmZpZy52aXNDb25maWdbYWdncmVnYXRpb25dKSkge1xuICAgICAgLy8gY3VycmVudCBhZ2dyZWdhdGlvbiB0eXBlIGlzIG5vdCBzdXBwb3J0ZWQgYnkgdGhpcyBmaWVsZFxuICAgICAgLy8gc2V0IGFnZ3JlZ2F0aW9uIHRvIHRoZSBmaXJzdCBzdXBwb3J0ZWQgb3B0aW9uXG4gICAgICB0aGlzLnVwZGF0ZUxheWVyVmlzQ29uZmlnKHtbYWdncmVnYXRpb25dOiBhZ2dyZWdhdGlvbk9wdGlvbnNbMF19KTtcbiAgICB9XG4gIH1cblxuICBnZXRBZ2dyZWdhdGlvbk9wdGlvbnMoY2hhbm5lbCkge1xuICAgIGNvbnN0IHZpc3VhbENoYW5uZWwgPSB0aGlzLnZpc3VhbENoYW5uZWxzW2NoYW5uZWxdO1xuICAgIGNvbnN0IHtmaWVsZCwgY2hhbm5lbFNjYWxlVHlwZX0gPSB2aXN1YWxDaGFubmVsO1xuXG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKFxuICAgICAgdGhpcy5jb25maWdbZmllbGRdID8gRklFTERfT1BUU1t0aGlzLmNvbmZpZ1tmaWVsZF0udHlwZV0uc2NhbGVbY2hhbm5lbFNjYWxlVHlwZV0gOlxuICAgICAgICBERUZBVUxUX0FHR1JFR0FUSU9OW2NoYW5uZWxTY2FsZVR5cGVdKVxuICB9XG5cbiAgLyoqXG4gICAqIEdldCBzY2FsZSBvcHRpb25zIGJhc2VkIG9uIGN1cnJlbnQgZmllbGQgYW5kIGFnZ3JlZ2F0aW9uIHR5cGVcbiAgICogQHBhcmFtIHtzdHJpbmd9IGNoYW5uZWxcbiAgICogQHJldHVybnMge3N0cmluZ1tdfVxuICAgKi9cbiAgZ2V0U2NhbGVPcHRpb25zKGNoYW5uZWwpIHtcbiAgICBjb25zdCB2aXN1YWxDaGFubmVsID0gdGhpcy52aXN1YWxDaGFubmVsc1tjaGFubmVsXTtcbiAgICBjb25zdCB7ZmllbGQsIGFnZ3JlZ2F0aW9uLCBjaGFubmVsU2NhbGVUeXBlfSA9IHZpc3VhbENoYW5uZWw7XG4gICAgY29uc3QgYWdncmVnYXRpb25UeXBlID0gdGhpcy5jb25maWcudmlzQ29uZmlnW2FnZ3JlZ2F0aW9uXTtcbiAgICByZXR1cm4gdGhpcy5jb25maWdbZmllbGRdID9cbiAgICAgIC8vIHNjYWxlIG9wdGlvbnMgYmFzZWQgb24gYWdncmVnYXRpb25cbiAgICAgIEZJRUxEX09QVFNbdGhpcy5jb25maWdbZmllbGRdLnR5cGVdLnNjYWxlW2NoYW5uZWxTY2FsZVR5cGVdW2FnZ3JlZ2F0aW9uVHlwZV0gOlxuICAgICAgLy8gZGVmYXVsdCBzY2FsZSBvcHRpb25zIGZvciBwb2ludCBjb3VudFxuICAgICAgREVGQVVMVF9BR0dSRUdBVElPTltjaGFubmVsU2NhbGVUeXBlXVthZ2dyZWdhdGlvblR5cGVdO1xuICB9XG5cbiAgLyoqXG4gICAqIEFnZ3JlZ2F0aW9uIGxheWVyIGhhbmRsZXMgdmlzdWFsIGNoYW5uZWwgYWdncmVnYXRpb24gaW5zaWRlIGRlY2suZ2wgbGF5ZXJcbiAgICovXG4gIHVwZGF0ZUxheWVyRG9tYWluKGRhdGFzZXQsIG5ld0ZpbHRlcikge1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgdXBkYXRlTGF5ZXJNZXRhKGFsbERhdGEsIGdldFBvc2l0aW9uKSB7XG4gICAgLy8gZ2V0IGJvdW5kcyBmcm9tIHBvaW50c1xuICAgIGNvbnN0IGJvdW5kcyA9IHRoaXMuZ2V0UG9pbnRzQm91bmRzKGFsbERhdGEsIGdldFBvc2l0aW9uKTtcblxuICAgIC8vIGdldCBsaWdodFNldHRpbmdzIGZyb20gcG9pbnRzXG4gICAgY29uc3QgbGlnaHRTZXR0aW5ncyA9IHRoaXMuZ2V0TGlnaHRTZXR0aW5nc0Zyb21Cb3VuZHMoYm91bmRzKTtcblxuICAgIHRoaXMudXBkYXRlTWV0YSh7Ym91bmRzLCBsaWdodFNldHRpbmdzfSk7XG4gIH1cblxuICBmb3JtYXRMYXllckRhdGEoXywgYWxsRGF0YSwgZmlsdGVyZWRJbmRleCwgb2xkTGF5ZXJEYXRhLCBvcHQgPSB7fSkge1xuICAgIGNvbnN0IGdldFBvc2l0aW9uID0gdGhpcy5nZXRQb3NpdGlvbih0aGlzLmNvbmZpZy5jb2x1bW5zKTtcblxuICAgIGlmICghb2xkTGF5ZXJEYXRhIHx8IG9sZExheWVyRGF0YS5nZXRQb3NpdGlvbiAhPT0gZ2V0UG9zaXRpb24pIHtcbiAgICAgIHRoaXMudXBkYXRlTGF5ZXJNZXRhKGFsbERhdGEsIGdldFBvc2l0aW9uKTtcbiAgICB9XG5cbiAgICBjb25zdCBnZXRDb2xvclZhbHVlID0gdGhpcy5jb25maWcuY29sb3JGaWVsZFxuICAgICAgPyB0aGlzLmdldENvbG9yVmFsdWUoXG4gICAgICAgICAgdGhpcy5jb25maWcuY29sb3JGaWVsZCxcbiAgICAgICAgICB0aGlzLmNvbmZpZy52aXNDb25maWcuY29sb3JBZ2dyZWdhdGlvblxuICAgICAgICApXG4gICAgICA6IHVuZGVmaW5lZDtcblxuICAgIGNvbnN0IGdldEVsZXZhdGlvblZhbHVlID0gdGhpcy5jb25maWcuc2l6ZUZpZWxkXG4gICAgICA/IHRoaXMuZ2V0RWxldmF0aW9uVmFsdWUoXG4gICAgICAgICAgdGhpcy5jb25maWcuc2l6ZUZpZWxkLFxuICAgICAgICAgIHRoaXMuY29uZmlnLnZpc0NvbmZpZy5zaXplQWdncmVnYXRpb25cbiAgICAgICAgKVxuICAgICAgOiB1bmRlZmluZWQ7XG5cbiAgICBsZXQgZGF0YTtcbiAgICBpZiAoXG4gICAgICBvbGRMYXllckRhdGEgJiZcbiAgICAgIG9sZExheWVyRGF0YS5kYXRhICYmXG4gICAgICBvcHQuc2FtZURhdGEgJiZcbiAgICAgIG9sZExheWVyRGF0YS5nZXRQb3NpdGlvbiA9PT0gZ2V0UG9zaXRpb25cbiAgICApIHtcbiAgICAgIGRhdGEgPSBvbGRMYXllckRhdGEuZGF0YTtcbiAgICB9IGVsc2Uge1xuICAgICAgZGF0YSA9IGZpbHRlcmVkSW5kZXgubWFwKGkgPT4gYWxsRGF0YVtpXSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIGRhdGEsXG4gICAgICBnZXRQb3NpdGlvbixcbiAgICAgIC4uLihnZXRDb2xvclZhbHVlID8ge2dldENvbG9yVmFsdWV9IDoge30pLFxuICAgICAgLi4uKGdldEVsZXZhdGlvblZhbHVlID8ge2dldEVsZXZhdGlvblZhbHVlfSA6IHt9KVxuICAgIH07XG4gIH1cbn1cbiJdfQ==