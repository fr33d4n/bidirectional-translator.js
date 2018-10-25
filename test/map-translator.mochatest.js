
const { expect } = require('chai');

const Translator = require('../src/translator/map-translator');

describe('String translator tests', () => {
  describe('constructor && build', () => {
    it('should not throw error as an empty input dictionary has been passed', () => {
      const map = {};
      expect(Translator.build.bind(Translator, { map })).not.to.throw();
    });

    it('should not throw error as non empty input dictionary has been passed', () => {
      const map = {
        kek: 'lel',
      };
      expect(Translator.build.bind(Translator, { map })).not.to.throw();
    });

    it('should preheat the cache', () => {
      const map = {
        kek: 'lel',
        meh: null,
        fuu: 'flip'
      };

      const t = Translator.build({ map });
      expect(t._cache).to.be.eql({
        kek: 'lel',
        meh: null,
        fuu: 'flip',
        lel: 'kek',
        null: 'meh',
        flip: 'fuu',
      });
    });
  });

  describe('translate', () => {
    it('should translate the same way of the dict', () => {
      const map = {
        kek: 'lol',
        meh: 'brrr',
      };
      const trans = Translator.build({ map });

      expect(trans.translate('kek')).to.be.equal('lol');
    });

    it('should work with null values as well', () => {
      const map = {
        kek: 'lol',
        meh: 'brrr',
        fuu: null
      };
      const trans = Translator.build({ map });

      expect(trans.translate('fuu')).to.be.a('null');
    });

    it('should reverse translate', () => {
      const map = {
        kek: 'lol',
        meh: 'brrr',
        fuu: null
      };
      const trans = Translator.build({ map });

      expect(trans.translate(null)).to.be.equal('fuu');
    });
  });
});
