'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends5 = require('babel-runtime/helpers/extends');

var _extends6 = _interopRequireDefault(_extends5);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

exports.generateMapboxLayers = generateMapboxLayers;
exports.updateMapboxLayers = updateMapboxLayers;
exports.geojsonFromPoints = geojsonFromPoints;

var _baseLayer = require('./base-layer');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * This function will convert layers to mapbox layers
 * @param layers the layers to be converted
 * @param layerData extra layer information
 * @param layerOrder the order by which we should convert layers
 * @returns {*}
 */
function generateMapboxLayers() {
  var layers = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var layerData = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var layerOrder = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

  if (layerData.length > 0) {
    return layerOrder.slice().reverse().reduce(function (overlays, idx) {
      var layer = layers[idx];

      return layer.overlayType !== _baseLayer.OVERLAY_TYPE.mapboxgl ? overlays : [].concat((0, _toConsumableArray3.default)(overlays), [{
        id: layer.id,
        data: layerData[idx].data,
        config: layerData[idx].config,
        datasetId: layer.config.dataId
      }]);
    }, []);
  }

  return [];
} // Copyright (c) 2018 Uber Technologies, Inc.
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

;

/**
 * Update mapbox layers on the given map
 * @param map
 * @param newLayers Array of new mapbox layers to be displayed
 * @param oldLayers Map of the old layers to be compare with the current ones to detect deleted layers
 *                  {layerId: datasetId}
 * @param mapLayers carries information about split map view
 */
function updateMapboxLayers(map) {
  var newLayers = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var oldLayers = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  var mapLayers = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
  var opt = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : { force: true };

  // delete non existing layers

  if (oldLayers) {
    var oldLayersKeys = Object.keys(oldLayers);
    if (newLayers.length === 0 && oldLayersKeys.length > 0) {
      oldLayersKeys.forEach(function (layerId) {
        return map.removeLayer(layerId);
      });
    } else {
      // remove layers
      var currentLayersIds = newLayers.reduce(function (final, layer) {
        return (0, _extends6.default)({}, final, (0, _defineProperty3.default)({}, layer.id, true));
      }, {});

      var layersToDelete = oldLayersKeys.reduce(function (final, layerId) {
        // if layer doesn't exists anymore
        if (!currentLayersIds[layerId]) {
          return (0, _extends6.default)({}, final, (0, _defineProperty3.default)({}, layerId, oldLayers[layerId]));
        }
        return final;
      }, []);
      Object.keys(layersToDelete).forEach(function (layerId) {
        return map.removeLayer(layerId);
      });
    }
  }

  // insert or update newlayer
  newLayers.forEach(function (overlay) {
    var layerId = overlay.id,
        config = overlay.config,
        data = overlay.data,
        datasetId = overlay.datasetId;

    if (!data && !config) {
      return;
    }
    var isAvailableAndVisible = !(mapLayers && mapLayers[layerId]) || mapLayers[layerId].isVisible;
    // checking if source already exists

    if (data && isAvailableAndVisible) {
      var source = map.getSource(datasetId);
      if (!source) {
        map.addSource(datasetId, {
          type: 'geojson',
          data: data
        });
      } else {
        source.setData(data);
      }
    }

    var oldConfig = oldLayers[layerId];
    var mapboxLayer = map.getLayer(layerId);
    // compare with previous configs

    if (!oldConfig || oldConfig !== config || !mapboxLayer || opt.force) {
      // check if layer already is set
      // remove it if exists
      if (mapboxLayer) {
        map.removeLayer(layerId);
      }
      // add if visible and available
      if (isAvailableAndVisible) {
        map.addLayer(config);
      }
    }
  });
  // TODO: think about removing sources
};

/**
 *
 * @param points
 * @param columns {
 * lat: {fieldIdx},
 * lng: {fieldIdx},
 * alt: {fieldIdx}
 * }
 * @param properties [{label: {fieldIdx}]
 * @returns {{type: string, properties: {}, features: {type: string, properties: {}, geometry: {type: string, coordinates: *[]}}[]}}
 */
