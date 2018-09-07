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

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reselect = require('reselect');

var _styledComponents = require('../common/styled-components');

var _itemSelector = require('../common/item-selector/item-selector');

var _itemSelector2 = _interopRequireDefault(_itemSelector);

var _sourceDataCatalog = require('./source-data-catalog');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultPlaceHolder = 'Select A Data Source'; // Copyright (c) 2018 Uber Technologies, Inc.
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

var DatasetItem = function DatasetItem(_ref) {
  var value = _ref.value;
  return _react2.default.createElement(_sourceDataCatalog.DatasetTag, { dataset: value });
};

var SourceDataSelector = function (_Component) {
  (0, _inherits3.default)(SourceDataSelector, _Component);

  function SourceDataSelector() {
    var _ref2;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, SourceDataSelector);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref2 = SourceDataSelector.__proto__ || Object.getPrototypeOf(SourceDataSelector)).call.apply(_ref2, [this].concat(args))), _this), _this.datasetsSelector = function (props) {
      return props.datasets;
    }, _this.dsOptionsSelector = (0, _reselect.createSelector)(_this.datasetsSelector, function (datasets) {
      return Object.values(datasets).map(function (ds) {
        return {
          label: ds.label,
          value: ds.id,
          color: ds.color
        };
      });
    }), _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }
  /* selectors */
  /* eslint-disable no-invalid-this */


  (0, _createClass3.default)(SourceDataSelector, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          dataId = _props.dataId,
          disabled = _props.disabled,
          onSelect = _props.onSelect,
          _props$defaultValue = _props.defaultValue,
          defaultValue = _props$defaultValue === undefined ? defaultPlaceHolder : _props$defaultValue,
          inputTheme = _props.inputTheme;

      var dsOptions = this.dsOptionsSelector(this.props);

      return _react2.default.createElement(
        _styledComponents.SidePanelSection,
        { className: 'data-source-selector' },
        _react2.default.createElement(
          _styledComponents.PanelLabel,
          null,
          'Data Source'
        ),
        _react2.default.createElement(_itemSelector2.default, {
          inputTheme: inputTheme,
          selectedItems: dataId ? this.props.datasets[dataId] : null,
          options: dsOptions,
          getOptionValue: 'value',
          filterOption: 'label',
          multiSelect: false,
          onChange: onSelect,
          placeholder: defaultValue,
          disabled: disabled,
          displayOption: 'label',
          DropDownLineItemRenderComponent: DatasetItem
        })
      );
    }
  }]);
  return SourceDataSelector;
}(_react.Component);

