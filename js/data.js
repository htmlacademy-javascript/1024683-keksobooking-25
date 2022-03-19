import {
  getRandomIntInclusive,
  getRandomNumber,
  getRandomElementArr,
  getArrRandomLength,
  getСorrectAddress} from './util.js';

//Записываем произвольные данные
const DECIMAL_OF_COORDINATES = 5;
const ADVERTS_QUANTITY = 10;
const OFFER = {
  TITLES: ['Квартира', 'Студия', 'Общежитие', 'Дом'],
  PRICES: {
    MIN: 0,
    MAX: 100000,
  },
  TYPES: ['palace', 'flat', 'house', 'bungalow', 'hotel'],
  ROOMS: {
    MIN: 0,
    MAX: 10,
  },
  GUESTS: {
    MIN: 0,
    MAX: 10,
  },
  CHECKINS: ['12:00', '13:00', '14:00'],
  CHECKOUTS: ['12:00', '13:00', '14:00'],
  FEATURES: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
  DESCRIPTIONS: ['К нам можно с детьми', 'малоэтажный комплекс', 'Ресторан и комната приема пищи', 'Бар и ночная дискотека', 'Душевые в номерах'],
  PHOTOS: ['https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg']
};
const LOCATION = {
  X: {
    MIN: 35.65000,
    MAX: 35.70000,
  },
  Y: {
    MIN: 139.70000,
    MAX: 139.80000,
  },
};

const createAdvert = (avatarsNumber) => {
  const lat = getRandomNumber(LOCATION.X.MIN, LOCATION.X.MAX, DECIMAL_OF_COORDINATES);
  const lng = getRandomNumber(LOCATION.Y.MIN, LOCATION.Y.MAX, DECIMAL_OF_COORDINATES);

  return {
    author: {
      avatar: `img/avatars/user${getСorrectAddress(avatarsNumber)}.png`,
    },
    offer: {
      title: getRandomElementArr(OFFER.TITLES),
      address: `${lat}, ${lng}`,
      price: getRandomIntInclusive(OFFER.PRICES.MIN, OFFER.PRICES.MAX),
      type: getRandomElementArr(OFFER.TYPES),
      rooms: getRandomIntInclusive(OFFER.ROOMS.MIN, OFFER.ROOMS.MAX),
      guests: getRandomIntInclusive(OFFER.GUESTS.MIN, OFFER.GUESTS.MAX),
      checkin: getRandomElementArr(OFFER.CHECKINS),
      checkout: getRandomElementArr(OFFER.CHECKOUTS),
      features: getArrRandomLength(OFFER.FEATURES),
      description: getRandomElementArr(OFFER.DESCRIPTIONS),
      photos: getArrRandomLength(OFFER.PHOTOS),
    },
    location: {lat, lng},
  };
};

const createAdverts = (advertsQuantity) => {
  const adverts = [];
  for (let i = 1; i <= advertsQuantity; i++) {
    adverts.push(createAdvert(i));
  }
  return adverts;
};

export {
  createAdverts,
  ADVERTS_QUANTITY
};

