'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _taggedTemplateLiteral2 = require('babel-runtime/helpers/taggedTemplateLiteral');

var _taggedTemplateLiteral3 = _interopRequireDefault(_taggedTemplateLiteral2);

var _templateObject = (0, _taggedTemplateLiteral3.default)(['\n  display: flex;\n  justify-content: space-between;\n  \n  .vis-config-switch__title {\n    display: flex;\n  }\n'], ['\n  display: flex;\n  justify-content: space-between;\n  \n  .vis-config-switch__title {\n    display: flex;\n  }\n']); // Copyright (c) 2018 Uber Technologies, Inc.
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

var _infoHelper = require('../../common/info-helper');

var _infoHelper2 = _interopRequireDefault(_infoHelper);

var _switch = require('../../common/switch');

var _switch2 = _interopRequireDefault(_switch);

var _styledComponents3 = require('../../common/styled-components');

var _utils = require('../../../utils/utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var propTypes = {
  layer: _propTypes2.default.object.isRequired,
  property: _propTypes2.default.string.isRequired,
  onChange: _propTypes2.default.func.isRequired,
  label: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.bool, _propTypes2.default.func]),
  description: _propTypes2.default.string,
  disabled: _propTypes2.default.bool
};

var StyledVisConfigSwitch = _styledComponents2.default.div(_templateObject);

var VisConfigSwitch = function VisConfigSwitch(_ref) {
  var _ref$layer = _ref.layer,
      id = _ref$layer.id,
      config = _ref$layer.config,
      property = _ref.property,
      _onChange2 = _ref.onChange,
      label = _ref.label,
      description = _ref.description,
      disabled = _ref.disabled;
  return _react2.default.createElement(
    _styledComponents3.SidePanelSection,
    { disabled: Boolean(disabled) },
    _react2.default.createElement(
      StyledVisConfigSwitch,
      { className: 'vis-config-switch' },
      _react2.default.createElement(
        'div',
        { className: 'vis-config-switch__title' },
        label ? _react2.default.createElement(
          _styledComponents3.PanelLabel,
          null,
          label || (0, _utils.capitalizeFirstLetter)(property)
        ) : null,
        description ? _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(_infoHelper2.default, { description: description, id: id + '-' + property })
        ) : null
      ),
      _react2.default.createElement(
        'div',
        { className: 'vis-config-switch__switch' },
        _react2.default.createElement(_switch2.default, {
          checked: config.visConfig[property],
          id: id + '-' + property,
          onChange: function onChange() {
            return _onChange2((0, _defineProperty3.default)({}, property, !config.visConfig[property]));
          }
        })
      )
    )
  );
};

VisConfigSwitch.propTypes = propTypes;

