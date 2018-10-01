'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _rangeSlider = require('../common/range-slider');

var _rangeSlider2 = _interopRequireDefault(_rangeSlider);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

var RangeFilter = function RangeFilter(_ref) {
  var filter = _ref.filter,
      setFilter = _ref.setFilter;
  return _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(_rangeSlider2.default, {
      range: filter.domain,
      value0: filter.value[0],
      value1: filter.value[1],
      step: filter.step,
      histogram: filter.histogram,
      isEnlarged: filter.isEnlarged,
      onChange: setFilter,
      inputTheme: 'secondary'
    })
  );
};

exports.default = RangeFilter;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2ZpbHRlcnMvcmFuZ2UtZmlsdGVyLmpzIl0sIm5hbWVzIjpbIlJhbmdlRmlsdGVyIiwiZmlsdGVyIiwic2V0RmlsdGVyIiwiZG9tYWluIiwidmFsdWUiLCJzdGVwIiwiaGlzdG9ncmFtIiwiaXNFbmxhcmdlZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBb0JBOzs7O0FBQ0E7Ozs7OztBQXJCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFLQSxJQUFNQSxjQUFjLFNBQWRBLFdBQWM7QUFBQSxNQUFFQyxNQUFGLFFBQUVBLE1BQUY7QUFBQSxNQUFVQyxTQUFWLFFBQVVBLFNBQVY7QUFBQSxTQUNsQjtBQUFBO0FBQUE7QUFDRSxrQ0FBQyxxQkFBRDtBQUNFLGFBQU9ELE9BQU9FLE1BRGhCO0FBRUUsY0FBUUYsT0FBT0csS0FBUCxDQUFhLENBQWIsQ0FGVjtBQUdFLGNBQVFILE9BQU9HLEtBQVAsQ0FBYSxDQUFiLENBSFY7QUFJRSxZQUFNSCxPQUFPSSxJQUpmO0FBS0UsaUJBQVdKLE9BQU9LLFNBTHBCO0FBTUUsa0JBQVlMLE9BQU9NLFVBTnJCO0FBT0UsZ0JBQVVMLFNBUFo7QUFRRSxrQkFBVztBQVJiO0FBREYsR0FEa0I7QUFBQSxDQUFwQjs7a0JBZWVGLFciLCJmaWxlIjoicmFuZ2UtZmlsdGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSAyMDE4IFViZXIgVGVjaG5vbG9naWVzLCBJbmMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuLy8gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuLy8gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuLy8gdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuLy8gY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4vLyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4vLyBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4vLyBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbi8vIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuLy8gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuLy8gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbi8vIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbi8vIFRIRSBTT0ZUV0FSRS5cblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBSYW5nZVNsaWRlciBmcm9tICdjb21wb25lbnRzL2NvbW1vbi9yYW5nZS1zbGlkZXInO1xuXG5jb25zdCBSYW5nZUZpbHRlciA9ICh7ZmlsdGVyLCBzZXRGaWx0ZXJ9KSA9PiAoXG4gIDxkaXY+XG4gICAgPFJhbmdlU2xpZGVyXG4gICAgICByYW5nZT17ZmlsdGVyLmRvbWFpbn1cbiAgICAgIHZhbHVlMD17ZmlsdGVyLnZhbHVlWzBdfVxuICAgICAgdmFsdWUxPXtmaWx0ZXIudmFsdWVbMV19XG4gICAgICBzdGVwPXtmaWx0ZXIuc3RlcH1cbiAgICAgIGhpc3RvZ3JhbT17ZmlsdGVyLmhpc3RvZ3JhbX1cbiAgICAgIGlzRW5sYXJnZWQ9e2ZpbHRlci5pc0VubGFyZ2VkfVxuICAgICAgb25DaGFuZ2U9e3NldEZpbHRlcn1cbiAgICAgIGlucHV0VGhlbWU9XCJzZWNvbmRhcnlcIlxuICAgIC8+XG4gIDwvZGl2PlxuKTtcblxuZXhwb3J0IGRlZmF1bHQgUmFuZ2VGaWx0ZXI7XG4iXX0=