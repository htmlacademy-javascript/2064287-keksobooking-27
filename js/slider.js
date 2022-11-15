import { SLIDER, PRICE, PriceForLiving, TYPE_OF_LIVING } from './form.js';

const MAX_SLIDER_RANGE = 100000;


noUiSlider.create(SLIDER, {
  range: {
    min: PriceForLiving[TYPE_OF_LIVING.value],
    max: MAX_SLIDER_RANGE,
  },
  start: PriceForLiving[TYPE_OF_LIVING.value],
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

PRICE.addEventListener('change', () => {
  SLIDER.noUiSlider.set(PRICE.value);
});
