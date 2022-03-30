import { includedForm } from './disabled.js';
import {
  renderCard} from './generation.js';

const address = document.querySelector('#address');
const LAT = 35.68950;
const LNG = 139.69171;

address.value = `${LAT}, ${LNG}`;

//Cоздаем карту
const map = L.map('map-canvas')
  .on('load', () => {
    includedForm();
  })
  .setView({
    lat: LAT,
    lng: LNG
  }, 10);

//Накладываем слой карты
L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

// Cоздвем иконку главного маркера
const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

//Cоздаем маркер
const mainPinMarker = L.marker(
  {
    lat: 35.681700,
    lng: 139.753882,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);
//Добавляем главный маркер на карту
mainPinMarker.addTo(map);

// Узнаем координаты главного маркера
mainPinMarker.on('move', (evt) => {
  address.value = `${evt.target.getLatLng().lat.toFixed(5)}, ${evt.target.getLatLng().lng.toFixed(5)}`;
});

// Cоздвем иконку простого маркера
const icon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const createMarker = (similarCard) => {
  const marker = L.marker(
    {
      lat: similarCard.location.lat,
      lng: similarCard.location.lng,
    },
    {
      icon: icon,
    },
  );

  marker
    .addTo(map)
    //Добавляем балун
    .bindPopup(renderCard(similarCard));
};

export {createMarker};
