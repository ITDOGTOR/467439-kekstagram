'use strict';

(function () {
  var userPhotoClose = window.preview.userPhoto.querySelector('.big-picture__cancel');

  var photoList = document.querySelectorAll('.picture');
  photoList.forEach(function (element) {
    element.addEventListener('click', function (evt) {
      evt.preventDefault();
      window.preview.getUserPhotoElement(evt.currentTarget.dataset['pictureIndex']);
      openUserPhoto();
    });
  });

  var onUserPhotoEscPress = function (evt) {
    window.util.isEscEvent(evt, closeUserPhoto);
  };

  var openUserPhoto = function () {
    document.querySelector('body').classList.add('modal-open');
    window.preview.userPhoto.classList.remove('hidden');
    document.addEventListener('keydown', onUserPhotoEscPress);
  };

  var closeUserPhoto = function () {
    document.querySelector('body').classList.remove('modal-open');

    // Удаление комментариев из разметки
    var removeListComments = window.preview.userPhoto.querySelectorAll('.social__comment');
    for (var k = removeListComments.length - 1; k >= 0; k--) {
      window.preview.similarListComments.removeChild(removeListComments[k]);
    }
    window.preview.userPhoto.classList.add('hidden');
    document.removeEventListener('keydown', onUserPhotoEscPress);
  };

  userPhotoClose.addEventListener('click', closeUserPhoto);
})();
