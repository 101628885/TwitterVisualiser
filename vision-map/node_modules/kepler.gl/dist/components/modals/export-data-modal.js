'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _taggedTemplateLiteral2 = require('babel-runtime/helpers/taggedTemplateLiteral');

var _taggedTemplateLiteral3 = _interopRequireDefault(_taggedTemplateLiteral2);

var _templateObject = (0, _taggedTemplateLiteral3.default)(['\n  display: flex;\n  flex-direction: row;\n  margin: 35px 0;\n  width: 100%;\n\n  .description {\n    width: 185px;\n    \n    .title {\n      font-weight: 500;\n      color: ', ';\n      font-size: 12px;\n    }\n    .subtitle {\n      color: ', ';\n      font-size: 11px;\n    }\n  }\n\n  .selection {\n    display: flex;\n    flex-wrap: wrap;\n    flex: 1;\n    padding-left: 50px;\n\n    select {\n      background-color: white;\n      border-radius: 1px;\n      display: inline-block;\n      font: inherit;\n      line-height: 1.5em;\n      padding: 0.5em 3.5em 0.5em 1em;\n      margin: 0;      \n      box-sizing: border-box;\n      appearance: none;\n      width: 250px;\n      height: 36px;\n\n      background-image:\n        linear-gradient(45deg, transparent 50%, gray 50%),\n        linear-gradient(135deg, gray 50%, transparent 50%),\n        linear-gradient(to right, #ccc, #ccc);\n      background-position:\n        calc(100% - 20px) calc(1em + 2px),\n        calc(100% - 15px) calc(1em + 2px),\n        calc(100% - 2.5em) 4.5em;\n      background-size:\n        5px 5px,\n        5px 5px,\n        1px 1.5em;\n      background-repeat: no-repeat;\n    }\n\n    select:focus {\n      background-image:\n        linear-gradient(45deg, green 50%, transparent 50%),\n        linear-gradient(135deg, transparent 50%, green 50%),\n        linear-gradient(to right, #ccc, #ccc);\n      background-position:\n        calc(100% - 15px) 1em,\n        calc(100% - 20px) 1em,\n        calc(100% - 2.5em) 4.5em;\n      background-size:\n        5px 5px,\n        5px 5px,\n        1px 1.5em;\n      background-repeat: no-repeat;\n      border-color: green;\n      outline: 0;\n    }\n  }\n'], ['\n  display: flex;\n  flex-direction: row;\n  margin: 35px 0;\n  width: 100%;\n\n  .description {\n    width: 185px;\n    \n    .title {\n      font-weight: 500;\n      color: ', ';\n      font-size: 12px;\n    }\n    .subtitle {\n      color: ', ';\n      font-size: 11px;\n    }\n  }\n\n  .selection {\n    display: flex;\n    flex-wrap: wrap;\n    flex: 1;\n    padding-left: 50px;\n\n    select {\n      background-color: white;\n      border-radius: 1px;\n      display: inline-block;\n      font: inherit;\n      line-height: 1.5em;\n      padding: 0.5em 3.5em 0.5em 1em;\n      margin: 0;      \n      box-sizing: border-box;\n      appearance: none;\n      width: 250px;\n      height: 36px;\n\n      background-image:\n        linear-gradient(45deg, transparent 50%, gray 50%),\n        linear-gradient(135deg, gray 50%, transparent 50%),\n        linear-gradient(to right, #ccc, #ccc);\n      background-position:\n        calc(100% - 20px) calc(1em + 2px),\n        calc(100% - 15px) calc(1em + 2px),\n        calc(100% - 2.5em) 4.5em;\n      background-size:\n        5px 5px,\n        5px 5px,\n        1px 1.5em;\n      background-repeat: no-repeat;\n    }\n\n    select:focus {\n      background-image:\n        linear-gradient(45deg, green 50%, transparent 50%),\n        linear-gradient(135deg, transparent 50%, green 50%),\n        linear-gradient(to right, #ccc, #ccc);\n      background-position:\n        calc(100% - 15px) 1em,\n        calc(100% - 20px) 1em,\n        calc(100% - 2.5em) 4.5em;\n      background-size:\n        5px 5px,\n        5px 5px,\n        1px 1.5em;\n      background-repeat: no-repeat;\n      border-color: green;\n      outline: 0;\n    }\n  }\n']),
    _templateObject2 = (0, _taggedTemplateLiteral3.default)(['\n  border-radius: 2px;\n  border: 1px solid ', ';\n  color: ', ';\n  cursor: pointer;\n  font-weight: 500;\n  height: 100px;\n  margin: 4px;\n  padding: 6px 10px;\n  width: 100px;\n\n  :hover {\n    color: ', ';\n    border: 1px solid ', ';\n  }\n'], ['\n  border-radius: 2px;\n  border: 1px solid ', ';\n  color: ', ';\n  cursor: pointer;\n  font-weight: 500;\n  height: 100px;\n  margin: 4px;\n  padding: 6px 10px;\n  width: 100px;\n\n  :hover {\n    color: ', ';\n    border: 1px solid ', ';\n  }\n']),
    _templateObject3 = (0, _taggedTemplateLiteral3.default)(['\n  align-items: center;\n  border-radius: 2px;\n  border: 1px solid ', ';\n  cursor: pointer;\n  display: flex;\n  flex-direction: column;\n  height: 60px;\n  justify-content: center;\n  margin: 4px;\n  padding: 8px 12px;\n  width: 140px;\n\n  :hover {\n    border: 1px solid ', ';\n  }\n\n  .filtered-title {\n    color: ', ';\n    font-size: 12px;\n    font-weight: 500;\n  }\n  .filtered-subtitle {\n    color: ', ';\n    font-size: 11px;\n  }\n'], ['\n  align-items: center;\n  border-radius: 2px;\n  border: 1px solid ', ';\n  cursor: pointer;\n  display: flex;\n  flex-direction: column;\n  height: 60px;\n  justify-content: center;\n  margin: 4px;\n  padding: 8px 12px;\n  width: 140px;\n\n  :hover {\n    border: 1px solid ', ';\n  }\n\n  .filtered-title {\n    color: ', ';\n    font-size: 12px;\n    font-weight: 500;\n  }\n  .filtered-subtitle {\n    color: ', ';\n    font-size: 11px;\n  }\n']); // Copyright (c) 2018 Uber Technologies, Inc.
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

