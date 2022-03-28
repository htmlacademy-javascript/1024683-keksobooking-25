import {createMarker} from './map.js';

//Получение данных
fetch('https://25.javascript.pages.academy/keksobooking/data',
  {
    method: 'GET',
    credentials: 'same-origin',
  },
)
  .then((response) => response.json())
  .then((cards) => {
    console.log('Результат', cards);
    //Добавляем простые маркеры ИЗ СЕРВЕРА на карту
    cards.forEach((card) => {
      createMarker(card);
    });
  });

// //Отправка данных
// fetch('https://25.javascript.pages.academy/keksobooking',
//   {
//     method: 'POST',
//     credentials: 'same-origin',
//     body: new FormData(),
//   },
// )
//   .then((response) => {
//     console.log(response.status);
//     console.log(response.ok);
//     return response.json();
//   })
//   .then((data) => {
//     console.log('Результат', data);
//   })
//   .catch((err) => {
//     console.error(err);
//   });
