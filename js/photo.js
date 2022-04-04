const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const AvatarChooser = document.querySelector('.ad-form-header__input');
const AvatarPreview = document.querySelector('.ad-form-header__preview img');
const PlacesChooser = document.querySelector('.ad-form__input');
const PlacesPreview = document.querySelector('.ad-form__photo');

AvatarChooser.addEventListener('change', () => {
  const file = AvatarChooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
  if(matches) {
    AvatarPreview.src = URL.createObjectURL(file);
  }
});

PlacesChooser.addEventListener('change', () => {
  const file = PlacesChooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
  if(matches) {
    PlacesPreview.insertAdjacentHTML('beforeend',
      '<img src="URL.createObjectURL(file)" alt="Тип жилья" width="100%" height="100%" class="ad-form__photo--img">');
    document.querySelector('.ad-form__photo--img').src = URL.createObjectURL(file);
  }
});
