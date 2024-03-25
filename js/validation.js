import { closeUserForm } from './user-form.js';

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

const pageBody = document.querySelector('body');

// function testClick(el) {
//   pageBody.removeChild(el);
// }

// function testClickOut(evt, el) {
//   if (evt.target.contains(el)) {
//     pageBody.removeChild(el);
//   }
// }

function successPopup() {
  const successTemplate = document.querySelector('#success').content.querySelector('.success');
  const successPopupElement = successTemplate.cloneNode(true);
  pageBody.appendChild(successPopupElement);

  const successButton = successPopupElement.querySelector('.success__button');

  // successButton.addEventListener('click', testClick.bind(null, successPopupElement));
  // document.addEventListener('click', testClickOut.bind(null, successPopupElement));

  successButton.addEventListener('click', () => {
    pageBody.removeChild(successPopupElement);
  });

  document.addEventListener('click', (evt) => {
    if (evt.target.contains(successPopupElement)) {
      pageBody.removeChild(successPopupElement);
    }
  });

  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      pageBody.removeChild(successPopupElement);
    }
  });
}

function errorPopup() {
  const errorTemplate = document.querySelector('#error').content.querySelector('.error');
  const errorPopupElement = errorTemplate.cloneNode(true);

  pageBody.appendChild(errorPopupElement);

  const errorButton = errorPopupElement.querySelector('.error__button');
  errorButton.addEventListener('click', () => {
    pageBody.removeChild(errorPopupElement);
  });

  document.addEventListener('click', (evt) => {
    if (evt.target.contains(errorPopupElement)) {
      pageBody.removeChild(errorPopupElement);
    }
  });

  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      pageBody.removeChild(errorPopupElement);
    }
  });
}

function startPrestine(evt) {
  evt.preventDefault();

  if (pristine.validate()) {
    const formData = new FormData(evt.target);

    fetch(
      'https://31.javascript.htmlacademy.pro/kekstagra',
      {
        method: 'POST',
        body: formData,
      },
    )

      .then((response) => {
        if (response.ok) {
          closeUserForm();
          successPopup();
        } else {
          errorPopup();
        }
      });

    // .catch(() => {
    //   alert('Не удалось отправить форму. Попробуйте ещё раз');
    // });
  }
}

function addSubmitListener() {
  userForm.addEventListener('submit', startPrestine);
}

function removeSubmitListener() {
  userForm.removeEventListener('submit', startPrestine);
}

export { addSubmitListener, removeSubmitListener };
