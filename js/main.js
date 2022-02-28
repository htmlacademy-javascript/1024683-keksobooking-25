//Функция, возвращающая случайное целое число из переданного диапазона включительно.
const getRandomIntInclusive = (min, max) => {
  if (min < 0 || max < 0) {
    return 'Введите число равное или больше нуля';
  }
  if (max < min) {
    const x = max;
    max = min;
    min = x;
  }
  if (max === min) {
    return max;
  }

  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};


//Функция, возвращающая случайное число с плавающей точкой из переданного диапазона включительно.
const getRandomNumber = (min, max, decimal) => {
  if (min < 0 || max < 0) {
    return 'Введите число равное или больше нуля';
  }
  if (max === min) {
    return max;
  }
  if (max < min && min >= 0) {
    const x = max;
    max = min;
    min = x;
  }
  return Number((Math.random() * (max - min) + min).toFixed(decimal));
};


//Функция, возвращающая случайный элемент массива из переданного диапазона включительно.
const getRandomElementArr = (arr) => arr[getRandomIntInclusive(0, arr.length - 1)];

//Функция, возвращающая массив случайной длины из значений родительского массива.
const getArrRandomLength = (arr) => arr.slice(0, getRandomIntInclusive(0, arr.length - 1));

const OFFER = {
  TITLES: ['Квартира'],
  PRICES: {
    MIN: 0,
    MAX: 10,
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

const createAdvert = () => {
  const x = getRandomNumber(LOCATION.X.MIN, LOCATION.X.MAX, 5);
  const y = getRandomNumber(LOCATION.Y.MIN, LOCATION.Y.MAX, 5);

  return {
    author: {
      avatar: `img/avatars/user${getRandomIntInclusive(1, 10)}.png`,
    },
    offer: {
      title: getRandomElementArr(OFFER.TITLES),
      address: [x, y],
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
    location: [x, y]
  };
};

const createAdverts = () => {
  const arr = [];
  for (let i = 0; i <= 10; i++) {
    arr.push(createAdvert());
  }
  return arr;
};

createAdverts();
