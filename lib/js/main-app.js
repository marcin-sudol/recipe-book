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
    this.keyPressed = this.keyPressed.bind(this);
    this.windowResized = this.windowResized.bind(this);
    this.updateTabIndex = this.updateTabIndex.bind(this);
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

    this.nav = new Nav(this.arr, this.displayRecipe, this.openEditor, this.resetRecipes, this.updateTabIndex);
    this.recipeWindow = new RecipeWindow(this.openEditor, this.openDelete, this.saveRecipe, this.updateTabIndex);
    this.editPopup = new EditPopup(this.saveRecipe, this.updateTabIndex);
    this.deletePopup = new DeletePopup(this.deleteRecipe, this.updateTabIndex);
    this.message = new Message();
    document.addEventListener("keydown", this.keyPressed);
    this.resizeTimeout = undefined;
    window.addEventListener("resize", this.windowResized);
  }

  _createClass(MainApp, [{
    key: "addRecipe",
    value: function addRecipe(obj) {
      this.arr.push(obj);
      this.saveRecipesToLocalMemory();
      this.nav.addItem(obj);
      this.recipeWindow.open(obj, "slide", "slide");
      this.message.displayMessage("Recipe added!");
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
      this.message.displayMessage("Recipe removed!");
    }
  }, {
    key: "saveRecipe",
    value: function saveRecipe(obj) {
      // recipe doesn't have id so its new
      if (!obj.hasOwnProperty("id")) {
        obj.id = this.arr.length > 0 ? this.arr[this.arr.length - 1].id + 1 : 0;
        this.addRecipe(obj);
      } // recipe has id so it exists
      else {
          var index = this.arr.findIndex(function (item) {
            return item.id === obj.id;
          });
          this.arr[index] = obj;
          this.saveRecipesToLocalMemory();
          this.nav.updateItem(obj);
          this.recipeWindow.open(obj, "no", "fade");
          this.message.displayMessage("Recipe saved!");
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
      this.recipeWindow.open(obj, "slide", "slide");
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
  }, {
    key: "keyPressed",
    value: function keyPressed(event) {
      if (event.code === KEY_ESCAPE & !this.recipeWindow.changing) {
        if (this.editPopup.visible) {
          event.preventDefault();
          this.editPopup.close();
        } else if (this.deletePopup.visible) {
          event.preventDefault();
          this.deletePopup.close();
        } else if (this.recipeWindow.visible) {
          event.preventDefault();
          this.recipeWindow.close("slide");
        } else if (this.nav.visible && wideWindow()) {
          event.preventDefault();
          this.nav.hide();
        }
      }
    }
  }, {
    key: "windowResized",
    value: function windowResized() {
      clearTimeout(this.resizeTimeout);
      this.resizeTimeout = setTimeout(this.updateTabIndex, 100);
    } // manage tabs for entire application here
    // checks what is visible and update tabindex

  }, {
    key: "updateTabIndex",
    value: function updateTabIndex() {
      // we don't control manually tabs for popups
      if (this.editPopup.visible || this.deletePopup.visible) {
        // if popup is visible disable anything else
        this.nav.disableTab();
        this.recipeWindow.disableTab();

        if (this.editPopup.visible) {
          this.editPopup.focus();
        } else {
          this.deletePopup.focus();
        }
      } else if (this.recipeWindow.visible) {
        // otherwise if recipe window is visible, enable it
        this.recipeWindow.enableTab();
        this.recipeWindow.focus(); // and set nav depending on screen width

        if (wideWindow()) {
          this.nav.enableTab();
        } else {
          this.nav.disableTab();
        }
      } else {
        // otherwise disable recipe window
        this.recipeWindow.disableTab();
        this.nav.enableTab();
        this.nav.focus();
      }
    }
  }]);

  return MainApp;
}();