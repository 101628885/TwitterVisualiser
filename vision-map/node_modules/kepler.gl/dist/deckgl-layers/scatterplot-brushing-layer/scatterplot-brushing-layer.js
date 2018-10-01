'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _get2 = require('babel-runtime/helpers/get');

var _get3 = _interopRequireDefault(_get2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _deck = require('deck.gl');

var _scatterplotBrushingLayerVertex = require('./scatterplot-brushing-layer-vertex.glsl');

var _scatterplotBrushingLayerVertex2 = _interopRequireDefault(_scatterplotBrushingLayerVertex);

var _isPointInRange = require('../../shaderlib/is-point-in-range');

var _isPointInRange2 = _interopRequireDefault(_isPointInRange);

var _scatterplotBrushingLayerFragment = require('./scatterplot-brushing-layer-fragment.glsl');

var _scatterplotBrushingLayerFragment2 = _interopRequireDefault(_scatterplotBrushingLayerFragment);

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

var defaultProps = (0, _extends3.default)({}, _deck.ScatterplotLayer.defaultProps, {
  enableBrushing: true,
  // brush radius in meters
  brushRadius: 100000,
  mousePosition: [0, 0],
  outsideBrushRadius: 0
});

var ScatterplotBrushingLayer = function (_ScatterplotLayer) {
  (0, _inherits3.default)(ScatterplotBrushingLayer, _ScatterplotLayer);

  function ScatterplotBrushingLayer() {
    (0, _classCallCheck3.default)(this, ScatterplotBrushingLayer);
    return (0, _possibleConstructorReturn3.default)(this, (ScatterplotBrushingLayer.__proto__ || Object.getPrototypeOf(ScatterplotBrushingLayer)).apply(this, arguments));
  }

  (0, _createClass3.default)(ScatterplotBrushingLayer, [{
    key: 'getShaders',
    value: function getShaders() {
      // get customized shaders
      return {
        vs: _isPointInRange2.default + _scatterplotBrushingLayerVertex2.default,
        fs: _scatterplotBrushingLayerFragment2.default,
        shaderCache: this.context.shaderCache
      };
    }
  }, {
    key: 'draw',
    value: function draw(_ref) {
      var uniforms = _ref.uniforms;

      // add uniforms
      (0, _get3.default)(ScatterplotBrushingLayer.prototype.__proto__ || Object.getPrototypeOf(ScatterplotBrushingLayer.prototype), 'draw', this).call(this, {
        uniforms: (0, _extends3.default)({}, uniforms, {
          brushRadius: this.props.brushRadius,
          outsideBrushRadius: this.props.outsideBrushRadius,
          mousePos: this.props.mousePosition ? new Float32Array(this.unproject(this.props.mousePosition)) : defaultProps.mousePosition,
          enableBrushing: this.props.enableBrushing
        })
      });
    }
  }]);
  return ScatterplotBrushingLayer;
}(_deck.ScatterplotLayer);

exports.default = ScatterplotBrushingLayer;


ScatterplotBrushingLayer.layerName = 'ScatterplotBrushingLayer';
ScatterplotBrushingLayer.defaultProps = defaultProps;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kZWNrZ2wtbGF5ZXJzL3NjYXR0ZXJwbG90LWJydXNoaW5nLWxheWVyL3NjYXR0ZXJwbG90LWJydXNoaW5nLWxheWVyLmpzIl0sIm5hbWVzIjpbImRlZmF1bHRQcm9wcyIsIlNjYXR0ZXJwbG90TGF5ZXIiLCJlbmFibGVCcnVzaGluZyIsImJydXNoUmFkaXVzIiwibW91c2VQb3NpdGlvbiIsIm91dHNpZGVCcnVzaFJhZGl1cyIsIlNjYXR0ZXJwbG90QnJ1c2hpbmdMYXllciIsInZzIiwiaXNQdEluUmFuZ2UiLCJzY2F0dGVycGxvdFZlcnRleCIsImZzIiwic2NhdHRlcnBsb3RGcmFnbWVudCIsInNoYWRlckNhY2hlIiwiY29udGV4dCIsInVuaWZvcm1zIiwicHJvcHMiLCJtb3VzZVBvcyIsIkZsb2F0MzJBcnJheSIsInVucHJvamVjdCIsImxheWVyTmFtZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQW9CQTs7QUFFQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztBQXhCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFRQSxJQUFNQSwwQ0FDREMsdUJBQWlCRCxZQURoQjtBQUVKRSxrQkFBZ0IsSUFGWjtBQUdKO0FBQ0FDLGVBQWEsTUFKVDtBQUtKQyxpQkFBZSxDQUFDLENBQUQsRUFBSSxDQUFKLENBTFg7QUFNSkMsc0JBQW9CO0FBTmhCLEVBQU47O0lBU3FCQyx3Qjs7Ozs7Ozs7OztpQ0FDTjtBQUNYO0FBQ0EsYUFBTztBQUNMQyxZQUFJQywyQkFBY0Msd0NBRGI7QUFFTEMsWUFBSUMsMENBRkM7QUFHTEMscUJBQWEsS0FBS0MsT0FBTCxDQUFhRDtBQUhyQixPQUFQO0FBS0Q7OzsrQkFFZ0I7QUFBQSxVQUFYRSxRQUFXLFFBQVhBLFFBQVc7O0FBQ2Y7QUFDQSw2SkFBVztBQUNUQSw2Q0FDS0EsUUFETDtBQUVFWCx1QkFBYSxLQUFLWSxLQUFMLENBQVdaLFdBRjFCO0FBR0VFLDhCQUFvQixLQUFLVSxLQUFMLENBQVdWLGtCQUhqQztBQUlFVyxvQkFBVSxLQUFLRCxLQUFMLENBQVdYLGFBQVgsR0FDTixJQUFJYSxZQUFKLENBQWlCLEtBQUtDLFNBQUwsQ0FBZSxLQUFLSCxLQUFMLENBQVdYLGFBQTFCLENBQWpCLENBRE0sR0FFTkosYUFBYUksYUFObkI7QUFPRUYsMEJBQWdCLEtBQUthLEtBQUwsQ0FBV2I7QUFQN0I7QUFEUyxPQUFYO0FBV0Q7OztFQXZCbURELHNCOztrQkFBakNLLHdCOzs7QUEwQnJCQSx5QkFBeUJhLFNBQXpCLEdBQXFDLDBCQUFyQztBQUNBYix5QkFBeUJOLFlBQXpCLEdBQXdDQSxZQUF4QyIsImZpbGUiOiJzY2F0dGVycGxvdC1icnVzaGluZy1sYXllci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgMjAxOCBVYmVyIFRlY2hub2xvZ2llcywgSW5jLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbi8vIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbi8vIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbi8vIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbi8vIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuLy8gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuLy8gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4vLyBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbi8vIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbi8vIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4vLyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4vLyBUSEUgU09GVFdBUkUuXG5cbmltcG9ydCB7U2NhdHRlcnBsb3RMYXllcn0gZnJvbSAnZGVjay5nbCc7XG5cbmltcG9ydCBzY2F0dGVycGxvdFZlcnRleCBmcm9tICcuL3NjYXR0ZXJwbG90LWJydXNoaW5nLWxheWVyLXZlcnRleC5nbHNsJztcbmltcG9ydCBpc1B0SW5SYW5nZSBmcm9tICcuLi8uLi9zaGFkZXJsaWIvaXMtcG9pbnQtaW4tcmFuZ2UnO1xuaW1wb3J0IHNjYXR0ZXJwbG90RnJhZ21lbnQgZnJvbSAnLi9zY2F0dGVycGxvdC1icnVzaGluZy1sYXllci1mcmFnbWVudC5nbHNsJztcblxuY29uc3QgZGVmYXVsdFByb3BzID0ge1xuICAuLi5TY2F0dGVycGxvdExheWVyLmRlZmF1bHRQcm9wcyxcbiAgZW5hYmxlQnJ1c2hpbmc6IHRydWUsXG4gIC8vIGJydXNoIHJhZGl1cyBpbiBtZXRlcnNcbiAgYnJ1c2hSYWRpdXM6IDEwMDAwMCxcbiAgbW91c2VQb3NpdGlvbjogWzAsIDBdLFxuICBvdXRzaWRlQnJ1c2hSYWRpdXM6IDBcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNjYXR0ZXJwbG90QnJ1c2hpbmdMYXllciBleHRlbmRzIFNjYXR0ZXJwbG90TGF5ZXIge1xuICBnZXRTaGFkZXJzKCkge1xuICAgIC8vIGdldCBjdXN0b21pemVkIHNoYWRlcnNcbiAgICByZXR1cm4ge1xuICAgICAgdnM6IGlzUHRJblJhbmdlICsgc2NhdHRlcnBsb3RWZXJ0ZXgsXG4gICAgICBmczogc2NhdHRlcnBsb3RGcmFnbWVudCxcbiAgICAgIHNoYWRlckNhY2hlOiB0aGlzLmNvbnRleHQuc2hhZGVyQ2FjaGVcbiAgICB9O1xuICB9XG5cbiAgZHJhdyh7dW5pZm9ybXN9KSB7XG4gICAgLy8gYWRkIHVuaWZvcm1zXG4gICAgc3VwZXIuZHJhdyh7XG4gICAgICB1bmlmb3Jtczoge1xuICAgICAgICAuLi51bmlmb3JtcyxcbiAgICAgICAgYnJ1c2hSYWRpdXM6IHRoaXMucHJvcHMuYnJ1c2hSYWRpdXMsXG4gICAgICAgIG91dHNpZGVCcnVzaFJhZGl1czogdGhpcy5wcm9wcy5vdXRzaWRlQnJ1c2hSYWRpdXMsXG4gICAgICAgIG1vdXNlUG9zOiB0aGlzLnByb3BzLm1vdXNlUG9zaXRpb25cbiAgICAgICAgICA/IG5ldyBGbG9hdDMyQXJyYXkodGhpcy51bnByb2plY3QodGhpcy5wcm9wcy5tb3VzZVBvc2l0aW9uKSlcbiAgICAgICAgICA6IGRlZmF1bHRQcm9wcy5tb3VzZVBvc2l0aW9uLFxuICAgICAgICBlbmFibGVCcnVzaGluZzogdGhpcy5wcm9wcy5lbmFibGVCcnVzaGluZ1xuICAgICAgfVxuICAgIH0pO1xuICB9XG59XG5cblNjYXR0ZXJwbG90QnJ1c2hpbmdMYXllci5sYXllck5hbWUgPSAnU2NhdHRlcnBsb3RCcnVzaGluZ0xheWVyJztcblNjYXR0ZXJwbG90QnJ1c2hpbmdMYXllci5kZWZhdWx0UHJvcHMgPSBkZWZhdWx0UHJvcHM7XG4iXX0=