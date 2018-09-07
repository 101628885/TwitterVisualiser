'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

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

var _class, _temp2;

var _templateObject = (0, _taggedTemplateLiteral3.default)(['\n  ', ';\n\n  max-height: 150px;\n  overflow-y: auto;\n\n  svg {\n    text {\n      font-size: 9px;\n      fill: ', ';\n    }\n  }\n'], ['\n  ', ';\n\n  max-height: 150px;\n  overflow-y: auto;\n\n  svg {\n    text {\n      font-size: 9px;\n      fill: ', ';\n    }\n  }\n']); // Copyright (c) 2018 Uber Technologies, Inc.
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

var _reselect = require('reselect');

var _d3Format = require('d3-format');

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _defaultSettings = require('../../constants/default-settings');

var _filterUtils = require('../../utils/filter-utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ROW_H = 10;
var GAP = 4;
var RECT_W = 20;

var StyledLegend = _styledComponents2.default.div(_templateObject, function (props) {
  return props.theme.sidePanelScrollBar;
}, function (props) {
  return props.theme.textColor;
});

var defaultFormat = function defaultFormat(d) {
  return d;
};

var getTimeLabelFormat = function getTimeLabelFormat(domain) {
  var formatter = (0, _filterUtils.getTimeWidgetHintFormatter)(domain);
  return function (val) {
    return _moment2.default.utc(val).format(formatter);
  };
};

var getNumericLabelFormat = function getNumericLabelFormat(domain) {
  var diff = domain[1] - domain[0];

  if (diff < 10) {
    return (0, _d3Format.format)('.2f');
  }

  return (0, _d3Format.format)('.1f');
};

var getQuantLabelFormat = function getQuantLabelFormat(domain, fieldType) {
  // quant scale can only be assigned to linear Fields: real, timestamp, integer
  return fieldType === _defaultSettings.ALL_FIELD_TYPES.timestamp ? getTimeLabelFormat(domain) : !fieldType ? defaultFormat : getNumericLabelFormat(domain);
};

var getOrdinalLegends = function getOrdinalLegends(scale) {
  var domain = scale.domain();
  return {
    data: domain.map(scale),
    labels: domain
  };
};

var getQuantLegends = function getQuantLegends(scale, labelFormat) {
  var labels = scale.range().map(function (d) {
    var invert = scale.invertExtent(d);
    return labelFormat(invert[0]) + ' to ' + labelFormat(invert[1]);
  });

  return {
    data: scale.range(),
    labels: labels
  };
};

var ColorLegend = (_temp2 = _class = function (_Component) {
  (0, _inherits3.default)(ColorLegend, _Component);

  function ColorLegend() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, ColorLegend);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = ColorLegend.__proto__ || Object.getPrototypeOf(ColorLegend)).call.apply(_ref, [this].concat(args))), _this), _this.domainSelector = function (props) {
      return props.domain;
    }, _this.rangeSelector = function (props) {
      return props.range;
    }, _this.labelFormatSelector = function (props) {
      return props.labelFormat;
    }, _this.scaleTypeSelector = function (props) {
      return props.scaleType;
    }, _this.fieldTypeSelector = function (props) {
      return props.fieldType;
    }, _this.legendsSelector = (0, _reselect.createSelector)(_this.domainSelector, _this.rangeSelector, _this.scaleTypeSelector, _this.labelFormatSelector, _this.fieldTypeSelector, function (domain, range, scaleType, labelFormat, fieldType) {
      var scaleFunction = _defaultSettings.SCALE_FUNC[scaleType];
      // color scale can only be quantize, quantile or ordinal
      var scale = scaleFunction().domain(domain).range(range);

      if (scaleType === _defaultSettings.SCALE_TYPES.ordinal) {
        return getOrdinalLegends(scale);
      }

      var formatLabel = labelFormat || getQuantLabelFormat(scale.domain(), fieldType);

      return getQuantLegends(scale, formatLabel);
    }), _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(ColorLegend, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          width = _props.width,
          scaleType = _props.scaleType,
          domain = _props.domain,
          range = _props.range,
          _props$displayLabel = _props.displayLabel,
          displayLabel = _props$displayLabel === undefined ? true : _props$displayLabel;


      if (!domain || !range || !scaleType) {
        return null;
      }

      var legends = this.legendsSelector(this.props);
      var height = legends.data.length * (ROW_H + GAP);

      return _react2.default.createElement(
        StyledLegend,
        null,
        _react2.default.createElement(
          'svg',
          { width: width - 24, height: height },
          legends.data.map(function (color, idx) {
            return _react2.default.createElement(LegendRow, {
              key: idx,
              label: legends.labels[idx],
              displayLabel: displayLabel,
              color: color,
              idx: idx
            });
          })
        )
      );
    }
  }]);
  return ColorLegend;
}(_react.Component), _class.propTypes = {
  width: _propTypes2.default.number.isRequired,
  scaleType: _propTypes2.default.string,
  domain: _propTypes2.default.oneOfType([_propTypes2.default.array, _propTypes2.default.object]),
  fieldType: _propTypes2.default.string,
  range: _propTypes2.default.arrayOf(_propTypes2.default.string),
  labelFormat: _propTypes2.default.func
}, _temp2);
exports.default = ColorLegend;


