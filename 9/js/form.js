import {typeProperty} from './generation.js';

const form = document.querySelector('.ad-form');
const pristine = new Pristine(form, {
  classTo: 'ad-form__element', // Элемент, на который будут добавляться классы
  errorClass: 'ad-form__element--invalid', // Класс, обозначающий невалидное поле
  successClass: 'ad-form__element--valid', // Класс, обозначающий валидное поле
  errorTextParent: 'ad-form__element', // Элемент, куда будет выводиться текст с ошибкой
  errorTextTag: 'fieldset', // Тег, который будет обрамлять текст ошибки
  errorTextClass: 'ad-form__error' // Класс для элемента с текстом ошибки
});
const roomNumberSelect = document.querySelector('[name="rooms"]');
const capacitySelect = document.querySelector('[name="capacity"]');
const roomCapacityMap = {
  '1': ['1'],
  '2':['1', '2'],
  '3':['1', '2', '3'],
  '100':['0'],
};

function validateAmount () {
  //const capacitySelectValue = String(capacitySelect.value);
  return roomCapacityMap[roomNumberSelect.value].includes(capacitySelect.value);
}


function getAmountErrorMessage () {
  let message = 'Количество гостей не может превышать количество комнат';
  if (roomNumberSelect.value === '100'){
    message = '100 комнат не для гостей';}
  return message;
}

pristine.addValidator(
  roomNumberSelect,
  validateAmount,
  getAmountErrorMessage
);

pristine.addValidator(
  capacitySelect,
  validateAmount,
  getAmountErrorMessage
);

form.addEventListener('submit', (evt) => {
  const value = pristine.validate();
  if(!value){evt.preventDefault();}
});

const selectTimeIn = document.querySelector('[name="timein"]');
const selectTimeOut = document.querySelector('[name="timeout"]');

//при изменении времени выезда, меняем время въезда
const setTimeIn = (evt) => {
  selectTimeIn.value = evt.target.value;
};
//при изменении времени въезда, меняем время выезда
const setTimeOut = (evt) => {
  selectTimeOut.value = evt.target.value;
};

//Вешаем обработчик события change на изменение времени въезда и выезда
selectTimeOut.addEventListener('change', setTimeIn);
selectTimeIn.addEventListener('change', setTimeOut);


const selectTypeHousing = document.querySelector('[name="type"]');
const inputPrice = document.querySelector('[name="price"]');

//при изменении типа жилья, меняем placeholder и min в инпуте стоимости жилья
const setPrice = (evt) => {
  inputPrice.placeholder = typeProperty[evt.target.value].price;
  //inputPrice.min = typeProperty[evt.target.value].price;
};

//Вешаем обработчик события change на изменение типа жилья
selectTypeHousing.addEventListener('change', setPrice);

//Cравниваем мин значение стоимости жилья и введеную стиомость
const validatePrice = (value) => typeProperty[selectTypeHousing.value].price <= Number(value);
//Выводим сообщение об ошибке
const getPriceErrorMessage = ()=>`Мин цена: ${typeProperty[selectTypeHousing.value].price} руб`;

//Валидируем инпут стоимости жилья
pristine.addValidator(
  inputPrice,
  validatePrice,
  getPriceErrorMessage,
  1,
  true
);