"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Bg = /*#__PURE__*/function () {
  function Bg(showNavCallback) {
    _classCallCheck(this, Bg);

    this.bg = document.getElementById("bg");
    this.menuButton = document.getElementById("bg-menu-button");
    this.menuButton.addEventListener("click", showNavCallback);
  }

  _createClass(Bg, [{
    key: "setTabIndex",
    value: function setTabIndex(tabIndex) {
      this.menuButton.setAttribute("tabindex", tabIndex);
    }
  }, {
    key: "enableTab",
    value: function enableTab() {
      this.setTabIndex("0");
    }
  }, {
    key: "disableTab",
    value: function disableTab() {
      this.setTabIndex("-1");
    }
  }, {
    key: "focus",
    value: function focus() {
      this.menuButton.focus();
    }
  }]);

  return Bg;
}();