'use strict';

var MIN_LIKES = 15;
var MAX_LIKES = 250;
var MIN_COMMENTS = 1;
var MAX_COMMENTS = 25;
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
  };

  function compareRandom(a, b) {
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
};

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
userPhoto.classList.remove('hidden');

userPhoto.querySelector('img').src = photos[0].url;
userPhoto.querySelector('.likes-count').textContent = photos[0].likes;
userPhoto.querySelector('.comments-count').textContent = photos[0].comments.length;
userPhoto.querySelector('.social__caption').textContent = getRandomElement(PHOTOS_DESCRIPTION);

var similarListComments = userPhoto.querySelector('.social__comments');
var similarCommentTemplate = document.querySelector('#social__comment').content.querySelector('.social__comment');

// Удаление комментариев из разметки
var removeListComments = userPhoto.querySelectorAll('.social__comment');
for (var i = removeListComments.length - 1; i >= 0; i--) {
  similarListComments.removeChild(removeListComments[i]);
}

// Отрисовка комментариев на странице
var renderComment = function (comment) {
  var commentElement = similarCommentTemplate.cloneNode(true);
  commentElement.querySelector('.social__picture').src = comment.avatar;
  commentElement.querySelector('.social__text').textContent = comment.message;
  return commentElement;
};

var fragmentComment = document.createDocumentFragment();

if (photos[0].comments.length > 5) {
  var commentsRandomNumber = getRandomNumber(MIN_COMMENTS, 5);
} else {
  commentsRandomNumber = photos[0].comments.length;
}

for (var j = 0; j < commentsRandomNumber; j++) {
  fragmentComment.appendChild(renderComment(photos[0].comments[j]));
}
similarListComments.appendChild(fragmentComment);

var commentCount = userPhoto.querySelector('.social__comment-count');
commentCount.classList.add('visually-hidden');
var commentsLoad = userPhoto.querySelector('.social__comments-loader');
commentsLoad.classList.add('visually-hidden');

