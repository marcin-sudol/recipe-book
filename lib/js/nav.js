"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// Constants for keyboard codes
var CODE_LEFT = "ArrowLeft";
var CODE_RIGHT = "ArrowRight";
var CODE_UP = "ArrowUp";
var CODE_DOWN = "ArrowDown";

var Nav = /*#__PURE__*/function () {
  function Nav(arr, displayRecipeCallback, openEditorCallback, resetRecipesCallback, updateTabIndexCallback) {
    _classCallCheck(this, Nav);

    // Saving callbacks
    this.displayRecipeCallback = displayRecipeCallback;
    this.openEditorCallback = openEditorCallback;
    this.resetRecipesCallback = resetRecipesCallback;
    this.updateTabIndexCallback = updateTabIndexCallback; // Setting DOM elements

    this.nav = document.getElementById("nav");
    this.navList = document.getElementById("nav-list");
    this.navMenuButton = document.getElementById("nav-menu-button");
    this.bgMenuButton = document.getElementById("bg-menu-button");
    this.recipeWindow = document.getElementById("recipe-window"); // Setting additional properties

    this._selectedItem = 0;
    this.itemsCounter = 0; // Binding methods

    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);
    this.clickedAddRecipe = this.clickedAddRecipe.bind(this);
    this.clickedDisplayRecipe = this.clickedDisplayRecipe.bind(this);
    this.clickedResetList = this.clickedResetList.bind(this);
    this.keyPressedOnNavList = this.keyPressedOnNavList.bind(this);
    this.showTooltip = this.showTooltip.bind(this);
    this.hideTooltip = this.hideTooltip.bind(this); // Adding events listeners

    this.navMenuButton.onclick = this.hide;
    document.getElementById("nav-add-button").onclick = this.clickedAddRecipe;
    document.getElementById("nav-reset-button").onclick = this.clickedResetList;
    this.navList.onkeydown = this.keyPressedOnNavList; // Initializing item list with array

    this.addList(arr, "fade");
  } // ----------------------------------------------------------------
  // Managing nav's visibility
  // ----------------------------------------------------------------
  // Show nav


  _createClass(Nav, [{
    key: "show",
    value: function show() {
      this.nav.classList.remove("hidden");
      this.recipeWindow.classList.add("narrower");
      this.updateTabIndexCallback();
      this.navMenuButton.focus();
    } // Hide nav

  }, {
    key: "hide",
    value: function hide() {
      this.nav.classList.add("hidden");
      this.recipeWindow.classList.remove("narrower");
      this.updateTabIndexCallback();
      this.bgMenuButton.focus();
    } // Check if nav is visible

  }, {
    key: "isVisible",
    value: function isVisible() {
      return !this.nav.classList.contains("hidden");
    } // ----------------------------------------------------------------
    // Managing list items
    // ----------------------------------------------------------------
    // Add items from array to nav list (without removing previous items)

  }, {
    key: "addList",
    value: function addList(arr, styleIn) {
      var _this = this;

      arr.forEach(function (obj) {
        return _this.addItem(obj);
      });

      if (styleIn === "fade") {
        this.navList.animate({
          opacity: [0, 1]
        }, {
          duration: 400,
          easing: "ease-out"
        });
      }

      this.selectedItem = 0;
    } // Remove all items from nav list

  }, {
    key: "clearList",
    value: function clearList() {
      while (this.navList.childElementCount > 0) {
        this.navList.removeChild(this.navList.lastElementChild);
      }

      this.itemsCounter = 0;
    } // Fill nav list with items from array (with removing previous items)

  }, {
    key: "updateList",
    value: function updateList(arr, styleIn) {
      this.clearList();
      this.addList(arr, styleIn);
    } // Add single item to nav list

  }, {
    key: "addItem",
    value: function addItem(obj) {
      var item = document.createElement("li");
      item.className = "nav-item";
      item.id = "nav-item-" + obj.id;
      item.dataset.id = obj.id;
      item.innerHTML = "<button class=\"nav-item-button\" type=\"button\" tabindex=\"-1\">".concat(obj.name, "</button>\n    <div class=\"nav-item-rating\"><span class=\"rating-value\">").concat(this.getRating(obj), "</span><div class=\"rating-tooltip\">").concat(obj.rating.votes, " votes</div>\n    </div>");
      this.navList.appendChild(item);
      item.querySelector(".nav-item-button").onclick = this.clickedDisplayRecipe;
      item.querySelector(".nav-item-rating").onmouseenter = this.showTooltip;
      item.querySelector(".nav-item-rating").onmouseleave = this.hideTooltip;
      this.itemsCounter++;
      this.selectedItem = this.itemsCounter - 1;
    } // Update item's name and rating on nav list

  }, {
    key: "updateItem",
    value: function updateItem(obj) {
      var item = document.getElementById("nav-item-" + obj.id);
      item.querySelector(".nav-item-button").textContent = obj.name;
      item.querySelector(".rating-value").textContent = this.getRating(obj);
      item.querySelector(".rating-tooltip").textContent = obj.rating.votes + " votes";
    } // Remove single item from nav list

  }, {
    key: "removeItem",
    value: function removeItem(obj) {
      var _this2 = this;

      var item = document.getElementById("nav-item-" + obj.id);
      item.animate([{
        opacity: 1
      }, {
        opacity: 0,
        maxHeight: "50px",
        marginBottom: "20px"
      }, {
        opacity: 0,
        maxHeight: "0px",
        marginBottom: "0px"
      }], {
        duration: 400
      }).finished.then(function () {
        item.remove();
        _this2.itemsCounter--;
        _this2.selectedItem = 0;
      });
    } // ----------------------------------------------------------------
    // Managing tab interactions
    // ----------------------------------------------------------------
    // Enable interaction with tab key

  }, {
    key: "enableTab",
    value: function enableTab() {
      this.setTabIndex("0"); // Setting selected item to itself will also change item's button's tabindex to 0.

      this.selectedItem = this.selectedItem;
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
      var buttons = this.nav.querySelectorAll("button");
      buttons.forEach(function (button) {
        button.setAttribute("tabindex", tabIndex);
      });
    } // ----------------------------------------------------------------
    // Event handlers
    // ----------------------------------------------------------------
    // Clicked add new recipe

  }, {
    key: "clickedAddRecipe",
    value: function clickedAddRecipe() {
      this.openEditorCallback();
    } // Clicked recipe on a list

  }, {
    key: "clickedDisplayRecipe",
    value: function clickedDisplayRecipe(event) {
      var id = parseInt(event.target.parentElement.dataset.id);
      this.displayRecipeCallback(id);
    } // Clicked reset list

  }, {
    key: "clickedResetList",
    value: function clickedResetList() {
      this.resetRecipesCallback();
    } // When mouse enters rating

  }, {
    key: "showTooltip",
    value: function showTooltip(event) {
      var tooltip = event.target.querySelector(".rating-tooltip");
      var targetRect = event.target.getBoundingClientRect();
      tooltip.classList.add("visible");
      tooltip.style.left = targetRect.left - tooltip.clientWidth + 10 + "px";
      tooltip.style.top = targetRect.bottom - 25 + "px";
    } // When mouse leaves rating

  }, {
    key: "hideTooltip",
    value: function hideTooltip(event) {
      var tooltip = event.target.querySelector(".rating-tooltip");
      tooltip.classList.remove("visible");
    } // When pressed arrow on nav list

  }, {
    key: "keyPressedOnNavList",
    value: function keyPressedOnNavList(e) {
      if (this.itemsCounter > 0) {
        if (e.code === CODE_LEFT || e.code === CODE_UP) {
          e.preventDefault();

          if (this.selectedItem <= 0) {
            this.selectedItem = this.itemsCounter - 1;
          } else {
            this.selectedItem--;
          }

          this.focusOnSelectedItem();
        } else if (e.code === CODE_RIGHT || e.code === CODE_DOWN) {
          e.preventDefault();

          if (this.selectedItem >= this.itemsCounter - 1) {
            this.selectedItem = 0;
          } else {
            this.selectedItem++;
          }

          this.focusOnSelectedItem();
        }
      }
    } // ----------------------------------------------------------------
    // Helper functions
    // ----------------------------------------------------------------
    // Return recipe's rating in format for displaying

  }, {
    key: "getRating",
    value: function getRating(obj) {
      var rating;
      if (obj.rating.votes > 0) rating = (obj.rating.sum / obj.rating.votes).toFixed(1);else rating = "-";
      return rating;
    }
  }, {
    key: "focusOnSelectedItem",
    value: function focusOnSelectedItem() {
      Array.from(this.navList.querySelectorAll(".nav-item-button"))[this.selectedItem].focus();
    }
  }, {
    key: "selectedItem",
    get: function get() {
      return this._selectedItem;
    } // Setter for selected item (for roving tabindex)
    ,
    set: function set(i) {
      var buttons = Array.from(this.navList.querySelectorAll(".nav-item-button"));

      if (i >= 0 && i < buttons.length) {
        buttons.forEach(function (b) {
          b.tabIndex = "-1";
        });
        buttons[i].tabIndex = "0";
        this._selectedItem = i;
      }
    }
  }]);

  return Nav;
}();