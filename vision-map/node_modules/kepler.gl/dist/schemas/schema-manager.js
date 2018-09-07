'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _window = require('global/window');

var _visStateSchema = require('./vis-state-schema');

var _visStateSchema2 = _interopRequireDefault(_visStateSchema);

var _datasetSchema = require('./dataset-schema');

var _datasetSchema2 = _interopRequireDefault(_datasetSchema);

var _mapStyleSchema = require('./map-style-schema');

var _mapStyleSchema2 = _interopRequireDefault(_mapStyleSchema);

var _mapStateSchema = require('./map-state-schema');

var _mapStateSchema2 = _interopRequireDefault(_mapStateSchema);

var _versions = require('./versions');

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

var REDUCER_SCHEMAS = {
  visState: _visStateSchema2.default,
  mapState: _mapStateSchema2.default,
  mapStyle: _mapStyleSchema2.default
};

var KeplerGLSchema = function () {
  function KeplerGLSchema() {
    (0, _classCallCheck3.default)(this, KeplerGLSchema);

    this._validVersions = _versions.VERSIONS;
    this._version = _versions.CURRENT_VERSION;
    this._reducerSchemas = REDUCER_SCHEMAS;
    this._datasetSchema = _datasetSchema2.default;

    this._datasetLastSaved = null;
    this._savedDataset = null;
  }

  /**
   * stateToSave = {
   *   datasets: [
   *     {
   *       version: 'v0',
   *       data: {id, label, color, allData, fields}
   *     },
   *     {
   *       version: 'v0',
   *       data: {id, label, color, allData, fields}
   *     }
   *   ],
   *   config: {
   *     version: 'v0',
   *     config: {}
   *   },
   *   info: {
   *     app: 'kepler.gl',
   *     create_at: 'Mon May 28 2018 21:04:46 GMT-0700 (PDT)'
   *   }
   * }
   *
   * Get config and data of current map to save
   * @param {Object} state
   * @returns {Object | null} app state to save
   */


  (0, _createClass3.default)(KeplerGLSchema, [{
    key: 'save',
    value: function save(state) {
      return {
        datasets: this.getDatasetToSave(state),
        config: this.getConfigToSave(state),
        info: {
          app: 'kepler.gl',
          created_at: new Date().toString()
        }
      };
    }
  }, {
    key: 'load',
    value: function load(savedDatasets, savedConfig) {
      return {
        datasets: this.parseSavedData(savedDatasets),
        config: savedConfig ? this.parseSavedConfig(savedConfig) : undefined
      };
    }

    /**
     * Get data to save
     * @param {Object} state - app state
     * @returns {{version: String, data: Object}} - dataset to save
     */

  }, {
    key: 'getDatasetToSave',
    value: function getDatasetToSave(state) {
      var _this = this;

      var dataChangedSinceLastSave = this.hasDataChanged(state);
      if (!dataChangedSinceLastSave) {
        return this._savedDataset;
      }

      var visState = state.visState;


      var datasets = Object.values(visState.datasets).map(function (ds) {
        return {
          version: _this._version,
          data: _this._datasetSchema[_this._version].save(ds)
        };
      });

      // keep a copy of formatted datasets to save
      this._datasetLastSaved = visState.datasets;
      this._savedDataset = datasets;

      return datasets;
    }

    /**
     * Get App config to save
     * @param {Object} state - app state
     * @returns {{version: String, config: Object}} - config to save
     */

  }, {
    key: 'getConfigToSave',
    value: function getConfigToSave(state) {
      var _this2 = this;

      var config = Object.keys(this._reducerSchemas).reduce(function (accu, key) {
        return (0, _extends3.default)({}, accu, _this2._reducerSchemas[key][_this2._version].save(state[key]));
      }, {});

      return {
        version: this._version,
        config: config
      };
    }

    /**
     * Parse saved data
     * @param {Array} datasets
     * @returns {Object | null} - data to save
     */

  }, {
    key: 'parseSavedData',
    value: function parseSavedData(datasets) {
      var _this3 = this;

      return datasets.reduce(function (accu, ds) {
        var validVersion = _this3.validateVersion(ds.version);
        if (!validVersion) {
          return accu;
        }
        accu.push(_this3._datasetSchema[validVersion].load(ds.data));
        return accu;
      }, []);
    }

    /**
     * Parse saved App config
     * @param {String} opt.version - config version
     * @param {Object} opt.config - saved config
     * @param {Object} state - current App State
     * @returns {Object | null} - parsed config
     */

  }, {
    key: 'parseSavedConfig',
    value: function parseSavedConfig(_ref) {
      var _this4 = this;

      var version = _ref.version,
          config = _ref.config;
      var state = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      var validVersion = this.validateVersion(version);
      if (!validVersion) {
        return null;
      }

      return Object.keys(config).reduce(function (accu, key) {
        return (0, _extends3.default)({}, accu, key in _this4._reducerSchemas ? _this4._reducerSchemas[key][validVersion].load(config[key], state[key]) : {});
      }, {});
    }

    /**
     * Validate version
     * @param {String} version
     * @returns {String | null} validVersion
     */

  }, {
    key: 'validateVersion',
    value: function validateVersion(version) {
      if (!version) {
        _window.console.error('There is no version number associated with this saved map');
        return null;
      }

      if (!this._validVersions[version]) {
        _window.console.error(version + ' is not a valid version');
        return null;
      }

      return version;
    }

    /**
     * Check if data has changed since last save
     * @param {Object} state
     * @returns {boolean} - whether data has changed or not
     */

  }, {
    key: 'hasDataChanged',
    value: function hasDataChanged(state) {
      return this._datasetLastSaved !== state.visState.datasets;
    }
  }]);
  return KeplerGLSchema;
}();

