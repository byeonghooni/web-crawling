const { isCapitalUniCode, getUniCodeIfSmallThanCapitalElseOrigin, getSortedAlphabetArray, getBlankRemovedText } = require('./app.service');

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

  describe('getSortedAlphabetArray', () => {
    let inputText;
    let result;

    it('should return sorted alphabet array - first check', () => {
      expect.assertions(1);
      inputText = 'aegxAdw23!@AfBFwfW';
      result = ['A', 'A', 'a', 'B', 'd', 'e', 'F', 'f', 'f', 'g', 'W', 'w', 'w', 'x'];
      expect(getSortedAlphabetArray(inputText)).toStrictEqual(result);
    });

    it('should return sorted alphabet array - second check', () => {
      expect.assertions(1);
      inputText = '12!$FEWas3412ERGxf';
      result = ['a', 'E', 'E', 'F', 'f', 'G', 'R', 's', 'W', 'x'];
      expect(getSortedAlphabetArray(inputText)).toStrictEqual(result);
    });

    it('should return sorted alphabet array - third check', () => {
      expect.assertions(1);
      inputText = '!@#123asdqrwerABCDDAG';
      result = ['A', 'A', 'a', 'B', 'C', 'D', 'D', 'd', 'e', 'G', 'q', 'r', 'r', 's', 'w'];
      expect(getSortedAlphabetArray(inputText)).toStrictEqual(result);
    });
  });

  describe('getBlankRemovedText', () => {
    let inputText;
    const result = '!@#123asdqrwerABCDDAG';

    it('should return blank removed Text - first check', () => {
      expect.assertions(1);
      inputText = '!@#123  asd  qr wer ABCDDAG';
      expect(getBlankRemovedText(inputText)).toBe(result);
    });

    it('should return blank removed Text - second check', () => {
      expect.assertions(1);
      inputText = '!@#123\tasd\nqr wer ABCDDAG';
      expect(getBlankRemovedText(inputText)).toBe(result);
    });

    it('should return blank removed Text - third check', () => {
      expect.assertions(1);
      inputText = '!@#  12   3   \t   asd\nqr wer ABCD\rDA\r\r\r\tG';
      expect(getBlankRemovedText(inputText)).toBe(result);
    });
  });
});
