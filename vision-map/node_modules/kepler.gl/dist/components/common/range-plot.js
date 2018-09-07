'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _taggedTemplateLiteral2 = require('babel-runtime/helpers/taggedTemplateLiteral');

var _taggedTemplateLiteral3 = _interopRequireDefault(_taggedTemplateLiteral2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _class, _temp2; // Copyright (c) 2018 Uber Technologies, Inc.
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

var _templateObject = (0, _taggedTemplateLiteral3.default)(['\n  .rv-xy-plot__inner path {\n    fill: none;\n    stroke-width: 1.5;\n  }\n'], ['\n  .rv-xy-plot__inner path {\n    fill: none;\n    stroke-width: 1.5;\n  }\n']),
    _templateObject2 = (0, _taggedTemplateLiteral3.default)(['\n  background-color: #d3d8e0;\n  border-radius: 2px;\n  color: ', ';\n  font-size: 9px;\n  margin: 4px;\n  padding: 3px 6px;\n  pointer-events: none;\n  user-select: none;\n'], ['\n  background-color: #d3d8e0;\n  border-radius: 2px;\n  color: ', ';\n  font-size: 9px;\n  margin: 4px;\n  padding: 3px 6px;\n  pointer-events: none;\n  user-select: none;\n']);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _d3Scale = require('d3-scale');

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _d3Array = require('d3-array');

var _reselect = require('reselect');

var _reactVis = require('react-vis');

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _rangeBrush = require('./range-brush');

var _rangeBrush2 = _interopRequireDefault(_rangeBrush);

var _filterUtils = require('../../utils/filter-utils');

var _base = require('../../styles/base');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var chartMargin = { top: 18, bottom: 0, left: 0, right: 0 };
var chartH = 52;
var containerH = 78;
var histogramStyle = {
  highlightW: 0.7,
  unHighlightedW: 0.4,
  highlightedColor: _base.theme.activeColor,
  unHighlightedColor: _base.theme.sliderBarColor
};

var RangePlot = (_temp2 = _class = function (_Component) {
  (0, _inherits3.default)(RangePlot, _Component);

  function RangePlot() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, RangePlot);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = RangePlot.__proto__ || Object.getPrototypeOf(RangePlot)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      hoveredDP: null
    }, _this.domainSelector = function (props) {
      return props.lineChart && props.lineChart.xDomain;
    }, _this.hintFormatter = (0, _reselect.createSelector)(_this.domainSelector, function (domain) {
      return (0, _filterUtils.getTimeWidgetHintFormatter)(domain);
    }), _this.onMouseMove = function (hoveredDP) {
      _this.setState({ hoveredDP: hoveredDP });
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(RangePlot, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          onBrush = _props.onBrush,
          range = _props.range,
          value = _props.value,
          width = _props.width,
          plotType = _props.plotType,
          lineChart = _props.lineChart,
          histogram = _props.histogram;

      var domain = [histogram[0].x0, histogram[histogram.length - 1].x1];

      var brushComponent = _react2.default.createElement(_rangeBrush2.default, {
        domain: domain,
        onBrush: onBrush,
        range: range,
        value: value,
        width: width
      });

      return _react2.default.createElement(
        'div',
        {
          style: {
            height: containerH + 'px',
            position: 'relative'
          }
        },
        plotType === 'lineChart' ? _react2.default.createElement(LineChart, {
          hoveredDP: this.state.hoveredDP,
          width: width,
          height: containerH,
          margin: chartMargin,
          children: brushComponent,
          onMouseMove: this.onMouseMove,
          yDomain: lineChart.yDomain,
          hintFormat: this.hintFormatter(this.props),
          data: lineChart.series
        }) : _react2.default.createElement(Histogram, {
          width: width,
          height: chartH,
          value: value,
          margin: chartMargin,
          histogram: histogram,
          brushComponent: brushComponent
        })
      );
    }
  }]);
  return RangePlot;
}(_react.Component), _class.propTypes = {
  value: _propTypes2.default.arrayOf(_propTypes2.default.number).isRequired,
  histogram: _propTypes2.default.arrayOf(_propTypes2.default.shape({
    x0: _propTypes2.default.number,
    x1: _propTypes2.default.number
  })),
  lineChart: _propTypes2.default.object,
  plotType: _propTypes2.default.string,
  isEnlarged: _propTypes2.default.bool,
  onBlur: _propTypes2.default.func,
  width: _propTypes2.default.number.isRequired
}, _temp2);
exports.default = RangePlot;


