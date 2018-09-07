'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.heatmapVisConfigs = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

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

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _reselect = require('reselect');

var _defaultSettings = require('../../constants/default-settings');

var _colorUtils = require('../../utils/color-utils');

var _mapboxUtils = require('../mapbox-utils');

var _mapboxglLayer = require('../mapboxgl-layer');

var _mapboxglLayer2 = _interopRequireDefault(_mapboxglLayer);

var _heatmapLayerIcon = require('./heatmap-layer-icon');

var _heatmapLayerIcon2 = _interopRequireDefault(_heatmapLayerIcon);

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

var MAX_ZOOM_LEVEL = 18;

var heatmapVisConfigs = exports.heatmapVisConfigs = {
  opacity: 'opacity',
  colorRange: 'colorRange',
  radius: 'heatmapRadius'
};

/**
 *
 * @param {Object} colorRange
 * @return {Array} [
 *  0, "rgba(33,102,172,0)",
 *  0.2, "rgb(103,169,207)",
 *  0.4, "rgb(209,229,240)",
 *  0.6, "rgb(253,219,199)",
 *  0.8, "rgb(239,138,98)",
 *  1, "rgb(178,24,43)"
 * ]
 */
var heatmapDensity = function heatmapDensity(colorRange) {

  var scaleFunction = _defaultSettings.SCALE_FUNC.quantize;

  var scale = scaleFunction().domain([0, 1]).range(colorRange.colors);

  return scale.range().reduce(function (bands, level) {
    var invert = scale.invertExtent(level);
    return [].concat((0, _toConsumableArray3.default)(bands), [invert[0], // first value in the range
    'rgb(' + (0, _colorUtils.hexToRgb)(level).join(',') + ')' // color
    ]);
  }, []);
};

var shouldRebuild = function shouldRebuild(sameData, sameConfig) {
  return !(sameData && sameConfig);
};

