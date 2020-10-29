"use strict";

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// -------------------------------------------------------
// UTILITIES
// -------------------------------------------------------
var log = function log(str) {
  console.log(str);
}; // -------------------------------------------------------
// RECIPE ITEM
// -------------------------------------------------------


var RecipeItem = function RecipeItem(obj, action) {
  _classCallCheck(this, RecipeItem);

  this.element = document.createElement("li");
  this.element.className = "nav-item";
  this.element.id = "nav-item-" + obj.id;
  var button = document.createElement("button");
  button.className = "nav-item-button";
  button.type = "button";
  button.innerText = obj.name;

  button.onclick = function () {
    action(obj);
  };

  this.element.appendChild(button);
  var divRating = document.createElement("div");
  divRating.className = "nav-item-rating";
  divRating.innerText = (obj.rating.sum / obj.rating.votes).toFixed(1);
  this.element.appendChild(divRating);
  var divTooltip = document.createElement("div");
  divTooltip.className = "rating-tooltip";
  divTooltip.innerText = obj.rating.votes + " votes";
  divRating.appendChild(divTooltip);
}; // -------------------------------------------------------
// RECIPES LIST
// -------------------------------------------------------


var RecipesList = /*#__PURE__*/function () {
  function RecipesList(arr) {
    var _this = this;

    _classCallCheck(this, RecipesList);

    this.clickedOnItem = this.clickedOnItem.bind(this);
    this.arr = arr;
    this.element = document.getElementById("nav-list");
    this.recipeWindow = new RecipeWindow();
    this.arr.forEach(function (obj) {
      return _this.addRecipeToList(obj);
    });
    this.element.animate({
      opacity: [0, 1]
    }, {
      duration: 400,
      easing: "ease-out"
    });
  }

  _createClass(RecipesList, [{
    key: "addRecipeToArr",
    value: function addRecipeToArr(obj) {
      this.arr.push(obj);
    }
  }, {
    key: "addRecipeToList",
    value: function addRecipeToList(obj) {
      var item = new RecipeItem(obj, this.clickedOnItem);
      this.element.appendChild(item.element);
    }
  }, {
    key: "addRecipe",
    value: function addRecipe(obj) {
      this.addRecipeToArr(obj);
      this.addRecipeToList(obj);
    } // CONTINUE HERE

  }, {
    key: "deleteRecipe",
    value: function deleteRecipe(obj) {
      this.arr = this.arr.filter(function (item) {
        return item !== obj;
      });
    }
  }, {
    key: "clickedOnItem",
    value: function clickedOnItem(obj) {
      this.recipeWindow.display(obj);
    }
  }]);

  return RecipesList;
}(); // -------------------------------------------------------
// RECIPE WINDOW
// -------------------------------------------------------


