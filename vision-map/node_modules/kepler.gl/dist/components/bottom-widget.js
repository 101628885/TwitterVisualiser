'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

exports.default = BottomWidgetFactory;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _timeWidget = require('./filters/time-widget');

var _timeWidget2 = _interopRequireDefault(_timeWidget);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var propsTypes = {
  filters: _propTypes2.default.array,
  datasets: _propTypes2.default.object,
  uiState: _propTypes2.default.object,
  visStateActions: _propTypes2.default.object,
  sidePanelWidth: _propTypes2.default.number,
  containerW: _propTypes2.default.number
}; // Copyright (c) 2018 Uber Technologies, Inc.
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

var MaxWidth = 1080;

BottomWidgetFactory.deps = [_timeWidget2.default];

function BottomWidgetFactory(TimeWidget) {
  var BottomWidget = function (_Component) {
    (0, _inherits3.default)(BottomWidget, _Component);

    function BottomWidget() {
      (0, _classCallCheck3.default)(this, BottomWidget);
      return (0, _possibleConstructorReturn3.default)(this, (BottomWidget.__proto__ || Object.getPrototypeOf(BottomWidget)).apply(this, arguments));
    }

    (0, _createClass3.default)(BottomWidget, [{
      key: 'render',
      value: function render() {
        var _props = this.props,
            datasets = _props.datasets,
            filters = _props.filters,
            visStateActions = _props.visStateActions,
            containerW = _props.containerW,
            uiState = _props.uiState,
            sidePanelWidth = _props.sidePanelWidth;
        var activeSidePanel = uiState.activeSidePanel;

        var isOpen = Boolean(activeSidePanel);

        var enlargedFilterIdx = filters.findIndex(function (f) {
          return f.enlarged;
        });
        var isAnyFilterAnimating = filters.some(function (f) {
          return f.isAnimating;
        });
        var enlargedFilterWidth = isOpen ? containerW - sidePanelWidth : containerW;

        if (enlargedFilterIdx < 0) {
          return null;
        }

        return _react2.default.createElement(TimeWidget, {
          fields: datasets[filters[enlargedFilterIdx].dataId].fields,
          setFilterPlot: visStateActions.setFilterPlot,
          setFilter: visStateActions.setFilter,
          toggleAnimation: visStateActions.toggleAnimation,
          updateAnimationSpeed: visStateActions.updateAnimationSpeed,
          enlargeFilter: visStateActions.enlargeFilter,
          width: Math.min(MaxWidth, enlargedFilterWidth),
          isAnyFilterAnimating: isAnyFilterAnimating,
          enlargedIdx: enlargedFilterIdx,
          filter: filters[enlargedFilterIdx]
        });
      }
    }]);
    return BottomWidget;
  }(_react.Component);

  BottomWidget.propsTypes = propsTypes;

  return BottomWidget;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL2JvdHRvbS13aWRnZXQuanMiXSwibmFtZXMiOlsiQm90dG9tV2lkZ2V0RmFjdG9yeSIsInByb3BzVHlwZXMiLCJmaWx0ZXJzIiwiUHJvcFR5cGVzIiwiYXJyYXkiLCJkYXRhc2V0cyIsIm9iamVjdCIsInVpU3RhdGUiLCJ2aXNTdGF0ZUFjdGlvbnMiLCJzaWRlUGFuZWxXaWR0aCIsIm51bWJlciIsImNvbnRhaW5lclciLCJNYXhXaWR0aCIsImRlcHMiLCJUaW1lV2lkZ2V0RmFjdG9yeSIsIlRpbWVXaWRnZXQiLCJCb3R0b21XaWRnZXQiLCJwcm9wcyIsImFjdGl2ZVNpZGVQYW5lbCIsImlzT3BlbiIsIkJvb2xlYW4iLCJlbmxhcmdlZEZpbHRlcklkeCIsImZpbmRJbmRleCIsImYiLCJlbmxhcmdlZCIsImlzQW55RmlsdGVyQW5pbWF0aW5nIiwic29tZSIsImlzQW5pbWF0aW5nIiwiZW5sYXJnZWRGaWx0ZXJXaWR0aCIsImRhdGFJZCIsImZpZWxkcyIsInNldEZpbHRlclBsb3QiLCJzZXRGaWx0ZXIiLCJ0b2dnbGVBbmltYXRpb24iLCJ1cGRhdGVBbmltYXRpb25TcGVlZCIsImVubGFyZ2VGaWx0ZXIiLCJNYXRoIiwibWluIiwiQ29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2tCQXFDd0JBLG1COztBQWpCeEI7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7QUFFQSxJQUFNQyxhQUFhO0FBQ2pCQyxXQUFTQyxvQkFBVUMsS0FERjtBQUVqQkMsWUFBVUYsb0JBQVVHLE1BRkg7QUFHakJDLFdBQVNKLG9CQUFVRyxNQUhGO0FBSWpCRSxtQkFBaUJMLG9CQUFVRyxNQUpWO0FBS2pCRyxrQkFBZ0JOLG9CQUFVTyxNQUxUO0FBTWpCQyxjQUFZUixvQkFBVU87QUFOTCxDQUFuQixDLENBeEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQWVBLElBQU1FLFdBQVcsSUFBakI7O0FBRUFaLG9CQUFvQmEsSUFBcEIsR0FBMkIsQ0FBQ0Msb0JBQUQsQ0FBM0I7O0FBRWUsU0FBU2QsbUJBQVQsQ0FBNkJlLFVBQTdCLEVBQXlDO0FBQUEsTUFFaERDLFlBRmdEO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBLCtCQUczQztBQUFBLHFCQVFILEtBQUtDLEtBUkY7QUFBQSxZQUVMWixRQUZLLFVBRUxBLFFBRks7QUFBQSxZQUdMSCxPQUhLLFVBR0xBLE9BSEs7QUFBQSxZQUlMTSxlQUpLLFVBSUxBLGVBSks7QUFBQSxZQUtMRyxVQUxLLFVBS0xBLFVBTEs7QUFBQSxZQU1MSixPQU5LLFVBTUxBLE9BTks7QUFBQSxZQU9MRSxjQVBLLFVBT0xBLGNBUEs7QUFBQSxZQVNBUyxlQVRBLEdBU21CWCxPQVRuQixDQVNBVyxlQVRBOztBQVVQLFlBQU1DLFNBQVNDLFFBQVFGLGVBQVIsQ0FBZjs7QUFFQSxZQUFNRyxvQkFBb0JuQixRQUFRb0IsU0FBUixDQUFrQjtBQUFBLGlCQUFLQyxFQUFFQyxRQUFQO0FBQUEsU0FBbEIsQ0FBMUI7QUFDQSxZQUFNQyx1QkFBdUJ2QixRQUFRd0IsSUFBUixDQUFhO0FBQUEsaUJBQUtILEVBQUVJLFdBQVA7QUFBQSxTQUFiLENBQTdCO0FBQ0EsWUFBTUMsc0JBQXNCVCxTQUFTUixhQUFhRixjQUF0QixHQUF1Q0UsVUFBbkU7O0FBRUEsWUFBSVUsb0JBQW9CLENBQXhCLEVBQTJCO0FBQ3pCLGlCQUFPLElBQVA7QUFDRDs7QUFFRCxlQUNFLDhCQUFDLFVBQUQ7QUFDRSxrQkFBUWhCLFNBQVNILFFBQVFtQixpQkFBUixFQUEyQlEsTUFBcEMsRUFBNENDLE1BRHREO0FBRUUseUJBQWV0QixnQkFBZ0J1QixhQUZqQztBQUdFLHFCQUFXdkIsZ0JBQWdCd0IsU0FIN0I7QUFJRSwyQkFBaUJ4QixnQkFBZ0J5QixlQUpuQztBQUtFLGdDQUFzQnpCLGdCQUFnQjBCLG9CQUx4QztBQU1FLHlCQUFlMUIsZ0JBQWdCMkIsYUFOakM7QUFPRSxpQkFBT0MsS0FBS0MsR0FBTCxDQUFTekIsUUFBVCxFQUFtQmdCLG1CQUFuQixDQVBUO0FBUUUsZ0NBQXNCSCxvQkFSeEI7QUFTRSx1QkFBYUosaUJBVGY7QUFVRSxrQkFBUW5CLFFBQVFtQixpQkFBUjtBQVZWLFVBREY7QUFjRDtBQXJDbUQ7QUFBQTtBQUFBLElBRTNCaUIsZ0JBRjJCOztBQXdDdER0QixlQUFhZixVQUFiLEdBQTBCQSxVQUExQjs7QUFFQSxTQUFPZSxZQUFQO0FBQ0QiLCJmaWxlIjoiYm90dG9tLXdpZGdldC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgMjAxOCBVYmVyIFRlY2hub2xvZ2llcywgSW5jLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbi8vIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbi8vIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbi8vIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbi8vIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuLy8gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuLy8gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4vLyBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbi8vIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbi8vIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4vLyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4vLyBUSEUgU09GVFdBUkUuXG5cbmltcG9ydCBSZWFjdCwge0NvbXBvbmVudH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCBUaW1lV2lkZ2V0RmFjdG9yeSBmcm9tICcuL2ZpbHRlcnMvdGltZS13aWRnZXQnO1xuXG5jb25zdCBwcm9wc1R5cGVzID0ge1xuICBmaWx0ZXJzOiBQcm9wVHlwZXMuYXJyYXksXG4gIGRhdGFzZXRzOiBQcm9wVHlwZXMub2JqZWN0LFxuICB1aVN0YXRlOiBQcm9wVHlwZXMub2JqZWN0LFxuICB2aXNTdGF0ZUFjdGlvbnM6IFByb3BUeXBlcy5vYmplY3QsXG4gIHNpZGVQYW5lbFdpZHRoOiBQcm9wVHlwZXMubnVtYmVyLFxuICBjb250YWluZXJXOiBQcm9wVHlwZXMubnVtYmVyXG59O1xuXG5jb25zdCBNYXhXaWR0aCA9IDEwODA7XG5cbkJvdHRvbVdpZGdldEZhY3RvcnkuZGVwcyA9IFtUaW1lV2lkZ2V0RmFjdG9yeV07XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIEJvdHRvbVdpZGdldEZhY3RvcnkoVGltZVdpZGdldCkge1xuXG4gIGNsYXNzIEJvdHRvbVdpZGdldCBleHRlbmRzIENvbXBvbmVudCB7XG4gICAgcmVuZGVyKCkge1xuICAgICAgY29uc3Qge1xuICAgICAgICBkYXRhc2V0cyxcbiAgICAgICAgZmlsdGVycyxcbiAgICAgICAgdmlzU3RhdGVBY3Rpb25zLFxuICAgICAgICBjb250YWluZXJXLFxuICAgICAgICB1aVN0YXRlLFxuICAgICAgICBzaWRlUGFuZWxXaWR0aFxuICAgICAgfSA9IHRoaXMucHJvcHM7XG4gICAgICBjb25zdCB7YWN0aXZlU2lkZVBhbmVsfSA9IHVpU3RhdGU7XG4gICAgICBjb25zdCBpc09wZW4gPSBCb29sZWFuKGFjdGl2ZVNpZGVQYW5lbCk7XG5cbiAgICAgIGNvbnN0IGVubGFyZ2VkRmlsdGVySWR4ID0gZmlsdGVycy5maW5kSW5kZXgoZiA9PiBmLmVubGFyZ2VkKTtcbiAgICAgIGNvbnN0IGlzQW55RmlsdGVyQW5pbWF0aW5nID0gZmlsdGVycy5zb21lKGYgPT4gZi5pc0FuaW1hdGluZyk7XG4gICAgICBjb25zdCBlbmxhcmdlZEZpbHRlcldpZHRoID0gaXNPcGVuID8gY29udGFpbmVyVyAtIHNpZGVQYW5lbFdpZHRoIDogY29udGFpbmVyVztcblxuICAgICAgaWYgKGVubGFyZ2VkRmlsdGVySWR4IDwgMCkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIChcbiAgICAgICAgPFRpbWVXaWRnZXRcbiAgICAgICAgICBmaWVsZHM9e2RhdGFzZXRzW2ZpbHRlcnNbZW5sYXJnZWRGaWx0ZXJJZHhdLmRhdGFJZF0uZmllbGRzfVxuICAgICAgICAgIHNldEZpbHRlclBsb3Q9e3Zpc1N0YXRlQWN0aW9ucy5zZXRGaWx0ZXJQbG90fVxuICAgICAgICAgIHNldEZpbHRlcj17dmlzU3RhdGVBY3Rpb25zLnNldEZpbHRlcn1cbiAgICAgICAgICB0b2dnbGVBbmltYXRpb249e3Zpc1N0YXRlQWN0aW9ucy50b2dnbGVBbmltYXRpb259XG4gICAgICAgICAgdXBkYXRlQW5pbWF0aW9uU3BlZWQ9e3Zpc1N0YXRlQWN0aW9ucy51cGRhdGVBbmltYXRpb25TcGVlZH1cbiAgICAgICAgICBlbmxhcmdlRmlsdGVyPXt2aXNTdGF0ZUFjdGlvbnMuZW5sYXJnZUZpbHRlcn1cbiAgICAgICAgICB3aWR0aD17TWF0aC5taW4oTWF4V2lkdGgsIGVubGFyZ2VkRmlsdGVyV2lkdGgpfVxuICAgICAgICAgIGlzQW55RmlsdGVyQW5pbWF0aW5nPXtpc0FueUZpbHRlckFuaW1hdGluZ31cbiAgICAgICAgICBlbmxhcmdlZElkeD17ZW5sYXJnZWRGaWx0ZXJJZHh9XG4gICAgICAgICAgZmlsdGVyPXtmaWx0ZXJzW2VubGFyZ2VkRmlsdGVySWR4XX1cbiAgICAgICAgLz5cbiAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgQm90dG9tV2lkZ2V0LnByb3BzVHlwZXMgPSBwcm9wc1R5cGVzO1xuXG4gIHJldHVybiBCb3R0b21XaWRnZXQ7XG59XG4iXX0=