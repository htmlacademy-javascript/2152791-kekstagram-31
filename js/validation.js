const userForm = document.querySelector('.img-upload__form');
const hashtagSymbols = /^#[a-zа-яё0-9]{1,19}$/i;

const pristine = new Pristine(userForm, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--error',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'p',
});

function testHashtagSymbols(value) {
  const correctHashtag = value.toLowerCase().split(' ');

  function testSymbols(string) {
    return hashtagSymbols.test(string);
  }

  if (correctHashtag.every(testSymbols) || value.length === 0) {
    return true;
  }
}
pristine.addValidator(userForm.querySelector('.text__hashtags'), testHashtagSymbols, 'Введён невалидный хэштег');

function testHashtagLength(value) {
  const correctHashtag = value.split(' ');

  if (correctHashtag.length - 1 < 5) {
    return true;
  }
}
pristine.addValidator(userForm.querySelector('.text__hashtags'), testHashtagLength, 'Превышено количество хэштегов');

function testHashtagRepeat(value) {
  const correctHashtag = value.toLowerCase().split(' ');
  const duplicates = [];

  for (let i = 0; i < correctHashtag.length; i++) {
    for (let j = i + 1; j < correctHashtag.length; j++) {
      if (correctHashtag[i] === correctHashtag[j] && !duplicates.includes(correctHashtag[i])) {
        duplicates.push(correctHashtag[i]);
      }
    }
  }

  if (duplicates.length === 0) {
    return true;
  }
}
pristine.addValidator(userForm.querySelector('.text__hashtags'), testHashtagRepeat, 'Хэштеги повторяются');

function testCommentLength(value) {
  if (value.length === 0 || value.length < 140) {
    return true;
  }
}
pristine.addValidator(userForm.querySelector('.text__description'), testCommentLength, 'Длина комментария больше 140 символов');

function startPrestine(evt) {
  if (!pristine.validate()) {
    evt.preventDefault();
  }
}

function addSubmitListener() {
  userForm.addEventListener('submit', startPrestine);
}

function removeSubmitListener() {
  userForm.removeEventListener('submit', startPrestine);
}

export { addSubmitListener, removeSubmitListener };
