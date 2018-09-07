'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.uiStateLens = exports.visStateLens = exports.mapStyleLens = exports.mapStateLens = exports.coreReducerFactory = undefined;

var _redux = require('redux');

var _visState = require('./vis-state');

var _mapState = require('./map-state');

var _mapStyle = require('./map-style');

var _uiState = require('./ui-state');

var _composers = require('./composers');

var _composers2 = _interopRequireDefault(_composers);

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

var combined = function combined() {
  var initialState = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return (0, _redux.combineReducers)({
    visState: (0, _visState.visStateReducerFactory)(initialState.visState),
    mapState: (0, _mapState.mapStateReducerFactory)(initialState.mapState),
    mapStyle: (0, _mapStyle.mapStyleReducerFactory)(initialState.mapStyle),
    uiState: (0, _uiState.uiStateReducerFactory)(initialState.uiState)
  });
};

var coreReducerFactory = exports.coreReducerFactory = function coreReducerFactory() {
  var initialState = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return function (state, action) {
    if (_composers2.default[action.type]) {
      return _composers2.default[action.type](state, action);
    }
    return combined(initialState)(state, action);
  };
};

exports.default = coreReducerFactory();
var mapStateLens = exports.mapStateLens = function mapStateLens(reduxState) {
  return { mapState: reduxState.mapState };
};
var mapStyleLens = exports.mapStyleLens = function mapStyleLens(reduxState) {
  return { mapStyle: reduxState.mapStyle };
};
var visStateLens = exports.visStateLens = function visStateLens(reduxState) {
  return { visState: reduxState.visState };
};
var uiStateLens = exports.uiStateLens = function uiStateLens(reduxState) {
  return { uiState: reduxState.uiState };
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9yZWR1Y2Vycy9jb3JlLmpzIl0sIm5hbWVzIjpbImNvbWJpbmVkIiwiaW5pdGlhbFN0YXRlIiwidmlzU3RhdGUiLCJtYXBTdGF0ZSIsIm1hcFN0eWxlIiwidWlTdGF0ZSIsImNvcmVSZWR1Y2VyRmFjdG9yeSIsInN0YXRlIiwiYWN0aW9uIiwiY29tcG9zZXJzIiwidHlwZSIsIm1hcFN0YXRlTGVucyIsInJlZHV4U3RhdGUiLCJtYXBTdHlsZUxlbnMiLCJ2aXNTdGF0ZUxlbnMiLCJ1aVN0YXRlTGVucyJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQW9CQTs7QUFFQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFFQTs7Ozs7O0FBM0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQVdBLElBQU1BLFdBQVcsU0FBWEEsUUFBVztBQUFBLE1BQUNDLFlBQUQsdUVBQWdCLEVBQWhCO0FBQUEsU0FDZiw0QkFBZ0I7QUFDZEMsY0FBVSxzQ0FBdUJELGFBQWFDLFFBQXBDLENBREk7QUFFZEMsY0FBVSxzQ0FBdUJGLGFBQWFFLFFBQXBDLENBRkk7QUFHZEMsY0FBVSxzQ0FBdUJILGFBQWFHLFFBQXBDLENBSEk7QUFJZEMsYUFBUyxvQ0FBc0JKLGFBQWFJLE9BQW5DO0FBSkssR0FBaEIsQ0FEZTtBQUFBLENBQWpCOztBQVFPLElBQU1DLGtEQUFxQixTQUFyQkEsa0JBQXFCO0FBQUEsTUFBQ0wsWUFBRCx1RUFBZ0IsRUFBaEI7QUFBQSxTQUF1QixVQUFDTSxLQUFELEVBQVFDLE1BQVIsRUFBbUI7QUFDMUUsUUFBSUMsb0JBQVVELE9BQU9FLElBQWpCLENBQUosRUFBNEI7QUFDMUIsYUFBT0Qsb0JBQVVELE9BQU9FLElBQWpCLEVBQXVCSCxLQUF2QixFQUE4QkMsTUFBOUIsQ0FBUDtBQUNEO0FBQ0QsV0FBT1IsU0FBU0MsWUFBVCxFQUF1Qk0sS0FBdkIsRUFBOEJDLE1BQTlCLENBQVA7QUFDRCxHQUxpQztBQUFBLENBQTNCOztrQkFPUUYsb0I7QUFFUixJQUFNSyxzQ0FBZSxTQUFmQSxZQUFlO0FBQUEsU0FBZSxFQUFDUixVQUFVUyxXQUFXVCxRQUF0QixFQUFmO0FBQUEsQ0FBckI7QUFDQSxJQUFNVSxzQ0FBZSxTQUFmQSxZQUFlO0FBQUEsU0FBZSxFQUFDVCxVQUFVUSxXQUFXUixRQUF0QixFQUFmO0FBQUEsQ0FBckI7QUFDQSxJQUFNVSxzQ0FBZSxTQUFmQSxZQUFlO0FBQUEsU0FBZSxFQUFDWixVQUFVVSxXQUFXVixRQUF0QixFQUFmO0FBQUEsQ0FBckI7QUFDQSxJQUFNYSxvQ0FBYyxTQUFkQSxXQUFjO0FBQUEsU0FBZSxFQUFDVixTQUFTTyxXQUFXUCxPQUFyQixFQUFmO0FBQUEsQ0FBcEIiLCJmaWxlIjoiY29yZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgMjAxOCBVYmVyIFRlY2hub2xvZ2llcywgSW5jLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbi8vIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbi8vIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbi8vIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbi8vIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuLy8gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuLy8gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4vLyBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbi8vIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbi8vIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4vLyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4vLyBUSEUgU09GVFdBUkUuXG5cbmltcG9ydCB7Y29tYmluZVJlZHVjZXJzfSBmcm9tICdyZWR1eCc7XG5cbmltcG9ydCB7dmlzU3RhdGVSZWR1Y2VyRmFjdG9yeX0gZnJvbSAnLi92aXMtc3RhdGUnO1xuaW1wb3J0IHttYXBTdGF0ZVJlZHVjZXJGYWN0b3J5fSBmcm9tICcuL21hcC1zdGF0ZSc7XG5pbXBvcnQge21hcFN0eWxlUmVkdWNlckZhY3Rvcnl9IGZyb20gJy4vbWFwLXN0eWxlJztcbmltcG9ydCB7dWlTdGF0ZVJlZHVjZXJGYWN0b3J5fSBmcm9tICcuL3VpLXN0YXRlJztcblxuaW1wb3J0IGNvbXBvc2VycyBmcm9tICcuL2NvbXBvc2Vycyc7XG5cbmNvbnN0IGNvbWJpbmVkID0gKGluaXRpYWxTdGF0ZSA9IHt9KSA9PlxuICBjb21iaW5lUmVkdWNlcnMoe1xuICAgIHZpc1N0YXRlOiB2aXNTdGF0ZVJlZHVjZXJGYWN0b3J5KGluaXRpYWxTdGF0ZS52aXNTdGF0ZSksXG4gICAgbWFwU3RhdGU6IG1hcFN0YXRlUmVkdWNlckZhY3RvcnkoaW5pdGlhbFN0YXRlLm1hcFN0YXRlKSxcbiAgICBtYXBTdHlsZTogbWFwU3R5bGVSZWR1Y2VyRmFjdG9yeShpbml0aWFsU3RhdGUubWFwU3R5bGUpLFxuICAgIHVpU3RhdGU6IHVpU3RhdGVSZWR1Y2VyRmFjdG9yeShpbml0aWFsU3RhdGUudWlTdGF0ZSlcbiAgfSk7XG5cbmV4cG9ydCBjb25zdCBjb3JlUmVkdWNlckZhY3RvcnkgPSAoaW5pdGlhbFN0YXRlID0ge30pID0+IChzdGF0ZSwgYWN0aW9uKSA9PiB7XG4gIGlmIChjb21wb3NlcnNbYWN0aW9uLnR5cGVdKSB7XG4gICAgcmV0dXJuIGNvbXBvc2Vyc1thY3Rpb24udHlwZV0oc3RhdGUsIGFjdGlvbik7XG4gIH1cbiAgcmV0dXJuIGNvbWJpbmVkKGluaXRpYWxTdGF0ZSkoc3RhdGUsIGFjdGlvbik7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBjb3JlUmVkdWNlckZhY3RvcnkoKTtcblxuZXhwb3J0IGNvbnN0IG1hcFN0YXRlTGVucyA9IHJlZHV4U3RhdGUgPT4gKHttYXBTdGF0ZTogcmVkdXhTdGF0ZS5tYXBTdGF0ZX0pO1xuZXhwb3J0IGNvbnN0IG1hcFN0eWxlTGVucyA9IHJlZHV4U3RhdGUgPT4gKHttYXBTdHlsZTogcmVkdXhTdGF0ZS5tYXBTdHlsZX0pO1xuZXhwb3J0IGNvbnN0IHZpc1N0YXRlTGVucyA9IHJlZHV4U3RhdGUgPT4gKHt2aXNTdGF0ZTogcmVkdXhTdGF0ZS52aXNTdGF0ZX0pO1xuZXhwb3J0IGNvbnN0IHVpU3RhdGVMZW5zID0gcmVkdXhTdGF0ZSA9PiAoe3VpU3RhdGU6IHJlZHV4U3RhdGUudWlTdGF0ZX0pO1xuIl19