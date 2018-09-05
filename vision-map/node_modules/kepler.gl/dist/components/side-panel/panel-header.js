'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SaveExportDropdown = exports.PanelAction = undefined;

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

var _templateObject = (0, _taggedTemplateLiteral3.default)(['\n  background-color: ', ';\n  padding: 12px 16px 0 16px;\n'], ['\n  background-color: ', ';\n  padding: 12px 16px 0 16px;\n']),
    _templateObject2 = (0, _taggedTemplateLiteral3.default)(['\n  display: flex;\n  justify-content: space-between;\n  margin-bottom: 16px;\n  width: 100%;\n'], ['\n  display: flex;\n  justify-content: space-between;\n  margin-bottom: 16px;\n  width: 100%;\n']),
    _templateObject3 = (0, _taggedTemplateLiteral3.default)(['\n  display: flex;\n'], ['\n  display: flex;\n']),
    _templateObject4 = (0, _taggedTemplateLiteral3.default)(['\n  align-items: center;\n  border-radius: 2px;\n  color: ', ';\n  display: flex;\n  height: 26px;\n  justify-content: center;\n  margin-left: 4px;\n  width: 26px;\n\n  a {\n    height: 20px;\n  }\n\n  :hover {\n    cursor: pointer;\n    background-color: ', ';\n    color: ', ';\n\n    a {\n      color: ', ';\n    }\n  }\n'], ['\n  align-items: center;\n  border-radius: 2px;\n  color: ', ';\n  display: flex;\n  height: 26px;\n  justify-content: center;\n  margin-left: 4px;\n  width: 26px;\n\n  a {\n    height: 20px;\n  }\n\n  :hover {\n    cursor: pointer;\n    background-color: ', ';\n    color: ', ';\n\n    a {\n      color: ', ';\n    }\n  }\n']),
    _templateObject5 = (0, _taggedTemplateLiteral3.default)(['\n  background-color: ', ';\n  box-shadow: ', ';\n  font-size: 11px;\n  padding: 16px 0;\n  position: absolute;\n  transition: ', ';\n  display: flex;\n  margin-top: ', ';\n  opacity: ', ';\n  transform: translateX(calc(-50% + 20px));\n  pointer-events:  ', ';\n  z-index: 1000;\n\n  .save-export-dropdown__inner {\n    box-shadow: none;\n    background-color: transparent;\n    display: flex;\n  }\n\n  .save-export-dropdown__item {\n    align-items: center;\n    border-right: 1px solid ', ';\n    color: ', ';\n    display: flex;\n    flex-direction: column;\n    padding: 0 22px;\n\n    :hover {\n      cursor: pointer;\n      color: ', ';\n    }\n\n    &:last-child {\n      border-right: 0;\n    }\n  }\n\n  .save-export-dropdown__title {\n    white-space: nowrap;\n    margin-top: 4px;\n  }\n'], ['\n  background-color: ', ';\n  box-shadow: ', ';\n  font-size: 11px;\n  padding: 16px 0;\n  position: absolute;\n  transition: ', ';\n  display: flex;\n  margin-top: ', ';\n  opacity: ', ';\n  transform: translateX(calc(-50% + 20px));\n  pointer-events:  ', ';\n  z-index: 1000;\n\n  .save-export-dropdown__inner {\n    box-shadow: none;\n    background-color: transparent;\n    display: flex;\n  }\n\n  .save-export-dropdown__item {\n    align-items: center;\n    border-right: 1px solid ', ';\n    color: ', ';\n    display: flex;\n    flex-direction: column;\n    padding: 0 22px;\n\n    :hover {\n      cursor: pointer;\n      color: ', ';\n    }\n\n    &:last-child {\n      border-right: 0;\n    }\n  }\n\n  .save-export-dropdown__title {\n    white-space: nowrap;\n    margin-top: 4px;\n  }\n']); // Copyright (c) 2018 Uber Technologies, Inc.
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

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _styledComponents3 = require('../common/styled-components');

var _logo = require('../common/logo');

var _logo2 = _interopRequireDefault(_logo);

var _icons = require('../common/icons');

var _panelDropdown = require('./panel-dropdown');

var _panelDropdown2 = _interopRequireDefault(_panelDropdown);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var StyledPanelHeader = _styledComponents2.default.div.attrs({
  className: 'side-side-panel__header'
})(_templateObject, function (props) {
  return props.theme.sidePanelHeaderBg;
});

var StyledPanelHeaderTop = _styledComponents2.default.div.attrs({
  className: 'side-panel__header__top'
})(_templateObject2);

