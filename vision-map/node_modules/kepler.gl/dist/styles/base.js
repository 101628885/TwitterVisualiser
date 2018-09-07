'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.themeLT = exports.theme = exports.modalScrollBar = exports.textTruncate = exports.rangeBrushBgd = exports.sliderHandleShadow = exports.sliderHandleHoverColor = exports.sliderHandleColor = exports.sliderHandleWidth = exports.sliderHandleHeight = exports.sliderBarHeight = exports.sliderBarRadius = exports.sliderBarHoverColor = exports.sliderBarBgd = exports.sliderBarColor = exports.modalDialogColor = exports.modalDialogBgd = exports.modalImagePlaceHolder = exports.modalFooterBgd = exports.modalTitleFontSize = exports.modalTitleColor = exports.tooltipColor = exports.tooltipBg = exports.mapPanelHeaderBackgroundColor = exports.mapPanelBackgroundColor = exports.panelBorderLT = exports.panelBorder = exports.panelBorderColor = exports.panelBackgroundLT = exports.panelBorderRadius = exports.panelBoxShadow = exports.panelHeaderHeight = exports.panelHeaderIconActive = exports.panelHeaderIcon = exports.panelActiveBgLT = exports.panelActiveBg = exports.panelBackgroundHover = exports.panelBackground = exports.sideBarCloseBtnBgdHover = exports.sideBarCloseBtnColor = exports.sideBarCloseBtnBgd = exports.sidePanelBg = exports.sidePanelHeaderBg = exports.checkboxBoxBgdChecked = exports.checkboxBoxBgd = exports.checkboxBorderColorLT = exports.checkboxBorderRadius = exports.checkboxBorderColor = exports.checkboxMargin = undefined;
exports.checkboxHeight = exports.checkboxWidth = exports.secondarySwitchBtnBgd = exports.secondarySwitchTrackBgd = exports.switchBtnHeight = exports.switchBtnWidth = exports.switchBtnBorderRadius = exports.switchBtnBoxShadow = exports.switchBtnBgdActive = exports.switchBtnBgd = exports.switchTrackBorderRadius = exports.switchTrackBgdActive = exports.switchTrackBgd = exports.switchLabelMargin = exports.switchHeight = exports.switchWidth = exports.dropdownListBorderTop = exports.dropdownListBgd = exports.dropdownListShadow = exports.dropdownListHighlightBg = exports.selectBorder = exports.selectBorderRadius = exports.selectBorderColorLT = exports.selectBorderColor = exports.selectBackgroundHoverLT = exports.selectBackgroundLT = exports.selectBackgroundHover = exports.selectBackground = exports.selectColorPlaceHolder = exports.selectFontWeightBold = exports.selectFontWeight = exports.selectFontSize = exports.selectActiveBorderColor = exports.selectColorLT = exports.selectColor = exports.secondaryInputBorderActiveColor = exports.secondaryInputBorderColor = exports.secondaryInputColor = exports.secondaryInputBgdActive = exports.secondaryInputBgdHover = exports.secondaryInputBgd = exports.secondaryInputHeight = exports.inputPlaceholderFontWeight = exports.inputPlaceholderColor = exports.inputBorderRadius = exports.inputColor = exports.inputBorderActiveColor = exports.inputBorderHoverColor = exports.inputBorderColor = exports.inputBgdActive = exports.inputBgdHover = exports.inputBgd = exports.inputFontWeight = exports.inputFontSize = exports.inputPadding = exports.inputBoxHeight = exports.negativeBtnActColor = exports.negativeBtnColor = exports.negativeBtnBgdHover = exports.negativeBtnActBgd = exports.negativeBtnBgd = exports.linkBtnActBgdHover = exports.linkBtnActColor = exports.linkBtnColor = exports.linkBtnActBgd = exports.linkBtnBgd = exports.secondaryBtnBgdHover = exports.secondaryBtnActColor = exports.secondaryBtnColor = exports.secondaryBtnActBgd = exports.secondaryBtnBgd = exports.primaryBtnRadius = exports.primaryBtnBgdHover = exports.primaryBtnActColor = exports.primaryBtnColor = exports.primaryBtnActBgd = exports.primaryBtnBgd = exports.errorColor = exports.activeColorHover = exports.activeColor = exports.textColorHlLT = exports.textColorHl = exports.titleTextColor = exports.subtextColorActive = exports.subtextColorLT = exports.subtextColor = exports.titleColorLT = exports.textColorLT = exports.textColor = exports.labelColorLT = exports.labelHoverColor = exports.labelColor = exports.borderColorLight = exports.borderColor = exports.borderRadius = exports.boxSizing = exports.boxShadow = exports.transitionSlow = exports.transitionFast = exports.transition = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _taggedTemplateLiteral2 = require('babel-runtime/helpers/taggedTemplateLiteral');

var _taggedTemplateLiteral3 = _interopRequireDefault(_taggedTemplateLiteral2);

var _templateObject = (0, _taggedTemplateLiteral3.default)(['\n  align-items: center;\n  background-color: ', ';\n  border: 1px solid\n    ', ';\n  border-radius: 2px;\n  caret-color: ', ';\n  color: ', ';\n  display: flex;\n  font-size: ', ';\n  font-weight: ', ';\n  height: ', ';\n  justify-content: space-between;\n  outline: none;\n  overflow: hidden;\n  padding: ', ';\n  text-overflow: ellipsis;\n  transition: ', ';\n  white-space: nowrap;\n  width: 100%;\n  word-wrap: normal;\n  pointer-events: ', ';\n  opacity: ', ';\n\n  :hover {\n    cursor: ', ';\n    background-color: ', ';\n    border-color: ', ';\n  }\n\n  :active,\n  :focus,\n  &.focus,\n  &.active {\n    background-color: ', ';\n    border-color: ', ';\n  }\n\n  ::placeholder {\n    color: ', ';\n    font-weight: ', ';\n  }\n\n  /* Disable Arrows on Number Inputs */\n  ::-webkit-inner-spin-button,\n  ::-webkit-outer-spin-button {\n    -webkit-appearance: none;\n    margin: 0;\n  }\n'], ['\n  align-items: center;\n  background-color: ', ';\n  border: 1px solid\n    ', ';\n  border-radius: 2px;\n  caret-color: ', ';\n  color: ', ';\n  display: flex;\n  font-size: ', ';\n  font-weight: ', ';\n  height: ', ';\n  justify-content: space-between;\n  outline: none;\n  overflow: hidden;\n  padding: ', ';\n  text-overflow: ellipsis;\n  transition: ', ';\n  white-space: nowrap;\n  width: 100%;\n  word-wrap: normal;\n  pointer-events: ', ';\n  opacity: ', ';\n\n  :hover {\n    cursor: ', ';\n    background-color: ', ';\n    border-color: ', ';\n  }\n\n  :active,\n  :focus,\n  &.focus,\n  &.active {\n    background-color: ', ';\n    border-color: ', ';\n  }\n\n  ::placeholder {\n    color: ', ';\n    font-weight: ', ';\n  }\n\n  /* Disable Arrows on Number Inputs */\n  ::-webkit-inner-spin-button,\n  ::-webkit-outer-spin-button {\n    -webkit-appearance: none;\n    margin: 0;\n  }\n']),
    _templateObject2 = (0, _taggedTemplateLiteral3.default)(['\n  ', '\n  \n  background-color: ', ';\n  border: 1px solid\n  ', ';\n  color: ', ';\n  caret-color: ', ';\n\n  ::-webkit-input-placeholder {\n    color: ', ';\n    font-weight: 400;\n  }\n\n  :active,\n  :focus,\n  &.focus,\n  &.active {\n    background-color: ', ';\n    border-color: ', ';\n  }\n\n  :hover {\n    background-color: ', ';\n    cursor: ', ';\n    border-color: ', ';\n  }\n'], ['\n  ', '\n  \n  background-color: ', ';\n  border: 1px solid\n  ', ';\n  color: ', ';\n  caret-color: ', ';\n\n  ::-webkit-input-placeholder {\n    color: ', ';\n    font-weight: 400;\n  }\n\n  :active,\n  :focus,\n  &.focus,\n  &.active {\n    background-color: ', ';\n    border-color: ', ';\n  }\n\n  :hover {\n    background-color: ', ';\n    cursor: ', ';\n    border-color: ', ';\n  }\n']),
    _templateObject3 = (0, _taggedTemplateLiteral3.default)(['\n  ', ' \n  color: ', ';\n  background-color: ', ';\n  height: ', ';\n  border: 1px solid\n    ', ';\n\n  :hover {\n    cursor: pointer;\n    background-color: ', ';\n    border-color: ', ';\n  }\n\n  :active,\n  &.active {\n    background-color: ', ';\n    border-color: ', ';\n  }\n'], ['\n  ', ' \n  color: ', ';\n  background-color: ', ';\n  height: ', ';\n  border: 1px solid\n    ', ';\n\n  :hover {\n    cursor: pointer;\n    background-color: ', ';\n    border-color: ', ';\n  }\n\n  :active,\n  &.active {\n    background-color: ', ';\n    border-color: ', ';\n  }\n']),
    _templateObject4 = (0, _taggedTemplateLiteral3.default)(['\n  ', ' \n  cursor: pointer;\n  flex-wrap: wrap;\n  height: auto;\n  justify-content: start;\n  margin-bottom: 2px;\n  padding: 4px 7px 4px 4px;\n  white-space: normal;\n'], ['\n  ', ' \n  cursor: pointer;\n  flex-wrap: wrap;\n  height: auto;\n  justify-content: start;\n  margin-bottom: 2px;\n  padding: 4px 7px 4px 4px;\n  white-space: normal;\n']),
    _templateObject5 = (0, _taggedTemplateLiteral3.default)(['\n  ', ' color: ', ';\n  font-size: 13px;\n  letter-spacing: 0.43px;\n  line-height: 18px;\n  height: 24px;\n  font-weight: 400;\n  padding-left: 4px;\n  margin-left: -4px;\n  background-color: transparent;\n  border: 1px solid transparent;\n\n  :hover {\n    height: 24px;\n    cursor: text;\n    background-color: transparent;\n    border: 1px solid ', ';\n  }\n\n  :active,\n  .active,\n  :focus {\n    background-color: transparent;\n    border: 1px solid ', ';\n  }\n'], ['\n  ', ' color: ', ';\n  font-size: 13px;\n  letter-spacing: 0.43px;\n  line-height: 18px;\n  height: 24px;\n  font-weight: 400;\n  padding-left: 4px;\n  margin-left: -4px;\n  background-color: transparent;\n  border: 1px solid transparent;\n\n  :hover {\n    height: 24px;\n    cursor: text;\n    background-color: transparent;\n    border: 1px solid ', ';\n  }\n\n  :active,\n  .active,\n  :focus {\n    background-color: transparent;\n    border: 1px solid ', ';\n  }\n']),
    _templateObject6 = (0, _taggedTemplateLiteral3.default)(['\n  background: ', ';\n  position: absolute;\n  top: 0;\n  left: ', 'px;\n  content: \'\';\n  display: block;\n  width: ', 'px;\n  height: ', 'px;\n  border-radius: ', ';\n'], ['\n  background: ', ';\n  position: absolute;\n  top: 0;\n  left: ', 'px;\n  content: \'\';\n  display: block;\n  width: ', 'px;\n  height: ', 'px;\n  border-radius: ', ';\n']),
    _templateObject7 = (0, _taggedTemplateLiteral3.default)(['\n  transition: ', ';\n  position: absolute;\n  top: 0;\n  left: ', 'px;\n  content: \'\';\n  display: block;\n  height: ', ';\n  width: ', ';\n  background: ', ';\n  box-shadow: ', ';\n'], ['\n  transition: ', ';\n  position: absolute;\n  top: 0;\n  left: ', 'px;\n  content: \'\';\n  display: block;\n  height: ', ';\n  width: ', ';\n  background: ', ';\n  box-shadow: ', ';\n']),
    _templateObject8 = (0, _taggedTemplateLiteral3.default)(['\n  user-select: none;\n  cursor: pointer;\n  line-height: 0;\n  font-weight: 500;\n  font-size: 12px;\n  color: ', ';\n  position: relative;\n  display: inline-block;\n  padding-top: ', 'px;\n  padding-right: 0;\n  padding-bottom: 0;\n  padding-left: ', 'px;\n\n  :before {\n    ', ';\n  }\n\n  :after {\n    ', ';\n  }\n'], ['\n  user-select: none;\n  cursor: pointer;\n  line-height: 0;\n  font-weight: 500;\n  font-size: 12px;\n  color: ', ';\n  position: relative;\n  display: inline-block;\n  padding-top: ', 'px;\n  padding-right: 0;\n  padding-bottom: 0;\n  padding-left: ', 'px;\n\n  :before {\n    ', ';\n  }\n\n  :after {\n    ', ';\n  }\n']),
    _templateObject9 = (0, _taggedTemplateLiteral3.default)(['\n  display: block;\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: ', 'px;\n  height: ', 'px;\n  background: ', ';\n  border: 1px solid ', ';\n  border-radius: 2px;\n  content: \'\';\n'], ['\n  display: block;\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: ', 'px;\n  height: ', 'px;\n  background: ', ';\n  border: 1px solid ', ';\n  border-radius: 2px;\n  content: \'\';\n']),
    _templateObject10 = (0, _taggedTemplateLiteral3.default)(['\n  width: 10px;\n  height: 5px;\n  border-bottom: 2px solid white;\n  border-left: 2px solid white;\n  top: 4px;\n  left: 3px;\n  transform: rotate(-45deg);\n  display: block;\n  position: absolute;\n  opacity: ', ';\n  content: "";\n'], ['\n  width: 10px;\n  height: 5px;\n  border-bottom: 2px solid white;\n  border-left: 2px solid white;\n  top: 4px;\n  left: 3px;\n  transform: rotate(-45deg);\n  display: block;\n  position: absolute;\n  opacity: ', ';\n  content: "";\n']),
    _templateObject11 = (0, _taggedTemplateLiteral3.default)(['\n  display: inline-block;\n  position: relative;\n  padding-left: 32px;\n  margin-bottom: 24px;\n  line-height: 20px;\n  vertical-align: middle;\n  cursor: pointer;\n  font-size: 12px;\n  color: ', ';\n  margin-left: -', 'px;\n\n  :before {\n     ', ';\n  }\n  \n  :after {\n    ', ';\n  }\n'], ['\n  display: inline-block;\n  position: relative;\n  padding-left: 32px;\n  margin-bottom: 24px;\n  line-height: 20px;\n  vertical-align: middle;\n  cursor: pointer;\n  font-size: 12px;\n  color: ', ';\n  margin-left: -', 'px;\n\n  :before {\n     ', ';\n  }\n  \n  :after {\n    ', ';\n  }\n']),
    _templateObject12 = (0, _taggedTemplateLiteral3.default)(['\n  ', ' \n  :before {\n    ', ' background: ', ';\n  }\n\n  :after {\n    ', ' \n    background: ', ';\n  }\n'], ['\n  ', ' \n  :before {\n    ', ' background: ', ';\n  }\n\n  :after {\n    ', ' \n    background: ', ';\n  }\n']),
    _templateObject13 = (0, _taggedTemplateLiteral3.default)(['\n  ::-webkit-scrollbar {\n    height: 10px;\n    width: 10px;\n  }\n  \n  ::-webkit-scrollbar-corner {\n    background: ', ';\n  }\n  \n  ::-webkit-scrollbar-track {\n    background: ', ';\n  }\n  \n  ::-webkit-scrollbar-thumb {\n    border-radius: 10px;\n    background: ', ';\n    border: 3px solid ', ';\n  };\n  \n  :vertical:hover {\n    background: ', ';\n    cursor: pointer;\n  }\n}'], ['\n  ::-webkit-scrollbar {\n    height: 10px;\n    width: 10px;\n  }\n  \n  ::-webkit-scrollbar-corner {\n    background: ', ';\n  }\n  \n  ::-webkit-scrollbar-track {\n    background: ', ';\n  }\n  \n  ::-webkit-scrollbar-thumb {\n    border-radius: 10px;\n    background: ', ';\n    border: 3px solid ', ';\n  };\n  \n  :vertical:hover {\n    background: ', ';\n    cursor: pointer;\n  }\n}']),
    _templateObject14 = (0, _taggedTemplateLiteral3.default)(['\n  color: ', ';\n  padding-left: 3px;\n'], ['\n  color: ', ';\n  padding-left: 3px;\n']),
    _templateObject15 = (0, _taggedTemplateLiteral3.default)(['\n  font-size: 11px;\n  padding: 3px 9px;\n  font-weight: 500;\n\n  &.hover,\n  &:hover {\n    cursor: pointer;\n    background-color: ', ';\n\n    .list__item__anchor {\n      color: ', ';\n    }\n  }\n'], ['\n  font-size: 11px;\n  padding: 3px 9px;\n  font-weight: 500;\n\n  &.hover,\n  &:hover {\n    cursor: pointer;\n    background-color: ', ';\n\n    .list__item__anchor {\n      color: ', ';\n    }\n  }\n']),
    _templateObject16 = (0, _taggedTemplateLiteral3.default)(['\n  font-size: 11px;\n  padding: 5px 9px;\n  color: ', ';\n'], ['\n  font-size: 11px;\n  padding: 5px 9px;\n  color: ', ';\n']),
    _templateObject17 = (0, _taggedTemplateLiteral3.default)(['\n  padding: 0 0 4px 0;\n  margin-bottom: 4px;\n  border-bottom: 1px solid ', ';\n'], ['\n  padding: 0 0 4px 0;\n  margin-bottom: 4px;\n  border-bottom: 1px solid ', ';\n']),
    _templateObject18 = (0, _taggedTemplateLiteral3.default)(['\n  overflow-y: auto;\n  max-height: 280px;\n  box-shadow: ', ';\n  border-radius: 2px;\n\n  .list__section {\n    ', ';\n  }\n  .list__header {\n    ', ';\n  }\n\n  .list__item {\n    ', ';\n  }\n\n  .list__item__anchor {\n    ', ';\n  }\n\n  ', ';\n'], ['\n  overflow-y: auto;\n  max-height: 280px;\n  box-shadow: ', ';\n  border-radius: 2px;\n\n  .list__section {\n    ', ';\n  }\n  .list__header {\n    ', ';\n  }\n\n  .list__item {\n    ', ';\n  }\n\n  .list__item__anchor {\n    ', ';\n  }\n\n  ', ';\n']),
    _templateObject19 = (0, _taggedTemplateLiteral3.default)(['\n  ::-webkit-scrollbar {\n    height: 10px;\n    width: 10px;\n  }\n  \n  ::-webkit-scrollbar-corner {\n    background: ', ';\n  }\n  \n  ::-webkit-scrollbar-track {\n    background: ', ';\n  }\n  \n  ::-webkit-scrollbar-thumb {\n    border-radius: 10px;\n    background: ', ';\n    border: 3px solid ', ';\n    \n    :hover {\n      background: ', ';\n      cursor: pointer;\n    }\n  };\n}'], ['\n  ::-webkit-scrollbar {\n    height: 10px;\n    width: 10px;\n  }\n  \n  ::-webkit-scrollbar-corner {\n    background: ', ';\n  }\n  \n  ::-webkit-scrollbar-track {\n    background: ', ';\n  }\n  \n  ::-webkit-scrollbar-thumb {\n    border-radius: 10px;\n    background: ', ';\n    border: 3px solid ', ';\n    \n    :hover {\n      background: ', ';\n      cursor: pointer;\n    }\n  };\n}']),
    _templateObject20 = (0, _taggedTemplateLiteral3.default)(['\n  ::-webkit-scrollbar {\n    height: 10px;\n    width: 10px;\n  }\n  \n  ::-webkit-scrollbar-corner {\n    background: ', ';\n  }\n  \n  ::-webkit-scrollbar-track {\n    background: ', ';\n  }\n  \n  ::-webkit-scrollbar-thumb {\n    border-radius: 10px;\n    background: ', ';\n    border: 3px solid ', ';\n    :hover {\n      background: ', ';\n      cursor: pointer;\n    }\n  };\n'], ['\n  ::-webkit-scrollbar {\n    height: 10px;\n    width: 10px;\n  }\n  \n  ::-webkit-scrollbar-corner {\n    background: ', ';\n  }\n  \n  ::-webkit-scrollbar-track {\n    background: ', ';\n  }\n  \n  ::-webkit-scrollbar-thumb {\n    border-radius: 10px;\n    background: ', ';\n    border: 3px solid ', ';\n    :hover {\n      background: ', ';\n      cursor: pointer;\n    }\n  };\n']),
    _templateObject21 = (0, _taggedTemplateLiteral3.default)(['\n  ::-webkit-scrollbar {\n    height: 10px;\n    width: 10px;\n  }\n  \n  ::-webkit-scrollbar-corner {\n    background: ', ';\n  }\n  \n  ::-webkit-scrollbar-track {\n    background: ', ';\n  }\n  \n  ::-webkit-scrollbar-thumb {\n    border-radius: 10px;\n    background: ', ';\n    border: 3px solid ', '\n\n    :vertical:hover {\n      background: ', ';\n      cursor: pointer;\n    }\n    \n    :horizontal:hover {\n      background: ', ';\n      cursor: pointer;\n    }\n  }\n}'], ['\n  ::-webkit-scrollbar {\n    height: 10px;\n    width: 10px;\n  }\n  \n  ::-webkit-scrollbar-corner {\n    background: ', ';\n  }\n  \n  ::-webkit-scrollbar-track {\n    background: ', ';\n  }\n  \n  ::-webkit-scrollbar-thumb {\n    border-radius: 10px;\n    background: ', ';\n    border: 3px solid ', '\n\n    :vertical:hover {\n      background: ', ';\n      cursor: pointer;\n    }\n    \n    :horizontal:hover {\n      background: ', ';\n      cursor: pointer;\n    }\n  }\n}']),
    _templateObject22 = (0, _taggedTemplateLiteral3.default)(['\n  ::-webkit-scrollbar {\n    width: 14px;\n    height: 16px;\n  }\n\n  ::-webkit-scrollbar-track {\n    background: white;\n  }\n  ::-webkit-scrollbar-track:horizontal {\n    background: ', ';\n  }\n  ::-webkit-scrollbar-thumb {\n    background: ', ';\n    border: 4px solid white;\n  }\n\n  ::-webkit-scrollbar-corner {\n    background: ', ';\n  }\n\n  ::-webkit-scrollbar-thumb:hover {\n    background: #969da9;\n  }\n\n  ::-webkit-scrollbar-thumb:vertical {\n    border-radius: 7px;\n  }\n\n  ::-webkit-scrollbar-thumb:horizontal {\n    border-radius: 9px;\n    border: 4px solid ', ';\n  }\n'], ['\n  ::-webkit-scrollbar {\n    width: 14px;\n    height: 16px;\n  }\n\n  ::-webkit-scrollbar-track {\n    background: white;\n  }\n  ::-webkit-scrollbar-track:horizontal {\n    background: ', ';\n  }\n  ::-webkit-scrollbar-thumb {\n    background: ', ';\n    border: 4px solid white;\n  }\n\n  ::-webkit-scrollbar-corner {\n    background: ', ';\n  }\n\n  ::-webkit-scrollbar-thumb:hover {\n    background: #969da9;\n  }\n\n  ::-webkit-scrollbar-thumb:vertical {\n    border-radius: 7px;\n  }\n\n  ::-webkit-scrollbar-thumb:horizontal {\n    border-radius: 9px;\n    border: 4px solid ', ';\n  }\n']); // Copyright (c) 2018 Uber Technologies, Inc.
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

