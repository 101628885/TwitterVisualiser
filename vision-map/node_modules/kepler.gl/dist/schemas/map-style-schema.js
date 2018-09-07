'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.propertiesV0 = exports.customMapStylePropsV1 = undefined;

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _mapStyleSchema; // Copyright (c) 2018 Uber Technologies, Inc.
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

var _versions = require('./versions');

var _schema = require('./schema');

var _schema2 = _interopRequireDefault(_schema);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var customMapStylePropsV1 = exports.customMapStylePropsV1 = {
  accessToken: null,
  custom: null,
  icon: null,
  id: null,
  label: null,
  url: null
};

var CustomMapStyleSchema = new _schema2.default({
  version: _versions.VERSIONS.v1,
  key: 'customStyle',
  properties: customMapStylePropsV1
});

var MapStyleSchemaV1 = function (_Schema) {
  (0, _inherits3.default)(MapStyleSchemaV1, _Schema);

  function MapStyleSchemaV1() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, MapStyleSchemaV1);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = MapStyleSchemaV1.__proto__ || Object.getPrototypeOf(MapStyleSchemaV1)).call.apply(_ref, [this].concat(args))), _this), _this.version = _versions.VERSIONS.v1, _this.key = 'mapStyles', _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(MapStyleSchemaV1, [{
    key: 'save',
    value: function save(mapStyles, mapStyle) {

      // save all custom styles
      var saveCustomStyle = Object.keys(mapStyles).reduce(function (accu, key) {
        return (0, _extends3.default)({}, mapStyles[key].custom ? (0, _defineProperty3.default)({}, key, CustomMapStyleSchema.save(mapStyles[key]).customStyle) : {});
      }, {});

      return (0, _defineProperty3.default)({}, this.key, saveCustomStyle);
    }
  }, {
    key: 'load',
    value: function load(mapStyles) {
      // If mapStyle is an empty object, do not load it
      return (typeof mapStyles === 'undefined' ? 'undefined' : (0, _typeof3.default)(mapStyles)) === 'object' && Object.keys(mapStyles).length ? (0, _defineProperty3.default)({}, this.key, mapStyles) : {};
    }
  }]);
  return MapStyleSchemaV1;
}(_schema2.default);

// version v0


var propertiesV0 = exports.propertiesV0 = {
  styleType: null,
  topLayerGroups: null,
  visibleLayerGroups: null,
  buildingLayer: null,
  mapStyles: new MapStyleSchemaV1()
};

var mapStyleSchema = (_mapStyleSchema = {}, (0, _defineProperty3.default)(_mapStyleSchema, _versions.VERSIONS.v0, new _schema2.default({
  version: _versions.VERSIONS.v0,
  properties: propertiesV0,
  key: 'mapStyle'
})), (0, _defineProperty3.default)(_mapStyleSchema, _versions.VERSIONS.v1, new _schema2.default({
  version: _versions.VERSIONS.v1,
  properties: propertiesV0,
  key: 'mapStyle'
})), _mapStyleSchema);

