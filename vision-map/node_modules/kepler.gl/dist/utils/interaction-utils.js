'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BRUSH_CONFIG = undefined;

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

exports.getDefaultInteraction = getDefaultInteraction;
exports.findFieldsToShow = findFieldsToShow;

var _defaultSettings = require('../constants/default-settings');

var _icons = require('../components/common/icons');

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

function getDefaultInteraction() {
  return {
    tooltip: {
      id: 'tooltip',
      enabled: true,
      iconComponent: _icons.Messages,
      config: {
        fieldsToShow: {}
      }
    },
    brush: {
      id: 'brush',
      enabled: false,
      iconComponent: _icons.Crosshairs,
      config: {
        // size is in km
        size: 0.5
      }
    }
  };
}

var BRUSH_CONFIG = exports.BRUSH_CONFIG = {
  range: [0, 50]
};

function findFieldsToShow(_ref) {
  var fields = _ref.fields,
      id = _ref.id;

  // first find default tooltip fields for trips
  var fieldsToShow = _defaultSettings.DEFAULT_TOOLTIP_FIELDS.reduce(function (prev, curr) {
    if (fields.find(function (_ref2) {
      var name = _ref2.name;
      return curr === name;
    })) {
      prev.push(curr);
    }
    return prev;
  }, []);

  return (0, _defineProperty3.default)({}, id, fieldsToShow.length ? fieldsToShow : autoFindTooltipFields(fields));
}

function autoFindTooltipFields(fields) {
  var ptFields = _mergeFieldPairs(_defaultSettings.TRIP_POINT_FIELDS);
  // filter out the default fields that contains lat and lng and any geometry
  var fieldsToShow = fields.filter(function (_ref4) {
    var name = _ref4.name,
        type = _ref4.type;
    return name.replace(/[_,.]+/g, ' ').trim().split(' ').every(function (seg) {
      return !ptFields.includes(seg);
    }) && type !== _defaultSettings.ALL_FIELD_TYPES.geojson && type !== 'object';
  });

  return fieldsToShow.slice(0, _defaultSettings.MAX_DEFAULT_TOOLTIPS).map(function (d) {
    return d.name;
  });
}

