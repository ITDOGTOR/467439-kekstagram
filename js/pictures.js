'use strict';

var MIN_LIKES = 15;
var MAX_LIKES = 250;
var MIN_COMMENTS = 1;
var MAX_COMMENTS = 25;
var MIN_SCALE_VALUE = 25;
var MAX_SCALE_VALUE = 100;
var STEP_SCALE_VALUE = 25;
var FILTER_DEFAULT_VALUE = 100;
var ESC_KEYCODE = 27;
var EFFECTS_NAME = ['chrome', 'sepia', 'marvin', 'phobos', 'heat', 'none'];
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
var PHOTOS_COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
var PHOTOS_DESCRIPTION = [
  'Тестим новую камеру!',
  'Затусили с друзьями на море',
  'Как же круто тут кормят',
  'Отдыхаем...',
  'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
  'Вот это тачка!'
];
var AUTHOR_NAME = ['Эдуард', 'Валерий', 'Вячеслав', 'Анна', 'Евгения', 'Николай', 'Владимир', 'Макар', 'Олег', 'Жанна', 'Василий', 'Анастасия', 'Иван', 'Антон', 'Ярослав', 'Аркадий', 'Денис', 'Ксения', 'Зинаида', 'Раиса', 'Римма', 'Валерий', 'Василиса', 'Леонид', 'Алевтина'];

// Возвращает перемешанный массив в заданном диапазоне
var getRandomOrderedArray = function (min, max) {
  var arr = [];
  for (var i = min; i <= max; i++) {
    arr.push(i);
  }

  var compareRandom = function () {
    return Math.random() - 0.5;
  };

  return arr.sort(compareRandom);
};

// Возвращает случайный элемент массива
var getRandomElement = function (arr) {
  var rand = Math.floor(Math.random() * arr.length);
  return arr[rand];
};

// Возвращает случайное число в заданном диапазоне
var getRandomNumber = function (min, max) {
  var rand = min - 0.5 + Math.random() * (max - min + 1);
  rand = Math.round(rand);
  return rand;
};

// Генерирует параметры фотографии
var generatePhoto = function (authorName, comments, index) {
  var objectPhoto = {
    url: 'photos/' + index + '.jpg',
    likes: getRandomNumber(MIN_LIKES, MAX_LIKES),
    comments: []
  };

  var generateComment = function () {
    var comment = {
      name: getRandomElement(authorName),
      avatar: 'img/avatar-' + getRandomNumber(1, 6) + '.svg',
      message: getRandomElement(comments)
    };
    return comment;
  };

  var randomNumberComments = getRandomNumber(MIN_COMMENTS, MAX_COMMENTS);
  for (var i = 0; i < randomNumberComments; i++) {
    objectPhoto.comments.push(generateComment());
  }
  return objectPhoto;
};

// Создание массива с фотографиями
var photos = [];
var randomArrUrl = getRandomOrderedArray(1, AUTHOR_NAME.length);
for (var i = 0; i < AUTHOR_NAME.length; i++) {
  photos.push(generatePhoto(AUTHOR_NAME, PHOTOS_COMMENTS, randomArrUrl[i]));
}

// Возвращает увеличенную миниатюру со всеми данными
var userPhoto = document.querySelector('.big-picture');
var userPhotoClose = userPhoto.querySelector('.big-picture__cancel');
var similarListComments = userPhoto.querySelector('.social__comments');

var getUserPhotoElement = function (pictureIndex) {
  var photoDescription = getRandomElement(PHOTOS_DESCRIPTION);
  userPhoto.querySelector('img').src = photos[pictureIndex].url;
  userPhoto.querySelector('.likes-count').textContent = photos[pictureIndex].likes;
  userPhoto.querySelector('.comments-count').textContent = photos[pictureIndex].comments.length;
  userPhoto.querySelector('.social__caption').textContent = photoDescription;

  var similarCommentTemplate = document.querySelector('#social__comment').content.querySelector('.social__comment');

  // Отрисовка комментариев на странице
  var renderComment = function (comment) {
    var commentElement = similarCommentTemplate.cloneNode(true);
    commentElement.querySelector('.social__picture').src = comment.avatar;
    commentElement.querySelector('.social__text').textContent = comment.message;
    return commentElement;
  };

  var fragmentComment = document.createDocumentFragment();
  if (photos[pictureIndex].comments.length > 5) {
    var commentsNumber = 5;
    userPhoto.querySelector('.comments-loader').classList.remove('visually-hidden');
  } else {
    commentsNumber = photos[pictureIndex].comments.length;
    userPhoto.querySelector('.comments-loader').classList.add('visually-hidden');
  }

  for (var n = 0; n < commentsNumber; n++) {
    fragmentComment.appendChild(renderComment(photos[pictureIndex].comments[n]));
  }
  similarListComments.appendChild(fragmentComment);
};

