'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.editBottomMapStyle = exports.editTopMapStyle = undefined;

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends3 = require('babel-runtime/helpers/extends');

var _extends4 = _interopRequireDefault(_extends3);

exports.getDefaultLayerGroupVisibility = getDefaultLayerGroupVisibility;
exports.isValidStyleUrl = isValidStyleUrl;
exports.getStyleDownloadUrl = getStyleDownloadUrl;
exports.scaleMapStyleByResolution = scaleMapStyleByResolution;
exports.mergeLayerGroupVisibility = mergeLayerGroupVisibility;

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _lodash = require('lodash.memoize');

var _lodash2 = _interopRequireDefault(_lodash);

var _defaultSettings = require('../../constants/default-settings');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getDefaultLayerGroupVisibility(_ref) {
  var _ref$layerGroups = _ref.layerGroups,
      layerGroups = _ref$layerGroups === undefined ? [] : _ref$layerGroups;

  return layerGroups.reduce(function (accu, layer) {
    return (0, _extends4.default)({}, accu, (0, _defineProperty3.default)({}, layer.slug, layer.defaultVisibility));
  }, {});
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

var resolver = function resolver(_ref2) {
  var id = _ref2.id,
      mapStyle = _ref2.mapStyle,
      _ref2$visibleLayerGro = _ref2.visibleLayerGroups,
      visibleLayerGroups = _ref2$visibleLayerGro === undefined ? {} : _ref2$visibleLayerGro;
  return id + ':' + Object.keys(visibleLayerGroups).filter(function (d) {
    return visibleLayerGroups[d];
  }).sort().join('-');
};

/**
 * Edit preset map style to keep only visible layers
 *
 * @param {object} mapStyle - preset map style
 * @param {object} visibleLayerGroups - visible layers of top map
 * @returns {Immutable.Map} top map style
 */
var editTopMapStyle = exports.editTopMapStyle = (0, _lodash2.default)(function (_ref3) {
  var id = _ref3.id,
      mapStyle = _ref3.mapStyle,
      visibleLayerGroups = _ref3.visibleLayerGroups;

  var visibleFilters = (mapStyle.layerGroups || []).filter(function (lg) {
    return visibleLayerGroups[lg.slug];
  }).map(function (lg) {
    return lg.filter;
  });

  // if top map
  // keep only visible layers
  var filteredLayers = mapStyle.style.layers.filter(function (layer) {
    return visibleFilters.some(function (match) {
      return match(layer);
    });
  });

  return _immutable2.default.fromJS((0, _extends4.default)({}, mapStyle.style, {
    layers: filteredLayers
  }));
}, resolver);

/**
 * Edit preset map style to filter out invisible layers
 *
 * @param {object} mapStyle - preset map style
 * @param {object} visibleLayerGroups - visible layers of bottom map
 * @returns {Immutable.Map} bottom map style
 */
var editBottomMapStyle = exports.editBottomMapStyle = (0, _lodash2.default)(function (_ref4) {
  var id = _ref4.id,
      mapStyle = _ref4.mapStyle,
      visibleLayerGroups = _ref4.visibleLayerGroups;

  var invisibleFilters = (mapStyle.layerGroups || []).filter(function (lg) {
    return !visibleLayerGroups[lg.slug];
  }).map(function (lg) {
    return lg.filter;
  });

  // if bottom map
  // filter out invisible layers
  var filteredLayers = mapStyle.style.layers.filter(function (layer) {
    return invisibleFilters.every(function (match) {
      return !match(layer);
    });
  });

  // console.log(filteredLayers)
  return _immutable2.default.fromJS((0, _extends4.default)({}, mapStyle.style, {
    layers: filteredLayers
  }));
}, resolver);

var mapUrlRg = /^mapbox:\/\/styles\/[-a-z0-9]{2,256}\/[-a-z0-9]{2,256}/;
var httpRg = /^(?=(http:|https:))/;
var mapboxStyleApiUrl = 'https://api.mapbox.com/styles/v1/';

// valid style url
// mapbox://styles/uberdata/cjfyl03kp1tul2smf5v2tbdd4
// lowercase letters, numbers and dashes only.
function isValidStyleUrl(url) {
  return typeof url === 'string' && Boolean(url.match(mapUrlRg) || url.match(httpRg));
}

function getStyleDownloadUrl(styleUrl, accessToken) {
  if (styleUrl.startsWith('http')) {
    return styleUrl;
  }

  // mapbox://styles/jckr/cjhcl0lxv13di2rpfoytdbdyj
  if (styleUrl.startsWith('mapbox://styles')) {
    var styleId = styleUrl.replace('mapbox://styles/', '');

    // https://api.mapbox.com/styles/v1/heshan0131/cjg1bfumo1cwm2rlrjxkinfgw?pluginName=Keplergl&access_token=<token>
    return '' + mapboxStyleApiUrl + styleId + '?pluginName=Keplergl&access_token=' + accessToken;
  }

  // style url not recognized
  return null;
}

function scaleMapStyleByResolution(mapboxStyle, resolution) {
  var labelLayerGroup = _defaultSettings.DEFAULT_LAYER_GROUPS.find(function (lg) {
    return lg.slug === 'label';
  });
  var labelLayerFilter = labelLayerGroup.filter;


  if (resolution !== _defaultSettings.RESOLUTIONS.ONE_X && mapboxStyle) {
    var _RESOLUTION_OPTIONS$f = _defaultSettings.RESOLUTION_OPTIONS.find(function (r) {
      return r.id === resolution;
    }),
        scale = _RESOLUTION_OPTIONS$f.scale,
        zoomOffset = _RESOLUTION_OPTIONS$f.zoomOffset;

    var copyStyle = mapboxStyle.toJS();
    (copyStyle.layers || []).forEach(function (d) {
      // edit minzoom and maxzoom
      if (d.maxzoom) {
        d.maxzoom += zoomOffset;
      }

      if (d.minzoom) {
        d.minzoom += zoomOffset;
      }

      // edit text size
      if (labelLayerFilter(d)) {
        if (d.layout && d.layout['text-size'] && Array.isArray(d.layout['text-size'].stops)) {
          d.layout['text-size'].stops.forEach(function (stop) {
            // zoom
            stop[0] += Math.log2(scale);
            // size
            stop[1] *= scale;
          });
        }
      }
    });

    return _immutable2.default.fromJS(copyStyle);
  }

  return mapboxStyle;
}

/**
 * When switch to a new style, try to keep current layer group visibility
 * by merging default and current
 * @param {object} defaultLayerGroup
 * @param {object} currentLayerGroup
 * @return {object} mergedLayerGroups
 */
function mergeLayerGroupVisibility(defaultLayerGroup, currentLayerGroup) {
  return Object.keys(currentLayerGroup).reduce(function (accu, key) {
    return (0, _extends4.default)({}, accu, defaultLayerGroup.hasOwnProperty(key) ? (0, _defineProperty3.default)({}, key, currentLayerGroup[key]) : {});
  }, defaultLayerGroup);
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy91dGlscy9tYXAtc3R5bGUtdXRpbHMvbWFwYm94LWdsLXN0eWxlLWVkaXRvci5qcyJdLCJuYW1lcyI6WyJnZXREZWZhdWx0TGF5ZXJHcm91cFZpc2liaWxpdHkiLCJpc1ZhbGlkU3R5bGVVcmwiLCJnZXRTdHlsZURvd25sb2FkVXJsIiwic2NhbGVNYXBTdHlsZUJ5UmVzb2x1dGlvbiIsIm1lcmdlTGF5ZXJHcm91cFZpc2liaWxpdHkiLCJsYXllckdyb3VwcyIsInJlZHVjZSIsImFjY3UiLCJsYXllciIsInNsdWciLCJkZWZhdWx0VmlzaWJpbGl0eSIsInJlc29sdmVyIiwiaWQiLCJtYXBTdHlsZSIsInZpc2libGVMYXllckdyb3VwcyIsIk9iamVjdCIsImtleXMiLCJmaWx0ZXIiLCJkIiwic29ydCIsImpvaW4iLCJlZGl0VG9wTWFwU3R5bGUiLCJ2aXNpYmxlRmlsdGVycyIsImxnIiwibWFwIiwiZmlsdGVyZWRMYXllcnMiLCJzdHlsZSIsImxheWVycyIsInNvbWUiLCJtYXRjaCIsIkltbXV0YWJsZSIsImZyb21KUyIsImVkaXRCb3R0b21NYXBTdHlsZSIsImludmlzaWJsZUZpbHRlcnMiLCJldmVyeSIsIm1hcFVybFJnIiwiaHR0cFJnIiwibWFwYm94U3R5bGVBcGlVcmwiLCJ1cmwiLCJCb29sZWFuIiwic3R5bGVVcmwiLCJhY2Nlc3NUb2tlbiIsInN0YXJ0c1dpdGgiLCJzdHlsZUlkIiwicmVwbGFjZSIsIm1hcGJveFN0eWxlIiwicmVzb2x1dGlvbiIsImxhYmVsTGF5ZXJHcm91cCIsIkRFRkFVTFRfTEFZRVJfR1JPVVBTIiwiZmluZCIsImxhYmVsTGF5ZXJGaWx0ZXIiLCJSRVNPTFVUSU9OUyIsIk9ORV9YIiwiUkVTT0xVVElPTl9PUFRJT05TIiwiciIsInNjYWxlIiwiem9vbU9mZnNldCIsImNvcHlTdHlsZSIsInRvSlMiLCJmb3JFYWNoIiwibWF4em9vbSIsIm1pbnpvb20iLCJsYXlvdXQiLCJBcnJheSIsImlzQXJyYXkiLCJzdG9wcyIsInN0b3AiLCJNYXRoIiwibG9nMiIsImRlZmF1bHRMYXllckdyb3VwIiwiY3VycmVudExheWVyR3JvdXAiLCJrZXkiLCJoYXNPd25Qcm9wZXJ0eSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O1FBNEJnQkEsOEIsR0FBQUEsOEI7UUEyRUFDLGUsR0FBQUEsZTtRQUlBQyxtQixHQUFBQSxtQjtRQWlCQUMseUIsR0FBQUEseUI7UUFpREFDLHlCLEdBQUFBLHlCOztBQXpKaEI7Ozs7QUFDQTs7OztBQUNBOzs7O0FBTU8sU0FBU0osOEJBQVQsT0FBNEQ7QUFBQSw4QkFBbkJLLFdBQW1CO0FBQUEsTUFBbkJBLFdBQW1CLG9DQUFMLEVBQUs7O0FBQ2pFLFNBQU9BLFlBQVlDLE1BQVosQ0FDTCxVQUFDQyxJQUFELEVBQU9DLEtBQVA7QUFBQSxzQ0FDS0QsSUFETCxvQ0FFR0MsTUFBTUMsSUFGVCxFQUVnQkQsTUFBTUUsaUJBRnRCO0FBQUEsR0FESyxFQUtMLEVBTEssQ0FBUDtBQU9ELEMsQ0FwQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBb0JBLElBQU1DLFdBQVcsU0FBWEEsUUFBVztBQUFBLE1BQUVDLEVBQUYsU0FBRUEsRUFBRjtBQUFBLE1BQU1DLFFBQU4sU0FBTUEsUUFBTjtBQUFBLG9DQUFnQkMsa0JBQWhCO0FBQUEsTUFBZ0JBLGtCQUFoQix5Q0FBcUMsRUFBckM7QUFBQSxTQUNaRixFQURZLFNBQ05HLE9BQU9DLElBQVAsQ0FBWUYsa0JBQVosRUFDTkcsTUFETSxDQUNDO0FBQUEsV0FBS0gsbUJBQW1CSSxDQUFuQixDQUFMO0FBQUEsR0FERCxFQUVOQyxJQUZNLEdBR05DLElBSE0sQ0FHRCxHQUhDLENBRE07QUFBQSxDQUFqQjs7QUFNQTs7Ozs7OztBQU9PLElBQU1DLDRDQUFrQixzQkFBUSxpQkFBd0M7QUFBQSxNQUF0Q1QsRUFBc0MsU0FBdENBLEVBQXND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Ozs7Ozs7O0FBT08sU0FBU3pDLHlCQUFULENBQW1DaUUsaUJBQW5DLEVBQXNEQyxpQkFBdEQsRUFBeUU7QUFDOUUsU0FBT3ZELE9BQU9DLElBQVAsQ0FBWXNELGlCQUFaLEVBQ0poRSxNQURJLENBQ0csVUFBQ0MsSUFBRCxFQUFPZ0UsR0FBUDtBQUFBLHNDQUNIaEUsSUFERyxFQUVGOEQsa0JBQWtCRyxjQUFsQixDQUFpQ0QsR0FBakMsc0NBQTBDQSxHQUExQyxFQUFnREQsa0JBQWtCQyxHQUFsQixDQUFoRCxJQUEwRSxFQUZ4RTtBQUFBLEdBREgsRUFJREYsaUJBSkMsQ0FBUDtBQUtEIiwiZmlsZSI6Im1hcGJveC1nbC1zdHlsZS1lZGl0b3IuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIDIwMTggVWJlciBUZWNobm9sb2dpZXMsIEluYy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4vLyBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4vLyBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4vLyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4vLyBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbi8vIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbi8vIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1Jcbi8vIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuLy8gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4vLyBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4vLyBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuLy8gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuLy8gVEhFIFNPRlRXQVJFLlxuXG5pbXBvcnQgSW1tdXRhYmxlIGZyb20gJ2ltbXV0YWJsZSc7XG5pbXBvcnQgbWVtb2l6ZSBmcm9tICdsb2Rhc2gubWVtb2l6ZSc7XG5pbXBvcnQge1xuICBERUZBVUxUX0xBWUVSX0dST1VQUyxcbiAgUkVTT0xVVElPTlMsXG4gIFJFU09MVVRJT05fT1BUSU9OU1xufSBmcm9tICdjb25zdGFudHMvZGVmYXVsdC1zZXR0aW5ncyc7XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXREZWZhdWx0TGF5ZXJHcm91cFZpc2liaWxpdHkoe2xheWVyR3JvdXBzID0gW119KSB7XG4gIHJldHVybiBsYXllckdyb3Vwcy5yZWR1Y2UoXG4gICAgKGFjY3UsIGxheWVyKSA9PiAoe1xuICAgICAgLi4uYWNjdSxcbiAgICAgIFtsYXllci5zbHVnXTogbGF5ZXIuZGVmYXVsdFZpc2liaWxpdHlcbiAgICB9KSxcbiAgICB7fVxuICApO1xufVxuXG5jb25zdCByZXNvbHZlciA9ICh7aWQsIG1hcFN0eWxlLCB2aXNpYmxlTGF5ZXJHcm91cHMgPSB7fX0pID0+XG4gIGAke2lkfToke09iamVjdC5rZXlzKHZpc2libGVMYXllckdyb3VwcylcbiAgICAuZmlsdGVyKGQgPT4gdmlzaWJsZUxheWVyR3JvdXBzW2RdKVxuICAgIC5zb3J0KClcbiAgICAuam9pbignLScpfWA7XG5cbi8qKlxuICogRWRpdCBwcmVzZXQgbWFwIHN0eWxlIHRvIGtlZXAgb25seSB2aXNpYmxlIGxheWVyc1xuICpcbiAqIEBwYXJhbSB7b2JqZWN0fSBtYXBTdHlsZSAtIHByZXNldCBtYXAgc3R5bGVcbiAqIEBwYXJhbSB7b2JqZWN0fSB2aXNpYmxlTGF5ZXJHcm91cHMgLSB2aXNpYmxlIGxheWVycyBvZiB0b3AgbWFwXG4gKiBAcmV0dXJucyB7SW1tdXRhYmxlLk1hcH0gdG9wIG1hcCBzdHlsZVxuICovXG5leHBvcnQgY29uc3QgZWRpdFRvcE1hcFN0eWxlID0gbWVtb2l6ZSgoe2lkLCBtYXBTdHlsZSwgdmlzaWJsZUxheWVyR3JvdXBzfSkgPT4ge1xuICBjb25zdCB2aXNpYmxlRmlsdGVycyA9IChtYXBTdHlsZS5sYXllckdyb3VwcyB8fCBbXSlcbiAgICAuZmlsdGVyKGxnID0+IHZpc2libGVMYXllckdyb3Vwc1tsZy5zbHVnXSlcbiAgICAubWFwKGxnID0+IGxnLmZpbHRlcik7XG5cbiAgLy8gaWYgdG9wIG1hcFxuICAvLyBrZWVwIG9ubHkgdmlzaWJsZSBsYXllcnNcbiAgY29uc3QgZmlsdGVyZWRMYXllcnMgPSBtYXBTdHlsZS5zdHlsZS5sYXllcnMuZmlsdGVyKGxheWVyID0+XG4gICAgdmlzaWJsZUZpbHRlcnMuc29tZShtYXRjaCA9PiBtYXRjaChsYXllcikpXG4gICk7XG5cbiAgcmV0dXJuIEltbXV0YWJsZS5mcm9tSlMoe1xuICAgIC4uLm1hcFN0eWxlLnN0eWxlLFxuICAgIGxheWVyczogZmlsdGVyZWRMYXllcnNcbiAgfSk7XG59LCByZXNvbHZlcik7XG5cbi8qKlxuICogRWRpdCBwcmVzZXQgbWFwIHN0eWxlIHRvIGZpbHRlciBvdXQgaW52aXNpYmxlIGxheWVyc1xuICpcbiAqIEBwYXJhbSB7b2JqZWN0fSBtYXBTdHlsZSAtIHByZXNldCBtYXAgc3R5bGVcbiAqIEBwYXJhbSB7b2JqZWN0fSB2aXNpYmxlTGF5ZXJHcm91cHMgLSB2aXNpYmxlIGxheWVycyBvZiBib3R0b20gbWFwXG4gKiBAcmV0dXJucyB7SW1tdXRhYmxlLk1hcH0gYm90dG9tIG1hcCBzdHlsZVxuICovXG5leHBvcnQgY29uc3QgZWRpdEJvdHRvbU1hcFN0eWxlID0gbWVtb2l6ZShcbiAgKHtpZCwgbWFwU3R5bGUsIHZpc2libGVMYXllckdyb3Vwc30pID0+IHtcbiAgICBjb25zdCBpbnZpc2libGVGaWx0ZXJzID0gKG1hcFN0eWxlLmxheWVyR3JvdXBzIHx8IFtdKVxuICAgICAgLmZpbHRlcihsZyA9PiAhdmlzaWJsZUxheWVyR3JvdXBzW2xnLnNsdWddKVxuICAgICAgLm1hcChsZyA9PiBsZy5maWx0ZXIpO1xuXG4gICAgLy8gaWYgYm90dG9tIG1hcFxuICAgIC8vIGZpbHRlciBvdXQgaW52aXNpYmxlIGxheWVyc1xuICAgIGNvbnN0IGZpbHRlcmVkTGF5ZXJzID0gbWFwU3R5bGUuc3R5bGUubGF5ZXJzLmZpbHRlcihsYXllciA9PlxuICAgICAgaW52aXNpYmxlRmlsdGVycy5ldmVyeShtYXRjaCA9PiAhbWF0Y2gobGF5ZXIpKVxuICAgICk7XG5cbiAgICAvLyBjb25zb2xlLmxvZyhmaWx0ZXJlZExheWVycylcbiAgICByZXR1cm4gSW1tdXRhYmxlLmZyb21KUyh7XG4gICAgICAuLi5tYXBTdHlsZS5zdHlsZSxcbiAgICAgIGxheWVyczogZmlsdGVyZWRMYXllcnNcbiAgICB9KTtcbiAgfSxcbiAgcmVzb2x2ZXJcbik7XG5cbmNvbnN0IG1hcFVybFJnID0gL15tYXBib3g6XFwvXFwvc3R5bGVzXFwvWy1hLXowLTldezIsMjU2fVxcL1stYS16MC05XXsyLDI1Nn0vO1xuY29uc3QgaHR0cFJnID0gL14oPz0oaHR0cDp8aHR0cHM6KSkvO1xuY29uc3QgbWFwYm94U3R5bGVBcGlVcmwgPSAnaHR0cHM6Ly9hcGkubWFwYm94LmNvbS9zdHlsZXMvdjEvJztcblxuLy8gdmFsaWQgc3R5bGUgdXJsXG4vLyBtYXBib3g6Ly9zdHlsZXMvdWJlcmRhdGEvY2pmeWwwM2twMXR1bDJzbWY1djJ0YmRkNFxuLy8gbG93ZXJjYXNlIGxldHRlcnMsIG51bWJlcnMgYW5kIGRhc2hlcyBvbmx5LlxuZXhwb3J0IGZ1bmN0aW9uIGlzVmFsaWRTdHlsZVVybCh1cmwpIHtcbiAgcmV0dXJuIHR5cGVvZiB1cmwgPT09ICdzdHJpbmcnICYmIEJvb2xlYW4odXJsLm1hdGNoKG1hcFVybFJnKSB8fCB1cmwubWF0Y2goaHR0cFJnKSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRTdHlsZURvd25sb2FkVXJsKHN0eWxlVXJsLCBhY2Nlc3NUb2tlbikge1xuICBpZiAoc3R5bGVVcmwuc3RhcnRzV2l0aCgnaHR0cCcpKSB7XG4gICAgcmV0dXJuIHN0eWxlVXJsO1xuICB9XG5cbiAgLy8gbWFwYm94Oi8vc3R5bGVzL2pja3IvY2poY2wwbHh2MTNkaTJycGZveXRkYmR5alxuICBpZiAoc3R5bGVVcmwuc3RhcnRzV2l0aCgnbWFwYm94Oi8vc3R5bGVzJykpIHtcbiAgICBjb25zdCBzdHlsZUlkID0gc3R5bGVVcmwucmVwbGFjZSgnbWFwYm94Oi8vc3R5bGVzLycsICcnKTtcblxuICAgIC8vIGh0dHBzOi8vYXBpLm1hcGJveC5jb20vc3R5bGVzL3YxL2hlc2hhbjAxMzEvY2pnMWJmdW1vMWN3bTJybHJqeGtpbmZndz9wbHVnaW5OYW1lPUtlcGxlcmdsJmFjY2Vzc190b2tlbj08dG9rZW4+XG4gICAgcmV0dXJuIGAke21hcGJveFN0eWxlQXBpVXJsfSR7c3R5bGVJZH0/cGx1Z2luTmFtZT1LZXBsZXJnbCZhY2Nlc3NfdG9rZW49JHthY2Nlc3NUb2tlbn1gXG4gIH1cblxuICAvLyBzdHlsZSB1cmwgbm90IHJlY29nbml6ZWRcbiAgcmV0dXJuIG51bGw7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzY2FsZU1hcFN0eWxlQnlSZXNvbHV0aW9uKG1hcGJveFN0eWxlLCByZXNvbHV0aW9uKSB7XG4gIGNvbnN0IGxhYmVsTGF5ZXJHcm91cCA9IERFRkFVTFRfTEFZRVJfR1JPVVBTLmZpbmQobGcgPT4gbGcuc2x1ZyA9PT0gJ2xhYmVsJyk7XG4gIGNvbnN0IHtmaWx0ZXI6IGxhYmVsTGF5ZXJGaWx0ZXJ9ID0gbGFiZWxMYXllckdyb3VwO1xuXG4gIGlmIChyZXNvbHV0aW9uICE9PSBSRVNPTFVUSU9OUy5PTkVfWCAmJiBtYXBib3hTdHlsZSkge1xuICAgIGNvbnN0IHtzY2FsZSwgem9vbU9mZnNldH0gPSBSRVNPTFVUSU9OX09QVElPTlMuZmluZChcbiAgICAgIHIgPT4gci5pZCA9PT0gcmVzb2x1dGlvblxuICAgICk7XG4gICAgY29uc3QgY29weVN0eWxlID0gbWFwYm94U3R5bGUudG9KUygpO1xuICAgIChjb3B5U3R5bGUubGF5ZXJzIHx8IFtdKS5mb3JFYWNoKGQgPT4ge1xuICAgICAgLy8gZWRpdCBtaW56b29tIGFuZCBtYXh6b29tXG4gICAgICBpZiAoZC5tYXh6b29tKSB7XG4gICAgICAgIGQubWF4em9vbSArPSB6b29tT2Zmc2V0O1xuICAgICAgfVxuXG4gICAgICBpZiAoZC5taW56b29tKSB7XG4gICAgICAgIGQubWluem9vbSArPSB6b29tT2Zmc2V0O1xuICAgICAgfVxuXG4gICAgICAvLyBlZGl0IHRleHQgc2l6ZVxuICAgICAgaWYgKGxhYmVsTGF5ZXJGaWx0ZXIoZCkpIHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgIGQubGF5b3V0ICYmXG4gICAgICAgICAgZC5sYXlvdXRbJ3RleHQtc2l6ZSddICYmXG4gICAgICAgICAgQXJyYXkuaXNBcnJheShkLmxheW91dFsndGV4dC1zaXplJ10uc3RvcHMpXG4gICAgICAgICkge1xuICAgICAgICAgIGQubGF5b3V0Wyd0ZXh0LXNpemUnXS5zdG9wcy5mb3JFYWNoKHN0b3AgPT4ge1xuICAgICAgICAgICAgLy8gem9vbVxuICAgICAgICAgICAgc3RvcFswXSArPSBNYXRoLmxvZzIoc2NhbGUpO1xuICAgICAgICAgICAgLy8gc2l6ZVxuICAgICAgICAgICAgc3RvcFsxXSAqPSBzY2FsZTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIEltbXV0YWJsZS5mcm9tSlMoY29weVN0eWxlKTtcbiAgfVxuXG4gIHJldHVybiBtYXBib3hTdHlsZTtcbn1cblxuLyoqXG4gKiBXaGVuIHN3aXRjaCB0byBhIG5ldyBzdHlsZSwgdHJ5IHRvIGtlZXAgY3VycmVudCBsYXllciBncm91cCB2aXNpYmlsaXR5XG4gKiBieSBtZXJnaW5nIGRlZmF1bHQgYW5kIGN1cnJlbnRcbiAqIEBwYXJhbSB7b2JqZWN0fSBkZWZhdWx0TGF5ZXJHcm91cFxuICogQHBhcmFtIHtvYmplY3R9IGN1cnJlbnRMYXllckdyb3VwXG4gKiBAcmV0dXJuIHtvYmplY3R9IG1lcmdlZExheWVyR3JvdXBzXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBtZXJnZUxheWVyR3JvdXBWaXNpYmlsaXR5KGRlZmF1bHRMYXllckdyb3VwLCBjdXJyZW50TGF5ZXJHcm91cCkge1xuICByZXR1cm4gT2JqZWN0LmtleXMoY3VycmVudExheWVyR3JvdXApXG4gICAgLnJlZHVjZSgoYWNjdSwga2V5KSA9PiAoe1xuICAgICAgLi4uYWNjdSxcbiAgICAgIC4uLihkZWZhdWx0TGF5ZXJHcm91cC5oYXNPd25Qcm9wZXJ0eShrZXkpID8ge1trZXldOiBjdXJyZW50TGF5ZXJHcm91cFtrZXldfSA6IHt9KVxuICAgIH0pLCBkZWZhdWx0TGF5ZXJHcm91cCk7XG59XG5cbiJdfQ==