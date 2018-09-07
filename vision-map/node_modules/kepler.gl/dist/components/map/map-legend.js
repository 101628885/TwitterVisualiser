'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _taggedTemplateLiteral2 = require('babel-runtime/helpers/taggedTemplateLiteral');

var _taggedTemplateLiteral3 = _interopRequireDefault(_taggedTemplateLiteral2);

var _templateObject = (0, _taggedTemplateLiteral3.default)(['\n  padding: 10px 0 10px ', 'px;\n  font-size: 11px;\n  border-bottom-color: ', ';\n  border-bottom-style: solid;\n  border-bottom-width: ', ';\n\n  .legend--layer_name {\n    font-size: 12px;\n    padding-right: ', 'px;\n    color: ', ';\n    font-weight: 500;\n  }\n  .legend--layer_type {\n    color: ', ';\n    font-weight: 500;\n    font-size: 11px;\n    padding-right: ', 'px;\n  }\n  \n  .legend--layer__title { \n    padding-right: ', 'px;\n  }\n  \n  .legend--layer_by {\n    color: ', ';\n  }\n\n  .legend--layer_color_field {\n    color: ', ';\n    font-weight: 500;\n  }\n\n  .legend--layer_color-legend {\n    margin-top: 6px;\n  }\n'], ['\n  padding: 10px 0 10px ', 'px;\n  font-size: 11px;\n  border-bottom-color: ', ';\n  border-bottom-style: solid;\n  border-bottom-width: ', ';\n\n  .legend--layer_name {\n    font-size: 12px;\n    padding-right: ', 'px;\n    color: ', ';\n    font-weight: 500;\n  }\n  .legend--layer_type {\n    color: ', ';\n    font-weight: 500;\n    font-size: 11px;\n    padding-right: ', 'px;\n  }\n  \n  .legend--layer__title { \n    padding-right: ', 'px;\n  }\n  \n  .legend--layer_by {\n    color: ', ';\n  }\n\n  .legend--layer_color_field {\n    color: ', ';\n    font-weight: 500;\n  }\n\n  .legend--layer_color-legend {\n    margin-top: 6px;\n  }\n']); // Copyright (c) 2018 Uber Technologies, Inc.
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

var _d3Color = require('d3-color');

var _colorLegend = require('../common/color-legend');

var _colorLegend2 = _interopRequireDefault(_colorLegend);

var _defaultSettings = require('../../constants/default-settings');

var _utils = require('../../utils/utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var StyledMapControlLegend = _styledComponents2.default.div(_templateObject, function (props) {
  return props.theme.mapControl.padding;
}, function (props) {
  return props.theme.panelBorderColor;
}, function (props) {
  return props.last ? 0 : '1px';
}, function (props) {
  return props.theme.mapControl.padding;
}, function (props) {
  return props.theme.textColorHl;
}, function (props) {
  return props.theme.subtextColor;
}, function (props) {
  return props.theme.mapControl.padding;
}, function (props) {
  return props.theme.mapControl.padding;
}, function (props) {
  return props.theme.subtextColor;
}, function (props) {
  return props.theme.textColor;
});

var VisualChannelMetric = function VisualChannelMetric(_ref) {
  var name = _ref.name;
  return _react2.default.createElement(
    'div',
    { className: 'legend--layer__title' },
    _react2.default.createElement(
      'span',
      { className: 'legend--layer_by' },
      'by '
    ),
    _react2.default.createElement(
      'span',
      { className: 'legend--layer_color_field' },
      name
    )
  );
};

var LayerSizeLegend = function LayerSizeLegend(_ref2) {
  var label = _ref2.label,
      name = _ref2.name;
  return _react2.default.createElement(
    'div',
    { className: 'legend--layer_size-schema' },
    _react2.default.createElement(
      'p',
      null,
      _react2.default.createElement(
        'span',
        { className: 'legend--layer_by' },
        label
      )
    ),
    _react2.default.createElement(VisualChannelMetric, { name: name })
  );
};

var propTypes = {
  layers: _propTypes2.default.array
};