var _defaultSettings = require('../../constants/default-settings');

var _icons = require('../common/icons');

var _styledComponents3 = require('../common/styled-components');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var StyledExportDataSection = _styledComponents2.default.div(_templateObject, function (props) {
  return props.theme.textColorLT;
}, function (props) {
  return props.theme.textColor;
});

var StyledDataType = _styledComponents2.default.div(_templateObject2, function (props) {
  return props.selected ? props.theme.primaryBtnBgd : props.theme.selectBorderColorLT;
}, function (props) {
  return props.selected ? props.theme.primaryBtnBgd : props.theme.selectBorderColorLT;
}, function (props) {
  return props.available && props.theme.primaryBtnBgd;
}, function (props) {
  return props.available && props.theme.primaryBtnBgd;
});

var StyledFilteredDataOption = _styledComponents2.default.div(_templateObject3, function (props) {
  return props.selected ? props.theme.primaryBtnBgd : props.theme.selectBorderColorLT;
}, function (props) {
  return props.theme.primaryBtnBgd;
}, function (props) {
  return props.theme.textColorLT;
}, function (props) {
  return props.theme.textColor;
});

var propTypes = {
  datasets: _propTypes2.default.object.isRequired,
  selectedDataset: _propTypes2.default.string,
  dataType: _propTypes2.default.string.isRequired,
  filtered: _propTypes2.default.bool.isRequired,
  // callbacks
  onClose: _propTypes2.default.func.isRequired,
  onChangeExportSelectedDataset: _propTypes2.default.func.isRequired,
  onChangeExportDataType: _propTypes2.default.func.isRequired,
  onChangeExportFiltered: _propTypes2.default.func.isRequired,
  onChangeExportConfig: _propTypes2.default.func.isRequired
};

var getDataRowCount = function getDataRowCount(datasets, selectedDataset, filtered) {
  var selectedData = datasets[selectedDataset];
  if (!selectedData) {
    return Object.keys(datasets).length + ' Files ';
  }
  var allData = selectedData.allData,
      data = selectedData.data;

  var rowCount = filtered ? data.length : allData.length;
  return rowCount.toLocaleString('en') + ' Rows';
};

var ExportDataModal = function ExportDataModal(_ref) {
  var datasets = _ref.datasets,
      selectedDataset = _ref.selectedDataset,
      dataType = _ref.dataType,
      filtered = _ref.filtered,
      config = _ref.config,
      onChangeExportDataType = _ref.onChangeExportDataType,
      onChangeExportSelectedDataset = _ref.onChangeExportSelectedDataset,
      onChangeExportFiltered = _ref.onChangeExportFiltered;
  return _react2.default.createElement(
    'div',
    { className: 'export-data-modal' },
    _react2.default.createElement(
      _styledComponents3.StyledModalContent,
      null,
      _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          StyledExportDataSection,
          null,
          _react2.default.createElement(
            'div',
            { className: 'description' },
            _react2.default.createElement(
              'div',
              { className: 'title' },
              'Dataset'
            ),
            _react2.default.createElement(
              'div',
              { className: 'subtitle' },
              'Choose the datasets you want to export'
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'selection' },
            _react2.default.createElement(
              'select',
              { value: selectedDataset, onChange: function onChange(e) {
                  return onChangeExportSelectedDataset({ dataset: e.target.value });
                } },
              ['All'].concat(Object.keys(datasets)).map(function (d) {
                return _react2.default.createElement(
                  'option',
                  { key: d, value: d },
                  datasets[d] && datasets[d].label || d
                );
              })
            )
          )
        ),
        _react2.default.createElement(
          StyledExportDataSection,
          null,
          _react2.default.createElement(
            'div',
            { className: 'description' },
            _react2.default.createElement(
              'div',
              { className: 'title' },
              'Data Type'
            ),
            _react2.default.createElement(
              'div',
              { className: 'subtitle' },
              'Choose the type of data you want to export'
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'selection' },
            _defaultSettings.EXPORT_DATA_TYPE_OPTIONS.map(function (op) {
              return _react2.default.createElement(
                StyledDataType,
                {
                  key: op.id,
                  selected: dataType === op.id,
                  available: op.available,
                  onClick: function onClick() {
                    return op.available && onChangeExportDataType({ dataType: op.id });
                  }
                },
                _react2.default.createElement(_icons.FileType, { ext: op.label, height: '80px', fontSize: '11px' })
              );
            })
          )
        ),
        _react2.default.createElement(
          StyledExportDataSection,
          null,
          _react2.default.createElement(
            'div',
            { className: 'description' },
            _react2.default.createElement(
              'div',
              { className: 'title' },
              'Filter Data'
            ),
            _react2.default.createElement(
              'div',
              { className: 'subtitle' },
              'You can choose exporting original data or filtered data'
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'selection' },
            _react2.default.createElement(
              StyledFilteredDataOption,
              { selected: !filtered, onClick: function onClick() {
                  return onChangeExportFiltered({ filtered: false });
                } },
              _react2.default.createElement(
                'div',
                { className: 'filtered-title' },
                'Unfiltered Data'
              ),
              _react2.default.createElement(
                'div',
                { className: 'filtered-subtitle' },
                getDataRowCount(datasets, selectedDataset, false)
              )
            ),
            _react2.default.createElement(
              StyledFilteredDataOption,
              { selected: filtered, onClick: function onClick() {
                  return onChangeExportFiltered({ filtered: true });
                } },
              _react2.default.createElement(
                'div',
                { className: 'filtered-title' },
                'Filtered Data'
              ),
              _react2.default.createElement(
                'div',
                { className: 'filtered-subtitle' },
                getDataRowCount(datasets, selectedDataset, true)
              )
            )
          )
        )
      )
    )
  );
};

