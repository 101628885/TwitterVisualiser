'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TimeWidget = undefined;

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

var _templateObject = (0, _taggedTemplateLiteral3.default)(['\n  position: absolute;\n  padding-top: ', 'px;\n  padding-right: ', 'px;\n  padding-bottom: ', 'px;\n  padding-left: ', 'px;  \n  bottom: 0;\n  right: 0;\n  z-index: 1;\n  width: ', 'px;\n\n  .bottom-widget--inner {\n    background-color: ', ';\n    padding: 10px ', 'px;\n    position: relative;\n  }\n'], ['\n  position: absolute;\n  padding-top: ', 'px;\n  padding-right: ', 'px;\n  padding-bottom: ', 'px;\n  padding-left: ', 'px;  \n  bottom: 0;\n  right: 0;\n  z-index: 1;\n  width: ', 'px;\n\n  .bottom-widget--inner {\n    background-color: ', ';\n    padding: 10px ', 'px;\n    position: relative;\n  }\n']),
    _templateObject2 = (0, _taggedTemplateLiteral3.default)(['\n  position: absolute;\n  display: flex;\n  justify-content: space-between;\n  width: 100%;\n  padding-right: ', 'px;\n  color: ', ';\n  \n  .bottom-widget__y-axis {\n    flex-grow: 1;\n    margin-left: 20px;\n  }\n  \n  .bottom-widget__field-select {\n    width: 160px;\n    display: inline-block;\n  }\n'], ['\n  position: absolute;\n  display: flex;\n  justify-content: space-between;\n  width: 100%;\n  padding-right: ', 'px;\n  color: ', ';\n  \n  .bottom-widget__y-axis {\n    flex-grow: 1;\n    margin-left: 20px;\n  }\n  \n  .bottom-widget__field-select {\n    width: 160px;\n    display: inline-block;\n  }\n']),
    _templateObject3 = (0, _taggedTemplateLiteral3.default)(['\n  padding-right: 76px;\n'], ['\n  padding-right: 76px;\n']),
    _templateObject4 = (0, _taggedTemplateLiteral3.default)(['\n  border-bottom: 1px solid\n    ', ';\n  color: ', ';\n  display: inline-block;\n  font-size: 12px;\n  height: 24px;\n  margin-right: 4px;\n  text-align: center;\n  width: 24px;\n  line-height: 24px;\n  \n  :hover {\n    cursor: pointer;\n  }\n'], ['\n  border-bottom: 1px solid\n    ', ';\n  color: ', ';\n  display: inline-block;\n  font-size: 12px;\n  height: 24px;\n  margin-right: 4px;\n  text-align: center;\n  width: 24px;\n  line-height: 24px;\n  \n  :hover {\n    cursor: pointer;\n  }\n']),
    _templateObject5 = (0, _taggedTemplateLiteral3.default)(['\n  flex-grow: 0;\n  color: ', ';\n\n  .bottom-widget__icon {\n    margin-right: 6px;\n  }\n'], ['\n  flex-grow: 0;\n  color: ', ';\n\n  .bottom-widget__icon {\n    margin-right: 6px;\n  }\n']); // Copyright (c) 2018 Uber Technologies, Inc.
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

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _reselect = require('reselect');

var _fieldSelector = require('../common/field-selector');

var _fieldSelector2 = _interopRequireDefault(_fieldSelector);

var _styledComponents3 = require('../common/styled-components');

var _timeRangeFilter = require('./time-range-filter');

var _timeRangeFilter2 = _interopRequireDefault(_timeRangeFilter);

var _icons = require('../common/icons');

