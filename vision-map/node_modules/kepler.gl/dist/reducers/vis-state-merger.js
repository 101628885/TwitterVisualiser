'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends3 = require('babel-runtime/helpers/extends');

var _extends4 = _interopRequireDefault(_extends3);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

exports.mergeFilters = mergeFilters;
exports.mergeLayers = mergeLayers;
exports.mergeInteractions = mergeInteractions;
exports.mergeInteractionTooltipConfig = mergeInteractionTooltipConfig;
exports.mergeLayerBlending = mergeLayerBlending;
exports.validateSavedLayerColumns = validateSavedLayerColumns;
exports.validateSavedVisualChannels = validateSavedVisualChannels;
exports.validateLayerWithData = validateLayerWithData;
exports.validateFilterWithData = validateFilterWithData;

var _lodash = require('lodash.uniq');

var _lodash2 = _interopRequireDefault(_lodash);

var _lodash3 = require('lodash.pick');

var _lodash4 = _interopRequireDefault(_lodash3);

var _filterUtils = require('../utils/filter-utils');

var _defaultSettings = require('../constants/default-settings');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Merge loaded filters with current state, if no fields or data are loaded
 * save it for later
 *
 * @param {Object} state
 * @param {Object[]} filtersToMerge
 * @return {Object} updatedState
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

function mergeFilters(state, filtersToMerge) {
  var merged = [];
  var unmerged = [];
  var datasets = state.datasets;


  if (!Array.isArray(filtersToMerge) || !filtersToMerge.length) {
    return state;
  }

  // merge filters
  filtersToMerge.forEach(function (filter) {
    // match filter.dataId with current datesets id
    // uploaded data need to have the same dataId with the filter
    if (datasets[filter.dataId]) {
      // datasets is already loaded
      var validateFilter = validateFilterWithData(datasets[filter.dataId], filter);

      if (validateFilter) {
        merged.push(validateFilter);
      }
    } else {
      // datasets not yet loaded
      unmerged.push(filter);
    }
  });

  // filter data
  var updatedFilters = [].concat((0, _toConsumableArray3.default)(state.filters || []), merged);
  var datasetToFilter = (0, _lodash2.default)(merged.map(function (d) {
    return d.dataId;
  }));

  var updatedDataset = datasetToFilter.reduce(function (accu, dataId) {
    return (0, _extends4.default)({}, accu, (0, _defineProperty3.default)({}, dataId, (0, _extends4.default)({}, datasets[dataId], (0, _filterUtils.filterData)(datasets[dataId].allData, dataId, updatedFilters))));
  }, datasets);

  return (0, _extends4.default)({}, state, {
    filters: updatedFilters,
    datasets: updatedDataset,
    filterToBeMerged: unmerged
  });
}

/**
 * Merge layers from de-serialized state, if no fields or data are loaded
 * save it for later
 *
 * @param {object} state
 * @param {Object[]} layersToMerge
 * @return {Object} state
 */
function mergeLayers(state, layersToMerge) {
  var mergedLayer = [];
  var unmerged = [];

  var datasets = state.datasets;


  if (!Array.isArray(layersToMerge) || !layersToMerge.length) {
    return state;
  }

  layersToMerge.forEach(function (layer) {
    if (datasets[layer.config.dataId]) {
      // datasets are already loaded
      var validateLayer = validateLayerWithData(datasets[layer.config.dataId], layer, state.layerClasses);

      if (validateLayer) {
        mergedLayer.push(validateLayer);
      }
    } else {
      // datasets not yet loaded
      unmerged.push(layer);
    }
  });

  var layers = [].concat((0, _toConsumableArray3.default)(state.layers), mergedLayer);
  var newLayerOrder = mergedLayer.map(function (_, i) {
    return state.layers.length + i;
  });

  // put new layers in front of current layers
  var layerOrder = [].concat((0, _toConsumableArray3.default)(newLayerOrder), (0, _toConsumableArray3.default)(state.layerOrder));

  return (0, _extends4.default)({}, state, {
    layers: layers,
    layerOrder: layerOrder,
    layerToBeMerged: unmerged
  });
}

/**
 * Merge interactions with saved config
 *
 * @param {object} state
 * @param {Object} interactionToBeMerged
 * @return {Object} mergedState
 */
function mergeInteractions(state, interactionToBeMerged) {
  var merged = {};
  var unmerged = {};

  if (interactionToBeMerged) {
    Object.keys(interactionToBeMerged).forEach(function (key) {
      if (!state.interactionConfig[key]) {
        return;
      }

      var _ref = interactionToBeMerged[key] || {},
          enabled = _ref.enabled,
          configSaved = (0, _objectWithoutProperties3.default)(_ref, ['enabled']);

      var configToMerge = configSaved;

      if (key === 'tooltip') {
        var _mergeInteractionTool = mergeInteractionTooltipConfig(state, configSaved),
            mergedTooltip = _mergeInteractionTool.mergedTooltip,
            unmergedTooltip = _mergeInteractionTool.unmergedTooltip;

        // merge new dataset tooltips with original dataset tooltips


        configToMerge = {
          fieldsToShow: (0, _extends4.default)({}, state.interactionConfig[key].config.fieldsToShow, mergedTooltip)
        };

        if (Object.keys(unmergedTooltip).length) {
          unmerged.tooltip = { fieldsToShow: unmergedTooltip, enabled: enabled };
        }
      }

      merged[key] = (0, _extends4.default)({}, state.interactionConfig[key], {
        enabled: enabled,
        config: (0, _lodash4.default)((0, _extends4.default)({}, state.interactionConfig[key].config, configToMerge), Object.keys(state.interactionConfig[key].config))
      });
    });
  }

  return (0, _extends4.default)({}, state, {
    interactionConfig: (0, _extends4.default)({}, state.interactionConfig, merged),
    interactionToBeMerged: unmerged
  });
}

/**
 * Merge interactionConfig.tooltip with saved config,
 * validate fieldsToShow
 *
 * @param {string} state
 * @param {Object} tooltipConfig
 * @return {Object} - {mergedTooltip: {}, unmergedTooltip: {}}
 */
function mergeInteractionTooltipConfig(state) {
  var tooltipConfig = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var unmergedTooltip = {};
  var mergedTooltip = {};

  if (!tooltipConfig.fieldsToShow || !Object.keys(tooltipConfig.fieldsToShow).length) {
    return { mergedTooltip: mergedTooltip, unmergedTooltip: unmergedTooltip };
  }

  for (var dataId in tooltipConfig.fieldsToShow) {
    if (!state.datasets[dataId]) {
      // is not yet loaded
      unmergedTooltip[dataId] = tooltipConfig.fieldsToShow[dataId];
    } else {
      (function () {
        // if dataset is loaded
        var allFields = state.datasets[dataId].fields.map(function (d) {
          return d.name;
        });
        var foundFieldsToShow = tooltipConfig.fieldsToShow[dataId].filter(function (name) {
          return allFields.includes(name);
        });

        mergedTooltip[dataId] = foundFieldsToShow;
      })();
    }
  }

  return { mergedTooltip: mergedTooltip, unmergedTooltip: unmergedTooltip };
}
/**
 * Merge layerBlending with saved
 *
 * @param {object} state
 * @param {string} layerBlending
 * @return {object} merged state
 */
