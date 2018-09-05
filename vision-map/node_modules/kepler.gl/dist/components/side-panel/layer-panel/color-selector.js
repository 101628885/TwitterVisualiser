'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

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

var _templateObject = (0, _taggedTemplateLiteral3.default)(['\n  width: 32px;\n  height: 18px;\n  border-radius: 1px;\n  background-color: ', ';\n'], ['\n  width: 32px;\n  height: 18px;\n  border-radius: 1px;\n  background-color: ', ';\n']),
    _templateObject2 = (0, _taggedTemplateLiteral3.default)(['\n  ', ';\n  height: ', ';\n'], ['\n  ', ';\n  height: ', ';\n']),
    _templateObject3 = (0, _taggedTemplateLiteral3.default)(['\n  display: flex;\n  justify-content: space-between;\n\n  .color-select__input-group {\n    flex-grow: 1;\n  }\n  .color-select__input-group:nth-child(2) {\n    margin-left: 12px;\n  }\n'], ['\n  display: flex;\n  justify-content: space-between;\n\n  .color-select__input-group {\n    flex-grow: 1;\n  }\n  .color-select__input-group:nth-child(2) {\n    margin-left: 12px;\n  }\n']); // Copyright (c) 2018 Uber Technologies, Inc.
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

var _colorUtils = require('../../../utils/color-utils');

var _singleColorPalette = require('./single-color-palette');

var _singleColorPalette2 = _interopRequireDefault(_singleColorPalette);

var _colorRangeSelector = require('./color-range-selector');

var _colorRangeSelector2 = _interopRequireDefault(_colorRangeSelector);

var _colorPalette = require('./color-palette');

var _colorPalette2 = _interopRequireDefault(_colorPalette);

var _styledComponents3 = require('../../common/styled-components');

var _reactOnclickoutside = require('react-onclickoutside');

var _reactOnclickoutside2 = _interopRequireDefault(_reactOnclickoutside);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ColorBlock = _styledComponents2.default.div(_templateObject, function (props) {
  return 'rgb(' + props.color.slice(0, 3).join(',') + ')';
});

var ColorSelectorInput = _styledComponents2.default.div(_templateObject2, function (props) {
  return props.inputTheme === 'secondary' ? props.theme.secondaryInput : props.theme.input;
}, function (props) {
  return props.theme.inputBoxHeight;
});

var InputBoxContainer = _styledComponents2.default.div(_templateObject3);

