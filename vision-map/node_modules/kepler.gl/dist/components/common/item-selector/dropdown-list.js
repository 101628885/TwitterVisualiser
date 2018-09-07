'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.ListItem = exports.classList = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _taggedTemplateLiteral2 = require('babel-runtime/helpers/taggedTemplateLiteral');

var _taggedTemplateLiteral3 = _interopRequireDefault(_taggedTemplateLiteral2);

var _class, _temp;

var _templateObject = (0, _taggedTemplateLiteral3.default)(['\n  background-color: ', ';\n  border-top: 1px solid ', ';\n  ', ';\n'], ['\n  background-color: ', ';\n  border-top: 1px solid ', ';\n  ', ';\n']); // Copyright (c) 2018 Uber Technologies, Inc.
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

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var classList = exports.classList = {
  list: 'list-selector',
  listHeader: 'list__header',
  listSection: 'list__section',
  listItem: 'list__item',
  listItemAnchor: 'list__item__anchor'
};

var defaultDisplay = function defaultDisplay(d) {
  return d;
};
var ListItem = exports.ListItem = function ListItem(_ref) {
  var value = _ref.value,
      _ref$displayOption = _ref.displayOption,
      displayOption = _ref$displayOption === undefined ? defaultDisplay : _ref$displayOption;
  return _react2.default.createElement(
    'span',
    { className: classList.listItemAnchor },
    displayOption(value)
  );
};

var DropdownListWrapper = _styledComponents2.default.div(_templateObject, function (props) {
  return props.theme.dropdownListBgd;
}, function (props) {
  return props.theme.dropdownListBorderTop;
}, function (props) {
  return props.theme.dropdownList;
});

