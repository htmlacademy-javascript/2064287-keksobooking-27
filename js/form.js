import { sendData } from './API.js';
import { getStatusMessage, closeStatusMessageByClick, closeStatusMessageByPress, closeStatusMessageByButton } from './util.js';
import { map, mainPin, TokyoCoordinate } from './map.js';
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
const successMessage = document.querySelector('#success').content.querySelector('.success');
const errorMessage = document.querySelector('#error').content.querySelector('.error');
const errorButton = errorMessage.querySelector('.error__button');
const resetButton = form.querySelector('.ad-form__reset');
const mapFilteringFrom = document.querySelector('.map__filters');

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

const pristine = new Pristine(form, pristineConfig);

const istitleValidated = (value) => value.length >= 30 && value.length <= 100;
const getTitleMessage = (value) => {
  if (!value.length) {
    return 'Поле обязательно для заполнения';
  }
  return `Необходимо ввести от 30 до 100 символов. Вы ввели: ${value.length}`;
};
pristine.addValidator(title, istitleValidated, getTitleMessage, 100, true);

typeOfLiving.addEventListener('change', () => {
  const selectedValue = typeOfLiving.options[typeOfLiving.selectedIndex].value;
  price.setAttribute('min', `${PriceForLiving[selectedValue]}`);
  price.placeholder = PriceForLiving[selectedValue];
  pristine.validate(price);
});

const isPriceValidated = (value) => {
  if (!value) {
    return false;
  }
  const selectedValueInTypeOfLiving = typeOfLiving.options[typeOfLiving.selectedIndex].value;
  const minimalValue = PriceForLiving[selectedValueInTypeOfLiving];

  return +value >= minimalValue && +value <= 100000;
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
capacity.addEventListener('change', () => {
  pristine.validate(rooms);
});
const getRoomsMessage = () => RoomsAndCapacity[rooms.value];
pristine.addValidator(rooms, isRoomsValidated, getRoomsMessage, 100, true);


checkIn.addEventListener('change', () => {
  const selectedValueCheckin = checkIn.options[checkIn.selectedIndex].value;
  checkOut.value = selectedValueCheckin;
});
checkOut.addEventListener('change', () => {
  const selectedValueCheckout = checkOut.options[checkOut.selectedIndex].value;
  checkIn.value =
selectedValueCheckout;
});


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

const onFormSubmit = () => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    if (pristine.validate()) {
      blockSubmitButton();
      sendData(
        () => {
          unblockSubmitButton();
          getStatusMessage(successMessage);
          resetForm();
        },
        () => {
          getStatusMessage(errorMessage);
          unblockSubmitButton();
        },
        new FormData(evt.target),
      );
    }
  });
};

onFormSubmit();

closeStatusMessageByClick(successMessage);
closeStatusMessageByPress(successMessage);
closeStatusMessageByClick(errorMessage);
closeStatusMessageByPress(errorMessage);
closeStatusMessageByButton(errorMessage, errorButton);

const onResetButtonClick = () => {
  resetButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    resetForm();
  });
};
onResetButtonClick();

export { address, slider, price, mapFilteringFrom, PriceForLiving, typeOfLiving };
