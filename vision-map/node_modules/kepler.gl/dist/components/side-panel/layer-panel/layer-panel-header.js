'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _taggedTemplateLiteral2 = require('babel-runtime/helpers/taggedTemplateLiteral');

var _taggedTemplateLiteral3 = _interopRequireDefault(_taggedTemplateLiteral2);

var _templateObject = (0, _taggedTemplateLiteral3.default)(['\n  .layer__remove-layer {\n    opacity: 0;\n  }\n  :hover {\n    cursor: pointer;\n    background-color: ', ';\n    \n    .layer__drag-handle {\n      opacity: 1;\n    }\n    \n    .layer__remove-layer {\n      opacity: 1;  \n    }\n    \n    .layer__enable-config {\n      color: white\n    }\n  }\n'], ['\n  .layer__remove-layer {\n    opacity: 0;\n  }\n  :hover {\n    cursor: pointer;\n    background-color: ', ';\n    \n    .layer__drag-handle {\n      opacity: 1;\n    }\n    \n    .layer__remove-layer {\n      opacity: 1;  \n    }\n    \n    .layer__enable-config {\n      color: white\n    }\n  }\n']),
    _templateObject2 = (0, _taggedTemplateLiteral3.default)(['\n  display: flex;\n  color: ', ';\n'], ['\n  display: flex;\n  color: ', ';\n']),
    _templateObject3 = (0, _taggedTemplateLiteral3.default)(['\n  display: flex;\n'], ['\n  display: flex;\n']),
    _templateObject4 = (0, _taggedTemplateLiteral3.default)(['\n  margin-left: 12px;\n\n  .layer__title__type {\n    color: ', ';\n    font-size: 10px;\n    line-height: 12px;\n    letter-spacing: 0.37px;\n    text-transform: capitalize;\n  }\n'], ['\n  margin-left: 12px;\n\n  .layer__title__type {\n    color: ', ';\n    font-size: 10px;\n    line-height: 12px;\n    letter-spacing: 0.37px;\n    text-transform: capitalize;\n  }\n']),
    _templateObject5 = (0, _taggedTemplateLiteral3.default)(['\n  display: flex;\n  align-items: center;\n  opacity: 0;\n  \n  :hover {\n    cursor: move;\n    color: ', ';\n  }\n'], ['\n  display: flex;\n  align-items: center;\n  opacity: 0;\n  \n  :hover {\n    cursor: move;\n    color: ', ';\n  }\n']); // Copyright (c) 2018 Uber Technologies, Inc.
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

var _panelHeaderAction = require('../panel-header-action');

var _panelHeaderAction2 = _interopRequireDefault(_panelHeaderAction);

var _icons = require('../../common/icons');

var _styledComponents3 = require('../../common/styled-components');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var propTypes = {
  // required
  id: _propTypes2.default.string.isRequired,
  isDragNDropEnabled: _propTypes2.default.bool,
  isVisible: _propTypes2.default.bool.isRequired,
  label: _propTypes2.default.string.isRequired,
  onToggleVisibility: _propTypes2.default.func.isRequired,

  // optional
  className: _propTypes2.default.string,
  idx: _propTypes2.default.number,
  isConfigActive: _propTypes2.default.bool,
  labelRCGColorValues: _propTypes2.default.array,
  onUpdateLayerLabel: _propTypes2.default.func,
  onRemoveLayer: _propTypes2.default.func
};

var defaultProps = {
  isDragNDropEnabled: true,
  showRemoveLayer: true
};

var StyledLayerPanelHeader = _styledComponents3.StyledPanelHeader.extend(_templateObject, function (props) {
  return props.theme.panelBackgroundHover;
});

var HeaderLabelSection = _styledComponents2.default.div(_templateObject2, function (props) {
  return props.theme.textColor;
});

var HeaderActionSection = _styledComponents2.default.div(_templateObject3);

