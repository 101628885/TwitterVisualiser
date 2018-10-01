'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadFilesErrUpdater = exports.loadFilesUpdater = exports.updateVisDataUpdater = exports.toggleLayerForMapUpdater = exports.setVisibleLayersForMapUpdater = exports.toggleSplitMapUpdater = exports.mapClickUpdater = exports.layerClickUpdater = exports.layerHoverUpdater = exports.receiveMapConfigUpdater = exports.resetMapConfigVisStateUpdater = exports.showDatasetTableUpdater = exports.updateLayerBlendingUpdater = exports.removeDatasetUpdater = exports.reorderLayerUpdater = exports.removeLayerUpdater = exports.addLayerUpdater = exports.removeFilterUpdater = exports.enlargeFilterUpdater = exports.updateAnimationSpeedUpdater = exports.toggleFilterAnimationUpdater = exports.addFilterUpdater = exports.setFilterPlotUpdater = exports.INITIAL_VIS_STATE = undefined;

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _extends13 = require('babel-runtime/helpers/extends');

var _extends14 = _interopRequireDefault(_extends13);

exports.layerConfigChangeUpdater = layerConfigChangeUpdater;
exports.layerTypeChangeUpdater = layerTypeChangeUpdater;
exports.layerVisualChannelChangeUpdater = layerVisualChannelChangeUpdater;
exports.layerVisConfigChangeUpdater = layerVisConfigChangeUpdater;
exports.interactionConfigChangeUpdater = interactionConfigChangeUpdater;
exports.setFilterUpdater = setFilterUpdater;
exports.addDefaultLayers = addDefaultLayers;
exports.addDefaultTooltips = addDefaultTooltips;
exports.updateAllLayerDomainData = updateAllLayerDomainData;

var _window = require('global/window');

var _reactPalm = require('react-palm');

var _tasks = require('react-palm/tasks');

var _tasks2 = require('../tasks/tasks');

var _visStateActions = require('../actions/vis-state-actions');

var _actions = require('../actions');

var _interactionUtils = require('../utils/interaction-utils');

var _utils = require('../utils/utils');

var _filterUtils = require('../utils/filter-utils');

var _datasetUtils = require('../utils/dataset-utils');

var _layerUtils = require('../utils/layer-utils/layer-utils');

var _fileHandler = require('../processors/file-handler');

var _visStateMerger = require('./vis-state-merger');

