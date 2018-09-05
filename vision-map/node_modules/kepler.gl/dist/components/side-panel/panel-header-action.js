'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

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

var _taggedTemplateLiteral2 = require('babel-runtime/helpers/taggedTemplateLiteral');

var _taggedTemplateLiteral3 = _interopRequireDefault(_taggedTemplateLiteral2);

var _class, _temp;

var _templateObject = (0, _taggedTemplateLiteral3.default)(['\n  margin-left: ', 'px;\n  display: flex;\n  align-items: center;\n  color: ', ';\n\n  :hover {\n    cursor: pointer;\n    color: ', ';\n  }\n\n  &.disabled {\n    pointer-events: none;\n    opacity: 0.3;\n  }\n'], ['\n  margin-left: ', 'px;\n  display: flex;\n  align-items: center;\n  color: ', ';\n\n  :hover {\n    cursor: pointer;\n    color: ', ';\n  }\n\n  &.disabled {\n    pointer-events: none;\n    opacity: 0.3;\n  }\n']); // Copyright (c) 2018 Uber Technologies, Inc.
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

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _styledComponents3 = require('../common/styled-components');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var HeaderActionWrapper = _styledComponents2.default.div(_templateObject, function (props) {
  return props.flush ? 0 : 8;
}, function (props) {
  return props.active ? props.theme.panelHeaderIconActive : props.theme.panelHeaderIcon;
}, function (props) {
  return props.hoverColor ? props.theme[props.hoverColor] : props.theme.textColorHl;
});