var _filterUtils = require('../../utils/filter-utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var innerPdSide = 32;

var WidgetContainer = _styledComponents2.default.div(_templateObject, function (props) {
  return props.theme.sidePanel.margin.top;
}, function (props) {
  return props.theme.sidePanel.margin.right;
}, function (props) {
  return props.theme.sidePanel.margin.bottom;
}, function (props) {
  return props.theme.sidePanel.margin.left;
}, function (props) {
  return props.width;
}, function (props) {
  return props.theme.sidePanelBg;
}, innerPdSide);

var TopSectionWrapper = _styledComponents2.default.div(_templateObject2, innerPdSide * 2, function (props) {
  return props.theme.labelColor;
});

/* eslint-disable no-unused-vars */
var Tabs = _styledComponents2.default.div(_templateObject3);

var Tab = _styledComponents2.default.div(_templateObject4, function (props) {
  return props.active ? props.theme.textColorHl : 'transparent';
}, function (props) {
  return props.active ? props.theme.textColorHl : props.theme.labelColor;
});
/* eslint-enable no-unused-vars */

var StyledTitle = _styledComponents3.CenterFlexbox.extend(_templateObject5, function (props) {
  return props.theme.textColor;
});

var AnimationSpeedToggle = function AnimationSpeedToggle(_ref) {
  var updateAnimationSpeed = _ref.updateAnimationSpeed,
      speed = _ref.speed;
  return _react2.default.createElement(
    Tabs,
    null,
    _filterUtils.TIME_ANIMATION_SPEED.map(function (_ref2) {
      var label = _ref2.label,
          value = _ref2.value;
      return _react2.default.createElement(
        Tab,
        { key: value, active: value === speed,
          onClick: function onClick() {
            return updateAnimationSpeed(value);
          } },
        label
      );
    })
  );
};

var TimeWidget = exports.TimeWidget = function (_Component) {
  (0, _inherits3.default)(TimeWidget, _Component);

  function TimeWidget() {
    var _ref3;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, TimeWidget);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref3 = TimeWidget.__proto__ || Object.getPrototypeOf(TimeWidget)).call.apply(_ref3, [this].concat(args))), _this), _this.fieldSelector = function (props) {
      return props.fields;
    }, _this.yAxisFieldsSelector = (0, _reselect.createSelector)(_this.fieldSelector, function (fields) {
      return fields.filter(function (f) {
        return f.type === 'integer' || f.type === 'real';
      });
    }), _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(TimeWidget, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          enlargedIdx = _props.enlargedIdx,
          enlargeFilter = _props.enlargeFilter,
          filter = _props.filter,
          isAnyFilterAnimating = _props.isAnyFilterAnimating,
          _setFilter = _props.setFilter,
          setFilterPlot = _props.setFilterPlot,
          _toggleAnimation = _props.toggleAnimation,
          _updateAnimationSpeed = _props.updateAnimationSpeed,
          width = _props.width;


      return _react2.default.createElement(
        WidgetContainer,
        { width: width },
        _react2.default.createElement(
          'div',
          { className: 'bottom-widget--inner' },
          _react2.default.createElement(
            TopSectionWrapper,
            null,
            _react2.default.createElement(
              StyledTitle,
              { className: 'bottom-widget__field' },
              _react2.default.createElement(
                _styledComponents3.CenterFlexbox,
                { className: 'bottom-widget__icon' },
                _react2.default.createElement(_icons.Clock, { height: '15px' })
              ),
              _react2.default.createElement(
                _styledComponents3.SelectTextBold,
                null,
                filter.name
              )
            ),
            _react2.default.createElement(
              StyledTitle,
              { className: 'bottom-widget__y-axis' },
              _react2.default.createElement(
                _styledComponents3.CenterFlexbox,
                { className: 'bottom-widget__icon' },
                _react2.default.createElement(_icons.LineChart, { height: '15px' })
              ),
              _react2.default.createElement(
                'div',
                { className: 'bottom-widget__field-select' },
                _react2.default.createElement(_fieldSelector2.default, {
                  fields: this.yAxisFieldsSelector(this.props),
                  placement: 'top',
                  id: 'selected-time-widget-field',
                  value: filter.yAxis ? filter.yAxis.name : null,
                  onSelect: function onSelect(value) {
                    return setFilterPlot(enlargedIdx, { yAxis: value });
                  },
                  inputTheme: 'secondary',
                  placeholder: 'Select Y Axis',
                  erasable: true,
                  showToken: false
                })
              )
            ),
            _react2.default.createElement(AnimationSpeedToggle, {
              updateAnimationSpeed: function updateAnimationSpeed(speed) {
                return _updateAnimationSpeed(enlargedIdx, speed);
              },
              speed: filter.speed }),
            _react2.default.createElement(
              _styledComponents3.IconRoundSmall,
              null,
              _react2.default.createElement(_icons.Close, { height: '12px', onClick: function onClick() {
                  return enlargeFilter(enlargedIdx);
                } })
            )
          ),
          _react2.default.createElement(_timeRangeFilter2.default, {
            filter: filter,
            setFilter: function setFilter(value) {
              return _setFilter(enlargedIdx, 'value', value);
            },
            isAnyFilterAnimating: isAnyFilterAnimating,
            updateAnimationSpeed: function updateAnimationSpeed(speed) {
              return _updateAnimationSpeed(enlargedIdx, speed);
            },
            toggleAnimation: function toggleAnimation() {
              return _toggleAnimation(enlargedIdx);
            }
          })
        )
      );
    }
  }]);
  return TimeWidget;
}(_react.Component);

