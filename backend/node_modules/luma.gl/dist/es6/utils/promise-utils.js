export function promisify(func) {
  return function promisifiedFunction(...args) {
    return new Promise((resolve, reject) => {
      function callback(error, data) {
        try {
          if (error) {
            reject(error);
          } else {
            resolve(data);
          }
        } catch (e) {
          reject(e);
        }
      }

      func(...args, callback);
    });
  };
}
//# sourceMappingURL=promise-utils.js.map