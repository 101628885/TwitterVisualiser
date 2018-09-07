'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

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

var _templateObject = (0, _taggedTemplateLiteral3.default)(['\n  height: 24px;\n  width: 40px;\n  padding: 4px 6px;\n  margin-left: ', 'px;\n'], ['\n  height: 24px;\n  width: 40px;\n  padding: 4px 6px;\n  margin-left: ', 'px;\n']),
    _templateObject2 = (0, _taggedTemplateLiteral3.default)(['\n  display: flex;\n  position: relative;\n'], ['\n  display: flex;\n  position: relative;\n']),
    _templateObject3 = (0, _taggedTemplateLiteral3.default)(['\n  margin-top: 6px;\n  display: flex;\n  justify-content: space-between;\n'], ['\n  margin-top: 6px;\n  display: flex;\n  justify-content: space-between;\n']); // Copyright (c) 2018 Uber Technologies, Inc.
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

var _rangePlot = require('./range-plot');

var _rangePlot2 = _interopRequireDefault(_rangePlot);

var _slider = require('./slider/slider');

var _slider2 = _interopRequireDefault(_slider);

var _styledComponents3 = require('./styled-components');

var _dataUtils = require('../../utils/data-utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SliderInput = _styledComponents3.Input.extend(_templateObject, function (props) {
  return props.flush ? 0 : 24;
});

var SliderWrapper = _styledComponents2.default.div(_templateObject2);

var RangeInputWrapper = _styledComponents2.default.div(_templateObject3);

