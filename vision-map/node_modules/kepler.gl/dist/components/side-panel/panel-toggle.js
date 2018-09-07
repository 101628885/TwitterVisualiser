'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _taggedTemplateLiteral2 = require('babel-runtime/helpers/taggedTemplateLiteral');

var _taggedTemplateLiteral3 = _interopRequireDefault(_taggedTemplateLiteral2);

var _templateObject = (0, _taggedTemplateLiteral3.default)(['\n  background-color: ', ';\n  padding: 0 16px;\n  display: flex;\n  min-height: 30px;\n'], ['\n  background-color: ', ';\n  padding: 0 16px;\n  display: flex;\n  min-height: 30px;\n']),
    _templateObject2 = (0, _taggedTemplateLiteral3.default)(['\n  align-items: flex-end;\n  border-bottom-style: solid;\n  border-bottom-width: 2px;\n  border-bottom-color: ', ';\n  color: ', ';\n  display: flex;\n  justify-content: center;\n  margin-right: 12px;\n  padding-bottom: 6px;\n  width: 30px;\n  \n  :hover {\n    cursor: pointer;\n    color: ', ';\n  }\n'], ['\n  align-items: flex-end;\n  border-bottom-style: solid;\n  border-bottom-width: 2px;\n  border-bottom-color: ', ';\n  color: ', ';\n  display: flex;\n  justify-content: center;\n  margin-right: 12px;\n  padding-bottom: 6px;\n  width: 30px;\n  \n  :hover {\n    cursor: pointer;\n    color: ', ';\n  }\n']); // Copyright (c) 2018 Uber Technologies, Inc.
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

var _styledComponents3 = require('../common/styled-components');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var propTypes = {
  panels: _propTypes2.default.array,
  activePanel: _propTypes2.default.string,
  togglePanel: _propTypes2.default.func
};

var PanelHeaderBottom = _styledComponents2.default.div.attrs({
  className: 'side-side-panel__header__bottom'
})(_templateObject, function (props) {
  return props.theme.sidePanelHeaderBg;
});

var PanelTab = _styledComponents2.default.div.attrs({
  className: 'side-panel__tab'
})(_templateObject2, function (props) {
  return props.active ? props.theme.subtextColorActive : 'transparent';
}, function (props) {
  return props.active ? props.theme.subtextColorActive : props.theme.subtextColor;
}, function (props) {
  return props.theme.textColorHl;
});

var PanelToggle = function PanelToggle(_ref) {
  var panels = _ref.panels,
      activePanel = _ref.activePanel,
      togglePanel = _ref.togglePanel;
  return _react2.default.createElement(
    PanelHeaderBottom,
    null,
    panels.map(function (panel) {
      return _react2.default.createElement(
        PanelTab,
        {
          key: panel.id,
          'data-tip': true,
          'data-for': panel.id + '-nav',
          active: activePanel === panel.id,
          onClick: function onClick() {
            return togglePanel(panel.id);
          }
        },
        _react2.default.createElement(panel.iconComponent, { height: '20px' }),
        _react2.default.createElement(
          _styledComponents3.Tooltip,
          {
            id: panel.id + '-nav',
            effect: 'solid',
            delayShow: 500,
            place: 'bottom'
          },
          _react2.default.createElement(
            'span',
            null,
            panel.label || panel.id
          )
        )
      );
    })
  );
};

PanelToggle.propTypes = propTypes;

