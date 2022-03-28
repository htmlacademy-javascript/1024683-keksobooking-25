// Находим фрагмент с содержимым темплейта
const similarCardTemplate = document.querySelector('#card')
  .content
  .querySelector('.popup');

const typeProperty ={
  flat: {price: 1000, name: 'Квартира'},
  bungalow: {price: 0, name: 'Бунгало'},
  house: {price: 5000, name: 'Дом'},
  palace: {price: 1000, name: 'Дворец'},
  hotel: {price: 3000, name: 'Отель'}
};

// const renderPhotos = (photosList) => {
//   const photosContainer = document.createDocumentFragment();
//   photosList.forEach((photo) => {
//     const photoElement = document.createElement('img');
//     photoElement.src = photo;
//     photoElement.classList.add('popup__photo');
//     photoElement.width = 45;
//     photoElement.height = 40;
//     photoElement.alt = 'Фотография жилья';
//     photosContainer.appendChild(photoElement);
//   });
//   return photosContainer;
// };

// const renderFeatures = (featuresList) => {
//   const featuresContainer = document.createDocumentFragment();
//   featuresList.forEach((feature) => {
//     const featureElement = document.createElement('li');
//     featureElement.classList.add('popup__feature', `popup__feature--${feature}`);
//     featuresContainer.appendChild(featureElement);
//   });
//   return featuresContainer;
// };

// Наполняем шаблон данными
const renderCard = (card) => {
  //Клонируем шаблон
  const cardElement = similarCardTemplate.cloneNode(true);

  cardElement.querySelector('.popup__title').textContent = card.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = card.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = `${card.offer.price} ₽/ночь`;
  cardElement.querySelector('.popup__text--address').textContent = card.offer.address;
  cardElement.querySelector('.popup__type').textContent = typeProperty[card.offer.type].name;
  cardElement.querySelector('.popup__text--capacity').textContent = `${card.offer.rooms} комнаты для ${card.offer.guests} гостей`;
  cardElement.querySelector('.popup__text--time').textContent = `Заезд после${card.offer.checkin}, выезд до ${card.offer.checkout}`;
  cardElement.querySelector('.popup__features').textContent = card.offer.features;
  cardElement.querySelector('.popup__description').textContent = card.offer.description;
  cardElement.querySelector('.popup__avatar').src = card.author.avatar;
  //
  // const photos = renderPhotos(card.offer.photos);
  // cardElement.querySelector('.popup__photos').innerHTML = '';
  // cardElement.querySelector('.popup__photos').appendChild(photos);
  //
  // const features = renderFeatures(card.offer.features);
  // cardElement.querySelector('.popup__features').innerHTML = '';
  // cardElement.querySelector('.popup__features').appendChild(features);

  return cardElement;
};

//Находим временное расположение объявления и отрисовываем шаблон там
//const similarListElement = document.querySelector('.map__canvas');
//similarListElement.appendChild(cardElement);

export {
  renderCard,
  typeProperty
};
