'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _taggedTemplateLiteral2 = require('babel-runtime/helpers/taggedTemplateLiteral');

var _taggedTemplateLiteral3 = _interopRequireDefault(_taggedTemplateLiteral2);

var _templateObject = (0, _taggedTemplateLiteral3.default)(['\n  0% {\n    transform: rotate(0deg);\n  }\n  100% {\n    transform: rotate(360deg);\n  }\n'], ['\n  0% {\n    transform: rotate(0deg);\n  }\n  100% {\n    transform: rotate(360deg);\n  }\n']),
    _templateObject2 = (0, _taggedTemplateLiteral3.default)(['\n    border-left-color: rgb(198, 198, 198);\n    border-top-color: rgb(198, 198, 198);\n    animation: _preloader_spin_ 500ms linear infinite;\n    border-radius: 50%;\n    border-bottom-color: transparent;\n    border-right-color: transparent;\n    cursor: wait;\n    border-style: solid;\n    display: block;\n    animation-name: ', ';\n}'], ['\n    border-left-color: rgb(198, 198, 198);\n    border-top-color: rgb(198, 198, 198);\n    animation: _preloader_spin_ 500ms linear infinite;\n    border-radius: 50%;\n    border-bottom-color: transparent;\n    border-right-color: transparent;\n    cursor: wait;\n    border-style: solid;\n    display: block;\n    animation-name: ', ';\n}']); // Copyright (c) 2018 Uber Technologies, Inc.
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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var animationName = (0, _styledComponents.keyframes)(_templateObject);

var Loader = _styledComponents2.default.span(_templateObject2, animationName);

var LoadingSpinner = function LoadingSpinner(_ref) {
  var _ref$size = _ref.size,
      size = _ref$size === undefined ? 32 : _ref$size;
  return _react2.default.createElement(Loader, { style: { width: size + 'px', height: size + 'px' } });
};

exports.default = LoadingSpinner;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2NvbW1vbi9sb2FkaW5nLXNwaW5uZXIuanMiXSwibmFtZXMiOlsiYW5pbWF0aW9uTmFtZSIsImtleWZyYW1lcyIsIkxvYWRlciIsInN0eWxlZCIsInNwYW4iLCJMb2FkaW5nU3Bpbm5lciIsInNpemUiLCJ3aWR0aCIsImhlaWdodCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7bXZCQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7O0FBQ0E7Ozs7OztBQUVBLElBQU1BLG9CQUFnQkMsMkJBQWhCLGtCQUFOOztBQVNBLElBQU1DLFNBQVNDLDJCQUFPQyxJQUFoQixtQkFVZ0JKLGFBVmhCLENBQU47O0FBYUEsSUFBTUssaUJBQWlCLFNBQWpCQSxjQUFpQjtBQUFBLHVCQUFFQyxJQUFGO0FBQUEsTUFBRUEsSUFBRiw2QkFBUyxFQUFUO0FBQUEsU0FDbkIsOEJBQUMsTUFBRCxJQUFRLE9BQU8sRUFBQ0MsT0FBVUQsSUFBVixPQUFELEVBQXFCRSxRQUFXRixJQUFYLE9BQXJCLEVBQWYsR0FEbUI7QUFBQSxDQUF2Qjs7a0JBSWVELGMiLCJmaWxlIjoibG9hZGluZy1zcGlubmVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSAyMDE4IFViZXIgVGVjaG5vbG9naWVzLCBJbmMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuLy8gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuLy8gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuLy8gdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuLy8gY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4vLyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4vLyBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4vLyBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbi8vIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuLy8gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuLy8gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbi8vIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbi8vIFRIRSBTT0ZUV0FSRS5cblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBzdHlsZWQsIHtrZXlmcmFtZXN9IGZyb20gJ3N0eWxlZC1jb21wb25lbnRzJztcblxuY29uc3QgYW5pbWF0aW9uTmFtZSA9IGtleWZyYW1lc2BcbiAgMCUge1xuICAgIHRyYW5zZm9ybTogcm90YXRlKDBkZWcpO1xuICB9XG4gIDEwMCUge1xuICAgIHRyYW5zZm9ybTogcm90YXRlKDM2MGRlZyk7XG4gIH1cbmA7XG5cbmNvbnN0IExvYWRlciA9IHN0eWxlZC5zcGFuYFxuICAgIGJvcmRlci1sZWZ0LWNvbG9yOiByZ2IoMTk4LCAxOTgsIDE5OCk7XG4gICAgYm9yZGVyLXRvcC1jb2xvcjogcmdiKDE5OCwgMTk4LCAxOTgpO1xuICAgIGFuaW1hdGlvbjogX3ByZWxvYWRlcl9zcGluXyA1MDBtcyBsaW5lYXIgaW5maW5pdGU7XG4gICAgYm9yZGVyLXJhZGl1czogNTAlO1xuICAgIGJvcmRlci1ib3R0b20tY29sb3I6IHRyYW5zcGFyZW50O1xuICAgIGJvcmRlci1yaWdodC1jb2xvcjogdHJhbnNwYXJlbnQ7XG4gICAgY3Vyc29yOiB3YWl0O1xuICAgIGJvcmRlci1zdHlsZTogc29saWQ7XG4gICAgZGlzcGxheTogYmxvY2s7XG4gICAgYW5pbWF0aW9uLW5hbWU6ICR7YW5pbWF0aW9uTmFtZX07XG59YDtcblxuY29uc3QgTG9hZGluZ1NwaW5uZXIgPSAoe3NpemUgPSAzMn0pID0+IChcbiAgICA8TG9hZGVyIHN0eWxlPXt7d2lkdGg6IGAke3NpemV9cHhgLCBoZWlnaHQ6IGAke3NpemV9cHhgfX0vPlxuKTtcblxuZXhwb3J0IGRlZmF1bHQgTG9hZGluZ1NwaW5uZXI7XG4iXX0=