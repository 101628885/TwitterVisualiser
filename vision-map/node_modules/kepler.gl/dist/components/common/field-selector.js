'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _class, _temp2; // Copyright (c) 2018 Uber Technologies, Inc.
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

var _reselect = require('reselect');

var _itemSelector = require('./item-selector/item-selector');

var _itemSelector2 = _interopRequireDefault(_itemSelector);

var _fieldToken = require('../common/field-token');

var _fieldToken2 = _interopRequireDefault(_fieldToken);

var _dropdownList = require('./item-selector/dropdown-list');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultDisplayOption = function defaultDisplayOption(d) {
  return d.name;
};

// custom list Item
var FieldListItemFactory = function FieldListItemFactory(showToken) {
  var FieldListItem = function FieldListItem(_ref) {
    var value = _ref.value,
        _ref$displayOption = _ref.displayOption,
        displayOption = _ref$displayOption === undefined ? defaultDisplayOption : _ref$displayOption;
    return _react2.default.createElement(
      'div',
      null,
      showToken ? _react2.default.createElement(
        'div',
        { style: { display: 'inline-block', margin: '0 4px 0 0' } },
        _react2.default.createElement(_fieldToken2.default, { type: value.type })
      ) : null,
      _react2.default.createElement(
        'span',
        { className: _dropdownList.classList.listItemAnchor },
        displayOption(value)
      )
    );
  };

  return FieldListItem;
};

var SuggestedFieldHeader = function SuggestedFieldHeader() {
  return _react2.default.createElement(
    'div',
    null,
    'Suggested Field'
  );
};

var FieldType = _propTypes2.default.oneOfType([_propTypes2.default.arrayOf(_propTypes2.default.string), _propTypes2.default.string, _propTypes2.default.shape({
  format: _propTypes2.default.string,
  id: _propTypes2.default.string,
  name: _propTypes2.default.string,
  tableFieldIndex: _propTypes2.default.number,
  type: _propTypes2.default.number
})]);

