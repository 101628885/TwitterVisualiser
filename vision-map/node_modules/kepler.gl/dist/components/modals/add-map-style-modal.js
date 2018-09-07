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

var _class, _temp2;

var _templateObject = (0, _taggedTemplateLiteral3.default)(['\n  display: flex;\n  flex-direction: column;\n  justify-content: space-around;\n  font-size: 12px;\n  .modal-section {\n    margin-bottom: 32px;\n  }\n  .modal-section:first-child {\n    margin-top: 24px;\n  }\n  \n  .modal-section {\n    .modal-section-title {\n      font-weight: 500;\n    }\n    .modal-section-subtitle {\n      color: ', ';\n    }\n    \n    input {\n      margin-top: 8px;\n    }\n  }\n\n  input {\n    margin-right: 8px;\n  }\n'], ['\n  display: flex;\n  flex-direction: column;\n  justify-content: space-around;\n  font-size: 12px;\n  .modal-section {\n    margin-bottom: 32px;\n  }\n  .modal-section:first-child {\n    margin-top: 24px;\n  }\n  \n  .modal-section {\n    .modal-section-title {\n      font-weight: 500;\n    }\n    .modal-section-subtitle {\n      color: ', ';\n    }\n    \n    input {\n      margin-top: 8px;\n    }\n  }\n\n  input {\n    margin-right: 8px;\n  }\n']),
    _templateObject2 = (0, _taggedTemplateLiteral3.default)(['\n  align-items: center;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  margin-left: 116px;\n  flex-shrink: 0;\n  width: ', 'px;\n\n  .preview-title {\n    font-weight: 500;\n    font-size: 10px;\n    padding: 8px 0px;\n  }\n  \n  .preview-title.error {\n    color: ', ';\n  }\n\n  .preview-image {\n    background: ', ';\n    border-radius: 4px;\n    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.18);\n    width: ', 'px;\n    height: ', 'px;\n    position: relative;\n  }\n\n  .preview-image-placeholder {\n    position: absolute;\n    top: 0;\n    left: 0;\n  }\n\n  .preview-image-spinner {\n    position: absolute;\n    left: calc(50% - 25px);\n    top: calc(50% - 25px);\n  }\n'], ['\n  align-items: center;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  margin-left: 116px;\n  flex-shrink: 0;\n  width: ', 'px;\n\n  .preview-title {\n    font-weight: 500;\n    font-size: 10px;\n    padding: 8px 0px;\n  }\n  \n  .preview-title.error {\n    color: ', ';\n  }\n\n  .preview-image {\n    background: ', ';\n    border-radius: 4px;\n    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.18);\n    width: ', 'px;\n    height: ', 'px;\n    position: relative;\n  }\n\n  .preview-image-placeholder {\n    position: absolute;\n    top: 0;\n    left: 0;\n  }\n\n  .preview-image-spinner {\n    position: absolute;\n    left: calc(50% - 25px);\n    top: calc(50% - 25px);\n  }\n']),
    _templateObject3 = (0, _taggedTemplateLiteral3.default)(['\n  font-weight: 500;\n  \n  :hover {\n    cursor: pointer;\n  }\n'], ['\n  font-weight: 500;\n  \n  :hover {\n    cursor: pointer;\n  }\n']); // Copyright (c) 2018 Uber Technologies, Inc.
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

// Utils


var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _reactMapGl = require('react-map-gl');

var _reactMapGl2 = _interopRequireDefault(_reactMapGl);

var _reactDom = require('react-dom');

var _styledComponents3 = require('../common/styled-components');

