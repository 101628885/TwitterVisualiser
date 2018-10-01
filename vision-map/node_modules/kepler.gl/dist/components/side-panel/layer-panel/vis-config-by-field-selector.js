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

var _class, _temp2; // Copyright (c) 2018 Uber Technologies, Inc.
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

var _styledComponents = require('../../common/styled-components');

var _fieldSelector = require('../../common/field-selector');

var _fieldSelector2 = _interopRequireDefault(_fieldSelector);

var _infoHelper = require('../../common/info-helper');

var _infoHelper2 = _interopRequireDefault(_infoHelper);

var _dimensionScaleSelector = require('./dimension-scale-selector');

var _dimensionScaleSelector2 = _interopRequireDefault(_dimensionScaleSelector);

var _utils = require('../../../utils/utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var VisConfigByFieldSelector = (_temp2 = _class = function (_Component) {
  (0, _inherits3.default)(VisConfigByFieldSelector, _Component);

  function VisConfigByFieldSelector() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, VisConfigByFieldSelector);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = VisConfigByFieldSelector.__proto__ || Object.getPrototypeOf(VisConfigByFieldSelector)).call.apply(_ref, [this].concat(args))), _this), _this._updateVisByField = function (val) {
      _this.props.updateField(val);
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(VisConfigByFieldSelector, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          property = _props.property,
          showScale = _props.showScale,
          selectedField = _props.selectedField,
          description = _props.description,
          _props$scaleOptions = _props.scaleOptions,
          scaleOptions = _props$scaleOptions === undefined ? [] : _props$scaleOptions;


      return _react2.default.createElement(
        _styledComponents.SidePanelSection,
        null,
        _react2.default.createElement(
          _styledComponents.SidePanelSection,
          null,
          _react2.default.createElement(
            _styledComponents.PanelLabelWrapper,
            null,
            _react2.default.createElement(
              _styledComponents.PanelLabel,
              null,
              this.props.label || (0, _utils.capitalizeFirstLetter)(property) + ' based on'
            ),
            description && _react2.default.createElement(_infoHelper2.default, {
              description: description,
              id: this.props.id + '-' + property
            })
          ),
          _react2.default.createElement(_fieldSelector2.default, {
            fields: this.props.fields,
            value: selectedField && selectedField.name,
            placeholder: this.props.placeholder,
            onSelect: this._updateVisByField,
            erasable: true
          })
        ),
        _react2.default.createElement(
          'div',
          null,
          showScale ? _react2.default.createElement(_dimensionScaleSelector2.default, {
            scaleType: this.props.scaleType,
            options: scaleOptions,
            label: property + ' scale',
            onSelect: this.props.updateScale,
            disabled: scaleOptions.length < 2
          }) : null
        )
      );
    }
  }]);
  return VisConfigByFieldSelector;
}(_react.Component), _class.propTypes = {
  channel: _propTypes2.default.string.isRequired,
  fields: _propTypes2.default.arrayOf(_propTypes2.default.any).isRequired,
  id: _propTypes2.default.string.isRequired,
  property: _propTypes2.default.string.isRequired,
  showScale: _propTypes2.default.bool.isRequired,
  updateField: _propTypes2.default.func.isRequired,
  updateScale: _propTypes2.default.func.isRequired,

  // optional
  scaleType: _propTypes2.default.string,
  selectedField: _propTypes2.default.object,
  description: _propTypes2.default.string,
  label: _propTypes2.default.string,
  placeholder: _propTypes2.default.string
}, _temp2);
exports.default = VisConfigByFieldSelector;
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3NpZGUtcGFuZWwvbGF5ZXItcGFuZWwvdmlzLWNvbmZpZy1ieS1maWVsZC1zZWxlY3Rvci5qcyJdLCJuYW1lcyI6WyJWaXNDb25maWdCeUZpZWxkU2VsZWN0b3IiLCJfdXBkYXRlVmlzQnlGaWVsZCIsInByb3BzIiwidXBkYXRlRmllbGQiLCJ2YWwiLCJwcm9wZXJ0eSIsInNob3dTY2FsZSIsInNlbGVjdGVkRmllbGQiLCJkZXNjcmlwdGlvbiIsInNjYWxlT3B0aW9ucyIsImxhYmVsIiwiaWQiLCJmaWVsZHMiLCJuYW1lIiwicGxhY2Vob2xkZXIiLCJzY2FsZVR5cGUiLCJ1cGRhdGVTY2FsZSIsImxlbmd0aCIsIkNvbXBvbmVudCIsInByb3BUeXBlcyIsImNoYW5uZWwiLCJQcm9wVHlwZXMiLCJzdHJpbmciLCJpc1JlcXVpcmVkIiwiYXJyYXlPZiIsImFueSIsImJvb2wiLCJmdW5jIiwib2JqZWN0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztvQkFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7OztBQUNBOzs7O0FBRUE7O0FBS0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7SUFFcUJBLHdCOzs7Ozs7Ozs7Ozs7Ozt3T0FrQm5CQyxpQixHQUFvQixlQUFPO0FBQ3pCLFlBQUtDLEtBQUwsQ0FBV0MsV0FBWCxDQUF1QkMsR0FBdkI7QUFDRCxLOzs7Ozs2QkFFUTtBQUFBLG1CQU9ILEtBQUtGLEtBUEY7QUFBQSxVQUVMRyxRQUZLLFVBRUxBLFFBRks7QUFBQSxVQUdMQyxTQUhLLFVBR0xBLFNBSEs7QUFBQSxVQUlMQyxhQUpLLFVBSUxBLGFBSks7QUFBQSxVQUtMQyxXQUxLLFVBS0xBLFdBTEs7QUFBQSx1Q0FNTEMsWUFOSztBQUFBLFVBTUxBLFlBTkssdUNBTVUsRUFOVjs7O0FBU1AsYUFDRTtBQUFDLDBDQUFEO0FBQUE7QUFDRTtBQUFDLDRDQUFEO0FBQUE7QUFDRTtBQUFDLCtDQUFEO0FBQUE7QUFDRTtBQUFDLDBDQUFEO0FBQUE7QUFDRyxtQkFBS1AsS0FBTCxDQUFXUSxLQUFYLElBQXVCLGtDQUFzQkwsUUFBdEIsQ0FBdkI7QUFESCxhQURGO0FBSUdHLDJCQUNDLDhCQUFDLG9CQUFEO0FBQ0UsMkJBQWFBLFdBRGY7QUFFRSxrQkFBTyxLQUFLTixLQUFMLENBQVdTLEVBQWxCLFNBQXdCTjtBQUYxQjtBQUxKLFdBREY7QUFZRSx3Q0FBQyx1QkFBRDtBQUNFLG9CQUFRLEtBQUtILEtBQUwsQ0FBV1UsTUFEckI7QUFFRSxtQkFBT0wsaUJBQWlCQSxjQUFjTSxJQUZ4QztBQUdFLHlCQUFhLEtBQUtYLEtBQUwsQ0FBV1ksV0FIMUI7QUFJRSxzQkFBVSxLQUFLYixpQkFKakI7QUFLRTtBQUxGO0FBWkYsU0FERjtBQXFCRTtBQUFBO0FBQUE7QUFDR0ssc0JBQ0MsOEJBQUMsZ0NBQUQ7QUFDRSx1QkFBVyxLQUFLSixLQUFMLENBQVdhLFNBRHhCO0FBRUUscUJBQVNOLFlBRlg7QUFHRSxtQkFBVUosUUFBVixXQUhGO0FBSUUsc0JBQVUsS0FBS0gsS0FBTCxDQUFXYyxXQUp2QjtBQUtFLHNCQUFVUCxhQUFhUSxNQUFiLEdBQXNCO0FBTGxDLFlBREQsR0FRRztBQVROO0FBckJGLE9BREY7QUFtQ0Q7OztFQWxFbURDLGdCLFVBQzdDQyxTLEdBQVk7QUFDakJDLFdBQVNDLG9CQUFVQyxNQUFWLENBQWlCQyxVQURUO0FBRWpCWCxVQUFRUyxvQkFBVUcsT0FBVixDQUFrQkgsb0JBQVVJLEdBQTVCLEVBQWlDRixVQUZ4QjtBQUdqQlosTUFBSVUsb0JBQVVDLE1BQVYsQ0FBaUJDLFVBSEo7QUFJakJsQixZQUFVZ0Isb0JBQVVDLE1BQVYsQ0FBaUJDLFVBSlY7QUFLakJqQixhQUFXZSxvQkFBVUssSUFBVixDQUFlSCxVQUxUO0FBTWpCcEIsZUFBYWtCLG9CQUFVTSxJQUFWLENBQWVKLFVBTlg7QUFPakJQLGVBQWFLLG9CQUFVTSxJQUFWLENBQWVKLFVBUFg7O0FBU2pCO0FBQ0FSLGFBQVdNLG9CQUFVQyxNQVZKO0FBV2pCZixpQkFBZWMsb0JBQVVPLE1BWFI7QUFZakJwQixlQUFhYSxvQkFBVUMsTUFaTjtBQWFqQlosU0FBT1csb0JBQVVDLE1BYkE7QUFjakJSLGVBQWFPLG9CQUFVQztBQWROLEM7a0JBREF0Qix3QjtBQW1FcEIiLCJmaWxlIjoidmlzLWNvbmZpZy1ieS1maWVsZC1zZWxlY3Rvci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgMjAxOCBVYmVyIFRlY2hub2xvZ2llcywgSW5jLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbi8vIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbi8vIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbi8vIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbi8vIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuLy8gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuLy8gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4vLyBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbi8vIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbi8vIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4vLyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4vLyBUSEUgU09GVFdBUkUuXG5cbmltcG9ydCBSZWFjdCwge0NvbXBvbmVudH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcblxuaW1wb3J0IHtcbiAgUGFuZWxMYWJlbCxcbiAgUGFuZWxMYWJlbFdyYXBwZXIsXG4gIFNpZGVQYW5lbFNlY3Rpb25cbn0gZnJvbSAnY29tcG9uZW50cy9jb21tb24vc3R5bGVkLWNvbXBvbmVudHMnO1xuaW1wb3J0IEZpZWxkU2VsZWN0b3IgZnJvbSAnY29tcG9uZW50cy9jb21tb24vZmllbGQtc2VsZWN0b3InO1xuaW1wb3J0IEluZm9IZWxwZXIgZnJvbSAnY29tcG9uZW50cy9jb21tb24vaW5mby1oZWxwZXInO1xuaW1wb3J0IERpbWVuc2lvblNjYWxlU2VsZWN0b3IgZnJvbSAnLi9kaW1lbnNpb24tc2NhbGUtc2VsZWN0b3InO1xuaW1wb3J0IHtjYXBpdGFsaXplRmlyc3RMZXR0ZXJ9IGZyb20gJ3V0aWxzL3V0aWxzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVmlzQ29uZmlnQnlGaWVsZFNlbGVjdG9yIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICBjaGFubmVsOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgZmllbGRzOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMuYW55KS5pc1JlcXVpcmVkLFxuICAgIGlkOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgcHJvcGVydHk6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICBzaG93U2NhbGU6IFByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXG4gICAgdXBkYXRlRmllbGQ6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgdXBkYXRlU2NhbGU6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG5cbiAgICAvLyBvcHRpb25hbFxuICAgIHNjYWxlVHlwZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBzZWxlY3RlZEZpZWxkOiBQcm9wVHlwZXMub2JqZWN0LFxuICAgIGRlc2NyaXB0aW9uOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGxhYmVsOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIHBsYWNlaG9sZGVyOiBQcm9wVHlwZXMuc3RyaW5nXG4gIH07XG5cbiAgX3VwZGF0ZVZpc0J5RmllbGQgPSB2YWwgPT4ge1xuICAgIHRoaXMucHJvcHMudXBkYXRlRmllbGQodmFsKTtcbiAgfTtcblxuICByZW5kZXIoKSB7XG4gICAgY29uc3Qge1xuICAgICAgcHJvcGVydHksXG4gICAgICBzaG93U2NhbGUsXG4gICAgICBzZWxlY3RlZEZpZWxkLFxuICAgICAgZGVzY3JpcHRpb24sXG4gICAgICBzY2FsZU9wdGlvbnMgPSBbXVxuICAgIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxTaWRlUGFuZWxTZWN0aW9uPlxuICAgICAgICA8U2lkZVBhbmVsU2VjdGlvbj5cbiAgICAgICAgICA8UGFuZWxMYWJlbFdyYXBwZXI+XG4gICAgICAgICAgICA8UGFuZWxMYWJlbD5cbiAgICAgICAgICAgICAge3RoaXMucHJvcHMubGFiZWwgfHwgYCR7Y2FwaXRhbGl6ZUZpcnN0TGV0dGVyKHByb3BlcnR5KX0gYmFzZWQgb25gfVxuICAgICAgICAgICAgPC9QYW5lbExhYmVsPlxuICAgICAgICAgICAge2Rlc2NyaXB0aW9uICYmIChcbiAgICAgICAgICAgICAgPEluZm9IZWxwZXJcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbj17ZGVzY3JpcHRpb259XG4gICAgICAgICAgICAgICAgaWQ9e2Ake3RoaXMucHJvcHMuaWR9LSR7cHJvcGVydHl9YH1cbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICl9XG4gICAgICAgICAgPC9QYW5lbExhYmVsV3JhcHBlcj5cbiAgICAgICAgICA8RmllbGRTZWxlY3RvclxuICAgICAgICAgICAgZmllbGRzPXt0aGlzLnByb3BzLmZpZWxkc31cbiAgICAgICAgICAgIHZhbHVlPXtzZWxlY3RlZEZpZWxkICYmIHNlbGVjdGVkRmllbGQubmFtZX1cbiAgICAgICAgICAgIHBsYWNlaG9sZGVyPXt0aGlzLnByb3BzLnBsYWNlaG9sZGVyfVxuICAgICAgICAgICAgb25TZWxlY3Q9e3RoaXMuX3VwZGF0ZVZpc0J5RmllbGR9XG4gICAgICAgICAgICBlcmFzYWJsZVxuICAgICAgICAgIC8+XG4gICAgICAgIDwvU2lkZVBhbmVsU2VjdGlvbj5cbiAgICAgICAgPGRpdj5cbiAgICAgICAgICB7c2hvd1NjYWxlID8gKFxuICAgICAgICAgICAgPERpbWVuc2lvblNjYWxlU2VsZWN0b3JcbiAgICAgICAgICAgICAgc2NhbGVUeXBlPXt0aGlzLnByb3BzLnNjYWxlVHlwZX1cbiAgICAgICAgICAgICAgb3B0aW9ucz17c2NhbGVPcHRpb25zfVxuICAgICAgICAgICAgICBsYWJlbD17YCR7cHJvcGVydHl9IHNjYWxlYH1cbiAgICAgICAgICAgICAgb25TZWxlY3Q9e3RoaXMucHJvcHMudXBkYXRlU2NhbGV9XG4gICAgICAgICAgICAgIGRpc2FibGVkPXtzY2FsZU9wdGlvbnMubGVuZ3RoIDwgMn1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgKSA6IG51bGx9XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9TaWRlUGFuZWxTZWN0aW9uPlxuICAgICk7XG4gIH1cbn07XG4iXX0=