"use strict";

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// -------------------------------------------------------
// UTILITIES
// -------------------------------------------------------
function log(str) {
  console.log(str);
} // -------------------------------------------------------
// NAV
// -------------------------------------------------------


var Nav = /*#__PURE__*/function () {
  function Nav(arr, displayRecipeCallback, openEditorToAddCallback) {
    var _this = this;

    _classCallCheck(this, Nav);

    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);
    this.clickedAdd = this.clickedAdd.bind(this);
    this.clickedDisplay = this.clickedDisplay.bind(this);
    this.nav = document.getElementById("nav");
    this.navList = document.getElementById("nav-list");
    this.recipeWindow = document.getElementById("recipe-window");
    this.displayRecipeCallback = displayRecipeCallback;
    this.openEditorToAddCallback = openEditorToAddCallback;
    document.getElementById("nav-menu-button").onclick = this.hide;
    document.getElementById("bg-menu-button").onclick = this.show;
    document.getElementById("nav-add-button").onclick = this.clickedAdd;
    arr.forEach(function (obj) {
      return _this.add(obj);
    });
    this.navList.animate({
      opacity: [0, 1]
    }, {
      duration: 400,
      easing: "ease-out"
    });
  }

  _createClass(Nav, [{
    key: "show",
    value: function show() {
      this.nav.classList.remove("hidden");
      this.recipeWindow.classList.add("narrower");
    }
  }, {
    key: "hide",
    value: function hide() {
      this.nav.classList.add("hidden");
      this.recipeWindow.classList.remove("narrower");
    }
  }, {
    key: "add",
    value: function add(obj) {
      var item = document.createElement("li");
      item.className = "nav-item";
      item.id = "nav-item-" + obj.id;
      item.dataset.id = obj.id;
      var rating;
      if (obj.rating.votes > 0) rating = (obj.rating.sum / obj.rating.votes).toFixed(1);else rating = "-";
      item.innerHTML = "<button class=\"nav-item-button\" type=\"button\">".concat(obj.name, "</button>\n    <div class=\"nav-item-rating\">").concat(rating, "<div class=\"rating-tooltip\">").concat(obj.rating.votes, " votes</div>\n    </div>");
      this.navList.appendChild(item);
      item.querySelector(".nav-item-button").onclick = this.clickedDisplay;
    }
  }, {
    key: "update",
    value: function update(obj) {
      var button = document.getElementById("nav-item-" + obj.id).querySelector(".nav-item-button");
      button.textContent = obj.name;
    }
  }, {
    key: "remove",
    value: function remove(obj) {
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
    key: "clickedAdd",
    value: function clickedAdd() {
      this.openEditorToAddCallback();
    }
  }, {
    key: "clickedDisplay",
    value: function clickedDisplay(event) {
      var id = parseInt(event.target.parentElement.dataset.id);
      this.displayRecipeCallback(id);
    }
  }]);

  return Nav;
}(); // -------------------------------------------------------
// RECIPE WINDOW
// -------------------------------------------------------


var RecipeWindow = /*#__PURE__*/function () {
  function RecipeWindow(openEditorToEditCallback, openDeleteCallback) {
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
    this.recipeWindow = document.getElementById("recipe-window");
    this.obj = "undefined";
    this.visible = false;
    this.changing = false;
    this.animationTime = 400;
    this.openEditorToEditCallback = openEditorToEditCallback;
    this.openDeleteCallback = openDeleteCallback;
    document.getElementById("recipe-close-button").onclick = this.clickedClose;
    document.getElementById("recipe-edit-button").onclick = this.clickedEdit;
    document.getElementById("recipe-delete-button").onclick = this.clickedDelete;
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
        itemIngredient.textContent = ingredient;
        ingredients.appendChild(itemIngredient);
      });
      var steps = document.getElementById("steps-list");
      steps.innerHTML = "";
      this.obj.steps.forEach(function (step) {
        var itemStep = document.createElement("li");
        itemStep.className = "steps-item";
        itemStep.innerHTML = "<span class=\"step-name\">".concat(step.name, "</span>\n      <span class=\"step-time\">\n      <i class=\"far fa-clock\"></i> ").concat(step.time, " min.\n      </span>");
        steps.appendChild(itemStep);
      });
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
        if (styleIn === "no") functionIn = this.show;else if (styleIn === "fade") functionIn = this.fadeIn;else functionIn = this.slideIn;

        if (!this.visible) {
          this.update(obj);
          functionIn(function () {
            _this7.changing = false;
          });
        } else if (obj !== this.obj) {
          functionOut(function () {
            _this7.update(obj);

            functionIn(function () {
              _this7.changing = false;
            });
          });
        }
      }
    }
  }, {
    key: "clickedClose",
    value: function clickedClose() {
      this.close("slide");
    }
  }, {
    key: "clickedEdit",
    value: function clickedEdit() {
      this.openEditorToEditCallback(this.obj);
    }
  }, {
    key: "clickedDelete",
    value: function clickedDelete() {
      this.openDeleteCallback(this.obj);
    }
  }]);

  return RecipeWindow;
}(); // -------------------------------------------------------
// POPUP - GENERAL CLASS (TO BE EXTENDED)
// -------------------------------------------------------


