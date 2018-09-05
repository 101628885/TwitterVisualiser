'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.visStateSchema = exports.visStateSchemaV1 = exports.visStateSchemaV0 = exports.propertiesV1 = exports.propertiesV0 = exports.filterPropsV1 = exports.DimensionFieldSchema = exports.filterPropsV0 = exports.layerPropsV1 = exports.layerPropsV0 = exports.dimensionPropsV0 = undefined;

var _extends11 = require('babel-runtime/helpers/extends');

var _extends12 = _interopRequireDefault(_extends11);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _visStateSchema; // Copyright (c) 2018 Uber Technologies, Inc.
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

var _lodash = require('lodash.pick');

var _lodash2 = _interopRequireDefault(_lodash);

var _versions = require('./versions');

var _filterUtils = require('../utils/filter-utils');

var _schema = require('./schema');

var _schema2 = _interopRequireDefault(_schema);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * V0 Schema
 */

var dimensionPropsV0 = exports.dimensionPropsV0 = ['name', 'type'];

// in v0 geojson there is only sizeField

// in v1 geojson
// stroke base on -> sizeField
// height based on -> heightField
// radius based on -> radiusField
// here we make our wiredst guess on which channel sizeField belongs to
function geojsonSizeFieldV0ToV1(config) {
  var defaultRaiuds = 10;
  var defaultRadiusRange = [0, 50];

  // if extruded, sizeField is most likely used for height
  if (config.visConfig.extruded) {
    return 'heightField';
  }

  // if show stroke enabled, sizeField is most likely used for stroke
  if (config.visConfig.stroked) {
    return 'sizeField';
  }

  // if radius changed, or radius Range Changed, sizeField is most likely used for radius
  // this is the most unreliable guess, that's why we put it in the end
  if (config.visConfig.radius !== defaultRaiuds || config.visConfig.radiusRange.some(function (d, i) {
    return d !== defaultRadiusRange[i];
  })) {
    return 'radiusField';
  }

  return 'sizeField';
}

// convert v0 to v1 layer config

var DimensionFieldSchemaV0 = function (_Schema) {
  (0, _inherits3.default)(DimensionFieldSchemaV0, _Schema);

  function DimensionFieldSchemaV0() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, DimensionFieldSchemaV0);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = DimensionFieldSchemaV0.__proto__ || Object.getPrototypeOf(DimensionFieldSchemaV0)).call.apply(_ref, [this].concat(args))), _this), _this.version = _versions.VERSIONS.v0, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(DimensionFieldSchemaV0, [{
    key: 'save',
    value: function save(field, config) {
      // should not be called anymore
      return (0, _defineProperty3.default)({}, this.key, field !== null ? this.savePropertiesOrApplySchema(field)[this.key] : null);
    }
  }, {
    key: 'load',
    value: function load(field, config, accumulated) {
      var fieldName = this.key;
      if (config.type === 'geojson' && this.key === 'sizeField' && field) {
        fieldName = geojsonSizeFieldV0ToV1(config);
      }
      // fold into visualChannels to be load by VisualChannelSchemaV1
      return {
        visualChannels: (0, _extends12.default)({}, accumulated.visualChannels || {}, (0, _defineProperty3.default)({}, fieldName, field))
      };
    }
  }]);
  return DimensionFieldSchemaV0;
}(_schema2.default);

var DimensionScaleSchemaV0 = function (_Schema2) {
  (0, _inherits3.default)(DimensionScaleSchemaV0, _Schema2);

  function DimensionScaleSchemaV0() {
    var _ref3;

    var _temp2, _this2, _ret2;

    (0, _classCallCheck3.default)(this, DimensionScaleSchemaV0);

    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    return _ret2 = (_temp2 = (_this2 = (0, _possibleConstructorReturn3.default)(this, (_ref3 = DimensionScaleSchemaV0.__proto__ || Object.getPrototypeOf(DimensionScaleSchemaV0)).call.apply(_ref3, [this].concat(args))), _this2), _this2.version = _versions.VERSIONS.v0, _temp2), (0, _possibleConstructorReturn3.default)(_this2, _ret2);
  }

  (0, _createClass3.default)(DimensionScaleSchemaV0, [{
    key: 'save',
    value: function save(scale) {
      return (0, _defineProperty3.default)({}, this.key, scale);
    }
  }, {
    key: 'load',
    value: function load(scale, config, accumulated) {
      // fold into visualChannels to be load by VisualChannelSchemaV1
      if (this.key === 'sizeScale' && config.type === 'geojson') {
        // sizeScale now split into radiusScale, heightScale
        // no user customization, just use default
        return {};
      }

      return {
        visualChannels: (0, _extends12.default)({}, accumulated.visualChannels || {}, (0, _defineProperty3.default)({}, this.key, scale))
      };
    }
  }]);
  return DimensionScaleSchemaV0;
}(_schema2.default);

// used to convert v0 to v1 layer config


var LayerConfigSchemaV0 = function (_Schema3) {
  (0, _inherits3.default)(LayerConfigSchemaV0, _Schema3);

  function LayerConfigSchemaV0() {
    var _ref5;

    var _temp3, _this3, _ret3;

    (0, _classCallCheck3.default)(this, LayerConfigSchemaV0);

    for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      args[_key3] = arguments[_key3];
    }

    return _ret3 = (_temp3 = (_this3 = (0, _possibleConstructorReturn3.default)(this, (_ref5 = LayerConfigSchemaV0.__proto__ || Object.getPrototypeOf(LayerConfigSchemaV0)).call.apply(_ref5, [this].concat(args))), _this3), _this3.version = _versions.VERSIONS.v0, _temp3), (0, _possibleConstructorReturn3.default)(_this3, _ret3);
  }

  (0, _createClass3.default)(LayerConfigSchemaV0, [{
    key: 'load',
    value: function load(saved, layer, accumulated) {
      // fold v0 layer property into config.key
      return {
        config: (0, _extends12.default)({}, accumulated.config || {}, (0, _defineProperty3.default)({}, this.key, saved))
      };
    }
  }]);
  return LayerConfigSchemaV0;
}(_schema2.default);

// used to convert v0 to v1 layer columns
// only return column value for each column


var LayerColumnsSchemaV0 = function (_Schema4) {
  (0, _inherits3.default)(LayerColumnsSchemaV0, _Schema4);

  function LayerColumnsSchemaV0() {
    var _ref6;

    var _temp4, _this4, _ret4;

    (0, _classCallCheck3.default)(this, LayerColumnsSchemaV0);

    for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
      args[_key4] = arguments[_key4];
    }

    return _ret4 = (_temp4 = (_this4 = (0, _possibleConstructorReturn3.default)(this, (_ref6 = LayerColumnsSchemaV0.__proto__ || Object.getPrototypeOf(LayerColumnsSchemaV0)).call.apply(_ref6, [this].concat(args))), _this4), _this4.version = _versions.VERSIONS.v0, _temp4), (0, _possibleConstructorReturn3.default)(_this4, _ret4);
  }

  (0, _createClass3.default)(LayerColumnsSchemaV0, [{
    key: 'load',
    value: function load(saved, layer, accumulated) {
      // fold v0 layer property into config.key, flatten columns
      return {
        config: (0, _extends12.default)({}, accumulated.config || {}, {
          columns: Object.keys(saved).reduce(function (accu, key) {
            return (0, _extends12.default)({}, accu, (0, _defineProperty3.default)({}, key, saved[key].value));
          }, {})
        })
      };
    }
  }]);
  return LayerColumnsSchemaV0;
}(_schema2.default);

// used to convert v0 to v1 layer config.visConfig


var LayerConfigToVisConfigSchemaV0 = function (_Schema5) {
  (0, _inherits3.default)(LayerConfigToVisConfigSchemaV0, _Schema5);

  function LayerConfigToVisConfigSchemaV0() {
    var _ref7;

    var _temp5, _this5, _ret5;

    (0, _classCallCheck3.default)(this, LayerConfigToVisConfigSchemaV0);

    for (var _len5 = arguments.length, args = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
      args[_key5] = arguments[_key5];
    }

    return _ret5 = (_temp5 = (_this5 = (0, _possibleConstructorReturn3.default)(this, (_ref7 = LayerConfigToVisConfigSchemaV0.__proto__ || Object.getPrototypeOf(LayerConfigToVisConfigSchemaV0)).call.apply(_ref7, [this].concat(args))), _this5), _this5.version = _versions.VERSIONS.v0, _temp5), (0, _possibleConstructorReturn3.default)(_this5, _ret5);
  }

  (0, _createClass3.default)(LayerConfigToVisConfigSchemaV0, [{
    key: 'load',
    value: function load(saved, layer, accumulated) {
      // fold v0 layer property into config.visConfig
      var accumulatedConfig = accumulated.config || {};
      return {
        config: (0, _extends12.default)({}, accumulatedConfig, {
          visConfig: (0, _extends12.default)({}, accumulatedConfig.visConfig || {}, (0, _defineProperty3.default)({}, this.key, saved))
        })
      };
    }
  }]);
  return LayerConfigToVisConfigSchemaV0;
}(_schema2.default);

