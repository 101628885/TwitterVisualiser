'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LoadDataModal = undefined;

var _taggedTemplateLiteral2 = require('babel-runtime/helpers/taggedTemplateLiteral');

var _taggedTemplateLiteral3 = _interopRequireDefault(_taggedTemplateLiteral2);

var _templateObject = (0, _taggedTemplateLiteral3.default)(['\n  padding: 10px 0;\n'], ['\n  padding: 10px 0;\n']); // Copyright (c) 2018 Uber Technologies, Inc.
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

var _fileUpload = require('../common/file-uploader/file-upload');

var _fileUpload2 = _interopRequireDefault(_fileUpload);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var StyledLoadDataModal = _styledComponents2.default.div(_templateObject);

var propTypes = {
  onClose: _propTypes2.default.func.isRequired,

  // call backs
  onFileUpload: _propTypes2.default.func.isRequired
};

var LoadDataModal = exports.LoadDataModal = function LoadDataModal(props) {
  return _react2.default.createElement(
    StyledLoadDataModal,
    null,
    _react2.default.createElement(
      'div',
      { className: 'load-data-modal' },
      _react2.default.createElement(_fileUpload2.default, { onFileUpload: props.onFileUpload })
    )
  );
};

LoadDataModal.propTypes = propTypes;

var loadDataModalFactory = function loadDataModalFactory() {
  return LoadDataModal;
};
exports.default = loadDataModalFactory;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL21vZGFscy9sb2FkLWRhdGEtbW9kYWwuanMiXSwibmFtZXMiOlsiU3R5bGVkTG9hZERhdGFNb2RhbCIsInN0eWxlZCIsImRpdiIsInByb3BUeXBlcyIsIm9uQ2xvc2UiLCJQcm9wVHlwZXMiLCJmdW5jIiwiaXNSZXF1aXJlZCIsIm9uRmlsZVVwbG9hZCIsIkxvYWREYXRhTW9kYWwiLCJwcm9wcyIsImxvYWREYXRhTW9kYWxGYWN0b3J5Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztvSEFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFFQTs7Ozs7O0FBRUEsSUFBTUEsc0JBQXNCQywyQkFBT0MsR0FBN0IsaUJBQU47O0FBSUEsSUFBTUMsWUFBWTtBQUNoQkMsV0FBU0Msb0JBQVVDLElBQVYsQ0FBZUMsVUFEUjs7QUFHaEI7QUFDQUMsZ0JBQWNILG9CQUFVQyxJQUFWLENBQWVDO0FBSmIsQ0FBbEI7O0FBT08sSUFBTUUsd0NBQWdCLFNBQWhCQSxhQUFnQjtBQUFBLFNBQzNCO0FBQUMsdUJBQUQ7QUFBQTtBQUNFO0FBQUE7QUFBQSxRQUFLLFdBQVUsaUJBQWY7QUFDRSxvQ0FBQyxvQkFBRCxJQUFZLGNBQWNDLE1BQU1GLFlBQWhDO0FBREY7QUFERixHQUQyQjtBQUFBLENBQXRCOztBQVFQQyxjQUFjTixTQUFkLEdBQTBCQSxTQUExQjs7QUFFQSxJQUFNUSx1QkFBdUIsU0FBdkJBLG9CQUF1QjtBQUFBLFNBQU1GLGFBQU47QUFBQSxDQUE3QjtrQkFDZUUsb0IiLCJmaWxlIjoibG9hZC1kYXRhLW1vZGFsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSAyMDE4IFViZXIgVGVjaG5vbG9naWVzLCBJbmMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuLy8gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuLy8gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuLy8gdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuLy8gY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4vLyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4vLyBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4vLyBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbi8vIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuLy8gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuLy8gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbi8vIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbi8vIFRIRSBTT0ZUV0FSRS5cblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgc3R5bGVkIGZyb20gJ3N0eWxlZC1jb21wb25lbnRzJztcblxuaW1wb3J0IEZpbGVVcGxvYWQgZnJvbSAnY29tcG9uZW50cy9jb21tb24vZmlsZS11cGxvYWRlci9maWxlLXVwbG9hZCc7XG5cbmNvbnN0IFN0eWxlZExvYWREYXRhTW9kYWwgPSBzdHlsZWQuZGl2YFxuICBwYWRkaW5nOiAxMHB4IDA7XG5gO1xuXG5jb25zdCBwcm9wVHlwZXMgPSB7XG4gIG9uQ2xvc2U6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG5cbiAgLy8gY2FsbCBiYWNrc1xuICBvbkZpbGVVcGxvYWQ6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWRcbn07XG5cbmV4cG9ydCBjb25zdCBMb2FkRGF0YU1vZGFsID0gcHJvcHMgPT4gKFxuICA8U3R5bGVkTG9hZERhdGFNb2RhbD5cbiAgICA8ZGl2IGNsYXNzTmFtZT1cImxvYWQtZGF0YS1tb2RhbFwiPlxuICAgICAgPEZpbGVVcGxvYWQgb25GaWxlVXBsb2FkPXtwcm9wcy5vbkZpbGVVcGxvYWR9IC8+XG4gICAgPC9kaXY+XG4gIDwvU3R5bGVkTG9hZERhdGFNb2RhbD5cbik7XG5cbkxvYWREYXRhTW9kYWwucHJvcFR5cGVzID0gcHJvcFR5cGVzO1xuXG5jb25zdCBsb2FkRGF0YU1vZGFsRmFjdG9yeSA9ICgpID0+IExvYWREYXRhTW9kYWw7XG5leHBvcnQgZGVmYXVsdCBsb2FkRGF0YU1vZGFsRmFjdG9yeTtcbiJdfQ==