exports.default = VisConfigSwitch;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3NpZGUtcGFuZWwvbGF5ZXItcGFuZWwvdmlzLWNvbmZpZy1zd2l0Y2guanMiXSwibmFtZXMiOlsicHJvcFR5cGVzIiwibGF5ZXIiLCJQcm9wVHlwZXMiLCJvYmplY3QiLCJpc1JlcXVpcmVkIiwicHJvcGVydHkiLCJzdHJpbmciLCJvbkNoYW5nZSIsImZ1bmMiLCJsYWJlbCIsIm9uZU9mVHlwZSIsImJvb2wiLCJkZXNjcmlwdGlvbiIsImRpc2FibGVkIiwiU3R5bGVkVmlzQ29uZmlnU3dpdGNoIiwic3R5bGVkIiwiZGl2IiwiVmlzQ29uZmlnU3dpdGNoIiwiaWQiLCJjb25maWciLCJCb29sZWFuIiwidmlzQ29uZmlnIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs4U0FBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFFQSxJQUFNQSxZQUFZO0FBQ2hCQyxTQUFPQyxvQkFBVUMsTUFBVixDQUFpQkMsVUFEUjtBQUVoQkMsWUFBVUgsb0JBQVVJLE1BQVYsQ0FBaUJGLFVBRlg7QUFHaEJHLFlBQVVMLG9CQUFVTSxJQUFWLENBQWVKLFVBSFQ7QUFJaEJLLFNBQU9QLG9CQUFVUSxTQUFWLENBQW9CLENBQ3pCUixvQkFBVUksTUFEZSxFQUV6Qkosb0JBQVVTLElBRmUsRUFHekJULG9CQUFVTSxJQUhlLENBQXBCLENBSlM7QUFTaEJJLGVBQWFWLG9CQUFVSSxNQVRQO0FBVWhCTyxZQUFVWCxvQkFBVVM7QUFWSixDQUFsQjs7QUFhQSxJQUFNRyx3QkFBd0JDLDJCQUFPQyxHQUEvQixpQkFBTjs7QUFTQSxJQUFNQyxrQkFBa0IsU0FBbEJBLGVBQWtCO0FBQUEsd0JBQ3RCaEIsS0FEc0I7QUFBQSxNQUNkaUIsRUFEYyxjQUNkQSxFQURjO0FBQUEsTUFDVkMsTUFEVSxjQUNWQSxNQURVO0FBQUEsTUFFdEJkLFFBRnNCLFFBRXRCQSxRQUZzQjtBQUFBLE1BR3RCRSxVQUhzQixRQUd0QkEsUUFIc0I7QUFBQSxNQUl0QkUsS0FKc0IsUUFJdEJBLEtBSnNCO0FBQUEsTUFLdEJHLFdBTHNCLFFBS3RCQSxXQUxzQjtBQUFBLE1BTXRCQyxRQU5zQixRQU10QkEsUUFOc0I7QUFBQSxTQVF0QjtBQUFDLHVDQUFEO0FBQUEsTUFBa0IsVUFBVU8sUUFBUVAsUUFBUixDQUE1QjtBQUNFO0FBQUMsMkJBQUQ7QUFBQSxRQUF1QixXQUFVLG1CQUFqQztBQUNFO0FBQUE7QUFBQSxVQUFLLFdBQVUsMEJBQWY7QUFDR0osZ0JBQVE7QUFBQyx1Q0FBRDtBQUFBO0FBQWFBLG1CQUFTLGtDQUFzQkosUUFBdEI7QUFBdEIsU0FBUixHQUE4RSxJQURqRjtBQUVHTyxzQkFDQztBQUFBO0FBQUE7QUFDRSx3Q0FBQyxvQkFBRCxJQUFZLGFBQWFBLFdBQXpCLEVBQXNDLElBQU9NLEVBQVAsU0FBYWIsUUFBbkQ7QUFERixTQURELEdBSUc7QUFOTixPQURGO0FBU0U7QUFBQTtBQUFBLFVBQUssV0FBVSwyQkFBZjtBQUNFLHNDQUFDLGdCQUFEO0FBQ0UsbUJBQVNjLE9BQU9FLFNBQVAsQ0FBaUJoQixRQUFqQixDQURYO0FBRUUsY0FBT2EsRUFBUCxTQUFhYixRQUZmO0FBR0Usb0JBQVU7QUFBQSxtQkFBTUUsNkNBQVdGLFFBQVgsRUFBc0IsQ0FBQ2MsT0FBT0UsU0FBUCxDQUFpQmhCLFFBQWpCLENBQXZCLEVBQU47QUFBQTtBQUhaO0FBREY7QUFURjtBQURGLEdBUnNCO0FBQUEsQ0FBeEI7O0FBNkJBWSxnQkFBZ0JqQixTQUFoQixHQUE0QkEsU0FBNUI7O2tCQUVlaUIsZSIsImZpbGUiOiJ2aXMtY29uZmlnLXN3aXRjaC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgMjAxOCBVYmVyIFRlY2hub2xvZ2llcywgSW5jLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbi8vIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbi8vIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbi8vIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbi8vIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuLy8gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuLy8gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4vLyBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbi8vIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbi8vIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4vLyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4vLyBUSEUgU09GVFdBUkUuXG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHN0eWxlZCBmcm9tICdzdHlsZWQtY29tcG9uZW50cyc7XG5pbXBvcnQgSW5mb0hlbHBlciBmcm9tICdjb21wb25lbnRzL2NvbW1vbi9pbmZvLWhlbHBlcic7XG5pbXBvcnQgU3dpdGNoIGZyb20gJ2NvbXBvbmVudHMvY29tbW9uL3N3aXRjaCc7XG5pbXBvcnQge1NpZGVQYW5lbFNlY3Rpb24sIFBhbmVsTGFiZWx9IGZyb20gJ2NvbXBvbmVudHMvY29tbW9uL3N0eWxlZC1jb21wb25lbnRzJztcbmltcG9ydCB7Y2FwaXRhbGl6ZUZpcnN0TGV0dGVyfSBmcm9tICd1dGlscy91dGlscyc7XG5cbmNvbnN0IHByb3BUeXBlcyA9IHtcbiAgbGF5ZXI6IFByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcbiAgcHJvcGVydHk6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgb25DaGFuZ2U6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gIGxhYmVsOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtcbiAgICBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIFByb3BUeXBlcy5ib29sLFxuICAgIFByb3BUeXBlcy5mdW5jXG4gIF0pLFxuICBkZXNjcmlwdGlvbjogUHJvcFR5cGVzLnN0cmluZyxcbiAgZGlzYWJsZWQ6IFByb3BUeXBlcy5ib29sXG59O1xuXG5jb25zdCBTdHlsZWRWaXNDb25maWdTd2l0Y2ggPSBzdHlsZWQuZGl2YFxuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gIFxuICAudmlzLWNvbmZpZy1zd2l0Y2hfX3RpdGxlIHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICB9XG5gO1xuXG5jb25zdCBWaXNDb25maWdTd2l0Y2ggPSAoe1xuICBsYXllcjoge2lkLCBjb25maWd9LFxuICBwcm9wZXJ0eSxcbiAgb25DaGFuZ2UsXG4gIGxhYmVsLFxuICBkZXNjcmlwdGlvbixcbiAgZGlzYWJsZWRcbn0pID0+IChcbiAgPFNpZGVQYW5lbFNlY3Rpb24gZGlzYWJsZWQ9e0Jvb2xlYW4oZGlzYWJsZWQpfT5cbiAgICA8U3R5bGVkVmlzQ29uZmlnU3dpdGNoIGNsYXNzTmFtZT1cInZpcy1jb25maWctc3dpdGNoXCI+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInZpcy1jb25maWctc3dpdGNoX190aXRsZVwiPlxuICAgICAgICB7bGFiZWwgPyA8UGFuZWxMYWJlbD57bGFiZWwgfHwgY2FwaXRhbGl6ZUZpcnN0TGV0dGVyKHByb3BlcnR5KX08L1BhbmVsTGFiZWw+IDogbnVsbH1cbiAgICAgICAge2Rlc2NyaXB0aW9uID8gKFxuICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICA8SW5mb0hlbHBlciBkZXNjcmlwdGlvbj17ZGVzY3JpcHRpb259IGlkPXtgJHtpZH0tJHtwcm9wZXJ0eX1gfSAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICApIDogbnVsbH1cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJ2aXMtY29uZmlnLXN3aXRjaF9fc3dpdGNoXCI+XG4gICAgICAgIDxTd2l0Y2hcbiAgICAgICAgICBjaGVja2VkPXtjb25maWcudmlzQ29uZmlnW3Byb3BlcnR5XX1cbiAgICAgICAgICBpZD17YCR7aWR9LSR7cHJvcGVydHl9YH1cbiAgICAgICAgICBvbkNoYW5nZT17KCkgPT4gb25DaGFuZ2Uoe1twcm9wZXJ0eV06ICFjb25maWcudmlzQ29uZmlnW3Byb3BlcnR5XX0pfVxuICAgICAgICAvPlxuICAgICAgPC9kaXY+XG4gICAgPC9TdHlsZWRWaXNDb25maWdTd2l0Y2g+XG4gIDwvU2lkZVBhbmVsU2VjdGlvbj5cbik7XG5cblZpc0NvbmZpZ1N3aXRjaC5wcm9wVHlwZXMgPSBwcm9wVHlwZXM7XG5cbmV4cG9ydCBkZWZhdWx0IFZpc0NvbmZpZ1N3aXRjaDtcbiJdfQ==