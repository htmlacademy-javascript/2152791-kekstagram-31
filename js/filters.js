import { shuffleArray, debounce } from './utils.js';
import { RenderPhoto } from './rendering.js';

const QUANTITY_PHOTOS = 10;
let commentsArray = [];

const photoWrapp = document.querySelector('.pictures');
function renderCleaner() {
  const allPictures = document.querySelectorAll('.picture');

  commentsArray = [];

  allPictures.forEach((el) => {
    photoWrapp.removeChild(el);
  });
}

function RenderFilters(photoArray) {
  const defaultButton = document.getElementById('filter-default');
  const randomButton = document.getElementById('filter-random');
  const discussedButton = document.getElementById('filter-discussed');

  RenderPhoto(photoArray);

  function renderDefaultFilter() {
    renderCleaner();

    RenderPhoto(photoArray);
  }

  function renderRandomFilter() {
    renderCleaner();

    let copyPhotoArray = photoArray.slice();
    shuffleArray(copyPhotoArray);
    copyPhotoArray = copyPhotoArray.slice(0, QUANTITY_PHOTOS);

    RenderPhoto(copyPhotoArray);
  }

  function renderDiscussedFilter() {
    renderCleaner();

    const copyPhotoArray = photoArray.slice();
    copyPhotoArray.sort((a, b) => b.comments.length - a.comments.length);

    RenderPhoto(copyPhotoArray);
  }

  function changeFilters(target) {
    switch (target) {
      case defaultButton:
        renderDefaultFilter();
        break;

      case randomButton:
        renderRandomFilter();
        break;

      case discussedButton:
        renderDiscussedFilter();
        break;
    }
  }

  const filtersWrapper = document.querySelector('.img-filters');

  function filtersListener(evt) {
    const target = evt.target;
    const checkedButton = document.querySelector('.img-filters__button--active');

    checkedButton.classList.remove('img-filters__button--active');
    target.classList.add('img-filters__button--active');

    const bindFilters = changeFilters.bind(null, target);

    debounce(bindFilters)();
  }

  filtersWrapper.addEventListener('click', filtersListener);
}

export { RenderFilters, commentsArray };
