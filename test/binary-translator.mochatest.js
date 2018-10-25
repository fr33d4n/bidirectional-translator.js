
const { expect } = require('chai');
const rewire = require('rewire');

const Translator = rewire('../src/translator/binary-translator.js');

describe('Binary translator tests', () => {
  describe('constructor && build', () => {
    it('should throw error as an input dictionary has not been passed', () => {
      expect(Translator.build.bind(Translator)).to.throw();
    });

    it('should throw error as an input dictionary has not been passed (2)', () => {
      expect(Translator.build.bind(Translator, { })).to.throw();
    });

    it('should not throw error as an empty input dictionary has been passed', () => {
      expect(Translator.build.bind(Translator, { map: {} })).not.to.throw();
    });

    it('should not throw error as non empty input dictionary has been passed', () => {
      const map = {
        kek: 'lel',
      };
      expect(Translator.build.bind(Translator, { map })).not.to.throw();
    });
  });

  describe('_decomposeBinaryValue', () => {
    it('should decompose the value correctly', () => {
      const fn = Translator.__get__('_decomposeBinaryValue');
      expect(fn(0)).to.eql([]);
      expect(fn(1)).to.eql([1]);
      expect(fn(2)).to.eql([2]);
      expect(fn(3)).to.eql([1, 2]);
      expect(fn(4)).to.eql([4]);
      expect(fn(5)).to.eql([1, 4]);
      expect(fn(6)).to.eql([2, 4]);
      expect(fn(7)).to.eql([1, 2, 4]);
      expect(fn(8)).to.eql([8]);
      expect(fn(9)).to.eql([1, 8]);
      expect(fn(10)).to.eql([2, 8]);
    });
  });

  describe('translate', () => {
    const map = {
      accepted: 1,
      published: 2,
      read: 4,
      burned: 8
    };

    let t;
    beforeEach(() => {
      t = Translator.build({ map });
    });

    it('should translate binary values correctly', () => {
      expect(t.translate(1)).to.eql(['accepted']);
      expect(t.translate(2)).to.eql(['published']);
      expect(t.translate(3)).to.eql(['accepted', 'published']);
      expect(t.translate(4)).to.eql(['read']);
      expect(t.translate(5)).to.eql(['accepted', 'read']);
      expect(t.translate(7)).to.eql(['accepted', 'published', 'read']);
      expect(t.translate(8)).to.eql(['burned']);
    });

    it('should translate strings into binary values, aggregating those', () => {
      expect(t.translate('accepted')).to.be.equal(1);
      expect(t.translate(['accepted'])).to.be.equal(1);
      expect(t.translate(['accepted', 'published'])).to.be.equal(3);
      expect(t.translate(['accepted', 'published', 'read'])).to.be.equal(7);
    });
  });
});
