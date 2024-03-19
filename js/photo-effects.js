const sliderElement = document.querySelector('.effect-level__slider');
const sliderContainer = document.querySelector('.img-upload__effect-level');
const targetImg = document.querySelector('.img-upload__preview');
const effectValue = document.querySelector('.effect-level__value');
const imgOriginalEffect = document.getElementById('effect-none');
const imgRadioChrome = document.getElementById('effect-chrome');
const imgRadioSepia = document.getElementById('effect-sepia');
const imgRadioInvert = document.getElementById('effect-marvin');
const imgRadioBlur = document.getElementById('effect-phobos');
const imgRadioBrightness = document.getElementById('effect-heat');

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 1,
  },
  start: 0,
  step: 0.1,
  connect: 'lower'
});
sliderContainer.classList.add('hidden');

function originalEffect() {
  sliderContainer.classList.add('hidden');

  targetImg.removeAttribute('style');
}
imgOriginalEffect.addEventListener('click', originalEffect);

function chromeEffect() {
  sliderContainer.classList.remove('hidden');
  sliderElement.noUiSlider.set(0);

  sliderElement.noUiSlider.on('update', () => {
    effectValue.value = sliderElement.noUiSlider.get();
    const chromeIntensity = `grayscale(${effectValue.value})`;
    targetImg.style.filter = chromeIntensity;
  });
}
imgRadioChrome.addEventListener('click', chromeEffect);

function sepiaEffect() {
  sliderContainer.classList.remove('hidden');
  sliderElement.noUiSlider.set(0);

  sliderElement.noUiSlider.on('update', () => {
    effectValue.value = sliderElement.noUiSlider.get();
    const sepiaIntensity = `sepia(${effectValue.value})`;
    targetImg.style.filter = sepiaIntensity;
  });
}
imgRadioSepia.addEventListener('click', sepiaEffect);

function invertEffect() {
  sliderContainer.classList.remove('hidden');

  sliderElement.noUiSlider.updateOptions({
    range: {
      min: 0,
      max: 100,
    },
    start: 0,
    step: 1,
  });
  sliderElement.noUiSlider.set(0);

  sliderElement.noUiSlider.on('update', () => {
    effectValue.value = sliderElement.noUiSlider.get();
    const invertIntensity = `invert(${effectValue.value}%)`;
    targetImg.style.filter = invertIntensity;
  });
}
imgRadioInvert.addEventListener('click', invertEffect);

function blurEffect() {
  sliderContainer.classList.remove('hidden');

  sliderElement.noUiSlider.updateOptions({
    range: {
      min: 0,
      max: 3,
    },
    start: 0,
    step: 0.1,
  });
  sliderElement.noUiSlider.set(0);

  sliderElement.noUiSlider.on('update', () => {
    effectValue.value = sliderElement.noUiSlider.get();
    const blurIntensity = `blur(${effectValue.value}px)`;
    targetImg.style.filter = blurIntensity;
  });
}
imgRadioBlur.addEventListener('click', blurEffect);

function brightnessEffect() {
  sliderContainer.classList.remove('hidden');

  sliderElement.noUiSlider.updateOptions({
    range: {
      min: 1,
      max: 3,
    },
    start: 0,
    step: 0.1,
  });
  sliderElement.noUiSlider.set(1);

  sliderElement.noUiSlider.on('update', () => {
    effectValue.value = sliderElement.noUiSlider.get();
    const brightnessIntensity = `brightness(${effectValue.value})`;
    targetImg.style.filter = brightnessIntensity;
  });
}
imgRadioBrightness.addEventListener('click', brightnessEffect);

export {sliderElement, targetImg};
