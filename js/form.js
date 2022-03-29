import {typeProperty} from './generation.js';
import {postData} from './api.js';

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

const body = document.querySelector('body');
// Находим фрагмент с содержимым темплейта
const successPopup = document.querySelector('#success')
  .content
  .querySelector('.success');

// Находим фрагмент с содержимым темплейта
const failPopup = document.querySelector('#error')
  .content
  .querySelector('.error');
const closeButton = failPopup.querySelector('.error__button');

// Проверка клавиши esc
const isEscapeKey = (evt) => evt.key === 'Escape';

// Если нажали esc, то закрываем форму
const onPopupEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    oncloseFailPopup();
    oncloseSuccessPopup();
  }
};

// Функция закрытия успешного сообщения
function oncloseSuccessPopup () {
  body.removeChild(successPopup);
  document.removeEventListener('keydown', onPopupEscKeydown);
  successPopup.removeEventListener('click', oncloseSuccessPopup);
}

// Функция закрытия неуспешного сообщения
function oncloseFailPopup () {
  body.removeChild(failPopup);
  document.removeEventListener('keydown', onPopupEscKeydown);
  failPopup.removeEventListener('click', oncloseFailPopup);
  closeButton.removeEventListener('click', oncloseFailPopup);
}


//успешная отправка
const successPost = () => {
  //Находим расположение successTemplate и отрисовываем шаблон там
  body.appendChild(successPopup);
  // Добавляем обработчики на закрытие сообщения
  document.addEventListener('keydown', onPopupEscKeydown);
  successPopup.addEventListener('click', oncloseSuccessPopup);
  form.reset();
};


//Неуспешная отправка
const failPost = () => {
  //Находим расположение successTemplate и отрисовываем шаблон там
  body.appendChild(failPopup);
  // Добавляем обработчики на закрытие сообщения
  document.addEventListener('keydown', onPopupEscKeydown);
  failPopup.addEventListener('click', oncloseFailPopup);
  closeButton.addEventListener('click', oncloseFailPopup);
};

//Отправка формы
form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const value = pristine.validate();
  if(value){
    const formData = new FormData(evt.target);
    postData(successPost, failPost, formData);
  }
});


