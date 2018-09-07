'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getGeoJSON = getGeoJSON;
exports.clustersAtZoom = clustersAtZoom;
exports.clearClustererCache = clearClustererCache;

var _supercluster = require('supercluster');

var _supercluster2 = _interopRequireDefault(_supercluster);

var _memoize = require('lodash/memoize');

var _memoize2 = _interopRequireDefault(_memoize);

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

function getGeoJSON(data, getPosition) {
  return data.map(function (d) {
    return {
      type: 'Point',
      properties: {
        data: d,
        points: [d],
        point_count: 1,
        point_count_abbreviated: '1'
      },
      geometry: {
        coordinates: getPosition(d)
      }
    };
  }).filter(function (d) {
    return d.geometry.coordinates.every(Number.isFinite);
  });
}

var clusterResolver = function clusterResolver(_ref) {
  var clusterRadius = _ref.clusterRadius;
  return '' + clusterRadius;
};

var getClusterer = (0, _memoize2.default)(function (_ref2) {
  var clusterRadius = _ref2.clusterRadius,
      geoJSON = _ref2.geoJSON;

  return (0, _supercluster2.default)({
    maxZoom: 20,
    radius: clusterRadius,
    initial: function initial() {
      return { points: [] };
    },
    map: function map(props) {
      return props.data;
    },
    reduce: function reduce(accumulated, props) {
      if (props.points) {
        // avoid using spread to prevent max call stack exceeded error
        props.points.forEach(function (p) {
          accumulated.points.push(p);
        });
      } else {
        accumulated.points.push(props);
      }
    }
  }).load(geoJSON);
}, clusterResolver);

function clustersAtZoom(_ref3) {
  var bbox = _ref3.bbox,
      clusterRadius = _ref3.clusterRadius,
      geoJSON = _ref3.geoJSON,
      zoom = _ref3.zoom;

  var clusterer = getClusterer({ clusterRadius: clusterRadius, geoJSON: geoJSON });

  return clusterer.getClusters(bbox, zoom);
}

