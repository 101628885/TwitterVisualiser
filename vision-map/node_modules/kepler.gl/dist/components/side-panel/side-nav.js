'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _styledComponents = require('../common/styled-components');

var _defaultSettings = require('../../constants/default-settings');

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

var SideNav = function SideNav(itemProps) {
  return _react2.default.createElement(
    'div',
    { className: (0, _classnames2.default)('side-navi', { collapsed: itemProps.isCollapsed }) },
    _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(
        'ul',
        null,
        _defaultSettings.PANELS.map(function (item) {
          return _react2.default.createElement(NavItem, (0, _extends3.default)({}, itemProps, { key: item.id, item: item }));
        })
      )
    ),
    _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(
        'ul',
        null,
        _defaultSettings.PANELS_FOOTER.map(function (item) {
          return _react2.default.createElement(NavItem, (0, _extends3.default)({}, itemProps, { key: item.id, item: item }));
        })
      )
    )
  );
};

var NavItem = function NavItem(_ref) {
  var activePanel = _ref.activePanel,
      item = _ref.item,
      isCollapsed = _ref.isCollapsed,
      togglePanel = _ref.togglePanel;
  return _react2.default.createElement(
    'li',
    {
      className: (0, _classnames2.default)('side-navi__item', { active: activePanel === item.id }),
      onClick: function onClick() {
        return togglePanel(item.id);
      }
    },
    _react2.default.createElement(
      'a',
      { className: 'hover align--middle', 'data-tip': true, 'data-for': item.id + '-nav' },
      _react2.default.createElement('span', { className: 'icon icon_' + item.icon }),
      isCollapsed ? _react2.default.createElement(
        _styledComponents.Tooltip,
        {
          id: item.id + '-nav',
          effect: 'solid',
          delayShow: 500,
          place: 'right'
        },
        _react2.default.createElement(
          'span',
          null,
          item.label
        )
      ) : _react2.default.createElement(
        'span',
        { className: 'side-navi__item__title' },
        item.label
      )
    )
  );
};

