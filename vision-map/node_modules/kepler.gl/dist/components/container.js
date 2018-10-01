'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.appInjector = exports.errorMsg = undefined;

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

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

exports.ContainerFactory = ContainerFactory;
exports.injectComponents = injectComponents;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _lodash = require('lodash.memoize');

var _lodash2 = _interopRequireDefault(_lodash);

var _window = require('global/window');

var _injector = require('./injector');

var _keplerGl = require('./kepler-gl');

var _keplerGl2 = _interopRequireDefault(_keplerGl);

var _actionWrapper = require('../actions/action-wrapper');

var _identityActions = require('../actions/identity-actions');

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

var errorMsg = exports.errorMsg = {
  noState: 'kepler.gl state doesnt exist. ' + 'You might forget to mount keplerGlReducer in your root reducer.' + 'If it is not mounted as state.keplerGl by default, you need to provide getState as a prop',

  wrongType: function wrongType(type) {
    return 'injectComponents takes an array of factories replacement pairs as input, ' + (type + ' is provided');
  },

  wrongPairType: 'injectComponents takes an array of factories replacement pairs as input, ' + 'each pair be a array as [originalFactory, replacement]'
};

ContainerFactory.deps = [_keplerGl2.default];

function ContainerFactory(KeplerGl) {
  var _class, _temp;

  var Container = (_temp = _class = function (_Component) {
    (0, _inherits3.default)(Container, _Component);

    function Container(props, ctx) {
      (0, _classCallCheck3.default)(this, Container);

      var _this = (0, _possibleConstructorReturn3.default)(this, (Container.__proto__ || Object.getPrototypeOf(Container)).call(this, props, ctx));

      _this.getSelector = (0, _lodash2.default)(function (id, getState) {
        return function (state) {
          if (!getState(state)) {
            // log error
            _window.console.error(errorMsg.noState);

            return null;
          }
          return getState(state)[id];
        };
      });
      _this.getDispatch = (0, _lodash2.default)(function (id, dispatch) {
        return (0, _actionWrapper.forwardTo)(id, dispatch);
      });
      return _this;
    }
    // default id and address if not provided


    (0, _createClass3.default)(Container, [{
      key: 'componentWillMount',
      value: function componentWillMount() {
        var _props = this.props,
            id = _props.id,
            mint = _props.mint,
            mapboxApiAccessToken = _props.mapboxApiAccessToken;
        // add a new entry to reducer

        this.props.dispatch((0, _identityActions.registerEntry)({ id: id, mint: mint, mapboxApiAccessToken: mapboxApiAccessToken }));
      }
    }, {
      key: 'componentWillReceiveProps',
      value: function componentWillReceiveProps(nextProps) {
        // check if id has changed, if true, copy state over
        if (nextProps.id !== this.props.id) {
          this.props.dispatch((0, _identityActions.renameEntry)(this.props.id, nextProps));
        }
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        if (this.props.mint !== false) {
          // delete entry in reducer
          this.props.dispatch((0, _identityActions.deleteEntry)(this.props.id));
        }
      }
    }, {
      key: 'render',
      value: function render() {
        var _props2 = this.props,
            id = _props2.id,
            getState = _props2.getState,
            dispatch = _props2.dispatch,
            state = _props2.state;

        var selector = this.getSelector(id, getState);

        if (!selector || !selector(state)) {
          // instance state hasn't been mounted yet
          return _react2.default.createElement('div', null);
        }

        return _react2.default.createElement(KeplerGl, (0, _extends3.default)({}, this.props, {
          id: id,
          selector: selector,
          dispatch: this.getDispatch(id, dispatch)
        }));
      }
    }]);
    return Container;
  }(_react.Component), _class.defaultProps = {
    id: 'map',
    getState: function getState(state) {
      return state.keplerGl;
    },
    mint: true
  }, _temp);


  var mapStateToProps = function mapStateToProps(state, props) {
    return (0, _extends3.default)({ state: state }, props);
  };
  var dispatchToProps = function dispatchToProps(dispatch) {
    return { dispatch: dispatch };
  };
  return (0, _reactRedux.connect)(mapStateToProps, dispatchToProps)(Container);
}

// provide all recipes to injector
var appInjector = exports.appInjector = [ContainerFactory].concat((0, _toConsumableArray3.default)(ContainerFactory.deps), (0, _toConsumableArray3.default)(_keplerGl2.default.deps), (0, _toConsumableArray3.default)(_keplerGl.keplerGlChildDeps)).reduce(function (inj, factory) {
  return inj.provide(factory, factory);
}, (0, _injector.injector)());