var HeatmapLayer = function (_MapboxGLLayer) {
  (0, _inherits3.default)(HeatmapLayer, _MapboxGLLayer);

  function HeatmapLayer(props) {
    (0, _classCallCheck3.default)(this, HeatmapLayer);

    var _this = (0, _possibleConstructorReturn3.default)(this, (HeatmapLayer.__proto__ || Object.getPrototypeOf(HeatmapLayer)).call(this, props));

    _this.isSameData = function (_ref, config) {
      var allData = _ref.allData,
          filteredIndex = _ref.filteredIndex,
          oldLayerData = _ref.oldLayerData,
          _ref$opt = _ref.opt,
          opt = _ref$opt === undefined ? {} : _ref$opt;

      return Boolean(oldLayerData && oldLayerData.columns === config.columns && opt.sameData);
    };

    _this.isSameConfig = function (_ref2) {
      var oldLayerData = _ref2.oldLayerData,
          config = _ref2.config;

      // columns must use the same filedIdx
      // this is a fast way to compare columns object
      var columns = config.columns,
          weightField = config.weightField;


      if (!oldLayerData) {
        return false;
      }

      var sameColumns = columns === oldLayerData.columns;
      var sameWeightField = weightField === oldLayerData.weightField;
      return sameColumns && sameWeightField;
    };

    _this.datasetSelector = function (config) {
      return config.dataId;
    };

    _this.isVisibleSelector = function (config) {
      return config.isVisible;
    };

    _this.visConfigSelector = function (config) {
      return config.visConfig;
    };

    _this.weightFieldSelector = function (config) {
      return config.weightField ? config.weightField.name : null;
    };

    _this.weightDomainSelector = function (config) {
      return config.weightDomain;
    };

    _this.computeHeatmapConfiguration = (0, _reselect.createSelector)(_this.datasetSelector, _this.isVisibleSelector, _this.visConfigSelector, _this.weightFieldSelector, _this.weightDomainSelector, function (datasetId, isVisible, visConfig, weightField, weightDomain) {

      var layer = {
        type: 'heatmap',
        id: _this.id,
        source: datasetId,
        layout: {
          visibility: isVisible ? 'visible' : 'none'
        },
        maxzoom: MAX_ZOOM_LEVEL,
        paint: {
          'heatmap-weight': weightField ? ['interpolate', ['linear'], ['get', weightField], weightDomain[0], 0, weightDomain[1], 1] : 1,
          'heatmap-intensity': ['interpolate', ['linear'], ['zoom'], 0, 1, MAX_ZOOM_LEVEL, 3],
          'heatmap-color': ['interpolate', ['linear'], ['heatmap-density']].concat((0, _toConsumableArray3.default)(heatmapDensity(visConfig.colorRange))),
          'heatmap-radius': ['interpolate', ['linear'], ['zoom'], 0, 2, MAX_ZOOM_LEVEL, visConfig.radius // radius
          ],
          'heatmap-opacity': visConfig.opacity
        }
      };

      return layer;
    });

    _this.registerVisConfig(heatmapVisConfigs);
    return _this;
  }

  (0, _createClass3.default)(HeatmapLayer, [{
    key: 'getVisualChannelDescription',
    value: function getVisualChannelDescription(channel) {
      return channel === 'color' ? {
        label: 'color',
        measure: 'Density'
      } : {
        label: 'weight',
        measure: this.config.weightField ? this.config.weightField.name : 'Density'
      };
    }
  }, {
    key: 'getDefaultLayerConfig',
    value: function getDefaultLayerConfig() {
      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      // mapbox heatmap layer color is always based on density
      // no need to set colorField, colorDomain and colorScale
      /* eslint-disable no-unused-vars */
      var _get$call$weightField = (0, _extends3.default)({}, (0, _get3.default)(HeatmapLayer.prototype.__proto__ || Object.getPrototypeOf(HeatmapLayer.prototype), 'getDefaultLayerConfig', this).call(this, props), {

        weightField: null,
        weightDomain: [0, 1],
        weightScale: 'linear'
      }),
          colorField = _get$call$weightField.colorField,
          colorDomain = _get$call$weightField.colorDomain,
          colorScale = _get$call$weightField.colorScale,
          layerConfig = (0, _objectWithoutProperties3.default)(_get$call$weightField, ['colorField', 'colorDomain', 'colorScale']);
      /* eslint-enable no-unused-vars */

      return layerConfig;
    }
  }, {
    key: 'formatLayerData',
    value: function formatLayerData(_, allData, filteredIndex, oldLayerData) {
      var opt = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};

      var options = {
        allData: allData,
        filteredIndex: filteredIndex,
        oldLayerData: oldLayerData,
        opt: opt,
        config: this.config
      };

      var weightField = this.config.weightField;

      var isSameData = this.isSameData(options, this.config);
      var isSameConfig = this.isSameConfig(options);

      var data = !shouldRebuild(isSameData, isSameConfig) ? null : (0, _mapboxUtils.geojsonFromPoints)(allData, filteredIndex, this.config.columns, weightField ? [weightField] : []);

      var newConfig = this.computeHeatmapConfiguration(this.config);
      newConfig.id = this.id;

      return {
        columns: this.config.columns,
        config: newConfig,
        data: data,
        weightField: weightField
      };
    }
  }, {
    key: 'type',
    get: function get() {
      return 'heatmap';
    }
  }, {
    key: 'visualChannels',
    get: function get() {
      return {
        weight: {
          property: 'weight',
          field: 'weightField',
          scale: 'weightScale',
          domain: 'weightDomain',
          key: 'weight',
          // supportedFieldTypes can be determined by channelScaleType
          // or specified here
          defaultMeasure: 'density',
          supportedFieldTypes: [_defaultSettings.ALL_FIELD_TYPES.real, _defaultSettings.ALL_FIELD_TYPES.integer],
          channelScaleType: _defaultSettings.CHANNEL_SCALES.size
        }
      };
    }
  }, {
    key: 'layerIcon',
    get: function get() {
      return _heatmapLayerIcon2.default;
    }
  }]);
  return HeatmapLayer;
}(_mapboxglLayer2.default);

