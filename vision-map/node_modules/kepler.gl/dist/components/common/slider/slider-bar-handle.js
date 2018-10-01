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

var _templateObject = (0, _taggedTemplateLiteral3.default)(['\n  position: relative;\n  background-color: ', ';\n  height: ', ';\n  border-radius: ', ';\n\n  :hover {\n    cursor: pointer;\n  }\n'], ['\n  position: relative;\n  background-color: ', ';\n  height: ', ';\n  border-radius: ', ';\n\n  :hover {\n    cursor: pointer;\n  }\n']); // Copyright (c) 2018 Uber Technologies, Inc.
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

var _document = require('global/document');

var _document2 = _interopRequireDefault(_document);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var StyledSlider = _styledComponents2.default.div(_templateObject, function (props) {
  return props.active ? props.theme.sliderBarHoverColor : props.theme.sliderBarColor;
}, function (props) {
  return props.theme.sliderBarHeight;
}, function (props) {
  return props.theme.sliderBarRadius;
});
/**
 *
 * props:
 *  width : default 23
 *  height : default 23
 *  left
 *  onMove
 *  sliderBarListener
 */
var SliderHandle = (_temp2 = _class = function (_Component) {
  (0, _inherits3.default)(SliderHandle, _Component);

  function SliderHandle() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, SliderHandle);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = SliderHandle.__proto__ || Object.getPrototypeOf(SliderHandle)).call.apply(_ref, [this].concat(args))), _this), _this.state = { mouseOver: false }, _this.prevX = 0, _this.handleMouseDown = function () {
      _document2.default.addEventListener('mouseup', _this.mouseup);
      _document2.default.addEventListener('mousemove', _this.mousemove);
      _this.setState({ mouseOver: true });
    }, _this.mouseup = function () {
      _document2.default.removeEventListener('mouseup', _this.mouseup);
      _document2.default.removeEventListener('mousemove', _this.mousemove);
      _this.setState({ mouseOver: false });
    }, _this.mousemove = function (e) {
      e.preventDefault();
      _this.props.sliderBarListener(e.movementX);
    }, _this.handleTouchStart = function (e) {
      _document2.default.addEventListener('touchend', _this.touchend);
      _document2.default.addEventListener('touchmove', _this.touchmove);
      _this.prevX = e.touches[0].clientX;
      _this.setState({ mouseOver: true });
    }, _this.touchmove = function (e) {
      var deltaX = e.touches[0].clientX - _this.prevX;
      _this.prevX = e.touches[0].clientX;
      _this.props.sliderBarListener(deltaX);
    }, _this.touchend = function () {
      _document2.default.removeEventListener('touchend', _this.touchend);
      _document2.default.removeEventListener('touchmove', _this.touchmove);
      _this.setState({ mouseOver: false });
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(SliderHandle, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(StyledSlider, {
        active: this.state.mouseOver,
        className: (0, _classnames2.default)('kg-range-slider__bar', {
          'kg-range-slider__bar--active': this.state.mouseOver
        }),
        style: {
          width: this.props.width + '%',
          left: this.props.v0Left + '%'
        },
        onMouseDown: this.props.enableBarDrag && this.handleMouseDown,
        onTouchStart: this.props.enableBarDrag && this.handleTouchStart
      });
    }
  }]);
  return SliderHandle;
}(_react.Component), _class.propTypes = {
  width: _propTypes2.default.number,
  left: _propTypes2.default.string,
  sliderBarListener: _propTypes2.default.func,
  enableBarDrag: _propTypes2.default.bool
}, _class.defaultProps = {
  sliderBarListener: function sliderBarListenerTn() {},
  enableBarDrag: false
}, _temp2);
exports.default = SliderHandle;
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2NvbW1vbi9zbGlkZXIvc2xpZGVyLWJhci1oYW5kbGUuanMiXSwibmFtZXMiOlsiU3R5bGVkU2xpZGVyIiwic3R5bGVkIiwiZGl2IiwicHJvcHMiLCJhY3RpdmUiLCJ0aGVtZSIsInNsaWRlckJhckhvdmVyQ29sb3IiLCJzbGlkZXJCYXJDb2xvciIsInNsaWRlckJhckhlaWdodCIsInNsaWRlckJhclJhZGl1cyIsIlNsaWRlckhhbmRsZSIsInN0YXRlIiwibW91c2VPdmVyIiwicHJldlgiLCJoYW5kbGVNb3VzZURvd24iLCJkb2N1bWVudCIsImFkZEV2ZW50TGlzdGVuZXIiLCJtb3VzZXVwIiwibW91c2Vtb3ZlIiwic2V0U3RhdGUiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiZSIsInByZXZlbnREZWZhdWx0Iiwic2xpZGVyQmFyTGlzdGVuZXIiLCJtb3ZlbWVudFgiLCJoYW5kbGVUb3VjaFN0YXJ0IiwidG91Y2hlbmQiLCJ0b3VjaG1vdmUiLCJ0b3VjaGVzIiwiY2xpZW50WCIsImRlbHRhWCIsIndpZHRoIiwibGVmdCIsInYwTGVmdCIsImVuYWJsZUJhckRyYWciLCJDb21wb25lbnQiLCJwcm9wVHlwZXMiLCJQcm9wVHlwZXMiLCJudW1iZXIiLCJzdHJpbmciLCJmdW5jIiwiYm9vbCIsImRlZmF1bHRQcm9wcyIsInNsaWRlckJhckxpc3RlbmVyVG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O29WQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztBQUVBLElBQU1BLGVBQWVDLDJCQUFPQyxHQUF0QixrQkFFZ0I7QUFBQSxTQUNsQkMsTUFBTUMsTUFBTixHQUNJRCxNQUFNRSxLQUFO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O0FBRkssQztrQkFSSHhCLFk7QUFvRXBCIiwiZmlsZSI6InNsaWRlci1iYXItaGFuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSAyMDE4IFViZXIgVGVjaG5vbG9naWVzLCBJbmMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuLy8gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuLy8gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuLy8gdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuLy8gY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4vLyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4vLyBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4vLyBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbi8vIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuLy8gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuLy8gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbi8vIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbi8vIFRIRSBTT0ZUV0FSRS5cblxuaW1wb3J0IGRvY3VtZW50IGZyb20gJ2dsb2JhbC9kb2N1bWVudCc7XG5pbXBvcnQgUmVhY3QsIHtDb21wb25lbnR9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgY2xhc3NuYW1lcyBmcm9tICdjbGFzc25hbWVzJztcbmltcG9ydCBzdHlsZWQgZnJvbSAnc3R5bGVkLWNvbXBvbmVudHMnO1xuXG5jb25zdCBTdHlsZWRTbGlkZXIgPSBzdHlsZWQuZGl2YFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIGJhY2tncm91bmQtY29sb3I6ICR7cHJvcHMgPT5cbiAgICBwcm9wcy5hY3RpdmVcbiAgICAgID8gcHJvcHMudGhlbWUuc2xpZGVyQmFySG92ZXJDb2xvclxuICAgICAgOiBwcm9wcy50aGVtZS5zbGlkZXJCYXJDb2xvcn07XG4gIGhlaWdodDogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5zbGlkZXJCYXJIZWlnaHR9O1xuICBib3JkZXItcmFkaXVzOiAke3Byb3BzID0+IHByb3BzLnRoZW1lLnNsaWRlckJhclJhZGl1c307XG5cbiAgOmhvdmVyIHtcbiAgICBjdXJzb3I6IHBvaW50ZXI7XG4gIH1cbmA7XG4vKipcbiAqXG4gKiBwcm9wczpcbiAqICB3aWR0aCA6IGRlZmF1bHQgMjNcbiAqICBoZWlnaHQgOiBkZWZhdWx0IDIzXG4gKiAgbGVmdFxuICogIG9uTW92ZVxuICogIHNsaWRlckJhckxpc3RlbmVyXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNsaWRlckhhbmRsZSBleHRlbmRzIENvbXBvbmVudCB7XG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgd2lkdGg6IFByb3BUeXBlcy5udW1iZXIsXG4gICAgbGVmdDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBzbGlkZXJCYXJMaXN0ZW5lcjogUHJvcFR5cGVzLmZ1bmMsXG4gICAgZW5hYmxlQmFyRHJhZzogUHJvcFR5cGVzLmJvb2xcbiAgfTtcblxuICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgIHNsaWRlckJhckxpc3RlbmVyOiBmdW5jdGlvbiBzbGlkZXJCYXJMaXN0ZW5lclRuKCkge30sXG4gICAgZW5hYmxlQmFyRHJhZzogZmFsc2VcbiAgfTtcblxuICBzdGF0ZSA9IHttb3VzZU92ZXI6IGZhbHNlfTtcbiAgcHJldlggPSAwO1xuXG4gIGhhbmRsZU1vdXNlRG93biA9ICgpID0+IHtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdGhpcy5tb3VzZXVwKTtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCB0aGlzLm1vdXNlbW92ZSk7XG4gICAgdGhpcy5zZXRTdGF0ZSh7bW91c2VPdmVyOiB0cnVlfSk7XG4gIH07XG5cbiAgbW91c2V1cCA9ICgpID0+IHtcbiAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdGhpcy5tb3VzZXVwKTtcbiAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCB0aGlzLm1vdXNlbW92ZSk7XG4gICAgdGhpcy5zZXRTdGF0ZSh7bW91c2VPdmVyOiBmYWxzZX0pO1xuICB9O1xuXG4gIG1vdXNlbW92ZSA9IGUgPT4ge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB0aGlzLnByb3BzLnNsaWRlckJhckxpc3RlbmVyKGUubW92ZW1lbnRYKTtcbiAgfTtcblxuICBoYW5kbGVUb3VjaFN0YXJ0ID0gZSA9PiB7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCB0aGlzLnRvdWNoZW5kKTtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCB0aGlzLnRvdWNobW92ZSk7XG4gICAgdGhpcy5wcmV2WCA9IGUudG91Y2hlc1swXS5jbGllbnRYO1xuICAgIHRoaXMuc2V0U3RhdGUoe21vdXNlT3ZlcjogdHJ1ZX0pO1xuICB9O1xuXG4gIHRvdWNobW92ZSA9IGUgPT4ge1xuICAgIGNvbnN0IGRlbHRhWCA9IGUudG91Y2hlc1swXS5jbGllbnRYIC0gdGhpcy5wcmV2WDtcbiAgICB0aGlzLnByZXZYID0gZS50b3VjaGVzWzBdLmNsaWVudFg7XG4gICAgdGhpcy5wcm9wcy5zbGlkZXJCYXJMaXN0ZW5lcihkZWx0YVgpO1xuICB9O1xuXG4gIHRvdWNoZW5kID0gKCkgPT4ge1xuICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgdGhpcy50b3VjaGVuZCk7XG4gICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgdGhpcy50b3VjaG1vdmUpO1xuICAgIHRoaXMuc2V0U3RhdGUoe21vdXNlT3ZlcjogZmFsc2V9KTtcbiAgfTtcblxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxTdHlsZWRTbGlkZXJcbiAgICAgICAgYWN0aXZlPXt0aGlzLnN0YXRlLm1vdXNlT3Zlcn1cbiAgICAgICAgY2xhc3NOYW1lPXtjbGFzc25hbWVzKCdrZy1yYW5nZS1zbGlkZXJfX2JhcicsIHtcbiAgICAgICAgICAna2ctcmFuZ2Utc2xpZGVyX19iYXItLWFjdGl2ZSc6IHRoaXMuc3RhdGUubW91c2VPdmVyXG4gICAgICAgIH0pfVxuICAgICAgICBzdHlsZT17e1xuICAgICAgICAgIHdpZHRoOiBgJHt0aGlzLnByb3BzLndpZHRofSVgLFxuICAgICAgICAgIGxlZnQ6IGAke3RoaXMucHJvcHMudjBMZWZ0fSVgXG4gICAgICAgIH19XG4gICAgICAgIG9uTW91c2VEb3duPXt0aGlzLnByb3BzLmVuYWJsZUJhckRyYWcgJiYgdGhpcy5oYW5kbGVNb3VzZURvd259XG4gICAgICAgIG9uVG91Y2hTdGFydD17dGhpcy5wcm9wcy5lbmFibGVCYXJEcmFnICYmIHRoaXMuaGFuZGxlVG91Y2hTdGFydH1cbiAgICAgIC8+XG4gICAgKTtcbiAgfVxufTtcbiJdfQ==