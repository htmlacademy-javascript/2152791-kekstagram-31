const sliderElement = document.querySelector('.effect-level__slider');
const sliderContainer = document.querySelector('.img-upload__effect-level');

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 1,
  },
  start: 1,
  step: 0.1,
  connect: 'lower',
  format: {
    to: function (value) {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(1);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});
sliderContainer.classList.add('hidden');

function updateSlider(min, max, start, step) {
  sliderContainer.classList.remove('hidden');

  sliderElement.noUiSlider.updateOptions({
    range: {
      min,
      max,
    },
    start,
    step
  });
}

const targetImg = document.querySelector('.img-upload__photo');
const imgOriginalEffect = document.getElementById('effect-none');

function applyOriginalEffect() {
  sliderContainer.classList.add('hidden');

  targetImg.removeAttribute('style');
}
imgOriginalEffect.addEventListener('click', applyOriginalEffect);

const effectValue = document.querySelector('.effect-level__value');
const imgRadioChrome = document.getElementById('effect-chrome');

function applyChromeEffect() {
  updateSlider(0, 1, 1, 0.1);

  sliderElement.noUiSlider.on('update', () => {
    effectValue.value = sliderElement.noUiSlider.get();
    const chromeIntensity = `grayscale(${effectValue.value})`;
    targetImg.style.filter = chromeIntensity;
  });
}
imgRadioChrome.addEventListener('click', applyChromeEffect);

const imgRadioSepia = document.getElementById('effect-sepia');

function applySepiaEffect() {
  updateSlider(0, 1, 1, 0.1);

  sliderElement.noUiSlider.on('update', () => {
    effectValue.value = sliderElement.noUiSlider.get();
    const sepiaIntensity = `sepia(${effectValue.value})`;
    targetImg.style.filter = sepiaIntensity;
  });
}
imgRadioSepia.addEventListener('click', applySepiaEffect);

const imgRadioInvert = document.getElementById('effect-marvin');

function applyInvertEffect() {
  updateSlider(0, 100, 100, 1);

  sliderElement.noUiSlider.on('update', () => {
    effectValue.value = sliderElement.noUiSlider.get();
    const invertIntensity = `invert(${effectValue.value}%)`;
    targetImg.style.filter = invertIntensity;
  });
}
imgRadioInvert.addEventListener('click', applyInvertEffect);

const imgRadioBlur = document.getElementById('effect-phobos');

function applyBlurEffect() {
  updateSlider(0, 3, 3, 0.1);

  sliderElement.noUiSlider.on('update', () => {
    effectValue.value = sliderElement.noUiSlider.get();
    const blurIntensity = `blur(${effectValue.value}px)`;
    targetImg.style.filter = blurIntensity;
  });
}
imgRadioBlur.addEventListener('click', applyBlurEffect);

const imgRadioBrightness = document.getElementById('effect-heat');

function applyBrightnessEffect() {
  updateSlider(1, 3, 3, 0.1);

  sliderElement.noUiSlider.on('update', () => {
    effectValue.value = sliderElement.noUiSlider.get();
    const brightnessIntensity = `brightness(${effectValue.value})`;
    targetImg.style.filter = brightnessIntensity;
  });
}
imgRadioBrightness.addEventListener('click', applyBrightnessEffect);

export { sliderContainer, targetImg, imgOriginalEffect };
