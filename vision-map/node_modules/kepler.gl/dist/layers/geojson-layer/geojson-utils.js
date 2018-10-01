'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

exports.getGeojsonDataMaps = getGeojsonDataMaps;
exports.parseGeometryFromString = parseGeometryFromString;
exports.getGeojsonBounds = getGeojsonBounds;
exports.featureToDeckGlGeoType = featureToDeckGlGeoType;

var _geojsonExtent = require('@mapbox/geojson-extent');

var _geojsonExtent2 = _interopRequireDefault(_geojsonExtent);

var _wellknown = require('wellknown');

var _wellknown2 = _interopRequireDefault(_wellknown);

var _geojsonNormalize = require('@mapbox/geojson-normalize');

var _geojsonNormalize2 = _interopRequireDefault(_geojsonNormalize);

var _dataUtils = require('../../utils/data-utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Parse raw data to geojson feature
 * @param allData
 * @param getFeature
 * @returns {{}}
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

function getGeojsonDataMaps(allData, getFeature) {
  var acceptableTypes = ['Point', 'MultiPoint', 'LineString', 'MultiLineString', 'Polygon', 'MultiPolygon', 'GeometryCollection'];

  var dataToFeature = {};

  allData.forEach(function (d, index) {
    dataToFeature[index] = null;
    var rawFeature = getFeature(d);

    var feature = null;

    // parse feature from field
    if (Array.isArray(rawFeature)) {
      // Support geojson as an array of points
      feature = {
        type: 'Feature',
        geometry: {
          // why do we need to flip it...
          coordinates: rawFeature.map(function (pts) {
            return [pts[1], pts[0]];
          }),
          type: 'LineString'
        }
      };
    } else if (typeof rawFeature === 'string') {
      feature = parseGeometryFromString(rawFeature);
    } else if ((typeof rawFeature === 'undefined' ? 'undefined' : (0, _typeof3.default)(rawFeature)) === 'object') {
      // Support geojson feature as object
      // probably need to normalize it as well
      var normalized = (0, _geojsonNormalize2.default)(rawFeature);
      if (!normalized || !Array.isArray(normalized.features)) {
        // fail to normalize geojson
        return null;
      }

      feature = normalized.features[0];
    }

    if (feature && feature.geometry && acceptableTypes.includes(feature.geometry.type)) {
      // store index of the data in feature properties
      feature.properties = (0, _extends3.default)({}, feature.properties || {}, {
        index: index
      });

      dataToFeature[index] = feature;
    }
  });

  return dataToFeature;
}

/**
 * Parse geojson from string
 * @param {String} geoString
 * @returns {null | Object} geojson object or null if failed
 */
function parseGeometryFromString(geoString) {
  var parsedGeo = void 0;

  // try parse as geojson string
  // {"type":"Polygon","coordinates":[[[-74.158491,40.83594]]]}
  try {
    parsedGeo = JSON.parse(geoString);
  } catch (e) {}
  // keep trying to parse


  // try parse as wkt
  if (!parsedGeo) {
    try {
      parsedGeo = (0, _wellknown2.default)(geoString);
    } catch (e) {
      return null;
    }
  }

  if (!parsedGeo) {
    return null;
  }

  var normalized = (0, _geojsonNormalize2.default)(parsedGeo);

  if (!normalized || !Array.isArray(normalized.features)) {
    // fail to normalize geojson
    return null;
  }

  return normalized.features[0];
}

function getGeojsonBounds() {
  var features = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

  // calculate feature bounds is computation heavy
  // here we only pick couple
  var samples = features.length > 500 ? (0, _dataUtils.getSampleData)(features, 500) : features;

  var nonEmpty = samples.filter(function (d) {
    return d && d.geometry && d.geometry.coordinates && d.geometry.coordinates.length;
  });

  try {
    return (0, _geojsonExtent2.default)({
      type: 'FeatureCollection',
      features: nonEmpty
    });
  } catch (e) {
    return null;
  }
}

function featureToDeckGlGeoType(type) {
  switch (type) {
    case 'Point':
    case 'MultiPoint':
      return 'point';

    case 'LineString':
    case 'MultiLineString':
      return 'line';

    case 'Polygon':
    case 'MultiPolygon':
      return 'polygon';

    default:
      return null;
  }
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9sYXllcnMvZ2VvanNvbi1sYXllci9nZW9qc29uLXV0aWxzLmpzIl0sIm5hbWVzIjpbImdldEdlb2pzb25EYXRhTWFwcyIsInBhcnNlR2VvbWV0cnlGcm9tU3RyaW5nIiwiZ2V0R2VvanNvbkJvdW5kcyIsImZlYXR1cmVUb0RlY2tHbEdlb1R5cGUiLCJhbGxEYXRhIiwiZ2V0RmVhdHVyZSIsImFjY2VwdGFibGVUeXBlcyIsImRhdGFUb0ZlYXR1cmUiLCJmb3JFYWNoIiwiZCIsImluZGV4IiwicmF3RmVhdHVyZSIsImZlYXR1cmUiLCJBcnJheSIsImlzQXJyYXkiLCJ0eXBlIiwiZ2VvbWV0cnkiLCJjb29yZGluYXRlcyIsIm1hcCIsInB0cyIsIm5vcm1hbGl6ZWQiLCJmZWF0dXJlcyIsImluY2x1ZGVzIiwicHJvcGVydGllcyIsImdlb1N0cmluZyIsInBhcnNlZEdlbyIsIkpTT04iLCJwYXJzZSIsImUiLCJzYW1wbGVzIiwibGVuZ3RoIiwibm9uRW1wdHkiLCJmaWx0ZXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O1FBZ0NnQkEsa0IsR0FBQUEsa0I7UUFtRUFDLHVCLEdBQUFBLHVCO1FBa0NBQyxnQixHQUFBQSxnQjtRQXFCQUMsc0IsR0FBQUEsc0I7O0FBdEloQjs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFFQTs7OztBQUVBOzs7Ozs7QUExQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBY08sU0FBU0gsa0JBQVQsQ0FBNEJJLE9BQTVCLEVBQXFDQyxVQUFyQyxFQUFpRDtBQUN0RCxNQUFNQyxrQkFBa0IsQ0FDdEIsT0FEc0IsRUFFdEIsWUFGc0IsRUFHdEIsWUFIc0IsRUFJdEIsaUJBSnNCLEVBS3RCLFNBTHNCLEVBTXRCLGNBTnNCLEVBT3RCLG9CQVBzQixDQUF4Qjs7QUFVQSxNQUFNQyxnQkFBZ0IsRUFB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QURhO0FBRW5CTSxnQkFBVVU7QUFGUyxLQUFkLENBQVA7QUFJRCxHQUxELENBS0UsT0FBT0gsQ0FBUCxFQUFVO0FBQ1YsV0FBTyxJQUFQO0FBQ0Q7QUFDRjs7QUFFTSxTQUFTekIsc0JBQVQsQ0FBZ0NZLElBQWhDLEVBQXNDO0FBQzNDLFVBQVFBLElBQVI7QUFDRSxTQUFLLE9BQUw7QUFDQSxTQUFLLFlBQUw7QUFDRSxhQUFPLE9BQVA7O0FBRUYsU0FBSyxZQUFMO0FBQ0EsU0FBSyxpQkFBTDtBQUNFLGFBQU8sTUFBUDs7QUFFRixTQUFLLFNBQUw7QUFDQSxTQUFLLGNBQUw7QUFDRSxhQUFPLFNBQVA7O0FBRUY7QUFDRSxhQUFPLElBQVA7QUFkSjtBQWdCRCIsImZpbGUiOiJnZW9qc29uLXV0aWxzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSAyMDE4IFViZXIgVGVjaG5vbG9naWVzLCBJbmMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuLy8gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuLy8gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuLy8gdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuLy8gY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4vLyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4vLyBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4vLyBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbi8vIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuLy8gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuLy8gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbi8vIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbi8vIFRIRSBTT0ZUV0FSRS5cblxuaW1wb3J0IGdlb2pzb25FeHRlbnQgZnJvbSAnQG1hcGJveC9nZW9qc29uLWV4dGVudCc7XG5pbXBvcnQgd2t0UGFyc2VyIGZyb20gJ3dlbGxrbm93bic7XG5pbXBvcnQgbm9ybWFsaXplIGZyb20gJ0BtYXBib3gvZ2VvanNvbi1ub3JtYWxpemUnO1xuXG5pbXBvcnQge2dldFNhbXBsZURhdGF9IGZyb20gJ3V0aWxzL2RhdGEtdXRpbHMnO1xuXG4vKipcbiAqIFBhcnNlIHJhdyBkYXRhIHRvIGdlb2pzb24gZmVhdHVyZVxuICogQHBhcmFtIGFsbERhdGFcbiAqIEBwYXJhbSBnZXRGZWF0dXJlXG4gKiBAcmV0dXJucyB7e319XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRHZW9qc29uRGF0YU1hcHMoYWxsRGF0YSwgZ2V0RmVhdHVyZSkge1xuICBjb25zdCBhY2NlcHRhYmxlVHlwZXMgPSBbXG4gICAgJ1BvaW50JyxcbiAgICAnTXVsdGlQb2ludCcsXG4gICAgJ0xpbmVTdHJpbmcnLFxuICAgICdNdWx0aUxpbmVTdHJpbmcnLFxuICAgICdQb2x5Z29uJyxcbiAgICAnTXVsdGlQb2x5Z29uJyxcbiAgICAnR2VvbWV0cnlDb2xsZWN0aW9uJ1xuICBdO1xuXG4gIGNvbnN0IGRhdGFUb0ZlYXR1cmUgPSB7fTtcblxuICBhbGxEYXRhLmZvckVhY2goKGQsIGluZGV4KSA9PiB7XG4gICAgZGF0YVRvRmVhdHVyZVtpbmRleF0gPSBudWxsO1xuICAgIGNvbnN0IHJhd0ZlYXR1cmUgPSBnZXRGZWF0dXJlKGQpO1xuXG4gICAgbGV0IGZlYXR1cmUgPSBudWxsO1xuXG4gICAgLy8gcGFyc2UgZmVhdHVyZSBmcm9tIGZpZWxkXG4gICAgaWYgKEFycmF5LmlzQXJyYXkocmF3RmVhdHVyZSkpIHtcbiAgICAgIC8vIFN1cHBvcnQgZ2VvanNvbiBhcyBhbiBhcnJheSBvZiBwb2ludHNcbiAgICAgIGZlYXR1cmUgPSB7XG4gICAgICAgIHR5cGU6ICdGZWF0dXJlJyxcbiAgICAgICAgZ2VvbWV0cnk6IHtcbiAgICAgICAgICAvLyB3aHkgZG8gd2UgbmVlZCB0byBmbGlwIGl0Li4uXG4gICAgICAgICAgY29vcmRpbmF0ZXM6IHJhd0ZlYXR1cmUubWFwKHB0cyA9PiBbcHRzWzFdLCBwdHNbMF1dKSxcbiAgICAgICAgICB0eXBlOiAnTGluZVN0cmluZydcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiByYXdGZWF0dXJlID09PSAnc3RyaW5nJykge1xuICAgICAgZmVhdHVyZSA9IHBhcnNlR2VvbWV0cnlGcm9tU3RyaW5nKHJhd0ZlYXR1cmUpO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIHJhd0ZlYXR1cmUgPT09ICdvYmplY3QnKSB7XG4gICAgICAvLyBTdXBwb3J0IGdlb2pzb24gZmVhdHVyZSBhcyBvYmplY3RcbiAgICAgIC8vIHByb2JhYmx5IG5lZWQgdG8gbm9ybWFsaXplIGl0IGFzIHdlbGxcbiAgICAgIGNvbnN0IG5vcm1hbGl6ZWQgPSBub3JtYWxpemUocmF3RmVhdHVyZSk7XG4gICAgICBpZiAoIW5vcm1hbGl6ZWQgfHwgIUFycmF5LmlzQXJyYXkobm9ybWFsaXplZC5mZWF0dXJlcykpIHtcbiAgICAgICAgLy8gZmFpbCB0byBub3JtYWxpemUgZ2VvanNvblxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cblxuICAgICAgZmVhdHVyZSA9IG5vcm1hbGl6ZWQuZmVhdHVyZXNbMF07XG4gICAgfVxuXG4gICAgaWYgKFxuICAgICAgZmVhdHVyZSAmJlxuICAgICAgZmVhdHVyZS5nZW9tZXRyeSAmJlxuICAgICAgYWNjZXB0YWJsZVR5cGVzLmluY2x1ZGVzKGZlYXR1cmUuZ2VvbWV0cnkudHlwZSlcbiAgICApIHtcbiAgICAgIC8vIHN0b3JlIGluZGV4IG9mIHRoZSBkYXRhIGluIGZlYXR1cmUgcHJvcGVydGllc1xuICAgICAgZmVhdHVyZS5wcm9wZXJ0aWVzID0ge1xuICAgICAgICAuLi4oZmVhdHVyZS5wcm9wZXJ0aWVzIHx8IHt9KSxcbiAgICAgICAgaW5kZXhcbiAgICAgIH07XG5cbiAgICAgIGRhdGFUb0ZlYXR1cmVbaW5kZXhdID0gZmVhdHVyZTtcbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiBkYXRhVG9GZWF0dXJlO1xufVxuXG4vKipcbiAqIFBhcnNlIGdlb2pzb24gZnJvbSBzdHJpbmdcbiAqIEBwYXJhbSB7U3RyaW5nfSBnZW9TdHJpbmdcbiAqIEByZXR1cm5zIHtudWxsIHwgT2JqZWN0fSBnZW9qc29uIG9iamVjdCBvciBudWxsIGlmIGZhaWxlZFxuICovXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VHZW9tZXRyeUZyb21TdHJpbmcoZ2VvU3RyaW5nKSB7XG4gIGxldCBwYXJzZWRHZW87XG5cbiAgLy8gdHJ5IHBhcnNlIGFzIGdlb2pzb24gc3RyaW5nXG4gIC8vIHtcInR5cGVcIjpcIlBvbHlnb25cIixcImNvb3JkaW5hdGVzXCI6W1tbLTc0LjE1ODQ5MSw0MC44MzU5NF1dXX1cbiAgdHJ5IHtcbiAgICBwYXJzZWRHZW8gPSBKU09OLnBhcnNlKGdlb1N0cmluZyk7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICAvLyBrZWVwIHRyeWluZyB0byBwYXJzZVxuICB9XG5cbiAgLy8gdHJ5IHBhcnNlIGFzIHdrdFxuICBpZiAoIXBhcnNlZEdlbykge1xuICAgIHRyeSB7XG4gICAgICBwYXJzZWRHZW8gPSB3a3RQYXJzZXIoZ2VvU3RyaW5nKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gIH1cblxuICBpZiAoIXBhcnNlZEdlbykge1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgY29uc3Qgbm9ybWFsaXplZCA9IG5vcm1hbGl6ZShwYXJzZWRHZW8pO1xuXG4gIGlmICghbm9ybWFsaXplZCB8fCAhQXJyYXkuaXNBcnJheShub3JtYWxpemVkLmZlYXR1cmVzKSkge1xuICAgIC8vIGZhaWwgdG8gbm9ybWFsaXplIGdlb2pzb25cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHJldHVybiBub3JtYWxpemVkLmZlYXR1cmVzWzBdO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0R2VvanNvbkJvdW5kcyhmZWF0dXJlcyA9IFtdKSB7XG4gIC8vIGNhbGN1bGF0ZSBmZWF0dXJlIGJvdW5kcyBpcyBjb21wdXRhdGlvbiBoZWF2eVxuICAvLyBoZXJlIHdlIG9ubHkgcGljayBjb3VwbGVcbiAgY29uc3Qgc2FtcGxlcyA9XG4gICAgZmVhdHVyZXMubGVuZ3RoID4gNTAwID8gZ2V0U2FtcGxlRGF0YShmZWF0dXJlcywgNTAwKSA6IGZlYXR1cmVzO1xuXG4gIGNvbnN0IG5vbkVtcHR5ID0gc2FtcGxlcy5maWx0ZXIoXG4gICAgZCA9PlxuICAgICAgZCAmJiBkLmdlb21ldHJ5ICYmIGQuZ2VvbWV0cnkuY29vcmRpbmF0ZXMgJiYgZC5nZW9tZXRyeS5jb29yZGluYXRlcy5sZW5ndGhcbiAgKTtcblxuICB0cnkge1xuICAgIHJldHVybiBnZW9qc29uRXh0ZW50KHtcbiAgICAgIHR5cGU6ICdGZWF0dXJlQ29sbGVjdGlvbicsXG4gICAgICBmZWF0dXJlczogbm9uRW1wdHlcbiAgICB9KTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBmZWF0dXJlVG9EZWNrR2xHZW9UeXBlKHR5cGUpIHtcbiAgc3dpdGNoICh0eXBlKSB7XG4gICAgY2FzZSAnUG9pbnQnOlxuICAgIGNhc2UgJ011bHRpUG9pbnQnOlxuICAgICAgcmV0dXJuICdwb2ludCc7XG5cbiAgICBjYXNlICdMaW5lU3RyaW5nJzpcbiAgICBjYXNlICdNdWx0aUxpbmVTdHJpbmcnOlxuICAgICAgcmV0dXJuICdsaW5lJztcblxuICAgIGNhc2UgJ1BvbHlnb24nOlxuICAgIGNhc2UgJ011bHRpUG9seWdvbic6XG4gICAgICByZXR1cm4gJ3BvbHlnb24nO1xuXG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBudWxsO1xuICB9XG59XG4iXX0=