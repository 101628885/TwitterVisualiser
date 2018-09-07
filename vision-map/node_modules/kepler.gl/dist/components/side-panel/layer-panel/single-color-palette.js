'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _taggedTemplateLiteral2 = require('babel-runtime/helpers/taggedTemplateLiteral');

var _taggedTemplateLiteral3 = _interopRequireDefault(_taggedTemplateLiteral2);

var _templateObject = (0, _taggedTemplateLiteral3.default)(['\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n  padding: 12px;\n\n  :hover {\n    cursor: pointer;\n  }\n'], ['\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n  padding: 12px;\n\n  :hover {\n    cursor: pointer;\n  }\n']),
    _templateObject2 = (0, _taggedTemplateLiteral3.default)(['\n  display: flex;\n  flex-grow: 1;\n  flex-direction: column;\n  justify-content: space-between;\n'], ['\n  display: flex;\n  flex-grow: 1;\n  flex-direction: column;\n  justify-content: space-between;\n']),
    _templateObject3 = (0, _taggedTemplateLiteral3.default)(['\n  flex-grow: 1;\n  height: ', ';\n  border-width: 1px;\n  border-style: solid;\n'], ['\n  flex-grow: 1;\n  height: ', ';\n  border-width: 1px;\n  border-style: solid;\n']); // Copyright (c) 2018 Uber Technologies, Inc.
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

var _d3Array = require('d3-array');

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _colorUtils = require('../../../utils/color-utils');

var _colorPalette = require('../../../constants/color-palette');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var propTypes = {
  onSelectColor: _propTypes2.default.func.isRequired,
  // hex value
  selectedColor: _propTypes2.default.string.isRequired
};

var PALETTE_HEIGHT = '8px';
var ROWS = 16;

var StyledColorPalette = _styledComponents2.default.div(_templateObject);

var StyledColorColumn = _styledComponents2.default.div(_templateObject2);

var StyledColorBlock = _styledComponents2.default.div(_templateObject3, PALETTE_HEIGHT);

var SingleColorPalette = function SingleColorPalette(_ref) {
  var selectedColor = _ref.selectedColor,
      onSelectColor = _ref.onSelectColor;
  return _react2.default.createElement(
    StyledColorPalette,
    { className: 'single-color-palette' },
    _colorPalette.Themes.map(function (theme, col) {
      return _react2.default.createElement(
        StyledColorColumn,
        { key: theme },
        (0, _d3Array.range)(1, ROWS + 1, 1).map(function (key, i) {
          return _react2.default.createElement(StyledColorBlock, {
            style: {
              backgroundColor: _colorPalette.ColorsByTheme[theme][String(key)],
              borderColor: selectedColor === _colorPalette.ColorsByTheme[theme][String(key)].toUpperCase() ? 'white' : _colorPalette.ColorsByTheme[theme][String(key)]
            },
            key: theme + '_' + key,
            selected: selectedColor === _colorPalette.ColorsByTheme[theme][String(key)].toUpperCase(),
            onClick: function onClick(e) {
              return onSelectColor((0, _colorUtils.hexToRgb)(_colorPalette.ColorsByTheme[theme][String(key)]), e);
            }
          });
        })
      );
    })
  );
};

SingleColorPalette.propTypes = propTypes;

