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

var ClusterLayerIcon = (_temp = _class = function (_Component) {
  (0, _inherits3.default)(ClusterLayerIcon, _Component);

  function ClusterLayerIcon() {
    (0, _classCallCheck3.default)(this, ClusterLayerIcon);
    return (0, _possibleConstructorReturn3.default)(this, (ClusterLayerIcon.__proto__ || Object.getPrototypeOf(ClusterLayerIcon)).apply(this, arguments));
  }

  (0, _createClass3.default)(ClusterLayerIcon, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        _base2.default,
        this.props,
        _react2.default.createElement('path', {
          d: 'M13.6,22.7c2.9-3.6,4.4-6.3,4.4-8c0-2.7-2.2-4.9-4.9-4.9S8.2,12,8.2,14.7c0,1.7,1.5,4.4,4.4,8l0,0 C12.8,23,13.2,23,13.6,22.7C13.5,22.8,13.6,22.7,13.6,22.7z',
          className: 'cr1'
        }),
        _react2.default.createElement('path', {
          d: 'M22.9,57.4c2.5-3.1,3.8-5.5,3.8-7c0-2.4-2-4.4-4.4-4.4S18,48,18,50.4c0,1.5,1.3,3.8,3.8,7l0,0 c0.3,0.3,0.7,0.4,1,0.1C22.9,57.4,22.9,57.4,22.9,57.4z',
          className: 'cr2'
        }),
        _react2.default.createElement('path', {
          d: 'M51.4,22.5c2.8-3.4,4.2-6,4.2-7.6c0-2.6-2.1-4.8-4.8-4.8c-2.6,0-4.8,2.1-4.8,4.8c0,1.6,1.4,4.2,4.2,7.6 l0,0c0.3,0.3,0.8,0.4,1.1,0.1C51.3,22.5,51.4,22.5,51.4,22.5z',
          className: 'cr3'
        }),
        _react2.default.createElement('path', {
          d: 'M49.2,53.8c3.7-4.5,5.5-7.8,5.5-9.9c0-3.3-2.7-6.1-6.1-6.1c-3.3,0-6.1,2.7-6.1,6.1 c0,2.1,1.8,5.4,5.5,9.9l0,0c0.3,0.3,0.7,0.4,1.1,0.1C49.1,53.8,49.1,53.8,49.2,53.8z',
          className: 'cr4'
        }),
        _react2.default.createElement('path', {
          d: 'M31.4,39.6C36.5,33.5,39,29,39,26.1c0-4.4-3.6-8-8-8s-8,3.6-8,8c0,2.9,2.5,7.4,7.6,13.5l0,0 C30.8,39.8,31.1,39.9,31.4,39.6C31.3,39.7,31.4,39.6,31.4,39.6z',
          className: 'cr5'
        })
      );
    }
  }]);
  return ClusterLayerIcon;
}(_react.Component), _class.propTypes = {
  /** Set the height of the icon, ex. '16px' */
  height: _propTypes2.default.string,
  colors: _propTypes2.default.arrayOf(_propTypes2.default.string)
}, _class.defaultProps = {
  height: '16px',
  predefinedClassName: 'cluster-layer-icon',
  totalColor: 5
}, _temp);
;

