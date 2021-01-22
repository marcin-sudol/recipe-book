"use strict";

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var RecipeWindow = /*#__PURE__*/function () {
  function RecipeWindow(openEditorCallback, openDeleteCallback, saveRecipeCallback, updateTabIndexCallback) {
    _classCallCheck(this, RecipeWindow);

    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);
    this.slideIn = this.slideIn.bind(this);
    this.slideOut = this.slideOut.bind(this);
    this.fadeIn = this.fadeIn.bind(this);
    this.fadeOut = this.fadeOut.bind(this);
    this.display = this.display.bind(this);
    this.close = this.close.bind(this);
    this.clickedClose = this.clickedClose.bind(this);
    this.clickedEdit = this.clickedEdit.bind(this);
    this.clickedDelete = this.clickedDelete.bind(this);
    this.clickedLocalRating = this.clickedLocalRating.bind(this);
    this.hoverRatingOn = this.hoverRatingOn.bind(this);
    this.hoverRatingOff = this.hoverRatingOff.bind(this);
    this.recipeWindow = document.getElementById("recipe-window");
    this.recipeName = document.getElementById("recipe-name");
    this.ingredientsList = document.getElementById("ingredients-list");
    this.stepsList = document.getElementById("steps-list");
    this.recipeRatingButtons = [];

    for (var i = 1; i <= 5; i++) {
      this.recipeRatingButtons.push(document.getElementById("recipe-rating-" + i));
    }

    this.obj = "undefined";
    this.visible = false;
    this.changing = false;
    this.animationTime = 400;
    this.openEditorCallback = openEditorCallback;
    this.openDeleteCallback = openDeleteCallback;
    this.saveRecipeCallback = saveRecipeCallback;
    this.updateTabIndexCallback = updateTabIndexCallback;
    document.getElementById("recipe-close-button").onclick = this.clickedClose;
    document.getElementById("recipe-edit-button").onclick = this.clickedEdit;
    document.getElementById("recipe-delete-button").onclick = this.clickedDelete;

    var _iterator = _createForOfIteratorHelper(this.recipeRatingButtons),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var button = _step.value;
        button.onclick = this.clickedLocalRating;
        button.onmouseenter = this.hoverRatingOn;
        button.onmouseleave = this.hoverRatingOff;
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  }

  _createClass(RecipeWindow, [{
    key: "update",
    value: function update(obj) {
      var _this = this;

      var newItem;
      this.obj = obj;
      this.recipeName.innerHTML = this.obj.name;
      this.ingredientsList.innerHTML = "";
      this.obj.ingredients.split(",").forEach(function (ingredient) {
        newItem = document.createElement("li");
        newItem.className = "ingredients-item";
        newItem.textContent = ingredient;

        _this.ingredientsList.appendChild(newItem);
      });
      this.stepsList.innerHTML = "";
      this.obj.steps.forEach(function (step) {
        newItem = document.createElement("li");
        newItem.className = "steps-item";
        newItem.innerHTML = "<span class=\"step-name\">".concat(step.name, "</span>\n      <span class=\"step-time\">\n      <i class=\"far fa-clock\"></i> ").concat(step.time, " min.\n      </span>");

        _this.stepsList.appendChild(newItem);
      });
      this.updateLocalRating();
    }
  }, {
    key: "updateLocalRating",
    value: function updateLocalRating(style) {
      for (var i = 0; i < 5; i++) {
        this.recipeRatingButtons[i].classList.remove("checked");
      }

      if (this.obj.rating.hasOwnProperty("local")) {
        var localRating = parseInt(this.obj.rating.local);

        for (var _i = 0; _i < localRating; _i++) {
          var button = this.recipeRatingButtons[_i];
          button.classList.add("checked");

          if (style === "fade") {
            button.classList.remove("hovered");
            button.animate({
              transform: ["scale(1.4)", "scale(1.0)"],
              opacity: [0, 1]
            }, {
              duration: 600,
              easing: "ease-out"
            });
          }
        }
      }
    }
  }, {
    key: "show",
    value: function show(callback) {
      this.recipeWindow.style.display = "flex";
      this.visible = true;
      if (callback !== undefined) callback();
    }
  }, {
    key: "hide",
    value: function hide(callback) {
      this.recipeWindow.style.display = "none";
      this.visible = false;
      if (callback !== undefined) callback();
    }
  }, {
    key: "slideIn",
    value: function slideIn(callback) {
      var _this2 = this;

      this.recipeWindow.style.display = "flex";
      this.recipeWindow.animate({
        transform: ["translateX(-20vw)", "translateX(0px)"],
        opacity: [0, 1]
      }, {
        duration: this.animationTime,
        easing: "ease-out"
      }).finished.then(function () {
        _this2.show(callback);
      });
    }
  }, {
    key: "slideOut",
    value: function slideOut(callback) {
      var _this3 = this;

      this.recipeWindow.animate({
        transform: ["translateX(0px)", "translateX(-20vw)"],
        opacity: [1, 0]
      }, {
        duration: this.animationTime,
        easing: "ease-out"
      }).finished.then(function () {
        _this3.hide(callback);
      });
    }
  }, {
    key: "fadeIn",
    value: function fadeIn(callback) {
      var _this4 = this;

      this.recipeWindow.style.display = "flex";
      this.recipeWindow.animate({
        opacity: [0, 1]
      }, {
        duration: this.animationTime,
        easing: "ease-out"
      }).finished.then(function () {
        _this4.show(callback);
      });
    }
  }, {
    key: "fadeOut",
    value: function fadeOut(callback) {
      var _this5 = this;

      this.recipeWindow.animate({
        opacity: [1, 0]
      }, {
        duration: this.animationTime,
        easing: "ease-out"
      }).finished.then(function () {
        _this5.hide(callback);
      });
    }
  }, {
    key: "close",
    value: function close(styleOut) {
      var _this6 = this;

      if (this.visible) {
        var functionOut;
        if (styleOut === "fade") functionOut = this.fadeOut;else functionOut = this.slideOut;
        this.changing = true;
        functionOut();
        setTimeout(function () {
          _this6.changing = false;

          _this6.updateTabIndexCallback();
        }, this.animationTime);
      }
    }
  }, {
    key: "display",
    value: function display(obj, styleOut, styleIn) {
      var _this7 = this;

      if (!this.changing && (!this.visible || obj !== this.obj)) {
        this.changing = true;
        var functionOut, functionIn;
        if (styleOut === "no") functionOut = this.hide;else if (styleOut === "fade") functionOut = this.fadeOut;else functionOut = this.slideOut;
        if (styleIn === "no") functionIn = this.show;else if (styleIn === "fade") functionIn = this.fadeIn;else functionIn = this.slideIn; // if window not visible update recipe and display

        if (!this.visible) {
          this.update(obj);
          functionIn(function () {
            _this7.changing = false;

            _this7.updateTabIndexCallback();
          });
        } // if window visible and showing incorrect recipe
        // hide window, update recipe and show window
        else if (obj !== this.obj) {
            functionOut(function () {
              _this7.update(obj);

              functionIn(function () {
                _this7.changing = false;

                _this7.updateTabIndexCallback();
              });
            });
          }
      }
    }
  }, {
    key: "setTabIndex",
    value: function setTabIndex(tabIndex) {
      var buttons = this.recipeWindow.querySelectorAll("button");
      buttons.forEach(function (button) {
        button.setAttribute("tabindex", tabIndex);
      });
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
    key: "isVisible",
    value: function isVisible() {
      return this.visible;
    }
  }, {
    key: "clickedClose",
    value: function clickedClose() {
      this.close("slide");
    }
  }, {
    key: "clickedEdit",
    value: function clickedEdit() {
      this.openEditorCallback(this.obj);
    }
  }, {
    key: "clickedDelete",
    value: function clickedDelete() {
      this.openDeleteCallback(this.obj);
    }
  }, {
    key: "clickedLocalRating",
    value: function clickedLocalRating(event) {
      var button;
      var localRating;

      if (event.target.tagName === "BUTTON") {
        button = event.target;
      } else if (event.target.parentElement.tagName === "BUTTON") {
        button = event.target.parentElement;
      }

      if (button !== undefined) {
        localRating = parseInt(button.dataset.id);

        if (this.obj.rating.hasOwnProperty("local")) {
          this.obj.rating.sum -= this.obj.rating.local;
          this.obj.rating.sum += localRating;
          this.obj.rating.local = localRating;
        } else {
          this.obj.rating.sum += localRating;
          this.obj.rating.local = localRating;
          this.obj.rating.votes += 1;
        }

        this.updateLocalRating("fade");
        this.saveRecipeCallback(this.obj);
      }
    }
  }, {
    key: "hoverRatingOn",
    value: function hoverRatingOn(event) {
      var rating = event.target.dataset.id;

      for (var i = 0; i < rating; i++) {
        this.recipeRatingButtons[i].classList.add("hovered");
      }
    }
  }, {
    key: "hoverRatingOff",
    value: function hoverRatingOff(event) {
      var rating = event.target.dataset.id;

      for (var i = 0; i < rating; i++) {
        this.recipeRatingButtons[i].classList.remove("hovered");
      }
    }
  }]);

  return RecipeWindow;
}();