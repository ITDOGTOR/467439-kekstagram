'use strict';

(function () {
  var EFFECTS_LIST = {
    chrome: {
      filter: 'grayscale',
      min: 0,
      max: 1,
      unit: ''
    },
    sepia: {
      filter: 'sepia',
      min: 0,
      max: 1,
      unit: ''
    },
    marvin: {
      filter: 'invert',
      min: 0,
      max: 100,
      unit: '%'
    },
    phobos: {
      filter: 'blur',
      min: 1,
      max: 3,
      unit: 'px'
    },
    heat: {
      filter: 'brightness',
      min: 1,
      max: 3,
      unit: ''
    },
    none: {
      filter: '',
      min: 1,
      max: 1,
      unit: ''
    }
  };
  var EFFECTS_NAME = Object.keys(EFFECTS_LIST);

  // Возвращает пропорцию
  var getProportion = function (min, max, bool) {
    return bool ? ((max - min) / 100) : (100 / (max - min));
  };

  // Возвращает значение заданного фильтра строкой
  var getFilter = function (filter, value, unit) {
    return filter ? filter + '(' + value + unit + ')' : '';
  };

  // Возвращает значение перемещения пина слайдера
  var getPinPercent = function (newValue, min, max) {
    return Math.round((Math.min(Math.max(newValue - min, 0), newValue + min) / max) * 100);
  };

  // Устанавливает класс эффекта на элементе
  var setClassEffect = function (effect) {
    for (var i = 0; i < EFFECTS_NAME.length; i++) {
      window.scale.imgUploadPhotoPreview.classList.remove('effects__preview--' + EFFECTS_NAME[i]);
      if (effect === EFFECTS_NAME[i]) {
        window.scale.imgUploadPhotoPreview.classList.add('effects__preview--' + effect);
      }
    }
  };

  // Устанавливает значение эффекта на элементе
  var setValueEffect = function (effect, value) {
    var effectValue = document.querySelector('.effect-level__value');
    var levelPin = document.querySelector('.effect-level__pin');
    var levelDepth = document.querySelector('.effect-level__depth');

    var filter = EFFECTS_LIST[effect];
    var proportion = getProportion(filter.min, filter.max, 1);
    var undoProportion = getProportion(filter.min, filter.max, 0);

    var valueFilter = Math.max(filter.min, Math.min(proportion * value + filter.min, filter.max));
    var valueFilterInPercent = Math.round((valueFilter - filter.min) * undoProportion);

    window.scale.imgUploadPhotoPreview.style.filter = getFilter(filter.filter, valueFilter, filter.unit);
    effectValue.setAttribute('value', valueFilterInPercent);

    levelPin.style.left = valueFilterInPercent + '%';
    levelDepth.style.width = valueFilterInPercent + '%';
  };

  // Изменяет значение фильтра с помощью слайдера
  var setValueEffectSlider = function (value) {
    var elementEffect = window.scale.imgUploadPhotoPreview.getAttribute('class');
    var effect = elementEffect.substring(elementEffect.lastIndexOf('--') + 2, elementEffect.length);

    setValueEffect(effect, value);
  };

  window.filter = {
    EFFECTS_NAME: EFFECTS_NAME,
    getPinPercent: getPinPercent,
    setClassEffect: setClassEffect,
    setValueEffect: setValueEffect,
    setValueEffectSlider: setValueEffectSlider
  };
})();
