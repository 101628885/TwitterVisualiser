'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AggregationTypeSelector = exports.AggrColorScaleSelector = exports.ChannelByValueSelector = exports.ColorRangeConfig = exports.ArcLayerColorSelector = exports.LayerColorSelector = exports.HowToButton = exports.default = undefined;

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends3 = require('babel-runtime/helpers/extends');

var _extends4 = _interopRequireDefault(_extends3);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _taggedTemplateLiteral2 = require('babel-runtime/helpers/taggedTemplateLiteral');

var _taggedTemplateLiteral3 = _interopRequireDefault(_taggedTemplateLiteral2);

var _class, _temp;

var _templateObject = (0, _taggedTemplateLiteral3.default)(['\n  position: relative;\n  margin-top: 12px;\n'], ['\n  position: relative;\n  margin-top: 12px;\n']),
    _templateObject2 = (0, _taggedTemplateLiteral3.default)(['\n  margin-top: 12px;\n'], ['\n  margin-top: 12px;\n']),
    _templateObject3 = (0, _taggedTemplateLiteral3.default)(['\n  position: absolute;\n  right: 0;\n  top: 0;\n'], ['\n  position: absolute;\n  right: 0;\n  top: 0;\n']); // Copyright (c) 2018 Uber Technologies, Inc.
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

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _styledComponents3 = require('../../common/styled-components');

var _itemSelector = require('../../common/item-selector/item-selector');

var _itemSelector2 = _interopRequireDefault(_itemSelector);

var _visConfigByFieldSelector = require('./vis-config-by-field-selector');

var _visConfigByFieldSelector2 = _interopRequireDefault(_visConfigByFieldSelector);

var _layerColumnConfig = require('./layer-column-config');

var _layerColumnConfig2 = _interopRequireDefault(_layerColumnConfig);

var _layerTypeSelector = require('./layer-type-selector');

var _layerTypeSelector2 = _interopRequireDefault(_layerTypeSelector);

var _dimensionScaleSelector = require('./dimension-scale-selector');

var _dimensionScaleSelector2 = _interopRequireDefault(_dimensionScaleSelector);

var _colorSelector = require('./color-selector');

var _colorSelector2 = _interopRequireDefault(_colorSelector);

var _sourceDataSelector = require('../source-data-selector');

var _sourceDataSelector2 = _interopRequireDefault(_sourceDataSelector);

var _visConfigSwitch = require('./vis-config-switch');

var _visConfigSwitch2 = _interopRequireDefault(_visConfigSwitch);

var _visConfigSlider = require('./vis-config-slider');

var _visConfigSlider2 = _interopRequireDefault(_visConfigSlider);

var _layerConfigGroup = require('./layer-config-group');

var _layerConfigGroup2 = _interopRequireDefault(_layerConfigGroup);

var _layerFactory = require('../../../layers/layer-factory');

var _utils = require('../../../utils/utils');

var _defaultSettings = require('../../../constants/default-settings');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var StyledLayerConfigurator = _styledComponents2.default.div.attrs({
  className: 'layer-panel__config'
})(_templateObject);

var StyledLayerVisualConfigurator = _styledComponents2.default.div.attrs({
  className: 'layer-panel__config__visualC-config'
})(_templateObject2);

