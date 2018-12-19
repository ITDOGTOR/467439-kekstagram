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
    // Возвращает перемешанный массив в заданном диапазоне
    getRandomOrderedArray: function (min, max) {
      var arr = [];
      for (var i = min; i <= max; i++) {
        arr.push(i);
      }
      var compareRandom = function () {
        return Math.random() - 0.5;
      };
      return arr.sort(compareRandom);
    },
    // Возвращает случайный элемент массива
    getRandomElement: function (arr) {
      return arr[Math.floor(Math.random() * arr.length)];
    },
    // Возвращает случайное число в заданном диапазоне
    getRandomNumber: function (min, max) {
      return Math.round(min - 0.5 + Math.random() * (max - min + 1));
    }
  };
})();
