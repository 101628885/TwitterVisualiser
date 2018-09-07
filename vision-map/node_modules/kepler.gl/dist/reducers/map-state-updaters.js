'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toggleSplitMapUpdater = exports.receiveMapConfigUpdater = exports.togglePerspectiveUpdater = exports.fitBoundsUpdater = exports.updateMapUpdater = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _geoViewport = require('@mapbox/geo-viewport');

var _geoViewport2 = _interopRequireDefault(_geoViewport);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* Updaters */
var updateMapUpdater = exports.updateMapUpdater = function updateMapUpdater(state, action) {
  return (0, _extends3.default)({}, state, action.payload || {});
}; // Copyright (c) 2018 Uber Technologies, Inc.
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

var fitBoundsUpdater = exports.fitBoundsUpdater = function fitBoundsUpdater(state, action) {
  var bounds = action.payload;

  var _geoViewport$viewport = _geoViewport2.default.viewport(bounds, [state.width, state.height]),
      center = _geoViewport$viewport.center,
      zoom = _geoViewport$viewport.zoom;

  return (0, _extends3.default)({}, state, {
    latitude: center[1],
    longitude: center[0],
    zoom: zoom
  });
};

var togglePerspectiveUpdater = exports.togglePerspectiveUpdater = function togglePerspectiveUpdater(state, action) {
  return (0, _extends3.default)({}, state, {
    pitch: state.dragRotate ? 0 : 50,
    bearing: state.dragRotate ? 0 : 24
  }, {
    dragRotate: !state.dragRotate
  });
};

// consider case where you have a split map and user wants to reset
var receiveMapConfigUpdater = exports.receiveMapConfigUpdater = function receiveMapConfigUpdater(state, action) {
  var _ref = action.payload.mapState || {},
      _ref$isSplit = _ref.isSplit,
      isSplit = _ref$isSplit === undefined ? false : _ref$isSplit;

  return (0, _extends3.default)({}, state, action.payload.mapState || {}, {
    isSplit: isSplit
  }, getMapDimForSplitMap(isSplit, state));
};

var toggleSplitMapUpdater = exports.toggleSplitMapUpdater = function toggleSplitMapUpdater(state, action) {
  return (0, _extends3.default)({}, state, {
    isSplit: !state.isSplit
  }, getMapDimForSplitMap(!state.isSplit, state));
};

