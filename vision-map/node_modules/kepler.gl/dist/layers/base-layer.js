'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.OVERLAY_TYPE = undefined;

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends6 = require('babel-runtime/helpers/extends');

var _extends7 = _interopRequireDefault(_extends6);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _colorUtils = require('../utils/color-utils');

var _window = require('global/window');

var _keymirror = require('keymirror');

var _keymirror2 = _interopRequireDefault(_keymirror);

var _defaultLayerIcon = require('./default-layer-icon');

var _defaultLayerIcon2 = _interopRequireDefault(_defaultLayerIcon);

var _defaultSettings = require('../constants/default-settings');

var _customColorRanges = require('../constants/custom-color-ranges');

var _layerFactory = require('./layer-factory');

var _utils = require('../utils/utils');

var _dataUtils = require('../utils/data-utils');

var _dataScaleUtils = require('../utils/data-scale-utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _marked = /*#__PURE__*/_regenerator2.default.mark(generateColor); // Copyright (c) 2018 Uber Technologies, Inc.
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

/**
 * Approx. number of points to sample in a large data set
 * @type {number}
 */
var MAX_SAMPLE_SIZE = 5000;

var OVERLAY_TYPE = exports.OVERLAY_TYPE = (0, _keymirror2.default)({
  deckgl: null,
  mapboxgl: null
});

var layerColors = Object.values(_customColorRanges.DataVizColors).map(_colorUtils.hexToRgb);
function generateColor() {
  var index;
  return _regenerator2.default.wrap(function generateColor$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          index = 0;

        case 1:
          if (!(index < layerColors.length + 1)) {
            _context.next = 7;
            break;
          }

          if (index === layerColors.length) {
            index = 0;
          }
          _context.next = 5;
          return layerColors[index++];

        case 5:
          _context.next = 1;
          break;

        case 7:
        case 'end':
          return _context.stop();
      }
    }
  }, _marked, this);
}

var colorMaker = generateColor();
var defaultGetFieldValue = function defaultGetFieldValue(field, d) {
  return d[field.tableFieldIndex - 1];
};

