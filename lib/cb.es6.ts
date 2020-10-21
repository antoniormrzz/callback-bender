function wrap_EFC(func: Function) {
  return (...args) =>
    new Promise((res, rej) => {
      try {
        let params = args ? [...args] : [];
        params.push(error => {
          if (error) {
            rej(error);
          } else {
            res();
          }
        });
        func(...params);
      } catch (err) {
        rej(err);
      }
    });
}

function wrap_CP(func: Function) {
  return (...args) =>
    new Promise((res, rej) => {
      try {
        let params = args ? [...args] : [];
        params.push(() => {
          res();
        });
        func(...params);
      } catch (err) {
        rej(err);
      }
    });
}

function wrap_EFC_single(func: Function) {
  return (...args) =>
    new Promise((res, rej) => {
      try {
        let params = args ? [...args] : [];
        params.push((error, data) => {
          if (error) {
            rej(error);
          } else {
            res(data);
          }
        });
        func(...params);
      } catch (err) {
        rej(err);
      }
    });
}

function wrap_CP_single(func: Function) {
  return (...args) =>
    new Promise((res, rej) => {
      try {
        let params = args ? [...args] : [];
        params.push(data => {
          res(data);
        });
        func(...params);
      } catch (err) {
        rej(err);
      }
    });
}

function wrap_EFC_multiple(func: Function, names = []) {
  return (...args) =>
    new Promise((res, rej) => {
      try {
        let params = args ? [...args] : [];
        params.push((error, ...data) => {
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
        func(...params);
      } catch (err) {
        rej(err);
      }
    });
}

function wrap_CP_multiple(func: Function, names = []) {
  return (...args) =>
    new Promise((res, rej) => {
      try {
        let params = args ? [...args] : [];
        params.push((...data) => {
          let resultObj = {};
          data.forEach((d, i) => {
            resultObj[i > names.length - 1 ? i + 1 : names[i]] = d;
          });
          res(resultObj);
        });
        func(...params);
      } catch (err) {
        rej(err);
      }
    });
}

export default {
  efc: { multiple: wrap_EFC_multiple, single: wrap_EFC_single, none: wrap_EFC },
  node: { multiple: wrap_EFC_multiple, single: wrap_EFC_single, none: wrap_EFC },
  cp: { multiple: wrap_CP_multiple, single: wrap_CP_single, none: wrap_CP },
  normal: { multiple: wrap_CP_multiple, single: wrap_CP_single, none: wrap_CP }
};
