'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _taggedTemplateLiteral2 = require('babel-runtime/helpers/taggedTemplateLiteral');

var _taggedTemplateLiteral3 = _interopRequireDefault(_taggedTemplateLiteral2);

var _templateObject = (0, _taggedTemplateLiteral3.default)(['\n  display: inline-block;\n  margin-left: 6px;\n'], ['\n  display: inline-block;\n  margin-left: 6px;\n']),
    _templateObject2 = (0, _taggedTemplateLiteral3.default)(['\n  color: ', ';\n  font-size: 14px;\n  font-weight: 600;\n  letter-spacing: 1.17px;\n'], ['\n  color: ', ';\n  font-size: 14px;\n  font-weight: 600;\n  letter-spacing: 1.17px;\n']),
    _templateObject3 = (0, _taggedTemplateLiteral3.default)(['\n  font-size: 10px;\n  color: ', ';\n  letter-spacing: 0.83px;\n  line-height: 14px;\n'], ['\n  font-size: 10px;\n  color: ', ';\n  letter-spacing: 0.83px;\n  line-height: 14px;\n']),
    _templateObject4 = (0, _taggedTemplateLiteral3.default)(['\n  display: flex;\n  align-items: flex-start;\n'], ['\n  display: flex;\n  align-items: flex-start;\n']),
    _templateObject5 = (0, _taggedTemplateLiteral3.default)(['\n  margin-top: 3px;\n'], ['\n  margin-top: 3px;\n']); // Copyright (c) 2018 Uber Technologies, Inc.
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

var _defaultSettings = require('../../constants/default-settings');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LogoTitle = _styledComponents2.default.div(_templateObject);

var LogoName = _styledComponents2.default.div(_templateObject2, function (props) {
  return props.theme.activeColor;
});
var LogoVersion = _styledComponents2.default.div(_templateObject3, function (props) {
  return props.theme.subtextColor;
});

var LogoWrapper = _styledComponents2.default.div(_templateObject4);

var LogoSvgWrapper = _styledComponents2.default.div(_templateObject5);

var LogoSvg = function LogoSvg() {
  return _react2.default.createElement(
    'svg',
    {
      className: 'side-panel-logo__logo',
      width: '22px',
      height: '15px',
      viewBox: '0 0 22 15'
    },
    _react2.default.createElement(
      'g',
      { transform: 'translate(11, -3) rotate(45.000000)' },
      _react2.default.createElement('rect', { fill: '#535C6C', x: '0', y: '5', width: '10', height: '10' }),
      _react2.default.createElement('rect', { fill: '#1FBAD6', x: '5', y: '0', width: '10', height: '10' })
    )
  );
};

var KeplerGlLogo = function KeplerGlLogo(_ref) {
  var _ref$appName = _ref.appName,
      appName = _ref$appName === undefined ? _defaultSettings.KEPLER_GL_NAME : _ref$appName,
      _ref$version = _ref.version,
      version = _ref$version === undefined ? _defaultSettings.KEPLER_GL_VERSION : _ref$version;
  return _react2.default.createElement(
    LogoWrapper,
    { className: 'side-panel-logo' },
    _react2.default.createElement(
      LogoSvgWrapper,
      null,
      _react2.default.createElement(LogoSvg, null)
    ),
    _react2.default.createElement(
      LogoTitle,
      { className: 'logo__title' },
      _react2.default.createElement(
        LogoName,
        { className: 'logo__name' },
        appName
      ),
      version ? _react2.default.createElement(
        LogoVersion,
        { className: 'logo__version' },
        version
      ) : null
    )
  );
};

KeplerGlLogo.defaultProps = {
  appName: _propTypes2.default.string,
  version: _propTypes2.default.string
};

