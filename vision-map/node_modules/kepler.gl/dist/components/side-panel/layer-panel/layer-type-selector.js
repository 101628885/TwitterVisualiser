'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _taggedTemplateLiteral2 = require('babel-runtime/helpers/taggedTemplateLiteral');

var _taggedTemplateLiteral3 = _interopRequireDefault(_taggedTemplateLiteral2);

var _templateObject = (0, _taggedTemplateLiteral3.default)(['\n  padding-bottom: 12px;\n  padding-right: 12px;\n\n  &.selected {\n    .layer-type-selector__item__icon {\n      border: 1px solid #caf2f4;\n    }\n  }\n\n  :hover,\n  &.selected {\n    cursor: pointer;\n    .layer-type-selector__item__icon {\n      color: ', ';\n    }\n\n    .layer-type-selector__item__label {\n      color: ', ';\n    }\n  }\n'], ['\n  padding-bottom: 12px;\n  padding-right: 12px;\n\n  &.selected {\n    .layer-type-selector__item__icon {\n      border: 1px solid #caf2f4;\n    }\n  }\n\n  :hover,\n  &.selected {\n    cursor: pointer;\n    .layer-type-selector__item__icon {\n      color: ', ';\n    }\n\n    .layer-type-selector__item__label {\n      color: ', ';\n    }\n  }\n']),
    _templateObject2 = (0, _taggedTemplateLiteral3.default)(['\n  &.list {\n    display: flex;\n    align-items: center;\n\n    .layer-type-selector__item__icon {\n      color: ', ';\n      background-size: ', 'px ', 'px;\n      margin-right: 12px;  \n    }\n  }\n  \n  .layer-type-selector__item__icon {\n    color: ', ';\n    display: flex;\n    background-image: url(', ');\n    background-size: ', 'px ', 'px;\n  }\n\n  .layer-type-selector__item__label {\n    text-transform: capitalize;\n    font-size: 12px;\n    text-align: center;\n    color: ', ';\n  }\n'], ['\n  &.list {\n    display: flex;\n    align-items: center;\n\n    .layer-type-selector__item__icon {\n      color: ', ';\n      background-size: ', 'px ', 'px;\n      margin-right: 12px;  \n    }\n  }\n  \n  .layer-type-selector__item__icon {\n    color: ', ';\n    display: flex;\n    background-image: url(', ');\n    background-size: ', 'px ', 'px;\n  }\n\n  .layer-type-selector__item__label {\n    text-transform: capitalize;\n    font-size: 12px;\n    text-align: center;\n    color: ', ';\n  }\n']),
    _templateObject3 = (0, _taggedTemplateLiteral3.default)(['\n  ', ';\n  background-color: ', ';\n  border-top: 1px solid ', ';\n  display: flex;\n  flex-wrap: wrap;\n  align-items: flex-start;\n  padding: 12px 0 0 12px;\n'], ['\n  ', ';\n  background-color: ', ';\n  border-top: 1px solid ', ';\n  display: flex;\n  flex-wrap: wrap;\n  align-items: flex-start;\n  padding: 12px 0 0 12px;\n']),
    _templateObject4 = (0, _taggedTemplateLiteral3.default)(['\n  // override item-selector dropdown padding\n  .item-selector .item-selector__dropdown {\n    padding: 4px 10px 4px 2px;\n  }\n'], ['\n  // override item-selector dropdown padding\n  .item-selector .item-selector__dropdown {\n    padding: 4px 10px 4px 2px;\n  }\n']); // Copyright (c) 2018 Uber Technologies, Inc.
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

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _dropdownList = require('../../common/item-selector/dropdown-list');

var _itemSelector = require('../../common/item-selector/item-selector');

var _itemSelector2 = _interopRequireDefault(_itemSelector);

var _defaultSettings = require('../../../constants/default-settings');

var _styledComponents3 = require('../../common/styled-components');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ITEM_SIZE = {
  large: 60,
  small: 28
};

var StyledDropdownListItem = _styledComponents2.default.div(_templateObject, function (props) {
  return props.theme.activeColor;
}, function (props) {
  return props.theme.textColor;
});