var Popup = /*#__PURE__*/function () {
  function Popup() {
    _classCallCheck(this, Popup);

    this.open = this.open.bind(this);
    this.close = this.close.bind(this); // should be assigned in extending class

    this.popupContainer = undefined;
    this.popupWindow = undefined;
  }

  _createClass(Popup, [{
    key: "open",
    value: function open() {
      this.popupContainer.classList.add("visible");
      this.popupWindow.style.display = "block";
      this.popupWindow.animate({
        opacity: [0, 1],
        transform: ["translateY(-200px)", "translateY(0px)"]
      }, {
        duration: 400,
        easing: "ease-out"
      });
    }
  }, {
    key: "close",
    value: function close() {
      this.popupWindow.style.display = "none";
      this.popupContainer.classList.remove("visible");
    }
  }]);

  return Popup;
}(); // -------------------------------------------------------
// EDIT POPUP
// -------------------------------------------------------


var EditPopup = /*#__PURE__*/function (_Popup) {
  _inherits(EditPopup, _Popup);

  var _super = _createSuper(EditPopup);

  function EditPopup(saveRecipeCallback) {
    var _this8;

    _classCallCheck(this, EditPopup);

    _this8 = _super.call(this);
    _this8.openToAdd = _this8.openToAdd.bind(_assertThisInitialized(_this8));
    _this8.openToEdit = _this8.openToEdit.bind(_assertThisInitialized(_this8));
    _this8.addStep = _this8.addStep.bind(_assertThisInitialized(_this8));
    _this8.removeStep = _this8.removeStep.bind(_assertThisInitialized(_this8));
    _this8.clear = _this8.clear.bind(_assertThisInitialized(_this8));
    _this8.submit = _this8.submit.bind(_assertThisInitialized(_this8));
    _this8.popupContainer = document.getElementById("popup-edit-container");
    _this8.popupWindow = document.getElementById("popup-edit-window");
    _this8.inputStepsList = document.getElementById("input-steps-list");
    _this8.formValidationWarning = document.getElementById("form-validation-warning");
    _this8.obj = undefined;
    _this8.saveRecipeCallback = saveRecipeCallback;
    document.getElementById("add-step-button").onclick = _this8.addStep;
    document.getElementById("remove-step-button").onclick = _this8.removeStep;
    document.getElementById("edit-ok-button").onclick = _this8.submit;
    document.getElementById("edit-clear-button").onclick = _this8.clear;
    document.getElementById("edit-cancel-button").onclick = _this8.close;

    _this8.addStep();

    return _this8;
  }

  _createClass(EditPopup, [{
    key: "openToAdd",
    value: function openToAdd() {
      this.obj = undefined;
      this.clear();
      this.open();
    }
  }, {
    key: "openToEdit",
    value: function openToEdit(obj) {
      this.obj = obj;
      this.load();
      this.open();
    }
  }, {
    key: "addStep",
    value: function addStep() {
      var item = document.createElement("li");
      item.className = "input-steps-item";
      var nextId = this.inputStepsList.childElementCount + 1;
      item.innerHTML = "<input type=\"text\" class=\"input-step\" id=\"input-step-".concat(nextId, "\">\n    <label class=\"input-time-label\" for=\"input-time-").concat(nextId, "\">minutes:</label>\n    <input class=\"input-time\" id=\"input-time-").concat(nextId, "\" type=\"number\" min=\"5\" max=\"180\" step=\"5\">");
      this.inputStepsList.appendChild(item);
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
    key: "removeStep",
    value: function removeStep() {
      var _this9 = this;

      if (this.inputStepsList.childElementCount > 1) {
        var item = this.inputStepsList.lastElementChild;
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
          _this9.inputStepsList.removeChild(item);
        });
      }
    }
  }, {
    key: "removeAllSteps",
    value: function removeAllSteps() {
      while (this.inputStepsList.childElementCount > 1) {
        this.inputStepsList.removeChild(this.inputStepsList.lastElementChild);
      }
    }
  }, {
    key: "load",
    value: function load() {
      if (this.obj !== undefined) {
        this.removeAllSteps();
        document.getElementById("input-name").value = this.obj.name;
        document.getElementById("input-ingredients").value = this.obj.ingredients;

        for (var i = 1; i < this.obj.steps.length; i++) {
          this.addStep();
        }

        for (var _i = 0; _i < this.obj.steps.length; _i++) {
          document.getElementById("input-step-" + (_i + 1)).value = this.obj.steps[_i].name;
          document.getElementById("input-time-" + (_i + 1)).value = this.obj.steps[_i].time;
        }
      }
    }
  }, {
    key: "clear",
    value: function clear() {
      this.removeAllSteps();
      this.formValidationWarning.classList.remove("visible");
      var fields = document.getElementById("popup-edit-form").querySelectorAll("input, textarea");

      var _iterator = _createForOfIteratorHelper(fields),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var elem = _step.value;
          elem.value = "";
          elem.classList.remove("incorrect");
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
  }, {
    key: "validate",
    value: function validate() {
      var fields = document.getElementById("popup-edit-form").querySelectorAll("input, textarea");
      var minutes = document.getElementById("popup-edit-form").getElementsByClassName("input-time");
      var result = true;

      var _iterator2 = _createForOfIteratorHelper(fields),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var elem = _step2.value;
          elem.classList.remove("incorrect");

          if (elem.value === "" || elem.value === undefined) {
            elem.classList.add("incorrect");
            result = false;
          }
        } // for (let elem of minutes) {
        //   if (elem.value < elem.min || elem.value > elem.max) {
        //     elem.classList.add("incorrect");
        //     result = false;
        //   }
        // }

      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }

      if (!result) this.formValidationWarning.classList.add("visible");else this.formValidationWarning.classList.remove("visible");
      return result;
    }
  }, {
    key: "export",
    value: function _export() {
      var newObj = {
        name: document.getElementById("input-name").value,
        ingredients: document.getElementById("input-ingredients").value,
        steps: []
      };

      if (this.obj !== undefined) {
        newObj.id = this.obj.id;
        newObj.rating = Object.assign({}, this.obj.rating);
      } else {
        newObj.rating = {
          sum: 0,
          votes: 0
        };
      }

      var steps = document.getElementById("input-steps-list");

      for (var i = 0; i < steps.childElementCount; i++) {
        newObj.steps.push({
          name: document.getElementById("input-step-" + (i + 1)).value,
          time: document.getElementById("input-time-" + (i + 1)).value
        });
      }

      return newObj;
    }
  }, {
    key: "submit",
    value: function submit() {
      if (this.validate()) {
        this.close();
        this.saveRecipeCallback(this["export"]());
      }
    }
  }]);

  return EditPopup;
}(Popup); // -------------------------------------------------------
// DELETE POPUP
// -------------------------------------------------------