var _defaultSettings = require('../constants/default-settings');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var transition = exports.transition = 'all .4s ease';
var transitionFast = exports.transitionFast = 'all .2s ease';
var transitionSlow = exports.transitionSlow = 'all .8s ease';

var boxShadow = exports.boxShadow = '0 1px 2px 0 rgba(0,0,0,0.10)';
var boxSizing = exports.boxSizing = 'border-box';
var borderRadius = exports.borderRadius = '1px';
var borderColor = exports.borderColor = '#3A414C';
var borderColorLight = exports.borderColorLight = '#F1F1F1';

// TEXT
var labelColor = exports.labelColor = '#6A7485';
var labelHoverColor = exports.labelHoverColor = '#C6C6C6';
var labelColorLT = exports.labelColorLT = '#6A7485';

var textColor = exports.textColor = '#A0A7B4';
var textColorLT = exports.textColorLT = '#3A414C';
var titleColorLT = exports.titleColorLT = '#29323C';

var subtextColor = exports.subtextColor = '#6A7485';
var subtextColorLT = exports.subtextColorLT = '#A0A7B4';
var subtextColorActive = exports.subtextColorActive = '#FFFFFF';

var titleTextColor = exports.titleTextColor = '#FFFFFF';
var textColorHl = exports.textColorHl = '#D3D8E0';
var textColorHlLT = exports.textColorHlLT = '#F1F1F1';
var activeColor = exports.activeColor = '#1FBAD6';
var activeColorHover = exports.activeColorHover = '#108188';
var errorColor = exports.errorColor = '#F9042C';

// Button
var primaryBtnBgd = exports.primaryBtnBgd = '#0F9668';
var primaryBtnActBgd = exports.primaryBtnActBgd = '#13B17B';
var primaryBtnColor = exports.primaryBtnColor = '#FFFFFF';
var primaryBtnActColor = exports.primaryBtnActColor = '#FFFFFF';
var primaryBtnBgdHover = exports.primaryBtnBgdHover = '#13B17B';
var primaryBtnRadius = exports.primaryBtnRadius = '2px';

var secondaryBtnBgd = exports.secondaryBtnBgd = '#6A7485';
var secondaryBtnActBgd = exports.secondaryBtnActBgd = '#A0A7B4';
var secondaryBtnColor = exports.secondaryBtnColor = '#FFFFFF';
var secondaryBtnActColor = exports.secondaryBtnActColor = '#FFFFFF';
var secondaryBtnBgdHover = exports.secondaryBtnBgdHover = '#A0A7B4';

var linkBtnBgd = exports.linkBtnBgd = 'transparent';
var linkBtnActBgd = exports.linkBtnActBgd = linkBtnBgd;
var linkBtnColor = exports.linkBtnColor = '#A0A7B4';
var linkBtnActColor = exports.linkBtnActColor = '#3A414C';
var linkBtnActBgdHover = exports.linkBtnActBgdHover = linkBtnBgd;

var negativeBtnBgd = exports.negativeBtnBgd = errorColor;
var negativeBtnActBgd = exports.negativeBtnActBgd = '#FF193E';
var negativeBtnBgdHover = exports.negativeBtnBgdHover = '#FF193E';
var negativeBtnColor = exports.negativeBtnColor = '#FFFFFF';
var negativeBtnActColor = exports.negativeBtnActColor = '#FFFFFF';

// Input
var inputBoxHeight = exports.inputBoxHeight = '34px';
var inputPadding = exports.inputPadding = '4px 10px';
var inputFontSize = exports.inputFontSize = '11px';
var inputFontWeight = exports.inputFontWeight = 500;
var inputBgd = exports.inputBgd = '#29323C';
var inputBgdHover = exports.inputBgdHover = '#3A414C';
var inputBgdActive = exports.inputBgdActive = '#3A414C';
var inputBorderColor = exports.inputBorderColor = '#29323C';
var inputBorderHoverColor = exports.inputBorderHoverColor = '#3A414C';
var inputBorderActiveColor = exports.inputBorderActiveColor = '#D3D8E0';
var inputColor = exports.inputColor = '#A0A7B4';
var inputBorderRadius = exports.inputBorderRadius = '1px';
var inputPlaceholderColor = exports.inputPlaceholderColor = '#6A7485';
var inputPlaceholderFontWeight = exports.inputPlaceholderFontWeight = 400;

var secondaryInputHeight = exports.secondaryInputHeight = '28px';
var secondaryInputBgd = exports.secondaryInputBgd = '#242730';
var secondaryInputBgdHover = exports.secondaryInputBgdHover = '#3A414C';
var secondaryInputBgdActive = exports.secondaryInputBgdActive = '#3A414C';
var secondaryInputColor = exports.secondaryInputColor = '#A0A7B4';
var secondaryInputBorderColor = exports.secondaryInputBorderColor = '#242730';
var secondaryInputBorderActiveColor = exports.secondaryInputBorderActiveColor = '#D3D8E0';

// Select
var selectColor = exports.selectColor = inputColor;
var selectColorLT = exports.selectColorLT = titleColorLT;

var selectActiveBorderColor = exports.selectActiveBorderColor = '#D3D8E0';
var selectFontSize = exports.selectFontSize = '11px';
var selectFontWeight = exports.selectFontWeight = '400';
var selectFontWeightBold = exports.selectFontWeightBold = '500';

var selectColorPlaceHolder = exports.selectColorPlaceHolder = '#6A7485';
var selectBackground = exports.selectBackground = inputBgd;
var selectBackgroundHover = exports.selectBackgroundHover = inputBgdHover;
var selectBackgroundLT = exports.selectBackgroundLT = '#FFFFFF';
var selectBackgroundHoverLT = exports.selectBackgroundHoverLT = '#F8F8F9';
var selectBorderColor = exports.selectBorderColor = '#D3D8E0';
var selectBorderColorLT = exports.selectBorderColorLT = '#D3D8E0';
var selectBorderRadius = exports.selectBorderRadius = '1px';
var selectBorder = exports.selectBorder = 0;

var dropdownListHighlightBg = exports.dropdownListHighlightBg = '#6A7485';
var dropdownListShadow = exports.dropdownListShadow = '0 6px 12px 0 rgba(0,0,0,0.16)';
var dropdownListBgd = exports.dropdownListBgd = '#3A414C';
var dropdownListBorderTop = exports.dropdownListBorderTop = '#242730';

// Switch
var switchWidth = exports.switchWidth = 24;
var switchHeight = exports.switchHeight = 12;
var switchLabelMargin = exports.switchLabelMargin = 12;

var switchTrackBgd = exports.switchTrackBgd = '#29323C';
var switchTrackBgdActive = exports.switchTrackBgdActive = activeColor;
var switchTrackBorderRadius = exports.switchTrackBorderRadius = '1px';
var switchBtnBgd = exports.switchBtnBgd = '#6A7485';
var switchBtnBgdActive = exports.switchBtnBgdActive = '#D3D8E0';
var switchBtnBoxShadow = exports.switchBtnBoxShadow = '0 2px 4px 0 rgba(0,0,0,0.40)';
var switchBtnBorderRadius = exports.switchBtnBorderRadius = '1px';
var switchBtnWidth = exports.switchBtnWidth = '12px';
var switchBtnHeight = exports.switchBtnHeight = '12px';

var secondarySwitchTrackBgd = exports.secondarySwitchTrackBgd = '#242730';
var secondarySwitchBtnBgd = exports.secondarySwitchBtnBgd = '#3A414C';

// Checkbox
var checkboxWidth = exports.checkboxWidth = 16;
var checkboxHeight = exports.checkboxHeight = 16;
var checkboxMargin = exports.checkboxMargin = 12;
var checkboxBorderColor = exports.checkboxBorderColor = selectBorderColor;
var checkboxBorderRadius = exports.checkboxBorderRadius = '2px';
var checkboxBorderColorLT = exports.checkboxBorderColorLT = selectBorderColorLT;
var checkboxBoxBgd = exports.checkboxBoxBgd = 'white';
var checkboxBoxBgdChecked = exports.checkboxBoxBgdChecked = primaryBtnBgd;

// Side Panel
var sidePanelHeaderBg = exports.sidePanelHeaderBg = '#29323C';
var sidePanelBg = exports.sidePanelBg = '#242730';
var sideBarCloseBtnBgd = exports.sideBarCloseBtnBgd = secondaryBtnBgd;
var sideBarCloseBtnColor = exports.sideBarCloseBtnColor = '#29323C';
var sideBarCloseBtnBgdHover = exports.sideBarCloseBtnBgdHover = secondaryBtnActBgd;

