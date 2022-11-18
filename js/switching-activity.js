const adForm = document.querySelector('.ad-form');
const adFormsElements = adForm.querySelectorAll('fieldset');

const mapForm = document.querySelector('.map__filters');
const mapFormsFilter = mapForm.querySelectorAll('.map__filter');
const mapFormFieldset = mapForm.querySelector('.map__features');

const makeAdFormInactive = () => {
  adForm.classList.add('ad-form--disabled');

  adFormsElements.forEach((element) => {
    element.setAttribute('disabled', true);
  });
};

const makeMapFormInactive = () => {
  mapForm.classList.add('map__filters--disabled');

  mapFormsFilter.forEach((element) => {
    element.setAttribute('disabled', true);
  });
  mapFormFieldset.setAttribute('disabled', true);
};

const makeActive = () => {
  adForm.classList.remove('ad-form--disabled');
  mapForm.classList.remove('map__filters--disabled');
  adFormsElements.forEach((element) => {
    element.removeAttribute('disabled');
  });

  mapFormsFilter.forEach((element) => {
    element.removeAttribute('disabled');
  });
  mapFormFieldset.removeAttribute('disabled');
};

export { makeAdFormInactive, makeMapFormInactive, makeActive };
