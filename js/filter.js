import {createMarker} from './map.js';
import {markerGroup} from './map.js';

const COUNT_OF_CARDS = 10;
const ANY_QUANTITY = 'any';

const PRICE_RANGES = {
  any: {
    minprice : 0,
    maxprice : 100000,
  },
  middle: {
    minprice : 10001,
    maxprice : 50000,
  },
  low: {
    minprice : 0,
    maxprice : 10000,
  },
  high: {
    minprice : 50001,
    maxprice : 100000,
  },
};

const getSelectCheckboxes = () => Array.from(document.querySelectorAll('input[name="features"]:checked')).map((cb) => cb.value);

const checkArrayInclude = (first, second) => {
  for (let i = 0; i < second.length; i++){
    if (!first.includes(second[i])){
      return false;
    }
  }
  return true;
};

const checkType = (card) => {
  const typePropertyValue = document.querySelector('#housing-type').value;
  return card.offer.type === typePropertyValue || typePropertyValue === ANY_QUANTITY;
};

const checkPrice = (card) => {
  const price = document.querySelector('#housing-price').value;
  return card.offer.price <= PRICE_RANGES[price].maxprice && card.offer.price >= PRICE_RANGES[price].minprice;
};

const checkRooms = (card) => {
  const rooms = document.querySelector('#housing-rooms').value;
  return card.offer.rooms === Number(rooms) || rooms === ANY_QUANTITY;
};

const checkGuests = (card) => {
  const guests = document.querySelector('#housing-guests').value;
  return card.offer.guests === Number(guests) || guests === ANY_QUANTITY;
};

const checkFeatures = (card) => {
  const selectFeatures = getSelectCheckboxes();
  if (selectFeatures.length === 0) {
    return true;
  }
  if (!card.offer.features) {
    return false;
  }
  return checkArrayInclude(card.offer.features, selectFeatures);
};

const filterCard = (allCards) => {
  markerGroup.clearLayers();

  const filteredCards = [];
  for (let i = 0; i < allCards.length; i++) {
    if(checkType(allCards[i]) && checkRooms(allCards[i]) && checkGuests(allCards[i])
    && checkPrice(allCards[i]) && checkFeatures(allCards[i])) {
      if(filteredCards.length >= COUNT_OF_CARDS){ break;}
      //console.log(allCards[i]);
      filteredCards.push(allCards[i]);}
  }
  filteredCards.forEach((card)=>createMarker(card));
};
export {filterCard};
