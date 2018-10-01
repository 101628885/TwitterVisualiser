'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

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

var _class, _temp2;

var _templateObject = (0, _taggedTemplateLiteral3.default)(['\n  ', ';\n\n  .list__item__anchor {\n    ', ';\n  }\n'], ['\n  ', ';\n\n  .list__item__anchor {\n    ', ';\n  }\n']),
    _templateObject2 = (0, _taggedTemplateLiteral3.default)(['\n  color: ', ';\n  overflow: hidden;\n'], ['\n  color: ', ';\n  overflow: hidden;\n']),
    _templateObject3 = (0, _taggedTemplateLiteral3.default)(['\n  margin-left: 6px;\n  display: flex;\n'], ['\n  margin-left: 6px;\n  display: flex;\n']),
    _templateObject4 = (0, _taggedTemplateLiteral3.default)(['\n  background: ', ';\n  border: 0;\n  width: 100%;\n  left: 0;\n  z-index: 100;\n  position: absolute;\n  bottom: ', ';\n  margin-top: ', ';\n  margin-bottom: ', ';\n'], ['\n  background: ', ';\n  border: 0;\n  width: 100%;\n  left: 0;\n  z-index: 100;\n  position: absolute;\n  bottom: ', ';\n  margin-top: ', ';\n  margin-bottom: ', ';\n']); // Copyright (c) 2018 Uber Technologies, Inc.
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

var _lodash = require('lodash.uniq');

var _lodash2 = _interopRequireDefault(_lodash);

var _reactOnclickoutside = require('react-onclickoutside');

var _reactOnclickoutside2 = _interopRequireDefault(_reactOnclickoutside);

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _accessor = require('./accessor');

var _accessor2 = _interopRequireDefault(_accessor);

var _chickletedInput = require('./chickleted-input');

var _chickletedInput2 = _interopRequireDefault(_chickletedInput);

var _typeahead = require('./typeahead');

var _typeahead2 = _interopRequireDefault(_typeahead);

var _icons = require('../icons');

var _dropdownList = require('./dropdown-list');

var _dropdownList2 = _interopRequireDefault(_dropdownList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Converts non-arrays to arrays.  Leaves arrays alone.  Converts
 * undefined values to empty arrays ([] instead of [undefined]).
 * Otherwise, just returns [item] for non-array items.
 *
 * @param {*} item
 * @returns {array} boom! much array. very indexed. so useful.
 */
function _toArray(item) {
  if (Array.isArray(item)) {
    return item;
  }

  if (typeof item === 'undefined' || item === null) {
    return [];
  }

  return [item];
}

var StyledDropdownSelect = _styledComponents2.default.div(_templateObject, function (props) {
  return props.inputTheme === 'secondary' ? props.theme.secondaryInput : props.theme.input;
}, function (props) {
  return props.theme.dropdownListAnchor;
});

var DropdownSelectValue = _styledComponents2.default.span(_templateObject2, function (props) {
  return props.placeholder ? props.theme.selectColorPlaceHolder : props.theme.selectColor;
});

var DropdownSelectErase = _styledComponents2.default.div(_templateObject3);

var DropdownWrapper = _styledComponents2.default.div(_templateObject4, function (props) {
  return props.theme.dropdownBgd;
}, function (props) {
  return props.placement === 'top' ? props.theme.inputBoxHeight : 'auto';
}, function (props) {
  return props.placement === 'bottom' ? '4px' : 'auto';
}, function (props) {
  return props.placement === 'top' ? '4px' : 'auto';
});

var ItemSelector = (_temp2 = _class = function (_Component) {
  (0, _inherits3.default)(ItemSelector, _Component);

  function ItemSelector() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, ItemSelector);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = ItemSelector.__proto__ || Object.getPrototypeOf(ItemSelector)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      showTypeahead: false
    }, _this.handleClickOutside = function () {
      _this._hideTypeahead();
    }, _this._onBlur = function () {
      // note: chickleted input is not a real form element so we call onBlur()
      // when we feel the events are appropriate
      if (_this.props.onBlur) {
        _this.props.onBlur();
      }
    }, _this._removeItem = function (item, e) {
      // only used when multiSelect = true
      e.preventDefault();
      e.stopPropagation();
      var selectedItems = _this.props.selectedItems;

      var index = selectedItems.findIndex(function (t) {
        return t === item;
      });

      if (index < 0) {
        return;
      }

      var items = [].concat((0, _toConsumableArray3.default)(selectedItems.slice(0, index)), (0, _toConsumableArray3.default)(selectedItems.slice(index + 1, selectedItems.length)));

      _this.props.onChange(items);

      if (_this.props.closeOnSelect) {
        _this.setState({ showTypeahead: false });
        _this._onBlur();
      }
    }, _this._selectItem = function (item) {
      var getValue = _accessor2.default.generateOptionToStringFor(_this.props.getOptionValue || _this.props.displayOption);

      var previousSelected = _toArray(_this.props.selectedItems);

      if (_this.props.multiSelect) {
        var items = (0, _lodash2.default)(previousSelected.concat(_toArray(item).map(getValue)));
        _this.props.onChange(items);
      } else {
        _this.props.onChange(getValue(item));
      }

      if (_this.props.closeOnSelect) {
        _this.setState({ showTypeahead: false });
        _this._onBlur();
      }
    }, _this._onErase = function (e) {
      e.stopPropagation();
      _this.props.onChange(null);
    }, _this._showTypeahead = function () {
      if (!_this.props.disabled) {
        _this.setState({
          showTypeahead: true
        });
      }
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(ItemSelector, [{
    key: '_hideTypeahead',
    value: function _hideTypeahead() {
      this.setState({ showTypeahead: false });
      this._onBlur();
    }
  }, {
    key: '_renderDropdown',
    value: function _renderDropdown() {
      return _react2.default.createElement(
        DropdownWrapper,
        { placement: this.props.placement },
        _react2.default.createElement(_typeahead2.default, {
          customClasses: {
            results: 'list-selector',
            input: 'typeahead__input',
            listItem: 'list__item',
            listAnchor: 'list__item__anchor'
          },
          options: this.props.options,
          filterOption: this.props.filterOption,
          fixedOptions: this.props.fixedOptions,
          placeholder: 'Search',
          onOptionSelected: this._selectItem,
          customListComponent: this.props.DropDownRenderComponent,
          customListHeaderComponent: this.props.DropdownHeaderComponent,
          customListItemComponent: this.props.DropDownLineItemRenderComponent,
          displayOption: _accessor2.default.generateOptionToStringFor(this.props.displayOption),
          searchable: this.props.searchable,
          showOptionsWhenEmpty: true,
          selectedItems: _toArray(this.props.selectedItems)
        })
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var selected = _toArray(this.props.selectedItems);
      var hasValue = selected.length;
      var displayOption = _accessor2.default.generateOptionToStringFor(this.props.displayOption);

      var dropdownSelectProps = {
        className: (0, _classnames2.default)('item-selector__dropdown', {
          active: this.state.showTypeahead
        }),
        disabled: this.props.disabled,
        onClick: this._showTypeahead,
        onFocus: this._showPopover,
        error: this.props.isError,
        inputTheme: this.props.inputTheme
      };

      return _react2.default.createElement(
        'div',
        { className: 'item-selector' },
        _react2.default.createElement(
          'div',
          { style: { position: 'relative' } },
          this.props.multiSelect ? _react2.default.createElement(_chickletedInput2.default, (0, _extends3.default)({}, dropdownSelectProps, {
            selectedItems: _toArray(this.props.selectedItems),
            placeholder: this.props.placeholder,
            displayOption: displayOption,
            removeItem: this._removeItem
          })) : _react2.default.createElement(
            StyledDropdownSelect,
            dropdownSelectProps,
            _react2.default.createElement(
              DropdownSelectValue,
              { placeholder: !hasValue },
              hasValue ? _react2.default.createElement(this.props.DropDownLineItemRenderComponent, {
                displayOption: displayOption,
                value: selected[0]
              }) : this.props.placeholder
            ),
            this.props.erasable && hasValue ? _react2.default.createElement(
              DropdownSelectErase,
              null,
              _react2.default.createElement(_icons.Delete, { height: '12px', onClick: this._onErase })
            ) : null
          ),
          this.state.showTypeahead && this._renderDropdown()
        )
      );
    }
  }]);
  return ItemSelector;
}(_react.Component), _class.propTypes = {
  // required properties
  selectedItems: _propTypes2.default.oneOfType([_propTypes2.default.array, _propTypes2.default.string, _propTypes2.default.number, _propTypes2.default.bool, _propTypes2.default.object]),
  onChange: _propTypes2.default.func.isRequired,
  options: _propTypes2.default.arrayOf(_propTypes2.default.any).isRequired,

  // optional properties
  fixedOptions: _propTypes2.default.arrayOf(_propTypes2.default.any),
  erasable: _propTypes2.default.bool,
  displayOption: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.func]),
  getOptionValue: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.func]),
  filterOption: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.func]),
  placement: _propTypes2.default.string,
  disabled: _propTypes2.default.bool,
  isError: _propTypes2.default.bool,
  multiSelect: _propTypes2.default.bool,
  inputTheme: _propTypes2.default.string,
  onBlur: _propTypes2.default.func,
  placeholder: _propTypes2.default.string,
  closeOnSelect: _propTypes2.default.bool,
  DropdownHeaderComponent: _propTypes2.default.func,
  DropDownRenderComponent: _propTypes2.default.func,
  DropDownLineItemRenderComponent: _propTypes2.default.func
}, _class.defaultProps = {
  erasable: false,
  placement: 'bottom',
  selectedItems: [],
  displayOption: null,
  getOptionValue: null,
  filterOption: null,
  fixedOptions: null,
  inputTheme: 'primary',
  multiSelect: true,
  placeholder: 'Enter a value',
  closeOnSelect: true,
  searchable: true,
  dropdownHeader: null,
  DropdownHeaderComponent: null,
  DropDownRenderComponent: _dropdownList2.default,
  DropDownLineItemRenderComponent: _dropdownList.ListItem
}, _temp2);
;

