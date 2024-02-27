/* eslint-disable */

//2.32 Нужно больше функций
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

//5.16 Функции возвращаются
// const isMeeting = (startDay, endDay, startMeet, meetingTime) => {
//   const toMin = (hours) => {
//     const timeArr = hours.split(':');

//     return Number((timeArr[0] * 60) + Number(timeArr[1]));
//   };

//   const startDayMin = toMin(startDay);
//   const endDayMin = toMin(endDay);
//   const startMeetMin = toMin(startMeet);
//   const meetingMin = startMeetMin + meetingTime;

//   if (startDayMin <= meetingMin && endDayMin >= meetingMin) {
//     return true;
//   }
//   return false;
// };

// console.log(isMeeting('08:00', '17:30', '14:00', 90));
// console.log(isMeeting('8:0', '10:0', '8:0', 120));
// console.log(isMeeting('08:00', '14:30', '14:00', 90));
// console.log(isMeeting('14:00', '17:30', '08:0', 90));
// console.log(isMeeting('8:00', '17:30', '08:00', 900));
