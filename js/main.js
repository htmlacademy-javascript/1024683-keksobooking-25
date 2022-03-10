import './generation.js';
import {
  createAdverts,
  ADVERTS_QUANTITY} from './data.js';
import {
  oneCard} from './generation.js';

const similarCards = createAdverts(ADVERTS_QUANTITY);
oneCard(similarCards[0]);
