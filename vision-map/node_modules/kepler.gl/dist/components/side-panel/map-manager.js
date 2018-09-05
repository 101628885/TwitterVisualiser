'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends4 = require('babel-runtime/helpers/extends');

var _extends5 = _interopRequireDefault(_extends4);

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

var _templateObject = (0, _taggedTemplateLiteral3.default)(['\n  padding-bottom: 12px;\n'], ['\n  padding-bottom: 12px;\n']),
    _templateObject2 = (0, _taggedTemplateLiteral3.default)(['\n  height: 48px;\n  margin-bottom: 5px;\n  opacity: 1;\n  position: relative;\n  transition: opacity 0.05s ease-in, height 0.25s ease-out;\n  \n  &.collapsed {\n    height: 0;\n    margin-bottom: 0;\n    opacity: 0;\n  }\n\n  :hover {\n    cursor: pointer;\n    background-color: ', ';\n  }\n\n  .map-title-block img {\n    margin-right: 12px;\n  }\n\n  .map-preview {\n    border-radius: 3px;\n    height: 30px;\n    width: 40px;\n  }\n'], ['\n  height: 48px;\n  margin-bottom: 5px;\n  opacity: 1;\n  position: relative;\n  transition: opacity 0.05s ease-in, height 0.25s ease-out;\n  \n  &.collapsed {\n    height: 0;\n    margin-bottom: 0;\n    opacity: 0;\n  }\n\n  :hover {\n    cursor: pointer;\n    background-color: ', ';\n  }\n\n  .map-title-block img {\n    margin-right: 12px;\n  }\n\n  .map-preview {\n    border-radius: 3px;\n    height: 30px;\n    width: 40px;\n  }\n']),
    _templateObject3 = (0, _taggedTemplateLiteral3.default)(['\n  margin-bottom: 10px;\n  display: flex;\n  justify-content: space-between;\n\n  &:last-child {\n    margin-bottom: 0;\n  }\n\n  .layer-group__visibility-toggle {\n    margin-right: 12px;\n  }\n'], ['\n  margin-bottom: 10px;\n  display: flex;\n  justify-content: space-between;\n\n  &:last-child {\n    margin-bottom: 0;\n  }\n\n  .layer-group__visibility-toggle {\n    margin-right: 12px;\n  }\n']),
    _templateObject4 = (0, _taggedTemplateLiteral3.default)(['\n  color: ', ';\n'], ['\n  color: ', ';\n']); // Copyright (c) 2018 Uber Technologies, Inc.
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

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _styledComponents3 = require('../common/styled-components');

var _panelHeaderAction = require('./panel-header-action');

var _panelHeaderAction2 = _interopRequireDefault(_panelHeaderAction);

var _icons = require('../common/icons');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var StyledInteractionPanel = _styledComponents2.default.div(_templateObject);

var MapManager = (_temp2 = _class = function (_Component) {
  (0, _inherits3.default)(MapManager, _Component);

  function MapManager() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, MapManager);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = MapManager.__proto__ || Object.getPrototypeOf(MapManager)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      isSelecting: false
    }, _this._updateConfig = function (newProp) {
      var newConfig = (0, _extends5.default)({}, _this.props.mapStyle, newProp);
      _this.props.onConfigChange(newConfig);
    }, _this._toggleSelecting = function () {
      _this.setState({ isSelecting: !_this.state.isSelecting });
    }, _this._selectStyle = function (val) {
      _this.props.onStyleChange(val);
      _this._toggleSelecting();
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(MapManager, [{
    key: 'render',
    value: function render() {
      var mapStyle = this.props.mapStyle;

      var editableLayers = mapStyle.visibleLayerGroups;

      return _react2.default.createElement(
        'div',
        { className: 'map-style-panel' },
        _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(MapStyleSelector, {
            mapStyle: mapStyle,
            isSelecting: this.state.isSelecting,
            onChange: this._selectStyle,
            toggleActive: this._toggleSelecting
          }),
          Object.keys(editableLayers).length ? _react2.default.createElement(LayerGroupSelector, {
            layers: mapStyle.visibleLayerGroups,
            editableLayers: editableLayers,
            topLayers: mapStyle.topLayerGroups,
            onChange: this._updateConfig
          }) : null,
          _react2.default.createElement(
            _styledComponents3.Button,
            {
              onClick: this.props.showAddMapStyleModal,
              secondary: true },
            _react2.default.createElement(_icons.Add, { height: '12px' }),
            'Add Map Style'
          )
        )
      );
    }
  }]);
  return MapManager;
}(_react.Component), _class.propTypes = {
  mapStyle: _propTypes2.default.object.isRequired,
  onConfigChange: _propTypes2.default.func.isRequired,
  onStyleChange: _propTypes2.default.func.isRequired,
  showAddMapStyleModal: _propTypes2.default.func.isRequired
}, _temp2);
exports.default = MapManager;


