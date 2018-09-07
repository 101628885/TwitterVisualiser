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

var HeatmapLayerIcon = (_temp = _class = function (_Component) {
  (0, _inherits3.default)(HeatmapLayerIcon, _Component);

  function HeatmapLayerIcon() {
    (0, _classCallCheck3.default)(this, HeatmapLayerIcon);
    return (0, _possibleConstructorReturn3.default)(this, (HeatmapLayerIcon.__proto__ || Object.getPrototypeOf(HeatmapLayerIcon)).apply(this, arguments));
  }

  (0, _createClass3.default)(HeatmapLayerIcon, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        _base2.default,
        this.props,
        _react2.default.createElement('path', { d: 'M51.87,21C49.55,16.67,43.77,15.29,39,18a11.42,11.42,0,0,0-1.65,1.13c-2.73,2.14-2.12,3-6,4.89-2.27,1.07-3.42,1.08-6.88,1.4l-2.24.21a14,14,0,0,0-2.86.84c-6.64,2.73-10.11,9.86-7.76,15.94s9.63,8.79,16.27,6.07A14,14,0,0,0,31.77,46l0,0,.06-.07c.43-.4.8-.78,1.14-1.14a2.66,2.66,0,0,0,.32-.36l.17-.19c3-3.53,2-5,4.9-7.39,2.38-1.93,5.41-.95,9-3C52.19,31.15,54.19,25.43,51.87,21ZM26,44.59a8.7,8.7,0,0,1-2.26.59A7.16,7.16,0,0,1,16,40.85c-1.44-3.72.68-8.08,4.73-9.74A8.33,8.33,0,0,1,23,30.53a7.15,7.15,0,0,1,7.71,4.32C32.19,38.57,30.06,42.93,26,44.59Z',
          className: 'cr2', style: { opacity: 0.8 } }),
        _react2.default.createElement('path', { d: 'M57,18.18A14.56,14.56,0,0,0,42.25,10.7a16.62,16.62,0,0,0-6.12,2,17.35,17.35,0,0,0-2.39,1.65,20.15,20.15,0,0,0-2.83,2.73,4.52,4.52,0,0,1-2,1.45,5.88,5.88,0,0,1-2.26.63l-1.45.14-1.27.12-2.33.22-.2,0-.18,0a18.88,18.88,0,0,0-4,1.18c-9.6,3.93-14.51,14.57-11,23.71A17.59,17.59,0,0,0,24.81,55.4,20.19,20.19,0,0,0,30,54.05a20,20,0,0,0,5.26-3.19l.82-.71.05-.08,1-1c.21-.22.41-.45.59-.66l.13-.15a20,20,0,0,0,3.39-5.48c.36-.87.36-.87.68-1.14a9.09,9.09,0,0,1,1.56-.32,18.79,18.79,0,0,0,6.69-2.19,16.56,16.56,0,0,0,7.88-9.9A14.93,14.93,0,0,0,57,18.18ZM47.63,34.27a13.93,13.93,0,0,1-5.06,1.61,7.75,7.75,0,0,0-3.86,1.36,7.06,7.06,0,0,0-2.33,3.24,14.17,14.17,0,0,1-2.51,4.09l-.1.11a5.11,5.11,0,0,1-.43.47c-.31.35-.7.73-1.14,1.14l-.09.09-.12.09a14.4,14.4,0,0,1-4,2.44,14.73,14.73,0,0,1-3.84,1c-5.87.69-11.13-2.27-13.08-7.35-2.45-6.32,1.16-13.76,8-16.59a15,15,0,0,1,3-.87l2.29-.22.9-.07,2-.2a10.88,10.88,0,0,0,3.85-1.08,9.43,9.43,0,0,0,3.77-2.76A14.75,14.75,0,0,1,37,18.71a11.5,11.5,0,0,1,1.71-1.17,11.08,11.08,0,0,1,4.16-1.36,9.26,9.26,0,0,1,9.42,4.64C54.75,25.42,52.65,31.47,47.63,34.27Z',
          className: 'cr1', style: { opacity: 0.36 } }),
        _react2.default.createElement('path', { d: 'M33,44.79a9.53,9.53,0,0,1-1.13,1.14C32.3,45.53,32.67,45.15,33,44.79Z',
          className: 'cr1', style: { opacity: 0.36 } }),
        _react2.default.createElement('path', { d: 'M25.83,44.13c-3.82,1.55-8,0-9.33-3.46s.65-7.55,4.45-9.1,8,0,9.33,3.46S29.63,42.57,25.83,44.13Z',
          className: 'cr3' }),
        _react2.default.createElement('path', { d: 'M31.81,46a.09.09,0,0,1,0,0h0Z',
          className: 'cr3' })
      );
    }
  }]);
  return HeatmapLayerIcon;
}(_react.Component), _class.propTypes = {
  /** Set the height of the icon, ex. '16px' */
  height: _propTypes2.default.string,
  colors: _propTypes2.default.arrayOf(_propTypes2.default.string)
}, _class.defaultProps = {
  height: '16px',
  predefinedClassName: 'heatmap-layer-icon',
  totalColor: 3
}, _temp);
exports.default = HeatmapLayerIcon;
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9sYXllcnMvaGVhdG1hcC1sYXllci9oZWF0bWFwLWxheWVyLWljb24uanMiXSwibmFtZXMiOlsiSGVhdG1hcExheWVySWNvbiIsInByb3BzIiwib3BhY2l0eSIsIkNvbXBvbmVudCIsInByb3BUeXBlcyIsImhlaWdodCIsIlByb3BUeXBlcyIsInN0cmluZyIsImNvbG9ycyIsImFycmF5T2YiLCJkZWZhdWx0UHJvcHMiLCJwcmVkZWZpbmVkQ2xhc3NOYW1lIiwidG90YWxDb2xvciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7bUJBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7SUFFcUJBLGdCOzs7Ozs7Ozs7OzZCQWFWO0FBQ1AsYUFDRTtBQUFDLHNCQUFEO0FBQVUsYUFBS0MsS0FBZjtBQUNFLGdEQUFNLEdBQUUsNmhCQUFSO0FBQ00scUJBQVUsS0FEaEIsRUFDc0IsT0FBTyxFQUFDQyxTQUFTLEdBQVYsRUFEN0IsR0FERjtBQUdFLGdEQUFNLEdBQUUsaWpDQUFSO0FBQ00scUJBQVUsS0FEaEIsRUFDc0IsT0FBTyxFQUFDQSxTQUFTLElBQVYsRUFEN0IsR0FIRjtBQUtFLGdEQUFNLEdBQUUsc0VBQVI7QUFDTSxxQkFBVSxLQURoQixFQUNzQixPQUFPLEVBQUNBLFNBQVMsSUFBVixFQUQ3QixHQUxGO0FBT0UsZ0RBQU0sR0FBRSxnR0FBUjtBQUNNLHFCQUFVLEtBRGhCLEdBUEY7QUFTRSxnREFBTSxHQUFFLCtCQUFSO0FBQ00scUJBQVUsS0FEaEI7QUFURixPQURGO0FBY0Q7OztFQTVCMkNDLGdCLFVBQ3JDQyxTLEdBQVk7QUFDakI7QUFDQUMsVUFBUUMsb0JBQVVDLE1BRkQ7QUFHakJDLFVBQVFGLG9CQUFVRyxPQUFWLENBQWtCSCxvQkFBVUMsTUFBNUI7QUFIUyxDLFNBTVpHLFksR0FBZTtBQUNwQkwsVUFBUSxNQURZO0FBRXBCTSx1QkFBcUIsb0JBRkQ7QUFHcEJDLGNBQVk7QUFIUSxDO2tCQVBIWixnQjtBQTZCcEIiLCJmaWxlIjoiaGVhdG1hcC1sYXllci1pY29uLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSAyMDE4IFViZXIgVGVjaG5vbG9naWVzLCBJbmMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuLy8gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuLy8gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuLy8gdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuLy8gY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4vLyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4vLyBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4vLyBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbi8vIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuLy8gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuLy8gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbi8vIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbi8vIFRIRSBTT0ZUV0FSRS5cblxuaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50fSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IEJhc2UgZnJvbSAnY29tcG9uZW50cy9jb21tb24vaWNvbnMvYmFzZSc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEhlYXRtYXBMYXllckljb24gZXh0ZW5kcyBDb21wb25lbnQge1xuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIC8qKiBTZXQgdGhlIGhlaWdodCBvZiB0aGUgaWNvbiwgZXguICcxNnB4JyAqL1xuICAgIGhlaWdodDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBjb2xvcnM6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5zdHJpbmcpXG4gIH07XG5cbiAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICBoZWlnaHQ6ICcxNnB4JyxcbiAgICBwcmVkZWZpbmVkQ2xhc3NOYW1lOiAnaGVhdG1hcC1sYXllci1pY29uJyxcbiAgICB0b3RhbENvbG9yOiAzXG4gIH07XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8QmFzZSB7Li4udGhpcy5wcm9wc30+XG4gICAgICAgIDxwYXRoIGQ9XCJNNTEuODcsMjFDNDkuNTUsMTYuNjcsNDMuNzcsMTUuMjksMzksMThhMTEuNDIsMTEuNDIsMCwwLDAtMS42NSwxLjEzYy0yLjczLDIuMTQtMi4xMiwzLTYsNC44OS0yLjI3LDEuMDctMy40MiwxLjA4LTYuODgsMS40bC0yLjI0LjIxYTE0LDE0LDAsMCwwLTIuODYuODRjLTYuNjQsMi43My0xMC4xMSw5Ljg2LTcuNzYsMTUuOTRzOS42Myw4Ljc5LDE2LjI3LDYuMDdBMTQsMTQsMCwwLDAsMzEuNzcsNDZsMCwwLC4wNi0uMDdjLjQzLS40LjgtLjc4LDEuMTQtMS4xNGEyLjY2LDIuNjYsMCwwLDAsLjMyLS4zNmwuMTctLjE5YzMtMy41MywyLTUsNC45LTcuMzksMi4zOC0xLjkzLDUuNDEtLjk1LDktM0M1Mi4xOSwzMS4xNSw1NC4xOSwyNS40Myw1MS44NywyMVpNMjYsNDQuNTlhOC43LDguNywwLDAsMS0yLjI2LjU5QTcuMTYsNy4xNiwwLDAsMSwxNiw0MC44NWMtMS40NC0zLjcyLjY4LTguMDgsNC43My05Ljc0QTguMzMsOC4zMywwLDAsMSwyMywzMC41M2E3LjE1LDcuMTUsMCwwLDEsNy43MSw0LjMyQzMyLjE5LDM4LjU3LDMwLjA2LDQyLjkzLDI2LDQ0LjU5WlwiXG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cImNyMlwiIHN0eWxlPXt7b3BhY2l0eTogMC44fX0vPlxuICAgICAgICA8cGF0aCBkPVwiTTU3LDE4LjE4QTE0LjU2LDE0LjU2LDAsMCwwLDQyLjI1LDEwLjdhMTYuNjIsMTYuNjIsMCwwLDAtNi4xMiwyLDE3LjM1LDE3LjM1LDAsMCwwLTIuMzksMS42NSwyMC4xNSwyMC4xNSwwLDAsMC0yLjgzLDIuNzMsNC41Miw0LjUyLDAsMCwxLTIsMS40NSw1Ljg4LDUuODgsMCwwLDEtMi4yNi42M2wtMS40NS4xNC0xLjI3LjEyLTIuMzMuMjItLjIsMC0uMTgsMGExOC44OCwxOC44OCwwLDAsMC00LDEuMThjLTkuNiwzLjkzLTE0LjUxLDE0LjU3LTExLDIzLjcxQTE3LjU5LDE3LjU5LDAsMCwwLDI0LjgxLDU1LjQsMjAuMTksMjAuMTksMCwwLDAsMzAsNTQuMDVhMjAsMjAsMCwwLDAsNS4yNi0zLjE5bC44Mi0uNzEuMDUtLjA4LDEtMWMuMjEtLjIyLjQxLS40NS41OS0uNjZsLjEzLS4xNWEyMCwyMCwwLDAsMCwzLjM5LTUuNDhjLjM2LS44Ny4zNi0uODcuNjgtMS4xNGE5LjA5LDkuMDksMCwwLDEsMS41Ni0uMzIsMTguNzksMTguNzksMCwwLDAsNi42OS0yLjE5LDE2LjU2LDE2LjU2LDAsMCwwLDcuODgtOS45QTE0LjkzLDE0LjkzLDAsMCwwLDU3LDE4LjE4Wk00Ny42MywzNC4yN2ExMy45MywxMy45MywwLDAsMS01LjA2LDEuNjEsNy43NSw3Ljc1LDAsMCwwLTMuODYsMS4zNiw3LjA2LDcuMDYsMCwwLDAtMi4zMywzLjI0LDE0LjE3LDE0LjE3LDAsMCwxLTIuNTEsNC4wOWwtLjEuMTFhNS4xMSw1LjExLDAsMCwxLS40My40N2MtLjMxLjM1LS43LjczLTEuMTQsMS4xNGwtLjA5LjA5LS4xMi4wOWExNC40LDE0LjQsMCwwLDEtNCwyLjQ0LDE0LjczLDE0LjczLDAsMCwxLTMuODQsMWMtNS44Ny42OS0xMS4xMy0yLjI3LTEzLjA4LTcuMzUtMi40NS02LjMyLDEuMTYtMTMuNzYsOC0xNi41OWExNSwxNSwwLDAsMSwzLS44N2wyLjI5LS4yMi45LS4wNywyLS4yYTEwLjg4LDEwLjg4LDAsMCwwLDMuODUtMS4wOCw5LjQzLDkuNDMsMCwwLDAsMy43Ny0yLjc2QTE0Ljc1LDE0Ljc1LDAsMCwxLDM3LDE4LjcxYTExLjUsMTEuNSwwLDAsMSwxLjcxLTEuMTcsMTEuMDgsMTEuMDgsMCwwLDEsNC4xNi0xLjM2LDkuMjYsOS4yNiwwLDAsMSw5LjQyLDQuNjRDNTQuNzUsMjUuNDIsNTIuNjUsMzEuNDcsNDcuNjMsMzQuMjdaXCJcbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiY3IxXCIgc3R5bGU9e3tvcGFjaXR5OiAwLjM2fX0vPlxuICAgICAgICA8cGF0aCBkPVwiTTMzLDQ0Ljc5YTkuNTMsOS41MywwLDAsMS0xLjEzLDEuMTRDMzIuMyw0NS41MywzMi42Nyw0NS4xNSwzMyw0NC43OVpcIlxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJjcjFcIiBzdHlsZT17e29wYWNpdHk6IDAuMzZ9fS8+XG4gICAgICAgIDxwYXRoIGQ9XCJNMjUuODMsNDQuMTNjLTMuODIsMS41NS04LDAtOS4zMy0zLjQ2cy42NS03LjU1LDQuNDUtOS4xLDgsMCw5LjMzLDMuNDZTMjkuNjMsNDIuNTcsMjUuODMsNDQuMTNaXCJcbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiY3IzXCIvPlxuICAgICAgICA8cGF0aCBkPVwiTTMxLjgxLDQ2YS4wOS4wOSwwLDAsMSwwLDBoMFpcIlxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJjcjNcIi8+XG4gICAgICA8L0Jhc2U+XG4gICAgKTtcbiAgfVxufTtcbiJdfQ==