var _layers = require('../layers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// react-palm
// disable capture exception for react-palm call to withTasks


// Tasks
(0, _tasks.disableStackCapturing)();

// Utils


// Actions
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

var INITIAL_VIS_STATE = exports.INITIAL_VIS_STATE = {
  // layers
  layers: [],
  layerData: [],
  layerToBeMerged: [],
  layerOrder: [],

  // filters
  filters: [],
  filterToBeMerged: [],

  // a collection of multiple dataset
  datasets: {},
  editingDataset: undefined,

  interactionConfig: (0, _interactionUtils.getDefaultInteraction)(),
  interactionToBeMerged: undefined,

  layerBlending: 'normal',
  hoverInfo: undefined,
  clicked: undefined,

  fileLoading: false,
  fileLoadingErr: null,

  // this is used when user split maps
  splitMaps: [
    // this will contain a list of objects to
    // describe the state of layer availability and visibility for each map
    // [
    //   {
    //     layers: {
    //       layer_id: {
    //         isAvailable: true|false # this is driven by the left hand panel
    //         isVisible: true|false
    //       }
    //     }
    //   }
    // ]
  ],

  // defaults layer classes
  layerClasses: _layers.LayerClasses
};

function updateStateWithLayerAndData(state, _ref) {
  var layerData = _ref.layerData,
      layer = _ref.layer,
      idx = _ref.idx;

  return (0, _extends14.default)({}, state, {
    layers: state.layers.map(function (lyr, i) {
      return i === idx ? layer : lyr;
    }),
    layerData: layerData ? state.layerData.map(function (d, i) {
      return i === idx ? layerData : d;
    }) : state.layerData
  });
}

/**
 * Called to update layer base config: dataId, label, column, isVisible
 *
 */
function layerConfigChangeUpdater(state, action) {
  var oldLayer = action.oldLayer;

  var idx = state.layers.findIndex(function (l) {
    return l.id === oldLayer.id;
  });
  var props = Object.keys(action.newConfig);

  var newLayer = oldLayer.updateLayerConfig(action.newConfig);
  if (newLayer.shouldCalculateLayerData(props)) {
    var oldLayerData = state.layerData[idx];

    var _calculateLayerData = (0, _layerUtils.calculateLayerData)(newLayer, state, oldLayerData, { sameData: true }),
        layerData = _calculateLayerData.layerData,
        layer = _calculateLayerData.layer;

    return updateStateWithLayerAndData(state, { layerData: layerData, layer: layer, idx: idx });
  }

  var newState = (0, _extends14.default)({}, state, {
    splitMaps: 'isVisible' in action.newConfig ? toggleLayerFromSplitMaps(state, newLayer) : state.splitMaps
  });

  return updateStateWithLayerAndData(newState, { layer: newLayer, idx: idx });
}

function layerTypeChangeUpdater(state, action) {
  var oldLayer = action.oldLayer,
      newType = action.newType;

  var oldId = oldLayer.id;
  var idx = state.layers.findIndex(function (l) {
    return l.id === oldId;
  });

  if (!state.layerClasses[newType]) {
    _window.console.error(newType + ' is not a valid layer type');
    return state;
  }

  // get a mint layer, with new id and type
  // because deck.gl uses id to match between new and old layer.
  // If type has changed but id is the same, it will break
  var newLayer = new state.layerClasses[newType]();

  newLayer.assignConfigToLayer(oldLayer.config, oldLayer.visConfigSettings);

  if (newLayer.config.dataId) {
    var dataset = state.datasets[newLayer.config.dataId];
    newLayer.updateLayerDomain(dataset);
  }

  var _calculateLayerData2 = (0, _layerUtils.calculateLayerData)(newLayer, state),
      layerData = _calculateLayerData2.layerData,
      layer = _calculateLayerData2.layer;

  var newState = state;

  // update splitMap layer id
  if (state.splitMaps) {
    newState = (0, _extends14.default)({}, state, {
      splitMaps: state.splitMaps.map(function (settings) {
        var _settings$layers = settings.layers,
            oldLayerMap = _settings$layers[oldId],
            otherLayers = (0, _objectWithoutProperties3.default)(_settings$layers, [oldId]);

        return (0, _extends14.default)({}, settings, {
          layers: (0, _extends14.default)({}, otherLayers, (0, _defineProperty3.default)({}, layer.id, oldLayerMap))
        });
      })
    });
  }

  return updateStateWithLayerAndData(newState, { layerData: layerData, layer: layer, idx: idx });
}

function layerVisualChannelChangeUpdater(state, action) {
  var oldLayer = action.oldLayer,
      newConfig = action.newConfig,
      channel = action.channel;

  var dataset = state.datasets[oldLayer.config.dataId];

  var idx = state.layers.findIndex(function (l) {
    return l.id === oldLayer.id;
  });
  var newLayer = oldLayer.updateLayerConfig(newConfig);

  newLayer.updateLayerVisualChannel(dataset, channel);

  var oldLayerData = state.layerData[idx];

  var _calculateLayerData3 = (0, _layerUtils.calculateLayerData)(newLayer, state, oldLayerData, {
    sameData: true
  }),
      layerData = _calculateLayerData3.layerData,
      layer = _calculateLayerData3.layer;

  return updateStateWithLayerAndData(state, { layerData: layerData, layer: layer, idx: idx });
}

function layerVisConfigChangeUpdater(state, action) {
  var oldLayer = action.oldLayer;

  var idx = state.layers.findIndex(function (l) {
    return l.id === oldLayer.id;
  });
  var props = Object.keys(action.newVisConfig);

  var newVisConfig = (0, _extends14.default)({}, oldLayer.config.visConfig, action.newVisConfig);

  var newLayer = oldLayer.updateLayerConfig({ visConfig: newVisConfig });

  if (newLayer.shouldCalculateLayerData(props)) {
    var oldLayerData = state.layerData[idx];

    var _calculateLayerData4 = (0, _layerUtils.calculateLayerData)(newLayer, state, oldLayerData, { sameData: true }),
        layerData = _calculateLayerData4.layerData,
        layer = _calculateLayerData4.layer;

    return updateStateWithLayerAndData(state, { layerData: layerData, layer: layer, idx: idx });
  }

  return updateStateWithLayerAndData(state, { layer: newLayer, idx: idx });
}

/* eslint-enable max-statements */

function interactionConfigChangeUpdater(state, action) {
  var config = action.config;


  var interactionConfig = (0, _extends14.default)({}, state.interactionConfig, (0, _defineProperty3.default)({}, config.id, config));

  if (config.enabled && !state.interactionConfig[config.id].enabled) {
    // only enable one interaction at a time
    Object.keys(interactionConfig).forEach(function (k) {
      if (k !== config.id) {
        interactionConfig[k] = (0, _extends14.default)({}, interactionConfig[k], { enabled: false });
      }
    });
  }

  return (0, _extends14.default)({}, state, {
    interactionConfig: interactionConfig
  });
}

function setFilterUpdater(state, action) {
  var idx = action.idx,
      prop = action.prop,
      value = action.value;

  var newState = state;
  var newFilter = (0, _extends14.default)({}, state.filters[idx], (0, _defineProperty3.default)({}, prop, value));

  var _newFilter = newFilter,
      dataId = _newFilter.dataId;

  if (!dataId) {
    return state;
  }
  var _state$datasets$dataI = state.datasets[dataId],
      fields = _state$datasets$dataI.fields,
      allData = _state$datasets$dataI.allData;


  switch (prop) {
    case 'dataId':
      // if trying to update filter dataId. create an empty new filter
      newFilter = (0, _filterUtils.getDefaultFilter)(dataId);
      break;

    case 'name':
      // find the field
      var fieldIdx = fields.findIndex(function (f) {
        return f.name === value;
      });
      var field = fields[fieldIdx];

      if (!field.filterProp) {
        // get filter domain from field
        // save filterProps: {domain, steps, value} to field, avoid recalculate
        field = (0, _extends14.default)({}, field, {
          filterProp: (0, _filterUtils.getFilterProps)(allData, field)
        });
      }

      newFilter = (0, _extends14.default)({}, newFilter, field.filterProp, {
        name: field.name,
        // can't edit dataId once name is selected
        freeze: true,
        fieldIdx: fieldIdx
      });
      var enlargedFilterIdx = state.filters.findIndex(function (f) {
        return f.enlarged;
      });
      if (enlargedFilterIdx > -1 && enlargedFilterIdx !== idx) {
        // there should be only one enlarged filter
        newFilter.enlarged = false;
      }

      newState = (0, _extends14.default)({}, state, {
        datasets: (0, _extends14.default)({}, state.datasets, (0, _defineProperty3.default)({}, dataId, (0, _extends14.default)({}, state.datasets[dataId], {
          fields: fields.map(function (d, i) {
            return i === fieldIdx ? field : d;
          })
        })))
      });
      break;
    case 'value':
    default:
      break;
  }

  // save new filters to newState
  newState = (0, _extends14.default)({}, newState, {
    filters: state.filters.map(function (f, i) {
      return i === idx ? newFilter : f;
    })
  });

  // filter data
  newState = (0, _extends14.default)({}, newState, {
    datasets: (0, _extends14.default)({}, newState.datasets, (0, _defineProperty3.default)({}, dataId, (0, _extends14.default)({}, newState.datasets[dataId], (0, _filterUtils.filterData)(allData, dataId, newState.filters))))
  });

  newState = updateAllLayerDomainData(newState, dataId, newFilter);

  return newState;
}

var setFilterPlotUpdater = exports.setFilterPlotUpdater = function setFilterPlotUpdater(state, _ref2) {
  var idx = _ref2.idx,
      newProp = _ref2.newProp;

  var newFilter = (0, _extends14.default)({}, state.filters[idx], newProp);
  var prop = Object.keys(newProp)[0];
  if (prop === 'yAxis') {
    var plotType = (0, _filterUtils.getDefaultFilterPlotType)(newFilter);

    if (plotType) {
      newFilter = (0, _extends14.default)({}, newFilter, (0, _filterUtils.getFilterPlot)((0, _extends14.default)({}, newFilter, { plotType: plotType }), state.datasets[newFilter.dataId].allData), {
        plotType: plotType
      });
    }
  }

  return (0, _extends14.default)({}, state, {
    filters: state.filters.map(function (f, i) {
      return i === idx ? newFilter : f;
    })
  });
};

var addFilterUpdater = exports.addFilterUpdater = function addFilterUpdater(state, action) {
  return !action.dataId ? state : (0, _extends14.default)({}, state, {
    filters: [].concat((0, _toConsumableArray3.default)(state.filters), [(0, _filterUtils.getDefaultFilter)(action.dataId)])
  });
};

var toggleFilterAnimationUpdater = exports.toggleFilterAnimationUpdater = function toggleFilterAnimationUpdater(state, action) {
  return (0, _extends14.default)({}, state, {
    filters: state.filters.map(function (f, i) {
      return i === action.idx ? (0, _extends14.default)({}, f, { isAnimating: !f.isAnimating }) : f;
    })
  });
};

var updateAnimationSpeedUpdater = exports.updateAnimationSpeedUpdater = function updateAnimationSpeedUpdater(state, action) {
  return (0, _extends14.default)({}, state, {
    filters: state.filters.map(function (f, i) {
      return i === action.idx ? (0, _extends14.default)({}, f, { speed: action.speed }) : f;
    })
  });
};

var enlargeFilterUpdater = exports.enlargeFilterUpdater = function enlargeFilterUpdater(state, action) {
  var isEnlarged = state.filters[action.idx].enlarged;

  return (0, _extends14.default)({}, state, {
    filters: state.filters.map(function (f, i) {
      f.enlarged = !isEnlarged && i === action.idx;
      return f;
    })
  });
};

var removeFilterUpdater = exports.removeFilterUpdater = function removeFilterUpdater(state, action) {
  var idx = action.idx;
  var dataId = state.filters[idx].dataId;


  var newFilters = [].concat((0, _toConsumableArray3.default)(state.filters.slice(0, idx)), (0, _toConsumableArray3.default)(state.filters.slice(idx + 1, state.filters.length)));

  var newState = (0, _extends14.default)({}, state, {
    datasets: (0, _extends14.default)({}, state.datasets, (0, _defineProperty3.default)({}, dataId, (0, _extends14.default)({}, state.datasets[dataId], (0, _filterUtils.filterData)(state.datasets[dataId].allData, dataId, newFilters)))),
    filters: newFilters
  });

  return updateAllLayerDomainData(newState, dataId);
};

var addLayerUpdater = exports.addLayerUpdater = function addLayerUpdater(state, action) {
  var defaultDataset = Object.keys(state.datasets)[0];
  var newLayer = new _layers.Layer((0, _extends14.default)({
    isVisible: true,
    isConfigActive: true,
    dataId: defaultDataset
  }, action.props));

  return (0, _extends14.default)({}, state, {
    layers: [].concat((0, _toConsumableArray3.default)(state.layers), [newLayer]),
    layerData: [].concat((0, _toConsumableArray3.default)(state.layerData), [{}]),
    layerOrder: [].concat((0, _toConsumableArray3.default)(state.layerOrder), [state.layerOrder.length]),
    splitMaps: addNewLayersToSplitMap(state.splitMaps, newLayer)
  });
};

var removeLayerUpdater = exports.removeLayerUpdater = function removeLayerUpdater(state, _ref3) {
  var idx = _ref3.idx;
  var layers = state.layers,
      layerData = state.layerData,
      clicked = state.clicked,
      hoverInfo = state.hoverInfo;

  var layerToRemove = state.layers[idx];
  var newMaps = removeLayerFromSplitMaps(state, layerToRemove);

  return (0, _extends14.default)({}, state, {
    layers: [].concat((0, _toConsumableArray3.default)(layers.slice(0, idx)), (0, _toConsumableArray3.default)(layers.slice(idx + 1, layers.length))),
    layerData: [].concat((0, _toConsumableArray3.default)(layerData.slice(0, idx)), (0, _toConsumableArray3.default)(layerData.slice(idx + 1, layerData.length))),
    layerOrder: state.layerOrder.filter(function (i) {
      return i !== idx;
    }).map(function (pid) {
      return pid > idx ? pid - 1 : pid;
    }),
    clicked: layerToRemove.isLayerHovered(clicked) ? undefined : clicked,
    hoverInfo: layerToRemove.isLayerHovered(hoverInfo) ? undefined : hoverInfo,
    splitMaps: newMaps
  });
};

var reorderLayerUpdater = exports.reorderLayerUpdater = function reorderLayerUpdater(state, _ref4) {
  var order = _ref4.order;
  return (0, _extends14.default)({}, state, {
    layerOrder: order
  });
};

var removeDatasetUpdater = function removeDatasetUpdater(state, action) {
  // extract dataset key
  var datasetKey = action.key;
  var datasets = state.datasets;

  // check if dataset is present

  if (!datasets[datasetKey]) {
    return state;
  }

  /* eslint-disable no-unused-vars */
  var layers = state.layers,
      _state$datasets = state.datasets,
      dataset = _state$datasets[datasetKey],
      newDatasets = (0, _objectWithoutProperties3.default)(_state$datasets, [datasetKey]);
  /* eslint-enable no-unused-vars */

  var indexes = layers.reduce(function (listOfIndexes, layer, index) {
    if (layer.config.dataId === datasetKey) {
      listOfIndexes.push(index);
    }
    return listOfIndexes;
  }, []);

  // remove layers and datasets

  var _indexes$reduce = indexes.reduce(function (_ref5, idx) {
    var currentState = _ref5.newState,
        indexCounter = _ref5.indexCounter;

    var currentIndex = idx - indexCounter;
    currentState = removeLayerUpdater(currentState, { idx: currentIndex });
    indexCounter++;
    return { newState: currentState, indexCounter: indexCounter };
  }, { newState: (0, _extends14.default)({}, state, { datasets: newDatasets }), indexCounter: 0 }),
      newState = _indexes$reduce.newState;

  // remove filters


  var filters = state.filters.filter(function (filter) {
    return filter.dataId !== datasetKey;
  });

  // update interactionConfig
  var interactionConfig = state.interactionConfig;
  var _interactionConfig = interactionConfig,
      tooltip = _interactionConfig.tooltip;

  if (tooltip) {
    var config = tooltip.config;
    /* eslint-disable no-unused-vars */

    var _config$fieldsToShow = config.fieldsToShow,
        fields = _config$fieldsToShow[datasetKey],
        fieldsToShow = (0, _objectWithoutProperties3.default)(_config$fieldsToShow, [datasetKey]);
    /* eslint-enable no-unused-vars */

    interactionConfig = (0, _extends14.default)({}, interactionConfig, {
      tooltip: (0, _extends14.default)({}, tooltip, { config: (0, _extends14.default)({}, config, { fieldsToShow: fieldsToShow }) })
    });
  }

  return (0, _extends14.default)({}, newState, { filters: filters, interactionConfig: interactionConfig });
};

exports.removeDatasetUpdater = removeDatasetUpdater;
var updateLayerBlendingUpdater = exports.updateLayerBlendingUpdater = function updateLayerBlendingUpdater(state, action) {
  return (0, _extends14.default)({}, state, {
    layerBlending: action.mode
  });
};

var showDatasetTableUpdater = exports.showDatasetTableUpdater = function showDatasetTableUpdater(state, action) {
  return (0, _extends14.default)({}, state, {
    editingDataset: action.dataId
  });
};

var resetMapConfigVisStateUpdater = exports.resetMapConfigVisStateUpdater = function resetMapConfigVisStateUpdater(state, action) {
  return (0, _extends14.default)({}, INITIAL_VIS_STATE, state.initialState, {
    initialState: state.initialState
  });
};

/**
 * Loads custom configuration into state
 * @param state
 * @param action
 * @returns {*}
 */
var receiveMapConfigUpdater = exports.receiveMapConfigUpdater = function receiveMapConfigUpdater(state, action) {
  if (!action.payload.visState) {
    return state;
  }

  var _action$payload$visSt = action.payload.visState,
      filters = _action$payload$visSt.filters,
      layers = _action$payload$visSt.layers,
      interactionConfig = _action$payload$visSt.interactionConfig,
      layerBlending = _action$payload$visSt.layerBlending,
      splitMaps = _action$payload$visSt.splitMaps;

  // always reset config when receive a new config

  var resetState = resetMapConfigVisStateUpdater(state);
  var mergedState = (0, _extends14.default)({}, resetState, {
    splitMaps: splitMaps || [] // maps doesn't require any logic
  });

  mergedState = (0, _visStateMerger.mergeFilters)(mergedState, filters);
  mergedState = (0, _visStateMerger.mergeLayers)(mergedState, layers);
  mergedState = (0, _visStateMerger.mergeInteractions)(mergedState, interactionConfig);
  mergedState = (0, _visStateMerger.mergeLayerBlending)(mergedState, layerBlending);

  return mergedState;
};

var layerHoverUpdater = exports.layerHoverUpdater = function layerHoverUpdater(state, action) {
  return (0, _extends14.default)({}, state, {
    hoverInfo: action.info
  });
};

var layerClickUpdater = exports.layerClickUpdater = function layerClickUpdater(state, action) {
  return (0, _extends14.default)({}, state, {
    clicked: action.info && action.info.picked ? action.info : null
  });
};

var mapClickUpdater = exports.mapClickUpdater = function mapClickUpdater(state, action) {
  return (0, _extends14.default)({}, state, {
    clicked: null
  });
};

var toggleSplitMapUpdater = exports.toggleSplitMapUpdater = function toggleSplitMapUpdater(state, action) {
  return state.splitMaps && state.splitMaps.length === 0 ? (0, _extends14.default)({}, state, {
    // maybe we should use an array to store state for a single map as well
    // if current maps length is equal to 0 it means that we are about to split the view
    splitMaps: computeSplitMapLayers(state.layers)
  }) : closeSpecificMapAtIndex(state, action);
};

/**
 * This is triggered when view is split into multiple maps.
 * It will only update layers that belong to the map layer dropdown
 * the user is interacting wit
 * @param state
 * @param action
 */
var setVisibleLayersForMapUpdater = exports.setVisibleLayersForMapUpdater = function setVisibleLayersForMapUpdater(state, action) {
  var mapIndex = action.mapIndex,
      layerIds = action.layerIds;

  if (!layerIds) {
    return state;
  }

  var _state$splitMaps = state.splitMaps,
      splitMaps = _state$splitMaps === undefined ? [] : _state$splitMaps;


  if (splitMaps.length === 0) {
    // we should never get into this state
    // because this action should only be triggered
    // when map view is split
    // but something may have happened
    return state;
  }

  // need to check if maps is populated otherwise will create
  var _splitMaps$mapIndex = splitMaps[mapIndex],
      map = _splitMaps$mapIndex === undefined ? {} : _splitMaps$mapIndex;


  var layers = map.layers || [];

  // we set visibility to true for all layers included in our input list
  var newLayers = (Object.keys(layers) || []).reduce(function (currentLayers, idx) {
    return (0, _extends14.default)({}, currentLayers, (0, _defineProperty3.default)({}, idx, (0, _extends14.default)({}, layers[idx], {
      isVisible: layerIds.includes(idx)
    })));
  }, {});

  var newMaps = [].concat((0, _toConsumableArray3.default)(splitMaps));

  newMaps[mapIndex] = (0, _extends14.default)({}, splitMaps[mapIndex], {
    layers: newLayers
  });

  return (0, _extends14.default)({}, state, {
    splitMaps: newMaps
  });
};

var toggleLayerForMapUpdater = exports.toggleLayerForMapUpdater = function toggleLayerForMapUpdater(state, action) {
  if (!state.splitMaps[action.mapIndex]) {
    return state;
  }

  var mapSettings = state.splitMaps[action.mapIndex];
  var layers = mapSettings.layers;

  if (!layers || !layers[action.layerId]) {
    return state;
  }

  var layer = layers[action.layerId];

  var newLayer = (0, _extends14.default)({}, layer, {
    isVisible: !layer.isVisible
  });

  var newLayers = (0, _extends14.default)({}, layers, (0, _defineProperty3.default)({}, action.layerId, newLayer));

  // const splitMaps = state.splitMaps;
  var newSplitMaps = [].concat((0, _toConsumableArray3.default)(state.splitMaps));
  newSplitMaps[action.mapIndex] = (0, _extends14.default)({}, mapSettings, {
    layers: newLayers
  });

  return (0, _extends14.default)({}, state, {
    splitMaps: newSplitMaps
  });
};

/* eslint-disable max-statements */
var updateVisDataUpdater = exports.updateVisDataUpdater = function updateVisDataUpdater(state, action) {
  // datasets can be a single data entries or an array of multiple data entries
  var datasets = Array.isArray(action.datasets) ? action.datasets : [action.datasets];

  if (action.config) {
    // apply config if passed from action
    state = receiveMapConfigUpdater(state, {
      payload: { visState: action.config }
    });
  }

  var newDateEntries = datasets.reduce(function (accu, _ref6) {
    var _ref6$info = _ref6.info,
        info = _ref6$info === undefined ? {} : _ref6$info,
        data = _ref6.data;
    return (0, _extends14.default)({}, accu, (0, _datasetUtils.createNewDataEntry)({ info: info, data: data }, state.datasets) || {});
  }, {});

  if (!Object.keys(newDateEntries).length) {
    return state;
  }

  var stateWithNewData = (0, _extends14.default)({}, state, {
    datasets: (0, _extends14.default)({}, state.datasets, newDateEntries)
  });

  // previously saved config before data loaded
  var _stateWithNewData$fil = stateWithNewData.filterToBeMerged,
      filterToBeMerged = _stateWithNewData$fil === undefined ? [] : _stateWithNewData$fil,
      _stateWithNewData$lay = stateWithNewData.layerToBeMerged,
      layerToBeMerged = _stateWithNewData$lay === undefined ? [] : _stateWithNewData$lay,
      _stateWithNewData$int = stateWithNewData.interactionToBeMerged,
      interactionToBeMerged = _stateWithNewData$int === undefined ? {} : _stateWithNewData$int;

  // merge state with saved filters

  var mergedState = (0, _visStateMerger.mergeFilters)(stateWithNewData, filterToBeMerged);
  // merge state with saved layers
  mergedState = (0, _visStateMerger.mergeLayers)(mergedState, layerToBeMerged);

  if (mergedState.layers.length === state.layers.length) {
    // no layer merged, find defaults
    mergedState = addDefaultLayers(mergedState, newDateEntries);
  }

  if (mergedState.splitMaps.length) {
    var newLayers = mergedState.layers.filter(function (l) {
      return l.config.dataId in newDateEntries;
    });
    // if map is splited, add new layers to splitMaps
    mergedState = (0, _extends14.default)({}, mergedState, {
      splitMaps: addNewLayersToSplitMap(mergedState.splitMaps, newLayers)
    });
  }

  // merge state with saved interactions
  mergedState = (0, _visStateMerger.mergeInteractions)(mergedState, interactionToBeMerged);

  // if no tooltips merged add default tooltips
  Object.keys(newDateEntries).forEach(function (dataId) {
    var tooltipFields = mergedState.interactionConfig.tooltip.config.fieldsToShow[dataId];
    if (!Array.isArray(tooltipFields) || !tooltipFields.length) {
      mergedState = addDefaultTooltips(mergedState, newDateEntries[dataId]);
    }
  });

  return updateAllLayerDomainData(mergedState, Object.keys(newDateEntries));
};
/* eslint-enable max-statements */

function generateLayerMetaForSplitViews(layer) {
  return {
    isAvailable: layer.config.isVisible,
    isVisible: layer.config.isVisible
  };
}

/**
 * This emthod will compute the default maps custom list
 * based on the current layers status
 * @param layers
 * @returns {[*,*]}
 */
function computeSplitMapLayers(layers) {
  var mapLayers = layers.reduce(function (newLayers, currentLayer) {
    return (0, _extends14.default)({}, newLayers, (0, _defineProperty3.default)({}, currentLayer.id, generateLayerMetaForSplitViews(currentLayer)));
  }, {});
  return [{
    layers: mapLayers
  }, {
    layers: mapLayers
  }];
}

/**
 * Remove an existing layers from custom map layer objects
 * @param state
 * @param layer
 * @returns {[*,*]} Maps of custom layer objects
 */
function removeLayerFromSplitMaps(state, layer) {
  return state.splitMaps.map(function (settings) {
    var layers = settings.layers;
    /* eslint-disable no-unused-vars */

    var _ = layers[layer.id],
        newLayers = (0, _objectWithoutProperties3.default)(layers, [layer.id]);
    /* eslint-enable no-unused-vars */

    return (0, _extends14.default)({}, settings, {
      layers: newLayers
    });
  });
}

/**
 * Add new layers to both existing maps
 * @param splitMaps
 * @param layers
 * @returns {[*,*]} new splitMaps
 */
function addNewLayersToSplitMap(splitMaps, layers) {
  var newLayers = Array.isArray(layers) ? layers : [layers];

  if (!splitMaps || !splitMaps.length || !newLayers.length) {
    return splitMaps;
  }

  // add new layer to both maps,
  //  don't override, if layer.id is already in splitMaps.settings.layers
  return splitMaps.map(function (settings) {
    return (0, _extends14.default)({}, settings, {
      layers: (0, _extends14.default)({}, settings.layers, newLayers.reduce(function (accu, newLayer) {
        return newLayer.config.isVisible ? (0, _extends14.default)({}, accu, (0, _defineProperty3.default)({}, newLayer.id, settings.layers[newLayer.id] ? settings.layers[newLayer.id] : generateLayerMetaForSplitViews(newLayer))) : accu;
      }, {}))
    });
  });
}

/**
 * Hide an existing layers from custom map layer objects
 * @param state
 * @param layer
 * @returns {[*,*]} Maps of custom layer objects
 */
function toggleLayerFromSplitMaps(state, layer) {
  return state.splitMaps.map(function (settings) {
    var layers = settings.layers;

    var newLayers = (0, _extends14.default)({}, layers, (0, _defineProperty3.default)({}, layer.id, generateLayerMetaForSplitViews(layer)));

    return (0, _extends14.default)({}, settings, {
      layers: newLayers
    });
  });
}

/**
 * When a user clicks on the specific map closing icon
 * the application will close the selected map
 * and will merge the remaining one with the global state
 * TODO: i think in the future this action should be called merge map layers with global settings
 * @param state
 * @param action
 * @returns {*}
 */
function closeSpecificMapAtIndex(state, action) {
  // retrieve layers meta data from the remaining map that we need to keep
  var indexToRetrieve = 1 - action.payload;

  var metaSettings = state.splitMaps[indexToRetrieve];
  if (!metaSettings || !metaSettings.layers) {
    // if we can't find the meta settings we simply clean up splitMaps and
    // keep global state as it is
    // but why does this ever happen?
    return (0, _extends14.default)({}, state, {
      splitMaps: []
    });
  }

  var layers = state.layers;

  // update layer visibility

  var newLayers = layers.map(function (layer) {
    return layer.updateLayerConfig({
      isVisible: metaSettings.layers[layer.id] ? metaSettings.layers[layer.id].isVisible : layer.config.isVisible
    });
  });

  // delete map
  return (0, _extends14.default)({}, state, {
    layers: newLayers,
    splitMaps: []
  });
}

// TODO: redo write handler to not use tasks
var loadFilesUpdater = exports.loadFilesUpdater = function loadFilesUpdater(state, action) {
  var files = action.files;

  var filesToLoad = files.map(function (fileBlob) {
    return {
      fileBlob: fileBlob,
      info: {
        id: (0, _utils.generateHashId)(4),
        label: fileBlob.name,
        size: fileBlob.size
      },
      handler: (0, _fileHandler.getFileHandler)(fileBlob)
    };
  });

  // reader -> parser -> augment -> receiveVisData
  var loadFileTasks = [_reactPalm.Task.all(filesToLoad.map(_tasks2.LOAD_FILE_TASK)).bimap(function (results) {
    var data = results.reduce(function (f, c) {
      return {
        // using concat here because the current datasets could be an array or a single item
        datasets: f.datasets.concat(c.datasets),
        // we need to deep merge this thing unless we find a better solution
        // this case will only happen if we allow to load multiple keplergl json files
        config: (0, _extends14.default)({}, f.config, c.config || {})
      };
    }, { datasets: [], config: {}, options: { centerMap: true } });
    return (0, _actions.addDataToMap)(data);
  }, function (error) {
    return (0, _visStateActions.loadFilesErr)(error);
  })];

  return (0, _reactPalm.withTask)((0, _extends14.default)({}, state, {
    fileLoading: true
  }), loadFileTasks);
};

var loadFilesErrUpdater = exports.loadFilesErrUpdater = function loadFilesErrUpdater(state, _ref7) {
  var error = _ref7.error;
  return (0, _extends14.default)({}, state, {
    fileLoading: false,
    fileLoadingErr: error
  });
};

/**
 * helper function to update All layer domain and layer data of state
 *
 * @param {object} state
 * @param {string} datasets
 * @returns {object} state
 */
function addDefaultLayers(state, datasets) {
  var defaultLayers = Object.values(datasets).reduce(function (accu, dataset) {
    return [].concat((0, _toConsumableArray3.default)(accu), (0, _toConsumableArray3.default)((0, _layerUtils.findDefaultLayer)(dataset, state.layerClasses) || []));
  }, []);
  return (0, _extends14.default)({}, state, {
    layers: [].concat((0, _toConsumableArray3.default)(state.layers), (0, _toConsumableArray3.default)(defaultLayers)),
    layerOrder: [].concat((0, _toConsumableArray3.default)(defaultLayers.map(function (_, i) {
      return state.layers.length + i;
    })), (0, _toConsumableArray3.default)(state.layerOrder))
  });
}

/**
 * helper function to find default tooltips
 *
 * @param {object} state
 * @param {object} dataset
 * @returns {object} state
 */
function addDefaultTooltips(state, dataset) {
  var tooltipFields = (0, _interactionUtils.findFieldsToShow)(dataset);

  return (0, _extends14.default)({}, state, {
    interactionConfig: (0, _extends14.default)({}, state.interactionConfig, {
      tooltip: (0, _extends14.default)({}, state.interactionConfig.tooltip, {
        config: {
          // find default fields to show in tooltip
          fieldsToShow: (0, _extends14.default)({}, state.interactionConfig.tooltip.config.fieldsToShow, tooltipFields)
        }
      })
    })
  });
}

/**
 * helper function to update layer domains for an array of datsets
 *
 * @param {object} state
 * @param {array | string} dataId
 * @param {object} newFilter - if is called by setFilter, the filter that has changed
 * @returns {object} state
 */
function updateAllLayerDomainData(state, dataId, newFilter) {
  var dataIds = typeof dataId === 'string' ? [dataId] : dataId;
  var newLayers = [];
  var newLayerDatas = [];

  state.layers.forEach(function (oldLayer, i) {
    if (oldLayer.config.dataId && dataIds.includes(oldLayer.config.dataId)) {
      // No need to recalculate layer domain if filter has fixed domain
      var newLayer = newFilter && newFilter.fixedDomain ? oldLayer : oldLayer.updateLayerDomain(state.datasets[oldLayer.config.dataId], newFilter);

      var _calculateLayerData5 = (0, _layerUtils.calculateLayerData)(newLayer, state, state.layerData[i]),
          layerData = _calculateLayerData5.layerData,
          layer = _calculateLayerData5.layer;

      newLayers.push(layer);
      newLayerDatas.push(layerData);
    } else {
      newLayers.push(oldLayer);
      newLayerDatas.push(state.layerData[i]);
    }
  });

  return (0, _extends14.default)({}, state, {
    layers: newLayers,
    layerData: newLayerDatas
  });
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9yZWR1Y2Vycy92aXMtc3RhdGUtdXBkYXRlcnMuanMiXSwibmFtZXMiOlsibGF5ZXJDb25maWdDaGFuZ2VVcGRhdGVyIiwibGF5ZXJUeXBlQ2hhbmdlVXBkYXRlciIsImxheWVyVmlzdWFsQ2hhbm5lbENoYW5nZVVwZGF0ZXIiLCJsYXllclZpc0NvbmZpZ0NoYW5nZVVwZGF0ZXIiLCJpbnRlcmFjdGlvbkNvbmZpZ0NoYW5nZVVwZGF0ZXIiLCJzZXRGaWx0ZXJVcGRhdGVyIiwiYWRkRGVmYXVsdExheWVycyIsImFkZERlZmF1bHRUb29sdGlwcyIsInVwZGF0ZUFsbExheWVyRG9tYWluRGF0YSIsIklOSVRJQUxfVklTX1NUQVRFIiwibGF5ZXJzIiwibGF5ZXJEYXRhIiwibGF5ZXJUb0JlTWVyZ2VkIiwibGF5ZXJPcmRlciIsImZpbHRlcnMiLCJmaWx0ZXJUb0JlTWVyZ2VkIiwiZGF0YXNldHMiLCJlZGl0aW5nRGF0YXNldCIsInVuZGVmaW5lZCIsImludGVyYWN0aW9uQ29uZmlnIiwiaW50ZXJhY3Rpb25Ub0JlTWVyZ2VkIiwibGF5ZXJCbGVuZGluZyIsImhvdmVySW5mbyIsImNsaWNrZWQiLCJmaWxlTG9hZGluZyIsImZpbGVMb2FkaW5nRXJyIiwic3BsaXRNYXBzIiwibGF5ZXJDbGFzc2VzIiwiTGF5ZXJDbGFzc2VzIiwidXBkYXRlU3RhdGVXaXRoTGF5ZXJBbmREYXRhIiwic3RhdGUiLCJsYXllciIsImlkeCIsIm1hcCIsImx5ciIsImkiLCJkIiwiYWN0aW9uIiwib2xkTGF5ZXIiLCJmaW5kSW5kZXgiLCJsIiwiaWQiLCJwcm9wcyIsIk9iamVjdCIsImtleXMiLCJuZXdDb25maWciLCJuZXdMYXllciIsInVwZGF0ZUxheWVyQ29uZmlnIiwic2hvdWxkQ2FsY3VsYXRlTGF5ZXJEYXRhIiwib2xkTGF5ZXJEYXRhIiwic2FtZURhdGEiLCJuZXdTdGF0ZSIsInRvZ2dsZUxheWVyRnJvbVNwbGl0TWFwcyIsIm5ld1R5cGUiLCJvbGRJZCIsIkNvbnNvbGUiLCJlcnJvciIsImFzc2lnbkNvbmZpZ1RvTGF5ZXIiLCJjb25maWciLCJ2aXNDb25maWdTZXR0aW5ncyIsImRhdGFJZCIsImRhdGFzZXQiLCJ1cGRhdGVMYXllckRvbWFpbiIsInNldHRpbmdzIiwib2xkTGF5ZXJNYXAiLCJvdGhlckxheWVycyIsImNoYW5uZWwiLCJ1cGRhdGVMYXllclZpc3VhbENoYW5uZWwiLCJuZXdWaXNDb25maWciLCJ2aXNDb25maWciLCJlbmFibGVkIiwiZm9yRWFjaCIsImsiLCJwcm9wIiwidmFsdWUiLCJuZXdGaWx0ZXIiLCJmaWVsZHMiLCJhbGxEYXRhIiwiZmllbGRJZHgiLCJmIiwibmFtZSIsImZpZWxkIiwiZmlsdGVyUHJvcCIsImZyZWV6ZSIsImVubGFyZ2VkRmlsdGVySWR4IiwiZW5sYXJnZWQiLCJzZXRGaWx0ZXJQbG90VXBkYXRlciIsIm5ld1Byb3AiLCJwbG90VHlwZSIsImFkZEZpbHRlclVwZGF0ZXIiLCJ0b2dnbGVGaWx0ZXJBbmltYXRpb25VcGRhdGVyIiwiaXNBbmltYXRpbmciLCJ1cGRhdGVBbmltYXRpb25TcGVlZFVwZGF0ZXIiLCJzcGVlZCIsImVubGFyZ2VGaWx0ZXJVcGRhdGVyIiwiaXNFbmxhcmdlZCIsInJlbW92ZUZpbHRlclVwZGF0ZXIiLCJuZXdGaWx0ZXJzIiwic2xpY2UiLCJsZW5ndGgiLCJhZGRMYXllclVwZGF0ZXIiLCJkZWZhdWx0RGF0YXNldCIsIkxheWVyIiwiaXNWaXNpYmxlIiwiaXNDb25maWdBY3RpdmUiLCJhZGROZXdMYXllcnNUb1NwbGl0TWFwIiwicmVtb3ZlTGF5ZXJVcGRhdGVyIiwibGF5ZXJUb1JlbW92ZSIsIm5ld01hcHMiLCJyZW1vdmVMYXllckZyb21TcGxpdE1hcHMiLCJmaWx0ZXIiLCJwaWQiLCJpc0xheWVySG92ZXJlZCIsInJlb3JkZXJMYXllclVwZGF0ZXIiLCJvcmRlciIsInJlbW92ZURhdGFzZXRVcGRhdGVyIiwiZGF0YXNldEtleSIsImtleSIsIm5ld0RhdGFzZXRzIiwiaW5kZXhlcyIsInJlZHVjZSIsImxpc3RPZkluZGV4ZXMiLCJpbmRleCIsInB1c2giLCJjdXJyZW50U3RhdGUiLCJpbmRleENvdW50ZXIiLCJjdXJyZW50SW5kZXgiLCJ0b29sdGlwIiwiZmllbGRzVG9TaG93IiwidXBkYXRlTGF5ZXJCbGVuZGluZ1VwZGF0ZXIiLCJtb2RlIiwic2hvd0RhdGFzZXRUYWJsZVVwZGF0ZXIiLCJyZXNldE1hcENvbmZpZ1Zpc1N0YXRlVXBkYXRlciIsImluaXRpYWxTdGF0ZSIsInJlY2VpdmVNYXBDb25maWdVcGRhdGVyIiwicGF5bG9hZCIsInZpc1N0YXRlIiwicmVzZXRTdGF0ZSIsIm1lcmdlZFN0YXRlIiwibGF5ZXJIb3ZlclVwZGF0ZXIiLCJpbmZvIiwibGF5ZXJDbGlja1VwZGF0ZXIiLCJwaWNrZWQiLCJtYXBDbGlja1VwZGF0ZXIiLCJ0b2dnbGVTcGxpdE1hcFVwZGF0ZXIiLCJjb21wdXRlU3BsaXRNYXBMYXllcnMiLCJjbG9zZVNwZWNpZmljTWFwQXRJbmRleCIsInNldFZpc2libGVMYXllcnNGb3JNYXBVcGRhdGVyIiwibWFwSW5kZXgiLCJsYXllcklkcyIsIm5ld0xheWVycyIsImN1cnJlbnRMYXllcnMiLCJpbmNsdWRlcyIsInRvZ2dsZUxheWVyRm9yTWFwVXBkYXRlciIsIm1hcFNldHRpbmdzIiwibGF5ZXJJZCIsIm5ld1NwbGl0TWFwcyIsInVwZGF0ZVZpc0RhdGFVcGRhdGVyIiwiQXJyYXkiLCJpc0FycmF5IiwibmV3RGF0ZUVudHJpZXMiLCJhY2N1IiwiZGF0YSIsInN0YXRlV2l0aE5ld0RhdGEiLCJ0b29sdGlwRmllbGRzIiwiZ2VuZXJhdGVMYXllck1ldGFGb3JTcGxpdFZpZXdzIiwiaXNBdmFpbGFibGUiLCJtYXBMYXllcnMiLCJjdXJyZW50TGF5ZXIiLCJfIiwiaW5kZXhUb1JldHJpZXZlIiwibWV0YVNldHRpbmdzIiwibG9hZEZpbGVzVXBkYXRlciIsImZpbGVzIiwiZmlsZXNUb0xvYWQiLCJmaWxlQmxvYiIsImxhYmVsIiwic2l6ZSIsImhhbmRsZXIiLCJsb2FkRmlsZVRhc2tzIiwiVGFzayIsImFsbCIsIkxPQURfRklMRV9UQVNLIiwiYmltYXAiLCJyZXN1bHRzIiwiYyIsImNvbmNhdCIsIm9wdGlvbnMiLCJjZW50ZXJNYXAiLCJsb2FkRmlsZXNFcnJVcGRhdGVyIiwiZGVmYXVsdExheWVycyIsInZhbHVlcyIsImRhdGFJZHMiLCJuZXdMYXllckRhdGFzIiwiZml4ZWREb21haW4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1FBMkhnQkEsd0IsR0FBQUEsd0I7UUE0QkFDLHNCLEdBQUFBLHNCO1FBOENBQywrQixHQUFBQSwrQjtRQWlCQUMsMkIsR0FBQUEsMkI7UUE0QkFDLDhCLEdBQUFBLDhCO1FBdUJBQyxnQixHQUFBQSxnQjtRQTJzQkFDLGdCLEdBQUFBLGdCO1FBMEJBQyxrQixHQUFBQSxrQjtRQTZCQUMsd0IsR0FBQUEsd0I7O0FBdi9CaEI7O0FBQ0E7O0FBQ0E7O0FBR0E7O0FBR0E7O0FBQ0E7O0FBR0E7O0FBQ0E7O0FBRUE7O0FBT0E7O0FBRUE7O0FBS0E7O0FBRUE7O0FBT0E7Ozs7QUFFQTtBQUNBOzs7QUFyQ0E7QUFzQ0E7O0FBL0JBOzs7QUFKQTtBQTNCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUE4Q08sSUFBTUMsZ0RBQW9CO0FBQy9CO0FBQ0FDLFVBQVEsRUFGdUI7QUFHL0JDLGFBQVcsRUFIb0I7QUFJL0JDLG1CQUFpQixFQUpjO0FBSy9CQyxjQUFZLEVBTG1COztBQU8vQjtBQUNBQyxXQUFTLEVBUnNCO0FBUy9CQyxvQkFBa0IsRUFUYTs7QUFXL0I7QUFDQUMsWUFBVSxFQVpxQjtBQWEvQkMsa0JBQWdCQyxTQWJlOztBQWUvQkMscUJBQW1CLDhDQWZZO0FBZ0IvQkMseUJBQXVCRixTQWhCUTs7QUFrQi9CRyxpQkFBZSxRQWxCZ0I7QUFtQi9CQyxhQUFXSixTQW5Cb0I7QUFvQi9CSyxXQUFTTCxTQXBCc0I7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eUIsRUFHekJBLE1BQU1uQixTQUFOLENBQWdCd0IsQ0FBaEIsQ0FIeUIsQ0FWMkM7QUFBQSxVQVUvRHhCLFNBVitELHdCQVUvREEsU0FWK0Q7QUFBQSxVQVVwRG9CLEtBVm9ELHdCQVVwREEsS0FWb0Q7O0FBZ0J0RXVILGdCQUFVM0IsSUFBVixDQUFlNUYsS0FBZjtBQUNBa0ssb0JBQWN0RSxJQUFkLENBQW1CaEgsU0FBbkI7QUFDRCxLQWxCRCxNQWtCTztBQUNMMkksZ0JBQVUzQixJQUFWLENBQWVyRixRQUFmO0FBQ0EySixvQkFBY3RFLElBQWQsQ0FBbUI3RixNQUFNbkIsU0FBTixDQUFnQndCLENBQWhCLENBQW5CO0FBQ0Q7QUFDRixHQXZCRDs7QUF5QkEscUNBQ0tMLEtBREw7QUFFRXBCLFlBQVE0SSxTQUZWO0FBR0UzSSxlQUFXc0w7QUFIYjtBQUtEIiwiZmlsZSI6InZpcy1zdGF0ZS11cGRhdGVycy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgMjAxOCBVYmVyIFRlY2hub2xvZ2llcywgSW5jLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbi8vIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbi8vIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbi8vIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbi8vIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuLy8gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuLy8gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4vLyBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbi8vIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbi8vIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4vLyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4vLyBUSEUgU09GVFdBUkUuXG5cbmltcG9ydCB7Y29uc29sZSBhcyBDb25zb2xlfSBmcm9tICdnbG9iYWwvd2luZG93JztcbmltcG9ydCB7VGFzaywgd2l0aFRhc2t9IGZyb20gJ3JlYWN0LXBhbG0nO1xuaW1wb3J0IHtkaXNhYmxlU3RhY2tDYXB0dXJpbmd9IGZyb20gJ3JlYWN0LXBhbG0vdGFza3MnO1xuXG4vLyBUYXNrc1xuaW1wb3J0IHtMT0FEX0ZJTEVfVEFTS30gZnJvbSAndGFza3MvdGFza3MnO1xuXG4vLyBBY3Rpb25zXG5pbXBvcnQge2xvYWRGaWxlc0Vycn0gZnJvbSAnYWN0aW9ucy92aXMtc3RhdGUtYWN0aW9ucyc7XG5pbXBvcnQge2FkZERhdGFUb01hcH0gZnJvbSAnYWN0aW9ucyc7XG5cbi8vIFV0aWxzXG5pbXBvcnQge2dldERlZmF1bHRJbnRlcmFjdGlvbn0gZnJvbSAndXRpbHMvaW50ZXJhY3Rpb24tdXRpbHMnO1xuaW1wb3J0IHtnZW5lcmF0ZUhhc2hJZH0gZnJvbSAndXRpbHMvdXRpbHMnO1xuaW1wb3J0IHtmaW5kRmllbGRzVG9TaG93fSBmcm9tICd1dGlscy9pbnRlcmFjdGlvbi11dGlscyc7XG5pbXBvcnQge1xuICBnZXREZWZhdWx0RmlsdGVyLFxuICBnZXRGaWx0ZXJQcm9wcyxcbiAgZ2V0RmlsdGVyUGxvdCxcbiAgZ2V0RGVmYXVsdEZpbHRlclBsb3RUeXBlLFxuICBmaWx0ZXJEYXRhXG59IGZyb20gJ3V0aWxzL2ZpbHRlci11dGlscyc7XG5pbXBvcnQge2NyZWF0ZU5ld0RhdGFFbnRyeX0gZnJvbSAndXRpbHMvZGF0YXNldC11dGlscyc7XG5cbmltcG9ydCB7XG4gIGZpbmREZWZhdWx0TGF5ZXIsXG4gIGNhbGN1bGF0ZUxheWVyRGF0YVxufSBmcm9tICd1dGlscy9sYXllci11dGlscy9sYXllci11dGlscyc7XG5cbmltcG9ydCB7Z2V0RmlsZUhhbmRsZXJ9IGZyb20gJ3Byb2Nlc3NvcnMvZmlsZS1oYW5kbGVyJztcblxuaW1wb3J0IHtcbiAgbWVyZ2VGaWx0ZXJzLFxuICBtZXJnZUxheWVycyxcbiAgbWVyZ2VJbnRlcmFjdGlvbnMsXG4gIG1lcmdlTGF5ZXJCbGVuZGluZ1xufSBmcm9tICcuL3Zpcy1zdGF0ZS1tZXJnZXInO1xuXG5pbXBvcnQge0xheWVyQ2xhc3NlcywgTGF5ZXJ9IGZyb20gJ2xheWVycyc7XG5cbi8vIHJlYWN0LXBhbG1cbi8vIGRpc2FibGUgY2FwdHVyZSBleGNlcHRpb24gZm9yIHJlYWN0LXBhbG0gY2FsbCB0byB3aXRoVGFza3NcbmRpc2FibGVTdGFja0NhcHR1cmluZygpO1xuXG5leHBvcnQgY29uc3QgSU5JVElBTF9WSVNfU1RBVEUgPSB7XG4gIC8vIGxheWVyc1xuICBsYXllcnM6IFtdLFxuICBsYXllckRhdGE6IFtdLFxuICBsYXllclRvQmVNZXJnZWQ6IFtdLFxuICBsYXllck9yZGVyOiBbXSxcblxuICAvLyBmaWx0ZXJzXG4gIGZpbHRlcnM6IFtdLFxuICBmaWx0ZXJUb0JlTWVyZ2VkOiBbXSxcblxuICAvLyBhIGNvbGxlY3Rpb24gb2YgbXVsdGlwbGUgZGF0YXNldFxuICBkYXRhc2V0czoge30sXG4gIGVkaXRpbmdEYXRhc2V0OiB1bmRlZmluZWQsXG5cbiAgaW50ZXJhY3Rpb25Db25maWc6IGdldERlZmF1bHRJbnRlcmFjdGlvbigpLFxuICBpbnRlcmFjdGlvblRvQmVNZXJnZWQ6IHVuZGVmaW5lZCxcblxuICBsYXllckJsZW5kaW5nOiAnbm9ybWFsJyxcbiAgaG92ZXJJbmZvOiB1bmRlZmluZWQsXG4gIGNsaWNrZWQ6IHVuZGVmaW5lZCxcblxuICBmaWxlTG9hZGluZzogZmFsc2UsXG4gIGZpbGVMb2FkaW5nRXJyOiBudWxsLFxuXG4gIC8vIHRoaXMgaXMgdXNlZCB3aGVuIHVzZXIgc3BsaXQgbWFwc1xuICBzcGxpdE1hcHM6IFtcbiAgICAvLyB0aGlzIHdpbGwgY29udGFpbiBhIGxpc3Qgb2Ygb2JqZWN0cyB0b1xuICAgIC8vIGRlc2NyaWJlIHRoZSBzdGF0ZSBvZiBsYXllciBhdmFpbGFiaWxpdHkgYW5kIHZpc2liaWxpdHkgZm9yIGVhY2ggbWFwXG4gICAgLy8gW1xuICAgIC8vICAge1xuICAgIC8vICAgICBsYXllcnM6IHtcbiAgICAvLyAgICAgICBsYXllcl9pZDoge1xuICAgIC8vICAgICAgICAgaXNBdmFpbGFibGU6IHRydWV8ZmFsc2UgIyB0aGlzIGlzIGRyaXZlbiBieSB0aGUgbGVmdCBoYW5kIHBhbmVsXG4gICAgLy8gICAgICAgICBpc1Zpc2libGU6IHRydWV8ZmFsc2VcbiAgICAvLyAgICAgICB9XG4gICAgLy8gICAgIH1cbiAgICAvLyAgIH1cbiAgICAvLyBdXG4gIF0sXG5cbiAgLy8gZGVmYXVsdHMgbGF5ZXIgY2xhc3Nlc1xuICBsYXllckNsYXNzZXM6IExheWVyQ2xhc3Nlc1xufTtcblxuZnVuY3Rpb24gdXBkYXRlU3RhdGVXaXRoTGF5ZXJBbmREYXRhKHN0YXRlLCB7bGF5ZXJEYXRhLCBsYXllciwgaWR4fSkge1xuICByZXR1cm4ge1xuICAgIC4uLnN0YXRlLFxuICAgIGxheWVyczogc3RhdGUubGF5ZXJzLm1hcCgobHlyLCBpKSA9PiAoaSA9PT0gaWR4ID8gbGF5ZXIgOiBseXIpKSxcbiAgICBsYXllckRhdGE6IGxheWVyRGF0YVxuICAgICAgPyBzdGF0ZS5sYXllckRhdGEubWFwKChkLCBpKSA9PiAoaSA9PT0gaWR4ID8gbGF5ZXJEYXRhIDogZCkpXG4gICAgICA6IHN0YXRlLmxheWVyRGF0YVxuICB9O1xufVxuXG4vKipcbiAqIENhbGxlZCB0byB1cGRhdGUgbGF5ZXIgYmFzZSBjb25maWc6IGRhdGFJZCwgbGFiZWwsIGNvbHVtbiwgaXNWaXNpYmxlXG4gKlxuICovXG5leHBvcnQgZnVuY3Rpb24gbGF5ZXJDb25maWdDaGFuZ2VVcGRhdGVyKHN0YXRlLCBhY3Rpb24pIHtcbiAgY29uc3Qge29sZExheWVyfSA9IGFjdGlvbjtcbiAgY29uc3QgaWR4ID0gc3RhdGUubGF5ZXJzLmZpbmRJbmRleChsID0+IGwuaWQgPT09IG9sZExheWVyLmlkKTtcbiAgY29uc3QgcHJvcHMgPSBPYmplY3Qua2V5cyhhY3Rpb24ubmV3Q29uZmlnKTtcblxuICBjb25zdCBuZXdMYXllciA9IG9sZExheWVyLnVwZGF0ZUxheWVyQ29uZmlnKGFjdGlvbi5uZXdDb25maWcpO1xuICBpZiAobmV3TGF5ZXIuc2hvdWxkQ2FsY3VsYXRlTGF5ZXJEYXRhKHByb3BzKSkge1xuICAgIGNvbnN0IG9sZExheWVyRGF0YSA9IHN0YXRlLmxheWVyRGF0YVtpZHhdO1xuICAgIGNvbnN0IHtsYXllckRhdGEsIGxheWVyfSA9IGNhbGN1bGF0ZUxheWVyRGF0YShcbiAgICAgIG5ld0xheWVyLFxuICAgICAgc3RhdGUsXG4gICAgICBvbGRMYXllckRhdGEsXG4gICAgICB7c2FtZURhdGE6IHRydWV9XG4gICAgKTtcbiAgICByZXR1cm4gdXBkYXRlU3RhdGVXaXRoTGF5ZXJBbmREYXRhKHN0YXRlLCB7bGF5ZXJEYXRhLCBsYXllciwgaWR4fSk7XG4gIH1cblxuICBjb25zdCBuZXdTdGF0ZSA9IHtcbiAgICAuLi5zdGF0ZSxcbiAgICBzcGxpdE1hcHM6XG4gICAgICAnaXNWaXNpYmxlJyBpbiBhY3Rpb24ubmV3Q29uZmlnXG4gICAgICAgID8gdG9nZ2xlTGF5ZXJGcm9tU3BsaXRNYXBzKHN0YXRlLCBuZXdMYXllcilcbiAgICAgICAgOiBzdGF0ZS5zcGxpdE1hcHNcbiAgfTtcblxuICByZXR1cm4gdXBkYXRlU3RhdGVXaXRoTGF5ZXJBbmREYXRhKG5ld1N0YXRlLCB7bGF5ZXI6IG5ld0xheWVyLCBpZHh9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGxheWVyVHlwZUNoYW5nZVVwZGF0ZXIoc3RhdGUsIGFjdGlvbikge1xuICBjb25zdCB7b2xkTGF5ZXIsIG5ld1R5cGV9ID0gYWN0aW9uO1xuICBjb25zdCBvbGRJZCA9IG9sZExheWVyLmlkO1xuICBjb25zdCBpZHggPSBzdGF0ZS5sYXllcnMuZmluZEluZGV4KGwgPT4gbC5pZCA9PT0gb2xkSWQpO1xuXG4gIGlmICghc3RhdGUubGF5ZXJDbGFzc2VzW25ld1R5cGVdKSB7XG4gICAgQ29uc29sZS5lcnJvcihgJHtuZXdUeXBlfSBpcyBub3QgYSB2YWxpZCBsYXllciB0eXBlYCk7XG4gICAgcmV0dXJuIHN0YXRlO1xuICB9XG5cbiAgLy8gZ2V0IGEgbWludCBsYXllciwgd2l0aCBuZXcgaWQgYW5kIHR5cGVcbiAgLy8gYmVjYXVzZSBkZWNrLmdsIHVzZXMgaWQgdG8gbWF0Y2ggYmV0d2VlbiBuZXcgYW5kIG9sZCBsYXllci5cbiAgLy8gSWYgdHlwZSBoYXMgY2hhbmdlZCBidXQgaWQgaXMgdGhlIHNhbWUsIGl0IHdpbGwgYnJlYWtcbiAgY29uc3QgbmV3TGF5ZXIgPSBuZXcgc3RhdGUubGF5ZXJDbGFzc2VzW25ld1R5cGVdKCk7XG5cbiAgbmV3TGF5ZXIuYXNzaWduQ29uZmlnVG9MYXllcihvbGRMYXllci5jb25maWcsIG9sZExheWVyLnZpc0NvbmZpZ1NldHRpbmdzKTtcblxuICBpZiAobmV3TGF5ZXIuY29uZmlnLmRhdGFJZCkge1xuICAgIGNvbnN0IGRhdGFzZXQgPSBzdGF0ZS5kYXRhc2V0c1tuZXdMYXllci5jb25maWcuZGF0YUlkXTtcbiAgICBuZXdMYXllci51cGRhdGVMYXllckRvbWFpbihkYXRhc2V0KTtcbiAgfVxuXG4gIGNvbnN0IHtsYXllckRhdGEsIGxheWVyfSA9IGNhbGN1bGF0ZUxheWVyRGF0YShuZXdMYXllciwgc3RhdGUpO1xuXG4gIGxldCBuZXdTdGF0ZSA9IHN0YXRlO1xuXG4gIC8vIHVwZGF0ZSBzcGxpdE1hcCBsYXllciBpZFxuICBpZiAoc3RhdGUuc3BsaXRNYXBzKSB7XG4gICAgbmV3U3RhdGUgPSB7XG4gICAgICAuLi5zdGF0ZSxcbiAgICAgIHNwbGl0TWFwczogc3RhdGUuc3BsaXRNYXBzLm1hcChzZXR0aW5ncyA9PiB7XG4gICAgICAgIGNvbnN0IHtbb2xkSWRdOiBvbGRMYXllck1hcCwgLi4ub3RoZXJMYXllcnN9ID0gc2V0dGluZ3MubGF5ZXJzO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIC4uLnNldHRpbmdzLFxuICAgICAgICAgIGxheWVyczoge1xuICAgICAgICAgICAgLi4ub3RoZXJMYXllcnMsXG4gICAgICAgICAgICBbbGF5ZXIuaWRdOiBvbGRMYXllck1hcFxuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgIH0pXG4gICAgfTtcbiAgfVxuXG4gIHJldHVybiB1cGRhdGVTdGF0ZVdpdGhMYXllckFuZERhdGEobmV3U3RhdGUsIHtsYXllckRhdGEsIGxheWVyLCBpZHh9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGxheWVyVmlzdWFsQ2hhbm5lbENoYW5nZVVwZGF0ZXIoc3RhdGUsIGFjdGlvbikge1xuICBjb25zdCB7b2xkTGF5ZXIsIG5ld0NvbmZpZywgY2hhbm5lbH0gPSBhY3Rpb247XG4gIGNvbnN0IGRhdGFzZXQgPSBzdGF0ZS5kYXRhc2V0c1tvbGRMYXllci5jb25maWcuZGF0YUlkXTtcblxuICBjb25zdCBpZHggPSBzdGF0ZS5sYXllcnMuZmluZEluZGV4KGwgPT4gbC5pZCA9PT0gb2xkTGF5ZXIuaWQpO1xuICBjb25zdCBuZXdMYXllciA9IG9sZExheWVyLnVwZGF0ZUxheWVyQ29uZmlnKG5ld0NvbmZpZyk7XG5cbiAgbmV3TGF5ZXIudXBkYXRlTGF5ZXJWaXN1YWxDaGFubmVsKGRhdGFzZXQsIGNoYW5uZWwpO1xuXG4gIGNvbnN0IG9sZExheWVyRGF0YSA9IHN0YXRlLmxheWVyRGF0YVtpZHhdO1xuICBjb25zdCB7bGF5ZXJEYXRhLCBsYXllcn0gPSBjYWxjdWxhdGVMYXllckRhdGEobmV3TGF5ZXIsIHN0YXRlLCBvbGRMYXllckRhdGEsIHtcbiAgICBzYW1lRGF0YTogdHJ1ZVxuICB9KTtcblxuICByZXR1cm4gdXBkYXRlU3RhdGVXaXRoTGF5ZXJBbmREYXRhKHN0YXRlLCB7bGF5ZXJEYXRhLCBsYXllciwgaWR4fSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBsYXllclZpc0NvbmZpZ0NoYW5nZVVwZGF0ZXIoc3RhdGUsIGFjdGlvbikge1xuICBjb25zdCB7b2xkTGF5ZXJ9ID0gYWN0aW9uO1xuICBjb25zdCBpZHggPSBzdGF0ZS5sYXllcnMuZmluZEluZGV4KGwgPT4gbC5pZCA9PT0gb2xkTGF5ZXIuaWQpO1xuICBjb25zdCBwcm9wcyA9IE9iamVjdC5rZXlzKGFjdGlvbi5uZXdWaXNDb25maWcpO1xuXG4gIGNvbnN0IG5ld1Zpc0NvbmZpZyA9IHtcbiAgICAuLi5vbGRMYXllci5jb25maWcudmlzQ29uZmlnLFxuICAgIC4uLmFjdGlvbi5uZXdWaXNDb25maWdcbiAgfTtcblxuICBjb25zdCBuZXdMYXllciA9IG9sZExheWVyLnVwZGF0ZUxheWVyQ29uZmlnKHt2aXNDb25maWc6IG5ld1Zpc0NvbmZpZ30pO1xuXG4gIGlmIChuZXdMYXllci5zaG91bGRDYWxjdWxhdGVMYXllckRhdGEocHJvcHMpKSB7XG4gICAgY29uc3Qgb2xkTGF5ZXJEYXRhID0gc3RhdGUubGF5ZXJEYXRhW2lkeF07XG4gICAgY29uc3Qge2xheWVyRGF0YSwgbGF5ZXJ9ID0gY2FsY3VsYXRlTGF5ZXJEYXRhKFxuICAgICAgbmV3TGF5ZXIsXG4gICAgICBzdGF0ZSxcbiAgICAgIG9sZExheWVyRGF0YSxcbiAgICAgIHtzYW1lRGF0YTogdHJ1ZX1cbiAgICApO1xuICAgIHJldHVybiB1cGRhdGVTdGF0ZVdpdGhMYXllckFuZERhdGEoc3RhdGUsIHtsYXllckRhdGEsIGxheWVyLCBpZHh9KTtcbiAgfVxuXG4gIHJldHVybiB1cGRhdGVTdGF0ZVdpdGhMYXllckFuZERhdGEoc3RhdGUsIHtsYXllcjogbmV3TGF5ZXIsIGlkeH0pO1xufVxuXG4vKiBlc2xpbnQtZW5hYmxlIG1heC1zdGF0ZW1lbnRzICovXG5cbmV4cG9ydCBmdW5jdGlvbiBpbnRlcmFjdGlvbkNvbmZpZ0NoYW5nZVVwZGF0ZXIoc3RhdGUsIGFjdGlvbikge1xuICBjb25zdCB7Y29uZmlnfSA9IGFjdGlvbjtcblxuICBjb25zdCBpbnRlcmFjdGlvbkNvbmZpZyA9IHtcbiAgICAuLi5zdGF0ZS5pbnRlcmFjdGlvbkNvbmZpZyxcbiAgICAuLi57W2NvbmZpZy5pZF06IGNvbmZpZ31cbiAgfTtcblxuICBpZiAoY29uZmlnLmVuYWJsZWQgJiYgIXN0YXRlLmludGVyYWN0aW9uQ29uZmlnW2NvbmZpZy5pZF0uZW5hYmxlZCkge1xuICAgIC8vIG9ubHkgZW5hYmxlIG9uZSBpbnRlcmFjdGlvbiBhdCBhIHRpbWVcbiAgICBPYmplY3Qua2V5cyhpbnRlcmFjdGlvbkNvbmZpZykuZm9yRWFjaChrID0+IHtcbiAgICAgIGlmIChrICE9PSBjb25maWcuaWQpIHtcbiAgICAgICAgaW50ZXJhY3Rpb25Db25maWdba10gPSB7Li4uaW50ZXJhY3Rpb25Db25maWdba10sIGVuYWJsZWQ6IGZhbHNlfTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgLi4uc3RhdGUsXG4gICAgaW50ZXJhY3Rpb25Db25maWdcbiAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNldEZpbHRlclVwZGF0ZXIoc3RhdGUsIGFjdGlvbikge1xuICBjb25zdCB7aWR4LCBwcm9wLCB2YWx1ZX0gPSBhY3Rpb247XG4gIGxldCBuZXdTdGF0ZSA9IHN0YXRlO1xuICBsZXQgbmV3RmlsdGVyID0ge1xuICAgIC4uLnN0YXRlLmZpbHRlcnNbaWR4XSxcbiAgICBbcHJvcF06IHZhbHVlXG4gIH07XG5cbiAgY29uc3Qge2RhdGFJZH0gPSBuZXdGaWx0ZXI7XG4gIGlmICghZGF0YUlkKSB7XG4gICAgcmV0dXJuIHN0YXRlO1xuICB9XG4gIGNvbnN0IHtmaWVsZHMsIGFsbERhdGF9ID0gc3RhdGUuZGF0YXNldHNbZGF0YUlkXTtcblxuICBzd2l0Y2ggKHByb3ApIHtcbiAgICBjYXNlICdkYXRhSWQnOlxuICAgICAgLy8gaWYgdHJ5aW5nIHRvIHVwZGF0ZSBmaWx0ZXIgZGF0YUlkLiBjcmVhdGUgYW4gZW1wdHkgbmV3IGZpbHRlclxuICAgICAgbmV3RmlsdGVyID0gZ2V0RGVmYXVsdEZpbHRlcihkYXRhSWQpO1xuICAgICAgYnJlYWs7XG5cbiAgICBjYXNlICduYW1lJzpcbiAgICAgIC8vIGZpbmQgdGhlIGZpZWxkXG4gICAgICBjb25zdCBmaWVsZElkeCA9IGZpZWxkcy5maW5kSW5kZXgoZiA9PiBmLm5hbWUgPT09IHZhbHVlKTtcbiAgICAgIGxldCBmaWVsZCA9IGZpZWxkc1tmaWVsZElkeF07XG5cbiAgICAgIGlmICghZmllbGQuZmlsdGVyUHJvcCkge1xuICAgICAgICAvLyBnZXQgZmlsdGVyIGRvbWFpbiBmcm9tIGZpZWxkXG4gICAgICAgIC8vIHNhdmUgZmlsdGVyUHJvcHM6IHtkb21haW4sIHN0ZXBzLCB2YWx1ZX0gdG8gZmllbGQsIGF2b2lkIHJlY2FsY3VsYXRlXG4gICAgICAgIGZpZWxkID0ge1xuICAgICAgICAgIC4uLmZpZWxkLFxuICAgICAgICAgIGZpbHRlclByb3A6IGdldEZpbHRlclByb3BzKGFsbERhdGEsIGZpZWxkKVxuICAgICAgICB9O1xuICAgICAgfVxuXG4gICAgICBuZXdGaWx0ZXIgPSB7XG4gICAgICAgIC4uLm5ld0ZpbHRlcixcbiAgICAgICAgLi4uZmllbGQuZmlsdGVyUHJvcCxcbiAgICAgICAgbmFtZTogZmllbGQubmFtZSxcbiAgICAgICAgLy8gY2FuJ3QgZWRpdCBkYXRhSWQgb25jZSBuYW1lIGlzIHNlbGVjdGVkXG4gICAgICAgIGZyZWV6ZTogdHJ1ZSxcbiAgICAgICAgZmllbGRJZHhcbiAgICAgIH07XG4gICAgICBjb25zdCBlbmxhcmdlZEZpbHRlcklkeCA9IHN0YXRlLmZpbHRlcnMuZmluZEluZGV4KGYgPT4gZi5lbmxhcmdlZCk7XG4gICAgICBpZiAoZW5sYXJnZWRGaWx0ZXJJZHggPiAtMSAmJiBlbmxhcmdlZEZpbHRlcklkeCAhPT0gaWR4KSB7XG4gICAgICAgIC8vIHRoZXJlIHNob3VsZCBiZSBvbmx5IG9uZSBlbmxhcmdlZCBmaWx0ZXJcbiAgICAgICAgbmV3RmlsdGVyLmVubGFyZ2VkID0gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIG5ld1N0YXRlID0ge1xuICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgZGF0YXNldHM6IHtcbiAgICAgICAgICAuLi5zdGF0ZS5kYXRhc2V0cyxcbiAgICAgICAgICBbZGF0YUlkXToge1xuICAgICAgICAgICAgLi4uc3RhdGUuZGF0YXNldHNbZGF0YUlkXSxcbiAgICAgICAgICAgIGZpZWxkczogZmllbGRzLm1hcCgoZCwgaSkgPT4gKGkgPT09IGZpZWxkSWR4ID8gZmllbGQgOiBkKSlcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgICBicmVhaztcbiAgICBjYXNlICd2YWx1ZSc6XG4gICAgZGVmYXVsdDpcbiAgICAgIGJyZWFrO1xuICB9XG5cbiAgLy8gc2F2ZSBuZXcgZmlsdGVycyB0byBuZXdTdGF0ZVxuICBuZXdTdGF0ZSA9IHtcbiAgICAuLi5uZXdTdGF0ZSxcbiAgICBmaWx0ZXJzOiBzdGF0ZS5maWx0ZXJzLm1hcCgoZiwgaSkgPT4gKGkgPT09IGlkeCA/IG5ld0ZpbHRlciA6IGYpKVxuICB9O1xuXG4gIC8vIGZpbHRlciBkYXRhXG4gIG5ld1N0YXRlID0ge1xuICAgIC4uLm5ld1N0YXRlLFxuICAgIGRhdGFzZXRzOiB7XG4gICAgICAuLi5uZXdTdGF0ZS5kYXRhc2V0cyxcbiAgICAgIFtkYXRhSWRdOiB7XG4gICAgICAgIC4uLm5ld1N0YXRlLmRhdGFzZXRzW2RhdGFJZF0sXG4gICAgICAgIC4uLmZpbHRlckRhdGEoYWxsRGF0YSwgZGF0YUlkLCBuZXdTdGF0ZS5maWx0ZXJzKVxuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICBuZXdTdGF0ZSA9IHVwZGF0ZUFsbExheWVyRG9tYWluRGF0YShuZXdTdGF0ZSwgZGF0YUlkLCBuZXdGaWx0ZXIpO1xuXG4gIHJldHVybiBuZXdTdGF0ZTtcbn1cblxuZXhwb3J0IGNvbnN0IHNldEZpbHRlclBsb3RVcGRhdGVyID0gKHN0YXRlLCB7aWR4LCBuZXdQcm9wfSkgPT4ge1xuICBsZXQgbmV3RmlsdGVyID0gey4uLnN0YXRlLmZpbHRlcnNbaWR4XSwgLi4ubmV3UHJvcH07XG4gIGNvbnN0IHByb3AgPSBPYmplY3Qua2V5cyhuZXdQcm9wKVswXTtcbiAgaWYgKHByb3AgPT09ICd5QXhpcycpIHtcbiAgICBjb25zdCBwbG90VHlwZSA9IGdldERlZmF1bHRGaWx0ZXJQbG90VHlwZShuZXdGaWx0ZXIpO1xuXG4gICAgaWYgKHBsb3RUeXBlKSB7XG4gICAgICBuZXdGaWx0ZXIgPSB7XG4gICAgICAgIC4uLm5ld0ZpbHRlcixcbiAgICAgICAgLi4uZ2V0RmlsdGVyUGxvdChcbiAgICAgICAgICB7Li4ubmV3RmlsdGVyLCBwbG90VHlwZX0sXG4gICAgICAgICAgc3RhdGUuZGF0YXNldHNbbmV3RmlsdGVyLmRhdGFJZF0uYWxsRGF0YVxuICAgICAgICApLFxuICAgICAgICBwbG90VHlwZVxuICAgICAgfTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4ge1xuICAgIC4uLnN0YXRlLFxuICAgIGZpbHRlcnM6IHN0YXRlLmZpbHRlcnMubWFwKChmLCBpKSA9PiAoaSA9PT0gaWR4ID8gbmV3RmlsdGVyIDogZikpXG4gIH07XG59O1xuXG5leHBvcnQgY29uc3QgYWRkRmlsdGVyVXBkYXRlciA9IChzdGF0ZSwgYWN0aW9uKSA9PlxuICAhYWN0aW9uLmRhdGFJZFxuICAgID8gc3RhdGVcbiAgICA6IHtcbiAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgIGZpbHRlcnM6IFsuLi5zdGF0ZS5maWx0ZXJzLCBnZXREZWZhdWx0RmlsdGVyKGFjdGlvbi5kYXRhSWQpXVxuICAgICAgfTtcblxuZXhwb3J0IGNvbnN0IHRvZ2dsZUZpbHRlckFuaW1hdGlvblVwZGF0ZXIgPSAoc3RhdGUsIGFjdGlvbikgPT4gKHtcbiAgLi4uc3RhdGUsXG4gIGZpbHRlcnM6IHN0YXRlLmZpbHRlcnMubWFwKFxuICAgIChmLCBpKSA9PiAoaSA9PT0gYWN0aW9uLmlkeCA/IHsuLi5mLCBpc0FuaW1hdGluZzogIWYuaXNBbmltYXRpbmd9IDogZilcbiAgKVxufSk7XG5cbmV4cG9ydCBjb25zdCB1cGRhdGVBbmltYXRpb25TcGVlZFVwZGF0ZXIgPSAoc3RhdGUsIGFjdGlvbikgPT4gKHtcbiAgLi4uc3RhdGUsXG4gIGZpbHRlcnM6IHN0YXRlLmZpbHRlcnMubWFwKFxuICAgIChmLCBpKSA9PiAoaSA9PT0gYWN0aW9uLmlkeCA/IHsuLi5mLCBzcGVlZDogYWN0aW9uLnNwZWVkfSA6IGYpXG4gIClcbn0pO1xuXG5leHBvcnQgY29uc3QgZW5sYXJnZUZpbHRlclVwZGF0ZXIgPSAoc3RhdGUsIGFjdGlvbikgPT4ge1xuICBjb25zdCBpc0VubGFyZ2VkID0gc3RhdGUuZmlsdGVyc1thY3Rpb24uaWR4XS5lbmxhcmdlZDtcblxuICByZXR1cm4ge1xuICAgIC4uLnN0YXRlLFxuICAgIGZpbHRlcnM6IHN0YXRlLmZpbHRlcnMubWFwKChmLCBpKSA9PiB7XG4gICAgICBmLmVubGFyZ2VkID0gIWlzRW5sYXJnZWQgJiYgaSA9PT0gYWN0aW9uLmlkeDtcbiAgICAgIHJldHVybiBmO1xuICAgIH0pXG4gIH07XG59O1xuXG5leHBvcnQgY29uc3QgcmVtb3ZlRmlsdGVyVXBkYXRlciA9IChzdGF0ZSwgYWN0aW9uKSA9PiB7XG4gIGNvbnN0IHtpZHh9ID0gYWN0aW9uO1xuICBjb25zdCB7ZGF0YUlkfSA9IHN0YXRlLmZpbHRlcnNbaWR4XTtcblxuICBjb25zdCBuZXdGaWx0ZXJzID0gW1xuICAgIC4uLnN0YXRlLmZpbHRlcnMuc2xpY2UoMCwgaWR4KSxcbiAgICAuLi5zdGF0ZS5maWx0ZXJzLnNsaWNlKGlkeCArIDEsIHN0YXRlLmZpbHRlcnMubGVuZ3RoKVxuICBdO1xuXG4gIGNvbnN0IG5ld1N0YXRlID0ge1xuICAgIC4uLnN0YXRlLFxuICAgIGRhdGFzZXRzOiB7XG4gICAgICAuLi5zdGF0ZS5kYXRhc2V0cyxcbiAgICAgIFtkYXRhSWRdOiB7XG4gICAgICAgIC4uLnN0YXRlLmRhdGFzZXRzW2RhdGFJZF0sXG4gICAgICAgIC4uLmZpbHRlckRhdGEoc3RhdGUuZGF0YXNldHNbZGF0YUlkXS5hbGxEYXRhLCBkYXRhSWQsIG5ld0ZpbHRlcnMpXG4gICAgICB9XG4gICAgfSxcbiAgICBmaWx0ZXJzOiBuZXdGaWx0ZXJzXG4gIH07XG5cbiAgcmV0dXJuIHVwZGF0ZUFsbExheWVyRG9tYWluRGF0YShuZXdTdGF0ZSwgZGF0YUlkKTtcbn07XG5cbmV4cG9ydCBjb25zdCBhZGRMYXllclVwZGF0ZXIgPSAoc3RhdGUsIGFjdGlvbikgPT4ge1xuICBjb25zdCBkZWZhdWx0RGF0YXNldCA9IE9iamVjdC5rZXlzKHN0YXRlLmRhdGFzZXRzKVswXTtcbiAgY29uc3QgbmV3TGF5ZXIgPSBuZXcgTGF5ZXIoe1xuICAgIGlzVmlzaWJsZTogdHJ1ZSxcbiAgICBpc0NvbmZpZ0FjdGl2ZTogdHJ1ZSxcbiAgICBkYXRhSWQ6IGRlZmF1bHREYXRhc2V0LFxuICAgIC4uLmFjdGlvbi5wcm9wc1xuICB9KTtcblxuICByZXR1cm4ge1xuICAgIC4uLnN0YXRlLFxuICAgIGxheWVyczogWy4uLnN0YXRlLmxheWVycywgbmV3TGF5ZXJdLFxuICAgIGxheWVyRGF0YTogWy4uLnN0YXRlLmxheWVyRGF0YSwge31dLFxuICAgIGxheWVyT3JkZXI6IFsuLi5zdGF0ZS5sYXllck9yZGVyLCBzdGF0ZS5sYXllck9yZGVyLmxlbmd0aF0sXG4gICAgc3BsaXRNYXBzOiBhZGROZXdMYXllcnNUb1NwbGl0TWFwKHN0YXRlLnNwbGl0TWFwcywgbmV3TGF5ZXIpXG4gIH07XG59O1xuXG5leHBvcnQgY29uc3QgcmVtb3ZlTGF5ZXJVcGRhdGVyID0gKHN0YXRlLCB7aWR4fSkgPT4ge1xuICBjb25zdCB7bGF5ZXJzLCBsYXllckRhdGEsIGNsaWNrZWQsIGhvdmVySW5mb30gPSBzdGF0ZTtcbiAgY29uc3QgbGF5ZXJUb1JlbW92ZSA9IHN0YXRlLmxheWVyc1tpZHhdO1xuICBjb25zdCBuZXdNYXBzID0gcmVtb3ZlTGF5ZXJGcm9tU3BsaXRNYXBzKHN0YXRlLCBsYXllclRvUmVtb3ZlKTtcblxuICByZXR1cm4ge1xuICAgIC4uLnN0YXRlLFxuICAgIGxheWVyczogWy4uLmxheWVycy5zbGljZSgwLCBpZHgpLCAuLi5sYXllcnMuc2xpY2UoaWR4ICsgMSwgbGF5ZXJzLmxlbmd0aCldLFxuICAgIGxheWVyRGF0YTogW1xuICAgICAgLi4ubGF5ZXJEYXRhLnNsaWNlKDAsIGlkeCksXG4gICAgICAuLi5sYXllckRhdGEuc2xpY2UoaWR4ICsgMSwgbGF5ZXJEYXRhLmxlbmd0aClcbiAgICBdLFxuICAgIGxheWVyT3JkZXI6IHN0YXRlLmxheWVyT3JkZXJcbiAgICAgIC5maWx0ZXIoaSA9PiBpICE9PSBpZHgpXG4gICAgICAubWFwKHBpZCA9PiAocGlkID4gaWR4ID8gcGlkIC0gMSA6IHBpZCkpLFxuICAgIGNsaWNrZWQ6IGxheWVyVG9SZW1vdmUuaXNMYXllckhvdmVyZWQoY2xpY2tlZCkgPyB1bmRlZmluZWQgOiBjbGlja2VkLFxuICAgIGhvdmVySW5mbzogbGF5ZXJUb1JlbW92ZS5pc0xheWVySG92ZXJlZChob3ZlckluZm8pID8gdW5kZWZpbmVkIDogaG92ZXJJbmZvLFxuICAgIHNwbGl0TWFwczogbmV3TWFwc1xuICB9O1xufTtcblxuZXhwb3J0IGNvbnN0IHJlb3JkZXJMYXllclVwZGF0ZXIgPSAoc3RhdGUsIHtvcmRlcn0pID0+ICh7XG4gIC4uLnN0YXRlLFxuICBsYXllck9yZGVyOiBvcmRlclxufSk7XG5cbmV4cG9ydCBjb25zdCByZW1vdmVEYXRhc2V0VXBkYXRlciA9IChzdGF0ZSwgYWN0aW9uKSA9PiB7XG4gIC8vIGV4dHJhY3QgZGF0YXNldCBrZXlcbiAgY29uc3Qge2tleTogZGF0YXNldEtleX0gPSBhY3Rpb247XG4gIGNvbnN0IHtkYXRhc2V0c30gPSBzdGF0ZTtcblxuICAvLyBjaGVjayBpZiBkYXRhc2V0IGlzIHByZXNlbnRcbiAgaWYgKCFkYXRhc2V0c1tkYXRhc2V0S2V5XSkge1xuICAgIHJldHVybiBzdGF0ZTtcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlIG5vLXVudXNlZC12YXJzICovXG4gIGNvbnN0IHtcbiAgICBsYXllcnMsXG4gICAgZGF0YXNldHM6IHtbZGF0YXNldEtleV06IGRhdGFzZXQsIC4uLm5ld0RhdGFzZXRzfVxuICB9ID0gc3RhdGU7XG4gIC8qIGVzbGludC1lbmFibGUgbm8tdW51c2VkLXZhcnMgKi9cblxuICBjb25zdCBpbmRleGVzID0gbGF5ZXJzLnJlZHVjZSgobGlzdE9mSW5kZXhlcywgbGF5ZXIsIGluZGV4KSA9PiB7XG4gICAgaWYgKGxheWVyLmNvbmZpZy5kYXRhSWQgPT09IGRhdGFzZXRLZXkpIHtcbiAgICAgIGxpc3RPZkluZGV4ZXMucHVzaChpbmRleCk7XG4gICAgfVxuICAgIHJldHVybiBsaXN0T2ZJbmRleGVzO1xuICB9LCBbXSk7XG5cbiAgLy8gcmVtb3ZlIGxheWVycyBhbmQgZGF0YXNldHNcbiAgY29uc3Qge25ld1N0YXRlfSA9IGluZGV4ZXMucmVkdWNlKFxuICAgICh7bmV3U3RhdGU6IGN1cnJlbnRTdGF0ZSwgaW5kZXhDb3VudGVyfSwgaWR4KSA9PiB7XG4gICAgICBjb25zdCBjdXJyZW50SW5kZXggPSBpZHggLSBpbmRleENvdW50ZXI7XG4gICAgICBjdXJyZW50U3RhdGUgPSByZW1vdmVMYXllclVwZGF0ZXIoY3VycmVudFN0YXRlLCB7aWR4OiBjdXJyZW50SW5kZXh9KTtcbiAgICAgIGluZGV4Q291bnRlcisrO1xuICAgICAgcmV0dXJuIHtuZXdTdGF0ZTogY3VycmVudFN0YXRlLCBpbmRleENvdW50ZXJ9O1xuICAgIH0sXG4gICAge25ld1N0YXRlOiB7Li4uc3RhdGUsIGRhdGFzZXRzOiBuZXdEYXRhc2V0c30sIGluZGV4Q291bnRlcjogMH1cbiAgKTtcblxuICAvLyByZW1vdmUgZmlsdGVyc1xuICBjb25zdCBmaWx0ZXJzID0gc3RhdGUuZmlsdGVycy5maWx0ZXIoZmlsdGVyID0+IGZpbHRlci5kYXRhSWQgIT09IGRhdGFzZXRLZXkpO1xuXG4gIC8vIHVwZGF0ZSBpbnRlcmFjdGlvbkNvbmZpZ1xuICBsZXQge2ludGVyYWN0aW9uQ29uZmlnfSA9IHN0YXRlO1xuICBjb25zdCB7dG9vbHRpcH0gPSBpbnRlcmFjdGlvbkNvbmZpZztcbiAgaWYgKHRvb2x0aXApIHtcbiAgICBjb25zdCB7Y29uZmlnfSA9IHRvb2x0aXA7XG4gICAgLyogZXNsaW50LWRpc2FibGUgbm8tdW51c2VkLXZhcnMgKi9cbiAgICBjb25zdCB7W2RhdGFzZXRLZXldOiBmaWVsZHMsIC4uLmZpZWxkc1RvU2hvd30gPSBjb25maWcuZmllbGRzVG9TaG93O1xuICAgIC8qIGVzbGludC1lbmFibGUgbm8tdW51c2VkLXZhcnMgKi9cbiAgICBpbnRlcmFjdGlvbkNvbmZpZyA9IHtcbiAgICAgIC4uLmludGVyYWN0aW9uQ29uZmlnLFxuICAgICAgdG9vbHRpcDogey4uLnRvb2x0aXAsIGNvbmZpZzogey4uLmNvbmZpZywgZmllbGRzVG9TaG93fX1cbiAgICB9O1xuICB9XG5cbiAgcmV0dXJuIHsuLi5uZXdTdGF0ZSwgZmlsdGVycywgaW50ZXJhY3Rpb25Db25maWd9O1xufTtcblxuZXhwb3J0IGNvbnN0IHVwZGF0ZUxheWVyQmxlbmRpbmdVcGRhdGVyID0gKHN0YXRlLCBhY3Rpb24pID0+ICh7XG4gIC4uLnN0YXRlLFxuICBsYXllckJsZW5kaW5nOiBhY3Rpb24ubW9kZVxufSk7XG5cbmV4cG9ydCBjb25zdCBzaG93RGF0YXNldFRhYmxlVXBkYXRlciA9IChzdGF0ZSwgYWN0aW9uKSA9PiB7XG4gIHJldHVybiB7XG4gICAgLi4uc3RhdGUsXG4gICAgZWRpdGluZ0RhdGFzZXQ6IGFjdGlvbi5kYXRhSWRcbiAgfTtcbn07XG5cbmV4cG9ydCBjb25zdCByZXNldE1hcENvbmZpZ1Zpc1N0YXRlVXBkYXRlciA9IChzdGF0ZSwgYWN0aW9uKSA9PiAoe1xuICAuLi5JTklUSUFMX1ZJU19TVEFURSxcbiAgLi4uc3RhdGUuaW5pdGlhbFN0YXRlLFxuICBpbml0aWFsU3RhdGU6IHN0YXRlLmluaXRpYWxTdGF0ZVxufSk7XG5cbi8qKlxuICogTG9hZHMgY3VzdG9tIGNvbmZpZ3VyYXRpb24gaW50byBzdGF0ZVxuICogQHBhcmFtIHN0YXRlXG4gKiBAcGFyYW0gYWN0aW9uXG4gKiBAcmV0dXJucyB7Kn1cbiAqL1xuZXhwb3J0IGNvbnN0IHJlY2VpdmVNYXBDb25maWdVcGRhdGVyID0gKHN0YXRlLCBhY3Rpb24pID0+IHtcbiAgaWYgKCFhY3Rpb24ucGF5bG9hZC52aXNTdGF0ZSkge1xuICAgIHJldHVybiBzdGF0ZTtcbiAgfVxuXG4gIGNvbnN0IHtcbiAgICBmaWx0ZXJzLFxuICAgIGxheWVycyxcbiAgICBpbnRlcmFjdGlvbkNvbmZpZyxcbiAgICBsYXllckJsZW5kaW5nLFxuICAgIHNwbGl0TWFwc1xuICB9ID0gYWN0aW9uLnBheWxvYWQudmlzU3RhdGU7XG5cbiAgLy8gYWx3YXlzIHJlc2V0IGNvbmZpZyB3aGVuIHJlY2VpdmUgYSBuZXcgY29uZmlnXG4gIGNvbnN0IHJlc2V0U3RhdGUgPSByZXNldE1hcENvbmZpZ1Zpc1N0YXRlVXBkYXRlcihzdGF0ZSk7XG4gIGxldCBtZXJnZWRTdGF0ZSA9IHtcbiAgICAuLi5yZXNldFN0YXRlLFxuICAgIHNwbGl0TWFwczogc3BsaXRNYXBzIHx8IFtdIC8vIG1hcHMgZG9lc24ndCByZXF1aXJlIGFueSBsb2dpY1xuICB9O1xuXG4gIG1lcmdlZFN0YXRlID0gbWVyZ2VGaWx0ZXJzKG1lcmdlZFN0YXRlLCBmaWx0ZXJzKTtcbiAgbWVyZ2VkU3RhdGUgPSBtZXJnZUxheWVycyhtZXJnZWRTdGF0ZSwgbGF5ZXJzKTtcbiAgbWVyZ2VkU3RhdGUgPSBtZXJnZUludGVyYWN0aW9ucyhtZXJnZWRTdGF0ZSwgaW50ZXJhY3Rpb25Db25maWcpO1xuICBtZXJnZWRTdGF0ZSA9IG1lcmdlTGF5ZXJCbGVuZGluZyhtZXJnZWRTdGF0ZSwgbGF5ZXJCbGVuZGluZyk7XG5cbiAgcmV0dXJuIG1lcmdlZFN0YXRlO1xufTtcblxuZXhwb3J0IGNvbnN0IGxheWVySG92ZXJVcGRhdGVyID0gKHN0YXRlLCBhY3Rpb24pID0+ICh7XG4gIC4uLnN0YXRlLFxuICBob3ZlckluZm86IGFjdGlvbi5pbmZvXG59KTtcblxuZXhwb3J0IGNvbnN0IGxheWVyQ2xpY2tVcGRhdGVyID0gKHN0YXRlLCBhY3Rpb24pID0+ICh7XG4gIC4uLnN0YXRlLFxuICBjbGlja2VkOiBhY3Rpb24uaW5mbyAmJiBhY3Rpb24uaW5mby5waWNrZWQgPyBhY3Rpb24uaW5mbyA6IG51bGxcbn0pO1xuXG5leHBvcnQgY29uc3QgbWFwQ2xpY2tVcGRhdGVyID0gKHN0YXRlLCBhY3Rpb24pID0+ICh7XG4gIC4uLnN0YXRlLFxuICBjbGlja2VkOiBudWxsXG59KTtcblxuZXhwb3J0IGNvbnN0IHRvZ2dsZVNwbGl0TWFwVXBkYXRlciA9IChzdGF0ZSwgYWN0aW9uKSA9PlxuICBzdGF0ZS5zcGxpdE1hcHMgJiYgc3RhdGUuc3BsaXRNYXBzLmxlbmd0aCA9PT0gMFxuICAgID8ge1xuICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgLy8gbWF5YmUgd2Ugc2hvdWxkIHVzZSBhbiBhcnJheSB0byBzdG9yZSBzdGF0ZSBmb3IgYSBzaW5nbGUgbWFwIGFzIHdlbGxcbiAgICAgICAgLy8gaWYgY3VycmVudCBtYXBzIGxlbmd0aCBpcyBlcXVhbCB0byAwIGl0IG1lYW5zIHRoYXQgd2UgYXJlIGFib3V0IHRvIHNwbGl0IHRoZSB2aWV3XG4gICAgICAgIHNwbGl0TWFwczogY29tcHV0ZVNwbGl0TWFwTGF5ZXJzKHN0YXRlLmxheWVycylcbiAgICAgIH1cbiAgICA6IGNsb3NlU3BlY2lmaWNNYXBBdEluZGV4KHN0YXRlLCBhY3Rpb24pO1xuXG4vKipcbiAqIFRoaXMgaXMgdHJpZ2dlcmVkIHdoZW4gdmlldyBpcyBzcGxpdCBpbnRvIG11bHRpcGxlIG1hcHMuXG4gKiBJdCB3aWxsIG9ubHkgdXBkYXRlIGxheWVycyB0aGF0IGJlbG9uZyB0byB0aGUgbWFwIGxheWVyIGRyb3Bkb3duXG4gKiB0aGUgdXNlciBpcyBpbnRlcmFjdGluZyB3aXRcbiAqIEBwYXJhbSBzdGF0ZVxuICogQHBhcmFtIGFjdGlvblxuICovXG5leHBvcnQgY29uc3Qgc2V0VmlzaWJsZUxheWVyc0Zvck1hcFVwZGF0ZXIgPSAoc3RhdGUsIGFjdGlvbikgPT4ge1xuICBjb25zdCB7bWFwSW5kZXgsIGxheWVySWRzfSA9IGFjdGlvbjtcbiAgaWYgKCFsYXllcklkcykge1xuICAgIHJldHVybiBzdGF0ZTtcbiAgfVxuXG4gIGNvbnN0IHtzcGxpdE1hcHMgPSBbXX0gPSBzdGF0ZTtcblxuICBpZiAoc3BsaXRNYXBzLmxlbmd0aCA9PT0gMCkge1xuICAgIC8vIHdlIHNob3VsZCBuZXZlciBnZXQgaW50byB0aGlzIHN0YXRlXG4gICAgLy8gYmVjYXVzZSB0aGlzIGFjdGlvbiBzaG91bGQgb25seSBiZSB0cmlnZ2VyZWRcbiAgICAvLyB3aGVuIG1hcCB2aWV3IGlzIHNwbGl0XG4gICAgLy8gYnV0IHNvbWV0aGluZyBtYXkgaGF2ZSBoYXBwZW5lZFxuICAgIHJldHVybiBzdGF0ZTtcbiAgfVxuXG4gIC8vIG5lZWQgdG8gY2hlY2sgaWYgbWFwcyBpcyBwb3B1bGF0ZWQgb3RoZXJ3aXNlIHdpbGwgY3JlYXRlXG4gIGNvbnN0IHtbbWFwSW5kZXhdOiBtYXAgPSB7fX0gPSBzcGxpdE1hcHM7XG5cbiAgY29uc3QgbGF5ZXJzID0gbWFwLmxheWVycyB8fCBbXTtcblxuICAvLyB3ZSBzZXQgdmlzaWJpbGl0eSB0byB0cnVlIGZvciBhbGwgbGF5ZXJzIGluY2x1ZGVkIGluIG91ciBpbnB1dCBsaXN0XG4gIGNvbnN0IG5ld0xheWVycyA9IChPYmplY3Qua2V5cyhsYXllcnMpIHx8IFtdKS5yZWR1Y2UoKGN1cnJlbnRMYXllcnMsIGlkeCkgPT4ge1xuICAgIHJldHVybiB7XG4gICAgICAuLi5jdXJyZW50TGF5ZXJzLFxuICAgICAgW2lkeF06IHtcbiAgICAgICAgLi4ubGF5ZXJzW2lkeF0sXG4gICAgICAgIGlzVmlzaWJsZTogbGF5ZXJJZHMuaW5jbHVkZXMoaWR4KVxuICAgICAgfVxuICAgIH07XG4gIH0sIHt9KTtcblxuICBjb25zdCBuZXdNYXBzID0gWy4uLnNwbGl0TWFwc107XG5cbiAgbmV3TWFwc1ttYXBJbmRleF0gPSB7XG4gICAgLi4uc3BsaXRNYXBzW21hcEluZGV4XSxcbiAgICBsYXllcnM6IG5ld0xheWVyc1xuICB9O1xuXG4gIHJldHVybiB7XG4gICAgLi4uc3RhdGUsXG4gICAgc3BsaXRNYXBzOiBuZXdNYXBzXG4gIH07XG59O1xuXG5leHBvcnQgY29uc3QgdG9nZ2xlTGF5ZXJGb3JNYXBVcGRhdGVyID0gKHN0YXRlLCBhY3Rpb24pID0+IHtcbiAgaWYgKCFzdGF0ZS5zcGxpdE1hcHNbYWN0aW9uLm1hcEluZGV4XSkge1xuICAgIHJldHVybiBzdGF0ZTtcbiAgfVxuXG4gIGNvbnN0IG1hcFNldHRpbmdzID0gc3RhdGUuc3BsaXRNYXBzW2FjdGlvbi5tYXBJbmRleF07XG4gIGNvbnN0IHtsYXllcnN9ID0gbWFwU2V0dGluZ3M7XG4gIGlmICghbGF5ZXJzIHx8ICFsYXllcnNbYWN0aW9uLmxheWVySWRdKSB7XG4gICAgcmV0dXJuIHN0YXRlO1xuICB9XG5cbiAgY29uc3QgbGF5ZXIgPSBsYXllcnNbYWN0aW9uLmxheWVySWRdO1xuXG4gIGNvbnN0IG5ld0xheWVyID0ge1xuICAgIC4uLmxheWVyLFxuICAgIGlzVmlzaWJsZTogIWxheWVyLmlzVmlzaWJsZVxuICB9O1xuXG4gIGNvbnN0IG5ld0xheWVycyA9IHtcbiAgICAuLi5sYXllcnMsXG4gICAgW2FjdGlvbi5sYXllcklkXTogbmV3TGF5ZXJcbiAgfTtcblxuICAvLyBjb25zdCBzcGxpdE1hcHMgPSBzdGF0ZS5zcGxpdE1hcHM7XG4gIGNvbnN0IG5ld1NwbGl0TWFwcyA9IFsuLi5zdGF0ZS5zcGxpdE1hcHNdO1xuICBuZXdTcGxpdE1hcHNbYWN0aW9uLm1hcEluZGV4XSA9IHtcbiAgICAuLi5tYXBTZXR0aW5ncyxcbiAgICBsYXllcnM6IG5ld0xheWVyc1xuICB9O1xuXG4gIHJldHVybiB7XG4gICAgLi4uc3RhdGUsXG4gICAgc3BsaXRNYXBzOiBuZXdTcGxpdE1hcHNcbiAgfTtcbn07XG5cbi8qIGVzbGludC1kaXNhYmxlIG1heC1zdGF0ZW1lbnRzICovXG5leHBvcnQgY29uc3QgdXBkYXRlVmlzRGF0YVVwZGF0ZXIgPSAoc3RhdGUsIGFjdGlvbikgPT4ge1xuICAvLyBkYXRhc2V0cyBjYW4gYmUgYSBzaW5nbGUgZGF0YSBlbnRyaWVzIG9yIGFuIGFycmF5IG9mIG11bHRpcGxlIGRhdGEgZW50cmllc1xuICBjb25zdCBkYXRhc2V0cyA9IEFycmF5LmlzQXJyYXkoYWN0aW9uLmRhdGFzZXRzKVxuICAgID8gYWN0aW9uLmRhdGFzZXRzXG4gICAgOiBbYWN0aW9uLmRhdGFzZXRzXTtcblxuICBpZiAoYWN0aW9uLmNvbmZpZykge1xuICAgIC8vIGFwcGx5IGNvbmZpZyBpZiBwYXNzZWQgZnJvbSBhY3Rpb25cbiAgICBzdGF0ZSA9IHJlY2VpdmVNYXBDb25maWdVcGRhdGVyKHN0YXRlLCB7XG4gICAgICBwYXlsb2FkOiB7dmlzU3RhdGU6IGFjdGlvbi5jb25maWd9XG4gICAgfSk7XG4gIH1cblxuICBjb25zdCBuZXdEYXRlRW50cmllcyA9IGRhdGFzZXRzLnJlZHVjZShcbiAgICAoYWNjdSwge2luZm8gPSB7fSwgZGF0YX0pID0+ICh7XG4gICAgICAuLi5hY2N1LFxuICAgICAgLi4uKGNyZWF0ZU5ld0RhdGFFbnRyeSh7aW5mbywgZGF0YX0sIHN0YXRlLmRhdGFzZXRzKSB8fCB7fSlcbiAgICB9KSxcbiAgICB7fVxuICApO1xuXG4gIGlmICghT2JqZWN0LmtleXMobmV3RGF0ZUVudHJpZXMpLmxlbmd0aCkge1xuICAgIHJldHVybiBzdGF0ZTtcbiAgfVxuXG4gIGNvbnN0IHN0YXRlV2l0aE5ld0RhdGEgPSB7XG4gICAgLi4uc3RhdGUsXG4gICAgZGF0YXNldHM6IHtcbiAgICAgIC4uLnN0YXRlLmRhdGFzZXRzLFxuICAgICAgLi4ubmV3RGF0ZUVudHJpZXNcbiAgICB9XG4gIH07XG5cbiAgLy8gcHJldmlvdXNseSBzYXZlZCBjb25maWcgYmVmb3JlIGRhdGEgbG9hZGVkXG4gIGNvbnN0IHtcbiAgICBmaWx0ZXJUb0JlTWVyZ2VkID0gW10sXG4gICAgbGF5ZXJUb0JlTWVyZ2VkID0gW10sXG4gICAgaW50ZXJhY3Rpb25Ub0JlTWVyZ2VkID0ge31cbiAgfSA9IHN0YXRlV2l0aE5ld0RhdGE7XG5cbiAgLy8gbWVyZ2Ugc3RhdGUgd2l0aCBzYXZlZCBmaWx0ZXJzXG4gIGxldCBtZXJnZWRTdGF0ZSA9IG1lcmdlRmlsdGVycyhzdGF0ZVdpdGhOZXdEYXRhLCBmaWx0ZXJUb0JlTWVyZ2VkKTtcbiAgLy8gbWVyZ2Ugc3RhdGUgd2l0aCBzYXZlZCBsYXllcnNcbiAgbWVyZ2VkU3RhdGUgPSBtZXJnZUxheWVycyhtZXJnZWRTdGF0ZSwgbGF5ZXJUb0JlTWVyZ2VkKTtcblxuICBpZiAobWVyZ2VkU3RhdGUubGF5ZXJzLmxlbmd0aCA9PT0gc3RhdGUubGF5ZXJzLmxlbmd0aCkge1xuICAgIC8vIG5vIGxheWVyIG1lcmdlZCwgZmluZCBkZWZhdWx0c1xuICAgIG1lcmdlZFN0YXRlID0gYWRkRGVmYXVsdExheWVycyhtZXJnZWRTdGF0ZSwgbmV3RGF0ZUVudHJpZXMpO1xuICB9XG5cbiAgaWYgKG1lcmdlZFN0YXRlLnNwbGl0TWFwcy5sZW5ndGgpIHtcbiAgICBjb25zdCBuZXdMYXllcnMgPSBtZXJnZWRTdGF0ZS5sYXllcnMuZmlsdGVyKFxuICAgICAgbCA9PiBsLmNvbmZpZy5kYXRhSWQgaW4gbmV3RGF0ZUVudHJpZXNcbiAgICApO1xuICAgIC8vIGlmIG1hcCBpcyBzcGxpdGVkLCBhZGQgbmV3IGxheWVycyB0byBzcGxpdE1hcHNcbiAgICBtZXJnZWRTdGF0ZSA9IHtcbiAgICAgIC4uLm1lcmdlZFN0YXRlLFxuICAgICAgc3BsaXRNYXBzOiBhZGROZXdMYXllcnNUb1NwbGl0TWFwKG1lcmdlZFN0YXRlLnNwbGl0TWFwcywgbmV3TGF5ZXJzKVxuICAgIH07XG4gIH1cblxuICAvLyBtZXJnZSBzdGF0ZSB3aXRoIHNhdmVkIGludGVyYWN0aW9uc1xuICBtZXJnZWRTdGF0ZSA9IG1lcmdlSW50ZXJhY3Rpb25zKG1lcmdlZFN0YXRlLCBpbnRlcmFjdGlvblRvQmVNZXJnZWQpO1xuXG4gIC8vIGlmIG5vIHRvb2x0aXBzIG1lcmdlZCBhZGQgZGVmYXVsdCB0b29sdGlwc1xuICBPYmplY3Qua2V5cyhuZXdEYXRlRW50cmllcykuZm9yRWFjaChkYXRhSWQgPT4ge1xuICAgIGNvbnN0IHRvb2x0aXBGaWVsZHMgPVxuICAgICAgbWVyZ2VkU3RhdGUuaW50ZXJhY3Rpb25Db25maWcudG9vbHRpcC5jb25maWcuZmllbGRzVG9TaG93W2RhdGFJZF07XG4gICAgaWYgKCFBcnJheS5pc0FycmF5KHRvb2x0aXBGaWVsZHMpIHx8ICF0b29sdGlwRmllbGRzLmxlbmd0aCkge1xuICAgICAgbWVyZ2VkU3RhdGUgPSBhZGREZWZhdWx0VG9vbHRpcHMobWVyZ2VkU3RhdGUsIG5ld0RhdGVFbnRyaWVzW2RhdGFJZF0pO1xuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIHVwZGF0ZUFsbExheWVyRG9tYWluRGF0YShtZXJnZWRTdGF0ZSwgT2JqZWN0LmtleXMobmV3RGF0ZUVudHJpZXMpKTtcbn07XG4vKiBlc2xpbnQtZW5hYmxlIG1heC1zdGF0ZW1lbnRzICovXG5cbmZ1bmN0aW9uIGdlbmVyYXRlTGF5ZXJNZXRhRm9yU3BsaXRWaWV3cyhsYXllcikge1xuICByZXR1cm4ge1xuICAgIGlzQXZhaWxhYmxlOiBsYXllci5jb25maWcuaXNWaXNpYmxlLFxuICAgIGlzVmlzaWJsZTogbGF5ZXIuY29uZmlnLmlzVmlzaWJsZVxuICB9O1xufVxuXG4vKipcbiAqIFRoaXMgZW10aG9kIHdpbGwgY29tcHV0ZSB0aGUgZGVmYXVsdCBtYXBzIGN1c3RvbSBsaXN0XG4gKiBiYXNlZCBvbiB0aGUgY3VycmVudCBsYXllcnMgc3RhdHVzXG4gKiBAcGFyYW0gbGF5ZXJzXG4gKiBAcmV0dXJucyB7WyosKl19XG4gKi9cbmZ1bmN0aW9uIGNvbXB1dGVTcGxpdE1hcExheWVycyhsYXllcnMpIHtcbiAgY29uc3QgbWFwTGF5ZXJzID0gbGF5ZXJzLnJlZHVjZShcbiAgICAobmV3TGF5ZXJzLCBjdXJyZW50TGF5ZXIpID0+ICh7XG4gICAgICAuLi5uZXdMYXllcnMsXG4gICAgICBbY3VycmVudExheWVyLmlkXTogZ2VuZXJhdGVMYXllck1ldGFGb3JTcGxpdFZpZXdzKGN1cnJlbnRMYXllcilcbiAgICB9KSxcbiAgICB7fVxuICApO1xuICByZXR1cm4gW1xuICAgIHtcbiAgICAgIGxheWVyczogbWFwTGF5ZXJzXG4gICAgfSxcbiAgICB7XG4gICAgICBsYXllcnM6IG1hcExheWVyc1xuICAgIH1cbiAgXTtcbn1cblxuLyoqXG4gKiBSZW1vdmUgYW4gZXhpc3RpbmcgbGF5ZXJzIGZyb20gY3VzdG9tIG1hcCBsYXllciBvYmplY3RzXG4gKiBAcGFyYW0gc3RhdGVcbiAqIEBwYXJhbSBsYXllclxuICogQHJldHVybnMge1sqLCpdfSBNYXBzIG9mIGN1c3RvbSBsYXllciBvYmplY3RzXG4gKi9cbmZ1bmN0aW9uIHJlbW92ZUxheWVyRnJvbVNwbGl0TWFwcyhzdGF0ZSwgbGF5ZXIpIHtcbiAgcmV0dXJuIHN0YXRlLnNwbGl0TWFwcy5tYXAoc2V0dGluZ3MgPT4ge1xuICAgIGNvbnN0IHtsYXllcnN9ID0gc2V0dGluZ3M7XG4gICAgLyogZXNsaW50LWRpc2FibGUgbm8tdW51c2VkLXZhcnMgKi9cbiAgICBjb25zdCB7W2xheWVyLmlkXTogXywgLi4ubmV3TGF5ZXJzfSA9IGxheWVycztcbiAgICAvKiBlc2xpbnQtZW5hYmxlIG5vLXVudXNlZC12YXJzICovXG4gICAgcmV0dXJuIHtcbiAgICAgIC4uLnNldHRpbmdzLFxuICAgICAgbGF5ZXJzOiBuZXdMYXllcnNcbiAgICB9O1xuICB9KTtcbn1cblxuLyoqXG4gKiBBZGQgbmV3IGxheWVycyB0byBib3RoIGV4aXN0aW5nIG1hcHNcbiAqIEBwYXJhbSBzcGxpdE1hcHNcbiAqIEBwYXJhbSBsYXllcnNcbiAqIEByZXR1cm5zIHtbKiwqXX0gbmV3IHNwbGl0TWFwc1xuICovXG5mdW5jdGlvbiBhZGROZXdMYXllcnNUb1NwbGl0TWFwKHNwbGl0TWFwcywgbGF5ZXJzKSB7XG4gIGNvbnN0IG5ld0xheWVycyA9IEFycmF5LmlzQXJyYXkobGF5ZXJzKSA/IGxheWVycyA6IFtsYXllcnNdO1xuXG4gIGlmICghc3BsaXRNYXBzIHx8ICFzcGxpdE1hcHMubGVuZ3RoIHx8ICFuZXdMYXllcnMubGVuZ3RoKSB7XG4gICAgcmV0dXJuIHNwbGl0TWFwcztcbiAgfVxuXG4gIC8vIGFkZCBuZXcgbGF5ZXIgdG8gYm90aCBtYXBzLFxuICAvLyAgZG9uJ3Qgb3ZlcnJpZGUsIGlmIGxheWVyLmlkIGlzIGFscmVhZHkgaW4gc3BsaXRNYXBzLnNldHRpbmdzLmxheWVyc1xuICByZXR1cm4gc3BsaXRNYXBzLm1hcChzZXR0aW5ncyA9PiAoe1xuICAgIC4uLnNldHRpbmdzLFxuICAgIGxheWVyczoge1xuICAgICAgLi4uc2V0dGluZ3MubGF5ZXJzLFxuICAgICAgLi4ubmV3TGF5ZXJzLnJlZHVjZShcbiAgICAgICAgKGFjY3UsIG5ld0xheWVyKSA9PlxuICAgICAgICAgIG5ld0xheWVyLmNvbmZpZy5pc1Zpc2libGVcbiAgICAgICAgICAgID8ge1xuICAgICAgICAgICAgICAgIC4uLmFjY3UsXG4gICAgICAgICAgICAgICAgW25ld0xheWVyLmlkXTogc2V0dGluZ3MubGF5ZXJzW25ld0xheWVyLmlkXVxuICAgICAgICAgICAgICAgICAgPyBzZXR0aW5ncy5sYXllcnNbbmV3TGF5ZXIuaWRdXG4gICAgICAgICAgICAgICAgICA6IGdlbmVyYXRlTGF5ZXJNZXRhRm9yU3BsaXRWaWV3cyhuZXdMYXllcilcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgOiBhY2N1LFxuICAgICAgICB7fVxuICAgICAgKVxuICAgIH1cbiAgfSkpO1xufVxuXG4vKipcbiAqIEhpZGUgYW4gZXhpc3RpbmcgbGF5ZXJzIGZyb20gY3VzdG9tIG1hcCBsYXllciBvYmplY3RzXG4gKiBAcGFyYW0gc3RhdGVcbiAqIEBwYXJhbSBsYXllclxuICogQHJldHVybnMge1sqLCpdfSBNYXBzIG9mIGN1c3RvbSBsYXllciBvYmplY3RzXG4gKi9cbmZ1bmN0aW9uIHRvZ2dsZUxheWVyRnJvbVNwbGl0TWFwcyhzdGF0ZSwgbGF5ZXIpIHtcbiAgcmV0dXJuIHN0YXRlLnNwbGl0TWFwcy5tYXAoc2V0dGluZ3MgPT4ge1xuICAgIGNvbnN0IHtsYXllcnN9ID0gc2V0dGluZ3M7XG4gICAgY29uc3QgbmV3TGF5ZXJzID0ge1xuICAgICAgLi4ubGF5ZXJzLFxuICAgICAgW2xheWVyLmlkXTogZ2VuZXJhdGVMYXllck1ldGFGb3JTcGxpdFZpZXdzKGxheWVyKVxuICAgIH07XG5cbiAgICByZXR1cm4ge1xuICAgICAgLi4uc2V0dGluZ3MsXG4gICAgICBsYXllcnM6IG5ld0xheWVyc1xuICAgIH07XG4gIH0pO1xufVxuXG4vKipcbiAqIFdoZW4gYSB1c2VyIGNsaWNrcyBvbiB0aGUgc3BlY2lmaWMgbWFwIGNsb3NpbmcgaWNvblxuICogdGhlIGFwcGxpY2F0aW9uIHdpbGwgY2xvc2UgdGhlIHNlbGVjdGVkIG1hcFxuICogYW5kIHdpbGwgbWVyZ2UgdGhlIHJlbWFpbmluZyBvbmUgd2l0aCB0aGUgZ2xvYmFsIHN0YXRlXG4gKiBUT0RPOiBpIHRoaW5rIGluIHRoZSBmdXR1cmUgdGhpcyBhY3Rpb24gc2hvdWxkIGJlIGNhbGxlZCBtZXJnZSBtYXAgbGF5ZXJzIHdpdGggZ2xvYmFsIHNldHRpbmdzXG4gKiBAcGFyYW0gc3RhdGVcbiAqIEBwYXJhbSBhY3Rpb25cbiAqIEByZXR1cm5zIHsqfVxuICovXG5mdW5jdGlvbiBjbG9zZVNwZWNpZmljTWFwQXRJbmRleChzdGF0ZSwgYWN0aW9uKSB7XG4gIC8vIHJldHJpZXZlIGxheWVycyBtZXRhIGRhdGEgZnJvbSB0aGUgcmVtYWluaW5nIG1hcCB0aGF0IHdlIG5lZWQgdG8ga2VlcFxuICBjb25zdCBpbmRleFRvUmV0cmlldmUgPSAxIC0gYWN0aW9uLnBheWxvYWQ7XG5cbiAgY29uc3QgbWV0YVNldHRpbmdzID0gc3RhdGUuc3BsaXRNYXBzW2luZGV4VG9SZXRyaWV2ZV07XG4gIGlmICghbWV0YVNldHRpbmdzIHx8ICFtZXRhU2V0dGluZ3MubGF5ZXJzKSB7XG4gICAgLy8gaWYgd2UgY2FuJ3QgZmluZCB0aGUgbWV0YSBzZXR0aW5ncyB3ZSBzaW1wbHkgY2xlYW4gdXAgc3BsaXRNYXBzIGFuZFxuICAgIC8vIGtlZXAgZ2xvYmFsIHN0YXRlIGFzIGl0IGlzXG4gICAgLy8gYnV0IHdoeSBkb2VzIHRoaXMgZXZlciBoYXBwZW4/XG4gICAgcmV0dXJuIHtcbiAgICAgIC4uLnN0YXRlLFxuICAgICAgc3BsaXRNYXBzOiBbXVxuICAgIH07XG4gIH1cblxuICBjb25zdCB7bGF5ZXJzfSA9IHN0YXRlO1xuXG4gIC8vIHVwZGF0ZSBsYXllciB2aXNpYmlsaXR5XG4gIGNvbnN0IG5ld0xheWVycyA9IGxheWVycy5tYXAobGF5ZXIgPT5cbiAgICBsYXllci51cGRhdGVMYXllckNvbmZpZyh7XG4gICAgICBpc1Zpc2libGU6IG1ldGFTZXR0aW5ncy5sYXllcnNbbGF5ZXIuaWRdXG4gICAgICAgID8gbWV0YVNldHRpbmdzLmxheWVyc1tsYXllci5pZF0uaXNWaXNpYmxlXG4gICAgICAgIDogbGF5ZXIuY29uZmlnLmlzVmlzaWJsZVxuICAgIH0pXG4gICk7XG5cbiAgLy8gZGVsZXRlIG1hcFxuICByZXR1cm4ge1xuICAgIC4uLnN0YXRlLFxuICAgIGxheWVyczogbmV3TGF5ZXJzLFxuICAgIHNwbGl0TWFwczogW11cbiAgfTtcbn1cblxuLy8gVE9ETzogcmVkbyB3cml0ZSBoYW5kbGVyIHRvIG5vdCB1c2UgdGFza3NcbmV4cG9ydCBjb25zdCBsb2FkRmlsZXNVcGRhdGVyID0gKHN0YXRlLCBhY3Rpb24pID0+IHtcbiAgY29uc3Qge2ZpbGVzfSA9IGFjdGlvbjtcbiAgY29uc3QgZmlsZXNUb0xvYWQgPSBmaWxlcy5tYXAoZmlsZUJsb2IgPT4gKHtcbiAgICBmaWxlQmxvYixcbiAgICBpbmZvOiB7XG4gICAgICBpZDogZ2VuZXJhdGVIYXNoSWQoNCksXG4gICAgICBsYWJlbDogZmlsZUJsb2IubmFtZSxcbiAgICAgIHNpemU6IGZpbGVCbG9iLnNpemVcbiAgICB9LFxuICAgIGhhbmRsZXI6IGdldEZpbGVIYW5kbGVyKGZpbGVCbG9iKVxuICB9KSk7XG5cbiAgLy8gcmVhZGVyIC0+IHBhcnNlciAtPiBhdWdtZW50IC0+IHJlY2VpdmVWaXNEYXRhXG4gIGNvbnN0IGxvYWRGaWxlVGFza3MgPSBbXG4gICAgVGFzay5hbGwoZmlsZXNUb0xvYWQubWFwKExPQURfRklMRV9UQVNLKSkuYmltYXAoXG4gICAgICByZXN1bHRzID0+IHtcbiAgICAgICAgY29uc3QgZGF0YSA9IHJlc3VsdHMucmVkdWNlKChmLCBjKSA9PiAoe1xuICAgICAgICAgIC8vIHVzaW5nIGNvbmNhdCBoZXJlIGJlY2F1c2UgdGhlIGN1cnJlbnQgZGF0YXNldHMgY291bGQgYmUgYW4gYXJyYXkgb3IgYSBzaW5nbGUgaXRlbVxuICAgICAgICAgIGRhdGFzZXRzOiBmLmRhdGFzZXRzLmNvbmNhdChjLmRhdGFzZXRzKSxcbiAgICAgICAgICAvLyB3ZSBuZWVkIHRvIGRlZXAgbWVyZ2UgdGhpcyB0aGluZyB1bmxlc3Mgd2UgZmluZCBhIGJldHRlciBzb2x1dGlvblxuICAgICAgICAgIC8vIHRoaXMgY2FzZSB3aWxsIG9ubHkgaGFwcGVuIGlmIHdlIGFsbG93IHRvIGxvYWQgbXVsdGlwbGUga2VwbGVyZ2wganNvbiBmaWxlc1xuICAgICAgICAgIGNvbmZpZzoge1xuICAgICAgICAgICAgLi4uZi5jb25maWcsXG4gICAgICAgICAgICAuLi4oYy5jb25maWcgfHwge30pXG4gICAgICAgICAgfVxuICAgICAgICB9KSwge2RhdGFzZXRzOiBbXSwgY29uZmlnOiB7fSwgb3B0aW9uczoge2NlbnRlck1hcDogdHJ1ZX19KTtcbiAgICAgICAgcmV0dXJuIGFkZERhdGFUb01hcChkYXRhKTtcbiAgICAgIH0sXG4gICAgICBlcnJvciA9PiBsb2FkRmlsZXNFcnIoZXJyb3IpXG4gICAgKVxuICBdO1xuXG4gIHJldHVybiB3aXRoVGFzayhcbiAgICB7XG4gICAgICAuLi5zdGF0ZSxcbiAgICAgIGZpbGVMb2FkaW5nOiB0cnVlXG4gICAgfSxcbiAgICBsb2FkRmlsZVRhc2tzXG4gICk7XG59O1xuXG5leHBvcnQgY29uc3QgbG9hZEZpbGVzRXJyVXBkYXRlciA9IChzdGF0ZSwge2Vycm9yfSkgPT4gKHtcbiAgLi4uc3RhdGUsXG4gIGZpbGVMb2FkaW5nOiBmYWxzZSxcbiAgZmlsZUxvYWRpbmdFcnI6IGVycm9yXG59KTtcblxuLyoqXG4gKiBoZWxwZXIgZnVuY3Rpb24gdG8gdXBkYXRlIEFsbCBsYXllciBkb21haW4gYW5kIGxheWVyIGRhdGEgb2Ygc3RhdGVcbiAqXG4gKiBAcGFyYW0ge29iamVjdH0gc3RhdGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBkYXRhc2V0c1xuICogQHJldHVybnMge29iamVjdH0gc3RhdGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGFkZERlZmF1bHRMYXllcnMoc3RhdGUsIGRhdGFzZXRzKSB7XG4gIGNvbnN0IGRlZmF1bHRMYXllcnMgPSBPYmplY3QudmFsdWVzKGRhdGFzZXRzKS5yZWR1Y2UoXG4gICAgKGFjY3UsIGRhdGFzZXQpID0+IFtcbiAgICAgIC4uLmFjY3UsXG4gICAgICAuLi4oZmluZERlZmF1bHRMYXllcihkYXRhc2V0LCBzdGF0ZS5sYXllckNsYXNzZXMpIHx8IFtdKVxuICAgIF0sXG4gICAgW11cbiAgKTtcbiAgcmV0dXJuIHtcbiAgICAuLi5zdGF0ZSxcbiAgICBsYXllcnM6IFsuLi5zdGF0ZS5sYXllcnMsIC4uLmRlZmF1bHRMYXllcnNdLFxuICAgIGxheWVyT3JkZXI6IFtcbiAgICAgIC8vIHB1dCBuZXcgbGF5ZXJzIG9uIHRvcCBvZiBvbGQgb25lc1xuICAgICAgLi4uZGVmYXVsdExheWVycy5tYXAoKF8sIGkpID0+IHN0YXRlLmxheWVycy5sZW5ndGggKyBpKSxcbiAgICAgIC4uLnN0YXRlLmxheWVyT3JkZXJcbiAgICBdXG4gIH07XG59XG5cbi8qKlxuICogaGVscGVyIGZ1bmN0aW9uIHRvIGZpbmQgZGVmYXVsdCB0b29sdGlwc1xuICpcbiAqIEBwYXJhbSB7b2JqZWN0fSBzdGF0ZVxuICogQHBhcmFtIHtvYmplY3R9IGRhdGFzZXRcbiAqIEByZXR1cm5zIHtvYmplY3R9IHN0YXRlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBhZGREZWZhdWx0VG9vbHRpcHMoc3RhdGUsIGRhdGFzZXQpIHtcbiAgY29uc3QgdG9vbHRpcEZpZWxkcyA9IGZpbmRGaWVsZHNUb1Nob3coZGF0YXNldCk7XG5cbiAgcmV0dXJuIHtcbiAgICAuLi5zdGF0ZSxcbiAgICBpbnRlcmFjdGlvbkNvbmZpZzoge1xuICAgICAgLi4uc3RhdGUuaW50ZXJhY3Rpb25Db25maWcsXG4gICAgICB0b29sdGlwOiB7XG4gICAgICAgIC4uLnN0YXRlLmludGVyYWN0aW9uQ29uZmlnLnRvb2x0aXAsXG4gICAgICAgIGNvbmZpZzoge1xuICAgICAgICAgIC8vIGZpbmQgZGVmYXVsdCBmaWVsZHMgdG8gc2hvdyBpbiB0b29sdGlwXG4gICAgICAgICAgZmllbGRzVG9TaG93OiB7XG4gICAgICAgICAgICAuLi5zdGF0ZS5pbnRlcmFjdGlvbkNvbmZpZy50b29sdGlwLmNvbmZpZy5maWVsZHNUb1Nob3csXG4gICAgICAgICAgICAuLi50b29sdGlwRmllbGRzXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9O1xufVxuXG4vKipcbiAqIGhlbHBlciBmdW5jdGlvbiB0byB1cGRhdGUgbGF5ZXIgZG9tYWlucyBmb3IgYW4gYXJyYXkgb2YgZGF0c2V0c1xuICpcbiAqIEBwYXJhbSB7b2JqZWN0fSBzdGF0ZVxuICogQHBhcmFtIHthcnJheSB8IHN0cmluZ30gZGF0YUlkXG4gKiBAcGFyYW0ge29iamVjdH0gbmV3RmlsdGVyIC0gaWYgaXMgY2FsbGVkIGJ5IHNldEZpbHRlciwgdGhlIGZpbHRlciB0aGF0IGhhcyBjaGFuZ2VkXG4gKiBAcmV0dXJucyB7b2JqZWN0fSBzdGF0ZVxuICovXG5leHBvcnQgZnVuY3Rpb24gdXBkYXRlQWxsTGF5ZXJEb21haW5EYXRhKHN0YXRlLCBkYXRhSWQsIG5ld0ZpbHRlcikge1xuICBjb25zdCBkYXRhSWRzID0gdHlwZW9mIGRhdGFJZCA9PT0gJ3N0cmluZycgPyBbZGF0YUlkXSA6IGRhdGFJZDtcbiAgY29uc3QgbmV3TGF5ZXJzID0gW107XG4gIGNvbnN0IG5ld0xheWVyRGF0YXMgPSBbXTtcblxuICBzdGF0ZS5sYXllcnMuZm9yRWFjaCgob2xkTGF5ZXIsIGkpID0+IHtcbiAgICBpZiAob2xkTGF5ZXIuY29uZmlnLmRhdGFJZCAmJiBkYXRhSWRzLmluY2x1ZGVzKG9sZExheWVyLmNvbmZpZy5kYXRhSWQpKSB7XG4gICAgICAvLyBObyBuZWVkIHRvIHJlY2FsY3VsYXRlIGxheWVyIGRvbWFpbiBpZiBmaWx0ZXIgaGFzIGZpeGVkIGRvbWFpblxuICAgICAgY29uc3QgbmV3TGF5ZXIgPVxuICAgICAgICBuZXdGaWx0ZXIgJiYgbmV3RmlsdGVyLmZpeGVkRG9tYWluXG4gICAgICAgICAgPyBvbGRMYXllclxuICAgICAgICAgIDogb2xkTGF5ZXIudXBkYXRlTGF5ZXJEb21haW4oXG4gICAgICAgICAgICAgIHN0YXRlLmRhdGFzZXRzW29sZExheWVyLmNvbmZpZy5kYXRhSWRdLFxuICAgICAgICAgICAgICBuZXdGaWx0ZXJcbiAgICAgICAgICAgICk7XG5cbiAgICAgIGNvbnN0IHtsYXllckRhdGEsIGxheWVyfSA9IGNhbGN1bGF0ZUxheWVyRGF0YShcbiAgICAgICAgbmV3TGF5ZXIsXG4gICAgICAgIHN0YXRlLFxuICAgICAgICBzdGF0ZS5sYXllckRhdGFbaV1cbiAgICAgICk7XG5cbiAgICAgIG5ld0xheWVycy5wdXNoKGxheWVyKTtcbiAgICAgIG5ld0xheWVyRGF0YXMucHVzaChsYXllckRhdGEpO1xuICAgIH0gZWxzZSB7XG4gICAgICBuZXdMYXllcnMucHVzaChvbGRMYXllcik7XG4gICAgICBuZXdMYXllckRhdGFzLnB1c2goc3RhdGUubGF5ZXJEYXRhW2ldKTtcbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiB7XG4gICAgLi4uc3RhdGUsXG4gICAgbGF5ZXJzOiBuZXdMYXllcnMsXG4gICAgbGF5ZXJEYXRhOiBuZXdMYXllckRhdGFzXG4gIH07XG59XG4iXX0=