
const { reverseMap } = require('../util');

class MapTranslator {
  constructor({ map }) {
    const reversedMap = reverseMap(map);
    this._cache = { ...map, ...reversedMap };
  }

  translate(v) {
    return this._cache[v];
  }

  static build({ map }) {
    return new MapTranslator({ map });
  }
}

module.exports = MapTranslator;
