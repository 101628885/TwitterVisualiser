'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _interactionPanel = require('./interaction-panel/interaction-panel');

var _interactionPanel2 = _interopRequireDefault(_interactionPanel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Copyright (c) 2018 Uber Technologies, Inc.
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

var InteractionManager = function InteractionManager(_ref) {
  var interactionConfig = _ref.interactionConfig,
      datasets = _ref.datasets,
      onConfigChange = _ref.onConfigChange;
  return _react2.default.createElement(
    'div',
    { className: 'interaction-manager' },
    Object.keys(interactionConfig).map(function (key) {
      return _react2.default.createElement(_interactionPanel2.default, {
        datasets: datasets,
        config: interactionConfig[key],
        key: key,
        onConfigChange: onConfigChange
      });
    })
  );
};

exports.default = InteractionManager;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3NpZGUtcGFuZWwvaW50ZXJhY3Rpb24tbWFuYWdlci5qcyJdLCJuYW1lcyI6WyJJbnRlcmFjdGlvbk1hbmFnZXIiLCJpbnRlcmFjdGlvbkNvbmZpZyIsImRhdGFzZXRzIiwib25Db25maWdDaGFuZ2UiLCJPYmplY3QiLCJrZXlzIiwibWFwIiwia2V5Il0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFvQkE7Ozs7QUFDQTs7Ozs7O0FBckJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUtBLElBQU1BLHFCQUFxQixTQUFyQkEsa0JBQXFCO0FBQUEsTUFBRUMsaUJBQUYsUUFBRUEsaUJBQUY7QUFBQSxNQUFxQkMsUUFBckIsUUFBcUJBLFFBQXJCO0FBQUEsTUFBK0JDLGNBQS9CLFFBQStCQSxjQUEvQjtBQUFBLFNBQ3pCO0FBQUE7QUFBQSxNQUFLLFdBQVUscUJBQWY7QUFDR0MsV0FBT0MsSUFBUCxDQUFZSixpQkFBWixFQUErQkssR0FBL0IsQ0FBbUM7QUFBQSxhQUNsQyw4QkFBQywwQkFBRDtBQUNFLGtCQUFVSixRQURaO0FBRUUsZ0JBQVFELGtCQUFrQk0sR0FBbEIsQ0FGVjtBQUdFLGFBQUtBLEdBSFA7QUFJRSx3QkFBZ0JKO0FBSmxCLFFBRGtDO0FBQUEsS0FBbkM7QUFESCxHQUR5QjtBQUFBLENBQTNCOztrQkFhZUgsa0IiLCJmaWxlIjoiaW50ZXJhY3Rpb24tbWFuYWdlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgMjAxOCBVYmVyIFRlY2hub2xvZ2llcywgSW5jLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbi8vIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbi8vIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbi8vIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbi8vIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuLy8gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuLy8gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4vLyBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbi8vIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbi8vIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4vLyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4vLyBUSEUgU09GVFdBUkUuXG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgSW50ZXJhY3Rpb25QYW5lbCBmcm9tICcuL2ludGVyYWN0aW9uLXBhbmVsL2ludGVyYWN0aW9uLXBhbmVsJztcblxuY29uc3QgSW50ZXJhY3Rpb25NYW5hZ2VyID0gKHtpbnRlcmFjdGlvbkNvbmZpZywgZGF0YXNldHMsIG9uQ29uZmlnQ2hhbmdlfSkgPT4gKFxuICA8ZGl2IGNsYXNzTmFtZT1cImludGVyYWN0aW9uLW1hbmFnZXJcIj5cbiAgICB7T2JqZWN0LmtleXMoaW50ZXJhY3Rpb25Db25maWcpLm1hcChrZXkgPT4gKFxuICAgICAgPEludGVyYWN0aW9uUGFuZWxcbiAgICAgICAgZGF0YXNldHM9e2RhdGFzZXRzfVxuICAgICAgICBjb25maWc9e2ludGVyYWN0aW9uQ29uZmlnW2tleV19XG4gICAgICAgIGtleT17a2V5fVxuICAgICAgICBvbkNvbmZpZ0NoYW5nZT17b25Db25maWdDaGFuZ2V9XG4gICAgICAvPlxuICAgICkpfVxuICA8L2Rpdj5cbik7XG5cbmV4cG9ydCBkZWZhdWx0IEludGVyYWN0aW9uTWFuYWdlcjtcbiJdfQ==