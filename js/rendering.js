// import { photoArray } from './data.js';

const photoWrapp = document.querySelector('.pictures');
const photoTemplate = document.querySelector('#picture').content.querySelector('.picture');
const photoFragment = document.createDocumentFragment();
const commentArray = [];

function renderPhoto(photoArray) {
  photoArray.forEach(({ url, description, likes, comments }) => {
    const photoElement = photoTemplate.cloneNode(true);

    photoElement.querySelector('.picture__img').src = url;
    photoElement.querySelector('.picture__img').alt = description;
    photoElement.querySelector('.picture__likes').textContent = likes;
    photoElement.querySelector('.picture__comments').textContent = comments.length;
    commentArray.push(comments);

    photoFragment.appendChild(photoElement);
  });

  photoWrapp.appendChild(photoFragment);
}

export { commentArray, renderPhoto };
