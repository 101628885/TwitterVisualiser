"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPrimitiveDrawMode = getPrimitiveDrawMode;
exports.getPrimitiveCount = getPrimitiveCount;
exports.getVertexCount = getVertexCount;
exports.decomposeCompositeGLType = decomposeCompositeGLType;
exports.getCompositeGLType = getCompositeGLType;

var _assert = _interopRequireDefault(require("../utils/assert"));

var _COMPOSITE_GL_TYPES;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var GL_BYTE = 0x1400;
var GL_UNSIGNED_BYTE = 0x1401;
var GL_SHORT = 0x1402;
var GL_UNSIGNED_SHORT = 0x1403;
var GL_POINTS = 0x0;
var GL_LINES = 0x1;
var GL_LINE_LOOP = 0x2;
var GL_LINE_STRIP = 0x3;
var GL_TRIANGLES = 0x4;
var GL_TRIANGLE_STRIP = 0x5;
var GL_TRIANGLE_FAN = 0x6;
var GL_FLOAT = 0x1406;
var GL_FLOAT_VEC2 = 0x8B50;
var GL_FLOAT_VEC3 = 0x8B51;
var GL_FLOAT_VEC4 = 0x8B52;
var GL_INT = 0x1404;
var GL_INT_VEC2 = 0x8B53;
var GL_INT_VEC3 = 0x8B54;
var GL_INT_VEC4 = 0x8B55;
var GL_UNSIGNED_INT = 0x1405;
var GL_UNSIGNED_INT_VEC2 = 0x8DC6;
var GL_UNSIGNED_INT_VEC3 = 0x8DC7;
var GL_UNSIGNED_INT_VEC4 = 0x8DC8;
var GL_BOOL = 0x8B56;
var GL_BOOL_VEC2 = 0x8B57;
var GL_BOOL_VEC3 = 0x8B58;
var GL_BOOL_VEC4 = 0x8B59;
var GL_FLOAT_MAT2 = 0x8B5A;
var GL_FLOAT_MAT3 = 0x8B5B;
var GL_FLOAT_MAT4 = 0x8B5C;
var GL_FLOAT_MAT2x3 = 0x8B65;
var GL_FLOAT_MAT2x4 = 0x8B66;
var GL_FLOAT_MAT3x2 = 0x8B67;
var GL_FLOAT_MAT3x4 = 0x8B68;
var GL_FLOAT_MAT4x2 = 0x8B69;
var GL_FLOAT_MAT4x3 = 0x8B6A;
var COMPOSITE_GL_TYPES = (_COMPOSITE_GL_TYPES = {}, _defineProperty(_COMPOSITE_GL_TYPES, GL_FLOAT, [GL_FLOAT, 1, 'float']), _defineProperty(_COMPOSITE_GL_TYPES, GL_FLOAT_VEC2, [GL_FLOAT, 2, 'vec2']), _defineProperty(_COMPOSITE_GL_TYPES, GL_FLOAT_VEC3, [GL_FLOAT, 3, 'vec3']), _defineProperty(_COMPOSITE_GL_TYPES, GL_FLOAT_VEC4, [GL_FLOAT, 4, 'vec4']), _defineProperty(_COMPOSITE_GL_TYPES, GL_INT, [GL_INT, 1, 'int']), _defineProperty(_COMPOSITE_GL_TYPES, GL_INT_VEC2, [GL_INT, 2, 'ivec2']), _defineProperty(_COMPOSITE_GL_TYPES, GL_INT_VEC3, [GL_INT, 3, 'ivec3']), _defineProperty(_COMPOSITE_GL_TYPES, GL_INT_VEC4, [GL_INT, 4, 'ivec4']), _defineProperty(_COMPOSITE_GL_TYPES, GL_UNSIGNED_INT, [GL_UNSIGNED_INT, 1, 'uint']), _defineProperty(_COMPOSITE_GL_TYPES, GL_UNSIGNED_INT_VEC2, [GL_UNSIGNED_INT, 2, 'uvec2']), _defineProperty(_COMPOSITE_GL_TYPES, GL_UNSIGNED_INT_VEC3, [GL_UNSIGNED_INT, 3, 'uvec3']), _defineProperty(_COMPOSITE_GL_TYPES, GL_UNSIGNED_INT_VEC4, [GL_UNSIGNED_INT, 4, 'uvec4']), _defineProperty(_COMPOSITE_GL_TYPES, GL_BOOL, [GL_FLOAT, 1, 'bool']), _defineProperty(_COMPOSITE_GL_TYPES, GL_BOOL_VEC2, [GL_FLOAT, 2, 'bvec2']), _defineProperty(_COMPOSITE_GL_TYPES, GL_BOOL_VEC3, [GL_FLOAT, 3, 'bvec3']), _defineProperty(_COMPOSITE_GL_TYPES, GL_BOOL_VEC4, [GL_FLOAT, 4, 'bvec4']), _defineProperty(_COMPOSITE_GL_TYPES, GL_FLOAT_MAT2, [GL_FLOAT, 8, 'mat2']), _defineProperty(_COMPOSITE_GL_TYPES, GL_FLOAT_MAT2x3, [GL_FLOAT, 8, 'mat2x3']), _defineProperty(_COMPOSITE_GL_TYPES, GL_FLOAT_MAT2x4, [GL_FLOAT, 8, 'mat2x4']), _defineProperty(_COMPOSITE_GL_TYPES, GL_FLOAT_MAT3, [GL_FLOAT, 12, 'mat3']), _defineProperty(_COMPOSITE_GL_TYPES, GL_FLOAT_MAT3x2, [GL_FLOAT, 12, 'mat3x2']), _defineProperty(_COMPOSITE_GL_TYPES, GL_FLOAT_MAT3x4, [GL_FLOAT, 12, 'mat3x4']), _defineProperty(_COMPOSITE_GL_TYPES, GL_FLOAT_MAT4, [GL_FLOAT, 16, 'mat4']), _defineProperty(_COMPOSITE_GL_TYPES, GL_FLOAT_MAT4x2, [GL_FLOAT, 16, 'mat4x2']), _defineProperty(_COMPOSITE_GL_TYPES, GL_FLOAT_MAT4x3, [GL_FLOAT, 16, 'mat4x3']), _COMPOSITE_GL_TYPES);

