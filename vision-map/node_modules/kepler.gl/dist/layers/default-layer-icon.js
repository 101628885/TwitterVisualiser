'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

var _base = require('../components/common/icons/base');

var _base2 = _interopRequireDefault(_base);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DefaultLayerIcon = (_temp = _class = function (_Component) {
  (0, _inherits3.default)(DefaultLayerIcon, _Component);

  function DefaultLayerIcon() {
    (0, _classCallCheck3.default)(this, DefaultLayerIcon);
    return (0, _possibleConstructorReturn3.default)(this, (DefaultLayerIcon.__proto__ || Object.getPrototypeOf(DefaultLayerIcon)).apply(this, arguments));
  }

  (0, _createClass3.default)(DefaultLayerIcon, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        _base2.default,
        this.props,
        _react2.default.createElement('circle', { cx: '29.4', cy: '31.6', r: '8.4' }),
        _react2.default.createElement('circle', { cx: '48.5', cy: '15.7', r: '6.5' }),
        _react2.default.createElement('circle', { cx: '11', cy: '44.2', r: '3' }),
        _react2.default.createElement('circle', { cx: '50', cy: '44.2', r: '5' }),
        _react2.default.createElement('circle', { cx: '34', cy: '54.2', r: '3' }),
        _react2.default.createElement('circle', { cx: '14', cy: '16.2', r: '4' })
      );
    }
  }]);
  return DefaultLayerIcon;
}(_react.Component), _class.propTypes = {
  height: _propTypes2.default.string,
  colors: _propTypes2.default.arrayOf(_propTypes2.default.string)
}, _class.defaultProps = {
  height: '16px',
  predefinedClassName: 'default-layer-icon'
}, _temp);
;

exports.default = DefaultLayerIcon;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9sYXllcnMvZGVmYXVsdC1sYXllci1pY29uLmpzIl0sIm5hbWVzIjpbIkRlZmF1bHRMYXllckljb24iLCJwcm9wcyIsIkNvbXBvbmVudCIsInByb3BUeXBlcyIsImhlaWdodCIsIlByb3BUeXBlcyIsInN0cmluZyIsImNvbG9ycyIsImFycmF5T2YiLCJkZWZhdWx0UHJvcHMiLCJwcmVkZWZpbmVkQ2xhc3NOYW1lIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O21CQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0lBRU1BLGdCOzs7Ozs7Ozs7OzZCQVdLO0FBQ1AsYUFDRTtBQUFDLHNCQUFEO0FBQVUsYUFBS0MsS0FBZjtBQUNFLGtEQUFRLElBQUcsTUFBWCxFQUFrQixJQUFHLE1BQXJCLEVBQTRCLEdBQUUsS0FBOUIsR0FERjtBQUVFLGtEQUFRLElBQUcsTUFBWCxFQUFrQixJQUFHLE1BQXJCLEVBQTRCLEdBQUUsS0FBOUIsR0FGRjtBQUdFLGtEQUFRLElBQUcsSUFBWCxFQUFnQixJQUFHLE1BQW5CLEVBQTBCLEdBQUUsR0FBNUIsR0FIRjtBQUlFLGtEQUFRLElBQUcsSUFBWCxFQUFnQixJQUFHLE1BQW5CLEVBQTBCLEdBQUUsR0FBNUIsR0FKRjtBQUtFLGtEQUFRLElBQUcsSUFBWCxFQUFnQixJQUFHLE1BQW5CLEVBQTBCLEdBQUUsR0FBNUIsR0FMRjtBQU1FLGtEQUFRLElBQUcsSUFBWCxFQUFnQixJQUFHLE1BQW5CLEVBQTBCLEdBQUUsR0FBNUI7QUFORixPQURGO0FBVUQ7OztFQXRCNEJDLGdCLFVBQ3RCQyxTLEdBQVk7QUFDakJDLFVBQVFDLG9CQUFVQyxNQUREO0FBRWpCQyxVQUFRRixvQkFBVUcsT0FBVixDQUFrQkgsb0JBQVVDLE1BQTVCO0FBRlMsQyxTQUtaRyxZLEdBQWU7QUFDcEJMLFVBQVEsTUFEWTtBQUVwQk0sdUJBQXFCO0FBRkQsQztBQWlCdkI7O2tCQUVjVixnQiIsImZpbGUiOiJkZWZhdWx0LWxheWVyLWljb24uanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIDIwMTggVWJlciBUZWNobm9sb2dpZXMsIEluYy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4vLyBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4vLyBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4vLyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4vLyBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbi8vIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbi8vIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1Jcbi8vIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuLy8gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4vLyBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4vLyBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuLy8gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuLy8gVEhFIFNPRlRXQVJFLlxuXG5pbXBvcnQgUmVhY3QsIHtDb21wb25lbnR9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgQmFzZSBmcm9tICdjb21wb25lbnRzL2NvbW1vbi9pY29ucy9iYXNlJztcblxuY2xhc3MgRGVmYXVsdExheWVySWNvbiBleHRlbmRzIENvbXBvbmVudCB7XG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgaGVpZ2h0OiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGNvbG9yczogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLnN0cmluZylcbiAgfTtcblxuICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgIGhlaWdodDogJzE2cHgnLFxuICAgIHByZWRlZmluZWRDbGFzc05hbWU6ICdkZWZhdWx0LWxheWVyLWljb24nXG4gIH07XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8QmFzZSB7Li4udGhpcy5wcm9wc30+XG4gICAgICAgIDxjaXJjbGUgY3g9XCIyOS40XCIgY3k9XCIzMS42XCIgcj1cIjguNFwiIC8+XG4gICAgICAgIDxjaXJjbGUgY3g9XCI0OC41XCIgY3k9XCIxNS43XCIgcj1cIjYuNVwiIC8+XG4gICAgICAgIDxjaXJjbGUgY3g9XCIxMVwiIGN5PVwiNDQuMlwiIHI9XCIzXCIgLz5cbiAgICAgICAgPGNpcmNsZSBjeD1cIjUwXCIgY3k9XCI0NC4yXCIgcj1cIjVcIiAvPlxuICAgICAgICA8Y2lyY2xlIGN4PVwiMzRcIiBjeT1cIjU0LjJcIiByPVwiM1wiIC8+XG4gICAgICAgIDxjaXJjbGUgY3g9XCIxNFwiIGN5PVwiMTYuMlwiIHI9XCI0XCIgLz5cbiAgICAgIDwvQmFzZT5cbiAgICApO1xuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBEZWZhdWx0TGF5ZXJJY29uO1xuIl19