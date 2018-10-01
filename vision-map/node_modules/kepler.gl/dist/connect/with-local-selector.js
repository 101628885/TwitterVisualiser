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

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

var identity = function identity(state) {
  return state;
};

var mergeSelectors = function mergeSelectors(parentSelector, childSelector) {
  return function (state) {
    return childSelector(parentSelector(state));
  };
};

var computeSelector = function computeSelector(props, ctx) {
  return mergeSelectors(ctx.selector ? ctx.selector : identity, props.selector ? props.selector : identity);
};

// store the parent selector in the parent context
// and return the parent component
// when a selector is passed to a container component,
// it will be stored in the context and passed down to child components,
// as well as prop to the given component
var withLocalSelector = function withLocalSelector(ParentComponent) {
  var WithConnectSelector = function (_Component) {
    (0, _inherits3.default)(WithConnectSelector, _Component);

    function WithConnectSelector(props, ctx) {
      (0, _classCallCheck3.default)(this, WithConnectSelector);

      var _this = (0, _possibleConstructorReturn3.default)(this, (WithConnectSelector.__proto__ || Object.getPrototypeOf(WithConnectSelector)).call(this, props, ctx));

      _this.selector = computeSelector(props, ctx);
      _this.id = props.id;
      return _this;
    }

    (0, _createClass3.default)(WithConnectSelector, [{
      key: 'getChildContext',
      value: function getChildContext() {
        return {
          selector: this.selector,
          id: this.id
        };
      }
    }, {
      key: 'componentWillReceiveProps',
      value: function componentWillReceiveProps(nextProps, nextContext) {
        this.selector = computeSelector(nextProps, nextContext);
        this.id = nextProps.id;
      }
    }, {
      key: 'render',
      value: function render() {
        return _react2.default.createElement(ParentComponent, (0, _extends3.default)({}, this.props, { selector: this.selector }));
      }
    }]);
    return WithConnectSelector;
  }(_react.Component);

  WithConnectSelector.contextTypes = {
    selector: _propTypes2.default.func,
    id: _propTypes2.default.string
  };

  WithConnectSelector.childContextTypes = {
    selector: _propTypes2.default.func,
    id: _propTypes2.default.string
  };

  return WithConnectSelector;
};

