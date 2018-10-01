'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

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

var _templateObject = (0, _taggedTemplateLiteral3.default)(['\n  .selection {\n    stroke: none;\n    fill: ', ';\n    opacity: 1;\n  }\n'], ['\n  .selection {\n    stroke: none;\n    fill: ', ';\n    opacity: 1;\n  }\n']); // Copyright (c) 2018 Uber Technologies, Inc.
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

var _d3Selection = require('d3-selection');

var _d3Brush = require('d3-brush');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var StyledG = _styledComponents2.default.g(_templateObject, function (props) {
  return props.theme.rangeBrushBgd;
});

var RangeBrush = (_temp = _class = function (_Component) {
  (0, _inherits3.default)(RangeBrush, _Component);

  function RangeBrush() {
    (0, _classCallCheck3.default)(this, RangeBrush);
    return (0, _possibleConstructorReturn3.default)(this, (RangeBrush.__proto__ || Object.getPrototypeOf(RangeBrush)).apply(this, arguments));
  }

  (0, _createClass3.default)(RangeBrush, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      var _props = this.props,
          _props$range = (0, _slicedToArray3.default)(_props.range, 2),
          min = _props$range[0],
          max = _props$range[1],
          _props$value = (0, _slicedToArray3.default)(_props.value, 2),
          val0 = _props$value[0],
          val1 = _props$value[1];
      // We want the React app to respond to brush state and vice-versa
      // but d3-brush fires the same events for both user-initiated brushing
      // and programmatic brushing (brush.move). We need these flags to
      // distinguish between the uses.
      //
      // We don't use state because that would trigger another `componentDidUpate`


      this.brushing = false;
      this.moving = false;

      this.root = (0, _d3Selection.select)(this.rootContainer);
      this.brush = (0, _d3Brush.brushX)().on('start', function () {
        _this2.brushing = true;
      }).on('brush', function () {
        if (_this2.moving) {
          return;
        }

        _d3Selection.event.selection === null ? _this2._reset() : _this2._brush(_d3Selection.event.selection);
      }).on('end', function () {
        if (!_this2.moving && _d3Selection.event.selection === null) {
          _this2._reset();
        }

        _this2.brushing = false;
        _this2.moving = false;
      });

      this.root.call(this.brush);

      if (val0 === min && val1 === max) {
        this._reset();
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      var _props2 = this.props,
          _props2$range = (0, _slicedToArray3.default)(_props2.range, 2),
          min = _props2$range[0],
          max = _props2$range[1],
          _props2$value = (0, _slicedToArray3.default)(_props2.value, 2),
          val0 = _props2$value[0],
          val1 = _props2$value[1],
          width = _props2.width;

      var _prevProps$value = (0, _slicedToArray3.default)(prevProps.value, 2),
          prevVal0 = _prevProps$value[0],
          prevVal1 = _prevProps$value[1];

      if (prevProps.width !== width) {
        this.root.call(this.brush);
        this._move(val0, val1);
      }

      if (!this.brushing && !this.moving) {
        if (val0 === min && val1 === max) {
          this.moving = true;
          this.brush.move(this.root, null);
        }

        if (prevVal0 !== val0 || prevVal1 !== val1) {
          this.moving = true;
          this._move(val0, val1);
        }
      }
    }
  }, {
    key: '_reset',
    value: function _reset() {
      var _props$range2 = (0, _slicedToArray3.default)(this.props.range, 2),
          minValue = _props$range2[0],
          maxValue = _props$range2[1];

      this.props.onBrush(minValue, maxValue);
    }
  }, {
    key: '_move',
    value: function _move(val0, val1) {
      var _props3 = this.props,
          _props3$domain = (0, _slicedToArray3.default)(_props3.domain, 2),
          min = _props3$domain[0],
          max = _props3$domain[1],
          width = _props3.width;

      var scale = function scale(x) {
        return (x - min) * width / (max - min);
      };
      this.brush.move(this.root, [scale(val0), scale(val1)]);
    }
  }, {
    key: '_brush',
    value: function _brush(_ref) {
      var _ref2 = (0, _slicedToArray3.default)(_ref, 2),
          sel0 = _ref2[0],
          sel1 = _ref2[1];

      var _props4 = this.props,
          _props4$domain = (0, _slicedToArray3.default)(_props4.domain, 2),
          min = _props4$domain[0],
          max = _props4$domain[1],
          onBrush = _props4.onBrush,
          width = _props4.width;

      var invert = function invert(x) {
        return x * (max - min) / width + min;
      };
      onBrush(invert(sel0), invert(sel1));
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      return _react2.default.createElement(StyledG, { className: 'kg-range-slider__brush',
        innerRef: function innerRef(comp) {
          _this3.rootContainer = comp;
        } });
    }
  }]);
  return RangeBrush;
}(_react.Component), _class.propTypes = {
  domain: _propTypes2.default.arrayOf(_propTypes2.default.number).isRequired,
  onBrush: _propTypes2.default.func.isRequired,
  range: _propTypes2.default.arrayOf(_propTypes2.default.number).isRequired,
  value: _propTypes2.default.arrayOf(_propTypes2.default.number).isRequired,
  width: _propTypes2.default.number.isRequired
}, _temp);
exports.default = RangeBrush;
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2NvbW1vbi9yYW5nZS1icnVzaC5qcyJdLCJuYW1lcyI6WyJTdHlsZWRHIiwic3R5bGVkIiwiZyIsInByb3BzIiwidGhlbWUiLCJyYW5nZUJydXNoQmdkIiwiUmFuZ2VCcnVzaCIsInJhbmdlIiwibWluIiwibWF4IiwidmFsdWUiLCJ2YWwwIiwidmFsMSIsImJydXNoaW5nIiwibW92aW5nIiwicm9vdCIsInJvb3RDb250YWluZXIiLCJicnVzaCIsIm9uIiwiZXZlbnQiLCJzZWxlY3Rpb24iLCJfcmVzZXQiLCJfYnJ1c2giLCJjYWxsIiwicHJldlByb3BzIiwid2lkdGgiLCJwcmV2VmFsMCIsInByZXZWYWwxIiwiX21vdmUiLCJtb3ZlIiwibWluVmFsdWUiLCJtYXhWYWx1ZSIsIm9uQnJ1c2giLCJkb21haW4iLCJzY2FsZSIsIngiLCJzZWwwIiwic2VsMSIsImludmVydCIsImNvbXAiLCJDb21wb25lbnQiLCJwcm9wVHlwZXMiLCJQcm9wVHlwZXMiLCJhcnJheU9mIiwibnVtYmVyIiwiaXNSZXF1aXJlZCIsImZ1bmMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztnT0FBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7OztBQUVBLElBQU1BLFVBQVVDLDJCQUFPQyxDQUFqQixrQkFHTTtBQUFBLFNBQVNDLE1BQU1DLEtBQU4sQ0FBWUMsYUFBckI7QUFBQSxDQUhOLENBQU47O0lBUXFCQyxVOzs7Ozs7Ozs7O3dDQVNDO0FBQUE7O0FBQUEsbUJBQytCLEtBQUtILEtBRHBDO0FBQUEsNkRBQ1hJLEtBRFc7QUFBQSxVQUNIQyxHQURHO0FBQUEsVUFDRUMsR0FERjtBQUFBLDZEQUNRQyxLQURSO0FBQUEsVUFDZ0JDLElBRGhCO0FBQUEsVUFDc0JDLElBRHRCO0FBRWxCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ0EsV0FBS0MsUUFBTCxHQUFnQixLQUFoQjtBQUNBLFdBQUtDLE1BQUwsR0FBYyxLQUFkOztBQUVBLFdBQUtDLElBQUwsR0FBWSx5QkFBTyxLQUFLQyxhQUFaLENBQVo7QUFDQSxXQUFLQyxLQUFMLEdBQWEsdUJBQ1ZDLEVBRFUsQ0FDUCxPQURPLEVBQ0UsWUFBTTtBQUNqQixlQUFLTCxRQUFMLEdBQWdCLElBQWhCO0FBQ0QsT0FIVSxFQUlWSyxFQUpVLENBSVAsT0FKTyxFQUlFLFlBQU07QUFDakIsWUFBSSxPQUFLSixNQUFULEVBQWlCO0FBQ2Y7QUFDRDs7QUFFREssMkJBQU1DLFNBQU4sS0FBb0IsSUFBcEIsR0FBMkIsT0FBS0MsTUFBTCxFQUEzQixHQUEyQyxPQUFLQyxNQUFMLENBQVlILG1CQUFNQyxTQUFsQixDQUEzQztBQUNELE9BVlUsRUFXVkYsRUFYVSxDQVdQLEtBWE8sRUFXQSxZQUFNO0FBQ2YsWUFBSSxDQUFDLE9BQUtKLE1BQU4sSUFBZ0JLLG1CQUFNQyxTQUFOLEtBQW9CLElBQXhDLEVBQThDO0FBQzVDLGlCQUFLQyxNQUFMO0FBQ0Q7O0FBRUQsZUFBS1IsUUFBTCxHQUFnQixLQUFoQjtBQUNBLGVBQUtDLE1BQUwsR0FBYyxLQUFkO0FBQ0QsT0FsQlUsQ0FBYjs7QUFvQkEsV0FBS0MsSUFBTCxDQUFVUSxJQUFWLENBQWUsS0FBS04sS0FBcEI7O0FBRUEsVUFBSU4sU0FBU0gsR0FBVCxJQUFnQkksU0FBU0gsR0FBN0IsRUFBa0M7QUFDaEMsYUFBS1ksTUFBTDtBQUNEO0FBQ0Y7Ozt1Q0FFa0JHLFMsRUFBVztBQUFBLG9CQUM0QixLQUFLckIsS0FEakM7QUFBQSwrREFDckJJLEtBRHFCO0FBQUEsVUFDYkMsR0FEYTtBQUFBLFVBQ1JDLEdBRFE7QUFBQSwrREFDRkMsS0FERTtBQUFBLFVBQ01DLElBRE47QUFBQSxVQUNZQyxJQURaO0FBQUEsVUFDbUJhLEtBRG5CLFdBQ21CQSxLQURuQjs7QUFBQSwwREFFQ0QsVUFBVWQsS0FGWDtBQUFBLFVBRXJCZ0IsUUFGcUI7QUFBQSxVQUVYQyxRQUZXOztBQUk1QixVQUFJSCxVQUFVQyxLQUFWLEtBQW9CQSxLQUF4QixFQUErQjtBQUM3QixhQUFLVixJQUFMLENBQVVRLElBQVYsQ0FBZSxLQUFLTixLQUFwQjtBQUNBLGFBQUtXLEtBQUwsQ0FBV2pCLElBQVgsRUFBaUJDLElBQWpCO0FBQ0Q7O0FBRUQsVUFBSSxDQUFDLEtBQUtDLFFBQU4sSUFBa0IsQ0FBQyxLQUFLQyxNQUE1QixFQUFvQztBQUNsQyxZQUFJSCxTQUFTSCxHQUFULElBQWdCSSxTQUFTSCxHQUE3QixFQUFrQztBQUNoQyxlQUFLSyxNQUFMLEdBQWMsSUFBZDtBQUNBLGVBQUtHLEtBQUwsQ0FBV1ksSUFBWCxDQUFnQixLQUFLZCxJQUFyQixFQUEyQixJQUEzQjtBQUNEOztBQUVELFlBQUlXLGFBQWFmLElBQWIsSUFBcUJnQixhQUFhZixJQUF0QyxFQUE0QztBQUMxQyxlQUFLRSxNQUFMLEdBQWMsSUFBZDtBQUNBLGVBQUtjLEtBQUwsQ0FBV2pCLElBQVgsRUFBaUJDLElBQWpCO0FBQ0Q7QUFDRjtBQUNGOzs7NkJBRVE7QUFBQSx1REFDc0IsS0FBS1QsS0FBTCxDQUFXSSxLQURqQztBQUFBLFVBQ0F1QixRQURBO0FBQUEsVUFDVUMsUUFEVjs7QUFFUCxXQUFLNUIsS0FBTCxDQUFXNkIsT0FBWCxDQUFtQkYsUUFBbkIsRUFBNkJDLFFBQTdCO0FBQ0Q7OzswQkFFS3BCLEksRUFBTUMsSSxFQUFNO0FBQUEsb0JBQ29CLEtBQUtULEtBRHpCO0FBQUEsZ0VBQ1Q4QixNQURTO0FBQUEsVUFDQXpCLEdBREE7QUFBQSxVQUNLQyxHQURMO0FBQUEsVUFDV2dCLEtBRFgsV0FDV0EsS0FEWDs7QUFFaEIsVUFBTVMsUUFBUSxTQUFSQSxLQUFRO0FBQUEsZUFBSyxDQUFDQyxJQUFJM0IsR0FBTCxJQUFZaUIsS0FBWixJQUFxQmhCLE1BQU1ELEdBQTNCLENBQUw7QUFBQSxPQUFkO0FBQ0EsV0FBS1MsS0FBTCxDQUFXWSxJQUFYLENBQWdCLEtBQUtkLElBQXJCLEVBQTJCLENBQUNtQixNQUFNdkIsSUFBTixDQUFELEVBQWN1QixNQUFNdEIsSUFBTixDQUFkLENBQTNCO0FBQ0Q7OztpQ0FFb0I7QUFBQTtBQUFBLFVBQWJ3QixJQUFhO0FBQUEsVUFBUEMsSUFBTzs7QUFBQSxvQkFDMEIsS0FBS2xDLEtBRC9CO0FBQUEsZ0VBQ1o4QixNQURZO0FBQUEsVUFDSHpCLEdBREc7QUFBQSxVQUNFQyxHQURGO0FBQUEsVUFDUXVCLE9BRFIsV0FDUUEsT0FEUjtBQUFBLFVBQ2lCUCxLQURqQixXQUNpQkEsS0FEakI7O0FBRW5CLFVBQU1hLFNBQVMsU0FBVEEsTUFBUztBQUFBLGVBQUtILEtBQUsxQixNQUFNRCxHQUFYLElBQWtCaUIsS0FBbEIsR0FBMEJqQixHQUEvQjtBQUFBLE9BQWY7QUFDQXdCLGNBQVFNLE9BQU9GLElBQVAsQ0FBUixFQUFzQkUsT0FBT0QsSUFBUCxDQUF0QjtBQUNEOzs7NkJBRVE7QUFBQTs7QUFDUCxhQUFPLDhCQUFDLE9BQUQsSUFBUyxXQUFVLHdCQUFuQjtBQUNTLGtCQUFVLHdCQUFRO0FBQ2hDLGlCQUFLckIsYUFBTCxHQUFxQnVCLElBQXJCO0FBQ0QsU0FITSxHQUFQO0FBSUQ7OztFQTVGcUNDLGdCLFVBQy9CQyxTLEdBQVk7QUFDakJSLFVBQVFTLG9CQUFVQyxPQUFWLENBQWtCRCxvQkFBVUUsTUFBNUIsRUFBb0NDLFVBRDNCO0FBRWpCYixXQUFTVSxvQkFBVUksSUFBVixDQUFlRCxVQUZQO0FBR2pCdEMsU0FBT21DLG9CQUFVQyxPQUFWLENBQWtCRCxvQkFBVUUsTUFBNUIsRUFBb0NDLFVBSDFCO0FBSWpCbkMsU0FBT2dDLG9CQUFVQyxPQUFWLENBQWtCRCxvQkFBVUUsTUFBNUIsRUFBb0NDLFVBSjFCO0FBS2pCcEIsU0FBT2lCLG9CQUFVRSxNQUFWLENBQWlCQztBQUxQLEM7a0JBREF2QyxVO0FBNkZwQiIsImZpbGUiOiJyYW5nZS1icnVzaC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgMjAxOCBVYmVyIFRlY2hub2xvZ2llcywgSW5jLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbi8vIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbi8vIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbi8vIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbi8vIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuLy8gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuLy8gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4vLyBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbi8vIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbi8vIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4vLyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4vLyBUSEUgU09GVFdBUkUuXG5cbmltcG9ydCBSZWFjdCwge0NvbXBvbmVudH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCBzdHlsZWQgZnJvbSAnc3R5bGVkLWNvbXBvbmVudHMnO1xuaW1wb3J0IHtldmVudCwgc2VsZWN0fSBmcm9tICdkMy1zZWxlY3Rpb24nO1xuaW1wb3J0IHticnVzaFh9IGZyb20gJ2QzLWJydXNoJztcblxuY29uc3QgU3R5bGVkRyA9IHN0eWxlZC5nYFxuICAuc2VsZWN0aW9uIHtcbiAgICBzdHJva2U6IG5vbmU7XG4gICAgZmlsbDogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5yYW5nZUJydXNoQmdkfTtcbiAgICBvcGFjaXR5OiAxO1xuICB9XG5gO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSYW5nZUJydXNoIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICBkb21haW46IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5udW1iZXIpLmlzUmVxdWlyZWQsXG4gICAgb25CcnVzaDogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICByYW5nZTogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLm51bWJlcikuaXNSZXF1aXJlZCxcbiAgICB2YWx1ZTogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLm51bWJlcikuaXNSZXF1aXJlZCxcbiAgICB3aWR0aDogUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkXG4gIH07XG5cbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgY29uc3Qge3JhbmdlOiBbbWluLCBtYXhdLCB2YWx1ZTogW3ZhbDAsIHZhbDFdfSA9IHRoaXMucHJvcHM7XG4gICAgLy8gV2Ugd2FudCB0aGUgUmVhY3QgYXBwIHRvIHJlc3BvbmQgdG8gYnJ1c2ggc3RhdGUgYW5kIHZpY2UtdmVyc2FcbiAgICAvLyBidXQgZDMtYnJ1c2ggZmlyZXMgdGhlIHNhbWUgZXZlbnRzIGZvciBib3RoIHVzZXItaW5pdGlhdGVkIGJydXNoaW5nXG4gICAgLy8gYW5kIHByb2dyYW1tYXRpYyBicnVzaGluZyAoYnJ1c2gubW92ZSkuIFdlIG5lZWQgdGhlc2UgZmxhZ3MgdG9cbiAgICAvLyBkaXN0aW5ndWlzaCBiZXR3ZWVuIHRoZSB1c2VzLlxuICAgIC8vXG4gICAgLy8gV2UgZG9uJ3QgdXNlIHN0YXRlIGJlY2F1c2UgdGhhdCB3b3VsZCB0cmlnZ2VyIGFub3RoZXIgYGNvbXBvbmVudERpZFVwYXRlYFxuICAgIHRoaXMuYnJ1c2hpbmcgPSBmYWxzZTtcbiAgICB0aGlzLm1vdmluZyA9IGZhbHNlO1xuXG4gICAgdGhpcy5yb290ID0gc2VsZWN0KHRoaXMucm9vdENvbnRhaW5lcik7XG4gICAgdGhpcy5icnVzaCA9IGJydXNoWCgpXG4gICAgICAub24oJ3N0YXJ0JywgKCkgPT4ge1xuICAgICAgICB0aGlzLmJydXNoaW5nID0gdHJ1ZTtcbiAgICAgIH0pXG4gICAgICAub24oJ2JydXNoJywgKCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5tb3ZpbmcpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBldmVudC5zZWxlY3Rpb24gPT09IG51bGwgPyB0aGlzLl9yZXNldCgpIDogdGhpcy5fYnJ1c2goZXZlbnQuc2VsZWN0aW9uKTtcbiAgICAgIH0pXG4gICAgICAub24oJ2VuZCcsICgpID0+IHtcbiAgICAgICAgaWYgKCF0aGlzLm1vdmluZyAmJiBldmVudC5zZWxlY3Rpb24gPT09IG51bGwpIHtcbiAgICAgICAgICB0aGlzLl9yZXNldCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5icnVzaGluZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLm1vdmluZyA9IGZhbHNlO1xuICAgICAgfSk7XG5cbiAgICB0aGlzLnJvb3QuY2FsbCh0aGlzLmJydXNoKTtcblxuICAgIGlmICh2YWwwID09PSBtaW4gJiYgdmFsMSA9PT0gbWF4KSB7XG4gICAgICB0aGlzLl9yZXNldCgpO1xuICAgIH1cbiAgfVxuXG4gIGNvbXBvbmVudERpZFVwZGF0ZShwcmV2UHJvcHMpIHtcbiAgICBjb25zdCB7cmFuZ2U6IFttaW4sIG1heF0sIHZhbHVlOiBbdmFsMCwgdmFsMV0sIHdpZHRofSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgW3ByZXZWYWwwLCBwcmV2VmFsMV0gPSBwcmV2UHJvcHMudmFsdWU7XG5cbiAgICBpZiAocHJldlByb3BzLndpZHRoICE9PSB3aWR0aCkge1xuICAgICAgdGhpcy5yb290LmNhbGwodGhpcy5icnVzaCk7XG4gICAgICB0aGlzLl9tb3ZlKHZhbDAsIHZhbDEpO1xuICAgIH1cblxuICAgIGlmICghdGhpcy5icnVzaGluZyAmJiAhdGhpcy5tb3ZpbmcpIHtcbiAgICAgIGlmICh2YWwwID09PSBtaW4gJiYgdmFsMSA9PT0gbWF4KSB7XG4gICAgICAgIHRoaXMubW92aW5nID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5icnVzaC5tb3ZlKHRoaXMucm9vdCwgbnVsbCk7XG4gICAgICB9XG5cbiAgICAgIGlmIChwcmV2VmFsMCAhPT0gdmFsMCB8fCBwcmV2VmFsMSAhPT0gdmFsMSkge1xuICAgICAgICB0aGlzLm1vdmluZyA9IHRydWU7XG4gICAgICAgIHRoaXMuX21vdmUodmFsMCwgdmFsMSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgX3Jlc2V0KCkge1xuICAgIGNvbnN0IFttaW5WYWx1ZSwgbWF4VmFsdWVdID0gdGhpcy5wcm9wcy5yYW5nZTtcbiAgICB0aGlzLnByb3BzLm9uQnJ1c2gobWluVmFsdWUsIG1heFZhbHVlKTtcbiAgfVxuXG4gIF9tb3ZlKHZhbDAsIHZhbDEpIHtcbiAgICBjb25zdCB7ZG9tYWluOiBbbWluLCBtYXhdLCB3aWR0aH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHNjYWxlID0geCA9PiAoeCAtIG1pbikgKiB3aWR0aCAvIChtYXggLSBtaW4pO1xuICAgIHRoaXMuYnJ1c2gubW92ZSh0aGlzLnJvb3QsIFtzY2FsZSh2YWwwKSwgc2NhbGUodmFsMSldKTtcbiAgfVxuXG4gIF9icnVzaChbc2VsMCwgc2VsMV0pIHtcbiAgICBjb25zdCB7ZG9tYWluOiBbbWluLCBtYXhdLCBvbkJydXNoLCB3aWR0aH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IGludmVydCA9IHggPT4geCAqIChtYXggLSBtaW4pIC8gd2lkdGggKyBtaW47XG4gICAgb25CcnVzaChpbnZlcnQoc2VsMCksIGludmVydChzZWwxKSk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIDxTdHlsZWRHIGNsYXNzTmFtZT1cImtnLXJhbmdlLXNsaWRlcl9fYnJ1c2hcIlxuICAgICAgICAgICAgICAgICAgICBpbm5lclJlZj17Y29tcCA9PiB7XG4gICAgICB0aGlzLnJvb3RDb250YWluZXIgPSBjb21wO1xuICAgIH19Lz47XG4gIH1cbn07XG4iXX0=