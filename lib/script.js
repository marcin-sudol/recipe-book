"use strict";

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// -------------------------------------------------------
// UTILITIES
// -------------------------------------------------------
function log(str) {
  console.log(str);
} // -------------------------------------------------------
// RECIPE ITEM
// -------------------------------------------------------


var RecipeItem = function RecipeItem(obj, displayCallback) {
  _classCallCheck(this, RecipeItem);

  this.element = document.createElement("li");
  this.element.className = "nav-item";
  this.element.id = "nav-item-" + obj.id;
  var button = document.createElement("button");
  button.className = "nav-item-button";
  button.type = "button";
  button.innerText = obj.name;

  button.onclick = function () {
    displayCallback(obj);
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
// RECIPE WINDOW
// -------------------------------------------------------


var RecipeWindow = /*#__PURE__*/function () {
  function RecipeWindow(editorCallback, deleteCallback) {
    _classCallCheck(this, RecipeWindow);

    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this.openEditorToEdit = this.openEditorToEdit.bind(this);
    this.openDelete = this.openDelete.bind(this);
    this.element = document.getElementById("recipe-window");
    this.obj = "undefined";
    this.visible = false;
    this.changing = false;
    this.animationTime = 400;
    this.editorCallback = editorCallback;
    this.deleteCallback = deleteCallback;
    document.getElementById("recipe-close-button").onclick = this.close;
    document.getElementById("recipe-edit-button").onclick = this.openEditorToEdit;
    document.getElementById("recipe-delete-button").onclick = this.openDelete;
  }

  _createClass(RecipeWindow, [{
    key: "update",
    value: function update(obj) {
      this.obj = obj;
      var recipeName = document.getElementById("recipe-name");
      recipeName.innerHTML = this.obj.name;
      var ingredients = document.getElementById("ingredients-list");
      ingredients.innerHTML = "";
      this.obj.ingredients.split(",").forEach(function (ingredient) {
        var itemIngredient = document.createElement("li");
        itemIngredient.className = "ingredients-item";
        itemIngredient.innerText = ingredient;
        ingredients.appendChild(itemIngredient);
      });
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
      var _this = this;

      this.element.style.display = "flex";
      this.element.animate({
        left: ["-30vw", "0px"],
        opacity: [0, 1]
      }, {
        duration: this.animationTime,
        easing: "ease-out"
      }).finished.then(function () {
        _this.visible = true;
      });
    }
  }, {
    key: "slideOut",
    value: function slideOut() {
      var _this2 = this;

      this.element.animate({
        left: ["0px", "-30vw"],
        opacity: [1, 0]
      }, {
        duration: this.animationTime,
        easing: "ease-out"
      }).finished.then(function () {
        _this2.element.style.display = "none";
        _this2.visible = false;
      });
    }
  }, {
    key: "fadeIn",
    value: function fadeIn() {
      var _this3 = this;

      this.element.style.display = "flex";
      this.element.animate({
        opacity: [0, 1]
      }, {
        duration: this.animationTime,
        easing: "ease-out"
      }).finished.then(function () {
        _this3.visible = true;
      });
    }
  }, {
    key: "fadeOut",
    value: function fadeOut() {
      var _this4 = this;

      this.element.animate({
        opacity: [1, 0]
      }, {
        duration: this.animationTime,
        easing: "ease-out"
      }).finished.then(function () {
        _this4.element.style.display = "none";
        _this4.visible = false;
      });
    }
  }, {
    key: "close",
    value: function close() {
      var _this5 = this;

      if (this.visible) {
        this.changing = true;
        this.slideOut();
        setTimeout(function () {
          _this5.changing = false;
          _this5.visible = false;
        }, this.animationTime);
      }
    }
  }, {
    key: "open",
    value: function open(obj) {
      var _this6 = this;

      if (!this.changing && (!this.visible || obj !== this.obj)) {
        this.changing = true;

        if (!this.visible) {
          this.update(obj);
          this.slideIn();
          setTimeout(function () {
            _this6.changing = false;
            _this6.visible = true;
          }, this.animationTime);
        } else if (obj !== this.obj) {
          this.slideOut();
          setTimeout(function () {
            _this6.update(obj);

            _this6.slideIn();

            setTimeout(function () {
              _this6.changing = false;
              _this6.visible = true;
            }, _this6.animationTime);
          }, this.animationTime + 100);
        }
      }
    }
  }, {
    key: "openEditorToEdit",
    value: function openEditorToEdit() {
      this.editorCallback(this.obj);
    }
  }, {
    key: "openDelete",
    value: function openDelete() {
      this.deleteCallback(this.obj);
    }
  }]);

  return RecipeWindow;
}(); // -------------------------------------------------------
// NAV
// -------------------------------------------------------


var Nav = /*#__PURE__*/function () {
  function Nav(addCallback) {
    _classCallCheck(this, Nav);

    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);
    this.openEditorToAdd = this.openEditorToAdd.bind(this);
    this.nav = document.getElementById("nav");
    this.bg = document.getElementById("nav-bg");
    this.addCallback = addCallback;
    document.getElementById("nav-menu-button").onclick = this.hide;
    document.getElementById("bg-menu-button").onclick = this.show;
    document.getElementById("nav-add-button").onclick = this.openEditorToAdd;
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
  }, {
    key: "openEditorToAdd",
    value: function openEditorToAdd() {
      this.addCallback();
    }
  }]);

  return Nav;
}(); // -------------------------------------------------------
// RECIPE APP
// -------------------------------------------------------


