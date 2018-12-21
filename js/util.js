'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  window.util = {
    isEscEvent: function (evt, action) {
      if (evt.keyCode === ESC_KEYCODE) {
        action();
      }
    },
    isEnterEvent: function (evt, action) {
      if (evt.keyCode === ENTER_KEYCODE) {
        action();
      }
    },
    // Возвращает случайное число в заданном диапазоне не включая max
    getRandomNumber: function (min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    }
  };
})();
