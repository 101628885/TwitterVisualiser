'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DefaultColorRange = exports.COLOR_RANGES = undefined;

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _colorbrewer = require('colorbrewer');

var _colorbrewer2 = _interopRequireDefault(_colorbrewer);

var _customColorRanges = require('./custom-color-ranges');

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

var colorBrewerMap = {
  YlGn: _customColorRanges.SEQ,
  YlGnBu: _customColorRanges.SEQ,
  GnBu: _customColorRanges.SEQ,
  BuGn: _customColorRanges.SEQ,
  PuBuGn: _customColorRanges.SEQ,
  PuBu: _customColorRanges.SEQ,
  BuPu: _customColorRanges.SEQ,
  RdPu: _customColorRanges.SEQ,
  PuRd: _customColorRanges.SEQ,
  OrRd: _customColorRanges.SEQ,
  YlOrRd: _customColorRanges.SEQ,
  YlOrBr: _customColorRanges.SEQ,
  Purples: _customColorRanges.SEQ,
  Blues: _customColorRanges.SEQ,
  Greens: _customColorRanges.SEQ,
  Oranges: _customColorRanges.SEQ,
  Reds: _customColorRanges.SEQ,
  Greys: _customColorRanges.SEQ,
  PuOr: _customColorRanges.DIV,
  BrBG: _customColorRanges.DIV,
  PRGn: _customColorRanges.DIV,
  PiYG: _customColorRanges.DIV,
  RdBu: _customColorRanges.DIV,
  RdGy: _customColorRanges.DIV,
  RdYlBu: _customColorRanges.DIV,
  Spectral: _customColorRanges.DIV,
  RdYlGn: _customColorRanges.DIV,
  Accent: _customColorRanges.QUA,
  Dark2: _customColorRanges.QUA,
  Paired: _customColorRanges.QUA,
  Pastel1: _customColorRanges.QUA,
  Pastel2: _customColorRanges.QUA,
  Set1: _customColorRanges.QUA,
  Set2: _customColorRanges.QUA,
  Set3: _customColorRanges.QUA
};

var colorRanges = [].concat((0, _toConsumableArray3.default)(_customColorRanges.VizColorPalette));

// Add colorbrewer color schemes (Data Science requirement)
// See http://colorbrewer2.org/
function entries(obj) {
  return Object.keys(obj).map(function (k) {
    return [k, obj[k]];
  });
}

var _iteratorNormalCompletion = true;
var _didIteratorError = false;
var _iteratorError = undefined;

try {
  for (var _iterator = entries(_colorbrewer2.default)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
    var _step$value = (0, _slicedToArray3.default)(_step.value, 2),
        keyName = _step$value[0],
        colorScheme = _step$value[1];

    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = entries(colorScheme)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var _step2$value = (0, _slicedToArray3.default)(_step2.value, 2),
            lenKey = _step2$value[0],
            colors = _step2$value[1];

        colorRanges.push({
          name: 'ColorBrewer ' + keyName + '-' + lenKey,
          type: colorBrewerMap[keyName],
          category: 'ColorBrewer',
          colors: colors
        });
      }
    } catch (err) {
      _didIteratorError2 = true;
      _iteratorError2 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion2 && _iterator2.return) {
          _iterator2.return();
        }
      } finally {
        if (_didIteratorError2) {
          throw _iteratorError2;
        }
      }
    }
  }
} catch (err) {
  _didIteratorError = true;
  _iteratorError = err;
} finally {
  try {
    if (!_iteratorNormalCompletion && _iterator.return) {
      _iterator.return();
    }
  } finally {
    if (_didIteratorError) {
      throw _iteratorError;
    }
  }
}

var COLOR_RANGES = exports.COLOR_RANGES = colorRanges;

