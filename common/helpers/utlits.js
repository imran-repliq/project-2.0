export function deferred() {
  let _deferred = {};
  _deferred.promise = new Promise(function (resolve, reject) {
    _deferred.resolve = resolve;
    _deferred.reject = reject;
  });
  return _deferred;
}

export const pathNameFInder = (path, routes) => {
  const pathFInd = routes.find((item) => item.route === path);
  return pathFInd;
};
