'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.featureResolver = exports.featureAccessor = exports.geoJsonRequiredColumns = exports.pointVisConfigs = undefined;

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

var _lodash = require('lodash.memoize');

var _lodash2 = _interopRequireDefault(_lodash);

var _lodash3 = require('lodash.uniq');

var _lodash4 = _interopRequireDefault(_lodash3);

var _baseLayer = require('../base-layer');

var _baseLayer2 = _interopRequireDefault(_baseLayer);

var _deck = require('deck.gl');

var _colorUtils = require('../../utils/color-utils');

var _geojsonUtils = require('./geojson-utils');

var _geojsonLayerIcon = require('./geojson-layer-icon');

var _geojsonLayerIcon2 = _interopRequireDefault(_geojsonLayerIcon);

var _defaultSettings = require('../../constants/default-settings');

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

var pointVisConfigs = exports.pointVisConfigs = {
  opacity: 'opacity',
  thickness: 'thickness',
  colorRange: 'colorRange',
  radius: 'radius',

  sizeRange: 'strokeWidthRange',
  radiusRange: 'radiusRange',
  heightRange: 'elevationRange',
  elevationScale: 'elevationScale',

  'hi-precision': 'hi-precision',
  stroked: 'stroked',
  filled: 'filled',
  enable3d: 'enable3d',
  wireframe: 'wireframe'
};

var geoJsonRequiredColumns = exports.geoJsonRequiredColumns = ['geojson'];
var featureAccessor = exports.featureAccessor = function featureAccessor(_ref) {
  var geojson = _ref.geojson;
  return function (d) {
    return d[geojson.fieldIdx];
  };
};
var featureResolver = exports.featureResolver = function featureResolver(_ref2) {
  var geojson = _ref2.geojson;
  return geojson.fieldIdx;
};

