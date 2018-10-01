'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _taggedTemplateLiteral2 = require('babel-runtime/helpers/taggedTemplateLiteral');

var _taggedTemplateLiteral3 = _interopRequireDefault(_taggedTemplateLiteral2);

var _templateObject = (0, _taggedTemplateLiteral3.default)(['\n  padding: 12px;\n\n  .map-layer-selector__item {\n    margin: 12px 0;\n  }\n'], ['\n  padding: 12px;\n\n  .map-layer-selector__item {\n    margin: 12px 0;\n  }\n']); // Copyright (c) 2018 Uber Technologies, Inc.
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

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _switch = require('./switch');

var _switch2 = _interopRequireDefault(_switch);

var _utils = require('../../utils/utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var propTypes = {
  // Required
  layers: _propTypes2.default.array.isRequired,
  onMapToggleLayer: _propTypes2.default.func.isRequired
};

var MapLayerSelect = _styledComponents2.default.div(_templateObject);

var MapLayerSelector = function MapLayerSelector(_ref) {
  var layers = _ref.layers,
      onMapToggleLayer = _ref.onMapToggleLayer;
  return _react2.default.createElement(
    MapLayerSelect,
    { className: 'map-layer-selector' },
    layers.map(function (layer, index) {
      return _react2.default.createElement(
        'div',
        { key: layer.id, className: 'map-layer-selector__item' },
        _react2.default.createElement(_switch2.default, {
          checked: layer.isVisible,
          id: layer.id + '-toggle-' + (0, _utils.generateHashId)(4),
          label: layer.name,
          onChange: function onChange(e) {
            e.preventDefault();
            onMapToggleLayer(layer.id);
          }
        })
      );
    })
  );
};

MapLayerSelector.propTypes = propTypes;

