import { addSubmitListener, removeSubmitListener } from './validation.js';
// import { createSlider } from './photo-effects.js';

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

function closeUserForm() {
  uploadInputOverlay.classList.add('hidden');
  pageBody.classList.remove('modal-open');
  uploadInput.value = '';
  hashtagInput.value = '';
  commentInput.value = '';
  uploadPhoto.style.transform = 'scale(1)';

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
  // createSlider();

  hashtagInput.addEventListener('keydown', focusCheck);
  commentInput.addEventListener('keydown', focusCheck);
  closeButton.addEventListener('click', closeUserForm);
  document.addEventListener('click', closeFormOutside);
  document.addEventListener('keydown', pressEscape);
}
