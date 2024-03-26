import { renderPhoto } from './rendering.js';
import { openPreview } from './preview.js';

const dataErrorTemplate = document.querySelector('#data-error').content.querySelector('.data-error');
const pageBody = document.querySelector('body');
const errorTime = 5000;

function dataError() {
  pageBody.appendChild(dataErrorTemplate);

  setTimeout(() => {
    pageBody.removeChild(dataErrorTemplate);
  }, errorTime);
}

fetch(
  'https://31.javascript.htmlacademy.pro/kekstagram/data')

  .then((response) => {
    if (response.ok) {
      return response.json();
    }
    dataError();
  })

  .then((data) => {
    renderPhoto(data);

    openPreview(data);
  })

  .catch(() => {
    dataError();
  });

