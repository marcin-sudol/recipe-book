"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

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
  function Nav(arr, displayRecipeCallback, openEditorCallback, resetRecipesCallback) {
    _classCallCheck(this, Nav);

    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);
    this.clickedAddRecipe = this.clickedAddRecipe.bind(this);
    this.clickedDisplayRecipe = this.clickedDisplayRecipe.bind(this);
    this.clickedResetList = this.clickedResetList.bind(this);
    this.nav = document.getElementById("nav");
    this.navList = document.getElementById("nav-list");
    this.recipeWindow = document.getElementById("recipe-window");
    this.displayRecipeCallback = displayRecipeCallback;
    this.openEditorCallback = openEditorCallback;
    this.resetRecipesCallback = resetRecipesCallback;
    document.getElementById("nav-menu-button").onclick = this.hide;
    document.getElementById("bg-menu-button").onclick = this.show;
    document.getElementById("nav-add-button").onclick = this.clickedAddRecipe;
    document.getElementById("nav-reset-button").onclick = this.clickedResetList;
    this.addList(arr, "fade");
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
    key: "formatRating",
    value: function formatRating(obj) {
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
      item.innerHTML = "<button class=\"nav-item-button\" type=\"button\">".concat(obj.name, "</button>\n    <div class=\"nav-item-rating\">").concat(this.formatRating(obj), "<div class=\"rating-tooltip\">").concat(obj.rating.votes, " votes</div>\n    </div>");
      this.navList.appendChild(item);
      item.querySelector(".nav-item-button").onclick = this.clickedDisplayRecipe;
    }
  }, {
    key: "updateItem",
    value: function updateItem(obj) {
      var item = document.getElementById("nav-item-" + obj.id);
      item.querySelector(".nav-item-button").textContent = obj.name; // fix this
      // item.querySelector(".nav-item-rating").textContent = this.formatRating(obj);
      // log(obj.rating.votes + " votes");
      // item.querySelector(".rating-tooltip").textContent =
      // //   obj.rating.votes + " votes";
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
  }]);

  return Nav;
}(); // -------------------------------------------------------
// RECIPE WINDOW
// -------------------------------------------------------


