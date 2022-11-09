import { ADDRESS } from './form.js';
import { getRendedCard } from './markup.js';
import { makeActive, makeMapFormInactive, makeAdFormInactive } from './switchingActivity.js';
import { getData } from './API.js';
import { showError } from './util.js';
import { filterHouse } from './filtering.js';


const ICOR_URL = './img/pin.svg';
const ICON_SIZE = [40, 40];
const ICON_ANCOR = [20, 40];

const SPECIAL_ICON_URL = './img/main-pin.svg';
const SPECIAL_ICON_SIZE = [52, 52];
const SPECIAL_ICON_ANCOR = [26, 52];

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
  ADDRESS.value = `lat: ${lat.toFixed(5)},  lng: ${lng.toFixed(5)}`;
});

const usualIcon = L.icon(
  {
    iconUrl: ICOR_URL,
    iconSize: ICON_SIZE,
    iconAnchor:ICON_ANCOR
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
  data.forEach((icon) => {
    addMarkerToMap(icon);
  });
};

getData ((info)=> {
  addMarkersToMap(info);
  filterHouse(info);
}, ()=>{
  showError();
  makeMapFormInactive();
});

export {addMarkerToMap, addMarkersToMap, map, mainPin, TokyoCoordinate, markerGroup};