var StyledListItem = _styledComponents2.default.div(_templateObject2, function (props) {
  return props.theme.activeColor;
}, ITEM_SIZE.small, ITEM_SIZE.small, function (props) {
  return props.theme.labelColor;
}, _defaultSettings.CLOUDFRONT + '/kepler.gl-layer-icon-bg.png', ITEM_SIZE.large, ITEM_SIZE.large, function (props) {
  return props.theme.labelColor;
});

var DropdownListWrapper = _styledComponents2.default.div(_templateObject3, function (props) {
  return props.theme.dropdownList;
}, function (props) {
  return props.theme.dropdownListBgd;
}, function (props) {
  return props.theme.dropdownListBorderTop;
});

var LayerTypeListItem = function LayerTypeListItem(_ref) {
  var value = _ref.value,
      isTile = _ref.isTile;
  return _react2.default.createElement(
    StyledListItem,
    {
      className: (0, _classnames2.default)('layer-type-selector__item__inner', { list: !isTile })
    },
    _react2.default.createElement(
      'div',
      { className: 'layer-type-selector__item__icon' },
      _react2.default.createElement(value.icon, {
        height: (isTile ? ITEM_SIZE.large : ITEM_SIZE.small) + 'px'
      })
    ),
    _react2.default.createElement(
      'div',
      { className: 'layer-type-selector__item__label' },
      value.label
    )
  );
};

var LayerTypeDropdownList = function LayerTypeDropdownList(props) {
  return _react2.default.createElement(
    DropdownListWrapper,
    { className: _dropdownList.classList.list },
    props.options.map(function (value, i) {
      return _react2.default.createElement(
        StyledDropdownListItem,
        {
          className: (0, _classnames2.default)('layer-type-selector__item', {
            selected: props.selectedItems.find(function (it) {
              return it.id === value.id;
            }),
            hover: props.selectionIndex === i
          }),
          key: value.id + '_' + i,
          onMouseDown: function onMouseDown(e) {
            e.preventDefault();
            props.onOptionSelected(value, e);
          },
          onClick: function onClick(e) {
            e.preventDefault();
            props.onOptionSelected(value, e);
          }
        },
        _react2.default.createElement(props.customListItemComponent, { value: value, isTile: true })
      );
    })
  );
};

var propTypes = {
  layer: _propTypes2.default.object.isRequired,
  onSelect: _propTypes2.default.func.isRequired
};

var StyledLayerTypeSelector = _styledComponents2.default.div(_templateObject4);
var LayerTypeSelector = function LayerTypeSelector(_ref2) {
  var layer = _ref2.layer,
      layerTypeOptions = _ref2.layerTypeOptions,
      onSelect = _ref2.onSelect;
  return _react2.default.createElement(
    _styledComponents3.SidePanelSection,
    null,
    _react2.default.createElement(
      StyledLayerTypeSelector,
      { className: 'layer-config__type' },
      _react2.default.createElement(
        _styledComponents3.PanelLabel,
        null,
        'Layer type'
      ),
      _react2.default.createElement(_itemSelector2.default, {
        selectedItems: layerTypeOptions.find(function (op) {
          return op.id === layer.type;
        }),
        options: layerTypeOptions,
        multiSelect: false,
        placeholder: 'Select A Type',
        onChange: onSelect,
        getOptionValue: function getOptionValue(op) {
          return op.id;
        },
        filterOption: 'label',
        displayOption: function displayOption(op) {
          return op.label;
        },
        DropDownLineItemRenderComponent: LayerTypeListItem,
        DropDownRenderComponent: LayerTypeDropdownList
      })
    )
  );
};

LayerTypeSelector.propTypes = propTypes;

