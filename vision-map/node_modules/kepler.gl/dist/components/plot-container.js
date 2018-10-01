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

var _templateObject = (0, _taggedTemplateLiteral3.default)(['\n  .mapboxgl-ctrl-bottom-left,\n  .mapboxgl-ctrl-bottom-right {\n    display: none;\n  }\n'], ['\n  .mapboxgl-ctrl-bottom-left,\n  .mapboxgl-ctrl-bottom-right {\n    display: none;\n  }\n']); // Copyright (c) 2018 Uber Technologies, Inc.
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


exports.default = PlotContainerFactory;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reselect = require('reselect');

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _reactMapGl = require('react-map-gl');

var _lodash = require('lodash.debounce');

var _lodash2 = _interopRequireDefault(_lodash);

var _window = require('global/window');

var _window2 = _interopRequireDefault(_window);

var _mapContainer = require('./map-container');

var _mapContainer2 = _interopRequireDefault(_mapContainer);

var _exportImageUtils = require('../utils/export-image-utils');

var _mapboxGlStyleEditor = require('../utils/map-style-utils/mapbox-gl-style-editor');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var propTypes = {
  width: _propTypes2.default.number.isRequired,
  height: _propTypes2.default.number.isRequired,
  exportImageSetting: _propTypes2.default.object.isRequired,
  mapFields: _propTypes2.default.object.isRequired
};

PlotContainerFactory.deps = [_mapContainer2.default];

var StyledPlotContainer = _styledComponents2.default.div(_templateObject);

