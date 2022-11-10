import { addMarkerToMap, map, markerGroup, AMOUNT_ADS_ON_MAP} from './map.js';


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


const sortADs = (data) => {
  MAP_FILTERING_FORM.addEventListener('change', () => {
    map.closePopup();
    markerGroup.clearLayers();
    const copyData = data.slice(0, AMOUNT_ADS_ON_MAP);

    for (const item of copyData) {
      const isHousingTypeMatched = HOUSING_TYPE.value === item.offer.type || HOUSING_TYPE.value === 'any';

      let priceRange;
      if (item.offer.price >= 10000 && item.offer.price < 50000) {
        priceRange = 'middle';
      } else if (item.offer.price < 10000) {
        priceRange = 'low';
      } else if (item.offer.price >= 50000 ) {
        priceRange = 'high';
      }
      const isPriceMatched = HOUSING_PRICE.value === priceRange || HOUSING_PRICE.value === 'any';

      const isRoomsMatched = +HOUSING_ROOMS.value === item.offer.rooms || HOUSING_ROOMS.value === 'any';

      const isGuestsMatched = +HOUSING_GUESTS.value === item.offer.guests || HOUSING_GUESTS.value === 'any';

      const isWifiChecked = WIFI.checked === false || item.offer.features?.includes('wifi');

      const isDishwasherChecked = DISHWASHER.checked === false || item.offer.features?.includes('dishwasher');

      const isParkingChecked = PARKING.checked === false || item.offer.features?.includes('parking');

      const isWasherChecked = WASHER.checked === false || item.offer.features?.includes('washer');

      const isElevatorChecked = ELEVATOR.checked === false || item.offer.features?.includes('elevator');

      const isConditionerCheckec = CONDITIONER.checked === false || item.offer.features?.includes('conditioner');

      if (isPriceMatched && isHousingTypeMatched && isRoomsMatched && isGuestsMatched && isWifiChecked
         && isDishwasherChecked && isParkingChecked && isWasherChecked && isElevatorChecked && isConditionerCheckec) {
        addMarkerToMap(item);
      }
    }
  });
};
export { sortADs };
