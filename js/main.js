import './api.js';
import './form.js';
import './map.js';
import './generation.js';
import './disabled.js';
import './nouislider.js';
import {getData} from './api.js';
import {createMarker} from './map.js';
import {markerGroup} from './map.js';

//   const compareCards = (cardA, cardB) => {
//   const rankA = getCardRank(cardA);
//   const rankB = getCardRank(cardB);
//   return rankB - rankA;
// };

const getSimilarCard = (card) => {
  const typePropertyValue = document.querySelector('#type').value;
  if(card.offer.type === typePropertyValue) {
    return card;
  }
};

getData((cards)=>{
  console.log(cards);
  cards.slice()
  // здесь функция сравнения типа жилья
    .filter(getSimilarCard)
    .slice(0, 10)
    .forEach((card)=>createMarker(card));
});


const inputType = document.querySelector('#type');
inputType.addEventListener('change', (evt) => {
  markerGroup.clearLayers();
  //показать новые карточки
});
