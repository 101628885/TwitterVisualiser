'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DatasetTabs = exports.DatasetModalTab = exports.DataTableModal = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

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

var _templateObject = (0, _taggedTemplateLiteral3.default)(['\n  .react-grid-Main {\n    outline: 0;\n  }\n\n  .react-grid-Grid {\n    border: 0;\n  }\n\n  .react-grid-Cell {\n    border-right: 0;\n    border-bottom: ', ';\n    padding-left: 16px;\n  }\n\n  .react-grid-HeaderCell {\n    border-right: 0;\n    border-bottom: 0;\n    background: ', ';\n    color: ', ';\n    padding: 14px 8px 14px 0;\n  }\n  .react-grid-Cell:first-child,\n  .react-grid-HeaderCell:first-child {\n    padding-left: ', ';\n  }\n  .react-grid-Cell:last-child,\n  .react-grid-HeaderCell:last-child {\n    padding-right: ', ';\n  }\n  .react-grid-Cell__value {\n    color: ', ';\n  }\n  .react-grid-Canvas {\n    ', ';\n  }\n'], ['\n  .react-grid-Main {\n    outline: 0;\n  }\n\n  .react-grid-Grid {\n    border: 0;\n  }\n\n  .react-grid-Cell {\n    border-right: 0;\n    border-bottom: ', ';\n    padding-left: 16px;\n  }\n\n  .react-grid-HeaderCell {\n    border-right: 0;\n    border-bottom: 0;\n    background: ', ';\n    color: ', ';\n    padding: 14px 8px 14px 0;\n  }\n  .react-grid-Cell:first-child,\n  .react-grid-HeaderCell:first-child {\n    padding-left: ', ';\n  }\n  .react-grid-Cell:last-child,\n  .react-grid-HeaderCell:last-child {\n    padding-right: ', ';\n  }\n  .react-grid-Cell__value {\n    color: ', ';\n  }\n  .react-grid-Canvas {\n    ', ';\n  }\n']),
    _templateObject2 = (0, _taggedTemplateLiteral3.default)(['\n  display: flex;\n  padding: 0 ', ';\n'], ['\n  display: flex;\n  padding: 0 ', ';\n']),
    _templateObject3 = (0, _taggedTemplateLiteral3.default)(['\n  align-items: center;\n  border-bottom: 3px solid ', ';\n  cursor: pointer;\n  display: flex;\n  height: 35px;\n  margin: 0 3px;\n  padding: 0 5px;\n\n  :first-child {\n    margin-left: 0;\n    padding-left: 0;\n  }\n'], ['\n  align-items: center;\n  border-bottom: 3px solid ', ';\n  cursor: pointer;\n  display: flex;\n  height: 35px;\n  margin: 0 3px;\n  padding: 0 5px;\n\n  :first-child {\n    margin-left: 0;\n    padding-left: 0;\n  }\n']); // Copyright (c) 2018 Uber Technologies, Inc.
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

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _window = require('global/window');

var _window2 = _interopRequireDefault(_window);

var _defaultSettings = require('../../constants/default-settings');

var _fieldToken = require('../common/field-token');

var _fieldToken2 = _interopRequireDefault(_fieldToken);

var _datasetLabel = require('../common/dataset-label');

var _datasetLabel2 = _interopRequireDefault(_datasetLabel);

var _icons = require('../common/icons');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ReactDataGrid = _window2.default.navigator ? require('react-data-grid/dist/react-data-grid.min') : null;

var shouldPreventScrollBack = false;

if (_window2.default.navigator && _window2.default.navigator.userAgent) {
  var navigator = _window2.default.navigator;
  // Detect browsers
  // http://stackoverflow.com/questions/5899783/detect-safari-using-jquery

  var isMac = navigator.userAgent.match(/Macintosh/);
  var is_chrome = navigator.userAgent.indexOf('Chrome') > -1;
  var is_safari = navigator.userAgent.indexOf('Safari') > -1;
  var is_firefox = navigator.userAgent.indexOf('Firefox') > -1;

  // prevent chrome scroll back
  shouldPreventScrollBack = isMac && (is_chrome || is_safari || is_firefox);
}

var dgSettings = {
  sidePadding: '38px'
};

