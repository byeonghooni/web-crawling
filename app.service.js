const MIN_CAPITAL_UNI_CODE = 65;
const MAX_CAPITAL_UNI_CODE = 90;
const DIFFERENCE_BETWEEN_CAPITAL_UNI_CODE_AND_SMALL_UNI_CODE = 32;

const isCapitalUniCode = (unicode) => {
  return unicode >= MIN_CAPITAL_UNI_CODE && unicode <= MAX_CAPITAL_UNI_CODE;
};

const getUniCodeIfSmallThanCapitalElseOrigin = (uniCode) => {
  return isCapitalUniCode(uniCode) ? uniCode : uniCode - DIFFERENCE_BETWEEN_CAPITAL_UNI_CODE_AND_SMALL_UNI_CODE;
};

module.exports = { isCapitalUniCode, getUniCodeIfSmallThanCapitalElseOrigin };
