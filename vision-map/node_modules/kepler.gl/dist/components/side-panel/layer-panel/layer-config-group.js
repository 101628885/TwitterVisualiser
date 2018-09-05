'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StyledConfigGroupHeader = exports.StyledLayerConfigGroup = exports.StyledLayerConfigGroupLabel = undefined;

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _taggedTemplateLiteral2 = require('babel-runtime/helpers/taggedTemplateLiteral');

var _taggedTemplateLiteral3 = _interopRequireDefault(_taggedTemplateLiteral2);

var _templateObject = (0, _taggedTemplateLiteral3.default)(['\n  border-left: 2px solid ', ';\n  color: ', ';\n  font-size: 12px;\n  font-weight: 500;\n  line-height: 12px;\n  margin-left: -12px;\n  padding-left: 10px;\n  text-transform: capitalize;\n  letter-spacing: 0.2px;\n'], ['\n  border-left: 2px solid ', ';\n  color: ', ';\n  font-size: 12px;\n  font-weight: 500;\n  line-height: 12px;\n  margin-left: -12px;\n  padding-left: 10px;\n  text-transform: capitalize;\n  letter-spacing: 0.2px;\n']),
    _templateObject2 = (0, _taggedTemplateLiteral3.default)(['\n  padding-left: 18px;\n  margin-bottom: 18px;\n\n'], ['\n  padding-left: 18px;\n  margin-bottom: 18px;\n\n']),
    _templateObject3 = (0, _taggedTemplateLiteral3.default)(['\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 12px;\n'], ['\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 12px;\n']),
    _templateObject4 = (0, _taggedTemplateLiteral3.default)(['\n  &.disabled {\n    opacity: 0.3;\n    pointer-events: none;\n    * {\n      pointer-events: none;\n    }\n  }\n'], ['\n  &.disabled {\n    opacity: 0.3;\n    pointer-events: none;\n    * {\n      pointer-events: none;\n    }\n  }\n']); // Copyright (c) 2018 Uber Technologies, Inc.
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

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _switch = require('../../common/switch');

