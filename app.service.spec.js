const { isCapitalUniCode, getUniCodeIfSmallThanCapitalElseOrigin } = require('./app.service');

const getUniCode = char => char.charCodeAt(0);

describe('app.service', () => {
  describe('isCapitalUniCode', () => {
    it('should return true', () => {
      expect.assertions(3);
      expect(isCapitalUniCode(getUniCode('A'))).toBe(true);
      expect(isCapitalUniCode(getUniCode('F'))).toBe(true);
      expect(isCapitalUniCode(getUniCode('Z'))).toBe(true);
    });

    it('should return false', () => {
      expect.assertions(3);
      expect(isCapitalUniCode(getUniCode('#'))).toBe(false);
      expect(isCapitalUniCode(getUniCode('a'))).toBe(false);
      expect(isCapitalUniCode(getUniCode('3'))).toBe(false);
    });
  });

  describe('getUniCodeIfSmallThanCapitalElseOrigin', () => {
    it('should be the same', () => {
      expect.assertions(4);
      expect(getUniCodeIfSmallThanCapitalElseOrigin(getUniCode('a'))).toBe(getUniCode('A'));
      expect(getUniCodeIfSmallThanCapitalElseOrigin(getUniCode('A'))).toBe(getUniCode('A'));
      expect(getUniCodeIfSmallThanCapitalElseOrigin(getUniCode('z'))).toBe(getUniCode('Z'));
      expect(getUniCodeIfSmallThanCapitalElseOrigin(getUniCode('Z'))).toBe(getUniCode('Z'));
    });

    it('should not be the same', () => {
      expect.assertions(4);
      expect(getUniCodeIfSmallThanCapitalElseOrigin(getUniCode('A'))).not.toBe(getUniCode('a'));
      expect(getUniCodeIfSmallThanCapitalElseOrigin(getUniCode('Z'))).not.toBe(getUniCode('z'));
      expect(getUniCodeIfSmallThanCapitalElseOrigin(getUniCode('a'))).not.toBe(getUniCode('a'));
      expect(getUniCodeIfSmallThanCapitalElseOrigin(getUniCode('z'))).not.toBe(getUniCode('z'));
    });

  });
});