var DropdownList = (_temp = _class = function (_Component) {
  (0, _inherits3.default)(DropdownList, _Component);

  function DropdownList() {
    (0, _classCallCheck3.default)(this, DropdownList);
    return (0, _possibleConstructorReturn3.default)(this, (DropdownList.__proto__ || Object.getPrototypeOf(DropdownList)).apply(this, arguments));
  }

  (0, _createClass3.default)(DropdownList, [{
    key: '_onClick',
    value: function _onClick(result, event) {
      event.preventDefault();
      this.props.onOptionSelected(result, event);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var fixedOptions = this.props.fixedOptions;

      var display = this.props.displayOption;

      // Don't render if there are no options to display
      if (!this.props.options.length && this.props.allowCustomValues <= 0) {
        return false;
      }

      var valueOffset = Array.isArray(fixedOptions) ? fixedOptions.length : 0;

      // For some reason onClick is not fired when clicked on an option
      // onMouseDown is used here as a workaround of #205 and other
      return _react2.default.createElement(
        DropdownListWrapper,
        { className: classList.list },
        this.props.customListHeaderComponent ? _react2.default.createElement(
          'div',
          { className: classList.listHeader },
          _react2.default.createElement(this.props.customListHeaderComponent, null)
        ) : null,
        valueOffset > 0 ? _react2.default.createElement(
          'div',
          { className: classList.listSection },
          fixedOptions.map(function (value, i) {
            return _react2.default.createElement(
              'div',
              {
                className: (0, _classnames2.default)(classList.listItem, {
                  hover: _this2.props.selectionIndex === i,
                  fixed: true
                }),
                key: display(value) + '_' + i,
                onMouseDown: function onMouseDown(e) {
                  return _this2._onClick(value, e);
                },
                onClick: function onClick(e) {
                  return _this2._onClick(value, e);
                }
              },
              _react2.default.createElement(_this2.props.customListItemComponent, {
                value: value,
                displayOption: display
              })
            );
          })
        ) : null,
        this.props.options.map(function (value, i) {
          return _react2.default.createElement(
            'div',
            {
              className: (0, _classnames2.default)(classList.listItem, {
                hover: _this2.props.selectionIndex === i + valueOffset
              }),
              key: display(value) + '_' + i,
              onMouseDown: function onMouseDown(e) {
                return _this2._onClick(value, e);
              },
              onClick: function onClick(e) {
                return _this2._onClick(value, e);
              }
            },
            _react2.default.createElement(_this2.props.customListItemComponent, {
              value: value,
              displayOption: display
            })
          );
        })
      );
    }
  }]);
  return DropdownList;
}(_react.Component), _class.propTypes = {
  options: _propTypes2.default.arrayOf(_propTypes2.default.any),
  allowCustomValues: _propTypes2.default.number,
  customClasses: _propTypes2.default.object,
  customValues: _propTypes2.default.arrayOf(_propTypes2.default.any),
  customListItemComponent: _propTypes2.default.oneOfType([_propTypes2.default.element, _propTypes2.default.func]),
  customListHeaderComponent: _propTypes2.default.oneOfType([_propTypes2.default.element, _propTypes2.default.func]),
  selectionIndex: _propTypes2.default.number,
  onOptionSelected: _propTypes2.default.func,
  displayOption: _propTypes2.default.func.isRequired,
  defaultClassNames: _propTypes2.default.bool,
  areResultsTruncated: _propTypes2.default.bool,
  resultsTruncatedMessage: _propTypes2.default.string,
  listItemComponent: _propTypes2.default.func
}, _class.defaultProps = {
  customClasses: {},
  customListItemComponent: ListItem,
  customListHeaderComponent: null,
  allowCustomValues: 0,
  customValues: [],
  displayOption: defaultDisplay,
  onOptionSelected: function onOptionSelected() {},
  defaultClassNames: true,
  selectionIndex: null
}, _temp);
exports.default = DropdownList;
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2NvbW1vbi9pdGVtLXNlbGVjdG9yL2Ryb3Bkb3duLWxpc3QuanMiXSwibmFtZXMiOlsiY2xhc3NMaXN0IiwibGlzdCIsImxpc3RIZWFkZXIiLCJsaXN0U2VjdGlvbiIsImxpc3RJdGVtIiwibGlzdEl0ZW1BbmNob3IiLCJkZWZhdWx0RGlzcGxheSIsImQiLCJMaXN0SXRlbSIsInZhbHVlIiwiZGlzcGxheU9wdGlvbiIsIkRyb3Bkb3duTGlzdFdyYXBwZXIiLCJzdHlsZWQiLCJkaXYiLCJwcm9wcyIsInRoZW1lIiwiZHJvcGRvd25MaXN0QmdkIiwiZHJvcGRvd25MaXN0Qm9yZGVyVG9wIiwiZHJvcGRvd25MaXN0IiwiRHJvcGRvd25MaXN0IiwicmVzdWx0IiwiZXZlbnQiLCJwcmV2ZW50RGVmYXVsdCIsIm9uT3B0aW9uU2VsZWN0ZWQiLCJmaXhlZE9wdGlvbnMiLCJkaXNwbGF5Iiwib3B0aW9ucyIsImxlbmd0aCIsImFsbG93Q3VzdG9tVmFsdWVzIiwidmFsdWVPZmZzZXQiLCJBcnJheSIsImlzQXJyYXkiLCJjdXN0b21MaXN0SGVhZGVyQ29tcG9uZW50IiwibWFwIiwiaSIsImhvdmVyIiwic2VsZWN0aW9uSW5kZXgiLCJmaXhlZCIsIl9vbkNsaWNrIiwiZSIsIkNvbXBvbmVudCIsInByb3BUeXBlcyIsIlByb3BUeXBlcyIsImFycmF5T2YiLCJhbnkiLCJudW1iZXIiLCJjdXN0b21DbGFzc2VzIiwib2JqZWN0IiwiY3VzdG9tVmFsdWVzIiwiY3VzdG9tTGlzdEl0ZW1Db21wb25lbnQiLCJvbmVPZlR5cGUiLCJlbGVtZW50IiwiZnVuYyIsImlzUmVxdWlyZWQiLCJkZWZhdWx0Q2xhc3NOYW1lcyIsImJvb2wiLCJhcmVSZXN1bHRzVHJ1bmNhdGVkIiwicmVzdWx0c1RydW5jYXRlZE1lc3NhZ2UiLCJzdHJpbmciLCJsaXN0SXRlbUNvbXBvbmVudCIsImRlZmF1bHRQcm9wcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7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VUcsTUFiVDtBQWNqQnRCLG9CQUFrQm1CLG9CQUFVVSxJQWRYO0FBZWpCMUMsaUJBQWVnQyxvQkFBVVUsSUFBVixDQUFlQyxVQWZiO0FBZ0JqQkMscUJBQW1CWixvQkFBVWEsSUFoQlo7QUFpQmpCQyx1QkFBcUJkLG9CQUFVYSxJQWpCZDtBQWtCakJFLDJCQUF5QmYsb0JBQVVnQixNQWxCbEI7QUFtQmpCQyxxQkFBbUJqQixvQkFBVVU7QUFuQlosQyxTQXNCWlEsWSxHQUFlO0FBQ3BCZCxpQkFBZSxFQURLO0FBRXBCRywyQkFBeUJ6QyxRQUZMO0FBR3BCd0IsNkJBQTJCLElBSFA7QUFJcEJKLHFCQUFtQixDQUpDO0FBS3BCb0IsZ0JBQWMsRUFMTTtBQU1wQnRDLGlCQUFlSixjQU5LO0FBT3BCaUIsb0JBQWtCLDRCQUFNLENBQUUsQ0FQTjtBQVFwQitCLHFCQUFtQixJQVJDO0FBU3BCbEIsa0JBQWdCO0FBVEksQztrQkF2QkhqQixZO0FBb0dwQiIsImZpbGUiOiJkcm9wZG93bi1saXN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSAyMDE4IFViZXIgVGVjaG5vbG9naWVzLCBJbmMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuLy8gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuLy8gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuLy8gdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuLy8gY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4vLyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4vLyBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4vLyBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbi8vIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuLy8gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuLy8gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbi8vIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbi8vIFRIRSBTT0ZUV0FSRS5cblxuaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50fSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IGNsYXNzTmFtZXMgZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgc3R5bGVkIGZyb20gJ3N0eWxlZC1jb21wb25lbnRzJztcblxuZXhwb3J0IGNvbnN0IGNsYXNzTGlzdCA9IHtcbiAgbGlzdDogJ2xpc3Qtc2VsZWN0b3InLFxuICBsaXN0SGVhZGVyOiAnbGlzdF9faGVhZGVyJyxcbiAgbGlzdFNlY3Rpb246ICdsaXN0X19zZWN0aW9uJyxcbiAgbGlzdEl0ZW06ICdsaXN0X19pdGVtJyxcbiAgbGlzdEl0ZW1BbmNob3I6ICdsaXN0X19pdGVtX19hbmNob3InXG59O1xuXG5jb25zdCBkZWZhdWx0RGlzcGxheSA9IGQgPT4gZDtcbmV4cG9ydCBjb25zdCBMaXN0SXRlbSA9ICh7dmFsdWUsIGRpc3BsYXlPcHRpb24gPSBkZWZhdWx0RGlzcGxheX0pID0+IChcbiAgPHNwYW4gY2xhc3NOYW1lPXtjbGFzc0xpc3QubGlzdEl0ZW1BbmNob3J9PntkaXNwbGF5T3B0aW9uKHZhbHVlKX08L3NwYW4+XG4pO1xuXG5jb25zdCBEcm9wZG93bkxpc3RXcmFwcGVyID0gc3R5bGVkLmRpdmBcbiAgYmFja2dyb3VuZC1jb2xvcjogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5kcm9wZG93bkxpc3RCZ2R9O1xuICBib3JkZXItdG9wOiAxcHggc29saWQgJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5kcm9wZG93bkxpc3RCb3JkZXJUb3B9O1xuICAke3Byb3BzID0+IHByb3BzLnRoZW1lLmRyb3Bkb3duTGlzdH07XG5gO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEcm9wZG93bkxpc3QgZXh0ZW5kcyBDb21wb25lbnQge1xuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIG9wdGlvbnM6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5hbnkpLFxuICAgIGFsbG93Q3VzdG9tVmFsdWVzOiBQcm9wVHlwZXMubnVtYmVyLFxuICAgIGN1c3RvbUNsYXNzZXM6IFByb3BUeXBlcy5vYmplY3QsXG4gICAgY3VzdG9tVmFsdWVzOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMuYW55KSxcbiAgICBjdXN0b21MaXN0SXRlbUNvbXBvbmVudDogUHJvcFR5cGVzLm9uZU9mVHlwZShbXG4gICAgICBQcm9wVHlwZXMuZWxlbWVudCxcbiAgICAgIFByb3BUeXBlcy5mdW5jXG4gICAgXSksXG4gICAgY3VzdG9tTGlzdEhlYWRlckNvbXBvbmVudDogUHJvcFR5cGVzLm9uZU9mVHlwZShbXG4gICAgICBQcm9wVHlwZXMuZWxlbWVudCxcbiAgICAgIFByb3BUeXBlcy5mdW5jXG4gICAgXSksXG4gICAgc2VsZWN0aW9uSW5kZXg6IFByb3BUeXBlcy5udW1iZXIsXG4gICAgb25PcHRpb25TZWxlY3RlZDogUHJvcFR5cGVzLmZ1bmMsXG4gICAgZGlzcGxheU9wdGlvbjogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICBkZWZhdWx0Q2xhc3NOYW1lczogUHJvcFR5cGVzLmJvb2wsXG4gICAgYXJlUmVzdWx0c1RydW5jYXRlZDogUHJvcFR5cGVzLmJvb2wsXG4gICAgcmVzdWx0c1RydW5jYXRlZE1lc3NhZ2U6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgbGlzdEl0ZW1Db21wb25lbnQ6IFByb3BUeXBlcy5mdW5jXG4gIH07XG5cbiAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICBjdXN0b21DbGFzc2VzOiB7fSxcbiAgICBjdXN0b21MaXN0SXRlbUNvbXBvbmVudDogTGlzdEl0ZW0sXG4gICAgY3VzdG9tTGlzdEhlYWRlckNvbXBvbmVudDogbnVsbCxcbiAgICBhbGxvd0N1c3RvbVZhbHVlczogMCxcbiAgICBjdXN0b21WYWx1ZXM6IFtdLFxuICAgIGRpc3BsYXlPcHRpb246IGRlZmF1bHREaXNwbGF5LFxuICAgIG9uT3B0aW9uU2VsZWN0ZWQ6ICgpID0+IHt9LFxuICAgIGRlZmF1bHRDbGFzc05hbWVzOiB0cnVlLFxuICAgIHNlbGVjdGlvbkluZGV4OiBudWxsXG4gIH07XG5cbiAgX29uQ2xpY2socmVzdWx0LCBldmVudCkge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgdGhpcy5wcm9wcy5vbk9wdGlvblNlbGVjdGVkKHJlc3VsdCwgZXZlbnQpO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHtmaXhlZE9wdGlvbnN9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBkaXNwbGF5ID0gdGhpcy5wcm9wcy5kaXNwbGF5T3B0aW9uO1xuXG4gICAgLy8gRG9uJ3QgcmVuZGVyIGlmIHRoZXJlIGFyZSBubyBvcHRpb25zIHRvIGRpc3BsYXlcbiAgICBpZiAoIXRoaXMucHJvcHMub3B0aW9ucy5sZW5ndGggJiYgdGhpcy5wcm9wcy5hbGxvd0N1c3RvbVZhbHVlcyA8PSAwKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgY29uc3QgdmFsdWVPZmZzZXQgPSBBcnJheS5pc0FycmF5KGZpeGVkT3B0aW9ucykgPyBmaXhlZE9wdGlvbnMubGVuZ3RoIDogMDtcblxuICAgIC8vIEZvciBzb21lIHJlYXNvbiBvbkNsaWNrIGlzIG5vdCBmaXJlZCB3aGVuIGNsaWNrZWQgb24gYW4gb3B0aW9uXG4gICAgLy8gb25Nb3VzZURvd24gaXMgdXNlZCBoZXJlIGFzIGEgd29ya2Fyb3VuZCBvZiAjMjA1IGFuZCBvdGhlclxuICAgIHJldHVybiAoXG4gICAgICA8RHJvcGRvd25MaXN0V3JhcHBlciBjbGFzc05hbWU9e2NsYXNzTGlzdC5saXN0fT5cbiAgICAgICAge3RoaXMucHJvcHMuY3VzdG9tTGlzdEhlYWRlckNvbXBvbmVudCA/IChcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17Y2xhc3NMaXN0Lmxpc3RIZWFkZXJ9PlxuICAgICAgICAgICAgPHRoaXMucHJvcHMuY3VzdG9tTGlzdEhlYWRlckNvbXBvbmVudCAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICApIDogbnVsbH1cblxuICAgICAgICB7dmFsdWVPZmZzZXQgPiAwID8gKFxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtjbGFzc0xpc3QubGlzdFNlY3Rpb259PlxuICAgICAgICAgICAge2ZpeGVkT3B0aW9ucy5tYXAoKHZhbHVlLCBpKSA9PiAoXG4gICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoY2xhc3NMaXN0Lmxpc3RJdGVtLCB7XG4gICAgICAgICAgICAgICAgICBob3ZlcjogdGhpcy5wcm9wcy5zZWxlY3Rpb25JbmRleCA9PT0gaSxcbiAgICAgICAgICAgICAgICAgIGZpeGVkOiB0cnVlXG4gICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAga2V5PXtgJHtkaXNwbGF5KHZhbHVlKX1fJHtpfWB9XG4gICAgICAgICAgICAgICAgb25Nb3VzZURvd249e2UgPT4gdGhpcy5fb25DbGljayh2YWx1ZSwgZSl9XG4gICAgICAgICAgICAgICAgb25DbGljaz17ZSA9PiB0aGlzLl9vbkNsaWNrKHZhbHVlLCBlKX1cbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDx0aGlzLnByb3BzLmN1c3RvbUxpc3RJdGVtQ29tcG9uZW50XG4gICAgICAgICAgICAgICAgICB2YWx1ZT17dmFsdWV9XG4gICAgICAgICAgICAgICAgICBkaXNwbGF5T3B0aW9uPXtkaXNwbGF5fVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKSl9XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICkgOiBudWxsfVxuXG4gICAgICAgIHt0aGlzLnByb3BzLm9wdGlvbnMubWFwKCh2YWx1ZSwgaSkgPT4gKFxuICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcyhjbGFzc0xpc3QubGlzdEl0ZW0sIHtcbiAgICAgICAgICAgICAgaG92ZXI6IHRoaXMucHJvcHMuc2VsZWN0aW9uSW5kZXggPT09IGkgKyB2YWx1ZU9mZnNldFxuICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICBrZXk9e2Ake2Rpc3BsYXkodmFsdWUpfV8ke2l9YH1cbiAgICAgICAgICAgIG9uTW91c2VEb3duPXtlID0+IHRoaXMuX29uQ2xpY2sodmFsdWUsIGUpfVxuICAgICAgICAgICAgb25DbGljaz17ZSA9PiB0aGlzLl9vbkNsaWNrKHZhbHVlLCBlKX1cbiAgICAgICAgICA+XG4gICAgICAgICAgICA8dGhpcy5wcm9wcy5jdXN0b21MaXN0SXRlbUNvbXBvbmVudFxuICAgICAgICAgICAgICB2YWx1ZT17dmFsdWV9XG4gICAgICAgICAgICAgIGRpc3BsYXlPcHRpb249e2Rpc3BsYXl9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICApKX1cbiAgICAgIDwvRHJvcGRvd25MaXN0V3JhcHBlcj5cbiAgICApO1xuICB9XG59O1xuIl19