var FieldSelector = (_temp2 = _class = function (_Component) {
  (0, _inherits3.default)(FieldSelector, _Component);

  function FieldSelector() {
    var _ref2;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, FieldSelector);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref2 = FieldSelector.__proto__ || Object.getPrototypeOf(FieldSelector)).call.apply(_ref2, [this].concat(args))), _this), _this.fieldsSelector = function (props) {
      return props.fields;
    }, _this.valueSelector = function (props) {
      return props.value;
    }, _this.filterFieldTypesSelector = function (props) {
      return props.filterFieldTypes;
    }, _this.showTokenSelector = function (props) {
      return props.showToken;
    }, _this.selectedItemsSelector = (0, _reselect.createSelector)(_this.fieldsSelector, _this.valueSelector, function (fields, value) {
      return fields.filter(function (f) {
        return (Array.isArray(value) ? value : [value]).includes(defaultDisplayOption(f));
      });
    }), _this.fieldOptionsSelector = (0, _reselect.createSelector)(_this.fieldsSelector, _this.filterFieldTypesSelector, function (fields, filterFieldTypes) {
      if (!filterFieldTypes) {
        return fields;
      }
      var filters = Array.isArray(filterFieldTypes) ? filterFieldTypes : [filterFieldTypes];
      return fields.filter(function (f) {
        return filters.includes(f.type);
      });
    }), _this.fieldListItemSelector = (0, _reselect.createSelector)(_this.showTokenSelector, FieldListItemFactory), _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(FieldSelector, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(_itemSelector2.default, {
          getOptionValue: function getOptionValue(d) {
            return d;
          },
          closeOnSelect: this.props.closeOnSelect,
          displayOption: defaultDisplayOption,
          filterOption: 'id',
          fixedOptions: this.props.suggested,
          inputTheme: this.props.inputTheme,
          isError: this.props.error,
          selectedItems: this.selectedItemsSelector(this.props),
          erasable: this.props.erasable,
          options: this.fieldOptionsSelector(this.props),
          multiSelect: this.props.multiSelect,
          placeholder: this.props.placeholder,
          placement: this.props.placement,
          onChange: this.props.onSelect,
          DropDownLineItemRenderComponent: this.fieldListItemSelector(this.props),
          DropdownHeaderComponent: this.props.suggested ? SuggestedFieldHeader : null
        })
      );
    }
  }]);
  return FieldSelector;
}(_react.Component), _class.propTypes = {
  fields: _propTypes2.default.oneOfType([_propTypes2.default.array, _propTypes2.default.arrayOf(FieldType)]),
  onSelect: _propTypes2.default.func.isRequired,
  placement: _propTypes2.default.string,
  value: FieldType,
  filterFieldTypes: _propTypes2.default.oneOfType([FieldType, _propTypes2.default.arrayOf(FieldType)]),
  inputTheme: _propTypes2.default.string,
  placeholder: _propTypes2.default.string,
  erasable: _propTypes2.default.bool,
  error: _propTypes2.default.bool,
  multiSelect: _propTypes2.default.bool,
  closeOnSelect: _propTypes2.default.bool,
  showToken: _propTypes2.default.bool,
  suggested: _propTypes2.default.arrayOf(_propTypes2.default.any)
}, _class.defaultProps = {
  erasable: true,
  error: false,
  fields: [],
  onSelect: function onSelect() {},
  placement: 'bottom',
  value: null,
  multiSelect: false,
  closeOnSelect: true,
  showToken: true,
  placeholder: 'Select a field'
}, _temp2);
exports.default = FieldSelector;
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2NvbW1vbi9maWVsZC1zZWxlY3Rvci5qcyJdLCJuYW1lcyI6WyJkZWZhdWx0RGlzcGxheU9wdGlvbiIsImQiLCJuYW1lIiwiRmllbGRMaXN0SXRlbUZhY3RvcnkiLCJGaWVsZExpc3RJdGVtIiwidmFsdWUiLCJkaXNwbGF5T3B0aW9uIiwic2hvd1Rva2VuIiwiZGlzcGxheSIsIm1hcmdpbiIsInR5cGUiLCJjbGFzc0xpc3QiLCJsaXN0SXRlbUFuY2hvciIsIlN1Z2dlc3RlZEZpZWxkSGVhZGVyIiwiRmllbGRUeXBlIiwiUHJvcFR5cGVzIiwib25lT2ZUeXBlIiwiYXJyYXlPZiIsInN0cmluZyIsInNoYXBlIiwiZm9ybWF0IiwiaWQiLCJ0YWJsZUZpZWxkSW5kZXgiLCJudW1iZXIiLCJGaWVsZFNlbGVjdG9yIiwiZmllbGRzU2VsZWN0b3IiLCJwcm9wcyIsImZpZWxkcyIsInZhbHVlU2VsZWN0b3IiLCJmaWx0ZXJGaWVsZFR5cGVzU2VsZWN0b3IiLCJmaWx0ZXJGaWVsZFR5cGVzIiwic2hvd1Rva2VuU2VsZWN0b3IiLCJzZWxlY3RlZEl0ZW1zU2VsZWN0b3IiLCJmaWx0ZXIiLCJBcnJheSIsImlzQXJyYXkiLCJpbmNsdWRlcyIsImYiLCJmaWVsZE9wdGlvbnNTZWxlY3RvciIsImZpbHRlcnMiLCJmaWVsZExpc3RJdGVtU2VsZWN0b3IiLCJjbG9zZU9uU2VsZWN0Iiwic3VnZ2VzdGVkIiwiaW5wdXRUaGVtZSIsImVycm9yIiwiZXJhc2FibGUiLCJtdWx0aVNlbGVjdCIsInBsYWNlaG9sZGVyIiwicGxhY2VtZW50Iiwib25TZWxlY3QiLCJDb21wb25lbnQiLCJwcm9wVHlwZXMiLCJhcnJheSIsImZ1bmMiLCJpc1JlcXVpcmVkIiwiYm9vbCIsImFueSIsImRlZmF1bHRQcm9wcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7b0JBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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b0JBQVVFLE9BQVYsQ0FBa0JILFNBQWxCLENBQVosQ0FBcEIsQ0FSRDtBQVNqQjZCLGNBQVk1QixvQkFBVUcsTUFUTDtBQVVqQjZCLGVBQWFoQyxvQkFBVUcsTUFWTjtBQVdqQjJCLFlBQVU5QixvQkFBVXdDLElBWEg7QUFZakJYLFNBQU83QixvQkFBVXdDLElBWkE7QUFhakJULGVBQWEvQixvQkFBVXdDLElBYk47QUFjakJkLGlCQUFlMUIsb0JBQVV3QyxJQWRSO0FBZWpCaEQsYUFBV1Esb0JBQVV3QyxJQWZKO0FBZ0JqQmIsYUFBVzNCLG9CQUFVRSxPQUFWLENBQWtCRixvQkFBVXlDLEdBQTVCO0FBaEJNLEMsU0FtQlpDLFksR0FBZTtBQUNwQlosWUFBVSxJQURVO0FBRXBCRCxTQUFPLEtBRmE7QUFHcEJqQixVQUFRLEVBSFk7QUFJcEJzQixZQUFVLG9CQUFNLENBQUUsQ0FKRTtBQUtwQkQsYUFBVyxRQUxTO0FBTXBCM0MsU0FBTyxJQU5hO0FBT3BCeUMsZUFBYSxLQVBPO0FBUXBCTCxpQkFBZSxJQVJLO0FBU3BCbEMsYUFBVyxJQVRTO0FBVXBCd0MsZUFBYTtBQVZPLEM7a0JBcEJIdkIsYTtBQWdHcEIiLCJmaWxlIjoiZmllbGQtc2VsZWN0b3IuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIDIwMTggVWJlciBUZWNobm9sb2dpZXMsIEluYy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4vLyBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4vLyBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4vLyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4vLyBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbi8vIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbi8vIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1Jcbi8vIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuLy8gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4vLyBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4vLyBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuLy8gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuLy8gVEhFIFNPRlRXQVJFLlxuXG5pbXBvcnQgUmVhY3QsIHtDb21wb25lbnR9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQge2NyZWF0ZVNlbGVjdG9yfSBmcm9tICdyZXNlbGVjdCc7XG5cbmltcG9ydCBJdGVtU2VsZWN0b3IgZnJvbSAnLi9pdGVtLXNlbGVjdG9yL2l0ZW0tc2VsZWN0b3InO1xuaW1wb3J0IEZpZWxkVG9rZW4gZnJvbSAnLi4vY29tbW9uL2ZpZWxkLXRva2VuJztcbmltcG9ydCB7Y2xhc3NMaXN0fSBmcm9tICcuL2l0ZW0tc2VsZWN0b3IvZHJvcGRvd24tbGlzdCc7XG5cbmNvbnN0IGRlZmF1bHREaXNwbGF5T3B0aW9uID0gZCA9PiBkLm5hbWU7XG5cbi8vIGN1c3RvbSBsaXN0IEl0ZW1cbmNvbnN0IEZpZWxkTGlzdEl0ZW1GYWN0b3J5ID0gc2hvd1Rva2VuID0+IHtcbiAgY29uc3QgRmllbGRMaXN0SXRlbSA9ICh7dmFsdWUsIGRpc3BsYXlPcHRpb24gPSBkZWZhdWx0RGlzcGxheU9wdGlvbn0pID0+IChcbiAgICA8ZGl2PlxuICAgICAge3Nob3dUb2tlbiA/IChcbiAgICAgICAgPGRpdiBzdHlsZT17e2Rpc3BsYXk6ICdpbmxpbmUtYmxvY2snLCBtYXJnaW46ICcwIDRweCAwIDAnfX0+XG4gICAgICAgICAgPEZpZWxkVG9rZW4gdHlwZT17dmFsdWUudHlwZX0gLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICApIDogbnVsbH1cbiAgICAgIDxzcGFuIGNsYXNzTmFtZT17Y2xhc3NMaXN0Lmxpc3RJdGVtQW5jaG9yfT57ZGlzcGxheU9wdGlvbih2YWx1ZSl9PC9zcGFuPlxuICAgIDwvZGl2PlxuICApO1xuXG4gIHJldHVybiBGaWVsZExpc3RJdGVtO1xufTtcblxuY29uc3QgU3VnZ2VzdGVkRmllbGRIZWFkZXIgPSAoKSA9PiA8ZGl2PlN1Z2dlc3RlZCBGaWVsZDwvZGl2PjtcblxuY29uc3QgRmllbGRUeXBlID0gUHJvcFR5cGVzLm9uZU9mVHlwZShbXG4gIFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5zdHJpbmcpLFxuICBQcm9wVHlwZXMuc3RyaW5nLFxuICBQcm9wVHlwZXMuc2hhcGUoe1xuICAgIGZvcm1hdDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBpZDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBuYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIHRhYmxlRmllbGRJbmRleDogUHJvcFR5cGVzLm51bWJlcixcbiAgICB0eXBlOiBQcm9wVHlwZXMubnVtYmVyXG4gIH0pXG5dKTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRmllbGRTZWxlY3RvciBleHRlbmRzIENvbXBvbmVudCB7XG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgZmllbGRzOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtcbiAgICAgIFByb3BUeXBlcy5hcnJheSxcbiAgICAgIFByb3BUeXBlcy5hcnJheU9mKEZpZWxkVHlwZSlcbiAgICBdKSxcbiAgICBvblNlbGVjdDogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICBwbGFjZW1lbnQ6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgdmFsdWU6IEZpZWxkVHlwZSxcbiAgICBmaWx0ZXJGaWVsZFR5cGVzOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtGaWVsZFR5cGUsIFByb3BUeXBlcy5hcnJheU9mKEZpZWxkVHlwZSldKSxcbiAgICBpbnB1dFRoZW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIHBsYWNlaG9sZGVyOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGVyYXNhYmxlOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBlcnJvcjogUHJvcFR5cGVzLmJvb2wsXG4gICAgbXVsdGlTZWxlY3Q6IFByb3BUeXBlcy5ib29sLFxuICAgIGNsb3NlT25TZWxlY3Q6IFByb3BUeXBlcy5ib29sLFxuICAgIHNob3dUb2tlbjogUHJvcFR5cGVzLmJvb2wsXG4gICAgc3VnZ2VzdGVkOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMuYW55KVxuICB9O1xuXG4gIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgZXJhc2FibGU6IHRydWUsXG4gICAgZXJyb3I6IGZhbHNlLFxuICAgIGZpZWxkczogW10sXG4gICAgb25TZWxlY3Q6ICgpID0+IHt9LFxuICAgIHBsYWNlbWVudDogJ2JvdHRvbScsXG4gICAgdmFsdWU6IG51bGwsXG4gICAgbXVsdGlTZWxlY3Q6IGZhbHNlLFxuICAgIGNsb3NlT25TZWxlY3Q6IHRydWUsXG4gICAgc2hvd1Rva2VuOiB0cnVlLFxuICAgIHBsYWNlaG9sZGVyOiAnU2VsZWN0IGEgZmllbGQnXG4gIH07XG5cbiAgZmllbGRzU2VsZWN0b3IgPSBwcm9wcyA9PiBwcm9wcy5maWVsZHM7XG4gIHZhbHVlU2VsZWN0b3IgPSBwcm9wcyA9PiBwcm9wcy52YWx1ZTtcbiAgZmlsdGVyRmllbGRUeXBlc1NlbGVjdG9yID0gcHJvcHMgPT4gcHJvcHMuZmlsdGVyRmllbGRUeXBlcztcbiAgc2hvd1Rva2VuU2VsZWN0b3IgPSBwcm9wcyA9PiBwcm9wcy5zaG93VG9rZW47XG5cbiAgc2VsZWN0ZWRJdGVtc1NlbGVjdG9yID0gY3JlYXRlU2VsZWN0b3IoXG4gICAgdGhpcy5maWVsZHNTZWxlY3RvcixcbiAgICB0aGlzLnZhbHVlU2VsZWN0b3IsXG4gICAgKGZpZWxkcywgdmFsdWUpID0+XG4gICAgICBmaWVsZHMuZmlsdGVyKGYgPT5cbiAgICAgICAgKEFycmF5LmlzQXJyYXkodmFsdWUpID8gdmFsdWUgOiBbdmFsdWVdKS5pbmNsdWRlcyhcbiAgICAgICAgICBkZWZhdWx0RGlzcGxheU9wdGlvbihmKVxuICAgICAgICApXG4gICAgICApXG4gICk7XG5cbiAgZmllbGRPcHRpb25zU2VsZWN0b3IgPSBjcmVhdGVTZWxlY3RvcihcbiAgICB0aGlzLmZpZWxkc1NlbGVjdG9yLFxuICAgIHRoaXMuZmlsdGVyRmllbGRUeXBlc1NlbGVjdG9yLFxuICAgIChmaWVsZHMsIGZpbHRlckZpZWxkVHlwZXMpID0+IHtcbiAgICAgIGlmICghZmlsdGVyRmllbGRUeXBlcykge1xuICAgICAgICByZXR1cm4gZmllbGRzO1xuICAgICAgfVxuICAgICAgY29uc3QgZmlsdGVycyA9IEFycmF5LmlzQXJyYXkoZmlsdGVyRmllbGRUeXBlcylcbiAgICAgICAgPyBmaWx0ZXJGaWVsZFR5cGVzXG4gICAgICAgIDogW2ZpbHRlckZpZWxkVHlwZXNdO1xuICAgICAgcmV0dXJuIGZpZWxkcy5maWx0ZXIoZiA9PiBmaWx0ZXJzLmluY2x1ZGVzKGYudHlwZSkpO1xuICAgIH1cbiAgKTtcblxuICBmaWVsZExpc3RJdGVtU2VsZWN0b3IgPSBjcmVhdGVTZWxlY3RvcihcbiAgICB0aGlzLnNob3dUb2tlblNlbGVjdG9yLFxuICAgIEZpZWxkTGlzdEl0ZW1GYWN0b3J5XG4gICk7XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2PlxuICAgICAgICA8SXRlbVNlbGVjdG9yXG4gICAgICAgICAgZ2V0T3B0aW9uVmFsdWU9e2QgPT4gZH1cbiAgICAgICAgICBjbG9zZU9uU2VsZWN0PXt0aGlzLnByb3BzLmNsb3NlT25TZWxlY3R9XG4gICAgICAgICAgZGlzcGxheU9wdGlvbj17ZGVmYXVsdERpc3BsYXlPcHRpb259XG4gICAgICAgICAgZmlsdGVyT3B0aW9uPXsnaWQnfVxuICAgICAgICAgIGZpeGVkT3B0aW9ucz17dGhpcy5wcm9wcy5zdWdnZXN0ZWR9XG4gICAgICAgICAgaW5wdXRUaGVtZT17dGhpcy5wcm9wcy5pbnB1dFRoZW1lfVxuICAgICAgICAgIGlzRXJyb3I9e3RoaXMucHJvcHMuZXJyb3J9XG4gICAgICAgICAgc2VsZWN0ZWRJdGVtcz17dGhpcy5zZWxlY3RlZEl0ZW1zU2VsZWN0b3IodGhpcy5wcm9wcyl9XG4gICAgICAgICAgZXJhc2FibGU9e3RoaXMucHJvcHMuZXJhc2FibGV9XG4gICAgICAgICAgb3B0aW9ucz17dGhpcy5maWVsZE9wdGlvbnNTZWxlY3Rvcih0aGlzLnByb3BzKX1cbiAgICAgICAgICBtdWx0aVNlbGVjdD17dGhpcy5wcm9wcy5tdWx0aVNlbGVjdH1cbiAgICAgICAgICBwbGFjZWhvbGRlcj17dGhpcy5wcm9wcy5wbGFjZWhvbGRlcn1cbiAgICAgICAgICBwbGFjZW1lbnQ9e3RoaXMucHJvcHMucGxhY2VtZW50fVxuICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLnByb3BzLm9uU2VsZWN0fVxuICAgICAgICAgIERyb3BEb3duTGluZUl0ZW1SZW5kZXJDb21wb25lbnQ9e3RoaXMuZmllbGRMaXN0SXRlbVNlbGVjdG9yKFxuICAgICAgICAgICAgdGhpcy5wcm9wc1xuICAgICAgICAgICl9XG4gICAgICAgICAgRHJvcGRvd25IZWFkZXJDb21wb25lbnQ9e1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5zdWdnZXN0ZWQgPyBTdWdnZXN0ZWRGaWVsZEhlYWRlciA6IG51bGxcbiAgICAgICAgICB9XG4gICAgICAgIC8+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59O1xuIl19