var _mapboxUtils = require('../../utils/map-style-utils/mapbox-utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MapH = 190;
var MapW = 264;
var ErrorMsg = {
  styleError: 'Failed to load map style, make sure it is published. For private style, paste in your access token.'
};

var InstructionPanel = _styledComponents2.default.div(_templateObject, function (props) {
  return props.theme.subtextColorLT;
});

var PreviewMap = _styledComponents2.default.div(_templateObject2, MapW, function (props) {
  return props.theme.errorColor;
}, function (props) {
  return props.theme.modalImagePlaceHolder;
}, MapW, MapH);

var InlineLink = _styledComponents2.default.a(_templateObject3);

var AddMapStyleModal = (_temp2 = _class = function (_Component) {
  (0, _inherits3.default)(AddMapStyleModal, _Component);

  function AddMapStyleModal() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, AddMapStyleModal);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = AddMapStyleModal.__proto__ || Object.getPrototypeOf(AddMapStyleModal)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      reRenderKey: 0
    }, _this.loadMapStyleJson = function (style) {
      _this.props.loadCustomMapStyle({ style: style, error: false });
    }, _this.loadMapStyleIcon = function () {
      if (_this.mapRef) {
        var canvas = (0, _reactDom.findDOMNode)(_this.mapRef).querySelector('.mapboxgl-canvas');
        var dataUri = canvas.toDataURL();
        _this.props.loadCustomMapStyle({
          icon: dataUri
        });
      }
    }, _this.loadMaoStyleError = function () {
      _this.props.loadCustomMapStyle({ error: true });
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(AddMapStyleModal, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (this.props.inputStyle.accessToken !== nextProps.inputStyle.accessToken) {
        // toke has changed
        // ReactMapGl doesn't re-create map when token has changed
        // here we force the map to update
        this.setState({
          reRenderKey: this.state.reRenderKey + 1
        });
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      var _this2 = this;

      var map = this.mapRef && this.mapRef.getMap();
      if (map && this._map !== map) {
        this._map = map;

        map.on('style.load', function () {
          var style = map.getStyle();
          _this2.loadMapStyleJson(style);
        });

        map.on('render', function () {
          if (map.isStyleLoaded()) {
            _this2.loadMapStyleIcon();
          }
        });

        map.on('error', function () {
          _this2.loadMaoStyleError();
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var _props = this.props,
          inputStyle = _props.inputStyle,
          mapState = _props.mapState;


      var mapProps = (0, _extends3.default)({}, mapState, {
        preserveDrawingBuffer: true,
        mapboxApiAccessToken: inputStyle.accessToken || this.props.mapboxApiAccessToken,
        transformRequest: _mapboxUtils.transformRequest
      });

      return _react2.default.createElement(
        'div',
        { className: 'add-map-style-modal' },
        _react2.default.createElement(
          _styledComponents3.StyledModalContent,
          null,
          _react2.default.createElement(
            InstructionPanel,
            null,
            _react2.default.createElement(
              'div',
              { className: 'modal-section' },
              _react2.default.createElement(
                'div',
                { className: 'modal-section-title' },
                '1. Publish your style at mapbox or provide access token'
              ),
              _react2.default.createElement(
                'div',
                { className: 'modal-section-subtitle' },
                'You can create your own map style at',
                _react2.default.createElement(
                  InlineLink,
                  { target: '_blank', href: 'https://www.mapbox.com/studio/styles/' },
                  ' mapbox'
                ),
                ' and',
                _react2.default.createElement(
                  InlineLink,
                  { target: '_blank', href: 'https://www.mapbox.com/help/studio-manual-publish/' },
                  ' publish'
                ),
                ' it.'
              ),
              _react2.default.createElement(
                'div',
                { className: 'modal-section-subtitle' },
                'To use private style, paste your',
                _react2.default.createElement(
                  InlineLink,
                  { target: '_blank', href: 'https://www.mapbox.com/help/how-access-tokens-work/' },
                  ' access token'
                ),
                ' here. *kepler.gl is a client-side application, data stays in your browser..'
              ),
              _react2.default.createElement(_styledComponents3.InputLight, {
                type: 'text',
                value: inputStyle.accessToken || '',
                onChange: function onChange(_ref2) {
                  var value = _ref2.target.value;
                  return _this3.props.inputMapStyle((0, _extends3.default)({}, inputStyle, { accessToken: value }));
                },
                placeholder: 'e.g. pk.abcdefg.xxxxxx'
              })
            ),
            _react2.default.createElement(
              'div',
              { className: 'modal-section' },
              _react2.default.createElement(
                'div',
                { className: 'modal-section-title' },
                '2. Paste style url'
              ),
              _react2.default.createElement(
                'div',
                { className: 'modal-section-subtitle' },
                'What is a',
                _react2.default.createElement(
                  InlineLink,
                  { target: '_blank', href: 'https://www.mapbox.com/help/studio-manual-publish/#style-url' },
                  ' style URL'
                )
              ),
              _react2.default.createElement(_styledComponents3.InputLight, {
                type: 'text',
                value: inputStyle.url || '',
                onChange: function onChange(_ref3) {
                  var value = _ref3.target.value;
                  return _this3.props.inputMapStyle((0, _extends3.default)({}, inputStyle, { url: value }));
                },
                placeholder: 'e.g. mapbox://styles/uberdataviz/abcdefghijklmnopq'
              })
            ),
            _react2.default.createElement(
              'div',
              { className: 'modal-section' },
              _react2.default.createElement(
                'div',
                { className: 'modal-section-title' },
                '3. Name your style'
              ),
              _react2.default.createElement(_styledComponents3.InputLight, {
                type: 'text',
                value: inputStyle.label || '',
                onChange: function onChange(_ref4) {
                  var value = _ref4.target.value;
                  return _this3.props.inputMapStyle((0, _extends3.default)({}, inputStyle, { label: value }));
                }
              })
            )
          ),
          _react2.default.createElement(
            PreviewMap,
            null,
            _react2.default.createElement(
              'div',
              { className: (0, _classnames2.default)('preview-title', { error: inputStyle.error }) },
              inputStyle.error ? ErrorMsg.styleError : inputStyle.style && inputStyle.style.name || ''
            ),
            _react2.default.createElement(
              'div',
              { className: 'preview-image' },
              !inputStyle.isValid ? _react2.default.createElement('div', { className: 'preview-image-spinner' }) : _react2.default.createElement(
                _styledComponents3.StyledMapContainer,
                null,
                _react2.default.createElement(_reactMapGl2.default, (0, _extends3.default)({}, mapProps, {
                  ref: function ref(el) {
                    _this3.mapRef = el;
                  },
                  key: this.state.reRenderKey,
                  width: MapW,
                  height: MapH,
                  mapStyle: inputStyle.url }))
              )
            )
          )
        )
      );
    }
  }]);
  return AddMapStyleModal;
}(_react.Component), _class.propTypes = {
  mapState: _propTypes2.default.object.isRequired,
  inputMapStyle: _propTypes2.default.func.isRequired,
  loadCustomMapStyle: _propTypes2.default.func.isRequired,
  inputStyle: _propTypes2.default.object.isRequired
}, _temp2);


var AddMapStyleModalFactory = function AddMapStyleModalFactory() {
  return AddMapStyleModal;
};
exports.default = AddMapStyleModalFactory;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL21vZGFscy9hZGQtbWFwLXN0eWxlLW1vZGFsLmpzIl0sIm5hbWVzIjpbIk1hcEgiLCJNYXBXIiwiRXJyb3JNc2ciLCJzdHlsZUVycm9yIiwiSW5zdHJ1Y3Rpb25QYW5lbCIsInN0eWxlZCIsImRpdiIsInByb3BzIiwidGhlbWUiLCJzdWJ0ZXh0Q29sb3JMVCIsIlByZXZpZXdNYXAiLCJlcnJvckNvbG9yIiwibW9kYWxJbWFnZVBsYWNlSG9sZGVyIiwiSW5saW5lTGluayIsImEiLCJBZGRNYXBTdHlsZU1vZGFsIiwic3RhdGUiLCJyZVJlbmRlcktleSIsImxvYWRNYXBTdHlsZUpzb24iLCJzdHlsZSIsImxvYWRDdXN0b21NYXBTdHlsZSIsImVycm9yIiwibG9hZE1hcFN0eWxlSWNvbiIsIm1hcFJlZiIsImNhbnZhcyIsInF1ZXJ5U2VsZWN0b3IiLCJkYXRhVXJpIiwidG9EYXRhVVJMIiwiaWNvbiIsImxvYWRNYW9TdHlsZUVycm9yIiwibmV4dFByb3BzIiwiaW5wdXRTdHlsZSIsImFjY2Vzc1Rva2VuIiwic2V0U3RhdGUiLCJtYXAiLCJnZXRNYXAiLCJfbWFwIiwib24iLCJnZXRTdHlsZSIsImlzU3R5bGVMb2FkZWQiLCJtYXBTdGF0ZSIsIm1hcFByb3BzIiwicHJlc2VydmVEcmF3aW5nQnVmZmVyIiwibWFwYm94QXBpQWNjZXNzVG9rZW4iLCJ0cmFuc2Zvcm1SZXF1ZXN0IiwidmFsdWUiLCJ0YXJnZXQiLCJpbnB1dE1hcFN0eWxlIiwidXJsIiwibGFiZWwiLCJuYW1lIiwiaXNWYWxpZCIsImVsIiwiQ29tcG9uZW50IiwicHJvcFR5cGVzIiwiUHJvcFR5cGVzIiwib2JqZWN0IiwiaXNSZXF1aXJlZCIsImZ1bmMiLCJBZGRNYXBTdHlsZU1vZGFsRmFjdG9yeSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs2TUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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LDhDQUFDLG9CQUFELDZCQUNNVixRQUROO0FBRUUsdUJBQUssaUJBQU07QUFDVCwyQkFBS2xCLE1BQUwsR0FBYzZCLEVBQWQ7QUFDRCxtQkFKSDtBQUtFLHVCQUFLLEtBQUtwQyxLQUFMLENBQVdDLFdBTGxCO0FBTUUseUJBQU9oQixJQU5UO0FBT0UsMEJBQVFELElBUFY7QUFRRSw0QkFBVStCLFdBQVdpQixHQVJ2QjtBQURGO0FBSEo7QUFKRjtBQTFDRjtBQURGLE9BREY7QUFvRUQ7OztFQTdJNEJLLGdCLFVBQ3RCQyxTLEdBQVk7QUFDakJkLFlBQVVlLG9CQUFVQyxNQUFWLENBQWlCQyxVQURWO0FBRWpCVixpQkFBZVEsb0JBQVVHLElBQVYsQ0FBZUQsVUFGYjtBQUdqQnJDLHNCQUFvQm1DLG9CQUFVRyxJQUFWLENBQWVELFVBSGxCO0FBSWpCMUIsY0FBWXdCLG9CQUFVQyxNQUFWLENBQWlCQztBQUpaLEM7OztBQStJckIsSUFBTUUsMEJBQTBCLFNBQTFCQSx1QkFBMEI7QUFBQSxTQUFNNUMsZ0JBQU47QUFBQSxDQUFoQztrQkFDZTRDLHVCIiwiZmlsZSI6ImFkZC1tYXAtc3R5bGUtbW9kYWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIDIwMTggVWJlciBUZWNobm9sb2dpZXMsIEluYy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4vLyBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4vLyBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4vLyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4vLyBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbi8vIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbi8vIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1Jcbi8vIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuLy8gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4vLyBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4vLyBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuLy8gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuLy8gVEhFIFNPRlRXQVJFLlxuXG5pbXBvcnQgUmVhY3QsIHtDb21wb25lbnR9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgY2xhc3NuYW1lcyBmcm9tICdjbGFzc25hbWVzJztcbmltcG9ydCBzdHlsZWQgZnJvbSAnc3R5bGVkLWNvbXBvbmVudHMnO1xuaW1wb3J0IE1hcGJveEdMTWFwIGZyb20gJ3JlYWN0LW1hcC1nbCc7XG5pbXBvcnQge2ZpbmRET01Ob2RlfSBmcm9tICdyZWFjdC1kb20nO1xuaW1wb3J0IHtTdHlsZWRNb2RhbENvbnRlbnQsIElucHV0TGlnaHQsIFN0eWxlZE1hcENvbnRhaW5lcn0gZnJvbSAnY29tcG9uZW50cy9jb21tb24vc3R5bGVkLWNvbXBvbmVudHMnO1xuXG4vLyBVdGlsc1xuaW1wb3J0IHt0cmFuc2Zvcm1SZXF1ZXN0fSBmcm9tICd1dGlscy9tYXAtc3R5bGUtdXRpbHMvbWFwYm94LXV0aWxzJztcblxuY29uc3QgTWFwSCA9IDE5MDtcbmNvbnN0IE1hcFcgPSAyNjQ7XG5jb25zdCBFcnJvck1zZyA9IHtcbiAgc3R5bGVFcnJvciA6ICdGYWlsZWQgdG8gbG9hZCBtYXAgc3R5bGUsIG1ha2Ugc3VyZSBpdCBpcyBwdWJsaXNoZWQuIEZvciBwcml2YXRlIHN0eWxlLCBwYXN0ZSBpbiB5b3VyIGFjY2VzcyB0b2tlbi4nXG59O1xuXG5jb25zdCBJbnN0cnVjdGlvblBhbmVsID0gc3R5bGVkLmRpdmBcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1hcm91bmQ7XG4gIGZvbnQtc2l6ZTogMTJweDtcbiAgLm1vZGFsLXNlY3Rpb24ge1xuICAgIG1hcmdpbi1ib3R0b206IDMycHg7XG4gIH1cbiAgLm1vZGFsLXNlY3Rpb246Zmlyc3QtY2hpbGQge1xuICAgIG1hcmdpbi10b3A6IDI0cHg7XG4gIH1cbiAgXG4gIC5tb2RhbC1zZWN0aW9uIHtcbiAgICAubW9kYWwtc2VjdGlvbi10aXRsZSB7XG4gICAgICBmb250LXdlaWdodDogNTAwO1xuICAgIH1cbiAgICAubW9kYWwtc2VjdGlvbi1zdWJ0aXRsZSB7XG4gICAgICBjb2xvcjogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5zdWJ0ZXh0Q29sb3JMVH07XG4gICAgfVxuICAgIFxuICAgIGlucHV0IHtcbiAgICAgIG1hcmdpbi10b3A6IDhweDtcbiAgICB9XG4gIH1cblxuICBpbnB1dCB7XG4gICAgbWFyZ2luLXJpZ2h0OiA4cHg7XG4gIH1cbmA7XG5cbmNvbnN0IFByZXZpZXdNYXAgPSBzdHlsZWQuZGl2YFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgbWFyZ2luLWxlZnQ6IDExNnB4O1xuICBmbGV4LXNocmluazogMDtcbiAgd2lkdGg6ICR7TWFwV31weDtcblxuICAucHJldmlldy10aXRsZSB7XG4gICAgZm9udC13ZWlnaHQ6IDUwMDtcbiAgICBmb250LXNpemU6IDEwcHg7XG4gICAgcGFkZGluZzogOHB4IDBweDtcbiAgfVxuICBcbiAgLnByZXZpZXctdGl0bGUuZXJyb3Ige1xuICAgIGNvbG9yOiAke3Byb3BzID0+IHByb3BzLnRoZW1lLmVycm9yQ29sb3J9O1xuICB9XG5cbiAgLnByZXZpZXctaW1hZ2Uge1xuICAgIGJhY2tncm91bmQ6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUubW9kYWxJbWFnZVBsYWNlSG9sZGVyfTtcbiAgICBib3JkZXItcmFkaXVzOiA0cHg7XG4gICAgYm94LXNoYWRvdzogMCA4cHggMTZweCAwIHJnYmEoMCwwLDAsMC4xOCk7XG4gICAgd2lkdGg6ICR7TWFwV31weDtcbiAgICBoZWlnaHQ6ICR7TWFwSH1weDtcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIH1cblxuICAucHJldmlldy1pbWFnZS1wbGFjZWhvbGRlciB7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIHRvcDogMDtcbiAgICBsZWZ0OiAwO1xuICB9XG5cbiAgLnByZXZpZXctaW1hZ2Utc3Bpbm5lciB7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIGxlZnQ6IGNhbGMoNTAlIC0gMjVweCk7XG4gICAgdG9wOiBjYWxjKDUwJSAtIDI1cHgpO1xuICB9XG5gO1xuXG5jb25zdCBJbmxpbmVMaW5rID0gc3R5bGVkLmFgXG4gIGZvbnQtd2VpZ2h0OiA1MDA7XG4gIFxuICA6aG92ZXIge1xuICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgfVxuYDtcblxuY2xhc3MgQWRkTWFwU3R5bGVNb2RhbCBleHRlbmRzIENvbXBvbmVudCB7XG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgbWFwU3RhdGU6IFByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcbiAgICBpbnB1dE1hcFN0eWxlOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIGxvYWRDdXN0b21NYXBTdHlsZTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICBpbnB1dFN0eWxlOiBQcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWRcbiAgfTtcblxuICBzdGF0ZSA9IHtcbiAgICByZVJlbmRlcktleTogMFxuICB9O1xuXG4gIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzKSB7XG4gICAgaWYgKHRoaXMucHJvcHMuaW5wdXRTdHlsZS5hY2Nlc3NUb2tlbiAhPT0gbmV4dFByb3BzLmlucHV0U3R5bGUuYWNjZXNzVG9rZW4pIHtcbiAgICAgIC8vIHRva2UgaGFzIGNoYW5nZWRcbiAgICAgIC8vIFJlYWN0TWFwR2wgZG9lc24ndCByZS1jcmVhdGUgbWFwIHdoZW4gdG9rZW4gaGFzIGNoYW5nZWRcbiAgICAgIC8vIGhlcmUgd2UgZm9yY2UgdGhlIG1hcCB0byB1cGRhdGVcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICByZVJlbmRlcktleTogdGhpcy5zdGF0ZS5yZVJlbmRlcktleSArIDFcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGNvbXBvbmVudERpZFVwZGF0ZSgpIHtcbiAgICBjb25zdCBtYXAgPSB0aGlzLm1hcFJlZiAmJiB0aGlzLm1hcFJlZi5nZXRNYXAoKTtcbiAgICBpZiAobWFwICYmIHRoaXMuX21hcCAhPT0gbWFwKSB7XG4gICAgICB0aGlzLl9tYXAgPSBtYXA7XG5cbiAgICAgIG1hcC5vbignc3R5bGUubG9hZCcsICgpID0+IHtcbiAgICAgICAgY29uc3Qgc3R5bGUgPSBtYXAuZ2V0U3R5bGUoKTtcbiAgICAgICAgdGhpcy5sb2FkTWFwU3R5bGVKc29uKHN0eWxlKTtcbiAgICAgIH0pO1xuXG4gICAgICBtYXAub24oJ3JlbmRlcicsICgpID0+IHtcbiAgICAgICAgaWYgKG1hcC5pc1N0eWxlTG9hZGVkKCkpIHtcbiAgICAgICAgICB0aGlzLmxvYWRNYXBTdHlsZUljb24oKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIG1hcC5vbignZXJyb3InLCAoKSA9PiB7XG4gICAgICAgIHRoaXMubG9hZE1hb1N0eWxlRXJyb3IoKTtcbiAgICAgIH0pXG4gICAgfVxuICB9XG5cbiAgbG9hZE1hcFN0eWxlSnNvbiA9IChzdHlsZSkgPT4ge1xuICAgIHRoaXMucHJvcHMubG9hZEN1c3RvbU1hcFN0eWxlKHtzdHlsZSwgZXJyb3I6IGZhbHNlfSk7XG4gIH07XG5cbiAgbG9hZE1hcFN0eWxlSWNvbiA9ICgpID0+IHtcbiAgICBpZiAodGhpcy5tYXBSZWYpIHtcbiAgICAgIGNvbnN0IGNhbnZhcyA9IGZpbmRET01Ob2RlKHRoaXMubWFwUmVmKS5xdWVyeVNlbGVjdG9yKCcubWFwYm94Z2wtY2FudmFzJyk7XG4gICAgICBjb25zdCBkYXRhVXJpID0gY2FudmFzLnRvRGF0YVVSTCgpO1xuICAgICAgdGhpcy5wcm9wcy5sb2FkQ3VzdG9tTWFwU3R5bGUoe1xuICAgICAgICBpY29uOiBkYXRhVXJpXG4gICAgICB9KTtcbiAgICB9XG4gIH07XG5cbiAgbG9hZE1hb1N0eWxlRXJyb3IgPSAoKSA9PiB7XG4gICAgdGhpcy5wcm9wcy5sb2FkQ3VzdG9tTWFwU3R5bGUoe2Vycm9yOiB0cnVlfSk7XG4gIH07XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHtpbnB1dFN0eWxlLCBtYXBTdGF0ZX0gPSB0aGlzLnByb3BzO1xuXG4gIGNvbnN0IG1hcFByb3BzID0ge1xuICAgIC4uLm1hcFN0YXRlLFxuICAgIHByZXNlcnZlRHJhd2luZ0J1ZmZlcjogdHJ1ZSxcbiAgICBtYXBib3hBcGlBY2Nlc3NUb2tlbjogaW5wdXRTdHlsZS5hY2Nlc3NUb2tlbiB8fCB0aGlzLnByb3BzLm1hcGJveEFwaUFjY2Vzc1Rva2VuLFxuICAgIHRyYW5zZm9ybVJlcXVlc3RcbiAgfTtcblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkZC1tYXAtc3R5bGUtbW9kYWxcIj5cbiAgICAgICAgPFN0eWxlZE1vZGFsQ29udGVudD5cbiAgICAgICAgICA8SW5zdHJ1Y3Rpb25QYW5lbD5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kYWwtc2VjdGlvblwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZGFsLXNlY3Rpb24tdGl0bGVcIj4xLiBQdWJsaXNoIHlvdXIgc3R5bGUgYXQgbWFwYm94IG9yIHByb3ZpZGUgYWNjZXNzIHRva2VuPC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kYWwtc2VjdGlvbi1zdWJ0aXRsZVwiPlxuICAgICAgICAgICAgICAgIFlvdSBjYW4gY3JlYXRlIHlvdXIgb3duIG1hcCBzdHlsZSBhdFxuICAgICAgICAgICAgICAgIDxJbmxpbmVMaW5rIHRhcmdldD1cIl9ibGFua1wiIGhyZWY9XCJodHRwczovL3d3dy5tYXBib3guY29tL3N0dWRpby9zdHlsZXMvXCI+IG1hcGJveDwvSW5saW5lTGluaz4gYW5kXG4gICAgICAgICAgICAgICAgPElubGluZUxpbmsgdGFyZ2V0PVwiX2JsYW5rXCIgaHJlZj1cImh0dHBzOi8vd3d3Lm1hcGJveC5jb20vaGVscC9zdHVkaW8tbWFudWFsLXB1Ymxpc2gvXCI+IHB1Ymxpc2g8L0lubGluZUxpbms+IGl0LlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2RhbC1zZWN0aW9uLXN1YnRpdGxlXCI+XG4gICAgICAgICAgICAgICAgVG8gdXNlIHByaXZhdGUgc3R5bGUsIHBhc3RlIHlvdXJcbiAgICAgICAgICAgICAgICA8SW5saW5lTGluayB0YXJnZXQ9XCJfYmxhbmtcIiBocmVmPVwiaHR0cHM6Ly93d3cubWFwYm94LmNvbS9oZWxwL2hvdy1hY2Nlc3MtdG9rZW5zLXdvcmsvXCI+IGFjY2VzcyB0b2tlbjwvSW5saW5lTGluaz4gaGVyZS4gKmtlcGxlci5nbCBpcyBhIGNsaWVudC1zaWRlIGFwcGxpY2F0aW9uLCBkYXRhIHN0YXlzIGluIHlvdXIgYnJvd3Nlci4uXG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8SW5wdXRMaWdodFxuICAgICAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAgICAgICB2YWx1ZT17aW5wdXRTdHlsZS5hY2Nlc3NUb2tlbiB8fCAnJ31cbiAgICAgICAgICAgICAgICBvbkNoYW5nZT17KHt0YXJnZXQ6IHt2YWx1ZX19KSA9PiB0aGlzLnByb3BzLmlucHV0TWFwU3R5bGUoey4uLmlucHV0U3R5bGUsIGFjY2Vzc1Rva2VuOiB2YWx1ZX0pfVxuICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiZS5nLiBway5hYmNkZWZnLnh4eHh4eFwiXG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kYWwtc2VjdGlvblwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZGFsLXNlY3Rpb24tdGl0bGVcIj4yLiBQYXN0ZSBzdHlsZSB1cmw8L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2RhbC1zZWN0aW9uLXN1YnRpdGxlXCI+XG4gICAgICAgICAgICAgICAgV2hhdCBpcyBhXG4gICAgICAgICAgICAgICAgPElubGluZUxpbmsgdGFyZ2V0PVwiX2JsYW5rXCIgaHJlZj1cImh0dHBzOi8vd3d3Lm1hcGJveC5jb20vaGVscC9zdHVkaW8tbWFudWFsLXB1Ymxpc2gvI3N0eWxlLXVybFwiPiBzdHlsZSBVUkw8L0lubGluZUxpbms+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8SW5wdXRMaWdodFxuICAgICAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAgICAgICB2YWx1ZT17aW5wdXRTdHlsZS51cmwgfHwgJyd9XG4gICAgICAgICAgICAgICAgb25DaGFuZ2U9eyh7dGFyZ2V0OiB7dmFsdWV9fSkgPT4gdGhpcy5wcm9wcy5pbnB1dE1hcFN0eWxlKHsuLi5pbnB1dFN0eWxlLCB1cmw6IHZhbHVlfSl9XG4gICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJlLmcuIG1hcGJveDovL3N0eWxlcy91YmVyZGF0YXZpei9hYmNkZWZnaGlqa2xtbm9wcVwiXG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kYWwtc2VjdGlvblwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZGFsLXNlY3Rpb24tdGl0bGVcIj4zLiBOYW1lIHlvdXIgc3R5bGU8L2Rpdj5cbiAgICAgICAgICAgICAgPElucHV0TGlnaHRcbiAgICAgICAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgICAgICAgdmFsdWU9e2lucHV0U3R5bGUubGFiZWwgfHwgJyd9XG4gICAgICAgICAgICAgICAgb25DaGFuZ2U9eyh7dGFyZ2V0OiB7dmFsdWV9fSkgPT4gdGhpcy5wcm9wcy5pbnB1dE1hcFN0eWxlKHsuLi5pbnB1dFN0eWxlLCBsYWJlbDogdmFsdWV9KX1cbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvSW5zdHJ1Y3Rpb25QYW5lbD5cbiAgICAgICAgICA8UHJldmlld01hcD5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtjbGFzc25hbWVzKCdwcmV2aWV3LXRpdGxlJywge2Vycm9yOiBpbnB1dFN0eWxlLmVycm9yfSl9PlxuICAgICAgICAgICAgICB7aW5wdXRTdHlsZS5lcnJvciA/IEVycm9yTXNnLnN0eWxlRXJyb3IgOlxuICAgICAgICAgICAgICAgIChpbnB1dFN0eWxlLnN0eWxlICYmIGlucHV0U3R5bGUuc3R5bGUubmFtZSkgfHwgJyd9PC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInByZXZpZXctaW1hZ2VcIj5cbiAgICAgICAgICAgICAgeyFpbnB1dFN0eWxlLmlzVmFsaWQgP1xuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicHJldmlldy1pbWFnZS1zcGlubmVyXCIvPiA6XG4gICAgICAgICAgICAgICAgPFN0eWxlZE1hcENvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICAgIDxNYXBib3hHTE1hcFxuICAgICAgICAgICAgICAgICAgICB7Li4ubWFwUHJvcHN9XG4gICAgICAgICAgICAgICAgICAgIHJlZj17ZWwgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgIHRoaXMubWFwUmVmID0gZWw7XG4gICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgIGtleT17dGhpcy5zdGF0ZS5yZVJlbmRlcktleX1cbiAgICAgICAgICAgICAgICAgICAgd2lkdGg9e01hcFd9XG4gICAgICAgICAgICAgICAgICAgIGhlaWdodD17TWFwSH1cbiAgICAgICAgICAgICAgICAgICAgbWFwU3R5bGU9e2lucHV0U3R5bGUudXJsfS8+XG4gICAgICAgICAgICAgICAgPC9TdHlsZWRNYXBDb250YWluZXI+XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvUHJldmlld01hcD5cbiAgICAgICAgPC9TdHlsZWRNb2RhbENvbnRlbnQ+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cbmNvbnN0IEFkZE1hcFN0eWxlTW9kYWxGYWN0b3J5ID0gKCkgPT4gQWRkTWFwU3R5bGVNb2RhbDtcbmV4cG9ydCBkZWZhdWx0IEFkZE1hcFN0eWxlTW9kYWxGYWN0b3J5O1xuIl19