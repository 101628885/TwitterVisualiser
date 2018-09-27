"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDebugTableForVertexArray = getDebugTableForVertexArray;

var _buffer = _interopRequireDefault(require("../webgl/buffer"));

var _constantsToKeys = require("../webgl-utils/constants-to-keys");

var _attributeUtils = require("../webgl-utils/attribute-utils");

var _utils = require("../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function getDebugTableForVertexArray() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      vertexArray = _ref.vertexArray,
      _ref$header = _ref.header,
      header = _ref$header === void 0 ? 'Attributes' : _ref$header;

  if (!vertexArray.configuration) {
    return {};
  }

  var table = {};

  if (vertexArray.elements) {
    table.ELEMENT_ARRAY_BUFFER = getDebugTableRow(vertexArray, vertexArray.elements, null, header);
  }

  var attributes = vertexArray.values;

  for (var attributeLocation in attributes) {
    var info = vertexArray._getAttributeInfo(attributeLocation);

    if (info) {
      var rowHeader = "".concat(attributeLocation, ": ").concat(info.name);
      var accessor = vertexArray.accessors[info.location];

      if (accessor) {
        rowHeader = "".concat(attributeLocation, ": ").concat(getGLSLDeclaration(info.name, accessor));
      }

      table[rowHeader] = getDebugTableRow(vertexArray, attributes[attributeLocation], accessor, header);
    }
  }

  return table;
}

function getDebugTableRow(vertexArray, attribute, accessor, header) {
  var _ref3;

  var gl = vertexArray.gl;
  var type = 'NOT PROVIDED';
  var size = 'N/A';
  var verts = 'N/A';
  var bytes = 'N/A';
  var isInteger;
  var marker;
  var value;

  if (accessor) {
    type = accessor.type;
    size = accessor.size;
    type = String(type).replace('Array', '');
    isInteger = type.indexOf('nt') !== -1;
  }

  if (attribute instanceof _buffer.default) {
    var _ref2;

    var buffer = attribute;

    var _buffer$getDebugData = buffer.getDebugData(),
        data = _buffer$getDebugData.data,
        modified = _buffer$getDebugData.modified;

    marker = modified ? '*' : '';
    value = data;
    bytes = buffer.byteLength;
    verts = bytes / data.BYTES_PER_ELEMENT / size;
    var format;

    if (accessor) {
      var instanced = accessor.divisor > 0;
      format = "".concat(instanced ? 'I ' : 'P ', " ").concat(verts, " (x").concat(size, "=").concat(bytes, " bytes ").concat((0, _constantsToKeys.glKey)(gl, type), ")");
    } else {
      isInteger = true;
      format = "".concat(bytes, " bytes");
    }

    return _ref2 = {}, _defineProperty(_ref2, header, "".concat(marker).concat((0, _utils.formatValue)(value, {
      size: size,
      isInteger: isInteger
    }))), _defineProperty(_ref2, 'Format ', format), _ref2;
  }

  value = attribute;
  size = attribute.length;
  type = String(attribute.constructor.name).replace('Array', '');
  isInteger = type.indexOf('nt') !== -1;
  return _ref3 = {}, _defineProperty(_ref3, header, "".concat((0, _utils.formatValue)(value, {
    size: size,
    isInteger: isInteger
  }), " (constant)")), _defineProperty(_ref3, 'Format ', "".concat(size, "x").concat(type, " (constant)")), _ref3;
}

function getGLSLDeclaration(name, accessor) {
  var type = accessor.type,
      size = accessor.size;
  var typeAndName = (0, _attributeUtils.getCompositeGLType)(type, size);

  if (typeAndName) {
    return "".concat(name, " (").concat(typeAndName.name, ")");
  }

  return name;
}
//# sourceMappingURL=debug-vertex-array.js.map