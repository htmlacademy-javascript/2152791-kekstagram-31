import { uploadPhoto } from './user-form.js';

const DEFAULT_STEP = 25;
const smallerScaleButton = document.querySelector('.scale__control--smaller');
const biggerScaleButton = document.querySelector('.scale__control--bigger');
const scaleValue = document.querySelector('.scale__control--value');

function reducePhoto() {
  switch (scaleValue.value) {
    case '100%':
      uploadPhoto.style.transform = 'scale(0.75)';
      scaleValue.value = `${parseInt(scaleValue.value, 10) - DEFAULT_STEP}%`;
      break;

    case '75%':
      uploadPhoto.style.transform = 'scale(0.50)';
      scaleValue.value = `${parseInt(scaleValue.value, 10) - DEFAULT_STEP}%`;
      break;

    case '50%':
      uploadPhoto.style.transform = 'scale(0.25)';
      scaleValue.value = `${parseInt(scaleValue.value, 10) - DEFAULT_STEP}%`;
      break;

    case '25%':
      break;
  }
}
smallerScaleButton.addEventListener('click', reducePhoto);

function increasePhoto() {
  switch (scaleValue.value) {
    case '25%':
      uploadPhoto.style.transform = 'scale(0.50)';
      scaleValue.value = `${parseInt(scaleValue.value, 10) + DEFAULT_STEP}%`;
      break;

    case '50%':
      uploadPhoto.style.transform = 'scale(0.75)';
      scaleValue.value = `${parseInt(scaleValue.value, 10) + DEFAULT_STEP}%`;
      break;

    case '75%':
      uploadPhoto.style.transform = 'scale(1)';
      scaleValue.value = `${parseInt(scaleValue.value, 10) + DEFAULT_STEP}%`;
      break;

    case '100%':
      break;
  }
}
biggerScaleButton.addEventListener('click', increasePhoto);

export { scaleValue };