var LayerConfigurator = (_temp = _class = function (_Component) {
  (0, _inherits3.default)(LayerConfigurator, _Component);

  function LayerConfigurator() {
    (0, _classCallCheck3.default)(this, LayerConfigurator);
    return (0, _possibleConstructorReturn3.default)(this, (LayerConfigurator.__proto__ || Object.getPrototypeOf(LayerConfigurator)).apply(this, arguments));
  }

  (0, _createClass3.default)(LayerConfigurator, [{
    key: '_renderPointLayerConfig',
    value: function _renderPointLayerConfig(props) {
      return this._renderScatterplotLayerConfig(props);
    }
  }, {
    key: '_renderIconLayerConfig',
    value: function _renderIconLayerConfig(props) {
      return this._renderScatterplotLayerConfig(props);
    }
  }, {
    key: '_renderScatterplotLayerConfig',
    value: function _renderScatterplotLayerConfig(_ref) {
      var layer = _ref.layer,
          visConfiguratorProps = _ref.visConfiguratorProps,
          layerChannelConfigProps = _ref.layerChannelConfigProps,
          layerConfiguratorProps = _ref.layerConfiguratorProps;

      return _react2.default.createElement(
        StyledLayerVisualConfigurator,
        null,
        _react2.default.createElement(
          _layerConfigGroup2.default,
          { label: 'color' },
          layer.config.colorField ? _react2.default.createElement(ColorRangeConfig, visConfiguratorProps) : _react2.default.createElement(LayerColorSelector, layerConfiguratorProps),
          _react2.default.createElement(ChannelByValueSelector, (0, _extends4.default)({
            channel: layer.visualChannels.color
          }, layerChannelConfigProps)),
          _react2.default.createElement(_visConfigSlider2.default, (0, _extends4.default)({}, _layerFactory.LAYER_VIS_CONFIGS.opacity, visConfiguratorProps))
        ),
        _react2.default.createElement(
          _layerConfigGroup2.default,
          { label: 'radius' },
          !layer.config.sizeField ? _react2.default.createElement(_visConfigSlider2.default, (0, _extends4.default)({}, _layerFactory.LAYER_VIS_CONFIGS.radius, visConfiguratorProps, {
            label: false,
            disabled: Boolean(layer.config.sizeField)
          })) : _react2.default.createElement(_visConfigSlider2.default, (0, _extends4.default)({}, _layerFactory.LAYER_VIS_CONFIGS.radiusRange, visConfiguratorProps, {
            disabled: !layer.config.sizeField || layer.config.visConfig.fixedRadius
          })),
          _react2.default.createElement(ChannelByValueSelector, (0, _extends4.default)({
            channel: layer.visualChannels.size
          }, layerChannelConfigProps)),
          layer.config.sizeField ? _react2.default.createElement(_visConfigSwitch2.default, (0, _extends4.default)({}, _layerFactory.LAYER_VIS_CONFIGS.fixedRadius, visConfiguratorProps, {
            disabled: !layer.config.sizeField
          })) : null
        ),
        layer.type === _defaultSettings.LAYER_TYPES.point ? _react2.default.createElement(
          _layerConfigGroup2.default,
          (0, _extends4.default)({}, _layerFactory.LAYER_VIS_CONFIGS.outline, visConfiguratorProps),
          _react2.default.createElement(_visConfigSlider2.default, (0, _extends4.default)({}, _layerFactory.LAYER_VIS_CONFIGS.thickness, visConfiguratorProps, {
            label: false,
            disabled: !layer.config.visConfig.outline
          }))
        ) : null,
        _react2.default.createElement(_layerConfigGroup2.default, (0, _extends4.default)({}, _layerFactory.LAYER_VIS_CONFIGS['hi-precision'], visConfiguratorProps))
      );
    }
  }, {
    key: '_renderClusterLayerConfig',
    value: function _renderClusterLayerConfig(_ref2) {
      var layer = _ref2.layer,
          visConfiguratorProps = _ref2.visConfiguratorProps,
          layerConfiguratorProps = _ref2.layerConfiguratorProps,
          layerChannelConfigProps = _ref2.layerChannelConfigProps;

      return _react2.default.createElement(
        StyledLayerVisualConfigurator,
        null,
        _react2.default.createElement(
          _layerConfigGroup2.default,
          { label: 'color' },
          _react2.default.createElement(ColorRangeConfig, visConfiguratorProps),
          _react2.default.createElement(AggrColorScaleSelector, layerConfiguratorProps),
          _react2.default.createElement(ChannelByValueSelector, (0, _extends4.default)({
            channel: layer.visualChannels.color
          }, layerChannelConfigProps)),
          layer.visConfigSettings.colorAggregation.condition(layer.config) ? _react2.default.createElement(AggregationTypeSelector, (0, _extends4.default)({}, layer.visConfigSettings.colorAggregation, layerChannelConfigProps, {
            channel: layer.visualChannels.color
          })) : null,
          _react2.default.createElement(_visConfigSlider2.default, (0, _extends4.default)({}, layer.visConfigSettings.opacity, visConfiguratorProps))
        ),
        _react2.default.createElement(
          _layerConfigGroup2.default,
          { label: 'radius' },
          _react2.default.createElement(_visConfigSlider2.default, (0, _extends4.default)({}, layer.visConfigSettings.clusterRadius, visConfiguratorProps)),
          _react2.default.createElement(_visConfigSlider2.default, (0, _extends4.default)({}, layer.visConfigSettings.radiusRange, visConfiguratorProps))
        )
      );
    }
  }, {
    key: '_renderHeatmapLayerConfig',
    value: function _renderHeatmapLayerConfig(_ref3) {
      var layer = _ref3.layer,
          visConfiguratorProps = _ref3.visConfiguratorProps,
          layerConfiguratorProps = _ref3.layerConfiguratorProps,
          layerChannelConfigProps = _ref3.layerChannelConfigProps;

      return _react2.default.createElement(
        StyledLayerVisualConfigurator,
        null,
        _react2.default.createElement(
          _layerConfigGroup2.default,
          { label: 'color' },
          _react2.default.createElement(ColorRangeConfig, visConfiguratorProps),
          _react2.default.createElement(_visConfigSlider2.default, (0, _extends4.default)({}, layer.visConfigSettings.opacity, visConfiguratorProps))
        ),
        _react2.default.createElement(
          _layerConfigGroup2.default,
          { label: 'radius' },
          _react2.default.createElement(_visConfigSlider2.default, (0, _extends4.default)({}, layer.visConfigSettings.radius, visConfiguratorProps, {
            label: false
          }))
        ),
        _react2.default.createElement(
          _layerConfigGroup2.default,
          { label: 'weight' },
          _react2.default.createElement(ChannelByValueSelector, (0, _extends4.default)({
            channel: layer.visualChannels.weight
          }, layerChannelConfigProps))
        )
      );
    }
  }, {
    key: '_renderGridLayerConfig',
    value: function _renderGridLayerConfig(props) {
      return this._renderAggregationLayerConfig(props);
    }
  }, {
    key: '_renderHexagonLayerConfig',
    value: function _renderHexagonLayerConfig(props) {
      return this._renderAggregationLayerConfig(props);
    }
  }, {
    key: '_renderAggregationLayerConfig',
    value: function _renderAggregationLayerConfig(_ref4) {
      var layer = _ref4.layer,
          visConfiguratorProps = _ref4.visConfiguratorProps,
          layerConfiguratorProps = _ref4.layerConfiguratorProps,
          layerChannelConfigProps = _ref4.layerChannelConfigProps;
      var config = layer.config;
      var enable3d = config.visConfig.enable3d;

      var elevationByDescription = 'When off, height is based on count of points';
      var colorByDescription = 'When off, color is based on count of points';

      return _react2.default.createElement(
        StyledLayerVisualConfigurator,
        null,
        _react2.default.createElement(
          _layerConfigGroup2.default,
          { label: 'color' },
          _react2.default.createElement(ColorRangeConfig, visConfiguratorProps),
          _react2.default.createElement(AggrColorScaleSelector, layerConfiguratorProps),
          _react2.default.createElement(ChannelByValueSelector, (0, _extends4.default)({
            channel: layer.visualChannels.color
          }, layerChannelConfigProps)),
          layer.visConfigSettings.colorAggregation.condition(layer.config) ? _react2.default.createElement(AggregationTypeSelector, (0, _extends4.default)({}, layer.visConfigSettings.colorAggregation, layerChannelConfigProps, {
            descreiption: colorByDescription,
            channel: layer.visualChannels.color
          })) : null,
          layer.visConfigSettings.percentile && layer.visConfigSettings.percentile.condition(layer.config) ? _react2.default.createElement(_visConfigSlider2.default, (0, _extends4.default)({}, layer.visConfigSettings.percentile, visConfiguratorProps)) : null,
          _react2.default.createElement(_visConfigSlider2.default, (0, _extends4.default)({}, layer.visConfigSettings.opacity, visConfiguratorProps))
        ),
        _react2.default.createElement(
          _layerConfigGroup2.default,
          { label: 'radius' },
          _react2.default.createElement(_visConfigSlider2.default, (0, _extends4.default)({}, layer.visConfigSettings.worldUnitSize, visConfiguratorProps)),
          _react2.default.createElement(_visConfigSlider2.default, (0, _extends4.default)({}, layer.visConfigSettings.coverage, visConfiguratorProps))
        ),
        layer.visConfigSettings.enable3d ? _react2.default.createElement(
          _layerConfigGroup2.default,
          (0, _extends4.default)({}, layer.visConfigSettings.enable3d, visConfiguratorProps),
          _react2.default.createElement(_visConfigSlider2.default, (0, _extends4.default)({}, layer.visConfigSettings.elevationScale, visConfiguratorProps)),
          _react2.default.createElement(ChannelByValueSelector, (0, _extends4.default)({}, layerChannelConfigProps, {
            channel: layer.visualChannels.size,
            description: elevationByDescription,
            disabled: !enable3d
          })),
          layer.visConfigSettings.sizeAggregation.condition(layer.config) ? _react2.default.createElement(AggregationTypeSelector, (0, _extends4.default)({}, layer.visConfigSettings.sizeAggregation, layerChannelConfigProps, {
            channel: layer.visualChannels.size
          })) : null,
          layer.visConfigSettings.elevationPercentile.condition(layer.config) ? _react2.default.createElement(_visConfigSlider2.default, (0, _extends4.default)({}, layer.visConfigSettings.elevationPercentile, visConfiguratorProps)) : null
        ) : null,
        _react2.default.createElement(_layerConfigGroup2.default, (0, _extends4.default)({}, layer.visConfigSettings['hi-precision'], visConfiguratorProps))
      );
    }

    // TODO: Shan move these into layer class

  }, {
    key: '_renderHexagonIdLayerConfig',
    value: function _renderHexagonIdLayerConfig(_ref5) {
      var layer = _ref5.layer,
          visConfiguratorProps = _ref5.visConfiguratorProps,
          layerConfiguratorProps = _ref5.layerConfiguratorProps,
          layerChannelConfigProps = _ref5.layerChannelConfigProps;

      return _react2.default.createElement(
        StyledLayerVisualConfigurator,
        null,
        _react2.default.createElement(
          _layerConfigGroup2.default,
          { label: 'color' },
          layer.config.colorField ? _react2.default.createElement(ColorRangeConfig, visConfiguratorProps) : _react2.default.createElement(LayerColorSelector, layerConfiguratorProps),
          _react2.default.createElement(ChannelByValueSelector, (0, _extends4.default)({
            channel: layer.visualChannels.color
          }, layerChannelConfigProps)),
          _react2.default.createElement(_visConfigSlider2.default, (0, _extends4.default)({}, _layerFactory.LAYER_VIS_CONFIGS.opacity, visConfiguratorProps))
        ),
        _react2.default.createElement(
          _layerConfigGroup2.default,
          (0, _extends4.default)({}, _layerFactory.LAYER_VIS_CONFIGS.enable3d, visConfiguratorProps),
          _react2.default.createElement(ChannelByValueSelector, (0, _extends4.default)({
            channel: layer.visualChannels.size
          }, layerChannelConfigProps)),
          _react2.default.createElement(_visConfigSlider2.default, (0, _extends4.default)({}, _layerFactory.LAYER_VIS_CONFIGS.elevationRange, visConfiguratorProps))
        ),
        _react2.default.createElement(_layerConfigGroup2.default, (0, _extends4.default)({}, _layerFactory.LAYER_VIS_CONFIGS['hi-precision'], visConfiguratorProps))
      );
    }
  }, {
    key: '_renderArcLayerConfig',
    value: function _renderArcLayerConfig(args) {
      return this._renderLineLayerConfig(args);
    }
  }, {
    key: '_renderLineLayerConfig',
    value: function _renderLineLayerConfig(_ref6) {
      var layer = _ref6.layer,
          visConfiguratorProps = _ref6.visConfiguratorProps,
          layerConfiguratorProps = _ref6.layerConfiguratorProps,
          layerChannelConfigProps = _ref6.layerChannelConfigProps;

      return _react2.default.createElement(
        StyledLayerVisualConfigurator,
        null,
        _react2.default.createElement(
          _layerConfigGroup2.default,
          { label: 'color' },
          layer.config.colorField ? _react2.default.createElement(ColorRangeConfig, visConfiguratorProps) : _react2.default.createElement(ArcLayerColorSelector, {
            layer: layer,
            onChangeConfig: layerConfiguratorProps.onChange,
            onChangeVisConfig: visConfiguratorProps.onChange
          }),
          _react2.default.createElement(ChannelByValueSelector, (0, _extends4.default)({
            channel: layer.visualChannels.color
          }, layerChannelConfigProps)),
          _react2.default.createElement(_visConfigSlider2.default, (0, _extends4.default)({}, _layerFactory.LAYER_VIS_CONFIGS.opacity, visConfiguratorProps))
        ),
        _react2.default.createElement(
          _layerConfigGroup2.default,
          { label: 'stroke' },
          layer.config.sizeField ? _react2.default.createElement(_visConfigSlider2.default, (0, _extends4.default)({}, _layerFactory.LAYER_VIS_CONFIGS.strokeWidthRange, visConfiguratorProps, {
            disabled: !layer.config.sizeField
          })) : _react2.default.createElement(_visConfigSlider2.default, (0, _extends4.default)({}, _layerFactory.LAYER_VIS_CONFIGS.thickness, visConfiguratorProps)),
          _react2.default.createElement(ChannelByValueSelector, (0, _extends4.default)({
            channel: layer.visualChannels.size
          }, layerChannelConfigProps))
        ),
        _react2.default.createElement(_layerConfigGroup2.default, (0, _extends4.default)({}, _layerFactory.LAYER_VIS_CONFIGS['hi-precision'], visConfiguratorProps))
      );
    }
  }, {
    key: '_renderGeojsonLayerConfig',
    value: function _renderGeojsonLayerConfig(_ref7) {
      var layer = _ref7.layer,
          visConfiguratorProps = _ref7.visConfiguratorProps,
          layerConfiguratorProps = _ref7.layerConfiguratorProps,
          layerChannelConfigProps = _ref7.layerChannelConfigProps;
      var _layer$meta$featureTy = layer.meta.featureTypes,
          featureTypes = _layer$meta$featureTy === undefined ? {} : _layer$meta$featureTy,
          visConfig = layer.config.visConfig;


      return _react2.default.createElement(
        StyledLayerVisualConfigurator,
        null,
        _react2.default.createElement(
          _layerConfigGroup2.default,
          { label: 'color' },
          featureTypes.polygon ? _react2.default.createElement(_visConfigSwitch2.default, (0, _extends4.default)({}, visConfiguratorProps, _layerFactory.LAYER_VIS_CONFIGS.filled)) : null,
          layer.config.colorField ? _react2.default.createElement(ColorRangeConfig, visConfiguratorProps) : _react2.default.createElement(LayerColorSelector, layerConfiguratorProps),
          _react2.default.createElement(ChannelByValueSelector, (0, _extends4.default)({
            channel: layer.visualChannels.color
          }, layerChannelConfigProps)),
          _react2.default.createElement(_visConfigSlider2.default, (0, _extends4.default)({}, _layerFactory.LAYER_VIS_CONFIGS.opacity, visConfiguratorProps))
        ),
        featureTypes.line || featureTypes.polygon && visConfig.stroked ? _react2.default.createElement(
          _layerConfigGroup2.default,
          (0, _extends4.default)({
            label: 'stroke'
          }, visConfiguratorProps, featureTypes.polygon ? _layerFactory.LAYER_VIS_CONFIGS.stroked : {}),
          _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(_visConfigSlider2.default, (0, _extends4.default)({}, _layerFactory.LAYER_VIS_CONFIGS.thickness, visConfiguratorProps)),
            _react2.default.createElement(ChannelByValueSelector, (0, _extends4.default)({
              channel: layer.visualChannels.size
            }, layerChannelConfigProps)),
            _react2.default.createElement(_visConfigSlider2.default, (0, _extends4.default)({}, _layerFactory.LAYER_VIS_CONFIGS.strokeWidthRange, visConfiguratorProps, {
              disabled: !layer.config.sizeField
            }))
          )
        ) : null,
        featureTypes.polygon && visConfig.filled ? _react2.default.createElement(
          _layerConfigGroup2.default,
          (0, _extends4.default)({}, visConfiguratorProps, _layerFactory.LAYER_VIS_CONFIGS.enable3d),
          _react2.default.createElement(_visConfigSlider2.default, (0, _extends4.default)({}, _layerFactory.LAYER_VIS_CONFIGS.elevationScale, visConfiguratorProps)),
          _react2.default.createElement(ChannelByValueSelector, (0, _extends4.default)({
            channel: layer.visualChannels.height
          }, layerChannelConfigProps)),
          _react2.default.createElement(_visConfigSwitch2.default, (0, _extends4.default)({}, visConfiguratorProps, _layerFactory.LAYER_VIS_CONFIGS.wireframe))
        ) : null,
        featureTypes.point ? _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(_visConfigSlider2.default, (0, _extends4.default)({}, _layerFactory.LAYER_VIS_CONFIGS.radius, visConfiguratorProps, {
            label: 'Point Radius',
            disabled: Boolean(layer.config.radiusField)
          })),
          _react2.default.createElement(ChannelByValueSelector, (0, _extends4.default)({
            channel: layer.visualChannels.radius
          }, layerChannelConfigProps)),
          _react2.default.createElement(_visConfigSlider2.default, (0, _extends4.default)({}, _layerFactory.LAYER_VIS_CONFIGS.radiusRange, visConfiguratorProps, {
            disabled: !layer.config.radiusField
          }))
        ) : null,
        _react2.default.createElement(_layerConfigGroup2.default, (0, _extends4.default)({}, _layerFactory.LAYER_VIS_CONFIGS['hi-precision'], visConfiguratorProps))
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          layer = _props.layer,
          datasets = _props.datasets,
          updateLayerConfig = _props.updateLayerConfig,
          layerTypeOptions = _props.layerTypeOptions,
          updateLayerType = _props.updateLayerType;

      var _ref8 = layer.config.dataId ? datasets[layer.config.dataId] : {},
          _ref8$fields = _ref8.fields,
          fields = _ref8$fields === undefined ? [] : _ref8$fields,
          fieldPairs = _ref8.fieldPairs;

      var config = layer.config;


      var commonConfigProp = {
        layer: layer,
        fields: fields
      };

      var visConfiguratorProps = (0, _extends4.default)({}, commonConfigProp, {
        onChange: this.props.updateLayerVisConfig
      });

      var layerConfiguratorProps = (0, _extends4.default)({}, commonConfigProp, {
        onChange: updateLayerConfig
      });

      var layerChannelConfigProps = (0, _extends4.default)({}, commonConfigProp, {
        onChange: this.props.updateLayerVisualChannelConfig
      });

      var renderTemplate = layer.type && '_render' + (0, _utils.capitalizeFirstLetter)(layer.type) + 'LayerConfig';

      return _react2.default.createElement(
        StyledLayerConfigurator,
        null,
        layer.layerInfoModal ? _react2.default.createElement(HowToButton, { onClick: function onClick() {
            return _this2.props.openModal(layer.layerInfoModal);
          } }) : null,
        _react2.default.createElement(
          _layerConfigGroup2.default,
          { label: 'basic' },
          Object.keys(datasets).length > 1 && _react2.default.createElement(_sourceDataSelector2.default, {
            datasets: datasets,
            id: layer.id,
            disabled: layer.tyep && config.columns,
            dataId: config.dataId,
            onSelect: function onSelect(value) {
              return updateLayerConfig({ dataId: value });
            }
          }),
          _react2.default.createElement(_layerTypeSelector2.default, {
            layer: layer,
            layerTypeOptions: layerTypeOptions,
            onSelect: updateLayerType
          }),
          _react2.default.createElement(_layerColumnConfig2.default, {
            layer: layer,
            fields: fields,
            fieldPairs: fieldPairs,
            updateLayerConfig: updateLayerConfig,
            updateLayerType: this.props.updateLayerType
          })
        ),
        this[renderTemplate] && this[renderTemplate]({
          layer: layer,
          visConfiguratorProps: visConfiguratorProps,
          layerChannelConfigProps: layerChannelConfigProps,
          layerConfiguratorProps: layerConfiguratorProps
        })
      );
    }
  }]);
  return LayerConfigurator;
}(_react.Component), _class.propTypes = {
  layer: _propTypes2.default.object.isRequired,
  datasets: _propTypes2.default.object.isRequired,
  layerTypeOptions: _propTypes2.default.arrayOf(_propTypes2.default.any).isRequired,
  openModal: _propTypes2.default.func.isRequired,
  updateLayerConfig: _propTypes2.default.func.isRequired,
  updateLayerType: _propTypes2.default.func.isRequired,
  updateLayerVisConfig: _propTypes2.default.func.isRequired,
  updateLayerVisualChannelConfig: _propTypes2.default.func.isRequired
}, _temp);

/*
 * Componentize config component into pure functional components
 */

exports.default = LayerConfigurator;
var StyledHowToButton = _styledComponents2.default.div(_templateObject3);

var HowToButton = exports.HowToButton = function HowToButton(_ref9) {
  var onClick = _ref9.onClick;
  return _react2.default.createElement(
    StyledHowToButton,
    null,
    _react2.default.createElement(
      _styledComponents3.Button,
      { secondary: true, small: true, onClick: onClick },
      'How to'
    )
  );
};

var LayerColorSelector = exports.LayerColorSelector = function LayerColorSelector(_ref10) {
  var layer = _ref10.layer,
      onChange = _ref10.onChange,
      label = _ref10.label;
  return _react2.default.createElement(
    _styledComponents3.SidePanelSection,
    { disabled: layer.config.colorField },
    _react2.default.createElement(_colorSelector2.default, {
      colorSets: [{
        selectedColor: layer.config.color,
        setColor: function setColor(rgbValue) {
          return onChange({ color: rgbValue });
        }
      }]
    })
  );
};

var ArcLayerColorSelector = exports.ArcLayerColorSelector = function ArcLayerColorSelector(_ref11) {
  var layer = _ref11.layer,
      onChangeConfig = _ref11.onChangeConfig,
      onChangeVisConfig = _ref11.onChangeVisConfig;
  return _react2.default.createElement(
    _styledComponents3.SidePanelSection,
    null,
    _react2.default.createElement(_colorSelector2.default, {
      colorSets: [{
        selectedColor: layer.config.color,
        setColor: function setColor(rgbValue) {
          return onChangeConfig({ color: rgbValue });
        },
        label: 'Source'
      }, {
        selectedColor: layer.config.visConfig.targetColor || layer.config.color,
        setColor: function setColor(rgbValue) {
          return onChangeVisConfig({ targetColor: rgbValue });
        },
        label: 'Target'
      }]
    })
  );
};