var RecipeWindow = /*#__PURE__*/function () {
  function RecipeWindow(openEditorCallback, openDeleteCallback, saveRecipeCallback) {
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
    document.getElementById("recipe-close-button").onclick = this.clickedClose;
    document.getElementById("recipe-edit-button").onclick = this.clickedEdit;
    document.getElementById("recipe-delete-button").onclick = this.clickedDelete;

    var _iterator = _createForOfIteratorHelper(this.recipeRatingButtons),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var button = _step.value;
        button.onclick = this.clickedLocalRating;
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
      var _this2 = this;

      var newItem;
      this.obj = obj;
      this.recipeName.innerHTML = this.obj.name;
      this.ingredientsList.innerHTML = "";
      this.obj.ingredients.split(",").forEach(function (ingredient) {
        newItem = document.createElement("li");
        newItem.className = "ingredients-item";
        newItem.textContent = ingredient;

        _this2.ingredientsList.appendChild(newItem);
      });
      this.stepsList.innerHTML = "";
      this.obj.steps.forEach(function (step) {
        newItem = document.createElement("li");
        newItem.className = "steps-item";
        newItem.innerHTML = "<span class=\"step-name\">".concat(step.name, "</span>\n      <span class=\"step-time\">\n      <i class=\"far fa-clock\"></i> ").concat(step.time, " min.\n      </span>");

        _this2.stepsList.appendChild(newItem);
      });
      this.updateLocalRating();
    }
  }, {
    key: "updateLocalRating",
    value: function updateLocalRating() {
      for (var i = 0; i < 5; i++) {
        this.recipeRatingButtons[i].classList.remove("checked");
      }

      if (this.obj.rating.hasOwnProperty("local")) {
        var localRating = parseInt(this.obj.rating.local);

        for (var _i = 0; _i < localRating; _i++) {
          this.recipeRatingButtons[_i].classList.add("checked");
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
      var _this3 = this;

      this.recipeWindow.style.display = "flex";
      this.recipeWindow.animate({
        transform: ["translateX(-20vw)", "translateX(0px)"],
        opacity: [0, 1]
      }, {
        duration: this.animationTime,
        easing: "ease-out"
      }).finished.then(function () {
        _this3.show(callback);
      });
    }
  }, {
    key: "slideOut",
    value: function slideOut(callback) {
      var _this4 = this;

      this.recipeWindow.animate({
        transform: ["translateX(0px)", "translateX(-20vw)"],
        opacity: [1, 0]
      }, {
        duration: this.animationTime,
        easing: "ease-out"
      }).finished.then(function () {
        _this4.hide(callback);
      });
    }
  }, {
    key: "fadeIn",
    value: function fadeIn(callback) {
      var _this5 = this;

      this.recipeWindow.style.display = "flex";
      this.recipeWindow.animate({
        opacity: [0, 1]
      }, {
        duration: this.animationTime,
        easing: "ease-out"
      }).finished.then(function () {
        _this5.show(callback);
      });
    }
  }, {
    key: "fadeOut",
    value: function fadeOut(callback) {
      var _this6 = this;

      this.recipeWindow.animate({
        opacity: [1, 0]
      }, {
        duration: this.animationTime,
        easing: "ease-out"
      }).finished.then(function () {
        _this6.hide(callback);
      });
    }
  }, {
    key: "close",
    value: function close(styleOut) {
      var _this7 = this;

      if (this.visible) {
        var functionOut;
        if (styleOut === "fade") functionOut = this.fadeOut;else functionOut = this.slideOut;
        this.changing = true;
        functionOut();
        setTimeout(function () {
          _this7.changing = false;
        }, this.animationTime);
      }
    }
  }, {
    key: "display",
    value: function display(obj, styleOut, styleIn) {
      var _this8 = this;

      if (!this.changing && (!this.visible || obj !== this.obj)) {
        this.changing = true;
        var functionOut, functionIn;
        if (styleOut === "no") functionOut = this.hide;else if (styleOut === "fade") functionOut = this.fadeOut;else functionOut = this.slideOut;
        if (styleIn === "no") functionIn = this.show;else if (styleIn === "fade") functionIn = this.fadeIn;else functionIn = this.slideIn;

        if (!this.visible) {
          this.update(obj);
          functionIn(function () {
            _this8.changing = false;
          });
        } else if (obj !== this.obj) {
          functionOut(function () {
            _this8.update(obj);

            functionIn(function () {
              _this8.changing = false;
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
      var localRating;
      if (event.target.tagName === "BUTTON") localRating = parseInt(event.target.dataset.id);else localRating = parseInt(event.target.parentElement.dataset.id);

      if (this.obj.rating.hasOwnProperty("local")) {
        this.obj.rating.sum -= this.obj.rating.local;
        this.obj.rating.sum += localRating;
        this.obj.rating.local = localRating;
      } else {
        this.obj.rating.sum += localRating;
        this.obj.rating.local = localRating;
        this.obj.rating.votes += 1;
      }

      this.updateLocalRating();
      this.saveRecipeCallback(this.obj);
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
    var _this9;

    _classCallCheck(this, EditPopup);

    _this9 = _super.call(this);
    _this9.addStep = _this9.addStep.bind(_assertThisInitialized(_this9));
    _this9.removeStep = _this9.removeStep.bind(_assertThisInitialized(_this9));
    _this9.clear = _this9.clear.bind(_assertThisInitialized(_this9));
    _this9.submit = _this9.submit.bind(_assertThisInitialized(_this9));
    _this9.popupContainer = document.getElementById("popup-edit-container");
    _this9.popupWindow = document.getElementById("popup-edit-window");
    _this9.inputStepsList = document.getElementById("input-steps-list");
    _this9.formValidationWarning = document.getElementById("form-validation-warning");
    _this9.obj = undefined;
    _this9.saveRecipeCallback = saveRecipeCallback;
    document.getElementById("add-step-button").onclick = _this9.addStep;
    document.getElementById("remove-step-button").onclick = _this9.removeStep;
    document.getElementById("edit-ok-button").onclick = _this9.submit;
    document.getElementById("edit-clear-button").onclick = _this9.clear;
    document.getElementById("edit-cancel-button").onclick = _this9.close;

    _this9.addStep();

    return _this9;
  }

  _createClass(EditPopup, [{
    key: "open",
    value: function open(obj) {
      this.obj = obj;

      if (obj === undefined) {
        this.clear();
      } else {
        this.load();
      }

      _get(_getPrototypeOf(EditPopup.prototype), "open", this).call(this);
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
      var _this10 = this;

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
          _this10.inputStepsList.removeChild(item);
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

        for (var _i2 = 0; _i2 < this.obj.steps.length; _i2++) {
          document.getElementById("input-step-" + (_i2 + 1)).value = this.obj.steps[_i2].name;
          document.getElementById("input-time-" + (_i2 + 1)).value = this.obj.steps[_i2].time;
        }
      }
    }
  }, {
    key: "clear",
    value: function clear() {
      this.removeAllSteps();
      this.formValidationWarning.classList.remove("visible");
      var fields = document.getElementById("popup-edit-form").querySelectorAll("input, textarea");

      var _iterator2 = _createForOfIteratorHelper(fields),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var elem = _step2.value;
          elem.value = "";
          elem.classList.remove("incorrect");
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
    }
  }, {
    key: "validate",
    value: function validate() {
      var fields = document.getElementById("popup-edit-form").querySelectorAll("input, textarea");
      var minutes = document.getElementById("popup-edit-form").getElementsByClassName("input-time");
      var result = true;

      var _iterator3 = _createForOfIteratorHelper(fields),
          _step3;

      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var elem = _step3.value;
          elem.classList.remove("incorrect");

          if (elem.value === "" || elem.value === undefined) {
            elem.classList.add("incorrect");
            result = false;
          }
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }

      var _iterator4 = _createForOfIteratorHelper(minutes),
          _step4;

      try {
        for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
          var _elem = _step4.value;
          var val = parseInt(_elem.value);
          if (Number.isInteger(val)) if (val < _elem.min || val > _elem.max) {
            log(val);

            _elem.classList.add("incorrect");

            result = false;
          }
        }
      } catch (err) {
        _iterator4.e(err);
      } finally {
        _iterator4.f();
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
    var _this11;

    _classCallCheck(this, DeletePopup);

    _this11 = _super2.call(this);
    _this11.open = _this11.open.bind(_assertThisInitialized(_this11));
    _this11.submit = _this11.submit.bind(_assertThisInitialized(_this11));
    _this11.popupContainer = document.getElementById("popup-delete-container");
    _this11.popupWindow = document.getElementById("popup-delete-window");
    _this11.obj = undefined;
    _this11.deleteRecipeCallback = deleteRecipeCallback;
    document.getElementById("delete-ok-button").onclick = _this11.submit;
    document.getElementById("delete-cancel-button").onclick = _this11.close;
    return _this11;
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
    this.resetRecipes = this.resetRecipes.bind(this);
    this.displayRecipe = this.displayRecipe.bind(this);
    this.openEditor = this.openEditor.bind(this);
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

    this.nav = new Nav(this.arr, this.displayRecipe, this.openEditor, this.resetRecipes);
    this.recipeWindow = new RecipeWindow(this.openEditor, this.openDelete, this.saveRecipe);
    this.editPopup = new EditPopup(this.saveRecipe);
    this.deletePopup = new DeletePopup(this.deleteRecipe);
  }

  _createClass(MainApp, [{
    key: "addRecipe",
    value: function addRecipe(obj) {
      this.arr.push(obj);
      this.saveRecipesToLocalMemory();
      this.nav.addItem(obj);
      this.recipeWindow.display(obj, "slide", "slide");
    }
  }, {
    key: "deleteRecipe",
    value: function deleteRecipe(obj) {
      this.arr = this.arr.filter(function (item) {
        return item !== obj;
      });
      this.saveRecipesToLocalMemory();
      this.recipeWindow.close("fade");
      this.nav.removeItem(obj);
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
        this.nav.updateItem(obj);
        this.recipeWindow.display(obj, "no", "fade");
      }
    }
  }, {
    key: "saveRecipesToLocalMemory",
    value: function saveRecipesToLocalMemory() {
      this.storage.setItem("recipes", JSON.stringify(this.arr));
    }
  }, {
    key: "resetRecipes",
    value: function resetRecipes() {
      this.recipeWindow.close("fade");
      this.arr = this.startingArray.slice();
      this.saveRecipesToLocalMemory();
      this.nav.updateList(this.arr, "fade");
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
    key: "openEditor",
    value: function openEditor(obj) {
      this.editPopup.open(obj);
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
    votes: 6,
    local: 2
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
    votes: 12,
    local: 4
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