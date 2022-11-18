import { slider, price, PriceForLiving, typeOfLiving } from './form.js';

const MAX_SLIDER_RANGE = 100000;


noUiSlider.create(slider, {
  range: {
    min: PriceForLiving[typeOfLiving.value],
    max: MAX_SLIDER_RANGE,
  },
  start: PriceForLiving[typeOfLiving.value],
  step: 1,
  connect: 'lower',
  format: {
    to: (value) => value.toFixed(),
    from: (value) => +value
  }
});

slider.noUiSlider.on('update', () => {
  price.value = slider.noUiSlider.get();
});

price.addEventListener('change', () => {
  slider.noUiSlider.set(price.value);
});
