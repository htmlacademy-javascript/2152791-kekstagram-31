const sliderElement = document.querySelector('.effect-level__slider');
const sliderContainer = document.querySelector('.img-upload__effect-level');

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 1,
  },
  start: 1,
  step: 0.1,
  connect: 'lower'
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

const targetImg = document.querySelector('.img-upload__preview');
const imgOriginalEffect = document.getElementById('effect-none');

function originalEffect() {
  sliderContainer.classList.add('hidden');

  targetImg.removeAttribute('style');
}
imgOriginalEffect.addEventListener('click', originalEffect);

const effectValue = document.querySelector('.effect-level__value');
const imgRadioChrome = document.getElementById('effect-chrome');

function chromeEffect() {
  updateSlider(0, 1, 1, 0.1);

  sliderElement.noUiSlider.on('update', () => {
    effectValue.value = sliderElement.noUiSlider.get();
    const chromeIntensity = `grayscale(${effectValue.value})`;
    targetImg.style.filter = chromeIntensity;
  });
}
imgRadioChrome.addEventListener('click', chromeEffect);

const imgRadioSepia = document.getElementById('effect-sepia');

function sepiaEffect() {
  updateSlider(0, 1, 1, 0.1);

  sliderElement.noUiSlider.on('update', () => {
    effectValue.value = sliderElement.noUiSlider.get();
    const sepiaIntensity = `sepia(${effectValue.value})`;
    targetImg.style.filter = sepiaIntensity;
  });
}
imgRadioSepia.addEventListener('click', sepiaEffect);

const imgRadioInvert = document.getElementById('effect-marvin');

function invertEffect() {
  updateSlider(0, 100, 100, 1);

  sliderElement.noUiSlider.on('update', () => {
    effectValue.value = sliderElement.noUiSlider.get();
    const invertIntensity = `invert(${effectValue.value}%)`;
    targetImg.style.filter = invertIntensity;
  });
}
imgRadioInvert.addEventListener('click', invertEffect);

const imgRadioBlur = document.getElementById('effect-phobos');

function blurEffect() {
  updateSlider(0, 3, 3, 0.1);

  sliderElement.noUiSlider.on('update', () => {
    effectValue.value = sliderElement.noUiSlider.get();
    const blurIntensity = `blur(${effectValue.value}px)`;
    targetImg.style.filter = blurIntensity;
  });
}
imgRadioBlur.addEventListener('click', blurEffect);

const imgRadioBrightness = document.getElementById('effect-heat');

function brightnessEffect() {
  updateSlider(1, 3, 3, 0.1);

  sliderElement.noUiSlider.on('update', () => {
    effectValue.value = sliderElement.noUiSlider.get();
    const brightnessIntensity = `brightness(${effectValue.value})`;
    targetImg.style.filter = brightnessIntensity;
  });
}
imgRadioBrightness.addEventListener('click', brightnessEffect);

export { sliderContainer, targetImg, imgOriginalEffect };
