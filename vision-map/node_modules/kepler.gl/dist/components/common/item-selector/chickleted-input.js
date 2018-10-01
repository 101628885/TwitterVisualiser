'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _taggedTemplateLiteral2 = require('babel-runtime/helpers/taggedTemplateLiteral');

var _taggedTemplateLiteral3 = _interopRequireDefault(_taggedTemplateLiteral2);

var _templateObject = (0, _taggedTemplateLiteral3.default)(['\n  background: ', ';\n  border-radius: 1px;\n  color: ', ';\n  font-size: 11px;\n  line-height: 20px;\n  margin: 3px 10px 3px 3px;\n  padding: 4px 6px;\n  display: flex;\n  align-items: center;\n  max-width: calc(100% - 8px);\n\n  :hover {\n    color: ', ';\n  }\n'], ['\n  background: ', ';\n  border-radius: 1px;\n  color: ', ';\n  font-size: 11px;\n  line-height: 20px;\n  margin: 3px 10px 3px 3px;\n  padding: 4px 6px;\n  display: flex;\n  align-items: center;\n  max-width: calc(100% - 8px);\n\n  :hover {\n    color: ', ';\n  }\n']),
    _templateObject2 = (0, _taggedTemplateLiteral3.default)(['\n  margin-right: 10px;\n  text-overflow: ellipsis;\n  width: 100%;\n  overflow: hidden;\n\n  :hover {\n    overflow: visible;\n  }\n'], ['\n  margin-right: 10px;\n  text-overflow: ellipsis;\n  width: 100%;\n  overflow: hidden;\n\n  :hover {\n    overflow: visible;\n  }\n']),
    _templateObject3 = (0, _taggedTemplateLiteral3.default)(['\n  ', '\n'], ['\n  ', '\n']); // Copyright (c) 2018 Uber Technologies, Inc.
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

var _delete = require('../icons/delete');

var _delete2 = _interopRequireDefault(_delete);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var propTypes = {
  // required properties
  onClick: _propTypes2.default.func.isRequired,
  removeItem: _propTypes2.default.func.isRequired,

  // optional properties
  selectedItems: _propTypes2.default.arrayOf(_propTypes2.default.any),
  disabled: _propTypes2.default.bool,
  displayOption: _propTypes2.default.func,
  focus: _propTypes2.default.bool,
  error: _propTypes2.default.bool,
  placeholder: _propTypes2.default.string
};

var ChickletButton = _styledComponents2.default.div(_templateObject, function (props) {
  return props.theme.panelActiveBg;
}, function (props) {
  return props.theme.textColor;
}, function (props) {
  return props.theme.textColorHl;
});

var ChickletTag = _styledComponents2.default.span(_templateObject2);

var Chicklet = function Chicklet(_ref) {
  var disabled = _ref.disabled,
      name = _ref.name,
      remove = _ref.remove;
  return _react2.default.createElement(
    ChickletButton,
    null,
    _react2.default.createElement(
      ChickletTag,
      null,
      name
    ),
    _react2.default.createElement(_delete2.default, { height: '10px', onClick: disabled ? null : remove })
  );
};

var ChickletedInputContainer = _styledComponents2.default.div(_templateObject3, function (props) {
  return props.theme.chickletedInput;
});

var ChickletedInput = function ChickletedInput(_ref2) {
  var focus = _ref2.focus,
      disabled = _ref2.disabled,
      error = _ref2.error,
      onClick = _ref2.onClick,
      className = _ref2.className,
      _ref2$selectedItems = _ref2.selectedItems,
      selectedItems = _ref2$selectedItems === undefined ? [] : _ref2$selectedItems,
      _ref2$placeholder = _ref2.placeholder,
      placeholder = _ref2$placeholder === undefined ? '' : _ref2$placeholder,
      removeItem = _ref2.removeItem,
      _ref2$displayOption = _ref2.displayOption,
      displayOption = _ref2$displayOption === undefined ? function (d) {
    return d;
  } : _ref2$displayOption;
  return _react2.default.createElement(
    ChickletedInputContainer,
    {
      className: className + ' chickleted-input',
      focus: focus,
      disabled: disabled,
      error: error,
      onClick: onClick
    },
    selectedItems.length > 0 ? selectedItems.map(function (item, i) {
      return _react2.default.createElement(Chicklet, {
        disabled: disabled,
        key: displayOption(item) + '_' + i,
        name: displayOption(item),
        remove: function remove(e) {
          return removeItem(item, e);
        }
      });
    }) : placeholder
  );
};

ChickletedInput.propTypes = propTypes;

