'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MapPopover = undefined;

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

var _taggedTemplateLiteral2 = require('babel-runtime/helpers/taggedTemplateLiteral');

var _taggedTemplateLiteral3 = _interopRequireDefault(_taggedTemplateLiteral2);

var _class, _temp;

var _templateObject = (0, _taggedTemplateLiteral3.default)(['\n  ', '\n  font-size: 11px;\n  font-weight: 500;\n  background-color: ', ';\n  color: ', ';\n  z-index: 1001;\n  position: absolute;\n  overflow-x: auto;\n\n  .gutter {\n    height: 6px;\n  }\n\n  table {\n    margin: 2px 12px 12px 12px;\n    width: auto;\n\n    tbody {\n      border-top: transparent;\n      border-bottom: transparent;\n    }\n\n    td {\n      border-color: transparent;\n      padding: 4px;\n      color: ', ';\n    }\n\n    td.row__value {\n      text-align: right;\n      font-weight: 500;\n      color: ', ';\n    }\n  }\n'], ['\n  ', '\n  font-size: 11px;\n  font-weight: 500;\n  background-color: ', ';\n  color: ', ';\n  z-index: 1001;\n  position: absolute;\n  overflow-x: auto;\n\n  .gutter {\n    height: 6px;\n  }\n\n  table {\n    margin: 2px 12px 12px 12px;\n    width: auto;\n\n    tbody {\n      border-top: transparent;\n      border-bottom: transparent;\n    }\n\n    td {\n      border-color: transparent;\n      padding: 4px;\n      color: ', ';\n    }\n\n    td.row__value {\n      text-align: right;\n      font-weight: 500;\n      color: ', ';\n    }\n  }\n']),
    _templateObject2 = (0, _taggedTemplateLiteral3.default)(['\n  position: absolute;\n  left: 50%;\n  transform: rotate(30deg);\n  top: 10px;\n  color: ', ';\n\n  :hover {\n    cursor: pointer;\n    color: ', ';\n  }\n'], ['\n  position: absolute;\n  left: 50%;\n  transform: rotate(30deg);\n  top: 10px;\n  color: ', ';\n\n  :hover {\n    cursor: pointer;\n    color: ', ';\n  }\n']),
    _templateObject3 = (0, _taggedTemplateLiteral3.default)(['\n  color: ', ';\n  font-size: 12px;\n  letter-spacing: 0.43px;\n  text-transform: capitalize;\n  padding-left: 14px;\n  margin-top: 12px;\n\n  svg {\n    margin-right: 4px;\n  }\n'], ['\n  color: ', ';\n  font-size: 12px;\n  letter-spacing: 0.43px;\n  text-transform: capitalize;\n  padding-left: 14px;\n  margin-top: 12px;\n\n  svg {\n    margin-right: 4px;\n  }\n']); // Copyright (c) 2018 Uber Technologies, Inc.
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

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _styledComponents3 = require('../common/styled-components');

var _icons = require('../common/icons');

var _defaultSettings = require('../../constants/default-settings');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MAX_WIDTH = 400;
var MAX_HEIGHT = 600;

var StyledMapPopover = _styledComponents2.default.div(_templateObject, function (props) {
  return props.theme.scrollBar;
}, function (props) {
  return props.theme.panelBackground;
}, function (props) {
  return props.theme.textColor;
}, function (props) {
  return props.theme.textColor;
}, function (props) {
  return props.theme.textColorHl;
});

var StyledPin = _styledComponents2.default.div(_templateObject2, function (props) {
  return props.theme.primaryBtnBgd;
}, function (props) {
  return props.theme.linkBtnColor;
});

var StyledLayerName = _styledComponents3.CenterFlexbox.extend(_templateObject3, function (props) {
  return props.theme.textColorHl;
});

