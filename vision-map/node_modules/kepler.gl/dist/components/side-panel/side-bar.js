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

var _taggedTemplateLiteral2 = require('babel-runtime/helpers/taggedTemplateLiteral');

var _taggedTemplateLiteral3 = _interopRequireDefault(_taggedTemplateLiteral2);

var _class, _temp2;

var _templateObject = (0, _taggedTemplateLiteral3.default)(['\n  z-index: 99;\n  height: 100%;\n  width: ', 'px;\n  display: flex;\n  transition: width 250ms;\n  position: absolute;\n  padding-top: ', 'px;\n  padding-right: ', 'px;\n  padding-bottom: ', 'px;\n  padding-left: ', 'px;\n'], ['\n  z-index: 99;\n  height: 100%;\n  width: ', 'px;\n  display: flex;\n  transition: width 250ms;\n  position: absolute;\n  padding-top: ', 'px;\n  padding-right: ', 'px;\n  padding-bottom: ', 'px;\n  padding-left: ', 'px;\n']),
    _templateObject2 = (0, _taggedTemplateLiteral3.default)(['\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);\n  transition: left 250ms, right 250ms;\n  left: ', 'px;\n  align-items: stretch;\n  flex-grow: 1;\n'], ['\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);\n  transition: left 250ms, right 250ms;\n  left: ', 'px;\n  align-items: stretch;\n  flex-grow: 1;\n']),
    _templateObject3 = (0, _taggedTemplateLiteral3.default)(['\n  background-color: ', ';\n  border-radius: 1px;\n  display: flex;\n  flex-direction: column;\n  height: 100%;\n'], ['\n  background-color: ', ';\n  border-radius: 1px;\n  display: flex;\n  flex-direction: column;\n  height: 100%;\n']),
    _templateObject4 = (0, _taggedTemplateLiteral3.default)(['\n  align-items: center;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);\n  justify-content: center;\n  background-color: ', ';\n  border-radius: 1px;\n  color: ', ';\n  display: flex;\n  height: 20px;\n  position: absolute;\n  right: -8px;\n  top: ', 'px;\n  width: 20px;\n\n  :hover {\n    cursor: pointer;\n    box-shadow: none;\n    background-color: ', ';\n  }\n'], ['\n  align-items: center;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);\n  justify-content: center;\n  background-color: ', ';\n  border-radius: 1px;\n  color: ', ';\n  display: flex;\n  height: 20px;\n  position: absolute;\n  right: -8px;\n  top: ', 'px;\n  width: 20px;\n\n  :hover {\n    cursor: pointer;\n    box-shadow: none;\n    background-color: ', ';\n  }\n']); // Copyright (c) 2018 Uber Technologies, Inc.
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

var _icons = require('../common/icons');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var StyledSidePanelContainer = _styledComponents2.default.div(_templateObject, function (props) {
  return props.width + 2 * props.theme.sidePanel.margin.left;
}, function (props) {
  return props.theme.sidePanel.margin.top;
}, function (props) {
  return props.theme.sidePanel.margin.right;
}, function (props) {
  return props.theme.sidePanel.margin.bottom;
}, function (props) {
  return props.theme.sidePanel.margin.left;
});

var SideBarContainer = _styledComponents2.default.div(_templateObject2, function (props) {
  return props.left;
});

var SideBarInner = _styledComponents2.default.div(_templateObject3, function (props) {
  return props.theme.sidePanelBg;
});

var CollapseButton = _styledComponents2.default.div(_templateObject4, function (props) {
  return props.theme.sideBarCloseBtnBgd;
}, function (props) {
  return props.theme.sideBarCloseBtnColor;
}, function (props) {
  return props.theme.sidePanel.margin.top;
}, function (props) {
  return props.theme.sideBarCloseBtnBgdHover;
});

