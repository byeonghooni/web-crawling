const Axios = require('axios');

const MIN_CAPITAL_UNI_CODE = 65;
const MAX_CAPITAL_UNI_CODE = 90;
const DIFFERENCE_BETWEEN_CAPITAL_UNI_CODE_AND_SMALL_UNI_CODE = 32;
const ALL_TEXT_TYPE = '1';
const REMOVED_HTML_TAG_TYPE = '0';

const isCapitalUniCode = (unicode) => {
  return unicode >= MIN_CAPITAL_UNI_CODE && unicode <= MAX_CAPITAL_UNI_CODE;
};

const getUniCodeIfSmallThanCapitalElseOrigin = (uniCode) => {
  return isCapitalUniCode(uniCode) ? uniCode : uniCode - DIFFERENCE_BETWEEN_CAPITAL_UNI_CODE_AND_SMALL_UNI_CODE;
};

const ascendAlphabetConsideringCapitalAndSmall = (a, b) => {
  const beforeUniCode = b.charCodeAt(0);
  const nextUniCode = a.charCodeAt(0);

  const changedToCapitalWithBeforeUniCode = getUniCodeIfSmallThanCapitalElseOrigin(beforeUniCode);
  const changedToCapitalWithNextUniCode = getUniCodeIfSmallThanCapitalElseOrigin(nextUniCode);

  let result;
  if (changedToCapitalWithNextUniCode < changedToCapitalWithBeforeUniCode) { // 이전값이 작으면 -1
    result = -1;
  } else if (changedToCapitalWithNextUniCode === changedToCapitalWithBeforeUniCode) {
    if (isCapitalUniCode(nextUniCode) && !isCapitalUniCode(beforeUniCode)) {
      result = -1;
    } else if (!isCapitalUniCode(nextUniCode) && isCapitalUniCode(beforeUniCode)) {
      result = 1;
    } else {
      result = 0;
    }
  } else {
    result = 1;
  }

  return result;
};

const getSortedAlphabetArray = (text) => {
  return text.replace(/[^a-zA-Z]/g, '').split('').sort(ascendAlphabetConsideringCapitalAndSmall);
};

const getSortedNumberArray = (text) => {
  return text.replace(/[^0-9]/g, '').split('').sort();
};

const getBlankRemovedText = (text) => {
  return text.replace(/ /gi, '').replace(/\n/g, '').replace(/\r/g, '').replace(/\t/g, '');
};

const getAllTextOrRemovedHTMLTagText = (text, type) => {
  return type === ALL_TEXT_TYPE ? text : text.replace(/(<([^>]+)>)/ig, '');
};

const getMixedWithAlphabetAndNumberText = (alphabeticallySortedArray, numbericallySortedArray) => {
  const result = [];
  const alphabetArrayLength = alphabeticallySortedArray.length;
  const numberArrayLength = numbericallySortedArray.length;

  const moreManyItemArray = (alphabetArrayLength >= numberArrayLength) ? alphabeticallySortedArray : numbericallySortedArray;

  for (let i = 0; i < moreManyItemArray.length; i++) {
    if (alphabeticallySortedArray[i]) {
      result.push(alphabeticallySortedArray[i]);
    }
    if (numbericallySortedArray[i]) {
      result.push(numbericallySortedArray[i]);
    }
  }
  return result.join('');
};

const getQuotient = (text, divider) => {
  return text.substring(0, text.length - (text.length % divider));
};

const getRemainder = (text, divider) => {
  return text.substring(text.length - (text.length % divider), text.length);
};

const getQuotientAndRemainder = async (url, type, divider) => {
  const response = await Axios.get(url);

  const blankRemovedText = getBlankRemovedText(response.data);
  const allOrRemovedHTMLTagText = getAllTextOrRemovedHTMLTagText(blankRemovedText, type);

  const alphabeticallySortedArray = getSortedAlphabetArray(allOrRemovedHTMLTagText);
  const numbericallySortedArray = getSortedNumberArray(allOrRemovedHTMLTagText);

  const mixedWithAlphabetAndNumberText = getMixedWithAlphabetAndNumberText(alphabeticallySortedArray, numbericallySortedArray);

  const quotient = getQuotient(mixedWithAlphabetAndNumberText, divider);
  const remainder = getRemainder(mixedWithAlphabetAndNumberText, divider);

  return { quotient, remainder };
};

module.exports = {
  isCapitalUniCode,
  getUniCodeIfSmallThanCapitalElseOrigin,
  getSortedAlphabetArray,
  getSortedNumberArray,
  getBlankRemovedText,
  ALL_TEXT_TYPE,
  REMOVED_HTML_TAG_TYPE,
  getAllTextOrRemovedHTMLTagText,
  getMixedWithAlphabetAndNumberText,
  getQuotient,
  getRemainder,
  getQuotientAndRemainder,
};