var LayerVisConfigSchemaV0 = function (_Schema6) {
  (0, _inherits3.default)(LayerVisConfigSchemaV0, _Schema6);

  function LayerVisConfigSchemaV0() {
    var _ref8;

    var _temp6, _this6, _ret6;

    (0, _classCallCheck3.default)(this, LayerVisConfigSchemaV0);

    for (var _len6 = arguments.length, args = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
      args[_key6] = arguments[_key6];
    }

    return _ret6 = (_temp6 = (_this6 = (0, _possibleConstructorReturn3.default)(this, (_ref8 = LayerVisConfigSchemaV0.__proto__ || Object.getPrototypeOf(LayerVisConfigSchemaV0)).call.apply(_ref8, [this].concat(args))), _this6), _this6.version = _versions.VERSIONS.v0, _this6.key = 'visConfig', _temp6), (0, _possibleConstructorReturn3.default)(_this6, _ret6);
  }

  (0, _createClass3.default)(LayerVisConfigSchemaV0, [{
    key: 'load',
    value: function load(visConfig, config, accumulator) {
      var rename = {
        geojson: {
          extruded: 'enable3d',
          elevationRange: 'heightRange'
        }
      };

      if (config.type in rename) {
        var propToRename = rename[config.type];
        return {
          config: (0, _extends12.default)({}, accumulator.config || {}, {
            visConfig: Object.keys(visConfig).reduce(function (accu, key) {
              return (0, _extends12.default)({}, accu, propToRename[key] ? (0, _defineProperty3.default)({}, propToRename[key], visConfig[key]) : (0, _defineProperty3.default)({}, key, visConfig[key]));
            }, {})
          })
        };
      }

      return {
        config: (0, _extends12.default)({}, accumulator.config || {}, {
          visConfig: visConfig
        })
      };
    }
  }]);
  return LayerVisConfigSchemaV0;
}(_schema2.default);

var LayerConfigSchemaDeleteV0 = function (_Schema7) {
  (0, _inherits3.default)(LayerConfigSchemaDeleteV0, _Schema7);

  function LayerConfigSchemaDeleteV0() {
    var _ref11;

    var _temp7, _this7, _ret7;

    (0, _classCallCheck3.default)(this, LayerConfigSchemaDeleteV0);

    for (var _len7 = arguments.length, args = Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
      args[_key7] = arguments[_key7];
    }

    return _ret7 = (_temp7 = (_this7 = (0, _possibleConstructorReturn3.default)(this, (_ref11 = LayerConfigSchemaDeleteV0.__proto__ || Object.getPrototypeOf(LayerConfigSchemaDeleteV0)).call.apply(_ref11, [this].concat(args))), _this7), _this7.version = _versions.VERSIONS.v0, _temp7), (0, _possibleConstructorReturn3.default)(_this7, _ret7);
  }

  (0, _createClass3.default)(LayerConfigSchemaDeleteV0, [{
    key: 'load',
    value: function load(value) {
      return {};
    }
  }]);
  return LayerConfigSchemaDeleteV0;
}(_schema2.default);

/**
 * V0 -> V1 Changes
 * - layer is now a class
 * - config saved in a config object
 * - id, type, isAggregated is outside layer.config
 * - visualChannels is outside config, it defines available visual channel and
 *   property names for field, scale, domain and range of each visual chanel.
 * - enable3d, colorAggregation and sizeAggregation are moved into visConfig
 * - GeojsonLayer - added height, radius specific properties
 */

var layerPropsV0 = exports.layerPropsV0 = {
  id: null,
  type: null,

  // move into layer.config
  dataId: new LayerConfigSchemaV0({ key: 'dataId' }),
  label: new LayerConfigSchemaV0({ key: 'label' }),
  color: new LayerConfigSchemaV0({ key: 'color' }),
  isVisible: new LayerConfigSchemaV0({ key: 'isVisible' }),

  // convert visConfig
  visConfig: new LayerVisConfigSchemaV0({ key: 'visConfig' }),

  // move into layer.config
  // flatten
  columns: new LayerColumnsSchemaV0(),

  // save into visualChannels
  colorField: new DimensionFieldSchemaV0({
    properties: dimensionPropsV0,
    key: 'colorField'
  }),
  colorScale: new DimensionScaleSchemaV0({
    key: 'colorScale'
  }),
  sizeField: new DimensionFieldSchemaV0({
    properties: dimensionPropsV0,
    key: 'sizeField'
  }),
  sizeScale: new DimensionScaleSchemaV0({
    key: 'sizeScale'
  }),

  // move into config.visConfig
  enable3d: new LayerConfigToVisConfigSchemaV0({ key: 'enable3d' }),
  colorAggregation: new LayerConfigToVisConfigSchemaV0({
    key: 'colorAggregation'
  }),
  sizeAggregation: new LayerConfigToVisConfigSchemaV0({ key: 'sizeAggregation' }),

  // delete
  isAggregated: new LayerConfigSchemaDeleteV0()
};

/**
 * V1 Schema
 */

var ColumnSchemaV1 = function (_Schema8) {
  (0, _inherits3.default)(ColumnSchemaV1, _Schema8);

  function ColumnSchemaV1() {
    (0, _classCallCheck3.default)(this, ColumnSchemaV1);
    return (0, _possibleConstructorReturn3.default)(this, (ColumnSchemaV1.__proto__ || Object.getPrototypeOf(ColumnSchemaV1)).apply(this, arguments));
  }

  (0, _createClass3.default)(ColumnSchemaV1, [{
    key: 'save',
    value: function save(columns, state) {
      // starting from v1, only save column value
      // fieldIdx will be calculated during merge
      return (0, _defineProperty3.default)({}, this.key, Object.keys(columns).reduce(function (accu, ckey) {
        return (0, _extends12.default)({}, accu, (0, _defineProperty3.default)({}, ckey, columns[ckey].value));
      }, {}));
    }
  }, {
    key: 'load',
    value: function load(columns) {
      return { columns: columns };
    }
  }]);
  return ColumnSchemaV1;
}(_schema2.default);

/**
 * V1: save [field]: {name, type}, [scale]: '' for each channel
 */


var VisualChannelSchemaV1 = function (_Schema9) {
  (0, _inherits3.default)(VisualChannelSchemaV1, _Schema9);

  function VisualChannelSchemaV1() {
    (0, _classCallCheck3.default)(this, VisualChannelSchemaV1);
    return (0, _possibleConstructorReturn3.default)(this, (VisualChannelSchemaV1.__proto__ || Object.getPrototypeOf(VisualChannelSchemaV1)).apply(this, arguments));
  }

  (0, _createClass3.default)(VisualChannelSchemaV1, [{
    key: 'save',
    value: function save(visualChannels, layer) {
      // only save field and scale of each channel
      return (0, _defineProperty3.default)({}, this.key, Object.keys(visualChannels).reduce(
      //  save channel to null if didn't select any field
      function (accu, key) {
        var _extends8;

        return (0, _extends12.default)({}, accu, (_extends8 = {}, (0, _defineProperty3.default)(_extends8, visualChannels[key].field, layer.config[visualChannels[key].field] ? (0, _lodash2.default)(layer.config[visualChannels[key].field], ['name', 'type']) : null), (0, _defineProperty3.default)(_extends8, visualChannels[key].scale, layer.config[visualChannels[key].scale]), _extends8));
      }, {}));
    }
  }, {
    key: 'load',
    value: function load(vc, layer, accumulator) {
      // fold channels into config
      return (0, _extends12.default)({}, accumulator, {
        config: (0, _extends12.default)({}, accumulator.config || {}, vc)
      });
    }
  }]);
  return VisualChannelSchemaV1;
}(_schema2.default);

var layerPropsV1 = exports.layerPropsV1 = {
  id: null,
  type: null,
  config: new _schema2.default({
    version: _versions.VERSIONS.v1,
    key: 'config',
    properties: {
      dataId: null,
      label: null,
      color: null,
      columns: new ColumnSchemaV1({
        version: _versions.VERSIONS.v1,
        key: 'columns'
      }),
      isVisible: null,
      visConfig: null
    }
  }),
  visualChannels: new VisualChannelSchemaV1({
    version: _versions.VERSIONS.v1,
    key: 'visualChannels'
  })
};

