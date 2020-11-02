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
// RECIPE WINDOW
// -------------------------------------------------------


var MainWindow = /*#__PURE__*/function () {
  function MainWindow(editorCallback, deleteCallback) {
    _classCallCheck(this, MainWindow);

    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this.clickedEdit = this.clickedEdit.bind(this);
    this.clickedDelete = this.clickedDelete.bind(this);
    this.element = document.getElementById("recipe-window");
    this.obj = "undefined";
    this.visible = false;
    this.changing = false;
    this.animationTime = 400;
    this.editorCallback = editorCallback;
    this.deleteCallback = deleteCallback;
    document.getElementById("recipe-close-button").onclick = this.close;
    document.getElementById("recipe-edit-button").onclick = this.clickedEdit;
    document.getElementById("recipe-delete-button").onclick = this.clickedDelete;
  }

  _createClass(MainWindow, [{
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
    value: function close(style) {
      var _this5 = this;

      log(style);

      if (this.visible) {
        this.changing = true;

        switch (style) {
          case "fade":
            this.fadeOut();
            break;

          default:
            this.slideOut();
            break;
        }

        setTimeout(function () {
          _this5.changing = false;
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
          }, this.animationTime);
        } else if (obj !== this.obj) {
          this.slideOut();
          setTimeout(function () {
            _this6.update(obj);

            _this6.slideIn();

            setTimeout(function () {
              _this6.changing = false;
            }, _this6.animationTime);
          }, this.animationTime + 100);
        }
      }
    }
  }, {
    key: "clickedEdit",
    value: function clickedEdit() {
      this.editorCallback(this.obj);
    }
  }, {
    key: "clickedDelete",
    value: function clickedDelete() {
      this.deleteCallback(this.obj);
    }
  }]);

  return MainWindow;
}(); // -------------------------------------------------------
// NAV
// -------------------------------------------------------


var Nav = /*#__PURE__*/function () {
  function Nav(arr, openCallback, addCallback) {
    var _this7 = this;

    _classCallCheck(this, Nav);

    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);
    this.clickedAdd = this.clickedAdd.bind(this);
    this.nav = document.getElementById("nav");
    this.bg = document.getElementById("nav-bg");
    this.elemList = document.getElementById("nav-list");
    this.openCallback = openCallback;
    this.addCallback = addCallback;
    document.getElementById("nav-menu-button").onclick = this.hide;
    document.getElementById("bg-menu-button").onclick = this.show;
    document.getElementById("nav-add-button").onclick = this.clickedAdd;
    arr.forEach(function (obj) {
      return _this7.add(obj);
    });
    this.elemList.animate({
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
      this.bg.classList.remove("collapsed");
    }
  }, {
    key: "hide",
    value: function hide() {
      this.nav.classList.add("hidden");
      this.bg.classList.add("collapsed");
    }
  }, {
    key: "add",
    value: function add(obj) {
      var openCallback = this.openCallback;
      var item = document.createElement("li");
      item.className = "nav-item";
      item.id = "nav-item-" + obj.id;
      var button = document.createElement("button");
      button.className = "nav-item-button";
      button.type = "button";
      button.innerText = obj.name;

      button.onclick = function () {
        openCallback(obj);
      };

      item.appendChild(button);
      var divRating = document.createElement("div");
      divRating.className = "nav-item-rating";
      if (obj.rating.votes > 0) divRating.innerText = (obj.rating.sum / obj.rating.votes).toFixed(1);else divRating.innerText = "-";
      item.appendChild(divRating);
      var divTooltip = document.createElement("div");
      divTooltip.className = "rating-tooltip";
      divTooltip.innerText = obj.rating.votes + " votes";
      divRating.appendChild(divTooltip);
      this.elemList.appendChild(item);
    }
  }, {
    key: "update",
    value: function update(obj) {
      var openCallback = this.openCallback;
      var button = document.getElementById("nav-item-" + obj.id).querySelector(".nav-item-button");
      button.innerText = obj.name;

      button.onclick = function () {
        openCallback(obj);
      };
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
      this.addCallback();
    }
  }]);

  return Nav;
}(); // -------------------------------------------------------
// RECIPE APP
// -------------------------------------------------------


var RecipeApp = /*#__PURE__*/function () {
  function RecipeApp(arr) {
    _classCallCheck(this, RecipeApp);

    this.deleteRecipe = this.deleteRecipe.bind(this);
    this.saveRecipe = this.saveRecipe.bind(this);
    this.arr = arr;
    this.popups = new Popups(this.saveRecipe, this.deleteRecipe);
    this.mainWindow = new MainWindow(this.popups.editor.openToEdit, this.popups["delete"].open);
    this.nav = new Nav(this.arr, this.mainWindow.open, this.popups.editor.openToAdd);
  }

  _createClass(RecipeApp, [{
    key: "addRecipe",
    value: function addRecipe(obj) {
      this.arr.push(obj);
      this.nav.add(obj);
    }
  }, {
    key: "deleteRecipe",
    value: function deleteRecipe(obj) {
      this.arr = this.arr.filter(function (item) {
        return item !== obj;
      });
      this.mainWindow.close("fade");
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
        this.nav.update(obj);
        this.mainWindow.update(obj);
      }
    }
  }]);

  return RecipeApp;
}(); // -------------------------------------------------------
// POPUPS
// -------------------------------------------------------


