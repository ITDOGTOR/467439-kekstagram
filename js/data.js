'use strict';

(function () {
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
  var PHOTO_DESCRIPTION = [
    'Тестим новую камеру!',
    'Затусили с друзьями на море',
    'Как же круто тут кормят',
    'Отдыхаем...',
    'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
    'Вот это тачка!'
  ];
  var AUTHOR_NAME = ['Эдуард', 'Валерий', 'Вячеслав', 'Анна', 'Евгения', 'Николай', 'Владимир', 'Макар', 'Олег', 'Жанна', 'Василий', 'Анастасия', 'Иван', 'Антон', 'Ярослав', 'Аркадий', 'Денис', 'Ксения', 'Зинаида', 'Раиса', 'Римма', 'Валерий', 'Василиса', 'Леонид', 'Алевтина'];

  // Генерирует параметры фотографии
  var generatePhoto = function (authorName, comments, index) {
    var objectPhoto = {
      url: 'photos/' + index + '.jpg',
      likes: window.util.getRandomNumber(MIN_LIKES, MAX_LIKES),
      comments: []
    };

    var generateComment = function () {
      var comment = {
        name: window.util.getRandomElement(authorName),
        avatar: 'img/avatar-' + window.util.getRandomNumber(1, 6) + '.svg',
        message: window.util.getRandomElement(comments)
      };
      return comment;
    };

    var randomNumberComments = window.util.getRandomNumber(MIN_COMMENTS, MAX_COMMENTS);
    for (var i = 0; i < randomNumberComments; i++) {
      objectPhoto.comments.push(generateComment());
    }
    return objectPhoto;
  };

  // Создание массива с фотографиями
  var photos = [];
  var randomArrUrl = window.util.getRandomOrderedArray(1, AUTHOR_NAME.length);
  for (var i = 0; i < AUTHOR_NAME.length; i++) {
    photos.push(generatePhoto(AUTHOR_NAME, PHOTOS_COMMENTS, randomArrUrl[i]));
  }

  window.data = {
    photos: photos,
    PHOTO_DESCRIPTION: PHOTO_DESCRIPTION
  };
})();
