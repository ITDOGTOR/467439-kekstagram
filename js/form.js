'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var uploadPhoto = document.querySelector('.img-upload');
  var uploadPhotoControl = uploadPhoto.querySelector('#upload-file');
  var uploadPhotoForm = uploadPhoto.querySelector('.img-upload__overlay');
  var uploadPhotoFormClose = uploadPhoto.querySelector('.img-upload__cancel');

  var onPopupEscPress = function (evt) {
    window.util.isEscEvent(evt, closePhotoForm);
  };

  var setCustomPhotoPreview = function () {
    var file = uploadPhotoControl.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        window.scale.imgUploadPhotoPreview.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  };

  var openPhotoForm = function () {
    uploadPhotoForm.classList.remove('hidden');
    setCustomPhotoPreview();
    document.addEventListener('keydown', onPopupEscPress);
  };

  var closePhotoForm = function () {
    cleanPhotoForm();
    uploadPhotoForm.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
  };

  var cleanPhotoForm = function () {
    uploadPhotoControl.value = '';
    window.scale.imgUploadPhotoPreview.style.filter = '';
    window.scale.imgUploadPhotoPreview.style.transform = '';
    uploadPhoto.querySelector('input[name="effect-level"]').setAttribute('value', window.slider.FILTER_DEFAULT_VALUE);
    uploadPhoto.querySelector('.effect-level__pin').style.left = window.slider.FILTER_DEFAULT_VALUE + '%';
    uploadPhoto.querySelector('.effect-level__depth').style.width = window.slider.FILTER_DEFAULT_VALUE + '%';
    uploadPhoto.querySelector('.scale__control--value').setAttribute('value', window.scale.MAX_SCALE_VALUE + '%');
    window.filter.setClassEffect(window.scale.imgUploadPhotoPreview, 'none');
    uploadPhoto.querySelector('.img-upload__effect-level').classList.add('hidden');
    uploadPhoto.querySelector('.text__hashtags').value = '';
    uploadPhoto.querySelector('.text__description').value = '';
  };

  uploadPhotoControl.addEventListener('change', openPhotoForm);
  uploadPhotoFormClose.addEventListener('click', closePhotoForm);

  var onFormSubmit = function (evt) {
    var saveSuccess = function () {
      cleanPhotoForm();
      uploadPhotoForm.classList.add('hidden');
      window.message.createMessage(window.message.messageType.SUCCESS);
    };
    var saveError = function () {
      cleanPhotoForm();
      uploadPhotoForm.classList.add('hidden');
      window.message.createMessage(window.message.messageType.ERROR);
    };

    window.backend.save(new FormData(form), saveSuccess, saveError);
    evt.preventDefault();
  };

  var form = document.querySelector('#upload-select-image');
  form.addEventListener('submit', onFormSubmit);

  window.form = {
    onPopupEscPress: onPopupEscPress
  };
})();
