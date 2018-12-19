'use strict';

(function () {
  var MIN_SCALE_VALUE = 25;
  var MAX_SCALE_VALUE = 100;
  var STEP_SCALE_VALUE = 25;

  // Масштабирование картинки
  var imgUploadPhotoPreview = document.querySelector('.img-upload__preview > img');
  var scaleControl = document.querySelector('.img-upload__scale');
  var scaleControlSmaller = scaleControl.querySelector('.scale__control--smaller');
  var scaleControlValue = scaleControl.querySelector('.scale__control--value');
  var scaleControlBigger = scaleControl.querySelector('.scale__control--bigger');

  var scaleValue = MAX_SCALE_VALUE; // По умолчанию значение элемента равно 100
  scaleControlValue.setAttribute('value', scaleValue + '%');

  scaleControlSmaller.addEventListener('click', function () {
    scaleValue -= STEP_SCALE_VALUE;
    if (scaleValue <= MIN_SCALE_VALUE) {
      scaleValue = MIN_SCALE_VALUE;
    }
    scaleControlValue.setAttribute('value', scaleValue + '%');
    imgUploadPhotoPreview.style.transform = 'scale(' + scaleValue / 100 + ')';
  });

  scaleControlBigger.addEventListener('click', function () {
    scaleValue += STEP_SCALE_VALUE;
    if (scaleValue >= MAX_SCALE_VALUE) {
      scaleValue = MAX_SCALE_VALUE;
    }
    scaleControlValue.setAttribute('value', scaleValue + '%');
    imgUploadPhotoPreview.style.transform = 'scale(' + scaleValue / 100 + ')';
  });

  window.scale = {
    imgUploadPhotoPreview: imgUploadPhotoPreview
  };
})();
