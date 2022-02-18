//Функция, возвращающая случайное целое число из переданного диапазона включительно.
const getRandomIntInclusive = (min,max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
};


//Функция, возвращающая случайное число с плавающей точкой из переданного диапазона включительно.
const getRandomNumber = (min, max, decimal) => {
  if (max > min && min >= 0) {
    return Number((Math.random() * (max - min) + min).toFixed(decimal));
  }
  if (max < min && min >= 0){
    const x = max;
    max = min;
    min = x;
    return Number((Math.random() * (max - min) + min).toFixed(decimal));
  }
  if(max === min && min >= 0){
    return max;
  }
};


getRandomIntInclusive();
getRandomNumber();
