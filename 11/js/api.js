import {errorDownloadMessage} from './popup.js';

let AllCards = [];

const getData = (onSuccess) => {
//Получение данных
  fetch('https://25.javascript.pages.academy/keksobooking/data',
    {
      method: 'GET',
      credentials: 'same-origin',
    },
  )
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error();
    })
    .then((cards) => {
      //Добавляем простые маркеры ИЗ СЕРВЕРА на карту
      onSuccess(cards);
      AllCards = cards;
    })
    .catch(() => {
      errorDownloadMessage();
    });
};

const postData = (onSuccess, onFail, formData) => {
  fetch(
    'https://25.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      body: formData,
    },
  )
  // в этот коллбек мы передаем БЛОКИРОВАНИЕ КНОПКИ ОТПРАВКИ и все что должно случиться при отправке формы
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail();
      }
    })
    .catch(() => {
      onFail();
    });
};

export {
  postData,
  getData,
  AllCards};