var GeoJsonLayer = function (_Layer) {
  (0, _inherits3.default)(GeoJsonLayer, _Layer);

  function GeoJsonLayer(props) {
    (0, _classCallCheck3.default)(this, GeoJsonLayer);

    var _this = (0, _possibleConstructorReturn3.default)(this, (GeoJsonLayer.__proto__ || Object.getPrototypeOf(GeoJsonLayer)).call(this, props));

    _this.dataToFeature = {};
    _this.registerVisConfig(pointVisConfigs);
    _this.getFeature = (0, _lodash2.default)(featureAccessor, featureResolver);
    return _this;
  }

  (0, _createClass3.default)(GeoJsonLayer, [{
    key: 'getDefaultLayerConfig',
    value: function getDefaultLayerConfig() {
      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      return (0, _extends3.default)({}, (0, _get3.default)(GeoJsonLayer.prototype.__proto__ || Object.getPrototypeOf(GeoJsonLayer.prototype), 'getDefaultLayerConfig', this).call(this, props), {

        // add height visual channel
        heightField: null,
        heightDomain: [0, 1],
        heightScale: 'linear',

        // add radius visual channel
        radiusField: null,
        radiusDomain: [0, 1],
        radiusScale: 'linear'
      });
    }
  }, {
    key: 'getHoverData',
    value: function getHoverData(object, allData) {
      // index of allData is saved to feature.properties
      return allData[object.properties.index];
    }
  }, {
    key: 'formatLayerData',
    value: function formatLayerData(_, allData, filteredIndex, oldLayerData) {
      var _this2 = this;

      var opt = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};
      var _config = this.config,
          colorScale = _config.colorScale,
          colorField = _config.colorField,
          colorDomain = _config.colorDomain,
          color = _config.color,
          sizeScale = _config.sizeScale,
          sizeDomain = _config.sizeDomain,
          sizeField = _config.sizeField,
          heightField = _config.heightField,
          heightDomain = _config.heightDomain,
          heightScale = _config.heightScale,
          radiusField = _config.radiusField,
          radiusDomain = _config.radiusDomain,
          radiusScale = _config.radiusScale,
          visConfig = _config.visConfig,
          columns = _config.columns;
      var enable3d = visConfig.enable3d,
          stroked = visConfig.stroked,
          colorRange = visConfig.colorRange,
          heightRange = visConfig.heightRange,
          sizeRange = visConfig.sizeRange,
          radiusRange = visConfig.radiusRange;


      var getFeature = this.getFeature(columns);

      // geojson feature are object, if doesn't exists
      // create it and save to layer
      if (!oldLayerData || oldLayerData.getFeature !== getFeature) {
        this.updateLayerMeta(allData, getFeature);
      }

      var geojsonData = void 0;

      if (oldLayerData && oldLayerData.data && opt.sameData && oldLayerData.getFeature === getFeature) {
        // no need to create a new array of data
        // use updateTriggers to selectively re-calculate attributes
        geojsonData = oldLayerData.data;
      } else {
        // filteredIndex is a reference of index in allData which can map to feature
        geojsonData = filteredIndex.map(function (i) {
          return _this2.dataToFeature[i];
        }).filter(function (d) {
          return d;
        });
      }

      var cScale = colorField && this.getVisChannelScale(colorScale, colorDomain, colorRange.colors.map(_colorUtils.hexToRgb));

      // calculate stroke scale - if stroked = true
      var sScale = sizeField && stroked && this.getVisChannelScale(sizeScale, sizeDomain, sizeRange);

      // calculate elevation scale - if extruded = true
      var eScale = heightField && enable3d && this.getVisChannelScale(heightScale, heightDomain, heightRange);

      // point radius
      var rScale = radiusField && this.getVisChannelScale(radiusScale, radiusDomain, radiusRange);

      return {
        data: geojsonData,
        getFeature: getFeature,
        getFillColor: function getFillColor(d) {
          return cScale ? _this2.getEncodedChannelValue(cScale, allData[d.properties.index], colorField) : d.properties.fillColor || color;
        },
        getLineColor: function getLineColor(d) {
          return cScale ? _this2.getEncodedChannelValue(cScale, allData[d.properties.index], colorField) : d.properties.lineColor || color;
        },
        getLineWidth: function getLineWidth(d) {
          return sScale ? _this2.getEncodedChannelValue(sScale, allData[d.properties.index], sizeField, 0) : d.properties.lineWidth || 1;
        },
        getElevation: function getElevation(d) {
          return eScale ? _this2.getEncodedChannelValue(eScale, allData[d.properties.index], heightField, 0) : d.properties.elevation || 500;
        },
        getRadius: function getRadius(d) {
          return rScale ? _this2.getEncodedChannelValue(rScale, allData[d.properties.index], radiusField, 0) : d.properties.radius || 1;
        }
      };
    }
  }, {
    key: 'updateLayerMeta',
    value: function updateLayerMeta(allData, getFeature) {
      this.dataToFeature = (0, _geojsonUtils.getGeojsonDataMaps)(allData, getFeature);

      // calculate layer meta
      var allFeatures = Object.values(this.dataToFeature);

      // get bounds from features
      var bounds = (0, _geojsonUtils.getGeojsonBounds)(allFeatures);

      // get lightSettings from points
      var lightSettings = this.getLightSettingsFromBounds(bounds);

      // if any of the feature has properties.hi-precision set to be true
      var fp64 = Boolean(allFeatures.find(function (d) {
        return d && d.properties && d.properties['hi-precision'];
      }));
      var fixedRadius = Boolean(allFeatures.find(function (d) {
        return d && d.properties && d.properties.radius;
      }));

      // keep a record of what type of geometry the collection has
      var featureTypes = allFeatures.reduce(function (accu, f) {
        var geoType = (0, _geojsonUtils.featureToDeckGlGeoType)(f && f.geometry && f.geometry.type);

        if (geoType) {
          accu[geoType] = true;
        }
        return accu;
      }, {});

      this.updateMeta({ bounds: bounds, lightSettings: lightSettings, fp64: fp64, fixedRadius: fixedRadius, featureTypes: featureTypes });
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
      var _meta = this.meta,
          fp64 = _meta.fp64,
          lightSettings = _meta.lightSettings,
          fixedRadius = _meta.fixedRadius;

      var radiusScale = this.getRadiusScaleByZoom(mapState, fixedRadius);
      var zoomFactor = this.getZoomFactor(mapState);

      var layerProps = {
        // multiplier applied just so it being consistent with previously saved maps
        lineWidthScale: this.config.visConfig.thickness * zoomFactor * 8,
        lineWidthMinPixels: 1,
        elevationScale: this.config.visConfig.elevationScale,
        pointRadiusScale: radiusScale,
        fp64: fp64 || this.config.visConfig['hi-precision'],
        lineMiterLimit: 10 * zoomFactor,
        rounded: true
      };

      var updateTriggers = {
        getElevation: {
          heightField: this.config.heightField,
          heightScale: this.config.heightScale,
          heightRange: this.config.visConfig.heightRange
        },
        getFillColor: {
          color: this.config.color,
          colorField: this.config.colorField,
          colorRange: this.config.visConfig.colorRange,
          colorScale: this.config.colorScale
        },
        getLineColor: {
          color: this.config.color,
          colorField: this.config.colorField,
          colorRange: this.config.visConfig.colorRange,
          colorScale: this.config.colorScale
        },
        getLineWidth: {
          sizeField: this.config.sizeField,
          sizeRange: this.config.visConfig.sizeRange
        },
        getRadius: {
          radiusField: this.config.radiusField,
          radiusRange: this.config.visConfig.radiusRange
        }
      };

      return [new _deck.GeoJsonLayer((0, _extends3.default)({}, layerProps, layerInteraction, {
        id: this.id,
        idx: idx,
        data: data.data,
        getFillColor: data.getFillColor,
        getLineColor: data.getLineColor,
        getLineWidth: data.getLineWidth,
        getRadius: data.getRadius,
        getElevation: data.getElevation,
        pickable: true,
        opacity: this.config.visConfig.opacity,
        stroked: this.config.visConfig.stroked,
        filled: this.config.visConfig.filled,
        extruded: this.config.visConfig.enable3d,
        wireframe: this.config.visConfig.wireframe,
        lightSettings: lightSettings,
        updateTriggers: updateTriggers
      }))].concat((0, _toConsumableArray3.default)(this.isLayerHovered(objectHovered) ? [new _deck.GeoJsonLayer((0, _extends3.default)({}, layerProps, {
        id: this.id + '-hovered',
        data: [(0, _extends3.default)({}, objectHovered.object, {
          properties: (0, _extends3.default)({}, objectHovered.object.properties, {
            lineColor: this.config.highlightColor,
            fillColor: this.config.highlightColor
          }),
          getLineWidth: data.getLineWidth,
          getRadius: data.getRadius,
          getElevation: data.getElevation
        })],
        updateTriggers: updateTriggers,
        stroked: true,
        pickable: false,
        filled: false
      }))] : []));
    }
  }, {
    key: 'type',
    get: function get() {
      return 'geojson';
    }
  }, {
    key: 'name',
    get: function get() {
      return 'Polygon';
    }
  }, {
    key: 'layerIcon',
    get: function get() {
      return _geojsonLayerIcon2.default;
    }
  }, {
    key: 'requiredLayerColumns',
    get: function get() {
      return geoJsonRequiredColumns;
    }
  }, {
    key: 'visualChannels',
    get: function get() {
      return (0, _extends3.default)({}, (0, _get3.default)(GeoJsonLayer.prototype.__proto__ || Object.getPrototypeOf(GeoJsonLayer.prototype), 'visualChannels', this), {
        size: (0, _extends3.default)({}, (0, _get3.default)(GeoJsonLayer.prototype.__proto__ || Object.getPrototypeOf(GeoJsonLayer.prototype), 'visualChannels', this).size, {
          property: 'stroke',
          condition: function condition(config) {
            return config.visConfig.stroked;
          }
        }),
        height: {
          property: 'height',
          field: 'heightField',
          scale: 'heightScale',
          domain: 'heightDomain',
          range: 'heightRange',
          key: 'height',
          channelScaleType: 'size',
          condition: function condition(config) {
            return config.visConfig.enable3d;
          }
        },
        radius: {
          property: 'radius',
          field: 'radiusField',
          scale: 'radiusScale',
          domain: 'radiusDomain',
          range: 'radiusRange',
          key: 'radius',
          channelScaleType: 'radius'
        }
      });
    }
  }], [{
    key: 'findDefaultLayerProps',
    value: function findDefaultLayerProps(_ref4) {
      var _this3 = this;

      var label = _ref4.label,
          fields = _ref4.fields;

      var geojsonColumns = fields.filter(function (f) {
        return f.type === 'geojson';
      }).map(function (f) {
        return f.name;
      });

      var defaultColumns = {
        geojson: (0, _lodash4.default)([].concat((0, _toConsumableArray3.default)(_defaultSettings.GEOJSON_FIELDS.geojson), (0, _toConsumableArray3.default)(geojsonColumns)))
      };

      var foundColumns = this.findDefaultColumnField(defaultColumns, fields);
      if (!foundColumns || !foundColumns.length) {
        return [];
      }

      return foundColumns.map(function (columns) {
        return {
          label: typeof label === 'string' && label.replace(/\.[^/.]+$/, '') || _this3.type,
          columns: columns,
          isVisible: true
        };
      });
    }
  }]);
  return GeoJsonLayer;
}(_baseLayer2.default);

