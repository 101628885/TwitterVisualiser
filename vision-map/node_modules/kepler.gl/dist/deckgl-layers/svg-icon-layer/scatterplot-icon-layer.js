'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

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

var _deck = require('deck.gl');

var _luma = require('luma.gl');

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

var ScatterplotIconLayer = function (_ScatterplotLayer) {
  (0, _inherits3.default)(ScatterplotIconLayer, _ScatterplotLayer);

  function ScatterplotIconLayer() {
    (0, _classCallCheck3.default)(this, ScatterplotIconLayer);
    return (0, _possibleConstructorReturn3.default)(this, (ScatterplotIconLayer.__proto__ || Object.getPrototypeOf(ScatterplotIconLayer)).apply(this, arguments));
  }

  (0, _createClass3.default)(ScatterplotIconLayer, [{
    key: '_getModel',
    value: function _getModel(gl) {
      // use default scatterplot shaders
      var shaders = this.getShaders();
      var defaultPos = [-1, -1, 0, -1, 1, 0, 1, 1, 0, 1, -1, 0];
      var iconGeometry = this.props.iconGeometry;


      var geometry = iconGeometry ? new _luma.Geometry({
        drawMode: _luma.GL.TRIANGLES,
        positions: new Float32Array(iconGeometry)
      }) : new _luma.Geometry({
        drawMode: _luma.GL.TRIANGLE_FAN,
        positions: new Float32Array(defaultPos)
      });

      return new _luma.Model(gl, (0, _extends3.default)({}, shaders, {
        id: this.props.id,
        geometry: geometry,
        isInstanced: true,
        shaderCache: this.context.shaderCache
      }));
    }
  }]);
  return ScatterplotIconLayer;
}(_deck.ScatterplotLayer);

exports.default = ScatterplotIconLayer;