var DataGridWrapper = _styledComponents2.default.div(_templateObject, function (props) {
  return props.theme.panelBorderLT;
}, function (props) {
  return props.theme.panelBackgroundLT;
}, function (props) {
  return props.theme.titleColorLT;
}, dgSettings.sidePadding, dgSettings.sidePadding, function (props) {
  return props.theme.labelColorLT;
}, function (props) {
  return props.theme.modalScrollBar;
});

var BooleanFormatter = function BooleanFormatter(_ref) {
  var value = _ref.value;
  return _react2.default.createElement(
    'span',
    null,
    String(value)
  );
};

var DataTableModal = exports.DataTableModal = function (_Component) {
  (0, _inherits3.default)(DataTableModal, _Component);

  function DataTableModal() {
    var _ref2;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, DataTableModal);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref2 = DataTableModal.__proto__ || Object.getPrototypeOf(DataTableModal)).call.apply(_ref2, [this].concat(args))), _this), _this._onMouseWheel = function (e) {
      // Prevent futile scroll, which would trigger the Back/Next page event
      // https://github.com/micho/jQuery.preventMacBackScroll
      // This prevents scroll when reaching the topmost or leftmost
      // positions of a container.

      // react-data-grid canvas element can be scrolled
      var canvas = _this._root.querySelector('.react-grid-Canvas');

      // If canvas can not be scrolled left anymore when we try to scroll left
      var prevent_left = e.deltaX < 0 && canvas.scrollLeft <= 0;
      // If canvas can not be scrolled up when we try to scroll up
      var prevent_up = e.deltaY < 0 && canvas.scrollTop <= 0;

      if (prevent_left || prevent_up) {
        e.preventDefault();
      }
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(DataTableModal, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          datasets = _props.datasets,
          dataId = _props.dataId,
          showDatasetTable = _props.showDatasetTable;


      if (!datasets || !dataId) {
        return null;
      }

      var activeDataset = datasets[dataId];
      var rows = activeDataset.data;
      var columns = activeDataset.fields.map(function (field, i) {
        return (0, _extends3.default)({}, field, {
          key: i,
          headerRenderer: _react2.default.createElement(FieldHeader, field),
          resizable: true,
          formatter: field.type === _defaultSettings.ALL_FIELD_TYPES.boolean ? BooleanFormatter : undefined
        });
      }).filter(function (_ref3) {
        var name = _ref3.name;
        return name !== '_geojson';
      });

      return _react2.default.createElement(
        'div',
        { ref: function ref(_ref4) {
            _this2._root = _ref4;
          }, className: 'dataset-modal', style: { overflow: 'scroll' } },
        _react2.default.createElement(DatasetTabs, {
          activeDataset: activeDataset,
          datasets: datasets,
          showDatasetTable: showDatasetTable
        }),
        _react2.default.createElement(
          DataGridWrapper,
          {
            onWheel: shouldPreventScrollBack ? this._onMouseWheel : null
          },
          ReactDataGrid ? _react2.default.createElement(ReactDataGrid, {
            headerRowHeight: 72,
            columns: columns,
            minColumnWidth: 172,
            minWidth: this.props.width,
            minHeight: this.props.height - 65,
            rowGetter: function rowGetter(i) {
              return rows[i];
            },
            rowHeight: 48,
            rowsCount: rows.length
          }) : null
        )
      );
    }
  }]);
  return DataTableModal;
}(_react.Component);

var tagContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between'
};

var FieldHeader = function FieldHeader(_ref5) {
  var name = _ref5.name,
      type = _ref5.type;
  return _react2.default.createElement(
    'div',
    { style: tagContainerStyle },
    _react2.default.createElement(
      'div',
      { style: { display: 'flex', alignItems: 'center' } },
      _react2.default.createElement(
        'div',
        {
          style: {
            marginRight: type === 'timestamp' ? '2px' : '18px',
            height: '16px'
          }
        },
        type === 'timestamp' ? _react2.default.createElement(_icons.Clock, { height: '16px' }) : null
      ),
      name
    ),
    _react2.default.createElement(
      'div',
      { style: { marginLeft: '18px' } },
      _react2.default.createElement(_fieldToken2.default, { type: type })
    )
  );
};

var DatasetCatalog = _styledComponents2.default.div(_templateObject2, dgSettings.sidePadding);

