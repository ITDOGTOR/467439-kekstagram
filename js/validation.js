'use strict';

(function () {
  var MAX_HASHTAG_COUNT = 5;
  var MAX_VALUE_SYMBOLS_COMMENT = 140;

  // Валидация хэш-тегов
  var windowHashtags = document.querySelector('.text__hashtags');

  var validityInputHashtags = function (evt) {
    var countHashtag = 0;
    var hashtags = evt.target.value.split(' ');
    var lengthHashtagTooShort = false;
    var lengthHashtagTooLong = false;
    var notSymbolHashtag = false;
    var notSpaceHashtag = false;
    var repeatHashtags = false;

    for (var i = 0; i < hashtags.length; i++) {
      hashtags[i].toLowerCase();
      if (hashtags[i].length < 2) {
        lengthHashtagTooShort = true;
      } else if (hashtags[i].length > 20) {
        lengthHashtagTooLong = true;
      } else {
        for (var j = 0; j < hashtags[i].length; j++) {
          var symbols = hashtags[i];
          if (symbols[0] !== '#') {
            notSymbolHashtag = true;
          }
          if (symbols[j] === '#') {
            countHashtag++;
            if (countHashtag >= 2) {
              notSpaceHashtag = true;
            }
          }
        }
        countHashtag = 0;
      }
    }

    for (var n = 0; n < hashtags.length - 1; n++) {
      for (var m = n + 1; m < hashtags.length; m++) {
        if (hashtags[m].toLowerCase() === hashtags[n].toLowerCase()) {
          repeatHashtags = true;
        }
      }
    }

    var rules = [];
    if (hashtags.length > MAX_HASHTAG_COUNT) {
      rules.push('Введено больше 5 хэш-тегов');
    }
    if (lengthHashtagTooShort) {
      rules.push('Хэш-тег должен иметь не менее 2 символов');
    }
    if (lengthHashtagTooLong) {
      rules.push('Хэш-тег должен иметь не более 20 символов');
    }
    if (notSymbolHashtag) {
      rules.push('В названии хэш-тега должен присутствовать символ #');
    }
    if (repeatHashtags) {
      rules.push('Хэш-теги не должны повторяться');
    }
    if (notSpaceHashtag) {
      rules.push('Хэш-теги должны отделяться пробелами');
    }

    evt.target.setCustomValidity(rules.join(', '));

    if (rules.length > 0) {
      evt.target.style.border = '3px solid red';
    } else {
      evt.target.removeAttribute('style');
    }

    if (evt.target.value === '') {
      evt.target.setCustomValidity('');
    }
  };

  windowHashtags.addEventListener('input', validityInputHashtags);

  // Валидация комментария
  var windowDescription = document.querySelector('.text__description');

  var validityInputDescription = function (evt) {
    if (windowDescription.value.length > MAX_VALUE_SYMBOLS_COMMENT) {
      evt.target.setCustomValidity('Длина комментария не должна быть больше 140 символов');
      evt.target.style.border = '3px solid red';
    } else {
      evt.target.setCustomValidity('');
    }
  };

  windowDescription.addEventListener('input', validityInputDescription);

  // Временное решение
  windowHashtags.addEventListener('focus', function () {
    document.removeEventListener('keydown', window.form.onPopupEscPress);
  });

  windowHashtags.addEventListener('blur', function () {
    document.addEventListener('keydown', window.form.onPopupEscPress);
  });

  windowDescription.addEventListener('focus', function () {
    document.removeEventListener('keydown', window.form.onPopupEscPress);
  });

  windowDescription.addEventListener('blur', function () {
    document.addEventListener('keydown', window.form.onPopupEscPress);
  });
})();