function mergeLayerBlending(state, layerBlending) {
  if (layerBlending && _defaultSettings.LAYER_BLENDINGS[layerBlending]) {
    return (0, _extends4.default)({}, state, {
      layerBlending: layerBlending
    });
  }

  return state;
}

/**
 * Validate saved layer columns with new data,
 * update fieldIdx based on new fields
 *
 * @param {Object[]} fields
 * @param {Object} savedCols
 * @param {Object} emptyCols
 * @return {null | Object} - validated columns or null
 */

function validateSavedLayerColumns(fields, savedCols, emptyCols) {
  var colFound = {};
  // find actual column fieldIdx, in case it has changed
  var allColFound = Object.keys(emptyCols).every(function (key) {
    var saved = savedCols[key];
    colFound[key] = (0, _extends4.default)({}, emptyCols[key]);

    var fieldIdx = fields.findIndex(function (_ref2) {
      var name = _ref2.name;
      return name === saved;
    });

    if (fieldIdx > -1) {
      // update found columns
      colFound[key].fieldIdx = fieldIdx;
      colFound[key].value = saved;
      return true;
    }

    // if col is optional, allow null value
    return emptyCols[key].optional || false;
  });

  return allColFound && colFound;
}

/**
 * Validate saved visual channels config with new data,
 * refer to vis-state-schema.js VisualChannelSchemaV1
 *
 * @param {Object[]} fields
 * @param {Object} visualChannels
 * @param {Object} savedLayer
 * @return {Object} - validated visual channel in config or {}
 */
function validateSavedVisualChannels(fields, visualChannels, savedLayer) {
  return Object.values(visualChannels).reduce(function (found, _ref3) {
    var field = _ref3.field,
        scale = _ref3.scale;

    var foundField = void 0;
    if (savedLayer.config[field]) {
      foundField = fields.find(function (fd) {
        return Object.keys(savedLayer.config[field]).every(function (key) {
          return savedLayer.config[field][key] === fd[key];
        });
      });
    }

    return (0, _extends4.default)({}, found, foundField ? (0, _defineProperty3.default)({}, field, foundField) : {}, savedLayer.config[scale] ? (0, _defineProperty3.default)({}, scale, savedLayer.config[scale]) : {});
  }, {});
}

/**
 * Validate saved layer config with new data,
 * update fieldIdx based on new fields
 *
 * @param {Object[]} fields
 * @param {String} dataId
 * @param {Object} savedLayer
 * @param {Object} layerClasses
 * @return {null | Object} - validated layer or null
 */
function validateLayerWithData(_ref6, savedLayer, layerClasses) {
  var fields = _ref6.fields,
      dataId = _ref6.id;
  var type = savedLayer.type;
  // layer doesnt have a valid type

  if (!layerClasses.hasOwnProperty(type) || !savedLayer.config || !savedLayer.config.columns) {
    return null;
  }

  var newLayer = new layerClasses[type]({
    id: savedLayer.id,
    dataId: dataId,
    label: savedLayer.config.label,
    color: savedLayer.config.color,
    isVisible: savedLayer.config.isVisible
  });

  // find column fieldIdx
  var columns = validateSavedLayerColumns(fields, savedLayer.config.columns, newLayer.getLayerColumns());

  if (!columns) {
    return null;
  }

  // visual channel field is saved to be {name, type}
  // find visual channel field by matching both name and type
  // refer to vis-state-schema.js VisualChannelSchemaV1
  var foundVisualChannelConfigs = validateSavedVisualChannels(fields, newLayer.visualChannels, savedLayer);

  // copy visConfig over to emptyLayer to make sure it has all the props
  var visConfig = newLayer.copyLayerConfig(newLayer.config.visConfig, savedLayer.config.visConfig || {}, { notToDeepMerge: 'colorRange' });

  newLayer.updateLayerConfig((0, _extends4.default)({
    columns: columns,
    visConfig: visConfig
  }, foundVisualChannelConfigs));

  return newLayer;
}

/**
 * Validate saved filter config with new data,
 * calculate domain and fieldIdx based new fields and data
 *
 * @param {Object[]} dataset.fields
 * @param {Object[]} dataset.allData
 * @param {Object} filter - filter to be validate
 * @return {Object | null} - validated filter
 */
