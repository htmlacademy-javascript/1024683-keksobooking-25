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


getRandomIntInclusive();
getRandomNumber();