var DefaultColorRange = exports.DefaultColorRange = colorRanges.find(function (_ref) {
  var name = _ref.name;
  return name === 'Global Warming';
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb25zdGFudHMvY29sb3ItcmFuZ2VzLmpzIl0sIm5hbWVzIjpbImNvbG9yQnJld2VyTWFwIiwiWWxHbiIsIlNFUSIsIllsR25CdSIsIkduQnUiLCJCdUduIiwiUHVCdUduIiwiUHVCdSIsIkJ1UHUiLCJSZFB1IiwiUHVSZCIsIk9yUmQiLCJZbE9yUmQiLCJZbE9yQnIiLCJQdXJwbGVzIiwiQmx1ZXMiLCJHcmVlbnMiLCJPcmFuZ2VzIiwiUmVkcyIsIkdyZXlzIiwiUHVPciIsIkRJViIsIkJyQkciLCJQUkduIiwiUGlZRyIsIlJkQnUiLCJSZEd5IiwiUmRZbEJ1IiwiU3BlY3RyYWwiLCJSZFlsR24iLCJBY2NlbnQiLCJRVUEiLCJEYXJrMiIsIlBhaXJlZCIsIlBhc3RlbDEiLCJQYXN0ZWwyIiwiU2V0MSIsIlNldDIiLCJTZXQzIiwiY29sb3JSYW5nZXMiLCJWaXpDb2xvclBhbGV0dGUiLCJlbnRyaWVzIiwib2JqIiwiT2JqZWN0Iiwia2V5cyIsIm1hcCIsImsiLCJjb2xvcmJyZXdlciIsImtleU5hbWUiLCJjb2xvclNjaGVtZSIsImxlbktleSIsImNvbG9ycyIsInB1c2giLCJuYW1lIiwidHlwZSIsImNhdGVnb3J5IiwiQ09MT1JfUkFOR0VTIiwiRGVmYXVsdENvbG9yUmFuZ2UiLCJmaW5kIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFvQkE7Ozs7QUFDQTs7OztBQXJCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFLQSxJQUFNQSxpQkFBaUI7QUFDckJDLFFBQU1DLHNCQURlO0FBRXJCQyxVQUFRRCxzQkFGYTtBQUdyQkUsUUFBTUYsc0JBSGU7QUFJckJHLFFBQU1ILHNCQUplO0FBS3JCSSxVQUFRSixzQkFMYTtBQU1yQkssUUFBTUwsc0JBTmU7QUFPckJNLFFBQU1OLHNCQVBlO0FBUXJCTyxRQUFNUCxzQkFSZTtBQVNyQlEsUUFBTVIsc0JBVGU7QUFVckJTLFFBQU1ULHNCQVZlO0FBV3JCVSxVQUFRVixzQkFYYTtBQVlyQlcsVUFBUVgsc0JBWmE7QUFhckJZLFdBQVNaLHNCQWJZO0FBY3JCYSxTQUFPYixzQkFkYztBQWVyQmMsVUFBUWQsc0JBZmE7QUFnQnJCZSxXQUFTZixzQkFoQlk7QUFpQnJCZ0IsUUFBTWhCLHNCQWpCZTtBQWtCckJpQixTQUFPakIsc0JBbEJjO0FBbUJyQmtCLFFBQU1DLHNCQW5CZTtBQW9CckJDLFFBQU1ELHNCQXBCZTtBQXFCckJFLFFBQU1GLHNCQXJCZTtBQXNCckJHLFFBQU1ILHNCQXRCZTtBQXVCckJJLFFBQU1KLHNCQXZCZTtBQXdCckJLLFFBQU1MLHNCQXhCZTtBQXlCckJNLFVBQVFOLHNCQXpCYTtBQTBCckJPLFlBQVVQLHNCQTFCVztBQTJCckJRLFVBQVFSLHNCQTNCYTtBQTRCckJTLFVBQVFDLHNCQTVCYTtBQTZCckJDLFNBQU9ELHNCQTdCYztBQThCckJFLFVBQVFGLHNCQTlCYTtBQStCckJHLFdBQVNILHNCQS9CWTtBQWdDckJJLFdBQVNKLHNCQWhDWTtBQWlDckJLLFFBQU1MLHNCQWpDZTtBQWtDckJNLFFBQU1OLHNCQWxDZTtBQW1DckJPLFFBQU1QO0FBbkNlLENBQXZCOztBQXNDQSxJQUFNUSx5REFBa0JDLGtDQUFsQixFQUFOOztBQUVBO0FBQ0E7QUFDQSxTQUFTQyxPQUFULENBQWlCQyxHQUFqQixFQUFzQjtBQUNwQixTQUFPQyxPQUFPQyxJQUFQLENBQVlGLEdBQVosRUFBaUJHLEdBQWpCLENBQXFCO0FBQUEsV0FBSyxDQUFDQyxDQUFELEVBQUlKLElBQUlJLENBQUosQ0FBSixDQUFMO0FBQUEsR0FBckIsQ0FBUDtBQUNEOzs7Ozs7O0FBRUQsdUJBQXFDTCxRQUFRTSxxQkFBUixDQUFyQyw4SEFBMkQ7QUFBQTtBQUFBLFFBQS9DQyxPQUErQztBQUFBLFFBQXRDQyxXQUFzQzs7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFDekQsNEJBQStCUixRQUFRUSxXQUFSLENBQS9CLG1JQUFxRDtBQUFBO0FBQUEsWUFBekNDLE1BQXlDO0FBQUEsWUFBakNDLE1BQWlDOztBQUNuRFosb0JBQVlhLElBQVosQ0FBaUI7QUFDZkMsaUNBQXFCTCxPQUFyQixTQUFnQ0UsTUFEakI7QUFFZkksZ0JBQU10RCxlQUFlZ0QsT0FBZixDQUZTO0FBR2ZPLG9CQUFVLGFBSEs7QUFJZko7QUFKZSxTQUFqQjtBQU1EO0FBUndEO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFTMUQ7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFTSxJQUFNSyxzQ0FBZWpCLFdBQXJCOztBQUVBLElBQU1rQixnREFBb0JsQixZQUFZbUIsSUFBWixDQUMvQjtBQUFBLE1BQUVMLElBQUYsUUFBRUEsSUFBRjtBQUFBLFNBQVlBLFNBQVMsZ0JBQXJCO0FBQUEsQ0FEK0IsQ0FBMUIiLCJmaWxlIjoiY29sb3ItcmFuZ2VzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSAyMDE4IFViZXIgVGVjaG5vbG9naWVzLCBJbmMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuLy8gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuLy8gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuLy8gdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuLy8gY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4vLyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4vLyBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4vLyBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbi8vIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuLy8gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuLy8gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbi8vIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbi8vIFRIRSBTT0ZUV0FSRS5cblxuaW1wb3J0IGNvbG9yYnJld2VyIGZyb20gJ2NvbG9yYnJld2VyJztcbmltcG9ydCB7U0VRLCBRVUEsIERJViwgVml6Q29sb3JQYWxldHRlfSBmcm9tICcuL2N1c3RvbS1jb2xvci1yYW5nZXMnO1xuXG5jb25zdCBjb2xvckJyZXdlck1hcCA9IHtcbiAgWWxHbjogU0VRLFxuICBZbEduQnU6IFNFUSxcbiAgR25CdTogU0VRLFxuICBCdUduOiBTRVEsXG4gIFB1QnVHbjogU0VRLFxuICBQdUJ1OiBTRVEsXG4gIEJ1UHU6IFNFUSxcbiAgUmRQdTogU0VRLFxuICBQdVJkOiBTRVEsXG4gIE9yUmQ6IFNFUSxcbiAgWWxPclJkOiBTRVEsXG4gIFlsT3JCcjogU0VRLFxuICBQdXJwbGVzOiBTRVEsXG4gIEJsdWVzOiBTRVEsXG4gIEdyZWVuczogU0VRLFxuICBPcmFuZ2VzOiBTRVEsXG4gIFJlZHM6IFNFUSxcbiAgR3JleXM6IFNFUSxcbiAgUHVPcjogRElWLFxuICBCckJHOiBESVYsXG4gIFBSR246IERJVixcbiAgUGlZRzogRElWLFxuICBSZEJ1OiBESVYsXG4gIFJkR3k6IERJVixcbiAgUmRZbEJ1OiBESVYsXG4gIFNwZWN0cmFsOiBESVYsXG4gIFJkWWxHbjogRElWLFxuICBBY2NlbnQ6IFFVQSxcbiAgRGFyazI6IFFVQSxcbiAgUGFpcmVkOiBRVUEsXG4gIFBhc3RlbDE6IFFVQSxcbiAgUGFzdGVsMjogUVVBLFxuICBTZXQxOiBRVUEsXG4gIFNldDI6IFFVQSxcbiAgU2V0MzogUVVBXG59O1xuXG5jb25zdCBjb2xvclJhbmdlcyA9IFsuLi5WaXpDb2xvclBhbGV0dGVdO1xuXG4vLyBBZGQgY29sb3JicmV3ZXIgY29sb3Igc2NoZW1lcyAoRGF0YSBTY2llbmNlIHJlcXVpcmVtZW50KVxuLy8gU2VlIGh0dHA6Ly9jb2xvcmJyZXdlcjIub3JnL1xuZnVuY3Rpb24gZW50cmllcyhvYmopIHtcbiAgcmV0dXJuIE9iamVjdC5rZXlzKG9iaikubWFwKGsgPT4gW2ssIG9ialtrXV0pO1xufVxuXG5mb3IgKGNvbnN0IFtrZXlOYW1lLCBjb2xvclNjaGVtZV0gb2YgZW50cmllcyhjb2xvcmJyZXdlcikpIHtcbiAgZm9yIChjb25zdCBbbGVuS2V5LCBjb2xvcnNdIG9mIGVudHJpZXMoY29sb3JTY2hlbWUpKSB7XG4gICAgY29sb3JSYW5nZXMucHVzaCh7XG4gICAgICBuYW1lOiBgQ29sb3JCcmV3ZXIgJHtrZXlOYW1lfS0ke2xlbktleX1gLFxuICAgICAgdHlwZTogY29sb3JCcmV3ZXJNYXBba2V5TmFtZV0sXG4gICAgICBjYXRlZ29yeTogJ0NvbG9yQnJld2VyJyxcbiAgICAgIGNvbG9yc1xuICAgIH0pO1xuICB9XG59XG5cbmV4cG9ydCBjb25zdCBDT0xPUl9SQU5HRVMgPSBjb2xvclJhbmdlcztcblxuZXhwb3J0IGNvbnN0IERlZmF1bHRDb2xvclJhbmdlID0gY29sb3JSYW5nZXMuZmluZChcbiAgKHtuYW1lfSkgPT4gbmFtZSA9PT0gJ0dsb2JhbCBXYXJtaW5nJ1xuKTtcbiJdfQ==