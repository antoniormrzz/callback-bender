const bend = require('../index');

describe('Converters', () => {
  test('should convert efc with no return', done => {
    const efcfunction1 = (a, b, c, efc) => {
      setTimeout(() => {
        efc(undefined);
      }, 100);
    };

    return bend.efc
      .none(efcfunction1)(1, 2, 3)
      .then(() => {
        done();
      });
  });

  test('should convert efc with no return 2', done => {
    const efcfunction2 = efc => {
      setTimeout(() => {
        efc(undefined);
      }, 100);
    };
    return bend.efc
      .none(efcfunction2)()
      .then(() => {
        done();
      });
  });

  test('should convert efc with single return', async () => {
    const efcfunction1 = (a, b, c, efc) => {
      setTimeout(() => {
        efc(undefined, a + b + c);
      }, 100);
    };
    const efcfunction2 = efc => {
      setTimeout(() => {
        efc(undefined, 6);
      }, 100);
    };

    expect(await bend.efc.single(efcfunction1)(1, 2, 3)).toEqual(6);
    expect(await bend.efc.single(efcfunction2)()).toEqual(6);
  });

  test('should convert efc with multiple return', async () => {
    const efcfunction1 = (a, b, c, efc) => {
      setTimeout(() => {
        efc(undefined, a + b + c, b);
      }, 100);
    };
    const efcfunction2 = efc => {
      setTimeout(() => {
        efc(undefined, 6, 2);
      }, 100);
    };

    expect(await bend.efc.multiple(efcfunction1)(1, 2, 3)).toEqual({ 1: 6, 2: 2 });
    expect(await bend.efc.multiple(efcfunction2)()).toEqual({ 1: 6, 2: 2 });
    expect(await bend.efc.multiple(efcfunction1, ['first', 'second'])(1, 2, 3)).toEqual({
      first: 6,
      second: 2
    });
    expect(await bend.efc.multiple(efcfunction2, ['first'])()).toEqual({ first: 6, 2: 2 });
    expect(await bend.efc.multiple(efcfunction2, ['first', 'second', 'third'])()).toEqual({
      first: 6,
      second: 2
    });
    expect(await bend.efc.multiple(efcfunction2, [])()).toEqual({ 1: 6, 2: 2 });
  });

  test('should convert efc with no return, error', done => {
    const efcfunction1 = (a, b, c, efc) => {
      setTimeout(() => {
        efc(1);
      }, 100);
    };

    return bend.efc
      .none(efcfunction1)(1, 2, 3)
      .then()
      .catch(e => {
        done();
      });
  });

  test('should convert efc with no return 2, error', done => {
    const efcfunction2 = efc => {
      setTimeout(() => {
        efc(1);
      }, 100);
    };
    return bend.efc
      .none(efcfunction2)()
      .then()
      .catch(e => {
        done();
      });
  });

  test('should convert efc with single return, error', () => {
    const efcfunction1 = (a, b, c, efc) => {
      setTimeout(() => {
        efc(1);
      }, 100);
    };

    bend.efc
      .single(efcfunction1)(1, 2, 3)
      .then()
      .catch(e => expect(e).toEqual(1));
  });

  test('should convert efc with multiple return, error', () => {
    const efcfunction1 = (a, b, c, efc) => {
      setTimeout(() => {
        efc(1);
      }, 100);
    };

    bend.efc
      .multiple(efcfunction1)(1, 2, 3)
      .then()
      .catch(e => expect(e).toEqual(1));
  });

  test('should convert cp with no return', done => {
    const cpfunction1 = (a,b,c,cp) => {
      setTimeout(() => {
        cp();
      }, 100);
    };
    return bend.cp
      .none(cpfunction1)(1, 2, 3)
      .then(() => {
        done();
      });
  });

  test('should convert cp with no return 2', done => {
    const cpfunction2 = cp => {
      setTimeout(() => {
        cp();
      }, 100);
    };
    return bend.cp
      .none(cpfunction2)()
      .then(() => {
        done();
      });
  });

  test('should convert cp with single return', async () => {
    const cpfunction1 = (a, b, c, cp) => {
      setTimeout(() => {
        cp(a + b + c);
      }, 100);
    };
    const cpfunction2 = cp => {
      setTimeout(() => {
        cp(6);
      }, 100);
    };

    expect(await bend.cp.single(cpfunction1)(1, 2, 3)).toEqual(6);
    expect(await bend.cp.single(cpfunction2)()).toEqual(6);
  });

  test('should convert cp with multiple return', async () => {
    const cpfunction1 = (a, b, c, cp) => {
      setTimeout(() => {
        cp(a + b + c, b);
      }, 100);
    };
    const cpfunction2 = cp => {
      setTimeout(() => {
        cp(6, 2);
      }, 100);
    };

    expect(await bend.cp.multiple(cpfunction1)(1, 2, 3)).toEqual({ 1: 6, 2: 2 });
    expect(await bend.cp.multiple(cpfunction2)()).toEqual({ 1: 6, 2: 2 });
    expect(await bend.cp.multiple(cpfunction1, ['first', 'second'])(1, 2, 3)).toEqual({
      first: 6,
      second: 2
    });
    expect(await bend.cp.multiple(cpfunction2, ['first'])()).toEqual({ first: 6, 2: 2 });
    expect(await bend.cp.multiple(cpfunction2, ['first', 'second', 'third'])()).toEqual({
      first: 6,
      second: 2
    });
    expect(await bend.cp.multiple(cpfunction2, [])()).toEqual({ 1: 6, 2: 2 });
  });
});
