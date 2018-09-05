'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _datasetSchema; // Copyright (c) 2018 Uber Technologies, Inc.
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

var _lodash = require('lodash.pick');

var _lodash2 = _interopRequireDefault(_lodash);

var _window = require('global/window');

var _versions = require('./versions');

var _schema = require('./schema');

var _schema2 = _interopRequireDefault(_schema);

var _dataProcessor = require('../processors/data-processor');

var _defaultSettings = require('../constants/default-settings');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// version v0
var fieldPropertiesV0 = {
  name: null,
  type: null
};

var fieldPropertiesV1 = {
  name: null,
  type: null,
  format: null
};

var FieldSchema = function (_Schema) {
  (0, _inherits3.default)(FieldSchema, _Schema);

  function FieldSchema() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, FieldSchema);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = FieldSchema.__proto__ || Object.getPrototypeOf(FieldSchema)).call.apply(_ref, [this].concat(args))), _this), _this.key = 'fields', _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(FieldSchema, [{
    key: 'save',
    value: function save(fields) {
      var _this2 = this;

      return (0, _defineProperty3.default)({}, this.key, fields.map(function (f) {
        return _this2.savePropertiesOrApplySchema(f)[_this2.key];
      }));
    }
  }, {
    key: 'load',
    value: function load(fields) {
      return (0, _defineProperty3.default)({}, this.key, fields);
    }
  }]);
  return FieldSchema;
}(_schema2.default);

var propertiesV0 = {
  id: null,
  label: null,
  color: null,
  allData: null,
  fields: new FieldSchema({
    version: _versions.VERSIONS.v0,
    properties: fieldPropertiesV0
  })
};

var propertiesV1 = (0, _extends3.default)({}, propertiesV0, {
  fields: new FieldSchema({
    version: _versions.VERSIONS.v1,
    properties: fieldPropertiesV1
  })
});

var DatasetSchema = function (_Schema2) {
  (0, _inherits3.default)(DatasetSchema, _Schema2);

  function DatasetSchema() {
    var _ref4;

    var _temp2, _this3, _ret2;

    (0, _classCallCheck3.default)(this, DatasetSchema);

    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    return _ret2 = (_temp2 = (_this3 = (0, _possibleConstructorReturn3.default)(this, (_ref4 = DatasetSchema.__proto__ || Object.getPrototypeOf(DatasetSchema)).call.apply(_ref4, [this].concat(args))), _this3), _this3.key = 'dataset', _temp2), (0, _possibleConstructorReturn3.default)(_this3, _ret2);
  }

  (0, _createClass3.default)(DatasetSchema, [{
    key: 'save',
    value: function save(dataset) {
      return this.savePropertiesOrApplySchema(dataset)[this.key];
    }
  }, {
    key: 'load',
    value: function load(dataset) {
      var fields = dataset.fields,
          allData = dataset.allData;

      var updatedFields = fields;

      // recalculate field type
      // because we have updated type-analyzer
      // we need to add format to each field
      var needCalculateMeta = fields[0] && !fields[0].hasOwnProperty('format');

      if (needCalculateMeta) {
        var fieldOrder = fields.map(function (f) {
          return f.name;
        });

        var sampleData = (0, _dataProcessor.getSampleForTypeAnalyze)({ fields: fieldOrder, allData: allData });
        var meta = (0, _dataProcessor.getFieldsFromData)(sampleData, fieldOrder);

        updatedFields = fields.map(function (f, i) {
          return (0, _extends3.default)({}, f, {
            // note here we add format to timestamp field
            format: f.type === _defaultSettings.ALL_FIELD_TYPES.timestamp ? meta[i].format : ''
          });
        });

        updatedFields.forEach(function (f, i) {
          if (meta[i].type !== f.type) {
            // if newly detected field type is different from saved type
            // we log it but won't update it, cause we don't want to break people's map
            _window.console.warn('detect ' + f.name + ' type is now ' + meta[i].type + ' instead of ' + f.type);
          }
        });
      }

      // get format of all fields
      return {
        data: { fields: updatedFields, rows: dataset.allData },
        info: (0, _lodash2.default)(dataset, ['id', 'label', 'color'])
      };
    }
  }]);
  return DatasetSchema;
}(_schema2.default);

