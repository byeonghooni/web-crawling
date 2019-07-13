const appService = require('../main/app.service');

const getUniCode = char => char.charCodeAt(0);

describe('app.service', () => {
  describe('isCapitalUniCode', () => {
    const { isCapitalUniCode } = appService;

    it('should be true when capital letter', () => {
      expect.assertions(3);
      expect(isCapitalUniCode(getUniCode('A'))).toBe(true);
      expect(isCapitalUniCode(getUniCode('F'))).toBe(true);
      expect(isCapitalUniCode(getUniCode('Z'))).toBe(true);
    });

    it('should be false when not capital letter', () => {
      expect.assertions(3);
      expect(isCapitalUniCode(getUniCode('#'))).toBe(false);
      expect(isCapitalUniCode(getUniCode('a'))).toBe(false);
      expect(isCapitalUniCode(getUniCode('3'))).toBe(false);
    });
  });

  describe('getUniCodeIfSmallThanCapitalElseOrigin', () => {
    const { getUniCodeIfSmallThanCapitalElseOrigin } = appService;

    const smallAUnicode = getUniCode('a');
    const smallZUnicode = getUniCode('z');
    const capitalAUnicode = getUniCode('A');
    const capitalZUnicode = getUniCode('Z');

    it('should be the same when result is capital letter', () => {
      expect.assertions(4);
      expect(getUniCodeIfSmallThanCapitalElseOrigin(smallAUnicode)).toBe(capitalAUnicode);
      expect(getUniCodeIfSmallThanCapitalElseOrigin(capitalAUnicode)).toBe(capitalAUnicode);
      expect(getUniCodeIfSmallThanCapitalElseOrigin(smallZUnicode)).toBe(capitalZUnicode);
      expect(getUniCodeIfSmallThanCapitalElseOrigin(capitalZUnicode)).toBe(capitalZUnicode);
    });

    it('should not be the same when result is small letter', () => {
      expect.assertions(4);
      expect(getUniCodeIfSmallThanCapitalElseOrigin(capitalAUnicode)).not.toBe(smallAUnicode);
      expect(getUniCodeIfSmallThanCapitalElseOrigin(capitalZUnicode)).not.toBe(smallZUnicode);
      expect(getUniCodeIfSmallThanCapitalElseOrigin(smallAUnicode)).not.toBe(smallAUnicode);
      expect(getUniCodeIfSmallThanCapitalElseOrigin(smallZUnicode)).not.toBe(smallZUnicode);
    });
  });

  describe('getSortedAlphabetArray', () => {
    const { getSortedAlphabetArray } = appService;

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

  describe('getSortedNumberArray', () => {
    const { getSortedNumberArray } = appService;

    let inputText;
    let result;

    it('should return sorted number array - first check', () => {
      expect.assertions(1);
      inputText = 'aegxAdw23!@AfB1235123FwfW';
      result = ['1', '1', '2', '2', '2', '3', '3', '3', '5'];
      expect(getSortedNumberArray(inputText)).toStrictEqual(result);
    });

    it('should return sorted number array - second check', () => {
      expect.assertions(1);
      inputText = '12!$FE098450Was3412E34RGxf';
      result = ['0', '0', '1', '1', '2', '2', '3', '3', '4', '4', '4', '5', '8', '9'];
      expect(getSortedNumberArray(inputText)).toStrictEqual(result);
    });

    it('should return sorted number array - third check', () => {
      expect.assertions(1);
      inputText = '!@#kf2=01d12rev21!@#1577';
      result = ['0', '1', '1', '1', '1', '2', '2', '2', '5', '7', '7'];
      expect(getSortedNumberArray(inputText)).toStrictEqual(result);
    });
  });

  describe('getBlankRemovedText', () => {
    const { getBlankRemovedText } = appService;

    let inputText;
    const result = '!@#123asdqrwerABCDDAG';

    it('should return blank removed text - first check', () => {
      expect.assertions(1);
      inputText = '!@#123  asd  qr wer ABCDDAG';
      expect(getBlankRemovedText(inputText)).toBe(result);
    });

    it('should return blank removed text - second check', () => {
      expect.assertions(1);
      inputText = '!@#123\tasd\nqr wer ABCDDAG';
      expect(getBlankRemovedText(inputText)).toBe(result);
    });

    it('should return blank removed text - third check', () => {
      expect.assertions(1);
      inputText = '!@#  12   3   \t   asd\nqr wer ABCD\rDA\r\r\r\tG';
      expect(getBlankRemovedText(inputText)).toBe(result);
    });
  });


  describe('getAllTextOrRemovedHTMLTagText', () => {
    const { ALL_TEXT_TYPE, REMOVED_HTML_TAG_TYPE, getAllTextOrRemovedHTMLTagText } = appService;

    const inputText = '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>Title</title></head><body><h1>hihi</h1><div><p>hello</p></div></body></html>';
    let result;

    it('should return all text when ALL_TEXT_TYPE', () => {
      expect.assertions(1);
      result = inputText;
      expect(getAllTextOrRemovedHTMLTagText(inputText, ALL_TEXT_TYPE)).toBe(result);
    });

    it('should return html tag removed text when REMOVED_HTML_TAG_TYPE', () => {
      expect.assertions(1);
      result = 'Titlehihihello';
      expect(getAllTextOrRemovedHTMLTagText(inputText, REMOVED_HTML_TAG_TYPE)).toBe(result);
    });

    it('should not return html tag removed text when ALL_TEXT_TYPE', () => {
      expect.assertions(1);
      result = 'Titlehihihello';
      expect(getAllTextOrRemovedHTMLTagText(inputText, ALL_TEXT_TYPE)).not.toBe(result);
    });
  });

  describe('getMixedWithAlphabetAndNumberText', () => {
    const { getMixedWithAlphabetAndNumberText } = appService;

    let alphabeticallySortedArray;
    let numbericallySortedArray;
    let result;

    it('should return text with last some numbers when longer number array than alphabet array', () => {
      expect.assertions(1);
      alphabeticallySortedArray = ['A', 'A', 'a', 'B', 'W', 'w', 'w', 'x'];
      numbericallySortedArray = ['1', '1', '2', '2', '2', '3', '3', '3', '5', '7'];
      result = 'A1A1a2B2W2w3w3x357';
      expect(getMixedWithAlphabetAndNumberText(alphabeticallySortedArray, numbericallySortedArray)).toBe(result);
    });

    it('should return text with last some characters when longer alphabet array than number array', () => {
      expect.assertions(1);
      alphabeticallySortedArray = ['A', 'A', 'a', 'B', 'B', 'b', 'W', 'w', 'w', 'x'];
      numbericallySortedArray = ['1', '1', '2', '5', '3', '7'];
      result = 'A1A1a2B5B3b7Wwwx';
      expect(getMixedWithAlphabetAndNumberText(alphabeticallySortedArray, numbericallySortedArray)).toBe(result);
    });
  });

  describe('getQuotient', () => {
    const { getQuotient } = appService;

    const mixedWithAlphabetAndNumberText = 'A1A1a2B5B3b7Wwwx';
    let divider;
    let result;

    it('should be same input text with return text when divider 1', () => {
      expect.assertions(1);
      divider = 1;
      result = mixedWithAlphabetAndNumberText;
      expect(getQuotient(mixedWithAlphabetAndNumberText, divider)).toBe(result);
    });

    it('should return \'A1A1a2B5B3\' when divider 10', () => {
      expect.assertions(1);
      divider = 10;
      result = 'A1A1a2B5B3';
      expect(getQuotient(mixedWithAlphabetAndNumberText, divider)).toBe(result);
    });

    it('should return \'A1A1a2B5B3b7Ww\' when divider 7', () => {
      expect.assertions(1);
      divider = 7;
      result = 'A1A1a2B5B3b7Ww';
      expect(getQuotient(mixedWithAlphabetAndNumberText, divider)).toBe(result);
    });

    it('should return \'\' when longer divider length than input text length', () => {
      expect.assertions(1);
      divider = mixedWithAlphabetAndNumberText.length + 1;
      result = '';
      expect(getQuotient(mixedWithAlphabetAndNumberText, divider)).toBe(result);
    });
  });

  describe('getRemainder', () => {
    const { getRemainder } = appService;
    const mixedWithAlphabetAndNumberText = 'A1A1a2B5B3b7Wwwx';
    let divider;
    let result;

    it('should be same when longer divider length than mixedWithAlphabetAndNumberText length', () => {
      expect.assertions(1);
      divider = mixedWithAlphabetAndNumberText.length + 1;
      result = mixedWithAlphabetAndNumberText;
      expect(getRemainder(mixedWithAlphabetAndNumberText, divider)).toBe(result);
    });

    it('should return \'b7Wwwx\' when divider 10', () => {
      expect.assertions(1);
      divider = 10;
      result = 'b7Wwwx';
      expect(getRemainder(mixedWithAlphabetAndNumberText, divider)).toBe(result);
    });

    it('should return \'wx\' when divider 7', () => {
      expect.assertions(1);
      divider = 7;
      result = 'wx';
      expect(getRemainder(mixedWithAlphabetAndNumberText, divider)).toBe(result);
    });

    it('should return \'\' when divider 1', () => {
      expect.assertions(1);
      divider = 1;
      result = '';
      expect(getRemainder(mixedWithAlphabetAndNumberText, divider)).toBe(result);
    });

    it('should return \'\' when divider 2', () => {
      expect.assertions(1);
      divider = 2;
      result = '';
      expect(getRemainder(mixedWithAlphabetAndNumberText, divider)).toBe(result);
    });
  });
});
