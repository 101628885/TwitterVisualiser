'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

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

var _templateObject = (0, _taggedTemplateLiteral3.default)(['\n  position: relative;\n  margin-bottom: 12px;\n  background-color: ', ';\n  height: ', ';\n'], ['\n  position: relative;\n  margin-bottom: 12px;\n  background-color: ', ';\n  height: ', ';\n']),
    _templateObject2 = (0, _taggedTemplateLiteral3.default)(['\n  flex-grow: 1;\n  margin-top: ', 'px;\n'], ['\n  flex-grow: 1;\n  margin-top: ', 'px;\n']); // Copyright (c) 2018 Uber Technologies, Inc.
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

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _sliderHandle = require('./slider-handle');

var _sliderHandle2 = _interopRequireDefault(_sliderHandle);

var _sliderBarHandle = require('./slider-bar-handle');

var _sliderBarHandle2 = _interopRequireDefault(_sliderBarHandle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function noop() {}

var StyledRangeSlider = _styledComponents2.default.div(_templateObject, function (props) {
  return props.theme.sliderBarBgd;
}, function (props) {
  return props.theme.sliderBarHeight;
});

var SliderWrapper = _styledComponents2.default.div(_templateObject2, function (props) {
  return props.isRanged ? 0 : 10;
});

var Slider = (_temp2 = _class = function (_Component) {
  (0, _inherits3.default)(Slider, _Component);

  function Slider() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, Slider);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Slider.__proto__ || Object.getPrototypeOf(Slider)).call.apply(_ref, [this].concat(args))), _this), _this.ref = undefined, _this._saveRef = function (ref) {
      _this.ref = ref;
    }, _this.slide0Listener = function (x) {
      var xPercent = x / _this.ref.offsetWidth;
      var maxDelta = _this.props.maxValue - _this.props.minValue;
      var val = xPercent * maxDelta;
      _this.props.onSlider0Change.call(_this, val + _this.props.value0);
    }, _this.slide1Listener = function (x) {
      var xPercent = x / _this.ref.offsetWidth;
      var maxDelta = _this.props.maxValue - _this.props.minValue;
      var val = xPercent * maxDelta;
      _this.props.onSlider1Change(val + _this.props.value1);
    }, _this.sliderBarListener = function (x) {
      var xPercent = x / _this.ref.offsetWidth;
      var maxDelta = _this.props.maxValue - _this.props.minValue;
      var val = xPercent * maxDelta;
      var val0 = val + _this.props.value0;
      var val1 = val + _this.props.value1;
      _this.props.onSliderBarChange(val0, val1);
    }, _this.calcHandleLeft0 = function (w, l, num) {
      return w === 0 ? 'calc(' + l + '% - ' + _this.props.sliderHandleWidth / 2 + 'px)' : 'calc(' + l + '% - ' + _this.props.sliderHandleWidth / 2 + 'px)';
    }, _this.calcHandleLeft1 = function (w, l) {
      return _this.props.isRanged && w === 0 ? l + '%' : 'calc(' + (l + w) + '% - ' + _this.props.sliderHandleWidth / 2 + 'px)';
    }, _this.createSlider = function (width, v0Left) {
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          StyledRangeSlider,
          { className: 'kg-range-slider' },
          _react2.default.createElement(_sliderHandle2.default, {
            className: 'kg-range-slider__handle',
            left: _this.calcHandleLeft0(width, v0Left),
            valueListener: _this.slide0Listener,
            sliderHandleWidth: _this.props.sliderHandleWidth,
            display: _this.props.isRanged
          }),
          _react2.default.createElement(_sliderHandle2.default, {
            className: 'kg-range-slider__handle',
            left: _this.calcHandleLeft1(width, v0Left),
            valueListener: _this.slide1Listener,
            sliderHandleWidth: _this.props.sliderHandleWidth
          }),
          _react2.default.createElement(_sliderBarHandle2.default, {
            width: width,
            v0Left: v0Left,
            enableBarDrag: _this.props.enableBarDrag,
            sliderBarListener: _this.sliderBarListener
          })
        )
      );
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(Slider, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          classSet = _props.classSet,
          isRanged = _props.isRanged,
          maxValue = _props.maxValue,
          minValue = _props.minValue,
          value1 = _props.value1;

      var value0 = !isRanged && minValue > 0 ? minValue : this.props.value0;
      var currValDelta = value1 - value0;
      var maxDelta = maxValue - minValue;
      var width = currValDelta / maxDelta * 100;

      var v0Left = (value0 - minValue) / maxDelta * 100;

      return _react2.default.createElement(
        SliderWrapper,
        {
          className: (0, _classnames2.default)('kg-slider', (0, _extends3.default)({}, classSet)),
          innerRef: this._saveRef,
          isRanged: isRanged
        },
        this.createSlider(width, v0Left)
      );
    }
  }]);
  return Slider;
}(_react.Component), _class.propTypes = {
  title: _propTypes2.default.string,
  isRanged: _propTypes2.default.bool,
  value0: _propTypes2.default.number,
  value1: _propTypes2.default.number,
  minValue: _propTypes2.default.number,
  maxValue: _propTypes2.default.number,
  sliderHandleWidth: _propTypes2.default.number,
  onSlider0Change: _propTypes2.default.func,
  onInput0Change: _propTypes2.default.func,
  onSlider1Change: _propTypes2.default.func,
  onInput1Change: _propTypes2.default.func,
  onSliderBarChange: _propTypes2.default.func,
  step: _propTypes2.default.number,
  enableBarDrag: _propTypes2.default.bool
}, _class.defaultProps = {
  title: '',
  isRanged: true,
  value0: 0,
  value1: 100,
  minValue: 0,
  maxValue: 100,
  step: 1,
  sliderHandleWidth: 12,
  enableBarDrag: false,
  onSlider0Change: noop,
  onInput0Change: noop,
  onSlider1Change: noop,
  onInput1Change: noop,
  onSliderBarChange: noop,
  disabled: false
}, _temp2);
exports.default = Slider;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2NvbW1vbi9zbGlkZXIvc2xpZGVyLmpzIl0sIm5hbWVzIjpbIm5vb3AiLCJTdHlsZWRSYW5nZVNsaWRlciIsInN0eWxlZCIsImRpdiIsInByb3BzIiwidGhlbWUiLCJzbGlkZXJCYXJCZ2QiLCJzbGlkZXJCYXJIZWlnaHQiLCJTbGlkZXJXcmFwcGVyIiwiaXNSYW5nZWQiLCJTbGlkZXIiLCJyZWYiLCJ1bmRlZmluZWQiLCJfc2F2ZVJlZiIsInNsaWRlMExpc3RlbmVyIiwieFBlcmNlbnQiLCJ4Iiwib2Zmc2V0V2lkdGgiLCJtYXhEZWx0YSIsIm1heFZhbHVlIiwibWluVmFsdWUiLCJ2YWwiLCJvblNsaWRlcjBDaGFuZ2UiLCJjYWxsIiwidmFsdWUwIiwic2xpZGUxTGlzdGVuZXIiLCJvblNsaWRlcjFDaGFuZ2UiLCJ2YWx1ZTEiLCJzbGlkZXJCYXJMaXN0ZW5lciIsInZhbDAiLCJ2YWwxIiwib25TbGlkZXJCYXJDaGFuZ2UiLCJjYWxjSGFuZGxlTGVmdDAiLCJ3IiwibCIsIm51bSIsInNsaWRlckhhbmRsZVdpZHRoIiwiY2FsY0hhbmRsZUxlZnQxIiwiY3JlYXRlU2xpZGVyIiwid2lkdGgiLCJ2MExlZnQiLCJlbmFibGVCYXJEcmFnIiwiY2xhc3NTZXQiLCJjdXJyVmFsRGVsdGEiLCJDb21wb25lbnQiLCJwcm9wVHlwZXMiLCJ0aXRsZSIsIlByb3BUeXBlcyIsInN0cmluZyIsImJvb2wiLCJudW1iZXIiLCJmdW5jIiwib25JbnB1dDBDaGFuZ2UiLCJvbklucHV0MUNoYW5nZSIsInN0ZXAiLCJkZWZhdWx0UHJvcHMiLCJkaXNhYmxlZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs2SkFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7OztB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QUwsQ0FBa0JDLEtBQWxCLEVBQXlCQyxNQUF6QjtBQUxILE9BREY7QUFTRDs7O0VBaElpQ0ksZ0IsVUFDM0JDLFMsR0FBWTtBQUNqQkMsU0FBT0Msb0JBQVVDLE1BREE7QUFFakJ2QyxZQUFVc0Msb0JBQVVFLElBRkg7QUFHakJ6QixVQUFRdUIsb0JBQVVHLE1BSEQ7QUFJakJ2QixVQUFRb0Isb0JBQVVHLE1BSkQ7QUFLakI5QixZQUFVMkIsb0JBQVVHLE1BTEg7QUFNakIvQixZQUFVNEIsb0JBQVVHLE1BTkg7QUFPakJkLHFCQUFtQlcsb0JBQVVHLE1BUFo7QUFRakI1QixtQkFBaUJ5QixvQkFBVUksSUFSVjtBQVNqQkMsa0JBQWdCTCxvQkFBVUksSUFUVDtBQVVqQnpCLG1CQUFpQnFCLG9CQUFVSSxJQVZWO0FBV2pCRSxrQkFBZ0JOLG9CQUFVSSxJQVhUO0FBWWpCcEIscUJBQW1CZ0Isb0JBQVVJLElBWlo7QUFhakJHLFFBQU1QLG9CQUFVRyxNQWJDO0FBY2pCVCxpQkFBZU0sb0JBQVVFO0FBZFIsQyxTQWlCWk0sWSxHQUFlO0FBQ3BCVCxTQUFPLEVBRGE7QUFFcEJyQyxZQUFVLElBRlU7QUFHcEJlLFVBQVEsQ0FIWTtBQUlwQkcsVUFBUSxHQUpZO0FBS3BCUCxZQUFVLENBTFU7QUFNcEJELFlBQVUsR0FOVTtBQU9wQm1DLFFBQU0sQ0FQYztBQVFwQmxCLHFCQUFtQixFQVJDO0FBU3BCSyxpQkFBZSxLQVRLO0FBVXBCbkIsbUJBQWlCdEIsSUFWRztBQVdwQm9ELGtCQUFnQnBELElBWEk7QUFZcEIwQixtQkFBaUIxQixJQVpHO0FBYXBCcUQsa0JBQWdCckQsSUFiSTtBQWNwQitCLHFCQUFtQi9CLElBZEM7QUFlcEJ3RCxZQUFVO0FBZlUsQztrQkFsQkg5QyxNIiwiZmlsZSI6InNsaWRlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgMjAxOCBVYmVyIFRlY2hub2xvZ2llcywgSW5jLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbi8vIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbi8vIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbi8vIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbi8vIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuLy8gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuLy8gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4vLyBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbi8vIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbi8vIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4vLyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4vLyBUSEUgU09GVFdBUkUuXG5cbmltcG9ydCBSZWFjdCwge0NvbXBvbmVudH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCBjbGFzc25hbWVzIGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0IHN0eWxlZCBmcm9tICdzdHlsZWQtY29tcG9uZW50cyc7XG5cbmltcG9ydCBTbGlkZXJIYW5kbGUgZnJvbSAnLi9zbGlkZXItaGFuZGxlJztcbmltcG9ydCBTbGlkZXJCYXJIYW5kbGUgZnJvbSAnLi9zbGlkZXItYmFyLWhhbmRsZSc7XG5cbmZ1bmN0aW9uIG5vb3AoKSB7fVxuXG5jb25zdCBTdHlsZWRSYW5nZVNsaWRlciA9IHN0eWxlZC5kaXZgXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgbWFyZ2luLWJvdHRvbTogMTJweDtcbiAgYmFja2dyb3VuZC1jb2xvcjogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5zbGlkZXJCYXJCZ2R9O1xuICBoZWlnaHQ6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUuc2xpZGVyQmFySGVpZ2h0fTtcbmA7XG5cbmNvbnN0IFNsaWRlcldyYXBwZXIgPSBzdHlsZWQuZGl2YFxuICBmbGV4LWdyb3c6IDE7XG4gIG1hcmdpbi10b3A6ICR7cHJvcHMgPT4gcHJvcHMuaXNSYW5nZWQgPyAwIDogMTB9cHg7XG5gO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTbGlkZXIgZXh0ZW5kcyBDb21wb25lbnQge1xuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIHRpdGxlOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGlzUmFuZ2VkOiBQcm9wVHlwZXMuYm9vbCxcbiAgICB2YWx1ZTA6IFByb3BUeXBlcy5udW1iZXIsXG4gICAgdmFsdWUxOiBQcm9wVHlwZXMubnVtYmVyLFxuICAgIG1pblZhbHVlOiBQcm9wVHlwZXMubnVtYmVyLFxuICAgIG1heFZhbHVlOiBQcm9wVHlwZXMubnVtYmVyLFxuICAgIHNsaWRlckhhbmRsZVdpZHRoOiBQcm9wVHlwZXMubnVtYmVyLFxuICAgIG9uU2xpZGVyMENoYW5nZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25JbnB1dDBDaGFuZ2U6IFByb3BUeXBlcy5mdW5jLFxuICAgIG9uU2xpZGVyMUNoYW5nZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25JbnB1dDFDaGFuZ2U6IFByb3BUeXBlcy5mdW5jLFxuICAgIG9uU2xpZGVyQmFyQ2hhbmdlOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBzdGVwOiBQcm9wVHlwZXMubnVtYmVyLFxuICAgIGVuYWJsZUJhckRyYWc6IFByb3BUeXBlcy5ib29sXG4gIH07XG5cbiAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICB0aXRsZTogJycsXG4gICAgaXNSYW5nZWQ6IHRydWUsXG4gICAgdmFsdWUwOiAwLFxuICAgIHZhbHVlMTogMTAwLFxuICAgIG1pblZhbHVlOiAwLFxuICAgIG1heFZhbHVlOiAxMDAsXG4gICAgc3RlcDogMSxcbiAgICBzbGlkZXJIYW5kbGVXaWR0aDogMTIsXG4gICAgZW5hYmxlQmFyRHJhZzogZmFsc2UsXG4gICAgb25TbGlkZXIwQ2hhbmdlOiBub29wLFxuICAgIG9uSW5wdXQwQ2hhbmdlOiBub29wLFxuICAgIG9uU2xpZGVyMUNoYW5nZTogbm9vcCxcbiAgICBvbklucHV0MUNoYW5nZTogbm9vcCxcbiAgICBvblNsaWRlckJhckNoYW5nZTogbm9vcCxcbiAgICBkaXNhYmxlZDogZmFsc2VcbiAgfTtcblxuICByZWYgPSB1bmRlZmluZWQ7XG5cbiAgX3NhdmVSZWYgPSByZWYgPT4ge1xuICAgIHRoaXMucmVmID0gcmVmO1xuICB9O1xuXG4gIHNsaWRlMExpc3RlbmVyID0geCA9PiB7XG4gICAgY29uc3QgeFBlcmNlbnQgPSB4IC8gdGhpcy5yZWYub2Zmc2V0V2lkdGg7XG4gICAgY29uc3QgbWF4RGVsdGEgPSB0aGlzLnByb3BzLm1heFZhbHVlIC0gdGhpcy5wcm9wcy5taW5WYWx1ZTtcbiAgICBjb25zdCB2YWwgPSB4UGVyY2VudCAqIG1heERlbHRhO1xuICAgIHRoaXMucHJvcHMub25TbGlkZXIwQ2hhbmdlLmNhbGwodGhpcywgdmFsICsgdGhpcy5wcm9wcy52YWx1ZTApO1xuICB9O1xuXG4gIHNsaWRlMUxpc3RlbmVyID0geCA9PiB7XG4gICAgY29uc3QgeFBlcmNlbnQgPSB4IC8gdGhpcy5yZWYub2Zmc2V0V2lkdGg7XG4gICAgY29uc3QgbWF4RGVsdGEgPSB0aGlzLnByb3BzLm1heFZhbHVlIC0gdGhpcy5wcm9wcy5taW5WYWx1ZTtcbiAgICBjb25zdCB2YWwgPSB4UGVyY2VudCAqIG1heERlbHRhO1xuICAgIHRoaXMucHJvcHMub25TbGlkZXIxQ2hhbmdlKHZhbCArIHRoaXMucHJvcHMudmFsdWUxKTtcbiAgfTtcblxuICBzbGlkZXJCYXJMaXN0ZW5lciA9IHggPT4ge1xuICAgIGNvbnN0IHhQZXJjZW50ID0geCAvIHRoaXMucmVmLm9mZnNldFdpZHRoO1xuICAgIGNvbnN0IG1heERlbHRhID0gdGhpcy5wcm9wcy5tYXhWYWx1ZSAtIHRoaXMucHJvcHMubWluVmFsdWU7XG4gICAgY29uc3QgdmFsID0geFBlcmNlbnQgKiBtYXhEZWx0YTtcbiAgICBjb25zdCB2YWwwID0gdmFsICsgdGhpcy5wcm9wcy52YWx1ZTA7XG4gICAgY29uc3QgdmFsMSA9IHZhbCArIHRoaXMucHJvcHMudmFsdWUxO1xuICAgIHRoaXMucHJvcHMub25TbGlkZXJCYXJDaGFuZ2UodmFsMCwgdmFsMSk7XG4gIH07XG5cbiAgY2FsY0hhbmRsZUxlZnQwID0gKHcsIGwsIG51bSkgPT4ge1xuICAgIHJldHVybiB3ID09PSAwID8gYGNhbGMoJHtsfSUgLSAke3RoaXMucHJvcHMuc2xpZGVySGFuZGxlV2lkdGggLyAyfXB4KWAgOlxuICAgICAgYGNhbGMoJHtsfSUgLSAke3RoaXMucHJvcHMuc2xpZGVySGFuZGxlV2lkdGggLyAyfXB4KWA7XG4gIH07XG5cbiAgY2FsY0hhbmRsZUxlZnQxID0gKHcsIGwpID0+IHtcbiAgICByZXR1cm4gdGhpcy5wcm9wcy5pc1JhbmdlZCAmJiB3ID09PSAwXG4gICAgICA/IGAke2x9JWBcbiAgICAgIDogYGNhbGMoJHtsICsgd30lIC0gJHt0aGlzLnByb3BzLnNsaWRlckhhbmRsZVdpZHRoIC8gMn1weClgO1xuICB9O1xuXG4gIGNyZWF0ZVNsaWRlciA9ICh3aWR0aCwgdjBMZWZ0KSA9PiB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXY+XG4gICAgICAgIDxTdHlsZWRSYW5nZVNsaWRlciBjbGFzc05hbWU9XCJrZy1yYW5nZS1zbGlkZXJcIj5cbiAgICAgICAgICA8U2xpZGVySGFuZGxlXG4gICAgICAgICAgICBjbGFzc05hbWU9XCJrZy1yYW5nZS1zbGlkZXJfX2hhbmRsZVwiXG4gICAgICAgICAgICBsZWZ0PXt0aGlzLmNhbGNIYW5kbGVMZWZ0MCh3aWR0aCwgdjBMZWZ0KX1cbiAgICAgICAgICAgIHZhbHVlTGlzdGVuZXI9e3RoaXMuc2xpZGUwTGlzdGVuZXJ9XG4gICAgICAgICAgICBzbGlkZXJIYW5kbGVXaWR0aD17dGhpcy5wcm9wcy5zbGlkZXJIYW5kbGVXaWR0aH1cbiAgICAgICAgICAgIGRpc3BsYXk9e3RoaXMucHJvcHMuaXNSYW5nZWR9XG4gICAgICAgICAgLz5cbiAgICAgICAgICA8U2xpZGVySGFuZGxlXG4gICAgICAgICAgICBjbGFzc05hbWU9XCJrZy1yYW5nZS1zbGlkZXJfX2hhbmRsZVwiXG4gICAgICAgICAgICBsZWZ0PXt0aGlzLmNhbGNIYW5kbGVMZWZ0MSh3aWR0aCwgdjBMZWZ0KX1cbiAgICAgICAgICAgIHZhbHVlTGlzdGVuZXI9e3RoaXMuc2xpZGUxTGlzdGVuZXJ9XG4gICAgICAgICAgICBzbGlkZXJIYW5kbGVXaWR0aD17dGhpcy5wcm9wcy5zbGlkZXJIYW5kbGVXaWR0aH1cbiAgICAgICAgICAvPlxuICAgICAgICAgIDxTbGlkZXJCYXJIYW5kbGVcbiAgICAgICAgICAgIHdpZHRoPXt3aWR0aH1cbiAgICAgICAgICAgIHYwTGVmdD17djBMZWZ0fVxuICAgICAgICAgICAgZW5hYmxlQmFyRHJhZz17dGhpcy5wcm9wcy5lbmFibGVCYXJEcmFnfVxuICAgICAgICAgICAgc2xpZGVyQmFyTGlzdGVuZXI9e3RoaXMuc2xpZGVyQmFyTGlzdGVuZXJ9XG4gICAgICAgICAgLz5cbiAgICAgICAgPC9TdHlsZWRSYW5nZVNsaWRlcj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH07XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHtcbiAgICAgIGNsYXNzU2V0LFxuICAgICAgaXNSYW5nZWQsXG4gICAgICBtYXhWYWx1ZSxcbiAgICAgIG1pblZhbHVlLFxuICAgICAgdmFsdWUxXG4gICAgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgdmFsdWUwID0gIWlzUmFuZ2VkICYmIG1pblZhbHVlID4gMCA/IG1pblZhbHVlIDogdGhpcy5wcm9wcy52YWx1ZTA7XG4gICAgY29uc3QgY3VyclZhbERlbHRhID0gdmFsdWUxIC0gdmFsdWUwO1xuICAgIGNvbnN0IG1heERlbHRhID0gbWF4VmFsdWUgLSBtaW5WYWx1ZTtcbiAgICBjb25zdCB3aWR0aCA9IGN1cnJWYWxEZWx0YSAvIG1heERlbHRhICogMTAwO1xuXG4gICAgY29uc3QgdjBMZWZ0ID0gKHZhbHVlMCAtIG1pblZhbHVlKSAvIG1heERlbHRhICogMTAwO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxTbGlkZXJXcmFwcGVyXG4gICAgICAgIGNsYXNzTmFtZT17Y2xhc3NuYW1lcygna2ctc2xpZGVyJywgey4uLmNsYXNzU2V0fSl9XG4gICAgICAgIGlubmVyUmVmPXt0aGlzLl9zYXZlUmVmfVxuICAgICAgICBpc1JhbmdlZD17aXNSYW5nZWR9XG4gICAgICA+XG4gICAgICAgIHt0aGlzLmNyZWF0ZVNsaWRlcih3aWR0aCwgdjBMZWZ0KX1cbiAgICAgIDwvU2xpZGVyV3JhcHBlcj5cbiAgICApO1xuICB9XG59XG4iXX0=