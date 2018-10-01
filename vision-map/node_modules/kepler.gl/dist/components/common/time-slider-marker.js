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

var _templateObject = (0, _taggedTemplateLiteral3.default)(['\n  pointer-events: none;\n  position: absolute;\n  top: 0;\n  .axis text {\n    font-size: 9px;\n    fill: ', ';\n  }\n\n  .axis line,\n  .axis path {\n    fill: none;\n    stroke: ', ';\n    shape-rendering: crispEdges;\n    stroke-width: 2;\n  }\n\n  .axis .domain {\n    display: none;\n  }\n\n  .value {\n    fill: ', ';\n    font-size: 10px;\n\n    &.start {\n      text-anchor: start;\n    }\n\n    &.end {\n      text-anchor: end;\n    }\n  }\n'], ['\n  pointer-events: none;\n  position: absolute;\n  top: 0;\n  .axis text {\n    font-size: 9px;\n    fill: ', ';\n  }\n\n  .axis line,\n  .axis path {\n    fill: none;\n    stroke: ', ';\n    shape-rendering: crispEdges;\n    stroke-width: 2;\n  }\n\n  .axis .domain {\n    display: none;\n  }\n\n  .value {\n    fill: ', ';\n    font-size: 10px;\n\n    &.start {\n      text-anchor: start;\n    }\n\n    &.end {\n      text-anchor: end;\n    }\n  }\n']); // Copyright (c) 2018 Uber Technologies, Inc.
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

var _d3Scale = require('d3-scale');

var _d3Selection = require('d3-selection');

var _d3Axis = require('d3-axis');

var _reselect = require('reselect');

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TimeSliderContainer = _styledComponents2.default.svg(_templateObject, function (props) {
  return props.theme.textColor;
}, function (props) {
  return props.theme.sliderBarBgd;
}, function (props) {
  return props.theme.textColor;
});

var height = 30;

