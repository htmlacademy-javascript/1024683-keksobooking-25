import './api.js';
import './form.js';
import './map.js';
import './generation.js';
import './disabled.js';
import './nouislider.js';
import {getData} from './api.js';
import {createMarker} from './map.js';
import {markerGroup} from './map.js';
import {ABC} from './api.js';

const mapFilter = document.querySelector('.map__filters');


const getPropertyValue = (card) => {
  const typePropertyValue = document.querySelector('#housing-type').value;
  if (card.offer.type === typePropertyValue) {return card;}
};

const getSimilarRooms = (card) => {
  const rooms = document.querySelector('#housing-rooms').value;
  if (card.offer.rooms === Number(rooms)) {return card;}
};

const getSimilarGuests = (card) => {
  const guests = document.querySelector('#housing-guests').value;
  if (card.offer.guests === Number(guests)) {return card;}
};

getData((cards)=>{
  cards.slice()
    .slice(0, 10)
    .forEach((card)=> createMarker(card) );
});

mapFilter.addEventListener('change', () => {
  markerGroup.clearLayers();
  ABC.filter((card) => getPropertyValue(card) && getSimilarRooms (card) && getSimilarGuests(card))
    .slice(0, 10)
    .forEach((card)=>createMarker(card));
});


// собрать все значения с формы
// отфильтровать все значения массива

