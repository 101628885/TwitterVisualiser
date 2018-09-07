'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends4 = require('babel-runtime/helpers/extends');

var _extends5 = _interopRequireDefault(_extends4);

exports.provideInitialState = provideInitialState;

var _reduxActions = require('redux-actions');

var _actionWrapper = require('../actions/action-wrapper');

var _core = require('./core');

var _identityActions = require('../actions/identity-actions');

var _actions = require('../actions/actions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * voyager reducer wrapper,
 * wraps multiple voyager state in one voyager
 */

// INITIAL_STATE
var initialCoreState = {}; // Copyright (c) 2018 Uber Technologies, Inc.
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

function provideInitialState(initialState) {
  var coreReducer = (0, _core.coreReducerFactory)(initialState);

  var handleRegisterEntry = function handleRegisterEntry(state, _ref) {
    var _ref$payload = _ref.payload,
        id = _ref$payload.id,
        mint = _ref$payload.mint,
        mapboxApiAccessToken = _ref$payload.mapboxApiAccessToken;
    return (0, _extends5.default)({}, state, (0, _defineProperty3.default)({}, id, state[id] && mint === false ? state[id] : (0, _extends5.default)({}, coreReducer(undefined, (0, _actions.keplerGlInit)({ mapboxApiAccessToken: mapboxApiAccessToken })))));
  };

  var handleDeleteEntry = function handleDeleteEntry(state, _ref2) {
    var id = _ref2.payload;
    return Object.keys(state).reduce(function (accu, curr) {
      return (0, _extends5.default)({}, accu, curr === id ? {} : (0, _defineProperty3.default)({}, curr, state[curr]));
    }, {});
  };

  var handleRenameEntry = function handleRenameEntry(state, _ref4) {
    var _ref4$payload = (0, _slicedToArray3.default)(_ref4.payload, 2),
        oldId = _ref4$payload[0],
        newId = _ref4$payload[1];

    return Object.keys(state).reduce(function (accu, curr) {
      return (0, _extends5.default)({}, accu, (0, _defineProperty3.default)({}, curr === oldId ? newId : curr, state[curr]));
    }, {});
  };

  return function () {
    var _handleActions;

    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialCoreState;
    var action = arguments[1];

    // update child states
    Object.keys(state).forEach(function (id) {
      var updateItemState = coreReducer(state[id], (0, _actionWrapper.actionFor)(id, action));
      state = (0, _actionWrapper.updateProperty)(state, id, updateItemState);
    });

    // perform additional state reducing (e.g. switch action.type etc...)
    return (0, _reduxActions.handleActions)((_handleActions = {}, (0, _defineProperty3.default)(_handleActions, _identityActions.REGISTER_ENTRY, handleRegisterEntry), (0, _defineProperty3.default)(_handleActions, _identityActions.DELETE_ENTRY, handleDeleteEntry), (0, _defineProperty3.default)(_handleActions, _identityActions.RENAME_ENTRY, handleRenameEntry), _handleActions), initialCoreState)(state, action);
  };
}

var keplerGlReducer = provideInitialState();

function mergeInitialState() {
  var saved = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var provided = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var keys = ['mapState', 'mapStyle', 'visState', 'uiState'];

  // shallow merge each reducer
  return keys.reduce(function (accu, key) {
    return (0, _extends5.default)({}, accu, saved[key] && provided[key] ? (0, _defineProperty3.default)({}, key, (0, _extends5.default)({}, saved[key], provided[key])) : (0, _defineProperty3.default)({}, key, saved[key] || provided[key] || {}));
  }, {});
}

function decorate(target) {
  var savedInitialState = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var targetInitialState = savedInitialState;

  // plugin to core reducer
  target.plugin = function plugin(customReducer) {
    var _this = this;

    if ((typeof customReducer === 'undefined' ? 'undefined' : (0, _typeof3.default)(customReducer)) === 'object') {
      // if only provided a reducerMap, wrap it in a reducer
      customReducer = (0, _reduxActions.handleActions)(customReducer, {});
    }

    // use 'function' keyword to enable 'this'
    return decorate(function () {
      var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      var nextState = _this(state, action);

      // for each entry in the staten
      Object.keys(nextState).forEach(function (id) {
        // update child states
        nextState = (0, _actionWrapper.updateProperty)(nextState, id, customReducer(nextState[id], (0, _actionWrapper.actionFor)(id, action)));
      });

      return nextState;
    });
  };

  // pass in initialState for reducer slices
  // e.g. initialState = {uiState: {currentModal : null}}
  target.initialState = function initialState(iniSt) {
    var merged = mergeInitialState(targetInitialState, iniSt);
    var targetReducer = provideInitialState(merged);

    return decorate(targetReducer, merged);
  };

  return target;
}

exports.default = decorate(keplerGlReducer);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9yZWR1Y2Vycy9yb290LmpzIl0sIm5hbWVzIjpbInByb3ZpZGVJbml0aWFsU3RhdGUiLCJpbml0aWFsQ29yZVN0YXRlIiwiaW5pdGlhbFN0YXRlIiwiY29yZVJlZHVjZXIiLCJoYW5kbGVSZWdpc3RlckVudHJ5Iiwic3RhdGUiLCJwYXlsb2FkIiwiaWQiLCJtaW50IiwibWFwYm94QXBpQWNjZXNzVG9rZW4iLCJ1bmRlZmluZWQiLCJoYW5kbGVEZWxldGVFbnRyeSIsIk9iamVjdCIsImtleXMiLCJyZWR1Y2UiLCJhY2N1IiwiY3VyciIsImhhbmRsZVJlbmFtZUVudHJ5Iiwib2xkSWQiLCJuZXdJZCIsImFjdGlvbiIsImZvckVhY2giLCJ1cGRhdGVJdGVtU3RhdGUiLCJSRUdJU1RFUl9FTlRSWSIsIkRFTEVURV9FTlRSWSIsIlJFTkFNRV9FTlRSWSIsImtlcGxlckdsUmVkdWNlciIsIm1lcmdlSW5pdGlhbFN0YXRlIiwic2F2ZWQiLCJwcm92aWRlZCIsImtleSIsImRlY29yYXRlIiwidGFyZ2V0Iiwic2F2ZWRJbml0aWFsU3RhdGUiLCJ0YXJnZXRJbml0aWFsU3RhdGUiLCJwbHVnaW4iLCJjdXN0b21SZWR1Y2VyIiwibmV4dFN0YXRlIiwiaW5pU3QiLCJtZXJnZWQiLCJ0YXJnZXRSZWR1Y2VyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1FBd0NnQkEsbUIsR0FBQUEsbUI7O0FBcEJoQjs7QUFFQTs7QUFDQTs7QUFFQTs7QUFNQTs7OztBQUNBOzs7OztBQUtBO0FBQ0EsSUFBTUMsbUJBQW1CLEVBQXpCLEMsQ0F0Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBc0JPLFNBQVNELG1CQUFULENBQTZCRSxZQUE3QixFQUEyQztBQUNoRCxNQUFNQyxjQUFjLDhCQUFtQkQsWUFBbkIsQ0FBcEI7O0FBRUEs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IChjKSAyMDE4IFViZXIgVGVjaG5vbG9naWVzLCBJbmMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuLy8gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuLy8gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuLy8gdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuLy8gY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4vLyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4vLyBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4vLyBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbi8vIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuLy8gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuLy8gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbi8vIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbi8vIFRIRSBTT0ZUV0FSRS5cblxuaW1wb3J0IHtoYW5kbGVBY3Rpb25zfSBmcm9tICdyZWR1eC1hY3Rpb25zJztcblxuaW1wb3J0IHthY3Rpb25Gb3IsIHVwZGF0ZVByb3BlcnR5fSBmcm9tICcuLi9hY3Rpb25zL2FjdGlvbi13cmFwcGVyJztcbmltcG9ydCB7Y29yZVJlZHVjZXJGYWN0b3J5fSBmcm9tICcuL2NvcmUnO1xuXG5pbXBvcnQge1xuICBSRUdJU1RFUl9FTlRSWSxcbiAgREVMRVRFX0VOVFJZLFxuICBSRU5BTUVfRU5UUllcbn0gZnJvbSAnLi4vYWN0aW9ucy9pZGVudGl0eS1hY3Rpb25zJztcblxuaW1wb3J0IHtrZXBsZXJHbEluaXR9IGZyb20gJy4uL2FjdGlvbnMvYWN0aW9ucyc7XG4vKlxuICogdm95YWdlciByZWR1Y2VyIHdyYXBwZXIsXG4gKiB3cmFwcyBtdWx0aXBsZSB2b3lhZ2VyIHN0YXRlIGluIG9uZSB2b3lhZ2VyXG4gKi9cblxuLy8gSU5JVElBTF9TVEFURVxuY29uc3QgaW5pdGlhbENvcmVTdGF0ZSA9IHt9O1xuXG5leHBvcnQgZnVuY3Rpb24gcHJvdmlkZUluaXRpYWxTdGF0ZShpbml0aWFsU3RhdGUpIHtcbiAgY29uc3QgY29yZVJlZHVjZXIgPSBjb3JlUmVkdWNlckZhY3RvcnkoaW5pdGlhbFN0YXRlKTtcblxuICBjb25zdCBoYW5kbGVSZWdpc3RlckVudHJ5ID0gKHN0YXRlLCB7cGF5bG9hZDoge2lkLCBtaW50LCBtYXBib3hBcGlBY2Nlc3NUb2tlbn19KSA9PiAoe1xuICAgIC8vIHJlZ2lzdGVyIGEgbmV3IGVudHJ5IHRvIHZveWFnZXIgcmVkdWNlclxuICAgIC8vIGJ5IGRlZmF1bHQsIGFsd2F5cyBjcmVhdGUgYSBtaW50IHN0YXRlIGV2ZW4gaWYgdGhlIHNhbWUgaWQgYWxyZWFkeSBleGlzdFxuICAgIC8vIGlmIHN0YXRlLmlkIGV4aXN0IGFuZCBtaW50PWZhbHNlLCBrZWVwIHRoZSBleGlzdGluZyBzdGF0ZVxuICAgIC4uLnN0YXRlLFxuICAgIFtpZF06IHN0YXRlW2lkXSAmJiBtaW50ID09PSBmYWxzZSA/IHN0YXRlW2lkXSA6IHtcbiAgICAgIC4uLmNvcmVSZWR1Y2VyKHVuZGVmaW5lZCwga2VwbGVyR2xJbml0KHttYXBib3hBcGlBY2Nlc3NUb2tlbn0pKVxuICAgIH1cbiAgfSk7XG5cbiAgY29uc3QgaGFuZGxlRGVsZXRlRW50cnkgPSAoc3RhdGUsIHtwYXlsb2FkOiBpZH0pID0+XG4gICAgT2JqZWN0LmtleXMoc3RhdGUpLnJlZHVjZShcbiAgICAgIChhY2N1LCBjdXJyKSA9PiAoe1xuICAgICAgICAuLi5hY2N1LFxuICAgICAgICAuLi4oY3VyciA9PT0gaWQgPyB7fSA6IHtbY3Vycl06IHN0YXRlW2N1cnJdfSlcbiAgICAgIH0pLFxuICAgICAge31cbiAgICApO1xuXG4gIGNvbnN0IGhhbmRsZVJlbmFtZUVudHJ5ID0gKHN0YXRlLCB7cGF5bG9hZDogW29sZElkLCBuZXdJZF19KSA9PlxuICAgIE9iamVjdC5rZXlzKHN0YXRlKS5yZWR1Y2UoXG4gICAgICAoYWNjdSwgY3VycikgPT4gKHtcbiAgICAgICAgLi4uYWNjdSxcbiAgICAgICAgLi4ue1tjdXJyID09PSBvbGRJZCA/IG5ld0lkIDogY3Vycl06IHN0YXRlW2N1cnJdfVxuICAgICAgfSksXG4gICAgICB7fVxuICAgICk7XG5cbiAgcmV0dXJuIChzdGF0ZSA9IGluaXRpYWxDb3JlU3RhdGUsIGFjdGlvbikgPT4ge1xuICAgIC8vIHVwZGF0ZSBjaGlsZCBzdGF0ZXNcbiAgICBPYmplY3Qua2V5cyhzdGF0ZSkuZm9yRWFjaChpZCA9PiB7XG4gICAgICBjb25zdCB1cGRhdGVJdGVtU3RhdGUgPSBjb3JlUmVkdWNlcihzdGF0ZVtpZF0sIGFjdGlvbkZvcihpZCwgYWN0aW9uKSk7XG4gICAgICBzdGF0ZSA9IHVwZGF0ZVByb3BlcnR5KHN0YXRlLCBpZCwgdXBkYXRlSXRlbVN0YXRlKTtcbiAgICB9KTtcblxuICAgIC8vIHBlcmZvcm0gYWRkaXRpb25hbCBzdGF0ZSByZWR1Y2luZyAoZS5nLiBzd2l0Y2ggYWN0aW9uLnR5cGUgZXRjLi4uKVxuICAgIHJldHVybiBoYW5kbGVBY3Rpb25zKFxuICAgICAge1xuICAgICAgICBbUkVHSVNURVJfRU5UUlldOiBoYW5kbGVSZWdpc3RlckVudHJ5LFxuICAgICAgICBbREVMRVRFX0VOVFJZXTogaGFuZGxlRGVsZXRlRW50cnksXG4gICAgICAgIFtSRU5BTUVfRU5UUlldOiBoYW5kbGVSZW5hbWVFbnRyeVxuICAgICAgfSxcbiAgICAgIGluaXRpYWxDb3JlU3RhdGVcbiAgICApKHN0YXRlLCBhY3Rpb24pO1xuICB9O1xufVxuXG5jb25zdCBrZXBsZXJHbFJlZHVjZXIgPSBwcm92aWRlSW5pdGlhbFN0YXRlKCk7XG5cbmZ1bmN0aW9uIG1lcmdlSW5pdGlhbFN0YXRlKHNhdmVkID0ge30sIHByb3ZpZGVkID0ge30pIHtcbiAgY29uc3Qga2V5cyA9IFsnbWFwU3RhdGUnLCAnbWFwU3R5bGUnLCAndmlzU3RhdGUnLCAndWlTdGF0ZSddO1xuXG4gIC8vIHNoYWxsb3cgbWVyZ2UgZWFjaCByZWR1Y2VyXG4gIHJldHVybiBrZXlzLnJlZHVjZSgoYWNjdSwga2V5KSA9PiAoe1xuICAgIC4uLmFjY3UsXG4gICAgLi4uKHNhdmVkW2tleV0gJiYgcHJvdmlkZWRba2V5XSA/XG4gICAgICAgIHtba2V5XTogey4uLnNhdmVkW2tleV0sIC4uLnByb3ZpZGVkW2tleV19fSA6XG4gICAgICAgIHtba2V5XTogc2F2ZWRba2V5XSB8fCBwcm92aWRlZFtrZXldIHx8IHt9fSlcbiAgfSksIHt9KTtcbn1cblxuZnVuY3Rpb24gZGVjb3JhdGUodGFyZ2V0LCBzYXZlZEluaXRpYWxTdGF0ZSA9IHt9KSB7XG4gIGNvbnN0IHRhcmdldEluaXRpYWxTdGF0ZSA9IHNhdmVkSW5pdGlhbFN0YXRlO1xuXG4gIC8vIHBsdWdpbiB0byBjb3JlIHJlZHVjZXJcbiAgdGFyZ2V0LnBsdWdpbiA9IGZ1bmN0aW9uIHBsdWdpbihjdXN0b21SZWR1Y2VyKSB7XG4gICAgaWYgKHR5cGVvZiBjdXN0b21SZWR1Y2VyID09PSAnb2JqZWN0Jykge1xuICAgICAgLy8gaWYgb25seSBwcm92aWRlZCBhIHJlZHVjZXJNYXAsIHdyYXAgaXQgaW4gYSByZWR1Y2VyXG4gICAgICBjdXN0b21SZWR1Y2VyID0gaGFuZGxlQWN0aW9ucyhjdXN0b21SZWR1Y2VyLCB7fSk7XG4gICAgfVxuXG4gICAgLy8gdXNlICdmdW5jdGlvbicga2V5d29yZCB0byBlbmFibGUgJ3RoaXMnXG4gICAgcmV0dXJuIGRlY29yYXRlKChzdGF0ZSA9IHt9LCBhY3Rpb24gPSB7fSkgPT4ge1xuICAgICAgbGV0IG5leHRTdGF0ZSA9IHRoaXMoc3RhdGUsIGFjdGlvbik7XG5cbiAgICAgIC8vIGZvciBlYWNoIGVudHJ5IGluIHRoZSBzdGF0ZW5cbiAgICAgIE9iamVjdC5rZXlzKG5leHRTdGF0ZSkuZm9yRWFjaChpZCA9PiB7XG4gICAgICAgIC8vIHVwZGF0ZSBjaGlsZCBzdGF0ZXNcbiAgICAgICAgbmV4dFN0YXRlID0gdXBkYXRlUHJvcGVydHkoXG4gICAgICAgICAgbmV4dFN0YXRlLFxuICAgICAgICAgIGlkLFxuICAgICAgICAgIGN1c3RvbVJlZHVjZXIobmV4dFN0YXRlW2lkXSwgYWN0aW9uRm9yKGlkLCBhY3Rpb24pKVxuICAgICAgICApO1xuICAgICAgfSk7XG5cbiAgICAgIHJldHVybiBuZXh0U3RhdGU7XG4gICAgfSk7XG4gIH07XG5cbiAgLy8gcGFzcyBpbiBpbml0aWFsU3RhdGUgZm9yIHJlZHVjZXIgc2xpY2VzXG4gIC8vIGUuZy4gaW5pdGlhbFN0YXRlID0ge3VpU3RhdGU6IHtjdXJyZW50TW9kYWwgOiBudWxsfX1cbiAgdGFyZ2V0LmluaXRpYWxTdGF0ZSA9IGZ1bmN0aW9uIGluaXRpYWxTdGF0ZShpbmlTdCkge1xuICAgIGNvbnN0IG1lcmdlZCA9IG1lcmdlSW5pdGlhbFN0YXRlKHRhcmdldEluaXRpYWxTdGF0ZSwgaW5pU3QpO1xuICAgIGNvbnN0IHRhcmdldFJlZHVjZXIgPSBwcm92aWRlSW5pdGlhbFN0YXRlKG1lcmdlZCk7XG5cbiAgICByZXR1cm4gZGVjb3JhdGUodGFyZ2V0UmVkdWNlciwgbWVyZ2VkKTtcbiAgfVxuXG4gIHJldHVybiB0YXJnZXQ7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGRlY29yYXRlKGtlcGxlckdsUmVkdWNlcik7XG4iXX0=