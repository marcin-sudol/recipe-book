"use strict";

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
    this.stepsList = document.getElementById("steps-list"); // Binding methods

    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this.slideIn = this.slideIn.bind(this);
    this.slideOut = this.slideOut.bind(this);
    this.fadeIn = this.fadeIn.bind(this);
    this.fadeOut = this.fadeOut.bind(this);
    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);
    this.clickedClose = this.clickedClose.bind(this);
    this.clickedEdit = this.clickedEdit.bind(this);
    this.clickedDelete = this.clickedDelete.bind(this);
    this.saveRating = this.saveRating.bind(this); // Setting additional properties

    this.obj = undefined;
    this.rating = new RecipeRating(this.saveRating);
    this.visible = false;
    this.changing = false;
    this.animationTime = 400; // Adding events listeners

    document.getElementById("recipe-close-button").onclick = this.clickedClose;
    document.getElementById("recipe-edit-button").onclick = this.clickedEdit;
    document.getElementById("recipe-delete-button").onclick = this.clickedDelete;
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
      this.rating.update();
      var itemRating = this.obj.rating.hasOwnProperty("local") ? this.obj.rating.local : 0;
      this.rating.update(itemRating, "no");
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
    // Saving rating to recipe
    // ----------------------------------------------------------------

  }, {
    key: "saveRating",
    value: function saveRating(rating) {
      if (this.obj.rating.hasOwnProperty("local")) {
        // existing rating modified
        this.obj.rating.sum -= this.obj.rating.local;
        this.obj.rating.sum += rating;
        this.obj.rating.local = rating;
      } else {
        // new rating added
        this.obj.rating.sum += rating;
        this.obj.rating.local = rating;
        this.obj.rating.votes += 1;
      }

      this.saveRecipeCallback(this.obj);
    } // ----------------------------------------------------------------
    // Managing interactions with tab key
    // ----------------------------------------------------------------
    // Enable interaction with tab key

  }, {
    key: "enableTab",
    value: function enableTab() {
      this.setTabIndex("0");
      this.rating.enableTab();
    } // Disable interaction with tab key

  }, {
    key: "disableTab",
    value: function disableTab() {
      this.setTabIndex("-1");
      this.rating.disableTab();
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
    }
  }]);

  return RecipeWindow;
}();