var LegendRow = function LegendRow(_ref2) {
  var _ref2$label = _ref2.label,
      label = _ref2$label === undefined ? '' : _ref2$label,
      displayLabel = _ref2.displayLabel,
      color = _ref2.color,
      idx = _ref2.idx;
  return _react2.default.createElement(
    'g',
    { transform: 'translate(0, ' + idx * (ROW_H + GAP) + ')' },
    _react2.default.createElement('rect', { width: RECT_W, height: ROW_H, style: { fill: color } }),
    _react2.default.createElement(
      'text',
      { x: RECT_W + 8, y: ROW_H - 1 },
      displayLabel ? label.toString() : ''
    )
  );
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2NvbW1vbi9jb2xvci1sZWdlbmQuanMiXSwibmFtZXMiOlsiUk9XX0giLCJHQVAiLCJSRUNUX1ciLCJTdHlsZWRMZWdlbmQiLCJzdHlsZWQiLCJkaXYiLCJwcm9wcyIsInRoZW1lIiwic2lkZVBhbmVsU2Nyb2xsQmFyIiwidGV4dENvbG9yIiwiZGVmYXVsdEZvcm1hdCIsImQiLCJnZXRUaW1lTGFiZWxGb3JtYXQiLCJmb3JtYXR0ZXIiLCJkb21haW4iLCJtb21lbnQiLCJ1dGMiLCJ2YWwiLCJmb3JtYXQiLCJnZXROdW1lcmljTGFiZWxGb3JtYXQiLCJkaWZmIiwiZ2V0UXVhbnRMYWJlbEZvcm1hdCIsImZpZWxkVHlwZSIsIkFMTF9GSUVMRF9UWVBFUyIsInRpbWVzdGFtcCIsImdldE9yZGluYWxMZWdlbmRzIiwic2NhbGUiLCJkYXRhIiwibWFwIiwibGFiZWxzIiwiZ2V0UXVhbnRMZWdlbmRzIiwibGFiZWxGb3JtYXQiLCJyYW5nZSIsImludmVydCIsImludmVydEV4dGVudCIsIkNvbG9yTGVnZW5kIiwiZG9tYWluU2VsZWN0b3IiLCJyYW5nZVNlbGVjdG9yIiwibGFiZWxGb3JtYXRTZWxlY3RvciIsInNjYWxlVHlwZVNlbGVjdG9yIiwic2NhbGVUeXBlIiwiZmllbGRUeXBlU2VsZWN0b3IiLCJsZWdlbmRzU2VsZWN0b3IiLCJzY2FsZUZ1bmN0aW9uIiwiU0NBTEVfRlVOQyIsIlNDQUxFX1RZUEVTIiwib3JkaW5hbCIsImZvcm1hdExhYmVsIiwid2lkdGgiLCJkaXNwbGF5TGFiZWwiLCJsZWdlbmRzIiwiaGVpZ2h0IiwibGVuZ3RoIiwiY29sb3IiLCJpZHgiLCJDb21wb25lbnQiLCJwcm9wVHlwZXMiLCJQcm9wVHlwZXMiLCJudW1iZXIiLCJpc1JlcXVpcmVkIiwic3RyaW5nIiwib25lT2ZUeXBlIiwiYXJyYXkiLCJvYmplY3QiLCJhcnJheU9mIiwiZnVuYyIsIkxlZ2VuZFJvdyIsImxhYmVsIiwiZmlsbCIsInRv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Q0FBaEM7QUFDR2lELHFCQUFla0IsTUFBTUUsUUFBTixFQUFmLEdBQWtDO0FBRHJDO0FBRkYsR0FEZ0I7QUFBQSxDQUFsQiIsImZpbGUiOiJjb2xvci1sZWdlbmQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIDIwMTggVWJlciBUZWNobm9sb2dpZXMsIEluYy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4vLyBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4vLyBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4vLyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4vLyBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbi8vIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbi8vIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1Jcbi8vIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuLy8gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4vLyBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4vLyBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuLy8gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuLy8gVEhFIFNPRlRXQVJFLlxuXG5pbXBvcnQgUmVhY3QsIHtDb21wb25lbnR9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgc3R5bGVkIGZyb20gJ3N0eWxlZC1jb21wb25lbnRzJztcbmltcG9ydCB7Y3JlYXRlU2VsZWN0b3J9IGZyb20gJ3Jlc2VsZWN0JztcbmltcG9ydCB7Zm9ybWF0fSBmcm9tICdkMy1mb3JtYXQnO1xuaW1wb3J0IG1vbWVudCBmcm9tICdtb21lbnQnO1xuaW1wb3J0IHtcbiAgU0NBTEVfVFlQRVMsXG4gIFNDQUxFX0ZVTkMsXG4gIEFMTF9GSUVMRF9UWVBFU1xufSBmcm9tICdjb25zdGFudHMvZGVmYXVsdC1zZXR0aW5ncyc7XG5pbXBvcnQge2dldFRpbWVXaWRnZXRIaW50Rm9ybWF0dGVyfSBmcm9tICd1dGlscy9maWx0ZXItdXRpbHMnO1xuXG5jb25zdCBST1dfSCA9IDEwO1xuY29uc3QgR0FQID0gNDtcbmNvbnN0IFJFQ1RfVyA9IDIwO1xuXG5jb25zdCBTdHlsZWRMZWdlbmQgPSBzdHlsZWQuZGl2YFxuICAke3Byb3BzID0+IHByb3BzLnRoZW1lLnNpZGVQYW5lbFNjcm9sbEJhcn07XG5cbiAgbWF4LWhlaWdodDogMTUwcHg7XG4gIG92ZXJmbG93LXk6IGF1dG87XG5cbiAgc3ZnIHtcbiAgICB0ZXh0IHtcbiAgICAgIGZvbnQtc2l6ZTogOXB4O1xuICAgICAgZmlsbDogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS50ZXh0Q29sb3J9O1xuICAgIH1cbiAgfVxuYDtcblxuY29uc3QgZGVmYXVsdEZvcm1hdCA9IGQgPT4gZDtcblxuY29uc3QgZ2V0VGltZUxhYmVsRm9ybWF0ID0gZG9tYWluID0+IHtcbiAgY29uc3QgZm9ybWF0dGVyID0gZ2V0VGltZVdpZGdldEhpbnRGb3JtYXR0ZXIoZG9tYWluKTtcbiAgcmV0dXJuIHZhbCA9PiBtb21lbnQudXRjKHZhbCkuZm9ybWF0KGZvcm1hdHRlcik7XG59O1xuXG5jb25zdCBnZXROdW1lcmljTGFiZWxGb3JtYXQgPSBkb21haW4gPT4ge1xuICBjb25zdCBkaWZmID0gZG9tYWluWzFdIC0gZG9tYWluWzBdO1xuXG4gIGlmIChkaWZmIDwgMTApIHtcbiAgICByZXR1cm4gZm9ybWF0KCcuMmYnKTtcbiAgfVxuXG4gIHJldHVybiBmb3JtYXQoJy4xZicpO1xufTtcblxuY29uc3QgZ2V0UXVhbnRMYWJlbEZvcm1hdCA9IChkb21haW4sIGZpZWxkVHlwZSkgPT4ge1xuICAvLyBxdWFudCBzY2FsZSBjYW4gb25seSBiZSBhc3NpZ25lZCB0byBsaW5lYXIgRmllbGRzOiByZWFsLCB0aW1lc3RhbXAsIGludGVnZXJcbiAgcmV0dXJuIGZpZWxkVHlwZSA9PT0gQUxMX0ZJRUxEX1RZUEVTLnRpbWVzdGFtcFxuICAgID8gZ2V0VGltZUxhYmVsRm9ybWF0KGRvbWFpbilcbiAgICA6ICFmaWVsZFR5cGUgPyBkZWZhdWx0Rm9ybWF0IDogZ2V0TnVtZXJpY0xhYmVsRm9ybWF0KGRvbWFpbik7XG59O1xuXG5jb25zdCBnZXRPcmRpbmFsTGVnZW5kcyA9IHNjYWxlID0+IHtcbiAgY29uc3QgZG9tYWluID0gc2NhbGUuZG9tYWluKCk7XG4gIHJldHVybiB7XG4gICAgZGF0YTogZG9tYWluLm1hcChzY2FsZSksXG4gICAgbGFiZWxzOiBkb21haW5cbiAgfTtcbn07XG5cbmNvbnN0IGdldFF1YW50TGVnZW5kcyA9IChzY2FsZSwgbGFiZWxGb3JtYXQpID0+IHtcbiAgY29uc3QgbGFiZWxzID0gc2NhbGUucmFuZ2UoKS5tYXAoZCA9PiB7XG4gICAgY29uc3QgaW52ZXJ0ID0gc2NhbGUuaW52ZXJ0RXh0ZW50KGQpO1xuICAgIHJldHVybiBgJHtsYWJlbEZvcm1hdChpbnZlcnRbMF0pfSB0byAke2xhYmVsRm9ybWF0KGludmVydFsxXSl9YDtcbiAgfSk7XG5cbiAgcmV0dXJuIHtcbiAgICBkYXRhOiBzY2FsZS5yYW5nZSgpLFxuICAgIGxhYmVsc1xuICB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29sb3JMZWdlbmQgZXh0ZW5kcyBDb21wb25lbnQge1xuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIHdpZHRoOiBQcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXG4gICAgc2NhbGVUeXBlOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGRvbWFpbjogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLmFycmF5LCBQcm9wVHlwZXMub2JqZWN0XSksXG4gICAgZmllbGRUeXBlOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIHJhbmdlOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMuc3RyaW5nKSxcbiAgICBsYWJlbEZvcm1hdDogUHJvcFR5cGVzLmZ1bmNcbiAgfTtcblxuICBkb21haW5TZWxlY3RvciA9IHByb3BzID0+IHByb3BzLmRvbWFpbjtcbiAgcmFuZ2VTZWxlY3RvciA9IHByb3BzID0+IHByb3BzLnJhbmdlO1xuICBsYWJlbEZvcm1hdFNlbGVjdG9yID0gcHJvcHMgPT4gcHJvcHMubGFiZWxGb3JtYXQ7XG4gIHNjYWxlVHlwZVNlbGVjdG9yID0gcHJvcHMgPT4gcHJvcHMuc2NhbGVUeXBlO1xuICBmaWVsZFR5cGVTZWxlY3RvciA9IHByb3BzID0+IHByb3BzLmZpZWxkVHlwZTtcblxuICBsZWdlbmRzU2VsZWN0b3IgPSBjcmVhdGVTZWxlY3RvcihcbiAgICB0aGlzLmRvbWFpblNlbGVjdG9yLFxuICAgIHRoaXMucmFuZ2VTZWxlY3RvcixcbiAgICB0aGlzLnNjYWxlVHlwZVNlbGVjdG9yLFxuICAgIHRoaXMubGFiZWxGb3JtYXRTZWxlY3RvcixcbiAgICB0aGlzLmZpZWxkVHlwZVNlbGVjdG9yLFxuICAgIChkb21haW4sIHJhbmdlLCBzY2FsZVR5cGUsIGxhYmVsRm9ybWF0LCBmaWVsZFR5cGUpID0+IHtcbiAgICAgIGNvbnN0IHNjYWxlRnVuY3Rpb24gPSBTQ0FMRV9GVU5DW3NjYWxlVHlwZV07XG4gICAgICAvLyBjb2xvciBzY2FsZSBjYW4gb25seSBiZSBxdWFudGl6ZSwgcXVhbnRpbGUgb3Igb3JkaW5hbFxuICAgICAgY29uc3Qgc2NhbGUgPSBzY2FsZUZ1bmN0aW9uKClcbiAgICAgICAgLmRvbWFpbihkb21haW4pXG4gICAgICAgIC5yYW5nZShyYW5nZSk7XG5cbiAgICAgIGlmIChzY2FsZVR5cGUgPT09IFNDQUxFX1RZUEVTLm9yZGluYWwpIHtcbiAgICAgICAgcmV0dXJuIGdldE9yZGluYWxMZWdlbmRzKHNjYWxlKTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgZm9ybWF0TGFiZWwgPVxuICAgICAgICBsYWJlbEZvcm1hdCB8fCBnZXRRdWFudExhYmVsRm9ybWF0KHNjYWxlLmRvbWFpbigpLCBmaWVsZFR5cGUpO1xuXG4gICAgICByZXR1cm4gZ2V0UXVhbnRMZWdlbmRzKHNjYWxlLCBmb3JtYXRMYWJlbCk7XG4gICAgfVxuICApO1xuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7d2lkdGgsIHNjYWxlVHlwZSwgZG9tYWluLCByYW5nZSwgZGlzcGxheUxhYmVsID0gdHJ1ZX0gPSB0aGlzLnByb3BzO1xuXG4gICAgaWYgKCFkb21haW4gfHwgIXJhbmdlIHx8ICFzY2FsZVR5cGUpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0IGxlZ2VuZHMgPSB0aGlzLmxlZ2VuZHNTZWxlY3Rvcih0aGlzLnByb3BzKTtcbiAgICBjb25zdCBoZWlnaHQgPSBsZWdlbmRzLmRhdGEubGVuZ3RoICogKFJPV19IICsgR0FQKTtcblxuICAgIHJldHVybiAoXG4gICAgICA8U3R5bGVkTGVnZW5kPlxuICAgICAgICA8c3ZnIHdpZHRoPXt3aWR0aCAtIDI0fSBoZWlnaHQ9e2hlaWdodH0+XG4gICAgICAgICAge2xlZ2VuZHMuZGF0YS5tYXAoKGNvbG9yLCBpZHgpID0+IChcbiAgICAgICAgICAgIDxMZWdlbmRSb3dcbiAgICAgICAgICAgICAga2V5PXtpZHh9XG4gICAgICAgICAgICAgIGxhYmVsPXtsZWdlbmRzLmxhYmVsc1tpZHhdfVxuICAgICAgICAgICAgICBkaXNwbGF5TGFiZWw9e2Rpc3BsYXlMYWJlbH1cbiAgICAgICAgICAgICAgY29sb3I9e2NvbG9yfVxuICAgICAgICAgICAgICBpZHg9e2lkeH1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgKSl9XG4gICAgICAgIDwvc3ZnPlxuICAgICAgPC9TdHlsZWRMZWdlbmQ+XG4gICAgKTtcbiAgfVxufVxuXG5jb25zdCBMZWdlbmRSb3cgPSAoe2xhYmVsID0gJycsIGRpc3BsYXlMYWJlbCwgY29sb3IsIGlkeH0pID0+IChcbiAgPGcgdHJhbnNmb3JtPXtgdHJhbnNsYXRlKDAsICR7aWR4ICogKFJPV19IICsgR0FQKX0pYH0+XG4gICAgPHJlY3Qgd2lkdGg9e1JFQ1RfV30gaGVpZ2h0PXtST1dfSH0gc3R5bGU9e3tmaWxsOiBjb2xvcn19IC8+XG4gICAgPHRleHQgeD17UkVDVF9XICsgOH0geT17Uk9XX0ggLSAxfT5cbiAgICAgIHtkaXNwbGF5TGFiZWwgPyBsYWJlbC50b1N0cmluZygpIDogJyd9XG4gICAgPC90ZXh0PlxuICA8L2c+XG4pO1xuIl19