function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ERR_DELETED = 'Query was deleted before result was available';
var ERR_CANCEL = 'Query was canceled before result was available';

var noop = function noop(x) {
  return x;
};

var QueryManager = function () {
  function QueryManager() {
    _classCallCheck(this, QueryManager);

    this.pendingQueries = new Set();
    this.invalidQueryType = null;
    this.invalidErrorMessage = '';

    this.checkInvalid = function () {
      return false;
    };
  }

  _createClass(QueryManager, [{
    key: "poll",
    value: function poll(gl) {
      this.cancelInvalidQueries(gl);
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.pendingQueries.values()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var query = _step.value;
          var resultAvailable = query.isResultAvailable();

          if (resultAvailable) {
            var result = query.getResult();
            this.resolveQuery(query, result);
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return != null) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }
  }, {
    key: "setInvalidator",
    value: function setInvalidator(_ref) {
      var queryType = _ref.queryType,
          errorMessage = _ref.errorMessage,
          checkInvalid = _ref.checkInvalid;
      this.invalidQueryType = queryType;
      this.invalidErrorMessage = errorMessage;
      this.checkInvalid = checkInvalid;
    }
  }, {
    key: "beginQuery",
    value: function beginQuery(query) {
      var onComplete = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noop;
      var onError = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : noop;
      this.cancelInvalidQueries(query.gl);
      this.cancelQuery(query);
      var resolvers = {};
      query.promise = new Promise(function (resolve, reject) {
        resolvers.resolve = resolve;
        resolvers.reject = reject;
      });
      Object.assign(query.promise, resolvers);
      this.pendingQueries.add(query);
      return query.promise.then(onComplete).catch(onError);
    }
  }, {
    key: "resolveQuery",
    value: function resolveQuery(query, result) {
      this.pendingQueries.delete(query);
      query.promise.resolve(result);
    }
  }, {
    key: "rejectQuery",
    value: function rejectQuery(query, errorMessage) {
      this.pendingQueries.delete(query);

      if (query.promise) {
        query.promise.reject(new Error(errorMessage));
      }
    }
  }, {
    key: "deleteQuery",
    value: function deleteQuery(query) {
      return this.rejectQuery(query, ERR_DELETED);
    }
  }, {
    key: "cancelQuery",
    value: function cancelQuery(query) {
      return this.rejectQuery(query, ERR_CANCEL);
    }
  }, {
    key: "invalidateQuery",
    value: function invalidateQuery(query) {
      if (query instanceof this.invalidQueryType) {
        this.rejectQuery(query, this.invalidErrorMessage);
      }
    }
  }, {
    key: "cancelInvalidQueries",
    value: function cancelInvalidQueries(gl) {
      if (this.checkInvalid(gl)) {
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = this.pendingQueries.values()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var query = _step2.value;
            this.invalidateQuery(query);
          }
        } catch (err) {
          _didIteratorError2 = true;
          _iteratorError2 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
              _iterator2.return();
            }
          } finally {
            if (_didIteratorError2) {
              throw _iteratorError2;
            }
          }
        }
      }
    }
  }]);

  return QueryManager;
}();

export default new QueryManager();
//# sourceMappingURL=query-manager.js.map