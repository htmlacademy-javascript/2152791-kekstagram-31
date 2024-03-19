import {uploadPhoto } from './user-form.js';

const smallerScaleButton = document.querySelector('.scale__control--smaller');
const biggerScaleButton = document.querySelector('.scale__control--bigger');
const scaleValue = document.querySelector('.scale__control--value');
let defaultValue = 100;
const defaultStep = 25;

function reducePhoto() {
  if (defaultValue === 100) {
    uploadPhoto.style.transform = 'scale(0.75)';
    defaultValue = defaultValue - defaultStep;
  } else if (defaultValue === 75) {
    uploadPhoto.style.transform = 'scale(0.50)';
    defaultValue = defaultValue - defaultStep;
  } else if (defaultValue === 50) {
    uploadPhoto.style.transform = 'scale(0.25)';
    defaultValue = defaultValue - defaultStep;
  } else if (defaultValue < 25) {
    return;
  }

  scaleValue.value = `${defaultValue}%`;
}
smallerScaleButton.addEventListener('click', reducePhoto);

function increasePhoto() {
  if (defaultValue === 25) {
    uploadPhoto.style.transform = 'scale(0.50)';
    defaultValue = defaultValue + defaultStep;
  } else if (defaultValue === 50) {
    uploadPhoto.style.transform = 'scale(0.75)';
    defaultValue = defaultValue + defaultStep;
  } else if (defaultValue === 75) {
    uploadPhoto.style.transform = 'scale(1)';
    defaultValue = defaultValue + defaultStep;
  } else if (defaultValue > 100) {
    return;
  }

  scaleValue.value = `${defaultValue}%`;
}
biggerScaleButton.addEventListener('click', increasePhoto);

export { scaleValue, defaultValue };