exports.default = ClusterLayerIcon;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9sYXllcnMvY2x1c3Rlci1sYXllci9jbHVzdGVyLWxheWVyLWljb24uanMiXSwibmFtZXMiOlsiQ2x1c3RlckxheWVySWNvbiIsInByb3BzIiwiQ29tcG9uZW50IiwicHJvcFR5cGVzIiwiaGVpZ2h0IiwiUHJvcFR5cGVzIiwic3RyaW5nIiwiY29sb3JzIiwiYXJyYXlPZiIsImRlZmF1bHRQcm9wcyIsInByZWRlZmluZWRDbGFzc05hbWUiLCJ0b3RhbENvbG9yIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O21CQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0lBRU1BLGdCOzs7Ozs7Ozs7OzZCQWFLO0FBQ1AsYUFDRTtBQUFDLHNCQUFEO0FBQVUsYUFBS0MsS0FBZjtBQUNFO0FBQ0UsYUFBRSwwSkFESjtBQUdFLHFCQUFVO0FBSFosVUFERjtBQU1FO0FBQ0UsYUFBRSxrSkFESjtBQUdFLHFCQUFVO0FBSFosVUFORjtBQVdFO0FBQ0UsYUFBRSxpS0FESjtBQUdFLHFCQUFVO0FBSFosVUFYRjtBQWdCRTtBQUNFLGFBQUUsbUtBREo7QUFHRSxxQkFBVTtBQUhaLFVBaEJGO0FBcUJFO0FBQ0UsYUFBRSx3SkFESjtBQUdFLHFCQUFVO0FBSFo7QUFyQkYsT0FERjtBQTZCRDs7O0VBM0M0QkMsZ0IsVUFDdEJDLFMsR0FBWTtBQUNqQjtBQUNBQyxVQUFRQyxvQkFBVUMsTUFGRDtBQUdqQkMsVUFBUUYsb0JBQVVHLE9BQVYsQ0FBa0JILG9CQUFVQyxNQUE1QjtBQUhTLEMsU0FNWkcsWSxHQUFlO0FBQ3BCTCxVQUFRLE1BRFk7QUFFcEJNLHVCQUFxQixvQkFGRDtBQUdwQkMsY0FBWTtBQUhRLEM7QUFxQ3ZCOztrQkFFY1gsZ0IiLCJmaWxlIjoiY2x1c3Rlci1sYXllci1pY29uLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSAyMDE4IFViZXIgVGVjaG5vbG9naWVzLCBJbmMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuLy8gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuLy8gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuLy8gdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuLy8gY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4vLyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4vLyBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4vLyBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbi8vIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuLy8gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuLy8gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbi8vIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbi8vIFRIRSBTT0ZUV0FSRS5cblxuaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50fSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IEJhc2UgZnJvbSAnY29tcG9uZW50cy9jb21tb24vaWNvbnMvYmFzZSc7XG5cbmNsYXNzIENsdXN0ZXJMYXllckljb24gZXh0ZW5kcyBDb21wb25lbnQge1xuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIC8qKiBTZXQgdGhlIGhlaWdodCBvZiB0aGUgaWNvbiwgZXguICcxNnB4JyAqL1xuICAgIGhlaWdodDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBjb2xvcnM6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5zdHJpbmcpXG4gIH07XG5cbiAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICBoZWlnaHQ6ICcxNnB4JyxcbiAgICBwcmVkZWZpbmVkQ2xhc3NOYW1lOiAnY2x1c3Rlci1sYXllci1pY29uJyxcbiAgICB0b3RhbENvbG9yOiA1XG4gIH07XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8QmFzZSB7Li4udGhpcy5wcm9wc30+XG4gICAgICAgIDxwYXRoXG4gICAgICAgICAgZD1cIk0xMy42LDIyLjdjMi45LTMuNiw0LjQtNi4zLDQuNC04YzAtMi43LTIuMi00LjktNC45LTQuOVM4LjIsMTIsOC4yLDE0LjdjMCwxLjcsMS41LDQuNCw0LjQsOGwwLDBcblx0QzEyLjgsMjMsMTMuMiwyMywxMy42LDIyLjdDMTMuNSwyMi44LDEzLjYsMjIuNywxMy42LDIyLjd6XCJcbiAgICAgICAgICBjbGFzc05hbWU9XCJjcjFcIlxuICAgICAgICAvPlxuICAgICAgICA8cGF0aFxuICAgICAgICAgIGQ9XCJNMjIuOSw1Ny40YzIuNS0zLjEsMy44LTUuNSwzLjgtN2MwLTIuNC0yLTQuNC00LjQtNC40UzE4LDQ4LDE4LDUwLjRjMCwxLjUsMS4zLDMuOCwzLjgsN2wwLDBcblx0YzAuMywwLjMsMC43LDAuNCwxLDAuMUMyMi45LDU3LjQsMjIuOSw1Ny40LDIyLjksNTcuNHpcIlxuICAgICAgICAgIGNsYXNzTmFtZT1cImNyMlwiXG4gICAgICAgIC8+XG4gICAgICAgIDxwYXRoXG4gICAgICAgICAgZD1cIk01MS40LDIyLjVjMi44LTMuNCw0LjItNiw0LjItNy42YzAtMi42LTIuMS00LjgtNC44LTQuOGMtMi42LDAtNC44LDIuMS00LjgsNC44YzAsMS42LDEuNCw0LjIsNC4yLDcuNlxuXHRsMCwwYzAuMywwLjMsMC44LDAuNCwxLjEsMC4xQzUxLjMsMjIuNSw1MS40LDIyLjUsNTEuNCwyMi41elwiXG4gICAgICAgICAgY2xhc3NOYW1lPVwiY3IzXCJcbiAgICAgICAgLz5cbiAgICAgICAgPHBhdGhcbiAgICAgICAgICBkPVwiTTQ5LjIsNTMuOGMzLjctNC41LDUuNS03LjgsNS41LTkuOWMwLTMuMy0yLjctNi4xLTYuMS02LjFjLTMuMywwLTYuMSwyLjctNi4xLDYuMVxuXHRjMCwyLjEsMS44LDUuNCw1LjUsOS45bDAsMGMwLjMsMC4zLDAuNywwLjQsMS4xLDAuMUM0OS4xLDUzLjgsNDkuMSw1My44LDQ5LjIsNTMuOHpcIlxuICAgICAgICAgIGNsYXNzTmFtZT1cImNyNFwiXG4gICAgICAgIC8+XG4gICAgICAgIDxwYXRoXG4gICAgICAgICAgZD1cIk0zMS40LDM5LjZDMzYuNSwzMy41LDM5LDI5LDM5LDI2LjFjMC00LjQtMy42LTgtOC04cy04LDMuNi04LDhjMCwyLjksMi41LDcuNCw3LjYsMTMuNWwwLDBcblx0QzMwLjgsMzkuOCwzMS4xLDM5LjksMzEuNCwzOS42QzMxLjMsMzkuNywzMS40LDM5LjYsMzEuNCwzOS42elwiXG4gICAgICAgICAgY2xhc3NOYW1lPVwiY3I1XCJcbiAgICAgICAgLz5cbiAgICAgIDwvQmFzZT5cbiAgICApO1xuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBDbHVzdGVyTGF5ZXJJY29uO1xuIl19