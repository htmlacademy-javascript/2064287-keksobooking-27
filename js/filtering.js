import { addMarkerToMap, map, markerGroup, AMOUNT_ADS_ON_MAP } from './map.js';
import { debounce } from './util.js';


const mapFilteringForm = document.querySelector('.map__filters');
const housingType = mapFilteringForm.querySelector('#housing-type');
const housingPrice = mapFilteringForm.querySelector('#housing-price');
const housingRooms = mapFilteringForm.querySelector('#housing-rooms');
const housingGuests = mapFilteringForm.querySelector('#housing-guests');
const wifi = mapFilteringForm.querySelector('#filter-wifi');
const dishwasher = mapFilteringForm.querySelector('#filter-dishwasher');
const parking = mapFilteringForm.querySelector('#filter-parking');
const washer = mapFilteringForm.querySelector('#filter-washer');
const elevator = mapFilteringForm.querySelector('#filter-elevator');
const conditioner = mapFilteringForm.querySelector('#filter-conditioner');
const RENDER_DELAY = 500;
const LOW_PRICE_RANGE = 10000;
const HIGH_PRISE_RANGE = 50000;


const isPriceMatched = (item) => {
  let priceRange;
  if (item.offer.price >= LOW_PRICE_RANGE && item.offer.price < HIGH_PRISE_RANGE) {
    priceRange = 'middle';
  } else if (item.offer.price < LOW_PRICE_RANGE) {
    priceRange = 'low';
  } else if (item.offer.price >= HIGH_PRISE_RANGE) {
    priceRange = 'high';
  }
  return housingPrice.value === priceRange || housingPrice.value === 'any';
};
const isHousingTypeMatched = (item) => housingType.value === item.offer.type || housingType.value === 'any';

const isRoomsMatched = (item) => +housingRooms.value === item.offer.rooms || housingRooms.value === 'any';

const isGuestsMatched = (item) => +housingGuests.value === item.offer.guests || housingGuests.value === 'any';

const isWifiChecked = (item) => wifi.checked === false || item.offer.features?.includes('wifi');

const isDishwasherChecked = (item) => dishwasher.checked === false || item.offer.features?.includes('dishwasher');

const isParkingChecked = (item) => parking.checked === false || item.offer.features?.includes('parking');

const isWasherChecked = (item) => washer.checked === false || item.offer.features?.includes('washer');

const isElevatorChecked = (item) => elevator.checked === false || item.offer.features?.includes('elevator');

const isConditionerChecked = (item) => conditioner.checked === false || item.offer.features?.includes('conditioner');

const subscrideOnFilterFormChanges = (accommodations) => {

  const rerenderMarkers = debounce(() => {
    map.closePopup();
    markerGroup.clearLayers();

    const filteredAccommodations = accommodations.filter((item) =>
      (isPriceMatched(item) && isHousingTypeMatched(item) && isRoomsMatched(item) && isGuestsMatched(item) && isWifiChecked(item)
      && isDishwasherChecked(item) && isParkingChecked(item) && isWasherChecked(item) && isElevatorChecked(item) && isConditionerChecked(item)));

    filteredAccommodations.slice(0, AMOUNT_ADS_ON_MAP).forEach((item) => {
      addMarkerToMap(item);
    });
  }, RENDER_DELAY);

  mapFilteringForm.addEventListener('change', rerenderMarkers);
  mapFilteringForm.addEventListener('reset', rerenderMarkers);
};
export { subscrideOnFilterFormChanges };