var Histogram = function Histogram(_ref2) {
  var width = _ref2.width,
      height = _ref2.height,
      margin = _ref2.margin,
      histogram = _ref2.histogram,
      value = _ref2.value,
      brushComponent = _ref2.brushComponent;

  var domain = [histogram[0].x0, histogram[histogram.length - 1].x1];
  var barWidth = width / histogram.length;

  var x = (0, _d3Scale.scaleLinear)().domain(domain).range([0, width]);

  var y = (0, _d3Scale.scaleLinear)().domain([0, (0, _d3Array.max)(histogram, function (d) {
    return d.count;
  })]).range([0, height]);

  return _react2.default.createElement(
    'svg',
    { width: width, height: height, style: { marginTop: margin.top + 'px' } },
    _react2.default.createElement(
      'g',
      { className: 'histogram-bars' },
      histogram.map(function (bar) {
        var inRange = bar.x0 >= value[0] && bar.x1 <= value[1];
        var fill = inRange ? histogramStyle.highlightedColor : histogramStyle.unHighlightedColor;
        var wRatio = inRange ? histogramStyle.highlightW : histogramStyle.unHighlightedW;

        return _react2.default.createElement('rect', {
          key: bar.x0,
          fill: fill,
          height: y(bar.count),
          width: barWidth * wRatio,
          x: x(bar.x0) + barWidth * (1 - wRatio) / 2,
          rx: 1,
          ry: 1,
          y: height - y(bar.count)
        });
      })
    ),
    brushComponent
  );
};

var LineChartWrapper = _styledComponents2.default.div(_templateObject);

var LineChart = function LineChart(_ref3) {
  var width = _ref3.width,
      height = _ref3.height,
      yDomain = _ref3.yDomain,
      hintFormat = _ref3.hintFormat,
      hoveredDP = _ref3.hoveredDP,
      margin = _ref3.margin,
      color = _ref3.color,
      data = _ref3.data,
      onMouseMove = _ref3.onMouseMove,
      children = _ref3.children;

  var brushData = [{ x: data[0].x, y: yDomain[1], customComponent: function customComponent() {
      return children;
    } }];

  return _react2.default.createElement(
    LineChartWrapper,
    null,
    _react2.default.createElement(
      _reactVis.XYPlot,
      { width: width, height: height, margin: (0, _extends3.default)({}, margin, { bottom: 12 }) },
      _react2.default.createElement(_reactVis.LineSeries, {
        strokeWidth: 2,
        color: color,
        data: data,
        onNearestX: onMouseMove
      }),
      _react2.default.createElement(_reactVis.MarkSeries, {
        data: hoveredDP ? [hoveredDP] : [],
        color: color,
        size: 3
      }),
      _react2.default.createElement(_reactVis.CustomSVGSeries, { data: brushData }),
      hoveredDP ? _react2.default.createElement(
        _reactVis.Hint,
        { value: hoveredDP },
        _react2.default.createElement(HintContent, (0, _extends3.default)({}, hoveredDP, {
          format: function format(val) {
            return _moment2.default.utc(val).format(hintFormat);
          }
        }))
      ) : null
    )
  );
};

