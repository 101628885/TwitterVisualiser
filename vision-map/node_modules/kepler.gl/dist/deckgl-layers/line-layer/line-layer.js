'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

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

var _luma = require('luma.gl');

var _isPicked = require('../../shaderlib/is-picked');

var _isPicked2 = _interopRequireDefault(_isPicked);

var _isPointInRange = require('../../shaderlib/is-point-in-range');

var _isPointInRange2 = _interopRequireDefault(_isPointInRange);

var _getExtrusionOffset = require('../../shaderlib/get-extrusion-offset.glsl');

var _getExtrusionOffset2 = _interopRequireDefault(_getExtrusionOffset);

var _lineBrushingLayerVertex = require('./line-brushing-layer-vertex.glsl');

var _lineBrushingLayerVertex2 = _interopRequireDefault(_lineBrushingLayerVertex);

var _lineBrushingLayerVertex3 = require('./line-brushing-layer-vertex-64.glsl');

var _lineBrushingLayerVertex4 = _interopRequireDefault(_lineBrushingLayerVertex3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultProps = (0, _extends3.default)({}, _deck.LineLayer.defaultProps, {
  // show arc if source is in brush
  brushSource: true,
  // show arc if target is in brush
  brushTarget: true,
  enableBrushing: true,
  getStrokeWidth: function getStrokeWidth(d) {
    return d.strokeWidth;
  },
  getTargetColor: function getTargetColor(x) {
    return x.color || [0, 0, 0, 255];
  },

  // brush radius in meters
  brushRadius: 100000,
  pickedColor: [254, 210, 26, 255],
  mousePosition: [0, 0]
}); // Copyright (c) 2018 Uber Technologies, Inc.
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

var LineBrushingLayer = function (_LineLayer) {
  (0, _inherits3.default)(LineBrushingLayer, _LineLayer);

  function LineBrushingLayer() {
    (0, _classCallCheck3.default)(this, LineBrushingLayer);
    return (0, _possibleConstructorReturn3.default)(this, (LineBrushingLayer.__proto__ || Object.getPrototypeOf(LineBrushingLayer)).apply(this, arguments));
  }

  (0, _createClass3.default)(LineBrushingLayer, [{
    key: 'getShaders',
    value: function getShaders() {
      var shaders = (0, _get3.default)(LineBrushingLayer.prototype.__proto__ || Object.getPrototypeOf(LineBrushingLayer.prototype), 'getShaders', this).call(this);
      var addons = _getExtrusionOffset2.default + _isPicked2.default + _isPointInRange2.default;

      return (0, _extends3.default)({}, shaders, {
        vs: this.props.fp64 ? addons + _lineBrushingLayerVertex4.default : addons + _lineBrushingLayerVertex2.default
      });
    }
  }, {
    key: 'initializeState',
    value: function initializeState() {
      (0, _get3.default)(LineBrushingLayer.prototype.__proto__ || Object.getPrototypeOf(LineBrushingLayer.prototype), 'initializeState', this).call(this);
      var attributeManager = this.state.attributeManager;

      attributeManager.addInstanced({
        instanceStrokeWidth: {
          size: 1,
          accessor: ['getStrokeWidth'],
          update: this.calculateInstanceStrokeWidth
        },
        instanceTargetColors: {
          size: 4,
          type: _luma.GL.UNSIGNED_BYTE,
          accessor: 'getTargetColor',
          update: this.calculateInstanceTargetColors
        }
      });
    }
  }, {
    key: 'draw',
    value: function draw(_ref) {
      var uniforms = _ref.uniforms;
      var _props = this.props,
          brushSource = _props.brushSource,
          brushTarget = _props.brushTarget,
          brushRadius = _props.brushRadius,
          enableBrushing = _props.enableBrushing,
          pickedColor = _props.pickedColor,
          mousePosition = _props.mousePosition,
          strokeScale = _props.strokeScale;


      var picked = !Array.isArray(pickedColor) ? defaultProps.pickedColor : pickedColor;

      (0, _get3.default)(LineBrushingLayer.prototype.__proto__ || Object.getPrototypeOf(LineBrushingLayer.prototype), 'draw', this).call(this, {
        uniforms: (0, _extends3.default)({}, uniforms, {
          brushSource: brushSource,
          brushTarget: brushTarget,
          brushRadius: brushRadius,
          enableBrushing: enableBrushing,
          strokeScale: strokeScale,
          pickedColor: new Uint8ClampedArray(!Number.isFinite(pickedColor[3]) ? [].concat((0, _toConsumableArray3.default)(picked), [255]) : picked),
          mousePos: mousePosition ? new Float32Array(this.unproject(mousePosition)) : defaultProps.mousePosition
        })
      });
    }
  }, {
    key: 'calculateInstanceStrokeWidth',
    value: function calculateInstanceStrokeWidth(attribute) {
      var _props2 = this.props,
          data = _props2.data,
          getStrokeWidth = _props2.getStrokeWidth;
      var value = attribute.value,
          size = attribute.size;

      var i = 0;
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = data[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var object = _step.value;

          var width = getStrokeWidth(object);
          value[i] = Number.isFinite(width) ? width : 1;
          i += size;
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }
  }, {
    key: 'calculateInstanceTargetColors',
    value: function calculateInstanceTargetColors(attribute) {
      var _props3 = this.props,
          data = _props3.data,
          getTargetColor = _props3.getTargetColor;
      var value = attribute.value,
          size = attribute.size;

      var i = 0;
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = data[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var object = _step2.value;

          var color = getTargetColor(object);
          value[i + 0] = color[0];
          value[i + 1] = color[1];
          value[i + 2] = color[2];
          value[i + 3] = isNaN(color[3]) ? 255 : color[3];
          i += size;
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }
    }
  }]);
  return LineBrushingLayer;
}(_deck.LineLayer);

exports.default = LineBrushingLayer;


LineBrushingLayer.layerName = 'LineBrushingLayer';
LineBrushingLayer.defaultProps = defaultProps;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kZWNrZ2wtbGF5ZXJzL2xpbmUtbGF5ZXIvbGluZS1sYXllci5qcyJdLCJuYW1lcyI6WyJkZWZhdWx0UHJvcHMiLCJMaW5lTGF5ZXIiLCJicnVzaFNvdXJjZSIsImJydXNoVGFyZ2V0IiwiZW5hYmxlQnJ1c2hpbmciLCJnZXRTdHJva2VXaWR0aCIsImQiLCJzdHJva2VXaWR0aCIsImdldFRhcmdldENvbG9yIiwieCIsImNvbG9yIiwiYnJ1c2hSYWRpdXMiLCJwaWNrZWRDb2xvciIsIm1vdXNlUG9zaXRpb24iLCJMaW5lQnJ1c2hpbmdMYXllciIsInNoYWRlcnMiLCJhZGRvbnMiLCJnZXRFeHRydXNpb24iLCJpc1BpY2tlZCIsImlzUHRJblJhbmdlIiwidnMiLCJwcm9wcyIsImZwNjQiLCJ2czY0IiwiYXR0cmlidXRlTWFuYWdlciIsInN0YXRlIiwiYWRkSW5zdGFuY2VkIiwiaW5zdGFuY2VTdHJva2VXaWR0aCIsInNpemUiLCJhY2Nlc3NvciIsInVwZGF0ZSIsImNhbGN1bGF0ZUluc3RhbmNlU3Ryb2tlV2lkdGgiLCJpbnN0YW5jZVRhcmdldENvbG9ycyIsInR5cGUiLCJHTCIsIlVOU0lHTkVEX0JZVEUiLCJjYWxjdWxhdGVJbnN0YW5jZVRhcmdldENvbG9ycyIsInVuaWZvcm1zIiwic3Ryb2tlU2NhbGUiLCJwaWNrZWQiLCJBcnJheSIsImlzQXJyYXkiLCJVaW50OENsYW1wZWRBcnJheSIsIk51bWJlciIsImlzRmluaXRlIiwibW91c2VQb3MiLCJGbG9hdDMyQXJyYXkiLCJ1bnByb2plY3QiLCJhdHRyaWJ1dGUiLCJkYXRhIiwidmFsdWUiLCJpIiwib2JqZWN0Iiwid2lkdGgiLCJpc05hTiIsImxheWVyTmFtZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFvQkE7O0FBQ0E7O0FBRUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBRUEsSUFBTUEsMENBQ0RDLGdC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O0FBWXhDOzs7RUFyRjRDM0IsZTs7a0JBQTFCYSxpQjs7O0FBd0ZyQkEsa0JBQWtCeUMsU0FBbEIsR0FBOEIsbUJBQTlCO0FBQ0F6QyxrQkFBa0JkLFlBQWxCLEdBQWlDQSxZQUFqQyIsImZpbGUiOiJsaW5lLWxheWVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSAyMDE4IFViZXIgVGVjaG5vbG9naWVzLCBJbmMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuLy8gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuLy8gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuLy8gdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuLy8gY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4vLyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4vLyBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4vLyBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbi8vIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuLy8gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuLy8gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbi8vIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbi8vIFRIRSBTT0ZUV0FSRS5cblxuaW1wb3J0IHtMaW5lTGF5ZXJ9IGZyb20gJ2RlY2suZ2wnO1xuaW1wb3J0IHtHTH0gZnJvbSAnbHVtYS5nbCc7XG5cbmltcG9ydCBpc1BpY2tlZCBmcm9tICcuLi8uLi9zaGFkZXJsaWIvaXMtcGlja2VkJztcbmltcG9ydCBpc1B0SW5SYW5nZSBmcm9tICcuLi8uLi9zaGFkZXJsaWIvaXMtcG9pbnQtaW4tcmFuZ2UnO1xuaW1wb3J0IGdldEV4dHJ1c2lvbiBmcm9tICcuLi8uLi9zaGFkZXJsaWIvZ2V0LWV4dHJ1c2lvbi1vZmZzZXQuZ2xzbCc7XG5pbXBvcnQgdnMgZnJvbSAnLi9saW5lLWJydXNoaW5nLWxheWVyLXZlcnRleC5nbHNsJztcbmltcG9ydCB2czY0IGZyb20gJy4vbGluZS1icnVzaGluZy1sYXllci12ZXJ0ZXgtNjQuZ2xzbCc7XG5cbmNvbnN0IGRlZmF1bHRQcm9wcyA9IHtcbiAgLi4uTGluZUxheWVyLmRlZmF1bHRQcm9wcyxcbiAgLy8gc2hvdyBhcmMgaWYgc291cmNlIGlzIGluIGJydXNoXG4gIGJydXNoU291cmNlOiB0cnVlLFxuICAvLyBzaG93IGFyYyBpZiB0YXJnZXQgaXMgaW4gYnJ1c2hcbiAgYnJ1c2hUYXJnZXQ6IHRydWUsXG4gIGVuYWJsZUJydXNoaW5nOiB0cnVlLFxuICBnZXRTdHJva2VXaWR0aDogZCA9PiBkLnN0cm9rZVdpZHRoLFxuICBnZXRUYXJnZXRDb2xvcjogeCA9PiB4LmNvbG9yIHx8IFswLCAwLCAwLCAyNTVdLFxuXG4gIC8vIGJydXNoIHJhZGl1cyBpbiBtZXRlcnNcbiAgYnJ1c2hSYWRpdXM6IDEwMDAwMCxcbiAgcGlja2VkQ29sb3I6IFsyNTQsIDIxMCwgMjYsIDI1NV0sXG4gIG1vdXNlUG9zaXRpb246IFswLCAwXVxufTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTGluZUJydXNoaW5nTGF5ZXIgZXh0ZW5kcyBMaW5lTGF5ZXIge1xuICBnZXRTaGFkZXJzKCkge1xuICAgIGNvbnN0IHNoYWRlcnMgPSBzdXBlci5nZXRTaGFkZXJzKCk7XG4gICAgY29uc3QgYWRkb25zID0gZ2V0RXh0cnVzaW9uICsgaXNQaWNrZWQgKyBpc1B0SW5SYW5nZTtcblxuICAgIHJldHVybiB7XG4gICAgICAuLi5zaGFkZXJzLFxuICAgICAgdnM6IHRoaXMucHJvcHMuZnA2NCA/IGFkZG9ucyArIHZzNjQgOiBhZGRvbnMgKyB2c1xuICAgIH07XG4gIH1cblxuICBpbml0aWFsaXplU3RhdGUoKSB7XG4gICAgc3VwZXIuaW5pdGlhbGl6ZVN0YXRlKCk7XG4gICAgY29uc3Qge2F0dHJpYnV0ZU1hbmFnZXJ9ID0gdGhpcy5zdGF0ZTtcbiAgICBhdHRyaWJ1dGVNYW5hZ2VyLmFkZEluc3RhbmNlZCh7XG4gICAgICBpbnN0YW5jZVN0cm9rZVdpZHRoOiB7XG4gICAgICAgIHNpemU6IDEsXG4gICAgICAgIGFjY2Vzc29yOiBbJ2dldFN0cm9rZVdpZHRoJ10sXG4gICAgICAgIHVwZGF0ZTogdGhpcy5jYWxjdWxhdGVJbnN0YW5jZVN0cm9rZVdpZHRoXG4gICAgICB9LFxuICAgICAgaW5zdGFuY2VUYXJnZXRDb2xvcnM6IHtcbiAgICAgICAgc2l6ZTogNCxcbiAgICAgICAgdHlwZTogR0wuVU5TSUdORURfQllURSxcbiAgICAgICAgYWNjZXNzb3I6ICdnZXRUYXJnZXRDb2xvcicsXG4gICAgICAgIHVwZGF0ZTogdGhpcy5jYWxjdWxhdGVJbnN0YW5jZVRhcmdldENvbG9yc1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgZHJhdyh7dW5pZm9ybXN9KSB7XG4gICAgY29uc3Qge1xuICAgICAgYnJ1c2hTb3VyY2UsXG4gICAgICBicnVzaFRhcmdldCxcbiAgICAgIGJydXNoUmFkaXVzLFxuICAgICAgZW5hYmxlQnJ1c2hpbmcsXG4gICAgICBwaWNrZWRDb2xvcixcbiAgICAgIG1vdXNlUG9zaXRpb24sXG4gICAgICBzdHJva2VTY2FsZVxuICAgIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgY29uc3QgcGlja2VkID0gIUFycmF5LmlzQXJyYXkocGlja2VkQ29sb3IpXG4gICAgICA/IGRlZmF1bHRQcm9wcy5waWNrZWRDb2xvclxuICAgICAgOiBwaWNrZWRDb2xvcjtcblxuICAgIHN1cGVyLmRyYXcoe1xuICAgICAgdW5pZm9ybXM6IHtcbiAgICAgICAgLi4udW5pZm9ybXMsXG4gICAgICAgIGJydXNoU291cmNlLFxuICAgICAgICBicnVzaFRhcmdldCxcbiAgICAgICAgYnJ1c2hSYWRpdXMsXG4gICAgICAgIGVuYWJsZUJydXNoaW5nLFxuICAgICAgICBzdHJva2VTY2FsZSxcbiAgICAgICAgcGlja2VkQ29sb3I6IG5ldyBVaW50OENsYW1wZWRBcnJheShcbiAgICAgICAgICAhTnVtYmVyLmlzRmluaXRlKHBpY2tlZENvbG9yWzNdKSA/IFsuLi5waWNrZWQsIDI1NV0gOiBwaWNrZWRcbiAgICAgICAgKSxcbiAgICAgICAgbW91c2VQb3M6IG1vdXNlUG9zaXRpb25cbiAgICAgICAgICA/IG5ldyBGbG9hdDMyQXJyYXkodGhpcy51bnByb2plY3QobW91c2VQb3NpdGlvbikpXG4gICAgICAgICAgOiBkZWZhdWx0UHJvcHMubW91c2VQb3NpdGlvblxuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgY2FsY3VsYXRlSW5zdGFuY2VTdHJva2VXaWR0aChhdHRyaWJ1dGUpIHtcbiAgICBjb25zdCB7ZGF0YSwgZ2V0U3Ryb2tlV2lkdGh9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCB7dmFsdWUsIHNpemV9ID0gYXR0cmlidXRlO1xuICAgIGxldCBpID0gMDtcbiAgICBmb3IgKGNvbnN0IG9iamVjdCBvZiBkYXRhKSB7XG4gICAgICBjb25zdCB3aWR0aCA9IGdldFN0cm9rZVdpZHRoKG9iamVjdCk7XG4gICAgICB2YWx1ZVtpXSA9IE51bWJlci5pc0Zpbml0ZSh3aWR0aCkgPyB3aWR0aCA6IDE7XG4gICAgICBpICs9IHNpemU7XG4gICAgfVxuICB9XG5cbiAgY2FsY3VsYXRlSW5zdGFuY2VUYXJnZXRDb2xvcnMoYXR0cmlidXRlKSB7XG4gICAgY29uc3Qge2RhdGEsIGdldFRhcmdldENvbG9yfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3Qge3ZhbHVlLCBzaXplfSA9IGF0dHJpYnV0ZTtcbiAgICBsZXQgaSA9IDA7XG4gICAgZm9yIChjb25zdCBvYmplY3Qgb2YgZGF0YSkge1xuICAgICAgY29uc3QgY29sb3IgPSBnZXRUYXJnZXRDb2xvcihvYmplY3QpO1xuICAgICAgdmFsdWVbaSArIDBdID0gY29sb3JbMF07XG4gICAgICB2YWx1ZVtpICsgMV0gPSBjb2xvclsxXTtcbiAgICAgIHZhbHVlW2kgKyAyXSA9IGNvbG9yWzJdO1xuICAgICAgdmFsdWVbaSArIDNdID0gaXNOYU4oY29sb3JbM10pID8gMjU1IDogY29sb3JbM107XG4gICAgICBpICs9IHNpemU7XG4gICAgfVxuICB9XG59XG5cbkxpbmVCcnVzaGluZ0xheWVyLmxheWVyTmFtZSA9ICdMaW5lQnJ1c2hpbmdMYXllcic7XG5MaW5lQnJ1c2hpbmdMYXllci5kZWZhdWx0UHJvcHMgPSBkZWZhdWx0UHJvcHM7XG4iXX0=