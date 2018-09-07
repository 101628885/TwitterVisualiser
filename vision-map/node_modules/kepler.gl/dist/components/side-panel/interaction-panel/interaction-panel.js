'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends3 = require('babel-runtime/helpers/extends');

var _extends4 = _interopRequireDefault(_extends3);

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

var _templateObject = (0, _taggedTemplateLiteral3.default)(['\n  border-top: 1px solid ', ';\n'], ['\n  border-top: 1px solid ', ';\n']),
    _templateObject2 = (0, _taggedTemplateLiteral3.default)(['\n  padding-bottom: 6px;\n'], ['\n  padding-bottom: 6px;\n']); // Copyright (c) 2018 Uber Technologies, Inc.
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

var _switch = require('../../common/switch');

var _switch2 = _interopRequireDefault(_switch);

var _rangeSlider = require('../../common/range-slider');

var _rangeSlider2 = _interopRequireDefault(_rangeSlider);

var _fieldSelector = require('../../common/field-selector');

var _fieldSelector2 = _interopRequireDefault(_fieldSelector);

var _styledComponents3 = require('../../common/styled-components');

var _sourceDataCatalog = require('../source-data-catalog');

var _interactionUtils = require('../../../utils/interaction-utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var StyledPanelContent = _styledComponents3.PanelContent.extend(_templateObject, function (props) {
  return props.theme.panelBorderColor;
});

var StyledInteractionPanel = _styledComponents2.default.div(_templateObject2);

var InteractionPanel = (_temp2 = _class = function (_Component) {
  (0, _inherits3.default)(InteractionPanel, _Component);

  function InteractionPanel() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, InteractionPanel);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = InteractionPanel.__proto__ || Object.getPrototypeOf(InteractionPanel)).call.apply(_ref, [this].concat(args))), _this), _this.state = { isConfigActive: false }, _this._updateConfig = function (newProp) {
      _this.props.onConfigChange((0, _extends4.default)({}, _this.props.config, newProp));
    }, _this._enableConfig = function () {
      _this.setState({ isConfigActive: !_this.state.isConfigActive });
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(InteractionPanel, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          config = _props.config,
          datasets = _props.datasets;

      var onChange = function onChange(newConfig) {
        return _this2._updateConfig({ config: newConfig });
      };
      var template = null;

      switch (config.id) {
        case 'tooltip':
          template = _react2.default.createElement(TooltipConfig, {
            datasets: datasets,
            config: config.config,
            width: this.state.innerPanelWidth,
            onChange: onChange
          });
          break;

        case 'brush':
          template = _react2.default.createElement(BrushConfig, { config: config.config, onChange: onChange });
          break;

        default:
          break;
      }

      return _react2.default.createElement(
        StyledInteractionPanel,
        { className: 'interaction-panel' },
        _react2.default.createElement(
          _styledComponents3.StyledPanelHeader,
          {
            className: 'interaction-panel__header',
            onClick: this._enableConfig
          },
          _react2.default.createElement(
            _styledComponents3.PanelHeaderContent,
            { className: 'interaction-panel__header__content' },
            _react2.default.createElement(
              'div',
              { className: 'interaction-panel__header__icon icon' },
              _react2.default.createElement(config.iconComponent, { height: '12px' })
            ),
            _react2.default.createElement(
              'div',
              { className: 'interaction-panel__header__title' },
              _react2.default.createElement(
                _styledComponents3.PanelHeaderTitle,
                null,
                config.id
              )
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'interaction-panel__header__actions' },
            _react2.default.createElement(_switch2.default, {
              checked: config.enabled,
              id: config.id + '-toggle',
              onChange: function onChange() {
                return _this2._updateConfig({ enabled: !config.enabled });
              },
              secondary: true
            })
          )
        ),
        config.enabled && _react2.default.createElement(
          StyledPanelContent,
          { className: 'interaction-panel__content' },
          template
        )
      );
    }
  }]);
  return InteractionPanel;
}(_react.Component), _class.propTypes = {
  datasets: _propTypes2.default.object.isRequired,
  config: _propTypes2.default.object.isRequired,
  onConfigChange: _propTypes2.default.func.isRequired
}, _temp2);
exports.default = InteractionPanel;