function geojsonFromPoints() {
  var allData = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var filteredIndex = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var columns = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var properties = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];

  return {
    type: 'FeatureCollection',
    features: filteredIndex.map(function (index) {
      return allData[index];
    }).map(function (point) {
      return {
        type: 'Feature',
        properties: properties.reduce(function (final, property) {
          return (0, _extends6.default)({}, final, (0, _defineProperty3.default)({}, property.name, point[property.tableFieldIndex - 1]));
        }, {}),
        geometry: {
          type: 'Point',
          coordinates: [columns.lng ? point[columns.lng.fieldIdx] : null, // lng
          columns.lat ? point[columns.lat.fieldIdx] : null, // lat
          columns.altitude ? point[columns.altitude.fieldIdx] : 0 // altitude
          ]
        }
      };
    })
  };
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9sYXllcnMvbWFwYm94LXV0aWxzLmpzIl0sIm5hbWVzIjpbImdlbmVyYXRlTWFwYm94TGF5ZXJzIiwidXBkYXRlTWFwYm94TGF5ZXJzIiwiZ2VvanNvbkZyb21Qb2ludHMiLCJsYXllcnMiLCJsYXllckRhdGEiLCJsYXllck9yZGVyIiwibGVuZ3RoIiwic2xpY2UiLCJyZXZlcnNlIiwicmVkdWNlIiwib3ZlcmxheXMiLCJpZHgiLCJsYXllciIsIm92ZXJsYXlUeXBlIiwiT1ZFUkxBWV9UWVBFIiwibWFwYm94Z2wiLCJpZCIsImRhdGEiLCJjb25maWciLCJkYXRhc2V0SWQiLCJkYXRhSWQiLCJtYXAiLCJuZXdMYXllcnMiLCJvbGRMYXllcnMiLCJtYXBMYXllcnMiLCJvcHQiLCJmb3JjZSIsIm9sZExheWVyc0tleXMiLCJPYmplY3QiLCJrZXlzIiwiZm9yRWFjaCIsInJlbW92ZUxheWVyIiwibGF5ZXJJZCIsImN1cnJlbnRMYXllcnNJZHMiLCJmaW5hbCIsImxheWVyc1RvRGVsZXRlIiwib3ZlcmxheSIsImlzQXZhaWxhYmxlQW5kVmlzaWJsZSIsImlzVmlzaWJsZSIsInNvdXJjZSIsImdldFNvdXJjZSIsImFkZFNvdXJjZSIsInR5cGUiLCJzZXREYXRhIiwib2xkQ29uZmlnIiwibWFwYm94TGF5ZXIiLCJnZXRMYXllciIsImFkZExheWVyIiwiYWxsRGF0YSIsImZpbHRlcmVkSW5kZXgiLCJjb2x1bW5zIiwicHJvcGVydGllcyIsImZlYXR1cmVzIiwiaW5kZXgiLCJwcm9wZXJ0eSIsIm5hbWUiLCJwb2ludCIsInRhYmxlRmllbGRJbmRleCIsImdlb21ldHJ5IiwiY29vcmRpbmF0ZXMiLCJsbmciLCJmaWVsZElkeCIsImxhdCIsImFsdGl0dWRlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7UUE2QmdCQSxvQixHQUFBQSxvQjtRQWdDQUMsa0IsR0FBQUEsa0I7UUFpRkFDLGlCLEdBQUFBLGlCOztBQTFIaEI7Ozs7QUFFQTs7Ozs7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UUssS0FBUixDQUFUO0FBQUEsS0FBbEIsRUFBMkNoQyxHQUEzQyxDQUErQztBQUFBLGFBQVU7QUFDakVxQixjQUFNLFNBRDJEO0FBRWpFUyxvQkFBWUEsV0FBVzFDLE1BQVgsQ0FBa0IsVUFBQ3lCLEtBQUQsRUFBUW9CLFFBQVI7QUFBQSw0Q0FDekJwQixLQUR5QixvQ0FFM0JvQixTQUFTQyxJQUZrQixFQUVYQyxNQUFNRixTQUFTRyxlQUFULEdBQTJCLENBQWpDLENBRlc7QUFBQSxTQUFsQixFQUdSLEVBSFEsQ0FGcUQ7QUFNakVDLGtCQUFVO0FBQ1JoQixnQkFBTSxPQURFO0FBRVJpQix1QkFBYSxDQUNYVCxRQUFRVSxHQUFSLEdBQWNKLE1BQU1OLFFBQVFVLEdBQVIsQ0FBWUMsUUFBbEIsQ0FBZCxHQUE0QyxJQURqQyxFQUN1QztBQUNsRFgsa0JBQVFZLEdBQVIsR0FBY04sTUFBTU4sUUFBUVksR0FBUixDQUFZRCxRQUFsQixDQUFkLEdBQTRDLElBRmpDLEVBRXVDO0FBQ2xEWCxrQkFBUWEsUUFBUixHQUFtQlAsTUFBTU4sUUFBUWEsUUFBUixDQUFpQkYsUUFBdkIsQ0FBbkIsR0FBc0QsQ0FIM0MsQ0FHNkM7QUFIN0M7QUFGTDtBQU51RCxPQUFWO0FBQUEsS0FBL0M7QUFGTCxHQUFQO0FBa0JEIiwiZmlsZSI6Im1hcGJveC11dGlscy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgMjAxOCBVYmVyIFRlY2hub2xvZ2llcywgSW5jLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbi8vIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbi8vIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbi8vIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbi8vIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuLy8gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuLy8gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4vLyBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbi8vIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbi8vIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4vLyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4vLyBUSEUgU09GVFdBUkUuXG5cbmltcG9ydCB7T1ZFUkxBWV9UWVBFfSBmcm9tICcuL2Jhc2UtbGF5ZXInO1xuXG4vKipcbiAqIFRoaXMgZnVuY3Rpb24gd2lsbCBjb252ZXJ0IGxheWVycyB0byBtYXBib3ggbGF5ZXJzXG4gKiBAcGFyYW0gbGF5ZXJzIHRoZSBsYXllcnMgdG8gYmUgY29udmVydGVkXG4gKiBAcGFyYW0gbGF5ZXJEYXRhIGV4dHJhIGxheWVyIGluZm9ybWF0aW9uXG4gKiBAcGFyYW0gbGF5ZXJPcmRlciB0aGUgb3JkZXIgYnkgd2hpY2ggd2Ugc2hvdWxkIGNvbnZlcnQgbGF5ZXJzXG4gKiBAcmV0dXJucyB7Kn1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdlbmVyYXRlTWFwYm94TGF5ZXJzKGxheWVycyA9IFtdLCBsYXllckRhdGEgPSBbXSwgbGF5ZXJPcmRlciA9IFtdKSB7XG4gIGlmIChsYXllckRhdGEubGVuZ3RoID4gMCkge1xuICAgIHJldHVybiBsYXllck9yZGVyLnNsaWNlKClcbiAgICAgIC5yZXZlcnNlKClcbiAgICAgIC5yZWR1Y2UoKG92ZXJsYXlzLCBpZHgpID0+IHtcbiAgICAgICAgY29uc3QgbGF5ZXIgPSBsYXllcnNbaWR4XTtcblxuICAgICAgICByZXR1cm4gbGF5ZXIub3ZlcmxheVR5cGUgIT09IE9WRVJMQVlfVFlQRS5tYXBib3hnbCA/XG4gICAgICAgICAgb3ZlcmxheXNcbiAgICAgICAgICA6IFtcbiAgICAgICAgICAgIC4uLm92ZXJsYXlzLFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBpZDogbGF5ZXIuaWQsXG4gICAgICAgICAgICAgIGRhdGE6IGxheWVyRGF0YVtpZHhdLmRhdGEsXG4gICAgICAgICAgICAgIGNvbmZpZzogbGF5ZXJEYXRhW2lkeF0uY29uZmlnLFxuICAgICAgICAgICAgICBkYXRhc2V0SWQ6IGxheWVyLmNvbmZpZy5kYXRhSWRcbiAgICAgICAgICAgIH1cbiAgICAgICAgICBdXG4gICAgICB9LCBbXSk7XG4gIH1cblxuICByZXR1cm4gW107XG59O1xuXG4vKipcbiAqIFVwZGF0ZSBtYXBib3ggbGF5ZXJzIG9uIHRoZSBnaXZlbiBtYXBcbiAqIEBwYXJhbSBtYXBcbiAqIEBwYXJhbSBuZXdMYXllcnMgQXJyYXkgb2YgbmV3IG1hcGJveCBsYXllcnMgdG8gYmUgZGlzcGxheWVkXG4gKiBAcGFyYW0gb2xkTGF5ZXJzIE1hcCBvZiB0aGUgb2xkIGxheWVycyB0byBiZSBjb21wYXJlIHdpdGggdGhlIGN1cnJlbnQgb25lcyB0byBkZXRlY3QgZGVsZXRlZCBsYXllcnNcbiAqICAgICAgICAgICAgICAgICAge2xheWVySWQ6IGRhdGFzZXRJZH1cbiAqIEBwYXJhbSBtYXBMYXllcnMgY2FycmllcyBpbmZvcm1hdGlvbiBhYm91dCBzcGxpdCBtYXAgdmlld1xuICovXG5leHBvcnQgZnVuY3Rpb24gdXBkYXRlTWFwYm94TGF5ZXJzKG1hcCwgbmV3TGF5ZXJzID0gW10sIG9sZExheWVycyA9IG51bGwsIG1hcExheWVycyA9IG51bGwsIG9wdCA9IHtmb3JjZTogdHJ1ZX0pIHtcbiAgLy8gZGVsZXRlIG5vbiBleGlzdGluZyBsYXllcnNcblxuICBpZiAob2xkTGF5ZXJzKSB7XG4gICAgY29uc3Qgb2xkTGF5ZXJzS2V5cyA9IE9iamVjdC5rZXlzKG9sZExheWVycyk7XG4gICAgaWYgKG5ld0xheWVycy5sZW5ndGggPT09IDAgJiYgb2xkTGF5ZXJzS2V5cy5sZW5ndGggPiAwKSB7XG4gICAgICBvbGRMYXllcnNLZXlzLmZvckVhY2gobGF5ZXJJZCA9PiBtYXAucmVtb3ZlTGF5ZXIobGF5ZXJJZCkpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyByZW1vdmUgbGF5ZXJzXG4gICAgICBjb25zdCBjdXJyZW50TGF5ZXJzSWRzID0gbmV3TGF5ZXJzLnJlZHVjZSgoZmluYWwsIGxheWVyKSA9PiAoe1xuICAgICAgICAuLi5maW5hbCxcbiAgICAgICAgW2xheWVyLmlkXTogdHJ1ZVxuICAgICAgfSksIHt9KTtcblxuICAgICAgY29uc3QgbGF5ZXJzVG9EZWxldGUgPSBvbGRMYXllcnNLZXlzLnJlZHVjZSgoZmluYWwsIGxheWVySWQpID0+IHtcbiAgICAgICAgLy8gaWYgbGF5ZXIgZG9lc24ndCBleGlzdHMgYW55bW9yZVxuICAgICAgICBpZiAoIWN1cnJlbnRMYXllcnNJZHNbbGF5ZXJJZF0pIHtcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgLi4uZmluYWwsXG4gICAgICAgICAgICBbbGF5ZXJJZF06IG9sZExheWVyc1tsYXllcklkXVxuICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZpbmFsO1xuICAgICAgfSwgW10pO1xuICAgICAgT2JqZWN0LmtleXMobGF5ZXJzVG9EZWxldGUpLmZvckVhY2gobGF5ZXJJZCA9PiBtYXAucmVtb3ZlTGF5ZXIobGF5ZXJJZCkpO1xuICAgIH1cbiAgfVxuXG4gIC8vIGluc2VydCBvciB1cGRhdGUgbmV3bGF5ZXJcbiAgbmV3TGF5ZXJzLmZvckVhY2gob3ZlcmxheSA9PiB7XG4gICAgY29uc3Qge2lkOiBsYXllcklkLCBjb25maWcsIGRhdGEsIGRhdGFzZXRJZH0gPSBvdmVybGF5O1xuICAgIGlmICghZGF0YSAmJiAhY29uZmlnKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IGlzQXZhaWxhYmxlQW5kVmlzaWJsZSA9XG4gICAgICAhKG1hcExheWVycyAmJiBtYXBMYXllcnNbbGF5ZXJJZF0pIHx8IG1hcExheWVyc1tsYXllcklkXS5pc1Zpc2libGU7XG4gICAgLy8gY2hlY2tpbmcgaWYgc291cmNlIGFscmVhZHkgZXhpc3RzXG5cbiAgICBpZiAoZGF0YSAmJiBpc0F2YWlsYWJsZUFuZFZpc2libGUpIHtcbiAgICAgIGNvbnN0IHNvdXJjZSA9IG1hcC5nZXRTb3VyY2UoZGF0YXNldElkKTtcbiAgICAgIGlmICghc291cmNlKSB7XG4gICAgICAgIG1hcC5hZGRTb3VyY2UoZGF0YXNldElkLCB7XG4gICAgICAgICAgdHlwZTogJ2dlb2pzb24nLFxuICAgICAgICAgIGRhdGFcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgc291cmNlLnNldERhdGEoZGF0YSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3Qgb2xkQ29uZmlnID0gb2xkTGF5ZXJzW2xheWVySWRdO1xuICAgIGNvbnN0IG1hcGJveExheWVyID0gbWFwLmdldExheWVyKGxheWVySWQpO1xuICAgIC8vIGNvbXBhcmUgd2l0aCBwcmV2aW91cyBjb25maWdzXG5cbiAgICBpZiAoIW9sZENvbmZpZyB8fCBvbGRDb25maWcgIT09IGNvbmZpZyB8fCAhbWFwYm94TGF5ZXIgfHwgb3B0LmZvcmNlKSB7XG4gICAgICAvLyBjaGVjayBpZiBsYXllciBhbHJlYWR5IGlzIHNldFxuICAgICAgLy8gcmVtb3ZlIGl0IGlmIGV4aXN0c1xuICAgICAgaWYgKG1hcGJveExheWVyKSB7XG4gICAgICAgIG1hcC5yZW1vdmVMYXllcihsYXllcklkKTtcbiAgICAgIH1cbiAgICAgIC8vIGFkZCBpZiB2aXNpYmxlIGFuZCBhdmFpbGFibGVcbiAgICAgIGlmIChpc0F2YWlsYWJsZUFuZFZpc2libGUpIHtcbiAgICAgICAgbWFwLmFkZExheWVyKGNvbmZpZyk7XG4gICAgICB9XG4gICAgfVxuICB9KTtcbiAgLy8gVE9ETzogdGhpbmsgYWJvdXQgcmVtb3Zpbmcgc291cmNlc1xufTtcblxuLyoqXG4gKlxuICogQHBhcmFtIHBvaW50c1xuICogQHBhcmFtIGNvbHVtbnMge1xuICogbGF0OiB7ZmllbGRJZHh9LFxuICogbG5nOiB7ZmllbGRJZHh9LFxuICogYWx0OiB7ZmllbGRJZHh9XG4gKiB9XG4gKiBAcGFyYW0gcHJvcGVydGllcyBbe2xhYmVsOiB7ZmllbGRJZHh9XVxuICogQHJldHVybnMge3t0eXBlOiBzdHJpbmcsIHByb3BlcnRpZXM6IHt9LCBmZWF0dXJlczoge3R5cGU6IHN0cmluZywgcHJvcGVydGllczoge30sIGdlb21ldHJ5OiB7dHlwZTogc3RyaW5nLCBjb29yZGluYXRlczogKltdfX1bXX19XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZW9qc29uRnJvbVBvaW50cyhhbGxEYXRhID0gW10sIGZpbHRlcmVkSW5kZXggPSBbXSwgY29sdW1ucyA9IHt9LCBwcm9wZXJ0aWVzID0gW10pIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiAnRmVhdHVyZUNvbGxlY3Rpb24nLFxuICAgIGZlYXR1cmVzOiBmaWx0ZXJlZEluZGV4Lm1hcChpbmRleCA9PiBhbGxEYXRhW2luZGV4XSkubWFwKHBvaW50ID0+ICh7XG4gICAgICB0eXBlOiAnRmVhdHVyZScsXG4gICAgICBwcm9wZXJ0aWVzOiBwcm9wZXJ0aWVzLnJlZHVjZSgoZmluYWwsIHByb3BlcnR5KSA9PiAoe1xuICAgICAgICAuLi5maW5hbCxcbiAgICAgICAgW3Byb3BlcnR5Lm5hbWVdOiBwb2ludFtwcm9wZXJ0eS50YWJsZUZpZWxkSW5kZXggLSAxXVxuICAgICAgfSksIHt9KSxcbiAgICAgIGdlb21ldHJ5OiB7XG4gICAgICAgIHR5cGU6ICdQb2ludCcsXG4gICAgICAgIGNvb3JkaW5hdGVzOiBbXG4gICAgICAgICAgY29sdW1ucy5sbmcgPyBwb2ludFtjb2x1bW5zLmxuZy5maWVsZElkeF0gOiBudWxsLCAvLyBsbmdcbiAgICAgICAgICBjb2x1bW5zLmxhdCA/IHBvaW50W2NvbHVtbnMubGF0LmZpZWxkSWR4XSA6IG51bGwsIC8vIGxhdFxuICAgICAgICAgIGNvbHVtbnMuYWx0aXR1ZGUgPyBwb2ludFtjb2x1bW5zLmFsdGl0dWRlLmZpZWxkSWR4XSA6IDAgLy8gYWx0aXR1ZGVcbiAgICAgICAgXVxuICAgICAgfVxuICAgIH0pKVxuICB9O1xufVxuIl19