var MapPopover = exports.MapPopover = (_temp = _class = function (_Component) {
  (0, _inherits3.default)(MapPopover, _Component);

  function MapPopover(props) {
    (0, _classCallCheck3.default)(this, MapPopover);

    var _this = (0, _possibleConstructorReturn3.default)(this, (MapPopover.__proto__ || Object.getPrototypeOf(MapPopover)).call(this, props));

    _this.state = {
      isMouseOver: false,
      width: 380,
      height: 160
    };
    return _this;
  }

  (0, _createClass3.default)(MapPopover, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this._setContainerSize();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      this._setContainerSize();
    }
  }, {
    key: '_setContainerSize',
    value: function _setContainerSize() {
      var node = this.popover;
      if (!node) {
        return;
      }

      var width = Math.min(node.scrollWidth, MAX_WIDTH);
      var height = Math.min(node.scrollHeight, MAX_HEIGHT);

      if (width !== this.state.width || height !== this.state.height) {
        this.setState({ width: width, height: height });
      }
    }
  }, {
    key: '_getPosition',
    value: function _getPosition(x, y) {
      var topOffset = 30;
      var leftOffset = 30;
      var mapState = this.props.mapState;
      var _state = this.state,
          width = _state.width,
          height = _state.height;

      var pos = {};
      if (x + leftOffset + width > mapState.width) {
        pos.right = mapState.width - x + leftOffset;
      } else {
        pos.left = x + leftOffset;
      }

      if (y + topOffset + height > mapState.height) {
        pos.bottom = 10;
      } else {
        pos.top = y + topOffset;
      }

      return pos;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          x = _props.x,
          y = _props.y,
          isVisible = _props.isVisible,
          data = _props.data,
          layer = _props.layer,
          freezed = _props.freezed,
          fields = _props.fields,
          _props$fieldsToShow = _props.fieldsToShow,
          fieldsToShow = _props$fieldsToShow === undefined ? [] : _props$fieldsToShow;

      var hidden = !isVisible && !this.state.isMouseOver;
      var width = this.state.width;


      if (!data || !layer || !fieldsToShow.length) {
        return null;
      }

      var infoProps = { data: data, layer: layer, fieldsToShow: fieldsToShow, fields: fields };

      var style = Number.isFinite(x) && Number.isFinite(y) ? this._getPosition(x, y) : {};

      return _react2.default.createElement(
        StyledMapPopover,
        {
          innerRef: function innerRef(comp) {
            _this2.popover = comp;
          },
          className: (0, _classnames2.default)('map-popover', { hidden: hidden }),
          style: (0, _extends3.default)({}, style, {
            maxWidth: width
          }),
          onMouseEnter: function onMouseEnter() {
            _this2.setState({ isMouseOver: true });
          },
          onMouseLeave: function onMouseLeave() {
            _this2.setState({ isMouseOver: false });
          }
        },
        freezed ? _react2.default.createElement(
          'div',
          { className: 'map-popover__top' },
          _react2.default.createElement('div', { className: 'gutter' }),
          _react2.default.createElement(
            StyledPin,
            { className: 'popover-pin', onClick: this.props.onClose },
            _react2.default.createElement(_icons.Pin, { height: '16px' })
          )
        ) : null,
        _react2.default.createElement(
          StyledLayerName,
          { className: 'map-popover__layer-name' },
          _react2.default.createElement(_icons.Layers, { height: '12px' }),
          layer.config.label
        ),
        _react2.default.createElement(
          'table',
          { className: 'map-popover__table' },
          layer.isAggregated ? _react2.default.createElement(CellInfo, infoProps) : _react2.default.createElement(EntryInfo, infoProps)
        )
      );
    }
  }]);
  return MapPopover;
}(_react.Component), _class.propTypes = {
  fields: _propTypes2.default.arrayOf(_propTypes2.default.any),
  fieldsToShow: _propTypes2.default.arrayOf(_propTypes2.default.any),
  isVisible: _propTypes2.default.bool,
  layer: _propTypes2.default.object,
  data: _propTypes2.default.oneOfType([_propTypes2.default.arrayOf(_propTypes2.default.any), _propTypes2.default.object]),
  freezed: _propTypes2.default.bool,
  x: _propTypes2.default.number,
  y: _propTypes2.default.number,
  onClose: _propTypes2.default.func,
  mapState: _propTypes2.default.object.isRequired
}, _temp);


var Row = function Row(_ref) {
  var name = _ref.name,
      value = _ref.value,
      url = _ref.url;

  // Set 'url' to 'value' if it looks like a url
  if (!url && value && typeof value === 'string' && value.match(/^http/)) {
    url = value;
  }

  var asImg = /<img>/.test(name);
  return _react2.default.createElement(
    'tr',
    { className: 'row', key: name },
    _react2.default.createElement(
      'td',
      { className: 'row__name' },
      name
    ),
    _react2.default.createElement(
      'td',
      { className: 'row__value' },
      asImg ? _react2.default.createElement('img', { src: value }) : url ? _react2.default.createElement(
        'a',
        { target: '_blank', rel: 'noopener noreferrer', href: url },
        value
      ) : value
    )
  );
};

var EntryInfo = function EntryInfo(_ref2) {
  var fieldsToShow = _ref2.fieldsToShow,
      fields = _ref2.fields,
      data = _ref2.data;
  return _react2.default.createElement(
    'tbody',
    null,
    fieldsToShow.map(function (name) {
      return _react2.default.createElement(EntryInfoRow, { key: name, name: name, fields: fields, data: data });
    })
  );
};

