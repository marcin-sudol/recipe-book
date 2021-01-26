class RecipeWindow {
  constructor(
    openEditorCallback,
    openDeleteCallback,
    saveRecipeCallback,
    updateTabIndexCallback
  ) {
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
    this.hoverRatingOn = this.hoverRatingOn.bind(this);
    this.hoverRatingOff = this.hoverRatingOff.bind(this);
    this.recipeWindow = document.getElementById("recipe-window");
    this.recipeName = document.getElementById("recipe-name");
    this.ingredientsList = document.getElementById("ingredients-list");
    this.stepsList = document.getElementById("steps-list");
    this.recipeRatingButtons = [];
    for (let i = 1; i <= 5; i++) {
      this.recipeRatingButtons.push(
        document.getElementById("recipe-rating-" + i)
      );
    }
    this.obj = "undefined";
    this.visible = false;
    this.changing = false;
    this.animationTime = 400;
    this.openEditorCallback = openEditorCallback;
    this.openDeleteCallback = openDeleteCallback;
    this.saveRecipeCallback = saveRecipeCallback;
    this.updateTabIndexCallback = updateTabIndexCallback;
    document.getElementById("recipe-close-button").onclick = this.clickedClose;
    document.getElementById("recipe-edit-button").onclick = this.clickedEdit;
    document.getElementById(
      "recipe-delete-button"
    ).onclick = this.clickedDelete;
    for (let button of this.recipeRatingButtons) {
      button.onclick = this.clickedLocalRating;
      button.onmouseenter = this.hoverRatingOn;
      button.onmouseleave = this.hoverRatingOff;
    }
  }

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
    this.updateLocalRating();
  }

  updateLocalRating(style) {
    for (let i = 0; i < 5; i++)
      this.recipeRatingButtons[i].classList.remove("checked");

    if (this.obj.rating.hasOwnProperty("local")) {
      const localRating = parseInt(this.obj.rating.local);
      for (let i = 0; i < localRating; i++) {
        const button = this.recipeRatingButtons[i];
        button.classList.add("checked");

        if (style === "fade") {
          button.classList.remove("hovered");
          button.animate(
            {
              transform: ["scale(1.4)", "scale(1.0)"],
              opacity: [0, 1],
            },
            { duration: 600, easing: "ease-out" }
          );
        }
      }
    }
  }

  show(callback) {
    this.recipeWindow.style.display = "flex";
    this.visible = true;
    if (callback !== undefined) callback();
  }

  hide(callback) {
    this.recipeWindow.style.display = "none";
    this.visible = false;
    if (callback !== undefined) callback();
  }

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

  display(obj, styleOut, styleIn) {
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

  setTabIndex(tabIndex) {
    const buttons = this.recipeWindow.querySelectorAll("button");
    buttons.forEach((button) => {
      button.setAttribute("tabindex", tabIndex);
    });
  }

  enableTab() {
    this.setTabIndex("0");
  }

  disableTab() {
    this.setTabIndex("-1");
  }

  isVisible() {
    return this.visible;
  }

  clickedClose() {
    this.close("slide");
  }

  clickedEdit() {
    this.openEditorCallback(this.obj);
  }

  clickedDelete() {
    this.openDeleteCallback(this.obj);
  }

  clickedLocalRating(event) {
    let button;
    let localRating;
    if (event.target.tagName === "BUTTON") {
      button = event.target;
    } else if (event.target.parentElement.tagName === "BUTTON") {
      button = event.target.parentElement;
    }

    if (button !== undefined) {
      localRating = parseInt(button.dataset.id);
      if (this.obj.rating.hasOwnProperty("local")) {
        this.obj.rating.sum -= this.obj.rating.local;
        this.obj.rating.sum += localRating;
        this.obj.rating.local = localRating;
      } else {
        this.obj.rating.sum += localRating;
        this.obj.rating.local = localRating;
        this.obj.rating.votes += 1;
      }
      this.updateLocalRating("fade");
      this.saveRecipeCallback(this.obj);
    }
  }

  hoverRatingOn(event) {
    const rating = event.target.dataset.id;
    for (let i = 0; i < rating; i++)
      this.recipeRatingButtons[i].classList.add("hovered");
  }

  hoverRatingOff(event) {
    const rating = event.target.dataset.id;
    for (let i = 0; i < rating; i++)
      this.recipeRatingButtons[i].classList.remove("hovered");
  }
}