exports.default = SourceDataSelector;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3NpZGUtcGFuZWwvc291cmNlLWRhdGEtc2VsZWN0b3IuanMiXSwibmFtZXMiOlsiZGVmYXVsdFBsYWNlSG9sZGVyIiwiRGF0YXNldEl0ZW0iLCJ2YWx1ZSIsIlNvdXJjZURhdGFTZWxlY3RvciIsImRhdGFzZXRzU2VsZWN0b3IiLCJwcm9wcyIsImRhdGFzZXRzIiwiZHNPcHRpb25zU2VsZWN0b3IiLCJPYmplY3QiLCJ2YWx1ZXMiLCJtYXAiLCJsYWJlbCIsImRzIiwiaWQiLCJjb2xvciIsImRhdGFJZCIsImRpc2FibGVkIiwib25TZWxlY3QiLCJkZWZhdWx0VmFsdWUiLCJpbnB1dFRoZW1lIiwiZHNPcHRpb25zIiwiQ29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQW9CQTs7OztBQUNBOztBQUVBOztBQUlBOzs7O0FBQ0E7Ozs7QUFFQSxJQUFNQSxxQkFBcUIsc0JBQTNCLEMsQ0E5QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBY0EsSUFBTUMsY0FBYyxTQUFkQSxXQUFjO0FBQUEsTUFBRUMsS0FBRixRQUFFQSxLQUFGO0FBQUEsU0FBYSw4QkFBQyw2QkFBRCxJQUFZLFNBQVNBLEtBQXJCLEdBQWI7QUFBQSxDQUFwQjs7SUFFcUJDLGtCOzs7Ozs7Ozs7Ozs7Ozs4TkFHbkJDLGdCLEdBQW1CO0FBQUEsYUFBU0MsTUFBTUMsUUFBZjtBQUFBLEssUUFDbkJDLGlCLEdBQW9CLDhCQUFlLE1BQUtILGdCQUFwQixFQUFzQztBQUFBLGFBQ3hESSxPQUFPQyxNQUFQLENBQWNILFFBQWQsRUFBd0JJLEdBQXhCLENBQTRCO0FBQUEsZUFBTztBQUNqQ0MsaUJBQU9DLEdBQUdELEtBRHVCO0FBRWpDVCxpQkFBT1UsR0FBR0MsRUFGdUI7QUFHakNDLGlCQUFPRixHQUFHRTtBQUh1QixTQUFQO0FBQUEsT0FBNUIsQ0FEd0Q7QUFBQSxLQUF0QyxDOztBQUhwQjtBQUNBOzs7Ozs2QkFVUztBQUFBLG1CQU9ILEtBQUtULEtBUEY7QUFBQSxVQUVMVSxNQUZLLFVBRUxBLE1BRks7QUFBQSxVQUdMQyxRQUhLLFVBR0xBLFFBSEs7QUFBQSxVQUlMQyxRQUpLLFVBSUxBLFFBSks7QUFBQSx1Q0FLTEMsWUFMSztBQUFBLFVBS0xBLFlBTEssdUNBS1VsQixrQkFMVjtBQUFBLFVBTUxtQixVQU5LLFVBTUxBLFVBTks7O0FBUVAsVUFBTUMsWUFBWSxLQUFLYixpQkFBTCxDQUF1QixLQUFLRixLQUE1QixDQUFsQjs7QUFFQSxhQUNFO0FBQUMsMENBQUQ7QUFBQSxVQUFrQixXQUFVLHNCQUE1QjtBQUNFO0FBQUMsc0NBQUQ7QUFBQTtBQUFBO0FBQUEsU0FERjtBQUVFLHNDQUFDLHNCQUFEO0FBQ0Usc0JBQVljLFVBRGQ7QUFFRSx5QkFBZUosU0FBUyxLQUFLVixLQUFMLENBQVdDLFFBQVgsQ0FBb0JTLE1BQXBCLENBQVQsR0FBdUMsSUFGeEQ7QUFHRSxtQkFBU0ssU0FIWDtBQUlFLDBCQUFnQixPQUpsQjtBQUtFLHdCQUFjLE9BTGhCO0FBTUUsdUJBQWEsS0FOZjtBQU9FLG9CQUFVSCxRQVBaO0FBUUUsdUJBQWFDLFlBUmY7QUFTRSxvQkFBVUYsUUFUWjtBQVVFLHlCQUFlLE9BVmpCO0FBV0UsMkNBQWlDZjtBQVhuQztBQUZGLE9BREY7QUFrQkQ7OztFQXhDNkNvQixnQjs7a0JBQTNCbEIsa0IiLCJmaWxlIjoic291cmNlLWRhdGEtc2VsZWN0b3IuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIDIwMTggVWJlciBUZWNobm9sb2dpZXMsIEluYy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4vLyBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4vLyBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4vLyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4vLyBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbi8vIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbi8vIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1Jcbi8vIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuLy8gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4vLyBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4vLyBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuLy8gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuLy8gVEhFIFNPRlRXQVJFLlxuXG5pbXBvcnQgUmVhY3QsIHtDb21wb25lbnR9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7Y3JlYXRlU2VsZWN0b3J9IGZyb20gJ3Jlc2VsZWN0JztcblxuaW1wb3J0IHtcbiAgUGFuZWxMYWJlbCxcbiAgU2lkZVBhbmVsU2VjdGlvblxufSBmcm9tICdjb21wb25lbnRzL2NvbW1vbi9zdHlsZWQtY29tcG9uZW50cyc7XG5pbXBvcnQgSXRlbVNlbGVjdG9yIGZyb20gJ2NvbXBvbmVudHMvY29tbW9uL2l0ZW0tc2VsZWN0b3IvaXRlbS1zZWxlY3Rvcic7XG5pbXBvcnQge0RhdGFzZXRUYWd9IGZyb20gJy4vc291cmNlLWRhdGEtY2F0YWxvZyc7XG5cbmNvbnN0IGRlZmF1bHRQbGFjZUhvbGRlciA9ICdTZWxlY3QgQSBEYXRhIFNvdXJjZSc7XG5cbmNvbnN0IERhdGFzZXRJdGVtID0gKHt2YWx1ZX0pID0+IDxEYXRhc2V0VGFnIGRhdGFzZXQ9e3ZhbHVlfSAvPjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU291cmNlRGF0YVNlbGVjdG9yIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgLyogc2VsZWN0b3JzICovXG4gIC8qIGVzbGludC1kaXNhYmxlIG5vLWludmFsaWQtdGhpcyAqL1xuICBkYXRhc2V0c1NlbGVjdG9yID0gcHJvcHMgPT4gcHJvcHMuZGF0YXNldHM7XG4gIGRzT3B0aW9uc1NlbGVjdG9yID0gY3JlYXRlU2VsZWN0b3IodGhpcy5kYXRhc2V0c1NlbGVjdG9yLCBkYXRhc2V0cyA9PlxuICAgIE9iamVjdC52YWx1ZXMoZGF0YXNldHMpLm1hcChkcyA9PiAoe1xuICAgICAgbGFiZWw6IGRzLmxhYmVsLFxuICAgICAgdmFsdWU6IGRzLmlkLFxuICAgICAgY29sb3I6IGRzLmNvbG9yXG4gICAgfSkpXG4gICk7XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHtcbiAgICAgIGRhdGFJZCxcbiAgICAgIGRpc2FibGVkLFxuICAgICAgb25TZWxlY3QsXG4gICAgICBkZWZhdWx0VmFsdWUgPSBkZWZhdWx0UGxhY2VIb2xkZXIsXG4gICAgICBpbnB1dFRoZW1lXG4gICAgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgZHNPcHRpb25zID0gdGhpcy5kc09wdGlvbnNTZWxlY3Rvcih0aGlzLnByb3BzKTtcblxuICAgIHJldHVybiAoXG4gICAgICA8U2lkZVBhbmVsU2VjdGlvbiBjbGFzc05hbWU9XCJkYXRhLXNvdXJjZS1zZWxlY3RvclwiPlxuICAgICAgICA8UGFuZWxMYWJlbD5EYXRhIFNvdXJjZTwvUGFuZWxMYWJlbD5cbiAgICAgICAgPEl0ZW1TZWxlY3RvclxuICAgICAgICAgIGlucHV0VGhlbWU9e2lucHV0VGhlbWV9XG4gICAgICAgICAgc2VsZWN0ZWRJdGVtcz17ZGF0YUlkID8gdGhpcy5wcm9wcy5kYXRhc2V0c1tkYXRhSWRdIDogbnVsbH1cbiAgICAgICAgICBvcHRpb25zPXtkc09wdGlvbnN9XG4gICAgICAgICAgZ2V0T3B0aW9uVmFsdWU9eyd2YWx1ZSd9XG4gICAgICAgICAgZmlsdGVyT3B0aW9uPXsnbGFiZWwnfVxuICAgICAgICAgIG11bHRpU2VsZWN0PXtmYWxzZX1cbiAgICAgICAgICBvbkNoYW5nZT17b25TZWxlY3R9XG4gICAgICAgICAgcGxhY2Vob2xkZXI9e2RlZmF1bHRWYWx1ZX1cbiAgICAgICAgICBkaXNhYmxlZD17ZGlzYWJsZWR9XG4gICAgICAgICAgZGlzcGxheU9wdGlvbj17J2xhYmVsJ31cbiAgICAgICAgICBEcm9wRG93bkxpbmVJdGVtUmVuZGVyQ29tcG9uZW50PXtEYXRhc2V0SXRlbX1cbiAgICAgICAgLz5cbiAgICAgIDwvU2lkZVBhbmVsU2VjdGlvbj5cbiAgICApO1xuICB9XG59XG4iXX0=