var EntryInfoRow = function EntryInfoRow(_ref3) {
  var name = _ref3.name,
      fields = _ref3.fields,
      data = _ref3.data;

  var field = fields.find(function (f) {
    return f.name === name;
  });
  if (!field) {
    return null;
  }

  var valueIdx = field.tableFieldIndex - 1;
  var format = _getCellFormat(field.type);

  return _react2.default.createElement(Row, { name: name, value: format ? format(data[valueIdx]) : data[valueIdx] });
};

var CellInfo = function CellInfo(_ref4) {
  var data = _ref4.data,
      layer = _ref4.layer;
  var _layer$config = layer.config,
      colorField = _layer$config.colorField,
      sizeField = _layer$config.sizeField;


  return _react2.default.createElement(
    'tbody',
    null,
    _react2.default.createElement(Row, { name: 'total points', key: 'count', value: data.points.length }),
    colorField ? _react2.default.createElement(Row, {
      name: layer.getVisualChannelDescription('color').measure,
      key: 'color',
      value: data.colorValue || 'N/A'
    }) : null,
    sizeField ? _react2.default.createElement(Row, {
      name: layer.getVisualChannelDescription('size').measure,
      key: 'size',
      value: data.elevationValue || 'N/A'
    }) : null
  );
};

function _getCellFormat(type) {
  return _defaultSettings.FIELD_DISPLAY_FORMAT[type];
}

