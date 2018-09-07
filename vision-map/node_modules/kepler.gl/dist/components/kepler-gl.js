'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.keplerGlChildDeps = undefined;

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

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

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _taggedTemplateLiteral2 = require('babel-runtime/helpers/taggedTemplateLiteral');

var _taggedTemplateLiteral3 = _interopRequireDefault(_taggedTemplateLiteral2);

var _templateObject = (0, _taggedTemplateLiteral3.default)(['\n  font-family: ff-clan-web-pro, \'Helvetica Neue\', Helvetica, sans-serif;\n  font-weight: 400;\n  font-size: 0.875em;\n  line-height: 1.71429;\n\n  *,\n  *:before,\n  *:after {\n    -webkit-box-sizing: border-box;\n    -moz-box-sizing: border-box;\n    box-sizing: border-box;\n  }\n\n  ul {\n    margin: 0;\n    padding: 0;\n  }\n\n  li {\n    margin: 0;\n  }\n\n  a {\n    text-decoration: none;\n    color: ', ';\n  }\n'], ['\n  font-family: ff-clan-web-pro, \'Helvetica Neue\', Helvetica, sans-serif;\n  font-weight: 400;\n  font-size: 0.875em;\n  line-height: 1.71429;\n\n  *,\n  *:before,\n  *:after {\n    -webkit-box-sizing: border-box;\n    -moz-box-sizing: border-box;\n    box-sizing: border-box;\n  }\n\n  ul {\n    margin: 0;\n    padding: 0;\n  }\n\n  li {\n    margin: 0;\n  }\n\n  a {\n    text-decoration: none;\n    color: ', ';\n  }\n']); // Copyright (c) 2018 Uber Technologies, Inc.
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

var _window = require('global/window');

var _redux = require('redux');

var _d3Request = require('d3-request');

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _keplerglConnect = require('../connect/keplergl-connect');

var _visStateActions = require('../actions/vis-state-actions');

var VisStateActions = _interopRequireWildcard(_visStateActions);

var _mapStateActions = require('../actions/map-state-actions');

var MapStateActions = _interopRequireWildcard(_mapStateActions);

var _mapStyleActions = require('../actions/map-style-actions');

var MapStyleActions = _interopRequireWildcard(_mapStyleActions);

var _uiStateActions = require('../actions/ui-state-actions');

var UIStateActions = _interopRequireWildcard(_uiStateActions);

var _defaultSettings = require('../constants/default-settings');

var _sidePanel = require('./side-panel');

var _sidePanel2 = _interopRequireDefault(_sidePanel);

var _mapContainer = require('./map-container');

var _mapContainer2 = _interopRequireDefault(_mapContainer);

var _bottomWidget = require('./bottom-widget');

var _bottomWidget2 = _interopRequireDefault(_bottomWidget);

var _modalContainer = require('./modal-container');

var _modalContainer2 = _interopRequireDefault(_modalContainer);

var _plotContainer = require('./plot-container');

var _plotContainer2 = _interopRequireDefault(_plotContainer);

var _utils = require('../utils/utils');

var _base = require('../styles/base');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GlobalStyle = _styledComponents2.default.div(_templateObject, function (props) {
  return props.theme.labelColor;
});

var keplerGlChildDeps = exports.keplerGlChildDeps = [].concat((0, _toConsumableArray3.default)(_bottomWidget2.default.deps), (0, _toConsumableArray3.default)(_sidePanel2.default.deps), (0, _toConsumableArray3.default)(_modalContainer2.default.deps), (0, _toConsumableArray3.default)(_mapContainer2.default.deps));

KeplerGlFactory.deps = [_bottomWidget2.default, _mapContainer2.default, _modalContainer2.default, _sidePanel2.default, _plotContainer2.default];

function KeplerGlFactory(BottomWidget, MapContainer, ModalWrapper, SidePanel, PlotContainer) {
  var _class, _temp2;

  var KeplerGL = (_temp2 = _class = function (_Component) {
    (0, _inherits3.default)(KeplerGL, _Component);

    function KeplerGL() {
      var _ref;

      var _temp, _this, _ret;

      (0, _classCallCheck3.default)(this, KeplerGL);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = KeplerGL.__proto__ || Object.getPrototypeOf(KeplerGL)).call.apply(_ref, [this].concat(args))), _this), _this._loadMapStyle = function () {
        var defaultStyles = Object.values(_this.props.mapStyle.mapStyles);
        // add id to custom map styles if not given
        var customeStyles = (_this.props.mapStyles || []).map(function (ms) {
          return (0, _extends3.default)({}, ms, {
            id: ms.id || (0, _utils.generateHashId)()
          });
        });

        [].concat((0, _toConsumableArray3.default)(customeStyles), (0, _toConsumableArray3.default)(defaultStyles)).forEach(function (style) {
          if (style.style) {
            _this.props.mapStyleActions.loadMapStyles((0, _defineProperty3.default)({}, style.id, style));
          } else {
            _this._requestMapStyle(style);
          }
        });
      }, _this._requestMapStyle = function (mapStyle) {
        var url = mapStyle.url,
            id = mapStyle.id;

        (0, _d3Request.json)(url, function (error, result) {
          if (error) {
            _window.console.warn('Error loading map style ' + mapStyle.url);
          } else {
            _this.props.mapStyleActions.loadMapStyles((0, _defineProperty3.default)({}, id, (0, _extends3.default)({}, mapStyle, { style: result })));
          }
        });
      }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
    }

    (0, _createClass3.default)(KeplerGL, [{
      key: 'componentWillMount',
      value: function componentWillMount() {
        this._loadMapStyle(this.props.mapStyles);
        this._handleResize(this.props);
      }
    }, {
      key: 'componentWillReceiveProps',
      value: function componentWillReceiveProps(nextProps) {
        if (
        // if dimension props has changed
        this.props.height !== nextProps.height || this.props.width !== nextProps.width ||
        // react-map-gl will dispatch updateViewport after this._handleResize is called
        // here we check if this.props.mapState.height is sync with props.height
        nextProps.height !== this.props.mapState.height) {
          this._handleResize(nextProps);
        }
      }
    }, {
      key: '_handleResize',
      value: function _handleResize(_ref2) {
        var width = _ref2.width,
            height = _ref2.height;

        if (!Number.isFinite(width) || !Number.isFinite(height)) {
          _window.console.warn('width and height is required');
          return;
        }
        this.props.mapStateActions.updateMap({
          width: width / (1 + Number(this.props.mapState.isSplit)),
          height: height
        });
      }
    }, {
      key: 'render',
      value: function render() {
        var _this2 = this;

        var _props = this.props,
            id = _props.id,
            appName = _props.appName,
            version = _props.version,
            onSaveMap = _props.onSaveMap,
            width = _props.width,
            height = _props.height,
            mapboxApiAccessToken = _props.mapboxApiAccessToken,
            mapStyle = _props.mapStyle,
            mapState = _props.mapState,
            uiState = _props.uiState,
            visState = _props.visState,
            visStateActions = _props.visStateActions,
            mapStateActions = _props.mapStateActions,
            mapStyleActions = _props.mapStyleActions,
            uiStateActions = _props.uiStateActions;
        var filters = visState.filters,
            layers = visState.layers,
            splitMaps = visState.splitMaps,
            layerOrder = visState.layerOrder,
            layerBlending = visState.layerBlending,
            layerClasses = visState.layerClasses,
            interactionConfig = visState.interactionConfig,
            datasets = visState.datasets,
            layerData = visState.layerData,
            hoverInfo = visState.hoverInfo,
            clicked = visState.clicked;


        var sideFields = {
          appName: appName,
          version: version,
          datasets: datasets,
          filters: filters,
          layers: layers,
          layerOrder: layerOrder,
          layerClasses: layerClasses,
          interactionConfig: interactionConfig,
          mapStyle: mapStyle,
          layerBlending: layerBlending,
          onSaveMap: onSaveMap,
          uiState: uiState,
          mapStyleActions: mapStyleActions,
          visStateActions: visStateActions,
          uiStateActions: uiStateActions,
          width: _defaultSettings.DIMENSIONS.sidePanel.width
        };

        var mapFields = {
          datasets: datasets,
          mapboxApiAccessToken: mapboxApiAccessToken,
          mapState: mapState,
          mapStyle: mapStyle,
          mapControls: uiState.mapControls,
          layers: layers,
          layerOrder: layerOrder,
          layerData: layerData,
          layerBlending: layerBlending,
          interactionConfig: interactionConfig,
          hoverInfo: hoverInfo,
          clicked: clicked,
          toggleMapControl: uiStateActions.toggleMapControl,
          uiStateActions: uiStateActions,
          visStateActions: visStateActions,
          mapStateActions: mapStateActions
        };

        var isSplit = splitMaps && splitMaps.length > 1;
        var containerW = mapState.width * (Number(isSplit) + 1);

        var mapContainers = !isSplit ? [_react2.default.createElement(MapContainer, (0, _extends3.default)({
          key: 0,
          index: 0
        }, mapFields, {
          mapLayers: isSplit ? splitMaps[0].layers : null
        }))] : splitMaps.map(function (settings, index) {
          return _react2.default.createElement(MapContainer, (0, _extends3.default)({
            key: index,
            index: index
          }, mapFields, {
            mapLayers: splitMaps[index].layers
          }));
        });

        var isExporting = uiState.currentModal === _defaultSettings.EXPORT_IMAGE_ID;

        return _react2.default.createElement(
          _styledComponents.ThemeProvider,
          { theme: _base.theme },
          _react2.default.createElement(
            GlobalStyle,
            {
              style: {
                position: 'relative',
                width: width + 'px',
                height: height + 'px'
              },
              className: 'kepler-gl',
              id: 'kepler-gl__' + id,
              innerRef: function innerRef(node) {
                _this2.root = node;
              }
            },
            !uiState.readOnly && _react2.default.createElement(SidePanel, sideFields),
            _react2.default.createElement(
              'div',
              { className: 'maps', style: { display: 'flex' } },
              mapContainers
            ),
            isExporting && _react2.default.createElement(PlotContainer, {
              width: width,
              height: height,
              exportImageSetting: uiState.exportImage,
              mapFields: mapFields,
              startExportingImage: uiStateActions.startExportingImage,
              setExportImageDataUri: uiStateActions.setExportImageDataUri
            }),
            _react2.default.createElement(BottomWidget, {
              filters: filters,
              datasets: datasets,
              uiState: uiState,
              visStateActions: visStateActions,
              sidePanelWidth: _defaultSettings.DIMENSIONS.sidePanel.width + _defaultSettings.DIMENSIONS.sidePanel.margin.left,
              containerW: containerW
            }),
            _react2.default.createElement(ModalWrapper, {
              mapStyle: mapStyle,
              visState: visState,
              mapState: mapState,
              uiState: uiState,
              mapboxApiAccessToken: mapboxApiAccessToken,
              visStateActions: visStateActions,
              uiStateActions: uiStateActions,
              mapStyleActions: mapStyleActions,
              rootNode: this.root,
              containerW: containerW,
              containerH: mapState.height
            })
          )
        );
      }
    }]);
    return KeplerGL;
  }(_react.Component), _class.defaultProps = {
    mapStyles: [],
    width: 800,
    height: 800,
    appName: _defaultSettings.KEPLER_GL_NAME,
    version: _defaultSettings.KEPLER_GL_VERSION
  }, _temp2);


  return (0, _keplerglConnect.connect)(mapStateToProps, mapDispatchToProps)(KeplerGL);
}

