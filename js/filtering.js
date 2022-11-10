import { addMarkerToMap, map, markerGroup, AMOUNT_ADS_ON_MAP } from './map.js';
import { debounce } from './util.js';


const MAP_FILTERING_FORM = document.querySelector('.map__filters');
const HOUSING_TYPE = MAP_FILTERING_FORM.querySelector('#housing-type');
const HOUSING_PRICE = MAP_FILTERING_FORM.querySelector('#housing-price');
const HOUSING_ROOMS = MAP_FILTERING_FORM.querySelector('#housing-rooms');
const HOUSING_GUESTS = MAP_FILTERING_FORM.querySelector('#housing-guests');
const WIFI = MAP_FILTERING_FORM.querySelector('#filter-wifi');
const DISHWASHER = MAP_FILTERING_FORM.querySelector('#filter-dishwasher');
const PARKING = MAP_FILTERING_FORM.querySelector('#filter-parking');
const WASHER = MAP_FILTERING_FORM.querySelector('#filter-washer');
const ELEVATOR = MAP_FILTERING_FORM.querySelector('#filter-elevator');
const CONDITIONER = MAP_FILTERING_FORM.querySelector('#filter-conditioner');
const RENDER_DELAY = 500;


const isPriceMatched = (item) => {
  let priceRange;
  if (item.offer.price >= 10000 && item.offer.price < 50000) {
    priceRange = 'middle';
  } else if (item.offer.price < 10000) {
    priceRange = 'low';
  } else if (item.offer.price >= 50000) {
    priceRange = 'high';
  }
  return HOUSING_PRICE.value === priceRange || HOUSING_PRICE.value === 'any';
};
const isHousingTypeMatched = (item) => HOUSING_TYPE.value === item.offer.type || HOUSING_TYPE.value === 'any';

const isRoomsMatched = (item) => +HOUSING_ROOMS.value === item.offer.rooms || HOUSING_ROOMS.value === 'any';

const isGuestsMatched = (item) => +HOUSING_GUESTS.value === item.offer.guests || HOUSING_GUESTS.value === 'any';

const isWifiChecked = (item) => WIFI.checked === false || item.offer.features?.includes('wifi');

const isDishwasherChecked = (item) => DISHWASHER.checked === false || item.offer.features?.includes('dishwasher');

const isParkingChecked = (item) => PARKING.checked === false || item.offer.features?.includes('parking');

const isWasherChecked = (item) => WASHER.checked === false || item.offer.features?.includes('washer');

const isElevatorChecked = (item) => ELEVATOR.checked === false || item.offer.features?.includes('elevator');

const isConditionerCheckec = (item) => CONDITIONER.checked === false || item.offer.features?.includes('conditioner');

const subscrideOnFilterFormChanges = (accommodations) => {
  MAP_FILTERING_FORM.addEventListener('change', debounce(() => {
    map.closePopup();
    markerGroup.clearLayers();

    const filteredAccommodations = accommodations.filter((item) =>
      (isPriceMatched(item) && isHousingTypeMatched && isRoomsMatched && isGuestsMatched && isWifiChecked
      && isDishwasherChecked && isParkingChecked && isWasherChecked && isElevatorChecked && isConditionerCheckec));

    filteredAccommodations.slice(0, AMOUNT_ADS_ON_MAP).forEach((item) => {
      addMarkerToMap(item);
    });
  }, RENDER_DELAY));
};
export { subscrideOnFilterFormChanges };