function getPrimitiveDrawMode(drawMode) {
  switch (drawMode) {
    case GL_POINTS:
      return GL_POINTS;

    case GL_LINES:
      return GL_LINES;

    case GL_LINE_STRIP:
      return GL_LINES;

    case GL_LINE_LOOP:
      return GL_LINES;

    case GL_TRIANGLES:
      return GL_TRIANGLES;

    case GL_TRIANGLE_STRIP:
      return GL_TRIANGLES;

    case GL_TRIANGLE_FAN:
      return GL_TRIANGLES;

    default:
      (0, _assert.default)(false);
      return 0;
  }
}

function getPrimitiveCount(_ref) {
  var drawMode = _ref.drawMode,
      vertexCount = _ref.vertexCount;

  switch (drawMode) {
    case GL_POINTS:
    case GL_LINE_LOOP:
      return vertexCount;

    case GL_LINES:
      return vertexCount / 2;

    case GL_LINE_STRIP:
      return vertexCount - 1;

    case GL_TRIANGLES:
      return vertexCount / 3;

    case GL_TRIANGLE_STRIP:
    case GL_TRIANGLE_FAN:
      return vertexCount - 2;

    default:
      (0, _assert.default)(false);
      return 0;
  }
}

function getVertexCount(_ref2) {
  var drawMode = _ref2.drawMode,
      vertexCount = _ref2.vertexCount;
  var primitiveCount = getPrimitiveCount({
    drawMode: drawMode,
    vertexCount: vertexCount
  });

  switch (getPrimitiveDrawMode(drawMode)) {
    case GL_POINTS:
      return primitiveCount;

    case GL_LINES:
      return primitiveCount * 2;

    case GL_TRIANGLES:
      return primitiveCount * 3;

    default:
      (0, _assert.default)(false);
      return 0;
  }
}

function decomposeCompositeGLType(compositeGLType) {
  var typeAndSize = COMPOSITE_GL_TYPES[compositeGLType];

  if (!typeAndSize) {
    return null;
  }

  var _typeAndSize = _slicedToArray(typeAndSize, 2),
      type = _typeAndSize[0],
      components = _typeAndSize[1];

  return {
    type: type,
    components: components
  };
}

function getCompositeGLType(type, components) {
  switch (type) {
    case GL_BYTE:
    case GL_UNSIGNED_BYTE:
    case GL_SHORT:
    case GL_UNSIGNED_SHORT:
      type = GL_FLOAT;
      break;

    default:
  }

  for (var glType in COMPOSITE_GL_TYPES) {
    var _COMPOSITE_GL_TYPES$g = _slicedToArray(COMPOSITE_GL_TYPES[glType], 3),
        compType = _COMPOSITE_GL_TYPES$g[0],
        compComponents = _COMPOSITE_GL_TYPES$g[1],
        name = _COMPOSITE_GL_TYPES$g[2];

    if (compType === type && compComponents === components) {
      return {
        glType: glType,
        name: name
      };
    }
  }

  return null;
}
//# sourceMappingURL=attribute-utils.js.map