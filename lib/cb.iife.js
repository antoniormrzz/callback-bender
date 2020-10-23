var callback_bender = (function () {
  function wrap_EFC(func) {
    return (...args) =>
      new Promise((res, rej) => {
        try {
          func(...args, error => (error ? rej(error) : res()));
        } catch (err) {
          rej(err);
        }
      });
  }
  
  function wrap_CP(func) {
    return (...args) =>
      new Promise((res, rej) => {
        try {
          func(...args, () => res());
        } catch (err) {
          rej(err);
        }
      });
  }
  
  function wrap_EFC_single(func) {
    return (...args) =>
      new Promise((res, rej) => {
        try {
          func(...args, (error, data) => (error ? rej(error) : res(data)));
        } catch (err) {
          rej(err);
        }
      });
  }
  
  function wrap_CP_single(func) {
    return (...args) =>
      new Promise((res, rej) => {
        try {
          func(...args, data => res(data));
        } catch (err) {
          rej(err);
        }
      });
  }
  
  function wrap_EFC_multiple(func, names = []) {
    return (...args) =>
      new Promise((res, rej) => {
        try {
          func(...args, (error, ...data) => {
            if (error) {
              rej(error);
            } else {
              let resultObj = {};
              data.forEach((d, i) => {
                resultObj[i > names.length - 1 ? i + 1 : names[i]] = d;
              });
              res(resultObj);
            }
          });
        } catch (err) {
          rej(err);
        }
      });
  }
  
  function wrap_CP_multiple(func, names = []) {
    return (...args) =>
      new Promise((res, rej) => {
        try {
          func(...args, (...data) => {
            let resultObj = {};
            data.forEach((d, i) => {
              resultObj[i > names.length - 1 ? i + 1 : names[i]] = d;
            });
            res(resultObj);
          });
        } catch (err) {
          rej(err);
        }
      });
  }

  return {
    efc: { multiple: wrap_EFC_multiple, single: wrap_EFC_single, none: wrap_EFC },
    node: { multiple: wrap_EFC_multiple, single: wrap_EFC_single, none: wrap_EFC },
    cp: { multiple: wrap_CP_multiple, single: wrap_CP_single, none: wrap_CP },
    normal: { multiple: wrap_CP_multiple, single: wrap_CP_single, none: wrap_CP }
  };
})();
