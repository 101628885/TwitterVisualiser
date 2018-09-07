'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.arctVisConfigs = exports.arcRequiredColumns = exports.arcPosResolver = exports.arcPosAccessor = undefined;

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

var _baseLayer = require('../base-layer');

var _baseLayer2 = _interopRequireDefault(_baseLayer);

var _arcBrushingLayer = require('../../deckgl-layers/arc-brushing-layer/arc-brushing-layer');

var _arcBrushingLayer2 = _interopRequireDefault(_arcBrushingLayer);

var _colorUtils = require('../../utils/color-utils');

var _arcLayerIcon = require('./arc-layer-icon');

var _arcLayerIcon2 = _interopRequireDefault(_arcLayerIcon);

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

var arcPosAccessor = exports.arcPosAccessor = function arcPosAccessor(_ref) {
  var lat0 = _ref.lat0,
      lng0 = _ref.lng0,
      lat1 = _ref.lat1,
      lng1 = _ref.lng1;
  return function (d) {
    return [d.data[lng0.fieldIdx], d.data[lat0.fieldIdx], 0, d.data[lng1.fieldIdx], d.data[lat1.fieldIdx], 0];
  };
};

var arcPosResolver = exports.arcPosResolver = function arcPosResolver(_ref2) {
  var lat0 = _ref2.lat0,
      lng0 = _ref2.lng0,
      lat1 = _ref2.lat1,
      lng1 = _ref2.lng1;
  return lat0.fieldIdx + '-' + lng0.fieldIdx + '-' + lat1.fieldIdx + '-' + lat1.fieldIdx + '}';
};

var arcRequiredColumns = exports.arcRequiredColumns = ['lat0', 'lng0', 'lat1', 'lng1'];

var arctVisConfigs = exports.arctVisConfigs = {
  opacity: 'opacity',
  thickness: 'thickness',
  colorRange: 'colorRange',
  sizeRange: 'strokeWidthRange',
  targetColor: 'targetColor',
  'hi-precision': 'hi-precision'
};

var ArcLayer = function (_Layer) {
  (0, _inherits3.default)(ArcLayer, _Layer);

  function ArcLayer(props) {
    (0, _classCallCheck3.default)(this, ArcLayer);

    var _this = (0, _possibleConstructorReturn3.default)(this, (ArcLayer.__proto__ || Object.getPrototypeOf(ArcLayer)).call(this, props));

    _this.registerVisConfig(arctVisConfigs);
    _this.getPosition = (0, _lodash2.default)(arcPosAccessor, arcPosResolver);
    return _this;
  }

  (0, _createClass3.default)(ArcLayer, [{
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
          sizeRange = _config$visConfig.sizeRange,
          colorRange = _config$visConfig.colorRange,
          targetColor = _config$visConfig.targetColor;

      // arc color

      var cScale = colorField && this.getVisChannelScale(colorScale, colorDomain, colorRange.colors.map(_colorUtils.hexToRgb));

      // arc thickness
      var sScale = sizeField && this.getVisChannelScale(sizeScale, sizeDomain, sizeRange);

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

          // if doesn't have point lat or lng, do not add the arc
          // deck.gl can't handle position == null
          if (!pos.every(Number.isFinite)) {
            return accu;
          }

          accu.push({
            index: index,
            sourcePosition: [pos[0], pos[1], pos[2]],
            targetPosition: [pos[3], pos[4], pos[5]],
            data: allData[index]
          });

          return accu;
        }, []);
      }

      var getStrokeWidth = function getStrokeWidth(d) {
        return sScale ? _this2.getEncodedChannelValue(sScale, d.data, sizeField) : 1;
      };

      var getColor = function getColor(d) {
        return cScale ? _this2.getEncodedChannelValue(cScale, d.data, colorField) : color;
      };

      var getTargetColor = function getTargetColor(d) {
        return cScale ? _this2.getEncodedChannelValue(cScale, d.data, colorField) : targetColor || color;
      };

      return {
        data: data,
        getColor: getColor,
        getSourceColor: getColor,
        getTargetColor: getTargetColor,
        getStrokeWidth: getStrokeWidth
      };
    }
  }, {
    key: 'updateLayerMeta',
    value: function updateLayerMeta(allData, getPosition) {
      // get bounds from arcs
      var sBounds = this.getPointsBounds(allData, function (d) {
        var pos = getPosition({ data: d });
        return [pos[0], pos[1]];
      });

      var tBounds = this.getPointsBounds(allData, function (d) {
        var pos = getPosition({ data: d });
        return [pos[3], pos[4]];
      });

      var bounds = [Math.min(sBounds[0], tBounds[0]), Math.min(sBounds[1], tBounds[1]), Math.max(sBounds[2], tBounds[2]), Math.max(sBounds[3], tBounds[3])];

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
      var brush = interactionConfig.brush;


      var colorUpdateTriggers = {
        color: this.config.color,
        colorField: this.config.colorField,
        colorRange: this.config.visConfig.colorRange,
        colorScale: this.config.colorScale
      };

      return [
      // base layer
      new _arcBrushingLayer2.default((0, _extends3.default)({}, layerInteraction, data, {
        id: this.id,
        idx: idx,
        brushRadius: brush.config.size * 1000,
        brushSource: true,
        brushTarget: true,
        enableBrushing: brush.enabled,
        fp64: this.config.visConfig['hi-precision'],
        opacity: this.config.visConfig.opacity,
        pickable: true,
        pickedColor: this.config.highlightColor,
        strokeScale: this.config.visConfig.thickness,
        updateTriggers: {
          getStrokeWidth: {
            sizeField: this.config.sizeField,
            sizeRange: this.config.visConfig.sizeRange
          },
          getColor: colorUpdateTriggers,
          getSourceColor: colorUpdateTriggers,
          getTargetColor: colorUpdateTriggers
        }
      }))];
    }
  }, {
    key: 'type',
    get: function get() {
      return 'arc';
    }
  }, {
    key: 'isAggregated',
    get: function get() {
      return false;
    }
  }, {
    key: 'layerIcon',
    get: function get() {
      return _arcLayerIcon2.default;
    }
  }, {
    key: 'requiredLayerColumns',
    get: function get() {
      return arcRequiredColumns;
    }
  }, {
    key: 'columnPairs',
    get: function get() {
      return this.defaultLinkColumnPairs;
    }
  }, {
    key: 'visualChannels',
    get: function get() {
      return (0, _extends3.default)({}, (0, _get3.default)(ArcLayer.prototype.__proto__ || Object.getPrototypeOf(ArcLayer.prototype), 'visualChannels', this), {
        size: (0, _extends3.default)({}, (0, _get3.default)(ArcLayer.prototype.__proto__ || Object.getPrototypeOf(ArcLayer.prototype), 'visualChannels', this).size, {
          property: 'stroke'
        })
      });
    }
  }], [{
    key: 'findDefaultLayerProps',
    value: function findDefaultLayerProps(_ref4) {
      var _ref4$fieldPairs = _ref4.fieldPairs,
          fieldPairs = _ref4$fieldPairs === undefined ? [] : _ref4$fieldPairs;

      if (fieldPairs.length < 2) {
        return [];
      }
      var props = {
        color: (0, _colorUtils.hexToRgb)(_defaultSettings.DEFAULT_LAYER_COLOR.tripArc)
      };

      // connect the first two point layer with arc
      props.columns = {
        lat0: fieldPairs[0].pair.lat,
        lng0: fieldPairs[0].pair.lng,
        lat1: fieldPairs[1].pair.lat,
        lng1: fieldPairs[1].pair.lng
      };
      props.label = fieldPairs[0].defaultName + ' -> ' + fieldPairs[1].defaultName + ' arc';

      return props;
    }
  }]);
  return ArcLayer;
}(_baseLayer2.default);

