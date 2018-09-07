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

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _deck = require('deck.gl');

var _geoViewport = require('@mapbox/geo-viewport');

var _geoViewport2 = _interopRequireDefault(_geoViewport);

var _d3Array = require('d3-array');

var _dataScaleUtils = require('../../utils/data-scale-utils');

var _utils = require('../layer-utils/utils');

var _colorRanges = require('../../constants/color-ranges');

var _layerFactory = require('../../layers/layer-factory');

var _defaultSettings = require('../../constants/default-settings');

var _clusterUtils = require('../layer-utils/cluster-utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultRadius = _layerFactory.LAYER_VIS_CONFIGS.clusterRadius.defaultValue; // Copyright (c) 2018 Uber Technologies, Inc.
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

var defaultRadiusRange = _layerFactory.LAYER_VIS_CONFIGS.clusterRadiusRange.defaultValue;

var defaultProps = {
  clusterRadius: defaultRadius,
  colorDomain: null,
  colorRange: _colorRanges.DefaultColorRange,
  colorScale: _defaultSettings.SCALE_TYPES.quantize,
  radiusRange: defaultRadiusRange,

  // maybe later...
  lowerPercentile: 0,
  upperPercentile: 100,

  getPosition: function getPosition(x) {
    return x.position;
  },

  // if want to have color based on customized aggregator, instead of count
  getColorValue: function getColorValue(points) {
    return points.length;
  },

  //  if want to have radius based on customized aggregator, instead of count
  getRadiusValue: function getRadiusValue(cell) {
    return cell.properties.point_count;
  },
  fp64: false
};

var ClusterLayer = function (_CompositeLayer) {
  (0, _inherits3.default)(ClusterLayer, _CompositeLayer);

  function ClusterLayer() {
    (0, _classCallCheck3.default)(this, ClusterLayer);
    return (0, _possibleConstructorReturn3.default)(this, (ClusterLayer.__proto__ || Object.getPrototypeOf(ClusterLayer)).apply(this, arguments));
  }

  (0, _createClass3.default)(ClusterLayer, [{
    key: 'initializeState',
    value: function initializeState() {
      this.state = {
        clusters: null,
        geoJSON: null
      };
    }
  }, {
    key: 'shouldUpdateState',
    value: function shouldUpdateState(_ref) {
      var changeFlags = _ref.changeFlags;

      return changeFlags.somethingChanged;
    }
  }, {
    key: 'updateState',
    value: function updateState(_ref2) {
      var oldContext = _ref2.oldContext,
          context = _ref2.context,
          oldProps = _ref2.oldProps,
          props = _ref2.props,
          changeFlags = _ref2.changeFlags;

      if (changeFlags.dataChanged || this.needsReProjectPoints(oldProps, props)) {
        // project data into clusters, and get clustered data
        this.processGeoJSON();
        this.getClusters();

        // this needs clustered data to be set
        this.getColorValueDomain();
      } else if (this.needsReclusterPoints(oldContext, context)) {
        this.getClusters();
        this.getColorValueDomain();
      } else if (this.needsRecalculateScaleFunction(oldProps, props)) {
        this.getColorValueDomain();
      }
    }
  }, {
    key: 'needsReProjectPoints',
    value: function needsReProjectPoints(oldProps, props) {
      return oldProps.clusterRadius !== props.clusterRadius || oldProps.getPosition !== props.getPosition;
    }
  }, {
    key: 'needsReclusterPoints',
    value: function needsReclusterPoints(oldContext, context) {
      return Math.round(oldContext.viewport.zoom) !== Math.round(context.viewport.zoom);
    }
  }, {
    key: 'needsRecalculateScaleFunction',
    value: function needsRecalculateScaleFunction(oldProps, props) {
      return (0, _utils.needsRecalculateColorDomain)(oldProps, props) || (0, _utils.needReCalculateScaleFunction)(oldProps, props) || (0, _utils.needsRecalculateRadiusRange)(oldProps, props) || oldProps.getColorValue !== props.getColorValue;
    }
  }, {
    key: 'processGeoJSON',
    value: function processGeoJSON() {
      var _props = this.props,
          data = _props.data,
          getPosition = _props.getPosition;

      this.setState({ geoJSON: (0, _clusterUtils.getGeoJSON)(data, getPosition) });
      (0, _clusterUtils.clearClustererCache)();
    }
  }, {
    key: 'getClusters',
    value: function getClusters() {
      var geoJSON = this.state.geoJSON;
      var clusterRadius = this.props.clusterRadius;
      var _context = this.context,
          viewport = _context.viewport,
          _context$viewport = _context.viewport,
          longitude = _context$viewport.longitude,
          latitude = _context$viewport.latitude,
          height = _context$viewport.height,
          width = _context$viewport.width;

      // zoom needs to be an integer for the different map utils. Also helps with cache key.

      var zoom = Math.round(viewport.zoom);
      var bbox = _geoViewport2.default.bounds([longitude, latitude], zoom, [width, height]);

      var clusters = (0, _clusterUtils.clustersAtZoom)({ bbox: bbox, clusterRadius: clusterRadius, geoJSON: geoJSON, zoom: zoom });

      this.setState({ clusters: clusters });
    }
  }, {
    key: 'getColorValueDomain',
    value: function getColorValueDomain() {
      var _props2 = this.props,
          colorScale = _props2.colorScale,
          getColorValue = _props2.getColorValue,
          getRadiusValue = _props2.getRadiusValue,
          onSetColorDomain = _props2.onSetColorDomain;
      var clusters = this.state.clusters;


      var radiusDomain = [0, (0, _d3Array.max)(clusters, getRadiusValue)];

      var colorValues = clusters.map(function (d) {
        return getColorValue(d.properties.points);
      });

      var identity = function identity(d) {
        return d;
      };

      var colorDomain = colorScale === _defaultSettings.SCALE_TYPES.ordinal ? (0, _dataScaleUtils.getOrdinalDomain)(colorValues, identity) : colorScale === _defaultSettings.SCALE_TYPES.quantile ? (0, _dataScaleUtils.getQuantileDomain)(colorValues, identity, _d3Array.ascending) : (0, _dataScaleUtils.getLinearDomain)(colorValues, identity);

      this.setState({
        colorDomain: colorDomain,
        radiusDomain: radiusDomain
      });

      (0, _utils.getColorScaleFunction)(this);
      (0, _utils.getRadiusScaleFunction)(this);

      onSetColorDomain(colorDomain);
    }
  }, {
    key: 'getUpdateTriggers',
    value: function getUpdateTriggers() {
      return {
        getColor: {
          colorRange: this.props.colorRange,
          colorDomain: this.props.colorDomain,
          getColorValue: this.props.getColorValue,
          colorScale: this.props.colorScale,
          lowerPercentile: this.props.lowerPercentile,
          upperPercentile: this.props.upperPercentile
        },
        getRadius: {
          radiusRange: this.props.radiusRange,
          radiusDomain: this.props.radiusDomain,
          getRadiusValue: this.props.getRadiusValue
        }
      };
    }

    /*
     * override default layer method to calculate cell color based on color scale function
     */

  }, {
    key: '_onGetSublayerColor',
    value: function _onGetSublayerColor(cell) {
      var getColorValue = this.props.getColorValue;
      var _state = this.state,
          colorScaleFunc = _state.colorScaleFunc,
          colorDomain = _state.colorDomain;


      var cv = getColorValue(cell.properties.points);

      // if cell value is outside domain, set alpha to 0
      var color = cv >= colorDomain[0] && cv <= colorDomain[colorDomain.length - 1] ? colorScaleFunc(cv) : [0, 0, 0, 0];

      // add final alpha to color
      color[3] = Number.isFinite(color[3]) ? color[3] : 255;

      return color;
    }
  }, {
    key: '_onGetSublayerRadius',
    value: function _onGetSublayerRadius(cell) {
      var getRadiusValue = this.props.getRadiusValue;
      var radiusScaleFunc = this.state.radiusScaleFunc;

      return radiusScaleFunc(getRadiusValue(cell));
    }
  }, {
    key: 'getPickingInfo',
    value: function getPickingInfo(_ref3) {
      var info = _ref3.info;
      var clusters = this.state.clusters;

      var isPicked = info.picked && info.index > -1;

      var object = null;
      if (isPicked) {
        // add cluster colorValue to object
        var cluster = clusters[info.index];
        var colorValue = this.props.getColorValue(cluster.properties.points);

        object = (0, _extends3.default)({}, cluster.properties, {
          colorValue: colorValue,
          radius: this._onGetSublayerRadius(cluster),
          position: cluster.geometry.coordinates
        });
      }

      return (0, _extends3.default)({}, info, {
        picked: Boolean(object),
        // override object with picked cluster property
        object: object
      });
    }
  }, {
    key: 'renderLayers',
    value: function renderLayers() {
      // for subclassing, override this method to return
      // customized sub layer props
      var _props3 = this.props,
          id = _props3.id,
          radiusScale = _props3.radiusScale,
          fp64 = _props3.fp64;

      // base layer props

      var _props4 = this.props,
          opacity = _props4.opacity,
          pickable = _props4.pickable;

      // return props to the sublayer constructor

      return new _deck.ScatterplotLayer({
        id: id + '-cluster',
        data: this.state.clusters,
        radiusScale: radiusScale,
        fp64: fp64,
        getPosition: function getPosition(d) {
          return d.geometry.coordinates;
        },
        getRadius: this._onGetSublayerRadius.bind(this),
        opacity: opacity,
        pickable: pickable,
        getColor: this._onGetSublayerColor.bind(this),
        updateTriggers: this.getUpdateTriggers()
      });
    }
  }]);
  return ClusterLayer;
}(_deck.CompositeLayer);

exports.default = ClusterLayer;


ClusterLayer.layerName = 'ClusterLayer';
ClusterLayer.defaultProps = defaultProps;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kZWNrZ2wtbGF5ZXJzL2NsdXN0ZXItbGF5ZXIvY2x1c3Rlci1sYXllci5qcyJdLCJuYW1lcyI6WyJkZWZhdWx0UmFkaXVzIiwiTEFZRVJfVklTX0NPTkZJR1MiLCJjbHVzdGVyUmFkaXVzIiwiZGVmYXVsdFZhbHVlIiwiZGVmYXVsdFJhZGl1c1JhbmdlIiwiY2x1c3RlclJhZGl1c1JhbmdlIiwiZGVmYXVsdFByb3BzIiwiY29sb3JEb21haW4iLCJjb2xvclJhbmdlIiwiRGVmYXVsdENvbG9yUmFuZ2UiLCJjb2xvclNjYWxlIiwiU0NBTEVfVFlQRVMiLCJxdWFudGl6ZSIsInJhZGl1c1JhbmdlIiwibG93ZXJQZXJjZW50aWxlIiwidXBwZXJQZXJjZW50aWxlIiwiZ2V0UG9zaXRpb24iLCJ4IiwicG9zaXRpb24iLCJnZXRDb2xvclZhbHVlIiwicG9pbnRzIiwibGVuZ3RoIiwiZ2V0UmFkaXVzVmFsdWUiLCJjZWxsIiwicHJvcGVydGllcyIsInBvaW50X2NvdW50IiwiZnA2NCIsIkNsdXN0ZXJMYXllciIsInN0YXRlIiwiY2x1c3RlcnMiLCJnZW9KU09OIiwiY2hhbmdlRmxhZ3MiLCJzb21ldGhpbmdDaGFuZ2VkIiwib2xkQ29udGV4dCIsImNvbnRleHQiLCJvbGRQcm9wcyIsInByb3BzIiwiZGF0YUNoYW5nZWQiLCJuZWVkc1JlUHJvamVjdFBvaW50cyIsInByb2Nlc3NHZW9KU09OIiwiZ2V0Q2x1c3RlcnMiLCJnZXRDb2xvclZhbHVlRG9tYWluIiwibmVlZHNSZWNsdXN0ZXJQb2ludHMiLCJuZWVkc1JlY2FsY3VsYXRlU2NhbGVGdW5jdGlvbiIsIk1hdGgiLCJyb3VuZCIsInZpZXdwb3J0Iiwiem9vbSIsImRhdGEiLCJzZXRTdGF0ZSIsImxvbmdpdHVkZSIsImxhdGl0dWRlIiwiaGVpZ2h0Iiwid2lkdGgiLCJiYm94IiwiZ2VvVmlld3BvcnQiLCJib3VuZHMiLCJvblNldENvbG9yRG9tYWluIiwicmFkaXVzRG9tYWluIiwiY29sb3JWYWx1ZXMiLCJtYXAiLCJkIiwiaWRlbnRpdHkiLCJvcmRpbmFsIiwicXVhbnRpbGUiLCJhc2NlbmRpbmciLCJnZXRDb2xvciIsImdldFJhZGl1cyIsImNvbG9yU2NhbGVGdW5jIiwiY3YiLCJjb2xvciIsIk51bWJlciIsImlzRmluaXRlIiwicmFkaXVzU2NhbGVGdW5jIiwiaW5mbyIsImlzUGlja2VkIiwicGlja2VkIiwiaW5kZXgiLCJvYmplY3QiLCJjbHVzdGVyIiwiY29sb3JWYWx1ZSIsInJhZGl1cyIsIl9vbkdldFN1YmxheWVyUmFkaXVzIiwiZ2VvbWV0cnkiLCJjb29yZGluYXRlcyIsIkJvb2xlYW4iLCJpZCIsInJhZGl1c1NjYWxlIiwib3BhY2l0eSIsInBpY2thYmxlIiwiU2NhdHRlcnBsb3RMYXllciIsImJpbmQiLCJfb25HZXRTdWJsYXllckNvbG9yIiwidXBkYXRlVHJpZ2dlcnMiLCJnZXRVcGRhdGVUcmlnZ2VycyIsIkNvbXBvc2l0ZUxheWVyIiwibGF5ZXJOYW1lIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFvQkE7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7QUFLQTs7QUFPQTs7QUFDQTs7QUFDQTs7QUFFQTs7OztBQU1BLElBQU1BLGdCQUFnQkMsZ0NBQWtCQyxhQUFsQixDQUFnQ0MsWUFBdEQsQyxDQTdDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUE0QkEsSUFBTUMscUJBQXFCSCxnQ0FBa0JJLGtCQUFsQixDQUFxQ0YsWUFBaEU7O0FBRUEsSUFBTUcsZUFBZTtBQUNuQkosaUJBQWVGLGFBREk7QUFFbkJPLGVBQWEsSUFGTTtBQUduQkMsY0FBWUMsOEJBSE87QUFJbkJDLGNBQVlDLDZCQUFZQyxRQUpMO0FBS25CQyxlQUFhVCxrQkFMTTs7QUFPbkI7QUFDQVUsbUJBQWlCLENBUkU7QUFTbkJDLG1CQUFpQixHQVRFOztBQVduQkMs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QUFLVSxLQU5wQjtBQUFBLFVBTU5vRCxPQU5NLFdBTU5BLE9BTk07QUFBQSxVQU1HQyxRQU5ILFdBTUdBLFFBTkg7O0FBUWI7O0FBQ0EsYUFBTyxJQUFJQyxzQkFBSixDQUFxQjtBQUMxQkosWUFBT0EsRUFBUCxhQUQwQjtBQUUxQnRDLGNBQU0sS0FBS3BCLEtBQUwsQ0FBV0MsUUFGUztBQUcxQjBELGdDQUgwQjtBQUkxQjdELGtCQUowQjtBQUsxQlYscUJBQWE7QUFBQSxpQkFBSzZDLEVBQUVzQixRQUFGLENBQVdDLFdBQWhCO0FBQUEsU0FMYTtBQU0xQmpCLG1CQUFXLEtBQUtlLG9CQUFMLENBQTBCUyxJQUExQixDQUErQixJQUEvQixDQU5lO0FBTzFCSCx3QkFQMEI7QUFRMUJDLDBCQVIwQjtBQVMxQnZCLGtCQUFVLEtBQUswQixtQkFBTCxDQUF5QkQsSUFBekIsQ0FBOEIsSUFBOUIsQ0FUZ0I7QUFVMUJFLHdCQUFnQixLQUFLQyxpQkFBTDtBQVZVLE9BQXJCLENBQVA7QUFZRDs7O0VBek11Q0Msb0I7O2tCQUFyQnBFLFk7OztBQTRNckJBLGFBQWFxRSxTQUFiLEdBQXlCLGNBQXpCO0FBQ0FyRSxhQUFhckIsWUFBYixHQUE0QkEsWUFBNUIiLCJmaWxlIjoiY2x1c3Rlci1sYXllci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgMjAxOCBVYmVyIFRlY2hub2xvZ2llcywgSW5jLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbi8vIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbi8vIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbi8vIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbi8vIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuLy8gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuLy8gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4vLyBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbi8vIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbi8vIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4vLyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4vLyBUSEUgU09GVFdBUkUuXG5cbmltcG9ydCB7Q29tcG9zaXRlTGF5ZXIsIFNjYXR0ZXJwbG90TGF5ZXJ9IGZyb20gJ2RlY2suZ2wnO1xuaW1wb3J0IGdlb1ZpZXdwb3J0IGZyb20gJ0BtYXBib3gvZ2VvLXZpZXdwb3J0JztcbmltcG9ydCB7YXNjZW5kaW5nLCBtYXh9IGZyb20gJ2QzLWFycmF5JztcbmltcG9ydCB7XG4gIGdldFF1YW50aWxlRG9tYWluLFxuICBnZXRPcmRpbmFsRG9tYWluLFxuICBnZXRMaW5lYXJEb21haW5cbn0gZnJvbSAndXRpbHMvZGF0YS1zY2FsZS11dGlscyc7XG5pbXBvcnQge1xuICBnZXRDb2xvclNjYWxlRnVuY3Rpb24sXG4gIGdldFJhZGl1c1NjYWxlRnVuY3Rpb24sXG4gIG5lZWRzUmVjYWxjdWxhdGVSYWRpdXNSYW5nZSxcbiAgbmVlZHNSZWNhbGN1bGF0ZUNvbG9yRG9tYWluLFxuICBuZWVkUmVDYWxjdWxhdGVTY2FsZUZ1bmN0aW9uXG59IGZyb20gJy4uL2xheWVyLXV0aWxzL3V0aWxzJztcbmltcG9ydCB7RGVmYXVsdENvbG9yUmFuZ2V9IGZyb20gJ2NvbnN0YW50cy9jb2xvci1yYW5nZXMnO1xuaW1wb3J0IHtMQVlFUl9WSVNfQ09ORklHU30gZnJvbSAnbGF5ZXJzL2xheWVyLWZhY3RvcnknO1xuaW1wb3J0IHtTQ0FMRV9UWVBFU30gZnJvbSAnY29uc3RhbnRzL2RlZmF1bHQtc2V0dGluZ3MnO1xuXG5pbXBvcnQge1xuICBjbGVhckNsdXN0ZXJlckNhY2hlLFxuICBjbHVzdGVyc0F0Wm9vbSxcbiAgZ2V0R2VvSlNPTlxufSBmcm9tICcuLi9sYXllci11dGlscy9jbHVzdGVyLXV0aWxzJztcblxuY29uc3QgZGVmYXVsdFJhZGl1cyA9IExBWUVSX1ZJU19DT05GSUdTLmNsdXN0ZXJSYWRpdXMuZGVmYXVsdFZhbHVlO1xuY29uc3QgZGVmYXVsdFJhZGl1c1JhbmdlID0gTEFZRVJfVklTX0NPTkZJR1MuY2x1c3RlclJhZGl1c1JhbmdlLmRlZmF1bHRWYWx1ZTtcblxuY29uc3QgZGVmYXVsdFByb3BzID0ge1xuICBjbHVzdGVyUmFkaXVzOiBkZWZhdWx0UmFkaXVzLFxuICBjb2xvckRvbWFpbjogbnVsbCxcbiAgY29sb3JSYW5nZTogRGVmYXVsdENvbG9yUmFuZ2UsXG4gIGNvbG9yU2NhbGU6IFNDQUxFX1RZUEVTLnF1YW50aXplLFxuICByYWRpdXNSYW5nZTogZGVmYXVsdFJhZGl1c1JhbmdlLFxuXG4gIC8vIG1heWJlIGxhdGVyLi4uXG4gIGxvd2VyUGVyY2VudGlsZTogMCxcbiAgdXBwZXJQZXJjZW50aWxlOiAxMDAsXG5cbiAgZ2V0UG9zaXRpb246IHggPT4geC5wb3NpdGlvbixcblxuICAvLyBpZiB3YW50IHRvIGhhdmUgY29sb3IgYmFzZWQgb24gY3VzdG9taXplZCBhZ2dyZWdhdG9yLCBpbnN0ZWFkIG9mIGNvdW50XG4gIGdldENvbG9yVmFsdWU6IHBvaW50cyA9PiBwb2ludHMubGVuZ3RoLFxuXG4gIC8vICBpZiB3YW50IHRvIGhhdmUgcmFkaXVzIGJhc2VkIG9uIGN1c3RvbWl6ZWQgYWdncmVnYXRvciwgaW5zdGVhZCBvZiBjb3VudFxuICBnZXRSYWRpdXNWYWx1ZTogY2VsbCA9PiBjZWxsLnByb3BlcnRpZXMucG9pbnRfY291bnQsXG4gIGZwNjQ6IGZhbHNlXG59O1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDbHVzdGVyTGF5ZXIgZXh0ZW5kcyBDb21wb3NpdGVMYXllciB7XG4gIGluaXRpYWxpemVTdGF0ZSgpIHtcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgY2x1c3RlcnM6IG51bGwsXG4gICAgICBnZW9KU09OOiBudWxsXG4gICAgfTtcbiAgfVxuXG4gIHNob3VsZFVwZGF0ZVN0YXRlKHtjaGFuZ2VGbGFnc30pIHtcbiAgICByZXR1cm4gY2hhbmdlRmxhZ3Muc29tZXRoaW5nQ2hhbmdlZDtcbiAgfVxuXG4gIHVwZGF0ZVN0YXRlKHtvbGRDb250ZXh0LCBjb250ZXh0LCBvbGRQcm9wcywgcHJvcHMsIGNoYW5nZUZsYWdzfSkge1xuICAgIGlmIChjaGFuZ2VGbGFncy5kYXRhQ2hhbmdlZCB8fCB0aGlzLm5lZWRzUmVQcm9qZWN0UG9pbnRzKG9sZFByb3BzLCBwcm9wcykpIHtcbiAgICAgIC8vIHByb2plY3QgZGF0YSBpbnRvIGNsdXN0ZXJzLCBhbmQgZ2V0IGNsdXN0ZXJlZCBkYXRhXG4gICAgICB0aGlzLnByb2Nlc3NHZW9KU09OKCk7XG4gICAgICB0aGlzLmdldENsdXN0ZXJzKCk7XG5cbiAgICAgIC8vIHRoaXMgbmVlZHMgY2x1c3RlcmVkIGRhdGEgdG8gYmUgc2V0XG4gICAgICB0aGlzLmdldENvbG9yVmFsdWVEb21haW4oKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMubmVlZHNSZWNsdXN0ZXJQb2ludHMob2xkQ29udGV4dCwgY29udGV4dCkpIHtcbiAgICAgIHRoaXMuZ2V0Q2x1c3RlcnMoKTtcbiAgICAgIHRoaXMuZ2V0Q29sb3JWYWx1ZURvbWFpbigpO1xuICAgIH0gZWxzZSBpZiAodGhpcy5uZWVkc1JlY2FsY3VsYXRlU2NhbGVGdW5jdGlvbihvbGRQcm9wcywgcHJvcHMpKSB7XG4gICAgICB0aGlzLmdldENvbG9yVmFsdWVEb21haW4oKTtcbiAgICB9XG4gIH1cblxuICBuZWVkc1JlUHJvamVjdFBvaW50cyhvbGRQcm9wcywgcHJvcHMpIHtcbiAgICByZXR1cm4gKFxuICAgICAgb2xkUHJvcHMuY2x1c3RlclJhZGl1cyAhPT0gcHJvcHMuY2x1c3RlclJhZGl1cyB8fFxuICAgICAgb2xkUHJvcHMuZ2V0UG9zaXRpb24gIT09IHByb3BzLmdldFBvc2l0aW9uXG4gICAgKTtcbiAgfVxuXG4gIG5lZWRzUmVjbHVzdGVyUG9pbnRzKG9sZENvbnRleHQsIGNvbnRleHQpIHtcbiAgICByZXR1cm4gKFxuICAgICAgTWF0aC5yb3VuZChvbGRDb250ZXh0LnZpZXdwb3J0Lnpvb20pICE9PSBNYXRoLnJvdW5kKGNvbnRleHQudmlld3BvcnQuem9vbSlcbiAgICApO1xuICB9XG5cbiAgbmVlZHNSZWNhbGN1bGF0ZVNjYWxlRnVuY3Rpb24ob2xkUHJvcHMsIHByb3BzKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIG5lZWRzUmVjYWxjdWxhdGVDb2xvckRvbWFpbihvbGRQcm9wcywgcHJvcHMpIHx8XG4gICAgICBuZWVkUmVDYWxjdWxhdGVTY2FsZUZ1bmN0aW9uKG9sZFByb3BzLCBwcm9wcykgfHxcbiAgICAgIG5lZWRzUmVjYWxjdWxhdGVSYWRpdXNSYW5nZShvbGRQcm9wcywgcHJvcHMpIHx8XG4gICAgICBvbGRQcm9wcy5nZXRDb2xvclZhbHVlICE9PSBwcm9wcy5nZXRDb2xvclZhbHVlXG4gICAgKTtcbiAgfVxuXG4gIHByb2Nlc3NHZW9KU09OKCkge1xuICAgIGNvbnN0IHtkYXRhLCBnZXRQb3NpdGlvbn0gPSB0aGlzLnByb3BzO1xuICAgIHRoaXMuc2V0U3RhdGUoe2dlb0pTT046IGdldEdlb0pTT04oZGF0YSwgZ2V0UG9zaXRpb24pfSk7XG4gICAgY2xlYXJDbHVzdGVyZXJDYWNoZSgpO1xuICB9XG5cbiAgZ2V0Q2x1c3RlcnMoKSB7XG4gICAgY29uc3Qge2dlb0pTT059ID0gdGhpcy5zdGF0ZTtcbiAgICBjb25zdCB7Y2x1c3RlclJhZGl1c30gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHtcbiAgICAgIHZpZXdwb3J0LFxuICAgICAgdmlld3BvcnQ6IHtsb25naXR1ZGUsIGxhdGl0dWRlLCBoZWlnaHQsIHdpZHRofVxuICAgIH0gPSB0aGlzLmNvbnRleHQ7XG5cbiAgICAvLyB6b29tIG5lZWRzIHRvIGJlIGFuIGludGVnZXIgZm9yIHRoZSBkaWZmZXJlbnQgbWFwIHV0aWxzLiBBbHNvIGhlbHBzIHdpdGggY2FjaGUga2V5LlxuICAgIGNvbnN0IHpvb20gPSBNYXRoLnJvdW5kKHZpZXdwb3J0Lnpvb20pO1xuICAgIGNvbnN0IGJib3ggPSBnZW9WaWV3cG9ydC5ib3VuZHMoW2xvbmdpdHVkZSwgbGF0aXR1ZGVdLCB6b29tLCBbXG4gICAgICB3aWR0aCxcbiAgICAgIGhlaWdodFxuICAgIF0pO1xuXG4gICAgY29uc3QgY2x1c3RlcnMgPSBjbHVzdGVyc0F0Wm9vbSh7YmJveCwgY2x1c3RlclJhZGl1cywgZ2VvSlNPTiwgem9vbX0pO1xuXG4gICAgdGhpcy5zZXRTdGF0ZSh7Y2x1c3RlcnN9KTtcbiAgfVxuXG4gIGdldENvbG9yVmFsdWVEb21haW4oKSB7XG4gICAgY29uc3Qge1xuICAgICAgY29sb3JTY2FsZSxcbiAgICAgIGdldENvbG9yVmFsdWUsXG4gICAgICBnZXRSYWRpdXNWYWx1ZSxcbiAgICAgIG9uU2V0Q29sb3JEb21haW5cbiAgICB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCB7Y2x1c3RlcnN9ID0gdGhpcy5zdGF0ZTtcblxuICAgIGNvbnN0IHJhZGl1c0RvbWFpbiA9IFswLCBtYXgoY2x1c3RlcnMsIGdldFJhZGl1c1ZhbHVlKV07XG5cbiAgICBjb25zdCBjb2xvclZhbHVlcyA9IGNsdXN0ZXJzLm1hcChkID0+IGdldENvbG9yVmFsdWUoZC5wcm9wZXJ0aWVzLnBvaW50cykpO1xuXG4gICAgY29uc3QgaWRlbnRpdHkgPSBkID0+IGQ7XG5cbiAgICBjb25zdCBjb2xvckRvbWFpbiA9XG4gICAgICBjb2xvclNjYWxlID09PSBTQ0FMRV9UWVBFUy5vcmRpbmFsXG4gICAgICAgID8gZ2V0T3JkaW5hbERvbWFpbihjb2xvclZhbHVlcywgaWRlbnRpdHkpXG4gICAgICAgIDogY29sb3JTY2FsZSA9PT0gU0NBTEVfVFlQRVMucXVhbnRpbGVcbiAgICAgICAgICA/IGdldFF1YW50aWxlRG9tYWluKGNvbG9yVmFsdWVzLCBpZGVudGl0eSwgYXNjZW5kaW5nKVxuICAgICAgICAgIDogZ2V0TGluZWFyRG9tYWluKGNvbG9yVmFsdWVzLCBpZGVudGl0eSk7XG5cbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIGNvbG9yRG9tYWluLFxuICAgICAgcmFkaXVzRG9tYWluXG4gICAgfSk7XG5cbiAgICBnZXRDb2xvclNjYWxlRnVuY3Rpb24odGhpcyk7XG4gICAgZ2V0UmFkaXVzU2NhbGVGdW5jdGlvbih0aGlzKTtcblxuICAgIG9uU2V0Q29sb3JEb21haW4oY29sb3JEb21haW4pO1xuICB9XG5cbiAgZ2V0VXBkYXRlVHJpZ2dlcnMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGdldENvbG9yOiB7XG4gICAgICAgIGNvbG9yUmFuZ2U6IHRoaXMucHJvcHMuY29sb3JSYW5nZSxcbiAgICAgICAgY29sb3JEb21haW46IHRoaXMucHJvcHMuY29sb3JEb21haW4sXG4gICAgICAgIGdldENvbG9yVmFsdWU6IHRoaXMucHJvcHMuZ2V0Q29sb3JWYWx1ZSxcbiAgICAgICAgY29sb3JTY2FsZTogdGhpcy5wcm9wcy5jb2xvclNjYWxlLFxuICAgICAgICBsb3dlclBlcmNlbnRpbGU6IHRoaXMucHJvcHMubG93ZXJQZXJjZW50aWxlLFxuICAgICAgICB1cHBlclBlcmNlbnRpbGU6IHRoaXMucHJvcHMudXBwZXJQZXJjZW50aWxlXG4gICAgICB9LFxuICAgICAgZ2V0UmFkaXVzOiB7XG4gICAgICAgIHJhZGl1c1JhbmdlOiB0aGlzLnByb3BzLnJhZGl1c1JhbmdlLFxuICAgICAgICByYWRpdXNEb21haW46IHRoaXMucHJvcHMucmFkaXVzRG9tYWluLFxuICAgICAgICBnZXRSYWRpdXNWYWx1ZTogdGhpcy5wcm9wcy5nZXRSYWRpdXNWYWx1ZVxuICAgICAgfVxuICAgIH07XG4gIH1cblxuICAvKlxuICAgKiBvdmVycmlkZSBkZWZhdWx0IGxheWVyIG1ldGhvZCB0byBjYWxjdWxhdGUgY2VsbCBjb2xvciBiYXNlZCBvbiBjb2xvciBzY2FsZSBmdW5jdGlvblxuICAgKi9cbiAgX29uR2V0U3VibGF5ZXJDb2xvcihjZWxsKSB7XG4gICAgY29uc3Qge2dldENvbG9yVmFsdWV9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCB7Y29sb3JTY2FsZUZ1bmMsIGNvbG9yRG9tYWlufSA9IHRoaXMuc3RhdGU7XG5cbiAgICBjb25zdCBjdiA9IGdldENvbG9yVmFsdWUoY2VsbC5wcm9wZXJ0aWVzLnBvaW50cyk7XG5cbiAgICAvLyBpZiBjZWxsIHZhbHVlIGlzIG91dHNpZGUgZG9tYWluLCBzZXQgYWxwaGEgdG8gMFxuICAgIGNvbnN0IGNvbG9yID1cbiAgICAgIGN2ID49IGNvbG9yRG9tYWluWzBdICYmIGN2IDw9IGNvbG9yRG9tYWluW2NvbG9yRG9tYWluLmxlbmd0aCAtIDFdXG4gICAgICAgID8gY29sb3JTY2FsZUZ1bmMoY3YpXG4gICAgICAgIDogWzAsIDAsIDAsIDBdO1xuXG4gICAgLy8gYWRkIGZpbmFsIGFscGhhIHRvIGNvbG9yXG4gICAgY29sb3JbM10gPSBOdW1iZXIuaXNGaW5pdGUoY29sb3JbM10pID8gY29sb3JbM10gOiAyNTU7XG5cbiAgICByZXR1cm4gY29sb3I7XG4gIH1cblxuICBfb25HZXRTdWJsYXllclJhZGl1cyhjZWxsKSB7XG4gICAgY29uc3Qge2dldFJhZGl1c1ZhbHVlfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3Qge3JhZGl1c1NjYWxlRnVuY30gPSB0aGlzLnN0YXRlO1xuICAgIHJldHVybiByYWRpdXNTY2FsZUZ1bmMoZ2V0UmFkaXVzVmFsdWUoY2VsbCkpO1xuICB9XG5cbiAgZ2V0UGlja2luZ0luZm8oe2luZm99KSB7XG4gICAgY29uc3Qge2NsdXN0ZXJzfSA9IHRoaXMuc3RhdGU7XG4gICAgY29uc3QgaXNQaWNrZWQgPSBpbmZvLnBpY2tlZCAmJiBpbmZvLmluZGV4ID4gLTE7XG5cbiAgICBsZXQgb2JqZWN0ID0gbnVsbDtcbiAgICBpZiAoaXNQaWNrZWQpIHtcbiAgICAgIC8vIGFkZCBjbHVzdGVyIGNvbG9yVmFsdWUgdG8gb2JqZWN0XG4gICAgICBjb25zdCBjbHVzdGVyID0gY2x1c3RlcnNbaW5mby5pbmRleF07XG4gICAgICBjb25zdCBjb2xvclZhbHVlID0gdGhpcy5wcm9wcy5nZXRDb2xvclZhbHVlKGNsdXN0ZXIucHJvcGVydGllcy5wb2ludHMpO1xuXG4gICAgICBvYmplY3QgPSB7XG4gICAgICAgIC4uLmNsdXN0ZXIucHJvcGVydGllcyxcbiAgICAgICAgY29sb3JWYWx1ZSxcbiAgICAgICAgcmFkaXVzOiB0aGlzLl9vbkdldFN1YmxheWVyUmFkaXVzKGNsdXN0ZXIpLFxuICAgICAgICBwb3NpdGlvbjogY2x1c3Rlci5nZW9tZXRyeS5jb29yZGluYXRlc1xuICAgICAgfTtcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgLi4uaW5mbyxcbiAgICAgIHBpY2tlZDogQm9vbGVhbihvYmplY3QpLFxuICAgICAgLy8gb3ZlcnJpZGUgb2JqZWN0IHdpdGggcGlja2VkIGNsdXN0ZXIgcHJvcGVydHlcbiAgICAgIG9iamVjdFxuICAgIH07XG4gIH1cblxuICByZW5kZXJMYXllcnMoKSB7XG4gICAgLy8gZm9yIHN1YmNsYXNzaW5nLCBvdmVycmlkZSB0aGlzIG1ldGhvZCB0byByZXR1cm5cbiAgICAvLyBjdXN0b21pemVkIHN1YiBsYXllciBwcm9wc1xuICAgIGNvbnN0IHtpZCwgcmFkaXVzU2NhbGUsIGZwNjR9ID0gdGhpcy5wcm9wcztcblxuICAgIC8vIGJhc2UgbGF5ZXIgcHJvcHNcbiAgICBjb25zdCB7b3BhY2l0eSwgcGlja2FibGV9ID0gdGhpcy5wcm9wcztcblxuICAgIC8vIHJldHVybiBwcm9wcyB0byB0aGUgc3VibGF5ZXIgY29uc3RydWN0b3JcbiAgICByZXR1cm4gbmV3IFNjYXR0ZXJwbG90TGF5ZXIoe1xuICAgICAgaWQ6IGAke2lkfS1jbHVzdGVyYCxcbiAgICAgIGRhdGE6IHRoaXMuc3RhdGUuY2x1c3RlcnMsXG4gICAgICByYWRpdXNTY2FsZSxcbiAgICAgIGZwNjQsXG4gICAgICBnZXRQb3NpdGlvbjogZCA9PiBkLmdlb21ldHJ5LmNvb3JkaW5hdGVzLFxuICAgICAgZ2V0UmFkaXVzOiB0aGlzLl9vbkdldFN1YmxheWVyUmFkaXVzLmJpbmQodGhpcyksXG4gICAgICBvcGFjaXR5LFxuICAgICAgcGlja2FibGUsXG4gICAgICBnZXRDb2xvcjogdGhpcy5fb25HZXRTdWJsYXllckNvbG9yLmJpbmQodGhpcyksXG4gICAgICB1cGRhdGVUcmlnZ2VyczogdGhpcy5nZXRVcGRhdGVUcmlnZ2VycygpXG4gICAgfSk7XG4gIH1cbn1cblxuQ2x1c3RlckxheWVyLmxheWVyTmFtZSA9ICdDbHVzdGVyTGF5ZXInO1xuQ2x1c3RlckxheWVyLmRlZmF1bHRQcm9wcyA9IGRlZmF1bHRQcm9wcztcbiJdfQ==