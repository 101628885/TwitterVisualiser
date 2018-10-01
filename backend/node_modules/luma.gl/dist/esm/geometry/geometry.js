function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

import { uid } from '../utils';
import assert from '../utils/assert';
export var DRAW_MODE = {
  POINTS: 0x0000,
  LINES: 0x0001,
  LINE_LOOP: 0x0002,
  LINE_STRIP: 0x0003,
  TRIANGLES: 0x0004,
  TRIANGLE_STRIP: 0x0005,
  TRIANGLE_FAN: 0x0006
};
export function getDrawMode(drawMode) {
  var mode = typeof drawMode === 'string' ? DRAW_MODE[drawMode] || DRAW_MODE.TRIANGLES : drawMode;
  assert(mode >= 0 && mode <= DRAW_MODE.TRIANGLE_FAN, 'Illegal drawMode');
  return mode;
}

var Geometry = function () {
  function Geometry() {
    var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Geometry);

    var id = opts.id,
        _opts$drawMode = opts.drawMode,
        drawMode = _opts$drawMode === void 0 ? DRAW_MODE.TRIANGLES : _opts$drawMode,
        _opts$vertexCount = opts.vertexCount,
        vertexCount = _opts$vertexCount === void 0 ? undefined : _opts$vertexCount,
        attributes = opts.attributes;
    this.id = id || uid(this.constructor.name);
    this.drawMode = getDrawMode(drawMode);
    this.vertexCount = vertexCount;
    this.attributes = {};
    this.needsRedraw = true;
    this.userData = {};
    Object.seal(this);

    if (attributes) {
      this.setAttributes(attributes);
    }
  }

  _createClass(Geometry, [{
    key: "setNeedsRedraw",
    value: function setNeedsRedraw() {
      var redraw = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      this.needsRedraw = redraw;
      return this;
    }
  }, {
    key: "getNeedsRedraw",
    value: function getNeedsRedraw() {
      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref$clearRedrawFlags = _ref.clearRedrawFlags,
          clearRedrawFlags = _ref$clearRedrawFlags === void 0 ? false : _ref$clearRedrawFlags;

      var redraw = false;
      redraw = redraw || this.needsRedraw;
      this.needsRedraw = this.needsRedraw && !clearRedrawFlags;
      return redraw;
    }
  }, {
    key: "setVertexCount",
    value: function setVertexCount(vertexCount) {
      this.vertexCount = vertexCount;
    }
  }, {
    key: "getVertexCount",
    value: function getVertexCount() {
      if (this.vertexCount !== undefined) {
        return this.vertexCount;
      } else if (this.attributes.indices) {
        return this.attributes.indices.value.length;
      } else if (this.attributes.vertices) {
        return this.attributes.vertices.value.length / 3;
      } else if (this.attributes.positions) {
        return this.attributes.positions.value.length / 3;
      }

      return false;
    }
  }, {
    key: "hasAttribute",
    value: function hasAttribute(attributeName) {
      return Boolean(this.attributes[attributeName]);
    }
  }, {
    key: "getAttribute",
    value: function getAttribute(attributeName) {
      var attribute = this.attributes[attributeName];
      assert(attribute);
      return attribute.value;
    }
  }, {
    key: "getArray",
    value: function getArray(attributeName) {
      var attribute = this.attributes[attributeName];
      assert(attribute);
      return attribute.value;
    }
  }, {
    key: "getAttributes",
    value: function getAttributes() {
      return this.attributes;
    }
  }, {
    key: "setAttributes",
    value: function setAttributes(attributes) {
      for (var attributeName in attributes) {
        var attribute = attributes[attributeName];
        attribute = ArrayBuffer.isView(attribute) ? {
          value: attribute
        } : attribute;
        assert(ArrayBuffer.isView(attribute.value), "".concat(this._print(attributeName), ": must be typed array or object with value as typed array"));

        this._autoDetectAttribute(attributeName, attribute);

        this.attributes[attributeName] = attribute;
      }

      this.setNeedsRedraw();
      return this;
    }
  }, {
    key: "_autoDetectAttribute",
    value: function _autoDetectAttribute(attributeName, attribute) {
      var category;

      switch (attributeName) {
        case 'indices':
          category = category || 'indices';
          break;

        case 'texCoords':
        case 'texCoord1':
        case 'texCoord2':
        case 'texCoord3':
          category = 'uvs';
          break;

        case 'vertices':
        case 'positions':
        case 'normals':
        case 'pickingColors':
          category = 'vectors';
          break;
      }

      switch (category) {
        case 'vectors':
          attribute.size = attribute.size || 3;
          break;

        case 'uvs':
          attribute.size = attribute.size || 2;
          break;

        case 'indices':
          attribute.size = attribute.size || 1;
          attribute.isIndexed = attribute.isIndexed === undefined ? true : attribute.isIndexed;
          assert(attribute.value instanceof Uint16Array || attribute.value instanceof Uint32Array, 'attribute array for "indices" must be of integer type');
          break;
      }

      assert(attribute.size, "attribute ".concat(attributeName, " needs size"));
    }
  }, {
    key: "_print",
    value: function _print(attributeName) {
      return "Geometry ".concat(this.id, " attribute ").concat(attributeName);
    }
  }]);

  return Geometry;
}();

export { Geometry as default };
//# sourceMappingURL=geometry.js.map