exports.default = ArcLayer;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9sYXllcnMvYXJjLWxheWVyL2FyYy1sYXllci5qcyJdLCJuYW1lcyI6WyJhcmNQb3NBY2Nlc3NvciIsImxhdDAiLCJsbmcwIiwibGF0MSIsImxuZzEiLCJkIiwiZGF0YSIsImZpZWxkSWR4IiwiYXJjUG9zUmVzb2x2ZXIiLCJhcmNSZXF1aXJlZENvbHVtbnMiLCJhcmN0VmlzQ29uZmlncyIsIm9wYWNpdHkiLCJ0aGlja25lc3MiLCJjb2xvclJhbmdlIiwic2l6ZVJhbmdlIiwidGFyZ2V0Q29sb3IiLCJBcmNMYXllciIsInByb3BzIiwicmVnaXN0ZXJWaXNDb25maWciLCJnZXRQb3NpdGlvbiIsIl8iLCJhbGxEYXRhIiwiZmlsdGVyZWRJbmRleCIsIm9sZExheWVyRGF0YSIsIm9wdCIsImNvbmZpZyIsImNvbG9yU2NhbGUiLCJjb2xvckRvbWFpbiIsImNvbG9yRmllbGQiLCJjb2xvciIsImNvbHVtbnMiLCJzaXplRmllbGQiLCJzaXplU2NhbGUiLCJzaXplRG9tYWluIiwidmlzQ29uZmlnIiwiY1NjYWxlIiwiZ2V0VmlzQ2hhbm5lbFNjYWxlIiwiY29sb3JzIiwibWFwIiwiaGV4VG9SZ2IiLCJzU2NhbGUiLCJ1cGRhdGVMYXllck1ldGEiLCJzYW1lRGF0YSIsInJlZHVjZSIsImFjY3UiLCJpbmRleCIsInBvcyIsImV2ZXJ5IiwiTnVtYmVyIiwiaXNGaW5pdGUiLCJwdXNoIiwic291cmNlUG9zaXRpb24iLCJ0YXJnZXRQb3NpdGlvbiIsImdldFN0cm9rZVdpZHRoIiwiZ2V0RW5jb2RlZENoYW5uZWxWYWx1ZSIsImdldENvbG9yIiwiZ2V0VGFyZ2V0Q29sb3IiLCJnZXRTb3VyY2VDb2xvciIsInNCb3VuZHMiLCJnZXRQb2ludHNCb3VuZHMiLCJ0Qm91bmRzIiwiYm91bmRzIiwiTWF0aCIsIm1pbiIsIm1heCIsInVwZGF0ZU1ldGEiLCJpZHgiLCJsYXllckludGVyYWN0aW9uIiwib2JqZWN0SG92ZXJlZCIsIm1hcFN0YXRlIiwiaW50ZXJhY3Rpb25Db25maWciLCJicnVzaCIsImNvbG9yVXBkYXRlVHJpZ2dlcnMiLCJBcmNCcnVzaGluZ0xheWVyIiwiaWQiLCJicnVzaFJhZGl1cyIsInNpemUiLCJicnVzaFNvdXJjZSIsImJydXNoVGFyZ2V0IiwiZW5hYmxlQnJ1c2hpbmciLCJlbmFibGVkIiwiZnA2NCIsInBpY2thYmxlIiwicGlja2VkQ29sb3IiLCJoaWdobGlnaHRDb2xvciIsInN0cm9rZVNjYWxlIiwidXBkYXRlVHJpZ2dlcnMiLCJBcmNMYXllckljb24iLCJkZWZhdWx0TGlua0NvbHVtblBhaXJzIiwicHJvcGVydHkiLCJmaWVsZFBhaXJzIiwibGVuZ3RoIiwiREVGQVVMVF9MQVlFUl9DT0xPUiIsInRyaXBBcmMiLCJwYWlyIiwibGF0IiwibG5nIiwibGFiZWwiLCJkZWZhdWx0TmFtZSIsIkxheWVyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBb0JBOzs7O0FBRUE7Ozs7QUFDQTs7OztBQUNBOztBQUNBOzs7O0FBQ0E7Ozs7QUExQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBVU8sSUFBTUEsMENBQWlCLFNBQWpCQSxjQUFpQjtBQUFBLE1BQUVDLElBQUYsUUFBRUEsSUFBRjtBQUFBLE1BQVFDLElBQVIsUUFBUUEsSUFBUjtBQUFBLE1BQWNDLElBQWQsUUFBY0EsSUFBZDtBQUFBLE1BQW9CQyxJQUFwQixRQUFvQkEsSUFBcEI7QUFBQSxTQUE4QjtBQUFBLFdBQUssQ0FDL0RDLEVBQUVDLElBQUYsQ0FBT0osS0FBS0ssUUFBWixDQUQrRCxFQUUvREYsRUFBRUMsSUFBRixDQUFPTCxLQUFLTSxRQUFaLENBRitELEVBRy9ELENBSCtELEVBSS9ERixFQUFFQyxJQUFGLENBQU9GLEtBQUtHLFFBQVosQ0FKK0QsRUFLL0RGLEVBQUVDLElBQUYsQ0FBT0gsS0FBS0ksUUFBWixDQUwrRCxFQU0vRCxDQU4rRCxDQUFMO0FBQUEsR0FBOUI7QUFBQSxDQUF2Qjs7QUFTQSxJQUFNQywwQ0FBaUIsU0FBakJBLGNBQWlCO0FBQUEsTUFBRVAsSUFBRixTQUFFQSxJQUFGO0FBQUEsTUFBUUMsSUFBUixTQUFRQSxJQUFSO0FBQUEsTUFBY0MsSUFBZCxTQUFjQSxJQUFkO0FBQUEsTUFBb0JDLElBQXBCLFNBQW9CQSxJQUFwQjtBQUFBLFNBQ3pCSCxLQUFLTSxRQURvQixTQUNSTCxLQUFLSyxRQURHLFNBQ1NKLEtBQUtJLFFBRGQsU0FDMEJKLEtBQUtJLFFBRC9CO0FBQUEsQ0FBdkI7O0FBR0EsSUFBTUUsa0RBQXFCLENBQUMsTUFBRCxFQUFTLE1BQVQsRUFBaUIsTUFBakIsRUFBeUIsTUFBekIsQ0FBM0I7O0FBRUEsSUFBTUMsMENBQWlCO0FBQzVCQyxXQUFTLFNBRG1CO0FBRTVCQyxhQUFXLFdBRmlCO0FBRzVCQyxjQUFZLFlBSGdCO0FBSTVCQyxhQUFXLGtCQUppQjtBQUs1QkMsZUFBYSxhQUxlO0FBTTVCLGtCQUFnQjtBQU5ZLENBQXZCOztJQVNjQyxROzs7QUFDbkIsb0JBQVlDLEtBQVosRUFBbUI7QUFBQTs7QUFBQSxrSUFDWEEsS0FEVzs7QUFFakIsVUFBS0MsaUJBQUwsQ0FBdUJSLGNBQXZCO0FBQ0EsVUFBS1MsV0FBTCxHQUFtQixzQkFBUW5CLGNBQVIsRUFBd0JRLGNBQXhCLENBQW5CO0FBSGlCO0FBSWxCOzs7O29DQXNEZVksQyxFQUFHQyxPLEVBQVNDLGEsRUFBZUMsWSxFQUF3QjtBQUFBOztBQUFBLFVBQVZDLEdBQVUsdUVBQUosRUFBSTtBQUFBLG9CQVc3RCxLQUFLQyxNQVh3RDtBQUFBLFVBRS9EQyxVQUYrRCxXQUUvREEsVUFGK0Q7QUFBQSxVQUcvREMsV0FIK0QsV0FHL0RBLFdBSCtEO0FBQUEsVUFJL0RDLFVBSitELFdBSS9EQSxVQUorRDtBQUFBLFVBSy9EQyxLQUwrRCxXQUsvREEsS0FMK0Q7QUFBQSxVQU0vREMsT0FOK0QsV0FNL0RBLE9BTitEO0FBQUEsVUFPL0RDLFNBUCtELFdBTy9EQSxTQVArRDtBQUFBLFVBUS9EQyxTQVIrRCxXQVEvREEsU0FSK0Q7QUFBQSxVQVMvREMsVUFUK0QsV0FTL0RBLFVBVCtEO0FBQUEsc0NBVS9EQyxTQVYrRDtBQUFBLFVBVW5EcEIsU0FWbUQscUJBVW5EQSxTQVZtRDtBQUFBLFVBVXhDRCxVQVZ3QyxxQkFVeENBLFVBVndDO0FBQUEsVUFVNUJFLFdBVjRCLHFCQVU1QkEsV0FWNEI7O0FBYWpFOztBQUNBLFVBQU1vQixTQUNKUCxjQUNBLEtBQUtRLGtCQUFMLENBQ0VWLFVBREYsRUFFRUMsV0FGRixFQUdFZCxXQUFXd0IsTUFBWCxDQUFrQkMsR0FBbEIsQ0FBc0JDLG9CQUF0QixDQUhGLENBRkY7O0FBUUE7QUFDQSxVQUFNQyxTQUNKVCxhQUFhLEtBQUtLLGtCQUFMLENBQXdCSixTQUF4QixFQUFtQ0MsVUFBbkMsRUFBK0NuQixTQUEvQyxDQURmOztBQUdBLFVBQU1LLGNBQWMsS0FBS0EsV0FBTCxDQUFpQlcsT0FBakIsQ0FBcEI7O0FBRUEsVUFBSSxDQUFDUCxZQUFELElBQWlCQSxhQUFhSixXQUFiLEtBQTZCQSxXQUFsRCxFQUErRDtBQUM3RCxhQUFLc0IsZUFBTCxDQUFxQnBCLE9BQXJCLEVBQThCRixXQUE5QjtBQUNEOztBQUVELFVBQUliLGFBQUo7QUFDQSxVQUNFaUIsZ0JBQ0FBLGFBQWFqQixJQURiLElBRUFrQixJQUFJa0IsUUFGSixJQUdBbkIsYUFBYUosV0FBYixLQUE2QkEsV0FKL0IsRUFLRTtBQUNBYixlQUFPaUIsYUFBYWpCLElBQXBCO0FBQ0QsT0FQRCxNQU9PO0FBQ0xBLGVBQU9nQixjQUFjcUIsTUFBZCxDQUFxQixVQUFDQyxJQUFELEVBQU9DLEtBQVAsRUFBaUI7QUFDM0MsY0FBTUMsTUFBTTNCLFlBQVksRUFBQ2IsTUFBTWUsUUFBUXdCLEtBQVIsQ0FBUCxFQUFaLENBQVo7O0FBRUE7QUFDQTtBQUNBLGNBQUksQ0FBQ0MsSUFBSUMsS0FBSixDQUFVQyxPQUFPQyxRQUFqQixDQUFMLEVBQWlDO0FBQy9CLG1CQUFPTCxJQUFQO0FBQ0Q7O0FBRURBLGVBQUtNLElBQUwsQ0FBVTtBQUNSTCx3QkFEUTtBQUVSTSw0QkFBZ0IsQ0FBQ0wsSUFBSSxDQUFKLENBQUQsRUFBU0EsSUFBSSxDQUFKLENBQVQsRUFBaUJBLElBQUksQ0FBSixDQUFqQixDQUZSO0FBR1JNLDRCQUFnQixDQUFDTixJQUFJLENBQUosQ0FBRCxFQUFTQSxJQUFJLENBQUosQ0FBVCxFQUFpQkEsSUFBSSxDQUFKLENBQWpCLENBSFI7QUFJUnhDLGtCQUFNZSxRQUFRd0IsS0FBUjtBQUpFLFdBQVY7O0FBT0EsaUJBQU9ELElBQVA7QUFDRCxTQWpCTSxFQWlCSixFQWpCSSxDQUFQO0FBa0JEOztBQUVELFVBQU1TLGlCQUFpQixTQUFqQkEsY0FBaUI7QUFBQSxlQUNyQmIsU0FBUyxPQUFLYyxzQkFBTCxDQUE0QmQsTUFBNUIsRUFBb0NuQyxFQUFFQyxJQUF0QyxFQUE0Q3lCLFNBQTVDLENBQVQsR0FBa0UsQ0FEN0M7QUFBQSxPQUF2Qjs7QUFHQSxVQUFNd0IsV0FBVyxTQUFYQSxRQUFXO0FBQUEsZUFDZnBCLFNBQVMsT0FBS21CLHNCQUFMLENBQTRCbkIsTUFBNUIsRUFBb0M5QixFQUFFQyxJQUF0QyxFQUE0Q3NCLFVBQTVDLENBQVQsR0FBbUVDLEtBRHBEO0FBQUEsT0FBakI7O0FBR0EsVUFBTTJCLGlCQUFpQixTQUFqQkEsY0FBaUI7QUFBQSxlQUNyQnJCLFNBQ0ksT0FBS21CLHNCQUFMLENBQTRCbkIsTUFBNUIsRUFBb0M5QixFQUFFQyxJQUF0QyxFQUE0Q3NCLFVBQTVDLENBREosR0FFSWIsZUFBZWMsS0FIRTtBQUFBLE9BQXZCOztBQUtBLGFBQU87QUFDTHZCLGtCQURLO0FBRUxpRCwwQkFGSztBQUdMRSx3QkFBZ0JGLFFBSFg7QUFJTEMsc0NBSks7QUFLTEg7QUFMSyxPQUFQO0FBT0Q7OztvQ0FFZWhDLE8sRUFBU0YsVyxFQUFhO0FBQ3BDO0FBQ0EsVUFBTXVDLFVBQVUsS0FBS0MsZUFBTCxDQUFxQnRDLE9BQXJCLEVBQThCLGFBQUs7QUFDakQsWUFBTXlCLE1BQU0zQixZQUFZLEVBQUNiLE1BQU1ELENBQVAsRUFBWixDQUFaO0FBQ0EsZUFBTyxDQUFDeUMsSUFBSSxDQUFKLENBQUQsRUFBU0EsSUFBSSxDQUFKLENBQVQsQ0FBUDtBQUNELE9BSGUsQ0FBaEI7O0FBS0EsVUFBTWMsVUFBVSxLQUFLRCxlQUFMLENBQXFCdEMsT0FBckIsRUFBOEIsYUFBSztBQUNqRCxZQUFNeUIsTUFBTTNCLFlBQVksRUFBQ2IsTUFBTUQsQ0FBUCxFQUFaLENBQVo7QUFDQSxlQUFPLENBQUN5QyxJQUFJLENBQUosQ0FBRCxFQUFTQSxJQUFJLENBQUosQ0FBVCxDQUFQO0FBQ0QsT0FIZSxDQUFoQjs7QUFLQSxVQUFNZSxTQUFTLENBQ2JDLEtBQUtDLEdBQUwsQ0FBU0wsUUFBUSxDQUFSLENBQVQsRUFBcUJFLFFBQVEsQ0FBUixDQUFyQixDQURhLEVBRWJFLEtBQUtDLEdBQUwsQ0FBU0wsUUFBUSxDQUFSLENBQVQsRUFBcUJFLFFBQVEsQ0FBUixDQUFyQixDQUZhLEVBR2JFLEtBQUtFLEdBQUwsQ0FBU04sUUFBUSxDQUFSLENBQVQsRUFBcUJFLFFBQVEsQ0FBUixDQUFyQixDQUhhLEVBSWJFLEtBQUtFLEdBQUwsQ0FBU04sUUFBUSxDQUFSLENBQVQsRUFBcUJFLFFBQVEsQ0FBUixDQUFyQixDQUphLENBQWY7O0FBT0EsV0FBS0ssVUFBTCxDQUFnQixFQUFDSixjQUFELEVBQWhCO0FBQ0Q7Ozt1Q0FTRTtBQUFBLFVBTkR2RCxJQU1DLFNBTkRBLElBTUM7QUFBQSxVQUxENEQsR0FLQyxTQUxEQSxHQUtDO0FBQUEsVUFKREMsZ0JBSUMsU0FKREEsZ0JBSUM7QUFBQSxVQUhEQyxhQUdDLFNBSERBLGFBR0M7QUFBQSxVQUZEQyxRQUVDLFNBRkRBLFFBRUM7QUFBQSxVQUREQyxpQkFDQyxTQUREQSxpQkFDQztBQUFBLFVBQ01DLEtBRE4sR0FDZUQsaUJBRGYsQ0FDTUMsS0FETjs7O0FBR0QsVUFBTUMsc0JBQXNCO0FBQzFCM0MsZUFBTyxLQUFLSixNQUFMLENBQVlJLEtBRE87QUFFMUJELG9CQUFZLEtBQUtILE1BQUwsQ0FBWUcsVUFGRTtBQUcxQmYsb0JBQVksS0FBS1ksTUFBTCxDQUFZUyxTQUFaLENBQXNCckIsVUFIUjtBQUkxQmEsb0JBQVksS0FBS0QsTUFBTCxDQUFZQztBQUpFLE9BQTVCOztBQU9BLGFBQU87QUFDTDtBQUNBLFVBQUkrQywwQkFBSiw0QkFDS04sZ0JBREwsRUFFSzdELElBRkw7QUFHRW9FLFlBQUksS0FBS0EsRUFIWDtBQUlFUixnQkFKRjtBQUtFUyxxQkFBYUosTUFBTTlDLE1BQU4sQ0FBYW1ELElBQWIsR0FBb0IsSUFMbkM7QUFNRUMscUJBQWEsSUFOZjtBQU9FQyxxQkFBYSxJQVBmO0FBUUVDLHdCQUFnQlIsTUFBTVMsT0FSeEI7QUFTRUMsY0FBTSxLQUFLeEQsTUFBTCxDQUFZUyxTQUFaLENBQXNCLGNBQXRCLENBVFI7QUFVRXZCLGlCQUFTLEtBQUtjLE1BQUwsQ0FBWVMsU0FBWixDQUFzQnZCLE9BVmpDO0FBV0V1RSxrQkFBVSxJQVhaO0FBWUVDLHFCQUFhLEtBQUsxRCxNQUFMLENBQVkyRCxjQVozQjtBQWFFQyxxQkFBYSxLQUFLNUQsTUFBTCxDQUFZUyxTQUFaLENBQXNCdEIsU0FickM7QUFjRTBFLHdCQUFnQjtBQUNkakMsMEJBQWdCO0FBQ2R0Qix1QkFBVyxLQUFLTixNQUFMLENBQVlNLFNBRFQ7QUFFZGpCLHVCQUFXLEtBQUtXLE1BQUwsQ0FBWVMsU0FBWixDQUFzQnBCO0FBRm5CLFdBREY7QUFLZHlDLG9CQUFVaUIsbUJBTEk7QUFNZGYsMEJBQWdCZSxtQkFORjtBQU9kaEIsMEJBQWdCZ0I7QUFQRjtBQWRsQixTQUZLLENBQVA7QUEyQkQ7Ozt3QkF2TVU7QUFDVCxhQUFPLEtBQVA7QUFDRDs7O3dCQUVrQjtBQUNqQixhQUFPLEtBQVA7QUFDRDs7O3dCQUVlO0FBQ2QsYUFBT2Usc0JBQVA7QUFDRDs7O3dCQUUwQjtBQUN6QixhQUFPOUUsa0JBQVA7QUFDRDs7O3dCQUVpQjtBQUNoQixhQUFPLEtBQUsrRSxzQkFBWjtBQUNEOzs7d0JBRW9CO0FBQ25CO0FBRUVaLHlDQUNLLHNIQUFxQkEsSUFEMUI7QUFFRWEsb0JBQVU7QUFGWjtBQUZGO0FBT0Q7OztpREFFK0M7QUFBQSxtQ0FBbEJDLFVBQWtCO0FBQUEsVUFBbEJBLFVBQWtCLG9DQUFMLEVBQUs7O0FBQzlDLFVBQUlBLFdBQVdDLE1BQVgsR0FBb0IsQ0FBeEIsRUFBMkI7QUFDekIsZUFBTyxFQUFQO0FBQ0Q7QUFDRCxVQUFNMUUsUUFBUTtBQUNaWSxlQUFPLDBCQUFTK0QscUNBQW9CQyxPQUE3QjtBQURLLE9BQWQ7O0FBSUE7QUFDQTVFLFlBQU1hLE9BQU4sR0FBZ0I7QUFDZDdCLGNBQU15RixXQUFXLENBQVgsRUFBY0ksSUFBZCxDQUFtQkMsR0FEWDtBQUVkN0YsY0FBTXdGLFdBQVcsQ0FBWCxFQUFjSSxJQUFkLENBQW1CRSxHQUZYO0FBR2Q3RixjQUFNdUYsV0FBVyxDQUFYLEVBQWNJLElBQWQsQ0FBbUJDLEdBSFg7QUFJZDNGLGNBQU1zRixXQUFXLENBQVgsRUFBY0ksSUFBZCxDQUFtQkU7QUFKWCxPQUFoQjtBQU1BL0UsWUFBTWdGLEtBQU4sR0FBaUJQLFdBQVcsQ0FBWCxFQUFjUSxXQUEvQixZQUNFUixXQUFXLENBQVgsRUFBY1EsV0FEaEI7O0FBSUEsYUFBT2pGLEtBQVA7QUFDRDs7O0VBekRtQ2tGLG1COztrQkFBakJuRixRIiwiZmlsZSI6ImFyYy1sYXllci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgMjAxOCBVYmVyIFRlY2hub2xvZ2llcywgSW5jLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbi8vIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbi8vIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbi8vIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbi8vIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuLy8gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuLy8gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4vLyBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbi8vIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbi8vIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4vLyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4vLyBUSEUgU09GVFdBUkUuXG5cbmltcG9ydCBtZW1vaXplIGZyb20gJ2xvZGFzaC5tZW1vaXplJztcblxuaW1wb3J0IExheWVyIGZyb20gJy4uL2Jhc2UtbGF5ZXInO1xuaW1wb3J0IEFyY0JydXNoaW5nTGF5ZXIgZnJvbSAnZGVja2dsLWxheWVycy9hcmMtYnJ1c2hpbmctbGF5ZXIvYXJjLWJydXNoaW5nLWxheWVyJztcbmltcG9ydCB7aGV4VG9SZ2J9IGZyb20gJ3V0aWxzL2NvbG9yLXV0aWxzJztcbmltcG9ydCBBcmNMYXllckljb24gZnJvbSAnLi9hcmMtbGF5ZXItaWNvbic7XG5pbXBvcnQge0RFRkFVTFRfTEFZRVJfQ09MT1J9IGZyb20gJ2NvbnN0YW50cy9kZWZhdWx0LXNldHRpbmdzJztcblxuZXhwb3J0IGNvbnN0IGFyY1Bvc0FjY2Vzc29yID0gKHtsYXQwLCBsbmcwLCBsYXQxLCBsbmcxfSkgPT4gZCA9PiBbXG4gIGQuZGF0YVtsbmcwLmZpZWxkSWR4XSxcbiAgZC5kYXRhW2xhdDAuZmllbGRJZHhdLFxuICAwLFxuICBkLmRhdGFbbG5nMS5maWVsZElkeF0sXG4gIGQuZGF0YVtsYXQxLmZpZWxkSWR4XSxcbiAgMFxuXTtcblxuZXhwb3J0IGNvbnN0IGFyY1Bvc1Jlc29sdmVyID0gKHtsYXQwLCBsbmcwLCBsYXQxLCBsbmcxfSkgPT5cbiAgYCR7bGF0MC5maWVsZElkeH0tJHtsbmcwLmZpZWxkSWR4fS0ke2xhdDEuZmllbGRJZHh9LSR7bGF0MS5maWVsZElkeH19YDtcblxuZXhwb3J0IGNvbnN0IGFyY1JlcXVpcmVkQ29sdW1ucyA9IFsnbGF0MCcsICdsbmcwJywgJ2xhdDEnLCAnbG5nMSddO1xuXG5leHBvcnQgY29uc3QgYXJjdFZpc0NvbmZpZ3MgPSB7XG4gIG9wYWNpdHk6ICdvcGFjaXR5JyxcbiAgdGhpY2tuZXNzOiAndGhpY2tuZXNzJyxcbiAgY29sb3JSYW5nZTogJ2NvbG9yUmFuZ2UnLFxuICBzaXplUmFuZ2U6ICdzdHJva2VXaWR0aFJhbmdlJyxcbiAgdGFyZ2V0Q29sb3I6ICd0YXJnZXRDb2xvcicsXG4gICdoaS1wcmVjaXNpb24nOiAnaGktcHJlY2lzaW9uJ1xufTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXJjTGF5ZXIgZXh0ZW5kcyBMYXllciB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMucmVnaXN0ZXJWaXNDb25maWcoYXJjdFZpc0NvbmZpZ3MpO1xuICAgIHRoaXMuZ2V0UG9zaXRpb24gPSBtZW1vaXplKGFyY1Bvc0FjY2Vzc29yLCBhcmNQb3NSZXNvbHZlcik7XG4gIH1cblxuICBnZXQgdHlwZSgpIHtcbiAgICByZXR1cm4gJ2FyYyc7XG4gIH1cblxuICBnZXQgaXNBZ2dyZWdhdGVkKCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGdldCBsYXllckljb24oKSB7XG4gICAgcmV0dXJuIEFyY0xheWVySWNvbjtcbiAgfVxuXG4gIGdldCByZXF1aXJlZExheWVyQ29sdW1ucygpIHtcbiAgICByZXR1cm4gYXJjUmVxdWlyZWRDb2x1bW5zO1xuICB9XG5cbiAgZ2V0IGNvbHVtblBhaXJzKCkge1xuICAgIHJldHVybiB0aGlzLmRlZmF1bHRMaW5rQ29sdW1uUGFpcnM7XG4gIH1cblxuICBnZXQgdmlzdWFsQ2hhbm5lbHMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIC4uLnN1cGVyLnZpc3VhbENoYW5uZWxzLFxuICAgICAgc2l6ZToge1xuICAgICAgICAuLi5zdXBlci52aXN1YWxDaGFubmVscy5zaXplLFxuICAgICAgICBwcm9wZXJ0eTogJ3N0cm9rZSdcbiAgICAgIH1cbiAgICB9O1xuICB9XG5cbiAgc3RhdGljIGZpbmREZWZhdWx0TGF5ZXJQcm9wcyh7ZmllbGRQYWlycyA9IFtdfSkge1xuICAgIGlmIChmaWVsZFBhaXJzLmxlbmd0aCA8IDIpIHtcbiAgICAgIHJldHVybiBbXTtcbiAgICB9XG4gICAgY29uc3QgcHJvcHMgPSB7XG4gICAgICBjb2xvcjogaGV4VG9SZ2IoREVGQVVMVF9MQVlFUl9DT0xPUi50cmlwQXJjKVxuICAgIH07XG5cbiAgICAvLyBjb25uZWN0IHRoZSBmaXJzdCB0d28gcG9pbnQgbGF5ZXIgd2l0aCBhcmNcbiAgICBwcm9wcy5jb2x1bW5zID0ge1xuICAgICAgbGF0MDogZmllbGRQYWlyc1swXS5wYWlyLmxhdCxcbiAgICAgIGxuZzA6IGZpZWxkUGFpcnNbMF0ucGFpci5sbmcsXG4gICAgICBsYXQxOiBmaWVsZFBhaXJzWzFdLnBhaXIubGF0LFxuICAgICAgbG5nMTogZmllbGRQYWlyc1sxXS5wYWlyLmxuZ1xuICAgIH07XG4gICAgcHJvcHMubGFiZWwgPSBgJHtmaWVsZFBhaXJzWzBdLmRlZmF1bHROYW1lfSAtPiAke1xuICAgICAgZmllbGRQYWlyc1sxXS5kZWZhdWx0TmFtZVxuICAgIH0gYXJjYDtcblxuICAgIHJldHVybiBwcm9wcztcbiAgfVxuXG4gIGZvcm1hdExheWVyRGF0YShfLCBhbGxEYXRhLCBmaWx0ZXJlZEluZGV4LCBvbGRMYXllckRhdGEsIG9wdCA9IHt9KSB7XG4gICAgY29uc3Qge1xuICAgICAgY29sb3JTY2FsZSxcbiAgICAgIGNvbG9yRG9tYWluLFxuICAgICAgY29sb3JGaWVsZCxcbiAgICAgIGNvbG9yLFxuICAgICAgY29sdW1ucyxcbiAgICAgIHNpemVGaWVsZCxcbiAgICAgIHNpemVTY2FsZSxcbiAgICAgIHNpemVEb21haW4sXG4gICAgICB2aXNDb25maWc6IHtzaXplUmFuZ2UsIGNvbG9yUmFuZ2UsIHRhcmdldENvbG9yfVxuICAgIH0gPSB0aGlzLmNvbmZpZztcblxuICAgIC8vIGFyYyBjb2xvclxuICAgIGNvbnN0IGNTY2FsZSA9XG4gICAgICBjb2xvckZpZWxkICYmXG4gICAgICB0aGlzLmdldFZpc0NoYW5uZWxTY2FsZShcbiAgICAgICAgY29sb3JTY2FsZSxcbiAgICAgICAgY29sb3JEb21haW4sXG4gICAgICAgIGNvbG9yUmFuZ2UuY29sb3JzLm1hcChoZXhUb1JnYilcbiAgICAgICk7XG5cbiAgICAvLyBhcmMgdGhpY2tuZXNzXG4gICAgY29uc3Qgc1NjYWxlID1cbiAgICAgIHNpemVGaWVsZCAmJiB0aGlzLmdldFZpc0NoYW5uZWxTY2FsZShzaXplU2NhbGUsIHNpemVEb21haW4sIHNpemVSYW5nZSk7XG5cbiAgICBjb25zdCBnZXRQb3NpdGlvbiA9IHRoaXMuZ2V0UG9zaXRpb24oY29sdW1ucyk7XG5cbiAgICBpZiAoIW9sZExheWVyRGF0YSB8fCBvbGRMYXllckRhdGEuZ2V0UG9zaXRpb24gIT09IGdldFBvc2l0aW9uKSB7XG4gICAgICB0aGlzLnVwZGF0ZUxheWVyTWV0YShhbGxEYXRhLCBnZXRQb3NpdGlvbik7XG4gICAgfVxuXG4gICAgbGV0IGRhdGE7XG4gICAgaWYgKFxuICAgICAgb2xkTGF5ZXJEYXRhICYmXG4gICAgICBvbGRMYXllckRhdGEuZGF0YSAmJlxuICAgICAgb3B0LnNhbWVEYXRhICYmXG4gICAgICBvbGRMYXllckRhdGEuZ2V0UG9zaXRpb24gPT09IGdldFBvc2l0aW9uXG4gICAgKSB7XG4gICAgICBkYXRhID0gb2xkTGF5ZXJEYXRhLmRhdGE7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRhdGEgPSBmaWx0ZXJlZEluZGV4LnJlZHVjZSgoYWNjdSwgaW5kZXgpID0+IHtcbiAgICAgICAgY29uc3QgcG9zID0gZ2V0UG9zaXRpb24oe2RhdGE6IGFsbERhdGFbaW5kZXhdfSk7XG5cbiAgICAgICAgLy8gaWYgZG9lc24ndCBoYXZlIHBvaW50IGxhdCBvciBsbmcsIGRvIG5vdCBhZGQgdGhlIGFyY1xuICAgICAgICAvLyBkZWNrLmdsIGNhbid0IGhhbmRsZSBwb3NpdGlvbiA9PSBudWxsXG4gICAgICAgIGlmICghcG9zLmV2ZXJ5KE51bWJlci5pc0Zpbml0ZSkpIHtcbiAgICAgICAgICByZXR1cm4gYWNjdTtcbiAgICAgICAgfVxuXG4gICAgICAgIGFjY3UucHVzaCh7XG4gICAgICAgICAgaW5kZXgsXG4gICAgICAgICAgc291cmNlUG9zaXRpb246IFtwb3NbMF0sIHBvc1sxXSwgcG9zWzJdXSxcbiAgICAgICAgICB0YXJnZXRQb3NpdGlvbjogW3Bvc1szXSwgcG9zWzRdLCBwb3NbNV1dLFxuICAgICAgICAgIGRhdGE6IGFsbERhdGFbaW5kZXhdXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBhY2N1O1xuICAgICAgfSwgW10pO1xuICAgIH1cblxuICAgIGNvbnN0IGdldFN0cm9rZVdpZHRoID0gZCA9PlxuICAgICAgc1NjYWxlID8gdGhpcy5nZXRFbmNvZGVkQ2hhbm5lbFZhbHVlKHNTY2FsZSwgZC5kYXRhLCBzaXplRmllbGQpIDogMTtcblxuICAgIGNvbnN0IGdldENvbG9yID0gZCA9PlxuICAgICAgY1NjYWxlID8gdGhpcy5nZXRFbmNvZGVkQ2hhbm5lbFZhbHVlKGNTY2FsZSwgZC5kYXRhLCBjb2xvckZpZWxkKSA6IGNvbG9yO1xuXG4gICAgY29uc3QgZ2V0VGFyZ2V0Q29sb3IgPSBkID0+XG4gICAgICBjU2NhbGVcbiAgICAgICAgPyB0aGlzLmdldEVuY29kZWRDaGFubmVsVmFsdWUoY1NjYWxlLCBkLmRhdGEsIGNvbG9yRmllbGQpXG4gICAgICAgIDogdGFyZ2V0Q29sb3IgfHwgY29sb3I7XG5cbiAgICByZXR1cm4ge1xuICAgICAgZGF0YSxcbiAgICAgIGdldENvbG9yLFxuICAgICAgZ2V0U291cmNlQ29sb3I6IGdldENvbG9yLFxuICAgICAgZ2V0VGFyZ2V0Q29sb3IsXG4gICAgICBnZXRTdHJva2VXaWR0aFxuICAgIH07XG4gIH1cblxuICB1cGRhdGVMYXllck1ldGEoYWxsRGF0YSwgZ2V0UG9zaXRpb24pIHtcbiAgICAvLyBnZXQgYm91bmRzIGZyb20gYXJjc1xuICAgIGNvbnN0IHNCb3VuZHMgPSB0aGlzLmdldFBvaW50c0JvdW5kcyhhbGxEYXRhLCBkID0+IHtcbiAgICAgIGNvbnN0IHBvcyA9IGdldFBvc2l0aW9uKHtkYXRhOiBkfSk7XG4gICAgICByZXR1cm4gW3Bvc1swXSwgcG9zWzFdXTtcbiAgICB9KTtcblxuICAgIGNvbnN0IHRCb3VuZHMgPSB0aGlzLmdldFBvaW50c0JvdW5kcyhhbGxEYXRhLCBkID0+IHtcbiAgICAgIGNvbnN0IHBvcyA9IGdldFBvc2l0aW9uKHtkYXRhOiBkfSk7XG4gICAgICByZXR1cm4gW3Bvc1szXSwgcG9zWzRdXTtcbiAgICB9KTtcblxuICAgIGNvbnN0IGJvdW5kcyA9IFtcbiAgICAgIE1hdGgubWluKHNCb3VuZHNbMF0sIHRCb3VuZHNbMF0pLFxuICAgICAgTWF0aC5taW4oc0JvdW5kc1sxXSwgdEJvdW5kc1sxXSksXG4gICAgICBNYXRoLm1heChzQm91bmRzWzJdLCB0Qm91bmRzWzJdKSxcbiAgICAgIE1hdGgubWF4KHNCb3VuZHNbM10sIHRCb3VuZHNbM10pXG4gICAgXTtcblxuICAgIHRoaXMudXBkYXRlTWV0YSh7Ym91bmRzfSk7XG4gIH1cblxuICByZW5kZXJMYXllcih7XG4gICAgZGF0YSxcbiAgICBpZHgsXG4gICAgbGF5ZXJJbnRlcmFjdGlvbixcbiAgICBvYmplY3RIb3ZlcmVkLFxuICAgIG1hcFN0YXRlLFxuICAgIGludGVyYWN0aW9uQ29uZmlnXG4gIH0pIHtcbiAgICBjb25zdCB7YnJ1c2h9ID0gaW50ZXJhY3Rpb25Db25maWc7XG5cbiAgICBjb25zdCBjb2xvclVwZGF0ZVRyaWdnZXJzID0ge1xuICAgICAgY29sb3I6IHRoaXMuY29uZmlnLmNvbG9yLFxuICAgICAgY29sb3JGaWVsZDogdGhpcy5jb25maWcuY29sb3JGaWVsZCxcbiAgICAgIGNvbG9yUmFuZ2U6IHRoaXMuY29uZmlnLnZpc0NvbmZpZy5jb2xvclJhbmdlLFxuICAgICAgY29sb3JTY2FsZTogdGhpcy5jb25maWcuY29sb3JTY2FsZVxuICAgIH07XG5cbiAgICByZXR1cm4gW1xuICAgICAgLy8gYmFzZSBsYXllclxuICAgICAgbmV3IEFyY0JydXNoaW5nTGF5ZXIoe1xuICAgICAgICAuLi5sYXllckludGVyYWN0aW9uLFxuICAgICAgICAuLi5kYXRhLFxuICAgICAgICBpZDogdGhpcy5pZCxcbiAgICAgICAgaWR4LFxuICAgICAgICBicnVzaFJhZGl1czogYnJ1c2guY29uZmlnLnNpemUgKiAxMDAwLFxuICAgICAgICBicnVzaFNvdXJjZTogdHJ1ZSxcbiAgICAgICAgYnJ1c2hUYXJnZXQ6IHRydWUsXG4gICAgICAgIGVuYWJsZUJydXNoaW5nOiBicnVzaC5lbmFibGVkLFxuICAgICAgICBmcDY0OiB0aGlzLmNvbmZpZy52aXNDb25maWdbJ2hpLXByZWNpc2lvbiddLFxuICAgICAgICBvcGFjaXR5OiB0aGlzLmNvbmZpZy52aXNDb25maWcub3BhY2l0eSxcbiAgICAgICAgcGlja2FibGU6IHRydWUsXG4gICAgICAgIHBpY2tlZENvbG9yOiB0aGlzLmNvbmZpZy5oaWdobGlnaHRDb2xvcixcbiAgICAgICAgc3Ryb2tlU2NhbGU6IHRoaXMuY29uZmlnLnZpc0NvbmZpZy50aGlja25lc3MsXG4gICAgICAgIHVwZGF0ZVRyaWdnZXJzOiB7XG4gICAgICAgICAgZ2V0U3Ryb2tlV2lkdGg6IHtcbiAgICAgICAgICAgIHNpemVGaWVsZDogdGhpcy5jb25maWcuc2l6ZUZpZWxkLFxuICAgICAgICAgICAgc2l6ZVJhbmdlOiB0aGlzLmNvbmZpZy52aXNDb25maWcuc2l6ZVJhbmdlXG4gICAgICAgICAgfSxcbiAgICAgICAgICBnZXRDb2xvcjogY29sb3JVcGRhdGVUcmlnZ2VycyxcbiAgICAgICAgICBnZXRTb3VyY2VDb2xvcjogY29sb3JVcGRhdGVUcmlnZ2VycyxcbiAgICAgICAgICBnZXRUYXJnZXRDb2xvcjogY29sb3JVcGRhdGVUcmlnZ2Vyc1xuICAgICAgICB9XG4gICAgICB9KVxuICAgIF07XG4gIH1cbn1cbiJdfQ==