// Helper to inject custom components and return kepler.gl container
function injectComponents(recipes) {
  if (!Array.isArray(recipes)) {
    _window.console.error(errorMsg.wrongType(typeof recipes === 'undefined' ? 'undefined' : (0, _typeof3.default)(recipes)));
    return appInjector.get(ContainerFactory);
  }

  return recipes.reduce(function (inj, recipe) {
    if (!Array.isArray(recipes)) {
      _window.console.error(errorMsg.wrongPairType);
      return inj;
    }
    return inj.provide.apply(inj, (0, _toConsumableArray3.default)(recipe));
  }, appInjector).get(ContainerFactory);
}

var InjectedContainer = appInjector.get(ContainerFactory);

exports.default = InjectedContainer;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL2NvbnRhaW5lci5qcyJdLCJuYW1lcyI6WyJDb250YWluZXJGYWN0b3J5IiwiaW5qZWN0Q29tcG9uZW50cyIsImVycm9yTXNnIiwibm9TdGF0ZSIsIndyb25nVHlwZSIsInR5cGUiLCJ3cm9uZ1BhaXJUeXBlIiwiZGVwcyIsIktlcGxlckdsRmFjdG9yeSIsIktlcGxlckdsIiwiQ29udGFpbmVyIiwicHJvcHMiLCJjdHgiLCJnZXRTZWxlY3RvciIsImlkIiwiZ2V0U3RhdGUiLCJzdGF0ZSIsIkNvbnNvbGUiLCJlcnJvciIsImdldERpc3BhdGNoIiwiZGlzcGF0Y2giLCJtaW50IiwibWFwYm94QXBpQWNjZXNzVG9rZW4iLCJuZXh0UHJvcHMiLCJzZWxlY3RvciIsIkNvbXBvbmVudCIsImRlZmF1bHRQcm9wcyIsImtlcGxlckdsIiwibWFwU3RhdGVUb1Byb3BzIiwiZGlzcGF0Y2hUb1Byb3BzIiwiYXBwSW5qZWN0b3IiLCJrZXBsZXJHbENoaWxkRGVwcyIsInJlZHVjZSIsImluaiIsImZhY3RvcnkiLCJwcm92aWRlIiwicmVjaXBlcyIsIkFycmF5IiwiaXNBcnJheSIsImdldCIsInJlY2lwZSIsIkluamVjdGVkQ29udGFpbmVyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztRQWlEZ0JBLGdCLEdBQUFBLGdCO1FBOEVBQyxnQixHQUFBQSxnQjs7QUEzR2hCOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7QUFDQTs7OztBQUNBOztBQUVBOzs7O0FBNUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQWdCTyxJQUFNQyw4QkFBVztBQUN0QkMsV0FDRSxrTUFGb0I7O0FBTXRCQyxhQUFXO0FBQUEsV0FBUSwrRUFDZEMsSUFEYyxrQkFBUjtBQUFBLEdBTlc7O0FB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QUExQjs7a0JBRWV5QyxpQiIsImZpbGUiOiJjb250YWluZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIDIwMTggVWJlciBUZWNobm9sb2dpZXMsIEluYy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4vLyBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4vLyBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4vLyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4vLyBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbi8vIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbi8vIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1Jcbi8vIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuLy8gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4vLyBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4vLyBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuLy8gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuLy8gVEhFIFNPRlRXQVJFLlxuXG5pbXBvcnQgUmVhY3QsIHtDb21wb25lbnR9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7Y29ubmVjdH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0IG1lbW9pemUgZnJvbSAnbG9kYXNoLm1lbW9pemUnO1xuaW1wb3J0IHtjb25zb2xlIGFzIENvbnNvbGV9IGZyb20gJ2dsb2JhbC93aW5kb3cnO1xuaW1wb3J0IHtpbmplY3Rvcn0gZnJvbSAnLi9pbmplY3Rvcic7XG5pbXBvcnQgS2VwbGVyR2xGYWN0b3J5LCB7a2VwbGVyR2xDaGlsZERlcHN9IGZyb20gJy4va2VwbGVyLWdsJztcbmltcG9ydCB7Zm9yd2FyZFRvfSBmcm9tICdhY3Rpb25zL2FjdGlvbi13cmFwcGVyJztcblxuaW1wb3J0IHtcbiAgcmVnaXN0ZXJFbnRyeSxcbiAgZGVsZXRlRW50cnksXG4gIHJlbmFtZUVudHJ5XG59IGZyb20gJ2FjdGlvbnMvaWRlbnRpdHktYWN0aW9ucyc7XG5cbmV4cG9ydCBjb25zdCBlcnJvck1zZyA9IHtcbiAgbm9TdGF0ZTpcbiAgICBga2VwbGVyLmdsIHN0YXRlIGRvZXNudCBleGlzdC4gYCArXG4gICAgYFlvdSBtaWdodCBmb3JnZXQgdG8gbW91bnQga2VwbGVyR2xSZWR1Y2VyIGluIHlvdXIgcm9vdCByZWR1Y2VyLmAgK1xuICAgIGBJZiBpdCBpcyBub3QgbW91bnRlZCBhcyBzdGF0ZS5rZXBsZXJHbCBieSBkZWZhdWx0LCB5b3UgbmVlZCB0byBwcm92aWRlIGdldFN0YXRlIGFzIGEgcHJvcGAsXG5cbiAgd3JvbmdUeXBlOiB0eXBlID0+IGBpbmplY3RDb21wb25lbnRzIHRha2VzIGFuIGFycmF5IG9mIGZhY3RvcmllcyByZXBsYWNlbWVudCBwYWlycyBhcyBpbnB1dCwgYCArXG4gICAgYCR7dHlwZX0gaXMgcHJvdmlkZWRgLFxuXG4gIHdyb25nUGFpclR5cGU6IGBpbmplY3RDb21wb25lbnRzIHRha2VzIGFuIGFycmF5IG9mIGZhY3RvcmllcyByZXBsYWNlbWVudCBwYWlycyBhcyBpbnB1dCwgYCArXG4gIGBlYWNoIHBhaXIgYmUgYSBhcnJheSBhcyBbb3JpZ2luYWxGYWN0b3J5LCByZXBsYWNlbWVudF1gXG59O1xuXG5Db250YWluZXJGYWN0b3J5LmRlcHMgPSBbS2VwbGVyR2xGYWN0b3J5XTtcblxuZXhwb3J0IGZ1bmN0aW9uIENvbnRhaW5lckZhY3RvcnkoS2VwbGVyR2wpIHtcbiAgY2xhc3MgQ29udGFpbmVyIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgICAvLyBkZWZhdWx0IGlkIGFuZCBhZGRyZXNzIGlmIG5vdCBwcm92aWRlZFxuICAgIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgICBpZDogJ21hcCcsXG4gICAgICBnZXRTdGF0ZTogc3RhdGUgPT4gc3RhdGUua2VwbGVyR2wsXG4gICAgICBtaW50OiB0cnVlXG4gICAgfTtcblxuICAgIGNvbnN0cnVjdG9yKHByb3BzLCBjdHgpIHtcbiAgICAgIHN1cGVyKHByb3BzLCBjdHgpO1xuXG4gICAgICB0aGlzLmdldFNlbGVjdG9yID0gbWVtb2l6ZSgoaWQsIGdldFN0YXRlKSA9PiBzdGF0ZSA9PiB7XG4gICAgICAgIGlmICghZ2V0U3RhdGUoc3RhdGUpKSB7XG4gICAgICAgICAgLy8gbG9nIGVycm9yXG4gICAgICAgICAgQ29uc29sZS5lcnJvcihlcnJvck1zZy5ub1N0YXRlKTtcblxuICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBnZXRTdGF0ZShzdGF0ZSlbaWRdO1xuICAgICAgfSk7XG4gICAgICB0aGlzLmdldERpc3BhdGNoID0gbWVtb2l6ZSgoaWQsIGRpc3BhdGNoKSA9PiBmb3J3YXJkVG8oaWQsIGRpc3BhdGNoKSk7XG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbE1vdW50KCkge1xuICAgICAgY29uc3Qge2lkLCBtaW50LCBtYXBib3hBcGlBY2Nlc3NUb2tlbn0gPSB0aGlzLnByb3BzO1xuICAgICAgLy8gYWRkIGEgbmV3IGVudHJ5IHRvIHJlZHVjZXJcbiAgICAgIHRoaXMucHJvcHMuZGlzcGF0Y2gocmVnaXN0ZXJFbnRyeSh7aWQsIG1pbnQsIG1hcGJveEFwaUFjY2Vzc1Rva2VufSkpO1xuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzKSB7XG4gICAgICAvLyBjaGVjayBpZiBpZCBoYXMgY2hhbmdlZCwgaWYgdHJ1ZSwgY29weSBzdGF0ZSBvdmVyXG4gICAgICBpZiAobmV4dFByb3BzLmlkICE9PSB0aGlzLnByb3BzLmlkKSB7XG4gICAgICAgIHRoaXMucHJvcHMuZGlzcGF0Y2gocmVuYW1lRW50cnkodGhpcy5wcm9wcy5pZCwgbmV4dFByb3BzKSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgICBpZiAodGhpcy5wcm9wcy5taW50ICE9PSBmYWxzZSkge1xuICAgICAgICAvLyBkZWxldGUgZW50cnkgaW4gcmVkdWNlclxuICAgICAgICB0aGlzLnByb3BzLmRpc3BhdGNoKGRlbGV0ZUVudHJ5KHRoaXMucHJvcHMuaWQpKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICBjb25zdCB7aWQsIGdldFN0YXRlLCBkaXNwYXRjaCwgc3RhdGV9ID0gdGhpcy5wcm9wcztcbiAgICAgIGNvbnN0IHNlbGVjdG9yID0gdGhpcy5nZXRTZWxlY3RvcihpZCwgZ2V0U3RhdGUpO1xuXG4gICAgICBpZiAoIXNlbGVjdG9yIHx8ICFzZWxlY3RvcihzdGF0ZSkpIHtcbiAgICAgICAgLy8gaW5zdGFuY2Ugc3RhdGUgaGFzbid0IGJlZW4gbW91bnRlZCB5ZXRcbiAgICAgICAgcmV0dXJuIDxkaXYgLz47XG4gICAgICB9XG5cbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxLZXBsZXJHbFxuICAgICAgICAgIHsuLi50aGlzLnByb3BzfVxuICAgICAgICAgIGlkPXtpZH1cbiAgICAgICAgICBzZWxlY3Rvcj17c2VsZWN0b3J9XG4gICAgICAgICAgZGlzcGF0Y2g9e3RoaXMuZ2V0RGlzcGF0Y2goaWQsIGRpc3BhdGNoKX1cbiAgICAgICAgLz5cbiAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gKHN0YXRlLCBwcm9wcykgPT4gKHtzdGF0ZSwgLi4ucHJvcHN9KTtcbiAgY29uc3QgZGlzcGF0Y2hUb1Byb3BzID0gZGlzcGF0Y2ggPT4gKHtkaXNwYXRjaH0pO1xuICByZXR1cm4gY29ubmVjdChtYXBTdGF0ZVRvUHJvcHMsIGRpc3BhdGNoVG9Qcm9wcykoQ29udGFpbmVyKTtcbn1cblxuLy8gcHJvdmlkZSBhbGwgcmVjaXBlcyB0byBpbmplY3RvclxuZXhwb3J0IGNvbnN0IGFwcEluamVjdG9yID0gW1xuICBDb250YWluZXJGYWN0b3J5LFxuICAuLi5Db250YWluZXJGYWN0b3J5LmRlcHMsXG4gIC4uLktlcGxlckdsRmFjdG9yeS5kZXBzLFxuICAuLi5rZXBsZXJHbENoaWxkRGVwc1xuXS5yZWR1Y2UoKGluaiwgZmFjdG9yeSkgPT4gaW5qLnByb3ZpZGUoZmFjdG9yeSwgZmFjdG9yeSksIGluamVjdG9yKCkpO1xuXG4vLyBIZWxwZXIgdG8gaW5qZWN0IGN1c3RvbSBjb21wb25lbnRzIGFuZCByZXR1cm4ga2VwbGVyLmdsIGNvbnRhaW5lclxuZXhwb3J0IGZ1bmN0aW9uIGluamVjdENvbXBvbmVudHMocmVjaXBlcykge1xuICBpZiAoIUFycmF5LmlzQXJyYXkocmVjaXBlcykpIHtcbiAgICBDb25zb2xlLmVycm9yKGVycm9yTXNnLndyb25nVHlwZSh0eXBlb2YocmVjaXBlcykpKTtcbiAgICByZXR1cm4gYXBwSW5qZWN0b3IuZ2V0KENvbnRhaW5lckZhY3RvcnkpO1xuICB9XG5cbiAgcmV0dXJuIHJlY2lwZXNcbiAgICAucmVkdWNlKChpbmosIHJlY2lwZSkgPT4ge1xuICAgICAgaWYgKCFBcnJheS5pc0FycmF5KHJlY2lwZXMpKSB7XG4gICAgICAgIENvbnNvbGUuZXJyb3IoZXJyb3JNc2cud3JvbmdQYWlyVHlwZSk7XG4gICAgICAgIHJldHVybiBpbmo7XG4gICAgICB9XG4gICAgICByZXR1cm4gaW5qLnByb3ZpZGUoLi4ucmVjaXBlKTtcbiAgICB9LCBhcHBJbmplY3RvcilcbiAgICAuZ2V0KENvbnRhaW5lckZhY3RvcnkpO1xufVxuXG5jb25zdCBJbmplY3RlZENvbnRhaW5lciA9IGFwcEluamVjdG9yLmdldChDb250YWluZXJGYWN0b3J5KTtcblxuZXhwb3J0IGRlZmF1bHQgSW5qZWN0ZWRDb250YWluZXI7XG4iXX0=