var LayerSchemaV0 = function (_Schema10) {
  (0, _inherits3.default)(LayerSchemaV0, _Schema10);

  function LayerSchemaV0() {
    var _ref14;

    var _temp8, _this10, _ret8;

    (0, _classCallCheck3.default)(this, LayerSchemaV0);

    for (var _len8 = arguments.length, args = Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
      args[_key8] = arguments[_key8];
    }

    return _ret8 = (_temp8 = (_this10 = (0, _possibleConstructorReturn3.default)(this, (_ref14 = LayerSchemaV0.__proto__ || Object.getPrototypeOf(LayerSchemaV0)).call.apply(_ref14, [this].concat(args))), _this10), _this10.key = 'layers', _temp8), (0, _possibleConstructorReturn3.default)(_this10, _ret8);
  }

  (0, _createClass3.default)(LayerSchemaV0, [{
    key: 'save',
    value: function save(layers, visState) {
      var _this11 = this;

      return (0, _defineProperty3.default)({}, this.key, visState.layerOrder.reduce(function (saved, index) {
        // save layers according to their rendering order
        var layer = layers[index];
        if (layer.isValidToSave()) {
          saved.push(_this11.savePropertiesOrApplySchema(layer).layers);
        }
        return saved;
      }, []));
    }
  }, {
    key: 'load',
    value: function load(layers, visState) {
      var _this12 = this;

      return (0, _defineProperty3.default)({}, this.key, layers.map(function (layer) {
        return _this12.loadPropertiesOrApplySchema(layer, layers).layers;
      }));
    }
  }]);
  return LayerSchemaV0;
}(_schema2.default);

var FilterSchemaV0 = function (_Schema11) {
  (0, _inherits3.default)(FilterSchemaV0, _Schema11);

  function FilterSchemaV0() {
    var _ref17;

    var _temp9, _this13, _ret9;

    (0, _classCallCheck3.default)(this, FilterSchemaV0);

    for (var _len9 = arguments.length, args = Array(_len9), _key9 = 0; _key9 < _len9; _key9++) {
      args[_key9] = arguments[_key9];
    }

    return _ret9 = (_temp9 = (_this13 = (0, _possibleConstructorReturn3.default)(this, (_ref17 = FilterSchemaV0.__proto__ || Object.getPrototypeOf(FilterSchemaV0)).call.apply(_ref17, [this].concat(args))), _this13), _this13.key = 'filters', _temp9), (0, _possibleConstructorReturn3.default)(_this13, _ret9);
  }

  (0, _createClass3.default)(FilterSchemaV0, [{
    key: 'save',
    value: function save(filters) {
      var _this14 = this;

      return {
        filters: filters.filter(_filterUtils.isValidFilterValue).map(function (filter) {
          return _this14.savePropertiesOrApplySchema(filter, _this14.properties).filters;
        })
      };
    }
  }, {
    key: 'load',
    value: function load(filters) {
      return { filters: filters };
    }
  }]);
  return FilterSchemaV0;
}(_schema2.default);

var interactionPropsV0 = ['tooltip', 'brush'];

var InteractionSchemaV0 = function (_Schema12) {
  (0, _inherits3.default)(InteractionSchemaV0, _Schema12);

  function InteractionSchemaV0() {
    var _ref18;

    var _temp10, _this15, _ret10;

    (0, _classCallCheck3.default)(this, InteractionSchemaV0);

    for (var _len10 = arguments.length, args = Array(_len10), _key10 = 0; _key10 < _len10; _key10++) {
      args[_key10] = arguments[_key10];
    }

    return _ret10 = (_temp10 = (_this15 = (0, _possibleConstructorReturn3.default)(this, (_ref18 = InteractionSchemaV0.__proto__ || Object.getPrototypeOf(InteractionSchemaV0)).call.apply(_ref18, [this].concat(args))), _this15), _this15.key = 'interactionConfig', _temp10), (0, _possibleConstructorReturn3.default)(_this15, _ret10);
  }

  (0, _createClass3.default)(InteractionSchemaV0, [{
    key: 'save',
    value: function save(interactionConfig) {
      return (0, _defineProperty3.default)({}, this.key, this.properties.reduce(function (accu, key) {
        return (0, _extends12.default)({}, accu, interactionConfig[key].enabled ? (0, _defineProperty3.default)({}, key, interactionConfig[key].config) : {});
      }, {}));
    }
  }, {
    key: 'load',
    value: function load(interactionConfig) {
      // convert v0 -> v1
      // return enabled: false if disabled,
      return (0, _defineProperty3.default)({}, this.key, this.properties.reduce(function (accu, key) {
        return (0, _extends12.default)({}, accu, (0, _defineProperty3.default)({}, key, (0, _extends12.default)({}, interactionConfig[key] || {}, {
          enabled: Boolean(interactionConfig[key])
        })));
      }, {}));
    }
  }]);
  return InteractionSchemaV0;
}(_schema2.default);

var InteractionSchemaV1 = function (_Schema13) {
  (0, _inherits3.default)(InteractionSchemaV1, _Schema13);

  function InteractionSchemaV1() {
    var _ref22;

    var _temp11, _this16, _ret11;

    (0, _classCallCheck3.default)(this, InteractionSchemaV1);

    for (var _len11 = arguments.length, args = Array(_len11), _key11 = 0; _key11 < _len11; _key11++) {
      args[_key11] = arguments[_key11];
    }

    return _ret11 = (_temp11 = (_this16 = (0, _possibleConstructorReturn3.default)(this, (_ref22 = InteractionSchemaV1.__proto__ || Object.getPrototypeOf(InteractionSchemaV1)).call.apply(_ref22, [this].concat(args))), _this16), _this16.key = 'interactionConfig', _temp11), (0, _possibleConstructorReturn3.default)(_this16, _ret11);
  }

  (0, _createClass3.default)(InteractionSchemaV1, [{
    key: 'save',
    value: function save(interactionConfig) {
      // save config even if disabled,
      return (0, _defineProperty3.default)({}, this.key, this.properties.reduce(function (accu, key) {
        return (0, _extends12.default)({}, accu, (0, _defineProperty3.default)({}, key, (0, _extends12.default)({}, interactionConfig[key].config, {
          enabled: interactionConfig[key].enabled
        })));
      }, {}));
    }
  }, {
    key: 'load',
    value: function load(interactionConfig) {
      return (0, _defineProperty3.default)({}, this.key, interactionConfig);
    }
  }]);
  return InteractionSchemaV1;
}(_schema2.default);

var filterPropsV0 = exports.filterPropsV0 = {
  dataId: null,
  id: null,
  name: null,
  type: null,
  value: null,
  enlarged: null
};

var DimensionFieldSchema = exports.DimensionFieldSchema = function (_Schema14) {
  (0, _inherits3.default)(DimensionFieldSchema, _Schema14);

  function DimensionFieldSchema() {
    (0, _classCallCheck3.default)(this, DimensionFieldSchema);
    return (0, _possibleConstructorReturn3.default)(this, (DimensionFieldSchema.__proto__ || Object.getPrototypeOf(DimensionFieldSchema)).apply(this, arguments));
  }

  (0, _createClass3.default)(DimensionFieldSchema, [{
    key: 'save',
    value: function save(field) {
      return (0, _defineProperty3.default)({}, this.key, field ? this.savePropertiesOrApplySchema(field)[this.key] : null);
    }
  }, {
    key: 'load',
    value: function load(field) {
      return (0, _defineProperty3.default)({}, this.key, field);
    }
  }]);
  return DimensionFieldSchema;
}(_schema2.default);

var filterPropsV1 = exports.filterPropsV1 = (0, _extends12.default)({}, filterPropsV0, {
  plotType: null,
  yAxis: new DimensionFieldSchema({
    version: _versions.VERSIONS.v1,
    key: 'yAxis',
    properties: {
      name: null,
      type: null
    }
  })
});

var propertiesV0 = exports.propertiesV0 = {
  filters: new FilterSchemaV0({
    version: _versions.VERSIONS.v0,
    properties: filterPropsV0
  }),
  layers: new LayerSchemaV0({
    version: _versions.VERSIONS.v0,
    properties: layerPropsV0
  }),
  interactionConfig: new InteractionSchemaV0({
    version: _versions.VERSIONS.v0,
    properties: interactionPropsV0
  }),
  layerBlending: null
};

var propertiesV1 = exports.propertiesV1 = {
  filters: new FilterSchemaV0({
    version: _versions.VERSIONS.v1,
    properties: filterPropsV1
  }),
  layers: new LayerSchemaV0({
    version: _versions.VERSIONS.v1,
    properties: layerPropsV1
  }),
  interactionConfig: new InteractionSchemaV1({
    version: _versions.VERSIONS.v1,
    properties: interactionPropsV0
  }),
  layerBlending: null,
  splitMaps: null
};

var visStateSchemaV0 = exports.visStateSchemaV0 = new _schema2.default({
  version: _versions.VERSIONS.v0,
  properties: propertiesV0,
  key: 'visState'
});

var visStateSchemaV1 = exports.visStateSchemaV1 = new _schema2.default({
  version: _versions.VERSIONS.v1,
  properties: propertiesV1,
  key: 'visState'
});

var visStateSchema = exports.visStateSchema = (_visStateSchema = {}, (0, _defineProperty3.default)(_visStateSchema, _versions.VERSIONS.v0, {
  save: function save(toSave) {
    return visStateSchemaV0.save(toSave);
  },
  load: function load(toLoad) {
    return visStateSchemaV1.load(visStateSchemaV0.load(toLoad).visState);
  }
}), (0, _defineProperty3.default)(_visStateSchema, _versions.VERSIONS.v1, visStateSchemaV1), _visStateSchema);

