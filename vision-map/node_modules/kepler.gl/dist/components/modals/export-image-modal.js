'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

var _class, _temp;

var _templateObject = (0, _taggedTemplateLiteral3.default)(['\n  display: flex;\n  flex-direction: column;\n  justify-content: space-around;\n  width: 250px;\n\n  .image-option-section {\n    .image-option-section-title {\n      font-weight: 500;\n      font-size: 14px;\n    }\n  }\n\n  .button-list {\n    display: flex;\n    flex-direction: row;\n    padding: 8px 0px;\n  }\n\n  input {\n    margin-right: 8px;\n  }\n'], ['\n  display: flex;\n  flex-direction: column;\n  justify-content: space-around;\n  width: 250px;\n\n  .image-option-section {\n    .image-option-section-title {\n      font-weight: 500;\n      font-size: 14px;\n    }\n  }\n\n  .button-list {\n    display: flex;\n    flex-direction: row;\n    padding: 8px 0px;\n  }\n\n  input {\n    margin-right: 8px;\n  }\n']),
    _templateObject2 = (0, _taggedTemplateLiteral3.default)(['\n  align-items: center;\n  display: flex;\n  flex-direction: column;\n  flex: 1;\n  justify-content: center;\n  padding: 30px;\n\n  .dimension, .instruction {\n    padding: 8px 0px;\n  }\n\n  .preview-image {\n    background: #e2e2e2;\n    border-radius: 4px;\n    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.18);\n    width: 100%;\n    padding-bottom: ', ';\n    position: relative;\n  }\n\n  .preview-image-placeholder {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n  }\n\n  .preview-image-spinner {\n    position: absolute;\n    left: calc(50% - 25px);\n    top: calc(50% - 25px);\n  }\n'], ['\n  align-items: center;\n  display: flex;\n  flex-direction: column;\n  flex: 1;\n  justify-content: center;\n  padding: 30px;\n\n  .dimension, .instruction {\n    padding: 8px 0px;\n  }\n\n  .preview-image {\n    background: #e2e2e2;\n    border-radius: 4px;\n    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.18);\n    width: 100%;\n    padding-bottom: ', ';\n    position: relative;\n  }\n\n  .preview-image-placeholder {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n  }\n\n  .preview-image-spinner {\n    position: absolute;\n    left: calc(50% - 25px);\n    top: calc(50% - 25px);\n  }\n']),
    _templateObject3 = (0, _taggedTemplateLiteral3.default)(['\n  border-radius: 2px;\n  border: 1px solid ', ';\n  color: ', ';\n  cursor: pointer;\n  font-weight: 500;\n  margin-right: 6px;\n  padding: 6px 10px;\n\n  :hover {\n    color: ', ';\n    border: 1px solid ', ';\n  }\n'], ['\n  border-radius: 2px;\n  border: 1px solid ', ';\n  color: ', ';\n  cursor: pointer;\n  font-weight: 500;\n  margin-right: 6px;\n  padding: 6px 10px;\n\n  :hover {\n    color: ', ';\n    border: 1px solid ', ';\n  }\n']); // Copyright (c) 2018 Uber Technologies, Inc.
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

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _exportImageUtils = require('../../utils/export-image-utils');

var _defaultSettings = require('../../constants/default-settings');

var _loadingSpinner = require('../common/loading-spinner');

var _loadingSpinner2 = _interopRequireDefault(_loadingSpinner);

var _styledComponents3 = require('../common/styled-components');

var _switch = require('../common/switch');