var TimeSliderMarker = (_temp2 = _class = function (_Component) {
  (0, _inherits3.default)(TimeSliderMarker, _Component);

  function TimeSliderMarker() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, TimeSliderMarker);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = TimeSliderMarker.__proto__ || Object.getPrototypeOf(TimeSliderMarker)).call.apply(_ref, [this].concat(args))), _this), _this.domainSelector = function (props) {
      return props.domain;
    }, _this.widthSelector = function (props) {
      return props.width;
    }, _this.scaleSelector = (0, _reselect.createSelector)(_this.domainSelector, _this.widthSelector, function (domain, width) {
      return Array.isArray(domain) ? (0, _d3Scale.scaleUtc)().domain(domain).range([0, width]) : null;
    }), _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(TimeSliderMarker, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this._updateAxis(this.scaleSelector(this.props));
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (this.scaleSelector(this.props) !== this.scaleSelector(nextProps)) {
        this._updateAxis(this.scaleSelector(nextProps));
      }
    }
  }, {
    key: '_updateAxis',
    value: function _updateAxis(scale) {
      if (!scale) {
        return;
      }
      var xAxis = (0, _d3Axis.axisBottom)(scale).ticks(4).tickSize(8).tickPadding(6);

      var svg = (0, _d3Selection.select)(this.svgContainer);

      svg.select('.x.axis').call(xAxis).selectAll('text');
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement(
        TimeSliderContainer,
        {
          className: 'time-slider-marker',
          width: this.props.width,
          height: height,
          innerRef: function innerRef(comp) {
            _this2.svgContainer = comp;
          }
        },
        _react2.default.createElement('g', { className: 'x axis', transform: 'translate(0, 0)' })
      );
    }
  }]);
  return TimeSliderMarker;
}(_react.Component), _class.propTypes = {
  domain: _propTypes2.default.arrayOf(_propTypes2.default.any).isRequired,
  width: _propTypes2.default.number.isRequired
}, _temp2);
exports.default = TimeSliderMarker;
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2NvbW1vbi90aW1lLXNsaWRlci1tYXJrZXIuanMiXSwibmFtZXMiOlsiVGltZVNsaWRlckNvbnRhaW5lciIsInN0eWxlZCIsInN2ZyIsInByb3BzIiwidGhlbWUiLCJ0ZXh0Q29sb3IiLCJzbGlkZXJCYXJCZ2QiLCJoZWlnaHQiLCJUaW1lU2xpZGVyTWFya2VyIiwiZG9tYWluU2VsZWN0b3IiLCJkb21haW4iLCJ3aWR0aFNlbGVjdG9yIiwid2lkdGgiLCJzY2FsZVNlbGVjdG9yIiwiQXJyYXkiLCJpc0FycmF5IiwicmFuZ2UiLCJfdXBkYXRlQXhpcyIsIm5leHRQcm9wcyIsInNjYWxlIiwieEF4aXMiLCJ0aWNrcyIsInRpY2tTaXplIiwidGlja1BhZGRpbmciLCJzdmdDb250YWluZXIiLCJzZWxlY3QiLCJjYWxsIiwic2VsZWN0QWxsIiwiY29tcCIsIkNvbXBvbmVudCIsInByb3BUeXBlcyIsIlByb3BUeXBlcyIsImFycmF5T2YiLCJhbnkiLCJpc1JlcXVpcmVkIiwibnVtYmVyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztnOUJBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7QUFDQTs7OztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOzs7Ozs7QUFFQSxJQUFNQSxzQkFBc0JDLDJCQUFPQyxHQUE3QixrQkFNTTtBQUFBLFNBQVNDLE1BQU1DLEtBQU4sQ0FBWUMsU0FBckI7QUFBQSxDQU5OLEVBWVE7QUFBQSxTQUFTRixNQUFNQyxLQUFOLENBQVlFLFlBQXJCO0FBQUEsQ0FaUixFQXNCTTtBQUFBLFNBQVNILE1BQU1DLEtBQU4sQ0FBWUMsU0FBckI7QUFBQSxDQXRCTixDQUFOOztBQW1DQSxJQUFNRSxTQUFTLEVBQWY7O0lBRXFCQyxnQjs7Ozs7Ozs7Ozs7Ozs7d05BZ0JuQkMsYyxHQUFpQjtBQUFBLGFBQVNOLE1BQU1PLE1BQWY7QUFBQSxLLFFBQ2pCQyxhLEdBQWdCO0FBQUEsYUFBU1IsTUFBTVMsS0FBZjtBQUFBLEssUUFDaEJDLGEsR0FBZ0IsOEJBQ2QsTUFBS0osY0FEUyxFQUVkLE1BQUtFLGFBRlMsRUFHZCxVQUFDRCxNQUFELEVBQVNFLEtBQVQ7QUFBQSxhQUNFRSxNQUFNQyxPQUFOLENBQWNMLE1BQWQsSUFDSSx5QkFDR0EsTUFESCxDQUNVQSxNQURWLEVBRUdNLEtBRkgsQ0FFUyxDQUFDLENBQUQsRUFBSUosS0FBSixDQUZULENBREosR0FJSSxJQUxOO0FBQUEsS0FIYyxDOzs7Ozt3Q0FaSTtBQUNsQixXQUFLSyxXQUFMLENBQWlCLEtBQUtKLGFBQUwsQ0FBbUIsS0FBS1YsS0FBeEIsQ0FBakI7QUFDRDs7OzhDQUV5QmUsUyxFQUFXO0FBQ25DLFVBQUksS0FBS0wsYUFBTCxDQUFtQixLQUFLVixLQUF4QixNQUFtQyxLQUFLVSxhQUFMLENBQW1CSyxTQUFuQixDQUF2QyxFQUFzRTtBQUNwRSxhQUFLRCxXQUFMLENBQWlCLEtBQUtKLGFBQUwsQ0FBbUJLLFNBQW5CLENBQWpCO0FBQ0Q7QUFDRjs7O2dDQWVXQyxLLEVBQU87QUFDakIsVUFBSSxDQUFDQSxLQUFMLEVBQVk7QUFDVjtBQUNEO0FBQ0QsVUFBTUMsUUFBUSx3QkFBV0QsS0FBWCxFQUNYRSxLQURXLENBQ0wsQ0FESyxFQUVYQyxRQUZXLENBRUYsQ0FGRSxFQUdYQyxXQUhXLENBR0MsQ0FIRCxDQUFkOztBQUtBLFVBQU1yQixNQUFNLHlCQUFPLEtBQUtzQixZQUFaLENBQVo7O0FBRUF0QixVQUNHdUIsTUFESCxDQUNVLFNBRFYsRUFFR0MsSUFGSCxDQUVRTixLQUZSLEVBR0dPLFNBSEgsQ0FHYSxNQUhiO0FBSUQ7Ozs2QkFFUTtBQUFBOztBQUNQLGFBQ0U7QUFBQywyQkFBRDtBQUFBO0FBQ0UscUJBQVUsb0JBRFo7QUFFRSxpQkFBTyxLQUFLeEIsS0FBTCxDQUFXUyxLQUZwQjtBQUdFLGtCQUFRTCxNQUhWO0FBSUUsb0JBQVUsd0JBQVE7QUFDaEIsbUJBQUtpQixZQUFMLEdBQW9CSSxJQUFwQjtBQUNEO0FBTkg7QUFRRSw2Q0FBRyxXQUFVLFFBQWIsRUFBc0IsV0FBVSxpQkFBaEM7QUFSRixPQURGO0FBWUQ7OztFQTNEMkNDLGdCLFVBQ3JDQyxTLEdBQVk7QUFDakJwQixVQUFRcUIsb0JBQVVDLE9BQVYsQ0FBa0JELG9CQUFVRSxHQUE1QixFQUFpQ0MsVUFEeEI7QUFFakJ0QixTQUFPbUIsb0JBQVVJLE1BQVYsQ0FBaUJEO0FBRlAsQztrQkFEQTFCLGdCO0FBNERwQiIsImZpbGUiOiJ0aW1lLXNsaWRlci1tYXJrZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIDIwMTggVWJlciBUZWNobm9sb2dpZXMsIEluYy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4vLyBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4vLyBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4vLyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4vLyBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbi8vIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbi8vIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1Jcbi8vIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuLy8gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4vLyBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4vLyBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuLy8gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuLy8gVEhFIFNPRlRXQVJFLlxuXG5pbXBvcnQgUmVhY3QsIHtDb21wb25lbnR9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQge3NjYWxlVXRjfSBmcm9tICdkMy1zY2FsZSc7XG5pbXBvcnQge3NlbGVjdH0gZnJvbSAnZDMtc2VsZWN0aW9uJztcbmltcG9ydCB7YXhpc0JvdHRvbX0gZnJvbSAnZDMtYXhpcyc7XG5pbXBvcnQge2NyZWF0ZVNlbGVjdG9yfSBmcm9tICdyZXNlbGVjdCc7XG5pbXBvcnQgc3R5bGVkIGZyb20gJ3N0eWxlZC1jb21wb25lbnRzJztcblxuY29uc3QgVGltZVNsaWRlckNvbnRhaW5lciA9IHN0eWxlZC5zdmdgXG4gIHBvaW50ZXItZXZlbnRzOiBub25lO1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHRvcDogMDtcbiAgLmF4aXMgdGV4dCB7XG4gICAgZm9udC1zaXplOiA5cHg7XG4gICAgZmlsbDogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS50ZXh0Q29sb3J9O1xuICB9XG5cbiAgLmF4aXMgbGluZSxcbiAgLmF4aXMgcGF0aCB7XG4gICAgZmlsbDogbm9uZTtcbiAgICBzdHJva2U6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUuc2xpZGVyQmFyQmdkfTtcbiAgICBzaGFwZS1yZW5kZXJpbmc6IGNyaXNwRWRnZXM7XG4gICAgc3Ryb2tlLXdpZHRoOiAyO1xuICB9XG5cbiAgLmF4aXMgLmRvbWFpbiB7XG4gICAgZGlzcGxheTogbm9uZTtcbiAgfVxuXG4gIC52YWx1ZSB7XG4gICAgZmlsbDogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS50ZXh0Q29sb3J9O1xuICAgIGZvbnQtc2l6ZTogMTBweDtcblxuICAgICYuc3RhcnQge1xuICAgICAgdGV4dC1hbmNob3I6IHN0YXJ0O1xuICAgIH1cblxuICAgICYuZW5kIHtcbiAgICAgIHRleHQtYW5jaG9yOiBlbmQ7XG4gICAgfVxuICB9XG5gO1xuXG5jb25zdCBoZWlnaHQgPSAzMDtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGltZVNsaWRlck1hcmtlciBleHRlbmRzIENvbXBvbmVudCB7XG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgZG9tYWluOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMuYW55KS5pc1JlcXVpcmVkLFxuICAgIHdpZHRoOiBQcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWRcbiAgfTtcblxuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICB0aGlzLl91cGRhdGVBeGlzKHRoaXMuc2NhbGVTZWxlY3Rvcih0aGlzLnByb3BzKSk7XG4gIH1cblxuICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRQcm9wcykge1xuICAgIGlmICh0aGlzLnNjYWxlU2VsZWN0b3IodGhpcy5wcm9wcykgIT09IHRoaXMuc2NhbGVTZWxlY3RvcihuZXh0UHJvcHMpKSB7XG4gICAgICB0aGlzLl91cGRhdGVBeGlzKHRoaXMuc2NhbGVTZWxlY3RvcihuZXh0UHJvcHMpKTtcbiAgICB9XG4gIH1cblxuICBkb21haW5TZWxlY3RvciA9IHByb3BzID0+IHByb3BzLmRvbWFpbjtcbiAgd2lkdGhTZWxlY3RvciA9IHByb3BzID0+IHByb3BzLndpZHRoO1xuICBzY2FsZVNlbGVjdG9yID0gY3JlYXRlU2VsZWN0b3IoXG4gICAgdGhpcy5kb21haW5TZWxlY3RvcixcbiAgICB0aGlzLndpZHRoU2VsZWN0b3IsXG4gICAgKGRvbWFpbiwgd2lkdGgpID0+XG4gICAgICBBcnJheS5pc0FycmF5KGRvbWFpbilcbiAgICAgICAgPyBzY2FsZVV0YygpXG4gICAgICAgICAgICAuZG9tYWluKGRvbWFpbilcbiAgICAgICAgICAgIC5yYW5nZShbMCwgd2lkdGhdKVxuICAgICAgICA6IG51bGxcbiAgKTtcblxuICBfdXBkYXRlQXhpcyhzY2FsZSkge1xuICAgIGlmICghc2NhbGUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgeEF4aXMgPSBheGlzQm90dG9tKHNjYWxlKVxuICAgICAgLnRpY2tzKDQpXG4gICAgICAudGlja1NpemUoOClcbiAgICAgIC50aWNrUGFkZGluZyg2KTtcblxuICAgIGNvbnN0IHN2ZyA9IHNlbGVjdCh0aGlzLnN2Z0NvbnRhaW5lcik7XG5cbiAgICBzdmdcbiAgICAgIC5zZWxlY3QoJy54LmF4aXMnKVxuICAgICAgLmNhbGwoeEF4aXMpXG4gICAgICAuc2VsZWN0QWxsKCd0ZXh0Jyk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxUaW1lU2xpZGVyQ29udGFpbmVyXG4gICAgICAgIGNsYXNzTmFtZT1cInRpbWUtc2xpZGVyLW1hcmtlclwiXG4gICAgICAgIHdpZHRoPXt0aGlzLnByb3BzLndpZHRofVxuICAgICAgICBoZWlnaHQ9e2hlaWdodH1cbiAgICAgICAgaW5uZXJSZWY9e2NvbXAgPT4ge1xuICAgICAgICAgIHRoaXMuc3ZnQ29udGFpbmVyID0gY29tcDtcbiAgICAgICAgfX1cbiAgICAgID5cbiAgICAgICAgPGcgY2xhc3NOYW1lPVwieCBheGlzXCIgdHJhbnNmb3JtPVwidHJhbnNsYXRlKDAsIDApXCIgLz5cbiAgICAgIDwvVGltZVNsaWRlckNvbnRhaW5lcj5cbiAgICApO1xuICB9XG59O1xuIl19