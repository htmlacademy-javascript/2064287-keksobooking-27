import { ADDRESS } from './form.js';
import { getRendedCard } from './markup.js';
import { makeActive, makeInactive } from './switchingActivity.js';
import { getData } from './API.js';
import { showError } from './util.js';

const TokyoCoordinate = {
  LAT: 35.65283,
  LNG: 139.83947
};
makeInactive();
const map = L.map('map-canvas').on('load', () => {
  makeActive();
})
  .setView({
    lat: 35.65283,
    lng: 139.83947
  }, 10);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const specialIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52]
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

const usualicon = L.icon(
  {
    iconUrl: './img/pin.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 40]
  }
);
const markerGroup = L.layerGroup().addTo(map);

const addToMap = (data) => {
  data.forEach((icon) => {
    const marker = L.marker({
      lat: icon.location.lat,
      lng: icon.location.lng
    },
    {
      icon: usualicon
    })
      .addTo(markerGroup)
      .bindPopup(getRendedCard(icon));
    return marker;
  });
};

getData(addToMap, showError);
export {addToMap, map, mainPin};