var DeletePopup = /*#__PURE__*/function (_Popup2) {
  _inherits(DeletePopup, _Popup2);

  var _super2 = _createSuper(DeletePopup);

  function DeletePopup(deleteRecipeCallback) {
    var _this10;

    _classCallCheck(this, DeletePopup);

    _this10 = _super2.call(this);
    _this10.open = _this10.open.bind(_assertThisInitialized(_this10));
    _this10.submit = _this10.submit.bind(_assertThisInitialized(_this10));
    _this10.popupContainer = document.getElementById("popup-delete-container");
    _this10.popupWindow = document.getElementById("popup-delete-window");
    _this10.obj = undefined;
    _this10.deleteRecipeCallback = deleteRecipeCallback;
    document.getElementById("delete-ok-button").onclick = _this10.submit;
    document.getElementById("delete-cancel-button").onclick = _this10.close;
    return _this10;
  }

  _createClass(DeletePopup, [{
    key: "open",
    value: function open(obj) {
      this.obj = obj;

      _get(_getPrototypeOf(DeletePopup.prototype), "open", this).call(this);
    }
  }, {
    key: "submit",
    value: function submit() {
      this.close();
      this.deleteRecipeCallback(this.obj);
    }
  }]);

  return DeletePopup;
}(Popup); // -------------------------------------------------------
// MAIN APP
// -------------------------------------------------------