var RecipeApp = /*#__PURE__*/function () {
  function RecipeApp(arr) {
    var _this7 = this;

    _classCallCheck(this, RecipeApp);

    this.deleteRecipe = this.deleteRecipe.bind(this);
    this.arr = arr;
    this.elemList = document.getElementById("nav-list");
    this.popups = new Popups(this.deleteRecipe);
    this.nav = new Nav(this.popups.openEditorToAdd);
    this.recipeWindow = new RecipeWindow(this.popups.openEditorToEdit, this.popups.openDelete);
    this.arr.forEach(function (obj) {
      return _this7.addRecipeToList(obj);
    });
    this.elemList.animate({
      opacity: [0, 1]
    }, {
      duration: 400,
      easing: "ease-out"
    });
  }

  _createClass(RecipeApp, [{
    key: "addRecipeToArr",
    value: function addRecipeToArr(obj) {
      this.arr.push(obj);
    }
  }, {
    key: "addRecipeToList",
    value: function addRecipeToList(obj) {
      var item = new RecipeItem(obj, this.recipeWindow.open);
      this.elemList.appendChild(item.element);
    }
  }, {
    key: "addRecipe",
    value: function addRecipe(obj) {
      this.addRecipeToArr(obj);
      this.addRecipeToList(obj);
    }
  }, {
    key: "deleteRecipe",
    value: function deleteRecipe(obj) {
      this.arr = this.arr.filter(function (item) {
        return item !== obj;
      });
      this.popups.close();
      this.recipeWindow.close();
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
  }]);

  return RecipeApp;
}(); // -------------------------------------------------------
// POPUPS
// -------------------------------------------------------


var Popups = /*#__PURE__*/function () {
  function Popups(deleteCallback) {
    _classCallCheck(this, Popups);

    this.openEditorToAdd = this.openEditorToAdd.bind(this);
    this.openEditorToEdit = this.openEditorToEdit.bind(this);
    this.openDelete = this.openDelete.bind(this);
    this.close = this.close.bind(this);
    this.confirmDelete = this.confirmDelete.bind(this);
    this.addStepToEditor = this.addStepToEditor.bind(this);
    this.removeStepFromEditor = this.removeStepFromEditor.bind(this);
    this.clearEditor = this.clearEditor.bind(this);
    this.element = document.getElementById("popup");
    this.editorElement = document.getElementById("popup-edit");
    this.deleteElement = document.getElementById("popup-delete");
    this.stepsElement = document.getElementById("input-steps-list");
    this.obj = undefined;
    this.deleteCallback = deleteCallback;
    document.getElementById("add-step-button").onclick = this.addStepToEditor;
    document.getElementById("remove-step-button").onclick = this.removeStepFromEditor;
    document.getElementById("edit-clear-button").onclick = this.clearEditor;
    document.getElementById("edit-cancel-button").onclick = this.close;
    document.getElementById("delete-ok-button").onclick = this.confirmDelete;
    document.getElementById("delete-cancel-button").onclick = this.close;
    this.addStepToEditor();
  }

  _createClass(Popups, [{
    key: "open",
    value: function open(elem) {
      if (popup != null) {
        this.element.classList.add("popup-visible");
        elem.style.display = "block";
        elem.animate({
          opacity: [0, 1],
          transform: ["translateY(-200px)", "translateY(0px)"]
        }, {
          duration: 400,
          easing: "ease-out"
        });
      }
    }
  }, {
    key: "openEditorToAdd",
    value: function openEditorToAdd() {
      this.clearEditor();
      this.open(this.editorElement);
    }
  }, {
    key: "openEditorToEdit",
    value: function openEditorToEdit(obj) {
      this.obj = obj;
      this.loadEditor();
      this.open(this.editorElement);
    }
  }, {
    key: "openDelete",
    value: function openDelete(obj) {
      this.obj = obj;
      this.open(this.deleteElement);
    }
  }, {
    key: "close",
    value: function close() {
      this.obj = undefined;
      this.element.classList.remove("popup-visible");
      this.editorElement.style.display = "none";
      this.deleteElement.style.display = "none";
    } // continue here

  }, {
    key: "confirmEdit",
    value: function confirmEdit() {}
  }, {
    key: "confirmDelete",
    value: function confirmDelete() {
      this.deleteCallback(this.obj);
    }
  }, {
    key: "addStepToEditor",
    value: function addStepToEditor() {
      var item = document.createElement("li");
      item.className = "input-steps-item";
      var stepInput = document.createElement("input");
      stepInput.type = "text";
      stepInput.className = "input-step";
      stepInput.id = "input-step-" + (this.stepsElement.childElementCount + 1);
      stepInput.required = true;
      item.appendChild(stepInput);
      var timeLabel = document.createElement("label");
      timeLabel.className = "input-time-label";
      timeLabel.htmlFor = "input-time-" + (this.stepsElement.childElementCount + 1);
      timeLabel.innerText = "minutes:";
      item.appendChild(timeLabel);
      var timeInput = document.createElement("input");
      timeInput.className = "input-time";
      timeInput.id = "input-time-" + (this.stepsElement.childElementCount + 1);
      timeInput.type = "number";
      timeInput.min = "5";
      timeInput.max = "180";
      timeInput.step = "5";
      timeInput.required = true;
      item.appendChild(timeInput);
      this.stepsElement.appendChild(item);
      item.animate([{
        opacity: 0,
        maxHeight: "0px"
      }, {
        opacity: 0,
        maxHeight: "100px"
      }, {
        opacity: 1
      }], {
        duration: 100,
        easing: "ease-in"
      });
    }
  }, {
    key: "removeStepFromEditor",
    value: function removeStepFromEditor() {
      var _this8 = this;

      if (this.stepsElement.childElementCount > 1) {
        var item = this.stepsElement.lastElementChild;
        item.animate([{
          opacity: 1
        }, {
          opacity: 0,
          maxHeight: "100px"
        }, {
          opacity: 0,
          maxHeight: "0px"
        }], {
          duration: 100,
          easing: "ease-out"
        }).finished.then(function () {
          _this8.stepsElement.removeChild(item);
        });
      }
    }
  }, {
    key: "removeAllStepsFromEditor",
    value: function removeAllStepsFromEditor() {
      while (this.stepsElement.childElementCount > 1) {
        this.stepsElement.removeChild(this.stepsElement.lastElementChild);
      }
    }
  }, {
    key: "loadEditor",
    value: function loadEditor() {
      if (this.obj !== undefined) {
        this.removeAllStepsFromEditor();
        document.getElementById("input-name").value = this.obj.name;
        document.getElementById("input-ingredients").value = this.obj.ingredients;

        for (var i = 1; i < this.obj.steps.length; i++) {
          this.addStepToEditor();
        }

        for (var _i = 0; _i < this.obj.steps.length; _i++) {
          document.getElementById("input-step-" + (_i + 1)).value = this.obj.steps[_i].name;
          document.getElementById("input-time-" + (_i + 1)).value = this.obj.steps[_i].time;
        }
      }
    }
  }, {
    key: "clearEditor",
    value: function clearEditor() {
      this.removeAllStepsFromEditor();
      var fields = document.getElementById("popup-edit-form").querySelectorAll("input, textarea");

      var _iterator = _createForOfIteratorHelper(fields),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var elem = _step.value;
          elem.value = "";
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
  }]);

  return Popups;
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
  var app = new RecipeApp(arr);
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