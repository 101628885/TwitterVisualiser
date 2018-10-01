'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _taggedTemplateLiteral2 = require('babel-runtime/helpers/taggedTemplateLiteral');

var _taggedTemplateLiteral3 = _interopRequireDefault(_taggedTemplateLiteral2);

var _templateObject = (0, _taggedTemplateLiteral3.default)(['\n  background-color: currentColor;\n  border-radius: 1px;\n  display: inline-block;\n  padding: 0 4px;\n  position: absolute;\n  top: 45%;\n  left: 10%;\n\n  .text {\n    color: white;\n    font-size: ', ';\n  }\n'], ['\n  background-color: currentColor;\n  border-radius: 1px;\n  display: inline-block;\n  padding: 0 4px;\n  position: absolute;\n  top: 45%;\n  left: 10%;\n\n  .text {\n    color: white;\n    font-size: ', ';\n  }\n']),
    _templateObject2 = (0, _taggedTemplateLiteral3.default)(['\n  display: inline-block;\n  position: relative;\n  color: currentColor;\n  height: ', ';\n'], ['\n  display: inline-block;\n  position: relative;\n  color: currentColor;\n  height: ', ';\n']); // Copyright (c) 2018 Uber Technologies, Inc.
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

var _index = require('./index');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FileNameTag = _styledComponents2.default.div(_templateObject, function (props) {
  return props.fontSize;
});

var FileTypeIconWrapper = _styledComponents2.default.div(_templateObject2, function (props) {
  return props.height;
});

var FileTypeIcon = function FileTypeIcon(_ref) {
  var ext = _ref.ext,
      height = _ref.height,
      fontSize = _ref.fontSize;
  return _react2.default.createElement(
    FileTypeIconWrapper,
    { height: height },
    _react2.default.createElement(_index.File, { height: height }),
    _react2.default.createElement(
      FileNameTag,
      { fontSize: fontSize },
      _react2.default.createElement(
        'div',
        { className: 'text' },
        ext
      )
    )
  );
};

exports.default = FileTypeIcon;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2NvbW1vbi9pY29ucy9maWxlLXR5cGUuanMiXSwibmFtZXMiOlsiRmlsZU5hbWVUYWciLCJzdHlsZWQiLCJkaXYiLCJwcm9wcyIsImZvbnRTaXplIiwiRmlsZVR5cGVJY29uV3JhcHBlciIsImhlaWdodCIsIkZpbGVUeXBlSWNvbiIsImV4dCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7aVFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7QUFDQTs7OztBQUVBOzs7O0FBRUEsSUFBTUEsY0FBY0MsMkJBQU9DLEdBQXJCLGtCQVdXO0FBQUEsU0FBU0MsTUFBTUMsUUFBZjtBQUFBLENBWFgsQ0FBTjs7QUFlQSxJQUFNQyxzQkFBc0JKLDJCQUFPQyxHQUE3QixtQkFJTTtBQUFBLFNBQVNDLE1BQU1HLE1BQWY7QUFBQSxDQUpOLENBQU47O0FBT0EsSUFBTUMsZUFBZSxTQUFmQSxZQUFlO0FBQUEsTUFBRUMsR0FBRixRQUFFQSxHQUFGO0FBQUEsTUFBT0YsTUFBUCxRQUFPQSxNQUFQO0FBQUEsTUFBZUYsUUFBZixRQUFlQSxRQUFmO0FBQUEsU0FDbkI7QUFBQyx1QkFBRDtBQUFBLE1BQXFCLFFBQVFFLE1BQTdCO0FBQ0Usa0NBQUMsV0FBRCxJQUFNLFFBQVFBLE1BQWQsR0FERjtBQUVFO0FBQUMsaUJBQUQ7QUFBQSxRQUFhLFVBQVVGLFFBQXZCO0FBQ0U7QUFBQTtBQUFBLFVBQUssV0FBVSxNQUFmO0FBQXVCSTtBQUF2QjtBQURGO0FBRkYsR0FEbUI7QUFBQSxDQUFyQjs7a0JBU2VELFkiLCJmaWxlIjoiZmlsZS10eXBlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSAyMDE4IFViZXIgVGVjaG5vbG9naWVzLCBJbmMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuLy8gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuLy8gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuLy8gdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuLy8gY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4vLyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4vLyBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4vLyBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbi8vIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuLy8gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuLy8gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbi8vIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbi8vIFRIRSBTT0ZUV0FSRS5cblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBzdHlsZWQgZnJvbSAnc3R5bGVkLWNvbXBvbmVudHMnO1xuXG5pbXBvcnQge0ZpbGV9IGZyb20gJ2NvbXBvbmVudHMvY29tbW9uL2ljb25zJztcblxuY29uc3QgRmlsZU5hbWVUYWcgPSBzdHlsZWQuZGl2YFxuICBiYWNrZ3JvdW5kLWNvbG9yOiBjdXJyZW50Q29sb3I7XG4gIGJvcmRlci1yYWRpdXM6IDFweDtcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICBwYWRkaW5nOiAwIDRweDtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB0b3A6IDQ1JTtcbiAgbGVmdDogMTAlO1xuXG4gIC50ZXh0IHtcbiAgICBjb2xvcjogd2hpdGU7XG4gICAgZm9udC1zaXplOiAke3Byb3BzID0+IHByb3BzLmZvbnRTaXplfTtcbiAgfVxuYDtcblxuY29uc3QgRmlsZVR5cGVJY29uV3JhcHBlciA9IHN0eWxlZC5kaXZgXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBjb2xvcjogY3VycmVudENvbG9yO1xuICBoZWlnaHQ6ICR7cHJvcHMgPT4gcHJvcHMuaGVpZ2h0fTtcbmA7XG5cbmNvbnN0IEZpbGVUeXBlSWNvbiA9ICh7ZXh0LCBoZWlnaHQsIGZvbnRTaXplfSkgPT4gKFxuICA8RmlsZVR5cGVJY29uV3JhcHBlciBoZWlnaHQ9e2hlaWdodH0+XG4gICAgPEZpbGUgaGVpZ2h0PXtoZWlnaHR9IC8+XG4gICAgPEZpbGVOYW1lVGFnIGZvbnRTaXplPXtmb250U2l6ZX0+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHRcIj57ZXh0fTwvZGl2PlxuICAgIDwvRmlsZU5hbWVUYWc+XG4gIDwvRmlsZVR5cGVJY29uV3JhcHBlcj5cbik7XG5cbmV4cG9ydCBkZWZhdWx0IEZpbGVUeXBlSWNvbjtcbiJdfQ==