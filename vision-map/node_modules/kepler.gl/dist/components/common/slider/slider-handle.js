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

var _templateObject = (0, _taggedTemplateLiteral3.default)(['\n  position: absolute;\n  z-index: 10;\n  display: ', ';\n  margin-top: -4px;\n  height: ', ';\n  width: ', ';\n  box-shadow: ', ';\n  background-color: ', ';\n  border-width: 1px;\n  border-style: solid;\n  border-color: ', ';\n\n  :hover {\n    background-color: ', ';\n    cursor: pointer;\n  }\n'], ['\n  position: absolute;\n  z-index: 10;\n  display: ', ';\n  margin-top: -4px;\n  height: ', ';\n  width: ', ';\n  box-shadow: ', ';\n  background-color: ', ';\n  border-width: 1px;\n  border-style: solid;\n  border-color: ', ';\n\n  :hover {\n    background-color: ', ';\n    cursor: pointer;\n  }\n']); // Copyright (c) 2018 Uber Technologies, Inc.
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

var StyledSliderHandle = _styledComponents2.default.span(_templateObject, function (props) {
  return props.hidden ? 'none' : 'block';
}, function (props) {
  return Number.isFinite(props.sliderHandleWidth) ? props.sliderHandleWidth + 'px' : props.theme.sliderHandleHeight;
}, function (props) {
  return Number.isFinite(props.sliderHandleWidth) ? props.sliderHandleWidth + 'px' : props.theme.sliderHandleHeight;
}, function (props) {
  return props.theme.sliderHandleShadow;
}, function (props) {
  return props.theme.sliderHandleColor;
}, function (props) {
  return props.active ? props.theme.selectBorderColor : props.theme.sliderHandleColor;
}, function (props) {
  return props.theme.sliderHandleHoverColor;
});

