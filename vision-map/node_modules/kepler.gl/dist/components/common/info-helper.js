'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _taggedTemplateLiteral2 = require('babel-runtime/helpers/taggedTemplateLiteral');

var _taggedTemplateLiteral3 = _interopRequireDefault(_taggedTemplateLiteral2);

var _templateObject = (0, _taggedTemplateLiteral3.default)(['\n  align-items: center;\n  margin-left: 10px;\n  color: ', ';\n  display: inline-flex;\n\n  .info-helper__content {\n    max-width: 100px;\n  }\n  \n  :hover {\n    cursor: pointer;\n    color: ', ';\n  }\n'], ['\n  align-items: center;\n  margin-left: 10px;\n  color: ', ';\n  display: inline-flex;\n\n  .info-helper__content {\n    max-width: 100px;\n  }\n  \n  :hover {\n    cursor: pointer;\n    color: ', ';\n  }\n']); // Copyright (c) 2018 Uber Technologies, Inc.
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

var _styledComponents = require('./styled-components');

var _icons = require('./icons');

var _styledComponents2 = require('styled-components');

var _styledComponents3 = _interopRequireDefault(_styledComponents2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var StyledInfoHelper = _styledComponents3.default.div(_templateObject, function (props) {
  return props.theme.labelColor;
}, function (props) {
  return props.theme.textColorHl;
});

var propTypes = {
  description: _propTypes2.default.string.isRequired,
  containerClass: _propTypes2.default.string
};

var InfoHelper = function InfoHelper(_ref) {
  var description = _ref.description,
      containerClass = _ref.containerClass,
      id = _ref.id;
  return _react2.default.createElement(
    StyledInfoHelper,
    { className: 'info-helper ' + (containerClass || ''), 'data-tip': true, 'data-for': id },
    _react2.default.createElement(_icons.Docs, { height: '16px' }),
    _react2.default.createElement(
      _styledComponents.Tooltip,
      { id: id, effect: 'solid' },
      _react2.default.createElement(
        'div',
        { className: 'info-helper__content' },
        description
      )
    )
  );
};

InfoHelper.propTypes = propTypes;

exports.default = InfoHelper;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2NvbW1vbi9pbmZvLWhlbHBlci5qcyJdLCJuYW1lcyI6WyJTdHlsZWRJbmZvSGVscGVyIiwic3R5bGVkIiwiZGl2IiwicHJvcHMiLCJ0aGVtZSIsImxhYmVsQ29sb3IiLCJ0ZXh0Q29sb3JIbCIsInByb3BUeXBlcyIsImRlc2NyaXB0aW9uIiwiUHJvcFR5cGVzIiwic3RyaW5nIiwiaXNSZXF1aXJlZCIsImNvbnRhaW5lckNsYXNzIiwiSW5mb0hlbHBlciIsImlkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O3NlQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7QUFDQTs7Ozs7O0FBRUEsSUFBTUEsbUJBQW1CQywyQkFBT0MsR0FBMUIsa0JBR0s7QUFBQSxTQUFRQyxNQUFNQyxLQUFOLENBQVlDLFVBQXBCO0FBQUEsQ0FITCxFQVlPO0FBQUEsU0FBUUYsTUFBTUMsS0FBTixDQUFZRSxXQUFwQjtBQUFBLENBWlAsQ0FBTjs7QUFnQkEsSUFBTUMsWUFBWTtBQUNoQkMsZUFBYUMsb0JBQVVDLE1BQVYsQ0FBaUJDLFVBRGQ7QUFFaEJDLGtCQUFnQkgsb0JBQVVDO0FBRlYsQ0FBbEI7O0FBS0EsSUFBTUcsYUFBYSxTQUFiQSxVQUFhO0FBQUEsTUFBRUwsV0FBRixRQUFFQSxXQUFGO0FBQUEsTUFBZUksY0FBZixRQUFlQSxjQUFmO0FBQUEsTUFBK0JFLEVBQS9CLFFBQStCQSxFQUEvQjtBQUFBLFNBQ2pCO0FBQUMsb0JBQUQ7QUFBQSxNQUFrQiw2QkFBMEJGLGtCQUFrQixFQUE1QyxDQUFsQixFQUFvRSxnQkFBcEUsRUFBNkUsWUFBVUUsRUFBdkY7QUFDRSxrQ0FBQyxXQUFELElBQU0sUUFBTyxNQUFiLEdBREY7QUFFRTtBQUFDLCtCQUFEO0FBQUEsUUFBUyxJQUFJQSxFQUFiLEVBQWlCLFFBQU8sT0FBeEI7QUFDRTtBQUFBO0FBQUEsVUFBSyxXQUFVLHNCQUFmO0FBQXVDTjtBQUF2QztBQURGO0FBRkYsR0FEaUI7QUFBQSxDQUFuQjs7QUFTQUssV0FBV04sU0FBWCxHQUF1QkEsU0FBdkI7O2tCQUVlTSxVIiwiZmlsZSI6ImluZm8taGVscGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSAyMDE4IFViZXIgVGVjaG5vbG9naWVzLCBJbmMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuLy8gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuLy8gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuLy8gdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuLy8gY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4vLyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4vLyBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4vLyBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbi8vIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuLy8gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuLy8gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbi8vIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbi8vIFRIRSBTT0ZUV0FSRS5cblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQge1Rvb2x0aXB9IGZyb20gJy4vc3R5bGVkLWNvbXBvbmVudHMnO1xuaW1wb3J0IHtEb2NzfSBmcm9tICdjb21wb25lbnRzL2NvbW1vbi9pY29ucyc7XG5pbXBvcnQgc3R5bGVkIGZyb20gJ3N0eWxlZC1jb21wb25lbnRzJztcblxuY29uc3QgU3R5bGVkSW5mb0hlbHBlciA9IHN0eWxlZC5kaXZgXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIG1hcmdpbi1sZWZ0OiAxMHB4O1xuICBjb2xvcjogJHtwcm9wcyA9PnByb3BzLnRoZW1lLmxhYmVsQ29sb3J9O1xuICBkaXNwbGF5OiBpbmxpbmUtZmxleDtcblxuICAuaW5mby1oZWxwZXJfX2NvbnRlbnQge1xuICAgIG1heC13aWR0aDogMTAwcHg7XG4gIH1cbiAgXG4gIDpob3ZlciB7XG4gICAgY3Vyc29yOiBwb2ludGVyO1xuICAgIGNvbG9yOiAke3Byb3BzID0+cHJvcHMudGhlbWUudGV4dENvbG9ySGx9O1xuICB9XG5gO1xuXG5jb25zdCBwcm9wVHlwZXMgPSB7XG4gIGRlc2NyaXB0aW9uOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gIGNvbnRhaW5lckNsYXNzOiBQcm9wVHlwZXMuc3RyaW5nXG59O1xuXG5jb25zdCBJbmZvSGVscGVyID0gKHtkZXNjcmlwdGlvbiwgY29udGFpbmVyQ2xhc3MsIGlkfSkgPT4gKFxuICA8U3R5bGVkSW5mb0hlbHBlciBjbGFzc05hbWU9e2BpbmZvLWhlbHBlciAke2NvbnRhaW5lckNsYXNzIHx8ICcnfWB9IGRhdGEtdGlwIGRhdGEtZm9yPXtpZH0+XG4gICAgPERvY3MgaGVpZ2h0PVwiMTZweFwiLz5cbiAgICA8VG9vbHRpcCBpZD17aWR9IGVmZmVjdD1cInNvbGlkXCI+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImluZm8taGVscGVyX19jb250ZW50XCI+e2Rlc2NyaXB0aW9ufTwvZGl2PlxuICAgIDwvVG9vbHRpcD5cbiAgPC9TdHlsZWRJbmZvSGVscGVyPlxuKTtcblxuSW5mb0hlbHBlci5wcm9wVHlwZXMgPSBwcm9wVHlwZXM7XG5cbmV4cG9ydCBkZWZhdWx0IEluZm9IZWxwZXI7XG4iXX0=