var SingleColorLegend = function SingleColorLegend(_ref3) {
  var layer = _ref3.layer,
      width = _ref3.width;
  return _react2.default.createElement(_colorLegend2.default, {
    scaleType: 'ordinal',
    displayLabel: false,
    domain: [''],
    fieldType: null,
    range: [_d3Color.rgb.apply(undefined, (0, _toConsumableArray3.default)(layer.config.color)).toString()],
    width: width
  });
};

var MultiColorLegend = function MultiColorLegend(_ref4) {
  var layer = _ref4.layer,
      width = _ref4.width;
  var _layer$config = layer.config,
      visConfig = _layer$config.visConfig,
      colorField = _layer$config.colorField,
      colorScale = _layer$config.colorScale,
      colorDomain = _layer$config.colorDomain;


  return _react2.default.createElement(_colorLegend2.default, {
    scaleType: colorScale,
    displayLabel: true,
    domain: colorDomain,
    fieldType: colorField && colorField.type || 'real',
    range: visConfig.colorRange.colors,
    width: width
  });
};

var MapLegend = function MapLegend(_ref5) {
  var layers = _ref5.layers;
  return _react2.default.createElement(
    'div',
    null,
    layers.map(function (layer, index) {
      var colorChannelConfig = layer.getVisualChannelDescription('color');
      var enableColorBy = colorChannelConfig.measure;
      var width = _defaultSettings.DIMENSIONS.mapControl.width - 2 * _defaultSettings.DIMENSIONS.mapControl.padding;

      if (!layer.isValidToSave()) {
        return null;
      }

      return _react2.default.createElement(
        StyledMapControlLegend,
        {
          className: 'legend--layer',
          last: index === layers.length - 1,
          key: index
        },
        _react2.default.createElement(
          'div',
          { className: 'legend--layer_name' },
          layer.config.label
        ),
        _react2.default.createElement(
          'div',
          { className: 'legend--layer_type' },
          (0, _utils.capitalizeFirstLetter)(layer.name) + ' color'
        ),
        _react2.default.createElement(
          'div',
          { className: 'legend--layer_color-schema' },
          _react2.default.createElement(
            'div',
            null,
            enableColorBy ? _react2.default.createElement(VisualChannelMetric, { name: enableColorBy }) : null,
            _react2.default.createElement(
              'div',
              { className: 'legend--layer_color-legend' },
              enableColorBy ? _react2.default.createElement(MultiColorLegend, { layer: layer, width: width }) : _react2.default.createElement(SingleColorLegend, { layer: layer, width: width })
            )
          )
        ),
        Object.keys(layer.visualChannels).filter(function (k) {
          return k !== 'color';
        }).map(function (key) {
          var matchCondition = !layer.visualChannels[key].condition || layer.visualChannels[key].condition(layer.config);
          var enabled = layer.config[layer.visualChannels[key].field] || layer.visualChannels[key].defaultMeasure;

          var visualChannelDescription = layer.getVisualChannelDescription(key);
          if (matchCondition && enabled) {
            return _react2.default.createElement(LayerSizeLegend, {
              key: key,
              label: visualChannelDescription.label,
              name: visualChannelDescription.measure
            });
          }
          return null;
        })
      );
    })
  );
};

MapLegend.propTypes = propTypes;

