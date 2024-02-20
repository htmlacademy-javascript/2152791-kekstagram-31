/* eslint-disable */

const checkLength = (str, length) => {
  if (str.length <= length) {
    return true;
  }
  return false;
};
console.log(checkLength('проверяемая строка', 20));
console.log(checkLength('проверяемая строка', 18));
console.log(checkLength('проверяемая строка', 10));

const isMirror = (word) => {
  let spareWord = '';
  for (let i = word.length - 1; i >= 0; i--) {
    spareWord += word[i];
  }
  if (word.toLowerCase().replaceAll(' ', '') === spareWord.toLowerCase().replaceAll(' ', '')) {
    return true;
  }
  return false;
};
console.log(isMirror('топот'));
console.log(isMirror('ДовОд'));
console.log(isMirror('Кекс'));

const getNumbers = (str) => {
  if (!isNaN(str)) {
    return Math.abs(str).toString().replace('.', '');
  }
  return parseInt(str.replace(/[^0-9]/g, ''), 10);
};
console.log(getNumbers('2023 год'));
console.log(getNumbers('ECMAScript 2022'));
console.log(getNumbers('1 кефир, 0.5 батона'));
console.log(getNumbers('агент 007'));
console.log(getNumbers('а я томат'));
console.log(getNumbers(2023));
console.log(getNumbers(-1));
console.log(getNumbers(1.5));