var ColorSelector = (_temp2 = _class = function (_Component) {
  (0, _inherits3.default)(ColorSelector, _Component);

  function ColorSelector() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, ColorSelector);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = ColorSelector.__proto__ || Object.getPrototypeOf(ColorSelector)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      editing: false
    }, _this.handleClickOutside = function (e) {
      if (_this.state.editing !== false) {
        _this.setState({ editing: false });
      }
    }, _this._onSelectColor = function (color, e) {
      e.stopPropagation();
      if (_this.props.colorSets[_this.state.editing]) {
        _this.props.colorSets[_this.state.editing].setColor(color);
      }
    }, _this._showDropdown = function (e, i) {
      e.stopPropagation();
      e.preventDefault();
      _this.setState({ editing: i });
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(ColorSelector, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          colorSets = _props.colorSets,
          disabled = _props.disabled,
          inputTheme = _props.inputTheme;
      var editing = this.state.editing;

      var currentEditing = colorSets[editing] && (0, _typeof3.default)(colorSets[editing]) === 'object';

      return _react2.default.createElement(
        'div',
        { className: 'color-selector' },
        _react2.default.createElement(
          InputBoxContainer,
          null,
          colorSets.map(function (cSet, i) {
            return _react2.default.createElement(
              'div',
              { className: 'color-select__input-group', key: i },
              cSet.label ? _react2.default.createElement(
                _styledComponents3.PanelLabel,
                null,
                cSet.label
              ) : null,
              _react2.default.createElement(
                ColorSelectorInput,
                {
                  className: 'color-selector__selector',
                  active: editing === i,
                  disabled: disabled,
                  inputTheme: inputTheme,
                  onMouseDown: function onMouseDown(e) {
                    return _this2._showDropdown(e, i);
                  }
                },
                cSet.isRange ? _react2.default.createElement(_colorPalette2.default, { colors: cSet.selectedColor.colors }) : _react2.default.createElement(ColorBlock, {
                  className: 'color-selector__selector__block',
                  color: cSet.selectedColor
                })
              )
            );
          })
        ),
        currentEditing ? _react2.default.createElement(
          _styledComponents3.StyledPanelDropdown,
          { className: 'color-selector__dropdown' },
          colorSets[editing].isRange ? _react2.default.createElement(_colorRangeSelector2.default, {
            selectedColorRange: colorSets[editing].selectedColor,
            onSelectColorRange: this._onSelectColor
          }) : _react2.default.createElement(_singleColorPalette2.default, {
            selectedColor: (0, _colorUtils.rgbToHex)(colorSets[editing].selectedColor),
            onSelectColor: this._onSelectColor
          })
        ) : null
      );
    }
  }]);
  return ColorSelector;
}(_react.Component), _class.propTypes = {
  colorSets: _propTypes2.default.arrayOf(_propTypes2.default.shape({
    selectedColor: _propTypes2.default.oneOfType([_propTypes2.default.arrayOf(_propTypes2.default.any), _propTypes2.default.object]),
    setColor: _propTypes2.default.func.isRequired,
    isRange: _propTypes2.default.bool,
    label: _propTypes2.default.string
  })),
  inputTheme: _propTypes2.default.string,
  disabled: _propTypes2.default.bool
}, _class.defaultProps = {
  colorSets: []
}, _temp2);
;

