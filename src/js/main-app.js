class MainApp {
  constructor(arr) {
    this.deleteRecipe = this.deleteRecipe.bind(this);
    this.saveRecipe = this.saveRecipe.bind(this);
    this.resetRecipes = this.resetRecipes.bind(this);
    this.displayRecipe = this.displayRecipe.bind(this);
    this.showNav = this.showNav.bind(this);
    this.openEditor = this.openEditor.bind(this);
    this.openDelete = this.openDelete.bind(this);
    this.keyPressed = this.keyPressed.bind(this);
    this.windowResized = this.windowResized.bind(this);
    this.updateTabIndex = this.updateTabIndex.bind(this);
    this.startingArrayString = JSON.stringify(arr);
    this.storage = window.localStorage;
    const storedArr = this.storage.getItem("recipes");
    if (storedArr === null) {
      // no data in local storate
      this.arr = JSON.parse(this.startingArrayString);
      this.saveRecipesToLocalMemory();
    } else {
      // data in local storage
      this.arr = JSON.parse(storedArr);
    }

    this.bg = new Bg(this.showNav);

    this.nav = new Nav(
      this.arr,
      this.displayRecipe,
      this.openEditor,
      this.resetRecipes,
      this.updateTabIndex
    );

    this.recipeWindow = new RecipeWindow(
      this.openEditor,
      this.openDelete,
      this.saveRecipe,
      this.updateTabIndex
    );

    this.editPopup = new EditPopup(this.saveRecipe, this.updateTabIndex);

    this.deletePopup = new DeletePopup(this.deleteRecipe, this.updateTabIndex);

    document.addEventListener("keydown", this.keyPressed);

    this.resizeTimeout = undefined;
    window.addEventListener("resize", this.windowResized);
  }

  addRecipe(obj) {
    this.arr.push(obj);
    this.saveRecipesToLocalMemory();
    this.nav.addItem(obj);
    this.recipeWindow.display(obj, "slide", "slide");
  }

  deleteRecipe(obj) {
    this.arr = this.arr.filter((item) => item !== obj);
    this.saveRecipesToLocalMemory();
    this.recipeWindow.close("fade");
    this.nav.removeItem(obj);
  }

  saveRecipe(obj) {
    if (!obj.hasOwnProperty("id")) {
      obj.id = this.arr[this.arr.length - 1].id + 1;
      this.addRecipe(obj);
    } else {
      const index = this.arr.findIndex((item) => item.id === obj.id);
      this.arr[index] = obj;
      this.saveRecipesToLocalMemory();
      this.nav.updateItem(obj);
      this.recipeWindow.display(obj, "no", "fade");
    }
  }

  saveRecipesToLocalMemory() {
    this.storage.setItem("recipes", JSON.stringify(this.arr));
  }

  resetRecipes() {
    this.recipeWindow.close("fade");
    this.arr = JSON.parse(this.startingArrayString);
    this.saveRecipesToLocalMemory();
    this.nav.updateList(this.arr, "fade");
  }

  displayRecipe(id) {
    const obj = this.arr.find((item) => item.id === id);
    this.recipeWindow.display(obj, "slide", "slide");
  }

  showNav() {
    this.nav.show();
  }

  openEditor(obj) {
    this.editPopup.open(obj);
  }

  openDelete(obj) {
    this.deletePopup.open(obj);
  }

  keyPressed(event) {
    if ((event.code === "Escape") & !this.recipeWindow.changing) {
      if (this.editPopup.isVisible()) {
        event.preventDefault();
        this.editPopup.close();
      } else if (this.deletePopup.isVisible()) {
        event.preventDefault();
        this.deletePopup.close();
      } else if (this.recipeWindow.isVisible()) {
        event.preventDefault();
        this.recipeWindow.close("slide");
      } else if (this.nav.isVisible() && wideWindow()) {
        event.preventDefault();
        this.nav.hide();
      }
    }
  }

  windowResized() {
    clearTimeout(this.resizeTimeout);
    this.resizeTimeout = setTimeout(this.updateTabIndex, 100);
  }

  // manage tabs for entire application here
  // checks what is visible and update tabindex
  updateTabIndex() {
    // we don't control manually tabs for popups
    if (this.editPopup.isVisible() || this.deletePopup.isVisible()) {
      // if popup is visible disable anything else
      this.bg.disableTab();
      this.nav.disableTab();
      this.recipeWindow.disableTab();
    } else if (this.recipeWindow.isVisible()) {
      // otherwise if recipe window is visible, enable it
      this.recipeWindow.enableTab();
      // and set nav and bg depending on screen width and nav visibility
      if (!wideWindow()) {
        this.bg.disableTab();
        this.nav.disableTab();
      } else if (this.nav.isVisible()) {
        this.bg.disableTab();
        this.nav.enableTab();
      } else {
        this.bg.enableTab();
        this.nav.disableTab();
      }
    } else {
      // otherwise disable recipe window
      this.recipeWindow.disableTab();
      // and set nav and bg depending on screen width and nav visibility
      if (!wideWindow() || this.nav.isVisible()) {
        this.bg.disableTab();
        this.nav.enableTab();
      } else {
        this.bg.enableTab();
        this.nav.disableTab();
      }
    }
  }
}
