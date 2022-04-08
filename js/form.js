import {typeProperty} from './generation.js';
import {postData} from './api.js';
import {successPost, failPost} from './popup.js';
import {LAT, LNG, map, mainPinMarker, MAIN_PIN_MARKER_LAT, MAIN_PIN_MARKER_LNG} from './map.js';

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
const avatarChooser = document.querySelector('.ad-form-header__preview img');
const placesPreview = document.querySelector('.ad-form__photo');
const photoMuffin = 'img/muffin-grey.svg';

const selectTimeIn = document.querySelector('[name="timein"]');
const selectTimeOut = document.querySelector('[name="timeout"]');

const selectTypeHousing = document.querySelector('[name="type"]');
const inputPrice = document.querySelector('[name="price"]');

const resetButton = document.querySelector('.ad-form__reset');
const sliderElement = document.querySelector('.ad-form__slider');
const address = document.querySelector('#address');

const mapFilter = document.querySelector('.map__filters');

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

//при изменении времени выезда, меняем время въезда
const onTimeInChange = (evt) => {
  selectTimeIn.value = evt.target.value;
};
//при изменении времени въезда, меняем время выезда
const onTimeOutChange = (evt) => {
  selectTimeOut.value = evt.target.value;
};

//Вешаем обработчик события change на изменение времени въезда и выезда
selectTimeOut.addEventListener('change', onTimeInChange);
selectTimeIn.addEventListener('change', onTimeOutChange);

//при изменении типа жилья, меняем placeholder и min в инпуте стоимости жилья
const onPriceChange = (evt) => {
  inputPrice.placeholder = typeProperty[evt.target.value].price;
};

//Вешаем обработчик события change на изменение типа жилья
selectTypeHousing.addEventListener('change', onPriceChange);

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

//Отправка формы
form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const value = pristine.validate();
  if(value){
    const formData = new FormData(evt.target);
    postData(successPost, failPost, formData);
  }
});

//Функция сброса данных для обработчика собитий кнопки "Очистить"
const resetForm = () => {
  form.reset();
  mapFilter.reset();
  map.closePopup();
  sliderElement.noUiSlider.set(0);
  address.value = `${MAIN_PIN_MARKER_LAT}, ${MAIN_PIN_MARKER_LNG}`;
  map.setView({
    lat: LAT,
    lng: LNG
  }, 10);
  mainPinMarker.setLatLng({
    lat: MAIN_PIN_MARKER_LAT,
    lng: MAIN_PIN_MARKER_LNG,
  });
  avatarChooser.src = photoMuffin;
  placesPreview.innerHTML = '';
};

//Обновляем данные формы при нажатии на кнопку "Очистить"
resetButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  resetForm();
});

export {resetForm};
