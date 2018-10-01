import { createGLContext, assembleShaders, picking, fp64 } from 'luma.gl';
import test from 'tape-catch';
const fixture = {
  gl: createGLContext()
};
const VS_GLSL_300 = `\
#version 300 es

in vec4 positions;

void main(void) {
  gl_Position = positions;
}
`;
const FS_GLSL_300 = `\
#version 300 es

precision highp float;

out vec4 fragmentColor;

void main(void) {
  fragmentColor = vec4(1.0, 1.0, 1.0, 1.0);
}
`;
test('assembleShaders#import', t => {
  t.ok(assembleShaders !== undefined, 'assembleShaders import successful');
  t.end();
});
test('assembleShaders#version_directive', t => {
  const assembleResult = assembleShaders(fixture.gl, {
    vs: VS_GLSL_300,
    fs: FS_GLSL_300,
    modules: [picking]
  });
  t.equal(assembleResult.vs.indexOf('#version 300 es'), 0, 'version directive should be first statement');
  t.equal(assembleResult.fs.indexOf('#version 300 es'), 0, 'version directive should be first statement');
  t.end();
});
test('assembleShaders#getUniforms', t => {
  const testModuleSettings = {
    pickingActive: true
  };
  let assembleResult;
  assembleResult = assembleShaders(fixture.gl, {
    vs: VS_GLSL_300,
    fs: FS_GLSL_300
  });
  t.is(typeof assembleResult.getUniforms, 'function', 'getUniforms should be function');
  const testModule = {
    name: 'test-module',
    vs: '',
    fs: '',
    getUniforms: (opts, context) => {
      t.ok(context.picking_uActive, 'module getUniforms is called with correct context');
      return {};
    },
    dependencies: ['picking']
  };
  assembleResult = assembleShaders(fixture.gl, {
    vs: VS_GLSL_300,
    fs: FS_GLSL_300,
    modules: [picking, testModule, fp64]
  });
  t.is(typeof assembleResult.getUniforms, 'function', 'getUniforms should be function');
  assembleResult.getUniforms(testModuleSettings);
  t.end();
});
//# sourceMappingURL=assemble-shaders.spec.js.map