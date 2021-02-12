"use strict";

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var RecipeRating = /*#__PURE__*/function () {
  function RecipeRating(saveRatingCallback) {
    _classCallCheck(this, RecipeRating);

    // Saving callbacks
    this.saveRatingCallback = saveRatingCallback; // Setting DOM elements

    this.ratingContainer = document.getElementById("recipe-rating-container");
    this.ratingButtons = [];

    for (var i = 1; i <= 5; i++) {
      this.ratingButtons.push(document.getElementById("recipe-rating-" + i));
    } // Binding methods


    this.clickedRating = this.clickedRating.bind(this);
    this.hoverRatingOn = this.hoverRatingOn.bind(this);
    this.hoverRatingOff = this.hoverRatingOff.bind(this);
    this.keyDown = this.keyDown.bind(this); // Setting additional properties

    this.currentRating = 0;
    this._selectedItem = 0; // Adding events listeners

    var _iterator = _createForOfIteratorHelper(this.ratingButtons),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var button = _step.value;
        button.onclick = this.clickedRating;
        button.onmouseenter = this.hoverRatingOn;
        button.onmouseleave = this.hoverRatingOff;
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }

    this.ratingContainer.onkeydown = this.keyDown;
  } // ----------------------------------------------------------------
  // Updating rating
  // ----------------------------------------------------------------
  // Update displayed and stored rating to given value


  _createClass(RecipeRating, [{
    key: "update",
    value: function update(newRating, style) {
      this.currentRating = newRating;

      for (var i = 0; i < 5; i++) {
        this.ratingButtons[i].classList.remove("checked");
        this.ratingButtons[i].setAttribute("aria-checked", false);
      }

      if (newRating > 0) {
        this.ratingButtons[newRating - 1].setAttribute("aria-checked", true);

        for (var _i = 0; _i < newRating; _i++) {
          var button = this.ratingButtons[_i];
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
    } // ----------------------------------------------------------------
    // Managing interactions with tab key
    // ----------------------------------------------------------------
    // Enable interaction with tab key

  }, {
    key: "enableTab",
    value: function enableTab() {
      // enabling tab key resets the selected item to current rating
      this.selectedItem = this.currentRating > 0 ? this.currentRating - 1 : 0;
    } // Disable interaction with tab key

  }, {
    key: "disableTab",
    value: function disableTab() {
      this.setTabIndex("-1");
    } // Getter for selected item (for roving tabindex)

  }, {
    key: "setTabIndex",
    // Set tabindex for all interactive elements on component
    value: function setTabIndex(tabIndex) {
      this.ratingButtons.forEach(function (b) {
        b.tabIndex = tabIndex;
      });
    } // ----------------------------------------------------------------
    // Event handlers
    // ----------------------------------------------------------------
    // Clicked on rating

  }, {
    key: "clickedRating",
    value: function clickedRating(event) {
      var button;

      if (event.target.tagName === "BUTTON") {
        button = event.target;
      } else if (event.target.parentElement.tagName === "BUTTON") {
        button = event.target.parentElement;
      }

      if (button !== undefined) {
        var newRating = parseInt(button.dataset.id);
        this.update(newRating, "fade");
        this.saveRatingCallback(newRating);
      }
    } // When mouse enters rating

  }, {
    key: "hoverRatingOn",
    value: function hoverRatingOn(event) {
      var rating = event.target.dataset.id;

      for (var i = 0; i < rating; i++) {
        this.ratingButtons[i].classList.add("hovered");
      }
    } // When mouse leaves rating

  }, {
    key: "hoverRatingOff",
    value: function hoverRatingOff(event) {
      var rating = event.target.dataset.id;

      for (var i = 0; i < rating; i++) {
        this.ratingButtons[i].classList.remove("hovered");
      }
    } // When pressed arrow on rating

  }, {
    key: "keyDown",
    value: function keyDown(event) {
      if (event.code === KEY_LEFT || event.code === KEY_UP) {
        event.preventDefault();

        if (this.selectedItem <= 0) {
          this.selectedItem = 4;
        } else {
          this.selectedItem--;
        }

        this.focusOnSelectedItem();
      } else if (event.code === KEY_RIGHT || event.code === KEY_DOWN) {
        event.preventDefault();

        if (this.selectedItem >= 4) {
          this.selectedItem = 0;
        } else {
          this.selectedItem++;
        }

        this.focusOnSelectedItem();
      }
    } // ----------------------------------------------------------------
    // Helper functions
    // ----------------------------------------------------------------

  }, {
    key: "focusOnSelectedItem",
    value: function focusOnSelectedItem() {
      this.ratingButtons[this.selectedItem].focus();
    }
  }, {
    key: "selectedItem",
    get: function get() {
      return this._selectedItem;
    } // Setter for selected item (for roving tabindex)
    ,
    set: function set(i) {
      if (i >= 0 && i < 5) {
        this.setTabIndex("-1");
        this.ratingButtons[i].tabIndex = "0";
        this._selectedItem = i;
      }
    }
  }]);

  return RecipeRating;
}();