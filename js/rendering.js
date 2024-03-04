import {photoArray} from './data.js';

const photoWrapp = document.querySelector('.pictures');
const photoTemplate = document.querySelector('#picture').content.querySelector('.picture');
const photoFragment = document.createDocumentFragment();
const photoRendering = photoArray();

photoRendering.forEach(({url, description, likes, comments}) => {
  const photoElemet = photoTemplate.cloneNode(true);

  photoElemet.querySelector('.picture__img').src = url;
  photoElemet.querySelector('.picture__img').alt = description;
  photoElemet.querySelector('.picture__likes').textContent = likes;
  photoElemet.querySelector('.picture__comments').textContent = comments.length;

  photoFragment.appendChild(photoElemet);
});

photoWrapp.appendChild(photoFragment);
