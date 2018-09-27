const ERR_DELETED = 'Query was deleted before result was available';
const ERR_CANCEL = 'Query was canceled before result was available';

const noop = x => x;

class QueryManager {
  constructor() {
    this.pendingQueries = new Set();
    this.invalidQueryType = null;
    this.invalidErrorMessage = '';

    this.checkInvalid = () => false;
  }

  poll(gl) {
    this.cancelInvalidQueries(gl);

    for (const query of this.pendingQueries.values()) {
      const resultAvailable = query.isResultAvailable();

      if (resultAvailable) {
        const result = query.getResult();
        this.resolveQuery(query, result);
      }
    }
  }

  setInvalidator({
    queryType,
    errorMessage,
    checkInvalid
  }) {
    this.invalidQueryType = queryType;
    this.invalidErrorMessage = errorMessage;
    this.checkInvalid = checkInvalid;
  }

  beginQuery(query, onComplete = noop, onError = noop) {
    this.cancelInvalidQueries(query.gl);
    this.cancelQuery(query);
    const resolvers = {};
    query.promise = new Promise((resolve, reject) => {
      resolvers.resolve = resolve;
      resolvers.reject = reject;
    });
    Object.assign(query.promise, resolvers);
    this.pendingQueries.add(query);
    return query.promise.then(onComplete).catch(onError);
  }

  resolveQuery(query, result) {
    this.pendingQueries.delete(query);
    query.promise.resolve(result);
  }

  rejectQuery(query, errorMessage) {
    this.pendingQueries.delete(query);

    if (query.promise) {
      query.promise.reject(new Error(errorMessage));
    }
  }

  deleteQuery(query) {
    return this.rejectQuery(query, ERR_DELETED);
  }

  cancelQuery(query) {
    return this.rejectQuery(query, ERR_CANCEL);
  }

  invalidateQuery(query) {
    if (query instanceof this.invalidQueryType) {
      this.rejectQuery(query, this.invalidErrorMessage);
    }
  }

  cancelInvalidQueries(gl) {
    if (this.checkInvalid(gl)) {
      for (const query of this.pendingQueries.values()) {
        this.invalidateQuery(query);
      }
    }
  }

}

export default new QueryManager();
//# sourceMappingURL=query-manager.js.map