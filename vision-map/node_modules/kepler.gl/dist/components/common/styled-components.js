'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StyledMapContainer = exports.StyledModalContent = exports.Table = exports.DatasetSquare = exports.ButtonGroup = exports.StyledPanelDropdown = exports.StyledPanelHeader = exports.InlineInput = exports.InputLight = exports.Input = exports.Button = exports.Tooltip = exports.SidePanelDivider = exports.SidePanelSection = exports.PanelContent = exports.PanelHeaderContent = exports.PanelHeaderTitle = exports.PanelLabelBold = exports.PanelLabelWrapper = exports.PanelLabel = exports.CenterFlexbox = exports.IconRoundSmall = exports.SelectTextBold = exports.SelectText = undefined;

var _taggedTemplateLiteral2 = require('babel-runtime/helpers/taggedTemplateLiteral');

var _taggedTemplateLiteral3 = _interopRequireDefault(_taggedTemplateLiteral2);

var _templateObject = (0, _taggedTemplateLiteral3.default)(['\n  color: ', ';\n  font-size: ', ';\n  font-weight: 400;\n\n  i {\n    font-size: 13px;\n    margin-right: 6px;\n  }\n'], ['\n  color: ', ';\n  font-size: ', ';\n  font-weight: 400;\n\n  i {\n    font-size: 13px;\n    margin-right: 6px;\n  }\n']),
    _templateObject2 = (0, _taggedTemplateLiteral3.default)(['\n  color: ', ';\n  font-weight: 500;\n'], ['\n  color: ', ';\n  font-weight: 500;\n']),
    _templateObject3 = (0, _taggedTemplateLiteral3.default)(['\n  display: flex;\n  width: 18px;\n  height: 18px;\n  border-radius: 9px;\n  background-color: ', '; // updated after checking sketch file\n  color: ', ';\n  align-items: center;\n  justify-content: center;\n\n  :hover {\n    cursor: pointer;\n    background-color: ', ';\n  }\n'], ['\n  display: flex;\n  width: 18px;\n  height: 18px;\n  border-radius: 9px;\n  background-color: ', '; // updated after checking sketch file\n  color: ', ';\n  align-items: center;\n  justify-content: center;\n\n  :hover {\n    cursor: pointer;\n    background-color: ', ';\n  }\n']),
    _templateObject4 = (0, _taggedTemplateLiteral3.default)(['\n  display: flex;\n  align-items: center;\n'], ['\n  display: flex;\n  align-items: center;\n']),
    _templateObject5 = (0, _taggedTemplateLiteral3.default)(['\n  color: ', ';\n  display: inline-block;\n  font-size: 11px;\n  font-weight: 400;\n  margin-bottom: 4px;\n  text-transform: capitalize;\n'], ['\n  color: ', ';\n  display: inline-block;\n  font-size: 11px;\n  font-weight: 400;\n  margin-bottom: 4px;\n  text-transform: capitalize;\n']),
    _templateObject6 = (0, _taggedTemplateLiteral3.default)(['\n  display: flex;\n  align-items: self-start;\n'], ['\n  display: flex;\n  align-items: self-start;\n']),
    _templateObject7 = (0, _taggedTemplateLiteral3.default)(['\n  font-weight: 500;\n'], ['\n  font-weight: 500;\n']),
    _templateObject8 = (0, _taggedTemplateLiteral3.default)(['\n  color: ', ';\n  font-size: 13px;\n  letter-spacing: 0.43px;\n  text-transform: capitalize;\n'], ['\n  color: ', ';\n  font-size: 13px;\n  letter-spacing: 0.43px;\n  text-transform: capitalize;\n']),
    _templateObject9 = (0, _taggedTemplateLiteral3.default)(['\n  display: flex;\n  align-items: center;\n  color: ', ';\n  padding-left: 12px;\n\n  .icon {\n    color: ', ';\n    display: flex;\n    align-items: center;\n    margin-right: 12px;\n  }\n'], ['\n  display: flex;\n  align-items: center;\n  color: ', ';\n  padding-left: 12px;\n\n  .icon {\n    color: ', ';\n    display: flex;\n    align-items: center;\n    margin-right: 12px;\n  }\n']),
    _templateObject10 = (0, _taggedTemplateLiteral3.default)(['\n  background-color: ', ';\n  padding: 12px;\n'], ['\n  background-color: ', ';\n  padding: 12px;\n']),
    _templateObject11 = (0, _taggedTemplateLiteral3.default)(['\n  margin-bottom: 12px;\n  opacity: ', ';\n  pointer-events: ', ';\n'], ['\n  margin-bottom: 12px;\n  opacity: ', ';\n  pointer-events: ', ';\n']),
    _templateObject12 = (0, _taggedTemplateLiteral3.default)(['\n  border-bottom: 1px solid ', ';\n  height: 12px;\n  margin-bottom: 12px;\n'], ['\n  border-bottom: 1px solid ', ';\n  height: 12px;\n  margin-bottom: 12px;\n']),
    _templateObject13 = (0, _taggedTemplateLiteral3.default)(['\n  &.__react_component_tooltip {\n    font-size: 9.5px;\n    font-weight: 500;\n    padding: 7px 18px;\n\n    &.type-dark {\n      background-color: ', ';\n      color: ', ';\n      &.place-bottom {\n        :after {\n          border-bottom-color: ', ';\n        }\n      }\n\n      &.place-top {\n        :after {\n          border-top-color: ', ';\n        }\n      }\n\n      &.place-right {\n        :after {\n          border-right-color: ', ';\n        }\n      }\n\n      &.place-left {\n        :after {\n          border-left-color: ', ';\n        }\n      }\n    }\n  }\n'], ['\n  &.__react_component_tooltip {\n    font-size: 9.5px;\n    font-weight: 500;\n    padding: 7px 18px;\n\n    &.type-dark {\n      background-color: ', ';\n      color: ', ';\n      &.place-bottom {\n        :after {\n          border-bottom-color: ', ';\n        }\n      }\n\n      &.place-top {\n        :after {\n          border-top-color: ', ';\n        }\n      }\n\n      &.place-right {\n        :after {\n          border-right-color: ', ';\n        }\n      }\n\n      &.place-left {\n        :after {\n          border-left-color: ', ';\n        }\n      }\n    }\n  }\n']),
    _templateObject14 = (0, _taggedTemplateLiteral3.default)(['\n  align-items: center;\n  background-color: ', ';\n  border-radius: ', ';\n  color: ', ';\n  cursor: pointer;\n  display: inline-flex;\n  font-size: ', ';\n  font-weight: 500;\n  justify-content: center;\n  letter-spacing: 0.3px;\n  line-height: 14px;\n  outline: 0;\n  padding: ', ';\n  text-align: center;\n  transition: ', ';\n  vertical-align: middle;\n  width: ', ';\n  opacity: ', ';\n  pointer-events: ', ';\n\n  :hover,\n  :focus,\n  :active,\n  &.active {\n    background-color: ', ';\n    color: ', ';\n  }\n\n  svg {\n    margin-right: 8px;\n  }\n'], ['\n  align-items: center;\n  background-color: ', ';\n  border-radius: ', ';\n  color: ', ';\n  cursor: pointer;\n  display: inline-flex;\n  font-size: ', ';\n  font-weight: 500;\n  justify-content: center;\n  letter-spacing: 0.3px;\n  line-height: 14px;\n  outline: 0;\n  padding: ', ';\n  text-align: center;\n  transition: ', ';\n  vertical-align: middle;\n  width: ', ';\n  opacity: ', ';\n  pointer-events: ', ';\n\n  :hover,\n  :focus,\n  :active,\n  &.active {\n    background-color: ', ';\n    color: ', ';\n  }\n\n  svg {\n    margin-right: 8px;\n  }\n']),
    _templateObject15 = (0, _taggedTemplateLiteral3.default)(['\n  ', ';\n'], ['\n  ', ';\n']),
    _templateObject16 = (0, _taggedTemplateLiteral3.default)(['\n  ', '\n'], ['\n  ', '\n']),
    _templateObject17 = (0, _taggedTemplateLiteral3.default)(['\n  background-color: ', ';\n  border-left: 3px solid\n    rgb(\n      ', '\n    );\n  padding: 0 10px 0 0;\n  height: ', 'px;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  transition: ', ';\n'], ['\n  background-color: ', ';\n  border-left: 3px solid\n    rgb(\n      ', '\n    );\n  padding: 0 10px 0 0;\n  height: ', 'px;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  transition: ', ';\n']),
    _templateObject18 = (0, _taggedTemplateLiteral3.default)(['\n  ', '\n  background-color: ', ';\n  overflow-y: auto;\n  box-shadow: ', ';\n  border-radius: ', ';\n  margin-top: 2px;\n  max-height: 500px;\n'], ['\n  ', '\n  background-color: ', ';\n  overflow-y: auto;\n  box-shadow: ', ';\n  border-radius: ', ';\n  margin-top: 2px;\n  max-height: 500px;\n']),
    _templateObject19 = (0, _taggedTemplateLiteral3.default)(['\n  display: flex;\n  .button {\n    border-radius: 0;\n    margin-left: 2px;\n  }\n  .button:first-child {\n    border-bottom-left-radius: ', ';\n    border-top-left-radius: ', ';\n    margin-left: 0;\n  }\n  .button:last-child {\n    border-bottom-right-radius: ', ';\n    border-top-right-radius: ', ';\n  }\n'], ['\n  display: flex;\n  .button {\n    border-radius: 0;\n    margin-left: 2px;\n  }\n  .button:first-child {\n    border-bottom-left-radius: ', ';\n    border-top-left-radius: ', ';\n    margin-left: 0;\n  }\n  .button:last-child {\n    border-bottom-right-radius: ', ';\n    border-top-right-radius: ', ';\n  }\n']),
    _templateObject20 = (0, _taggedTemplateLiteral3.default)(['\n  display: inline-block;\n  width: 8px;\n  height: 8px;\n  background-color: rgb(', ');\n  margin-right: 12px\n'], ['\n  display: inline-block;\n  width: 8px;\n  height: 8px;\n  background-color: rgb(', ');\n  margin-right: 12px\n']),
    _templateObject21 = (0, _taggedTemplateLiteral3.default)(['\n  width: 100%;\n  border-spacing: 0;\n\n  thead {\n    tr th {\n      background: ', ';\n      color: ', ';\n      padding: 18px 12px;\n      text-align: start;\n    }\n  }\n\n  tbody {\n   tr td {\n     border-bottom: ', ';\n     padding: 12px;\n   }\n  }\n'], ['\n  width: 100%;\n  border-spacing: 0;\n\n  thead {\n    tr th {\n      background: ', ';\n      color: ', ';\n      padding: 18px 12px;\n      text-align: start;\n    }\n  }\n\n  tbody {\n   tr td {\n     border-bottom: ', ';\n     padding: 12px;\n   }\n  }\n']),
    _templateObject22 = (0, _taggedTemplateLiteral3.default)(['\n  background: ', ';\n  color: ', ';\n  display: flex;\n  flex-direction: row;\n  font-size: 10px;\n  margin: 0 -96px;\n  padding: 30px 96px;\n  justify-content: space-between;\n'], ['\n  background: ', ';\n  color: ', ';\n  display: flex;\n  flex-direction: row;\n  font-size: 10px;\n  margin: 0 -96px;\n  padding: 30px 96px;\n  justify-content: space-between;\n']),
    _templateObject23 = (0, _taggedTemplateLiteral3.default)(['\n  .mapboxgl-map .mapboxgl-missing-css {\n    display: none;\n  }\n'], ['\n  .mapboxgl-map .mapboxgl-missing-css {\n    display: none;\n  }\n']); // Copyright (c) 2018 Uber Technologies, Inc.
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

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _reactTooltip = require('react-tooltip');