exports.default = GeoJsonLayer;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9sYXllcnMvZ2VvanNvbi1sYXllci9nZW9qc29uLWxheWVyLmpzIl0sIm5hbWVzIjpbInBvaW50VmlzQ29uZmlncyIsIm9wYWNpdHkiLCJ0aGlja25lc3MiLCJjb2xvclJhbmdlIiwicmFkaXVzIiwic2l6ZVJhbmdlIiwicmFkaXVzUmFuZ2UiLCJoZWlnaHRSYW5nZSIsImVsZXZhdGlvblNjYWxlIiwic3Ryb2tlZCIsImZpbGxlZCIsImVuYWJsZTNkIiwid2lyZWZyYW1lIiwiZ2VvSnNvblJlcXVpcmVkQ29sdW1ucyIsImZlYXR1cmVBY2Nlc3NvciIsImdlb2pzb24iLCJkIiwiZmllbGRJZHgiLCJmZWF0dXJlUmVzb2x2ZXIiLCJHZW9Kc29uTGF5ZXIiLCJwcm9wcyIsImRhdGFUb0ZlYXR1cmUiLCJyZWdpc3RlclZpc0NvbmZpZyIsImdldEZlYXR1cmUiLCJoZWlnaHRGaWVsZCIsImhlaWdodERvbWFpbiIsImhlaWdodFNjYWxlIiwicmFkaXVzRmllbGQiLCJyYWRpdXNEb21haW4iLCJyYWRpdXNTY2FsZSIsIm9iamVjdCIsImFsbERhdGEiLCJwcm9wZXJ0aWVzIiwiaW5kZXgiLCJfIiwiZmlsdGVyZWRJbmRleCIsIm9sZExheWVyRGF0YSIsIm9wdCIsImNvbmZpZyIsImNvbG9yU2NhbGUiLCJjb2xvckZpZWxkIiwiY29sb3JEb21haW4iLCJjb2xvciIsInNpemVTY2FsZSIsInNpemVEb21haW4iLCJzaXplRmllbGQiLCJ2aXNDb25maWciLCJjb2x1bW5zIiwidXBkYXRlTGF5ZXJNZXRhIiwiZ2VvanNvbkRhdGEiLCJkYXRhIiwic2FtZURhdGEiLCJtYXAiLCJpIiwiZmlsdGVyIiwiY1NjYWxlIiwiZ2V0VmlzQ2hhbm5lbFNjYWxlIiwiY29sb3JzIiwiaGV4VG9SZ2IiLCJzU2NhbGUiLCJlU2NhbGUiLCJyU2NhbGUiLCJnZXRGaWxsQ29sb3IiLCJnZXRFbmNvZGVkQ2hhbm5lbFZhbHVlIiwiZmlsbENvbG9yIiwiZ2V0TGluZUNvbG9yIiwibGluZUNvbG9yIiwiZ2V0TGluZVdpZHRoIiwibGluZVdpZHRoIiwiZ2V0RWxldmF0aW9uIiwiZWxldmF0aW9uIiwiZ2V0UmFkaXVzIiwiYWxsRmVhdHVyZXMiLCJPYmplY3QiLCJ2YWx1ZXMiLCJib3VuZHMiLCJsaWdodFNldHRpbmdzIiwiZ2V0TGlnaHRTZXR0aW5nc0Zyb21Cb3VuZHMiLCJmcDY0IiwiQm9vbGVhbiIsImZpbmQiLCJmaXhlZFJhZGl1cyIsImZlYXR1cmVUeXBlcyIsInJlZHVjZSIsImFjY3UiLCJmIiwiZ2VvVHlwZSIsImdlb21ldHJ5IiwidHlwZSIsInVwZGF0ZU1ldGEiLCJpZHgiLCJsYXllckludGVyYWN0aW9uIiwib2JqZWN0SG92ZXJlZCIsIm1hcFN0YXRlIiwiaW50ZXJhY3Rpb25Db25maWciLCJtZXRhIiwiZ2V0UmFkaXVzU2NhbGVCeVpvb20iLCJ6b29tRmFjdG9yIiwiZ2V0Wm9vbUZhY3RvciIsImxheWVyUHJvcHMiLCJsaW5lV2lkdGhTY2FsZSIsImxpbmVXaWR0aE1pblBpeGVscyIsInBvaW50UmFkaXVzU2NhbGUiLCJsaW5lTWl0ZXJMaW1pdCIsInJvdW5kZWQiLCJ1cGRhdGVUcmlnZ2VycyIsIkRlY2tHTEdlb0pzb25MYXllciIsImlkIiwicGlja2FibGUiLCJleHRydWRlZCIsImlzTGF5ZXJIb3ZlcmVkIiwiaGlnaGxpZ2h0Q29sb3IiLCJHZW9qc29uTGF5ZXJJY29uIiwic2l6ZSIsInByb3BlcnR5IiwiY29uZGl0aW9uIiwiaGVpZ2h0IiwiZmllbGQiLCJzY2FsZSIsImRvbWFpbiIsInJhbmdlIiwia2V5IiwiY2hhbm5lbFNjYWxlVHlwZSIsImxhYmVsIiwiZmllbGRzIiwiZ2VvanNvbkNvbHVtbnMiLCJuYW1lIiwiZGVmYXVsdENvbHVtbnMiLCJHRU9KU09OX0ZJRUxEUyIsImZvdW5kQ29sdW1ucyIsImZpbmREZWZhdWx0Q29sdW1uRmllbGQiLCJsZW5ndGgiLCJyZXBsYWNlIiwiaXNWaXNpYmxlIiwiTGF5ZXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7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RUQsYUFBT0YsYUFBYTdFLEdBQWIsQ0FBaUI7QUFBQSxlQUFZO0FBQ2xDdUUsaUJBQU8sT0FBT0EsS0FBUCxLQUFpQixRQUFqQixJQUE2QkEsTUFBTVMsT0FBTixDQUFjLFdBQWQsRUFBMkIsRUFBM0IsQ0FBN0IsSUFBK0QsT0FBSzVDLElBRHpDO0FBRWxDekMsMEJBRmtDO0FBR2xDc0YscUJBQVc7QUFIdUIsU0FBWjtBQUFBLE9BQWpCLENBQVA7QUFLRDs7O0VBMUV1Q0MsbUI7O2tCQUFyQm5ILFkiLCJmaWxlIjoiZ2VvanNvbi1sYXllci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgMjAxOCBVYmVyIFRlY2hub2xvZ2llcywgSW5jLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbi8vIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbi8vIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbi8vIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbi8vIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuLy8gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuLy8gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4vLyBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbi8vIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbi8vIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4vLyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4vLyBUSEUgU09GVFdBUkUuXG5cbmltcG9ydCBtZW1vaXplIGZyb20gJ2xvZGFzaC5tZW1vaXplJztcbmltcG9ydCB1bmlxIGZyb20gJ2xvZGFzaC51bmlxJztcblxuaW1wb3J0IExheWVyIGZyb20gJy4uL2Jhc2UtbGF5ZXInO1xuaW1wb3J0IHtHZW9Kc29uTGF5ZXIgYXMgRGVja0dMR2VvSnNvbkxheWVyfSBmcm9tICdkZWNrLmdsJztcbmltcG9ydCB7aGV4VG9SZ2J9IGZyb20gJ3V0aWxzL2NvbG9yLXV0aWxzJztcbmltcG9ydCB7XG4gIGdldEdlb2pzb25EYXRhTWFwcyxcbiAgZ2V0R2VvanNvbkJvdW5kcyxcbiAgZmVhdHVyZVRvRGVja0dsR2VvVHlwZVxufSBmcm9tICcuL2dlb2pzb24tdXRpbHMnO1xuaW1wb3J0IEdlb2pzb25MYXllckljb24gZnJvbSAnLi9nZW9qc29uLWxheWVyLWljb24nO1xuaW1wb3J0IHtHRU9KU09OX0ZJRUxEU30gZnJvbSAnY29uc3RhbnRzL2RlZmF1bHQtc2V0dGluZ3MnO1xuXG5leHBvcnQgY29uc3QgcG9pbnRWaXNDb25maWdzID0ge1xuICBvcGFjaXR5OiAnb3BhY2l0eScsXG4gIHRoaWNrbmVzczogJ3RoaWNrbmVzcycsXG4gIGNvbG9yUmFuZ2U6ICdjb2xvclJhbmdlJyxcbiAgcmFkaXVzOiAncmFkaXVzJyxcblxuICBzaXplUmFuZ2U6ICdzdHJva2VXaWR0aFJhbmdlJyxcbiAgcmFkaXVzUmFuZ2U6ICdyYWRpdXNSYW5nZScsXG4gIGhlaWdodFJhbmdlOiAnZWxldmF0aW9uUmFuZ2UnLFxuICBlbGV2YXRpb25TY2FsZTogJ2VsZXZhdGlvblNjYWxlJyxcblxuICAnaGktcHJlY2lzaW9uJzogJ2hpLXByZWNpc2lvbicsXG4gIHN0cm9rZWQ6ICdzdHJva2VkJyxcbiAgZmlsbGVkOiAnZmlsbGVkJyxcbiAgZW5hYmxlM2Q6ICdlbmFibGUzZCcsXG4gIHdpcmVmcmFtZTogJ3dpcmVmcmFtZSdcbn07XG5cbmV4cG9ydCBjb25zdCBnZW9Kc29uUmVxdWlyZWRDb2x1bW5zID0gWydnZW9qc29uJ107XG5leHBvcnQgY29uc3QgZmVhdHVyZUFjY2Vzc29yID0gKHtnZW9qc29ufSkgPT4gZCA9PiBkW2dlb2pzb24uZmllbGRJZHhdO1xuZXhwb3J0IGNvbnN0IGZlYXR1cmVSZXNvbHZlciA9ICh7Z2VvanNvbn0pID0+IGdlb2pzb24uZmllbGRJZHg7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdlb0pzb25MYXllciBleHRlbmRzIExheWVyIHtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG5cbiAgICB0aGlzLmRhdGFUb0ZlYXR1cmUgPSB7fTtcbiAgICB0aGlzLnJlZ2lzdGVyVmlzQ29uZmlnKHBvaW50VmlzQ29uZmlncyk7XG4gICAgdGhpcy5nZXRGZWF0dXJlID0gbWVtb2l6ZShmZWF0dXJlQWNjZXNzb3IsIGZlYXR1cmVSZXNvbHZlcik7XG4gIH1cblxuICBnZXQgdHlwZSgpIHtcbiAgICByZXR1cm4gJ2dlb2pzb24nO1xuICB9XG5cbiAgZ2V0IG5hbWUoKSB7XG4gICAgcmV0dXJuICdQb2x5Z29uJztcbiAgfVxuXG4gIGdldCBsYXllckljb24oKSB7XG4gICAgcmV0dXJuIEdlb2pzb25MYXllckljb247XG4gIH1cblxuICBnZXQgcmVxdWlyZWRMYXllckNvbHVtbnMoKSB7XG4gICAgcmV0dXJuIGdlb0pzb25SZXF1aXJlZENvbHVtbnM7XG4gIH1cblxuICBnZXQgdmlzdWFsQ2hhbm5lbHMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIC4uLnN1cGVyLnZpc3VhbENoYW5uZWxzLFxuICAgICAgc2l6ZToge1xuICAgICAgICAuLi5zdXBlci52aXN1YWxDaGFubmVscy5zaXplLFxuICAgICAgICBwcm9wZXJ0eTogJ3N0cm9rZScsXG4gICAgICAgIGNvbmRpdGlvbjogY29uZmlnID0+IGNvbmZpZy52aXNDb25maWcuc3Ryb2tlZFxuICAgICAgfSxcbiAgICAgIGhlaWdodDoge1xuICAgICAgICBwcm9wZXJ0eTogJ2hlaWdodCcsXG4gICAgICAgIGZpZWxkOiAnaGVpZ2h0RmllbGQnLFxuICAgICAgICBzY2FsZTogJ2hlaWdodFNjYWxlJyxcbiAgICAgICAgZG9tYWluOiAnaGVpZ2h0RG9tYWluJyxcbiAgICAgICAgcmFuZ2U6ICdoZWlnaHRSYW5nZScsXG4gICAgICAgIGtleTogJ2hlaWdodCcsXG4gICAgICAgIGNoYW5uZWxTY2FsZVR5cGU6ICdzaXplJyxcbiAgICAgICAgY29uZGl0aW9uOiBjb25maWcgPT4gY29uZmlnLnZpc0NvbmZpZy5lbmFibGUzZFxuICAgICAgfSxcbiAgICAgIHJhZGl1czoge1xuICAgICAgICBwcm9wZXJ0eTogJ3JhZGl1cycsXG4gICAgICAgIGZpZWxkOiAncmFkaXVzRmllbGQnLFxuICAgICAgICBzY2FsZTogJ3JhZGl1c1NjYWxlJyxcbiAgICAgICAgZG9tYWluOiAncmFkaXVzRG9tYWluJyxcbiAgICAgICAgcmFuZ2U6ICdyYWRpdXNSYW5nZScsXG4gICAgICAgIGtleTogJ3JhZGl1cycsXG4gICAgICAgIGNoYW5uZWxTY2FsZVR5cGU6ICdyYWRpdXMnXG4gICAgICB9XG4gICAgfTtcbiAgfVxuXG4gIHN0YXRpYyBmaW5kRGVmYXVsdExheWVyUHJvcHMoe2xhYmVsLCBmaWVsZHN9KSB7XG4gICAgY29uc3QgZ2VvanNvbkNvbHVtbnMgPSBmaWVsZHNcbiAgICAgIC5maWx0ZXIoZiA9PiBmLnR5cGUgPT09ICdnZW9qc29uJylcbiAgICAgIC5tYXAoZiA9PiBmLm5hbWUpO1xuXG4gICAgY29uc3QgZGVmYXVsdENvbHVtbnMgPSB7XG4gICAgICBnZW9qc29uOiB1bmlxKFsuLi5HRU9KU09OX0ZJRUxEUy5nZW9qc29uLCAuLi5nZW9qc29uQ29sdW1uc10pXG4gICAgfTtcblxuICAgIGNvbnN0IGZvdW5kQ29sdW1ucyA9IHRoaXMuZmluZERlZmF1bHRDb2x1bW5GaWVsZChkZWZhdWx0Q29sdW1ucywgZmllbGRzKTtcbiAgICBpZiAoIWZvdW5kQ29sdW1ucyB8fCAhZm91bmRDb2x1bW5zLmxlbmd0aCkge1xuICAgICAgcmV0dXJuIFtdO1xuICAgIH1cblxuICAgIHJldHVybiBmb3VuZENvbHVtbnMubWFwKGNvbHVtbnMgPT4gKHtcbiAgICAgIGxhYmVsOiB0eXBlb2YgbGFiZWwgPT09ICdzdHJpbmcnICYmIGxhYmVsLnJlcGxhY2UoL1xcLlteLy5dKyQvLCAnJykgfHwgdGhpcy50eXBlLFxuICAgICAgY29sdW1ucyxcbiAgICAgIGlzVmlzaWJsZTogdHJ1ZVxuICAgIH0pKTtcbiAgfVxuXG4gIGdldERlZmF1bHRMYXllckNvbmZpZyhwcm9wcyA9IHt9KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIC4uLnN1cGVyLmdldERlZmF1bHRMYXllckNvbmZpZyhwcm9wcyksXG5cbiAgICAgIC8vIGFkZCBoZWlnaHQgdmlzdWFsIGNoYW5uZWxcbiAgICAgIGhlaWdodEZpZWxkOiBudWxsLFxuICAgICAgaGVpZ2h0RG9tYWluOiBbMCwgMV0sXG4gICAgICBoZWlnaHRTY2FsZTogJ2xpbmVhcicsXG5cbiAgICAgIC8vIGFkZCByYWRpdXMgdmlzdWFsIGNoYW5uZWxcbiAgICAgIHJhZGl1c0ZpZWxkOiBudWxsLFxuICAgICAgcmFkaXVzRG9tYWluOiBbMCwgMV0sXG4gICAgICByYWRpdXNTY2FsZTogJ2xpbmVhcidcbiAgICB9O1xuICB9XG5cbiAgZ2V0SG92ZXJEYXRhKG9iamVjdCwgYWxsRGF0YSkge1xuICAgIC8vIGluZGV4IG9mIGFsbERhdGEgaXMgc2F2ZWQgdG8gZmVhdHVyZS5wcm9wZXJ0aWVzXG4gICAgcmV0dXJuIGFsbERhdGFbb2JqZWN0LnByb3BlcnRpZXMuaW5kZXhdO1xuICB9XG5cbiAgZm9ybWF0TGF5ZXJEYXRhKF8sIGFsbERhdGEsIGZpbHRlcmVkSW5kZXgsIG9sZExheWVyRGF0YSwgb3B0ID0ge30pIHtcbiAgICBjb25zdCB7XG4gICAgICBjb2xvclNjYWxlLFxuICAgICAgY29sb3JGaWVsZCxcbiAgICAgIGNvbG9yRG9tYWluLFxuICAgICAgY29sb3IsXG4gICAgICBzaXplU2NhbGUsXG4gICAgICBzaXplRG9tYWluLFxuICAgICAgc2l6ZUZpZWxkLFxuICAgICAgaGVpZ2h0RmllbGQsXG4gICAgICBoZWlnaHREb21haW4sXG4gICAgICBoZWlnaHRTY2FsZSxcbiAgICAgIHJhZGl1c0ZpZWxkLFxuICAgICAgcmFkaXVzRG9tYWluLFxuICAgICAgcmFkaXVzU2NhbGUsXG4gICAgICB2aXNDb25maWcsXG4gICAgICBjb2x1bW5zXG4gICAgfSA9IHRoaXMuY29uZmlnO1xuXG4gICAgY29uc3Qge1xuICAgICAgZW5hYmxlM2QsXG4gICAgICBzdHJva2VkLFxuICAgICAgY29sb3JSYW5nZSxcbiAgICAgIGhlaWdodFJhbmdlLFxuICAgICAgc2l6ZVJhbmdlLFxuICAgICAgcmFkaXVzUmFuZ2VcbiAgICB9ID0gdmlzQ29uZmlnO1xuXG4gICAgY29uc3QgZ2V0RmVhdHVyZSA9IHRoaXMuZ2V0RmVhdHVyZShjb2x1bW5zKTtcblxuICAgIC8vIGdlb2pzb24gZmVhdHVyZSBhcmUgb2JqZWN0LCBpZiBkb2Vzbid0IGV4aXN0c1xuICAgIC8vIGNyZWF0ZSBpdCBhbmQgc2F2ZSB0byBsYXllclxuICAgIGlmICghb2xkTGF5ZXJEYXRhIHx8IG9sZExheWVyRGF0YS5nZXRGZWF0dXJlICE9PSBnZXRGZWF0dXJlKSB7XG4gICAgICB0aGlzLnVwZGF0ZUxheWVyTWV0YShhbGxEYXRhLCBnZXRGZWF0dXJlKTtcbiAgICB9XG5cbiAgICBsZXQgZ2VvanNvbkRhdGE7XG5cbiAgICBpZiAoXG4gICAgICBvbGRMYXllckRhdGEgJiZcbiAgICAgIG9sZExheWVyRGF0YS5kYXRhICYmXG4gICAgICBvcHQuc2FtZURhdGEgJiZcbiAgICAgIG9sZExheWVyRGF0YS5nZXRGZWF0dXJlID09PSBnZXRGZWF0dXJlXG4gICAgKSB7XG4gICAgICAvLyBubyBuZWVkIHRvIGNyZWF0ZSBhIG5ldyBhcnJheSBvZiBkYXRhXG4gICAgICAvLyB1c2UgdXBkYXRlVHJpZ2dlcnMgdG8gc2VsZWN0aXZlbHkgcmUtY2FsY3VsYXRlIGF0dHJpYnV0ZXNcbiAgICAgIGdlb2pzb25EYXRhID0gb2xkTGF5ZXJEYXRhLmRhdGE7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIGZpbHRlcmVkSW5kZXggaXMgYSByZWZlcmVuY2Ugb2YgaW5kZXggaW4gYWxsRGF0YSB3aGljaCBjYW4gbWFwIHRvIGZlYXR1cmVcbiAgICAgIGdlb2pzb25EYXRhID0gZmlsdGVyZWRJbmRleFxuICAgICAgICAubWFwKGkgPT4gdGhpcy5kYXRhVG9GZWF0dXJlW2ldKVxuICAgICAgICAuZmlsdGVyKGQgPT4gZCk7XG4gICAgfVxuXG4gICAgY29uc3QgY1NjYWxlID1cbiAgICAgIGNvbG9yRmllbGQgJiZcbiAgICAgIHRoaXMuZ2V0VmlzQ2hhbm5lbFNjYWxlKFxuICAgICAgICBjb2xvclNjYWxlLFxuICAgICAgICBjb2xvckRvbWFpbixcbiAgICAgICAgY29sb3JSYW5nZS5jb2xvcnMubWFwKGhleFRvUmdiKVxuICAgICAgKTtcblxuICAgIC8vIGNhbGN1bGF0ZSBzdHJva2Ugc2NhbGUgLSBpZiBzdHJva2VkID0gdHJ1ZVxuICAgIGNvbnN0IHNTY2FsZSA9XG4gICAgICBzaXplRmllbGQgJiZcbiAgICAgIHN0cm9rZWQgJiZcbiAgICAgIHRoaXMuZ2V0VmlzQ2hhbm5lbFNjYWxlKHNpemVTY2FsZSwgc2l6ZURvbWFpbiwgc2l6ZVJhbmdlKTtcblxuICAgIC8vIGNhbGN1bGF0ZSBlbGV2YXRpb24gc2NhbGUgLSBpZiBleHRydWRlZCA9IHRydWVcbiAgICBjb25zdCBlU2NhbGUgPVxuICAgICAgaGVpZ2h0RmllbGQgJiZcbiAgICAgIGVuYWJsZTNkICYmXG4gICAgICB0aGlzLmdldFZpc0NoYW5uZWxTY2FsZShoZWlnaHRTY2FsZSwgaGVpZ2h0RG9tYWluLCBoZWlnaHRSYW5nZSk7XG5cbiAgICAvLyBwb2ludCByYWRpdXNcbiAgICBjb25zdCByU2NhbGUgPVxuICAgICAgcmFkaXVzRmllbGQgJiZcbiAgICAgIHRoaXMuZ2V0VmlzQ2hhbm5lbFNjYWxlKHJhZGl1c1NjYWxlLCByYWRpdXNEb21haW4sIHJhZGl1c1JhbmdlKTtcblxuICAgIHJldHVybiB7XG4gICAgICBkYXRhOiBnZW9qc29uRGF0YSxcbiAgICAgIGdldEZlYXR1cmUsXG4gICAgICBnZXRGaWxsQ29sb3I6IGQgPT5cbiAgICAgICAgY1NjYWxlXG4gICAgICAgICAgPyB0aGlzLmdldEVuY29kZWRDaGFubmVsVmFsdWUoXG4gICAgICAgICAgICAgIGNTY2FsZSxcbiAgICAgICAgICAgICAgYWxsRGF0YVtkLnByb3BlcnRpZXMuaW5kZXhdLFxuICAgICAgICAgICAgICBjb2xvckZpZWxkXG4gICAgICAgICAgICApXG4gICAgICAgICAgOiBkLnByb3BlcnRpZXMuZmlsbENvbG9yIHx8IGNvbG9yLFxuICAgICAgZ2V0TGluZUNvbG9yOiBkID0+XG4gICAgICAgIGNTY2FsZVxuICAgICAgICAgID8gdGhpcy5nZXRFbmNvZGVkQ2hhbm5lbFZhbHVlKFxuICAgICAgICAgICAgICBjU2NhbGUsXG4gICAgICAgICAgICAgIGFsbERhdGFbZC5wcm9wZXJ0aWVzLmluZGV4XSxcbiAgICAgICAgICAgICAgY29sb3JGaWVsZFxuICAgICAgICAgICAgKVxuICAgICAgICAgIDogZC5wcm9wZXJ0aWVzLmxpbmVDb2xvciB8fCBjb2xvcixcbiAgICAgIGdldExpbmVXaWR0aDogZCA9PlxuICAgICAgICBzU2NhbGVcbiAgICAgICAgICA/IHRoaXMuZ2V0RW5jb2RlZENoYW5uZWxWYWx1ZShcbiAgICAgICAgICAgICAgc1NjYWxlLFxuICAgICAgICAgICAgICBhbGxEYXRhW2QucHJvcGVydGllcy5pbmRleF0sXG4gICAgICAgICAgICAgIHNpemVGaWVsZCxcbiAgICAgICAgICAgICAgMFxuICAgICAgICAgICAgKVxuICAgICAgICAgIDogZC5wcm9wZXJ0aWVzLmxpbmVXaWR0aCB8fCAxLFxuICAgICAgZ2V0RWxldmF0aW9uOiBkID0+XG4gICAgICAgIGVTY2FsZVxuICAgICAgICAgID8gdGhpcy5nZXRFbmNvZGVkQ2hhbm5lbFZhbHVlKFxuICAgICAgICAgICAgICBlU2NhbGUsXG4gICAgICAgICAgICAgIGFsbERhdGFbZC5wcm9wZXJ0aWVzLmluZGV4XSxcbiAgICAgICAgICAgICAgaGVpZ2h0RmllbGQsXG4gICAgICAgICAgICAgIDBcbiAgICAgICAgICAgIClcbiAgICAgICAgICA6IGQucHJvcGVydGllcy5lbGV2YXRpb24gfHwgNTAwLFxuICAgICAgZ2V0UmFkaXVzOiBkID0+XG4gICAgICAgIHJTY2FsZVxuICAgICAgICAgID8gdGhpcy5nZXRFbmNvZGVkQ2hhbm5lbFZhbHVlKFxuICAgICAgICAgICAgICByU2NhbGUsXG4gICAgICAgICAgICAgIGFsbERhdGFbZC5wcm9wZXJ0aWVzLmluZGV4XSxcbiAgICAgICAgICAgICAgcmFkaXVzRmllbGQsXG4gICAgICAgICAgICAgIDBcbiAgICAgICAgICAgIClcbiAgICAgICAgICA6IGQucHJvcGVydGllcy5yYWRpdXMgfHwgMVxuICAgIH07XG4gIH1cblxuICB1cGRhdGVMYXllck1ldGEoYWxsRGF0YSwgZ2V0RmVhdHVyZSkge1xuICAgIHRoaXMuZGF0YVRvRmVhdHVyZSA9IGdldEdlb2pzb25EYXRhTWFwcyhhbGxEYXRhLCBnZXRGZWF0dXJlKTtcblxuICAgIC8vIGNhbGN1bGF0ZSBsYXllciBtZXRhXG4gICAgY29uc3QgYWxsRmVhdHVyZXMgPSBPYmplY3QudmFsdWVzKHRoaXMuZGF0YVRvRmVhdHVyZSk7XG5cbiAgICAvLyBnZXQgYm91bmRzIGZyb20gZmVhdHVyZXNcbiAgICBjb25zdCBib3VuZHMgPSBnZXRHZW9qc29uQm91bmRzKGFsbEZlYXR1cmVzKTtcblxuICAgIC8vIGdldCBsaWdodFNldHRpbmdzIGZyb20gcG9pbnRzXG4gICAgY29uc3QgbGlnaHRTZXR0aW5ncyA9IHRoaXMuZ2V0TGlnaHRTZXR0aW5nc0Zyb21Cb3VuZHMoYm91bmRzKTtcblxuICAgIC8vIGlmIGFueSBvZiB0aGUgZmVhdHVyZSBoYXMgcHJvcGVydGllcy5oaS1wcmVjaXNpb24gc2V0IHRvIGJlIHRydWVcbiAgICBjb25zdCBmcDY0ID0gQm9vbGVhbihcbiAgICAgIGFsbEZlYXR1cmVzLmZpbmQoZCA9PiBkICYmIGQucHJvcGVydGllcyAmJiBkLnByb3BlcnRpZXNbJ2hpLXByZWNpc2lvbiddKVxuICAgICk7XG4gICAgY29uc3QgZml4ZWRSYWRpdXMgPSBCb29sZWFuKFxuICAgICAgYWxsRmVhdHVyZXMuZmluZChkID0+IGQgJiYgZC5wcm9wZXJ0aWVzICYmIGQucHJvcGVydGllcy5yYWRpdXMpXG4gICAgKTtcblxuICAgIC8vIGtlZXAgYSByZWNvcmQgb2Ygd2hhdCB0eXBlIG9mIGdlb21ldHJ5IHRoZSBjb2xsZWN0aW9uIGhhc1xuICAgIGNvbnN0IGZlYXR1cmVUeXBlcyA9IGFsbEZlYXR1cmVzLnJlZHVjZSgoYWNjdSwgZikgPT4ge1xuICAgICAgY29uc3QgZ2VvVHlwZSA9IGZlYXR1cmVUb0RlY2tHbEdlb1R5cGUoXG4gICAgICAgIGYgJiYgZi5nZW9tZXRyeSAmJiBmLmdlb21ldHJ5LnR5cGVcbiAgICAgICk7XG5cbiAgICAgIGlmIChnZW9UeXBlKSB7XG4gICAgICAgIGFjY3VbZ2VvVHlwZV0gPSB0cnVlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGFjY3U7XG4gICAgfSwge30pO1xuXG4gICAgdGhpcy51cGRhdGVNZXRhKHtib3VuZHMsIGxpZ2h0U2V0dGluZ3MsIGZwNjQsIGZpeGVkUmFkaXVzLCBmZWF0dXJlVHlwZXN9KTtcbiAgfVxuXG4gIHJlbmRlckxheWVyKHtcbiAgICBkYXRhLFxuICAgIGlkeCxcbiAgICBsYXllckludGVyYWN0aW9uLFxuICAgIG9iamVjdEhvdmVyZWQsXG4gICAgbWFwU3RhdGUsXG4gICAgaW50ZXJhY3Rpb25Db25maWdcbiAgfSkge1xuICAgIGNvbnN0IHtmcDY0LCBsaWdodFNldHRpbmdzLCBmaXhlZFJhZGl1c30gPSB0aGlzLm1ldGE7XG4gICAgY29uc3QgcmFkaXVzU2NhbGUgPSB0aGlzLmdldFJhZGl1c1NjYWxlQnlab29tKG1hcFN0YXRlLCBmaXhlZFJhZGl1cyk7XG4gICAgY29uc3Qgem9vbUZhY3RvciA9IHRoaXMuZ2V0Wm9vbUZhY3RvcihtYXBTdGF0ZSk7XG5cbiAgICBjb25zdCBsYXllclByb3BzID0ge1xuICAgICAgLy8gbXVsdGlwbGllciBhcHBsaWVkIGp1c3Qgc28gaXQgYmVpbmcgY29uc2lzdGVudCB3aXRoIHByZXZpb3VzbHkgc2F2ZWQgbWFwc1xuICAgICAgbGluZVdpZHRoU2NhbGU6IHRoaXMuY29uZmlnLnZpc0NvbmZpZy50aGlja25lc3MgKiB6b29tRmFjdG9yICogOCxcbiAgICAgIGxpbmVXaWR0aE1pblBpeGVsczogMSxcbiAgICAgIGVsZXZhdGlvblNjYWxlOiB0aGlzLmNvbmZpZy52aXNDb25maWcuZWxldmF0aW9uU2NhbGUsXG4gICAgICBwb2ludFJhZGl1c1NjYWxlOiByYWRpdXNTY2FsZSxcbiAgICAgIGZwNjQ6IGZwNjQgfHwgdGhpcy5jb25maWcudmlzQ29uZmlnWydoaS1wcmVjaXNpb24nXSxcbiAgICAgIGxpbmVNaXRlckxpbWl0OiAxMCAqIHpvb21GYWN0b3IsXG4gICAgICByb3VuZGVkOiB0cnVlXG4gICAgfTtcblxuICAgIGNvbnN0IHVwZGF0ZVRyaWdnZXJzID0ge1xuICAgICAgZ2V0RWxldmF0aW9uOiB7XG4gICAgICAgIGhlaWdodEZpZWxkOiB0aGlzLmNvbmZpZy5oZWlnaHRGaWVsZCxcbiAgICAgICAgaGVpZ2h0U2NhbGU6IHRoaXMuY29uZmlnLmhlaWdodFNjYWxlLFxuICAgICAgICBoZWlnaHRSYW5nZTogdGhpcy5jb25maWcudmlzQ29uZmlnLmhlaWdodFJhbmdlXG4gICAgICB9LFxuICAgICAgZ2V0RmlsbENvbG9yOiB7XG4gICAgICAgIGNvbG9yOiB0aGlzLmNvbmZpZy5jb2xvcixcbiAgICAgICAgY29sb3JGaWVsZDogdGhpcy5jb25maWcuY29sb3JGaWVsZCxcbiAgICAgICAgY29sb3JSYW5nZTogdGhpcy5jb25maWcudmlzQ29uZmlnLmNvbG9yUmFuZ2UsXG4gICAgICAgIGNvbG9yU2NhbGU6IHRoaXMuY29uZmlnLmNvbG9yU2NhbGVcbiAgICAgIH0sXG4gICAgICBnZXRMaW5lQ29sb3I6IHtcbiAgICAgICAgY29sb3I6IHRoaXMuY29uZmlnLmNvbG9yLFxuICAgICAgICBjb2xvckZpZWxkOiB0aGlzLmNvbmZpZy5jb2xvckZpZWxkLFxuICAgICAgICBjb2xvclJhbmdlOiB0aGlzLmNvbmZpZy52aXNDb25maWcuY29sb3JSYW5nZSxcbiAgICAgICAgY29sb3JTY2FsZTogdGhpcy5jb25maWcuY29sb3JTY2FsZVxuICAgICAgfSxcbiAgICAgIGdldExpbmVXaWR0aDoge1xuICAgICAgICBzaXplRmllbGQ6IHRoaXMuY29uZmlnLnNpemVGaWVsZCxcbiAgICAgICAgc2l6ZVJhbmdlOiB0aGlzLmNvbmZpZy52aXNDb25maWcuc2l6ZVJhbmdlXG4gICAgICB9LFxuICAgICAgZ2V0UmFkaXVzOiB7XG4gICAgICAgIHJhZGl1c0ZpZWxkOiB0aGlzLmNvbmZpZy5yYWRpdXNGaWVsZCxcbiAgICAgICAgcmFkaXVzUmFuZ2U6IHRoaXMuY29uZmlnLnZpc0NvbmZpZy5yYWRpdXNSYW5nZVxuICAgICAgfVxuICAgIH07XG5cbiAgICByZXR1cm4gW1xuICAgICAgbmV3IERlY2tHTEdlb0pzb25MYXllcih7XG4gICAgICAgIC4uLmxheWVyUHJvcHMsXG4gICAgICAgIC4uLmxheWVySW50ZXJhY3Rpb24sXG4gICAgICAgIGlkOiB0aGlzLmlkLFxuICAgICAgICBpZHgsXG4gICAgICAgIGRhdGE6IGRhdGEuZGF0YSxcbiAgICAgICAgZ2V0RmlsbENvbG9yOiBkYXRhLmdldEZpbGxDb2xvcixcbiAgICAgICAgZ2V0TGluZUNvbG9yOiBkYXRhLmdldExpbmVDb2xvcixcbiAgICAgICAgZ2V0TGluZVdpZHRoOiBkYXRhLmdldExpbmVXaWR0aCxcbiAgICAgICAgZ2V0UmFkaXVzOiBkYXRhLmdldFJhZGl1cyxcbiAgICAgICAgZ2V0RWxldmF0aW9uOiBkYXRhLmdldEVsZXZhdGlvbixcbiAgICAgICAgcGlja2FibGU6IHRydWUsXG4gICAgICAgIG9wYWNpdHk6IHRoaXMuY29uZmlnLnZpc0NvbmZpZy5vcGFjaXR5LFxuICAgICAgICBzdHJva2VkOiB0aGlzLmNvbmZpZy52aXNDb25maWcuc3Ryb2tlZCxcbiAgICAgICAgZmlsbGVkOiB0aGlzLmNvbmZpZy52aXNDb25maWcuZmlsbGVkLFxuICAgICAgICBleHRydWRlZDogdGhpcy5jb25maWcudmlzQ29uZmlnLmVuYWJsZTNkLFxuICAgICAgICB3aXJlZnJhbWU6IHRoaXMuY29uZmlnLnZpc0NvbmZpZy53aXJlZnJhbWUsXG4gICAgICAgIGxpZ2h0U2V0dGluZ3MsXG4gICAgICAgIHVwZGF0ZVRyaWdnZXJzXG4gICAgICB9KSxcbiAgICAgIC4uLih0aGlzLmlzTGF5ZXJIb3ZlcmVkKG9iamVjdEhvdmVyZWQpXG4gICAgICAgID8gW1xuICAgICAgICAgICAgbmV3IERlY2tHTEdlb0pzb25MYXllcih7XG4gICAgICAgICAgICAgIC4uLmxheWVyUHJvcHMsXG4gICAgICAgICAgICAgIGlkOiBgJHt0aGlzLmlkfS1ob3ZlcmVkYCxcbiAgICAgICAgICAgICAgZGF0YTogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIC4uLm9iamVjdEhvdmVyZWQub2JqZWN0LFxuICAgICAgICAgICAgICAgICAgcHJvcGVydGllczoge1xuICAgICAgICAgICAgICAgICAgICAuLi5vYmplY3RIb3ZlcmVkLm9iamVjdC5wcm9wZXJ0aWVzLFxuICAgICAgICAgICAgICAgICAgICBsaW5lQ29sb3I6IHRoaXMuY29uZmlnLmhpZ2hsaWdodENvbG9yLFxuICAgICAgICAgICAgICAgICAgICBmaWxsQ29sb3I6IHRoaXMuY29uZmlnLmhpZ2hsaWdodENvbG9yXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgZ2V0TGluZVdpZHRoOiBkYXRhLmdldExpbmVXaWR0aCxcbiAgICAgICAgICAgICAgICAgIGdldFJhZGl1czogZGF0YS5nZXRSYWRpdXMsXG4gICAgICAgICAgICAgICAgICBnZXRFbGV2YXRpb246IGRhdGEuZ2V0RWxldmF0aW9uXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICB1cGRhdGVUcmlnZ2VycyxcbiAgICAgICAgICAgICAgc3Ryb2tlZDogdHJ1ZSxcbiAgICAgICAgICAgICAgcGlja2FibGU6IGZhbHNlLFxuICAgICAgICAgICAgICBmaWxsZWQ6IGZhbHNlXG4gICAgICAgICAgICB9KVxuICAgICAgICAgIF1cbiAgICAgICAgOiBbXSlcbiAgICBdO1xuICB9XG59XG4iXX0=