exports.default = ChickletedInput;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2NvbW1vbi9pdGVtLXNlbGVjdG9yL2NoaWNrbGV0ZWQtaW5wdXQuanMiXSwibmFtZXMiOlsicHJvcFR5cGVzIiwib25DbGljayIsIlByb3BUeXBlcyIsImZ1bmMiLCJpc1JlcXVpcmVkIiwicmVtb3ZlSXRlbSIsInNlbGVjdGVkSXRlbXMiLCJhcnJheU9mIiwiYW55IiwiZGlzYWJsZWQiLCJib29sIiwiZGlzcGxheU9wdGlvbiIsImZvY3VzIiwiZXJyb3IiLCJwbGFjZWhvbGRlciIsInN0cmluZyIsIkNoaWNrbGV0QnV0dG9uIiwic3R5bGVkIiwiZGl2IiwicHJvcHMiLCJ0aGVtZSIsInBhbmVsQWN0aXZlQmciLCJ0ZXh0Q29sb3IiLCJ0ZXh0Q29sb3JIbCIsIkNoaWNrbGV0VGFnIiwic3BhbiIsIkNoaWNrbGV0IiwibmFtZSIsInJlbW92ZSIsIkNoaWNrbGV0ZWRJbnB1dENvbnRhaW5lciIsImNoaWNrbGV0ZWRJbnB1dCIsIkNoaWNrbGV0ZWRJbnB1dCIsImNsYXNzTmFtZSIsImQiLCJsZW5ndGgiLCJtYXAiLCJpdGVtIiwiaSIsImUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs2RkFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7OztBQUNBOzs7O0FBRUE7Ozs7QUFDQTs7Ozs7O0FBRUEsSUFBTUEsWUFBWTtBQUNoQjtBQUNBQyxXQUFTQyxvQkFBVUMsSUFBVixDQUFlQyxVQUZSO0FBR2hCQyxjQUFZSCxvQkFBVUMsSUFBVixDQUFlQyxVQUhYOztBQUtoQjtBQUNBRSxpQkFBZUosb0JBQVVLLE9BQVYsQ0FBa0JMLG9CQUFVTSxHQUE1QixDQU5DO0FBT2hCQyxZQUFVUCxvQkFBVVEsSUFQSjtBQVFoQkMsaUJBQWVULG9CQUFVQyxJQVJUO0FBU2hCUyxTQUFPVixvQkFBVVEsSUFURDtBQVVoQkcsU0FBT1gsb0JBQVVRLElBVkQ7QUFXaEJJLGVBQWFaLG9CQUFVYTtBQVhQLENBQWxCOztBQWNBLElBQU1DLGlCQUFpQkMsMkJBQU9DLEdBQXhCLGtCQUNVO0FBQUEsU0FBU0MsTUFBTUMsS0FBTixDQUFZQyxhQUFyQjtBQUFBLENBRFYsRUFHSztBQUFBLFNBQVNGLE1BQU1DLEtBQU4sQ0FBWUUsU0FBckI7QUFBQSxDQUhMLEVBYU87QUFBQSxTQUFTSCxNQUFNQyxLQUFOLENBQVlHLFdBQXJCO0FBQUEsQ0FiUCxDQUFOOztBQWlCQSxJQUFNQyxjQUFjUCwyQkFBT1EsSUFBckIsa0JBQU47O0FBV0EsSUFBTUMsV0FBVyxTQUFYQSxRQUFXO0FBQUEsTUFBRWpCLFFBQUYsUUFBRUEsUUFBRjtBQUFBLE1BQVlrQixJQUFaLFFBQVlBLElBQVo7QUFBQSxNQUFrQkMsTUFBbEIsUUFBa0JBLE1BQWxCO0FBQUEsU0FDZjtBQUFDLGtCQUFEO0FBQUE7QUFDRTtBQUFDLGlCQUFEO0FBQUE7QUFBY0Q7QUFBZCxLQURGO0FBRUUsa0NBQUMsZ0JBQUQsSUFBUSxRQUFPLE1BQWYsRUFBc0IsU0FBU2xCLFdBQVcsSUFBWCxHQUFrQm1CLE1BQWpEO0FBRkYsR0FEZTtBQUFBLENBQWpCOztBQU9BLElBQU1DLDJCQUEyQlosMkJBQU9DLEdBQWxDLG1CQUNGO0FBQUEsU0FBU0MsTUFBTUMsS0FBTixDQUFZVSxlQUFyQjtBQUFBLENBREUsQ0FBTjs7QUFJQSxJQUFNQyxrQkFBa0IsU0FBbEJBLGVBQWtCO0FBQUEsTUFDdEJuQixLQURzQixTQUN0QkEsS0FEc0I7QUFBQSxNQUV0QkgsUUFGc0IsU0FFdEJBLFFBRnNCO0FBQUEsTUFHdEJJLEtBSHNCLFNBR3RCQSxLQUhzQjtBQUFBLE1BSXRCWixPQUpzQixTQUl0QkEsT0FKc0I7QUFBQSxNQUt0QitCLFNBTHNCLFNBS3RCQSxTQUxzQjtBQUFBLGtDQU10QjFCLGFBTnNCO0FBQUEsTUFNdEJBLGFBTnNCLHVDQU1OLEVBTk07QUFBQSxnQ0FPdEJRLFdBUHNCO0FBQUEsTUFPdEJBLFdBUHNCLHFDQU9SLEVBUFE7QUFBQSxNQVF0QlQsVUFSc0IsU0FRdEJBLFVBUnNCO0FBQUEsa0NBU3RCTSxhQVRzQjtBQUFBLE1BU3RCQSxhQVRzQix1Q0FTTjtBQUFBLFdBQUtzQixDQUFMO0FBQUEsR0FUTTtBQUFBLFNBV3RCO0FBQUMsNEJBQUQ7QUFBQTtBQUNFLGlCQUFjRCxTQUFkLHNCQURGO0FBRUUsYUFBT3BCLEtBRlQ7QUFHRSxnQkFBVUgsUUFIWjtBQUlFLGFBQU9JLEtBSlQ7QUFLRSxlQUFTWjtBQUxYO0FBT0dLLGtCQUFjNEIsTUFBZCxHQUF1QixDQUF2QixHQUNHNUIsY0FBYzZCLEdBQWQsQ0FBa0IsVUFBQ0MsSUFBRCxFQUFPQyxDQUFQO0FBQUEsYUFDaEIsOEJBQUMsUUFBRDtBQUNFLGtCQUFVNUIsUUFEWjtBQUVFLGFBQVFFLGNBQWN5QixJQUFkLENBQVIsU0FBK0JDLENBRmpDO0FBR0UsY0FBTTFCLGNBQWN5QixJQUFkLENBSFI7QUFJRSxnQkFBUTtBQUFBLGlCQUFLL0IsV0FBVytCLElBQVgsRUFBaUJFLENBQWpCLENBQUw7QUFBQTtBQUpWLFFBRGdCO0FBQUEsS0FBbEIsQ0FESCxHQVNHeEI7QUFoQk4sR0FYc0I7QUFBQSxDQUF4Qjs7QUErQkFpQixnQkFBZ0IvQixTQUFoQixHQUE0QkEsU0FBNUI7O2tCQUVlK0IsZSIsImZpbGUiOiJjaGlja2xldGVkLWlucHV0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSAyMDE4IFViZXIgVGVjaG5vbG9naWVzLCBJbmMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuLy8gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuLy8gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuLy8gdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuLy8gY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4vLyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4vLyBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4vLyBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbi8vIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuLy8gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuLy8gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbi8vIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbi8vIFRIRSBTT0ZUV0FSRS5cblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5cbmltcG9ydCBzdHlsZWQgZnJvbSAnc3R5bGVkLWNvbXBvbmVudHMnO1xuaW1wb3J0IERlbGV0ZSBmcm9tICcuLi9pY29ucy9kZWxldGUnO1xuXG5jb25zdCBwcm9wVHlwZXMgPSB7XG4gIC8vIHJlcXVpcmVkIHByb3BlcnRpZXNcbiAgb25DbGljazogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgcmVtb3ZlSXRlbTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcblxuICAvLyBvcHRpb25hbCBwcm9wZXJ0aWVzXG4gIHNlbGVjdGVkSXRlbXM6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5hbnkpLFxuICBkaXNhYmxlZDogUHJvcFR5cGVzLmJvb2wsXG4gIGRpc3BsYXlPcHRpb246IFByb3BUeXBlcy5mdW5jLFxuICBmb2N1czogUHJvcFR5cGVzLmJvb2wsXG4gIGVycm9yOiBQcm9wVHlwZXMuYm9vbCxcbiAgcGxhY2Vob2xkZXI6IFByb3BUeXBlcy5zdHJpbmdcbn07XG5cbmNvbnN0IENoaWNrbGV0QnV0dG9uID0gc3R5bGVkLmRpdmBcbiAgYmFja2dyb3VuZDogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5wYW5lbEFjdGl2ZUJnfTtcbiAgYm9yZGVyLXJhZGl1czogMXB4O1xuICBjb2xvcjogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS50ZXh0Q29sb3J9O1xuICBmb250LXNpemU6IDExcHg7XG4gIGxpbmUtaGVpZ2h0OiAyMHB4O1xuICBtYXJnaW46IDNweCAxMHB4IDNweCAzcHg7XG4gIHBhZGRpbmc6IDRweCA2cHg7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIG1heC13aWR0aDogY2FsYygxMDAlIC0gOHB4KTtcblxuICA6aG92ZXIge1xuICAgIGNvbG9yOiAke3Byb3BzID0+IHByb3BzLnRoZW1lLnRleHRDb2xvckhsfTtcbiAgfVxuYDtcblxuY29uc3QgQ2hpY2tsZXRUYWcgPSBzdHlsZWQuc3BhbmBcbiAgbWFyZ2luLXJpZ2h0OiAxMHB4O1xuICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcbiAgd2lkdGg6IDEwMCU7XG4gIG92ZXJmbG93OiBoaWRkZW47XG5cbiAgOmhvdmVyIHtcbiAgICBvdmVyZmxvdzogdmlzaWJsZTtcbiAgfVxuYDtcblxuY29uc3QgQ2hpY2tsZXQgPSAoe2Rpc2FibGVkLCBuYW1lLCByZW1vdmV9KSA9PiAoXG4gIDxDaGlja2xldEJ1dHRvbj5cbiAgICA8Q2hpY2tsZXRUYWc+e25hbWV9PC9DaGlja2xldFRhZz5cbiAgICA8RGVsZXRlIGhlaWdodD1cIjEwcHhcIiBvbkNsaWNrPXtkaXNhYmxlZCA/IG51bGwgOiByZW1vdmV9IC8+XG4gIDwvQ2hpY2tsZXRCdXR0b24+XG4pO1xuXG5jb25zdCBDaGlja2xldGVkSW5wdXRDb250YWluZXIgPSBzdHlsZWQuZGl2YFxuICAke3Byb3BzID0+IHByb3BzLnRoZW1lLmNoaWNrbGV0ZWRJbnB1dH1cbmA7XG5cbmNvbnN0IENoaWNrbGV0ZWRJbnB1dCA9ICh7XG4gIGZvY3VzLFxuICBkaXNhYmxlZCxcbiAgZXJyb3IsXG4gIG9uQ2xpY2ssXG4gIGNsYXNzTmFtZSxcbiAgc2VsZWN0ZWRJdGVtcyA9IFtdLFxuICBwbGFjZWhvbGRlciA9ICcnLFxuICByZW1vdmVJdGVtLFxuICBkaXNwbGF5T3B0aW9uID0gZCA9PiBkXG59KSA9PiAoXG4gIDxDaGlja2xldGVkSW5wdXRDb250YWluZXJcbiAgICBjbGFzc05hbWU9e2Ake2NsYXNzTmFtZX0gY2hpY2tsZXRlZC1pbnB1dGB9XG4gICAgZm9jdXM9e2ZvY3VzfVxuICAgIGRpc2FibGVkPXtkaXNhYmxlZH1cbiAgICBlcnJvcj17ZXJyb3J9XG4gICAgb25DbGljaz17b25DbGlja31cbiAgPlxuICAgIHtzZWxlY3RlZEl0ZW1zLmxlbmd0aCA+IDBcbiAgICAgID8gc2VsZWN0ZWRJdGVtcy5tYXAoKGl0ZW0sIGkpID0+IChcbiAgICAgICAgICA8Q2hpY2tsZXRcbiAgICAgICAgICAgIGRpc2FibGVkPXtkaXNhYmxlZH1cbiAgICAgICAgICAgIGtleT17YCR7ZGlzcGxheU9wdGlvbihpdGVtKX1fJHtpfWB9XG4gICAgICAgICAgICBuYW1lPXtkaXNwbGF5T3B0aW9uKGl0ZW0pfVxuICAgICAgICAgICAgcmVtb3ZlPXtlID0+IHJlbW92ZUl0ZW0oaXRlbSwgZSl9XG4gICAgICAgICAgLz5cbiAgICAgICAgKSlcbiAgICAgIDogcGxhY2Vob2xkZXJ9XG4gIDwvQ2hpY2tsZXRlZElucHV0Q29udGFpbmVyPlxuKTtcblxuQ2hpY2tsZXRlZElucHV0LnByb3BUeXBlcyA9IHByb3BUeXBlcztcblxuZXhwb3J0IGRlZmF1bHQgQ2hpY2tsZXRlZElucHV0O1xuIl19