var SideBar = (_temp2 = _class = function (_Component) {
  (0, _inherits3.default)(SideBar, _Component);

  function SideBar() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, SideBar);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = SideBar.__proto__ || Object.getPrototypeOf(SideBar)).call.apply(_ref, [this].concat(args))), _this), _this._onOpenOrClose = function () {
      _this.props.onOpenOrClose({ isOpen: !_this.props.isOpen });
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(SideBar, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          isOpen = _props.isOpen,
          minifiedWidth = _props.minifiedWidth,
          width = _props.width;

      var horizontalOffset = isOpen ? 0 : minifiedWidth - width;

      return _react2.default.createElement(
        StyledSidePanelContainer,
        {
          width: isOpen ? width : 0,
          className: 'side-panel--container'
        },
        _react2.default.createElement(
          SideBarContainer,
          { className: 'side-bar', style: { width: width + 'px' },
            left: horizontalOffset },
          isOpen ? _react2.default.createElement(
            SideBarInner,
            { className: 'side-bar__inner' },
            this.props.children
          ) : null,
          _react2.default.createElement(
            CollapseButton,
            {
              className: 'side-bar__close',
              onClick: this._onOpenOrClose
            },
            _react2.default.createElement(_icons.ArrowRight, {
              height: '12px',
              style: { transform: 'rotate(' + (isOpen ? 180 : 0) + 'deg)' }
            })
          )
        )
      );
    }
  }]);
  return SideBar;
}(_react.Component), _class.defaultProps = {
  width: 300,
  minifiedWidth: 0,
  isOpen: true,
  onOpenOrClose: function noop() {}
}, _class.propTypes = {
  width: _propTypes2.default.number,
  isOpen: _propTypes2.default.bool,
  minifiedWidth: _propTypes2.default.number,
  onOpenOrClose: _propTypes2.default.func
}, _temp2);
exports.default = SideBar;
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3NpZGUtcGFuZWwvc2lkZS1iYXIuanMiXSwibmFtZXMiOlsiU3R5bGVkU2lkZVBhbmVsQ29udGFpbmVyIiwic3R5bGVkIiwiZGl2IiwicHJvcHMiLCJ3aWR0aCIsInRoZW1lIiwic2lkZVBhbmVsIiwibWFyZ2luIiwibGVmdCIsInRvcCIsInJpZ2h0IiwiYm90dG9tIiwiU2lkZUJhckNvbnRhaW5lciIsIlNpZGVCYXJJbm5lciIsInNpZGVQYW5lbEJnIiwiQ29sbGFwc2VCdXR0b24iLCJzaWRlQmFyQ2xvc2VCdG5CZ2QiLCJzaWRlQmFyQ2xvc2VCdG5Db2xvciIsInNpZGVCYXJDbG9zZUJ0bkJnZEhvdmVyIiwiU2lkZUJhciIsIl9vbk9wZW5PckNsb3NlIiwib25PcGVuT3JDbG9zZSIsImlzT3BlbiIsIm1pbmlmaWVkV2lkdGgiLCJob3Jpem9udGFsT2Zmc2V0IiwiY2hpbGRyZW4iLCJ0cmFuc2Zvcm0iLCJDb21wb25lbnQiLCJkZWZhdWx0UHJvcHMiLCJub29wIiwicHJvcFR5cGVzIiwiUHJvcFR5cGVzIiwibnVtYmVyIiwiYm9vbCIsImZ1bmMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2l5QkFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUVBLElBQU1BLDJCQUEyQkMsMkJBQU9DLEdBQWxDLGtCQUdLO0FBQUEsU0FBU0MsTUFBTUMsS0FBTixHQUFjLElBQUlELE1BQU1FLEtBQU4sQ0FBWUMsU0FBWixDQUFzQkMsTUFBdEIsQ0FBNkJDLElBQXhEO0FBQUEsQ0FITCxFQU9XO0FBQUEsU0FBU0wsTUFBTUUsS0FBTixDQUFZQyxTQUFaLENBQXNCQyxNQUF0QixDQUE2QkUsR0FBdEM7QUFBQSxDQVBYLEVBUWE7QUFBQSxTQUFTTixNQUFNRSxLQUFOLENBQVlDLFNBQVosQ0FBc0JDLE1BQXRCLENBQTZCRyxLQUF0QztBQUFBLENBUmIsRUFTYztBQUFBLFNBQVNQLE1BQU1FLEtBQU4sQ0FBWUMsU0FBWixDQUFzQkMsTUFBdEIsQ0FBNkJJLE1BQXRDO0FBQUEsQ0FUZCxFQVVZO0FBQUEsU0FBU1IsTUFBTUUsS0FBTixDQUFZQyxTQUFaLENBQXNCQyxNQUF0QixDQUE2QkMsSUFBdEM7QUFBQSxDQVZaLENBQU47O0FBYUEsSUFBTUksbUJBQW1CWCwyQkFBT0MsR0FBMUIsbUJBR0k7QUFBQSxTQUFTQyxNQUFNSyxJQUFmO0FBQUEsQ0FISixDQUFOOztBQVFBLElBQU1LLGVBQWVaLDJCQUFPQyxHQUF0QixtQkFDZ0I7QUFBQSxTQUFTQyxNQUFNRSxLQUFOLENBQVlTLFdBQXJCO0FBQUEsQ0FEaEIsQ0FBTjs7QUFRQSxJQUFNQyxpQkFBaUJkLDJCQUFPQyxHQUF4QixtQkFJZ0I7QUFBQSxTQUFTQyxNQUFNRSxLQUFOLENBQVlXLGtCQUFyQjtBQUFBLENBSmhCLEVBTUs7QUFBQSxTQUFTYixNQUFNRSxLQUFOLENBQVlZLG9CQUFyQjtBQUFBLENBTkwsRUFXRztBQUFBLFNBQVNkLE1BQU1FLEtBQU4sQ0FBWUMsU0FBWixDQUFzQkMsTUFBdEIsQ0FBNkJFLEdBQXRDO0FBQUEsQ0FYSCxFQWlCa0I7QUFBQSxTQUFTTixNQUFNRSxLQUFOLENBQVlhLHVCQUFyQjtBQUFBLENBakJsQixDQUFOOztJQXFCcUJDLE87Ozs7Ozs7Ozs7Ozs7O3NNQWVuQkMsYyxHQUFpQixZQUFNO0FBQ3JCLFlBQUtqQixLQUFMLENBQVdrQixhQUFYLENBQXlCLEVBQUNDLFFBQVEsQ0FBQyxNQUFLbkIsS0FBTCxDQUFXbUIsTUFBckIsRUFBekI7QUFDRCxLOzs7Ozs2QkFFUTtBQUFBLG1CQUNnQyxLQUFLbkIsS0FEckM7QUFBQSxVQUNBbUIsTUFEQSxVQUNBQSxNQURBO0FBQUEsVUFDUUMsYUFEUixVQUNRQSxhQURSO0FBQUEsVUFDdUJuQixLQUR2QixVQUN1QkEsS0FEdkI7O0FBRVAsVUFBTW9CLG1CQUFtQkYsU0FBUyxDQUFULEdBQWFDLGdCQUFnQm5CLEtBQXREOztBQUVBLGFBQ0U7QUFBQyxnQ0FBRDtBQUFBO0FBQ0UsaUJBQU9rQixTQUFTbEIsS0FBVCxHQUFpQixDQUQxQjtBQUVFLHFCQUFVO0FBRlo7QUFJRTtBQUFDLDBCQUFEO0FBQUEsWUFBa0IsV0FBVSxVQUE1QixFQUF1QyxPQUFPLEVBQUNBLE9BQVVBLEtBQVYsT0FBRCxFQUE5QztBQUNrQixrQkFBTW9CLGdCQUR4QjtBQUVHRixtQkFDQztBQUFDLHdCQUFEO0FBQUEsY0FBYyxXQUFVLGlCQUF4QjtBQUNHLGlCQUFLbkIsS0FBTCxDQUFXc0I7QUFEZCxXQURELEdBSUcsSUFOTjtBQU9FO0FBQUMsMEJBQUQ7QUFBQTtBQUNFLHlCQUFVLGlCQURaO0FBRUUsdUJBQVMsS0FBS0w7QUFGaEI7QUFJRSwwQ0FBQyxpQkFBRDtBQUNFLHNCQUFPLE1BRFQ7QUFFRSxxQkFBTyxFQUFDTSx3QkFBcUJKLFNBQVMsR0FBVCxHQUFlLENBQXBDLFVBQUQ7QUFGVDtBQUpGO0FBUEY7QUFKRixPQURGO0FBd0JEOzs7RUEvQ2tDSyxnQixVQUM1QkMsWSxHQUFlO0FBQ3BCeEIsU0FBTyxHQURhO0FBRXBCbUIsaUJBQWUsQ0FGSztBQUdwQkQsVUFBUSxJQUhZO0FBSXBCRCxpQkFBZSxTQUFTUSxJQUFULEdBQWdCLENBQUU7QUFKYixDLFNBT2ZDLFMsR0FBWTtBQUNqQjFCLFNBQU8yQixvQkFBVUMsTUFEQTtBQUVqQlYsVUFBUVMsb0JBQVVFLElBRkQ7QUFHakJWLGlCQUFlUSxvQkFBVUMsTUFIUjtBQUlqQlgsaUJBQWVVLG9CQUFVRztBQUpSLEM7a0JBUkFmLE87QUFnRHBCIiwiZmlsZSI6InNpZGUtYmFyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSAyMDE4IFViZXIgVGVjaG5vbG9naWVzLCBJbmMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuLy8gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuLy8gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuLy8gdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuLy8gY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4vLyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4vLyBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4vLyBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbi8vIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuLy8gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuLy8gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbi8vIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbi8vIFRIRSBTT0ZUV0FSRS5cblxuaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50fSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHN0eWxlZCBmcm9tICdzdHlsZWQtY29tcG9uZW50cyc7XG5pbXBvcnQge0Fycm93UmlnaHR9IGZyb20gJ2NvbXBvbmVudHMvY29tbW9uL2ljb25zJztcblxuY29uc3QgU3R5bGVkU2lkZVBhbmVsQ29udGFpbmVyID0gc3R5bGVkLmRpdmBcbiAgei1pbmRleDogOTk7XG4gIGhlaWdodDogMTAwJTtcbiAgd2lkdGg6ICR7cHJvcHMgPT4gcHJvcHMud2lkdGggKyAyICogcHJvcHMudGhlbWUuc2lkZVBhbmVsLm1hcmdpbi5sZWZ0fXB4O1xuICBkaXNwbGF5OiBmbGV4O1xuICB0cmFuc2l0aW9uOiB3aWR0aCAyNTBtcztcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICBwYWRkaW5nLXRvcDogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5zaWRlUGFuZWwubWFyZ2luLnRvcH1weDtcbiAgcGFkZGluZy1yaWdodDogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5zaWRlUGFuZWwubWFyZ2luLnJpZ2h0fXB4O1xuICBwYWRkaW5nLWJvdHRvbTogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5zaWRlUGFuZWwubWFyZ2luLmJvdHRvbX1weDtcbiAgcGFkZGluZy1sZWZ0OiAke3Byb3BzID0+IHByb3BzLnRoZW1lLnNpZGVQYW5lbC5tYXJnaW4ubGVmdH1weDtcbmA7XG5cbmNvbnN0IFNpZGVCYXJDb250YWluZXIgPSBzdHlsZWQuZGl2YFxuICBib3gtc2hhZG93OiAwIDFweCAzcHggcmdiYSgwLCAwLCAwLCAwLjIpO1xuICB0cmFuc2l0aW9uOiBsZWZ0IDI1MG1zLCByaWdodCAyNTBtcztcbiAgbGVmdDogJHtwcm9wcyA9PiBwcm9wcy5sZWZ0fXB4O1xuICBhbGlnbi1pdGVtczogc3RyZXRjaDtcbiAgZmxleC1ncm93OiAxO1xuYDtcblxuY29uc3QgU2lkZUJhcklubmVyID0gc3R5bGVkLmRpdmBcbiAgYmFja2dyb3VuZC1jb2xvcjogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5zaWRlUGFuZWxCZ307XG4gIGJvcmRlci1yYWRpdXM6IDFweDtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgaGVpZ2h0OiAxMDAlO1xuYDtcblxuY29uc3QgQ29sbGFwc2VCdXR0b24gPSBzdHlsZWQuZGl2YFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBib3gtc2hhZG93OiAwIDFweCAzcHggcmdiYSgwLCAwLCAwLCAwLjIpO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgYmFja2dyb3VuZC1jb2xvcjogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5zaWRlQmFyQ2xvc2VCdG5CZ2R9O1xuICBib3JkZXItcmFkaXVzOiAxcHg7XG4gIGNvbG9yOiAke3Byb3BzID0+IHByb3BzLnRoZW1lLnNpZGVCYXJDbG9zZUJ0bkNvbG9yfTtcbiAgZGlzcGxheTogZmxleDtcbiAgaGVpZ2h0OiAyMHB4O1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHJpZ2h0OiAtOHB4O1xuICB0b3A6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUuc2lkZVBhbmVsLm1hcmdpbi50b3B9cHg7XG4gIHdpZHRoOiAyMHB4O1xuXG4gIDpob3ZlciB7XG4gICAgY3Vyc29yOiBwb2ludGVyO1xuICAgIGJveC1zaGFkb3c6IG5vbmU7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5zaWRlQmFyQ2xvc2VCdG5CZ2RIb3Zlcn07XG4gIH1cbmA7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNpZGVCYXIgZXh0ZW5kcyBDb21wb25lbnQge1xuICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgIHdpZHRoOiAzMDAsXG4gICAgbWluaWZpZWRXaWR0aDogMCxcbiAgICBpc09wZW46IHRydWUsXG4gICAgb25PcGVuT3JDbG9zZTogZnVuY3Rpb24gbm9vcCgpIHt9XG4gIH07XG5cbiAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICB3aWR0aDogUHJvcFR5cGVzLm51bWJlcixcbiAgICBpc09wZW46IFByb3BUeXBlcy5ib29sLFxuICAgIG1pbmlmaWVkV2lkdGg6IFByb3BUeXBlcy5udW1iZXIsXG4gICAgb25PcGVuT3JDbG9zZTogUHJvcFR5cGVzLmZ1bmNcbiAgfTtcblxuICBfb25PcGVuT3JDbG9zZSA9ICgpID0+IHtcbiAgICB0aGlzLnByb3BzLm9uT3Blbk9yQ2xvc2Uoe2lzT3BlbjogIXRoaXMucHJvcHMuaXNPcGVufSk7XG4gIH07XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHtpc09wZW4sIG1pbmlmaWVkV2lkdGgsIHdpZHRofSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgaG9yaXpvbnRhbE9mZnNldCA9IGlzT3BlbiA/IDAgOiBtaW5pZmllZFdpZHRoIC0gd2lkdGg7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPFN0eWxlZFNpZGVQYW5lbENvbnRhaW5lclxuICAgICAgICB3aWR0aD17aXNPcGVuID8gd2lkdGggOiAwfVxuICAgICAgICBjbGFzc05hbWU9XCJzaWRlLXBhbmVsLS1jb250YWluZXJcIlxuICAgICAgPlxuICAgICAgICA8U2lkZUJhckNvbnRhaW5lciBjbGFzc05hbWU9XCJzaWRlLWJhclwiIHN0eWxlPXt7d2lkdGg6IGAke3dpZHRofXB4YH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGxlZnQ9e2hvcml6b250YWxPZmZzZXR9PlxuICAgICAgICAgIHtpc09wZW4gPyAoXG4gICAgICAgICAgICA8U2lkZUJhcklubmVyIGNsYXNzTmFtZT1cInNpZGUtYmFyX19pbm5lclwiPlxuICAgICAgICAgICAgICB7dGhpcy5wcm9wcy5jaGlsZHJlbn1cbiAgICAgICAgICAgIDwvU2lkZUJhcklubmVyPlxuICAgICAgICAgICkgOiBudWxsfVxuICAgICAgICAgIDxDb2xsYXBzZUJ1dHRvblxuICAgICAgICAgICAgY2xhc3NOYW1lPVwic2lkZS1iYXJfX2Nsb3NlXCJcbiAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuX29uT3Blbk9yQ2xvc2V9XG4gICAgICAgICAgPlxuICAgICAgICAgICAgPEFycm93UmlnaHRcbiAgICAgICAgICAgICAgaGVpZ2h0PVwiMTJweFwiXG4gICAgICAgICAgICAgIHN0eWxlPXt7dHJhbnNmb3JtOiBgcm90YXRlKCR7aXNPcGVuID8gMTgwIDogMH1kZWcpYH19XG4gICAgICAgICAgICAvPlxuICAgICAgICAgIDwvQ29sbGFwc2VCdXR0b24+XG4gICAgICAgIDwvU2lkZUJhckNvbnRhaW5lcj5cbiAgICAgIDwvU3R5bGVkU2lkZVBhbmVsQ29udGFpbmVyPlxuICAgICk7XG4gIH1cbn07XG4iXX0=