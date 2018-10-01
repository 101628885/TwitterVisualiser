'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _window = require('global/window');

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

var Schema = function () {
  function Schema() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        version = _ref.version,
        key = _ref.key,
        properties = _ref.properties;

    (0, _classCallCheck3.default)(this, Schema);

    this.version = version;
    this.properties = properties;
    this.key = key;
  }

  (0, _createClass3.default)(Schema, [{
    key: 'loadPropertiesOrApplySchema',
    value: function loadPropertiesOrApplySchema(node, parent, accumulator) {
      return this._getPropertyValueFromSchema('load', node, parent, accumulator);
    }
  }, {
    key: 'savePropertiesOrApplySchema',
    value: function savePropertiesOrApplySchema(node, parent, accumulator) {
      return this._getPropertyValueFromSchema('save', node, parent, accumulator);
    }
  }, {
    key: '_getPropertyValueFromSchema',
    value: function _getPropertyValueFromSchema(operation, node, parent, accumulator) {
      var _this = this;

      var internal = '_' + operation;
      return (0, _defineProperty3.default)({}, this.key, this.properties ? Object.keys(this.properties).reduce(function (accu, key) {
        return (0, _extends3.default)({}, accu, key in node ? _this.properties[key] ? // if it's another schema
        _this.properties[key][operation] ? // call save or load
        _this.properties[key][internal](node[key], node, accu) : {} : (0, _defineProperty3.default)({}, key, node[key]) : {});
      }, {}) : node);
    }
  }, {
    key: '_isCurrentVersion',
    value: function _isCurrentVersion() {
      return this.version === _versions.CURRENT_VERSION;
    }
  }, {
    key: 'outdatedVersionError',
    value: function outdatedVersionError() {
      if (!this._isCurrentVersion()) {
        _window.console.error(this.key + ' ' + this.version + ' is outdated. save should not be called anymore');
      }
    }
  }, {
    key: '_save',
    value: function _save() {
      // make sure nothing is saved to an outdated version
      this.outdatedVersionError();
      return this.save.apply(this, arguments);
    }
  }, {
    key: 'save',
    value: function save(node, parent) {
      var accumulator = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      return this.savePropertiesOrApplySchema(node, parent, accumulator);
    }
  }, {
    key: '_load',
    value: function _load() {
      return this.load.apply(this, arguments);
    }
  }, {
    key: 'load',
    value: function load(node, parent) {
      var accumulator = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      return this.loadPropertiesOrApplySchema(node, parent, accumulator);
    }
  }]);
  return Schema;
}();

