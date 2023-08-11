//Функция для проверки длины строки.
const myPadStar = (string, minLength, pad) => {
  const actualPad = minLength - string.length;
  if (actualPad < 0) {
    return string;
  }
  return pad.slice(0, actualPad % pad.length) + pad.repeat(actualPad / pad.length) + string;
}

//Это палиндром.
const isPalindrom = (string) => {
  const tempString
  .toLowerCase()
  .replaceAll(' ', '');

  let reverseSring = '';
  for (i = tempString.length - 1; i >= 0; i--) {
    reverseSring += tempString.at(i);
  }
  return tempString === reverseSring;

};

/*Функция, которая принимает строку, извлекает содержащиеся в ней цифры от 0 до 9
и возвращает их в виде целого положительного числа.*/
const extractNumber = (string) => {
  if (typeof string === number) => {
    return string;
  }
  let result = '';
  for (let i = 0; i < string.length; i++) {
    if (!Number.isNaN(parseInt(string.at(i), 10))) {
      result += string.at(i);
    }
  }
  return parseInt(result, 10);
}


