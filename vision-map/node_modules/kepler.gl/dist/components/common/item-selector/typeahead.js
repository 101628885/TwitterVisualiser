'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

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

var _templateObject = (0, _taggedTemplateLiteral3.default)(['\n  display: flex;\n  flex-direction: column;\n  background-color: ', ';\n  box-shadow: ', ';\n\n  :focus {\n    outline: 0;\n  }\n'], ['\n  display: flex;\n  flex-direction: column;\n  background-color: ', ';\n  box-shadow: ', ';\n\n  :focus {\n    outline: 0;\n  }\n']),
    _templateObject2 = (0, _taggedTemplateLiteral3.default)(['\n  padding: 8px;\n'], ['\n  padding: 8px;\n']),
    _templateObject3 = (0, _taggedTemplateLiteral3.default)(['\n  ', '\n  :hover {\n    cursor: pointer;\n    background-color: ', ';\n  }\n'], ['\n  ', '\n  :hover {\n    cursor: pointer;\n    background-color: ', ';\n  }\n']),
    _templateObject4 = (0, _taggedTemplateLiteral3.default)(['\n  position: absolute;\n  right: 15px;\n  top: 14px;\n  color: ', ';\n'], ['\n  position: absolute;\n  right: 15px;\n  top: 14px;\n  color: ', ';\n']); // Copyright (c) 2018 Uber Technologies, Inc.
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

var _fuzzy = require('fuzzy');

var _fuzzy2 = _interopRequireDefault(_fuzzy);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _window = require('global/window');

var _accessor = require('./accessor');

var _accessor2 = _interopRequireDefault(_accessor);

var _keyevent = require('./keyevent');

var _keyevent2 = _interopRequireDefault(_keyevent);

var _dropdownList = require('./dropdown-list');

var _dropdownList2 = _interopRequireDefault(_dropdownList);

var _icons = require('../icons');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DEFAULT_CLASS = 'typeahead';
/**
 * Copied mostly from 'react-typeahead', an auto-completing text input
 *
 * Renders an text input that shows options nearby that you can use the
 * keyboard or mouse to select.
 */

var TypeaheadWrapper = _styledComponents2.default.div(_templateObject, function (props) {
  return props.theme.dropdownListBgd;
}, function (props) {
  return props.theme.dropdownListShadow;
});

var InputBox = _styledComponents2.default.div(_templateObject2);

var TypeaheadInput = _styledComponents2.default.input(_templateObject3, function (props) {
  return props.theme.secondaryInput;
}, function (props) {
  return props.theme.secondaryInputBgd;
});

var InputIcon = _styledComponents2.default.div(_templateObject4, function (props) {
  return props.theme.inputPlaceholderColor;
});

