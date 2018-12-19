'use strict';

(function () {
  // Отрисовка миниатюр на странице
  var similarListPhotos = document.querySelector('.pictures');
  var renderPhotos = function (photo) {
    var similarPhotoTemplate = document.querySelector('#picture').content.querySelector('.picture');
    var fragmentPhoto = document.createDocumentFragment();

    for (var i = 0; i < photo.length; i++) {
      var photoElement = similarPhotoTemplate.cloneNode(true);

      photoElement.setAttribute('data-picture-index', i);
      photoElement.querySelector('.picture__img').src = photo[i].url;
      photoElement.querySelector('.picture__likes').textContent = photo[i].likes;
      photoElement.querySelector('.picture__comments').textContent = photo[i].comments.length;
      fragmentPhoto.appendChild(photoElement);
    }
    similarListPhotos.appendChild(fragmentPhoto);
  };
  renderPhotos(window.data.photos);
})();
