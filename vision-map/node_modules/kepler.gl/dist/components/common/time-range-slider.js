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

var _class, _temp, _initialiseProps;

var _templateObject = (0, _taggedTemplateLiteral3.default)(['\n  margin-top: ', ';\n  align-items: flex-end;\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n'], ['\n  margin-top: ', ';\n  align-items: flex-end;\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n']),
    _templateObject2 = (0, _taggedTemplateLiteral3.default)(['\n  display: flex;\n  height: ', ';\n  align-items: center;\n  font-size: 11px;\n  justify-content: ', ';\n  color: ', ';\n\n  .horizontal-bar {\n    padding: 0 12px;\n  }\n\n  .time-value {\n    display: flex;\n    flex-direction: ', ';\n    align-items: flex-start;\n  }\n\n  .time-value:last-child {\n    align-items: flex-end;\n  }\n'], ['\n  display: flex;\n  height: ', ';\n  align-items: center;\n  font-size: 11px;\n  justify-content: ', ';\n  color: ', ';\n\n  .horizontal-bar {\n    padding: 0 12px;\n  }\n\n  .time-value {\n    display: flex;\n    flex-direction: ', ';\n    align-items: flex-start;\n  }\n\n  .time-value:last-child {\n    align-items: flex-end;\n  }\n']),
    _templateObject3 = (0, _taggedTemplateLiteral3.default)(['\n  margin-bottom: 12px;\n  margin-right: 42px;\n\n  &.disabled {\n    opacity: 0.4;\n    pointer-events: none;\n  }\n'], ['\n  margin-bottom: 12px;\n  margin-right: 42px;\n\n  &.disabled {\n    opacity: 0.4;\n    pointer-events: none;\n  }\n']),
    _templateObject4 = (0, _taggedTemplateLiteral3.default)(['\n  svg {\n    margin: 0 6px;\n  }\n'], ['\n  svg {\n    margin: 0 6px;\n  }\n']); // Copyright (c) 2018 Uber Technologies, Inc.
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

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _window = require('global/window');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _lodash = require('lodash.throttle');

var _lodash2 = _interopRequireDefault(_lodash);

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _reselect = require('reselect');

var _icons = require('./icons');

var _styledComponents3 = require('./styled-components');

var _filterUtils = require('../../utils/filter-utils');

var _rangeSlider = require('./range-slider');

var _rangeSlider2 = _interopRequireDefault(_rangeSlider);

var _timeSliderMarker = require('./time-slider-marker');