var ColorRangeConfig = exports.ColorRangeConfig = function ColorRangeConfig(_ref12) {
  var layer = _ref12.layer,
      onChange = _ref12.onChange;
  return _react2.default.createElement(
    _styledComponents3.SidePanelSection,
    null,
    _react2.default.createElement(_colorSelector2.default, {
      colorSets: [{
        selectedColor: layer.config.visConfig.colorRange,
        isRange: true,
        setColor: function setColor(colorRange) {
          return onChange({ colorRange: colorRange });
        }
      }]
    })
  );
};

var ChannelByValueSelector = exports.ChannelByValueSelector = function ChannelByValueSelector(_ref13) {
  var layer = _ref13.layer,
      channel = _ref13.channel,
      onChange = _ref13.onChange,
      fields = _ref13.fields,
      description = _ref13.description;
  var channelScaleType = channel.channelScaleType,
      domain = channel.domain,
      field = channel.field,
      key = channel.key,
      property = channel.property,
      range = channel.range,
      scale = channel.scale,
      defaultMeasure = channel.defaultMeasure,
      supportedFieldTypes = channel.supportedFieldTypes;

  var channelSupportedFieldTypes = supportedFieldTypes || _defaultSettings.CHANNEL_SCALE_SUPPORTED_FIELDS[channelScaleType];
  var supportedFields = fields.filter(function (_ref14) {
    var type = _ref14.type;
    return channelSupportedFieldTypes.includes(type);
  });
  var scaleOptions = layer.getScaleOptions(channel.key);
  var showScale = !layer.isAggregated && layer.config[scale] && scaleOptions.length > 1;
  var defaultDescription = 'Calculate ' + property + ' based on selected field';

  return _react2.default.createElement(_visConfigByFieldSelector2.default, {
    channel: channel.key,
    description: description || defaultDescription,
    domain: layer.config[domain],
    fields: supportedFields,
    id: layer.id,
    key: key + '-channel-selector',
    property: property,
    placeholder: defaultMeasure || 'Select a field',
    range: layer.config.visConfig[range],
    scaleOptions: scaleOptions,
    scaleType: scale ? layer.config[scale] : null,
    selectedField: layer.config[field],
    showScale: showScale,
    updateField: function updateField(val) {
      return onChange((0, _defineProperty3.default)({}, field, val), key);
    },
    updateScale: function updateScale(val) {
      return onChange((0, _defineProperty3.default)({}, scale, val), key);
    }
  });
};

var AggrColorScaleSelector = exports.AggrColorScaleSelector = function AggrColorScaleSelector(_ref15) {
  var layer = _ref15.layer,
      onChange = _ref15.onChange;

  var scaleOptions = layer.getScaleOptions('color');
  return Array.isArray(scaleOptions) && scaleOptions.length > 1 ? _react2.default.createElement(_dimensionScaleSelector2.default, {
    label: 'Color Scale',
    options: scaleOptions,
    scaleType: layer.config.colorScale,
    onSelect: function onSelect(val) {
      return onChange({ colorScale: val }, 'color');
    }
  }) : null;
};