exports.default = Schema;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zY2hlbWFzL3NjaGVtYS5qcyJdLCJuYW1lcyI6WyJTY2hlbWEiLCJ2ZXJzaW9uIiwia2V5IiwicHJvcGVydGllcyIsIm5vZGUiLCJwYXJlbnQiLCJhY2N1bXVsYXRvciIsIl9nZXRQcm9wZXJ0eVZhbHVlRnJvbVNjaGVtYSIsIm9wZXJhdGlvbiIsImludGVybmFsIiwiT2JqZWN0Iiwia2V5cyIsInJlZHVjZSIsImFjY3UiLCJDVVJSRU5UX1ZFUlNJT04iLCJfaXNDdXJyZW50VmVyc2lvbiIsIkNvbnNvbGUiLCJlcnJvciIsIm91dGRhdGVkVmVyc2lvbkVycm9yIiwic2F2ZSIsInNhdmVQcm9wZXJ0aWVzT3JBcHBseVNjaGVtYSIsImxvYWQiLCJsb2FkUHJvcGVydGllc09yQXBwbHlTY2hlbWEiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBb0JBOztBQUVBOzs7O0FBdEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztJQU1xQkEsTTtBQUNuQixvQkFBNkM7QUFBQSxtRkFBSixFQUFJO0FBQUEsUUFBaENDLE9BQWdDLFFBQWhDQSxPQUFnQztBQUFBLFFBQXZCQyxHQUF1QixRQUF2QkEsR0FBdUI7QUFBQSxRQUFsQkMsVUFBa0IsUUFBbEJBLFVBQWtCOztBQUFBOztBQUMzQyxTQUFLRixPQUFMLEdBQWVBLE9BQWY7QUFDQSxTQUFLRSxVQUFMLEdBQWtCQSxVQUFsQjtBQUNBLFNBQUtELEdBQUwsR0FBV0EsR0FBWDtBQUNEOzs7O2dEQUUyQkUsSSxFQUFNQyxNLEVBQVFDLFcsRUFBYTtBQUNyRCxhQUFPLEtBQUtDLDJCQUFMLENBQWlDLE1BQWpDLEVBQXlDSCxJQUF6QyxFQUErQ0MsTUFBL0MsRUFBdURDLFdBQXZELENBQVA7QUFDRDs7O2dEQUUyQkYsSSxFQUFNQyxNLEVBQVFDLFcsRUFBYTtBQUNyRCxhQUFPLEtBQUtDLDJCQUFMLENBQWlDLE1BQWpDLEVBQXlDSCxJQUF6QyxFQUErQ0MsTUFBL0MsRUFBdURDLFdBQXZELENBQVA7QUFDRDs7O2dEQUUyQkUsUyxFQUFXSixJLEVBQU1DLE0sRUFBUUMsVyxFQUFhO0FBQUE7O0FBQ2hFLFVBQU1HLGlCQUFlRCxTQUFyQjtBQUNBLCtDQUNHLEtBQUtOLEdBRFIsRUFDYyxLQUFLQyxVQUFMLEdBQ1JPLE9BQU9DLElBQVAsQ0FBWSxLQUFLUixVQUFqQixFQUE2QlMsTUFBN0IsQ0FBb0MsVUFBQ0MsSUFBRCxFQUFPWCxHQUFQLEVBQWU7QUFDakQsMENBQ0tXLElBREwsRUFFTVgsT0FBT0UsSUFBUCxHQUNBLE1BQUtELFVBQUwsQ0FBZ0JELEdBQWhCLElBQ0U7QUFDQSxjQUFLQyxVQUFMLENBQWdCRCxHQUFoQixFQUFxQk0sU0FBckIsSUFDRTtBQUNBLGNBQUtMLFVBQUwsQ0FBZ0JELEdBQWhCLEVBQXFCTyxRQUFyQixFQUErQkwsS0FBS0YsR0FBTCxDQUEvQixFQUEwQ0UsSUFBMUMsRUFBZ0RTLElBQWhELENBRkYsR0FHRSxFQUxKLHFDQU1JWCxHQU5KLEVBTVVFLEtBQUtGLEdBQUwsQ0FOVixDQURBLEdBUUEsRUFWTjtBQVlELE9BYkQsRUFhRyxFQWJILENBRFEsR0FlUkUsSUFoQk47QUFrQkQ7Ozt3Q0FFbUI7QUFDbEIsYUFBTyxLQUFLSCxPQUFMLEtBQWlCYSx5QkFBeEI7QUFDRDs7OzJDQUVzQjtBQUNyQixVQUFJLENBQUMsS0FBS0MsaUJBQUwsRUFBTCxFQUErQjtBQUM3QkMsd0JBQVFDLEtBQVIsQ0FDSyxLQUFLZixHQURWLFNBRUksS0FBS0QsT0FGVDtBQUtEO0FBQ0Y7Ozs0QkFFYztBQUNiO0FBQ0EsV0FBS2lCLG9CQUFMO0FBQ0EsYUFBTyxLQUFLQyxJQUFMLHVCQUFQO0FBQ0Q7Ozt5QkFFSWYsSSxFQUFNQyxNLEVBQTBCO0FBQUEsVUFBbEJDLFdBQWtCLHVFQUFKLEVBQUk7O0FBQ25DLGFBQU8sS0FBS2MsMkJBQUwsQ0FBaUNoQixJQUFqQyxFQUF1Q0MsTUFBdkMsRUFBK0NDLFdBQS9DLENBQVA7QUFDRDs7OzRCQUVjO0FBQ2IsYUFBTyxLQUFLZSxJQUFMLHVCQUFQO0FBQ0Q7Ozt5QkFFSWpCLEksRUFBTUMsTSxFQUEwQjtBQUFBLFVBQWxCQyxXQUFrQix1RUFBSixFQUFJOztBQUNuQyxhQUFPLEtBQUtnQiwyQkFBTCxDQUFpQ2xCLElBQWpDLEVBQXVDQyxNQUF2QyxFQUErQ0MsV0FBL0MsQ0FBUDtBQUNEOzs7OztrQkFuRWtCTixNIiwiZmlsZSI6InNjaGVtYS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgMjAxOCBVYmVyIFRlY2hub2xvZ2llcywgSW5jLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbi8vIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbi8vIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbi8vIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbi8vIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuLy8gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuLy8gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4vLyBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbi8vIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbi8vIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4vLyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4vLyBUSEUgU09GVFdBUkUuXG5cbmltcG9ydCB7Y29uc29sZSBhcyBDb25zb2xlfSBmcm9tICdnbG9iYWwvd2luZG93JztcblxuaW1wb3J0IHtDVVJSRU5UX1ZFUlNJT059IGZyb20gJy4vdmVyc2lvbnMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTY2hlbWEge1xuICBjb25zdHJ1Y3Rvcih7dmVyc2lvbiwga2V5LCBwcm9wZXJ0aWVzfSA9IHt9KSB7XG4gICAgdGhpcy52ZXJzaW9uID0gdmVyc2lvbjtcbiAgICB0aGlzLnByb3BlcnRpZXMgPSBwcm9wZXJ0aWVzO1xuICAgIHRoaXMua2V5ID0ga2V5O1xuICB9XG5cbiAgbG9hZFByb3BlcnRpZXNPckFwcGx5U2NoZW1hKG5vZGUsIHBhcmVudCwgYWNjdW11bGF0b3IpIHtcbiAgICByZXR1cm4gdGhpcy5fZ2V0UHJvcGVydHlWYWx1ZUZyb21TY2hlbWEoJ2xvYWQnLCBub2RlLCBwYXJlbnQsIGFjY3VtdWxhdG9yKTtcbiAgfVxuXG4gIHNhdmVQcm9wZXJ0aWVzT3JBcHBseVNjaGVtYShub2RlLCBwYXJlbnQsIGFjY3VtdWxhdG9yKSB7XG4gICAgcmV0dXJuIHRoaXMuX2dldFByb3BlcnR5VmFsdWVGcm9tU2NoZW1hKCdzYXZlJywgbm9kZSwgcGFyZW50LCBhY2N1bXVsYXRvcik7XG4gIH1cblxuICBfZ2V0UHJvcGVydHlWYWx1ZUZyb21TY2hlbWEob3BlcmF0aW9uLCBub2RlLCBwYXJlbnQsIGFjY3VtdWxhdG9yKSB7XG4gICAgY29uc3QgaW50ZXJuYWwgPSBgXyR7b3BlcmF0aW9ufWA7XG4gICAgcmV0dXJuIHtcbiAgICAgIFt0aGlzLmtleV06IHRoaXMucHJvcGVydGllc1xuICAgICAgICA/IE9iamVjdC5rZXlzKHRoaXMucHJvcGVydGllcykucmVkdWNlKChhY2N1LCBrZXkpID0+IHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgIC4uLmFjY3UsXG4gICAgICAgICAgICAgIC4uLihrZXkgaW4gbm9kZVxuICAgICAgICAgICAgICAgID8gdGhpcy5wcm9wZXJ0aWVzW2tleV1cbiAgICAgICAgICAgICAgICAgID8gLy8gaWYgaXQncyBhbm90aGVyIHNjaGVtYVxuICAgICAgICAgICAgICAgICAgICB0aGlzLnByb3BlcnRpZXNba2V5XVtvcGVyYXRpb25dXG4gICAgICAgICAgICAgICAgICAgID8gLy8gY2FsbCBzYXZlIG9yIGxvYWRcbiAgICAgICAgICAgICAgICAgICAgICB0aGlzLnByb3BlcnRpZXNba2V5XVtpbnRlcm5hbF0obm9kZVtrZXldLCBub2RlLCBhY2N1KVxuICAgICAgICAgICAgICAgICAgICA6IHt9XG4gICAgICAgICAgICAgICAgICA6IHtba2V5XTogbm9kZVtrZXldfVxuICAgICAgICAgICAgICAgIDoge30pXG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH0sIHt9KVxuICAgICAgICA6IG5vZGVcbiAgICB9O1xuICB9XG5cbiAgX2lzQ3VycmVudFZlcnNpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMudmVyc2lvbiA9PT0gQ1VSUkVOVF9WRVJTSU9OO1xuICB9XG5cbiAgb3V0ZGF0ZWRWZXJzaW9uRXJyb3IoKSB7XG4gICAgaWYgKCF0aGlzLl9pc0N1cnJlbnRWZXJzaW9uKCkpIHtcbiAgICAgIENvbnNvbGUuZXJyb3IoXG4gICAgICAgIGAke3RoaXMua2V5fSAke1xuICAgICAgICAgIHRoaXMudmVyc2lvblxuICAgICAgICB9IGlzIG91dGRhdGVkLiBzYXZlIHNob3VsZCBub3QgYmUgY2FsbGVkIGFueW1vcmVgXG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIF9zYXZlKC4uLmFyZ3MpIHtcbiAgICAvLyBtYWtlIHN1cmUgbm90aGluZyBpcyBzYXZlZCB0byBhbiBvdXRkYXRlZCB2ZXJzaW9uXG4gICAgdGhpcy5vdXRkYXRlZFZlcnNpb25FcnJvcigpO1xuICAgIHJldHVybiB0aGlzLnNhdmUoLi4uYXJncyk7XG4gIH1cblxuICBzYXZlKG5vZGUsIHBhcmVudCwgYWNjdW11bGF0b3IgPSB7fSkge1xuICAgIHJldHVybiB0aGlzLnNhdmVQcm9wZXJ0aWVzT3JBcHBseVNjaGVtYShub2RlLCBwYXJlbnQsIGFjY3VtdWxhdG9yKTtcbiAgfVxuXG4gIF9sb2FkKC4uLmFyZ3MpIHtcbiAgICByZXR1cm4gdGhpcy5sb2FkKC4uLmFyZ3MpO1xuICB9XG5cbiAgbG9hZChub2RlLCBwYXJlbnQsIGFjY3VtdWxhdG9yID0ge30pIHtcbiAgICByZXR1cm4gdGhpcy5sb2FkUHJvcGVydGllc09yQXBwbHlTY2hlbWEobm9kZSwgcGFyZW50LCBhY2N1bXVsYXRvcik7XG4gIH1cbn1cbiJdfQ==