// Helpers
function getMapDimForSplitMap(isSplit, state) {
  // cases:
  // 1. state split: true - isSplit: true
  // do nothing
  // 2. state split: false - isSplit: false
  // do nothing
  if (state.isSplit === isSplit) {
    return {};
  }

  var width = state.isSplit && !isSplit ?
  // 3. state split: true - isSplit: false
  // double width
  state.width * 2
  // 4. state split: false - isSplit: true
  // split width
  : state.width / 2;

  return {
    width: width
  };
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9yZWR1Y2Vycy9tYXAtc3RhdGUtdXBkYXRlcnMuanMiXSwibmFtZXMiOlsidXBkYXRlTWFwVXBkYXRlciIsInN0YXRlIiwiYWN0aW9uIiwicGF5bG9hZCIsImZpdEJvdW5kc1VwZGF0ZXIiLCJib3VuZHMiLCJnZW9WaWV3cG9ydCIsInZpZXdwb3J0Iiwid2lkdGgiLCJoZWlnaHQiLCJjZW50ZXIiLCJ6b29tIiwibGF0aXR1ZGUiLCJsb25naXR1ZGUiLCJ0b2dnbGVQZXJzcGVjdGl2ZVVwZGF0ZXIiLCJwaXRjaCIsImRyYWdSb3RhdGUiLCJiZWFyaW5nIiwicmVjZWl2ZU1hcENvbmZpZ1VwZGF0ZXIiLCJtYXBTdGF0ZSIsImlzU3BsaXQiLCJnZXRNYXBEaW1Gb3JTcGxpdE1hcCIsInRvZ2dsZVNwbGl0TWFwVXBkYXRlciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFvQkE7Ozs7OztBQUVBO0FBQ08sSUFBTUEsOENBQW1CLFNBQW5CQSxnQkFBbUIsQ0FBQ0MsS0FBRCxFQUFRQyxNQUFSO0FBQUEsb0NBQzNCRCxLQUQyQixFQUUxQkMsT0FBT0MsT0FBUCxJQUFrQixFQUZRO0FBQUEsQ0FBekIsQyxDQXZCUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFVTyxJQUFNQyw4Q0FBbUIsU0FBbkJBLGdCQUFtQixDQUFDSCxLQUFELEVBQVFDLE1BQVIsRUFBbUI7QUFDakQsTUFBTUcsU0FBU0gsT0FBT0MsT0FBdEI7O0FBRGlELDhCQUUxQkcsc0JBQVlDLFFBQVosQ0FBcUJGLE1BQXJCLEVBQTZCLENBQ2xESixNQUFNTyxLQUQ0QyxFQUVsRFAsTUFBTVEsTUFGNEMsQ0FBN0IsQ0FGMEI7QUFBQSxNQUUxQ0MsTUFGMEMseUJBRTFDQSxNQUYwQztBQUFBLE1BRWxDQyxJQUZrQyx5QkFFbENBLElBRmtDOztBQU9qRCxvQ0FDS1YsS0FETDtBQUVFVyxjQUFVRixPQUFPLENBQVAsQ0FGWjtBQUdFRyxlQUFXSCxPQUFPLENBQVAsQ0FIYjtBQUlFQztBQUpGO0FBTUQsQ0FiTTs7QUFlQSxJQUFNRyw4REFBMkIsU0FBM0JBLHdCQUEyQixDQUFDYixLQUFELEVBQVFDLE1BQVI7QUFBQSxvQ0FDbkNELEtBRG1DLEVBRW5DO0FBQ0RjLFdBQU9kLE1BQU1lLFVBQU4sR0FBbUIsQ0FBbkIsR0FBdUIsRUFEN0I7QUFFREMsYUFBU2hCLE1BQU1lLFVBQU4sR0FBbUIsQ0FBbkIsR0FBdUI7QUFGL0IsR0FGbUM7QUFNdENBLGdCQUFZLENBQUNmLE1BQU1lO0FBTm1CO0FBQUEsQ0FBakM7O0FBU1A7QUFDTyxJQUFNRSw0REFBMEIsU0FBMUJBLHVCQUEwQixDQUFDakIsS0FBRCxFQUFRQyxNQUFSLEVBQW1CO0FBQUEsYUFDOUJBLE9BQU9DLE9BQVAsQ0FBZWdCLFFBQWYsSUFBMkIsRUFERztBQUFBLDBCQUNqREMsT0FEaUQ7QUFBQSxNQUNqREEsT0FEaUQsZ0NBQ3ZDLEtBRHVDOztBQUd4RCxvQ0FDS25CLEtBREwsRUFFTUMsT0FBT0MsT0FBUCxDQUFlZ0IsUUFBZixJQUEyQixFQUZqQztBQUdFQztBQUhGLEtBSUtDLHFCQUFxQkQsT0FBckIsRUFBOEJuQixLQUE5QixDQUpMO0FBTUQsQ0FUTTs7QUFXQSxJQUFNcUIsd0RBQXdCLFNBQXhCQSxxQkFBd0IsQ0FBQ3JCLEtBQUQsRUFBUUMsTUFBUjtBQUFBLG9DQUNoQ0QsS0FEZ0M7QUFFbkNtQixhQUFTLENBQUNuQixNQUFNbUI7QUFGbUIsS0FHaENDLHFCQUFxQixDQUFDcEIsTUFBTW1CLE9BQTVCLEVBQXFDbkIsS0FBckMsQ0FIZ0M7QUFBQSxDQUE5Qjs7QUFNUDtBQUNBLFNBQVNvQixvQkFBVCxDQUE4QkQsT0FBOUIsRUFBdUNuQixLQUF2QyxFQUE4QztBQUM1QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSUEsTUFBTW1CLE9BQU4sS0FBa0JBLE9BQXRCLEVBQStCO0FBQzdCLFdBQU8sRUFBUDtBQUNEOztBQUVELE1BQU1aLFFBQVFQLE1BQU1tQixPQUFOLElBQWlCLENBQUNBLE9BQWxCO0FBQ1o7QUFDQTtBQUNBbkIsUUFBTU8sS0FBTixHQUFjO0FBQ2Q7QUFDQTtBQUxZLElBTVZQLE1BQU1PLEtBQU4sR0FBYyxDQU5sQjs7QUFRQSxTQUFPO0FBQ0xBO0FBREssR0FBUDtBQUdEIiwiZmlsZSI6Im1hcC1zdGF0ZS11cGRhdGVycy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgMjAxOCBVYmVyIFRlY2hub2xvZ2llcywgSW5jLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbi8vIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbi8vIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbi8vIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbi8vIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuLy8gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuLy8gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4vLyBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbi8vIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbi8vIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4vLyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4vLyBUSEUgU09GVFdBUkUuXG5cbmltcG9ydCBnZW9WaWV3cG9ydCBmcm9tICdAbWFwYm94L2dlby12aWV3cG9ydCc7XG5cbi8qIFVwZGF0ZXJzICovXG5leHBvcnQgY29uc3QgdXBkYXRlTWFwVXBkYXRlciA9IChzdGF0ZSwgYWN0aW9uKSA9PiAoe1xuICAuLi5zdGF0ZSxcbiAgLi4uKGFjdGlvbi5wYXlsb2FkIHx8IHt9KVxufSk7XG5cbmV4cG9ydCBjb25zdCBmaXRCb3VuZHNVcGRhdGVyID0gKHN0YXRlLCBhY3Rpb24pID0+IHtcbiAgY29uc3QgYm91bmRzID0gYWN0aW9uLnBheWxvYWQ7XG4gIGNvbnN0IHtjZW50ZXIsIHpvb219ID0gZ2VvVmlld3BvcnQudmlld3BvcnQoYm91bmRzLCBbXG4gICAgc3RhdGUud2lkdGgsXG4gICAgc3RhdGUuaGVpZ2h0XG4gIF0pO1xuXG4gIHJldHVybiB7XG4gICAgLi4uc3RhdGUsXG4gICAgbGF0aXR1ZGU6IGNlbnRlclsxXSxcbiAgICBsb25naXR1ZGU6IGNlbnRlclswXSxcbiAgICB6b29tXG4gIH07XG59O1xuXG5leHBvcnQgY29uc3QgdG9nZ2xlUGVyc3BlY3RpdmVVcGRhdGVyID0gKHN0YXRlLCBhY3Rpb24pID0+ICh7XG4gIC4uLnN0YXRlLFxuICAuLi57XG4gICAgcGl0Y2g6IHN0YXRlLmRyYWdSb3RhdGUgPyAwIDogNTAsXG4gICAgYmVhcmluZzogc3RhdGUuZHJhZ1JvdGF0ZSA/IDAgOiAyNFxuICB9LFxuICBkcmFnUm90YXRlOiAhc3RhdGUuZHJhZ1JvdGF0ZVxufSk7XG5cbi8vIGNvbnNpZGVyIGNhc2Ugd2hlcmUgeW91IGhhdmUgYSBzcGxpdCBtYXAgYW5kIHVzZXIgd2FudHMgdG8gcmVzZXRcbmV4cG9ydCBjb25zdCByZWNlaXZlTWFwQ29uZmlnVXBkYXRlciA9IChzdGF0ZSwgYWN0aW9uKSA9PiB7XG4gIGNvbnN0IHtpc1NwbGl0ID0gZmFsc2V9ID0gYWN0aW9uLnBheWxvYWQubWFwU3RhdGUgfHwge307XG5cbiAgcmV0dXJuIHtcbiAgICAuLi5zdGF0ZSxcbiAgICAuLi4oYWN0aW9uLnBheWxvYWQubWFwU3RhdGUgfHwge30pLFxuICAgIGlzU3BsaXQsXG4gICAgLi4uZ2V0TWFwRGltRm9yU3BsaXRNYXAoaXNTcGxpdCwgc3RhdGUpXG4gIH07XG59O1xuXG5leHBvcnQgY29uc3QgdG9nZ2xlU3BsaXRNYXBVcGRhdGVyID0gKHN0YXRlLCBhY3Rpb24pID0+ICh7XG4gIC4uLnN0YXRlLFxuICBpc1NwbGl0OiAhc3RhdGUuaXNTcGxpdCxcbiAgLi4uZ2V0TWFwRGltRm9yU3BsaXRNYXAoIXN0YXRlLmlzU3BsaXQsIHN0YXRlKVxufSk7XG5cbi8vIEhlbHBlcnNcbmZ1bmN0aW9uIGdldE1hcERpbUZvclNwbGl0TWFwKGlzU3BsaXQsIHN0YXRlKSB7XG4gIC8vIGNhc2VzOlxuICAvLyAxLiBzdGF0ZSBzcGxpdDogdHJ1ZSAtIGlzU3BsaXQ6IHRydWVcbiAgLy8gZG8gbm90aGluZ1xuICAvLyAyLiBzdGF0ZSBzcGxpdDogZmFsc2UgLSBpc1NwbGl0OiBmYWxzZVxuICAvLyBkbyBub3RoaW5nXG4gIGlmIChzdGF0ZS5pc1NwbGl0ID09PSBpc1NwbGl0KSB7XG4gICAgcmV0dXJuIHt9O1xuICB9XG5cbiAgY29uc3Qgd2lkdGggPSBzdGF0ZS5pc1NwbGl0ICYmICFpc1NwbGl0ID9cbiAgICAvLyAzLiBzdGF0ZSBzcGxpdDogdHJ1ZSAtIGlzU3BsaXQ6IGZhbHNlXG4gICAgLy8gZG91YmxlIHdpZHRoXG4gICAgc3RhdGUud2lkdGggKiAyXG4gICAgLy8gNC4gc3RhdGUgc3BsaXQ6IGZhbHNlIC0gaXNTcGxpdDogdHJ1ZVxuICAgIC8vIHNwbGl0IHdpZHRoXG4gICAgOiBzdGF0ZS53aWR0aCAvIDI7XG5cbiAgcmV0dXJuIHtcbiAgICB3aWR0aFxuICB9O1xufVxuIl19