var StyledMapDropdown = _styledComponents3.StyledPanelHeader.extend(_templateObject2, function (props) {
  return props.theme.panelBackgroundHover;
});

var MapStyleSelector = function MapStyleSelector(_ref2) {
  var mapStyle = _ref2.mapStyle,
      onChange = _ref2.onChange,
      toggleActive = _ref2.toggleActive,
      isSelecting = _ref2.isSelecting;
  return _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(
      _styledComponents3.PanelLabel,
      null,
      'Map style'
    ),
    Object.keys(mapStyle.mapStyles).map(function (op) {
      return _react2.default.createElement(
        StyledMapDropdown,
        {
          className: (0, _classnames2.default)('map-dropdown-option', {
            collapsed: !isSelecting && mapStyle.styleType !== op
          }),
          key: op,
          onClick: isSelecting ? function () {
            return onChange(op);
          } : toggleActive
        },
        _react2.default.createElement(
          _styledComponents3.PanelHeaderContent,
          { className: 'map-title-block' },
          _react2.default.createElement('img', { className: 'map-preview', src: mapStyle.mapStyles[op].icon }),
          _react2.default.createElement(
            _styledComponents3.PanelHeaderTitle,
            { className: 'map-preview-name' },
            mapStyle.mapStyles[op].label
          )
        ),
        !isSelecting ? _react2.default.createElement(_panelHeaderAction2.default, {
          className: 'map-dropdown-option__enable-config',
          id: 'map-enable-config',
          IconComponent: _icons.ArrowDown,
          tooltip: 'Select Base Map Style',
          onClick: toggleActive
        }) : null
      );
    })
  );
};

var StyledLayerGroupItem = _styledComponents2.default.div(_templateObject3);

