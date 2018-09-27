import Pass from './pass';
import pickModels from '../core/pick-models';
export default class PickingPass extends Pass {
  constructor(gl, props = {}) {
    super(gl, Object.assign({
      id: 'picking-pass'
    }, props));
  }

  _renderPass({
    gl,
    inputBuffer,
    animationProps
  }) {
    const props = this.props;
    const pickPosition = animationProps ? animationProps._mousePosition : props.mousePosition;
    const useDevicePixels = animationProps ? animationProps.useDevicePixels : props.useDevicePixels;

    if (!pickPosition) {
      for (const model of this.props.models) {
        model.updateModuleSettings({
          pickingSelectedColor: null
        });
      }

      return;
    }

    const pickInfo = pickModels(gl, {
      models: this.props.models,
      position: pickPosition,
      useDevicePixels,
      framebuffer: inputBuffer
    });

    for (const model of this.props.models) {
      if (pickInfo && pickInfo.model === model) {
        const pickingSelectedColor = pickInfo && pickInfo.color || null;
        model.updateModuleSettings({
          pickingSelectedColor
        });
      }
    }
  }

}
//# sourceMappingURL=picking-pass.js.map