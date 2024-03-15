const smallerScaleButton = document.querySelector('.scale__control--smaller');
const biggerScaleButton = document.querySelector('.scale__control--bigger');
// const scaleValue = document.querySelector('.scale__control--value');
const uploadPhoto = document.querySelector('.img-upload__photo');

function reducePhoto() {
  uploadPhoto.style.transform = 'scale(0.75)';
}
smallerScaleButton.addEventListener('click', reducePhoto);

function increasePhoto() {
  uploadPhoto.style.transform = 'scale(1)';
}
biggerScaleButton.addEventListener('click', increasePhoto);

//
function createSlider() {
  const sliderElement = document.querySelector('.effect-level__slider');

  noUiSlider.create(sliderElement, {
    range: {
      min: 0,
      max: 100,
    },
    start: 0,
    connect: 'lower'
  });
}

export { createSlider };
