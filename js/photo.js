const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const avatarChooser = document.querySelector('.ad-form-header__input');
const avatarPreview = document.querySelector('.ad-form-header__preview img');
const placesChooser = document.querySelector('.ad-form__input');
const placesPreview = document.querySelector('.ad-form__photo');

avatarChooser.addEventListener('change', () => {
  const file = avatarChooser.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
  if(matches) {
    avatarPreview.src = URL.createObjectURL(file);
  }
});

placesChooser.addEventListener('change', () => {
  const file = placesChooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
  if(matches) {
    placesPreview.innerHTML = '';
    placesPreview.insertAdjacentHTML('beforeend',
      '<img src="URL.createObjectURL(file)" alt="Тип жилья" width="100%" height="100%" class="ad-form__photo--img">');
    document.querySelector('.ad-form__photo--img').src = URL.createObjectURL(file);
  }
});