/**
 *
 * props:
 *  width : default 23
 *  height : default 23
 *  display
 *  left
 *  onMove
 *  valueListener
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
      _this.props.valueListener(e.movementX);
    }, _this.handleTouchStart = function (e) {
      _document2.default.addEventListener('touchend', _this.touchend);
      _document2.default.addEventListener('touchmove', _this.touchmove);
      _this.prevX = e.touches[0].clientX;
      _this.setState({ mouseOver: true });
    }, _this.touchmove = function (e) {
      var deltaX = e.touches[0].clientX - _this.prevX;
      _this.prevX = e.touches[0].clientX;
      _this.props.valueListener(deltaX);
    }, _this.touchend = function () {
      _document2.default.removeEventListener('touchend', _this.touchend);
      _document2.default.removeEventListener('touchmove', _this.touchmove);
      _this.setState({ mouseOver: false });
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(SliderHandle, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(StyledSliderHandle, {
        className: (0, _classnames2.default)('kg-range-slider__handle', {
          'kg-range-slider__handle--active': this.state.mouseOver
        }),
        sliderHandleWidth: this.props.sliderHandleWidth,
        active: this.state.mouseOver,
        hidden: !this.props.display,
        style: { left: this.props.left },
        onMouseDown: this.handleMouseDown,
        onTouchStart: this.handleTouchStart
      });
    }
  }]);
  return SliderHandle;
}(_react.Component), _class.propTypes = {
  width: _propTypes2.default.number,
  height: _propTypes2.default.number,
  left: _propTypes2.default.string,
  display: _propTypes2.default.bool,
  valueListener: _propTypes2.default.func
}, _class.defaultProps = {
  left: '50%',
  display: true,
  valueListener: function valueListenerFn() {}
}, _temp2);
exports.default = SliderHandle;
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2NvbW1vbi9zbGlkZXIvc2xpZGVyLWhhbmRsZS5qcyJdLCJuYW1lcyI6WyJTdHlsZWRTbGlkZXJIYW5kbGUiLCJzdHlsZWQiLCJzcGFuIiwicHJvcHMiLCJoaWRkZW4iLCJOdW1iZXIiLCJpc0Zpbml0ZSIsInNsaWRlckhhbmRsZVdpZHRoIiwidGhlbWUiLCJzbGlkZXJIYW5kbGVIZWlnaHQiLCJzbGlkZXJIYW5kbGVTaGFkb3ciLCJzbGlkZXJIYW5kbGVDb2xvciIsImFjdGl2ZSIsInNlbGVjdEJvcmRlckNvbG9yIiwic2xpZGVySGFuZGxlSG92ZXJDb2xvciIsIlNsaWRlckhhbmRsZSIsInN0YXRlIiwibW91c2VPdmVyIiwicHJldlgiLCJoYW5kbGVNb3VzZURvd24iLCJkb2N1bWVudCIsImFkZEV2ZW50TGlzdGVuZXIiLCJtb3VzZXVwIiwibW91c2Vtb3ZlIiwic2V0U3RhdGUiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiZSIsInByZXZlbnREZWZhdWx0IiwidmFsdWVMaXN0ZW5lciIsIm1vdmVtZW50WCIsImhhbmRsZVRvdWNoU3RhcnQiLCJ0b3VjaGVuZCIsInRvdWNobW92ZSIsInRvdWNoZXMiLCJjbGllbnRYIiwiZGVsdGFYIiwiZGlzcGxheSIsImxlZnQiLCJDb21wb25lbnQiLCJwcm9wVHlwZXMiLCJ3aWR0aCIsIlByb3BUeXBlcyIsIm51bWJlciIsImhlaWdodCIsInN0cmluZyIsImJvb2wiLCJmdW5jIiwiZGVmYXVsdFByb3BzIiwidmFsdWVMaXN0ZW5lckZuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztncUJBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBRUEs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S0FBTCxDQUFXQyxTQUxyQjtBQU1FLGdCQUFRLENBQUMsS0FBS2QsS0FBTCxDQUFXaUMsT0FOdEI7QUFPRSxlQUFPLEVBQUNDLE1BQU0sS0FBS2xDLEtBQUwsQ0FBV2tDLElBQWxCLEVBUFQ7QUFRRSxxQkFBYSxLQUFLbEIsZUFScEI7QUFTRSxzQkFBYyxLQUFLVztBQVRyQixRQURGO0FBYUQ7OztFQXBFdUNRLGdCLFVBQ2pDQyxTLEdBQVk7QUFDakJDLFNBQU9DLG9CQUFVQyxNQURBO0FBRWpCQyxVQUFRRixvQkFBVUMsTUFGRDtBQUdqQkwsUUFBTUksb0JBQVVHLE1BSEM7QUFJakJSLFdBQVNLLG9CQUFVSSxJQUpGO0FBS2pCakIsaUJBQWVhLG9CQUFVSztBQUxSLEMsU0FRWkMsWSxHQUFlO0FBQ3BCVixRQUFNLEtBRGM7QUFFcEJELFdBQVMsSUFGVztBQUdwQlIsaUJBQWUsU0FBU29CLGVBQVQsR0FBMkIsQ0FBRTtBQUh4QixDO2tCQVRIakMsWTtBQXFFcEIiLCJmaWxlIjoic2xpZGVyLWhhbmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgMjAxOCBVYmVyIFRlY2hub2xvZ2llcywgSW5jLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbi8vIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbi8vIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbi8vIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbi8vIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuLy8gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuLy8gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4vLyBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbi8vIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbi8vIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4vLyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4vLyBUSEUgU09GVFdBUkUuXG5cbmltcG9ydCBkb2N1bWVudCBmcm9tICdnbG9iYWwvZG9jdW1lbnQnO1xuaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50fSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IGNsYXNzbmFtZXMgZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgc3R5bGVkIGZyb20gJ3N0eWxlZC1jb21wb25lbnRzJztcblxuY29uc3QgU3R5bGVkU2xpZGVySGFuZGxlID0gc3R5bGVkLnNwYW5gXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgei1pbmRleDogMTA7XG4gIGRpc3BsYXk6ICR7cHJvcHMgPT4gKHByb3BzLmhpZGRlbiA/ICdub25lJyA6ICdibG9jaycpfTtcbiAgbWFyZ2luLXRvcDogLTRweDtcbiAgaGVpZ2h0OiAke3Byb3BzID0+XG4gICAgTnVtYmVyLmlzRmluaXRlKHByb3BzLnNsaWRlckhhbmRsZVdpZHRoKVxuICAgICAgPyBgJHtwcm9wcy5zbGlkZXJIYW5kbGVXaWR0aH1weGBcbiAgICAgIDogcHJvcHMudGhlbWUuc2xpZGVySGFuZGxlSGVpZ2h0fTtcbiAgd2lkdGg6ICR7cHJvcHMgPT5cbiAgICBOdW1iZXIuaXNGaW5pdGUocHJvcHMuc2xpZGVySGFuZGxlV2lkdGgpXG4gICAgICA/IGAke3Byb3BzLnNsaWRlckhhbmRsZVdpZHRofXB4YFxuICAgICAgOiBwcm9wcy50aGVtZS5zbGlkZXJIYW5kbGVIZWlnaHR9O1xuICBib3gtc2hhZG93OiAke3Byb3BzID0+IHByb3BzLnRoZW1lLnNsaWRlckhhbmRsZVNoYWRvd307XG4gIGJhY2tncm91bmQtY29sb3I6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUuc2xpZGVySGFuZGxlQ29sb3J9O1xuICBib3JkZXItd2lkdGg6IDFweDtcbiAgYm9yZGVyLXN0eWxlOiBzb2xpZDtcbiAgYm9yZGVyLWNvbG9yOiAke3Byb3BzID0+XG4gICAgcHJvcHMuYWN0aXZlXG4gICAgICA/IHByb3BzLnRoZW1lLnNlbGVjdEJvcmRlckNvbG9yXG4gICAgICA6IHByb3BzLnRoZW1lLnNsaWRlckhhbmRsZUNvbG9yfTtcblxuICA6aG92ZXIge1xuICAgIGJhY2tncm91bmQtY29sb3I6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUuc2xpZGVySGFuZGxlSG92ZXJDb2xvcn07XG4gICAgY3Vyc29yOiBwb2ludGVyO1xuICB9XG5gO1xuXG4vKipcbiAqXG4gKiBwcm9wczpcbiAqICB3aWR0aCA6IGRlZmF1bHQgMjNcbiAqICBoZWlnaHQgOiBkZWZhdWx0IDIzXG4gKiAgZGlzcGxheVxuICogIGxlZnRcbiAqICBvbk1vdmVcbiAqICB2YWx1ZUxpc3RlbmVyXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNsaWRlckhhbmRsZSBleHRlbmRzIENvbXBvbmVudCB7XG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgd2lkdGg6IFByb3BUeXBlcy5udW1iZXIsXG4gICAgaGVpZ2h0OiBQcm9wVHlwZXMubnVtYmVyLFxuICAgIGxlZnQ6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgZGlzcGxheTogUHJvcFR5cGVzLmJvb2wsXG4gICAgdmFsdWVMaXN0ZW5lcjogUHJvcFR5cGVzLmZ1bmNcbiAgfTtcblxuICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgIGxlZnQ6ICc1MCUnLFxuICAgIGRpc3BsYXk6IHRydWUsXG4gICAgdmFsdWVMaXN0ZW5lcjogZnVuY3Rpb24gdmFsdWVMaXN0ZW5lckZuKCkge31cbiAgfTtcblxuICBzdGF0ZSA9IHttb3VzZU92ZXI6IGZhbHNlfTtcbiAgcHJldlggPSAwO1xuXG4gIGhhbmRsZU1vdXNlRG93biA9ICgpID0+IHtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdGhpcy5tb3VzZXVwKTtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCB0aGlzLm1vdXNlbW92ZSk7XG4gICAgdGhpcy5zZXRTdGF0ZSh7bW91c2VPdmVyOiB0cnVlfSk7XG4gIH07XG5cbiAgbW91c2V1cCA9ICgpID0+IHtcbiAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdGhpcy5tb3VzZXVwKTtcbiAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCB0aGlzLm1vdXNlbW92ZSk7XG4gICAgdGhpcy5zZXRTdGF0ZSh7bW91c2VPdmVyOiBmYWxzZX0pO1xuICB9O1xuXG4gIG1vdXNlbW92ZSA9IGUgPT4ge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB0aGlzLnByb3BzLnZhbHVlTGlzdGVuZXIoZS5tb3ZlbWVudFgpO1xuICB9O1xuXG4gIGhhbmRsZVRvdWNoU3RhcnQgPSBlID0+IHtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIHRoaXMudG91Y2hlbmQpO1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIHRoaXMudG91Y2htb3ZlKTtcbiAgICB0aGlzLnByZXZYID0gZS50b3VjaGVzWzBdLmNsaWVudFg7XG4gICAgdGhpcy5zZXRTdGF0ZSh7bW91c2VPdmVyOiB0cnVlfSk7XG4gIH07XG5cbiAgdG91Y2htb3ZlID0gZSA9PiB7XG4gICAgY29uc3QgZGVsdGFYID0gZS50b3VjaGVzWzBdLmNsaWVudFggLSB0aGlzLnByZXZYO1xuICAgIHRoaXMucHJldlggPSBlLnRvdWNoZXNbMF0uY2xpZW50WDtcbiAgICB0aGlzLnByb3BzLnZhbHVlTGlzdGVuZXIoZGVsdGFYKTtcbiAgfTtcblxuICB0b3VjaGVuZCA9ICgpID0+IHtcbiAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIHRoaXMudG91Y2hlbmQpO1xuICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIHRoaXMudG91Y2htb3ZlKTtcbiAgICB0aGlzLnNldFN0YXRlKHttb3VzZU92ZXI6IGZhbHNlfSk7XG4gIH07XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8U3R5bGVkU2xpZGVySGFuZGxlXG4gICAgICAgIGNsYXNzTmFtZT17Y2xhc3NuYW1lcygna2ctcmFuZ2Utc2xpZGVyX19oYW5kbGUnLCB7XG4gICAgICAgICAgJ2tnLXJhbmdlLXNsaWRlcl9faGFuZGxlLS1hY3RpdmUnOiB0aGlzLnN0YXRlLm1vdXNlT3ZlclxuICAgICAgICB9KX1cbiAgICAgICAgc2xpZGVySGFuZGxlV2lkdGg9e3RoaXMucHJvcHMuc2xpZGVySGFuZGxlV2lkdGh9XG4gICAgICAgIGFjdGl2ZT17dGhpcy5zdGF0ZS5tb3VzZU92ZXJ9XG4gICAgICAgIGhpZGRlbj17IXRoaXMucHJvcHMuZGlzcGxheX1cbiAgICAgICAgc3R5bGU9e3tsZWZ0OiB0aGlzLnByb3BzLmxlZnR9fVxuICAgICAgICBvbk1vdXNlRG93bj17dGhpcy5oYW5kbGVNb3VzZURvd259XG4gICAgICAgIG9uVG91Y2hTdGFydD17dGhpcy5oYW5kbGVUb3VjaFN0YXJ0fVxuICAgICAgLz5cbiAgICApO1xuICB9XG59O1xuIl19