function _mergeFieldPairs(pairs) {
  return pairs.reduce(function (prev, pair) {
    return [].concat((0, _toConsumableArray3.default)(prev), (0, _toConsumableArray3.default)(pair));
  }, []);
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9pbnRlcmFjdGlvbi11dGlscy5qcyJdLCJuYW1lcyI6WyJnZXREZWZhdWx0SW50ZXJhY3Rpb24iLCJmaW5kRmllbGRzVG9TaG93IiwidG9vbHRpcCIsImlkIiwiZW5hYmxlZCIsImljb25Db21wb25lbnQiLCJNZXNzYWdlcyIsImNvbmZpZyIsImZpZWxkc1RvU2hvdyIsImJydXNoIiwiQ3Jvc3NoYWlycyIsInNpemUiLCJCUlVTSF9DT05GSUciLCJyYW5nZSIsImZpZWxkcyIsIkRFRkFVTFRfVE9PTFRJUF9GSUVMRFMiLCJyZWR1Y2UiLCJwcmV2IiwiY3VyciIsImZpbmQiLCJuYW1lIiwicHVzaCIsImxlbmd0aCIsImF1dG9GaW5kVG9vbHRpcEZpZWxkcyIsInB0RmllbGRzIiwiX21lcmdlRmllbGRQYWlycyIsIlRSSVBfUE9JTlRfRklFTERTIiwiZmlsdGVyIiwidHlwZSIsInJlcGxhY2UiLCJ0cmltIiwic3BsaXQiLCJldmVyeSIsImluY2x1ZGVzIiwic2VnIiwiQUxMX0ZJRUxEX1RZUEVTIiwiZ2VvanNvbiIsInNsaWNlIiwiTUFYX0RFRkFVTFRfVE9PTFRJUFMiLCJtYXAiLCJkIiwicGFpcnMiLCJwYWlyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7UUE0QmdCQSxxQixHQUFBQSxxQjtRQTBCQUMsZ0IsR0FBQUEsZ0I7O0FBbENoQjs7QUFNQTs7OztBQTFCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFVTyxTQUFTRCxxQkFBVCxHQUFpQztBQUN0QyxTQUFPO0FBQ0xFLGFBQVM7QUFDUEMsVUFBSSxTQURHO0FBRVBDLGVBQVMsSUFGRjtBQUdQQyxxQkFBZUMsZUFIUjtBQUlQQyxjQUFRO0FBQ05DLHNCQUFjO0FBRFI7QUFKRCxLQURKO0FBU0xDLFdBQU87QUFDTE4sVUFBSSxPQURDO0FBRUxDLGVBQVMsS0FGSjtBQUdMQyxxQkFBZUssaUJBSFY7QUFJTEgsY0FBUTtBQUNOO0FBQ0FJLGNBQU07QUFGQTtBQUpIO0FBVEYsR0FBUDtBQW1CRDs7QUFFTSxJQUFNQyxzQ0FBZTtBQUMxQkMsU0FBTyxDQUFDLENBQUQsRUFBSSxFQUFKO0FBRG1CLENBQXJCOztBQUlBLFNBQVNaLGdCQUFULE9BQXdDO0FBQUEsTUFBYmEsTUFBYSxRQUFiQSxNQUFhO0FBQUEsTUFBTFgsRUFBSyxRQUFMQSxFQUFLOztBQUM3QztBQUNBLE1BQU1LLGVBQWVPLHdDQUF1QkMsTUFBdkIsQ0FBOEIsVUFBQ0MsSUFBRCxFQUFPQyxJQUFQLEVBQWdCO0FBQ2pFLFFBQUlKLE9BQU9LLElBQVAsQ0FBWTtBQUFBLFVBQUVDLElBQUYsU0FBRUEsSUFBRjtBQUFBLGFBQVlGLFNBQVNFLElBQXJCO0FBQUEsS0FBWixDQUFKLEVBQTRDO0FBQzFDSCxXQUFLSSxJQUFMLENBQVVILElBQVY7QUFDRDtBQUNELFdBQU9ELElBQVA7QUFDRCxHQUxvQixFQUtsQixFQUxrQixDQUFyQjs7QUFPQSwyQ0FDR2QsRUFESCxFQUNRSyxhQUFhYyxNQUFiLEdBQXNCZCxZQUF0QixHQUFxQ2Usc0JBQXNCVCxNQUF0QixDQUQ3QztBQUdEOztBQUVELFNBQVNTLHFCQUFULENBQStCVCxNQUEvQixFQUF1QztBQUNyQyxNQUFNVSxXQUFXQyxpQkFBaUJDLGtDQUFqQixDQUFqQjtBQUNBO0FBQ0EsTUFBTWxCLGVBQWVNLE9BQU9hLE1BQVAsQ0FDbkI7QUFBQSxRQUFFUCxJQUFGLFNBQUVBLElBQUY7QUFBQSxRQUFRUSxJQUFSLFNBQVFBLElBQVI7QUFBQSxXQUNFUixLQUNHUyxPQURILENBQ1csU0FEWCxFQUNzQixHQUR0QixFQUVHQyxJQUZILEdBR0dDLEtBSEgsQ0FHUyxHQUhULEVBSUdDLEtBSkgsQ0FJUztBQUFBLGFBQU8sQ0FBQ1IsU0FBU1MsUUFBVCxDQUFrQkMsR0FBbEIsQ0FBUjtBQUFBLEtBSlQsS0FLQU4sU0FBU08saUNBQWdCQyxPQUx6QixJQU1BUixTQUFTLFFBUFg7QUFBQSxHQURtQixDQUFyQjs7QUFXQSxTQUFPcEIsYUFBYTZCLEtBQWIsQ0FBbUIsQ0FBbkIsRUFBc0JDLHFDQUF0QixFQUE0Q0MsR0FBNUMsQ0FBZ0Q7QUFBQSxXQUFLQyxFQUFFcEIsSUFBUDtBQUFBLEdBQWhELENBQVA7QUFDRDs7QUFFRCxTQUFTSyxnQkFBVCxDQUEwQmdCLEtBQTFCLEVBQWlDO0FBQy9CLFNBQU9BLE1BQU16QixNQUFOLENBQWEsVUFBQ0MsSUFBRCxFQUFPeUIsSUFBUDtBQUFBLHNEQUFvQnpCLElBQXBCLG9DQUE2QnlCLElBQTdCO0FBQUEsR0FBYixFQUFpRCxFQUFqRCxDQUFQO0FBQ0QiLCJmaWxlIjoiaW50ZXJhY3Rpb24tdXRpbHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIDIwMTggVWJlciBUZWNobm9sb2dpZXMsIEluYy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4vLyBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4vLyBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4vLyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4vLyBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbi8vIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbi8vIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1Jcbi8vIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuLy8gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4vLyBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4vLyBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuLy8gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuLy8gVEhFIFNPRlRXQVJFLlxuXG5pbXBvcnQge1xuICBERUZBVUxUX1RPT0xUSVBfRklFTERTLFxuICBNQVhfREVGQVVMVF9UT09MVElQUyxcbiAgQUxMX0ZJRUxEX1RZUEVTLFxuICBUUklQX1BPSU5UX0ZJRUxEU1xufSBmcm9tICdjb25zdGFudHMvZGVmYXVsdC1zZXR0aW5ncyc7XG5pbXBvcnQge01lc3NhZ2VzLCBDcm9zc2hhaXJzfSBmcm9tICdjb21wb25lbnRzL2NvbW1vbi9pY29ucy9pbmRleCc7XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXREZWZhdWx0SW50ZXJhY3Rpb24oKSB7XG4gIHJldHVybiB7XG4gICAgdG9vbHRpcDoge1xuICAgICAgaWQ6ICd0b29sdGlwJyxcbiAgICAgIGVuYWJsZWQ6IHRydWUsXG4gICAgICBpY29uQ29tcG9uZW50OiBNZXNzYWdlcyxcbiAgICAgIGNvbmZpZzoge1xuICAgICAgICBmaWVsZHNUb1Nob3c6IHt9XG4gICAgICB9XG4gICAgfSxcbiAgICBicnVzaDoge1xuICAgICAgaWQ6ICdicnVzaCcsXG4gICAgICBlbmFibGVkOiBmYWxzZSxcbiAgICAgIGljb25Db21wb25lbnQ6IENyb3NzaGFpcnMsXG4gICAgICBjb25maWc6IHtcbiAgICAgICAgLy8gc2l6ZSBpcyBpbiBrbVxuICAgICAgICBzaXplOiAwLjVcbiAgICAgIH1cbiAgICB9XG4gIH07XG59XG5cbmV4cG9ydCBjb25zdCBCUlVTSF9DT05GSUcgPSB7XG4gIHJhbmdlOiBbMCwgNTBdXG59O1xuXG5leHBvcnQgZnVuY3Rpb24gZmluZEZpZWxkc1RvU2hvdyh7ZmllbGRzLCBpZH0pIHtcbiAgLy8gZmlyc3QgZmluZCBkZWZhdWx0IHRvb2x0aXAgZmllbGRzIGZvciB0cmlwc1xuICBjb25zdCBmaWVsZHNUb1Nob3cgPSBERUZBVUxUX1RPT0xUSVBfRklFTERTLnJlZHVjZSgocHJldiwgY3VycikgPT4ge1xuICAgIGlmIChmaWVsZHMuZmluZCgoe25hbWV9KSA9PiBjdXJyID09PSBuYW1lKSkge1xuICAgICAgcHJldi5wdXNoKGN1cnIpO1xuICAgIH1cbiAgICByZXR1cm4gcHJldjtcbiAgfSwgW10pO1xuXG4gIHJldHVybiB7XG4gICAgW2lkXTogZmllbGRzVG9TaG93Lmxlbmd0aCA/IGZpZWxkc1RvU2hvdyA6IGF1dG9GaW5kVG9vbHRpcEZpZWxkcyhmaWVsZHMpXG4gIH07XG59XG5cbmZ1bmN0aW9uIGF1dG9GaW5kVG9vbHRpcEZpZWxkcyhmaWVsZHMpIHtcbiAgY29uc3QgcHRGaWVsZHMgPSBfbWVyZ2VGaWVsZFBhaXJzKFRSSVBfUE9JTlRfRklFTERTKTtcbiAgLy8gZmlsdGVyIG91dCB0aGUgZGVmYXVsdCBmaWVsZHMgdGhhdCBjb250YWlucyBsYXQgYW5kIGxuZyBhbmQgYW55IGdlb21ldHJ5XG4gIGNvbnN0IGZpZWxkc1RvU2hvdyA9IGZpZWxkcy5maWx0ZXIoXG4gICAgKHtuYW1lLCB0eXBlfSkgPT5cbiAgICAgIG5hbWVcbiAgICAgICAgLnJlcGxhY2UoL1tfLC5dKy9nLCAnICcpXG4gICAgICAgIC50cmltKClcbiAgICAgICAgLnNwbGl0KCcgJylcbiAgICAgICAgLmV2ZXJ5KHNlZyA9PiAhcHRGaWVsZHMuaW5jbHVkZXMoc2VnKSkgJiZcbiAgICAgIHR5cGUgIT09IEFMTF9GSUVMRF9UWVBFUy5nZW9qc29uICYmXG4gICAgICB0eXBlICE9PSAnb2JqZWN0J1xuICApO1xuXG4gIHJldHVybiBmaWVsZHNUb1Nob3cuc2xpY2UoMCwgTUFYX0RFRkFVTFRfVE9PTFRJUFMpLm1hcChkID0+IGQubmFtZSk7XG59XG5cbmZ1bmN0aW9uIF9tZXJnZUZpZWxkUGFpcnMocGFpcnMpIHtcbiAgcmV0dXJuIHBhaXJzLnJlZHVjZSgocHJldiwgcGFpcikgPT4gWy4uLnByZXYsIC4uLnBhaXJdLCBbXSk7XG59XG4iXX0=