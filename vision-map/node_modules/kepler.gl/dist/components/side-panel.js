'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

var _templateObject = (0, _taggedTemplateLiteral3.default)(['\n  ', ';\n  flex-grow: 1;\n  padding: 16px;\n  overflow-y: scroll;\n  overflow-x: hidden;\n'], ['\n  ', ';\n  flex-grow: 1;\n  padding: 16px;\n  overflow-y: scroll;\n  overflow-x: hidden;\n']),
    _templateObject2 = (0, _taggedTemplateLiteral3.default)(['\n  color: ', ';\n  font-size: 20px;\n  font-weight: 400;\n  letter-spacing: 1.25px;\n  margin-bottom: 14px;\n'], ['\n  color: ', ';\n  font-size: 20px;\n  font-weight: 400;\n  letter-spacing: 1.25px;\n  margin-bottom: 14px;\n']); // Copyright (c) 2018 Uber Technologies, Inc.
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

exports.default = SidePanelFactory;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _sideBar = require('./side-panel/side-bar');

var _sideBar2 = _interopRequireDefault(_sideBar);

var _panelHeader = require('./side-panel/panel-header');

var _panelHeader2 = _interopRequireDefault(_panelHeader);

var _layerManager = require('./side-panel/layer-manager');

var _layerManager2 = _interopRequireDefault(_layerManager);

var _filterManager = require('./side-panel/filter-manager');

var _filterManager2 = _interopRequireDefault(_filterManager);

var _interactionManager = require('./side-panel/interaction-manager');

var _interactionManager2 = _interopRequireDefault(_interactionManager);

var _mapManager = require('./side-panel/map-manager');

var _mapManager2 = _interopRequireDefault(_mapManager);

var _panelToggle = require('./side-panel/panel-toggle');

var _panelToggle2 = _interopRequireDefault(_panelToggle);

var _defaultSettings = require('../constants/default-settings');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SidePanelContent = _styledComponents2.default.div(_templateObject, function (props) {
  return props.theme.sidePanelScrollBar;
});

var PanelTitle = _styledComponents2.default.div(_templateObject2, function (props) {
  return props.theme.titleTextColor;
});

SidePanelFactory.deps = [_panelHeader2.default];

/**
 *
 * Vertical sidebar containing input components for the rendering layers
 */
