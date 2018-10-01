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

var _taggedTemplateLiteral2 = require('babel-runtime/helpers/taggedTemplateLiteral');

var _taggedTemplateLiteral3 = _interopRequireDefault(_taggedTemplateLiteral2);

var _class, _temp2, _initialiseProps;

var _templateObject = (0, _taggedTemplateLiteral3.default)(['\n  ', ';\n'], ['\n  ', ';\n']),
    _templateObject2 = (0, _taggedTemplateLiteral3.default)(['\n  ', '\n'], ['\n  ', '\n']),
    _templateObject3 = (0, _taggedTemplateLiteral3.default)(['\n  position: absolute;\n  display: none;\n'], ['\n  position: absolute;\n  display: none;\n']),
    _templateObject4 = (0, _taggedTemplateLiteral3.default)(['\n  line-height: 0;\n  height: ', ';\n  margin-left: ', 'px;\n'], ['\n  line-height: 0;\n  height: ', ';\n  margin-left: ', 'px;\n']); // Copyright (c) 2018 Uber Technologies, Inc.
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

var _lodash = require('lodash.pick');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function noop() {}

var StyledSwitchInput = _styledComponents2.default.label(_templateObject, function (props) {
  return props.secondary ? props.theme.secondarySwitch : props.theme.inputSwitch;
});

var StyledCheckboxInput = _styledComponents2.default.label(_templateObject2, function (props) {
  return props.theme.inputCheckbox;
});

var HiddenInput = _styledComponents2.default.input(_templateObject3);

var StyledCheckbox = _styledComponents2.default.div(_templateObject4, function (props) {
  return props.theme.switchBtnHeight;
}, function (props) {
  return props.theme.switchLabelMargin;
});

