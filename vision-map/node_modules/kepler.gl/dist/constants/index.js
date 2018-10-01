'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defaultSettings = require('./default-settings');

Object.defineProperty(exports, 'DIMENSIONS', {
  enumerable: true,
  get: function get() {
    return _defaultSettings.DIMENSIONS;
  }
});
Object.defineProperty(exports, 'ALL_FIELD_TYPES', {
  enumerable: true,
  get: function get() {
    return _defaultSettings.ALL_FIELD_TYPES;
  }
});
Object.defineProperty(exports, 'FIELD_OPTS', {
  enumerable: true,
  get: function get() {
    return _defaultSettings.FIELD_OPTS;
  }
});
Object.defineProperty(exports, 'FILTER_TYPES', {
  enumerable: true,
  get: function get() {
    return _defaultSettings.FILTER_TYPES;
  }
});
Object.defineProperty(exports, 'GEOJSON_FIELDS', {
  enumerable: true,
  get: function get() {
    return _defaultSettings.GEOJSON_FIELDS;
  }
});
Object.defineProperty(exports, 'ICON_FIELDS', {
  enumerable: true,
  get: function get() {
    return _defaultSettings.ICON_FIELDS;
  }
});
Object.defineProperty(exports, 'TRIP_POINT_FIELDS', {
  enumerable: true,
  get: function get() {
    return _defaultSettings.TRIP_POINT_FIELDS;
  }
});
Object.defineProperty(exports, 'TRIP_ARC_FIELDS', {
  enumerable: true,
  get: function get() {
    return _defaultSettings.TRIP_ARC_FIELDS;
  }
});
Object.defineProperty(exports, 'SCALE_TYPES', {
  enumerable: true,
  get: function get() {
    return _defaultSettings.SCALE_TYPES;
  }
});
Object.defineProperty(exports, 'LAYER_TYPES', {
  enumerable: true,
  get: function get() {
    return _defaultSettings.LAYER_TYPES;
  }
});
Object.defineProperty(exports, 'LAYER_BLENDINGS', {
  enumerable: true,
  get: function get() {
    return _defaultSettings.LAYER_BLENDINGS;
  }
});
Object.defineProperty(exports, 'AGGREGATION_TYPES', {
  enumerable: true,
  get: function get() {
    return _defaultSettings.AGGREGATION_TYPES;
  }
});
Object.defineProperty(exports, 'MAX_DEFAULT_TOOLTIPS', {
  enumerable: true,
  get: function get() {
    return _defaultSettings.MAX_DEFAULT_TOOLTIPS;
  }
});

var _customColorRanges = require('./custom-color-ranges');

Object.defineProperty(exports, 'VizColorPalette', {
  enumerable: true,
  get: function get() {
    return _customColorRanges.VizColorPalette;
  }
});
Object.defineProperty(exports, 'DataVizColors', {
  enumerable: true,
  get: function get() {
    return _customColorRanges.DataVizColors;
  }
});

var _colorRanges = require('./color-ranges');

Object.defineProperty(exports, 'COLOR_RANGES', {
  enumerable: true,
  get: function get() {
    return _colorRanges.COLOR_RANGES;
  }
});
Object.defineProperty(exports, 'DefaultColorRange', {
  enumerable: true,
  get: function get() {
    return _colorRanges.DefaultColorRange;
  }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb25zdGFudHMvaW5kZXguanMiXSwibmFtZXMiOlsiRElNRU5TSU9OUyIsIkFMTF9GSUVMRF9UWVBFUyIsIkZJRUxEX09QVFMiLCJGSUxURVJfVFlQRVMiLCJHRU9KU09OX0ZJRUxEUyIsIklDT05fRklFTERTIiwiVFJJUF9QT0lOVF9GSUVMRFMiLCJUUklQX0FSQ19GSUVMRFMiLCJTQ0FMRV9UWVBFUyIsIkxBWUVSX1RZUEVTIiwiTEFZRVJfQkxFTkRJTkdTIiwiQUdHUkVHQVRJT05fVFlQRVMiLCJNQVhfREVGQVVMVF9UT09MVElQUyIsIlZpekNvbG9yUGFsZXR0ZSIsIkRhdGFWaXpDb2xvcnMiLCJDT0xPUl9SQU5HRVMiLCJEZWZhdWx0Q29sb3JSYW5nZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7NEJBc0JFQSxVOzs7Ozs7NEJBQ0FDLGU7Ozs7Ozs0QkFDQUMsVTs7Ozs7OzRCQUNBQyxZOzs7Ozs7NEJBQ0FDLGM7Ozs7Ozs0QkFDQUMsVzs7Ozs7OzRCQUNBQyxpQjs7Ozs7OzRCQUNBQyxlOzs7Ozs7NEJBQ0FDLFc7Ozs7Ozs0QkFDQUMsVzs7Ozs7OzRCQUNBQyxlOzs7Ozs7NEJBQ0FDLGlCOzs7Ozs7NEJBQ0FDLG9COzs7Ozs7Ozs7OEJBRU1DLGU7Ozs7Ozs4QkFBaUJDLGE7Ozs7Ozs7Ozt3QkFDakJDLFk7Ozs7Ozt3QkFBY0MsaUIiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIDIwMTggVWJlciBUZWNobm9sb2dpZXMsIEluYy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4vLyBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4vLyBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4vLyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4vLyBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbi8vIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbi8vIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1Jcbi8vIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuLy8gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4vLyBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4vLyBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuLy8gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuLy8gVEhFIFNPRlRXQVJFLlxuXG4vLyBDb25zdGFudHNcbmV4cG9ydCB7XG4gIERJTUVOU0lPTlMsXG4gIEFMTF9GSUVMRF9UWVBFUyxcbiAgRklFTERfT1BUUyxcbiAgRklMVEVSX1RZUEVTLFxuICBHRU9KU09OX0ZJRUxEUyxcbiAgSUNPTl9GSUVMRFMsXG4gIFRSSVBfUE9JTlRfRklFTERTLFxuICBUUklQX0FSQ19GSUVMRFMsXG4gIFNDQUxFX1RZUEVTLFxuICBMQVlFUl9UWVBFUyxcbiAgTEFZRVJfQkxFTkRJTkdTLFxuICBBR0dSRUdBVElPTl9UWVBFUyxcbiAgTUFYX0RFRkFVTFRfVE9PTFRJUFNcbn0gZnJvbSAnLi9kZWZhdWx0LXNldHRpbmdzJztcbmV4cG9ydCB7Vml6Q29sb3JQYWxldHRlLCBEYXRhVml6Q29sb3JzfSBmcm9tICcuL2N1c3RvbS1jb2xvci1yYW5nZXMnO1xuZXhwb3J0IHtDT0xPUl9SQU5HRVMsIERlZmF1bHRDb2xvclJhbmdlfSBmcm9tICcuL2NvbG9yLXJhbmdlcyc7XG4iXX0=