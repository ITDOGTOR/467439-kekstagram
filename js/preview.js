'use strict';

(function () {
  var userPhoto = document.querySelector('.big-picture');
  var similarListComments = userPhoto.querySelector('.social__comments');

  // Возвращает увеличенную миниатюру со всеми данными
  var getUserPhotoElement = function (pictureIndex) {
    userPhoto.querySelector('img').src = window.data.photos[pictureIndex].url;
    userPhoto.querySelector('.likes-count').textContent = window.data.photos[pictureIndex].likes;
    userPhoto.querySelector('.comments-count').textContent = window.data.photos[pictureIndex].comments.length;
    userPhoto.querySelector('.social__caption').textContent = window.util.getRandomElement(window.data.PHOTO_DESCRIPTION);

    var similarCommentTemplate = document.querySelector('#social__comment').content.querySelector('.social__comment');
    // Отрисовка комментариев на странице
    var renderComment = function (comment) {
      var commentElement = similarCommentTemplate.cloneNode(true);
      commentElement.querySelector('.social__picture').src = comment.avatar;
      commentElement.querySelector('.social__text').textContent = comment.message;
      return commentElement;
    };

    var fragmentComment = document.createDocumentFragment();
    if (window.data.photos[pictureIndex].comments.length > 5) {
      var commentsNumber = 5;
      userPhoto.querySelector('.comments-loader').classList.remove('visually-hidden');
    } else {
      commentsNumber = window.data.photos[pictureIndex].comments.length;
      userPhoto.querySelector('.comments-loader').classList.add('visually-hidden');
    }

    for (var i = 0; i < commentsNumber; i++) {
      fragmentComment.appendChild(renderComment(window.data.photos[pictureIndex].comments[i]));
    }
    similarListComments.appendChild(fragmentComment);
  };

  window.preview = {
    userPhoto: userPhoto,
    getUserPhotoElement: getUserPhotoElement,
    similarListComments: similarListComments
  };
})();