var Popups = /*#__PURE__*/function () {
  function Popups(saveCallback, deleteCallback) {
    _classCallCheck(this, Popups);

    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this.element = document.getElementById("popup");
    this.editor = new EditorPopup(this.open, this.close, saveCallback);
    this["delete"] = new DeletePopup(this.open, this.close, deleteCallback);
  }

  _createClass(Popups, [{
    key: "open",
    value: function open() {
      this.element.classList.add("visible");
    }
  }, {
    key: "close",
    value: function close() {
      this.element.classList.remove("visible");
    }
  }]);

  return Popups;
}(); // -------------------------------------------------------
// POPUP WINDOW
// -------------------------------------------------------


var PopupWindow = /*#__PURE__*/function () {
  function PopupWindow(openCallback, closeCallback) {
    _classCallCheck(this, PopupWindow);

    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this.element = undefined;
    this.openCallback = openCallback;
    this.closeCallback = closeCallback;
  }

  _createClass(PopupWindow, [{
    key: "open",
    value: function open() {
      this.openCallback();
      this.element.style.display = "block";
      this.element.animate({
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
      this.element.style.display = "none";
      this.closeCallback();
    }
  }]);

  return PopupWindow;
}(); // -------------------------------------------------------
// EDITOR POPUP
// -------------------------------------------------------


var EditorPopup = /*#__PURE__*/function (_PopupWindow) {
  _inherits(EditorPopup, _PopupWindow);

  var _super = _createSuper(EditorPopup);

  function EditorPopup(openCallback, closeCallback, saveCallback) {
    var _this8;

    _classCallCheck(this, EditorPopup);

    _this8 = _super.call(this, openCallback, closeCallback);
    _this8.openToAdd = _this8.openToAdd.bind(_assertThisInitialized(_this8));
    _this8.openToEdit = _this8.openToEdit.bind(_assertThisInitialized(_this8));
    _this8.addStep = _this8.addStep.bind(_assertThisInitialized(_this8));
    _this8.removeStep = _this8.removeStep.bind(_assertThisInitialized(_this8));
    _this8.clear = _this8.clear.bind(_assertThisInitialized(_this8));
    _this8.submit = _this8.submit.bind(_assertThisInitialized(_this8));
    _this8.element = document.getElementById("popup-edit");
    _this8.stepsElement = document.getElementById("input-steps-list");
    _this8.validationElement = document.getElementById("form-validation-warning");
    _this8.obj = undefined;
    _this8.saveCallback = saveCallback;
    document.getElementById("add-step-button").onclick = _this8.addStep;
    document.getElementById("remove-step-button").onclick = _this8.removeStep;
    document.getElementById("edit-ok-button").onclick = _this8.submit;
    document.getElementById("edit-clear-button").onclick = _this8.clear;
    document.getElementById("edit-cancel-button").onclick = _this8.close;

    _this8.addStep();

    return _this8;
  }

  _createClass(EditorPopup, [{
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
      var stepInput = document.createElement("input");
      stepInput.type = "text";
      stepInput.className = "input-step";
      stepInput.id = "input-step-" + (this.stepsElement.childElementCount + 1);
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
    key: "removeStep",
    value: function removeStep() {
      var _this9 = this;

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
          _this9.stepsElement.removeChild(item);
        });
      }
    }
  }, {
    key: "removeAllSteps",
    value: function removeAllSteps() {
      while (this.stepsElement.childElementCount > 1) {
        this.stepsElement.removeChild(this.stepsElement.lastElementChild);
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
      this.validationElement.classList.remove("visible");
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

      if (!result) this.validationElement.classList.add("visible");else this.validationElement.classList.remove("visible");
      return result;
    }
  }, {
    key: "export",
    value: function _export() {
      var newObj = {
        name: document.getElementById("input-name").value,
        ingredients: document.getElementById("input-ingredients").value,
        steps: [],
        rating: {
          sum: 0,
          votes: 0
        }
      };
      if (this.obj !== undefined) newObj.id = this.obj.id;
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
        this.saveCallback(this["export"]());
      }
    }
  }]);

  return EditorPopup;
}(PopupWindow); // -------------------------------------------------------
// DELETE POPUP
// -------------------------------------------------------


var DeletePopup = /*#__PURE__*/function (_PopupWindow2) {
  _inherits(DeletePopup, _PopupWindow2);

  var _super2 = _createSuper(DeletePopup);

  function DeletePopup(openCallback, closeCallback, deleteCallback) {
    var _this10;

    _classCallCheck(this, DeletePopup);

    _this10 = _super2.call(this, openCallback, closeCallback);
    _this10.open = _this10.open.bind(_assertThisInitialized(_this10));
    _this10.submit = _this10.submit.bind(_assertThisInitialized(_this10));
    _this10.element = document.getElementById("popup-delete");
    _this10.obj = undefined;
    _this10.openCallback = openCallback;
    _this10.closeCallback = closeCallback;
    _this10.deleteCallback = deleteCallback;
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
      this.deleteCallback(this.obj);
    }
  }]);

  return DeletePopup;
}(PopupWindow);

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
  var app = new RecipeApp(recipes);
});