var KeplerGLSchemaManager = new KeplerGLSchema();

exports.default = KeplerGLSchemaManager;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zY2hlbWFzL3NjaGVtYS1tYW5hZ2VyLmpzIl0sIm5hbWVzIjpbIlJFRFVDRVJfU0NIRU1BUyIsInZpc1N0YXRlIiwidmlzU3RhdGVTY2hlbWEiLCJtYXBTdGF0ZSIsIm1hcFN0YXRlU2NoZW1hIiwibWFwU3R5bGUiLCJtYXBTdHlsZVNjaGVtYSIsIktlcGxlckdMU2NoZW1hIiwiX3ZhbGlkVmVyc2lvbnMiLCJWRVJTSU9OUyIsIl92ZXJzaW9uIiwiQ1VSUkVOVF9WRVJTSU9OIiwiX3JlZHVjZXJTY2hlbWFzIiwiX2RhdGFzZXRTY2hlbWEiLCJkYXRhc2V0U2NoZW1hIiwiX2RhdGFzZXRMYXN0U2F2ZWQiLCJfc2F2ZWREYXRhc2V0Iiwic3RhdGUiLCJkYXRhc2V0cyIsImdldERhdGFzZXRUb1NhdmUiLCJjb25maWciLCJnZXRDb25maWdUb1NhdmUiLCJpbmZvIiwiYXBwIiwiY3JlYXRlZF9hdCIsIkRhdGUiLCJ0b1N0cmluZyIsInNhdmVkRGF0YXNldHMiLCJzYXZlZENvbmZpZyIsInBhcnNlU2F2ZWREYXRhIiwicGFyc2VTYXZlZENvbmZpZyIsInVuZGVmaW5lZCIsImRhdGFDaGFuZ2VkU2luY2VMYXN0U2F2ZSIsImhhc0RhdGFDaGFuZ2VkIiwiT2JqZWN0IiwidmFsdWVzIiwibWFwIiwidmVyc2lvbiIsImRhdGEiLCJzYXZlIiwiZHMiLCJrZXlzIiwicmVkdWNlIiwiYWNjdSIsImtleSIsInZhbGlkVmVyc2lvbiIsInZhbGlkYXRlVmVyc2lvbiIsInB1c2giLCJsb2FkIiwiQ29uc29sZSIsImVycm9yIiwiS2VwbGVyR0xTY2hlbWFNYW5hZ2VyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFvQkE7O0FBRUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFFQTs7OztBQTNCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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eXJpZ2h0IChjKSAyMDE4IFViZXIgVGVjaG5vbG9naWVzLCBJbmMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuLy8gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuLy8gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuLy8gdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuLy8gY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4vLyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4vLyBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4vLyBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbi8vIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuLy8gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuLy8gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbi8vIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbi8vIFRIRSBTT0ZUV0FSRS5cblxuaW1wb3J0IHtjb25zb2xlIGFzIENvbnNvbGV9IGZyb20gJ2dsb2JhbC93aW5kb3cnO1xuXG5pbXBvcnQgdmlzU3RhdGVTY2hlbWEgZnJvbSAnLi92aXMtc3RhdGUtc2NoZW1hJztcbmltcG9ydCBkYXRhc2V0U2NoZW1hIGZyb20gJy4vZGF0YXNldC1zY2hlbWEnO1xuaW1wb3J0IG1hcFN0eWxlU2NoZW1hIGZyb20gJy4vbWFwLXN0eWxlLXNjaGVtYSc7XG5pbXBvcnQgbWFwU3RhdGVTY2hlbWEgZnJvbSAnLi9tYXAtc3RhdGUtc2NoZW1hJztcblxuaW1wb3J0IHtDVVJSRU5UX1ZFUlNJT04sIFZFUlNJT05TfSBmcm9tICcuL3ZlcnNpb25zJztcblxuY29uc3QgUkVEVUNFUl9TQ0hFTUFTID0ge1xuICB2aXNTdGF0ZTogdmlzU3RhdGVTY2hlbWEsXG4gIG1hcFN0YXRlOiBtYXBTdGF0ZVNjaGVtYSxcbiAgbWFwU3R5bGU6IG1hcFN0eWxlU2NoZW1hXG59O1xuXG5jbGFzcyBLZXBsZXJHTFNjaGVtYSB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuX3ZhbGlkVmVyc2lvbnMgPSBWRVJTSU9OUztcbiAgICB0aGlzLl92ZXJzaW9uID0gQ1VSUkVOVF9WRVJTSU9OO1xuICAgIHRoaXMuX3JlZHVjZXJTY2hlbWFzID0gUkVEVUNFUl9TQ0hFTUFTO1xuICAgIHRoaXMuX2RhdGFzZXRTY2hlbWEgPSBkYXRhc2V0U2NoZW1hO1xuXG4gICAgdGhpcy5fZGF0YXNldExhc3RTYXZlZCA9IG51bGw7XG4gICAgdGhpcy5fc2F2ZWREYXRhc2V0ID0gbnVsbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBzdGF0ZVRvU2F2ZSA9IHtcbiAgICogICBkYXRhc2V0czogW1xuICAgKiAgICAge1xuICAgKiAgICAgICB2ZXJzaW9uOiAndjAnLFxuICAgKiAgICAgICBkYXRhOiB7aWQsIGxhYmVsLCBjb2xvciwgYWxsRGF0YSwgZmllbGRzfVxuICAgKiAgICAgfSxcbiAgICogICAgIHtcbiAgICogICAgICAgdmVyc2lvbjogJ3YwJyxcbiAgICogICAgICAgZGF0YToge2lkLCBsYWJlbCwgY29sb3IsIGFsbERhdGEsIGZpZWxkc31cbiAgICogICAgIH1cbiAgICogICBdLFxuICAgKiAgIGNvbmZpZzoge1xuICAgKiAgICAgdmVyc2lvbjogJ3YwJyxcbiAgICogICAgIGNvbmZpZzoge31cbiAgICogICB9LFxuICAgKiAgIGluZm86IHtcbiAgICogICAgIGFwcDogJ2tlcGxlci5nbCcsXG4gICAqICAgICBjcmVhdGVfYXQ6ICdNb24gTWF5IDI4IDIwMTggMjE6MDQ6NDYgR01ULTA3MDAgKFBEVCknXG4gICAqICAgfVxuICAgKiB9XG4gICAqXG4gICAqIEdldCBjb25maWcgYW5kIGRhdGEgb2YgY3VycmVudCBtYXAgdG8gc2F2ZVxuICAgKiBAcGFyYW0ge09iamVjdH0gc3RhdGVcbiAgICogQHJldHVybnMge09iamVjdCB8IG51bGx9IGFwcCBzdGF0ZSB0byBzYXZlXG4gICAqL1xuICBzYXZlKHN0YXRlKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGRhdGFzZXRzOiB0aGlzLmdldERhdGFzZXRUb1NhdmUoc3RhdGUpLFxuICAgICAgY29uZmlnOiB0aGlzLmdldENvbmZpZ1RvU2F2ZShzdGF0ZSksXG4gICAgICBpbmZvOiB7XG4gICAgICAgIGFwcDogJ2tlcGxlci5nbCcsXG4gICAgICAgIGNyZWF0ZWRfYXQ6IG5ldyBEYXRlKCkudG9TdHJpbmcoKVxuICAgICAgfVxuICAgIH07XG4gIH1cblxuICBsb2FkKHNhdmVkRGF0YXNldHMsIHNhdmVkQ29uZmlnKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGRhdGFzZXRzOiB0aGlzLnBhcnNlU2F2ZWREYXRhKHNhdmVkRGF0YXNldHMpLFxuICAgICAgY29uZmlnOiBzYXZlZENvbmZpZyA/IHRoaXMucGFyc2VTYXZlZENvbmZpZyhzYXZlZENvbmZpZykgOiB1bmRlZmluZWRcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBkYXRhIHRvIHNhdmVcbiAgICogQHBhcmFtIHtPYmplY3R9IHN0YXRlIC0gYXBwIHN0YXRlXG4gICAqIEByZXR1cm5zIHt7dmVyc2lvbjogU3RyaW5nLCBkYXRhOiBPYmplY3R9fSAtIGRhdGFzZXQgdG8gc2F2ZVxuICAgKi9cbiAgZ2V0RGF0YXNldFRvU2F2ZShzdGF0ZSkge1xuICAgIGNvbnN0IGRhdGFDaGFuZ2VkU2luY2VMYXN0U2F2ZSA9IHRoaXMuaGFzRGF0YUNoYW5nZWQoc3RhdGUpO1xuICAgIGlmICghZGF0YUNoYW5nZWRTaW5jZUxhc3RTYXZlKSB7XG4gICAgICByZXR1cm4gdGhpcy5fc2F2ZWREYXRhc2V0O1xuICAgIH1cblxuICAgIGNvbnN0IHt2aXNTdGF0ZX0gPSBzdGF0ZTtcblxuICAgIGNvbnN0IGRhdGFzZXRzID0gT2JqZWN0LnZhbHVlcyh2aXNTdGF0ZS5kYXRhc2V0cykubWFwKGRzID0+ICh7XG4gICAgICB2ZXJzaW9uOiB0aGlzLl92ZXJzaW9uLFxuICAgICAgZGF0YTogdGhpcy5fZGF0YXNldFNjaGVtYVt0aGlzLl92ZXJzaW9uXS5zYXZlKGRzKVxuICAgIH0pKTtcblxuICAgIC8vIGtlZXAgYSBjb3B5IG9mIGZvcm1hdHRlZCBkYXRhc2V0cyB0byBzYXZlXG4gICAgdGhpcy5fZGF0YXNldExhc3RTYXZlZCA9IHZpc1N0YXRlLmRhdGFzZXRzO1xuICAgIHRoaXMuX3NhdmVkRGF0YXNldCA9IGRhdGFzZXRzO1xuXG4gICAgcmV0dXJuIGRhdGFzZXRzO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBBcHAgY29uZmlnIHRvIHNhdmVcbiAgICogQHBhcmFtIHtPYmplY3R9IHN0YXRlIC0gYXBwIHN0YXRlXG4gICAqIEByZXR1cm5zIHt7dmVyc2lvbjogU3RyaW5nLCBjb25maWc6IE9iamVjdH19IC0gY29uZmlnIHRvIHNhdmVcbiAgICovXG4gIGdldENvbmZpZ1RvU2F2ZShzdGF0ZSkge1xuICAgIGNvbnN0IGNvbmZpZyA9IE9iamVjdC5rZXlzKHRoaXMuX3JlZHVjZXJTY2hlbWFzKS5yZWR1Y2UoXG4gICAgICAoYWNjdSwga2V5KSA9PiAoe1xuICAgICAgICAuLi5hY2N1LFxuICAgICAgICAuLi50aGlzLl9yZWR1Y2VyU2NoZW1hc1trZXldW3RoaXMuX3ZlcnNpb25dLnNhdmUoc3RhdGVba2V5XSlcbiAgICAgIH0pLFxuICAgICAge31cbiAgICApO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIHZlcnNpb246IHRoaXMuX3ZlcnNpb24sXG4gICAgICBjb25maWdcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIFBhcnNlIHNhdmVkIGRhdGFcbiAgICogQHBhcmFtIHtBcnJheX0gZGF0YXNldHNcbiAgICogQHJldHVybnMge09iamVjdCB8IG51bGx9IC0gZGF0YSB0byBzYXZlXG4gICAqL1xuICBwYXJzZVNhdmVkRGF0YShkYXRhc2V0cykge1xuICAgIHJldHVybiBkYXRhc2V0cy5yZWR1Y2UoKGFjY3UsIGRzKSA9PiB7XG4gICAgICBjb25zdCB2YWxpZFZlcnNpb24gPSB0aGlzLnZhbGlkYXRlVmVyc2lvbihkcy52ZXJzaW9uKTtcbiAgICAgIGlmICghdmFsaWRWZXJzaW9uKSB7XG4gICAgICAgIHJldHVybiBhY2N1O1xuICAgICAgfVxuICAgICAgYWNjdS5wdXNoKHRoaXMuX2RhdGFzZXRTY2hlbWFbdmFsaWRWZXJzaW9uXS5sb2FkKGRzLmRhdGEpKTtcbiAgICAgIHJldHVybiBhY2N1O1xuICAgIH0sIFtdKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBQYXJzZSBzYXZlZCBBcHAgY29uZmlnXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBvcHQudmVyc2lvbiAtIGNvbmZpZyB2ZXJzaW9uXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHQuY29uZmlnIC0gc2F2ZWQgY29uZmlnXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBzdGF0ZSAtIGN1cnJlbnQgQXBwIFN0YXRlXG4gICAqIEByZXR1cm5zIHtPYmplY3QgfCBudWxsfSAtIHBhcnNlZCBjb25maWdcbiAgICovXG4gIHBhcnNlU2F2ZWRDb25maWcoe3ZlcnNpb24sIGNvbmZpZ30sIHN0YXRlID0ge30pIHtcbiAgICBjb25zdCB2YWxpZFZlcnNpb24gPSB0aGlzLnZhbGlkYXRlVmVyc2lvbih2ZXJzaW9uKTtcbiAgICBpZiAoIXZhbGlkVmVyc2lvbikge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKGNvbmZpZykucmVkdWNlKFxuICAgICAgKGFjY3UsIGtleSkgPT4gKHtcbiAgICAgICAgICAuLi5hY2N1LFxuICAgICAgICAgIC4uLihrZXkgaW4gdGhpcy5fcmVkdWNlclNjaGVtYXNcbiAgICAgICAgICAgID8gdGhpcy5fcmVkdWNlclNjaGVtYXNba2V5XVt2YWxpZFZlcnNpb25dLmxvYWQoXG4gICAgICAgICAgICAgICAgY29uZmlnW2tleV0sXG4gICAgICAgICAgICAgICAgc3RhdGVba2V5XVxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICA6IHt9KVxuICAgICAgICB9KSxcbiAgICAgIHt9XG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBWYWxpZGF0ZSB2ZXJzaW9uXG4gICAqIEBwYXJhbSB7U3RyaW5nfSB2ZXJzaW9uXG4gICAqIEByZXR1cm5zIHtTdHJpbmcgfCBudWxsfSB2YWxpZFZlcnNpb25cbiAgICovXG4gIHZhbGlkYXRlVmVyc2lvbih2ZXJzaW9uKSB7XG4gICAgaWYgKCF2ZXJzaW9uKSB7XG4gICAgICBDb25zb2xlLmVycm9yKFxuICAgICAgICAnVGhlcmUgaXMgbm8gdmVyc2lvbiBudW1iZXIgYXNzb2NpYXRlZCB3aXRoIHRoaXMgc2F2ZWQgbWFwJ1xuICAgICAgKTtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGlmICghdGhpcy5fdmFsaWRWZXJzaW9uc1t2ZXJzaW9uXSkge1xuICAgICAgQ29uc29sZS5lcnJvcihgJHt2ZXJzaW9ufSBpcyBub3QgYSB2YWxpZCB2ZXJzaW9uYCk7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICByZXR1cm4gdmVyc2lvbjtcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVjayBpZiBkYXRhIGhhcyBjaGFuZ2VkIHNpbmNlIGxhc3Qgc2F2ZVxuICAgKiBAcGFyYW0ge09iamVjdH0gc3RhdGVcbiAgICogQHJldHVybnMge2Jvb2xlYW59IC0gd2hldGhlciBkYXRhIGhhcyBjaGFuZ2VkIG9yIG5vdFxuICAgKi9cbiAgaGFzRGF0YUNoYW5nZWQoc3RhdGUpIHtcbiAgICByZXR1cm4gdGhpcy5fZGF0YXNldExhc3RTYXZlZCAhPT0gc3RhdGUudmlzU3RhdGUuZGF0YXNldHM7XG4gIH1cbn1cblxuY29uc3QgS2VwbGVyR0xTY2hlbWFNYW5hZ2VyID0gbmV3IEtlcGxlckdMU2NoZW1hKCk7XG5cbmV4cG9ydCBkZWZhdWx0IEtlcGxlckdMU2NoZW1hTWFuYWdlcjtcbiJdfQ==