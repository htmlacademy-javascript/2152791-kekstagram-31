function shuffleArray(array) {
  array.sort(() => Math.random() - 0.5);
}

function checkEscape(evt) {
  return evt.key === 'Escape';
}

function debounce (callback, timeoutDelay = 500) {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

export { shuffleArray, debounce, checkEscape };
