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

var GeojsonLayerIcon = (_temp = _class = function (_Component) {
  (0, _inherits3.default)(GeojsonLayerIcon, _Component);

  function GeojsonLayerIcon() {
    (0, _classCallCheck3.default)(this, GeojsonLayerIcon);
    return (0, _possibleConstructorReturn3.default)(this, (GeojsonLayerIcon.__proto__ || Object.getPrototypeOf(GeojsonLayerIcon)).apply(this, arguments));
  }

  (0, _createClass3.default)(GeojsonLayerIcon, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        _base2.default,
        this.props,
        _react2.default.createElement('polygon', {
          className: 'cr1',
          points: '25.04 23.08 9.72 31.79 8.19 43.2 19.57 53.83 28.79 53.83 35.6 46.57 39.45 30.08 25.04 23.08'
        }),
        _react2.default.createElement('polygon', {
          className: 'cr2',
          points: '52.8 26.3 41.74 30.32 37.9 46.75 45.26 53.83 51.45 53.83 55.07 43.51 52.8 26.3',
          style: { opacity: 0.8 }
        }),
        _react2.default.createElement('polygon', {
          className: 'cr3',
          points: '36.69 48.75 31.93 53.83 41.96 53.83 36.69 48.75',
          style: { opacity: 0.4 }
        }),
        _react2.default.createElement('polygon', {
          className: 'cr3',
          points: '25.95 20.98 40.84 28.22 52.57 24.06 50.89 11.5 23.24 11.5 25.95 20.98',
          style: { opacity: 0.4 }
        }),
        _react2.default.createElement('polygon', {
          className: 'cr4',
          points: '20.79 11.9 11.73 15.72 10.08 28.96 23.64 21.25 20.79 11.9',
          style: { opacity: 0.8 }
        })
      );
    }
  }]);
  return GeojsonLayerIcon;
}(_react.Component), _class.propTypes = {
  /** Set the height of the icon, ex. '16px' */
  height: _propTypes2.default.string,
  colors: _propTypes2.default.arrayOf(_propTypes2.default.string)
}, _class.defaultProps = {
  height: null,
  size: 'tiny',
  predefinedClassName: 'geojson-layer-icon'
}, _temp);
exports.default = GeojsonLayerIcon;
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9sYXllcnMvZ2VvanNvbi1sYXllci9nZW9qc29uLWxheWVyLWljb24uanMiXSwibmFtZXMiOlsiR2VvanNvbkxheWVySWNvbiIsInByb3BzIiwib3BhY2l0eSIsIkNvbXBvbmVudCIsInByb3BUeXBlcyIsImhlaWdodCIsIlByb3BUeXBlcyIsInN0cmluZyIsImNvbG9ycyIsImFycmF5T2YiLCJkZWZhdWx0UHJvcHMiLCJzaXplIiwicHJlZGVmaW5lZENsYXNzTmFtZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7bUJBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7SUFFcUJBLGdCOzs7Ozs7Ozs7OzZCQWFWO0FBQ1AsYUFDRTtBQUFDLHNCQUFEO0FBQVUsYUFBS0MsS0FBZjtBQUNFO0FBQ0UscUJBQVUsS0FEWjtBQUVFLGtCQUFPO0FBRlQsVUFERjtBQUtFO0FBQ0UscUJBQVUsS0FEWjtBQUVFLGtCQUFPLGdGQUZUO0FBR0UsaUJBQU8sRUFBQ0MsU0FBUyxHQUFWO0FBSFQsVUFMRjtBQVVFO0FBQ0UscUJBQVUsS0FEWjtBQUVFLGtCQUFPLGlEQUZUO0FBR0UsaUJBQU8sRUFBQ0EsU0FBUyxHQUFWO0FBSFQsVUFWRjtBQWVFO0FBQ0UscUJBQVUsS0FEWjtBQUVFLGtCQUFPLHVFQUZUO0FBR0UsaUJBQU8sRUFBQ0EsU0FBUyxHQUFWO0FBSFQsVUFmRjtBQW9CRTtBQUNFLHFCQUFVLEtBRFo7QUFFRSxrQkFBTywyREFGVDtBQUdFLGlCQUFPLEVBQUNBLFNBQVMsR0FBVjtBQUhUO0FBcEJGLE9BREY7QUE0QkQ7OztFQTFDMkNDLGdCLFVBQ3JDQyxTLEdBQVk7QUFDakI7QUFDQUMsVUFBUUMsb0JBQVVDLE1BRkQ7QUFHakJDLFVBQVFGLG9CQUFVRyxPQUFWLENBQWtCSCxvQkFBVUMsTUFBNUI7QUFIUyxDLFNBTVpHLFksR0FBZTtBQUNwQkwsVUFBUSxJQURZO0FBRXBCTSxRQUFNLE1BRmM7QUFHcEJDLHVCQUFxQjtBQUhELEM7a0JBUEhaLGdCO0FBMkNwQiIsImZpbGUiOiJnZW9qc29uLWxheWVyLWljb24uanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIDIwMTggVWJlciBUZWNobm9sb2dpZXMsIEluYy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4vLyBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4vLyBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4vLyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4vLyBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbi8vIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbi8vIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1Jcbi8vIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuLy8gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4vLyBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4vLyBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuLy8gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuLy8gVEhFIFNPRlRXQVJFLlxuXG5pbXBvcnQgUmVhY3QsIHtDb21wb25lbnR9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgQmFzZSBmcm9tICdjb21wb25lbnRzL2NvbW1vbi9pY29ucy9iYXNlJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2VvanNvbkxheWVySWNvbiBleHRlbmRzIENvbXBvbmVudCB7XG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgLyoqIFNldCB0aGUgaGVpZ2h0IG9mIHRoZSBpY29uLCBleC4gJzE2cHgnICovXG4gICAgaGVpZ2h0OiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGNvbG9yczogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLnN0cmluZylcbiAgfTtcblxuICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgIGhlaWdodDogbnVsbCxcbiAgICBzaXplOiAndGlueScsXG4gICAgcHJlZGVmaW5lZENsYXNzTmFtZTogJ2dlb2pzb24tbGF5ZXItaWNvbidcbiAgfTtcblxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxCYXNlIHsuLi50aGlzLnByb3BzfT5cbiAgICAgICAgPHBvbHlnb25cbiAgICAgICAgICBjbGFzc05hbWU9XCJjcjFcIlxuICAgICAgICAgIHBvaW50cz1cIjI1LjA0IDIzLjA4IDkuNzIgMzEuNzkgOC4xOSA0My4yIDE5LjU3IDUzLjgzIDI4Ljc5IDUzLjgzIDM1LjYgNDYuNTcgMzkuNDUgMzAuMDggMjUuMDQgMjMuMDhcIlxuICAgICAgICAvPlxuICAgICAgICA8cG9seWdvblxuICAgICAgICAgIGNsYXNzTmFtZT1cImNyMlwiXG4gICAgICAgICAgcG9pbnRzPVwiNTIuOCAyNi4zIDQxLjc0IDMwLjMyIDM3LjkgNDYuNzUgNDUuMjYgNTMuODMgNTEuNDUgNTMuODMgNTUuMDcgNDMuNTEgNTIuOCAyNi4zXCJcbiAgICAgICAgICBzdHlsZT17e29wYWNpdHk6IDAuOH19XG4gICAgICAgIC8+XG4gICAgICAgIDxwb2x5Z29uXG4gICAgICAgICAgY2xhc3NOYW1lPVwiY3IzXCJcbiAgICAgICAgICBwb2ludHM9XCIzNi42OSA0OC43NSAzMS45MyA1My44MyA0MS45NiA1My44MyAzNi42OSA0OC43NVwiXG4gICAgICAgICAgc3R5bGU9e3tvcGFjaXR5OiAwLjR9fVxuICAgICAgICAvPlxuICAgICAgICA8cG9seWdvblxuICAgICAgICAgIGNsYXNzTmFtZT1cImNyM1wiXG4gICAgICAgICAgcG9pbnRzPVwiMjUuOTUgMjAuOTggNDAuODQgMjguMjIgNTIuNTcgMjQuMDYgNTAuODkgMTEuNSAyMy4yNCAxMS41IDI1Ljk1IDIwLjk4XCJcbiAgICAgICAgICBzdHlsZT17e29wYWNpdHk6IDAuNH19XG4gICAgICAgIC8+XG4gICAgICAgIDxwb2x5Z29uXG4gICAgICAgICAgY2xhc3NOYW1lPVwiY3I0XCJcbiAgICAgICAgICBwb2ludHM9XCIyMC43OSAxMS45IDExLjczIDE1LjcyIDEwLjA4IDI4Ljk2IDIzLjY0IDIxLjI1IDIwLjc5IDExLjlcIlxuICAgICAgICAgIHN0eWxlPXt7b3BhY2l0eTogMC44fX1cbiAgICAgICAgLz5cbiAgICAgIDwvQmFzZT5cbiAgICApO1xuICB9XG59O1xuIl19