"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Message = /*#__PURE__*/function () {
  function Message() {
    _classCallCheck(this, Message);

    this.messageContainer = document.getElementById("message-container");
    this.messageTxt = document.getElementById("message-txt");
  }

  _createClass(Message, [{
    key: "displayMessage",
    value: function displayMessage(message) {
      var _this = this;

      this.messageTxt.textContent = message;
      this.messageContainer.style.display = "block";
      this.messageContainer.animate([{
        top: "-2em",
        opacity: "0"
      }, {
        top: "1em",
        opacity: "1"
      }], {
        duration: 400
      }).finished.then(function () {
        _this.messageContainer.style.top = "1em";
        setTimeout(function () {
          _this.messageContainer.animate([{
            right: "1em",
            opacity: "1"
          }, {
            right: "-10em",
            opacity: "0"
          }], {
            duration: 400
          }).finished.then(function () {
            _this.messageContainer.style.display = "none";
            _this.messageContainer.style.top = "-10em";
          });
        }, 1500);
      });
    }
  }]);

  return Message;
}();