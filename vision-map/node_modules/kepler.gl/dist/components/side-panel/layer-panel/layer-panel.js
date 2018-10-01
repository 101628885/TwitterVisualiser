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

var _class, _class2, _temp2;

var _templateObject = (0, _taggedTemplateLiteral3.default)(['\n  font-size: 12px;\n  border-radius: 1px;\n  margin-bottom: 8px;\n\n  &.dragging {\n    cursor: move;\n  }\n'], ['\n  font-size: 12px;\n  border-radius: 1px;\n  margin-bottom: 8px;\n\n  &.dragging {\n    cursor: move;\n  }\n']); // Copyright (c) 2018 Uber Technologies, Inc.
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

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactAnythingSortable = require('react-anything-sortable');

var _layerConfigurator = require('./layer-configurator');

var _layerConfigurator2 = _interopRequireDefault(_layerConfigurator);

var _layerPanelHeader = require('./layer-panel-header');

var _layerPanelHeader2 = _interopRequireDefault(_layerPanelHeader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PanelWrapper = _styledComponents2.default.div(_templateObject);

var LayerPanel = (0, _reactAnythingSortable.sortable)(_class = (_temp2 = _class2 = function (_Component) {
  (0, _inherits3.default)(LayerPanel, _Component);

  function LayerPanel() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, LayerPanel);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = LayerPanel.__proto__ || Object.getPrototypeOf(LayerPanel)).call.apply(_ref, [this].concat(args))), _this), _this.updateLayerConfig = function (newProp) {
      _this.props.layerConfigChange(_this.props.layer, newProp);
    }, _this.updateLayerType = function (newType) {
      _this.props.layerTypeChange(_this.props.layer, newType);
    }, _this.updateLayerVisConfig = function (newVisConfig) {
      _this.props.layerVisConfigChange(_this.props.layer, newVisConfig);
    }, _this.updateLayerVisualChannelConfig = function (newConfig, channel, scaleKey) {
      _this.props.layerVisualChannelConfigChange(_this.props.layer, newConfig, channel, scaleKey);
    }, _this._updateLayerLabel = function (_ref2) {
      var value = _ref2.target.value;

      _this.updateLayerConfig({ label: value });
    }, _this._toggleVisibility = function (e) {
      e.stopPropagation();
      var isVisible = !_this.props.layer.config.isVisible;
      _this.updateLayerConfig({ isVisible: isVisible });
    }, _this._toggleEnableConfig = function (e) {
      e.stopPropagation();
      var isConfigActive = _this.props.layer.config.isConfigActive;

      _this.updateLayerConfig({ isConfigActive: !isConfigActive });
    }, _this._removeLayer = function (e) {
      e.stopPropagation();
      _this.props.removeLayer(_this.props.idx);
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(LayerPanel, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          layer = _props.layer,
          idx = _props.idx,
          datasets = _props.datasets,
          layerTypeOptions = _props.layerTypeOptions;
      var config = layer.config;
      var isConfigActive = config.isConfigActive;


      return _react2.default.createElement(
        PanelWrapper,
        {
          active: isConfigActive,
          className: 'layer-panel ' + this.props.className,
          style: this.props.style,
          onMouseDown: this.props.onMouseDown,
          onTouchStart: this.props.onTouchStart
        },
        _react2.default.createElement(_layerPanelHeader2.default, {
          isConfigActive: isConfigActive,
          id: layer.id,
          idx: idx,
          isVisible: config.isVisible,
          label: config.label,
          labelRCGColorValues: datasets[config.dataId].color,
          layerType: layer.name,
          onToggleEnableConfig: this._toggleEnableConfig,
          onToggleVisibility: this._toggleVisibility,
          onUpdateLayerLabel: this._updateLayerLabel,
          onRemoveLayer: this._removeLayer
        }),
        isConfigActive && _react2.default.createElement(_layerConfigurator2.default, {
          layer: layer,
          datasets: datasets,
          layerTypeOptions: layerTypeOptions,
          openModal: this.props.openModal,
          updateLayerConfig: this.updateLayerConfig,
          updateLayerVisualChannelConfig: this.updateLayerVisualChannelConfig,
          updateLayerType: this.updateLayerType,
          updateLayerVisConfig: this.updateLayerVisConfig
        })
      );
    }
  }]);
  return LayerPanel;
}(_react.Component), _class2.propTypes = {
  layer: _propTypes2.default.object.isRequired,
  datasets: _propTypes2.default.object.isRequired,
  idx: _propTypes2.default.number.isRequired,
  layerConfigChange: _propTypes2.default.func.isRequired,
  layerTypeChange: _propTypes2.default.func.isRequired,
  openModal: _propTypes2.default.func.isRequired,
  removeLayer: _propTypes2.default.func.isRequired,
  onCloseConfig: _propTypes2.default.func,

  layerTypeOptions: _propTypes2.default.arrayOf(_propTypes2.default.any),
  layerVisConfigChange: _propTypes2.default.func,
  layerVisualChannelConfigChange: _propTypes2.default.func
}, _temp2)) || _class;

