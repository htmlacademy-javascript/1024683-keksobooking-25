import './filter.js';
import './api.js';
import './form.js';
import './map.js';
import './generation.js';
import './disabled.js';
import './nouislider.js';
import {getData} from './api.js';
import {createMarker} from './map.js';

getData((cards)=>{
  cards.slice()
    .slice(0, 10)
    .forEach((card)=> createMarker(card) );
});

