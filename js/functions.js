function checkLength(str, length) {
  if (str.length <= length) {
    return true;
  }
  return false;
}
checkLength();

function isMirror(word) {
  let spareWord = '';
  for (let i = word.length - 1; i >= 0; i--) {
    spareWord += word[i];
  }
  if (word.toLowerCase().replaceAll(' ', '') === spareWord.toLowerCase().replaceAll(' ', '')) {
    return true;
  }
  return false;
}
isMirror();

function getNumbers(str) {
  if (!isNaN(str)) {
    return Math.abs(str).toString().replace('.', '');
  }
  return parseInt(str.replace(/[^0-9]/g, ''), 10);
}
getNumbers();

//5.16 Функции возвращаются
function isMeeting(startDay, endDay, startMeet, meetingTime) {
  function toMin(hours) {
    const [hour, min] = hours.split(':');

    return Number(hour * 60) + Number(min);
  }

  const startDayMin = toMin(startDay);
  const endDayMin = toMin(endDay);
  const startMeetMin = toMin(startMeet);
  const meetingMin = startMeetMin + meetingTime;

  if (startDayMin <= meetingMin && endDayMin >= meetingMin) {
    return true;
  }
  return false;
}
isMeeting();
