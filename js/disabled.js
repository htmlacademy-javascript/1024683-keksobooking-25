const disabledForm = () => {
  const adForm = document.querySelector('.ad-form');
  adForm.classList.add('ad-form--disabled');
  const adFormAll = adForm.children;
  for (let i = 0; i < adFormAll.length; i++) {
    adFormAll[i].setAttribute('disabled', '');
  }

  const mapFilters = document.querySelector('.map__filters');
  mapFilters.classList.add('ad-form--disabled');
  const mapFiltersAll = mapFilters.children;
  for (let i = 0; i < mapFiltersAll.length; i++) {
    mapFiltersAll[i].setAttribute('disabled', '');
  }
};

disabledForm();


const includedForm = () => {
  const adForm = document.querySelector('.ad-form');
  adForm.classList.remove('ad-form--disabled');
  const adFormAll = adForm.children;
  for (let i = 0; i < adFormAll.length; i++) {
    adFormAll[i].removeAttribute('disabled', '');
  }

  const mapFilters = document.querySelector('.map__filters');
  mapFilters.classList.remove('ad-form--disabled');
  const mapFiltersAll = mapFilters.children;
  for (let i = 0; i < mapFiltersAll.length; i++) {
    mapFiltersAll[i].removeAttribute('disabled', '');
  }
};

export {
  includedForm
};