exports.default = mapStyleSchema;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zY2hlbWFzL21hcC1zdHlsZS1zY2hlbWEuanMiXSwibmFtZXMiOlsiY3VzdG9tTWFwU3R5bGVQcm9wc1YxIiwiYWNjZXNzVG9rZW4iLCJjdXN0b20iLCJpY29uIiwiaWQiLCJsYWJlbCIsInVybCIsIkN1c3RvbU1hcFN0eWxlU2NoZW1hIiwiU2NoZW1hIiwidmVyc2lvbiIsIlZFUlNJT05TIiwidjEiLCJrZXkiLCJwcm9wZXJ0aWVzIiwiTWFwU3R5bGVTY2hlbWFWMSIsIm1hcFN0eWxlcyIsIm1hcFN0eWxlIiwic2F2ZUN1c3RvbVN0eWxlIiwiT2JqZWN0Iiwia2V5cyIsInJlZHVjZSIsImFjY3UiLCJzYXZlIiwiY3VzdG9tU3R5bGUiLCJsZW5ndGgiLCJwcm9wZXJ0aWVzVjAiLCJzdHlsZVR5cGUiLCJ0b3BMYXllckdyb3VwcyIsInZpc2libGVMYXllckdyb3VwcyIsImJ1aWxkaW5nTGF5ZXIiLCJtYXBTdHlsZVNjaGVtYSIsInYwIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztxQkFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFDQTs7Ozs7O0FBRU8sSUFBTUEsd0RBQXdCO0FBQ25DQyxlQUFhLElBRHNCO0FBRW5DQyxVQUFRLElBRjJCO0FBR25DQyxRQUFNLElBSDZCO0FBSW5DQyxNQUFJLElBSitCO0FBS25DQyxTQUFPLElBTDRCO0FBTW5DQyxPQUFLO0FBTjhCLENBQTlCOztBQVNQLElBQU1DLHVCQUF1QixJQUFJQyxnQkFBSixDQUFXO0FBQ3RDQyxXQUFTQyxtQkFBU0MsRUFEb0I7QUFFdENDLE9BQUssYUFGaUM7QUFHdENDLGNBQVliO0FBSDBCLENBQVgsQ0FBN0I7O0lBTU1jLGdCOzs7Ozs7Ozs7Ozs7Ozt3TkFDSkwsTyxHQUFVQyxtQkFBU0MsRSxRQUNuQkMsRyxHQUFNLFc7Ozs7O3lCQUNERyxTLEVBQVdDLFEsRUFBVTs7QUFFeEI7QUFDQSxVQUFNQyxrQkFBa0JDLE9BQU9DLElBQVAsQ0FBWUosU0FBWixFQUF1QkssTUFBdkIsQ0FBOEIsVUFBQ0MsSUFBRCxFQUFPVCxHQUFQO0FBQUEsMENBQ2hERyxVQUFVSCxHQUFWLEVBQWVWLE1BQWYscUNBQ0VVLEdBREYsRUFDUUwscUJBQXFCZSxJQUFyQixDQUEwQlAsVUFBVUgsR0FBVixDQUExQixFQUEwQ1csV0FEbEQsSUFDaUUsRUFGakI7QUFBQSxPQUE5QixFQUlwQixFQUpvQixDQUF4Qjs7QUFNQSwrQ0FBUyxLQUFLWCxHQUFkLEVBQW9CSyxlQUFwQjtBQUNEOzs7eUJBRUlGLFMsRUFBVztBQUNkO0FBQ0EsYUFBTyxRQUFPQSxTQUFQLHVEQUFPQSxTQUFQLE9BQXFCLFFBQXJCLElBQWlDRyxPQUFPQyxJQUFQLENBQVlKLFNBQVosRUFBdUJTLE1BQXhELHFDQUFtRSxLQUFLWixHQUF4RSxFQUE4RUcsU0FBOUUsSUFBMkYsRUFBbEc7QUFDRDs7O0VBbEI0QlAsZ0I7O0FBcUIvQjs7O0FBQ08sSUFBTWlCLHNDQUFlO0FBQzFCQyxhQUFXLElBRGU7QUFFMUJDLGtCQUFnQixJQUZVO0FBRzFCQyxzQkFBb0IsSUFITTtBQUkxQkMsaUJBQWUsSUFKVztBQUsxQmQsYUFBVyxJQUFJRCxnQkFBSjtBQUxlLENBQXJCOztBQVFQLElBQU1nQix1RkFDSHBCLG1CQUFTcUIsRUFETixFQUNXLElBQUl2QixnQkFBSixDQUFXO0FBQ3hCQyxXQUFTQyxtQkFBU3FCLEVBRE07QUFFeEJsQixjQUFZWSxZQUZZO0FBR3hCYixPQUFLO0FBSG1CLENBQVgsQ0FEWCxrREFNSEYsbUJBQVNDLEVBTk4sRUFNVyxJQUFJSCxnQkFBSixDQUFXO0FBQ3hCQyxXQUFTQyxtQkFBU0MsRUFETTtBQUV4QkUsY0FBWVksWUFGWTtBQUd4QmIsT0FBSztBQUhtQixDQUFYLENBTlgsbUJBQU47O2tCQWFla0IsYyIsImZpbGUiOiJtYXAtc3R5bGUtc2NoZW1hLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSAyMDE4IFViZXIgVGVjaG5vbG9naWVzLCBJbmMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuLy8gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuLy8gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuLy8gdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuLy8gY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4vLyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4vLyBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4vLyBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbi8vIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuLy8gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuLy8gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbi8vIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbi8vIFRIRSBTT0ZUV0FSRS5cblxuaW1wb3J0IHtWRVJTSU9OU30gZnJvbSAnLi92ZXJzaW9ucyc7XG5pbXBvcnQgU2NoZW1hIGZyb20gJy4vc2NoZW1hJztcblxuZXhwb3J0IGNvbnN0IGN1c3RvbU1hcFN0eWxlUHJvcHNWMSA9IHtcbiAgYWNjZXNzVG9rZW46IG51bGwsXG4gIGN1c3RvbTogbnVsbCxcbiAgaWNvbjogbnVsbCxcbiAgaWQ6IG51bGwsXG4gIGxhYmVsOiBudWxsLFxuICB1cmw6IG51bGxcbn07XG5cbmNvbnN0IEN1c3RvbU1hcFN0eWxlU2NoZW1hID0gbmV3IFNjaGVtYSh7XG4gIHZlcnNpb246IFZFUlNJT05TLnYxLFxuICBrZXk6ICdjdXN0b21TdHlsZScsXG4gIHByb3BlcnRpZXM6IGN1c3RvbU1hcFN0eWxlUHJvcHNWMVxufSk7XG5cbmNsYXNzIE1hcFN0eWxlU2NoZW1hVjEgZXh0ZW5kcyBTY2hlbWEge1xuICB2ZXJzaW9uID0gVkVSU0lPTlMudjE7XG4gIGtleSA9ICdtYXBTdHlsZXMnO1xuICBzYXZlKG1hcFN0eWxlcywgbWFwU3R5bGUpIHtcblxuICAgIC8vIHNhdmUgYWxsIGN1c3RvbSBzdHlsZXNcbiAgICBjb25zdCBzYXZlQ3VzdG9tU3R5bGUgPSBPYmplY3Qua2V5cyhtYXBTdHlsZXMpLnJlZHVjZSgoYWNjdSwga2V5KSA9PiAoe1xuICAgICAgLi4uKG1hcFN0eWxlc1trZXldLmN1c3RvbSA/XG4gICAgICAgICAge1trZXldOiBDdXN0b21NYXBTdHlsZVNjaGVtYS5zYXZlKG1hcFN0eWxlc1trZXldKS5jdXN0b21TdHlsZX0gOiB7fVxuICAgICAgKVxuICAgIH0pLCB7fSk7XG5cbiAgICByZXR1cm4ge1t0aGlzLmtleV06IHNhdmVDdXN0b21TdHlsZX07XG4gIH1cblxuICBsb2FkKG1hcFN0eWxlcykge1xuICAgIC8vIElmIG1hcFN0eWxlIGlzIGFuIGVtcHR5IG9iamVjdCwgZG8gbm90IGxvYWQgaXRcbiAgICByZXR1cm4gdHlwZW9mIG1hcFN0eWxlcyA9PT0gJ29iamVjdCcgJiYgT2JqZWN0LmtleXMobWFwU3R5bGVzKS5sZW5ndGggPyB7W3RoaXMua2V5XTogbWFwU3R5bGVzfSA6IHt9O1xuICB9XG59XG5cbi8vIHZlcnNpb24gdjBcbmV4cG9ydCBjb25zdCBwcm9wZXJ0aWVzVjAgPSB7XG4gIHN0eWxlVHlwZTogbnVsbCxcbiAgdG9wTGF5ZXJHcm91cHM6IG51bGwsXG4gIHZpc2libGVMYXllckdyb3VwczogbnVsbCxcbiAgYnVpbGRpbmdMYXllcjogbnVsbCxcbiAgbWFwU3R5bGVzOiBuZXcgTWFwU3R5bGVTY2hlbWFWMSgpXG59O1xuXG5jb25zdCBtYXBTdHlsZVNjaGVtYSA9IHtcbiAgW1ZFUlNJT05TLnYwXTogbmV3IFNjaGVtYSh7XG4gICAgdmVyc2lvbjogVkVSU0lPTlMudjAsXG4gICAgcHJvcGVydGllczogcHJvcGVydGllc1YwLFxuICAgIGtleTogJ21hcFN0eWxlJ1xuICB9KSxcbiAgW1ZFUlNJT05TLnYxXTogbmV3IFNjaGVtYSh7XG4gICAgdmVyc2lvbjogVkVSU0lPTlMudjEsXG4gICAgcHJvcGVydGllczogcHJvcGVydGllc1YwLFxuICAgIGtleTogJ21hcFN0eWxlJ1xuICB9KVxufTtcblxuZXhwb3J0IGRlZmF1bHQgbWFwU3R5bGVTY2hlbWE7XG4iXX0=