function mapStateToProps(state, props) {
  return (0, _extends3.default)({}, props, {
    visState: state.visState,
    mapStyle: state.mapStyle,
    mapState: state.mapState,
    uiState: state.uiState
  });
}

function mapDispatchToProps(dispatch, ownProps) {
  var userActions = ownProps.actions || {};

  var _map = [VisStateActions, MapStateActions, MapStyleActions, UIStateActions].map(function (actions) {
    return (0, _redux.bindActionCreators)(mergeActions(actions, userActions), dispatch);
  }),
      _map2 = (0, _slicedToArray3.default)(_map, 4),
      visStateActions = _map2[0],
      mapStateActions = _map2[1],
      mapStyleActions = _map2[2],
      uiStateActions = _map2[3];

  return {
    visStateActions: visStateActions,
    mapStateActions: mapStateActions,
    mapStyleActions: mapStyleActions,
    uiStateActions: uiStateActions,
    dispatch: dispatch
  };
}

/**
 * Override default maps-gl actions with user defined actions using the same key
 */
function mergeActions(actions, userActions) {
  var overrides = {};
  for (var key in userActions) {
    if (userActions.hasOwnProperty(key) && actions.hasOwnProperty(key)) {
      overrides[key] = userActions[key];
    }
  }

  return (0, _extends3.default)({}, actions, overrides);
}

