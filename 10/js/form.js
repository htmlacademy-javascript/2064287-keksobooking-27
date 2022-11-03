import { sendData } from './API.js';
import { getStatusMessage, closeStatusMessageByClick, closeStatusMessageByPress, closeStatusMessageByButton } from './util.js';
import { map, mainPin, TokyoCoordinate } from './map.js';

const FORM = document.querySelector('.ad-form');
const TITLE = FORM.querySelector('#title');
const ADDRESS = FORM.querySelector('#address');
const PRICE = FORM.querySelector('#price');
const ROOMS = FORM.querySelector('#room_number');
const CAPACITY = FORM.querySelector('#capacity');
const TYPE_OF_LIVING = FORM.querySelector('#type');
const CHECKIN = FORM.querySelector('#timein');
const CHECKOUT = FORM.querySelector('#timeout');
const SLIDER = FORM.querySelector('.ad-form__slider');
const SUBMIT_BUTTON = FORM.querySelector('.ad-form__submit');
const SUCCESS_MESSAGE = document.querySelector('#success').content.querySelector('.success');
const ERROR_MESSAGE = document.querySelector('#error').content.querySelector('.error');
const ERROR_BUTTON = ERROR_MESSAGE.querySelector('.error__button');
const RESET_BUTTON = FORM.querySelector('.ad-form__reset');

const pristineConfig = {
  classTo: 'ad-form__element',
  errorClass: 'ad-form__element--invalid',
  errorTextParent: 'ad-form__element',
  errorTextClass: 'text-help'
};
const PriceForLiving = {
  'bungalow': 0,
  'flat': 1000,
  'hotel': 3000,
  'house': 5000,
  'palace': 10000
};
const RoomsAndCapacity = {
  1: '«для 1 гостя»',
  2: '«для 2 гостей» или «для 1 гостя»',
  3: '«для 3 гостей», «для 2 гостей» или «для 1 гостя»',
  100: '«не для гостей»'
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

TYPE_OF_LIVING.addEventListener('change', () => {
  const selectedValue = TYPE_OF_LIVING.options[TYPE_OF_LIVING.selectedIndex].value;
  PRICE.setAttribute('min', `${PriceForLiving[selectedValue]}`);
  PRICE.value = PriceForLiving[selectedValue];
  PRICE.placeholder = PriceForLiving[selectedValue];
  pristine.validate(PRICE);
});

const priceValidation = (value) => {
  if (!value) {
    return false;
  }
  const selectedValueInTypeOfLiving = TYPE_OF_LIVING.options[TYPE_OF_LIVING.selectedIndex].value;
  const minimalValue = PriceForLiving[selectedValueInTypeOfLiving];

  return +value >= minimalValue && +value <= 100000;
};

const getPriceMessage = (value) => {
  const typeOfLivingSelectedValue = TYPE_OF_LIVING.options[TYPE_OF_LIVING.selectedIndex].value;

  if (!value) {
    return 'Поле обязательно для заполнения';
  }
  if (+value <= PriceForLiving[typeOfLivingSelectedValue]) {
    return `Минимальная стоимость: ${PriceForLiving[typeOfLivingSelectedValue]}`;
  }
  return 'Максимальная стоимость: 100 000';
};

pristine.addValidator(PRICE, priceValidation, getPriceMessage, 100, true);

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


CHECKIN.addEventListener('change', () => {
  const selectedValueCheckin = CHECKIN.options[CHECKIN.selectedIndex].value;
  CHECKOUT.value = selectedValueCheckin;
});
CHECKOUT.addEventListener('change', () => {
  const selectedValueCheckout = CHECKOUT.options[CHECKOUT.selectedIndex].value;
  CHECKIN.value = selectedValueCheckout;
});


const blockSubmitButton = () => {
  SUBMIT_BUTTON.disable = true;
  SUBMIT_BUTTON.textContent = 'Публикую...';
};

const unblockSubmitButton = () => {
  SUBMIT_BUTTON.disable = false;
  SUBMIT_BUTTON.textContent = 'Опубликовать';
};

const resetForm = () => {
  FORM.reset();
  mainPin.setLatLng({
    lat: TokyoCoordinate.LAT,
    lng: TokyoCoordinate.LNG
  });
  map.setView({
    lat: TokyoCoordinate.LAT,
    lng: TokyoCoordinate.LNG
  }, 10);
  map.closePopup();
  //add reset of filtring
};

FORM.addEventListener('submit', (evt) => {
  evt.preventDefault();
  if (pristine.validate()) {
    blockSubmitButton();
    sendData(
      () => {
        unblockSubmitButton();
        getStatusMessage(SUCCESS_MESSAGE);
        resetForm();
      },
      () => {
        getStatusMessage(ERROR_MESSAGE);
        unblockSubmitButton();
      },
      new FormData(evt.target),
    );
  }
});

closeStatusMessageByClick(SUCCESS_MESSAGE);
closeStatusMessageByPress(SUCCESS_MESSAGE);
closeStatusMessageByClick(ERROR_MESSAGE);
closeStatusMessageByPress(ERROR_MESSAGE);
closeStatusMessageByButton(ERROR_MESSAGE, ERROR_BUTTON);

RESET_BUTTON.addEventListener('click', (evt) => {
  evt.preventDefault();
  resetForm();
});

export { ADDRESS, SLIDER, PRICE };
