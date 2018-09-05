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

var _base = require('../../components/common/icons/base');

var _base2 = _interopRequireDefault(_base);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LineLayerIcon = (_temp = _class = function (_Component) {
  (0, _inherits3.default)(LineLayerIcon, _Component);

  function LineLayerIcon() {
    (0, _classCallCheck3.default)(this, LineLayerIcon);
    return (0, _possibleConstructorReturn3.default)(this, (LineLayerIcon.__proto__ || Object.getPrototypeOf(LineLayerIcon)).apply(this, arguments));
  }

  (0, _createClass3.default)(LineLayerIcon, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        _base2.default,
        this.props,
        _react2.default.createElement('path', {
          d: 'M57.8,58.3c-0.4,0-0.8-0.2-1.1-0.5L33.1,32.1c-0.6-0.6-0.5-1.6,0.1-2.1c0.6-0.6,1.6-0.5,2.1,0.1l23.7,25.8 c0.6,0.6,0.5,1.6-0.1,2.1C58.5,58.2,58.2,58.3,57.8,58.3z',
          className: 'cr1'
        }),
        _react2.default.createElement('path', {
          d: 'M34.2,33.6c-0.6,0-1.2-0.2-1.7-0.6c-1-0.9-1.1-2.5-0.2-3.5l18.5-21c0.9-1,2.5-1.1,3.5-0.2c1,0.9,1.1,2.5,0.2,3.5L36,32.7 C35.5,33.3,34.9,33.6,34.2,33.6z',
          className: 'cr2'
        }),
        _react2.default.createElement('path', {
          d: 'M34.2,32.6c-0.5,0-1-0.3-1.3-0.8L20.7,10.2c-0.4-0.7-0.1-1.6,0.6-2c0.7-0.4,1.6-0.1,2,0.6l12.1,21.6c0.4,0.7,0.1,1.6-0.6,2 C34.7,32.5,34.4,32.6,34.2,32.6z',
          className: 'cr3'
        }),
        _react2.default.createElement('path', {
          d: 'M15.8,58.4c-0.3,0-0.6-0.1-0.9-0.3c-0.7-0.5-0.8-1.4-0.4-2.1l18.3-25.8c0.5-0.7,1.4-0.8,2.1-0.4s0.8,1.4,0.4,2.1L17.1,57.7 C16.8,58.2,16.3,58.4,15.8,58.4z',
          className: 'cr4'
        }),
        _react2.default.createElement('path', {
          d: 'M34.2,32.1c-0.1,0-0.3,0-0.4-0.1l-28.5-14c-0.5-0.2-0.7-0.8-0.5-1.3c0.2-0.5,0.8-0.7,1.3-0.5l28.5,14 c0.5,0.2,0.7,0.8,0.5,1.3C34.9,31.9,34.5,32.1,34.2,32.1z',
          className: 'cr5'
        })
      );
    }
  }]);
  return LineLayerIcon;
}(_react.Component), _class.propTypes = {
  /** Set the height of the icon, ex. '16px' */
  height: _propTypes2.default.string,
  colors: _propTypes2.default.arrayOf(_propTypes2.default.string)
}, _class.defaultProps = {
  height: '16px',
  predefinedClassName: 'line-layer-icon',
  totalColor: 5
}, _temp);
exports.default = LineLayerIcon;
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9sYXllcnMvbGluZS1sYXllci9saW5lLWxheWVyLWljb24uanMiXSwibmFtZXMiOlsiTGluZUxheWVySWNvbiIsInByb3BzIiwiQ29tcG9uZW50IiwicHJvcFR5cGVzIiwiaGVpZ2h0IiwiUHJvcFR5cGVzIiwic3RyaW5nIiwiY29sb3JzIiwiYXJyYXlPZiIsImRlZmF1bHRQcm9wcyIsInByZWRlZmluZWRDbGFzc05hbWUiLCJ0b3RhbENvbG9yIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzttQkFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztJQUVxQkEsYTs7Ozs7Ozs7Ozs2QkFhVjtBQUNQLGFBQ0U7QUFBQyxzQkFBRDtBQUFVLGFBQUtDLEtBQWY7QUFDRTtBQUNFLGFBQUUsZ0tBREo7QUFHRSxxQkFBVTtBQUhaLFVBREY7QUFNRTtBQUNFLGFBQUUsc0pBREo7QUFHRSxxQkFBVTtBQUhaLFVBTkY7QUFXRTtBQUNFLGFBQUUsd0pBREo7QUFHRSxxQkFBVTtBQUhaLFVBWEY7QUFnQkU7QUFDRSxhQUFFLHdKQURKO0FBR0UscUJBQVU7QUFIWixVQWhCRjtBQXFCRTtBQUNFLGFBQUUsMkpBREo7QUFHRSxxQkFBVTtBQUhaO0FBckJGLE9BREY7QUE2QkQ7OztFQTNDd0NDLGdCLFVBQ2xDQyxTLEdBQVk7QUFDakI7QUFDQUMsVUFBUUMsb0JBQVVDLE1BRkQ7QUFHakJDLFVBQVFGLG9CQUFVRyxPQUFWLENBQWtCSCxvQkFBVUMsTUFBNUI7QUFIUyxDLFNBTVpHLFksR0FBZTtBQUNwQkwsVUFBUSxNQURZO0FBRXBCTSx1QkFBcUIsaUJBRkQ7QUFHcEJDLGNBQVk7QUFIUSxDO2tCQVBIWCxhO0FBNENwQiIsImZpbGUiOiJsaW5lLWxheWVyLWljb24uanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIDIwMTggVWJlciBUZWNobm9sb2dpZXMsIEluYy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4vLyBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4vLyBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4vLyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4vLyBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbi8vIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbi8vIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1Jcbi8vIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuLy8gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4vLyBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4vLyBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuLy8gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuLy8gVEhFIFNPRlRXQVJFLlxuXG5pbXBvcnQgUmVhY3QsIHtDb21wb25lbnR9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgQmFzZSBmcm9tICdjb21wb25lbnRzL2NvbW1vbi9pY29ucy9iYXNlJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTGluZUxheWVySWNvbiBleHRlbmRzIENvbXBvbmVudCB7XG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgLyoqIFNldCB0aGUgaGVpZ2h0IG9mIHRoZSBpY29uLCBleC4gJzE2cHgnICovXG4gICAgaGVpZ2h0OiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGNvbG9yczogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLnN0cmluZylcbiAgfTtcblxuICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgIGhlaWdodDogJzE2cHgnLFxuICAgIHByZWRlZmluZWRDbGFzc05hbWU6ICdsaW5lLWxheWVyLWljb24nLFxuICAgIHRvdGFsQ29sb3I6IDVcbiAgfTtcblxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxCYXNlIHsuLi50aGlzLnByb3BzfT5cbiAgICAgICAgPHBhdGhcbiAgICAgICAgICBkPVwiTTU3LjgsNTguM2MtMC40LDAtMC44LTAuMi0xLjEtMC41TDMzLjEsMzIuMWMtMC42LTAuNi0wLjUtMS42LDAuMS0yLjFjMC42LTAuNiwxLjYtMC41LDIuMSwwLjFsMjMuNywyNS44XG4gICAgICAgICAgYzAuNiwwLjYsMC41LDEuNi0wLjEsMi4xQzU4LjUsNTguMiw1OC4yLDU4LjMsNTcuOCw1OC4zelwiXG4gICAgICAgICAgY2xhc3NOYW1lPVwiY3IxXCJcbiAgICAgICAgLz5cbiAgICAgICAgPHBhdGhcbiAgICAgICAgICBkPVwiTTM0LjIsMzMuNmMtMC42LDAtMS4yLTAuMi0xLjctMC42Yy0xLTAuOS0xLjEtMi41LTAuMi0zLjVsMTguNS0yMWMwLjktMSwyLjUtMS4xLDMuNS0wLjJjMSwwLjksMS4xLDIuNSwwLjIsMy41TDM2LDMyLjdcbiAgICAgICAgICBDMzUuNSwzMy4zLDM0LjksMzMuNiwzNC4yLDMzLjZ6XCJcbiAgICAgICAgICBjbGFzc05hbWU9XCJjcjJcIlxuICAgICAgICAvPlxuICAgICAgICA8cGF0aFxuICAgICAgICAgIGQ9XCJNMzQuMiwzMi42Yy0wLjUsMC0xLTAuMy0xLjMtMC44TDIwLjcsMTAuMmMtMC40LTAuNy0wLjEtMS42LDAuNi0yYzAuNy0wLjQsMS42LTAuMSwyLDAuNmwxMi4xLDIxLjZjMC40LDAuNywwLjEsMS42LTAuNiwyXG4gICAgICAgICAgQzM0LjcsMzIuNSwzNC40LDMyLjYsMzQuMiwzMi42elwiXG4gICAgICAgICAgY2xhc3NOYW1lPVwiY3IzXCJcbiAgICAgICAgLz5cbiAgICAgICAgPHBhdGhcbiAgICAgICAgICBkPVwiTTE1LjgsNTguNGMtMC4zLDAtMC42LTAuMS0wLjktMC4zYy0wLjctMC41LTAuOC0xLjQtMC40LTIuMWwxOC4zLTI1LjhjMC41LTAuNywxLjQtMC44LDIuMS0wLjRzMC44LDEuNCwwLjQsMi4xTDE3LjEsNTcuN1xuICAgICAgICAgIEMxNi44LDU4LjIsMTYuMyw1OC40LDE1LjgsNTguNHpcIlxuICAgICAgICAgIGNsYXNzTmFtZT1cImNyNFwiXG4gICAgICAgIC8+XG4gICAgICAgIDxwYXRoXG4gICAgICAgICAgZD1cIk0zNC4yLDMyLjFjLTAuMSwwLTAuMywwLTAuNC0wLjFsLTI4LjUtMTRjLTAuNS0wLjItMC43LTAuOC0wLjUtMS4zYzAuMi0wLjUsMC44LTAuNywxLjMtMC41bDI4LjUsMTRcbiAgICAgICAgICBjMC41LDAuMiwwLjcsMC44LDAuNSwxLjNDMzQuOSwzMS45LDM0LjUsMzIuMSwzNC4yLDMyLjF6XCJcbiAgICAgICAgICBjbGFzc05hbWU9XCJjcjVcIlxuICAgICAgICAvPlxuICAgICAgPC9CYXNlPlxuICAgICk7XG4gIH1cbn07XG4iXX0=