exports.default = HeatmapLayer;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9sYXllcnMvaGVhdG1hcC1sYXllci9oZWF0bWFwLWxheWVyLmpzIl0sIm5hbWVzIjpbIk1BWF9aT09NX0xFVkVMIiwiaGVhdG1hcFZpc0NvbmZpZ3MiLCJvcGFjaXR5IiwiY29sb3JSYW5nZSIsInJhZGl1cyIsImhlYXRtYXBEZW5zaXR5Iiwic2NhbGVGdW5jdGlvbiIsIlNDQUxFX0ZVTkMiLCJxdWFudGl6ZSIsInNjYWxlIiwiZG9tYWluIiwicmFuZ2UiLCJjb2xvcnMiLCJyZWR1Y2UiLCJiYW5kcyIsImxldmVsIiwiaW52ZXJ0IiwiaW52ZXJ0RXh0ZW50Iiwiam9pbiIsInNob3VsZFJlYnVpbGQiLCJzYW1lRGF0YSIsInNhbWVDb25maWciLCJIZWF0bWFwTGF5ZXIiLCJwcm9wcyIsImlzU2FtZURhdGEiLCJjb25maWciLCJhbGxEYXRhIiwiZmlsdGVyZWRJbmRleCIsIm9sZExheWVyRGF0YSIsIm9wdCIsIkJvb2xlYW4iLCJjb2x1bW5zIiwiaXNTYW1lQ29uZmlnIiwid2VpZ2h0RmllbGQiLCJzYW1lQ29sdW1ucyIsInNhbWVXZWlnaHRGaWVsZCIsImRhdGFzZXRTZWxlY3RvciIsImRhdGFJZCIsImlzVmlzaWJsZVNlbGVjdG9yIiwiaXNWaXNpYmxlIiwidmlzQ29uZmlnU2VsZWN0b3IiLCJ2aXNDb25maWciLCJ3ZWlnaHRGaWVsZFNlbGVjdG9yIiwibmFtZSIsIndlaWdodERvbWFpblNlbGVjdG9yIiwid2VpZ2h0RG9tYWluIiwiY29tcHV0ZUhlYXRtYXBDb25maWd1cmF0aW9uIiwiZGF0YXNldElkIiwibGF5ZXIiLCJ0eXBlIiwiaWQiLCJzb3VyY2UiLCJsYXlvdXQiLCJ2aXNpYmlsaXR5IiwibWF4em9vbSIsInBhaW50IiwicmVnaXN0ZXJWaXNDb25maWciLCJjaGFubmVsIiwibGFiZWwiLCJtZWFzdXJlIiwid2VpZ2h0U2NhbGUiLCJjb2xvckZpZWxkIiwiY29sb3JEb21haW4iLCJjb2xvclNjYWxlIiwibGF5ZXJDb25maWciLCJfIiwib3B0aW9ucyIsImRhdGEiLCJuZXdDb25maWciLCJ3ZWlnaHQiLCJwcm9wZXJ0eSIsImZpZWxkIiwia2V5IiwiZGVmYXVsdE1lYXN1cmUiLCJzdXBwb3J0ZWRGaWVsZFR5cGVzIiwiQUxMX0ZJRUxEX1RZUEVTIiwicmVhbCIsImludGVnZXIiLCJjaGFubmVsU2NhbGVUeXBlIiwiQ0hBTk5FTF9TQ0FMRVMiLCJzaXplIiwiSGVhdG1hcExheWVySWNvbiIsIk1hcGJveEdMTGF5ZXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQW9CQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7OztBQUNBOzs7Ozs7QUF6QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBU0EsSUFBTUEsaUJBQWlCLEVBQXZCOztBQUVPLElBQU1DLGdEQUFvQjtBQUMvQkMsV0FBUyxTQURzQjtBQUUvQkMsY0FBWSxZQUZtQjtBQUcvQkMsVUFBUTtBQUh1QixDQUExQjs7QUFNUDs7Ozs7Ozs7Ozs7O0FBWUEsSUFBTUMsaUJBQWlCLFNBQWpCQSxjQUFpQixDQUFDRixVQUFELEVBQWdCOztBQUVyQyxNQUFNRyxnQkFBZ0JDLDRCQUFXQyxRQUFqQzs7QUFFQSxNQUFNQyxRQUFRSCxnQkFDWEksTUFEVyxDQUNKLENBQUMsQ0FBRCxFQUFJLENBQUosQ0FESSxFQUVYQyxLQUZXLENBRUxSLFdBQVdTLE1BRk4sQ0FBZDs7QUFJQSxTQUFPSCxNQUFNRSxLQUFOLEdBQWNFLE1BQWQsQ0FBcUIsVUFBQ0MsS0FBRCxFQUFRQyxLQUFSLEVBQWtCO0FBQzVDLFFBQU1DLFNBQVNQLE1BQU1RLFlBQU4sQ0FBbUJGLEtBQW5CLENBQWY7QUFDQSxzREFDS0QsS0FETCxJQUVFRSxPQUFPLENBQVAsQ0FGRixFQUVhO0FBRmIsYUFHUywwQkFBU0QsS0FBVCxFQUFnQkcsSUFBaEIs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RUFBdUJELGlDQUFnQkUsT0FBdkMsQ0FUZjtBQVVOQyw0QkFBa0JDLGdDQUFlQztBQVYzQjtBQURILE9BQVA7QUFjRDs7O3dCQUVlO0FBQ2QsYUFBT0MsMEJBQVA7QUFDRDs7O0VBN0J3QkMsdUI7O2tCQThLWjVELFkiLCJmaWxlIjoiaGVhdG1hcC1sYXllci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgMjAxOCBVYmVyIFRlY2hub2xvZ2llcywgSW5jLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbi8vIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbi8vIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbi8vIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbi8vIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuLy8gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuLy8gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4vLyBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbi8vIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbi8vIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4vLyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4vLyBUSEUgU09GVFdBUkUuXG5cbmltcG9ydCB7Y3JlYXRlU2VsZWN0b3J9IGZyb20gJ3Jlc2VsZWN0JztcbmltcG9ydCB7Q0hBTk5FTF9TQ0FMRVMsIFNDQUxFX0ZVTkMsIEFMTF9GSUVMRF9UWVBFU30gZnJvbSAnY29uc3RhbnRzL2RlZmF1bHQtc2V0dGluZ3MnO1xuaW1wb3J0IHtoZXhUb1JnYn0gZnJvbSAndXRpbHMvY29sb3ItdXRpbHMnO1xuaW1wb3J0IHtnZW9qc29uRnJvbVBvaW50c30gZnJvbSAnLi4vbWFwYm94LXV0aWxzJztcbmltcG9ydCBNYXBib3hHTExheWVyIGZyb20gJy4uL21hcGJveGdsLWxheWVyJztcbmltcG9ydCBIZWF0bWFwTGF5ZXJJY29uIGZyb20gJy4vaGVhdG1hcC1sYXllci1pY29uJztcblxuY29uc3QgTUFYX1pPT01fTEVWRUwgPSAxODtcblxuZXhwb3J0IGNvbnN0IGhlYXRtYXBWaXNDb25maWdzID0ge1xuICBvcGFjaXR5OiAnb3BhY2l0eScsXG4gIGNvbG9yUmFuZ2U6ICdjb2xvclJhbmdlJyxcbiAgcmFkaXVzOiAnaGVhdG1hcFJhZGl1cydcbn07XG5cbi8qKlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb2xvclJhbmdlXG4gKiBAcmV0dXJuIHtBcnJheX0gW1xuICogIDAsIFwicmdiYSgzMywxMDIsMTcyLDApXCIsXG4gKiAgMC4yLCBcInJnYigxMDMsMTY5LDIwNylcIixcbiAqICAwLjQsIFwicmdiKDIwOSwyMjksMjQwKVwiLFxuICogIDAuNiwgXCJyZ2IoMjUzLDIxOSwxOTkpXCIsXG4gKiAgMC44LCBcInJnYigyMzksMTM4LDk4KVwiLFxuICogIDEsIFwicmdiKDE3OCwyNCw0MylcIlxuICogXVxuICovXG5jb25zdCBoZWF0bWFwRGVuc2l0eSA9IChjb2xvclJhbmdlKSA9PiB7XG5cbiAgY29uc3Qgc2NhbGVGdW5jdGlvbiA9IFNDQUxFX0ZVTkMucXVhbnRpemU7XG5cbiAgY29uc3Qgc2NhbGUgPSBzY2FsZUZ1bmN0aW9uKClcbiAgICAuZG9tYWluKFswLCAxXSlcbiAgICAucmFuZ2UoY29sb3JSYW5nZS5jb2xvcnMpO1xuXG4gIHJldHVybiBzY2FsZS5yYW5nZSgpLnJlZHVjZSgoYmFuZHMsIGxldmVsKSA9PiB7XG4gICAgY29uc3QgaW52ZXJ0ID0gc2NhbGUuaW52ZXJ0RXh0ZW50KGxldmVsKTtcbiAgICByZXR1cm4gW1xuICAgICAgLi4uYmFuZHMsXG4gICAgICBpbnZlcnRbMF0sIC8vIGZpcnN0IHZhbHVlIGluIHRoZSByYW5nZVxuICAgICAgYHJnYigke2hleFRvUmdiKGxldmVsKS5qb2luKCcsJyl9KWAgLy8gY29sb3JcbiAgICBdXG4gIH0sIFtdKTtcbn07XG5cbmNvbnN0IHNob3VsZFJlYnVpbGQgPSAoc2FtZURhdGEsIHNhbWVDb25maWcpID0+ICEoc2FtZURhdGEgJiYgc2FtZUNvbmZpZyk7XG5cbmNsYXNzIEhlYXRtYXBMYXllciBleHRlbmRzIE1hcGJveEdMTGF5ZXIge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLnJlZ2lzdGVyVmlzQ29uZmlnKGhlYXRtYXBWaXNDb25maWdzKTtcbiAgfVxuXG4gIGdldCB0eXBlKCkge1xuICAgIHJldHVybiAnaGVhdG1hcCc7XG4gIH1cblxuICBnZXQgdmlzdWFsQ2hhbm5lbHMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHdlaWdodDoge1xuICAgICAgICBwcm9wZXJ0eTogJ3dlaWdodCcsXG4gICAgICAgIGZpZWxkOiAnd2VpZ2h0RmllbGQnLFxuICAgICAgICBzY2FsZTogJ3dlaWdodFNjYWxlJyxcbiAgICAgICAgZG9tYWluOiAnd2VpZ2h0RG9tYWluJyxcbiAgICAgICAga2V5OiAnd2VpZ2h0JyxcbiAgICAgICAgLy8gc3VwcG9ydGVkRmllbGRUeXBlcyBjYW4gYmUgZGV0ZXJtaW5lZCBieSBjaGFubmVsU2NhbGVUeXBlXG4gICAgICAgIC8vIG9yIHNwZWNpZmllZCBoZXJlXG4gICAgICAgIGRlZmF1bHRNZWFzdXJlOiAnZGVuc2l0eScsXG4gICAgICAgIHN1cHBvcnRlZEZpZWxkVHlwZXM6IFtBTExfRklFTERfVFlQRVMucmVhbCwgQUxMX0ZJRUxEX1RZUEVTLmludGVnZXJdLFxuICAgICAgICBjaGFubmVsU2NhbGVUeXBlOiBDSEFOTkVMX1NDQUxFUy5zaXplXG4gICAgICB9XG4gICAgfTtcbiAgfVxuXG4gIGdldCBsYXllckljb24oKSB7XG4gICAgcmV0dXJuIEhlYXRtYXBMYXllckljb247XG4gIH1cblxuICBnZXRWaXN1YWxDaGFubmVsRGVzY3JpcHRpb24oY2hhbm5lbCkge1xuICAgIHJldHVybiBjaGFubmVsID09PSAnY29sb3InID8ge1xuICAgICAgbGFiZWw6ICdjb2xvcicsXG4gICAgICBtZWFzdXJlOiAnRGVuc2l0eSdcbiAgICB9IDoge1xuICAgICAgbGFiZWw6ICd3ZWlnaHQnLFxuICAgICAgbWVhc3VyZTogdGhpcy5jb25maWcud2VpZ2h0RmllbGQgPyB0aGlzLmNvbmZpZy53ZWlnaHRGaWVsZC5uYW1lIDogJ0RlbnNpdHknXG4gICAgfVxuICB9XG5cbiAgZ2V0RGVmYXVsdExheWVyQ29uZmlnKHByb3BzID0ge30pIHtcblxuICAgIC8vIG1hcGJveCBoZWF0bWFwIGxheWVyIGNvbG9yIGlzIGFsd2F5cyBiYXNlZCBvbiBkZW5zaXR5XG4gICAgLy8gbm8gbmVlZCB0byBzZXQgY29sb3JGaWVsZCwgY29sb3JEb21haW4gYW5kIGNvbG9yU2NhbGVcbiAgICAvKiBlc2xpbnQtZGlzYWJsZSBuby11bnVzZWQtdmFycyAqL1xuICAgIGNvbnN0IHtjb2xvckZpZWxkLCBjb2xvckRvbWFpbiwgY29sb3JTY2FsZSwgLi4ubGF5ZXJDb25maWd9ID0ge1xuICAgICAgLi4uc3VwZXIuZ2V0RGVmYXVsdExheWVyQ29uZmlnKHByb3BzKSxcblxuICAgICAgd2VpZ2h0RmllbGQ6IG51bGwsXG4gICAgICB3ZWlnaHREb21haW46IFswLCAxXSxcbiAgICAgIHdlaWdodFNjYWxlOiAnbGluZWFyJ1xuICAgIH07XG4gICAgLyogZXNsaW50LWVuYWJsZSBuby11bnVzZWQtdmFycyAqL1xuXG4gICAgcmV0dXJuIGxheWVyQ29uZmlnO1xuICB9XG5cbiAgaXNTYW1lRGF0YSA9ICh7YWxsRGF0YSwgZmlsdGVyZWRJbmRleCwgb2xkTGF5ZXJEYXRhLCBvcHQgPSB7fX0sIGNvbmZpZykgPT4ge1xuICAgIHJldHVybiBCb29sZWFuKG9sZExheWVyRGF0YSAmJiBvbGRMYXllckRhdGEuY29sdW1ucyA9PT0gY29uZmlnLmNvbHVtbnMgJiZcbiAgICAgIG9wdC5zYW1lRGF0YVxuICAgICk7XG4gIH07XG5cbiAgaXNTYW1lQ29uZmlnID0gKHtvbGRMYXllckRhdGEsIGNvbmZpZ30pID0+IHtcbiAgICAvLyBjb2x1bW5zIG11c3QgdXNlIHRoZSBzYW1lIGZpbGVkSWR4XG4gICAgLy8gdGhpcyBpcyBhIGZhc3Qgd2F5IHRvIGNvbXBhcmUgY29sdW1ucyBvYmplY3RcbiAgICBjb25zdCB7XG4gICAgICBjb2x1bW5zLFxuICAgICAgd2VpZ2h0RmllbGRcbiAgICB9ID0gY29uZmlnO1xuXG4gICAgaWYgKCFvbGRMYXllckRhdGEpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBjb25zdCBzYW1lQ29sdW1ucyA9IGNvbHVtbnMgPT09IG9sZExheWVyRGF0YS5jb2x1bW5zO1xuICAgIGNvbnN0IHNhbWVXZWlnaHRGaWVsZCA9IHdlaWdodEZpZWxkID09PSBvbGRMYXllckRhdGEud2VpZ2h0RmllbGQ7XG4gICAgcmV0dXJuIHNhbWVDb2x1bW5zICYmIHNhbWVXZWlnaHRGaWVsZDtcbiAgfTtcblxuICBkYXRhc2V0U2VsZWN0b3IgPSBjb25maWcgPT4gY29uZmlnLmRhdGFJZDtcbiAgaXNWaXNpYmxlU2VsZWN0b3IgPSBjb25maWcgPT4gY29uZmlnLmlzVmlzaWJsZTtcbiAgdmlzQ29uZmlnU2VsZWN0b3IgPSBjb25maWcgPT4gY29uZmlnLnZpc0NvbmZpZztcbiAgd2VpZ2h0RmllbGRTZWxlY3RvciA9IGNvbmZpZyA9PiBjb25maWcud2VpZ2h0RmllbGQgPyBjb25maWcud2VpZ2h0RmllbGQubmFtZSA6IG51bGw7XG4gIHdlaWdodERvbWFpblNlbGVjdG9yID0gY29uZmlnID0+IGNvbmZpZy53ZWlnaHREb21haW47XG5cbiAgY29tcHV0ZUhlYXRtYXBDb25maWd1cmF0aW9uID0gY3JlYXRlU2VsZWN0b3IoXG4gICAgdGhpcy5kYXRhc2V0U2VsZWN0b3IsXG4gICAgdGhpcy5pc1Zpc2libGVTZWxlY3RvcixcbiAgICB0aGlzLnZpc0NvbmZpZ1NlbGVjdG9yLFxuICAgIHRoaXMud2VpZ2h0RmllbGRTZWxlY3RvcixcbiAgICB0aGlzLndlaWdodERvbWFpblNlbGVjdG9yLFxuXG4gICAgKGRhdGFzZXRJZCwgaXNWaXNpYmxlLCB2aXNDb25maWcsIHdlaWdodEZpZWxkLCB3ZWlnaHREb21haW4pID0+IHtcblxuICAgICAgY29uc3QgbGF5ZXIgPSB7XG4gICAgICAgIHR5cGU6ICdoZWF0bWFwJyxcbiAgICAgICAgaWQ6IHRoaXMuaWQsXG4gICAgICAgIHNvdXJjZTogZGF0YXNldElkLFxuICAgICAgICBsYXlvdXQ6IHtcbiAgICAgICAgICB2aXNpYmlsaXR5OiBpc1Zpc2libGUgPyAndmlzaWJsZScgOiAnbm9uZSdcbiAgICAgICAgfSxcbiAgICAgICAgbWF4em9vbTogTUFYX1pPT01fTEVWRUwsXG4gICAgICAgIHBhaW50OiB7XG4gICAgICAgICAgJ2hlYXRtYXAtd2VpZ2h0Jzogd2VpZ2h0RmllbGQgPyBbXG4gICAgICAgICAgICAnaW50ZXJwb2xhdGUnLFxuICAgICAgICAgICAgWydsaW5lYXInXSxcbiAgICAgICAgICAgIFsnZ2V0Jywgd2VpZ2h0RmllbGRdLFxuICAgICAgICAgICAgd2VpZ2h0RG9tYWluWzBdLCAwLFxuICAgICAgICAgICAgd2VpZ2h0RG9tYWluWzFdLCAxXG4gICAgICAgICAgXSA6IDEsXG4gICAgICAgICAgJ2hlYXRtYXAtaW50ZW5zaXR5JzogW1xuICAgICAgICAgICAgJ2ludGVycG9sYXRlJyxcbiAgICAgICAgICAgIFsnbGluZWFyJ10sXG4gICAgICAgICAgICBbJ3pvb20nXSxcbiAgICAgICAgICAgIDAsIDEsXG4gICAgICAgICAgICBNQVhfWk9PTV9MRVZFTCwgM1xuICAgICAgICAgIF0sXG4gICAgICAgICAgJ2hlYXRtYXAtY29sb3InOiBbXG4gICAgICAgICAgICAnaW50ZXJwb2xhdGUnLFxuICAgICAgICAgICAgWydsaW5lYXInXSxcbiAgICAgICAgICAgIFsnaGVhdG1hcC1kZW5zaXR5J10sXG4gICAgICAgICAgICAuLi5oZWF0bWFwRGVuc2l0eSh2aXNDb25maWcuY29sb3JSYW5nZSlcbiAgICAgICAgICBdLFxuICAgICAgICAgICdoZWF0bWFwLXJhZGl1cyc6IFtcbiAgICAgICAgICAgICdpbnRlcnBvbGF0ZScsXG4gICAgICAgICAgICBbJ2xpbmVhciddLFxuICAgICAgICAgICAgWyd6b29tJ10sXG4gICAgICAgICAgICAwLCAyLFxuICAgICAgICAgICAgTUFYX1pPT01fTEVWRUwsIHZpc0NvbmZpZy5yYWRpdXMgLy8gcmFkaXVzXG4gICAgICAgICAgXSxcbiAgICAgICAgICAnaGVhdG1hcC1vcGFjaXR5JzogdmlzQ29uZmlnLm9wYWNpdHlcbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgcmV0dXJuIGxheWVyO1xuICAgIH1cbiAgKTtcblxuICBmb3JtYXRMYXllckRhdGEoXywgYWxsRGF0YSwgZmlsdGVyZWRJbmRleCwgb2xkTGF5ZXJEYXRhLCBvcHQgPSB7fSkge1xuICAgIGNvbnN0IG9wdGlvbnMgPSB7XG4gICAgICBhbGxEYXRhLFxuICAgICAgZmlsdGVyZWRJbmRleCxcbiAgICAgIG9sZExheWVyRGF0YSxcbiAgICAgIG9wdCxcbiAgICAgIGNvbmZpZzogdGhpcy5jb25maWdcbiAgICB9O1xuXG4gICAgY29uc3Qge3dlaWdodEZpZWxkfSA9IHRoaXMuY29uZmlnO1xuICAgIGNvbnN0IGlzU2FtZURhdGEgPSB0aGlzLmlzU2FtZURhdGEob3B0aW9ucywgdGhpcy5jb25maWcpO1xuICAgIGNvbnN0IGlzU2FtZUNvbmZpZyA9IHRoaXMuaXNTYW1lQ29uZmlnKG9wdGlvbnMpO1xuXG4gICAgY29uc3QgZGF0YSA9ICFzaG91bGRSZWJ1aWxkKGlzU2FtZURhdGEsIGlzU2FtZUNvbmZpZykgP1xuICAgICAgbnVsbCA6XG4gICAgICBnZW9qc29uRnJvbVBvaW50cyhcbiAgICAgICAgYWxsRGF0YSxcbiAgICAgICAgZmlsdGVyZWRJbmRleCxcbiAgICAgICAgdGhpcy5jb25maWcuY29sdW1ucyxcbiAgICAgICAgd2VpZ2h0RmllbGQgPyBbd2VpZ2h0RmllbGRdIDogW11cbiAgICAgICk7XG5cbiAgICBjb25zdCBuZXdDb25maWcgPSB0aGlzLmNvbXB1dGVIZWF0bWFwQ29uZmlndXJhdGlvbih0aGlzLmNvbmZpZyk7XG4gICAgbmV3Q29uZmlnLmlkID0gdGhpcy5pZDtcblxuICAgIHJldHVybiB7XG4gICAgICBjb2x1bW5zOiB0aGlzLmNvbmZpZy5jb2x1bW5zLFxuICAgICAgY29uZmlnOiBuZXdDb25maWcsXG4gICAgICBkYXRhLFxuICAgICAgd2VpZ2h0RmllbGRcbiAgICB9O1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEhlYXRtYXBMYXllcjtcbiJdfQ==