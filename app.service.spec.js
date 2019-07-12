const appService = require('./app.service');

const getUniCode = char => char.charCodeAt(0);

describe('app.service', () => {
  describe('isCapitalUniCode', () => {
    it('should return true', () => {
      expect.assertions(3);
      expect(appService.isCapitalUniCode(getUniCode('A'))).toBe(true);
      expect(appService.isCapitalUniCode(getUniCode('F'))).toBe(true);
      expect(appService.isCapitalUniCode(getUniCode('Z'))).toBe(true);
    });

    it('should return false', () => {
      expect.assertions(3);
      expect(appService.isCapitalUniCode(getUniCode('#'))).toBe(false);
      expect(appService.isCapitalUniCode(getUniCode('a'))).toBe(false);
      expect(appService.isCapitalUniCode(getUniCode('3'))).toBe(false);
    });
  });

  describe('getUniCodeIfSmallThanCapitalElseOrigin', () => {
    it('should be the same', () => {
      expect.assertions(4);
      expect(appService.getUniCodeIfSmallThanCapitalElseOrigin(getUniCode('a'))).toBe(getUniCode('A'));
      expect(appService.getUniCodeIfSmallThanCapitalElseOrigin(getUniCode('A'))).toBe(getUniCode('A'));
      expect(appService.getUniCodeIfSmallThanCapitalElseOrigin(getUniCode('z'))).toBe(getUniCode('Z'));
      expect(appService.getUniCodeIfSmallThanCapitalElseOrigin(getUniCode('Z'))).toBe(getUniCode('Z'));
    });

    it('should not be the same', () => {
      expect.assertions(4);
      expect(appService.getUniCodeIfSmallThanCapitalElseOrigin(getUniCode('A'))).not.toBe(getUniCode('a'));
      expect(appService.getUniCodeIfSmallThanCapitalElseOrigin(getUniCode('Z'))).not.toBe(getUniCode('z'));
      expect(appService.getUniCodeIfSmallThanCapitalElseOrigin(getUniCode('a'))).not.toBe(getUniCode('a'));
      expect(appService.getUniCodeIfSmallThanCapitalElseOrigin(getUniCode('z'))).not.toBe(getUniCode('z'));
    });
  });

  describe('getSortedAlphabetArray', () => {
    let inputText;
    let result;

    it('should return sorted alphabet array - first check', () => {
      expect.assertions(1);
      inputText = 'aegxAdw23!@AfBFwfW';
      result = ['A', 'A', 'a', 'B', 'd', 'e', 'F', 'f', 'f', 'g', 'W', 'w', 'w', 'x'];
      expect(appService.getSortedAlphabetArray(inputText)).toStrictEqual(result);
    });

    it('should return sorted alphabet array - second check', () => {
      expect.assertions(1);
      inputText = '12!$FEWas3412ERGxf';
      result = ['a', 'E', 'E', 'F', 'f', 'G', 'R', 's', 'W', 'x'];
      expect(appService.getSortedAlphabetArray(inputText)).toStrictEqual(result);
    });

    it('should return sorted alphabet array - third check', () => {
      expect.assertions(1);
      inputText = '!@#123asdqrwerABCDDAG';
      result = ['A', 'A', 'a', 'B', 'C', 'D', 'D', 'd', 'e', 'G', 'q', 'r', 'r', 's', 'w'];
      expect(appService.getSortedAlphabetArray(inputText)).toStrictEqual(result);
    });
  });

  describe('getSortedNumberArray', () => {
    let inputText;
    let result;

    it('should return sorted number array - first check', () => {
      expect.assertions(1);
      inputText = 'aegxAdw23!@AfB1235123FwfW';
      result = ['1', '1', '2', '2', '2', '3', '3', '3', '5'];
      expect(appService.getSortedNumberArray(inputText)).toStrictEqual(result);
    });

    it('should return sorted number array - second check', () => {
      expect.assertions(1);
      inputText = '12!$FE098450Was3412E34RGxf';
      result = ['0', '0', '1', '1', '2', '2', '3', '3', '4', '4', '4', '5', '8', '9'];
      expect(appService.getSortedNumberArray(inputText)).toStrictEqual(result);
    });

    it('should return sorted number array - third check', () => {
      expect.assertions(1);
      inputText = '!@#kf2=01d12rev21!@#1577';
      result = ['0', '1', '1', '1', '1', '2', '2', '2', '5', '7', '7'];
      expect(appService.getSortedNumberArray(inputText)).toStrictEqual(result);
    });
  });

  describe('getBlankRemovedText', () => {
    let inputText;
    const result = '!@#123asdqrwerABCDDAG';

    it('should return blank removed Text - first check', () => {
      expect.assertions(1);
      inputText = '!@#123  asd  qr wer ABCDDAG';
      expect(appService.getBlankRemovedText(inputText)).toBe(result);
    });

    it('should return blank removed Text - second check', () => {
      expect.assertions(1);
      inputText = '!@#123\tasd\nqr wer ABCDDAG';
      expect(appService.getBlankRemovedText(inputText)).toBe(result);
    });

    it('should return blank removed Text - third check', () => {
      expect.assertions(1);
      inputText = '!@#  12   3   \t   asd\nqr wer ABCD\rDA\r\r\r\tG';
      expect(appService.getBlankRemovedText(inputText)).toBe(result);
    });
  });


  describe('getAllTextOrRemovedHTMLTagText', () => {
    const inputText = '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>Title</title></head><body><h1>hihi</h1><div><p>hello</p></div></body></html>';

    it('should return all text when ALL_TEXT_TYPE', () => {
      expect.assertions(1);
      expect(appService.getAllTextOrRemovedHTMLTagText(inputText, appService.ALL_TEXT_TYPE)).toBe(inputText);
    });

    it('should return html tag removed text when REMOVED_HTML_TAG_TYPE', () => {
      expect.assertions(1);
      expect(appService.getAllTextOrRemovedHTMLTagText(inputText, appService.REMOVED_HTML_TAG_TYPE)).toBe('Titlehihihello');
    });

    it('should not return html tag removed text when ALL_TEXT_TYPE', () => {
      expect.assertions(1);
      expect(appService.getAllTextOrRemovedHTMLTagText(inputText, appService.ALL_TEXT_TYPE)).not.toBe('Titlehihihello');
    });
  });

  describe('getMixedWithAlphabetAndNumberText', () => {
    it('should return text with last some numbers when longer number array than alphabet array', () => {
      expect.assertions(1);
      const alphabeticallySortedArray = ['A', 'A', 'a', 'B', 'W', 'w', 'w', 'x'];
      const numbericallySortedArray = ['1', '1', '2', '2', '2', '3', '3', '3', '5', '7'];
      const result = 'A1A1a2B2W2w3w3x357';
      expect(appService.getMixedWithAlphabetAndNumberText(alphabeticallySortedArray, numbericallySortedArray)).toBe(result);
    });

    it('should return text with last some characters when longer alphabet array than number array', () => {
      expect.assertions(1);
      const alphabeticallySortedArray = ['A', 'A', 'a', 'B', 'B', 'b', 'W', 'w', 'w', 'x'];
      const numbericallySortedArray = ['1', '1', '2', '5', '3', '7'];
      const result = 'A1A1a2B5B3b7Wwwx';
      expect(appService.getMixedWithAlphabetAndNumberText(alphabeticallySortedArray, numbericallySortedArray)).toBe(result);
    });
  });
});
