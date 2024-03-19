import { commentArray } from './rendering.js';

const commentTemplate = document.querySelector('#user-comment').content.querySelector('.social__comment');
const commentFragment = document.createDocumentFragment();

function commentsCreator(comment) {
  const commentElement = commentTemplate.cloneNode(true);
  commentElement.querySelector('.social__picture').src = comment.avatar;
  commentElement.querySelector('.social__picture').alt = comment.name;
  commentElement.querySelector('.social__text').textContent = comment.message;
  commentElement.classList.add('hidden');

  commentFragment.appendChild(commentElement);
}

const bigPhotoWrapp = document.querySelector('.big-picture__img');
const bigPhoto = bigPhotoWrapp.querySelector('img');
const photoDescription = document.querySelector('.social__caption');
const bigPhotoCommentsCount = document.querySelector('.social__comment-total-count');
const bigPhotoLikes = document.querySelector('.likes-count');

function photoRendering(photos) {
  bigPhoto.src = photos.querySelector('.picture__img').src;
  photoDescription.textContent = photos.querySelector('.picture__img').alt;
  bigPhotoLikes.textContent = photos.querySelector('.picture__likes').textContent;
  bigPhotoCommentsCount.textContent = photos.querySelector('.picture__comments').textContent;
}

const bigPhotoPopup = document.querySelector('.big-picture');
const pageBody = document.querySelector('body');
const deleteComments = document.getElementById('comments');
const loaderButton = document.querySelector('.social__comments-loader');
const subArray = [];
let commentCount = 0;

function pressEscape(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closePhoto();
  }
}

function closePhotoOutside(evt) {
  if (evt.target.contains(bigPhotoPopup)) {
    closePhoto();
  }
}

function closePhoto() {
  bigPhotoPopup.classList.add('hidden');
  pageBody.classList.remove('modal-open');
  deleteComments.innerHTML = '';
  commentCount = 0;
  loaderButton.classList.remove('hidden');
  subArray.length = 0;

  document.removeEventListener('keydown', pressEscape);
  document.removeEventListener('click', closePhotoOutside);
}

const closeButton = document.querySelector('.big-picture__cancel');

function openPhoto() {
  bigPhotoPopup.classList.remove('hidden');
  pageBody.classList.add('modal-open');

  document.addEventListener('keydown', pressEscape);
  document.addEventListener('click', closePhotoOutside);
  loaderButton.addEventListener('click', commentLoader);
  closeButton.addEventListener('click', closePhoto);
}

const bigPhotoCommentsWrapper = document.querySelector('.social__comments');

function appendComments(i) {
  commentArray[i].forEach((comment) => {
    commentsCreator(comment);
  });
  bigPhotoCommentsWrapper.appendChild(commentFragment);
}

const commentStep = 5;

function createSubarray() {
  const commentsArr = Array.from(bigPhotoCommentsWrapper.children);

  if (bigPhotoCommentsWrapper.children.length <= commentStep) {
    for (let c = 0; c < commentsArr.length; c++) {
      commentsArr[c].classList.remove('hidden');
      loaderButton.classList.add('hidden');
    }
  }

  for (let i = 0; i < Math.ceil(commentsArr.length / commentStep); i++) {
    subArray[i] = commentsArr.slice((i * commentStep), (i * commentStep) + commentStep);
  }

  if (subArray.length === 0) {
    loaderButton.classList.add('hidden');
  } else {
    subArray[0].forEach((comment) => {
      comment.classList.remove('hidden');
    });
  }
}

const bigPhotoCommentsShown = document.querySelector('.social__comment-shown-count');

function commentLoader() {
  if (commentCount + 2 >= subArray.length) {
    loaderButton.classList.add('hidden');
  }

  commentCount += 1;
  subArray[commentCount].forEach((comment) => {
    comment.classList.remove('hidden');
  });

  bigPhotoCommentsShown.textContent = bigPhotoCommentsWrapper.querySelectorAll('li:not(.hidden)').length;
}

const smallPhotos = document.querySelectorAll('.picture');

smallPhotos.forEach((photos, i) => {
  photos.addEventListener('click', () => {
    openPhoto();

    photoRendering(photos);

    appendComments(i);

    createSubarray();

    bigPhotoCommentsShown.textContent = bigPhotoCommentsWrapper.querySelectorAll('li:not(.hidden)').length;
  });
});
