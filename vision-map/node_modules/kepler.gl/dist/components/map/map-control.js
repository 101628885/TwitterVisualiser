'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MapControl = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _taggedTemplateLiteral2 = require('babel-runtime/helpers/taggedTemplateLiteral');

var _taggedTemplateLiteral3 = _interopRequireDefault(_taggedTemplateLiteral2);

var _class, _temp2;

var _templateObject = (0, _taggedTemplateLiteral3.default)(['\n  right: 0;\n  width: ', 'px;\n  padding: ', 'px;\n  z-index: 1;\n  top: ', 'px;\n  position: absolute;\n'], ['\n  right: 0;\n  width: ', 'px;\n  padding: ', 'px;\n  z-index: 1;\n  top: ', 'px;\n  position: absolute;\n']),
    _templateObject2 = (0, _taggedTemplateLiteral3.default)(['\n  padding: 4px 0;\n  display: flex;\n  justify-content: flex-end;\n'], ['\n  padding: 4px 0;\n  display: flex;\n  justify-content: flex-end;\n']),
    _templateObject3 = (0, _taggedTemplateLiteral3.default)(['\n  align-items: center;\n  background-color: ', ';\n  border-radius: 18px;\n  border: 0;\n  box-shadow: 0 6px 12px 0 rgba(0, 0, 0, 0.16);\n  color: ', ';\n  cursor: pointer;\n  display: flex;\n  height: 36px;\n  justify-content: center;\n  margin: 0;\n  outline: none;\n  padding: 0;\n  transition: ', ';\n  width: 36px;\n\n  :focus {\n    outline: none;\n  }\n\n  :hover {\n    cursor: pointer;\n    background-color: ', ';\n    color: ', ';\n  }\n'], ['\n  align-items: center;\n  background-color: ', ';\n  border-radius: 18px;\n  border: 0;\n  box-shadow: 0 6px 12px 0 rgba(0, 0, 0, 0.16);\n  color: ', ';\n  cursor: pointer;\n  display: flex;\n  height: 36px;\n  justify-content: center;\n  margin: 0;\n  outline: none;\n  padding: 0;\n  transition: ', ';\n  width: 36px;\n\n  :focus {\n    outline: none;\n  }\n\n  :hover {\n    cursor: pointer;\n    background-color: ', ';\n    color: ', ';\n  }\n']),
    _templateObject4 = (0, _taggedTemplateLiteral3.default)(['\n  background-color: ', ';\n  flex-grow: 1;\n  z-index: 1;\n  p {\n    margin-bottom: 0;\n  }\n'], ['\n  background-color: ', ';\n  flex-grow: 1;\n  z-index: 1;\n  p {\n    margin-bottom: 0;\n  }\n']),
    _templateObject5 = (0, _taggedTemplateLiteral3.default)(['\n  ', ' max-height: 500px;\n  min-height: 100px;\n  overflow: auto;\n'], ['\n  ', ' max-height: 500px;\n  min-height: 100px;\n  overflow: auto;\n']),
    _templateObject6 = (0, _taggedTemplateLiteral3.default)(['\n  display: flex;\n  justify-content: space-between;\n  background-color: ', ';\n  height: 32px;\n  padding: 6px 12px;\n  font-size: 11px;\n  color: ', ';\n\n  button {\n    width: 18px;\n    height: 18px;\n  }\n'], ['\n  display: flex;\n  justify-content: space-between;\n  background-color: ', ';\n  height: 32px;\n  padding: 6px 12px;\n  font-size: 11px;\n  color: ', ';\n\n  button {\n    width: 18px;\n    height: 18px;\n  }\n']); // Copyright (c) 2018 Uber Technologies, Inc.
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

var _styledComponents3 = require('../common/styled-components');

var _mapLayerSelector = require('../common/map-layer-selector');

var _mapLayerSelector2 = _interopRequireDefault(_mapLayerSelector);

var _logo = require('../common/logo');

var _logo2 = _interopRequireDefault(_logo);

var _mapLegend = require('./map-legend');

var _mapLegend2 = _interopRequireDefault(_mapLegend);

var _icons = require('../common/icons');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var StyledMapControl = _styledComponents2.default.div(_templateObject, function (props) {
  return props.theme.mapControl.width;
}, function (props) {
  return props.theme.mapControl.padding;
}, function (props) {
  return props.top;
});

var StyledMapControlAction = _styledComponents2.default.div(_templateObject2);

var StyledMapControlButton = _styledComponents2.default.div(_templateObject3, function (props) {
  return props.active ? props.theme.secondaryBtnActBgd : props.theme.secondaryBtnBgd;
}, function (props) {
  return props.active ? props.theme.secondaryBtnActColor : props.theme.secondaryBtnColor;
}, function (props) {
  return props.theme.transition;
}, function (props) {
  return props.theme.secondaryBtnActBgd;
}, function (props) {
  return props.theme.secondaryBtnActColor;
});

var StyledMapControlPanel = _styledComponents2.default.div(_templateObject4, function (props) {
  return props.theme.mapPanelBackgroundColor;
});

var StyledMapControlPanelContent = _styledComponents2.default.div(_templateObject5, function (props) {
  return props.theme.dropdownScrollBar;
});

var StyledMapControlPanelHeader = _styledComponents2.default.div(_templateObject6, function (props) {
  return props.theme.mapPanelHeaderBackgroundColor;
}, function (props) {
  return props.theme.secondaryBtnColor;
});

/**
 * Generates all layers available for the current map
 * TODO: this may be moved into map-container or map-control or even at the reducer level
 * @param layers
 * @param mapLayers
 * @returns {[id, label, isVisible]}
 */
var layerSelector = function layerSelector(layers, mapLayers) {
  var availableItems = Object.keys(layers).reduce(function (availableLayers, currentLayerId) {
    // is available ? if yes add to available list
    var currentLayer = layers[currentLayerId];
    // if maplayers exists we need to make sure currentlayer
    // is contained in mapLayers in order to add onto availableLayers
    // otherwise we add all layers

    var layerConfig = mapLayers ? mapLayers[currentLayer.id] : currentLayer.config;

    var mustBeAdded = mapLayers && mapLayers[currentLayer.id] ? mapLayers[currentLayer.id].isAvailable : layerConfig.isVisible;

    return mustBeAdded ? [].concat((0, _toConsumableArray3.default)(availableLayers), [{
      id: currentLayer.id,
      name: currentLayer.config.label,
      isVisible: mapLayers && mapLayers[currentLayer.id] ? mapLayers[currentLayer.id].isVisible : layerConfig.isVisible,
      layer: currentLayer
    }]) : availableLayers;
  }, []);

  return availableItems;
};