var _switch2 = _interopRequireDefault(_switch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var StyledLayerConfigGroupLabel = exports.StyledLayerConfigGroupLabel = _styledComponents2.default.div(_templateObject, function (props) {
  return props.theme.labelColor;
}, function (props) {
  return props.theme.textColor;
});

var StyledLayerConfigGroup = exports.StyledLayerConfigGroup = _styledComponents2.default.div(_templateObject2);

var StyledConfigGroupHeader = exports.StyledConfigGroupHeader = _styledComponents2.default.div(_templateObject3);

var ConfigGroupContent = _styledComponents2.default.div(_templateObject4);

var LayerConfigGroup = function LayerConfigGroup(_ref) {
  var group = _ref.group,
      label = _ref.label,
      children = _ref.children,
      property = _ref.property,
      layer = _ref.layer,
      _onChange2 = _ref.onChange;
  return _react2.default.createElement(
    StyledLayerConfigGroup,
    { className: 'layer-config-group' },
    _react2.default.createElement(
      StyledConfigGroupHeader,
      { className: 'layer-config-group__header' },
      _react2.default.createElement(
        StyledLayerConfigGroupLabel,
        { className: 'layer-config-group__label' },
        label
      ),
      property ? _react2.default.createElement(_switch2.default, {
        checked: layer.config.visConfig[property],
        id: layer.id + '-' + property,
        onChange: function onChange() {
          return _onChange2((0, _defineProperty3.default)({}, property, !layer.config.visConfig[property]));
        }
      }) : null
    ),
    _react2.default.createElement(
      ConfigGroupContent,
      {
        className: (0, _classnames2.default)('layer-config-group__content', {
          disabled: property && !layer.config.visConfig[property]
        })
      },
      children
    )
  );
};

exports.default = LayerConfigGroup;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3NpZGUtcGFuZWwvbGF5ZXItcGFuZWwvbGF5ZXItY29uZmlnLWdyb3VwLmpzIl0sIm5hbWVzIjpbIlN0eWxlZExheWVyQ29uZmlnR3JvdXBMYWJlbCIsInN0eWxlZCIsImRpdiIsInByb3BzIiwidGhlbWUiLCJsYWJlbENvbG9yIiwidGV4dENvbG9yIiwiU3R5bGVkTGF5ZXJDb25maWdHcm91cCIsIlN0eWxlZENvbmZpZ0dyb3VwSGVhZGVyIiwiQ29uZmlnR3JvdXBDb250ZW50IiwiTGF5ZXJDb25maWdHcm91cCIsImdyb3VwIiwibGFiZWwiLCJjaGlsZHJlbiIsInByb3BlcnR5IiwibGF5ZXIiLCJvbkNoYW5nZSIsImNvbmZpZyIsInZpc0NvbmZpZyIsImlkIiwiZGlzYWJsZWQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs2U0FBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBRU8sSUFBTUEsb0VBQThCQywyQkFBT0MsR0FBckMsa0JBQ2M7QUFBQSxTQUFTQyxNQUFNQyxLQUFOLENBQVlDLFVBQXJCO0FBQUEsQ0FEZCxFQUVGO0FBQUEsU0FBU0YsTUFBTUMsS0FBTixDQUFZRSxTQUFyQjtBQUFBLENBRkUsQ0FBTjs7QUFZQSxJQUFNQywwREFBeUJOLDJCQUFPQyxHQUFoQyxrQkFBTjs7QUFNQSxJQUFNTSw0REFBMEJQLDJCQUFPQyxHQUFqQyxrQkFBTjs7QUFPUCxJQUFNTyxxQkFBcUJSLDJCQUFPQyxHQUE1QixrQkFBTjs7QUFVQSxJQUFNUSxtQkFBbUIsU0FBbkJBLGdCQUFtQjtBQUFBLE1BQ3ZCQyxLQUR1QixRQUN2QkEsS0FEdUI7QUFBQSxNQUV2QkMsS0FGdUIsUUFFdkJBLEtBRnVCO0FBQUEsTUFHdkJDLFFBSHVCLFFBR3ZCQSxRQUh1QjtBQUFBLE1BSXZCQyxRQUp1QixRQUl2QkEsUUFKdUI7QUFBQSxNQUt2QkMsS0FMdUIsUUFLdkJBLEtBTHVCO0FBQUEsTUFNdkJDLFVBTnVCLFFBTXZCQSxRQU51QjtBQUFBLFNBUXZCO0FBQUMsMEJBQUQ7QUFBQSxNQUF3QixXQUFVLG9CQUFsQztBQUNFO0FBQUMsNkJBQUQ7QUFBQSxRQUF5QixXQUFVLDRCQUFuQztBQUNFO0FBQUMsbUNBQUQ7QUFBQSxVQUE2QixXQUFVLDJCQUF2QztBQUNHSjtBQURILE9BREY7QUFJR0UsaUJBQ0MsOEJBQUMsZ0JBQUQ7QUFDRSxpQkFBU0MsTUFBTUUsTUFBTixDQUFhQyxTQUFiLENBQXVCSixRQUF2QixDQURYO0FBRUUsWUFBT0MsTUFBTUksRUFBYixTQUFtQkwsUUFGckI7QUFHRSxrQkFBVTtBQUFBLGlCQUNSRSw2Q0FBV0YsUUFBWCxFQUFzQixDQUFDQyxNQUFNRSxNQUFOLENBQWFDLFNBQWIsQ0FBdUJKLFFBQXZCLENBQXZCLEVBRFE7QUFBQTtBQUhaLFFBREQsR0FRRztBQVpOLEtBREY7QUFlRTtBQUFDLHdCQUFEO0FBQUE7QUFDRSxtQkFBVywwQkFBVyw2QkFBWCxFQUEwQztBQUNuRE0sb0JBQVVOLFlBQVksQ0FBQ0MsTUFBTUUsTUFBTixDQUFhQyxTQUFiLENBQXVCSixRQUF2QjtBQUQ0QixTQUExQztBQURiO0FBS0dEO0FBTEg7QUFmRixHQVJ1QjtBQUFBLENBQXpCOztrQkFpQ2VILGdCIiwiZmlsZSI6ImxheWVyLWNvbmZpZy1ncm91cC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgMjAxOCBVYmVyIFRlY2hub2xvZ2llcywgSW5jLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbi8vIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbi8vIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbi8vIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbi8vIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuLy8gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuLy8gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4vLyBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbi8vIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbi8vIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4vLyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4vLyBUSEUgU09GVFdBUkUuXG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgc3R5bGVkIGZyb20gJ3N0eWxlZC1jb21wb25lbnRzJztcbmltcG9ydCBjbGFzc25hbWVzIGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0IFN3aXRjaCBmcm9tICdjb21wb25lbnRzL2NvbW1vbi9zd2l0Y2gnO1xuXG5leHBvcnQgY29uc3QgU3R5bGVkTGF5ZXJDb25maWdHcm91cExhYmVsID0gc3R5bGVkLmRpdmBcbiAgYm9yZGVyLWxlZnQ6IDJweCBzb2xpZCAke3Byb3BzID0+IHByb3BzLnRoZW1lLmxhYmVsQ29sb3J9O1xuICBjb2xvcjogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS50ZXh0Q29sb3J9O1xuICBmb250LXNpemU6IDEycHg7XG4gIGZvbnQtd2VpZ2h0OiA1MDA7XG4gIGxpbmUtaGVpZ2h0OiAxMnB4O1xuICBtYXJnaW4tbGVmdDogLTEycHg7XG4gIHBhZGRpbmctbGVmdDogMTBweDtcbiAgdGV4dC10cmFuc2Zvcm06IGNhcGl0YWxpemU7XG4gIGxldHRlci1zcGFjaW5nOiAwLjJweDtcbmA7XG5cbmV4cG9ydCBjb25zdCBTdHlsZWRMYXllckNvbmZpZ0dyb3VwID0gc3R5bGVkLmRpdmBcbiAgcGFkZGluZy1sZWZ0OiAxOHB4O1xuICBtYXJnaW4tYm90dG9tOiAxOHB4O1xuXG5gO1xuXG5leHBvcnQgY29uc3QgU3R5bGVkQ29uZmlnR3JvdXBIZWFkZXIgPSBzdHlsZWQuZGl2YFxuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gIG1hcmdpbi1ib3R0b206IDEycHg7XG5gO1xuXG5jb25zdCBDb25maWdHcm91cENvbnRlbnQgPSBzdHlsZWQuZGl2YFxuICAmLmRpc2FibGVkIHtcbiAgICBvcGFjaXR5OiAwLjM7XG4gICAgcG9pbnRlci1ldmVudHM6IG5vbmU7XG4gICAgKiB7XG4gICAgICBwb2ludGVyLWV2ZW50czogbm9uZTtcbiAgICB9XG4gIH1cbmA7XG5cbmNvbnN0IExheWVyQ29uZmlnR3JvdXAgPSAoe1xuICBncm91cCxcbiAgbGFiZWwsXG4gIGNoaWxkcmVuLFxuICBwcm9wZXJ0eSxcbiAgbGF5ZXIsXG4gIG9uQ2hhbmdlXG59KSA9PiAoXG4gIDxTdHlsZWRMYXllckNvbmZpZ0dyb3VwIGNsYXNzTmFtZT1cImxheWVyLWNvbmZpZy1ncm91cFwiPlxuICAgIDxTdHlsZWRDb25maWdHcm91cEhlYWRlciBjbGFzc05hbWU9XCJsYXllci1jb25maWctZ3JvdXBfX2hlYWRlclwiPlxuICAgICAgPFN0eWxlZExheWVyQ29uZmlnR3JvdXBMYWJlbCBjbGFzc05hbWU9XCJsYXllci1jb25maWctZ3JvdXBfX2xhYmVsXCI+XG4gICAgICAgIHtsYWJlbH1cbiAgICAgIDwvU3R5bGVkTGF5ZXJDb25maWdHcm91cExhYmVsPlxuICAgICAge3Byb3BlcnR5ID8gKFxuICAgICAgICA8U3dpdGNoXG4gICAgICAgICAgY2hlY2tlZD17bGF5ZXIuY29uZmlnLnZpc0NvbmZpZ1twcm9wZXJ0eV19XG4gICAgICAgICAgaWQ9e2Ake2xheWVyLmlkfS0ke3Byb3BlcnR5fWB9XG4gICAgICAgICAgb25DaGFuZ2U9eygpID0+XG4gICAgICAgICAgICBvbkNoYW5nZSh7W3Byb3BlcnR5XTogIWxheWVyLmNvbmZpZy52aXNDb25maWdbcHJvcGVydHldfSlcbiAgICAgICAgICB9XG4gICAgICAgIC8+XG4gICAgICApIDogbnVsbH1cbiAgICA8L1N0eWxlZENvbmZpZ0dyb3VwSGVhZGVyPlxuICAgIDxDb25maWdHcm91cENvbnRlbnRcbiAgICAgIGNsYXNzTmFtZT17Y2xhc3NuYW1lcygnbGF5ZXItY29uZmlnLWdyb3VwX19jb250ZW50Jywge1xuICAgICAgICBkaXNhYmxlZDogcHJvcGVydHkgJiYgIWxheWVyLmNvbmZpZy52aXNDb25maWdbcHJvcGVydHldXG4gICAgICB9KX1cbiAgICA+XG4gICAgICB7Y2hpbGRyZW59XG4gICAgPC9Db25maWdHcm91cENvbnRlbnQ+XG4gIDwvU3R5bGVkTGF5ZXJDb25maWdHcm91cD5cbik7XG5cbmV4cG9ydCBkZWZhdWx0IExheWVyQ29uZmlnR3JvdXA7XG4iXX0=