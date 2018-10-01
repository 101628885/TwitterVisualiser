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

var _taggedTemplateLiteral2 = require('babel-runtime/helpers/taggedTemplateLiteral');

var _taggedTemplateLiteral3 = _interopRequireDefault(_taggedTemplateLiteral2);

var _class, _temp;

var _templateObject = (0, _taggedTemplateLiteral3.default)(['\n  display: flex;\n  justify-content: space-between;\n'], ['\n  display: flex;\n  justify-content: space-between;\n']),
    _templateObject2 = (0, _taggedTemplateLiteral3.default)(['\n  display: flex;\n  margin-bottom: 8px;\n  align-items: center;\n'], ['\n  display: flex;\n  margin-bottom: 8px;\n  align-items: center;\n']),
    _templateObject3 = (0, _taggedTemplateLiteral3.default)(['\n  width: 30%;\n'], ['\n  width: 30%;\n']),
    _templateObject4 = (0, _taggedTemplateLiteral3.default)(['\n  width: 70%;\n'], ['\n  width: 70%;\n']); // Copyright (c) 2018 Uber Technologies, Inc.
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

var _fieldSelector = require('../../common/field-selector');

var _fieldSelector2 = _interopRequireDefault(_fieldSelector);

var _styledComponents3 = require('../../common/styled-components');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TopRow = _styledComponents2.default.div(_templateObject);

var LayerColumnConfig = (_temp = _class = function (_Component) {
  (0, _inherits3.default)(LayerColumnConfig, _Component);

  function LayerColumnConfig() {
    (0, _classCallCheck3.default)(this, LayerColumnConfig);
    return (0, _possibleConstructorReturn3.default)(this, (LayerColumnConfig.__proto__ || Object.getPrototypeOf(LayerColumnConfig)).apply(this, arguments));
  }

  (0, _createClass3.default)(LayerColumnConfig, [{
    key: '_updateColumn',
    value: function _updateColumn(key, value) {
      var layer = this.props.layer;


      var columns = value && value.pair && layer.columnPairs ? layer.assignColumnPairs(key, value.pair) : layer.assignColumn(key, value);

      this.props.updateLayerConfig({ columns: columns });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          layer = _props.layer,
          fields = _props.fields,
          fieldPairs = _props.fieldPairs;

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          _styledComponents3.SidePanelSection,
          null,
          _react2.default.createElement(
            'div',
            { className: 'layer-config__column' },
            _react2.default.createElement(
              TopRow,
              null,
              _react2.default.createElement(
                _styledComponents3.PanelLabel,
                null,
                'Columns'
              ),
              _react2.default.createElement(
                _styledComponents3.PanelLabel,
                null,
                '* Required'
              )
            ),
            Object.keys(layer.config.columns).map(function (key) {
              return _react2.default.createElement(ColumnSelector, {
                column: layer.config.columns[key],
                label: key,
                key: key,
                allFields: fields,
                fieldPairs: layer.columnPairs ? fieldPairs.map(function (fp) {
                  return {
                    name: fp.defaultName,
                    type: 'point',
                    pair: fp.pair
                  };
                }) : null,
                onSelect: function onSelect(val) {
                  return _this2._updateColumn(key, val);
                }
              });
            })
          )
        )
      );
    }
  }]);
  return LayerColumnConfig;
}(_react.Component), _class.propTypes = {
  layer: _propTypes2.default.object.isRequired,
  fields: _propTypes2.default.arrayOf(_propTypes2.default.any).isRequired,
  updateLayerConfig: _propTypes2.default.func.isRequired,
  fieldPairs: _propTypes2.default.arrayOf(_propTypes2.default.any)
}, _temp);
exports.default = LayerColumnConfig;
;

var ColumnRow = _styledComponents2.default.div(_templateObject2);

var ColumnName = _styledComponents2.default.div(_templateObject3);
var ColumnSelect = _styledComponents2.default.div(_templateObject4);

