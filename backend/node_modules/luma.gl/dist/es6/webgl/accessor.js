import { getTypedArrayFromGLType } from '../webgl-utils/typed-array-utils';
import log from '../utils/log';
import assert from '../utils/assert';
const DEFAULT_ACCESSOR_VALUES = {
  offset: 0,
  stride: 0,
  type: 5126,
  size: 1,
  divisor: 0,
  normalized: false,
  integer: false
};
export default class Accessor {
  static getBytesPerElement(accessor) {
    const ArrayType = getTypedArrayFromGLType(accessor.type || 5126);
    return ArrayType.BYTES_PER_ELEMENT;
  }

  static getBytesPerVertex(accessor) {
    assert(accessor.size);
    const ArrayType = getTypedArrayFromGLType(accessor.type || 5126);
    return ArrayType.BYTES_PER_ELEMENT * accessor.size;
  }

  static resolve(...accessors) {
    return new Accessor(...[DEFAULT_ACCESSOR_VALUES, ...accessors]);
  }

  constructor(...accessors) {
    accessors.forEach(accessor => this._assign(accessor));
    Object.freeze(this);
  }

  toString() {
    return JSON.stringify(this);
  }

  get BYTES_PER_ELEMENT() {
    return Accessor.getBytesPerElement(this);
  }

  get BYTES_PER_VERTEX() {
    return Accessor.getBytesPerVertex(this);
  }

  _assign(props = {}) {
    if (props.type !== undefined) {
      if (this.type !== props.type) {
        log.warn('accessor type mismatch');
      }

      this.type = props.type;

      if (props.type === 5124 || props.type === 5125) {
        this.integer = true;
      }
    }

    if (props.size !== undefined) {
      if (this.size !== props.size) {
        log.warn('accessor size mismatch');
      }

      this.size = props.size;
    }

    if (props.divisor !== undefined) {
      this.divisor = props.divisor;
    }

    if (props.offset !== undefined) {
      this.offset = props.offset;
    }

    if (props.stride !== undefined) {
      this.stride = props.stride;
    }

    if (props.normalized !== undefined) {
      this.normalized = props.normalized;
    }

    if (props.integer !== undefined) {
      this.integer = props.integer;
    }

    if (props.instanced !== undefined) {
      log.deprecated('Accessor.instanced', 'Accessor.divisor');
      this.divisor = props.instanced ? 1 : 0;
    }

    if (props.isInstanced !== undefined) {
      log.deprecated('Accessor.isInstanced', 'Accessor.divisor');
      this.divisor = props.isInstanced ? 1 : 0;
    }

    if (props.index !== undefined) {
      this.index = props.index ? 1 : 0;
    }

    return this;
  }

}
export { DEFAULT_ACCESSOR_VALUES };
//# sourceMappingURL=accessor.js.map