var _switch2 = _interopRequireDefault(_switch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ImageOptionList = _styledComponents2.default.div(_templateObject);

var PreviewImageSection = _styledComponents2.default.div(_templateObject2, function (props) {
  return props.ratio === _defaultSettings.RATIOS.SCREEN ? 100 * props.height / props.width + '%' : props.ratio === _defaultSettings.RATIOS.SIXTEEN_BY_NINE ? '56.25%' : '75%';
});

var Button = _styledComponents2.default.div(_templateObject3, function (props) {
  return props.selected ? props.theme.primaryBtnBgd : props.theme.selectBorderColorLT;
}, function (props) {
  return props.selected ? props.theme.primaryBtnBgd : props.theme.selectBorderColorLT;
}, function (props) {
  return props.available && props.theme.primaryBtnBgd;
}, function (props) {
  return props.available && props.theme.primaryBtnBgd;
});

var ExportImageModal = (_temp = _class = function (_Component) {
  (0, _inherits3.default)(ExportImageModal, _Component);

  function ExportImageModal() {
    (0, _classCallCheck3.default)(this, ExportImageModal);
    return (0, _possibleConstructorReturn3.default)(this, (ExportImageModal.__proto__ || Object.getPrototypeOf(ExportImageModal)).apply(this, arguments));
  }

  (0, _createClass3.default)(ExportImageModal, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          height = _props.height,
          legend = _props.legend,
          ratio = _props.ratio,
          resolution = _props.resolution,
          width = _props.width,
          exporting = _props.exporting,
          imageDataUri = _props.imageDataUri,
          onChangeRatio = _props.onChangeRatio,
          onChangeResolution = _props.onChangeResolution,
          onToggleLegend = _props.onToggleLegend;


      var exportImageSize = (0, _exportImageUtils.calculateExportImageSize)({
        width: width, height: height, ratio: ratio, resolution: resolution
      });

      return _react2.default.createElement(
        'div',
        { className: 'export-image-modal' },
        _react2.default.createElement(
          _styledComponents3.StyledModalContent,
          null,
          _react2.default.createElement(
            ImageOptionList,
            null,
            _react2.default.createElement(
              'div',
              { className: 'image-option-section' },
              _react2.default.createElement(
                'div',
                { className: 'image-option-section-title' },
                'Ratio'
              ),
              'Choose the ratio for various usages.',
              _react2.default.createElement(
                'div',
                { className: 'button-list' },
                _defaultSettings.RATIO_OPTIONS.map(function (op) {
                  return _react2.default.createElement(
                    Button,
                    {
                      key: op.id,
                      selected: ratio === op.id,
                      onClick: function onClick() {
                        return onChangeRatio({ ratio: op.id });
                      }
                    },
                    op.label
                  );
                })
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'image-option-section' },
              _react2.default.createElement(
                'div',
                { className: 'image-option-section-title' },
                'Resolution'
              ),
              'High resolution is better for prints.',
              _react2.default.createElement(
                'div',
                { className: 'button-list' },
                _defaultSettings.RESOLUTION_OPTIONS.map(function (op) {
                  return _react2.default.createElement(
                    Button,
                    {
                      key: op.id,
                      selected: resolution === op.id,
                      onClick: function onClick() {
                        return op.available && onChangeResolution({ resolution: op.id });
                      }
                    },
                    op.label
                  );
                })
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'image-option-section' },
              _react2.default.createElement(
                'div',
                { className: 'image-option-section-title' },
                'Map Legend'
              ),
              _react2.default.createElement(_switch2.default, { type: 'checkbox',
                id: 'add-map-legend',
                checked: legend,
                label: 'Add legend on map',
                onChange: onToggleLegend })
            )
          ),
          _react2.default.createElement(
            PreviewImageSection,
            { ratio: ratio, width: width, height: height },
            _react2.default.createElement(
              'div',
              { className: 'dimension' },
              exportImageSize.width + ' x ' + exportImageSize.height
            ),
            _react2.default.createElement(
              'div',
              { className: 'preview-image' },
              exporting ? _react2.default.createElement(
                'div',
                { className: 'preview-image-spinner' },
                _react2.default.createElement(_loadingSpinner2.default, null)
              ) : _react2.default.createElement('img', { className: 'preview-image-placeholder', src: imageDataUri })
            )
          )
        )
      );
    }
  }]);
  return ExportImageModal;
}(_react.Component), _class.propTypes = {
  height: _propTypes2.default.number.isRequired,
  ratio: _propTypes2.default.string.isRequired,
  resolution: _propTypes2.default.string.isRequired,
  width: _propTypes2.default.number.isRequired,
  exporting: _propTypes2.default.bool.isRequired,
  imageDataUri: _propTypes2.default.string,
  // callbacks
  onChangeRatio: _propTypes2.default.func.isRequired,
  onChangeResolution: _propTypes2.default.func.isRequired,
  onToggleLegend: _propTypes2.default.func.isRequired
}, _temp);