var LayerTitleSection = _styledComponents2.default.div(_templateObject4, function (props) {
  return props.theme.subtextColor;
});

var DragHandle = _styledComponents2.default.div(_templateObject5, function (props) {
  return props.theme.textColorHl;
});

var LayerPanelHeader = function LayerPanelHeader(_ref) {
  var className = _ref.className,
      idx = _ref.idx,
      isConfigActive = _ref.isConfigActive,
      isDragNDropEnabled = _ref.isDragNDropEnabled,
      isVisible = _ref.isVisible,
      label = _ref.label,
      layerId = _ref.layerId,
      layerType = _ref.layerType,
      labelRCGColorValues = _ref.labelRCGColorValues,
      onToggleVisibility = _ref.onToggleVisibility,
      onUpdateLayerLabel = _ref.onUpdateLayerLabel,
      onToggleEnableConfig = _ref.onToggleEnableConfig,
      onRemoveLayer = _ref.onRemoveLayer,
      showRemoveLayer = _ref.showRemoveLayer;
  return _react2.default.createElement(
    StyledLayerPanelHeader,
    {
      className: (0, _classnames2.default)('layer-panel__header', {
        'sort--handle': !isConfigActive
      }),
      active: isConfigActive,
      labelRCGColorValues: labelRCGColorValues,
      onClick: onToggleEnableConfig
    },
    _react2.default.createElement(
      HeaderLabelSection,
      { className: 'layer-panel__header__content' },
      isDragNDropEnabled && _react2.default.createElement(
        DragHandle,
        { className: 'layer__drag-handle' },
        _react2.default.createElement(_icons.VertDots, { height: '20px' })
      ),
      _react2.default.createElement(_panelHeaderAction2.default, {
        className: 'layer__visibility-toggle',
        id: layerId,
        tooltip: isVisible ? 'hide layer' : 'show layer',
        onClick: onToggleVisibility,
        IconComponent: isVisible ? _icons.EyeSeen : _icons.EyeUnseen,
        active: isVisible,
        flush: true
      }),
      _react2.default.createElement(
        LayerTitleSection,
        { className: 'layer__title' },
        _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(LayerLabelEditor, { label: label, onEdit: onUpdateLayerLabel }),
          _react2.default.createElement(
            'div',
            { className: 'layer__title__type' },
            layerType
          )
        )
      )
    ),
    _react2.default.createElement(
      HeaderActionSection,
      { className: 'layer-panel__header__actions' },
      showRemoveLayer ? _react2.default.createElement(_panelHeaderAction2.default, {
        className: 'layer__remove-layer',
        id: layerId,
        tooltip: 'Remove layer',
        onClick: onRemoveLayer,
        tooltipType: 'error',
        IconComponent: _icons.Trash
      }) : null,
      _react2.default.createElement(_panelHeaderAction2.default, {
        className: 'layer__enable-config',
        id: layerId,
        tooltip: 'Layer settings',
        onClick: onToggleEnableConfig,
        IconComponent: _icons.ArrowDown
      })
    )
  );
};

var LayerLabelEditor = function LayerLabelEditor(_ref2) {
  var label = _ref2.label,
      onEdit = _ref2.onEdit;
  return _react2.default.createElement(_styledComponents3.InlineInput, {
    type: 'text',
    className: 'layer__title__editor',
    value: label,
    onClick: function onClick(e) {
      e.stopPropagation();
    },
    onChange: onEdit,
    id: 'input-layer-label'
  });
};

LayerPanelHeader.propTypes = propTypes;
LayerPanelHeader.defaultProps = defaultProps;

