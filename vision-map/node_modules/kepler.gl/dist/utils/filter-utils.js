'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TIME_ANIMATION_SPEED = exports.BASE_SPEED = exports.FILTER_COMPONENTS = exports.PLOT_TYPES = exports.FILTER_TYPES = exports.enlargedHistogramBins = exports.histogramBins = exports.TimestampStepMap = undefined;

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _FILTER_TYPES$timeRan, _FILTER_TYPES$range, _SupportedPlotType, _FILTER_COMPONENTS; // Copyright (c) 2018 Uber Technologies, Inc.
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

exports.getDefaultFilter = getDefaultFilter;
exports.getFilterProps = getFilterProps;
exports.getFieldDomain = getFieldDomain;
exports.filterData = filterData;
exports.isDataMatchFilter = isDataMatchFilter;
exports.adjustValueToFilterDomain = adjustValueToFilterDomain;
exports.getNumericFieldDomain = getNumericFieldDomain;
exports.getTimestampFieldDomain = getTimestampFieldDomain;
exports.histogramConstruct = histogramConstruct;
exports.formatNumberByStep = formatNumberByStep;
exports.isInRange = isInRange;
exports.getTimeWidgetTitleFormatter = getTimeWidgetTitleFormatter;
exports.getTimeWidgetHintFormatter = getTimeWidgetHintFormatter;
exports.isValidFilterValue = isValidFilterValue;
exports.getFilterPlot = getFilterPlot;
exports.getDefaultFilterPlotType = getDefaultFilterPlotType;

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _d3Array = require('d3-array');

var _keymirror = require('keymirror');

var _keymirror2 = _interopRequireDefault(_keymirror);

var _defaultSettings = require('../constants/default-settings');

var _dataUtils = require('./data-utils');

var _dataScaleUtils = require('./data-scale-utils');

var ScaleUtils = _interopRequireWildcard(_dataScaleUtils);

var _utils = require('./utils');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TimestampStepMap = exports.TimestampStepMap = [{ max: 1, step: 0.05 }, { max: 10, step: 0.1 }, { max: 100, step: 1 }, { max: 500, step: 5 }, { max: 1000, step: 10 }, { max: 5000, step: 50 }, { max: Number.POSITIVE_INFINITY, step: 1000 }];

var histogramBins = exports.histogramBins = 30;
var enlargedHistogramBins = exports.enlargedHistogramBins = 100;

var durationSecond = 1000;
var durationMinute = durationSecond * 60;
var durationHour = durationMinute * 60;
var durationDay = durationHour * 24;
var durationWeek = durationDay * 7;
var durationYear = durationDay * 365;

var FILTER_TYPES = exports.FILTER_TYPES = (0, _keymirror2.default)({
  range: null,
  select: null,
  timeRange: null,
  multiSelect: null
});

var PLOT_TYPES = exports.PLOT_TYPES = (0, _keymirror2.default)({
  histogram: null,
  lineChart: null
});

var SupportedPlotType = (_SupportedPlotType = {}, (0, _defineProperty3.default)(_SupportedPlotType, FILTER_TYPES.timeRange, (_FILTER_TYPES$timeRan = {
  default: 'histogram'
}, (0, _defineProperty3.default)(_FILTER_TYPES$timeRan, _defaultSettings.ALL_FIELD_TYPES.integer, 'lineChart'), (0, _defineProperty3.default)(_FILTER_TYPES$timeRan, _defaultSettings.ALL_FIELD_TYPES.real, 'lineChart'), _FILTER_TYPES$timeRan)), (0, _defineProperty3.default)(_SupportedPlotType, FILTER_TYPES.range, (_FILTER_TYPES$range = {
  default: 'histogram'
}, (0, _defineProperty3.default)(_FILTER_TYPES$range, _defaultSettings.ALL_FIELD_TYPES.integer, 'lineChart'), (0, _defineProperty3.default)(_FILTER_TYPES$range, _defaultSettings.ALL_FIELD_TYPES.real, 'lineChart'), _FILTER_TYPES$range)), _SupportedPlotType);

var FILTER_COMPONENTS = exports.FILTER_COMPONENTS = (_FILTER_COMPONENTS = {}, (0, _defineProperty3.default)(_FILTER_COMPONENTS, FILTER_TYPES.select, 'SingleSelectFilter'), (0, _defineProperty3.default)(_FILTER_COMPONENTS, FILTER_TYPES.multiSelect, 'MultiSelectFilter'), (0, _defineProperty3.default)(_FILTER_COMPONENTS, FILTER_TYPES.timeRange, 'TimeRangeFilter'), (0, _defineProperty3.default)(_FILTER_COMPONENTS, FILTER_TYPES.range, 'RangeFilter'), _FILTER_COMPONENTS);

var BASE_SPEED = exports.BASE_SPEED = 600;
var TIME_ANIMATION_SPEED = exports.TIME_ANIMATION_SPEED = [{
  label: '0.5x',
  value: 0.5
}, {
  label: '1x',
  value: 1
}, {
  label: '2x',
  value: 2
}, {
  label: '4x',
  value: 4
}];

function getDefaultFilter(dataId) {
  return {
    // link to dataset Id
    dataId: dataId,
    // should allow to edit dataId
    freeze: false,
    id: (0, _utils.generateHashId)(4),

    // time range filter specific
    fixedDomain: false,
    enlarged: false,
    isAnimating: false,
    speed: 1,

    // field specific
    name: null,
    type: null,
    fieldIdx: null,
    domain: null,
    value: null,

    // plot
    plotType: PLOT_TYPES.histogram,
    yAxis: null,
    interval: null
  };
}

/**
 * Get default filter prop based on field type
 *
 * @param {Object[]} data
 * @param {object} field
 * @returns {object} default filter
 */
function getFilterProps(data, field) {
  var filterProp = (0, _extends3.default)({}, getFieldDomain(data, field), {
    fieldType: field.type
  });

  switch (field.type) {
    case _defaultSettings.ALL_FIELD_TYPES.real:
    case _defaultSettings.ALL_FIELD_TYPES.integer:
      return (0, _extends3.default)({}, filterProp, {
        value: filterProp.domain,
        type: FILTER_TYPES.range,
        typeOptions: [FILTER_TYPES.range]
      });

    case _defaultSettings.ALL_FIELD_TYPES.boolean:
      return (0, _extends3.default)({}, filterProp, {
        type: FILTER_TYPES.select,
        value: true
      });

    case _defaultSettings.ALL_FIELD_TYPES.string:
    case _defaultSettings.ALL_FIELD_TYPES.date:
      return (0, _extends3.default)({}, filterProp, {
        type: FILTER_TYPES.multiSelect,
        value: []
      });

    case _defaultSettings.ALL_FIELD_TYPES.timestamp:
      return (0, _extends3.default)({}, filterProp, {
        type: FILTER_TYPES.timeRange,
        enlarged: true,
        fixedDomain: true,
        value: filterProp.domain
      });

    default:
      return {};
  }
}

/**
 * Calculate field domain based on field type and data
 *
 * @param {Object[]} data
 * @param {object} field
 * @returns {object} with domain as key
 */
function getFieldDomain(data, field) {
  var fieldIdx = field.tableFieldIndex - 1;
  var isTime = field.type === _defaultSettings.ALL_FIELD_TYPES.timestamp;
  var valueAccessor = _dataUtils.maybeToDate.bind(null, isTime, fieldIdx, field.format);
  var domain = void 0;

  switch (field.type) {
    case _defaultSettings.ALL_FIELD_TYPES.real:
    case _defaultSettings.ALL_FIELD_TYPES.integer:
      // calculate domain and step
      return getNumericFieldDomain(data, valueAccessor);

    case _defaultSettings.ALL_FIELD_TYPES.boolean:
      return { domain: [true, false] };

    case _defaultSettings.ALL_FIELD_TYPES.string:
    case _defaultSettings.ALL_FIELD_TYPES.date:
      domain = ScaleUtils.getOrdinalDomain(data, valueAccessor);
      return { domain: domain };

    case _defaultSettings.ALL_FIELD_TYPES.timestamp:
      return getTimestampFieldDomain(data, valueAccessor);

    default:
      return { domain: ScaleUtils.getOrdinalDomain(data, valueAccessor) };
  }
}

/**
 * Filter data based on an array of filters
 *
 * @param {Object[]} data
 * @param {string} dataId
 * @param {Object[]} filters
 * @returns {Object[]} data
 * @returns {Number[]} filteredIndex
 */