var StyledPanelTopActions = _styledComponents2.default.div.attrs({
  className: 'side-panel__header__actions'
})(_templateObject3);

var StyledPanelAction = _styledComponents2.default.div.attrs({
  className: 'side-panel__header__actions'
})(_templateObject4, function (props) {
  return props.active ? props.theme.textColorHl : props.theme.subtextColor;
}, function (props) {
  return props.theme.secondaryBtnActBgd;
}, function (props) {
  return props.theme.textColorHl;
}, function (props) {
  return props.theme.textColorHl;
});

var StyledPanelDropdown = _styledComponents2.default.div(_templateObject5, function (props) {
  return props.theme.dropdownListBgd;
}, function (props) {
  return props.theme.dropdownListShadow;
}, function (props) {
  return props.theme.transitionSlow;
}, function (props) {
  return props.show ? '6px' : '20px';
}, function (props) {
  return props.show ? 1 : 0;
}, function (props) {
  return props.show ? 'all' : 'none';
}, function (props) {
  return props.theme.panelHeaderIcon;
}, function (props) {
  return props.theme.textColor;
}, function (props) {
  return props.theme.textColorHl;
});

var PanelAction = exports.PanelAction = function PanelAction(_ref) {
  var item = _ref.item,
      onClick = _ref.onClick;
  return _react2.default.createElement(
    StyledPanelAction,
    { className: 'side-panel__panel-header__action',
      'data-tip': true, 'data-for': item.id + '-action', onClick: onClick },
    _react2.default.createElement(
      'a',
      { target: item.blank ? '_blank' : '', href: item.href },
      _react2.default.createElement(item.iconComponent, { height: '20px' })
    ),
    _react2.default.createElement(
      _styledComponents3.Tooltip,
      {
        id: item.id + '-action',
        place: 'bottom',
        delayShow: 500,
        effect: 'solid'
      },
      _react2.default.createElement(
        'span',
        null,
        item.tooltip
      )
    )
  );
};

var PanelItem = function PanelItem(_ref2) {
  var onClose = _ref2.onClose,
      onClickHandler = _ref2.onClickHandler,
      label = _ref2.label,
      icon = _ref2.icon;
  return _react2.default.createElement(
    'div',
    { className: 'save-export-dropdown__item', onClick: function onClick(e) {
        e.stopPropagation();
        onClose();
        onClickHandler();
      } },
    icon,
    _react2.default.createElement(
      'div',
      { className: 'save-export-dropdown__title' },
      label
    )
  );
};

var SaveExportDropdown = exports.SaveExportDropdown = function SaveExportDropdown(_ref3) {
  var onExportImage = _ref3.onExportImage,
      onExportData = _ref3.onExportData,
      onExportConfig = _ref3.onExportConfig,
      onSaveMap = _ref3.onSaveMap,
      show = _ref3.show,
      onClose = _ref3.onClose;

  return _react2.default.createElement(
    StyledPanelDropdown,
    { show: show, className: 'save-export-dropdown' },
    _react2.default.createElement(
      _panelDropdown2.default,
      { className: 'save-export-dropdown__inner',
        show: show,
        onClose: onClose },
      _react2.default.createElement(PanelItem, {
        label: 'Export Image',
        onClickHandler: onExportImage,
        onClose: onClose,
        icon: _react2.default.createElement(_icons.Picture, { height: '16px' })
      }),
      _react2.default.createElement(PanelItem, {
        label: 'Export Data',
        onClickHandler: onExportData,
        onClose: onClose,
        icon: _react2.default.createElement(_icons.Files, { height: '16px' })
      }),
      _react2.default.createElement(PanelItem, {
        label: 'Export Config',
        onClickHandler: onExportConfig,
        onClose: onClose,
        icon: _react2.default.createElement(_icons.CodeAlt, { height: '16px' })
      }),
      onSaveMap ? _react2.default.createElement(PanelItem, {
        label: 'Save Map Url',
        onClickHandler: onSaveMap,
        onClose: onClose,
        icon: _react2.default.createElement(_icons.Share, { height: '16px' })
      }) : null
    )
  );
};

var defaultActionItems = [{
  id: 'save',
  iconComponent: _icons.Save,
  tooltip: 'Save / Export',
  onClick: function onClick() {},
  dropdownComponent: SaveExportDropdown
}];

