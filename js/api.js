// import { renderPhoto } from './rendering.js';
import { renderFilters } from './filters.js';

const dataErrorTemplate = document.querySelector('#data-error').content.querySelector('.data-error');
const pageBody = document.querySelector('body');
const errorTime = 5000;

function dataError() {
  pageBody.appendChild(dataErrorTemplate);

  setTimeout(() => {
    pageBody.removeChild(dataErrorTemplate);
  }, errorTime);
}

const filtersWrapper = document.querySelector('.img-filters');

fetch(
  'https://31.javascript.htmlacademy.pro/kekstagram/data')

  .then((response) => {
    if (response.ok) {
      filtersWrapper.classList.remove('img-filters--inactive');
      return response.json();
    }
    dataError();
  })

  .then((photoArray) => {
    renderFilters(photoArray);
  })

  .catch(() => {
    dataError();
  });