function clearClustererCache() {
  getClusterer.cache.clear();
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kZWNrZ2wtbGF5ZXJzL2xheWVyLXV0aWxzL2NsdXN0ZXItdXRpbHMuanMiXSwibmFtZXMiOlsiZ2V0R2VvSlNPTiIsImNsdXN0ZXJzQXRab29tIiwiY2xlYXJDbHVzdGVyZXJDYWNoZSIsImRhdGEiLCJnZXRQb3NpdGlvbiIsIm1hcCIsInR5cGUiLCJwcm9wZXJ0aWVzIiwiZCIsInBvaW50cyIsInBvaW50X2NvdW50IiwicG9pbnRfY291bnRfYWJicmV2aWF0ZWQiLCJnZW9tZXRyeSIsImNvb3JkaW5hdGVzIiwiZmlsdGVyIiwiZXZlcnkiLCJOdW1iZXIiLCJpc0Zpbml0ZSIsImNsdXN0ZXJSZXNvbHZlciIsImNsdXN0ZXJSYWRpdXMiLCJnZXRDbHVzdGVyZXIiLCJnZW9KU09OIiwibWF4Wm9vbSIsInJhZGl1cyIsImluaXRpYWwiLCJwcm9wcyIsInJlZHVjZSIsImFjY3VtdWxhdGVkIiwiZm9yRWFjaCIsInB1c2giLCJwIiwibG9hZCIsImJib3giLCJ6b29tIiwiY2x1c3RlcmVyIiwiZ2V0Q2x1c3RlcnMiLCJjYWNoZSIsImNsZWFyIl0sIm1hcHBpbmdzIjoiOzs7OztRQXVCZ0JBLFUsR0FBQUEsVTtRQXNDQUMsYyxHQUFBQSxjO1FBTUFDLG1CLEdBQUFBLG1COztBQS9DaEI7Ozs7QUFDQTs7Ozs7O0FBckJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUtPLFNBQVNGLFVBQVQsQ0FBb0JHLElBQXBCLEVBQTBCQyxXQUExQixFQUF1QztBQUM1QyxTQUFPRCxLQUNKRSxHQURJLENBQ0E7QUFBQSxXQUFNO0FBQ1RDLFlBQU0sT0FERztBQUVUQyxrQkFBWTtBQUNWSixjQUFNSyxDQURJO0FBRVZDLGdCQUFRLENBQUNELENBQUQsQ0FGRTtBQUdWRSxxQkFBYSxDQUhIO0FBSVZDLGlDQUF5QjtBQUpmLE9BRkg7QUFRVEMsZ0JBQVU7QUFDUkMscUJBQWFULFlBQVlJLENBQVo7QUFETDtBQVJELEtBQU47QUFBQSxHQURBLEVBYUpNLE1BYkksQ0FhRztBQUFBLFdBQUtOLEVBQUVJLFFBQUYsQ0FBV0MsV0FBWCxDQUF1QkUsS0FBdkIsQ0FBNkJDLE9BQU9DLFFBQXBDLENBQUw7QUFBQSxHQWJILENBQVA7QUFjRDs7QUFFRCxJQUFNQyxrQkFBa0IsU0FBbEJBLGVBQWtCO0FBQUEsTUFBRUMsYUFBRixRQUFFQSxhQUFGO0FBQUEsY0FBd0JBLGFBQXhCO0FBQUEsQ0FBeEI7O0FBRUEsSUFBTUMsZUFBZSx1QkFBUSxpQkFBOEI7QUFBQSxNQUE1QkQsYUFBNEIsU0FBNUJBLGFBQTRCO0FBQUEsTUFBYkUsT0FBYSxTQUFiQSxPQUFhOztBQUN6RCxTQUFPLDRCQUFhO0FBQ2xCQyxhQUFTLEVBRFM7QUFFbEJDLFlBQVFKLGFBRlU7QUFHbEJLLGFBQVM7QUFBQSxhQUFPLEVBQUNmLFFBQVEsRUFBVCxFQUFQO0FBQUEsS0FIUztBQUlsQkosU0FBSztBQUFBLGFBQVNvQixNQUFNdEIsSUFBZjtBQUFBLEtBSmE7QUFLbEJ1QixZQUFRLGdCQUFDQyxXQUFELEVBQWNGLEtBQWQsRUFBd0I7QUFDOUIsVUFBSUEsTUFBTWhCLE1BQVYsRUFBa0I7QUFDaEI7QUFDQWdCLGNBQU1oQixNQUFOLENBQWFtQixPQUFiLENBQXFCLGFBQUs7QUFDeEJELHNCQUFZbEIsTUFBWixDQUFtQm9CLElBQW5CLENBQXdCQyxDQUF4QjtBQUNELFNBRkQ7QUFHRCxPQUxELE1BS087QUFDTEgsb0JBQVlsQixNQUFaLENBQW1Cb0IsSUFBbkIsQ0FBd0JKLEtBQXhCO0FBQ0Q7QUFDRjtBQWRpQixHQUFiLEVBZUpNLElBZkksQ0FlQ1YsT0FmRCxDQUFQO0FBZ0JELENBakJvQixFQWlCbEJILGVBakJrQixDQUFyQjs7QUFtQk8sU0FBU2pCLGNBQVQsUUFBOEQ7QUFBQSxNQUFyQytCLElBQXFDLFNBQXJDQSxJQUFxQztBQUFBLE1BQS9CYixhQUErQixTQUEvQkEsYUFBK0I7QUFBQSxNQUFoQkUsT0FBZ0IsU0FBaEJBLE9BQWdCO0FBQUEsTUFBUFksSUFBTyxTQUFQQSxJQUFPOztBQUNuRSxNQUFNQyxZQUFZZCxhQUFhLEVBQUNELDRCQUFELEVBQWdCRSxnQkFBaEIsRUFBYixDQUFsQjs7QUFFQSxTQUFPYSxVQUFVQyxXQUFWLENBQXNCSCxJQUF0QixFQUE0QkMsSUFBNUIsQ0FBUDtBQUNEOztBQUVNLFNBQVMvQixtQkFBVCxHQUErQjtBQUNwQ2tCLGVBQWFnQixLQUFiLENBQW1CQyxLQUFuQjtBQUNEIiwiZmlsZSI6ImNsdXN0ZXItdXRpbHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIDIwMTggVWJlciBUZWNobm9sb2dpZXMsIEluYy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4vLyBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4vLyBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4vLyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4vLyBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbi8vIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbi8vIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1Jcbi8vIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuLy8gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4vLyBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4vLyBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuLy8gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuLy8gVEhFIFNPRlRXQVJFLlxuXG5pbXBvcnQgc3VwZXJjbHVzdGVyIGZyb20gJ3N1cGVyY2x1c3Rlcic7XG5pbXBvcnQgbWVtb2l6ZSBmcm9tICdsb2Rhc2gvbWVtb2l6ZSc7XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRHZW9KU09OKGRhdGEsIGdldFBvc2l0aW9uKSB7XG4gIHJldHVybiBkYXRhXG4gICAgLm1hcChkID0+ICh7XG4gICAgICB0eXBlOiAnUG9pbnQnLFxuICAgICAgcHJvcGVydGllczoge1xuICAgICAgICBkYXRhOiBkLFxuICAgICAgICBwb2ludHM6IFtkXSxcbiAgICAgICAgcG9pbnRfY291bnQ6IDEsXG4gICAgICAgIHBvaW50X2NvdW50X2FiYnJldmlhdGVkOiAnMSdcbiAgICAgIH0sXG4gICAgICBnZW9tZXRyeToge1xuICAgICAgICBjb29yZGluYXRlczogZ2V0UG9zaXRpb24oZClcbiAgICAgIH1cbiAgICB9KSlcbiAgICAuZmlsdGVyKGQgPT4gZC5nZW9tZXRyeS5jb29yZGluYXRlcy5ldmVyeShOdW1iZXIuaXNGaW5pdGUpKTtcbn1cblxuY29uc3QgY2x1c3RlclJlc29sdmVyID0gKHtjbHVzdGVyUmFkaXVzfSkgPT4gYCR7Y2x1c3RlclJhZGl1c31gO1xuXG5jb25zdCBnZXRDbHVzdGVyZXIgPSBtZW1vaXplKCh7Y2x1c3RlclJhZGl1cywgZ2VvSlNPTn0pID0+IHtcbiAgcmV0dXJuIHN1cGVyY2x1c3Rlcih7XG4gICAgbWF4Wm9vbTogMjAsXG4gICAgcmFkaXVzOiBjbHVzdGVyUmFkaXVzLFxuICAgIGluaXRpYWw6ICgpID0+ICh7cG9pbnRzOiBbXX0pLFxuICAgIG1hcDogcHJvcHMgPT4gcHJvcHMuZGF0YSxcbiAgICByZWR1Y2U6IChhY2N1bXVsYXRlZCwgcHJvcHMpID0+IHtcbiAgICAgIGlmIChwcm9wcy5wb2ludHMpIHtcbiAgICAgICAgLy8gYXZvaWQgdXNpbmcgc3ByZWFkIHRvIHByZXZlbnQgbWF4IGNhbGwgc3RhY2sgZXhjZWVkZWQgZXJyb3JcbiAgICAgICAgcHJvcHMucG9pbnRzLmZvckVhY2gocCA9PiB7XG4gICAgICAgICAgYWNjdW11bGF0ZWQucG9pbnRzLnB1c2gocCk7XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYWNjdW11bGF0ZWQucG9pbnRzLnB1c2gocHJvcHMpO1xuICAgICAgfVxuICAgIH1cbiAgfSkubG9hZChnZW9KU09OKTtcbn0sIGNsdXN0ZXJSZXNvbHZlcik7XG5cbmV4cG9ydCBmdW5jdGlvbiBjbHVzdGVyc0F0Wm9vbSh7YmJveCwgY2x1c3RlclJhZGl1cywgZ2VvSlNPTiwgem9vbX0pIHtcbiAgY29uc3QgY2x1c3RlcmVyID0gZ2V0Q2x1c3RlcmVyKHtjbHVzdGVyUmFkaXVzLCBnZW9KU09OfSk7XG5cbiAgcmV0dXJuIGNsdXN0ZXJlci5nZXRDbHVzdGVycyhiYm94LCB6b29tKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNsZWFyQ2x1c3RlcmVyQ2FjaGUoKSB7XG4gIGdldENsdXN0ZXJlci5jYWNoZS5jbGVhcigpO1xufVxuIl19