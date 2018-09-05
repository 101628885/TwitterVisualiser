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

var _class, _temp; // Copyright (c) 2018 Uber Technologies, Inc.
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

var _base = require('./base');

var _base2 = _interopRequireDefault(_base);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Histogram = (_temp = _class = function (_React$Component) {
  (0, _inherits3.default)(Histogram, _React$Component);

  function Histogram() {
    (0, _classCallCheck3.default)(this, Histogram);
    return (0, _possibleConstructorReturn3.default)(this, (Histogram.__proto__ || Object.getPrototypeOf(Histogram)).apply(this, arguments));
  }

  (0, _createClass3.default)(Histogram, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        _base2.default,
        this.props,
        _react2.default.createElement(
          'g',
          { transform: 'translate(7.500000, 7.500000)' },
          _react2.default.createElement('path', {
            d: 'M5,40.593203 L16.7666161,40.593203 L16.7666161,10 L5,10 L5,40.593203 L5,40.593203 Z M33.2333839,40.593203 L45,40.593203 L45,10 L33.2333839,10 L33.2333839,40.593203 L33.2333839,40.593203 Z M30.883308,40.5892837 L30.883308,26.4693451 L19.116692,26.4693451 L19.116692,40.5892837 L30.883308,40.5892837 Z',
            id: 'Shape'
          })
        )
      );
    }
  }]);
  return Histogram;
}(_react2.default.Component), _class.propTypes = {
  height: _propTypes2.default.string
}, _class.defaultProps = {
  height: '16px',
  predefinedClassName: 'data-ex-icons-histogram'
}, _temp);
exports.default = Histogram;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2NvbW1vbi9pY29ucy9oaXN0b2dyYW0uanMiXSwibmFtZXMiOlsiSGlzdG9ncmFtIiwicHJvcHMiLCJSZWFjdCIsIkNvbXBvbmVudCIsInByb3BUeXBlcyIsImhlaWdodCIsIlByb3BUeXBlcyIsInN0cmluZyIsImRlZmF1bHRQcm9wcyIsInByZWRlZmluZWRDbGFzc05hbWUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O21CQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0lBRXFCQSxTOzs7Ozs7Ozs7OzZCQVVWO0FBQ1AsYUFDRTtBQUFDLHNCQUFEO0FBQVUsYUFBS0MsS0FBZjtBQUNFO0FBQUE7QUFBQSxZQUFHLFdBQVUsK0JBQWI7QUFDRTtBQUNFLGVBQUUsNlNBREo7QUFFRSxnQkFBRztBQUZMO0FBREY7QUFERixPQURGO0FBVUQ7OztFQXJCb0NDLGdCQUFNQyxTLFVBQ3BDQyxTLEdBQVk7QUFDakJDLFVBQVFDLG9CQUFVQztBQURELEMsU0FJWkMsWSxHQUFlO0FBQ3BCSCxVQUFRLE1BRFk7QUFFcEJJLHVCQUFxQjtBQUZELEM7a0JBTEhULFMiLCJmaWxlIjoiaGlzdG9ncmFtLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSAyMDE4IFViZXIgVGVjaG5vbG9naWVzLCBJbmMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuLy8gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuLy8gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuLy8gdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuLy8gY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4vLyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4vLyBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4vLyBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbi8vIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuLy8gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuLy8gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbi8vIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbi8vIFRIRSBTT0ZUV0FSRS5cblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgQmFzZSBmcm9tICcuL2Jhc2UnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIaXN0b2dyYW0gZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIGhlaWdodDogUHJvcFR5cGVzLnN0cmluZ1xuICB9O1xuXG4gIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgaGVpZ2h0OiAnMTZweCcsXG4gICAgcHJlZGVmaW5lZENsYXNzTmFtZTogJ2RhdGEtZXgtaWNvbnMtaGlzdG9ncmFtJ1xuICB9O1xuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPEJhc2Ugey4uLnRoaXMucHJvcHN9PlxuICAgICAgICA8ZyB0cmFuc2Zvcm09XCJ0cmFuc2xhdGUoNy41MDAwMDAsIDcuNTAwMDAwKVwiPlxuICAgICAgICAgIDxwYXRoXG4gICAgICAgICAgICBkPVwiTTUsNDAuNTkzMjAzIEwxNi43NjY2MTYxLDQwLjU5MzIwMyBMMTYuNzY2NjE2MSwxMCBMNSwxMCBMNSw0MC41OTMyMDMgTDUsNDAuNTkzMjAzIFogTTMzLjIzMzM4MzksNDAuNTkzMjAzIEw0NSw0MC41OTMyMDMgTDQ1LDEwIEwzMy4yMzMzODM5LDEwIEwzMy4yMzMzODM5LDQwLjU5MzIwMyBMMzMuMjMzMzgzOSw0MC41OTMyMDMgWiBNMzAuODgzMzA4LDQwLjU4OTI4MzcgTDMwLjg4MzMwOCwyNi40NjkzNDUxIEwxOS4xMTY2OTIsMjYuNDY5MzQ1MSBMMTkuMTE2NjkyLDQwLjU4OTI4MzcgTDMwLjg4MzMwOCw0MC41ODkyODM3IFpcIlxuICAgICAgICAgICAgaWQ9XCJTaGFwZVwiXG4gICAgICAgICAgLz5cbiAgICAgICAgPC9nPlxuICAgICAgPC9CYXNlPlxuICAgICk7XG4gIH1cbn1cbiJdfQ==