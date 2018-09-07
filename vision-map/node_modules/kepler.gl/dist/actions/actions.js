'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addDataToMap = exports.keplerGlInit = exports.resetMapConfig = exports.receiveMapConfig = undefined;

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _visStateActions = require('./vis-state-actions');

Object.keys(_visStateActions).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _visStateActions[key];
    }
  });
});

var _uiStateActions = require('./ui-state-actions');

Object.keys(_uiStateActions).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _uiStateActions[key];
    }
  });
});

var _mapStateActions = require('./map-state-actions');

Object.keys(_mapStateActions).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _mapStateActions[key];
    }
  });
});

var _mapStyleActions = require('./map-style-actions');

Object.keys(_mapStyleActions).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _mapStyleActions[key];
    }
  });
});

var _identityActions = require('./identity-actions');

Object.keys(_identityActions).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _identityActions[key];
    }
  });
});

var _actionTypes = require('../constants/action-types');

var _actionTypes2 = _interopRequireDefault(_actionTypes);

var _reduxActions = require('redux-actions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// create actions
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

var ADD_DATA_TO_MAP = _actionTypes2.default.ADD_DATA_TO_MAP,
    INIT = _actionTypes2.default.INIT,
    RECEIVE_MAP_CONFIG = _actionTypes2.default.RECEIVE_MAP_CONFIG,
    RESET_MAP_CONFIG = _actionTypes2.default.RESET_MAP_CONFIG;

// kepler.gl actions accessible outside component

var _map = [RECEIVE_MAP_CONFIG, RESET_MAP_CONFIG, INIT, ADD_DATA_TO_MAP].map(function (a) {
  return (0, _reduxActions.createAction)(a);
}),
    _map2 = (0, _slicedToArray3.default)(_map, 4);

var receiveMapConfig = _map2[0],
    resetMapConfig = _map2[1],
    keplerGlInit = _map2[2],
    addDataToMap = _map2[3];
exports.receiveMapConfig = receiveMapConfig;
exports.resetMapConfig = resetMapConfig;
exports.keplerGlInit = keplerGlInit;
exports.addDataToMap = addDataToMap;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hY3Rpb25zL2FjdGlvbnMuanMiXSwibmFtZXMiOlsiQUREX0RBVEFfVE9fTUFQIiwiQWN0aW9uVHlwZXMiLCJJTklUIiwiUkVDRUlWRV9NQVBfQ09ORklHIiwiUkVTRVRfTUFQX0NPTkZJRyIsIm1hcCIsImEiLCJyZWNlaXZlTWFwQ29uZmlnIiwicmVzZXRNYXBDb25maWciLCJrZXBsZXJHbEluaXQiLCJhZGREYXRhVG9NYXAiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUEyQkE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOzs7O0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOzs7O0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOzs7O0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOzs7O0FBRUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQVpBOzs7O0FBQ0E7Ozs7QUFFQTtBQXZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7SUFNT0EsZSxHQUErREMscUIsQ0FBL0RELGU7SUFBaUJFLEksR0FBOENELHFCLENBQTlDQyxJO0lBQU1DLGtCLEdBQXdDRixxQixDQUF4Q0Usa0I7SUFBb0JDLGdCLEdBQW9CSCxxQixDQUFwQkcsZ0I7O0FBRWxEOztXQVE4RSxDQUM1RUQsa0JBRDRFLEVBRTVFQyxnQkFGNEUsRUFHNUVGLElBSDRFLEVBSTVFRixlQUo0RSxFQUs1RUssR0FMNEUsQ0FLeEU7QUFBQSxTQUFLLGdDQUFhQyxDQUFiLENBQUw7QUFBQSxDQUx3RSxDOzs7SUFBaEVDLGdCO0lBQWtCQyxjO0lBQWdCQyxZO0lBQWNDLFkiLCJmaWxlIjoiYWN0aW9ucy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgMjAxOCBVYmVyIFRlY2hub2xvZ2llcywgSW5jLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbi8vIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbi8vIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbi8vIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbi8vIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuLy8gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuLy8gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4vLyBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbi8vIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbi8vIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4vLyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4vLyBUSEUgU09GVFdBUkUuXG5cbmltcG9ydCBBY3Rpb25UeXBlcyBmcm9tICdjb25zdGFudHMvYWN0aW9uLXR5cGVzJztcbmltcG9ydCB7Y3JlYXRlQWN0aW9ufSBmcm9tICdyZWR1eC1hY3Rpb25zJztcblxuLy8gY3JlYXRlIGFjdGlvbnNcbmNvbnN0IHtBRERfREFUQV9UT19NQVAsIElOSVQsIFJFQ0VJVkVfTUFQX0NPTkZJRywgUkVTRVRfTUFQX0NPTkZJR30gPSBBY3Rpb25UeXBlcztcblxuLy8ga2VwbGVyLmdsIGFjdGlvbnMgYWNjZXNzaWJsZSBvdXRzaWRlIGNvbXBvbmVudFxuZXhwb3J0ICogZnJvbSAnLi92aXMtc3RhdGUtYWN0aW9ucyc7XG5leHBvcnQgKiBmcm9tICcuL3VpLXN0YXRlLWFjdGlvbnMnO1xuZXhwb3J0ICogZnJvbSAnLi9tYXAtc3RhdGUtYWN0aW9ucyc7XG5leHBvcnQgKiBmcm9tICcuL21hcC1zdHlsZS1hY3Rpb25zJztcblxuZXhwb3J0ICogZnJvbSAnLi9pZGVudGl0eS1hY3Rpb25zJztcblxuZXhwb3J0IGNvbnN0IFtyZWNlaXZlTWFwQ29uZmlnLCByZXNldE1hcENvbmZpZywga2VwbGVyR2xJbml0LCBhZGREYXRhVG9NYXBdID0gW1xuICBSRUNFSVZFX01BUF9DT05GSUcsXG4gIFJFU0VUX01BUF9DT05GSUcsXG4gIElOSVQsXG4gIEFERF9EQVRBX1RPX01BUFxuXS5tYXAoYSA9PiBjcmVhdGVBY3Rpb24oYSkpO1xuIl19