function PlotContainerFactory(MapContainer) {
  var _class, _temp, _initialiseProps;

  var PlotContainer = (_temp = _class = function (_Component) {
    (0, _inherits3.default)(PlotContainer, _Component);

    function PlotContainer(props) {
      (0, _classCallCheck3.default)(this, PlotContainer);

      var _this = (0, _possibleConstructorReturn3.default)(this, (PlotContainer.__proto__ || Object.getPrototypeOf(PlotContainer)).call(this, props));

      _initialiseProps.call(_this);

      _this._onMapRender = (0, _lodash2.default)(_this._onMapRender, 500);
      return _this;
    }

    (0, _createClass3.default)(PlotContainer, [{
      key: 'componentWillMount',
      value: function componentWillMount() {
        this.props.startExportingImage();
      }
    }, {
      key: 'componentWillReceiveProps',
      value: function componentWillReceiveProps(newProps) {
        var _this2 = this;

        // re-fetch the new screenshot only when ratio legend or resolution changes
        var checks = ['ratio', 'resolution', 'legend'];
        var shouldRetrieveScreenshot = checks.some(function (item) {
          return _this2.props.exportImageSetting[item] !== newProps.exportImageSetting[item];
        });
        if (shouldRetrieveScreenshot) {
          this._retrieveNewScreenshot();
        }
      }
    }, {
      key: 'render',
      value: function render() {
        var _this3 = this;

        var _props = this.props,
            width = _props.width,
            height = _props.height,
            exportImageSetting = _props.exportImageSetting,
            mapFields = _props.mapFields;
        var ratio = exportImageSetting.ratio,
            resolution = exportImageSetting.resolution,
            legend = exportImageSetting.legend;

        var exportImageSize = (0, _exportImageUtils.calculateExportImageSize)({
          width: width,
          height: height,
          ratio: ratio,
          resolution: resolution
        });

        var mapProps = (0, _extends3.default)({}, mapFields, {
          mapStyle: this.scaledMapStyleSelector(this.props),

          // override viewport based on export settings
          mapState: (0, _extends3.default)({}, mapFields.mapState, exportImageSize, {
            zoom: mapFields.mapState.zoom + exportImageSize.zoomOffset
          }),
          mapControls: {
            // override map legend visibility
            mapLegend: {
              show: legend,
              active: true
            }
          },
          MapComponent: _reactMapGl.StaticMap
        });

        return _react2.default.createElement(
          StyledPlotContainer,
          {
            style: { position: 'absolute', top: -9999, left: -9999 }
          },
          _react2.default.createElement(
            'div',
            {
              ref: function ref(element) {
                _this3.plottingAreaRef = element;
              },
              style: {
                width: exportImageSize.width,
                height: exportImageSize.height
              }
            },
            _react2.default.createElement(MapContainer, (0, _extends3.default)({
              index: 0,
              onMapRender: this._onMapRender,
              isExport: true
            }, mapProps))
          )
        );
      }
    }]);
    return PlotContainer;
  }(_react.Component), _initialiseProps = function _initialiseProps() {
    var _this4 = this;

    this.mapStyleSelector = function (props) {
      return props.mapFields.mapStyle;
    };

    this.resolutionSelector = function (props) {
      return props.exportImageSetting.resolution;
    };

    this.scaledMapStyleSelector = (0, _reselect.createSelector)(this.mapStyleSelector, this.resolutionSelector, function (mapStyle, resolution) {
      return {
        bottomMapStyle: (0, _mapboxGlStyleEditor.scaleMapStyleByResolution)(mapStyle.bottomMapStyle, resolution),
        topMapStyle: (0, _mapboxGlStyleEditor.scaleMapStyleByResolution)(mapStyle.topMapStyle, resolution)
      };
    });

    this._onMapRender = function (map) {
      if (map.isStyleLoaded()) {
        _this4._retrieveNewScreenshot();
      }
    };

    this._retrieveNewScreenshot = function () {
      if (_this4.plottingAreaRef) {
        // setting windowDevicePixelRatio to 1
        // so that large mapbox base map will load in full
        var savedDevicePixelRatio = _window2.default.devicePixelRatio;
        _window2.default.devicePixelRatio = 1;

        _this4.props.startExportingImage();
        (0, _exportImageUtils.convertToPng)(_this4.plottingAreaRef).then(function (dataUri) {
          _this4.props.setExportImageDataUri({ dataUri: dataUri });
          _window2.default.devicePixelRatio = savedDevicePixelRatio;
        });
      }
    };
  }, _temp);


  PlotContainer.propsTypes = propTypes;
  return PlotContainer;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL3Bsb3QtY29udGFpbmVyLmpzIl0sIm5hbWVzIjpbIlBsb3RDb250YWluZXJGYWN0b3J5IiwicHJvcFR5cGVzIiwid2lkdGgiLCJQcm9wVHlwZXMiLCJudW1iZXIiLCJpc1JlcXVpcmVkIiwiaGVpZ2h0IiwiZXhwb3J0SW1hZ2VTZXR0aW5nIiwib2JqZWN0IiwibWFwRmllbGRzIiwiZGVwcyIsIk1hcENvbnRhaW5lckZhY3RvcnkiLCJTdHlsZWRQbG90Q29udGFpbmVyIiwic3R5bGVkIiwiZGl2IiwiTWFwQ29udGFpbmVyIiwiUGxvdENvbnRhaW5lciIsInByb3BzIiwiX29uTWFwUmVuZGVyIiwic3RhcnRFeHBvcnRpbmdJbWFnZSIsIm5ld1Byb3BzIiwiY2hlY2tzIiwic2hvdWxkUmV0cmlldmVTY3JlZW5zaG90Iiwic29tZSIsIml0ZW0iLCJfcmV0cmlldmVOZXdTY3JlZW5zaG90IiwicmF0aW8iLCJyZXNvbHV0aW9uIiwibGVnZW5kIiwiZXhwb3J0SW1hZ2VTaXplIiwibWFwUHJvcHMiLCJtYXBTdHlsZSIsInNjYWxlZE1hcFN0eWxlU2VsZWN0b3IiLCJtYXBTdGF0ZSIsInpvb20iLCJ6b29tT2Zmc2V0IiwibWFwQ29udHJvbHMiLCJtYXBMZWdlbmQiLCJzaG93IiwiYWN0aXZlIiwiTWFwQ29tcG9uZW50IiwiU3RhdGljTWFwIiwicG9zaXRpb24iLCJ0b3AiLCJsZWZ0IiwicGxvdHRpbmdBcmVhUmVmIiwiZWxlbWVudCIsIkNvbXBvbmVudCIsIm1hcFN0eWxlU2VsZWN0b3IiLCJyZXNvbHV0aW9uU2VsZWN0b3IiLCJib3R0b21NYXBTdHlsZSIsInRvcE1hcFN0eWxlIiwibWFwIiwiaXNTdHlsZUxvYWRlZCIsInNhdmVkRGV2aWNlUGl4ZWxSYXRpbyIsIndpbmRvdyIsImRldmljZVBpeGVsUmF0aW8iLCJ0aGVuIiwic2V0RXhwb3J0SW1hZ2VEYXRhVXJpIiwiZGF0YVVyaSIsInByb3BzVHlwZXMiXSwibWFwcGluZ3Mi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RCx5QkFBT0MsZ0JBQVAsR0FBMEIsQ0FBMUI7O0FBRUEsZUFBS3ZDLEtBQUwsQ0FBV0UsbUJBQVg7QUFDQSw0Q0FBYSxPQUFLMEIsZUFBbEIsRUFBbUNZLElBQW5DLENBQXdDLG1CQUFXO0FBQ2pELGlCQUFLeEMsS0FBTCxDQUFXeUMscUJBQVgsQ0FBaUMsRUFBQ0MsZ0JBQUQsRUFBakM7QUFDQUosMkJBQU9DLGdCQUFQLEdBQTBCRixxQkFBMUI7QUFDRCxTQUhEO0FBSUQ7QUFDRixLQXpEc0Q7QUFBQTs7O0FBa0h6RHRDLGdCQUFjNEMsVUFBZCxHQUEyQjNELFNBQTNCO0FBQ0EsU0FBT2UsYUFBUDtBQUNEIiwiZmlsZSI6InBsb3QtY29udGFpbmVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSAyMDE4IFViZXIgVGVjaG5vbG9naWVzLCBJbmMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuLy8gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuLy8gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuLy8gdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuLy8gY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4vLyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4vLyBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4vLyBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbi8vIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuLy8gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuLy8gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbi8vIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbi8vIFRIRSBTT0ZUV0FSRS5cblxuLy8gbGlicmFyaWVzXG5pbXBvcnQgUmVhY3QsIHtDb21wb25lbnR9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQge2NyZWF0ZVNlbGVjdG9yfSBmcm9tICdyZXNlbGVjdCc7XG5pbXBvcnQgc3R5bGVkIGZyb20gJ3N0eWxlZC1jb21wb25lbnRzJztcbmltcG9ydCB7U3RhdGljTWFwfSBmcm9tICdyZWFjdC1tYXAtZ2wnO1xuaW1wb3J0IGRlYm91bmNlIGZyb20gJ2xvZGFzaC5kZWJvdW5jZSc7XG5pbXBvcnQgd2luZG93IGZyb20gJ2dsb2JhbC93aW5kb3cnO1xuXG5pbXBvcnQgTWFwQ29udGFpbmVyRmFjdG9yeSBmcm9tICcuL21hcC1jb250YWluZXInO1xuaW1wb3J0IHtjYWxjdWxhdGVFeHBvcnRJbWFnZVNpemUsIGNvbnZlcnRUb1BuZ30gZnJvbSAndXRpbHMvZXhwb3J0LWltYWdlLXV0aWxzJztcbmltcG9ydCB7c2NhbGVNYXBTdHlsZUJ5UmVzb2x1dGlvbn0gZnJvbSAndXRpbHMvbWFwLXN0eWxlLXV0aWxzL21hcGJveC1nbC1zdHlsZS1lZGl0b3InO1xuY29uc3QgcHJvcFR5cGVzID0ge1xuICB3aWR0aDogUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxuICBoZWlnaHQ6IFByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcbiAgZXhwb3J0SW1hZ2VTZXR0aW5nOiBQcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsXG4gIG1hcEZpZWxkczogUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkXG59O1xuXG5QbG90Q29udGFpbmVyRmFjdG9yeS5kZXBzID0gW01hcENvbnRhaW5lckZhY3RvcnldO1xuXG5jb25zdCBTdHlsZWRQbG90Q29udGFpbmVyID0gc3R5bGVkLmRpdmBcbiAgLm1hcGJveGdsLWN0cmwtYm90dG9tLWxlZnQsXG4gIC5tYXBib3hnbC1jdHJsLWJvdHRvbS1yaWdodCB7XG4gICAgZGlzcGxheTogbm9uZTtcbiAgfVxuYDtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gUGxvdENvbnRhaW5lckZhY3RvcnkoTWFwQ29udGFpbmVyKSB7XG4gIGNsYXNzIFBsb3RDb250YWluZXIgZXh0ZW5kcyBDb21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICBzdXBlcihwcm9wcyk7XG4gICAgICB0aGlzLl9vbk1hcFJlbmRlciA9IGRlYm91bmNlKHRoaXMuX29uTWFwUmVuZGVyLCA1MDApO1xuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxNb3VudCgpIHtcbiAgICAgIHRoaXMucHJvcHMuc3RhcnRFeHBvcnRpbmdJbWFnZSgpO1xuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV3UHJvcHMpIHtcbiAgICAgIC8vIHJlLWZldGNoIHRoZSBuZXcgc2NyZWVuc2hvdCBvbmx5IHdoZW4gcmF0aW8gbGVnZW5kIG9yIHJlc29sdXRpb24gY2hhbmdlc1xuICAgICAgY29uc3QgY2hlY2tzID0gWydyYXRpbycsICdyZXNvbHV0aW9uJywgJ2xlZ2VuZCddO1xuICAgICAgY29uc3Qgc2hvdWxkUmV0cmlldmVTY3JlZW5zaG90ID0gY2hlY2tzLnNvbWUoXG4gICAgICAgIGl0ZW0gPT5cbiAgICAgICAgICB0aGlzLnByb3BzLmV4cG9ydEltYWdlU2V0dGluZ1tpdGVtXSAhPT1cbiAgICAgICAgICBuZXdQcm9wcy5leHBvcnRJbWFnZVNldHRpbmdbaXRlbV1cbiAgICAgICk7XG4gICAgICBpZiAoc2hvdWxkUmV0cmlldmVTY3JlZW5zaG90KSB7XG4gICAgICAgIHRoaXMuX3JldHJpZXZlTmV3U2NyZWVuc2hvdCgpO1xuICAgICAgfVxuICAgIH1cblxuICAgIG1hcFN0eWxlU2VsZWN0b3IgPSBwcm9wcyA9PiBwcm9wcy5tYXBGaWVsZHMubWFwU3R5bGU7XG4gICAgcmVzb2x1dGlvblNlbGVjdG9yID0gcHJvcHMgPT4gcHJvcHMuZXhwb3J0SW1hZ2VTZXR0aW5nLnJlc29sdXRpb247XG4gICAgc2NhbGVkTWFwU3R5bGVTZWxlY3RvciA9IGNyZWF0ZVNlbGVjdG9yKFxuICAgICAgdGhpcy5tYXBTdHlsZVNlbGVjdG9yLFxuICAgICAgdGhpcy5yZXNvbHV0aW9uU2VsZWN0b3IsXG4gICAgICAobWFwU3R5bGUsIHJlc29sdXRpb24pID0+ICh7XG4gICAgICAgIGJvdHRvbU1hcFN0eWxlOiBzY2FsZU1hcFN0eWxlQnlSZXNvbHV0aW9uKFxuICAgICAgICAgIG1hcFN0eWxlLmJvdHRvbU1hcFN0eWxlLFxuICAgICAgICAgIHJlc29sdXRpb25cbiAgICAgICAgKSxcbiAgICAgICAgdG9wTWFwU3R5bGU6IHNjYWxlTWFwU3R5bGVCeVJlc29sdXRpb24obWFwU3R5bGUudG9wTWFwU3R5bGUsIHJlc29sdXRpb24pXG4gICAgICB9KVxuICAgICk7XG5cbiAgICBfb25NYXBSZW5kZXIgPSBtYXAgPT4ge1xuICAgICAgaWYgKG1hcC5pc1N0eWxlTG9hZGVkKCkpIHtcbiAgICAgICAgdGhpcy5fcmV0cmlldmVOZXdTY3JlZW5zaG90KCk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIF9yZXRyaWV2ZU5ld1NjcmVlbnNob3QgPSAoKSA9PiB7XG4gICAgICBpZiAodGhpcy5wbG90dGluZ0FyZWFSZWYpIHtcbiAgICAgIC8vIHNldHRpbmcgd2luZG93RGV2aWNlUGl4ZWxSYXRpbyB0byAxXG4gICAgICAvLyBzbyB0aGF0IGxhcmdlIG1hcGJveCBiYXNlIG1hcCB3aWxsIGxvYWQgaW4gZnVsbFxuICAgICAgICBjb25zdCBzYXZlZERldmljZVBpeGVsUmF0aW8gPSB3aW5kb3cuZGV2aWNlUGl4ZWxSYXRpbztcbiAgICAgICAgd2luZG93LmRldmljZVBpeGVsUmF0aW8gPSAxO1xuXG4gICAgICAgIHRoaXMucHJvcHMuc3RhcnRFeHBvcnRpbmdJbWFnZSgpO1xuICAgICAgICBjb252ZXJ0VG9QbmcodGhpcy5wbG90dGluZ0FyZWFSZWYpLnRoZW4oZGF0YVVyaSA9PiB7XG4gICAgICAgICAgdGhpcy5wcm9wcy5zZXRFeHBvcnRJbWFnZURhdGFVcmkoe2RhdGFVcml9KTtcbiAgICAgICAgICB3aW5kb3cuZGV2aWNlUGl4ZWxSYXRpbyA9IHNhdmVkRGV2aWNlUGl4ZWxSYXRpbztcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIHJlbmRlcigpIHtcbiAgICAgIGNvbnN0IHt3aWR0aCwgaGVpZ2h0LCBleHBvcnRJbWFnZVNldHRpbmcsIG1hcEZpZWxkc30gPSB0aGlzLnByb3BzO1xuICAgICAgY29uc3Qge3JhdGlvLCByZXNvbHV0aW9uLCBsZWdlbmR9ID0gZXhwb3J0SW1hZ2VTZXR0aW5nO1xuICAgICAgY29uc3QgZXhwb3J0SW1hZ2VTaXplID0gY2FsY3VsYXRlRXhwb3J0SW1hZ2VTaXplKHtcbiAgICAgICAgd2lkdGgsXG4gICAgICAgIGhlaWdodCxcbiAgICAgICAgcmF0aW8sXG4gICAgICAgIHJlc29sdXRpb25cbiAgICAgIH0pO1xuXG4gICAgICBjb25zdCBtYXBQcm9wcyA9IHtcbiAgICAgICAgLi4ubWFwRmllbGRzLFxuICAgICAgICBtYXBTdHlsZTogdGhpcy5zY2FsZWRNYXBTdHlsZVNlbGVjdG9yKHRoaXMucHJvcHMpLFxuXG4gICAgICAgIC8vIG92ZXJyaWRlIHZpZXdwb3J0IGJhc2VkIG9uIGV4cG9ydCBzZXR0aW5nc1xuICAgICAgICBtYXBTdGF0ZToge1xuICAgICAgICAgIC4uLm1hcEZpZWxkcy5tYXBTdGF0ZSxcbiAgICAgICAgICAuLi5leHBvcnRJbWFnZVNpemUsXG4gICAgICAgICAgem9vbTogbWFwRmllbGRzLm1hcFN0YXRlLnpvb20gKyBleHBvcnRJbWFnZVNpemUuem9vbU9mZnNldFxuICAgICAgICB9LFxuICAgICAgICBtYXBDb250cm9sczoge1xuICAgICAgICAgIC8vIG92ZXJyaWRlIG1hcCBsZWdlbmQgdmlzaWJpbGl0eVxuICAgICAgICAgIG1hcExlZ2VuZDoge1xuICAgICAgICAgICAgc2hvdzogbGVnZW5kLFxuICAgICAgICAgICAgYWN0aXZlOiB0cnVlXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBNYXBDb21wb25lbnQ6IFN0YXRpY01hcFxuICAgICAgfTtcblxuICAgICAgcmV0dXJuIChcbiAgICAgICAgPFN0eWxlZFBsb3RDb250YWluZXJcbiAgICAgICAgICBzdHlsZT17e3Bvc2l0aW9uOiAnYWJzb2x1dGUnLCB0b3A6IC05OTk5LCBsZWZ0OiAtOTk5OX19XG4gICAgICAgID5cbiAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICByZWY9e2VsZW1lbnQgPT4ge1xuICAgICAgICAgICAgICB0aGlzLnBsb3R0aW5nQXJlYVJlZiA9IGVsZW1lbnQ7XG4gICAgICAgICAgICB9fVxuICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgd2lkdGg6IGV4cG9ydEltYWdlU2l6ZS53aWR0aCxcbiAgICAgICAgICAgICAgaGVpZ2h0OiBleHBvcnRJbWFnZVNpemUuaGVpZ2h0XG4gICAgICAgICAgICB9fVxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxNYXBDb250YWluZXJcbiAgICAgICAgICAgICAgaW5kZXg9ezB9XG4gICAgICAgICAgICAgIG9uTWFwUmVuZGVyPXt0aGlzLl9vbk1hcFJlbmRlcn1cbiAgICAgICAgICAgICAgaXNFeHBvcnRcbiAgICAgICAgICAgICAgey4uLm1hcFByb3BzfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9TdHlsZWRQbG90Q29udGFpbmVyPlxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICBQbG90Q29udGFpbmVyLnByb3BzVHlwZXMgPSBwcm9wVHlwZXM7XG4gIHJldHVybiBQbG90Q29udGFpbmVyO1xufVxuIl19