var Typeahead = (_temp = _class = function (_Component) {
  (0, _inherits3.default)(Typeahead, _Component);

  function Typeahead(props) {
    (0, _classCallCheck3.default)(this, Typeahead);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Typeahead.__proto__ || Object.getPrototypeOf(Typeahead)).call(this, props));

    _this._onOptionSelected = function (option, event) {
      if (_this.props.searchable) {
        // reset entry input
        _this.setState({
          searchResults: _this.getOptionsForValue('', _this.props.options),
          selection: '',
          entryValue: ''
        });
      }

      return _this.props.onOptionSelected(option, event);
    };

    _this._onTextEntryUpdated = function () {
      if (_this.props.searchable) {
        var value = _this.entry.value;

        _this.setState({
          searchResults: _this.getOptionsForValue(value, _this.props.options),
          selection: '',
          entryValue: value
        });
      }
    };

    _this._onEnter = function (event) {
      var selection = _this.getSelection();
      if (!selection) {
        return _this.props.onKeyDown(event);
      }
      return _this._onOptionSelected(selection, event);
    };

    _this.navDown = function () {
      _this._nav(1);
    };

    _this.navUp = function () {
      _this._nav(-1);
    };

    _this._onChange = function (event) {
      if (_this.props.onChange) {
        _this.props.onChange(event);
      }

      _this._onTextEntryUpdated();
    };

    _this._onKeyDown = function (event) {
      // If there are no visible elements, don't perform selector navigation.
      // Just pass this up to the upstream onKeydown handler.
      // Also skip if the user is pressing the shift key, since none of our handlers are looking for shift
      if (!_this._hasHint() || event.shiftKey) {
        return _this.props.onKeyDown(event);
      }

      var handler = _this.eventMap()[event.keyCode];

      if (handler) {
        handler(event);
      } else {
        return _this.props.onKeyDown(event);
      }
      // Don't propagate the keystroke back to the DOM/browser
      event.preventDefault();
    };

    _this._onFocus = function (event) {
      _this.setState({ isFocused: true });
      if (_this.props.onFocus) {
        return _this.props.onFocus(event);
      }
    };

    _this._onBlur = function (event) {
      _this.setState({ isFocused: false });
      if (_this.props.onBlur) {
        return _this.props.onBlur(event);
      }
    };

    _this.state = {
      searchResults: _this.getOptionsForValue(_this.props.initialValue, _this.props.options),

      // This should be called something else, 'entryValue'
      entryValue: _this.props.value || _this.props.initialValue,

      // A valid typeahead value
      selection: _this.props.value,

      // Index of the selection
      selectionIndex: null,

      // Keep track of the focus state of the input element, to determine
      // whether to show options when empty (if showOptionsWhenEmpty is true)
      isFocused: false
    };
    return _this;
  }

  (0, _createClass3.default)(Typeahead, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.setState({
        searchResults: this.getOptionsForValue('', this.props.options)
      });

      // call focus on entry or div to trigger key events listener
      if (this.entry) {
        this.entry.focus();
      } else {
        this.root.focus();
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var searchResults = this.getOptionsForValue(this.state.entryValue, nextProps.options);

      this.setState({ searchResults: searchResults });
    }
  }, {
    key: '_shouldSkipSearch',
    value: function _shouldSkipSearch(input) {
      var emptyValue = !input || input.trim().length === 0;

      // this.state must be checked because it may not be defined yet if this function
      // is called from within getInitialState
      var isFocused = this.state && this.state.isFocused;
      return !(this.props.showOptionsWhenEmpty && isFocused) && emptyValue;
    }
  }, {
    key: 'getOptionsForValue',
    value: function getOptionsForValue(value, options) {
      if (!this.props.searchable) {
        // directly pass through options if can not be searched
        return options;
      }
      if (this._shouldSkipSearch(value)) {
        return options;
      }

      var searchOptions = this._generateSearchFunction();
      return searchOptions(value, options);
    }
  }, {
    key: 'focus',
    value: function focus() {
      if (this.entry) {
        this.entry.focus();
      }
    }
  }, {
    key: '_hasCustomValue',
    value: function _hasCustomValue() {
      return this.props.allowCustomValues > 0 && this.state.entryValue.length >= this.props.allowCustomValues && this.state.searchResults.indexOf(this.state.entryValue) < 0;
    }
  }, {
    key: '_getCustomValue',
    value: function _getCustomValue() {
      return this._hasCustomValue() ? this.state.entryValue : null;
    }
  }, {
    key: '_renderIncrementalSearchResults',
    value: function _renderIncrementalSearchResults() {
      return _react2.default.createElement(this.props.customListComponent, {
        fixedOptions: this.props.fixedOptions,
        options: this.props.maxVisible ? this.state.searchResults.slice(0, this.props.maxVisible) : this.state.searchResults,
        areResultsTruncated: this.props.maxVisible && this.state.searchResults.length > this.props.maxVisible,
        resultsTruncatedMessage: this.props.resultsTruncatedMessage,
        onOptionSelected: this._onOptionSelected,
        allowCustomValues: this.props.allowCustomValues,
        customValue: this._getCustomValue(),
        customClasses: this.props.customClasses,
        customListItemComponent: this.props.customListItemComponent,
        customListHeaderComponent: this.props.customListHeaderComponent,
        selectionIndex: this.state.selectionIndex,
        defaultClassNames: this.props.defaultClassNames,
        displayOption: this.props.displayOption,
        selectedItems: this.props.selectedItems
      });
    }
  }, {
    key: 'getSelection',
    value: function getSelection() {
      var index = this.state.selectionIndex;

      if (this._hasCustomValue()) {
        if (index === 0) {
          return this.state.entryValue;
        }
        index--;
      }
      if (this._hasFixedOptions()) {
        return index < this.props.fixedOptions.length ? this.props.fixedOptions[index] : this.state.searchResults[index - this.props.fixedOptions.length];
      }
      return this.state.searchResults[index];
    }

    // use () => {} to avoid binding 'this'

  }, {
    key: '_onEscape',
    value: function _onEscape() {
      this.setState({
        selectionIndex: null
      });
    }
  }, {
    key: '_onTab',
    value: function _onTab(event) {
      var selection = this.getSelection();
      var option = selection ? selection : this.state.searchResults.length > 0 ? this.state.searchResults[0] : null;

      if (option === null && this._hasCustomValue()) {
        option = this._getCustomValue();
      }

      if (option !== null) {
        return this._onOptionSelected(option, event);
      }
    }
  }, {
    key: 'eventMap',
    value: function eventMap(event) {
      var events = {};

      events[_keyevent2.default.DOM_VK_UP] = this.navUp;
      events[_keyevent2.default.DOM_VK_DOWN] = this.navDown;
      events[_keyevent2.default.DOM_VK_RETURN] = events[_keyevent2.default.DOM_VK_ENTER] = this._onEnter;
      events[_keyevent2.default.DOM_VK_ESCAPE] = this._onEscape;
      events[_keyevent2.default.DOM_VK_TAB] = this._onTab;

      return events;
    }
  }, {
    key: '_nav',
    value: function _nav(delta) {
      if (!this._hasHint()) {
        return;
      }
      var newIndex = this.state.selectionIndex === null ? delta === 1 ? 0 : delta : this.state.selectionIndex + delta;
      var length = this.props.maxVisible ? this.state.searchResults.slice(0, this.props.maxVisible).length : this.state.searchResults.length;
      if (this._hasCustomValue()) {
        length += 1;
      }

      if (newIndex < 0) {
        newIndex += length;
      } else if (newIndex >= length) {
        newIndex -= length;
      }

      this.setState({ selectionIndex: newIndex });
    }
  }, {
    key: '_renderHiddenInput',
    value: function _renderHiddenInput() {
      if (!this.props.name) {
        return null;
      }

      return _react2.default.createElement('input', {
        type: 'hidden',
        name: this.props.name,
        value: this.state.selection
      });
    }
  }, {
    key: '_generateSearchFunction',
    value: function _generateSearchFunction() {
      var searchOptionsProp = this.props.searchOptions;
      var filterOptionProp = this.props.filterOption;
      if (typeof searchOptionsProp === 'function') {
        if (filterOptionProp !== null) {
          _window.console.warn('searchOptions prop is being used, filterOption prop will be ignored');
        }
        return searchOptionsProp;
      } else if (typeof filterOptionProp === 'function') {
        // use custom filter option
        return function (value, options) {
          return options.filter(function (o) {
            return filterOptionProp(value, o);
          });
        };
      }

      var mapper = typeof filterOptionProp === 'string' ? _accessor2.default.generateAccessor(filterOptionProp) : _accessor2.default.IDENTITY_FN;

      return function (value, options) {
        return _fuzzy2.default.filter(value, options, { extract: mapper }).map(function (res) {
          return options[res.index];
        });
      };
    }
  }, {
    key: '_hasHint',
    value: function _hasHint() {
      return this.state.searchResults.length > 0 || this._hasCustomValue();
    }
  }, {
    key: '_hasFixedOptions',
    value: function _hasFixedOptions() {
      return Array.isArray(this.props.fixedOptions) && this.props.fixedOptions.length;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var inputClasses = {};
      inputClasses[this.props.customClasses.input] = Boolean(this.props.customClasses.input);
      var inputClassList = (0, _classnames2.default)(inputClasses);

      var classes = (0, _defineProperty3.default)({}, DEFAULT_CLASS, this.props.defaultClassNames);
      classes[this.props.className] = Boolean(this.props.className);
      var classList = (0, _classnames2.default)(classes);

      return _react2.default.createElement(
        TypeaheadWrapper,
        {
          className: classList,
          innerRef: function innerRef(comp) {
            _this2.root = comp;
          },
          tabIndex: '0',
          onKeyDown: this._onKeyDown,
          onKeyPress: this.props.onKeyPress,
          onKeyUp: this.props.onKeyUp,
          onFocus: this._onFocus
        },
        this._renderHiddenInput(),
        this.props.searchable ? _react2.default.createElement(
          InputBox,
          null,
          _react2.default.createElement(TypeaheadInput, (0, _extends3.default)({
            innerRef: function innerRef(comp) {
              _this2.entry = comp;
            },
            type: 'text',
            disabled: this.props.disabled
          }, this.props.inputProps, {
            placeholder: this.props.placeholder,
            className: inputClassList,
            value: this.state.entryValue,
            onChange: this._onChange,
            onBlur: this._onBlur
          })),
          _react2.default.createElement(
            InputIcon,
            null,
            _react2.default.createElement(_icons.Search, { height: '18px' })
          )
        ) : null,
        this._renderIncrementalSearchResults()
      );
    }
  }]);
  return Typeahead;
}(_react.Component), _class.propTypes = {
  name: _propTypes2.default.string,
  customClasses: _propTypes2.default.object,
  maxVisible: _propTypes2.default.number,
  resultsTruncatedMessage: _propTypes2.default.string,
  options: _propTypes2.default.arrayOf(_propTypes2.default.any),
  fixedOptions: _propTypes2.default.arrayOf(_propTypes2.default.any),
  allowCustomValues: _propTypes2.default.number,
  initialValue: _propTypes2.default.string,
  value: _propTypes2.default.string,
  placeholder: _propTypes2.default.string,
  disabled: _propTypes2.default.bool,
  textarea: _propTypes2.default.bool,
  inputProps: _propTypes2.default.object,
  onOptionSelected: _propTypes2.default.func,
  onChange: _propTypes2.default.func,
  onKeyDown: _propTypes2.default.func,
  onKeyPress: _propTypes2.default.func,
  onKeyUp: _propTypes2.default.func,
  onFocus: _propTypes2.default.func,
  onBlur: _propTypes2.default.func,
  filterOption: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.func]),
  searchOptions: _propTypes2.default.func,
  displayOption: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.func]),
  inputDisplayOption: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.func]),
  formInputOption: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.func]),
  defaultClassNames: _propTypes2.default.bool,
  customListComponent: _propTypes2.default.oneOfType([_propTypes2.default.element, _propTypes2.default.func]),
  customListItemComponent: _propTypes2.default.oneOfType([_propTypes2.default.element, _propTypes2.default.func]),
  customListHeaderComponent: _propTypes2.default.oneOfType([_propTypes2.default.element, _propTypes2.default.func]),
  showOptionsWhenEmpty: _propTypes2.default.bool,
  searchable: _propTypes2.default.bool
}, _class.defaultProps = {
  options: [],
  customClasses: {},
  allowCustomValues: 0,
  initialValue: '',
  value: '',
  placeholder: '',
  disabled: false,
  textarea: false,
  inputProps: {},
  onOptionSelected: function onOptionSelected(option) {},
  onChange: function onChange(event) {},
  onKeyDown: function onKeyDown(event) {},
  onKeyPress: function onKeyPress(event) {},
  onKeyUp: function onKeyUp(event) {},
  onFocus: function onFocus(event) {},
  onBlur: function onBlur(event) {},

  filterOption: null,
  searchOptions: null,
  inputDisplayOption: null,
  defaultClassNames: true,
  customListComponent: _dropdownList2.default,
  customListItemComponent: _dropdownList.ListItem,
  customListHeaderComponent: null,
  showOptionsWhenEmpty: true,
  searchable: true,
  resultsTruncatedMessage: null
}, _temp);
exports.default = Typeahead;
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2NvbW1vbi9pdGVtLXNlbGVjdG9yL3R5cGVhaGVhZC5qcyJdLCJuYW1lcyI6WyJERUZBVUxUX0NMQVNTIiwiVHlwZWFoZWFkV3JhcHBlciIsInN0eWxlZCIsImRpdiIsInByb3BzIiwidGhlbWUiLCJkcm9wZG93bkxpc3RCZ2QiLCJkcm9wZG93bkxpc3RTaGFkb3ciLCJJbnB1dEJveCIsIlR5cGVhaGVhZElucHV0IiwiaW5wdXQiLCJzZWNvbmRhcnlJbnB1dCIsInNlY29uZGFyeUlucHV0QmdkIiwiSW5wdXRJY29uIiwiaW5wdXRQbGFjZWhvbGRlckNvbG9yIiwiVHlwZWFoZWFkIiwiX29uT3B0aW9uU2VsZWN0ZWQiLCJvcHRpb24iLCJldmVudCIsInNlYXJjaGFibGUiLCJzZXRTdGF0ZSIsInNlYXJjaFJlc3VsdHMiLCJnZXRPcHRpb25zRm9yVmFsdWUiLCJvcHRpb25zIiwic2VsZWN0aW9uIiwiZW50cnlWYWx1ZSIsIm9uT3B0aW9uU2VsZWN0ZWQiLCJfb25UZXh0RW50cnlVcGRhdGVkIiwidmFsdWUiLCJlbnRyeSIsIl9vbkVudGVyIiwiZ2V0U2VsZWN0aW9uIiwib25LZXlEb3duIiwibmF2RG93biIsIl9uYXYiLCJuYXZVcCIsIl9vbkNoYW5nZSIsIm9uQ2hhbmdlIiwiX29uS2V5RG93biIsIl9oYXNIaW50Iiwic2hpZnRLZXkiLCJoYW5kbGVyIiwiZXZlbnRNYXAiLCJrZXlDb2RlIiwicHJldmVudERlZmF1bHQiLCJfb25Gb2N1cyIsImlzRm9jdXNlZCIsIm9uRm9jdXMiLCJfb25CbHVyIiwib25CbHVyIiwic3RhdGUiLCJpbml0aWFsVmFsdWUiLCJzZWxlY3Rpb25JbmRleCIsImZvY3VzIiwicm9vdCIsIm5leHRQcm9wcyIsImVtcHR5VmFsdWUiLCJ0cmltIiwibGVuZ3RoIiwic2hvd09wdGlvbnNXaGVuRW1wdHkiLCJfc2hvdWxkU2tpcFNlYXJjaCIsInNlYXJjaE9wdGlvbnMiLCJfZ2VuZXJhdGVTZWFyY2hGdW5jdGlvbiIsImFsbG93Q3VzdG9tVmFsdWVzIiwiaW5kZXhPZiIsIl9oYXNDdXN0b21WYWx1ZSIsImZpeGVkT3B0aW9ucyIsIm1heFZpc2libGUiLCJzbGljZSIsInJlc3VsdHNUcnVuY2F0ZWRNZXNzYWdlIiwiX2dldEN1c3RvbVZhbHVlIiwiY3VzdG9tQ2xhc3NlcyIsImN1c3RvbUxpc3RJdGVtQ29tcG9uZW50IiwiY3VzdG9tTGlzdEhlYWRlckNvbXBvbmVudCIsImRlZmF1bHRDbGFzc05hbWVzIiwiZGlzcGxheU9wdGlvbiIsInNlbGVjdGVkSXRlbXMiLCJpbmRleCIsIl9oYXNGaXhlZE9wdGlvbnMiLCJldmVudHMiLCJLZXlFdmVudCIsIkRPTV9WS19VUCIsIkRPTV9WS19ET1dOIiwiRE9NX1ZLX1JFVFVSTiIsIkRPTV9WS19FTlRFUiIsIkRPTV9WS19FU0NBUEUiLCJfb25Fc2NhcGUiLCJET01fVktfVEFCIiwiX29uVGFiIiwiZGVsdGEiLCJuZXdJbmRleCIsIm5hbWUiLCJzZWFyY2hPcHRpb25zUHJvcCIsImZpbHRlck9wdGlvblByb3AiLCJmaWx0ZXJPcHRpb24iLCJDb25zb2xlIiwid2FybiIsImZpbHRlciIsIm8iLCJtYXBwZXIiLCJBY2Nlc3NvciIsImdlbmVyYXRlQWNjZXNzb3IiLCJJREVOVElUWV9GTiIsImZ1enp5IiwiZXh0cmFjdCIsIm1hcCIsInJlcyIsIkFycmF5IiwiaXNBcnJheSIsImlucHV0Q2xhc3NlcyIsIkJvb2xlYW4iLCJpbnB1dENsYXNzTGlzdCIsImNsYXNzZXMiLCJjbGFzc05hbWUiLCJjbGFzc0xpc3QiLCJjb21wIiwib25LZXlQcmVzcyIsIm9uS2V5VXAiLCJfcmVuZGVySGlkZGVuSW5wdXQiLCJkaXNhYmxlZCIsImlucHV0UHJvcHMiLCJwbGFjZWhvbGRlciIsIl9yZW5kZXJJbmNyZW1lbnRhbFNlYXJjaFJlc3VsdHMiLCJDb21wb25lbnQiLCJwcm9wVHlwZXMiLCJQcm9wVHlwZXMiLCJzdHJpbmciLCJvYmplY3QiLCJudW1iZXIiLCJhcnJheU9mIiwiYW55IiwiYm9vbCIsInRleHRhcmVhIiwiZnVuYyIsIm9uZU9mVHlwZSIsImlucHV0RGlzcGxheU9wdGlvbiIsImZvcm1JbnB1dE9wdGlvbiIsImN1c3RvbUxpc3RDb21wb25lbnQiLCJlbGVtZW50IiwiZGVmYXVsdFByb3BzIiwiRHJvcGRvd25MaXN0IiwiTGlzdEl0ZW0iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7dU5BQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOztBQUVBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBRUEsSUFBTUEsZ0JBQWdCLFdBQXRCO0FBQ0E7Ozs7Ozs7QUFPQSxJQUFNQyxtQkFBbUJDLDJCQUFPQyxHQUExQixrQkFHZ0I7QUFBQSxTQUFTQyxNQUFNQyxLQUFOLENBQVlDLGVBQXJCO0FBQUEsQ0FIaEIsRUFJVTtBQUFBLFNBQVNGLE1BQU1DLEtBQU4sQ0FBWUUsa0JBQXJCO0FBQUEsQ0FKVixDQUFOOztBQVdBLElBQU1DLFdBQVdOLDJCQUFPQyxHQUFsQixrQkFBTjs7QUFJQSxJQUFNTSxpQkFBaUJQLDJCQUFPUSxLQUF4QixtQkFDRjtBQUFBLFNBQVNOLE1BQU1DLEtBQU4sQ0FBWU0sY0FBckI7QUFBQSxDQURFLEVBSWtCO0FBQUEsU0FBU1AsTUFBTUMsS0FBTixDQUFZTyxpQkFBckI7QUFBQSxDQUpsQixDQUFOOztBQVFBLElBQU1DLFlBQVlYLDJCQUFPQyxHQUFuQixtQkFJSztBQUFBLFNBQVNDLE1BQU1DLEtBQU4sQ0FBWVMscUJBQXJCO0FBQUEsQ0FKTCxDQUFOOztJQU9xQkMsUzs7O0FBc0VuQixxQkFBWVgsS0FBWixFQUFtQjtBQUFBOztBQUFBLG9JQUNYQSxLQURXOztBQUFBLFVBbUluQlksaUJB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QUFjLElBakJNO0FBa0JwQmpDLGlCQUFlLElBbEJLO0FBbUJwQjBFLHNCQUFvQixJQW5CQTtBQW9CcEI3RCxxQkFBbUIsSUFwQkM7QUFxQnBCK0QsdUJBQXFCRyxzQkFyQkQ7QUFzQnBCcEUsMkJBQXlCcUUsc0JBdEJMO0FBdUJwQnBFLDZCQUEyQixJQXZCUDtBQXdCcEJkLHdCQUFzQixJQXhCRjtBQXlCcEJ4QyxjQUFZLElBekJRO0FBMEJwQmtELDJCQUF5QjtBQTFCTCxDO2tCQXpDSHRELFM7QUE4YnBCIiwiZmlsZSI6InR5cGVhaGVhZC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgMjAxOCBVYmVyIFRlY2hub2xvZ2llcywgSW5jLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbi8vIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbi8vIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbi8vIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbi8vIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuLy8gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuLy8gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4vLyBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbi8vIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbi8vIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4vLyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4vLyBUSEUgU09GVFdBUkUuXG5cbmltcG9ydCBSZWFjdCwge0NvbXBvbmVudH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCBmdXp6eSBmcm9tICdmdXp6eSc7XG5pbXBvcnQgY2xhc3NOYW1lcyBmcm9tICdjbGFzc25hbWVzJztcbmltcG9ydCBzdHlsZWQgZnJvbSAnc3R5bGVkLWNvbXBvbmVudHMnO1xuaW1wb3J0IHtjb25zb2xlIGFzIENvbnNvbGV9IGZyb20gJ2dsb2JhbC93aW5kb3cnO1xuXG5pbXBvcnQgQWNjZXNzb3IgZnJvbSAnLi9hY2Nlc3Nvcic7XG5pbXBvcnQgS2V5RXZlbnQgZnJvbSAnLi9rZXlldmVudCc7XG5pbXBvcnQgRHJvcGRvd25MaXN0LCB7TGlzdEl0ZW19IGZyb20gJy4vZHJvcGRvd24tbGlzdCc7XG5pbXBvcnQge1NlYXJjaH0gZnJvbSAnY29tcG9uZW50cy9jb21tb24vaWNvbnMnO1xuXG5jb25zdCBERUZBVUxUX0NMQVNTID0gJ3R5cGVhaGVhZCc7XG4vKipcbiAqIENvcGllZCBtb3N0bHkgZnJvbSAncmVhY3QtdHlwZWFoZWFkJywgYW4gYXV0by1jb21wbGV0aW5nIHRleHQgaW5wdXRcbiAqXG4gKiBSZW5kZXJzIGFuIHRleHQgaW5wdXQgdGhhdCBzaG93cyBvcHRpb25zIG5lYXJieSB0aGF0IHlvdSBjYW4gdXNlIHRoZVxuICoga2V5Ym9hcmQgb3IgbW91c2UgdG8gc2VsZWN0LlxuICovXG5cbmNvbnN0IFR5cGVhaGVhZFdyYXBwZXIgPSBzdHlsZWQuZGl2YFxuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAke3Byb3BzID0+IHByb3BzLnRoZW1lLmRyb3Bkb3duTGlzdEJnZH07XG4gIGJveC1zaGFkb3c6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUuZHJvcGRvd25MaXN0U2hhZG93fTtcblxuICA6Zm9jdXMge1xuICAgIG91dGxpbmU6IDA7XG4gIH1cbmA7XG5cbmNvbnN0IElucHV0Qm94ID0gc3R5bGVkLmRpdmBcbiAgcGFkZGluZzogOHB4O1xuYDtcblxuY29uc3QgVHlwZWFoZWFkSW5wdXQgPSBzdHlsZWQuaW5wdXRgXG4gICR7cHJvcHMgPT4gcHJvcHMudGhlbWUuc2Vjb25kYXJ5SW5wdXR9XG4gIDpob3ZlciB7XG4gICAgY3Vyc29yOiBwb2ludGVyO1xuICAgIGJhY2tncm91bmQtY29sb3I6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUuc2Vjb25kYXJ5SW5wdXRCZ2R9O1xuICB9XG5gO1xuXG5jb25zdCBJbnB1dEljb24gPSBzdHlsZWQuZGl2YFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHJpZ2h0OiAxNXB4O1xuICB0b3A6IDE0cHg7XG4gIGNvbG9yOiAke3Byb3BzID0+IHByb3BzLnRoZW1lLmlucHV0UGxhY2Vob2xkZXJDb2xvcn07XG5gO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUeXBlYWhlYWQgZXh0ZW5kcyBDb21wb25lbnQge1xuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIG5hbWU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgY3VzdG9tQ2xhc3NlczogUHJvcFR5cGVzLm9iamVjdCxcbiAgICBtYXhWaXNpYmxlOiBQcm9wVHlwZXMubnVtYmVyLFxuICAgIHJlc3VsdHNUcnVuY2F0ZWRNZXNzYWdlOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIG9wdGlvbnM6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5hbnkpLFxuICAgIGZpeGVkT3B0aW9uczogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLmFueSksXG4gICAgYWxsb3dDdXN0b21WYWx1ZXM6IFByb3BUeXBlcy5udW1iZXIsXG4gICAgaW5pdGlhbFZhbHVlOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIHZhbHVlOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIHBsYWNlaG9sZGVyOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGRpc2FibGVkOiBQcm9wVHlwZXMuYm9vbCxcbiAgICB0ZXh0YXJlYTogUHJvcFR5cGVzLmJvb2wsXG4gICAgaW5wdXRQcm9wczogUHJvcFR5cGVzLm9iamVjdCxcbiAgICBvbk9wdGlvblNlbGVjdGVkOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBvbkNoYW5nZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25LZXlEb3duOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBvbktleVByZXNzOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBvbktleVVwOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBvbkZvY3VzOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBvbkJsdXI6IFByb3BUeXBlcy5mdW5jLFxuICAgIGZpbHRlck9wdGlvbjogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLnN0cmluZywgUHJvcFR5cGVzLmZ1bmNdKSxcbiAgICBzZWFyY2hPcHRpb25zOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBkaXNwbGF5T3B0aW9uOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuc3RyaW5nLCBQcm9wVHlwZXMuZnVuY10pLFxuICAgIGlucHV0RGlzcGxheU9wdGlvbjogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLnN0cmluZywgUHJvcFR5cGVzLmZ1bmNdKSxcbiAgICBmb3JtSW5wdXRPcHRpb246IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5zdHJpbmcsIFByb3BUeXBlcy5mdW5jXSksXG4gICAgZGVmYXVsdENsYXNzTmFtZXM6IFByb3BUeXBlcy5ib29sLFxuICAgIGN1c3RvbUxpc3RDb21wb25lbnQ6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5lbGVtZW50LCBQcm9wVHlwZXMuZnVuY10pLFxuICAgIGN1c3RvbUxpc3RJdGVtQ29tcG9uZW50OiBQcm9wVHlwZXMub25lT2ZUeXBlKFtcbiAgICAgIFByb3BUeXBlcy5lbGVtZW50LFxuICAgICAgUHJvcFR5cGVzLmZ1bmNcbiAgICBdKSxcbiAgICBjdXN0b21MaXN0SGVhZGVyQ29tcG9uZW50OiBQcm9wVHlwZXMub25lT2ZUeXBlKFtcbiAgICAgIFByb3BUeXBlcy5lbGVtZW50LFxuICAgICAgUHJvcFR5cGVzLmZ1bmNcbiAgICBdKSxcbiAgICBzaG93T3B0aW9uc1doZW5FbXB0eTogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2VhcmNoYWJsZTogUHJvcFR5cGVzLmJvb2xcbiAgfTtcblxuICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgIG9wdGlvbnM6IFtdLFxuICAgIGN1c3RvbUNsYXNzZXM6IHt9LFxuICAgIGFsbG93Q3VzdG9tVmFsdWVzOiAwLFxuICAgIGluaXRpYWxWYWx1ZTogJycsXG4gICAgdmFsdWU6ICcnLFxuICAgIHBsYWNlaG9sZGVyOiAnJyxcbiAgICBkaXNhYmxlZDogZmFsc2UsXG4gICAgdGV4dGFyZWE6IGZhbHNlLFxuICAgIGlucHV0UHJvcHM6IHt9LFxuICAgIG9uT3B0aW9uU2VsZWN0ZWQob3B0aW9uKSB7fSxcbiAgICBvbkNoYW5nZShldmVudCkge30sXG4gICAgb25LZXlEb3duKGV2ZW50KSB7fSxcbiAgICBvbktleVByZXNzKGV2ZW50KSB7fSxcbiAgICBvbktleVVwKGV2ZW50KSB7fSxcbiAgICBvbkZvY3VzKGV2ZW50KSB7fSxcbiAgICBvbkJsdXIoZXZlbnQpIHt9LFxuICAgIGZpbHRlck9wdGlvbjogbnVsbCxcbiAgICBzZWFyY2hPcHRpb25zOiBudWxsLFxuICAgIGlucHV0RGlzcGxheU9wdGlvbjogbnVsbCxcbiAgICBkZWZhdWx0Q2xhc3NOYW1lczogdHJ1ZSxcbiAgICBjdXN0b21MaXN0Q29tcG9uZW50OiBEcm9wZG93bkxpc3QsXG4gICAgY3VzdG9tTGlzdEl0ZW1Db21wb25lbnQ6IExpc3RJdGVtLFxuICAgIGN1c3RvbUxpc3RIZWFkZXJDb21wb25lbnQ6IG51bGwsXG4gICAgc2hvd09wdGlvbnNXaGVuRW1wdHk6IHRydWUsXG4gICAgc2VhcmNoYWJsZTogdHJ1ZSxcbiAgICByZXN1bHRzVHJ1bmNhdGVkTWVzc2FnZTogbnVsbFxuICB9O1xuXG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuXG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIHNlYXJjaFJlc3VsdHM6IHRoaXMuZ2V0T3B0aW9uc0ZvclZhbHVlKFxuICAgICAgICB0aGlzLnByb3BzLmluaXRpYWxWYWx1ZSxcbiAgICAgICAgdGhpcy5wcm9wcy5vcHRpb25zXG4gICAgICApLFxuXG4gICAgICAvLyBUaGlzIHNob3VsZCBiZSBjYWxsZWQgc29tZXRoaW5nIGVsc2UsICdlbnRyeVZhbHVlJ1xuICAgICAgZW50cnlWYWx1ZTogdGhpcy5wcm9wcy52YWx1ZSB8fCB0aGlzLnByb3BzLmluaXRpYWxWYWx1ZSxcblxuICAgICAgLy8gQSB2YWxpZCB0eXBlYWhlYWQgdmFsdWVcbiAgICAgIHNlbGVjdGlvbjogdGhpcy5wcm9wcy52YWx1ZSxcblxuICAgICAgLy8gSW5kZXggb2YgdGhlIHNlbGVjdGlvblxuICAgICAgc2VsZWN0aW9uSW5kZXg6IG51bGwsXG5cbiAgICAgIC8vIEtlZXAgdHJhY2sgb2YgdGhlIGZvY3VzIHN0YXRlIG9mIHRoZSBpbnB1dCBlbGVtZW50LCB0byBkZXRlcm1pbmVcbiAgICAgIC8vIHdoZXRoZXIgdG8gc2hvdyBvcHRpb25zIHdoZW4gZW1wdHkgKGlmIHNob3dPcHRpb25zV2hlbkVtcHR5IGlzIHRydWUpXG4gICAgICBpc0ZvY3VzZWQ6IGZhbHNlXG4gICAgfTtcbiAgfVxuXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgc2VhcmNoUmVzdWx0czogdGhpcy5nZXRPcHRpb25zRm9yVmFsdWUoJycsIHRoaXMucHJvcHMub3B0aW9ucylcbiAgICB9KTtcblxuICAgIC8vIGNhbGwgZm9jdXMgb24gZW50cnkgb3IgZGl2IHRvIHRyaWdnZXIga2V5IGV2ZW50cyBsaXN0ZW5lclxuICAgIGlmICh0aGlzLmVudHJ5KSB7XG4gICAgICB0aGlzLmVudHJ5LmZvY3VzKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucm9vdC5mb2N1cygpO1xuICAgIH1cbiAgfVxuXG4gIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzKSB7XG4gICAgY29uc3Qgc2VhcmNoUmVzdWx0cyA9IHRoaXMuZ2V0T3B0aW9uc0ZvclZhbHVlKFxuICAgICAgdGhpcy5zdGF0ZS5lbnRyeVZhbHVlLFxuICAgICAgbmV4dFByb3BzLm9wdGlvbnNcbiAgICApO1xuXG4gICAgdGhpcy5zZXRTdGF0ZSh7c2VhcmNoUmVzdWx0c30pO1xuICB9XG5cbiAgX3Nob3VsZFNraXBTZWFyY2goaW5wdXQpIHtcbiAgICBjb25zdCBlbXB0eVZhbHVlID0gIWlucHV0IHx8IGlucHV0LnRyaW0oKS5sZW5ndGggPT09IDA7XG5cbiAgICAvLyB0aGlzLnN0YXRlIG11c3QgYmUgY2hlY2tlZCBiZWNhdXNlIGl0IG1heSBub3QgYmUgZGVmaW5lZCB5ZXQgaWYgdGhpcyBmdW5jdGlvblxuICAgIC8vIGlzIGNhbGxlZCBmcm9tIHdpdGhpbiBnZXRJbml0aWFsU3RhdGVcbiAgICBjb25zdCBpc0ZvY3VzZWQgPSB0aGlzLnN0YXRlICYmIHRoaXMuc3RhdGUuaXNGb2N1c2VkO1xuICAgIHJldHVybiAhKHRoaXMucHJvcHMuc2hvd09wdGlvbnNXaGVuRW1wdHkgJiYgaXNGb2N1c2VkKSAmJiBlbXB0eVZhbHVlO1xuICB9XG5cbiAgZ2V0T3B0aW9uc0ZvclZhbHVlKHZhbHVlLCBvcHRpb25zKSB7XG4gICAgaWYgKCF0aGlzLnByb3BzLnNlYXJjaGFibGUpIHtcbiAgICAgIC8vIGRpcmVjdGx5IHBhc3MgdGhyb3VnaCBvcHRpb25zIGlmIGNhbiBub3QgYmUgc2VhcmNoZWRcbiAgICAgIHJldHVybiBvcHRpb25zO1xuICAgIH1cbiAgICBpZiAodGhpcy5fc2hvdWxkU2tpcFNlYXJjaCh2YWx1ZSkpIHtcbiAgICAgIHJldHVybiBvcHRpb25zO1xuICAgIH1cblxuICAgIGNvbnN0IHNlYXJjaE9wdGlvbnMgPSB0aGlzLl9nZW5lcmF0ZVNlYXJjaEZ1bmN0aW9uKCk7XG4gICAgcmV0dXJuIHNlYXJjaE9wdGlvbnModmFsdWUsIG9wdGlvbnMpO1xuICB9XG5cbiAgZm9jdXMoKSB7XG4gICAgaWYgKHRoaXMuZW50cnkpIHtcbiAgICAgIHRoaXMuZW50cnkuZm9jdXMoKTtcbiAgICB9XG4gIH1cblxuICBfaGFzQ3VzdG9tVmFsdWUoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIHRoaXMucHJvcHMuYWxsb3dDdXN0b21WYWx1ZXMgPiAwICYmXG4gICAgICB0aGlzLnN0YXRlLmVudHJ5VmFsdWUubGVuZ3RoID49IHRoaXMucHJvcHMuYWxsb3dDdXN0b21WYWx1ZXMgJiZcbiAgICAgIHRoaXMuc3RhdGUuc2VhcmNoUmVzdWx0cy5pbmRleE9mKHRoaXMuc3RhdGUuZW50cnlWYWx1ZSkgPCAwXG4gICAgKTtcbiAgfVxuXG4gIF9nZXRDdXN0b21WYWx1ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5faGFzQ3VzdG9tVmFsdWUoKSA/IHRoaXMuc3RhdGUuZW50cnlWYWx1ZSA6IG51bGw7XG4gIH1cblxuICBfcmVuZGVySW5jcmVtZW50YWxTZWFyY2hSZXN1bHRzKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8dGhpcy5wcm9wcy5jdXN0b21MaXN0Q29tcG9uZW50XG4gICAgICAgIGZpeGVkT3B0aW9ucz17dGhpcy5wcm9wcy5maXhlZE9wdGlvbnN9XG4gICAgICAgIG9wdGlvbnM9e1xuICAgICAgICAgIHRoaXMucHJvcHMubWF4VmlzaWJsZVxuICAgICAgICAgICAgPyB0aGlzLnN0YXRlLnNlYXJjaFJlc3VsdHMuc2xpY2UoMCwgdGhpcy5wcm9wcy5tYXhWaXNpYmxlKVxuICAgICAgICAgICAgOiB0aGlzLnN0YXRlLnNlYXJjaFJlc3VsdHNcbiAgICAgICAgfVxuICAgICAgICBhcmVSZXN1bHRzVHJ1bmNhdGVkPXtcbiAgICAgICAgICB0aGlzLnByb3BzLm1heFZpc2libGUgJiZcbiAgICAgICAgICB0aGlzLnN0YXRlLnNlYXJjaFJlc3VsdHMubGVuZ3RoID4gdGhpcy5wcm9wcy5tYXhWaXNpYmxlXG4gICAgICAgIH1cbiAgICAgICAgcmVzdWx0c1RydW5jYXRlZE1lc3NhZ2U9e3RoaXMucHJvcHMucmVzdWx0c1RydW5jYXRlZE1lc3NhZ2V9XG4gICAgICAgIG9uT3B0aW9uU2VsZWN0ZWQ9e3RoaXMuX29uT3B0aW9uU2VsZWN0ZWR9XG4gICAgICAgIGFsbG93Q3VzdG9tVmFsdWVzPXt0aGlzLnByb3BzLmFsbG93Q3VzdG9tVmFsdWVzfVxuICAgICAgICBjdXN0b21WYWx1ZT17dGhpcy5fZ2V0Q3VzdG9tVmFsdWUoKX1cbiAgICAgICAgY3VzdG9tQ2xhc3Nlcz17dGhpcy5wcm9wcy5jdXN0b21DbGFzc2VzfVxuICAgICAgICBjdXN0b21MaXN0SXRlbUNvbXBvbmVudD17dGhpcy5wcm9wcy5jdXN0b21MaXN0SXRlbUNvbXBvbmVudH1cbiAgICAgICAgY3VzdG9tTGlzdEhlYWRlckNvbXBvbmVudD17dGhpcy5wcm9wcy5jdXN0b21MaXN0SGVhZGVyQ29tcG9uZW50fVxuICAgICAgICBzZWxlY3Rpb25JbmRleD17dGhpcy5zdGF0ZS5zZWxlY3Rpb25JbmRleH1cbiAgICAgICAgZGVmYXVsdENsYXNzTmFtZXM9e3RoaXMucHJvcHMuZGVmYXVsdENsYXNzTmFtZXN9XG4gICAgICAgIGRpc3BsYXlPcHRpb249e3RoaXMucHJvcHMuZGlzcGxheU9wdGlvbn1cbiAgICAgICAgc2VsZWN0ZWRJdGVtcz17dGhpcy5wcm9wcy5zZWxlY3RlZEl0ZW1zfVxuICAgICAgLz5cbiAgICApO1xuICB9XG5cbiAgZ2V0U2VsZWN0aW9uKCkge1xuICAgIGxldCBpbmRleCA9IHRoaXMuc3RhdGUuc2VsZWN0aW9uSW5kZXg7XG5cbiAgICBpZiAodGhpcy5faGFzQ3VzdG9tVmFsdWUoKSkge1xuICAgICAgaWYgKGluZGV4ID09PSAwKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnN0YXRlLmVudHJ5VmFsdWU7XG4gICAgICB9XG4gICAgICBpbmRleC0tO1xuICAgIH1cbiAgICBpZiAodGhpcy5faGFzRml4ZWRPcHRpb25zKCkpIHtcbiAgICAgIHJldHVybiBpbmRleCA8IHRoaXMucHJvcHMuZml4ZWRPcHRpb25zLmxlbmd0aFxuICAgICAgICA/IHRoaXMucHJvcHMuZml4ZWRPcHRpb25zW2luZGV4XVxuICAgICAgICA6IHRoaXMuc3RhdGUuc2VhcmNoUmVzdWx0c1tpbmRleCAtIHRoaXMucHJvcHMuZml4ZWRPcHRpb25zLmxlbmd0aF07XG4gICAgfVxuICAgIHJldHVybiB0aGlzLnN0YXRlLnNlYXJjaFJlc3VsdHNbaW5kZXhdO1xuICB9XG5cbiAgX29uT3B0aW9uU2VsZWN0ZWQgPSAob3B0aW9uLCBldmVudCkgPT4ge1xuICAgIGlmICh0aGlzLnByb3BzLnNlYXJjaGFibGUpIHtcbiAgICAgIC8vIHJlc2V0IGVudHJ5IGlucHV0XG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgc2VhcmNoUmVzdWx0czogdGhpcy5nZXRPcHRpb25zRm9yVmFsdWUoJycsIHRoaXMucHJvcHMub3B0aW9ucyksXG4gICAgICAgIHNlbGVjdGlvbjogJycsXG4gICAgICAgIGVudHJ5VmFsdWU6ICcnXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5wcm9wcy5vbk9wdGlvblNlbGVjdGVkKG9wdGlvbiwgZXZlbnQpO1xuICB9O1xuXG4gIC8vIHVzZSAoKSA9PiB7fSB0byBhdm9pZCBiaW5kaW5nICd0aGlzJ1xuICBfb25UZXh0RW50cnlVcGRhdGVkID0gKCkgPT4ge1xuICAgIGlmICh0aGlzLnByb3BzLnNlYXJjaGFibGUpIHtcbiAgICAgIGNvbnN0IHZhbHVlID0gdGhpcy5lbnRyeS52YWx1ZTtcblxuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIHNlYXJjaFJlc3VsdHM6IHRoaXMuZ2V0T3B0aW9uc0ZvclZhbHVlKHZhbHVlLCB0aGlzLnByb3BzLm9wdGlvbnMpLFxuICAgICAgICBzZWxlY3Rpb246ICcnLFxuICAgICAgICBlbnRyeVZhbHVlOiB2YWx1ZVxuICAgICAgfSk7XG4gICAgfVxuICB9O1xuXG4gIF9vbkVudGVyID0gZXZlbnQgPT4ge1xuICAgIGNvbnN0IHNlbGVjdGlvbiA9IHRoaXMuZ2V0U2VsZWN0aW9uKCk7XG4gICAgaWYgKCFzZWxlY3Rpb24pIHtcbiAgICAgIHJldHVybiB0aGlzLnByb3BzLm9uS2V5RG93bihldmVudCk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLl9vbk9wdGlvblNlbGVjdGVkKHNlbGVjdGlvbiwgZXZlbnQpO1xuICB9O1xuXG4gIF9vbkVzY2FwZSgpIHtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIHNlbGVjdGlvbkluZGV4OiBudWxsXG4gICAgfSk7XG4gIH1cblxuICBfb25UYWIoZXZlbnQpIHtcbiAgICBjb25zdCBzZWxlY3Rpb24gPSB0aGlzLmdldFNlbGVjdGlvbigpO1xuICAgIGxldCBvcHRpb24gPSBzZWxlY3Rpb25cbiAgICAgID8gc2VsZWN0aW9uXG4gICAgICA6IHRoaXMuc3RhdGUuc2VhcmNoUmVzdWx0cy5sZW5ndGggPiAwXG4gICAgICAgID8gdGhpcy5zdGF0ZS5zZWFyY2hSZXN1bHRzWzBdXG4gICAgICAgIDogbnVsbDtcblxuICAgIGlmIChvcHRpb24gPT09IG51bGwgJiYgdGhpcy5faGFzQ3VzdG9tVmFsdWUoKSkge1xuICAgICAgb3B0aW9uID0gdGhpcy5fZ2V0Q3VzdG9tVmFsdWUoKTtcbiAgICB9XG5cbiAgICBpZiAob3B0aW9uICE9PSBudWxsKSB7XG4gICAgICByZXR1cm4gdGhpcy5fb25PcHRpb25TZWxlY3RlZChvcHRpb24sIGV2ZW50KTtcbiAgICB9XG4gIH1cblxuICBldmVudE1hcChldmVudCkge1xuICAgIGNvbnN0IGV2ZW50cyA9IHt9O1xuXG4gICAgZXZlbnRzW0tleUV2ZW50LkRPTV9WS19VUF0gPSB0aGlzLm5hdlVwO1xuICAgIGV2ZW50c1tLZXlFdmVudC5ET01fVktfRE9XTl0gPSB0aGlzLm5hdkRvd247XG4gICAgZXZlbnRzW0tleUV2ZW50LkRPTV9WS19SRVRVUk5dID0gZXZlbnRzW1xuICAgICAgS2V5RXZlbnQuRE9NX1ZLX0VOVEVSXG4gICAgXSA9IHRoaXMuX29uRW50ZXI7XG4gICAgZXZlbnRzW0tleUV2ZW50LkRPTV9WS19FU0NBUEVdID0gdGhpcy5fb25Fc2NhcGU7XG4gICAgZXZlbnRzW0tleUV2ZW50LkRPTV9WS19UQUJdID0gdGhpcy5fb25UYWI7XG5cbiAgICByZXR1cm4gZXZlbnRzO1xuICB9XG5cbiAgX25hdihkZWx0YSkge1xuICAgIGlmICghdGhpcy5faGFzSGludCgpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGxldCBuZXdJbmRleCA9XG4gICAgICB0aGlzLnN0YXRlLnNlbGVjdGlvbkluZGV4ID09PSBudWxsXG4gICAgICAgID8gZGVsdGEgPT09IDEgPyAwIDogZGVsdGFcbiAgICAgICAgOiB0aGlzLnN0YXRlLnNlbGVjdGlvbkluZGV4ICsgZGVsdGE7XG4gICAgbGV0IGxlbmd0aCA9IHRoaXMucHJvcHMubWF4VmlzaWJsZVxuICAgICAgPyB0aGlzLnN0YXRlLnNlYXJjaFJlc3VsdHMuc2xpY2UoMCwgdGhpcy5wcm9wcy5tYXhWaXNpYmxlKS5sZW5ndGhcbiAgICAgIDogdGhpcy5zdGF0ZS5zZWFyY2hSZXN1bHRzLmxlbmd0aDtcbiAgICBpZiAodGhpcy5faGFzQ3VzdG9tVmFsdWUoKSkge1xuICAgICAgbGVuZ3RoICs9IDE7XG4gICAgfVxuXG4gICAgaWYgKG5ld0luZGV4IDwgMCkge1xuICAgICAgbmV3SW5kZXggKz0gbGVuZ3RoO1xuICAgIH0gZWxzZSBpZiAobmV3SW5kZXggPj0gbGVuZ3RoKSB7XG4gICAgICBuZXdJbmRleCAtPSBsZW5ndGg7XG4gICAgfVxuXG4gICAgdGhpcy5zZXRTdGF0ZSh7c2VsZWN0aW9uSW5kZXg6IG5ld0luZGV4fSk7XG4gIH1cblxuICBuYXZEb3duID0gKCkgPT4ge1xuICAgIHRoaXMuX25hdigxKTtcbiAgfTtcblxuICBuYXZVcCA9ICgpID0+IHtcbiAgICB0aGlzLl9uYXYoLTEpO1xuICB9O1xuXG4gIF9vbkNoYW5nZSA9IGV2ZW50ID0+IHtcbiAgICBpZiAodGhpcy5wcm9wcy5vbkNoYW5nZSkge1xuICAgICAgdGhpcy5wcm9wcy5vbkNoYW5nZShldmVudCk7XG4gICAgfVxuXG4gICAgdGhpcy5fb25UZXh0RW50cnlVcGRhdGVkKCk7XG4gIH07XG5cbiAgX29uS2V5RG93biA9IGV2ZW50ID0+IHtcbiAgICAvLyBJZiB0aGVyZSBhcmUgbm8gdmlzaWJsZSBlbGVtZW50cywgZG9uJ3QgcGVyZm9ybSBzZWxlY3RvciBuYXZpZ2F0aW9uLlxuICAgIC8vIEp1c3QgcGFzcyB0aGlzIHVwIHRvIHRoZSB1cHN0cmVhbSBvbktleWRvd24gaGFuZGxlci5cbiAgICAvLyBBbHNvIHNraXAgaWYgdGhlIHVzZXIgaXMgcHJlc3NpbmcgdGhlIHNoaWZ0IGtleSwgc2luY2Ugbm9uZSBvZiBvdXIgaGFuZGxlcnMgYXJlIGxvb2tpbmcgZm9yIHNoaWZ0XG4gICAgaWYgKCF0aGlzLl9oYXNIaW50KCkgfHwgZXZlbnQuc2hpZnRLZXkpIHtcbiAgICAgIHJldHVybiB0aGlzLnByb3BzLm9uS2V5RG93bihldmVudCk7XG4gICAgfVxuXG4gICAgY29uc3QgaGFuZGxlciA9IHRoaXMuZXZlbnRNYXAoKVtldmVudC5rZXlDb2RlXTtcblxuICAgIGlmIChoYW5kbGVyKSB7XG4gICAgICBoYW5kbGVyKGV2ZW50KTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMucHJvcHMub25LZXlEb3duKGV2ZW50KTtcbiAgICB9XG4gICAgLy8gRG9uJ3QgcHJvcGFnYXRlIHRoZSBrZXlzdHJva2UgYmFjayB0byB0aGUgRE9NL2Jyb3dzZXJcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICB9O1xuXG4gIF9vbkZvY3VzID0gZXZlbnQgPT4ge1xuICAgIHRoaXMuc2V0U3RhdGUoe2lzRm9jdXNlZDogdHJ1ZX0pO1xuICAgIGlmICh0aGlzLnByb3BzLm9uRm9jdXMpIHtcbiAgICAgIHJldHVybiB0aGlzLnByb3BzLm9uRm9jdXMoZXZlbnQpO1xuICAgIH1cbiAgfTtcblxuICBfb25CbHVyID0gZXZlbnQgPT4ge1xuICAgIHRoaXMuc2V0U3RhdGUoe2lzRm9jdXNlZDogZmFsc2V9KTtcbiAgICBpZiAodGhpcy5wcm9wcy5vbkJsdXIpIHtcbiAgICAgIHJldHVybiB0aGlzLnByb3BzLm9uQmx1cihldmVudCk7XG4gICAgfVxuICB9O1xuXG4gIF9yZW5kZXJIaWRkZW5JbnB1dCgpIHtcbiAgICBpZiAoIXRoaXMucHJvcHMubmFtZSkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgcmV0dXJuIChcbiAgICAgIDxpbnB1dFxuICAgICAgICB0eXBlPVwiaGlkZGVuXCJcbiAgICAgICAgbmFtZT17dGhpcy5wcm9wcy5uYW1lfVxuICAgICAgICB2YWx1ZT17dGhpcy5zdGF0ZS5zZWxlY3Rpb259XG4gICAgICAvPlxuICAgICk7XG4gIH1cblxuICBfZ2VuZXJhdGVTZWFyY2hGdW5jdGlvbigpIHtcbiAgICBjb25zdCBzZWFyY2hPcHRpb25zUHJvcCA9IHRoaXMucHJvcHMuc2VhcmNoT3B0aW9ucztcbiAgICBjb25zdCBmaWx0ZXJPcHRpb25Qcm9wID0gdGhpcy5wcm9wcy5maWx0ZXJPcHRpb247XG4gICAgaWYgKHR5cGVvZiBzZWFyY2hPcHRpb25zUHJvcCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgaWYgKGZpbHRlck9wdGlvblByb3AgIT09IG51bGwpIHtcbiAgICAgICAgQ29uc29sZS53YXJuKFxuICAgICAgICAgICdzZWFyY2hPcHRpb25zIHByb3AgaXMgYmVpbmcgdXNlZCwgZmlsdGVyT3B0aW9uIHByb3Agd2lsbCBiZSBpZ25vcmVkJ1xuICAgICAgICApO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHNlYXJjaE9wdGlvbnNQcm9wO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIGZpbHRlck9wdGlvblByb3AgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIC8vIHVzZSBjdXN0b20gZmlsdGVyIG9wdGlvblxuICAgICAgcmV0dXJuICh2YWx1ZSwgb3B0aW9ucykgPT5cbiAgICAgICAgb3B0aW9ucy5maWx0ZXIobyA9PiBmaWx0ZXJPcHRpb25Qcm9wKHZhbHVlLCBvKSk7XG4gICAgfVxuXG4gICAgY29uc3QgbWFwcGVyID1cbiAgICAgIHR5cGVvZiBmaWx0ZXJPcHRpb25Qcm9wID09PSAnc3RyaW5nJ1xuICAgICAgICA/IEFjY2Vzc29yLmdlbmVyYXRlQWNjZXNzb3IoZmlsdGVyT3B0aW9uUHJvcClcbiAgICAgICAgOiBBY2Nlc3Nvci5JREVOVElUWV9GTjtcblxuICAgIHJldHVybiAodmFsdWUsIG9wdGlvbnMpID0+XG4gICAgICBmdXp6eVxuICAgICAgICAuZmlsdGVyKHZhbHVlLCBvcHRpb25zLCB7ZXh0cmFjdDogbWFwcGVyfSlcbiAgICAgICAgLm1hcChyZXMgPT4gb3B0aW9uc1tyZXMuaW5kZXhdKTtcbiAgfVxuXG4gIF9oYXNIaW50KCkge1xuICAgIHJldHVybiB0aGlzLnN0YXRlLnNlYXJjaFJlc3VsdHMubGVuZ3RoID4gMCB8fCB0aGlzLl9oYXNDdXN0b21WYWx1ZSgpO1xuICB9XG5cbiAgX2hhc0ZpeGVkT3B0aW9ucygpIHtcbiAgICByZXR1cm4gKFxuICAgICAgQXJyYXkuaXNBcnJheSh0aGlzLnByb3BzLmZpeGVkT3B0aW9ucykgJiYgdGhpcy5wcm9wcy5maXhlZE9wdGlvbnMubGVuZ3RoXG4gICAgKTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCBpbnB1dENsYXNzZXMgPSB7fTtcbiAgICBpbnB1dENsYXNzZXNbdGhpcy5wcm9wcy5jdXN0b21DbGFzc2VzLmlucHV0XSA9IEJvb2xlYW4oXG4gICAgICB0aGlzLnByb3BzLmN1c3RvbUNsYXNzZXMuaW5wdXRcbiAgICApO1xuICAgIGNvbnN0IGlucHV0Q2xhc3NMaXN0ID0gY2xhc3NOYW1lcyhpbnB1dENsYXNzZXMpO1xuXG4gICAgY29uc3QgY2xhc3NlcyA9IHtcbiAgICAgIFtERUZBVUxUX0NMQVNTXTogdGhpcy5wcm9wcy5kZWZhdWx0Q2xhc3NOYW1lc1xuICAgIH07XG4gICAgY2xhc3Nlc1t0aGlzLnByb3BzLmNsYXNzTmFtZV0gPSBCb29sZWFuKHRoaXMucHJvcHMuY2xhc3NOYW1lKTtcbiAgICBjb25zdCBjbGFzc0xpc3QgPSBjbGFzc05hbWVzKGNsYXNzZXMpO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxUeXBlYWhlYWRXcmFwcGVyXG4gICAgICAgIGNsYXNzTmFtZT17Y2xhc3NMaXN0fVxuICAgICAgICBpbm5lclJlZj17Y29tcCA9PiB7XG4gICAgICAgICAgdGhpcy5yb290ID0gY29tcDtcbiAgICAgICAgfX1cbiAgICAgICAgdGFiSW5kZXg9XCIwXCJcbiAgICAgICAgb25LZXlEb3duPXt0aGlzLl9vbktleURvd259XG4gICAgICAgIG9uS2V5UHJlc3M9e3RoaXMucHJvcHMub25LZXlQcmVzc31cbiAgICAgICAgb25LZXlVcD17dGhpcy5wcm9wcy5vbktleVVwfVxuICAgICAgICBvbkZvY3VzPXt0aGlzLl9vbkZvY3VzfVxuICAgICAgPlxuICAgICAgICB7dGhpcy5fcmVuZGVySGlkZGVuSW5wdXQoKX1cbiAgICAgICAge3RoaXMucHJvcHMuc2VhcmNoYWJsZSA/IChcbiAgICAgICAgPElucHV0Qm94PlxuICAgICAgICAgIDxUeXBlYWhlYWRJbnB1dFxuICAgICAgICAgICAgaW5uZXJSZWY9e2NvbXAgPT4ge1xuICAgICAgICAgICAgICB0aGlzLmVudHJ5ID0gY29tcDtcbiAgICAgICAgICAgIH19XG4gICAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgICBkaXNhYmxlZD17dGhpcy5wcm9wcy5kaXNhYmxlZH1cbiAgICAgICAgICAgIHsuLi50aGlzLnByb3BzLmlucHV0UHJvcHN9XG4gICAgICAgICAgICBwbGFjZWhvbGRlcj17dGhpcy5wcm9wcy5wbGFjZWhvbGRlcn1cbiAgICAgICAgICAgIGNsYXNzTmFtZT17aW5wdXRDbGFzc0xpc3R9XG4gICAgICAgICAgICB2YWx1ZT17dGhpcy5zdGF0ZS5lbnRyeVZhbHVlfVxuICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMuX29uQ2hhbmdlfVxuICAgICAgICAgICAgb25CbHVyPXt0aGlzLl9vbkJsdXJ9XG4gICAgICAgICAgLz5cbiAgICAgICAgICA8SW5wdXRJY29uPlxuICAgICAgICAgICAgPFNlYXJjaCBoZWlnaHQ9XCIxOHB4XCIvPlxuICAgICAgICAgIDwvSW5wdXRJY29uPlxuICAgICAgICA8L0lucHV0Qm94PlxuICAgICAgICApIDogbnVsbH1cbiAgICAgICAge3RoaXMuX3JlbmRlckluY3JlbWVudGFsU2VhcmNoUmVzdWx0cygpfVxuICAgICAgPC9UeXBlYWhlYWRXcmFwcGVyPlxuICAgICk7XG4gIH1cbn07XG4iXX0=