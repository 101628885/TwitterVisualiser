'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

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

var _class, _temp2;

var _templateObject = (0, _taggedTemplateLiteral3.default)(['\n  .ui-sortable {\n    display: block;\n    position: relative;\n    overflow: visible;\n    user-select: none;\n\n    :before {\n      content: \' \';\n      display: table;\n    }\n\n    :after {\n      content: \' \';\n      display: table;\n    }\n  }\n\n  .ui-sortable-item.ui-sortable-dragging {\n    position: absolute;\n    z-index: 1688;\n    cursor: move;\n  }\n\n  .ui-sortable-item.ui-sortable-dragging:hover {\n    cursor: move;\n    opacity: 0.5;\n  }\n\n  .ui-sortable-placeholder {\n    display: none;\n  }\n\n  .ui-sortable-placeholder.visible {\n    display: block;\n    opacity: 0;\n    z-index: -1;\n  }\n'], ['\n  .ui-sortable {\n    display: block;\n    position: relative;\n    overflow: visible;\n    user-select: none;\n\n    :before {\n      content: \' \';\n      display: table;\n    }\n\n    :after {\n      content: \' \';\n      display: table;\n    }\n  }\n\n  .ui-sortable-item.ui-sortable-dragging {\n    position: absolute;\n    z-index: 1688;\n    cursor: move;\n  }\n\n  .ui-sortable-item.ui-sortable-dragging:hover {\n    cursor: move;\n    opacity: 0.5;\n  }\n\n  .ui-sortable-placeholder {\n    display: none;\n  }\n\n  .ui-sortable-placeholder.visible {\n    display: block;\n    opacity: 0;\n    z-index: -1;\n  }\n']); // Copyright (c) 2018 Uber Technologies, Inc.
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

var _reactAnythingSortable = require('react-anything-sortable');

var _reactAnythingSortable2 = _interopRequireDefault(_reactAnythingSortable);

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _reselect = require('reselect');

var _layerPanel = require('./layer-panel/layer-panel');

var _layerPanel2 = _interopRequireDefault(_layerPanel);

var _sourceDataCatalog = require('./source-data-catalog');

var _sourceDataCatalog2 = _interopRequireDefault(_sourceDataCatalog);

var _icons = require('../common/icons');

var _itemSelector = require('../common/item-selector/item-selector');

var _itemSelector2 = _interopRequireDefault(_itemSelector);

var _styledComponents3 = require('../common/styled-components');

var _defaultSettings = require('../../constants/default-settings');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var StyledSortable = _styledComponents2.default.div(_templateObject);