var AggregationTypeSelector = exports.AggregationTypeSelector = function AggregationTypeSelector(_ref16) {
  var layer = _ref16.layer,
      channel = _ref16.channel,
      _onChange3 = _ref16.onChange;
  var field = channel.field,
      aggregation = channel.aggregation,
      key = channel.key;

  var selectedField = layer.config[field];
  var visConfig = layer.config.visConfig;

  // aggregation should only be selectable when field is selected

  var aggregationOptions = layer.getAggregationOptions(key);

  return _react2.default.createElement(
    _styledComponents3.SidePanelSection,
    null,
    _react2.default.createElement(
      _styledComponents3.PanelLabel,
      null,
      'Aggregate ' + selectedField.name + ' by'
    ),
    _react2.default.createElement(_itemSelector2.default, {
      selectedItems: visConfig[aggregation],
      options: aggregationOptions,
      multiSelect: false,
      searchable: false,
      onChange: function onChange(value) {
        return _onChange3({
          visConfig: (0, _extends4.default)({}, layer.config.visConfig, (0, _defineProperty3.default)({}, aggregation, value))
        }, channel.key);
      }
    })
  );
};
/* eslint-enable max-params */
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3NpZGUtcGFuZWwvbGF5ZXItcGFuZWwvbGF5ZXItY29uZmlndXJhdG9yLmpzIl0sIm5hbWVzIjpbIlN0eWxlZExheWVyQ29uZmlndXJhdG9yIiwic3R5bGVkIiwiZGl2IiwiYXR0cnMiLCJjbGFzc05hbWUiLCJTdHlsZWRMYXllclZpc3VhbENvbmZpZ3VyYXRvciIsIkxheWVyQ29uZmlndXJhdG9yIiwicHJvcHMiLCJfcmVuZGVyU2NhdHRlcnBsb3RMYXllckNvbmZpZyIsImxheWVyIiwidmlzQ29uZmlndXJhdG9yUHJvcHMiLCJsYXllckNoYW5uZWxDb25maWdQcm9wcyIsImxheWVyQ29uZmlndXJhdG9yUHJvcHMiLCJjb25maWciLCJjb2xvckZpZWxkIiwidmlzdWFsQ2hhbm5lbHMiLCJjb2xvciIsIkxBWUVSX1ZJU19DT05GSUdTIiwib3BhY2l0eSIsInNpemVGaWVsZCIsInJhZGl1cyIsIkJvb2xlYW4iLCJyYWRpdXNSYW5nZSIsInZpc0NvbmZpZyIsImZpeGVkUmFkaXVzIiwic2l6ZSIsInR5cGUiLCJMQVlFUl9UWVBFUyIsInBvaW50Iiwib3V0bGluZSIsInRoaWNrbmVzcyIsInZpc0NvbmZpZ1NldHRpbmdzIiwiY29sb3JBZ2dyZWdhdGlvbiIsImNvbmRpdGlvbiIsImNsdXN0ZXJSYWRpdXMiLCJ3ZWlnaHQiLCJfcmVuZGVyQWdncmVnYXRpb25MYXllckNvbmZpZyIsImVuYWJsZTNkIiwiZWxldmF0aW9uQnlEZXNjcmlwdGlvbiIsImNvbG9yQnlEZXNjcmlwdGlvbiIsInBlcmNlbnRpbGUiLCJ3b3JsZFVuaXRTaXplIiwiY292ZXJhZ2UiLCJlbGV2YXRpb25TY2FsZSIsInNpemVBZ2dyZWdhdGlvbiIsImVsZXZhdGlvblBlcmNlbnRpbGUiLCJlbGV2YXRpb25SYW5nZSIsImFyZ3MiLCJfcmVuZGVyTGluZUxheWVyQ29uZmlnIiwib25DaGFuZ2UiLCJzdHJva2VXaWR0aFJhbmdlIiwibWV0YSIsImZlYXR1cmVUeXBlcyIsInBvbHlnb24iLCJmaWxsZWQiLCJsaW5lIiwic3Ryb2tlZCIsImhlaWdodCIsIndpcmVmcmFtZSIsInJhZGl1c0ZpZWxkIiwiZGF0YXNldHMiLCJ1cGRhdGVMYXllckNvbmZpZyIsImxheWVyVHlwZU9wdGlvbnMiLCJ1cGRhdGVMYXllclR5cGUiLCJkYXRhSWQiLCJmaWVsZHMiLCJmaWVsZFBhaXJzIiwiY29tbW9uQ29uZmlnUHJvcCIsInVwZGF0ZUxheWVyVmlzQ29uZmlnIiwidXBkYXRlTGF5ZXJWaXN1YWxDaGFubmVsQ29uZmlnIiwicmVuZGVyVGVtcGxhdGUiLCJsYXllckluZm9Nb2RhbCIsIm9wZW5Nb2RhbCIsIk9iamVjdCIsImtleXMiLCJsZW5ndGgiLCJpZCIsInR5ZXAiLCJjb2x1bW5zIiwidmFsdWUiLCJDb21wb25lbnQiLCJwcm9wVHlwZXMiLCJQcm9wVHlwZXMiLCJvYmplY3QiLCJpc1JlcXVpcmVkIiwiYXJyYXlPZiIsImFueSIsImZ1bmMiLCJTdHlsZWRIb3dUb0J1dHRvbiIsIkhvd1RvQnV0dG9uIiwib25DbGljayIsIkxheWVyQ29sb3JTZWxlY3RvciIsImxhYmVsIiwic2VsZWN0ZWRDb2xvciIsInNldENvbG9yIiwicmdiVmFsdWUiLCJBcmNMYXllckNvbG9yU2VsZWN0b3IiLCJvbkNoYW5nZUNvbmZpZyIsIm9uQ2hhbmdlVmlzQ29uZmlnIiwidGFyZ2V0Q29sb3IiLCJDb2xvclJhbmdlQ29uZmlnIiwiY29sb3JSYW5nZSIsImlzUmFuZ2UiLCJDaGFubmVsQnlWYWx1ZVNlbGVjdG9yIiwiY2hhbm5lbCIsImRlc2NyaXB0aW9uIiwiY2hhbm5lbFNjYWxlVHlwZSIsImRvbWFpbiIsImZpZWxkIiwia2V5IiwicHJvcGVydHkiLCJyYW5nZSIsInNjYWxlIiwiZGVmYXVsdE1lYXN1cmUiLCJzdXBwb3J0ZWRGaWVsZFR5cGVzIiwiY2hhbm5lbFN1cHBvcnRlZEZpZWxkVHlwZXMiLCJDSEFOTkVMX1NDQUxFX1NVUFBPUlRFRF9GSUVMRFMiLCJzdXBwb3J0ZWRGaWVsZHMiLCJmaWx0ZXIiLCJpbmNsdWRlcyIsInNjYWxlT3B0aW9ucyIsImdldFNjYWxlT3B0aW9ucyIsInNob3dTY2FsZSIsImlzQWdncmVnYXRlZCIsImRlZmF1bHREZXNjcmlwdGlvbiIsInZhbCIsIkFnZ3JDb2xvclNjYWxlU2VsZWN0b3IiLCJBcnJheSIsImlzQXJyYXkiLCJjb2xvclNjYWxlIiwiQWdncmVnYXRpb25UeXBlU2VsZWN0b3IiLCJhZ2dyZWdhdGlvbiIsInNlbGVjdGVkRmllbGQiLCJhZ2dyZWdhdGlvbk9wdGlvbnMiLCJnZXRBZ2dyZWdhdGlvbk9wdGlvbnMiLCJuYW1lIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7MktBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBRUE7O0FBS0E7Ozs7QUFFQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFFQTs7QUFFQTs7QUFFQTs7OztBQUtBLElBQU1BLDBCQUEwQkMsMkJBQU9DLEdBQVAsQ0FBV0MsS0FBWCxDQUFpQjtBQUMvQ0MsYUFBVztBQURvQyxDQUFqQixDQUExQixpQkFBTjs7QUFPQSxJQUFNQyxnQ0FBZ0NKLDJCQUFPQyxHQUFQLENBQVdDLEtBQVgsQ0FBaUI7QUFDckRDLGFBQVc7QUFEMEMsQ0FBakIsQ0FBaEMsa0JBQU47O0lBTXFCRSxpQjs7Ozs7Ozs7Ozs0Q0FZS0MsSyxFQUFPO0FBQzdCLGFBQU8sS0FBS0MsNkJBQUwsQ0FBbUNELEtBQW5DLENBQVA7QUFDRDs7OzJDQUVzQkEsSyxFQUFPO0FBQzVCLGFBQU8sS0FBS0MsNkJBQUwsQ0FBbUNELEtBQW5DLENBQVA7QUFDRDs7O3dEQU9FO0FBQUEsVUFKREUsS0FJQyxRQUpEQSxLQUlD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QUFDRTtBQUFDLG1DQUFEO0FBQUE7QUFBQSxxQkFBMEJ1QixjQUFjRyxJQUF4QztBQUFBLEtBREY7QUFFRSxrQ0FBQyxzQkFBRDtBQUNFLHFCQUFlaEgsVUFBVTRHLFdBQVYsQ0FEakI7QUFFRSxlQUFTRSxrQkFGWDtBQUdFLG1CQUFhLEtBSGY7QUFJRSxrQkFBWSxLQUpkO0FBS0UsZ0JBQVU7QUFBQSxlQUNScEYsV0FDRTtBQUNFMUIsZ0RBQ0tkLE1BQU1JLE1BQU4sQ0FBYVUsU0FEbEIsb0NBRUc0RyxXQUZILEVBRWlCcEQsS0FGakI7QUFERixTQURGLEVBT0V5QixRQUFRSyxHQVBWLENBRFE7QUFBQTtBQUxaO0FBRkYsR0FERjtBQXNCRCxDQTlCTTtBQStCUCIsImZpbGUiOiJsYXllci1jb25maWd1cmF0b3IuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIDIwMTggVWJlciBUZWNobm9sb2dpZXMsIEluYy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4vLyBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4vLyBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4vLyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4vLyBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbi8vIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbi8vIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1Jcbi8vIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuLy8gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4vLyBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4vLyBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuLy8gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuLy8gVEhFIFNPRlRXQVJFLlxuXG5pbXBvcnQgUmVhY3QsIHtDb21wb25lbnR9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgc3R5bGVkIGZyb20gJ3N0eWxlZC1jb21wb25lbnRzJztcblxuaW1wb3J0IHtcbiAgQnV0dG9uLFxuICBQYW5lbExhYmVsLFxuICBTaWRlUGFuZWxTZWN0aW9uXG59IGZyb20gJ2NvbXBvbmVudHMvY29tbW9uL3N0eWxlZC1jb21wb25lbnRzJztcbmltcG9ydCBJdGVtU2VsZWN0b3IgZnJvbSAnY29tcG9uZW50cy9jb21tb24vaXRlbS1zZWxlY3Rvci9pdGVtLXNlbGVjdG9yJztcblxuaW1wb3J0IFZpc0NvbmZpZ0J5RmllbGRTZWxlY3RvciBmcm9tICcuL3Zpcy1jb25maWctYnktZmllbGQtc2VsZWN0b3InO1xuaW1wb3J0IExheWVyQ29sdW1uQ29uZmlnIGZyb20gJy4vbGF5ZXItY29sdW1uLWNvbmZpZyc7XG5pbXBvcnQgTGF5ZXJUeXBlU2VsZWN0b3IgZnJvbSAnLi9sYXllci10eXBlLXNlbGVjdG9yJztcbmltcG9ydCBEaW1lbnNpb25TY2FsZVNlbGVjdG9yIGZyb20gJy4vZGltZW5zaW9uLXNjYWxlLXNlbGVjdG9yJztcbmltcG9ydCBDb2xvclNlbGVjdG9yIGZyb20gJy4vY29sb3Itc2VsZWN0b3InO1xuaW1wb3J0IFNvdXJjZURhdGFTZWxlY3RvciBmcm9tICcuLi9zb3VyY2UtZGF0YS1zZWxlY3Rvcic7XG5pbXBvcnQgVmlzQ29uZmlnU3dpdGNoIGZyb20gJy4vdmlzLWNvbmZpZy1zd2l0Y2gnO1xuaW1wb3J0IFZpc0NvbmZpZ1NsaWRlciBmcm9tICcuL3Zpcy1jb25maWctc2xpZGVyJztcbmltcG9ydCBMYXllckNvbmZpZ0dyb3VwIGZyb20gJy4vbGF5ZXItY29uZmlnLWdyb3VwJztcblxuaW1wb3J0IHtMQVlFUl9WSVNfQ09ORklHU30gZnJvbSAnbGF5ZXJzL2xheWVyLWZhY3RvcnknO1xuXG5pbXBvcnQge2NhcGl0YWxpemVGaXJzdExldHRlcn0gZnJvbSAndXRpbHMvdXRpbHMnO1xuXG5pbXBvcnQge1xuICBMQVlFUl9UWVBFUyxcbiAgQ0hBTk5FTF9TQ0FMRV9TVVBQT1JURURfRklFTERTXG59IGZyb20gJ2NvbnN0YW50cy9kZWZhdWx0LXNldHRpbmdzJztcblxuY29uc3QgU3R5bGVkTGF5ZXJDb25maWd1cmF0b3IgPSBzdHlsZWQuZGl2LmF0dHJzKHtcbiAgY2xhc3NOYW1lOiAnbGF5ZXItcGFuZWxfX2NvbmZpZydcbn0pYFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIG1hcmdpbi10b3A6IDEycHg7XG5gO1xuXG5jb25zdCBTdHlsZWRMYXllclZpc3VhbENvbmZpZ3VyYXRvciA9IHN0eWxlZC5kaXYuYXR0cnMoe1xuICBjbGFzc05hbWU6ICdsYXllci1wYW5lbF9fY29uZmlnX192aXN1YWxDLWNvbmZpZydcbn0pYFxuICBtYXJnaW4tdG9wOiAxMnB4O1xuYDtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTGF5ZXJDb25maWd1cmF0b3IgZXh0ZW5kcyBDb21wb25lbnQge1xuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIGxheWVyOiBQcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsXG4gICAgZGF0YXNldHM6IFByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcbiAgICBsYXllclR5cGVPcHRpb25zOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMuYW55KS5pc1JlcXVpcmVkLFxuICAgIG9wZW5Nb2RhbDogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICB1cGRhdGVMYXllckNvbmZpZzogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICB1cGRhdGVMYXllclR5cGU6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgdXBkYXRlTGF5ZXJWaXNDb25maWc6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgdXBkYXRlTGF5ZXJWaXN1YWxDaGFubmVsQ29uZmlnOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkXG4gIH07XG5cbiAgX3JlbmRlclBvaW50TGF5ZXJDb25maWcocHJvcHMpIHtcbiAgICByZXR1cm4gdGhpcy5fcmVuZGVyU2NhdHRlcnBsb3RMYXllckNvbmZpZyhwcm9wcyk7XG4gIH1cblxuICBfcmVuZGVySWNvbkxheWVyQ29uZmlnKHByb3BzKSB7XG4gICAgcmV0dXJuIHRoaXMuX3JlbmRlclNjYXR0ZXJwbG90TGF5ZXJDb25maWcocHJvcHMpO1xuICB9XG5cbiAgX3JlbmRlclNjYXR0ZXJwbG90TGF5ZXJDb25maWcoe1xuICAgIGxheWVyLFxuICAgIHZpc0NvbmZpZ3VyYXRvclByb3BzLFxuICAgIGxheWVyQ2hhbm5lbENvbmZpZ1Byb3BzLFxuICAgIGxheWVyQ29uZmlndXJhdG9yUHJvcHNcbiAgfSkge1xuICAgIHJldHVybiAoXG4gICAgICA8U3R5bGVkTGF5ZXJWaXN1YWxDb25maWd1cmF0b3I+XG4gICAgICAgIHsvKiBDb2xvciAqL31cbiAgICAgICAgPExheWVyQ29uZmlnR3JvdXAgbGFiZWw9eydjb2xvcid9PlxuICAgICAgICAgIHtsYXllci5jb25maWcuY29sb3JGaWVsZCA/IChcbiAgICAgICAgICAgIDxDb2xvclJhbmdlQ29uZmlnIHsuLi52aXNDb25maWd1cmF0b3JQcm9wc30gLz5cbiAgICAgICAgICApIDogKFxuICAgICAgICAgICAgPExheWVyQ29sb3JTZWxlY3RvciB7Li4ubGF5ZXJDb25maWd1cmF0b3JQcm9wc30gLz5cbiAgICAgICAgICApfVxuICAgICAgICAgIDxDaGFubmVsQnlWYWx1ZVNlbGVjdG9yXG4gICAgICAgICAgICBjaGFubmVsPXtsYXllci52aXN1YWxDaGFubmVscy5jb2xvcn1cbiAgICAgICAgICAgIHsuLi5sYXllckNoYW5uZWxDb25maWdQcm9wc31cbiAgICAgICAgICAvPlxuICAgICAgICAgIDxWaXNDb25maWdTbGlkZXJcbiAgICAgICAgICAgIHsuLi5MQVlFUl9WSVNfQ09ORklHUy5vcGFjaXR5fVxuICAgICAgICAgICAgey4uLnZpc0NvbmZpZ3VyYXRvclByb3BzfVxuICAgICAgICAgIC8+XG4gICAgICAgIDwvTGF5ZXJDb25maWdHcm91cD5cblxuICAgICAgICB7LyogUmFkaXVzICovfVxuICAgICAgICA8TGF5ZXJDb25maWdHcm91cCBsYWJlbD17J3JhZGl1cyd9PlxuICAgICAgICAgIHshbGF5ZXIuY29uZmlnLnNpemVGaWVsZCA/IChcbiAgICAgICAgICAgIDxWaXNDb25maWdTbGlkZXJcbiAgICAgICAgICAgICAgey4uLkxBWUVSX1ZJU19DT05GSUdTLnJhZGl1c31cbiAgICAgICAgICAgICAgey4uLnZpc0NvbmZpZ3VyYXRvclByb3BzfVxuICAgICAgICAgICAgICBsYWJlbD17ZmFsc2V9XG4gICAgICAgICAgICAgIGRpc2FibGVkPXtCb29sZWFuKGxheWVyLmNvbmZpZy5zaXplRmllbGQpfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICApIDogKFxuICAgICAgICAgICAgPFZpc0NvbmZpZ1NsaWRlclxuICAgICAgICAgICAgICB7Li4uTEFZRVJfVklTX0NPTkZJR1MucmFkaXVzUmFuZ2V9XG4gICAgICAgICAgICAgIHsuLi52aXNDb25maWd1cmF0b3JQcm9wc31cbiAgICAgICAgICAgICAgZGlzYWJsZWQ9e1xuICAgICAgICAgICAgICAgICFsYXllci5jb25maWcuc2l6ZUZpZWxkIHx8IGxheWVyLmNvbmZpZy52aXNDb25maWcuZml4ZWRSYWRpdXNcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICApfVxuICAgICAgICAgIDxDaGFubmVsQnlWYWx1ZVNlbGVjdG9yXG4gICAgICAgICAgICBjaGFubmVsPXtsYXllci52aXN1YWxDaGFubmVscy5zaXplfVxuICAgICAgICAgICAgey4uLmxheWVyQ2hhbm5lbENvbmZpZ1Byb3BzfVxuICAgICAgICAgIC8+XG4gICAgICAgICAge2xheWVyLmNvbmZpZy5zaXplRmllbGQgPyAoXG4gICAgICAgICAgICA8VmlzQ29uZmlnU3dpdGNoXG4gICAgICAgICAgICAgIHsuLi5MQVlFUl9WSVNfQ09ORklHUy5maXhlZFJhZGl1c31cbiAgICAgICAgICAgICAgey4uLnZpc0NvbmZpZ3VyYXRvclByb3BzfVxuICAgICAgICAgICAgICBkaXNhYmxlZD17IWxheWVyLmNvbmZpZy5zaXplRmllbGR9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICkgOiBudWxsfVxuICAgICAgICA8L0xheWVyQ29uZmlnR3JvdXA+XG5cbiAgICAgICAgey8qIG91dGxpbmUgKi99XG4gICAgICAgIHtsYXllci50eXBlID09PSBMQVlFUl9UWVBFUy5wb2ludCA/IChcbiAgICAgICAgICA8TGF5ZXJDb25maWdHcm91cFxuICAgICAgICAgICAgey4uLkxBWUVSX1ZJU19DT05GSUdTLm91dGxpbmV9XG4gICAgICAgICAgICB7Li4udmlzQ29uZmlndXJhdG9yUHJvcHN9XG4gICAgICAgICAgPlxuICAgICAgICAgICAgPFZpc0NvbmZpZ1NsaWRlclxuICAgICAgICAgICAgICB7Li4uTEFZRVJfVklTX0NPTkZJR1MudGhpY2tuZXNzfVxuICAgICAgICAgICAgICB7Li4udmlzQ29uZmlndXJhdG9yUHJvcHN9XG4gICAgICAgICAgICAgIGxhYmVsPXtmYWxzZX1cbiAgICAgICAgICAgICAgZGlzYWJsZWQ9eyFsYXllci5jb25maWcudmlzQ29uZmlnLm91dGxpbmV9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgIDwvTGF5ZXJDb25maWdHcm91cD5cbiAgICAgICAgKSA6IG51bGx9XG4gICAgICAgIHsvKiBoaWdoIHByZWNpc2lvbiAqL31cbiAgICAgICAgPExheWVyQ29uZmlnR3JvdXBcbiAgICAgICAgICB7Li4uTEFZRVJfVklTX0NPTkZJR1NbJ2hpLXByZWNpc2lvbiddfVxuICAgICAgICAgIHsuLi52aXNDb25maWd1cmF0b3JQcm9wc31cbiAgICAgICAgLz5cbiAgICAgIDwvU3R5bGVkTGF5ZXJWaXN1YWxDb25maWd1cmF0b3I+XG4gICAgKTtcbiAgfVxuXG4gIF9yZW5kZXJDbHVzdGVyTGF5ZXJDb25maWcoe1xuICAgIGxheWVyLFxuICAgIHZpc0NvbmZpZ3VyYXRvclByb3BzLFxuICAgIGxheWVyQ29uZmlndXJhdG9yUHJvcHMsXG4gICAgbGF5ZXJDaGFubmVsQ29uZmlnUHJvcHNcbiAgfSkge1xuICAgIHJldHVybiAoXG4gICAgICA8U3R5bGVkTGF5ZXJWaXN1YWxDb25maWd1cmF0b3I+XG4gICAgICAgIHsvKiBDb2xvciAqL31cbiAgICAgICAgPExheWVyQ29uZmlnR3JvdXAgbGFiZWw9eydjb2xvcid9PlxuICAgICAgICAgIDxDb2xvclJhbmdlQ29uZmlnIHsuLi52aXNDb25maWd1cmF0b3JQcm9wc30gLz5cbiAgICAgICAgICA8QWdnckNvbG9yU2NhbGVTZWxlY3RvciB7Li4ubGF5ZXJDb25maWd1cmF0b3JQcm9wc30gLz5cbiAgICAgICAgICA8Q2hhbm5lbEJ5VmFsdWVTZWxlY3RvclxuICAgICAgICAgICAgY2hhbm5lbD17bGF5ZXIudmlzdWFsQ2hhbm5lbHMuY29sb3J9XG4gICAgICAgICAgICB7Li4ubGF5ZXJDaGFubmVsQ29uZmlnUHJvcHN9XG4gICAgICAgICAgLz5cbiAgICAgICAgICB7bGF5ZXIudmlzQ29uZmlnU2V0dGluZ3MuY29sb3JBZ2dyZWdhdGlvbi5jb25kaXRpb24obGF5ZXIuY29uZmlnKSA/XG4gICAgICAgICAgICA8QWdncmVnYXRpb25UeXBlU2VsZWN0b3JcbiAgICAgICAgICAgICAgey4uLmxheWVyLnZpc0NvbmZpZ1NldHRpbmdzLmNvbG9yQWdncmVnYXRpb259XG4gICAgICAgICAgICAgIHsuLi5sYXllckNoYW5uZWxDb25maWdQcm9wc31cbiAgICAgICAgICAgICAgY2hhbm5lbD17bGF5ZXIudmlzdWFsQ2hhbm5lbHMuY29sb3J9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICAgOiBudWxsfVxuICAgICAgICAgIDxWaXNDb25maWdTbGlkZXJcbiAgICAgICAgICAgIHsuLi5sYXllci52aXNDb25maWdTZXR0aW5ncy5vcGFjaXR5fVxuICAgICAgICAgICAgey4uLnZpc0NvbmZpZ3VyYXRvclByb3BzfVxuICAgICAgICAgIC8+XG4gICAgICAgIDwvTGF5ZXJDb25maWdHcm91cD5cblxuICAgICAgICB7LyogQ2x1c3RlciBSYWRpdXMgKi99XG4gICAgICAgIDxMYXllckNvbmZpZ0dyb3VwIGxhYmVsPXsncmFkaXVzJ30+XG4gICAgICAgICAgPFZpc0NvbmZpZ1NsaWRlclxuICAgICAgICAgICAgey4uLmxheWVyLnZpc0NvbmZpZ1NldHRpbmdzLmNsdXN0ZXJSYWRpdXN9XG4gICAgICAgICAgICB7Li4udmlzQ29uZmlndXJhdG9yUHJvcHN9XG4gICAgICAgICAgLz5cbiAgICAgICAgICA8VmlzQ29uZmlnU2xpZGVyXG4gICAgICAgICAgICB7Li4ubGF5ZXIudmlzQ29uZmlnU2V0dGluZ3MucmFkaXVzUmFuZ2V9XG4gICAgICAgICAgICB7Li4udmlzQ29uZmlndXJhdG9yUHJvcHN9XG4gICAgICAgICAgLz5cbiAgICAgICAgPC9MYXllckNvbmZpZ0dyb3VwPlxuICAgICAgPC9TdHlsZWRMYXllclZpc3VhbENvbmZpZ3VyYXRvcj5cbiAgICApO1xuICB9XG5cbiAgX3JlbmRlckhlYXRtYXBMYXllckNvbmZpZyh7XG4gICAgbGF5ZXIsXG4gICAgdmlzQ29uZmlndXJhdG9yUHJvcHMsXG4gICAgbGF5ZXJDb25maWd1cmF0b3JQcm9wcyxcbiAgICBsYXllckNoYW5uZWxDb25maWdQcm9wc1xuICB9KSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxTdHlsZWRMYXllclZpc3VhbENvbmZpZ3VyYXRvcj5cbiAgICAgICAgey8qIENvbG9yICovfVxuICAgICAgICA8TGF5ZXJDb25maWdHcm91cCBsYWJlbD17J2NvbG9yJ30+XG4gICAgICAgICAgPENvbG9yUmFuZ2VDb25maWcgey4uLnZpc0NvbmZpZ3VyYXRvclByb3BzfSAvPlxuICAgICAgICAgIDxWaXNDb25maWdTbGlkZXJcbiAgICAgICAgICAgIHsuLi5sYXllci52aXNDb25maWdTZXR0aW5ncy5vcGFjaXR5fVxuICAgICAgICAgICAgey4uLnZpc0NvbmZpZ3VyYXRvclByb3BzfVxuICAgICAgICAgIC8+XG4gICAgICAgIDwvTGF5ZXJDb25maWdHcm91cD5cbiAgICAgICAgey8qIFJhZGl1cyAqL31cbiAgICAgICAgPExheWVyQ29uZmlnR3JvdXAgbGFiZWw9eydyYWRpdXMnfT5cbiAgICAgICAgICA8VmlzQ29uZmlnU2xpZGVyXG4gICAgICAgICAgICB7Li4ubGF5ZXIudmlzQ29uZmlnU2V0dGluZ3MucmFkaXVzfVxuICAgICAgICAgICAgey4uLnZpc0NvbmZpZ3VyYXRvclByb3BzfVxuICAgICAgICAgICAgbGFiZWw9e2ZhbHNlfVxuICAgICAgICAgIC8+XG4gICAgICAgIDwvTGF5ZXJDb25maWdHcm91cD5cbiAgICAgICAgey8qIFdlaWdodCAqL31cbiAgICAgICAgPExheWVyQ29uZmlnR3JvdXAgbGFiZWw9eyd3ZWlnaHQnfT5cbiAgICAgICAgICA8Q2hhbm5lbEJ5VmFsdWVTZWxlY3RvclxuICAgICAgICAgICAgY2hhbm5lbD17bGF5ZXIudmlzdWFsQ2hhbm5lbHMud2VpZ2h0fVxuICAgICAgICAgICAgey4uLmxheWVyQ2hhbm5lbENvbmZpZ1Byb3BzfVxuICAgICAgICAgIC8+XG4gICAgICAgIDwvTGF5ZXJDb25maWdHcm91cD5cbiAgICAgIDwvU3R5bGVkTGF5ZXJWaXN1YWxDb25maWd1cmF0b3I+XG4gICAgKTtcbiAgfVxuXG4gIF9yZW5kZXJHcmlkTGF5ZXJDb25maWcocHJvcHMpIHtcbiAgICByZXR1cm4gdGhpcy5fcmVuZGVyQWdncmVnYXRpb25MYXllckNvbmZpZyhwcm9wcyk7XG4gIH1cblxuICBfcmVuZGVySGV4YWdvbkxheWVyQ29uZmlnKHByb3BzKSB7XG4gICAgcmV0dXJuIHRoaXMuX3JlbmRlckFnZ3JlZ2F0aW9uTGF5ZXJDb25maWcocHJvcHMpO1xuICB9XG5cbiAgX3JlbmRlckFnZ3JlZ2F0aW9uTGF5ZXJDb25maWcoe1xuICAgIGxheWVyLFxuICAgIHZpc0NvbmZpZ3VyYXRvclByb3BzLFxuICAgIGxheWVyQ29uZmlndXJhdG9yUHJvcHMsXG4gICAgbGF5ZXJDaGFubmVsQ29uZmlnUHJvcHNcbiAgfSkge1xuICAgIGNvbnN0IHtjb25maWd9ID0gbGF5ZXI7XG4gICAgY29uc3Qge1xuICAgICAgdmlzQ29uZmlnOiB7ZW5hYmxlM2R9XG4gICAgfSA9IGNvbmZpZztcbiAgICBjb25zdCBlbGV2YXRpb25CeURlc2NyaXB0aW9uID1cbiAgICAgICdXaGVuIG9mZiwgaGVpZ2h0IGlzIGJhc2VkIG9uIGNvdW50IG9mIHBvaW50cyc7XG4gICAgY29uc3QgY29sb3JCeURlc2NyaXB0aW9uID0gJ1doZW4gb2ZmLCBjb2xvciBpcyBiYXNlZCBvbiBjb3VudCBvZiBwb2ludHMnO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxTdHlsZWRMYXllclZpc3VhbENvbmZpZ3VyYXRvcj5cbiAgICAgICAgey8qIENvbG9yICovfVxuICAgICAgICA8TGF5ZXJDb25maWdHcm91cCBsYWJlbD17J2NvbG9yJ30+XG4gICAgICAgICAgPENvbG9yUmFuZ2VDb25maWcgey4uLnZpc0NvbmZpZ3VyYXRvclByb3BzfSAvPlxuICAgICAgICAgIDxBZ2dyQ29sb3JTY2FsZVNlbGVjdG9yIHsuLi5sYXllckNvbmZpZ3VyYXRvclByb3BzfSAvPlxuICAgICAgICAgIDxDaGFubmVsQnlWYWx1ZVNlbGVjdG9yXG4gICAgICAgICAgICBjaGFubmVsPXtsYXllci52aXN1YWxDaGFubmVscy5jb2xvcn1cbiAgICAgICAgICAgIHsuLi5sYXllckNoYW5uZWxDb25maWdQcm9wc31cbiAgICAgICAgICAvPlxuICAgICAgICAgIHtsYXllci52aXNDb25maWdTZXR0aW5ncy5jb2xvckFnZ3JlZ2F0aW9uLmNvbmRpdGlvbihsYXllci5jb25maWcpID8gKFxuICAgICAgICAgICAgPEFnZ3JlZ2F0aW9uVHlwZVNlbGVjdG9yXG4gICAgICAgICAgICAgIHsuLi5sYXllci52aXNDb25maWdTZXR0aW5ncy5jb2xvckFnZ3JlZ2F0aW9ufVxuICAgICAgICAgICAgICB7Li4ubGF5ZXJDaGFubmVsQ29uZmlnUHJvcHN9XG4gICAgICAgICAgICAgIGRlc2NyZWlwdGlvbj17Y29sb3JCeURlc2NyaXB0aW9ufVxuICAgICAgICAgICAgICBjaGFubmVsPXtsYXllci52aXN1YWxDaGFubmVscy5jb2xvcn1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgKSA6IG51bGx9XG4gICAgICAgICAge2xheWVyLnZpc0NvbmZpZ1NldHRpbmdzLnBlcmNlbnRpbGUgJiYgbGF5ZXIudmlzQ29uZmlnU2V0dGluZ3MucGVyY2VudGlsZS5jb25kaXRpb24obGF5ZXIuY29uZmlnKSA/IChcbiAgICAgICAgICAgIDxWaXNDb25maWdTbGlkZXJcbiAgICAgICAgICAgICAgey4uLmxheWVyLnZpc0NvbmZpZ1NldHRpbmdzLnBlcmNlbnRpbGV9XG4gICAgICAgICAgICAgIHsuLi52aXNDb25maWd1cmF0b3JQcm9wc31cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgKSA6IG51bGx9XG4gICAgICAgICAgPFZpc0NvbmZpZ1NsaWRlclxuICAgICAgICAgICAgey4uLmxheWVyLnZpc0NvbmZpZ1NldHRpbmdzLm9wYWNpdHl9XG4gICAgICAgICAgICB7Li4udmlzQ29uZmlndXJhdG9yUHJvcHN9XG4gICAgICAgICAgLz5cbiAgICAgICAgPC9MYXllckNvbmZpZ0dyb3VwPlxuXG4gICAgICAgIHsvKiBDZWxsIHNpemUgKi99XG4gICAgICAgIDxMYXllckNvbmZpZ0dyb3VwIGxhYmVsPXsncmFkaXVzJ30+XG4gICAgICAgICAgPFZpc0NvbmZpZ1NsaWRlclxuICAgICAgICAgICAgey4uLmxheWVyLnZpc0NvbmZpZ1NldHRpbmdzLndvcmxkVW5pdFNpemV9XG4gICAgICAgICAgICB7Li4udmlzQ29uZmlndXJhdG9yUHJvcHN9XG4gICAgICAgICAgLz5cbiAgICAgICAgICA8VmlzQ29uZmlnU2xpZGVyXG4gICAgICAgICAgICB7Li4ubGF5ZXIudmlzQ29uZmlnU2V0dGluZ3MuY292ZXJhZ2V9XG4gICAgICAgICAgICB7Li4udmlzQ29uZmlndXJhdG9yUHJvcHN9XG4gICAgICAgICAgLz5cbiAgICAgICAgPC9MYXllckNvbmZpZ0dyb3VwPlxuXG4gICAgICAgIHsvKiBFbGV2YXRpb24gKi99XG4gICAgICAgIHtsYXllci52aXNDb25maWdTZXR0aW5ncy5lbmFibGUzZCA/XG4gICAgICAgICAgPExheWVyQ29uZmlnR3JvdXBcbiAgICAgICAgICAgIHsuLi5sYXllci52aXNDb25maWdTZXR0aW5ncy5lbmFibGUzZH1cbiAgICAgICAgICAgIHsuLi52aXNDb25maWd1cmF0b3JQcm9wc31cbiAgICAgICAgICA+XG4gICAgICAgICAgICA8VmlzQ29uZmlnU2xpZGVyXG4gICAgICAgICAgICAgIHsuLi5sYXllci52aXNDb25maWdTZXR0aW5ncy5lbGV2YXRpb25TY2FsZX1cbiAgICAgICAgICAgICAgey4uLnZpc0NvbmZpZ3VyYXRvclByb3BzfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDxDaGFubmVsQnlWYWx1ZVNlbGVjdG9yXG4gICAgICAgICAgICAgIHsuLi5sYXllckNoYW5uZWxDb25maWdQcm9wc31cbiAgICAgICAgICAgICAgY2hhbm5lbD17bGF5ZXIudmlzdWFsQ2hhbm5lbHMuc2l6ZX1cbiAgICAgICAgICAgICAgZGVzY3JpcHRpb249e2VsZXZhdGlvbkJ5RGVzY3JpcHRpb259XG4gICAgICAgICAgICAgIGRpc2FibGVkPXshZW5hYmxlM2R9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICAge2xheWVyLnZpc0NvbmZpZ1NldHRpbmdzLnNpemVBZ2dyZWdhdGlvbi5jb25kaXRpb24obGF5ZXIuY29uZmlnKSA/IChcbiAgICAgICAgICAgICAgPEFnZ3JlZ2F0aW9uVHlwZVNlbGVjdG9yXG4gICAgICAgICAgICAgICAgey4uLmxheWVyLnZpc0NvbmZpZ1NldHRpbmdzLnNpemVBZ2dyZWdhdGlvbn1cbiAgICAgICAgICAgICAgICB7Li4ubGF5ZXJDaGFubmVsQ29uZmlnUHJvcHN9XG4gICAgICAgICAgICAgICAgY2hhbm5lbD17bGF5ZXIudmlzdWFsQ2hhbm5lbHMuc2l6ZX1cbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICkgOiBudWxsfVxuICAgICAgICAgICAge2xheWVyLnZpc0NvbmZpZ1NldHRpbmdzLmVsZXZhdGlvblBlcmNlbnRpbGUuY29uZGl0aW9uKFxuICAgICAgICAgICAgICBsYXllci5jb25maWdcbiAgICAgICAgICAgICkgPyAoXG4gICAgICAgICAgICAgIDxWaXNDb25maWdTbGlkZXJcbiAgICAgICAgICAgICAgICB7Li4ubGF5ZXIudmlzQ29uZmlnU2V0dGluZ3MuZWxldmF0aW9uUGVyY2VudGlsZX1cbiAgICAgICAgICAgICAgICB7Li4udmlzQ29uZmlndXJhdG9yUHJvcHN9XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICApIDogbnVsbH1cbiAgICAgICAgICA8L0xheWVyQ29uZmlnR3JvdXA+IDogbnVsbH1cblxuICAgICAgICB7LyogSGlnaCBQcmVjaXNpb24gKi99XG4gICAgICAgIDxMYXllckNvbmZpZ0dyb3VwXG4gICAgICAgICAgey4uLmxheWVyLnZpc0NvbmZpZ1NldHRpbmdzWydoaS1wcmVjaXNpb24nXX1cbiAgICAgICAgICB7Li4udmlzQ29uZmlndXJhdG9yUHJvcHN9XG4gICAgICAgIC8+XG4gICAgICA8L1N0eWxlZExheWVyVmlzdWFsQ29uZmlndXJhdG9yPlxuICAgICk7XG4gIH1cblxuICAvLyBUT0RPOiBTaGFuIG1vdmUgdGhlc2UgaW50byBsYXllciBjbGFzc1xuICBfcmVuZGVySGV4YWdvbklkTGF5ZXJDb25maWcoe1xuICAgIGxheWVyLFxuICAgIHZpc0NvbmZpZ3VyYXRvclByb3BzLFxuICAgIGxheWVyQ29uZmlndXJhdG9yUHJvcHMsXG4gICAgbGF5ZXJDaGFubmVsQ29uZmlnUHJvcHNcbiAgfSkge1xuICAgIHJldHVybiAoXG4gICAgICA8U3R5bGVkTGF5ZXJWaXN1YWxDb25maWd1cmF0b3I+XG4gICAgICAgIHsvKiBDb2xvciAqL31cbiAgICAgICAgPExheWVyQ29uZmlnR3JvdXAgbGFiZWw9eydjb2xvcid9PlxuICAgICAgICAgIHtsYXllci5jb25maWcuY29sb3JGaWVsZCA/IChcbiAgICAgICAgICAgIDxDb2xvclJhbmdlQ29uZmlnIHsuLi52aXNDb25maWd1cmF0b3JQcm9wc30gLz5cbiAgICAgICAgICApIDogKFxuICAgICAgICAgICAgPExheWVyQ29sb3JTZWxlY3RvciB7Li4ubGF5ZXJDb25maWd1cmF0b3JQcm9wc30gLz5cbiAgICAgICAgICApfVxuICAgICAgICAgIDxDaGFubmVsQnlWYWx1ZVNlbGVjdG9yXG4gICAgICAgICAgICBjaGFubmVsPXtsYXllci52aXN1YWxDaGFubmVscy5jb2xvcn1cbiAgICAgICAgICAgIHsuLi5sYXllckNoYW5uZWxDb25maWdQcm9wc31cbiAgICAgICAgICAvPlxuICAgICAgICAgIDxWaXNDb25maWdTbGlkZXJcbiAgICAgICAgICAgIHsuLi5MQVlFUl9WSVNfQ09ORklHUy5vcGFjaXR5fVxuICAgICAgICAgICAgey4uLnZpc0NvbmZpZ3VyYXRvclByb3BzfVxuICAgICAgICAgIC8+XG4gICAgICAgIDwvTGF5ZXJDb25maWdHcm91cD5cbiAgICAgICAgey8qIGhlaWdodCAqL31cbiAgICAgICAgPExheWVyQ29uZmlnR3JvdXBcbiAgICAgICAgICB7Li4uTEFZRVJfVklTX0NPTkZJR1MuZW5hYmxlM2R9XG4gICAgICAgICAgey4uLnZpc0NvbmZpZ3VyYXRvclByb3BzfVxuICAgICAgICA+XG4gICAgICAgICAgPENoYW5uZWxCeVZhbHVlU2VsZWN0b3JcbiAgICAgICAgICAgIGNoYW5uZWw9e2xheWVyLnZpc3VhbENoYW5uZWxzLnNpemV9XG4gICAgICAgICAgICB7Li4ubGF5ZXJDaGFubmVsQ29uZmlnUHJvcHN9XG4gICAgICAgICAgLz5cbiAgICAgICAgICA8VmlzQ29uZmlnU2xpZGVyXG4gICAgICAgICAgICB7Li4uTEFZRVJfVklTX0NPTkZJR1MuZWxldmF0aW9uUmFuZ2V9XG4gICAgICAgICAgICB7Li4udmlzQ29uZmlndXJhdG9yUHJvcHN9XG4gICAgICAgICAgLz5cbiAgICAgICAgPC9MYXllckNvbmZpZ0dyb3VwPlxuICAgICAgICB7LyogaGlnaCBwcmVjaXNpb24gKi99XG4gICAgICAgIDxMYXllckNvbmZpZ0dyb3VwXG4gICAgICAgICAgey4uLkxBWUVSX1ZJU19DT05GSUdTWydoaS1wcmVjaXNpb24nXX1cbiAgICAgICAgICB7Li4udmlzQ29uZmlndXJhdG9yUHJvcHN9XG4gICAgICAgIC8+XG4gICAgICA8L1N0eWxlZExheWVyVmlzdWFsQ29uZmlndXJhdG9yPlxuICAgICk7XG4gIH1cblxuICBfcmVuZGVyQXJjTGF5ZXJDb25maWcoYXJncykge1xuICAgIHJldHVybiB0aGlzLl9yZW5kZXJMaW5lTGF5ZXJDb25maWcoYXJncyk7XG4gIH1cblxuICBfcmVuZGVyTGluZUxheWVyQ29uZmlnKHtcbiAgICBsYXllcixcbiAgICB2aXNDb25maWd1cmF0b3JQcm9wcyxcbiAgICBsYXllckNvbmZpZ3VyYXRvclByb3BzLFxuICAgIGxheWVyQ2hhbm5lbENvbmZpZ1Byb3BzXG4gIH0pIHtcbiAgICByZXR1cm4gKFxuICAgICAgPFN0eWxlZExheWVyVmlzdWFsQ29uZmlndXJhdG9yPlxuICAgICAgICB7LyogQ29sb3IgKi99XG4gICAgICAgIDxMYXllckNvbmZpZ0dyb3VwIGxhYmVsPXsnY29sb3InfT5cbiAgICAgICAgICB7bGF5ZXIuY29uZmlnLmNvbG9yRmllbGQgPyAoXG4gICAgICAgICAgICA8Q29sb3JSYW5nZUNvbmZpZyB7Li4udmlzQ29uZmlndXJhdG9yUHJvcHN9IC8+XG4gICAgICAgICAgKSA6IChcbiAgICAgICAgICAgIDxBcmNMYXllckNvbG9yU2VsZWN0b3JcbiAgICAgICAgICAgICAgbGF5ZXI9e2xheWVyfVxuICAgICAgICAgICAgICBvbkNoYW5nZUNvbmZpZz17bGF5ZXJDb25maWd1cmF0b3JQcm9wcy5vbkNoYW5nZX1cbiAgICAgICAgICAgICAgb25DaGFuZ2VWaXNDb25maWc9e3Zpc0NvbmZpZ3VyYXRvclByb3BzLm9uQ2hhbmdlfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICApfVxuICAgICAgICAgIDxDaGFubmVsQnlWYWx1ZVNlbGVjdG9yXG4gICAgICAgICAgICBjaGFubmVsPXtsYXllci52aXN1YWxDaGFubmVscy5jb2xvcn1cbiAgICAgICAgICAgIHsuLi5sYXllckNoYW5uZWxDb25maWdQcm9wc31cbiAgICAgICAgICAvPlxuICAgICAgICAgIDxWaXNDb25maWdTbGlkZXJcbiAgICAgICAgICAgIHsuLi5MQVlFUl9WSVNfQ09ORklHUy5vcGFjaXR5fVxuICAgICAgICAgICAgey4uLnZpc0NvbmZpZ3VyYXRvclByb3BzfVxuICAgICAgICAgIC8+XG4gICAgICAgIDwvTGF5ZXJDb25maWdHcm91cD5cblxuICAgICAgICB7LyogdGhpY2tuZXNzICovfVxuICAgICAgICA8TGF5ZXJDb25maWdHcm91cCBsYWJlbD17J3N0cm9rZSd9PlxuICAgICAgICAgIHtsYXllci5jb25maWcuc2l6ZUZpZWxkID8gKFxuICAgICAgICAgICAgPFZpc0NvbmZpZ1NsaWRlclxuICAgICAgICAgICAgICB7Li4uTEFZRVJfVklTX0NPTkZJR1Muc3Ryb2tlV2lkdGhSYW5nZX1cbiAgICAgICAgICAgICAgey4uLnZpc0NvbmZpZ3VyYXRvclByb3BzfVxuICAgICAgICAgICAgICBkaXNhYmxlZD17IWxheWVyLmNvbmZpZy5zaXplRmllbGR9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICA8VmlzQ29uZmlnU2xpZGVyXG4gICAgICAgICAgICAgIHsuLi5MQVlFUl9WSVNfQ09ORklHUy50aGlja25lc3N9XG4gICAgICAgICAgICAgIHsuLi52aXNDb25maWd1cmF0b3JQcm9wc31cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgKX1cbiAgICAgICAgICA8Q2hhbm5lbEJ5VmFsdWVTZWxlY3RvclxuICAgICAgICAgICAgY2hhbm5lbD17bGF5ZXIudmlzdWFsQ2hhbm5lbHMuc2l6ZX1cbiAgICAgICAgICAgIHsuLi5sYXllckNoYW5uZWxDb25maWdQcm9wc31cbiAgICAgICAgICAvPlxuICAgICAgICA8L0xheWVyQ29uZmlnR3JvdXA+XG5cbiAgICAgICAgey8qIGhpZ2ggcHJlY2lzaW9uICovfVxuICAgICAgICA8TGF5ZXJDb25maWdHcm91cFxuICAgICAgICAgIHsuLi5MQVlFUl9WSVNfQ09ORklHU1snaGktcHJlY2lzaW9uJ119XG4gICAgICAgICAgey4uLnZpc0NvbmZpZ3VyYXRvclByb3BzfVxuICAgICAgICAvPlxuICAgICAgPC9TdHlsZWRMYXllclZpc3VhbENvbmZpZ3VyYXRvcj5cbiAgICApO1xuICB9XG5cbiAgX3JlbmRlckdlb2pzb25MYXllckNvbmZpZyh7XG4gICAgbGF5ZXIsXG4gICAgdmlzQ29uZmlndXJhdG9yUHJvcHMsXG4gICAgbGF5ZXJDb25maWd1cmF0b3JQcm9wcyxcbiAgICBsYXllckNoYW5uZWxDb25maWdQcm9wc1xuICB9KSB7XG4gICAgY29uc3Qge1xuICAgICAgbWV0YToge2ZlYXR1cmVUeXBlcyA9IHt9fSxcbiAgICAgIGNvbmZpZzoge3Zpc0NvbmZpZ31cbiAgICB9ID0gbGF5ZXI7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPFN0eWxlZExheWVyVmlzdWFsQ29uZmlndXJhdG9yPlxuICAgICAgICB7LyogQ29sb3IgQnkgKi99XG4gICAgICAgIDxMYXllckNvbmZpZ0dyb3VwIGxhYmVsPXsnY29sb3InfT5cbiAgICAgICAgICB7ZmVhdHVyZVR5cGVzLnBvbHlnb24gPyAoXG4gICAgICAgICAgICA8VmlzQ29uZmlnU3dpdGNoXG4gICAgICAgICAgICAgIHsuLi52aXNDb25maWd1cmF0b3JQcm9wc31cbiAgICAgICAgICAgICAgey4uLkxBWUVSX1ZJU19DT05GSUdTLmZpbGxlZH1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgKSA6IG51bGx9XG5cbiAgICAgICAgICB7bGF5ZXIuY29uZmlnLmNvbG9yRmllbGQgPyAoXG4gICAgICAgICAgICA8Q29sb3JSYW5nZUNvbmZpZyB7Li4udmlzQ29uZmlndXJhdG9yUHJvcHN9IC8+XG4gICAgICAgICAgKSA6IChcbiAgICAgICAgICAgIDxMYXllckNvbG9yU2VsZWN0b3Igey4uLmxheWVyQ29uZmlndXJhdG9yUHJvcHN9IC8+XG4gICAgICAgICAgKX1cblxuICAgICAgICAgIDxDaGFubmVsQnlWYWx1ZVNlbGVjdG9yXG4gICAgICAgICAgICBjaGFubmVsPXtsYXllci52aXN1YWxDaGFubmVscy5jb2xvcn1cbiAgICAgICAgICAgIHsuLi5sYXllckNoYW5uZWxDb25maWdQcm9wc31cbiAgICAgICAgICAvPlxuXG4gICAgICAgICAgPFZpc0NvbmZpZ1NsaWRlclxuICAgICAgICAgICAgey4uLkxBWUVSX1ZJU19DT05GSUdTLm9wYWNpdHl9XG4gICAgICAgICAgICB7Li4udmlzQ29uZmlndXJhdG9yUHJvcHN9XG4gICAgICAgICAgLz5cbiAgICAgICAgPC9MYXllckNvbmZpZ0dyb3VwPlxuXG4gICAgICAgIHsvKiBTdHJva2UgV2lkdGggKi99XG4gICAgICAgIHtmZWF0dXJlVHlwZXMubGluZSB8fCAoZmVhdHVyZVR5cGVzLnBvbHlnb24gJiYgdmlzQ29uZmlnLnN0cm9rZWQpID8gKFxuICAgICAgICAgIDxMYXllckNvbmZpZ0dyb3VwXG4gICAgICAgICAgICBsYWJlbD1cInN0cm9rZVwiXG4gICAgICAgICAgICB7Li4udmlzQ29uZmlndXJhdG9yUHJvcHN9XG4gICAgICAgICAgICB7Li4uKGZlYXR1cmVUeXBlcy5wb2x5Z29uID8gTEFZRVJfVklTX0NPTkZJR1Muc3Ryb2tlZCA6IHt9KX1cbiAgICAgICAgICA+XG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICA8VmlzQ29uZmlnU2xpZGVyXG4gICAgICAgICAgICAgICAgey4uLkxBWUVSX1ZJU19DT05GSUdTLnRoaWNrbmVzc31cbiAgICAgICAgICAgICAgICB7Li4udmlzQ29uZmlndXJhdG9yUHJvcHN9XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIDxDaGFubmVsQnlWYWx1ZVNlbGVjdG9yXG4gICAgICAgICAgICAgICAgY2hhbm5lbD17bGF5ZXIudmlzdWFsQ2hhbm5lbHMuc2l6ZX1cbiAgICAgICAgICAgICAgICB7Li4ubGF5ZXJDaGFubmVsQ29uZmlnUHJvcHN9XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIDxWaXNDb25maWdTbGlkZXJcbiAgICAgICAgICAgICAgICB7Li4uTEFZRVJfVklTX0NPTkZJR1Muc3Ryb2tlV2lkdGhSYW5nZX1cbiAgICAgICAgICAgICAgICB7Li4udmlzQ29uZmlndXJhdG9yUHJvcHN9XG4gICAgICAgICAgICAgICAgZGlzYWJsZWQ9eyFsYXllci5jb25maWcuc2l6ZUZpZWxkfVxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9MYXllckNvbmZpZ0dyb3VwPlxuICAgICAgICApIDogbnVsbH1cblxuICAgICAgICB7LyogRWxldmF0aW9uICovfVxuICAgICAgICB7ZmVhdHVyZVR5cGVzLnBvbHlnb24gJiYgdmlzQ29uZmlnLmZpbGxlZCA/IChcbiAgICAgICAgICA8TGF5ZXJDb25maWdHcm91cFxuICAgICAgICAgICAgey4uLnZpc0NvbmZpZ3VyYXRvclByb3BzfVxuICAgICAgICAgICAgey4uLkxBWUVSX1ZJU19DT05GSUdTLmVuYWJsZTNkfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxWaXNDb25maWdTbGlkZXJcbiAgICAgICAgICAgICAgey4uLkxBWUVSX1ZJU19DT05GSUdTLmVsZXZhdGlvblNjYWxlfVxuICAgICAgICAgICAgICB7Li4udmlzQ29uZmlndXJhdG9yUHJvcHN9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICAgPENoYW5uZWxCeVZhbHVlU2VsZWN0b3JcbiAgICAgICAgICAgICAgY2hhbm5lbD17bGF5ZXIudmlzdWFsQ2hhbm5lbHMuaGVpZ2h0fVxuICAgICAgICAgICAgICB7Li4ubGF5ZXJDaGFubmVsQ29uZmlnUHJvcHN9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICAgPFZpc0NvbmZpZ1N3aXRjaFxuICAgICAgICAgICAgICB7Li4udmlzQ29uZmlndXJhdG9yUHJvcHN9XG4gICAgICAgICAgICAgIHsuLi5MQVlFUl9WSVNfQ09ORklHUy53aXJlZnJhbWV9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgIDwvTGF5ZXJDb25maWdHcm91cD5cbiAgICAgICAgKSA6IG51bGx9XG5cbiAgICAgICAgey8qIFJhZGl1cyAqL31cbiAgICAgICAge2ZlYXR1cmVUeXBlcy5wb2ludCA/IChcbiAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgPFZpc0NvbmZpZ1NsaWRlclxuICAgICAgICAgICAgICB7Li4uTEFZRVJfVklTX0NPTkZJR1MucmFkaXVzfVxuICAgICAgICAgICAgICB7Li4udmlzQ29uZmlndXJhdG9yUHJvcHN9XG4gICAgICAgICAgICAgIGxhYmVsPVwiUG9pbnQgUmFkaXVzXCJcbiAgICAgICAgICAgICAgZGlzYWJsZWQ9e0Jvb2xlYW4obGF5ZXIuY29uZmlnLnJhZGl1c0ZpZWxkKX1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8Q2hhbm5lbEJ5VmFsdWVTZWxlY3RvclxuICAgICAgICAgICAgICBjaGFubmVsPXtsYXllci52aXN1YWxDaGFubmVscy5yYWRpdXN9XG4gICAgICAgICAgICAgIHsuLi5sYXllckNoYW5uZWxDb25maWdQcm9wc31cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8VmlzQ29uZmlnU2xpZGVyXG4gICAgICAgICAgICAgIHsuLi5MQVlFUl9WSVNfQ09ORklHUy5yYWRpdXNSYW5nZX1cbiAgICAgICAgICAgICAgey4uLnZpc0NvbmZpZ3VyYXRvclByb3BzfVxuICAgICAgICAgICAgICBkaXNhYmxlZD17IWxheWVyLmNvbmZpZy5yYWRpdXNGaWVsZH1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICkgOiBudWxsfVxuXG4gICAgICAgIHsvKiBoaWdoIHByZWNpc2lvbiAqL31cbiAgICAgICAgPExheWVyQ29uZmlnR3JvdXBcbiAgICAgICAgICB7Li4uTEFZRVJfVklTX0NPTkZJR1NbJ2hpLXByZWNpc2lvbiddfVxuICAgICAgICAgIHsuLi52aXNDb25maWd1cmF0b3JQcm9wc31cbiAgICAgICAgLz5cbiAgICAgIDwvU3R5bGVkTGF5ZXJWaXN1YWxDb25maWd1cmF0b3I+XG4gICAgKTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7XG4gICAgICBsYXllcixcbiAgICAgIGRhdGFzZXRzLFxuICAgICAgdXBkYXRlTGF5ZXJDb25maWcsXG4gICAgICBsYXllclR5cGVPcHRpb25zLFxuICAgICAgdXBkYXRlTGF5ZXJUeXBlXG4gICAgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3Qge2ZpZWxkcyA9IFtdLCBmaWVsZFBhaXJzfSA9IGxheWVyLmNvbmZpZy5kYXRhSWRcbiAgICAgID8gZGF0YXNldHNbbGF5ZXIuY29uZmlnLmRhdGFJZF1cbiAgICAgIDoge307XG4gICAgY29uc3Qge2NvbmZpZ30gPSBsYXllcjtcblxuICAgIGNvbnN0IGNvbW1vbkNvbmZpZ1Byb3AgPSB7XG4gICAgICBsYXllcixcbiAgICAgIGZpZWxkc1xuICAgIH07XG5cbiAgICBjb25zdCB2aXNDb25maWd1cmF0b3JQcm9wcyA9IHtcbiAgICAgIC4uLmNvbW1vbkNvbmZpZ1Byb3AsXG4gICAgICBvbkNoYW5nZTogdGhpcy5wcm9wcy51cGRhdGVMYXllclZpc0NvbmZpZ1xuICAgIH07XG5cbiAgICBjb25zdCBsYXllckNvbmZpZ3VyYXRvclByb3BzID0ge1xuICAgICAgLi4uY29tbW9uQ29uZmlnUHJvcCxcbiAgICAgIG9uQ2hhbmdlOiB1cGRhdGVMYXllckNvbmZpZ1xuICAgIH07XG5cbiAgICBjb25zdCBsYXllckNoYW5uZWxDb25maWdQcm9wcyA9IHtcbiAgICAgIC4uLmNvbW1vbkNvbmZpZ1Byb3AsXG4gICAgICBvbkNoYW5nZTogdGhpcy5wcm9wcy51cGRhdGVMYXllclZpc3VhbENoYW5uZWxDb25maWdcbiAgICB9O1xuXG4gICAgY29uc3QgcmVuZGVyVGVtcGxhdGUgPVxuICAgICAgbGF5ZXIudHlwZSAmJiBgX3JlbmRlciR7Y2FwaXRhbGl6ZUZpcnN0TGV0dGVyKGxheWVyLnR5cGUpfUxheWVyQ29uZmlnYDtcblxuICAgIHJldHVybiAoXG4gICAgICA8U3R5bGVkTGF5ZXJDb25maWd1cmF0b3I+XG4gICAgICAgIHtsYXllci5sYXllckluZm9Nb2RhbCA/IDxIb3dUb0J1dHRvbiBvbkNsaWNrPXsoKSA9PiB0aGlzLnByb3BzLm9wZW5Nb2RhbChsYXllci5sYXllckluZm9Nb2RhbCl9Lz4gOiBudWxsfVxuICAgICAgICA8TGF5ZXJDb25maWdHcm91cCBsYWJlbD17J2Jhc2ljJ30+XG4gICAgICAgICAge09iamVjdC5rZXlzKGRhdGFzZXRzKS5sZW5ndGggPiAxICYmIChcbiAgICAgICAgICAgIDxTb3VyY2VEYXRhU2VsZWN0b3JcbiAgICAgICAgICAgICAgZGF0YXNldHM9e2RhdGFzZXRzfVxuICAgICAgICAgICAgICBpZD17bGF5ZXIuaWR9XG4gICAgICAgICAgICAgIGRpc2FibGVkPXtsYXllci50eWVwICYmIGNvbmZpZy5jb2x1bW5zfVxuICAgICAgICAgICAgICBkYXRhSWQ9e2NvbmZpZy5kYXRhSWR9XG4gICAgICAgICAgICAgIG9uU2VsZWN0PXt2YWx1ZSA9PiB1cGRhdGVMYXllckNvbmZpZyh7ZGF0YUlkOiB2YWx1ZX0pfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICApfVxuICAgICAgICAgIDxMYXllclR5cGVTZWxlY3RvclxuICAgICAgICAgICAgbGF5ZXI9e2xheWVyfVxuICAgICAgICAgICAgbGF5ZXJUeXBlT3B0aW9ucz17bGF5ZXJUeXBlT3B0aW9uc31cbiAgICAgICAgICAgIG9uU2VsZWN0PXt1cGRhdGVMYXllclR5cGV9XG4gICAgICAgICAgLz5cbiAgICAgICAgICA8TGF5ZXJDb2x1bW5Db25maWdcbiAgICAgICAgICAgIGxheWVyPXtsYXllcn1cbiAgICAgICAgICAgIGZpZWxkcz17ZmllbGRzfVxuICAgICAgICAgICAgZmllbGRQYWlycz17ZmllbGRQYWlyc31cbiAgICAgICAgICAgIHVwZGF0ZUxheWVyQ29uZmlnPXt1cGRhdGVMYXllckNvbmZpZ31cbiAgICAgICAgICAgIHVwZGF0ZUxheWVyVHlwZT17dGhpcy5wcm9wcy51cGRhdGVMYXllclR5cGV9XG4gICAgICAgICAgLz5cbiAgICAgICAgPC9MYXllckNvbmZpZ0dyb3VwPlxuICAgICAgICB7dGhpc1tyZW5kZXJUZW1wbGF0ZV0gJiZcbiAgICAgICAgICB0aGlzW3JlbmRlclRlbXBsYXRlXSh7XG4gICAgICAgICAgICBsYXllcixcbiAgICAgICAgICAgIHZpc0NvbmZpZ3VyYXRvclByb3BzLFxuICAgICAgICAgICAgbGF5ZXJDaGFubmVsQ29uZmlnUHJvcHMsXG4gICAgICAgICAgICBsYXllckNvbmZpZ3VyYXRvclByb3BzXG4gICAgICAgICAgfSl9XG4gICAgICA8L1N0eWxlZExheWVyQ29uZmlndXJhdG9yPlxuICAgICk7XG4gIH1cbn1cblxuLypcbiAqIENvbXBvbmVudGl6ZSBjb25maWcgY29tcG9uZW50IGludG8gcHVyZSBmdW5jdGlvbmFsIGNvbXBvbmVudHNcbiAqL1xuXG5jb25zdCBTdHlsZWRIb3dUb0J1dHRvbiA9IHN0eWxlZC5kaXZgXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgcmlnaHQ6IDA7XG4gIHRvcDogMDtcbmA7XG5cbmV4cG9ydCBjb25zdCBIb3dUb0J1dHRvbiA9ICh7b25DbGlja30pID0+IChcbiAgPFN0eWxlZEhvd1RvQnV0dG9uPlxuICAgIDxCdXR0b24gc2Vjb25kYXJ5IHNtYWxsIG9uQ2xpY2s9e29uQ2xpY2t9PkhvdyB0bzwvQnV0dG9uPlxuICA8L1N0eWxlZEhvd1RvQnV0dG9uPlxuKTtcblxuZXhwb3J0IGNvbnN0IExheWVyQ29sb3JTZWxlY3RvciA9ICh7bGF5ZXIsIG9uQ2hhbmdlLCBsYWJlbH0pID0+IChcbiAgPFNpZGVQYW5lbFNlY3Rpb24gZGlzYWJsZWQ9e2xheWVyLmNvbmZpZy5jb2xvckZpZWxkfT5cbiAgICA8Q29sb3JTZWxlY3RvclxuICAgICAgY29sb3JTZXRzPXtbXG4gICAgICAgIHtcbiAgICAgICAgICBzZWxlY3RlZENvbG9yOiBsYXllci5jb25maWcuY29sb3IsXG4gICAgICAgICAgc2V0Q29sb3I6IHJnYlZhbHVlID0+IG9uQ2hhbmdlKHtjb2xvcjogcmdiVmFsdWV9KVxuICAgICAgICB9XG4gICAgICBdfVxuICAgIC8+XG4gIDwvU2lkZVBhbmVsU2VjdGlvbj5cbik7XG5cbmV4cG9ydCBjb25zdCBBcmNMYXllckNvbG9yU2VsZWN0b3IgPSAoe1xuICBsYXllcixcbiAgb25DaGFuZ2VDb25maWcsXG4gIG9uQ2hhbmdlVmlzQ29uZmlnXG59KSA9PiAoXG4gIDxTaWRlUGFuZWxTZWN0aW9uPlxuICAgIDxDb2xvclNlbGVjdG9yXG4gICAgICBjb2xvclNldHM9e1tcbiAgICAgICAge1xuICAgICAgICAgIHNlbGVjdGVkQ29sb3I6IGxheWVyLmNvbmZpZy5jb2xvcixcbiAgICAgICAgICBzZXRDb2xvcjogcmdiVmFsdWUgPT4gb25DaGFuZ2VDb25maWcoe2NvbG9yOiByZ2JWYWx1ZX0pLFxuICAgICAgICAgIGxhYmVsOiAnU291cmNlJ1xuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgc2VsZWN0ZWRDb2xvcjpcbiAgICAgICAgICAgIGxheWVyLmNvbmZpZy52aXNDb25maWcudGFyZ2V0Q29sb3IgfHwgbGF5ZXIuY29uZmlnLmNvbG9yLFxuICAgICAgICAgIHNldENvbG9yOiByZ2JWYWx1ZSA9PiBvbkNoYW5nZVZpc0NvbmZpZyh7dGFyZ2V0Q29sb3I6IHJnYlZhbHVlfSksXG4gICAgICAgICAgbGFiZWw6ICdUYXJnZXQnXG4gICAgICAgIH1cbiAgICAgIF19XG4gICAgLz5cbiAgPC9TaWRlUGFuZWxTZWN0aW9uPlxuKTtcblxuZXhwb3J0IGNvbnN0IENvbG9yUmFuZ2VDb25maWcgPSAoe2xheWVyLCBvbkNoYW5nZX0pID0+IChcbiAgPFNpZGVQYW5lbFNlY3Rpb24+XG4gICAgPENvbG9yU2VsZWN0b3JcbiAgICAgIGNvbG9yU2V0cz17W1xuICAgICAgICB7XG4gICAgICAgICAgc2VsZWN0ZWRDb2xvcjogbGF5ZXIuY29uZmlnLnZpc0NvbmZpZy5jb2xvclJhbmdlLFxuICAgICAgICAgIGlzUmFuZ2U6IHRydWUsXG4gICAgICAgICAgc2V0Q29sb3I6IGNvbG9yUmFuZ2UgPT4gb25DaGFuZ2Uoe2NvbG9yUmFuZ2V9KVxuICAgICAgICB9XG4gICAgICBdfVxuICAgIC8+XG4gIDwvU2lkZVBhbmVsU2VjdGlvbj5cbik7XG5cbmV4cG9ydCBjb25zdCBDaGFubmVsQnlWYWx1ZVNlbGVjdG9yID0gKHtcbiAgbGF5ZXIsXG4gIGNoYW5uZWwsXG4gIG9uQ2hhbmdlLFxuICBmaWVsZHMsXG4gIGRlc2NyaXB0aW9uXG59KSA9PiB7XG4gIGNvbnN0IHtcbiAgICBjaGFubmVsU2NhbGVUeXBlLFxuICAgIGRvbWFpbixcbiAgICBmaWVsZCxcbiAgICBrZXksXG4gICAgcHJvcGVydHksXG4gICAgcmFuZ2UsXG4gICAgc2NhbGUsXG4gICAgZGVmYXVsdE1lYXN1cmUsXG4gICAgc3VwcG9ydGVkRmllbGRUeXBlc1xuICB9ID0gY2hhbm5lbDtcbiAgY29uc3QgY2hhbm5lbFN1cHBvcnRlZEZpZWxkVHlwZXMgPSBzdXBwb3J0ZWRGaWVsZFR5cGVzIHx8IENIQU5ORUxfU0NBTEVfU1VQUE9SVEVEX0ZJRUxEU1tjaGFubmVsU2NhbGVUeXBlXTtcbiAgY29uc3Qgc3VwcG9ydGVkRmllbGRzID0gZmllbGRzLmZpbHRlcigoe3R5cGV9KSA9PlxuICAgIGNoYW5uZWxTdXBwb3J0ZWRGaWVsZFR5cGVzLmluY2x1ZGVzKHR5cGUpXG4gICk7XG4gIGNvbnN0IHNjYWxlT3B0aW9ucyA9IGxheWVyLmdldFNjYWxlT3B0aW9ucyhjaGFubmVsLmtleSk7XG4gIGNvbnN0IHNob3dTY2FsZSA9ICFsYXllci5pc0FnZ3JlZ2F0ZWQgJiYgbGF5ZXIuY29uZmlnW3NjYWxlXSAmJiBzY2FsZU9wdGlvbnMubGVuZ3RoID4gMTtcbiAgY29uc3QgZGVmYXVsdERlc2NyaXB0aW9uID0gYENhbGN1bGF0ZSAke3Byb3BlcnR5fSBiYXNlZCBvbiBzZWxlY3RlZCBmaWVsZGA7XG5cbiAgcmV0dXJuIChcbiAgICA8VmlzQ29uZmlnQnlGaWVsZFNlbGVjdG9yXG4gICAgICBjaGFubmVsPXtjaGFubmVsLmtleX1cbiAgICAgIGRlc2NyaXB0aW9uPXtkZXNjcmlwdGlvbiB8fCBkZWZhdWx0RGVzY3JpcHRpb259XG4gICAgICBkb21haW49e2xheWVyLmNvbmZpZ1tkb21haW5dfVxuICAgICAgZmllbGRzPXtzdXBwb3J0ZWRGaWVsZHN9XG4gICAgICBpZD17bGF5ZXIuaWR9XG4gICAgICBrZXk9e2Ake2tleX0tY2hhbm5lbC1zZWxlY3RvcmB9XG4gICAgICBwcm9wZXJ0eT17cHJvcGVydHl9XG4gICAgICBwbGFjZWhvbGRlcj17ZGVmYXVsdE1lYXN1cmUgfHwgJ1NlbGVjdCBhIGZpZWxkJ31cbiAgICAgIHJhbmdlPXtsYXllci5jb25maWcudmlzQ29uZmlnW3JhbmdlXX1cbiAgICAgIHNjYWxlT3B0aW9ucz17c2NhbGVPcHRpb25zfVxuICAgICAgc2NhbGVUeXBlPXtzY2FsZSA/IGxheWVyLmNvbmZpZ1tzY2FsZV0gOiBudWxsfVxuICAgICAgc2VsZWN0ZWRGaWVsZD17bGF5ZXIuY29uZmlnW2ZpZWxkXX1cbiAgICAgIHNob3dTY2FsZT17c2hvd1NjYWxlfVxuICAgICAgdXBkYXRlRmllbGQ9e3ZhbCA9PiBvbkNoYW5nZSh7W2ZpZWxkXTogdmFsfSwga2V5KX1cbiAgICAgIHVwZGF0ZVNjYWxlPXt2YWwgPT4gb25DaGFuZ2Uoe1tzY2FsZV06IHZhbH0sIGtleSl9XG4gICAgLz5cbiAgKTtcbn07XG5cbmV4cG9ydCBjb25zdCBBZ2dyQ29sb3JTY2FsZVNlbGVjdG9yID0gKHtsYXllciwgb25DaGFuZ2V9KSA9PiB7XG4gIGNvbnN0IHNjYWxlT3B0aW9ucyA9IGxheWVyLmdldFNjYWxlT3B0aW9ucygnY29sb3InKTtcbiAgcmV0dXJuIChcbiAgICBBcnJheS5pc0FycmF5KHNjYWxlT3B0aW9ucykgJiYgc2NhbGVPcHRpb25zLmxlbmd0aCA+IDEgP1xuICAgICAgPERpbWVuc2lvblNjYWxlU2VsZWN0b3JcbiAgICAgICAgbGFiZWw9XCJDb2xvciBTY2FsZVwiXG4gICAgICAgIG9wdGlvbnM9e3NjYWxlT3B0aW9uc31cbiAgICAgICAgc2NhbGVUeXBlPXtsYXllci5jb25maWcuY29sb3JTY2FsZX1cbiAgICAgICAgb25TZWxlY3Q9e3ZhbCA9PiBvbkNoYW5nZSh7Y29sb3JTY2FsZTogdmFsfSwgJ2NvbG9yJyl9XG4gICAgICAvPiA6IG51bGxcbiAgKTtcbn07XG5cbmV4cG9ydCBjb25zdCBBZ2dyZWdhdGlvblR5cGVTZWxlY3RvciA9ICh7bGF5ZXIsIGNoYW5uZWwsIG9uQ2hhbmdlfSkgPT4ge1xuICBjb25zdCB7ZmllbGQsIGFnZ3JlZ2F0aW9uLCBrZXl9ID0gY2hhbm5lbDtcbiAgY29uc3Qgc2VsZWN0ZWRGaWVsZCA9IGxheWVyLmNvbmZpZ1tmaWVsZF07XG4gIGNvbnN0IHt2aXNDb25maWd9ID0gbGF5ZXIuY29uZmlnO1xuXG4gIC8vIGFnZ3JlZ2F0aW9uIHNob3VsZCBvbmx5IGJlIHNlbGVjdGFibGUgd2hlbiBmaWVsZCBpcyBzZWxlY3RlZFxuICBjb25zdCBhZ2dyZWdhdGlvbk9wdGlvbnMgPSBsYXllci5nZXRBZ2dyZWdhdGlvbk9wdGlvbnMoa2V5KTtcblxuICByZXR1cm4gKFxuICAgIDxTaWRlUGFuZWxTZWN0aW9uPlxuICAgICAgPFBhbmVsTGFiZWw+e2BBZ2dyZWdhdGUgJHtzZWxlY3RlZEZpZWxkLm5hbWV9IGJ5YH08L1BhbmVsTGFiZWw+XG4gICAgICA8SXRlbVNlbGVjdG9yXG4gICAgICAgIHNlbGVjdGVkSXRlbXM9e3Zpc0NvbmZpZ1thZ2dyZWdhdGlvbl19XG4gICAgICAgIG9wdGlvbnM9e2FnZ3JlZ2F0aW9uT3B0aW9uc31cbiAgICAgICAgbXVsdGlTZWxlY3Q9e2ZhbHNlfVxuICAgICAgICBzZWFyY2hhYmxlPXtmYWxzZX1cbiAgICAgICAgb25DaGFuZ2U9e3ZhbHVlID0+XG4gICAgICAgICAgb25DaGFuZ2UoXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHZpc0NvbmZpZzoge1xuICAgICAgICAgICAgICAgIC4uLmxheWVyLmNvbmZpZy52aXNDb25maWcsXG4gICAgICAgICAgICAgICAgW2FnZ3JlZ2F0aW9uXTogdmFsdWVcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNoYW5uZWwua2V5XG4gICAgICAgICAgKVxuICAgICAgICB9XG4gICAgICAvPlxuICAgIDwvU2lkZVBhbmVsU2VjdGlvbj5cbiAgKTtcbn07XG4vKiBlc2xpbnQtZW5hYmxlIG1heC1wYXJhbXMgKi9cbiJdfQ==