import { addMarkerToMap, markerGroup, map } from './map.js';


const MAP_FILTERING_FORM = document.querySelector('.map__filters');
const HOUSING_TYPE = MAP_FILTERING_FORM.querySelector('#housing-type');


const filterHouse = (data) => {
  HOUSING_TYPE.addEventListener('change', () => {
    map.closePopup();
    markerGroup.clearLayers();
    for (const item of data) {
      if (HOUSING_TYPE.value === item.offer.type || HOUSING_TYPE.value === 'any') {
        addMarkerToMap(item);
      }
    }
  }
  );
};
export { filterHouse };