var _timeSliderMarker2 = _interopRequireDefault(_timeSliderMarker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultTimeFormat = function defaultTimeFormat(val) {
  return _moment2.default.utc(val).format('MM/DD/YY hh:mma');
};
var animationControlWidth = 140;

var StyledSliderContainer = _styledComponents2.default.div(_templateObject, function (props) {
  return props.isEnlarged ? '12px' : '0px';
});

var TimeRangeSlider = (_temp = _class = function (_Component) {
  (0, _inherits3.default)(TimeRangeSlider, _Component);

  function TimeRangeSlider(props) {
    (0, _classCallCheck3.default)(this, TimeRangeSlider);

    var _this = (0, _possibleConstructorReturn3.default)(this, (TimeRangeSlider.__proto__ || Object.getPrototypeOf(TimeRangeSlider)).call(this, props));

    _initialiseProps.call(_this);

    _this.state = {
      isAnimating: false,
      width: 288
    };
    _this._animation = null;
    _this._sliderThrottle = (0, _lodash2.default)(function () {
      var _this$props;

      return (_this$props = _this.props).onChange.apply(_this$props, arguments);
    }, 20);
    return _this;
  }

  (0, _createClass3.default)(TimeRangeSlider, [{
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      if (!this._animation && this.state.isAnimating) {
        this._animation = (0, _window.requestAnimationFrame)(this._nextFrame);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          domain = _props.domain,
          value = _props.value,
          isEnlarged = _props.isEnlarged;
      var isAnimating = this.state.isAnimating;


      return _react2.default.createElement(
        'div',
        { className: 'time-range-slider' },
        _react2.default.createElement(TimeTitle, {
          timeFormat: this.titleFormatter(this.props),
          value: value,
          isEnlarged: isEnlarged
        }),
        _react2.default.createElement(
          StyledSliderContainer,
          {
            className: 'time-range-slider__container',
            isEnlarged: isEnlarged },
          isEnlarged ? _react2.default.createElement(AnimationControls, {
            isAnimatable: this.props.isAnimatable,
            isEnlarged: isEnlarged,
            isAnimating: isAnimating,
            pauseAnimation: this._pauseAnimation,
            resetAnimation: this._resetAnimation,
            startAnimation: this._startAnimation
          }) : null,
          _react2.default.createElement(
            'div',
            { style: { width: isEnlarged ? 'calc(100% - ' + animationControlWidth + 'px)' : '100%' } },
            _react2.default.createElement(_rangeSlider2.default, {
              range: domain,
              value0: value[0],
              value1: value[1],
              histogram: this.props.histogram,
              lineChart: this.props.lineChart,
              plotType: this.props.plotType,
              isEnlarged: isEnlarged,
              showInput: false,
              step: this.props.step,
              onChange: this._sliderUpdate,
              xAxis: _timeSliderMarker2.default
            })
          )
        )
      );
    }
  }]);
  return TimeRangeSlider;
}(_react.Component), _class.propTypes = {
  onChange: _propTypes2.default.func.isRequired,
  domain: _propTypes2.default.arrayOf(_propTypes2.default.number).isRequired,
  value: _propTypes2.default.arrayOf(_propTypes2.default.number).isRequired,
  step: _propTypes2.default.number.isRequired,
  plotType: _propTypes2.default.string,
  histogram: _propTypes2.default.arrayOf(_propTypes2.default.any),
  lineChart: _propTypes2.default.object,
  toggleAnimation: _propTypes2.default.func.isRequired,
  isAnimatable: _propTypes2.default.bool,
  isEnlarged: _propTypes2.default.bool,
  speed: _propTypes2.default.number
}, _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this.domainSelector = function (props) {
    return props.domain;
  };

  this.titleFormatter = (0, _reselect.createSelector)(this.domainSelector, function (domain) {
    return (0, _filterUtils.getTimeWidgetTitleFormatter)(domain);
  });

  this._sliderUpdate = function (args) {
    _this2._sliderThrottle.cancel();
    _this2._sliderThrottle(args);
  };

  this._resetAnimation = function () {
    var _props2 = _this2.props,
        domain = _props2.domain,
        value = _props2.value;

    var value0 = domain[0];
    var value1 = value0 + value[1] - value[0];
    _this2.props.onChange([value0, value1]);
  };

  this._startAnimation = function () {
    _this2._pauseAnimation();
    _this2.props.toggleAnimation();
    _this2.setState({ isAnimating: true });
  };

  this._pauseAnimation = function () {
    if (_this2._animation) {
      (0, _window.cancelAnimationFrame)(_this2._animation);
      _this2.props.toggleAnimation();
      _this2._animation = null;
    }
    _this2.setState({ isAnimating: false });
  };

  this._nextFrame = function () {
    _this2._animation = null;

    var _props3 = _this2.props,
        domain = _props3.domain,
        value = _props3.value;

    var speed = (domain[1] - domain[0]) / _filterUtils.BASE_SPEED * _this2.props.speed;

    // loop when reaches the end
    var value0 = value[1] + speed > domain[1] ? domain[0] : value[0] + speed;
    var value1 = value0 + value[1] - value[0];
    _this2.props.onChange([value0, value1]);
  };
}, _temp);
exports.default = TimeRangeSlider;


var TimeValueWrapper = _styledComponents2.default.div(_templateObject2, function (props) {
  return props.theme.secondaryInputHeight;
}, function (props) {
  return props.isEnlarged ? 'center' : 'space-between';
}, function (props) {
  return props.theme.labelColor;
}, function (props) {
  return props.isEnlarged ? 'row' : 'column';
});

var TimeTitle = function TimeTitle(_ref) {
  var value = _ref.value,
      isEnlarged = _ref.isEnlarged,
      _ref$timeFormat = _ref.timeFormat,
      timeFormat = _ref$timeFormat === undefined ? defaultTimeFormat : _ref$timeFormat;
  return _react2.default.createElement(
    TimeValueWrapper,
    { isEnlarged: isEnlarged },
    _react2.default.createElement(TimeValue, { key: 0, value: _moment2.default.utc(value[0]).format(timeFormat), split: !isEnlarged }),
    isEnlarged ? _react2.default.createElement(
      'div',
      { className: 'horizontal-bar' },
      _react2.default.createElement(_icons.Minus, { height: '12px' })
    ) : null,
    _react2.default.createElement(TimeValue, { key: 1, value: _moment2.default.utc(value[1]).format(timeFormat), split: !isEnlarged })
  );
};

