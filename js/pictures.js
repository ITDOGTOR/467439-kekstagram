'use strict';

var MIN_LIKES = 15;
var MAX_LIKES = 250;
var MIN_COMMENTS = 1;
var MAX_COMMENTS = 25;
var MIN_SCALE_VALUE = 25;
var MAX_SCALE_VALUE = 100;
var JUMP_SCALE_VALUE = 25;
var ESC_KEYCODE = 27;
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
var getUserPhotoElement = function (pictureIndex) {
  var photoDescription = getRandomElement(PHOTOS_DESCRIPTION);
  userPhoto.querySelector('img').src = photos[pictureIndex].url;
  userPhoto.querySelector('.likes-count').textContent = photos[pictureIndex].likes;
  userPhoto.querySelector('.comments-count').textContent = photos[pictureIndex].comments.length;
  userPhoto.querySelector('.social__caption').textContent = photoDescription;

  var similarListComments = userPhoto.querySelector('.social__comments');
  var similarCommentTemplate = document.querySelector('#social__comment').content.querySelector('.social__comment');

  // Удаление комментариев из разметки
  var removeListComments = userPhoto.querySelectorAll('.social__comment');
  for (var k = removeListComments.length - 1; k >= 0; k--) {
    similarListComments.removeChild(removeListComments[k]);
  }

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
var renderPhotos = function (photo) {
  var similarListPhotos = document.querySelector('.pictures');
  var similarPhotoTemplate = document.querySelector('#picture').content.querySelector('.picture');
  var fragmentPhoto = document.createDocumentFragment();

  for (var q = 0; q < photo.length; q++) {
    var photoElement = similarPhotoTemplate.cloneNode(true);

    photoElement.setAttribute('data-picture-index', q);
    photoElement.querySelector('.picture__img').src = photo[q].url;
    photoElement.querySelector('.picture__likes').textContent = photo[q].likes;
    photoElement.querySelector('.picture__comments').textContent = photo[q].comments.length;

    photoElement.addEventListener('click', function (evt) {
      evt.preventDefault();
      getUserPhotoElement(evt.currentTarget.dataset['pictureIndex']);
      openUserPhoto();
    });

    fragmentPhoto.appendChild(photoElement);
  }
  similarListPhotos.appendChild(fragmentPhoto);
};
renderPhotos(photos);

var userPhoto = document.querySelector('.big-picture');
var userPhotoClose = userPhoto.querySelector('.big-picture__cancel');

var openUserPhoto = function () {
  document.querySelector('body').classList.add('modal-open');
  userPhoto.classList.remove('hidden');
  document.addEventListener('keydown', onUserPhotoEscPress);
};

var closeUserPhoto = function () {
  document.querySelector('body').classList.remove('modal-open');
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

var scaleValue = MAX_SCALE_VALUE;
scaleControlValue.value = scaleValue + '%';

scaleControlSmaller.addEventListener('click', function () {
  scaleValue -= JUMP_SCALE_VALUE;
  if (scaleValue <= MIN_SCALE_VALUE) {
    scaleValue = MIN_SCALE_VALUE;
  }
  scaleControlValue.value = scaleValue + '%';
  imgUploadPhotoPreview.style.transform = 'scale(' + scaleValue / 100 + ')';
});

scaleControlBigger.addEventListener('click', function () {
  scaleValue += JUMP_SCALE_VALUE;
  if (scaleValue >= MAX_SCALE_VALUE) {
    scaleValue = MAX_SCALE_VALUE;
  }
  scaleControlValue.value = scaleValue + '%';
  imgUploadPhotoPreview.style.transform = 'scale(' + scaleValue / 100 + ')';
});

// Применение фильтра на картинку
var uploadPhotoEffects = uploadPhoto.querySelector('.effects');
var uploadPhotoPreviewContainer = uploadPhoto.querySelector('.img-upload__preview');
uploadPhotoEffects.addEventListener('click', function (evt) {
  uploadPhotoPreviewContainer.classList = 'img-upload__preview effects__preview--' + evt.target.value;
});