// Отрисовка фотографий на странице
var similarListPhotos = document.querySelector('.pictures');
var renderPhotos = function (photo) {
  var similarPhotoTemplate = document.querySelector('#picture').content.querySelector('.picture');
  var fragmentPhoto = document.createDocumentFragment();

  for (var q = 0; q < photo.length; q++) {
    var photoElement = similarPhotoTemplate.cloneNode(true);

    photoElement.setAttribute('data-picture-index', q);
    photoElement.querySelector('.picture__img').src = photo[q].url;
    photoElement.querySelector('.picture__likes').textContent = photo[q].likes;
    photoElement.querySelector('.picture__comments').textContent = photo[q].comments.length;
    fragmentPhoto.appendChild(photoElement);
  }
  similarListPhotos.appendChild(fragmentPhoto);
};
renderPhotos(photos);

var photoList = similarListPhotos.querySelectorAll('.picture');
photoList.forEach(function (element) {
  element.addEventListener('click', function (evt) {
    evt.preventDefault();
    getUserPhotoElement(evt.currentTarget.dataset['pictureIndex']);
    openUserPhoto();
  });
});

var openUserPhoto = function () {
  document.querySelector('body').classList.add('modal-open');
  userPhoto.classList.remove('hidden');
  document.addEventListener('keydown', onUserPhotoEscPress);
};

var closeUserPhoto = function () {
  document.querySelector('body').classList.remove('modal-open');
  // Удаление комментариев из разметки
  var removeListComments = userPhoto.querySelectorAll('.social__comment');
  for (var k = removeListComments.length - 1; k >= 0; k--) {
    similarListComments.removeChild(removeListComments[k]);
  }
  userPhoto.classList.add('hidden');
  document.removeEventListener('keydown', onUserPhotoEscPress);
};

var onUserPhotoEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closeUserPhoto();
  }
};

userPhotoClose.addEventListener('click', closeUserPhoto);

var uploadPhoto = document.querySelector('.img-upload');
var uploadPhotoControl = uploadPhoto.querySelector('#upload-file');
var uploadPhotoForm = uploadPhoto.querySelector('.img-upload__overlay');
var uploadPhotoFormClose = uploadPhoto.querySelector('.img-upload__cancel');

var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePhotoForm();
  }
};