var LayerManager = (_temp2 = _class = function (_Component) {
  (0, _inherits3.default)(LayerManager, _Component);

  function LayerManager() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, LayerManager);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = LayerManager.__proto__ || Object.getPrototypeOf(LayerManager)).call.apply(_ref, [this].concat(args))), _this), _this.layerClassSelector = function (props) {
      return props.layerClasses;
    }, _this.layerTypeOptionsSelector = (0, _reselect.createSelector)(_this.layerClassSelector, function (layerClasses) {
      return Object.keys(layerClasses).map(function (key) {
        var layer = new layerClasses[key]();
        return {
          id: key,
          label: layer.name,
          icon: layer.layerIcon
        };
      });
    }), _this._addEmptyNewLayer = function () {
      _this.props.addLayer();
    }, _this._handleSort = function (order) {
      _this.props.updateLayerOrder(order);
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(LayerManager, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          layers = _props.layers,
          datasets = _props.datasets,
          layerOrder = _props.layerOrder,
          openModal = _props.openModal;

      var defaultDataset = Object.keys(datasets)[0];
      var layerTypeOptions = this.layerTypeOptionsSelector(this.props);

      var layerActions = {
        layerConfigChange: this.props.layerConfigChange,
        layerVisualChannelConfigChange: this.props.layerVisualChannelConfigChange,
        layerTypeChange: this.props.layerTypeChange,
        layerVisConfigChange: this.props.layerVisConfigChange,
        removeLayer: this.props.removeLayer
      };

      var panelProps = { datasets: datasets, openModal: openModal, layerTypeOptions: layerTypeOptions };

      return _react2.default.createElement(
        StyledSortable,
        { className: 'layer-manager' },
        _react2.default.createElement(_sourceDataCatalog2.default, {
          datasets: datasets,
          showDatasetTable: this.props.showDatasetTable,
          removeDataset: this.props.removeDataset,
          showDeleteDataset: true
        }),
        _react2.default.createElement(
          _styledComponents3.Button,
          {
            onClick: this.props.showAddDataModal,
            isInactive: !defaultDataset,
            width: '105px',
            secondary: true
          },
          _react2.default.createElement(_icons.Add, { height: '12px' }),
          'Add Data'
        ),
        _react2.default.createElement(_styledComponents3.SidePanelDivider, null),
        _react2.default.createElement(
          _styledComponents3.SidePanelSection,
          null,
          _react2.default.createElement(
            _reactAnythingSortable2.default,
            {
              onSort: this._handleSort,
              direction: 'vertical',
              sortHandle: 'sort--handle',
              dynamic: true
            },
            layerOrder.map(function (idx) {
              return _react2.default.createElement(_layerPanel2.default, (0, _extends3.default)({}, panelProps, layerActions, {
                sortData: idx,
                key: layers[idx].id,
                idx: idx,
                layer: layers[idx]
              }));
            })
          )
        ),
        _react2.default.createElement(
          _styledComponents3.SidePanelSection,
          null,
          defaultDataset ? _react2.default.createElement(
            _styledComponents3.Button,
            { onClick: this._addEmptyNewLayer, width: '105px' },
            _react2.default.createElement(_icons.Add, { height: '12px' }),
            'Add Layer'
          ) : null
        ),
        _react2.default.createElement(LayerBlendingSelector, {
          layerBlending: this.props.layerBlending,
          updateLayerBlending: this.props.updateLayerBlending
        })
      );
    }
  }]);
  return LayerManager;
}(_react.Component), _class.propTypes = {
  addLayer: _propTypes2.default.func.isRequired,
  datasets: _propTypes2.default.object.isRequired,
  layerBlending: _propTypes2.default.string.isRequired,
  layerClasses: _propTypes2.default.object.isRequired,
  layers: _propTypes2.default.arrayOf(_propTypes2.default.any).isRequired,
  layerConfigChange: _propTypes2.default.func.isRequired,
  layerVisualChannelConfigChange: _propTypes2.default.func.isRequired,
  layerTypeChange: _propTypes2.default.func.isRequired,
  layerVisConfigChange: _propTypes2.default.func.isRequired,
  openModal: _propTypes2.default.func.isRequired,
  removeLayer: _propTypes2.default.func.isRequired,
  removeDataset: _propTypes2.default.func.isRequired,
  showDatasetTable: _propTypes2.default.func.isRequired,
  updateLayerBlending: _propTypes2.default.func.isRequired,
  updateLayerOrder: _propTypes2.default.func.isRequired
}, _temp2);
exports.default = LayerManager;


