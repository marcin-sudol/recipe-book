"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Nav = /*#__PURE__*/function () {
  function Nav(arr, displayRecipeCallback, openEditorCallback, resetRecipesCallback, updateTabIndexCallback) {
    _classCallCheck(this, Nav);

    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);
    this.clickedAddRecipe = this.clickedAddRecipe.bind(this);
    this.clickedDisplayRecipe = this.clickedDisplayRecipe.bind(this);
    this.clickedResetList = this.clickedResetList.bind(this);
    this.showTooltip = this.showTooltip.bind(this);
    this.hideTooltip = this.hideTooltip.bind(this);
    this.nav = document.getElementById("nav");
    this.navList = document.getElementById("nav-list");
    this.navMenuButton = document.getElementById("nav-menu-button");
    this.bgMenuButton = document.getElementById("bg-menu-button");
    this.recipeWindow = document.getElementById("recipe-window");
    this.displayRecipeCallback = displayRecipeCallback;
    this.openEditorCallback = openEditorCallback;
    this.resetRecipesCallback = resetRecipesCallback;
    this.updateTabIndexCallback = updateTabIndexCallback;
    this.navMenuButton.onclick = this.hide;
    document.getElementById("nav-add-button").onclick = this.clickedAddRecipe;
    document.getElementById("nav-reset-button").onclick = this.clickedResetList;
    this.addList(arr, "fade");
  }

  _createClass(Nav, [{
    key: "show",
    value: function show() {
      this.nav.classList.remove("hidden");
      this.recipeWindow.classList.add("narrower");
      this.updateTabIndexCallback();
      this.navMenuButton.focus();
    }
  }, {
    key: "hide",
    value: function hide() {
      this.nav.classList.add("hidden");
      this.recipeWindow.classList.remove("narrower");
      this.updateTabIndexCallback();
      this.bgMenuButton.focus();
    }
  }, {
    key: "setTabIndex",
    value: function setTabIndex(tabIndex) {
      var buttons = this.nav.querySelectorAll("button");
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
      return !this.nav.classList.contains("hidden");
    }
  }, {
    key: "getRating",
    value: function getRating(obj) {
      var rating;
      if (obj.rating.votes > 0) rating = (obj.rating.sum / obj.rating.votes).toFixed(1);else rating = "-";
      return rating;
    }
  }, {
    key: "addItem",
    value: function addItem(obj) {
      var item = document.createElement("li");
      item.className = "nav-item";
      item.id = "nav-item-" + obj.id;
      item.dataset.id = obj.id;
      item.innerHTML = "<button class=\"nav-item-button\" type=\"button\">".concat(obj.name, "</button>\n    <div class=\"nav-item-rating\"><span class=\"rating-value\">").concat(this.getRating(obj), "</span><div class=\"rating-tooltip\">").concat(obj.rating.votes, " votes</div>\n    </div>");
      this.navList.appendChild(item);
      item.querySelector(".nav-item-button").onclick = this.clickedDisplayRecipe;
      item.querySelector(".nav-item-rating").onmouseenter = this.showTooltip;
      item.querySelector(".nav-item-rating").onmouseleave = this.hideTooltip;
    }
  }, {
    key: "updateItem",
    value: function updateItem(obj) {
      var item = document.getElementById("nav-item-" + obj.id);
      item.querySelector(".nav-item-button").textContent = obj.name;
      item.querySelector(".rating-value").textContent = this.getRating(obj);
      item.querySelector(".rating-tooltip").textContent = obj.rating.votes + " votes";
    }
  }, {
    key: "removeItem",
    value: function removeItem(obj) {
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
      });
    }
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
    }
  }, {
    key: "clearList",
    value: function clearList() {
      while (this.navList.childElementCount > 0) {
        this.navList.removeChild(this.navList.lastElementChild);
      }
    }
  }, {
    key: "updateList",
    value: function updateList(arr, styleIn) {
      this.clearList();
      this.addList(arr, styleIn);
    }
  }, {
    key: "clickedAddRecipe",
    value: function clickedAddRecipe() {
      this.openEditorCallback();
    }
  }, {
    key: "clickedDisplayRecipe",
    value: function clickedDisplayRecipe(event) {
      var id = parseInt(event.target.parentElement.dataset.id);
      this.displayRecipeCallback(id);
    }
  }, {
    key: "clickedResetList",
    value: function clickedResetList() {
      this.resetRecipesCallback();
    }
  }, {
    key: "showTooltip",
    value: function showTooltip(event) {
      var tooltip = event.target.querySelector(".rating-tooltip");
      var targetRect = event.target.getBoundingClientRect();
      tooltip.classList.add("visible");
      tooltip.style.left = targetRect.left - tooltip.clientWidth + 10 + "px";
      tooltip.style.top = targetRect.bottom - 25 + "px";
    }
  }, {
    key: "hideTooltip",
    value: function hideTooltip(event) {
      var tooltip = event.target.querySelector(".rating-tooltip");
      tooltip.classList.remove("visible");
    }
  }]);

  return Nav;
}();