var MainApp = /*#__PURE__*/function () {
  function MainApp(arr) {
    _classCallCheck(this, MainApp);

    this.deleteRecipe = this.deleteRecipe.bind(this);
    this.saveRecipe = this.saveRecipe.bind(this);
    this.displayRecipe = this.displayRecipe.bind(this);
    this.openEditorToAdd = this.openEditorToAdd.bind(this);
    this.openEditorToEdit = this.openEditorToEdit.bind(this);
    this.openDelete = this.openDelete.bind(this);
    this.startingArray = arr;
    this.storage = window.localStorage;
    var storedArr = this.storage.getItem("recipes");

    if (storedArr === null) {
      // no data in local storate
      this.arr = this.startingArray.slice();
      this.saveRecipesToLocalMemory();
    } else {
      // data in local storage
      this.arr = JSON.parse(storedArr);
    }

    this.nav = new Nav(this.arr, this.displayRecipe, this.openEditorToAdd);
    this.recipeWindow = new RecipeWindow(this.openEditorToEdit, this.openDelete);
    this.editPopup = new EditPopup(this.saveRecipe);
    this.deletePopup = new DeletePopup(this.deleteRecipe);
  }

  _createClass(MainApp, [{
    key: "addRecipe",
    value: function addRecipe(obj) {
      this.arr.push(obj);
      this.saveRecipesToLocalMemory();
      this.nav.add(obj);
      this.recipeWindow.display(obj, "no", "fade");
    }
  }, {
    key: "deleteRecipe",
    value: function deleteRecipe(obj) {
      this.arr = this.arr.filter(function (item) {
        return item !== obj;
      });
      this.saveRecipesToLocalMemory();
      this.recipeWindow.close("fade");
      this.nav.remove(obj);
    }
  }, {
    key: "saveRecipe",
    value: function saveRecipe(obj) {
      if (!obj.hasOwnProperty("id")) {
        obj.id = this.arr[this.arr.length - 1].id + 1;
        this.addRecipe(obj);
      } else {
        var index = this.arr.findIndex(function (item) {
          return item.id === obj.id;
        });
        this.arr[index] = obj;
        this.saveRecipesToLocalMemory();
        this.nav.update(obj);
        this.recipeWindow.display(obj, "no", "fade");
      }
    }
  }, {
    key: "saveRecipesToLocalMemory",
    value: function saveRecipesToLocalMemory() {
      this.storage.setItem("recipes", JSON.stringify(this.arr));
    }
  }, {
    key: "displayRecipe",
    value: function displayRecipe(id) {
      var obj = this.arr.find(function (item) {
        return item.id === id;
      });
      this.recipeWindow.display(obj, "slide", "slide");
    }
  }, {
    key: "openEditorToAdd",
    value: function openEditorToAdd() {
      this.editPopup.openToAdd();
    }
  }, {
    key: "openEditorToEdit",
    value: function openEditorToEdit(obj) {
      this.editPopup.openToEdit(obj);
    }
  }, {
    key: "openDelete",
    value: function openDelete(obj) {
      this.deletePopup.open(obj);
    }
  }]);

  return MainApp;
}();

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
  var app = new MainApp(recipes);
});