ScatterplotIconLayer.layerName = 'ScatterplotIconLayer';
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kZWNrZ2wtbGF5ZXJzL3N2Zy1pY29uLWxheWVyL3NjYXR0ZXJwbG90LWljb24tbGF5ZXIuanMiXSwibmFtZXMiOlsiU2NhdHRlcnBsb3RJY29uTGF5ZXIiLCJnbCIsInNoYWRlcnMiLCJnZXRTaGFkZXJzIiwiZGVmYXVsdFBvcyIsImljb25HZW9tZXRyeSIsInByb3BzIiwiZ2VvbWV0cnkiLCJHZW9tZXRyeSIsImRyYXdNb2RlIiwiR0wiLCJUUklBTkdMRVMiLCJwb3NpdGlvbnMiLCJGbG9hdDMyQXJyYXkiLCJUUklBTkdMRV9GQU4iLCJNb2RlbCIsImlkIiwiaXNJbnN0YW5jZWQiLCJzaGFkZXJDYWNoZSIsImNvbnRleHQiLCJTY2F0dGVycGxvdExheWVyIiwibGF5ZXJOYW1lIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFvQkE7O0FBQ0E7Ozs7QUFyQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0lBS3FCQSxvQjs7Ozs7Ozs7Ozs4QkFDVEMsRSxFQUFJO0FBQ1o7QUFDQSxVQUFNQyxVQUFVLEtBQUtDLFVBQUwsRUFBaEI7QUFDQSxVQUFNQyxhQUFhLENBQUMsQ0FBQyxDQUFGLEVBQUssQ0FBQyxDQUFOLEVBQVMsQ0FBVCxFQUFZLENBQUMsQ0FBYixFQUFnQixDQUFoQixFQUFtQixDQUFuQixFQUFzQixDQUF0QixFQUF5QixDQUF6QixFQUE0QixDQUE1QixFQUErQixDQUEvQixFQUFrQyxDQUFDLENBQW5DLEVBQXNDLENBQXRDLENBQW5CO0FBSFksVUFJTEMsWUFKSyxHQUlXLEtBQUtDLEtBSmhCLENBSUxELFlBSks7OztBQU1aLFVBQU1FLFdBQVdGLGVBQ2IsSUFBSUcsY0FBSixDQUFhO0FBQ1hDLGtCQUFVQyxTQUFHQyxTQURGO0FBRVhDLG1CQUFXLElBQUlDLFlBQUosQ0FBaUJSLFlBQWpCO0FBRkEsT0FBYixDQURhLEdBS2IsSUFBSUcsY0FBSixDQUFhO0FBQ1hDLGtCQUFVQyxTQUFHSSxZQURGO0FBRVhGLG1CQUFXLElBQUlDLFlBQUosQ0FBaUJULFVBQWpCO0FBRkEsT0FBYixDQUxKOztBQVVBLGFBQU8sSUFBSVcsV0FBSixDQUFVZCxFQUFWLDZCQUNGQyxPQURFO0FBRUxjLFlBQUksS0FBS1YsS0FBTCxDQUFXVSxFQUZWO0FBR0xULDBCQUhLO0FBSUxVLHFCQUFhLElBSlI7QUFLTEMscUJBQWEsS0FBS0MsT0FBTCxDQUFhRDtBQUxyQixTQUFQO0FBT0Q7OztFQXhCK0NFLHNCOztrQkFBN0JwQixvQjs7O0FBMkJyQkEscUJBQXFCcUIsU0FBckIsR0FBaUMsc0JBQWpDIiwiZmlsZSI6InNjYXR0ZXJwbG90LWljb24tbGF5ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIDIwMTggVWJlciBUZWNobm9sb2dpZXMsIEluYy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4vLyBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4vLyBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4vLyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4vLyBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbi8vIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbi8vIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1Jcbi8vIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuLy8gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4vLyBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4vLyBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuLy8gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuLy8gVEhFIFNPRlRXQVJFLlxuXG5pbXBvcnQge1NjYXR0ZXJwbG90TGF5ZXJ9IGZyb20gJ2RlY2suZ2wnO1xuaW1wb3J0IHtHTCwgR2VvbWV0cnksIE1vZGVsfSBmcm9tICdsdW1hLmdsJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2NhdHRlcnBsb3RJY29uTGF5ZXIgZXh0ZW5kcyBTY2F0dGVycGxvdExheWVyIHtcbiAgX2dldE1vZGVsKGdsKSB7XG4gICAgLy8gdXNlIGRlZmF1bHQgc2NhdHRlcnBsb3Qgc2hhZGVyc1xuICAgIGNvbnN0IHNoYWRlcnMgPSB0aGlzLmdldFNoYWRlcnMoKTtcbiAgICBjb25zdCBkZWZhdWx0UG9zID0gWy0xLCAtMSwgMCwgLTEsIDEsIDAsIDEsIDEsIDAsIDEsIC0xLCAwXTtcbiAgICBjb25zdCB7aWNvbkdlb21ldHJ5fSA9IHRoaXMucHJvcHM7XG5cbiAgICBjb25zdCBnZW9tZXRyeSA9IGljb25HZW9tZXRyeVxuICAgICAgPyBuZXcgR2VvbWV0cnkoe1xuICAgICAgICAgIGRyYXdNb2RlOiBHTC5UUklBTkdMRVMsXG4gICAgICAgICAgcG9zaXRpb25zOiBuZXcgRmxvYXQzMkFycmF5KGljb25HZW9tZXRyeSlcbiAgICAgICAgfSlcbiAgICAgIDogbmV3IEdlb21ldHJ5KHtcbiAgICAgICAgICBkcmF3TW9kZTogR0wuVFJJQU5HTEVfRkFOLFxuICAgICAgICAgIHBvc2l0aW9uczogbmV3IEZsb2F0MzJBcnJheShkZWZhdWx0UG9zKVxuICAgICAgICB9KTtcblxuICAgIHJldHVybiBuZXcgTW9kZWwoZ2wsIHtcbiAgICAgIC4uLnNoYWRlcnMsXG4gICAgICBpZDogdGhpcy5wcm9wcy5pZCxcbiAgICAgIGdlb21ldHJ5LFxuICAgICAgaXNJbnN0YW5jZWQ6IHRydWUsXG4gICAgICBzaGFkZXJDYWNoZTogdGhpcy5jb250ZXh0LnNoYWRlckNhY2hlXG4gICAgfSk7XG4gIH1cbn1cblxuU2NhdHRlcnBsb3RJY29uTGF5ZXIubGF5ZXJOYW1lID0gJ1NjYXR0ZXJwbG90SWNvbkxheWVyJztcbiJdfQ==