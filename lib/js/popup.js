"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

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

var Popup = /*#__PURE__*/function () {
  function Popup(updateTabIndexCallback) {
    _classCallCheck(this, Popup);

    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this.updateTabIndexCallback = updateTabIndexCallback; // should be assigned in extending class

    this.popupContainer = undefined;
    this.popupWindow = undefined;
  }

  _createClass(Popup, [{
    key: "open",
    value: function open() {
      this.popupContainer.classList.add("visible");
      this.popupWindow.style.display = "flex";
      this.popupWindow.animate({
        opacity: [0, 1],
        transform: ["translateY(-100px)", "translateY(0px)"]
      }, {
        duration: 400,
        easing: "ease-out"
      }).finished.then(this.updateTabIndexCallback);
    }
  }, {
    key: "close",
    value: function close() {
      this.popupWindow.style.display = "none";
      this.popupContainer.classList.remove("visible");
      this.updateTabIndexCallback();
    }
  }, {
    key: "visible",
    get: function get() {
      return this.popupContainer.classList.contains("visible");
    }
  }]);

  return Popup;
}(); // -------------------------------------------------------
// EDIT POPUP
// -------------------------------------------------------


var EditPopup = /*#__PURE__*/function (_Popup) {
  _inherits(EditPopup, _Popup);

  var _super = _createSuper(EditPopup);

  function EditPopup(saveRecipeCallback, updateTabIndexCallback) {
    var _this;

    _classCallCheck(this, EditPopup);

    _this = _super.call(this, updateTabIndexCallback);
    _this.addStep = _this.addStep.bind(_assertThisInitialized(_this));
    _this.removeStep = _this.removeStep.bind(_assertThisInitialized(_this));
    _this.clear = _this.clear.bind(_assertThisInitialized(_this));
    _this.submit = _this.submit.bind(_assertThisInitialized(_this));
    _this.popupContainer = document.getElementById("popup-edit-container");
    _this.popupWindow = document.getElementById("popup-edit-window");
    _this.popupEditForm = document.getElementById("popup-edit-form");
    _this.inputStepsList = document.getElementById("input-steps-list");
    _this.formValidationWarning = document.getElementById("form-validation-warning");
    _this.obj = undefined;
    _this.saveRecipeCallback = saveRecipeCallback;
    document.getElementById("add-step-button").onclick = _this.addStep;
    document.getElementById("remove-step-button").onclick = _this.removeStep;
    document.getElementById("edit-ok-button").onclick = _this.submit;
    document.getElementById("edit-clear-button").onclick = _this.clear;
    document.getElementById("edit-cancel-button").onclick = _this.close;

    _this.addStep();

    return _this;
  }

  _createClass(EditPopup, [{
    key: "open",
    value: function open(obj) {
      this.obj = obj;

      if (obj === undefined) {
        this.clear();
      } else {
        this.clearValidation();
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
      item.innerHTML = "<input type=\"text\" class=\"input-step-name\" id=\"input-step-".concat(nextId, "\" placeholder=\"Enter step\">\n    <div class=\"input-step-break\"></div>\n    <label class=\"input-time-label\" for=\"input-time-").concat(nextId, "\"><i class=\"far fa-clock\"></i><span>minutes:</span></label>\n    <input class=\"input-step-time\" id=\"input-time-").concat(nextId, "\" type=\"number\" placeholder=\"min\" min=\"5\" max=\"180\" step=\"5\">");
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
      var _this2 = this;

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
          _this2.inputStepsList.removeChild(item);
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
      this.clearValidation();
      this.removeAllSteps();
      var fields = this.popupEditForm.querySelectorAll("input, textarea");

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
  }, {
    key: "validate",
    value: function validate() {
      var fields = this.popupEditForm.querySelectorAll("input, textarea");
      var minutes = this.popupEditForm.getElementsByClassName("input-time");
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
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }

      var _iterator3 = _createForOfIteratorHelper(minutes),
          _step3;

      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var _elem = _step3.value;
          var val = parseInt(_elem.value);
          if (Number.isInteger(val)) if (val < _elem.min || val > _elem.max) {
            _elem.classList.add("incorrect");

            result = false;
          }
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }

      if (!result) this.formValidationWarning.classList.add("visible");else this.formValidationWarning.classList.remove("visible");
      return result;
    }
  }, {
    key: "clearValidation",
    value: function clearValidation() {
      this.formValidationWarning.classList.remove("visible");
      var fields = this.popupEditForm.querySelectorAll("input, textarea");

      var _iterator4 = _createForOfIteratorHelper(fields),
          _step4;

      try {
        for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
          var elem = _step4.value;
          elem.classList.remove("incorrect");
        }
      } catch (err) {
        _iterator4.e(err);
      } finally {
        _iterator4.f();
      }
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

      for (var i = 0; i < this.inputStepsList.childElementCount; i++) {
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
  }, {
    key: "focus",
    value: function focus() {
      document.getElementById("input-name").focus();
    }
  }]);

  return EditPopup;
}(Popup); // -------------------------------------------------------
// DELETE POPUP
// -------------------------------------------------------


var DeletePopup = /*#__PURE__*/function (_Popup2) {
  _inherits(DeletePopup, _Popup2);

  var _super2 = _createSuper(DeletePopup);

  function DeletePopup(deleteRecipeCallback, updateTabIndexCallback) {
    var _this3;

    _classCallCheck(this, DeletePopup);

    _this3 = _super2.call(this, updateTabIndexCallback);
    _this3.open = _this3.open.bind(_assertThisInitialized(_this3));
    _this3.submit = _this3.submit.bind(_assertThisInitialized(_this3));
    _this3.popupContainer = document.getElementById("popup-delete-container");
    _this3.popupWindow = document.getElementById("popup-delete-window");
    _this3.obj = undefined;
    _this3.deleteRecipeCallback = deleteRecipeCallback;
    document.getElementById("delete-ok-button").onclick = _this3.submit;
    document.getElementById("delete-cancel-button").onclick = _this3.close;
    return _this3;
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
  }, {
    key: "focus",
    value: function focus() {
      document.getElementById("delete-ok-button").focus();
    }
  }]);

  return DeletePopup;
}(Popup);