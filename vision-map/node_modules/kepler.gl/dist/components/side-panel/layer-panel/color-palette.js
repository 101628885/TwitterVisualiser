'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _taggedTemplateLiteral2 = require('babel-runtime/helpers/taggedTemplateLiteral');

var _taggedTemplateLiteral3 = _interopRequireDefault(_taggedTemplateLiteral2);

var _templateObject = (0, _taggedTemplateLiteral3.default)(['\n  border-radius: 2px;\n  display: flex;\n  flex-direction: row;\n  flex-grow: 1;\n  justify-content: space-between;\n  overflow: hidden;\n'], ['\n  border-radius: 2px;\n  display: flex;\n  flex-direction: row;\n  flex-grow: 1;\n  justify-content: space-between;\n  overflow: hidden;\n']),
    _templateObject2 = (0, _taggedTemplateLiteral3.default)(['\n  display: flex;\n  flex-grow: 1;\n  border-width: 1px;\n  border-style: solid;\n  border-color: ', ';\n  padding: 4px;\n  border-radius: 4px;\n'], ['\n  display: flex;\n  flex-grow: 1;\n  border-width: 1px;\n  border-style: solid;\n  border-color: ', ';\n  padding: 4px;\n  border-radius: 4px;\n']),
    _templateObject3 = (0, _taggedTemplateLiteral3.default)(['\n  flex-grow: 1;\n'], ['\n  flex-grow: 1;\n']); // Copyright (c) 2018 Uber Technologies, Inc.
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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var propTypes = {
  colors: _propTypes2.default.array.isRequired,
  height: _propTypes2.default.number,
  className: _propTypes2.default.string,
  isSelected: _propTypes2.default.bool,
  isReversed: _propTypes2.default.bool
};

var defaultProps = {
  height: 10,
  colors: [],
  className: '',
  isSelected: false,
  isReversed: false
};

var PaletteWrapper = _styledComponents2.default.div(_templateObject);

var PaletteContainer = _styledComponents2.default.div(_templateObject2, function (props) {
  return props.isSelected ? '#FFFFFF' : 'transparent';
});

var ColorBlock = _styledComponents2.default.div(_templateObject3);

var ColorPalette = function ColorPalette(_ref) {
  var colors = _ref.colors,
      height = _ref.height,
      className = _ref.className,
      isSelected = _ref.isSelected,
      isReversed = _ref.isReversed;
  return _react2.default.createElement(
    PaletteContainer,
    {
      className: 'color-range-palette ' + className,
      isSelected: isSelected
    },
    _react2.default.createElement(
      PaletteWrapper,
      { className: 'color-range-palette__inner',
        style: { height: height, transform: 'scale(' + (isReversed ? -1 : 1) + ', 1)' } },
      colors.map(function (color) {
        return _react2.default.createElement(ColorBlock, {
          className: 'color-range-palette__block',
          key: color,
          style: { backgroundColor: color }
        });
      })
    )
  );
};

ColorPalette.propTypes = propTypes;
ColorPalette.defaultProps = defaultProps;

