import { closeUserForm } from './user-form.js';
import { escapeEventTogglerActive, escapeEventTogglerDisable } from './user-form.js';

const userForm = document.querySelector('.img-upload__form');
const submitButton = document.querySelector('.img-upload__submit');
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
const successTemplate = document.querySelector('#success').content.querySelector('.success');
const successButton = successTemplate.querySelector('.success__button');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');
const errorButton = errorTemplate.querySelector('.error__button');

const successEventClickBind = eventClick.bind(null, successTemplate);
const successEventClickOutBind = eventClickOut.bind(null, successTemplate);
const successEventEscapeBind = eventEscape.bind(null, successTemplate);

const errorEventClickBind = eventClick.bind(null, errorTemplate);
const errorEventClickOutBind = eventClickOut.bind(null, errorTemplate);
const errorEventEscapeBind = eventEscape.bind(null, errorTemplate);

function eventClick(el) {
  pageBody.removeChild(el);

  document.dispatchEvent(escapeEventTogglerDisable);
  document.removeEventListener('keydown', errorEventEscapeBind);
  document.removeEventListener('click', successEventClickOutBind);
  document.removeEventListener('keydown', errorEventEscapeBind);
  document.removeEventListener('click', errorEventClickOutBind);
}

function eventClickOut(el, evt) {
  if (evt.target.contains(el)) {
    pageBody.removeChild(el);
  }

  document.dispatchEvent(escapeEventTogglerDisable);
  document.removeEventListener('keydown', successEventEscapeBind);
  document.removeEventListener('click', successEventClickOutBind);
  document.removeEventListener('keydown', errorEventEscapeBind);
  document.removeEventListener('click', errorEventClickBind);
}

function eventEscape(el, evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    pageBody.removeChild(el);

    document.dispatchEvent(escapeEventTogglerDisable);
    successButton.removeEventListener('click', successEventClickBind);
    document.removeEventListener('click', successEventClickOutBind);
    document.removeEventListener('click', errorEventClickBind);
    document.removeEventListener('click', errorEventClickOutBind);
  }
}

function successPopup() {
  pageBody.appendChild(successTemplate);

  successButton.addEventListener('click', successEventClickBind);
  document.addEventListener('click', successEventClickOutBind);
  document.addEventListener('keydown', successEventEscapeBind, {once: true});
}

function errorPopup() {
  pageBody.appendChild(errorTemplate);

  document.dispatchEvent(escapeEventTogglerActive);

  errorButton.addEventListener('click', errorEventClickBind);
  document.addEventListener('click', errorEventClickOutBind, {once: true});
  document.addEventListener('keydown', errorEventEscapeBind, {once: true});
}

const submitButtonText = {
  IDLE: 'ОПУБЛИКОВАТЬ',
  SENDING: 'ПУБЛИКУЕМ...'
};

function blockSubmitButton() {
  submitButton.disabled = true;
  submitButton.textContent = submitButtonText.SENDING;
}

function unblockSubmitButton() {
  submitButton.disabled = false;
  submitButton.textContent = submitButtonText.IDLE;
}

function startPrestine(evt) {
  evt.preventDefault();

  if (pristine.validate()) {
    const formData = new FormData(evt.target);
    blockSubmitButton();

    fetch(
      'https://31.javascript.htmlacademy.pro/kekstagram',
      {
        method: 'POST',
        body: formData,
      },
    )

      .then((response) => {
        if (response.ok) {
          successPopup();
          closeUserForm();
        } else {
          errorPopup();
        }
      })

      .catch(() => {
        errorPopup();
      })

      .finally(() => {
        unblockSubmitButton();
      });
  }
}

function addSubmitListener() {
  userForm.addEventListener('submit', startPrestine);
}

function removeSubmitListener() {
  userForm.removeEventListener('submit', startPrestine);
}

export { addSubmitListener, removeSubmitListener };