exports.default = LayerPanelHeader;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3NpZGUtcGFuZWwvbGF5ZXItcGFuZWwvbGF5ZXItcGFuZWwtaGVhZGVyLmpzIl0sIm5hbWVzIjpbInByb3BUeXBlcyIsImlkIiwiUHJvcFR5cGVzIiwic3RyaW5nIiwiaXNSZXF1aXJlZCIsImlzRHJhZ05Ecm9wRW5hYmxlZCIsImJvb2wiLCJpc1Zpc2libGUiLCJsYWJlbCIsIm9uVG9nZ2xlVmlzaWJpbGl0eSIsImZ1bmMiLCJjbGFzc05hbWUiLCJpZHgiLCJudW1iZXIiLCJpc0NvbmZpZ0FjdGl2ZSIsImxhYmVsUkNHQ29sb3JWYWx1ZXMiLCJhcnJheSIsIm9uVXBkYXRlTGF5ZXJMYWJlbCIsIm9uUmVtb3ZlTGF5ZXIiLCJkZWZhdWx0UHJvcHMiLCJzaG93UmVtb3ZlTGF5ZXIiLCJTdHlsZWRMYXllclBhbmVsSGVhZGVyIiwiU3R5bGVkUGFuZWxIZWFkZXIiLCJleHRlbmQiLCJwcm9wcyIsInRoZW1lIiwicGFuZWxCYWNrZ3JvdW5kSG92ZXIiLCJIZWFkZXJMYWJlbFNlY3Rpb24iLCJzdHlsZWQiLCJkaXYiLCJ0ZXh0Q29sb3IiLCJIZWFkZXJBY3Rpb25TZWN0aW9uIiwiTGF5ZXJUaXRsZVNlY3Rpb24iLCJzdWJ0ZXh0Q29sb3IiLCJEcmFnSGFuZGxlIiwidGV4dENvbG9ySGwiLCJMYXllclBhbmVsSGVhZGVyIiwibGF5ZXJJZCIsImxheWVyVHlwZSIsIm9uVG9nZ2xlRW5hYmxlQ29uZmlnIiwiRXllU2VlbiIsIkV5ZVVuc2VlbiIsIlRyYXNoIiwiQXJyb3dEb3duIiwiTGF5ZXJMYWJlbEVkaXRvciIsIm9uRWRpdCIsImUiLCJzdG9wUHJvcGFnYXRpb24iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O21UQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7QUFRQTs7OztBQUVBLElBQU1BLFlBQVk7QUFDaEI7QUFDQUMsTUFBSUMsb0JBQVVDLE1BQVYsQ0FBaUJDLFVBRkw7QUFHaEJDLHNCQUFvQkgsb0JBQVVJLElBSGQ7QUFJaEJDLGFBQVdMLG9CQUFVSSxJQUFWLENBQWVGLFVBSlY7QUFLaEJJLFNBQU9OLG9CQUFVQyxNQUFWLENBQWlCQyxVQUxSO0FBTWhCSyxzQkFBb0JQLG9CQUFVUSxJQUFWLENBQWVOLFVBTm5COztBQVFoQjtBQUNBTyxhQUFXVCxvQkFBVUMsTUFUTDtBQVVoQlMsT0FBS1Ysb0JBQVVXLE1BVkM7QUFXaEJDLGtCQUFnQlosb0JBQVVJLElBWFY7QUFZaEJTLHVCQUFxQmIsb0JBQVVjLEtBWmY7QUFhaEJDLHNCQUFvQmYsb0JBQVVRLElBYmQ7QUFjaEJRLGlCQUFlaEIsb0JBQVVRO0FBZFQsQ0FBbEI7O0FBaUJBLElBQU1TLGVBQWU7QUFDbkJkLHNCQUFvQixJQUREO0FBRW5CZSxtQkFBaUI7QUFGRSxDQUFyQjs7QUFLQSxJQUFNQyx5QkFBeUJDLHFDQUFrQkMsTUFBM0Msa0JBTWtCO0FBQUEsU0FBU0MsTUFBTUMsS0FBTixDQUFZQyxvQkFBckI7QUFBQSxDQU5sQixDQUFOOztBQXNCQSxJQUFNQyxxQkFBcUJDLDJCQUFPQyxHQUE1QixtQkFFSztBQUFBLFNBQVNMLE1BQU1DLEtBQU4sQ0FBWUssU0FBckI7QUFBQSxDQUZMLENBQU47O0FBS0EsSUFBTUMsc0JBQXNCSCwyQkFBT0MsR0FBN0Isa0JBQU47O0FBSUEsSUFBTUcsb0JBQW9CSiwyQkFBT0MsR0FBM0IsbUJBSU87QUFBQSxTQUFTTCxNQUFNQyxLQUFOLENBQVlRLFlBQXJCO0FBQUEsQ0FKUCxDQUFOOztBQVlBLElBQU1DLGFBQWFOLDJCQUFPQyxHQUFwQixtQkFPTztBQUFBLFNBQVNMLE1BQU1DLEtBQU4sQ0FBWVUsV0FBckI7QUFBQSxDQVBQLENBQU47O0FBV0EsSUFBTUMsbUJBQW1CLFNBQW5CQSxnQkFBbUI7QUFBQSxNQUN2QnpCLFNBRHVCLFFBQ3ZCQSxTQUR1QjtBQUFBLE1BRXZCQyxHQUZ1QixRQUV2QkEsR0FGdUI7QUFBQSxNQUd2QkUsY0FIdUIsUUFHdkJBLGNBSHVCO0FBQUEsTUFJdkJULGtCQUp1QixRQUl2QkEsa0JBSnVCO0FBQUEsTUFLdkJFLFNBTHVCLFFBS3ZCQSxTQUx1QjtBQUFBLE1BTXZCQyxLQU51QixRQU12QkEsS0FOdUI7QUFBQSxNQU92QjZCLE9BUHVCLFFBT3ZCQSxPQVB1QjtBQUFBLE1BUXZCQyxTQVJ1QixRQVF2QkEsU0FSdUI7QUFBQSxNQVN2QnZCLG1CQVR1QixRQVN2QkEsbUJBVHVCO0FBQUEsTUFVdkJOLGtCQVZ1QixRQVV2QkEsa0JBVnVCO0FBQUEsTUFXdkJRLGtCQVh1QixRQVd2QkEsa0JBWHVCO0FBQUEsTUFZdkJzQixvQkFadUIsUUFZdkJBLG9CQVp1QjtBQUFBLE1BYXZCckIsYUFidUIsUUFhdkJBLGFBYnVCO0FBQUEsTUFjdkJFLGVBZHVCLFFBY3ZCQSxlQWR1QjtBQUFBLFNBZ0J2QjtBQUFDLDBCQUFEO0FBQUE7QUFDRSxpQkFBVywwQkFBVyxxQkFBWCxFQUFrQztBQUMzQyx3QkFBZ0IsQ0FBQ047QUFEMEIsT0FBbEMsQ0FEYjtBQUlFLGNBQVFBLGNBSlY7QUFLRSwyQkFBcUJDLG1CQUx2QjtBQU1FLGVBQVN3QjtBQU5YO0FBUUU7QUFBQyx3QkFBRDtBQUFBLFFBQW9CLFdBQVUsOEJBQTlCO0FBQ0dsQyw0QkFDQztBQUFDLGtCQUFEO0FBQUEsVUFBWSxXQUFVLG9CQUF0QjtBQUNFLHNDQUFDLGVBQUQsSUFBVSxRQUFPLE1BQWpCO0FBREYsT0FGSjtBQU1FLG9DQUFDLDJCQUFEO0FBQ0UsbUJBQVUsMEJBRFo7QUFFRSxZQUFJZ0MsT0FGTjtBQUdFLGlCQUFTOUIsWUFBWSxZQUFaLEdBQTJCLFlBSHRDO0FBSUUsaUJBQVNFLGtCQUpYO0FBS0UsdUJBQWVGLFlBQVlpQyxjQUFaLEdBQXNCQyxnQkFMdkM7QUFNRSxnQkFBUWxDLFNBTlY7QUFPRTtBQVBGLFFBTkY7QUFlRTtBQUFDLHlCQUFEO0FBQUEsVUFBbUIsV0FBVSxjQUE3QjtBQUNFO0FBQUE7QUFBQTtBQUNFLHdDQUFDLGdCQUFELElBQWtCLE9BQU9DLEtBQXpCLEVBQWdDLFFBQVFTLGtCQUF4QyxHQURGO0FBRUU7QUFBQTtBQUFBLGNBQUssV0FBVSxvQkFBZjtBQUFxQ3FCO0FBQXJDO0FBRkY7QUFERjtBQWZGLEtBUkY7QUE4QkU7QUFBQyx5QkFBRDtBQUFBLFFBQXFCLFdBQVUsOEJBQS9CO0FBQ0dsQix3QkFDQyw4QkFBQywyQkFBRDtBQUNFLG1CQUFVLHFCQURaO0FBRUUsWUFBSWlCLE9BRk47QUFHRSxpQkFBUyxjQUhYO0FBSUUsaUJBQVNuQixhQUpYO0FBS0UscUJBQVksT0FMZDtBQU1FLHVCQUFld0I7QUFOakIsUUFERCxHQVNHLElBVk47QUFXRSxvQ0FBQywyQkFBRDtBQUNFLG1CQUFVLHNCQURaO0FBRUUsWUFBSUwsT0FGTjtBQUdFLGlCQUFTLGdCQUhYO0FBSUUsaUJBQVNFLG9CQUpYO0FBS0UsdUJBQWVJO0FBTGpCO0FBWEY7QUE5QkYsR0FoQnVCO0FBQUEsQ0FBekI7O0FBb0VBLElBQU1DLG1CQUFtQixTQUFuQkEsZ0JBQW1CO0FBQUEsTUFBRXBDLEtBQUYsU0FBRUEsS0FBRjtBQUFBLE1BQVNxQyxNQUFULFNBQVNBLE1BQVQ7QUFBQSxTQUN2Qiw4QkFBQyw4QkFBRDtBQUNFLFVBQUssTUFEUDtBQUVFLGVBQVUsc0JBRlo7QUFHRSxXQUFPckMsS0FIVDtBQUlFLGFBQVMsb0JBQUs7QUFDWnNDLFFBQUVDLGVBQUY7QUFDRCxLQU5IO0FBT0UsY0FBVUYsTUFQWjtBQVFFLFFBQUc7QUFSTCxJQUR1QjtBQUFBLENBQXpCOztBQWFBVCxpQkFBaUJwQyxTQUFqQixHQUE2QkEsU0FBN0I7QUFDQW9DLGlCQUFpQmpCLFlBQWpCLEdBQWdDQSxZQUFoQzs7a0JBRWVpQixnQiIsImZpbGUiOiJsYXllci1wYW5lbC1oZWFkZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIDIwMTggVWJlciBUZWNobm9sb2dpZXMsIEluYy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4vLyBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4vLyBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4vLyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4vLyBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbi8vIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbi8vIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1Jcbi8vIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuLy8gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4vLyBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4vLyBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuLy8gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuLy8gVEhFIFNPRlRXQVJFLlxuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCBjbGFzc25hbWVzIGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0IHN0eWxlZCBmcm9tICdzdHlsZWQtY29tcG9uZW50cyc7XG5pbXBvcnQgUGFuZWxIZWFkZXJBY3Rpb24gZnJvbSAnY29tcG9uZW50cy9zaWRlLXBhbmVsL3BhbmVsLWhlYWRlci1hY3Rpb24nO1xuaW1wb3J0IHtcbiAgRXllU2VlbixcbiAgRXllVW5zZWVuLFxuICBWZXJ0RG90cyxcbiAgQXJyb3dEb3duLFxuICBUcmFzaFxufSBmcm9tICdjb21wb25lbnRzL2NvbW1vbi9pY29ucyc7XG5cbmltcG9ydCB7SW5saW5lSW5wdXQsIFN0eWxlZFBhbmVsSGVhZGVyfSBmcm9tICdjb21wb25lbnRzL2NvbW1vbi9zdHlsZWQtY29tcG9uZW50cyc7XG5cbmNvbnN0IHByb3BUeXBlcyA9IHtcbiAgLy8gcmVxdWlyZWRcbiAgaWQ6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgaXNEcmFnTkRyb3BFbmFibGVkOiBQcm9wVHlwZXMuYm9vbCxcbiAgaXNWaXNpYmxlOiBQcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxuICBsYWJlbDogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICBvblRvZ2dsZVZpc2liaWxpdHk6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG5cbiAgLy8gb3B0aW9uYWxcbiAgY2xhc3NOYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxuICBpZHg6IFByb3BUeXBlcy5udW1iZXIsXG4gIGlzQ29uZmlnQWN0aXZlOiBQcm9wVHlwZXMuYm9vbCxcbiAgbGFiZWxSQ0dDb2xvclZhbHVlczogUHJvcFR5cGVzLmFycmF5LFxuICBvblVwZGF0ZUxheWVyTGFiZWw6IFByb3BUeXBlcy5mdW5jLFxuICBvblJlbW92ZUxheWVyOiBQcm9wVHlwZXMuZnVuY1xufTtcblxuY29uc3QgZGVmYXVsdFByb3BzID0ge1xuICBpc0RyYWdORHJvcEVuYWJsZWQ6IHRydWUsXG4gIHNob3dSZW1vdmVMYXllcjogdHJ1ZVxufTtcblxuY29uc3QgU3R5bGVkTGF5ZXJQYW5lbEhlYWRlciA9IFN0eWxlZFBhbmVsSGVhZGVyLmV4dGVuZGBcbiAgLmxheWVyX19yZW1vdmUtbGF5ZXIge1xuICAgIG9wYWNpdHk6IDA7XG4gIH1cbiAgOmhvdmVyIHtcbiAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5wYW5lbEJhY2tncm91bmRIb3Zlcn07XG4gICAgXG4gICAgLmxheWVyX19kcmFnLWhhbmRsZSB7XG4gICAgICBvcGFjaXR5OiAxO1xuICAgIH1cbiAgICBcbiAgICAubGF5ZXJfX3JlbW92ZS1sYXllciB7XG4gICAgICBvcGFjaXR5OiAxOyAgXG4gICAgfVxuICAgIFxuICAgIC5sYXllcl9fZW5hYmxlLWNvbmZpZyB7XG4gICAgICBjb2xvcjogd2hpdGVcbiAgICB9XG4gIH1cbmA7XG5cbmNvbnN0IEhlYWRlckxhYmVsU2VjdGlvbiA9IHN0eWxlZC5kaXZgXG4gIGRpc3BsYXk6IGZsZXg7XG4gIGNvbG9yOiAke3Byb3BzID0+IHByb3BzLnRoZW1lLnRleHRDb2xvcn07XG5gO1xuXG5jb25zdCBIZWFkZXJBY3Rpb25TZWN0aW9uID0gc3R5bGVkLmRpdmBcbiAgZGlzcGxheTogZmxleDtcbmA7XG5cbmNvbnN0IExheWVyVGl0bGVTZWN0aW9uID0gc3R5bGVkLmRpdmBcbiAgbWFyZ2luLWxlZnQ6IDEycHg7XG5cbiAgLmxheWVyX190aXRsZV9fdHlwZSB7XG4gICAgY29sb3I6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUuc3VidGV4dENvbG9yfTtcbiAgICBmb250LXNpemU6IDEwcHg7XG4gICAgbGluZS1oZWlnaHQ6IDEycHg7XG4gICAgbGV0dGVyLXNwYWNpbmc6IDAuMzdweDtcbiAgICB0ZXh0LXRyYW5zZm9ybTogY2FwaXRhbGl6ZTtcbiAgfVxuYDtcblxuY29uc3QgRHJhZ0hhbmRsZSA9IHN0eWxlZC5kaXZgXG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIG9wYWNpdHk6IDA7XG4gIFxuICA6aG92ZXIge1xuICAgIGN1cnNvcjogbW92ZTtcbiAgICBjb2xvcjogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS50ZXh0Q29sb3JIbH07XG4gIH1cbmA7XG5cbmNvbnN0IExheWVyUGFuZWxIZWFkZXIgPSAoe1xuICBjbGFzc05hbWUsXG4gIGlkeCxcbiAgaXNDb25maWdBY3RpdmUsXG4gIGlzRHJhZ05Ecm9wRW5hYmxlZCxcbiAgaXNWaXNpYmxlLFxuICBsYWJlbCxcbiAgbGF5ZXJJZCxcbiAgbGF5ZXJUeXBlLFxuICBsYWJlbFJDR0NvbG9yVmFsdWVzLFxuICBvblRvZ2dsZVZpc2liaWxpdHksXG4gIG9uVXBkYXRlTGF5ZXJMYWJlbCxcbiAgb25Ub2dnbGVFbmFibGVDb25maWcsXG4gIG9uUmVtb3ZlTGF5ZXIsXG4gIHNob3dSZW1vdmVMYXllclxufSkgPT4gKFxuICA8U3R5bGVkTGF5ZXJQYW5lbEhlYWRlclxuICAgIGNsYXNzTmFtZT17Y2xhc3NuYW1lcygnbGF5ZXItcGFuZWxfX2hlYWRlcicsIHtcbiAgICAgICdzb3J0LS1oYW5kbGUnOiAhaXNDb25maWdBY3RpdmVcbiAgICB9KX1cbiAgICBhY3RpdmU9e2lzQ29uZmlnQWN0aXZlfVxuICAgIGxhYmVsUkNHQ29sb3JWYWx1ZXM9e2xhYmVsUkNHQ29sb3JWYWx1ZXN9XG4gICAgb25DbGljaz17b25Ub2dnbGVFbmFibGVDb25maWd9XG4gID5cbiAgICA8SGVhZGVyTGFiZWxTZWN0aW9uIGNsYXNzTmFtZT1cImxheWVyLXBhbmVsX19oZWFkZXJfX2NvbnRlbnRcIj5cbiAgICAgIHtpc0RyYWdORHJvcEVuYWJsZWQgJiYgKFxuICAgICAgICA8RHJhZ0hhbmRsZSBjbGFzc05hbWU9XCJsYXllcl9fZHJhZy1oYW5kbGVcIj5cbiAgICAgICAgICA8VmVydERvdHMgaGVpZ2h0PVwiMjBweFwiIC8+XG4gICAgICAgIDwvRHJhZ0hhbmRsZT5cbiAgICAgICl9XG4gICAgICA8UGFuZWxIZWFkZXJBY3Rpb25cbiAgICAgICAgY2xhc3NOYW1lPVwibGF5ZXJfX3Zpc2liaWxpdHktdG9nZ2xlXCJcbiAgICAgICAgaWQ9e2xheWVySWR9XG4gICAgICAgIHRvb2x0aXA9e2lzVmlzaWJsZSA/ICdoaWRlIGxheWVyJyA6ICdzaG93IGxheWVyJ31cbiAgICAgICAgb25DbGljaz17b25Ub2dnbGVWaXNpYmlsaXR5fVxuICAgICAgICBJY29uQ29tcG9uZW50PXtpc1Zpc2libGUgPyBFeWVTZWVuIDogRXllVW5zZWVufVxuICAgICAgICBhY3RpdmU9e2lzVmlzaWJsZX1cbiAgICAgICAgZmx1c2hcbiAgICAgIC8+XG4gICAgICA8TGF5ZXJUaXRsZVNlY3Rpb24gY2xhc3NOYW1lPVwibGF5ZXJfX3RpdGxlXCI+XG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgPExheWVyTGFiZWxFZGl0b3IgbGFiZWw9e2xhYmVsfSBvbkVkaXQ9e29uVXBkYXRlTGF5ZXJMYWJlbH0gLz5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImxheWVyX190aXRsZV9fdHlwZVwiPntsYXllclR5cGV9PC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9MYXllclRpdGxlU2VjdGlvbj5cbiAgICA8L0hlYWRlckxhYmVsU2VjdGlvbj5cbiAgICA8SGVhZGVyQWN0aW9uU2VjdGlvbiBjbGFzc05hbWU9XCJsYXllci1wYW5lbF9faGVhZGVyX19hY3Rpb25zXCI+XG4gICAgICB7c2hvd1JlbW92ZUxheWVyID8gKFxuICAgICAgICA8UGFuZWxIZWFkZXJBY3Rpb25cbiAgICAgICAgICBjbGFzc05hbWU9XCJsYXllcl9fcmVtb3ZlLWxheWVyXCJcbiAgICAgICAgICBpZD17bGF5ZXJJZH1cbiAgICAgICAgICB0b29sdGlwPXsnUmVtb3ZlIGxheWVyJ31cbiAgICAgICAgICBvbkNsaWNrPXtvblJlbW92ZUxheWVyfVxuICAgICAgICAgIHRvb2x0aXBUeXBlPVwiZXJyb3JcIlxuICAgICAgICAgIEljb25Db21wb25lbnQ9e1RyYXNofVxuICAgICAgICAvPlxuICAgICAgKSA6IG51bGx9XG4gICAgICA8UGFuZWxIZWFkZXJBY3Rpb25cbiAgICAgICAgY2xhc3NOYW1lPVwibGF5ZXJfX2VuYWJsZS1jb25maWdcIlxuICAgICAgICBpZD17bGF5ZXJJZH1cbiAgICAgICAgdG9vbHRpcD17J0xheWVyIHNldHRpbmdzJ31cbiAgICAgICAgb25DbGljaz17b25Ub2dnbGVFbmFibGVDb25maWd9XG4gICAgICAgIEljb25Db21wb25lbnQ9e0Fycm93RG93bn1cbiAgICAgIC8+XG4gICAgPC9IZWFkZXJBY3Rpb25TZWN0aW9uPlxuICA8L1N0eWxlZExheWVyUGFuZWxIZWFkZXI+XG4pO1xuXG5jb25zdCBMYXllckxhYmVsRWRpdG9yID0gKHtsYWJlbCwgb25FZGl0fSkgPT4gKFxuICA8SW5saW5lSW5wdXRcbiAgICB0eXBlPVwidGV4dFwiXG4gICAgY2xhc3NOYW1lPVwibGF5ZXJfX3RpdGxlX19lZGl0b3JcIlxuICAgIHZhbHVlPXtsYWJlbH1cbiAgICBvbkNsaWNrPXtlID0+IHtcbiAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgfX1cbiAgICBvbkNoYW5nZT17b25FZGl0fVxuICAgIGlkPVwiaW5wdXQtbGF5ZXItbGFiZWxcIlxuICAvPlxuKTtcblxuTGF5ZXJQYW5lbEhlYWRlci5wcm9wVHlwZXMgPSBwcm9wVHlwZXM7XG5MYXllclBhbmVsSGVhZGVyLmRlZmF1bHRQcm9wcyA9IGRlZmF1bHRQcm9wcztcblxuZXhwb3J0IGRlZmF1bHQgTGF5ZXJQYW5lbEhlYWRlcjtcbiJdfQ==