'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setExportDataUpdater = exports.setExportConfigUpdater = exports.setExportFilteredUpdater = exports.setExportDataTypeUpdater = exports.setExportSelectedDatasetUpdater = exports.cleanupExportImage = exports.setExportImageDataUri = exports.startExportingImage = exports.setResolutionUpdater = exports.setRatioUpdater = exports.toggleLegendUpdater = exports.openDeleteModalUpdater = exports.toggleMapControlUpdater = exports.hideExportDropdownUpdater = exports.showExportDropdownUpdater = exports.toggleModalUpdater = exports.toggleSidePanelUpdater = undefined;

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends3 = require('babel-runtime/helpers/extends');

var _extends4 = _interopRequireDefault(_extends3);

var _defaultSettings = require('../constants/default-settings');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* Updaters */
var toggleSidePanelUpdater = exports.toggleSidePanelUpdater = function toggleSidePanelUpdater(state, _ref) {
  var id = _ref.payload;

  if (id === state.activeSidePanel) {
    return state;
  }

  if (id === _defaultSettings.LAYER_CONFIG_ID) {
    return (0, _extends4.default)({}, state, {
      currentModal: id
    });
  }

  return (0, _extends4.default)({}, state, {
    activeSidePanel: id
  });
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

var toggleModalUpdater = exports.toggleModalUpdater = function toggleModalUpdater(state, _ref2) {
  var id = _ref2.payload;
  return (0, _extends4.default)({}, state, {
    currentModal: id
  });
};

var showExportDropdownUpdater = exports.showExportDropdownUpdater = function showExportDropdownUpdater(state, _ref3) {
  var id = _ref3.payload;
  return (0, _extends4.default)({}, state, {
    visibleDropdown: id
  });
};

var hideExportDropdownUpdater = exports.hideExportDropdownUpdater = function hideExportDropdownUpdater(state, _ref4) {
  var payload = _ref4.payload;
  return (0, _extends4.default)({}, state, {
    visibleDropdown: null
  });
};

var toggleMapControlUpdater = exports.toggleMapControlUpdater = function toggleMapControlUpdater(state, _ref5) {
  var panelId = _ref5.payload;
  return (0, _extends4.default)({}, state, {
    mapControls: (0, _extends4.default)({}, state.mapControls, (0, _defineProperty3.default)({}, panelId, (0, _extends4.default)({}, state.mapControls[panelId], {
      active: !state.mapControls[panelId].active
    })))
  });
};

var openDeleteModalUpdater = exports.openDeleteModalUpdater = function openDeleteModalUpdater(state, _ref6) {
  var datasetKeyToRemove = _ref6.payload;
  return (0, _extends4.default)({}, state, {
    currentModal: _defaultSettings.DELETE_DATA_ID,
    datasetKeyToRemove: datasetKeyToRemove
  });
};

var toggleLegendUpdater = exports.toggleLegendUpdater = function toggleLegendUpdater(state) {
  return (0, _extends4.default)({}, state, {
    exportImage: (0, _extends4.default)({}, state.exportImage, {
      legend: !state.exportImage.legend
    })
  });
};

var setRatioUpdater = exports.setRatioUpdater = function setRatioUpdater(state, _ref7) {
  var payload = _ref7.payload;
  return (0, _extends4.default)({}, state, {
    exportImage: (0, _extends4.default)({}, state.exportImage, {
      ratio: payload.ratio
    })
  });
};

var setResolutionUpdater = exports.setResolutionUpdater = function setResolutionUpdater(state, _ref8) {
  var payload = _ref8.payload;
  return (0, _extends4.default)({}, state, {
    exportImage: (0, _extends4.default)({}, state.exportImage, {
      resolution: payload.resolution
    })
  });
};

var startExportingImage = exports.startExportingImage = function startExportingImage(state) {
  return (0, _extends4.default)({}, state, {
    exportImage: (0, _extends4.default)({}, state.exportImage, {
      exporting: true,
      imageDataUri: ''
    })
  });
};

var setExportImageDataUri = exports.setExportImageDataUri = function setExportImageDataUri(state, _ref9) {
  var payload = _ref9.payload;
  return (0, _extends4.default)({}, state, {
    exportImage: (0, _extends4.default)({}, state.exportImage, {
      exporting: false,
      imageDataUri: payload.dataUri
    })
  });
};

var cleanupExportImage = exports.cleanupExportImage = function cleanupExportImage(state) {
  return (0, _extends4.default)({}, state, {
    exportImage: (0, _extends4.default)({}, state.exportImage, {
      exporting: false,
      imageDataUri: ''
    })
  });
};

var setExportSelectedDatasetUpdater = exports.setExportSelectedDatasetUpdater = function setExportSelectedDatasetUpdater(state, _ref10) {
  var payload = _ref10.payload;
  return (0, _extends4.default)({}, state, {
    exportData: (0, _extends4.default)({}, state.exportData, {
      selectedDataset: payload.dataset
    })
  });
};

var setExportDataTypeUpdater = exports.setExportDataTypeUpdater = function setExportDataTypeUpdater(state, _ref11) {
  var payload = _ref11.payload;
  return (0, _extends4.default)({}, state, {
    exportData: (0, _extends4.default)({}, state.exportData, {
      dataType: payload.dataType
    })
  });
};

var setExportFilteredUpdater = exports.setExportFilteredUpdater = function setExportFilteredUpdater(state, _ref12) {
  var payload = _ref12.payload;
  return (0, _extends4.default)({}, state, {
    exportData: (0, _extends4.default)({}, state.exportData, {
      filtered: payload.filtered
    })
  });
};

var setExportConfigUpdater = exports.setExportConfigUpdater = function setExportConfigUpdater(state, action) {
  return (0, _extends4.default)({}, state, {
    exportData: (0, _extends4.default)({}, state.exportData, {
      config: !state.exportData.config
    })
  });
};

var setExportDataUpdater = exports.setExportDataUpdater = function setExportDataUpdater(state, action) {
  return (0, _extends4.default)({}, state, {
    exportData: (0, _extends4.default)({}, state.exportData, {
      data: !state.exportData.data
    })
  });
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9yZWR1Y2Vycy91aS1zdGF0ZS11cGRhdGVycy5qcyJdLCJuYW1lcyI6WyJ0b2dnbGVTaWRlUGFuZWxVcGRhdGVyIiwic3RhdGUiLCJpZCIsInBheWxvYWQiLCJhY3RpdmVTaWRlUGFuZWwiLCJMQVlFUl9DT05GSUdfSUQiLCJjdXJyZW50TW9kYWwiLCJ0b2dnbGVNb2RhbFVwZGF0ZXIiLCJzaG93RXhwb3J0RHJvcGRvd25VcGRhdGVyIiwidmlzaWJsZURyb3Bkb3duIiwiaGlkZUV4cG9ydERyb3Bkb3duVXBkYXRlciIsInRvZ2dsZU1hcENvbnRyb2xVcGRhdGVyIiwicGFuZWxJZCIsIm1hcENvbnRyb2xzIiwiYWN0aXZlIiwib3BlbkRlbGV0ZU1vZGFsVXBkYXRlciIsImRhdGFzZXRLZXlUb1JlbW92ZSIsIkRFTEVURV9EQVRBX0lEIiwidG9nZ2xlTGVnZW5kVXBkYXRlciIsImV4cG9ydEltYWdlIiwibGVnZW5kIiwic2V0UmF0aW9VcGRhdGVyIiwicmF0aW8iLCJzZXRSZXNvbHV0aW9uVXBkYXRlciIsInJlc29sdXRpb24iLCJzdGFydEV4cG9ydGluZ0ltYWdlIiwiZXhwb3J0aW5nIiwiaW1hZ2VEYXRhVXJpIiwic2V0RXhwb3J0SW1hZ2VEYXRhVXJpIiwiZGF0YVVyaSIsImNsZWFudXBFeHBvcnRJbWFnZSIsInNldEV4cG9ydFNlbGVjdGVkRGF0YXNldFVwZGF0ZXIiLCJleHBvcnREYXRhIiwic2VsZWN0ZWREYXRhc2V0IiwiZGF0YXNldCIsInNldEV4cG9ydERhdGFUeXBlVXBkYXRlciIsImRhdGFUeXBlIiwic2V0RXhwb3J0RmlsdGVyZWRVcGRhdGVyIiwiZmlsdGVyZWQiLCJzZXRFeHBvcnRDb25maWdVcGRhdGVyIiwiYWN0aW9uIiwiY29uZmlnIiwic2V0RXhwb3J0RGF0YVVwZGF0ZXIiLCJkYXRhIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFvQkE7Ozs7QUFFQTtBQUNPLElBQU1BLDBEQUF5QixTQUF6QkEsc0JBQXlC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b0NBQy9CdkMsS0FEK0I7QUFFbEMrQiwyQ0FDSy9CLE1BQU0rQixVQURYO0FBRUVXLFlBQU0sQ0FBQzFDLE1BQU0rQixVQUFOLENBQWlCVztBQUYxQjtBQUZrQztBQUFBLENBQTdCIiwiZmlsZSI6InVpLXN0YXRlLXVwZGF0ZXJzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSAyMDE4IFViZXIgVGVjaG5vbG9naWVzLCBJbmMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuLy8gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuLy8gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuLy8gdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuLy8gY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4vLyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4vLyBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4vLyBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbi8vIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuLy8gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuLy8gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbi8vIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbi8vIFRIRSBTT0ZUV0FSRS5cblxuaW1wb3J0IHtMQVlFUl9DT05GSUdfSUQsIERFTEVURV9EQVRBX0lEfSBmcm9tICdjb25zdGFudHMvZGVmYXVsdC1zZXR0aW5ncyc7XG5cbi8qIFVwZGF0ZXJzICovXG5leHBvcnQgY29uc3QgdG9nZ2xlU2lkZVBhbmVsVXBkYXRlciA9IChzdGF0ZSwge3BheWxvYWQ6IGlkfSkgPT4ge1xuICBpZiAoaWQgPT09IHN0YXRlLmFjdGl2ZVNpZGVQYW5lbCkge1xuICAgIHJldHVybiBzdGF0ZTtcbiAgfVxuXG4gIGlmIChpZCA9PT0gTEFZRVJfQ09ORklHX0lEKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIC4uLnN0YXRlLFxuICAgICAgY3VycmVudE1vZGFsOiBpZFxuICAgIH07XG4gIH1cblxuICByZXR1cm4ge1xuICAgIC4uLnN0YXRlLFxuICAgIGFjdGl2ZVNpZGVQYW5lbDogaWRcbiAgfTtcbn07XG5cbmV4cG9ydCBjb25zdCB0b2dnbGVNb2RhbFVwZGF0ZXIgPSAoc3RhdGUsIHtwYXlsb2FkOiBpZH0pID0+ICh7XG4gIC4uLnN0YXRlLFxuICBjdXJyZW50TW9kYWw6IGlkXG59KTtcblxuZXhwb3J0IGNvbnN0IHNob3dFeHBvcnREcm9wZG93blVwZGF0ZXIgPSAoc3RhdGUsIHtwYXlsb2FkOiBpZH0pID0+ICh7XG4gIC4uLnN0YXRlLFxuICB2aXNpYmxlRHJvcGRvd246IGlkXG59KTtcblxuZXhwb3J0IGNvbnN0IGhpZGVFeHBvcnREcm9wZG93blVwZGF0ZXIgPSAoc3RhdGUsIHtwYXlsb2FkfSkgPT4gKHtcbiAgLi4uc3RhdGUsXG4gIHZpc2libGVEcm9wZG93bjogbnVsbFxufSk7XG5cbmV4cG9ydCBjb25zdCB0b2dnbGVNYXBDb250cm9sVXBkYXRlciA9IChzdGF0ZSwge3BheWxvYWQ6IHBhbmVsSWR9KSA9PiAoe1xuICAuLi5zdGF0ZSxcbiAgbWFwQ29udHJvbHM6IHtcbiAgICAuLi5zdGF0ZS5tYXBDb250cm9scyxcbiAgICBbcGFuZWxJZF06IHtcbiAgICAgIC4uLnN0YXRlLm1hcENvbnRyb2xzW3BhbmVsSWRdLFxuICAgICAgYWN0aXZlOiAhc3RhdGUubWFwQ29udHJvbHNbcGFuZWxJZF0uYWN0aXZlXG4gICAgfVxuICB9XG59KTtcblxuZXhwb3J0IGNvbnN0IG9wZW5EZWxldGVNb2RhbFVwZGF0ZXIgPSAoXG4gIHN0YXRlLFxuICB7cGF5bG9hZDogZGF0YXNldEtleVRvUmVtb3ZlfVxuKSA9PiAoe1xuICAuLi5zdGF0ZSxcbiAgY3VycmVudE1vZGFsOiBERUxFVEVfREFUQV9JRCxcbiAgZGF0YXNldEtleVRvUmVtb3ZlXG59KTtcblxuZXhwb3J0IGNvbnN0IHRvZ2dsZUxlZ2VuZFVwZGF0ZXIgPSBzdGF0ZSA9PiAoe1xuICAuLi5zdGF0ZSxcbiAgZXhwb3J0SW1hZ2U6IHtcbiAgICAuLi5zdGF0ZS5leHBvcnRJbWFnZSxcbiAgICBsZWdlbmQ6ICFzdGF0ZS5leHBvcnRJbWFnZS5sZWdlbmRcbiAgfVxufSk7XG5cbmV4cG9ydCBjb25zdCBzZXRSYXRpb1VwZGF0ZXIgPSAoc3RhdGUsIHtwYXlsb2FkfSkgPT4gKHtcbiAgLi4uc3RhdGUsXG4gIGV4cG9ydEltYWdlOiB7XG4gICAgLi4uc3RhdGUuZXhwb3J0SW1hZ2UsXG4gICAgcmF0aW86IHBheWxvYWQucmF0aW9cbiAgfVxufSk7XG5cbmV4cG9ydCBjb25zdCBzZXRSZXNvbHV0aW9uVXBkYXRlciA9IChzdGF0ZSwge3BheWxvYWR9KSA9PiAoe1xuICAuLi5zdGF0ZSxcbiAgZXhwb3J0SW1hZ2U6IHtcbiAgICAuLi5zdGF0ZS5leHBvcnRJbWFnZSxcbiAgICByZXNvbHV0aW9uOiBwYXlsb2FkLnJlc29sdXRpb25cbiAgfVxufSk7XG5cbmV4cG9ydCBjb25zdCBzdGFydEV4cG9ydGluZ0ltYWdlID0gc3RhdGUgPT4gKHtcbiAgLi4uc3RhdGUsXG4gIGV4cG9ydEltYWdlOiB7XG4gICAgLi4uc3RhdGUuZXhwb3J0SW1hZ2UsXG4gICAgZXhwb3J0aW5nOiB0cnVlLFxuICAgIGltYWdlRGF0YVVyaTogJydcbiAgfVxufSk7XG5cbmV4cG9ydCBjb25zdCBzZXRFeHBvcnRJbWFnZURhdGFVcmkgPSAoc3RhdGUsIHtwYXlsb2FkfSkgPT4gKHtcbiAgLi4uc3RhdGUsXG4gIGV4cG9ydEltYWdlOiB7XG4gICAgLi4uc3RhdGUuZXhwb3J0SW1hZ2UsXG4gICAgZXhwb3J0aW5nOiBmYWxzZSxcbiAgICBpbWFnZURhdGFVcmk6IHBheWxvYWQuZGF0YVVyaVxuICB9XG59KTtcblxuZXhwb3J0IGNvbnN0IGNsZWFudXBFeHBvcnRJbWFnZSA9IHN0YXRlID0+ICh7XG4gIC4uLnN0YXRlLFxuICBleHBvcnRJbWFnZToge1xuICAgIC4uLnN0YXRlLmV4cG9ydEltYWdlLFxuICAgIGV4cG9ydGluZzogZmFsc2UsXG4gICAgaW1hZ2VEYXRhVXJpOiAnJ1xuICB9XG59KTtcblxuZXhwb3J0IGNvbnN0IHNldEV4cG9ydFNlbGVjdGVkRGF0YXNldFVwZGF0ZXIgPSAoc3RhdGUsIHtwYXlsb2FkfSkgPT4gKHtcbiAgLi4uc3RhdGUsXG4gIGV4cG9ydERhdGE6IHtcbiAgICAuLi5zdGF0ZS5leHBvcnREYXRhLFxuICAgIHNlbGVjdGVkRGF0YXNldDogcGF5bG9hZC5kYXRhc2V0XG4gIH1cbn0pO1xuXG5leHBvcnQgY29uc3Qgc2V0RXhwb3J0RGF0YVR5cGVVcGRhdGVyID0gKHN0YXRlLCB7cGF5bG9hZH0pID0+ICh7XG4gIC4uLnN0YXRlLFxuICBleHBvcnREYXRhOiB7XG4gICAgLi4uc3RhdGUuZXhwb3J0RGF0YSxcbiAgICBkYXRhVHlwZTogcGF5bG9hZC5kYXRhVHlwZVxuICB9XG59KTtcblxuZXhwb3J0IGNvbnN0IHNldEV4cG9ydEZpbHRlcmVkVXBkYXRlciA9IChzdGF0ZSwge3BheWxvYWR9KSA9PiAoe1xuICAuLi5zdGF0ZSxcbiAgZXhwb3J0RGF0YToge1xuICAgIC4uLnN0YXRlLmV4cG9ydERhdGEsXG4gICAgZmlsdGVyZWQ6IHBheWxvYWQuZmlsdGVyZWRcbiAgfVxufSk7XG5cbmV4cG9ydCBjb25zdCBzZXRFeHBvcnRDb25maWdVcGRhdGVyID0gKHN0YXRlLCBhY3Rpb24pID0+ICh7XG4gIC4uLnN0YXRlLFxuICBleHBvcnREYXRhOiB7XG4gICAgLi4uc3RhdGUuZXhwb3J0RGF0YSxcbiAgICBjb25maWc6ICFzdGF0ZS5leHBvcnREYXRhLmNvbmZpZ1xuICB9XG59KTtcblxuZXhwb3J0IGNvbnN0IHNldEV4cG9ydERhdGFVcGRhdGVyID0gKHN0YXRlLCBhY3Rpb24pID0+ICh7XG4gIC4uLnN0YXRlLFxuICBleHBvcnREYXRhOiB7XG4gICAgLi4uc3RhdGUuZXhwb3J0RGF0YSxcbiAgICBkYXRhOiAhc3RhdGUuZXhwb3J0RGF0YS5kYXRhXG4gIH1cbn0pO1xuIl19