var panelBackground = exports.panelBackground = '#29323C';
var panelBackgroundHover = exports.panelBackgroundHover = '#3A4552';
var panelActiveBg = exports.panelActiveBg = '#3A4552';
var panelActiveBgLT = exports.panelActiveBgLT = '#6A7485';
var panelHeaderIcon = exports.panelHeaderIcon = '#6A7485';
var panelHeaderIconActive = exports.panelHeaderIconActive = '#A0A7B4';
var panelHeaderHeight = exports.panelHeaderHeight = 48;
var panelBoxShadow = exports.panelBoxShadow = '0 6px 12px 0 rgba(0,0,0,0.16)';
var panelBorderRadius = exports.panelBorderRadius = '2px';
var panelBackgroundLT = exports.panelBackgroundLT = '#f8f8f9';

var panelBorderColor = exports.panelBorderColor = '#3A414C';
var panelBorder = exports.panelBorder = '1px solid ' + borderColor;
var panelBorderLT = exports.panelBorderLT = '1px solid ' + borderColorLight;

var mapPanelBackgroundColor = exports.mapPanelBackgroundColor = '#242730';
var mapPanelHeaderBackgroundColor = exports.mapPanelHeaderBackgroundColor = '#29323C';
var tooltipBg = exports.tooltipBg = '#F8F8F9';
var tooltipColor = exports.tooltipColor = '#333334';

// Modal
var modalTitleColor = exports.modalTitleColor = '#3A414C';
var modalTitleFontSize = exports.modalTitleFontSize = '24px';
var modalFooterBgd = exports.modalFooterBgd = '#F8F8F9';
var modalImagePlaceHolder = exports.modalImagePlaceHolder = '#DDDFE3';

// Modal Dialog (Dark)
var modalDialogBgd = exports.modalDialogBgd = '#3A414C';
var modalDialogColor = exports.modalDialogColor = textColorHl;

// Slider
var sliderBarColor = exports.sliderBarColor = '#6A7485';
var sliderBarBgd = exports.sliderBarBgd = '#3A414C';
var sliderBarHoverColor = exports.sliderBarHoverColor = '#D3D8E0';
var sliderBarRadius = exports.sliderBarRadius = '1px';
var sliderBarHeight = exports.sliderBarHeight = '4px';
var sliderHandleHeight = exports.sliderHandleHeight = '12px';
var sliderHandleWidth = exports.sliderHandleWidth = '12px';
var sliderHandleColor = exports.sliderHandleColor = '#D3D8E0';
var sliderHandleHoverColor = exports.sliderHandleHoverColor = '#FFFFFF';
var sliderHandleShadow = exports.sliderHandleShadow = '0 2px 4px 0 rgba(0,0,0,0.40)';

// Plot
var rangeBrushBgd = exports.rangeBrushBgd = '#3A414C';

var textTruncate = exports.textTruncate = {
  maxWidth: '100%',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  wordWrap: 'normal'
};

// theme is passed to kepler.gl when it's mounted,
// it is used by styled-components to pass along to
// all child components

var input = (0, _styledComponents.css)(_templateObject, function (props) {
  return props.theme.inputBgd;
}, function (props) {
  return props.active ? props.theme.inputBorderActiveColor : props.error ? props.theme.errorColor : props.theme.inputBgd;
}, function (props) {
  return props.theme.inputBorderActiveColor;
}, function (props) {
  return props.theme.inputColor;
}, function (props) {
  return props.theme.inputFontSize;
}, function (props) {
  return props.theme.inputFontWeight;
}, function (props) {
  return props.theme.inputBoxHeight;
}, function (props) {
  return props.theme.inputPadding;
}, function (props) {
  return props.theme.transition;
}, function (props) {
  return props.disabled ? 'none' : 'all';
}, function (props) {
  return props.disabled ? 0.5 : 1;
}, function (props) {
  return props.type === 'number' ? 'text' : 'pointer';
}, function (props) {
  return props.active ? props.theme.inputBgdActive : props.theme.inputBgdHover;
}, function (props) {
  return props.active ? props.theme.inputBorderActiveColor : props.theme.inputBorderHoverColor;
}, function (props) {
  return props.theme.inputBgdActive;
}, function (props) {
  return props.theme.inputBorderActiveColor;
}, function (props) {
  return props.theme.inputPlaceholderColor;
}, function (props) {
  return props.theme.inputPlaceholderFontWeight;
});

var inputLT = (0, _styledComponents.css)(_templateObject2, input, function (props) {
  return props.theme.selectBackgroundLT;
}, function (props) {
  return props.active ? props.theme.selectActiveBorderColor : props.error ? props.theme.errorColor : props.theme.selectBorderColorLT;
}, function (props) {
  return props.theme.selectColorLT;
}, function (props) {
  return props.theme.selectColorLT;
}, function (props) {
  return props.theme.subtextColorLT;
}, function (props) {
  return props.theme.selectBackgroundLT;
}, function (props) {
  return props.theme.textColorLT;
}, function (props) {
  return props.theme.selectBackgroundLT;
}, function (props) {
  return ['number', 'text'].includes(props.type) ? 'text' : 'pointer';
}, function (props) {
  return props.active ? props.theme.textColorLT : props.theme.subtextColor;
});

var secondaryInput = (0, _styledComponents.css)(_templateObject3, function (props) {
  return props.theme.input;
}, function (props) {
  return props.theme.secondaryInputColor;
}, function (props) {
  return props.theme.secondaryInputBgd;
}, function (props) {
  return props.theme.secondaryInputHeight;
}, function (props) {
  return props.error ? props.theme.errorColor : props.theme.secondaryInputBorderColor;
}, function (props) {
  return props.theme.secondaryInputBgdHover;
}, function (props) {
  return props.theme.secondaryInputBgdHover;
}, function (props) {
  return props.theme.secondaryInputBgdActive;
}, function (props) {
  return props.theme.secondaryInputBorderActiveColor;
});

var chickletedInput = (0, _styledComponents.css)(_templateObject4, function (props) {
  return props.theme.secondaryInput;
});

var inlineInput = (0, _styledComponents.css)(_templateObject5, function (props) {
  return props.theme.input;
}, function (props) {
  return props.theme.textColor;
}, function (props) {
  return props.theme.labelColor;
}, function (props) {
  return props.theme.inputBorderActiveColor;
});

var switchTrack = (0, _styledComponents.css)(_templateObject6, function (props) {
  return props.checked ? props.theme.switchTrackBgdActive : props.theme.switchTrackBgd;
}, function (props) {
  return -props.theme.switchLabelMargin;
}, function (props) {
  return props.theme.switchWidth;
}, function (props) {
  return props.theme.switchHeight;
}, function (props) {
  return props.theme.switchTrackBorderRadius;
});

var switchButton = (0, _styledComponents.css)(_templateObject7, function (props) {
  return props.theme.transition;
}, function (props) {
  return (props.checked ? props.theme.switchWidth / 2 : -1) - props.theme.switchLabelMargin;
}, function (props) {
  return props.theme.switchBtnHeight;
}, function (props) {
  return props.theme.switchBtnWidth;
}, function (props) {
  return props.checked ? props.theme.switchBtnBgdActive : props.theme.switchBtnBgd;
}, function (props) {
  return props.theme.switchBtnBoxShadow;
});

var inputSwitch = (0, _styledComponents.css)(_templateObject8, function (props) {
  return props.theme.labelColor;
}, function (props) {
  return props.theme.switchHeight / 2;
}, function (props) {
  return props.theme.switchWidth;
}, function (props) {
  return props.theme.switchTrack;
}, function (props) {
  return props.theme.switchButton;
});

// This is a light version checkbox
var checkboxBox = (0, _styledComponents.css)(_templateObject9, function (props) {
  return props.theme.checkboxWidth;
}, function (props) {
  return props.theme.checkboxHeight;
}, function (props) {
  return props.checked ? props.theme.checkboxBoxBgdChecked : props.theme.checkboxBoxBgd;
}, function (props) {
  return props.checked ? props.theme.checkboxBoxBgdChecked : props.theme.checkboxBorderColor;
});

var checkboxCheck = (0, _styledComponents.css)(_templateObject10, function (props) {
  return props.checked ? 1 : 0;
});

var inputCheckbox = (0, _styledComponents.css)(_templateObject11, function (props) {
  return props.theme.labelColor;
}, function (props) {
  return props.theme.switchLabelMargin;
}, function (props) {
  return props.theme.checkboxBox;
}, function (props) {
  return props.theme.checkboxCheck;
});

var secondarySwitch = (0, _styledComponents.css)(_templateObject12, function (props) {
  return props.theme.inputSwitch;
}, function (props) {
  return props.theme.switchTrack;
}, function (props) {
  return props.checked ? props.theme.switchTrackBgdActive : props.theme.secondarySwitchTrackBgd;
}, function (props) {
  return props.theme.switchButton;
}, function (props) {
  return props.checked ? props.theme.switchBtnBgdActive : props.theme.secondarySwitchBtnBgd;
});

var dropdownScrollBar = (0, _styledComponents.css)(_templateObject13, function (props) {
  return props.theme.dropdownListBgd;
}, function (props) {
  return props.theme.dropdownListBgd;
}, function (props) {
  return props.theme.labelColor;
}, function (props) {
  return props.theme.dropdownListBgd;
}, function (props) {
  return props.theme.textColorHl;
});

var dropdownListAnchor = (0, _styledComponents.css)(_templateObject14, function (props) {
  return props.theme.selectColor;
});

var dropdownListItem = (0, _styledComponents.css)(_templateObject15, function (props) {
  return props.theme.dropdownListHighlightBg;
}, function (props) {
  return props.theme.textColorHl;
});

var dropdownListHeader = (0, _styledComponents.css)(_templateObject16, function (props) {
  return props.theme.labelColor;
});

var dropdownListSection = (0, _styledComponents.css)(_templateObject17, function (props) {
  return props.theme.labelColor;
});

var dropdownList = (0, _styledComponents.css)(_templateObject18, function (props) {
  return props.theme.dropdownListShadow;
}, function (props) {
  return props.theme.dropdownListSection;
}, function (props) {
  return props.theme.dropdownListHeader;
}, function (props) {
  return props.theme.dropdownListItem;
}, function (props) {
  return props.theme.dropdownListAnchor;
}, function (props) {
  return props.theme.dropdownScrollBar;
});

var sidePanelScrollBar = (0, _styledComponents.css)(_templateObject19, function (props) {
  return props.theme.sidePanelBg;
}, function (props) {
  return props.theme.sidePanelBg;
}, function (props) {
  return props.theme.panelBackgroundHover;
}, function (props) {
  return props.theme.sidePanelBg;
}, function (props) {
  return props.theme.labelColor;
});

var panelDropdownScrollBar = (0, _styledComponents.css)(_templateObject20, function (props) {
  return props.theme.panelBackground;
}, function (props) {
  return props.theme.panelBackground;
}, function (props) {
  return props.theme.panelBackgroundHover;
}, function (props) {
  return props.theme.panelBackground;
}, function (props) {
  return props.theme.labelColor;
});

var scrollBar = (0, _styledComponents.css)(_templateObject21, function (props) {
  return props.theme.panelBackground;
}, function (props) {
  return props.theme.panelBackground;
}, function (props) {
  return props.theme.labelColor;
}, function (props) {
  return props.theme.panelBackground;
}, function (props) {
  return props.theme.textColorHl;
}, function (props) {
  return props.theme.textColorHl;
});

var modalScrollBar = exports.modalScrollBar = (0, _styledComponents.css)(_templateObject22, function (props) {
  return props.theme.textColorHl;
}, function (props) {
  return props.theme.labelColorLT;
}, function (props) {
  return props.theme.textColorHl;
}, function (props) {
  return props.theme.textColorHl;
});

var theme = exports.theme = (0, _extends3.default)({}, _defaultSettings.DIMENSIONS, {
  // templates
  input: input,
  inputLT: inputLT,
  inlineInput: inlineInput,
  chickletedInput: chickletedInput,
  secondaryInput: secondaryInput,
  dropdownScrollBar: dropdownScrollBar,
  dropdownList: dropdownList,
  dropdownListItem: dropdownListItem,
  dropdownListAnchor: dropdownListAnchor,
  dropdownListHeader: dropdownListHeader,
  dropdownListSection: dropdownListSection,
  dropdownListShadow: dropdownListShadow,
  modalScrollBar: modalScrollBar,
  scrollBar: scrollBar,
  sidePanelScrollBar: sidePanelScrollBar,
  inputSwitch: inputSwitch,
  secondarySwitch: secondarySwitch,
  switchTrack: switchTrack,
  switchButton: switchButton,
  inputCheckbox: inputCheckbox,
  checkboxBox: checkboxBox,
  checkboxCheck: checkboxCheck,

  // Transitions
  transition: transition,
  transitionFast: transitionFast,
  transitionSlow: transitionSlow,

  // styles
  activeColor: activeColor,
  activeColorHover: activeColorHover,
  borderRadius: borderRadius,
  boxShadow: boxShadow,
  errorColor: errorColor,
  dropdownListHighlightBg: dropdownListHighlightBg,
  dropdownListBgd: dropdownListBgd,
  dropdownListBorderTop: dropdownListBorderTop,

  labelColor: labelColor,
  labelColorLT: labelColorLT,
  labelHoverColor: labelHoverColor,
  mapPanelBackgroundColor: mapPanelBackgroundColor,
  mapPanelHeaderBackgroundColor: mapPanelHeaderBackgroundColor,

  // Select
  selectActiveBorderColor: selectActiveBorderColor,
  selectBackground: selectBackground,
  selectBackgroundLT: selectBackgroundLT,
  selectBackgroundHover: selectBackgroundHover,
  selectBackgroundHoverLT: selectBackgroundHoverLT,
  selectBorder: selectBorder,
  selectBorderColor: selectBorderColor,
  selectBorderRadius: selectBorderRadius,
  selectBorderColorLT: selectBorderColorLT,
  selectColor: selectColor,
  selectColorPlaceHolder: selectColorPlaceHolder,
  selectFontSize: selectFontSize,
  selectFontWeight: selectFontWeight,
  selectColorLT: selectColorLT,

  // Input
  inputBgd: inputBgd,
  inputBgdHover: inputBgdHover,
  inputBgdActive: inputBgdActive,
  inputBoxHeight: inputBoxHeight,
  inputBorderColor: inputBorderColor,
  inputBorderActiveColor: inputBorderActiveColor,
  inputBorderHoverColor: inputBorderHoverColor,
  inputBorderRadius: inputBorderRadius,
  inputColor: inputColor,
  inputPadding: inputPadding,
  inputFontSize: inputFontSize,
  inputFontWeight: inputFontWeight,
  inputPlaceholderColor: inputPlaceholderColor,
  inputPlaceholderFontWeight: inputPlaceholderFontWeight,

  secondaryInputBgd: secondaryInputBgd,
  secondaryInputBgdHover: secondaryInputBgdHover,
  secondaryInputBgdActive: secondaryInputBgdActive,
  secondaryInputHeight: secondaryInputHeight,
  secondaryInputColor: secondaryInputColor,
  secondaryInputBorderColor: secondaryInputBorderColor,
  secondaryInputBorderActiveColor: secondaryInputBorderActiveColor,

  // Switch
  switchWidth: switchWidth,
  switchHeight: switchHeight,
  switchTrackBgd: switchTrackBgd,
  switchTrackBgdActive: switchTrackBgdActive,
  switchTrackBorderRadius: switchTrackBorderRadius,
  switchBtnBgd: switchBtnBgd,
  switchBtnBgdActive: switchBtnBgdActive,
  switchBtnBoxShadow: switchBtnBoxShadow,
  switchBtnBorderRadius: switchBtnBorderRadius,
  switchBtnWidth: switchBtnWidth,
  switchBtnHeight: switchBtnHeight,
  switchLabelMargin: switchLabelMargin,

  secondarySwitchTrackBgd: secondarySwitchTrackBgd,
  secondarySwitchBtnBgd: secondarySwitchBtnBgd,

  // Checkbox
  checkboxWidth: checkboxWidth,
  checkboxHeight: checkboxHeight,
  checkboxMargin: checkboxMargin,
  checkboxBorderColor: checkboxBorderColor,
  checkboxBorderRadius: checkboxBorderRadius,
  checkboxBorderColorLT: checkboxBorderColorLT,
  checkboxBoxBgd: checkboxBoxBgd,
  checkboxBoxBgdChecked: checkboxBoxBgdChecked,

  // Button
  primaryBtnBgd: primaryBtnBgd,
  primaryBtnActBgd: primaryBtnActBgd,
  primaryBtnColor: primaryBtnColor,
  primaryBtnActColor: primaryBtnActColor,
  primaryBtnBgdHover: primaryBtnBgdHover,
  primaryBtnRadius: primaryBtnRadius,
  secondaryBtnBgd: secondaryBtnBgd,
  secondaryBtnActBgd: secondaryBtnActBgd,
  secondaryBtnBgdHover: secondaryBtnBgdHover,
  secondaryBtnColor: secondaryBtnColor,
  secondaryBtnActColor: secondaryBtnActColor,

  negativeBtnBgd: negativeBtnBgd,
  negativeBtnActBgd: negativeBtnActBgd,
  negativeBtnBgdHover: negativeBtnBgdHover,
  negativeBtnColor: negativeBtnColor,
  negativeBtnActColor: negativeBtnActColor,

  linkBtnBgd: linkBtnBgd,
  linkBtnActBgd: linkBtnActBgd,
  linkBtnColor: linkBtnColor,
  linkBtnActColor: linkBtnActColor,
  linkBtnActBgdHover: linkBtnActBgdHover,

  // Modal
  modalTitleColor: modalTitleColor,
  modalTitleFontSize: modalTitleFontSize,
  modalFooterBgd: modalFooterBgd,
  modalImagePlaceHolder: modalImagePlaceHolder,

  modalDialogBgd: modalDialogBgd,
  modalDialogColor: modalDialogColor,

  // Side Panel
  sidePanelBg: sidePanelBg,

  sideBarCloseBtnBgd: sideBarCloseBtnBgd,
  sideBarCloseBtnColor: sideBarCloseBtnColor,
  sideBarCloseBtnBgdHover: sideBarCloseBtnBgdHover,
  sidePanelHeaderBg: sidePanelHeaderBg,

  // Side Panel Panel
  panelActiveBg: panelActiveBg,
  panelBackground: panelBackground,
  panelBackgroundHover: panelBackgroundHover,
  panelBackgroundLT: panelBackgroundLT,
  panelBoxShadow: panelBoxShadow,
  panelBorderRadius: panelBorderRadius,
  panelBorder: panelBorder,
  panelBorderColor: panelBorderColor,
  panelBorderLT: panelBorderLT,
  panelHeaderIcon: panelHeaderIcon,
  panelHeaderIconActive: panelHeaderIconActive,
  panelHeaderHeight: panelHeaderHeight,
  panelDropdownScrollBar: panelDropdownScrollBar,

  // Text
  textColor: textColor,
  textColorLT: textColorLT,
  textColorHl: textColorHl,
  titleTextColor: titleTextColor,
  subtextColor: subtextColor,
  subtextColorLT: subtextColorLT,
  subtextColorActive: subtextColorActive,
  textTruncate: textTruncate,
  titleColorLT: titleColorLT,
  tooltipBg: tooltipBg,
  tooltipColor: tooltipColor,

  // Slider
  sliderBarColor: sliderBarColor,
  sliderBarBgd: sliderBarBgd,
  sliderBarHoverColor: sliderBarHoverColor,
  sliderBarRadius: sliderBarRadius,
  sliderBarHeight: sliderBarHeight,
  sliderHandleHeight: sliderHandleHeight,
  sliderHandleWidth: sliderHandleWidth,
  sliderHandleColor: sliderHandleColor,
  sliderHandleHoverColor: sliderHandleHoverColor,
  sliderHandleShadow: sliderHandleShadow,

  // Plot
  rangeBrushBgd: rangeBrushBgd
});

