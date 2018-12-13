'use strict';

var MIN_LIKES = 15;
var MAX_LIKES = 250;
var MIN_COMMENTS = 1;
var MAX_COMMENTS = 25;
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



var similarListPhotos = document.querySelector('.pictures');
var similarPhotoTemplate = document.querySelector('#picture').content.querySelector('.picture');
// Отрисовка фотографий на странице
var renderPhoto = function (photo) {
  var photoElement = similarPhotoTemplate.cloneNode(true);
  photoElement.querySelector('.picture__img').src = photo.url;
  photoElement.querySelector('.picture__likes').textContent = photo.likes;
  photoElement.querySelector('.picture__comments').textContent = photo.comments.length;
  return photoElement;
};
var fragmentPhoto = document.createDocumentFragment();
for (var j = 0; j < photos.length; j++) {
  fragmentPhoto.appendChild(renderPhoto(photos[j]));
}
similarListPhotos.appendChild(fragmentPhoto);



var userPhoto = document.querySelector('.big-picture');
var userPhotoClose = userPhoto.querySelector('.big-picture__cancel');

var openUserPhoto = function () {
  // userPhoto.classList.remove('hidden');
  // getUserPhotoElement(0);
  document.addEventListener('keydown', onUserPhotoEscPress);
};

var closeUserPhoto = function () {
  userPhoto.classList.add('hidden');
  document.removeEventListener('keydown', onUserPhotoEscPress);
};

var onUserPhotoEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closeUserPhoto();
  }
};

similarListPhotos.addEventListener('click', function () {
  openUserPhoto();
});

userPhotoClose.addEventListener('click', function () {
  closeUserPhoto();
});

function getUserPhotoElement (pictureIndex) {
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
    var commentsRandomNumber = getRandomNumber(MIN_COMMENTS, 5);
  } else {
    commentsRandomNumber = photos[pictureIndex].comments.length;
  }

  for (var n = 0; n < commentsRandomNumber; n++) {
    fragmentComment.appendChild(renderComment(photos[pictureIndex].comments[n]));
  }
  similarListComments.appendChild(fragmentComment);
}

/* var commentCount = userPhoto.querySelector('.social__comment-count');
commentCount.classList.add('visually-hidden');
var commentsLoad = userPhoto.querySelector('.social__comments-loader');
commentsLoad.classList.add('visually-hidden'); */

var uploadPhoto = document.querySelector('.img-upload');
var uploadPhotoControl = uploadPhoto.querySelector('#upload-file');
var uploadPhotoForm = uploadPhoto.querySelector('.img-upload__overlay');
var uploadPhotoFormClose = uploadPhoto.querySelector('.img-upload__cancel');

var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
  }
};

var openForm = function () {
  uploadPhotoForm.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

var closeForm = function () {
  uploadPhotoForm.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

uploadPhotoControl.addEventListener('change', function () {
  openForm();
});

uploadPhotoFormClose.addEventListener('click', function () {
  closeForm();
});
