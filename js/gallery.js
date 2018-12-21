'use strict';

(function () {
  var onLoad = function (arrayOfObject) {
    var userPhoto = document.querySelector('.big-picture');
    var similarListPhotos = document.querySelector('.pictures');
    var similarPhotoTemplate = document.querySelector('#picture').content.querySelector('.picture');

    // Отрисовка миниатюр на странице
    var renderPhoto = function (photo) {
      var photoElement = similarPhotoTemplate.cloneNode(true);

      photoElement.querySelector('.picture__img').src = photo.url;
      photoElement.querySelector('.picture__likes').textContent = photo.likes;
      photoElement.querySelector('.picture__comments').textContent = photo.comments.length;

      return photoElement;
    };

    var fillPagePhotos = function (photo) {
      var fragmentPhoto = document.createDocumentFragment();
      for (var i = 0; i < photo.length; i++) {
        fragmentPhoto.appendChild(renderPhoto(photo[i]));
      }
      similarListPhotos.appendChild(fragmentPhoto);
    };

    fillPagePhotos(arrayOfObject);

    // Возвращает увеличенную миниатюру со всеми данными
    var getUserPhotoElement = function (pictureIndex) {
      userPhoto.querySelector('img').src = arrayOfObject[pictureIndex].url;
      userPhoto.querySelector('.likes-count').textContent = arrayOfObject[pictureIndex].likes;
      userPhoto.querySelector('.comments-count').textContent = arrayOfObject[pictureIndex].comments.length;
      userPhoto.querySelector('.social__caption').textContent = arrayOfObject[pictureIndex].description;

      // Отрисовка комментариев на странице
      var renderComment = function (comment) {
        var similarListComments = userPhoto.querySelector('.social__comments');
        var similarCommentTemplate = document.querySelector('#social__comment').content.querySelector('.social__comment');
        var fragmentComment = document.createDocumentFragment();

        if (comment[pictureIndex].comments.length > 5) {
          var commentsNumber = 5;
          userPhoto.querySelector('.comments-loader').classList.remove('visually-hidden');
        } else {
          commentsNumber = comment[pictureIndex].comments.length;
          userPhoto.querySelector('.comments-loader').classList.add('visually-hidden');
        }

        for (var i = 0; i < commentsNumber; i++) {
          var commentElement = similarCommentTemplate.cloneNode(true);

          commentElement.querySelector('.social__picture').src = comment[pictureIndex].comments[i].avatar;
          commentElement.querySelector('.social__text').textContent = comment[pictureIndex].comments[i].message;
          fragmentComment.appendChild(commentElement);
        }
        similarListComments.appendChild(fragmentComment);
      };
      renderComment(arrayOfObject);
    };

    var userPhotoClose = userPhoto.querySelector('.big-picture__cancel');

    // Навешивание обработчика
    var addClickHandler = function (photo, pictureIndex) {
      photo.addEventListener('click', function (evt) {
        evt.preventDefault();
        getUserPhotoElement(pictureIndex);
        openUserPhoto();
      });
    };

    var addHandlerToAllPhotos = function () {
      var photoList = document.querySelectorAll('.picture > img');
      for (var i = 0; i < photoList.length; i++) {
        var pictureIndex = photoList[i].src.slice(-6); // индекс фото берем из его адреса
        pictureIndex = pictureIndex.slice(0, -4);
        if (pictureIndex > 9) {
          parseInt(pictureIndex, 10);
        } else {
          pictureIndex = pictureIndex.slice(-1);
        }
        parseInt(pictureIndex, 10);
        addClickHandler(photoList[i], pictureIndex - 1);
      }
    };
    addHandlerToAllPhotos();

    var onUserPhotoEscPress = function (evt) {
      window.util.isEscEvent(evt, closeUserPhoto);
    };

    var openUserPhoto = function () {
      userPhoto.classList.remove('hidden');
      document.querySelector('body').classList.add('modal-open');
      document.addEventListener('keydown', onUserPhotoEscPress);
    };

    var closeUserPhoto = function () {
      userPhoto.querySelector('.social__comments').innerHTML = '';
      userPhoto.classList.add('hidden');
      document.querySelector('body').classList.remove('modal-open');
      document.removeEventListener('keydown', onUserPhotoEscPress);
    };

    userPhotoClose.addEventListener('click', closeUserPhoto);

    window.gallery = {
      arrayOfObject: arrayOfObject,
      addHandlerToAllPhotos: addHandlerToAllPhotos,
      fillPagePhotos: fillPagePhotos
    };
  };

  var onError = function () {

  };

  window.backend.load(onLoad, onError);
})();