var DatasetModalTab = exports.DatasetModalTab = _styledComponents2.default.div(_templateObject3, function (props) {
  return props.active ? 'black' : 'transparent';
});

var DatasetTabs = exports.DatasetTabs = function DatasetTabs(_ref6) {
  var activeDataset = _ref6.activeDataset,
      datasets = _ref6.datasets,
      showDatasetTable = _ref6.showDatasetTable;
  return _react2.default.createElement(
    DatasetCatalog,
    { className: 'dataset-modal-catalog' },
    Object.values(datasets).map(function (dataset) {
      return _react2.default.createElement(
        DatasetModalTab,
        {
          className: 'dataset-modal-tab',
          active: dataset === activeDataset,
          key: dataset.id,
          onClick: function onClick() {
            return showDatasetTable(dataset.id);
          }
        },
        _react2.default.createElement(_datasetLabel2.default, { dataset: dataset })
      );
    })
  );
};

var DataTableModalFactory = function DataTableModalFactory() {
  return DataTableModal;
};
exports.default = DataTableModalFactory;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL21vZGFscy9kYXRhLXRhYmxlLW1vZGFsLmpzIl0sIm5hbWVzIjpbIlJlYWN0RGF0YUdyaWQiLCJ3aW5kb3ciLCJuYXZpZ2F0b3IiLCJyZXF1aXJlIiwic2hvdWxkUHJldmVudFNjcm9sbEJhY2siLCJ1c2VyQWdlbnQiLCJpc01hYyIsIm1hdGNoIiwiaXNfY2hyb21lIiwiaW5kZXhPZiIsImlzX3NhZmFyaSIsImlzX2ZpcmVmb3giLCJkZ1NldHRpbmdzIiwic2lkZVBhZGRpbmciLCJEYXRhR3JpZFdyYXBwZXIiLCJzdHlsZWQiLCJkaXYiLCJwcm9wcyIsInRoZW1lIiwicGFuZWxCb3JkZXJMVCIsInBhbmVsQmFja2dyb3VuZExUIiwidGl0bGVDb2xvckxUIiwibGFiZWxDb2xvckxUIiwibW9kYWxTY3JvbGxCYXIiLCJCb29sZWFuRm9ybWF0dGVyIiwidmFsdWUiLCJTdHJpbmciLCJEYXRhVGFibGVNb2RhbCIsIl9vbk1vdXNlV2hlZWwiLCJjYW52YXMiLCJfcm9vdCIsInF1ZXJ5U2VsZWN0b3IiLCJwcmV2ZW50X2xlZnQiLCJlIiwiZGVsdGFYIiwic2Nyb2xsTGVmdCIsInByZXZlbnRfdXAiLCJkZWx0YVkiLCJzY3JvbGxUb3AiLCJwcmV2ZW50RGVmYXVsdCIsImRhdGFzZXRzIiwiZGF0YUlkIiwic2hvd0RhdGFzZXRUYWJsZSIsImFjdGl2ZURhdGFzZXQiLCJyb3dzIiwiZGF0YSIsImNvbHVtbnMiLCJmaWVsZHMiLCJtYXAiLCJmaWVsZCIsImkiLCJrZXkiLCJoZWFkZXJSZW5kZXJlciIsInJlc2l6YWJsZSIsImZvcm1hdHRlciIsInR5cGUiLCJBTExfRklFTERfVFlQRVMiLCJib29sZWFuIiwidW5kZWZpbmVkIiwiZmlsdGVyIiwibmFtZSIsInJlZiIsIm92ZXJmbG93Iiwid2lkdGgiLCJoZWlnaHQiLCJsZW5ndGgiLCJDb21wb25lbnQiLCJ0YWdDb250YWluZXJTdHlsZSIsImRpc3BsYXkiLCJmbGV4RGlyZWN0aW9uIiwianVzdGlmeUNvbnRlbnQiLCJGaWVsZEhlYWRlciIsImFsaWduSXRlbXMiLCJtYXJnaW5SaWdodCIsIm1hcmdpbkxlZnQiLCJEYXRhc2V0Q2F0YWxvZyIsIkRhdGFzZXRNb2RhbFRhYiIsImFjdGl2ZSIsIkRhdGFzZXRUYWJzIiwiT2JqZWN0IiwidmFsdWVzIiwiZGF0YXNldCIsImlkIiwiRGF0YVRhYmxlTW9kYWxGYWN0b3J5Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7aWdCQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUVBOztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBLElBQU1BLGdCQUFnQkMsaUJBQU9DLFNBQVAsR0FBbUJDLFFBQVEsMENBQVIsQ0FBbkIsR0FBeUUsSUFBL0Y7O0FBRUEsSUFBSUMsMEJBQTBCLEtBQTlCOztBQUVBLElBQUlILGlCQUFPQyxTQUFQLElBQW9CRCxpQkFBT0MsU0FBUCxDQUFpQkcsU0FBekMsRUFBb0Q7QUFBQSxNQUMzQ0gsU0FEMkMsR0FDOUJELGdCQUQ4QixDQUMzQ0MsU0FEMkM7QUFFbEQ7QUFDQTs7QUFDQSxNQUFNSSxRQUFRSixVQUFVRyxTQUFWLENBQW9CRSxLQUFwQixDQUEwQixXQUExQixDQUFkO0FBQ0EsTUFBTUMsWUFBWU4sVUFBVUcsU0FBVixDQUFvQkksT0FBcEIsQ0FBNEIsUUFBNUIsSUFBd0MsQ0FBQyxDQUEzRDtBQUNBLE1BQU1DLFlBQVlSLFVBQVVHLFNBQVYsQ0FBb0JJLE9BQXBCLENBQTRCLFFBQTVCLElBQXdDLENBQUMsQ0FBM0Q7QUFDQSxNQUFNRSxhQUFhVCxVQUFVRyxTQUFWLENBQW9CSSxPQUFwQixDQUE0QixTQUE1QixJQUF5QyxDQUFDLENBQTdEOztBQUVBO0FBQ0FMLDRCQUEwQkUsVUFBVUUsYUFBYUUs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ZSxPQUFmLEdBQXlCLGFBQW5DO0FBQUEsQ0FGaEIsQ0FBTjs7QUFlQSxJQUFNQyxvQ0FBYyxTQUFkQSxXQUFjO0FBQUEsTUFBRW5DLGFBQUYsU0FBRUEsYUFBRjtBQUFBLE1BQWlCSCxRQUFqQixTQUFpQkEsUUFBakI7QUFBQSxNQUEyQkUsZ0JBQTNCLFNBQTJCQSxnQkFBM0I7QUFBQSxTQUN6QjtBQUFDLGtCQUFEO0FBQUEsTUFBZ0IsV0FBVSx1QkFBMUI7QUFDR3FDLFdBQU9DLE1BQVAsQ0FBY3hDLFFBQWQsRUFBd0JRLEdBQXhCLENBQTRCO0FBQUEsYUFDM0I7QUFBQyx1QkFBRDtBQUFBO0FBQ0UscUJBQVUsbUJBRFo7QUFFRSxrQkFBUWlDLFlBQVl0QyxhQUZ0QjtBQUdFLGVBQUtzQyxRQUFRQyxFQUhmO0FBSUUsbUJBQVM7QUFBQSxtQkFBTXhDLGlCQUFpQnVDLFFBQVFDLEVBQXpCLENBQU47QUFBQTtBQUpYO0FBTUUsc0NBQUMsc0JBQUQsSUFBYyxTQUFTRCxPQUF2QjtBQU5GLE9BRDJCO0FBQUEsS0FBNUI7QUFESCxHQUR5QjtBQUFBLENBQXBCOztBQWVQLElBQU1FLHdCQUF3QixTQUF4QkEscUJBQXdCO0FBQUEsU0FBTXhELGNBQU47QUFBQSxDQUE5QjtrQkFDZXdELHFCIiwiZmlsZSI6ImRhdGEtdGFibGUtbW9kYWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIDIwMTggVWJlciBUZWNobm9sb2dpZXMsIEluYy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4vLyBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4vLyBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4vLyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4vLyBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbi8vIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbi8vIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1Jcbi8vIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuLy8gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4vLyBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4vLyBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuLy8gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuLy8gVEhFIFNPRlRXQVJFLlxuXG5pbXBvcnQgUmVhY3QsIHtDb21wb25lbnR9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBzdHlsZWQgZnJvbSAnc3R5bGVkLWNvbXBvbmVudHMnO1xuaW1wb3J0IHdpbmRvdyBmcm9tICdnbG9iYWwvd2luZG93JztcblxuaW1wb3J0IHtBTExfRklFTERfVFlQRVN9IGZyb20gJ2NvbnN0YW50cy9kZWZhdWx0LXNldHRpbmdzJztcbmltcG9ydCBGaWVsZFRva2VuIGZyb20gJ2NvbXBvbmVudHMvY29tbW9uL2ZpZWxkLXRva2VuJztcbmltcG9ydCBEYXRhc2V0TGFiZWwgZnJvbSAnY29tcG9uZW50cy9jb21tb24vZGF0YXNldC1sYWJlbCc7XG5pbXBvcnQge0Nsb2NrfSBmcm9tICdjb21wb25lbnRzL2NvbW1vbi9pY29ucy9pbmRleCc7XG5jb25zdCBSZWFjdERhdGFHcmlkID0gd2luZG93Lm5hdmlnYXRvciA/IHJlcXVpcmUoJ3JlYWN0LWRhdGEtZ3JpZC9kaXN0L3JlYWN0LWRhdGEtZ3JpZC5taW4nKSA6IG51bGw7XG5cbmxldCBzaG91bGRQcmV2ZW50U2Nyb2xsQmFjayA9IGZhbHNlO1xuXG5pZiAod2luZG93Lm5hdmlnYXRvciAmJiB3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudCkge1xuICBjb25zdCB7bmF2aWdhdG9yfSA9IHdpbmRvdztcbiAgLy8gRGV0ZWN0IGJyb3dzZXJzXG4gIC8vIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvNTg5OTc4My9kZXRlY3Qtc2FmYXJpLXVzaW5nLWpxdWVyeVxuICBjb25zdCBpc01hYyA9IG5hdmlnYXRvci51c2VyQWdlbnQubWF0Y2goL01hY2ludG9zaC8pO1xuICBjb25zdCBpc19jaHJvbWUgPSBuYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoJ0Nocm9tZScpID4gLTE7XG4gIGNvbnN0IGlzX3NhZmFyaSA9IG5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZignU2FmYXJpJykgPiAtMTtcbiAgY29uc3QgaXNfZmlyZWZveCA9IG5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZignRmlyZWZveCcpID4gLTE7XG5cbiAgLy8gcHJldmVudCBjaHJvbWUgc2Nyb2xsIGJhY2tcbiAgc2hvdWxkUHJldmVudFNjcm9sbEJhY2sgPSBpc01hYyAmJiAoaXNfY2hyb21lIHx8IGlzX3NhZmFyaSB8fCBpc19maXJlZm94KTtcbn1cblxuY29uc3QgZGdTZXR0aW5ncyA9IHtcbiAgc2lkZVBhZGRpbmc6ICczOHB4J1xufTtcblxuY29uc3QgRGF0YUdyaWRXcmFwcGVyID0gc3R5bGVkLmRpdmBcbiAgLnJlYWN0LWdyaWQtTWFpbiB7XG4gICAgb3V0bGluZTogMDtcbiAgfVxuXG4gIC5yZWFjdC1ncmlkLUdyaWQge1xuICAgIGJvcmRlcjogMDtcbiAgfVxuXG4gIC5yZWFjdC1ncmlkLUNlbGwge1xuICAgIGJvcmRlci1yaWdodDogMDtcbiAgICBib3JkZXItYm90dG9tOiAke3Byb3BzID0+IHByb3BzLnRoZW1lLnBhbmVsQm9yZGVyTFR9O1xuICAgIHBhZGRpbmctbGVmdDogMTZweDtcbiAgfVxuXG4gIC5yZWFjdC1ncmlkLUhlYWRlckNlbGwge1xuICAgIGJvcmRlci1yaWdodDogMDtcbiAgICBib3JkZXItYm90dG9tOiAwO1xuICAgIGJhY2tncm91bmQ6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUucGFuZWxCYWNrZ3JvdW5kTFR9O1xuICAgIGNvbG9yOiAke3Byb3BzID0+IHByb3BzLnRoZW1lLnRpdGxlQ29sb3JMVH07XG4gICAgcGFkZGluZzogMTRweCA4cHggMTRweCAwO1xuICB9XG4gIC5yZWFjdC1ncmlkLUNlbGw6Zmlyc3QtY2hpbGQsXG4gIC5yZWFjdC1ncmlkLUhlYWRlckNlbGw6Zmlyc3QtY2hpbGQge1xuICAgIHBhZGRpbmctbGVmdDogJHtkZ1NldHRpbmdzLnNpZGVQYWRkaW5nfTtcbiAgfVxuICAucmVhY3QtZ3JpZC1DZWxsOmxhc3QtY2hpbGQsXG4gIC5yZWFjdC1ncmlkLUhlYWRlckNlbGw6bGFzdC1jaGlsZCB7XG4gICAgcGFkZGluZy1yaWdodDogJHtkZ1NldHRpbmdzLnNpZGVQYWRkaW5nfTtcbiAgfVxuICAucmVhY3QtZ3JpZC1DZWxsX192YWx1ZSB7XG4gICAgY29sb3I6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUubGFiZWxDb2xvckxUfTtcbiAgfVxuICAucmVhY3QtZ3JpZC1DYW52YXMge1xuICAgICR7cHJvcHMgPT4gcHJvcHMudGhlbWUubW9kYWxTY3JvbGxCYXJ9O1xuICB9XG5gO1xuXG5jb25zdCBCb29sZWFuRm9ybWF0dGVyID0gKHt2YWx1ZX0pID0+IDxzcGFuPntTdHJpbmcodmFsdWUpfTwvc3Bhbj47XG5cbmV4cG9ydCBjbGFzcyBEYXRhVGFibGVNb2RhbCBleHRlbmRzIENvbXBvbmVudCB7XG4gIF9vbk1vdXNlV2hlZWwgPSBlID0+IHtcbiAgICAvLyBQcmV2ZW50IGZ1dGlsZSBzY3JvbGwsIHdoaWNoIHdvdWxkIHRyaWdnZXIgdGhlIEJhY2svTmV4dCBwYWdlIGV2ZW50XG4gICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL21pY2hvL2pRdWVyeS5wcmV2ZW50TWFjQmFja1Njcm9sbFxuICAgIC8vIFRoaXMgcHJldmVudHMgc2Nyb2xsIHdoZW4gcmVhY2hpbmcgdGhlIHRvcG1vc3Qgb3IgbGVmdG1vc3RcbiAgICAvLyBwb3NpdGlvbnMgb2YgYSBjb250YWluZXIuXG5cbiAgICAvLyByZWFjdC1kYXRhLWdyaWQgY2FudmFzIGVsZW1lbnQgY2FuIGJlIHNjcm9sbGVkXG4gICAgY29uc3QgY2FudmFzID0gdGhpcy5fcm9vdC5xdWVyeVNlbGVjdG9yKCcucmVhY3QtZ3JpZC1DYW52YXMnKTtcblxuICAgIC8vIElmIGNhbnZhcyBjYW4gbm90IGJlIHNjcm9sbGVkIGxlZnQgYW55bW9yZSB3aGVuIHdlIHRyeSB0byBzY3JvbGwgbGVmdFxuICAgIGNvbnN0IHByZXZlbnRfbGVmdCA9IGUuZGVsdGFYIDwgMCAmJiBjYW52YXMuc2Nyb2xsTGVmdCA8PSAwO1xuICAgIC8vIElmIGNhbnZhcyBjYW4gbm90IGJlIHNjcm9sbGVkIHVwIHdoZW4gd2UgdHJ5IHRvIHNjcm9sbCB1cFxuICAgIGNvbnN0IHByZXZlbnRfdXAgPSBlLmRlbHRhWSA8IDAgJiYgY2FudmFzLnNjcm9sbFRvcCA8PSAwO1xuXG4gICAgaWYgKHByZXZlbnRfbGVmdCB8fCBwcmV2ZW50X3VwKSB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuICB9O1xuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7ZGF0YXNldHMsIGRhdGFJZCwgc2hvd0RhdGFzZXRUYWJsZX0gPSB0aGlzLnByb3BzO1xuXG4gICAgaWYgKCFkYXRhc2V0cyB8fCAhZGF0YUlkKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBjb25zdCBhY3RpdmVEYXRhc2V0ID0gZGF0YXNldHNbZGF0YUlkXTtcbiAgICBjb25zdCByb3dzID0gYWN0aXZlRGF0YXNldC5kYXRhO1xuICAgIGNvbnN0IGNvbHVtbnMgPSBhY3RpdmVEYXRhc2V0LmZpZWxkc1xuICAgICAgLm1hcCgoZmllbGQsIGkpID0+ICh7XG4gICAgICAgIC4uLmZpZWxkLFxuICAgICAgICBrZXk6IGksXG4gICAgICAgIGhlYWRlclJlbmRlcmVyOiA8RmllbGRIZWFkZXIgey4uLmZpZWxkfSAvPixcbiAgICAgICAgcmVzaXphYmxlOiB0cnVlLFxuICAgICAgICBmb3JtYXR0ZXI6XG4gICAgICAgICAgZmllbGQudHlwZSA9PT0gQUxMX0ZJRUxEX1RZUEVTLmJvb2xlYW4gPyBCb29sZWFuRm9ybWF0dGVyIDogdW5kZWZpbmVkXG4gICAgICB9KSlcbiAgICAgIC5maWx0ZXIoKHtuYW1lfSkgPT4gbmFtZSAhPT0gJ19nZW9qc29uJyk7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiByZWY9e3JlZiA9PiB7dGhpcy5fcm9vdCA9IHJlZn19IGNsYXNzTmFtZT1cImRhdGFzZXQtbW9kYWxcIiBzdHlsZT17e292ZXJmbG93OiAnc2Nyb2xsJ319PlxuICAgICAgICA8RGF0YXNldFRhYnNcbiAgICAgICAgICBhY3RpdmVEYXRhc2V0PXthY3RpdmVEYXRhc2V0fVxuICAgICAgICAgIGRhdGFzZXRzPXtkYXRhc2V0c31cbiAgICAgICAgICBzaG93RGF0YXNldFRhYmxlPXtzaG93RGF0YXNldFRhYmxlfVxuICAgICAgICAvPlxuICAgICAgICA8RGF0YUdyaWRXcmFwcGVyXG4gICAgICAgICAgb25XaGVlbD17c2hvdWxkUHJldmVudFNjcm9sbEJhY2sgPyB0aGlzLl9vbk1vdXNlV2hlZWwgOiBudWxsfVxuICAgICAgICA+XG4gICAgICAgICAge1JlYWN0RGF0YUdyaWQgPyAoXG4gICAgICAgICAgICA8UmVhY3REYXRhR3JpZFxuICAgICAgICAgICAgICBoZWFkZXJSb3dIZWlnaHQ9ezcyfVxuICAgICAgICAgICAgICBjb2x1bW5zPXtjb2x1bW5zfVxuICAgICAgICAgICAgICBtaW5Db2x1bW5XaWR0aD17MTcyfVxuICAgICAgICAgICAgICBtaW5XaWR0aD17dGhpcy5wcm9wcy53aWR0aH1cbiAgICAgICAgICAgICAgbWluSGVpZ2h0PXt0aGlzLnByb3BzLmhlaWdodCAtIDY1fVxuICAgICAgICAgICAgICByb3dHZXR0ZXI9e2kgPT4gcm93c1tpXX1cbiAgICAgICAgICAgICAgcm93SGVpZ2h0PXs0OH1cbiAgICAgICAgICAgICAgcm93c0NvdW50PXtyb3dzLmxlbmd0aH1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgKSA6IG51bGx9XG4gICAgICAgIDwvRGF0YUdyaWRXcmFwcGVyPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5jb25zdCB0YWdDb250YWluZXJTdHlsZSA9IHtcbiAgZGlzcGxheTogJ2ZsZXgnLFxuICBmbGV4RGlyZWN0aW9uOiAnY29sdW1uJyxcbiAganVzdGlmeUNvbnRlbnQ6ICdzcGFjZS1iZXR3ZWVuJ1xufTtcblxuY29uc3QgRmllbGRIZWFkZXIgPSAoe25hbWUsIHR5cGV9KSA9PiAoXG4gIDxkaXYgc3R5bGU9e3RhZ0NvbnRhaW5lclN0eWxlfT5cbiAgICA8ZGl2IHN0eWxlPXt7ZGlzcGxheTogJ2ZsZXgnLCBhbGlnbkl0ZW1zOiAnY2VudGVyJ319PlxuICAgICAgPGRpdlxuICAgICAgICBzdHlsZT17e1xuICAgICAgICAgIG1hcmdpblJpZ2h0OiB0eXBlID09PSAndGltZXN0YW1wJyA/ICcycHgnIDogJzE4cHgnLFxuICAgICAgICAgIGhlaWdodDogJzE2cHgnXG4gICAgICAgIH19XG4gICAgICA+XG4gICAgICAgIHt0eXBlID09PSAndGltZXN0YW1wJyA/IDxDbG9jayBoZWlnaHQ9XCIxNnB4XCIgLz4gOiBudWxsfVxuICAgICAgPC9kaXY+XG4gICAgICB7bmFtZX1cbiAgICA8L2Rpdj5cbiAgICA8ZGl2IHN0eWxlPXt7bWFyZ2luTGVmdDogJzE4cHgnfX0+XG4gICAgICA8RmllbGRUb2tlbiB0eXBlPXt0eXBlfSAvPlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cbik7XG5cbmNvbnN0IERhdGFzZXRDYXRhbG9nID0gc3R5bGVkLmRpdmBcbiAgZGlzcGxheTogZmxleDtcbiAgcGFkZGluZzogMCAke2RnU2V0dGluZ3Muc2lkZVBhZGRpbmd9O1xuYDtcblxuZXhwb3J0IGNvbnN0IERhdGFzZXRNb2RhbFRhYiA9IHN0eWxlZC5kaXZgXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGJvcmRlci1ib3R0b206IDNweCBzb2xpZCAke3Byb3BzID0+IChwcm9wcy5hY3RpdmUgPyAnYmxhY2snIDogJ3RyYW5zcGFyZW50Jyl9O1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGhlaWdodDogMzVweDtcbiAgbWFyZ2luOiAwIDNweDtcbiAgcGFkZGluZzogMCA1cHg7XG5cbiAgOmZpcnN0LWNoaWxkIHtcbiAgICBtYXJnaW4tbGVmdDogMDtcbiAgICBwYWRkaW5nLWxlZnQ6IDA7XG4gIH1cbmA7XG5cbmV4cG9ydCBjb25zdCBEYXRhc2V0VGFicyA9ICh7YWN0aXZlRGF0YXNldCwgZGF0YXNldHMsIHNob3dEYXRhc2V0VGFibGV9KSA9PiAoXG4gIDxEYXRhc2V0Q2F0YWxvZyBjbGFzc05hbWU9XCJkYXRhc2V0LW1vZGFsLWNhdGFsb2dcIj5cbiAgICB7T2JqZWN0LnZhbHVlcyhkYXRhc2V0cykubWFwKGRhdGFzZXQgPT4gKFxuICAgICAgPERhdGFzZXRNb2RhbFRhYlxuICAgICAgICBjbGFzc05hbWU9XCJkYXRhc2V0LW1vZGFsLXRhYlwiXG4gICAgICAgIGFjdGl2ZT17ZGF0YXNldCA9PT0gYWN0aXZlRGF0YXNldH1cbiAgICAgICAga2V5PXtkYXRhc2V0LmlkfVxuICAgICAgICBvbkNsaWNrPXsoKSA9PiBzaG93RGF0YXNldFRhYmxlKGRhdGFzZXQuaWQpfVxuICAgICAgPlxuICAgICAgICA8RGF0YXNldExhYmVsIGRhdGFzZXQ9e2RhdGFzZXR9Lz5cbiAgICAgIDwvRGF0YXNldE1vZGFsVGFiPlxuICAgICkpfVxuICA8L0RhdGFzZXRDYXRhbG9nPlxuKTtcblxuY29uc3QgRGF0YVRhYmxlTW9kYWxGYWN0b3J5ID0gKCkgPT4gRGF0YVRhYmxlTW9kYWw7XG5leHBvcnQgZGVmYXVsdCBEYXRhVGFibGVNb2RhbEZhY3Rvcnk7XG4iXX0=