var themeLT = exports.themeLT = (0, _extends3.default)({}, theme, {

  // template
  input: inputLT,
  panelActiveBg: panelActiveBgLT,
  textColor: textColorLT,
  textColorHl: textColorHlLT
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zdHlsZXMvYmFzZS5qcyJdLCJuYW1lcyI6WyJ0cmFuc2l0aW9uIiwidHJhbnNpdGlvbkZhc3QiLCJ0cmFuc2l0aW9uU2xvdyIsImJveFNoYWRvdyIsImJveFNpemluZyIsImJvcmRlclJhZGl1cyIsImJvcmRlckNvbG9yIiwiYm9yZGVyQ29sb3JMaWdodCIsImxhYmVsQ29sb3IiLCJsYWJlbEhvdmVyQ29sb3IiLCJsYWJlbENvbG9yTFQiLCJ0ZXh0Q29sb3IiLCJ0ZXh0Q29sb3JMVCIsInRpdGxlQ29sb3JMVCIsInN1YnRleHRDb2xvciIsInN1YnRleHRDb2xvckxUIiwic3VidGV4dENvbG9yQWN0aXZlIiwidGl0bGVUZXh0Q29sb3IiLCJ0ZXh0Q29sb3JIbCIsInRleHRDb2xvckhsTFQiLCJhY3RpdmVDb2xvciIsImFjdGl2ZUNvbG9ySG92ZXIiLCJlcnJvckNvbG9yIiwicHJpbWFyeUJ0bkJnZCIsInByaW1hcnlCdG5BY3RCZ2QiLCJwcmltYXJ5QnRuQ29sb3IiLCJwcmltYXJ5QnRuQWN0Q29sb3IiLCJwcmltYXJ5QnRuQmdkSG92ZXIiLCJwcmltYXJ5QnRuUmFkaXVzIiwic2Vjb25kYXJ5QnRuQmdkIiwic2Vjb25kYXJ5QnRuQWN0QmdkIiwic2Vjb25kYXJ5QnRuQ29sb3IiLCJzZWNvbmRhcnlCdG5BY3RDb2xvciIsInNlY29uZGFyeUJ0bkJnZEhvdmVyIiwibGlua0J0bkJnZCIsImxpbmtCdG5BY3RCZ2QiLCJsaW5rQnRuQ29sb3IiLCJsaW5rQnRuQWN0Q29sb3IiLCJsaW5rQnRuQWN0QmdkSG92ZXIiLCJuZWdhdGl2ZUJ0bkJnZCIsIm5lZ2F0aXZlQnRuQWN0QmdkIiwibmVnYXRpdmVCdG5CZ2RIb3ZlciIsIm5lZ2F0aXZlQnRuQ29sb3IiLCJuZWdhdGl2ZUJ0bkFjdENvbG9yIiwiaW5wdXRCb3hIZWlnaHQiLCJpbnB1dFBhZGRpbmciLCJpbnB1dEZvbnRTaXplIiwiaW5wdXRGb250V2VpZ2h0IiwiaW5wdXRCZ2QiLCJpbnB1dEJnZEhvdmVyIiwiaW5wdXRCZ2RBY3RpdmUiLCJpbnB1dEJvcmRlckNvbG9yIiwiaW5wdXRCb3JkZXJIb3ZlckNvbG9yIiwiaW5wdXRCb3JkZXJBY3RpdmVDb2xvciIsImlucHV0Q29sb3IiLCJpbnB1dEJvcmRlclJhZGl1cyIsImlucHV0UGxhY2Vob2xkZXJDb2xvciIsImlucHV0UGxhY2Vob2xkZXJGb250V2VpZ2h0Iiwic2Vjb25kYXJ5SW5wdXRIZWlnaHQiLCJzZWNvbmRhcnlJbnB1dEJnZCIsInNlY29uZGFyeUlucHV0QmdkSG92ZXIiLCJzZWNvbmRhcnlJbnB1dEJnZEFjdGl2ZSIsInNlY29uZGFyeUlucHV0Q29sb3IiLCJzZWNvbmRhcnlJbnB1dEJvcmRlckNvbG9yIiwic2Vjb25kYXJ5SW5wdXRCb3JkZXJBY3RpdmVDb2xvciIsInNlbGVjdENvbG9yIiwic2VsZWN0Q29sb3JMVCIsInNlbGVjdEFjdGl2ZUJvcmRlckNvbG9yIiwic2VsZWN0Rm9udFNpemUiLCJzZWxlY3RGb250V2VpZ2h0Iiwic2VsZWN0Rm9udFdlaWdodEJvbGQiLCJzZWxlY3RDb2xvclBsYWNlSG9sZGVyIiwic2VsZWN0QmFja2dyb3VuZCIsInNlbGVjdEJhY2tncm91bmRIb3ZlciIsInNlbGVjdEJhY2tncm91bmRMVCIsInNlbGVjdEJhY2tncm91bmRIb3ZlckxUIiwic2VsZWN0Qm9yZGVyQ29sb3IiLCJzZWxlY3RCb3JkZXJDb2xvckxUIiwic2VsZWN0Qm9yZGVyUmFkaXVzIiwic2VsZWN0Qm9yZGVyIiwiZHJvcGRvd25MaXN0SGlnaGxpZ2h0QmciLCJkcm9wZG93bkxpc3RTaGFkb3ciLCJkcm9wZG93bkxpc3RCZ2QiLCJkcm9wZG93bkxpc3RCb3JkZXJUb3AiLCJzd2l0Y2hXaWR0aCIsInN3aXRjaEhlaWdodCIsInN3aXRjaExhYmVsTWFyZ2luIiwic3dpdGNoVHJhY2tCZ2QiLCJzd2l0Y2hUcmFja0JnZEFjdGl2ZSIsInN3aXRjaFRyYWNrQm9yZGVyUmFkaXVzIiwic3dpdGNoQnRuQmdkIiwic3dpdGNoQnRuQmdkQWN0aXZlIiwic3dpdGNoQnRuQm94U2hhZG93Iiwic3dpdGNoQnRuQm9yZGVyUmFkaXVzIiwic3dpdGNoQnRuV2lkdGgiLCJzd2l0Y2hCdG5IZWlnaHQiLCJzZWNvbmRhcnlTd2l0Y2hUcmFja0JnZCIsInNlY29uZGFyeVN3aXRjaEJ0bkJnZCIsImNoZWNrYm94V2lkdGgiLCJjaGVja2JveEhlaWdodCIsImNoZWNrYm94TWFyZ2luIiwiY2hlY2tib3hCb3JkZXJDb2xvciIsImNoZWNrYm94Qm9yZGVyUmFkaXVzIiwiY2hlY2tib3hCb3JkZXJDb2xvckxUIiwiY2hlY2tib3hCb3hCZ2QiLCJjaGVja2JveEJveEJnZENoZWNrZWQiLCJzaWRlUGFuZWxIZWFkZXJCZyIsInNpZGVQYW5lbEJnIiwic2lkZUJhckNsb3NlQnRuQmdkIiwic2lkZUJhckNsb3NlQnRuQ29sb3IiLCJzaWRlQmFyQ2xvc2VCdG5CZ2RIb3ZlciIsInBhbmVsQmFja2dyb3VuZCIsInBhbmVsQmFja2dyb3VuZEhvdmVyIiwicGFuZWxBY3RpdmVCZyIsInBhbmVsQWN0aXZlQmdMVCIsInBhbmVsSGVhZGVySWNvbiIsInBhbmVsSGVhZGVySWNvbkFjdGl2ZSIsInBhbmVsSGVhZGVySGVpZ2h0IiwicGFuZWxCb3hTaGFkb3ciLCJwYW5lbEJvcmRlclJhZGl1cyIsInBhbmVsQmFja2dyb3VuZExUIiwicGFuZWxCb3JkZXJDb2xvciIsInBhbmVsQm9yZGVyIiwicGFuZWxCb3JkZXJMVCIsIm1hcFBhbmVsQmFja2dyb3VuZENvbG9yIiwibWFwUGFuZWxIZWFkZXJCYWNrZ3JvdW5kQ29sb3IiLCJ0b29sdGlwQmciLCJ0b29sdGlwQ29sb3IiLCJtb2RhbFRpdGxlQ29sb3IiLCJtb2RhbFRpdGxlRm9udFNpemUiLCJtb2RhbEZvb3RlckJnZCIsIm1vZGFsSW1hZ2VQbGFjZUhvbGRlciIsIm1vZGFsRGlhbG9nQmdkIiwibW9kYWxEaWFsb2dDb2xvciIsInNsaWRlckJhckNvbG9yIiwic2xpZGVyQmFyQmdkIiwic2xpZGVyQmFySG92ZXJDb2xvciIsInNsaWRlckJhclJhZGl1cyIsInNsaWRlckJhckhlaWdodCIsInNsaWRlckhhbmRsZUhlaWdodCIsInNsaWRlckhhbmRsZVdpZHRoIiwic2xpZGVySGFuZGxlQ29sb3IiLCJzbGlkZXJIYW5kbGVIb3ZlckNvbG9yIiwic2xpZGVySGFuZGxlU2hhZG93IiwicmFuZ2VCcnVzaEJnZCIsInRleHRUcnVuY2F0ZSIsIm1heFdpZHRoIiwib3ZlcmZsb3ciLCJ0ZXh0T3ZlcmZsb3ciLCJ3aGl0ZVNwYWNlIiwid29yZFdyYXAiLCJpbnB1dCIsImNzcyIsInByb3BzIiwidGhlbWUiLCJhY3RpdmUiLCJlcnJvciIsImRpc2FibGVkIiwidHlwZSIsImlucHV0TFQiLCJpbmNsdWRlcyIsInNlY29uZGFyeUlucHV0IiwiY2hpY2tsZXRlZElucHV0IiwiaW5saW5lSW5wdXQiLCJzd2l0Y2hUcmFjayIsImNoZWNrZWQiLCJzd2l0Y2hCdXR0b24iLCJpbnB1dFN3aXRjaCIsImNoZWNrYm94Qm94IiwiY2hlY2tib3hDaGVjayIsImlucHV0Q2hlY2tib3giLCJzZWNvbmRhcnlTd2l0Y2giLCJkcm9wZG93blNjcm9sbEJhciIsImRyb3Bkb3duTGlzdEFuY2hvciIsImRyb3Bkb3duTGlzdEl0ZW0iLCJkcm9wZG93bkxpc3RIZWFkZXIiLCJkcm9wZG93bkxpc3RTZWN0aW9uIiwiZHJvcGRvd25MaXN0Iiwic2lkZVBhbmVsU2Nyb2xsQmFyIiwicGFuZWxEcm9wZG93blNjcm9sbEJhciIsInNjcm9sbEJhciIsIm1vZGFsU2Nyb2xsQmFyIiwiRElNRU5TSU9OUyIsInRoZW1lTFQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7b3ZDQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUNBOzs7O0FBRU8sSUFBTUEsa0NBQWEsY0FBbkI7QUFDQSxJQUFNQywwQ0FB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ZXIgVGVjaG5vbG9naWVzLCBJbmMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuLy8gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuLy8gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuLy8gdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuLy8gY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4vLyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4vLyBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4vLyBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbi8vIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuLy8gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuLy8gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbi8vIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbi8vIFRIRSBTT0ZUV0FSRS5cblxuaW1wb3J0IHtjc3N9IGZyb20gJ3N0eWxlZC1jb21wb25lbnRzJztcbmltcG9ydCB7RElNRU5TSU9OU30gZnJvbSAnY29uc3RhbnRzL2RlZmF1bHQtc2V0dGluZ3MnO1xuXG5leHBvcnQgY29uc3QgdHJhbnNpdGlvbiA9ICdhbGwgLjRzIGVhc2UnO1xuZXhwb3J0IGNvbnN0IHRyYW5zaXRpb25GYXN0ID0gJ2FsbCAuMnMgZWFzZSc7XG5leHBvcnQgY29uc3QgdHJhbnNpdGlvblNsb3cgPSAnYWxsIC44cyBlYXNlJztcblxuZXhwb3J0IGNvbnN0IGJveFNoYWRvdyA9ICcwIDFweCAycHggMCByZ2JhKDAsMCwwLDAuMTApJztcbmV4cG9ydCBjb25zdCBib3hTaXppbmcgPSAnYm9yZGVyLWJveCc7XG5leHBvcnQgY29uc3QgYm9yZGVyUmFkaXVzID0gJzFweCc7XG5leHBvcnQgY29uc3QgYm9yZGVyQ29sb3IgPSAnIzNBNDE0Qyc7XG5leHBvcnQgY29uc3QgYm9yZGVyQ29sb3JMaWdodCA9ICcjRjFGMUYxJztcblxuLy8gVEVYVFxuZXhwb3J0IGNvbnN0IGxhYmVsQ29sb3IgPSAnIzZBNzQ4NSc7XG5leHBvcnQgY29uc3QgbGFiZWxIb3ZlckNvbG9yID0gJyNDNkM2QzYnO1xuZXhwb3J0IGNvbnN0IGxhYmVsQ29sb3JMVCA9ICcjNkE3NDg1JztcblxuZXhwb3J0IGNvbnN0IHRleHRDb2xvciA9ICcjQTBBN0I0JztcbmV4cG9ydCBjb25zdCB0ZXh0Q29sb3JMVCA9ICcjM0E0MTRDJztcbmV4cG9ydCBjb25zdCB0aXRsZUNvbG9yTFQgPSAnIzI5MzIzQyc7XG5cbmV4cG9ydCBjb25zdCBzdWJ0ZXh0Q29sb3IgPSAnIzZBNzQ4NSc7XG5leHBvcnQgY29uc3Qgc3VidGV4dENvbG9yTFQgPSAnI0EwQTdCNCc7XG5leHBvcnQgY29uc3Qgc3VidGV4dENvbG9yQWN0aXZlID0gJyNGRkZGRkYnO1xuXG5leHBvcnQgY29uc3QgdGl0bGVUZXh0Q29sb3IgPSAnI0ZGRkZGRic7XG5leHBvcnQgY29uc3QgdGV4dENvbG9ySGwgPSAnI0QzRDhFMCc7XG5leHBvcnQgY29uc3QgdGV4dENvbG9ySGxMVCA9ICcjRjFGMUYxJztcbmV4cG9ydCBjb25zdCBhY3RpdmVDb2xvciA9ICcjMUZCQUQ2JztcbmV4cG9ydCBjb25zdCBhY3RpdmVDb2xvckhvdmVyID0gJyMxMDgxODgnO1xuZXhwb3J0IGNvbnN0IGVycm9yQ29sb3IgPSAnI0Y5MDQyQyc7XG5cbi8vIEJ1dHRvblxuZXhwb3J0IGNvbnN0IHByaW1hcnlCdG5CZ2QgPSAnIzBGOTY2OCc7XG5leHBvcnQgY29uc3QgcHJpbWFyeUJ0bkFjdEJnZCA9ICcjMTNCMTdCJztcbmV4cG9ydCBjb25zdCBwcmltYXJ5QnRuQ29sb3IgPSAnI0ZGRkZGRic7XG5leHBvcnQgY29uc3QgcHJpbWFyeUJ0bkFjdENvbG9yID0gJyNGRkZGRkYnO1xuZXhwb3J0IGNvbnN0IHByaW1hcnlCdG5CZ2RIb3ZlciA9ICcjMTNCMTdCJztcbmV4cG9ydCBjb25zdCBwcmltYXJ5QnRuUmFkaXVzID0gJzJweCc7XG5cbmV4cG9ydCBjb25zdCBzZWNvbmRhcnlCdG5CZ2QgPSAnIzZBNzQ4NSc7XG5leHBvcnQgY29uc3Qgc2Vjb25kYXJ5QnRuQWN0QmdkID0gJyNBMEE3QjQnO1xuZXhwb3J0IGNvbnN0IHNlY29uZGFyeUJ0bkNvbG9yID0gJyNGRkZGRkYnO1xuZXhwb3J0IGNvbnN0IHNlY29uZGFyeUJ0bkFjdENvbG9yID0gJyNGRkZGRkYnO1xuZXhwb3J0IGNvbnN0IHNlY29uZGFyeUJ0bkJnZEhvdmVyID0gJyNBMEE3QjQnO1xuXG5leHBvcnQgY29uc3QgbGlua0J0bkJnZCA9ICd0cmFuc3BhcmVudCc7XG5leHBvcnQgY29uc3QgbGlua0J0bkFjdEJnZCA9IGxpbmtCdG5CZ2Q7XG5leHBvcnQgY29uc3QgbGlua0J0bkNvbG9yID0gJyNBMEE3QjQnO1xuZXhwb3J0IGNvbnN0IGxpbmtCdG5BY3RDb2xvciA9ICcjM0E0MTRDJztcbmV4cG9ydCBjb25zdCBsaW5rQnRuQWN0QmdkSG92ZXIgPSBsaW5rQnRuQmdkO1xuXG5leHBvcnQgY29uc3QgbmVnYXRpdmVCdG5CZ2QgPSBlcnJvckNvbG9yO1xuZXhwb3J0IGNvbnN0IG5lZ2F0aXZlQnRuQWN0QmdkID0gJyNGRjE5M0UnO1xuZXhwb3J0IGNvbnN0IG5lZ2F0aXZlQnRuQmdkSG92ZXIgPSAnI0ZGMTkzRSc7XG5leHBvcnQgY29uc3QgbmVnYXRpdmVCdG5Db2xvciA9ICcjRkZGRkZGJztcbmV4cG9ydCBjb25zdCBuZWdhdGl2ZUJ0bkFjdENvbG9yID0gJyNGRkZGRkYnO1xuXG4vLyBJbnB1dFxuZXhwb3J0IGNvbnN0IGlucHV0Qm94SGVpZ2h0ID0gJzM0cHgnO1xuZXhwb3J0IGNvbnN0IGlucHV0UGFkZGluZyA9ICc0cHggMTBweCc7XG5leHBvcnQgY29uc3QgaW5wdXRGb250U2l6ZSA9ICcxMXB4JztcbmV4cG9ydCBjb25zdCBpbnB1dEZvbnRXZWlnaHQgPSA1MDA7XG5leHBvcnQgY29uc3QgaW5wdXRCZ2QgPSAnIzI5MzIzQyc7XG5leHBvcnQgY29uc3QgaW5wdXRCZ2RIb3ZlciA9ICcjM0E0MTRDJztcbmV4cG9ydCBjb25zdCBpbnB1dEJnZEFjdGl2ZSA9ICcjM0E0MTRDJztcbmV4cG9ydCBjb25zdCBpbnB1dEJvcmRlckNvbG9yID0gJyMyOTMyM0MnO1xuZXhwb3J0IGNvbnN0IGlucHV0Qm9yZGVySG92ZXJDb2xvciA9ICcjM0E0MTRDJztcbmV4cG9ydCBjb25zdCBpbnB1dEJvcmRlckFjdGl2ZUNvbG9yID0gJyNEM0Q4RTAnO1xuZXhwb3J0IGNvbnN0IGlucHV0Q29sb3IgPSAnI0EwQTdCNCc7XG5leHBvcnQgY29uc3QgaW5wdXRCb3JkZXJSYWRpdXMgPSAnMXB4JztcbmV4cG9ydCBjb25zdCBpbnB1dFBsYWNlaG9sZGVyQ29sb3IgPSAnIzZBNzQ4NSc7XG5leHBvcnQgY29uc3QgaW5wdXRQbGFjZWhvbGRlckZvbnRXZWlnaHQgPSA0MDA7XG5cbmV4cG9ydCBjb25zdCBzZWNvbmRhcnlJbnB1dEhlaWdodCA9ICcyOHB4JztcbmV4cG9ydCBjb25zdCBzZWNvbmRhcnlJbnB1dEJnZCA9ICcjMjQyNzMwJztcbmV4cG9ydCBjb25zdCBzZWNvbmRhcnlJbnB1dEJnZEhvdmVyID0gJyMzQTQxNEMnO1xuZXhwb3J0IGNvbnN0IHNlY29uZGFyeUlucHV0QmdkQWN0aXZlID0gJyMzQTQxNEMnO1xuZXhwb3J0IGNvbnN0IHNlY29uZGFyeUlucHV0Q29sb3IgPSAnI0EwQTdCNCc7XG5leHBvcnQgY29uc3Qgc2Vjb25kYXJ5SW5wdXRCb3JkZXJDb2xvciA9ICcjMjQyNzMwJztcbmV4cG9ydCBjb25zdCBzZWNvbmRhcnlJbnB1dEJvcmRlckFjdGl2ZUNvbG9yID0gJyNEM0Q4RTAnO1xuXG4vLyBTZWxlY3RcbmV4cG9ydCBjb25zdCBzZWxlY3RDb2xvciA9IGlucHV0Q29sb3I7XG5leHBvcnQgY29uc3Qgc2VsZWN0Q29sb3JMVCA9IHRpdGxlQ29sb3JMVDtcblxuZXhwb3J0IGNvbnN0IHNlbGVjdEFjdGl2ZUJvcmRlckNvbG9yID0gJyNEM0Q4RTAnO1xuZXhwb3J0IGNvbnN0IHNlbGVjdEZvbnRTaXplID0gJzExcHgnO1xuZXhwb3J0IGNvbnN0IHNlbGVjdEZvbnRXZWlnaHQgPSAnNDAwJztcbmV4cG9ydCBjb25zdCBzZWxlY3RGb250V2VpZ2h0Qm9sZCA9ICc1MDAnO1xuXG5leHBvcnQgY29uc3Qgc2VsZWN0Q29sb3JQbGFjZUhvbGRlciA9ICcjNkE3NDg1JztcbmV4cG9ydCBjb25zdCBzZWxlY3RCYWNrZ3JvdW5kID0gaW5wdXRCZ2Q7XG5leHBvcnQgY29uc3Qgc2VsZWN0QmFja2dyb3VuZEhvdmVyID0gaW5wdXRCZ2RIb3ZlcjtcbmV4cG9ydCBjb25zdCBzZWxlY3RCYWNrZ3JvdW5kTFQgPSAnI0ZGRkZGRic7XG5leHBvcnQgY29uc3Qgc2VsZWN0QmFja2dyb3VuZEhvdmVyTFQgPSAnI0Y4RjhGOSc7XG5leHBvcnQgY29uc3Qgc2VsZWN0Qm9yZGVyQ29sb3IgPSAnI0QzRDhFMCc7XG5leHBvcnQgY29uc3Qgc2VsZWN0Qm9yZGVyQ29sb3JMVCA9ICcjRDNEOEUwJztcbmV4cG9ydCBjb25zdCBzZWxlY3RCb3JkZXJSYWRpdXMgPSAnMXB4JztcbmV4cG9ydCBjb25zdCBzZWxlY3RCb3JkZXIgPSAwO1xuXG5leHBvcnQgY29uc3QgZHJvcGRvd25MaXN0SGlnaGxpZ2h0QmcgPSAnIzZBNzQ4NSc7XG5leHBvcnQgY29uc3QgZHJvcGRvd25MaXN0U2hhZG93ID0gJzAgNnB4IDEycHggMCByZ2JhKDAsMCwwLDAuMTYpJztcbmV4cG9ydCBjb25zdCBkcm9wZG93bkxpc3RCZ2QgPSAnIzNBNDE0Qyc7XG5leHBvcnQgY29uc3QgZHJvcGRvd25MaXN0Qm9yZGVyVG9wID0gJyMyNDI3MzAnO1xuXG4vLyBTd2l0Y2hcbmV4cG9ydCBjb25zdCBzd2l0Y2hXaWR0aCA9IDI0O1xuZXhwb3J0IGNvbnN0IHN3aXRjaEhlaWdodCA9IDEyO1xuZXhwb3J0IGNvbnN0IHN3aXRjaExhYmVsTWFyZ2luID0gMTI7XG5cbmV4cG9ydCBjb25zdCBzd2l0Y2hUcmFja0JnZCA9ICcjMjkzMjNDJztcbmV4cG9ydCBjb25zdCBzd2l0Y2hUcmFja0JnZEFjdGl2ZSA9IGFjdGl2ZUNvbG9yO1xuZXhwb3J0IGNvbnN0IHN3aXRjaFRyYWNrQm9yZGVyUmFkaXVzID0gJzFweCc7XG5leHBvcnQgY29uc3Qgc3dpdGNoQnRuQmdkID0gJyM2QTc0ODUnO1xuZXhwb3J0IGNvbnN0IHN3aXRjaEJ0bkJnZEFjdGl2ZSA9ICcjRDNEOEUwJztcbmV4cG9ydCBjb25zdCBzd2l0Y2hCdG5Cb3hTaGFkb3cgPSAnMCAycHggNHB4IDAgcmdiYSgwLDAsMCwwLjQwKSc7XG5leHBvcnQgY29uc3Qgc3dpdGNoQnRuQm9yZGVyUmFkaXVzID0gJzFweCc7XG5leHBvcnQgY29uc3Qgc3dpdGNoQnRuV2lkdGggPSAnMTJweCc7XG5leHBvcnQgY29uc3Qgc3dpdGNoQnRuSGVpZ2h0ID0gJzEycHgnO1xuXG5leHBvcnQgY29uc3Qgc2Vjb25kYXJ5U3dpdGNoVHJhY2tCZ2QgPSAnIzI0MjczMCc7XG5leHBvcnQgY29uc3Qgc2Vjb25kYXJ5U3dpdGNoQnRuQmdkID0gJyMzQTQxNEMnO1xuXG4vLyBDaGVja2JveFxuZXhwb3J0IGNvbnN0IGNoZWNrYm94V2lkdGggPSAxNjtcbmV4cG9ydCBjb25zdCBjaGVja2JveEhlaWdodCA9IDE2O1xuZXhwb3J0IGNvbnN0IGNoZWNrYm94TWFyZ2luID0gMTI7XG5leHBvcnQgY29uc3QgY2hlY2tib3hCb3JkZXJDb2xvciA9IHNlbGVjdEJvcmRlckNvbG9yO1xuZXhwb3J0IGNvbnN0IGNoZWNrYm94Qm9yZGVyUmFkaXVzID0gJzJweCc7XG5leHBvcnQgY29uc3QgY2hlY2tib3hCb3JkZXJDb2xvckxUID0gc2VsZWN0Qm9yZGVyQ29sb3JMVDtcbmV4cG9ydCBjb25zdCBjaGVja2JveEJveEJnZCA9ICd3aGl0ZSc7XG5leHBvcnQgY29uc3QgY2hlY2tib3hCb3hCZ2RDaGVja2VkID0gcHJpbWFyeUJ0bkJnZDtcblxuLy8gU2lkZSBQYW5lbFxuZXhwb3J0IGNvbnN0IHNpZGVQYW5lbEhlYWRlckJnID0gJyMyOTMyM0MnO1xuZXhwb3J0IGNvbnN0IHNpZGVQYW5lbEJnID0gJyMyNDI3MzAnO1xuZXhwb3J0IGNvbnN0IHNpZGVCYXJDbG9zZUJ0bkJnZCA9IHNlY29uZGFyeUJ0bkJnZDtcbmV4cG9ydCBjb25zdCBzaWRlQmFyQ2xvc2VCdG5Db2xvciA9ICcjMjkzMjNDJztcbmV4cG9ydCBjb25zdCBzaWRlQmFyQ2xvc2VCdG5CZ2RIb3ZlciA9IHNlY29uZGFyeUJ0bkFjdEJnZDtcblxuZXhwb3J0IGNvbnN0IHBhbmVsQmFja2dyb3VuZCA9ICcjMjkzMjNDJztcbmV4cG9ydCBjb25zdCBwYW5lbEJhY2tncm91bmRIb3ZlciA9ICcjM0E0NTUyJztcbmV4cG9ydCBjb25zdCBwYW5lbEFjdGl2ZUJnID0gJyMzQTQ1NTInO1xuZXhwb3J0IGNvbnN0IHBhbmVsQWN0aXZlQmdMVCA9ICcjNkE3NDg1JztcbmV4cG9ydCBjb25zdCBwYW5lbEhlYWRlckljb24gPSAnIzZBNzQ4NSc7XG5leHBvcnQgY29uc3QgcGFuZWxIZWFkZXJJY29uQWN0aXZlID0gJyNBMEE3QjQnO1xuZXhwb3J0IGNvbnN0IHBhbmVsSGVhZGVySGVpZ2h0ID0gNDg7XG5leHBvcnQgY29uc3QgcGFuZWxCb3hTaGFkb3cgPSAnMCA2cHggMTJweCAwIHJnYmEoMCwwLDAsMC4xNiknO1xuZXhwb3J0IGNvbnN0IHBhbmVsQm9yZGVyUmFkaXVzID0gJzJweCc7XG5leHBvcnQgY29uc3QgcGFuZWxCYWNrZ3JvdW5kTFQgPSAnI2Y4ZjhmOSc7XG5cbmV4cG9ydCBjb25zdCBwYW5lbEJvcmRlckNvbG9yID0gJyMzQTQxNEMnO1xuZXhwb3J0IGNvbnN0IHBhbmVsQm9yZGVyID0gYDFweCBzb2xpZCAke2JvcmRlckNvbG9yfWA7XG5leHBvcnQgY29uc3QgcGFuZWxCb3JkZXJMVCA9IGAxcHggc29saWQgJHtib3JkZXJDb2xvckxpZ2h0fWA7XG5cbmV4cG9ydCBjb25zdCBtYXBQYW5lbEJhY2tncm91bmRDb2xvciA9ICcjMjQyNzMwJztcbmV4cG9ydCBjb25zdCBtYXBQYW5lbEhlYWRlckJhY2tncm91bmRDb2xvciA9ICcjMjkzMjNDJztcbmV4cG9ydCBjb25zdCB0b29sdGlwQmcgPSAnI0Y4RjhGOSc7XG5leHBvcnQgY29uc3QgdG9vbHRpcENvbG9yID0gJyMzMzMzMzQnO1xuXG4vLyBNb2RhbFxuZXhwb3J0IGNvbnN0IG1vZGFsVGl0bGVDb2xvciA9ICcjM0E0MTRDJztcbmV4cG9ydCBjb25zdCBtb2RhbFRpdGxlRm9udFNpemUgPSAnMjRweCc7XG5leHBvcnQgY29uc3QgbW9kYWxGb290ZXJCZ2QgPSAnI0Y4RjhGOSc7XG5leHBvcnQgY29uc3QgbW9kYWxJbWFnZVBsYWNlSG9sZGVyID0gJyNERERGRTMnO1xuXG4vLyBNb2RhbCBEaWFsb2cgKERhcmspXG5leHBvcnQgY29uc3QgbW9kYWxEaWFsb2dCZ2QgPSAnIzNBNDE0Qyc7XG5leHBvcnQgY29uc3QgbW9kYWxEaWFsb2dDb2xvciA9IHRleHRDb2xvckhsO1xuXG4vLyBTbGlkZXJcbmV4cG9ydCBjb25zdCBzbGlkZXJCYXJDb2xvciA9ICcjNkE3NDg1JztcbmV4cG9ydCBjb25zdCBzbGlkZXJCYXJCZ2QgPSAnIzNBNDE0Qyc7XG5leHBvcnQgY29uc3Qgc2xpZGVyQmFySG92ZXJDb2xvciA9ICcjRDNEOEUwJztcbmV4cG9ydCBjb25zdCBzbGlkZXJCYXJSYWRpdXMgPSAnMXB4JztcbmV4cG9ydCBjb25zdCBzbGlkZXJCYXJIZWlnaHQgPSAnNHB4JztcbmV4cG9ydCBjb25zdCBzbGlkZXJIYW5kbGVIZWlnaHQgPSAnMTJweCc7XG5leHBvcnQgY29uc3Qgc2xpZGVySGFuZGxlV2lkdGggPSAnMTJweCc7XG5leHBvcnQgY29uc3Qgc2xpZGVySGFuZGxlQ29sb3IgPSAnI0QzRDhFMCc7XG5leHBvcnQgY29uc3Qgc2xpZGVySGFuZGxlSG92ZXJDb2xvciA9ICcjRkZGRkZGJztcbmV4cG9ydCBjb25zdCBzbGlkZXJIYW5kbGVTaGFkb3cgPSAnMCAycHggNHB4IDAgcmdiYSgwLDAsMCwwLjQwKSc7XG5cbi8vIFBsb3RcbmV4cG9ydCBjb25zdCByYW5nZUJydXNoQmdkID0gJyMzQTQxNEMnO1xuXG5leHBvcnQgY29uc3QgdGV4dFRydW5jYXRlID0ge1xuICBtYXhXaWR0aDogJzEwMCUnLFxuICBvdmVyZmxvdzogJ2hpZGRlbicsXG4gIHRleHRPdmVyZmxvdzogJ2VsbGlwc2lzJyxcbiAgd2hpdGVTcGFjZTogJ25vd3JhcCcsXG4gIHdvcmRXcmFwOiAnbm9ybWFsJ1xufTtcblxuLy8gdGhlbWUgaXMgcGFzc2VkIHRvIGtlcGxlci5nbCB3aGVuIGl0J3MgbW91bnRlZCxcbi8vIGl0IGlzIHVzZWQgYnkgc3R5bGVkLWNvbXBvbmVudHMgdG8gcGFzcyBhbG9uZyB0b1xuLy8gYWxsIGNoaWxkIGNvbXBvbmVudHNcblxuY29uc3QgaW5wdXQgPSBjc3NgXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGJhY2tncm91bmQtY29sb3I6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUuaW5wdXRCZ2R9O1xuICBib3JkZXI6IDFweCBzb2xpZFxuICAgICR7cHJvcHMgPT5cbiAgICAgIHByb3BzLmFjdGl2ZVxuICAgICAgICA/IHByb3BzLnRoZW1lLmlucHV0Qm9yZGVyQWN0aXZlQ29sb3JcbiAgICAgICAgOiBwcm9wcy5lcnJvciA/IHByb3BzLnRoZW1lLmVycm9yQ29sb3IgOiBwcm9wcy50aGVtZS5pbnB1dEJnZH07XG4gIGJvcmRlci1yYWRpdXM6IDJweDtcbiAgY2FyZXQtY29sb3I6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUuaW5wdXRCb3JkZXJBY3RpdmVDb2xvcn07XG4gIGNvbG9yOiAke3Byb3BzID0+IHByb3BzLnRoZW1lLmlucHV0Q29sb3J9O1xuICBkaXNwbGF5OiBmbGV4O1xuICBmb250LXNpemU6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUuaW5wdXRGb250U2l6ZX07XG4gIGZvbnQtd2VpZ2h0OiAke3Byb3BzID0+IHByb3BzLnRoZW1lLmlucHV0Rm9udFdlaWdodH07XG4gIGhlaWdodDogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5pbnB1dEJveEhlaWdodH07XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgb3V0bGluZTogbm9uZTtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgcGFkZGluZzogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5pbnB1dFBhZGRpbmd9O1xuICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcbiAgdHJhbnNpdGlvbjogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS50cmFuc2l0aW9ufTtcbiAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcbiAgd2lkdGg6IDEwMCU7XG4gIHdvcmQtd3JhcDogbm9ybWFsO1xuICBwb2ludGVyLWV2ZW50czogJHtwcm9wcyA9PiAocHJvcHMuZGlzYWJsZWQgPyAnbm9uZScgOiAnYWxsJyl9O1xuICBvcGFjaXR5OiAke3Byb3BzID0+IChwcm9wcy5kaXNhYmxlZCA/IDAuNSA6IDEpfTtcblxuICA6aG92ZXIge1xuICAgIGN1cnNvcjogJHtwcm9wcyA9PiBwcm9wcy50eXBlID09PSAnbnVtYmVyJyA/ICd0ZXh0JyA6ICdwb2ludGVyJ307XG4gICAgYmFja2dyb3VuZC1jb2xvcjogJHtwcm9wcyA9PlxuICAgICAgcHJvcHMuYWN0aXZlID8gcHJvcHMudGhlbWUuaW5wdXRCZ2RBY3RpdmUgOiBwcm9wcy50aGVtZS5pbnB1dEJnZEhvdmVyfTtcbiAgICBib3JkZXItY29sb3I6ICR7cHJvcHMgPT5cbiAgICAgIHByb3BzLmFjdGl2ZVxuICAgICAgICA/IHByb3BzLnRoZW1lLmlucHV0Qm9yZGVyQWN0aXZlQ29sb3JcbiAgICAgICAgOiBwcm9wcy50aGVtZS5pbnB1dEJvcmRlckhvdmVyQ29sb3J9O1xuICB9XG5cbiAgOmFjdGl2ZSxcbiAgOmZvY3VzLFxuICAmLmZvY3VzLFxuICAmLmFjdGl2ZSB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5pbnB1dEJnZEFjdGl2ZX07XG4gICAgYm9yZGVyLWNvbG9yOiAke3Byb3BzID0+IHByb3BzLnRoZW1lLmlucHV0Qm9yZGVyQWN0aXZlQ29sb3J9O1xuICB9XG5cbiAgOjpwbGFjZWhvbGRlciB7XG4gICAgY29sb3I6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUuaW5wdXRQbGFjZWhvbGRlckNvbG9yfTtcbiAgICBmb250LXdlaWdodDogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5pbnB1dFBsYWNlaG9sZGVyRm9udFdlaWdodH07XG4gIH1cblxuICAvKiBEaXNhYmxlIEFycm93cyBvbiBOdW1iZXIgSW5wdXRzICovXG4gIDo6LXdlYmtpdC1pbm5lci1zcGluLWJ1dHRvbixcbiAgOjotd2Via2l0LW91dGVyLXNwaW4tYnV0dG9uIHtcbiAgICAtd2Via2l0LWFwcGVhcmFuY2U6IG5vbmU7XG4gICAgbWFyZ2luOiAwO1xuICB9XG5gO1xuXG5jb25zdCBpbnB1dExUID0gY3NzYFxuICAke2lucHV0fVxuICBcbiAgYmFja2dyb3VuZC1jb2xvcjogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5zZWxlY3RCYWNrZ3JvdW5kTFR9O1xuICBib3JkZXI6IDFweCBzb2xpZFxuICAke3Byb3BzID0+XG4gICAgcHJvcHMuYWN0aXZlXG4gICAgICA/IHByb3BzLnRoZW1lLnNlbGVjdEFjdGl2ZUJvcmRlckNvbG9yXG4gICAgICA6IHByb3BzLmVycm9yXG4gICAgICA/IHByb3BzLnRoZW1lLmVycm9yQ29sb3JcbiAgICAgIDogcHJvcHMudGhlbWUuc2VsZWN0Qm9yZGVyQ29sb3JMVH07XG4gIGNvbG9yOiAke3Byb3BzID0+IHByb3BzLnRoZW1lLnNlbGVjdENvbG9yTFR9O1xuICBjYXJldC1jb2xvcjogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5zZWxlY3RDb2xvckxUfTtcblxuICA6Oi13ZWJraXQtaW5wdXQtcGxhY2Vob2xkZXIge1xuICAgIGNvbG9yOiAke3Byb3BzID0+IHByb3BzLnRoZW1lLnN1YnRleHRDb2xvckxUfTtcbiAgICBmb250LXdlaWdodDogNDAwO1xuICB9XG5cbiAgOmFjdGl2ZSxcbiAgOmZvY3VzLFxuICAmLmZvY3VzLFxuICAmLmFjdGl2ZSB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5zZWxlY3RCYWNrZ3JvdW5kTFR9O1xuICAgIGJvcmRlci1jb2xvcjogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS50ZXh0Q29sb3JMVH07XG4gIH1cblxuICA6aG92ZXIge1xuICAgIGJhY2tncm91bmQtY29sb3I6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUuc2VsZWN0QmFja2dyb3VuZExUfTtcbiAgICBjdXJzb3I6ICR7cHJvcHMgPT4gWydudW1iZXInLCAndGV4dCddLmluY2x1ZGVzKHByb3BzLnR5cGUpID8gJ3RleHQnIDogJ3BvaW50ZXInfTtcbiAgICBib3JkZXItY29sb3I6ICR7cHJvcHMgPT5cbiAgICBwcm9wcy5hY3RpdmVcbiAgICAgID8gcHJvcHMudGhlbWUudGV4dENvbG9yTFRcbiAgICAgIDogcHJvcHMudGhlbWUuc3VidGV4dENvbG9yfTtcbiAgfVxuYDtcblxuY29uc3Qgc2Vjb25kYXJ5SW5wdXQgPSBjc3NgXG4gICR7cHJvcHMgPT4gcHJvcHMudGhlbWUuaW5wdXR9IFxuICBjb2xvcjogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5zZWNvbmRhcnlJbnB1dENvbG9yfTtcbiAgYmFja2dyb3VuZC1jb2xvcjogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5zZWNvbmRhcnlJbnB1dEJnZH07XG4gIGhlaWdodDogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5zZWNvbmRhcnlJbnB1dEhlaWdodH07XG4gIGJvcmRlcjogMXB4IHNvbGlkXG4gICAgJHtwcm9wcyA9PiBwcm9wcy5lcnJvclxuICAgICAgICAgID8gcHJvcHMudGhlbWUuZXJyb3JDb2xvclxuICAgICAgICAgIDogcHJvcHMudGhlbWUuc2Vjb25kYXJ5SW5wdXRCb3JkZXJDb2xvcn07XG5cbiAgOmhvdmVyIHtcbiAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5zZWNvbmRhcnlJbnB1dEJnZEhvdmVyfTtcbiAgICBib3JkZXItY29sb3I6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUuc2Vjb25kYXJ5SW5wdXRCZ2RIb3Zlcn07XG4gIH1cblxuICA6YWN0aXZlLFxuICAmLmFjdGl2ZSB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5zZWNvbmRhcnlJbnB1dEJnZEFjdGl2ZX07XG4gICAgYm9yZGVyLWNvbG9yOiAke3Byb3BzID0+IHByb3BzLnRoZW1lLnNlY29uZGFyeUlucHV0Qm9yZGVyQWN0aXZlQ29sb3J9O1xuICB9XG5gO1xuXG5jb25zdCBjaGlja2xldGVkSW5wdXQgPSBjc3NgXG4gICR7cHJvcHMgPT4gcHJvcHMudGhlbWUuc2Vjb25kYXJ5SW5wdXR9IFxuICBjdXJzb3I6IHBvaW50ZXI7XG4gIGZsZXgtd3JhcDogd3JhcDtcbiAgaGVpZ2h0OiBhdXRvO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHN0YXJ0O1xuICBtYXJnaW4tYm90dG9tOiAycHg7XG4gIHBhZGRpbmc6IDRweCA3cHggNHB4IDRweDtcbiAgd2hpdGUtc3BhY2U6IG5vcm1hbDtcbmA7XG5cbmNvbnN0IGlubGluZUlucHV0ID0gY3NzYFxuICAke3Byb3BzID0+IHByb3BzLnRoZW1lLmlucHV0fSBjb2xvcjogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS50ZXh0Q29sb3J9O1xuICBmb250LXNpemU6IDEzcHg7XG4gIGxldHRlci1zcGFjaW5nOiAwLjQzcHg7XG4gIGxpbmUtaGVpZ2h0OiAxOHB4O1xuICBoZWlnaHQ6IDI0cHg7XG4gIGZvbnQtd2VpZ2h0OiA0MDA7XG4gIHBhZGRpbmctbGVmdDogNHB4O1xuICBtYXJnaW4tbGVmdDogLTRweDtcbiAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XG4gIGJvcmRlcjogMXB4IHNvbGlkIHRyYW5zcGFyZW50O1xuXG4gIDpob3ZlciB7XG4gICAgaGVpZ2h0OiAyNHB4O1xuICAgIGN1cnNvcjogdGV4dDtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcbiAgICBib3JkZXI6IDFweCBzb2xpZCAke3Byb3BzID0+IHByb3BzLnRoZW1lLmxhYmVsQ29sb3J9O1xuICB9XG5cbiAgOmFjdGl2ZSxcbiAgLmFjdGl2ZSxcbiAgOmZvY3VzIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcbiAgICBib3JkZXI6IDFweCBzb2xpZCAke3Byb3BzID0+IHByb3BzLnRoZW1lLmlucHV0Qm9yZGVyQWN0aXZlQ29sb3J9O1xuICB9XG5gO1xuXG5jb25zdCBzd2l0Y2hUcmFjayA9IGNzc2BcbiAgYmFja2dyb3VuZDogJHtwcm9wcyA9PlxuICAgIHByb3BzLmNoZWNrZWRcbiAgICAgID8gcHJvcHMudGhlbWUuc3dpdGNoVHJhY2tCZ2RBY3RpdmVcbiAgICAgIDogcHJvcHMudGhlbWUuc3dpdGNoVHJhY2tCZ2R9O1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHRvcDogMDtcbiAgbGVmdDogJHtwcm9wcyA9PiAtcHJvcHMudGhlbWUuc3dpdGNoTGFiZWxNYXJnaW59cHg7XG4gIGNvbnRlbnQ6ICcnO1xuICBkaXNwbGF5OiBibG9jaztcbiAgd2lkdGg6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUuc3dpdGNoV2lkdGh9cHg7XG4gIGhlaWdodDogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5zd2l0Y2hIZWlnaHR9cHg7XG4gIGJvcmRlci1yYWRpdXM6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUuc3dpdGNoVHJhY2tCb3JkZXJSYWRpdXN9O1xuYDtcblxuY29uc3Qgc3dpdGNoQnV0dG9uID0gY3NzYFxuICB0cmFuc2l0aW9uOiAke3Byb3BzID0+IHByb3BzLnRoZW1lLnRyYW5zaXRpb259O1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHRvcDogMDtcbiAgbGVmdDogJHtwcm9wcyA9PiAocHJvcHMuY2hlY2tlZCA/IHByb3BzLnRoZW1lLnN3aXRjaFdpZHRoIC8gMiA6IC0xKSAtIHByb3BzLnRoZW1lLnN3aXRjaExhYmVsTWFyZ2lufXB4O1xuICBjb250ZW50OiAnJztcbiAgZGlzcGxheTogYmxvY2s7XG4gIGhlaWdodDogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5zd2l0Y2hCdG5IZWlnaHR9O1xuICB3aWR0aDogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5zd2l0Y2hCdG5XaWR0aH07XG4gIGJhY2tncm91bmQ6ICR7cHJvcHMgPT4gcHJvcHMuY2hlY2tlZCA/IFxuICBwcm9wcy50aGVtZS5zd2l0Y2hCdG5CZ2RBY3RpdmUgOiBwcm9wcy50aGVtZS5zd2l0Y2hCdG5CZ2R9O1xuICBib3gtc2hhZG93OiAke3Byb3BzID0+IHByb3BzLnRoZW1lLnN3aXRjaEJ0bkJveFNoYWRvd307XG5gO1xuXG5jb25zdCBpbnB1dFN3aXRjaCA9IGNzc2BcbiAgdXNlci1zZWxlY3Q6IG5vbmU7XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgbGluZS1oZWlnaHQ6IDA7XG4gIGZvbnQtd2VpZ2h0OiA1MDA7XG4gIGZvbnQtc2l6ZTogMTJweDtcbiAgY29sb3I6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUubGFiZWxDb2xvcn07XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICBwYWRkaW5nLXRvcDogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5zd2l0Y2hIZWlnaHQgLyAyfXB4O1xuICBwYWRkaW5nLXJpZ2h0OiAwO1xuICBwYWRkaW5nLWJvdHRvbTogMDtcbiAgcGFkZGluZy1sZWZ0OiAke3Byb3BzID0+IHByb3BzLnRoZW1lLnN3aXRjaFdpZHRofXB4O1xuXG4gIDpiZWZvcmUge1xuICAgICR7cHJvcHMgPT4gcHJvcHMudGhlbWUuc3dpdGNoVHJhY2t9O1xuICB9XG5cbiAgOmFmdGVyIHtcbiAgICAke3Byb3BzID0+IHByb3BzLnRoZW1lLnN3aXRjaEJ1dHRvbn07XG4gIH1cbmA7XG5cbi8vIFRoaXMgaXMgYSBsaWdodCB2ZXJzaW9uIGNoZWNrYm94XG5jb25zdCBjaGVja2JveEJveCA9IGNzc2BcbiAgZGlzcGxheTogYmxvY2s7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgdG9wOiAwO1xuICBsZWZ0OiAwO1xuICB3aWR0aDogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5jaGVja2JveFdpZHRofXB4O1xuICBoZWlnaHQ6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUuY2hlY2tib3hIZWlnaHR9cHg7XG4gIGJhY2tncm91bmQ6ICR7cHJvcHMgPT4gcHJvcHMuY2hlY2tlZCA/IHByb3BzLnRoZW1lLmNoZWNrYm94Qm94QmdkQ2hlY2tlZCA6IHByb3BzLnRoZW1lLmNoZWNrYm94Qm94QmdkfTtcbiAgYm9yZGVyOiAxcHggc29saWQgJHtwcm9wcyA9PiBwcm9wcy5jaGVja2VkID8gcHJvcHMudGhlbWUuY2hlY2tib3hCb3hCZ2RDaGVja2VkIDogcHJvcHMudGhlbWUuY2hlY2tib3hCb3JkZXJDb2xvcn07XG4gIGJvcmRlci1yYWRpdXM6IDJweDtcbiAgY29udGVudDogJyc7XG5gO1xuXG5jb25zdCBjaGVja2JveENoZWNrID0gY3NzYFxuICB3aWR0aDogMTBweDtcbiAgaGVpZ2h0OiA1cHg7XG4gIGJvcmRlci1ib3R0b206IDJweCBzb2xpZCB3aGl0ZTtcbiAgYm9yZGVyLWxlZnQ6IDJweCBzb2xpZCB3aGl0ZTtcbiAgdG9wOiA0cHg7XG4gIGxlZnQ6IDNweDtcbiAgdHJhbnNmb3JtOiByb3RhdGUoLTQ1ZGVnKTtcbiAgZGlzcGxheTogYmxvY2s7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgb3BhY2l0eTogJHtwcm9wcyA9PiBwcm9wcy5jaGVja2VkID8gMSA6IDB9O1xuICBjb250ZW50OiBcIlwiO1xuYDtcblxuY29uc3QgaW5wdXRDaGVja2JveCA9IGNzc2BcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIHBhZGRpbmctbGVmdDogMzJweDtcbiAgbWFyZ2luLWJvdHRvbTogMjRweDtcbiAgbGluZS1oZWlnaHQ6IDIwcHg7XG4gIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgZm9udC1zaXplOiAxMnB4O1xuICBjb2xvcjogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5sYWJlbENvbG9yfTtcbiAgbWFyZ2luLWxlZnQ6IC0ke3Byb3BzID0+IHByb3BzLnRoZW1lLnN3aXRjaExhYmVsTWFyZ2lufXB4O1xuXG4gIDpiZWZvcmUge1xuICAgICAke3Byb3BzID0+IHByb3BzLnRoZW1lLmNoZWNrYm94Qm94fTtcbiAgfVxuICBcbiAgOmFmdGVyIHtcbiAgICAke3Byb3BzID0+IHByb3BzLnRoZW1lLmNoZWNrYm94Q2hlY2t9O1xuICB9XG5gO1xuXG5jb25zdCBzZWNvbmRhcnlTd2l0Y2ggPSBjc3NgXG4gICR7cHJvcHMgPT4gcHJvcHMudGhlbWUuaW5wdXRTd2l0Y2h9IFxuICA6YmVmb3JlIHtcbiAgICAke3Byb3BzID0+IHByb3BzLnRoZW1lLnN3aXRjaFRyYWNrfSBiYWNrZ3JvdW5kOiAke3Byb3BzID0+XG4gICAgICAgIHByb3BzLmNoZWNrZWRcbiAgICAgICAgICA/IHByb3BzLnRoZW1lLnN3aXRjaFRyYWNrQmdkQWN0aXZlXG4gICAgICAgICAgOiBwcm9wcy50aGVtZS5zZWNvbmRhcnlTd2l0Y2hUcmFja0JnZH07XG4gIH1cblxuICA6YWZ0ZXIge1xuICAgICR7cHJvcHMgPT4gcHJvcHMudGhlbWUuc3dpdGNoQnV0dG9ufSBcbiAgICBiYWNrZ3JvdW5kOiAke3Byb3BzID0+IHByb3BzLmNoZWNrZWRcbiAgICAgICAgICA/IHByb3BzLnRoZW1lLnN3aXRjaEJ0bkJnZEFjdGl2ZVxuICAgICAgICAgIDogcHJvcHMudGhlbWUuc2Vjb25kYXJ5U3dpdGNoQnRuQmdkfTtcbiAgfVxuYDtcblxuY29uc3QgZHJvcGRvd25TY3JvbGxCYXIgPSBjc3NgXG4gIDo6LXdlYmtpdC1zY3JvbGxiYXIge1xuICAgIGhlaWdodDogMTBweDtcbiAgICB3aWR0aDogMTBweDtcbiAgfVxuICBcbiAgOjotd2Via2l0LXNjcm9sbGJhci1jb3JuZXIge1xuICAgIGJhY2tncm91bmQ6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUuZHJvcGRvd25MaXN0QmdkfTtcbiAgfVxuICBcbiAgOjotd2Via2l0LXNjcm9sbGJhci10cmFjayB7XG4gICAgYmFja2dyb3VuZDogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5kcm9wZG93bkxpc3RCZ2R9O1xuICB9XG4gIFxuICA6Oi13ZWJraXQtc2Nyb2xsYmFyLXRodW1iIHtcbiAgICBib3JkZXItcmFkaXVzOiAxMHB4O1xuICAgIGJhY2tncm91bmQ6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUubGFiZWxDb2xvcn07XG4gICAgYm9yZGVyOiAzcHggc29saWQgJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5kcm9wZG93bkxpc3RCZ2R9O1xuICB9O1xuICBcbiAgOnZlcnRpY2FsOmhvdmVyIHtcbiAgICBiYWNrZ3JvdW5kOiAke3Byb3BzID0+IHByb3BzLnRoZW1lLnRleHRDb2xvckhsfTtcbiAgICBjdXJzb3I6IHBvaW50ZXI7XG4gIH1cbn1gO1xuXG5jb25zdCBkcm9wZG93bkxpc3RBbmNob3IgPSBjc3NgXG4gIGNvbG9yOiAke3Byb3BzID0+IHByb3BzLnRoZW1lLnNlbGVjdENvbG9yfTtcbiAgcGFkZGluZy1sZWZ0OiAzcHg7XG5gO1xuXG5jb25zdCBkcm9wZG93bkxpc3RJdGVtID0gY3NzYFxuICBmb250LXNpemU6IDExcHg7XG4gIHBhZGRpbmc6IDNweCA5cHg7XG4gIGZvbnQtd2VpZ2h0OiA1MDA7XG5cbiAgJi5ob3ZlcixcbiAgJjpob3ZlciB7XG4gICAgY3Vyc29yOiBwb2ludGVyO1xuICAgIGJhY2tncm91bmQtY29sb3I6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUuZHJvcGRvd25MaXN0SGlnaGxpZ2h0Qmd9O1xuXG4gICAgLmxpc3RfX2l0ZW1fX2FuY2hvciB7XG4gICAgICBjb2xvcjogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS50ZXh0Q29sb3JIbH07XG4gICAgfVxuICB9XG5gO1xuXG5jb25zdCBkcm9wZG93bkxpc3RIZWFkZXIgPSBjc3NgXG4gIGZvbnQtc2l6ZTogMTFweDtcbiAgcGFkZGluZzogNXB4IDlweDtcbiAgY29sb3I6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUubGFiZWxDb2xvcn07XG5gO1xuXG5jb25zdCBkcm9wZG93bkxpc3RTZWN0aW9uID0gY3NzYFxuICBwYWRkaW5nOiAwIDAgNHB4IDA7XG4gIG1hcmdpbi1ib3R0b206IDRweDtcbiAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICR7cHJvcHMgPT4gcHJvcHMudGhlbWUubGFiZWxDb2xvcn07XG5gO1xuXG5jb25zdCBkcm9wZG93bkxpc3QgPSBjc3NgXG4gIG92ZXJmbG93LXk6IGF1dG87XG4gIG1heC1oZWlnaHQ6IDI4MHB4O1xuICBib3gtc2hhZG93OiAke3Byb3BzID0+IHByb3BzLnRoZW1lLmRyb3Bkb3duTGlzdFNoYWRvd307XG4gIGJvcmRlci1yYWRpdXM6IDJweDtcblxuICAubGlzdF9fc2VjdGlvbiB7XG4gICAgJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5kcm9wZG93bkxpc3RTZWN0aW9ufTtcbiAgfVxuICAubGlzdF9faGVhZGVyIHtcbiAgICAke3Byb3BzID0+IHByb3BzLnRoZW1lLmRyb3Bkb3duTGlzdEhlYWRlcn07XG4gIH1cblxuICAubGlzdF9faXRlbSB7XG4gICAgJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5kcm9wZG93bkxpc3RJdGVtfTtcbiAgfVxuXG4gIC5saXN0X19pdGVtX19hbmNob3Ige1xuICAgICR7cHJvcHMgPT4gcHJvcHMudGhlbWUuZHJvcGRvd25MaXN0QW5jaG9yfTtcbiAgfVxuXG4gICR7cHJvcHMgPT4gcHJvcHMudGhlbWUuZHJvcGRvd25TY3JvbGxCYXJ9O1xuYDtcblxuY29uc3Qgc2lkZVBhbmVsU2Nyb2xsQmFyID0gY3NzYFxuICA6Oi13ZWJraXQtc2Nyb2xsYmFyIHtcbiAgICBoZWlnaHQ6IDEwcHg7XG4gICAgd2lkdGg6IDEwcHg7XG4gIH1cbiAgXG4gIDo6LXdlYmtpdC1zY3JvbGxiYXItY29ybmVyIHtcbiAgICBiYWNrZ3JvdW5kOiAke3Byb3BzID0+IHByb3BzLnRoZW1lLnNpZGVQYW5lbEJnfTtcbiAgfVxuICBcbiAgOjotd2Via2l0LXNjcm9sbGJhci10cmFjayB7XG4gICAgYmFja2dyb3VuZDogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5zaWRlUGFuZWxCZ307XG4gIH1cbiAgXG4gIDo6LXdlYmtpdC1zY3JvbGxiYXItdGh1bWIge1xuICAgIGJvcmRlci1yYWRpdXM6IDEwcHg7XG4gICAgYmFja2dyb3VuZDogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5wYW5lbEJhY2tncm91bmRIb3Zlcn07XG4gICAgYm9yZGVyOiAzcHggc29saWQgJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5zaWRlUGFuZWxCZ307XG4gICAgXG4gICAgOmhvdmVyIHtcbiAgICAgIGJhY2tncm91bmQ6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUubGFiZWxDb2xvcn07XG4gICAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgfVxuICB9O1xufWA7XG5cbmNvbnN0IHBhbmVsRHJvcGRvd25TY3JvbGxCYXIgPSBjc3NgXG4gIDo6LXdlYmtpdC1zY3JvbGxiYXIge1xuICAgIGhlaWdodDogMTBweDtcbiAgICB3aWR0aDogMTBweDtcbiAgfVxuICBcbiAgOjotd2Via2l0LXNjcm9sbGJhci1jb3JuZXIge1xuICAgIGJhY2tncm91bmQ6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUucGFuZWxCYWNrZ3JvdW5kfTtcbiAgfVxuICBcbiAgOjotd2Via2l0LXNjcm9sbGJhci10cmFjayB7XG4gICAgYmFja2dyb3VuZDogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5wYW5lbEJhY2tncm91bmR9O1xuICB9XG4gIFxuICA6Oi13ZWJraXQtc2Nyb2xsYmFyLXRodW1iIHtcbiAgICBib3JkZXItcmFkaXVzOiAxMHB4O1xuICAgIGJhY2tncm91bmQ6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUucGFuZWxCYWNrZ3JvdW5kSG92ZXJ9O1xuICAgIGJvcmRlcjogM3B4IHNvbGlkICR7cHJvcHMgPT4gcHJvcHMudGhlbWUucGFuZWxCYWNrZ3JvdW5kfTtcbiAgICA6aG92ZXIge1xuICAgICAgYmFja2dyb3VuZDogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5sYWJlbENvbG9yfTtcbiAgICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICB9XG4gIH07XG5gO1xuXG5jb25zdCBzY3JvbGxCYXIgPSBjc3NgXG4gIDo6LXdlYmtpdC1zY3JvbGxiYXIge1xuICAgIGhlaWdodDogMTBweDtcbiAgICB3aWR0aDogMTBweDtcbiAgfVxuICBcbiAgOjotd2Via2l0LXNjcm9sbGJhci1jb3JuZXIge1xuICAgIGJhY2tncm91bmQ6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUucGFuZWxCYWNrZ3JvdW5kfTtcbiAgfVxuICBcbiAgOjotd2Via2l0LXNjcm9sbGJhci10cmFjayB7XG4gICAgYmFja2dyb3VuZDogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5wYW5lbEJhY2tncm91bmR9O1xuICB9XG4gIFxuICA6Oi13ZWJraXQtc2Nyb2xsYmFyLXRodW1iIHtcbiAgICBib3JkZXItcmFkaXVzOiAxMHB4O1xuICAgIGJhY2tncm91bmQ6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUubGFiZWxDb2xvcn07XG4gICAgYm9yZGVyOiAzcHggc29saWQgJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5wYW5lbEJhY2tncm91bmR9XG5cbiAgICA6dmVydGljYWw6aG92ZXIge1xuICAgICAgYmFja2dyb3VuZDogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS50ZXh0Q29sb3JIbH07XG4gICAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgfVxuICAgIFxuICAgIDpob3Jpem9udGFsOmhvdmVyIHtcbiAgICAgIGJhY2tncm91bmQ6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUudGV4dENvbG9ySGx9O1xuICAgICAgY3Vyc29yOiBwb2ludGVyO1xuICAgIH1cbiAgfVxufWA7XG5cbmV4cG9ydCBjb25zdCBtb2RhbFNjcm9sbEJhciA9IGNzc2BcbiAgOjotd2Via2l0LXNjcm9sbGJhciB7XG4gICAgd2lkdGg6IDE0cHg7XG4gICAgaGVpZ2h0OiAxNnB4O1xuICB9XG5cbiAgOjotd2Via2l0LXNjcm9sbGJhci10cmFjayB7XG4gICAgYmFja2dyb3VuZDogd2hpdGU7XG4gIH1cbiAgOjotd2Via2l0LXNjcm9sbGJhci10cmFjazpob3Jpem9udGFsIHtcbiAgICBiYWNrZ3JvdW5kOiAke3Byb3BzID0+IHByb3BzLnRoZW1lLnRleHRDb2xvckhsfTtcbiAgfVxuICA6Oi13ZWJraXQtc2Nyb2xsYmFyLXRodW1iIHtcbiAgICBiYWNrZ3JvdW5kOiAke3Byb3BzID0+IHByb3BzLnRoZW1lLmxhYmVsQ29sb3JMVH07XG4gICAgYm9yZGVyOiA0cHggc29saWQgd2hpdGU7XG4gIH1cblxuICA6Oi13ZWJraXQtc2Nyb2xsYmFyLWNvcm5lciB7XG4gICAgYmFja2dyb3VuZDogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS50ZXh0Q29sb3JIbH07XG4gIH1cblxuICA6Oi13ZWJraXQtc2Nyb2xsYmFyLXRodW1iOmhvdmVyIHtcbiAgICBiYWNrZ3JvdW5kOiAjOTY5ZGE5O1xuICB9XG5cbiAgOjotd2Via2l0LXNjcm9sbGJhci10aHVtYjp2ZXJ0aWNhbCB7XG4gICAgYm9yZGVyLXJhZGl1czogN3B4O1xuICB9XG5cbiAgOjotd2Via2l0LXNjcm9sbGJhci10aHVtYjpob3Jpem9udGFsIHtcbiAgICBib3JkZXItcmFkaXVzOiA5cHg7XG4gICAgYm9yZGVyOiA0cHggc29saWQgJHtwcm9wcyA9PiBwcm9wcy50aGVtZS50ZXh0Q29sb3JIbH07XG4gIH1cbmA7XG5cbmV4cG9ydCBjb25zdCB0aGVtZSA9IHtcbiAgLi4uRElNRU5TSU9OUyxcbiAgLy8gdGVtcGxhdGVzXG4gIGlucHV0LFxuICBpbnB1dExULFxuICBpbmxpbmVJbnB1dCxcbiAgY2hpY2tsZXRlZElucHV0LFxuICBzZWNvbmRhcnlJbnB1dCxcbiAgZHJvcGRvd25TY3JvbGxCYXIsXG4gIGRyb3Bkb3duTGlzdCxcbiAgZHJvcGRvd25MaXN0SXRlbSxcbiAgZHJvcGRvd25MaXN0QW5jaG9yLFxuICBkcm9wZG93bkxpc3RIZWFkZXIsXG4gIGRyb3Bkb3duTGlzdFNlY3Rpb24sXG4gIGRyb3Bkb3duTGlzdFNoYWRvdyxcbiAgbW9kYWxTY3JvbGxCYXIsXG4gIHNjcm9sbEJhcixcbiAgc2lkZVBhbmVsU2Nyb2xsQmFyLFxuICBpbnB1dFN3aXRjaCxcbiAgc2Vjb25kYXJ5U3dpdGNoLFxuICBzd2l0Y2hUcmFjayxcbiAgc3dpdGNoQnV0dG9uLFxuICBpbnB1dENoZWNrYm94LFxuICBjaGVja2JveEJveCxcbiAgY2hlY2tib3hDaGVjayxcblxuICAvLyBUcmFuc2l0aW9uc1xuICB0cmFuc2l0aW9uLFxuICB0cmFuc2l0aW9uRmFzdCxcbiAgdHJhbnNpdGlvblNsb3csXG5cbiAgLy8gc3R5bGVzXG4gIGFjdGl2ZUNvbG9yLFxuICBhY3RpdmVDb2xvckhvdmVyLFxuICBib3JkZXJSYWRpdXMsXG4gIGJveFNoYWRvdyxcbiAgZXJyb3JDb2xvcixcbiAgZHJvcGRvd25MaXN0SGlnaGxpZ2h0QmcsXG4gIGRyb3Bkb3duTGlzdEJnZCxcbiAgZHJvcGRvd25MaXN0Qm9yZGVyVG9wLFxuXG4gIGxhYmVsQ29sb3IsXG4gIGxhYmVsQ29sb3JMVCxcbiAgbGFiZWxIb3ZlckNvbG9yLFxuICBtYXBQYW5lbEJhY2tncm91bmRDb2xvcixcbiAgbWFwUGFuZWxIZWFkZXJCYWNrZ3JvdW5kQ29sb3IsXG5cbiAgLy8gU2VsZWN0XG4gIHNlbGVjdEFjdGl2ZUJvcmRlckNvbG9yLFxuICBzZWxlY3RCYWNrZ3JvdW5kLFxuICBzZWxlY3RCYWNrZ3JvdW5kTFQsXG4gIHNlbGVjdEJhY2tncm91bmRIb3ZlcixcbiAgc2VsZWN0QmFja2dyb3VuZEhvdmVyTFQsXG4gIHNlbGVjdEJvcmRlcixcbiAgc2VsZWN0Qm9yZGVyQ29sb3IsXG4gIHNlbGVjdEJvcmRlclJhZGl1cyxcbiAgc2VsZWN0Qm9yZGVyQ29sb3JMVCxcbiAgc2VsZWN0Q29sb3IsXG4gIHNlbGVjdENvbG9yUGxhY2VIb2xkZXIsXG4gIHNlbGVjdEZvbnRTaXplLFxuICBzZWxlY3RGb250V2VpZ2h0LFxuICBzZWxlY3RDb2xvckxULFxuXG4gIC8vIElucHV0XG4gIGlucHV0QmdkLFxuICBpbnB1dEJnZEhvdmVyLFxuICBpbnB1dEJnZEFjdGl2ZSxcbiAgaW5wdXRCb3hIZWlnaHQsXG4gIGlucHV0Qm9yZGVyQ29sb3IsXG4gIGlucHV0Qm9yZGVyQWN0aXZlQ29sb3IsXG4gIGlucHV0Qm9yZGVySG92ZXJDb2xvcixcbiAgaW5wdXRCb3JkZXJSYWRpdXMsXG4gIGlucHV0Q29sb3IsXG4gIGlucHV0UGFkZGluZyxcbiAgaW5wdXRGb250U2l6ZSxcbiAgaW5wdXRGb250V2VpZ2h0LFxuICBpbnB1dFBsYWNlaG9sZGVyQ29sb3IsXG4gIGlucHV0UGxhY2Vob2xkZXJGb250V2VpZ2h0LFxuXG4gIHNlY29uZGFyeUlucHV0QmdkLFxuICBzZWNvbmRhcnlJbnB1dEJnZEhvdmVyLFxuICBzZWNvbmRhcnlJbnB1dEJnZEFjdGl2ZSxcbiAgc2Vjb25kYXJ5SW5wdXRIZWlnaHQsXG4gIHNlY29uZGFyeUlucHV0Q29sb3IsXG4gIHNlY29uZGFyeUlucHV0Qm9yZGVyQ29sb3IsXG4gIHNlY29uZGFyeUlucHV0Qm9yZGVyQWN0aXZlQ29sb3IsXG5cbiAgLy8gU3dpdGNoXG4gIHN3aXRjaFdpZHRoLFxuICBzd2l0Y2hIZWlnaHQsXG4gIHN3aXRjaFRyYWNrQmdkLFxuICBzd2l0Y2hUcmFja0JnZEFjdGl2ZSxcbiAgc3dpdGNoVHJhY2tCb3JkZXJSYWRpdXMsXG4gIHN3aXRjaEJ0bkJnZCxcbiAgc3dpdGNoQnRuQmdkQWN0aXZlLFxuICBzd2l0Y2hCdG5Cb3hTaGFkb3csXG4gIHN3aXRjaEJ0bkJvcmRlclJhZGl1cyxcbiAgc3dpdGNoQnRuV2lkdGgsXG4gIHN3aXRjaEJ0bkhlaWdodCxcbiAgc3dpdGNoTGFiZWxNYXJnaW4sXG5cbiAgc2Vjb25kYXJ5U3dpdGNoVHJhY2tCZ2QsXG4gIHNlY29uZGFyeVN3aXRjaEJ0bkJnZCxcblxuICAvLyBDaGVja2JveFxuICBjaGVja2JveFdpZHRoLFxuICBjaGVja2JveEhlaWdodCxcbiAgY2hlY2tib3hNYXJnaW4sXG4gIGNoZWNrYm94Qm9yZGVyQ29sb3IsXG4gIGNoZWNrYm94Qm9yZGVyUmFkaXVzLFxuICBjaGVja2JveEJvcmRlckNvbG9yTFQsXG4gIGNoZWNrYm94Qm94QmdkLFxuICBjaGVja2JveEJveEJnZENoZWNrZWQsXG5cbiAgLy8gQnV0dG9uXG4gIHByaW1hcnlCdG5CZ2QsXG4gIHByaW1hcnlCdG5BY3RCZ2QsXG4gIHByaW1hcnlCdG5Db2xvcixcbiAgcHJpbWFyeUJ0bkFjdENvbG9yLFxuICBwcmltYXJ5QnRuQmdkSG92ZXIsXG4gIHByaW1hcnlCdG5SYWRpdXMsXG4gIHNlY29uZGFyeUJ0bkJnZCxcbiAgc2Vjb25kYXJ5QnRuQWN0QmdkLFxuICBzZWNvbmRhcnlCdG5CZ2RIb3ZlcixcbiAgc2Vjb25kYXJ5QnRuQ29sb3IsXG4gIHNlY29uZGFyeUJ0bkFjdENvbG9yLFxuXG4gIG5lZ2F0aXZlQnRuQmdkLFxuICBuZWdhdGl2ZUJ0bkFjdEJnZCxcbiAgbmVnYXRpdmVCdG5CZ2RIb3ZlcixcbiAgbmVnYXRpdmVCdG5Db2xvcixcbiAgbmVnYXRpdmVCdG5BY3RDb2xvcixcblxuICBsaW5rQnRuQmdkLFxuICBsaW5rQnRuQWN0QmdkLFxuICBsaW5rQnRuQ29sb3IsXG4gIGxpbmtCdG5BY3RDb2xvcixcbiAgbGlua0J0bkFjdEJnZEhvdmVyLFxuXG4gIC8vIE1vZGFsXG4gIG1vZGFsVGl0bGVDb2xvcixcbiAgbW9kYWxUaXRsZUZvbnRTaXplLFxuICBtb2RhbEZvb3RlckJnZCxcbiAgbW9kYWxJbWFnZVBsYWNlSG9sZGVyLFxuXG4gIG1vZGFsRGlhbG9nQmdkLFxuICBtb2RhbERpYWxvZ0NvbG9yLFxuXG4gIC8vIFNpZGUgUGFuZWxcbiAgc2lkZVBhbmVsQmcsXG5cbiAgc2lkZUJhckNsb3NlQnRuQmdkLFxuICBzaWRlQmFyQ2xvc2VCdG5Db2xvcixcbiAgc2lkZUJhckNsb3NlQnRuQmdkSG92ZXIsXG4gIHNpZGVQYW5lbEhlYWRlckJnLFxuXG4gIC8vIFNpZGUgUGFuZWwgUGFuZWxcbiAgcGFuZWxBY3RpdmVCZyxcbiAgcGFuZWxCYWNrZ3JvdW5kLFxuICBwYW5lbEJhY2tncm91bmRIb3ZlcixcbiAgcGFuZWxCYWNrZ3JvdW5kTFQsXG4gIHBhbmVsQm94U2hhZG93LFxuICBwYW5lbEJvcmRlclJhZGl1cyxcbiAgcGFuZWxCb3JkZXIsXG4gIHBhbmVsQm9yZGVyQ29sb3IsXG4gIHBhbmVsQm9yZGVyTFQsXG4gIHBhbmVsSGVhZGVySWNvbixcbiAgcGFuZWxIZWFkZXJJY29uQWN0aXZlLFxuICBwYW5lbEhlYWRlckhlaWdodCxcbiAgcGFuZWxEcm9wZG93blNjcm9sbEJhcixcblxuICAvLyBUZXh0XG4gIHRleHRDb2xvcixcbiAgdGV4dENvbG9yTFQsXG4gIHRleHRDb2xvckhsLFxuICB0aXRsZVRleHRDb2xvcixcbiAgc3VidGV4dENvbG9yLFxuICBzdWJ0ZXh0Q29sb3JMVCxcbiAgc3VidGV4dENvbG9yQWN0aXZlLFxuICB0ZXh0VHJ1bmNhdGUsXG4gIHRpdGxlQ29sb3JMVCxcbiAgdG9vbHRpcEJnLFxuICB0b29sdGlwQ29sb3IsXG5cbiAgLy8gU2xpZGVyXG4gIHNsaWRlckJhckNvbG9yLFxuICBzbGlkZXJCYXJCZ2QsXG4gIHNsaWRlckJhckhvdmVyQ29sb3IsXG4gIHNsaWRlckJhclJhZGl1cyxcbiAgc2xpZGVyQmFySGVpZ2h0LFxuICBzbGlkZXJIYW5kbGVIZWlnaHQsXG4gIHNsaWRlckhhbmRsZVdpZHRoLFxuICBzbGlkZXJIYW5kbGVDb2xvcixcbiAgc2xpZGVySGFuZGxlSG92ZXJDb2xvcixcbiAgc2xpZGVySGFuZGxlU2hhZG93LFxuXG4gIC8vIFBsb3RcbiAgcmFuZ2VCcnVzaEJnZFxufTtcblxuZXhwb3J0IGNvbnN0IHRoZW1lTFQgPSB7XG4gIC4uLnRoZW1lLFxuXG4gIC8vIHRlbXBsYXRlXG4gIGlucHV0OiBpbnB1dExULFxuICBwYW5lbEFjdGl2ZUJnOiBwYW5lbEFjdGl2ZUJnTFQsXG4gIHRleHRDb2xvcjogdGV4dENvbG9yTFQsXG4gIHRleHRDb2xvckhsOiB0ZXh0Q29sb3JIbExUXG59O1xuIl19