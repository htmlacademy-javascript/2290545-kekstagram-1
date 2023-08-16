const myPadStar = (string, minLength, pad) => {
  const actualPad = minLength - string.length;
  if (actualPad < 0) {
    return string;
  }
  return (
    pad.slice(0, actualPad % pad.length) +
    pad.repeat(actualPad / pad.length) +
    string
  );
};
myPadStar('1', 2, '0');

const isPalindrom = (string) => {
  const tempString = string.toLowerCase().replaceAll(' ', '');

  let reverseSring = '';
  for (let i = tempString.length - 1; i >= 0; i--) {
    reverseSring += tempString.at(i);
  }
  return tempString === reverseSring;
};
isPalindrom('Лёша на полке клопа нашёл ');

// eslint-disable-next-line no-unused-vars
const extractNumber = (string) => {
  // eslint-disable-next-line no-undef
  if (typeof string === number) {
    return string;
  }
  let result = '';
  for (let i = 0; i < string.length; i++) {
    if (!Number.isNaN(parseInt(string.at(i), 10))) {
      result += string.at(i);
    }
  }
  return parseInt(result, 10);
};

extractNumber('2023 год');

const isLessOrEqual = (string, length) => {
  if ((string, length <= length)) {
    return true;
  } else {
    return false;
  }
};
isLessOrEqual('проверяемая строка', 20);
