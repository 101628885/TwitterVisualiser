'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

exports.hexToRgb = hexToRgb;
exports.rgbToHex = rgbToHex;

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

/**
 * get r g b from hex code
 *
 * @param {string} hex
 * @returns {array} array of r g bs
 */
function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

  var r = parseInt(result[1], 16);
  var g = parseInt(result[2], 16);
  var b = parseInt(result[3], 16);

  return [r, g, b];
}

function PadNum(c) {
  var hex = c.toString(16);
  return hex.length === 1 ? '0' + hex : hex;
}

/**
 * get hex from r g b
 *
 * @param {array} rgb
 * @returns {string} hex string
 */
function rgbToHex(_ref) {
  var _ref2 = (0, _slicedToArray3.default)(_ref, 3),
      r = _ref2[0],
      g = _ref2[1],
      b = _ref2[2];

  return ('#' + [r, g, b].map(function (n) {
    return PadNum(n);
  }).join('')).toUpperCase();
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9jb2xvci11dGlscy5qcyJdLCJuYW1lcyI6WyJoZXhUb1JnYiIsInJnYlRvSGV4IiwiaGV4IiwicmVzdWx0IiwiZXhlYyIsInIiLCJwYXJzZUludCIsImciLCJiIiwiUGFkTnVtIiwiYyIsInRvU3RyaW5nIiwibGVuZ3RoIiwibWFwIiwibiIsImpvaW4iLCJ0b1VwcGVyQ2FzZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztRQTBCZ0JBLFEsR0FBQUEsUTtRQXFCQUMsUSxHQUFBQSxROzs7O0FBL0NoQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7O0FBTU8sU0FBU0QsUUFBVCxDQUFrQkUsR0FBbEIsRUFBdUI7QUFDNUIsTUFBTUMsU0FBUyw0Q0FBNENDLElBQTVDLENBQWlERixHQUFqRCxDQUFmOztBQUVBLE1BQU1HLElBQUlDLFNBQVNILE9BQU8sQ0FBUCxDQUFULEVBQW9CLEVBQXBCLENBQVY7QUFDQSxNQUFNSSxJQUFJRCxTQUFTSCxPQUFPLENBQVAsQ0FBVCxFQUFvQixFQUFwQixDQUFWO0FBQ0EsTUFBTUssSUFBSUYsU0FBU0gsT0FBTyxDQUFQLENBQVQsRUFBb0IsRUFBcEIsQ0FBVjs7QUFFQSxTQUFPLENBQUNFLENBQUQsRUFBSUUsQ0FBSixFQUFPQyxDQUFQLENBQVA7QUFDRDs7QUFFRCxTQUFTQyxNQUFULENBQWdCQyxDQUFoQixFQUFtQjtBQUNqQixNQUFNUixNQUFNUSxFQUFFQyxRQUFGLENBQVcsRUFBWCxDQUFaO0FBQ0EsU0FBT1QsSUFBSVUsTUFBSixLQUFlLENBQWYsU0FBdUJWLEdBQXZCLEdBQStCQSxHQUF0QztBQUNEOztBQUVEOzs7Ozs7QUFNTyxTQUFTRCxRQUFULE9BQTZCO0FBQUE7QUFBQSxNQUFWSSxDQUFVO0FBQUEsTUFBUEUsQ0FBTztBQUFBLE1BQUpDLENBQUk7O0FBQ2xDLFNBQU8sT0FBSSxDQUFDSCxDQUFELEVBQUlFLENBQUosRUFBT0MsQ0FBUCxFQUFVSyxHQUFWLENBQWM7QUFBQSxXQUFLSixPQUFPSyxDQUFQLENBQUw7QUFBQSxHQUFkLEVBQThCQyxJQUE5QixDQUFtQyxFQUFuQyxDQUFKLEVBQTZDQyxXQUE3QyxFQUFQO0FBQ0QiLCJmaWxlIjoiY29sb3ItdXRpbHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIDIwMTggVWJlciBUZWNobm9sb2dpZXMsIEluYy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4vLyBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4vLyBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4vLyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4vLyBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbi8vIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbi8vIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1Jcbi8vIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuLy8gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4vLyBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4vLyBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuLy8gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuLy8gVEhFIFNPRlRXQVJFLlxuXG4vKipcbiAqIGdldCByIGcgYiBmcm9tIGhleCBjb2RlXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGhleFxuICogQHJldHVybnMge2FycmF5fSBhcnJheSBvZiByIGcgYnNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGhleFRvUmdiKGhleCkge1xuICBjb25zdCByZXN1bHQgPSAvXiM/KFthLWZcXGRdezJ9KShbYS1mXFxkXXsyfSkoW2EtZlxcZF17Mn0pJC9pLmV4ZWMoaGV4KTtcblxuICBjb25zdCByID0gcGFyc2VJbnQocmVzdWx0WzFdLCAxNik7XG4gIGNvbnN0IGcgPSBwYXJzZUludChyZXN1bHRbMl0sIDE2KTtcbiAgY29uc3QgYiA9IHBhcnNlSW50KHJlc3VsdFszXSwgMTYpO1xuXG4gIHJldHVybiBbciwgZywgYl07XG59XG5cbmZ1bmN0aW9uIFBhZE51bShjKSB7XG4gIGNvbnN0IGhleCA9IGMudG9TdHJpbmcoMTYpO1xuICByZXR1cm4gaGV4Lmxlbmd0aCA9PT0gMSA/IGAwJHtoZXh9YCA6IGhleDtcbn1cblxuLyoqXG4gKiBnZXQgaGV4IGZyb20gciBnIGJcbiAqXG4gKiBAcGFyYW0ge2FycmF5fSByZ2JcbiAqIEByZXR1cm5zIHtzdHJpbmd9IGhleCBzdHJpbmdcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJnYlRvSGV4KFtyLCBnLCBiXSkge1xuICByZXR1cm4gYCMke1tyLCBnLCBiXS5tYXAobiA9PiBQYWROdW0obikpLmpvaW4oJycpfWAudG9VcHBlckNhc2UoKTtcbn1cbiJdfQ==