exports.default = ColorPalette;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3NpZGUtcGFuZWwvbGF5ZXItcGFuZWwvY29sb3ItcGFsZXR0ZS5qcyJdLCJuYW1lcyI6WyJwcm9wVHlwZXMiLCJjb2xvcnMiLCJQcm9wVHlwZXMiLCJhcnJheSIsImlzUmVxdWlyZWQiLCJoZWlnaHQiLCJudW1iZXIiLCJjbGFzc05hbWUiLCJzdHJpbmciLCJpc1NlbGVjdGVkIiwiYm9vbCIsImlzUmV2ZXJzZWQiLCJkZWZhdWx0UHJvcHMiLCJQYWxldHRlV3JhcHBlciIsInN0eWxlZCIsImRpdiIsIlBhbGV0dGVDb250YWluZXIiLCJwcm9wcyIsIkNvbG9yQmxvY2siLCJDb2xvclBhbGV0dGUiLCJ0cmFuc2Zvcm0iLCJtYXAiLCJjb2xvciIsImJhY2tncm91bmRDb2xvciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OytHQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBRUEsSUFBTUEsWUFBWTtBQUNoQkMsVUFBUUMsb0JBQVVDLEtBQVYsQ0FBZ0JDLFVBRFI7QUFFaEJDLFVBQVFILG9CQUFVSSxNQUZGO0FBR2hCQyxhQUFXTCxvQkFBVU0sTUFITDtBQUloQkMsY0FBWVAsb0JBQVVRLElBSk47QUFLaEJDLGNBQVlULG9CQUFVUTtBQUxOLENBQWxCOztBQVFBLElBQU1FLGVBQWU7QUFDbkJQLFVBQVEsRUFEVztBQUVuQkosVUFBUSxFQUZXO0FBR25CTSxhQUFXLEVBSFE7QUFJbkJFLGNBQVksS0FKTztBQUtuQkUsY0FBWTtBQUxPLENBQXJCOztBQVFBLElBQU1FLGlCQUFpQkMsMkJBQU9DLEdBQXhCLGlCQUFOOztBQVNBLElBQU1DLG1CQUFtQkYsMkJBQU9DLEdBQTFCLG1CQUtZO0FBQUEsU0FBU0UsTUFBTVIsVUFBTixHQUFtQixTQUFuQixHQUErQixhQUF4QztBQUFBLENBTFosQ0FBTjs7QUFVQSxJQUFNUyxhQUFhSiwyQkFBT0MsR0FBcEIsa0JBQU47O0FBSUEsSUFBTUksZUFBZSxTQUFmQSxZQUFlO0FBQUEsTUFBRWxCLE1BQUYsUUFBRUEsTUFBRjtBQUFBLE1BQVVJLE1BQVYsUUFBVUEsTUFBVjtBQUFBLE1BQWtCRSxTQUFsQixRQUFrQkEsU0FBbEI7QUFBQSxNQUE2QkUsVUFBN0IsUUFBNkJBLFVBQTdCO0FBQUEsTUFBeUNFLFVBQXpDLFFBQXlDQSxVQUF6QztBQUFBLFNBQ25CO0FBQUMsb0JBQUQ7QUFBQTtBQUNFLDBDQUFrQ0osU0FEcEM7QUFFRSxrQkFBWUU7QUFGZDtBQUlFO0FBQUMsb0JBQUQ7QUFBQSxRQUFnQixXQUFVLDRCQUExQjtBQUNnQixlQUFPLEVBQUNKLGNBQUQsRUFBU2UsdUJBQW9CVCxhQUFhLENBQUMsQ0FBZCxHQUFrQixDQUF0QyxVQUFULEVBRHZCO0FBRUdWLGFBQU9vQixHQUFQLENBQVc7QUFBQSxlQUNWLDhCQUFDLFVBQUQ7QUFDRSxxQkFBVSw0QkFEWjtBQUVFLGVBQUtDLEtBRlA7QUFHRSxpQkFBTyxFQUFDQyxpQkFBaUJELEtBQWxCO0FBSFQsVUFEVTtBQUFBLE9BQVg7QUFGSDtBQUpGLEdBRG1CO0FBQUEsQ0FBckI7O0FBa0JBSCxhQUFhbkIsU0FBYixHQUF5QkEsU0FBekI7QUFDQW1CLGFBQWFQLFlBQWIsR0FBNEJBLFlBQTVCOztrQkFFZU8sWSIsImZpbGUiOiJjb2xvci1wYWxldHRlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSAyMDE4IFViZXIgVGVjaG5vbG9naWVzLCBJbmMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuLy8gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuLy8gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuLy8gdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuLy8gY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4vLyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4vLyBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4vLyBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbi8vIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuLy8gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuLy8gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbi8vIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbi8vIFRIRSBTT0ZUV0FSRS5cblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgc3R5bGVkIGZyb20gJ3N0eWxlZC1jb21wb25lbnRzJztcblxuY29uc3QgcHJvcFR5cGVzID0ge1xuICBjb2xvcnM6IFByb3BUeXBlcy5hcnJheS5pc1JlcXVpcmVkLFxuICBoZWlnaHQ6IFByb3BUeXBlcy5udW1iZXIsXG4gIGNsYXNzTmFtZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgaXNTZWxlY3RlZDogUHJvcFR5cGVzLmJvb2wsXG4gIGlzUmV2ZXJzZWQ6IFByb3BUeXBlcy5ib29sXG59O1xuXG5jb25zdCBkZWZhdWx0UHJvcHMgPSB7XG4gIGhlaWdodDogMTAsXG4gIGNvbG9yczogW10sXG4gIGNsYXNzTmFtZTogJycsXG4gIGlzU2VsZWN0ZWQ6IGZhbHNlLFxuICBpc1JldmVyc2VkOiBmYWxzZVxufTtcblxuY29uc3QgUGFsZXR0ZVdyYXBwZXIgPSBzdHlsZWQuZGl2YFxuICBib3JkZXItcmFkaXVzOiAycHg7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiByb3c7XG4gIGZsZXgtZ3JvdzogMTtcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICBvdmVyZmxvdzogaGlkZGVuO1xuYDtcblxuY29uc3QgUGFsZXR0ZUNvbnRhaW5lciA9IHN0eWxlZC5kaXZgXG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZ3JvdzogMTtcbiAgYm9yZGVyLXdpZHRoOiAxcHg7XG4gIGJvcmRlci1zdHlsZTogc29saWQ7XG4gIGJvcmRlci1jb2xvcjogJHtwcm9wcyA9PiBwcm9wcy5pc1NlbGVjdGVkID8gJyNGRkZGRkYnIDogJ3RyYW5zcGFyZW50J307XG4gIHBhZGRpbmc6IDRweDtcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xuYDtcblxuY29uc3QgQ29sb3JCbG9jayA9IHN0eWxlZC5kaXZgXG4gIGZsZXgtZ3JvdzogMTtcbmA7XG5cbmNvbnN0IENvbG9yUGFsZXR0ZSA9ICh7Y29sb3JzLCBoZWlnaHQsIGNsYXNzTmFtZSwgaXNTZWxlY3RlZCwgaXNSZXZlcnNlZH0pID0+IChcbiAgPFBhbGV0dGVDb250YWluZXJcbiAgICBjbGFzc05hbWU9e2Bjb2xvci1yYW5nZS1wYWxldHRlICR7Y2xhc3NOYW1lfWB9XG4gICAgaXNTZWxlY3RlZD17aXNTZWxlY3RlZH1cbiAgPlxuICAgIDxQYWxldHRlV3JhcHBlciBjbGFzc05hbWU9XCJjb2xvci1yYW5nZS1wYWxldHRlX19pbm5lclwiXG4gICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7aGVpZ2h0LCB0cmFuc2Zvcm06IGBzY2FsZSgke2lzUmV2ZXJzZWQgPyAtMSA6IDF9LCAxKWB9fT5cbiAgICAgIHtjb2xvcnMubWFwKGNvbG9yID0+IChcbiAgICAgICAgPENvbG9yQmxvY2tcbiAgICAgICAgICBjbGFzc05hbWU9XCJjb2xvci1yYW5nZS1wYWxldHRlX19ibG9ja1wiXG4gICAgICAgICAga2V5PXtjb2xvcn1cbiAgICAgICAgICBzdHlsZT17e2JhY2tncm91bmRDb2xvcjogY29sb3J9fVxuICAgICAgICAvPlxuICAgICAgKSl9XG4gICAgPC9QYWxldHRlV3JhcHBlcj5cbiAgPC9QYWxldHRlQ29udGFpbmVyPlxuKTtcblxuQ29sb3JQYWxldHRlLnByb3BUeXBlcyA9IHByb3BUeXBlcztcbkNvbG9yUGFsZXR0ZS5kZWZhdWx0UHJvcHMgPSBkZWZhdWx0UHJvcHM7XG5cbmV4cG9ydCBkZWZhdWx0IENvbG9yUGFsZXR0ZTtcbiJdfQ==