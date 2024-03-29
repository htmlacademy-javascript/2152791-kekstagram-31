import { shuffleArray } from './utils.js';
import { openPreview } from './preview.js';

const photoWrapp = document.querySelector('.pictures');
const photoTemplate = document.querySelector('#picture').content.querySelector('.picture');
const photoFragment = document.createDocumentFragment();

const defaultButton = document.getElementById('filter-default');
const randomButton = document.getElementById('filter-random');
const discussedButton = document.getElementById('filter-discussed');
const commentArray = [];

function renderPhoto(photoArray) {
  function defaultFiler() {

    const allPic = document.querySelectorAll('.picture');
    allPic.forEach((el) => {
      photoWrapp.removeChild(el);
    });

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

    defaultButton.classList.add('img-filters__button--active');
    randomButton.classList.remove('img-filters__button--active');
    discussedButton.classList.remove('img-filters__button--active');

    openPreview();
  }
  defaultFiler();

  defaultButton.addEventListener('click', defaultFiler);

  function randomFilter() {
    const addArray = [];

    const allPic = document.querySelectorAll('.picture');
    allPic.forEach((el) => {
      photoWrapp.removeChild(el);
    });

    photoArray.forEach(({ url, description, likes, comments }) => {
      const photoElement = photoTemplate.cloneNode(true);

      photoElement.querySelector('.picture__img').src = url;
      photoElement.querySelector('.picture__img').alt = description;
      photoElement.querySelector('.picture__likes').textContent = likes;
      photoElement.querySelector('.picture__comments').textContent = comments.length;
      commentArray.push(comments);

      addArray.push(photoElement);
    });

    shuffleArray(addArray);
    const newArr = [...new Set(addArray)];
    newArr.slice(0, 10).forEach((photo) => {
      photoFragment.appendChild(photo);
    });

    photoWrapp.appendChild(photoFragment);

    randomButton.classList.add('img-filters__button--active');
    defaultButton.classList.remove('img-filters__button--active');
    discussedButton.classList.remove('img-filters__button--active');

    openPreview();
  }

  randomButton.addEventListener('click', randomFilter);

  function discussedFiler() {
    const addArray = [];

    const allPic = document.querySelectorAll('.picture');
    allPic.forEach((el) => {
      photoWrapp.removeChild(el);
    });

    photoArray.forEach(({ url, description, likes, comments }) => {
      const photoElement = photoTemplate.cloneNode(true);

      photoElement.querySelector('.picture__img').src = url;
      photoElement.querySelector('.picture__img').alt = description;
      photoElement.querySelector('.picture__likes').textContent = likes;
      photoElement.querySelector('.picture__comments').textContent = comments.length;
      commentArray.push(comments);

      addArray.push(photoElement);
    });

    let newArr = [];

    for (let i = 0; i < addArray.length; i++) {
      newArr.push(Number(addArray[i].querySelector('.picture__comments').textContent));
    }

    newArr = newArr.sort((a, b) => b - a);

    console.log(newArr);

    addArray.forEach((photo) => {
      photoFragment.appendChild(photo);
    });

    photoWrapp.appendChild(photoFragment);

    discussedButton.classList.add('img-filters__button--active');
    randomButton.classList.remove('img-filters__button--active');
    defaultButton.classList.remove('img-filters__button--active');

    openPreview();
  }

  discussedButton.addEventListener('click', discussedFiler);

}

export { commentArray, renderPhoto };