var RecipeWindow = /*#__PURE__*/function () {
  function RecipeWindow() {
    _classCallCheck(this, RecipeWindow);

    this.close = this.close.bind(this);
    this.element = document.getElementById("recipe-window");
    this.obj = "undefined";
    this.visible = false;
    this.changing = false;
    this.animationTime = 400;
    document.getElementById("recipe-close-button").onclick = this.close;
  }

  _createClass(RecipeWindow, [{
    key: "update",
    value: function update(obj) {
      this.obj = obj; // UPDATE NAME

      var recipeName = document.getElementById("recipe-name");
      recipeName.innerHTML = this.obj.name; // UPDATE INGREDIENTS

      var ingredients = document.getElementById("ingredients-list");
      ingredients.innerHTML = "";
      this.obj.ingredients.split(",").forEach(function (ingredient) {
        var itemIngredient = document.createElement("li");
        itemIngredient.className = "ingredients-item";
        itemIngredient.innerText = ingredient;
        ingredients.appendChild(itemIngredient);
      }); // UPDATE STEPS

      var steps = document.getElementById("steps-list");
      steps.innerHTML = "";
      this.obj.steps.forEach(function (step) {
        var itemStep = document.createElement("li");
        itemStep.className = "steps-item";
        steps.appendChild(itemStep);
        var stepSpan = document.createElement("span");
        stepSpan.className = "step-name";
        stepSpan.innerText = step.name;
        itemStep.appendChild(stepSpan);
        var timeSpan = document.createElement("span");
        timeSpan.className = "step-time";
        itemStep.appendChild(timeSpan);
        var icon = document.createElement("i");
        icon.className = "far fa-clock";
        timeSpan.appendChild(icon);
        var timeText = document.createTextNode(" " + step.time + " min.");
        timeSpan.appendChild(timeText);
      });
    }
  }, {
    key: "slideIn",
    value: function slideIn() {
      var _this2 = this;

      this.element.style.display = "flex";
      this.element.animate({
        left: ["-30vw", "0px"],
        opacity: [0, 1]
      }, {
        duration: this.animationTime,
        easing: "ease-out"
      }).finished.then(function () {
        _this2.visible = true;
      });
    }
  }, {
    key: "slideOut",
    value: function slideOut() {
      var _this3 = this;

      this.element.animate({
        left: ["0px", "-30vw"],
        opacity: [1, 0]
      }, {
        duration: this.animationTime,
        easing: "ease-out"
      }).finished.then(function () {
        _this3.element.style.display = "none";
        _this3.visible = false;
      });
    }
  }, {
    key: "fadeIn",
    value: function fadeIn() {
      var _this4 = this;

      this.element.style.display = "flex";
      this.element.animate({
        opacity: [0, 1]
      }, {
        duration: this.animationTime,
        easing: "ease-out"
      }).finished.then(function () {
        _this4.visible = true;
      });
    }
  }, {
    key: "fadeOut",
    value: function fadeOut() {
      var _this5 = this;

      this.element.animate({
        opacity: [1, 0]
      }, {
        duration: this.animationTime,
        easing: "ease-out"
      }).finished.then(function () {
        _this5.element.style.display = "none";
        _this5.visible = false;
      });
    }
  }, {
    key: "close",
    value: function close() {
      var _this6 = this;

      if (this.visible) {
        this.changing = true;
        this.slideOut();
        setTimeout(function () {
          _this6.changing = false;
          _this6.visible = false;
        }, this.animationTime);
      }
    }
  }, {
    key: "display",
    value: function display(obj) {
      var _this7 = this;

      if (!this.changing && (!this.visible || obj !== this.obj)) {
        this.changing = true;

        if (!this.visible) {
          this.update(obj);
          this.slideIn();
          setTimeout(function () {
            _this7.changing = false;
            _this7.visible = true;
          }, this.animationTime);
        } else if (obj !== this.obj) {
          this.slideOut();
          setTimeout(function () {
            _this7.update(obj);

            _this7.slideIn();

            setTimeout(function () {
              _this7.changing = false;
              _this7.visible = true;
            }, _this7.animationTime);
          }, this.animationTime + 100);
        }
      }
    }
  }]);

  return RecipeWindow;
}(); // -------------------------------------------------------
// NAV
// -------------------------------------------------------


var Nav = /*#__PURE__*/function () {
  function Nav() {
    _classCallCheck(this, Nav);

    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);
    this.nav = document.getElementById("nav");
    this.bg = document.getElementById("nav-bg");
    this.navMenuButton = document.getElementById("nav-menu-button");
    this.bgMenuButton = document.getElementById("bg-menu-button");
    this.navMenuButton.onclick = this.hide;
    this.bgMenuButton.onclick = this.show;
  }

  _createClass(Nav, [{
    key: "show",
    value: function show() {
      this.nav.classList.remove("hidden");
      this.bg.classList.remove("collapsed");
    }
  }, {
    key: "hide",
    value: function hide() {
      this.nav.classList.add("hidden");
      this.bg.classList.add("collapsed");
    }
  }]);

  return Nav;
}();

var Popup = /*#__PURE__*/function () {
  function Popup() {
    _classCallCheck(this, Popup);
  }

  _createClass(Popup, [{
    key: "show",
    value: function show(name) {}
  }, {
    key: "hide",
    value: function hide() {}
  }]);

  return Popup;
}();

var Editor = /*#__PURE__*/function () {
  function Editor() {
    _classCallCheck(this, Editor);
  }

  _createClass(Editor, [{
    key: "addStep",
    value: function addStep() {}
  }, {
    key: "removeStep",
    value: function removeStep() {}
  }, {
    key: "clear",
    value: function clear() {}
  }]);

  return Editor;
}();

var initialLoading = function initialLoading(arr) {
  log("load");
  var recipesList = new RecipesList(arr);
  var nav = new Nav();
};

var recipes = [{
  id: 0,
  name: "Cookies",
  ingredients: "powder, sugar, milk, cocoa",
  steps: [{
    name: "Prepare dough",
    time: 15
  }, {
    name: "Form cookies",
    time: 15
  }, {
    name: "Cook",
    time: 45
  }],
  rating: {
    sum: 28,
    votes: 6
  }
}, {
  id: 1,
  name: "Soup",
  ingredients: "water, wegetables, pasta, potatos, mushrooms",
  steps: [{
    name: "Wash wegetables",
    time: 5
  }, {
    name: "Cut vegetables",
    time: 20
  }, {
    name: "Cook soup",
    time: 60
  }],
  rating: {
    sum: 45,
    votes: 12
  }
}, {
  id: 2,
  name: "Ice cream",
  ingredients: "milk, sugar, fruits",
  steps: [{
    name: "Prepare",
    time: 20
  }, {
    name: "Insert into freezer",
    time: 120
  }],
  rating: {
    sum: 17,
    votes: 5
  }
}];
window.addEventListener("load", function () {
  initialLoading(recipes);
});