var StyledHint = _styledComponents2.default.div(_templateObject2, function (props) {
  return props.theme.textColorLT;
});
var HintContent = function HintContent(_ref4) {
  var x = _ref4.x,
      y = _ref4.y,
      format = _ref4.format;
  return _react2.default.createElement(
    StyledHint,
    null,
    _react2.default.createElement(
      'div',
      { className: 'hint--x' },
      format(x)
    ),
    _react2.default.createElement(
      'div',
      { className: 'row' },
      y
    )
  );
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2NvbW1vbi9yYW5nZS1wbG90LmpzIl0sIm5hbWVzIjpbImNoYXJ0TWFyZ2luIiwidG9wIiwiYm90dG9tIiwibGVmdCIsInJpZ2h0IiwiY2hhcnRIIiwiY29udGFpbmVySCIsImhpc3RvZ3JhbVN0eWxlIiwiaGlnaGxpZ2h0VyIsInVuSGlnaGxpZ2h0ZWRXIiwiaGlnaGxpZ2h0ZWRDb2xvciIsInRoZW1lIiwiYWN0aXZlQ29sb3IiLCJ1bkhpZ2hsaWdodGVkQ29sb3IiLCJzbGlkZXJCYXJDb2xvciIsIlJhbmdlUGxvdCIsInN0YXRlIiwiaG92ZXJlZERQIiwiZG9tYWluU2VsZWN0b3IiLCJwcm9wcyIsImxpbmVDaGFydCIsInhEb21haW4iLCJoaW50Rm9ybWF0dGVyIiwiZG9tYWluIiwib25Nb3VzZU1vdmUiLCJzZXRTdGF0ZSIsIm9uQnJ1c2giLCJyYW5nZSIsInZhbHVlIiwid2lkdGgiLCJwbG90VHlwZSIsImhpc3RvZ3JhbSIsIngwIiwibGVuZ3RoIiwieDEiLCJicnVzaENvbXBvbmVudCIsImhlaWdodCIsInBvc2l0aW9uIiwieURvbWFpbiIsInNlcmllcyIsIkNvbXBvbmVudCIsInByb3BUeXBlcyIsIlByb3BUeXBlcyIsImFycmF5T2YiLCJudW1iZXIiLCJpc1JlcXVpcmVkIiwic2hhcGUiLCJvYmplY3QiLCJzdHJpbmciLCJpc0VubGFyZ2VkIiwiYm9vbCIsIm9uQmx1ciIsImZ1bmMiLCJIaXN0b2dyYW0iLCJtYXJnaW4iLCJiYXJXaWR0aCIsIngiLCJ5IiwiZCIsImNvdW50IiwibWFyZ2luVG9wIiwibWFwIiwiaW5SYW5nZSIsImJhciIsImZpbGwiLCJ3UmF0aW8iLCJMaW5lQ2hhcnRXcmFwcGVyIiwic3R5bGVkIiwiZGl2IiwiTGluZUNoYXJ0IiwiaGludEZvcm1hdCIsImNvbG9yIiwiZGF0YSIsImNoaWxkcmVuIiwiYnJ1c2hEYXRhIiwiY3VzdG9tQ29tcG9uZW50IiwibW9tZW50IiwidXRjIiwidmFs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LE1BQUUxQixDQUFGLFNBQUVBLENBQUY7QUFBQSxNQUFLQyxDQUFMLFNBQUtBLENBQUw7QUFBQSxNQUFRc0IsTUFBUixTQUFRQSxNQUFSO0FBQUEsU0FDbEI7QUFBQyxjQUFEO0FBQUE7QUFDRTtBQUFBO0FBQUEsUUFBSyxXQUFVLFNBQWY7QUFBMEJBLGFBQU92QixDQUFQO0FBQTFCLEtBREY7QUFFRTtBQUFBO0FBQUEsUUFBSyxXQUFVLEtBQWY7QUFBc0JDO0FBQXRCO0FBRkYsR0FEa0I7QUFBQSxDQUFwQiIsImZpbGUiOiJyYW5nZS1wbG90LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSAyMDE4IFViZXIgVGVjaG5vbG9naWVzLCBJbmMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuLy8gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuLy8gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuLy8gdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuLy8gY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4vLyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4vLyBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4vLyBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbi8vIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuLy8gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuLy8gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbi8vIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbi8vIFRIRSBTT0ZUV0FSRS5cblxuaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50fSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHtzY2FsZUxpbmVhcn0gZnJvbSAnZDMtc2NhbGUnO1xuaW1wb3J0IG1vbWVudCBmcm9tICdtb21lbnQnO1xuaW1wb3J0IHttYXh9IGZyb20gJ2QzLWFycmF5JztcbmltcG9ydCB7Y3JlYXRlU2VsZWN0b3J9IGZyb20gJ3Jlc2VsZWN0JztcbmltcG9ydCB7TGluZVNlcmllcywgWFlQbG90LCBDdXN0b21TVkdTZXJpZXMsIEhpbnQsIE1hcmtTZXJpZXN9IGZyb20gJ3JlYWN0LXZpcyc7XG5pbXBvcnQgc3R5bGVkIGZyb20gJ3N0eWxlZC1jb21wb25lbnRzJztcbmltcG9ydCBSYW5nZUJydXNoIGZyb20gJy4vcmFuZ2UtYnJ1c2gnO1xuaW1wb3J0IHtnZXRUaW1lV2lkZ2V0SGludEZvcm1hdHRlcn0gZnJvbSAndXRpbHMvZmlsdGVyLXV0aWxzJztcbmltcG9ydCB7dGhlbWV9IGZyb20gJ3N0eWxlcy9iYXNlJztcblxuY29uc3QgY2hhcnRNYXJnaW4gPSB7dG9wOiAxOCwgYm90dG9tOiAwLCBsZWZ0OiAwLCByaWdodDogMH07XG5jb25zdCBjaGFydEggPSA1MjtcbmNvbnN0IGNvbnRhaW5lckggPSA3ODtcbmNvbnN0IGhpc3RvZ3JhbVN0eWxlID0ge1xuICBoaWdobGlnaHRXOiAwLjcsXG4gIHVuSGlnaGxpZ2h0ZWRXOiAwLjQsXG4gIGhpZ2hsaWdodGVkQ29sb3I6IHRoZW1lLmFjdGl2ZUNvbG9yLFxuICB1bkhpZ2hsaWdodGVkQ29sb3I6IHRoZW1lLnNsaWRlckJhckNvbG9yXG59O1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSYW5nZVBsb3QgZXh0ZW5kcyBDb21wb25lbnQge1xuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIHZhbHVlOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMubnVtYmVyKS5pc1JlcXVpcmVkLFxuICAgIGhpc3RvZ3JhbTogUHJvcFR5cGVzLmFycmF5T2YoXG4gICAgICBQcm9wVHlwZXMuc2hhcGUoe1xuICAgICAgICB4MDogUHJvcFR5cGVzLm51bWJlcixcbiAgICAgICAgeDE6IFByb3BUeXBlcy5udW1iZXJcbiAgICAgIH0pXG4gICAgKSxcbiAgICBsaW5lQ2hhcnQ6IFByb3BUeXBlcy5vYmplY3QsXG4gICAgcGxvdFR5cGU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgaXNFbmxhcmdlZDogUHJvcFR5cGVzLmJvb2wsXG4gICAgb25CbHVyOiBQcm9wVHlwZXMuZnVuYyxcbiAgICB3aWR0aDogUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkXG4gIH07XG5cbiAgc3RhdGUgPSB7XG4gICAgaG92ZXJlZERQOiBudWxsXG4gIH07XG5cbiAgZG9tYWluU2VsZWN0b3IgPSBwcm9wcyA9PiBwcm9wcy5saW5lQ2hhcnQgJiYgcHJvcHMubGluZUNoYXJ0LnhEb21haW47XG4gIGhpbnRGb3JtYXR0ZXIgPSBjcmVhdGVTZWxlY3Rvcih0aGlzLmRvbWFpblNlbGVjdG9yLCBkb21haW4gPT5cbiAgICBnZXRUaW1lV2lkZ2V0SGludEZvcm1hdHRlcihkb21haW4pXG4gICk7XG5cbiAgb25Nb3VzZU1vdmUgPSBob3ZlcmVkRFAgPT4ge1xuICAgIHRoaXMuc2V0U3RhdGUoe2hvdmVyZWREUH0pO1xuICB9O1xuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7XG4gICAgICBvbkJydXNoLFxuICAgICAgcmFuZ2UsXG4gICAgICB2YWx1ZSxcbiAgICAgIHdpZHRoLFxuICAgICAgcGxvdFR5cGUsXG4gICAgICBsaW5lQ2hhcnQsXG4gICAgICBoaXN0b2dyYW1cbiAgICB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBkb21haW4gPSBbaGlzdG9ncmFtWzBdLngwLCBoaXN0b2dyYW1baGlzdG9ncmFtLmxlbmd0aCAtIDFdLngxXTtcblxuICAgIGNvbnN0IGJydXNoQ29tcG9uZW50ID0gKFxuICAgICAgPFJhbmdlQnJ1c2hcbiAgICAgICAgZG9tYWluPXtkb21haW59XG4gICAgICAgIG9uQnJ1c2g9e29uQnJ1c2h9XG4gICAgICAgIHJhbmdlPXtyYW5nZX1cbiAgICAgICAgdmFsdWU9e3ZhbHVlfVxuICAgICAgICB3aWR0aD17d2lkdGh9XG4gICAgICAvPlxuICAgICk7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdlxuICAgICAgICBzdHlsZT17e1xuICAgICAgICAgIGhlaWdodDogYCR7Y29udGFpbmVySH1weGAsXG4gICAgICAgICAgcG9zaXRpb246ICdyZWxhdGl2ZSdcbiAgICAgICAgfX1cbiAgICAgID5cbiAgICAgICAge3Bsb3RUeXBlID09PSAnbGluZUNoYXJ0JyA/IChcbiAgICAgICAgICA8TGluZUNoYXJ0XG4gICAgICAgICAgICBob3ZlcmVkRFA9e3RoaXMuc3RhdGUuaG92ZXJlZERQfVxuICAgICAgICAgICAgd2lkdGg9e3dpZHRofVxuICAgICAgICAgICAgaGVpZ2h0PXtjb250YWluZXJIfVxuICAgICAgICAgICAgbWFyZ2luPXtjaGFydE1hcmdpbn1cbiAgICAgICAgICAgIGNoaWxkcmVuPXticnVzaENvbXBvbmVudH1cbiAgICAgICAgICAgIG9uTW91c2VNb3ZlPXt0aGlzLm9uTW91c2VNb3ZlfVxuICAgICAgICAgICAgeURvbWFpbj17bGluZUNoYXJ0LnlEb21haW59XG4gICAgICAgICAgICBoaW50Rm9ybWF0PXt0aGlzLmhpbnRGb3JtYXR0ZXIodGhpcy5wcm9wcyl9XG4gICAgICAgICAgICBkYXRhPXtsaW5lQ2hhcnQuc2VyaWVzfVxuICAgICAgICAgIC8+XG4gICAgICAgICkgOiAoXG4gICAgICAgICAgPEhpc3RvZ3JhbVxuICAgICAgICAgICAgd2lkdGg9e3dpZHRofVxuICAgICAgICAgICAgaGVpZ2h0PXtjaGFydEh9XG4gICAgICAgICAgICB2YWx1ZT17dmFsdWV9XG4gICAgICAgICAgICBtYXJnaW49e2NoYXJ0TWFyZ2lufVxuICAgICAgICAgICAgaGlzdG9ncmFtPXtoaXN0b2dyYW19XG4gICAgICAgICAgICBicnVzaENvbXBvbmVudD17YnJ1c2hDb21wb25lbnR9XG4gICAgICAgICAgLz5cbiAgICAgICAgKX1cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuY29uc3QgSGlzdG9ncmFtID0gKHtcbiAgd2lkdGgsXG4gIGhlaWdodCxcbiAgbWFyZ2luLFxuICBoaXN0b2dyYW0sXG4gIHZhbHVlLFxuICBicnVzaENvbXBvbmVudFxufSkgPT4ge1xuICBjb25zdCBkb21haW4gPSBbaGlzdG9ncmFtWzBdLngwLCBoaXN0b2dyYW1baGlzdG9ncmFtLmxlbmd0aCAtIDFdLngxXTtcbiAgY29uc3QgYmFyV2lkdGggPSB3aWR0aCAvIGhpc3RvZ3JhbS5sZW5ndGg7XG5cbiAgY29uc3QgeCA9IHNjYWxlTGluZWFyKClcbiAgICAuZG9tYWluKGRvbWFpbilcbiAgICAucmFuZ2UoWzAsIHdpZHRoXSk7XG5cbiAgY29uc3QgeSA9IHNjYWxlTGluZWFyKClcbiAgICAuZG9tYWluKFswLCBtYXgoaGlzdG9ncmFtLCBkID0+IGQuY291bnQpXSlcbiAgICAucmFuZ2UoWzAsIGhlaWdodF0pO1xuXG4gIHJldHVybiAoXG4gICAgPHN2ZyB3aWR0aD17d2lkdGh9IGhlaWdodD17aGVpZ2h0fSBzdHlsZT17e21hcmdpblRvcDogYCR7bWFyZ2luLnRvcH1weGB9fT5cbiAgICAgIDxnIGNsYXNzTmFtZT1cImhpc3RvZ3JhbS1iYXJzXCI+XG4gICAgICAgIHtoaXN0b2dyYW0ubWFwKGJhciA9PiB7XG4gICAgICAgICAgY29uc3QgaW5SYW5nZSA9IGJhci54MCA+PSB2YWx1ZVswXSAmJiBiYXIueDEgPD0gdmFsdWVbMV07XG4gICAgICAgICAgY29uc3QgZmlsbCA9IGluUmFuZ2UgPyBoaXN0b2dyYW1TdHlsZS5oaWdobGlnaHRlZENvbG9yIDogaGlzdG9ncmFtU3R5bGUudW5IaWdobGlnaHRlZENvbG9yO1xuICAgICAgICAgIGNvbnN0IHdSYXRpbyA9IGluUmFuZ2UgPyBoaXN0b2dyYW1TdHlsZS5oaWdobGlnaHRXIDogaGlzdG9ncmFtU3R5bGUudW5IaWdobGlnaHRlZFc7XG5cbiAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPHJlY3RcbiAgICAgICAgICAgICAga2V5PXtiYXIueDB9XG4gICAgICAgICAgICAgIGZpbGw9e2ZpbGx9XG4gICAgICAgICAgICAgIGhlaWdodD17eShiYXIuY291bnQpfVxuICAgICAgICAgICAgICB3aWR0aD17YmFyV2lkdGggKiB3UmF0aW99XG4gICAgICAgICAgICAgIHg9e3goYmFyLngwKSArIGJhcldpZHRoICogKDEgLSB3UmF0aW8pIC8gMn1cbiAgICAgICAgICAgICAgcng9ezF9XG4gICAgICAgICAgICAgIHJ5PXsxfVxuICAgICAgICAgICAgICB5PXtoZWlnaHQgLSB5KGJhci5jb3VudCl9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICk7XG4gICAgICAgIH0pfVxuICAgICAgPC9nPlxuICAgICAge2JydXNoQ29tcG9uZW50fVxuICAgIDwvc3ZnPlxuICApO1xufTtcblxuY29uc3QgTGluZUNoYXJ0V3JhcHBlciA9IHN0eWxlZC5kaXZgXG4gIC5ydi14eS1wbG90X19pbm5lciBwYXRoIHtcbiAgICBmaWxsOiBub25lO1xuICAgIHN0cm9rZS13aWR0aDogMS41O1xuICB9XG5gO1xuXG5jb25zdCBMaW5lQ2hhcnQgPSAoe1xuICB3aWR0aCxcbiAgaGVpZ2h0LFxuICB5RG9tYWluLFxuICBoaW50Rm9ybWF0LFxuICBob3ZlcmVkRFAsXG4gIG1hcmdpbixcbiAgY29sb3IsXG4gIGRhdGEsXG4gIG9uTW91c2VNb3ZlLFxuICBjaGlsZHJlblxufSkgPT4ge1xuICBjb25zdCBicnVzaERhdGEgPSBbXG4gICAge3g6IGRhdGFbMF0ueCwgeTogeURvbWFpblsxXSwgY3VzdG9tQ29tcG9uZW50OiAoKSA9PiBjaGlsZHJlbn1cbiAgXTtcblxuICByZXR1cm4gKFxuICAgIDxMaW5lQ2hhcnRXcmFwcGVyPlxuICAgICAgPFhZUGxvdCB3aWR0aD17d2lkdGh9IGhlaWdodD17aGVpZ2h0fSBtYXJnaW49e3suLi5tYXJnaW4sIGJvdHRvbTogMTJ9fT5cbiAgICAgICAgPExpbmVTZXJpZXNcbiAgICAgICAgICBzdHJva2VXaWR0aD17Mn1cbiAgICAgICAgICBjb2xvcj17Y29sb3J9XG4gICAgICAgICAgZGF0YT17ZGF0YX1cbiAgICAgICAgICBvbk5lYXJlc3RYPXtvbk1vdXNlTW92ZX1cbiAgICAgICAgLz5cbiAgICAgICAgPE1hcmtTZXJpZXNcbiAgICAgICAgICBkYXRhPXtob3ZlcmVkRFAgPyBbaG92ZXJlZERQXSA6IFtdfVxuICAgICAgICAgIGNvbG9yPXtjb2xvcn1cbiAgICAgICAgICBzaXplPXszfVxuICAgICAgICAvPlxuICAgICAgICA8Q3VzdG9tU1ZHU2VyaWVzIGRhdGE9e2JydXNoRGF0YX0gLz5cbiAgICAgICAge2hvdmVyZWREUCA/IChcbiAgICAgICAgICA8SGludCB2YWx1ZT17aG92ZXJlZERQfT5cbiAgICAgICAgICAgIDxIaW50Q29udGVudFxuICAgICAgICAgICAgICB7Li4uaG92ZXJlZERQfVxuICAgICAgICAgICAgICBmb3JtYXQ9e3ZhbCA9PiBtb21lbnQudXRjKHZhbCkuZm9ybWF0KGhpbnRGb3JtYXQpfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA8L0hpbnQ+XG4gICAgICAgICkgOiBudWxsfVxuICAgICAgPC9YWVBsb3Q+XG4gICAgPC9MaW5lQ2hhcnRXcmFwcGVyPlxuICApO1xufTtcblxuY29uc3QgU3R5bGVkSGludCA9IHN0eWxlZC5kaXZgXG4gIGJhY2tncm91bmQtY29sb3I6ICNkM2Q4ZTA7XG4gIGJvcmRlci1yYWRpdXM6IDJweDtcbiAgY29sb3I6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUudGV4dENvbG9yTFR9O1xuICBmb250LXNpemU6IDlweDtcbiAgbWFyZ2luOiA0cHg7XG4gIHBhZGRpbmc6IDNweCA2cHg7XG4gIHBvaW50ZXItZXZlbnRzOiBub25lO1xuICB1c2VyLXNlbGVjdDogbm9uZTtcbmA7XG5jb25zdCBIaW50Q29udGVudCA9ICh7eCwgeSwgZm9ybWF0fSkgPT4gKFxuICA8U3R5bGVkSGludD5cbiAgICA8ZGl2IGNsYXNzTmFtZT1cImhpbnQtLXhcIj57Zm9ybWF0KHgpfTwvZGl2PlxuICAgIDxkaXYgY2xhc3NOYW1lPVwicm93XCI+e3l9PC9kaXY+XG4gIDwvU3R5bGVkSGludD5cbik7XG4iXX0=