// test load v0
exports.default = visStateSchema;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zY2hlbWFzL3Zpcy1zdGF0ZS1zY2hlbWEuanMiXSwibmFtZXMiOlsiZGltZW5zaW9uUHJvcHNWMCIsImdlb2pzb25TaXplRmllbGRWMFRvVjEiLCJjb25maWciLCJkZWZhdWx0UmFpdWRzIiwiZGVmYXVsdFJhZGl1c1JhbmdlIiwidmlzQ29uZmlnIiwiZXh0cnVkZWQiLCJzdHJva2VkIiwicmFkaXVzIiwicmFkaXVzUmFuZ2UiLCJzb21lIiwiZCIsImkiLCJEaW1lbnNpb25GaWVsZFNjaGVtYVYwIiwidmVyc2lvbiIsIlZFUlNJT05TIiwidjAiLCJmaWVsZCIsImtleSIsInNhdmVQcm9wZXJ0aWVzT3JBcHBseVNjaGVtYSIsImFjY3VtdWxhdGVkIiwiZmllbGROYW1lIiwidHlwZSIsInZpc3VhbENoYW5uZWxzIiwiU2NoZW1hIiwiRGltZW5zaW9uU2NhbGVTY2hlbWFWMCIsInNjYWxlIiwiTGF5ZXJDb25maWdTY2hlbWFWMCIsInNhdmVkIiwibGF5ZXIiLCJMYXllckNvbHVtbnNTY2hlbWFWMCIsImNvbHVtbnMiLCJPYmplY3QiLCJrZXlzIiwicmVkdWNlIiwiYWNjdSIsInZhbHVlIiwiTGF5ZXJDb25maWdUb1Zpc0NvbmZpZ1NjaGVtYVYwIiwiYWNjdW11bGF0ZWRDb25maWciLCJMYXllclZpc0NvbmZpZ1NjaGVtYVYwIiwiYWNjdW11bGF0b3IiLCJyZW5hbWUiLCJnZW9qc29uIiwiZWxldmF0aW9uUmFuZ2UiLCJwcm9wVG9SZW5hbWUiLCJMYXllckNvbmZpZ1NjaGVtYURlbGV0ZVYwIiwibGF5ZXJQcm9wc1YwIiwiaWQiLCJkYXRhSWQiLCJsYWJlbCIsImNvbG9yIiwiaXNWaXNpYmxlIiwiY29sb3JGaWVsZCIsInByb3BlcnRpZXMiLCJjb2xvclNjYWxlIiwic2l6ZUZpZWxkIiwic2l6ZVNjYWxlIiwiZW5hYmxlM2QiLCJjb2xvckFnZ3JlZ2F0aW9uIiwic2l6ZUFnZ3JlZ2F0aW9uIiwiaXNBZ2dyZWdhdGVkIiwiQ29sdW1uU2NoZW1hVjEiLCJzdGF0ZSIsImNrZXkiLCJWaXN1YWxDaGFubmVsU2NoZW1hVjEiLCJ2YyIsImxheWVyUHJvcHNWMSIsInYxIiwiTGF5ZXJTY2hlbWFWMCIsImxheWVycyIsInZpc1N0YXRlIiwibGF5ZXJPcmRlciIsImluZGV4IiwiaXNWYWxpZFRvU2F2ZSIsInB1c2giLCJtYXAiLCJsb2FkUHJvcGVydGllc09yQXBwbHlTY2hlbWEiLCJGaWx0ZXJTY2hlbWFWMCIsImZpbHRlcnMiLCJmaWx0ZXIiLCJpc1ZhbGlkRmlsdGVyVmFsdWUiLCJpbnRlcmFjdGlvblByb3BzVjAiLCJJbnRlcmFjdGlvblNjaGVtYVYwIiwiaW50ZXJhY3Rpb25Db25maWciLCJlbmFibGVkIiwiQm9vbGVhbiIsIkludGVyYWN0aW9uU2NoZW1hVjEiLCJmaWx0ZXJQcm9wc1YwIiwibmFtZSIsImVubGFyZ2VkIiwiRGltZW5zaW9uRmllbGRTY2hlbWEiLCJmaWx0ZXJQcm9wc1YxIiwicGxvdFR5cGUiLCJ5QXhpcyIsInByb3BlcnRpZXNWMCIsImxheWVyQmxlbmRpbmciLCJwcm9wZXJ0aWVzVjEiLCJzcGxpdE1hcHMiLCJ2aXNTdGF0ZVNjaGVtYVYwIiwidmlzU3RhdGVTY2hlbWFWMSIsInZpc1N0YXRlU2NoZW1hIiwic2F2ZSIsInRvU2F2ZSIsImxvYWQiLCJ0b0xvYWQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7cUJBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7QUFDQTs7QUFDQTs7QUFFQTs7Ozs7O0FBRUE7Ozs7QUFJTyxJQUFNQSw4Q0FBbUIsQ0FBQyxNQUFELEVBQVMsTUFBVCxDQUF6Qjs7QUFFUDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBU0Msc0JBQVQsQ0FBZ0NDLE1BQWhDLEVBQXdDO0FBQ3RDLE1BQU1DLGdCQUFnQixFQUF0QjtB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QUFkZSxDQUFyQjs7QUFpQkEsSUFBTUMsOENBQW1CLElBQUkxRSxnQkFBSixDQUFXO0FBQ3pDVixXQUFTQyxtQkFBU0MsRUFEdUI7QUFFekNxQyxjQUFZeUMsWUFGNkI7QUFHekM1RSxPQUFLO0FBSG9DLENBQVgsQ0FBekI7O0FBTUEsSUFBTWlGLDhDQUFtQixJQUFJM0UsZ0JBQUosQ0FBVztBQUN6Q1YsV0FBU0MsbUJBQVNvRCxFQUR1QjtBQUV6Q2QsY0FBWTJDLFlBRjZCO0FBR3pDOUUsT0FBSztBQUhvQyxDQUFYLENBQXpCOztBQU1BLElBQU1rRixnSEFDVnJGLG1CQUFTQyxFQURDLEVBQ0k7QUFDYnFGLFFBQU07QUFBQSxXQUFVSCxpQkFBaUJHLElBQWpCLENBQXNCQyxNQUF0QixDQUFWO0FBQUEsR0FETztBQUViQyxRQUFNO0FBQUEsV0FDSkosaUJBQWlCSSxJQUFqQixDQUFzQkwsaUJBQWlCSyxJQUFqQixDQUFzQkMsTUFBdEIsRUFBOEJsQyxRQUFwRCxDQURJO0FBQUE7QUFGTyxDQURKLGtEQU1WdkQsbUJBQVNvRCxFQU5DLEVBTUlnQyxnQkFOSixtQkFBTjs7QUFTUDtrQkFDZUMsYyIsImZpbGUiOiJ2aXMtc3RhdGUtc2NoZW1hLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSAyMDE4IFViZXIgVGVjaG5vbG9naWVzLCBJbmMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuLy8gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuLy8gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuLy8gdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuLy8gY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4vLyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4vLyBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4vLyBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbi8vIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuLy8gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuLy8gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbi8vIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbi8vIFRIRSBTT0ZUV0FSRS5cblxuaW1wb3J0IHBpY2sgZnJvbSAnbG9kYXNoLnBpY2snO1xuaW1wb3J0IHtWRVJTSU9OU30gZnJvbSAnLi92ZXJzaW9ucyc7XG5pbXBvcnQge2lzVmFsaWRGaWx0ZXJWYWx1ZX0gZnJvbSAndXRpbHMvZmlsdGVyLXV0aWxzJztcblxuaW1wb3J0IFNjaGVtYSBmcm9tICcuL3NjaGVtYSc7XG5cbi8qKlxuICogVjAgU2NoZW1hXG4gKi9cblxuZXhwb3J0IGNvbnN0IGRpbWVuc2lvblByb3BzVjAgPSBbJ25hbWUnLCAndHlwZSddO1xuXG4vLyBpbiB2MCBnZW9qc29uIHRoZXJlIGlzIG9ubHkgc2l6ZUZpZWxkXG5cbi8vIGluIHYxIGdlb2pzb25cbi8vIHN0cm9rZSBiYXNlIG9uIC0+IHNpemVGaWVsZFxuLy8gaGVpZ2h0IGJhc2VkIG9uIC0+IGhlaWdodEZpZWxkXG4vLyByYWRpdXMgYmFzZWQgb24gLT4gcmFkaXVzRmllbGRcbi8vIGhlcmUgd2UgbWFrZSBvdXIgd2lyZWRzdCBndWVzcyBvbiB3aGljaCBjaGFubmVsIHNpemVGaWVsZCBiZWxvbmdzIHRvXG5mdW5jdGlvbiBnZW9qc29uU2l6ZUZpZWxkVjBUb1YxKGNvbmZpZykge1xuICBjb25zdCBkZWZhdWx0UmFpdWRzID0gMTA7XG4gIGNvbnN0IGRlZmF1bHRSYWRpdXNSYW5nZSA9IFswLCA1MF07XG5cbiAgLy8gaWYgZXh0cnVkZWQsIHNpemVGaWVsZCBpcyBtb3N0IGxpa2VseSB1c2VkIGZvciBoZWlnaHRcbiAgaWYgKGNvbmZpZy52aXNDb25maWcuZXh0cnVkZWQpIHtcbiAgICByZXR1cm4gJ2hlaWdodEZpZWxkJztcbiAgfVxuXG4gIC8vIGlmIHNob3cgc3Ryb2tlIGVuYWJsZWQsIHNpemVGaWVsZCBpcyBtb3N0IGxpa2VseSB1c2VkIGZvciBzdHJva2VcbiAgaWYgKGNvbmZpZy52aXNDb25maWcuc3Ryb2tlZCkge1xuICAgIHJldHVybiAnc2l6ZUZpZWxkJztcbiAgfVxuXG4gIC8vIGlmIHJhZGl1cyBjaGFuZ2VkLCBvciByYWRpdXMgUmFuZ2UgQ2hhbmdlZCwgc2l6ZUZpZWxkIGlzIG1vc3QgbGlrZWx5IHVzZWQgZm9yIHJhZGl1c1xuICAvLyB0aGlzIGlzIHRoZSBtb3N0IHVucmVsaWFibGUgZ3Vlc3MsIHRoYXQncyB3aHkgd2UgcHV0IGl0IGluIHRoZSBlbmRcbiAgaWYgKFxuICAgIGNvbmZpZy52aXNDb25maWcucmFkaXVzICE9PSBkZWZhdWx0UmFpdWRzIHx8XG4gICAgY29uZmlnLnZpc0NvbmZpZy5yYWRpdXNSYW5nZS5zb21lKChkLCBpKSA9PiBkICE9PSBkZWZhdWx0UmFkaXVzUmFuZ2VbaV0pXG4gICkge1xuICAgIHJldHVybiAncmFkaXVzRmllbGQnO1xuICB9XG5cbiAgcmV0dXJuICdzaXplRmllbGQnO1xufVxuXG4vLyBjb252ZXJ0IHYwIHRvIHYxIGxheWVyIGNvbmZpZ1xuY2xhc3MgRGltZW5zaW9uRmllbGRTY2hlbWFWMCBleHRlbmRzIFNjaGVtYSB7XG4gIHZlcnNpb24gPSBWRVJTSU9OUy52MDtcbiAgc2F2ZShmaWVsZCwgY29uZmlnKSB7XG4gICAgLy8gc2hvdWxkIG5vdCBiZSBjYWxsZWQgYW55bW9yZVxuICAgIHJldHVybiB7XG4gICAgICBbdGhpcy5rZXldOlxuICAgICAgICBmaWVsZCAhPT0gbnVsbFxuICAgICAgICAgID8gdGhpcy5zYXZlUHJvcGVydGllc09yQXBwbHlTY2hlbWEoZmllbGQpW3RoaXMua2V5XVxuICAgICAgICAgIDogbnVsbFxuICAgIH07XG4gIH1cblxuICBsb2FkKGZpZWxkLCBjb25maWcsIGFjY3VtdWxhdGVkKSB7XG4gICAgbGV0IGZpZWxkTmFtZSA9IHRoaXMua2V5O1xuICAgIGlmIChjb25maWcudHlwZSA9PT0gJ2dlb2pzb24nICYmIHRoaXMua2V5ID09PSAnc2l6ZUZpZWxkJyAmJiBmaWVsZCkge1xuICAgICAgZmllbGROYW1lID0gZ2VvanNvblNpemVGaWVsZFYwVG9WMShjb25maWcpO1xuICAgIH1cbiAgICAvLyBmb2xkIGludG8gdmlzdWFsQ2hhbm5lbHMgdG8gYmUgbG9hZCBieSBWaXN1YWxDaGFubmVsU2NoZW1hVjFcbiAgICByZXR1cm4ge1xuICAgICAgdmlzdWFsQ2hhbm5lbHM6IHtcbiAgICAgICAgLi4uKGFjY3VtdWxhdGVkLnZpc3VhbENoYW5uZWxzIHx8IHt9KSxcbiAgICAgICAgW2ZpZWxkTmFtZV06IGZpZWxkXG4gICAgICB9XG4gICAgfTtcbiAgfVxufVxuXG5jbGFzcyBEaW1lbnNpb25TY2FsZVNjaGVtYVYwIGV4dGVuZHMgU2NoZW1hIHtcbiAgdmVyc2lvbiA9IFZFUlNJT05TLnYwO1xuICBzYXZlKHNjYWxlKSB7XG4gICAgcmV0dXJuIHtbdGhpcy5rZXldOiBzY2FsZX07XG4gIH1cbiAgbG9hZChzY2FsZSwgY29uZmlnLCBhY2N1bXVsYXRlZCkge1xuICAgIC8vIGZvbGQgaW50byB2aXN1YWxDaGFubmVscyB0byBiZSBsb2FkIGJ5IFZpc3VhbENoYW5uZWxTY2hlbWFWMVxuICAgIGlmICh0aGlzLmtleSA9PT0gJ3NpemVTY2FsZScgJiYgY29uZmlnLnR5cGUgPT09ICdnZW9qc29uJykge1xuICAgICAgLy8gc2l6ZVNjYWxlIG5vdyBzcGxpdCBpbnRvIHJhZGl1c1NjYWxlLCBoZWlnaHRTY2FsZVxuICAgICAgLy8gbm8gdXNlciBjdXN0b21pemF0aW9uLCBqdXN0IHVzZSBkZWZhdWx0XG4gICAgICByZXR1cm4ge307XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIHZpc3VhbENoYW5uZWxzOiB7XG4gICAgICAgIC4uLihhY2N1bXVsYXRlZC52aXN1YWxDaGFubmVscyB8fCB7fSksXG4gICAgICAgIFt0aGlzLmtleV06IHNjYWxlXG4gICAgICB9XG4gICAgfTtcbiAgfVxufVxuXG4vLyB1c2VkIHRvIGNvbnZlcnQgdjAgdG8gdjEgbGF5ZXIgY29uZmlnXG5jbGFzcyBMYXllckNvbmZpZ1NjaGVtYVYwIGV4dGVuZHMgU2NoZW1hIHtcbiAgdmVyc2lvbiA9IFZFUlNJT05TLnYwO1xuICBsb2FkKHNhdmVkLCBsYXllciwgYWNjdW11bGF0ZWQpIHtcbiAgICAvLyBmb2xkIHYwIGxheWVyIHByb3BlcnR5IGludG8gY29uZmlnLmtleVxuICAgIHJldHVybiB7XG4gICAgICBjb25maWc6IHtcbiAgICAgICAgLi4uKGFjY3VtdWxhdGVkLmNvbmZpZyB8fCB7fSksXG4gICAgICAgIFt0aGlzLmtleV06IHNhdmVkXG4gICAgICB9XG4gICAgfTtcbiAgfVxufVxuXG4vLyB1c2VkIHRvIGNvbnZlcnQgdjAgdG8gdjEgbGF5ZXIgY29sdW1uc1xuLy8gb25seSByZXR1cm4gY29sdW1uIHZhbHVlIGZvciBlYWNoIGNvbHVtblxuY2xhc3MgTGF5ZXJDb2x1bW5zU2NoZW1hVjAgZXh0ZW5kcyBTY2hlbWEge1xuICB2ZXJzaW9uID0gVkVSU0lPTlMudjA7XG4gIGxvYWQoc2F2ZWQsIGxheWVyLCBhY2N1bXVsYXRlZCkge1xuICAgIC8vIGZvbGQgdjAgbGF5ZXIgcHJvcGVydHkgaW50byBjb25maWcua2V5LCBmbGF0dGVuIGNvbHVtbnNcbiAgICByZXR1cm4ge1xuICAgICAgY29uZmlnOiB7XG4gICAgICAgIC4uLihhY2N1bXVsYXRlZC5jb25maWcgfHwge30pLFxuICAgICAgICBjb2x1bW5zOiBPYmplY3Qua2V5cyhzYXZlZCkucmVkdWNlKFxuICAgICAgICAgIChhY2N1LCBrZXkpID0+ICh7XG4gICAgICAgICAgICAuLi5hY2N1LFxuICAgICAgICAgICAgW2tleV06IHNhdmVkW2tleV0udmFsdWVcbiAgICAgICAgICB9KSxcbiAgICAgICAgICB7fVxuICAgICAgICApXG4gICAgICB9XG4gICAgfTtcbiAgfVxufVxuXG4vLyB1c2VkIHRvIGNvbnZlcnQgdjAgdG8gdjEgbGF5ZXIgY29uZmlnLnZpc0NvbmZpZ1xuY2xhc3MgTGF5ZXJDb25maWdUb1Zpc0NvbmZpZ1NjaGVtYVYwIGV4dGVuZHMgU2NoZW1hIHtcbiAgdmVyc2lvbiA9IFZFUlNJT05TLnYwO1xuICBsb2FkKHNhdmVkLCBsYXllciwgYWNjdW11bGF0ZWQpIHtcbiAgICAvLyBmb2xkIHYwIGxheWVyIHByb3BlcnR5IGludG8gY29uZmlnLnZpc0NvbmZpZ1xuICAgIGNvbnN0IGFjY3VtdWxhdGVkQ29uZmlnID0gYWNjdW11bGF0ZWQuY29uZmlnIHx8IHt9O1xuICAgIHJldHVybiB7XG4gICAgICBjb25maWc6IHtcbiAgICAgICAgLi4uYWNjdW11bGF0ZWRDb25maWcsXG4gICAgICAgIHZpc0NvbmZpZzoge1xuICAgICAgICAgIC4uLihhY2N1bXVsYXRlZENvbmZpZy52aXNDb25maWcgfHwge30pLFxuICAgICAgICAgIFt0aGlzLmtleV06IHNhdmVkXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuICB9XG59XG5cbmNsYXNzIExheWVyVmlzQ29uZmlnU2NoZW1hVjAgZXh0ZW5kcyBTY2hlbWEge1xuICB2ZXJzaW9uID0gVkVSU0lPTlMudjA7XG4gIGtleSA9ICd2aXNDb25maWcnO1xuXG4gIGxvYWQodmlzQ29uZmlnLCBjb25maWcsIGFjY3VtdWxhdG9yKSB7XG4gICAgY29uc3QgcmVuYW1lID0ge1xuICAgICAgZ2VvanNvbjoge1xuICAgICAgICBleHRydWRlZDogJ2VuYWJsZTNkJyxcbiAgICAgICAgZWxldmF0aW9uUmFuZ2U6ICdoZWlnaHRSYW5nZSdcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgaWYgKGNvbmZpZy50eXBlIGluIHJlbmFtZSkge1xuICAgICAgY29uc3QgcHJvcFRvUmVuYW1lID0gcmVuYW1lW2NvbmZpZy50eXBlXTtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGNvbmZpZzoge1xuICAgICAgICAgIC4uLihhY2N1bXVsYXRvci5jb25maWcgfHwge30pLFxuICAgICAgICAgIHZpc0NvbmZpZzogT2JqZWN0LmtleXModmlzQ29uZmlnKS5yZWR1Y2UoXG4gICAgICAgICAgICAoYWNjdSwga2V5KSA9PiAoe1xuICAgICAgICAgICAgICAuLi5hY2N1LFxuICAgICAgICAgICAgICAuLi4ocHJvcFRvUmVuYW1lW2tleV1cbiAgICAgICAgICAgICAgICA/IHtbcHJvcFRvUmVuYW1lW2tleV1dOiB2aXNDb25maWdba2V5XX1cbiAgICAgICAgICAgICAgICA6IHtba2V5XTogdmlzQ29uZmlnW2tleV19KVxuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICB7fVxuICAgICAgICAgIClcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgY29uZmlnOiB7XG4gICAgICAgIC4uLihhY2N1bXVsYXRvci5jb25maWcgfHwge30pLFxuICAgICAgICB2aXNDb25maWdcbiAgICAgIH1cbiAgICB9O1xuICB9XG59XG5cbmNsYXNzIExheWVyQ29uZmlnU2NoZW1hRGVsZXRlVjAgZXh0ZW5kcyBTY2hlbWEge1xuICB2ZXJzaW9uID0gVkVSU0lPTlMudjA7XG4gIGxvYWQodmFsdWUpIHtcbiAgICByZXR1cm4ge307XG4gIH1cbn1cblxuLyoqXG4gKiBWMCAtPiBWMSBDaGFuZ2VzXG4gKiAtIGxheWVyIGlzIG5vdyBhIGNsYXNzXG4gKiAtIGNvbmZpZyBzYXZlZCBpbiBhIGNvbmZpZyBvYmplY3RcbiAqIC0gaWQsIHR5cGUsIGlzQWdncmVnYXRlZCBpcyBvdXRzaWRlIGxheWVyLmNvbmZpZ1xuICogLSB2aXN1YWxDaGFubmVscyBpcyBvdXRzaWRlIGNvbmZpZywgaXQgZGVmaW5lcyBhdmFpbGFibGUgdmlzdWFsIGNoYW5uZWwgYW5kXG4gKiAgIHByb3BlcnR5IG5hbWVzIGZvciBmaWVsZCwgc2NhbGUsIGRvbWFpbiBhbmQgcmFuZ2Ugb2YgZWFjaCB2aXN1YWwgY2hhbmVsLlxuICogLSBlbmFibGUzZCwgY29sb3JBZ2dyZWdhdGlvbiBhbmQgc2l6ZUFnZ3JlZ2F0aW9uIGFyZSBtb3ZlZCBpbnRvIHZpc0NvbmZpZ1xuICogLSBHZW9qc29uTGF5ZXIgLSBhZGRlZCBoZWlnaHQsIHJhZGl1cyBzcGVjaWZpYyBwcm9wZXJ0aWVzXG4gKi9cblxuZXhwb3J0IGNvbnN0IGxheWVyUHJvcHNWMCA9IHtcbiAgaWQ6IG51bGwsXG4gIHR5cGU6IG51bGwsXG5cbiAgLy8gbW92ZSBpbnRvIGxheWVyLmNvbmZpZ1xuICBkYXRhSWQ6IG5ldyBMYXllckNvbmZpZ1NjaGVtYVYwKHtrZXk6ICdkYXRhSWQnfSksXG4gIGxhYmVsOiBuZXcgTGF5ZXJDb25maWdTY2hlbWFWMCh7a2V5OiAnbGFiZWwnfSksXG4gIGNvbG9yOiBuZXcgTGF5ZXJDb25maWdTY2hlbWFWMCh7a2V5OiAnY29sb3InfSksXG4gIGlzVmlzaWJsZTogbmV3IExheWVyQ29uZmlnU2NoZW1hVjAoe2tleTogJ2lzVmlzaWJsZSd9KSxcblxuICAvLyBjb252ZXJ0IHZpc0NvbmZpZ1xuICB2aXNDb25maWc6IG5ldyBMYXllclZpc0NvbmZpZ1NjaGVtYVYwKHtrZXk6ICd2aXNDb25maWcnfSksXG5cbiAgLy8gbW92ZSBpbnRvIGxheWVyLmNvbmZpZ1xuICAvLyBmbGF0dGVuXG4gIGNvbHVtbnM6IG5ldyBMYXllckNvbHVtbnNTY2hlbWFWMCgpLFxuXG4gIC8vIHNhdmUgaW50byB2aXN1YWxDaGFubmVsc1xuICBjb2xvckZpZWxkOiBuZXcgRGltZW5zaW9uRmllbGRTY2hlbWFWMCh7XG4gICAgcHJvcGVydGllczogZGltZW5zaW9uUHJvcHNWMCxcbiAgICBrZXk6ICdjb2xvckZpZWxkJ1xuICB9KSxcbiAgY29sb3JTY2FsZTogbmV3IERpbWVuc2lvblNjYWxlU2NoZW1hVjAoe1xuICAgIGtleTogJ2NvbG9yU2NhbGUnXG4gIH0pLFxuICBzaXplRmllbGQ6IG5ldyBEaW1lbnNpb25GaWVsZFNjaGVtYVYwKHtcbiAgICBwcm9wZXJ0aWVzOiBkaW1lbnNpb25Qcm9wc1YwLFxuICAgIGtleTogJ3NpemVGaWVsZCdcbiAgfSksXG4gIHNpemVTY2FsZTogbmV3IERpbWVuc2lvblNjYWxlU2NoZW1hVjAoe1xuICAgIGtleTogJ3NpemVTY2FsZSdcbiAgfSksXG5cbiAgLy8gbW92ZSBpbnRvIGNvbmZpZy52aXNDb25maWdcbiAgZW5hYmxlM2Q6IG5ldyBMYXllckNvbmZpZ1RvVmlzQ29uZmlnU2NoZW1hVjAoe2tleTogJ2VuYWJsZTNkJ30pLFxuICBjb2xvckFnZ3JlZ2F0aW9uOiBuZXcgTGF5ZXJDb25maWdUb1Zpc0NvbmZpZ1NjaGVtYVYwKHtcbiAgICBrZXk6ICdjb2xvckFnZ3JlZ2F0aW9uJ1xuICB9KSxcbiAgc2l6ZUFnZ3JlZ2F0aW9uOiBuZXcgTGF5ZXJDb25maWdUb1Zpc0NvbmZpZ1NjaGVtYVYwKHtrZXk6ICdzaXplQWdncmVnYXRpb24nfSksXG5cbiAgLy8gZGVsZXRlXG4gIGlzQWdncmVnYXRlZDogbmV3IExheWVyQ29uZmlnU2NoZW1hRGVsZXRlVjAoKVxufTtcblxuLyoqXG4gKiBWMSBTY2hlbWFcbiAqL1xuY2xhc3MgQ29sdW1uU2NoZW1hVjEgZXh0ZW5kcyBTY2hlbWEge1xuICBzYXZlKGNvbHVtbnMsIHN0YXRlKSB7XG4gICAgLy8gc3RhcnRpbmcgZnJvbSB2MSwgb25seSBzYXZlIGNvbHVtbiB2YWx1ZVxuICAgIC8vIGZpZWxkSWR4IHdpbGwgYmUgY2FsY3VsYXRlZCBkdXJpbmcgbWVyZ2VcbiAgICByZXR1cm4ge1xuICAgICAgW3RoaXMua2V5XTogT2JqZWN0LmtleXMoY29sdW1ucykucmVkdWNlKFxuICAgICAgICAoYWNjdSwgY2tleSkgPT4gKHtcbiAgICAgICAgICAuLi5hY2N1LFxuICAgICAgICAgIFtja2V5XTogY29sdW1uc1tja2V5XS52YWx1ZVxuICAgICAgICB9KSxcbiAgICAgICAge31cbiAgICAgIClcbiAgICB9O1xuICB9XG5cbiAgbG9hZChjb2x1bW5zKSB7XG4gICAgcmV0dXJuIHtjb2x1bW5zfTtcbiAgfVxufVxuXG4vKipcbiAqIFYxOiBzYXZlIFtmaWVsZF06IHtuYW1lLCB0eXBlfSwgW3NjYWxlXTogJycgZm9yIGVhY2ggY2hhbm5lbFxuICovXG5jbGFzcyBWaXN1YWxDaGFubmVsU2NoZW1hVjEgZXh0ZW5kcyBTY2hlbWEge1xuICBzYXZlKHZpc3VhbENoYW5uZWxzLCBsYXllcikge1xuICAgIC8vIG9ubHkgc2F2ZSBmaWVsZCBhbmQgc2NhbGUgb2YgZWFjaCBjaGFubmVsXG4gICAgcmV0dXJuIHtcbiAgICAgIFt0aGlzLmtleV06IE9iamVjdC5rZXlzKHZpc3VhbENoYW5uZWxzKS5yZWR1Y2UoXG4gICAgICAgIC8vICBzYXZlIGNoYW5uZWwgdG8gbnVsbCBpZiBkaWRuJ3Qgc2VsZWN0IGFueSBmaWVsZFxuICAgICAgICAoYWNjdSwga2V5KSA9PiAoe1xuICAgICAgICAgIC4uLmFjY3UsXG4gICAgICAgICAgW3Zpc3VhbENoYW5uZWxzW2tleV0uZmllbGRdOiBsYXllci5jb25maWdbdmlzdWFsQ2hhbm5lbHNba2V5XS5maWVsZF1cbiAgICAgICAgICAgID8gcGljayhsYXllci5jb25maWdbdmlzdWFsQ2hhbm5lbHNba2V5XS5maWVsZF0sIFsnbmFtZScsICd0eXBlJ10pXG4gICAgICAgICAgICA6IG51bGwsXG4gICAgICAgICAgW3Zpc3VhbENoYW5uZWxzW2tleV0uc2NhbGVdOiBsYXllci5jb25maWdbdmlzdWFsQ2hhbm5lbHNba2V5XS5zY2FsZV1cbiAgICAgICAgfSksXG4gICAgICAgIHt9XG4gICAgICApXG4gICAgfTtcbiAgfVxuICBsb2FkKHZjLCBsYXllciwgYWNjdW11bGF0b3IpIHtcbiAgICAvLyBmb2xkIGNoYW5uZWxzIGludG8gY29uZmlnXG4gICAgcmV0dXJuIHtcbiAgICAgIC4uLmFjY3VtdWxhdG9yLFxuICAgICAgY29uZmlnOiB7XG4gICAgICAgIC4uLihhY2N1bXVsYXRvci5jb25maWcgfHwge30pLFxuICAgICAgICAuLi52Y1xuICAgICAgfVxuICAgIH07XG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IGxheWVyUHJvcHNWMSA9IHtcbiAgaWQ6IG51bGwsXG4gIHR5cGU6IG51bGwsXG4gIGNvbmZpZzogbmV3IFNjaGVtYSh7XG4gICAgdmVyc2lvbjogVkVSU0lPTlMudjEsXG4gICAga2V5OiAnY29uZmlnJyxcbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICBkYXRhSWQ6IG51bGwsXG4gICAgICBsYWJlbDogbnVsbCxcbiAgICAgIGNvbG9yOiBudWxsLFxuICAgICAgY29sdW1uczogbmV3IENvbHVtblNjaGVtYVYxKHtcbiAgICAgICAgdmVyc2lvbjogVkVSU0lPTlMudjEsXG4gICAgICAgIGtleTogJ2NvbHVtbnMnXG4gICAgICB9KSxcbiAgICAgIGlzVmlzaWJsZTogbnVsbCxcbiAgICAgIHZpc0NvbmZpZzogbnVsbFxuICAgIH1cbiAgfSksXG4gIHZpc3VhbENoYW5uZWxzOiBuZXcgVmlzdWFsQ2hhbm5lbFNjaGVtYVYxKHtcbiAgICB2ZXJzaW9uOiBWRVJTSU9OUy52MSxcbiAgICBrZXk6ICd2aXN1YWxDaGFubmVscydcbiAgfSlcbn07XG5cbmNsYXNzIExheWVyU2NoZW1hVjAgZXh0ZW5kcyBTY2hlbWEge1xuICBrZXkgPSAnbGF5ZXJzJztcblxuICBzYXZlKGxheWVycywgdmlzU3RhdGUpIHtcbiAgICByZXR1cm4ge1xuICAgICAgW3RoaXMua2V5XTogdmlzU3RhdGUubGF5ZXJPcmRlci5yZWR1Y2UoKHNhdmVkLCBpbmRleCkgPT4ge1xuICAgICAgICAvLyBzYXZlIGxheWVycyBhY2NvcmRpbmcgdG8gdGhlaXIgcmVuZGVyaW5nIG9yZGVyXG4gICAgICAgIGNvbnN0IGxheWVyID0gbGF5ZXJzW2luZGV4XTtcbiAgICAgICAgaWYgKGxheWVyLmlzVmFsaWRUb1NhdmUoKSkge1xuICAgICAgICAgIHNhdmVkLnB1c2godGhpcy5zYXZlUHJvcGVydGllc09yQXBwbHlTY2hlbWEobGF5ZXIpLmxheWVycyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHNhdmVkO1xuICAgICAgfSwgW10pXG4gICAgfTtcbiAgfVxuXG4gIGxvYWQobGF5ZXJzLCB2aXNTdGF0ZSkge1xuICAgIHJldHVybiB7XG4gICAgICBbdGhpcy5rZXldOiBsYXllcnMubWFwKFxuICAgICAgICBsYXllciA9PiB0aGlzLmxvYWRQcm9wZXJ0aWVzT3JBcHBseVNjaGVtYShsYXllciwgbGF5ZXJzKS5sYXllcnNcbiAgICAgIClcbiAgICB9O1xuICB9XG59XG5cbmNsYXNzIEZpbHRlclNjaGVtYVYwIGV4dGVuZHMgU2NoZW1hIHtcbiAga2V5ID0gJ2ZpbHRlcnMnO1xuICBzYXZlKGZpbHRlcnMpIHtcbiAgICByZXR1cm4ge1xuICAgICAgZmlsdGVyczogZmlsdGVyc1xuICAgICAgICAuZmlsdGVyKGlzVmFsaWRGaWx0ZXJWYWx1ZSlcbiAgICAgICAgLm1hcChcbiAgICAgICAgICBmaWx0ZXIgPT5cbiAgICAgICAgICAgIHRoaXMuc2F2ZVByb3BlcnRpZXNPckFwcGx5U2NoZW1hKGZpbHRlciwgdGhpcy5wcm9wZXJ0aWVzKS5maWx0ZXJzXG4gICAgICAgIClcbiAgICB9O1xuICB9XG4gIGxvYWQoZmlsdGVycykge1xuICAgIHJldHVybiB7ZmlsdGVyc307XG4gIH1cbn1cblxuY29uc3QgaW50ZXJhY3Rpb25Qcm9wc1YwID0gWyd0b29sdGlwJywgJ2JydXNoJ107XG5cbmNsYXNzIEludGVyYWN0aW9uU2NoZW1hVjAgZXh0ZW5kcyBTY2hlbWEge1xuICBrZXkgPSAnaW50ZXJhY3Rpb25Db25maWcnO1xuXG4gIHNhdmUoaW50ZXJhY3Rpb25Db25maWcpIHtcbiAgICByZXR1cm4ge1xuICAgICAgW3RoaXMua2V5XTogdGhpcy5wcm9wZXJ0aWVzLnJlZHVjZShcbiAgICAgICAgKGFjY3UsIGtleSkgPT4gKHtcbiAgICAgICAgICAuLi5hY2N1LFxuICAgICAgICAgIC4uLihpbnRlcmFjdGlvbkNvbmZpZ1trZXldLmVuYWJsZWRcbiAgICAgICAgICAgID8ge1trZXldOiBpbnRlcmFjdGlvbkNvbmZpZ1trZXldLmNvbmZpZ31cbiAgICAgICAgICAgIDoge30pXG4gICAgICAgIH0pLFxuICAgICAgICB7fVxuICAgICAgKVxuICAgIH07XG4gIH1cbiAgbG9hZChpbnRlcmFjdGlvbkNvbmZpZykge1xuICAgIC8vIGNvbnZlcnQgdjAgLT4gdjFcbiAgICAvLyByZXR1cm4gZW5hYmxlZDogZmFsc2UgaWYgZGlzYWJsZWQsXG4gICAgcmV0dXJuIHtcbiAgICAgIFt0aGlzLmtleV06IHRoaXMucHJvcGVydGllcy5yZWR1Y2UoXG4gICAgICAgIChhY2N1LCBrZXkpID0+ICh7XG4gICAgICAgICAgLi4uYWNjdSxcbiAgICAgICAgICAuLi57XG4gICAgICAgICAgICBba2V5XToge1xuICAgICAgICAgICAgICAuLi4oaW50ZXJhY3Rpb25Db25maWdba2V5XSB8fCB7fSksXG4gICAgICAgICAgICAgIGVuYWJsZWQ6IEJvb2xlYW4oaW50ZXJhY3Rpb25Db25maWdba2V5XSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0pLFxuICAgICAgICB7fVxuICAgICAgKVxuICAgIH07XG4gIH1cbn1cblxuY2xhc3MgSW50ZXJhY3Rpb25TY2hlbWFWMSBleHRlbmRzIFNjaGVtYSB7XG4gIGtleSA9ICdpbnRlcmFjdGlvbkNvbmZpZyc7XG5cbiAgc2F2ZShpbnRlcmFjdGlvbkNvbmZpZykge1xuICAgIC8vIHNhdmUgY29uZmlnIGV2ZW4gaWYgZGlzYWJsZWQsXG4gICAgcmV0dXJuIHtcbiAgICAgIFt0aGlzLmtleV06IHRoaXMucHJvcGVydGllcy5yZWR1Y2UoXG4gICAgICAgIChhY2N1LCBrZXkpID0+ICh7XG4gICAgICAgICAgLi4uYWNjdSxcbiAgICAgICAgICBba2V5XToge1xuICAgICAgICAgICAgLi4uaW50ZXJhY3Rpb25Db25maWdba2V5XS5jb25maWcsXG4gICAgICAgICAgICBlbmFibGVkOiBpbnRlcmFjdGlvbkNvbmZpZ1trZXldLmVuYWJsZWRcbiAgICAgICAgICB9XG4gICAgICAgIH0pLFxuICAgICAgICB7fVxuICAgICAgKVxuICAgIH07XG4gIH1cbiAgbG9hZChpbnRlcmFjdGlvbkNvbmZpZykge1xuICAgIHJldHVybiB7W3RoaXMua2V5XTogaW50ZXJhY3Rpb25Db25maWd9O1xuICB9XG59XG5cbmV4cG9ydCBjb25zdCBmaWx0ZXJQcm9wc1YwID0ge1xuICBkYXRhSWQ6IG51bGwsXG4gIGlkOiBudWxsLFxuICBuYW1lOiBudWxsLFxuICB0eXBlOiBudWxsLFxuICB2YWx1ZTogbnVsbCxcbiAgZW5sYXJnZWQ6IG51bGxcbn07XG5cbmV4cG9ydCBjbGFzcyBEaW1lbnNpb25GaWVsZFNjaGVtYSBleHRlbmRzIFNjaGVtYSB7XG4gIHNhdmUoZmllbGQpIHtcbiAgICByZXR1cm4ge1xuICAgICAgW3RoaXMua2V5XTogZmllbGRcbiAgICAgICAgPyB0aGlzLnNhdmVQcm9wZXJ0aWVzT3JBcHBseVNjaGVtYShmaWVsZClbdGhpcy5rZXldXG4gICAgICAgIDogbnVsbFxuICAgIH07XG4gIH1cblxuICBsb2FkKGZpZWxkKSB7XG4gICAgcmV0dXJuIHtbdGhpcy5rZXldOiBmaWVsZH07XG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IGZpbHRlclByb3BzVjEgPSB7XG4gIC4uLmZpbHRlclByb3BzVjAsXG4gIHBsb3RUeXBlOiBudWxsLFxuICB5QXhpczogbmV3IERpbWVuc2lvbkZpZWxkU2NoZW1hKHtcbiAgICB2ZXJzaW9uOiBWRVJTSU9OUy52MSxcbiAgICBrZXk6ICd5QXhpcycsXG4gICAgcHJvcGVydGllczoge1xuICAgICAgbmFtZTogbnVsbCxcbiAgICAgIHR5cGU6IG51bGxcbiAgICB9XG4gIH0pXG59O1xuXG5leHBvcnQgY29uc3QgcHJvcGVydGllc1YwID0ge1xuICBmaWx0ZXJzOiBuZXcgRmlsdGVyU2NoZW1hVjAoe1xuICAgIHZlcnNpb246IFZFUlNJT05TLnYwLFxuICAgIHByb3BlcnRpZXM6IGZpbHRlclByb3BzVjBcbiAgfSksXG4gIGxheWVyczogbmV3IExheWVyU2NoZW1hVjAoe1xuICAgIHZlcnNpb246IFZFUlNJT05TLnYwLFxuICAgIHByb3BlcnRpZXM6IGxheWVyUHJvcHNWMFxuICB9KSxcbiAgaW50ZXJhY3Rpb25Db25maWc6IG5ldyBJbnRlcmFjdGlvblNjaGVtYVYwKHtcbiAgICB2ZXJzaW9uOiBWRVJTSU9OUy52MCxcbiAgICBwcm9wZXJ0aWVzOiBpbnRlcmFjdGlvblByb3BzVjBcbiAgfSksXG4gIGxheWVyQmxlbmRpbmc6IG51bGxcbn07XG5cbmV4cG9ydCBjb25zdCBwcm9wZXJ0aWVzVjEgPSB7XG4gIGZpbHRlcnM6IG5ldyBGaWx0ZXJTY2hlbWFWMCh7XG4gICAgdmVyc2lvbjogVkVSU0lPTlMudjEsXG4gICAgcHJvcGVydGllczogZmlsdGVyUHJvcHNWMVxuICB9KSxcbiAgbGF5ZXJzOiBuZXcgTGF5ZXJTY2hlbWFWMCh7XG4gICAgdmVyc2lvbjogVkVSU0lPTlMudjEsXG4gICAgcHJvcGVydGllczogbGF5ZXJQcm9wc1YxXG4gIH0pLFxuICBpbnRlcmFjdGlvbkNvbmZpZzogbmV3IEludGVyYWN0aW9uU2NoZW1hVjEoe1xuICAgIHZlcnNpb246IFZFUlNJT05TLnYxLFxuICAgIHByb3BlcnRpZXM6IGludGVyYWN0aW9uUHJvcHNWMFxuICB9KSxcbiAgbGF5ZXJCbGVuZGluZzogbnVsbCxcbiAgc3BsaXRNYXBzOiBudWxsXG59O1xuXG5leHBvcnQgY29uc3QgdmlzU3RhdGVTY2hlbWFWMCA9IG5ldyBTY2hlbWEoe1xuICB2ZXJzaW9uOiBWRVJTSU9OUy52MCxcbiAgcHJvcGVydGllczogcHJvcGVydGllc1YwLFxuICBrZXk6ICd2aXNTdGF0ZSdcbn0pO1xuXG5leHBvcnQgY29uc3QgdmlzU3RhdGVTY2hlbWFWMSA9IG5ldyBTY2hlbWEoe1xuICB2ZXJzaW9uOiBWRVJTSU9OUy52MSxcbiAgcHJvcGVydGllczogcHJvcGVydGllc1YxLFxuICBrZXk6ICd2aXNTdGF0ZSdcbn0pO1xuXG5leHBvcnQgY29uc3QgdmlzU3RhdGVTY2hlbWEgPSB7XG4gIFtWRVJTSU9OUy52MF06IHtcbiAgICBzYXZlOiB0b1NhdmUgPT4gdmlzU3RhdGVTY2hlbWFWMC5zYXZlKHRvU2F2ZSksXG4gICAgbG9hZDogdG9Mb2FkID0+XG4gICAgICB2aXNTdGF0ZVNjaGVtYVYxLmxvYWQodmlzU3RhdGVTY2hlbWFWMC5sb2FkKHRvTG9hZCkudmlzU3RhdGUpXG4gIH0sXG4gIFtWRVJTSU9OUy52MV06IHZpc1N0YXRlU2NoZW1hVjFcbn07XG5cbi8vIHRlc3QgbG9hZCB2MFxuZXhwb3J0IGRlZmF1bHQgdmlzU3RhdGVTY2hlbWE7XG4iXX0=