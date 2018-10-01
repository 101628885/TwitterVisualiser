'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.propertiesV1 = exports.propertiesV0 = undefined;

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _mapStateSchema; // Copyright (c) 2018 Uber Technologies, Inc.
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

var _versions = require('./versions');

var _schema = require('./schema');

var _schema2 = _interopRequireDefault(_schema);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// version v0
var propertiesV0 = exports.propertiesV0 = {
  bearing: null,
  dragRotate: null,
  latitude: null,
  longitude: null,
  pitch: null,
  zoom: null
};

var propertiesV1 = exports.propertiesV1 = (0, _extends3.default)({}, propertiesV0, {
  isSplit: null
});

var mapStateSchema = (_mapStateSchema = {}, (0, _defineProperty3.default)(_mapStateSchema, _versions.VERSIONS.v0, new _schema2.default({
  version: _versions.VERSIONS.v0,
  properties: propertiesV0,
  key: 'mapState'
})), (0, _defineProperty3.default)(_mapStateSchema, _versions.VERSIONS.v1, new _schema2.default({
  version: _versions.VERSIONS.v1,
  properties: propertiesV1,
  key: 'mapState'
})), _mapStateSchema);

exports.default = mapStateSchema;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zY2hlbWFzL21hcC1zdGF0ZS1zY2hlbWEuanMiXSwibmFtZXMiOlsicHJvcGVydGllc1YwIiwiYmVhcmluZyIsImRyYWdSb3RhdGUiLCJsYXRpdHVkZSIsImxvbmdpdHVkZSIsInBpdGNoIiwiem9vbSIsInByb3BlcnRpZXNWMSIsImlzU3BsaXQiLCJtYXBTdGF0ZVNjaGVtYSIsIlZFUlNJT05TIiwidjAiLCJTY2hlbWEiLCJ2ZXJzaW9uIiwicHJvcGVydGllcyIsImtleSIsInYxIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7cUJBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBQ0E7Ozs7OztBQUVBO0FBQ08sSUFBTUEsc0NBQWU7QUFDMUJDLFdBQVMsSUFEaUI7QUFFMUJDLGNBQVksSUFGYztBQUcxQkMsWUFBVSxJQUhnQjtBQUkxQkMsYUFBVyxJQUplO0FBSzFCQyxTQUFPLElBTG1CO0FBTTFCQyxRQUFNO0FBTm9CLENBQXJCOztBQVNBLElBQU1DLGlFQUNSUCxZQURRO0FBRVhRLFdBQVM7QUFGRSxFQUFOOztBQUtQLElBQU1DLHVGQUNIQyxtQkFBU0MsRUFETixFQUNXLElBQUlDLGdCQUFKLENBQVc7QUFDeEJDLFdBQVNILG1CQUFTQyxFQURNO0FBRXhCRyxjQUFZZCxZQUZZO0FBR3hCZSxPQUFLO0FBSG1CLENBQVgsQ0FEWCxrREFNSEwsbUJBQVNNLEVBTk4sRUFNVyxJQUFJSixnQkFBSixDQUFXO0FBQ3hCQyxXQUFTSCxtQkFBU00sRUFETTtBQUV4QkYsY0FBWVAsWUFGWTtBQUd4QlEsT0FBSztBQUhtQixDQUFYLENBTlgsbUJBQU47O2tCQWFlTixjIiwiZmlsZSI6Im1hcC1zdGF0ZS1zY2hlbWEuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIDIwMTggVWJlciBUZWNobm9sb2dpZXMsIEluYy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4vLyBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4vLyBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4vLyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4vLyBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbi8vIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbi8vIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1Jcbi8vIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuLy8gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4vLyBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4vLyBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuLy8gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuLy8gVEhFIFNPRlRXQVJFLlxuXG5pbXBvcnQge1ZFUlNJT05TfSBmcm9tICcuL3ZlcnNpb25zJztcbmltcG9ydCBTY2hlbWEgZnJvbSAnLi9zY2hlbWEnO1xuXG4vLyB2ZXJzaW9uIHYwXG5leHBvcnQgY29uc3QgcHJvcGVydGllc1YwID0ge1xuICBiZWFyaW5nOiBudWxsLFxuICBkcmFnUm90YXRlOiBudWxsLFxuICBsYXRpdHVkZTogbnVsbCxcbiAgbG9uZ2l0dWRlOiBudWxsLFxuICBwaXRjaDogbnVsbCxcbiAgem9vbTogbnVsbFxufTtcblxuZXhwb3J0IGNvbnN0IHByb3BlcnRpZXNWMSA9IHtcbiAgLi4ucHJvcGVydGllc1YwLFxuICBpc1NwbGl0OiBudWxsXG59O1xuXG5jb25zdCBtYXBTdGF0ZVNjaGVtYSA9IHtcbiAgW1ZFUlNJT05TLnYwXTogbmV3IFNjaGVtYSh7XG4gICAgdmVyc2lvbjogVkVSU0lPTlMudjAsXG4gICAgcHJvcGVydGllczogcHJvcGVydGllc1YwLFxuICAgIGtleTogJ21hcFN0YXRlJ1xuICB9KSxcbiAgW1ZFUlNJT05TLnYxXTogbmV3IFNjaGVtYSh7XG4gICAgdmVyc2lvbjogVkVSU0lPTlMudjEsXG4gICAgcHJvcGVydGllczogcHJvcGVydGllc1YxLFxuICAgIGtleTogJ21hcFN0YXRlJ1xuICB9KVxufTtcblxuZXhwb3J0IGRlZmF1bHQgbWFwU3RhdGVTY2hlbWE7XG4iXX0=