exports.default = MapLayerSelector;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2NvbW1vbi9tYXAtbGF5ZXItc2VsZWN0b3IuanMiXSwibmFtZXMiOlsicHJvcFR5cGVzIiwibGF5ZXJzIiwiUHJvcFR5cGVzIiwiYXJyYXkiLCJpc1JlcXVpcmVkIiwib25NYXBUb2dnbGVMYXllciIsImZ1bmMiLCJNYXBMYXllclNlbGVjdCIsInN0eWxlZCIsImRpdiIsIk1hcExheWVyU2VsZWN0b3IiLCJtYXAiLCJsYXllciIsImluZGV4IiwiaWQiLCJpc1Zpc2libGUiLCJuYW1lIiwiZSIsInByZXZlbnREZWZhdWx0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O3NPQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFFQSxJQUFNQSxZQUFZO0FBQ2hCO0FBQ0FDLFVBQVFDLG9CQUFVQyxLQUFWLENBQWdCQyxVQUZSO0FBR2hCQyxvQkFBa0JILG9CQUFVSSxJQUFWLENBQWVGO0FBSGpCLENBQWxCOztBQU1BLElBQU1HLGlCQUFpQkMsMkJBQU9DLEdBQXhCLGlCQUFOOztBQVFBLElBQU1DLG1CQUFtQixTQUFuQkEsZ0JBQW1CO0FBQUEsTUFBRVQsTUFBRixRQUFFQSxNQUFGO0FBQUEsTUFBVUksZ0JBQVYsUUFBVUEsZ0JBQVY7QUFBQSxTQUN2QjtBQUFDLGtCQUFEO0FBQUEsTUFBZ0IsV0FBVSxvQkFBMUI7QUFDR0osV0FBT1UsR0FBUCxDQUFXLFVBQUNDLEtBQUQsRUFBUUMsS0FBUjtBQUFBLGFBQ1Y7QUFBQTtBQUFBLFVBQUssS0FBS0QsTUFBTUUsRUFBaEIsRUFBb0IsV0FBVSwwQkFBOUI7QUFDRSxzQ0FBQyxnQkFBRDtBQUNFLG1CQUFTRixNQUFNRyxTQURqQjtBQUVFLGNBQU9ILE1BQU1FLEVBQWIsZ0JBQTBCLDJCQUFlLENBQWYsQ0FGNUI7QUFHRSxpQkFBT0YsTUFBTUksSUFIZjtBQUlFLG9CQUFVLHFCQUFLO0FBQ2JDLGNBQUVDLGNBQUY7QUFDQWIsNkJBQWlCTyxNQUFNRSxFQUF2QjtBQUNEO0FBUEg7QUFERixPQURVO0FBQUEsS0FBWDtBQURILEdBRHVCO0FBQUEsQ0FBekI7O0FBa0JBSixpQkFBaUJWLFNBQWpCLEdBQTZCQSxTQUE3Qjs7a0JBRWVVLGdCIiwiZmlsZSI6Im1hcC1sYXllci1zZWxlY3Rvci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgMjAxOCBVYmVyIFRlY2hub2xvZ2llcywgSW5jLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbi8vIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbi8vIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbi8vIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbi8vIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuLy8gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuLy8gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4vLyBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbi8vIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbi8vIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4vLyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4vLyBUSEUgU09GVFdBUkUuXG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHN0eWxlZCBmcm9tICdzdHlsZWQtY29tcG9uZW50cyc7XG5pbXBvcnQgU3dpdGNoIGZyb20gJ2NvbXBvbmVudHMvY29tbW9uL3N3aXRjaCc7XG5pbXBvcnQge2dlbmVyYXRlSGFzaElkfSBmcm9tICcuLi8uLi91dGlscy91dGlscyc7XG5cbmNvbnN0IHByb3BUeXBlcyA9IHtcbiAgLy8gUmVxdWlyZWRcbiAgbGF5ZXJzOiBQcm9wVHlwZXMuYXJyYXkuaXNSZXF1aXJlZCxcbiAgb25NYXBUb2dnbGVMYXllcjogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZFxufTtcblxuY29uc3QgTWFwTGF5ZXJTZWxlY3QgPSBzdHlsZWQuZGl2YFxuICBwYWRkaW5nOiAxMnB4O1xuXG4gIC5tYXAtbGF5ZXItc2VsZWN0b3JfX2l0ZW0ge1xuICAgIG1hcmdpbjogMTJweCAwO1xuICB9XG5gO1xuXG5jb25zdCBNYXBMYXllclNlbGVjdG9yID0gKHtsYXllcnMsIG9uTWFwVG9nZ2xlTGF5ZXJ9KSA9PiAoXG4gIDxNYXBMYXllclNlbGVjdCBjbGFzc05hbWU9XCJtYXAtbGF5ZXItc2VsZWN0b3JcIj5cbiAgICB7bGF5ZXJzLm1hcCgobGF5ZXIsIGluZGV4KSA9PiAoXG4gICAgICA8ZGl2IGtleT17bGF5ZXIuaWR9IGNsYXNzTmFtZT1cIm1hcC1sYXllci1zZWxlY3Rvcl9faXRlbVwiPlxuICAgICAgICA8U3dpdGNoXG4gICAgICAgICAgY2hlY2tlZD17bGF5ZXIuaXNWaXNpYmxlfVxuICAgICAgICAgIGlkPXtgJHtsYXllci5pZH0tdG9nZ2xlLSR7Z2VuZXJhdGVIYXNoSWQoNCl9YH1cbiAgICAgICAgICBsYWJlbD17bGF5ZXIubmFtZX1cbiAgICAgICAgICBvbkNoYW5nZT17ZSA9PiB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBvbk1hcFRvZ2dsZUxheWVyKGxheWVyLmlkKTtcbiAgICAgICAgICB9fVxuICAgICAgICAvPlxuICAgICAgPC9kaXY+XG4gICAgKSl9XG4gIDwvTWFwTGF5ZXJTZWxlY3Q+XG4pO1xuXG5NYXBMYXllclNlbGVjdG9yLnByb3BUeXBlcyA9IHByb3BUeXBlcztcblxuZXhwb3J0IGRlZmF1bHQgTWFwTGF5ZXJTZWxlY3RvcjtcbiJdfQ==