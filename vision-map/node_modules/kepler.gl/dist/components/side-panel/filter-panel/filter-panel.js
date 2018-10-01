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

var _class, _temp2;

var _templateObject = (0, _taggedTemplateLiteral3.default)(['\n  margin-bottom: 12px;\n  border-radius: 1px;\n\n  .filter-panel__filter {\n    margin-top: 24px;\n  }\n'], ['\n  margin-bottom: 12px;\n  border-radius: 1px;\n\n  .filter-panel__filter {\n    margin-top: 24px;\n  }\n']),
    _templateObject2 = (0, _taggedTemplateLiteral3.default)(['\n  cursor: pointer;\n  padding: 10px 12px;\n'], ['\n  cursor: pointer;\n  padding: 10px 12px;\n']),
    _templateObject3 = (0, _taggedTemplateLiteral3.default)(['\n  background-color: ', ';\n  padding: 12px;\n'], ['\n  background-color: ', ';\n  padding: 12px;\n']); // Copyright (c) 2018 Uber Technologies, Inc.
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

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _panelHeaderAction = require('../panel-header-action');

var _panelHeaderAction2 = _interopRequireDefault(_panelHeaderAction);

var _fieldSelector = require('../../common/field-selector');

var _fieldSelector2 = _interopRequireDefault(_fieldSelector);

var _icons = require('../../common/icons');

var _sourceDataSelector = require('../source-data-selector');

var _sourceDataSelector2 = _interopRequireDefault(_sourceDataSelector);

var _styledComponents3 = require('../../common/styled-components');

var _filters = require('../../filters');

var Filters = _interopRequireWildcard(_filters);

var _filterUtils = require('../../../utils/filter-utils');

var _defaultSettings = require('../../../constants/default-settings');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var StyledFilterPanel = _styledComponents2.default.div(_templateObject);

var StyledFilterHeader = _styledComponents3.StyledPanelHeader.extend(_templateObject2);

var StyledFilterContent = _styledComponents2.default.div(_templateObject3, function (props) {
  return props.theme.panelBackground;
});

