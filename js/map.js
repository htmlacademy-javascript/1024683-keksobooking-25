import { enableForm } from './disabled.js';
import {renderCard} from './generation.js';
import {getData} from './api.js';
import {debounce} from './util.js';
import {filterCard} from './filter.js';

const mapFilter = document.querySelector('.map__filters');

const address = document.querySelector('#address');
const LAT = 35.68950;
const LNG = 139.69171;
const MAIN_PIN_MARKER_LAT = 35.681700;
const MAIN_PIN_MARKER_LNG = 139.753882;

address.value = `${MAIN_PIN_MARKER_LAT.toFixed(5)}, ${MAIN_PIN_MARKER_LNG.toFixed(5)}`;

//Cоздаем карту
const map = L.map('map-canvas')
//Вешаем обработчик на карту
  .on('load', onMapLoad)
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
    lat: MAIN_PIN_MARKER_LAT,
    lng: MAIN_PIN_MARKER_LNG,
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

const markerGroup = L.layerGroup().addTo(map);

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
    .addTo(markerGroup)
    //Добавляем балун
    .bindPopup(renderCard(similarCard));
};

function onMapLoad () {
  getData((cards)=>{
    cards.slice()
      .slice(0, 10)
      .forEach((card)=> createMarker(card) );
    mapFilter.addEventListener('change', debounce(()=>{
      filterCard(cards);
    }));
    enableForm();
  });
}

export {createMarker, LAT, LNG, map, mainPinMarker, markerGroup, MAIN_PIN_MARKER_LAT, MAIN_PIN_MARKER_LNG};
