import './api.js';
import './form.js';
import './map.js';
import './generation.js';
import './disabled.js';
import './nouislider.js';
import {
  getData} from './api.js';
import {
  createMarker} from './map.js';


getData((cards)=>{
  cards.forEach((card)=>createMarker(card));
});
