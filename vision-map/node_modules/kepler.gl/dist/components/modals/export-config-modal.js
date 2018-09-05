'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _taggedTemplateLiteral2 = require('babel-runtime/helpers/taggedTemplateLiteral');

var _taggedTemplateLiteral3 = _interopRequireDefault(_taggedTemplateLiteral2);

var _templateObject = (0, _taggedTemplateLiteral3.default)(['\n  display: flex;\n  flex-direction: row;\n  margin: 35px 0;\n  width: 100%;\n\n  .description {\n    width: 185px;\n    \n    .title {\n      font-weight: 500;\n      color: ', ';\n      font-size: 12px;\n    }\n    .subtitle {\n      color: ', ';\n      font-size: 11px;\n    }\n    \n    .note {\n      color: ', ';\n      font-size: 11px;\n    }\n  }\n  \n  .selection {\n    display: flex;\n    flex-wrap: wrap;\n    flex: 1;\n    padding-left: 50px;\n\n    select {\n      background-color: white;\n      border-radius: 1px;\n      display: inline-block;\n      font: inherit;\n      line-height: 1.5em;\n      padding: 0.5em 3.5em 0.5em 1em;\n      margin: 0;      \n      box-sizing: border-box;\n      appearance: none;\n      width: 250px;\n      height: 36px;\n\n      background-image:\n        linear-gradient(45deg, transparent 50%, gray 50%),\n        linear-gradient(135deg, gray 50%, transparent 50%),\n        linear-gradient(to right, #ccc, #ccc);\n      background-position:\n        calc(100% - 20px) calc(1em + 2px),\n        calc(100% - 15px) calc(1em + 2px),\n        calc(100% - 2.5em) 4.5em;\n      background-size:\n        5px 5px,\n        5px 5px,\n        1px 1.5em;\n      background-repeat: no-repeat;\n    }\n\n    select:focus {\n      background-image:\n        linear-gradient(45deg, green 50%, transparent 50%),\n        linear-gradient(135deg, transparent 50%, green 50%),\n        linear-gradient(to right, #ccc, #ccc);\n      background-position:\n        calc(100% - 15px) 1em,\n        calc(100% - 20px) 1em,\n        calc(100% - 2.5em) 4.5em;\n      background-size:\n        5px 5px,\n        5px 5px,\n        1px 1.5em;\n      background-repeat: no-repeat;\n      border-color: green;\n      outline: 0;\n    }\n  }\n'], ['\n  display: flex;\n  flex-direction: row;\n  margin: 35px 0;\n  width: 100%;\n\n  .description {\n    width: 185px;\n    \n    .title {\n      font-weight: 500;\n      color: ', ';\n      font-size: 12px;\n    }\n    .subtitle {\n      color: ', ';\n      font-size: 11px;\n    }\n    \n    .note {\n      color: ', ';\n      font-size: 11px;\n    }\n  }\n  \n  .selection {\n    display: flex;\n    flex-wrap: wrap;\n    flex: 1;\n    padding-left: 50px;\n\n    select {\n      background-color: white;\n      border-radius: 1px;\n      display: inline-block;\n      font: inherit;\n      line-height: 1.5em;\n      padding: 0.5em 3.5em 0.5em 1em;\n      margin: 0;      \n      box-sizing: border-box;\n      appearance: none;\n      width: 250px;\n      height: 36px;\n\n      background-image:\n        linear-gradient(45deg, transparent 50%, gray 50%),\n        linear-gradient(135deg, gray 50%, transparent 50%),\n        linear-gradient(to right, #ccc, #ccc);\n      background-position:\n        calc(100% - 20px) calc(1em + 2px),\n        calc(100% - 15px) calc(1em + 2px),\n        calc(100% - 2.5em) 4.5em;\n      background-size:\n        5px 5px,\n        5px 5px,\n        1px 1.5em;\n      background-repeat: no-repeat;\n    }\n\n    select:focus {\n      background-image:\n        linear-gradient(45deg, green 50%, transparent 50%),\n        linear-gradient(135deg, transparent 50%, green 50%),\n        linear-gradient(to right, #ccc, #ccc);\n      background-position:\n        calc(100% - 15px) 1em,\n        calc(100% - 20px) 1em,\n        calc(100% - 2.5em) 4.5em;\n      background-size:\n        5px 5px,\n        5px 5px,\n        1px 1.5em;\n      background-repeat: no-repeat;\n      border-color: green;\n      outline: 0;\n    }\n  }\n']); // Copyright (c) 2018 Uber Technologies, Inc.
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

