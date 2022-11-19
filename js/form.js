import { sendData } from './server.js';
import { getSuccessMessage, getErrorMessage, successMessage, errorMessage } from './popup-message.js';
// import { getStatusMessage, errorMessage } from './popup-message.js';

import { map, mainPin, TokyoCoordinate, } from './map.js';
import { clearPreviewFields } from './adding-pictures.js';

const form = document.querySelector('.ad-form');
const title = form.querySelector('#title');
const address = form.querySelector('#address');
const price = form.querySelector('#price');
const rooms = form.querySelector('#room_number');
const capacity = form.querySelector('#capacity');
const typeOfLiving = form.querySelector('#type');
const checkIn = form.querySelector('#timein');
const checkOut = form.querySelector('#timeout');
const slider = form.querySelector('.ad-form__slider');
const submitButton = form.querySelector('.ad-form__submit');
const resetButton = form.querySelector('.ad-form__reset');
const mapFilteringFrom = document.querySelector('.map__filters');

const pristineConfig = {
  classTo: 'ad-form__element',
  errorClass: 'ad-form__element--invalid',
  errorTextParent: 'ad-form__element',
  errorTextClass: 'text-help'
};

const MIN_AMOUNT_LETTERS_IN_TITLE = 30;
const MAX_AMOUNT_LETTERS_IN_TITLE = 100;

const MAX_PRISE = 100000;

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

const pristine = new Pristine(form, pristineConfig);

const istitleValidated = (value) => value.length >= MIN_AMOUNT_LETTERS_IN_TITLE && value.length <= MAX_AMOUNT_LETTERS_IN_TITLE;
const getTitleMessage = (value) => {
  if (!value.length) {
    return 'Поле обязательно для заполнения';
  }
  return `Необходимо ввести от 30 до 100 символов. Вы ввели: ${value.length}`;
};
pristine.addValidator(title, istitleValidated, getTitleMessage, 100, true);

const onTypeOfLivingChange = () => {
  const selectedValue = typeOfLiving.options[typeOfLiving.selectedIndex].value;
  price.setAttribute('min', `${PriceForLiving[selectedValue]}`);
  price.placeholder = PriceForLiving[selectedValue];
  pristine.validate(price);
};

typeOfLiving.addEventListener('change', onTypeOfLivingChange);

const isPriceValidated = (value) => {
  if (!value) {
    return false;
  }
  const selectedValueInTypeOfLiving = typeOfLiving.options[typeOfLiving.selectedIndex].value;
  const minimalValue = PriceForLiving[selectedValueInTypeOfLiving];

  return +value >= minimalValue && +value <= MAX_PRISE;
};

const getPriceMessage = (value) => {
  const typeOfLivingSelectedValue = typeOfLiving.options[typeOfLiving.selectedIndex].value;

  if (!value) {
    return 'Поле обязательно для заполнения';
  }
  if (+value <= PriceForLiving[typeOfLivingSelectedValue]) {
    return `Минимальная стоимость: ${PriceForLiving[typeOfLivingSelectedValue]}`;
  }
  return 'Максимальная стоимость: 100 000';
};

pristine.addValidator(price, isPriceValidated, getPriceMessage, 100, true);

const isRoomsValidated = () => {
  const roomValue = parseInt(rooms.value, 10);
  const capacityValue = parseInt(capacity.value, 10);
  const roomsValidCapacitiesMap = {
    1: [1],
    2: [1, 2],
    3: [1, 2, 3],
    100: [0],
  };

  const validCapacityValuesForRoom = roomsValidCapacitiesMap[roomValue];
  return validCapacityValuesForRoom.includes(capacityValue);
};
const onCapacityChange = () => {
  pristine.validate(rooms);
};

capacity.addEventListener('change', onCapacityChange);

const getRoomsMessage = () => RoomsAndCapacity[rooms.value];
pristine.addValidator(rooms, isRoomsValidated, getRoomsMessage, 100, true);

const onCheckInChange = () => {
  const selectedValueCheckin = checkIn.options[checkIn.selectedIndex].value;
  checkOut.value = selectedValueCheckin;
};
checkIn.addEventListener('change', onCheckInChange);

const onCheckOutChange = () => {
  const selectedValueCheckout = checkOut.options[checkOut.selectedIndex].value;
  checkIn.value = selectedValueCheckout;
};
checkOut.addEventListener('change', onCheckOutChange);


const blockSubmitButton = () => {
  submitButton.disable = true;
  submitButton.textContent = 'Публикую...';
};

const unblockSubmitButton = () => {
  submitButton.disable = false;
  submitButton.textContent = 'Опубликовать';
};

const resetForm = () => {
  form.reset();
  mapFilteringFrom.reset();
  mainPin.setLatLng({
    lat: TokyoCoordinate.LAT,
    lng: TokyoCoordinate.LNG
  });
  map.setView({
    lat: TokyoCoordinate.LAT,
    lng: TokyoCoordinate.LNG
  }, 10);
  map.closePopup();
  clearPreviewFields();
};

const onFormSubmit = (evt) => {
  evt.preventDefault();
  if (pristine.validate()) {
    blockSubmitButton();
    sendData(
      () => {
        unblockSubmitButton();
        getSuccessMessage(successMessage);
        resetForm();
        slider.noUiSlider.reset();
      },
      () => {
        getErrorMessage(errorMessage);
        unblockSubmitButton();
      },
      new FormData(evt.target),
    );
  }
};

form.addEventListener('submit', onFormSubmit);

const onResetButtonClick = (evt) => {
  evt.preventDefault();
  resetForm();
  slider.noUiSlider.reset();
};
resetButton.addEventListener('click', onResetButtonClick);

export { address, slider, price, mapFilteringFrom, PriceForLiving, typeOfLiving};