exports.default = SingleColorPalette;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3NpZGUtcGFuZWwvbGF5ZXItcGFuZWwvc2luZ2xlLWNvbG9yLXBhbGV0dGUuanMiXSwibmFtZXMiOlsicHJvcFR5cGVzIiwib25TZWxlY3RDb2xvciIsIlByb3BUeXBlcyIsImZ1bmMiLCJpc1JlcXVpcmVkIiwic2VsZWN0ZWRDb2xvciIsInN0cmluZyIsIlBBTEVUVEVfSEVJR0hUIiwiUk9XUyIsIlN0eWxlZENvbG9yUGFsZXR0ZSIsInN0eWxlZCIsImRpdiIsIlN0eWxlZENvbG9yQ29sdW1uIiwiU3R5bGVkQ29sb3JCbG9jayIsIlNpbmdsZUNvbG9yUGFsZXR0ZSIsIlRoZW1lcyIsIm1hcCIsInRoZW1lIiwiY29sIiwia2V5IiwiaSIsImJhY2tncm91bmRDb2xvciIsIkNvbG9yc0J5VGhlbWUiLCJTdHJpbmciLCJib3JkZXJDb2xvciIsInRvVXBwZXJDYXNlIiwiZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OzZPQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7OztBQUNBOztBQUVBOzs7O0FBRUEsSUFBTUEsWUFBWTtBQUNoQkMsaUJBQWVDLG9CQUFVQyxJQUFWLENBQWVDLFVBRGQ7QUFFaEI7QUFDQUMsaUJBQWVILG9CQUFVSSxNQUFWLENBQWlCRjtBQUhoQixDQUFsQjs7QUFNQSxJQUFNRyxpQkFBaUIsS0FBdkI7QUFDQSxJQUFNQyxPQUFPLEVBQWI7O0FBRUEsSUFBTUMscUJBQXFCQywyQkFBT0MsR0FBNUIsaUJBQU47O0FBV0EsSUFBTUMsb0JBQW9CRiwyQkFBT0MsR0FBM0Isa0JBQU47O0FBT0EsSUFBTUUsbUJBQW1CSCwyQkFBT0MsR0FBMUIsbUJBRU1KLGNBRk4sQ0FBTjs7QUFPQSxJQUFNTyxxQkFBcUIsU0FBckJBLGtCQUFxQjtBQUFBLE1BQUVULGFBQUYsUUFBRUEsYUFBRjtBQUFBLE1BQWlCSixhQUFqQixRQUFpQkEsYUFBakI7QUFBQSxTQUN6QjtBQUFDLHNCQUFEO0FBQUEsTUFBb0IsV0FBVSxzQkFBOUI7QUFDR2MseUJBQU9DLEdBQVAsQ0FBVyxVQUFDQyxLQUFELEVBQVFDLEdBQVI7QUFBQSxhQUNWO0FBQUMseUJBQUQ7QUFBQSxVQUFtQixLQUFLRCxLQUF4QjtBQUNHLDRCQUFNLENBQU4sRUFBU1QsT0FBTyxDQUFoQixFQUFtQixDQUFuQixFQUFzQlEsR0FBdEIsQ0FBMEIsVUFBQ0csR0FBRCxFQUFNQyxDQUFOO0FBQUEsaUJBQ3pCLDhCQUFDLGdCQUFEO0FBQ0UsbUJBQU87QUFDTEMsK0JBQWlCQyw0QkFBY0wsS0FBZCxFQUFxQk0sT0FBT0osR0FBUCxDQUFyQixDQURaO0FBRUxLLDJCQUNFbkIsa0JBQ0FpQiw0QkFBY0wsS0FBZCxFQUFxQk0sT0FBT0osR0FBUCxDQUFyQixFQUFrQ00sV0FBbEMsRUFEQSxHQUVJLE9BRkosR0FHSUgsNEJBQWNMLEtBQWQsRUFBcUJNLE9BQU9KLEdBQVAsQ0FBckI7QUFORCxhQURUO0FBU0UsaUJBQVFGLEtBQVIsU0FBaUJFLEdBVG5CO0FBVUUsc0JBQ0VkLGtCQUFrQmlCLDRCQUFjTCxLQUFkLEVBQXFCTSxPQUFPSixHQUFQLENBQXJCLEVBQWtDTSxXQUFsQyxFQVh0QjtBQWFFLHFCQUFTO0FBQUEscUJBQ1B4QixjQUFjLDBCQUFTcUIsNEJBQWNMLEtBQWQsRUFBcUJNLE9BQU9KLEdBQVAsQ0FBckIsQ0FBVCxDQUFkLEVBQTJETyxDQUEzRCxDQURPO0FBQUE7QUFiWCxZQUR5QjtBQUFBLFNBQTFCO0FBREgsT0FEVTtBQUFBLEtBQVg7QUFESCxHQUR5QjtBQUFBLENBQTNCOztBQTRCQVosbUJBQW1CZCxTQUFuQixHQUErQkEsU0FBL0I7O2tCQUVlYyxrQiIsImZpbGUiOiJzaW5nbGUtY29sb3ItcGFsZXR0ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgMjAxOCBVYmVyIFRlY2hub2xvZ2llcywgSW5jLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbi8vIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbi8vIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbi8vIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbi8vIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuLy8gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuLy8gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4vLyBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbi8vIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbi8vIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4vLyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4vLyBUSEUgU09GVFdBUkUuXG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHtyYW5nZX0gZnJvbSAnZDMtYXJyYXknO1xuaW1wb3J0IHN0eWxlZCBmcm9tICdzdHlsZWQtY29tcG9uZW50cyc7XG5pbXBvcnQge2hleFRvUmdifSBmcm9tICd1dGlscy9jb2xvci11dGlscyc7XG5cbmltcG9ydCB7Q29sb3JzQnlUaGVtZSwgVGhlbWVzfSBmcm9tICdjb25zdGFudHMvY29sb3ItcGFsZXR0ZSc7XG5cbmNvbnN0IHByb3BUeXBlcyA9IHtcbiAgb25TZWxlY3RDb2xvcjogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgLy8gaGV4IHZhbHVlXG4gIHNlbGVjdGVkQ29sb3I6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZFxufTtcblxuY29uc3QgUEFMRVRURV9IRUlHSFQgPSAnOHB4JztcbmNvbnN0IFJPV1MgPSAxNjtcblxuY29uc3QgU3R5bGVkQ29sb3JQYWxldHRlID0gc3R5bGVkLmRpdmBcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IHJvdztcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICBwYWRkaW5nOiAxMnB4O1xuXG4gIDpob3ZlciB7XG4gICAgY3Vyc29yOiBwb2ludGVyO1xuICB9XG5gO1xuXG5jb25zdCBTdHlsZWRDb2xvckNvbHVtbiA9IHN0eWxlZC5kaXZgXG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZ3JvdzogMTtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuYDtcblxuY29uc3QgU3R5bGVkQ29sb3JCbG9jayA9IHN0eWxlZC5kaXZgXG4gIGZsZXgtZ3JvdzogMTtcbiAgaGVpZ2h0OiAke1BBTEVUVEVfSEVJR0hUfTtcbiAgYm9yZGVyLXdpZHRoOiAxcHg7XG4gIGJvcmRlci1zdHlsZTogc29saWQ7XG5gO1xuXG5jb25zdCBTaW5nbGVDb2xvclBhbGV0dGUgPSAoe3NlbGVjdGVkQ29sb3IsIG9uU2VsZWN0Q29sb3J9KSA9PiAoXG4gIDxTdHlsZWRDb2xvclBhbGV0dGUgY2xhc3NOYW1lPVwic2luZ2xlLWNvbG9yLXBhbGV0dGVcIj5cbiAgICB7VGhlbWVzLm1hcCgodGhlbWUsIGNvbCkgPT4gKFxuICAgICAgPFN0eWxlZENvbG9yQ29sdW1uIGtleT17dGhlbWV9PlxuICAgICAgICB7cmFuZ2UoMSwgUk9XUyArIDEsIDEpLm1hcCgoa2V5LCBpKSA9PiAoXG4gICAgICAgICAgPFN0eWxlZENvbG9yQmxvY2tcbiAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogQ29sb3JzQnlUaGVtZVt0aGVtZV1bU3RyaW5nKGtleSldLFxuICAgICAgICAgICAgICBib3JkZXJDb2xvcjpcbiAgICAgICAgICAgICAgICBzZWxlY3RlZENvbG9yID09PVxuICAgICAgICAgICAgICAgIENvbG9yc0J5VGhlbWVbdGhlbWVdW1N0cmluZyhrZXkpXS50b1VwcGVyQ2FzZSgpXG4gICAgICAgICAgICAgICAgICA/ICd3aGl0ZSdcbiAgICAgICAgICAgICAgICAgIDogQ29sb3JzQnlUaGVtZVt0aGVtZV1bU3RyaW5nKGtleSldXG4gICAgICAgICAgICB9fVxuICAgICAgICAgICAga2V5PXtgJHt0aGVtZX1fJHtrZXl9YH1cbiAgICAgICAgICAgIHNlbGVjdGVkPXtcbiAgICAgICAgICAgICAgc2VsZWN0ZWRDb2xvciA9PT0gQ29sb3JzQnlUaGVtZVt0aGVtZV1bU3RyaW5nKGtleSldLnRvVXBwZXJDYXNlKClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG9uQ2xpY2s9e2UgPT5cbiAgICAgICAgICAgICAgb25TZWxlY3RDb2xvcihoZXhUb1JnYihDb2xvcnNCeVRoZW1lW3RoZW1lXVtTdHJpbmcoa2V5KV0pLCBlKVxuICAgICAgICAgICAgfVxuICAgICAgICAgIC8+XG4gICAgICAgICkpfVxuICAgICAgPC9TdHlsZWRDb2xvckNvbHVtbj5cbiAgICApKX1cbiAgPC9TdHlsZWRDb2xvclBhbGV0dGU+XG4pO1xuXG5TaW5nbGVDb2xvclBhbGV0dGUucHJvcFR5cGVzID0gcHJvcFR5cGVzO1xuXG5leHBvcnQgZGVmYXVsdCBTaW5nbGVDb2xvclBhbGV0dGU7XG4iXX0=