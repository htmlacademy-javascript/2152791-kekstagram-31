import { OpenPreview } from './preview.js';
import { commentsArray } from './filters.js';

const photoWrapp = document.querySelector('.pictures');
const photoTemplate = document.querySelector('#picture').content.querySelector('.picture');
const photoFragment = document.createDocumentFragment();

function RenderPhoto(photoArray) {
  photoArray.forEach(({url, description, likes, comments }) => {
    const photoElement = photoTemplate.cloneNode(true);

    photoElement.setAttribute('data-photo-src', url);

    photoElement.querySelector('.picture__img').src = url;
    photoElement.querySelector('.picture__img').alt = description;
    photoElement.querySelector('.picture__likes').textContent = likes;
    photoElement.querySelector('.picture__comments').textContent = comments.length;
    commentsArray.push(comments);

    photoFragment.appendChild(photoElement);
  });

  photoWrapp.appendChild(photoFragment);

  OpenPreview();
}

export { commentsArray, RenderPhoto };