function validateFilterWithData(_ref7, filter) {
  var fields = _ref7.fields,
      allData = _ref7.allData;

  // match filter.name to field.name
  var fieldIdx = fields.findIndex(function (_ref8) {
    var name = _ref8.name;
    return name === filter.name;
  });

  if (fieldIdx < 0) {
    // if can't find field with same name, discharge filter
    return null;
  }

  var field = fields[fieldIdx];
  var value = filter.value;

  // return filter type, default value, fieldType and fieldDomain from field
  var filterPropsFromField = (0, _filterUtils.getFilterProps)(allData, field);

  var matchedFilter = (0, _extends4.default)({}, (0, _filterUtils.getDefaultFilter)(filter.dataId), filter, filterPropsFromField, {
    freeze: true,
    fieldIdx: fieldIdx
  });

  var _matchedFilter = matchedFilter,
      yAxis = _matchedFilter.yAxis;

  if (yAxis) {
    var matcheAxis = fields.find(function (_ref9) {
      var name = _ref9.name,
          type = _ref9.type;
      return name === yAxis.name && type === yAxis.type;
    });

    matchedFilter = matcheAxis ? (0, _extends4.default)({}, matchedFilter, {
      yAxis: matcheAxis
    }, (0, _filterUtils.getFilterPlot)((0, _extends4.default)({}, matchedFilter, { yAxis: matcheAxis }), allData)) : matchedFilter;
  }

  matchedFilter.value = (0, _filterUtils.adjustValueToFilterDomain)(value, matchedFilter);

  if (matchedFilter.value === null) {
    // cannt adjust saved value to filter
    return null;
  }

  return matchedFilter;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9yZWR1Y2Vycy92aXMtc3RhdGUtbWVyZ2VyLmpzIl0sIm5hbWVzIjpbIm1lcmdlRmlsdGVycyIsIm1lcmdlTGF5ZXJzIiwibWVyZ2VJbnRlcmFjdGlvbnMiLCJtZXJnZUludGVyYWN0aW9uVG9vbHRpcENvbmZpZyIsIm1lcmdlTGF5ZXJCbGVuZGluZyIsInZhbGlkYXRlU2F2ZWRMYXllckNvbHVtbnMiLCJ2YWxpZGF0ZVNhdmVkVmlzdWFsQ2hhbm5lbHMiLCJ2YWxpZGF0ZUxheWVyV2l0aERhdGEiLCJ2YWxpZGF0ZUZpbHRlcldpdGhEYXRhIiwic3RhdGUiLCJmaWx0ZXJzVG9NZXJnZSIsIm1lcmdlZCIsInVubWVyZ2VkIiwiZGF0YXNldHMiLCJBcnJheSIsImlzQXJyYXkiLCJsZW5ndGgiLCJmb3JFYWNoIiwiZmlsdGVyIiwiZGF0YUlkIiwidmFsaWRhdGVGaWx0ZXIiLCJwdXNoIiwidXBkYXRlZEZpbHRlcnMiLCJmaWx0ZXJzIiwiZGF0YXNldFRvRmlsdGVyIiwibWFwIiwiZCIsInVwZGF0ZWREYXRhc2V0IiwicmVkdWNlIiwiYWNjdSIsImFsbERhdGEiLCJmaWx0ZXJUb0JlTWVyZ2VkIiwibGF5ZXJzVG9NZXJnZSIsIm1lcmdlZExheWVyIiwibGF5ZXIiLCJjb25maWciLCJ2YWxpZGF0ZUxheWVyIiwibGF5ZXJDbGFzc2VzIiwibGF5ZXJzIiwibmV3TGF5ZXJPcmRlciIsIl8iLCJpIiwibGF5ZXJPcmRlciIsImxheWVyVG9CZU1lcmdlZCIsImludGVyYWN0aW9uVG9CZU1lcmdlZCIsIk9iamVjdCIsImtleXMiLCJpbnRlcmFjdGlvbkNvbmZpZyIsImtleSIsImVuYWJsZWQiLCJjb25maWdTYXZlZCIsImNvbmZpZ1RvTWVyZ2UiLCJtZXJnZWRUb29sdGlwIiwidW5tZXJnZWRUb29sdGlwIiwiZmllbGRzVG9TaG93IiwidG9vbHRpcCIsInRvb2x0aXBDb25maWciLCJhbGxGaWVsZHMiLCJmaWVsZHMiLCJuYW1lIiwiZm91bmRGaWVsZHNUb1Nob3ciLCJpbmNsdWRlcyIsImxheWVyQmxlbmRpbmciLCJMQVlFUl9CTEVORElOR1MiLCJzYXZlZENvbHMiLCJlbXB0eUNvbHMiLCJjb2xGb3VuZCIsImFsbENvbEZvdW5kIiwiZXZlcnkiLCJzYXZlZCIsImZpZWxkSWR4IiwiZmluZEluZGV4IiwidmFsdWUiLCJvcHRpb25hbCIsInZpc3VhbENoYW5uZWxzIiwic2F2ZWRMYXllciIsInZhbHVlcyIsImZvdW5kIiwiZmllbGQiLCJzY2FsZSIsImZvdW5kRmllbGQiLCJmaW5kIiwiZmQiLCJpZCIsInR5cGUiLCJoYXNPd25Qcm9wZXJ0eSIsImNvbHVtbnMiLCJuZXdMYXllciIsImxhYmVsIiwiY29sb3IiLCJpc1Zpc2libGUiLCJnZXRMYXllckNvbHVtbnMiLCJmb3VuZFZpc3VhbENoYW5uZWxDb25maWdzIiwidmlzQ29uZmlnIiwiY29weUxheWVyQ29uZmlnIiwibm90VG9EZWVwTWVyZ2UiLCJ1cGRhdGVMYXllckNvbmZpZyIsImZpbHRlclByb3BzRnJvbUZpZWxkIiwibWF0Y2hlZEZpbHRlciIsImZyZWV6ZSIsInlBeGlzIiwibWF0Y2hlQXhpcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztRQXlDZ0JBLFksR0FBQUEsWTtRQTREQUMsVyxHQUFBQSxXO1FBaURBQyxpQixHQUFBQSxpQjtRQWdFQUMsNkIsR0FBQUEsNkI7UUFtQ0FDLGtCLEdBQUFBLGtCO1FBcUJBQyx5QixHQUFBQSx5QjtRQWdDQUMsMkIsR0FBQUEsMkI7UUFpQ0FDLHFCLEdBQUFBLHFCO1FBZ0VBQyxzQixHQUFBQSxzQjs7QUEzWGhCOzs7O0FBQ0E7Ozs7QUFFQTs7QUFRQTs7OztBQUVBOzs7Ozs7OztBQWpDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUF1Qk8sU0FBU1IsWUFBVCxDQUFzQlMsS0FBdEIsRUFBNkJDLGNBQTdCLEVBQTZD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NUI7QUFBQSxHQUFqQixDQUFqQjs7QUFFQSxNQUFJVyxXQUFXLENBQWYsRUFBa0I7QUFDaEI7QUFDQSxXQUFPLElBQVA7QUFDRDs7QUFFRCxNQUFNUSxRQUFRcEIsT0FBT1ksUUFBUCxDQUFkO0FBQ0EsTUFBTUUsUUFBUXRELE9BQU9zRCxLQUFyQjs7QUFFQTtBQUNBLE1BQU15Qix1QkFBdUIsaUNBQWVuRSxPQUFmLEVBQXdCZ0QsS0FBeEIsQ0FBN0I7O0FBRUEsTUFBSW9CLDJDQUNDLG1DQUFpQmhGLE9BQU9DLE1BQXhCLENBREQsRUFFQ0QsTUFGRCxFQUdDK0Usb0JBSEQ7QUFJRkUsWUFBUSxJQUpOO0FBS0Y3QjtBQUxFLElBQUo7O0FBZmdFLHVCQXVCaEQ0QixhQXZCZ0Q7QUFBQSxNQXVCekRFLEtBdkJ5RCxrQkF1QnpEQSxLQXZCeUQ7O0FBd0JoRSxNQUFJQSxLQUFKLEVBQVc7QUFDVCxRQUFNQyxhQUFhM0MsT0FBT3VCLElBQVAsQ0FDakI7QUFBQSxVQUFFdEIsSUFBRixTQUFFQSxJQUFGO0FBQUEsVUFBUXlCLElBQVIsU0FBUUEsSUFBUjtBQUFBLGFBQWtCekIsU0FBU3lDLE1BQU16QyxJQUFmLElBQXVCeUIsU0FBU2dCLE1BQU1oQixJQUF4RDtBQUFBLEtBRGlCLENBQW5COztBQUlBYyxvQkFBZ0JHLHdDQUVQSCxhQUZPO0FBR1ZFLGFBQU9DO0FBSEcsT0FJUCwyREFBa0JILGFBQWxCLElBQWlDRSxPQUFPQyxVQUF4QyxLQUFxRHZFLE9BQXJELENBSk8sSUFNWm9FLGFBTko7QUFPRDs7QUFFREEsZ0JBQWMxQixLQUFkLEdBQXNCLDRDQUEwQkEsS0FBMUIsRUFBaUMwQixhQUFqQyxDQUF0Qjs7QUFFQSxNQUFJQSxjQUFjMUIsS0FBZCxLQUF3QixJQUE1QixFQUFrQztBQUNoQztBQUNBLFdBQU8sSUFBUDtBQUNEOztBQUVELFNBQU8wQixhQUFQO0FBQ0QiLCJmaWxlIjoidmlzLXN0YXRlLW1lcmdlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgMjAxOCBVYmVyIFRlY2hub2xvZ2llcywgSW5jLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbi8vIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbi8vIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbi8vIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbi8vIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuLy8gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuLy8gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4vLyBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbi8vIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbi8vIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4vLyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4vLyBUSEUgU09GVFdBUkUuXG5cbmltcG9ydCB1bmlxIGZyb20gJ2xvZGFzaC51bmlxJztcbmltcG9ydCBwaWNrIGZyb20gJ2xvZGFzaC5waWNrJztcblxuaW1wb3J0IHtcbiAgZ2V0RGVmYXVsdEZpbHRlcixcbiAgZ2V0RmlsdGVyUHJvcHMsXG4gIGdldEZpbHRlclBsb3QsXG4gIGZpbHRlckRhdGEsXG4gIGFkanVzdFZhbHVlVG9GaWx0ZXJEb21haW5cbn0gZnJvbSAndXRpbHMvZmlsdGVyLXV0aWxzJztcblxuaW1wb3J0IHtMQVlFUl9CTEVORElOR1N9IGZyb20gJ2NvbnN0YW50cy9kZWZhdWx0LXNldHRpbmdzJztcblxuLyoqXG4gKiBNZXJnZSBsb2FkZWQgZmlsdGVycyB3aXRoIGN1cnJlbnQgc3RhdGUsIGlmIG5vIGZpZWxkcyBvciBkYXRhIGFyZSBsb2FkZWRcbiAqIHNhdmUgaXQgZm9yIGxhdGVyXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHN0YXRlXG4gKiBAcGFyYW0ge09iamVjdFtdfSBmaWx0ZXJzVG9NZXJnZVxuICogQHJldHVybiB7T2JqZWN0fSB1cGRhdGVkU3RhdGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG1lcmdlRmlsdGVycyhzdGF0ZSwgZmlsdGVyc1RvTWVyZ2UpIHtcbiAgY29uc3QgbWVyZ2VkID0gW107XG4gIGNvbnN0IHVubWVyZ2VkID0gW107XG4gIGNvbnN0IHtkYXRhc2V0c30gPSBzdGF0ZTtcblxuICBpZiAoIUFycmF5LmlzQXJyYXkoZmlsdGVyc1RvTWVyZ2UpIHx8ICFmaWx0ZXJzVG9NZXJnZS5sZW5ndGgpIHtcbiAgICByZXR1cm4gc3RhdGU7XG4gIH1cblxuICAvLyBtZXJnZSBmaWx0ZXJzXG4gIGZpbHRlcnNUb01lcmdlLmZvckVhY2goZmlsdGVyID0+IHtcbiAgICAvLyBtYXRjaCBmaWx0ZXIuZGF0YUlkIHdpdGggY3VycmVudCBkYXRlc2V0cyBpZFxuICAgIC8vIHVwbG9hZGVkIGRhdGEgbmVlZCB0byBoYXZlIHRoZSBzYW1lIGRhdGFJZCB3aXRoIHRoZSBmaWx0ZXJcbiAgICBpZiAoZGF0YXNldHNbZmlsdGVyLmRhdGFJZF0pIHtcbiAgICAgIC8vIGRhdGFzZXRzIGlzIGFscmVhZHkgbG9hZGVkXG4gICAgICBjb25zdCB2YWxpZGF0ZUZpbHRlciA9IHZhbGlkYXRlRmlsdGVyV2l0aERhdGEoXG4gICAgICAgIGRhdGFzZXRzW2ZpbHRlci5kYXRhSWRdLFxuICAgICAgICBmaWx0ZXJcbiAgICAgICk7XG5cbiAgICAgIGlmICh2YWxpZGF0ZUZpbHRlcikge1xuICAgICAgICBtZXJnZWQucHVzaCh2YWxpZGF0ZUZpbHRlcik7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIGRhdGFzZXRzIG5vdCB5ZXQgbG9hZGVkXG4gICAgICB1bm1lcmdlZC5wdXNoKGZpbHRlcik7XG4gICAgfVxuICB9KTtcblxuICAvLyBmaWx0ZXIgZGF0YVxuICBjb25zdCB1cGRhdGVkRmlsdGVycyA9IFsuLi4oc3RhdGUuZmlsdGVycyB8fCBbXSksIC4uLm1lcmdlZF07XG4gIGNvbnN0IGRhdGFzZXRUb0ZpbHRlciA9IHVuaXEobWVyZ2VkLm1hcChkID0+IGQuZGF0YUlkKSk7XG5cbiAgY29uc3QgdXBkYXRlZERhdGFzZXQgPSBkYXRhc2V0VG9GaWx0ZXIucmVkdWNlKFxuICAgIChhY2N1LCBkYXRhSWQpID0+ICh7XG4gICAgICAuLi5hY2N1LFxuICAgICAgW2RhdGFJZF06IHtcbiAgICAgICAgLi4uZGF0YXNldHNbZGF0YUlkXSxcbiAgICAgICAgLi4uZmlsdGVyRGF0YShkYXRhc2V0c1tkYXRhSWRdLmFsbERhdGEsIGRhdGFJZCwgdXBkYXRlZEZpbHRlcnMpXG4gICAgICB9XG4gICAgfSksXG4gICAgZGF0YXNldHNcbiAgKTtcblxuICByZXR1cm4ge1xuICAgIC4uLnN0YXRlLFxuICAgIGZpbHRlcnM6IHVwZGF0ZWRGaWx0ZXJzLFxuICAgIGRhdGFzZXRzOiB1cGRhdGVkRGF0YXNldCxcbiAgICBmaWx0ZXJUb0JlTWVyZ2VkOiB1bm1lcmdlZFxuICB9O1xufVxuXG4vKipcbiAqIE1lcmdlIGxheWVycyBmcm9tIGRlLXNlcmlhbGl6ZWQgc3RhdGUsIGlmIG5vIGZpZWxkcyBvciBkYXRhIGFyZSBsb2FkZWRcbiAqIHNhdmUgaXQgZm9yIGxhdGVyXG4gKlxuICogQHBhcmFtIHtvYmplY3R9IHN0YXRlXG4gKiBAcGFyYW0ge09iamVjdFtdfSBsYXllcnNUb01lcmdlXG4gKiBAcmV0dXJuIHtPYmplY3R9IHN0YXRlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBtZXJnZUxheWVycyhzdGF0ZSwgbGF5ZXJzVG9NZXJnZSkge1xuICBjb25zdCBtZXJnZWRMYXllciA9IFtdO1xuICBjb25zdCB1bm1lcmdlZCA9IFtdO1xuXG4gIGNvbnN0IHtkYXRhc2V0c30gPSBzdGF0ZTtcblxuICBpZiAoIUFycmF5LmlzQXJyYXkobGF5ZXJzVG9NZXJnZSkgfHwgIWxheWVyc1RvTWVyZ2UubGVuZ3RoKSB7XG4gICAgcmV0dXJuIHN0YXRlO1xuICB9XG5cbiAgbGF5ZXJzVG9NZXJnZS5mb3JFYWNoKGxheWVyID0+IHtcbiAgICBpZiAoZGF0YXNldHNbbGF5ZXIuY29uZmlnLmRhdGFJZF0pIHtcbiAgICAgIC8vIGRhdGFzZXRzIGFyZSBhbHJlYWR5IGxvYWRlZFxuICAgICAgY29uc3QgdmFsaWRhdGVMYXllciA9IHZhbGlkYXRlTGF5ZXJXaXRoRGF0YShcbiAgICAgICAgZGF0YXNldHNbbGF5ZXIuY29uZmlnLmRhdGFJZF0sXG4gICAgICAgIGxheWVyLFxuICAgICAgICBzdGF0ZS5sYXllckNsYXNzZXNcbiAgICAgICk7XG5cbiAgICAgIGlmICh2YWxpZGF0ZUxheWVyKSB7XG4gICAgICAgIG1lcmdlZExheWVyLnB1c2godmFsaWRhdGVMYXllcik7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIGRhdGFzZXRzIG5vdCB5ZXQgbG9hZGVkXG4gICAgICB1bm1lcmdlZC5wdXNoKGxheWVyKTtcbiAgICB9XG4gIH0pO1xuXG4gIGNvbnN0IGxheWVycyA9IFsuLi5zdGF0ZS5sYXllcnMsIC4uLm1lcmdlZExheWVyXTtcbiAgY29uc3QgbmV3TGF5ZXJPcmRlciA9IG1lcmdlZExheWVyLm1hcCgoXywgaSkgPT4gc3RhdGUubGF5ZXJzLmxlbmd0aCArIGkpO1xuXG4gIC8vIHB1dCBuZXcgbGF5ZXJzIGluIGZyb250IG9mIGN1cnJlbnQgbGF5ZXJzXG4gIGNvbnN0IGxheWVyT3JkZXIgPSBbLi4ubmV3TGF5ZXJPcmRlciwgLi4uc3RhdGUubGF5ZXJPcmRlcl07XG5cbiAgcmV0dXJuIHtcbiAgICAuLi5zdGF0ZSxcbiAgICBsYXllcnMsXG4gICAgbGF5ZXJPcmRlcixcbiAgICBsYXllclRvQmVNZXJnZWQ6IHVubWVyZ2VkXG4gIH07XG59XG5cbi8qKlxuICogTWVyZ2UgaW50ZXJhY3Rpb25zIHdpdGggc2F2ZWQgY29uZmlnXG4gKlxuICogQHBhcmFtIHtvYmplY3R9IHN0YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gaW50ZXJhY3Rpb25Ub0JlTWVyZ2VkXG4gKiBAcmV0dXJuIHtPYmplY3R9IG1lcmdlZFN0YXRlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBtZXJnZUludGVyYWN0aW9ucyhzdGF0ZSwgaW50ZXJhY3Rpb25Ub0JlTWVyZ2VkKSB7XG4gIGNvbnN0IG1lcmdlZCA9IHt9O1xuICBjb25zdCB1bm1lcmdlZCA9IHt9O1xuXG4gIGlmIChpbnRlcmFjdGlvblRvQmVNZXJnZWQpIHtcbiAgICBPYmplY3Qua2V5cyhpbnRlcmFjdGlvblRvQmVNZXJnZWQpLmZvckVhY2goa2V5ID0+IHtcbiAgICAgIGlmICghc3RhdGUuaW50ZXJhY3Rpb25Db25maWdba2V5XSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHtlbmFibGVkLCAuLi5jb25maWdTYXZlZH0gPSBpbnRlcmFjdGlvblRvQmVNZXJnZWRba2V5XSB8fCB7fTtcbiAgICAgIGxldCBjb25maWdUb01lcmdlID0gY29uZmlnU2F2ZWQ7XG5cbiAgICAgIGlmIChrZXkgPT09ICd0b29sdGlwJykge1xuICAgICAgICBjb25zdCB7bWVyZ2VkVG9vbHRpcCwgdW5tZXJnZWRUb29sdGlwfSA9IG1lcmdlSW50ZXJhY3Rpb25Ub29sdGlwQ29uZmlnKFxuICAgICAgICAgIHN0YXRlLFxuICAgICAgICAgIGNvbmZpZ1NhdmVkXG4gICAgICAgICk7XG5cbiAgICAgICAgLy8gbWVyZ2UgbmV3IGRhdGFzZXQgdG9vbHRpcHMgd2l0aCBvcmlnaW5hbCBkYXRhc2V0IHRvb2x0aXBzXG4gICAgICAgIGNvbmZpZ1RvTWVyZ2UgPSB7XG4gICAgICAgICAgZmllbGRzVG9TaG93OiB7XG4gICAgICAgICAgICAuLi5zdGF0ZS5pbnRlcmFjdGlvbkNvbmZpZ1trZXldLmNvbmZpZy5maWVsZHNUb1Nob3csXG4gICAgICAgICAgICAuLi5tZXJnZWRUb29sdGlwXG4gICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIGlmIChPYmplY3Qua2V5cyh1bm1lcmdlZFRvb2x0aXApLmxlbmd0aCkge1xuICAgICAgICAgIHVubWVyZ2VkLnRvb2x0aXAgPSB7ZmllbGRzVG9TaG93OiB1bm1lcmdlZFRvb2x0aXAsIGVuYWJsZWR9O1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIG1lcmdlZFtrZXldID0ge1xuICAgICAgICAuLi5zdGF0ZS5pbnRlcmFjdGlvbkNvbmZpZ1trZXldLFxuICAgICAgICBlbmFibGVkLFxuICAgICAgICBjb25maWc6IHBpY2soXG4gICAgICAgICAge1xuICAgICAgICAgICAgLi4uc3RhdGUuaW50ZXJhY3Rpb25Db25maWdba2V5XS5jb25maWcsXG4gICAgICAgICAgICAuLi5jb25maWdUb01lcmdlXG4gICAgICAgICAgfSxcbiAgICAgICAgICBPYmplY3Qua2V5cyhzdGF0ZS5pbnRlcmFjdGlvbkNvbmZpZ1trZXldLmNvbmZpZylcbiAgICAgICAgKVxuICAgICAgfTtcbiAgICB9KTtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgLi4uc3RhdGUsXG4gICAgaW50ZXJhY3Rpb25Db25maWc6IHtcbiAgICAgIC4uLnN0YXRlLmludGVyYWN0aW9uQ29uZmlnLFxuICAgICAgLi4ubWVyZ2VkXG4gICAgfSxcbiAgICBpbnRlcmFjdGlvblRvQmVNZXJnZWQ6IHVubWVyZ2VkXG4gIH07XG59XG5cbi8qKlxuICogTWVyZ2UgaW50ZXJhY3Rpb25Db25maWcudG9vbHRpcCB3aXRoIHNhdmVkIGNvbmZpZyxcbiAqIHZhbGlkYXRlIGZpZWxkc1RvU2hvd1xuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdGF0ZVxuICogQHBhcmFtIHtPYmplY3R9IHRvb2x0aXBDb25maWdcbiAqIEByZXR1cm4ge09iamVjdH0gLSB7bWVyZ2VkVG9vbHRpcDoge30sIHVubWVyZ2VkVG9vbHRpcDoge319XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBtZXJnZUludGVyYWN0aW9uVG9vbHRpcENvbmZpZyhzdGF0ZSwgdG9vbHRpcENvbmZpZyA9IHt9KSB7XG4gIGNvbnN0IHVubWVyZ2VkVG9vbHRpcCA9IHt9O1xuICBjb25zdCBtZXJnZWRUb29sdGlwID0ge307XG5cbiAgaWYgKFxuICAgICF0b29sdGlwQ29uZmlnLmZpZWxkc1RvU2hvdyB8fFxuICAgICFPYmplY3Qua2V5cyh0b29sdGlwQ29uZmlnLmZpZWxkc1RvU2hvdykubGVuZ3RoXG4gICkge1xuICAgIHJldHVybiB7bWVyZ2VkVG9vbHRpcCwgdW5tZXJnZWRUb29sdGlwfTtcbiAgfVxuXG4gIGZvciAoY29uc3QgZGF0YUlkIGluIHRvb2x0aXBDb25maWcuZmllbGRzVG9TaG93KSB7XG4gICAgaWYgKCFzdGF0ZS5kYXRhc2V0c1tkYXRhSWRdKSB7XG4gICAgICAvLyBpcyBub3QgeWV0IGxvYWRlZFxuICAgICAgdW5tZXJnZWRUb29sdGlwW2RhdGFJZF0gPSB0b29sdGlwQ29uZmlnLmZpZWxkc1RvU2hvd1tkYXRhSWRdO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBpZiBkYXRhc2V0IGlzIGxvYWRlZFxuICAgICAgY29uc3QgYWxsRmllbGRzID0gc3RhdGUuZGF0YXNldHNbZGF0YUlkXS5maWVsZHMubWFwKGQgPT4gZC5uYW1lKTtcbiAgICAgIGNvbnN0IGZvdW5kRmllbGRzVG9TaG93ID0gdG9vbHRpcENvbmZpZy5maWVsZHNUb1Nob3dbZGF0YUlkXS5maWx0ZXIoXG4gICAgICAgIG5hbWUgPT4gYWxsRmllbGRzLmluY2x1ZGVzKG5hbWUpXG4gICAgICApO1xuXG4gICAgICBtZXJnZWRUb29sdGlwW2RhdGFJZF0gPSBmb3VuZEZpZWxkc1RvU2hvdztcbiAgICB9XG4gIH1cblxuICByZXR1cm4ge21lcmdlZFRvb2x0aXAsIHVubWVyZ2VkVG9vbHRpcH07XG59XG4vKipcbiAqIE1lcmdlIGxheWVyQmxlbmRpbmcgd2l0aCBzYXZlZFxuICpcbiAqIEBwYXJhbSB7b2JqZWN0fSBzdGF0ZVxuICogQHBhcmFtIHtzdHJpbmd9IGxheWVyQmxlbmRpbmdcbiAqIEByZXR1cm4ge29iamVjdH0gbWVyZ2VkIHN0YXRlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBtZXJnZUxheWVyQmxlbmRpbmcoc3RhdGUsIGxheWVyQmxlbmRpbmcpIHtcbiAgaWYgKGxheWVyQmxlbmRpbmcgJiYgTEFZRVJfQkxFTkRJTkdTW2xheWVyQmxlbmRpbmddKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIC4uLnN0YXRlLFxuICAgICAgbGF5ZXJCbGVuZGluZ1xuICAgIH07XG4gIH1cblxuICByZXR1cm4gc3RhdGU7XG59XG5cbi8qKlxuICogVmFsaWRhdGUgc2F2ZWQgbGF5ZXIgY29sdW1ucyB3aXRoIG5ldyBkYXRhLFxuICogdXBkYXRlIGZpZWxkSWR4IGJhc2VkIG9uIG5ldyBmaWVsZHNcbiAqXG4gKiBAcGFyYW0ge09iamVjdFtdfSBmaWVsZHNcbiAqIEBwYXJhbSB7T2JqZWN0fSBzYXZlZENvbHNcbiAqIEBwYXJhbSB7T2JqZWN0fSBlbXB0eUNvbHNcbiAqIEByZXR1cm4ge251bGwgfCBPYmplY3R9IC0gdmFsaWRhdGVkIGNvbHVtbnMgb3IgbnVsbFxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiB2YWxpZGF0ZVNhdmVkTGF5ZXJDb2x1bW5zKGZpZWxkcywgc2F2ZWRDb2xzLCBlbXB0eUNvbHMpIHtcbiAgY29uc3QgY29sRm91bmQgPSB7fTtcbiAgLy8gZmluZCBhY3R1YWwgY29sdW1uIGZpZWxkSWR4LCBpbiBjYXNlIGl0IGhhcyBjaGFuZ2VkXG4gIGNvbnN0IGFsbENvbEZvdW5kID0gT2JqZWN0LmtleXMoZW1wdHlDb2xzKS5ldmVyeShrZXkgPT4ge1xuICAgIGNvbnN0IHNhdmVkID0gc2F2ZWRDb2xzW2tleV07XG4gICAgY29sRm91bmRba2V5XSA9IHsuLi5lbXB0eUNvbHNba2V5XX07XG5cbiAgICBjb25zdCBmaWVsZElkeCA9IGZpZWxkcy5maW5kSW5kZXgoKHtuYW1lfSkgPT4gbmFtZSA9PT0gc2F2ZWQpO1xuXG4gICAgaWYgKGZpZWxkSWR4ID4gLTEpIHtcbiAgICAgIC8vIHVwZGF0ZSBmb3VuZCBjb2x1bW5zXG4gICAgICBjb2xGb3VuZFtrZXldLmZpZWxkSWR4ID0gZmllbGRJZHg7XG4gICAgICBjb2xGb3VuZFtrZXldLnZhbHVlID0gc2F2ZWQ7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICAvLyBpZiBjb2wgaXMgb3B0aW9uYWwsIGFsbG93IG51bGwgdmFsdWVcbiAgICByZXR1cm4gZW1wdHlDb2xzW2tleV0ub3B0aW9uYWwgfHwgZmFsc2U7XG4gIH0pO1xuXG4gIHJldHVybiBhbGxDb2xGb3VuZCAmJiBjb2xGb3VuZDtcbn1cblxuLyoqXG4gKiBWYWxpZGF0ZSBzYXZlZCB2aXN1YWwgY2hhbm5lbHMgY29uZmlnIHdpdGggbmV3IGRhdGEsXG4gKiByZWZlciB0byB2aXMtc3RhdGUtc2NoZW1hLmpzIFZpc3VhbENoYW5uZWxTY2hlbWFWMVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0W119IGZpZWxkc1xuICogQHBhcmFtIHtPYmplY3R9IHZpc3VhbENoYW5uZWxzXG4gKiBAcGFyYW0ge09iamVjdH0gc2F2ZWRMYXllclxuICogQHJldHVybiB7T2JqZWN0fSAtIHZhbGlkYXRlZCB2aXN1YWwgY2hhbm5lbCBpbiBjb25maWcgb3Ige31cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHZhbGlkYXRlU2F2ZWRWaXN1YWxDaGFubmVscyhcbiAgZmllbGRzLFxuICB2aXN1YWxDaGFubmVscyxcbiAgc2F2ZWRMYXllclxuKSB7XG4gIHJldHVybiBPYmplY3QudmFsdWVzKHZpc3VhbENoYW5uZWxzKS5yZWR1Y2UoKGZvdW5kLCB7ZmllbGQsIHNjYWxlfSkgPT4ge1xuICAgIGxldCBmb3VuZEZpZWxkO1xuICAgIGlmIChzYXZlZExheWVyLmNvbmZpZ1tmaWVsZF0pIHtcbiAgICAgIGZvdW5kRmllbGQgPSBmaWVsZHMuZmluZChmZCA9PlxuICAgICAgICBPYmplY3Qua2V5cyhzYXZlZExheWVyLmNvbmZpZ1tmaWVsZF0pLmV2ZXJ5KFxuICAgICAgICAgIGtleSA9PiBzYXZlZExheWVyLmNvbmZpZ1tmaWVsZF1ba2V5XSA9PT0gZmRba2V5XVxuICAgICAgICApXG4gICAgICApO1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAuLi5mb3VuZCxcbiAgICAgIC4uLihmb3VuZEZpZWxkID8ge1tmaWVsZF06IGZvdW5kRmllbGR9IDoge30pLFxuICAgICAgLi4uKHNhdmVkTGF5ZXIuY29uZmlnW3NjYWxlXSA/IHtbc2NhbGVdOiBzYXZlZExheWVyLmNvbmZpZ1tzY2FsZV19IDoge30pXG4gICAgfTtcbiAgfSwge30pO1xufVxuXG4vKipcbiAqIFZhbGlkYXRlIHNhdmVkIGxheWVyIGNvbmZpZyB3aXRoIG5ldyBkYXRhLFxuICogdXBkYXRlIGZpZWxkSWR4IGJhc2VkIG9uIG5ldyBmaWVsZHNcbiAqXG4gKiBAcGFyYW0ge09iamVjdFtdfSBmaWVsZHNcbiAqIEBwYXJhbSB7U3RyaW5nfSBkYXRhSWRcbiAqIEBwYXJhbSB7T2JqZWN0fSBzYXZlZExheWVyXG4gKiBAcGFyYW0ge09iamVjdH0gbGF5ZXJDbGFzc2VzXG4gKiBAcmV0dXJuIHtudWxsIHwgT2JqZWN0fSAtIHZhbGlkYXRlZCBsYXllciBvciBudWxsXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB2YWxpZGF0ZUxheWVyV2l0aERhdGEoe2ZpZWxkcywgaWQ6IGRhdGFJZH0sIHNhdmVkTGF5ZXIsIGxheWVyQ2xhc3Nlcykge1xuICBjb25zdCB7dHlwZX0gPSBzYXZlZExheWVyO1xuICAvLyBsYXllciBkb2VzbnQgaGF2ZSBhIHZhbGlkIHR5cGVcbiAgaWYgKFxuICAgICFsYXllckNsYXNzZXMuaGFzT3duUHJvcGVydHkodHlwZSkgfHxcbiAgICAhc2F2ZWRMYXllci5jb25maWcgfHxcbiAgICAhc2F2ZWRMYXllci5jb25maWcuY29sdW1uc1xuICApIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIGNvbnN0IG5ld0xheWVyID0gbmV3IGxheWVyQ2xhc3Nlc1t0eXBlXSh7XG4gICAgaWQ6IHNhdmVkTGF5ZXIuaWQsXG4gICAgZGF0YUlkLFxuICAgIGxhYmVsOiBzYXZlZExheWVyLmNvbmZpZy5sYWJlbCxcbiAgICBjb2xvcjogc2F2ZWRMYXllci5jb25maWcuY29sb3IsXG4gICAgaXNWaXNpYmxlOiBzYXZlZExheWVyLmNvbmZpZy5pc1Zpc2libGVcbiAgfSk7XG5cbiAgLy8gZmluZCBjb2x1bW4gZmllbGRJZHhcbiAgY29uc3QgY29sdW1ucyA9IHZhbGlkYXRlU2F2ZWRMYXllckNvbHVtbnMoXG4gICAgZmllbGRzLFxuICAgIHNhdmVkTGF5ZXIuY29uZmlnLmNvbHVtbnMsXG4gICAgbmV3TGF5ZXIuZ2V0TGF5ZXJDb2x1bW5zKClcbiAgKTtcblxuICBpZiAoIWNvbHVtbnMpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIC8vIHZpc3VhbCBjaGFubmVsIGZpZWxkIGlzIHNhdmVkIHRvIGJlIHtuYW1lLCB0eXBlfVxuICAvLyBmaW5kIHZpc3VhbCBjaGFubmVsIGZpZWxkIGJ5IG1hdGNoaW5nIGJvdGggbmFtZSBhbmQgdHlwZVxuICAvLyByZWZlciB0byB2aXMtc3RhdGUtc2NoZW1hLmpzIFZpc3VhbENoYW5uZWxTY2hlbWFWMVxuICBjb25zdCBmb3VuZFZpc3VhbENoYW5uZWxDb25maWdzID0gdmFsaWRhdGVTYXZlZFZpc3VhbENoYW5uZWxzKFxuICAgIGZpZWxkcyxcbiAgICBuZXdMYXllci52aXN1YWxDaGFubmVscyxcbiAgICBzYXZlZExheWVyXG4gICk7XG5cbiAgLy8gY29weSB2aXNDb25maWcgb3ZlciB0byBlbXB0eUxheWVyIHRvIG1ha2Ugc3VyZSBpdCBoYXMgYWxsIHRoZSBwcm9wc1xuICBjb25zdCB2aXNDb25maWcgPSBuZXdMYXllci5jb3B5TGF5ZXJDb25maWcoXG4gICAgbmV3TGF5ZXIuY29uZmlnLnZpc0NvbmZpZyxcbiAgICBzYXZlZExheWVyLmNvbmZpZy52aXNDb25maWcgfHwge30sXG4gICAge25vdFRvRGVlcE1lcmdlOiAnY29sb3JSYW5nZSd9XG4gICk7XG5cbiAgbmV3TGF5ZXIudXBkYXRlTGF5ZXJDb25maWcoe1xuICAgIGNvbHVtbnMsXG4gICAgdmlzQ29uZmlnLFxuICAgIC4uLmZvdW5kVmlzdWFsQ2hhbm5lbENvbmZpZ3NcbiAgfSk7XG5cbiAgcmV0dXJuIG5ld0xheWVyO1xufVxuXG4vKipcbiAqIFZhbGlkYXRlIHNhdmVkIGZpbHRlciBjb25maWcgd2l0aCBuZXcgZGF0YSxcbiAqIGNhbGN1bGF0ZSBkb21haW4gYW5kIGZpZWxkSWR4IGJhc2VkIG5ldyBmaWVsZHMgYW5kIGRhdGFcbiAqXG4gKiBAcGFyYW0ge09iamVjdFtdfSBkYXRhc2V0LmZpZWxkc1xuICogQHBhcmFtIHtPYmplY3RbXX0gZGF0YXNldC5hbGxEYXRhXG4gKiBAcGFyYW0ge09iamVjdH0gZmlsdGVyIC0gZmlsdGVyIHRvIGJlIHZhbGlkYXRlXG4gKiBAcmV0dXJuIHtPYmplY3QgfCBudWxsfSAtIHZhbGlkYXRlZCBmaWx0ZXJcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHZhbGlkYXRlRmlsdGVyV2l0aERhdGEoe2ZpZWxkcywgYWxsRGF0YX0sIGZpbHRlcikge1xuICAvLyBtYXRjaCBmaWx0ZXIubmFtZSB0byBmaWVsZC5uYW1lXG4gIGNvbnN0IGZpZWxkSWR4ID0gZmllbGRzLmZpbmRJbmRleCgoe25hbWV9KSA9PiBuYW1lID09PSBmaWx0ZXIubmFtZSk7XG5cbiAgaWYgKGZpZWxkSWR4IDwgMCkge1xuICAgIC8vIGlmIGNhbid0IGZpbmQgZmllbGQgd2l0aCBzYW1lIG5hbWUsIGRpc2NoYXJnZSBmaWx0ZXJcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIGNvbnN0IGZpZWxkID0gZmllbGRzW2ZpZWxkSWR4XTtcbiAgY29uc3QgdmFsdWUgPSBmaWx0ZXIudmFsdWU7XG5cbiAgLy8gcmV0dXJuIGZpbHRlciB0eXBlLCBkZWZhdWx0IHZhbHVlLCBmaWVsZFR5cGUgYW5kIGZpZWxkRG9tYWluIGZyb20gZmllbGRcbiAgY29uc3QgZmlsdGVyUHJvcHNGcm9tRmllbGQgPSBnZXRGaWx0ZXJQcm9wcyhhbGxEYXRhLCBmaWVsZCk7XG5cbiAgbGV0IG1hdGNoZWRGaWx0ZXIgPSB7XG4gICAgLi4uZ2V0RGVmYXVsdEZpbHRlcihmaWx0ZXIuZGF0YUlkKSxcbiAgICAuLi5maWx0ZXIsXG4gICAgLi4uZmlsdGVyUHJvcHNGcm9tRmllbGQsXG4gICAgZnJlZXplOiB0cnVlLFxuICAgIGZpZWxkSWR4XG4gIH07XG5cbiAgY29uc3Qge3lBeGlzfSA9IG1hdGNoZWRGaWx0ZXI7XG4gIGlmICh5QXhpcykge1xuICAgIGNvbnN0IG1hdGNoZUF4aXMgPSBmaWVsZHMuZmluZChcbiAgICAgICh7bmFtZSwgdHlwZX0pID0+IG5hbWUgPT09IHlBeGlzLm5hbWUgJiYgdHlwZSA9PT0geUF4aXMudHlwZVxuICAgICk7XG5cbiAgICBtYXRjaGVkRmlsdGVyID0gbWF0Y2hlQXhpc1xuICAgICAgPyB7XG4gICAgICAgICAgLi4ubWF0Y2hlZEZpbHRlcixcbiAgICAgICAgICB5QXhpczogbWF0Y2hlQXhpcyxcbiAgICAgICAgICAuLi5nZXRGaWx0ZXJQbG90KHsuLi5tYXRjaGVkRmlsdGVyLCB5QXhpczogbWF0Y2hlQXhpc30sIGFsbERhdGEpXG4gICAgICAgIH1cbiAgICAgIDogbWF0Y2hlZEZpbHRlcjtcbiAgfVxuXG4gIG1hdGNoZWRGaWx0ZXIudmFsdWUgPSBhZGp1c3RWYWx1ZVRvRmlsdGVyRG9tYWluKHZhbHVlLCBtYXRjaGVkRmlsdGVyKTtcblxuICBpZiAobWF0Y2hlZEZpbHRlci52YWx1ZSA9PT0gbnVsbCkge1xuICAgIC8vIGNhbm50IGFkanVzdCBzYXZlZCB2YWx1ZSB0byBmaWx0ZXJcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHJldHVybiBtYXRjaGVkRmlsdGVyO1xufVxuIl19