exports.default = withLocalSelector;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb25uZWN0L3dpdGgtbG9jYWwtc2VsZWN0b3IuanMiXSwibmFtZXMiOlsiaWRlbnRpdHkiLCJzdGF0ZSIsIm1lcmdlU2VsZWN0b3JzIiwicGFyZW50U2VsZWN0b3IiLCJjaGlsZFNlbGVjdG9yIiwiY29tcHV0ZVNlbGVjdG9yIiwicHJvcHMiLCJjdHgiLCJzZWxlY3RvciIsIndpdGhMb2NhbFNlbGVjdG9yIiwiV2l0aENvbm5lY3RTZWxlY3RvciIsImlkIiwibmV4dFByb3BzIiwibmV4dENvbnRleHQiLCJDb21wb25lbnQiLCJjb250ZXh0VHlwZXMiLCJQcm9wVHlwZXMiLCJmdW5jIiwic3RyaW5nIiwiY2hpbGRDb250ZXh0VHlwZXMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBb0JBOzs7O0FBQ0E7Ozs7OztBQXJCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFLQSxJQUFNQSxXQUFXLFNBQVhBLFFBQVc7QUFBQSxTQUFTQyxLQUFUO0FBQUEsQ0FBakI7O0FBRUEsSUFBTUMsaUJBQWlCLFNBQWpCQSxjQUFpQixDQUFDQyxjQUFELEVBQWlCQyxhQUFqQjtBQUFBLFNBQW1DO0FBQUEsV0FDeERBLGNBQWNELGVBQWVGLEtBQWYsQ0FBZCxDQUR3RDtBQUFBLEdBQW5DO0FBQUEsQ0FBdkI7O0FBR0EsSUFBTUksa0JBQWtCLFNBQWxCQSxlQUFrQixDQUFDQyxLQUFELEVBQVFDLEdBQVI7QUFBQSxTQUN0QkwsZUFDRUssSUFBSUMsUUFBSixHQUFlRCxJQUFJQyxRQUFuQixHQUE4QlIsUUFEaEMsRUFFRU0sTUFBTUUsUUFBTixHQUFpQkYsTUFBTUUsUUFBdkIsR0FBa0NSLFFBRnBDLENBRHNCO0FBQUEsQ0FBeEI7O0FBTUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQU1TLG9CQUFvQixTQUFwQkEsaUJBQW9CLGtCQUFtQjtBQUFBLE1BQ3JDQyxtQkFEcUM7QUFBQTs7QUFFekMsaUNBQVlKLEtBQVosRUFBbUJDLEdBQW5CLEVBQXdCO0FBQUE7O0FBQUEsMEpBQ2hCRCxLQURnQixFQUNUQyxHQURTOztBQUd0QixZQUFLQyxRQUFMLEdBQWdCSCxnQkFBZ0JDLEtBQWhCLEVBQXVCQyxHQUF2QixDQUFoQjtBQUNBLFlBQUtJLEVBQUwsR0FBVUwsTUFBTUssRUFBaEI7QUFKc0I7QUFLdkI7O0FBUHdDO0FBQUE7QUFBQSx3Q0FTdkI7QUFDaEIsZUFBTztBQUNMSCxvQkFBVSxLQUFLQSxRQURWO0FBRUxHLGNBQUksS0FBS0E7QUFGSixTQUFQO0FBSUQ7QUFkd0M7QUFBQTtBQUFBLGdEQWdCZkMsU0FoQmUsRUFnQkpDLFdBaEJJLEVBZ0JTO0FBQ2hELGFBQUtMLFFBQUwsR0FBZ0JILGdCQUFnQk8sU0FBaEIsRUFBMkJDLFdBQTNCLENBQWhCO0FBQ0EsYUFBS0YsRUFBTCxHQUFVQyxVQUFVRCxFQUFwQjtBQUNEO0FBbkJ3QztBQUFBO0FBQUEsK0JBcUJoQztBQUNQLGVBQU8sOEJBQUMsZUFBRCw2QkFBcUIsS0FBS0wsS0FBMUIsSUFBaUMsVUFBVSxLQUFLRSxRQUFoRCxJQUFQO0FBQ0Q7QUF2QndDO0FBQUE7QUFBQSxJQUNUTSxnQkFEUzs7QUEwQjNDSixzQkFBb0JLLFlBQXBCLEdBQW1DO0FBQ2pDUCxjQUFVUSxvQkFBVUMsSUFEYTtBQUVqQ04sUUFBSUssb0JBQVVFO0FBRm1CLEdBQW5DOztBQUtBUixzQkFBb0JTLGlCQUFwQixHQUF3QztBQUN0Q1gsY0FBVVEsb0JBQVVDLElBRGtCO0FBRXRDTixRQUFJSyxvQkFBVUU7QUFGd0IsR0FBeEM7O0FBS0EsU0FBT1IsbUJBQVA7QUFDRCxDQXJDRDs7a0JBdUNlRCxpQiIsImZpbGUiOiJ3aXRoLWxvY2FsLXNlbGVjdG9yLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSAyMDE4IFViZXIgVGVjaG5vbG9naWVzLCBJbmMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuLy8gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuLy8gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuLy8gdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuLy8gY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4vLyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4vLyBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4vLyBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbi8vIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuLy8gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuLy8gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbi8vIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbi8vIFRIRSBTT0ZUV0FSRS5cblxuaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50fSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuXG5jb25zdCBpZGVudGl0eSA9IHN0YXRlID0+IHN0YXRlO1xuXG5jb25zdCBtZXJnZVNlbGVjdG9ycyA9IChwYXJlbnRTZWxlY3RvciwgY2hpbGRTZWxlY3RvcikgPT4gc3RhdGUgPT5cbiAgY2hpbGRTZWxlY3RvcihwYXJlbnRTZWxlY3RvcihzdGF0ZSkpO1xuXG5jb25zdCBjb21wdXRlU2VsZWN0b3IgPSAocHJvcHMsIGN0eCkgPT5cbiAgbWVyZ2VTZWxlY3RvcnMoXG4gICAgY3R4LnNlbGVjdG9yID8gY3R4LnNlbGVjdG9yIDogaWRlbnRpdHksXG4gICAgcHJvcHMuc2VsZWN0b3IgPyBwcm9wcy5zZWxlY3RvciA6IGlkZW50aXR5XG4gICk7XG5cbi8vIHN0b3JlIHRoZSBwYXJlbnQgc2VsZWN0b3IgaW4gdGhlIHBhcmVudCBjb250ZXh0XG4vLyBhbmQgcmV0dXJuIHRoZSBwYXJlbnQgY29tcG9uZW50XG4vLyB3aGVuIGEgc2VsZWN0b3IgaXMgcGFzc2VkIHRvIGEgY29udGFpbmVyIGNvbXBvbmVudCxcbi8vIGl0IHdpbGwgYmUgc3RvcmVkIGluIHRoZSBjb250ZXh0IGFuZCBwYXNzZWQgZG93biB0byBjaGlsZCBjb21wb25lbnRzLFxuLy8gYXMgd2VsbCBhcyBwcm9wIHRvIHRoZSBnaXZlbiBjb21wb25lbnRcbmNvbnN0IHdpdGhMb2NhbFNlbGVjdG9yID0gUGFyZW50Q29tcG9uZW50ID0+IHtcbiAgY2xhc3MgV2l0aENvbm5lY3RTZWxlY3RvciBleHRlbmRzIENvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMsIGN0eCkge1xuICAgICAgc3VwZXIocHJvcHMsIGN0eCk7XG5cbiAgICAgIHRoaXMuc2VsZWN0b3IgPSBjb21wdXRlU2VsZWN0b3IocHJvcHMsIGN0eCk7XG4gICAgICB0aGlzLmlkID0gcHJvcHMuaWQ7XG4gICAgfVxuXG4gICAgZ2V0Q2hpbGRDb250ZXh0KCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgc2VsZWN0b3I6IHRoaXMuc2VsZWN0b3IsXG4gICAgICAgIGlkOiB0aGlzLmlkXG4gICAgICB9O1xuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzLCBuZXh0Q29udGV4dCkge1xuICAgICAgdGhpcy5zZWxlY3RvciA9IGNvbXB1dGVTZWxlY3RvcihuZXh0UHJvcHMsIG5leHRDb250ZXh0KTtcbiAgICAgIHRoaXMuaWQgPSBuZXh0UHJvcHMuaWQ7XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgcmV0dXJuIDxQYXJlbnRDb21wb25lbnQgey4uLnRoaXMucHJvcHN9IHNlbGVjdG9yPXt0aGlzLnNlbGVjdG9yfSAvPjtcbiAgICB9XG4gIH1cblxuICBXaXRoQ29ubmVjdFNlbGVjdG9yLmNvbnRleHRUeXBlcyA9IHtcbiAgICBzZWxlY3RvcjogUHJvcFR5cGVzLmZ1bmMsXG4gICAgaWQ6IFByb3BUeXBlcy5zdHJpbmdcbiAgfTtcblxuICBXaXRoQ29ubmVjdFNlbGVjdG9yLmNoaWxkQ29udGV4dFR5cGVzID0ge1xuICAgIHNlbGVjdG9yOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBpZDogUHJvcFR5cGVzLnN0cmluZ1xuICB9O1xuXG4gIHJldHVybiBXaXRoQ29ubmVjdFNlbGVjdG9yO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgd2l0aExvY2FsU2VsZWN0b3I7XG4iXX0=