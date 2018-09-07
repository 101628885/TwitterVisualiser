'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _timeRangeSlider = require('../common/time-range-slider');

var _timeRangeSlider2 = _interopRequireDefault(_timeRangeSlider);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * TimeRangeFilter -> TimeRangeSlider -> RangeSlider
 */
// Copyright (c) 2018 Uber Technologies, Inc.
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

var TimeRangeFilter = function TimeRangeFilter(_ref) {
  var filter = _ref.filter,
      setFilter = _ref.setFilter,
      isAnyFilterAnimating = _ref.isAnyFilterAnimating,
      toggleAnimation = _ref.toggleAnimation;
  return _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(_timeRangeSlider2.default, {
      domain: filter.domain,
      value: filter.value,
      plotType: filter.plotType,
      lineChart: filter.lineChart,
      step: filter.step,
      speed: filter.speed,
      histogram: filter.enlarged ? filter.enlargedHistogram : filter.histogram,
      onChange: setFilter,
      toggleAnimation: toggleAnimation,
      isAnimatable: !isAnyFilterAnimating || filter.isAnimating,
      isEnlarged: filter.enlarged
    })
  );
};

exports.default = TimeRangeFilter;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2ZpbHRlcnMvdGltZS1yYW5nZS1maWx0ZXIuanMiXSwibmFtZXMiOlsiVGltZVJhbmdlRmlsdGVyIiwiZmlsdGVyIiwic2V0RmlsdGVyIiwiaXNBbnlGaWx0ZXJBbmltYXRpbmciLCJ0b2dnbGVBbmltYXRpb24iLCJkb21haW4iLCJ2YWx1ZSIsInBsb3RUeXBlIiwibGluZUNoYXJ0Iiwic3RlcCIsInNwZWVkIiwiZW5sYXJnZWQiLCJlbmxhcmdlZEhpc3RvZ3JhbSIsImhpc3RvZ3JhbSIsImlzQW5pbWF0aW5nIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFvQkE7Ozs7QUFDQTs7Ozs7O0FBRUE7OztBQXZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFRQSxJQUFNQSxrQkFBa0IsU0FBbEJBLGVBQWtCO0FBQUEsTUFDdEJDLE1BRHNCLFFBQ3RCQSxNQURzQjtBQUFBLE1BRXRCQyxTQUZzQixRQUV0QkEsU0FGc0I7QUFBQSxNQUd0QkMsb0JBSHNCLFFBR3RCQSxvQkFIc0I7QUFBQSxNQUl0QkMsZUFKc0IsUUFJdEJBLGVBSnNCO0FBQUEsU0FNdEI7QUFBQTtBQUFBO0FBQ0Usa0NBQUMseUJBQUQ7QUFDRSxjQUFRSCxPQUFPSSxNQURqQjtBQUVFLGFBQU9KLE9BQU9LLEtBRmhCO0FBR0UsZ0JBQVVMLE9BQU9NLFFBSG5CO0FBSUUsaUJBQVdOLE9BQU9PLFNBSnBCO0FBS0UsWUFBTVAsT0FBT1EsSUFMZjtBQU1FLGFBQU9SLE9BQU9TLEtBTmhCO0FBT0UsaUJBQVdULE9BQU9VLFFBQVAsR0FBa0JWLE9BQU9XLGlCQUF6QixHQUE2Q1gsT0FBT1ksU0FQakU7QUFRRSxnQkFBVVgsU0FSWjtBQVNFLHVCQUFpQkUsZUFUbkI7QUFVRSxvQkFBYyxDQUFDRCxvQkFBRCxJQUF5QkYsT0FBT2EsV0FWaEQ7QUFXRSxrQkFBWWIsT0FBT1U7QUFYckI7QUFERixHQU5zQjtBQUFBLENBQXhCOztrQkF1QmVYLGUiLCJmaWxlIjoidGltZS1yYW5nZS1maWx0ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIDIwMTggVWJlciBUZWNobm9sb2dpZXMsIEluYy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4vLyBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4vLyBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4vLyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4vLyBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbi8vIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbi8vIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1Jcbi8vIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuLy8gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4vLyBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4vLyBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuLy8gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuLy8gVEhFIFNPRlRXQVJFLlxuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFRpbWVSYW5nZVNsaWRlciBmcm9tICdjb21wb25lbnRzL2NvbW1vbi90aW1lLXJhbmdlLXNsaWRlcic7XG5cbi8qXG4gKiBUaW1lUmFuZ2VGaWx0ZXIgLT4gVGltZVJhbmdlU2xpZGVyIC0+IFJhbmdlU2xpZGVyXG4gKi9cbmNvbnN0IFRpbWVSYW5nZUZpbHRlciA9ICh7XG4gIGZpbHRlcixcbiAgc2V0RmlsdGVyLFxuICBpc0FueUZpbHRlckFuaW1hdGluZyxcbiAgdG9nZ2xlQW5pbWF0aW9uXG59KSA9PiAoXG4gIDxkaXY+XG4gICAgPFRpbWVSYW5nZVNsaWRlclxuICAgICAgZG9tYWluPXtmaWx0ZXIuZG9tYWlufVxuICAgICAgdmFsdWU9e2ZpbHRlci52YWx1ZX1cbiAgICAgIHBsb3RUeXBlPXtmaWx0ZXIucGxvdFR5cGV9XG4gICAgICBsaW5lQ2hhcnQ9e2ZpbHRlci5saW5lQ2hhcnR9XG4gICAgICBzdGVwPXtmaWx0ZXIuc3RlcH1cbiAgICAgIHNwZWVkPXtmaWx0ZXIuc3BlZWR9XG4gICAgICBoaXN0b2dyYW09e2ZpbHRlci5lbmxhcmdlZCA/IGZpbHRlci5lbmxhcmdlZEhpc3RvZ3JhbSA6IGZpbHRlci5oaXN0b2dyYW19XG4gICAgICBvbkNoYW5nZT17c2V0RmlsdGVyfVxuICAgICAgdG9nZ2xlQW5pbWF0aW9uPXt0b2dnbGVBbmltYXRpb259XG4gICAgICBpc0FuaW1hdGFibGU9eyFpc0FueUZpbHRlckFuaW1hdGluZyB8fCBmaWx0ZXIuaXNBbmltYXRpbmd9XG4gICAgICBpc0VubGFyZ2VkPXtmaWx0ZXIuZW5sYXJnZWR9XG4gICAgLz5cbiAgPC9kaXY+XG4pO1xuXG5leHBvcnQgZGVmYXVsdCBUaW1lUmFuZ2VGaWx0ZXI7XG4iXX0=