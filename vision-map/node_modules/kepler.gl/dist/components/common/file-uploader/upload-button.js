'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

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

var _class, _temp2;

var _templateObject = (0, _taggedTemplateLiteral3.default)(['\n  display: inline-block;\n  color: ', ';\n  font-size: 12px;\n  text-decoration: underline;\n\n  :hover {\n    cursor: pointer;\n    font-weight: 500;\n  }\n'], ['\n  display: inline-block;\n  color: ', ';\n  font-size: 12px;\n  text-decoration: underline;\n\n  :hover {\n    cursor: pointer;\n    font-weight: 500;\n  }\n']); // Copyright (c) 2018 Uber Technologies, Inc.
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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Wrapper = _styledComponents2.default.div(_templateObject, function (props) {
  return props.theme.textColorLT;
});
/*
Inspired by https://github.com/okonet/react-dropzone/blob/master/src/index.js
*/
var UploadButton = (_temp2 = _class = function (_Component) {
  (0, _inherits3.default)(UploadButton, _Component);

  function UploadButton() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, UploadButton);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = UploadButton.__proto__ || Object.getPrototypeOf(UploadButton)).call.apply(_ref, [this].concat(args))), _this), _this._onClick = function () {
      _this._fileInput.value = null;
      _this._fileInput.click();
    }, _this._onChange = function (_ref2) {
      var files = _ref2.target.files;

      if (!files) {
        return;
      }

      _this.props.onUpload(files);
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(UploadButton, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement(
        Wrapper,
        null,
        _react2.default.createElement('input', {
          type: 'file',
          ref: function ref(_ref3) {
            _this2._fileInput = _ref3;
          },
          style: { display: 'none' },
          onChange: this._onChange
        }),
        _react2.default.createElement(
          'span',
          { onClick: this._onClick },
          this.props.children
        )
      );
    }
  }]);
  return UploadButton;
}(_react.Component), _class.propTypes = {
  onUpload: _propTypes2.default.func.isRequired
}, _temp2);
exports.default = UploadButton;
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2NvbW1vbi9maWxlLXVwbG9hZGVyL3VwbG9hZC1idXR0b24uanMiXSwibmFtZXMiOlsiV3JhcHBlciIsInN0eWxlZCIsImRpdiIsInByb3BzIiwidGhlbWUiLCJ0ZXh0Q29sb3JMVCIsIlVwbG9hZEJ1dHRvbiIsIl9vbkNsaWNrIiwiX2ZpbGVJbnB1dCIsInZhbHVlIiwiY2xpY2siLCJfb25DaGFuZ2UiLCJmaWxlcyIsInRhcmdldCIsIm9uVXBsb2FkIiwicmVmIiwiZGlzcGxheSIsImNoaWxkcmVuIiwiQ29tcG9uZW50IiwicHJvcFR5cGVzIiwiUHJvcFR5cGVzIiwiZnVuYyIsImlzUmVxdWlyZWQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O3NZQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBRUEsSUFBTUEsVUFBVUMsMkJBQU9DLEdBQWpCLGtCQUVLO0FBQUEsU0FBU0MsTUFBTUMsS0FBTixDQUFZQyxXQUFyQjtBQUFBLENBRkwsQ0FBTjtBQVdBOzs7SUFHcUJDLFk7Ozs7Ozs7Ozs7Ozs7O2dOQUtuQkMsUSxHQUFXLFlBQU07QUFDZixZQUFLQyxVQUFMLENBQWdCQyxLQUFoQixHQUF3QixJQUF4QjtBQUNBLFlBQUtELFVBQUwsQ0FBZ0JFLEtBQWhCO0FBQ0QsSyxRQUVEQyxTLEdBQVksaUJBQXVCO0FBQUEsVUFBWkMsS0FBWSxTQUFyQkMsTUFBcUIsQ0FBWkQsS0FBWTs7QUFDakMsVUFBSSxDQUFDQSxLQUFMLEVBQVk7QUFDVjtBQUNEOztBQUVELFlBQUtULEtBQUwsQ0FBV1csUUFBWCxDQUFvQkYsS0FBcEI7QUFDRCxLOzs7Ozs2QkFFUTtBQUFBOztBQUNQLGFBQ0U7QUFBQyxlQUFEO0FBQUE7QUFDRTtBQUNFLGdCQUFLLE1BRFA7QUFFRSxlQUFLLG9CQUFPO0FBQUMsbUJBQUtKLFVBQUwsR0FBa0JPLEtBQWxCO0FBQXNCLFdBRnJDO0FBR0UsaUJBQU8sRUFBQ0MsU0FBUyxNQUFWLEVBSFQ7QUFJRSxvQkFBVSxLQUFLTDtBQUpqQixVQURGO0FBT0U7QUFBQTtBQUFBLFlBQU0sU0FBUyxLQUFLSixRQUFwQjtBQUErQixlQUFLSixLQUFMLENBQVdjO0FBQTFDO0FBUEYsT0FERjtBQVdEOzs7RUE5QnVDQyxnQixVQUNqQ0MsUyxHQUFZO0FBQ2pCTCxZQUFVTSxvQkFBVUMsSUFBVixDQUFlQztBQURSLEM7a0JBREFoQixZO0FBK0JwQiIsImZpbGUiOiJ1cGxvYWQtYnV0dG9uLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSAyMDE4IFViZXIgVGVjaG5vbG9naWVzLCBJbmMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuLy8gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuLy8gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuLy8gdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuLy8gY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4vLyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4vLyBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4vLyBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbi8vIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuLy8gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuLy8gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbi8vIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbi8vIFRIRSBTT0ZUV0FSRS5cblxuaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50fSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHN0eWxlZCBmcm9tICdzdHlsZWQtY29tcG9uZW50cyc7XG5cbmNvbnN0IFdyYXBwZXIgPSBzdHlsZWQuZGl2YFxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gIGNvbG9yOiAke3Byb3BzID0+IHByb3BzLnRoZW1lLnRleHRDb2xvckxUfTtcbiAgZm9udC1zaXplOiAxMnB4O1xuICB0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZTtcblxuICA6aG92ZXIge1xuICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICBmb250LXdlaWdodDogNTAwO1xuICB9XG5gO1xuLypcbkluc3BpcmVkIGJ5IGh0dHBzOi8vZ2l0aHViLmNvbS9va29uZXQvcmVhY3QtZHJvcHpvbmUvYmxvYi9tYXN0ZXIvc3JjL2luZGV4LmpzXG4qL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVXBsb2FkQnV0dG9uIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICBvblVwbG9hZDogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZFxuICB9O1xuXG4gIF9vbkNsaWNrID0gKCkgPT4ge1xuICAgIHRoaXMuX2ZpbGVJbnB1dC52YWx1ZSA9IG51bGw7XG4gICAgdGhpcy5fZmlsZUlucHV0LmNsaWNrKCk7XG4gIH07XG5cbiAgX29uQ2hhbmdlID0gKHt0YXJnZXQ6IHtmaWxlc319KSA9PiB7XG4gICAgaWYgKCFmaWxlcykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMucHJvcHMub25VcGxvYWQoZmlsZXMpO1xuICB9O1xuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPFdyYXBwZXI+XG4gICAgICAgIDxpbnB1dFxuICAgICAgICAgIHR5cGU9XCJmaWxlXCJcbiAgICAgICAgICByZWY9e3JlZiA9PiB7dGhpcy5fZmlsZUlucHV0ID0gcmVmfX1cbiAgICAgICAgICBzdHlsZT17e2Rpc3BsYXk6ICdub25lJ319XG4gICAgICAgICAgb25DaGFuZ2U9e3RoaXMuX29uQ2hhbmdlfVxuICAgICAgICAvPlxuICAgICAgICA8c3BhbiBvbkNsaWNrPXt0aGlzLl9vbkNsaWNrfT57dGhpcy5wcm9wcy5jaGlsZHJlbn08L3NwYW4+XG4gICAgICA8L1dyYXBwZXI+XG4gICAgKTtcbiAgfVxufTtcbiJdfQ==