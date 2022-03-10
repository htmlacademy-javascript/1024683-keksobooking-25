import './generation.js';
import {
  createAdverts,
  ADVERTS_QUANTITY} from './data.js';
import {
  renderCard} from './generation.js';

const similarCards = createAdverts(ADVERTS_QUANTITY);
renderCard(similarCards[0]);
