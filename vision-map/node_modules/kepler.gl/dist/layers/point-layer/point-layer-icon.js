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

var _base = require('../../components/common/icons/base');

var _base2 = _interopRequireDefault(_base);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PointLayerIcon = (_temp = _class = function (_Component) {
  (0, _inherits3.default)(PointLayerIcon, _Component);

  function PointLayerIcon() {
    (0, _classCallCheck3.default)(this, PointLayerIcon);
    return (0, _possibleConstructorReturn3.default)(this, (PointLayerIcon.__proto__ || Object.getPrototypeOf(PointLayerIcon)).apply(this, arguments));
  }

  (0, _createClass3.default)(PointLayerIcon, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        _base2.default,
        this.props,
        _react2.default.createElement('circle', { cx: '29.4', cy: '31.6', r: '8.4', className: 'cr1' }),
        _react2.default.createElement('circle', { cx: '48.5', cy: '15.7', r: '6.5', className: 'cr2' }),
        _react2.default.createElement('circle', { cx: '11', cy: '44.2', r: '3', className: 'cr3' }),
        _react2.default.createElement('circle', { cx: '50', cy: '44.2', r: '5', className: 'cr4' }),
        _react2.default.createElement('circle', { cx: '34', cy: '54.2', r: '3', className: 'cr5' }),
        _react2.default.createElement('circle', { cx: '14', cy: '16.2', r: '4', className: 'cr6' })
      );
    }
  }]);
  return PointLayerIcon;
}(_react.Component), _class.propTypes = {
  height: _propTypes2.default.string,
  colors: _propTypes2.default.arrayOf(_propTypes2.default.string)
}, _class.defaultProps = {
  height: '16px',
  predefinedClassName: 'point-layer-icon',
  totalColor: 6
}, _temp);
;

exports.default = PointLayerIcon;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9sYXllcnMvcG9pbnQtbGF5ZXIvcG9pbnQtbGF5ZXItaWNvbi5qcyJdLCJuYW1lcyI6WyJQb2ludExheWVySWNvbiIsInByb3BzIiwiQ29tcG9uZW50IiwicHJvcFR5cGVzIiwiaGVpZ2h0IiwiUHJvcFR5cGVzIiwic3RyaW5nIiwiY29sb3JzIiwiYXJyYXlPZiIsImRlZmF1bHRQcm9wcyIsInByZWRlZmluZWRDbGFzc05hbWUiLCJ0b3RhbENvbG9yIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O21CQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0lBRU1BLGM7Ozs7Ozs7Ozs7NkJBWUs7QUFDUCxhQUNFO0FBQUMsc0JBQUQ7QUFBVSxhQUFLQyxLQUFmO0FBQ0Usa0RBQVEsSUFBRyxNQUFYLEVBQWtCLElBQUcsTUFBckIsRUFBNEIsR0FBRSxLQUE5QixFQUFvQyxXQUFVLEtBQTlDLEdBREY7QUFFRSxrREFBUSxJQUFHLE1BQVgsRUFBa0IsSUFBRyxNQUFyQixFQUE0QixHQUFFLEtBQTlCLEVBQW9DLFdBQVUsS0FBOUMsR0FGRjtBQUdFLGtEQUFRLElBQUcsSUFBWCxFQUFnQixJQUFHLE1BQW5CLEVBQTBCLEdBQUUsR0FBNUIsRUFBZ0MsV0FBVSxLQUExQyxHQUhGO0FBSUUsa0RBQVEsSUFBRyxJQUFYLEVBQWdCLElBQUcsTUFBbkIsRUFBMEIsR0FBRSxHQUE1QixFQUFnQyxXQUFVLEtBQTFDLEdBSkY7QUFLRSxrREFBUSxJQUFHLElBQVgsRUFBZ0IsSUFBRyxNQUFuQixFQUEwQixHQUFFLEdBQTVCLEVBQWdDLFdBQVUsS0FBMUMsR0FMRjtBQU1FLGtEQUFRLElBQUcsSUFBWCxFQUFnQixJQUFHLE1BQW5CLEVBQTBCLEdBQUUsR0FBNUIsRUFBZ0MsV0FBVSxLQUExQztBQU5GLE9BREY7QUFVRDs7O0VBdkIwQkMsZ0IsVUFDcEJDLFMsR0FBWTtBQUNqQkMsVUFBUUMsb0JBQVVDLE1BREQ7QUFFakJDLFVBQVFGLG9CQUFVRyxPQUFWLENBQWtCSCxvQkFBVUMsTUFBNUI7QUFGUyxDLFNBS1pHLFksR0FBZTtBQUNwQkwsVUFBUSxNQURZO0FBRXBCTSx1QkFBcUIsa0JBRkQ7QUFHcEJDLGNBQVk7QUFIUSxDO0FBa0J2Qjs7a0JBRWNYLGMiLCJmaWxlIjoicG9pbnQtbGF5ZXItaWNvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgMjAxOCBVYmVyIFRlY2hub2xvZ2llcywgSW5jLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbi8vIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbi8vIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbi8vIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbi8vIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuLy8gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuLy8gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4vLyBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbi8vIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbi8vIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4vLyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4vLyBUSEUgU09GVFdBUkUuXG5cbmltcG9ydCBSZWFjdCwge0NvbXBvbmVudH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCBCYXNlIGZyb20gJ2NvbXBvbmVudHMvY29tbW9uL2ljb25zL2Jhc2UnO1xuXG5jbGFzcyBQb2ludExheWVySWNvbiBleHRlbmRzIENvbXBvbmVudCB7XG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgaGVpZ2h0OiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGNvbG9yczogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLnN0cmluZylcbiAgfTtcblxuICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgIGhlaWdodDogJzE2cHgnLFxuICAgIHByZWRlZmluZWRDbGFzc05hbWU6ICdwb2ludC1sYXllci1pY29uJyxcbiAgICB0b3RhbENvbG9yOiA2XG4gIH07XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8QmFzZSB7Li4udGhpcy5wcm9wc30+XG4gICAgICAgIDxjaXJjbGUgY3g9XCIyOS40XCIgY3k9XCIzMS42XCIgcj1cIjguNFwiIGNsYXNzTmFtZT1cImNyMVwiIC8+XG4gICAgICAgIDxjaXJjbGUgY3g9XCI0OC41XCIgY3k9XCIxNS43XCIgcj1cIjYuNVwiIGNsYXNzTmFtZT1cImNyMlwiIC8+XG4gICAgICAgIDxjaXJjbGUgY3g9XCIxMVwiIGN5PVwiNDQuMlwiIHI9XCIzXCIgY2xhc3NOYW1lPVwiY3IzXCIgLz5cbiAgICAgICAgPGNpcmNsZSBjeD1cIjUwXCIgY3k9XCI0NC4yXCIgcj1cIjVcIiBjbGFzc05hbWU9XCJjcjRcIiAvPlxuICAgICAgICA8Y2lyY2xlIGN4PVwiMzRcIiBjeT1cIjU0LjJcIiByPVwiM1wiIGNsYXNzTmFtZT1cImNyNVwiIC8+XG4gICAgICAgIDxjaXJjbGUgY3g9XCIxNFwiIGN5PVwiMTYuMlwiIHI9XCI0XCIgY2xhc3NOYW1lPVwiY3I2XCIgLz5cbiAgICAgIDwvQmFzZT5cbiAgICApO1xuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBQb2ludExheWVySWNvbjtcbiJdfQ==