function PanelHeaderFactory() {
  var _class, _temp;

  return _temp = _class = function (_Component) {
    (0, _inherits3.default)(PanelHeader, _Component);

    function PanelHeader() {
      (0, _classCallCheck3.default)(this, PanelHeader);
      return (0, _possibleConstructorReturn3.default)(this, (PanelHeader.__proto__ || Object.getPrototypeOf(PanelHeader)).apply(this, arguments));
    }

    (0, _createClass3.default)(PanelHeader, [{
      key: 'render',
      value: function render() {
        var _props = this.props,
            appName = _props.appName,
            version = _props.version,
            actionItems = _props.actionItems,
            onSaveMap = _props.onSaveMap,
            onExportImage = _props.onExportImage,
            onExportData = _props.onExportData,
            onExportConfig = _props.onExportConfig,
            visibleDropdown = _props.visibleDropdown,
            showExportDropdown = _props.showExportDropdown,
            hideExportDropdown = _props.hideExportDropdown;


        return _react2.default.createElement(
          StyledPanelHeader,
          { className: 'side-panel__panel-header' },
          _react2.default.createElement(
            StyledPanelHeaderTop,
            { className: 'side-panel__panel-header__top' },
            _react2.default.createElement(this.props.logoComponent, { appName: appName, version: version }),
            _react2.default.createElement(
              StyledPanelTopActions,
              null,
              actionItems.map(function (item) {
                return _react2.default.createElement(
                  'div',
                  { className: 'side-panel__panel-header__right',
                    key: item.id, style: { position: 'relative' } },
                  _react2.default.createElement(PanelAction, {
                    item: item,
                    onClick: function onClick() {
                      if (item.dropdownComponent) {
                        showExportDropdown(item.id);
                      }
                      item.onClick();
                    }
                  }),
                  item.dropdownComponent ? _react2.default.createElement(item.dropdownComponent, {
                    onClose: hideExportDropdown,
                    show: visibleDropdown === item.id,
                    onSaveMap: onSaveMap,
                    onExportData: onExportData,
                    onExportImage: onExportImage,
                    onExportConfig: onExportConfig
                  }) : null
                );
              })
            )
          )
        );
      }
    }]);
    return PanelHeader;
  }(_react.Component), _class.propTypes = {
    appName: _propTypes2.default.string,
    version: _propTypes2.default.string,
    uiState: _propTypes2.default.object,
    uiStateActions: _propTypes2.default.object,
    logoComponent: _propTypes2.default.oneOfType([_propTypes2.default.element, _propTypes2.default.func]),
    actionItems: _propTypes2.default.arrayOf(_propTypes2.default.any)
  }, _class.defaultProps = {
    logoComponent: _logo2.default,
    actionItems: defaultActionItems
  }, _temp;
}