var openPhotoForm = function () {
  uploadPhotoForm.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

var closePhotoForm = function () {
  uploadPhotoForm.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

uploadPhotoControl.addEventListener('change', openPhotoForm);
uploadPhotoFormClose.addEventListener('click', closePhotoForm);

// Масштабирование картинки
var imgUploadPhotoPreview = uploadPhoto.querySelector('img');
var scaleControlSmaller = uploadPhoto.querySelector('.scale__control--smaller');
var scaleControlValue = uploadPhoto.querySelector('.scale__control--value');
var scaleControlBigger = uploadPhoto.querySelector('.scale__control--bigger');

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

// Возвращает пропорцию
var getProportion = function (min, max, bool) {
  return bool ? ((max - min) / 100) : (100 / (max - min));
};

// Возвращает значение заданного фильтра строкой
var getFilter = function (filter, value, unit) {
  return filter ? filter + '(' + value + unit + ')' : '';
};

// Устанавливает класс эффекта на элементе
var setClassEffect = function (effect) {
  for (var z = 0; z < EFFECTS_NAME.length; z++) {
    imgUploadPhotoPreview.classList.remove('effects__preview--' + EFFECTS_NAME[z]);
    if (effect === EFFECTS_NAME[z]) {
      imgUploadPhotoPreview.classList.add('effects__preview--' + effect);
    }
  }
};

// Устанавливает значение эффекта на элементе
var setValueEffect = function (effect, value) {
  var filter = EFFECTS_LIST[effect];
  var proportion = getProportion(filter.min, filter.max, 1);
  var undoProportion = getProportion(filter.min, filter.max, 0);
  var valueFilter = Math.max(filter.min, Math.min(proportion * value + filter.min, filter.max));
  imgUploadPhotoPreview.style.filter = getFilter(filter.filter, valueFilter, filter.unit);
  effectValue.value = Math.round((valueFilter - filter.min) * undoProportion);
};

// Изменяет значение фильтра с помощью слайдера
var setValueEffectSlider = function () {
  var elementEffect = imgUploadPhotoPreview.getAttribute('class');
  var effect = elementEffect.substring(elementEffect.lastIndexOf('--') + 2, elementEffect.length);
  var newEffectLevel = 20;
  setValueEffect(effect, newEffectLevel);
};

var slider = uploadPhoto.querySelector('.img-upload__effect-level');
var imgPhotoEffects = uploadPhoto.querySelectorAll('.effects__radio');
var effectValue = uploadPhoto.querySelector('.effect-level__value');

slider.classList.add('hidden'); // По умолчанию слайдер скрыт

// Применение фильтра на картинку
imgPhotoEffects.forEach(function (element) {
  element.addEventListener('click', function () {
    var effect = element.getAttribute('value');
    setClassEffect(effect);
    setValueEffect(effect, FILTER_DEFAULT_VALUE);
    if (effect !== EFFECTS_NAME[EFFECTS_NAME.length - 1]) {
      slider.classList.remove('hidden');
    } else {
      slider.classList.add('hidden');
    }
  });
});

slider.addEventListener('mouseup', setValueEffectSlider);

// Валидация хэш-тегов
var windowHashtags = uploadPhoto.querySelector('.text__hashtags');

var validityInputHashtags = function (evt) {
  var countHashtag = 0;
  var hashtags = evt.target.value.split(' ');
  var lengthHashtagTooShort = false;
  var lengthHashtagTooLong = false;
  var notSymbolHashtag = false;
  var notSpaceHashtag = false;
  var repeatHashtags = false;

  for (var w = 0; w < hashtags.length; w++) {
    hashtags[w].toLowerCase();
    if (hashtags[w].length < 2) {
      lengthHashtagTooShort = true;
    } else if (hashtags[w].length > 20) {
      lengthHashtagTooLong = true;
    } else {
      for (var j = 0; j < hashtags[w].length; j++) {
        var symbols = hashtags[w];
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

  for (var k = 0; k < hashtags.length - 1; k++) {
    for (var m = k + 1; m < hashtags.length; m++) {
      if (hashtags[m].toLowerCase() === hashtags[k].toLowerCase()) {
        repeatHashtags = true;
      }
    }
  }

  if (hashtags.length > 5) {
    evt.target.setCustomValidity('Введено больше 5 хэш-тегов');
  } else if (lengthHashtagTooShort) {
    evt.target.setCustomValidity('Хэш-тег должен иметь не менее 2 символов');
  } else if (lengthHashtagTooLong) {
    evt.target.setCustomValidity('Хэш-тег должен иметь не более 20 символов');
  } else if (notSymbolHashtag) {
    evt.target.setCustomValidity('В названии хэш-тега должен присутствовать символ #');
  } else if (repeatHashtags) {
    evt.target.setCustomValidity('Хэш-теги не должны повторяться');
  } else if (notSpaceHashtag) {
    evt.target.setCustomValidity('Хэш-теги должны отделяться пробелами');
  } else {
    evt.target.setCustomValidity('');
  }
};

windowHashtags.addEventListener('input', validityInputHashtags);

// Валидация комментария
var windowDescription = uploadPhoto.querySelector('.text__description');

var validityInputDescription = function (evt) {
  if (windowDescription.value.length > 140) {
    evt.target.setCustomValidity('Длина комментария не должна быть больше 140 символов');
  } else {
    evt.target.setCustomValidity('');
  }
};

windowDescription.addEventListener('input', validityInputDescription);

// Временное решение
windowHashtags.addEventListener('focus', function () {
  document.removeEventListener('keydown', onPopupEscPress);
});

windowHashtags.addEventListener('blur', function () {
  document.addEventListener('keydown', onPopupEscPress);
});

windowDescription.addEventListener('focus', function () {
  document.removeEventListener('keydown', onPopupEscPress);
});

windowDescription.addEventListener('blur', function () {
  document.addEventListener('keydown', onPopupEscPress);
});