// Need to use react class to access props.component
var PanelHeaderAction = (_temp = _class = function (_Component) {
  (0, _inherits3.default)(PanelHeaderAction, _Component);

  function PanelHeaderAction() {
    (0, _classCallCheck3.default)(this, PanelHeaderAction);
    return (0, _possibleConstructorReturn3.default)(this, (PanelHeaderAction.__proto__ || Object.getPrototypeOf(PanelHeaderAction)).apply(this, arguments));
  }

  (0, _createClass3.default)(PanelHeaderAction, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          onClick = _props.onClick,
          tooltip = _props.tooltip,
          id = _props.id,
          active = _props.active,
          flush = _props.flush,
          hoverColor = _props.hoverColor,
          tooltipType = _props.tooltipType,
          disabled = _props.disabled,
          className = _props.className;

      return _react2.default.createElement(
        HeaderActionWrapper,
        {
          className: (0, _classnames3.default)('panel--header__action', (0, _defineProperty3.default)({ disabled: disabled }, className, className)),
          active: active,
          hoverColor: hoverColor,
          flush: flush
        },
        _react2.default.createElement(this.props.IconComponent, {
          'data-tip': true,
          'data-for': tooltip + '_' + id,
          height: '18px',
          onClick: onClick
        }),
        tooltip ? _react2.default.createElement(
          _styledComponents3.Tooltip,
          {
            id: tooltip + '_' + id,
            effect: 'solid',
            delayShow: 500,
            type: tooltipType
          },
          _react2.default.createElement(
            'span',
            null,
            tooltip
          )
        ) : null
      );
    }
  }]);
  return PanelHeaderAction;
}(_react.Component), _class.propTypes = {
  id: _propTypes2.default.string,
  flush: _propTypes2.default.bool,
  tooltip: _propTypes2.default.string,
  onClick: _propTypes2.default.func,
  active: _propTypes2.default.bool,
  disabled: _propTypes2.default.bool,
  hoverColor: _propTypes2.default.string,
  className: _propTypes2.default.string,
  tooltipType: _propTypes2.default.string
}, _class.defaultProps = {
  onClick: function onClick() {},
  hoverColor: null,
  active: false
}, _temp);
exports.default = PanelHeaderAction;
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3NpZGUtcGFuZWwvcGFuZWwtaGVhZGVyLWFjdGlvbi5qcyJdLCJuYW1lcyI6WyJIZWFkZXJBY3Rpb25XcmFwcGVyIiwic3R5bGVkIiwiZGl2IiwicHJvcHMiLCJmbHVzaCIsImFjdGl2ZSIsInRoZW1lIiwicGFuZWxIZWFkZXJJY29uQWN0aXZlIiwicGFuZWxIZWFkZXJJY29uIiwiaG92ZXJDb2xvciIsInRleHRDb2xvckhsIiwiUGFuZWxIZWFkZXJBY3Rpb24iLCJvbkNsaWNrIiwidG9vbHRpcCIsImlkIiwidG9vbHRpcFR5cGUiLCJkaXNhYmxlZCIsImNsYXNzTmFtZSIsIkNvbXBvbmVudCIsInByb3BUeXBlcyIsIlByb3BUeXBlcyIsInN0cmluZyIsImJvb2wiLCJmdW5jIiwiZGVmYXVsdFByb3BzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Z2ZBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUVBLElBQU1BLHNCQUFzQkMsMkJBQU9DLEdBQTdCLGtCQUNXO0FBQUEsU0FBVUMsTUFBTUMsS0FBTixHQUFjLENBQWQsR0FBa0IsQ0FBNUI7QUFBQSxDQURYLEVBSUs7QUFBQSxTQUNQRCxNQUFNRSxNQUFOLEdBQ0lGLE1BQU1HLEtBQU4sQ0FBWUMscUJBRGhCLEdBRUlKLE1BQU1HLEtBQU4sQ0FBWUUsZUFIVDtBQUFBLENBSkwsRUFXTztBQUFBLFNBQ1BMLE1BQU1NLFVBQU4sR0FDSU4sTUFBTUcsS0FBTixDQUFZSCxNQUFNTSxVQUFsQixDQURKLEdBRUlOLE1BQU1HLEtBQU4sQ0FBWUksV0FIVDtBQUFBLENBWFAsQ0FBTjs7QUF1QkE7SUFDcUJDLGlCOzs7Ozs7Ozs7OzZCQW1CVjtBQUFBLG1CQVdILEtBQUtSLEtBWEY7QUFBQSxVQUVMUyxPQUZLLFVBRUxBLE9BRks7QUFBQSxVQUdMQyxPQUhLLFVBR0xBLE9BSEs7QUFBQSxVQUlMQyxFQUpLLFVBSUxBLEVBSks7QUFBQSxVQUtMVCxNQUxLLFVBS0xBLE1BTEs7QUFBQSxVQU1MRCxLQU5LLFVBTUxBLEtBTks7QUFBQSxVQU9MSyxVQVBLLFVBT0xBLFVBUEs7QUFBQSxVQVFMTSxXQVJLLFVBUUxBLFdBUks7QUFBQSxVQVNMQyxRQVRLLFVBU0xBLFFBVEs7QUFBQSxVQVVMQyxTQVZLLFVBVUxBLFNBVks7O0FBWVAsYUFDRTtBQUFDLDJCQUFEO0FBQUE7QUFDRSxxQkFBVywwQkFBVyx1QkFBWCxrQ0FBcUNELGtCQUFyQyxJQUFnREMsU0FBaEQsRUFBNERBLFNBQTVELEVBRGI7QUFFRSxrQkFBUVosTUFGVjtBQUdFLHNCQUFZSSxVQUhkO0FBSUUsaUJBQU9MO0FBSlQ7QUFNRSwyQ0FBTSxLQUFOLENBQVksYUFBWjtBQUNFLDBCQURGO0FBRUUsc0JBQWFTLE9BQWIsU0FBd0JDLEVBRjFCO0FBR0Usa0JBQU8sTUFIVDtBQUlFLG1CQUFTRjtBQUpYLFVBTkY7QUFZR0Msa0JBQ0M7QUFBQyxvQ0FBRDtBQUFBO0FBQ0UsZ0JBQU9BLE9BQVAsU0FBa0JDLEVBRHBCO0FBRUUsb0JBQU8sT0FGVDtBQUdFLHVCQUFXLEdBSGI7QUFJRSxrQkFBTUM7QUFKUjtBQU1FO0FBQUE7QUFBQTtBQUFPRjtBQUFQO0FBTkYsU0FERCxHQVNHO0FBckJOLE9BREY7QUF5QkQ7OztFQXhENENLLGdCLFVBQ3RDQyxTLEdBQVk7QUFDakJMLE1BQUlNLG9CQUFVQyxNQURHO0FBRWpCakIsU0FBT2dCLG9CQUFVRSxJQUZBO0FBR2pCVCxXQUFTTyxvQkFBVUMsTUFIRjtBQUlqQlQsV0FBU1Esb0JBQVVHLElBSkY7QUFLakJsQixVQUFRZSxvQkFBVUUsSUFMRDtBQU1qQk4sWUFBVUksb0JBQVVFLElBTkg7QUFPakJiLGNBQVlXLG9CQUFVQyxNQVBMO0FBUWpCSixhQUFXRyxvQkFBVUMsTUFSSjtBQVNqQk4sZUFBYUssb0JBQVVDO0FBVE4sQyxTQVlaRyxZLEdBQWU7QUFDcEJaLFdBQVMsbUJBQU0sQ0FBRSxDQURHO0FBRXBCSCxjQUFZLElBRlE7QUFHcEJKLFVBQVE7QUFIWSxDO2tCQWJITSxpQjtBQXlEcEIiLCJmaWxlIjoicGFuZWwtaGVhZGVyLWFjdGlvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgMjAxOCBVYmVyIFRlY2hub2xvZ2llcywgSW5jLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbi8vIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbi8vIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbi8vIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbi8vIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuLy8gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuLy8gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4vLyBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbi8vIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbi8vIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4vLyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4vLyBUSEUgU09GVFdBUkUuXG5cbmltcG9ydCBSZWFjdCwge0NvbXBvbmVudH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCBjbGFzc25hbWVzIGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0IHN0eWxlZCBmcm9tICdzdHlsZWQtY29tcG9uZW50cyc7XG5pbXBvcnQge1Rvb2x0aXB9IGZyb20gJ2NvbXBvbmVudHMvY29tbW9uL3N0eWxlZC1jb21wb25lbnRzJztcblxuY29uc3QgSGVhZGVyQWN0aW9uV3JhcHBlciA9IHN0eWxlZC5kaXZgXG4gIG1hcmdpbi1sZWZ0OiAke3Byb3BzID0+IChwcm9wcy5mbHVzaCA/IDAgOiA4KX1weDtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgY29sb3I6ICR7cHJvcHMgPT5cbiAgICBwcm9wcy5hY3RpdmVcbiAgICAgID8gcHJvcHMudGhlbWUucGFuZWxIZWFkZXJJY29uQWN0aXZlXG4gICAgICA6IHByb3BzLnRoZW1lLnBhbmVsSGVhZGVySWNvbn07XG5cbiAgOmhvdmVyIHtcbiAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgY29sb3I6ICR7cHJvcHMgPT5cbiAgICAgIHByb3BzLmhvdmVyQ29sb3JcbiAgICAgICAgPyBwcm9wcy50aGVtZVtwcm9wcy5ob3ZlckNvbG9yXVxuICAgICAgICA6IHByb3BzLnRoZW1lLnRleHRDb2xvckhsfTtcbiAgfVxuXG4gICYuZGlzYWJsZWQge1xuICAgIHBvaW50ZXItZXZlbnRzOiBub25lO1xuICAgIG9wYWNpdHk6IDAuMztcbiAgfVxuYDtcblxuLy8gTmVlZCB0byB1c2UgcmVhY3QgY2xhc3MgdG8gYWNjZXNzIHByb3BzLmNvbXBvbmVudFxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGFuZWxIZWFkZXJBY3Rpb24gZXh0ZW5kcyBDb21wb25lbnQge1xuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIGlkOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGZsdXNoOiBQcm9wVHlwZXMuYm9vbCxcbiAgICB0b29sdGlwOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIG9uQ2xpY2s6IFByb3BUeXBlcy5mdW5jLFxuICAgIGFjdGl2ZTogUHJvcFR5cGVzLmJvb2wsXG4gICAgZGlzYWJsZWQ6IFByb3BUeXBlcy5ib29sLFxuICAgIGhvdmVyQ29sb3I6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgY2xhc3NOYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIHRvb2x0aXBUeXBlOiBQcm9wVHlwZXMuc3RyaW5nXG4gIH07XG5cbiAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICBvbkNsaWNrOiAoKSA9PiB7fSxcbiAgICBob3ZlckNvbG9yOiBudWxsLFxuICAgIGFjdGl2ZTogZmFsc2VcbiAgfTtcblxuICByZW5kZXIoKSB7XG4gICAgY29uc3Qge1xuICAgICAgb25DbGljayxcbiAgICAgIHRvb2x0aXAsXG4gICAgICBpZCxcbiAgICAgIGFjdGl2ZSxcbiAgICAgIGZsdXNoLFxuICAgICAgaG92ZXJDb2xvcixcbiAgICAgIHRvb2x0aXBUeXBlLFxuICAgICAgZGlzYWJsZWQsXG4gICAgICBjbGFzc05hbWVcbiAgICB9ID0gdGhpcy5wcm9wcztcbiAgICByZXR1cm4gKFxuICAgICAgPEhlYWRlckFjdGlvbldyYXBwZXJcbiAgICAgICAgY2xhc3NOYW1lPXtjbGFzc25hbWVzKCdwYW5lbC0taGVhZGVyX19hY3Rpb24nLCB7ZGlzYWJsZWQsIFtjbGFzc05hbWVdOiBjbGFzc05hbWV9KX1cbiAgICAgICAgYWN0aXZlPXthY3RpdmV9XG4gICAgICAgIGhvdmVyQ29sb3I9e2hvdmVyQ29sb3J9XG4gICAgICAgIGZsdXNoPXtmbHVzaH1cbiAgICAgID5cbiAgICAgICAgPHRoaXMucHJvcHMuSWNvbkNvbXBvbmVudFxuICAgICAgICAgIGRhdGEtdGlwXG4gICAgICAgICAgZGF0YS1mb3I9e2Ake3Rvb2x0aXB9XyR7aWR9YH1cbiAgICAgICAgICBoZWlnaHQ9XCIxOHB4XCJcbiAgICAgICAgICBvbkNsaWNrPXtvbkNsaWNrfVxuICAgICAgICAvPlxuICAgICAgICB7dG9vbHRpcCA/IChcbiAgICAgICAgICA8VG9vbHRpcFxuICAgICAgICAgICAgaWQ9e2Ake3Rvb2x0aXB9XyR7aWR9YH1cbiAgICAgICAgICAgIGVmZmVjdD1cInNvbGlkXCJcbiAgICAgICAgICAgIGRlbGF5U2hvdz17NTAwfVxuICAgICAgICAgICAgdHlwZT17dG9vbHRpcFR5cGV9XG4gICAgICAgICAgPlxuICAgICAgICAgICAgPHNwYW4+e3Rvb2x0aXB9PC9zcGFuPlxuICAgICAgICAgIDwvVG9vbHRpcD5cbiAgICAgICAgKSA6IG51bGx9XG4gICAgICA8L0hlYWRlckFjdGlvbldyYXBwZXI+XG4gICAgKTtcbiAgfVxufTtcbiJdfQ==