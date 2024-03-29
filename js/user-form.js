//Удалить обработчикaaaaaaaa

import { addSubmitListener, removeSubmitListener } from './validation.js';
import { sliderContainer, targetImg, imgOriginalEffect } from './photo-effects.js';
import { scaleValue } from './photo-scale.js';

const uploadInput = document.querySelector('.img-upload__input');
const pageBody = document.querySelector('body');

uploadInput.addEventListener('change', openUserForm);

const uploadInputOverlay = document.querySelector('.img-upload__overlay');

function closeFormOutside(evt) {
  if (evt.target.contains(uploadInputOverlay)) {
    closeUserForm();
  }
}

const escapeEventTogglerActive = new Event('escapeEventTogglerActive');
const escapeEventTogglerDisable = new Event('escapeEventTogglerDisable');

function pressEscape(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeUserForm();
  }
}

function focusCheck(evt) {
  return evt.stopPropagation();
}

const preloadPhoto = document.getElementById('upload-file');
const uploadPhoto = document.querySelector('.img-upload__photo');

function loadUserPic() {
  const preloadPhotoFile = preloadPhoto.files[0];

  if (preloadPhotoFile) {
    const preloadPhotoUrl = URL.createObjectURL(preloadPhotoFile);
    uploadPhoto.src = preloadPhotoUrl;
  }
}

const closeButton = document.querySelector('.img-upload__cancel');
const commentInput = document.querySelector('.text__description');
const hashtagInput = document.querySelector('.text__hashtags');

function closeUserForm() {
  uploadInputOverlay.classList.add('hidden');
  pageBody.classList.remove('modal-open');
  uploadInput.value = '';
  hashtagInput.value = '';
  commentInput.value = '';
  uploadPhoto.style.transform = 'scale(1)';
  scaleValue.value = '100%';
  targetImg.removeAttribute('style');
  sliderContainer.classList.add('hidden');

  removeSubmitListener();

  hashtagInput.removeEventListener('keydown', focusCheck);
  commentInput.removeEventListener('keydown', focusCheck);
  closeButton.removeEventListener('click', closeUserForm);
  document.removeEventListener('click', closeFormOutside);
  document.removeEventListener('keydown', pressEscape);
  document.removeEventListener('escapeEventTogglerActive', () => {
    document.removeEventListener('keydown', pressEscape);
  });
  document.removeEventListener('escapeEventTogglerDisable', () => {
    document.addEventListener('keydown', pressEscape);
  });
}

function openUserForm() {
  uploadInputOverlay.classList.remove('hidden');
  pageBody.classList.add('modal-open');
  imgOriginalEffect.checked = true;

  loadUserPic();
  addSubmitListener();

  hashtagInput.addEventListener('keydown', focusCheck);
  commentInput.addEventListener('keydown', focusCheck);
  closeButton.addEventListener('click', closeUserForm);
  document.addEventListener('click', closeFormOutside);
  document.addEventListener('keydown', pressEscape);
  document.addEventListener('escapeEventTogglerActive', () => {
    document.removeEventListener('keydown', pressEscape);
  });
  document.addEventListener('escapeEventTogglerDisable', () => {
    document.addEventListener('keydown', pressEscape);
  });
}

export { uploadPhoto, closeUserForm, escapeEventTogglerActive, escapeEventTogglerDisable };
