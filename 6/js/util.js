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

//Функция, проверяющая адрес аватара на соответствие ТЗ и возвращающая откорректированное значение
const getСorrectAddress = (address) => {
  if (address < 10 ) { address = `0${address}`;}
  return address;
};

export {
  getRandomIntInclusive,
  getRandomNumber,
  getRandomElementArr,
  getArrRandomLength,
  getСorrectAddress
};
