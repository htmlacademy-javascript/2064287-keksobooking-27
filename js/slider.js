import { SLIDER, PRICE } from './form.js';
const MIN_SLIDER_RANGE = 0;
const MAX_SLIDER_RANGE = 100000;
noUiSlider.create(SLIDER, {
  range: {
    min: MIN_SLIDER_RANGE,
    max: MAX_SLIDER_RANGE,
  },
  start: 0,
  step: 1,
  connect: 'lower',
  format: {
    to: (value) => value.toFixed(),
    from: (value) => +value
  }
});


SLIDER.noUiSlider.on('update', () => {
  PRICE.value = SLIDER.noUiSlider.get();
});