var Layer = function () {
  function Layer() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _classCallCheck3.default)(this, Layer);

    this.id = props.id || (0, _utils.generateHashId)(6);

    // meta
    this.meta = {};

    // visConfigSettings
    this.visConfigSettings = {};

    this.config = this.getDefaultLayerConfig((0, _extends7.default)({
      columns: this.getLayerColumns()
    }, props));
  }

  (0, _createClass3.default)(Layer, [{
    key: 'getDefaultLayerConfig',
    value: function getDefaultLayerConfig() {
      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      return {
        dataId: props.dataId || null,
        label: props.label || 'new layer',
        color: props.color || colorMaker.next().value,
        columns: props.columns || null,
        isVisible: props.isVisible || false,
        isConfigActive: props.isConfigActive || false,
        highlightColor: props.highlightColor || [252, 242, 26],

        // TODO: refactor this into separate visual Channel config
        // color by field, domain is set by filters, field, scale type
        colorField: null,
        colorDomain: [0, 1],
        colorScale: 'quantile',

        // color by size, domain is set by filters, field, scale type
        sizeDomain: [0, 1],
        sizeScale: 'linear',
        sizeField: null,

        visConfig: {}
      };
    }

    /**
     * Get the description of a visualChannel config
     * @param key
     * @returns {{label: string, measure: (string|string)}}
     */

  }, {
    key: 'getVisualChannelDescription',
    value: function getVisualChannelDescription(key) {
      // e.g. label: Color, measure: Vehicle Type
      return {
        label: this.visConfigSettings[this.visualChannels[key].range].label,
        measure: this.config[this.visualChannels[key].field] ? this.config[this.visualChannels[key].field].name : this.visualChannels[key].defaultMeasure
      };
    }

    /**
     * Assign a field to layer column, return column config
     * @param key - Column Key
     * @param field - Selected field
     * @returns {{}} - Column config
     */

  }, {
    key: 'assignColumn',
    value: function assignColumn(key, field) {
      // field value could be null for optional columns
      var update = field ? {
        value: field.name,
        fieldIdx: field.tableFieldIndex - 1
      } : { value: null, fieldIdx: -1 };

      return (0, _extends7.default)({}, this.config.columns, (0, _defineProperty3.default)({}, key, (0, _extends7.default)({}, this.config.columns[key], update)));
    }

    /**
     * Assign a field pair to column config, return column config
     * @param key - Column Key
     * @param pair - field Pair
     * @returns {{}} - Column config
     */

  }, {
    key: 'assignColumnPairs',
    value: function assignColumnPairs(key, pair) {
      var _extends3;

      if (!this.columnPairs || !this.columnPairs[key]) {
        // should not end in this state
        return this.config.columns;
      }

      var _columnPairs$key = this.columnPairs[key],
          partnerKey = _columnPairs$key.pair,
          fieldPairKey = _columnPairs$key.fieldPairKey;
      var partnerFieldPairKey = this.columnPairs[partnerKey].fieldPairKey;


      return (0, _extends7.default)({}, this.config.columns, (_extends3 = {}, (0, _defineProperty3.default)(_extends3, key, pair[fieldPairKey]), (0, _defineProperty3.default)(_extends3, partnerKey, pair[partnerFieldPairKey]), _extends3));
    }

    /**
      * Calculate a radius zoom multiplier to render points, so they are visible in all zoom level
      * @param mapState
      * @param mapState.zoom - actual zoom
      * @param mapState.zoomOffset - zoomOffset when render in the plot container for export image
      * @returns {number}
      */

  }, {
    key: 'getZoomFactor',
    value: function getZoomFactor(_ref) {
      var zoom = _ref.zoom,
          _ref$zoomOffset = _ref.zoomOffset,
          zoomOffset = _ref$zoomOffset === undefined ? 0 : _ref$zoomOffset;

      return Math.pow(2, Math.max(14 - zoom + zoomOffset, 0));
    }

    /**
      * Calculate a elevation zoom multiplier to render points, so they are visible in all zoom level
      * @param mapState
      * @param mapState.zoom - actual zoom
      * @param mapState.zoomOffset - zoomOffset when render in the plot container for export image
      * @returns {number}
      */

  }, {
    key: 'getElevationZoomFactor',
    value: function getElevationZoomFactor(_ref2) {
      var zoom = _ref2.zoom,
          _ref2$zoomOffset = _ref2.zoomOffset,
          zoomOffset = _ref2$zoomOffset === undefined ? 0 : _ref2$zoomOffset;

      return Math.pow(2, Math.max(8 - zoom + zoomOffset, 0));
    }
  }, {
    key: 'formatLayerData',
    value: function formatLayerData(data, allData, filteredIndex) {
      return {};
    }
  }, {
    key: 'renderLayer',
    value: function renderLayer() {
      return [];
    }
  }, {
    key: 'getHoverData',
    value: function getHoverData(object) {
      if (!object) {
        return null;
      }
      // by default, each entry of layerData should have a data property points
      // to the original item in the allData array
      // each layer can implement its own getHoverData method
      return object.data;
    }

    /**
     * When change layer type, try to copy over layer configs as much as possible
     * @param configToCopy - config to copy over
     * @param visConfigSettings - visConfig settings of config to copy
     */

  }, {
    key: 'assignConfigToLayer',
    value: function assignConfigToLayer(configToCopy, visConfigSettings) {
      var _this = this;

      // don't deep merge visualChannel field
      var notToDeepMerge = Object.values(this.visualChannels).map(function (v) {
        return v.field;
      });

      // don't deep merge color range, reversed: is not a key by default
      notToDeepMerge.push('colorRange');

      // don't copy over domain
      var notToCopy = Object.values(this.visualChannels).map(function (v) {
        return v.domain;
      });

      // if range is for the same property group copy it, otherwise, not to copy
      Object.values(this.visualChannels).forEach(function (v) {
        if (configToCopy.visConfig[v.range] && visConfigSettings[v.range].group !== _this.visConfigSettings[v.range].group) {
          notToCopy.push(v.range);
        }
      });

      // don't copy over visualChannel range
      var currentConfig = this.config;
      var copied = this.copyLayerConfig(currentConfig, configToCopy, { notToDeepMerge: notToDeepMerge, notToCopy: notToCopy });

      this.updateLayerConfig(copied);
      // validate visualChannel field type and scale types
      Object.keys(this.visualChannels).forEach(function (channel) {
        _this.validateVisualChannel(channel);
      });
    }

    /*
     * Recursively copy config over to an empty layer
     * when received saved config, or copy config over from a different layer type
     * make sure to only copy over value to existing keys
     * @param {object} currentConfig - existing config to be override
     * @param {object} configToCopy - new Config to copy over
     * @param {string[]} notToDeepMerge - array of properties to not to be deep copied
     * @param {string[]} notToCopy - array of properties not to copy
     * @returns {object} - copied config
     */

  }, {
    key: 'copyLayerConfig',
    value: function copyLayerConfig(currentConfig, configToCopy) {
      var _this2 = this;

      var _ref3 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
          _ref3$notToDeepMerge = _ref3.notToDeepMerge,
          notToDeepMerge = _ref3$notToDeepMerge === undefined ? [] : _ref3$notToDeepMerge,
          _ref3$notToCopy = _ref3.notToCopy,
          notToCopy = _ref3$notToCopy === undefined ? [] : _ref3$notToCopy;

      var copied = {};
      Object.keys(currentConfig).forEach(function (key) {
        if ((0, _utils.isPlainObject)(currentConfig[key]) && (0, _utils.isPlainObject)(configToCopy[key]) && !notToDeepMerge.includes(key) && !notToCopy.includes(key)) {
          // recursively assign object value
          copied[key] = _this2.copyLayerConfig(currentConfig[key], configToCopy[key], { notToDeepMerge: notToDeepMerge, notToCopy: notToCopy });
        } else if ((0, _utils.notNullorUndefined)(configToCopy[key]) && !notToCopy.includes(key)) {
          // copy
          copied[key] = configToCopy[key];
        } else {
          // keep existing
          copied[key] = currentConfig[key];
        }
      });

      return copied;
    }
  }, {
    key: 'registerVisConfig',
    value: function registerVisConfig(layerVisConfigs) {
      var _this3 = this;

      Object.keys(layerVisConfigs).forEach(function (item) {
        if (typeof item === 'string' && _layerFactory.LAYER_VIS_CONFIGS[layerVisConfigs[item]]) {
          // if assigned one of default LAYER_CONFIGS
          _this3.config.visConfig[item] = _layerFactory.LAYER_VIS_CONFIGS[layerVisConfigs[item]].defaultValue;
          _this3.visConfigSettings[item] = _layerFactory.LAYER_VIS_CONFIGS[layerVisConfigs[item]];
        } else if (['type', 'defaultValue'].every(function (p) {
          return layerVisConfigs[item][p];
        })) {
          // if provided customized visConfig, and has type && defaultValue
          // TODO: further check if customized visConfig is valid
          _this3.config.visConfig[item] = layerVisConfigs[item].defaultValue;
          _this3.visConfigSettings[item] = layerVisConfigs[item];
        }
      });
    }
  }, {
    key: 'getLayerColumns',
    value: function getLayerColumns() {
      var required = this.requiredLayerColumns.reduce(function (accu, key) {
        return (0, _extends7.default)({}, accu, (0, _defineProperty3.default)({}, key, { value: null, fieldIdx: -1 }));
      }, {});
      var optional = this.optionalColumns.reduce(function (accu, key) {
        return (0, _extends7.default)({}, accu, (0, _defineProperty3.default)({}, key, { value: null, fieldIdx: -1, optional: true }));
      }, {});

      return (0, _extends7.default)({}, required, optional);
    }
  }, {
    key: 'updateLayerConfig',
    value: function updateLayerConfig(newConfig) {
      this.config = (0, _extends7.default)({}, this.config, newConfig);
      return this;
    }
  }, {
    key: 'updateLayerVisConfig',
    value: function updateLayerVisConfig(newVisConfig) {
      this.config.visConfig = (0, _extends7.default)({}, this.config.visConfig, newVisConfig);
      return this;
    }
    /**
     * Check whether layer has all columns
     *
     * @param {object} layer
     * @returns {boolean} yes or no
     */

  }, {
    key: 'hasAllColumns',
    value: function hasAllColumns() {
      var columns = this.config.columns;

      return columns && Object.values(columns).every(function (v) {
        return Boolean(v.optional || v.value && v.fieldIdx > -1);
      });
    }

    /**
     * Check whether layer has data
     *
     * @param {object} layer
     * @param {Array | Object} layerData
     * @returns {boolean} yes or no
     */

  }, {
    key: 'hasLayerData',
    value: function hasLayerData(layerData) {
      if (!layerData) {
        return false;
      }

      return Boolean(layerData.data && layerData.data.length);
    }
  }, {
    key: 'isValidToSave',
    value: function isValidToSave() {
      return this.type && this.hasAllColumns();
    }
  }, {
    key: 'shouldRenderLayer',
    value: function shouldRenderLayer(data) {
      return this.type && this.hasAllColumns() && this.config.isVisible && this.hasLayerData(data);
    }
  }, {
    key: 'getVisChannelScale',
    value: function getVisChannelScale(scale, domain, range, fixed) {
      return _defaultSettings.SCALE_FUNC[fixed ? 'linear' : scale]().domain(domain).range(fixed ? domain : range);
    }
  }, {
    key: 'getPointsBounds',
    value: function getPointsBounds(allData, getPosition) {
      // no need to loop through the entire dataset
      // get a sample of data to calculate bounds
      var sampleData = allData.length > MAX_SAMPLE_SIZE ? (0, _dataUtils.getSampleData)(allData, MAX_SAMPLE_SIZE) : allData;
      var points = sampleData.map(getPosition);

      var latBounds = (0, _dataUtils.getLatLngBounds)(points, 1, [-90, 90]);
      var lngBounds = (0, _dataUtils.getLatLngBounds)(points, 0, [-180, 180]);

      if (!latBounds || !lngBounds) {
        return null;
      }

      return [lngBounds[0], latBounds[0], lngBounds[1], latBounds[1]];
    }
  }, {
    key: 'getLightSettingsFromBounds',
    value: function getLightSettingsFromBounds(bounds) {
      return Array.isArray(bounds) && bounds.length >= 4 ? (0, _extends7.default)({}, _defaultSettings.DEFAULT_LIGHT_SETTINGS, {
        lightsPosition: [].concat((0, _toConsumableArray3.default)(bounds.slice(0, 2)), [_defaultSettings.DEFAULT_LIGHT_SETTINGS.lightsPosition[2]], (0, _toConsumableArray3.default)(bounds.slice(2, 4)), [_defaultSettings.DEFAULT_LIGHT_SETTINGS.lightsPosition[5]])
      }) : _defaultSettings.DEFAULT_LIGHT_SETTINGS;
    }
  }, {
    key: 'getEncodedChannelValue',
    value: function getEncodedChannelValue(scale, data, field) {
      var defaultValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : _defaultSettings.NO_VALUE_COLOR;
      var getValue = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : defaultGetFieldValue;
      var type = field.type;

      var value = getValue(field, data);
      var attributeValue = void 0;
      if (type === _defaultSettings.ALL_FIELD_TYPES.timestamp) {
        // shouldn't need to convert here
        // scale Function should take care of it
        attributeValue = scale(new Date(value));
      } else {
        attributeValue = scale(value);
      }

      if (!attributeValue) {
        attributeValue = defaultValue;
      }

      return attributeValue;
    }
  }, {
    key: 'updateMeta',
    value: function updateMeta(meta) {
      this.meta = (0, _extends7.default)({}, this.meta, meta);
    }

    /**
     * helper function to update one layer domain when state.data changed
     * if state.data change is due ot update filter, newFiler will be passed
     * called by updateAllLayerDomainData
     * @param {Object} dataset
     * @param {Object} newFilter
     * @returns {object} layer
     */

  }, {
    key: 'updateLayerDomain',
    value: function updateLayerDomain(dataset, newFilter) {
      var _this4 = this;

      Object.values(this.visualChannels).forEach(function (channel) {
        var scale = channel.scale;

        var scaleType = _this4.config[scale];
        // ordinal domain is based on allData, if only filter changed
        // no need to update ordinal domain
        if (!newFilter || scaleType !== _defaultSettings.SCALE_TYPES.ordinal) {
          var domain = channel.domain;

          var updatedDomain = _this4.calculateLayerDomain(dataset, channel);

          _this4.updateLayerConfig((0, _defineProperty3.default)({}, domain, updatedDomain));
        }
      });

      return this;
    }

    /**
     * Validate visual channel field and scales based on supported field & scale type
     * @param channel
     */

  }, {
    key: 'validateVisualChannel',
    value: function validateVisualChannel(channel) {
      this.validateFieldType(channel);
      this.validateScale(channel);
    }

    /**
     * Validate field type based on channelScaleType
     */

  }, {
    key: 'validateFieldType',
    value: function validateFieldType(channel) {
      var visualChannel = this.visualChannels[channel];
      var field = visualChannel.field,
          channelScaleType = visualChannel.channelScaleType,
          supportedFieldTypes = visualChannel.supportedFieldTypes;


      if (this.config[field]) {
        // if field is selected, check if field type is supported
        var channelSupportedFieldTypes = supportedFieldTypes || _defaultSettings.CHANNEL_SCALE_SUPPORTED_FIELDS[channelScaleType];

        if (!channelSupportedFieldTypes.includes(this.config[field].type)) {
          // field type is not supported, set it back to null
          // set scale back to default
          this.updateLayerConfig((0, _defineProperty3.default)({}, field, null));
        }
      }
    }

    /**
     * Validate scale type based on aggregation
     */

  }, {
    key: 'validateScale',
    value: function validateScale(channel) {
      var visualChannel = this.visualChannels[channel];
      var scale = visualChannel.scale;

      if (!scale) {
        // visualChannel doesn't have scale
        return;
      }
      var scaleOptions = this.getScaleOptions(channel);
      // check if current selected scale is
      // supported, if not, change to default
      if (!scaleOptions.includes(this.config[scale])) {
        this.updateLayerConfig((0, _defineProperty3.default)({}, scale, scaleOptions[0]));
      }
    }

    /**
     * Get scale options based on current field
     * @param {string} channel
     * @returns {string[]}
     */

  }, {
    key: 'getScaleOptions',
    value: function getScaleOptions(channel) {
      var visualChannel = this.visualChannels[channel];
      var field = visualChannel.field,
          scale = visualChannel.scale,
          channelScaleType = visualChannel.channelScaleType;


      return this.config[field] ? _defaultSettings.FIELD_OPTS[this.config[field].type].scale[channelScaleType] : [this.getDefaultLayerConfig()[scale]];
    }
  }, {
    key: 'updateLayerVisualChannel',
    value: function updateLayerVisualChannel(dataset, channel) {
      var visualChannel = this.visualChannels[channel];

      this.validateVisualChannel(channel);
      // calculate layer channel domain
      var updatedDomain = this.calculateLayerDomain(dataset, visualChannel);

      this.updateLayerConfig((0, _defineProperty3.default)({}, visualChannel.domain, updatedDomain));
    }
  }, {
    key: 'calculateLayerDomain',
    value: function calculateLayerDomain(dataset, visualChannel) {
      var allData = dataset.allData,
          filteredIndexForDomain = dataset.filteredIndexForDomain;

      var defaultDomain = [0, 1];
      var scale = visualChannel.scale;

      var scaleType = this.config[scale];

      var field = this.config[visualChannel.field];
      if (!field) {
        // if colorField or sizeField were set back to null
        return defaultDomain;
      }

      if (!_defaultSettings.SCALE_TYPES[scaleType]) {
        _window.console.error('scale type ' + scaleType + ' not supported');
        return defaultDomain;
      }

      // TODO: refactor to add valueAccessor to field
      var fieldIdx = field.tableFieldIndex - 1;
      var isTime = field.type === _defaultSettings.ALL_FIELD_TYPES.timestamp;
      var valueAccessor = _dataUtils.maybeToDate.bind(null, isTime, fieldIdx, field.format);
      var indexValueAccessor = function indexValueAccessor(i) {
        return valueAccessor(allData[i]);
      };

      var sortFunction = (0, _dataUtils.getSortingFunction)(field.type);

      switch (scaleType) {
        case _defaultSettings.SCALE_TYPES.ordinal:
        case _defaultSettings.SCALE_TYPES.point:
          // do not recalculate ordinal domain based on filtered data
          // don't need to update ordinal domain every time
          return (0, _dataScaleUtils.getOrdinalDomain)(allData, valueAccessor);

        case _defaultSettings.SCALE_TYPES.quantile:
          return (0, _dataScaleUtils.getQuantileDomain)(filteredIndexForDomain, indexValueAccessor, sortFunction);

        case _defaultSettings.SCALE_TYPES.quantize:
        case _defaultSettings.SCALE_TYPES.linear:
        case _defaultSettings.SCALE_TYPES.sqrt:
        default:
          return (0, _dataScaleUtils.getLinearDomain)(filteredIndexForDomain, indexValueAccessor);
      }
    }
  }, {
    key: 'isLayerHovered',
    value: function isLayerHovered(objectInfo) {
      return objectInfo && objectInfo.layer && objectInfo.picked && objectInfo.layer.props.id === this.id;
    }
  }, {
    key: 'getRadiusScaleByZoom',
    value: function getRadiusScaleByZoom(mapState, fixedRadius) {
      var radiusChannel = Object.values(this.visualChannels).find(function (vc) {
        return vc.property === 'radius';
      });

      if (!radiusChannel) {
        return 1;
      }

      var field = radiusChannel.field;
      var fixed = fixedRadius === undefined ? this.config.visConfig.fixedRadius : fixedRadius;
      var radius = this.config.visConfig.radius;


      return fixed ? 1 : (this.config[field] ? 1 : radius) * this.getZoomFactor(mapState);
    }
  }, {
    key: 'shouldCalculateLayerData',
    value: function shouldCalculateLayerData(props) {
      var _this5 = this;

      return props.some(function (p) {
        return !_this5.noneLayerDataAffectingProps.includes(p);
      });
    }
  }, {
    key: 'layerIcon',
    get: function get() {
      return _defaultLayerIcon2.default;
    }
  }, {
    key: 'overlayType',
    get: function get() {
      return OVERLAY_TYPE.deckgl;
    }
  }, {
    key: 'type',
    get: function get() {
      return null;
    }
  }, {
    key: 'name',
    get: function get() {
      return this.type;
    }
  }, {
    key: 'isAggregated',
    get: function get() {
      return false;
    }
  }, {
    key: 'requiredLayerColumns',
    get: function get() {
      return [];
    }
  }, {
    key: 'optionalColumns',
    get: function get() {
      return [];
    }
  }, {
    key: 'noneLayerDataAffectingProps',
    get: function get() {
      return ['label', 'opacity', 'thickness', 'isVisible'];
    }
  }, {
    key: 'visualChannels',
    get: function get() {
      return {
        color: {
          property: 'color',
          field: 'colorField',
          scale: 'colorScale',
          domain: 'colorDomain',
          range: 'colorRange',
          key: 'color',
          channelScaleType: _defaultSettings.CHANNEL_SCALES.color
        },
        size: {
          property: 'size',
          field: 'sizeField',
          scale: 'sizeScale',
          domain: 'sizeDomain',
          range: 'sizeRange',
          key: 'size',
          channelScaleType: _defaultSettings.CHANNEL_SCALES.size
        }
      };
    }

    /*
     * Column pairs maps layer column to a specific field pairs,
     * By default, it is set to null
     */

  }, {
    key: 'columnPairs',
    get: function get() {
      return null;
    }

    /*
     * Default point column pairs, can be used for point based layers: point, icon etc.
     */

  }, {
    key: 'defaultPointColumnPairs',
    get: function get() {
      return {
        lat: { pair: 'lng', fieldPairKey: 'lat' },
        lng: { pair: 'lat', fieldPairKey: 'lng' }
      };
    }

    /*
     * Default link column pairs, can be used for link based layers: arc, line etc
     */

  }, {
    key: 'defaultLinkColumnPairs',
    get: function get() {
      return {
        lat0: { pair: 'lng0', fieldPairKey: 'lat' },
        lng0: { pair: 'lat0', fieldPairKey: 'lng' },
        lat1: { pair: 'lng1', fieldPairKey: 'lat' },
        lng1: { pair: 'lat1', fieldPairKey: 'lng' }
      };
    }

    /**
     * Return a React component for to render layer instructions in a modal
     * @returns {object} - an object
     * @example
     *  return {
     *    id: 'iconInfo',
     *    template: IconInfoModal,
     *    modalProps: {
     *      title: 'How to draw icons'
     *   };
     * }
     */

  }, {
    key: 'layerInfoModal',
    get: function get() {
      return null;
    }
    /*
     * Given a dataset, automatically create layers based on it
     * and return the props
     * By default, no layers will be found
     */

  }], [{
    key: 'findDefaultLayerProps',
    value: function findDefaultLayerProps(fieldPairs, dataId) {
      return null;
    }

    /**
     * Given a array of preset required column names
     * found field that has the same name to set as layer column
     *
     * @param {object[]} defaultFields
     * @param {object[]} allFields
     * @returns {object[] | null} all possible required layer column pairs
     */

  }, {
    key: 'findDefaultColumnField',
    value: function findDefaultColumnField(defaultFields, allFields) {
      // find all matched fields for each required col
      var requiredColumns = Object.keys(defaultFields).reduce(function (prev, key) {
        var requiredFields = allFields.filter(function (f) {
          return f.name === defaultFields[key] || defaultFields[key].includes(f.name);
        });

        prev[key] = requiredFields.length ? requiredFields.map(function (f) {
          return {
            value: f.name,
            fieldIdx: f.tableFieldIndex - 1
          };
        }) : null;
        return prev;
      }, {});

      if (!Object.values(requiredColumns).every(Boolean)) {
        // if any field missing, return null
        return null;
      }

      return this.getAllPossibleColumnParis(requiredColumns);
    }
  }, {
    key: 'getAllPossibleColumnParis',
    value: function getAllPossibleColumnParis(requiredColumns) {
      // for multiple matched field for one required column, return multiple
      // combinations, e. g. if column a has 2 matched, column b has 3 matched
      // 6 possible column pairs will be returned
      var allKeys = Object.keys(requiredColumns);
      var pointers = allKeys.map(function (k, i) {
        return i === allKeys.length - 1 ? -1 : 0;
      });
      var countPerKey = allKeys.map(function (k) {
        return requiredColumns[k].length;
      });
      var pairs = [];

      /* eslint-disable no-loop-func */
      while (incrementPointers(pointers, countPerKey, pointers.length - 1)) {
        var newPair = pointers.reduce(function (prev, cuur, i) {
          prev[allKeys[i]] = requiredColumns[allKeys[i]][cuur];
          return prev;
        }, {});

        pairs.push(newPair);
      }
      /* eslint-enable no-loop-func */

      // recursively increment pointers
      function incrementPointers(pts, counts, index) {
        if (index === 0 && pts[0] === counts[0] - 1) {
          // nothing to increment
          return false;
        }

        if (pts[index] + 1 < counts[index]) {
          pts[index] = pts[index] + 1;
          return true;
        }

        pts[index] = 0;
        return incrementPointers(pts, counts, index - 1);
      }

      return pairs;
    }
  }, {
    key: 'hexToRgb',
    value: function hexToRgb(c) {
      return (0, _colorUtils.hexToRgb)(c);
    }
  }]);
  return Layer;
}();

