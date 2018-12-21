'use strict';

(function () {
  var filter = document.querySelector('.img-filters');
  filter.classList.remove('img-filters--inactive');

  var filterPopular = filter.querySelector('#filter-popular');
  var filterNew = filter.querySelector('#filter-new');
  var filterDiscussed = filter.querySelector('#filter-discussed');

  var activeButton = function (buttonName) {
    filterPopular.classList.remove('img-filters__button--active');
    filterNew.classList.remove('img-filters__button--active');
    filterDiscussed.classList.remove('img-filters__button--active');
    buttonName.classList.add('img-filters__button--active');
  };

  var cleanPage = function () {
    var amountPhoto = document.querySelectorAll('.picture');
    amountPhoto.forEach(function (element) {
      element.remove();
    });
  };

  var sortByNew = function (data, quantity) {
    var dataCopy = data.slice();
    var newArray = [];
    var index;
    for (var i = 0; i < 10; i++) {
      index = window.util.getRandomNumber(0, quantity);
      newArray.push(dataCopy[index]);
      dataCopy.splice(index, 1);
      quantity--;
    }
    window.gallery.fillPagePhotos(newArray, 10);
  };

  var sortByDiscussed = function (data) {
    var dataCopy = data.slice();
    dataCopy.sort(function (first, second) {
      if (first.comments.length < second.comments.length) {
        return 1;
      } else if (first.comments.length > second.comments.length) {
        return -1;
      } else if (first.likes < second.likes) {
        return 1;
      } if (first.likes > second.likes) {
        return -1;
      } else {
        return 0;
      }
    });
    window.gallery.fillPagePhotos(dataCopy, window.arrayOfObject.length);
  };

  filterPopular.addEventListener('click', function () {
    activeButton(filterPopular);
    cleanPage();
    window.gallery.fillPagePhotos(window.arrayOfObject, window.arrayOfObject.length);
    window.gallery.addHandlerToAllPhotos();
  });

  filterNew.addEventListener('click', function () {
    activeButton(filterNew);
    cleanPage();
    sortByNew(window.arrayOfObject, window.arrayOfObject.length);
    window.gallery.addHandlerToAllPhotos();
  });

  filterDiscussed.addEventListener('click', function () {
    activeButton(filterDiscussed);
    cleanPage();
    sortByDiscussed(window.arrayOfObject);
    window.gallery.addHandlerToAllPhotos();
  });
})();
