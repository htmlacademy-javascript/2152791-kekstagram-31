import { openPreview } from './preview.js';

const photoWrapp = document.querySelector('.pictures');
const photoTemplate = document.querySelector('#picture').content.querySelector('.picture');
const photoFragment = document.createDocumentFragment();

const commentArray = [];

// function renderPhoto(photoArray) {
//   function defaultFilter() {

//     const allPic = document.querySelectorAll('.picture');
//     allPic.forEach((el) => {
//       photoWrapp.removeChild(el);
//     });
//     commentArray = [];

//     photoArray.forEach(({ url, description, likes, comments }) => {
//       const photoElement = photoTemplate.cloneNode(true);

//       photoElement.querySelector('.picture__img').src = url;
//       photoElement.querySelector('.picture__img').alt = description;
//       photoElement.querySelector('.picture__likes').textContent = likes;
//       photoElement.querySelector('.picture__comments').textContent = comments.length;
//       commentArray.push(comments);

//       photoFragment.appendChild(photoElement);
//     });

//     photoWrapp.appendChild(photoFragment);

//     defaultButton.classList.add('img-filters__button--active');
//     randomButton.classList.remove('img-filters__button--active');
//     discussedButton.classList.remove('img-filters__button--active');

//     openPreview();
//   }
//   defaultFilter();

//   const debounceDefaultFilter = debounce(defaultFilter);
//   defaultButton.addEventListener('click', debounceDefaultFilter);

//   function randomFilter() {
//     const newArr = [];

//     commentArray = [];
//     const allPic = document.querySelectorAll('.picture');
//     allPic.forEach((el) => {
//       photoWrapp.removeChild(el);
//     });

//     newArr.push(...photoArray);
//     shuffleArray(newArr);

//     newArr.slice(0, 10).forEach(({ url, description, likes, comments }) => {
//       const photoElement = photoTemplate.cloneNode(true);

//       photoElement.querySelector('.picture__img').src = url;
//       photoElement.querySelector('.picture__img').alt = description;
//       photoElement.querySelector('.picture__likes').textContent = likes;
//       photoElement.querySelector('.picture__comments').textContent = comments.length;
//       commentArray.push(comments);

//       photoFragment.appendChild(photoElement);
//     });

//     photoWrapp.appendChild(photoFragment);

//     randomButton.classList.add('img-filters__button--active');
//     defaultButton.classList.remove('img-filters__button--active');
//     discussedButton.classList.remove('img-filters__button--active');

//     openPreview();
//   }

//   const debounceRandomFilter = debounce(randomFilter);
//   randomButton.addEventListener('click', debounceRandomFilter);

//   function discussedFilter() {
//     const addArray = [];

//     commentArray = [];
//     const allPic = document.querySelectorAll('.picture');
//     allPic.forEach((el) => {
//       photoWrapp.removeChild(el);
//     });

//     photoArray.forEach(({ url, description, likes, comments }) => {
//       const photoElement = photoTemplate.cloneNode(true);

//       photoElement.querySelector('.picture__img').src = url;
//       photoElement.querySelector('.picture__img').alt = description;
//       photoElement.querySelector('.picture__likes').textContent = likes;
//       photoElement.querySelector('.picture__comments').textContent = comments.length;
//       commentArray.push(comments);

//       addArray.push(photoElement);
//     });

//     let newArr = [];

//     for (let i = 0; i < addArray.length; i++) {
//       newArr.push(Number(addArray[i].querySelector('.picture__comments').textContent));
//     }

//     newArr = newArr.sort((a, b) => b - a);

//     addArray.forEach((photo) => {
//       photoFragment.appendChild(photo);
//     });

//     photoWrapp.appendChild(photoFragment);

//     discussedButton.classList.add('img-filters__button--active');
//     randomButton.classList.remove('img-filters__button--active');
//     defaultButton.classList.remove('img-filters__button--active');

//     openPreview();
//   }

//   const debounceDiscussedFilter = debounce(discussedFilter);
//   discussedButton.addEventListener('click', debounceDiscussedFilter);
// }

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

  openPreview();
}

export { commentArray, renderPhoto };
