const MIN_CAPITAL_UNI_CODE = 65;
const MAX_CAPITAL_UNI_CODE = 90;
const DIFFERENCE_BETWEEN_CAPITAL_UNI_CODE_AND_SMALL_UNI_CODE = 32;

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

const getBlankRemovedText = (text) => {
  return text.replace(/ /gi, '').replace(/\n/g, '').replace(/\r/g, '').replace(/\t/g, '');
};


module.exports = {
  isCapitalUniCode, getUniCodeIfSmallThanCapitalElseOrigin, getSortedAlphabetArray, getBlankRemovedText
};
