"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Message = /*#__PURE__*/function () {
  function Message() {
    _classCallCheck(this, Message);

    this.messageTemplate = document.getElementById("message-template");
    this.nextId = 0;
  }

  _createClass(Message, [{
    key: "getNextId",
    value: function getNextId() {
      var nextId = this.nextId;
      this.nextId++;
      return nextId;
    }
  }, {
    key: "displayMessage",
    value: function displayMessage(message) {
      var dataId = this.getNextId(); // creates document fragment;

      var messageFragment = this.messageTemplate.content.cloneNode(true);
      messageFragment.querySelector(".message-container").dataset.id = dataId;
      messageFragment.querySelector(".message-txt").textContent = message; // append fragment's content into dom

      document.body.appendChild(messageFragment); // find added element and animate it

      var messageElement = document.querySelector(".message-container[data-id=\"".concat(dataId, "\"]"));
      messageElement.animate([{
        top: "-2em",
        opacity: "0"
      }, {
        top: "1em",
        opacity: "1"
      }], {
        duration: 400
      }).finished.then(function () {
        setTimeout(function () {
          messageElement.animate([{
            right: "1em",
            opacity: "1"
          }, {
            right: "-10em",
            opacity: "0"
          }], {
            duration: 400
          }).finished.then(function () {
            document.body.removeChild(messageElement);
          });
        }, 1500);
      });
    }
  }]);

  return Message;
}();