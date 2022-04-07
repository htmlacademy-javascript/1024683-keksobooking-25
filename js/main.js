import './photo.js';
import './filter.js';
import './api.js';
import './form.js';
import './map.js';
import './generation.js';
import './disabled.js';
import './nouislider.js';
import {getData} from './api.js';
import {createMarker} from './map.js';
import {debounce} from './util.js';
import {filterCard} from './filter.js';

const mapFilter = document.querySelector('.map__filters');

getData((cards)=>{
  cards.slice()
    .slice(0, 10)
    .forEach((card)=> createMarker(card) );
  mapFilter.addEventListener('change', debounce(()=>{
    filterCard(cards);
  }
  )
  );
});

