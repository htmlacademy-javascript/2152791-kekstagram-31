import { closeUserForm } from './user-form.js';
import { escapeEventTogglerOpen, escapeEventTogglerClose } from './user-form.js';
import { checkEscape } from './utils.js';

const HASHTAG_SYMBOLS = /^#[a-zа-яё0-9]{1,19}$/i;
const userForm = document.querySelector('.img-upload__form');
const submitButton = document.querySelector('.img-upload__submit');

const pristine = new Pristine(userForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div'
});

function spaceRemover(element) {
  return element !== '';
}

function testHashtagSymbols(value) {
  const newHashtag = value.toLowerCase().split(' ');
  const correctHashtag = newHashtag.filter(spaceRemover);

  function testSymbols(string) {
    return HASHTAG_SYMBOLS.test(string);
  }

  if (correctHashtag.every(testSymbols) || value.length === 0) {
    return true;
  }
}
pristine.addValidator(userForm.querySelector('.text__hashtags'), testHashtagSymbols, 'Введён невалидный хэштег');

function testHashtagLength(value) {
  const newHashtag = value.toLowerCase().split(' ');
  const correctHashtag = newHashtag.filter(spaceRemover);

  if (correctHashtag.length - 1 < 5) {
    return true;
  }
}
pristine.addValidator(userForm.querySelector('.text__hashtags'), testHashtagLength, 'Превышено количество хэштегов');

function testHashtagRepeat(value) {
  const newHashtag = value.toLowerCase().split(' ');
  const correctHashtag = newHashtag.filter(spaceRemover);
  const hashtagDuplicates = [];

  for (let i = 0; i < correctHashtag.length; i++) {
    for (let j = i + 1; j < correctHashtag.length; j++) {
      if (correctHashtag[i] === correctHashtag[j] && !hashtagDuplicates.includes(correctHashtag[i])) {
        hashtagDuplicates.push(correctHashtag[i]);
      }
    }
  }

  if (hashtagDuplicates.length === 0) {
    return true;
  }
}
pristine.addValidator(userForm.querySelector('.text__hashtags'), testHashtagRepeat, 'Хэштеги повторяются');

const COMMENT_LENGTH = 140;

function testCommentLength(value) {
  if (value.length === 0 || value.length < COMMENT_LENGTH) {
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
const successEventEscapeBind = eventPressEscape.bind(null, successTemplate);

const errorEventClickBind = eventClick.bind(null, errorTemplate);
const errorEventClickOutBind = eventClickOut.bind(null, errorTemplate);
const errorEventEscapeBind = eventPressEscape.bind(null, errorTemplate);

function eventRemover() {
  successButton.removeEventListener('click', successEventClickBind);
  document.removeEventListener('click', successEventClickOutBind);
  document.removeEventListener('keydown', successEventEscapeBind);

  errorButton.removeEventListener('click', errorEventClickBind);
  document.removeEventListener('click', errorEventClickOutBind);
  document.removeEventListener('keydown', errorEventEscapeBind);
}

function eventClick(element) {
  pageBody.removeChild(element);

  document.dispatchEvent(escapeEventTogglerOpen);

  eventRemover();
}

function eventClickOut(element, evt) {
  if (evt.target.contains(element)) {
    pageBody.removeChild(element);
    eventRemover();

    document.dispatchEvent(escapeEventTogglerOpen);
  }
}

function eventPressEscape(element, evt) {
  if (checkEscape(evt)) {
    pageBody.removeChild(element);
    document.dispatchEvent(escapeEventTogglerOpen);
  }

  eventRemover();
}

function getSuccessPopup() {
  pageBody.appendChild(successTemplate);

  successButton.addEventListener('click', successEventClickBind);
  document.addEventListener('click', successEventClickOutBind);
  document.addEventListener('keydown', successEventEscapeBind);
}

function getErrorPopup() {
  pageBody.appendChild(errorTemplate);

  document.dispatchEvent(escapeEventTogglerClose);

  errorButton.addEventListener('click', errorEventClickBind);
  document.addEventListener('click', errorEventClickOutBind);
  document.addEventListener('keydown', errorEventEscapeBind);
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
      'https://31.javascript.htmlacademy.pro/kekstagram/',
      {
        method: 'POST',
        body: formData,
      },
    )

      .then((response) => {
        if (response.ok) {
          closeUserForm();
          getSuccessPopup();
        } else {
          getErrorPopup();
        }
      })

      .catch(() => {
        getErrorPopup();
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

export { addSubmitListener, removeSubmitListener, pristine };