exports.default = (0, _reactOnclickoutside2.default)(ColorSelector);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3NpZGUtcGFuZWwvbGF5ZXItcGFuZWwvY29sb3Itc2VsZWN0b3IuanMiXSwibmFtZXMiOlsiQ29sb3JCbG9jayIsInN0eWxlZCIsImRpdiIsInByb3BzIiwiY29sb3IiLCJzbGljZSIsImpvaW4iLCJDb2xvclNlbGVjdG9ySW5wdXQiLCJpbnB1dFRoZW1lIiwidGhlbWUiLCJzZWNvbmRhcnlJbnB1dCIsImlucHV0IiwiaW5wdXRCb3hIZWlnaHQiLCJJbnB1dEJveENvbnRhaW5lciIsIkNvbG9yU2VsZWN0b3IiLCJzdGF0ZSIsImVkaXRpbmciLCJoYW5kbGVDbGlja091dHNpZGUiLCJzZXRTdGF0ZSIsIl9vblNlbGVjdENvbG9yIiwiZSIsInN0b3BQcm9wYWdhdGlvbiIsImNvbG9yU2V0cyIsInNldENvbG9yIiwiX3Nob3dEcm9wZG93biIsImkiLCJwcmV2ZW50RGVmYXVsdCIsImRpc2FibGVkIiwiY3VycmVudEVkaXRpbmciLCJtYXAiLCJjU2V0IiwibGFiZWwiLCJpc1JhbmdlIiwic2VsZWN0ZWRDb2xvciIsImNvbG9ycyIsIkNvbXBvbmVudCIsInByb3BUeXBlcyIsIlByb3BUeXBlcyIsImFycmF5T2YiLCJzaGFwZSIsIm9uZU9mVHlwZSIsImFueSIsIm9iamVjdCIsImZ1bmMiLCJpc1JlcXVpcmVkIiwiYm9vbCIsInN0cmluZyIsImRlZmF1bHRQcm9wcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzsrYkFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7QUFJQTs7Ozs7O0FBRUEsSUFBTUEsYUFBYUMsMkJBQU9DLEdBQXBCLGtCQUlnQjtB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VixVQUFVTixPQUFWLEVBQW1CaUIsYUFEekM7QUFFRSxnQ0FBb0IsS0FBS2Q7QUFGM0IsWUFERCxHQU1DLDhCQUFDLDRCQUFEO0FBQ0UsMkJBQWUsMEJBQVNHLFVBQVVOLE9BQVYsRUFBbUJpQixhQUE1QixDQURqQjtBQUVFLDJCQUFlLEtBQUtkO0FBRnRCO0FBUEosU0FERCxHQWNHO0FBdENOLE9BREY7QUEwQ0Q7OztFQXpGeUJnQixnQixVQUNuQkMsUyxHQUFZO0FBQ2pCZCxhQUFXZSxvQkFBVUMsT0FBVixDQUNURCxvQkFBVUUsS0FBVixDQUFnQjtBQUNkTixtQkFBZUksb0JBQVVHLFNBQVYsQ0FBb0IsQ0FBQ0gsb0JBQVVDLE9BQVYsQ0FBa0JELG9CQUFVSSxHQUE1QixDQUFELEVBQW1DSixvQkFBVUssTUFBN0MsQ0FBcEIsQ0FERDtBQUVkbkIsY0FBVWMsb0JBQVVNLElBQVYsQ0FBZUMsVUFGWDtBQUdkWixhQUFTSyxvQkFBVVEsSUFITDtBQUlkZCxXQUFPTSxvQkFBVVM7QUFKSCxHQUFoQixDQURTLENBRE07QUFTakJ0QyxjQUFZNkIsb0JBQVVTLE1BVEw7QUFVakJuQixZQUFVVSxvQkFBVVE7QUFWSCxDLFNBYVpFLFksR0FBZTtBQUNwQnpCLGFBQVc7QUFEUyxDO0FBNEV2Qjs7a0JBRWMsbUNBQWVSLGFBQWYsQyIsImZpbGUiOiJjb2xvci1zZWxlY3Rvci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgMjAxOCBVYmVyIFRlY2hub2xvZ2llcywgSW5jLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbi8vIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbi8vIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbi8vIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbi8vIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuLy8gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuLy8gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4vLyBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbi8vIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbi8vIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4vLyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4vLyBUSEUgU09GVFdBUkUuXG5cbmltcG9ydCBSZWFjdCwge0NvbXBvbmVudH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCBzdHlsZWQgZnJvbSAnc3R5bGVkLWNvbXBvbmVudHMnO1xuaW1wb3J0IHtyZ2JUb0hleH0gZnJvbSAndXRpbHMvY29sb3ItdXRpbHMnO1xuaW1wb3J0IFNpbmdsZUNvbG9yUGFsZXR0ZSBmcm9tICdjb21wb25lbnRzL3NpZGUtcGFuZWwvbGF5ZXItcGFuZWwvc2luZ2xlLWNvbG9yLXBhbGV0dGUnO1xuaW1wb3J0IENvbG9yUmFuZ2VTZWxlY3RvciBmcm9tICdjb21wb25lbnRzL3NpZGUtcGFuZWwvbGF5ZXItcGFuZWwvY29sb3ItcmFuZ2Utc2VsZWN0b3InO1xuaW1wb3J0IENvbG9yUGFsZXR0ZSBmcm9tICdjb21wb25lbnRzL3NpZGUtcGFuZWwvbGF5ZXItcGFuZWwvY29sb3ItcGFsZXR0ZSc7XG5pbXBvcnQge1xuICBQYW5lbExhYmVsLFxuICBTdHlsZWRQYW5lbERyb3Bkb3duXG59IGZyb20gJ2NvbXBvbmVudHMvY29tbW9uL3N0eWxlZC1jb21wb25lbnRzJztcbmltcG9ydCBvbkNsaWNrT3V0c2lkZSBmcm9tICdyZWFjdC1vbmNsaWNrb3V0c2lkZSc7XG5cbmNvbnN0IENvbG9yQmxvY2sgPSBzdHlsZWQuZGl2YFxuICB3aWR0aDogMzJweDtcbiAgaGVpZ2h0OiAxOHB4O1xuICBib3JkZXItcmFkaXVzOiAxcHg7XG4gIGJhY2tncm91bmQtY29sb3I6ICR7cHJvcHMgPT4gYHJnYigke3Byb3BzLmNvbG9yLnNsaWNlKDAsIDMpLmpvaW4oJywnKX0pYH07XG5gO1xuXG5jb25zdCBDb2xvclNlbGVjdG9ySW5wdXQgPSBzdHlsZWQuZGl2YFxuICAke3Byb3BzID0+XG4gICAgcHJvcHMuaW5wdXRUaGVtZSA9PT0gJ3NlY29uZGFyeSdcbiAgICAgID8gcHJvcHMudGhlbWUuc2Vjb25kYXJ5SW5wdXRcbiAgICAgIDogcHJvcHMudGhlbWUuaW5wdXR9O1xuICBoZWlnaHQ6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUuaW5wdXRCb3hIZWlnaHR9O1xuYDtcblxuY29uc3QgSW5wdXRCb3hDb250YWluZXIgPSBzdHlsZWQuZGl2YFxuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG5cbiAgLmNvbG9yLXNlbGVjdF9faW5wdXQtZ3JvdXAge1xuICAgIGZsZXgtZ3JvdzogMTtcbiAgfVxuICAuY29sb3Itc2VsZWN0X19pbnB1dC1ncm91cDpudGgtY2hpbGQoMikge1xuICAgIG1hcmdpbi1sZWZ0OiAxMnB4O1xuICB9XG5gO1xuXG5jbGFzcyBDb2xvclNlbGVjdG9yIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICBjb2xvclNldHM6IFByb3BUeXBlcy5hcnJheU9mKFxuICAgICAgUHJvcFR5cGVzLnNoYXBlKHtcbiAgICAgICAgc2VsZWN0ZWRDb2xvcjogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLmFueSksIFByb3BUeXBlcy5vYmplY3RdKSxcbiAgICAgICAgc2V0Q29sb3I6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgICAgIGlzUmFuZ2U6IFByb3BUeXBlcy5ib29sLFxuICAgICAgICBsYWJlbDogUHJvcFR5cGVzLnN0cmluZ1xuICAgICAgfSlcbiAgICApLFxuICAgIGlucHV0VGhlbWU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgZGlzYWJsZWQ6IFByb3BUeXBlcy5ib29sXG4gIH07XG5cbiAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICBjb2xvclNldHM6IFtdXG4gIH07XG5cbiAgc3RhdGUgPSB7XG4gICAgZWRpdGluZzogZmFsc2VcbiAgfTtcblxuICBoYW5kbGVDbGlja091dHNpZGUgPSBlID0+IHtcbiAgICBpZiAodGhpcy5zdGF0ZS5lZGl0aW5nICE9PSBmYWxzZSkge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7ZWRpdGluZzogZmFsc2V9KTtcbiAgICB9XG4gIH07XG5cbiAgX29uU2VsZWN0Q29sb3IgPSAoY29sb3IsIGUpID0+IHtcbiAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIGlmICh0aGlzLnByb3BzLmNvbG9yU2V0c1t0aGlzLnN0YXRlLmVkaXRpbmddKSB7XG4gICAgICB0aGlzLnByb3BzLmNvbG9yU2V0c1t0aGlzLnN0YXRlLmVkaXRpbmddLnNldENvbG9yKGNvbG9yKTtcbiAgICB9XG4gIH07XG5cbiAgX3Nob3dEcm9wZG93biA9IChlLCBpKSA9PiB7XG4gICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgdGhpcy5zZXRTdGF0ZSh7ZWRpdGluZzogaX0pO1xuICB9O1xuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7Y29sb3JTZXRzLCBkaXNhYmxlZCwgaW5wdXRUaGVtZX0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHtlZGl0aW5nfSA9IHRoaXMuc3RhdGU7XG4gICAgY29uc3QgY3VycmVudEVkaXRpbmcgPVxuICAgICAgY29sb3JTZXRzW2VkaXRpbmddICYmIHR5cGVvZiBjb2xvclNldHNbZWRpdGluZ10gPT09ICdvYmplY3QnO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sb3Itc2VsZWN0b3JcIj5cbiAgICAgICAgPElucHV0Qm94Q29udGFpbmVyPlxuICAgICAgICAgIHtjb2xvclNldHMubWFwKChjU2V0LCBpKSA9PiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbG9yLXNlbGVjdF9faW5wdXQtZ3JvdXBcIiBrZXk9e2l9PlxuICAgICAgICAgICAgICB7Y1NldC5sYWJlbCA/IDxQYW5lbExhYmVsPntjU2V0LmxhYmVsfTwvUGFuZWxMYWJlbD4gOiBudWxsfVxuICAgICAgICAgICAgICA8Q29sb3JTZWxlY3RvcklucHV0XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiY29sb3Itc2VsZWN0b3JfX3NlbGVjdG9yXCJcbiAgICAgICAgICAgICAgICBhY3RpdmU9e2VkaXRpbmcgPT09IGl9XG4gICAgICAgICAgICAgICAgZGlzYWJsZWQ9e2Rpc2FibGVkfVxuICAgICAgICAgICAgICAgIGlucHV0VGhlbWU9e2lucHV0VGhlbWV9XG4gICAgICAgICAgICAgICAgb25Nb3VzZURvd249e2UgPT4gdGhpcy5fc2hvd0Ryb3Bkb3duKGUsIGkpfVxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAge2NTZXQuaXNSYW5nZSA/IChcbiAgICAgICAgICAgICAgICAgIDxDb2xvclBhbGV0dGUgY29sb3JzPXtjU2V0LnNlbGVjdGVkQ29sb3IuY29sb3JzfSAvPlxuICAgICAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgICAgICA8Q29sb3JCbG9ja1xuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJjb2xvci1zZWxlY3Rvcl9fc2VsZWN0b3JfX2Jsb2NrXCJcbiAgICAgICAgICAgICAgICAgICAgY29sb3I9e2NTZXQuc2VsZWN0ZWRDb2xvcn1cbiAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgPC9Db2xvclNlbGVjdG9ySW5wdXQ+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICApKX1cbiAgICAgICAgPC9JbnB1dEJveENvbnRhaW5lcj5cbiAgICAgICAge2N1cnJlbnRFZGl0aW5nID8gKFxuICAgICAgICAgIDxTdHlsZWRQYW5lbERyb3Bkb3duIGNsYXNzTmFtZT1cImNvbG9yLXNlbGVjdG9yX19kcm9wZG93blwiPlxuICAgICAgICAgICAge2NvbG9yU2V0c1tlZGl0aW5nXS5pc1JhbmdlID8gKFxuICAgICAgICAgICAgICA8Q29sb3JSYW5nZVNlbGVjdG9yXG4gICAgICAgICAgICAgICAgc2VsZWN0ZWRDb2xvclJhbmdlPXtjb2xvclNldHNbZWRpdGluZ10uc2VsZWN0ZWRDb2xvcn1cbiAgICAgICAgICAgICAgICBvblNlbGVjdENvbG9yUmFuZ2U9e3RoaXMuX29uU2VsZWN0Q29sb3J9XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICApIDogKFxuICAgICAgICAgICAgICA8U2luZ2xlQ29sb3JQYWxldHRlXG4gICAgICAgICAgICAgICAgc2VsZWN0ZWRDb2xvcj17cmdiVG9IZXgoY29sb3JTZXRzW2VkaXRpbmddLnNlbGVjdGVkQ29sb3IpfVxuICAgICAgICAgICAgICAgIG9uU2VsZWN0Q29sb3I9e3RoaXMuX29uU2VsZWN0Q29sb3J9XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICApfVxuICAgICAgICAgIDwvU3R5bGVkUGFuZWxEcm9wZG93bj5cbiAgICAgICAgKSA6IG51bGx9XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBvbkNsaWNrT3V0c2lkZShDb2xvclNlbGVjdG9yKTtcbiJdfQ==