var _reactTooltip2 = _interopRequireDefault(_reactTooltip);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SelectText = exports.SelectText = _styledComponents2.default.span(_templateObject, function (props) {
  return props.theme.labelColor;
}, function (props) {
  return props.theme.selectFontSize;
});

var SelectTextBold = exports.SelectTextBold = SelectText.extend(_templateObject2, function (props) {
  return props.theme.textColor;
});

var IconRoundSmall = exports.IconRoundSmall = _styledComponents2.default.div(_templateObject3, function (props) {
  return props.theme.secondaryBtnBgdHover;
}, function (props) {
  return props.theme.secondaryBtnColor;
}, function (props) {
  return props.theme.secondaryBtnBgdHover;
});

var CenterFlexbox = exports.CenterFlexbox = _styledComponents2.default.div(_templateObject4);

var PanelLabel = exports.PanelLabel = _styledComponents2.default.label.attrs({
  className: 'side-panel-panel__label'
})(_templateObject5, function (props) {
  return props.theme.labelColor;
});

var PanelLabelWrapper = exports.PanelLabelWrapper = _styledComponents2.default.div.attrs({
  className: 'side-panel-panel__label-wrapper'
})(_templateObject6);

var PanelLabelBold = exports.PanelLabelBold = PanelLabel.extend(_templateObject7);

