const FORM = document.querySelector('.ad-form');
const TITLE = FORM.querySelector('#title');
const PRICE = FORM.querySelector('#price');
// const ADDRESS = FORM.querySelector('#address');


const pristineConfig = {
  classTo: 'ad-form__element',
  errorClass: 'ad-form__element--invalid',
  errorTextParent: 'ad-form__element',
  errorTextClass: 'text-help'
};
const pristine = new Pristine(FORM, pristineConfig);

// const title = {
//   min: 30,
//   max: 100,
//   element: TITLE,
// };

const titleValidation = (value) => value.length >= 30 && value.length <= 100;
const getTitleMessage = (value) => {
  if (!value.length) {
    return 'Поле обязательно для заполнения';
  }
  return `Необходимо ввести от 30 до 100 символов. Вы ввели: ${value.length}`;
};

pristine.addValidator(
  TITLE, titleValidation,
  getTitleMessage, 100, true
);

// const price = {
//   max: 100000,
//   element: PRICE,
// };

const priceValidation = (value) => +value && +value <= 100000;
const getPriceMessage = (value) => {
  if (!+value) {
    return 'Поле обязательно для заполнения';
  }
  return 'Максимальная стоимость: 100 000';
};

pristine.addValidator(
  PRICE, priceValidation,
  getPriceMessage, 100, true
);


// const formValidatorData = {
//   title : {
//     min: 20,
//     max: 100,
//     element: TITLE
//   },
//   price: {
//     max: 100000,
//     element: PRICE,
//   },
//   address: {
//     element: ADDRESS

//   },

// };

// const makePristine = (validatorData, form, config) =>{
//   const pristine = new Pristine(form, config);

// pristine.addValidator(elem, fn, msg, priority, halt)

// };


FORM.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();
  if (isValid) { console.log('true');}
  else { console.log('false');}
});
