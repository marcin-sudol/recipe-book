class RecipeWindow {
  constructor(
    openEditorCallback,
    openDeleteCallback,
    saveRecipeCallback,
    updateTabIndexCallback
  ) {
    // Saving callbacks
    this.openEditorCallback = openEditorCallback;
    this.openDeleteCallback = openDeleteCallback;
    this.saveRecipeCallback = saveRecipeCallback;
    this.updateTabIndexCallback = updateTabIndexCallback;

    // Setting DOM elements
    this.recipeWindow = document.getElementById("recipe-window");
    this.recipeName = document.getElementById("recipe-name");
    this.ingredientsList = document.getElementById("ingredients-list");
    this.stepsList = document.getElementById("steps-list");

    // Binding methods
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this.slideIn = this.slideIn.bind(this);
    this.slideOut = this.slideOut.bind(this);
    this.fadeIn = this.fadeIn.bind(this);
    this.fadeOut = this.fadeOut.bind(this);
    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);
    this.clickedClose = this.clickedClose.bind(this);
    this.clickedEdit = this.clickedEdit.bind(this);
    this.clickedDelete = this.clickedDelete.bind(this);
    this.saveRating = this.saveRating.bind(this);

    // Setting additional properties
    this.obj = undefined;
    this.rating = new RecipeRating(this.saveRating);
    this.visible = false;
    this.changing = false;
    this.animationTime = 400;

    // Adding events listeners
    document.getElementById("recipe-close-button").onclick = this.clickedClose;
    document.getElementById("recipe-edit-button").onclick = this.clickedEdit;
    document.getElementById(
      "recipe-delete-button"
    ).onclick = this.clickedDelete;
  }

  // ----------------------------------------------------------------
  // Managing visibility and displayed recipe
  // ----------------------------------------------------------------

  // Open window with given recipe (as object) and given animation style
  // if window already opened, first close window and update displayed recipe
  open(obj, styleOut, styleIn) {
    if (!this.changing && (!this.visible || obj !== this.obj)) {
      this.changing = true;

      let functionOut, functionIn;
      if (styleOut === "no") functionOut = this.hide;
      else if (styleOut === "fade") functionOut = this.fadeOut;
      else functionOut = this.slideOut;

      if (styleIn === "no") functionIn = this.show;
      else if (styleIn === "fade") functionIn = this.fadeIn;
      else functionIn = this.slideIn;

      // if window not visible update recipe and display
      if (!this.visible) {
        this.update(obj);
        functionIn(() => {
          this.changing = false;
          this.updateTabIndexCallback();
        });
      }
      // if window visible and showing incorrect recipe
      // hide window, update recipe and show window
      else if (obj !== this.obj) {
        functionOut(() => {
          this.update(obj);
          functionIn(() => {
            this.changing = false;
            this.updateTabIndexCallback();
          });
        });
      }
    }
  }

  // Close window with selected animation style
  close(styleOut) {
    if (this.visible) {
      let functionOut;
      if (styleOut === "fade") functionOut = this.fadeOut;
      else functionOut = this.slideOut;

      this.changing = true;
      functionOut(() => {
        this.changing = false;
        this.updateTabIndexCallback();
      });
    }
  }

  // Update informations diplayed in window with passed object
  update(obj) {
    let newItem;
    this.obj = obj;
    this.recipeName.innerHTML = this.obj.name;

    this.ingredientsList.innerHTML = "";
    this.obj.ingredients.split(",").forEach((ingredient) => {
      if (ingredient) {
        newItem = document.createElement("li");
        newItem.className = "ingredients-item";
        newItem.textContent = ingredient;
        this.ingredientsList.appendChild(newItem);
      }
    });

    this.stepsList.innerHTML = "";
    this.obj.steps.forEach((step) => {
      newItem = document.createElement("li");
      newItem.className = "steps-item";
      newItem.innerHTML = `<span class="step-name">${step.name}</span>
      <span class="step-time">
      <i class="far fa-clock"></i> ${step.time} min.
      </span>`;
      this.stepsList.appendChild(newItem);
    });
    this.rating.update();

    const itemRating = this.obj.rating.hasOwnProperty("local")
      ? this.obj.rating.local
      : 0;
    this.rating.update(itemRating, "no");
  }

  // ----------------------------------------------------------------
  // Helper methods for visibility
  // ----------------------------------------------------------------

  // Animate window -> slide in and make visible
  slideIn(callback) {
    this.recipeWindow.style.display = "flex";
    this.recipeWindow
      .animate(
        {
          transform: ["translateX(-20vw)", "translateX(0px)"],
          opacity: [0, 1],
        },
        { duration: this.animationTime, easing: "ease-out" }
      )
      .finished.then(() => {
        this.show(callback);
      });
  }

  // Animate window -> slide out and make hidden
  slideOut(callback) {
    this.recipeWindow
      .animate(
        {
          transform: ["translateX(0px)", "translateX(-20vw)"],
          opacity: [1, 0],
        },
        { duration: this.animationTime, easing: "ease-out" }
      )
      .finished.then(() => {
        this.hide(callback);
      });
  }

  // Animate window -> fade in and make visible
  fadeIn(callback) {
    this.recipeWindow.style.display = "flex";
    this.recipeWindow
      .animate(
        { opacity: [0, 1] },
        { duration: this.animationTime, easing: "ease-out" }
      )
      .finished.then(() => {
        this.show(callback);
      });
  }

  // Animate window -> fade out and make visible
  fadeOut(callback) {
    this.recipeWindow
      .animate(
        { opacity: [1, 0] },
        { duration: this.animationTime, easing: "ease-out" }
      )
      .finished.then(() => {
        this.hide(callback);
      });
  }

  // Make window visible
  show(callback) {
    this.recipeWindow.style.display = "flex";
    this.visible = true;
    this.recipeName.focus();
    if (callback !== undefined) callback();
  }

  // Make window hidden
  hide(callback) {
    this.recipeWindow.style.display = "none";
    this.visible = false;
    if (callback !== undefined) callback();
  }

  // Checks if window is visible
  isVisible() {
    return this.visible;
  }

  // ----------------------------------------------------------------
  // Saving rating to recipe
  // ----------------------------------------------------------------

  saveRating(rating) {
    if (this.obj.rating.hasOwnProperty("local")) {
      // existing rating modified
      this.obj.rating.sum -= this.obj.rating.local;
      this.obj.rating.sum += rating;
      this.obj.rating.local = rating;
    } else {
      // new rating added
      this.obj.rating.sum += rating;
      this.obj.rating.local = rating;
      this.obj.rating.votes += 1;
    }
    this.saveRecipeCallback(this.obj);
  }

  // ----------------------------------------------------------------
  // Managing interactions with tab key
  // ----------------------------------------------------------------

  // Enable interaction with tab key
  enableTab() {
    this.setTabIndex("0");
  }

  // Disable interaction with tab key
  disableTab() {
    this.setTabIndex("-1");
  }

  // Set tabindex for all interactive elements on component
  setTabIndex(tabIndex) {
    const buttons = this.recipeWindow.querySelectorAll("button");
    buttons.forEach((button) => {
      button.setAttribute("tabindex", tabIndex);
    });
  }

  // ----------------------------------------------------------------
  // Event handlers
  // ----------------------------------------------------------------

  // Clicked close window
  clickedClose() {
    this.close("slide");
  }

  // Clicked edit recipe
  clickedEdit() {
    this.openEditorCallback(this.obj);
  }

  // Clicked delete recipe
  clickedDelete() {
    this.openDeleteCallback(this.obj);
  }
}