exports.default = KeplerGlFactory;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL2tlcGxlci1nbC5qcyJdLCJuYW1lcyI6WyJWaXNTdGF0ZUFjdGlvbnMiLCJNYXBTdGF0ZUFjdGlvbnMiLCJNYXBTdHlsZUFjdGlvbnMiLCJVSVN0YXRlQWN0aW9ucyIsIkdsb2JhbFN0eWxlIiwic3R5bGVkIiwiZGl2IiwicHJvcHMiLCJ0aGVtZSIsImxhYmVsQ29sb3IiLCJrZXBsZXJHbENoaWxkRGVwcyIsIkJvdHRvbVdpZGdldEZhY3RvcnkiLCJkZXBzIiwiU2lkZVBhbmVsRmFjdG9yeSIsIk1vZGFsQ29udGFpbmVyRmFjdG9yeSIsIk1hcENvbnRhaW5lckZhY3RvcnkiLCJLZXBsZXJHbEZhY3RvcnkiLCJQbG90Q29udGFpbmVyRmFjdG9yeSIsIkJvdHRvbVdpZGdldCIsIk1hcENvbnRhaW5lciIsIk1vZGFsV3JhcHBlciIsIlNpZGVQYW5lbCIsIlBsb3RDb250YWluZXIiLCJLZXBsZXJHTCIsIl9sb2FkTWFwU3R5bGUiLCJkZWZhdWx0U3R5bGVzIiwiT2JqZWN0IiwidmFsdWVzIiwibWFwU3R5bGUiLCJtYXBTdHlsZXMiLCJjdXN0b21lU3R5bGVzIiwibWFwIiwibXMiLCJpZCIsImZvckVhY2giLCJzdHlsZSIsIm1hcFN0eWxlQWN0aW9ucyIsImxvYWRNYXBTdHlsZXMiLCJfcmVxdWVzdE1hcFN0eWxlIiwidXJsIiwiZXJyb3IiLCJyZXN1bHQiLCJDb25zb2xlIiwid2FybiIsIl9oYW5kbGVSZXNpemUiLCJuZXh0UHJvcHMiLCJoZWlnaHQiLCJ3aWR0aCIsIm1hcFN0YXRlIiwiTnVtYmVyIiwiaXNGaW5pdGUiLCJtYXBTdGF0ZUFjdGlvbnMiLCJ1cGRhdGVNYXAiLCJpc1NwbGl0IiwiYXBwTmFtZSIsInZlcnNpb24iLCJvblNhdmVNYXAiLCJtYXBib3hBcGlBY2Nlc3NUb2tlbiIsInVpU3RhdGUiLCJ2aXNTdGF0ZSIsInZpc1N0YXRlQWN0aW9ucyIsInVpU3RhdGVBY3Rpb25zIiwiZmlsdGVycyIsImxheWVycyIsInNwbGl0TWFwcyIsImxheWVyT3JkZXIiLCJsYXllckJsZW5kaW5nIiwibGF5ZXJDbGFzc2VzIiwiaW50ZXJhY3Rpb25Db25maWciLCJkYXRhc2V0cyIsImxheWVyRGF0YSIsImhvdmVySW5mbyIsImNsaWNrZWQiLCJzaWRlRmllbGRzIiwiRElNRU5TSU9OUyIsInNpZGVQYW5lbCIsIm1hcEZpZWxkcyIsIm1hcENvbnRyb2xzIiwidG9nZ2xlTWFwQ29udHJvbCIsImxlbmd0aCIsImNvbnRhaW5lclciLCJtYXBDb250YWluZXJzIiwic2V0dGluZ3MiLCJpbmRleCIsImlzRXhwb3J0aW5nIiwiY3VycmVudE1vZGFsIiwiRVhQT1JUX0lNQUdFX0lEIiwicG9zaXRpb24iLCJyb290Iiwibm9kZSIsInJlYWRPbmx5IiwiZGlzcGxheSIsImV4cG9ydEltYWdlIiwic3RhcnRFeHBvcnRpbmdJbWFnZSIsInNldEV4cG9ydEltYWdlRGF0YVVyaSIsIm1hcmdpbiIsImxlZnQiLCJDb21wb25lbnQiLCJkZWZhdWx0UHJvcHMiLCJLRVBMRVJfR0xfTkFNRSIsIktFUExFUl9HTF9WRVJTSU9OIiwibWFwU3RhdGVUb1Byb3BzIiwibWFwRGlzcGF0Y2hUb1Byb3BzIiwic3RhdGUiLCJkaXNwYXRjaCIsIm93blByb3BzIiwidXNlckFjdGlvbnMiLCJhY3Rpb25zIiwibWVyZ2VBY3Rpb25zIiwib3ZlcnJpZGVzIiwia2V5IiwiaGFzT3duUHJvcGVydHkiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7MDVCQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7QUFFQTs7SUFBWUEsZTs7QUFDWjs7SUFBWUMsZTs7QUFDWjs7SUFBWUMsZTs7QUFDWjs7SUFBWUMsYzs7QUFFWjs7QUFHQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBRUE7O0FBRUE7Ozs7OztBQUVBLElBQU1DLGNBQWNDLDJCQUFPQyxHQUFyQixrQkF5Qk87QUFBQSxTQUFTQyxNQUFNQyxLQUFOLENBQVlDLFVBQXJCO0FBQUEsQ0F6QlAsQ0FBTjs7QUE2Qk8sSUFBTUMsMkZBQ1JDLHVCQUFvQkMsSUFEWixvQ0FFUkMsb0JBQWlCRCxJQUZULG9DQUdSRSx5QkFBc0JGLElBSGQsb0NBSVJHLHVCQUFvQkgsSUFKWixFQUFOOztBQU9QSSxnQkFBZ0JKLElBQWhCLEdBQXVCLENBQ3JCRCxzQkFEcUIsRUFFckJJLHNCQUZxQixFQUdyQkQsd0JBSHFCLEVBSXJCRCxtQkFKcUIsRUFLckJJLHVCQUxxQixDQUF2Qjs7QUFRQSxTQUFTRCxlQUFULENBQ0VFLFlBREYsRUFFRUMsWUFGRixFQUdFQyxZQUhGLEVBSUVDLFNBSkYsRUFLRUMsYUFMRixFQU1FO0FBQUE7O0FBQUEsTUFDTUMsUUFETjtBQUFBOztBQUFBO0FBQUE7O0FBQUE7O0FBQUE7O0FBQUE7QUFBQTtBQUFBOztBQUFBLDBNQXVDRUMsYUF2Q0YsR0F1Q2tCLFlBQU07QUFDcEIsWUFBTUMsZ0JBQWdCQyxPQUFPQyxNQUFQLENBQWMsTUFBS3BCLEtBQUwsQ0FBV3FCLFFBQVgsQ0FBb0JDLFNBQWxDLENBQXRCO0FBQ0E7QUFDQSxZQUFNQyxnQkFBZ0IsQ0FBQyxNQUFLdkIsS0FBTCxDQUFXc0IsU0FBWCxJQUF3QixFQUF6QixFQUE2QkUsR0FBN0IsQ0FBaUM7QUFBQSw0Q0FDbERDLEVBRGtEO0FBRXJEQyxnQkFBSUQsR0FBR0MsRUFBSCxJQUFTO0FBRndDO0FBQUEsU0FBakMsQ0FBdEI7O0FBS0EsbURBQUlILGFBQUosb0NBQXNCTCxhQUF0QixHQUFxQ1MsT0FBckMsQ0FDRSxpQkFBUztBQUNQLGNBQUlDLE1BQU1BLEtBQVYsRUFBaUI7QUFDZixrQkFBSzVCLEtBQUwsQ0FBVzZCLGVBQVgsQ0FBMkJDLGFBQTNCLG1DQUNHRixNQUFNRixFQURULEVBQ2NFLEtBRGQ7QUFHRCxXQUpELE1BSU87QUFDTCxrQkFBS0csZ0JBQUwsQ0FBc0JILEtBQXRCO0FBQ0Q7QUFDRixTQVRIO0FBV0QsT0ExREgsUUE0REVHLGdCQTVERixHQTREcUIsVUFBQ1YsUUFBRCxFQUFjO0FBQUEsWUFDeEJXLEdBRHdCLEdBQ2JYLFFBRGEsQ0FDeEJXLEdBRHdCO0FBQUEsWUFDbkJOLEVBRG1CLEdBQ2JMLFFBRGEsQ0FDbkJLLEVBRG1COztBQUUvQiw2QkFBWU0sR0FBWixFQUFpQixVQUFDQyxLQUFELEVBQVFDLE1BQVIsRUFBbUI7QUFDbEMsY0FBSUQsS0FBSixFQUFXO0FBQ1RFLDRCQUFRQyxJQUFSLDhCQUF3Q2YsU0FBU1csR0FBakQ7QUFDRCxXQUZELE1BRU87QUFDTCxrQkFBS2hDLEtBQUwsQ0FBVzZCLGVBQVgsQ0FBMkJDLGFBQTNCLG1DQUNHSixFQURILDZCQUNZTCxRQURaLElBQ3NCTyxPQUFPTSxNQUQ3QjtBQUdEO0FBQ0YsU0FSRDtBQVNELE9BdkVIO0FBQUE7O0FBQUE7QUFBQTtBQUFBLDJDQVV1QjtBQUNuQixhQUFLakIsYUFBTCxDQUFtQixLQUFLakIsS0FBTCxDQUFXc0IsU0FBOUI7QUFDQSxhQUFLZSxhQUFMLENBQW1CLEtBQUtyQyxLQUF4QjtBQUNEO0FBYkg7QUFBQTtBQUFBLGdEQWU0QnNDLFNBZjVCLEVBZXVDO0FBQ25DO0FBQ0U7QUFDQSxhQUFLdEMsS0FBTCxDQUFXdUMsTUFBWCxLQUFzQkQsVUFBVUMsTUFBaEMsSUFDQSxLQUFLdkMsS0FBTCxDQUFXd0MsS0FBWCxLQUFxQkYsVUFBVUUsS0FEL0I7QUFFQTtBQUNBO0FBQ0FGLGtCQUFVQyxNQUFWLEtBQXFCLEtBQUt2QyxLQUFMLENBQVd5QyxRQUFYLENBQW9CRixNQU4zQyxFQU9FO0FBQ0EsZUFBS0YsYUFBTCxDQUFtQkMsU0FBbkI7QUFDRDtBQUNGO0FBMUJIO0FBQUE7QUFBQSwyQ0E0QmlDO0FBQUEsWUFBaEJFLEtBQWdCLFNBQWhCQSxLQUFnQjtBQUFBLFlBQVRELE1BQVMsU0FBVEEsTUFBUzs7QUFDN0IsWUFBSSxDQUFDRyxPQUFPQyxRQUFQLENBQWdCSCxLQUFoQixDQUFELElBQTJCLENBQUNFLE9BQU9DLFFBQVAsQ0FBZ0JKLE1BQWhCLENBQWhDLEVBQXlEO0FBQ3ZESiwwQkFBUUMsSUFBUixDQUFhLDhCQUFiO0FBQ0E7QUFDRDtBQUNELGFBQUtwQyxLQUFMLENBQVc0QyxlQUFYLENBQTJCQyxTQUEzQixDQUFxQztBQUNuQ0wsaUJBQU9BLFNBQVMsSUFBSUUsT0FBTyxLQUFLMUMsS0FBTCxDQUFXeUMsUUFBWCxDQUFvQkssT0FBM0IsQ0FBYixDQUQ0QjtBQUVuQ1A7QUFGbUMsU0FBckM7QUFJRDtBQXJDSDtBQUFBO0FBQUEsK0JBeUVXO0FBQUE7O0FBQUEscUJBc0JILEtBQUt2QyxLQXRCRjtBQUFBLFlBR0wwQixFQUhLLFVBR0xBLEVBSEs7QUFBQSxZQUlMcUIsT0FKSyxVQUlMQSxPQUpLO0FBQUEsWUFLTEMsT0FMSyxVQUtMQSxPQUxLO0FBQUEsWUFNTEMsU0FOSyxVQU1MQSxTQU5LO0FBQUEsWUFPTFQsS0FQSyxVQU9MQSxLQVBLO0FBQUEsWUFRTEQsTUFSSyxVQVFMQSxNQVJLO0FBQUEsWUFTTFcsb0JBVEssVUFTTEEsb0JBVEs7QUFBQSxZQVlMN0IsUUFaSyxVQVlMQSxRQVpLO0FBQUEsWUFhTG9CLFFBYkssVUFhTEEsUUFiSztBQUFBLFlBY0xVLE9BZEssVUFjTEEsT0FkSztBQUFBLFlBZUxDLFFBZkssVUFlTEEsUUFmSztBQUFBLFlBa0JMQyxlQWxCSyxVQWtCTEEsZUFsQks7QUFBQSxZQW1CTFQsZUFuQkssVUFtQkxBLGVBbkJLO0FBQUEsWUFvQkxmLGVBcEJLLFVBb0JMQSxlQXBCSztBQUFBLFlBcUJMeUIsY0FyQkssVUFxQkxBLGNBckJLO0FBQUEsWUF5QkxDLE9BekJLLEdBb0NISCxRQXBDRyxDQXlCTEcsT0F6Qks7QUFBQSxZQTBCTEMsTUExQkssR0FvQ0hKLFFBcENHLENBMEJMSSxNQTFCSztBQUFBLFlBMkJMQyxTQTNCSyxHQW9DSEwsUUFwQ0csQ0EyQkxLLFNBM0JLO0FBQUEsWUE0QkxDLFVBNUJLLEdBb0NITixRQXBDRyxDQTRCTE0sVUE1Qks7QUFBQSxZQTZCTEMsYUE3QkssR0FvQ0hQLFFBcENHLENBNkJMTyxhQTdCSztBQUFBLFlBOEJMQyxZQTlCSyxHQW9DSFIsUUFwQ0csQ0E4QkxRLFlBOUJLO0FBQUEsWUErQkxDLGlCQS9CSyxHQW9DSFQsUUFwQ0csQ0ErQkxTLGlCQS9CSztBQUFBLFlBZ0NMQyxRQWhDSyxHQW9DSFYsUUFwQ0csQ0FnQ0xVLFFBaENLO0FBQUEsWUFpQ0xDLFNBakNLLEdBb0NIWCxRQXBDRyxDQWlDTFcsU0FqQ0s7QUFBQSxZQWtDTEMsU0FsQ0ssR0FvQ0haLFFBcENHLENBa0NMWSxTQWxDSztBQUFBLFlBbUNMQyxPQW5DSyxHQW9DSGIsUUFwQ0csQ0FtQ0xhLE9BbkNLOzs7QUFzQ1AsWUFBTUMsYUFBYTtBQUNqQm5CLDBCQURpQjtBQUVqQkMsMEJBRmlCO0FBR2pCYyw0QkFIaUI7QUFJakJQLDBCQUppQjtBQUtqQkMsd0JBTGlCO0FBTWpCRSxnQ0FOaUI7QUFPakJFLG9DQVBpQjtBQVFqQkMsOENBUmlCO0FBU2pCeEMsNEJBVGlCO0FBVWpCc0Msc0NBVmlCO0FBV2pCViw4QkFYaUI7QUFZakJFLDBCQVppQjtBQWFqQnRCLDBDQWJpQjtBQWNqQndCLDBDQWRpQjtBQWVqQkMsd0NBZmlCO0FBZ0JqQmQsaUJBQU8yQiw0QkFBV0MsU0FBWCxDQUFxQjVCO0FBaEJYLFNBQW5COztBQW1CQSxZQUFNNkIsWUFBWTtBQUNoQlAsNEJBRGdCO0FBRWhCWixvREFGZ0I7QUFHaEJULDRCQUhnQjtBQUloQnBCLDRCQUpnQjtBQUtoQmlELHVCQUFhbkIsUUFBUW1CLFdBTEw7QUFNaEJkLHdCQU5nQjtBQU9oQkUsZ0NBUGdCO0FBUWhCSyw4QkFSZ0I7QUFTaEJKLHNDQVRnQjtBQVVoQkUsOENBVmdCO0FBV2hCRyw4QkFYZ0I7QUFZaEJDLDBCQVpnQjtBQWFoQk0sNEJBQWtCakIsZUFBZWlCLGdCQWJqQjtBQWNoQmpCLHdDQWRnQjtBQWVoQkQsMENBZmdCO0FBZ0JoQlQ7QUFoQmdCLFNBQWxCOztBQW1CQSxZQUFNRSxVQUFVVyxhQUFhQSxVQUFVZSxNQUFWLEdBQW1CLENBQWhEO0FBQ0EsWUFBTUMsYUFBYWhDLFNBQVNELEtBQVQsSUFBa0JFLE9BQU9JLE9BQVAsSUFBa0IsQ0FBcEMsQ0FBbkI7O0FBRUEsWUFBTTRCLGdCQUFnQixDQUFDNUIsT0FBRCxHQUNsQixDQUNFLDhCQUFDLFlBQUQ7QUFDRSxlQUFLLENBRFA7QUFFRSxpQkFBTztBQUZULFdBR011QixTQUhOO0FBSUUscUJBQVd2QixVQUFVVyxVQUFVLENBQVYsRUFBYUQsTUFBdkIsR0FBZ0M7QUFKN0MsV0FERixDQURrQixHQVNsQkMsVUFBVWpDLEdBQVYsQ0FBYyxVQUFDbUQsUUFBRCxFQUFXQyxLQUFYO0FBQUEsaUJBQ1osOEJBQUMsWUFBRDtBQUNFLGlCQUFLQSxLQURQO0FBRUUsbUJBQU9BO0FBRlQsYUFHTVAsU0FITjtBQUlFLHVCQUFXWixVQUFVbUIsS0FBVixFQUFpQnBCO0FBSjlCLGFBRFk7QUFBQSxTQUFkLENBVEo7O0FBa0JBLFlBQU1xQixjQUFjMUIsUUFBUTJCLFlBQVIsS0FBeUJDLGdDQUE3Qzs7QUFFQSxlQUNFO0FBQUMseUNBQUQ7QUFBQSxZQUFlLE9BQU85RSxXQUF0QjtBQUNFO0FBQUMsdUJBQUQ7QUFBQTtBQUNFLHFCQUFPO0FBQ0wrRSwwQkFBVSxVQURMO0FBRUx4Qyx1QkFBVUEsS0FBVixPQUZLO0FBR0xELHdCQUFXQSxNQUFYO0FBSEssZUFEVDtBQU1FLHlCQUFVLFdBTlo7QUFPRSxrQ0FBa0JiLEVBUHBCO0FBUUUsd0JBQVUsd0JBQVE7QUFDaEIsdUJBQUt1RCxJQUFMLEdBQVlDLElBQVo7QUFDRDtBQVZIO0FBWUcsYUFBQy9CLFFBQVFnQyxRQUFULElBQXFCLDhCQUFDLFNBQUQsRUFBZWpCLFVBQWYsQ0FaeEI7QUFhRTtBQUFBO0FBQUEsZ0JBQUssV0FBVSxNQUFmLEVBQXNCLE9BQU8sRUFBQ2tCLFNBQVMsTUFBVixFQUE3QjtBQUNHVjtBQURILGFBYkY7QUFnQkdHLDJCQUNDLDhCQUFDLGFBQUQ7QUFDRSxxQkFBT3JDLEtBRFQ7QUFFRSxzQkFBUUQsTUFGVjtBQUdFLGtDQUFvQlksUUFBUWtDLFdBSDlCO0FBSUUseUJBQVdoQixTQUpiO0FBS0UsbUNBQXFCZixlQUFlZ0MsbUJBTHRDO0FBTUUscUNBQXVCaEMsZUFBZWlDO0FBTnhDLGNBakJKO0FBMEJFLDBDQUFDLFlBQUQ7QUFDRSx1QkFBU2hDLE9BRFg7QUFFRSx3QkFBVU8sUUFGWjtBQUdFLHVCQUFTWCxPQUhYO0FBSUUsK0JBQWlCRSxlQUpuQjtBQUtFLDhCQUNFYyw0QkFBV0MsU0FBWCxDQUFxQjVCLEtBQXJCLEdBQTZCMkIsNEJBQVdDLFNBQVgsQ0FBcUJvQixNQUFyQixDQUE0QkMsSUFON0Q7QUFRRSwwQkFBWWhCO0FBUmQsY0ExQkY7QUFvQ0UsMENBQUMsWUFBRDtBQUNFLHdCQUFVcEQsUUFEWjtBQUVFLHdCQUFVK0IsUUFGWjtBQUdFLHdCQUFVWCxRQUhaO0FBSUUsdUJBQVNVLE9BSlg7QUFLRSxvQ0FBc0JELG9CQUx4QjtBQU1FLCtCQUFpQkcsZUFObkI7QUFPRSw4QkFBZ0JDLGNBUGxCO0FBUUUsK0JBQWlCekIsZUFSbkI7QUFTRSx3QkFBVSxLQUFLb0QsSUFUakI7QUFVRSwwQkFBWVIsVUFWZDtBQVdFLDBCQUFZaEMsU0FBU0Y7QUFYdkI7QUFwQ0Y7QUFERixTQURGO0FBc0REO0FBbE9IO0FBQUE7QUFBQSxJQUN1Qm1ELGdCQUR2QixVQUVTQyxZQUZULEdBRXdCO0FBQ3BCckUsZUFBVyxFQURTO0FBRXBCa0IsV0FBTyxHQUZhO0FBR3BCRCxZQUFRLEdBSFk7QUFJcEJRLGFBQVM2QywrQkFKVztBQUtwQjVDLGFBQVM2QztBQUxXLEdBRnhCOzs7QUFxT0EsU0FBTyw4QkFBZ0JDLGVBQWhCLEVBQWlDQyxrQkFBakMsRUFBcUQvRSxRQUFyRCxDQUFQO0FBQ0Q7O0FBRUQsU0FBUzhFLGVBQVQsQ0FBeUJFLEtBQXpCLEVBQWdDaEcsS0FBaEMsRUFBdUM7QUFDckMsb0NBQ0tBLEtBREw7QUFFRW9ELGNBQVU0QyxNQUFNNUMsUUFGbEI7QUFHRS9CLGNBQVUyRSxNQUFNM0UsUUFIbEI7QUFJRW9CLGNBQVV1RCxNQUFNdkQsUUFKbEI7QUFLRVUsYUFBUzZDLE1BQU03QztBQUxqQjtBQU9EOztBQUVELFNBQVM0QyxrQkFBVCxDQUE0QkUsUUFBNUIsRUFBc0NDLFFBQXRDLEVBQWdEO0FBQzlDLE1BQU1DLGNBQWNELFNBQVNFLE9BQVQsSUFBb0IsRUFBeEM7O0FBRDhDLGFBUTFDLENBQ0YzRyxlQURFLEVBRUZDLGVBRkUsRUFHRkMsZUFIRSxFQUlGQyxjQUpFLEVBS0Y0QixHQUxFLENBS0U7QUFBQSxXQUNKLCtCQUFtQjZFLGFBQWFELE9BQWIsRUFBc0JELFdBQXRCLENBQW5CLEVBQXVERixRQUF2RCxDQURJO0FBQUEsR0FMRixDQVIwQztBQUFBO0FBQUEsTUFJNUM1QyxlQUo0QztBQUFBLE1BSzVDVCxlQUw0QztBQUFBLE1BTTVDZixlQU40QztBQUFBLE1BTzVDeUIsY0FQNEM7O0FBaUI5QyxTQUFPO0FBQ0xELG9DQURLO0FBRUxULG9DQUZLO0FBR0xmLG9DQUhLO0FBSUx5QixrQ0FKSztBQUtMMkM7QUFMSyxHQUFQO0FBT0Q7O0FBRUQ7OztBQUdBLFNBQVNJLFlBQVQsQ0FBc0JELE9BQXRCLEVBQStCRCxXQUEvQixFQUE0QztBQUMxQyxNQUFNRyxZQUFZLEVBQWxCO0FBQ0EsT0FBSyxJQUFNQyxHQUFYLElBQWtCSixXQUFsQixFQUErQjtBQUM3QixRQUFJQSxZQUFZSyxjQUFaLENBQTJCRCxHQUEzQixLQUFtQ0gsUUFBUUksY0FBUixDQUF1QkQsR0FBdkIsQ0FBdkMsRUFBb0U7QUFDbEVELGdCQUFVQyxHQUFWLElBQWlCSixZQUFZSSxHQUFaLENBQWpCO0FBQ0Q7QUFDRjs7QUFFRCxvQ0FBV0gsT0FBWCxFQUF1QkUsU0FBdkI7QUFDRDs7a0JBRWM3RixlIiwiZmlsZSI6ImtlcGxlci1nbC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgMjAxOCBVYmVyIFRlY2hub2xvZ2llcywgSW5jLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbi8vIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbi8vIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbi8vIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbi8vIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuLy8gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuLy8gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4vLyBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbi8vIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbi8vIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4vLyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4vLyBUSEUgU09GVFdBUkUuXG5cbmltcG9ydCBSZWFjdCwge0NvbXBvbmVudH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHtjb25zb2xlIGFzIENvbnNvbGV9IGZyb20gJ2dsb2JhbC93aW5kb3cnO1xuaW1wb3J0IHtiaW5kQWN0aW9uQ3JlYXRvcnN9IGZyb20gJ3JlZHV4JztcbmltcG9ydCB7anNvbiBhcyByZXF1ZXN0SnNvbn0gZnJvbSAnZDMtcmVxdWVzdCc7XG5pbXBvcnQgc3R5bGVkLCB7VGhlbWVQcm92aWRlcn0gIGZyb20gJ3N0eWxlZC1jb21wb25lbnRzJztcbmltcG9ydCB7Y29ubmVjdCBhcyBrZXBsZXJHbENvbm5lY3R9IGZyb20gJy4uL2Nvbm5lY3Qva2VwbGVyZ2wtY29ubmVjdCc7XG5cbmltcG9ydCAqIGFzIFZpc1N0YXRlQWN0aW9ucyBmcm9tICdhY3Rpb25zL3Zpcy1zdGF0ZS1hY3Rpb25zJztcbmltcG9ydCAqIGFzIE1hcFN0YXRlQWN0aW9ucyBmcm9tICdhY3Rpb25zL21hcC1zdGF0ZS1hY3Rpb25zJztcbmltcG9ydCAqIGFzIE1hcFN0eWxlQWN0aW9ucyBmcm9tICdhY3Rpb25zL21hcC1zdHlsZS1hY3Rpb25zJztcbmltcG9ydCAqIGFzIFVJU3RhdGVBY3Rpb25zIGZyb20gJ2FjdGlvbnMvdWktc3RhdGUtYWN0aW9ucyc7XG5cbmltcG9ydCB7RVhQT1JUX0lNQUdFX0lELCBESU1FTlNJT05TLFxuICBLRVBMRVJfR0xfTkFNRSwgS0VQTEVSX0dMX1ZFUlNJT059IGZyb20gJ2NvbnN0YW50cy9kZWZhdWx0LXNldHRpbmdzJztcblxuaW1wb3J0IFNpZGVQYW5lbEZhY3RvcnkgZnJvbSAnLi9zaWRlLXBhbmVsJztcbmltcG9ydCBNYXBDb250YWluZXJGYWN0b3J5IGZyb20gJy4vbWFwLWNvbnRhaW5lcic7XG5pbXBvcnQgQm90dG9tV2lkZ2V0RmFjdG9yeSBmcm9tICcuL2JvdHRvbS13aWRnZXQnO1xuaW1wb3J0IE1vZGFsQ29udGFpbmVyRmFjdG9yeSBmcm9tICcuL21vZGFsLWNvbnRhaW5lcic7XG5pbXBvcnQgUGxvdENvbnRhaW5lckZhY3RvcnkgZnJvbSAnLi9wbG90LWNvbnRhaW5lcic7XG5cbmltcG9ydCB7Z2VuZXJhdGVIYXNoSWR9IGZyb20gJ3V0aWxzL3V0aWxzJztcblxuaW1wb3J0IHt0aGVtZX0gZnJvbSAnc3R5bGVzL2Jhc2UnO1xuXG5jb25zdCBHbG9iYWxTdHlsZSA9IHN0eWxlZC5kaXZgXG4gIGZvbnQtZmFtaWx5OiBmZi1jbGFuLXdlYi1wcm8sICdIZWx2ZXRpY2EgTmV1ZScsIEhlbHZldGljYSwgc2Fucy1zZXJpZjtcbiAgZm9udC13ZWlnaHQ6IDQwMDtcbiAgZm9udC1zaXplOiAwLjg3NWVtO1xuICBsaW5lLWhlaWdodDogMS43MTQyOTtcblxuICAqLFxuICAqOmJlZm9yZSxcbiAgKjphZnRlciB7XG4gICAgLXdlYmtpdC1ib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICAgIC1tb3otYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICB9XG5cbiAgdWwge1xuICAgIG1hcmdpbjogMDtcbiAgICBwYWRkaW5nOiAwO1xuICB9XG5cbiAgbGkge1xuICAgIG1hcmdpbjogMDtcbiAgfVxuXG4gIGEge1xuICAgIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcbiAgICBjb2xvcjogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5sYWJlbENvbG9yfTtcbiAgfVxuYDtcblxuZXhwb3J0IGNvbnN0IGtlcGxlckdsQ2hpbGREZXBzID0gW1xuICAuLi5Cb3R0b21XaWRnZXRGYWN0b3J5LmRlcHMsXG4gIC4uLlNpZGVQYW5lbEZhY3RvcnkuZGVwcyxcbiAgLi4uTW9kYWxDb250YWluZXJGYWN0b3J5LmRlcHMsXG4gIC4uLk1hcENvbnRhaW5lckZhY3RvcnkuZGVwc1xuXTtcblxuS2VwbGVyR2xGYWN0b3J5LmRlcHMgPSBbXG4gIEJvdHRvbVdpZGdldEZhY3RvcnksXG4gIE1hcENvbnRhaW5lckZhY3RvcnksXG4gIE1vZGFsQ29udGFpbmVyRmFjdG9yeSxcbiAgU2lkZVBhbmVsRmFjdG9yeSxcbiAgUGxvdENvbnRhaW5lckZhY3Rvcnlcbl07XG5cbmZ1bmN0aW9uIEtlcGxlckdsRmFjdG9yeShcbiAgQm90dG9tV2lkZ2V0LFxuICBNYXBDb250YWluZXIsXG4gIE1vZGFsV3JhcHBlcixcbiAgU2lkZVBhbmVsLFxuICBQbG90Q29udGFpbmVyXG4pIHtcbiAgY2xhc3MgS2VwbGVyR0wgZXh0ZW5kcyBDb21wb25lbnQge1xuICAgIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgICBtYXBTdHlsZXM6IFtdLFxuICAgICAgd2lkdGg6IDgwMCxcbiAgICAgIGhlaWdodDogODAwLFxuICAgICAgYXBwTmFtZTogS0VQTEVSX0dMX05BTUUsXG4gICAgICB2ZXJzaW9uOiBLRVBMRVJfR0xfVkVSU0lPTlxuICAgIH07XG5cbiAgICBjb21wb25lbnRXaWxsTW91bnQoKSB7XG4gICAgICB0aGlzLl9sb2FkTWFwU3R5bGUodGhpcy5wcm9wcy5tYXBTdHlsZXMpO1xuICAgICAgdGhpcy5faGFuZGxlUmVzaXplKHRoaXMucHJvcHMpO1xuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzKSB7XG4gICAgICBpZiAoXG4gICAgICAgIC8vIGlmIGRpbWVuc2lvbiBwcm9wcyBoYXMgY2hhbmdlZFxuICAgICAgICB0aGlzLnByb3BzLmhlaWdodCAhPT0gbmV4dFByb3BzLmhlaWdodCB8fFxuICAgICAgICB0aGlzLnByb3BzLndpZHRoICE9PSBuZXh0UHJvcHMud2lkdGggfHxcbiAgICAgICAgLy8gcmVhY3QtbWFwLWdsIHdpbGwgZGlzcGF0Y2ggdXBkYXRlVmlld3BvcnQgYWZ0ZXIgdGhpcy5faGFuZGxlUmVzaXplIGlzIGNhbGxlZFxuICAgICAgICAvLyBoZXJlIHdlIGNoZWNrIGlmIHRoaXMucHJvcHMubWFwU3RhdGUuaGVpZ2h0IGlzIHN5bmMgd2l0aCBwcm9wcy5oZWlnaHRcbiAgICAgICAgbmV4dFByb3BzLmhlaWdodCAhPT0gdGhpcy5wcm9wcy5tYXBTdGF0ZS5oZWlnaHRcbiAgICAgICkge1xuICAgICAgICB0aGlzLl9oYW5kbGVSZXNpemUobmV4dFByb3BzKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBfaGFuZGxlUmVzaXplKHt3aWR0aCwgaGVpZ2h0fSkge1xuICAgICAgaWYgKCFOdW1iZXIuaXNGaW5pdGUod2lkdGgpIHx8ICFOdW1iZXIuaXNGaW5pdGUoaGVpZ2h0KSkge1xuICAgICAgICBDb25zb2xlLndhcm4oJ3dpZHRoIGFuZCBoZWlnaHQgaXMgcmVxdWlyZWQnKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgdGhpcy5wcm9wcy5tYXBTdGF0ZUFjdGlvbnMudXBkYXRlTWFwKHtcbiAgICAgICAgd2lkdGg6IHdpZHRoIC8gKDEgKyBOdW1iZXIodGhpcy5wcm9wcy5tYXBTdGF0ZS5pc1NwbGl0KSksXG4gICAgICAgIGhlaWdodFxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgX2xvYWRNYXBTdHlsZSA9ICgpID0+IHtcbiAgICAgIGNvbnN0IGRlZmF1bHRTdHlsZXMgPSBPYmplY3QudmFsdWVzKHRoaXMucHJvcHMubWFwU3R5bGUubWFwU3R5bGVzKTtcbiAgICAgIC8vIGFkZCBpZCB0byBjdXN0b20gbWFwIHN0eWxlcyBpZiBub3QgZ2l2ZW5cbiAgICAgIGNvbnN0IGN1c3RvbWVTdHlsZXMgPSAodGhpcy5wcm9wcy5tYXBTdHlsZXMgfHwgW10pLm1hcChtcyA9PiAoe1xuICAgICAgICAuLi5tcyxcbiAgICAgICAgaWQ6IG1zLmlkIHx8IGdlbmVyYXRlSGFzaElkKClcbiAgICAgIH0pKTtcblxuICAgICAgWy4uLmN1c3RvbWVTdHlsZXMsIC4uLmRlZmF1bHRTdHlsZXNdLmZvckVhY2goXG4gICAgICAgIHN0eWxlID0+IHtcbiAgICAgICAgICBpZiAoc3R5bGUuc3R5bGUpIHtcbiAgICAgICAgICAgIHRoaXMucHJvcHMubWFwU3R5bGVBY3Rpb25zLmxvYWRNYXBTdHlsZXMoe1xuICAgICAgICAgICAgICBbc3R5bGUuaWRdOiBzdHlsZVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fcmVxdWVzdE1hcFN0eWxlKHN0eWxlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICk7XG4gICAgfTtcblxuICAgIF9yZXF1ZXN0TWFwU3R5bGUgPSAobWFwU3R5bGUpID0+IHtcbiAgICAgIGNvbnN0IHt1cmwsIGlkfSA9IG1hcFN0eWxlO1xuICAgICAgcmVxdWVzdEpzb24odXJsLCAoZXJyb3IsIHJlc3VsdCkgPT4ge1xuICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICBDb25zb2xlLndhcm4oYEVycm9yIGxvYWRpbmcgbWFwIHN0eWxlICR7bWFwU3R5bGUudXJsfWApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMucHJvcHMubWFwU3R5bGVBY3Rpb25zLmxvYWRNYXBTdHlsZXMoe1xuICAgICAgICAgICAgW2lkXTogey4uLm1hcFN0eWxlLCBzdHlsZTogcmVzdWx0fVxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgcmVuZGVyKCkge1xuICAgICAgY29uc3Qge1xuICAgICAgICAvLyBwcm9wc1xuICAgICAgICBpZCxcbiAgICAgICAgYXBwTmFtZSxcbiAgICAgICAgdmVyc2lvbixcbiAgICAgICAgb25TYXZlTWFwLFxuICAgICAgICB3aWR0aCxcbiAgICAgICAgaGVpZ2h0LFxuICAgICAgICBtYXBib3hBcGlBY2Nlc3NUb2tlbixcblxuICAgICAgICAvLyByZWR1eCBzdGF0ZVxuICAgICAgICBtYXBTdHlsZSxcbiAgICAgICAgbWFwU3RhdGUsXG4gICAgICAgIHVpU3RhdGUsXG4gICAgICAgIHZpc1N0YXRlLFxuXG4gICAgICAgIC8vIGFjdGlvbnMsXG4gICAgICAgIHZpc1N0YXRlQWN0aW9ucyxcbiAgICAgICAgbWFwU3RhdGVBY3Rpb25zLFxuICAgICAgICBtYXBTdHlsZUFjdGlvbnMsXG4gICAgICAgIHVpU3RhdGVBY3Rpb25zXG4gICAgICB9ID0gdGhpcy5wcm9wcztcblxuICAgICAgY29uc3Qge1xuICAgICAgICBmaWx0ZXJzLFxuICAgICAgICBsYXllcnMsXG4gICAgICAgIHNwbGl0TWFwcywgLy8gdGhpcyB3aWxsIHN0b3JlIHN1cHBvcnQgZm9yIHNwbGl0IG1hcCB2aWV3IGlzIG5lY2Vzc2FyeVxuICAgICAgICBsYXllck9yZGVyLFxuICAgICAgICBsYXllckJsZW5kaW5nLFxuICAgICAgICBsYXllckNsYXNzZXMsXG4gICAgICAgIGludGVyYWN0aW9uQ29uZmlnLFxuICAgICAgICBkYXRhc2V0cyxcbiAgICAgICAgbGF5ZXJEYXRhLFxuICAgICAgICBob3ZlckluZm8sXG4gICAgICAgIGNsaWNrZWRcbiAgICAgIH0gPSB2aXNTdGF0ZTtcblxuICAgICAgY29uc3Qgc2lkZUZpZWxkcyA9IHtcbiAgICAgICAgYXBwTmFtZSxcbiAgICAgICAgdmVyc2lvbixcbiAgICAgICAgZGF0YXNldHMsXG4gICAgICAgIGZpbHRlcnMsXG4gICAgICAgIGxheWVycyxcbiAgICAgICAgbGF5ZXJPcmRlcixcbiAgICAgICAgbGF5ZXJDbGFzc2VzLFxuICAgICAgICBpbnRlcmFjdGlvbkNvbmZpZyxcbiAgICAgICAgbWFwU3R5bGUsXG4gICAgICAgIGxheWVyQmxlbmRpbmcsXG4gICAgICAgIG9uU2F2ZU1hcCxcbiAgICAgICAgdWlTdGF0ZSxcbiAgICAgICAgbWFwU3R5bGVBY3Rpb25zLFxuICAgICAgICB2aXNTdGF0ZUFjdGlvbnMsXG4gICAgICAgIHVpU3RhdGVBY3Rpb25zLFxuICAgICAgICB3aWR0aDogRElNRU5TSU9OUy5zaWRlUGFuZWwud2lkdGhcbiAgICAgIH07XG5cbiAgICAgIGNvbnN0IG1hcEZpZWxkcyA9IHtcbiAgICAgICAgZGF0YXNldHMsXG4gICAgICAgIG1hcGJveEFwaUFjY2Vzc1Rva2VuLFxuICAgICAgICBtYXBTdGF0ZSxcbiAgICAgICAgbWFwU3R5bGUsXG4gICAgICAgIG1hcENvbnRyb2xzOiB1aVN0YXRlLm1hcENvbnRyb2xzLFxuICAgICAgICBsYXllcnMsXG4gICAgICAgIGxheWVyT3JkZXIsXG4gICAgICAgIGxheWVyRGF0YSxcbiAgICAgICAgbGF5ZXJCbGVuZGluZyxcbiAgICAgICAgaW50ZXJhY3Rpb25Db25maWcsXG4gICAgICAgIGhvdmVySW5mbyxcbiAgICAgICAgY2xpY2tlZCxcbiAgICAgICAgdG9nZ2xlTWFwQ29udHJvbDogdWlTdGF0ZUFjdGlvbnMudG9nZ2xlTWFwQ29udHJvbCxcbiAgICAgICAgdWlTdGF0ZUFjdGlvbnMsXG4gICAgICAgIHZpc1N0YXRlQWN0aW9ucyxcbiAgICAgICAgbWFwU3RhdGVBY3Rpb25zXG4gICAgICB9O1xuXG4gICAgICBjb25zdCBpc1NwbGl0ID0gc3BsaXRNYXBzICYmIHNwbGl0TWFwcy5sZW5ndGggPiAxO1xuICAgICAgY29uc3QgY29udGFpbmVyVyA9IG1hcFN0YXRlLndpZHRoICogKE51bWJlcihpc1NwbGl0KSArIDEpO1xuXG4gICAgICBjb25zdCBtYXBDb250YWluZXJzID0gIWlzU3BsaXRcbiAgICAgICAgPyBbXG4gICAgICAgICAgICA8TWFwQ29udGFpbmVyXG4gICAgICAgICAgICAgIGtleT17MH1cbiAgICAgICAgICAgICAgaW5kZXg9ezB9XG4gICAgICAgICAgICAgIHsuLi5tYXBGaWVsZHN9XG4gICAgICAgICAgICAgIG1hcExheWVycz17aXNTcGxpdCA/IHNwbGl0TWFwc1swXS5sYXllcnMgOiBudWxsfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICBdXG4gICAgICAgIDogc3BsaXRNYXBzLm1hcCgoc2V0dGluZ3MsIGluZGV4KSA9PiAoXG4gICAgICAgICAgICA8TWFwQ29udGFpbmVyXG4gICAgICAgICAgICAgIGtleT17aW5kZXh9XG4gICAgICAgICAgICAgIGluZGV4PXtpbmRleH1cbiAgICAgICAgICAgICAgey4uLm1hcEZpZWxkc31cbiAgICAgICAgICAgICAgbWFwTGF5ZXJzPXtzcGxpdE1hcHNbaW5kZXhdLmxheWVyc31cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgKSk7XG5cbiAgICAgIGNvbnN0IGlzRXhwb3J0aW5nID0gdWlTdGF0ZS5jdXJyZW50TW9kYWwgPT09IEVYUE9SVF9JTUFHRV9JRDtcblxuICAgICAgcmV0dXJuIChcbiAgICAgICAgPFRoZW1lUHJvdmlkZXIgdGhlbWU9e3RoZW1lfT5cbiAgICAgICAgICA8R2xvYmFsU3R5bGVcbiAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgIHBvc2l0aW9uOiAncmVsYXRpdmUnLFxuICAgICAgICAgICAgICB3aWR0aDogYCR7d2lkdGh9cHhgLFxuICAgICAgICAgICAgICBoZWlnaHQ6IGAke2hlaWdodH1weGBcbiAgICAgICAgICAgIH19XG4gICAgICAgICAgICBjbGFzc05hbWU9XCJrZXBsZXItZ2xcIlxuICAgICAgICAgICAgaWQ9e2BrZXBsZXItZ2xfXyR7aWR9YH1cbiAgICAgICAgICAgIGlubmVyUmVmPXtub2RlID0+IHtcbiAgICAgICAgICAgICAgdGhpcy5yb290ID0gbm9kZTtcbiAgICAgICAgICAgIH19XG4gICAgICAgICAgPlxuICAgICAgICAgICAgeyF1aVN0YXRlLnJlYWRPbmx5ICYmIDxTaWRlUGFuZWwgey4uLnNpZGVGaWVsZHN9IC8+fVxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtYXBzXCIgc3R5bGU9e3tkaXNwbGF5OiAnZmxleCd9fT5cbiAgICAgICAgICAgICAge21hcENvbnRhaW5lcnN9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIHtpc0V4cG9ydGluZyAmJlxuICAgICAgICAgICAgICA8UGxvdENvbnRhaW5lclxuICAgICAgICAgICAgICAgIHdpZHRoPXt3aWR0aH1cbiAgICAgICAgICAgICAgICBoZWlnaHQ9e2hlaWdodH1cbiAgICAgICAgICAgICAgICBleHBvcnRJbWFnZVNldHRpbmc9e3VpU3RhdGUuZXhwb3J0SW1hZ2V9XG4gICAgICAgICAgICAgICAgbWFwRmllbGRzPXttYXBGaWVsZHN9XG4gICAgICAgICAgICAgICAgc3RhcnRFeHBvcnRpbmdJbWFnZT17dWlTdGF0ZUFjdGlvbnMuc3RhcnRFeHBvcnRpbmdJbWFnZX1cbiAgICAgICAgICAgICAgICBzZXRFeHBvcnRJbWFnZURhdGFVcmk9e3VpU3RhdGVBY3Rpb25zLnNldEV4cG9ydEltYWdlRGF0YVVyaX1cbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIDxCb3R0b21XaWRnZXRcbiAgICAgICAgICAgICAgZmlsdGVycz17ZmlsdGVyc31cbiAgICAgICAgICAgICAgZGF0YXNldHM9e2RhdGFzZXRzfVxuICAgICAgICAgICAgICB1aVN0YXRlPXt1aVN0YXRlfVxuICAgICAgICAgICAgICB2aXNTdGF0ZUFjdGlvbnM9e3Zpc1N0YXRlQWN0aW9uc31cbiAgICAgICAgICAgICAgc2lkZVBhbmVsV2lkdGg9e1xuICAgICAgICAgICAgICAgIERJTUVOU0lPTlMuc2lkZVBhbmVsLndpZHRoICsgRElNRU5TSU9OUy5zaWRlUGFuZWwubWFyZ2luLmxlZnRcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBjb250YWluZXJXPXtjb250YWluZXJXfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDxNb2RhbFdyYXBwZXJcbiAgICAgICAgICAgICAgbWFwU3R5bGU9e21hcFN0eWxlfVxuICAgICAgICAgICAgICB2aXNTdGF0ZT17dmlzU3RhdGV9XG4gICAgICAgICAgICAgIG1hcFN0YXRlPXttYXBTdGF0ZX1cbiAgICAgICAgICAgICAgdWlTdGF0ZT17dWlTdGF0ZX1cbiAgICAgICAgICAgICAgbWFwYm94QXBpQWNjZXNzVG9rZW49e21hcGJveEFwaUFjY2Vzc1Rva2VufVxuICAgICAgICAgICAgICB2aXNTdGF0ZUFjdGlvbnM9e3Zpc1N0YXRlQWN0aW9uc31cbiAgICAgICAgICAgICAgdWlTdGF0ZUFjdGlvbnM9e3VpU3RhdGVBY3Rpb25zfVxuICAgICAgICAgICAgICBtYXBTdHlsZUFjdGlvbnM9e21hcFN0eWxlQWN0aW9uc31cbiAgICAgICAgICAgICAgcm9vdE5vZGU9e3RoaXMucm9vdH1cbiAgICAgICAgICAgICAgY29udGFpbmVyVz17Y29udGFpbmVyV31cbiAgICAgICAgICAgICAgY29udGFpbmVySD17bWFwU3RhdGUuaGVpZ2h0fVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA8L0dsb2JhbFN0eWxlPlxuICAgICAgICA8L1RoZW1lUHJvdmlkZXI+XG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBrZXBsZXJHbENvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMpKEtlcGxlckdMKTtcbn1cblxuZnVuY3Rpb24gbWFwU3RhdGVUb1Byb3BzKHN0YXRlLCBwcm9wcykge1xuICByZXR1cm4ge1xuICAgIC4uLnByb3BzLFxuICAgIHZpc1N0YXRlOiBzdGF0ZS52aXNTdGF0ZSxcbiAgICBtYXBTdHlsZTogc3RhdGUubWFwU3R5bGUsXG4gICAgbWFwU3RhdGU6IHN0YXRlLm1hcFN0YXRlLFxuICAgIHVpU3RhdGU6IHN0YXRlLnVpU3RhdGVcbiAgfTtcbn1cblxuZnVuY3Rpb24gbWFwRGlzcGF0Y2hUb1Byb3BzKGRpc3BhdGNoLCBvd25Qcm9wcykge1xuICBjb25zdCB1c2VyQWN0aW9ucyA9IG93blByb3BzLmFjdGlvbnMgfHwge307XG5cbiAgY29uc3QgW1xuICAgIHZpc1N0YXRlQWN0aW9ucyxcbiAgICBtYXBTdGF0ZUFjdGlvbnMsXG4gICAgbWFwU3R5bGVBY3Rpb25zLFxuICAgIHVpU3RhdGVBY3Rpb25zXG4gIF0gPSBbXG4gICAgVmlzU3RhdGVBY3Rpb25zLFxuICAgIE1hcFN0YXRlQWN0aW9ucyxcbiAgICBNYXBTdHlsZUFjdGlvbnMsXG4gICAgVUlTdGF0ZUFjdGlvbnNcbiAgXS5tYXAoYWN0aW9ucyA9PlxuICAgIGJpbmRBY3Rpb25DcmVhdG9ycyhtZXJnZUFjdGlvbnMoYWN0aW9ucywgdXNlckFjdGlvbnMpLCBkaXNwYXRjaClcbiAgKTtcblxuICByZXR1cm4ge1xuICAgIHZpc1N0YXRlQWN0aW9ucyxcbiAgICBtYXBTdGF0ZUFjdGlvbnMsXG4gICAgbWFwU3R5bGVBY3Rpb25zLFxuICAgIHVpU3RhdGVBY3Rpb25zLFxuICAgIGRpc3BhdGNoXG4gIH07XG59XG5cbi8qKlxuICogT3ZlcnJpZGUgZGVmYXVsdCBtYXBzLWdsIGFjdGlvbnMgd2l0aCB1c2VyIGRlZmluZWQgYWN0aW9ucyB1c2luZyB0aGUgc2FtZSBrZXlcbiAqL1xuZnVuY3Rpb24gbWVyZ2VBY3Rpb25zKGFjdGlvbnMsIHVzZXJBY3Rpb25zKSB7XG4gIGNvbnN0IG92ZXJyaWRlcyA9IHt9O1xuICBmb3IgKGNvbnN0IGtleSBpbiB1c2VyQWN0aW9ucykge1xuICAgIGlmICh1c2VyQWN0aW9ucy5oYXNPd25Qcm9wZXJ0eShrZXkpICYmIGFjdGlvbnMuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgb3ZlcnJpZGVzW2tleV0gPSB1c2VyQWN0aW9uc1trZXldO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB7Li4uYWN0aW9ucywgLi4ub3ZlcnJpZGVzfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgS2VwbGVyR2xGYWN0b3J5O1xuIl19