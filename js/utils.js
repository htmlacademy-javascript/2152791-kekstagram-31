function getRandomNumber(min, max) {
  const number = min + Math.random() * (max + 1 - min);

  return Math.floor(number);
}

function shuffleArray(array) {
  array.sort(() => Math.random() - 0.5);
}

export {getRandomNumber, shuffleArray};