var _reactAce = require('react-ace');

var _reactAce2 = _interopRequireDefault(_reactAce);

var _switch = require('../common/switch');

var _switch2 = _interopRequireDefault(_switch);

var _styledComponents3 = require('../common/styled-components');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var propTypes = {
  config: _propTypes2.default.object.required
};

var StyledExportConfigSection = _styledComponents2.default.div(_templateObject, function (props) {
  return props.theme.textColorLT;
}, function (props) {
  return props.theme.textColor;
}, function (props) {
  return props.theme.errorColor;
});

var ExportConfigModal = function ExportConfigModal(_ref) {
  var data = _ref.data,
      config = _ref.config,
      onChangeExportData = _ref.onChangeExportData;
  return _react2.default.createElement(
    'div',
    { className: 'export-config-modal' },
    _react2.default.createElement(
      _styledComponents3.StyledModalContent,
      null,
      _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          StyledExportConfigSection,
          null,
          _react2.default.createElement(
            'div',
            { className: 'description' },
            _react2.default.createElement(
              'div',
              { className: 'title' },
              'Current Config'
            ),
            _react2.default.createElement(
              'div',
              { className: 'subtitle' },
              'You can copy or export the current Kepler.gl configuration.'
            ),
            _react2.default.createElement(
              'div',
              { className: 'note' },
              '* kepler.gl map config is coupled with loaded datasets. dataId key is used to bind layers and filters to a specific dataset. If you try to upload a configuration with a specific dataId you also need to make sure you existing dataset id match the dataId/s in the config.'
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'selection' },
            _react2.default.createElement(_reactAce2.default, {
              mode: 'json',
              theme: 'monokai',
              name: 'kepler.gl-config',
              fontSize: 9,
              readOnly: true,
              wrapEnabled: true,
              height: '280px',
              showPrintMargin: true,
              showGutter: true,
              highlightActiveLine: false,
              value: JSON.stringify(config, null, 2),
              setOptions: {
                enableBasicAutocompletion: false,
                enableLiveAutocompletion: true,
                enableSnippets: false,
                showLineNumbers: true,
                tabSize: 2
              } })
          )
        ),
        _react2.default.createElement(
          StyledExportConfigSection,
          null,
          _react2.default.createElement(
            'div',
            { className: 'description' },
            _react2.default.createElement(
              'div',
              { className: 'title' },
              'Export Current Map'
            ),
            _react2.default.createElement(
              'div',
              { className: 'subtitle' },
              'Export current map, including data and config. You can later load the same map by loading this file to kepler.gl.'
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'selection' },
            _react2.default.createElement(_switch2.default, { type: 'checkbox',
              id: 'export-map-config',
              checked: data,
              onChange: onChangeExportData })
          )
        )
      )
    )
  );
};

ExportConfigModal.propTypes = propTypes;

