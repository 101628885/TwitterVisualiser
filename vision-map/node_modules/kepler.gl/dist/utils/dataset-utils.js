'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.datasetColorMaker = undefined;

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

exports.createNewDataEntry = createNewDataEntry;
exports.removeSuffixAndDelimiters = removeSuffixAndDelimiters;
exports.findPointFieldPairs = findPointFieldPairs;

var _colorUtils = require('./color-utils');

var _lodash = require('lodash.uniq');

var _lodash2 = _interopRequireDefault(_lodash);

var _defaultSettings = require('../constants/default-settings');

var _utils = require('./utils');

var _dataProcessor = require('../processors/data-processor');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _marked = /*#__PURE__*/_regenerator2.default.mark(generateColor); // Copyright (c) 2018 Uber Technologies, Inc.
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

// apply a color for each dataset
// to use as label colors
var datasetColors = ['#8F2FBF', '#005CFF', '#C06C84', '#F8B195', '#547A82', '#3EACA8', '#A2D4AB'].map(_colorUtils.hexToRgb);

/**
 * Random color generator
 */
function generateColor() {
  var index;
  return _regenerator2.default.wrap(function generateColor$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          index = 0;

        case 1:
          if (!(index < datasetColors.length + 1)) {
            _context.next = 7;
            break;
          }

          if (index === datasetColors.length) {
            index = 0;
          }
          _context.next = 5;
          return datasetColors[index++];

        case 5:
          _context.next = 1;
          break;

        case 7:
        case 'end':
          return _context.stop();
      }
    }
  }, _marked, this);
}

var datasetColorMaker = exports.datasetColorMaker = generateColor();

function getNewDatasetColor(datasets) {
  var presetColors = datasetColors.map(String);
  var usedColors = (0, _lodash2.default)(Object.values(datasets).map(function (d) {
    return String(d.color);
  })).filter(function (c) {
    return presetColors.includes(c);
  });

  if (usedColors.length === presetColors.length) {
    // if we already depleted the pool of color
    return datasetColorMaker.next().value;
  }

  var color = datasetColorMaker.next().value;
  while (usedColors.includes(String(color))) {
    color = datasetColorMaker.next().value;
  }

  return color;
}

function createNewDataEntry(_ref) {
  var _ref$info = _ref.info,
      info = _ref$info === undefined ? {} : _ref$info,
      data = _ref.data;
  var datasets = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var validatedData = (0, _dataProcessor.validateInputData)(data);
  if (!validatedData) {
    return {};
  }

  var allData = validatedData.rows;
  var datasetInfo = (0, _extends3.default)({
    id: (0, _utils.generateHashId)(4),
    label: 'new dataset'
  }, info);
  var dataId = datasetInfo.id;

  // add tableFieldIndex and id to fields
  // TODO: don't need id and name and tableFieldIndex anymore
  // Add value accessor instead
  var fields = validatedData.fields.map(function (f, i) {
    return (0, _extends3.default)({}, f, {
      id: f.name,
      tableFieldIndex: i + 1
    });
  });

  return (0, _defineProperty3.default)({}, dataId, (0, _extends3.default)({}, datasetInfo, {
    color: datasetInfo.color || getNewDatasetColor(datasets),
    id: dataId,
    allData: allData,
    // TODO: no need to make a copy anymore, only save fieldedIndex
    data: allData.slice(),
    filteredIndex: allData.map(function (_, i) {
      return i;
    }),
    filteredIndexForDomain: allData.map(function (_, i) {
      return i;
    }),
    fieldPairs: findPointFieldPairs(fields),
    fields: fields
  }));
}

function removeSuffixAndDelimiters(layerName, suffix) {
  return layerName.replace(new RegExp(suffix, 'ig'), '').replace(/[_,.]+/g, ' ').trim();
}

/**
 * Find point fields pairs from fields
 *
 * @param {Array} fields
 * @returns {Array} found point fields
 */