var TooltipConfig = function TooltipConfig(_ref2) {
  var config = _ref2.config,
      datasets = _ref2.datasets,
      width = _ref2.width,
      onChange = _ref2.onChange;
  return _react2.default.createElement(
    'div',
    null,
    Object.keys(config.fieldsToShow).map(function (dataId) {
      return _react2.default.createElement(
        _styledComponents3.SidePanelSection,
        { key: dataId },
        _react2.default.createElement(_sourceDataCatalog.DatasetTag, { dataset: datasets[dataId] }),
        _react2.default.createElement(_fieldSelector2.default, {
          fields: datasets[dataId].fields,
          value: config.fieldsToShow[dataId],
          onSelect: function onSelect(fieldsToShow) {
            var newConfig = (0, _extends4.default)({}, config, {
              fieldsToShow: (0, _extends4.default)({}, config.fieldsToShow, (0, _defineProperty3.default)({}, dataId, fieldsToShow.map(function (d) {
                return d.name;
              })))
            });
            onChange(newConfig);
          },
          closeOnSelect: false,
          multiSelect: true
        })
      );
    })
  );
};

var BrushConfig = function BrushConfig(_ref3) {
  var config = _ref3.config,
      _onChange = _ref3.onChange;
  return _react2.default.createElement(
    _styledComponents3.SidePanelSection,
    null,
    _react2.default.createElement(
      _styledComponents3.PanelLabel,
      null,
      'Brush Radius (km)'
    ),
    _react2.default.createElement(_rangeSlider2.default, {
      range: _interactionUtils.BRUSH_CONFIG.range,
      value0: 0,
      value1: config.size || 10 / 2,
      step: 0.1,
      isRanged: false,
      onChange: function onChange(value) {
        return _onChange((0, _extends4.default)({}, config, { size: value[1] }));
      },
      inputTheme: 'secondary'
    })
  );
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3NpZGUtcGFuZWwvaW50ZXJhY3Rpb24tcGFuZWwvaW50ZXJhY3Rpb24tcGFuZWwuanMiXSwibmFtZXMiOlsiU3R5bGVkUGFuZWxDb250ZW50IiwiUGFuZWxDb250ZW50IiwiZXh0ZW5kIiwicHJvcHMiLCJ0aGVtZSIsInBhbmVsQm9yZGVyQ29sb3IiLCJTdHlsZWRJbnRlcmFjdGlvblBhbmVsIiwic3R5bGVkIiwiZGl2IiwiSW50ZXJhY3Rpb25QYW5lbCIsInN0YXRlIiwiaXNDb25maWdBY3RpdmUiLCJfdXBkYXRlQ29uZmlnIiwib25Db25maWdDaGFuZ2UiLCJjb25maWciLCJuZXdQcm9wIiwiX2VuYWJsZUNvbmZpZyIsInNldFN0YXRlIiwiZGF0YXNldHMiLCJvbkNoYW5nZSIsIm5ld0NvbmZpZyIsInRlbXBsYXRlIiwiaWQiLCJpbm5lclBhbmVsV2lkdGgiLCJlbmFibGVkIiwiQ29tcG9uZW50IiwicHJvcFR5cGVzIiwiUHJvcFR5cGVzIiwib2JqZWN0IiwiaXNSZXF1aXJlZCIsImZ1bmMiLCJUb29sdGlwQ29uZmlnIiwid2lkdGgiLCJPYmplY3QiLCJrZXlzIiwiZmllbGRzVG9TaG93IiwibWFwIiwiZGF0YUlkIiwiZmllbGRzIiwiZCIsIm5hbWUiLCJCcnVzaENvbmZpZyIsIkJSVVNIX0NPTkZJRyIsInJhbmdlIiwic2l6ZSIsInZhbHVlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs2SEFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7QUFRQTs7QUFDQTs7OztBQUVBLElBQU1BLHFCQUFxQkMsZ0NBQWFDLE1BQWxDLGtCQUNvQjtBQUFB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bnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSAyMDE4IFViZXIgVGVjaG5vbG9naWVzLCBJbmMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuLy8gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuLy8gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuLy8gdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuLy8gY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4vLyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4vLyBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4vLyBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbi8vIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuLy8gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuLy8gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbi8vIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbi8vIFRIRSBTT0ZUV0FSRS5cblxuaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50fSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHN0eWxlZCBmcm9tICdzdHlsZWQtY29tcG9uZW50cyc7XG5pbXBvcnQgU3dpdGNoIGZyb20gJ2NvbXBvbmVudHMvY29tbW9uL3N3aXRjaCc7XG5pbXBvcnQgUmFuZ2VTbGlkZXIgZnJvbSAnY29tcG9uZW50cy9jb21tb24vcmFuZ2Utc2xpZGVyJztcbmltcG9ydCBGaWVsZFNlbGVjdG9yIGZyb20gJ2NvbXBvbmVudHMvY29tbW9uL2ZpZWxkLXNlbGVjdG9yJztcbmltcG9ydCB7XG4gIFBhbmVsTGFiZWwsXG4gIFNpZGVQYW5lbFNlY3Rpb24sXG4gIFN0eWxlZFBhbmVsSGVhZGVyLFxuICBQYW5lbEhlYWRlclRpdGxlLFxuICBQYW5lbEhlYWRlckNvbnRlbnQsXG4gIFBhbmVsQ29udGVudFxufSBmcm9tICdjb21wb25lbnRzL2NvbW1vbi9zdHlsZWQtY29tcG9uZW50cyc7XG5pbXBvcnQge0RhdGFzZXRUYWd9IGZyb20gJy4uL3NvdXJjZS1kYXRhLWNhdGFsb2cnO1xuaW1wb3J0IHtCUlVTSF9DT05GSUd9IGZyb20gJ3V0aWxzL2ludGVyYWN0aW9uLXV0aWxzJztcblxuY29uc3QgU3R5bGVkUGFuZWxDb250ZW50ID0gUGFuZWxDb250ZW50LmV4dGVuZGBcbiAgYm9yZGVyLXRvcDogMXB4IHNvbGlkICR7cHJvcHMgPT4gcHJvcHMudGhlbWUucGFuZWxCb3JkZXJDb2xvcn07XG5gO1xuXG5jb25zdCBTdHlsZWRJbnRlcmFjdGlvblBhbmVsID0gc3R5bGVkLmRpdmBcbiAgcGFkZGluZy1ib3R0b206IDZweDtcbmA7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEludGVyYWN0aW9uUGFuZWwgZXh0ZW5kcyBDb21wb25lbnQge1xuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIGRhdGFzZXRzOiBQcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsXG4gICAgY29uZmlnOiBQcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsXG4gICAgb25Db25maWdDaGFuZ2U6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWRcbiAgfTtcblxuICBzdGF0ZSA9IHtpc0NvbmZpZ0FjdGl2ZTogZmFsc2V9O1xuXG4gIF91cGRhdGVDb25maWcgPSBuZXdQcm9wID0+IHtcbiAgICB0aGlzLnByb3BzLm9uQ29uZmlnQ2hhbmdlKHtcbiAgICAgIC4uLnRoaXMucHJvcHMuY29uZmlnLFxuICAgICAgLi4ubmV3UHJvcFxuICAgIH0pO1xuICB9O1xuXG4gIF9lbmFibGVDb25maWcgPSAoKSA9PiB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7aXNDb25maWdBY3RpdmU6ICF0aGlzLnN0YXRlLmlzQ29uZmlnQWN0aXZlfSk7XG4gIH07XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHtjb25maWcsIGRhdGFzZXRzfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3Qgb25DaGFuZ2UgPSBuZXdDb25maWcgPT4gdGhpcy5fdXBkYXRlQ29uZmlnKHtjb25maWc6IG5ld0NvbmZpZ30pO1xuICAgIGxldCB0ZW1wbGF0ZSA9IG51bGw7XG5cbiAgICBzd2l0Y2ggKGNvbmZpZy5pZCkge1xuICAgICAgY2FzZSAndG9vbHRpcCc6XG4gICAgICAgIHRlbXBsYXRlID0gKFxuICAgICAgICAgIDxUb29sdGlwQ29uZmlnXG4gICAgICAgICAgICBkYXRhc2V0cz17ZGF0YXNldHN9XG4gICAgICAgICAgICBjb25maWc9e2NvbmZpZy5jb25maWd9XG4gICAgICAgICAgICB3aWR0aD17dGhpcy5zdGF0ZS5pbm5lclBhbmVsV2lkdGh9XG4gICAgICAgICAgICBvbkNoYW5nZT17b25DaGFuZ2V9XG4gICAgICAgICAgLz5cbiAgICAgICAgKTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgJ2JydXNoJzpcbiAgICAgICAgdGVtcGxhdGUgPSA8QnJ1c2hDb25maWcgY29uZmlnPXtjb25maWcuY29uZmlnfSBvbkNoYW5nZT17b25DaGFuZ2V9IC8+O1xuICAgICAgICBicmVhaztcblxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgcmV0dXJuIChcbiAgICAgIDxTdHlsZWRJbnRlcmFjdGlvblBhbmVsIGNsYXNzTmFtZT1cImludGVyYWN0aW9uLXBhbmVsXCI+XG4gICAgICAgIDxTdHlsZWRQYW5lbEhlYWRlclxuICAgICAgICAgIGNsYXNzTmFtZT1cImludGVyYWN0aW9uLXBhbmVsX19oZWFkZXJcIlxuICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuX2VuYWJsZUNvbmZpZ31cbiAgICAgICAgPlxuICAgICAgICAgIDxQYW5lbEhlYWRlckNvbnRlbnQgY2xhc3NOYW1lPVwiaW50ZXJhY3Rpb24tcGFuZWxfX2hlYWRlcl9fY29udGVudFwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJpbnRlcmFjdGlvbi1wYW5lbF9faGVhZGVyX19pY29uIGljb25cIj5cbiAgICAgICAgICAgICAgPGNvbmZpZy5pY29uQ29tcG9uZW50IGhlaWdodD1cIjEycHhcIi8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaW50ZXJhY3Rpb24tcGFuZWxfX2hlYWRlcl9fdGl0bGVcIj5cbiAgICAgICAgICAgICAgPFBhbmVsSGVhZGVyVGl0bGU+e2NvbmZpZy5pZH08L1BhbmVsSGVhZGVyVGl0bGU+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L1BhbmVsSGVhZGVyQ29udGVudD5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImludGVyYWN0aW9uLXBhbmVsX19oZWFkZXJfX2FjdGlvbnNcIj5cbiAgICAgICAgICAgIDxTd2l0Y2hcbiAgICAgICAgICAgICAgY2hlY2tlZD17Y29uZmlnLmVuYWJsZWR9XG4gICAgICAgICAgICAgIGlkPXtgJHtjb25maWcuaWR9LXRvZ2dsZWB9XG4gICAgICAgICAgICAgIG9uQ2hhbmdlPXsoKSA9PiB0aGlzLl91cGRhdGVDb25maWcoe2VuYWJsZWQ6ICFjb25maWcuZW5hYmxlZH0pfVxuICAgICAgICAgICAgICBzZWNvbmRhcnlcbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvU3R5bGVkUGFuZWxIZWFkZXI+XG4gICAgICAgIHtjb25maWcuZW5hYmxlZCAmJiAoXG4gICAgICAgICAgPFN0eWxlZFBhbmVsQ29udGVudCBjbGFzc05hbWU9XCJpbnRlcmFjdGlvbi1wYW5lbF9fY29udGVudFwiPlxuICAgICAgICAgICAge3RlbXBsYXRlfVxuICAgICAgICAgIDwvU3R5bGVkUGFuZWxDb250ZW50PlxuICAgICAgICApfVxuICAgICAgPC9TdHlsZWRJbnRlcmFjdGlvblBhbmVsPlxuICAgICk7XG4gIH1cbn1cblxuY29uc3QgVG9vbHRpcENvbmZpZyA9ICh7Y29uZmlnLCBkYXRhc2V0cywgd2lkdGgsIG9uQ2hhbmdlfSkgPT4gKFxuICA8ZGl2PlxuICAgIHtPYmplY3Qua2V5cyhjb25maWcuZmllbGRzVG9TaG93KS5tYXAoZGF0YUlkID0+IChcbiAgICAgIDxTaWRlUGFuZWxTZWN0aW9uIGtleT17ZGF0YUlkfT5cbiAgICAgICAgPERhdGFzZXRUYWcgZGF0YXNldD17ZGF0YXNldHNbZGF0YUlkXX0gLz5cbiAgICAgICAgPEZpZWxkU2VsZWN0b3JcbiAgICAgICAgICBmaWVsZHM9e2RhdGFzZXRzW2RhdGFJZF0uZmllbGRzfVxuICAgICAgICAgIHZhbHVlPXtjb25maWcuZmllbGRzVG9TaG93W2RhdGFJZF19XG4gICAgICAgICAgb25TZWxlY3Q9e2ZpZWxkc1RvU2hvdyA9PiB7XG4gICAgICAgICAgICBjb25zdCBuZXdDb25maWcgPSB7XG4gICAgICAgICAgICAgIC4uLmNvbmZpZyxcbiAgICAgICAgICAgICAgZmllbGRzVG9TaG93OiB7XG4gICAgICAgICAgICAgICAgLi4uY29uZmlnLmZpZWxkc1RvU2hvdyxcbiAgICAgICAgICAgICAgICBbZGF0YUlkXTogZmllbGRzVG9TaG93Lm1hcChkID0+IGQubmFtZSlcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIG9uQ2hhbmdlKG5ld0NvbmZpZyk7XG4gICAgICAgICAgfX1cbiAgICAgICAgICBjbG9zZU9uU2VsZWN0PXtmYWxzZX1cbiAgICAgICAgICBtdWx0aVNlbGVjdFxuICAgICAgICAvPlxuICAgICAgPC9TaWRlUGFuZWxTZWN0aW9uPlxuICAgICkpfVxuICA8L2Rpdj5cbik7XG5cbmNvbnN0IEJydXNoQ29uZmlnID0gKHtjb25maWcsIG9uQ2hhbmdlfSkgPT4gKFxuICA8U2lkZVBhbmVsU2VjdGlvbj5cbiAgICA8UGFuZWxMYWJlbD5CcnVzaCBSYWRpdXMgKGttKTwvUGFuZWxMYWJlbD5cbiAgICA8UmFuZ2VTbGlkZXJcbiAgICAgIHJhbmdlPXtCUlVTSF9DT05GSUcucmFuZ2V9XG4gICAgICB2YWx1ZTA9ezB9XG4gICAgICB2YWx1ZTE9e2NvbmZpZy5zaXplIHx8IDEwIC8gMn1cbiAgICAgIHN0ZXA9ezAuMX1cbiAgICAgIGlzUmFuZ2VkPXtmYWxzZX1cbiAgICAgIG9uQ2hhbmdlPXt2YWx1ZSA9PiBvbkNoYW5nZSh7Li4uY29uZmlnLCBzaXplOiB2YWx1ZVsxXX0pfVxuICAgICAgaW5wdXRUaGVtZT1cInNlY29uZGFyeVwiXG4gICAgLz5cbiAgPC9TaWRlUGFuZWxTZWN0aW9uPlxuKTtcbiJdfQ==