var PanelHeaderTitle = exports.PanelHeaderTitle = _styledComponents2.default.span.attrs({
  className: 'side-panel-panel__header__title'
})(_templateObject8, function (props) {
  return props.theme.textColor;
});

var PanelHeaderContent = exports.PanelHeaderContent = _styledComponents2.default.div(_templateObject9, function (props) {
  return props.theme.textColor;
}, function (props) {
  return props.theme.labelColor;
});

var PanelContent = exports.PanelContent = _styledComponents2.default.div.attrs({
  className: 'side-panel-panel__content'
})(_templateObject10, function (props) {
  return props.theme.panelBackground;
});

var SidePanelSection = exports.SidePanelSection = _styledComponents2.default.div.attrs({
  className: 'side-panel-section'
})(_templateObject11, function (props) {
  return props.disabled ? 0.4 : 1;
}, function (props) {
  return props.disabled ? 'none' : 'all';
});

var SidePanelDivider = exports.SidePanelDivider = _styledComponents2.default.div.attrs({
  className: 'side-panel-divider'
})(_templateObject12, function (props) {
  return props.theme.panelBorderColor;
});

var Tooltip = exports.Tooltip = (0, _styledComponents2.default)(_reactTooltip2.default)(_templateObject13, function (props) {
  return props.theme.tooltipBg;
}, function (props) {
  return props.theme.tooltipColor;
}, function (props) {
  return props.theme.tooltipBg;
}, function (props) {
  return props.theme.tooltipBg;
}, function (props) {
  return props.theme.tooltipBg;
}, function (props) {
  return props.theme.tooltipBg;
});

var Button = exports.Button = _styledComponents2.default.div.attrs({
  className: 'button'
})(_templateObject14, function (props) {
  return props.negative ? props.theme.negativeBtnBgd : props.secondary ? props.theme.secondaryBtnBgd : props.link ? props.theme.linkBtnBgd : props.theme.primaryBtnBgd;
}, function (props) {
  return props.theme.primaryBtnRadius;
}, function (props) {
  return props.negative ? props.theme.negativeBtnColor : props.secondary ? props.theme.secondaryBtnColor : props.link ? props.theme.linkBtnColor : props.theme.primaryBtnColor;
}, function (props) {
  return props.large ? '14px' : props.small ? '10px' : '11px';
}, function (props) {
  return props.large ? '14px 32px' : props.small ? '6px 9px' : '9px 12px';
}, function (props) {
  return props.theme.transition;
}, function (props) {
  return props.width || 'auto';
}, function (props) {
  return props.disabled ? 0.4 : 1;
}, function (props) {
  return props.disabled ? 'none' : 'all';
}, function (props) {
  return props.negative ? props.theme.negativeBtnBgdHover : props.secondary ? props.theme.secondaryBtnBgdHover : props.link ? props.theme.linkBtnActBgdHover : props.theme.primaryBtnBgdHover;
}, function (props) {
  return props.negative ? props.theme.negativeBtnActColor : props.secondary ? props.theme.secondaryBtnActColor : props.link ? props.theme.linkBtnActColor : props.theme.primaryBtnActColor;
});

var Input = exports.Input = _styledComponents2.default.input(_templateObject15, function (props) {
  return props.secondary ? props.theme.secondaryInput : props.theme.input;
});

var InputLight = exports.InputLight = _styledComponents2.default.input(_templateObject16, function (props) {
  return props.theme.inputLT;
});

var InlineInput = exports.InlineInput = Input.extend(_templateObject15, function (props) {
  return props.theme.inlineInput;
});

var StyledPanelHeader = exports.StyledPanelHeader = _styledComponents2.default.div(_templateObject17, function (props) {
  return props.active ? props.theme.panelBackgroundHover : props.theme.panelBackground;
}, function (props) {
  return props.labelRCGColorValues ? props.labelRCGColorValues.join(',') : 'transparent';
}, function (props) {
  return props.theme.panelHeaderHeight;
}, function (props) {
  return props.theme.transition;
});

var StyledPanelDropdown = exports.StyledPanelDropdown = _styledComponents2.default.div(_templateObject18, function (props) {
  return props.theme.panelDropdownScrollBar;
}, function (props) {
  return props.theme.panelBackground;
}, function (props) {
  return props.theme.panelBoxShadow;
}, function (props) {
  return props.theme.panelBorderRadius;
});

