const FORM = document.querySelector('.ad-form');
const TITLE = FORM.querySelector('#title');
const PRICE = FORM.querySelector('#price');
const ROOMS = FORM.querySelector('#room_number');
const CAPACITY = FORM.querySelector('#capacity');

const pristineConfig = {
  classTo: 'ad-form__element',
  errorClass: 'ad-form__element--invalid',
  errorTextParent: 'ad-form__element',
  errorTextClass: 'text-help'
};
const pristine = new Pristine(FORM, pristineConfig);

const titleValidation = (value) => value.length >= 30 && value.length <= 100;
const getTitleMessage = (value) => {
  if (!value.length) {
    return 'Поле обязательно для заполнения';
  }
  return `Необходимо ввести от 30 до 100 символов. Вы ввели: ${value.length}`;
};
pristine.addValidator(TITLE, titleValidation, getTitleMessage, 100, true);


const priceValidation = (value) => +value && +value <= 100000;
const getPriceMessage = (value) => {
  if (!+value) {
    return 'Поле обязательно для заполнения';
  }
  return 'Максимальная стоимость: 100 000';
};
pristine.addValidator(PRICE, priceValidation, getPriceMessage, 100, true);

// Поле «Количество комнат» синхронизировано с полем «Количество мест» таким образом,
// что при выборе количества комнат вводятся ограничения на допустимые варианты выбора количества гостей:
const RoomsAndCapacity = {
  1: '«для 1 гостя»',
  2 : '«для 2 гостей» или «для 1 гостя»',
  3 : '«для 3 гостей», «для 2 гостей» или «для 1 гостя»',
  100 : '«не для гостей»'
};

const roomsValidation = () => {
  const roomValue = parseInt(ROOMS.value, 10);
  const capacityValue = parseInt(CAPACITY.value, 10);
  const roomsValidCapacitiesMap = {
    1: [1],
    2: [1, 2],
    3: [1, 2, 3],
    100: [0],
  };

  const validCapacityValuesForRoom = roomsValidCapacitiesMap[roomValue];
  return validCapacityValuesForRoom.includes(capacityValue);
};

CAPACITY.addEventListener('change', () => {
  pristine.validate(ROOMS);
});

const getRoomsMessage = () => RoomsAndCapacity[ROOMS.value];

pristine.addValidator(ROOMS, roomsValidation, getRoomsMessage, 100, true);

FORM.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});