var MapPopoverFactory = function MapPopoverFactory() {
  return MapPopover;
};
exports.default = MapPopoverFactory;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL21hcC9tYXAtcG9wb3Zlci5qcyJdLCJuYW1lcyI6WyJNQVhfV0lEVEgiLCJNQVhfSEVJR0hUIiwiU3R5bGVkTWFwUG9wb3ZlciIsInN0eWxlZCIsImRpdiIsInByb3BzIiwidGhlbWUiLCJzY3JvbGxCYXIiLCJwYW5lbEJhY2tncm91bmQiLCJ0ZXh0Q29sb3IiLCJ0ZXh0Q29sb3JIbCIsIlN0eWxlZFBpbiIsInByaW1hcnlCdG5CZ2QiLCJsaW5rQnRuQ29sb3IiLCJTdHlsZWRMYXllck5hbWUiLCJDZW50ZXJGbGV4Ym94IiwiZXh0ZW5kIiwiTWFwUG9wb3ZlciIsInN0YXRlIiwiaXNNb3VzZU92ZXIiLCJ3aWR0aCIsImhlaWdodCIsIl9zZXRDb250YWluZXJTaXplIiwibm9kZSIsInBvcG92ZXIiLCJNYXRoIiwibWluIiwic2Nyb2xsV2lkdGgiLCJzY3JvbGxIZWlnaHQiLCJzZXRTdGF0ZSIsIngiLCJ5IiwidG9wT2Zmc2V0IiwibGVmdE9mZnNldCIsIm1hcFN0YXRlIiwicG9zIiwicmlnaHQiLCJsZWZ0IiwiYm90dG9tIiwidG9wIiwiaXNWaXNpYmxlIiwiZGF0YSIsImxheWVyIiwiZnJlZXplZCIsImZpZWxkcyIsImZpZWxkc1RvU2hvdyIsImhpZGRlbiIsImxlbmd0aCIsImluZm9Qcm9wcyIsInN0eWxlIiwiTnVtYmVyIiwiaXNGaW5pdGUiLCJfZ2V0UG9zaXRpb24iLCJjb21wIiwibWF4V2lkdGgiLCJvbkNsb3NlIiwiY29uZmlnIiwibGFiZWwiLCJpc0FnZ3JlZ2F0ZWQiLCJDb21wb25lbnQiLCJwcm9wVHlwZXMiLCJQcm9wVHlwZXMiLCJhcnJheU9mIiwiYW55IiwiYm9vbCIsIm9iamVjdCIsIm9uZU9mVHlwZSIsIm51bWJlciIsImZ1bmMiLCJpc1JlcXVpcmVkIiwiUm93IiwibmFtZSIsInZhbHVlIiwidXJsIiwibWF0Y2giLCJhc0ltZyIsInRlc3QiLCJFbnRyeUluZm8iLCJtYXAiLCJFbnRyeUluZm9Sb3ciLCJmaWVsZCIsImZpbmQiLCJmIiwidmFsdWVJZHgiLCJ0YWJsZUZpZWxkSW5kZXgiLCJmb3JtYXQiLCJfZ2V0Q2VsbEZvcm1hdCIsInR5cGUiLCJDZWxsSW5mbyIsImNvbG9yRmllbGQiLCJzaXplRmllbGQiLCJwb2ludHMiLCJnZXRWaXN1YWxDaGFubmVsRGVzY3JpcHRpb24iLCJtZWFzdXJlIiwiY29sb3JWYWx1ZSIsImVsZXZhdGlvblZhbHVlIiwiRklFTERfRElTUExBWV9GT1JNQVQiLCJNYXBQb3BvdmVyRmFjdG9yeSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7aWJBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7QUFDQTs7OztBQUVBLElBQU1BLFlBQVksR0FBbEI7QUFDQSxJQUFNQyxhQUFhLEdBQW5COztBQUVBLElBQU1DLG1CQUFtQkMsMkJBQU9DLEdBQTFCLGtCQUNGO0FBQUEsU0FBU0MsTUFBTUMsS0FBTixDQUFZQyxTQUFyQjtBQUFBLENBREUsRUFJZ0I7QUFBQSxTQUFTRixNQUFNQyxLQUFOLENBQVlFLGVBQXJCO0FBQUEsQ0FKaEIsRUFLSztBQUFBLFNBQVNILE1BQU1DLEtBQU4sQ0FBWUcsU0FBckI7QUFBQSxDQUxMLEVBMEJTO0FBQUEsU0FBU0osTUFBTUMsS0FBTixDQUFZRyxTQUFyQjtBQUFBLENBMUJULEVBZ0NTO0FBQUEsU0FBU0osTUFBTUMsS0FBTixDQUFZSSxXQUFyQjtBQUFBLENBaENULENBQU47O0FBcUNBLElBQU1DLFlBQVlSLDJCQUFPQyxHQUFuQixtQkFLSztBQUFBLFNBQVNDLE1BQU1DLEtBQU4sQ0FBWU0sYUFBckI7QUFBQSxDQUxMLEVBU087QUFBQSxTQUFTUCxNQUFNQyxLQUFOLENBQVlPLFlBQXJCO0FBQUEs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LFNBQWpCQSxJQUFpQjtBQUFBLE1BQVhDLEtBQVcsU0FBWEEsS0FBVztBQUFBLHNCQUNGQSxNQUFNYyxNQURKO0FBQUEsTUFDM0JpQyxVQUQyQixpQkFDM0JBLFVBRDJCO0FBQUEsTUFDZkMsU0FEZSxpQkFDZkEsU0FEZTs7O0FBR2xDLFNBQ0U7QUFBQTtBQUFBO0FBQ0Usa0NBQUMsR0FBRCxJQUFLLE1BQU0sY0FBWCxFQUEyQixLQUFJLE9BQS9CLEVBQXVDLE9BQU9qRCxLQUFLa0QsTUFBTCxDQUFZNUMsTUFBMUQsR0FERjtBQUVHMEMsaUJBQ0MsOEJBQUMsR0FBRDtBQUNFLFlBQU0vQyxNQUFNa0QsMkJBQU4sQ0FBa0MsT0FBbEMsRUFBMkNDLE9BRG5EO0FBRUUsV0FBSSxPQUZOO0FBR0UsYUFBT3BELEtBQUtxRCxVQUFMLElBQW1CO0FBSDVCLE1BREQsR0FNRyxJQVJOO0FBU0dKLGdCQUNDLDhCQUFDLEdBQUQ7QUFDRSxZQUFNaEQsTUFBTWtELDJCQUFOLENBQWtDLE1BQWxDLEVBQTBDQyxPQURsRDtBQUVFLFdBQUksTUFGTjtBQUdFLGFBQU9wRCxLQUFLc0QsY0FBTCxJQUF1QjtBQUhoQyxNQURELEdBTUc7QUFmTixHQURGO0FBbUJELENBdEJEOztBQXdCQSxTQUFTVCxjQUFULENBQXdCQyxJQUF4QixFQUE4QjtBQUM1QixTQUFPUyxzQ0FBcUJULElBQXJCLENBQVA7QUFDRDs7QUFFRCxJQUFNVSxvQkFBcUIsU0FBckJBLGlCQUFxQjtBQUFBLFNBQU1oRixVQUFOO0FBQUEsQ0FBM0I7a0JBQ2VnRixpQiIsImZpbGUiOiJtYXAtcG9wb3Zlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgMjAxOCBVYmVyIFRlY2hub2xvZ2llcywgSW5jLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbi8vIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbi8vIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbi8vIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbi8vIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuLy8gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuLy8gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4vLyBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbi8vIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbi8vIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4vLyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4vLyBUSEUgU09GVFdBUkUuXG5cbmltcG9ydCBSZWFjdCwge0NvbXBvbmVudH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHN0eWxlZCBmcm9tICdzdHlsZWQtY29tcG9uZW50cyc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IGNsYXNzbmFtZXMgZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQge0NlbnRlckZsZXhib3h9IGZyb20gJ2NvbXBvbmVudHMvY29tbW9uL3N0eWxlZC1jb21wb25lbnRzJztcbmltcG9ydCB7UGluLCBMYXllcnN9IGZyb20gJ2NvbXBvbmVudHMvY29tbW9uL2ljb25zJztcbmltcG9ydCB7RklFTERfRElTUExBWV9GT1JNQVR9IGZyb20gJ2NvbnN0YW50cy9kZWZhdWx0LXNldHRpbmdzJztcblxuY29uc3QgTUFYX1dJRFRIID0gNDAwO1xuY29uc3QgTUFYX0hFSUdIVCA9IDYwMDtcblxuY29uc3QgU3R5bGVkTWFwUG9wb3ZlciA9IHN0eWxlZC5kaXZgXG4gICR7cHJvcHMgPT4gcHJvcHMudGhlbWUuc2Nyb2xsQmFyfVxuICBmb250LXNpemU6IDExcHg7XG4gIGZvbnQtd2VpZ2h0OiA1MDA7XG4gIGJhY2tncm91bmQtY29sb3I6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUucGFuZWxCYWNrZ3JvdW5kfTtcbiAgY29sb3I6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUudGV4dENvbG9yfTtcbiAgei1pbmRleDogMTAwMTtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICBvdmVyZmxvdy14OiBhdXRvO1xuXG4gIC5ndXR0ZXIge1xuICAgIGhlaWdodDogNnB4O1xuICB9XG5cbiAgdGFibGUge1xuICAgIG1hcmdpbjogMnB4IDEycHggMTJweCAxMnB4O1xuICAgIHdpZHRoOiBhdXRvO1xuXG4gICAgdGJvZHkge1xuICAgICAgYm9yZGVyLXRvcDogdHJhbnNwYXJlbnQ7XG4gICAgICBib3JkZXItYm90dG9tOiB0cmFuc3BhcmVudDtcbiAgICB9XG5cbiAgICB0ZCB7XG4gICAgICBib3JkZXItY29sb3I6IHRyYW5zcGFyZW50O1xuICAgICAgcGFkZGluZzogNHB4O1xuICAgICAgY29sb3I6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUudGV4dENvbG9yfTtcbiAgICB9XG5cbiAgICB0ZC5yb3dfX3ZhbHVlIHtcbiAgICAgIHRleHQtYWxpZ246IHJpZ2h0O1xuICAgICAgZm9udC13ZWlnaHQ6IDUwMDtcbiAgICAgIGNvbG9yOiAke3Byb3BzID0+IHByb3BzLnRoZW1lLnRleHRDb2xvckhsfTtcbiAgICB9XG4gIH1cbmA7XG5cbmNvbnN0IFN0eWxlZFBpbiA9IHN0eWxlZC5kaXZgXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgbGVmdDogNTAlO1xuICB0cmFuc2Zvcm06IHJvdGF0ZSgzMGRlZyk7XG4gIHRvcDogMTBweDtcbiAgY29sb3I6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUucHJpbWFyeUJ0bkJnZH07XG5cbiAgOmhvdmVyIHtcbiAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgY29sb3I6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUubGlua0J0bkNvbG9yfTtcbiAgfVxuYDtcblxuY29uc3QgU3R5bGVkTGF5ZXJOYW1lID0gQ2VudGVyRmxleGJveC5leHRlbmRgXG4gIGNvbG9yOiAke3Byb3BzID0+IHByb3BzLnRoZW1lLnRleHRDb2xvckhsfTtcbiAgZm9udC1zaXplOiAxMnB4O1xuICBsZXR0ZXItc3BhY2luZzogMC40M3B4O1xuICB0ZXh0LXRyYW5zZm9ybTogY2FwaXRhbGl6ZTtcbiAgcGFkZGluZy1sZWZ0OiAxNHB4O1xuICBtYXJnaW4tdG9wOiAxMnB4O1xuXG4gIHN2ZyB7XG4gICAgbWFyZ2luLXJpZ2h0OiA0cHg7XG4gIH1cbmA7XG5cbmV4cG9ydCBjbGFzcyBNYXBQb3BvdmVyIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICBmaWVsZHM6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5hbnkpLFxuICAgIGZpZWxkc1RvU2hvdzogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLmFueSksXG4gICAgaXNWaXNpYmxlOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBsYXllcjogUHJvcFR5cGVzLm9iamVjdCxcbiAgICBkYXRhOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMuYW55KSwgUHJvcFR5cGVzLm9iamVjdF0pLFxuICAgIGZyZWV6ZWQ6IFByb3BUeXBlcy5ib29sLFxuICAgIHg6IFByb3BUeXBlcy5udW1iZXIsXG4gICAgeTogUHJvcFR5cGVzLm51bWJlcixcbiAgICBvbkNsb3NlOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBtYXBTdGF0ZTogUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkXG4gIH07XG5cbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIGlzTW91c2VPdmVyOiBmYWxzZSxcbiAgICAgIHdpZHRoOiAzODAsXG4gICAgICBoZWlnaHQ6IDE2MFxuICAgIH07XG4gIH1cblxuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICB0aGlzLl9zZXRDb250YWluZXJTaXplKCk7XG4gIH1cblxuICBjb21wb25lbnREaWRVcGRhdGUoKSB7XG4gICAgdGhpcy5fc2V0Q29udGFpbmVyU2l6ZSgpO1xuICB9XG5cbiAgX3NldENvbnRhaW5lclNpemUoKSB7XG4gICAgY29uc3Qgbm9kZSA9IHRoaXMucG9wb3ZlcjtcbiAgICBpZiAoIW5vZGUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCB3aWR0aCA9IE1hdGgubWluKG5vZGUuc2Nyb2xsV2lkdGgsIE1BWF9XSURUSCk7XG4gICAgY29uc3QgaGVpZ2h0ID0gTWF0aC5taW4obm9kZS5zY3JvbGxIZWlnaHQsIE1BWF9IRUlHSFQpO1xuXG4gICAgaWYgKHdpZHRoICE9PSB0aGlzLnN0YXRlLndpZHRoIHx8IGhlaWdodCAhPT0gdGhpcy5zdGF0ZS5oZWlnaHQpIHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe3dpZHRoLCBoZWlnaHR9KTtcbiAgICB9XG4gIH1cblxuICBfZ2V0UG9zaXRpb24oeCwgeSkge1xuICAgIGNvbnN0IHRvcE9mZnNldCA9IDMwO1xuICAgIGNvbnN0IGxlZnRPZmZzZXQgPSAzMDtcbiAgICBjb25zdCB7bWFwU3RhdGV9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCB7d2lkdGgsIGhlaWdodH0gPSB0aGlzLnN0YXRlO1xuICAgIGNvbnN0IHBvcyA9IHt9O1xuICAgIGlmICh4ICsgbGVmdE9mZnNldCArIHdpZHRoID4gbWFwU3RhdGUud2lkdGgpIHtcbiAgICAgIHBvcy5yaWdodCA9IG1hcFN0YXRlLndpZHRoIC0geCArIGxlZnRPZmZzZXQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHBvcy5sZWZ0ID0geCArIGxlZnRPZmZzZXQ7XG4gICAgfVxuXG4gICAgaWYgKHkgKyB0b3BPZmZzZXQgKyBoZWlnaHQgPiBtYXBTdGF0ZS5oZWlnaHQpIHtcbiAgICAgIHBvcy5ib3R0b20gPSAxMDtcbiAgICB9IGVsc2Uge1xuICAgICAgcG9zLnRvcCA9IHkgKyB0b3BPZmZzZXQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIHBvcztcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7XG4gICAgICB4LFxuICAgICAgeSxcbiAgICAgIGlzVmlzaWJsZSxcbiAgICAgIGRhdGEsXG4gICAgICBsYXllcixcbiAgICAgIGZyZWV6ZWQsXG4gICAgICBmaWVsZHMsXG4gICAgICBmaWVsZHNUb1Nob3cgPSBbXVxuICAgIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IGhpZGRlbiA9ICFpc1Zpc2libGUgJiYgIXRoaXMuc3RhdGUuaXNNb3VzZU92ZXI7XG4gICAgY29uc3Qge3dpZHRofSA9IHRoaXMuc3RhdGU7XG5cbiAgICBpZiAoIWRhdGEgfHwgIWxheWVyIHx8ICFmaWVsZHNUb1Nob3cubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBjb25zdCBpbmZvUHJvcHMgPSB7ZGF0YSwgbGF5ZXIsIGZpZWxkc1RvU2hvdywgZmllbGRzfTtcblxuICAgIGNvbnN0IHN0eWxlID1cbiAgICAgIE51bWJlci5pc0Zpbml0ZSh4KSAmJiBOdW1iZXIuaXNGaW5pdGUoeSkgPyB0aGlzLl9nZXRQb3NpdGlvbih4LCB5KSA6IHt9O1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxTdHlsZWRNYXBQb3BvdmVyXG4gICAgICAgIGlubmVyUmVmPXtjb21wID0+IHtcbiAgICAgICAgICB0aGlzLnBvcG92ZXIgPSBjb21wO1xuICAgICAgICB9fVxuICAgICAgICBjbGFzc05hbWU9e2NsYXNzbmFtZXMoJ21hcC1wb3BvdmVyJywge2hpZGRlbn0pfVxuICAgICAgICBzdHlsZT17e1xuICAgICAgICAgIC4uLnN0eWxlLFxuICAgICAgICAgIG1heFdpZHRoOiB3aWR0aFxuICAgICAgICB9fVxuICAgICAgICBvbk1vdXNlRW50ZXI9eygpID0+IHtcbiAgICAgICAgICB0aGlzLnNldFN0YXRlKHtpc01vdXNlT3ZlcjogdHJ1ZX0pO1xuICAgICAgICB9fVxuICAgICAgICBvbk1vdXNlTGVhdmU9eygpID0+IHtcbiAgICAgICAgICB0aGlzLnNldFN0YXRlKHtpc01vdXNlT3ZlcjogZmFsc2V9KTtcbiAgICAgICAgfX1cbiAgICAgID5cbiAgICAgICAge2ZyZWV6ZWQgPyAoXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtYXAtcG9wb3Zlcl9fdG9wXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImd1dHRlclwiIC8+XG4gICAgICAgICAgICA8U3R5bGVkUGluIGNsYXNzTmFtZT1cInBvcG92ZXItcGluXCIgb25DbGljaz17dGhpcy5wcm9wcy5vbkNsb3NlfT5cbiAgICAgICAgICAgICAgPFBpbiBoZWlnaHQ9XCIxNnB4XCIgLz5cbiAgICAgICAgICAgIDwvU3R5bGVkUGluPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICApIDogbnVsbH1cbiAgICAgICAgPFN0eWxlZExheWVyTmFtZSBjbGFzc05hbWU9XCJtYXAtcG9wb3Zlcl9fbGF5ZXItbmFtZVwiPlxuICAgICAgICAgIDxMYXllcnMgaGVpZ2h0PVwiMTJweFwiLz57bGF5ZXIuY29uZmlnLmxhYmVsfTwvU3R5bGVkTGF5ZXJOYW1lPlxuICAgICAgICA8dGFibGUgY2xhc3NOYW1lPVwibWFwLXBvcG92ZXJfX3RhYmxlXCI+XG4gICAgICAgICAge2xheWVyLmlzQWdncmVnYXRlZCA/IChcbiAgICAgICAgICAgIDxDZWxsSW5mbyB7Li4uaW5mb1Byb3BzfSAvPlxuICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICA8RW50cnlJbmZvIHsuLi5pbmZvUHJvcHN9IC8+XG4gICAgICAgICAgKX1cbiAgICAgICAgPC90YWJsZT5cbiAgICAgIDwvU3R5bGVkTWFwUG9wb3Zlcj5cbiAgICApO1xuICB9XG59XG5cbmNvbnN0IFJvdyA9ICh7bmFtZSwgdmFsdWUsIHVybH0pID0+IHtcbiAgLy8gU2V0ICd1cmwnIHRvICd2YWx1ZScgaWYgaXQgbG9va3MgbGlrZSBhIHVybFxuICBpZiAoIXVybCAmJiB2YWx1ZSAmJiB0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnICYmIHZhbHVlLm1hdGNoKC9eaHR0cC8pKSB7XG4gICAgdXJsID0gdmFsdWU7XG4gIH1cblxuICBjb25zdCBhc0ltZyA9IC88aW1nPi8udGVzdChuYW1lKTtcbiAgcmV0dXJuIChcbiAgICA8dHIgY2xhc3NOYW1lPVwicm93XCIga2V5PXtuYW1lfT5cbiAgICAgIDx0ZCBjbGFzc05hbWU9XCJyb3dfX25hbWVcIj57bmFtZX08L3RkPlxuICAgICAgPHRkIGNsYXNzTmFtZT1cInJvd19fdmFsdWVcIj5cbiAgICAgICAge2FzSW1nID8gKFxuICAgICAgICAgIDxpbWcgc3JjPXt2YWx1ZX0gLz5cbiAgICAgICAgKSA6IHVybCA/IChcbiAgICAgICAgICA8YSB0YXJnZXQ9XCJfYmxhbmtcIiByZWw9XCJub29wZW5lciBub3JlZmVycmVyXCIgaHJlZj17dXJsfT5cbiAgICAgICAgICAgIHt2YWx1ZX1cbiAgICAgICAgICA8L2E+XG4gICAgICAgICkgOiAoXG4gICAgICAgICAgdmFsdWVcbiAgICAgICAgKX1cbiAgICAgIDwvdGQ+XG4gICAgPC90cj5cbiAgKTtcbn07XG5cbmNvbnN0IEVudHJ5SW5mbyA9ICh7ZmllbGRzVG9TaG93LCBmaWVsZHMsIGRhdGF9KSA9PiAoXG4gIDx0Ym9keT5cbiAgICB7ZmllbGRzVG9TaG93Lm1hcChuYW1lID0+IChcbiAgICAgIDxFbnRyeUluZm9Sb3cga2V5PXtuYW1lfSBuYW1lPXtuYW1lfSBmaWVsZHM9e2ZpZWxkc30gZGF0YT17ZGF0YX0gLz5cbiAgICApKX1cbiAgPC90Ym9keT5cbik7XG5cbmNvbnN0IEVudHJ5SW5mb1JvdyA9ICh7bmFtZSwgZmllbGRzLCBkYXRhfSkgPT4ge1xuICBjb25zdCBmaWVsZCA9IGZpZWxkcy5maW5kKGYgPT4gZi5uYW1lID09PSBuYW1lKTtcbiAgaWYgKCFmaWVsZCkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgY29uc3QgdmFsdWVJZHggPSBmaWVsZC50YWJsZUZpZWxkSW5kZXggLSAxO1xuICBjb25zdCBmb3JtYXQgPSBfZ2V0Q2VsbEZvcm1hdChmaWVsZC50eXBlKTtcblxuICByZXR1cm4gKFxuICAgIDxSb3cgbmFtZT17bmFtZX0gdmFsdWU9e2Zvcm1hdCA/IGZvcm1hdChkYXRhW3ZhbHVlSWR4XSkgOiBkYXRhW3ZhbHVlSWR4XX0gLz5cbiAgKTtcbn07XG5cbmNvbnN0IENlbGxJbmZvID0gKHtkYXRhLCBsYXllcn0pID0+IHtcbiAgY29uc3Qge2NvbG9yRmllbGQsIHNpemVGaWVsZH0gPSBsYXllci5jb25maWc7XG5cbiAgcmV0dXJuIChcbiAgICA8dGJvZHk+XG4gICAgICA8Um93IG5hbWU9eyd0b3RhbCBwb2ludHMnfSBrZXk9XCJjb3VudFwiIHZhbHVlPXtkYXRhLnBvaW50cy5sZW5ndGh9IC8+XG4gICAgICB7Y29sb3JGaWVsZCA/IChcbiAgICAgICAgPFJvd1xuICAgICAgICAgIG5hbWU9e2xheWVyLmdldFZpc3VhbENoYW5uZWxEZXNjcmlwdGlvbignY29sb3InKS5tZWFzdXJlfVxuICAgICAgICAgIGtleT1cImNvbG9yXCJcbiAgICAgICAgICB2YWx1ZT17ZGF0YS5jb2xvclZhbHVlIHx8ICdOL0EnfVxuICAgICAgICAvPlxuICAgICAgKSA6IG51bGx9XG4gICAgICB7c2l6ZUZpZWxkID8gKFxuICAgICAgICA8Um93XG4gICAgICAgICAgbmFtZT17bGF5ZXIuZ2V0VmlzdWFsQ2hhbm5lbERlc2NyaXB0aW9uKCdzaXplJykubWVhc3VyZX1cbiAgICAgICAgICBrZXk9XCJzaXplXCJcbiAgICAgICAgICB2YWx1ZT17ZGF0YS5lbGV2YXRpb25WYWx1ZSB8fCAnTi9BJ31cbiAgICAgICAgLz5cbiAgICAgICkgOiBudWxsfVxuICAgIDwvdGJvZHk+XG4gICk7XG59O1xuXG5mdW5jdGlvbiBfZ2V0Q2VsbEZvcm1hdCh0eXBlKSB7XG4gIHJldHVybiBGSUVMRF9ESVNQTEFZX0ZPUk1BVFt0eXBlXTtcbn1cblxuY29uc3QgTWFwUG9wb3ZlckZhY3RvcnkgPSAgKCkgPT4gTWFwUG9wb3ZlcjtcbmV4cG9ydCBkZWZhdWx0IE1hcFBvcG92ZXJGYWN0b3J5O1xuIl19