var ColumnSelector = function ColumnSelector(_ref) {
  var column = _ref.column,
      label = _ref.label,
      allFields = _ref.allFields,
      onSelect = _ref.onSelect,
      fieldPairs = _ref.fieldPairs;
  return _react2.default.createElement(
    ColumnRow,
    { className: 'layer-config__column__selector' },
    _react2.default.createElement(
      ColumnName,
      { className: 'layer-config__column__name' },
      _react2.default.createElement(
        _styledComponents3.PanelLabel,
        null,
        label
      ),
      !column.optional ? _react2.default.createElement(
        _styledComponents3.PanelLabel,
        null,
        '  *'
      ) : null
    ),
    _react2.default.createElement(
      ColumnSelect,
      { className: 'layer-config__column__select' },
      _react2.default.createElement(_fieldSelector2.default, {
        suggested: fieldPairs,
        error: !column.optional && !column.value,
        fields: allFields,
        value: column.value,
        erasable: Boolean(column.optional),
        onSelect: onSelect
      })
    )
  );
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3NpZGUtcGFuZWwvbGF5ZXItcGFuZWwvbGF5ZXItY29sdW1uLWNvbmZpZy5qcyJdLCJuYW1lcyI6WyJUb3BSb3ciLCJzdHlsZWQiLCJkaXYiLCJMYXllckNvbHVtbkNvbmZpZyIsImtleSIsInZhbHVlIiwibGF5ZXIiLCJwcm9wcyIsImNvbHVtbnMiLCJwYWlyIiwiY29sdW1uUGFpcnMiLCJhc3NpZ25Db2x1bW5QYWlycyIsImFzc2lnbkNvbHVtbiIsInVwZGF0ZUxheWVyQ29uZmlnIiwiZmllbGRzIiwiZmllbGRQYWlycyIsIk9iamVjdCIsImtleXMiLCJjb25maWciLCJtYXAiLCJuYW1lIiwiZnAiLCJkZWZhdWx0TmFtZSIsInR5cGUiLCJfdXBkYXRlQ29sdW1uIiwidmFsIiwiQ29tcG9uZW50IiwicHJvcFR5cGVzIiwiUHJvcFR5cGVzIiwib2JqZWN0IiwiaXNSZXF1aXJlZCIsImFycmF5T2YiLCJhbnkiLCJmdW5jIiwiQ29sdW1uUm93IiwiQ29sdW1uTmFtZSIsIkNvbHVtblNlbGVjdCIsIkNvbHVtblNlbGVjdG9yIiwiY29sdW1uIiwibGFiZWwiLCJhbGxGaWVsZHMiLCJvblNlbGVjdCIsIm9wdGlvbmFsIiwiQm9vbGVhbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7MkdBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFFQTs7OztBQUtBLElBQU1BLFNBQVNDLDJCQUFPQyxHQUFoQixpQkFBTjs7SUFLcUJDLGlCOzs7Ozs7Ozs7O2tDQVFMQyxHLEVBQUtDLEssRUFBTztBQUFBLFVBQ2pCQyxLQURpQixHQUNSLEtBQUtDLEtBREcsQ0FDakJELEtBRGlCOzs7QUFHeEIsVUFBTUUsVUFD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QUFPakMsS0FGckM7QUFHRSxnQkFBUW1DLFNBSFY7QUFJRSxlQUFPRixPQUFPakMsS0FKaEI7QUFLRSxrQkFBVXNDLFFBQVFMLE9BQU9JLFFBQWYsQ0FMWjtBQU1FLGtCQUFVRDtBQU5aO0FBREY7QUFMRixHQURxQjtBQUFBLENBQXZCIiwiZmlsZSI6ImxheWVyLWNvbHVtbi1jb25maWcuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIDIwMTggVWJlciBUZWNobm9sb2dpZXMsIEluYy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4vLyBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4vLyBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4vLyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4vLyBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbi8vIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbi8vIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1Jcbi8vIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuLy8gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4vLyBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4vLyBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuLy8gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuLy8gVEhFIFNPRlRXQVJFLlxuXG5pbXBvcnQgUmVhY3QsIHtDb21wb25lbnR9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgc3R5bGVkIGZyb20gJ3N0eWxlZC1jb21wb25lbnRzJztcbmltcG9ydCBGaWVsZFNlbGVjdG9yIGZyb20gJ2NvbXBvbmVudHMvY29tbW9uL2ZpZWxkLXNlbGVjdG9yJztcblxuaW1wb3J0IHtcbiAgUGFuZWxMYWJlbCxcbiAgU2lkZVBhbmVsU2VjdGlvblxufSBmcm9tICdjb21wb25lbnRzL2NvbW1vbi9zdHlsZWQtY29tcG9uZW50cyc7XG5cbmNvbnN0IFRvcFJvdyA9IHN0eWxlZC5kaXZgXG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbmA7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExheWVyQ29sdW1uQ29uZmlnIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICBsYXllcjogUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkLFxuICAgIGZpZWxkczogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLmFueSkuaXNSZXF1aXJlZCxcbiAgICB1cGRhdGVMYXllckNvbmZpZzogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICBmaWVsZFBhaXJzOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMuYW55KVxuICB9O1xuXG4gIF91cGRhdGVDb2x1bW4oa2V5LCB2YWx1ZSkge1xuICAgIGNvbnN0IHtsYXllcn0gPSB0aGlzLnByb3BzO1xuXG4gICAgY29uc3QgY29sdW1ucyA9XG4gICAgICB2YWx1ZSAmJiB2YWx1ZS5wYWlyICYmIGxheWVyLmNvbHVtblBhaXJzXG4gICAgICAgID8gbGF5ZXIuYXNzaWduQ29sdW1uUGFpcnMoa2V5LCB2YWx1ZS5wYWlyKVxuICAgICAgICA6IGxheWVyLmFzc2lnbkNvbHVtbihrZXksIHZhbHVlKTtcblxuICAgIHRoaXMucHJvcHMudXBkYXRlTGF5ZXJDb25maWcoe2NvbHVtbnN9KTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7bGF5ZXIsIGZpZWxkcywgZmllbGRQYWlyc30gPSB0aGlzLnByb3BzO1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2PlxuICAgICAgICA8U2lkZVBhbmVsU2VjdGlvbj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImxheWVyLWNvbmZpZ19fY29sdW1uXCI+XG4gICAgICAgICAgPFRvcFJvdz5cbiAgICAgICAgICAgIDxQYW5lbExhYmVsPkNvbHVtbnM8L1BhbmVsTGFiZWw+XG4gICAgICAgICAgICA8UGFuZWxMYWJlbD4qIFJlcXVpcmVkPC9QYW5lbExhYmVsPlxuICAgICAgICAgIDwvVG9wUm93PlxuICAgICAgICAgIHtPYmplY3Qua2V5cyhsYXllci5jb25maWcuY29sdW1ucykubWFwKGtleSA9PiAoXG4gICAgICAgICAgICA8Q29sdW1uU2VsZWN0b3JcbiAgICAgICAgICAgICAgY29sdW1uPXtsYXllci5jb25maWcuY29sdW1uc1trZXldfVxuICAgICAgICAgICAgICBsYWJlbD17a2V5fVxuICAgICAgICAgICAgICBrZXk9e2tleX1cbiAgICAgICAgICAgICAgYWxsRmllbGRzPXtmaWVsZHN9XG4gICAgICAgICAgICAgIGZpZWxkUGFpcnM9e1xuICAgICAgICAgICAgICAgIGxheWVyLmNvbHVtblBhaXJzXG4gICAgICAgICAgICAgICAgICA/IGZpZWxkUGFpcnMubWFwKGZwID0+ICh7XG4gICAgICAgICAgICAgICAgICAgICAgbmFtZTogZnAuZGVmYXVsdE5hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgdHlwZTogJ3BvaW50JyxcbiAgICAgICAgICAgICAgICAgICAgICBwYWlyOiBmcC5wYWlyXG4gICAgICAgICAgICAgICAgICAgIH0pKVxuICAgICAgICAgICAgICAgICAgOiBudWxsXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgb25TZWxlY3Q9e3ZhbCA9PiB0aGlzLl91cGRhdGVDb2x1bW4oa2V5LCB2YWwpfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICApKX1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9TaWRlUGFuZWxTZWN0aW9uPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufTtcblxuY29uc3QgQ29sdW1uUm93ID0gc3R5bGVkLmRpdmBcbiAgZGlzcGxheTogZmxleDtcbiAgbWFyZ2luLWJvdHRvbTogOHB4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuYDtcblxuY29uc3QgQ29sdW1uTmFtZSA9IHN0eWxlZC5kaXZgXG4gIHdpZHRoOiAzMCU7XG5gO1xuY29uc3QgQ29sdW1uU2VsZWN0ID0gc3R5bGVkLmRpdmBcbiAgd2lkdGg6IDcwJTtcbmA7XG5cbmNvbnN0IENvbHVtblNlbGVjdG9yID0gKHtjb2x1bW4sIGxhYmVsLCBhbGxGaWVsZHMsIG9uU2VsZWN0LCBmaWVsZFBhaXJzfSkgPT4gKFxuICA8Q29sdW1uUm93IGNsYXNzTmFtZT1cImxheWVyLWNvbmZpZ19fY29sdW1uX19zZWxlY3RvclwiPlxuICAgIDxDb2x1bW5OYW1lIGNsYXNzTmFtZT1cImxheWVyLWNvbmZpZ19fY29sdW1uX19uYW1lXCI+XG4gICAgICA8UGFuZWxMYWJlbD57bGFiZWx9PC9QYW5lbExhYmVsPlxuICAgICAgeyFjb2x1bW4ub3B0aW9uYWwgPyA8UGFuZWxMYWJlbD57YCAgKmB9PC9QYW5lbExhYmVsPiA6IG51bGx9XG4gICAgPC9Db2x1bW5OYW1lPlxuICAgIDxDb2x1bW5TZWxlY3QgY2xhc3NOYW1lPVwibGF5ZXItY29uZmlnX19jb2x1bW5fX3NlbGVjdFwiPlxuICAgICAgPEZpZWxkU2VsZWN0b3JcbiAgICAgICAgc3VnZ2VzdGVkPXtmaWVsZFBhaXJzfVxuICAgICAgICBlcnJvcj17IWNvbHVtbi5vcHRpb25hbCAmJiAhY29sdW1uLnZhbHVlfVxuICAgICAgICBmaWVsZHM9e2FsbEZpZWxkc31cbiAgICAgICAgdmFsdWU9e2NvbHVtbi52YWx1ZX1cbiAgICAgICAgZXJhc2FibGU9e0Jvb2xlYW4oY29sdW1uLm9wdGlvbmFsKX1cbiAgICAgICAgb25TZWxlY3Q9e29uU2VsZWN0fVxuICAgICAgLz5cbiAgICA8L0NvbHVtblNlbGVjdD5cbiAgPC9Db2x1bW5Sb3c+XG4pO1xuIl19