var TimeWidgetFactory = function TimeWidgetFactory() {
  return TimeWidget;
};
exports.default = TimeWidgetFactory;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2ZpbHRlcnMvdGltZS13aWRnZXQuanMiXSwibmFtZXMiOlsiaW5uZXJQZFNpZGUiLCJXaWRnZXRDb250YWluZXIiLCJzdHlsZWQiLCJkaXYiLCJwcm9wcyIsInRoZW1lIiwic2lkZVBhbmVsIiwibWFyZ2luIiwidG9wIiwicmlnaHQiLCJib3R0b20iLCJsZWZ0Iiwid2lkdGgiLCJzaWRlUGFuZWxCZyIsIlRvcFNlY3Rpb25XcmFwcGVyIiwibGFiZWxDb2xvciIsIlRhYnMiLCJUYWIiLCJhY3RpdmUiLCJ0ZXh0Q29sb3JIbCIsIlN0eWxlZFRpdGxlIiwiQ2VudGVyRmxleGJveCIsImV4dGVuZCIsInRleHRDb2xvciIsIkFuaW1hdGlvblNwZWVkVG9nZ2xlIiwidXBkYXRlQW5pbWF0aW9uU3BlZWQiLCJzcGVlZCIsIlRJTUVfQU5JTUFUSU9OX1NQRUVEIiwibWFwIiwibGFiZWwiLCJ2YWx1ZSIsIlRpbWVXaWRnZXQiLCJmaWVsZFNlbGVjdG9yIiwiZmllbGRzIiwieUF4aXNGaWVsZHNTZWxlY3RvciIsImZpbHRlciIsImYiLCJ0eXBlIiwiZW5sYXJnZWRJZHgiLCJlbmxhcmdlRmlsdGVyIiwiaXNBbnlGaWx0ZXJBbmltYXRpbmciLCJzZXRGaWx0ZXIiLCJzZXRGaWx0ZXJQbG90IiwidG9nZ2xlQW5pbWF0aW9uIiwibmFtZSIsInlBeGlzIiwiQ29tcG9uZW50IiwiVGltZVdpZGdldEZhY3RvcnkiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7aVFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7QUFDQTs7OztBQUNBOztBQUVBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7OztBQUNBLElBQU1BLGNBQWMsRUFBcEI7O0FBRUEsSUFBTUMsa0JB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Y0QsV0FBZCxDQUFOO0FBQUEsaUJBQTlCO0FBREY7QUE1QkYsV0FERjtBQWlDRSx3Q0FBQyx5QkFBRDtBQUNFLG9CQUFRSCxNQURWO0FBRUUsdUJBQVc7QUFBQSxxQkFBU00sV0FBVUgsV0FBVixFQUF1QixPQUF2QixFQUFnQ1IsS0FBaEMsQ0FBVDtBQUFBLGFBRmI7QUFHRSxrQ0FBc0JVLG9CQUh4QjtBQUlFLGtDQUFzQiw4QkFBQ2QsS0FBRDtBQUFBLHFCQUFXRCxzQkFBcUJhLFdBQXJCLEVBQWtDWixLQUFsQyxDQUFYO0FBQUEsYUFKeEI7QUFLRSw2QkFBaUI7QUFBQSxxQkFBTWlCLGlCQUFnQkwsV0FBaEIsQ0FBTjtBQUFBO0FBTG5CO0FBakNGO0FBREYsT0FERjtBQTZDRDs7O0VBaEU2QlEsZ0I7O0FBbUVoQyxJQUFNQyxvQkFBb0IsU0FBcEJBLGlCQUFvQjtBQUFBLFNBQU1oQixVQUFOO0FBQUEsQ0FBMUI7a0JBQ2VnQixpQiIsImZpbGUiOiJ0aW1lLXdpZGdldC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgMjAxOCBVYmVyIFRlY2hub2xvZ2llcywgSW5jLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbi8vIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbi8vIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbi8vIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbi8vIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuLy8gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuLy8gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4vLyBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbi8vIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbi8vIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4vLyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4vLyBUSEUgU09GVFdBUkUuXG5cbmltcG9ydCBSZWFjdCwge0NvbXBvbmVudH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHN0eWxlZCBmcm9tICdzdHlsZWQtY29tcG9uZW50cyc7XG5pbXBvcnQge2NyZWF0ZVNlbGVjdG9yfSBmcm9tICdyZXNlbGVjdCc7XG5cbmltcG9ydCBGaWVsZFNlbGVjdG9yIGZyb20gJ2NvbXBvbmVudHMvY29tbW9uL2ZpZWxkLXNlbGVjdG9yJztcbmltcG9ydCB7U2VsZWN0VGV4dEJvbGQsIEljb25Sb3VuZFNtYWxsLCBDZW50ZXJGbGV4Ym94fSBmcm9tICdjb21wb25lbnRzL2NvbW1vbi9zdHlsZWQtY29tcG9uZW50cyc7XG5pbXBvcnQgVGltZVJhbmdlRmlsdGVyIGZyb20gJ2NvbXBvbmVudHMvZmlsdGVycy90aW1lLXJhbmdlLWZpbHRlcic7XG5pbXBvcnQge0Nsb3NlLCBDbG9jaywgTGluZUNoYXJ0fSBmcm9tICdjb21wb25lbnRzL2NvbW1vbi9pY29ucyc7XG5pbXBvcnQge1RJTUVfQU5JTUFUSU9OX1NQRUVEfSBmcm9tICd1dGlscy9maWx0ZXItdXRpbHMnO1xuY29uc3QgaW5uZXJQZFNpZGUgPSAzMjtcblxuY29uc3QgV2lkZ2V0Q29udGFpbmVyID0gc3R5bGVkLmRpdmBcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICBwYWRkaW5nLXRvcDogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5zaWRlUGFuZWwubWFyZ2luLnRvcH1weDtcbiAgcGFkZGluZy1yaWdodDogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5zaWRlUGFuZWwubWFyZ2luLnJpZ2h0fXB4O1xuICBwYWRkaW5nLWJvdHRvbTogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5zaWRlUGFuZWwubWFyZ2luLmJvdHRvbX1weDtcbiAgcGFkZGluZy1sZWZ0OiAke3Byb3BzID0+IHByb3BzLnRoZW1lLnNpZGVQYW5lbC5tYXJnaW4ubGVmdH1weDsgIFxuICBib3R0b206IDA7XG4gIHJpZ2h0OiAwO1xuICB6LWluZGV4OiAxO1xuICB3aWR0aDogJHtwcm9wcyA9PiBwcm9wcy53aWR0aH1weDtcblxuICAuYm90dG9tLXdpZGdldC0taW5uZXIge1xuICAgIGJhY2tncm91bmQtY29sb3I6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUuc2lkZVBhbmVsQmd9O1xuICAgIHBhZGRpbmc6IDEwcHggJHtpbm5lclBkU2lkZX1weDtcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIH1cbmA7XG5cbmNvbnN0IFRvcFNlY3Rpb25XcmFwcGVyID0gc3R5bGVkLmRpdmBcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gIHdpZHRoOiAxMDAlO1xuICBwYWRkaW5nLXJpZ2h0OiAke2lubmVyUGRTaWRlICogMn1weDtcbiAgY29sb3I6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUubGFiZWxDb2xvcn07XG4gIFxuICAuYm90dG9tLXdpZGdldF9feS1heGlzIHtcbiAgICBmbGV4LWdyb3c6IDE7XG4gICAgbWFyZ2luLWxlZnQ6IDIwcHg7XG4gIH1cbiAgXG4gIC5ib3R0b20td2lkZ2V0X19maWVsZC1zZWxlY3Qge1xuICAgIHdpZHRoOiAxNjBweDtcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gIH1cbmA7XG5cbi8qIGVzbGludC1kaXNhYmxlIG5vLXVudXNlZC12YXJzICovXG5jb25zdCBUYWJzID0gc3R5bGVkLmRpdmBcbiAgcGFkZGluZy1yaWdodDogNzZweDtcbmA7XG5cbmNvbnN0IFRhYiA9IHN0eWxlZC5kaXZgXG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZFxuICAgICR7cHJvcHMgPT4gKHByb3BzLmFjdGl2ZSA/IHByb3BzLnRoZW1lLnRleHRDb2xvckhsIDogJ3RyYW5zcGFyZW50Jyl9O1xuICBjb2xvcjogJHtwcm9wcyA9PlxuICBwcm9wcy5hY3RpdmUgPyBwcm9wcy50aGVtZS50ZXh0Q29sb3JIbCA6IHByb3BzLnRoZW1lLmxhYmVsQ29sb3J9O1xuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gIGZvbnQtc2l6ZTogMTJweDtcbiAgaGVpZ2h0OiAyNHB4O1xuICBtYXJnaW4tcmlnaHQ6IDRweDtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICB3aWR0aDogMjRweDtcbiAgbGluZS1oZWlnaHQ6IDI0cHg7XG4gIFxuICA6aG92ZXIge1xuICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgfVxuYDtcbi8qIGVzbGludC1lbmFibGUgbm8tdW51c2VkLXZhcnMgKi9cblxuY29uc3QgU3R5bGVkVGl0bGUgPSBDZW50ZXJGbGV4Ym94LmV4dGVuZGBcbiAgZmxleC1ncm93OiAwO1xuICBjb2xvcjogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS50ZXh0Q29sb3J9O1xuXG4gIC5ib3R0b20td2lkZ2V0X19pY29uIHtcbiAgICBtYXJnaW4tcmlnaHQ6IDZweDtcbiAgfVxuYDtcblxuY29uc3QgQW5pbWF0aW9uU3BlZWRUb2dnbGUgPSAoe3VwZGF0ZUFuaW1hdGlvblNwZWVkLCBzcGVlZH0pID0+IChcbiAgPFRhYnM+XG4gICAge1RJTUVfQU5JTUFUSU9OX1NQRUVELm1hcCgoe2xhYmVsLCB2YWx1ZX0pID0+IChcbiAgICAgIDxUYWIga2V5PXt2YWx1ZX0gYWN0aXZlPXt2YWx1ZSA9PT0gc3BlZWR9XG4gICAgICAgIG9uQ2xpY2s9eygpID0+IHVwZGF0ZUFuaW1hdGlvblNwZWVkKHZhbHVlKX0+e2xhYmVsfTwvVGFiPlxuICAgICkpfVxuICA8L1RhYnM+XG4pO1xuXG5leHBvcnQgY2xhc3MgVGltZVdpZGdldCBleHRlbmRzIENvbXBvbmVudCB7XG4gIGZpZWxkU2VsZWN0b3IgPSBwcm9wcyA9PiBwcm9wcy5maWVsZHM7XG4gIHlBeGlzRmllbGRzU2VsZWN0b3IgPSBjcmVhdGVTZWxlY3Rvcih0aGlzLmZpZWxkU2VsZWN0b3IsIGZpZWxkcyA9PlxuICAgIGZpZWxkcy5maWx0ZXIoZiA9PiBmLnR5cGUgPT09ICdpbnRlZ2VyJyB8fCBmLnR5cGUgPT09ICdyZWFsJylcbiAgKTtcblxuICByZW5kZXIoKSB7XG4gICAgY29uc3Qge1xuICAgICAgZW5sYXJnZWRJZHgsXG4gICAgICBlbmxhcmdlRmlsdGVyLFxuICAgICAgZmlsdGVyLFxuICAgICAgaXNBbnlGaWx0ZXJBbmltYXRpbmcsXG4gICAgICBzZXRGaWx0ZXIsXG4gICAgICBzZXRGaWx0ZXJQbG90LFxuICAgICAgdG9nZ2xlQW5pbWF0aW9uLFxuICAgICAgdXBkYXRlQW5pbWF0aW9uU3BlZWQsXG4gICAgICB3aWR0aFxuICAgIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxXaWRnZXRDb250YWluZXIgd2lkdGg9e3dpZHRofT5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJib3R0b20td2lkZ2V0LS1pbm5lclwiPlxuICAgICAgICAgIDxUb3BTZWN0aW9uV3JhcHBlcj5cbiAgICAgICAgICAgIDxTdHlsZWRUaXRsZSBjbGFzc05hbWU9XCJib3R0b20td2lkZ2V0X19maWVsZFwiPlxuICAgICAgICAgICAgICA8Q2VudGVyRmxleGJveCBjbGFzc05hbWU9XCJib3R0b20td2lkZ2V0X19pY29uXCI+XG4gICAgICAgICAgICAgICAgPENsb2NrIGhlaWdodD1cIjE1cHhcIi8+XG4gICAgICAgICAgICAgIDwvQ2VudGVyRmxleGJveD5cbiAgICAgICAgICAgICAgPFNlbGVjdFRleHRCb2xkPntmaWx0ZXIubmFtZX08L1NlbGVjdFRleHRCb2xkPlxuICAgICAgICAgICAgPC9TdHlsZWRUaXRsZT5cbiAgICAgICAgICAgIDxTdHlsZWRUaXRsZSBjbGFzc05hbWU9XCJib3R0b20td2lkZ2V0X195LWF4aXNcIj5cbiAgICAgICAgICAgICAgPENlbnRlckZsZXhib3ggY2xhc3NOYW1lPVwiYm90dG9tLXdpZGdldF9faWNvblwiPlxuICAgICAgICAgICAgICAgIDxMaW5lQ2hhcnQgaGVpZ2h0PVwiMTVweFwiLz5cbiAgICAgICAgICAgICAgPC9DZW50ZXJGbGV4Ym94PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJvdHRvbS13aWRnZXRfX2ZpZWxkLXNlbGVjdFwiPlxuICAgICAgICAgICAgICAgIDxGaWVsZFNlbGVjdG9yXG4gICAgICAgICAgICAgICAgICBmaWVsZHM9e3RoaXMueUF4aXNGaWVsZHNTZWxlY3Rvcih0aGlzLnByb3BzKX1cbiAgICAgICAgICAgICAgICAgIHBsYWNlbWVudD1cInRvcFwiXG4gICAgICAgICAgICAgICAgICBpZD1cInNlbGVjdGVkLXRpbWUtd2lkZ2V0LWZpZWxkXCJcbiAgICAgICAgICAgICAgICAgIHZhbHVlPXtmaWx0ZXIueUF4aXMgPyBmaWx0ZXIueUF4aXMubmFtZSA6IG51bGx9XG4gICAgICAgICAgICAgICAgICBvblNlbGVjdD17dmFsdWUgPT4gc2V0RmlsdGVyUGxvdChlbmxhcmdlZElkeCwge3lBeGlzOiB2YWx1ZX0pfVxuICAgICAgICAgICAgICAgICAgaW5wdXRUaGVtZT1cInNlY29uZGFyeVwiXG4gICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cIlNlbGVjdCBZIEF4aXNcIlxuICAgICAgICAgICAgICAgICAgZXJhc2FibGVcbiAgICAgICAgICAgICAgICAgIHNob3dUb2tlbj17ZmFsc2V9XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L1N0eWxlZFRpdGxlPlxuICAgICAgICAgICAgPEFuaW1hdGlvblNwZWVkVG9nZ2xlXG4gICAgICAgICAgICAgIHVwZGF0ZUFuaW1hdGlvblNwZWVkPXsoc3BlZWQpID0+IHVwZGF0ZUFuaW1hdGlvblNwZWVkKGVubGFyZ2VkSWR4LCBzcGVlZCl9XG4gICAgICAgICAgICAgIHNwZWVkPXtmaWx0ZXIuc3BlZWR9Lz5cbiAgICAgICAgICAgIDxJY29uUm91bmRTbWFsbD5cbiAgICAgICAgICAgICAgPENsb3NlIGhlaWdodD1cIjEycHhcIiBvbkNsaWNrPXsoKSA9PiBlbmxhcmdlRmlsdGVyKGVubGFyZ2VkSWR4KX0gLz5cbiAgICAgICAgICAgIDwvSWNvblJvdW5kU21hbGw+XG4gICAgICAgICAgPC9Ub3BTZWN0aW9uV3JhcHBlcj5cbiAgICAgICAgICA8VGltZVJhbmdlRmlsdGVyXG4gICAgICAgICAgICBmaWx0ZXI9e2ZpbHRlcn1cbiAgICAgICAgICAgIHNldEZpbHRlcj17dmFsdWUgPT4gc2V0RmlsdGVyKGVubGFyZ2VkSWR4LCAndmFsdWUnLCB2YWx1ZSl9XG4gICAgICAgICAgICBpc0FueUZpbHRlckFuaW1hdGluZz17aXNBbnlGaWx0ZXJBbmltYXRpbmd9XG4gICAgICAgICAgICB1cGRhdGVBbmltYXRpb25TcGVlZD17KHNwZWVkKSA9PiB1cGRhdGVBbmltYXRpb25TcGVlZChlbmxhcmdlZElkeCwgc3BlZWQpfVxuICAgICAgICAgICAgdG9nZ2xlQW5pbWF0aW9uPXsoKSA9PiB0b2dnbGVBbmltYXRpb24oZW5sYXJnZWRJZHgpfVxuICAgICAgICAgIC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9XaWRnZXRDb250YWluZXI+XG4gICAgKTtcbiAgfVxufVxuXG5jb25zdCBUaW1lV2lkZ2V0RmFjdG9yeSA9ICgpID0+IFRpbWVXaWRnZXQ7XG5leHBvcnQgZGVmYXVsdCBUaW1lV2lkZ2V0RmFjdG9yeTtcbiJdfQ==