function SidePanelFactory(PanelHeader) {
  var _class, _temp2;

  return _temp2 = _class = function (_Component) {
    (0, _inherits3.default)(SidePanel, _Component);

    function SidePanel() {
      var _ref;

      var _temp, _this, _ret;

      (0, _classCallCheck3.default)(this, SidePanel);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = SidePanel.__proto__ || Object.getPrototypeOf(SidePanel)).call.apply(_ref, [this].concat(args))), _this), _this._onOpenOrClose = function () {
        _this.props.uiStateActions.toggleSidePanel(_this.props.uiState.activeSidePanel ? null : 'layer');
      }, _this._showDatasetTable = function (dataId) {
        // this will open data table modal
        _this.props.visStateActions.showDatasetTable(dataId);
        _this.props.uiStateActions.toggleModal(_defaultSettings.DATA_TABLE_ID);
      }, _this._showAddDataModal = function () {
        _this.props.uiStateActions.toggleModal(_defaultSettings.ADD_DATA_ID);
      }, _this._showAddMapStyleModal = function () {
        _this.props.uiStateActions.toggleModal(_defaultSettings.ADD_MAP_STYLE_ID);
      }, _this._removeDataset = function (key) {
        // this will show the modal dialog to confirm deletion
        _this.props.uiStateActions.openDeleteModal(key);
      }, _this._onExportImage = function () {
        return _this.props.uiStateActions.toggleModal(_defaultSettings.EXPORT_IMAGE_ID);
      }, _this._onExportData = function () {
        return _this.props.uiStateActions.toggleModal(_defaultSettings.EXPORT_DATA_ID);
      }, _this._onExportConfig = function () {
        return _this.props.uiStateActions.toggleModal(_defaultSettings.EXPORT_CONFIG_ID);
      }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
    }

    /* component private functions */


    (0, _createClass3.default)(SidePanel, [{
      key: 'render',
      value: function render() {
        var _props = this.props,
            appName = _props.appName,
            version = _props.version,
            datasets = _props.datasets,
            filters = _props.filters,
            layers = _props.layers,
            layerBlending = _props.layerBlending,
            layerClasses = _props.layerClasses,
            uiState = _props.uiState,
            layerOrder = _props.layerOrder,
            interactionConfig = _props.interactionConfig,
            visStateActions = _props.visStateActions,
            mapStyleActions = _props.mapStyleActions,
            uiStateActions = _props.uiStateActions;
        var activeSidePanel = uiState.activeSidePanel;

        var isOpen = Boolean(activeSidePanel);

        var layerManagerActions = {
          addLayer: visStateActions.addLayer,
          layerConfigChange: visStateActions.layerConfigChange,
          layerVisualChannelConfigChange: visStateActions.layerVisualChannelConfigChange,
          layerTypeChange: visStateActions.layerTypeChange,
          layerVisConfigChange: visStateActions.layerVisConfigChange,
          updateLayerBlending: visStateActions.updateLayerBlending,
          updateLayerOrder: visStateActions.reorderLayer,
          showDatasetTable: this._showDatasetTable,
          showAddDataModal: this._showAddDataModal,
          removeLayer: visStateActions.removeLayer,
          removeDataset: this._removeDataset
        };

        var filterManagerActions = {
          addFilter: visStateActions.addFilter,
          removeFilter: visStateActions.removeFilter,
          setFilter: visStateActions.setFilter,
          showDatasetTable: this._showDatasetTable,
          showAddDataModal: this._showAddDataModal,
          toggleAnimation: visStateActions.toggleAnimation,
          enlargeFilter: visStateActions.enlargeFilter
        };

        var interactionManagerActions = {
          onConfigChange: visStateActions.interactionConfigChange
        };

        var mapManagerActions = {
          addMapStyleUrl: mapStyleActions.addMapStyleUrl,
          onConfigChange: mapStyleActions.mapConfigChange,
          onStyleChange: mapStyleActions.mapStyleChange,
          onBuildingChange: mapStyleActions.mapBuildingChange,
          showAddMapStyleModal: this._showAddMapStyleModal
        };

        return _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            _sideBar2.default,
            {
              width: this.props.width,
              isOpen: isOpen,
              minifiedWidth: 0,
              onOpenOrClose: this._onOpenOrClose
            },
            _react2.default.createElement(PanelHeader, {
              appName: appName,
              version: version,
              onExportImage: this._onExportImage,
              onExportData: this._onExportData,
              visibleDropdown: uiState.visibleDropdown,
              showExportDropdown: uiStateActions.showExportDropdown,
              hideExportDropdown: uiStateActions.hideExportDropdown,
              onExportConfig: this._onExportConfig,
              onSaveMap: this.props.onSaveMap
            }),
            _react2.default.createElement(_panelToggle2.default, {
              panels: _defaultSettings.PANELS,
              activePanel: activeSidePanel,
              togglePanel: uiStateActions.toggleSidePanel
            }),
            _react2.default.createElement(
              SidePanelContent,
              { className: 'side-panel__content' },
              _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                  PanelTitle,
                  { className: 'side-panel__content__title' },
                  (_defaultSettings.PANELS.find(function (_ref2) {
                    var id = _ref2.id;
                    return id === activeSidePanel;
                  }) || {}).label
                ),
                activeSidePanel === 'layer' && _react2.default.createElement(_layerManager2.default, (0, _extends3.default)({}, layerManagerActions, {
                  datasets: datasets,
                  layers: layers,
                  layerClasses: layerClasses,
                  layerOrder: layerOrder,
                  layerBlending: layerBlending,
                  openModal: uiStateActions.toggleModal
                })),
                activeSidePanel === 'filter' && _react2.default.createElement(_filterManager2.default, (0, _extends3.default)({}, filterManagerActions, {
                  datasets: datasets,
                  filters: filters
                })),
                activeSidePanel === 'interaction' && _react2.default.createElement(_interactionManager2.default, (0, _extends3.default)({}, interactionManagerActions, {
                  datasets: datasets,
                  interactionConfig: interactionConfig
                })),
                activeSidePanel === 'map' && _react2.default.createElement(_mapManager2.default, (0, _extends3.default)({}, mapManagerActions, {
                  mapStyle: this.props.mapStyle
                }))
              )
            )
          )
        );
      }
    }]);
    return SidePanel;
  }(_react.Component), _class.propTypes = {
    filters: _propTypes2.default.arrayOf(_propTypes2.default.any).isRequired,
    interactionConfig: _propTypes2.default.object.isRequired,
    layerBlending: _propTypes2.default.string.isRequired,
    layers: _propTypes2.default.arrayOf(_propTypes2.default.any).isRequired,
    layerClasses: _propTypes2.default.object.isRequired,
    mapStyle: _propTypes2.default.object.isRequired,
    width: _propTypes2.default.number.isRequired,
    datasets: _propTypes2.default.object.isRequired,
    visStateActions: _propTypes2.default.object.isRequired,
    mapStyleActions: _propTypes2.default.object.isRequired
  }, _temp2;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL3NpZGUtcGFuZWwuanMiXSwibmFtZXMiOlsiU2lkZVBhbmVsRmFjdG9yeSIsIlNpZGVQYW5lbENvbnRlbnQiLCJzdHlsZWQiLCJkaXYiLCJwcm9wcyIsInRoZW1lIiwic2lkZVBhbmVsU2Nyb2xsQmFyIiwiUGFuZWxUaXRsZSIsInRpdGxlVGV4dENvbG9yIiwiZGVwcyIsIlBhbmVsSGVhZGVyRmFjdG9yeSIsIlBhbmVsSGVhZGVyIiwiX29uT3Blbk9yQ2xvc2UiLCJ1aVN0YXRlQWN0aW9ucyIsInRvZ2dsZVNpZGVQYW5lbCIsInVpU3RhdGUiLCJhY3RpdmVTaWRlUGFuZWwiLCJfc2hvd0RhdGFzZXRUYWJsZSIsInZpc1N0YXRlQWN0aW9ucyIsInNob3dEYXRhc2V0VGFibGUiLCJkYXRhSWQiLCJ0b2dnbGVNb2RhbCIsIkRBVEFfVEFCTEVfSUQiLCJfc2hvd0FkZERhdGFNb2RhbCIsIkFERF9EQVRBX0lEIiwiX3Nob3dBZGRNYXBTdHlsZU1vZGFsIiwiQUREX01BUF9TVFlMRV9JRCIsIl9yZW1vdmVEYXRhc2V0Iiwib3BlbkRlbGV0ZU1vZGFsIiwia2V5IiwiX29uRXhwb3J0SW1hZ2UiLCJFWFBPUlRfSU1BR0VfSUQiLCJfb25FeHBvcnREYXRhIiwiRVhQT1JUX0RBVEFfSUQiLCJfb25FeHBvcnRDb25maWciLCJFWFBPUlRfQ09ORklHX0lEIiwiYXBwTmFtZSIsInZlcnNpb24iLCJkYXRhc2V0cyIsImZpbHRlcnMiLCJsYXllcnMiLCJsYXllckJsZW5kaW5nIiwibGF5ZXJDbGFzc2VzIiwibGF5ZXJPcmRlciIsImludGVyYWN0aW9uQ29uZmlnIiwibWFwU3R5bGVBY3Rpb25zIiwiaXNPcGVuIiwiQm9vbGVhbiIsImxheWVyTWFuYWdlckFjdGlvbnMiLCJhZGRMYXllciIsImxheWVyQ29uZmlnQ2hhbmdlIiwibGF5ZXJWaXN1YWxDaGFubmVsQ29uZmlnQ2hhbmdlIiwibGF5ZXJUeXBlQ2hhbmdlIiwibGF5ZXJWaXNDb25maWdDaGFuZ2UiLCJ1cGRhdGVMYXllckJsZW5kaW5nIiwidXBkYXRlTGF5ZXJPcmRlciIsInJlb3JkZXJMYXllciIsInNob3dBZGREYXRhTW9kYWwiLCJyZW1vdmVMYXllciIsInJlbW92ZURhdGFzZXQiLCJmaWx0ZXJNYW5hZ2VyQWN0aW9ucyIsImFkZEZpbHRlciIsInJlbW92ZUZpbHRlciIsInNldEZpbHRlciIsInRvZ2dsZUFuaW1hdGlvbiIsImVubGFyZ2VGaWx0ZXIiLCJpbnRlcmFjdGlvbk1hbmFnZXJBY3Rpb25zIiwib25Db25maWdDaGFuZ2UiLCJpbnRlcmFjdGlvbkNvbmZpZ0NoYW5nZSIsIm1hcE1hbmFnZXJBY3Rpb25zIiwiYWRkTWFwU3R5bGVVcmwiLCJtYXBDb25maWdDaGFuZ2UiLCJvblN0eWxlQ2hhbmdlIiwibWFwU3R5bGVDaGFuZ2UiLCJvbkJ1aWxkaW5nQ2hhbmdlIiwibWFwQnVpbGRpbmdDaGFuZ2UiLCJzaG93QWRkTWFwU3R5bGVNb2RhbCIsIndpZHRoIiwidmlzaWJsZURyb3Bkb3duIiwic2hvd0V4cG9ydERyb3Bkb3duIiwiaGlkZUV4cG9ydERyb3Bkb3duIiwib25TYXZlTWFwIiwiUEFORUxTIiwiZmluZCIsImlkIiwibGFiZWwiLCJtYXBTdHlsZSIsIkNvbXBvbmVudCIsInByb3BUeXBlcyIsIlByb3BUeXBlcyIsImFycmF5T2YiLCJhbnkiLCJpc1JlcXVpcmVkIiwib2JqZWN0Iiwic3RyaW5nIiwibnVtYmVyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O3FTQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztrQkE4Q3dCQSxnQjs7QUE1Q3hCOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUVBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBRUE7Ozs7QUFVQSxJQUFNQyxt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LENBQVdrRjtBQUZ2QjtBQTlCSjtBQURGO0FBdEJGO0FBREYsU0FERjtBQWlFRDtBQXZLSDtBQUFBO0FBQUEsSUFBK0JDLGdCQUEvQixVQUNTQyxTQURULEdBQ3FCO0FBQ2pCakQsYUFBU2tELG9CQUFVQyxPQUFWLENBQWtCRCxvQkFBVUUsR0FBNUIsRUFBaUNDLFVBRHpCO0FBRWpCaEQsdUJBQW1CNkMsb0JBQVVJLE1BQVYsQ0FBaUJELFVBRm5CO0FBR2pCbkQsbUJBQWVnRCxvQkFBVUssTUFBVixDQUFpQkYsVUFIZjtBQUlqQnBELFlBQVFpRCxvQkFBVUMsT0FBVixDQUFrQkQsb0JBQVVFLEdBQTVCLEVBQWlDQyxVQUp4QjtBQUtqQmxELGtCQUFjK0Msb0JBQVVJLE1BQVYsQ0FBaUJELFVBTGQ7QUFNakJOLGNBQVVHLG9CQUFVSSxNQUFWLENBQWlCRCxVQU5WO0FBT2pCZixXQUFPWSxvQkFBVU0sTUFBVixDQUFpQkgsVUFQUDtBQVFqQnRELGNBQVVtRCxvQkFBVUksTUFBVixDQUFpQkQsVUFSVjtBQVNqQjFFLHFCQUFpQnVFLG9CQUFVSSxNQUFWLENBQWlCRCxVQVRqQjtBQVVqQi9DLHFCQUFpQjRDLG9CQUFVSSxNQUFWLENBQWlCRDtBQVZqQixHQURyQjtBQXlLRCIsImZpbGUiOiJzaWRlLXBhbmVsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSAyMDE4IFViZXIgVGVjaG5vbG9naWVzLCBJbmMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuLy8gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuLy8gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuLy8gdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuLy8gY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4vLyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4vLyBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4vLyBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbi8vIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuLy8gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuLy8gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbi8vIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbi8vIFRIRSBTT0ZUV0FSRS5cblxuaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50fSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHN0eWxlZCBmcm9tICdzdHlsZWQtY29tcG9uZW50cyc7XG5cbmltcG9ydCBTaWRlYmFyIGZyb20gJy4vc2lkZS1wYW5lbC9zaWRlLWJhcic7XG5pbXBvcnQgUGFuZWxIZWFkZXJGYWN0b3J5IGZyb20gJy4vc2lkZS1wYW5lbC9wYW5lbC1oZWFkZXInO1xuaW1wb3J0IExheWVyTWFuYWdlciBmcm9tICcuL3NpZGUtcGFuZWwvbGF5ZXItbWFuYWdlcic7XG5pbXBvcnQgRmlsdGVyTWFuYWdlciBmcm9tICcuL3NpZGUtcGFuZWwvZmlsdGVyLW1hbmFnZXInO1xuaW1wb3J0IEludGVyYWN0aW9uTWFuYWdlciBmcm9tICcuL3NpZGUtcGFuZWwvaW50ZXJhY3Rpb24tbWFuYWdlcic7XG5pbXBvcnQgTWFwTWFuYWdlciBmcm9tICcuL3NpZGUtcGFuZWwvbWFwLW1hbmFnZXInO1xuaW1wb3J0IFBhbmVsVG9nZ2xlIGZyb20gJy4vc2lkZS1wYW5lbC9wYW5lbC10b2dnbGUnO1xuXG5pbXBvcnQge1xuICBBRERfREFUQV9JRCxcbiAgQUREX01BUF9TVFlMRV9JRCxcbiAgREFUQV9UQUJMRV9JRCxcbiAgRVhQT1JUX0lNQUdFX0lELFxuICBFWFBPUlRfREFUQV9JRCxcbiAgRVhQT1JUX0NPTkZJR19JRCxcbiAgUEFORUxTXG59IGZyb20gJ2NvbnN0YW50cy9kZWZhdWx0LXNldHRpbmdzJztcblxuY29uc3QgU2lkZVBhbmVsQ29udGVudCA9IHN0eWxlZC5kaXZgXG4gICR7cHJvcHMgPT4gcHJvcHMudGhlbWUuc2lkZVBhbmVsU2Nyb2xsQmFyfTtcbiAgZmxleC1ncm93OiAxO1xuICBwYWRkaW5nOiAxNnB4O1xuICBvdmVyZmxvdy15OiBzY3JvbGw7XG4gIG92ZXJmbG93LXg6IGhpZGRlbjtcbmA7XG5cbmNvbnN0IFBhbmVsVGl0bGUgPSBzdHlsZWQuZGl2YFxuICBjb2xvcjogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS50aXRsZVRleHRDb2xvcn07XG4gIGZvbnQtc2l6ZTogMjBweDtcbiAgZm9udC13ZWlnaHQ6IDQwMDtcbiAgbGV0dGVyLXNwYWNpbmc6IDEuMjVweDtcbiAgbWFyZ2luLWJvdHRvbTogMTRweDtcbmA7XG5cblNpZGVQYW5lbEZhY3RvcnkuZGVwcyA9IFtQYW5lbEhlYWRlckZhY3RvcnldO1xuXG4vKipcbiAqXG4gKiBWZXJ0aWNhbCBzaWRlYmFyIGNvbnRhaW5pbmcgaW5wdXQgY29tcG9uZW50cyBmb3IgdGhlIHJlbmRlcmluZyBsYXllcnNcbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gU2lkZVBhbmVsRmFjdG9yeShQYW5lbEhlYWRlcikge1xuXG4gIHJldHVybiBjbGFzcyBTaWRlUGFuZWwgZXh0ZW5kcyBDb21wb25lbnQge1xuICAgIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgICBmaWx0ZXJzOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMuYW55KS5pc1JlcXVpcmVkLFxuICAgICAgaW50ZXJhY3Rpb25Db25maWc6IFByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcbiAgICAgIGxheWVyQmxlbmRpbmc6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICAgIGxheWVyczogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLmFueSkuaXNSZXF1aXJlZCxcbiAgICAgIGxheWVyQ2xhc3NlczogUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkLFxuICAgICAgbWFwU3R5bGU6IFByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcbiAgICAgIHdpZHRoOiBQcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXG4gICAgICBkYXRhc2V0czogUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkLFxuICAgICAgdmlzU3RhdGVBY3Rpb25zOiBQcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsXG4gICAgICBtYXBTdHlsZUFjdGlvbnM6IFByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZFxuICAgIH07XG5cbiAgICAvKiBjb21wb25lbnQgcHJpdmF0ZSBmdW5jdGlvbnMgKi9cbiAgICBfb25PcGVuT3JDbG9zZSA9ICgpID0+IHtcbiAgICAgIHRoaXMucHJvcHMudWlTdGF0ZUFjdGlvbnMudG9nZ2xlU2lkZVBhbmVsKFxuICAgICAgICB0aGlzLnByb3BzLnVpU3RhdGUuYWN0aXZlU2lkZVBhbmVsID8gbnVsbCA6ICdsYXllcidcbiAgICAgICk7XG4gICAgfTtcblxuICAgIF9zaG93RGF0YXNldFRhYmxlID0gZGF0YUlkID0+IHtcbiAgICAgIC8vIHRoaXMgd2lsbCBvcGVuIGRhdGEgdGFibGUgbW9kYWxcbiAgICAgIHRoaXMucHJvcHMudmlzU3RhdGVBY3Rpb25zLnNob3dEYXRhc2V0VGFibGUoZGF0YUlkKTtcbiAgICAgIHRoaXMucHJvcHMudWlTdGF0ZUFjdGlvbnMudG9nZ2xlTW9kYWwoREFUQV9UQUJMRV9JRCk7XG4gICAgfTtcblxuICAgIF9zaG93QWRkRGF0YU1vZGFsID0gKCkgPT4ge1xuICAgICAgdGhpcy5wcm9wcy51aVN0YXRlQWN0aW9ucy50b2dnbGVNb2RhbChBRERfREFUQV9JRCk7XG4gICAgfTtcblxuICAgIF9zaG93QWRkTWFwU3R5bGVNb2RhbCA9ICgpID0+IHtcbiAgICAgIHRoaXMucHJvcHMudWlTdGF0ZUFjdGlvbnMudG9nZ2xlTW9kYWwoQUREX01BUF9TVFlMRV9JRCk7XG4gICAgfTtcblxuICAgIF9yZW1vdmVEYXRhc2V0ID0ga2V5ID0+IHtcbiAgICAgIC8vIHRoaXMgd2lsbCBzaG93IHRoZSBtb2RhbCBkaWFsb2cgdG8gY29uZmlybSBkZWxldGlvblxuICAgICAgdGhpcy5wcm9wcy51aVN0YXRlQWN0aW9ucy5vcGVuRGVsZXRlTW9kYWwoa2V5KTtcbiAgICB9O1xuXG4gICAgX29uRXhwb3J0SW1hZ2UgPSAoKSA9PiB0aGlzLnByb3BzLnVpU3RhdGVBY3Rpb25zLnRvZ2dsZU1vZGFsKEVYUE9SVF9JTUFHRV9JRCk7XG5cbiAgICBfb25FeHBvcnREYXRhID0gKCkgPT4gdGhpcy5wcm9wcy51aVN0YXRlQWN0aW9ucy50b2dnbGVNb2RhbChFWFBPUlRfREFUQV9JRCk7XG5cbiAgICBfb25FeHBvcnRDb25maWcgPSAoKSA9PiB0aGlzLnByb3BzLnVpU3RhdGVBY3Rpb25zLnRvZ2dsZU1vZGFsKEVYUE9SVF9DT05GSUdfSUQpO1xuXG4gICAgcmVuZGVyKCkge1xuICAgICAgY29uc3Qge1xuICAgICAgICBhcHBOYW1lLFxuICAgICAgICB2ZXJzaW9uLFxuICAgICAgICBkYXRhc2V0cyxcbiAgICAgICAgZmlsdGVycyxcbiAgICAgICAgbGF5ZXJzLFxuICAgICAgICBsYXllckJsZW5kaW5nLFxuICAgICAgICBsYXllckNsYXNzZXMsXG4gICAgICAgIHVpU3RhdGUsXG4gICAgICAgIGxheWVyT3JkZXIsXG4gICAgICAgIGludGVyYWN0aW9uQ29uZmlnLFxuICAgICAgICB2aXNTdGF0ZUFjdGlvbnMsXG4gICAgICAgIG1hcFN0eWxlQWN0aW9ucyxcbiAgICAgICAgdWlTdGF0ZUFjdGlvbnNcbiAgICAgIH0gPSB0aGlzLnByb3BzO1xuICAgICAgY29uc3Qge2FjdGl2ZVNpZGVQYW5lbH0gPSB1aVN0YXRlO1xuICAgICAgY29uc3QgaXNPcGVuID0gQm9vbGVhbihhY3RpdmVTaWRlUGFuZWwpO1xuXG4gICAgICBjb25zdCBsYXllck1hbmFnZXJBY3Rpb25zID0ge1xuICAgICAgICBhZGRMYXllcjogdmlzU3RhdGVBY3Rpb25zLmFkZExheWVyLFxuICAgICAgICBsYXllckNvbmZpZ0NoYW5nZTogdmlzU3RhdGVBY3Rpb25zLmxheWVyQ29uZmlnQ2hhbmdlLFxuICAgICAgICBsYXllclZpc3VhbENoYW5uZWxDb25maWdDaGFuZ2U6XG4gICAgICAgIHZpc1N0YXRlQWN0aW9ucy5sYXllclZpc3VhbENoYW5uZWxDb25maWdDaGFuZ2UsXG4gICAgICAgIGxheWVyVHlwZUNoYW5nZTogdmlzU3RhdGVBY3Rpb25zLmxheWVyVHlwZUNoYW5nZSxcbiAgICAgICAgbGF5ZXJWaXNDb25maWdDaGFuZ2U6IHZpc1N0YXRlQWN0aW9ucy5sYXllclZpc0NvbmZpZ0NoYW5nZSxcbiAgICAgICAgdXBkYXRlTGF5ZXJCbGVuZGluZzogdmlzU3RhdGVBY3Rpb25zLnVwZGF0ZUxheWVyQmxlbmRpbmcsXG4gICAgICAgIHVwZGF0ZUxheWVyT3JkZXI6IHZpc1N0YXRlQWN0aW9ucy5yZW9yZGVyTGF5ZXIsXG4gICAgICAgIHNob3dEYXRhc2V0VGFibGU6IHRoaXMuX3Nob3dEYXRhc2V0VGFibGUsXG4gICAgICAgIHNob3dBZGREYXRhTW9kYWw6IHRoaXMuX3Nob3dBZGREYXRhTW9kYWwsXG4gICAgICAgIHJlbW92ZUxheWVyOiB2aXNTdGF0ZUFjdGlvbnMucmVtb3ZlTGF5ZXIsXG4gICAgICAgIHJlbW92ZURhdGFzZXQ6IHRoaXMuX3JlbW92ZURhdGFzZXRcbiAgICAgIH07XG5cbiAgICAgIGNvbnN0IGZpbHRlck1hbmFnZXJBY3Rpb25zID0ge1xuICAgICAgICBhZGRGaWx0ZXI6IHZpc1N0YXRlQWN0aW9ucy5hZGRGaWx0ZXIsXG4gICAgICAgIHJlbW92ZUZpbHRlcjogdmlzU3RhdGVBY3Rpb25zLnJlbW92ZUZpbHRlcixcbiAgICAgICAgc2V0RmlsdGVyOiB2aXNTdGF0ZUFjdGlvbnMuc2V0RmlsdGVyLFxuICAgICAgICBzaG93RGF0YXNldFRhYmxlOiB0aGlzLl9zaG93RGF0YXNldFRhYmxlLFxuICAgICAgICBzaG93QWRkRGF0YU1vZGFsOiB0aGlzLl9zaG93QWRkRGF0YU1vZGFsLFxuICAgICAgICB0b2dnbGVBbmltYXRpb246IHZpc1N0YXRlQWN0aW9ucy50b2dnbGVBbmltYXRpb24sXG4gICAgICAgIGVubGFyZ2VGaWx0ZXI6IHZpc1N0YXRlQWN0aW9ucy5lbmxhcmdlRmlsdGVyXG4gICAgICB9O1xuXG4gICAgICBjb25zdCBpbnRlcmFjdGlvbk1hbmFnZXJBY3Rpb25zID0ge1xuICAgICAgICBvbkNvbmZpZ0NoYW5nZTogdmlzU3RhdGVBY3Rpb25zLmludGVyYWN0aW9uQ29uZmlnQ2hhbmdlXG4gICAgICB9O1xuXG4gICAgICBjb25zdCBtYXBNYW5hZ2VyQWN0aW9ucyA9IHtcbiAgICAgICAgYWRkTWFwU3R5bGVVcmw6IG1hcFN0eWxlQWN0aW9ucy5hZGRNYXBTdHlsZVVybCxcbiAgICAgICAgb25Db25maWdDaGFuZ2U6IG1hcFN0eWxlQWN0aW9ucy5tYXBDb25maWdDaGFuZ2UsXG4gICAgICAgIG9uU3R5bGVDaGFuZ2U6IG1hcFN0eWxlQWN0aW9ucy5tYXBTdHlsZUNoYW5nZSxcbiAgICAgICAgb25CdWlsZGluZ0NoYW5nZTogbWFwU3R5bGVBY3Rpb25zLm1hcEJ1aWxkaW5nQ2hhbmdlLFxuICAgICAgICBzaG93QWRkTWFwU3R5bGVNb2RhbDogdGhpcy5fc2hvd0FkZE1hcFN0eWxlTW9kYWxcbiAgICAgIH07XG5cbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgPFNpZGViYXJcbiAgICAgICAgICAgIHdpZHRoPXt0aGlzLnByb3BzLndpZHRofVxuICAgICAgICAgICAgaXNPcGVuPXtpc09wZW59XG4gICAgICAgICAgICBtaW5pZmllZFdpZHRoPXswfVxuICAgICAgICAgICAgb25PcGVuT3JDbG9zZT17dGhpcy5fb25PcGVuT3JDbG9zZX1cbiAgICAgICAgICA+XG4gICAgICAgICAgICA8UGFuZWxIZWFkZXJcbiAgICAgICAgICAgICAgYXBwTmFtZT17YXBwTmFtZX1cbiAgICAgICAgICAgICAgdmVyc2lvbj17dmVyc2lvbn1cbiAgICAgICAgICAgICAgb25FeHBvcnRJbWFnZT17dGhpcy5fb25FeHBvcnRJbWFnZX1cbiAgICAgICAgICAgICAgb25FeHBvcnREYXRhPXt0aGlzLl9vbkV4cG9ydERhdGF9XG4gICAgICAgICAgICAgIHZpc2libGVEcm9wZG93bj17dWlTdGF0ZS52aXNpYmxlRHJvcGRvd259XG4gICAgICAgICAgICAgIHNob3dFeHBvcnREcm9wZG93bj17dWlTdGF0ZUFjdGlvbnMuc2hvd0V4cG9ydERyb3Bkb3dufVxuICAgICAgICAgICAgICBoaWRlRXhwb3J0RHJvcGRvd249e3VpU3RhdGVBY3Rpb25zLmhpZGVFeHBvcnREcm9wZG93bn1cbiAgICAgICAgICAgICAgb25FeHBvcnRDb25maWc9e3RoaXMuX29uRXhwb3J0Q29uZmlnfVxuICAgICAgICAgICAgICBvblNhdmVNYXA9e3RoaXMucHJvcHMub25TYXZlTWFwfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDxQYW5lbFRvZ2dsZVxuICAgICAgICAgICAgICBwYW5lbHM9e1BBTkVMU31cbiAgICAgICAgICAgICAgYWN0aXZlUGFuZWw9e2FjdGl2ZVNpZGVQYW5lbH1cbiAgICAgICAgICAgICAgdG9nZ2xlUGFuZWw9e3VpU3RhdGVBY3Rpb25zLnRvZ2dsZVNpZGVQYW5lbH1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8U2lkZVBhbmVsQ29udGVudCBjbGFzc05hbWU9XCJzaWRlLXBhbmVsX19jb250ZW50XCI+XG4gICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgPFBhbmVsVGl0bGUgY2xhc3NOYW1lPVwic2lkZS1wYW5lbF9fY29udGVudF9fdGl0bGVcIj5cbiAgICAgICAgICAgICAgICAgIHsoUEFORUxTLmZpbmQoKHtpZH0pID0+IGlkID09PSBhY3RpdmVTaWRlUGFuZWwpIHx8IHt9KS5sYWJlbH1cbiAgICAgICAgICAgICAgICA8L1BhbmVsVGl0bGU+XG4gICAgICAgICAgICAgICAge2FjdGl2ZVNpZGVQYW5lbCA9PT0gJ2xheWVyJyAmJiAoXG4gICAgICAgICAgICAgICAgICA8TGF5ZXJNYW5hZ2VyXG4gICAgICAgICAgICAgICAgICAgIHsuLi5sYXllck1hbmFnZXJBY3Rpb25zfVxuICAgICAgICAgICAgICAgICAgICBkYXRhc2V0cz17ZGF0YXNldHN9XG4gICAgICAgICAgICAgICAgICAgIGxheWVycz17bGF5ZXJzfVxuICAgICAgICAgICAgICAgICAgICBsYXllckNsYXNzZXM9e2xheWVyQ2xhc3Nlc31cbiAgICAgICAgICAgICAgICAgICAgbGF5ZXJPcmRlcj17bGF5ZXJPcmRlcn1cbiAgICAgICAgICAgICAgICAgICAgbGF5ZXJCbGVuZGluZz17bGF5ZXJCbGVuZGluZ31cbiAgICAgICAgICAgICAgICAgICAgb3Blbk1vZGFsPXt1aVN0YXRlQWN0aW9ucy50b2dnbGVNb2RhbH1cbiAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICB7YWN0aXZlU2lkZVBhbmVsID09PSAnZmlsdGVyJyAmJiAoXG4gICAgICAgICAgICAgICAgICA8RmlsdGVyTWFuYWdlclxuICAgICAgICAgICAgICAgICAgICB7Li4uZmlsdGVyTWFuYWdlckFjdGlvbnN9XG4gICAgICAgICAgICAgICAgICAgIGRhdGFzZXRzPXtkYXRhc2V0c31cbiAgICAgICAgICAgICAgICAgICAgZmlsdGVycz17ZmlsdGVyc31cbiAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICB7YWN0aXZlU2lkZVBhbmVsID09PSAnaW50ZXJhY3Rpb24nICYmIChcbiAgICAgICAgICAgICAgICAgIDxJbnRlcmFjdGlvbk1hbmFnZXJcbiAgICAgICAgICAgICAgICAgICAgey4uLmludGVyYWN0aW9uTWFuYWdlckFjdGlvbnN9XG4gICAgICAgICAgICAgICAgICAgIGRhdGFzZXRzPXtkYXRhc2V0c31cbiAgICAgICAgICAgICAgICAgICAgaW50ZXJhY3Rpb25Db25maWc9e2ludGVyYWN0aW9uQ29uZmlnfVxuICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgIHthY3RpdmVTaWRlUGFuZWwgPT09ICdtYXAnICYmIChcbiAgICAgICAgICAgICAgICAgIDxNYXBNYW5hZ2VyXG4gICAgICAgICAgICAgICAgICAgIHsuLi5tYXBNYW5hZ2VyQWN0aW9uc31cbiAgICAgICAgICAgICAgICAgICAgbWFwU3R5bGU9e3RoaXMucHJvcHMubWFwU3R5bGV9XG4gICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9TaWRlUGFuZWxDb250ZW50PlxuICAgICAgICAgIDwvU2lkZWJhcj5cbiAgICAgICAgPC9kaXY+XG4gICAgICApO1xuICAgIH1cbiAgfTtcbn1cbiJdfQ==