var Checkbox = (_temp2 = _class = function (_Component) {
  (0, _inherits3.default)(Checkbox, _Component);

  function Checkbox() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, Checkbox);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Checkbox.__proto__ || Object.getPrototypeOf(Checkbox)).call.apply(_ref, [this].concat(args))), _this), _initialiseProps.call(_this), _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(Checkbox, [{
    key: 'render',
    value: function render() {
      var inputProps = (0, _extends3.default)({}, (0, _lodash2.default)(this.props, ['checked', 'disabled', 'id', 'onChange', 'value']), {
        type: 'checkbox',
        onFocus: this.handleFocus,
        onBlur: this.handleBlur
      });

      var labelProps = (0, _extends3.default)({}, (0, _lodash2.default)(this.props, ['checked', 'disabled', 'secondary']), {
        htmlFor: this.props.id
      });

      var LabelElement = this.props.type === 'checkbox' ? StyledCheckboxInput : StyledSwitchInput;
      return _react2.default.createElement(
        StyledCheckbox,
        { className: 'kg-checkbox' },
        _react2.default.createElement(HiddenInput, inputProps),
        _react2.default.createElement(
          LabelElement,
          (0, _extends3.default)({ className: 'kg-checkbox__label' }, labelProps),
          this.props.label
        )
      );
    }
  }]);
  return Checkbox;
}(_react.Component), _class.propTypes = {
  id: _propTypes2.default.string.isRequired,
  label: _propTypes2.default.node,
  value: _propTypes2.default.oneOf([true, false, 'indeterminate']),
  checked: _propTypes2.default.bool,
  disabled: _propTypes2.default.bool,

  error: _propTypes2.default.string,
  switch: _propTypes2.default.bool,
  activeColor: _propTypes2.default.string,
  secondary: _propTypes2.default.bool,
  onBlur: _propTypes2.default.func,
  onChange: _propTypes2.default.func,
  onFocus: _propTypes2.default.func
}, _class.defaultProps = {
  disabled: false,
  checked: false,
  onBlur: noop,
  onChange: noop,
  onFocus: noop,
  label: ''
}, _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this.state = {
    focused: false
  };

  this.handleFocus = function (args) {
    _this2.setState({ focused: true });
    _this2.props.onFocus(args);
  };

  this.handleBlur = function (args) {
    _this2.setState({ focused: false });
    _this2.props.onBlur(args);
  };
}, _temp2);
exports.default = Checkbox;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2NvbW1vbi9jaGVja2JveC5qcyJdLCJuYW1lcyI6WyJub29wIiwiU3R5bGVkU3dpdGNoSW5wdXQiLCJzdHlsZWQiLCJsYWJlbCIsInByb3BzIiwic2Vjb25kYXJ5IiwidGhlbWUiLCJzZWNvbmRhcnlTd2l0Y2giLCJpbnB1dFN3aXRjaCIsIlN0eWxlZENoZWNrYm94SW5wdXQiLCJpbnB1dENoZWNrYm94IiwiSGlkZGVuSW5wdXQiLCJpbnB1dCIsIlN0eWxlZENoZWNrYm94IiwiZGl2Iiwic3dpdGNoQnRuSGVpZ2h0Iiwic3dpdGNoTGFiZWxNYXJnaW4iLCJDaGVja2JveCIsImlucHV0UHJvcHMiLCJ0eXBlIiwib25Gb2N1cyIsImhhbmRsZUZvY3VzIiwib25CbHVyIiwiaGFuZGxlQmx1ciIsImxhYmVsUHJvcHMiLCJodG1sRm9yIiwiaWQiLCJMYWJlbEVsZW1lbnQiLCJDb21wb25lbnQiLCJwcm9wVHlwZXMiLCJQcm9wVHlwZXMiLCJzdHJpbmciLCJpc1JlcXVpcmVkIiwibm9kZSIsInZhbHVlIiwib25lT2YiLCJjaGVja2VkIiwiYm9vbCIsImRpc2FibGVkIiwiZXJyb3IiLCJzd2l0Y2giLCJhY3RpdmVDb2xvciIsImZ1bmMiLCJvbkNoYW5nZSIsImRlZmF1bHRQcm9wcyIsInN0YXRlIiwiZm9jdXNlZCIsInNldFN0YXRlIiwiYXJncyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O3FNQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7QUFFQSxTQUFTQSxJQUFULEdBQWdCLENBQUU7O0FBRWxCLElBQU1DLG9CQUFvQkMsMkJBQU9DLEtBQTNCLGtCQUNGO0FBQUEsU0FDQUMsTUFBTUMsU0FBTixHQUFrQkQsTUFBTUUsS0FBTixDQUFZQyxlQUE5QixHQUFnREgsTUFBTUUsS0FBTixDQUFZRSxXQUQ1RDtBQUFBLENBREUsQ0FBTjs7QUFLQSxJQUFNQyxzQkFBc0JQLDJCQUFPQyxLQUE3QixtQkFDRjtBQUFBLFNBQVNDLE1BQU1FLEtBQU4sQ0FBWUksYUFBckI7QUFBQSxDQURFLENBQU47O0FBSUEsSUFBTUMsY0FBY1QsMkJBQU9VLEtBQXJCLGtCQUFOOztBQUtBLElBQU1DLGlCQUFpQlgsMkJBQU9ZLEdBQXhCLG1CQUVNO0FBQUEsU0FBU1YsTUFBTUUsS0FBTixDQUFZUyxlQUFyQjtBQUFBLENBRk4sRUFHVztBQUFBLFNBQVNYLE1BQU1FLEtBQU4sQ0FBWVUsaUJBQXJCO0FBQUEsQ0FIWCxDQUFOOztJQU1xQkMsUTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs2QkF3Q1Y7QUFDUCxVQUFNQyx3Q0FDRCxzQkFBSyxLQUFLZCxLQUFWLEVBQWlCLENBQUMsU0FBRCxFQUFZLFVBQVosRUFBd0IsSUFBeEIsRUFBOEIsVUFBOUIsRUFBMEMsT0FBMUMsQ0FBakIsQ0FEQztBQUVKZSxjQUFNLFVBRkY7QUFHSkMsaUJBQVMsS0FBS0MsV0FIVjtBQUlKQyxnQkFBUSxLQUFLQztBQUpULFFBQU47O0FBT0EsVUFBTUMsd0NBQ0Qsc0JBQUssS0FBS3BCLEtBQVYsRUFBaUIsQ0FBQyxTQUFELEVBQVksVUFBWixFQUF3QixXQUF4QixDQUFqQixDQURDO0FBRUpxQixpQkFBUyxLQUFLckIsS0FBTCxDQUFXc0I7QUFGaEIsUUFBTjs7QUFLQSxVQUFNQyxlQUFlLEtBQUt2QixLQUFMLENBQVdlLElBQVgsS0FBb0IsVUFBcEIsR0FBaUNWLG1CQUFqQyxHQUF1RFIsaUJBQTVFO0FBQ0EsYUFDRTtBQUFDLHNCQUFEO0FBQUEsVUFBZ0IsV0FBVSxhQUExQjtBQUNFLHNDQUFDLFdBQUQsRUFBaUJpQixVQUFqQixDQURGO0FBRUU7QUFBQyxzQkFBRDtBQUFBLG1DQUFjLFdBQVUsb0JBQXhCLElBQWlETSxVQUFqRDtBQUNHLGVBQUtwQixLQUFMLENBQVdEO0FBRGQ7QUFGRixPQURGO0FBUUQ7OztFQTlEbUN5QixnQixVQUM3QkMsUyxHQUFZO0FBQ2pCSCxNQUFJSSxvQkFBVUMsTUFBVixDQUFpQkMsVUFESjtBQUVqQjdCLFNBQU8yQixvQkFBVUcsSUFGQTtBQUdqQkMsU0FBT0osb0JBQVVLLEtBQVYsQ0FBZ0IsQ0FBQyxJQUFELEVBQU8sS0FBUCxFQUFjLGVBQWQsQ0FBaEIsQ0FIVTtBQUlqQkMsV0FBU04sb0JBQVVPLElBSkY7QUFLakJDLFlBQVVSLG9CQUFVTyxJQUxIOztBQU9qQkUsU0FBT1Qsb0JBQVVDLE1BUEE7QUFRakJTLFVBQVFWLG9CQUFVTyxJQVJEO0FBU2pCSSxlQUFhWCxvQkFBVUMsTUFUTjtBQVVqQjFCLGFBQVd5QixvQkFBVU8sSUFWSjtBQVdqQmYsVUFBUVEsb0JBQVVZLElBWEQ7QUFZakJDLFlBQVViLG9CQUFVWSxJQVpIO0FBYWpCdEIsV0FBU1Usb0JBQVVZO0FBYkYsQyxTQWdCWkUsWSxHQUFlO0FBQ3BCTixZQUFVLEtBRFU7QUFFcEJGLFdBQVMsS0FGVztBQUdwQmQsVUFBUXRCLElBSFk7QUFJcEIyQyxZQUFVM0MsSUFKVTtBQUtwQm9CLFdBQVNwQixJQUxXO0FBTXBCRyxTQUFPO0FBTmEsQzs7O09BU3RCMEMsSyxHQUFRO0FBQ05DLGFBQVM7QUFESCxHOztPQUlSekIsVyxHQUFjLGdCQUFRO0FBQ3BCLFdBQUswQixRQUFMLENBQWMsRUFBQ0QsU0FBUyxJQUFWLEVBQWQ7QUFDQSxXQUFLMUMsS0FBTCxDQUFXZ0IsT0FBWCxDQUFtQjRCLElBQW5CO0FBQ0QsRzs7T0FFRHpCLFUsR0FBYSxnQkFBUTtBQUNuQixXQUFLd0IsUUFBTCxDQUFjLEVBQUNELFNBQVMsS0FBVixFQUFkO0FBQ0EsV0FBSzFDLEtBQUwsQ0FBV2tCLE1BQVgsQ0FBa0IwQixJQUFsQjtBQUNELEc7O2tCQXRDa0IvQixRIiwiZmlsZSI6ImNoZWNrYm94LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSAyMDE4IFViZXIgVGVjaG5vbG9naWVzLCBJbmMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuLy8gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuLy8gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuLy8gdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuLy8gY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4vLyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4vLyBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4vLyBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbi8vIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuLy8gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuLy8gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbi8vIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbi8vIFRIRSBTT0ZUV0FSRS5cblxuaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50fSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHN0eWxlZCBmcm9tICdzdHlsZWQtY29tcG9uZW50cyc7XG5pbXBvcnQgcGljayBmcm9tICdsb2Rhc2gucGljayc7XG5cbmZ1bmN0aW9uIG5vb3AoKSB7fVxuXG5jb25zdCBTdHlsZWRTd2l0Y2hJbnB1dCA9IHN0eWxlZC5sYWJlbGBcbiAgJHtwcm9wcyA9PlxuICAgIHByb3BzLnNlY29uZGFyeSA/IHByb3BzLnRoZW1lLnNlY29uZGFyeVN3aXRjaCA6IHByb3BzLnRoZW1lLmlucHV0U3dpdGNofTtcbmA7XG5cbmNvbnN0IFN0eWxlZENoZWNrYm94SW5wdXQgPSBzdHlsZWQubGFiZWxgXG4gICR7cHJvcHMgPT4gcHJvcHMudGhlbWUuaW5wdXRDaGVja2JveH1cbmA7XG5cbmNvbnN0IEhpZGRlbklucHV0ID0gc3R5bGVkLmlucHV0YFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIGRpc3BsYXk6IG5vbmU7XG5gO1xuXG5jb25zdCBTdHlsZWRDaGVja2JveCA9IHN0eWxlZC5kaXZgXG4gIGxpbmUtaGVpZ2h0OiAwO1xuICBoZWlnaHQ6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUuc3dpdGNoQnRuSGVpZ2h0fTtcbiAgbWFyZ2luLWxlZnQ6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUuc3dpdGNoTGFiZWxNYXJnaW59cHg7XG5gO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDaGVja2JveCBleHRlbmRzIENvbXBvbmVudCB7XG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgaWQ6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICBsYWJlbDogUHJvcFR5cGVzLm5vZGUsXG4gICAgdmFsdWU6IFByb3BUeXBlcy5vbmVPZihbdHJ1ZSwgZmFsc2UsICdpbmRldGVybWluYXRlJ10pLFxuICAgIGNoZWNrZWQ6IFByb3BUeXBlcy5ib29sLFxuICAgIGRpc2FibGVkOiBQcm9wVHlwZXMuYm9vbCxcblxuICAgIGVycm9yOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIHN3aXRjaDogUHJvcFR5cGVzLmJvb2wsXG4gICAgYWN0aXZlQ29sb3I6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgc2Vjb25kYXJ5OiBQcm9wVHlwZXMuYm9vbCxcbiAgICBvbkJsdXI6IFByb3BUeXBlcy5mdW5jLFxuICAgIG9uQ2hhbmdlOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBvbkZvY3VzOiBQcm9wVHlwZXMuZnVuY1xuICB9O1xuXG4gIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgZGlzYWJsZWQ6IGZhbHNlLFxuICAgIGNoZWNrZWQ6IGZhbHNlLFxuICAgIG9uQmx1cjogbm9vcCxcbiAgICBvbkNoYW5nZTogbm9vcCxcbiAgICBvbkZvY3VzOiBub29wLFxuICAgIGxhYmVsOiAnJ1xuICB9O1xuXG4gIHN0YXRlID0ge1xuICAgIGZvY3VzZWQ6IGZhbHNlXG4gIH07XG5cbiAgaGFuZGxlRm9jdXMgPSBhcmdzID0+IHtcbiAgICB0aGlzLnNldFN0YXRlKHtmb2N1c2VkOiB0cnVlfSk7XG4gICAgdGhpcy5wcm9wcy5vbkZvY3VzKGFyZ3MpO1xuICB9O1xuXG4gIGhhbmRsZUJsdXIgPSBhcmdzID0+IHtcbiAgICB0aGlzLnNldFN0YXRlKHtmb2N1c2VkOiBmYWxzZX0pO1xuICAgIHRoaXMucHJvcHMub25CbHVyKGFyZ3MpO1xuICB9O1xuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCBpbnB1dFByb3BzID0ge1xuICAgICAgLi4ucGljayh0aGlzLnByb3BzLCBbJ2NoZWNrZWQnLCAnZGlzYWJsZWQnLCAnaWQnLCAnb25DaGFuZ2UnLCAndmFsdWUnXSksXG4gICAgICB0eXBlOiAnY2hlY2tib3gnLFxuICAgICAgb25Gb2N1czogdGhpcy5oYW5kbGVGb2N1cyxcbiAgICAgIG9uQmx1cjogdGhpcy5oYW5kbGVCbHVyXG4gICAgfTtcblxuICAgIGNvbnN0IGxhYmVsUHJvcHMgPSB7XG4gICAgICAuLi5waWNrKHRoaXMucHJvcHMsIFsnY2hlY2tlZCcsICdkaXNhYmxlZCcsICdzZWNvbmRhcnknXSksXG4gICAgICBodG1sRm9yOiB0aGlzLnByb3BzLmlkXG4gICAgfTtcblxuICAgIGNvbnN0IExhYmVsRWxlbWVudCA9IHRoaXMucHJvcHMudHlwZSA9PT0gJ2NoZWNrYm94JyA/IFN0eWxlZENoZWNrYm94SW5wdXQgOiBTdHlsZWRTd2l0Y2hJbnB1dDtcbiAgICByZXR1cm4gKFxuICAgICAgPFN0eWxlZENoZWNrYm94IGNsYXNzTmFtZT1cImtnLWNoZWNrYm94XCI+XG4gICAgICAgIDxIaWRkZW5JbnB1dCB7Li4uaW5wdXRQcm9wc30gLz5cbiAgICAgICAgPExhYmVsRWxlbWVudCBjbGFzc05hbWU9XCJrZy1jaGVja2JveF9fbGFiZWxcIiB7Li4ubGFiZWxQcm9wc30+XG4gICAgICAgICAge3RoaXMucHJvcHMubGFiZWx9XG4gICAgICAgIDwvTGFiZWxFbGVtZW50PlxuICAgICAgPC9TdHlsZWRDaGVja2JveD5cbiAgICApO1xuICB9XG59XG4iXX0=