exports.default = SideNav;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3NpZGUtcGFuZWwvc2lkZS1uYXYuanMiXSwibmFtZXMiOlsiU2lkZU5hdiIsImNvbGxhcHNlZCIsIml0ZW1Qcm9wcyIsImlzQ29sbGFwc2VkIiwiUEFORUxTIiwibWFwIiwiaXRlbSIsImlkIiwiUEFORUxTX0ZPT1RFUiIsIk5hdkl0ZW0iLCJhY3RpdmVQYW5lbCIsInRvZ2dsZVBhbmVsIiwiYWN0aXZlIiwiaWNvbiIsImxhYmVsIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBb0JBOzs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7OztBQXZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFPQSxJQUFNQSxVQUFVLFNBQVZBLE9BQVU7QUFBQSxTQUNkO0FBQUE7QUFBQSxNQUFLLFdBQVcsMEJBQVcsV0FBWCxFQUF3QixFQUFDQyxXQUFXQyxVQUFVQyxXQUF0QixFQUF4QixDQUFoQjtBQUNFO0FBQUE7QUFBQTtBQUNFO0FBQUE7QUFBQTtBQUNHQyxnQ0FBT0MsR0FBUCxDQUFXO0FBQUEsaUJBQ1YsOEJBQUMsT0FBRCw2QkFBYUgsU0FBYixJQUF3QixLQUFLSSxLQUFLQyxFQUFsQyxFQUFzQyxNQUFNRCxJQUE1QyxJQURVO0FBQUEsU0FBWDtBQURIO0FBREYsS0FERjtBQVFFO0FBQUE7QUFBQTtBQUNFO0FBQUE7QUFBQTtBQUNHRSx1Q0FBY0gsR0FBZCxDQUFrQjtBQUFBLGlCQUNqQiw4QkFBQyxPQUFELDZCQUFhSCxTQUFiLElBQXdCLEtBQUtJLEtBQUtDLEVBQWxDLEVBQXNDLE1BQU1ELElBQTVDLElBRGlCO0FBQUEsU0FBbEI7QUFESDtBQURGO0FBUkYsR0FEYztBQUFBLENBQWhCOztBQW1CQSxJQUFNRyxVQUFVLFNBQVZBLE9BQVU7QUFBQSxNQUFFQyxXQUFGLFFBQUVBLFdBQUY7QUFBQSxNQUFlSixJQUFmLFFBQWVBLElBQWY7QUFBQSxNQUFxQkgsV0FBckIsUUFBcUJBLFdBQXJCO0FBQUEsTUFBa0NRLFdBQWxDLFFBQWtDQSxXQUFsQztBQUFBLFNBQ2Q7QUFBQTtBQUFBO0FBQ0UsaUJBQVcsMEJBQVcsaUJBQVgsRUFBOEIsRUFBQ0MsUUFBUUYsZ0JBQWdCSixLQUFLQyxFQUE5QixFQUE5QixDQURiO0FBRUUsZUFBUztBQUFBLGVBQU1JLFlBQVlMLEtBQUtDLEVBQWpCLENBQU47QUFBQTtBQUZYO0FBSUU7QUFBQTtBQUFBLFFBQUcsV0FBVSxxQkFBYixFQUFtQyxnQkFBbkMsRUFBNEMsWUFBYUQsS0FBS0MsRUFBbEIsU0FBNUM7QUFDRSw4Q0FBTSwwQkFBd0JELEtBQUtPLElBQW5DLEdBREY7QUFFR1Ysb0JBQ0M7QUFBQyxpQ0FBRDtBQUFBO0FBQ0UsY0FBT0csS0FBS0MsRUFBWixTQURGO0FBRUUsa0JBQU8sT0FGVDtBQUdFLHFCQUFXLEdBSGI7QUFJRSxpQkFBTTtBQUpSO0FBTUU7QUFBQTtBQUFBO0FBQU9ELGVBQUtRO0FBQVo7QUFORixPQURELEdBVUM7QUFBQTtBQUFBLFVBQU0sV0FBVSx3QkFBaEI7QUFBMENSLGFBQUtRO0FBQS9DO0FBWko7QUFKRixHQURjO0FBQUEsQ0FBaEI7O2tCQXVCZWQsTyIsImZpbGUiOiJzaWRlLW5hdi5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgMjAxOCBVYmVyIFRlY2hub2xvZ2llcywgSW5jLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbi8vIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbi8vIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbi8vIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbi8vIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuLy8gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuLy8gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4vLyBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbi8vIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbi8vIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4vLyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4vLyBUSEUgU09GVFdBUkUuXG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgY2xhc3NuYW1lcyBmcm9tICdjbGFzc25hbWVzJztcbmltcG9ydCB7VG9vbHRpcH0gZnJvbSAnY29tcG9uZW50cy9jb21tb24vc3R5bGVkLWNvbXBvbmVudHMnO1xuaW1wb3J0IHtQQU5FTFMsIFBBTkVMU19GT09URVJ9IGZyb20gJ2NvbnN0YW50cy9kZWZhdWx0LXNldHRpbmdzJztcblxuY29uc3QgU2lkZU5hdiA9IGl0ZW1Qcm9wcyA9PiAoXG4gIDxkaXYgY2xhc3NOYW1lPXtjbGFzc25hbWVzKCdzaWRlLW5hdmknLCB7Y29sbGFwc2VkOiBpdGVtUHJvcHMuaXNDb2xsYXBzZWR9KX0+XG4gICAgPGRpdj5cbiAgICAgIDx1bD5cbiAgICAgICAge1BBTkVMUy5tYXAoaXRlbSA9PiAoXG4gICAgICAgICAgPE5hdkl0ZW0gey4uLml0ZW1Qcm9wc30ga2V5PXtpdGVtLmlkfSBpdGVtPXtpdGVtfSAvPlxuICAgICAgICApKX1cbiAgICAgIDwvdWw+XG4gICAgPC9kaXY+XG4gICAgPGRpdj5cbiAgICAgIDx1bD5cbiAgICAgICAge1BBTkVMU19GT09URVIubWFwKGl0ZW0gPT4gKFxuICAgICAgICAgIDxOYXZJdGVtIHsuLi5pdGVtUHJvcHN9IGtleT17aXRlbS5pZH0gaXRlbT17aXRlbX0gLz5cbiAgICAgICAgKSl9XG4gICAgICA8L3VsPlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cbik7XG5cbmNvbnN0IE5hdkl0ZW0gPSAoe2FjdGl2ZVBhbmVsLCBpdGVtLCBpc0NvbGxhcHNlZCwgdG9nZ2xlUGFuZWx9KSA9PiAoXG4gIDxsaVxuICAgIGNsYXNzTmFtZT17Y2xhc3NuYW1lcygnc2lkZS1uYXZpX19pdGVtJywge2FjdGl2ZTogYWN0aXZlUGFuZWwgPT09IGl0ZW0uaWR9KX1cbiAgICBvbkNsaWNrPXsoKSA9PiB0b2dnbGVQYW5lbChpdGVtLmlkKX1cbiAgPlxuICAgIDxhIGNsYXNzTmFtZT1cImhvdmVyIGFsaWduLS1taWRkbGVcIiBkYXRhLXRpcCBkYXRhLWZvcj17YCR7aXRlbS5pZH0tbmF2YH0+XG4gICAgICA8c3BhbiBjbGFzc05hbWU9e2BpY29uIGljb25fJHtpdGVtLmljb259YH0gLz5cbiAgICAgIHtpc0NvbGxhcHNlZCA/IChcbiAgICAgICAgPFRvb2x0aXBcbiAgICAgICAgICBpZD17YCR7aXRlbS5pZH0tbmF2YH1cbiAgICAgICAgICBlZmZlY3Q9XCJzb2xpZFwiXG4gICAgICAgICAgZGVsYXlTaG93PXs1MDB9XG4gICAgICAgICAgcGxhY2U9XCJyaWdodFwiXG4gICAgICAgID5cbiAgICAgICAgICA8c3Bhbj57aXRlbS5sYWJlbH08L3NwYW4+XG4gICAgICAgIDwvVG9vbHRpcD5cbiAgICAgICkgOiAoXG4gICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInNpZGUtbmF2aV9faXRlbV9fdGl0bGVcIj57aXRlbS5sYWJlbH08L3NwYW4+XG4gICAgICApfVxuICAgIDwvYT5cbiAgPC9saT5cbik7XG5cbmV4cG9ydCBkZWZhdWx0IFNpZGVOYXY7XG4iXX0=