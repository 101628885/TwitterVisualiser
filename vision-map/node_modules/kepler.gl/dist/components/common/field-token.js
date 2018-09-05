'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _taggedTemplateLiteral2 = require('babel-runtime/helpers/taggedTemplateLiteral');

var _taggedTemplateLiteral3 = _interopRequireDefault(_taggedTemplateLiteral2);

var _templateObject = (0, _taggedTemplateLiteral3.default)(['\n  background-color: rgba(', ', 0.2);\n  border-radius: 2px;\n  border: 1px solid rgb(', ');\n  color: rgb(', ');\n  display: inline-block;\n  font-size: 10px;\n  font-weight: 400;\n  padding: 0 5px;\n  text-align: center;\n  width: 40px;\n'], ['\n  background-color: rgba(', ', 0.2);\n  border-radius: 2px;\n  border: 1px solid rgb(', ');\n  color: rgb(', ');\n  display: inline-block;\n  font-size: 10px;\n  font-weight: 400;\n  padding: 0 5px;\n  text-align: center;\n  width: 40px;\n']); // Copyright (c) 2018 Uber Technologies, Inc.
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

var _defaultSettings = require('../../constants/default-settings');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FieldTag = _styledComponents2.default.div(_templateObject, function (props) {
  return props.color;
}, function (props) {
  return props.color;
}, function (props) {
  return props.color;
});

var FieldToken = function FieldToken(_ref) {
  var type = _ref.type;
  return _react2.default.createElement(
    FieldTag,
    {
      color: _defaultSettings.FILED_TYPE_DISPLAY[type] && _defaultSettings.FILED_TYPE_DISPLAY[type].color || _defaultSettings.FIELD_COLORS.default
    },
    _defaultSettings.FILED_TYPE_DISPLAY[type].label
  );
};

exports.default = FieldToken;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2NvbW1vbi9maWVsZC10b2tlbi5qcyJdLCJuYW1lcyI6WyJGaWVsZFRhZyIsInN0eWxlZCIsImRpdiIsInByb3BzIiwiY29sb3IiLCJGaWVsZFRva2VuIiwidHlwZSIsIkZJTEVEX1RZUEVfRElTUExBWSIsIkZJRUxEX0NPTE9SUyIsImRlZmF1bHQiLCJsYWJlbCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OzswaUJBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7QUFDQTs7OztBQUVBOzs7O0FBS0EsSUFBTUEsV0FBV0MsMkJBQU9DLEdBQWxCLGtCQUNxQjtBQUFBLFNBQVNDLE1BQU1DLEtBQWY7QUFBQSxDQURyQixFQUdvQjtBQUFBLFNBQVNELE1BQU1DLEtBQWY7QUFBQSxDQUhwQixFQUlTO0FBQUEsU0FBU0QsTUFBTUMsS0FBZjtBQUFBLENBSlQsQ0FBTjs7QUFhQSxJQUFNQyxhQUFhLFNBQWJBLFVBQWE7QUFBQSxNQUFFQyxJQUFGLFFBQUVBLElBQUY7QUFBQSxTQUNqQjtBQUFDLFlBQUQ7QUFBQTtBQUNFLGFBQ0dDLG9DQUFtQkQsSUFBbkIsS0FBNEJDLG9DQUFtQkQsSUFBbkIsRUFBeUJGLEtBQXRELElBQ0FJLDhCQUFhQztBQUhqQjtBQU1HRix3Q0FBbUJELElBQW5CLEVBQXlCSTtBQU41QixHQURpQjtBQUFBLENBQW5COztrQkFXZUwsVSIsImZpbGUiOiJmaWVsZC10b2tlbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgMjAxOCBVYmVyIFRlY2hub2xvZ2llcywgSW5jLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbi8vIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbi8vIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbi8vIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbi8vIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuLy8gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuLy8gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4vLyBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbi8vIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbi8vIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4vLyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4vLyBUSEUgU09GVFdBUkUuXG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgc3R5bGVkIGZyb20gJ3N0eWxlZC1jb21wb25lbnRzJztcblxuaW1wb3J0IHtcbiAgRklMRURfVFlQRV9ESVNQTEFZLFxuICBGSUVMRF9DT0xPUlNcbn0gZnJvbSAnLi4vLi4vY29uc3RhbnRzL2RlZmF1bHQtc2V0dGluZ3MnO1xuXG5jb25zdCBGaWVsZFRhZyA9IHN0eWxlZC5kaXZgXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoJHtwcm9wcyA9PiBwcm9wcy5jb2xvcn0sIDAuMik7XG4gIGJvcmRlci1yYWRpdXM6IDJweDtcbiAgYm9yZGVyOiAxcHggc29saWQgcmdiKCR7cHJvcHMgPT4gcHJvcHMuY29sb3J9KTtcbiAgY29sb3I6IHJnYigke3Byb3BzID0+IHByb3BzLmNvbG9yfSk7XG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgZm9udC1zaXplOiAxMHB4O1xuICBmb250LXdlaWdodDogNDAwO1xuICBwYWRkaW5nOiAwIDVweDtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICB3aWR0aDogNDBweDtcbmA7XG5cbmNvbnN0IEZpZWxkVG9rZW4gPSAoe3R5cGV9KSA9PiAoXG4gIDxGaWVsZFRhZ1xuICAgIGNvbG9yPXtcbiAgICAgIChGSUxFRF9UWVBFX0RJU1BMQVlbdHlwZV0gJiYgRklMRURfVFlQRV9ESVNQTEFZW3R5cGVdLmNvbG9yKSB8fFxuICAgICAgRklFTERfQ09MT1JTLmRlZmF1bHRcbiAgICB9XG4gID5cbiAgICB7RklMRURfVFlQRV9ESVNQTEFZW3R5cGVdLmxhYmVsfVxuICA8L0ZpZWxkVGFnPlxuKTtcblxuZXhwb3J0IGRlZmF1bHQgRmllbGRUb2tlbjtcbiJdfQ==