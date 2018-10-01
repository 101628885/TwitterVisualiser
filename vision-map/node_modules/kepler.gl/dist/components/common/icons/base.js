'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getStyleClassFromColor = function getStyleClassFromColor(totalColor, colors) {
  return new Array(totalColor).fill(1).reduce(function (accu, c, i) {
    return accu + '.cr' + (i + 1) + ' {fill:' + colors[i % colors.length] + ';}';
  }, '');
};

var Base = (_temp = _class = function (_Component) {
  (0, _inherits3.default)(Base, _Component);

  function Base() {
    (0, _classCallCheck3.default)(this, Base);
    return (0, _possibleConstructorReturn3.default)(this, (Base.__proto__ || Object.getPrototypeOf(Base)).apply(this, arguments));
  }

  (0, _createClass3.default)(Base, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          height = _props.height,
          width = _props.width,
          viewBox = _props.viewBox,
          _props$style = _props.style,
          style = _props$style === undefined ? {} : _props$style,
          children = _props.children,
          predefinedClassName = _props.predefinedClassName,
          className = _props.className,
          colors = _props.colors,
          totalColor = _props.totalColor,
          props = (0, _objectWithoutProperties3.default)(_props, ['height', 'width', 'viewBox', 'style', 'children', 'predefinedClassName', 'className', 'colors', 'totalColor']);

      var svgHeight = height;
      var svgWidth = width || svgHeight;
      style.fill = 'currentColor';

      var fillStyle = Array.isArray(colors) && totalColor && getStyleClassFromColor(totalColor, colors);

      return _react2.default.createElement(
        'svg',
        (0, _extends3.default)({
          viewBox: viewBox,
          width: svgWidth,
          height: svgHeight,
          style: style,
          className: predefinedClassName + ' ' + className
        }, props),
        fillStyle ? _react2.default.createElement(
          'style',
          { type: 'text/css' },
          fillStyle
        ) : null,
        children
      );
    }
  }]);
  return Base;
}(_react.Component), _class.displayName = 'Base Icon', _class.propTypes = {
  /** Set the height of the icon, ex. '16px' */
  height: _propTypes2.default.string,
  /** Set the width of the icon, ex. '16px' */
  width: _propTypes2.default.string,
  /** Set the viewbox of the svg */
  viewBox: _propTypes2.default.string,
  /** Path element */
  children: _propTypes2.default.node,

  predefinedClassName: _propTypes2.default.string,
  className: _propTypes2.default.string
}, _class.defaultProps = {
  height: null,
  width: null,
  viewBox: '0 0 64 64',
  predefinedClassName: '',
  className: ''
}, _temp);
exports.default = Base;
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2NvbW1vbi9pY29ucy9iYXNlLmpzIl0sIm5hbWVzIjpbImdldFN0eWxlQ2xhc3NGcm9tQ29sb3IiLCJ0b3RhbENvbG9yIiwiY29sb3JzIiwiQXJyYXkiLCJmaWxsIiwicmVkdWNlIiwiYWNjdSIsImMiLCJpIiwibGVuZ3RoIiwiQmFzZSIsInByb3BzIiwiaGVpZ2h0Iiwid2lkdGgiLCJ2aWV3Qm94Iiwic3R5bGUiLCJjaGlsZHJlbiIsInByZWRlZmluZWRDbGFzc05hbWUiLCJjbGFzc05hbWUiLCJzdmdIZWlnaHQiLCJzdmdXaWR0aCIsImZpbGxTdHlsZSIsImlzQXJyYXkiLCJDb21wb25lbnQiLCJkaXNwbGF5TmFtZSIsInByb3BUeXBlcyIsIlByb3BUeXBlcyIsInN0cmluZyIsIm5vZGUiLCJkZWZhdWx0UHJvcHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7bUJBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7QUFDQTs7Ozs7O0FBRUEsSUFBTUEseUJBQXlCLFNBQXpCQSxzQkFBeUIsQ0FBQ0MsVUFBRCxFQUFhQyxNQUFiO0FBQUEsU0FDN0IsSUFBSUMsS0FBSixDQUFVRixVQUFWLEVBQ0dHLElBREgsQ0FDUSxDQURSLEVBRUdDLE1BRkgsQ0FHSSxVQUFDQyxJQUFELEVBQU9DLENBQVAsRUFBVUMsQ0FBVjtBQUFBLFdBQW1CRixJQUFuQixZQUE2QkUsSUFBSSxDQUFqQyxnQkFBNENOLE9BQU9NLElBQUlOLE9BQU9PLE1BQWxCLENBQTVDO0FBQUEsR0FISixFQUlJLEVBSkosQ0FENkI7QUFBQSxDQUEvQjs7SUFRcUJDLEk7Ozs7Ozs7Ozs7NkJBeUJWO0FBQUEsbUJBWUgsS0FBS0MsS0FaRjtBQUFBLFVBRUxDLE1BRkssVUFFTEEsTUFGSztBQUFBLFVBR0xDLEtBSEssVUFHTEEsS0FISztBQUFBLFVBSUxDLE9BSkssVUFJTEEsT0FKSztBQUFBLGdDQUtMQyxLQUxLO0FBQUEsVUFLTEEsS0FMSyxnQ0FLRyxFQUxIO0FBQUEsVUFNTEMsUUFOSyxVQU1MQSxRQU5LO0FBQUEsVUFPTEMsbUJBUEssVUFPTEEsbUJBUEs7QUFBQSxVQVFMQyxTQVJLLFVBUUxBLFNBUks7QUFBQSxVQVNMaEIsTUFUSyxVQVNMQSxNQVRLO0FBQUEsVUFVTEQsVUFWSyxVQVVMQSxVQVZLO0FBQUEsVUFXRlUsS0FYRTs7QUFhUCxVQUFNUSxZQUFZUCxNQUFsQjtBQUNBLFVBQU1RLFdBQVdQLFNBQVNNLFNBQTFCO0FBQ0FKLFlBQU1YLElBQU4sR0FBYSxjQUFiOztBQUVBLFVBQU1pQixZQUNKbEIsTUFBTW1CLE9BQU4sQ0FBY3BCLE1BQWQsS0FDQUQsVUFEQSxJQUVBRCx1QkFBdUJDLFVBQXZCLEVBQW1DQyxNQUFuQyxDQUhGOztBQUtBLGFBQ0U7QUFBQTtBQUFBO0FBQ0UsbUJBQVNZLE9BRFg7QUFFRSxpQkFBT00sUUFGVDtBQUdFLGtCQUFRRCxTQUhWO0FBSUUsaUJBQU9KLEtBSlQ7QUFLRSxxQkFBY0UsbUJBQWQsU0FBcUNDO0FBTHZDLFdBTU1QLEtBTk47QUFRR1Usb0JBQ0M7QUFBQTtBQUFBLFlBQU8sTUFBSyxVQUFaO0FBQXdCQTtBQUF4QixTQURELEdBQzhDLElBVGpEO0FBVUdMO0FBVkgsT0FERjtBQWNEOzs7RUE3RCtCTyxnQixVQUN6QkMsVyxHQUFjLFcsU0FFZEMsUyxHQUFZO0FBQ2pCO0FBQ0FiLFVBQVFjLG9CQUFVQyxNQUZEO0FBR2pCO0FBQ0FkLFNBQU9hLG9CQUFVQyxNQUpBO0FBS2pCO0FBQ0FiLFdBQVNZLG9CQUFVQyxNQU5GO0FBT2pCO0FBQ0FYLFlBQVVVLG9CQUFVRSxJQVJIOztBQVVqQlgsdUJBQXFCUyxvQkFBVUMsTUFWZDtBQVdqQlQsYUFBV1Esb0JBQVVDO0FBWEosQyxTQWNaRSxZLEdBQWU7QUFDcEJqQixVQUFRLElBRFk7QUFFcEJDLFNBQU8sSUFGYTtBQUdwQkMsV0FBUyxXQUhXO0FBSXBCRyx1QkFBcUIsRUFKRDtBQUtwQkMsYUFBVztBQUxTLEM7a0JBakJIUixJO0FBOERwQiIsImZpbGUiOiJiYXNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSAyMDE4IFViZXIgVGVjaG5vbG9naWVzLCBJbmMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuLy8gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuLy8gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuLy8gdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuLy8gY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4vLyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4vLyBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4vLyBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbi8vIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuLy8gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuLy8gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbi8vIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbi8vIFRIRSBTT0ZUV0FSRS5cblxuaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50fSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuXG5jb25zdCBnZXRTdHlsZUNsYXNzRnJvbUNvbG9yID0gKHRvdGFsQ29sb3IsIGNvbG9ycykgPT5cbiAgbmV3IEFycmF5KHRvdGFsQ29sb3IpXG4gICAgLmZpbGwoMSlcbiAgICAucmVkdWNlKFxuICAgICAgKGFjY3UsIGMsIGkpID0+IGAke2FjY3V9LmNyJHtpICsgMX0ge2ZpbGw6JHtjb2xvcnNbaSAlIGNvbG9ycy5sZW5ndGhdfTt9YCxcbiAgICAgICcnXG4gICAgKTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQmFzZSBleHRlbmRzIENvbXBvbmVudCB7XG4gIHN0YXRpYyBkaXNwbGF5TmFtZSA9ICdCYXNlIEljb24nO1xuXG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgLyoqIFNldCB0aGUgaGVpZ2h0IG9mIHRoZSBpY29uLCBleC4gJzE2cHgnICovXG4gICAgaGVpZ2h0OiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIC8qKiBTZXQgdGhlIHdpZHRoIG9mIHRoZSBpY29uLCBleC4gJzE2cHgnICovXG4gICAgd2lkdGg6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgLyoqIFNldCB0aGUgdmlld2JveCBvZiB0aGUgc3ZnICovXG4gICAgdmlld0JveDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICAvKiogUGF0aCBlbGVtZW50ICovXG4gICAgY2hpbGRyZW46IFByb3BUeXBlcy5ub2RlLFxuXG4gICAgcHJlZGVmaW5lZENsYXNzTmFtZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBjbGFzc05hbWU6IFByb3BUeXBlcy5zdHJpbmdcbiAgfTtcblxuICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgIGhlaWdodDogbnVsbCxcbiAgICB3aWR0aDogbnVsbCxcbiAgICB2aWV3Qm94OiAnMCAwIDY0IDY0JyxcbiAgICBwcmVkZWZpbmVkQ2xhc3NOYW1lOiAnJyxcbiAgICBjbGFzc05hbWU6ICcnXG4gIH07XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHtcbiAgICAgIGhlaWdodCxcbiAgICAgIHdpZHRoLFxuICAgICAgdmlld0JveCxcbiAgICAgIHN0eWxlID0ge30sXG4gICAgICBjaGlsZHJlbixcbiAgICAgIHByZWRlZmluZWRDbGFzc05hbWUsXG4gICAgICBjbGFzc05hbWUsXG4gICAgICBjb2xvcnMsXG4gICAgICB0b3RhbENvbG9yLFxuICAgICAgLi4ucHJvcHNcbiAgICB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBzdmdIZWlnaHQgPSBoZWlnaHQ7XG4gICAgY29uc3Qgc3ZnV2lkdGggPSB3aWR0aCB8fCBzdmdIZWlnaHQ7XG4gICAgc3R5bGUuZmlsbCA9ICdjdXJyZW50Q29sb3InO1xuXG4gICAgY29uc3QgZmlsbFN0eWxlID1cbiAgICAgIEFycmF5LmlzQXJyYXkoY29sb3JzKSAmJlxuICAgICAgdG90YWxDb2xvciAmJlxuICAgICAgZ2V0U3R5bGVDbGFzc0Zyb21Db2xvcih0b3RhbENvbG9yLCBjb2xvcnMpO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxzdmdcbiAgICAgICAgdmlld0JveD17dmlld0JveH1cbiAgICAgICAgd2lkdGg9e3N2Z1dpZHRofVxuICAgICAgICBoZWlnaHQ9e3N2Z0hlaWdodH1cbiAgICAgICAgc3R5bGU9e3N0eWxlfVxuICAgICAgICBjbGFzc05hbWU9e2Ake3ByZWRlZmluZWRDbGFzc05hbWV9ICR7Y2xhc3NOYW1lfWB9XG4gICAgICAgIHsuLi5wcm9wc31cbiAgICAgID5cbiAgICAgICAge2ZpbGxTdHlsZSA/XG4gICAgICAgICAgPHN0eWxlIHR5cGU9XCJ0ZXh0L2Nzc1wiPntmaWxsU3R5bGV9PC9zdHlsZT4gOiBudWxsfVxuICAgICAgICB7Y2hpbGRyZW59XG4gICAgICA8L3N2Zz5cbiAgICApO1xuICB9XG59O1xuIl19