function findPointFieldPairs(fields) {
  var allNames = fields.map(function (f) {
    return f.name.toLowerCase();
  });

  // get list of all fields with matching suffixes
  return allNames.reduce(function (carry, fieldName, idx) {
    // This search for pairs will early exit if found.
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = _defaultSettings.TRIP_POINT_FIELDS[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var suffixPair = _step.value;

        // match first suffix```
        if (fieldName.endsWith(suffixPair[0])) {
          var _ret = function () {
            // match second suffix
            var otherPattern = new RegExp(suffixPair[0] + '$');
            var partner = fieldName.replace(otherPattern, suffixPair[1]);

            var partnerIdx = allNames.findIndex(function (d) {
              return d === partner;
            });
            if (partnerIdx > -1) {
              var defaultName = removeSuffixAndDelimiters(fieldName, suffixPair[0]);

              carry.push({
                defaultName: defaultName,
                pair: {
                  lat: {
                    fieldIdx: idx,
                    value: fields[idx].name
                  },
                  lng: {
                    fieldIdx: partnerIdx,
                    value: fields[partnerIdx].name
                  }
                },
                suffix: suffixPair
              });
              return {
                v: carry
              };
            }
          }();

          if ((typeof _ret === 'undefined' ? 'undefined' : (0, _typeof3.default)(_ret)) === "object") return _ret.v;
        }
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    return carry;
  }, []);
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9kYXRhc2V0LXV0aWxzLmpzIl0sIm5hbWVzIjpbImNyZWF0ZU5ld0RhdGFFbnRyeSIsInJlbW92ZVN1ZmZpeEFuZERlbGltaXRlcnMiLCJmaW5kUG9pbnRGaWVsZFBhaXJzIiwiZ2VuZXJhdGVDb2xvciIsImRhdGFzZXRDb2xvcnMiLCJtYXAiLCJoZXhUb1JnYiIsImluZGV4IiwibGVuZ3RoIiwiZGF0YXNldENvbG9yTWFrZXIiLCJnZXROZXdEYXRhc2V0Q29sb3IiLCJkYXRhc2V0cyIsInByZXNldENvbG9ycyIsIlN0cmluZyIsInVzZWRDb2xvcnMiLCJPYmplY3QiLCJ2YWx1ZXMiLCJkIiwiY29sb3IiLCJmaWx0ZXIiLCJpbmNsdWRlcyIsImMiLCJuZXh0IiwidmFsdWUiLCJpbmZvIiwiZGF0YSIsInZhbGlkYXRlZERhdGEiLCJhbGxEYXRhIiwicm93cyIsImRhdGFzZXRJbmZvIiwiaWQiLCJsYWJlbCIsImRhdGFJZCIsImZpZWxkcyIsImYiLCJpIiwibmFtZSIsInRhYmxlRmllbGRJbmRleCIsInNsaWNlIiwiZmlsdGVyZWRJbmRleCIsIl8iLCJmaWx0ZXJlZEluZGV4Rm9yRG9tYWluIiwiZmllbGRQYWlycyIsImxheWVyTmFtZSIsInN1ZmZpeCIsInJlcGxhY2UiLCJSZWdFeHAiLCJ0cmltIiwiYWxsTmFtZXMiLCJ0b0xvd2VyQ2FzZSIsInJlZHVjZSIsImNhcnJ5IiwiZmllbGROYW1lIiwiaWR4IiwiVFJJUF9QT0lOVF9GSUVMRFMiLCJzdWZmaXhQYWlyIiwiZW5kc1dpdGgiLCJvdGhlclBhdHRlcm4iLCJwYXJ0bmVyIiwicGFydG5lcklkeCIsImZpbmRJbmRleCIsImRlZmF1bHROYW1lIiwicHVzaCIsInBhaXIiLCJsYXQiLCJmaWVsZElkeCIsImxuZyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7UUF3RWdCQSxrQixHQUFBQSxrQjtRQXVDQUMseUIsR0FBQUEseUI7UUFhQUMsbUIsR0FBQUEsbUI7O0FBeEdoQjs7QUFDQTs7OztBQUNBOztBQUNBOztBQUNBOzs7O3NEQWlCVUMsYSxHQXpDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFRQTtBQUNBO0FBQ0EsSUFBTUMsZ0JBQWdCLENBQ3BCLFNBRG9CLEVBRXBCLFNBRm9CLEVBR3BCLFNBSG9CLEVBSXBCLFNBSm9CLEVBS3BCLFNBTG9CLEVBTXBCLFNBTm9CLEVBT3BCLFNBUG9CLEVBUXBCQyxHQVJvQixDQVFoQkMsb0JBUmdCLENBQXRCOztBQVVBOzs7QUFHQSxTQUFVSCxhQUFWO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNNSSxlQUROLEdBQ2MsQ0FEZDs7QUFBQTtBQUFBLGdCQUVTQSxRQUFRSCxjQUFjSSxNQUFkLEdBQXVCLENBRnhDO0FBQUE7QUFBQTtBQUFBOztBQUdJLGNBQUlELFVBQVVILGNBQWNJLE1BQTVCLEVBQW9DO0FBQ2xDRCxvQkFBUSxDQUFSO0FBQ0Q7QUFMTDtBQUFBLGlCQU1VSCxjQUFjRyxPQUFkLENBTlY7O0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQVVPLElBQU1FLGdEQUFvQk4sZUFBMUI7O0FBRVAsU0FBU08sa0JBQVQsQ0FBNEJDLFFBQTVCLEVBQXNDO0FBQ3BDLE1BQU1DLGVBQWVSLGNBQWNDLEdBQWQsQ0FBa0JRLE1BQWxCLENBQXJCO0FBQ0EsTUFBTUMsYUFBYSxzQkFDakJDLE9BQU9DLE1BQVAsQ0FBY0wsUUFBZCxFQUF3Qk4sR0FBeEIsQ0FBNEI7QUFBQSxXQUFLUSxPQUFPSSxFQUFFQyxLQUFULENBQUw7QUFBQSxHQUE1QixDQURpQixFQUVqQkMsTUFGaUIsQ0FFVjtBQUFBLFdBQUtQLGFBQWFRLFFBQWIsQ0FBc0JDLENBQXRCLENBQUw7QUFBQSxHQUZVLENBQW5COztBQUlBLE1BQUlQLFdBQVdOLE1BQVgsS0FBc0JJLGFBQWFKLE1BQXZDLEVBQStDO0FBQzdDO0FBQ0EsV0FBT0Msa0JBQWtCYSxJQUFsQixHQUF5QkMsS0FBaEM7QUFDRDs7QUFFRCxNQUFJTCxRQUFRVCxrQkFBa0JhLElBQWxCLEdBQXlCQyxLQUFyQztBQUNBLFNBQU9ULFdBQVdNLFFBQVgsQ0FBb0JQLE9BQU9LLEtBQVAsQ0FBcEIsQ0FBUCxFQUEyQztBQUN6Q0EsWUFBUVQsa0JBQWtCYSxJQUFsQixHQUF5QkMsS0FBakM7QUFDRDs7QUFFRCxTQUFPTCxLQUFQO0FBQ0Q7O0FBRU0sU0FBU2xCLGtCQUFULE9BQThEO0FBQUEsdUJBQWpDd0IsSUFBaUM7QUFBQSxNQUFqQ0EsSUFBaUMsNkJBQTFCLEVBQTBCO0FBQUEsTUFBdEJDLElBQXNCLFFBQXRCQSxJQUFzQjtBQUFBLE1BQWZkLFFBQWUsdUVBQUosRUFBSTs7QUFDbkUsTUFBTWUsZ0JBQWdCLHNDQUFrQkQsSUFBbEIsQ0FBdEI7QUFDQSxNQUFJLENBQUNDLGFBQUwsRUFBb0I7QUFDbEIsV0FBTyxFQUFQO0FBQ0Q7O0FBRUQsTUFBTUMsVUFBVUQsY0FBY0UsSUFBOUI7QUFDQSxNQUFNQztBQUNKQyxRQUFJLDJCQUFlLENBQWYsQ0FEQTtBQUVKQyxXQUFPO0FBRkgsS0FHRFAsSUFIQyxDQUFOO0FBS0EsTUFBTVEsU0FBU0gsWUFBWUMsRUFBM0I7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsTUFBTUcsU0FBU1AsY0FBY08sTUFBZCxDQUFxQjVCLEdBQXJCLENBQXlCLFVBQUM2QixDQUFELEVBQUlDLENBQUo7QUFBQSxzQ0FDbkNELENBRG1DO0FBRXRDSixVQUFJSSxFQUFFRSxJQUZnQztBQUd0Q0MsdUJBQWlCRixJQUFJO0FBSGlCO0FBQUEsR0FBekIsQ0FBZjs7QUFNQSwyQ0FDR0gsTUFESCw2QkFFT0gsV0FGUDtBQUdJWCxXQUFPVyxZQUFZWCxLQUFaLElBQXFCUixtQkFBbUJDLFFBQW5CLENBSGhDO0FBSUltQixRQUFJRSxNQUpSO0FBS0lMLG9CQUxKO0FBTUk7QUFDQUYsVUFBTUUsUUFBUVcsS0FBUixFQVBWO0FBUUlDLG1CQUFlWixRQUFRdEIsR0FBUixDQUFZLFVBQUNtQyxDQUFELEVBQUlMLENBQUo7QUFBQSxhQUFVQSxDQUFWO0FBQUEsS0FBWixDQVJuQjtBQVNJTSw0QkFBd0JkLFFBQVF0QixHQUFSLENBQVksVUFBQ21DLENBQUQsRUFBSUwsQ0FBSjtBQUFBLGFBQVVBLENBQVY7QUFBQSxLQUFaLENBVDVCO0FBVUlPLGdCQUFZeEMsb0JBQW9CK0IsTUFBcEIsQ0FWaEI7QUFXSUE7QUFYSjtBQWNEOztBQUVNLFNBQVNoQyx5QkFBVCxDQUFtQzBDLFNBQW5DLEVBQThDQyxNQUE5QyxFQUFzRDtBQUMzRCxTQUFPRCxVQUNKRSxPQURJLENBQ0ksSUFBSUMsTUFBSixDQUFXRixNQUFYLEVBQW1CLElBQW5CLENBREosRUFDOEIsRUFEOUIsRUFFSkMsT0FGSSxDQUVJLFNBRkosRUFFZSxHQUZmLEVBR0pFLElBSEksRUFBUDtBQUlEOztBQUVEOzs7Ozs7QUFNTyxTQUFTN0MsbUJBQVQsQ0FBNkIrQixNQUE3QixFQUFxQztBQUMxQyxNQUFNZSxXQUFXZixPQUFPNUIsR0FBUCxDQUFXO0FBQUEsV0FBSzZCLEVBQUVFLElBQUYsQ0FBT2EsV0FBUCxFQUFMO0FBQUEsR0FBWCxDQUFqQjs7QUFFQTtBQUNBLFNBQU9ELFNBQVNFLE1BQVQsQ0FBZ0IsVUFBQ0MsS0FBRCxFQUFRQyxTQUFSLEVBQW1CQyxHQUFuQixFQUEyQjtBQUNoRDtBQURnRDtBQUFBO0FBQUE7O0FBQUE7QUFFaEQsMkJBQXlCQyxrQ0FBekIsOEhBQTRDO0FBQUEsWUFBakNDLFVBQWlDOztBQUMxQztBQUNBLFlBQUlILFVBQVVJLFFBQVYsQ0FBbUJELFdBQVcsQ0FBWCxDQUFuQixDQUFKLEVBQXVDO0FBQUE7QUFDckM7QUFDQSxnQkFBTUUsZUFBZSxJQUFJWCxNQUFKLENBQWNTLFdBQVcsQ0FBWCxDQUFkLE9BQXJCO0FBQ0EsZ0JBQU1HLFVBQVVOLFVBQVVQLE9BQVYsQ0FBa0JZLFlBQWxCLEVBQWdDRixXQUFXLENBQVgsQ0FBaEMsQ0FBaEI7O0FBRUEsZ0JBQU1JLGFBQWFYLFNBQVNZLFNBQVQsQ0FBbUI7QUFBQSxxQkFBSzNDLE1BQU15QyxPQUFYO0FBQUEsYUFBbkIsQ0FBbkI7QUFDQSxnQkFBSUMsYUFBYSxDQUFDLENBQWxCLEVBQXFCO0FBQ25CLGtCQUFNRSxjQUFjNUQsMEJBQ2xCbUQsU0FEa0IsRUFFbEJHLFdBQVcsQ0FBWCxDQUZrQixDQUFwQjs7QUFLQUosb0JBQU1XLElBQU4sQ0FBVztBQUNURCx3Q0FEUztBQUVURSxzQkFBTTtBQUNKQyx1QkFBSztBQUNIQyw4QkFBVVosR0FEUDtBQUVIOUIsMkJBQU9VLE9BQU9vQixHQUFQLEVBQVlqQjtBQUZoQixtQkFERDtBQUtKOEIsdUJBQUs7QUFDSEQsOEJBQVVOLFVBRFA7QUFFSHBDLDJCQUFPVSxPQUFPMEIsVUFBUCxFQUFtQnZCO0FBRnZCO0FBTEQsaUJBRkc7QUFZVFEsd0JBQVFXO0FBWkMsZUFBWDtBQWNBO0FBQUEsbUJBQU9KO0FBQVA7QUFDRDtBQTNCb0M7O0FBQUE7QUE0QnRDO0FBQ0Y7QUFqQytDO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBa0NoRCxXQUFPQSxLQUFQO0FBQ0QsR0FuQ00sRUFtQ0osRUFuQ0ksQ0FBUDtBQW9DRCIsImZpbGUiOiJkYXRhc2V0LXV0aWxzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSAyMDE4IFViZXIgVGVjaG5vbG9naWVzLCBJbmMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuLy8gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuLy8gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuLy8gdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuLy8gY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4vLyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4vLyBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4vLyBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbi8vIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuLy8gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuLy8gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbi8vIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbi8vIFRIRSBTT0ZUV0FSRS5cblxuaW1wb3J0IHtoZXhUb1JnYn0gZnJvbSAnLi9jb2xvci11dGlscyc7XG5pbXBvcnQgdW5pcSBmcm9tICdsb2Rhc2gudW5pcSc7XG5pbXBvcnQge1RSSVBfUE9JTlRfRklFTERTfSBmcm9tICdjb25zdGFudHMvZGVmYXVsdC1zZXR0aW5ncyc7XG5pbXBvcnQge2dlbmVyYXRlSGFzaElkfSBmcm9tICcuL3V0aWxzJztcbmltcG9ydCB7dmFsaWRhdGVJbnB1dERhdGF9IGZyb20gJ3Byb2Nlc3NvcnMvZGF0YS1wcm9jZXNzb3InXG4gIDtcbi8vIGFwcGx5IGEgY29sb3IgZm9yIGVhY2ggZGF0YXNldFxuLy8gdG8gdXNlIGFzIGxhYmVsIGNvbG9yc1xuY29uc3QgZGF0YXNldENvbG9ycyA9IFtcbiAgJyM4RjJGQkYnLFxuICAnIzAwNUNGRicsXG4gICcjQzA2Qzg0JyxcbiAgJyNGOEIxOTUnLFxuICAnIzU0N0E4MicsXG4gICcjM0VBQ0E4JyxcbiAgJyNBMkQ0QUInXG5dLm1hcChoZXhUb1JnYik7XG5cbi8qKlxuICogUmFuZG9tIGNvbG9yIGdlbmVyYXRvclxuICovXG5mdW5jdGlvbiogZ2VuZXJhdGVDb2xvcigpIHtcbiAgbGV0IGluZGV4ID0gMDtcbiAgd2hpbGUgKGluZGV4IDwgZGF0YXNldENvbG9ycy5sZW5ndGggKyAxKSB7XG4gICAgaWYgKGluZGV4ID09PSBkYXRhc2V0Q29sb3JzLmxlbmd0aCkge1xuICAgICAgaW5kZXggPSAwO1xuICAgIH1cbiAgICB5aWVsZCBkYXRhc2V0Q29sb3JzW2luZGV4KytdO1xuICB9XG59XG5cbmV4cG9ydCBjb25zdCBkYXRhc2V0Q29sb3JNYWtlciA9IGdlbmVyYXRlQ29sb3IoKTtcblxuZnVuY3Rpb24gZ2V0TmV3RGF0YXNldENvbG9yKGRhdGFzZXRzKSB7XG4gIGNvbnN0IHByZXNldENvbG9ycyA9IGRhdGFzZXRDb2xvcnMubWFwKFN0cmluZyk7XG4gIGNvbnN0IHVzZWRDb2xvcnMgPSB1bmlxKFxuICAgIE9iamVjdC52YWx1ZXMoZGF0YXNldHMpLm1hcChkID0+IFN0cmluZyhkLmNvbG9yKSlcbiAgKS5maWx0ZXIoYyA9PiBwcmVzZXRDb2xvcnMuaW5jbHVkZXMoYykpO1xuXG4gIGlmICh1c2VkQ29sb3JzLmxlbmd0aCA9PT0gcHJlc2V0Q29sb3JzLmxlbmd0aCkge1xuICAgIC8vIGlmIHdlIGFscmVhZHkgZGVwbGV0ZWQgdGhlIHBvb2wgb2YgY29sb3JcbiAgICByZXR1cm4gZGF0YXNldENvbG9yTWFrZXIubmV4dCgpLnZhbHVlO1xuICB9XG5cbiAgbGV0IGNvbG9yID0gZGF0YXNldENvbG9yTWFrZXIubmV4dCgpLnZhbHVlO1xuICB3aGlsZSAodXNlZENvbG9ycy5pbmNsdWRlcyhTdHJpbmcoY29sb3IpKSkge1xuICAgIGNvbG9yID0gZGF0YXNldENvbG9yTWFrZXIubmV4dCgpLnZhbHVlO1xuICB9XG5cbiAgcmV0dXJuIGNvbG9yO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlTmV3RGF0YUVudHJ5KHtpbmZvID0ge30sIGRhdGF9LCBkYXRhc2V0cyA9IHt9KSB7XG4gIGNvbnN0IHZhbGlkYXRlZERhdGEgPSB2YWxpZGF0ZUlucHV0RGF0YShkYXRhKTtcbiAgaWYgKCF2YWxpZGF0ZWREYXRhKSB7XG4gICAgcmV0dXJuIHt9O1xuICB9XG5cbiAgY29uc3QgYWxsRGF0YSA9IHZhbGlkYXRlZERhdGEucm93cztcbiAgY29uc3QgZGF0YXNldEluZm8gPSB7XG4gICAgaWQ6IGdlbmVyYXRlSGFzaElkKDQpLFxuICAgIGxhYmVsOiAnbmV3IGRhdGFzZXQnLFxuICAgIC4uLmluZm9cbiAgfTtcbiAgY29uc3QgZGF0YUlkID0gZGF0YXNldEluZm8uaWQ7XG5cbiAgLy8gYWRkIHRhYmxlRmllbGRJbmRleCBhbmQgaWQgdG8gZmllbGRzXG4gIC8vIFRPRE86IGRvbid0IG5lZWQgaWQgYW5kIG5hbWUgYW5kIHRhYmxlRmllbGRJbmRleCBhbnltb3JlXG4gIC8vIEFkZCB2YWx1ZSBhY2Nlc3NvciBpbnN0ZWFkXG4gIGNvbnN0IGZpZWxkcyA9IHZhbGlkYXRlZERhdGEuZmllbGRzLm1hcCgoZiwgaSkgPT4gKHtcbiAgICAuLi5mLFxuICAgIGlkOiBmLm5hbWUsXG4gICAgdGFibGVGaWVsZEluZGV4OiBpICsgMVxuICB9KSk7XG5cbiAgcmV0dXJuIHtcbiAgICBbZGF0YUlkXToge1xuICAgICAgLi4uZGF0YXNldEluZm8sXG4gICAgICBjb2xvcjogZGF0YXNldEluZm8uY29sb3IgfHwgZ2V0TmV3RGF0YXNldENvbG9yKGRhdGFzZXRzKSxcbiAgICAgIGlkOiBkYXRhSWQsXG4gICAgICBhbGxEYXRhLFxuICAgICAgLy8gVE9ETzogbm8gbmVlZCB0byBtYWtlIGEgY29weSBhbnltb3JlLCBvbmx5IHNhdmUgZmllbGRlZEluZGV4XG4gICAgICBkYXRhOiBhbGxEYXRhLnNsaWNlKCksXG4gICAgICBmaWx0ZXJlZEluZGV4OiBhbGxEYXRhLm1hcCgoXywgaSkgPT4gaSksXG4gICAgICBmaWx0ZXJlZEluZGV4Rm9yRG9tYWluOiBhbGxEYXRhLm1hcCgoXywgaSkgPT4gaSksXG4gICAgICBmaWVsZFBhaXJzOiBmaW5kUG9pbnRGaWVsZFBhaXJzKGZpZWxkcyksXG4gICAgICBmaWVsZHNcbiAgICB9XG4gIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZW1vdmVTdWZmaXhBbmREZWxpbWl0ZXJzKGxheWVyTmFtZSwgc3VmZml4KSB7XG4gIHJldHVybiBsYXllck5hbWVcbiAgICAucmVwbGFjZShuZXcgUmVnRXhwKHN1ZmZpeCwgJ2lnJyksICcnKVxuICAgIC5yZXBsYWNlKC9bXywuXSsvZywgJyAnKVxuICAgIC50cmltKCk7XG59XG5cbi8qKlxuICogRmluZCBwb2ludCBmaWVsZHMgcGFpcnMgZnJvbSBmaWVsZHNcbiAqXG4gKiBAcGFyYW0ge0FycmF5fSBmaWVsZHNcbiAqIEByZXR1cm5zIHtBcnJheX0gZm91bmQgcG9pbnQgZmllbGRzXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBmaW5kUG9pbnRGaWVsZFBhaXJzKGZpZWxkcykge1xuICBjb25zdCBhbGxOYW1lcyA9IGZpZWxkcy5tYXAoZiA9PiBmLm5hbWUudG9Mb3dlckNhc2UoKSk7XG5cbiAgLy8gZ2V0IGxpc3Qgb2YgYWxsIGZpZWxkcyB3aXRoIG1hdGNoaW5nIHN1ZmZpeGVzXG4gIHJldHVybiBhbGxOYW1lcy5yZWR1Y2UoKGNhcnJ5LCBmaWVsZE5hbWUsIGlkeCkgPT4ge1xuICAgIC8vIFRoaXMgc2VhcmNoIGZvciBwYWlycyB3aWxsIGVhcmx5IGV4aXQgaWYgZm91bmQuXG4gICAgZm9yIChjb25zdCBzdWZmaXhQYWlyIG9mIFRSSVBfUE9JTlRfRklFTERTKSB7XG4gICAgICAvLyBtYXRjaCBmaXJzdCBzdWZmaXhgYGBcbiAgICAgIGlmIChmaWVsZE5hbWUuZW5kc1dpdGgoc3VmZml4UGFpclswXSkpIHtcbiAgICAgICAgLy8gbWF0Y2ggc2Vjb25kIHN1ZmZpeFxuICAgICAgICBjb25zdCBvdGhlclBhdHRlcm4gPSBuZXcgUmVnRXhwKGAke3N1ZmZpeFBhaXJbMF19XFwkYCk7XG4gICAgICAgIGNvbnN0IHBhcnRuZXIgPSBmaWVsZE5hbWUucmVwbGFjZShvdGhlclBhdHRlcm4sIHN1ZmZpeFBhaXJbMV0pO1xuXG4gICAgICAgIGNvbnN0IHBhcnRuZXJJZHggPSBhbGxOYW1lcy5maW5kSW5kZXgoZCA9PiBkID09PSBwYXJ0bmVyKTtcbiAgICAgICAgaWYgKHBhcnRuZXJJZHggPiAtMSkge1xuICAgICAgICAgIGNvbnN0IGRlZmF1bHROYW1lID0gcmVtb3ZlU3VmZml4QW5kRGVsaW1pdGVycyhcbiAgICAgICAgICAgIGZpZWxkTmFtZSxcbiAgICAgICAgICAgIHN1ZmZpeFBhaXJbMF1cbiAgICAgICAgICApO1xuXG4gICAgICAgICAgY2FycnkucHVzaCh7XG4gICAgICAgICAgICBkZWZhdWx0TmFtZSxcbiAgICAgICAgICAgIHBhaXI6IHtcbiAgICAgICAgICAgICAgbGF0OiB7XG4gICAgICAgICAgICAgICAgZmllbGRJZHg6IGlkeCxcbiAgICAgICAgICAgICAgICB2YWx1ZTogZmllbGRzW2lkeF0ubmFtZVxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBsbmc6IHtcbiAgICAgICAgICAgICAgICBmaWVsZElkeDogcGFydG5lcklkeCxcbiAgICAgICAgICAgICAgICB2YWx1ZTogZmllbGRzW3BhcnRuZXJJZHhdLm5hbWVcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHN1ZmZpeDogc3VmZml4UGFpclxuICAgICAgICAgIH0pO1xuICAgICAgICAgIHJldHVybiBjYXJyeTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gY2Fycnk7XG4gIH0sIFtdKTtcbn1cbiJdfQ==