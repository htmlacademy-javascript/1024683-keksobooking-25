import {createAdverts, ADVERTS_QUANTITY} from './data.js';

// Находим фрагмент с содержимым темплейта
const similarCardTemplate = document.querySelector('#card')
  .content
  .querySelector('.popup');

//Находим временное расположение объявления
const similarListElement = document.querySelector('.map__canvas');

//Клонируем шаблон и отрисовываем его в временном расположении
const cardElement = similarCardTemplate.cloneNode(true);
similarListElement.appendChild(cardElement);

const similarCards = createAdverts(ADVERTS_QUANTITY);
const typeProperty ={
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель'};

const oneCard = (card) => {
  cardElement.querySelector('.popup__title').textContent = card.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = card.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = `${card.offer.price} ₽/ночь`;
  cardElement.querySelector('.popup__text--address').textContent = card.offer.address;
  cardElement.querySelector('.popup__type').textContent = typeProperty[card.offer.type];
  cardElement.querySelector('.popup__text--capacity').textContent = `${card.offer.rooms} комнаты для ${card.offer.guests} гостей`;
  cardElement.querySelector('.popup__text--time').textContent = `Заезд после${card.offer.checkin}, выезд до ${card.offer.checkout}`;
  cardElement.querySelector('.popup__features').textContent = card.offer.features;
  cardElement.querySelector('.popup__description').textContent = card.offer.description;
  cardElement.querySelector('.popup__photos').innerHTML = card.offer.photos;
  cardElement.querySelector('.popup__avatar').src = card.author.avatar;

};
oneCard(similarCards[0]);