var TimeValue = function TimeValue(_ref2) {
  var value = _ref2.value,
      split = _ref2.split;
  return (
    // render two lines if not enlarged
    _react2.default.createElement(
      'div',
      { className: 'time-value' },
      split ? value.split(' ').map(function (v, i) {
        return _react2.default.createElement(
          'div',
          { key: i },
          i === 0 ? _react2.default.createElement(
            _styledComponents3.SelectText,
            null,
            v
          ) : _react2.default.createElement(
            _styledComponents3.SelectTextBold,
            null,
            v
          )
        );
      }) : _react2.default.createElement(
        _styledComponents3.SelectTextBold,
        null,
        value
      )
    )
  );
};

var StyledAnimationControls = _styledComponents2.default.div(_templateObject3);

var IconButton = _styledComponents3.Button.extend(_templateObject4);

var AnimationControls = function AnimationControls(_ref3) {
  var isAnimatable = _ref3.isAnimatable,
      isAnimating = _ref3.isAnimating,
      pauseAnimation = _ref3.pauseAnimation,
      resetAnimation = _ref3.resetAnimation,
      startAnimation = _ref3.startAnimation;
  return _react2.default.createElement(
    StyledAnimationControls,
    {
      className: (0, _classnames2.default)('time-range-slider__control', { disabled: !isAnimatable })
    },
    _react2.default.createElement(
      _styledComponents3.ButtonGroup,
      null,
      _react2.default.createElement(
        IconButton,
        { className: 'playback-control-button',
          onClick: resetAnimation, secondary: true },
        _react2.default.createElement(_icons.Reset, { height: '12px' })
      ),
      _react2.default.createElement(
        IconButton,
        { className: (0, _classnames2.default)('playback-control-button', { active: isAnimating }),
          onClick: isAnimating ? pauseAnimation : startAnimation, secondary: true },
        isAnimating ? _react2.default.createElement(_icons.Pause, { height: '12px' }) : _react2.default.createElement(_icons.Play, { height: '12px' })
      )
    )
  );
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2NvbW1vbi90aW1lLXJhbmdlLXNsaWRlci5qcyJdLCJuYW1lcyI6WyJkZWZhdWx0VGltZUZvcm1hdCIsIm1vbWVudCIsInV0YyIsInZhbCIsImZvcm1hdCIsImFuaW1hdGlvbkNvbnRyb2xXaWR0aCIsIlN0eWxlZFNsaWRlckNvbnRhaW5lciIsInN0eWxlZCIsImRpdiIsInByb3BzIiwiaXNFbmxhcmdlZCIsIlRpbWVSYW5nZVNsaWRlciIsInN0YXRlIiwiaXNBbmltYXRpbmciLCJ3aWR0aCIsIl9hbmltYXRpb24iLCJfc2xpZGVyVGhyb3R0bGUiLCJvbkNoYW5nZSIsIl9uZXh0RnJhbWUiLCJkb21haW4iLCJ2YWx1ZSIsInRpdGxlRm9ybWF0dGVyIiwiaXNBbmltYXRhYmxlIiwiX3BhdXNlQW5pbWF0aW9uIiwiX3Jlc2V0QW5pbWF0aW9uIiwiX3N0YXJ0QW5pbWF0aW9uIiwiaGlzdG9ncmFtIiwibGluZUNoYXJ0IiwicGxvdFR5cGUiLCJzdGVwIiwiX3NsaWRlclVwZGF0ZSIsIlRpbWVTbGlkZXJNYXJrZXIiLCJDb21wb25lbnQiLCJwcm9wVHlwZXMiLCJQcm9wVHlwZXMiLCJmdW5jIiwiaXNSZXF1aXJlZCIsImFycmF5T2YiLCJudW1iZXIiLCJzdHJpbmciLCJhbnkiLCJvYmplY3QiLCJ0b2dnbGVBbmltYXRpb24iLCJib29sIiwic3BlZWQiLCJkb21haW5TZWxlY3RvciIsImNhbmNlbCIsImFyZ3MiLCJ2YWx1ZTAiLCJ2YWx1ZTEiLCJzZXRTdGF0ZSIsIkJBU0VfU1BFRUQiLCJUaW1lVmFsdWVXcmFwcGVyIiwidGhlbWUiLCJzZWNvbmRhcnlJbnB1dEhlaWdodCIsImxhYmVsQ29sb3IiLCJUaW1lVGl0bGUiLCJ0aW1lRm9ybWF0IiwiVGltZVZhbHVlIiwic3BsaXQiLCJtYXAiLCJ2IiwiaSIsIlN0eWxlZEFuaW1hdGlvbkNvbnRyb2xzIiwiSWNvbkJ1dHRvbiIsIkJ1dHRvbiIsImV4dGVuZCIsIkFuaW1hdGlvbkNvbnRyb2xzIiwicGF1c2VBbmltYXRpb24iLCJyZXNldEFuaW1hdGlvbiIsInN0YXJ0QW5pbWF0aW9uIiwiZGlzYWJsZWQiLCJhY3RpdmUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2lKQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOzs7O0FBQ0E7Ozs7OztBQUVBLElBQU1BLG9CQUFvQixTQUFwQkEsaUJBQW9CO0FBQUEsU0FBT0MsaUJBQU9DLEdBQVAsQ0FBV0MsR0FBWCxFQUFnQkMsTUFBaEIsQ0FBdUIsaUJBQXZCLENBQVA7QUFBQSxDQUExQjtBQUNBLElBQU1DLHdCQUF3QixHQUE5Qjs7QUFFQSxJQUFNQyx3QkFBd0JDLDJCQUFPQyxHQUEvQixrQkFDVTtBQUFBLFNBQVNDLE1BQU1DLFVBQU4sR0FBbUIsTUFBbkIsR0FBNEIsS0FBckM7QUFBQSxDQURWLENBQU47O0lBUXFCQyxlOzs7QUFlbkIsMkJBQVlGLEtBQVosRUFBbUI7QUFBQTs7QUFBQSxnSkFDWEEsS0FEVzs7QUFBQTs7QUFFakIsVUFBS0csS0FBTCxHQUFhO0FBQ1hDLG1CQUFhLEtBREY7QUFFWEMsYUFBTztBQUZJLEtBQWI7QUFJQSxVQUFLQyxVQUFMLEdBQWtCLElBQWxCO0FBQ0EsVUFBS0MsZUFBTCxHQUF1QixzQkFBUztBQUFBOztBQUFBLGFBQWMscUJBQUtQLEtBQUwsRUFBV1EsUUFBWCw4QkFBZDtBQUFBLEtBQVQsRUFBc0QsRUFBdEQsQ0FBdkI7QUFQaUI7QUFRbEI7Ozs7eUNBRW9CO0FBQ25CLFVBQUksQ0FBQyxLQUFLRixVQUFOLElBQW9CLEtBQUtILEtBQUwsQ0FBV0MsV0FBbkMsRUFBZ0Q7QUFDOUMsYUFB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QVEzRCxXQUFULEVBQXRDLENBQXZCO0FBQ0UsbUJBQVNBLGNBQWN1RCxjQUFkLEdBQStCRSxjQUQxQyxFQUMwRCxlQUQxRDtBQUVHekQsc0JBQWMsOEJBQUMsWUFBRCxJQUFPLFFBQU8sTUFBZCxHQUFkLEdBQXVDLDhCQUFDLFdBQUQsSUFBTSxRQUFPLE1BQWI7QUFGMUM7QUFMRjtBQUhGLEdBUHdCO0FBQUEsQ0FBMUIiLCJmaWxlIjoidGltZS1yYW5nZS1zbGlkZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIDIwMTggVWJlciBUZWNobm9sb2dpZXMsIEluYy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4vLyBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4vLyBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4vLyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4vLyBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbi8vIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbi8vIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1Jcbi8vIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuLy8gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4vLyBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4vLyBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuLy8gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuLy8gVEhFIFNPRlRXQVJFLlxuXG5pbXBvcnQgUmVhY3QsIHtDb21wb25lbnR9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgbW9tZW50IGZyb20gJ21vbWVudCc7XG5pbXBvcnQge3JlcXVlc3RBbmltYXRpb25GcmFtZSwgY2FuY2VsQW5pbWF0aW9uRnJhbWV9IGZyb20gJ2dsb2JhbC93aW5kb3cnO1xuaW1wb3J0IGNsYXNzbmFtZXMgZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgdGhyb3R0bGUgZnJvbSAnbG9kYXNoLnRocm90dGxlJztcbmltcG9ydCBzdHlsZWQgZnJvbSAnc3R5bGVkLWNvbXBvbmVudHMnO1xuaW1wb3J0IHtjcmVhdGVTZWxlY3Rvcn0gZnJvbSAncmVzZWxlY3QnO1xuaW1wb3J0IHtQbGF5LCBSZXNldCwgUGF1c2UsIE1pbnVzfSBmcm9tICdjb21wb25lbnRzL2NvbW1vbi9pY29ucyc7XG5pbXBvcnQge1NlbGVjdFRleHRCb2xkLCBTZWxlY3RUZXh0LCBCdXR0b24sIEJ1dHRvbkdyb3VwfSBmcm9tICdjb21wb25lbnRzL2NvbW1vbi9zdHlsZWQtY29tcG9uZW50cyc7XG5pbXBvcnQge2dldFRpbWVXaWRnZXRUaXRsZUZvcm1hdHRlciwgQkFTRV9TUEVFRH0gZnJvbSAndXRpbHMvZmlsdGVyLXV0aWxzJztcbmltcG9ydCBSYW5nZVNsaWRlciBmcm9tICcuL3JhbmdlLXNsaWRlcic7XG5pbXBvcnQgVGltZVNsaWRlck1hcmtlciBmcm9tICcuL3RpbWUtc2xpZGVyLW1hcmtlcic7XG5cbmNvbnN0IGRlZmF1bHRUaW1lRm9ybWF0ID0gdmFsID0+IG1vbWVudC51dGModmFsKS5mb3JtYXQoJ01NL0REL1lZIGhoOm1tYScpO1xuY29uc3QgYW5pbWF0aW9uQ29udHJvbFdpZHRoID0gMTQwO1xuXG5jb25zdCBTdHlsZWRTbGlkZXJDb250YWluZXIgPSBzdHlsZWQuZGl2YFxuICBtYXJnaW4tdG9wOiAke3Byb3BzID0+IHByb3BzLmlzRW5sYXJnZWQgPyAnMTJweCcgOiAnMHB4J307XG4gIGFsaWduLWl0ZW1zOiBmbGV4LWVuZDtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IHJvdztcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuYDtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGltZVJhbmdlU2xpZGVyIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICBvbkNoYW5nZTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICBkb21haW46IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5udW1iZXIpLmlzUmVxdWlyZWQsXG4gICAgdmFsdWU6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5udW1iZXIpLmlzUmVxdWlyZWQsXG4gICAgc3RlcDogUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxuICAgIHBsb3RUeXBlOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGhpc3RvZ3JhbTogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLmFueSksXG4gICAgbGluZUNoYXJ0OiBQcm9wVHlwZXMub2JqZWN0LFxuICAgIHRvZ2dsZUFuaW1hdGlvbjogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICBpc0FuaW1hdGFibGU6IFByb3BUeXBlcy5ib29sLFxuICAgIGlzRW5sYXJnZWQ6IFByb3BUeXBlcy5ib29sLFxuICAgIHNwZWVkOiBQcm9wVHlwZXMubnVtYmVyXG4gIH07XG5cbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIGlzQW5pbWF0aW5nOiBmYWxzZSxcbiAgICAgIHdpZHRoOiAyODhcbiAgICB9O1xuICAgIHRoaXMuX2FuaW1hdGlvbiA9IG51bGw7XG4gICAgdGhpcy5fc2xpZGVyVGhyb3R0bGUgPSB0aHJvdHRsZSgoLi4udmFsdWUpID0+IHRoaXMucHJvcHMub25DaGFuZ2UoLi4udmFsdWUpLCAyMCk7XG4gIH1cblxuICBjb21wb25lbnREaWRVcGRhdGUoKSB7XG4gICAgaWYgKCF0aGlzLl9hbmltYXRpb24gJiYgdGhpcy5zdGF0ZS5pc0FuaW1hdGluZykge1xuICAgICAgdGhpcy5fYW5pbWF0aW9uID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMuX25leHRGcmFtZSk7XG4gICAgfVxuICB9XG5cbiAgZG9tYWluU2VsZWN0b3IgPSBwcm9wcyA9PiBwcm9wcy5kb21haW47XG4gIHRpdGxlRm9ybWF0dGVyID0gY3JlYXRlU2VsZWN0b3IodGhpcy5kb21haW5TZWxlY3RvciwgZG9tYWluID0+XG4gICAgZ2V0VGltZVdpZGdldFRpdGxlRm9ybWF0dGVyKGRvbWFpbilcbiAgKTtcblxuICBfc2xpZGVyVXBkYXRlID0gYXJncyA9PiB7XG4gICAgdGhpcy5fc2xpZGVyVGhyb3R0bGUuY2FuY2VsKCk7XG4gICAgdGhpcy5fc2xpZGVyVGhyb3R0bGUoYXJncyk7XG4gIH07XG5cbiAgX3Jlc2V0QW5pbWF0aW9uID0gKCkgPT4ge1xuICAgIGNvbnN0IHtkb21haW4sIHZhbHVlfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgdmFsdWUwID0gZG9tYWluWzBdO1xuICAgIGNvbnN0IHZhbHVlMSA9IHZhbHVlMCArIHZhbHVlWzFdIC0gdmFsdWVbMF07XG4gICAgdGhpcy5wcm9wcy5vbkNoYW5nZShbdmFsdWUwLCB2YWx1ZTFdKTtcbiAgfTtcblxuICBfc3RhcnRBbmltYXRpb24gPSAoKSA9PiB7XG4gICAgdGhpcy5fcGF1c2VBbmltYXRpb24oKTtcbiAgICB0aGlzLnByb3BzLnRvZ2dsZUFuaW1hdGlvbigpO1xuICAgIHRoaXMuc2V0U3RhdGUoe2lzQW5pbWF0aW5nOiB0cnVlfSk7XG4gIH07XG5cbiAgX3BhdXNlQW5pbWF0aW9uID0gKCkgPT4ge1xuICAgIGlmICh0aGlzLl9hbmltYXRpb24pIHtcbiAgICAgIGNhbmNlbEFuaW1hdGlvbkZyYW1lKHRoaXMuX2FuaW1hdGlvbik7XG4gICAgICB0aGlzLnByb3BzLnRvZ2dsZUFuaW1hdGlvbigpO1xuICAgICAgdGhpcy5fYW5pbWF0aW9uID0gbnVsbDtcbiAgICB9XG4gICAgdGhpcy5zZXRTdGF0ZSh7aXNBbmltYXRpbmc6IGZhbHNlfSk7XG4gIH07XG5cbiAgX25leHRGcmFtZSA9ICgpID0+IHtcbiAgICB0aGlzLl9hbmltYXRpb24gPSBudWxsO1xuXG4gICAgY29uc3Qge2RvbWFpbiwgdmFsdWV9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBzcGVlZCA9ICgoZG9tYWluWzFdIC0gZG9tYWluWzBdKSAvIEJBU0VfU1BFRUQpICogdGhpcy5wcm9wcy5zcGVlZDtcblxuICAgIC8vIGxvb3Agd2hlbiByZWFjaGVzIHRoZSBlbmRcbiAgICBjb25zdCB2YWx1ZTAgPSB2YWx1ZVsxXSArIHNwZWVkID4gZG9tYWluWzFdID8gZG9tYWluWzBdIDogdmFsdWVbMF0gKyBzcGVlZDtcbiAgICBjb25zdCB2YWx1ZTEgPSB2YWx1ZTAgKyB2YWx1ZVsxXSAtIHZhbHVlWzBdO1xuICAgIHRoaXMucHJvcHMub25DaGFuZ2UoW3ZhbHVlMCwgdmFsdWUxXSk7XG4gIH07XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHtkb21haW4sIHZhbHVlLCBpc0VubGFyZ2VkfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3Qge2lzQW5pbWF0aW5nfSA9IHRoaXMuc3RhdGU7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0aW1lLXJhbmdlLXNsaWRlclwiPlxuICAgICAgICA8VGltZVRpdGxlXG4gICAgICAgICAgdGltZUZvcm1hdD17dGhpcy50aXRsZUZvcm1hdHRlcih0aGlzLnByb3BzKX1cbiAgICAgICAgICB2YWx1ZT17dmFsdWV9XG4gICAgICAgICAgaXNFbmxhcmdlZD17aXNFbmxhcmdlZH1cbiAgICAgICAgLz5cbiAgICAgICAgPFN0eWxlZFNsaWRlckNvbnRhaW5lclxuICAgICAgICAgIGNsYXNzTmFtZT1cInRpbWUtcmFuZ2Utc2xpZGVyX19jb250YWluZXJcIlxuICAgICAgICAgIGlzRW5sYXJnZWQ9e2lzRW5sYXJnZWR9PlxuICAgICAgICAgIHtpc0VubGFyZ2VkID8gPEFuaW1hdGlvbkNvbnRyb2xzXG4gICAgICAgICAgICBpc0FuaW1hdGFibGU9e3RoaXMucHJvcHMuaXNBbmltYXRhYmxlfVxuICAgICAgICAgICAgaXNFbmxhcmdlZD17aXNFbmxhcmdlZH1cbiAgICAgICAgICAgIGlzQW5pbWF0aW5nPXtpc0FuaW1hdGluZ31cbiAgICAgICAgICAgIHBhdXNlQW5pbWF0aW9uPXt0aGlzLl9wYXVzZUFuaW1hdGlvbn1cbiAgICAgICAgICAgIHJlc2V0QW5pbWF0aW9uPXt0aGlzLl9yZXNldEFuaW1hdGlvbn1cbiAgICAgICAgICAgIHN0YXJ0QW5pbWF0aW9uPXt0aGlzLl9zdGFydEFuaW1hdGlvbn1cbiAgICAgICAgICAvPiA6IG51bGx9XG4gICAgICAgICAgPGRpdiBzdHlsZT17e3dpZHRoOiBpc0VubGFyZ2VkID8gYGNhbGMoMTAwJSAtICR7YW5pbWF0aW9uQ29udHJvbFdpZHRofXB4KWAgOiAnMTAwJSd9fT5cbiAgICAgICAgICAgIDxSYW5nZVNsaWRlclxuICAgICAgICAgICAgICByYW5nZT17ZG9tYWlufVxuICAgICAgICAgICAgICB2YWx1ZTA9e3ZhbHVlWzBdfVxuICAgICAgICAgICAgICB2YWx1ZTE9e3ZhbHVlWzFdfVxuICAgICAgICAgICAgICBoaXN0b2dyYW09e3RoaXMucHJvcHMuaGlzdG9ncmFtfVxuICAgICAgICAgICAgICBsaW5lQ2hhcnQ9e3RoaXMucHJvcHMubGluZUNoYXJ0fVxuICAgICAgICAgICAgICBwbG90VHlwZT17dGhpcy5wcm9wcy5wbG90VHlwZX1cbiAgICAgICAgICAgICAgaXNFbmxhcmdlZD17aXNFbmxhcmdlZH1cbiAgICAgICAgICAgICAgc2hvd0lucHV0PXtmYWxzZX1cbiAgICAgICAgICAgICAgc3RlcD17dGhpcy5wcm9wcy5zdGVwfVxuICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5fc2xpZGVyVXBkYXRlfVxuICAgICAgICAgICAgICB4QXhpcz17VGltZVNsaWRlck1hcmtlcn1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvU3R5bGVkU2xpZGVyQ29udGFpbmVyPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5jb25zdCBUaW1lVmFsdWVXcmFwcGVyID0gc3R5bGVkLmRpdmBcbiAgZGlzcGxheTogZmxleDtcbiAgaGVpZ2h0OiAke3Byb3BzID0+IHByb3BzLnRoZW1lLnNlY29uZGFyeUlucHV0SGVpZ2h0fTtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgZm9udC1zaXplOiAxMXB4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6ICR7cHJvcHMgPT4gcHJvcHMuaXNFbmxhcmdlZCA/ICdjZW50ZXInIDogJ3NwYWNlLWJldHdlZW4nfTtcbiAgY29sb3I6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUubGFiZWxDb2xvcn07XG5cbiAgLmhvcml6b250YWwtYmFyIHtcbiAgICBwYWRkaW5nOiAwIDEycHg7XG4gIH1cblxuICAudGltZS12YWx1ZSB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBmbGV4LWRpcmVjdGlvbjogJHtwcm9wcyA9PiBwcm9wcy5pc0VubGFyZ2VkID8gJ3JvdycgOiAnY29sdW1uJ307XG4gICAgYWxpZ24taXRlbXM6IGZsZXgtc3RhcnQ7XG4gIH1cblxuICAudGltZS12YWx1ZTpsYXN0LWNoaWxkIHtcbiAgICBhbGlnbi1pdGVtczogZmxleC1lbmQ7XG4gIH1cbmA7XG5cbmNvbnN0IFRpbWVUaXRsZSA9ICh7dmFsdWUsIGlzRW5sYXJnZWQsIHRpbWVGb3JtYXQgPSBkZWZhdWx0VGltZUZvcm1hdH0pID0+IChcbiAgPFRpbWVWYWx1ZVdyYXBwZXIgaXNFbmxhcmdlZD17aXNFbmxhcmdlZH0+XG4gICAgPFRpbWVWYWx1ZSBrZXk9ezB9IHZhbHVlPXttb21lbnQudXRjKHZhbHVlWzBdKS5mb3JtYXQodGltZUZvcm1hdCl9IHNwbGl0PXshaXNFbmxhcmdlZH0vPlxuICAgIHtpc0VubGFyZ2VkID8gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJob3Jpem9udGFsLWJhclwiPlxuICAgICAgICA8TWludXMgaGVpZ2h0PVwiMTJweFwiLz5cbiAgICAgIDwvZGl2PlxuICAgICkgOiBudWxsfVxuICAgIDxUaW1lVmFsdWUga2V5PXsxfSB2YWx1ZT17bW9tZW50LnV0Yyh2YWx1ZVsxXSkuZm9ybWF0KHRpbWVGb3JtYXQpfSBzcGxpdD17IWlzRW5sYXJnZWR9Lz5cbiAgPC9UaW1lVmFsdWVXcmFwcGVyPlxuKTtcblxuY29uc3QgVGltZVZhbHVlID0gKHt2YWx1ZSwgc3BsaXR9KSA9PiAoXG4gIC8vIHJlbmRlciB0d28gbGluZXMgaWYgbm90IGVubGFyZ2VkXG4gIDxkaXYgY2xhc3NOYW1lPVwidGltZS12YWx1ZVwiPlxuICAgIHtzcGxpdCA/IHZhbHVlLnNwbGl0KCcgJykubWFwKCh2LCBpKSA9PiAoXG4gICAgICA8ZGl2IGtleT17aX0+XG4gICAgICAgIHtpID09PSAwID8gPFNlbGVjdFRleHQ+e3Z9PC9TZWxlY3RUZXh0PiA6XG4gICAgICAgIDxTZWxlY3RUZXh0Qm9sZD57dn08L1NlbGVjdFRleHRCb2xkPn1cbiAgICAgIDwvZGl2PlxuICAgICkpIDogPFNlbGVjdFRleHRCb2xkPnt2YWx1ZX08L1NlbGVjdFRleHRCb2xkPn1cbiAgPC9kaXY+XG4pO1xuXG5jb25zdCBTdHlsZWRBbmltYXRpb25Db250cm9scyA9IHN0eWxlZC5kaXZgXG4gIG1hcmdpbi1ib3R0b206IDEycHg7XG4gIG1hcmdpbi1yaWdodDogNDJweDtcblxuICAmLmRpc2FibGVkIHtcbiAgICBvcGFjaXR5OiAwLjQ7XG4gICAgcG9pbnRlci1ldmVudHM6IG5vbmU7XG4gIH1cbmA7XG5cbmNvbnN0IEljb25CdXR0b24gPSBCdXR0b24uZXh0ZW5kYFxuICBzdmcge1xuICAgIG1hcmdpbjogMCA2cHg7XG4gIH1cbmA7XG5cbmNvbnN0IEFuaW1hdGlvbkNvbnRyb2xzID0gKHtcbiAgaXNBbmltYXRhYmxlLFxuICBpc0FuaW1hdGluZyxcbiAgcGF1c2VBbmltYXRpb24sXG4gIHJlc2V0QW5pbWF0aW9uLFxuICBzdGFydEFuaW1hdGlvblxufSkgPT4gKFxuICA8U3R5bGVkQW5pbWF0aW9uQ29udHJvbHNcbiAgICBjbGFzc05hbWU9e2NsYXNzbmFtZXMoJ3RpbWUtcmFuZ2Utc2xpZGVyX19jb250cm9sJywge2Rpc2FibGVkOiAhaXNBbmltYXRhYmxlfSl9XG4gID5cbiAgICA8QnV0dG9uR3JvdXA+XG4gICAgICA8SWNvbkJ1dHRvbiBjbGFzc05hbWU9XCJwbGF5YmFjay1jb250cm9sLWJ1dHRvblwiXG4gICAgICAgIG9uQ2xpY2s9e3Jlc2V0QW5pbWF0aW9ufSBzZWNvbmRhcnk+XG4gICAgICAgIDxSZXNldCBoZWlnaHQ9XCIxMnB4XCIvPlxuICAgICAgPC9JY29uQnV0dG9uPlxuICAgICAgPEljb25CdXR0b24gY2xhc3NOYW1lPXtjbGFzc25hbWVzKCdwbGF5YmFjay1jb250cm9sLWJ1dHRvbicsIHthY3RpdmU6IGlzQW5pbWF0aW5nfSl9XG4gICAgICAgIG9uQ2xpY2s9e2lzQW5pbWF0aW5nID8gcGF1c2VBbmltYXRpb24gOiBzdGFydEFuaW1hdGlvbn0gc2Vjb25kYXJ5PlxuICAgICAgICB7aXNBbmltYXRpbmcgPyA8UGF1c2UgaGVpZ2h0PVwiMTJweFwiLz4gOiA8UGxheSBoZWlnaHQ9XCIxMnB4XCIvPn1cbiAgICAgIDwvSWNvbkJ1dHRvbj5cbiAgICA8L0J1dHRvbkdyb3VwPlxuICA8L1N0eWxlZEFuaW1hdGlvbkNvbnRyb2xzPlxuKTtcbiJdfQ==