var MapControl = exports.MapControl = (_temp2 = _class = function (_Component) {
  (0, _inherits3.default)(MapControl, _Component);

  function MapControl() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, MapControl);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = MapControl.__proto__ || Object.getPrototypeOf(MapControl)).call.apply(_ref, [this].concat(args))), _this), _this.layerSelector = function (state) {
      return state.layers;
    }, _this.mapLayersSelector = function (state) {
      return state.mapLayers;
    }, _this.initialDataSelector = (0, _reselect.createSelector)(_this.layerSelector, _this.mapLayersSelector, layerSelector), _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(MapControl, [{
    key: 'render',
    value: function render() {
      var items = this.initialDataSelector(this.props);

      if (!items) {
        return null;
      }

      var _props = this.props,
          dragRotate = _props.dragRotate,
          isSplit = _props.isSplit,
          isExport = _props.isExport,
          mapIndex = _props.mapIndex,
          mapControls = _props.mapControls,
          onTogglePerspective = _props.onTogglePerspective,
          onToggleSplitMap = _props.onToggleSplitMap,
          onMapToggleLayer = _props.onMapToggleLayer,
          onToggleMapControl = _props.onToggleMapControl,
          scale = _props.scale;
      var _mapControls$visibleL = mapControls.visibleLayers,
          visibleLayers = _mapControls$visibleL === undefined ? {} : _mapControls$visibleL,
          _mapControls$mapLegen = mapControls.mapLegend,
          mapLegend = _mapControls$mapLegen === undefined ? {} : _mapControls$mapLegen,
          _mapControls$toggle3d = mapControls.toggle3d,
          toggle3d = _mapControls$toggle3d === undefined ? {} : _mapControls$toggle3d,
          _mapControls$splitMap = mapControls.splitMap,
          splitMap = _mapControls$splitMap === undefined ? {} : _mapControls$splitMap;


      return _react2.default.createElement(
        StyledMapControl,
        { className: 'map-control' },
        splitMap.show ? _react2.default.createElement(
          ActionPanel,
          { key: 0 },
          _react2.default.createElement(
            StyledMapControlButton,
            {
              active: isSplit,
              onClick: function onClick(e) {
                e.preventDefault();
                onToggleSplitMap(isSplit ? mapIndex : undefined);
              },
              key: 'split-' + isSplit,
              className: 'map-control-button split-map',
              'data-tip': true,
              'data-for': 'action-toggle'
            },
            isSplit ? _react2.default.createElement(_icons.Delete, { height: '18px' }) : _react2.default.createElement(_icons.Split, { height: '18px' }),
            _react2.default.createElement(MapLegendTooltip, {
              id: 'action-toggle',
              message: isSplit ? 'Close current panel' : 'Switch to dual map view'
            })
          )
        ) : null,
        isSplit && visibleLayers.show ? _react2.default.createElement(
          ActionPanel,
          { key: 1 },
          _react2.default.createElement(LayerSelectorPanel, {
            items: items,
            onMapToggleLayer: onMapToggleLayer,
            isActive: visibleLayers.active,
            toggleMenuPanel: function toggleMenuPanel() {
              return onToggleMapControl('visibleLayers');
            }
          })
        ) : null,
        toggle3d.show ? _react2.default.createElement(
          ActionPanel,
          { key: 2 },
          _react2.default.createElement(
            StyledMapControlButton,
            {
              onClick: function onClick(e) {
                e.preventDefault();
                onTogglePerspective();
              },
              active: dragRotate,
              'data-tip': true,
              'data-for': 'action-3d'
            },
            _react2.default.createElement(_icons.Cube3d, { height: '22px' }),
            _react2.default.createElement(MapLegendTooltip, {
              id: 'action-3d',
              message: dragRotate ? 'Disable 3D Map' : '3D Map'
            })
          )
        ) : null,
        mapLegend.show ? _react2.default.createElement(
          ActionPanel,
          { key: 3 },
          _react2.default.createElement(MapLegendPanel, {
            items: items,
            scale: scale,
            isExport: isExport,
            onMapToggleLayer: onMapToggleLayer,
            isActive: mapLegend.active,
            toggleMenuPanel: function toggleMenuPanel() {
              return onToggleMapControl('mapLegend');
            }
          })
        ) : null
      );
    }
  }]);
  return MapControl;
}(_react.Component), _class.propTypes = {
  datasets: _propTypes2.default.object.isRequired,
  dragRotate: _propTypes2.default.bool.isRequired,
  isSplit: _propTypes2.default.bool.isRequired,
  layers: _propTypes2.default.arrayOf(_propTypes2.default.object),
  mapIndex: _propTypes2.default.number.isRequired,
  mapControls: _propTypes2.default.object.isRequired,
  onToggleFullScreen: _propTypes2.default.func.isRequired,
  onTogglePerspective: _propTypes2.default.func.isRequired,
  onToggleSplitMap: _propTypes2.default.func.isRequired,
  onToggleMapControl: _propTypes2.default.func.isRequired,
  onMapToggleLayer: _propTypes2.default.func.isRequired,
  top: _propTypes2.default.number.isRequired,

  // optional
  scale: _propTypes2.default.number,
  mapLayers: _propTypes2.default.object
}, _class.defaultProps = {
  isSplit: false,
  top: 0
}, _temp2);


var MapControlPanel = function MapControlPanel(_ref2) {
  var children = _ref2.children,
      header = _ref2.header,
      onClick = _ref2.onClick,
      _ref2$scale = _ref2.scale,
      scale = _ref2$scale === undefined ? 1 : _ref2$scale,
      isExport = _ref2.isExport;
  return _react2.default.createElement(
    StyledMapControlPanel,
    {
      style: {
        transform: 'scale(' + scale + ') translate(calc(-' + 25 * (scale - 1) + '% - ' + 10 * scale + 'px), calc(' + 25 * (scale - 1) + '% + ' + 10 * scale + 'px))'
      }
    },
    _react2.default.createElement(
      StyledMapControlPanelHeader,
      { style: { position: 'relative' } },
      isExport ? _react2.default.createElement(_logo2.default, { version: false, appName: 'kepler.gl' }) : _react2.default.createElement(
        'span',
        { style: { verticalAlign: 'middle' } },
        header
      ),
      isExport ? null : _react2.default.createElement(
        _styledComponents3.IconRoundSmall,
        null,
        _react2.default.createElement(_icons.Close, { height: '16px', onClick: onClick })
      )
    ),
    _react2.default.createElement(
      StyledMapControlPanelContent,
      null,
      children
    )
  );
};

var MapLegendPanel = function MapLegendPanel(_ref3) {
  var items = _ref3.items,
      isActive = _ref3.isActive,
      scale = _ref3.scale,
      toggleMenuPanel = _ref3.toggleMenuPanel,
      isExport = _ref3.isExport;
  return !isActive ? _react2.default.createElement(
    StyledMapControlButton,
    {
      key: 2,
      'data-tip': true,
      'data-for': 'show-legend',
      className: 'map-control-button show-legend',
      onClick: function onClick(e) {
        e.preventDefault();
        toggleMenuPanel();
      }
    },
    _react2.default.createElement(_icons.Legend, { height: '22px' }),
    _react2.default.createElement(MapLegendTooltip, { id: 'show-legend', message: 'show legend' })
  ) : _react2.default.createElement(
    MapControlPanel,
    {
      scale: scale,
      header: 'Layer Legend',
      onClick: toggleMenuPanel,
      isExport: isExport
    },
    _react2.default.createElement(_mapLegend2.default, {
      layers: items.filter(function (item) {
        return item.isVisible;
      }).map(function (item) {
        return item.layer;
      })
    })
  );
};

var LayerSelectorPanel = function LayerSelectorPanel(_ref4) {
  var items = _ref4.items,
      onMapToggleLayer = _ref4.onMapToggleLayer,
      isActive = _ref4.isActive,
      toggleMenuPanel = _ref4.toggleMenuPanel;
  return !isActive ? _react2.default.createElement(
    StyledMapControlButton,
    {
      key: 1,
      onClick: function onClick(e) {
        e.preventDefault();
        toggleMenuPanel();
      },
      className: 'map-control-button toggle-layer',
      'data-tip': true,
      'data-for': 'toggle-layer'
    },
    _react2.default.createElement(_icons.Layers, { height: '22px' }),
    _react2.default.createElement(MapLegendTooltip, {
      id: 'toggle-layer',
      message: isActive ? 'Hide layer panel' : 'Show layer panel'
    })
  ) : _react2.default.createElement(
    MapControlPanel,
    { header: 'Visible layers', onClick: toggleMenuPanel },
    _react2.default.createElement(_mapLayerSelector2.default, { layers: items, onMapToggleLayer: onMapToggleLayer })
  );
};

var ActionPanel = function ActionPanel(_ref5) {
  var children = _ref5.children;
  return _react2.default.createElement(
    StyledMapControlAction,
    null,
    children
  );
};

var MapLegendTooltip = function MapLegendTooltip(_ref6) {
  var id = _ref6.id,
      message = _ref6.message;
  return _react2.default.createElement(
    _styledComponents3.Tooltip,
    { id: id, place: 'left', effect: 'solid' },
    _react2.default.createElement(
      'span',
      null,
      message
    )
  );
};

var MapControlFactory = function MapControlFactory() {
  return MapControl;
};