exports.default = LayerTypeSelector;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3NpZGUtcGFuZWwvbGF5ZXItcGFuZWwvbGF5ZXItdHlwZS1zZWxlY3Rvci5qcyJdLCJuYW1lcyI6WyJJVEVNX1NJWkUiLCJsYXJnZSIsInNtYWxsIiwiU3R5bGVkRHJvcGRvd25MaXN0SXRlbSIsInN0eWxlZCIsImRpdiIsInByb3BzIiwidGhlbWUiLCJhY3RpdmVDb2xvciIsInRleHRDb2xvciIsIlN0eWxlZExpc3RJdGVtIiwibGFiZWxDb2xvciIsIkNMT1VERlJPTlQiLCJEcm9wZG93bkxpc3RXcmFwcGVyIiwiZHJvcGRvd25MaXN0IiwiZHJvcGRvd25MaXN0QmdkIiwiZHJvcGRvd25MaXN0Qm9yZGVyVG9wIiwiTGF5ZXJUeXBlTGlzdEl0ZW0iLCJ2YWx1ZSIsImlzVGlsZSIsImxpc3QiLCJsYWJlbCIsIkxheWVyVHlwZURyb3Bkb3duTGlzdCIsImNsYXNzTGlzdCIsIm9wdGlvbnMiLCJtYXAiLCJpIiwic2VsZWN0ZWQiLCJzZWxlY3RlZEl0ZW1zIiwiZmluZCIsIml0IiwiaWQiLCJob3ZlciIsInNlbGVjdGlvbkluZGV4IiwiZSIsInByZXZlbnREZWZhdWx0Iiwib25PcHRpb25TZWxlY3RlZCIsInByb3BUeXBlcyIsImxheWVyIiwiUHJvcFR5cGVzIiwib2JqZWN0IiwiaXNSZXF1aXJlZCIsIm9uU2VsZWN0IiwiZnVuYyIsIlN0eWxlZExheWVyVHlwZVNlbGVjdG9yIiwiTGF5ZXJUeXBlU2VsZWN0b3IiLCJsYXllclR5cGVPcHRpb25zIiwib3AiLCJ0eXBlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OzZVQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBRUE7O0FBQ0E7Ozs7QUFDQTs7QUFFQTs7OztBQUtBLElBQU1B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LENBQWxCOztBQUtBLElBQU1HLDBCQUEwQnhDLDJCQUFPQyxHQUFqQyxrQkFBTjtBQU1BLElBQU13QyxvQkFBb0IsU0FBcEJBLGlCQUFvQjtBQUFBLE1BQUVQLEtBQUYsU0FBRUEsS0FBRjtBQUFBLE1BQVNRLGdCQUFULFNBQVNBLGdCQUFUO0FBQUEsTUFBMkJKLFFBQTNCLFNBQTJCQSxRQUEzQjtBQUFBLFNBQ3hCO0FBQUMsdUNBQUQ7QUFBQTtBQUNFO0FBQUMsNkJBQUQ7QUFBQSxRQUF5QixXQUFVLG9CQUFuQztBQUNFO0FBQUMscUNBQUQ7QUFBQTtBQUFBO0FBQUEsT0FERjtBQUVFLG9DQUFDLHNCQUFEO0FBQ0UsdUJBQWVJLGlCQUFpQmpCLElBQWpCLENBQXNCO0FBQUEsaUJBQU1rQixHQUFHaEIsRUFBSCxLQUFVTyxNQUFNVSxJQUF0QjtBQUFBLFNBQXRCLENBRGpCO0FBRUUsaUJBQVNGLGdCQUZYO0FBR0UscUJBQWEsS0FIZjtBQUlFLHFCQUFZLGVBSmQ7QUFLRSxrQkFBVUosUUFMWjtBQU1FLHdCQUFnQjtBQUFBLGlCQUFNSyxHQUFHaEIsRUFBVDtBQUFBLFNBTmxCO0FBT0Usc0JBQWEsT0FQZjtBQVFFLHVCQUFlO0FBQUEsaUJBQU1nQixHQUFHMUIsS0FBVDtBQUFBLFNBUmpCO0FBU0UseUNBQWlDSixpQkFUbkM7QUFVRSxpQ0FBeUJLO0FBVjNCO0FBRkY7QUFERixHQUR3QjtBQUFBLENBQTFCOztBQW9CQXVCLGtCQUFrQlIsU0FBbEIsR0FBOEJBLFNBQTlCOztrQkFFZVEsaUIiLCJmaWxlIjoibGF5ZXItdHlwZS1zZWxlY3Rvci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgMjAxOCBVYmVyIFRlY2hub2xvZ2llcywgSW5jLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbi8vIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbi8vIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbi8vIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbi8vIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuLy8gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuLy8gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4vLyBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbi8vIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbi8vIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4vLyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4vLyBUSEUgU09GVFdBUkUuXG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IGNsYXNzTmFtZXMgZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgc3R5bGVkIGZyb20gJ3N0eWxlZC1jb21wb25lbnRzJztcblxuaW1wb3J0IHtjbGFzc0xpc3R9IGZyb20gJ2NvbXBvbmVudHMvY29tbW9uL2l0ZW0tc2VsZWN0b3IvZHJvcGRvd24tbGlzdCc7XG5pbXBvcnQgSXRlbVNlbGVjdG9yIGZyb20gJ2NvbXBvbmVudHMvY29tbW9uL2l0ZW0tc2VsZWN0b3IvaXRlbS1zZWxlY3Rvcic7XG5pbXBvcnQge0NMT1VERlJPTlR9IGZyb20gJ2NvbnN0YW50cy9kZWZhdWx0LXNldHRpbmdzJztcblxuaW1wb3J0IHtcbiAgUGFuZWxMYWJlbCxcbiAgU2lkZVBhbmVsU2VjdGlvblxufSBmcm9tICdjb21wb25lbnRzL2NvbW1vbi9zdHlsZWQtY29tcG9uZW50cyc7XG5cbmNvbnN0IElURU1fU0laRSA9IHtcbiAgbGFyZ2U6IDYwLFxuICBzbWFsbDogMjhcbn07XG5cbmNvbnN0IFN0eWxlZERyb3Bkb3duTGlzdEl0ZW0gPSBzdHlsZWQuZGl2YFxuICBwYWRkaW5nLWJvdHRvbTogMTJweDtcbiAgcGFkZGluZy1yaWdodDogMTJweDtcblxuICAmLnNlbGVjdGVkIHtcbiAgICAubGF5ZXItdHlwZS1zZWxlY3Rvcl9faXRlbV9faWNvbiB7XG4gICAgICBib3JkZXI6IDFweCBzb2xpZCAjY2FmMmY0O1xuICAgIH1cbiAgfVxuXG4gIDpob3ZlcixcbiAgJi5zZWxlY3RlZCB7XG4gICAgY3Vyc29yOiBwb2ludGVyO1xuICAgIC5sYXllci10eXBlLXNlbGVjdG9yX19pdGVtX19pY29uIHtcbiAgICAgIGNvbG9yOiAke3Byb3BzID0+IHByb3BzLnRoZW1lLmFjdGl2ZUNvbG9yfTtcbiAgICB9XG5cbiAgICAubGF5ZXItdHlwZS1zZWxlY3Rvcl9faXRlbV9fbGFiZWwge1xuICAgICAgY29sb3I6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUudGV4dENvbG9yfTtcbiAgICB9XG4gIH1cbmA7XG5cbmNvbnN0IFN0eWxlZExpc3RJdGVtID0gc3R5bGVkLmRpdmBcbiAgJi5saXN0IHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG5cbiAgICAubGF5ZXItdHlwZS1zZWxlY3Rvcl9faXRlbV9faWNvbiB7XG4gICAgICBjb2xvcjogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5hY3RpdmVDb2xvcn07XG4gICAgICBiYWNrZ3JvdW5kLXNpemU6ICR7SVRFTV9TSVpFLnNtYWxsfXB4ICR7SVRFTV9TSVpFLnNtYWxsfXB4O1xuICAgICAgbWFyZ2luLXJpZ2h0OiAxMnB4OyAgXG4gICAgfVxuICB9XG4gIFxuICAubGF5ZXItdHlwZS1zZWxlY3Rvcl9faXRlbV9faWNvbiB7XG4gICAgY29sb3I6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUubGFiZWxDb2xvcn07XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoJHtgJHtDTE9VREZST05UfS9rZXBsZXIuZ2wtbGF5ZXItaWNvbi1iZy5wbmdgfSk7XG4gICAgYmFja2dyb3VuZC1zaXplOiAke0lURU1fU0laRS5sYXJnZX1weCAke0lURU1fU0laRS5sYXJnZX1weDtcbiAgfVxuXG4gIC5sYXllci10eXBlLXNlbGVjdG9yX19pdGVtX19sYWJlbCB7XG4gICAgdGV4dC10cmFuc2Zvcm06IGNhcGl0YWxpemU7XG4gICAgZm9udC1zaXplOiAxMnB4O1xuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICBjb2xvcjogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5sYWJlbENvbG9yfTtcbiAgfVxuYDtcblxuY29uc3QgRHJvcGRvd25MaXN0V3JhcHBlciA9IHN0eWxlZC5kaXZgXG4gICR7cHJvcHMgPT4gcHJvcHMudGhlbWUuZHJvcGRvd25MaXN0fTtcbiAgYmFja2dyb3VuZC1jb2xvcjogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5kcm9wZG93bkxpc3RCZ2R9O1xuICBib3JkZXItdG9wOiAxcHggc29saWQgJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5kcm9wZG93bkxpc3RCb3JkZXJUb3B9O1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LXdyYXA6IHdyYXA7XG4gIGFsaWduLWl0ZW1zOiBmbGV4LXN0YXJ0O1xuICBwYWRkaW5nOiAxMnB4IDAgMCAxMnB4O1xuYDtcblxuY29uc3QgTGF5ZXJUeXBlTGlzdEl0ZW0gPSAoe3ZhbHVlLCBpc1RpbGV9KSA9PiAoXG4gIDxTdHlsZWRMaXN0SXRlbVxuICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcygnbGF5ZXItdHlwZS1zZWxlY3Rvcl9faXRlbV9faW5uZXInLCB7bGlzdDogIWlzVGlsZX0pfVxuICA+XG4gICAgPGRpdiBjbGFzc05hbWU9XCJsYXllci10eXBlLXNlbGVjdG9yX19pdGVtX19pY29uXCI+XG4gICAgICA8dmFsdWUuaWNvblxuICAgICAgICBoZWlnaHQ9e2Ake2lzVGlsZSA/IElURU1fU0laRS5sYXJnZSA6IElURU1fU0laRS5zbWFsbH1weGB9XG4gICAgICAvPlxuICAgIDwvZGl2PlxuICAgIDxkaXYgY2xhc3NOYW1lPVwibGF5ZXItdHlwZS1zZWxlY3Rvcl9faXRlbV9fbGFiZWxcIj57dmFsdWUubGFiZWx9PC9kaXY+XG4gIDwvU3R5bGVkTGlzdEl0ZW0+XG4pO1xuXG5jb25zdCBMYXllclR5cGVEcm9wZG93bkxpc3QgPSBwcm9wcyA9PiAoXG4gIDxEcm9wZG93bkxpc3RXcmFwcGVyIGNsYXNzTmFtZT17Y2xhc3NMaXN0Lmxpc3R9PlxuICAgIHtwcm9wcy5vcHRpb25zLm1hcCgodmFsdWUsIGkpID0+IChcbiAgICAgIDxTdHlsZWREcm9wZG93bkxpc3RJdGVtXG4gICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcygnbGF5ZXItdHlwZS1zZWxlY3Rvcl9faXRlbScsIHtcbiAgICAgICAgICBzZWxlY3RlZDogcHJvcHMuc2VsZWN0ZWRJdGVtcy5maW5kKGl0ID0+IGl0LmlkID09PSB2YWx1ZS5pZCksXG4gICAgICAgICAgaG92ZXI6IHByb3BzLnNlbGVjdGlvbkluZGV4ID09PSBpXG4gICAgICAgIH0pfVxuICAgICAgICBrZXk9e2Ake3ZhbHVlLmlkfV8ke2l9YH1cbiAgICAgICAgb25Nb3VzZURvd249e2UgPT4ge1xuICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICBwcm9wcy5vbk9wdGlvblNlbGVjdGVkKHZhbHVlLCBlKTtcbiAgICAgICAgfX1cbiAgICAgICAgb25DbGljaz17ZSA9PiB7XG4gICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgIHByb3BzLm9uT3B0aW9uU2VsZWN0ZWQodmFsdWUsIGUpO1xuICAgICAgICB9fVxuICAgICAgPlxuICAgICAgICA8cHJvcHMuY3VzdG9tTGlzdEl0ZW1Db21wb25lbnQgdmFsdWU9e3ZhbHVlfSBpc1RpbGUgLz5cbiAgICAgIDwvU3R5bGVkRHJvcGRvd25MaXN0SXRlbT5cbiAgICApKX1cbiAgPC9Ecm9wZG93bkxpc3RXcmFwcGVyPlxuKTtcblxuY29uc3QgcHJvcFR5cGVzID0ge1xuICBsYXllcjogUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkLFxuICBvblNlbGVjdDogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZFxufTtcblxuY29uc3QgU3R5bGVkTGF5ZXJUeXBlU2VsZWN0b3IgPSBzdHlsZWQuZGl2YFxuICAvLyBvdmVycmlkZSBpdGVtLXNlbGVjdG9yIGRyb3Bkb3duIHBhZGRpbmdcbiAgLml0ZW0tc2VsZWN0b3IgLml0ZW0tc2VsZWN0b3JfX2Ryb3Bkb3duIHtcbiAgICBwYWRkaW5nOiA0cHggMTBweCA0cHggMnB4O1xuICB9XG5gO1xuY29uc3QgTGF5ZXJUeXBlU2VsZWN0b3IgPSAoe2xheWVyLCBsYXllclR5cGVPcHRpb25zLCBvblNlbGVjdH0pID0+IChcbiAgPFNpZGVQYW5lbFNlY3Rpb24+XG4gICAgPFN0eWxlZExheWVyVHlwZVNlbGVjdG9yIGNsYXNzTmFtZT1cImxheWVyLWNvbmZpZ19fdHlwZVwiPlxuICAgICAgPFBhbmVsTGFiZWw+TGF5ZXIgdHlwZTwvUGFuZWxMYWJlbD5cbiAgICAgIDxJdGVtU2VsZWN0b3JcbiAgICAgICAgc2VsZWN0ZWRJdGVtcz17bGF5ZXJUeXBlT3B0aW9ucy5maW5kKG9wID0+IG9wLmlkID09PSBsYXllci50eXBlKX1cbiAgICAgICAgb3B0aW9ucz17bGF5ZXJUeXBlT3B0aW9uc31cbiAgICAgICAgbXVsdGlTZWxlY3Q9e2ZhbHNlfVxuICAgICAgICBwbGFjZWhvbGRlcj1cIlNlbGVjdCBBIFR5cGVcIlxuICAgICAgICBvbkNoYW5nZT17b25TZWxlY3R9XG4gICAgICAgIGdldE9wdGlvblZhbHVlPXtvcCA9PiBvcC5pZH1cbiAgICAgICAgZmlsdGVyT3B0aW9uPVwibGFiZWxcIlxuICAgICAgICBkaXNwbGF5T3B0aW9uPXtvcCA9PiBvcC5sYWJlbH1cbiAgICAgICAgRHJvcERvd25MaW5lSXRlbVJlbmRlckNvbXBvbmVudD17TGF5ZXJUeXBlTGlzdEl0ZW19XG4gICAgICAgIERyb3BEb3duUmVuZGVyQ29tcG9uZW50PXtMYXllclR5cGVEcm9wZG93bkxpc3R9XG4gICAgICAvPlxuICAgIDwvU3R5bGVkTGF5ZXJUeXBlU2VsZWN0b3I+XG4gIDwvU2lkZVBhbmVsU2VjdGlvbj5cbik7XG5cbkxheWVyVHlwZVNlbGVjdG9yLnByb3BUeXBlcyA9IHByb3BUeXBlcztcblxuZXhwb3J0IGRlZmF1bHQgTGF5ZXJUeXBlU2VsZWN0b3I7XG4iXX0=