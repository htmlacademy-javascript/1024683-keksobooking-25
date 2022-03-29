const body = document.querySelector('body');

// Находим фрагмент с содержимым темплейта
const errorPopup = document.querySelector('#errorData')
  .content
  .querySelector('.errorData');

// Проверка клавиши esc
const isEscapeKey = (evt) => evt.key === 'Escape';

// Если нажали esc, то закрываем форму
const onErrorPopupEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    oncloseErrorPopup();
  }
};

// Функция закрытия сообщения об ошибке
function oncloseErrorPopup () {
  body.removeChild(errorPopup);
  document.removeEventListener('keydown', onErrorPopupEscKeydown);
  errorPopup.removeEventListener('click', oncloseErrorPopup);
}

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
      throw new Error(); //`${response.status} ${response.statusText}`
    })
    .then((cards) => {
    //Добавляем простые маркеры ИЗ СЕРВЕРА на карту
      onSuccess(cards);
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
    });
    // .catch(() => {
    //   onFail();
    // });
};

export {
  postData,
  getData};
