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
  return ` ${'Бронь невозможна'}  `;
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
  if(value === false){evt.preventDefault();}
});
