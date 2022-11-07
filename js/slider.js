import { SLIDER, PRICE } from './form.js';
noUiSlider.create(SLIDER, {
  range: {
    min: 0,
    max: 100000,
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
