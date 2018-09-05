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

var _styledComponents = require('../common/styled-components');

var _icons = require('../common/icons');

var _sourceDataCatalog = require('./source-data-catalog');

var _sourceDataCatalog2 = _interopRequireDefault(_sourceDataCatalog);

var _filterPanel = require('./filter-panel/filter-panel');

var _filterPanel2 = _interopRequireDefault(_filterPanel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FilterManager = (_temp2 = _class = function (_Component) {
  (0, _inherits3.default)(FilterManager, _Component);

  function FilterManager() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, FilterManager);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = FilterManager.__proto__ || Object.getPrototypeOf(FilterManager)).call.apply(_ref, [this].concat(args))), _this), _this.datasetsSelector = function (state) {
      return state.datasets;
    }, _this.defaultDatasetSelector = (0, _reselect.createSelector)(_this.datasetsSelector, function (datasets) {
      return Object.keys(datasets).length && Object.keys(datasets)[0] || null;
    }), _this._addFilter = function () {
      var defaultDataset = _this.defaultDatasetSelector(_this.props);
      _this.props.addFilter(defaultDataset);
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  /* selectors */


  /* actions */


  (0, _createClass3.default)(FilterManager, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          filters = _props.filters,
          datasets = _props.datasets;

      var isAnyFilterAnimating = filters.some(function (f) {
        return f.isAnimating;
      });
      var hadEmptyFilter = filters.some(function (f) {
        return !f.name;
      });
      var hadDataset = Object.keys(datasets).length;

      return _react2.default.createElement(
        'div',
        { className: 'filter-manager' },
        _react2.default.createElement(_sourceDataCatalog2.default, {
          datasets: datasets,
          showDatasetTable: this.props.showDatasetTable
        }),
        _react2.default.createElement(_styledComponents.SidePanelDivider, null),
        _react2.default.createElement(
          _styledComponents.SidePanelSection,
          null,
          filters && filters.map(function (filter, idx) {
            return _react2.default.createElement(_filterPanel2.default, {
              key: filter.id + '-' + idx,
              idx: idx,
              filters: filters,
              filter: filter,
              datasets: datasets,
              isAnyFilterAnimating: isAnyFilterAnimating,
              removeFilter: function removeFilter() {
                return _this2.props.removeFilter(idx);
              },
              enlargeFilter: function enlargeFilter() {
                return _this2.props.enlargeFilter(idx);
              },
              toggleAnimation: function toggleAnimation() {
                return _this2.props.toggleAnimation(idx);
              },
              setFilter: _this2.props.setFilter
            });
          })
        ),
        _react2.default.createElement(
          _styledComponents.Button,
          {
            inactive: hadEmptyFilter || !hadDataset,
            width: '105px',
            onClick: this._addFilter
          },
          _react2.default.createElement(_icons.Add, { height: '12px' }),
          'Add Filter'
        )
      );
    }
  }]);
  return FilterManager;
}(_react.Component), _class.propTypes = {
  datasets: _propTypes2.default.object,
  addFilter: _propTypes2.default.func.isRequired,
  removeFilter: _propTypes2.default.func.isRequired,
  enlargeFilter: _propTypes2.default.func.isRequired,
  toggleAnimation: _propTypes2.default.func.isRequired,
  setFilter: _propTypes2.default.func.isRequired,
  filters: _propTypes2.default.arrayOf(_propTypes2.default.any).isRequired,
  showDatasetTable: _propTypes2.default.func,

  // fields can be undefined when dataset is not selected
  fields: _propTypes2.default.arrayOf(_propTypes2.default.any)
}, _temp2);
exports.default = FilterManager;
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3NpZGUtcGFuZWwvZmlsdGVyLW1hbmFnZXIuanMiXSwibmFtZXMiOlsiRmlsdGVyTWFuYWdlciIsImRhdGFzZXRzU2VsZWN0b3IiLCJzdGF0ZSIsImRhdGFzZXRzIiwiZGVmYXVsdERhdGFzZXRTZWxlY3RvciIsIk9iamVjdCIsImtleXMiLCJsZW5ndGgiLCJfYWRkRmlsdGVyIiwiZGVmYXVsdERhdGFzZXQiLCJwcm9wcyIsImFkZEZpbHRlciIsImZpbHRlcnMiLCJpc0FueUZpbHRlckFuaW1hdGluZyIsInNvbWUiLCJmIiwiaXNBbmltYXRpbmciLCJoYWRFbXB0eUZpbHRlciIsIm5hbWUiLCJoYWREYXRhc2V0Iiwic2hvd0RhdGFzZXRUYWJsZSIsIm1hcCIsImZpbHRlciIsImlkeCIsImlkIiwicmVtb3ZlRmlsdGVyIiwiZW5sYXJnZUZpbHRlciIsInRvZ2dsZUFuaW1hdGlvbiIsInNldEZpbHRlciIsIkNvbXBvbmVudCIsInByb3BUeXBlcyIsIlByb3BUeXBlcyIsIm9iamVjdCIsImZ1bmMiLCJpc1JlcXVpcmVkIiwiYXJyYXlPZiIsImFueSIsImZpZWxkcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7b0JBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7QUFDQTs7OztBQUNBOztBQUNBOztBQUtBOztBQUNBOzs7O0FBQ0E7Ozs7OztJQUVxQkEsYTs7Ozs7Ozs7Ozs7Ozs7a05BZ0JuQkMsZ0IsR0FBbUI7QUFBQSxhQUFTQyxNQUFNQyxRQUFmO0FBQUEsSyxRQUNuQkMsc0IsR0FBeUIsOEJBQ3ZCLE1BQUtILGdCQURrQixFQUV2QjtBQUFBLGFBQ0dJLE9BQU9DLElBQVAsQ0FBWUgsUUFBWixFQUFzQkksTUFBdEIsSUFBZ0NGLE9BQU9DLElBQVAsQ0FBWUgsUUFBWixFQUFzQixDQUF0QixDQUFqQyxJQUE4RCxJQURoRTtBQUFBLEtBRnVCLEMsUUFPekJLLFUsR0FBYSxZQUFNO0FBQ2pCLFVBQU1DLGlCQUFpQixNQUFLTCxzQkFBTCxDQUE0QixNQUFLTSxLQUFqQyxDQUF2QjtBQUNBLFlBQUtBLEtBQUwsQ0FBV0MsU0FBWCxDQUFxQkYsY0FBckI7QUFDRCxLOzs7QUFaRDs7O0FBUUE7Ozs7OzZCQU1TO0FBQUE7O0FBQUEsbUJBQ3FCLEtBQUtDLEtBRDFCO0FBQUEsVUFDQUUsT0FEQSxVQUNBQSxPQURBO0FBQUEsVUFDU1QsUUFEVCxVQUNTQSxRQURUOztBQUVQLFVBQU1VLHVCQUF1QkQsUUFBUUUsSUFBUixDQUFhO0FBQUEsZUFBS0MsRUFBRUMsV0FBUDtBQUFBLE9BQWIsQ0FBN0I7QUFDQSxVQUFNQyxpQkFBaUJMLFFBQVFFLElBQVIsQ0FBYTtBQUFBLGVBQUssQ0FBQ0MsRUFBRUcsSUFBUjtBQUFBLE9BQWIsQ0FBdkI7QUFDQSxVQUFNQyxhQUFhZCxPQUFPQyxJQUFQLENBQVlILFFBQVosRUFBc0JJLE1BQXpDOztBQUVBLGFBQ0U7QUFBQTtBQUFBLFVBQUssV0FBVSxnQkFBZjtBQUNFLHNDQUFDLDJCQUFEO0FBQ0Usb0JBQVVKLFFBRFo7QUFFRSw0QkFBa0IsS0FBS08sS0FBTCxDQUFXVTtBQUYvQixVQURGO0FBS0Usc0NBQUMsa0NBQUQsT0FMRjtBQU1FO0FBQUMsNENBQUQ7QUFBQTtBQUNHUixxQkFDQ0EsUUFBUVMsR0FBUixDQUFZLFVBQUNDLE1BQUQsRUFBU0MsR0FBVDtBQUFBLG1CQUNWLDhCQUFDLHFCQUFEO0FBQ0UsbUJBQVFELE9BQU9FLEVBQWYsU0FBcUJELEdBRHZCO0FBRUUsbUJBQUtBLEdBRlA7QUFHRSx1QkFBU1gsT0FIWDtBQUlFLHNCQUFRVSxNQUpWO0FBS0Usd0JBQVVuQixRQUxaO0FBTUUsb0NBQXNCVSxvQkFOeEI7QUFPRSw0QkFBYztBQUFBLHVCQUFNLE9BQUtILEtBQUwsQ0FBV2UsWUFBWCxDQUF3QkYsR0FBeEIsQ0FBTjtBQUFBLGVBUGhCO0FBUUUsNkJBQWU7QUFBQSx1QkFBTSxPQUFLYixLQUFMLENBQVdnQixhQUFYLENBQXlCSCxHQUF6QixDQUFOO0FBQUEsZUFSakI7QUFTRSwrQkFBaUI7QUFBQSx1QkFBTSxPQUFLYixLQUFMLENBQVdpQixlQUFYLENBQTJCSixHQUEzQixDQUFOO0FBQUEsZUFUbkI7QUFVRSx5QkFBVyxPQUFLYixLQUFMLENBQVdrQjtBQVZ4QixjQURVO0FBQUEsV0FBWjtBQUZKLFNBTkY7QUF1QkU7QUFBQyxrQ0FBRDtBQUFBO0FBQ0Usc0JBQVVYLGtCQUFrQixDQUFDRSxVQUQvQjtBQUVFLG1CQUFNLE9BRlI7QUFHRSxxQkFBUyxLQUFLWDtBQUhoQjtBQUtFLHdDQUFDLFVBQUQsSUFBSyxRQUFPLE1BQVosR0FMRjtBQUFBO0FBQUE7QUF2QkYsT0FERjtBQWlDRDs7O0VBcEV3Q3FCLGdCLFVBQ2xDQyxTLEdBQVk7QUFDakIzQixZQUFVNEIsb0JBQVVDLE1BREg7QUFFakJyQixhQUFXb0Isb0JBQVVFLElBQVYsQ0FBZUMsVUFGVDtBQUdqQlQsZ0JBQWNNLG9CQUFVRSxJQUFWLENBQWVDLFVBSFo7QUFJakJSLGlCQUFlSyxvQkFBVUUsSUFBVixDQUFlQyxVQUpiO0FBS2pCUCxtQkFBaUJJLG9CQUFVRSxJQUFWLENBQWVDLFVBTGY7QUFNakJOLGFBQVdHLG9CQUFVRSxJQUFWLENBQWVDLFVBTlQ7QUFPakJ0QixXQUFTbUIsb0JBQVVJLE9BQVYsQ0FBa0JKLG9CQUFVSyxHQUE1QixFQUFpQ0YsVUFQekI7QUFRakJkLG9CQUFrQlcsb0JBQVVFLElBUlg7O0FBVWpCO0FBQ0FJLFVBQVFOLG9CQUFVSSxPQUFWLENBQWtCSixvQkFBVUssR0FBNUI7QUFYUyxDO2tCQURBcEMsYTtBQXFFcEIiLCJmaWxlIjoiZmlsdGVyLW1hbmFnZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIDIwMTggVWJlciBUZWNobm9sb2dpZXMsIEluYy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4vLyBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4vLyBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4vLyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4vLyBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbi8vIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbi8vIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1Jcbi8vIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuLy8gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4vLyBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4vLyBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuLy8gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuLy8gVEhFIFNPRlRXQVJFLlxuXG5pbXBvcnQgUmVhY3QsIHtDb21wb25lbnR9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQge2NyZWF0ZVNlbGVjdG9yfSBmcm9tICdyZXNlbGVjdCc7XG5pbXBvcnQge1xuICBTaWRlUGFuZWxTZWN0aW9uLFxuICBTaWRlUGFuZWxEaXZpZGVyLFxuICBCdXR0b25cbn0gZnJvbSAnY29tcG9uZW50cy9jb21tb24vc3R5bGVkLWNvbXBvbmVudHMnO1xuaW1wb3J0IHtBZGR9IGZyb20gJ2NvbXBvbmVudHMvY29tbW9uL2ljb25zJztcbmltcG9ydCBTb3VyY2VEYXRhQ2F0YWxvZyBmcm9tICcuL3NvdXJjZS1kYXRhLWNhdGFsb2cnO1xuaW1wb3J0IEZpbHRlclBhbmVsIGZyb20gJy4vZmlsdGVyLXBhbmVsL2ZpbHRlci1wYW5lbCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZpbHRlck1hbmFnZXIgZXh0ZW5kcyBDb21wb25lbnQge1xuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIGRhdGFzZXRzOiBQcm9wVHlwZXMub2JqZWN0LFxuICAgIGFkZEZpbHRlcjogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICByZW1vdmVGaWx0ZXI6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgZW5sYXJnZUZpbHRlcjogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICB0b2dnbGVBbmltYXRpb246IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgc2V0RmlsdGVyOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIGZpbHRlcnM6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5hbnkpLmlzUmVxdWlyZWQsXG4gICAgc2hvd0RhdGFzZXRUYWJsZTogUHJvcFR5cGVzLmZ1bmMsXG5cbiAgICAvLyBmaWVsZHMgY2FuIGJlIHVuZGVmaW5lZCB3aGVuIGRhdGFzZXQgaXMgbm90IHNlbGVjdGVkXG4gICAgZmllbGRzOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMuYW55KVxuICB9O1xuXG4gIC8qIHNlbGVjdG9ycyAqL1xuICBkYXRhc2V0c1NlbGVjdG9yID0gc3RhdGUgPT4gc3RhdGUuZGF0YXNldHM7XG4gIGRlZmF1bHREYXRhc2V0U2VsZWN0b3IgPSBjcmVhdGVTZWxlY3RvcihcbiAgICB0aGlzLmRhdGFzZXRzU2VsZWN0b3IsXG4gICAgZGF0YXNldHMgPT5cbiAgICAgIChPYmplY3Qua2V5cyhkYXRhc2V0cykubGVuZ3RoICYmIE9iamVjdC5rZXlzKGRhdGFzZXRzKVswXSkgfHwgbnVsbFxuICApO1xuXG4gIC8qIGFjdGlvbnMgKi9cbiAgX2FkZEZpbHRlciA9ICgpID0+IHtcbiAgICBjb25zdCBkZWZhdWx0RGF0YXNldCA9IHRoaXMuZGVmYXVsdERhdGFzZXRTZWxlY3Rvcih0aGlzLnByb3BzKTtcbiAgICB0aGlzLnByb3BzLmFkZEZpbHRlcihkZWZhdWx0RGF0YXNldCk7XG4gIH07XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHtmaWx0ZXJzLCBkYXRhc2V0c30gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IGlzQW55RmlsdGVyQW5pbWF0aW5nID0gZmlsdGVycy5zb21lKGYgPT4gZi5pc0FuaW1hdGluZyk7XG4gICAgY29uc3QgaGFkRW1wdHlGaWx0ZXIgPSBmaWx0ZXJzLnNvbWUoZiA9PiAhZi5uYW1lKTtcbiAgICBjb25zdCBoYWREYXRhc2V0ID0gT2JqZWN0LmtleXMoZGF0YXNldHMpLmxlbmd0aDtcblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImZpbHRlci1tYW5hZ2VyXCI+XG4gICAgICAgIDxTb3VyY2VEYXRhQ2F0YWxvZ1xuICAgICAgICAgIGRhdGFzZXRzPXtkYXRhc2V0c31cbiAgICAgICAgICBzaG93RGF0YXNldFRhYmxlPXt0aGlzLnByb3BzLnNob3dEYXRhc2V0VGFibGV9XG4gICAgICAgIC8+XG4gICAgICAgIDxTaWRlUGFuZWxEaXZpZGVyIC8+XG4gICAgICAgIDxTaWRlUGFuZWxTZWN0aW9uPlxuICAgICAgICAgIHtmaWx0ZXJzICYmXG4gICAgICAgICAgICBmaWx0ZXJzLm1hcCgoZmlsdGVyLCBpZHgpID0+IChcbiAgICAgICAgICAgICAgPEZpbHRlclBhbmVsXG4gICAgICAgICAgICAgICAga2V5PXtgJHtmaWx0ZXIuaWR9LSR7aWR4fWB9XG4gICAgICAgICAgICAgICAgaWR4PXtpZHh9XG4gICAgICAgICAgICAgICAgZmlsdGVycz17ZmlsdGVyc31cbiAgICAgICAgICAgICAgICBmaWx0ZXI9e2ZpbHRlcn1cbiAgICAgICAgICAgICAgICBkYXRhc2V0cz17ZGF0YXNldHN9XG4gICAgICAgICAgICAgICAgaXNBbnlGaWx0ZXJBbmltYXRpbmc9e2lzQW55RmlsdGVyQW5pbWF0aW5nfVxuICAgICAgICAgICAgICAgIHJlbW92ZUZpbHRlcj17KCkgPT4gdGhpcy5wcm9wcy5yZW1vdmVGaWx0ZXIoaWR4KX1cbiAgICAgICAgICAgICAgICBlbmxhcmdlRmlsdGVyPXsoKSA9PiB0aGlzLnByb3BzLmVubGFyZ2VGaWx0ZXIoaWR4KX1cbiAgICAgICAgICAgICAgICB0b2dnbGVBbmltYXRpb249eygpID0+IHRoaXMucHJvcHMudG9nZ2xlQW5pbWF0aW9uKGlkeCl9XG4gICAgICAgICAgICAgICAgc2V0RmlsdGVyPXt0aGlzLnByb3BzLnNldEZpbHRlcn1cbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICkpfVxuICAgICAgICA8L1NpZGVQYW5lbFNlY3Rpb24+XG4gICAgICAgIDxCdXR0b25cbiAgICAgICAgICBpbmFjdGl2ZT17aGFkRW1wdHlGaWx0ZXIgfHwgIWhhZERhdGFzZXR9XG4gICAgICAgICAgd2lkdGg9XCIxMDVweFwiXG4gICAgICAgICAgb25DbGljaz17dGhpcy5fYWRkRmlsdGVyfVxuICAgICAgICA+XG4gICAgICAgICAgPEFkZCBoZWlnaHQ9XCIxMnB4XCIgLz5BZGQgRmlsdGVyXG4gICAgICAgIDwvQnV0dG9uPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufTtcbiJdfQ==