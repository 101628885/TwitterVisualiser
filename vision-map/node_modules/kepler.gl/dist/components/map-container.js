'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends3 = require('babel-runtime/helpers/extends');

var _extends4 = _interopRequireDefault(_extends3);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

exports.default = MapContainerFactory;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactMapGl = require('react-map-gl');

var _reactMapGl2 = _interopRequireDefault(_reactMapGl);

var _deck = require('deck.gl');

var _deck2 = _interopRequireDefault(_deck);

var _luma = require('luma.gl');

var _mapPopover = require('./map/map-popover');

var _mapPopover2 = _interopRequireDefault(_mapPopover);

var _mapControl = require('./map/map-control');

var _mapControl2 = _interopRequireDefault(_mapControl);

var _styledComponents = require('./common/styled-components');

var _mapboxUtils = require('../layers/mapbox-utils');

var _mapboxUtils2 = require('../utils/map-style-utils/mapbox-utils');

var _defaultSettings = require('../constants/default-settings');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// components
var MAP_STYLE = {
  container: {
    display: 'inline-block',
    position: 'relative'
  },
  top: {
    position: 'absolute', top: '0px', pointerEvents: 'none'
  }
};

// default-settings


// Overlay type
// Copyright (c) 2018 Uber Technologies, Inc.
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

// libraries


var getGlConst = function getGlConst(d) {
  return _luma.GL[d];
};

var MAPBOXGL_STYLE_UPDATE = 'style.load';
MapContainerFactory.deps = [_mapPopover2.default, _mapControl2.default];

