import { address } from './form.js';
import { getRendedCard } from './markup.js';
import { makeActive, makeMapFormInactive, makeAdFormInactive } from './switching-activity.js';
import { getData } from './server.js';
import { showError } from './util.js';
import { subscrideOnFilterFormChanges } from './filtering.js';


const ICOR_URL = './img/pin.svg';
const ICON_SIZE = [40, 40];
const ICON_ANCOR = [20, 40];

const SPECIAL_ICON_URL = './img/main-pin.svg';
const SPECIAL_ICON_SIZE = [52, 52];
const SPECIAL_ICON_ANCOR = [26, 52];

const AMOUNT_ADS_ON_MAP = 10;
const DIGITS_AFTER_POINT = 5;

const ERROR_MESSAGE_FROM_SERVER = 'Не удалось соединиться с сервером. Попробуйте ещё раз';


const TokyoCoordinate = {
  LAT: 35.65283,
  LNG: 139.83947
};

makeMapFormInactive();
makeAdFormInactive();

const map = L.map('map-canvas').on('load', () => {
  makeActive();
})
  .setView({
    lat: TokyoCoordinate.LAT,
    lng: TokyoCoordinate.LNG
  }, 10);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const specialIcon = L.icon({
  iconUrl: SPECIAL_ICON_URL,
  iconSize: SPECIAL_ICON_SIZE,
  iconAnchor: SPECIAL_ICON_ANCOR
});

const mainPin = L.marker({
  lat: TokyoCoordinate.LAT,
  lng: TokyoCoordinate.LNG
},
{
  draggable: true,
  icon: specialIcon
}).addTo(map);

mainPin.on('moveend', (evt) => {
  const { lat, lng } = evt.target.getLatLng();
  address.value = `lat: ${lat.toFixed(DIGITS_AFTER_POINT)},  lng: ${lng.toFixed(DIGITS_AFTER_POINT)}`;
});

const usualIcon = L.icon(
  {
    iconUrl: ICOR_URL,
    iconSize: ICON_SIZE,
    iconAnchor: ICON_ANCOR
  }
);


const markerGroup = L.layerGroup().addTo(map);


const addMarkerToMap = (icon) => {
  const marker = L.marker({
    lat: icon.location.lat,
    lng: icon.location.lng
  },
  {
    icon: usualIcon
  })
    .addTo(markerGroup)
    .bindPopup(getRendedCard(icon));
  return marker;
};


const addMarkersToMap = (data) => {
  data.slice(0, AMOUNT_ADS_ON_MAP).forEach((icon) => {
    addMarkerToMap(icon);
  });
};

getData((accommodations) => {
  addMarkersToMap(accommodations);
  subscrideOnFilterFormChanges(accommodations);
}, () => {
  showError(ERROR_MESSAGE_FROM_SERVER);
  makeMapFormInactive();
});

export { addMarkerToMap, map, mainPin, TokyoCoordinate, markerGroup, AMOUNT_ADS_ON_MAP, addMarkersToMap };
