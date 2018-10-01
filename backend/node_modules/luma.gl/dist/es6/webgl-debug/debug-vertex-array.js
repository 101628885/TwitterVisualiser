import Buffer from '../webgl/buffer';
import { glKey } from '../webgl-utils/constants-to-keys';
import { getCompositeGLType } from '../webgl-utils/attribute-utils';
import { formatValue } from '../utils';
export function getDebugTableForVertexArray({
  vertexArray,
  header = 'Attributes'
} = {}) {
  if (!vertexArray.configuration) {
    return {};
  }

  const table = {};

  if (vertexArray.elements) {
    table.ELEMENT_ARRAY_BUFFER = getDebugTableRow(vertexArray, vertexArray.elements, null, header);
  }

  const attributes = vertexArray.values;

  for (const attributeLocation in attributes) {
    const info = vertexArray._getAttributeInfo(attributeLocation);

    if (info) {
      let rowHeader = `${attributeLocation}: ${info.name}`;
      const accessor = vertexArray.accessors[info.location];

      if (accessor) {
        rowHeader = `${attributeLocation}: ${getGLSLDeclaration(info.name, accessor)}`;
      }

      table[rowHeader] = getDebugTableRow(vertexArray, attributes[attributeLocation], accessor, header);
    }
  }

  return table;
}

function getDebugTableRow(vertexArray, attribute, accessor, header) {
  const gl = vertexArray.gl;
  let type = 'NOT PROVIDED';
  let size = 'N/A';
  let verts = 'N/A';
  let bytes = 'N/A';
  let isInteger;
  let marker;
  let value;

  if (accessor) {
    type = accessor.type;
    size = accessor.size;
    type = String(type).replace('Array', '');
    isInteger = type.indexOf('nt') !== -1;
  }

  if (attribute instanceof Buffer) {
    const buffer = attribute;

    const _buffer$getDebugData = buffer.getDebugData(),
          data = _buffer$getDebugData.data,
          modified = _buffer$getDebugData.modified;

    marker = modified ? '*' : '';
    value = data;
    bytes = buffer.byteLength;
    verts = bytes / data.BYTES_PER_ELEMENT / size;
    let format;

    if (accessor) {
      const instanced = accessor.divisor > 0;
      format = `${instanced ? 'I ' : 'P '} ${verts} (x${size}=${bytes} bytes ${glKey(gl, type)})`;
    } else {
      isInteger = true;
      format = `${bytes} bytes`;
    }

    return {
      [header]: `${marker}${formatValue(value, {
        size,
        isInteger
      })}`,
      'Format ': format
    };
  }

  value = attribute;
  size = attribute.length;
  type = String(attribute.constructor.name).replace('Array', '');
  isInteger = type.indexOf('nt') !== -1;
  return {
    [header]: `${formatValue(value, {
      size,
      isInteger
    })} (constant)`,
    'Format ': `${size}x${type} (constant)`
  };
}

function getGLSLDeclaration(name, accessor) {
  const type = accessor.type,
        size = accessor.size;
  const typeAndName = getCompositeGLType(type, size);

  if (typeAndName) {
    return `${name} (${typeAndName.name})`;
  }

  return name;
}
//# sourceMappingURL=debug-vertex-array.js.map