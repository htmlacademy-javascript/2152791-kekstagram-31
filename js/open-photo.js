import {commentArray} from './rendering.js';

const bigPhotoPopup = document.querySelector('.big-picture');
const pageBody = document.querySelector('body');
const deleteComments = document.getElementById('comments');

const onDocumentKeydown = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    bigPhotoPopup.classList.add('hidden');
    pageBody.classList.remove('modal-open');
    deleteComments.innerHTML = '';

    document.removeEventListener('keydown', onDocumentKeydown);
  }
};

const openPhoto = () => {
  bigPhotoPopup.classList.remove('hidden');
  pageBody.classList.add('modal-open');

  document.addEventListener('keydown', onDocumentKeydown);
};

const closePhoto = () => {
  bigPhotoPopup.classList.add('hidden');
  pageBody.classList.remove('modal-open');
  deleteComments.innerHTML = '';

  document.removeEventListener('keydown', onDocumentKeydown);
};

const smallPhotos = document.querySelectorAll('.picture');
const bigPhotoWrapp = document.querySelector('.big-picture__img');
const bigPhoto = bigPhotoWrapp.querySelector('img');
const photoDescription = document.querySelector('.social__caption');
const bigPhotoLikes = document.querySelector('.likes-count');
const bigPhotoComments = document.querySelector('.social__comment-total-count');
const bigPhotoCommentsCount = document.querySelector('.social__comment-shown-count');
const bigPhotoCommentsWrapper = document.querySelector('.social__comments');
const commentTemplate = document.querySelector('#user-comment').content.querySelector('.social__comment');
const commentFragment = document.createDocumentFragment();

smallPhotos.forEach((photos) => {
  photos.addEventListener('click', (evt) => {
    openPhoto();

    bigPhoto.src = evt.target.src;
    photoDescription.textContent = evt.target.alt;
    bigPhotoLikes.textContent = photos.querySelector('.picture__likes').textContent;
    bigPhotoComments.textContent = photos.querySelector('.picture__comments').textContent;
    bigPhotoCommentsCount.textContent = bigPhotoCommentsWrapper.getElementsByTagName('li').length;

    commentArray.forEach((target) => {
      const [comment] = target;

      const commentElement = commentTemplate.cloneNode(true);
      commentElement.querySelector('.social__picture').src = comment.avatar;
      commentElement.querySelector('.social__picture').alt = comment.name;
      commentElement.querySelector('.social__text').textContent = comment.message;
      commentFragment.appendChild(commentElement);
    });

    bigPhotoCommentsWrapper.appendChild(commentFragment);
  });
});

const closeButton = document.querySelector('.big-picture__cancel');
closeButton.addEventListener('click', () => {
  closePhoto();
});
