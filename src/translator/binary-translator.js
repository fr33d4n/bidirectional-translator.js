

function isNumber(n) { return !Number.isNaN(parseFloat(n, 10)) && Number.isFinite(n); }

function _decomposeBinaryValue(v) {
  const result = [];
  let i = 1;
  while (i <= v) {
    if (i & v) { /* eslint-disable-line no-bitwise */
      result.push(i);
    }
    i <<= 1; /* eslint-disable-line no-bitwise */
  }
  return result;
}

function _findValueMatch(value, mapKeys, cache) {
  let i;
  for (i = 0; i < mapKeys.length; i++) {
    if (value == mapKeys[i]) return cache[mapKeys[i]];
    if (value == cache[mapKeys[i]]) return mapKeys[i];
  }
}

class BinaryTranslator {
  constructor({ map }) {
    this._cache = map;
    this._mapKeys = Object.keys(map);
  }

  translate(v) {
    if (this._cache[v]) return this._cache[v];

    if (isNumber(v)) {
      const res = _decomposeBinaryValue(v).map(i => _findValueMatch(i, this._mapKeys, this._cache));
      this._cache[v] = res;
      return res;
    }

    let strArray = v;
    if (!Array.isArray(v)) {
      strArray = [v];
    }

    const res = strArray
      .map(m => _findValueMatch(m, this._mapKeys, this._cache))
      .reduce((p, c) => parseInt(p, 10) + parseInt(c, 10));
    this._cache[v] = res;
    return res;
  }

  static build({ map }) {
    return new BinaryTranslator({ map });
  }
}

module.exports = BinaryTranslator;
