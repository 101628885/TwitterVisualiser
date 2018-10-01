'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _toArray2 = require('babel-runtime/helpers/toArray');

var _toArray3 = _interopRequireDefault(_toArray2);

exports.processCsvData = processCsvData;
exports.getSampleForTypeAnalyze = getSampleForTypeAnalyze;
exports.parseCsvDataByFieldType = parseCsvDataByFieldType;
exports.getFieldsFromData = getFieldsFromData;
exports.renameDuplicateFields = renameDuplicateFields;
exports.analyzerTypeToFieldType = analyzerTypeToFieldType;
exports.processRowObject = processRowObject;
exports.processGeojson = processGeojson;
exports.formatCsv = formatCsv;
exports.validateInputData = validateInputData;

var _d3Dsv = require('d3-dsv');

var _d3Array = require('d3-array');

var _window = require('global/window');

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _typeAnalyzer = require('type-analyzer');

var _geojsonNormalize = require('@mapbox/geojson-normalize');

var _geojsonNormalize2 = _interopRequireDefault(_geojsonNormalize);

var _defaultSettings = require('../constants/default-settings');

var _dataUtils = require('../utils/data-utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// if any of these value occurs in csv, parse it to null;
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

var CSV_NULLS = ['', 'null', 'NULL', 'Null', 'NaN'];

function processCsvData(rawData) {

  // here we assume the csv file that people uploaded will have first row
  // as name of the column
  var _csvParseRows = (0, _d3Dsv.csvParseRows)(rawData),
      _csvParseRows2 = (0, _toArray3.default)(_csvParseRows),
      headerRow = _csvParseRows2[0],
      rows = _csvParseRows2.slice(1);

  if (!rows.length || !headerRow) {
    // looks like an empty file
    // resolve null, and catch them later in one place
    return null;
  }

  cleanUpFalsyCsvValue(rows);
  // No need to run type detection on every data point
  // here we get a list of none null values to run analyze on
  var sample = getSampleForTypeAnalyze({ fields: headerRow, allData: rows });

  var fields = getFieldsFromData(sample, headerRow);

  fields.forEach(parseCsvDataByFieldType.bind(null, rows));

  return { fields: fields, rows: rows };
}

/**
 * get fields from csv data
 *
 * @param {array} fields - an array of fields name
 * @param {array} allData
 * @param {array} sampleCount
 * @returns {array} formatted fields
 */
function getSampleForTypeAnalyze(_ref) {
  var fields = _ref.fields,
      allData = _ref.allData,
      _ref$sampleCount = _ref.sampleCount,
      sampleCount = _ref$sampleCount === undefined ? 50 : _ref$sampleCount;

  var total = Math.min(sampleCount, allData.length);
  // const fieldOrder = fields.map(f => f.name);
  var sample = (0, _d3Array.range)(0, total, 1).map(function (d) {
    return {};
  });

  // collect sample data for each field
  fields.forEach(function (field, fieldIdx) {
    // data counter
    var i = 0;
    // sample counter
    var j = 0;

    while (j < total) {
      if (i >= allData.length) {
        // if depleted data pool
        sample[j][field] = null;
        j++;
      } else if ((0, _dataUtils.notNullorUndefined)(allData[i][fieldIdx])) {
        sample[j][field] = allData[i][fieldIdx];
        j++;
        i++;
      } else {
        i++;
      }
    }
  });

  return sample;
}

function cleanUpFalsyCsvValue(rows) {
  for (var i = 0; i < rows.length; i++) {
    for (var j = 0; j < rows[i].length; j++) {
      // analyzer will set any fields to 'string' if there are empty values
      // which will be parsed as '' by d3.csv
      // here we parse empty data as null
      // TODO: create warning when deltect `CSV_NULLS` in the data
      if (!rows[i][j] || CSV_NULLS.includes(rows[i][j])) {
        rows[i][j] = null;
      }
    }
  }
}
/**
 * Process uploaded csv file to parse value by field type
 *
 * @param {array} rows
 * @param {object} field
 * @param {number} i
 * @returns {void}
 */
function parseCsvDataByFieldType(rows, field, i) {
  var unixFormat = ['x', 'X'];

  rows.forEach(function (row) {
    if (row[i] !== null) {
      switch (field.type) {
        case _defaultSettings.ALL_FIELD_TYPES.real:
          row[i] = parseFloat(row[i]);
          break;

        // TODO: timestamp can be either '1495827326' or '2016-03-10 11:20'
        // if it's '1495827326' we pass it to int
        case _defaultSettings.ALL_FIELD_TYPES.timestamp:
          row[i] = unixFormat.includes(field.format) ? Number(row[i]) : row[i];
          break;

        case _defaultSettings.ALL_FIELD_TYPES.integer:
          row[i] = parseInt(row[i], 10);
          break;

        case _defaultSettings.ALL_FIELD_TYPES.boolean:
          // 0 and 1 only field can also be boolean
          row[i] = row[i] === 'true' || row[i] === 'True' || row[i] === '1';
          break;

        default:
          break;
      }
    }
  });
}

/**
 * get fields from csv data
 *
 * @param {array} data
 * @param {array} fieldOrder
 * @returns {array} formatted fields
 */
function getFieldsFromData(data, fieldOrder) {
  // add a check for epoch timestamp
  var metadata = _typeAnalyzer.Analyzer.computeColMeta(data, [{ regex: /.*geojson|all_points/g, dataType: 'GEOMETRY' }]);

  var _renameDuplicateField = renameDuplicateFields(fieldOrder),
      fieldByIndex = _renameDuplicateField.fieldByIndex;

  return fieldOrder.reduce(function (orderedArray, field, index) {
    var name = fieldByIndex[index];
    var fieldMeta = metadata.find(function (m) {
      return m.key === field;
    });

    var _ref2 = fieldMeta || {},
        type = _ref2.type,
        format = _ref2.format;

    orderedArray[index] = {
      name: name,
      format: format,

      // need this for mapbuilder conversion: filter type detection
      // category,
      tableFieldIndex: index + 1,
      type: analyzerTypeToFieldType(type)
    };

    return orderedArray;
  }, []);
}

/**
 * pass in an array of field names, rename duplicated one
 * and return a map from old field index to new name
 *
 * @param {array} fieldOrder
 * @returns {Object} new field name by index
 */
function renameDuplicateFields(fieldOrder) {
  return fieldOrder.reduce(function (accu, field, i) {
    var allNames = accu.allNames;

    var fieldName = field;

    // add a counter to duplicated names
    if (allNames.includes(field)) {
      var counter = 0;
      while (allNames.includes(field + '-' + counter)) {
        counter++;
      }
      fieldName = field + '-' + counter;
    }

    accu.fieldByIndex[i] = fieldName;
    accu.allNames.push(fieldName);

    return accu;
  }, { allNames: [], fieldByIndex: {} });
}

/**
 * Map Analyzer types to local field types
 *
 * @param {string} aType
 * @returns {string} corresponding type in ALL_FIELD_TYPES
 */
/* eslint-disable complexity */
function analyzerTypeToFieldType(aType) {
  var DATE = _typeAnalyzer.DATA_TYPES.DATE,
      TIME = _typeAnalyzer.DATA_TYPES.TIME,
      DATETIME = _typeAnalyzer.DATA_TYPES.DATETIME,
      NUMBER = _typeAnalyzer.DATA_TYPES.NUMBER,
      INT = _typeAnalyzer.DATA_TYPES.INT,
      FLOAT = _typeAnalyzer.DATA_TYPES.FLOAT,
      BOOLEAN = _typeAnalyzer.DATA_TYPES.BOOLEAN,
      STRING = _typeAnalyzer.DATA_TYPES.STRING,
      CITY = _typeAnalyzer.DATA_TYPES.CITY,
      GEOMETRY = _typeAnalyzer.DATA_TYPES.GEOMETRY,
      GEOMETRY_FROM_STRING = _typeAnalyzer.DATA_TYPES.GEOMETRY_FROM_STRING,
      ZIPCODE = _typeAnalyzer.DATA_TYPES.ZIPCODE,
      PAIR_GEOMETRY_FROM_STRING = _typeAnalyzer.DATA_TYPES.PAIR_GEOMETRY_FROM_STRING;

  // TODO: un recognized types
  // CURRENCY PERCENT NONE

  switch (aType) {
    case DATE:
      return _defaultSettings.ALL_FIELD_TYPES.date;
    case TIME:
    case DATETIME:
      return _defaultSettings.ALL_FIELD_TYPES.timestamp;
    case NUMBER:
    case FLOAT:
      return _defaultSettings.ALL_FIELD_TYPES.real;
    case INT:
      return _defaultSettings.ALL_FIELD_TYPES.integer;
    case BOOLEAN:
      return _defaultSettings.ALL_FIELD_TYPES.boolean;
    case GEOMETRY:
    case GEOMETRY_FROM_STRING:
    case PAIR_GEOMETRY_FROM_STRING:
      return _defaultSettings.ALL_FIELD_TYPES.geojson;
    case STRING:
    case CITY:
    case ZIPCODE:
      return _defaultSettings.ALL_FIELD_TYPES.string;
    default:
      _window.console.warn('Unsupported analyzer type: ' + aType);
      return _defaultSettings.ALL_FIELD_TYPES.string;
  }
}
/* eslint-enable complexity */

/*
 * Process rawData where each row is an object
 */
function processRowObject(rawData) {
  if (!rawData.length) {
    return null;
  }

  var keys = Object.keys(rawData[0]);
  var rows = rawData.map(function (d) {
    return keys.map(function (key) {
      return d[key];
    });
  });
  var fields = getFieldsFromData(rawData, keys);

  return {
    fields: fields,
    rows: rows
  };
}

function processGeojson(rawData) {
  var normalizedGeojson = (0, _geojsonNormalize2.default)(rawData);

  if (!normalizedGeojson || !Array.isArray(normalizedGeojson.features)) {
    // fail to normalize geojson
    return null;
  }

  // getting all feature fields
  var allData = normalizedGeojson.features.reduce(function (accu, f, i) {
    if (f.geometry) {
      accu.push((0, _extends3.default)({
        // add feature to _geojson field
        _geojson: f
      }, f.properties || {}));
    }
    return accu;
  }, []);

  // get all the field
  var fields = allData.reduce(function (prev, curr) {
    Object.keys(curr).forEach(function (key) {
      if (!prev.includes(key)) {
        prev.push(key);
      }
    });
    return prev;
  }, []);

  // make sure each feature has exact same fields
  allData.forEach(function (d) {
    fields.forEach(function (f) {
      if (!(f in d)) {
        d[f] = null;
      }
    });
  });

  return processRowObject(allData);
}

/**
 * On export data to csv
 * @param data
 * @param fields
 */
function formatCsv(data, fields) {
  var columns = fields.map(function (f) {
    return f.name;
  });
  var formattedData = [columns];

  // parse geojson object as string
  data.forEach(function (row) {
    formattedData.push(row.map(function (d, i) {
      return d && _defaultSettings.GEOJSON_FIELDS.geojson.includes(fields[i].name) ? JSON.stringify(d) : d;
    }));
  });

  return (0, _d3Dsv.csvFormatRows)(formattedData);
}

/**
 * @param data
 * @returns {{allData: Array, fields: Array}}
 */
function validateInputData(data) {
  // TODO: add test
  /*
   * expected input data format
   * {
   *   fields: [],
   *   rows: []
   * }
   */
  var proceed = true;
  if (!data) {
    (0, _assert2.default)('receiveVisData: data cannot be null');
    proceed = false;
  } else if (!Array.isArray(data.fields)) {
    (0, _assert2.default)('receiveVisData: expect data.fields to be an array');
    proceed = false;
  } else if (!Array.isArray(data.rows)) {
    (0, _assert2.default)('receiveVisData: expect data.rows to be an array');
    proceed = false;
  }

  if (!proceed) {
    return null;
  }

  var fields = data.fields,
      rows = data.rows;

  // check if all fields has name, format and type

  var allValid = fields.every(function (f, i) {
    if ((typeof f === 'undefined' ? 'undefined' : (0, _typeof3.default)(f)) !== 'object') {
      (0, _assert2.default)('fields needs to be an array of object, but find ' + f);
      return false;
    }

    if (!f.name) {
      (0, _assert2.default)('field.name is required but missing in field ' + JSON.stringify(f));
      // assign a name
      f.name = 'column_' + i;
    }

    if (!_defaultSettings.ALL_FIELD_TYPES[f.type]) {
      (0, _assert2.default)('unknown field type ' + f.type);
      return false;
    }

    return f.type && f.format && f.name;
  });

  if (allValid) {
    return { rows: rows, fields: fields };
  }

  // if any field has missing type, recalculate it for everyone
  // because we simply lost faith in humanity
  var sampleData = getSampleForTypeAnalyze({ fields: fields.map(function (f) {
      return f.name;
    }), allData: rows });
  var fieldOrder = fields.map(function (f) {
    return f.name;
  });
  var meta = getFieldsFromData(sampleData, fieldOrder);
  var updatedFields = fields.map(function (f, i) {
    return (0, _extends3.default)({}, f, {
      type: meta[i].type,
      format: meta[i].format
    });
  });

  return { fields: updatedFields, rows: rows };
}

exports.default = {
  processGeojson: processGeojson,
  processCsvData: processCsvData,
  processRowObject: processRowObject,
  analyzerTypeToFieldType: analyzerTypeToFieldType,
  getFieldsFromData: getFieldsFromData,
  parseCsvDataByFieldType: parseCsvDataByFieldType
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9wcm9jZXNzb3JzL2RhdGEtcHJvY2Vzc29yLmpzIl0sIm5hbWVzIjpbInByb2Nlc3NDc3ZEYXRhIiwiZ2V0U2FtcGxlRm9yVHlwZUFuYWx5emUiLCJwYXJzZUNzdkRhdGFCeUZpZWxkVHlwZSIsImdldEZpZWxkc0Zyb21EYXRhIiwicmVuYW1lRHVwbGljYXRlRmllbGRzIiwiYW5hbHl6ZXJUeXBlVG9GaWVsZFR5cGUiLCJwcm9jZXNzUm93T2JqZWN0IiwicHJvY2Vzc0dlb2pzb24iLCJmb3JtYXRDc3YiLCJ2YWxpZGF0ZUlucHV0RGF0YSIsIkNTVl9OVUxMUyIsInJhd0RhdGEiLCJoZWFkZXJSb3ciLCJyb3dzIiwibGVuZ3RoIiwiY2xlYW5VcEZhbHN5Q3N2VmFsdWUiLCJzYW1wbGUiLCJmaWVsZHMiLCJhbGxEYXRhIiwiZm9yRWFjaCIsImJpbmQiLCJzYW1wbGVDb3VudCIsInRvdGFsIiwiTWF0aCIsIm1pbiIsIm1hcCIsImZpZWxkIiwiZmllbGRJZHgiLCJpIiwiaiIsImluY2x1ZGVzIiwidW5peEZvcm1hdCIsInJvdyIsInR5cGUiLCJBTExfRklFTERfVFlQRVMiLCJyZWFsIiwicGFyc2VGbG9hdCIsInRpbWVzdGFtcCIsImZvcm1hdCIsIk51bWJlciIsImludGVnZXIiLCJwYXJzZUludCIsImJvb2xlYW4iLCJkYXRhIiwiZmllbGRPcmRlciIsIm1ldGFkYXRhIiwiQW5hbHl6ZXIiLCJjb21wdXRlQ29sTWV0YSIsInJlZ2V4IiwiZGF0YVR5cGUiLCJmaWVsZEJ5SW5kZXgiLCJyZWR1Y2UiLCJvcmRlcmVkQXJyYXkiLCJpbmRleCIsIm5hbWUiLCJmaWVsZE1ldGEiLCJmaW5kIiwibSIsImtleSIsInRhYmxlRmllbGRJbmRleCIsImFjY3UiLCJhbGxOYW1lcyIsImZpZWxkTmFtZSIsImNvdW50ZXIiLCJwdXNoIiwiYVR5cGUiLCJEQVRFIiwiQW5hbHl6ZXJEQVRBX1RZUEVTIiwiVElNRSIsIkRBVEVUSU1FIiwiTlVNQkVSIiwiSU5UIiwiRkxPQVQiLCJCT09MRUFOIiwiU1RSSU5HIiwiQ0lUWSIsIkdFT01FVFJZIiwiR0VPTUVUUllfRlJPTV9TVFJJTkciLCJaSVBDT0RFIiwiUEFJUl9HRU9NRVRSWV9GUk9NX1NUUklORyIsImRhdGUiLCJnZW9qc29uIiwic3RyaW5nIiwiZ2xvYmFsQ29uc29sZSIsIndhcm4iLCJrZXlzIiwiT2JqZWN0IiwiZCIsIm5vcm1hbGl6ZWRHZW9qc29uIiwiQXJyYXkiLCJpc0FycmF5IiwiZmVhdHVyZXMiLCJmIiwiZ2VvbWV0cnkiLCJfZ2VvanNvbiIsInByb3BlcnRpZXMiLCJwcmV2IiwiY3VyciIsImNvbHVtbnMiLCJmb3JtYXR0ZWREYXRhIiwiR0VPSlNPTl9GSUVMRFMiLCJKU09OIiwic3RyaW5naWZ5IiwicHJvY2VlZCIsImFsbFZhbGlkIiwiZXZlcnkiLCJzYW1wbGVEYXRhIiwibWV0YSIsInVwZGF0ZWRGaWVsZHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztRQWdDZ0JBLGMsR0FBQUEsYztRQWlDQUMsdUIsR0FBQUEsdUI7UUFtREFDLHVCLEdBQUFBLHVCO1FBdUNBQyxpQixHQUFBQSxpQjtRQWtDQUMscUIsR0FBQUEscUI7UUErQkFDLHVCLEdBQUFBLHVCO1FBa0RBQyxnQixHQUFBQSxnQjtRQWVBQyxjLEdBQUFBLGM7UUErQ0FDLFMsR0FBQUEsUztRQXFCQUMsaUIsR0FBQUEsaUI7O0FBN1VoQjs7QUFDQTs7QUFDQTs7QUFDQTs7OztBQUNBOztBQUNBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFFQTtBQTdCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFZQSxJQUFNQyxZQUFZLENBQUMsRUFBRCxFQUFLLE1BQUwsRUFBYSxNQUFiLEVBQXFCLE1BQXJCLEVBQTZCLEtBQTdCLENBQWxCOztBQUVPLFNBQVNWLGNBQVQsQ0FBd0JXLE9BQXhCLEVBQWlDOztBQUV0QztBQUNB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TSxpQ0FBZ0IwRCxFQUFFM0QsSUFBbEIsQ0FBTCxFQUE4QjtBQUM1QixvREFBNkIyRCxFQUFFM0QsSUFBL0I7QUFDQSxhQUFPLEtBQVA7QUFDRDs7QUFFRCxXQUFPMkQsRUFBRTNELElBQUYsSUFBVTJELEVBQUV0RCxNQUFaLElBQXNCc0QsRUFBRXRDLElBQS9CO0FBQ0QsR0FwQmdCLENBQWpCOztBQXNCQSxNQUFJa0QsUUFBSixFQUFjO0FBQ1osV0FBTyxFQUFDM0YsVUFBRCxFQUFPSSxjQUFQLEVBQVA7QUFDRDs7QUFFRDtBQUNBO0FBQ0EsTUFBTXlGLGFBQWF6Ryx3QkFBd0IsRUFBQ2dCLFFBQVFBLE9BQU9RLEdBQVAsQ0FBVztBQUFBLGFBQUttRSxFQUFFdEMsSUFBUDtBQUFBLEtBQVgsQ0FBVCxFQUFrQ3BDLFNBQVNMLElBQTNDLEVBQXhCLENBQW5CO0FBQ0EsTUFBTStCLGFBQWEzQixPQUFPUSxHQUFQLENBQVc7QUFBQSxXQUFLbUUsRUFBRXRDLElBQVA7QUFBQSxHQUFYLENBQW5CO0FBQ0EsTUFBTXFELE9BQU94RyxrQkFBa0J1RyxVQUFsQixFQUE4QjlELFVBQTlCLENBQWI7QUFDQSxNQUFNZ0UsZ0JBQWdCM0YsT0FBT1EsR0FBUCxDQUFXLFVBQUNtRSxDQUFELEVBQUloRSxDQUFKO0FBQUEsc0NBQzVCZ0UsQ0FENEI7QUFFL0IzRCxZQUFNMEUsS0FBSy9FLENBQUwsRUFBUUssSUFGaUI7QUFHL0JLLGNBQVFxRSxLQUFLL0UsQ0FBTCxFQUFRVTtBQUhlO0FBQUEsR0FBWCxDQUF0Qjs7QUFNQSxTQUFPLEVBQUNyQixRQUFRMkYsYUFBVCxFQUF3Qi9GLFVBQXhCLEVBQVA7QUFDRDs7a0JBRWM7QUFDYk4sZ0NBRGE7QUFFYlAsZ0NBRmE7QUFHYk0sb0NBSGE7QUFJYkQsa0RBSmE7QUFLYkYsc0NBTGE7QUFNYkQ7QUFOYSxDIiwiZmlsZSI6ImRhdGEtcHJvY2Vzc29yLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSAyMDE4IFViZXIgVGVjaG5vbG9naWVzLCBJbmMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuLy8gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuLy8gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuLy8gdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuLy8gY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4vLyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4vLyBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4vLyBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbi8vIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuLy8gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuLy8gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbi8vIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbi8vIFRIRSBTT0ZUV0FSRS5cblxuaW1wb3J0IHtjc3ZQYXJzZVJvd3MsIGNzdkZvcm1hdFJvd3N9IGZyb20gJ2QzLWRzdic7XG5pbXBvcnQge3JhbmdlfSBmcm9tICdkMy1hcnJheSc7XG5pbXBvcnQge2NvbnNvbGUgYXMgZ2xvYmFsQ29uc29sZX0gZnJvbSAnZ2xvYmFsL3dpbmRvdyc7XG5pbXBvcnQgYXNzZXJ0IGZyb20gJ2Fzc2VydCc7XG5pbXBvcnQge0FuYWx5emVyLCBEQVRBX1RZUEVTIGFzIEFuYWx5emVyREFUQV9UWVBFU30gZnJvbSAndHlwZS1hbmFseXplcic7XG5pbXBvcnQgbm9ybWFsaXplIGZyb20gJ0BtYXBib3gvZ2VvanNvbi1ub3JtYWxpemUnO1xuaW1wb3J0IHtBTExfRklFTERfVFlQRVMsIEdFT0pTT05fRklFTERTfSBmcm9tICdjb25zdGFudHMvZGVmYXVsdC1zZXR0aW5ncyc7XG5pbXBvcnQge25vdE51bGxvclVuZGVmaW5lZH0gZnJvbSAndXRpbHMvZGF0YS11dGlscyc7XG5cbi8vIGlmIGFueSBvZiB0aGVzZSB2YWx1ZSBvY2N1cnMgaW4gY3N2LCBwYXJzZSBpdCB0byBudWxsO1xuY29uc3QgQ1NWX05VTExTID0gWycnLCAnbnVsbCcsICdOVUxMJywgJ051bGwnLCAnTmFOJ107XG5cbmV4cG9ydCBmdW5jdGlvbiBwcm9jZXNzQ3N2RGF0YShyYXdEYXRhKSB7XG5cbiAgLy8gaGVyZSB3ZSBhc3N1bWUgdGhlIGNzdiBmaWxlIHRoYXQgcGVvcGxlIHVwbG9hZGVkIHdpbGwgaGF2ZSBmaXJzdCByb3dcbiAgLy8gYXMgbmFtZSBvZiB0aGUgY29sdW1uXG4gIC8vVE9ETzogYWRkIGEgYWxlcnQgYXQgdXBsb2FkIGNzdiB0byByZW1pbmQgZGVmaW5lIGZpcnN0IHJvd1xuICBjb25zdCBbaGVhZGVyUm93LCAuLi5yb3dzXSA9IGNzdlBhcnNlUm93cyhyYXdEYXRhKTtcblxuICBpZiAoIXJvd3MubGVuZ3RoIHx8ICFoZWFkZXJSb3cpIHtcbiAgICAvLyBsb29rcyBsaWtlIGFuIGVtcHR5IGZpbGVcbiAgICAvLyByZXNvbHZlIG51bGwsIGFuZCBjYXRjaCB0aGVtIGxhdGVyIGluIG9uZSBwbGFjZVxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgY2xlYW5VcEZhbHN5Q3N2VmFsdWUocm93cyk7XG4gIC8vIE5vIG5lZWQgdG8gcnVuIHR5cGUgZGV0ZWN0aW9uIG9uIGV2ZXJ5IGRhdGEgcG9pbnRcbiAgLy8gaGVyZSB3ZSBnZXQgYSBsaXN0IG9mIG5vbmUgbnVsbCB2YWx1ZXMgdG8gcnVuIGFuYWx5emUgb25cbiAgY29uc3Qgc2FtcGxlID0gZ2V0U2FtcGxlRm9yVHlwZUFuYWx5emUoe2ZpZWxkczogaGVhZGVyUm93LCBhbGxEYXRhOiByb3dzfSk7XG5cbiAgY29uc3QgZmllbGRzID0gZ2V0RmllbGRzRnJvbURhdGEoc2FtcGxlLCBoZWFkZXJSb3cpO1xuXG4gIGZpZWxkcy5mb3JFYWNoKHBhcnNlQ3N2RGF0YUJ5RmllbGRUeXBlLmJpbmQobnVsbCwgcm93cykpO1xuXG4gIHJldHVybiB7ZmllbGRzLCByb3dzfTtcbn1cblxuLyoqXG4gKiBnZXQgZmllbGRzIGZyb20gY3N2IGRhdGFcbiAqXG4gKiBAcGFyYW0ge2FycmF5fSBmaWVsZHMgLSBhbiBhcnJheSBvZiBmaWVsZHMgbmFtZVxuICogQHBhcmFtIHthcnJheX0gYWxsRGF0YVxuICogQHBhcmFtIHthcnJheX0gc2FtcGxlQ291bnRcbiAqIEByZXR1cm5zIHthcnJheX0gZm9ybWF0dGVkIGZpZWxkc1xuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0U2FtcGxlRm9yVHlwZUFuYWx5emUoe2ZpZWxkcywgYWxsRGF0YSwgc2FtcGxlQ291bnQgPSA1MH0pIHtcbiAgY29uc3QgdG90YWwgPSBNYXRoLm1pbihzYW1wbGVDb3VudCwgYWxsRGF0YS5sZW5ndGgpO1xuICAvLyBjb25zdCBmaWVsZE9yZGVyID0gZmllbGRzLm1hcChmID0+IGYubmFtZSk7XG4gIGNvbnN0IHNhbXBsZSA9IHJhbmdlKDAsIHRvdGFsLCAxKS5tYXAoZCA9PiAoe30pKTtcblxuICAvLyBjb2xsZWN0IHNhbXBsZSBkYXRhIGZvciBlYWNoIGZpZWxkXG4gIGZpZWxkcy5mb3JFYWNoKChmaWVsZCwgZmllbGRJZHgpID0+IHtcbiAgICAvLyBkYXRhIGNvdW50ZXJcbiAgICBsZXQgaSA9IDA7XG4gICAgLy8gc2FtcGxlIGNvdW50ZXJcbiAgICBsZXQgaiA9IDA7XG5cbiAgICB3aGlsZSAoaiA8IHRvdGFsKSB7XG4gICAgICBpZiAoaSA+PSBhbGxEYXRhLmxlbmd0aCkge1xuICAgICAgICAvLyBpZiBkZXBsZXRlZCBkYXRhIHBvb2xcbiAgICAgICAgc2FtcGxlW2pdW2ZpZWxkXSA9IG51bGw7XG4gICAgICAgIGorKztcbiAgICAgIH0gZWxzZSBpZiAobm90TnVsbG9yVW5kZWZpbmVkKGFsbERhdGFbaV1bZmllbGRJZHhdKSkge1xuICAgICAgICBzYW1wbGVbal1bZmllbGRdID0gYWxsRGF0YVtpXVtmaWVsZElkeF07XG4gICAgICAgIGorKztcbiAgICAgICAgaSsrO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaSsrO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIHNhbXBsZTtcbn1cblxuZnVuY3Rpb24gY2xlYW5VcEZhbHN5Q3N2VmFsdWUocm93cykge1xuICBmb3IgKGxldCBpID0gMDsgaSA8IHJvd3MubGVuZ3RoOyBpKyspIHtcbiAgICBmb3IgKGxldCBqID0gMDsgaiA8IHJvd3NbaV0ubGVuZ3RoOyBqKyspIHtcbiAgICAgIC8vIGFuYWx5emVyIHdpbGwgc2V0IGFueSBmaWVsZHMgdG8gJ3N0cmluZycgaWYgdGhlcmUgYXJlIGVtcHR5IHZhbHVlc1xuICAgICAgLy8gd2hpY2ggd2lsbCBiZSBwYXJzZWQgYXMgJycgYnkgZDMuY3N2XG4gICAgICAvLyBoZXJlIHdlIHBhcnNlIGVtcHR5IGRhdGEgYXMgbnVsbFxuICAgICAgLy8gVE9ETzogY3JlYXRlIHdhcm5pbmcgd2hlbiBkZWx0ZWN0IGBDU1ZfTlVMTFNgIGluIHRoZSBkYXRhXG4gICAgICBpZiAoIXJvd3NbaV1bal0gfHwgQ1NWX05VTExTLmluY2x1ZGVzKHJvd3NbaV1bal0pKSB7XG4gICAgICAgIHJvd3NbaV1bal0gPSBudWxsO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuLyoqXG4gKiBQcm9jZXNzIHVwbG9hZGVkIGNzdiBmaWxlIHRvIHBhcnNlIHZhbHVlIGJ5IGZpZWxkIHR5cGVcbiAqXG4gKiBAcGFyYW0ge2FycmF5fSByb3dzXG4gKiBAcGFyYW0ge29iamVjdH0gZmllbGRcbiAqIEBwYXJhbSB7bnVtYmVyfSBpXG4gKiBAcmV0dXJucyB7dm9pZH1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlQ3N2RGF0YUJ5RmllbGRUeXBlKHJvd3MsIGZpZWxkLCBpKSB7XG4gIGNvbnN0IHVuaXhGb3JtYXQgPSBbJ3gnLCAnWCddO1xuXG4gIHJvd3MuZm9yRWFjaChyb3cgPT4ge1xuICAgIGlmIChyb3dbaV0gIT09IG51bGwpIHtcbiAgICAgIHN3aXRjaCAoZmllbGQudHlwZSkge1xuICAgICAgICBjYXNlIEFMTF9GSUVMRF9UWVBFUy5yZWFsOlxuICAgICAgICAgIHJvd1tpXSA9IHBhcnNlRmxvYXQocm93W2ldKTtcbiAgICAgICAgICBicmVhaztcblxuICAgICAgICAvLyBUT0RPOiB0aW1lc3RhbXAgY2FuIGJlIGVpdGhlciAnMTQ5NTgyNzMyNicgb3IgJzIwMTYtMDMtMTAgMTE6MjAnXG4gICAgICAgIC8vIGlmIGl0J3MgJzE0OTU4MjczMjYnIHdlIHBhc3MgaXQgdG8gaW50XG4gICAgICAgIGNhc2UgQUxMX0ZJRUxEX1RZUEVTLnRpbWVzdGFtcDpcbiAgICAgICAgICByb3dbaV0gPSB1bml4Rm9ybWF0LmluY2x1ZGVzKGZpZWxkLmZvcm1hdCkgPyBOdW1iZXIocm93W2ldKSA6IHJvd1tpXTtcbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlIEFMTF9GSUVMRF9UWVBFUy5pbnRlZ2VyOlxuICAgICAgICAgIHJvd1tpXSA9IHBhcnNlSW50KHJvd1tpXSwgMTApO1xuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgQUxMX0ZJRUxEX1RZUEVTLmJvb2xlYW46XG4gICAgICAgICAgLy8gMCBhbmQgMSBvbmx5IGZpZWxkIGNhbiBhbHNvIGJlIGJvb2xlYW5cbiAgICAgICAgICByb3dbaV0gPSByb3dbaV0gPT09ICd0cnVlJyB8fCByb3dbaV0gPT09ICdUcnVlJyB8fCByb3dbaV0gPT09ICcxJztcbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG59XG5cbi8qKlxuICogZ2V0IGZpZWxkcyBmcm9tIGNzdiBkYXRhXG4gKlxuICogQHBhcmFtIHthcnJheX0gZGF0YVxuICogQHBhcmFtIHthcnJheX0gZmllbGRPcmRlclxuICogQHJldHVybnMge2FycmF5fSBmb3JtYXR0ZWQgZmllbGRzXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRGaWVsZHNGcm9tRGF0YShkYXRhLCBmaWVsZE9yZGVyKSB7XG4gIC8vIGFkZCBhIGNoZWNrIGZvciBlcG9jaCB0aW1lc3RhbXBcbiAgY29uc3QgbWV0YWRhdGEgPSBBbmFseXplci5jb21wdXRlQ29sTWV0YShkYXRhLCBbXG4gICAge3JlZ2V4OiAvLipnZW9qc29ufGFsbF9wb2ludHMvZywgZGF0YVR5cGU6ICdHRU9NRVRSWSd9XG4gIF0pO1xuXG4gIGNvbnN0IHtmaWVsZEJ5SW5kZXh9ID0gcmVuYW1lRHVwbGljYXRlRmllbGRzKGZpZWxkT3JkZXIpO1xuXG4gIHJldHVybiBmaWVsZE9yZGVyLnJlZHVjZSgob3JkZXJlZEFycmF5LCBmaWVsZCwgaW5kZXgpID0+IHtcbiAgICBjb25zdCBuYW1lID0gZmllbGRCeUluZGV4W2luZGV4XTtcbiAgICBjb25zdCBmaWVsZE1ldGEgPSBtZXRhZGF0YS5maW5kKG0gPT4gbS5rZXkgPT09IGZpZWxkKTtcbiAgICBjb25zdCB7dHlwZSwgZm9ybWF0fSA9IGZpZWxkTWV0YSB8fCB7fTtcblxuICAgIG9yZGVyZWRBcnJheVtpbmRleF0gPSB7XG4gICAgICBuYW1lLFxuICAgICAgZm9ybWF0LFxuXG4gICAgICAvLyBuZWVkIHRoaXMgZm9yIG1hcGJ1aWxkZXIgY29udmVyc2lvbjogZmlsdGVyIHR5cGUgZGV0ZWN0aW9uXG4gICAgICAvLyBjYXRlZ29yeSxcbiAgICAgIHRhYmxlRmllbGRJbmRleDogaW5kZXggKyAxLFxuICAgICAgdHlwZTogYW5hbHl6ZXJUeXBlVG9GaWVsZFR5cGUodHlwZSlcbiAgICB9O1xuXG4gICAgcmV0dXJuIG9yZGVyZWRBcnJheTtcbiAgfSwgW10pO1xufVxuXG4vKipcbiAqIHBhc3MgaW4gYW4gYXJyYXkgb2YgZmllbGQgbmFtZXMsIHJlbmFtZSBkdXBsaWNhdGVkIG9uZVxuICogYW5kIHJldHVybiBhIG1hcCBmcm9tIG9sZCBmaWVsZCBpbmRleCB0byBuZXcgbmFtZVxuICpcbiAqIEBwYXJhbSB7YXJyYXl9IGZpZWxkT3JkZXJcbiAqIEByZXR1cm5zIHtPYmplY3R9IG5ldyBmaWVsZCBuYW1lIGJ5IGluZGV4XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByZW5hbWVEdXBsaWNhdGVGaWVsZHMoZmllbGRPcmRlcikge1xuICByZXR1cm4gZmllbGRPcmRlci5yZWR1Y2UoXG4gICAgKGFjY3UsIGZpZWxkLCBpKSA9PiB7XG4gICAgICBjb25zdCB7YWxsTmFtZXN9ID0gYWNjdTtcbiAgICAgIGxldCBmaWVsZE5hbWUgPSBmaWVsZDtcblxuICAgICAgLy8gYWRkIGEgY291bnRlciB0byBkdXBsaWNhdGVkIG5hbWVzXG4gICAgICBpZiAoYWxsTmFtZXMuaW5jbHVkZXMoZmllbGQpKSB7XG4gICAgICAgIGxldCBjb3VudGVyID0gMDtcbiAgICAgICAgd2hpbGUgKGFsbE5hbWVzLmluY2x1ZGVzKGAke2ZpZWxkfS0ke2NvdW50ZXJ9YCkpIHtcbiAgICAgICAgICBjb3VudGVyKys7XG4gICAgICAgIH1cbiAgICAgICAgZmllbGROYW1lID0gYCR7ZmllbGR9LSR7Y291bnRlcn1gO1xuICAgICAgfVxuXG4gICAgICBhY2N1LmZpZWxkQnlJbmRleFtpXSA9IGZpZWxkTmFtZTtcbiAgICAgIGFjY3UuYWxsTmFtZXMucHVzaChmaWVsZE5hbWUpO1xuXG4gICAgICByZXR1cm4gYWNjdTtcbiAgICB9LFxuICAgIHthbGxOYW1lczogW10sIGZpZWxkQnlJbmRleDoge319XG4gICk7XG59XG5cbi8qKlxuICogTWFwIEFuYWx5emVyIHR5cGVzIHRvIGxvY2FsIGZpZWxkIHR5cGVzXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGFUeXBlXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBjb3JyZXNwb25kaW5nIHR5cGUgaW4gQUxMX0ZJRUxEX1RZUEVTXG4gKi9cbi8qIGVzbGludC1kaXNhYmxlIGNvbXBsZXhpdHkgKi9cbmV4cG9ydCBmdW5jdGlvbiBhbmFseXplclR5cGVUb0ZpZWxkVHlwZShhVHlwZSkge1xuICBjb25zdCB7XG4gICAgREFURSxcbiAgICBUSU1FLFxuICAgIERBVEVUSU1FLFxuICAgIE5VTUJFUixcbiAgICBJTlQsXG4gICAgRkxPQVQsXG4gICAgQk9PTEVBTixcbiAgICBTVFJJTkcsXG4gICAgQ0lUWSxcbiAgICBHRU9NRVRSWSxcbiAgICBHRU9NRVRSWV9GUk9NX1NUUklORyxcbiAgICBaSVBDT0RFLFxuICAgIFBBSVJfR0VPTUVUUllfRlJPTV9TVFJJTkdcbiAgfSA9IEFuYWx5emVyREFUQV9UWVBFUztcblxuICAvLyBUT0RPOiB1biByZWNvZ25pemVkIHR5cGVzXG4gIC8vIENVUlJFTkNZIFBFUkNFTlQgTk9ORVxuICBzd2l0Y2ggKGFUeXBlKSB7XG4gICAgY2FzZSBEQVRFOlxuICAgICAgcmV0dXJuIEFMTF9GSUVMRF9UWVBFUy5kYXRlO1xuICAgIGNhc2UgVElNRTpcbiAgICBjYXNlIERBVEVUSU1FOlxuICAgICAgcmV0dXJuIEFMTF9GSUVMRF9UWVBFUy50aW1lc3RhbXA7XG4gICAgY2FzZSBOVU1CRVI6XG4gICAgY2FzZSBGTE9BVDpcbiAgICAgIHJldHVybiBBTExfRklFTERfVFlQRVMucmVhbDtcbiAgICBjYXNlIElOVDpcbiAgICAgIHJldHVybiBBTExfRklFTERfVFlQRVMuaW50ZWdlcjtcbiAgICBjYXNlIEJPT0xFQU46XG4gICAgICByZXR1cm4gQUxMX0ZJRUxEX1RZUEVTLmJvb2xlYW47XG4gICAgY2FzZSBHRU9NRVRSWTpcbiAgICBjYXNlIEdFT01FVFJZX0ZST01fU1RSSU5HOlxuICAgIGNhc2UgUEFJUl9HRU9NRVRSWV9GUk9NX1NUUklORzpcbiAgICAgIHJldHVybiBBTExfRklFTERfVFlQRVMuZ2VvanNvbjtcbiAgICBjYXNlIFNUUklORzpcbiAgICBjYXNlIENJVFk6XG4gICAgY2FzZSBaSVBDT0RFOlxuICAgICAgcmV0dXJuIEFMTF9GSUVMRF9UWVBFUy5zdHJpbmc7XG4gICAgZGVmYXVsdDpcbiAgICAgIGdsb2JhbENvbnNvbGUud2FybihgVW5zdXBwb3J0ZWQgYW5hbHl6ZXIgdHlwZTogJHthVHlwZX1gKTtcbiAgICAgIHJldHVybiBBTExfRklFTERfVFlQRVMuc3RyaW5nO1xuICB9XG59XG4vKiBlc2xpbnQtZW5hYmxlIGNvbXBsZXhpdHkgKi9cblxuLypcbiAqIFByb2Nlc3MgcmF3RGF0YSB3aGVyZSBlYWNoIHJvdyBpcyBhbiBvYmplY3RcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHByb2Nlc3NSb3dPYmplY3QocmF3RGF0YSkge1xuICBpZiAoIXJhd0RhdGEubGVuZ3RoKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXMocmF3RGF0YVswXSk7XG4gIGNvbnN0IHJvd3MgPSByYXdEYXRhLm1hcChkID0+IGtleXMubWFwKGtleSA9PiBkW2tleV0pKTtcbiAgY29uc3QgZmllbGRzID0gZ2V0RmllbGRzRnJvbURhdGEocmF3RGF0YSwga2V5cyk7XG5cbiAgcmV0dXJuIHtcbiAgICBmaWVsZHMsXG4gICAgcm93c1xuICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcHJvY2Vzc0dlb2pzb24ocmF3RGF0YSkge1xuICBjb25zdCBub3JtYWxpemVkR2VvanNvbiA9IG5vcm1hbGl6ZShyYXdEYXRhKTtcblxuICBpZiAoIW5vcm1hbGl6ZWRHZW9qc29uIHx8ICFBcnJheS5pc0FycmF5KG5vcm1hbGl6ZWRHZW9qc29uLmZlYXR1cmVzKSkge1xuICAgIC8vIGZhaWwgdG8gbm9ybWFsaXplIGdlb2pzb25cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIC8vIGdldHRpbmcgYWxsIGZlYXR1cmUgZmllbGRzXG4gIGNvbnN0IGFsbERhdGEgPSBub3JtYWxpemVkR2VvanNvbi5mZWF0dXJlcy5yZWR1Y2UoKGFjY3UsIGYsIGkpID0+IHtcbiAgICBpZiAoZi5nZW9tZXRyeSkge1xuICAgICAgYWNjdS5wdXNoKHtcbiAgICAgICAgLy8gYWRkIGZlYXR1cmUgdG8gX2dlb2pzb24gZmllbGRcbiAgICAgICAgX2dlb2pzb246IGYsXG4gICAgICAgIC4uLihmLnByb3BlcnRpZXMgfHwge30pXG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIGFjY3U7XG4gIH0sIFtdKTtcblxuICAvLyBnZXQgYWxsIHRoZSBmaWVsZFxuICBjb25zdCBmaWVsZHMgPSBhbGxEYXRhLnJlZHVjZSgocHJldiwgY3VycikgPT4ge1xuICAgIE9iamVjdC5rZXlzKGN1cnIpLmZvckVhY2goa2V5ID0+IHtcbiAgICAgIGlmICghcHJldi5pbmNsdWRlcyhrZXkpKSB7XG4gICAgICAgIHByZXYucHVzaChrZXkpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBwcmV2O1xuICB9LCBbXSk7XG5cbiAgLy8gbWFrZSBzdXJlIGVhY2ggZmVhdHVyZSBoYXMgZXhhY3Qgc2FtZSBmaWVsZHNcbiAgYWxsRGF0YS5mb3JFYWNoKGQgPT4ge1xuICAgIGZpZWxkcy5mb3JFYWNoKGYgPT4ge1xuICAgICAgaWYgKCEoZiBpbiBkKSkge1xuICAgICAgICBkW2ZdID0gbnVsbDtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSk7XG5cbiAgcmV0dXJuIHByb2Nlc3NSb3dPYmplY3QoYWxsRGF0YSk7XG59XG5cbi8qKlxuICogT24gZXhwb3J0IGRhdGEgdG8gY3N2XG4gKiBAcGFyYW0gZGF0YVxuICogQHBhcmFtIGZpZWxkc1xuICovXG5leHBvcnQgZnVuY3Rpb24gZm9ybWF0Q3N2KGRhdGEsIGZpZWxkcykge1xuICBjb25zdCBjb2x1bW5zID0gZmllbGRzLm1hcChmID0+IGYubmFtZSk7XG4gIGNvbnN0IGZvcm1hdHRlZERhdGEgPSBbY29sdW1uc107XG5cbiAgLy8gcGFyc2UgZ2VvanNvbiBvYmplY3QgYXMgc3RyaW5nXG4gIGRhdGEuZm9yRWFjaChyb3cgPT4ge1xuICAgIGZvcm1hdHRlZERhdGEucHVzaChcbiAgICAgIHJvdy5tYXAoXG4gICAgICAgIChkLCBpKSA9PiBkICYmIEdFT0pTT05fRklFTERTLmdlb2pzb24uaW5jbHVkZXMoZmllbGRzW2ldLm5hbWUpID9cbiAgICAgICAgICBKU09OLnN0cmluZ2lmeShkKSA6IGRcbiAgICAgIClcbiAgICApXG4gIH0pO1xuXG4gIHJldHVybiBjc3ZGb3JtYXRSb3dzKGZvcm1hdHRlZERhdGEpO1xufVxuXG4vKipcbiAqIEBwYXJhbSBkYXRhXG4gKiBAcmV0dXJucyB7e2FsbERhdGE6IEFycmF5LCBmaWVsZHM6IEFycmF5fX1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHZhbGlkYXRlSW5wdXREYXRhKGRhdGEpIHtcbiAgLy8gVE9ETzogYWRkIHRlc3RcbiAgLypcbiAgICogZXhwZWN0ZWQgaW5wdXQgZGF0YSBmb3JtYXRcbiAgICoge1xuICAgKiAgIGZpZWxkczogW10sXG4gICAqICAgcm93czogW11cbiAgICogfVxuICAgKi9cbiAgbGV0IHByb2NlZWQgPSB0cnVlO1xuICBpZiAoIWRhdGEpIHtcbiAgICBhc3NlcnQoJ3JlY2VpdmVWaXNEYXRhOiBkYXRhIGNhbm5vdCBiZSBudWxsJyk7XG4gICAgcHJvY2VlZCA9IGZhbHNlO1xuICB9IGVsc2UgaWYgKCFBcnJheS5pc0FycmF5KGRhdGEuZmllbGRzKSkge1xuICAgIGFzc2VydCgncmVjZWl2ZVZpc0RhdGE6IGV4cGVjdCBkYXRhLmZpZWxkcyB0byBiZSBhbiBhcnJheScpO1xuICAgIHByb2NlZWQgPSBmYWxzZTtcbiAgfSBlbHNlIGlmICghQXJyYXkuaXNBcnJheShkYXRhLnJvd3MpKSB7XG4gICAgYXNzZXJ0KCdyZWNlaXZlVmlzRGF0YTogZXhwZWN0IGRhdGEucm93cyB0byBiZSBhbiBhcnJheScpO1xuICAgIHByb2NlZWQgPSBmYWxzZTtcbiAgfVxuXG4gIGlmICghcHJvY2VlZCkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgY29uc3Qge2ZpZWxkcywgcm93c30gPSBkYXRhO1xuXG4gIC8vIGNoZWNrIGlmIGFsbCBmaWVsZHMgaGFzIG5hbWUsIGZvcm1hdCBhbmQgdHlwZVxuICBjb25zdCBhbGxWYWxpZCA9IGZpZWxkcy5ldmVyeSgoZiwgaSkgPT4ge1xuICAgIGlmICh0eXBlb2YgZiAhPT0gJ29iamVjdCcpIHtcbiAgICAgIGFzc2VydChgZmllbGRzIG5lZWRzIHRvIGJlIGFuIGFycmF5IG9mIG9iamVjdCwgYnV0IGZpbmQgJHtmfWApO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGlmICghZi5uYW1lKSB7XG4gICAgICBhc3NlcnQoXG4gICAgICAgIGBmaWVsZC5uYW1lIGlzIHJlcXVpcmVkIGJ1dCBtaXNzaW5nIGluIGZpZWxkICR7SlNPTi5zdHJpbmdpZnkoZil9YFxuICAgICAgKTtcbiAgICAgIC8vIGFzc2lnbiBhIG5hbWVcbiAgICAgIGYubmFtZSA9IGBjb2x1bW5fJHtpfWA7XG4gICAgfVxuXG4gICAgaWYgKCFBTExfRklFTERfVFlQRVNbZi50eXBlXSkge1xuICAgICAgYXNzZXJ0KGB1bmtub3duIGZpZWxkIHR5cGUgJHtmLnR5cGV9YCk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuIGYudHlwZSAmJiBmLmZvcm1hdCAmJiBmLm5hbWU7XG4gIH0pO1xuXG4gIGlmIChhbGxWYWxpZCkge1xuICAgIHJldHVybiB7cm93cywgZmllbGRzfTtcbiAgfVxuXG4gIC8vIGlmIGFueSBmaWVsZCBoYXMgbWlzc2luZyB0eXBlLCByZWNhbGN1bGF0ZSBpdCBmb3IgZXZlcnlvbmVcbiAgLy8gYmVjYXVzZSB3ZSBzaW1wbHkgbG9zdCBmYWl0aCBpbiBodW1hbml0eVxuICBjb25zdCBzYW1wbGVEYXRhID0gZ2V0U2FtcGxlRm9yVHlwZUFuYWx5emUoe2ZpZWxkczogZmllbGRzLm1hcChmID0+IGYubmFtZSksIGFsbERhdGE6IHJvd3N9KTtcbiAgY29uc3QgZmllbGRPcmRlciA9IGZpZWxkcy5tYXAoZiA9PiBmLm5hbWUpO1xuICBjb25zdCBtZXRhID0gZ2V0RmllbGRzRnJvbURhdGEoc2FtcGxlRGF0YSwgZmllbGRPcmRlcik7XG4gIGNvbnN0IHVwZGF0ZWRGaWVsZHMgPSBmaWVsZHMubWFwKChmLCBpKSA9PiAoe1xuICAgIC4uLmYsXG4gICAgdHlwZTogbWV0YVtpXS50eXBlLFxuICAgIGZvcm1hdDogbWV0YVtpXS5mb3JtYXRcbiAgfSkpO1xuXG4gIHJldHVybiB7ZmllbGRzOiB1cGRhdGVkRmllbGRzLCByb3dzfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQge1xuICBwcm9jZXNzR2VvanNvbixcbiAgcHJvY2Vzc0NzdkRhdGEsXG4gIHByb2Nlc3NSb3dPYmplY3QsXG4gIGFuYWx5emVyVHlwZVRvRmllbGRUeXBlLFxuICBnZXRGaWVsZHNGcm9tRGF0YSxcbiAgcGFyc2VDc3ZEYXRhQnlGaWVsZFR5cGVcbn07XG4iXX0=