exports.default = PanelHeaderFactory;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3NpZGUtcGFuZWwvcGFuZWwtaGVhZGVyLmpzIl0sIm5hbWVzIjpbIlN0eWxlZFBhbmVsSGVhZGVyIiwic3R5bGVkIiwiZGl2IiwiYXR0cnMiLCJjbGFzc05hbWUiLCJwcm9wcyIsInRoZW1lIiwic2lkZVBhbmVsSGVhZGVyQmciLCJTdHlsZWRQYW5lbEhlYWRlclRvcCIsIlN0eWxlZFBhbmVsVG9wQWN0aW9ucyIsIlN0eWxlZFBhbmVsQWN0aW9uIiwiYWN0aXZlIiwidGV4dENvbG9ySGwiLCJzdWJ0ZXh0Q29sb3IiLCJzZWNvbmRhcnlCdG5BY3RCZ2QiLCJTdHlsZWRQYW5lbERyb3Bkb3duIiwiZHJvcGRvd25MaXN0QmdkIiwiZHJvcGRvd25MaXN0U2hhZG93IiwidHJhbnNpdGlvblNsb3ciLCJzaG93IiwicGFuZWxIZWFkZXJJY29uIiwidGV4dENvbG9yIiwiUGFuZWxBY3Rpb24iLCJpdGVtIiwib25DbGljayIsImlkIiwiYmxhbmsiLCJocmVmIiwidG9vbHRpcCIsIlBhbmVsSXRlbSIsIm9uQ2xvc2UiLCJvbkNsaWNrSGFuZGxlciIsImxhYmVsIiwiaWNvbiIsImUiLCJzdG9wUHJvcGFnYXRpb24iLCJTYXZlRXhwb3J0RHJvcGRvd24iLCJvbkV4cG9ydEltYWdlIiwib25FeHBvcnREYXRhIiwib25FeHBvcnRDb25maWciLCJvblNhdmVNYXAiLCJkZWZhdWx0QWN0aW9uSXRlbXMiLCJpY29uQ29tcG9uZW50IiwiU2F2ZSIsImRyb3Bkb3duQ29tcG9uZW50IiwiUGFuZWxIZWFkZXJGYWN0b3J5IiwiYXBwTmFtZSIsInZlcnNpb24iLCJhY3Rpb25JdGVtcyIsInZpc2libGVEcm9wZG93biIsInNob3dFeHBvcnREcm9wZG93biIsImhpZGVFeHBvcnREcm9wZG93biIsIm1hcCIsInBvc2l0aW9uIiwiQ29tcG9uZW50IiwicHJvcFR5cGVzIiwiUHJvcFR5cGVzIiwic3RyaW5nIiwidWlTdGF0ZSIsIm9iamVjdCIsInVpU3RhdGVBY3Rpb25zIiwibG9nb0NvbXBvbmVudCIsIm9uZU9mVHlwZSIsImVsZW1lbnQiLCJmdW5jIiwiYXJyYXlPZiIsImFueSIsImRlZmF1bHRQcm9wcyIsIktlcGxlckdsTG9nbyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozt1b0RBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7Ozs7O0FBRUEsSUFBTUEsb0JBQW9CQywyQkFBT0MsR0FBUCxDQUFXQyxLQUFYLENBQWlCO0FBQ3pDQyxhQUFXO0FBRDhCLENBQWpCLENBQXBCLGtCQUdnQjtBQUFBLFNBQVNDLE1BQU1DLEtBQU4sQ0FBWUMsaUJBQXJCO0FBQUEsQ0FIaEIsQ0FBTjs7QUFPQSxJQUFNQyx1QkFBdUJQLDJCQUFPQyxHQUFQLENBQVdDLEtBQVgsQ0FBaUI7QUFDNUNDLGFBQVc7QUFEaUMsQ0FBakIsQ0FBdkIsa0JBQU47O0FBU0EsSUFBTUssd0JBQXdCUiwyQkFBT0MsR0FBUCxDQUFXQyxLQUFYLENBQWlCO0FBQzdDQyxhQUFXO0FBRGtDLENBQWpCLENBQXhCLGtCQUFOOztBQU1BLElBQU1NLG9CQUFvQlQsMkJBQU9DLEdBQVAsQ0FBV0MsS0FBWCxDQUFpQjtBQUN6Q0MsYUFBVztBQUQ4QixDQUFqQixDQUFwQixtQkFLSztBQUFBLFNBQ1BDLE1BQU1NLE1BQU4sR0FBZU4sTUFBTUMsS0FBTixDQUFZTSxXQUEzQixHQUF5Q1AsTUFBTUMsS0FBTixDQUFZTyxZQUQ5QztBQUFBLENBTEwsRUFtQmtCO0FBQUEsU0FBU1IsTUFBTUMsS0FBTixDQUFZUSxrQkFBckI7QUFBQSxDQW5CbEIsRUFvQk87QUFBQSxTQUFTVCxNQUFNQyxLQUFOLENBQVlNLFdBQXJCO0FBQUEsQ0FwQlAsRUF1QlM7QUFBQSxT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b0JQLG9CQUFVUSxJQUE5QixDQUFwQixDQUxFO0FBTWpCaEIsaUJBQWFRLG9CQUFVUyxPQUFWLENBQWtCVCxvQkFBVVUsR0FBNUI7QUFOSSxHQURyQixTQVVTQyxZQVZULEdBVXdCO0FBQ3BCTixtQkFBZU8sY0FESztBQUVwQnBCLGlCQUFhUDtBQUZPLEdBVnhCO0FBZ0VEOztrQkFFY0ksa0IiLCJmaWxlIjoicGFuZWwtaGVhZGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSAyMDE4IFViZXIgVGVjaG5vbG9naWVzLCBJbmMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuLy8gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuLy8gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuLy8gdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuLy8gY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4vLyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4vLyBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4vLyBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbi8vIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuLy8gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuLy8gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbi8vIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbi8vIFRIRSBTT0ZUV0FSRS5cblxuaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50fSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgc3R5bGVkIGZyb20gJ3N0eWxlZC1jb21wb25lbnRzJztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQge1Rvb2x0aXB9IGZyb20gJ2NvbXBvbmVudHMvY29tbW9uL3N0eWxlZC1jb21wb25lbnRzJztcbmltcG9ydCBLZXBsZXJHbExvZ28gZnJvbSAnY29tcG9uZW50cy9jb21tb24vbG9nbyc7XG5pbXBvcnQge0NvZGVBbHQsIFNhdmUsIEZpbGVzLCBTaGFyZSwgUGljdHVyZX0gZnJvbSAnY29tcG9uZW50cy9jb21tb24vaWNvbnMnO1xuaW1wb3J0IENsaWNrT3V0c2lkZUNsb3NlRHJvcGRvd24gZnJvbSAnY29tcG9uZW50cy9zaWRlLXBhbmVsL3BhbmVsLWRyb3Bkb3duJztcblxuY29uc3QgU3R5bGVkUGFuZWxIZWFkZXIgPSBzdHlsZWQuZGl2LmF0dHJzKHtcbiAgY2xhc3NOYW1lOiAnc2lkZS1zaWRlLXBhbmVsX19oZWFkZXInXG59KWBcbiAgYmFja2dyb3VuZC1jb2xvcjogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5zaWRlUGFuZWxIZWFkZXJCZ307XG4gIHBhZGRpbmc6IDEycHggMTZweCAwIDE2cHg7XG5gO1xuXG5jb25zdCBTdHlsZWRQYW5lbEhlYWRlclRvcCA9IHN0eWxlZC5kaXYuYXR0cnMoe1xuICBjbGFzc05hbWU6ICdzaWRlLXBhbmVsX19oZWFkZXJfX3RvcCdcbn0pYFxuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gIG1hcmdpbi1ib3R0b206IDE2cHg7XG4gIHdpZHRoOiAxMDAlO1xuYDtcblxuY29uc3QgU3R5bGVkUGFuZWxUb3BBY3Rpb25zID0gc3R5bGVkLmRpdi5hdHRycyh7XG4gIGNsYXNzTmFtZTogJ3NpZGUtcGFuZWxfX2hlYWRlcl9fYWN0aW9ucydcbn0pYFxuICBkaXNwbGF5OiBmbGV4O1xuYDtcblxuY29uc3QgU3R5bGVkUGFuZWxBY3Rpb24gPSBzdHlsZWQuZGl2LmF0dHJzKHtcbiAgY2xhc3NOYW1lOiAnc2lkZS1wYW5lbF9faGVhZGVyX19hY3Rpb25zJ1xufSlgXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGJvcmRlci1yYWRpdXM6IDJweDtcbiAgY29sb3I6ICR7cHJvcHMgPT5cbiAgICBwcm9wcy5hY3RpdmUgPyBwcm9wcy50aGVtZS50ZXh0Q29sb3JIbCA6IHByb3BzLnRoZW1lLnN1YnRleHRDb2xvcn07XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGhlaWdodDogMjZweDtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIG1hcmdpbi1sZWZ0OiA0cHg7XG4gIHdpZHRoOiAyNnB4O1xuXG4gIGEge1xuICAgIGhlaWdodDogMjBweDtcbiAgfVxuXG4gIDpob3ZlciB7XG4gICAgY3Vyc29yOiBwb2ludGVyO1xuICAgIGJhY2tncm91bmQtY29sb3I6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUuc2Vjb25kYXJ5QnRuQWN0QmdkfTtcbiAgICBjb2xvcjogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS50ZXh0Q29sb3JIbH07XG5cbiAgICBhIHtcbiAgICAgIGNvbG9yOiAke3Byb3BzID0+IHByb3BzLnRoZW1lLnRleHRDb2xvckhsfTtcbiAgICB9XG4gIH1cbmA7XG5cbmNvbnN0IFN0eWxlZFBhbmVsRHJvcGRvd24gPSBzdHlsZWQuZGl2YFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAke3Byb3BzID0+IHByb3BzLnRoZW1lLmRyb3Bkb3duTGlzdEJnZH07XG4gIGJveC1zaGFkb3c6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUuZHJvcGRvd25MaXN0U2hhZG93fTtcbiAgZm9udC1zaXplOiAxMXB4O1xuICBwYWRkaW5nOiAxNnB4IDA7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgdHJhbnNpdGlvbjogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS50cmFuc2l0aW9uU2xvd307XG4gIGRpc3BsYXk6IGZsZXg7XG4gIG1hcmdpbi10b3A6ICR7cHJvcHMgPT4gcHJvcHMuc2hvdyA/ICc2cHgnIDogJzIwcHgnfTtcbiAgb3BhY2l0eTogJHtwcm9wcyA9PiBwcm9wcy5zaG93ID8gMSA6IDB9O1xuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoY2FsYygtNTAlICsgMjBweCkpO1xuICBwb2ludGVyLWV2ZW50czogICR7cHJvcHMgPT4gcHJvcHMuc2hvdyA/ICdhbGwnIDogJ25vbmUnfTtcbiAgei1pbmRleDogMTAwMDtcblxuICAuc2F2ZS1leHBvcnQtZHJvcGRvd25fX2lubmVyIHtcbiAgICBib3gtc2hhZG93OiBub25lO1xuICAgIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gIH1cblxuICAuc2F2ZS1leHBvcnQtZHJvcGRvd25fX2l0ZW0ge1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgYm9yZGVyLXJpZ2h0OiAxcHggc29saWQgJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5wYW5lbEhlYWRlckljb259O1xuICAgIGNvbG9yOiAke3Byb3BzID0+IHByb3BzLnRoZW1lLnRleHRDb2xvcn07XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgIHBhZGRpbmc6IDAgMjJweDtcblxuICAgIDpob3ZlciB7XG4gICAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgICBjb2xvcjogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS50ZXh0Q29sb3JIbH07XG4gICAgfVxuXG4gICAgJjpsYXN0LWNoaWxkIHtcbiAgICAgIGJvcmRlci1yaWdodDogMDtcbiAgICB9XG4gIH1cblxuICAuc2F2ZS1leHBvcnQtZHJvcGRvd25fX3RpdGxlIHtcbiAgICB3aGl0ZS1zcGFjZTogbm93cmFwO1xuICAgIG1hcmdpbi10b3A6IDRweDtcbiAgfVxuYDtcblxuZXhwb3J0IGNvbnN0IFBhbmVsQWN0aW9uID0gKHtpdGVtLCBvbkNsaWNrfSkgPT4gKFxuICA8U3R5bGVkUGFuZWxBY3Rpb24gY2xhc3NOYW1lPVwic2lkZS1wYW5lbF9fcGFuZWwtaGVhZGVyX19hY3Rpb25cIlxuICAgIGRhdGEtdGlwIGRhdGEtZm9yPXtgJHtpdGVtLmlkfS1hY3Rpb25gfSBvbkNsaWNrPXtvbkNsaWNrfT5cbiAgICA8YSB0YXJnZXQ9e2l0ZW0uYmxhbmsgPyAnX2JsYW5rJyA6ICcnfSBocmVmPXtpdGVtLmhyZWZ9PlxuICAgICAgPGl0ZW0uaWNvbkNvbXBvbmVudCBoZWlnaHQ9XCIyMHB4XCIgLz5cbiAgICA8L2E+XG4gICAgPFRvb2x0aXBcbiAgICAgIGlkPXtgJHtpdGVtLmlkfS1hY3Rpb25gfVxuICAgICAgcGxhY2U9XCJib3R0b21cIlxuICAgICAgZGVsYXlTaG93PXs1MDB9XG4gICAgICBlZmZlY3Q9XCJzb2xpZFwiXG4gICAgPlxuICAgICAgPHNwYW4+e2l0ZW0udG9vbHRpcH08L3NwYW4+XG4gICAgPC9Ub29sdGlwPlxuICA8L1N0eWxlZFBhbmVsQWN0aW9uPlxuKTtcblxuY29uc3QgUGFuZWxJdGVtID0gKHtvbkNsb3NlLCBvbkNsaWNrSGFuZGxlciwgbGFiZWwsIGljb259KSA9PiAoXG4gIDxkaXYgY2xhc3NOYW1lPVwic2F2ZS1leHBvcnQtZHJvcGRvd25fX2l0ZW1cIiBvbkNsaWNrPXsoZSkgPT4ge1xuICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgb25DbG9zZSgpO1xuICAgIG9uQ2xpY2tIYW5kbGVyKCk7XG4gIH19PlxuICAgIHtpY29ufVxuICAgIDxkaXYgY2xhc3NOYW1lPVwic2F2ZS1leHBvcnQtZHJvcGRvd25fX3RpdGxlXCI+e2xhYmVsfTwvZGl2PlxuICA8L2Rpdj5cbik7XG5cbmV4cG9ydCBjb25zdCBTYXZlRXhwb3J0RHJvcGRvd24gPSAoe1xuICBvbkV4cG9ydEltYWdlLFxuICBvbkV4cG9ydERhdGEsXG4gIG9uRXhwb3J0Q29uZmlnLFxuICBvblNhdmVNYXAsXG4gIHNob3csXG4gIG9uQ2xvc2Vcbn0pID0+IHtcbiAgcmV0dXJuIChcbiAgICA8U3R5bGVkUGFuZWxEcm9wZG93biBzaG93PXtzaG93fSBjbGFzc05hbWU9XCJzYXZlLWV4cG9ydC1kcm9wZG93blwiPlxuICAgICAgPENsaWNrT3V0c2lkZUNsb3NlRHJvcGRvd24gY2xhc3NOYW1lPVwic2F2ZS1leHBvcnQtZHJvcGRvd25fX2lubmVyXCJcbiAgICAgICAgc2hvdz17c2hvd31cbiAgICAgICAgb25DbG9zZT17b25DbG9zZX0+XG4gICAgICAgIDxQYW5lbEl0ZW1cbiAgICAgICAgICBsYWJlbD1cIkV4cG9ydCBJbWFnZVwiXG4gICAgICAgICAgb25DbGlja0hhbmRsZXI9e29uRXhwb3J0SW1hZ2V9XG4gICAgICAgICAgb25DbG9zZT17b25DbG9zZX1cbiAgICAgICAgICBpY29uPXsoPFBpY3R1cmUgaGVpZ2h0PVwiMTZweFwiIC8+KX1cbiAgICAgICAgLz5cblxuICAgICAgICA8UGFuZWxJdGVtXG4gICAgICAgICAgbGFiZWw9XCJFeHBvcnQgRGF0YVwiXG4gICAgICAgICAgb25DbGlja0hhbmRsZXI9e29uRXhwb3J0RGF0YX1cbiAgICAgICAgICBvbkNsb3NlPXtvbkNsb3NlfVxuICAgICAgICAgIGljb249eyg8RmlsZXMgaGVpZ2h0PVwiMTZweFwiIC8+KX1cbiAgICAgICAgLz5cblxuICAgICAgICA8UGFuZWxJdGVtXG4gICAgICAgICAgbGFiZWw9XCJFeHBvcnQgQ29uZmlnXCJcbiAgICAgICAgICBvbkNsaWNrSGFuZGxlcj17b25FeHBvcnRDb25maWd9XG4gICAgICAgICAgb25DbG9zZT17b25DbG9zZX1cbiAgICAgICAgICBpY29uPXsoPENvZGVBbHQgaGVpZ2h0PVwiMTZweFwiIC8+KX1cbiAgICAgICAgLz5cblxuICAgICAgICB7b25TYXZlTWFwID8gKFxuICAgICAgICAgIDxQYW5lbEl0ZW1cbiAgICAgICAgICAgIGxhYmVsPVwiU2F2ZSBNYXAgVXJsXCJcbiAgICAgICAgICAgIG9uQ2xpY2tIYW5kbGVyPXtvblNhdmVNYXB9XG4gICAgICAgICAgICBvbkNsb3NlPXtvbkNsb3NlfVxuICAgICAgICAgICAgaWNvbj17KDxTaGFyZSBoZWlnaHQ9XCIxNnB4XCIgLz4pfVxuICAgICAgICAgIC8+XG4gICAgICAgICkgOiBudWxsfVxuICAgICAgPC9DbGlja091dHNpZGVDbG9zZURyb3Bkb3duPlxuICAgIDwvU3R5bGVkUGFuZWxEcm9wZG93bj5cbiAgKTtcbn07XG5cbmNvbnN0IGRlZmF1bHRBY3Rpb25JdGVtcyA9IFtcbiAge1xuICAgIGlkOiAnc2F2ZScsXG4gICAgaWNvbkNvbXBvbmVudDogU2F2ZSxcbiAgICB0b29sdGlwOiAnU2F2ZSAvIEV4cG9ydCcsXG4gICAgb25DbGljazogKCkgPT4ge30sXG4gICAgZHJvcGRvd25Db21wb25lbnQ6IFNhdmVFeHBvcnREcm9wZG93blxuICB9XG5dO1xuXG5mdW5jdGlvbiBQYW5lbEhlYWRlckZhY3RvcnkoKSB7XG4gIHJldHVybiBjbGFzcyBQYW5lbEhlYWRlciBleHRlbmRzIENvbXBvbmVudCB7XG4gICAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICAgIGFwcE5hbWU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICB2ZXJzaW9uOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgdWlTdGF0ZTogUHJvcFR5cGVzLm9iamVjdCxcbiAgICAgIHVpU3RhdGVBY3Rpb25zOiBQcm9wVHlwZXMub2JqZWN0LFxuICAgICAgbG9nb0NvbXBvbmVudDogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLmVsZW1lbnQsIFByb3BUeXBlcy5mdW5jXSksXG4gICAgICBhY3Rpb25JdGVtczogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLmFueSlcbiAgICB9O1xuXG4gICAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICAgIGxvZ29Db21wb25lbnQ6IEtlcGxlckdsTG9nbyxcbiAgICAgIGFjdGlvbkl0ZW1zOiBkZWZhdWx0QWN0aW9uSXRlbXNcbiAgICB9O1xuXG4gICAgcmVuZGVyKCkge1xuICAgICAgY29uc3Qge1xuICAgICAgICBhcHBOYW1lLFxuICAgICAgICB2ZXJzaW9uLFxuICAgICAgICBhY3Rpb25JdGVtcyxcbiAgICAgICAgb25TYXZlTWFwLFxuICAgICAgICBvbkV4cG9ydEltYWdlLFxuICAgICAgICBvbkV4cG9ydERhdGEsXG4gICAgICAgIG9uRXhwb3J0Q29uZmlnLFxuICAgICAgICB2aXNpYmxlRHJvcGRvd24sXG4gICAgICAgIHNob3dFeHBvcnREcm9wZG93bixcbiAgICAgICAgaGlkZUV4cG9ydERyb3Bkb3duXG4gICAgICB9ID0gdGhpcy5wcm9wcztcblxuICAgICAgcmV0dXJuIChcbiAgICAgICAgPFN0eWxlZFBhbmVsSGVhZGVyIGNsYXNzTmFtZT1cInNpZGUtcGFuZWxfX3BhbmVsLWhlYWRlclwiPlxuICAgICAgICAgIDxTdHlsZWRQYW5lbEhlYWRlclRvcCBjbGFzc05hbWU9XCJzaWRlLXBhbmVsX19wYW5lbC1oZWFkZXJfX3RvcFwiPlxuICAgICAgICAgICAgPHRoaXMucHJvcHMubG9nb0NvbXBvbmVudCBhcHBOYW1lPXthcHBOYW1lfSB2ZXJzaW9uPXt2ZXJzaW9ufS8+XG4gICAgICAgICAgICA8U3R5bGVkUGFuZWxUb3BBY3Rpb25zPlxuICAgICAgICAgICAgICB7YWN0aW9uSXRlbXMubWFwKGl0ZW0gPT4gKFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic2lkZS1wYW5lbF9fcGFuZWwtaGVhZGVyX19yaWdodFwiXG4gICAgICAgICAgICAgICAgICAgICBrZXk9e2l0ZW0uaWR9IHN0eWxlPXt7cG9zaXRpb246ICdyZWxhdGl2ZSd9fT5cbiAgICAgICAgICAgICAgICAgIDxQYW5lbEFjdGlvblxuICAgICAgICAgICAgICAgICAgICBpdGVtPXtpdGVtfVxuICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW0uZHJvcGRvd25Db21wb25lbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNob3dFeHBvcnREcm9wZG93bihpdGVtLmlkKTtcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgaXRlbS5vbkNsaWNrKCk7XG4gICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAge2l0ZW0uZHJvcGRvd25Db21wb25lbnQgPyAoXG4gICAgICAgICAgICAgICAgICAgIDxpdGVtLmRyb3Bkb3duQ29tcG9uZW50XG4gICAgICAgICAgICAgICAgICAgICAgb25DbG9zZT17aGlkZUV4cG9ydERyb3Bkb3dufVxuICAgICAgICAgICAgICAgICAgICAgIHNob3c9e3Zpc2libGVEcm9wZG93biA9PT0gaXRlbS5pZH1cbiAgICAgICAgICAgICAgICAgICAgICBvblNhdmVNYXA9e29uU2F2ZU1hcH1cbiAgICAgICAgICAgICAgICAgICAgICBvbkV4cG9ydERhdGE9e29uRXhwb3J0RGF0YX1cbiAgICAgICAgICAgICAgICAgICAgICBvbkV4cG9ydEltYWdlPXtvbkV4cG9ydEltYWdlfVxuICAgICAgICAgICAgICAgICAgICAgIG9uRXhwb3J0Q29uZmlnPXtvbkV4cG9ydENvbmZpZ31cbiAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICkgOiBudWxsfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgIDwvU3R5bGVkUGFuZWxUb3BBY3Rpb25zPlxuICAgICAgICAgIDwvU3R5bGVkUGFuZWxIZWFkZXJUb3A+XG4gICAgICAgIDwvU3R5bGVkUGFuZWxIZWFkZXI+XG4gICAgICApO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBQYW5lbEhlYWRlckZhY3Rvcnk7XG4iXX0=