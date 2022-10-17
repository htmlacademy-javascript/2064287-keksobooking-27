import {getRandomArrayElement, getRandomIntegerNumber, getShuffledArrayWithRandomLength, getRandomFloatingPointNumber} from './util.js';

const RANDOM_ADS_AMOUNT = 10;
const MIN_PRICE = 0;
const MAX_PRICE = 100000;
const MIN_ROOMS_AMOUNT = 1;
const MAX_ROOMS_AMOUNT = 100;
const MIN_GUESTS_AMOUNT = 1;
const MAX_GUESTS_AMOUNT = 200;
const MIN_LAT = 35.65000;
const MAX_LAT = 35.70000;
const MIN_LNG = 139.70000;
const MAX_LNG = 139.80000;
const AMOUNT_SYNBOLS_AFTER_POINT_IN_LOCATION = 5;
const TITLES = [
  'Chateau',
  'Palace',
  'Wigwam',
  'Flat',
  'House',
  'Semi-detached house',
  'Duplex',
  'Loft',
  'Tyneside flat',
  'Triple-decker house'
];

const TYPE = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel'
];

const CHECKIN = [
  '12:00',
  '13:00',
  '14:00'
];

const CHECKOUT = CHECKIN;

const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];

const DESCRIPTIONS = [
  'Not bad',
  'It could be bettet',
  'Awesome',
  'Cool',
  'Greate',
  'Much better',
  'So-so'
];

const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'
];

const getRandomAd = (_, i) => {
  const location = {
    lat: getRandomFloatingPointNumber(MIN_LAT, MAX_LAT, AMOUNT_SYNBOLS_AFTER_POINT_IN_LOCATION),
    lng: getRandomFloatingPointNumber(MIN_LNG, MAX_LNG, AMOUNT_SYNBOLS_AFTER_POINT_IN_LOCATION),
  };

  return {
    avatar: `img/avatars/user${String(i + 1).padStart(2, '0')}.png`,
    offer: {
      title: getRandomArrayElement(TITLES),
      address: `${location.lat}, ${location.lng}`,
      price: getRandomIntegerNumber(MIN_PRICE, MAX_PRICE),
      type: getRandomArrayElement(TYPE),
      rooms: getRandomIntegerNumber(MIN_ROOMS_AMOUNT, MAX_ROOMS_AMOUNT),
      guests: getRandomIntegerNumber(MIN_GUESTS_AMOUNT, MAX_GUESTS_AMOUNT),
      checkin: getRandomArrayElement(CHECKIN),
      checkout: getRandomArrayElement(CHECKOUT),
      features: getShuffledArrayWithRandomLength(FEATURES),
      description: getRandomArrayElement(DESCRIPTIONS),
      photos: getShuffledArrayWithRandomLength(PHOTOS),
    },
    location
  };
};

const generatedRandomAD = (count = RANDOM_ADS_AMOUNT) => Array.from({length : count}, getRandomAd);

export {generatedRandomAD};
