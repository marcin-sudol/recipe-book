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

    // Saving callbacks
    this.openEditorCallback = openEditorCallback;
    this.openDeleteCallback = openDeleteCallback;
    this.saveRecipeCallback = saveRecipeCallback;
    this.updateTabIndexCallback = updateTabIndexCallback; // Setting DOM elements

    this.recipeWindow = document.getElementById("recipe-window");
    this.recipeName = document.getElementById("recipe-name");
    this.ingredientsList = document.getElementById("ingredients-list");
    this.stepsList = document.getElementById("steps-list");
    this.recipeRatingButtons = [];

    for (var i = 1; i <= 5; i++) {
      this.recipeRatingButtons.push(document.getElementById("recipe-rating-" + i));
    } // Settng additional properties


    this.obj = "undefined";
    this.visible = false;
    this.changing = false;
    this.animationTime = 400; // Binding methods

    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);
    this.slideIn = this.slideIn.bind(this);
    this.slideOut = this.slideOut.bind(this);
    this.fadeIn = this.fadeIn.bind(this);
    this.fadeOut = this.fadeOut.bind(this);
    this.clickedClose = this.clickedClose.bind(this);
    this.clickedEdit = this.clickedEdit.bind(this);
    this.clickedDelete = this.clickedDelete.bind(this);
    this.clickedLocalRating = this.clickedLocalRating.bind(this);
    this.hoverRatingOn = this.hoverRatingOn.bind(this);
    this.hoverRatingOff = this.hoverRatingOff.bind(this); // Adding events listeners

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
  } // ----------------------------------------------------------------
  // Managing visibility and displayed recipe
  // ----------------------------------------------------------------
  // Open window with given recipe (as object) and given animation style
  // if window already opened, first close window and update displayed recipe


  _createClass(RecipeWindow, [{
    key: "open",
    value: function open(obj, styleOut, styleIn) {
      var _this = this;

      if (!this.changing && (!this.visible || obj !== this.obj)) {
        this.changing = true;
        var functionOut, functionIn;
        if (styleOut === "no") functionOut = this.hide;else if (styleOut === "fade") functionOut = this.fadeOut;else functionOut = this.slideOut;
        if (styleIn === "no") functionIn = this.show;else if (styleIn === "fade") functionIn = this.fadeIn;else functionIn = this.slideIn; // if window not visible update recipe and display

        if (!this.visible) {
          this.update(obj);
          functionIn(function () {
            _this.changing = false;

            _this.updateTabIndexCallback();
          });
        } // if window visible and showing incorrect recipe
        // hide window, update recipe and show window
        else if (obj !== this.obj) {
            functionOut(function () {
              _this.update(obj);

              functionIn(function () {
                _this.changing = false;

                _this.updateTabIndexCallback();
              });
            });
          }
      }
    } // Close window with selected animation style

  }, {
    key: "close",
    value: function close(styleOut) {
      var _this2 = this;

      if (this.visible) {
        var functionOut;
        if (styleOut === "fade") functionOut = this.fadeOut;else functionOut = this.slideOut;
        this.changing = true;
        functionOut(function () {
          _this2.changing = false;

          _this2.updateTabIndexCallback();
        });
      }
    } // Update informations diplayed in window with passed object

  }, {
    key: "update",
    value: function update(obj) {
      var _this3 = this;

      var newItem;
      this.obj = obj;
      this.recipeName.innerHTML = this.obj.name;
      this.ingredientsList.innerHTML = "";
      this.obj.ingredients.split(",").forEach(function (ingredient) {
        if (ingredient) {
          newItem = document.createElement("li");
          newItem.className = "ingredients-item";
          newItem.textContent = ingredient;

          _this3.ingredientsList.appendChild(newItem);
        }
      });
      this.stepsList.innerHTML = "";
      this.obj.steps.forEach(function (step) {
        newItem = document.createElement("li");
        newItem.className = "steps-item";
        newItem.innerHTML = "<span class=\"step-name\">".concat(step.name, "</span>\n      <span class=\"step-time\">\n      <i class=\"far fa-clock\"></i> ").concat(step.time, " min.\n      </span>");

        _this3.stepsList.appendChild(newItem);
      });
      this.updateLocalRating();
    } // ----------------------------------------------------------------
    // Helper methods for visibility
    // ----------------------------------------------------------------
    // Animate window -> slide in and make visible

  }, {
    key: "slideIn",
    value: function slideIn(callback) {
      var _this4 = this;

      this.recipeWindow.style.display = "flex";
      this.recipeWindow.animate({
        transform: ["translateX(-20vw)", "translateX(0px)"],
        opacity: [0, 1]
      }, {
        duration: this.animationTime,
        easing: "ease-out"
      }).finished.then(function () {
        _this4.show(callback);
      });
    } // Animate window -> slide out and make hidden

  }, {
    key: "slideOut",
    value: function slideOut(callback) {
      var _this5 = this;

      this.recipeWindow.animate({
        transform: ["translateX(0px)", "translateX(-20vw)"],
        opacity: [1, 0]
      }, {
        duration: this.animationTime,
        easing: "ease-out"
      }).finished.then(function () {
        _this5.hide(callback);
      });
    } // Animate window -> fade in and make visible

  }, {
    key: "fadeIn",
    value: function fadeIn(callback) {
      var _this6 = this;

      this.recipeWindow.style.display = "flex";
      this.recipeWindow.animate({
        opacity: [0, 1]
      }, {
        duration: this.animationTime,
        easing: "ease-out"
      }).finished.then(function () {
        _this6.show(callback);
      });
    } // Animate window -> fade out and make visible

  }, {
    key: "fadeOut",
    value: function fadeOut(callback) {
      var _this7 = this;

      this.recipeWindow.animate({
        opacity: [1, 0]
      }, {
        duration: this.animationTime,
        easing: "ease-out"
      }).finished.then(function () {
        _this7.hide(callback);
      });
    } // Make window visible

  }, {
    key: "show",
    value: function show(callback) {
      this.recipeWindow.style.display = "flex";
      this.visible = true;
      this.recipeName.focus();
      if (callback !== undefined) callback();
    } // Make window hidden

  }, {
    key: "hide",
    value: function hide(callback) {
      this.recipeWindow.style.display = "none";
      this.visible = false;
      if (callback !== undefined) callback();
    } // Checks if window is visible

  }, {
    key: "isVisible",
    value: function isVisible() {
      return this.visible;
    } // ----------------------------------------------------------------
    // Managing tab interactions
    // ----------------------------------------------------------------
    // Enable interaction with tab key

  }, {
    key: "enableTab",
    value: function enableTab() {
      this.setTabIndex("0");
    } // Disable interaction with tab key

  }, {
    key: "disableTab",
    value: function disableTab() {
      this.setTabIndex("-1");
    } // Set tabindex for all interactive elements on component

  }, {
    key: "setTabIndex",
    value: function setTabIndex(tabIndex) {
      var buttons = this.recipeWindow.querySelectorAll("button");
      buttons.forEach(function (button) {
        button.setAttribute("tabindex", tabIndex);
      });
    } // ----------------------------------------------------------------
    // Event handlers
    // ----------------------------------------------------------------
    // Clicked close window

  }, {
    key: "clickedClose",
    value: function clickedClose() {
      this.close("slide");
    } // Clicked edit recipe

  }, {
    key: "clickedEdit",
    value: function clickedEdit() {
      this.openEditorCallback(this.obj);
    } // Clicked delete recipe

  }, {
    key: "clickedDelete",
    value: function clickedDelete() {
      this.openDeleteCallback(this.obj);
    } // Clicked on rating

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
    } // When mouse enters rating

  }, {
    key: "hoverRatingOn",
    value: function hoverRatingOn(event) {
      var rating = event.target.dataset.id;

      for (var i = 0; i < rating; i++) {
        this.recipeRatingButtons[i].classList.add("hovered");
      }
    } // When mouse leaves rating

  }, {
    key: "hoverRatingOff",
    value: function hoverRatingOff(event) {
      var rating = event.target.dataset.id;

      for (var i = 0; i < rating; i++) {
        this.recipeRatingButtons[i].classList.remove("hovered");
      }
    } // Update displayed rating to rating in stored obj

  }, {
    key: "updateLocalRating",
    value: function updateLocalRating(style) {
      for (var i = 0; i < 5; i++) {
        this.recipeRatingButtons[i].classList.remove("checked");
        this.recipeRatingButtons[i].setAttribute("aria-checked", false);
      }

      if (this.obj.rating.hasOwnProperty("local")) {
        var localRating = parseInt(this.obj.rating.local);
        this.recipeRatingButtons[localRating - 1].setAttribute("aria-checked", true);

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
  }]);

  return RecipeWindow;
}();