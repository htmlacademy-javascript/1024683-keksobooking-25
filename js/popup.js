import {resetForm} from './form.js';

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


// Если нажали esc, то закрываем Попап успешной отправки
const onSuccessPopupEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    oncloseSuccessPopup();
  }
};

// Если нажали esc, то закрываем Попап неуспешной отправки
const onFailPopupEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    oncloseFailPopup();
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
  document.removeEventListener('keydown', onSuccessPopupEscKeydown);
  successPopup.removeEventListener('click', oncloseSuccessPopup);
}

// Функция закрытия неуспешного сообщения
function oncloseFailPopup () {
  body.removeChild(failPopup);
  document.removeEventListener('keydown', onFailPopupEscKeydown);
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
  document.addEventListener('keydown', onSuccessPopupEscKeydown);
  successPopup.addEventListener('click', oncloseSuccessPopup);
  resetForm();
};

//Неуспешная отправка
const failPost = () => {
  //Находим расположение successTemplate и отрисовываем шаблон там
  body.appendChild(failPopup);
  // Добавляем обработчики на закрытие сообщения
  document.addEventListener('keydown', onFailPopupEscKeydown);
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