exports.default = MapLegend;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL21hcC9tYXAtbGVnZW5kLmpzIl0sIm5hbWVzIjpbIlN0eWxlZE1hcENvbnRyb2xMZWdlbmQiLCJzdHlsZWQiLCJkaXYiLCJwcm9wcyIsInRoZW1lIiwibWFwQ29udHJvbCIsInBhZGRpbmciLCJwYW5lbEJvcmRlckNvbG9yIiwibGFzdCIsInRleHRDb2xvckhsIiwic3VidGV4dENvbG9yIiwidGV4dENvbG9yIiwiVmlzdWFsQ2hhbm5lbE1ldHJpYyIsIm5hbWUiLCJMYXllclNpemVMZWdlbmQiLCJsYWJlbCIsInByb3BUeXBlcyIsImxheWVycyIsIlByb3BUeXBlcyIsImFycmF5IiwiU2luZ2xlQ29sb3JMZWdlbmQiLCJsYXllciIsIndpZHRoIiwicmdiIiwiY29uZmlnIiwiY29sb3IiLCJ0b1N0cmluZyIsIk11bHRpQ29sb3JMZWdlbmQiLCJ2aXNDb25maWciLCJjb2xvckZpZWxkIiwiY29sb3JTY2FsZSIsImNvbG9yRG9tYWluIiwidHlwZSIsImNvbG9yUmFuZ2UiLCJjb2xvcnMiLCJNYXBMZWdlbmQiLCJtYXAiLCJpbmRleCIsImNvbG9yQ2hhbm5lbENvbmZpZyIsImdldFZpc3VhbENoYW5uZWxEZXNjcmlwdGlvbiIsImVuYWJsZUNvbG9yQnkiLCJtZWFzdXJlIiwiRElNRU5TSU9OUyIsImlzVmFsaWRUb1NhdmUiLCJsZW5ndGgiLCJPYmplY3QiLCJrZXlzIiwidmlzdWFsQ2hhbm5lbHMiLCJmaWx0ZXIiLCJrIiwibWF0Y2hDb25kaXRpb24iLCJrZXkiLCJjb25kaXRpb24iLCJlbmFibGVkIiwiZmllbGQiLCJkZWZhdWx0TWVhc3VyZSIsInZpc3VhbENoYW5uZWxEZXNjcmlwdGlvbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7bzFDQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOztBQUNBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFFQSxJQUFNQSx5QkFBeUJDLDJCQUFPQyxHQUFoQyxrQkFDbUI7QUFBQSxTQUFTQyxNQUFNQyxLQUFOLENBQVlDLFVBQVosQ0FBdUJDLE9BQWhDO0FBQUEsQ0FEbkIsRUFHbUI7QUFBQSxTQUFTSCxNQUFNQyxLQUFOLENBQVlHLGdCQUFyQjtBQUFBLENBSG5CLEVBS21CO0FBQUEsU0FBVUosTUFBTUssSUFBTixHQUFhLENBQWIsR0FBaUIsS0FBM0I7QUFBQSxDQUxuQixFQVNlO0FBQUEsU0FBU0wsTUFBTUMsS0FBTixDQUFZQyxVQUFaLENBQXVCQyxPQUFoQztBQUFBLENBVGYsRUFVTztBQUFBLFNBQVNILE1BQU1DLEtBQU4sQ0FBWUssV0FBckI7QUFBQSxDQVZQLEVBY087QUFBQSxTQUFTTixNQUFNQyxLQUFOLENBQVlNLFlBQXJCO0FBQUEsQ0FkUCxFQWlCZTtBQUFBLFNBQVNQLE1BQU1DLEtBQU4sQ0FBWUMsVUFBWixDQUF1QkMsT0FBaEM7QUFBQSxDQWpCZixFQXFCZTtBQUFBLFNBQVNILE1BQU1DLEtBQU4sQ0FBWUMsVUFBWixDQUF1QkMsT0FBaEM7QUFBQSxDQXJCZixFQXlCTztBQUFBLFNBQVNILE1BQU1DLEtBQU4sQ0FBWU0sWUFBckI7QUFBQSxDQXpCUCxFQTZCTztBQUFBLFNBQVNQLE1BQU1DLEtBQU4sQ0FBWU8sU0FBckI7QUFBQSxDQTdCUCxDQUFOOztBQXNDQSxJQUFNQyxzQkFBc0IsU0FBdEJBLG1CQUFzQjtBQUFBLE1BQUVDLElBQUYsUUFBRUEsSUFBRjtBQUFBLFNBQzFCO0FBQUE7QUFBQSxNQUFLLFdBQVUsc0JBQWY7QUFDRTtBQUFBO0FBQUEsUUFBTSxXQUFVLGtCQUFoQjtBQUFBO0FBQUEsS0FERjtBQUVFO0FBQUE7QUFBQSxRQUFNLFdBQVUsMkJBQWhCO0FBQTZDQTtBQUE3QztBQUZGLEdBRDBCO0FBQUEsQ0FBNUI7O0FBT0EsSUFBTUMsa0JBQWtCLFNBQWxCQSxlQUFrQjtBQUFBLE1BQUVDLEtBQUYsU0FBRUEsS0FBRjtBQUFBLE1BQVNGLElBQVQsU0FBU0EsSUFBVDtBQUFBLFNBQ3RCO0FBQUE7QUFBQSxNQUFLLFdBQVUsMkJBQWY7QUFDRTtBQUFBO0FBQUE7QUFDRTtBQUFBO0FBQUEsVUFBTSxXQUFVLGtCQUFoQjtBQUFvQ0U7QUFBcEM7QUFERixLQURGO0FBSUUsa0NBQUMsbUJBQUQsSUFBcUIsTUFBTUYsSUFBM0I7QUFKRixHQURzQjtBQUFBLENBQXhCOztBQVNBLElBQU1HLFlBQVk7QUFDaEJDLFVBQVFDLG9CQUFVQztBQURGLENBQWxCOztBQUlBLElBQU1DLG9CQUFvQixTQUFwQkEsaUJBQW9CO0FBQUEsTUFBRUMsS0FBRixTQUFFQSxLQUFGO0FBQUEsTUFBU0MsS0FBVCxTQUFTQSxLQUFUO0FBQUEsU0FDeEIsOEJBQUMscUJBQUQ7QUFDRSxlQUFVLFNBRFo7QUFFRSxrQkFBYyxLQUZoQjtBQUdFLFlBQVEsQ0FBQyxFQUFELENBSFY7QUFJRSxlQUFXLElBSmI7QUFLRSxXQUFPLENBQUNDLCtEQUFPRixNQUFNRyxNQUFOLENBQWFDLEtBQXBCLEdBQTJCQyxRQUEzQixFQUFELENBTFQ7QUFNRSxXQUFPSjtBQU5ULElBRHdCO0FBQUEsQ0FBMUI7O0FBV0EsSUFBTUssbUJBQW1CLFNBQW5CQSxnQkFBbUIsUUFBb0I7QUFBQSxNQUFsQk4sS0FBa0IsU0FBbEJBLEtBQWtCO0FBQUEsTUFBWEMsS0FBVyxTQUFYQSxLQUFXO0FBQUEsc0JBQ2NELE1BQU1HLE1BRHBCO0FBQUEsTUFDcENJLFNBRG9DLGlCQUNwQ0EsU0FEb0M7QUFBQSxNQUN6QkMsVUFEeUIsaUJBQ3pCQSxVQUR5QjtBQUFBLE1BQ2JDLFVBRGEsaUJBQ2JBLFVBRGE7QUFBQSxNQUNEQyxXQURDLGlCQUNEQSxXQURDOzs7QUFHM0MsU0FDRSw4QkFBQyxxQkFBRDtBQUNFLGVBQVdELFVBRGI7QUFFRSxzQkFGRjtBQUdFLFlBQVFDLFdBSFY7QUFJRSxlQUFZRixjQUFjQSxXQUFXRyxJQUExQixJQUFtQyxNQUpoRDtBQUtFLFdBQU9KLFVBQVVLLFVBQVYsQ0FBcUJDLE1BTDlCO0FBTUUsV0FBT1o7QUFOVCxJQURGO0FBVUQsQ0FiRDs7QUFlQSxJQUFNYSxZQUFZLFNBQVpBLFNBQVk7QUFBQSxNQUFFbEIsTUFBRixTQUFFQSxNQUFGO0FBQUEsU0FDaEI7QUFBQTtBQUFBO0FBQ0dBLFdBQU9tQixHQUFQLENBQVcsVUFBQ2YsS0FBRCxFQUFRZ0IsS0FBUixFQUFrQjtBQUM1QixVQUFNQyxxQkFBcUJqQixNQUFNa0IsMkJBQU4sQ0FBa0MsT0FBbEMsQ0FBM0I7QUFDQSxVQUFNQyxnQkFBZ0JGLG1CQUFtQkcsT0FBekM7QUFDQSxVQUFNbkIsUUFBUW9CLDRCQUFXckMsVUFBWCxDQUFzQmlCLEtBQXRCLEdBQThCLElBQUlvQiw0QkFBV3JDLFVBQVgsQ0FBc0JDLE9BQXRFOztBQUVBLFVBQUksQ0FBQ2UsTUFBTXNCLGFBQU4sRUFBTCxFQUE0QjtBQUMxQixlQUFPLElBQVA7QUFDRDs7QUFFRCxhQUNFO0FBQUMsOEJBQUQ7QUFBQTtBQUNFLHFCQUFVLGVBRFo7QUFFRSxnQkFBTU4sVUFBVXBCLE9BQU8yQixNQUFQLEdBQWdCLENBRmxDO0FBR0UsZUFBS1A7QUFIUDtBQUtFO0FBQUE7QUFBQSxZQUFLLFdBQVUsb0JBQWY7QUFBcUNoQixnQkFBTUcsTUFBTixDQUFhVDtBQUFsRCxTQUxGO0FBTUU7QUFBQTtBQUFBLFlBQUssV0FBVSxvQkFBZjtBQUF3Qyw0Q0FDdENNLE1BQU1SLElBRGdDLENBQXhDO0FBQUEsU0FORjtBQVNFO0FBQUE7QUFBQSxZQUFLLFdBQVUsNEJBQWY7QUFDRTtBQUFBO0FBQUE7QUFDRzJCLDRCQUNDLDhCQUFDLG1CQUFELElBQXFCLE1BQU1BLGFBQTNCLEdBREQsR0FFRyxJQUhOO0FBSUU7QUFBQTtBQUFBLGdCQUFLLFdBQVUsNEJBQWY7QUFDR0EsOEJBQ0MsOEJBQUMsZ0JBQUQsSUFBa0IsT0FBT25CLEtBQXpCLEVBQWdDLE9BQU9DLEtBQXZDLEdBREQsR0FFQyw4QkFBQyxpQkFBRCxJQUFtQixPQUFPRCxLQUExQixFQUFpQyxPQUFPQyxLQUF4QztBQUhKO0FBSkY7QUFERixTQVRGO0FBc0JHdUIsZUFBT0MsSUFBUCxDQUFZekIsTUFBTTBCLGNBQWxCLEVBQ0VDLE1BREYsQ0FDUztBQUFBLGlCQUFLQyxNQUFNLE9BQVg7QUFBQSxTQURULEVBRUViLEdBRkYsQ0FFTSxlQUFPO0FBQ1YsY0FBTWMsaUJBQ0osQ0FBQzdCLE1BQU0wQixjQUFOLENBQXFCSSxHQUFyQixFQUEwQkMsU0FBM0IsSUFDQS9CLE1BQU0wQixjQUFOLENBQXFCSSxHQUFyQixFQUEwQkMsU0FBMUIsQ0FBb0MvQixNQUFNRyxNQUExQyxDQUZGO0FBR0EsY0FBTTZCLFVBQ0poQyxNQUFNRyxNQUFOLENBQWFILE1BQU0wQixjQUFOLENBQXFCSSxHQUFyQixFQUEwQkcsS0FBdkMsS0FDQWpDLE1BQU0wQixjQUFOLENBQXFCSSxHQUFyQixFQUEwQkksY0FGNUI7O0FBSUEsY0FBTUMsMkJBQTJCbkMsTUFBTWtCLDJCQUFOLENBQWtDWSxHQUFsQyxDQUFqQztBQUNBLGNBQUlELGtCQUFrQkcsT0FBdEIsRUFBK0I7QUFDN0IsbUJBQ0UsOEJBQUMsZUFBRDtBQUNFLG1CQUFLRixHQURQO0FBRUUscUJBQU9LLHlCQUF5QnpDLEtBRmxDO0FBR0Usb0JBQU15Qyx5QkFBeUJmO0FBSGpDLGNBREY7QUFPRDtBQUNELGlCQUFPLElBQVA7QUFDRCxTQXJCRjtBQXRCSCxPQURGO0FBK0NELEtBeERBO0FBREgsR0FEZ0I7QUFBQSxDQUFsQjs7QUE4REFOLFVBQVVuQixTQUFWLEdBQXNCQSxTQUF0Qjs7a0JBRWVtQixTIiwiZmlsZSI6Im1hcC1sZWdlbmQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIDIwMTggVWJlciBUZWNobm9sb2dpZXMsIEluYy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4vLyBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4vLyBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4vLyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4vLyBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbi8vIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbi8vIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1Jcbi8vIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuLy8gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4vLyBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4vLyBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuLy8gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuLy8gVEhFIFNPRlRXQVJFLlxuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCBzdHlsZWQgZnJvbSAnc3R5bGVkLWNvbXBvbmVudHMnO1xuaW1wb3J0IHtyZ2J9IGZyb20gJ2QzLWNvbG9yJztcbmltcG9ydCBDb2xvckxlZ2VuZCBmcm9tICdjb21wb25lbnRzL2NvbW1vbi9jb2xvci1sZWdlbmQnO1xuaW1wb3J0IHtESU1FTlNJT05TfSBmcm9tICdjb25zdGFudHMvZGVmYXVsdC1zZXR0aW5ncyc7XG5pbXBvcnQge2NhcGl0YWxpemVGaXJzdExldHRlcn0gZnJvbSAndXRpbHMvdXRpbHMnO1xuXG5jb25zdCBTdHlsZWRNYXBDb250cm9sTGVnZW5kID0gc3R5bGVkLmRpdmBcbiAgcGFkZGluZzogMTBweCAwIDEwcHggJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5tYXBDb250cm9sLnBhZGRpbmd9cHg7XG4gIGZvbnQtc2l6ZTogMTFweDtcbiAgYm9yZGVyLWJvdHRvbS1jb2xvcjogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5wYW5lbEJvcmRlckNvbG9yfTtcbiAgYm9yZGVyLWJvdHRvbS1zdHlsZTogc29saWQ7XG4gIGJvcmRlci1ib3R0b20td2lkdGg6ICR7cHJvcHMgPT4gKHByb3BzLmxhc3QgPyAwIDogJzFweCcpfTtcblxuICAubGVnZW5kLS1sYXllcl9uYW1lIHtcbiAgICBmb250LXNpemU6IDEycHg7XG4gICAgcGFkZGluZy1yaWdodDogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5tYXBDb250cm9sLnBhZGRpbmd9cHg7XG4gICAgY29sb3I6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUudGV4dENvbG9ySGx9O1xuICAgIGZvbnQtd2VpZ2h0OiA1MDA7XG4gIH1cbiAgLmxlZ2VuZC0tbGF5ZXJfdHlwZSB7XG4gICAgY29sb3I6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUuc3VidGV4dENvbG9yfTtcbiAgICBmb250LXdlaWdodDogNTAwO1xuICAgIGZvbnQtc2l6ZTogMTFweDtcbiAgICBwYWRkaW5nLXJpZ2h0OiAke3Byb3BzID0+IHByb3BzLnRoZW1lLm1hcENvbnRyb2wucGFkZGluZ31weDtcbiAgfVxuICBcbiAgLmxlZ2VuZC0tbGF5ZXJfX3RpdGxlIHsgXG4gICAgcGFkZGluZy1yaWdodDogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5tYXBDb250cm9sLnBhZGRpbmd9cHg7XG4gIH1cbiAgXG4gIC5sZWdlbmQtLWxheWVyX2J5IHtcbiAgICBjb2xvcjogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5zdWJ0ZXh0Q29sb3J9O1xuICB9XG5cbiAgLmxlZ2VuZC0tbGF5ZXJfY29sb3JfZmllbGQge1xuICAgIGNvbG9yOiAke3Byb3BzID0+IHByb3BzLnRoZW1lLnRleHRDb2xvcn07XG4gICAgZm9udC13ZWlnaHQ6IDUwMDtcbiAgfVxuXG4gIC5sZWdlbmQtLWxheWVyX2NvbG9yLWxlZ2VuZCB7XG4gICAgbWFyZ2luLXRvcDogNnB4O1xuICB9XG5gO1xuXG5jb25zdCBWaXN1YWxDaGFubmVsTWV0cmljID0gKHtuYW1lfSkgPT4gKFxuICA8ZGl2IGNsYXNzTmFtZT1cImxlZ2VuZC0tbGF5ZXJfX3RpdGxlXCI+XG4gICAgPHNwYW4gY2xhc3NOYW1lPVwibGVnZW5kLS1sYXllcl9ieVwiPmJ5IDwvc3Bhbj5cbiAgICA8c3BhbiBjbGFzc05hbWU9XCJsZWdlbmQtLWxheWVyX2NvbG9yX2ZpZWxkXCI+e25hbWV9PC9zcGFuPlxuICA8L2Rpdj5cbik7XG5cbmNvbnN0IExheWVyU2l6ZUxlZ2VuZCA9ICh7bGFiZWwsIG5hbWV9KSA9PiAoXG4gIDxkaXYgY2xhc3NOYW1lPVwibGVnZW5kLS1sYXllcl9zaXplLXNjaGVtYVwiPlxuICAgIDxwPlxuICAgICAgPHNwYW4gY2xhc3NOYW1lPVwibGVnZW5kLS1sYXllcl9ieVwiPntsYWJlbH08L3NwYW4+XG4gICAgPC9wPlxuICAgIDxWaXN1YWxDaGFubmVsTWV0cmljIG5hbWU9e25hbWV9IC8+XG4gIDwvZGl2PlxuKTtcblxuY29uc3QgcHJvcFR5cGVzID0ge1xuICBsYXllcnM6IFByb3BUeXBlcy5hcnJheVxufTtcblxuY29uc3QgU2luZ2xlQ29sb3JMZWdlbmQgPSAoe2xheWVyLCB3aWR0aH0pID0+IChcbiAgPENvbG9yTGVnZW5kXG4gICAgc2NhbGVUeXBlPVwib3JkaW5hbFwiXG4gICAgZGlzcGxheUxhYmVsPXtmYWxzZX1cbiAgICBkb21haW49e1snJ119XG4gICAgZmllbGRUeXBlPXtudWxsfVxuICAgIHJhbmdlPXtbcmdiKC4uLmxheWVyLmNvbmZpZy5jb2xvcikudG9TdHJpbmcoKV19XG4gICAgd2lkdGg9e3dpZHRofVxuICAvPlxuKTtcblxuY29uc3QgTXVsdGlDb2xvckxlZ2VuZCA9ICh7bGF5ZXIsIHdpZHRofSkgPT4ge1xuICBjb25zdCB7dmlzQ29uZmlnLCBjb2xvckZpZWxkLCBjb2xvclNjYWxlLCBjb2xvckRvbWFpbn0gPSBsYXllci5jb25maWc7XG5cbiAgcmV0dXJuIChcbiAgICA8Q29sb3JMZWdlbmRcbiAgICAgIHNjYWxlVHlwZT17Y29sb3JTY2FsZX1cbiAgICAgIGRpc3BsYXlMYWJlbFxuICAgICAgZG9tYWluPXtjb2xvckRvbWFpbn1cbiAgICAgIGZpZWxkVHlwZT17KGNvbG9yRmllbGQgJiYgY29sb3JGaWVsZC50eXBlKSB8fCAncmVhbCd9XG4gICAgICByYW5nZT17dmlzQ29uZmlnLmNvbG9yUmFuZ2UuY29sb3JzfVxuICAgICAgd2lkdGg9e3dpZHRofVxuICAgIC8+XG4gICk7XG59O1xuXG5jb25zdCBNYXBMZWdlbmQgPSAoe2xheWVyc30pID0+IChcbiAgPGRpdj5cbiAgICB7bGF5ZXJzLm1hcCgobGF5ZXIsIGluZGV4KSA9PiB7XG4gICAgICBjb25zdCBjb2xvckNoYW5uZWxDb25maWcgPSBsYXllci5nZXRWaXN1YWxDaGFubmVsRGVzY3JpcHRpb24oJ2NvbG9yJyk7XG4gICAgICBjb25zdCBlbmFibGVDb2xvckJ5ID0gY29sb3JDaGFubmVsQ29uZmlnLm1lYXN1cmU7XG4gICAgICBjb25zdCB3aWR0aCA9IERJTUVOU0lPTlMubWFwQ29udHJvbC53aWR0aCAtIDIgKiBESU1FTlNJT05TLm1hcENvbnRyb2wucGFkZGluZztcblxuICAgICAgaWYgKCFsYXllci5pc1ZhbGlkVG9TYXZlKCkpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxTdHlsZWRNYXBDb250cm9sTGVnZW5kXG4gICAgICAgICAgY2xhc3NOYW1lPVwibGVnZW5kLS1sYXllclwiXG4gICAgICAgICAgbGFzdD17aW5kZXggPT09IGxheWVycy5sZW5ndGggLSAxfVxuICAgICAgICAgIGtleT17aW5kZXh9XG4gICAgICAgID5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImxlZ2VuZC0tbGF5ZXJfbmFtZVwiPntsYXllci5jb25maWcubGFiZWx9PC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJsZWdlbmQtLWxheWVyX3R5cGVcIj57YCR7Y2FwaXRhbGl6ZUZpcnN0TGV0dGVyKFxuICAgICAgICAgICAgbGF5ZXIubmFtZVxuICAgICAgICAgICl9IGNvbG9yYH08L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImxlZ2VuZC0tbGF5ZXJfY29sb3Itc2NoZW1hXCI+XG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICB7ZW5hYmxlQ29sb3JCeSA/IChcbiAgICAgICAgICAgICAgICA8VmlzdWFsQ2hhbm5lbE1ldHJpYyBuYW1lPXtlbmFibGVDb2xvckJ5fSAvPlxuICAgICAgICAgICAgICApIDogbnVsbH1cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJsZWdlbmQtLWxheWVyX2NvbG9yLWxlZ2VuZFwiPlxuICAgICAgICAgICAgICAgIHtlbmFibGVDb2xvckJ5ID9cbiAgICAgICAgICAgICAgICAgIDxNdWx0aUNvbG9yTGVnZW5kIGxheWVyPXtsYXllcn0gd2lkdGg9e3dpZHRofS8+IDpcbiAgICAgICAgICAgICAgICAgIDxTaW5nbGVDb2xvckxlZ2VuZCBsYXllcj17bGF5ZXJ9IHdpZHRoPXt3aWR0aH0vPlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICB7T2JqZWN0LmtleXMobGF5ZXIudmlzdWFsQ2hhbm5lbHMpXG4gICAgICAgICAgICAuZmlsdGVyKGsgPT4gayAhPT0gJ2NvbG9yJylcbiAgICAgICAgICAgIC5tYXAoa2V5ID0+IHtcbiAgICAgICAgICAgICAgY29uc3QgbWF0Y2hDb25kaXRpb24gPVxuICAgICAgICAgICAgICAgICFsYXllci52aXN1YWxDaGFubmVsc1trZXldLmNvbmRpdGlvbiB8fFxuICAgICAgICAgICAgICAgIGxheWVyLnZpc3VhbENoYW5uZWxzW2tleV0uY29uZGl0aW9uKGxheWVyLmNvbmZpZyk7XG4gICAgICAgICAgICAgIGNvbnN0IGVuYWJsZWQgPVxuICAgICAgICAgICAgICAgIGxheWVyLmNvbmZpZ1tsYXllci52aXN1YWxDaGFubmVsc1trZXldLmZpZWxkXSB8fFxuICAgICAgICAgICAgICAgIGxheWVyLnZpc3VhbENoYW5uZWxzW2tleV0uZGVmYXVsdE1lYXN1cmU7XG5cbiAgICAgICAgICAgICAgY29uc3QgdmlzdWFsQ2hhbm5lbERlc2NyaXB0aW9uID0gbGF5ZXIuZ2V0VmlzdWFsQ2hhbm5lbERlc2NyaXB0aW9uKGtleSk7XG4gICAgICAgICAgICAgIGlmIChtYXRjaENvbmRpdGlvbiAmJiBlbmFibGVkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICAgIDxMYXllclNpemVMZWdlbmRcbiAgICAgICAgICAgICAgICAgICAga2V5PXtrZXl9XG4gICAgICAgICAgICAgICAgICAgIGxhYmVsPXt2aXN1YWxDaGFubmVsRGVzY3JpcHRpb24ubGFiZWx9XG4gICAgICAgICAgICAgICAgICAgIG5hbWU9e3Zpc3VhbENoYW5uZWxEZXNjcmlwdGlvbi5tZWFzdXJlfVxuICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgfSl9XG4gICAgICAgIDwvU3R5bGVkTWFwQ29udHJvbExlZ2VuZD5cbiAgICAgICk7XG4gICAgfSl9XG4gIDwvZGl2PlxuKTtcblxuTWFwTGVnZW5kLnByb3BUeXBlcyA9IHByb3BUeXBlcztcblxuZXhwb3J0IGRlZmF1bHQgTWFwTGVnZW5kO1xuIl19