import { uid } from '../utils';
import assert from '../utils/assert';
export const DRAW_MODE = {
  POINTS: 0x0000,
  LINES: 0x0001,
  LINE_LOOP: 0x0002,
  LINE_STRIP: 0x0003,
  TRIANGLES: 0x0004,
  TRIANGLE_STRIP: 0x0005,
  TRIANGLE_FAN: 0x0006
};
export function getDrawMode(drawMode) {
  const mode = typeof drawMode === 'string' ? DRAW_MODE[drawMode] || DRAW_MODE.TRIANGLES : drawMode;
  assert(mode >= 0 && mode <= DRAW_MODE.TRIANGLE_FAN, 'Illegal drawMode');
  return mode;
}
export default class Geometry {
  constructor(opts = {}) {
    const id = opts.id,
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

  setNeedsRedraw(redraw = true) {
    this.needsRedraw = redraw;
    return this;
  }

  getNeedsRedraw({
    clearRedrawFlags = false
  } = {}) {
    let redraw = false;
    redraw = redraw || this.needsRedraw;
    this.needsRedraw = this.needsRedraw && !clearRedrawFlags;
    return redraw;
  }

  setVertexCount(vertexCount) {
    this.vertexCount = vertexCount;
  }

  getVertexCount() {
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

  hasAttribute(attributeName) {
    return Boolean(this.attributes[attributeName]);
  }

  getAttribute(attributeName) {
    const attribute = this.attributes[attributeName];
    assert(attribute);
    return attribute.value;
  }

  getArray(attributeName) {
    const attribute = this.attributes[attributeName];
    assert(attribute);
    return attribute.value;
  }

  getAttributes() {
    return this.attributes;
  }

  setAttributes(attributes) {
    for (const attributeName in attributes) {
      let attribute = attributes[attributeName];
      attribute = ArrayBuffer.isView(attribute) ? {
        value: attribute
      } : attribute;
      assert(ArrayBuffer.isView(attribute.value), `${this._print(attributeName)}: must be typed array or object with value as typed array`);

      this._autoDetectAttribute(attributeName, attribute);

      this.attributes[attributeName] = attribute;
    }

    this.setNeedsRedraw();
    return this;
  }

  _autoDetectAttribute(attributeName, attribute) {
    let category;

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

    assert(attribute.size, `attribute ${attributeName} needs size`);
  }

  _print(attributeName) {
    return `Geometry ${this.id} attribute ${attributeName}`;
  }

}
//# sourceMappingURL=geometry.js.map