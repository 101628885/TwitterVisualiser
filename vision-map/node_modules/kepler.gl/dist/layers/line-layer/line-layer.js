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

var _arcLayer = require('../arc-layer/arc-layer');

var _arcLayer2 = _interopRequireDefault(_arcLayer);

var _lineLayer = require('../../deckgl-layers/line-layer/line-layer');

var _lineLayer2 = _interopRequireDefault(_lineLayer);

var _lineLayerIcon = require('./line-layer-icon');

var _lineLayerIcon2 = _interopRequireDefault(_lineLayerIcon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LineLayer = function (_ArcLayer) {
  (0, _inherits3.default)(LineLayer, _ArcLayer);

  function LineLayer() {
    (0, _classCallCheck3.default)(this, LineLayer);
    return (0, _possibleConstructorReturn3.default)(this, (LineLayer.__proto__ || Object.getPrototypeOf(LineLayer)).apply(this, arguments));
  }

  (0, _createClass3.default)(LineLayer, [{
    key: 'renderLayer',
    value: function renderLayer(_ref) {
      var data = _ref.data,
          idx = _ref.idx,
          layerInteraction = _ref.layerInteraction,
          objectHovered = _ref.objectHovered,
          mapState = _ref.mapState,
          interactionConfig = _ref.interactionConfig;
      var brush = interactionConfig.brush;


      var colorUpdateTriggers = {
        color: this.config.color,
        colorField: this.config.colorField,
        colorRange: this.config.visConfig.colorRange,
        colorScale: this.config.colorScale
      };

      return [
      // base layer
      new _lineLayer2.default((0, _extends3.default)({}, layerInteraction, data, {
        getColor: data.getSourceColor,
        id: this.id,
        idx: idx,
        brushRadius: brush.config.size * 1000,
        brushSource: true,
        brushTarget: true,
        enableBrushing: brush.enabled,
        fp64: this.config.visConfig['hi-precision'],
        opacity: this.config.visConfig.opacity,
        pickable: true,
        pickedColor: this.config.highlightColor,
        strokeScale: this.config.visConfig.thickness,
        updateTriggers: {
          getStrokeWidth: {
            sizeField: this.config.sizeField,
            sizeRange: this.config.visConfig.sizeRange
          },
          getColor: colorUpdateTriggers
        }
      }))];
    }
  }, {
    key: 'type',
    get: function get() {
      return 'line';
    }
  }, {
    key: 'layerIcon',
    get: function get() {
      return _lineLayerIcon2.default;
    }
  }], [{
    key: 'findDefaultLayerProps',
    value: function findDefaultLayerProps(_ref2) {
      var fieldPairs = _ref2.fieldPairs;

      if (fieldPairs.length < 2) {
        return [];
      }
      var props = {};

      // connect the first two point layer with arc
      props.columns = {
        lat0: fieldPairs[0].pair.lat,
        lng0: fieldPairs[0].pair.lng,
        lat1: fieldPairs[1].pair.lat,
        lng1: fieldPairs[1].pair.lng
      };
      props.label = fieldPairs[0].defaultName + ' -> ' + fieldPairs[1].defaultName + ' line';

      return props;
    }
  }]);
  return LineLayer;
}(_arcLayer2.default); // Copyright (c) 2018 Uber Technologies, Inc.
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

exports.default = LineLayer;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9sYXllcnMvbGluZS1sYXllci9saW5lLWxheWVyLmpzIl0sIm5hbWVzIjpbIkxpbmVMYXllciIsImRhdGEiLCJpZHgiLCJsYXllckludGVyYWN0aW9uIiwib2JqZWN0SG92ZXJlZCIsIm1hcFN0YXRlIiwiaW50ZXJhY3Rpb25Db25maWciLCJicnVzaCIsImNvbG9yVXBkYXRlVHJpZ2dlcnMiLCJjb2xvciIsImNvbmZpZyIsImNvbG9yRmllbGQiLCJjb2xvclJhbmdlIiwidmlzQ29uZmlnIiwiY29sb3JTY2FsZSIsIkRlY2tHTExpbmVMYXllciIsImdldENvbG9yIiwiZ2V0U291cmNlQ29sb3IiLCJpZCIsImJydXNoUmFkaXVzIiwic2l6ZSIsImJydXNoU291cmNlIiwiYnJ1c2hUYXJnZXQiLCJlbmFibGVCcnVzaGluZyIsImVuYWJsZWQiLCJmcDY0Iiwib3BhY2l0eSIsInBpY2thYmxlIiwicGlja2VkQ29sb3IiLCJoaWdobGlnaHRDb2xvciIsInN0cm9rZVNjYWxlIiwidGhpY2tuZXNzIiwidXBkYXRlVHJpZ2dlcnMiLCJnZXRTdHJva2VXaWR0aCIsInNpemVGaWVsZCIsInNpemVSYW5nZSIsIkxpbmVMYXllckljb24iLCJmaWVsZFBhaXJzIiwibGVuZ3RoIiwicHJvcHMiLCJjb2x1bW5zIiwibGF0MCIsInBhaXIiLCJsYXQiLCJsbmcwIiwibG5nIiwibGF0MSIsImxuZzEiLCJsYWJlbCIsImRlZmF1bHROYW1lIiwiQXJjTGF5ZXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQW9CQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztJQUVxQkEsUzs7Ozs7Ozs7OztzQ0FvQ2hCO0FBQUEsVUFOREMsSUFNQyxRQU5EQSxJQU1DO0FBQUEsVUFMREMsR0FLQyxRQUxEQSxHQUtDO0FBQUEsVUFKREMsZ0JBSUMsUUFKREEsZ0JBSUM7QUFBQSxVQUhEQyxhQUdDLFFBSERBLGFBR0M7QUFBQSxVQUZEQyxRQUVDLFFBRkRBLFFBRUM7QUFBQSxVQUREQyxpQkFDQyxRQUREQSxpQkFDQztBQUFBLFVBQ01DLEtBRE4sR0FDZUQsaUJBRGYsQ0FDTUMsS0FETjs7O0FBR0QsVUFBTUMsc0JBQXNCO0FBQzFCQyxlQUFPLEtBQUtDLE1BQUwsQ0FBWUQsS0FETztBQUUxQkUsb0JBQVksS0FBS0QsTUFBTCxDQUFZQyxVQUZFO0FBRzFCQyxvQkFBWSxLQUFLRixNQUFMLENBQVlHLFNBQVosQ0FBc0JELFVBSFI7QUFJMUJFLG9CQUFZLEtBQUtKLE1BQUwsQ0FBWUk7QUFKRSxPQUE1Qjs7QUFPQSxhQUFPO0FBQ0w7QUFDQSxVQUFJQyxtQkFBSiw0QkFDS1osZ0JBREwsRUFFS0YsSUFGTDtBQUdFZSxrQkFBVWYsS0FBS2dCLGNBSGpCO0FBSUVDLFlBQUksS0FBS0EsRUFKWDtBQUtFaEIsZ0JBTEY7QUFNRWlCLHFCQUFhWixNQUFNRyxNQUFOLENBQWFVLElBQWIsR0FBb0IsSUFObkM7QUFPRUMscUJBQWEsSUFQZjtBQVFFQyxxQkFBYSxJQVJmO0FBU0VDLHdCQUFnQmhCLE1BQU1pQixPQVR4QjtBQVVFQyxjQUFNLEtBQUtmLE1BQUwsQ0FBWUcsU0FBWixDQUFzQixjQUF0QixDQVZSO0FBV0VhLGlCQUFTLEtBQUtoQixNQUFMLENBQVlHLFNBQVosQ0FBc0JhLE9BWGpDO0FBWUVDLGtCQUFVLElBWlo7QUFhRUMscUJBQWEsS0FBS2xCLE1BQUwsQ0FBWW1CLGNBYjNCO0FBY0VDLHFCQUFhLEtBQUtwQixNQUFMLENBQVlHLFNBQVosQ0FBc0JrQixTQWRyQztBQWVFQyx3QkFBZ0I7QUFDZEMsMEJBQWdCO0FBQ2RDLHVCQUFXLEtBQUt4QixNQUFMLENBQVl3QixTQURUO0FBRWRDLHVCQUFXLEtBQUt6QixNQUFMLENBQVlHLFNBQVosQ0FBc0JzQjtBQUZuQixXQURGO0FBS2RuQixvQkFBVVI7QUFMSTtBQWZsQixTQUZLLENBQVA7QUEwQkQ7Ozt3QkF2RVU7QUFDVCxhQUFPLE1BQVA7QUFDRDs7O3dCQUVlO0FBQ2QsYUFBTzRCLHVCQUFQO0FBQ0Q7OztpREFFMEM7QUFBQSxVQUFiQyxVQUFhLFNBQWJBLFVBQWE7O0FBQ3pDLFVBQUlBLFdBQVdDLE1BQVgsR0FBb0IsQ0FBeEIsRUFBMkI7QUFDekIsZUFBTyxFQUFQO0FBQ0Q7QUFDRCxVQUFNQyxRQUFRLEVBQWQ7O0FBRUE7QUFDQUEsWUFBTUMsT0FBTixHQUFnQjtBQUNkQyxjQUFNSixXQUFXLENBQVgsRUFBY0ssSUFBZCxDQUFtQkMsR0FEWDtBQUVkQyxjQUFNUCxXQUFXLENBQVgsRUFBY0ssSUFBZCxDQUFtQkcsR0FGWDtBQUdkQyxjQUFNVCxXQUFXLENBQVgsRUFBY0ssSUFBZCxDQUFtQkMsR0FIWDtBQUlkSSxjQUFNVixXQUFXLENBQVgsRUFBY0ssSUFBZCxDQUFtQkc7QUFKWCxPQUFoQjtBQU1BTixZQUFNUyxLQUFOLEdBQWlCWCxXQUFXLENBQVgsRUFBY1ksV0FBL0IsWUFDRVosV0FBVyxDQUFYLEVBQWNZLFdBRGhCOztBQUlBLGFBQU9WLEtBQVA7QUFDRDs7O0VBM0JvQ1csa0IsR0F4QnZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztrQkFNcUJsRCxTIiwiZmlsZSI6ImxpbmUtbGF5ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIDIwMTggVWJlciBUZWNobm9sb2dpZXMsIEluYy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4vLyBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4vLyBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4vLyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4vLyBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbi8vIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbi8vIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1Jcbi8vIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuLy8gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4vLyBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4vLyBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuLy8gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuLy8gVEhFIFNPRlRXQVJFLlxuXG5pbXBvcnQgQXJjTGF5ZXIgZnJvbSAnLi4vYXJjLWxheWVyL2FyYy1sYXllcic7XG5pbXBvcnQgRGVja0dMTGluZUxheWVyIGZyb20gJ2RlY2tnbC1sYXllcnMvbGluZS1sYXllci9saW5lLWxheWVyJztcbmltcG9ydCBMaW5lTGF5ZXJJY29uIGZyb20gJy4vbGluZS1sYXllci1pY29uJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTGluZUxheWVyIGV4dGVuZHMgQXJjTGF5ZXIge1xuICBnZXQgdHlwZSgpIHtcbiAgICByZXR1cm4gJ2xpbmUnO1xuICB9XG5cbiAgZ2V0IGxheWVySWNvbigpIHtcbiAgICByZXR1cm4gTGluZUxheWVySWNvbjtcbiAgfVxuXG4gIHN0YXRpYyBmaW5kRGVmYXVsdExheWVyUHJvcHMoe2ZpZWxkUGFpcnN9KSB7XG4gICAgaWYgKGZpZWxkUGFpcnMubGVuZ3RoIDwgMikge1xuICAgICAgcmV0dXJuIFtdO1xuICAgIH1cbiAgICBjb25zdCBwcm9wcyA9IHt9O1xuXG4gICAgLy8gY29ubmVjdCB0aGUgZmlyc3QgdHdvIHBvaW50IGxheWVyIHdpdGggYXJjXG4gICAgcHJvcHMuY29sdW1ucyA9IHtcbiAgICAgIGxhdDA6IGZpZWxkUGFpcnNbMF0ucGFpci5sYXQsXG4gICAgICBsbmcwOiBmaWVsZFBhaXJzWzBdLnBhaXIubG5nLFxuICAgICAgbGF0MTogZmllbGRQYWlyc1sxXS5wYWlyLmxhdCxcbiAgICAgIGxuZzE6IGZpZWxkUGFpcnNbMV0ucGFpci5sbmdcbiAgICB9O1xuICAgIHByb3BzLmxhYmVsID0gYCR7ZmllbGRQYWlyc1swXS5kZWZhdWx0TmFtZX0gLT4gJHtcbiAgICAgIGZpZWxkUGFpcnNbMV0uZGVmYXVsdE5hbWVcbiAgICAgIH0gbGluZWA7XG5cbiAgICByZXR1cm4gcHJvcHM7XG4gIH1cblxuICByZW5kZXJMYXllcih7XG4gICAgZGF0YSxcbiAgICBpZHgsXG4gICAgbGF5ZXJJbnRlcmFjdGlvbixcbiAgICBvYmplY3RIb3ZlcmVkLFxuICAgIG1hcFN0YXRlLFxuICAgIGludGVyYWN0aW9uQ29uZmlnXG4gIH0pIHtcbiAgICBjb25zdCB7YnJ1c2h9ID0gaW50ZXJhY3Rpb25Db25maWc7XG5cbiAgICBjb25zdCBjb2xvclVwZGF0ZVRyaWdnZXJzID0ge1xuICAgICAgY29sb3I6IHRoaXMuY29uZmlnLmNvbG9yLFxuICAgICAgY29sb3JGaWVsZDogdGhpcy5jb25maWcuY29sb3JGaWVsZCxcbiAgICAgIGNvbG9yUmFuZ2U6IHRoaXMuY29uZmlnLnZpc0NvbmZpZy5jb2xvclJhbmdlLFxuICAgICAgY29sb3JTY2FsZTogdGhpcy5jb25maWcuY29sb3JTY2FsZVxuICAgIH07XG5cbiAgICByZXR1cm4gW1xuICAgICAgLy8gYmFzZSBsYXllclxuICAgICAgbmV3IERlY2tHTExpbmVMYXllcih7XG4gICAgICAgIC4uLmxheWVySW50ZXJhY3Rpb24sXG4gICAgICAgIC4uLmRhdGEsXG4gICAgICAgIGdldENvbG9yOiBkYXRhLmdldFNvdXJjZUNvbG9yLFxuICAgICAgICBpZDogdGhpcy5pZCxcbiAgICAgICAgaWR4LFxuICAgICAgICBicnVzaFJhZGl1czogYnJ1c2guY29uZmlnLnNpemUgKiAxMDAwLFxuICAgICAgICBicnVzaFNvdXJjZTogdHJ1ZSxcbiAgICAgICAgYnJ1c2hUYXJnZXQ6IHRydWUsXG4gICAgICAgIGVuYWJsZUJydXNoaW5nOiBicnVzaC5lbmFibGVkLFxuICAgICAgICBmcDY0OiB0aGlzLmNvbmZpZy52aXNDb25maWdbJ2hpLXByZWNpc2lvbiddLFxuICAgICAgICBvcGFjaXR5OiB0aGlzLmNvbmZpZy52aXNDb25maWcub3BhY2l0eSxcbiAgICAgICAgcGlja2FibGU6IHRydWUsXG4gICAgICAgIHBpY2tlZENvbG9yOiB0aGlzLmNvbmZpZy5oaWdobGlnaHRDb2xvcixcbiAgICAgICAgc3Ryb2tlU2NhbGU6IHRoaXMuY29uZmlnLnZpc0NvbmZpZy50aGlja25lc3MsXG4gICAgICAgIHVwZGF0ZVRyaWdnZXJzOiB7XG4gICAgICAgICAgZ2V0U3Ryb2tlV2lkdGg6IHtcbiAgICAgICAgICAgIHNpemVGaWVsZDogdGhpcy5jb25maWcuc2l6ZUZpZWxkLFxuICAgICAgICAgICAgc2l6ZVJhbmdlOiB0aGlzLmNvbmZpZy52aXNDb25maWcuc2l6ZVJhbmdlXG4gICAgICAgICAgfSxcbiAgICAgICAgICBnZXRDb2xvcjogY29sb3JVcGRhdGVUcmlnZ2Vyc1xuICAgICAgICB9XG4gICAgICB9KVxuICAgIF07XG4gIH1cbn1cbiJdfQ==