function filterData(data, dataId, filters) {
  if (!data || !dataId) {
    // why would there not be any data? are we over doing this?
    return { data: [], filteredIndex: [] };
  }

  if (!filters.length) {
    return { data: data, filteredIndex: data.map(function (d, i) {
        return i;
      }) };
  }

  var appliedFilters = filters.filter(function (d) {
    return d.dataId === dataId && d.fieldIdx > -1 && d.value !== null;
  });

  var _appliedFilters$reduc = appliedFilters.reduce(function (accu, f) {
    if (f.dataId === dataId && f.fieldIdx > -1 && f.value !== null) {
      (f.fixedDomain ? accu[1] : accu[0]).push(f);
    }
    return accu;
  }, [[], []]),
      _appliedFilters$reduc2 = (0, _slicedToArray3.default)(_appliedFilters$reduc, 2),
      dynamicDomainFilters = _appliedFilters$reduc2[0],
      fixedDomainFilters = _appliedFilters$reduc2[1];
  // console.log(dynamicDomainFilters)
  // console.log(fixedDomainFilters)
  // we save a reference of allData index here to access dataToFeature
  // in geojson and hexgonId layer
  // console.time('filterData');

  var _data$reduce = data.reduce(function (accu, d, i) {
    // generate 2 sets of
    // filter data used to calculate layer Domain
    var matchForDomain = dynamicDomainFilters.every(function (filter) {
      return isDataMatchFilter(d, filter, i);
    });

    if (matchForDomain) {
      accu.filteredIndexForDomain.push(i);

      // filter data for render
      var matchForRender = fixedDomainFilters.every(function (filter) {
        return isDataMatchFilter(d, filter, i);
      });

      if (matchForRender) {
        accu.filtered.push(d);
        accu.filteredIndex.push(i);
      }
    }

    return accu;
  }, { filtered: [], filteredIndex: [], filteredIndexForDomain: [] }),
      filtered = _data$reduce.filtered,
      filteredIndex = _data$reduce.filteredIndex,
      filteredIndexForDomain = _data$reduce.filteredIndexForDomain;

  // console.log('data==', data.length)
  // console.log('filtered==', filtered.length)
  // console.log('filteredIndex==', filteredIndex.length)
  // console.log('filteredIndexForDomain==', filteredIndexForDomain.length)
  //
  // console.timeEnd('filterData');

  return { data: filtered, filteredIndex: filteredIndex, filteredIndexForDomain: filteredIndexForDomain };
}

/**
 * Check if value is in range of filter
 *
 * @param {Object[]} data
 * @param {Object} filter
 * @param {number} i
 * @returns {Boolean} - whether value falls in the range of the filter
 */
function isDataMatchFilter(data, filter, i) {
  var val = data[filter.fieldIdx];
  if (!filter.type) {
    return true;
  }

  switch (filter.type) {
    case FILTER_TYPES.range:
      return isInRange(val, filter.value);

    case FILTER_TYPES.timeRange:
      var timeVal = filter.mappedValue ? filter.mappedValue[i] : _moment2.default.utc(val).valueOf();
      return isInRange(timeVal, filter.value);

    case FILTER_TYPES.multiSelect:
      return filter.value.includes(val);

    case FILTER_TYPES.select:
      return filter.value === val;

    default:
      return true;
  }
}

/**
 * Call by parsing filters from URL
 * Check if value of filter within filter domain, if not adjust it to match
 * filter domain
 *
 * @param {string[] | string | number | number[]} value
 * @param {Array} filter.domain
 * @param {String} filter.type
 * @returns {*} - adjusted value to match filter or null to remove filter
 */

/* eslint-disable complexity */
function adjustValueToFilterDomain(value, _ref) {
  var domain = _ref.domain,
      type = _ref.type;

  if (!domain || !type) {
    return false;
  }

  switch (type) {
    case FILTER_TYPES.range:
    case FILTER_TYPES.timeRange:
      if (!Array.isArray(value) || value.length !== 2) {
        return domain.map(function (d) {
          return d;
        });
      }

      return value.map(function (d, i) {
        return (0, _dataUtils.notNullorUndefined)(d) && isInRange(d, domain) ? d : domain[i];
      });

    case FILTER_TYPES.multiSelect:
      if (!Array.isArray(value)) {
        return [];
      }
      var filteredValue = value.filter(function (d) {
        return domain.includes(d);
      });
      return filteredValue.length ? filteredValue : [];

    case FILTER_TYPES.select:
      return domain.includes(value) ? value : true;

    default:
      return null;
  }
}
/* eslint-enable complexity */

/**
 * Calculate numeric domain and suitable step
 *
 * @param {Object[]} data
 * @param {function} valueAccessor
 * @returns {object} domain and step
 */
function getNumericFieldDomain(data, valueAccessor) {
  var domain = [0, 1];
  var step = 0.1;

  var mappedValue = Array.isArray(data) ? data.map(valueAccessor) : [];

  if (Array.isArray(data) && data.length > 1) {
    domain = ScaleUtils.getLinearDomain(mappedValue);
    var diff = domain[1] - domain[0];

    // in case equal domain, [96, 96], which will break quantize scale
    if (!diff) {
      domain[1] = domain[0] + 1;
    }

    step = getNumericStepSize(diff) || step;
    domain[0] = formatNumberByStep(domain[0], step, 'floor');
    domain[1] = formatNumberByStep(domain[1], step, 'ceil');
  }

  var _getHistogram = getHistogram(domain, mappedValue),
      histogram = _getHistogram.histogram,
      enlargedHistogram = _getHistogram.enlargedHistogram;

  return { domain: domain, step: step, histogram: histogram, enlargedHistogram: enlargedHistogram };
}

function getNumericStepSize(diff) {
  if (diff > 100) {
    return 1;
  } else if (diff < 20 && diff > 3) {
    return 0.01;
  } else if (diff <= 3) {
    return 0.001;
  }
}

/**
 * Calculate timestamp domain and suitable step
 *
 * @param {Object[]} data
 * @param {function} valueAccessor
 * @returns {object} domain and step
 */
function getTimestampFieldDomain(data, valueAccessor) {
  // to avoid converting string format time to epoch
  // every time we compare we store a value mapped to int in filter domain

  var mappedValue = Array.isArray(data) ? data.map(valueAccessor) : [];
  var domain = ScaleUtils.getLinearDomain(mappedValue);
  var step = 0.01;

  var diff = domain[1] - domain[0];
  var entry = TimestampStepMap.find(function (f) {
    return f.max >= diff;
  });
  if (entry) {
    step = entry.step;
  }

  var _getHistogram2 = getHistogram(domain, mappedValue),
      histogram = _getHistogram2.histogram,
      enlargedHistogram = _getHistogram2.enlargedHistogram;

  return { domain: domain, step: step, mappedValue: mappedValue, histogram: histogram, enlargedHistogram: enlargedHistogram };
}

function histogramConstruct(domain, mappedValue, bins) {
  return (0, _d3Array.histogram)().thresholds((0, _d3Array.ticks)(domain[0], domain[1], bins)).domain(domain)(mappedValue).map(function (bin) {
    return {
      count: bin.length,
      x0: bin.x0,
      x1: bin.x1
    };
  });
}
/**
 * Calculate histogram from domain and array of values
 *
 * @param {number[]} domain
 * @param {Object[]} mappedValue
 * @returns {Array[]} histogram
 */
function getHistogram(domain, mappedValue) {
  var histogram = histogramConstruct(domain, mappedValue, histogramBins);
  var enlargedHistogram = histogramConstruct(domain, mappedValue, enlargedHistogramBins);

  return { histogram: histogram, enlargedHistogram: enlargedHistogram };
}

/**
 * round number based on step
 *
 * @param {number} val
 * @param {number} step
 * @param {string} bound
 * @returns {number} rounded number
 */
function formatNumberByStep(val, step, bound) {
  if (bound === 'floor') {
    return Math.floor(val * (1 / step)) / (1 / step);
  }

  return Math.ceil(val * (1 / step)) / (1 / step);
}

function isInRange(val, domain) {
  if (!Array.isArray(domain)) {
    return false;
  }

  return val >= domain[0] && val <= domain[1];
}

function getTimeWidgetTitleFormatter(domain) {
  if (!Array.isArray(domain)) {
    return null;
  }

  var diff = domain[1] - domain[0];
  return diff > durationYear ? 'MM/DD/YY' : diff > durationDay ? 'MM/DD hha' : 'MM/DD hh:mma';
}

