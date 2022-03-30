import {LAT, LNG, map, mainPinMarker} from './map.js';

const form = document.querySelector('.ad-form');
const sliderElement = document.querySelector('.ad-form__slider');
const address = document.querySelector('#address');

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

// Находим фрагмент с содержимым темплейта
const errorPopup = document.querySelector('#errorData')
  .content
  .querySelector('.errorData');

// Проверка клавиши esc
const isEscapeKey = (evt) => evt.key === 'Escape';

// Если нажали esc, то закрываем Попап
const onPopupEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    oncloseFailPopup();
    oncloseSuccessPopup();
  }
};

// Если нажали esc, то закрываем Попап Ошибки
const onErrorPopupEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    oncloseErrorPopup();
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

// Функция закрытия сообщения об ошибке
function oncloseErrorPopup () {
  body.removeChild(errorPopup);
  document.removeEventListener('keydown', onErrorPopupEscKeydown);
  errorPopup.removeEventListener('click', oncloseErrorPopup);
}

//успешная отправка
const successPost = () => {
  //Находим расположение successTemplate и отрисовываем шаблон там
  body.appendChild(successPopup);
  // Добавляем обработчики на закрытие сообщения
  document.addEventListener('keydown', onPopupEscKeydown);
  successPopup.addEventListener('click', oncloseSuccessPopup);
  form.reset();
  sliderElement.noUiSlider.set(0);
  address.value = `${LAT}, ${LNG}`;
  map.setView({
    lat: LAT,
    lng: LNG
  }, 10);
  mainPinMarker.setLatLng({
    lat: 35.681700,
    lng: 139.753882,
  });
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

// сообщение при ошибке загрузки
const errorDownloadMessage = () => {
  //Находим расположение successTemplate и отрисовываем шаблон там
  body.appendChild(errorPopup);
  //Добавляем обработчики на закрытие сообщения
  document.addEventListener('keydown', onErrorPopupEscKeydown);
  errorPopup.addEventListener('click', oncloseErrorPopup);
  const closeButtonError = errorPopup.querySelector('.errorData__button');
  closeButtonError.addEventListener('click', oncloseErrorPopup);
};

export {successPost,
  failPost,
  errorDownloadMessage};