var datasetSchema = (_datasetSchema = {}, (0, _defineProperty3.default)(_datasetSchema, _versions.VERSIONS.v0, new DatasetSchema({
  version: _versions.VERSIONS.v0,
  properties: propertiesV0
})), (0, _defineProperty3.default)(_datasetSchema, _versions.VERSIONS.v1, new DatasetSchema({
  version: _versions.VERSIONS.v1,
  properties: propertiesV1
})), _datasetSchema);

exports.default = datasetSchema;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zY2hlbWFzL2RhdGFzZXQtc2NoZW1hLmpzIl0sIm5hbWVzIjpbImZpZWxkUHJvcGVydGllc1YwIiwibmFtZSIsInR5cGUiLCJmaWVsZFByb3BlcnRpZXNWMSIsImZvcm1hdCIsIkZpZWxkU2NoZW1hIiwia2V5IiwiZmllbGRzIiwibWFwIiwic2F2ZVByb3BlcnRpZXNPckFwcGx5U2NoZW1hIiwiZiIsIlNjaGVtYSIsInByb3BlcnRpZXNWMCIsImlkIiwibGFiZWwiLCJjb2xvciIsImFsbERhdGEiLCJ2ZXJzaW9uIiwiVkVSU0lPTlMiLCJ2MCIsInByb3BlcnRpZXMiLCJwcm9wZXJ0aWVzVjEiLCJ2MSIsIkRhdGFzZXRTY2hlbWEiLCJkYXRhc2V0IiwidXBkYXRlZEZpZWxkcyIsIm5lZWRDYWxjdWxhdGVNZXRhIiwiaGFzT3duUHJvcGVydHkiLCJmaWVsZE9yZGVyIiwic2FtcGxlRGF0YSIsIm1ldGEiLCJpIiwiQUxMX0ZJRUxEX1RZUEVTIiwidGltZXN0YW1wIiwiZm9yRWFjaCIsImdsb2JhbENvbnNvbGUiLCJ3YXJuIiwiZGF0YSIsInJvd3MiLCJpbmZvIiwiZGF0YXNldFNjaGVtYSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O29CQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7O0FBQ0E7O0FBRUE7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7OztBQUVBO0FBQ0EsSUFBTUEsb0JBQW9CO0FBQ3hCQyxRQUFNLElBRGtCO0FBRXhCQyxRQUFNO0FBRmtCLENBQTFCOztBQUtBLElBQU1DLG9CQUFvQjtBQUN4QkYsUUFBTSxJQURrQjtBQUV4QkMsUUFBTSxJQUZrQjtBQUd4QkUsVUFBUTtBQUhnQixDQUExQjs7SUFNTUMsVzs7Ozs7Ozs7Ozs7Ozs7OE1BQ0pDLEcsR0FBTSxROzs7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SixDQUFrQjtBQUMvQk4sV0FBU0MsbUJBQVNJLEVBRGE7QUFFL0JGLGNBQVlDO0FBRm1CLENBQWxCLENBTFgsa0JBQU47O2tCQVdlbUIsYSIsImZpbGUiOiJkYXRhc2V0LXNjaGVtYS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgMjAxOCBVYmVyIFRlY2hub2xvZ2llcywgSW5jLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbi8vIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbi8vIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbi8vIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbi8vIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuLy8gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuLy8gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4vLyBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbi8vIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbi8vIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4vLyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4vLyBUSEUgU09GVFdBUkUuXG5cbmltcG9ydCBwaWNrIGZyb20gJ2xvZGFzaC5waWNrJztcbmltcG9ydCB7Y29uc29sZSBhcyBnbG9iYWxDb25zb2xlfSBmcm9tICdnbG9iYWwvd2luZG93JztcblxuaW1wb3J0IHtWRVJTSU9OU30gZnJvbSAnLi92ZXJzaW9ucyc7XG5pbXBvcnQgU2NoZW1hIGZyb20gJy4vc2NoZW1hJztcbmltcG9ydCB7Z2V0RmllbGRzRnJvbURhdGEsIGdldFNhbXBsZUZvclR5cGVBbmFseXplfSBmcm9tICdwcm9jZXNzb3JzL2RhdGEtcHJvY2Vzc29yJztcbmltcG9ydCB7QUxMX0ZJRUxEX1RZUEVTfSBmcm9tICdjb25zdGFudHMvZGVmYXVsdC1zZXR0aW5ncyc7XG5cbi8vIHZlcnNpb24gdjBcbmNvbnN0IGZpZWxkUHJvcGVydGllc1YwID0ge1xuICBuYW1lOiBudWxsLFxuICB0eXBlOiBudWxsXG59O1xuXG5jb25zdCBmaWVsZFByb3BlcnRpZXNWMSA9IHtcbiAgbmFtZTogbnVsbCxcbiAgdHlwZTogbnVsbCxcbiAgZm9ybWF0OiBudWxsXG59O1xuXG5jbGFzcyBGaWVsZFNjaGVtYSBleHRlbmRzIFNjaGVtYSB7XG4gIGtleSA9ICdmaWVsZHMnO1xuICBzYXZlKGZpZWxkcykge1xuICAgIHJldHVybiB7XG4gICAgICBbdGhpcy5rZXldOiBmaWVsZHMubWFwKGYgPT4gdGhpcy5zYXZlUHJvcGVydGllc09yQXBwbHlTY2hlbWEoZilbdGhpcy5rZXldKVxuICAgIH07XG4gIH1cbiAgbG9hZChmaWVsZHMpIHtcbiAgICByZXR1cm4ge1t0aGlzLmtleV06IGZpZWxkc307XG4gIH1cbn1cblxuY29uc3QgcHJvcGVydGllc1YwID0ge1xuICBpZDogbnVsbCxcbiAgbGFiZWw6IG51bGwsXG4gIGNvbG9yOiBudWxsLFxuICBhbGxEYXRhOiBudWxsLFxuICBmaWVsZHM6IG5ldyBGaWVsZFNjaGVtYSh7XG4gICAgdmVyc2lvbjogVkVSU0lPTlMudjAsXG4gICAgcHJvcGVydGllczogZmllbGRQcm9wZXJ0aWVzVjBcbiAgfSlcbn07XG5cbmNvbnN0IHByb3BlcnRpZXNWMSA9IHtcbiAgLi4ucHJvcGVydGllc1YwLFxuICBmaWVsZHM6IG5ldyBGaWVsZFNjaGVtYSh7XG4gICAgdmVyc2lvbjogVkVSU0lPTlMudjEsXG4gICAgcHJvcGVydGllczogZmllbGRQcm9wZXJ0aWVzVjFcbiAgfSlcbn07XG5cbmNsYXNzIERhdGFzZXRTY2hlbWEgZXh0ZW5kcyBTY2hlbWEge1xuICBrZXkgPSAnZGF0YXNldCc7XG5cbiAgc2F2ZShkYXRhc2V0KSB7XG4gICAgcmV0dXJuIHRoaXMuc2F2ZVByb3BlcnRpZXNPckFwcGx5U2NoZW1hKGRhdGFzZXQpW3RoaXMua2V5XTtcbiAgfVxuICBsb2FkKGRhdGFzZXQpIHtcbiAgICBjb25zdCB7ZmllbGRzLCBhbGxEYXRhfSA9IGRhdGFzZXQ7XG4gICAgbGV0IHVwZGF0ZWRGaWVsZHMgPSBmaWVsZHM7XG5cbiAgICAvLyByZWNhbGN1bGF0ZSBmaWVsZCB0eXBlXG4gICAgLy8gYmVjYXVzZSB3ZSBoYXZlIHVwZGF0ZWQgdHlwZS1hbmFseXplclxuICAgIC8vIHdlIG5lZWQgdG8gYWRkIGZvcm1hdCB0byBlYWNoIGZpZWxkXG4gICAgY29uc3QgbmVlZENhbGN1bGF0ZU1ldGEgPSBmaWVsZHNbMF0gJiYgIWZpZWxkc1swXS5oYXNPd25Qcm9wZXJ0eSgnZm9ybWF0Jyk7XG5cbiAgICBpZiAobmVlZENhbGN1bGF0ZU1ldGEpIHtcbiAgICAgIGNvbnN0IGZpZWxkT3JkZXIgPSBmaWVsZHMubWFwKGYgPT4gZi5uYW1lKTtcblxuICAgICAgY29uc3Qgc2FtcGxlRGF0YSA9IGdldFNhbXBsZUZvclR5cGVBbmFseXplKHtmaWVsZHM6IGZpZWxkT3JkZXIsIGFsbERhdGF9KTtcbiAgICAgIGNvbnN0IG1ldGEgPSBnZXRGaWVsZHNGcm9tRGF0YShzYW1wbGVEYXRhLCBmaWVsZE9yZGVyKTtcblxuICAgICAgdXBkYXRlZEZpZWxkcyA9IGZpZWxkcy5tYXAoKGYsIGkpID0+ICh7XG4gICAgICAgIC4uLmYsXG4gICAgICAgIC8vIG5vdGUgaGVyZSB3ZSBhZGQgZm9ybWF0IHRvIHRpbWVzdGFtcCBmaWVsZFxuICAgICAgICBmb3JtYXQ6IGYudHlwZSA9PT0gQUxMX0ZJRUxEX1RZUEVTLnRpbWVzdGFtcCA/IG1ldGFbaV0uZm9ybWF0IDogJydcbiAgICAgIH0pKTtcblxuICAgICAgdXBkYXRlZEZpZWxkcy5mb3JFYWNoKChmLCBpKSA9PiB7XG4gICAgICAgIGlmIChtZXRhW2ldLnR5cGUgIT09IGYudHlwZSkge1xuICAgICAgICAgIC8vIGlmIG5ld2x5IGRldGVjdGVkIGZpZWxkIHR5cGUgaXMgZGlmZmVyZW50IGZyb20gc2F2ZWQgdHlwZVxuICAgICAgICAgIC8vIHdlIGxvZyBpdCBidXQgd29uJ3QgdXBkYXRlIGl0LCBjYXVzZSB3ZSBkb24ndCB3YW50IHRvIGJyZWFrIHBlb3BsZSdzIG1hcFxuICAgICAgICAgIGdsb2JhbENvbnNvbGUud2FybihcbiAgICAgICAgICAgIGBkZXRlY3QgJHtmLm5hbWV9IHR5cGUgaXMgbm93ICR7bWV0YVtpXS50eXBlfSBpbnN0ZWFkIG9mICR7Zi50eXBlfWBcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyBnZXQgZm9ybWF0IG9mIGFsbCBmaWVsZHNcbiAgICByZXR1cm4ge1xuICAgICAgZGF0YToge2ZpZWxkczogdXBkYXRlZEZpZWxkcywgcm93czogZGF0YXNldC5hbGxEYXRhfSxcbiAgICAgIGluZm86IHBpY2soZGF0YXNldCwgWydpZCcsICdsYWJlbCcsICdjb2xvciddKVxuICAgIH07XG4gIH1cbn1cblxuY29uc3QgZGF0YXNldFNjaGVtYSA9IHtcbiAgW1ZFUlNJT05TLnYwXTogbmV3IERhdGFzZXRTY2hlbWEoe1xuICAgIHZlcnNpb246IFZFUlNJT05TLnYwLFxuICAgIHByb3BlcnRpZXM6IHByb3BlcnRpZXNWMFxuICB9KSxcbiAgW1ZFUlNJT05TLnYxXTogbmV3IERhdGFzZXRTY2hlbWEoe1xuICAgIHZlcnNpb246IFZFUlNJT05TLnYxLFxuICAgIHByb3BlcnRpZXM6IHByb3BlcnRpZXNWMVxuICB9KVxufTtcblxuZXhwb3J0IGRlZmF1bHQgZGF0YXNldFNjaGVtYTtcbiJdfQ==