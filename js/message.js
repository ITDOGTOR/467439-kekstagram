'use strict';

(function () {
  var messageType = {
    ERROR: 'error',
    SUCCESS: 'success'
  };

  var mainElement = document.querySelector('main');
  var errorMessage = document.querySelector('#error').content.querySelector('.error');
  var successMessage = document.querySelector('#success').content.querySelector('.success');

  var createMessage = function (evtType) {
    var template = successMessage;
    if (evtType === messageType.ERROR) {
      template = errorMessage;
    }

    var message = template.cloneNode(true);
    mainElement.appendChild(message);

    var button = message.querySelector('.success__button');
    if (evtType === 'error') {
      button = message.querySelector('.error__button');
    }

    var onButtonClick = function () {
      closeMessage();
    };

    var onMessageEscPress = function (evt) {
      window.util.isEscEvent(evt, closeMessage);
    };

    var onMessageClick = function (evt) {
      evt.preventDefault();
      evt.stopPropagation();
      if (evt.target === message) {
        closeMessage();
      }
    };

    var closeMessage = function () {
      mainElement.removeChild(message);

      button.removeEventListener('click', onButtonClick);
      document.removeEventListener('keydown', onMessageEscPress);
      message.removeEventListener('click', onMessageClick);
    };

    button.addEventListener('click', onButtonClick);
    document.addEventListener('keydown', onMessageEscPress);
    message.addEventListener('click', onMessageClick);
  };

  window.message = {
    createMessage: createMessage,
    messageType: messageType
  };
})();