exports.default = (0, _reactOnclickoutside2.default)(ItemSelector);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2NvbW1vbi9pdGVtLXNlbGVjdG9yL2l0ZW0tc2VsZWN0b3IuanMiXSwibmFtZXMiOlsiX3RvQXJyYXkiLCJpdGVtIiwiQXJyYXkiLCJpc0FycmF5IiwiU3R5bGVkRHJvcGRvd25TZWxlY3QiLCJzdHlsZWQiLCJkaXYiLCJwcm9wcyIsImlucHV0VGhlbWUiLCJ0aGVtZSIsInNlY29uZGFyeUlucHV0IiwiaW5wdXQiLCJkcm9wZG93bkxpc3RBbmNob3IiLCJEcm9wZG93blNlbGVjdFZhbHVlIiwic3BhbiIsInBsYWNlaG9sZGVyIiwic2VsZWN0Q29sb3JQbGFjZUhvbGRlciIsInNlbGVjdENvbG9yIiwiRHJvcGRvd25TZWxlY3RFcmFzZSIsIkRyb3Bkb3duV3JhcHBlciIsImRyb3Bkb3duQmdkIiwicGxhY2VtZW50IiwiaW5wdXRCb3hIZWlnaHQiLCJJdGVtU2VsZWN0b3IiLCJzdGF0ZSIsInNob3dUeXBlYWhlYWQiLCJoYW5kbGVDbGlja091dHNpZGUiLCJfaGlkZVR5cGVhaGVhZCIsIl9vbkJsdXIiLCJvbkJsdXIiLCJfcmVtb3ZlSXRlbSIsImUiLCJwcmV2ZW50RGVmYXVsdCIsInN0b3BQcm9wYWdhdGlvbiIsInNlbGVjdGVkSXRlbXMiLCJpbmRleCIsImZpbmRJbmRleCIsInQiLCJpdGVtcyIsInNsaWNlIiwibGVuZ3RoIiwib25DaGFuZ2UiLCJjbG9zZU9uU2VsZWN0Iiwic2V0U3RhdGUiLCJfc2VsZWN0SXRlbSIsImdldFZhbHVlIiwiQWNjZXNzb3IiLCJnZW5lcmF0ZU9wdGlvblRvU3RyaW5nRm9yIiwiZ2V0T3B0aW9uVmFsdWUiLCJkaXNwbGF5T3B0aW9uIiwicHJldmlvdXNTZWxlY3RlZCIsIm11bHRpU2VsZWN0IiwiY29uY2F0IiwibWFwIiwiX29uRXJhc2UiLCJfc2hvd1R5cGVhaGVhZCIsImRpc2FibGVkIiwicmVzdWx0cyIsImxpc3RJdGVtIiwibGlzdEFuY2hvciIsIm9wdGlvbnMiLCJmaWx0ZXJPcHRpb24iLCJmaXhlZE9wdGlvbnMiLCJEcm9wRG93blJlbmRlckNvbXBvbmVudCIsIkRyb3Bkb3duSGVhZGVyQ29tcG9uZW50IiwiRHJvcERvd25MaW5lSXRlbVJlbmRlckNvbXBvbmVudCIsInNlYXJjaGFibGUiLCJzZWxlY3RlZCIsImhhc1ZhbHVlIiwiZHJvcGRvd25TZWxlY3RQcm9wcyIsImNsYXNzTmFtZSIsImFjdGl2ZSIsIm9uQ2xpY2siLCJvbkZvY3VzIiwiX3Nob3dQb3BvdmVyIiwiZXJyb3IiLCJpc0Vycm9yIiwicG9zaXRpb24iLCJlcmFzYWJsZSIsIl9yZW5kZXJEcm9wZG93biIsIkNvbXBvbmVudCIsInByb3BUeXBlcyIsIlByb3BUeXBlcyIsIm9uZU9mVHlwZSIsImFycmF5Iiwic3RyaW5nIiwibnVtYmVyIiwiYm9vbCIsIm9iamVjdCIsImZ1bmMiLCJpc1JlcXVpcmVkIiwiYXJyYXlPZiIsImFueSIsImRlZmF1bHRQcm9wcyIsImRyb3Bkb3duSGVhZGVyIiwiRHJvcGRvd25MaXN0IiwiTGlzdEl0ZW0iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozt1WkFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFFQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7Ozs7O0FBRUE7Ozs7Ozs7O0FBUUEsU0FBU0EsUUFBVCxDQUFrQkMsSUFBbEIsRUFBd0I7QUFDdEIsTUFBSUMsTUFBTUMsT0FBTixDQUFjRixJQUFkLENBQUosRUFBeUI7QUFDdkIsV0FBT0EsSUFBUDtBQUNEOztBQUVELE1BQUksT0FBT0EsSUFBUCxLQUFnQixXQUFoQixJQUErQkEsU0FBUyxJQUE1QyxFQUFrRDtBQUNoRCxXQUFPLEVBQVA7QUFDRDs7QUFFRCxTQUFPLENBQUNBLElBQUQsQ0FBUDtBQUNEOztBQUVELElBQU1HLHVCQUF1QkMsMkJBQU9DLEdBQTlCLGtCQUNGO0FBQUEsU0FDQUMsTUFBTUMsVUFBTixLQUFxQixXQUFyQixHQUNJRCxNQUFNRSxLQUFOLENBQVlDLGNBRGhCLEdBRUlILE1BQU1FLEtBQU4sQ0FBWUUsS0FIaEI7QUFBQSxDQURFLEVBT0E7QUFBQSxTQUFTSixNQUFNRSxLQUFOLENBQVlHLGtCQUFyQjtBQUFBLENBUEEsQ0FBTjs7QUFXQSxJQUFNQyxzQkFBc0JSLDJCQUFPUyxJQUE3QixtQkFDSztBQUFBLFNBQ1BQLE1BQU1RLFdBQU4sR0FDSVIsTUFBTUUsS0FBTixDQUFZTyxzQkFEaEIsR0FFSVQsTUFBTUUsS0FBTixDQUFZUSxXQUhUO0FBQUEsQ0FETCxDQUFOOztBQVFBLElBQU1DLHNCQUFzQmIsMkJBQU9DLEdBQTdCLGtCQUFOOztBQUtBLElBQU1hLGtCQUFrQmQsMkJBQU9DLEdBQXpCLG1CQUNVO0FBQUEsU0FBU0MsTUFBTUUsS0FBTixDQUFZVyxXQUFyQjtBQUFBLENBRFYsRUFPTTtBQUFBLFNBQ1JiLE1BQU1jLFNBQU4sS0FBb0IsS0FBcEIsR0FBNEJkLE1BQU1FLEtBQU4sQ0FBWWEsY0FBeEMsR0FBeUQsTUFEakQ7QUFBQSxDQVBOLEVBU1U7QUFBQSxTQUFVZixNQUFNYyxTQUFOLEtBQW9CLFFBQXBCLEdBQStCLEtBQS9CLEdBQXVDLE1BQWpEO0FBQUEsQ0FUVixFQVVhO0FBQUEsU0FBVWQsTUFBTWMsU0FBTixLQUFvQixLQUFwQixHQUE0QixLQUE1QixHQUFvQyxNQUE5QztBQUFBLENBVmIsQ0FBTjs7SUFhTUUsWTs7Ozs7Ozs7Ozs7Ozs7Z05BbURKQyxLLEdBQVE7QUFDTkMscUJBQWU7QUFEVCxLLFFBSVJDLGtCLEdBQXFCLFlBQU07QUFDekIsWUFBS0MsY0FBTDtBQUNELEssUUFPREMsTyxHQUFVLFlBQU07QUFDZDtBQUNBO0FBQ0EsVUFBSSxNQUFLckIsS0FBTCxDQUFXc0IsTUFBZixFQUF1QjtBQUNyQixjQUFLdEIsS0FBTCxDQUFXc0IsTUFBWDtBQUNEO0FBQ0YsSyxRQUVEQyxXLEdBQWMsVUFBQzdCLElBQUQsRUFBTzhCLENBQVAsRUFBYTtBQUN6QjtBQUNBQSxRQUFFQyxjQUFGO0FBQ0FELFFBQUVFLGVBQUY7QUFIeUIsVUFJbEJDLGFBSmtCLEdBSUQsTUFBSzNCLEtBSkosQ0FJbEIyQixhQUprQjs7QUFLekIsVUFBTUMsUUFBUUQsY0FBY0UsU0FBZCxDQUF3QjtBQUFBLGVBQUtDLE1BQU1wQyxJQUFYO0FBQUEsT0FBeEIsQ0FBZDs7QUFFQSxVQUFJa0MsUUFBUSxDQUFaLEVBQWU7QUFDYjtBQUNEOztBQUVELFVBQU1HLG1EQUNESixjQUFjSyxLQUFkLENBQW9CLENBQXBCLEVBQXVCSixLQUF2QixDQURDLG9DQUVERCxjQUFjSyxLQUFkLENBQW9CSixRQUFRLENBQTVCLEVBQStCRCxjQUFjTSxNQUE3QyxDQUZDLEVBQU47O0FBS0EsWUFBS2pDLEtBQUwsQ0FBV2tDLFFBQVgsQ0FBb0JILEtBQXBCOztBQUVBLFVBQUksTUFBSy9CLEtBQUwsQ0FBV21DLGFBQWYsRUFBOEI7QUFDNUIsY0FBS0MsUUFBTCxDQUFjLEVBQUNsQixlQUFlLEtBQWhCLEVBQWQ7QUFDQSxjQUFLRyxPQUFMO0FBQ0Q7QUFDRixLLFFBRURnQixXLEdBQWMsZ0JBQVE7QUFDcEIsVUFBTUMsV0FBV0MsbUJBQVNDLHlCQUFULENBQ2YsTUFBS3hDLEtBQUwsQ0FBV3lDLGNBQVgsSUFBNkIsTUFBS3pDLEtBQUwsQ0FBVzBDLGFBRHpCLENBQWpCOztBQUlBLFVBQU1DLG1CQUFtQmxELFNBQVMsTUFBS08sS0FBTCxDQUFXMkIsYUFBcEIsQ0FBekI7O0FBRUEsVUFBSSxNQUFLM0IsS0FBTCxDQUFXNEMsV0FBZixFQUE0QjtBQUMxQixZQUFNYixRQUFRLHNCQUFLWSxpQkFBaUJFLE1BQWpCLENBQXdCcEQsU0FBU0MsSUFBVCxFQUFlb0QsR0FBZixDQUFtQlIsUUFBbkIsQ0FBeEIsQ0FBTCxDQUFkO0FBQ0EsY0FBS3RDLEtBQUwsQ0FBV2tDLFFBQVgsQ0FBb0JILEtBQXBCO0FBQ0QsT0FIRCxNQUdPO0FBQ0wsY0FBSy9CLEtBQUwsQ0FBV2tDLFFBQVgsQ0FBb0JJLFNBQVM1QyxJQUFULENBQXBCO0FBQ0Q7O0FBRUQsVUFBSSxNQUFLTSxLQUFMLENBQVdtQyxhQUFmLEVBQThCO0FBQzVCLGNBQUtDLFFBQUwsQ0FBYyxFQUFDbEIsZUFBZSxLQUFoQixFQUFkO0FBQ0EsY0FBS0csT0FBTDtBQUNEO0FBQ0YsSyxRQUVEMEIsUSxHQUFXLGFBQUs7QUFDZHZCLFFBQUVFLGVBQUY7QUFDQSxZQUFLMUIsS0FBTCxDQUFXa0MsUUFBWCxDQUFvQixJQUFwQjtBQUNELEssUUFFRGMsYyxHQUFpQixZQUFNO0FBQ3JCLFVBQUksQ0FBQyxNQUFLaEQsS0FBTCxDQUFXaUQsUUFBaEIsRUFBMEI7QUFDeEIsY0FBS2IsUUFBTCxDQUFjO0FBQ1psQix5QkFBZTtBQURILFNBQWQ7QUFHRDtBQUNGLEs7Ozs7O3FDQXBFZ0I7QUFDZixXQUFLa0IsUUFBTCxDQUFjLEVBQUNsQixlQUFlLEtBQWhCLEVBQWQ7QUFDQSxXQUFLRyxPQUFMO0FBQ0Q7OztzQ0FtRWlCO0FBQ2hCLGFBQ0U7QUFBQyx1QkFBRDtBQUFBLFVBQWlCLFdBQVcsS0FBS3JCLEtBQUwsQ0FBV2MsU0FBdkM7QUFDRSxzQ0FBQyxtQkFBRDtBQUNFLHlCQUFlO0FBQ2JvQyxxQkFBUyxlQURJO0FBRWI5QyxtQkFBTyxrQkFGTTtBQUdiK0Msc0JBQVUsWUFIRztBQUliQyx3QkFBWTtBQUpDLFdBRGpCO0FBT0UsbUJBQVMsS0FBS3BELEtBQUwsQ0FBV3FELE9BUHRCO0FBUUUsd0JBQWMsS0FBS3JELEtBQUwsQ0FBV3NELFlBUjNCO0FBU0Usd0JBQWMsS0FBS3RELEtBQUwsQ0FBV3VELFlBVDNCO0FBVUUsdUJBQVksUUFWZDtBQVdFLDRCQUFrQixLQUFLbEIsV0FYekI7QUFZRSwrQkFBcUIsS0FBS3JDLEtBQUwsQ0FBV3dELHVCQVpsQztBQWFFLHFDQUEyQixLQUFLeEQsS0FBTCxDQUFXeUQsdUJBYnhDO0FBY0UsbUNBQXlCLEtBQUt6RCxLQUFMLENBQVcwRCwrQkFkdEM7QUFlRSx5QkFBZW5CLG1CQUFTQyx5QkFBVCxDQUNiLEtBQUt4QyxLQUFMLENBQVcwQyxhQURFLENBZmpCO0FBa0JFLHNCQUFZLEtBQUsxQyxLQUFMLENBQVcyRCxVQWxCekI7QUFtQkUsb0NBbkJGO0FBb0JFLHlCQUFlbEUsU0FBUyxLQUFLTyxLQUFMLENBQVcyQixhQUFwQjtBQXBCakI7QUFERixPQURGO0FBMEJEOzs7NkJBRVE7QUFDUCxVQUFNaUMsV0FBV25FLFNBQVMsS0FBS08sS0FBTCxDQUFXMkIsYUFBcEIsQ0FBakI7QUFDQSxVQUFNa0MsV0FBV0QsU0FBUzNCLE1BQTFCO0FBQ0EsVUFBTVMsZ0JBQWdCSCxtQkFBU0MseUJBQVQsQ0FDcEIsS0FBS3hDLEtBQUwsQ0FBVzBDLGFBRFMsQ0FBdEI7O0FBSUEsVUFBTW9CLHNCQUFzQjtBQUMxQkMsbUJBQVcscURBQXNDO0FBQy9DQyxrQkFBUSxLQUFLL0MsS0FBTCxDQUFXQztBQUQ0QixTQUF0QyxDQURlO0FBSTFCK0Isa0JBQVUsS0FBS2pELEtBQUwsQ0FBV2lELFFBSks7QUFLMUJnQixpQkFBUyxLQUFLakIsY0FMWTtBQU0xQmtCLGlCQUFTLEtBQUtDLFlBTlk7QUFPMUJDLGVBQU8sS0FBS3BFLEtBQUwsQ0FBV3FFLE9BUFE7QUFRMUJwRSxvQkFBWSxLQUFLRCxLQUFMLENBQVdDO0FBUkcsT0FBNUI7O0FBV0EsYUFDRTtBQUFBO0FBQUEsVUFBSyxXQUFVLGVBQWY7QUFDRTtBQUFBO0FBQUEsWUFBSyxPQUFPLEVBQUNxRSxVQUFVLFVBQVgsRUFBWjtBQUVHLGVBQUt0RSxLQUFMLENBQVc0QyxXQUFYLEdBQ0MsOEJBQUMseUJBQUQsNkJBQ01rQixtQkFETjtBQUVFLDJCQUFlckUsU0FBUyxLQUFLTyxLQUFMLENBQVcyQixhQUFwQixDQUZqQjtBQUdFLHlCQUFhLEtBQUszQixLQUFMLENBQVdRLFdBSDFCO0FBSUUsMkJBQWVrQyxhQUpqQjtBQUtFLHdCQUFZLEtBQUtuQjtBQUxuQixhQURELEdBU0M7QUFBQyxnQ0FBRDtBQUEwQnVDLCtCQUExQjtBQUNFO0FBQUMsaUNBQUQ7QUFBQSxnQkFBcUIsYUFBYSxDQUFDRCxRQUFuQztBQUNHQSx5QkFDQyxtQ0FBTSxLQUFOLENBQVksK0JBQVo7QUFDRSwrQkFBZW5CLGFBRGpCO0FBRUUsdUJBQU9rQixTQUFTLENBQVQ7QUFGVCxnQkFERCxHQU1DLEtBQUs1RCxLQUFMLENBQVdRO0FBUGYsYUFERjtBQVdHLGlCQUFLUixLQUFMLENBQVd1RSxRQUFYLElBQXVCVixRQUF2QixHQUNDO0FBQUMsaUNBQUQ7QUFBQTtBQUNFLDRDQUFDLGFBQUQsSUFBUSxRQUFPLE1BQWYsRUFBc0IsU0FBUyxLQUFLZCxRQUFwQztBQURGLGFBREQsR0FJRztBQWZOLFdBWEo7QUE4QkcsZUFBSzlCLEtBQUwsQ0FBV0MsYUFBWCxJQUE0QixLQUFLc0QsZUFBTDtBQTlCL0I7QUFERixPQURGO0FBb0NEOzs7RUFwTndCQyxnQixVQUNsQkMsUyxHQUFZO0FBQ2pCO0FBQ0EvQyxpQkFBZWdELG9CQUFVQyxTQUFWLENBQW9CLENBQ2pDRCxvQkFBVUUsS0FEdUIsRUFFakNGLG9CQUFVRyxNQUZ1QixFQUdqQ0gsb0JBQVVJLE1BSHVCLEVBSWpDSixvQkFBVUssSUFKdUIsRUFLakNMLG9CQUFVTSxNQUx1QixDQUFwQixDQUZFO0FBU2pCL0MsWUFBVXlDLG9CQUFVTyxJQUFWLENBQWVDLFVBVFI7QUFVakI5QixXQUFTc0Isb0JBQVVTLE9BQVYsQ0FBa0JULG9CQUFVVSxHQUE1QixFQUFpQ0YsVUFWekI7O0FBWWpCO0FBQ0E1QixnQkFBY29CLG9CQUFVUyxPQUFWLENBQWtCVCxvQkFBVVUsR0FBNUIsQ0FiRztBQWNqQmQsWUFBVUksb0JBQVVLLElBZEg7QUFlakJ0QyxpQkFBZWlDLG9CQUFVQyxTQUFWLENBQW9CLENBQUNELG9CQUFVRyxNQUFYLEVBQW1CSCxvQkFBVU8sSUFBN0IsQ0FBcEIsQ0FmRTtBQWdCakJ6QyxrQkFBZ0JrQyxvQkFBVUMsU0FBVixDQUFvQixDQUFDRCxvQkFBVUcsTUFBWCxFQUFtQkgsb0JBQVVPLElBQTdCLENBQXBCLENBaEJDO0FBaUJqQjVCLGdCQUFjcUIsb0JBQVVDLFNBQVYsQ0FBb0IsQ0FBQ0Qsb0JBQVVHLE1BQVgsRUFBbUJILG9CQUFVTyxJQUE3QixDQUFwQixDQWpCRztBQWtCakJwRSxhQUFXNkQsb0JBQVVHLE1BbEJKO0FBbUJqQjdCLFlBQVUwQixvQkFBVUssSUFuQkg7QUFvQmpCWCxXQUFTTSxvQkFBVUssSUFwQkY7QUFxQmpCcEMsZUFBYStCLG9CQUFVSyxJQXJCTjtBQXNCakIvRSxjQUFZMEUsb0JBQVVHLE1BdEJMO0FBdUJqQnhELFVBQVFxRCxvQkFBVU8sSUF2QkQ7QUF3QmpCMUUsZUFBYW1FLG9CQUFVRyxNQXhCTjtBQXlCakIzQyxpQkFBZXdDLG9CQUFVSyxJQXpCUjtBQTBCakJ2QiwyQkFBeUJrQixvQkFBVU8sSUExQmxCO0FBMkJqQjFCLDJCQUF5Qm1CLG9CQUFVTyxJQTNCbEI7QUE0QmpCeEIsbUNBQWlDaUIsb0JBQVVPO0FBNUIxQixDLFNBK0JaSSxZLEdBQWU7QUFDcEJmLFlBQVUsS0FEVTtBQUVwQnpELGFBQVcsUUFGUztBQUdwQmEsaUJBQWUsRUFISztBQUlwQmUsaUJBQWUsSUFKSztBQUtwQkQsa0JBQWdCLElBTEk7QUFNcEJhLGdCQUFjLElBTk07QUFPcEJDLGdCQUFjLElBUE07QUFRcEJ0RCxjQUFZLFNBUlE7QUFTcEIyQyxlQUFhLElBVE87QUFVcEJwQyxlQUFhLGVBVk87QUFXcEIyQixpQkFBZSxJQVhLO0FBWXBCd0IsY0FBWSxJQVpRO0FBYXBCNEIsa0JBQWdCLElBYkk7QUFjcEI5QiwyQkFBeUIsSUFkTDtBQWVwQkQsMkJBQXlCZ0Msc0JBZkw7QUFnQnBCOUIsbUNBQWlDK0I7QUFoQmIsQztBQXFMdkI7O2tCQUVjLG1DQUFzQnpFLFlBQXRCLEMiLCJmaWxlIjoiaXRlbS1zZWxlY3Rvci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgMjAxOCBVYmVyIFRlY2hub2xvZ2llcywgSW5jLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbi8vIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbi8vIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbi8vIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbi8vIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuLy8gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuLy8gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4vLyBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbi8vIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbi8vIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4vLyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4vLyBUSEUgU09GVFdBUkUuXG5cbmltcG9ydCBSZWFjdCwge0NvbXBvbmVudH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCBjbGFzc25hbWVzIGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0IHVuaXEgZnJvbSAnbG9kYXNoLnVuaXEnO1xuaW1wb3J0IGxpc3RlbnNUb0NsaWNrT3V0c2lkZSBmcm9tICdyZWFjdC1vbmNsaWNrb3V0c2lkZSc7XG5pbXBvcnQgc3R5bGVkIGZyb20gJ3N0eWxlZC1jb21wb25lbnRzJztcblxuaW1wb3J0IEFjY2Vzc29yIGZyb20gJy4vYWNjZXNzb3InO1xuaW1wb3J0IENoaWNrbGV0ZWRJbnB1dCBmcm9tICcuL2NoaWNrbGV0ZWQtaW5wdXQnO1xuaW1wb3J0IFR5cGVhaGVhZCBmcm9tICcuL3R5cGVhaGVhZCc7XG5pbXBvcnQge0RlbGV0ZX0gZnJvbSAnY29tcG9uZW50cy9jb21tb24vaWNvbnMnO1xuaW1wb3J0IERyb3Bkb3duTGlzdCwge0xpc3RJdGVtfSBmcm9tICcuL2Ryb3Bkb3duLWxpc3QnO1xuXG4vKipcbiAqIENvbnZlcnRzIG5vbi1hcnJheXMgdG8gYXJyYXlzLiAgTGVhdmVzIGFycmF5cyBhbG9uZS4gIENvbnZlcnRzXG4gKiB1bmRlZmluZWQgdmFsdWVzIHRvIGVtcHR5IGFycmF5cyAoW10gaW5zdGVhZCBvZiBbdW5kZWZpbmVkXSkuXG4gKiBPdGhlcndpc2UsIGp1c3QgcmV0dXJucyBbaXRlbV0gZm9yIG5vbi1hcnJheSBpdGVtcy5cbiAqXG4gKiBAcGFyYW0geyp9IGl0ZW1cbiAqIEByZXR1cm5zIHthcnJheX0gYm9vbSEgbXVjaCBhcnJheS4gdmVyeSBpbmRleGVkLiBzbyB1c2VmdWwuXG4gKi9cbmZ1bmN0aW9uIF90b0FycmF5KGl0ZW0pIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkoaXRlbSkpIHtcbiAgICByZXR1cm4gaXRlbTtcbiAgfVxuXG4gIGlmICh0eXBlb2YgaXRlbSA9PT0gJ3VuZGVmaW5lZCcgfHwgaXRlbSA9PT0gbnVsbCkge1xuICAgIHJldHVybiBbXTtcbiAgfVxuXG4gIHJldHVybiBbaXRlbV07XG59XG5cbmNvbnN0IFN0eWxlZERyb3Bkb3duU2VsZWN0ID0gc3R5bGVkLmRpdmBcbiAgJHtwcm9wcyA9PlxuICAgIHByb3BzLmlucHV0VGhlbWUgPT09ICdzZWNvbmRhcnknXG4gICAgICA/IHByb3BzLnRoZW1lLnNlY29uZGFyeUlucHV0XG4gICAgICA6IHByb3BzLnRoZW1lLmlucHV0fTtcblxuICAubGlzdF9faXRlbV9fYW5jaG9yIHtcbiAgICAke3Byb3BzID0+IHByb3BzLnRoZW1lLmRyb3Bkb3duTGlzdEFuY2hvcn07XG4gIH1cbmA7XG5cbmNvbnN0IERyb3Bkb3duU2VsZWN0VmFsdWUgPSBzdHlsZWQuc3BhbmBcbiAgY29sb3I6ICR7cHJvcHMgPT5cbiAgICBwcm9wcy5wbGFjZWhvbGRlclxuICAgICAgPyBwcm9wcy50aGVtZS5zZWxlY3RDb2xvclBsYWNlSG9sZGVyXG4gICAgICA6IHByb3BzLnRoZW1lLnNlbGVjdENvbG9yfTtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbmA7XG5cbmNvbnN0IERyb3Bkb3duU2VsZWN0RXJhc2UgPSBzdHlsZWQuZGl2YFxuICBtYXJnaW4tbGVmdDogNnB4O1xuICBkaXNwbGF5OiBmbGV4O1xuYDtcblxuY29uc3QgRHJvcGRvd25XcmFwcGVyID0gc3R5bGVkLmRpdmBcbiAgYmFja2dyb3VuZDogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5kcm9wZG93bkJnZH07XG4gIGJvcmRlcjogMDtcbiAgd2lkdGg6IDEwMCU7XG4gIGxlZnQ6IDA7XG4gIHotaW5kZXg6IDEwMDtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICBib3R0b206ICR7cHJvcHMgPT5cbiAgICBwcm9wcy5wbGFjZW1lbnQgPT09ICd0b3AnID8gcHJvcHMudGhlbWUuaW5wdXRCb3hIZWlnaHQgOiAnYXV0byd9O1xuICBtYXJnaW4tdG9wOiAke3Byb3BzID0+IChwcm9wcy5wbGFjZW1lbnQgPT09ICdib3R0b20nID8gJzRweCcgOiAnYXV0bycpfTtcbiAgbWFyZ2luLWJvdHRvbTogJHtwcm9wcyA9PiAocHJvcHMucGxhY2VtZW50ID09PSAndG9wJyA/ICc0cHgnIDogJ2F1dG8nKX07XG5gO1xuXG5jbGFzcyBJdGVtU2VsZWN0b3IgZXh0ZW5kcyBDb21wb25lbnQge1xuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIC8vIHJlcXVpcmVkIHByb3BlcnRpZXNcbiAgICBzZWxlY3RlZEl0ZW1zOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtcbiAgICAgIFByb3BUeXBlcy5hcnJheSxcbiAgICAgIFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICBQcm9wVHlwZXMubnVtYmVyLFxuICAgICAgUHJvcFR5cGVzLmJvb2wsXG4gICAgICBQcm9wVHlwZXMub2JqZWN0XG4gICAgXSksXG4gICAgb25DaGFuZ2U6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgb3B0aW9uczogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLmFueSkuaXNSZXF1aXJlZCxcblxuICAgIC8vIG9wdGlvbmFsIHByb3BlcnRpZXNcbiAgICBmaXhlZE9wdGlvbnM6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5hbnkpLFxuICAgIGVyYXNhYmxlOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBkaXNwbGF5T3B0aW9uOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuc3RyaW5nLCBQcm9wVHlwZXMuZnVuY10pLFxuICAgIGdldE9wdGlvblZhbHVlOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuc3RyaW5nLCBQcm9wVHlwZXMuZnVuY10pLFxuICAgIGZpbHRlck9wdGlvbjogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLnN0cmluZywgUHJvcFR5cGVzLmZ1bmNdKSxcbiAgICBwbGFjZW1lbnQ6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgZGlzYWJsZWQ6IFByb3BUeXBlcy5ib29sLFxuICAgIGlzRXJyb3I6IFByb3BUeXBlcy5ib29sLFxuICAgIG11bHRpU2VsZWN0OiBQcm9wVHlwZXMuYm9vbCxcbiAgICBpbnB1dFRoZW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIG9uQmx1cjogUHJvcFR5cGVzLmZ1bmMsXG4gICAgcGxhY2Vob2xkZXI6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgY2xvc2VPblNlbGVjdDogUHJvcFR5cGVzLmJvb2wsXG4gICAgRHJvcGRvd25IZWFkZXJDb21wb25lbnQ6IFByb3BUeXBlcy5mdW5jLFxuICAgIERyb3BEb3duUmVuZGVyQ29tcG9uZW50OiBQcm9wVHlwZXMuZnVuYyxcbiAgICBEcm9wRG93bkxpbmVJdGVtUmVuZGVyQ29tcG9uZW50OiBQcm9wVHlwZXMuZnVuY1xuICB9O1xuXG4gIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgZXJhc2FibGU6IGZhbHNlLFxuICAgIHBsYWNlbWVudDogJ2JvdHRvbScsXG4gICAgc2VsZWN0ZWRJdGVtczogW10sXG4gICAgZGlzcGxheU9wdGlvbjogbnVsbCxcbiAgICBnZXRPcHRpb25WYWx1ZTogbnVsbCxcbiAgICBmaWx0ZXJPcHRpb246IG51bGwsXG4gICAgZml4ZWRPcHRpb25zOiBudWxsLFxuICAgIGlucHV0VGhlbWU6ICdwcmltYXJ5JyxcbiAgICBtdWx0aVNlbGVjdDogdHJ1ZSxcbiAgICBwbGFjZWhvbGRlcjogJ0VudGVyIGEgdmFsdWUnLFxuICAgIGNsb3NlT25TZWxlY3Q6IHRydWUsXG4gICAgc2VhcmNoYWJsZTogdHJ1ZSxcbiAgICBkcm9wZG93bkhlYWRlcjogbnVsbCxcbiAgICBEcm9wZG93bkhlYWRlckNvbXBvbmVudDogbnVsbCxcbiAgICBEcm9wRG93blJlbmRlckNvbXBvbmVudDogRHJvcGRvd25MaXN0LFxuICAgIERyb3BEb3duTGluZUl0ZW1SZW5kZXJDb21wb25lbnQ6IExpc3RJdGVtXG4gIH07XG5cbiAgc3RhdGUgPSB7XG4gICAgc2hvd1R5cGVhaGVhZDogZmFsc2VcbiAgfTtcblxuICBoYW5kbGVDbGlja091dHNpZGUgPSAoKSA9PiB7XG4gICAgdGhpcy5faGlkZVR5cGVhaGVhZCgpO1xuICB9O1xuXG4gIF9oaWRlVHlwZWFoZWFkKCkge1xuICAgIHRoaXMuc2V0U3RhdGUoe3Nob3dUeXBlYWhlYWQ6IGZhbHNlfSk7XG4gICAgdGhpcy5fb25CbHVyKCk7XG4gIH1cblxuICBfb25CbHVyID0gKCkgPT4ge1xuICAgIC8vIG5vdGU6IGNoaWNrbGV0ZWQgaW5wdXQgaXMgbm90IGEgcmVhbCBmb3JtIGVsZW1lbnQgc28gd2UgY2FsbCBvbkJsdXIoKVxuICAgIC8vIHdoZW4gd2UgZmVlbCB0aGUgZXZlbnRzIGFyZSBhcHByb3ByaWF0ZVxuICAgIGlmICh0aGlzLnByb3BzLm9uQmx1cikge1xuICAgICAgdGhpcy5wcm9wcy5vbkJsdXIoKTtcbiAgICB9XG4gIH07XG5cbiAgX3JlbW92ZUl0ZW0gPSAoaXRlbSwgZSkgPT4ge1xuICAgIC8vIG9ubHkgdXNlZCB3aGVuIG11bHRpU2VsZWN0ID0gdHJ1ZVxuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIGNvbnN0IHtzZWxlY3RlZEl0ZW1zfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgaW5kZXggPSBzZWxlY3RlZEl0ZW1zLmZpbmRJbmRleCh0ID0+IHQgPT09IGl0ZW0pO1xuXG4gICAgaWYgKGluZGV4IDwgMCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IGl0ZW1zID0gW1xuICAgICAgLi4uc2VsZWN0ZWRJdGVtcy5zbGljZSgwLCBpbmRleCksXG4gICAgICAuLi5zZWxlY3RlZEl0ZW1zLnNsaWNlKGluZGV4ICsgMSwgc2VsZWN0ZWRJdGVtcy5sZW5ndGgpXG4gICAgXTtcblxuICAgIHRoaXMucHJvcHMub25DaGFuZ2UoaXRlbXMpO1xuXG4gICAgaWYgKHRoaXMucHJvcHMuY2xvc2VPblNlbGVjdCkge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7c2hvd1R5cGVhaGVhZDogZmFsc2V9KTtcbiAgICAgIHRoaXMuX29uQmx1cigpO1xuICAgIH1cbiAgfTtcblxuICBfc2VsZWN0SXRlbSA9IGl0ZW0gPT4ge1xuICAgIGNvbnN0IGdldFZhbHVlID0gQWNjZXNzb3IuZ2VuZXJhdGVPcHRpb25Ub1N0cmluZ0ZvcihcbiAgICAgIHRoaXMucHJvcHMuZ2V0T3B0aW9uVmFsdWUgfHwgdGhpcy5wcm9wcy5kaXNwbGF5T3B0aW9uXG4gICAgKTtcblxuICAgIGNvbnN0IHByZXZpb3VzU2VsZWN0ZWQgPSBfdG9BcnJheSh0aGlzLnByb3BzLnNlbGVjdGVkSXRlbXMpO1xuXG4gICAgaWYgKHRoaXMucHJvcHMubXVsdGlTZWxlY3QpIHtcbiAgICAgIGNvbnN0IGl0ZW1zID0gdW5pcShwcmV2aW91c1NlbGVjdGVkLmNvbmNhdChfdG9BcnJheShpdGVtKS5tYXAoZ2V0VmFsdWUpKSk7XG4gICAgICB0aGlzLnByb3BzLm9uQ2hhbmdlKGl0ZW1zKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5wcm9wcy5vbkNoYW5nZShnZXRWYWx1ZShpdGVtKSk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMucHJvcHMuY2xvc2VPblNlbGVjdCkge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7c2hvd1R5cGVhaGVhZDogZmFsc2V9KTtcbiAgICAgIHRoaXMuX29uQmx1cigpO1xuICAgIH1cbiAgfTtcblxuICBfb25FcmFzZSA9IGUgPT4ge1xuICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgdGhpcy5wcm9wcy5vbkNoYW5nZShudWxsKTtcbiAgfTtcblxuICBfc2hvd1R5cGVhaGVhZCA9ICgpID0+IHtcbiAgICBpZiAoIXRoaXMucHJvcHMuZGlzYWJsZWQpIHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICBzaG93VHlwZWFoZWFkOiB0cnVlXG4gICAgICB9KTtcbiAgICB9XG4gIH07XG5cbiAgX3JlbmRlckRyb3Bkb3duKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8RHJvcGRvd25XcmFwcGVyIHBsYWNlbWVudD17dGhpcy5wcm9wcy5wbGFjZW1lbnR9PlxuICAgICAgICA8VHlwZWFoZWFkXG4gICAgICAgICAgY3VzdG9tQ2xhc3Nlcz17e1xuICAgICAgICAgICAgcmVzdWx0czogJ2xpc3Qtc2VsZWN0b3InLFxuICAgICAgICAgICAgaW5wdXQ6ICd0eXBlYWhlYWRfX2lucHV0JyxcbiAgICAgICAgICAgIGxpc3RJdGVtOiAnbGlzdF9faXRlbScsXG4gICAgICAgICAgICBsaXN0QW5jaG9yOiAnbGlzdF9faXRlbV9fYW5jaG9yJ1xuICAgICAgICAgIH19XG4gICAgICAgICAgb3B0aW9ucz17dGhpcy5wcm9wcy5vcHRpb25zfVxuICAgICAgICAgIGZpbHRlck9wdGlvbj17dGhpcy5wcm9wcy5maWx0ZXJPcHRpb259XG4gICAgICAgICAgZml4ZWRPcHRpb25zPXt0aGlzLnByb3BzLmZpeGVkT3B0aW9uc31cbiAgICAgICAgICBwbGFjZWhvbGRlcj1cIlNlYXJjaFwiXG4gICAgICAgICAgb25PcHRpb25TZWxlY3RlZD17dGhpcy5fc2VsZWN0SXRlbX1cbiAgICAgICAgICBjdXN0b21MaXN0Q29tcG9uZW50PXt0aGlzLnByb3BzLkRyb3BEb3duUmVuZGVyQ29tcG9uZW50fVxuICAgICAgICAgIGN1c3RvbUxpc3RIZWFkZXJDb21wb25lbnQ9e3RoaXMucHJvcHMuRHJvcGRvd25IZWFkZXJDb21wb25lbnR9XG4gICAgICAgICAgY3VzdG9tTGlzdEl0ZW1Db21wb25lbnQ9e3RoaXMucHJvcHMuRHJvcERvd25MaW5lSXRlbVJlbmRlckNvbXBvbmVudH1cbiAgICAgICAgICBkaXNwbGF5T3B0aW9uPXtBY2Nlc3Nvci5nZW5lcmF0ZU9wdGlvblRvU3RyaW5nRm9yKFxuICAgICAgICAgICAgdGhpcy5wcm9wcy5kaXNwbGF5T3B0aW9uXG4gICAgICAgICAgKX1cbiAgICAgICAgICBzZWFyY2hhYmxlPXt0aGlzLnByb3BzLnNlYXJjaGFibGV9XG4gICAgICAgICAgc2hvd09wdGlvbnNXaGVuRW1wdHlcbiAgICAgICAgICBzZWxlY3RlZEl0ZW1zPXtfdG9BcnJheSh0aGlzLnByb3BzLnNlbGVjdGVkSXRlbXMpfVxuICAgICAgICAvPlxuICAgICAgPC9Ecm9wZG93bldyYXBwZXI+XG4gICAgKTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCBzZWxlY3RlZCA9IF90b0FycmF5KHRoaXMucHJvcHMuc2VsZWN0ZWRJdGVtcyk7XG4gICAgY29uc3QgaGFzVmFsdWUgPSBzZWxlY3RlZC5sZW5ndGg7XG4gICAgY29uc3QgZGlzcGxheU9wdGlvbiA9IEFjY2Vzc29yLmdlbmVyYXRlT3B0aW9uVG9TdHJpbmdGb3IoXG4gICAgICB0aGlzLnByb3BzLmRpc3BsYXlPcHRpb25cbiAgICApO1xuXG4gICAgY29uc3QgZHJvcGRvd25TZWxlY3RQcm9wcyA9IHtcbiAgICAgIGNsYXNzTmFtZTogY2xhc3NuYW1lcyhgaXRlbS1zZWxlY3Rvcl9fZHJvcGRvd25gLCB7XG4gICAgICAgIGFjdGl2ZTogdGhpcy5zdGF0ZS5zaG93VHlwZWFoZWFkXG4gICAgICB9KSxcbiAgICAgIGRpc2FibGVkOiB0aGlzLnByb3BzLmRpc2FibGVkLFxuICAgICAgb25DbGljazogdGhpcy5fc2hvd1R5cGVhaGVhZCxcbiAgICAgIG9uRm9jdXM6IHRoaXMuX3Nob3dQb3BvdmVyLFxuICAgICAgZXJyb3I6IHRoaXMucHJvcHMuaXNFcnJvcixcbiAgICAgIGlucHV0VGhlbWU6IHRoaXMucHJvcHMuaW5wdXRUaGVtZVxuICAgIH07XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJpdGVtLXNlbGVjdG9yXCI+XG4gICAgICAgIDxkaXYgc3R5bGU9e3twb3NpdGlvbjogJ3JlbGF0aXZlJ319PlxuICAgICAgICAgIHsvKiB0aGlzIHBhcnQgaXMgdXNlZCB0byBkaXNwbGF5IHRoZSBsYWJlbCAqL31cbiAgICAgICAgICB7dGhpcy5wcm9wcy5tdWx0aVNlbGVjdCA/IChcbiAgICAgICAgICAgIDxDaGlja2xldGVkSW5wdXRcbiAgICAgICAgICAgICAgey4uLmRyb3Bkb3duU2VsZWN0UHJvcHN9XG4gICAgICAgICAgICAgIHNlbGVjdGVkSXRlbXM9e190b0FycmF5KHRoaXMucHJvcHMuc2VsZWN0ZWRJdGVtcyl9XG4gICAgICAgICAgICAgIHBsYWNlaG9sZGVyPXt0aGlzLnByb3BzLnBsYWNlaG9sZGVyfVxuICAgICAgICAgICAgICBkaXNwbGF5T3B0aW9uPXtkaXNwbGF5T3B0aW9ufVxuICAgICAgICAgICAgICByZW1vdmVJdGVtPXt0aGlzLl9yZW1vdmVJdGVtfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICApIDogKFxuICAgICAgICAgICAgPFN0eWxlZERyb3Bkb3duU2VsZWN0IHsuLi5kcm9wZG93blNlbGVjdFByb3BzfT5cbiAgICAgICAgICAgICAgPERyb3Bkb3duU2VsZWN0VmFsdWUgcGxhY2Vob2xkZXI9eyFoYXNWYWx1ZX0+XG4gICAgICAgICAgICAgICAge2hhc1ZhbHVlID8gKFxuICAgICAgICAgICAgICAgICAgPHRoaXMucHJvcHMuRHJvcERvd25MaW5lSXRlbVJlbmRlckNvbXBvbmVudFxuICAgICAgICAgICAgICAgICAgICBkaXNwbGF5T3B0aW9uPXtkaXNwbGF5T3B0aW9ufVxuICAgICAgICAgICAgICAgICAgICB2YWx1ZT17c2VsZWN0ZWRbMF19XG4gICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgICAgICB0aGlzLnByb3BzLnBsYWNlaG9sZGVyXG4gICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgPC9Ecm9wZG93blNlbGVjdFZhbHVlPlxuICAgICAgICAgICAgICB7dGhpcy5wcm9wcy5lcmFzYWJsZSAmJiBoYXNWYWx1ZSA/IChcbiAgICAgICAgICAgICAgICA8RHJvcGRvd25TZWxlY3RFcmFzZT5cbiAgICAgICAgICAgICAgICAgIDxEZWxldGUgaGVpZ2h0PVwiMTJweFwiIG9uQ2xpY2s9e3RoaXMuX29uRXJhc2V9IC8+XG4gICAgICAgICAgICAgICAgPC9Ecm9wZG93blNlbGVjdEVyYXNlPlxuICAgICAgICAgICAgICApIDogbnVsbH1cbiAgICAgICAgICAgIDwvU3R5bGVkRHJvcGRvd25TZWxlY3Q+XG4gICAgICAgICAgKX1cbiAgICAgICAgICB7LyogdGhpcyBwYXJ0IGlzIHVzZWQgdG8gYnVpbHQgdGhlIGxpc3QgKi99XG4gICAgICAgICAge3RoaXMuc3RhdGUuc2hvd1R5cGVhaGVhZCAmJiB0aGlzLl9yZW5kZXJEcm9wZG93bigpfVxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IGxpc3RlbnNUb0NsaWNrT3V0c2lkZShJdGVtU2VsZWN0b3IpO1xuIl19