var ExportImageModalFactory = function ExportImageModalFactory() {
  return ExportImageModal;
};
exports.default = ExportImageModalFactory;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL21vZGFscy9leHBvcnQtaW1hZ2UtbW9kYWwuanMiXSwibmFtZXMiOlsiSW1hZ2VPcHRpb25MaXN0Iiwic3R5bGVkIiwiZGl2IiwiUHJldmlld0ltYWdlU2VjdGlvbiIsInByb3BzIiwicmF0aW8iLCJSQVRJT1MiLCJTQ1JFRU4iLCJoZWlnaHQiLCJ3aWR0aCIsIlNJWFRFRU5fQllfTklORSIsIkJ1dHRvbiIsInNlbGVjdGVkIiwidGhlbWUiLCJwcmltYXJ5QnRuQmdkIiwic2VsZWN0Qm9yZGVyQ29sb3JMVCIsImF2YWlsYWJsZSIsIkV4cG9ydEltYWdlTW9kYWwiLCJsZWdlbmQiLCJyZXNvbHV0aW9uIiwiZXhwb3J0aW5nIiwiaW1hZ2VEYXRhVXJpIiwib25DaGFuZ2VSYXRpbyIsIm9uQ2hhbmdlUmVzb2x1dGlvbiIsIm9uVG9nZ2xlTGVnZW5kIiwiZXhwb3J0SW1hZ2VTaXplIiwiUkFUSU9fT1BUSU9OUyIsIm1hcCIsIm9wIiwiaWQiLCJsYWJlbCIsIlJFU09MVVRJT05fT1BUSU9OUyIsIkNvbXBvbmVudCIsInByb3BUeXBlcyIsIlByb3BUeXBlcyIsIm51bWJlciIsImlzUmVxdWlyZWQiLCJzdHJpbmciLCJib29sIiwiZnVuYyIsIkV4cG9ydEltYWdlTW9kYWxGYWN0b3J5Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7K2ZBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBRUE7O0FBQ0E7O0FBS0E7Ozs7QUFDQTs7QUFDQTs7Ozs7O0FBRUEsSUFBTUEsa0JBQWtCQywyQkFBT0MsR0FBekIsaUJBQU47O0FBd0JBLElBQU1DLHNCQUFzQkYsMkJBQU9DLEdBQTdCLG1CQWlCZ0I7QUFBQSxTQUFTRSxNQUFNQyxLQUFO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ZXhwb3J0LWltYWdlLW1vZGFsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSAyMDE4IFViZXIgVGVjaG5vbG9naWVzLCBJbmMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuLy8gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuLy8gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuLy8gdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuLy8gY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4vLyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4vLyBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4vLyBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbi8vIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuLy8gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuLy8gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbi8vIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbi8vIFRIRSBTT0ZUV0FSRS5cblxuaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50fSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHN0eWxlZCBmcm9tICdzdHlsZWQtY29tcG9uZW50cyc7XG5cbmltcG9ydCB7Y2FsY3VsYXRlRXhwb3J0SW1hZ2VTaXplfSBmcm9tICd1dGlscy9leHBvcnQtaW1hZ2UtdXRpbHMnO1xuaW1wb3J0IHtcbiAgUkFUSU9fT1BUSU9OUyxcbiAgUkFUSU9TLFxuICBSRVNPTFVUSU9OX09QVElPTlNcbn0gZnJvbSAnY29uc3RhbnRzL2RlZmF1bHQtc2V0dGluZ3MnO1xuaW1wb3J0IExvYWRpbmdTcGlubmVyIGZyb20gJ2NvbXBvbmVudHMvY29tbW9uL2xvYWRpbmctc3Bpbm5lcic7XG5pbXBvcnQge1N0eWxlZE1vZGFsQ29udGVudH0gZnJvbSAnY29tcG9uZW50cy9jb21tb24vc3R5bGVkLWNvbXBvbmVudHMnO1xuaW1wb3J0IFN3aXRjaCBmcm9tICdjb21wb25lbnRzL2NvbW1vbi9zd2l0Y2gnO1xuXG5jb25zdCBJbWFnZU9wdGlvbkxpc3QgPSBzdHlsZWQuZGl2YFxuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWFyb3VuZDtcbiAgd2lkdGg6IDI1MHB4O1xuXG4gIC5pbWFnZS1vcHRpb24tc2VjdGlvbiB7XG4gICAgLmltYWdlLW9wdGlvbi1zZWN0aW9uLXRpdGxlIHtcbiAgICAgIGZvbnQtd2VpZ2h0OiA1MDA7XG4gICAgICBmb250LXNpemU6IDE0cHg7XG4gICAgfVxuICB9XG5cbiAgLmJ1dHRvbi1saXN0IHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGZsZXgtZGlyZWN0aW9uOiByb3c7XG4gICAgcGFkZGluZzogOHB4IDBweDtcbiAgfVxuXG4gIGlucHV0IHtcbiAgICBtYXJnaW4tcmlnaHQ6IDhweDtcbiAgfVxuYDtcblxuY29uc3QgUHJldmlld0ltYWdlU2VjdGlvbiA9IHN0eWxlZC5kaXZgXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIGZsZXg6IDE7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBwYWRkaW5nOiAzMHB4O1xuXG4gIC5kaW1lbnNpb24sIC5pbnN0cnVjdGlvbiB7XG4gICAgcGFkZGluZzogOHB4IDBweDtcbiAgfVxuXG4gIC5wcmV2aWV3LWltYWdlIHtcbiAgICBiYWNrZ3JvdW5kOiAjZTJlMmUyO1xuICAgIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgICBib3gtc2hhZG93OiAwIDhweCAxNnB4IDAgcmdiYSgwLDAsMCwwLjE4KTtcbiAgICB3aWR0aDogMTAwJTtcbiAgICBwYWRkaW5nLWJvdHRvbTogJHtwcm9wcyA9PiBwcm9wcy5yYXRpbyA9PT0gUkFUSU9TLlNDUkVFTiA/XG4gICAgICBgJHsxMDAgKiBwcm9wcy5oZWlnaHQvcHJvcHMud2lkdGh9JWA6XG4gICAgICAocHJvcHMucmF0aW8gPT09IFJBVElPUy5TSVhURUVOX0JZX05JTkUgPyAnNTYuMjUlJyA6ICc3NSUnKVxuICAgIH07XG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICB9XG5cbiAgLnByZXZpZXctaW1hZ2UtcGxhY2Vob2xkZXIge1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICB0b3A6IDA7XG4gICAgbGVmdDogMDtcbiAgICB3aWR0aDogMTAwJTtcbiAgICBoZWlnaHQ6IDEwMCU7XG4gIH1cblxuICAucHJldmlldy1pbWFnZS1zcGlubmVyIHtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgbGVmdDogY2FsYyg1MCUgLSAyNXB4KTtcbiAgICB0b3A6IGNhbGMoNTAlIC0gMjVweCk7XG4gIH1cbmA7XG5cbmNvbnN0IEJ1dHRvbiA9IHN0eWxlZC5kaXZgXG4gIGJvcmRlci1yYWRpdXM6IDJweDtcbiAgYm9yZGVyOiAxcHggc29saWQgJHtwcm9wcyA9PiBwcm9wcy5zZWxlY3RlZCA/IHByb3BzLnRoZW1lLnByaW1hcnlCdG5CZ2QgOiBwcm9wcy50aGVtZS5zZWxlY3RCb3JkZXJDb2xvckxUfTtcbiAgY29sb3I6ICR7cHJvcHMgPT4gcHJvcHMuc2VsZWN0ZWQgPyBwcm9wcy50aGVtZS5wcmltYXJ5QnRuQmdkIDogcHJvcHMudGhlbWUuc2VsZWN0Qm9yZGVyQ29sb3JMVH07XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgZm9udC13ZWlnaHQ6IDUwMDtcbiAgbWFyZ2luLXJpZ2h0OiA2cHg7XG4gIHBhZGRpbmc6IDZweCAxMHB4O1xuXG4gIDpob3ZlciB7XG4gICAgY29sb3I6ICR7cHJvcHMgPT4gcHJvcHMuYXZhaWxhYmxlICYmIHByb3BzLnRoZW1lLnByaW1hcnlCdG5CZ2R9O1xuICAgIGJvcmRlcjogMXB4IHNvbGlkICR7cHJvcHMgPT4gcHJvcHMuYXZhaWxhYmxlICYmIHByb3BzLnRoZW1lLnByaW1hcnlCdG5CZ2R9O1xuICB9XG5gO1xuXG5jbGFzcyBFeHBvcnRJbWFnZU1vZGFsIGV4dGVuZHMgQ29tcG9uZW50IHtcblxuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIGhlaWdodDogUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxuICAgIHJhdGlvOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgcmVzb2x1dGlvbjogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgIHdpZHRoOiBQcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXG4gICAgZXhwb3J0aW5nOiBQcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxuICAgIGltYWdlRGF0YVVyaTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICAvLyBjYWxsYmFja3NcbiAgICBvbkNoYW5nZVJhdGlvOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIG9uQ2hhbmdlUmVzb2x1dGlvbjogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICBvblRvZ2dsZUxlZ2VuZDogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZFxuICB9O1xuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7XG4gICAgICBoZWlnaHQsXG4gICAgICBsZWdlbmQsXG4gICAgICByYXRpbyxcbiAgICAgIHJlc29sdXRpb24sXG4gICAgICB3aWR0aCxcbiAgICAgIGV4cG9ydGluZyxcbiAgICAgIGltYWdlRGF0YVVyaSxcbiAgICAgIC8vIGNhbGxiYWNrczpcbiAgICAgIG9uQ2hhbmdlUmF0aW8sXG4gICAgICBvbkNoYW5nZVJlc29sdXRpb24sXG4gICAgICBvblRvZ2dsZUxlZ2VuZFxuICAgIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgY29uc3QgZXhwb3J0SW1hZ2VTaXplID0gY2FsY3VsYXRlRXhwb3J0SW1hZ2VTaXplKHtcbiAgICAgIHdpZHRoLCBoZWlnaHQsIHJhdGlvLCByZXNvbHV0aW9uXG4gICAgfSk7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJleHBvcnQtaW1hZ2UtbW9kYWxcIj5cbiAgICAgICAgPFN0eWxlZE1vZGFsQ29udGVudD5cbiAgICAgICAgICA8SW1hZ2VPcHRpb25MaXN0PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJpbWFnZS1vcHRpb24tc2VjdGlvblwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImltYWdlLW9wdGlvbi1zZWN0aW9uLXRpdGxlXCI+UmF0aW88L2Rpdj5cbiAgICAgICAgICAgICAgQ2hvb3NlIHRoZSByYXRpbyBmb3IgdmFyaW91cyB1c2FnZXMuXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYnV0dG9uLWxpc3RcIj5cbiAgICAgICAgICAgICAgICB7UkFUSU9fT1BUSU9OUy5tYXAob3AgPT4gXG4gICAgICAgICAgICAgICAgICA8QnV0dG9uXG4gICAgICAgICAgICAgICAgICAgIGtleT17b3AuaWR9XG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkPXtyYXRpbyA9PT0gb3AuaWR9XG4gICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IG9uQ2hhbmdlUmF0aW8oe3JhdGlvOiBvcC5pZH0pfVxuICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICB7b3AubGFiZWx9XG4gICAgICAgICAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJpbWFnZS1vcHRpb24tc2VjdGlvblwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImltYWdlLW9wdGlvbi1zZWN0aW9uLXRpdGxlXCI+UmVzb2x1dGlvbjwvZGl2PlxuICAgICAgICAgICAgICBIaWdoIHJlc29sdXRpb24gaXMgYmV0dGVyIGZvciBwcmludHMuXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYnV0dG9uLWxpc3RcIj5cbiAgICAgICAgICAgICAgICB7UkVTT0xVVElPTl9PUFRJT05TLm1hcChvcCA9PiBcbiAgICAgICAgICAgICAgICAgIDxCdXR0b25cbiAgICAgICAgICAgICAgICAgICAga2V5PXtvcC5pZH1cbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWQ9e3Jlc29sdXRpb24gPT09IG9wLmlkfVxuICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBvcC5hdmFpbGFibGUgJiYgb25DaGFuZ2VSZXNvbHV0aW9uKHtyZXNvbHV0aW9uOiBvcC5pZH0pfVxuICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICB7b3AubGFiZWx9XG4gICAgICAgICAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJpbWFnZS1vcHRpb24tc2VjdGlvblwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImltYWdlLW9wdGlvbi1zZWN0aW9uLXRpdGxlXCI+TWFwIExlZ2VuZDwvZGl2PlxuICAgICAgICAgICAgICA8U3dpdGNoIHR5cGU9XCJjaGVja2JveFwiXG4gICAgICAgICAgICAgICAgICAgICAgaWQ9XCJhZGQtbWFwLWxlZ2VuZFwiXG4gICAgICAgICAgICAgICAgICAgICAgY2hlY2tlZD17bGVnZW5kfVxuICAgICAgICAgICAgICAgICAgICAgIGxhYmVsPVwiQWRkIGxlZ2VuZCBvbiBtYXBcIlxuICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXtvblRvZ2dsZUxlZ2VuZH0vPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9JbWFnZU9wdGlvbkxpc3Q+XG4gICAgICAgICAgPFByZXZpZXdJbWFnZVNlY3Rpb24gcmF0aW89e3JhdGlvfSB3aWR0aD17d2lkdGh9IGhlaWdodD17aGVpZ2h0fT5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZGltZW5zaW9uXCI+e2Ake2V4cG9ydEltYWdlU2l6ZS53aWR0aH0geCAke2V4cG9ydEltYWdlU2l6ZS5oZWlnaHR9YH08L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicHJldmlldy1pbWFnZVwiPlxuICAgICAgICAgICAgICB7ZXhwb3J0aW5nID9cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInByZXZpZXctaW1hZ2Utc3Bpbm5lclwiPjxMb2FkaW5nU3Bpbm5lciAvPjwvZGl2PiA6XG4gICAgICAgICAgICAgICAgPGltZyBjbGFzc05hbWU9XCJwcmV2aWV3LWltYWdlLXBsYWNlaG9sZGVyXCIgc3JjPXtpbWFnZURhdGFVcml9IC8+XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvUHJldmlld0ltYWdlU2VjdGlvbj5cbiAgICAgICAgPC9TdHlsZWRNb2RhbENvbnRlbnQ+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9ICBcbn1cblxuY29uc3QgRXhwb3J0SW1hZ2VNb2RhbEZhY3RvcnkgPSAoKSA9PiBFeHBvcnRJbWFnZU1vZGFsO1xuZXhwb3J0IGRlZmF1bHQgRXhwb3J0SW1hZ2VNb2RhbEZhY3Rvcnk7XG4iXX0=