exports.default = MapControlFactory;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL21hcC9tYXAtY29udHJvbC5qcyJdLCJuYW1lcyI6WyJTdHlsZWRNYXBDb250cm9sIiwic3R5bGVkIiwiZGl2IiwicHJvcHMiLCJ0aGVtZSIsIm1hcENvbnRyb2wiLCJ3aWR0aCIsInBhZGRpbmciLCJ0b3AiLCJTdHlsZWRNYXBDb250cm9sQWN0aW9uIiwiU3R5bGVkTWFwQ29udHJvbEJ1dHRvbiIsImFjdGl2ZSIsInNlY29uZGFyeUJ0bkFjdEJnZCIsInNlY29uZGFyeUJ0bkJnZCIsInNlY29uZGFyeUJ0bkFjdENvbG9yIiwic2Vjb25kYXJ5QnRuQ29sb3IiLCJ0cmFuc2l0aW9uIiwiU3R5bGVkTWFwQ29udHJvbFBhbmVsIiwibWFwUGFuZWxCYWNrZ3JvdW5kQ29sb3IiLCJTdHlsZWRNYXBDb250cm9sUGFuZWxDb250ZW50IiwiZHJvcGRvd25TY3JvbGxCYXIiLCJTdHlsZWRNYXBDb250cm9sUGFuZWxIZWFkZXIiLCJtYXBQYW5lbEhlYWRlckJhY2tncm91bmRDb2xvciIsImxheWVyU2VsZWN0b3IiLCJsYXllcnMiLCJtYXBMYXllcnMiLCJhdmFpbGFibGVJdGVtcyIsIk9iamVjdCIsImtleXMiLCJyZWR1Y2UiLCJhdmFpbGFibGVMYXllcnMiLCJjdXJyZW50TGF5ZXJJZCIsImN1cnJlbnRMYXllciIsImxheWVyQ29uZmlnIiwiaWQiLCJjb25maWciLCJtdXN0QmVBZGRlZCIsImlzQXZhaWxhYmxlIiwiaXNWaXNpYmxlIiwibmFtZSIsImxhYmVsIiwibGF5ZXIiLCJNYXBDb250cm9sIiwic3RhdGUiLCJtYXBMYXllcnNTZWxlY3RvciIsImluaXRpYWxEYXRhU2VsZWN0b3IiLCJpdGVtcyIsImRyYWdSb3RhdGUiLCJpc1NwbGl0IiwiaXNFeHBvcnQiLCJtYXBJbmRleCIsIm1hcENvbnRyb2xzIiwib25Ub2dnbGVQZXJzcGVjdGl2ZSIsIm9uVG9nZ2xlU3BsaXRNYXAiLCJvbk1hcFRvZ2dsZUxheWVyIiwib25Ub2dnbGVNYXBDb250cm9sIiwic2NhbGUiLCJ2aXNpYmxlTGF5ZXJzIiwibWFwTGVnZW5kIiwidG9nZ2xlM2QiLCJzcGxpdE1hcCIsInNob3ciLCJlIiwicHJldmVudERlZmF1bHQiLCJ1bmRlZmluZWQiLCJDb21wb25lbnQiLCJwcm9wVHlwZXMiLCJkYXRhc2V0cyIsIlByb3BUeXBlcyIsIm9iamVjdCIsImlzUmVxdWlyZWQiLCJib29sIiwiYXJyYXlPZiIsIm51bWJlciIsIm9uVG9nZ2xlRnVsbFNjcmVlbiIsImZ1bmMiLCJkZWZhdWx0UHJvcHMiLCJNYXBDb250cm9sUGFuZWwiLCJjaGlsZHJlbiIsImhlYWRlciIsIm9uQ2xpY2siLCJ0cmFuc2Zvcm0iLCJwb3NpdGlvbiIsInZlcnRpY2FsQWxpZ24iLCJNYXBMZWdlbmRQYW5lbCIsImlzQWN0aXZlIiwidG9nZ2xlTWVudVBhbmVsIiwiZmlsdGVyIiwiaXRlbSIsIm1hcCIsIkxheWVyU2VsZWN0b3JQYW5lbCIsIkFjdGlvblBhbmVsIiwiTWFwTGVnZW5kVG9vbHRpcCIsIm1lc3NhZ2UiLCJNYXBDb250cm9sRmFjdG9yeSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7bWZBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7QUFDQTs7OztBQUNBOztBQUNBOzs7O0FBRUE7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFTQSxJQUFNQSxtQkFBbUJDLDJCQUFPQyxHQUExQixrQkFFSztBQUFBLFNBQVNDLE1BQU1DLEtBQU4sQ0FBWUMsVUFBWixDQUF1QkMsS0FBaEM7QUFBQSxDQUZMLEVBR087QUFBQSxTQUFTSCxNQUFNQyxLQUFOLENBQVlDLFVBQVosQ0FBdUJFLE9BQWhDO0FBQUEsQ0FIUCxFQUtHO0FBQUEsU0FBU0osTUFBTUssR0FBZjtBQUFBLENBTEgsQ0FB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QU0yRCxPQUFOLFNBQU1BLE9BQU47QUFBQSxTQUN2QjtBQUFDLDhCQUFEO0FBQUEsTUFBUyxJQUFJM0QsRUFBYixFQUFpQixPQUFNLE1BQXZCLEVBQThCLFFBQU8sT0FBckM7QUFDRTtBQUFBO0FBQUE7QUFBTzJEO0FBQVA7QUFERixHQUR1QjtBQUFBLENBQXpCOztBQU1BLElBQU1DLG9CQUFvQixTQUFwQkEsaUJBQW9CO0FBQUEsU0FBTXBELFVBQU47QUFBQSxDQUExQjs7a0JBRWVvRCxpQiIsImZpbGUiOiJtYXAtY29udHJvbC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgMjAxOCBVYmVyIFRlY2hub2xvZ2llcywgSW5jLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbi8vIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbi8vIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbi8vIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbi8vIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuLy8gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuLy8gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4vLyBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbi8vIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbi8vIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4vLyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4vLyBUSEUgU09GVFdBUkUuXG5cbmltcG9ydCBSZWFjdCwge0NvbXBvbmVudH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCB7Y3JlYXRlU2VsZWN0b3J9IGZyb20gJ3Jlc2VsZWN0JztcbmltcG9ydCBzdHlsZWQgZnJvbSAnc3R5bGVkLWNvbXBvbmVudHMnO1xuXG5pbXBvcnQge1Rvb2x0aXAsIEljb25Sb3VuZFNtYWxsfSBmcm9tICdjb21wb25lbnRzL2NvbW1vbi9zdHlsZWQtY29tcG9uZW50cyc7XG5pbXBvcnQgTWFwTGF5ZXJTZWxlY3RvciBmcm9tICdjb21wb25lbnRzL2NvbW1vbi9tYXAtbGF5ZXItc2VsZWN0b3InO1xuaW1wb3J0IEtlcGxlckdsTG9nbyBmcm9tICdjb21wb25lbnRzL2NvbW1vbi9sb2dvJztcbmltcG9ydCBNYXBMZWdlbmQgZnJvbSAnLi9tYXAtbGVnZW5kJztcbmltcG9ydCB7XG4gIENsb3NlLFxuICBTcGxpdCxcbiAgTGVnZW5kLFxuICBDdWJlM2QsXG4gIERlbGV0ZSxcbiAgTGF5ZXJzXG59IGZyb20gJ2NvbXBvbmVudHMvY29tbW9uL2ljb25zJztcblxuY29uc3QgU3R5bGVkTWFwQ29udHJvbCA9IHN0eWxlZC5kaXZgXG4gIHJpZ2h0OiAwO1xuICB3aWR0aDogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5tYXBDb250cm9sLndpZHRofXB4O1xuICBwYWRkaW5nOiAke3Byb3BzID0+IHByb3BzLnRoZW1lLm1hcENvbnRyb2wucGFkZGluZ31weDtcbiAgei1pbmRleDogMTtcbiAgdG9wOiAke3Byb3BzID0+IHByb3BzLnRvcH1weDtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuYDtcblxuY29uc3QgU3R5bGVkTWFwQ29udHJvbEFjdGlvbiA9IHN0eWxlZC5kaXZgXG4gIHBhZGRpbmc6IDRweCAwO1xuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtZW5kO1xuYDtcblxuY29uc3QgU3R5bGVkTWFwQ29udHJvbEJ1dHRvbiA9IHN0eWxlZC5kaXZgXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGJhY2tncm91bmQtY29sb3I6ICR7cHJvcHMgPT5cbiAgICBwcm9wcy5hY3RpdmVcbiAgICAgID8gcHJvcHMudGhlbWUuc2Vjb25kYXJ5QnRuQWN0QmdkXG4gICAgICA6IHByb3BzLnRoZW1lLnNlY29uZGFyeUJ0bkJnZH07XG4gIGJvcmRlci1yYWRpdXM6IDE4cHg7XG4gIGJvcmRlcjogMDtcbiAgYm94LXNoYWRvdzogMCA2cHggMTJweCAwIHJnYmEoMCwgMCwgMCwgMC4xNik7XG4gIGNvbG9yOiAke3Byb3BzID0+XG4gICAgcHJvcHMuYWN0aXZlXG4gICAgICA/IHByb3BzLnRoZW1lLnNlY29uZGFyeUJ0bkFjdENvbG9yXG4gICAgICA6IHByb3BzLnRoZW1lLnNlY29uZGFyeUJ0bkNvbG9yfTtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICBkaXNwbGF5OiBmbGV4O1xuICBoZWlnaHQ6IDM2cHg7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBtYXJnaW46IDA7XG4gIG91dGxpbmU6IG5vbmU7XG4gIHBhZGRpbmc6IDA7XG4gIHRyYW5zaXRpb246ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUudHJhbnNpdGlvbn07XG4gIHdpZHRoOiAzNnB4O1xuXG4gIDpmb2N1cyB7XG4gICAgb3V0bGluZTogbm9uZTtcbiAgfVxuXG4gIDpob3ZlciB7XG4gICAgY3Vyc29yOiBwb2ludGVyO1xuICAgIGJhY2tncm91bmQtY29sb3I6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUuc2Vjb25kYXJ5QnRuQWN0QmdkfTtcbiAgICBjb2xvcjogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5zZWNvbmRhcnlCdG5BY3RDb2xvcn07XG4gIH1cbmA7XG5cbmNvbnN0IFN0eWxlZE1hcENvbnRyb2xQYW5lbCA9IHN0eWxlZC5kaXZgXG4gIGJhY2tncm91bmQtY29sb3I6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUubWFwUGFuZWxCYWNrZ3JvdW5kQ29sb3J9O1xuICBmbGV4LWdyb3c6IDE7XG4gIHotaW5kZXg6IDE7XG4gIHAge1xuICAgIG1hcmdpbi1ib3R0b206IDA7XG4gIH1cbmA7XG5cbmNvbnN0IFN0eWxlZE1hcENvbnRyb2xQYW5lbENvbnRlbnQgPSBzdHlsZWQuZGl2YFxuICAke3Byb3BzID0+IHByb3BzLnRoZW1lLmRyb3Bkb3duU2Nyb2xsQmFyfSBtYXgtaGVpZ2h0OiA1MDBweDtcbiAgbWluLWhlaWdodDogMTAwcHg7XG4gIG92ZXJmbG93OiBhdXRvO1xuYDtcblxuY29uc3QgU3R5bGVkTWFwQ29udHJvbFBhbmVsSGVhZGVyID0gc3R5bGVkLmRpdmBcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAke3Byb3BzID0+IHByb3BzLnRoZW1lLm1hcFBhbmVsSGVhZGVyQmFja2dyb3VuZENvbG9yfTtcbiAgaGVpZ2h0OiAzMnB4O1xuICBwYWRkaW5nOiA2cHggMTJweDtcbiAgZm9udC1zaXplOiAxMXB4O1xuICBjb2xvcjogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5zZWNvbmRhcnlCdG5Db2xvcn07XG5cbiAgYnV0dG9uIHtcbiAgICB3aWR0aDogMThweDtcbiAgICBoZWlnaHQ6IDE4cHg7XG4gIH1cbmA7XG5cbi8qKlxuICogR2VuZXJhdGVzIGFsbCBsYXllcnMgYXZhaWxhYmxlIGZvciB0aGUgY3VycmVudCBtYXBcbiAqIFRPRE86IHRoaXMgbWF5IGJlIG1vdmVkIGludG8gbWFwLWNvbnRhaW5lciBvciBtYXAtY29udHJvbCBvciBldmVuIGF0IHRoZSByZWR1Y2VyIGxldmVsXG4gKiBAcGFyYW0gbGF5ZXJzXG4gKiBAcGFyYW0gbWFwTGF5ZXJzXG4gKiBAcmV0dXJucyB7W2lkLCBsYWJlbCwgaXNWaXNpYmxlXX1cbiAqL1xuY29uc3QgbGF5ZXJTZWxlY3RvciA9IChsYXllcnMsIG1hcExheWVycykgPT4ge1xuICBjb25zdCBhdmFpbGFibGVJdGVtcyA9IE9iamVjdC5rZXlzKGxheWVycykucmVkdWNlKFxuICAgIChhdmFpbGFibGVMYXllcnMsIGN1cnJlbnRMYXllcklkKSA9PiB7XG4gICAgICAvLyBpcyBhdmFpbGFibGUgPyBpZiB5ZXMgYWRkIHRvIGF2YWlsYWJsZSBsaXN0XG4gICAgICBjb25zdCBjdXJyZW50TGF5ZXIgPSBsYXllcnNbY3VycmVudExheWVySWRdO1xuICAgICAgLy8gaWYgbWFwbGF5ZXJzIGV4aXN0cyB3ZSBuZWVkIHRvIG1ha2Ugc3VyZSBjdXJyZW50bGF5ZXJcbiAgICAgIC8vIGlzIGNvbnRhaW5lZCBpbiBtYXBMYXllcnMgaW4gb3JkZXIgdG8gYWRkIG9udG8gYXZhaWxhYmxlTGF5ZXJzXG4gICAgICAvLyBvdGhlcndpc2Ugd2UgYWRkIGFsbCBsYXllcnNcblxuICAgICAgY29uc3QgbGF5ZXJDb25maWcgPSBtYXBMYXllcnNcbiAgICAgICAgPyBtYXBMYXllcnNbY3VycmVudExheWVyLmlkXVxuICAgICAgICA6IGN1cnJlbnRMYXllci5jb25maWc7XG5cbiAgICAgIGNvbnN0IG11c3RCZUFkZGVkID1cbiAgICAgICAgbWFwTGF5ZXJzICYmIG1hcExheWVyc1tjdXJyZW50TGF5ZXIuaWRdXG4gICAgICAgICAgPyBtYXBMYXllcnNbY3VycmVudExheWVyLmlkXS5pc0F2YWlsYWJsZVxuICAgICAgICAgIDogbGF5ZXJDb25maWcuaXNWaXNpYmxlO1xuXG4gICAgICByZXR1cm4gbXVzdEJlQWRkZWRcbiAgICAgICAgPyBbXG4gICAgICAgICAgICAuLi5hdmFpbGFibGVMYXllcnMsXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIGlkOiBjdXJyZW50TGF5ZXIuaWQsXG4gICAgICAgICAgICAgIG5hbWU6IGN1cnJlbnRMYXllci5jb25maWcubGFiZWwsXG4gICAgICAgICAgICAgIGlzVmlzaWJsZTpcbiAgICAgICAgICAgICAgICBtYXBMYXllcnMgJiYgbWFwTGF5ZXJzW2N1cnJlbnRMYXllci5pZF1cbiAgICAgICAgICAgICAgICAgID8gbWFwTGF5ZXJzW2N1cnJlbnRMYXllci5pZF0uaXNWaXNpYmxlXG4gICAgICAgICAgICAgICAgICA6IGxheWVyQ29uZmlnLmlzVmlzaWJsZSxcbiAgICAgICAgICAgICAgbGF5ZXI6IGN1cnJlbnRMYXllclxuICAgICAgICAgICAgfVxuICAgICAgICAgIF1cbiAgICAgICAgOiBhdmFpbGFibGVMYXllcnM7XG4gICAgfSxcbiAgICBbXVxuICApO1xuXG4gIHJldHVybiBhdmFpbGFibGVJdGVtcztcbn07XG5cbmV4cG9ydCBjbGFzcyBNYXBDb250cm9sIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICBkYXRhc2V0czogUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkLFxuICAgIGRyYWdSb3RhdGU6IFByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXG4gICAgaXNTcGxpdDogUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcbiAgICBsYXllcnM6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5vYmplY3QpLFxuICAgIG1hcEluZGV4OiBQcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXG4gICAgbWFwQ29udHJvbHM6IFByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcbiAgICBvblRvZ2dsZUZ1bGxTY3JlZW46IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgb25Ub2dnbGVQZXJzcGVjdGl2ZTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICBvblRvZ2dsZVNwbGl0TWFwOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIG9uVG9nZ2xlTWFwQ29udHJvbDogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICBvbk1hcFRvZ2dsZUxheWVyOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIHRvcDogUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxuXG4gICAgLy8gb3B0aW9uYWxcbiAgICBzY2FsZTogUHJvcFR5cGVzLm51bWJlcixcbiAgICBtYXBMYXllcnM6IFByb3BUeXBlcy5vYmplY3RcbiAgfTtcblxuICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgIGlzU3BsaXQ6IGZhbHNlLFxuICAgIHRvcDogMFxuICB9O1xuXG4gIGxheWVyU2VsZWN0b3IgPSBzdGF0ZSA9PiBzdGF0ZS5sYXllcnM7XG4gIG1hcExheWVyc1NlbGVjdG9yID0gc3RhdGUgPT4gc3RhdGUubWFwTGF5ZXJzO1xuXG4gIGluaXRpYWxEYXRhU2VsZWN0b3IgPSBjcmVhdGVTZWxlY3RvcihcbiAgICB0aGlzLmxheWVyU2VsZWN0b3IsXG4gICAgdGhpcy5tYXBMYXllcnNTZWxlY3RvcixcbiAgICBsYXllclNlbGVjdG9yXG4gICk7XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IGl0ZW1zID0gdGhpcy5pbml0aWFsRGF0YVNlbGVjdG9yKHRoaXMucHJvcHMpO1xuXG4gICAgaWYgKCFpdGVtcykge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgY29uc3Qge1xuICAgICAgZHJhZ1JvdGF0ZSxcbiAgICAgIGlzU3BsaXQsXG4gICAgICBpc0V4cG9ydCxcbiAgICAgIG1hcEluZGV4LFxuICAgICAgbWFwQ29udHJvbHMsXG4gICAgICBvblRvZ2dsZVBlcnNwZWN0aXZlLFxuICAgICAgb25Ub2dnbGVTcGxpdE1hcCxcbiAgICAgIG9uTWFwVG9nZ2xlTGF5ZXIsXG4gICAgICBvblRvZ2dsZU1hcENvbnRyb2wsXG4gICAgICBzY2FsZVxuICAgIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgY29uc3Qge1xuICAgICAgdmlzaWJsZUxheWVycyA9IHt9LFxuICAgICAgbWFwTGVnZW5kID0ge30sXG4gICAgICB0b2dnbGUzZCA9IHt9LFxuICAgICAgc3BsaXRNYXAgPSB7fVxuICAgIH0gPSBtYXBDb250cm9scztcblxuICAgIHJldHVybiAoXG4gICAgICA8U3R5bGVkTWFwQ29udHJvbCBjbGFzc05hbWU9XCJtYXAtY29udHJvbFwiPlxuICAgICAgICB7LyogU3BsaXQgTWFwICovfVxuICAgICAgICB7c3BsaXRNYXAuc2hvdyA/IChcbiAgICAgICAgICA8QWN0aW9uUGFuZWwga2V5PXswfT5cbiAgICAgICAgICAgIDxTdHlsZWRNYXBDb250cm9sQnV0dG9uXG4gICAgICAgICAgICAgIGFjdGl2ZT17aXNTcGxpdH1cbiAgICAgICAgICAgICAgb25DbGljaz17ZSA9PiB7XG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIG9uVG9nZ2xlU3BsaXRNYXAoaXNTcGxpdCA/IG1hcEluZGV4IDogdW5kZWZpbmVkKTtcbiAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAga2V5PXtgc3BsaXQtJHtpc1NwbGl0fWB9XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cIm1hcC1jb250cm9sLWJ1dHRvbiBzcGxpdC1tYXBcIlxuICAgICAgICAgICAgICBkYXRhLXRpcFxuICAgICAgICAgICAgICBkYXRhLWZvcj1cImFjdGlvbi10b2dnbGVcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICB7aXNTcGxpdCA/IDxEZWxldGUgaGVpZ2h0PVwiMThweFwiIC8+IDogPFNwbGl0IGhlaWdodD1cIjE4cHhcIiAvPn1cbiAgICAgICAgICAgICAgPE1hcExlZ2VuZFRvb2x0aXBcbiAgICAgICAgICAgICAgICBpZD1cImFjdGlvbi10b2dnbGVcIlxuICAgICAgICAgICAgICAgIG1lc3NhZ2U9e1xuICAgICAgICAgICAgICAgICAgaXNTcGxpdCA/ICdDbG9zZSBjdXJyZW50IHBhbmVsJyA6ICdTd2l0Y2ggdG8gZHVhbCBtYXAgdmlldydcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L1N0eWxlZE1hcENvbnRyb2xCdXR0b24+XG4gICAgICAgICAgPC9BY3Rpb25QYW5lbD5cbiAgICAgICAgKSA6IG51bGx9XG5cbiAgICAgICAgey8qIE1hcCBMYXllcnMgKi99XG4gICAgICAgIHtpc1NwbGl0ICYmIHZpc2libGVMYXllcnMuc2hvdyA/IChcbiAgICAgICAgICA8QWN0aW9uUGFuZWwga2V5PXsxfT5cbiAgICAgICAgICAgIDxMYXllclNlbGVjdG9yUGFuZWxcbiAgICAgICAgICAgICAgaXRlbXM9e2l0ZW1zfVxuICAgICAgICAgICAgICBvbk1hcFRvZ2dsZUxheWVyPXtvbk1hcFRvZ2dsZUxheWVyfVxuICAgICAgICAgICAgICBpc0FjdGl2ZT17dmlzaWJsZUxheWVycy5hY3RpdmV9XG4gICAgICAgICAgICAgIHRvZ2dsZU1lbnVQYW5lbD17KCkgPT4gb25Ub2dnbGVNYXBDb250cm9sKCd2aXNpYmxlTGF5ZXJzJyl9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgIDwvQWN0aW9uUGFuZWw+XG4gICAgICAgICkgOiBudWxsfVxuXG4gICAgICAgIHsvKiAzRCBNYXAgKi99XG4gICAgICAgIHt0b2dnbGUzZC5zaG93ID8gKFxuICAgICAgICAgIDxBY3Rpb25QYW5lbCBrZXk9ezJ9PlxuICAgICAgICAgICAgPFN0eWxlZE1hcENvbnRyb2xCdXR0b25cbiAgICAgICAgICAgICAgb25DbGljaz17ZSA9PiB7XG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIG9uVG9nZ2xlUGVyc3BlY3RpdmUoKTtcbiAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgYWN0aXZlPXtkcmFnUm90YXRlfVxuICAgICAgICAgICAgICBkYXRhLXRpcFxuICAgICAgICAgICAgICBkYXRhLWZvcj1cImFjdGlvbi0zZFwiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDxDdWJlM2QgaGVpZ2h0PVwiMjJweFwiIC8+XG4gICAgICAgICAgICAgIHsvKiBObyBpY29uIHNpbmNlIHdlIGFyZSBpbmplY3RpbmcgdGhyb3VnaCBjc3MgLnRocmVlRC1tYXAgY2xhc3MqL31cbiAgICAgICAgICAgICAgPE1hcExlZ2VuZFRvb2x0aXBcbiAgICAgICAgICAgICAgICBpZD1cImFjdGlvbi0zZFwiXG4gICAgICAgICAgICAgICAgbWVzc2FnZT17ZHJhZ1JvdGF0ZSA/ICdEaXNhYmxlIDNEIE1hcCcgOiAnM0QgTWFwJ31cbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDwvU3R5bGVkTWFwQ29udHJvbEJ1dHRvbj5cbiAgICAgICAgICA8L0FjdGlvblBhbmVsPlxuICAgICAgICApIDogbnVsbH1cblxuICAgICAgICB7LyogTWFwIExlZ2VuZCAqL31cbiAgICAgICAge21hcExlZ2VuZC5zaG93ID8gKFxuICAgICAgICAgIDxBY3Rpb25QYW5lbCBrZXk9ezN9PlxuICAgICAgICAgICAgPE1hcExlZ2VuZFBhbmVsXG4gICAgICAgICAgICAgIGl0ZW1zPXtpdGVtc31cbiAgICAgICAgICAgICAgc2NhbGU9e3NjYWxlfVxuICAgICAgICAgICAgICBpc0V4cG9ydD17aXNFeHBvcnR9XG4gICAgICAgICAgICAgIG9uTWFwVG9nZ2xlTGF5ZXI9e29uTWFwVG9nZ2xlTGF5ZXJ9XG4gICAgICAgICAgICAgIGlzQWN0aXZlPXttYXBMZWdlbmQuYWN0aXZlfVxuICAgICAgICAgICAgICB0b2dnbGVNZW51UGFuZWw9eygpID0+IG9uVG9nZ2xlTWFwQ29udHJvbCgnbWFwTGVnZW5kJyl9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgIDwvQWN0aW9uUGFuZWw+XG4gICAgICAgICkgOiBudWxsfVxuICAgICAgPC9TdHlsZWRNYXBDb250cm9sPlxuICAgICk7XG4gIH1cbn1cblxuY29uc3QgTWFwQ29udHJvbFBhbmVsID0gKHtjaGlsZHJlbiwgaGVhZGVyLCBvbkNsaWNrLCBzY2FsZSA9IDEsIGlzRXhwb3J0fSkgPT4gKFxuICA8U3R5bGVkTWFwQ29udHJvbFBhbmVsXG4gICAgc3R5bGU9e3tcbiAgICAgIHRyYW5zZm9ybTogYHNjYWxlKCR7c2NhbGV9KSB0cmFuc2xhdGUoY2FsYygtJHsyNSAqIChzY2FsZSAtIDEpfSUgLSAkezEwICpcbiAgICAgICAgc2NhbGV9cHgpLCBjYWxjKCR7MjUgKiAoc2NhbGUgLSAxKX0lICsgJHsxMCAqIHNjYWxlfXB4KSlgXG4gICAgfX1cbiAgPlxuICAgIDxTdHlsZWRNYXBDb250cm9sUGFuZWxIZWFkZXIgc3R5bGU9e3twb3NpdGlvbjogJ3JlbGF0aXZlJ319PlxuICAgICAge2lzRXhwb3J0ID8gKFxuICAgICAgICA8S2VwbGVyR2xMb2dvIHZlcnNpb249e2ZhbHNlfSBhcHBOYW1lPVwia2VwbGVyLmdsXCIvPlxuICAgICAgKSA6IChcbiAgICAgICAgPHNwYW4gc3R5bGU9e3t2ZXJ0aWNhbEFsaWduOiAnbWlkZGxlJ319PntoZWFkZXJ9PC9zcGFuPlxuICAgICAgKX1cbiAgICAgIHtpc0V4cG9ydCA/IG51bGwgOiAoXG4gICAgICAgIDxJY29uUm91bmRTbWFsbD5cbiAgICAgICAgICA8Q2xvc2UgaGVpZ2h0PVwiMTZweFwiIG9uQ2xpY2s9e29uQ2xpY2t9IC8+XG4gICAgICAgIDwvSWNvblJvdW5kU21hbGw+XG4gICAgICApfVxuICAgIDwvU3R5bGVkTWFwQ29udHJvbFBhbmVsSGVhZGVyPlxuICAgIDxTdHlsZWRNYXBDb250cm9sUGFuZWxDb250ZW50PntjaGlsZHJlbn08L1N0eWxlZE1hcENvbnRyb2xQYW5lbENvbnRlbnQ+XG4gIDwvU3R5bGVkTWFwQ29udHJvbFBhbmVsPlxuKTtcblxuY29uc3QgTWFwTGVnZW5kUGFuZWwgPSAoe2l0ZW1zLCBpc0FjdGl2ZSwgc2NhbGUsIHRvZ2dsZU1lbnVQYW5lbCwgaXNFeHBvcnR9KSA9PlxuICAhaXNBY3RpdmUgPyAoXG4gICAgPFN0eWxlZE1hcENvbnRyb2xCdXR0b25cbiAgICAgIGtleT17Mn1cbiAgICAgIGRhdGEtdGlwXG4gICAgICBkYXRhLWZvcj1cInNob3ctbGVnZW5kXCJcbiAgICAgIGNsYXNzTmFtZT1cIm1hcC1jb250cm9sLWJ1dHRvbiBzaG93LWxlZ2VuZFwiXG4gICAgICBvbkNsaWNrPXtlID0+IHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB0b2dnbGVNZW51UGFuZWwoKTtcbiAgICAgIH19XG4gICAgPlxuICAgICAgPExlZ2VuZCBoZWlnaHQ9XCIyMnB4XCIgLz5cbiAgICAgIDxNYXBMZWdlbmRUb29sdGlwIGlkPVwic2hvdy1sZWdlbmRcIiBtZXNzYWdlPXsnc2hvdyBsZWdlbmQnfSAvPlxuICAgIDwvU3R5bGVkTWFwQ29udHJvbEJ1dHRvbj5cbiAgKSA6IChcbiAgICA8TWFwQ29udHJvbFBhbmVsXG4gICAgICBzY2FsZT17c2NhbGV9XG4gICAgICBoZWFkZXI9eydMYXllciBMZWdlbmQnfVxuICAgICAgb25DbGljaz17dG9nZ2xlTWVudVBhbmVsfVxuICAgICAgaXNFeHBvcnQ9e2lzRXhwb3J0fVxuICAgID5cbiAgICAgIDxNYXBMZWdlbmRcbiAgICAgICAgbGF5ZXJzPXtpdGVtcy5maWx0ZXIoaXRlbSA9PiBpdGVtLmlzVmlzaWJsZSkubWFwKGl0ZW0gPT4gaXRlbS5sYXllcil9XG4gICAgICAvPlxuICAgIDwvTWFwQ29udHJvbFBhbmVsPlxuICApO1xuXG5jb25zdCBMYXllclNlbGVjdG9yUGFuZWwgPSAoe1xuICBpdGVtcyxcbiAgb25NYXBUb2dnbGVMYXllcixcbiAgaXNBY3RpdmUsXG4gIHRvZ2dsZU1lbnVQYW5lbFxufSkgPT5cbiAgIWlzQWN0aXZlID8gKFxuICAgIDxTdHlsZWRNYXBDb250cm9sQnV0dG9uXG4gICAgICBrZXk9ezF9XG4gICAgICBvbkNsaWNrPXtlID0+IHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB0b2dnbGVNZW51UGFuZWwoKTtcbiAgICAgIH19XG4gICAgICBjbGFzc05hbWU9XCJtYXAtY29udHJvbC1idXR0b24gdG9nZ2xlLWxheWVyXCJcbiAgICAgIGRhdGEtdGlwXG4gICAgICBkYXRhLWZvcj1cInRvZ2dsZS1sYXllclwiXG4gICAgPlxuICAgICAgPExheWVycyBoZWlnaHQ9XCIyMnB4XCIgLz5cbiAgICAgIDxNYXBMZWdlbmRUb29sdGlwXG4gICAgICAgIGlkPVwidG9nZ2xlLWxheWVyXCJcbiAgICAgICAgbWVzc2FnZT17aXNBY3RpdmUgPyAnSGlkZSBsYXllciBwYW5lbCcgOiAnU2hvdyBsYXllciBwYW5lbCd9XG4gICAgICAvPlxuICAgIDwvU3R5bGVkTWFwQ29udHJvbEJ1dHRvbj5cbiAgKSA6IChcbiAgICA8TWFwQ29udHJvbFBhbmVsIGhlYWRlcj1cIlZpc2libGUgbGF5ZXJzXCIgb25DbGljaz17dG9nZ2xlTWVudVBhbmVsfT5cbiAgICAgIDxNYXBMYXllclNlbGVjdG9yIGxheWVycz17aXRlbXN9IG9uTWFwVG9nZ2xlTGF5ZXI9e29uTWFwVG9nZ2xlTGF5ZXJ9IC8+XG4gICAgPC9NYXBDb250cm9sUGFuZWw+XG4gICk7XG5cbmNvbnN0IEFjdGlvblBhbmVsID0gKHtjaGlsZHJlbn0pID0+IChcbiAgPFN0eWxlZE1hcENvbnRyb2xBY3Rpb24+e2NoaWxkcmVufTwvU3R5bGVkTWFwQ29udHJvbEFjdGlvbj5cbik7XG5cbmNvbnN0IE1hcExlZ2VuZFRvb2x0aXAgPSAoe2lkLCBtZXNzYWdlfSkgPT4gKFxuICA8VG9vbHRpcCBpZD17aWR9IHBsYWNlPVwibGVmdFwiIGVmZmVjdD1cInNvbGlkXCI+XG4gICAgPHNwYW4+e21lc3NhZ2V9PC9zcGFuPlxuICA8L1Rvb2x0aXA+XG4pO1xuXG5jb25zdCBNYXBDb250cm9sRmFjdG9yeSA9ICgpID0+IE1hcENvbnRyb2w7XG5cbmV4cG9ydCBkZWZhdWx0IE1hcENvbnRyb2xGYWN0b3J5O1xuIl19