function MapContainerFactory(MapPopover, MapControl) {
  var _class, _temp;

  var MapContainer = (_temp = _class = function (_Component) {
    (0, _inherits3.default)(MapContainer, _Component);

    function MapContainer(props) {
      (0, _classCallCheck3.default)(this, MapContainer);

      var _this = (0, _possibleConstructorReturn3.default)(this, (MapContainer.__proto__ || Object.getPrototypeOf(MapContainer)).call(this, props));

      _this._onCloseMapPopover = function () {
        _this.props.visStateActions.onLayerClick(null);
      };

      _this._onLayerSetDomain = function (idx, colorDomain) {
        _this.props.visStateActions.layerConfigChange(_this.props.layers[idx], {
          colorDomain: colorDomain
        });
      };

      _this._onWebGLInitialized = function (gl) {
        // enable depth test for perspective mode
        if (_this.props.mapState.dragRotate) {
          gl.enable(gl.DEPTH_TEST);
          gl.depthFunc(gl.LEQUAL);
        } else {
          gl.disable(gl.DEPTH_TEST);
        }

        // allow Uint32 indices in building layer
        gl.getExtension('OES_element_index_uint');

        _this._togglelayerBlending(gl);

        _this.setState({ gl: gl });
      };

      _this._onMouseMove = function (evt) {
        var brush = _this.props.interactionConfig.brush;


        if (evt.nativeEvent && brush.enabled) {
          _this.setState({
            mousePosition: [evt.nativeEvent.offsetX, evt.nativeEvent.offsetY]
          });
        }
      };

      _this._handleMapToggleLayer = function (layerId) {
        var _this$props = _this.props,
            _this$props$index = _this$props.index,
            mapIndex = _this$props$index === undefined ? 0 : _this$props$index,
            visStateActions = _this$props.visStateActions;

        visStateActions.toggleLayerForMap(mapIndex, layerId);
      };

      _this._setMapboxMap = function (mapbox) {
        if (!_this._map && mapbox) {
          _this._map = mapbox.getMap();
          // bind mapboxgl event listener
          _this._map.on(MAPBOXGL_STYLE_UPDATE, function () {
            // force refresh mapboxgl layers

            (0, _mapboxUtils.updateMapboxLayers)(_this._map, _this._renderMapboxLayers(), _this.previousLayers, _this.props.mapLayers, { force: true });

            if (typeof _this.props.onMapStyleLoaded === 'function') {
              _this.props.onMapStyleLoaded(_this._map);
            }
          });

          _this._map.on('render', function () {
            if (typeof _this.props.onMapRender === 'function') {
              _this.props.onMapRender(_this._map);
            }
          });
        }
      };

      _this._togglelayerBlending = function (gl) {
        var blending = _defaultSettings.LAYER_BLENDINGS[_this.props.layerBlending];
        var enable = blending.enable,
            blendFunc = blending.blendFunc,
            blendEquation = blending.blendEquation,
            blendFuncSeparate = blending.blendFuncSeparate,
            blendEquationSeparate = blending.blendEquationSeparate;


        if (enable) {
          gl.enable(_luma.GL.BLEND);
          if (blendFunc) {
            gl.blendFunc.apply(gl, (0, _toConsumableArray3.default)(blendFunc.map(getGlConst)));
            gl.blendEquation(_luma.GL[blendEquation]);
          } else {
            gl.blendFuncSeparate.apply(gl, (0, _toConsumableArray3.default)(blendFuncSeparate.map(getGlConst)));
            gl.blendEquationSeparate.apply(gl, (0, _toConsumableArray3.default)(blendEquationSeparate.map(getGlConst)));
          }
        } else {
          gl.disable(_luma.GL.BLEND);
        }
      };

      _this._renderLayer = function (overlays, idx) {
        var _this$props2 = _this.props,
            layers = _this$props2.layers,
            layerData = _this$props2.layerData,
            hoverInfo = _this$props2.hoverInfo,
            clicked = _this$props2.clicked,
            mapLayers = _this$props2.mapLayers,
            mapState = _this$props2.mapState,
            visStateActions = _this$props2.visStateActions,
            interactionConfig = _this$props2.interactionConfig;
        var mousePosition = _this.state.mousePosition;

        var layer = layers[idx];
        var data = layerData[idx];

        var layerInteraction = {
          onHover: visStateActions.onLayerHover,
          onClick: visStateActions.onLayerClick,
          mousePosition: mousePosition
        };

        var objectHovered = clicked || hoverInfo;
        var layerCallbacks = {
          onSetLayerDomain: function onSetLayerDomain(val) {
            return _this._onLayerSetDomain(idx, val);
          }
        };

        if (!_this._shouldRenderLayer(layer, data, mapLayers)) {
          return overlays;
        }

        var layerOverlay = [];

        // Layer is Layer class
        if (typeof layer.renderLayer === 'function') {
          layerOverlay = layer.renderLayer({
            data: data,
            idx: idx,
            layerInteraction: layerInteraction,
            objectHovered: objectHovered,
            mapState: mapState,
            interactionConfig: interactionConfig,
            layerCallbacks: layerCallbacks
          });
        }

        if (layerOverlay.length) {
          overlays = overlays.concat(layerOverlay);
        }
        return overlays;
      };

      _this.state = {
        reRenderKey: 0,
        gl: null,
        mousePosition: [0, 0]
      };
      _this.previousLayers = {
        // [layers.id]: mapboxLayerConfig
      };
      return _this;
    }

    (0, _createClass3.default)(MapContainer, [{
      key: 'componentWillReceiveProps',
      value: function componentWillReceiveProps(nextProps) {
        if (this.props.mapState.dragRotate !== nextProps.mapState.dragRotate || this.props.layerBlending !== nextProps.layerBlending) {
          // increment rerender key to force gl reinitialize when
          // perspective or layer blending changed
          // TODO: layer blending can now be implemented per layer base
          this.setState({
            reRenderKey: this.state.reRenderKey + 1
          });
        }
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        // unbind mapboxgl event listener
        if (this._map) {
          this._map.off(MAPBOXGL_STYLE_UPDATE);
        }
      }

      /* component private functions */

      /* deck.gl doesn't support blendFuncSeparate yet
       * so we're applying the blending ourselves
      */

    }, {
      key: '_renderObjectLayerPopover',


      /* component render functions */

      /* eslint-disable complexity */
      value: function _renderObjectLayerPopover() {
        // TODO: move this into reducer so it can be tested
        var _props = this.props,
            mapState = _props.mapState,
            hoverInfo = _props.hoverInfo,
            clicked = _props.clicked,
            datasets = _props.datasets,
            interactionConfig = _props.interactionConfig,
            layers = _props.layers,
            mapLayers = _props.mapLayers;

        // if clicked something, ignore hover behavior

        var objectInfo = clicked || hoverInfo;
        if (!interactionConfig.tooltip.enabled || !objectInfo || !objectInfo.picked) {
          // nothing hovered
          return null;
        }

        var lngLat = objectInfo.lngLat,
            object = objectInfo.object,
            overlay = objectInfo.layer;

        // deckgl layer to kepler-gl layer

        var layer = layers[overlay.props.idx];

        if (!layer || !layer.config.isVisible || !object || !layer.getHoverData || mapLayers && !mapLayers[layer.id].isVisible) {
          // layer is not visible
          return null;
        }

        var dataId = layer.config.dataId;
        var _datasets$dataId = datasets[dataId],
            allData = _datasets$dataId.allData,
            fields = _datasets$dataId.fields;

        var data = layer.getHoverData(object, allData);

        // project lnglat to screen so that tooltip follows the object on zoom
        var viewport = overlay.context.viewport;

        var _ref = this._getHoverXY(viewport, lngLat) || objectInfo,
            x = _ref.x,
            y = _ref.y;

        var popoverProps = {
          data: data,
          fields: fields,
          fieldsToShow: interactionConfig.tooltip.config.fieldsToShow[dataId],
          layer: layer,
          isVisible: true,
          x: x,
          y: y,
          freezed: Boolean(clicked),
          onClose: this._onCloseMapPopover,
          mapState: mapState
        };

        return _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(MapPopover, popoverProps)
        );
      }

      /* eslint-enable complexity */

    }, {
      key: '_getHoverXY',
      value: function _getHoverXY(viewport, lngLat) {
        var screenCoord = !viewport || !lngLat ? null : viewport.project(lngLat);

        return screenCoord && { x: screenCoord[0], y: screenCoord[1] };
      }
    }, {
      key: '_shouldRenderLayer',
      value: function _shouldRenderLayer(layer, data, mapLayers) {
        var isAvailableAndVisible = !(mapLayers && mapLayers[layer.id]) || mapLayers[layer.id].isVisible;
        return layer.shouldRenderLayer(data) && isAvailableAndVisible;
      }
    }, {
      key: '_renderOverlay',
      value: function _renderOverlay() {
        var _props2 = this.props,
            mapState = _props2.mapState,
            layerData = _props2.layerData,
            layerOrder = _props2.layerOrder;


        var deckGlLayers = [];

        // wait until data is ready before render data layers
        if (layerData && layerData.length) {
          // last layer render first
          deckGlLayers = layerOrder.slice().reverse().reduce(this._renderLayer, []);
        }

        return _react2.default.createElement(_deck2.default, (0, _extends4.default)({}, mapState, {
          id: 'default-deckgl-overlay',
          layers: deckGlLayers,
          key: this.state.reRenderKey,
          onWebGLInitialized: this._onWebGLInitialized
        }));
      }
    }, {
      key: '_renderMapboxLayers',
      value: function _renderMapboxLayers() {
        var _props3 = this.props,
            layers = _props3.layers,
            layerData = _props3.layerData,
            layerOrder = _props3.layerOrder;


        return (0, _mapboxUtils.generateMapboxLayers)(layers, layerData, layerOrder);
      }
    }, {
      key: '_renderMapboxOverlays',
      value: function _renderMapboxOverlays() {
        if (this._map && this._map.isStyleLoaded()) {

          var mapboxLayers = this._renderMapboxLayers();

          (0, _mapboxUtils.updateMapboxLayers)(this._map, mapboxLayers, this.previousLayers, this.props.mapLayers);

          this.previousLayers = mapboxLayers.reduce(function (final, layer) {
            return (0, _extends4.default)({}, final, (0, _defineProperty3.default)({}, layer.id, layer.config));
          }, {});
        }
      }
    }, {
      key: 'render',
      value: function render() {
        var _props4 = this.props,
            mapState = _props4.mapState,
            mapStyle = _props4.mapStyle,
            mapStateActions = _props4.mapStateActions;
        var updateMap = mapStateActions.updateMap,
            onMapClick = mapStateActions.onMapClick;


        if (!mapStyle.bottomMapStyle) {
          // style not yet loaded
          return _react2.default.createElement('div', null);
        }

        var _props5 = this.props,
            mapLayers = _props5.mapLayers,
            layers = _props5.layers,
            datasets = _props5.datasets,
            mapboxApiAccessToken = _props5.mapboxApiAccessToken,
            mapControls = _props5.mapControls,
            toggleMapControl = _props5.toggleMapControl;


        var mapProps = (0, _extends4.default)({}, mapState, {
          preserveDrawingBuffer: true,
          mapboxApiAccessToken: mapboxApiAccessToken,
          onViewportChange: updateMap,
          transformRequest: _mapboxUtils2.transformRequest
        });

        return _react2.default.createElement(
          _styledComponents.StyledMapContainer,
          { style: MAP_STYLE.container, onMouseMove: this._onMouseMove },
          _react2.default.createElement(MapControl, {
            datasets: datasets,
            dragRotate: mapState.dragRotate,
            isSplit: mapState.isSplit,
            isExport: this.props.isExport,
            layers: layers,
            mapIndex: this.props.index,
            mapLayers: mapLayers,
            mapControls: mapControls,
            scale: mapState.scale || 1,
            top: 0,
            onTogglePerspective: mapStateActions.togglePerspective,
            onToggleSplitMap: mapStateActions.toggleSplitMap,
            onMapToggleLayer: this._handleMapToggleLayer,
            onToggleFullScreen: mapStateActions.toggleFullScreen,
            onToggleMapControl: toggleMapControl
          }),
          _react2.default.createElement(
            this.props.MapComponent,
            (0, _extends4.default)({}, mapProps, {
              key: 'bottom',
              ref: this._setMapboxMap,
              mapStyle: mapStyle.bottomMapStyle,
              onClick: onMapClick
            }),
            this._renderOverlay(),
            this._renderMapboxOverlays()
          ),
          mapStyle.topMapStyle && _react2.default.createElement(
            'div',
            { style: MAP_STYLE.top },
            _react2.default.createElement(this.props.MapComponent, (0, _extends4.default)({}, mapProps, {
              key: 'top',
              mapStyle: mapStyle.topMapStyle
            }))
          ),
          this._renderObjectLayerPopover()
        );
      }
    }]);
    return MapContainer;
  }(_react.Component), _class.propTypes = {
    // required
    datasets: _propTypes2.default.object,
    interactionConfig: _propTypes2.default.object.isRequired,
    layerBlending: _propTypes2.default.string.isRequired,
    layerOrder: _propTypes2.default.arrayOf(_propTypes2.default.any).isRequired,
    layerData: _propTypes2.default.arrayOf(_propTypes2.default.any).isRequired,
    layers: _propTypes2.default.arrayOf(_propTypes2.default.any).isRequired,
    mapState: _propTypes2.default.object.isRequired,
    mapStyle: _propTypes2.default.object.isRequired,
    mapControls: _propTypes2.default.object.isRequired,
    mapboxApiAccessToken: _propTypes2.default.string.isRequired,
    toggleMapControl: _propTypes2.default.func.isRequired,
    visStateActions: _propTypes2.default.object.isRequired,
    mapStateActions: _propTypes2.default.object.isRequired,

    // optional
    isExport: _propTypes2.default.bool,
    clicked: _propTypes2.default.object,
    hoverInfo: _propTypes2.default.object,
    mapLayers: _propTypes2.default.object,
    onMapToggleLayer: _propTypes2.default.func,
    onMapStyleLoaded: _propTypes2.default.func,
    onMapRender: _propTypes2.default.func
  }, _class.defaultProps = {
    MapComponent: _reactMapGl2.default
  }, _temp);


  return MapContainer;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL21hcC1jb250YWluZXIuanMiXSwibmFtZXMiOlsiTWFwQ29udGFpbmVyRmFjdG9yeSIsIk1BUF9TVFlMRSIsImNvbnRhaW5lciIsImRpc3BsYXkiLCJwb3NpdGlvbiIsInRvcCIsInBvaW50ZXJFdmVudHMiLCJnZXRHbENvbnN0IiwiR0wiLCJkIiwiTUFQQk9YR0xfU1RZTEVfVVBEQVRFIiwiZGVwcyIsIk1hcFBvcG92ZXJGYWN0b3J5IiwiTWFwQ29udHJvbEZhY3RvcnkiLCJNYXBQb3BvdmVyIiwiTWFwQ29udHJvbCIsIk1hcENvbnRhaW5lciIsInByb3BzIiwiX29uQ2xvc2VNYXBQb3BvdmVyIiwidmlzU3RhdGVBY3Rpb25zIiwib25MYXllckNsaWNrIiwiX29uTGF5ZXJTZXREb21haW4iLCJpZHgiLCJjb2xvckRvbWFpbiIsImxheWVyQ29uZmlnQ2hhbmdlIiwibGF5ZXJzIiwiX29uV2ViR0xJbml0aWFsaXplZCIsIm1hcFN0YXRlIiwiZHJhZ1JvdGF0ZSIsImdsIiwiZW5hYmxlIiwiREVQVEhfVEVTVCIsImRlcHRoRnVuYyIsIkxFUVVBTCIsImRpc2FibGUiLCJnZXRFeHRlbnNpb24iLCJfdG9nZ2xlbGF5ZXJCbGVuZGluZyIsInNldFN0YXRlIiwiX29uTW91c2VNb3ZlIiwiYnJ1c2giLCJpbnRlcmFjdGlvbkNvbmZpZyIsImV2dCIsIm5hdGl2ZUV2ZW50IiwiZW5hYmxlZCIsIm1vdXNlUG9zaXRpb24iLCJvZmZzZXRYIiwib2Zmc2V0WSIsIl9oYW5kbGVNYXBUb2dnbGVMYXllciIsImluZGV4IiwibWFwSW5kZXgiLCJ0b2dnbGVMYXllckZvck1hcCIsImxheWVySWQiLCJfc2V0TWFwYm94TWFwIiwibWFwYm94IiwiX21hcCIsImdldE1hcCIsIm9uIiwiX3JlbmRlck1hcGJveExheWVycyIsInByZXZpb3VzTGF5ZXJzIiwibWFwTGF5ZXJzIiwiZm9yY2UiLCJvbk1hcFN0eWxlTG9hZGVkIiwib25NYXBSZW5kZXIiLCJibGVuZGluZyIsIkxBWUVSX0JMRU5ESU5HUyIsImxheWVyQmxlbmRpbmciLCJibGVuZEZ1bmMiLCJibGVuZEVxdWF0aW9uIiwiYmxlbmRGdW5jU2VwYXJhdGUiLCJibGVuZEVxdWF0aW9uU2VwYXJhdGUiLCJCTEVORCIsIm1hcCIsIl9yZW5kZXJMYXllciIsIm92ZXJsYXlzIiwibGF5ZXJEYXRhIiwiaG92ZXJJbmZvIiwiY2xpY2tlZCIsInN0YXRlIiwibGF5ZXIiLCJkYXRhIiwibGF5ZXJJbnRlcmFjdGlvbiIsIm9uSG92ZXIiLCJvbkxheWVySG92ZXIiLCJvbkNsaWNrIiwib2JqZWN0SG92ZXJlZCIsImxheWVyQ2FsbGJhY2tzIiwib25TZXRMYXllckRvbWFpbiIsInZhbCIsIl9zaG91bGRSZW5kZXJMYXllciIsImxheWVyT3ZlcmxheSIsInJlbmRlckxheWVyIiwibGVuZ3RoIiwiY29uY2F0IiwicmVSZW5kZXJLZXkiLCJuZXh0UHJvcHMiLCJvZmYiLCJkYXRhc2V0cyIsIm9iamVjdEluZm8iLCJ0b29sdGlwIiwicGlja2VkIiwibG5nTGF0Iiwib2JqZWN0Iiwib3ZlcmxheSIsImNvbmZpZyIsImlzVmlzaWJsZSIsImdldEhvdmVyRGF0YSIsImlkIiwiZGF0YUlkIiwiYWxsRGF0YSIsImZpZWxkcyIsInZpZXdwb3J0IiwiY29udGV4dCIsIl9nZXRIb3ZlclhZIiwieCIsInkiLCJwb3BvdmVyUHJvcHMiLCJmaWVsZHNUb1Nob3ciLCJmcmVlemVkIiwiQm9vbGVhbiIsIm9uQ2xvc2UiLCJzY3JlZW5Db29yZCIsInByb2plY3QiLCJpc0F2YWlsYWJsZUFuZFZpc2libGUiLCJzaG91bGRSZW5kZXJMYXllciIsImxheWVyT3JkZXIiLCJkZWNrR2xMYXllcnMiLCJzbGljZSIsInJldmVyc2UiLCJyZWR1Y2UiLCJpc1N0eWxlTG9hZGVkIiwibWFwYm94TGF5ZXJzIiwiZmluYWwiLCJtYXBTdHlsZSIsIm1hcFN0YXRlQWN0aW9ucyIsInVwZGF0ZU1hcCIsIm9uTWFwQ2xpY2siLCJib3R0b21NYXBTdHlsZSIsIm1hcGJveEFwaUFjY2Vzc1Rva2VuIiwibWFwQ29udHJvbHMiLCJ0b2dnbGVNYXBDb250cm9sIiwibWFwUHJvcHMiLCJwcmVzZXJ2ZURyYXdpbmdCdWZmZXIiLCJvblZpZXdwb3J0Q2hhbmdlIiwidHJhbnNmb3JtUmVxdWVzdCIsImlzU3BsaXQiLCJpc0V4cG9ydCIsInNjYWxlIiwidG9nZ2xlUGVyc3BlY3RpdmUiLCJ0b2dnbGVTcGxpdE1hcCIsInRvZ2dsZUZ1bGxTY3JlZW4iLCJfcmVuZGVyT3ZlcmxheSIsIl9yZW5kZXJNYXBib3hPdmVybGF5cyIsInRvcE1hcFN0eWxlIiwiX3JlbmRlck9iamVjdExheWVyUG9wb3ZlciIsIkNvbXBvbmVudCIsInByb3BUeXBlcyIsIlByb3BUeXBlcyIsImlzUmVxdWlyZWQiLCJzdHJpbmciLCJhcnJheU9mIiwiYW55IiwiZnVuYyIsImJvb2wiLCJvbk1hcFRvZ2dsZUxheWVyIiwiZGVmYXVsdFByb3BzIiwiTWFwQ29tcG9uZW50IiwiTWFwYm94R0xNYXAiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7a0JBd0R3QkEsbUI7O0FBbkN4Qjs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOztBQUdBOzs7O0FBQ0E7Ozs7QUFDQTs7QUFHQTs7QUFFQTs7QUFHQTs7OztBQVhBO0FBYUEsSUFBTUMsWUFBWTtBQUNoQkMsYUFBVztBQUNUQyxhQUFTLGNBREE7QUFFVEMsY0FBVTtBQUZELEdBREs7QUFLaEJDLE9BQUs7QUFDSEQsY0FBVSxVQURQLEVBQ21CQyxLQUFLLEtBRHhCLEVBQytCQyxlQUFlO0FBRDlDO0FBTFcsQ0FBbEI7O0FBSEE7OztBQUxBO0FBaENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7QUE4QkEsSUFBTUMsYUFBYSxTQUFiQSxVQUFhO0FBQUEsU0FBS0MsU0FBR0Ms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QVYsQ0FBa0JILG9CQUFVSSxHQUE1QixFQUFpQ0gsVUFMNUI7QUFNakJuRixlQUFXa0Ysb0JBQVVHLE9BQVYsQ0FBa0JILG9CQUFVSSxHQUE1QixFQUFpQ0gsVUFOM0I7QUFPakJwSSxZQUFRbUksb0JBQVVHLE9BQVYsQ0FBa0JILG9CQUFVSSxHQUE1QixFQUFpQ0gsVUFQeEI7QUFRakJsSSxjQUFVaUksb0JBQVV2RCxNQUFWLENBQWlCd0QsVUFSVjtBQVNqQnpCLGNBQVV3QixvQkFBVXZELE1BQVYsQ0FBaUJ3RCxVQVRWO0FBVWpCbkIsaUJBQWFrQixvQkFBVXZELE1BQVYsQ0FBaUJ3RCxVQVZiO0FBV2pCcEIsMEJBQXNCbUIsb0JBQVVFLE1BQVYsQ0FBaUJELFVBWHRCO0FBWWpCbEIsc0JBQWtCaUIsb0JBQVVLLElBQVYsQ0FBZUosVUFaaEI7QUFhakIxSSxxQkFBaUJ5SSxvQkFBVXZELE1BQVYsQ0FBaUJ3RCxVQWJqQjtBQWNqQnhCLHFCQUFpQnVCLG9CQUFVdkQsTUFBVixDQUFpQndELFVBZGpCOztBQWdCakI7QUFDQVosY0FBVVcsb0JBQVVNLElBakJIO0FBa0JqQnRGLGFBQVNnRixvQkFBVXZELE1BbEJGO0FBbUJqQjFCLGVBQVdpRixvQkFBVXZELE1BbkJKO0FBb0JqQjFDLGVBQVdpRyxvQkFBVXZELE1BcEJKO0FBcUJqQjhELHNCQUFrQlAsb0JBQVVLLElBckJYO0FBc0JqQnBHLHNCQUFrQitGLG9CQUFVSyxJQXRCWDtBQXVCakJuRyxpQkFBYThGLG9CQUFVSztBQXZCTixHQUY2QyxTQTRCekRHLFlBNUJ5RCxHQTRCMUM7QUFDcEJDLGtCQUFjQztBQURNLEdBNUIwQzs7O0FBcWFsRSxTQUFPdEosWUFBUDtBQUNEIiwiZmlsZSI6Im1hcC1jb250YWluZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIDIwMTggVWJlciBUZWNobm9sb2dpZXMsIEluYy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4vLyBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4vLyBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4vLyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4vLyBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbi8vIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbi8vIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1Jcbi8vIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuLy8gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4vLyBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4vLyBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuLy8gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuLy8gVEhFIFNPRlRXQVJFLlxuXG4vLyBsaWJyYXJpZXNcbmltcG9ydCBSZWFjdCwge0NvbXBvbmVudH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCBNYXBib3hHTE1hcCBmcm9tICdyZWFjdC1tYXAtZ2wnO1xuaW1wb3J0IERlY2tHTCBmcm9tICdkZWNrLmdsJztcbmltcG9ydCB7R0x9IGZyb20gJ2x1bWEuZ2wnO1xuXG4vLyBjb21wb25lbnRzXG5pbXBvcnQgTWFwUG9wb3ZlckZhY3RvcnkgZnJvbSAnY29tcG9uZW50cy9tYXAvbWFwLXBvcG92ZXInO1xuaW1wb3J0IE1hcENvbnRyb2xGYWN0b3J5IGZyb20gJ2NvbXBvbmVudHMvbWFwL21hcC1jb250cm9sJztcbmltcG9ydCB7U3R5bGVkTWFwQ29udGFpbmVyfSBmcm9tICdjb21wb25lbnRzL2NvbW1vbi9zdHlsZWQtY29tcG9uZW50cyc7XG5cbi8vIE92ZXJsYXkgdHlwZVxuaW1wb3J0IHtnZW5lcmF0ZU1hcGJveExheWVycywgdXBkYXRlTWFwYm94TGF5ZXJzfSBmcm9tICcuLi9sYXllcnMvbWFwYm94LXV0aWxzJztcblxuaW1wb3J0IHt0cmFuc2Zvcm1SZXF1ZXN0fSBmcm9tICd1dGlscy9tYXAtc3R5bGUtdXRpbHMvbWFwYm94LXV0aWxzJztcblxuLy8gZGVmYXVsdC1zZXR0aW5nc1xuaW1wb3J0IHtMQVlFUl9CTEVORElOR1N9IGZyb20gJ2NvbnN0YW50cy9kZWZhdWx0LXNldHRpbmdzJztcblxuY29uc3QgTUFQX1NUWUxFID0ge1xuICBjb250YWluZXI6IHtcbiAgICBkaXNwbGF5OiAnaW5saW5lLWJsb2NrJyxcbiAgICBwb3NpdGlvbjogJ3JlbGF0aXZlJ1xuICB9LFxuICB0b3A6IHtcbiAgICBwb3NpdGlvbjogJ2Fic29sdXRlJywgdG9wOiAnMHB4JywgcG9pbnRlckV2ZW50czogJ25vbmUnXG4gIH1cbn07XG5cbmNvbnN0IGdldEdsQ29uc3QgPSBkID0+IEdMW2RdO1xuXG5jb25zdCBNQVBCT1hHTF9TVFlMRV9VUERBVEUgPSAnc3R5bGUubG9hZCc7XG5NYXBDb250YWluZXJGYWN0b3J5LmRlcHMgPSBbXG4gIE1hcFBvcG92ZXJGYWN0b3J5LCBNYXBDb250cm9sRmFjdG9yeV07XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIE1hcENvbnRhaW5lckZhY3RvcnkoTWFwUG9wb3ZlciwgTWFwQ29udHJvbCkge1xuICBjbGFzcyBNYXBDb250YWluZXIgZXh0ZW5kcyBDb21wb25lbnQge1xuICAgIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgICAvLyByZXF1aXJlZFxuICAgICAgZGF0YXNldHM6IFByb3BUeXBlcy5vYmplY3QsXG4gICAgICBpbnRlcmFjdGlvbkNvbmZpZzogUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkLFxuICAgICAgbGF5ZXJCbGVuZGluZzogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgICAgbGF5ZXJPcmRlcjogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLmFueSkuaXNSZXF1aXJlZCxcbiAgICAgIGxheWVyRGF0YTogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLmFueSkuaXNSZXF1aXJlZCxcbiAgICAgIGxheWVyczogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLmFueSkuaXNSZXF1aXJlZCxcbiAgICAgIG1hcFN0YXRlOiBQcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsXG4gICAgICBtYXBTdHlsZTogUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkLFxuICAgICAgbWFwQ29udHJvbHM6IFByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcbiAgICAgIG1hcGJveEFwaUFjY2Vzc1Rva2VuOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgICB0b2dnbGVNYXBDb250cm9sOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgICAgdmlzU3RhdGVBY3Rpb25zOiBQcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsXG4gICAgICBtYXBTdGF0ZUFjdGlvbnM6IFByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcblxuICAgICAgLy8gb3B0aW9uYWxcbiAgICAgIGlzRXhwb3J0OiBQcm9wVHlwZXMuYm9vbCxcbiAgICAgIGNsaWNrZWQ6IFByb3BUeXBlcy5vYmplY3QsXG4gICAgICBob3ZlckluZm86IFByb3BUeXBlcy5vYmplY3QsXG4gICAgICBtYXBMYXllcnM6IFByb3BUeXBlcy5vYmplY3QsXG4gICAgICBvbk1hcFRvZ2dsZUxheWVyOiBQcm9wVHlwZXMuZnVuYyxcbiAgICAgIG9uTWFwU3R5bGVMb2FkZWQ6IFByb3BUeXBlcy5mdW5jLFxuICAgICAgb25NYXBSZW5kZXI6IFByb3BUeXBlcy5mdW5jXG4gICAgfTtcblxuICAgIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgICBNYXBDb21wb25lbnQ6IE1hcGJveEdMTWFwXG4gICAgfTtcblxuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICBzdXBlcihwcm9wcyk7XG4gICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICByZVJlbmRlcktleTogMCxcbiAgICAgICAgZ2w6IG51bGwsXG4gICAgICAgIG1vdXNlUG9zaXRpb246IFswLCAwXVxuICAgICAgfTtcbiAgICAgIHRoaXMucHJldmlvdXNMYXllcnMgPSB7XG4gICAgICAgIC8vIFtsYXllcnMuaWRdOiBtYXBib3hMYXllckNvbmZpZ1xuICAgICAgfTtcbiAgICB9XG5cbiAgICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRQcm9wcykge1xuICAgICAgaWYgKFxuICAgICAgICB0aGlzLnByb3BzLm1hcFN0YXRlLmRyYWdSb3RhdGUgIT09IG5leHRQcm9wcy5tYXBTdGF0ZS5kcmFnUm90YXRlIHx8XG4gICAgICAgIHRoaXMucHJvcHMubGF5ZXJCbGVuZGluZyAhPT0gbmV4dFByb3BzLmxheWVyQmxlbmRpbmdcbiAgICAgICkge1xuICAgICAgICAvLyBpbmNyZW1lbnQgcmVyZW5kZXIga2V5IHRvIGZvcmNlIGdsIHJlaW5pdGlhbGl6ZSB3aGVuXG4gICAgICAgIC8vIHBlcnNwZWN0aXZlIG9yIGxheWVyIGJsZW5kaW5nIGNoYW5nZWRcbiAgICAgICAgLy8gVE9ETzogbGF5ZXIgYmxlbmRpbmcgY2FuIG5vdyBiZSBpbXBsZW1lbnRlZCBwZXIgbGF5ZXIgYmFzZVxuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICByZVJlbmRlcktleTogdGhpcy5zdGF0ZS5yZVJlbmRlcktleSArIDFcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgICAvLyB1bmJpbmQgbWFwYm94Z2wgZXZlbnQgbGlzdGVuZXJcbiAgICAgIGlmICh0aGlzLl9tYXApIHtcbiAgICAgICAgdGhpcy5fbWFwLm9mZihNQVBCT1hHTF9TVFlMRV9VUERBVEUpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8qIGNvbXBvbmVudCBwcml2YXRlIGZ1bmN0aW9ucyAqL1xuXG4gICAgX29uQ2xvc2VNYXBQb3BvdmVyID0gKCkgPT4ge1xuICAgICAgdGhpcy5wcm9wcy52aXNTdGF0ZUFjdGlvbnMub25MYXllckNsaWNrKG51bGwpO1xuICAgIH07XG5cbiAgICBfb25MYXllclNldERvbWFpbiA9IChpZHgsIGNvbG9yRG9tYWluKSA9PiB7XG4gICAgICB0aGlzLnByb3BzLnZpc1N0YXRlQWN0aW9ucy5sYXllckNvbmZpZ0NoYW5nZSh0aGlzLnByb3BzLmxheWVyc1tpZHhdLCB7XG4gICAgICAgIGNvbG9yRG9tYWluXG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgX29uV2ViR0xJbml0aWFsaXplZCA9IGdsID0+IHtcbiAgICAgIC8vIGVuYWJsZSBkZXB0aCB0ZXN0IGZvciBwZXJzcGVjdGl2ZSBtb2RlXG4gICAgICBpZiAodGhpcy5wcm9wcy5tYXBTdGF0ZS5kcmFnUm90YXRlKSB7XG4gICAgICAgIGdsLmVuYWJsZShnbC5ERVBUSF9URVNUKTtcbiAgICAgICAgZ2wuZGVwdGhGdW5jKGdsLkxFUVVBTCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBnbC5kaXNhYmxlKGdsLkRFUFRIX1RFU1QpO1xuICAgICAgfVxuXG4gICAgICAvLyBhbGxvdyBVaW50MzIgaW5kaWNlcyBpbiBidWlsZGluZyBsYXllclxuICAgICAgZ2wuZ2V0RXh0ZW5zaW9uKCdPRVNfZWxlbWVudF9pbmRleF91aW50Jyk7XG5cbiAgICAgIHRoaXMuX3RvZ2dsZWxheWVyQmxlbmRpbmcoZ2wpO1xuXG4gICAgICB0aGlzLnNldFN0YXRlKHtnbH0pO1xuICAgIH07XG5cbiAgICBfb25Nb3VzZU1vdmUgPSBldnQgPT4ge1xuICAgICAgY29uc3Qge2ludGVyYWN0aW9uQ29uZmlnOiB7YnJ1c2h9fSA9IHRoaXMucHJvcHM7XG5cbiAgICAgIGlmIChldnQubmF0aXZlRXZlbnQgJiYgYnJ1c2guZW5hYmxlZCkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICBtb3VzZVBvc2l0aW9uOiBbZXZ0Lm5hdGl2ZUV2ZW50Lm9mZnNldFgsIGV2dC5uYXRpdmVFdmVudC5vZmZzZXRZXVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgX2hhbmRsZU1hcFRvZ2dsZUxheWVyID0gbGF5ZXJJZCA9PiB7XG4gICAgICBjb25zdCB7aW5kZXg6IG1hcEluZGV4ID0gMCwgdmlzU3RhdGVBY3Rpb25zfSA9IHRoaXMucHJvcHM7XG4gICAgICB2aXNTdGF0ZUFjdGlvbnMudG9nZ2xlTGF5ZXJGb3JNYXAobWFwSW5kZXgsIGxheWVySWQpO1xuICAgIH07XG5cbiAgICBfc2V0TWFwYm94TWFwID0gKG1hcGJveCkgPT4ge1xuICAgICAgaWYgKCF0aGlzLl9tYXAgJiYgbWFwYm94KSB7XG4gICAgICAgIHRoaXMuX21hcCA9IG1hcGJveC5nZXRNYXAoKTtcbiAgICAgICAgLy8gYmluZCBtYXBib3hnbCBldmVudCBsaXN0ZW5lclxuICAgICAgICB0aGlzLl9tYXAub24oTUFQQk9YR0xfU1RZTEVfVVBEQVRFLCAoKSA9PiB7XG4gICAgICAgICAgLy8gZm9yY2UgcmVmcmVzaCBtYXBib3hnbCBsYXllcnNcblxuICAgICAgICAgIHVwZGF0ZU1hcGJveExheWVycyhcbiAgICAgICAgICAgIHRoaXMuX21hcCxcbiAgICAgICAgICAgIHRoaXMuX3JlbmRlck1hcGJveExheWVycygpLFxuICAgICAgICAgICAgdGhpcy5wcmV2aW91c0xheWVycyxcbiAgICAgICAgICAgIHRoaXMucHJvcHMubWFwTGF5ZXJzLFxuICAgICAgICAgICAge2ZvcmNlOiB0cnVlfVxuICAgICAgICAgICk7XG5cbiAgICAgICAgICBpZiAodHlwZW9mIHRoaXMucHJvcHMub25NYXBTdHlsZUxvYWRlZCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5vbk1hcFN0eWxlTG9hZGVkKHRoaXMuX21hcCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLl9tYXAub24oJ3JlbmRlcicsICgpID0+IHtcbiAgICAgICAgICBpZiAodHlwZW9mIHRoaXMucHJvcHMub25NYXBSZW5kZXIgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIHRoaXMucHJvcHMub25NYXBSZW5kZXIodGhpcy5fbWFwKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8qIGRlY2suZ2wgZG9lc24ndCBzdXBwb3J0IGJsZW5kRnVuY1NlcGFyYXRlIHlldFxuICAgICAqIHNvIHdlJ3JlIGFwcGx5aW5nIHRoZSBibGVuZGluZyBvdXJzZWx2ZXNcbiAgICAqL1xuICAgIF90b2dnbGVsYXllckJsZW5kaW5nID0gZ2wgPT4ge1xuICAgICAgY29uc3QgYmxlbmRpbmcgPSBMQVlFUl9CTEVORElOR1NbdGhpcy5wcm9wcy5sYXllckJsZW5kaW5nXTtcbiAgICAgIGNvbnN0IHtcbiAgICAgICAgZW5hYmxlLFxuICAgICAgICBibGVuZEZ1bmMsXG4gICAgICAgIGJsZW5kRXF1YXRpb24sXG4gICAgICAgIGJsZW5kRnVuY1NlcGFyYXRlLFxuICAgICAgICBibGVuZEVxdWF0aW9uU2VwYXJhdGVcbiAgICAgIH0gPSBibGVuZGluZztcblxuICAgICAgaWYgKGVuYWJsZSkge1xuICAgICAgICBnbC5lbmFibGUoR0wuQkxFTkQpO1xuICAgICAgICBpZiAoYmxlbmRGdW5jKSB7XG4gICAgICAgICAgZ2wuYmxlbmRGdW5jKC4uLmJsZW5kRnVuYy5tYXAoZ2V0R2xDb25zdCkpO1xuICAgICAgICAgIGdsLmJsZW5kRXF1YXRpb24oR0xbYmxlbmRFcXVhdGlvbl0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGdsLmJsZW5kRnVuY1NlcGFyYXRlKC4uLmJsZW5kRnVuY1NlcGFyYXRlLm1hcChnZXRHbENvbnN0KSk7XG4gICAgICAgICAgZ2wuYmxlbmRFcXVhdGlvblNlcGFyYXRlKC4uLmJsZW5kRXF1YXRpb25TZXBhcmF0ZS5tYXAoZ2V0R2xDb25zdCkpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBnbC5kaXNhYmxlKEdMLkJMRU5EKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgLyogY29tcG9uZW50IHJlbmRlciBmdW5jdGlvbnMgKi9cblxuICAgIC8qIGVzbGludC1kaXNhYmxlIGNvbXBsZXhpdHkgKi9cbiAgICBfcmVuZGVyT2JqZWN0TGF5ZXJQb3BvdmVyKCkge1xuICAgICAgLy8gVE9ETzogbW92ZSB0aGlzIGludG8gcmVkdWNlciBzbyBpdCBjYW4gYmUgdGVzdGVkXG4gICAgICBjb25zdCB7XG4gICAgICAgIG1hcFN0YXRlLFxuICAgICAgICBob3ZlckluZm8sXG4gICAgICAgIGNsaWNrZWQsXG4gICAgICAgIGRhdGFzZXRzLFxuICAgICAgICBpbnRlcmFjdGlvbkNvbmZpZyxcbiAgICAgICAgbGF5ZXJzLFxuICAgICAgICBtYXBMYXllcnNcbiAgICAgIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgICAvLyBpZiBjbGlja2VkIHNvbWV0aGluZywgaWdub3JlIGhvdmVyIGJlaGF2aW9yXG4gICAgICBjb25zdCBvYmplY3RJbmZvID0gY2xpY2tlZCB8fCBob3ZlckluZm87XG4gICAgICBpZiAoXG4gICAgICAgICFpbnRlcmFjdGlvbkNvbmZpZy50b29sdGlwLmVuYWJsZWQgfHxcbiAgICAgICAgIW9iamVjdEluZm8gfHxcbiAgICAgICAgIW9iamVjdEluZm8ucGlja2VkXG4gICAgICApIHtcbiAgICAgICAgLy8gbm90aGluZyBob3ZlcmVkXG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuXG4gICAgICBjb25zdCB7bG5nTGF0LCBvYmplY3QsIGxheWVyOiBvdmVybGF5fSA9IG9iamVjdEluZm87XG5cbiAgICAgIC8vIGRlY2tnbCBsYXllciB0byBrZXBsZXItZ2wgbGF5ZXJcbiAgICAgIGNvbnN0IGxheWVyID0gbGF5ZXJzW292ZXJsYXkucHJvcHMuaWR4XTtcblxuICAgICAgaWYgKFxuICAgICAgICAhbGF5ZXIgfHxcbiAgICAgICAgIWxheWVyLmNvbmZpZy5pc1Zpc2libGUgfHxcbiAgICAgICAgIW9iamVjdCB8fFxuICAgICAgICAhbGF5ZXIuZ2V0SG92ZXJEYXRhIHx8XG4gICAgICAgIChtYXBMYXllcnMgJiYgIW1hcExheWVyc1tsYXllci5pZF0uaXNWaXNpYmxlKVxuICAgICAgKSB7XG4gICAgICAgIC8vIGxheWVyIGlzIG5vdCB2aXNpYmxlXG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuXG4gICAgICBjb25zdCB7Y29uZmlnOiB7ZGF0YUlkfX0gPSBsYXllcjtcbiAgICAgIGNvbnN0IHthbGxEYXRhLCBmaWVsZHN9ID0gZGF0YXNldHNbZGF0YUlkXTtcbiAgICAgIGNvbnN0IGRhdGEgPSBsYXllci5nZXRIb3ZlckRhdGEob2JqZWN0LCBhbGxEYXRhKTtcblxuICAgICAgLy8gcHJvamVjdCBsbmdsYXQgdG8gc2NyZWVuIHNvIHRoYXQgdG9vbHRpcCBmb2xsb3dzIHRoZSBvYmplY3Qgb24gem9vbVxuICAgICAgY29uc3Qge3ZpZXdwb3J0fSA9IG92ZXJsYXkuY29udGV4dDtcbiAgICAgIGNvbnN0IHt4LCB5fSA9IHRoaXMuX2dldEhvdmVyWFkodmlld3BvcnQsIGxuZ0xhdCkgfHwgb2JqZWN0SW5mbztcblxuICAgICAgY29uc3QgcG9wb3ZlclByb3BzID0ge1xuICAgICAgICBkYXRhLFxuICAgICAgICBmaWVsZHMsXG4gICAgICAgIGZpZWxkc1RvU2hvdzogaW50ZXJhY3Rpb25Db25maWcudG9vbHRpcC5jb25maWcuZmllbGRzVG9TaG93W2RhdGFJZF0sXG4gICAgICAgIGxheWVyLFxuICAgICAgICBpc1Zpc2libGU6IHRydWUsXG4gICAgICAgIHgsXG4gICAgICAgIHksXG4gICAgICAgIGZyZWV6ZWQ6IEJvb2xlYW4oY2xpY2tlZCksXG4gICAgICAgIG9uQ2xvc2U6IHRoaXMuX29uQ2xvc2VNYXBQb3BvdmVyLFxuICAgICAgICBtYXBTdGF0ZVxuICAgICAgfTtcblxuICAgICAgcmV0dXJuIChcbiAgICAgICAgPGRpdj5cbiAgICAgICAgICA8TWFwUG9wb3ZlciB7Li4ucG9wb3ZlclByb3BzfSAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICk7XG4gICAgfVxuXG4gICAgLyogZXNsaW50LWVuYWJsZSBjb21wbGV4aXR5ICovXG5cbiAgICBfZ2V0SG92ZXJYWSh2aWV3cG9ydCwgbG5nTGF0KSB7XG4gICAgICBjb25zdCBzY3JlZW5Db29yZCA9ICF2aWV3cG9ydCB8fCAhbG5nTGF0ID8gbnVsbCA6IHZpZXdwb3J0LnByb2plY3QobG5nTGF0KTtcblxuICAgICAgcmV0dXJuIHNjcmVlbkNvb3JkICYmIHt4OiBzY3JlZW5Db29yZFswXSwgeTogc2NyZWVuQ29vcmRbMV19O1xuICAgIH1cblxuICAgIF9zaG91bGRSZW5kZXJMYXllcihsYXllciwgZGF0YSwgbWFwTGF5ZXJzKSB7XG4gICAgICBjb25zdCBpc0F2YWlsYWJsZUFuZFZpc2libGUgPVxuICAgICAgICAhKG1hcExheWVycyAmJiBtYXBMYXllcnNbbGF5ZXIuaWRdKSB8fCBtYXBMYXllcnNbbGF5ZXIuaWRdLmlzVmlzaWJsZTtcbiAgICAgIHJldHVybiBsYXllci5zaG91bGRSZW5kZXJMYXllcihkYXRhKSAmJiBpc0F2YWlsYWJsZUFuZFZpc2libGU7XG4gICAgfVxuXG4gICAgX3JlbmRlckxheWVyID0gKG92ZXJsYXlzLCBpZHgpID0+IHtcbiAgICAgIGNvbnN0IHtcbiAgICAgICAgbGF5ZXJzLFxuICAgICAgICBsYXllckRhdGEsXG4gICAgICAgIGhvdmVySW5mbyxcbiAgICAgICAgY2xpY2tlZCxcbiAgICAgICAgbWFwTGF5ZXJzLFxuICAgICAgICBtYXBTdGF0ZSxcbiAgICAgICAgdmlzU3RhdGVBY3Rpb25zLFxuICAgICAgICBpbnRlcmFjdGlvbkNvbmZpZ1xuICAgICAgfSA9IHRoaXMucHJvcHM7XG4gICAgICBjb25zdCB7bW91c2VQb3NpdGlvbn0gPSB0aGlzLnN0YXRlO1xuICAgICAgY29uc3QgbGF5ZXIgPSBsYXllcnNbaWR4XTtcbiAgICAgIGNvbnN0IGRhdGEgPSBsYXllckRhdGFbaWR4XTtcblxuICAgICAgY29uc3QgbGF5ZXJJbnRlcmFjdGlvbiA9IHtcbiAgICAgICAgb25Ib3ZlcjogdmlzU3RhdGVBY3Rpb25zLm9uTGF5ZXJIb3ZlcixcbiAgICAgICAgb25DbGljazogdmlzU3RhdGVBY3Rpb25zLm9uTGF5ZXJDbGljayxcbiAgICAgICAgbW91c2VQb3NpdGlvblxuICAgICAgfTtcblxuICAgICAgY29uc3Qgb2JqZWN0SG92ZXJlZCA9IGNsaWNrZWQgfHwgaG92ZXJJbmZvO1xuICAgICAgY29uc3QgbGF5ZXJDYWxsYmFja3MgPSB7XG4gICAgICAgIG9uU2V0TGF5ZXJEb21haW46IHZhbCA9PiB0aGlzLl9vbkxheWVyU2V0RG9tYWluKGlkeCwgdmFsKVxuICAgICAgfTtcblxuICAgICAgaWYgKCF0aGlzLl9zaG91bGRSZW5kZXJMYXllcihsYXllciwgZGF0YSwgbWFwTGF5ZXJzKSkge1xuICAgICAgICByZXR1cm4gb3ZlcmxheXM7XG4gICAgICB9XG5cbiAgICAgIGxldCBsYXllck92ZXJsYXkgPSBbXTtcblxuICAgICAgLy8gTGF5ZXIgaXMgTGF5ZXIgY2xhc3NcbiAgICAgIGlmICh0eXBlb2YgbGF5ZXIucmVuZGVyTGF5ZXIgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgbGF5ZXJPdmVybGF5ID0gbGF5ZXIucmVuZGVyTGF5ZXIoe1xuICAgICAgICAgIGRhdGEsXG4gICAgICAgICAgaWR4LFxuICAgICAgICAgIGxheWVySW50ZXJhY3Rpb24sXG4gICAgICAgICAgb2JqZWN0SG92ZXJlZCxcbiAgICAgICAgICBtYXBTdGF0ZSxcbiAgICAgICAgICBpbnRlcmFjdGlvbkNvbmZpZyxcbiAgICAgICAgICBsYXllckNhbGxiYWNrc1xuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgaWYgKGxheWVyT3ZlcmxheS5sZW5ndGgpIHtcbiAgICAgICAgb3ZlcmxheXMgPSBvdmVybGF5cy5jb25jYXQobGF5ZXJPdmVybGF5KTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBvdmVybGF5cztcbiAgICB9O1xuXG4gICAgX3JlbmRlck92ZXJsYXkoKSB7XG4gICAgICBjb25zdCB7XG4gICAgICAgIG1hcFN0YXRlLFxuICAgICAgICBsYXllckRhdGEsXG4gICAgICAgIGxheWVyT3JkZXJcbiAgICAgIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgICBsZXQgZGVja0dsTGF5ZXJzID0gW107XG5cbiAgICAgIC8vIHdhaXQgdW50aWwgZGF0YSBpcyByZWFkeSBiZWZvcmUgcmVuZGVyIGRhdGEgbGF5ZXJzXG4gICAgICBpZiAobGF5ZXJEYXRhICYmIGxheWVyRGF0YS5sZW5ndGgpIHtcbiAgICAgICAgLy8gbGFzdCBsYXllciByZW5kZXIgZmlyc3RcbiAgICAgICAgZGVja0dsTGF5ZXJzID0gbGF5ZXJPcmRlclxuICAgICAgICAgIC5zbGljZSgpXG4gICAgICAgICAgLnJldmVyc2UoKVxuICAgICAgICAgIC5yZWR1Y2UodGhpcy5fcmVuZGVyTGF5ZXIsIFtdKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIChcbiAgICAgICAgPERlY2tHTFxuICAgICAgICAgIHsuLi5tYXBTdGF0ZX1cbiAgICAgICAgICBpZD1cImRlZmF1bHQtZGVja2dsLW92ZXJsYXlcIlxuICAgICAgICAgIGxheWVycz17ZGVja0dsTGF5ZXJzfVxuICAgICAgICAgIGtleT17dGhpcy5zdGF0ZS5yZVJlbmRlcktleX1cbiAgICAgICAgICBvbldlYkdMSW5pdGlhbGl6ZWQ9e3RoaXMuX29uV2ViR0xJbml0aWFsaXplZH1cbiAgICAgICAgLz5cbiAgICAgICk7XG4gICAgfVxuXG4gICAgX3JlbmRlck1hcGJveExheWVycygpIHtcbiAgICAgIGNvbnN0IHtcbiAgICAgICAgbGF5ZXJzLFxuICAgICAgICBsYXllckRhdGEsXG4gICAgICAgIGxheWVyT3JkZXJcbiAgICAgIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgICByZXR1cm4gZ2VuZXJhdGVNYXBib3hMYXllcnMobGF5ZXJzLCBsYXllckRhdGEsIGxheWVyT3JkZXIpO1xuICAgIH1cblxuICAgIF9yZW5kZXJNYXBib3hPdmVybGF5cygpIHtcbiAgICAgIGlmICh0aGlzLl9tYXAgJiYgdGhpcy5fbWFwLmlzU3R5bGVMb2FkZWQoKSkge1xuXG4gICAgICAgIGNvbnN0IG1hcGJveExheWVycyA9IHRoaXMuX3JlbmRlck1hcGJveExheWVycygpO1xuXG4gICAgICAgIHVwZGF0ZU1hcGJveExheWVycyhcbiAgICAgICAgICB0aGlzLl9tYXAsXG4gICAgICAgICAgbWFwYm94TGF5ZXJzLFxuICAgICAgICAgIHRoaXMucHJldmlvdXNMYXllcnMsXG4gICAgICAgICAgdGhpcy5wcm9wcy5tYXBMYXllcnNcbiAgICAgICAgKTtcblxuICAgICAgICB0aGlzLnByZXZpb3VzTGF5ZXJzID0gbWFwYm94TGF5ZXJzLnJlZHVjZSgoZmluYWwsIGxheWVyKSA9PiAoe1xuICAgICAgICAgIC4uLmZpbmFsLFxuICAgICAgICAgIFtsYXllci5pZF06IGxheWVyLmNvbmZpZ1xuICAgICAgICB9KSwge30pXG4gICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgY29uc3Qge21hcFN0YXRlLCBtYXBTdHlsZSwgbWFwU3RhdGVBY3Rpb25zfSA9IHRoaXMucHJvcHM7XG4gICAgICBjb25zdCB7dXBkYXRlTWFwLCBvbk1hcENsaWNrfSA9IG1hcFN0YXRlQWN0aW9ucztcblxuICAgICAgaWYgKCFtYXBTdHlsZS5ib3R0b21NYXBTdHlsZSkge1xuICAgICAgICAvLyBzdHlsZSBub3QgeWV0IGxvYWRlZFxuICAgICAgICByZXR1cm4gPGRpdi8+O1xuICAgICAgfVxuXG4gICAgICBjb25zdCB7bWFwTGF5ZXJzLCBsYXllcnMsIGRhdGFzZXRzLCBtYXBib3hBcGlBY2Nlc3NUb2tlbixcbiAgICAgICAgbWFwQ29udHJvbHMsIHRvZ2dsZU1hcENvbnRyb2x9ID0gdGhpcy5wcm9wcztcblxuICAgICAgY29uc3QgbWFwUHJvcHMgPSB7XG4gICAgICAgIC4uLm1hcFN0YXRlLFxuICAgICAgICBwcmVzZXJ2ZURyYXdpbmdCdWZmZXI6IHRydWUsXG4gICAgICAgIG1hcGJveEFwaUFjY2Vzc1Rva2VuLFxuICAgICAgICBvblZpZXdwb3J0Q2hhbmdlOiB1cGRhdGVNYXAsXG4gICAgICAgIHRyYW5zZm9ybVJlcXVlc3RcbiAgICAgIH07XG5cbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxTdHlsZWRNYXBDb250YWluZXIgc3R5bGU9e01BUF9TVFlMRS5jb250YWluZXJ9IG9uTW91c2VNb3ZlPXt0aGlzLl9vbk1vdXNlTW92ZX0+XG4gICAgICAgICAgPE1hcENvbnRyb2xcbiAgICAgICAgICAgIGRhdGFzZXRzPXtkYXRhc2V0c31cbiAgICAgICAgICAgIGRyYWdSb3RhdGU9e21hcFN0YXRlLmRyYWdSb3RhdGV9XG4gICAgICAgICAgICBpc1NwbGl0PXttYXBTdGF0ZS5pc1NwbGl0fVxuICAgICAgICAgICAgaXNFeHBvcnQ9e3RoaXMucHJvcHMuaXNFeHBvcnR9XG4gICAgICAgICAgICBsYXllcnM9e2xheWVyc31cbiAgICAgICAgICAgIG1hcEluZGV4PXt0aGlzLnByb3BzLmluZGV4fVxuICAgICAgICAgICAgbWFwTGF5ZXJzPXttYXBMYXllcnN9XG4gICAgICAgICAgICBtYXBDb250cm9scz17bWFwQ29udHJvbHN9XG4gICAgICAgICAgICBzY2FsZT17bWFwU3RhdGUuc2NhbGUgfHwgMX1cbiAgICAgICAgICAgIHRvcD17MH1cbiAgICAgICAgICAgIG9uVG9nZ2xlUGVyc3BlY3RpdmU9e21hcFN0YXRlQWN0aW9ucy50b2dnbGVQZXJzcGVjdGl2ZX1cbiAgICAgICAgICAgIG9uVG9nZ2xlU3BsaXRNYXA9e21hcFN0YXRlQWN0aW9ucy50b2dnbGVTcGxpdE1hcH1cbiAgICAgICAgICAgIG9uTWFwVG9nZ2xlTGF5ZXI9e3RoaXMuX2hhbmRsZU1hcFRvZ2dsZUxheWVyfVxuICAgICAgICAgICAgb25Ub2dnbGVGdWxsU2NyZWVuPXttYXBTdGF0ZUFjdGlvbnMudG9nZ2xlRnVsbFNjcmVlbn1cbiAgICAgICAgICAgIG9uVG9nZ2xlTWFwQ29udHJvbD17dG9nZ2xlTWFwQ29udHJvbH1cbiAgICAgICAgICAvPlxuICAgICAgICAgIDx0aGlzLnByb3BzLk1hcENvbXBvbmVudFxuICAgICAgICAgICAgey4uLm1hcFByb3BzfVxuICAgICAgICAgICAga2V5PVwiYm90dG9tXCJcbiAgICAgICAgICAgIHJlZj17dGhpcy5fc2V0TWFwYm94TWFwfVxuICAgICAgICAgICAgbWFwU3R5bGU9e21hcFN0eWxlLmJvdHRvbU1hcFN0eWxlfVxuICAgICAgICAgICAgb25DbGljaz17b25NYXBDbGlja31cbiAgICAgICAgICA+XG4gICAgICAgICAgICB7dGhpcy5fcmVuZGVyT3ZlcmxheSgpfVxuICAgICAgICAgICAge3RoaXMuX3JlbmRlck1hcGJveE92ZXJsYXlzKCl9XG4gICAgICAgICAgPC90aGlzLnByb3BzLk1hcENvbXBvbmVudD5cbiAgICAgICAgICB7bWFwU3R5bGUudG9wTWFwU3R5bGUgJiYgKFxuICAgICAgICAgICAgPGRpdiBzdHlsZT17TUFQX1NUWUxFLnRvcH0+XG4gICAgICAgICAgICAgIDx0aGlzLnByb3BzLk1hcENvbXBvbmVudFxuICAgICAgICAgICAgICAgIHsuLi5tYXBQcm9wc31cbiAgICAgICAgICAgICAgICBrZXk9XCJ0b3BcIlxuICAgICAgICAgICAgICAgIG1hcFN0eWxlPXttYXBTdHlsZS50b3BNYXBTdHlsZX1cbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICl9XG4gICAgICAgICAge3RoaXMuX3JlbmRlck9iamVjdExheWVyUG9wb3ZlcigpfVxuICAgICAgICA8L1N0eWxlZE1hcENvbnRhaW5lcj5cbiAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIE1hcENvbnRhaW5lcjtcbn1cbiJdfQ==