ExportDataModal.propTypes = propTypes;

var ExportDataModalFactory = function ExportDataModalFactory() {
  return ExportDataModal;
};
exports.default = ExportDataModalFactory;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL21vZGFscy9leHBvcnQtZGF0YS1tb2RhbC5qcyJdLCJuYW1lcyI6WyJTdHlsZWRFeHBvcnREYXRhU2VjdGlvbiIsInN0eWxlZCIsImRpdiIsInByb3BzIiwidGhlbWUiLCJ0ZXh0Q29sb3JMVCIsInRleHRDb2xvciIsIlN0eWxlZERhdGFUeXBlIiwic2VsZWN0ZWQiLCJwcmltYXJ5QnRuQmdkIiwic2VsZWN0Qm9yZGVyQ29sb3JMVCIsImF2YWlsYWJsZSIsIlN0eWxlZEZpbHRlcmVkRGF0YU9wdGlvbiIsInByb3BUeXBlcyIsImRhdGFzZXRzIiwiUHJvcFR5cGVzIiwib2JqZWN0IiwiaXNSZXF1aXJlZCIsInNlbGVjdGVkRGF0YXNldCIsInN0cmluZyIsImRhdGFUeXBlIiwiZmlsdGVyZWQiLCJib29sIiwib25DbG9zZSIsImZ1bmMiLCJvbkNoYW5nZUV4cG9ydFNlbGVjdGVkRGF0YXNldCIsIm9uQ2hhbmdlRXhwb3J0RGF0YVR5cGUiLCJvbkNoYW5nZUV4cG9ydEZpbHRlcmVkIiwib25DaGFuZ2VFeHBvcnRDb25maWciLCJnZXREYXRhUm93Q291bnQiLCJzZWxlY3RlZERhdGEiLCJPYmplY3QiLCJrZXlzIiwibGVuZ3RoIiwiYWxsRGF0YSIsImRhdGEiLCJyb3dDb3VudCIsInRvTG9jYWxlU3RyaW5nIiwiRXhwb3J0RGF0YU1vZGFsIiwiY29uZmlnIiwiZGF0YXNldCIsImUiLCJ0YXJnZXQiLCJ2YWx1ZSIsImNvbmNhdCIsIm1hcCIsImQiLCJsYWJlbCIsIkVYUE9SVF9EQVRBX1RZUEVfT1BUSU9OUyIsIm9wIiwiaWQiLCJFeHBvcnREYXRhTW9kYWxGYWN0b3J5Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7MjhCQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUVBOztBQUNBOztBQUNBOzs7O0FBRUEsSUFBTUEsMEJBQTBCQywyQkFBT0MsR0FBakMsa0JBV1M7QUFBQSxTQUFTQyxNQUFNQyxLQUFOLENBQVlDLFdBQXJCO0FBQUEsQ0FYVCxFQWVTO0FBQUEsU0FBU0YsTUFBTUMsS0FBTixDQUFZRSxTQUFyQjtBQUFBLENBZlQsQ0FBTjs7QUEwRUEsSUFBTUMsaUJBQWlCTiwyQkFBT0MsR0FBeEIsbUJBRWdCO0FBQUEsU0FBU0MsTUFBTUssUUFBTixHQUFpQkwsTUFBTUMsS0FBTixDQUFZSyxhQUE3QixHQUE2Q04sTUFBTUMsS0FBTixDQUFZTSxtQkFBbEU7QUFBQSxDQUZoQixFQUdLO0FBQUEsU0FBU1AsTUFBTUssUUFBTixHQUFpQkwsTUFBTUMsS0FBTixDQUFZSyxhQUE3QixHQUE2Q04sTUFBTUMsS0FBTixDQUFZTSxtQkFBbEU7QUFBQSxDQUhMLEVBWU87QUFBQSxTQUFTUCxNQUFNUSxTQUFOLElBQW1CUixNQUFNQyxLQUFOLENBQVlLLGFBQXhDO0FBQUEsQ0FaUCxFQWFrQjtBQUFBLFNBQVNOLE1BQU1RLFNBQU4sSUFBbUJSLE1BQU1DLEtBQU4sQ0FBWUssYUFBeEM7QUFBQSxDQWJsQixDQUFOOztBQWlCQSxJQUFNRywyQkFBMkJYLDJCQUFPQyxHQUFsQyxtQkFHZ0I7QUFBQSxTQUFTQyxNQUFNSyxRQUFOLEdBQWlCTCxNQUFNQyxLQUFOLENBQVlLLGFBQTdCLEdBQTZDTixNQUFNQyxLQUFOLENBQVlNLG1CQUFsRTtBQUFBLENBSGhCLEVBY2tCO0FBQUEsU0FBU1AsTUFBTUMsS0FBTixDQUFZSyxhQUFyQjtBQUFBLENBZGxCLEVBa0JPO0FBQUEsU0FBU04sTUFBTUMsS0FBTixDQUFZQyxXQUFyQjtBQUFBLENBbEJQLEVBdUJPO0FBQUEsU0FBU0YsTUFBTUMsS0FBTixDQUFZRSxTQUFyQjtBQUFBLENBdkJQLENBQU47O0FBNEJBLElBQU1PLFlBQVk7QUFDaEJDLFlBQVVDLG9CQUFVQyxNQUFWLENBQWlCQyxVQURYO0FBRWhCQyxtQkFBaUJILG9CQUFVSSxNQUZYO0FBR2hCQyxZQUFVTCxvQkFBVUksTUFBVixDQUFpQkYsVUFIWDtBQUloQkksWUFBVU4sb0JBQVVPLElBQVYsQ0FBZUwsVUFKVDtBQUtoQjtBQUNBTSxXQUFTUixvQkFBVVMsSUFBVixDQUFlUCxVQU5SO0FBT2hCUSxpQ0FBK0JWLG9CQUFVUyxJQUFWLENBQWVQLFVBUDlCO0FBUWhCUywwQkFBd0JYLG9CQUFVUyxJQUFWLENBQWVQLFVBUnZCO0FBU2hCVSwwQkFBd0JaLG9CQUFVUyxJQUFWLENBQWVQLFVBVHZCO0FBVWhCVyx3QkFBc0JiLG9CQUFVUyxJQUFWLENBQWVQO0FBVnJCLENBQWxCOztBQWFBLElBQU1ZLGtCQUFrQixTQUFsQkEsZUFBa0IsQ0FBQ2YsUUFBRCxFQUFXSSxlQUFYLEVBQTRCRyxRQUE1QixFQUF5QztBQUMvRCxNQUFNUyxlQUFlaEIsU0FBU0ksZUFBVCxDQUFyQjtBQUNBLE1BQUksQ0FBQ1ksWUFBTCxFQUFtQjtBQUNqQixXQUFVQyxPQUFPQyxJQUFQLENBQVlsQixRQUFaLEVBQXNCbUIsTUFBaEM7QUFDRDtBQUo4RCxNQUt4REMsT0FMd0QsR0FLdkNKLFlBTHVDLENBS3hESSxPQUx3RDtBQUFBLE1BSy9DQyxJQUwrQyxHQUt2Q0wsWUFMdUMsQ0FLL0NLLElBTCtDOztBQU0vRCxNQUFNQyxXQUFXZixXQUFXYyxLQUFLRixNQUFoQixHQUF5QkMsUUFBUUQsTUFBbEQ7QUFDQSxTQUFVRyxTQUFTQyxjQUFULENBQXdCLElBQXhCLENBQVY7QUFDRCxDQVJEOztBQVVBLElBQU1DLGtCQUFrQixTQUFsQkEsZUFBa0I7QUFBQSxNQUN0QnhCLFFBRHNCLFFBQ3RCQSxRQURzQjtBQUFBLE1BRXRCSSxlQUZzQixRQUV0QkEsZUFGc0I7QUFBQSxNQUd0QkUsUUFIc0IsUUFHdEJBLFFBSHNCO0FBQUEsTUFJdEJDLFFBSnNCLFFBSXRCQSxRQUpzQjtBQUFBLE1BS3RCa0IsTUFMc0IsUUFLdEJBLE1BTHNCO0FBQUEsTUFPdEJiLHNCQVBzQixRQU90QkEsc0JBUHNCO0FBQUEsTUFRdEJELDZCQVJzQixRQVF0QkEsNkJBUnNCO0FBQUEsTUFTdEJFLHNCQVRzQixRQVN0QkEsc0JBVHNCO0FBQUEsU0FXdEI7QUFBQTtBQUFBLE1BQUssV0FBVSxtQkFBZjtBQUNFO0FBQUMsMkNBQUQ7QUFBQTtBQUNFO0FBQUE7QUFBQTtBQUNFO0FBQUMsaUNBQUQ7QUFBQTtBQUNFO0FBQUE7QUFBQSxjQUFLLFdBQVUsYUFBZjtBQUNFO0FBQUE7QUFBQSxnQkFBSyxXQUFVLE9BQWY7QUFBQTtBQUFBLGFBREY7QUFJRTtBQUFBO0FBQUEsZ0JBQUssV0FBVSxVQUFmO0FBQUE7QUFBQTtBQUpGLFdBREY7QUFTRTtBQUFBO0FBQUEsY0FBSyxXQUFVLFdBQWY7QUFDRTtBQUFBO0FBQUEsZ0JBQVEsT0FBT1QsZUFBZixFQUFnQyxVQUFVO0FBQUEseUJBQUtPLDhCQUE4QixFQUFDZSxTQUFTQyxFQUFFQyxNQUFGLENBQVNDLEtBQW5CLEVBQTlCLENBQUw7QUFBQSxpQkFBMUM7QUFDQyxlQUFDLEtBQUQsRUFBUUMsTUFBUixDQUFlYixPQUFPQyxJQUFQLENBQVlsQixRQUFaLENBQWYsRUFBc0MrQixHQUF0QyxDQUEwQztBQUFBLHVCQUN6QztBQUFBO0FBQUEsb0JBQVEsS0FBS0MsQ0FBYixFQUFnQixPQUFPQSxDQUF2QjtBQUE0QmhDLDJCQUFTZ0MsQ0FBVCxLQUFlaEMsU0FBU2dDLENBQVQsRUFBWUMsS0FBNUIsSUFBc0NEO0FBQWpFLGlCQUR5QztBQUFBLGVBQTFDO0FBREQ7QUFERjtBQVRGLFNBREY7QUFtQkU7QUFBQyxpQ0FBRDtBQUFBO0FBQ0U7QUFBQTtBQUFBLGNBQUssV0FBVSxhQUFmO0FBQ0U7QUFBQTtBQUFBLGdCQUFLLFdBQVUsT0FBZjtBQUFBO0FBQUEsYUFERjtBQUlFO0FBQUE7QUFBQSxnQkFBSyxXQUFVLFVBQWY7QUFBQTtBQUFBO0FBSkYsV0FERjtBQVNFO0FBQUE7QUFBQSxjQUFLLFdBQVUsV0FBZjtBQUNHRSxzREFBeUJILEdBQXpCLENBQTZCO0FBQUEscUJBQzVCO0FBQUMsOEJBQUQ7QUFBQTtBQUNFLHVCQUFLSSxHQUFHQyxFQURWO0FBRUUsNEJBQVU5QixhQUFhNkIsR0FBR0MsRUFGNUI7QUFHRSw2QkFBV0QsR0FBR3RDLFNBSGhCO0FBSUUsMkJBQVM7QUFBQSwyQkFBTXNDLEdBQUd0QyxTQUFILElBQWdCZSx1QkFBdUIsRUFBQ04sVUFBVTZCLEdBQUdDLEVBQWQsRUFBdkIsQ0FBdEI7QUFBQTtBQUpYO0FBTUUsOENBQUMsZUFBRCxJQUFVLEtBQUtELEdBQUdGLEtBQWxCLEVBQXlCLFFBQU8sTUFBaEMsRUFBdUMsVUFBUyxNQUFoRDtBQU5GLGVBRDRCO0FBQUEsYUFBN0I7QUFESDtBQVRGLFNBbkJGO0FBMENFO0FBQUMsaUNBQUQ7QUFBQTtBQUNFO0FBQUE7QUFBQSxjQUFLLFdBQVUsYUFBZjtBQUNFO0FBQUE7QUFBQSxnQkFBSyxXQUFVLE9BQWY7QUFBQTtBQUFBLGFBREY7QUFJRTtBQUFBO0FBQUEsZ0JBQUssV0FBVSxVQUFmO0FBQUE7QUFBQTtBQUpGLFdBREY7QUFTRTtBQUFBO0FBQUEsY0FBSyxXQUFVLFdBQWY7QUFDRTtBQUFDLHNDQUFEO0FBQUEsZ0JBQTBCLFVBQVUsQ0FBQzFCLFFBQXJDLEVBQStDLFNBQVM7QUFBQSx5QkFBTU0sdUJBQXVCLEVBQUNOLFVBQVUsS0FBWCxFQUF2QixDQUFOO0FBQUEsaUJBQXhEO0FBQ0U7QUFBQTtBQUFBLGtCQUFLLFdBQVUsZ0JBQWY7QUFBQTtBQUFBLGVBREY7QUFFRTtBQUFBO0FBQUEsa0JBQUssV0FBVSxtQkFBZjtBQUFvQ1EsZ0NBQWdCZixRQUFoQixFQUEwQkksZUFBMUIsRUFBMkMsS0FBM0M7QUFBcEM7QUFGRixhQURGO0FBS0U7QUFBQyxzQ0FBRDtBQUFBLGdCQUEwQixVQUFVRyxRQUFwQyxFQUE4QyxTQUFTO0FBQUEseUJBQU1NLHVCQUF1QixFQUFDTixVQUFVLElBQVgsRUFBdkIsQ0FBTjtBQUFBLGlCQUF2RDtBQUNFO0FBQUE7QUFBQSxrQkFBSyxXQUFVLGdCQUFmO0FBQUE7QUFBQSxlQURGO0FBRUU7QUFBQTtBQUFBLGtCQUFLLFdBQVUsbUJBQWY7QUFBb0NRLGdDQUFnQmYsUUFBaEIsRUFBMEJJLGVBQTFCLEVBQTJDLElBQTNDO0FBQXBDO0FBRkY7QUFMRjtBQVRGO0FBMUNGO0FBREY7QUFERixHQVhzQjtBQUFBLENBQXhCOztBQWlGQW9CLGdCQUFnQnpCLFNBQWhCLEdBQTRCQSxTQUE1Qjs7QUFFQSxJQUFNc0MseUJBQXlCLFNBQXpCQSxzQkFBeUI7QUFBQSxTQUFNYixlQUFOO0FBQUEsQ0FBL0I7a0JBQ2VhLHNCIiwiZmlsZSI6ImV4cG9ydC1kYXRhLW1vZGFsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSAyMDE4IFViZXIgVGVjaG5vbG9naWVzLCBJbmMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuLy8gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuLy8gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuLy8gdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuLy8gY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4vLyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4vLyBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4vLyBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbi8vIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuLy8gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuLy8gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbi8vIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbi8vIFRIRSBTT0ZUV0FSRS5cblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgc3R5bGVkIGZyb20gJ3N0eWxlZC1jb21wb25lbnRzJztcblxuaW1wb3J0IHtFWFBPUlRfREFUQV9UWVBFX09QVElPTlN9IGZyb20gJ2NvbnN0YW50cy9kZWZhdWx0LXNldHRpbmdzJztcbmltcG9ydCB7RmlsZVR5cGV9IGZyb20gJ2NvbXBvbmVudHMvY29tbW9uL2ljb25zJztcbmltcG9ydCB7U3R5bGVkTW9kYWxDb250ZW50fSBmcm9tICdjb21wb25lbnRzL2NvbW1vbi9zdHlsZWQtY29tcG9uZW50cyc7XG5cbmNvbnN0IFN0eWxlZEV4cG9ydERhdGFTZWN0aW9uID0gc3R5bGVkLmRpdmBcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IHJvdztcbiAgbWFyZ2luOiAzNXB4IDA7XG4gIHdpZHRoOiAxMDAlO1xuXG4gIC5kZXNjcmlwdGlvbiB7XG4gICAgd2lkdGg6IDE4NXB4O1xuICAgIFxuICAgIC50aXRsZSB7XG4gICAgICBmb250LXdlaWdodDogNTAwO1xuICAgICAgY29sb3I6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUudGV4dENvbG9yTFR9O1xuICAgICAgZm9udC1zaXplOiAxMnB4O1xuICAgIH1cbiAgICAuc3VidGl0bGUge1xuICAgICAgY29sb3I6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUudGV4dENvbG9yfTtcbiAgICAgIGZvbnQtc2l6ZTogMTFweDtcbiAgICB9XG4gIH1cblxuICAuc2VsZWN0aW9uIHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGZsZXgtd3JhcDogd3JhcDtcbiAgICBmbGV4OiAxO1xuICAgIHBhZGRpbmctbGVmdDogNTBweDtcblxuICAgIHNlbGVjdCB7XG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcbiAgICAgIGJvcmRlci1yYWRpdXM6IDFweDtcbiAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgICAgIGZvbnQ6IGluaGVyaXQ7XG4gICAgICBsaW5lLWhlaWdodDogMS41ZW07XG4gICAgICBwYWRkaW5nOiAwLjVlbSAzLjVlbSAwLjVlbSAxZW07XG4gICAgICBtYXJnaW46IDA7ICAgICAgXG4gICAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICAgICAgYXBwZWFyYW5jZTogbm9uZTtcbiAgICAgIHdpZHRoOiAyNTBweDtcbiAgICAgIGhlaWdodDogMzZweDtcblxuICAgICAgYmFja2dyb3VuZC1pbWFnZTpcbiAgICAgICAgbGluZWFyLWdyYWRpZW50KDQ1ZGVnLCB0cmFuc3BhcmVudCA1MCUsIGdyYXkgNTAlKSxcbiAgICAgICAgbGluZWFyLWdyYWRpZW50KDEzNWRlZywgZ3JheSA1MCUsIHRyYW5zcGFyZW50IDUwJSksXG4gICAgICAgIGxpbmVhci1ncmFkaWVudCh0byByaWdodCwgI2NjYywgI2NjYyk7XG4gICAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOlxuICAgICAgICBjYWxjKDEwMCUgLSAyMHB4KSBjYWxjKDFlbSArIDJweCksXG4gICAgICAgIGNhbGMoMTAwJSAtIDE1cHgpIGNhbGMoMWVtICsgMnB4KSxcbiAgICAgICAgY2FsYygxMDAlIC0gMi41ZW0pIDQuNWVtO1xuICAgICAgYmFja2dyb3VuZC1zaXplOlxuICAgICAgICA1cHggNXB4LFxuICAgICAgICA1cHggNXB4LFxuICAgICAgICAxcHggMS41ZW07XG4gICAgICBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0O1xuICAgIH1cblxuICAgIHNlbGVjdDpmb2N1cyB7XG4gICAgICBiYWNrZ3JvdW5kLWltYWdlOlxuICAgICAgICBsaW5lYXItZ3JhZGllbnQoNDVkZWcsIGdyZWVuIDUwJSwgdHJhbnNwYXJlbnQgNTAlKSxcbiAgICAgICAgbGluZWFyLWdyYWRpZW50KDEzNWRlZywgdHJhbnNwYXJlbnQgNTAlLCBncmVlbiA1MCUpLFxuICAgICAgICBsaW5lYXItZ3JhZGllbnQodG8gcmlnaHQsICNjY2MsICNjY2MpO1xuICAgICAgYmFja2dyb3VuZC1wb3NpdGlvbjpcbiAgICAgICAgY2FsYygxMDAlIC0gMTVweCkgMWVtLFxuICAgICAgICBjYWxjKDEwMCUgLSAyMHB4KSAxZW0sXG4gICAgICAgIGNhbGMoMTAwJSAtIDIuNWVtKSA0LjVlbTtcbiAgICAgIGJhY2tncm91bmQtc2l6ZTpcbiAgICAgICAgNXB4IDVweCxcbiAgICAgICAgNXB4IDVweCxcbiAgICAgICAgMXB4IDEuNWVtO1xuICAgICAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcbiAgICAgIGJvcmRlci1jb2xvcjogZ3JlZW47XG4gICAgICBvdXRsaW5lOiAwO1xuICAgIH1cbiAgfVxuYDtcblxuY29uc3QgU3R5bGVkRGF0YVR5cGUgPSBzdHlsZWQuZGl2YFxuICBib3JkZXItcmFkaXVzOiAycHg7XG4gIGJvcmRlcjogMXB4IHNvbGlkICR7cHJvcHMgPT4gcHJvcHMuc2VsZWN0ZWQgPyBwcm9wcy50aGVtZS5wcmltYXJ5QnRuQmdkIDogcHJvcHMudGhlbWUuc2VsZWN0Qm9yZGVyQ29sb3JMVH07XG4gIGNvbG9yOiAke3Byb3BzID0+IHByb3BzLnNlbGVjdGVkID8gcHJvcHMudGhlbWUucHJpbWFyeUJ0bkJnZCA6IHByb3BzLnRoZW1lLnNlbGVjdEJvcmRlckNvbG9yTFR9O1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIGZvbnQtd2VpZ2h0OiA1MDA7XG4gIGhlaWdodDogMTAwcHg7XG4gIG1hcmdpbjogNHB4O1xuICBwYWRkaW5nOiA2cHggMTBweDtcbiAgd2lkdGg6IDEwMHB4O1xuXG4gIDpob3ZlciB7XG4gICAgY29sb3I6ICR7cHJvcHMgPT4gcHJvcHMuYXZhaWxhYmxlICYmIHByb3BzLnRoZW1lLnByaW1hcnlCdG5CZ2R9O1xuICAgIGJvcmRlcjogMXB4IHNvbGlkICR7cHJvcHMgPT4gcHJvcHMuYXZhaWxhYmxlICYmIHByb3BzLnRoZW1lLnByaW1hcnlCdG5CZ2R9O1xuICB9XG5gO1xuXG5jb25zdCBTdHlsZWRGaWx0ZXJlZERhdGFPcHRpb24gPSBzdHlsZWQuZGl2YFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBib3JkZXItcmFkaXVzOiAycHg7XG4gIGJvcmRlcjogMXB4IHNvbGlkICR7cHJvcHMgPT4gcHJvcHMuc2VsZWN0ZWQgPyBwcm9wcy50aGVtZS5wcmltYXJ5QnRuQmdkIDogcHJvcHMudGhlbWUuc2VsZWN0Qm9yZGVyQ29sb3JMVH07XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgaGVpZ2h0OiA2MHB4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgbWFyZ2luOiA0cHg7XG4gIHBhZGRpbmc6IDhweCAxMnB4O1xuICB3aWR0aDogMTQwcHg7XG5cbiAgOmhvdmVyIHtcbiAgICBib3JkZXI6IDFweCBzb2xpZCAke3Byb3BzID0+IHByb3BzLnRoZW1lLnByaW1hcnlCdG5CZ2R9O1xuICB9XG5cbiAgLmZpbHRlcmVkLXRpdGxlIHtcbiAgICBjb2xvcjogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS50ZXh0Q29sb3JMVH07XG4gICAgZm9udC1zaXplOiAxMnB4O1xuICAgIGZvbnQtd2VpZ2h0OiA1MDA7XG4gIH1cbiAgLmZpbHRlcmVkLXN1YnRpdGxlIHtcbiAgICBjb2xvcjogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS50ZXh0Q29sb3J9O1xuICAgIGZvbnQtc2l6ZTogMTFweDtcbiAgfVxuYDtcblxuY29uc3QgcHJvcFR5cGVzID0ge1xuICBkYXRhc2V0czogUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkLFxuICBzZWxlY3RlZERhdGFzZXQ6IFByb3BUeXBlcy5zdHJpbmcsXG4gIGRhdGFUeXBlOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gIGZpbHRlcmVkOiBQcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxuICAvLyBjYWxsYmFja3NcbiAgb25DbG9zZTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgb25DaGFuZ2VFeHBvcnRTZWxlY3RlZERhdGFzZXQ6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gIG9uQ2hhbmdlRXhwb3J0RGF0YVR5cGU6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gIG9uQ2hhbmdlRXhwb3J0RmlsdGVyZWQ6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gIG9uQ2hhbmdlRXhwb3J0Q29uZmlnOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkXG59O1xuXG5jb25zdCBnZXREYXRhUm93Q291bnQgPSAoZGF0YXNldHMsIHNlbGVjdGVkRGF0YXNldCwgZmlsdGVyZWQpID0+IHtcbiAgY29uc3Qgc2VsZWN0ZWREYXRhID0gZGF0YXNldHNbc2VsZWN0ZWREYXRhc2V0XTtcbiAgaWYgKCFzZWxlY3RlZERhdGEpIHtcbiAgICByZXR1cm4gYCR7T2JqZWN0LmtleXMoZGF0YXNldHMpLmxlbmd0aH0gRmlsZXMgYCA7XG4gIH1cbiAgY29uc3Qge2FsbERhdGEsIGRhdGF9ID0gc2VsZWN0ZWREYXRhO1xuICBjb25zdCByb3dDb3VudCA9IGZpbHRlcmVkID8gZGF0YS5sZW5ndGggOiBhbGxEYXRhLmxlbmd0aDtcbiAgcmV0dXJuIGAke3Jvd0NvdW50LnRvTG9jYWxlU3RyaW5nKCdlbicpfSBSb3dzYDtcbn07XG5cbmNvbnN0IEV4cG9ydERhdGFNb2RhbCA9ICh7XG4gIGRhdGFzZXRzLFxuICBzZWxlY3RlZERhdGFzZXQsXG4gIGRhdGFUeXBlLFxuICBmaWx0ZXJlZCxcbiAgY29uZmlnLFxuICAvLyBjYWxsYmFja3M6XG4gIG9uQ2hhbmdlRXhwb3J0RGF0YVR5cGUsXG4gIG9uQ2hhbmdlRXhwb3J0U2VsZWN0ZWREYXRhc2V0LFxuICBvbkNoYW5nZUV4cG9ydEZpbHRlcmVkXG59KSA9PiAoXG4gIDxkaXYgY2xhc3NOYW1lPVwiZXhwb3J0LWRhdGEtbW9kYWxcIj5cbiAgICA8U3R5bGVkTW9kYWxDb250ZW50PlxuICAgICAgPGRpdj5cbiAgICAgICAgPFN0eWxlZEV4cG9ydERhdGFTZWN0aW9uPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZGVzY3JpcHRpb25cIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGl0bGVcIj5cbiAgICAgICAgICAgICAgRGF0YXNldFxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInN1YnRpdGxlXCI+XG4gICAgICAgICAgICAgIENob29zZSB0aGUgZGF0YXNldHMgeW91IHdhbnQgdG8gZXhwb3J0XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNlbGVjdGlvblwiPlxuICAgICAgICAgICAgPHNlbGVjdCB2YWx1ZT17c2VsZWN0ZWREYXRhc2V0fSBvbkNoYW5nZT17ZSA9PiBvbkNoYW5nZUV4cG9ydFNlbGVjdGVkRGF0YXNldCh7ZGF0YXNldDogZS50YXJnZXQudmFsdWV9KX0+XG4gICAgICAgICAgICB7WydBbGwnXS5jb25jYXQoT2JqZWN0LmtleXMoZGF0YXNldHMpKS5tYXAoZCA9PiAoXG4gICAgICAgICAgICAgIDxvcHRpb24ga2V5PXtkfSB2YWx1ZT17ZH0+eyhkYXRhc2V0c1tkXSAmJiBkYXRhc2V0c1tkXS5sYWJlbCkgfHwgZH08L29wdGlvbj5cbiAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgPC9zZWxlY3Q+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvU3R5bGVkRXhwb3J0RGF0YVNlY3Rpb24+XG5cbiAgICAgICAgPFN0eWxlZEV4cG9ydERhdGFTZWN0aW9uPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZGVzY3JpcHRpb25cIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGl0bGVcIj5cbiAgICAgICAgICAgICAgRGF0YSBUeXBlXG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3VidGl0bGVcIj5cbiAgICAgICAgICAgICAgQ2hvb3NlIHRoZSB0eXBlIG9mIGRhdGEgeW91IHdhbnQgdG8gZXhwb3J0XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNlbGVjdGlvblwiPlxuICAgICAgICAgICAge0VYUE9SVF9EQVRBX1RZUEVfT1BUSU9OUy5tYXAob3AgPT5cbiAgICAgICAgICAgICAgPFN0eWxlZERhdGFUeXBlXG4gICAgICAgICAgICAgICAga2V5PXtvcC5pZH1cbiAgICAgICAgICAgICAgICBzZWxlY3RlZD17ZGF0YVR5cGUgPT09IG9wLmlkfVxuICAgICAgICAgICAgICAgIGF2YWlsYWJsZT17b3AuYXZhaWxhYmxlfVxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IG9wLmF2YWlsYWJsZSAmJiBvbkNoYW5nZUV4cG9ydERhdGFUeXBlKHtkYXRhVHlwZTogb3AuaWR9KX1cbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDxGaWxlVHlwZSBleHQ9e29wLmxhYmVsfSBoZWlnaHQ9XCI4MHB4XCIgZm9udFNpemU9XCIxMXB4XCIgLz5cbiAgICAgICAgICAgICAgPC9TdHlsZWREYXRhVHlwZT5cbiAgICAgICAgICAgICl9XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvU3R5bGVkRXhwb3J0RGF0YVNlY3Rpb24+XG5cbiAgICAgICAgPFN0eWxlZEV4cG9ydERhdGFTZWN0aW9uPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZGVzY3JpcHRpb25cIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGl0bGVcIj5cbiAgICAgICAgICAgICAgRmlsdGVyIERhdGFcbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzdWJ0aXRsZVwiPlxuICAgICAgICAgICAgICBZb3UgY2FuIGNob29zZSBleHBvcnRpbmcgb3JpZ2luYWwgZGF0YSBvciBmaWx0ZXJlZCBkYXRhXG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNlbGVjdGlvblwiPlxuICAgICAgICAgICAgPFN0eWxlZEZpbHRlcmVkRGF0YU9wdGlvbiBzZWxlY3RlZD17IWZpbHRlcmVkfSBvbkNsaWNrPXsoKSA9PiBvbkNoYW5nZUV4cG9ydEZpbHRlcmVkKHtmaWx0ZXJlZDogZmFsc2V9KX0+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmlsdGVyZWQtdGl0bGVcIj5VbmZpbHRlcmVkIERhdGE8L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmaWx0ZXJlZC1zdWJ0aXRsZVwiPntnZXREYXRhUm93Q291bnQoZGF0YXNldHMsIHNlbGVjdGVkRGF0YXNldCwgZmFsc2UpfTwvZGl2PlxuICAgICAgICAgICAgPC9TdHlsZWRGaWx0ZXJlZERhdGFPcHRpb24+XG4gICAgICAgICAgICA8U3R5bGVkRmlsdGVyZWREYXRhT3B0aW9uIHNlbGVjdGVkPXtmaWx0ZXJlZH0gb25DbGljaz17KCkgPT4gb25DaGFuZ2VFeHBvcnRGaWx0ZXJlZCh7ZmlsdGVyZWQ6IHRydWV9KX0+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmlsdGVyZWQtdGl0bGVcIj5GaWx0ZXJlZCBEYXRhPC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmlsdGVyZWQtc3VidGl0bGVcIj57Z2V0RGF0YVJvd0NvdW50KGRhdGFzZXRzLCBzZWxlY3RlZERhdGFzZXQsIHRydWUpfTwvZGl2PlxuICAgICAgICAgICAgPC9TdHlsZWRGaWx0ZXJlZERhdGFPcHRpb24+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvU3R5bGVkRXhwb3J0RGF0YVNlY3Rpb24+XG5cbiAgICAgIDwvZGl2PlxuICAgIDwvU3R5bGVkTW9kYWxDb250ZW50PlxuICA8L2Rpdj5cbik7XG5cbkV4cG9ydERhdGFNb2RhbC5wcm9wVHlwZXMgPSBwcm9wVHlwZXM7XG5cbmNvbnN0IEV4cG9ydERhdGFNb2RhbEZhY3RvcnkgPSAoKSA9PiBFeHBvcnREYXRhTW9kYWw7XG5leHBvcnQgZGVmYXVsdCBFeHBvcnREYXRhTW9kYWxGYWN0b3J5O1xuIl19