function getTimeWidgetHintFormatter(domain) {
  if (!Array.isArray(domain)) {
    return null;
  }

  var diff = domain[1] - domain[0];
  return diff > durationYear ? 'MM/DD/YY' : diff > durationWeek ? 'MM/DD' : diff > durationDay ? 'MM/DD hha' : diff > durationHour ? 'hh:mma' : 'hh:mm:ssa';
}

/**
 * Sanity check on filters to prepare for save
 * @param {String} type - filter type
 * @param {*} value - filter value
 * @returns {boolean} whether filter is value
 */
function isValidFilterValue(_ref2) {
  var type = _ref2.type,
      value = _ref2.value;

  if (!type) {
    return false;
  }
  switch (type) {
    case FILTER_TYPES.select:
      return value === true || value === false;

    case FILTER_TYPES.range:
    case FILTER_TYPES.timeRange:
      return Array.isArray(value) && value.every(function (v) {
        return v !== null && !isNaN(v);
      });

    case FILTER_TYPES.multiSelect:
      return Array.isArray(value) && Boolean(value.length);

    case FILTER_TYPES.input:
      return Boolean(value.length);

    default:
      return true;
  }
}

function getFilterPlot(filter, allData) {
  if (filter.plotType === PLOT_TYPES.histogram || !filter.yAxis) {
    // histogram should be calculated when create filter
    return {};
  }

  var mappedValue = filter.mappedValue;
  var yAxis = filter.yAxis;

  // return lineChart

  var series = allData.map(function (d, i) {
    return {
      x: mappedValue[i],
      y: d[yAxis.tableFieldIndex - 1]
    };
  }).filter(function (_ref3) {
    var x = _ref3.x,
        y = _ref3.y;
    return Number.isFinite(x) && Number.isFinite(y);
  }).sort(function (a, b) {
    return (0, _d3Array.ascending)(a.x, b.x);
  });

  var yDomain = (0, _d3Array.extent)(series, function (d) {
    return d.y;
  });
  var xDomain = [series[0].x, series[series.length - 1].x];

  return { lineChart: { series: series, yDomain: yDomain, xDomain: xDomain }, yAxis: yAxis };
}

