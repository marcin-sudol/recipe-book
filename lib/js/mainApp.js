"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var MainApp = /*#__PURE__*/function () {
  function MainApp(arr) {
    _classCallCheck(this, MainApp);

    this.deleteRecipe = this.deleteRecipe.bind(this);
    this.saveRecipe = this.saveRecipe.bind(this);
    this.resetRecipes = this.resetRecipes.bind(this);
    this.displayRecipe = this.displayRecipe.bind(this);
    this.openEditor = this.openEditor.bind(this);
    this.openDelete = this.openDelete.bind(this);
    this.popupClosed = this.popupClosed.bind(this);
    this.keyPressed = this.keyPressed.bind(this);
    this.startingArrayString = JSON.stringify(arr);
    this.storage = window.localStorage;
    var storedArr = this.storage.getItem("recipes");

    if (storedArr === null) {
      // no data in local storate
      this.arr = JSON.parse(this.startingArrayString);
      this.saveRecipesToLocalMemory();
    } else {
      // data in local storage
      this.arr = JSON.parse(storedArr);
    }

    this.nav = new Nav(this.arr, this.displayRecipe, this.openEditor, this.resetRecipes);
    this.recipeWindow = new RecipeWindow(this.openEditor, this.openDelete, this.saveRecipe);
    this.editPopup = new EditPopup(this.popupClosed, this.saveRecipe);
    this.deletePopup = new DeletePopup(this.popupClosed, this.deleteRecipe);
    document.addEventListener("keydown", this.keyPressed);
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
      this.arr = JSON.parse(this.startingArrayString);
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
      this.nav.disableTab();
      this.recipeWindow.disableTab();
      this.editPopup.open(obj);
    }
  }, {
    key: "openDelete",
    value: function openDelete(obj) {
      this.nav.disableTab();
      this.recipeWindow.disableTab();
      this.deletePopup.open(obj);
    }
  }, {
    key: "popupClosed",
    value: function popupClosed() {
      this.nav.enableTab();
      this.recipeWindow.enableTab();
    }
  }, {
    key: "keyPressed",
    value: function keyPressed(event) {
      if (event.code === "Escape" & !this.recipeWindow.changing) {
        if (this.editPopup.isOpened()) {
          event.preventDefault();
          this.editPopup.close();
        } else if (this.deletePopup.isOpened()) {
          event.preventDefault();
          this.deletePopup.close();
        } else if (this.recipeWindow.isVisible()) {
          event.preventDefault();
          this.recipeWindow.close("slide");
        } else if (this.nav.isVisible()) {
          event.preventDefault();
          this.nav.hide();
        }
      }
    }
  }]);

  return MainApp;
}();