var ExportConfigModalFactory = function ExportConfigModalFactory() {
  return ExportConfigModal;
};
exports.default = ExportConfigModalFactory;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL21vZGFscy9leHBvcnQtY29uZmlnLW1vZGFsLmpzIl0sIm5hbWVzIjpbInByb3BUeXBlcyIsImNvbmZpZyIsIlByb3BUeXBlcyIsIm9iamVjdCIsInJlcXVpcmVkIiwiU3R5bGVkRXhwb3J0Q29uZmlnU2VjdGlvbiIsInN0eWxlZCIsImRpdiIsInByb3BzIiwidGhlbWUiLCJ0ZXh0Q29sb3JMVCIsInRleHRDb2xvciIsImVycm9yQ29sb3IiLCJFeHBvcnRDb25maWdNb2RhbCIsImRhdGEiLCJvbkNoYW5nZUV4cG9ydERhdGEiLCJKU09OIiwic3RyaW5naWZ5IiwiZW5hYmxlQmFzaWNBdXRvY29tcGxldGlvbiIsImVuYWJsZUxpdmVBdXRvY29tcGxldGlvbiIsImVuYWJsZVNuaXBwZXRzIiwic2hvd0xpbmVOdW1iZXJzIiwidGFiU2l6ZSIsIkV4cG9ydENvbmZpZ01vZGFsRmFjdG9yeSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztraEhBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUVBOzs7O0FBRUEsSUFBTUEsWUFBWTtBQUNoQkMsVUFBUUMsb0JBQVVDLE1BQVYsQ0FBaUJDO0FBRFQsQ0FBbEI7O0FBSUEsSUFBTUMsNEJBQTRCQywyQkFBT0MsR0FBbkMsa0JBV1M7QUFBQSxTQUFTQyxNQUFNQyxLQUFOLENBQVlDLFdBQXJCO0FBQUEsQ0FYVCxFQWVTO0FBQUEsU0FBU0YsTUFBTUMsS0FBTixDQUFZRSxTQUFyQjtBQUFBLENBZlQsRUFvQlM7QUFBQSxTQUFTSCxNQUFNQyxLQUFOLENBQVlHLFVBQXJCO0FBQUEsQ0FwQlQsQ0FBTjs7QUErRUEsSUFBTUMsb0JBQW9CLFNBQXBCQSxpQkFBb0I7QUFBQSxNQUN4QkMsSUFEd0IsUUFDeEJBLElBRHdCO0FBQUEsTUFFeEJiLE1BRndCLFFBRXhCQSxNQUZ3QjtBQUFBLE1BSXhCYyxrQkFKd0IsUUFJeEJBLGtCQUp3QjtBQUFBLFNBTXhCO0FBQUE7QUFBQSxNQUFLLFdBQVUscUJBQWY7QUFDRTtBQUFDLDJDQUFEO0FBQUE7QUFDRTtBQUFBO0FBQUE7QUFDRTtBQUFDLG1DQUFEO0FBQUE7QUFDRTtBQUFBO0FBQUEsY0FBSyxXQUFVLGFBQWY7QUFDRTtBQUFBO0FBQUEsZ0JBQUssV0FBVSxPQUFmO0FBQUE7QUFBQSxhQURGO0FBSUU7QUFBQTtBQUFBLGdCQUFLLFdBQVUsVUFBZjtBQUFBO0FBQUEsYUFKRjtBQU9FO0FBQUE7QUFBQSxnQkFBSyxXQUFVLE1BQWY7QUFBQTtBQUFBO0FBUEYsV0FERjtBQWVFO0FBQUE7QUFBQSxjQUFLLFdBQVUsV0FBZjtBQUNFLDBDQUFDLGtCQUFEO0FBQ0Usb0JBQUssTUFEUDtBQUVFLHFCQUFNLFNBRlI7QUFHRSxvQkFBSyxrQkFIUDtBQUlFLHdCQUFVLENBSlo7QUFLRSx3QkFBVSxJQUxaO0FBTUUsMkJBQWEsSUFOZjtBQU9FLHNCQUFPLE9BUFQ7QUFRRSwrQkFBaUIsSUFSbkI7QUFTRSwwQkFBWSxJQVRkO0FBVUUsbUNBQXFCLEtBVnZCO0FBV0UscUJBQU9DLEtBQUtDLFNBQUwsQ0FBZWhCLE1BQWYsRUFBdUIsSUFBdkIsRUFBNkIsQ0FBN0IsQ0FYVDtBQVlFLDBCQUFZO0FBQ1ZpQiwyQ0FBMkIsS0FEakI7QUFFVkMsMENBQTBCLElBRmhCO0FBR1ZDLGdDQUFnQixLQUhOO0FBSVZDLGlDQUFpQixJQUpQO0FBS1ZDLHlCQUFTO0FBTEMsZUFaZDtBQURGO0FBZkYsU0FERjtBQXNDRTtBQUFDLG1DQUFEO0FBQUE7QUFDRTtBQUFBO0FBQUEsY0FBSyxXQUFVLGFBQWY7QUFDRTtBQUFBO0FBQUEsZ0JBQUssV0FBVSxPQUFmO0FBQUE7QUFBQSxhQURGO0FBSUU7QUFBQTtBQUFBLGdCQUFLLFdBQVUsVUFBZjtBQUFBO0FBQUE7QUFKRixXQURGO0FBU0U7QUFBQTtBQUFBLGNBQUssV0FBVSxXQUFmO0FBQ0UsMENBQUMsZ0JBQUQsSUFBUSxNQUFLLFVBQWI7QUFDUSxrQkFBRyxtQkFEWDtBQUVRLHVCQUFTUixJQUZqQjtBQUdRLHdCQUFVQyxrQkFIbEI7QUFERjtBQVRGO0FBdENGO0FBREY7QUFERixHQU53QjtBQUFBLENBQTFCOztBQW1FQUYsa0JBQWtCYixTQUFsQixHQUE4QkEsU0FBOUI7O0FBRUEsSUFBTXVCLDJCQUEyQixTQUEzQkEsd0JBQTJCO0FBQUEsU0FBTVYsaUJBQU47QUFBQSxDQUFqQztrQkFDZVUsd0IiLCJmaWxlIjoiZXhwb3J0LWNvbmZpZy1tb2RhbC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgMjAxOCBVYmVyIFRlY2hub2xvZ2llcywgSW5jLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbi8vIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbi8vIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbi8vIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbi8vIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuLy8gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuLy8gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4vLyBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbi8vIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbi8vIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4vLyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4vLyBUSEUgU09GVFdBUkUuXG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHN0eWxlZCBmcm9tICdzdHlsZWQtY29tcG9uZW50cyc7XG5pbXBvcnQgQWNlRWRpdG9yIGZyb20gJ3JlYWN0LWFjZSc7XG5pbXBvcnQgU3dpdGNoIGZyb20gJ2NvbXBvbmVudHMvY29tbW9uL3N3aXRjaCc7XG5cbmltcG9ydCB7U3R5bGVkTW9kYWxDb250ZW50fSBmcm9tICdjb21wb25lbnRzL2NvbW1vbi9zdHlsZWQtY29tcG9uZW50cyc7XG5cbmNvbnN0IHByb3BUeXBlcyA9IHtcbiAgY29uZmlnOiBQcm9wVHlwZXMub2JqZWN0LnJlcXVpcmVkXG59O1xuXG5jb25zdCBTdHlsZWRFeHBvcnRDb25maWdTZWN0aW9uID0gc3R5bGVkLmRpdmBcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IHJvdztcbiAgbWFyZ2luOiAzNXB4IDA7XG4gIHdpZHRoOiAxMDAlO1xuXG4gIC5kZXNjcmlwdGlvbiB7XG4gICAgd2lkdGg6IDE4NXB4O1xuICAgIFxuICAgIC50aXRsZSB7XG4gICAgICBmb250LXdlaWdodDogNTAwO1xuICAgICAgY29sb3I6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUudGV4dENvbG9yTFR9O1xuICAgICAgZm9udC1zaXplOiAxMnB4O1xuICAgIH1cbiAgICAuc3VidGl0bGUge1xuICAgICAgY29sb3I6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUudGV4dENvbG9yfTtcbiAgICAgIGZvbnQtc2l6ZTogMTFweDtcbiAgICB9XG4gICAgXG4gICAgLm5vdGUge1xuICAgICAgY29sb3I6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUuZXJyb3JDb2xvcn07XG4gICAgICBmb250LXNpemU6IDExcHg7XG4gICAgfVxuICB9XG4gIFxuICAuc2VsZWN0aW9uIHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGZsZXgtd3JhcDogd3JhcDtcbiAgICBmbGV4OiAxO1xuICAgIHBhZGRpbmctbGVmdDogNTBweDtcblxuICAgIHNlbGVjdCB7XG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcbiAgICAgIGJvcmRlci1yYWRpdXM6IDFweDtcbiAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgICAgIGZvbnQ6IGluaGVyaXQ7XG4gICAgICBsaW5lLWhlaWdodDogMS41ZW07XG4gICAgICBwYWRkaW5nOiAwLjVlbSAzLjVlbSAwLjVlbSAxZW07XG4gICAgICBtYXJnaW46IDA7ICAgICAgXG4gICAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICAgICAgYXBwZWFyYW5jZTogbm9uZTtcbiAgICAgIHdpZHRoOiAyNTBweDtcbiAgICAgIGhlaWdodDogMzZweDtcblxuICAgICAgYmFja2dyb3VuZC1pbWFnZTpcbiAgICAgICAgbGluZWFyLWdyYWRpZW50KDQ1ZGVnLCB0cmFuc3BhcmVudCA1MCUsIGdyYXkgNTAlKSxcbiAgICAgICAgbGluZWFyLWdyYWRpZW50KDEzNWRlZywgZ3JheSA1MCUsIHRyYW5zcGFyZW50IDUwJSksXG4gICAgICAgIGxpbmVhci1ncmFkaWVudCh0byByaWdodCwgI2NjYywgI2NjYyk7XG4gICAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOlxuICAgICAgICBjYWxjKDEwMCUgLSAyMHB4KSBjYWxjKDFlbSArIDJweCksXG4gICAgICAgIGNhbGMoMTAwJSAtIDE1cHgpIGNhbGMoMWVtICsgMnB4KSxcbiAgICAgICAgY2FsYygxMDAlIC0gMi41ZW0pIDQuNWVtO1xuICAgICAgYmFja2dyb3VuZC1zaXplOlxuICAgICAgICA1cHggNXB4LFxuICAgICAgICA1cHggNXB4LFxuICAgICAgICAxcHggMS41ZW07XG4gICAgICBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0O1xuICAgIH1cblxuICAgIHNlbGVjdDpmb2N1cyB7XG4gICAgICBiYWNrZ3JvdW5kLWltYWdlOlxuICAgICAgICBsaW5lYXItZ3JhZGllbnQoNDVkZWcsIGdyZWVuIDUwJSwgdHJhbnNwYXJlbnQgNTAlKSxcbiAgICAgICAgbGluZWFyLWdyYWRpZW50KDEzNWRlZywgdHJhbnNwYXJlbnQgNTAlLCBncmVlbiA1MCUpLFxuICAgICAgICBsaW5lYXItZ3JhZGllbnQodG8gcmlnaHQsICNjY2MsICNjY2MpO1xuICAgICAgYmFja2dyb3VuZC1wb3NpdGlvbjpcbiAgICAgICAgY2FsYygxMDAlIC0gMTVweCkgMWVtLFxuICAgICAgICBjYWxjKDEwMCUgLSAyMHB4KSAxZW0sXG4gICAgICAgIGNhbGMoMTAwJSAtIDIuNWVtKSA0LjVlbTtcbiAgICAgIGJhY2tncm91bmQtc2l6ZTpcbiAgICAgICAgNXB4IDVweCxcbiAgICAgICAgNXB4IDVweCxcbiAgICAgICAgMXB4IDEuNWVtO1xuICAgICAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcbiAgICAgIGJvcmRlci1jb2xvcjogZ3JlZW47XG4gICAgICBvdXRsaW5lOiAwO1xuICAgIH1cbiAgfVxuYDtcblxuY29uc3QgRXhwb3J0Q29uZmlnTW9kYWwgPSAoe1xuICBkYXRhLFxuICBjb25maWcsXG4gIC8vIGFjdGlvbnNcbiAgb25DaGFuZ2VFeHBvcnREYXRhXG59KSA9PiAoXG4gIDxkaXYgY2xhc3NOYW1lPVwiZXhwb3J0LWNvbmZpZy1tb2RhbFwiPlxuICAgIDxTdHlsZWRNb2RhbENvbnRlbnQ+XG4gICAgICA8ZGl2PlxuICAgICAgICA8U3R5bGVkRXhwb3J0Q29uZmlnU2VjdGlvbj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImRlc2NyaXB0aW9uXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRpdGxlXCI+XG4gICAgICAgICAgICAgIEN1cnJlbnQgQ29uZmlnXG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3VidGl0bGVcIj5cbiAgICAgICAgICAgICAgWW91IGNhbiBjb3B5IG9yIGV4cG9ydCB0aGUgY3VycmVudCBLZXBsZXIuZ2wgY29uZmlndXJhdGlvbi5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJub3RlXCI+XG4gICAgICAgICAgICAgICoga2VwbGVyLmdsIG1hcCBjb25maWcgaXMgY291cGxlZCB3aXRoIGxvYWRlZCBkYXRhc2V0cy5cbiAgICAgICAgICAgICAgZGF0YUlkIGtleSBpcyB1c2VkIHRvIGJpbmQgbGF5ZXJzIGFuZCBmaWx0ZXJzIHRvIGEgc3BlY2lmaWMgZGF0YXNldC5cbiAgICAgICAgICAgICAgSWYgeW91IHRyeSB0byB1cGxvYWQgYSBjb25maWd1cmF0aW9uIHdpdGggYSBzcGVjaWZpYyBkYXRhSWQgeW91IGFsc28gbmVlZCB0byBtYWtlIHN1cmVcbiAgICAgICAgICAgICAgeW91IGV4aXN0aW5nIGRhdGFzZXQgaWQgbWF0Y2ggdGhlIGRhdGFJZC9zIGluIHRoZSBjb25maWcuXG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNlbGVjdGlvblwiPlxuICAgICAgICAgICAgPEFjZUVkaXRvclxuICAgICAgICAgICAgICBtb2RlPVwianNvblwiXG4gICAgICAgICAgICAgIHRoZW1lPVwibW9ub2thaVwiXG4gICAgICAgICAgICAgIG5hbWU9XCJrZXBsZXIuZ2wtY29uZmlnXCJcbiAgICAgICAgICAgICAgZm9udFNpemU9ezl9XG4gICAgICAgICAgICAgIHJlYWRPbmx5PXt0cnVlfVxuICAgICAgICAgICAgICB3cmFwRW5hYmxlZD17dHJ1ZX1cbiAgICAgICAgICAgICAgaGVpZ2h0PVwiMjgwcHhcIlxuICAgICAgICAgICAgICBzaG93UHJpbnRNYXJnaW49e3RydWV9XG4gICAgICAgICAgICAgIHNob3dHdXR0ZXI9e3RydWV9XG4gICAgICAgICAgICAgIGhpZ2hsaWdodEFjdGl2ZUxpbmU9e2ZhbHNlfVxuICAgICAgICAgICAgICB2YWx1ZT17SlNPTi5zdHJpbmdpZnkoY29uZmlnLCBudWxsLCAyKX1cbiAgICAgICAgICAgICAgc2V0T3B0aW9ucz17e1xuICAgICAgICAgICAgICAgIGVuYWJsZUJhc2ljQXV0b2NvbXBsZXRpb246IGZhbHNlLFxuICAgICAgICAgICAgICAgIGVuYWJsZUxpdmVBdXRvY29tcGxldGlvbjogdHJ1ZSxcbiAgICAgICAgICAgICAgICBlbmFibGVTbmlwcGV0czogZmFsc2UsXG4gICAgICAgICAgICAgICAgc2hvd0xpbmVOdW1iZXJzOiB0cnVlLFxuICAgICAgICAgICAgICAgIHRhYlNpemU6IDJcbiAgICAgICAgICAgICAgfX0vPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L1N0eWxlZEV4cG9ydENvbmZpZ1NlY3Rpb24+XG4gICAgICAgIDxTdHlsZWRFeHBvcnRDb25maWdTZWN0aW9uPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZGVzY3JpcHRpb25cIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGl0bGVcIj5cbiAgICAgICAgICAgICAgRXhwb3J0IEN1cnJlbnQgTWFwXG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3VidGl0bGVcIj5cbiAgICAgICAgICAgICAgRXhwb3J0IGN1cnJlbnQgbWFwLCBpbmNsdWRpbmcgZGF0YSBhbmQgY29uZmlnLiBZb3UgY2FuIGxhdGVyIGxvYWQgdGhlIHNhbWUgbWFwIGJ5IGxvYWRpbmcgdGhpcyBmaWxlIHRvIGtlcGxlci5nbC5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic2VsZWN0aW9uXCI+XG4gICAgICAgICAgICA8U3dpdGNoIHR5cGU9XCJjaGVja2JveFwiXG4gICAgICAgICAgICAgICAgICAgIGlkPVwiZXhwb3J0LW1hcC1jb25maWdcIlxuICAgICAgICAgICAgICAgICAgICBjaGVja2VkPXtkYXRhfVxuICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17b25DaGFuZ2VFeHBvcnREYXRhfS8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvU3R5bGVkRXhwb3J0Q29uZmlnU2VjdGlvbj5cbiAgICAgIDwvZGl2PlxuICAgIDwvU3R5bGVkTW9kYWxDb250ZW50PlxuICA8L2Rpdj5cbik7XG5cbkV4cG9ydENvbmZpZ01vZGFsLnByb3BUeXBlcyA9IHByb3BUeXBlcztcblxuY29uc3QgRXhwb3J0Q29uZmlnTW9kYWxGYWN0b3J5ID0gKCkgPT4gRXhwb3J0Q29uZmlnTW9kYWw7XG5leHBvcnQgZGVmYXVsdCBFeHBvcnRDb25maWdNb2RhbEZhY3Rvcnk7XG4iXX0=