var ButtonGroup = exports.ButtonGroup = _styledComponents2.default.div(_templateObject19, function (props) {
  return props.theme.primaryBtnRadius;
}, function (props) {
  return props.theme.primaryBtnRadius;
}, function (props) {
  return props.theme.primaryBtnRadius;
}, function (props) {
  return props.theme.primaryBtnRadius;
});

var DatasetSquare = exports.DatasetSquare = _styledComponents2.default.div(_templateObject20, function (props) {
  return props.color.join(',');
});

var Table = exports.Table = _styledComponents2.default.table(_templateObject21, function (props) {
  return props.theme.panelBackgroundLT;
}, function (props) {
  return props.theme.titleColorLT;
}, function (props) {
  return props.theme.panelBorderLT;
});

var StyledModalContent = exports.StyledModalContent = _styledComponents2.default.div(_templateObject22, function (props) {
  return props.theme.panelBackgroundLT;
}, function (props) {
  return props.theme.textColorLT;
});

/**
 * Newer versions of mapbox.gl display an error message banner on top of the map by default
 * which will cause the map to display points in the wrong locations
 * This workaround will hide the error banner.
 */
var StyledMapContainer = exports.StyledMapContainer = _styledComponents2.default.div(_templateObject23);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2NvbW1vbi9zdHlsZWQtY29tcG9uZW50cy5qcyJdLCJuYW1lcyI6WyJTZWxlY3RUZXh0Iiwic3R5bGVkIiwic3BhbiIsInByb3BzIiwidGhlbWUiLCJsYWJlbENvbG9yIiwic2VsZWN0Rm9udFNpemUiLCJTZWxlY3RUZXh0Qm9sZCIsImV4dGVuZCIsInRleHRDb2xvciIsIkljb25Sb3VuZFNtYWxsIiwiZGl2Iiwic2Vjb25kYXJ5QnRuQmdkSG92ZXIiLCJzZWNvbmRhcnlCdG5Db2xvciIsIkNlbnRlckZsZXhib3giLCJQYW5lbExhYmVsIiwibGFiZWwiLCJhdHRycyIsImNsYXNzTmFtZSIsIlBhbmVsTGFiZWxXcmFwcGVyIiwiUGFuZWxMYWJlbEJvbGQiLCJQYW5lbEhlYWRlclRpdGxlIiwiUGFuZWxIZWFkZXJDb250ZW50IiwiUGFuZWxDb250ZW50IiwicGFuZWxCYWNrZ3JvdW5kIiwiU2lkZVBhbmVsU2VjdGlvbiIsImRpc2FibGVkIiwiU2lkZVBhbmVsRGl2aWRlciIsInBhbmVsQm9yZGVyQ29sb3IiLCJUb29sdGlwIiwiUmVhY3RUb29sdGlwIiwidG9vbHRpcEJnIiwidG9vbHRpcENvbG9yIiwiQnV0dG9uIiwibmVnYXRpdmUiLCJuZWdhdGl2ZUJ0bkJnZCIsInNlY29uZGFyeSIsInNlY29uZGFyeUJ0bkJnZCIsImxpbmsiLCJsaW5rQnRuQmdkIiwicHJpbWFyeUJ0bkJnZCIsInByaW1hcnlCdG5SYWRpdXMiLCJuZWdhdGl2ZUJ0bkNvbG9yIiwibGlua0J0bkNvbG9yIiwicHJpbWFyeUJ0bkNvbG9yIiwibGFyZ2UiLCJzbWFsbCIsInRyYW5zaXRpb24iLCJ3aWR0aCIsIm5lZ2F0aXZlQnRuQmdkSG92ZXIiLCJsaW5rQnRuQWN0QmdkSG92ZXIiLCJwcmltYXJ5QnRuQmdkSG92ZXIiLCJuZWdhdGl2ZUJ0bkFjdENvbG9yIiwic2Vjb25kYXJ5QnRuQWN0Q29sb3IiLCJsaW5rQnRuQWN0Q29sb3IiLCJwcmltYXJ5QnRuQWN0Q29sb3IiLCJJbnB1dCIsImlucHV0Iiwic2Vjb25kYXJ5SW5wdXQiLCJJbnB1dExpZ2h0IiwiaW5wdXRMVCIsIklubGluZUlucHV0IiwiaW5saW5lSW5wdXQiLCJTdHlsZWRQYW5lbEhlYWRlciIsImFjdGl2ZSIsInBhbmVsQmFja2dyb3VuZEhvdmVyIiwibGFiZWxSQ0dDb2xvclZhbHVlcyIsImpvaW4iLCJwYW5lbEhlYWRlckhlaWdodCIsIlN0eWxlZFBhbmVsRHJvcGRvd24iLCJwYW5lbERyb3Bkb3duU2Nyb2xsQmFyIiwicGFuZWxCb3hTaGFkb3ciLCJwYW5lbEJvcmRlclJhZGl1cyIsIkJ1dHRvbkdyb3VwIiwiRGF0YXNldFNxdWFyZSIsImNvbG9yIiwiVGFibGUiLCJ0YWJsZSIsInBhbmVsQmFja2dyb3VuZExUIiwidGl0bGVDb2xvckxUIiwicGFuZWxCb3JkZXJMVCIsIlN0eWxlZE1vZGFsQ29udGVudCIsInRleHRDb2xvckxUIiwiU3R5bGVkTWFwQ29udGFpbmVyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7a05BQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7QUFDQTs7Ozs7O0FBRU8sSUFBTUEsa0NBQWFDLDJCQUFPQyxJQUFwQixrQkFDRjtBQUFBLFNBQVNDLE1BQU1DLEtBQU4sQ0FBWUMsVUFBckI7QUFBQSxDQURFLEVBRUU7QUFBQSxTQUFTRixNQUFNQyxLQUFOLENBQVlFLGNBQXJCO0FBQUEsQ0FGRixDQUFOOztBQVdBLElBQU1DLDBDQUFpQlAsV0FBV1EsTUFBNUIsbUJBQ0Y7QUFBQSxTQUFTTCxNQUFNQyxLQUFOLENBQVlLLFNBQXJCO0FBQUEsQ0FERSxDQUFOOztBQUtBLElBQU1DLDBDQUFpQlQsMkJBQU9VLEdBQXhCLG1CQUtTO0FBQUEsU0FDbEJSLE1BQU1DLEtBQU4sQ0FBWVEsb0JBRE07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QUFOOztBQVdQOzs7OztBQUtPLElBQU1DLGtEQUFxQmxGLDJCQUFPVSxHQUE1QixtQkFBTiIsImZpbGUiOiJzdHlsZWQtY29tcG9uZW50cy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgMjAxOCBVYmVyIFRlY2hub2xvZ2llcywgSW5jLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbi8vIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbi8vIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbi8vIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbi8vIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuLy8gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuLy8gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4vLyBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbi8vIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbi8vIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4vLyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4vLyBUSEUgU09GVFdBUkUuXG5cbmltcG9ydCBzdHlsZWQgZnJvbSAnc3R5bGVkLWNvbXBvbmVudHMnO1xuaW1wb3J0IFJlYWN0VG9vbHRpcCBmcm9tICdyZWFjdC10b29sdGlwJztcblxuZXhwb3J0IGNvbnN0IFNlbGVjdFRleHQgPSBzdHlsZWQuc3BhbmBcbiAgY29sb3I6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUubGFiZWxDb2xvcn07XG4gIGZvbnQtc2l6ZTogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5zZWxlY3RGb250U2l6ZX07XG4gIGZvbnQtd2VpZ2h0OiA0MDA7XG5cbiAgaSB7XG4gICAgZm9udC1zaXplOiAxM3B4O1xuICAgIG1hcmdpbi1yaWdodDogNnB4O1xuICB9XG5gO1xuXG5leHBvcnQgY29uc3QgU2VsZWN0VGV4dEJvbGQgPSBTZWxlY3RUZXh0LmV4dGVuZGBcbiAgY29sb3I6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUudGV4dENvbG9yfTtcbiAgZm9udC13ZWlnaHQ6IDUwMDtcbmA7XG5cbmV4cG9ydCBjb25zdCBJY29uUm91bmRTbWFsbCA9IHN0eWxlZC5kaXZgXG4gIGRpc3BsYXk6IGZsZXg7XG4gIHdpZHRoOiAxOHB4O1xuICBoZWlnaHQ6IDE4cHg7XG4gIGJvcmRlci1yYWRpdXM6IDlweDtcbiAgYmFja2dyb3VuZC1jb2xvcjogJHtwcm9wcyA9PlxuICAgIHByb3BzLnRoZW1lLnNlY29uZGFyeUJ0bkJnZEhvdmVyfTsgLy8gdXBkYXRlZCBhZnRlciBjaGVja2luZyBza2V0Y2ggZmlsZVxuICBjb2xvcjogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5zZWNvbmRhcnlCdG5Db2xvcn07XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuXG4gIDpob3ZlciB7XG4gICAgY3Vyc29yOiBwb2ludGVyO1xuICAgIGJhY2tncm91bmQtY29sb3I6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUuc2Vjb25kYXJ5QnRuQmdkSG92ZXJ9O1xuICB9XG5gO1xuXG5leHBvcnQgY29uc3QgQ2VudGVyRmxleGJveCA9IHN0eWxlZC5kaXZgXG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG5gO1xuXG5leHBvcnQgY29uc3QgUGFuZWxMYWJlbCA9IHN0eWxlZC5sYWJlbC5hdHRycyh7XG4gIGNsYXNzTmFtZTogJ3NpZGUtcGFuZWwtcGFuZWxfX2xhYmVsJ1xufSlgXG4gIGNvbG9yOiAke3Byb3BzID0+IHByb3BzLnRoZW1lLmxhYmVsQ29sb3J9O1xuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gIGZvbnQtc2l6ZTogMTFweDtcbiAgZm9udC13ZWlnaHQ6IDQwMDtcbiAgbWFyZ2luLWJvdHRvbTogNHB4O1xuICB0ZXh0LXRyYW5zZm9ybTogY2FwaXRhbGl6ZTtcbmA7XG5cbmV4cG9ydCBjb25zdCBQYW5lbExhYmVsV3JhcHBlciA9IHN0eWxlZC5kaXYuYXR0cnMoe1xuICBjbGFzc05hbWU6ICdzaWRlLXBhbmVsLXBhbmVsX19sYWJlbC13cmFwcGVyJ1xufSlgXG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBzZWxmLXN0YXJ0O1xuYDtcblxuZXhwb3J0IGNvbnN0IFBhbmVsTGFiZWxCb2xkID0gUGFuZWxMYWJlbC5leHRlbmRgXG4gIGZvbnQtd2VpZ2h0OiA1MDA7XG5gO1xuXG5leHBvcnQgY29uc3QgUGFuZWxIZWFkZXJUaXRsZSA9IHN0eWxlZC5zcGFuLmF0dHJzKHtcbiAgY2xhc3NOYW1lOiAnc2lkZS1wYW5lbC1wYW5lbF9faGVhZGVyX190aXRsZSdcbn0pYFxuICBjb2xvcjogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS50ZXh0Q29sb3J9O1xuICBmb250LXNpemU6IDEzcHg7XG4gIGxldHRlci1zcGFjaW5nOiAwLjQzcHg7XG4gIHRleHQtdHJhbnNmb3JtOiBjYXBpdGFsaXplO1xuYDtcblxuZXhwb3J0IGNvbnN0IFBhbmVsSGVhZGVyQ29udGVudCA9IHN0eWxlZC5kaXZgXG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGNvbG9yOiAke3Byb3BzID0+IHByb3BzLnRoZW1lLnRleHRDb2xvcn07XG4gIHBhZGRpbmctbGVmdDogMTJweDtcblxuICAuaWNvbiB7XG4gICAgY29sb3I6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUubGFiZWxDb2xvcn07XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgIG1hcmdpbi1yaWdodDogMTJweDtcbiAgfVxuYDtcblxuZXhwb3J0IGNvbnN0IFBhbmVsQ29udGVudCA9IHN0eWxlZC5kaXYuYXR0cnMoe1xuICBjbGFzc05hbWU6ICdzaWRlLXBhbmVsLXBhbmVsX19jb250ZW50J1xufSlgXG4gIGJhY2tncm91bmQtY29sb3I6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUucGFuZWxCYWNrZ3JvdW5kfTtcbiAgcGFkZGluZzogMTJweDtcbmA7XG5cbmV4cG9ydCBjb25zdCBTaWRlUGFuZWxTZWN0aW9uID0gc3R5bGVkLmRpdi5hdHRycyh7XG4gIGNsYXNzTmFtZTogJ3NpZGUtcGFuZWwtc2VjdGlvbidcbn0pYFxuICBtYXJnaW4tYm90dG9tOiAxMnB4O1xuICBvcGFjaXR5OiAke3Byb3BzID0+IChwcm9wcy5kaXNhYmxlZCA/IDAuNCA6IDEpfTtcbiAgcG9pbnRlci1ldmVudHM6ICR7cHJvcHMgPT4gKHByb3BzLmRpc2FibGVkID8gJ25vbmUnIDogJ2FsbCcpfTtcbmA7XG5cbmV4cG9ydCBjb25zdCBTaWRlUGFuZWxEaXZpZGVyID0gc3R5bGVkLmRpdi5hdHRycyh7XG4gIGNsYXNzTmFtZTogJ3NpZGUtcGFuZWwtZGl2aWRlcidcbn0pYFxuICBib3JkZXItYm90dG9tOiAxcHggc29saWQgJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5wYW5lbEJvcmRlckNvbG9yfTtcbiAgaGVpZ2h0OiAxMnB4O1xuICBtYXJnaW4tYm90dG9tOiAxMnB4O1xuYDtcblxuZXhwb3J0IGNvbnN0IFRvb2x0aXAgPSBzdHlsZWQoUmVhY3RUb29sdGlwKWBcbiAgJi5fX3JlYWN0X2NvbXBvbmVudF90b29sdGlwIHtcbiAgICBmb250LXNpemU6IDkuNXB4O1xuICAgIGZvbnQtd2VpZ2h0OiA1MDA7XG4gICAgcGFkZGluZzogN3B4IDE4cHg7XG5cbiAgICAmLnR5cGUtZGFyayB7XG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAke3Byb3BzID0+IHByb3BzLnRoZW1lLnRvb2x0aXBCZ307XG4gICAgICBjb2xvcjogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS50b29sdGlwQ29sb3J9O1xuICAgICAgJi5wbGFjZS1ib3R0b20ge1xuICAgICAgICA6YWZ0ZXIge1xuICAgICAgICAgIGJvcmRlci1ib3R0b20tY29sb3I6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUudG9vbHRpcEJnfTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAmLnBsYWNlLXRvcCB7XG4gICAgICAgIDphZnRlciB7XG4gICAgICAgICAgYm9yZGVyLXRvcC1jb2xvcjogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS50b29sdGlwQmd9O1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgICYucGxhY2UtcmlnaHQge1xuICAgICAgICA6YWZ0ZXIge1xuICAgICAgICAgIGJvcmRlci1yaWdodC1jb2xvcjogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS50b29sdGlwQmd9O1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgICYucGxhY2UtbGVmdCB7XG4gICAgICAgIDphZnRlciB7XG4gICAgICAgICAgYm9yZGVyLWxlZnQtY29sb3I6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUudG9vbHRpcEJnfTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuYDtcblxuZXhwb3J0IGNvbnN0IEJ1dHRvbiA9IHN0eWxlZC5kaXYuYXR0cnMoe1xuICBjbGFzc05hbWU6ICdidXR0b24nXG59KWBcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgYmFja2dyb3VuZC1jb2xvcjogJHtwcm9wcyA9PlxuICAgIHByb3BzLm5lZ2F0aXZlXG4gICAgICA/IHByb3BzLnRoZW1lLm5lZ2F0aXZlQnRuQmdkXG4gICAgICA6IHByb3BzLnNlY29uZGFyeVxuICAgICAgICA/IHByb3BzLnRoZW1lLnNlY29uZGFyeUJ0bkJnZFxuICAgICAgICA6IHByb3BzLmxpbmsgPyBwcm9wcy50aGVtZS5saW5rQnRuQmdkIDogcHJvcHMudGhlbWUucHJpbWFyeUJ0bkJnZH07XG4gIGJvcmRlci1yYWRpdXM6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUucHJpbWFyeUJ0blJhZGl1c307XG4gIGNvbG9yOiAke3Byb3BzID0+XG4gICAgcHJvcHMubmVnYXRpdmVcbiAgICAgID8gcHJvcHMudGhlbWUubmVnYXRpdmVCdG5Db2xvclxuICAgICAgOiBwcm9wcy5zZWNvbmRhcnlcbiAgICAgICAgPyBwcm9wcy50aGVtZS5zZWNvbmRhcnlCdG5Db2xvclxuICAgICAgICA6IHByb3BzLmxpbmsgPyBwcm9wcy50aGVtZS5saW5rQnRuQ29sb3IgOiBwcm9wcy50aGVtZS5wcmltYXJ5QnRuQ29sb3J9O1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIGRpc3BsYXk6IGlubGluZS1mbGV4O1xuICBmb250LXNpemU6ICR7cHJvcHMgPT5cbiAgICBwcm9wcy5sYXJnZSA/XG4gICAgICAnMTRweCdcbiAgICAgIDogcHJvcHMuc21hbGxcbiAgICAgICAgPyAnMTBweCdcbiAgICAgICAgOiAnMTFweCd9O1xuICBmb250LXdlaWdodDogNTAwO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgbGV0dGVyLXNwYWNpbmc6IDAuM3B4O1xuICBsaW5lLWhlaWdodDogMTRweDtcbiAgb3V0bGluZTogMDtcbiAgcGFkZGluZzogJHtwcm9wcyA9PlxuICAgIHByb3BzLmxhcmdlID9cbiAgICAgICcxNHB4IDMycHgnXG4gICAgICA6IHByb3BzLnNtYWxsXG4gICAgICAgID8gJzZweCA5cHgnXG4gICAgICAgIDogJzlweCAxMnB4J307XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgdHJhbnNpdGlvbjogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS50cmFuc2l0aW9ufTtcbiAgdmVydGljYWwtYWxpZ246IG1pZGRsZTtcbiAgd2lkdGg6ICR7cHJvcHMgPT4gcHJvcHMud2lkdGggfHwgJ2F1dG8nfTtcbiAgb3BhY2l0eTogJHtwcm9wcyA9PiAocHJvcHMuZGlzYWJsZWQgPyAwLjQgOiAxKX07XG4gIHBvaW50ZXItZXZlbnRzOiAke3Byb3BzID0+IChwcm9wcy5kaXNhYmxlZCA/ICdub25lJyA6ICdhbGwnKX07XG5cbiAgOmhvdmVyLFxuICA6Zm9jdXMsXG4gIDphY3RpdmUsXG4gICYuYWN0aXZlIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAke3Byb3BzID0+XG4gICAgICBwcm9wcy5uZWdhdGl2ZVxuICAgICAgICA/IHByb3BzLnRoZW1lLm5lZ2F0aXZlQnRuQmdkSG92ZXJcbiAgICAgICAgOiBwcm9wcy5zZWNvbmRhcnlcbiAgICAgICAgICA/IHByb3BzLnRoZW1lLnNlY29uZGFyeUJ0bkJnZEhvdmVyXG4gICAgICAgICAgOiBwcm9wcy5saW5rXG4gICAgICAgICAgICA/IHByb3BzLnRoZW1lLmxpbmtCdG5BY3RCZ2RIb3ZlclxuICAgICAgICAgICAgOiBwcm9wcy50aGVtZS5wcmltYXJ5QnRuQmdkSG92ZXJ9O1xuICAgIGNvbG9yOiAke3Byb3BzID0+XG4gICAgICBwcm9wcy5uZWdhdGl2ZVxuICAgICAgICA/IHByb3BzLnRoZW1lLm5lZ2F0aXZlQnRuQWN0Q29sb3JcbiAgICAgICAgOiBwcm9wcy5zZWNvbmRhcnlcbiAgICAgICAgICA/IHByb3BzLnRoZW1lLnNlY29uZGFyeUJ0bkFjdENvbG9yXG4gICAgICAgICAgOiBwcm9wcy5saW5rXG4gICAgICAgICAgICA/IHByb3BzLnRoZW1lLmxpbmtCdG5BY3RDb2xvclxuICAgICAgICAgICAgOiBwcm9wcy50aGVtZS5wcmltYXJ5QnRuQWN0Q29sb3J9O1xuICB9XG5cbiAgc3ZnIHtcbiAgICBtYXJnaW4tcmlnaHQ6IDhweDtcbiAgfVxuYDtcblxuZXhwb3J0IGNvbnN0IElucHV0ID0gc3R5bGVkLmlucHV0YFxuICAke3Byb3BzID0+XG4gICAgcHJvcHMuc2Vjb25kYXJ5ID8gcHJvcHMudGhlbWUuc2Vjb25kYXJ5SW5wdXQgOiBwcm9wcy50aGVtZS5pbnB1dH07XG5gO1xuXG5leHBvcnQgY29uc3QgSW5wdXRMaWdodCA9IHN0eWxlZC5pbnB1dGBcbiAgJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5pbnB1dExUfVxuYDtcblxuZXhwb3J0IGNvbnN0IElubGluZUlucHV0ID0gSW5wdXQuZXh0ZW5kYFxuICAke3Byb3BzID0+IHByb3BzLnRoZW1lLmlubGluZUlucHV0fTtcbmA7XG5cbmV4cG9ydCBjb25zdCBTdHlsZWRQYW5lbEhlYWRlciA9IHN0eWxlZC5kaXZgXG4gIGJhY2tncm91bmQtY29sb3I6ICR7cHJvcHMgPT5cbiAgICBwcm9wcy5hY3RpdmVcbiAgICAgID8gcHJvcHMudGhlbWUucGFuZWxCYWNrZ3JvdW5kSG92ZXJcbiAgICAgIDogcHJvcHMudGhlbWUucGFuZWxCYWNrZ3JvdW5kfTtcbiAgYm9yZGVyLWxlZnQ6IDNweCBzb2xpZFxuICAgIHJnYihcbiAgICAgICR7cHJvcHMgPT5cbiAgICAgICAgcHJvcHMubGFiZWxSQ0dDb2xvclZhbHVlc1xuICAgICAgICAgID8gcHJvcHMubGFiZWxSQ0dDb2xvclZhbHVlcy5qb2luKCcsJylcbiAgICAgICAgICA6ICd0cmFuc3BhcmVudCd9XG4gICAgKTtcbiAgcGFkZGluZzogMCAxMHB4IDAgMDtcbiAgaGVpZ2h0OiAke3Byb3BzID0+IHByb3BzLnRoZW1lLnBhbmVsSGVhZGVySGVpZ2h0fXB4O1xuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIHRyYW5zaXRpb246ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUudHJhbnNpdGlvbn07XG5gO1xuXG5leHBvcnQgY29uc3QgU3R5bGVkUGFuZWxEcm9wZG93biA9IHN0eWxlZC5kaXZgXG4gICR7cHJvcHMgPT4gcHJvcHMudGhlbWUucGFuZWxEcm9wZG93blNjcm9sbEJhcn1cbiAgYmFja2dyb3VuZC1jb2xvcjogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5wYW5lbEJhY2tncm91bmR9O1xuICBvdmVyZmxvdy15OiBhdXRvO1xuICBib3gtc2hhZG93OiAke3Byb3BzID0+IHByb3BzLnRoZW1lLnBhbmVsQm94U2hhZG93fTtcbiAgYm9yZGVyLXJhZGl1czogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5wYW5lbEJvcmRlclJhZGl1c307XG4gIG1hcmdpbi10b3A6IDJweDtcbiAgbWF4LWhlaWdodDogNTAwcHg7XG5gO1xuXG5leHBvcnQgY29uc3QgQnV0dG9uR3JvdXAgPSBzdHlsZWQuZGl2YFxuICBkaXNwbGF5OiBmbGV4O1xuICAuYnV0dG9uIHtcbiAgICBib3JkZXItcmFkaXVzOiAwO1xuICAgIG1hcmdpbi1sZWZ0OiAycHg7XG4gIH1cbiAgLmJ1dHRvbjpmaXJzdC1jaGlsZCB7XG4gICAgYm9yZGVyLWJvdHRvbS1sZWZ0LXJhZGl1czogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5wcmltYXJ5QnRuUmFkaXVzfTtcbiAgICBib3JkZXItdG9wLWxlZnQtcmFkaXVzOiAke3Byb3BzID0+IHByb3BzLnRoZW1lLnByaW1hcnlCdG5SYWRpdXN9O1xuICAgIG1hcmdpbi1sZWZ0OiAwO1xuICB9XG4gIC5idXR0b246bGFzdC1jaGlsZCB7XG4gICAgYm9yZGVyLWJvdHRvbS1yaWdodC1yYWRpdXM6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUucHJpbWFyeUJ0blJhZGl1c307XG4gICAgYm9yZGVyLXRvcC1yaWdodC1yYWRpdXM6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUucHJpbWFyeUJ0blJhZGl1c307XG4gIH1cbmA7XG5cbmV4cG9ydCBjb25zdCBEYXRhc2V0U3F1YXJlID0gc3R5bGVkLmRpdmBcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICB3aWR0aDogOHB4O1xuICBoZWlnaHQ6IDhweDtcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiKCR7cHJvcHMgPT4gcHJvcHMuY29sb3Iuam9pbignLCcpfSk7XG4gIG1hcmdpbi1yaWdodDogMTJweFxuYDtcblxuZXhwb3J0IGNvbnN0IFRhYmxlID0gc3R5bGVkLnRhYmxlYFxuICB3aWR0aDogMTAwJTtcbiAgYm9yZGVyLXNwYWNpbmc6IDA7XG5cbiAgdGhlYWQge1xuICAgIHRyIHRoIHtcbiAgICAgIGJhY2tncm91bmQ6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUucGFuZWxCYWNrZ3JvdW5kTFR9O1xuICAgICAgY29sb3I6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUudGl0bGVDb2xvckxUfTtcbiAgICAgIHBhZGRpbmc6IDE4cHggMTJweDtcbiAgICAgIHRleHQtYWxpZ246IHN0YXJ0O1xuICAgIH1cbiAgfVxuXG4gIHRib2R5IHtcbiAgIHRyIHRkIHtcbiAgICAgYm9yZGVyLWJvdHRvbTogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5wYW5lbEJvcmRlckxUfTtcbiAgICAgcGFkZGluZzogMTJweDtcbiAgIH1cbiAgfVxuYDtcblxuZXhwb3J0IGNvbnN0IFN0eWxlZE1vZGFsQ29udGVudCA9IHN0eWxlZC5kaXZgXG4gIGJhY2tncm91bmQ6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUucGFuZWxCYWNrZ3JvdW5kTFR9O1xuICBjb2xvcjogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS50ZXh0Q29sb3JMVH07XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiByb3c7XG4gIGZvbnQtc2l6ZTogMTBweDtcbiAgbWFyZ2luOiAwIC05NnB4O1xuICBwYWRkaW5nOiAzMHB4IDk2cHg7XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbmA7XG5cbi8qKlxuICogTmV3ZXIgdmVyc2lvbnMgb2YgbWFwYm94LmdsIGRpc3BsYXkgYW4gZXJyb3IgbWVzc2FnZSBiYW5uZXIgb24gdG9wIG9mIHRoZSBtYXAgYnkgZGVmYXVsdFxuICogd2hpY2ggd2lsbCBjYXVzZSB0aGUgbWFwIHRvIGRpc3BsYXkgcG9pbnRzIGluIHRoZSB3cm9uZyBsb2NhdGlvbnNcbiAqIFRoaXMgd29ya2Fyb3VuZCB3aWxsIGhpZGUgdGhlIGVycm9yIGJhbm5lci5cbiAqL1xuZXhwb3J0IGNvbnN0IFN0eWxlZE1hcENvbnRhaW5lciA9IHN0eWxlZC5kaXZgXG4gIC5tYXBib3hnbC1tYXAgLm1hcGJveGdsLW1pc3NpbmctY3NzIHtcbiAgICBkaXNwbGF5OiBub25lO1xuICB9XG5gO1xuIl19