function getDefaultFilterPlotType(filter) {
  var filterPlotTypes = SupportedPlotType[filter.type];
  if (!filterPlotTypes) {
    return null;
  }

  if (!filter.yAxis) {
    return filterPlotTypes.default;
  }

  return filterPlotTypes[filter.yAxis.type] || null;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9maWx0ZXItdXRpbHMuanMiXSwibmFtZXMiOlsiZ2V0RGVmYXVsdEZpbHRlciIsImdldEZpbHRlclByb3BzIiwiZ2V0RmllbGREb21haW4iLCJmaWx0ZXJEYXRhIiwiaXNEYXRhTWF0Y2hGaWx0ZXIiLCJhZGp1c3RWYWx1ZVRvRmlsdGVyRG9tYWluIiwiZ2V0TnVtZXJpY0ZpZWxkRG9tYWluIiwiZ2V0VGltZXN0YW1wRmllbGREb21haW4iLCJoaXN0b2dyYW1Db25zdHJ1Y3QiLCJmb3JtYXROdW1iZXJCeVN0ZXAiLCJpc0luUmFuZ2UiLCJnZXRUaW1lV2lkZ2V0VGl0bGVGb3JtYXR0ZXIiLCJnZXRUaW1lV2lkZ2V0SGludEZvcm1hdHRlciIsImlzVmFsaWRGaWx0ZXJWYWx1ZSIsImdldEZpbHRlclBsb3QiLCJnZXREZWZhdWx0RmlsdGVyUGxvdFR5cGUiLCJTY2FsZVV0aWxzIiwiVGltZXN0YW1wU3RlcE1hcCIsIm1heCIsInN0ZXAiLCJOdW1iZXIiLCJQT1NJVElWRV9JTkZJTklUWSIsImhpc3RvZ3JhbUJpbnMiLCJlbmxhcmdlZEhpc3RvZ3JhbUJpbnMiLCJkdXJhdGlvblNlY29uZCIsImR1cmF0aW9uTWludXRlIiwiZHVyYXRpb25Ib3VyIiwiZHVyYXRpb25EYXkiLCJkdXJhdGlvbldlZWsiLCJkdXJhdGlvblllYXIiLCJGSUxURVJfVFlQRVMiLCJyYW5nZSIsInNlbGVjdCIsInRpbWVSYW5nZSIsIm11bHRpU2VsZWN0IiwiUExPVF9UWVBFUyIsImhpc3RvZ3JhbSIsImxpbmVDaGFydCIsIlN1cHBvcnRlZFBsb3RUeXBlIiwiZGVmYXVsdCIsIkFMTF9GSUVMRF9UWVBFUyIsImludGVnZXIiLCJyZWFsIiwiRklMVEVSX0NPTVBPTkVOVFMiLCJCQVNFX1NQRUVEIiwiVElNRV9BTklNQVRJT05fU1BFRUQiLCJsYWJlbCIsInZhbHVlIiwiZGF0YUlkIiwiZnJlZXplIiwiaWQiLCJmaXhlZERvbWFpbiIsImVubGFyZ2VkIiwiaXNBbmltYXRpbmciLCJzcGVlZCIsIm5hbWUiLCJ0eXBlIiwiZmllbGRJZHgiLCJkb21haW4iLCJwbG90VHlwZSIsInlBeGlzIiwiaW50ZXJ2YWwiLCJkYXRhIiwiZmllbGQiLCJmaWx0ZXJQcm9wIiwiZmllbGRUeXBlIiwidHlwZU9wdGlvbnMiLCJib29sZWFuIiwic3RyaW5nIiwiZGF0ZSIsInRpbWVzdGFtcCIsInRhYmxlRmllbGRJbmRleCIsImlzVGltZSIsInZhbHVlQWNjZXNzb3IiLCJtYXliZVRvRGF0ZSIsImJpbmQiLCJmb3JtYXQiLCJnZXRPcmRpbmFsRG9tYWluIiwiZmlsdGVycyIsImZpbHRlcmVkSW5kZXgiLCJsZW5ndGgiLCJtYXAiLCJkIiwiaSIsImFwcGxpZWRGaWx0ZXJzIiwiZmlsdGVyIiwicmVkdWNlIiwiYWNjdSIsImYiLCJwdXNoIiwiZHluYW1pY0RvbWFpbkZpbHRlcnMiLCJmaXhlZERvbWFpbkZpbHRlcnMiLCJtYXRjaEZvckRvbWFpbiIsImV2ZXJ5IiwiZmlsdGVyZWRJbmRleEZvckRvbWFpbiIsIm1hdGNoRm9yUmVuZGVyIiwiZmlsdGVyZWQiLCJ2YWwiLCJ0aW1lVmFsIiwibWFwcGVkVmFsdWUiLCJtb21lbnQiLCJ1dGMiLCJ2YWx1ZU9mIiwiaW5jbHVkZXMiLCJBcnJheSIsImlzQXJyYXkiLCJmaWx0ZXJlZFZhbHVlIiwiZ2V0TGluZWFyRG9tYWluIiwiZGlmZiIsImdldE51bWVyaWNTdGVwU2l6ZSIsImdldEhpc3RvZ3JhbSIsImVubGFyZ2VkSGlzdG9ncmFtIiwiZW50cnkiLCJmaW5kIiwiYmlucyIsInRocmVzaG9sZHMiLCJjb3VudCIsImJpbiIsIngwIiwieDEiLCJib3VuZCIsIk1hdGgiLCJmbG9vciIsImNlaWwiLCJ2IiwiaXNOYU4iLCJCb29sZWFuIiwiaW5wdXQiLCJhbGxEYXRhIiwic2VyaWVzIiwieCIsInkiLCJpc0Zpbml0ZSIsInNvcnQiLCJhIiwiYiIsInlEb21haW4iLCJ4RG9tYWluIiwiZmlsdGVyUGxvdFR5cGVzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7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QkFBVCxDQUFrQ3NFLE1BQWxDLEVBQTBDO0FBQy9DLE1BQU1xRCxrQkFBa0JwRyxrQkFBa0IrQyxPQUFPN0IsSUFBekIsQ0FBeEI7QUFDQSxNQUFJLENBQUNrRixlQUFMLEVBQXNCO0FBQ3BCLFdBQU8sSUFBUDtBQUNEOztBQUVELE1BQUksQ0FBQ3JELE9BQU96QixLQUFaLEVBQW1CO0FBQ2pCLFdBQU84RSxnQkFBZ0JuRyxPQUF2QjtBQUNEOztBQUVELFNBQU9tRyxnQkFBZ0JyRCxPQUFPekIsS0FBUCxDQUFhSixJQUE3QixLQUFzQyxJQUE3QztBQUNEIiwiZmlsZSI6ImZpbHRlci11dGlscy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgMjAxOCBVYmVyIFRlY2hub2xvZ2llcywgSW5jLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbi8vIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbi8vIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbi8vIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbi8vIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuLy8gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuLy8gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4vLyBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbi8vIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbi8vIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4vLyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4vLyBUSEUgU09GVFdBUkUuXG5cbmltcG9ydCBtb21lbnQgZnJvbSAnbW9tZW50JztcbmltcG9ydCB7YXNjZW5kaW5nLCBleHRlbnQsIGhpc3RvZ3JhbSBhcyBkM0hpc3RvZ3JhbSwgdGlja3N9IGZyb20gJ2QzLWFycmF5JztcbmltcG9ydCBrZXlNaXJyb3IgZnJvbSAna2V5bWlycm9yJztcblxuaW1wb3J0IHtBTExfRklFTERfVFlQRVN9IGZyb20gJ2NvbnN0YW50cy9kZWZhdWx0LXNldHRpbmdzJztcbmltcG9ydCB7bWF5YmVUb0RhdGUsIG5vdE51bGxvclVuZGVmaW5lZH0gZnJvbSAnLi9kYXRhLXV0aWxzJztcbmltcG9ydCAqIGFzIFNjYWxlVXRpbHMgZnJvbSAnLi9kYXRhLXNjYWxlLXV0aWxzJztcbmltcG9ydCB7Z2VuZXJhdGVIYXNoSWR9IGZyb20gJy4vdXRpbHMnO1xuXG5leHBvcnQgY29uc3QgVGltZXN0YW1wU3RlcE1hcCA9IFtcbiAge21heDogMSwgc3RlcDogMC4wNX0sXG4gIHttYXg6IDEwLCBzdGVwOiAwLjF9LFxuICB7bWF4OiAxMDAsIHN0ZXA6IDF9LFxuICB7bWF4OiA1MDAsIHN0ZXA6IDV9LFxuICB7bWF4OiAxMDAwLCBzdGVwOiAxMH0sXG4gIHttYXg6IDUwMDAsIHN0ZXA6IDUwfSxcbiAge21heDogTnVtYmVyLlBPU0lUSVZFX0lORklOSVRZLCBzdGVwOiAxMDAwfVxuXTtcblxuZXhwb3J0IGNvbnN0IGhpc3RvZ3JhbUJpbnMgPSAzMDtcbmV4cG9ydCBjb25zdCBlbmxhcmdlZEhpc3RvZ3JhbUJpbnMgPSAxMDA7XG5cbmNvbnN0IGR1cmF0aW9uU2Vjb25kID0gMTAwMDtcbmNvbnN0IGR1cmF0aW9uTWludXRlID0gZHVyYXRpb25TZWNvbmQgKiA2MDtcbmNvbnN0IGR1cmF0aW9uSG91ciA9IGR1cmF0aW9uTWludXRlICogNjA7XG5jb25zdCBkdXJhdGlvbkRheSA9IGR1cmF0aW9uSG91ciAqIDI0O1xuY29uc3QgZHVyYXRpb25XZWVrID0gZHVyYXRpb25EYXkgKiA3O1xuY29uc3QgZHVyYXRpb25ZZWFyID0gZHVyYXRpb25EYXkgKiAzNjU7XG5cbmV4cG9ydCBjb25zdCBGSUxURVJfVFlQRVMgPSBrZXlNaXJyb3Ioe1xuICByYW5nZTogbnVsbCxcbiAgc2VsZWN0OiBudWxsLFxuICB0aW1lUmFuZ2U6IG51bGwsXG4gIG11bHRpU2VsZWN0OiBudWxsXG59KTtcblxuZXhwb3J0IGNvbnN0IFBMT1RfVFlQRVMgPSBrZXlNaXJyb3Ioe1xuICBoaXN0b2dyYW06IG51bGwsXG4gIGxpbmVDaGFydDogbnVsbFxufSk7XG5cbmNvbnN0IFN1cHBvcnRlZFBsb3RUeXBlID0ge1xuICBbRklMVEVSX1RZUEVTLnRpbWVSYW5nZV06IHtcbiAgICBkZWZhdWx0OiAnaGlzdG9ncmFtJyxcbiAgICBbQUxMX0ZJRUxEX1RZUEVTLmludGVnZXJdOiAnbGluZUNoYXJ0JyxcbiAgICBbQUxMX0ZJRUxEX1RZUEVTLnJlYWxdOiAnbGluZUNoYXJ0J1xuICB9LFxuICBbRklMVEVSX1RZUEVTLnJhbmdlXToge1xuICAgIGRlZmF1bHQ6ICdoaXN0b2dyYW0nLFxuICAgIFtBTExfRklFTERfVFlQRVMuaW50ZWdlcl06ICdsaW5lQ2hhcnQnLFxuICAgIFtBTExfRklFTERfVFlQRVMucmVhbF06ICdsaW5lQ2hhcnQnXG4gIH1cbn07XG5cbmV4cG9ydCBjb25zdCBGSUxURVJfQ09NUE9ORU5UUyA9IHtcbiAgW0ZJTFRFUl9UWVBFUy5zZWxlY3RdOiAnU2luZ2xlU2VsZWN0RmlsdGVyJyxcbiAgW0ZJTFRFUl9UWVBFUy5tdWx0aVNlbGVjdF06ICdNdWx0aVNlbGVjdEZpbHRlcicsXG4gIFtGSUxURVJfVFlQRVMudGltZVJhbmdlXTogJ1RpbWVSYW5nZUZpbHRlcicsXG4gIFtGSUxURVJfVFlQRVMucmFuZ2VdOiAnUmFuZ2VGaWx0ZXInXG59O1xuXG5leHBvcnQgY29uc3QgQkFTRV9TUEVFRCA9IDYwMDtcbmV4cG9ydCBjb25zdCBUSU1FX0FOSU1BVElPTl9TUEVFRCA9IFtcbiAge1xuICAgIGxhYmVsOiAnMC41eCcsXG4gICAgdmFsdWU6IDAuNVxuICB9LFxuICB7XG4gICAgbGFiZWw6ICcxeCcsXG4gICAgdmFsdWU6IDFcbiAgfSxcbiAge1xuICAgIGxhYmVsOiAnMngnLFxuICAgIHZhbHVlOiAyXG4gIH0sXG4gIHtcbiAgICBsYWJlbDogJzR4JyxcbiAgICB2YWx1ZTogNFxuICB9XG5dO1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0RGVmYXVsdEZpbHRlcihkYXRhSWQpIHtcbiAgcmV0dXJuIHtcbiAgICAvLyBsaW5rIHRvIGRhdGFzZXQgSWRcbiAgICBkYXRhSWQsXG4gICAgLy8gc2hvdWxkIGFsbG93IHRvIGVkaXQgZGF0YUlkXG4gICAgZnJlZXplOiBmYWxzZSxcbiAgICBpZDogZ2VuZXJhdGVIYXNoSWQoNCksXG5cbiAgICAvLyB0aW1lIHJhbmdlIGZpbHRlciBzcGVjaWZpY1xuICAgIGZpeGVkRG9tYWluOiBmYWxzZSxcbiAgICBlbmxhcmdlZDogZmFsc2UsXG4gICAgaXNBbmltYXRpbmc6IGZhbHNlLFxuICAgIHNwZWVkOiAxLFxuXG4gICAgLy8gZmllbGQgc3BlY2lmaWNcbiAgICBuYW1lOiBudWxsLFxuICAgIHR5cGU6IG51bGwsXG4gICAgZmllbGRJZHg6IG51bGwsXG4gICAgZG9tYWluOiBudWxsLFxuICAgIHZhbHVlOiBudWxsLFxuXG4gICAgLy8gcGxvdFxuICAgIHBsb3RUeXBlOiBQTE9UX1RZUEVTLmhpc3RvZ3JhbSxcbiAgICB5QXhpczogbnVsbCxcbiAgICBpbnRlcnZhbDogbnVsbFxuICB9O1xufVxuXG4vKipcbiAqIEdldCBkZWZhdWx0IGZpbHRlciBwcm9wIGJhc2VkIG9uIGZpZWxkIHR5cGVcbiAqXG4gKiBAcGFyYW0ge09iamVjdFtdfSBkYXRhXG4gKiBAcGFyYW0ge29iamVjdH0gZmllbGRcbiAqIEByZXR1cm5zIHtvYmplY3R9IGRlZmF1bHQgZmlsdGVyXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRGaWx0ZXJQcm9wcyhkYXRhLCBmaWVsZCkge1xuICBjb25zdCBmaWx0ZXJQcm9wID0ge1xuICAgIC4uLmdldEZpZWxkRG9tYWluKGRhdGEsIGZpZWxkKSxcbiAgICBmaWVsZFR5cGU6IGZpZWxkLnR5cGVcbiAgfTtcblxuICBzd2l0Y2ggKGZpZWxkLnR5cGUpIHtcbiAgICBjYXNlIEFMTF9GSUVMRF9UWVBFUy5yZWFsOlxuICAgIGNhc2UgQUxMX0ZJRUxEX1RZUEVTLmludGVnZXI6XG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5maWx0ZXJQcm9wLFxuICAgICAgICB2YWx1ZTogZmlsdGVyUHJvcC5kb21haW4sXG4gICAgICAgIHR5cGU6IEZJTFRFUl9UWVBFUy5yYW5nZSxcbiAgICAgICAgdHlwZU9wdGlvbnM6IFtGSUxURVJfVFlQRVMucmFuZ2VdXG4gICAgICB9O1xuXG4gICAgY2FzZSBBTExfRklFTERfVFlQRVMuYm9vbGVhbjpcbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLmZpbHRlclByb3AsXG4gICAgICAgIHR5cGU6IEZJTFRFUl9UWVBFUy5zZWxlY3QsXG4gICAgICAgIHZhbHVlOiB0cnVlXG4gICAgICB9O1xuXG4gICAgY2FzZSBBTExfRklFTERfVFlQRVMuc3RyaW5nOlxuICAgIGNhc2UgQUxMX0ZJRUxEX1RZUEVTLmRhdGU6XG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5maWx0ZXJQcm9wLFxuICAgICAgICB0eXBlOiBGSUxURVJfVFlQRVMubXVsdGlTZWxlY3QsXG4gICAgICAgIHZhbHVlOiBbXVxuICAgICAgfTtcblxuICAgIGNhc2UgQUxMX0ZJRUxEX1RZUEVTLnRpbWVzdGFtcDpcbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLmZpbHRlclByb3AsXG4gICAgICAgIHR5cGU6IEZJTFRFUl9UWVBFUy50aW1lUmFuZ2UsXG4gICAgICAgIGVubGFyZ2VkOiB0cnVlLFxuICAgICAgICBmaXhlZERvbWFpbjogdHJ1ZSxcbiAgICAgICAgdmFsdWU6IGZpbHRlclByb3AuZG9tYWluXG4gICAgICB9O1xuXG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiB7fTtcbiAgfVxufVxuXG4vKipcbiAqIENhbGN1bGF0ZSBmaWVsZCBkb21haW4gYmFzZWQgb24gZmllbGQgdHlwZSBhbmQgZGF0YVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0W119IGRhdGFcbiAqIEBwYXJhbSB7b2JqZWN0fSBmaWVsZFxuICogQHJldHVybnMge29iamVjdH0gd2l0aCBkb21haW4gYXMga2V5XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRGaWVsZERvbWFpbihkYXRhLCBmaWVsZCkge1xuICBjb25zdCBmaWVsZElkeCA9IGZpZWxkLnRhYmxlRmllbGRJbmRleCAtIDE7XG4gIGNvbnN0IGlzVGltZSA9IGZpZWxkLnR5cGUgPT09IEFMTF9GSUVMRF9UWVBFUy50aW1lc3RhbXA7XG4gIGNvbnN0IHZhbHVlQWNjZXNzb3IgPSBtYXliZVRvRGF0ZS5iaW5kKG51bGwsIGlzVGltZSwgZmllbGRJZHgsIGZpZWxkLmZvcm1hdCk7XG4gIGxldCBkb21haW47XG5cbiAgc3dpdGNoIChmaWVsZC50eXBlKSB7XG4gICAgY2FzZSBBTExfRklFTERfVFlQRVMucmVhbDpcbiAgICBjYXNlIEFMTF9GSUVMRF9UWVBFUy5pbnRlZ2VyOlxuICAgICAgLy8gY2FsY3VsYXRlIGRvbWFpbiBhbmQgc3RlcFxuICAgICAgcmV0dXJuIGdldE51bWVyaWNGaWVsZERvbWFpbihkYXRhLCB2YWx1ZUFjY2Vzc29yKTtcblxuICAgIGNhc2UgQUxMX0ZJRUxEX1RZUEVTLmJvb2xlYW46XG4gICAgICByZXR1cm4ge2RvbWFpbjogW3RydWUsIGZhbHNlXX07XG5cbiAgICBjYXNlIEFMTF9GSUVMRF9UWVBFUy5zdHJpbmc6XG4gICAgY2FzZSBBTExfRklFTERfVFlQRVMuZGF0ZTpcbiAgICAgIGRvbWFpbiA9IFNjYWxlVXRpbHMuZ2V0T3JkaW5hbERvbWFpbihkYXRhLCB2YWx1ZUFjY2Vzc29yKTtcbiAgICAgIHJldHVybiB7ZG9tYWlufTtcblxuICAgIGNhc2UgQUxMX0ZJRUxEX1RZUEVTLnRpbWVzdGFtcDpcbiAgICAgIHJldHVybiBnZXRUaW1lc3RhbXBGaWVsZERvbWFpbihkYXRhLCB2YWx1ZUFjY2Vzc29yKTtcblxuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4ge2RvbWFpbjogU2NhbGVVdGlscy5nZXRPcmRpbmFsRG9tYWluKGRhdGEsIHZhbHVlQWNjZXNzb3IpfTtcbiAgfVxufVxuXG4vKipcbiAqIEZpbHRlciBkYXRhIGJhc2VkIG9uIGFuIGFycmF5IG9mIGZpbHRlcnNcbiAqXG4gKiBAcGFyYW0ge09iamVjdFtdfSBkYXRhXG4gKiBAcGFyYW0ge3N0cmluZ30gZGF0YUlkXG4gKiBAcGFyYW0ge09iamVjdFtdfSBmaWx0ZXJzXG4gKiBAcmV0dXJucyB7T2JqZWN0W119IGRhdGFcbiAqIEByZXR1cm5zIHtOdW1iZXJbXX0gZmlsdGVyZWRJbmRleFxuICovXG5leHBvcnQgZnVuY3Rpb24gZmlsdGVyRGF0YShkYXRhLCBkYXRhSWQsIGZpbHRlcnMpIHtcbiAgaWYgKCFkYXRhIHx8ICFkYXRhSWQpIHtcbiAgICAvLyB3aHkgd291bGQgdGhlcmUgbm90IGJlIGFueSBkYXRhPyBhcmUgd2Ugb3ZlciBkb2luZyB0aGlzP1xuICAgIHJldHVybiB7ZGF0YTogW10sIGZpbHRlcmVkSW5kZXg6IFtdfTtcbiAgfVxuXG4gIGlmICghZmlsdGVycy5sZW5ndGgpIHtcbiAgICByZXR1cm4ge2RhdGEsIGZpbHRlcmVkSW5kZXg6IGRhdGEubWFwKChkLCBpKSA9PiBpKX07XG4gIH1cblxuICBjb25zdCBhcHBsaWVkRmlsdGVycyA9IGZpbHRlcnMuZmlsdGVyKFxuICAgIGQgPT4gZC5kYXRhSWQgPT09IGRhdGFJZCAmJiBkLmZpZWxkSWR4ID4gLTEgJiYgZC52YWx1ZSAhPT0gbnVsbFxuICApO1xuXG4gIGNvbnN0IFtkeW5hbWljRG9tYWluRmlsdGVycywgZml4ZWREb21haW5GaWx0ZXJzXSA9IGFwcGxpZWRGaWx0ZXJzLnJlZHVjZShcbiAgICAoYWNjdSwgZikgPT4ge1xuICAgICAgaWYgKGYuZGF0YUlkID09PSBkYXRhSWQgJiYgZi5maWVsZElkeCA+IC0xICYmIGYudmFsdWUgIT09IG51bGwpIHtcbiAgICAgICAgKGYuZml4ZWREb21haW4gPyBhY2N1WzFdIDogYWNjdVswXSkucHVzaChmKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBhY2N1O1xuICAgIH0sXG4gICAgW1tdLCBbXV1cbiAgKTtcbiAgLy8gY29uc29sZS5sb2coZHluYW1pY0RvbWFpbkZpbHRlcnMpXG4gIC8vIGNvbnNvbGUubG9nKGZpeGVkRG9tYWluRmlsdGVycylcbiAgLy8gd2Ugc2F2ZSBhIHJlZmVyZW5jZSBvZiBhbGxEYXRhIGluZGV4IGhlcmUgdG8gYWNjZXNzIGRhdGFUb0ZlYXR1cmVcbiAgLy8gaW4gZ2VvanNvbiBhbmQgaGV4Z29uSWQgbGF5ZXJcbiAgLy8gY29uc29sZS50aW1lKCdmaWx0ZXJEYXRhJyk7XG5cbiAgY29uc3Qge2ZpbHRlcmVkLCBmaWx0ZXJlZEluZGV4LCBmaWx0ZXJlZEluZGV4Rm9yRG9tYWlufSA9IGRhdGEucmVkdWNlKFxuICAgIChhY2N1LCBkLCBpKSA9PiB7XG4gICAgICAvLyBnZW5lcmF0ZSAyIHNldHMgb2ZcbiAgICAgIC8vIGZpbHRlciBkYXRhIHVzZWQgdG8gY2FsY3VsYXRlIGxheWVyIERvbWFpblxuICAgICAgY29uc3QgbWF0Y2hGb3JEb21haW4gPSBkeW5hbWljRG9tYWluRmlsdGVycy5ldmVyeShmaWx0ZXIgPT5cbiAgICAgICAgaXNEYXRhTWF0Y2hGaWx0ZXIoZCwgZmlsdGVyLCBpKVxuICAgICAgKTtcblxuICAgICAgaWYgKG1hdGNoRm9yRG9tYWluKSB7XG4gICAgICAgIGFjY3UuZmlsdGVyZWRJbmRleEZvckRvbWFpbi5wdXNoKGkpO1xuXG4gICAgICAgIC8vIGZpbHRlciBkYXRhIGZvciByZW5kZXJcbiAgICAgICAgY29uc3QgbWF0Y2hGb3JSZW5kZXIgPSBmaXhlZERvbWFpbkZpbHRlcnMuZXZlcnkoZmlsdGVyID0+XG4gICAgICAgICAgaXNEYXRhTWF0Y2hGaWx0ZXIoZCwgZmlsdGVyLCBpKVxuICAgICAgICApO1xuXG4gICAgICAgIGlmIChtYXRjaEZvclJlbmRlcikge1xuICAgICAgICAgIGFjY3UuZmlsdGVyZWQucHVzaChkKTtcbiAgICAgICAgICBhY2N1LmZpbHRlcmVkSW5kZXgucHVzaChpKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gYWNjdTtcbiAgICB9LFxuICAgIHtmaWx0ZXJlZDogW10sIGZpbHRlcmVkSW5kZXg6IFtdLCBmaWx0ZXJlZEluZGV4Rm9yRG9tYWluOiBbXX1cbiAgKTtcblxuICAvLyBjb25zb2xlLmxvZygnZGF0YT09JywgZGF0YS5sZW5ndGgpXG4gIC8vIGNvbnNvbGUubG9nKCdmaWx0ZXJlZD09JywgZmlsdGVyZWQubGVuZ3RoKVxuICAvLyBjb25zb2xlLmxvZygnZmlsdGVyZWRJbmRleD09JywgZmlsdGVyZWRJbmRleC5sZW5ndGgpXG4gIC8vIGNvbnNvbGUubG9nKCdmaWx0ZXJlZEluZGV4Rm9yRG9tYWluPT0nLCBmaWx0ZXJlZEluZGV4Rm9yRG9tYWluLmxlbmd0aClcbiAgLy9cbiAgLy8gY29uc29sZS50aW1lRW5kKCdmaWx0ZXJEYXRhJyk7XG5cbiAgcmV0dXJuIHtkYXRhOiBmaWx0ZXJlZCwgZmlsdGVyZWRJbmRleCwgZmlsdGVyZWRJbmRleEZvckRvbWFpbn07XG59XG5cbi8qKlxuICogQ2hlY2sgaWYgdmFsdWUgaXMgaW4gcmFuZ2Ugb2YgZmlsdGVyXG4gKlxuICogQHBhcmFtIHtPYmplY3RbXX0gZGF0YVxuICogQHBhcmFtIHtPYmplY3R9IGZpbHRlclxuICogQHBhcmFtIHtudW1iZXJ9IGlcbiAqIEByZXR1cm5zIHtCb29sZWFufSAtIHdoZXRoZXIgdmFsdWUgZmFsbHMgaW4gdGhlIHJhbmdlIG9mIHRoZSBmaWx0ZXJcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzRGF0YU1hdGNoRmlsdGVyKGRhdGEsIGZpbHRlciwgaSkge1xuICBjb25zdCB2YWwgPSBkYXRhW2ZpbHRlci5maWVsZElkeF07XG4gIGlmICghZmlsdGVyLnR5cGUpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIHN3aXRjaCAoZmlsdGVyLnR5cGUpIHtcbiAgICBjYXNlIEZJTFRFUl9UWVBFUy5yYW5nZTpcbiAgICAgIHJldHVybiBpc0luUmFuZ2UodmFsLCBmaWx0ZXIudmFsdWUpO1xuXG4gICAgY2FzZSBGSUxURVJfVFlQRVMudGltZVJhbmdlOlxuICAgICAgY29uc3QgdGltZVZhbCA9IGZpbHRlci5tYXBwZWRWYWx1ZVxuICAgICAgICA/IGZpbHRlci5tYXBwZWRWYWx1ZVtpXVxuICAgICAgICA6IG1vbWVudC51dGModmFsKS52YWx1ZU9mKCk7XG4gICAgICByZXR1cm4gaXNJblJhbmdlKHRpbWVWYWwsIGZpbHRlci52YWx1ZSk7XG5cbiAgICBjYXNlIEZJTFRFUl9UWVBFUy5tdWx0aVNlbGVjdDpcbiAgICAgIHJldHVybiBmaWx0ZXIudmFsdWUuaW5jbHVkZXModmFsKTtcblxuICAgIGNhc2UgRklMVEVSX1RZUEVTLnNlbGVjdDpcbiAgICAgIHJldHVybiBmaWx0ZXIudmFsdWUgPT09IHZhbDtcblxuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgfVxufVxuXG4vKipcbiAqIENhbGwgYnkgcGFyc2luZyBmaWx0ZXJzIGZyb20gVVJMXG4gKiBDaGVjayBpZiB2YWx1ZSBvZiBmaWx0ZXIgd2l0aGluIGZpbHRlciBkb21haW4sIGlmIG5vdCBhZGp1c3QgaXQgdG8gbWF0Y2hcbiAqIGZpbHRlciBkb21haW5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ1tdIHwgc3RyaW5nIHwgbnVtYmVyIHwgbnVtYmVyW119IHZhbHVlXG4gKiBAcGFyYW0ge0FycmF5fSBmaWx0ZXIuZG9tYWluXG4gKiBAcGFyYW0ge1N0cmluZ30gZmlsdGVyLnR5cGVcbiAqIEByZXR1cm5zIHsqfSAtIGFkanVzdGVkIHZhbHVlIHRvIG1hdGNoIGZpbHRlciBvciBudWxsIHRvIHJlbW92ZSBmaWx0ZXJcbiAqL1xuXG4vKiBlc2xpbnQtZGlzYWJsZSBjb21wbGV4aXR5ICovXG5leHBvcnQgZnVuY3Rpb24gYWRqdXN0VmFsdWVUb0ZpbHRlckRvbWFpbih2YWx1ZSwge2RvbWFpbiwgdHlwZX0pIHtcbiAgaWYgKCFkb21haW4gfHwgIXR5cGUpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBzd2l0Y2ggKHR5cGUpIHtcbiAgICBjYXNlIEZJTFRFUl9UWVBFUy5yYW5nZTpcbiAgICBjYXNlIEZJTFRFUl9UWVBFUy50aW1lUmFuZ2U6XG4gICAgICBpZiAoIUFycmF5LmlzQXJyYXkodmFsdWUpIHx8IHZhbHVlLmxlbmd0aCAhPT0gMikge1xuICAgICAgICByZXR1cm4gZG9tYWluLm1hcChkID0+IGQpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdmFsdWUubWFwKFxuICAgICAgICAoZCwgaSkgPT5cbiAgICAgICAgICBub3ROdWxsb3JVbmRlZmluZWQoZCkgJiYgaXNJblJhbmdlKGQsIGRvbWFpbikgPyBkIDogZG9tYWluW2ldXG4gICAgICApO1xuXG4gICAgY2FzZSBGSUxURVJfVFlQRVMubXVsdGlTZWxlY3Q6XG4gICAgICBpZiAoIUFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgICAgIHJldHVybiBbXTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IGZpbHRlcmVkVmFsdWUgPSB2YWx1ZS5maWx0ZXIoZCA9PiBkb21haW4uaW5jbHVkZXMoZCkpO1xuICAgICAgcmV0dXJuIGZpbHRlcmVkVmFsdWUubGVuZ3RoID8gZmlsdGVyZWRWYWx1ZSA6IFtdO1xuXG4gICAgY2FzZSBGSUxURVJfVFlQRVMuc2VsZWN0OlxuICAgICAgcmV0dXJuIGRvbWFpbi5pbmNsdWRlcyh2YWx1ZSkgPyB2YWx1ZSA6IHRydWU7XG5cbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIG51bGw7XG4gIH1cbn1cbi8qIGVzbGludC1lbmFibGUgY29tcGxleGl0eSAqL1xuXG4vKipcbiAqIENhbGN1bGF0ZSBudW1lcmljIGRvbWFpbiBhbmQgc3VpdGFibGUgc3RlcFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0W119IGRhdGFcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IHZhbHVlQWNjZXNzb3JcbiAqIEByZXR1cm5zIHtvYmplY3R9IGRvbWFpbiBhbmQgc3RlcFxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0TnVtZXJpY0ZpZWxkRG9tYWluKGRhdGEsIHZhbHVlQWNjZXNzb3IpIHtcbiAgbGV0IGRvbWFpbiA9IFswLCAxXTtcbiAgbGV0IHN0ZXAgPSAwLjE7XG5cbiAgY29uc3QgbWFwcGVkVmFsdWUgPSBBcnJheS5pc0FycmF5KGRhdGEpID8gZGF0YS5tYXAodmFsdWVBY2Nlc3NvcikgOiBbXTtcblxuICBpZiAoQXJyYXkuaXNBcnJheShkYXRhKSAmJiBkYXRhLmxlbmd0aCA+IDEpIHtcbiAgICBkb21haW4gPSBTY2FsZVV0aWxzLmdldExpbmVhckRvbWFpbihtYXBwZWRWYWx1ZSk7XG4gICAgY29uc3QgZGlmZiA9IGRvbWFpblsxXSAtIGRvbWFpblswXTtcblxuICAgIC8vIGluIGNhc2UgZXF1YWwgZG9tYWluLCBbOTYsIDk2XSwgd2hpY2ggd2lsbCBicmVhayBxdWFudGl6ZSBzY2FsZVxuICAgIGlmICghZGlmZikge1xuICAgICAgZG9tYWluWzFdID0gZG9tYWluWzBdICsgMTtcbiAgICB9XG5cbiAgICBzdGVwID0gZ2V0TnVtZXJpY1N0ZXBTaXplKGRpZmYpIHx8IHN0ZXA7XG4gICAgZG9tYWluWzBdID0gZm9ybWF0TnVtYmVyQnlTdGVwKGRvbWFpblswXSwgc3RlcCwgJ2Zsb29yJyk7XG4gICAgZG9tYWluWzFdID0gZm9ybWF0TnVtYmVyQnlTdGVwKGRvbWFpblsxXSwgc3RlcCwgJ2NlaWwnKTtcbiAgfVxuXG4gIGNvbnN0IHtoaXN0b2dyYW0sIGVubGFyZ2VkSGlzdG9ncmFtfSA9IGdldEhpc3RvZ3JhbShkb21haW4sIG1hcHBlZFZhbHVlKTtcblxuICByZXR1cm4ge2RvbWFpbiwgc3RlcCwgaGlzdG9ncmFtLCBlbmxhcmdlZEhpc3RvZ3JhbX07XG59XG5cbmZ1bmN0aW9uIGdldE51bWVyaWNTdGVwU2l6ZShkaWZmKSB7XG4gIGlmIChkaWZmID4gMTAwKSB7XG4gICAgcmV0dXJuIDE7XG4gIH0gZWxzZSBpZiAoZGlmZiA8IDIwICYmIGRpZmYgPiAzKSB7XG4gICAgcmV0dXJuIDAuMDE7XG4gIH0gZWxzZSBpZiAoZGlmZiA8PSAzKSB7XG4gICAgcmV0dXJuIDAuMDAxO1xuICB9XG59XG5cbi8qKlxuICogQ2FsY3VsYXRlIHRpbWVzdGFtcCBkb21haW4gYW5kIHN1aXRhYmxlIHN0ZXBcbiAqXG4gKiBAcGFyYW0ge09iamVjdFtdfSBkYXRhXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSB2YWx1ZUFjY2Vzc29yXG4gKiBAcmV0dXJucyB7b2JqZWN0fSBkb21haW4gYW5kIHN0ZXBcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldFRpbWVzdGFtcEZpZWxkRG9tYWluKGRhdGEsIHZhbHVlQWNjZXNzb3IpIHtcbiAgLy8gdG8gYXZvaWQgY29udmVydGluZyBzdHJpbmcgZm9ybWF0IHRpbWUgdG8gZXBvY2hcbiAgLy8gZXZlcnkgdGltZSB3ZSBjb21wYXJlIHdlIHN0b3JlIGEgdmFsdWUgbWFwcGVkIHRvIGludCBpbiBmaWx0ZXIgZG9tYWluXG5cbiAgY29uc3QgbWFwcGVkVmFsdWUgPSBBcnJheS5pc0FycmF5KGRhdGEpID8gZGF0YS5tYXAodmFsdWVBY2Nlc3NvcikgOiBbXTtcbiAgY29uc3QgZG9tYWluID0gU2NhbGVVdGlscy5nZXRMaW5lYXJEb21haW4obWFwcGVkVmFsdWUpO1xuICBsZXQgc3RlcCA9IDAuMDE7XG5cbiAgY29uc3QgZGlmZiA9IGRvbWFpblsxXSAtIGRvbWFpblswXTtcbiAgY29uc3QgZW50cnkgPSBUaW1lc3RhbXBTdGVwTWFwLmZpbmQoZiA9PiBmLm1heCA+PSBkaWZmKTtcbiAgaWYgKGVudHJ5KSB7XG4gICAgc3RlcCA9IGVudHJ5LnN0ZXA7XG4gIH1cblxuICBjb25zdCB7aGlzdG9ncmFtLCBlbmxhcmdlZEhpc3RvZ3JhbX0gPSBnZXRIaXN0b2dyYW0oZG9tYWluLCBtYXBwZWRWYWx1ZSk7XG5cbiAgcmV0dXJuIHtkb21haW4sIHN0ZXAsIG1hcHBlZFZhbHVlLCBoaXN0b2dyYW0sIGVubGFyZ2VkSGlzdG9ncmFtfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGhpc3RvZ3JhbUNvbnN0cnVjdChkb21haW4sIG1hcHBlZFZhbHVlLCBiaW5zKSB7XG4gIHJldHVybiBkM0hpc3RvZ3JhbSgpXG4gICAgLnRocmVzaG9sZHModGlja3MoZG9tYWluWzBdLCBkb21haW5bMV0sIGJpbnMpKVxuICAgIC5kb21haW4oZG9tYWluKShtYXBwZWRWYWx1ZSlcbiAgICAubWFwKGJpbiA9PiAoe1xuICAgICAgY291bnQ6IGJpbi5sZW5ndGgsXG4gICAgICB4MDogYmluLngwLFxuICAgICAgeDE6IGJpbi54MVxuICAgIH0pKTtcbn1cbi8qKlxuICogQ2FsY3VsYXRlIGhpc3RvZ3JhbSBmcm9tIGRvbWFpbiBhbmQgYXJyYXkgb2YgdmFsdWVzXG4gKlxuICogQHBhcmFtIHtudW1iZXJbXX0gZG9tYWluXG4gKiBAcGFyYW0ge09iamVjdFtdfSBtYXBwZWRWYWx1ZVxuICogQHJldHVybnMge0FycmF5W119IGhpc3RvZ3JhbVxuICovXG5mdW5jdGlvbiBnZXRIaXN0b2dyYW0oZG9tYWluLCBtYXBwZWRWYWx1ZSkge1xuICBjb25zdCBoaXN0b2dyYW0gPSBoaXN0b2dyYW1Db25zdHJ1Y3QoZG9tYWluLCBtYXBwZWRWYWx1ZSwgaGlzdG9ncmFtQmlucyk7XG4gIGNvbnN0IGVubGFyZ2VkSGlzdG9ncmFtID0gaGlzdG9ncmFtQ29uc3RydWN0KFxuICAgIGRvbWFpbixcbiAgICBtYXBwZWRWYWx1ZSxcbiAgICBlbmxhcmdlZEhpc3RvZ3JhbUJpbnNcbiAgKTtcblxuICByZXR1cm4ge2hpc3RvZ3JhbSwgZW5sYXJnZWRIaXN0b2dyYW19O1xufVxuXG4vKipcbiAqIHJvdW5kIG51bWJlciBiYXNlZCBvbiBzdGVwXG4gKlxuICogQHBhcmFtIHtudW1iZXJ9IHZhbFxuICogQHBhcmFtIHtudW1iZXJ9IHN0ZXBcbiAqIEBwYXJhbSB7c3RyaW5nfSBib3VuZFxuICogQHJldHVybnMge251bWJlcn0gcm91bmRlZCBudW1iZXJcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGZvcm1hdE51bWJlckJ5U3RlcCh2YWwsIHN0ZXAsIGJvdW5kKSB7XG4gIGlmIChib3VuZCA9PT0gJ2Zsb29yJykge1xuICAgIHJldHVybiBNYXRoLmZsb29yKHZhbCAqICgxIC8gc3RlcCkpIC8gKDEgLyBzdGVwKTtcbiAgfVxuXG4gIHJldHVybiBNYXRoLmNlaWwodmFsICogKDEgLyBzdGVwKSkgLyAoMSAvIHN0ZXApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNJblJhbmdlKHZhbCwgZG9tYWluKSB7XG4gIGlmICghQXJyYXkuaXNBcnJheShkb21haW4pKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcmV0dXJuIHZhbCA+PSBkb21haW5bMF0gJiYgdmFsIDw9IGRvbWFpblsxXTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFRpbWVXaWRnZXRUaXRsZUZvcm1hdHRlcihkb21haW4pIHtcbiAgaWYgKCFBcnJheS5pc0FycmF5KGRvbWFpbikpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIGNvbnN0IGRpZmYgPSBkb21haW5bMV0gLSBkb21haW5bMF07XG4gIHJldHVybiBkaWZmID4gZHVyYXRpb25ZZWFyXG4gICAgPyAnTU0vREQvWVknXG4gICAgOiBkaWZmID4gZHVyYXRpb25EYXlcbiAgICAgID8gJ01NL0REIGhoYSdcbiAgICAgIDogJ01NL0REIGhoOm1tYSc7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRUaW1lV2lkZ2V0SGludEZvcm1hdHRlcihkb21haW4pIHtcbiAgaWYgKCFBcnJheS5pc0FycmF5KGRvbWFpbikpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIGNvbnN0IGRpZmYgPSBkb21haW5bMV0gLSBkb21haW5bMF07XG4gIHJldHVybiBkaWZmID4gZHVyYXRpb25ZZWFyXG4gICAgPyAnTU0vREQvWVknXG4gICAgOiBkaWZmID4gZHVyYXRpb25XZWVrXG4gICAgICA/ICdNTS9ERCdcbiAgICAgIDogZGlmZiA+IGR1cmF0aW9uRGF5XG4gICAgICAgID8gJ01NL0REIGhoYSdcbiAgICAgICAgOiBkaWZmID4gZHVyYXRpb25Ib3VyXG4gICAgICAgICAgPyAnaGg6bW1hJ1xuICAgICAgICAgIDogJ2hoOm1tOnNzYSc7XG59XG5cbi8qKlxuICogU2FuaXR5IGNoZWNrIG9uIGZpbHRlcnMgdG8gcHJlcGFyZSBmb3Igc2F2ZVxuICogQHBhcmFtIHtTdHJpbmd9IHR5cGUgLSBmaWx0ZXIgdHlwZVxuICogQHBhcmFtIHsqfSB2YWx1ZSAtIGZpbHRlciB2YWx1ZVxuICogQHJldHVybnMge2Jvb2xlYW59IHdoZXRoZXIgZmlsdGVyIGlzIHZhbHVlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc1ZhbGlkRmlsdGVyVmFsdWUoe3R5cGUsIHZhbHVlfSkge1xuICBpZiAoIXR5cGUpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgc3dpdGNoICh0eXBlKSB7XG4gICAgY2FzZSBGSUxURVJfVFlQRVMuc2VsZWN0OlxuICAgICAgcmV0dXJuIHZhbHVlID09PSB0cnVlIHx8IHZhbHVlID09PSBmYWxzZTtcblxuICAgIGNhc2UgRklMVEVSX1RZUEVTLnJhbmdlOlxuICAgIGNhc2UgRklMVEVSX1RZUEVTLnRpbWVSYW5nZTpcbiAgICAgIHJldHVybiBBcnJheS5pc0FycmF5KHZhbHVlKSAmJiB2YWx1ZS5ldmVyeSh2ID0+IHYgIT09IG51bGwgJiYgIWlzTmFOKHYpKTtcblxuICAgIGNhc2UgRklMVEVSX1RZUEVTLm11bHRpU2VsZWN0OlxuICAgICAgcmV0dXJuIEFycmF5LmlzQXJyYXkodmFsdWUpICYmIEJvb2xlYW4odmFsdWUubGVuZ3RoKTtcblxuICAgIGNhc2UgRklMVEVSX1RZUEVTLmlucHV0OlxuICAgICAgcmV0dXJuIEJvb2xlYW4odmFsdWUubGVuZ3RoKTtcblxuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0RmlsdGVyUGxvdChmaWx0ZXIsIGFsbERhdGEpIHtcbiAgaWYgKGZpbHRlci5wbG90VHlwZSA9PT0gUExPVF9UWVBFUy5oaXN0b2dyYW0gfHwgIWZpbHRlci55QXhpcykge1xuICAgIC8vIGhpc3RvZ3JhbSBzaG91bGQgYmUgY2FsY3VsYXRlZCB3aGVuIGNyZWF0ZSBmaWx0ZXJcbiAgICByZXR1cm4ge307XG4gIH1cblxuICBjb25zdCB7bWFwcGVkVmFsdWV9ID0gZmlsdGVyO1xuICBjb25zdCB7eUF4aXN9ID0gZmlsdGVyO1xuXG4gIC8vIHJldHVybiBsaW5lQ2hhcnRcbiAgY29uc3Qgc2VyaWVzID0gYWxsRGF0YVxuICAgIC5tYXAoKGQsIGkpID0+ICh7XG4gICAgICB4OiBtYXBwZWRWYWx1ZVtpXSxcbiAgICAgIHk6IGRbeUF4aXMudGFibGVGaWVsZEluZGV4IC0gMV1cbiAgICB9KSlcbiAgICAuZmlsdGVyKCh7eCwgeX0pID0+IE51bWJlci5pc0Zpbml0ZSh4KSAmJiBOdW1iZXIuaXNGaW5pdGUoeSkpXG4gICAgLnNvcnQoKGEsIGIpID0+IGFzY2VuZGluZyhhLngsIGIueCkpO1xuXG4gIGNvbnN0IHlEb21haW4gPSBleHRlbnQoc2VyaWVzLCBkID0+IGQueSk7XG4gIGNvbnN0IHhEb21haW4gPSBbc2VyaWVzWzBdLngsIHNlcmllc1tzZXJpZXMubGVuZ3RoIC0gMV0ueF07XG5cbiAgcmV0dXJuIHtsaW5lQ2hhcnQ6IHtzZXJpZXMsIHlEb21haW4sIHhEb21haW59LCB5QXhpc307XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXREZWZhdWx0RmlsdGVyUGxvdFR5cGUoZmlsdGVyKSB7XG4gIGNvbnN0IGZpbHRlclBsb3RUeXBlcyA9IFN1cHBvcnRlZFBsb3RUeXBlW2ZpbHRlci50eXBlXTtcbiAgaWYgKCFmaWx0ZXJQbG90VHlwZXMpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIGlmICghZmlsdGVyLnlBeGlzKSB7XG4gICAgcmV0dXJuIGZpbHRlclBsb3RUeXBlcy5kZWZhdWx0O1xuICB9XG5cbiAgcmV0dXJuIGZpbHRlclBsb3RUeXBlc1tmaWx0ZXIueUF4aXMudHlwZV0gfHwgbnVsbDtcbn1cbiJdfQ==