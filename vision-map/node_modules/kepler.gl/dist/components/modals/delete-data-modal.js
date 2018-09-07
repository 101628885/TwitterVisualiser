'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DeleteDatasetModal = undefined;

var _taggedTemplateLiteral2 = require('babel-runtime/helpers/taggedTemplateLiteral');

var _taggedTemplateLiteral3 = _interopRequireDefault(_taggedTemplateLiteral2);

var _templateObject = (0, _taggedTemplateLiteral3.default)(['\n  margin-top: 24px;\n'], ['\n  margin-top: 24px;\n']); // Copyright (c) 2018 Uber Technologies, Inc.
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

var _datasetLabel = require('../common/dataset-label');

var _datasetLabel2 = _interopRequireDefault(_datasetLabel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var StyledMsg = _styledComponents2.default.div(_templateObject);

var DeleteDatasetModal = exports.DeleteDatasetModal = function DeleteDatasetModal(_ref) {
  var _ref$dataset = _ref.dataset,
      dataset = _ref$dataset === undefined ? {} : _ref$dataset,
      _ref$layers = _ref.layers,
      layers = _ref$layers === undefined ? [] : _ref$layers;

  // retrieve only layers related to the current dataset
  var currDatasetLayers = layers.filter(function (layer) {
    return layer.config.dataId === dataset.id;
  });

  return _react2.default.createElement(
    'div',
    { className: 'delete-dataset-modal' },
    _react2.default.createElement(_datasetLabel2.default, { dataset: dataset }),
    _react2.default.createElement(
      StyledMsg,
      { className: 'delete-dataset-msg' },
      'you are going to delete this dataset. It will affect ' + currDatasetLayers.length + ' layers'
    )
  );
};

var DeleteDatasetModalFactory = function DeleteDatasetModalFactory() {
  return DeleteDatasetModal;
};
exports.default = DeleteDatasetModalFactory;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL21vZGFscy9kZWxldGUtZGF0YS1tb2RhbC5qcyJdLCJuYW1lcyI6WyJTdHlsZWRNc2ciLCJzdHlsZWQiLCJkaXYiLCJEZWxldGVEYXRhc2V0TW9kYWwiLCJkYXRhc2V0IiwibGF5ZXJzIiwiY3VyckRhdGFzZXRMYXllcnMiLCJmaWx0ZXIiLCJsYXllciIsImNvbmZpZyIsImRhdGFJZCIsImlkIiwibGVuZ3RoIiwiRGVsZXRlRGF0YXNldE1vZGFsRmFjdG9yeSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7c0hBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7QUFFQSxJQUFNQSxZQUFZQywyQkFBT0MsR0FBbkIsaUJBQU47O0FBSU8sSUFBTUMsa0RBQXFCLFNBQXJCQSxrQkFBcUIsT0FBaUM7QUFBQSwwQkFBL0JDLE9BQStCO0FBQUEsTUFBL0JBLE9BQStCLGdDQUFyQixFQUFxQjtBQUFBLHlCQUFqQkMsTUFBaUI7QUFBQSxNQUFqQkEsTUFBaUIsK0JBQVIsRUFBUTs7QUFDakU7QUFDQSxNQUFNQyxvQkFBb0JELE9BQU9FLE1BQVAsQ0FDeEI7QUFBQSxXQUFTQyxNQUFNQyxNQUFOLENBQWFDLE1BQWIsS0FBd0JOLFFBQVFPLEVBQXpDO0FBQUEsR0FEd0IsQ0FBMUI7O0FBSUEsU0FDRTtBQUFBO0FBQUEsTUFBSyxXQUFVLHNCQUFmO0FBQ0Usa0NBQUMsc0JBQUQsSUFBYyxTQUFTUCxPQUF2QixHQURGO0FBRUU7QUFBQyxlQUFEO0FBQUEsUUFBVyxXQUFVLG9CQUFyQjtBQUFBLGdFQUNFRSxrQkFBa0JNLE1BRHBCO0FBQUE7QUFGRixHQURGO0FBUUQsQ0FkTTs7QUFnQlAsSUFBTUMsNEJBQTRCLFNBQTVCQSx5QkFBNEI7QUFBQSxTQUFNVixrQkFBTjtBQUFBLENBQWxDO2tCQUNlVSx5QiIsImZpbGUiOiJkZWxldGUtZGF0YS1tb2RhbC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgMjAxOCBVYmVyIFRlY2hub2xvZ2llcywgSW5jLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbi8vIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbi8vIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbi8vIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbi8vIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuLy8gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuLy8gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4vLyBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbi8vIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbi8vIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4vLyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4vLyBUSEUgU09GVFdBUkUuXG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgc3R5bGVkIGZyb20gJ3N0eWxlZC1jb21wb25lbnRzJztcbmltcG9ydCBEYXRhc2V0TGFiZWwgZnJvbSAnY29tcG9uZW50cy9jb21tb24vZGF0YXNldC1sYWJlbCc7XG5cbmNvbnN0IFN0eWxlZE1zZyA9IHN0eWxlZC5kaXZgXG4gIG1hcmdpbi10b3A6IDI0cHg7XG5gO1xuXG5leHBvcnQgY29uc3QgRGVsZXRlRGF0YXNldE1vZGFsID0gKHtkYXRhc2V0ID0ge30sIGxheWVycyA9IFtdfSkgPT4ge1xuICAvLyByZXRyaWV2ZSBvbmx5IGxheWVycyByZWxhdGVkIHRvIHRoZSBjdXJyZW50IGRhdGFzZXRcbiAgY29uc3QgY3VyckRhdGFzZXRMYXllcnMgPSBsYXllcnMuZmlsdGVyKFxuICAgIGxheWVyID0+IGxheWVyLmNvbmZpZy5kYXRhSWQgPT09IGRhdGFzZXQuaWRcbiAgKTtcblxuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwiZGVsZXRlLWRhdGFzZXQtbW9kYWxcIj5cbiAgICAgIDxEYXRhc2V0TGFiZWwgZGF0YXNldD17ZGF0YXNldH0gLz5cbiAgICAgIDxTdHlsZWRNc2cgY2xhc3NOYW1lPVwiZGVsZXRlLWRhdGFzZXQtbXNnXCI+e2B5b3UgYXJlIGdvaW5nIHRvIGRlbGV0ZSB0aGlzIGRhdGFzZXQuIEl0IHdpbGwgYWZmZWN0ICR7XG4gICAgICAgIGN1cnJEYXRhc2V0TGF5ZXJzLmxlbmd0aFxuICAgICAgfSBsYXllcnNgfTwvU3R5bGVkTXNnPlxuICAgIDwvZGl2PlxuICApO1xufTtcblxuY29uc3QgRGVsZXRlRGF0YXNldE1vZGFsRmFjdG9yeSA9ICgpID0+IERlbGV0ZURhdGFzZXRNb2RhbDtcbmV4cG9ydCBkZWZhdWx0IERlbGV0ZURhdGFzZXRNb2RhbEZhY3Rvcnk7XG4iXX0=