exports.default = Layer;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9sYXllcnMvYmFzZS1sYXllci5qcyJdLCJuYW1lcyI6WyJnZW5lcmF0ZUNvbG9yIiwiTUFYX1NBTVBMRV9TSVpFIiwiT1ZFUkxBWV9UWVBFIiwiZGVja2dsIiwibWFwYm94Z2wiLCJsYXllckNvbG9ycyIsIk9iamVjdCIsInZhbHVlcyIsIkRhdGFWaXpDb2xvcnMiLCJtYXAiLCJoZXhUb1JnYiIsImluZGV4IiwibGVuZ3RoIiwiY29sb3JNYWtlciIsImRlZmF1bHRHZXRGaWVsZFZhbHVlIiwiZmllbGQiLCJkIiwidGFibGVGaWVsZEluZGV4IiwiTGF5ZXIiLCJwcm9wcyIsImlkIiwibWV0YSIsInZpc0NvbmZpZ1NldHRpbmdzIiwiY29uZmlnIiwiZ2V0RGVmYXVsdExheWVyQ29uZmlnIiwiY29sdW1ucyIsImdldExheWVyQ29sdW1ucyIsImRhdGFJZCIsImxhYmVsIiwiY29sb3IiLCJuZXh0IiwidmFsdWUiLCJpc1Zpc2libGUiLCJpc0NvbmZpZ0FjdGl2ZSIsImhpZ2hsaWdodENvbG9yIiwiY29sb3JGaWVsZCIsImNvbG9yRG9tYWluIiwiY29sb3JTY2FsZSIsInNpemVEb21haW4iLCJzaXplU2NhbGUiLCJzaXplRmllbGQiLCJ2aXNDb25maWciLCJrZXkiLCJ2aXN1YWxDaGFubmVscyIsInJhbmdlIiwibWVhc3VyZSIsIm5hbWUiLCJkZWZhdWx0TWVhc3VyZSIsInVwZGF0ZSIsImZpZWxkSWR4IiwicGFpciIsImNvbHVtblBhaXJzIiwicGFydG5lcktleSIsImZpZWxkUGFpcktleSIsInBhcnRuZXJGaWVsZFBhaXJLZXkiLCJ6b29tIiwiem9vbU9mZnNldCIsIk1hdGgiLCJwb3ciLCJtYXgiLCJkYXRhIiwiYWxsRGF0YSIsImZpbHRlcmVkSW5kZXgiLCJvYmplY3QiLCJjb25maWdUb0NvcHkiLCJub3RUb0RlZXBNZXJnZSIsInYiLCJwdXNoIiwibm90VG9Db3B5IiwiZG9tYWluIiwiZm9yRWFjaCIsImdyb3VwIiwiY3VycmVudENvbmZpZyIsImNvcGllZCIsImNvcHlMYXllckNvbmZpZyIsInVwZGF0ZUxheWVyQ29uZmlnIiwia2V5cyIsInZhbGlkYXRlVmlzdWFsQ2hhbm5lbCIsImNoYW5uZWwiLCJpbmNsdWRlcyIsImxheWVyVmlzQ29uZmlncyIsIml0ZW0iLCJMQVlFUl9WSVNfQ09ORklHUyIsImRlZmF1bHRWYWx1ZSIsImV2ZXJ5IiwicCIsInJlcXVpcmVkIiwicmVxdWlyZWRMYXllckNvbHVtbnMiLCJyZWR1Y2UiLCJhY2N1Iiwib3B0aW9uYWwiLCJvcHRpb25hbENvbHVtbnMiLCJuZXdDb25maWciLCJuZXdWaXNDb25maWciLCJCb29sZWFuIiwibGF5ZXJEYXRhIiwidHlwZSIsImhhc0FsbENvbHVtbnMiLCJoYXNMYXllckRhdGEiLCJzY2FsZSIsImZpeGVkIiwiU0NBTEVfRlVOQyIsImdldFBvc2l0aW9uIiwic2FtcGxlRGF0YSIsInBvaW50cyIsImxhdEJvdW5kcyIsImxuZ0JvdW5kcyIsImJvdW5kcyIsIkFycmF5IiwiaXNBcnJheSIsIkRFRkFVTFRfTElHSFRfU0VUVElOR1MiLCJsaWdodHNQb3NpdGlvbiIsInNsaWNlIiwiTk9fVkFMVUVfQ09MT1IiLCJnZXRWYWx1ZSIsImF0dHJpYnV0ZVZhbHVlIiwiQUxMX0ZJRUxEX1RZUEVTIiwidGltZXN0YW1wIiwiRGF0ZSIsImRhdGFzZXQiLCJuZXdGaWx0ZXIiLCJzY2FsZVR5cGUiLCJTQ0FMRV9UWVBFUyIsIm9yZGluYWwiLCJ1cGRhdGVkRG9tYWluIiwiY2FsY3VsYXRlTGF5ZXJEb21haW4iLCJ2YWxpZGF0ZUZpZWxkVHlwZSIsInZhbGlkYXRlU2NhbGUiLCJ2aXN1YWxDaGFubmVsIiwiY2hhbm5lbFNjYWxlVHlwZSIsInN1cHBvcnRlZEZpZWxkVHlwZXMiLCJjaGFubmVsU3VwcG9ydGVkRmllbGRUeXBlcyIsIkNIQU5ORUxfU0NBTEVfU1VQUE9SVEVEX0ZJRUxEUyIsInNjYWxlT3B0aW9ucyIsImdldFNjYWxlT3B0aW9ucyIsIkZJRUxEX09QVFMiLCJmaWx0ZXJlZEluZGV4Rm9yRG9tYWluIiwiZGVmYXVsdERvbWFpbiIsIkNvbnNvbGUiLCJlcnJvciIsImlzVGltZSIsInZhbHVlQWNjZXNzb3IiLCJtYXliZVRvRGF0ZSIsImJpbmQiLCJmb3JtYXQiLCJpbmRleFZhbHVlQWNjZXNzb3IiLCJpIiwic29ydEZ1bmN0aW9uIiwicG9pbnQiLCJxdWFudGlsZSIsInF1YW50aXplIiwibGluZWFyIiwic3FydCIsIm9iamVjdEluZm8iLCJsYXllciIsInBpY2tlZCIsIm1hcFN0YXRlIiwiZml4ZWRSYWRpdXMiLCJyYWRpdXNDaGFubmVsIiwiZmluZCIsInZjIiwicHJvcGVydHkiLCJ1bmRlZmluZWQiLCJyYWRpdXMiLCJnZXRab29tRmFjdG9yIiwic29tZSIsIm5vbmVMYXllckRhdGFBZmZlY3RpbmdQcm9wcyIsIkRlZmF1bHRMYXllckljb24iLCJDSEFOTkVMX1NDQUxFUyIsInNpemUiLCJsYXQiLCJsbmciLCJsYXQwIiwibG5nMCIsImxhdDEiLCJsbmcxIiwiZmllbGRQYWlycyIsImRlZmF1bHRGaWVsZHMiLCJhbGxGaWVsZHMiLCJyZXF1aXJlZENvbHVtbnMiLCJwcmV2IiwicmVxdWlyZWRGaWVsZHMiLCJmaWx0ZXIiLCJmIiwiZ2V0QWxsUG9zc2libGVDb2x1bW5QYXJpcyIsImFsbEtleXMiLCJwb2ludGVycyIsImsiLCJjb3VudFBlcktleSIsInBhaXJzIiwiaW5jcmVtZW50UG9pbnRlcnMiLCJuZXdQYWlyIiwiY3V1ciIsInB0cyIsImNvdW50cyIsImMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFvQkE7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7OztBQUVBOztBQVVBOztBQUNBOztBQUVBOztBQUVBOztBQU9BOzs7O3NEQWtCVUEsYSxHQWpFVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFtQ0E7Ozs7QUFJQSxJQUFN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QUNEO0FBQ0Q7O0FBRUE7QUFDQSxlQUFTRCxpQkFBVCxDQUEyQkcsR0FBM0IsRUFBZ0NDLE1BQWhDLEVBQXdDdkwsS0FBeEMsRUFBK0M7QUFDN0MsWUFBSUEsVUFBVSxDQUFWLElBQWVzTCxJQUFJLENBQUosTUFBV0MsT0FBTyxDQUFQLElBQVksQ0FBMUMsRUFBNkM7QUFDM0M7QUFDQSxpQkFBTyxLQUFQO0FBQ0Q7O0FBRUQsWUFBSUQsSUFBSXRMLEtBQUosSUFBYSxDQUFiLEdBQWlCdUwsT0FBT3ZMLEtBQVAsQ0FBckIsRUFBb0M7QUFDbENzTCxjQUFJdEwsS0FBSixJQUFhc0wsSUFBSXRMLEtBQUosSUFBYSxDQUExQjtBQUNBLGlCQUFPLElBQVA7QUFDRDs7QUFFRHNMLFlBQUl0TCxLQUFKLElBQWEsQ0FBYjtBQUNBLGVBQU9tTCxrQkFBa0JHLEdBQWxCLEVBQXVCQyxNQUF2QixFQUErQnZMLFFBQVEsQ0FBdkMsQ0FBUDtBQUNEOztBQUVELGFBQU9rTCxLQUFQO0FBQ0Q7Ozs2QkFFZU0sQyxFQUFHO0FBQ2pCLGFBQU8sMEJBQVNBLENBQVQsQ0FBUDtBQUNEOzs7OztrQkF0TWtCakwsSyIsImZpbGUiOiJiYXNlLWxheWVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSAyMDE4IFViZXIgVGVjaG5vbG9naWVzLCBJbmMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuLy8gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuLy8gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuLy8gdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuLy8gY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4vLyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4vLyBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4vLyBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbi8vIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuLy8gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuLy8gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbi8vIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbi8vIFRIRSBTT0ZUV0FSRS5cblxuaW1wb3J0IHtoZXhUb1JnYn0gZnJvbSAndXRpbHMvY29sb3ItdXRpbHMnO1xuaW1wb3J0IHtjb25zb2xlIGFzIENvbnNvbGV9IGZyb20gJ2dsb2JhbC93aW5kb3cnO1xuaW1wb3J0IGtleW1pcnJvciBmcm9tICdrZXltaXJyb3InO1xuaW1wb3J0IERlZmF1bHRMYXllckljb24gZnJvbSAnLi9kZWZhdWx0LWxheWVyLWljb24nO1xuXG5pbXBvcnQge1xuICBBTExfRklFTERfVFlQRVMsXG4gIERFRkFVTFRfTElHSFRfU0VUVElOR1MsXG4gIE5PX1ZBTFVFX0NPTE9SLFxuICBTQ0FMRV9UWVBFUyxcbiAgQ0hBTk5FTF9TQ0FMRVMsXG4gIEZJRUxEX09QVFMsXG4gIFNDQUxFX0ZVTkMsXG4gIENIQU5ORUxfU0NBTEVfU1VQUE9SVEVEX0ZJRUxEU1xufSBmcm9tICdjb25zdGFudHMvZGVmYXVsdC1zZXR0aW5ncyc7XG5pbXBvcnQge0RhdGFWaXpDb2xvcnN9IGZyb20gJ2NvbnN0YW50cy9jdXN0b20tY29sb3ItcmFuZ2VzJztcbmltcG9ydCB7TEFZRVJfVklTX0NPTkZJR1N9IGZyb20gJy4vbGF5ZXItZmFjdG9yeSc7XG5cbmltcG9ydCB7Z2VuZXJhdGVIYXNoSWQsIG5vdE51bGxvclVuZGVmaW5lZCwgaXNQbGFpbk9iamVjdH0gZnJvbSAndXRpbHMvdXRpbHMnO1xuXG5pbXBvcnQge1xuICBnZXRTYW1wbGVEYXRhLFxuICBnZXRMYXRMbmdCb3VuZHMsXG4gIG1heWJlVG9EYXRlLFxuICBnZXRTb3J0aW5nRnVuY3Rpb25cbn0gZnJvbSAndXRpbHMvZGF0YS11dGlscyc7XG5cbmltcG9ydCB7XG4gIGdldFF1YW50aWxlRG9tYWluLFxuICBnZXRPcmRpbmFsRG9tYWluLFxuICBnZXRMaW5lYXJEb21haW5cbn0gZnJvbSAndXRpbHMvZGF0YS1zY2FsZS11dGlscyc7XG5cbi8qKlxuICogQXBwcm94LiBudW1iZXIgb2YgcG9pbnRzIHRvIHNhbXBsZSBpbiBhIGxhcmdlIGRhdGEgc2V0XG4gKiBAdHlwZSB7bnVtYmVyfVxuICovXG5jb25zdCBNQVhfU0FNUExFX1NJWkUgPSA1MDAwO1xuXG5leHBvcnQgY29uc3QgT1ZFUkxBWV9UWVBFID0ga2V5bWlycm9yKHtcbiAgZGVja2dsOiBudWxsLFxuICBtYXBib3hnbDogbnVsbFxufSk7XG5cbmNvbnN0IGxheWVyQ29sb3JzID0gT2JqZWN0LnZhbHVlcyhEYXRhVml6Q29sb3JzKS5tYXAoaGV4VG9SZ2IpO1xuZnVuY3Rpb24qIGdlbmVyYXRlQ29sb3IoKSB7XG4gIGxldCBpbmRleCA9IDA7XG4gIHdoaWxlIChpbmRleCA8IGxheWVyQ29sb3JzLmxlbmd0aCArIDEpIHtcbiAgICBpZiAoaW5kZXggPT09IGxheWVyQ29sb3JzLmxlbmd0aCkge1xuICAgICAgaW5kZXggPSAwO1xuICAgIH1cbiAgICB5aWVsZCBsYXllckNvbG9yc1tpbmRleCsrXTtcbiAgfVxufVxuXG5jb25zdCBjb2xvck1ha2VyID0gZ2VuZXJhdGVDb2xvcigpO1xuY29uc3QgZGVmYXVsdEdldEZpZWxkVmFsdWUgPSAoZmllbGQsIGQpID0+IGRbZmllbGQudGFibGVGaWVsZEluZGV4IC0gMV07XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExheWVyIHtcbiAgY29uc3RydWN0b3IocHJvcHMgPSB7fSkge1xuICAgIHRoaXMuaWQgPSBwcm9wcy5pZCB8fCBnZW5lcmF0ZUhhc2hJZCg2KTtcblxuICAgIC8vIG1ldGFcbiAgICB0aGlzLm1ldGEgPSB7fTtcblxuICAgIC8vIHZpc0NvbmZpZ1NldHRpbmdzXG4gICAgdGhpcy52aXNDb25maWdTZXR0aW5ncyA9IHt9O1xuXG4gICAgdGhpcy5jb25maWcgPSB0aGlzLmdldERlZmF1bHRMYXllckNvbmZpZyh7XG4gICAgICBjb2x1bW5zOiB0aGlzLmdldExheWVyQ29sdW1ucygpLFxuICAgICAgLi4ucHJvcHNcbiAgICB9KTtcbiAgfVxuXG4gIGdldCBsYXllckljb24oKSB7XG4gICAgcmV0dXJuIERlZmF1bHRMYXllckljb247XG4gIH1cblxuICBnZXQgb3ZlcmxheVR5cGUoKSB7XG4gICAgcmV0dXJuIE9WRVJMQVlfVFlQRS5kZWNrZ2w7XG4gIH1cblxuICBnZXQgdHlwZSgpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIGdldCBuYW1lKCkge1xuICAgIHJldHVybiB0aGlzLnR5cGU7XG4gIH1cblxuICBnZXQgaXNBZ2dyZWdhdGVkKCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGdldCByZXF1aXJlZExheWVyQ29sdW1ucygpIHtcbiAgICByZXR1cm4gW107XG4gIH1cblxuICBnZXQgb3B0aW9uYWxDb2x1bW5zKCkge1xuICAgIHJldHVybiBbXTtcbiAgfVxuXG4gIGdldCBub25lTGF5ZXJEYXRhQWZmZWN0aW5nUHJvcHMoKSB7XG4gICAgcmV0dXJuIFsnbGFiZWwnLCAnb3BhY2l0eScsICd0aGlja25lc3MnLCAnaXNWaXNpYmxlJ107XG4gIH1cblxuICBnZXQgdmlzdWFsQ2hhbm5lbHMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGNvbG9yOiB7XG4gICAgICAgIHByb3BlcnR5OiAnY29sb3InLFxuICAgICAgICBmaWVsZDogJ2NvbG9yRmllbGQnLFxuICAgICAgICBzY2FsZTogJ2NvbG9yU2NhbGUnLFxuICAgICAgICBkb21haW46ICdjb2xvckRvbWFpbicsXG4gICAgICAgIHJhbmdlOiAnY29sb3JSYW5nZScsXG4gICAgICAgIGtleTogJ2NvbG9yJyxcbiAgICAgICAgY2hhbm5lbFNjYWxlVHlwZTogQ0hBTk5FTF9TQ0FMRVMuY29sb3JcbiAgICAgIH0sXG4gICAgICBzaXplOiB7XG4gICAgICAgIHByb3BlcnR5OiAnc2l6ZScsXG4gICAgICAgIGZpZWxkOiAnc2l6ZUZpZWxkJyxcbiAgICAgICAgc2NhbGU6ICdzaXplU2NhbGUnLFxuICAgICAgICBkb21haW46ICdzaXplRG9tYWluJyxcbiAgICAgICAgcmFuZ2U6ICdzaXplUmFuZ2UnLFxuICAgICAgICBrZXk6ICdzaXplJyxcbiAgICAgICAgY2hhbm5lbFNjYWxlVHlwZTogQ0hBTk5FTF9TQ0FMRVMuc2l6ZVxuICAgICAgfVxuICAgIH07XG4gIH1cblxuICAvKlxuICAgKiBDb2x1bW4gcGFpcnMgbWFwcyBsYXllciBjb2x1bW4gdG8gYSBzcGVjaWZpYyBmaWVsZCBwYWlycyxcbiAgICogQnkgZGVmYXVsdCwgaXQgaXMgc2V0IHRvIG51bGxcbiAgICovXG4gIGdldCBjb2x1bW5QYWlycygpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIC8qXG4gICAqIERlZmF1bHQgcG9pbnQgY29sdW1uIHBhaXJzLCBjYW4gYmUgdXNlZCBmb3IgcG9pbnQgYmFzZWQgbGF5ZXJzOiBwb2ludCwgaWNvbiBldGMuXG4gICAqL1xuICBnZXQgZGVmYXVsdFBvaW50Q29sdW1uUGFpcnMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGxhdDoge3BhaXI6ICdsbmcnLCBmaWVsZFBhaXJLZXk6ICdsYXQnfSxcbiAgICAgIGxuZzoge3BhaXI6ICdsYXQnLCBmaWVsZFBhaXJLZXk6ICdsbmcnfVxuICAgIH07XG4gIH1cblxuICAvKlxuICAgKiBEZWZhdWx0IGxpbmsgY29sdW1uIHBhaXJzLCBjYW4gYmUgdXNlZCBmb3IgbGluayBiYXNlZCBsYXllcnM6IGFyYywgbGluZSBldGNcbiAgICovXG4gIGdldCBkZWZhdWx0TGlua0NvbHVtblBhaXJzKCkge1xuICAgIHJldHVybiB7XG4gICAgICBsYXQwOiB7cGFpcjogJ2xuZzAnLCBmaWVsZFBhaXJLZXk6ICdsYXQnfSxcbiAgICAgIGxuZzA6IHtwYWlyOiAnbGF0MCcsIGZpZWxkUGFpcktleTogJ2xuZyd9LFxuICAgICAgbGF0MToge3BhaXI6ICdsbmcxJywgZmllbGRQYWlyS2V5OiAnbGF0J30sXG4gICAgICBsbmcxOiB7cGFpcjogJ2xhdDEnLCBmaWVsZFBhaXJLZXk6ICdsbmcnfVxuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJuIGEgUmVhY3QgY29tcG9uZW50IGZvciB0byByZW5kZXIgbGF5ZXIgaW5zdHJ1Y3Rpb25zIGluIGEgbW9kYWxcbiAgICogQHJldHVybnMge29iamVjdH0gLSBhbiBvYmplY3RcbiAgICogQGV4YW1wbGVcbiAgICogIHJldHVybiB7XG4gICAqICAgIGlkOiAnaWNvbkluZm8nLFxuICAgKiAgICB0ZW1wbGF0ZTogSWNvbkluZm9Nb2RhbCxcbiAgICogICAgbW9kYWxQcm9wczoge1xuICAgKiAgICAgIHRpdGxlOiAnSG93IHRvIGRyYXcgaWNvbnMnXG4gICAqICAgfTtcbiAgICogfVxuICAgKi9cbiAgZ2V0IGxheWVySW5mb01vZGFsKCkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG4gIC8qXG4gICAqIEdpdmVuIGEgZGF0YXNldCwgYXV0b21hdGljYWxseSBjcmVhdGUgbGF5ZXJzIGJhc2VkIG9uIGl0XG4gICAqIGFuZCByZXR1cm4gdGhlIHByb3BzXG4gICAqIEJ5IGRlZmF1bHQsIG5vIGxheWVycyB3aWxsIGJlIGZvdW5kXG4gICAqL1xuICBzdGF0aWMgZmluZERlZmF1bHRMYXllclByb3BzKGZpZWxkUGFpcnMsIGRhdGFJZCkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgLyoqXG4gICAqIEdpdmVuIGEgYXJyYXkgb2YgcHJlc2V0IHJlcXVpcmVkIGNvbHVtbiBuYW1lc1xuICAgKiBmb3VuZCBmaWVsZCB0aGF0IGhhcyB0aGUgc2FtZSBuYW1lIHRvIHNldCBhcyBsYXllciBjb2x1bW5cbiAgICpcbiAgICogQHBhcmFtIHtvYmplY3RbXX0gZGVmYXVsdEZpZWxkc1xuICAgKiBAcGFyYW0ge29iamVjdFtdfSBhbGxGaWVsZHNcbiAgICogQHJldHVybnMge29iamVjdFtdIHwgbnVsbH0gYWxsIHBvc3NpYmxlIHJlcXVpcmVkIGxheWVyIGNvbHVtbiBwYWlyc1xuICAgKi9cbiAgc3RhdGljIGZpbmREZWZhdWx0Q29sdW1uRmllbGQoZGVmYXVsdEZpZWxkcywgYWxsRmllbGRzKSB7XG4gICAgLy8gZmluZCBhbGwgbWF0Y2hlZCBmaWVsZHMgZm9yIGVhY2ggcmVxdWlyZWQgY29sXG4gICAgY29uc3QgcmVxdWlyZWRDb2x1bW5zID0gT2JqZWN0LmtleXMoZGVmYXVsdEZpZWxkcykucmVkdWNlKChwcmV2LCBrZXkpID0+IHtcbiAgICAgIGNvbnN0IHJlcXVpcmVkRmllbGRzID0gYWxsRmllbGRzLmZpbHRlcihcbiAgICAgICAgZiA9PiBmLm5hbWUgPT09IGRlZmF1bHRGaWVsZHNba2V5XSB8fCBkZWZhdWx0RmllbGRzW2tleV0uaW5jbHVkZXMoZi5uYW1lKVxuICAgICAgKTtcblxuICAgICAgcHJldltrZXldID0gcmVxdWlyZWRGaWVsZHMubGVuZ3RoXG4gICAgICAgID8gcmVxdWlyZWRGaWVsZHMubWFwKGYgPT4gKHtcbiAgICAgICAgICB2YWx1ZTogZi5uYW1lLFxuICAgICAgICAgIGZpZWxkSWR4OiBmLnRhYmxlRmllbGRJbmRleCAtIDFcbiAgICAgICAgfSkpXG4gICAgICAgIDogbnVsbDtcbiAgICAgIHJldHVybiBwcmV2O1xuICAgIH0sIHt9KTtcblxuICAgIGlmICghT2JqZWN0LnZhbHVlcyhyZXF1aXJlZENvbHVtbnMpLmV2ZXJ5KEJvb2xlYW4pKSB7XG4gICAgICAvLyBpZiBhbnkgZmllbGQgbWlzc2luZywgcmV0dXJuIG51bGxcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmdldEFsbFBvc3NpYmxlQ29sdW1uUGFyaXMocmVxdWlyZWRDb2x1bW5zKTtcbiAgfVxuXG4gIHN0YXRpYyBnZXRBbGxQb3NzaWJsZUNvbHVtblBhcmlzKHJlcXVpcmVkQ29sdW1ucykge1xuICAgIC8vIGZvciBtdWx0aXBsZSBtYXRjaGVkIGZpZWxkIGZvciBvbmUgcmVxdWlyZWQgY29sdW1uLCByZXR1cm4gbXVsdGlwbGVcbiAgICAvLyBjb21iaW5hdGlvbnMsIGUuIGcuIGlmIGNvbHVtbiBhIGhhcyAyIG1hdGNoZWQsIGNvbHVtbiBiIGhhcyAzIG1hdGNoZWRcbiAgICAvLyA2IHBvc3NpYmxlIGNvbHVtbiBwYWlycyB3aWxsIGJlIHJldHVybmVkXG4gICAgY29uc3QgYWxsS2V5cyA9IE9iamVjdC5rZXlzKHJlcXVpcmVkQ29sdW1ucyk7XG4gICAgY29uc3QgcG9pbnRlcnMgPSBhbGxLZXlzLm1hcCgoaywgaSkgPT4gKGkgPT09IGFsbEtleXMubGVuZ3RoIC0gMSA/IC0xIDogMCkpO1xuICAgIGNvbnN0IGNvdW50UGVyS2V5ID0gYWxsS2V5cy5tYXAoayA9PiByZXF1aXJlZENvbHVtbnNba10ubGVuZ3RoKTtcbiAgICBjb25zdCBwYWlycyA9IFtdO1xuXG4gICAgLyogZXNsaW50LWRpc2FibGUgbm8tbG9vcC1mdW5jICovXG4gICAgd2hpbGUgKGluY3JlbWVudFBvaW50ZXJzKHBvaW50ZXJzLCBjb3VudFBlcktleSwgcG9pbnRlcnMubGVuZ3RoIC0gMSkpIHtcbiAgICAgIGNvbnN0IG5ld1BhaXIgPSBwb2ludGVycy5yZWR1Y2UoKHByZXYsIGN1dXIsIGkpID0+IHtcbiAgICAgICAgcHJldlthbGxLZXlzW2ldXSA9IHJlcXVpcmVkQ29sdW1uc1thbGxLZXlzW2ldXVtjdXVyXTtcbiAgICAgICAgcmV0dXJuIHByZXY7XG4gICAgICB9LCB7fSk7XG5cbiAgICAgIHBhaXJzLnB1c2gobmV3UGFpcik7XG4gICAgfVxuICAgIC8qIGVzbGludC1lbmFibGUgbm8tbG9vcC1mdW5jICovXG5cbiAgICAvLyByZWN1cnNpdmVseSBpbmNyZW1lbnQgcG9pbnRlcnNcbiAgICBmdW5jdGlvbiBpbmNyZW1lbnRQb2ludGVycyhwdHMsIGNvdW50cywgaW5kZXgpIHtcbiAgICAgIGlmIChpbmRleCA9PT0gMCAmJiBwdHNbMF0gPT09IGNvdW50c1swXSAtIDEpIHtcbiAgICAgICAgLy8gbm90aGluZyB0byBpbmNyZW1lbnRcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuXG4gICAgICBpZiAocHRzW2luZGV4XSArIDEgPCBjb3VudHNbaW5kZXhdKSB7XG4gICAgICAgIHB0c1tpbmRleF0gPSBwdHNbaW5kZXhdICsgMTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG5cbiAgICAgIHB0c1tpbmRleF0gPSAwO1xuICAgICAgcmV0dXJuIGluY3JlbWVudFBvaW50ZXJzKHB0cywgY291bnRzLCBpbmRleCAtIDEpO1xuICAgIH1cblxuICAgIHJldHVybiBwYWlycztcbiAgfVxuXG4gIHN0YXRpYyBoZXhUb1JnYihjKSB7XG4gICAgcmV0dXJuIGhleFRvUmdiKGMpO1xuICB9XG5cbiAgZ2V0RGVmYXVsdExheWVyQ29uZmlnKHByb3BzID0ge30pIHtcbiAgICByZXR1cm4ge1xuICAgICAgZGF0YUlkOiBwcm9wcy5kYXRhSWQgfHwgbnVsbCxcbiAgICAgIGxhYmVsOiBwcm9wcy5sYWJlbCB8fCAnbmV3IGxheWVyJyxcbiAgICAgIGNvbG9yOiBwcm9wcy5jb2xvciB8fCBjb2xvck1ha2VyLm5leHQoKS52YWx1ZSxcbiAgICAgIGNvbHVtbnM6IHByb3BzLmNvbHVtbnMgfHwgbnVsbCxcbiAgICAgIGlzVmlzaWJsZTogcHJvcHMuaXNWaXNpYmxlIHx8IGZhbHNlLFxuICAgICAgaXNDb25maWdBY3RpdmU6IHByb3BzLmlzQ29uZmlnQWN0aXZlIHx8IGZhbHNlLFxuICAgICAgaGlnaGxpZ2h0Q29sb3I6IHByb3BzLmhpZ2hsaWdodENvbG9yIHx8IFsyNTIsIDI0MiwgMjZdLFxuXG4gICAgICAvLyBUT0RPOiByZWZhY3RvciB0aGlzIGludG8gc2VwYXJhdGUgdmlzdWFsIENoYW5uZWwgY29uZmlnXG4gICAgICAvLyBjb2xvciBieSBmaWVsZCwgZG9tYWluIGlzIHNldCBieSBmaWx0ZXJzLCBmaWVsZCwgc2NhbGUgdHlwZVxuICAgICAgY29sb3JGaWVsZDogbnVsbCxcbiAgICAgIGNvbG9yRG9tYWluOiBbMCwgMV0sXG4gICAgICBjb2xvclNjYWxlOiAncXVhbnRpbGUnLFxuXG4gICAgICAvLyBjb2xvciBieSBzaXplLCBkb21haW4gaXMgc2V0IGJ5IGZpbHRlcnMsIGZpZWxkLCBzY2FsZSB0eXBlXG4gICAgICBzaXplRG9tYWluOiBbMCwgMV0sXG4gICAgICBzaXplU2NhbGU6ICdsaW5lYXInLFxuICAgICAgc2l6ZUZpZWxkOiBudWxsLFxuXG4gICAgICB2aXNDb25maWc6IHt9XG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIGRlc2NyaXB0aW9uIG9mIGEgdmlzdWFsQ2hhbm5lbCBjb25maWdcbiAgICogQHBhcmFtIGtleVxuICAgKiBAcmV0dXJucyB7e2xhYmVsOiBzdHJpbmcsIG1lYXN1cmU6IChzdHJpbmd8c3RyaW5nKX19XG4gICAqL1xuICBnZXRWaXN1YWxDaGFubmVsRGVzY3JpcHRpb24oa2V5KSB7XG4gICAgLy8gZS5nLiBsYWJlbDogQ29sb3IsIG1lYXN1cmU6IFZlaGljbGUgVHlwZVxuICAgIHJldHVybiB7XG4gICAgICBsYWJlbDogdGhpcy52aXNDb25maWdTZXR0aW5nc1t0aGlzLnZpc3VhbENoYW5uZWxzW2tleV0ucmFuZ2VdLmxhYmVsLFxuICAgICAgbWVhc3VyZTogdGhpcy5jb25maWdbdGhpcy52aXN1YWxDaGFubmVsc1trZXldLmZpZWxkXVxuICAgICAgICA/IHRoaXMuY29uZmlnW3RoaXMudmlzdWFsQ2hhbm5lbHNba2V5XS5maWVsZF0ubmFtZVxuICAgICAgICA6IHRoaXMudmlzdWFsQ2hhbm5lbHNba2V5XS5kZWZhdWx0TWVhc3VyZVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBBc3NpZ24gYSBmaWVsZCB0byBsYXllciBjb2x1bW4sIHJldHVybiBjb2x1bW4gY29uZmlnXG4gICAqIEBwYXJhbSBrZXkgLSBDb2x1bW4gS2V5XG4gICAqIEBwYXJhbSBmaWVsZCAtIFNlbGVjdGVkIGZpZWxkXG4gICAqIEByZXR1cm5zIHt7fX0gLSBDb2x1bW4gY29uZmlnXG4gICAqL1xuICBhc3NpZ25Db2x1bW4oa2V5LCBmaWVsZCkge1xuICAgIC8vIGZpZWxkIHZhbHVlIGNvdWxkIGJlIG51bGwgZm9yIG9wdGlvbmFsIGNvbHVtbnNcbiAgICBjb25zdCB1cGRhdGUgPSBmaWVsZFxuICAgICAgPyB7XG4gICAgICAgICAgdmFsdWU6IGZpZWxkLm5hbWUsXG4gICAgICAgICAgZmllbGRJZHg6IGZpZWxkLnRhYmxlRmllbGRJbmRleCAtIDFcbiAgICAgICAgfVxuICAgICAgOiB7dmFsdWU6IG51bGwsIGZpZWxkSWR4OiAtMX07XG5cbiAgICByZXR1cm4ge1xuICAgICAgLi4udGhpcy5jb25maWcuY29sdW1ucyxcbiAgICAgIFtrZXldOiB7XG4gICAgICAgIC4uLnRoaXMuY29uZmlnLmNvbHVtbnNba2V5XSxcbiAgICAgICAgLi4udXBkYXRlXG4gICAgICB9XG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBc3NpZ24gYSBmaWVsZCBwYWlyIHRvIGNvbHVtbiBjb25maWcsIHJldHVybiBjb2x1bW4gY29uZmlnXG4gICAqIEBwYXJhbSBrZXkgLSBDb2x1bW4gS2V5XG4gICAqIEBwYXJhbSBwYWlyIC0gZmllbGQgUGFpclxuICAgKiBAcmV0dXJucyB7e319IC0gQ29sdW1uIGNvbmZpZ1xuICAgKi9cbiAgYXNzaWduQ29sdW1uUGFpcnMoa2V5LCBwYWlyKSB7XG4gICAgaWYgKCF0aGlzLmNvbHVtblBhaXJzIHx8ICF0aGlzLmNvbHVtblBhaXJzW2tleV0pIHtcbiAgICAgIC8vIHNob3VsZCBub3QgZW5kIGluIHRoaXMgc3RhdGVcbiAgICAgIHJldHVybiB0aGlzLmNvbmZpZy5jb2x1bW5zO1xuICAgIH1cblxuICAgIGNvbnN0IHtwYWlyOiBwYXJ0bmVyS2V5LCBmaWVsZFBhaXJLZXl9ID0gdGhpcy5jb2x1bW5QYWlyc1trZXldO1xuICAgIGNvbnN0IHtmaWVsZFBhaXJLZXk6IHBhcnRuZXJGaWVsZFBhaXJLZXl9ID0gdGhpcy5jb2x1bW5QYWlyc1twYXJ0bmVyS2V5XTtcblxuICAgIHJldHVybiB7XG4gICAgICAuLi50aGlzLmNvbmZpZy5jb2x1bW5zLFxuICAgICAgW2tleV06IHBhaXJbZmllbGRQYWlyS2V5XSxcbiAgICAgIFtwYXJ0bmVyS2V5XTogcGFpcltwYXJ0bmVyRmllbGRQYWlyS2V5XVxuICAgIH07XG4gIH1cblxuXHQvKipcbiAgICogQ2FsY3VsYXRlIGEgcmFkaXVzIHpvb20gbXVsdGlwbGllciB0byByZW5kZXIgcG9pbnRzLCBzbyB0aGV5IGFyZSB2aXNpYmxlIGluIGFsbCB6b29tIGxldmVsXG4gICAqIEBwYXJhbSBtYXBTdGF0ZVxuICAgKiBAcGFyYW0gbWFwU3RhdGUuem9vbSAtIGFjdHVhbCB6b29tXG4gICAqIEBwYXJhbSBtYXBTdGF0ZS56b29tT2Zmc2V0IC0gem9vbU9mZnNldCB3aGVuIHJlbmRlciBpbiB0aGUgcGxvdCBjb250YWluZXIgZm9yIGV4cG9ydCBpbWFnZVxuICAgKiBAcmV0dXJucyB7bnVtYmVyfVxuICAgKi9cbiAgZ2V0Wm9vbUZhY3Rvcih7em9vbSwgem9vbU9mZnNldCA9IDB9KSB7XG4gICAgcmV0dXJuIE1hdGgucG93KDIsIE1hdGgubWF4KDE0IC0gem9vbSArIHpvb21PZmZzZXQsIDApKTtcbiAgfVxuXG5cdC8qKlxuICAgKiBDYWxjdWxhdGUgYSBlbGV2YXRpb24gem9vbSBtdWx0aXBsaWVyIHRvIHJlbmRlciBwb2ludHMsIHNvIHRoZXkgYXJlIHZpc2libGUgaW4gYWxsIHpvb20gbGV2ZWxcbiAgICogQHBhcmFtIG1hcFN0YXRlXG4gICAqIEBwYXJhbSBtYXBTdGF0ZS56b29tIC0gYWN0dWFsIHpvb21cbiAgICogQHBhcmFtIG1hcFN0YXRlLnpvb21PZmZzZXQgLSB6b29tT2Zmc2V0IHdoZW4gcmVuZGVyIGluIHRoZSBwbG90IGNvbnRhaW5lciBmb3IgZXhwb3J0IGltYWdlXG4gICAqIEByZXR1cm5zIHtudW1iZXJ9XG4gICAqL1xuICBnZXRFbGV2YXRpb25ab29tRmFjdG9yKHt6b29tLCB6b29tT2Zmc2V0ID0gMH0pIHtcbiAgICByZXR1cm4gTWF0aC5wb3coMiwgTWF0aC5tYXgoOCAtIHpvb20gKyB6b29tT2Zmc2V0LCAwKSk7XG4gIH1cblxuICBmb3JtYXRMYXllckRhdGEoZGF0YSwgYWxsRGF0YSwgZmlsdGVyZWRJbmRleCkge1xuICAgIHJldHVybiB7fTtcbiAgfVxuXG4gIHJlbmRlckxheWVyKCkge1xuICAgIHJldHVybiBbXTtcbiAgfVxuXG4gIGdldEhvdmVyRGF0YShvYmplY3QpIHtcbiAgICBpZiAoIW9iamVjdCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIC8vIGJ5IGRlZmF1bHQsIGVhY2ggZW50cnkgb2YgbGF5ZXJEYXRhIHNob3VsZCBoYXZlIGEgZGF0YSBwcm9wZXJ0eSBwb2ludHNcbiAgICAvLyB0byB0aGUgb3JpZ2luYWwgaXRlbSBpbiB0aGUgYWxsRGF0YSBhcnJheVxuICAgIC8vIGVhY2ggbGF5ZXIgY2FuIGltcGxlbWVudCBpdHMgb3duIGdldEhvdmVyRGF0YSBtZXRob2RcbiAgICByZXR1cm4gb2JqZWN0LmRhdGE7XG4gIH1cblxuICAvKipcbiAgICogV2hlbiBjaGFuZ2UgbGF5ZXIgdHlwZSwgdHJ5IHRvIGNvcHkgb3ZlciBsYXllciBjb25maWdzIGFzIG11Y2ggYXMgcG9zc2libGVcbiAgICogQHBhcmFtIGNvbmZpZ1RvQ29weSAtIGNvbmZpZyB0byBjb3B5IG92ZXJcbiAgICogQHBhcmFtIHZpc0NvbmZpZ1NldHRpbmdzIC0gdmlzQ29uZmlnIHNldHRpbmdzIG9mIGNvbmZpZyB0byBjb3B5XG4gICAqL1xuICBhc3NpZ25Db25maWdUb0xheWVyKGNvbmZpZ1RvQ29weSwgdmlzQ29uZmlnU2V0dGluZ3MpIHtcbiAgICAvLyBkb24ndCBkZWVwIG1lcmdlIHZpc3VhbENoYW5uZWwgZmllbGRcbiAgICBjb25zdCBub3RUb0RlZXBNZXJnZSA9IE9iamVjdC52YWx1ZXModGhpcy52aXN1YWxDaGFubmVscykubWFwKHYgPT4gdi5maWVsZCk7XG5cbiAgICAvLyBkb24ndCBkZWVwIG1lcmdlIGNvbG9yIHJhbmdlLCByZXZlcnNlZDogaXMgbm90IGEga2V5IGJ5IGRlZmF1bHRcbiAgICBub3RUb0RlZXBNZXJnZS5wdXNoKCdjb2xvclJhbmdlJyk7XG5cbiAgICAvLyBkb24ndCBjb3B5IG92ZXIgZG9tYWluXG4gICAgY29uc3Qgbm90VG9Db3B5ID0gT2JqZWN0LnZhbHVlcyh0aGlzLnZpc3VhbENoYW5uZWxzKS5tYXAodiA9PiB2LmRvbWFpbik7XG5cbiAgICAvLyBpZiByYW5nZSBpcyBmb3IgdGhlIHNhbWUgcHJvcGVydHkgZ3JvdXAgY29weSBpdCwgb3RoZXJ3aXNlLCBub3QgdG8gY29weVxuICAgIE9iamVjdC52YWx1ZXModGhpcy52aXN1YWxDaGFubmVscykuZm9yRWFjaCh2ID0+IHtcbiAgICAgIGlmIChjb25maWdUb0NvcHkudmlzQ29uZmlnW3YucmFuZ2VdICYmIHZpc0NvbmZpZ1NldHRpbmdzW3YucmFuZ2VdLmdyb3VwICE9PSB0aGlzLnZpc0NvbmZpZ1NldHRpbmdzW3YucmFuZ2VdLmdyb3VwKSB7XG4gICAgICAgIG5vdFRvQ29weS5wdXNoKHYucmFuZ2UpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgLy8gZG9uJ3QgY29weSBvdmVyIHZpc3VhbENoYW5uZWwgcmFuZ2VcbiAgICBjb25zdCBjdXJyZW50Q29uZmlnID0gdGhpcy5jb25maWc7XG4gICAgY29uc3QgY29waWVkID0gdGhpcy5jb3B5TGF5ZXJDb25maWcoY3VycmVudENvbmZpZywgY29uZmlnVG9Db3B5LCB7bm90VG9EZWVwTWVyZ2UsIG5vdFRvQ29weX0pO1xuXG4gICAgdGhpcy51cGRhdGVMYXllckNvbmZpZyhjb3BpZWQpO1xuICAgIC8vIHZhbGlkYXRlIHZpc3VhbENoYW5uZWwgZmllbGQgdHlwZSBhbmQgc2NhbGUgdHlwZXNcbiAgICBPYmplY3Qua2V5cyh0aGlzLnZpc3VhbENoYW5uZWxzKS5mb3JFYWNoKGNoYW5uZWwgPT4ge1xuICAgICAgdGhpcy52YWxpZGF0ZVZpc3VhbENoYW5uZWwoY2hhbm5lbCk7XG4gICAgfSk7XG4gIH1cblxuICAvKlxuICAgKiBSZWN1cnNpdmVseSBjb3B5IGNvbmZpZyBvdmVyIHRvIGFuIGVtcHR5IGxheWVyXG4gICAqIHdoZW4gcmVjZWl2ZWQgc2F2ZWQgY29uZmlnLCBvciBjb3B5IGNvbmZpZyBvdmVyIGZyb20gYSBkaWZmZXJlbnQgbGF5ZXIgdHlwZVxuICAgKiBtYWtlIHN1cmUgdG8gb25seSBjb3B5IG92ZXIgdmFsdWUgdG8gZXhpc3Rpbmcga2V5c1xuICAgKiBAcGFyYW0ge29iamVjdH0gY3VycmVudENvbmZpZyAtIGV4aXN0aW5nIGNvbmZpZyB0byBiZSBvdmVycmlkZVxuICAgKiBAcGFyYW0ge29iamVjdH0gY29uZmlnVG9Db3B5IC0gbmV3IENvbmZpZyB0byBjb3B5IG92ZXJcbiAgICogQHBhcmFtIHtzdHJpbmdbXX0gbm90VG9EZWVwTWVyZ2UgLSBhcnJheSBvZiBwcm9wZXJ0aWVzIHRvIG5vdCB0byBiZSBkZWVwIGNvcGllZFxuICAgKiBAcGFyYW0ge3N0cmluZ1tdfSBub3RUb0NvcHkgLSBhcnJheSBvZiBwcm9wZXJ0aWVzIG5vdCB0byBjb3B5XG4gICAqIEByZXR1cm5zIHtvYmplY3R9IC0gY29waWVkIGNvbmZpZ1xuICAgKi9cbiAgY29weUxheWVyQ29uZmlnKGN1cnJlbnRDb25maWcsIGNvbmZpZ1RvQ29weSwge25vdFRvRGVlcE1lcmdlID0gW10sIG5vdFRvQ29weSA9IFtdfSA9IHt9KSB7XG4gICAgY29uc3QgY29waWVkID0ge307XG4gICAgT2JqZWN0LmtleXMoY3VycmVudENvbmZpZykuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgaWYgKFxuICAgICAgICBpc1BsYWluT2JqZWN0KGN1cnJlbnRDb25maWdba2V5XSkgJiZcbiAgICAgICAgaXNQbGFpbk9iamVjdChjb25maWdUb0NvcHlba2V5XSkgJiZcbiAgICAgICAgIW5vdFRvRGVlcE1lcmdlLmluY2x1ZGVzKGtleSkgJiZcbiAgICAgICAgIW5vdFRvQ29weS5pbmNsdWRlcyhrZXkpXG4gICAgICApIHtcbiAgICAgICAgLy8gcmVjdXJzaXZlbHkgYXNzaWduIG9iamVjdCB2YWx1ZVxuICAgICAgICBjb3BpZWRba2V5XSA9IHRoaXMuY29weUxheWVyQ29uZmlnKGN1cnJlbnRDb25maWdba2V5XSwgY29uZmlnVG9Db3B5W2tleV0sIHtub3RUb0RlZXBNZXJnZSwgbm90VG9Db3B5fSk7XG4gICAgICB9IGVsc2UgaWYgKFxuICAgICAgICBub3ROdWxsb3JVbmRlZmluZWQoY29uZmlnVG9Db3B5W2tleV0pICYmXG4gICAgICAgICFub3RUb0NvcHkuaW5jbHVkZXMoa2V5KVxuICAgICAgKSB7XG4gICAgICAgIC8vIGNvcHlcbiAgICAgICAgY29waWVkW2tleV0gPSBjb25maWdUb0NvcHlba2V5XTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIGtlZXAgZXhpc3RpbmdcbiAgICAgICAgY29waWVkW2tleV0gPSBjdXJyZW50Q29uZmlnW2tleV07XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gY29waWVkO1xuICB9XG5cbiAgcmVnaXN0ZXJWaXNDb25maWcobGF5ZXJWaXNDb25maWdzKSB7XG4gICAgT2JqZWN0LmtleXMobGF5ZXJWaXNDb25maWdzKS5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgaWYgKFxuICAgICAgICB0eXBlb2YgaXRlbSA9PT0gJ3N0cmluZycgJiZcbiAgICAgICAgTEFZRVJfVklTX0NPTkZJR1NbbGF5ZXJWaXNDb25maWdzW2l0ZW1dXVxuICAgICAgKSB7XG4gICAgICAgIC8vIGlmIGFzc2lnbmVkIG9uZSBvZiBkZWZhdWx0IExBWUVSX0NPTkZJR1NcbiAgICAgICAgdGhpcy5jb25maWcudmlzQ29uZmlnW2l0ZW1dID1cbiAgICAgICAgICBMQVlFUl9WSVNfQ09ORklHU1tsYXllclZpc0NvbmZpZ3NbaXRlbV1dLmRlZmF1bHRWYWx1ZTtcbiAgICAgICAgdGhpcy52aXNDb25maWdTZXR0aW5nc1tpdGVtXSA9IExBWUVSX1ZJU19DT05GSUdTW2xheWVyVmlzQ29uZmlnc1tpdGVtXV07XG4gICAgICB9IGVsc2UgaWYgKFxuICAgICAgICBbJ3R5cGUnLCAnZGVmYXVsdFZhbHVlJ10uZXZlcnkocCA9PiBsYXllclZpc0NvbmZpZ3NbaXRlbV1bcF0pXG4gICAgICApIHtcbiAgICAgICAgLy8gaWYgcHJvdmlkZWQgY3VzdG9taXplZCB2aXNDb25maWcsIGFuZCBoYXMgdHlwZSAmJiBkZWZhdWx0VmFsdWVcbiAgICAgICAgLy8gVE9ETzogZnVydGhlciBjaGVjayBpZiBjdXN0b21pemVkIHZpc0NvbmZpZyBpcyB2YWxpZFxuICAgICAgICB0aGlzLmNvbmZpZy52aXNDb25maWdbaXRlbV0gPSBsYXllclZpc0NvbmZpZ3NbaXRlbV0uZGVmYXVsdFZhbHVlO1xuICAgICAgICB0aGlzLnZpc0NvbmZpZ1NldHRpbmdzW2l0ZW1dID0gbGF5ZXJWaXNDb25maWdzW2l0ZW1dO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgZ2V0TGF5ZXJDb2x1bW5zKCkge1xuICAgIGNvbnN0IHJlcXVpcmVkID0gdGhpcy5yZXF1aXJlZExheWVyQ29sdW1ucy5yZWR1Y2UoXG4gICAgICAoYWNjdSwga2V5KSA9PiAoe1xuICAgICAgICAuLi5hY2N1LFxuICAgICAgICBba2V5XToge3ZhbHVlOiBudWxsLCBmaWVsZElkeDogLTF9XG4gICAgICB9KSxcbiAgICAgIHt9XG4gICAgKTtcbiAgICBjb25zdCBvcHRpb25hbCA9IHRoaXMub3B0aW9uYWxDb2x1bW5zLnJlZHVjZShcbiAgICAgIChhY2N1LCBrZXkpID0+ICh7XG4gICAgICAgIC4uLmFjY3UsXG4gICAgICAgIFtrZXldOiB7dmFsdWU6IG51bGwsIGZpZWxkSWR4OiAtMSwgb3B0aW9uYWw6IHRydWV9XG4gICAgICB9KSxcbiAgICAgIHt9XG4gICAgKTtcblxuICAgIHJldHVybiB7Li4ucmVxdWlyZWQsIC4uLm9wdGlvbmFsfTtcbiAgfVxuXG4gIHVwZGF0ZUxheWVyQ29uZmlnKG5ld0NvbmZpZykge1xuICAgIHRoaXMuY29uZmlnID0gey4uLnRoaXMuY29uZmlnLCAuLi5uZXdDb25maWd9O1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgdXBkYXRlTGF5ZXJWaXNDb25maWcobmV3VmlzQ29uZmlnKSB7XG4gICAgdGhpcy5jb25maWcudmlzQ29uZmlnID0gey4uLnRoaXMuY29uZmlnLnZpc0NvbmZpZywgLi4ubmV3VmlzQ29uZmlnfTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuICAvKipcbiAgICogQ2hlY2sgd2hldGhlciBsYXllciBoYXMgYWxsIGNvbHVtbnNcbiAgICpcbiAgICogQHBhcmFtIHtvYmplY3R9IGxheWVyXG4gICAqIEByZXR1cm5zIHtib29sZWFufSB5ZXMgb3Igbm9cbiAgICovXG4gIGhhc0FsbENvbHVtbnMoKSB7XG4gICAgY29uc3Qge2NvbHVtbnN9ID0gdGhpcy5jb25maWc7XG4gICAgcmV0dXJuIChcbiAgICAgIGNvbHVtbnMgJiZcbiAgICAgIE9iamVjdC52YWx1ZXMoY29sdW1ucykuZXZlcnkodiA9PiB7XG4gICAgICAgIHJldHVybiBCb29sZWFuKHYub3B0aW9uYWwgfHwgKHYudmFsdWUgJiYgdi5maWVsZElkeCA+IC0xKSk7XG4gICAgICB9KVxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2sgd2hldGhlciBsYXllciBoYXMgZGF0YVxuICAgKlxuICAgKiBAcGFyYW0ge29iamVjdH0gbGF5ZXJcbiAgICogQHBhcmFtIHtBcnJheSB8IE9iamVjdH0gbGF5ZXJEYXRhXG4gICAqIEByZXR1cm5zIHtib29sZWFufSB5ZXMgb3Igbm9cbiAgICovXG4gIGhhc0xheWVyRGF0YShsYXllckRhdGEpIHtcbiAgICBpZiAoIWxheWVyRGF0YSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHJldHVybiBCb29sZWFuKGxheWVyRGF0YS5kYXRhICYmIGxheWVyRGF0YS5kYXRhLmxlbmd0aCk7XG4gIH1cblxuICBpc1ZhbGlkVG9TYXZlKCkge1xuICAgIHJldHVybiB0aGlzLnR5cGUgJiYgdGhpcy5oYXNBbGxDb2x1bW5zKCk7XG4gIH1cblxuICBzaG91bGRSZW5kZXJMYXllcihkYXRhKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIHRoaXMudHlwZSAmJlxuICAgICAgdGhpcy5oYXNBbGxDb2x1bW5zKCkgJiZcbiAgICAgIHRoaXMuY29uZmlnLmlzVmlzaWJsZSAmJlxuICAgICAgdGhpcy5oYXNMYXllckRhdGEoZGF0YSlcbiAgICApO1xuICB9XG5cbiAgZ2V0VmlzQ2hhbm5lbFNjYWxlKHNjYWxlLCBkb21haW4sIHJhbmdlLCBmaXhlZCkge1xuICAgIHJldHVybiBTQ0FMRV9GVU5DW2ZpeGVkID8gJ2xpbmVhcicgOiBzY2FsZV0oKVxuICAgICAgLmRvbWFpbihkb21haW4pXG4gICAgICAucmFuZ2UoZml4ZWQgPyBkb21haW4gOiByYW5nZSk7XG4gIH1cblxuICBnZXRQb2ludHNCb3VuZHMoYWxsRGF0YSwgZ2V0UG9zaXRpb24pIHtcbiAgICAvLyBubyBuZWVkIHRvIGxvb3AgdGhyb3VnaCB0aGUgZW50aXJlIGRhdGFzZXRcbiAgICAvLyBnZXQgYSBzYW1wbGUgb2YgZGF0YSB0byBjYWxjdWxhdGUgYm91bmRzXG4gICAgY29uc3Qgc2FtcGxlRGF0YSA9XG4gICAgICBhbGxEYXRhLmxlbmd0aCA+IE1BWF9TQU1QTEVfU0laRVxuICAgICAgICA/IGdldFNhbXBsZURhdGEoYWxsRGF0YSwgTUFYX1NBTVBMRV9TSVpFKVxuICAgICAgICA6IGFsbERhdGE7XG4gICAgY29uc3QgcG9pbnRzID0gc2FtcGxlRGF0YS5tYXAoZ2V0UG9zaXRpb24pO1xuXG4gICAgY29uc3QgbGF0Qm91bmRzID0gZ2V0TGF0TG5nQm91bmRzKHBvaW50cywgMSwgWy05MCwgOTBdKTtcbiAgICBjb25zdCBsbmdCb3VuZHMgPSBnZXRMYXRMbmdCb3VuZHMocG9pbnRzLCAwLCBbLTE4MCwgMTgwXSk7XG5cbiAgICBpZiAoIWxhdEJvdW5kcyB8fCAhbG5nQm91bmRzKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICByZXR1cm4gW2xuZ0JvdW5kc1swXSwgbGF0Qm91bmRzWzBdLCBsbmdCb3VuZHNbMV0sIGxhdEJvdW5kc1sxXV07XG4gIH1cblxuICBnZXRMaWdodFNldHRpbmdzRnJvbUJvdW5kcyhib3VuZHMpIHtcbiAgICByZXR1cm4gQXJyYXkuaXNBcnJheShib3VuZHMpICYmIGJvdW5kcy5sZW5ndGggPj0gNFxuICAgICAgPyB7XG4gICAgICAgICAgLi4uREVGQVVMVF9MSUdIVF9TRVRUSU5HUyxcbiAgICAgICAgICBsaWdodHNQb3NpdGlvbjogW1xuICAgICAgICAgICAgLi4uYm91bmRzLnNsaWNlKDAsIDIpLFxuICAgICAgICAgICAgREVGQVVMVF9MSUdIVF9TRVRUSU5HUy5saWdodHNQb3NpdGlvblsyXSxcbiAgICAgICAgICAgIC4uLmJvdW5kcy5zbGljZSgyLCA0KSxcbiAgICAgICAgICAgIERFRkFVTFRfTElHSFRfU0VUVElOR1MubGlnaHRzUG9zaXRpb25bNV1cbiAgICAgICAgICBdXG4gICAgICAgIH1cbiAgICAgIDogREVGQVVMVF9MSUdIVF9TRVRUSU5HUztcbiAgfVxuXG4gIGdldEVuY29kZWRDaGFubmVsVmFsdWUoXG4gICAgc2NhbGUsXG4gICAgZGF0YSxcbiAgICBmaWVsZCxcbiAgICBkZWZhdWx0VmFsdWUgPSBOT19WQUxVRV9DT0xPUixcbiAgICBnZXRWYWx1ZSA9IGRlZmF1bHRHZXRGaWVsZFZhbHVlXG4gICkge1xuICAgIGNvbnN0IHt0eXBlfSA9IGZpZWxkO1xuICAgIGNvbnN0IHZhbHVlID0gZ2V0VmFsdWUoZmllbGQsIGRhdGEpO1xuICAgIGxldCBhdHRyaWJ1dGVWYWx1ZTtcbiAgICBpZiAodHlwZSA9PT0gQUxMX0ZJRUxEX1RZUEVTLnRpbWVzdGFtcCkge1xuICAgICAgLy8gc2hvdWxkbid0IG5lZWQgdG8gY29udmVydCBoZXJlXG4gICAgICAvLyBzY2FsZSBGdW5jdGlvbiBzaG91bGQgdGFrZSBjYXJlIG9mIGl0XG4gICAgICBhdHRyaWJ1dGVWYWx1ZSA9IHNjYWxlKG5ldyBEYXRlKHZhbHVlKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGF0dHJpYnV0ZVZhbHVlID0gc2NhbGUodmFsdWUpO1xuICAgIH1cblxuICAgIGlmICghYXR0cmlidXRlVmFsdWUpIHtcbiAgICAgIGF0dHJpYnV0ZVZhbHVlID0gZGVmYXVsdFZhbHVlO1xuICAgIH1cblxuICAgIHJldHVybiBhdHRyaWJ1dGVWYWx1ZTtcbiAgfVxuXG4gIHVwZGF0ZU1ldGEobWV0YSkge1xuICAgIHRoaXMubWV0YSA9IHsuLi50aGlzLm1ldGEsIC4uLm1ldGF9O1xuICB9XG5cbiAgLyoqXG4gICAqIGhlbHBlciBmdW5jdGlvbiB0byB1cGRhdGUgb25lIGxheWVyIGRvbWFpbiB3aGVuIHN0YXRlLmRhdGEgY2hhbmdlZFxuICAgKiBpZiBzdGF0ZS5kYXRhIGNoYW5nZSBpcyBkdWUgb3QgdXBkYXRlIGZpbHRlciwgbmV3RmlsZXIgd2lsbCBiZSBwYXNzZWRcbiAgICogY2FsbGVkIGJ5IHVwZGF0ZUFsbExheWVyRG9tYWluRGF0YVxuICAgKiBAcGFyYW0ge09iamVjdH0gZGF0YXNldFxuICAgKiBAcGFyYW0ge09iamVjdH0gbmV3RmlsdGVyXG4gICAqIEByZXR1cm5zIHtvYmplY3R9IGxheWVyXG4gICAqL1xuICB1cGRhdGVMYXllckRvbWFpbihkYXRhc2V0LCBuZXdGaWx0ZXIpIHtcbiAgICBPYmplY3QudmFsdWVzKHRoaXMudmlzdWFsQ2hhbm5lbHMpLmZvckVhY2goY2hhbm5lbCA9PiB7XG4gICAgICBjb25zdCB7c2NhbGV9ID0gY2hhbm5lbDtcbiAgICAgIGNvbnN0IHNjYWxlVHlwZSA9IHRoaXMuY29uZmlnW3NjYWxlXTtcbiAgICAgIC8vIG9yZGluYWwgZG9tYWluIGlzIGJhc2VkIG9uIGFsbERhdGEsIGlmIG9ubHkgZmlsdGVyIGNoYW5nZWRcbiAgICAgIC8vIG5vIG5lZWQgdG8gdXBkYXRlIG9yZGluYWwgZG9tYWluXG4gICAgICBpZiAoIW5ld0ZpbHRlciB8fCBzY2FsZVR5cGUgIT09IFNDQUxFX1RZUEVTLm9yZGluYWwpIHtcbiAgICAgICAgY29uc3Qge2RvbWFpbn0gPSBjaGFubmVsO1xuICAgICAgICBjb25zdCB1cGRhdGVkRG9tYWluID0gdGhpcy5jYWxjdWxhdGVMYXllckRvbWFpbihkYXRhc2V0LCBjaGFubmVsKTtcblxuICAgICAgICB0aGlzLnVwZGF0ZUxheWVyQ29uZmlnKHtbZG9tYWluXTogdXBkYXRlZERvbWFpbn0pO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogVmFsaWRhdGUgdmlzdWFsIGNoYW5uZWwgZmllbGQgYW5kIHNjYWxlcyBiYXNlZCBvbiBzdXBwb3J0ZWQgZmllbGQgJiBzY2FsZSB0eXBlXG4gICAqIEBwYXJhbSBjaGFubmVsXG4gICAqL1xuICB2YWxpZGF0ZVZpc3VhbENoYW5uZWwoY2hhbm5lbCkge1xuICAgIHRoaXMudmFsaWRhdGVGaWVsZFR5cGUoY2hhbm5lbCk7XG4gICAgdGhpcy52YWxpZGF0ZVNjYWxlKGNoYW5uZWwpO1xuICB9XG5cbiAgLyoqXG4gICAqIFZhbGlkYXRlIGZpZWxkIHR5cGUgYmFzZWQgb24gY2hhbm5lbFNjYWxlVHlwZVxuICAgKi9cbiAgdmFsaWRhdGVGaWVsZFR5cGUoY2hhbm5lbCkge1xuICAgIGNvbnN0IHZpc3VhbENoYW5uZWwgPSB0aGlzLnZpc3VhbENoYW5uZWxzW2NoYW5uZWxdO1xuICAgIGNvbnN0IHtmaWVsZCwgY2hhbm5lbFNjYWxlVHlwZSwgc3VwcG9ydGVkRmllbGRUeXBlc30gPSB2aXN1YWxDaGFubmVsO1xuXG4gICAgaWYgKHRoaXMuY29uZmlnW2ZpZWxkXSkge1xuICAgICAgLy8gaWYgZmllbGQgaXMgc2VsZWN0ZWQsIGNoZWNrIGlmIGZpZWxkIHR5cGUgaXMgc3VwcG9ydGVkXG4gICAgICBjb25zdCBjaGFubmVsU3VwcG9ydGVkRmllbGRUeXBlcyA9IHN1cHBvcnRlZEZpZWxkVHlwZXMgfHwgQ0hBTk5FTF9TQ0FMRV9TVVBQT1JURURfRklFTERTW2NoYW5uZWxTY2FsZVR5cGVdO1xuXG4gICAgICBpZiAoIWNoYW5uZWxTdXBwb3J0ZWRGaWVsZFR5cGVzLmluY2x1ZGVzKHRoaXMuY29uZmlnW2ZpZWxkXS50eXBlKSkge1xuICAgICAgICAvLyBmaWVsZCB0eXBlIGlzIG5vdCBzdXBwb3J0ZWQsIHNldCBpdCBiYWNrIHRvIG51bGxcbiAgICAgICAgLy8gc2V0IHNjYWxlIGJhY2sgdG8gZGVmYXVsdFxuICAgICAgICB0aGlzLnVwZGF0ZUxheWVyQ29uZmlnKHtbZmllbGRdOiBudWxsfSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFZhbGlkYXRlIHNjYWxlIHR5cGUgYmFzZWQgb24gYWdncmVnYXRpb25cbiAgICovXG4gIHZhbGlkYXRlU2NhbGUoY2hhbm5lbCkge1xuICAgIGNvbnN0IHZpc3VhbENoYW5uZWwgPSB0aGlzLnZpc3VhbENoYW5uZWxzW2NoYW5uZWxdO1xuICAgIGNvbnN0IHtzY2FsZX0gPSB2aXN1YWxDaGFubmVsO1xuICAgIGlmICghc2NhbGUpIHtcbiAgICAgIC8vIHZpc3VhbENoYW5uZWwgZG9lc24ndCBoYXZlIHNjYWxlXG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IHNjYWxlT3B0aW9ucyA9IHRoaXMuZ2V0U2NhbGVPcHRpb25zKGNoYW5uZWwpO1xuICAgIC8vIGNoZWNrIGlmIGN1cnJlbnQgc2VsZWN0ZWQgc2NhbGUgaXNcbiAgICAvLyBzdXBwb3J0ZWQsIGlmIG5vdCwgY2hhbmdlIHRvIGRlZmF1bHRcbiAgICBpZiAoIXNjYWxlT3B0aW9ucy5pbmNsdWRlcyh0aGlzLmNvbmZpZ1tzY2FsZV0pKSB7XG4gICAgICB0aGlzLnVwZGF0ZUxheWVyQ29uZmlnKHtbc2NhbGVdOiBzY2FsZU9wdGlvbnNbMF19KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogR2V0IHNjYWxlIG9wdGlvbnMgYmFzZWQgb24gY3VycmVudCBmaWVsZFxuICAgKiBAcGFyYW0ge3N0cmluZ30gY2hhbm5lbFxuICAgKiBAcmV0dXJucyB7c3RyaW5nW119XG4gICAqL1xuICBnZXRTY2FsZU9wdGlvbnMoY2hhbm5lbCkge1xuICAgIGNvbnN0IHZpc3VhbENoYW5uZWwgPSB0aGlzLnZpc3VhbENoYW5uZWxzW2NoYW5uZWxdO1xuICAgIGNvbnN0IHtmaWVsZCwgc2NhbGUsIGNoYW5uZWxTY2FsZVR5cGV9ID0gdmlzdWFsQ2hhbm5lbDtcblxuICAgIHJldHVybiB0aGlzLmNvbmZpZ1tmaWVsZF0gP1xuICAgICAgRklFTERfT1BUU1t0aGlzLmNvbmZpZ1tmaWVsZF0udHlwZV0uc2NhbGVbY2hhbm5lbFNjYWxlVHlwZV0gOlxuICAgICAgW3RoaXMuZ2V0RGVmYXVsdExheWVyQ29uZmlnKClbc2NhbGVdXTtcbiAgfVxuXG4gIHVwZGF0ZUxheWVyVmlzdWFsQ2hhbm5lbChkYXRhc2V0LCBjaGFubmVsKSB7XG4gICAgY29uc3QgdmlzdWFsQ2hhbm5lbCA9IHRoaXMudmlzdWFsQ2hhbm5lbHNbY2hhbm5lbF07XG5cbiAgICB0aGlzLnZhbGlkYXRlVmlzdWFsQ2hhbm5lbChjaGFubmVsKTtcbiAgICAgIC8vIGNhbGN1bGF0ZSBsYXllciBjaGFubmVsIGRvbWFpblxuICAgIGNvbnN0IHVwZGF0ZWREb21haW4gPSB0aGlzLmNhbGN1bGF0ZUxheWVyRG9tYWluKGRhdGFzZXQsIHZpc3VhbENoYW5uZWwpO1xuXG4gICAgdGhpcy51cGRhdGVMYXllckNvbmZpZyh7W3Zpc3VhbENoYW5uZWwuZG9tYWluXTogdXBkYXRlZERvbWFpbn0pO1xuICB9XG5cbiAgY2FsY3VsYXRlTGF5ZXJEb21haW4oZGF0YXNldCwgdmlzdWFsQ2hhbm5lbCkge1xuICAgIGNvbnN0IHthbGxEYXRhLCBmaWx0ZXJlZEluZGV4Rm9yRG9tYWlufSA9IGRhdGFzZXQ7XG4gICAgY29uc3QgZGVmYXVsdERvbWFpbiA9IFswLCAxXTtcbiAgICBjb25zdCB7c2NhbGV9ID0gdmlzdWFsQ2hhbm5lbDtcbiAgICBjb25zdCBzY2FsZVR5cGUgPSB0aGlzLmNvbmZpZ1tzY2FsZV07XG5cbiAgICBjb25zdCBmaWVsZCA9IHRoaXMuY29uZmlnW3Zpc3VhbENoYW5uZWwuZmllbGRdO1xuICAgIGlmICghZmllbGQpIHtcbiAgICAgIC8vIGlmIGNvbG9yRmllbGQgb3Igc2l6ZUZpZWxkIHdlcmUgc2V0IGJhY2sgdG8gbnVsbFxuICAgICAgcmV0dXJuIGRlZmF1bHREb21haW47XG4gICAgfVxuXG4gICAgaWYgKCFTQ0FMRV9UWVBFU1tzY2FsZVR5cGVdKSB7XG4gICAgICBDb25zb2xlLmVycm9yKGBzY2FsZSB0eXBlICR7c2NhbGVUeXBlfSBub3Qgc3VwcG9ydGVkYCk7XG4gICAgICByZXR1cm4gZGVmYXVsdERvbWFpbjtcbiAgICB9XG5cbiAgICAvLyBUT0RPOiByZWZhY3RvciB0byBhZGQgdmFsdWVBY2Nlc3NvciB0byBmaWVsZFxuICAgIGNvbnN0IGZpZWxkSWR4ID0gZmllbGQudGFibGVGaWVsZEluZGV4IC0gMTtcbiAgICBjb25zdCBpc1RpbWUgPSBmaWVsZC50eXBlID09PSBBTExfRklFTERfVFlQRVMudGltZXN0YW1wO1xuICAgIGNvbnN0IHZhbHVlQWNjZXNzb3IgPSBtYXliZVRvRGF0ZS5iaW5kKFxuICAgICAgbnVsbCxcbiAgICAgIGlzVGltZSxcbiAgICAgIGZpZWxkSWR4LFxuICAgICAgZmllbGQuZm9ybWF0XG4gICAgKTtcbiAgICBjb25zdCBpbmRleFZhbHVlQWNjZXNzb3IgPSBpID0+IHZhbHVlQWNjZXNzb3IoYWxsRGF0YVtpXSk7XG5cbiAgICBjb25zdCBzb3J0RnVuY3Rpb24gPSBnZXRTb3J0aW5nRnVuY3Rpb24oZmllbGQudHlwZSk7XG5cbiAgICBzd2l0Y2ggKHNjYWxlVHlwZSkge1xuICAgICAgY2FzZSBTQ0FMRV9UWVBFUy5vcmRpbmFsOlxuICAgICAgY2FzZSBTQ0FMRV9UWVBFUy5wb2ludDpcbiAgICAgICAgLy8gZG8gbm90IHJlY2FsY3VsYXRlIG9yZGluYWwgZG9tYWluIGJhc2VkIG9uIGZpbHRlcmVkIGRhdGFcbiAgICAgICAgLy8gZG9uJ3QgbmVlZCB0byB1cGRhdGUgb3JkaW5hbCBkb21haW4gZXZlcnkgdGltZVxuICAgICAgICByZXR1cm4gZ2V0T3JkaW5hbERvbWFpbihhbGxEYXRhLCB2YWx1ZUFjY2Vzc29yKTtcblxuICAgICAgY2FzZSBTQ0FMRV9UWVBFUy5xdWFudGlsZTpcbiAgICAgICAgcmV0dXJuIGdldFF1YW50aWxlRG9tYWluKGZpbHRlcmVkSW5kZXhGb3JEb21haW4sIGluZGV4VmFsdWVBY2Nlc3Nvciwgc29ydEZ1bmN0aW9uKTtcblxuICAgICAgY2FzZSBTQ0FMRV9UWVBFUy5xdWFudGl6ZTpcbiAgICAgIGNhc2UgU0NBTEVfVFlQRVMubGluZWFyOlxuICAgICAgY2FzZSBTQ0FMRV9UWVBFUy5zcXJ0OlxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIGdldExpbmVhckRvbWFpbihmaWx0ZXJlZEluZGV4Rm9yRG9tYWluLCBpbmRleFZhbHVlQWNjZXNzb3IpO1xuICAgIH1cbiAgfVxuXG4gIGlzTGF5ZXJIb3ZlcmVkKG9iamVjdEluZm8pIHtcbiAgICByZXR1cm4gKFxuICAgICAgb2JqZWN0SW5mbyAmJlxuICAgICAgb2JqZWN0SW5mby5sYXllciAmJlxuICAgICAgb2JqZWN0SW5mby5waWNrZWQgJiZcbiAgICAgIG9iamVjdEluZm8ubGF5ZXIucHJvcHMuaWQgPT09IHRoaXMuaWRcbiAgICApO1xuICB9XG5cbiAgZ2V0UmFkaXVzU2NhbGVCeVpvb20obWFwU3RhdGUsIGZpeGVkUmFkaXVzKSB7XG4gICAgY29uc3QgcmFkaXVzQ2hhbm5lbCA9IE9iamVjdC52YWx1ZXModGhpcy52aXN1YWxDaGFubmVscykuZmluZChcbiAgICAgIHZjID0+IHZjLnByb3BlcnR5ID09PSAncmFkaXVzJ1xuICAgICk7XG5cbiAgICBpZiAoIXJhZGl1c0NoYW5uZWwpIHtcbiAgICAgIHJldHVybiAxO1xuICAgIH1cblxuICAgIGNvbnN0IGZpZWxkID0gcmFkaXVzQ2hhbm5lbC5maWVsZDtcbiAgICBjb25zdCBmaXhlZCA9XG4gICAgICBmaXhlZFJhZGl1cyA9PT0gdW5kZWZpbmVkXG4gICAgICAgID8gdGhpcy5jb25maWcudmlzQ29uZmlnLmZpeGVkUmFkaXVzXG4gICAgICAgIDogZml4ZWRSYWRpdXM7XG4gICAgY29uc3Qge3JhZGl1c30gPSB0aGlzLmNvbmZpZy52aXNDb25maWc7XG5cbiAgICByZXR1cm4gZml4ZWRcbiAgICAgID8gMVxuICAgICAgOiAodGhpcy5jb25maWdbZmllbGRdID8gMSA6IHJhZGl1cykgKiB0aGlzLmdldFpvb21GYWN0b3IobWFwU3RhdGUpO1xuICB9XG5cbiAgc2hvdWxkQ2FsY3VsYXRlTGF5ZXJEYXRhKHByb3BzKSB7XG4gICAgcmV0dXJuIHByb3BzLnNvbWUocCA9PiAhdGhpcy5ub25lTGF5ZXJEYXRhQWZmZWN0aW5nUHJvcHMuaW5jbHVkZXMocCkpO1xuICB9XG59XG4iXX0=