var LayerBlendingSelector = function LayerBlendingSelector(_ref2) {
  var layerBlending = _ref2.layerBlending,
      updateLayerBlending = _ref2.updateLayerBlending;
  return _react2.default.createElement(
    _styledComponents3.SidePanelSection,
    null,
    _react2.default.createElement(
      _styledComponents3.PanelLabel,
      null,
      'Layer Blending'
    ),
    _react2.default.createElement(_itemSelector2.default, {
      selectedItems: layerBlending,
      options: Object.keys(_defaultSettings.LAYER_BLENDINGS),
      multiSelect: false,
      searchable: false,
      onChange: updateLayerBlending
    })
  );
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3NpZGUtcGFuZWwvbGF5ZXItbWFuYWdlci5qcyJdLCJuYW1lcyI6WyJTdHlsZWRTb3J0YWJsZSIsInN0eWxlZCIsImRpdiIsIkxheWVyTWFuYWdlciIsImxheWVyQ2xhc3NTZWxlY3RvciIsInByb3BzIiwibGF5ZXJDbGFzc2VzIiwibGF5ZXJUeXBlT3B0aW9uc1NlbGVjdG9yIiwiT2JqZWN0Iiwia2V5cyIsIm1hcCIsImxheWVyIiwia2V5IiwiaWQiLCJsYWJlbCIsIm5hbWUiLCJpY29uIiwibGF5ZXJJY29uIiwiX2FkZEVtcHR5TmV3TGF5ZXIiLCJhZGRMYXllciIsIl9oYW5kbGVTb3J0IiwidXBkYXRlTGF5ZXJPcmRlciIsIm9yZGVyIiwibGF5ZXJzIiwiZGF0YXNldHMiLCJsYXllck9yZGVyIiwib3Blbk1vZGFsIiwiZGVmYXVsdERhdGFzZXQiLCJsYXllclR5cGVPcHRpb25zIiwibGF5ZXJBY3Rpb25zIiwibGF5ZXJDb25maWdDaGFuZ2UiLCJsYXllclZpc3VhbENoYW5uZWxDb25maWdDaGFuZ2UiLCJsYXllclR5cGVDaGFuZ2UiLCJsYXllclZpc0NvbmZpZ0NoYW5nZSIsInJlbW92ZUxheWVyIiwicGFuZWxQcm9wcyIsInNob3dEYXRhc2V0VGFibGUiLCJyZW1vdmVEYXRhc2V0Iiwic2hvd0FkZERhdGFNb2RhbCIsImlkeCIsImxheWVyQmxlbmRpbmciLCJ1cGRhdGVMYXllckJsZW5kaW5nIiwiQ29tcG9uZW50IiwicHJvcFR5cGVzIiwiUHJvcFR5cGVzIiwiZnVuYyIsImlzUmVxdWlyZWQiLCJvYmplY3QiLCJzdHJpbmciLCJhcnJheU9mIiwiYW55IiwiTGF5ZXJCbGVuZGluZ1NlbGVjdG9yIiwiTEFZRVJfQkxFTkRJTkdTIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7NHlDQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FB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QWVDO0FBZmhCLEM7a0JBREEzQyxZOzs7QUEwR3JCLElBQU1nRCx3QkFBd0IsU0FBeEJBLHFCQUF3QjtBQUFBLE1BQUVYLGFBQUYsU0FBRUEsYUFBRjtBQUFBLE1BQWlCQyxtQkFBakIsU0FBaUJBLG1CQUFqQjtBQUFBLFNBQzVCO0FBQUMsdUNBQUQ7QUFBQTtBQUNFO0FBQUMsbUNBQUQ7QUFBQTtBQUFBO0FBQUEsS0FERjtBQUVFLGtDQUFDLHNCQUFEO0FBQ0UscUJBQWVELGFBRGpCO0FBRUUsZUFBU2hDLE9BQU9DLElBQVAsQ0FBWTJDLGdDQUFaLENBRlg7QUFHRSxtQkFBYSxLQUhmO0FBSUUsa0JBQVksS0FKZDtBQUtFLGdCQUFVWDtBQUxaO0FBRkYsR0FENEI7QUFBQSxDQUE5QiIsImZpbGUiOiJsYXllci1tYW5hZ2VyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSAyMDE4IFViZXIgVGVjaG5vbG9naWVzLCBJbmMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuLy8gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuLy8gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuLy8gdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuLy8gY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4vLyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4vLyBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4vLyBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbi8vIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuLy8gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuLy8gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbi8vIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbi8vIFRIRSBTT0ZUV0FSRS5cblxuaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50fSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IFNvcnRhYmxlIGZyb20gJ3JlYWN0LWFueXRoaW5nLXNvcnRhYmxlJztcbmltcG9ydCBzdHlsZWQgZnJvbSAnc3R5bGVkLWNvbXBvbmVudHMnO1xuaW1wb3J0IHtjcmVhdGVTZWxlY3Rvcn0gZnJvbSAncmVzZWxlY3QnO1xuXG5pbXBvcnQgTGF5ZXJQYW5lbCBmcm9tICcuL2xheWVyLXBhbmVsL2xheWVyLXBhbmVsJztcbmltcG9ydCBTb3VyY2VEYXRhQ2F0YWxvZyBmcm9tICcuL3NvdXJjZS1kYXRhLWNhdGFsb2cnO1xuaW1wb3J0IHtBZGR9IGZyb20gJ2NvbXBvbmVudHMvY29tbW9uL2ljb25zJztcbmltcG9ydCBJdGVtU2VsZWN0b3IgZnJvbSAnY29tcG9uZW50cy9jb21tb24vaXRlbS1zZWxlY3Rvci9pdGVtLXNlbGVjdG9yJztcbmltcG9ydCB7XG4gIFBhbmVsTGFiZWwsXG4gIFNpZGVQYW5lbERpdmlkZXIsXG4gIFNpZGVQYW5lbFNlY3Rpb24sXG4gIEJ1dHRvblxufSBmcm9tICdjb21wb25lbnRzL2NvbW1vbi9zdHlsZWQtY29tcG9uZW50cyc7XG5cbmltcG9ydCB7TEFZRVJfQkxFTkRJTkdTfSBmcm9tICdjb25zdGFudHMvZGVmYXVsdC1zZXR0aW5ncyc7XG5cbmNvbnN0IFN0eWxlZFNvcnRhYmxlID0gc3R5bGVkLmRpdmBcbiAgLnVpLXNvcnRhYmxlIHtcbiAgICBkaXNwbGF5OiBibG9jaztcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgb3ZlcmZsb3c6IHZpc2libGU7XG4gICAgdXNlci1zZWxlY3Q6IG5vbmU7XG5cbiAgICA6YmVmb3JlIHtcbiAgICAgIGNvbnRlbnQ6ICcgJztcbiAgICAgIGRpc3BsYXk6IHRhYmxlO1xuICAgIH1cblxuICAgIDphZnRlciB7XG4gICAgICBjb250ZW50OiAnICc7XG4gICAgICBkaXNwbGF5OiB0YWJsZTtcbiAgICB9XG4gIH1cblxuICAudWktc29ydGFibGUtaXRlbS51aS1zb3J0YWJsZS1kcmFnZ2luZyB7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIHotaW5kZXg6IDE2ODg7XG4gICAgY3Vyc29yOiBtb3ZlO1xuICB9XG5cbiAgLnVpLXNvcnRhYmxlLWl0ZW0udWktc29ydGFibGUtZHJhZ2dpbmc6aG92ZXIge1xuICAgIGN1cnNvcjogbW92ZTtcbiAgICBvcGFjaXR5OiAwLjU7XG4gIH1cblxuICAudWktc29ydGFibGUtcGxhY2Vob2xkZXIge1xuICAgIGRpc3BsYXk6IG5vbmU7XG4gIH1cblxuICAudWktc29ydGFibGUtcGxhY2Vob2xkZXIudmlzaWJsZSB7XG4gICAgZGlzcGxheTogYmxvY2s7XG4gICAgb3BhY2l0eTogMDtcbiAgICB6LWluZGV4OiAtMTtcbiAgfVxuYDtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTGF5ZXJNYW5hZ2VyIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICBhZGRMYXllcjogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICBkYXRhc2V0czogUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkLFxuICAgIGxheWVyQmxlbmRpbmc6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICBsYXllckNsYXNzZXM6IFByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcbiAgICBsYXllcnM6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5hbnkpLmlzUmVxdWlyZWQsXG4gICAgbGF5ZXJDb25maWdDaGFuZ2U6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgbGF5ZXJWaXN1YWxDaGFubmVsQ29uZmlnQ2hhbmdlOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIGxheWVyVHlwZUNoYW5nZTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICBsYXllclZpc0NvbmZpZ0NoYW5nZTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICBvcGVuTW9kYWw6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgcmVtb3ZlTGF5ZXI6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgcmVtb3ZlRGF0YXNldDogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICBzaG93RGF0YXNldFRhYmxlOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIHVwZGF0ZUxheWVyQmxlbmRpbmc6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgdXBkYXRlTGF5ZXJPcmRlcjogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZFxuICB9O1xuXG4gIGxheWVyQ2xhc3NTZWxlY3RvciA9IHByb3BzID0+IHByb3BzLmxheWVyQ2xhc3NlcztcbiAgbGF5ZXJUeXBlT3B0aW9uc1NlbGVjdG9yID0gY3JlYXRlU2VsZWN0b3IoXG4gICAgdGhpcy5sYXllckNsYXNzU2VsZWN0b3IsXG4gICAgbGF5ZXJDbGFzc2VzID0+IE9iamVjdC5rZXlzKGxheWVyQ2xhc3NlcykubWFwKGtleSA9PiB7XG4gICAgICBjb25zdCBsYXllciA9IG5ldyBsYXllckNsYXNzZXNba2V5XSgpO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgaWQ6IGtleSxcbiAgICAgICAgbGFiZWw6IGxheWVyLm5hbWUsXG4gICAgICAgIGljb246IGxheWVyLmxheWVySWNvblxuICAgICAgfTtcbiAgfSkpO1xuXG4gIF9hZGRFbXB0eU5ld0xheWVyID0gKCkgPT4ge1xuICAgIHRoaXMucHJvcHMuYWRkTGF5ZXIoKTtcbiAgfTtcblxuICBfaGFuZGxlU29ydCA9IG9yZGVyID0+IHtcbiAgICB0aGlzLnByb3BzLnVwZGF0ZUxheWVyT3JkZXIob3JkZXIpO1xuICB9O1xuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7bGF5ZXJzLCBkYXRhc2V0cywgbGF5ZXJPcmRlciwgb3Blbk1vZGFsfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgZGVmYXVsdERhdGFzZXQgPSBPYmplY3Qua2V5cyhkYXRhc2V0cylbMF07XG4gICAgY29uc3QgbGF5ZXJUeXBlT3B0aW9ucyA9IHRoaXMubGF5ZXJUeXBlT3B0aW9uc1NlbGVjdG9yKHRoaXMucHJvcHMpO1xuXG4gICAgY29uc3QgbGF5ZXJBY3Rpb25zID0ge1xuICAgICAgbGF5ZXJDb25maWdDaGFuZ2U6IHRoaXMucHJvcHMubGF5ZXJDb25maWdDaGFuZ2UsXG4gICAgICBsYXllclZpc3VhbENoYW5uZWxDb25maWdDaGFuZ2U6IHRoaXMucHJvcHMubGF5ZXJWaXN1YWxDaGFubmVsQ29uZmlnQ2hhbmdlLFxuICAgICAgbGF5ZXJUeXBlQ2hhbmdlOiB0aGlzLnByb3BzLmxheWVyVHlwZUNoYW5nZSxcbiAgICAgIGxheWVyVmlzQ29uZmlnQ2hhbmdlOiB0aGlzLnByb3BzLmxheWVyVmlzQ29uZmlnQ2hhbmdlLFxuICAgICAgcmVtb3ZlTGF5ZXI6IHRoaXMucHJvcHMucmVtb3ZlTGF5ZXJcbiAgICB9O1xuXG4gICAgY29uc3QgcGFuZWxQcm9wcyA9IHtkYXRhc2V0cywgb3Blbk1vZGFsLCBsYXllclR5cGVPcHRpb25zfTtcblxuICAgIHJldHVybiAoXG4gICAgICA8U3R5bGVkU29ydGFibGUgY2xhc3NOYW1lPVwibGF5ZXItbWFuYWdlclwiPlxuICAgICAgICA8U291cmNlRGF0YUNhdGFsb2dcbiAgICAgICAgICBkYXRhc2V0cz17ZGF0YXNldHN9XG4gICAgICAgICAgc2hvd0RhdGFzZXRUYWJsZT17dGhpcy5wcm9wcy5zaG93RGF0YXNldFRhYmxlfVxuICAgICAgICAgIHJlbW92ZURhdGFzZXQ9e3RoaXMucHJvcHMucmVtb3ZlRGF0YXNldH1cbiAgICAgICAgICBzaG93RGVsZXRlRGF0YXNldFxuICAgICAgICAvPlxuICAgICAgICA8QnV0dG9uXG4gICAgICAgICAgb25DbGljaz17dGhpcy5wcm9wcy5zaG93QWRkRGF0YU1vZGFsfVxuICAgICAgICAgIGlzSW5hY3RpdmU9eyFkZWZhdWx0RGF0YXNldH1cbiAgICAgICAgICB3aWR0aD1cIjEwNXB4XCJcbiAgICAgICAgICBzZWNvbmRhcnlcbiAgICAgICAgPlxuICAgICAgICAgIDxBZGQgaGVpZ2h0PVwiMTJweFwiIC8+QWRkIERhdGFcbiAgICAgICAgPC9CdXR0b24+XG4gICAgICAgIDxTaWRlUGFuZWxEaXZpZGVyIC8+XG4gICAgICAgIDxTaWRlUGFuZWxTZWN0aW9uPlxuICAgICAgICAgIDxTb3J0YWJsZVxuICAgICAgICAgICAgb25Tb3J0PXt0aGlzLl9oYW5kbGVTb3J0fVxuICAgICAgICAgICAgZGlyZWN0aW9uPVwidmVydGljYWxcIlxuICAgICAgICAgICAgc29ydEhhbmRsZT1cInNvcnQtLWhhbmRsZVwiXG4gICAgICAgICAgICBkeW5hbWljXG4gICAgICAgICAgPlxuICAgICAgICAgICAge2xheWVyT3JkZXIubWFwKGlkeCA9PiAoXG4gICAgICAgICAgICAgIDxMYXllclBhbmVsXG4gICAgICAgICAgICAgICAgey4uLnBhbmVsUHJvcHN9XG4gICAgICAgICAgICAgICAgey4uLmxheWVyQWN0aW9uc31cbiAgICAgICAgICAgICAgICBzb3J0RGF0YT17aWR4fVxuICAgICAgICAgICAgICAgIGtleT17bGF5ZXJzW2lkeF0uaWR9XG4gICAgICAgICAgICAgICAgaWR4PXtpZHh9XG4gICAgICAgICAgICAgICAgbGF5ZXI9e2xheWVyc1tpZHhdfVxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgKSl9XG4gICAgICAgICAgPC9Tb3J0YWJsZT5cbiAgICAgICAgPC9TaWRlUGFuZWxTZWN0aW9uPlxuICAgICAgICA8U2lkZVBhbmVsU2VjdGlvbj5cbiAgICAgICAgICB7ZGVmYXVsdERhdGFzZXQgPyAoXG4gICAgICAgICAgICA8QnV0dG9uIG9uQ2xpY2s9e3RoaXMuX2FkZEVtcHR5TmV3TGF5ZXJ9IHdpZHRoPVwiMTA1cHhcIj5cbiAgICAgICAgICAgICAgPEFkZCBoZWlnaHQ9XCIxMnB4XCIgLz5BZGQgTGF5ZXJcbiAgICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICAgICkgOiBudWxsfVxuICAgICAgICA8L1NpZGVQYW5lbFNlY3Rpb24+XG4gICAgICAgIDxMYXllckJsZW5kaW5nU2VsZWN0b3JcbiAgICAgICAgICBsYXllckJsZW5kaW5nPXt0aGlzLnByb3BzLmxheWVyQmxlbmRpbmd9XG4gICAgICAgICAgdXBkYXRlTGF5ZXJCbGVuZGluZz17dGhpcy5wcm9wcy51cGRhdGVMYXllckJsZW5kaW5nfVxuICAgICAgICAvPlxuICAgICAgPC9TdHlsZWRTb3J0YWJsZT5cbiAgICApO1xuICB9XG59XG5cbmNvbnN0IExheWVyQmxlbmRpbmdTZWxlY3RvciA9ICh7bGF5ZXJCbGVuZGluZywgdXBkYXRlTGF5ZXJCbGVuZGluZ30pID0+IChcbiAgPFNpZGVQYW5lbFNlY3Rpb24+XG4gICAgPFBhbmVsTGFiZWw+TGF5ZXIgQmxlbmRpbmc8L1BhbmVsTGFiZWw+XG4gICAgPEl0ZW1TZWxlY3RvclxuICAgICAgc2VsZWN0ZWRJdGVtcz17bGF5ZXJCbGVuZGluZ31cbiAgICAgIG9wdGlvbnM9e09iamVjdC5rZXlzKExBWUVSX0JMRU5ESU5HUyl9XG4gICAgICBtdWx0aVNlbGVjdD17ZmFsc2V9XG4gICAgICBzZWFyY2hhYmxlPXtmYWxzZX1cbiAgICAgIG9uQ2hhbmdlPXt1cGRhdGVMYXllckJsZW5kaW5nfVxuICAgIC8+XG4gIDwvU2lkZVBhbmVsU2VjdGlvbj5cbik7XG4iXX0=