var RangeSlider = (_temp2 = _class = function (_Component) {
  (0, _inherits3.default)(RangeSlider, _Component);

  function RangeSlider() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, RangeSlider);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = RangeSlider.__proto__ || Object.getPrototypeOf(RangeSlider)).call.apply(_ref, [this].concat(args))), _this), _this.state = { value0: 0, value1: 1, width: 288 }, _this._setValueFromProps = function (props) {
      var value0 = props.value0,
          value1 = props.value1;


      if (!isNaN(value0) && !isNaN(value1)) {
        _this.setState({ value0: value0, value1: value1 });
      }
    }, _this._isVal0InRange = function (val) {
      var _this$props = _this.props,
          value1 = _this$props.value1,
          range = _this$props.range;


      return Boolean(val >= range[0] && val <= value1);
    }, _this._isVal1InRange = function (val) {
      var _this$props2 = _this.props,
          range = _this$props2.range,
          value0 = _this$props2.value0;


      return Boolean(val <= range[1] && val >= value0);
    }, _this._roundValToStep = function (val) {
      var _this$props3 = _this.props,
          range = _this$props3.range,
          step = _this$props3.step;


      return (0, _dataUtils.roundValToStep)(range[0], step, val);
    }, _this._setRangeVal1 = function (val) {
      var _this$props4 = _this.props,
          value0 = _this$props4.value0,
          onChange = _this$props4.onChange;

      val = Number(val);

      if (_this._isVal1InRange(val)) {
        onChange([value0, _this._roundValToStep(val)]);
        return true;
      }
      return false;
    }, _this._setRangeVal0 = function (val) {
      var _this$props5 = _this.props,
          value1 = _this$props5.value1,
          onChange = _this$props5.onChange;

      val = Number(val);

      if (_this._isVal0InRange(val)) {
        onChange([_this._roundValToStep(val), value1]);
        return true;
      }
      return false;
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(RangeSlider, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this._setValueFromProps(this.props);
      this._resize();
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      this._setValueFromProps(nextProps);
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      this._resize();
    }
  }, {
    key: '_resize',
    value: function _resize() {
      var width = this.sliderContainer.offsetWidth;
      if (width !== this.state.width) {
        this.setState({ width: width });
      }
    }
  }, {
    key: '_renderInput',
    value: function _renderInput(key) {
      var _this2 = this;

      var setRange = key === 'value0' ? this._setRangeVal0 : this._setRangeVal1;
      var update = function update(e) {
        if (!setRange(e.target.value)) {
          _this2.setState((0, _defineProperty3.default)({}, key, _this2.state[key]));
        }
      };

      return _react2.default.createElement(SliderInput, {
        className: 'kg-range-slider__input',
        type: 'number',
        innerRef: function innerRef(comp) {
          _this2['input-' + key] = comp;
        },
        id: 'filter-' + key,
        value: this.state[key],
        onChange: function onChange(e) {
          _this2.setState((0, _defineProperty3.default)({}, key, e.target.value));
        },
        onKeyPress: function onKeyPress(e) {
          if (e.key === 'Enter') {
            update(e);
            _this2['input-' + key].blur();
          }
        },
        onBlur: update,
        flush: key === 'value0',
        secondary: this.props.inputTheme === 'secondary'
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var _props = this.props,
          isRanged = _props.isRanged,
          showInput = _props.showInput,
          histogram = _props.histogram,
          lineChart = _props.lineChart,
          plotType = _props.plotType,
          isEnlarged = _props.isEnlarged,
          range = _props.range,
          onChange = _props.onChange,
          value0 = _props.value0,
          value1 = _props.value1,
          sliderHandleWidth = _props.sliderHandleWidth;


      var height = this.props.xAxis ? '24px' : '16px';
      var width = this.state.width;

      var plotWidth = width - sliderHandleWidth;

      return _react2.default.createElement(
        'div',
        {
          className: 'kg-range-slider', style: { width: '100%', padding: '0 ' + sliderHandleWidth / 2 + 'px' },
          ref: function ref(comp) {
            _this3.sliderContainer = comp;
          } },
        histogram && histogram.length ? _react2.default.createElement(_rangePlot2.default, {
          histogram: histogram,
          lineChart: lineChart,
          plotType: plotType,
          isEnlarged: isEnlarged,
          onBrush: function onBrush(val0, val1) {
            onChange([_this3._roundValToStep(val0), _this3._roundValToStep(val1)]);
          },
          range: range,
          value: [value0, value1],
          width: plotWidth
        }) : null,
        _react2.default.createElement(
          SliderWrapper,
          {
            style: { height: height },
            className: 'kg-range-slider__slider' },
          this.props.xAxis ? _react2.default.createElement(this.props.xAxis, { width: plotWidth, domain: range }) : null,
          _react2.default.createElement(_slider2.default, {
            showValues: false,
            isRanged: isRanged,
            minValue: range[0],
            maxValue: range[1],
            value0: value0,
            value1: value1,
            handleWidth: sliderHandleWidth,
            onSlider0Change: this._setRangeVal0,
            onSlider1Change: this._setRangeVal1,
            onSliderBarChange: function onSliderBarChange(val0, val1) {
              if (_this3._isVal1InRange(val1) && _this3._isVal0InRange(val0)) {
                onChange([_this3._roundValToStep(val0), _this3._roundValToStep(val1)]);
              }
            },
            enableBarDrag: true
          }),
          !isRanged && showInput ? this._renderInput('value1') : null
        ),
        isRanged && showInput ? _react2.default.createElement(
          RangeInputWrapper,
          { className: 'range-slider__input-group' },
          this._renderInput('value0'),
          this._renderInput('value1')
        ) : null
      );
    }
  }]);
  return RangeSlider;
}(_react.Component), _class.propTypes = {
  range: _propTypes2.default.arrayOf(_propTypes2.default.number).isRequired,
  value0: _propTypes2.default.number.isRequired,
  value1: _propTypes2.default.number.isRequired,
  onChange: _propTypes2.default.func.isRequired,
  histogram: _propTypes2.default.arrayOf(_propTypes2.default.any),
  isRanged: _propTypes2.default.bool,
  isEnlarged: _propTypes2.default.bool,
  showInput: _propTypes2.default.bool,
  inputTheme: _propTypes2.default.string,
  step: _propTypes2.default.number,
  sliderHandleWidth: _propTypes2.default.number,
  xAxis: _propTypes2.default.func
}, _class.defaultProps = {
  isEnlarged: false,
  isRanged: true,
  showInput: true,
  sliderHandleWidth: 12,
  onChange: function onChange() {}
}, _temp2);
exports.default = RangeSlider;
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2NvbW1vbi9yYW5nZS1zbGlkZXIuanMiXSwibmFtZXMiOlsiU2xpZGVySW5wdXQiLCJJbnB1dCIsImV4dGVuZCIsInByb3BzIiwiZmx1c2giLCJTbGlkZXJXcmFwcGVyIiwic3R5bGVkIiwiZGl2IiwiUmFuZ2VJbnB1dFdyYXBwZXIiLCJSYW5nZVNsaWRlciIsInN0YXRlIiwidmFsdWUwIiwidmFsdWUxIiwid2lkdGgiLCJfc2V0VmFsdWVGcm9tUHJvcHMiLCJpc05hTiIsInNldFN0YXRlIiwiX2lzVmFsMEluUmFuZ2UiLCJyYW5nZSIsIkJvb2xlYW4iLCJ2YWwiLCJfaXNWYWwxSW5SYW5nZSIsIl9yb3VuZFZhbFRvU3RlcCIsInN0ZXAiLCJfc2V0UmFuZ2VWYWwxIiwib25DaGFuZ2UiLCJOdW1iZXIiLCJfc2V0UmFuZ2VWYWwwIiwiX3Jlc2l6ZSIsIm5leHRQcm9wcyIsInNsaWRlckNvbnRhaW5lciIsIm9mZnNldFdpZHRoIiwia2V5Iiwic2V0UmFuZ2UiLCJ1cGRhdGUiLCJlIiwidGFyZ2V0IiwidmFsdWUiLCJjb21wIiwiYmx1ciIsImlucHV0VGhlbWUiLCJpc1JhbmdlZCIsInNob3dJbnB1dCIsImhpc3RvZ3JhbSIsImxpbmVDaGFydCIsInBsb3RUeXBlIiwiaXNFbmxhcmdlZCIsInNsaWRlckhhbmRsZVdpZHRoIiwiaGVpZ2h0IiwieEF4aXMiLCJwbG90V2lkdGgiLCJwYWRkaW5nIiwibGVuZ3RoIiwidmFsMCIsInZhbDEiLCJfcmVuZGVySW5wdXQiLCJDb21wb25lbnQiLCJwcm9wVHlwZXMiLCJQcm9wVHlwZXMiLCJhcnJheU9mIiwibnVtYmVyIiwiaXNSZXF1aXJlZCIsImZ1bmMiLCJhbnkiLCJib29sIiwic3RyaW5nIiwiZGVmYXVsdFByb3BzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzsrTkFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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WUFBTCxDQUFrQixRQUFsQixDQURzQjtBQUV0QixlQUFLQSxZQUFMLENBQWtCLFFBQWxCO0FBRnNCLFNBQXhCLEdBR3NCO0FBbkR6QixPQURGO0FBdUREOzs7RUF6TXNDQyxnQixVQUNoQ0MsUyxHQUFZO0FBQ2pCdkMsU0FBT3dDLG9CQUFVQyxPQUFWLENBQWtCRCxvQkFBVUUsTUFBNUIsRUFBb0NDLFVBRDFCO0FBRWpCbEQsVUFBUStDLG9CQUFVRSxNQUFWLENBQWlCQyxVQUZSO0FBR2pCakQsVUFBUThDLG9CQUFVRSxNQUFWLENBQWlCQyxVQUhSO0FBSWpCcEMsWUFBVWlDLG9CQUFVSSxJQUFWLENBQWVELFVBSlI7QUFLakJsQixhQUFXZSxvQkFBVUMsT0FBVixDQUFrQkQsb0JBQVVLLEdBQTVCLENBTE07QUFNakJ0QixZQUFVaUIsb0JBQVVNLElBTkg7QUFPakJsQixjQUFZWSxvQkFBVU0sSUFQTDtBQVFqQnRCLGFBQVdnQixvQkFBVU0sSUFSSjtBQVNqQnhCLGNBQVlrQixvQkFBVU8sTUFUTDtBQVVqQjFDLFFBQU1tQyxvQkFBVUUsTUFWQztBQVdqQmIscUJBQW1CVyxvQkFBVUUsTUFYWjtBQVlqQlgsU0FBT1Msb0JBQVVJO0FBWkEsQyxTQWVaSSxZLEdBQWU7QUFDcEJwQixjQUFZLEtBRFE7QUFFcEJMLFlBQVUsSUFGVTtBQUdwQkMsYUFBVyxJQUhTO0FBSXBCSyxxQkFBbUIsRUFKQztBQUtwQnRCLFlBQVUsb0JBQU0sQ0FBRTtBQUxFLEM7a0JBaEJIaEIsVztBQTBNcEIiLCJmaWxlIjoicmFuZ2Utc2xpZGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSAyMDE4IFViZXIgVGVjaG5vbG9naWVzLCBJbmMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuLy8gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuLy8gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuLy8gdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuLy8gY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4vLyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4vLyBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4vLyBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbi8vIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuLy8gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuLy8gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbi8vIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbi8vIFRIRSBTT0ZUV0FSRS5cblxuaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50fSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHN0eWxlZCBmcm9tICdzdHlsZWQtY29tcG9uZW50cyc7XG5cbmltcG9ydCBSYW5nZVBsb3QgZnJvbSAnLi9yYW5nZS1wbG90JztcbmltcG9ydCBTbGlkZXIgZnJvbSAnY29tcG9uZW50cy9jb21tb24vc2xpZGVyL3NsaWRlcic7XG5pbXBvcnQge0lucHV0fSBmcm9tICdjb21wb25lbnRzL2NvbW1vbi9zdHlsZWQtY29tcG9uZW50cyc7XG5cbmltcG9ydCB7cm91bmRWYWxUb1N0ZXB9IGZyb20gJ3V0aWxzL2RhdGEtdXRpbHMnO1xuXG5jb25zdCBTbGlkZXJJbnB1dCA9IElucHV0LmV4dGVuZGBcbiAgaGVpZ2h0OiAyNHB4O1xuICB3aWR0aDogNDBweDtcbiAgcGFkZGluZzogNHB4IDZweDtcbiAgbWFyZ2luLWxlZnQ6ICR7cHJvcHMgPT4gcHJvcHMuZmx1c2ggPyAwIDogMjR9cHg7XG5gO1xuXG5jb25zdCBTbGlkZXJXcmFwcGVyID0gc3R5bGVkLmRpdmBcbiAgZGlzcGxheTogZmxleDtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuYDtcblxuY29uc3QgUmFuZ2VJbnB1dFdyYXBwZXIgPXN0eWxlZC5kaXZgXG4gIG1hcmdpbi10b3A6IDZweDtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuYDtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmFuZ2VTbGlkZXIgZXh0ZW5kcyBDb21wb25lbnQge1xuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIHJhbmdlOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMubnVtYmVyKS5pc1JlcXVpcmVkLFxuICAgIHZhbHVlMDogUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxuICAgIHZhbHVlMTogUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxuICAgIG9uQ2hhbmdlOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIGhpc3RvZ3JhbTogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLmFueSksXG4gICAgaXNSYW5nZWQ6IFByb3BUeXBlcy5ib29sLFxuICAgIGlzRW5sYXJnZWQ6IFByb3BUeXBlcy5ib29sLFxuICAgIHNob3dJbnB1dDogUHJvcFR5cGVzLmJvb2wsXG4gICAgaW5wdXRUaGVtZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBzdGVwOiBQcm9wVHlwZXMubnVtYmVyLFxuICAgIHNsaWRlckhhbmRsZVdpZHRoOiBQcm9wVHlwZXMubnVtYmVyLFxuICAgIHhBeGlzOiBQcm9wVHlwZXMuZnVuY1xuICB9O1xuXG4gIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgaXNFbmxhcmdlZDogZmFsc2UsXG4gICAgaXNSYW5nZWQ6IHRydWUsXG4gICAgc2hvd0lucHV0OiB0cnVlLFxuICAgIHNsaWRlckhhbmRsZVdpZHRoOiAxMixcbiAgICBvbkNoYW5nZTogKCkgPT4ge31cbiAgfTtcblxuICBzdGF0ZSA9IHt2YWx1ZTA6IDAsIHZhbHVlMTogMSwgd2lkdGg6IDI4OH07XG5cbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgdGhpcy5fc2V0VmFsdWVGcm9tUHJvcHModGhpcy5wcm9wcyk7XG4gICAgdGhpcy5fcmVzaXplKCk7XG4gIH1cblxuICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRQcm9wcykge1xuICAgIHRoaXMuX3NldFZhbHVlRnJvbVByb3BzKG5leHRQcm9wcyk7XG4gIH1cblxuICBjb21wb25lbnREaWRVcGRhdGUoKSB7XG4gICAgdGhpcy5fcmVzaXplKCk7XG4gIH1cblxuICBfc2V0VmFsdWVGcm9tUHJvcHMgPSBwcm9wcyA9PiB7XG4gICAgY29uc3Qge3ZhbHVlMCwgdmFsdWUxfSA9IHByb3BzO1xuXG4gICAgaWYgKCFpc05hTih2YWx1ZTApICYmICFpc05hTih2YWx1ZTEpKSB7XG4gICAgICB0aGlzLnNldFN0YXRlKHt2YWx1ZTAsIHZhbHVlMX0pO1xuICAgIH1cbiAgfTtcblxuICBfaXNWYWwwSW5SYW5nZSA9IHZhbCA9PiB7XG4gICAgY29uc3Qge3ZhbHVlMSwgcmFuZ2V9ID0gdGhpcy5wcm9wcztcblxuICAgIHJldHVybiBCb29sZWFuKHZhbCA+PSByYW5nZVswXSAmJiB2YWwgPD0gdmFsdWUxKTtcbiAgfTtcblxuICBfaXNWYWwxSW5SYW5nZSA9IHZhbCA9PiB7XG4gICAgY29uc3Qge3JhbmdlLCB2YWx1ZTB9ID0gdGhpcy5wcm9wcztcblxuICAgIHJldHVybiBCb29sZWFuKHZhbCA8PSByYW5nZVsxXSAmJiB2YWwgPj0gdmFsdWUwKTtcbiAgfTtcblxuICBfcm91bmRWYWxUb1N0ZXAgPSB2YWwgPT4ge1xuICAgIGNvbnN0IHtyYW5nZSwgc3RlcH0gPSB0aGlzLnByb3BzO1xuXG4gICAgcmV0dXJuIHJvdW5kVmFsVG9TdGVwKHJhbmdlWzBdLCBzdGVwLCB2YWwpO1xuICB9O1xuXG4gIF9zZXRSYW5nZVZhbDEgPSB2YWwgPT4ge1xuICAgIGNvbnN0IHt2YWx1ZTAsIG9uQ2hhbmdlfSA9IHRoaXMucHJvcHM7XG4gICAgdmFsID0gTnVtYmVyKHZhbCk7XG5cbiAgICBpZiAodGhpcy5faXNWYWwxSW5SYW5nZSh2YWwpKSB7XG4gICAgICBvbkNoYW5nZShbdmFsdWUwLCB0aGlzLl9yb3VuZFZhbFRvU3RlcCh2YWwpXSk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9O1xuXG4gIF9zZXRSYW5nZVZhbDAgPSB2YWwgPT4ge1xuICAgIGNvbnN0IHt2YWx1ZTEsIG9uQ2hhbmdlfSA9IHRoaXMucHJvcHM7XG4gICAgdmFsID0gTnVtYmVyKHZhbCk7XG5cbiAgICBpZiAodGhpcy5faXNWYWwwSW5SYW5nZSh2YWwpKSB7XG4gICAgICBvbkNoYW5nZShbdGhpcy5fcm91bmRWYWxUb1N0ZXAodmFsKSwgdmFsdWUxXSk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9O1xuXG4gIF9yZXNpemUoKSB7XG4gICAgY29uc3Qgd2lkdGggPSB0aGlzLnNsaWRlckNvbnRhaW5lci5vZmZzZXRXaWR0aDtcbiAgICBpZiAod2lkdGggIT09IHRoaXMuc3RhdGUud2lkdGgpIHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe3dpZHRofSk7XG4gICAgfVxuICB9XG5cbiAgX3JlbmRlcklucHV0KGtleSkge1xuICAgIGNvbnN0IHNldFJhbmdlID0ga2V5ID09PSAndmFsdWUwJyA/IHRoaXMuX3NldFJhbmdlVmFsMCA6IHRoaXMuX3NldFJhbmdlVmFsMTtcbiAgICBjb25zdCB1cGRhdGUgPSBlID0+IHtcbiAgICAgIGlmICghc2V0UmFuZ2UoZS50YXJnZXQudmFsdWUpKSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1trZXldOiB0aGlzLnN0YXRlW2tleV19KTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxTbGlkZXJJbnB1dFxuICAgICAgICBjbGFzc05hbWU9XCJrZy1yYW5nZS1zbGlkZXJfX2lucHV0XCJcbiAgICAgICAgdHlwZT1cIm51bWJlclwiXG4gICAgICAgIGlubmVyUmVmPXtjb21wID0+IHtcbiAgICAgICAgICB0aGlzW2BpbnB1dC0ke2tleX1gXSA9IGNvbXA7XG4gICAgICAgIH19XG4gICAgICAgIGlkPXtgZmlsdGVyLSR7a2V5fWB9XG4gICAgICAgIHZhbHVlPXt0aGlzLnN0YXRlW2tleV19XG4gICAgICAgIG9uQ2hhbmdlPXtlID0+IHtcbiAgICAgICAgICB0aGlzLnNldFN0YXRlKHtba2V5XTogZS50YXJnZXQudmFsdWV9KTtcbiAgICAgICAgfX1cbiAgICAgICAgb25LZXlQcmVzcz17ZSA9PiB7XG4gICAgICAgICAgaWYgKGUua2V5ID09PSAnRW50ZXInKSB7XG4gICAgICAgICAgICB1cGRhdGUoZSk7XG4gICAgICAgICAgICB0aGlzW2BpbnB1dC0ke2tleX1gXS5ibHVyKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9fVxuICAgICAgICBvbkJsdXI9e3VwZGF0ZX1cbiAgICAgICAgZmx1c2g9e2tleSA9PT0gJ3ZhbHVlMCd9XG4gICAgICAgIHNlY29uZGFyeT17dGhpcy5wcm9wcy5pbnB1dFRoZW1lID09PSAnc2Vjb25kYXJ5J31cbiAgICAgIC8+XG4gICAgKTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7XG4gICAgICBpc1JhbmdlZCxcbiAgICAgIHNob3dJbnB1dCxcbiAgICAgIGhpc3RvZ3JhbSxcbiAgICAgIGxpbmVDaGFydCxcbiAgICAgIHBsb3RUeXBlLFxuICAgICAgaXNFbmxhcmdlZCxcbiAgICAgIHJhbmdlLFxuICAgICAgb25DaGFuZ2UsXG4gICAgICB2YWx1ZTAsXG4gICAgICB2YWx1ZTEsXG4gICAgICBzbGlkZXJIYW5kbGVXaWR0aFxuICAgIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgY29uc3QgaGVpZ2h0ID0gdGhpcy5wcm9wcy54QXhpcyA/ICcyNHB4JyA6ICcxNnB4JztcbiAgICBjb25zdCB7d2lkdGh9ID0gdGhpcy5zdGF0ZTtcbiAgICBjb25zdCBwbG90V2lkdGggPSAgd2lkdGggLSBzbGlkZXJIYW5kbGVXaWR0aDtcblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2XG4gICAgICAgIGNsYXNzTmFtZT1cImtnLXJhbmdlLXNsaWRlclwiIHN0eWxlPXt7d2lkdGg6ICcxMDAlJywgcGFkZGluZzogYDAgJHtzbGlkZXJIYW5kbGVXaWR0aCAvIDJ9cHhgfX1cbiAgICAgICAgcmVmPXtjb21wID0+IHtcbiAgICAgICAgICB0aGlzLnNsaWRlckNvbnRhaW5lciA9IGNvbXA7XG4gICAgICAgIH19PlxuICAgICAgICB7aGlzdG9ncmFtICYmIGhpc3RvZ3JhbS5sZW5ndGggPyAoXG4gICAgICAgICAgPFJhbmdlUGxvdFxuICAgICAgICAgICAgaGlzdG9ncmFtPXtoaXN0b2dyYW19XG4gICAgICAgICAgICBsaW5lQ2hhcnQ9e2xpbmVDaGFydH1cbiAgICAgICAgICAgIHBsb3RUeXBlPXtwbG90VHlwZX1cbiAgICAgICAgICAgIGlzRW5sYXJnZWQ9e2lzRW5sYXJnZWR9XG4gICAgICAgICAgICBvbkJydXNoPXsodmFsMCwgdmFsMSkgPT4ge1xuICAgICAgICAgICAgICBvbkNoYW5nZShbXG4gICAgICAgICAgICAgICAgdGhpcy5fcm91bmRWYWxUb1N0ZXAodmFsMCksXG4gICAgICAgICAgICAgICAgdGhpcy5fcm91bmRWYWxUb1N0ZXAodmFsMSlcbiAgICAgICAgICAgICAgXSk7XG4gICAgICAgICAgICB9fVxuICAgICAgICAgICAgcmFuZ2U9e3JhbmdlfVxuICAgICAgICAgICAgdmFsdWU9e1t2YWx1ZTAsIHZhbHVlMV19XG4gICAgICAgICAgICB3aWR0aD17cGxvdFdpZHRofVxuICAgICAgICAgIC8+XG4gICAgICAgICkgOiBudWxsfVxuICAgICAgICA8U2xpZGVyV3JhcHBlclxuICAgICAgICAgIHN0eWxlPXt7aGVpZ2h0fX1cbiAgICAgICAgICBjbGFzc05hbWU9XCJrZy1yYW5nZS1zbGlkZXJfX3NsaWRlclwiPlxuICAgICAgICAgIHt0aGlzLnByb3BzLnhBeGlzID8gPHRoaXMucHJvcHMueEF4aXMgd2lkdGg9e3Bsb3RXaWR0aH0gZG9tYWluPXtyYW5nZX0vPiA6IG51bGx9XG4gICAgICAgICAgPFNsaWRlclxuICAgICAgICAgICAgc2hvd1ZhbHVlcz17ZmFsc2V9XG4gICAgICAgICAgICBpc1JhbmdlZD17aXNSYW5nZWR9XG4gICAgICAgICAgICBtaW5WYWx1ZT17cmFuZ2VbMF19XG4gICAgICAgICAgICBtYXhWYWx1ZT17cmFuZ2VbMV19XG4gICAgICAgICAgICB2YWx1ZTA9e3ZhbHVlMH1cbiAgICAgICAgICAgIHZhbHVlMT17dmFsdWUxfVxuICAgICAgICAgICAgaGFuZGxlV2lkdGg9e3NsaWRlckhhbmRsZVdpZHRofVxuICAgICAgICAgICAgb25TbGlkZXIwQ2hhbmdlPXt0aGlzLl9zZXRSYW5nZVZhbDB9XG4gICAgICAgICAgICBvblNsaWRlcjFDaGFuZ2U9e3RoaXMuX3NldFJhbmdlVmFsMX1cbiAgICAgICAgICAgIG9uU2xpZGVyQmFyQ2hhbmdlPXsodmFsMCwgdmFsMSkgPT4ge1xuICAgICAgICAgICAgICBpZiAodGhpcy5faXNWYWwxSW5SYW5nZSh2YWwxKSAmJiB0aGlzLl9pc1ZhbDBJblJhbmdlKHZhbDApKSB7XG4gICAgICAgICAgICAgICAgb25DaGFuZ2UoW1xuICAgICAgICAgICAgICAgICAgdGhpcy5fcm91bmRWYWxUb1N0ZXAodmFsMCksXG4gICAgICAgICAgICAgICAgICB0aGlzLl9yb3VuZFZhbFRvU3RlcCh2YWwxKVxuICAgICAgICAgICAgICAgIF0pO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9fVxuICAgICAgICAgICAgZW5hYmxlQmFyRHJhZ1xuICAgICAgICAgIC8+XG4gICAgICAgICAgeyFpc1JhbmdlZCAmJiBzaG93SW5wdXQgPyB0aGlzLl9yZW5kZXJJbnB1dCgndmFsdWUxJykgOiBudWxsfVxuICAgICAgICA8L1NsaWRlcldyYXBwZXI+XG4gICAgICAgIHtpc1JhbmdlZCAmJiBzaG93SW5wdXQgPyA8UmFuZ2VJbnB1dFdyYXBwZXIgY2xhc3NOYW1lPVwicmFuZ2Utc2xpZGVyX19pbnB1dC1ncm91cFwiPlxuICAgICAgICAgIHt0aGlzLl9yZW5kZXJJbnB1dCgndmFsdWUwJyl9XG4gICAgICAgICAge3RoaXMuX3JlbmRlcklucHV0KCd2YWx1ZTEnKX1cbiAgICAgICAgPC9SYW5nZUlucHV0V3JhcHBlcj4gOiBudWxsfVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufTtcbiJdfQ==