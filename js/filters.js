import { shuffleArray, debounce } from './utils.js';
import { renderPhoto } from './rendering.js';

const photoWrapp = document.querySelector('.pictures');
function renderCleaner() {
  const allPic = document.querySelectorAll('.picture');
  allPic.forEach((el) => {
    photoWrapp.removeChild(el);
  });
}

function renderFilters(photoArray) {

  function defaultFilter() {
    renderCleaner();

    renderPhoto(renderPhoto);
  }

  function randomFilter() {
    renderCleaner();

    let copyPhotoArray = photoArray.slice();
    shuffleArray(copyPhotoArray);
    copyPhotoArray = copyPhotoArray.slice(0, 10);

    renderPhoto(copyPhotoArray);
  }

  const defaultButton = document.getElementById('filter-default');
  const randomButton = document.getElementById('filter-default');

  const debounceDefaultFilter = debounce(defaultFilter);
  defaultButton.addEventListener('click', debounceDefaultFilter);

  const debounceRandomFilter = debounce(randomFilter);
  randomButton.addEventListener('click', debounceRandomFilter);

}

export { renderFilters };