var LayerLabel = _styledComponents3.PanelLabelBold.extend(_templateObject4, function (props) {
  return props.active ? props.theme.textColor : props.theme.labelColor;
});
var LayerGroupSelector = function LayerGroupSelector(_ref3) {
  var layers = _ref3.layers,
      editableLayers = _ref3.editableLayers,
      onChange = _ref3.onChange,
      topLayers = _ref3.topLayers;
  return _react2.default.createElement(
    StyledInteractionPanel,
    { className: 'map-style__layer-group__selector' },
    _react2.default.createElement(
      'div',
      { className: 'layer-group__header' },
      _react2.default.createElement(
        _styledComponents3.PanelLabel,
        null,
        'Map Layers'
      )
    ),
    _react2.default.createElement(
      _styledComponents3.PanelContent,
      { className: 'map-style__layer-group' },
      Object.keys(editableLayers).map(function (slug) {
        return _react2.default.createElement(
          StyledLayerGroupItem,
          { className: 'layer-group__select', key: slug },
          _react2.default.createElement(
            _styledComponents3.PanelLabelWrapper,
            null,
            _react2.default.createElement(_panelHeaderAction2.default, {
              className: 'layer-group__visibility-toggle',
              id: slug + '-toggle',
              tooltip: layers[slug] ? 'hide' : 'show',
              onClick: function onClick() {
                return onChange({
                  visibleLayerGroups: (0, _extends5.default)({}, layers, (0, _defineProperty3.default)({}, slug, !layers[slug]))
                });
              },
              IconComponent: layers[slug] ? _icons.EyeSeen : _icons.EyeUnseen,
              active: layers[slug],
              flush: true
            }),
            _react2.default.createElement(
              LayerLabel,
              { active: layers[slug] },
              slug
            )
          ),
          _react2.default.createElement(
            _styledComponents3.CenterFlexbox,
            { className: 'layer-group__bring-top' },
            _react2.default.createElement(_panelHeaderAction2.default, {
              id: slug + '-top',
              tooltip: 'Move to top of data layers',
              disabled: !layers[slug],
              IconComponent: _icons.Upload,
              active: topLayers[slug],
              onClick: function onClick() {
                return onChange({
                  topLayerGroups: (0, _extends5.default)({}, topLayers, (0, _defineProperty3.default)({}, slug, !topLayers[slug]))
                });
              }
            })
          )
        );
      })
    )
  );
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3NpZGUtcGFuZWwvbWFwLW1hbmFnZXIuanMiXSwibmFtZXMiOlsiU3R5bGVkSW50ZXJhY3Rpb25QYW5lbCIsInN0eWxlZCIsImRpdiIsIk1hcE1hbmFnZXIiLCJzdGF0ZSIsImlzU2VsZWN0aW5nIiwiX3VwZGF0ZUNvbmZpZyIsIm5ld0NvbmZpZyIsInByb3BzIiwibWFwU3R5bGUiLCJuZXdQcm9wIiwib25Db25maWdDaGFuZ2UiLCJfdG9nZ2xlU2VsZWN0aW5nIiwic2V0U3RhdGUiLCJfc2VsZWN0U3R5bGUiLCJvblN0eWxlQ2hhbmdlIiwidmFsIiwiZWRpdGFibGVMYXllcnMiLCJ2aXNpYmxlTGF5ZXJHcm91cHMiLCJPYmplY3QiLCJrZXlzIiwibGVuZ3RoIiwidG9wTGF5ZXJHcm91cHMiLCJzaG93QWRkTWFwU3R5bGVNb2RhbCIsIkNvbXBvbmVudCIsInByb3BUeXBlcyIsIlByb3BUeXBlcyIsIm9iamVjdCIsImlzUmVxdWlyZWQiLCJmdW5jIiwiU3R5bGVkTWFwRHJvcGRvd24iLCJTdHlsZWRQYW5lbEhlYWRlciIsImV4dGVuZCIsInRoZW1lIiwicGFuZWxCYWNrZ3JvdW5kSG92ZXIiLCJNYXBTdHlsZVNlbGVjdG9yIiwib25DaGFuZ2UiLCJ0b2dnbGVBY3RpdmUiLCJtYXBTdHlsZXMiLCJtYXAiLCJjb2xsYXBzZWQiLCJzdHlsZVR5cGUiLCJvcCIsImljb24iLCJsYWJlbCIsIkFycm93RG93biIsIlN0eWxlZExheWVyR3JvdXBJdGVtIiwiTGF5ZXJMYWJlbCIsIlBhbmVsTGFiZWxCb2xkIiwiYWN0aXZlIiwidGV4dENvbG9yIiwibGFiZWxDb2xvciIsIkxheWVyR3JvdXBTZWxlY3RvciIsImxheWVycyIsInRvcExheWVycyIsInNsdWciLCJFeWVTZWVuIiwiRXllVW5zZWVuIiwiVXBsb2FkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzZHQUFBO0FBQ0E7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ZSI6Im1hcC1tYW5hZ2VyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSAyMDE4IFViZXIgVGVjaG5vbG9naWVzLCBJbmMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuLy8gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuLy8gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuLy8gdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuLy8gY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4vLyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4vLyBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4vLyBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbi8vIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuLy8gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuLy8gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbi8vIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbi8vIFRIRSBTT0ZUV0FSRS5cblxuaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50fSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IGNsYXNzbmFtZXMgZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgc3R5bGVkIGZyb20gJ3N0eWxlZC1jb21wb25lbnRzJztcblxuaW1wb3J0IHtcbiAgQnV0dG9uLFxuICBQYW5lbExhYmVsLFxuICBTdHlsZWRQYW5lbEhlYWRlcixcbiAgUGFuZWxIZWFkZXJUaXRsZSxcbiAgUGFuZWxIZWFkZXJDb250ZW50LFxuICBQYW5lbENvbnRlbnQsXG4gIFBhbmVsTGFiZWxCb2xkLFxuICBQYW5lbExhYmVsV3JhcHBlcixcbiAgQ2VudGVyRmxleGJveFxufSBmcm9tICdjb21wb25lbnRzL2NvbW1vbi9zdHlsZWQtY29tcG9uZW50cyc7XG5cbmltcG9ydCBQYW5lbEhlYWRlckFjdGlvbiBmcm9tICdjb21wb25lbnRzL3NpZGUtcGFuZWwvcGFuZWwtaGVhZGVyLWFjdGlvbic7XG5pbXBvcnQge0FkZCwgQXJyb3dEb3duLCBFeWVTZWVuLCBFeWVVbnNlZW4sIFVwbG9hZH0gZnJvbSAnY29tcG9uZW50cy9jb21tb24vaWNvbnMnO1xuXG5jb25zdCBTdHlsZWRJbnRlcmFjdGlvblBhbmVsID0gc3R5bGVkLmRpdmBcbiAgcGFkZGluZy1ib3R0b206IDEycHg7XG5gO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNYXBNYW5hZ2VyIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICBtYXBTdHlsZTogUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkLFxuICAgIG9uQ29uZmlnQ2hhbmdlOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIG9uU3R5bGVDaGFuZ2U6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgc2hvd0FkZE1hcFN0eWxlTW9kYWw6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWRcbiAgfTtcblxuICBzdGF0ZSA9IHtcbiAgICBpc1NlbGVjdGluZzogZmFsc2VcbiAgfTtcblxuICBfdXBkYXRlQ29uZmlnID0gbmV3UHJvcCA9PiB7XG4gICAgY29uc3QgbmV3Q29uZmlnID0gey4uLnRoaXMucHJvcHMubWFwU3R5bGUsIC4uLm5ld1Byb3B9O1xuICAgIHRoaXMucHJvcHMub25Db25maWdDaGFuZ2UobmV3Q29uZmlnKTtcbiAgfTtcblxuICBfdG9nZ2xlU2VsZWN0aW5nID0gKCkgPT4ge1xuICAgIHRoaXMuc2V0U3RhdGUoe2lzU2VsZWN0aW5nOiAhdGhpcy5zdGF0ZS5pc1NlbGVjdGluZ30pO1xuICB9O1xuXG4gIF9zZWxlY3RTdHlsZSA9IHZhbCA9PiB7XG4gICAgdGhpcy5wcm9wcy5vblN0eWxlQ2hhbmdlKHZhbCk7XG4gICAgdGhpcy5fdG9nZ2xlU2VsZWN0aW5nKCk7XG4gIH07XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHttYXBTdHlsZX0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IGVkaXRhYmxlTGF5ZXJzID0gbWFwU3R5bGUudmlzaWJsZUxheWVyR3JvdXBzO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWFwLXN0eWxlLXBhbmVsXCI+XG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgPE1hcFN0eWxlU2VsZWN0b3JcbiAgICAgICAgICAgIG1hcFN0eWxlPXttYXBTdHlsZX1cbiAgICAgICAgICAgIGlzU2VsZWN0aW5nPXt0aGlzLnN0YXRlLmlzU2VsZWN0aW5nfVxuICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMuX3NlbGVjdFN0eWxlfVxuICAgICAgICAgICAgdG9nZ2xlQWN0aXZlPXt0aGlzLl90b2dnbGVTZWxlY3Rpbmd9XG4gICAgICAgICAgLz5cbiAgICAgICAgICB7T2JqZWN0LmtleXMoZWRpdGFibGVMYXllcnMpLmxlbmd0aCA/IChcbiAgICAgICAgICAgIDxMYXllckdyb3VwU2VsZWN0b3JcbiAgICAgICAgICAgICAgbGF5ZXJzPXttYXBTdHlsZS52aXNpYmxlTGF5ZXJHcm91cHN9XG4gICAgICAgICAgICAgIGVkaXRhYmxlTGF5ZXJzPXtlZGl0YWJsZUxheWVyc31cbiAgICAgICAgICAgICAgdG9wTGF5ZXJzPXttYXBTdHlsZS50b3BMYXllckdyb3Vwc31cbiAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMuX3VwZGF0ZUNvbmZpZ31cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgKSA6IG51bGx9XG4gICAgICAgICAgPEJ1dHRvblxuICAgICAgICAgICAgb25DbGljaz17dGhpcy5wcm9wcy5zaG93QWRkTWFwU3R5bGVNb2RhbH1cbiAgICAgICAgICAgIHNlY29uZGFyeT5cbiAgICAgICAgICAgIDxBZGQgaGVpZ2h0PVwiMTJweFwiIC8+QWRkIE1hcCBTdHlsZVxuICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuY29uc3QgU3R5bGVkTWFwRHJvcGRvd24gPSBTdHlsZWRQYW5lbEhlYWRlci5leHRlbmRgXG4gIGhlaWdodDogNDhweDtcbiAgbWFyZ2luLWJvdHRvbTogNXB4O1xuICBvcGFjaXR5OiAxO1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIHRyYW5zaXRpb246IG9wYWNpdHkgMC4wNXMgZWFzZS1pbiwgaGVpZ2h0IDAuMjVzIGVhc2Utb3V0O1xuICBcbiAgJi5jb2xsYXBzZWQge1xuICAgIGhlaWdodDogMDtcbiAgICBtYXJnaW4tYm90dG9tOiAwO1xuICAgIG9wYWNpdHk6IDA7XG4gIH1cblxuICA6aG92ZXIge1xuICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAke3Byb3BzID0+IHByb3BzLnRoZW1lLnBhbmVsQmFja2dyb3VuZEhvdmVyfTtcbiAgfVxuXG4gIC5tYXAtdGl0bGUtYmxvY2sgaW1nIHtcbiAgICBtYXJnaW4tcmlnaHQ6IDEycHg7XG4gIH1cblxuICAubWFwLXByZXZpZXcge1xuICAgIGJvcmRlci1yYWRpdXM6IDNweDtcbiAgICBoZWlnaHQ6IDMwcHg7XG4gICAgd2lkdGg6IDQwcHg7XG4gIH1cbmA7XG5cbmNvbnN0IE1hcFN0eWxlU2VsZWN0b3IgPSAoe21hcFN0eWxlLCBvbkNoYW5nZSwgdG9nZ2xlQWN0aXZlLCBpc1NlbGVjdGluZ30pID0+IChcbiAgPGRpdj5cbiAgICA8UGFuZWxMYWJlbD5NYXAgc3R5bGU8L1BhbmVsTGFiZWw+XG4gICAge09iamVjdC5rZXlzKG1hcFN0eWxlLm1hcFN0eWxlcykubWFwKG9wID0+IChcbiAgICAgIDxTdHlsZWRNYXBEcm9wZG93blxuICAgICAgICBjbGFzc05hbWU9e2NsYXNzbmFtZXMoJ21hcC1kcm9wZG93bi1vcHRpb24nLCB7XG4gICAgICAgICAgY29sbGFwc2VkOiAhaXNTZWxlY3RpbmcgJiYgbWFwU3R5bGUuc3R5bGVUeXBlICE9PSBvcFxuICAgICAgICB9KX1cbiAgICAgICAga2V5PXtvcH1cbiAgICAgICAgb25DbGljaz17aXNTZWxlY3RpbmcgPyAoKSA9PiBvbkNoYW5nZShvcCkgOiB0b2dnbGVBY3RpdmV9XG4gICAgICA+XG4gICAgICAgIDxQYW5lbEhlYWRlckNvbnRlbnQgY2xhc3NOYW1lPVwibWFwLXRpdGxlLWJsb2NrXCI+XG4gICAgICAgICAgPGltZyBjbGFzc05hbWU9XCJtYXAtcHJldmlld1wiIHNyYz17bWFwU3R5bGUubWFwU3R5bGVzW29wXS5pY29ufSAvPlxuICAgICAgICAgIDxQYW5lbEhlYWRlclRpdGxlIGNsYXNzTmFtZT1cIm1hcC1wcmV2aWV3LW5hbWVcIj5cbiAgICAgICAgICAgIHttYXBTdHlsZS5tYXBTdHlsZXNbb3BdLmxhYmVsfVxuICAgICAgICAgIDwvUGFuZWxIZWFkZXJUaXRsZT5cbiAgICAgICAgPC9QYW5lbEhlYWRlckNvbnRlbnQ+XG4gICAgICAgIHshaXNTZWxlY3RpbmcgPyAoXG4gICAgICAgICAgPFBhbmVsSGVhZGVyQWN0aW9uXG4gICAgICAgICAgICBjbGFzc05hbWU9XCJtYXAtZHJvcGRvd24tb3B0aW9uX19lbmFibGUtY29uZmlnXCJcbiAgICAgICAgICAgIGlkPVwibWFwLWVuYWJsZS1jb25maWdcIlxuICAgICAgICAgICAgSWNvbkNvbXBvbmVudD17QXJyb3dEb3dufVxuICAgICAgICAgICAgdG9vbHRpcD17J1NlbGVjdCBCYXNlIE1hcCBTdHlsZSd9XG4gICAgICAgICAgICBvbkNsaWNrPXt0b2dnbGVBY3RpdmV9XG4gICAgICAgICAgLz5cbiAgICAgICAgKSA6IG51bGx9XG4gICAgICA8L1N0eWxlZE1hcERyb3Bkb3duPlxuICAgICkpfVxuICA8L2Rpdj5cbik7XG5cbmNvbnN0IFN0eWxlZExheWVyR3JvdXBJdGVtID0gc3R5bGVkLmRpdmBcbiAgbWFyZ2luLWJvdHRvbTogMTBweDtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuXG4gICY6bGFzdC1jaGlsZCB7XG4gICAgbWFyZ2luLWJvdHRvbTogMDtcbiAgfVxuXG4gIC5sYXllci1ncm91cF9fdmlzaWJpbGl0eS10b2dnbGUge1xuICAgIG1hcmdpbi1yaWdodDogMTJweDtcbiAgfVxuYDtcblxuY29uc3QgTGF5ZXJMYWJlbCA9IFBhbmVsTGFiZWxCb2xkLmV4dGVuZGBcbiAgY29sb3I6ICR7cHJvcHMgPT5cbiAgICBwcm9wcy5hY3RpdmUgPyBwcm9wcy50aGVtZS50ZXh0Q29sb3IgOiBwcm9wcy50aGVtZS5sYWJlbENvbG9yfTtcbmA7XG5jb25zdCBMYXllckdyb3VwU2VsZWN0b3IgPSAoe2xheWVycywgZWRpdGFibGVMYXllcnMsIG9uQ2hhbmdlLCB0b3BMYXllcnN9KSA9PiAoXG4gIDxTdHlsZWRJbnRlcmFjdGlvblBhbmVsIGNsYXNzTmFtZT1cIm1hcC1zdHlsZV9fbGF5ZXItZ3JvdXBfX3NlbGVjdG9yXCI+XG4gICAgPGRpdiBjbGFzc05hbWU9XCJsYXllci1ncm91cF9faGVhZGVyXCI+XG4gICAgICA8UGFuZWxMYWJlbD5NYXAgTGF5ZXJzPC9QYW5lbExhYmVsPlxuICAgIDwvZGl2PlxuICAgIDxQYW5lbENvbnRlbnQgY2xhc3NOYW1lPVwibWFwLXN0eWxlX19sYXllci1ncm91cFwiPlxuICAgICAge09iamVjdC5rZXlzKGVkaXRhYmxlTGF5ZXJzKS5tYXAoc2x1ZyA9PiAoXG4gICAgICAgIDxTdHlsZWRMYXllckdyb3VwSXRlbSBjbGFzc05hbWU9XCJsYXllci1ncm91cF9fc2VsZWN0XCIga2V5PXtzbHVnfT5cbiAgICAgICAgICA8UGFuZWxMYWJlbFdyYXBwZXI+XG4gICAgICAgICAgICA8UGFuZWxIZWFkZXJBY3Rpb25cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwibGF5ZXItZ3JvdXBfX3Zpc2liaWxpdHktdG9nZ2xlXCJcbiAgICAgICAgICAgICAgaWQ9e2Ake3NsdWd9LXRvZ2dsZWB9XG4gICAgICAgICAgICAgIHRvb2x0aXA9e2xheWVyc1tzbHVnXSA/ICdoaWRlJyA6ICdzaG93J31cbiAgICAgICAgICAgICAgb25DbGljaz17KCkgPT5cbiAgICAgICAgICAgICAgICBvbkNoYW5nZSh7XG4gICAgICAgICAgICAgICAgICB2aXNpYmxlTGF5ZXJHcm91cHM6IHtcbiAgICAgICAgICAgICAgICAgICAgLi4ubGF5ZXJzLFxuICAgICAgICAgICAgICAgICAgICBbc2x1Z106ICFsYXllcnNbc2x1Z11cbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIEljb25Db21wb25lbnQ9e2xheWVyc1tzbHVnXSA/IEV5ZVNlZW4gOiBFeWVVbnNlZW59XG4gICAgICAgICAgICAgIGFjdGl2ZT17bGF5ZXJzW3NsdWddfVxuICAgICAgICAgICAgICBmbHVzaFxuICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDxMYXllckxhYmVsIGFjdGl2ZT17bGF5ZXJzW3NsdWddfT57c2x1Z308L0xheWVyTGFiZWw+XG4gICAgICAgICAgPC9QYW5lbExhYmVsV3JhcHBlcj5cbiAgICAgICAgICA8Q2VudGVyRmxleGJveCBjbGFzc05hbWU9XCJsYXllci1ncm91cF9fYnJpbmctdG9wXCI+XG4gICAgICAgICAgICA8UGFuZWxIZWFkZXJBY3Rpb25cbiAgICAgICAgICAgICAgaWQ9e2Ake3NsdWd9LXRvcGB9XG4gICAgICAgICAgICAgIHRvb2x0aXA9XCJNb3ZlIHRvIHRvcCBvZiBkYXRhIGxheWVyc1wiXG4gICAgICAgICAgICAgIGRpc2FibGVkPXshbGF5ZXJzW3NsdWddfVxuICAgICAgICAgICAgICBJY29uQ29tcG9uZW50PXtVcGxvYWR9XG4gICAgICAgICAgICAgIGFjdGl2ZT17dG9wTGF5ZXJzW3NsdWddfVxuICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PlxuICAgICAgICAgICAgICAgIG9uQ2hhbmdlKHtcbiAgICAgICAgICAgICAgICAgIHRvcExheWVyR3JvdXBzOiB7XG4gICAgICAgICAgICAgICAgICAgIC4uLnRvcExheWVycyxcbiAgICAgICAgICAgICAgICAgICAgW3NsdWddOiAhdG9wTGF5ZXJzW3NsdWddXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA8L0NlbnRlckZsZXhib3g+XG4gICAgICAgIDwvU3R5bGVkTGF5ZXJHcm91cEl0ZW0+XG4gICAgICApKX1cbiAgICA8L1BhbmVsQ29udGVudD5cbiAgPC9TdHlsZWRJbnRlcmFjdGlvblBhbmVsPlxuKTtcbiJdfQ==