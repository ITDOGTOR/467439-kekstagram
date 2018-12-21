'use strict';

(function () {
  var FILTER_DEFAULT_VALUE = 100;

  var slider = document.querySelector('.img-upload__effect-level');
  var imgPhotoEffects = document.querySelectorAll('.effects__radio');

  slider.classList.add('hidden'); // По умолчанию слайдер скрыт

  // Применение фильтра на картинку
  imgPhotoEffects.forEach(function (element) {
    element.addEventListener('click', function () {
      var effect = element.getAttribute('value');
      window.filter.setClassEffect(effect);
      window.filter.setValueEffect(effect, FILTER_DEFAULT_VALUE);
      if (effect !== window.filter.EFFECTS_NAME[window.filter.EFFECTS_NAME.length - 1]) {
        slider.classList.remove('hidden');
      } else {
        slider.classList.add('hidden');
      }
    });
  });

  var setPinPositionOnClick = function (clickEvt) {
    clickEvt.preventDefault();

    var effectLine = clickEvt.currentTarget.querySelector('.effect-level__line');
    var effectLineCoords = effectLine.getBoundingClientRect();

    var pinValue = window.filter.getPinPercent(clickEvt.clientX, effectLineCoords.x, effectLineCoords.width);

    window.filter.setValueEffectSlider(pinValue);

    document.removeEventListener('click', setPinPositionOnClick);
  };

  var setPinPositionPress = function (downEvt) {
    downEvt.preventDefault();

    var effectLine = downEvt.currentTarget.querySelector('.effect-level__line');
    var effectLineCoords = effectLine.getBoundingClientRect();

    var pinValue = window.filter.getPinPercent(downEvt.clientX, effectLineCoords.x, effectLineCoords.width);

    var setPinPositionOnMove = function (moveEvt) {
      moveEvt.preventDefault();

      pinValue = window.filter.getPinPercent(moveEvt.clientX, effectLineCoords.x, effectLineCoords.width);

      window.filter.setValueEffectSlider(pinValue);
    };

    var setPinPositionRelease = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', setPinPositionOnMove);
      document.removeEventListener('mouseup', setPinPositionRelease);
    };

    document.addEventListener('mousemove', setPinPositionOnMove);
    document.addEventListener('mouseup', setPinPositionRelease);
  };

  slider.addEventListener('mousedown', setPinPositionPress);
  slider.addEventListener('click', setPinPositionOnClick);

  window.slider = {
    FILTER_DEFAULT_VALUE: FILTER_DEFAULT_VALUE
  };
})();