exports.default = LayerPanel;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3NpZGUtcGFuZWwvbGF5ZXItcGFuZWwvbGF5ZXItcGFuZWwuanMiXSwibmFtZXMiOlsiUGFuZWxXcmFwcGVyIiwic3R5bGVkIiwiZGl2IiwiTGF5ZXJQYW5lbCIsInNvcnRhYmxlIiwidXBkYXRlTGF5ZXJDb25maWciLCJwcm9wcyIsImxheWVyQ29uZmlnQ2hhbmdlIiwibGF5ZXIiLCJuZXdQcm9wIiwidXBkYXRlTGF5ZXJUeXBlIiwibGF5ZXJUeXBlQ2hhbmdlIiwibmV3VHlwZSIsInVwZGF0ZUxheWVyVmlzQ29uZmlnIiwibGF5ZXJWaXNDb25maWdDaGFuZ2UiLCJuZXdWaXNDb25maWciLCJ1cGRhdGVMYXllclZpc3VhbENoYW5uZWxDb25maWciLCJuZXdDb25maWciLCJjaGFubmVsIiwic2NhbGVLZXkiLCJsYXllclZpc3VhbENoYW5uZWxDb25maWdDaGFuZ2UiLCJfdXBkYXRlTGF5ZXJMYWJlbCIsInZhbHVlIiwidGFyZ2V0IiwibGFiZWwiLCJfdG9nZ2xlVmlzaWJpbGl0eSIsImUiLCJzdG9wUHJvcGFnYXRpb24iLCJpc1Zpc2libGUiLCJjb25maWciLCJfdG9nZ2xlRW5hYmxlQ29uZmlnIiwiaXNDb25maWdBY3RpdmUiLCJfcmVtb3ZlTGF5ZXIiLCJyZW1vdmVMYXllciIsImlkeCIsImRhdGFzZXRzIiwibGF5ZXJUeXBlT3B0aW9ucyIsImNsYXNzTmFtZSIsInN0eWxlIiwib25Nb3VzZURvd24iLCJvblRvdWNoU3RhcnQiLCJpZCIsImRhdGFJZCIsImNvbG9yIiwibmFtZSIsIm9wZW5Nb2RhbCIsIkNvbXBvbmVudCIsInByb3BUeXBlcyIsIlByb3BUeXBlcyIsIm9iamVjdCIsImlzUmVxdWlyZWQiLCJudW1iZXIiLCJmdW5jIiwib25DbG9zZUNvbmZpZyIsImFycmF5T2YiLCJhbnkiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O29TQUFBO0FBQ0E7QUFDQTtBQUNBO0FB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QU1vQyxJQVBuQjtBQVFFLGdDQUFzQixLQUFLZCxtQkFSN0I7QUFTRSw4QkFBb0IsS0FBS0wsaUJBVDNCO0FBVUUsOEJBQW9CLEtBQUtKLGlCQVYzQjtBQVdFLHlCQUFlLEtBQUtXO0FBWHRCLFVBUEY7QUFvQkdELDBCQUNDLDhCQUFDLDJCQUFEO0FBQ0UsaUJBQU92QixLQURUO0FBRUUsb0JBQVUyQixRQUZaO0FBR0UsNEJBQWtCQyxnQkFIcEI7QUFJRSxxQkFBVyxLQUFLOUIsS0FBTCxDQUFXdUMsU0FKeEI7QUFLRSw2QkFBbUIsS0FBS3hDLGlCQUwxQjtBQU1FLDBDQUFnQyxLQUFLVyw4QkFOdkM7QUFPRSwyQkFBaUIsS0FBS04sZUFQeEI7QUFRRSxnQ0FBc0IsS0FBS0c7QUFSN0I7QUFyQkosT0FERjtBQW1DRDs7O0VBakdxQ2lDLGdCLFdBQy9CQyxTLEdBQVk7QUFDakJ2QyxTQUFPd0Msb0JBQVVDLE1BQVYsQ0FBaUJDLFVBRFA7QUFFakJmLFlBQVVhLG9CQUFVQyxNQUFWLENBQWlCQyxVQUZWO0FBR2pCaEIsT0FBS2Msb0JBQVVHLE1BQVYsQ0FBaUJELFVBSEw7QUFJakIzQyxxQkFBbUJ5QyxvQkFBVUksSUFBVixDQUFlRixVQUpqQjtBQUtqQnZDLG1CQUFpQnFDLG9CQUFVSSxJQUFWLENBQWVGLFVBTGY7QUFNakJMLGFBQVdHLG9CQUFVSSxJQUFWLENBQWVGLFVBTlQ7QUFPakJqQixlQUFhZSxvQkFBVUksSUFBVixDQUFlRixVQVBYO0FBUWpCRyxpQkFBZUwsb0JBQVVJLElBUlI7O0FBVWpCaEIsb0JBQWtCWSxvQkFBVU0sT0FBVixDQUFrQk4sb0JBQVVPLEdBQTVCLENBVkQ7QUFXakJ6Qyx3QkFBc0JrQyxvQkFBVUksSUFYZjtBQVlqQmhDLGtDQUFnQzRCLG9CQUFVSTtBQVp6QixDOztrQkFEQWpELFUiLCJmaWxlIjoibGF5ZXItcGFuZWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIDIwMTggVWJlciBUZWNobm9sb2dpZXMsIEluYy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4vLyBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4vLyBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4vLyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4vLyBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbi8vIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbi8vIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1Jcbi8vIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuLy8gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4vLyBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4vLyBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuLy8gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuLy8gVEhFIFNPRlRXQVJFLlxuXG5pbXBvcnQgUmVhY3QsIHtDb21wb25lbnR9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBzdHlsZWQgZnJvbSAnc3R5bGVkLWNvbXBvbmVudHMnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCB7c29ydGFibGV9IGZyb20gJ3JlYWN0LWFueXRoaW5nLXNvcnRhYmxlJztcblxuaW1wb3J0IExheWVyQ29uZmlndXJhdG9yIGZyb20gJy4vbGF5ZXItY29uZmlndXJhdG9yJztcbmltcG9ydCBMYXllclBhbmVsSGVhZGVyIGZyb20gJy4vbGF5ZXItcGFuZWwtaGVhZGVyJztcblxuY29uc3QgUGFuZWxXcmFwcGVyID0gc3R5bGVkLmRpdmBcbiAgZm9udC1zaXplOiAxMnB4O1xuICBib3JkZXItcmFkaXVzOiAxcHg7XG4gIG1hcmdpbi1ib3R0b206IDhweDtcblxuICAmLmRyYWdnaW5nIHtcbiAgICBjdXJzb3I6IG1vdmU7XG4gIH1cbmA7XG5cbkBzb3J0YWJsZVxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTGF5ZXJQYW5lbCBleHRlbmRzIENvbXBvbmVudCB7XG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgbGF5ZXI6IFByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcbiAgICBkYXRhc2V0czogUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkLFxuICAgIGlkeDogUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxuICAgIGxheWVyQ29uZmlnQ2hhbmdlOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIGxheWVyVHlwZUNoYW5nZTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICBvcGVuTW9kYWw6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgcmVtb3ZlTGF5ZXI6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgb25DbG9zZUNvbmZpZzogUHJvcFR5cGVzLmZ1bmMsXG5cbiAgICBsYXllclR5cGVPcHRpb25zOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMuYW55KSxcbiAgICBsYXllclZpc0NvbmZpZ0NoYW5nZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgbGF5ZXJWaXN1YWxDaGFubmVsQ29uZmlnQ2hhbmdlOiBQcm9wVHlwZXMuZnVuY1xuICB9O1xuXG4gIHVwZGF0ZUxheWVyQ29uZmlnID0gbmV3UHJvcCA9PiB7XG4gICAgdGhpcy5wcm9wcy5sYXllckNvbmZpZ0NoYW5nZSh0aGlzLnByb3BzLmxheWVyLCBuZXdQcm9wKTtcbiAgfTtcblxuICB1cGRhdGVMYXllclR5cGUgPSBuZXdUeXBlID0+IHtcbiAgICB0aGlzLnByb3BzLmxheWVyVHlwZUNoYW5nZSh0aGlzLnByb3BzLmxheWVyLCBuZXdUeXBlKTtcbiAgfTtcblxuICB1cGRhdGVMYXllclZpc0NvbmZpZyA9IG5ld1Zpc0NvbmZpZyA9PiB7XG4gICAgdGhpcy5wcm9wcy5sYXllclZpc0NvbmZpZ0NoYW5nZSh0aGlzLnByb3BzLmxheWVyLCBuZXdWaXNDb25maWcpO1xuICB9O1xuXG4gIHVwZGF0ZUxheWVyVmlzdWFsQ2hhbm5lbENvbmZpZyA9IChuZXdDb25maWcsIGNoYW5uZWwsIHNjYWxlS2V5KSA9PiB7XG4gICAgdGhpcy5wcm9wcy5sYXllclZpc3VhbENoYW5uZWxDb25maWdDaGFuZ2UoXG4gICAgICB0aGlzLnByb3BzLmxheWVyLFxuICAgICAgbmV3Q29uZmlnLFxuICAgICAgY2hhbm5lbCxcbiAgICAgIHNjYWxlS2V5XG4gICAgKTtcbiAgfTtcblxuICBfdXBkYXRlTGF5ZXJMYWJlbCA9ICh7dGFyZ2V0OiB7dmFsdWV9fSkgPT4ge1xuICAgIHRoaXMudXBkYXRlTGF5ZXJDb25maWcoe2xhYmVsOiB2YWx1ZX0pO1xuICB9O1xuXG4gIF90b2dnbGVWaXNpYmlsaXR5ID0gZSA9PiB7XG4gICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICBjb25zdCBpc1Zpc2libGUgPSAhdGhpcy5wcm9wcy5sYXllci5jb25maWcuaXNWaXNpYmxlO1xuICAgIHRoaXMudXBkYXRlTGF5ZXJDb25maWcoe2lzVmlzaWJsZX0pO1xuICB9O1xuXG4gIF90b2dnbGVFbmFibGVDb25maWcgPSBlID0+IHtcbiAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIGNvbnN0IHtsYXllcjoge2NvbmZpZzoge2lzQ29uZmlnQWN0aXZlfX19ID0gdGhpcy5wcm9wcztcbiAgICB0aGlzLnVwZGF0ZUxheWVyQ29uZmlnKHtpc0NvbmZpZ0FjdGl2ZTogIWlzQ29uZmlnQWN0aXZlfSk7XG4gIH07XG5cbiAgX3JlbW92ZUxheWVyID0gZSA9PiB7XG4gICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB0aGlzLnByb3BzLnJlbW92ZUxheWVyKHRoaXMucHJvcHMuaWR4KTtcbiAgfTtcbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHtsYXllciwgaWR4LCBkYXRhc2V0cywgbGF5ZXJUeXBlT3B0aW9uc30gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHtjb25maWd9ID0gbGF5ZXI7XG4gICAgY29uc3Qge2lzQ29uZmlnQWN0aXZlfSA9IGNvbmZpZztcblxuICAgIHJldHVybiAoXG4gICAgICA8UGFuZWxXcmFwcGVyXG4gICAgICAgIGFjdGl2ZT17aXNDb25maWdBY3RpdmV9XG4gICAgICAgIGNsYXNzTmFtZT17YGxheWVyLXBhbmVsICR7dGhpcy5wcm9wcy5jbGFzc05hbWV9YH1cbiAgICAgICAgc3R5bGU9e3RoaXMucHJvcHMuc3R5bGV9XG4gICAgICAgIG9uTW91c2VEb3duPXt0aGlzLnByb3BzLm9uTW91c2VEb3dufVxuICAgICAgICBvblRvdWNoU3RhcnQ9e3RoaXMucHJvcHMub25Ub3VjaFN0YXJ0fVxuICAgICAgPlxuICAgICAgICA8TGF5ZXJQYW5lbEhlYWRlclxuICAgICAgICAgIGlzQ29uZmlnQWN0aXZlPXtpc0NvbmZpZ0FjdGl2ZX1cbiAgICAgICAgICBpZD17bGF5ZXIuaWR9XG4gICAgICAgICAgaWR4PXtpZHh9XG4gICAgICAgICAgaXNWaXNpYmxlPXtjb25maWcuaXNWaXNpYmxlfVxuICAgICAgICAgIGxhYmVsPXtjb25maWcubGFiZWx9XG4gICAgICAgICAgbGFiZWxSQ0dDb2xvclZhbHVlcz17ZGF0YXNldHNbY29uZmlnLmRhdGFJZF0uY29sb3J9XG4gICAgICAgICAgbGF5ZXJUeXBlPXtsYXllci5uYW1lfVxuICAgICAgICAgIG9uVG9nZ2xlRW5hYmxlQ29uZmlnPXt0aGlzLl90b2dnbGVFbmFibGVDb25maWd9XG4gICAgICAgICAgb25Ub2dnbGVWaXNpYmlsaXR5PXt0aGlzLl90b2dnbGVWaXNpYmlsaXR5fVxuICAgICAgICAgIG9uVXBkYXRlTGF5ZXJMYWJlbD17dGhpcy5fdXBkYXRlTGF5ZXJMYWJlbH1cbiAgICAgICAgICBvblJlbW92ZUxheWVyPXt0aGlzLl9yZW1vdmVMYXllcn1cbiAgICAgICAgLz5cbiAgICAgICAge2lzQ29uZmlnQWN0aXZlICYmIChcbiAgICAgICAgICA8TGF5ZXJDb25maWd1cmF0b3JcbiAgICAgICAgICAgIGxheWVyPXtsYXllcn1cbiAgICAgICAgICAgIGRhdGFzZXRzPXtkYXRhc2V0c31cbiAgICAgICAgICAgIGxheWVyVHlwZU9wdGlvbnM9e2xheWVyVHlwZU9wdGlvbnN9XG4gICAgICAgICAgICBvcGVuTW9kYWw9e3RoaXMucHJvcHMub3Blbk1vZGFsfVxuICAgICAgICAgICAgdXBkYXRlTGF5ZXJDb25maWc9e3RoaXMudXBkYXRlTGF5ZXJDb25maWd9XG4gICAgICAgICAgICB1cGRhdGVMYXllclZpc3VhbENoYW5uZWxDb25maWc9e3RoaXMudXBkYXRlTGF5ZXJWaXN1YWxDaGFubmVsQ29uZmlnfVxuICAgICAgICAgICAgdXBkYXRlTGF5ZXJUeXBlPXt0aGlzLnVwZGF0ZUxheWVyVHlwZX1cbiAgICAgICAgICAgIHVwZGF0ZUxheWVyVmlzQ29uZmlnPXt0aGlzLnVwZGF0ZUxheWVyVmlzQ29uZmlnfVxuICAgICAgICAgIC8+XG4gICAgICAgICl9XG4gICAgICA8L1BhbmVsV3JhcHBlcj5cbiAgICApO1xuICB9XG59XG4iXX0=