exports.default = PanelToggle;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3NpZGUtcGFuZWwvcGFuZWwtdG9nZ2xlLmpzIl0sIm5hbWVzIjpbInByb3BUeXBlcyIsInBhbmVscyIsIlByb3BUeXBlcyIsImFycmF5IiwiYWN0aXZlUGFuZWwiLCJzdHJpbmciLCJ0b2dnbGVQYW5lbCIsImZ1bmMiLCJQYW5lbEhlYWRlckJvdHRvbSIsInN0eWxlZCIsImRpdiIsImF0dHJzIiwiY2xhc3NOYW1lIiwicHJvcHMiLCJ0aGVtZSIsInNpZGVQYW5lbEhlYWRlckJnIiwiUGFuZWxUYWIiLCJhY3RpdmUiLCJzdWJ0ZXh0Q29sb3JBY3RpdmUiLCJzdWJ0ZXh0Q29sb3IiLCJ0ZXh0Q29sb3JIbCIsIlBhbmVsVG9nZ2xlIiwibWFwIiwicGFuZWwiLCJpZCIsImxhYmVsIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozt5cUJBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFFQSxJQUFNQSxZQUFZO0FBQ2hCQyxVQUFRQyxvQkFBVUMsS0FERjtBQUVoQkMsZUFBYUYsb0JBQVVHLE1BRlA7QUFHaEJDLGVBQWFKLG9CQUFVSztBQUhQLENBQWxCOztBQU1BLElBQU1DLG9CQUFvQkMsMkJBQU9DLEdBQVAsQ0FBV0MsS0FBWCxDQUFpQjtBQUN6Q0MsYUFBVztBQUQ4QixDQUFqQixDQUFwQixrQkFHZ0I7QUFBQSxTQUFTQyxNQUFNQyxLQUFOLENBQVlDLGlCQUFyQjtBQUFBLENBSGhCLENBQU47O0FBU0EsSUFBTUMsV0FBV1AsMkJBQU9DLEdBQVAsQ0FBV0MsS0FBWCxDQUFpQjtBQUNoQ0MsYUFBVztBQURxQixDQUFqQixDQUFYLG1CQU1tQjtBQUFBLFNBQ3ZCQyxNQUFNSSxNQUFOLEdBQWVKLE1BQU1DLEtBQU4sQ0FBWUksa0JBQTNCLEdBQWdELGFBRHpCO0FBQUEsQ0FObkIsRUFRSztBQUFBLFNBQ1RMLE1BQU1JLE1BQU4sR0FBZUosTUFBTUMsS0FBTixDQUFZSSxrQkFBM0IsR0FBZ0RMLE1BQU1DLEtBQU4sQ0FBWUssWUFEbkQ7QUFBQSxDQVJMLEVBa0JPO0FBQUEsU0FBU04sTUFBTUMsS0FBTixDQUFZTSxXQUFyQjtBQUFBLENBbEJQLENBQU47O0FBc0JBLElBQU1DLGNBQWMsU0FBZEEsV0FBYztBQUFBLE1BQUVwQixNQUFGLFFBQUVBLE1BQUY7QUFBQSxNQUFVRyxXQUFWLFFBQVVBLFdBQVY7QUFBQSxNQUF1QkUsV0FBdkIsUUFBdUJBLFdBQXZCO0FBQUEsU0FDbEI7QUFBQyxxQkFBRDtBQUFBO0FBQ0dMLFdBQU9xQixHQUFQLENBQVc7QUFBQSxhQUNWO0FBQUMsZ0JBQUQ7QUFBQTtBQUNFLGVBQUtDLE1BQU1DLEVBRGI7QUFFRSwwQkFGRjtBQUdFLHNCQUFhRCxNQUFNQyxFQUFuQixTQUhGO0FBSUUsa0JBQVFwQixnQkFBZ0JtQixNQUFNQyxFQUpoQztBQUtFLG1CQUFTO0FBQUEsbUJBQU1sQixZQUFZaUIsTUFBTUMsRUFBbEIsQ0FBTjtBQUFBO0FBTFg7QUFPRSxzQ0FBQyxLQUFELENBQU8sYUFBUCxJQUFxQixRQUFPLE1BQTVCLEdBUEY7QUFRRTtBQUFDLG9DQUFEO0FBQUE7QUFDRSxnQkFBT0QsTUFBTUMsRUFBYixTQURGO0FBRUUsb0JBQU8sT0FGVDtBQUdFLHVCQUFXLEdBSGI7QUFJRSxtQkFBTTtBQUpSO0FBTUU7QUFBQTtBQUFBO0FBQU9ELGtCQUFNRSxLQUFOLElBQWVGLE1BQU1DO0FBQTVCO0FBTkY7QUFSRixPQURVO0FBQUEsS0FBWDtBQURILEdBRGtCO0FBQUEsQ0FBcEI7O0FBd0JBSCxZQUFZckIsU0FBWixHQUF3QkEsU0FBeEI7O2tCQUVlcUIsVyIsImZpbGUiOiJwYW5lbC10b2dnbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIDIwMTggVWJlciBUZWNobm9sb2dpZXMsIEluYy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4vLyBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4vLyBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4vLyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4vLyBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbi8vIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbi8vIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1Jcbi8vIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuLy8gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4vLyBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4vLyBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuLy8gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuLy8gVEhFIFNPRlRXQVJFLlxuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCBzdHlsZWQgZnJvbSAnc3R5bGVkLWNvbXBvbmVudHMnO1xuaW1wb3J0IHtUb29sdGlwfSBmcm9tICdjb21wb25lbnRzL2NvbW1vbi9zdHlsZWQtY29tcG9uZW50cyc7XG5cbmNvbnN0IHByb3BUeXBlcyA9IHtcbiAgcGFuZWxzOiBQcm9wVHlwZXMuYXJyYXksXG4gIGFjdGl2ZVBhbmVsOiBQcm9wVHlwZXMuc3RyaW5nLFxuICB0b2dnbGVQYW5lbDogUHJvcFR5cGVzLmZ1bmNcbn07XG5cbmNvbnN0IFBhbmVsSGVhZGVyQm90dG9tID0gc3R5bGVkLmRpdi5hdHRycyh7XG4gIGNsYXNzTmFtZTogJ3NpZGUtc2lkZS1wYW5lbF9faGVhZGVyX19ib3R0b20nXG59KWBcbiAgYmFja2dyb3VuZC1jb2xvcjogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5zaWRlUGFuZWxIZWFkZXJCZ307XG4gIHBhZGRpbmc6IDAgMTZweDtcbiAgZGlzcGxheTogZmxleDtcbiAgbWluLWhlaWdodDogMzBweDtcbmA7XG5cbmNvbnN0IFBhbmVsVGFiID0gc3R5bGVkLmRpdi5hdHRycyh7XG4gIGNsYXNzTmFtZTogJ3NpZGUtcGFuZWxfX3RhYidcbn0pYFxuICBhbGlnbi1pdGVtczogZmxleC1lbmQ7XG4gIGJvcmRlci1ib3R0b20tc3R5bGU6IHNvbGlkO1xuICBib3JkZXItYm90dG9tLXdpZHRoOiAycHg7XG4gIGJvcmRlci1ib3R0b20tY29sb3I6ICR7cHJvcHMgPT5cbiAgcHJvcHMuYWN0aXZlID8gcHJvcHMudGhlbWUuc3VidGV4dENvbG9yQWN0aXZlIDogJ3RyYW5zcGFyZW50J307XG4gIGNvbG9yOiAke3Byb3BzID0+XG4gIHByb3BzLmFjdGl2ZSA/IHByb3BzLnRoZW1lLnN1YnRleHRDb2xvckFjdGl2ZSA6IHByb3BzLnRoZW1lLnN1YnRleHRDb2xvcn07XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBtYXJnaW4tcmlnaHQ6IDEycHg7XG4gIHBhZGRpbmctYm90dG9tOiA2cHg7XG4gIHdpZHRoOiAzMHB4O1xuICBcbiAgOmhvdmVyIHtcbiAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgY29sb3I6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUudGV4dENvbG9ySGx9O1xuICB9XG5gO1xuXG5jb25zdCBQYW5lbFRvZ2dsZSA9ICh7cGFuZWxzLCBhY3RpdmVQYW5lbCwgdG9nZ2xlUGFuZWx9KSA9PiAoXG4gIDxQYW5lbEhlYWRlckJvdHRvbT5cbiAgICB7cGFuZWxzLm1hcChwYW5lbCA9PiAoXG4gICAgICA8UGFuZWxUYWJcbiAgICAgICAga2V5PXtwYW5lbC5pZH1cbiAgICAgICAgZGF0YS10aXBcbiAgICAgICAgZGF0YS1mb3I9e2Ake3BhbmVsLmlkfS1uYXZgfVxuICAgICAgICBhY3RpdmU9e2FjdGl2ZVBhbmVsID09PSBwYW5lbC5pZH1cbiAgICAgICAgb25DbGljaz17KCkgPT4gdG9nZ2xlUGFuZWwocGFuZWwuaWQpfVxuICAgICAgPlxuICAgICAgICA8cGFuZWwuaWNvbkNvbXBvbmVudCBoZWlnaHQ9XCIyMHB4XCIgLz5cbiAgICAgICAgPFRvb2x0aXBcbiAgICAgICAgICBpZD17YCR7cGFuZWwuaWR9LW5hdmB9XG4gICAgICAgICAgZWZmZWN0PVwic29saWRcIlxuICAgICAgICAgIGRlbGF5U2hvdz17NTAwfVxuICAgICAgICAgIHBsYWNlPVwiYm90dG9tXCJcbiAgICAgICAgPlxuICAgICAgICAgIDxzcGFuPntwYW5lbC5sYWJlbCB8fCBwYW5lbC5pZH08L3NwYW4+XG4gICAgICAgIDwvVG9vbHRpcD5cbiAgICAgIDwvUGFuZWxUYWI+XG4gICAgKSl9XG4gIDwvUGFuZWxIZWFkZXJCb3R0b20+XG4pO1xuXG5QYW5lbFRvZ2dsZS5wcm9wVHlwZXMgPSBwcm9wVHlwZXM7XG5cbmV4cG9ydCBkZWZhdWx0IFBhbmVsVG9nZ2xlO1xuIl19