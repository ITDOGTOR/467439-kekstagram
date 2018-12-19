'use strict';

(function () {
  var uploadPhoto = document.querySelector('.img-upload');
  var uploadPhotoControl = uploadPhoto.querySelector('#upload-file');
  var uploadPhotoForm = uploadPhoto.querySelector('.img-upload__overlay');
  var uploadPhotoFormClose = uploadPhoto.querySelector('.img-upload__cancel');

  var onPopupEscPress = function (evt) {
    window.util.isEscEvent(evt, closePhotoForm);
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

  window.form = {
    onPopupEscPress: onPopupEscPress
  };
})();
