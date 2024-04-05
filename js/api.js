import { RenderFilters } from './filters.js';

const ERROR_TIME = 5000;
const dataErrorTemplate = document.querySelector('#data-error').content.querySelector('.data-error');
const pageBody = document.querySelector('body');

function dataError() {
  pageBody.appendChild(dataErrorTemplate);

  setTimeout(() => {
    pageBody.removeChild(dataErrorTemplate);
  }, ERROR_TIME);
}

const filtersWrapper = document.querySelector('.img-filters');

fetch(
  'https://31.javascript.htmlacademy.pro/kekstagram/data/')

  .then((response) => {
    if (response.ok) {
      filtersWrapper.classList.remove('img-filters--inactive');
      return response.json();
    }
    dataError();
  })

  .then((photoArray) => {
    RenderFilters(photoArray);
  })

  .catch(() => {
    dataError();
  });
