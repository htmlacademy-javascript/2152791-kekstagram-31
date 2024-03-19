import { addSubmitListener, removeSubmitListener } from './validation.js';
import { sliderElement, targetImg } from './photo-effects.js';

const uploadInput = document.querySelector('.img-upload__input');

uploadInput.addEventListener('change', openUserForm);

const uploadInputOverlay = document.querySelector('.img-upload__overlay');

function closeFormOutside(evt) {
  if (evt.target.contains(uploadInputOverlay)) {
    closeUserForm();
  }
}

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
const pageBody = document.querySelector('body');
const commentInput = document.querySelector('.text__description');
const hashtagInput = document.querySelector('.text__hashtags');

const smallerScaleButton = document.querySelector('.scale__control--smaller');
const biggerScaleButton = document.querySelector('.scale__control--bigger');
const scaleValue = document.querySelector('.scale__control--value');
let defaultValue = 100;
const defaultStep = 25;

function reducePhoto() {
  if (defaultValue === 100) {
    uploadPhoto.style.transform = 'scale(0.75)';
    defaultValue = defaultValue - defaultStep;
  } else if (defaultValue === 75) {
    uploadPhoto.style.transform = 'scale(0.50)';
    defaultValue = defaultValue - defaultStep;
  } else if (defaultValue === 50) {
    uploadPhoto.style.transform = 'scale(0.25)';
    defaultValue = defaultValue - defaultStep;
  } else if (defaultValue < 25) {
    return;
  }

  scaleValue.value = `${defaultValue}%`;
}
smallerScaleButton.addEventListener('click', reducePhoto);

function increasePhoto() {
  if (defaultValue === 25) {
    uploadPhoto.style.transform = 'scale(0.50)';
    defaultValue = defaultValue + defaultStep;
  } else if (defaultValue === 50) {
    uploadPhoto.style.transform = 'scale(0.75)';
    defaultValue = defaultValue + defaultStep;
  } else if (defaultValue === 75) {
    uploadPhoto.style.transform = 'scale(1)';
    defaultValue = defaultValue + defaultStep;
  } else if (defaultValue > 100) {
    return;
  }

  scaleValue.value = `${defaultValue}%`;
}
biggerScaleButton.addEventListener('click', increasePhoto);

function closeUserForm() {
  uploadInputOverlay.classList.add('hidden');
  pageBody.classList.remove('modal-open');
  uploadInput.value = '';
  hashtagInput.value = '';
  commentInput.value = '';
  uploadPhoto.style.transform = 'scale(1)';
  scaleValue.value = '100%';
  defaultValue = 100;
  targetImg.removeAttribute('style');
  sliderElement.noUiSlider.set(0);

  removeSubmitListener();

  hashtagInput.removeEventListener('keydown', focusCheck);
  commentInput.removeEventListener('keydown', focusCheck);
  closeButton.removeEventListener('click', closeUserForm);
  document.removeEventListener('click', closeFormOutside);
  document.removeEventListener('keydown', pressEscape);
}

function openUserForm() {
  uploadInputOverlay.classList.remove('hidden');
  pageBody.classList.add('modal-open');

  loadUserPic();
  addSubmitListener();

  hashtagInput.addEventListener('keydown', focusCheck);
  commentInput.addEventListener('keydown', focusCheck);
  closeButton.addEventListener('click', closeUserForm);
  document.addEventListener('click', closeFormOutside);
  document.addEventListener('keydown', pressEscape);
}
