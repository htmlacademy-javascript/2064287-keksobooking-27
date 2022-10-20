const AD_FORM = document.querySelector('.ad-form');
const AD_FORMS_ELEMENTS = AD_FORM.querySelectorAll('fieldset');

const MAP_FORM = document.querySelector('.map__filters');
const MAP_FORMS_FILTER = MAP_FORM.querySelectorAll('.map__filter');
const MAP_FORM_FIELDSET = MAP_FORM.querySelector('.map__features');

const makeUnactive = () => {
  AD_FORM.classList.add('ad-form--disabled');
  MAP_FORM.classList.add('map__filters--disabled');

  AD_FORMS_ELEMENTS.forEach((element) => {
    element.setAttribute('disabled', true);
  });

  MAP_FORMS_FILTER.forEach((element) => {
    element.setAttribute('disabled', true);
  });
  MAP_FORM_FIELDSET.setAttribute('disabled', true);
};

const makeActive = () => {
  AD_FORM.classList.remove('ad-form--disabled');
  MAP_FORM.classList.remove('map__filters--disabled');

  AD_FORMS_ELEMENTS.forEach((element) => {
    element.removeAttribute('disabled');
  });

  MAP_FORMS_FILTER.forEach((element) => {
    element.removeAttribute('disabled');
  });
  MAP_FORM_FIELDSET.removeAttribute('disabled');

};

export { makeUnactive, makeActive };