exports.default = KeplerGlLogo;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2NvbW1vbi9sb2dvLmpzIl0sIm5hbWVzIjpbIkxvZ29UaXRsZSIsInN0eWxlZCIsImRpdiIsIkxvZ29OYW1lIiwicHJvcHMiLCJ0aGVtZSIsImFjdGl2ZUNvbG9yIiwiTG9nb1ZlcnNpb24iLCJzdWJ0ZXh0Q29sb3IiLCJMb2dvV3JhcHBlciIsIkxvZ29TdmdXcmFwcGVyIiwiTG9nb1N2ZyIsIktlcGxlckdsTG9nbyIsImFwcE5hbWUiLCJLRVBMRVJfR0xfTkFNRSIsInZlcnNpb24iLCJLRVBMRVJfR0xfVkVSU0lPTiIsImRlZmF1bHRQcm9wcyIsIlByb3BUeXBlcyIsInN0cmluZyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7cUhBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFFQSxJQUFNQSxZQUFZQywyQkFBT0MsR0FBbkIsaUJBQU47O0FBS0EsSUFBTUMsV0FBV0YsMkJBQU9DLEdBQWxCLG1CQUNLO0FBQUEsU0FBU0UsTUFBTUMsS0FBTixDQUFZQyxXQUFyQjtBQUFBLENBREwsQ0FBTjtBQU1BLElBQU1DLGNBQWNOLDJCQUFPQyxHQUFyQixtQkFFSztBQUFBLFNBQVNFLE1BQU1DLEtBQU4sQ0FBWUcsWUFBckI7QUFBQSxDQUZMLENBQU47O0FBT0EsSUFBTUMsY0FBY1IsMkJBQU9DLEdBQXJCLGtCQUFOOztBQUtBLElBQU1RLGlCQUFpQlQsMkJBQU9DLEdBQXhCLGtCQUFOOztBQUlBLElBQU1TLFVBQVUsU0FBVkEsT0FBVTtBQUFBLFNBQ2Q7QUFBQTtBQUFBO0FBQ0UsaUJBQVUsdUJBRFo7QUFFRSxhQUFNLE1BRlI7QUFHRSxjQUFPLE1BSFQ7QUFJRSxlQUFRO0FBSlY7QUFNRTtBQUFBO0FBQUEsUUFBRyxXQUFVLHFDQUFiO0FBQ0UsOENBQU0sTUFBSyxTQUFYLEVBQXFCLEdBQUUsR0FBdkIsRUFBMkIsR0FBRSxHQUE3QixFQUFpQyxPQUFNLElBQXZDLEVBQTRDLFFBQU8sSUFBbkQsR0FERjtBQUVFLDhDQUFNLE1BQUssU0FBWCxFQUFxQixHQUFFLEdBQXZCLEVBQTJCLEdBQUUsR0FBN0IsRUFBaUMsT0FBTSxJQUF2QyxFQUE0QyxRQUFPLElBQW5EO0FBRkY7QUFORixHQURjO0FBQUEsQ0FBaEI7O0FBY0EsSUFBTUMsZUFBZSxTQUFmQSxZQUFlO0FBQUEsMEJBQUVDLE9BQUY7QUFBQSxNQUFFQSxPQUFGLGdDQUFZQywrQkFBWjtBQUFBLDBCQUE0QkMsT0FBNUI7QUFBQSxNQUE0QkEsT0FBNUIsZ0NBQXNDQyxrQ0FBdEM7QUFBQSxTQUNuQjtBQUFDLGVBQUQ7QUFBQSxNQUFhLFdBQVUsaUJBQXZCO0FBQ0U7QUFBQyxvQkFBRDtBQUFBO0FBQ0Usb0NBQUMsT0FBRDtBQURGLEtBREY7QUFJRTtBQUFDLGVBQUQ7QUFBQSxRQUFXLFdBQVUsYUFBckI7QUFDRTtBQUFDLGdCQUFEO0FBQUEsVUFBVSxXQUFVLFlBQXBCO0FBQWtDSDtBQUFsQyxPQURGO0FBRUdFLGdCQUFVO0FBQUMsbUJBQUQ7QUFBQSxVQUFhLFdBQVUsZUFBdkI7QUFBd0NBO0FBQXhDLE9BQVYsR0FBMkU7QUFGOUU7QUFKRixHQURtQjtBQUFBLENBQXJCOztBQVlBSCxhQUFhSyxZQUFiLEdBQTRCO0FBQzFCSixXQUFTSyxvQkFBVUMsTUFETztBQUUxQkosV0FBU0csb0JBQVVDO0FBRk8sQ0FBNUI7O2tCQUtlUCxZIiwiZmlsZSI6ImxvZ28uanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIDIwMTggVWJlciBUZWNobm9sb2dpZXMsIEluYy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4vLyBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4vLyBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4vLyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4vLyBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbi8vIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbi8vIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1Jcbi8vIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuLy8gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4vLyBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4vLyBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuLy8gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuLy8gVEhFIFNPRlRXQVJFLlxuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCBzdHlsZWQgZnJvbSAnc3R5bGVkLWNvbXBvbmVudHMnO1xuaW1wb3J0IHtLRVBMRVJfR0xfTkFNRSwgS0VQTEVSX0dMX1ZFUlNJT059IGZyb20gJ2NvbnN0YW50cy9kZWZhdWx0LXNldHRpbmdzJztcblxuY29uc3QgTG9nb1RpdGxlID0gc3R5bGVkLmRpdmBcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICBtYXJnaW4tbGVmdDogNnB4O1xuYDtcblxuY29uc3QgTG9nb05hbWUgPSBzdHlsZWQuZGl2YFxuICBjb2xvcjogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5hY3RpdmVDb2xvcn07XG4gIGZvbnQtc2l6ZTogMTRweDtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgbGV0dGVyLXNwYWNpbmc6IDEuMTdweDtcbmA7XG5jb25zdCBMb2dvVmVyc2lvbiA9IHN0eWxlZC5kaXZgXG4gIGZvbnQtc2l6ZTogMTBweDtcbiAgY29sb3I6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUuc3VidGV4dENvbG9yfTtcbiAgbGV0dGVyLXNwYWNpbmc6IDAuODNweDtcbiAgbGluZS1oZWlnaHQ6IDE0cHg7XG5gO1xuXG5jb25zdCBMb2dvV3JhcHBlciA9IHN0eWxlZC5kaXZgXG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBmbGV4LXN0YXJ0O1xuYDtcblxuY29uc3QgTG9nb1N2Z1dyYXBwZXIgPSBzdHlsZWQuZGl2YFxuICBtYXJnaW4tdG9wOiAzcHg7XG5gO1xuXG5jb25zdCBMb2dvU3ZnID0gKCkgPT4gKFxuICA8c3ZnXG4gICAgY2xhc3NOYW1lPVwic2lkZS1wYW5lbC1sb2dvX19sb2dvXCJcbiAgICB3aWR0aD1cIjIycHhcIlxuICAgIGhlaWdodD1cIjE1cHhcIlxuICAgIHZpZXdCb3g9XCIwIDAgMjIgMTVcIlxuICA+XG4gICAgPGcgdHJhbnNmb3JtPVwidHJhbnNsYXRlKDExLCAtMykgcm90YXRlKDQ1LjAwMDAwMClcIj5cbiAgICAgIDxyZWN0IGZpbGw9XCIjNTM1QzZDXCIgeD1cIjBcIiB5PVwiNVwiIHdpZHRoPVwiMTBcIiBoZWlnaHQ9XCIxMFwiIC8+XG4gICAgICA8cmVjdCBmaWxsPVwiIzFGQkFENlwiIHg9XCI1XCIgeT1cIjBcIiB3aWR0aD1cIjEwXCIgaGVpZ2h0PVwiMTBcIiAvPlxuICAgIDwvZz5cbiAgPC9zdmc+XG4pO1xuXG5jb25zdCBLZXBsZXJHbExvZ28gPSAoe2FwcE5hbWUgPSBLRVBMRVJfR0xfTkFNRSwgdmVyc2lvbiA9IEtFUExFUl9HTF9WRVJTSU9OfSkgPT4gKFxuICA8TG9nb1dyYXBwZXIgY2xhc3NOYW1lPVwic2lkZS1wYW5lbC1sb2dvXCI+XG4gICAgPExvZ29TdmdXcmFwcGVyPlxuICAgICAgPExvZ29TdmcgLz5cbiAgICA8L0xvZ29TdmdXcmFwcGVyPlxuICAgIDxMb2dvVGl0bGUgY2xhc3NOYW1lPVwibG9nb19fdGl0bGVcIj5cbiAgICAgIDxMb2dvTmFtZSBjbGFzc05hbWU9XCJsb2dvX19uYW1lXCI+e2FwcE5hbWV9PC9Mb2dvTmFtZT5cbiAgICAgIHt2ZXJzaW9uID8gPExvZ29WZXJzaW9uIGNsYXNzTmFtZT1cImxvZ29fX3ZlcnNpb25cIj57dmVyc2lvbn08L0xvZ29WZXJzaW9uPiA6IG51bGx9XG4gICAgPC9Mb2dvVGl0bGU+XG4gIDwvTG9nb1dyYXBwZXI+XG4pO1xuXG5LZXBsZXJHbExvZ28uZGVmYXVsdFByb3BzID0ge1xuICBhcHBOYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxuICB2ZXJzaW9uOiBQcm9wVHlwZXMuc3RyaW5nXG59O1xuXG5leHBvcnQgZGVmYXVsdCBLZXBsZXJHbExvZ287XG4iXX0=