var FilterPanel = (_temp2 = _class = function (_Component) {
  (0, _inherits3.default)(FilterPanel, _Component);

  function FilterPanel() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, FilterPanel);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = FilterPanel.__proto__ || Object.getPrototypeOf(FilterPanel)).call.apply(_ref, [this].concat(args))), _this), _this.fieldsSelector = function (props) {
      return props.filter.dataId && props.datasets[props.filter.dataId].fields || [];
    }, _this.filterSelector = function (props) {
      return props.filters;
    }, _this.nameSelector = function (props) {
      return props.filter.name;
    }, _this.dataIdSelector = function (props) {
      return props.filter.dataId;
    }, _this.availableFieldsSelector = (0, _reselect.createSelector)(_this.fieldsSelector, _this.filterSelector, _this.nameSelector, _this.dataIdSelector, function (fields, filters, name, dataId) {
      return fields.filter(function (f) {
        return f.type && f.type !== _defaultSettings.ALL_FIELD_TYPES.geojson && (f.name === name || !filters.find(function (d) {
          return d.name === f.name && d.dataId === dataId;
        }));
      });
    }), _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  /* selectors */


  // only show current field and field that's not already been used as a filter


  (0, _createClass3.default)(FilterPanel, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          datasets = _props.datasets,
          enlargeFilter = _props.enlargeFilter,
          filter = _props.filter,
          idx = _props.idx,
          isAnyFilterAnimating = _props.isAnyFilterAnimating,
          removeFilter = _props.removeFilter,
          _setFilter = _props.setFilter,
          toggleAnimation = _props.toggleAnimation;
      var name = filter.name,
          enlarged = filter.enlarged,
          type = filter.type,
          dataId = filter.dataId;

      var FilterComponent = type && Filters[_filterUtils.FILTER_COMPONENTS[type]];
      var allAvailableFields = this.availableFieldsSelector(this.props);

      return _react2.default.createElement(
        StyledFilterPanel,
        { className: 'filter-panel' },
        _react2.default.createElement(
          StyledFilterHeader,
          { className: 'filter-panel__header',
            labelRCGColorValues: datasets[dataId].color },
          _react2.default.createElement(
            'div',
            { style: { flexGrow: 1 } },
            _react2.default.createElement(_fieldSelector2.default, {
              inputTheme: 'secondary',
              fields: allAvailableFields,
              value: name,
              erasable: false,
              onSelect: function onSelect(value) {
                return _setFilter(idx, 'name', value.name);
              }
            })
          ),
          _react2.default.createElement(_panelHeaderAction2.default, {
            id: filter.id,
            tooltip: 'delete',
            tooltipType: 'error',
            onClick: removeFilter,
            hoverColor: 'errorColor',
            IconComponent: _icons.Trash
          }),
          type === _filterUtils.FILTER_TYPES.timeRange && _react2.default.createElement(_panelHeaderAction2.default, {
            id: filter.id,
            onClick: enlargeFilter,
            tooltip: 'Time Playback',
            IconComponent: _icons.Clock,
            active: enlarged
          })
        ),
        _react2.default.createElement(
          StyledFilterContent,
          { className: 'filter-panel__content' },
          Object.keys(datasets).length > 1 && _react2.default.createElement(_sourceDataSelector2.default, {
            inputTheme: 'secondary',
            datasets: datasets,
            disabled: filter.freeze,
            dataId: filter.dataId,
            onSelect: function onSelect(value) {
              return _setFilter(idx, 'dataId', value);
            }
          }),
          type && !enlarged && _react2.default.createElement(
            'div',
            { className: 'filter-panel__filter' },
            _react2.default.createElement(FilterComponent, {
              filter: filter,
              idx: idx,
              isAnyFilterAnimating: isAnyFilterAnimating,
              toggleAnimation: toggleAnimation,
              setFilter: function setFilter(value) {
                return _setFilter(idx, 'value', value);
              }
            })
          )
        )
      );
    }
  }]);
  return FilterPanel;
}(_react.Component), _class.propTypes = {
  idx: _propTypes2.default.number,
  filters: _propTypes2.default.arrayOf(_propTypes2.default.any).isRequired,
  filter: _propTypes2.default.object.isRequired,
  setFilter: _propTypes2.default.func.isRequired,
  removeFilter: _propTypes2.default.func.isRequired,
  enlargeFilter: _propTypes2.default.func.isRequired,
  toggleAnimation: _propTypes2.default.func.isRequired,
  datasets: _propTypes2.default.object,
  showDatasetTable: _propTypes2.default.func,
  isAnyFilterAnimating: _propTypes2.default.bool
}, _temp2);
exports.default = FilterPanel;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3NpZGUtcGFuZWwvZmlsdGVyLXBhbmVsL2ZpbHRlci1wYW5lbC5qcyJdLCJuYW1lcyI6WyJGaWx0ZXJzIiwiU3R5bGVkRmlsdGVyUGFuZWwiLCJzdHlsZWQiLCJkaXYiLCJTdHlsZWRGaWx0ZXJIZWFkZXIiLCJTdHlsZWRQYW5lbEhlYWRlciIsImV4dGVuZCIsIlN0eWxlZEZpbHRlckNvbnRlbnQiLCJwcm9wcyIsInRoZW1lIiwicGFuZWxCYWNrZ3JvdW5kIiwiRmlsdGVyUGFuZWwiLCJmaWVsZHNTZWxlY3RvciIsImZpbHRlciIsImRhdGFJZCIsImRhdGFzZXRzIiwiZmllbGRzIiwiZmlsdGVyU2VsZWN0b3IiLCJmaWx0ZXJzIiwibmFtZVNlbGVjdG9yIiwibmFtZSIsImRhdGFJZFNlbGVjdG9yIiwiYXZhaWxhYmxlRmllbGRzU2VsZWN0b3IiLCJmIiwidHlwZSIsIkFMTF9GSUVMRF9UWVBFUyIsImdlb2pzb24iLCJmaW5kIiwiZCIsImVubGFyZ2VGaWx0ZXIiLCJpZHgiLCJpc0FueUZpbHRlckFuaW1hdGluZyIsInJlbW92ZUZpbHRlciIsInNldEZpbHRlciIsInRvZ2dsZUFuaW1hdGlvbiIsImVubGFyZ2VkIiwiRmlsdGVyQ29tcG9uZW50IiwiRklMVEVSX0NPTVBPTkVOVFMiLCJhbGxBdmFpbGFibGVGaWVsZHMiLCJjb2xvciIsImZsZXhHcm93IiwidmFsdWUiLCJpZCIsIlRyYXNoIiwiRklMVEVSX1RZUEVTIiwidGltZVJhbmdlIiwiQ2xvY2siLCJPYmplY3QiLCJrZXlzIiwibGVuZ3RoIiwiZnJlZXplIiwiQ29tcG9uZW50IiwicHJvcFR5cGVzIiwiUHJvcFR5cGVzIiwibnVtYmVyIiwiYXJyYXlPZiIsImFueSIsImlzUmVxdWlyZWQiLCJvYmplY3QiLCJmdW5jIiwic2hvd0RhdGFzZXRUYWJsZSIsImJvb2wiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7dUtBQUE7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ZixFQUF3QlcsS0FBeEIsQ0FBVDtBQUFBO0FBTGI7QUFERjtBQVpKO0FBOUJGLE9BREY7QUF3REQ7OztFQTVHc0NVLGdCLFVBQ2hDQyxTLEdBQVk7QUFDakJ0QixPQUFLdUIsb0JBQVVDLE1BREU7QUFFakJwQyxXQUFTbUMsb0JBQVVFLE9BQVYsQ0FBa0JGLG9CQUFVRyxHQUE1QixFQUFpQ0MsVUFGekI7QUFHakI1QyxVQUFRd0Msb0JBQVVLLE1BQVYsQ0FBaUJELFVBSFI7QUFJakJ4QixhQUFXb0Isb0JBQVVNLElBQVYsQ0FBZUYsVUFKVDtBQUtqQnpCLGdCQUFjcUIsb0JBQVVNLElBQVYsQ0FBZUYsVUFMWjtBQU1qQjVCLGlCQUFld0Isb0JBQVVNLElBQVYsQ0FBZUYsVUFOYjtBQU9qQnZCLG1CQUFpQm1CLG9CQUFVTSxJQUFWLENBQWVGLFVBUGY7QUFRakIxQyxZQUFVc0Msb0JBQVVLLE1BUkg7QUFTakJFLG9CQUFrQlAsb0JBQVVNLElBVFg7QUFVakI1Qix3QkFBc0JzQixvQkFBVVE7QUFWZixDO2tCQURBbEQsVyIsImZpbGUiOiJmaWx0ZXItcGFuZWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIDIwMTggVWJlciBUZWNobm9sb2dpZXMsIEluYy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4vLyBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4vLyBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4vLyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4vLyBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbi8vIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbi8vIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1Jcbi8vIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuLy8gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4vLyBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4vLyBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuLy8gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuLy8gVEhFIFNPRlRXQVJFLlxuXG5pbXBvcnQgUmVhY3QsIHtDb21wb25lbnR9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQge2NyZWF0ZVNlbGVjdG9yfSBmcm9tICdyZXNlbGVjdCc7XG5pbXBvcnQgc3R5bGVkIGZyb20gJ3N0eWxlZC1jb21wb25lbnRzJztcbmltcG9ydCBQYW5lbEhlYWRlckFjdGlvbiBmcm9tICdjb21wb25lbnRzL3NpZGUtcGFuZWwvcGFuZWwtaGVhZGVyLWFjdGlvbic7XG5pbXBvcnQgRmllbGRTZWxlY3RvciBmcm9tICdjb21wb25lbnRzL2NvbW1vbi9maWVsZC1zZWxlY3Rvcic7XG5pbXBvcnQge1RyYXNoLCBDbG9ja30gZnJvbSAnY29tcG9uZW50cy9jb21tb24vaWNvbnMnO1xuaW1wb3J0IFNvdXJjZURhdGFTZWxlY3RvciBmcm9tICdjb21wb25lbnRzL3NpZGUtcGFuZWwvc291cmNlLWRhdGEtc2VsZWN0b3InO1xuaW1wb3J0IHtTdHlsZWRQYW5lbEhlYWRlcn0gZnJvbSAnY29tcG9uZW50cy9jb21tb24vc3R5bGVkLWNvbXBvbmVudHMnO1xuaW1wb3J0ICogYXMgRmlsdGVycyBmcm9tICdjb21wb25lbnRzL2ZpbHRlcnMnO1xuXG5pbXBvcnQge0ZJTFRFUl9UWVBFUywgRklMVEVSX0NPTVBPTkVOVFN9IGZyb20gJ3V0aWxzL2ZpbHRlci11dGlscyc7XG5pbXBvcnQge0FMTF9GSUVMRF9UWVBFU30gZnJvbSAnY29uc3RhbnRzL2RlZmF1bHQtc2V0dGluZ3MnO1xuXG5jb25zdCBTdHlsZWRGaWx0ZXJQYW5lbCA9IHN0eWxlZC5kaXZgXG4gIG1hcmdpbi1ib3R0b206IDEycHg7XG4gIGJvcmRlci1yYWRpdXM6IDFweDtcblxuICAuZmlsdGVyLXBhbmVsX19maWx0ZXIge1xuICAgIG1hcmdpbi10b3A6IDI0cHg7XG4gIH1cbmA7XG5cbmNvbnN0IFN0eWxlZEZpbHRlckhlYWRlciA9IFN0eWxlZFBhbmVsSGVhZGVyLmV4dGVuZGBcbiAgY3Vyc29yOiBwb2ludGVyO1xuICBwYWRkaW5nOiAxMHB4IDEycHg7XG5gO1xuXG5jb25zdCBTdHlsZWRGaWx0ZXJDb250ZW50ID0gc3R5bGVkLmRpdmBcbiAgYmFja2dyb3VuZC1jb2xvcjogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5wYW5lbEJhY2tncm91bmR9O1xuICBwYWRkaW5nOiAxMnB4O1xuYDtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRmlsdGVyUGFuZWwgZXh0ZW5kcyBDb21wb25lbnQge1xuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIGlkeDogUHJvcFR5cGVzLm51bWJlcixcbiAgICBmaWx0ZXJzOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMuYW55KS5pc1JlcXVpcmVkLFxuICAgIGZpbHRlcjogUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkLFxuICAgIHNldEZpbHRlcjogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICByZW1vdmVGaWx0ZXI6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgZW5sYXJnZUZpbHRlcjogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICB0b2dnbGVBbmltYXRpb246IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgZGF0YXNldHM6IFByb3BUeXBlcy5vYmplY3QsXG4gICAgc2hvd0RhdGFzZXRUYWJsZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgaXNBbnlGaWx0ZXJBbmltYXRpbmc6IFByb3BUeXBlcy5ib29sXG4gIH07XG5cbiAgLyogc2VsZWN0b3JzICovXG4gIGZpZWxkc1NlbGVjdG9yID0gcHJvcHMgPT5cbiAgICAocHJvcHMuZmlsdGVyLmRhdGFJZCAmJiBwcm9wcy5kYXRhc2V0c1twcm9wcy5maWx0ZXIuZGF0YUlkXS5maWVsZHMpIHx8IFtdO1xuICBmaWx0ZXJTZWxlY3RvciA9IHByb3BzID0+IHByb3BzLmZpbHRlcnM7XG4gIG5hbWVTZWxlY3RvciA9IHByb3BzID0+IHByb3BzLmZpbHRlci5uYW1lO1xuICBkYXRhSWRTZWxlY3RvciA9IHByb3BzID0+IHByb3BzLmZpbHRlci5kYXRhSWQ7XG5cbiAgLy8gb25seSBzaG93IGN1cnJlbnQgZmllbGQgYW5kIGZpZWxkIHRoYXQncyBub3QgYWxyZWFkeSBiZWVuIHVzZWQgYXMgYSBmaWx0ZXJcbiAgYXZhaWxhYmxlRmllbGRzU2VsZWN0b3IgPSBjcmVhdGVTZWxlY3RvcihcbiAgICB0aGlzLmZpZWxkc1NlbGVjdG9yLFxuICAgIHRoaXMuZmlsdGVyU2VsZWN0b3IsXG4gICAgdGhpcy5uYW1lU2VsZWN0b3IsXG4gICAgdGhpcy5kYXRhSWRTZWxlY3RvcixcbiAgICAoZmllbGRzLCBmaWx0ZXJzLCBuYW1lLCBkYXRhSWQpID0+XG4gICAgICBmaWVsZHMuZmlsdGVyKFxuICAgICAgICBmID0+XG4gICAgICAgICAgZi50eXBlICYmXG4gICAgICAgICAgZi50eXBlICE9PSBBTExfRklFTERfVFlQRVMuZ2VvanNvbiAmJlxuICAgICAgICAgIChmLm5hbWUgPT09IG5hbWUgfHxcbiAgICAgICAgICAgICFmaWx0ZXJzLmZpbmQoZCA9PiBkLm5hbWUgPT09IGYubmFtZSAmJiBkLmRhdGFJZCA9PT0gZGF0YUlkKSlcbiAgICAgIClcbiAgKTtcblxuICByZW5kZXIoKSB7XG4gICAgY29uc3Qge1xuICAgICAgZGF0YXNldHMsXG4gICAgICBlbmxhcmdlRmlsdGVyLFxuICAgICAgZmlsdGVyLFxuICAgICAgaWR4LFxuICAgICAgaXNBbnlGaWx0ZXJBbmltYXRpbmcsXG4gICAgICByZW1vdmVGaWx0ZXIsXG4gICAgICBzZXRGaWx0ZXIsXG4gICAgICB0b2dnbGVBbmltYXRpb25cbiAgICB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCB7bmFtZSwgZW5sYXJnZWQsIHR5cGUsIGRhdGFJZH0gPSBmaWx0ZXI7XG4gICAgY29uc3QgRmlsdGVyQ29tcG9uZW50ID0gdHlwZSAmJiBGaWx0ZXJzW0ZJTFRFUl9DT01QT05FTlRTW3R5cGVdXTtcbiAgICBjb25zdCBhbGxBdmFpbGFibGVGaWVsZHMgPSB0aGlzLmF2YWlsYWJsZUZpZWxkc1NlbGVjdG9yKHRoaXMucHJvcHMpO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxTdHlsZWRGaWx0ZXJQYW5lbCBjbGFzc05hbWU9XCJmaWx0ZXItcGFuZWxcIj5cbiAgICAgICAgPFN0eWxlZEZpbHRlckhlYWRlciBjbGFzc05hbWU9XCJmaWx0ZXItcGFuZWxfX2hlYWRlclwiXG4gICAgICAgICAgbGFiZWxSQ0dDb2xvclZhbHVlcz17ZGF0YXNldHNbZGF0YUlkXS5jb2xvcn0+XG4gICAgICAgICAgPGRpdiBzdHlsZT17e2ZsZXhHcm93OiAxfX0+XG4gICAgICAgICAgICA8RmllbGRTZWxlY3RvclxuICAgICAgICAgICAgICBpbnB1dFRoZW1lPVwic2Vjb25kYXJ5XCJcbiAgICAgICAgICAgICAgZmllbGRzPXthbGxBdmFpbGFibGVGaWVsZHN9XG4gICAgICAgICAgICAgIHZhbHVlPXtuYW1lfVxuICAgICAgICAgICAgICBlcmFzYWJsZT17ZmFsc2V9XG4gICAgICAgICAgICAgIG9uU2VsZWN0PXt2YWx1ZSA9PiBzZXRGaWx0ZXIoaWR4LCAnbmFtZScsIHZhbHVlLm5hbWUpfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8UGFuZWxIZWFkZXJBY3Rpb25cbiAgICAgICAgICAgIGlkPXtmaWx0ZXIuaWR9XG4gICAgICAgICAgICB0b29sdGlwPVwiZGVsZXRlXCJcbiAgICAgICAgICAgIHRvb2x0aXBUeXBlPVwiZXJyb3JcIlxuICAgICAgICAgICAgb25DbGljaz17cmVtb3ZlRmlsdGVyfVxuICAgICAgICAgICAgaG92ZXJDb2xvcj17J2Vycm9yQ29sb3InfVxuICAgICAgICAgICAgSWNvbkNvbXBvbmVudD17VHJhc2h9XG4gICAgICAgICAgLz5cbiAgICAgICAgICB7dHlwZSA9PT0gRklMVEVSX1RZUEVTLnRpbWVSYW5nZSAmJiAoXG4gICAgICAgICAgICA8UGFuZWxIZWFkZXJBY3Rpb25cbiAgICAgICAgICAgICAgaWQ9e2ZpbHRlci5pZH1cbiAgICAgICAgICAgICAgb25DbGljaz17ZW5sYXJnZUZpbHRlcn1cbiAgICAgICAgICAgICAgdG9vbHRpcD1cIlRpbWUgUGxheWJhY2tcIlxuICAgICAgICAgICAgICBJY29uQ29tcG9uZW50PXtDbG9ja31cbiAgICAgICAgICAgICAgYWN0aXZlPXtlbmxhcmdlZH1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgKX1cbiAgICAgICAgPC9TdHlsZWRGaWx0ZXJIZWFkZXI+XG4gICAgICAgIDxTdHlsZWRGaWx0ZXJDb250ZW50IGNsYXNzTmFtZT1cImZpbHRlci1wYW5lbF9fY29udGVudFwiPlxuICAgICAgICAgIHtPYmplY3Qua2V5cyhkYXRhc2V0cykubGVuZ3RoID4gMSAmJiAoXG4gICAgICAgICAgICA8U291cmNlRGF0YVNlbGVjdG9yXG4gICAgICAgICAgICAgIGlucHV0VGhlbWU9XCJzZWNvbmRhcnlcIlxuICAgICAgICAgICAgICBkYXRhc2V0cz17ZGF0YXNldHN9XG4gICAgICAgICAgICAgIGRpc2FibGVkPXtmaWx0ZXIuZnJlZXplfVxuICAgICAgICAgICAgICBkYXRhSWQ9e2ZpbHRlci5kYXRhSWR9XG4gICAgICAgICAgICAgIG9uU2VsZWN0PXt2YWx1ZSA9PiBzZXRGaWx0ZXIoaWR4LCAnZGF0YUlkJywgdmFsdWUpfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICApfVxuICAgICAgICAgIHt0eXBlICYmXG4gICAgICAgICAgIWVubGFyZ2VkICYmIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmlsdGVyLXBhbmVsX19maWx0ZXJcIj5cbiAgICAgICAgICAgICAgPEZpbHRlckNvbXBvbmVudFxuICAgICAgICAgICAgICAgIGZpbHRlcj17ZmlsdGVyfVxuICAgICAgICAgICAgICAgIGlkeD17aWR4fVxuICAgICAgICAgICAgICAgIGlzQW55RmlsdGVyQW5pbWF0aW5nPXtpc0FueUZpbHRlckFuaW1hdGluZ31cbiAgICAgICAgICAgICAgICB0b2dnbGVBbmltYXRpb249e3RvZ2dsZUFuaW1hdGlvbn1cbiAgICAgICAgICAgICAgICBzZXRGaWx0ZXI9e3ZhbHVlID0+IHNldEZpbHRlcihpZHgsICd2YWx1ZScsIHZhbHVlKX1cbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICl9XG4gICAgICAgIDwvU3R5bGVkRmlsdGVyQ29udGVudD5cbiAgICAgIDwvU3R5bGVkRmlsdGVyUGFuZWw+XG4gICAgKTtcbiAgfVxufVxuIl19