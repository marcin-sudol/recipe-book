// -------------------------------------------------------
// UTILITIES
// -------------------------------------------------------
function log(str) {
  console.log(str);
}

// -------------------------------------------------------
// NAV
// -------------------------------------------------------
class Nav {
  constructor(
    arr,
    displayRecipeCallback,
    openEditorCallback,
    resetRecipesCallback
  ) {
    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);
    this.clickedAddRecipe = this.clickedAddRecipe.bind(this);
    this.clickedDisplayRecipe = this.clickedDisplayRecipe.bind(this);
    this.clickedResetList = this.clickedResetList.bind(this);
    this.showTooltip = this.showTooltip.bind(this);
    this.hideTooltip = this.hideTooltip.bind(this);
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

  show() {
    this.nav.classList.remove("hidden");
    this.recipeWindow.classList.add("narrower");
  }

  hide() {
    this.nav.classList.add("hidden");
    this.recipeWindow.classList.remove("narrower");
  }

  getRating(obj) {
    let rating;
    if (obj.rating.votes > 0)
      rating = (obj.rating.sum / obj.rating.votes).toFixed(1);
    else rating = "-";
    return rating;
  }

  addItem(obj) {
    const item = document.createElement("li");
    item.className = "nav-item";
    item.id = "nav-item-" + obj.id;
    item.dataset.id = obj.id;

    item.innerHTML = `<button class="nav-item-button" type="button">${
      obj.name
    }</button>
    <div class="nav-item-rating"><span class="rating-value">${this.getRating(
      obj
    )}</span><div class="rating-tooltip">${obj.rating.votes} votes</div>
    </div>`;
    this.navList.appendChild(item);

    item.querySelector(".nav-item-button").onclick = this.clickedDisplayRecipe;

    item.querySelector(".nav-item-rating").onmouseenter = this.showTooltip;
    item.querySelector(".nav-item-rating").onmouseleave = this.hideTooltip;
  }

  updateItem(obj) {
    const item = document.getElementById("nav-item-" + obj.id);
    item.querySelector(".nav-item-button").textContent = obj.name;
    item.querySelector(".rating-value").textContent = this.getRating(obj);
    item.querySelector(".rating-tooltip").textContent =
      obj.rating.votes + " votes";
  }

  removeItem(obj) {
    const item = document.getElementById("nav-item-" + obj.id);
    item
      .animate(
        [
          { opacity: 1 },
          { opacity: 0, maxHeight: "50px", marginBottom: "20px" },
          { opacity: 0, maxHeight: "0px", marginBottom: "0px" },
        ],
        { duration: 400 }
      )
      .finished.then(() => {
        item.remove();
      });
  }

  addList(arr, styleIn) {
    arr.forEach((obj) => this.addItem(obj));
    if (styleIn === "fade") {
      this.navList.animate(
        {
          opacity: [0, 1],
        },
        {
          duration: 400,
          easing: "ease-out",
        }
      );
    }
  }

  clearList() {
    while (this.navList.childElementCount > 0) {
      this.navList.removeChild(this.navList.lastElementChild);
    }
  }

  updateList(arr, styleIn) {
    this.clearList();
    this.addList(arr, styleIn);
  }

  clickedAddRecipe() {
    this.openEditorCallback();
  }

  clickedDisplayRecipe(event) {
    const id = parseInt(event.target.parentElement.dataset.id);
    this.displayRecipeCallback(id);
  }

  clickedResetList() {
    this.resetRecipesCallback();
  }

  showTooltip(event) {
    const tooltip = event.target.querySelector(".rating-tooltip");
    const targetRect = event.target.getBoundingClientRect();
    tooltip.classList.add("visible");
    tooltip.style.left = targetRect.left - tooltip.clientWidth + 10 + "px";
    tooltip.style.top = targetRect.bottom - 25 + "px";
  }

  hideTooltip(event) {
    const tooltip = event.target.querySelector(".rating-tooltip");
    tooltip.classList.remove("visible");
  }
}
// -------------------------------------------------------
// RECIPE WINDOW
// -------------------------------------------------------
class RecipeWindow {
  constructor(openEditorCallback, openDeleteCallback, saveRecipeCallback) {
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
      newItem = document.createElement("li");
      newItem.className = "ingredients-item";
      newItem.textContent = ingredient;
      this.ingredientsList.appendChild(newItem);
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
      functionOut();

      setTimeout(() => {
        this.changing = false;
      }, this.animationTime);
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

      if (!this.visible) {
        this.update(obj);
        functionIn(() => {
          this.changing = false;
        });
      } else if (obj !== this.obj) {
        functionOut(() => {
          this.update(obj);
          functionIn(() => {
            this.changing = false;
          });
        });
      }
    }
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

// -------------------------------------------------------
// POPUP - GENERAL CLASS (TO BE EXTENDED)
// -------------------------------------------------------
class Popup {
  constructor() {
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    // should be assigned in extending class
    this.popupContainer = undefined;
    this.popupWindow = undefined;
  }

  open() {
    this.popupContainer.classList.add("visible");
    this.popupWindow.style.display = "flex";
    this.popupWindow.animate(
      {
        opacity: [0, 1],
        transform: ["translateY(-100px)", "translateY(0px)"],
      },
      { duration: 400, easing: "ease-out" }
    );
  }

  close() {
    this.popupWindow.style.display = "none";
    this.popupContainer.classList.remove("visible");
  }
}

// -------------------------------------------------------
// EDIT POPUP
// -------------------------------------------------------
class EditPopup extends Popup {
  constructor(saveRecipeCallback) {
    super();
    this.addStep = this.addStep.bind(this);
    this.removeStep = this.removeStep.bind(this);
    this.clear = this.clear.bind(this);
    this.submit = this.submit.bind(this);
    this.popupContainer = document.getElementById("popup-edit-container");
    this.popupWindow = document.getElementById("popup-edit-window");
    this.popupEditForm = document.getElementById("popup-edit-form");
    this.inputStepsList = document.getElementById("input-steps-list");
    this.formValidationWarning = document.getElementById(
      "form-validation-warning"
    );
    this.obj = undefined;
    this.saveRecipeCallback = saveRecipeCallback;
    document.getElementById("add-step-button").onclick = this.addStep;
    document.getElementById("remove-step-button").onclick = this.removeStep;
    document.getElementById("edit-ok-button").onclick = this.submit;
    document.getElementById("edit-clear-button").onclick = this.clear;
    document.getElementById("edit-cancel-button").onclick = this.close;
    this.addStep();
  }

  open(obj) {
    this.obj = obj;
    if (obj === undefined) {
      this.clear();
    } else {
      this.clearValidation();
      this.load();
    }
    super.open();
  }

  addStep() {
    const item = document.createElement("li");
    item.className = "input-steps-item";
    const nextId = this.inputStepsList.childElementCount + 1;
    item.innerHTML = `<input type="text" class="input-step-name" id="input-step-${nextId}" placeholder="Enter step">
    <div class="input-step-break"></div>
    <label class="input-time-label" for="input-time-${nextId}"><i class="far fa-clock"></i><span>minutes:</span></label>
    <input class="input-step-time" id="input-time-${nextId}" type="number" placeholder="min" min="5" max="180" step="5">`;
    this.inputStepsList.appendChild(item);

    item.animate(
      [
        { opacity: 0, maxHeight: "0px" },
        { opacity: 0, maxHeight: "100px" },
        { opacity: 1 },
      ],
      {
        duration: 100,
        easing: "ease-in",
      }
    );
  }

  removeStep() {
    if (this.inputStepsList.childElementCount > 1) {
      const item = this.inputStepsList.lastElementChild;

      item
        .animate(
          [
            { opacity: 1 },
            { opacity: 0, maxHeight: "100px" },
            { opacity: 0, maxHeight: "0px" },
          ],
          {
            duration: 100,
            easing: "ease-out",
          }
        )
        .finished.then(() => {
          this.inputStepsList.removeChild(item);
        });
    }
  }

  removeAllSteps() {
    while (this.inputStepsList.childElementCount > 1) {
      this.inputStepsList.removeChild(this.inputStepsList.lastElementChild);
    }
  }

  load() {
    if (this.obj !== undefined) {
      this.removeAllSteps();
      document.getElementById("input-name").value = this.obj.name;
      document.getElementById("input-ingredients").value = this.obj.ingredients;
      for (let i = 1; i < this.obj.steps.length; i++) {
        this.addStep();
      }
      for (let i = 0; i < this.obj.steps.length; i++) {
        document.getElementById("input-step-" + (i + 1)).value = this.obj.steps[
          i
        ].name;
        document.getElementById("input-time-" + (i + 1)).value = this.obj.steps[
          i
        ].time;
      }
    }
  }

  clear() {
    this.clearValidation();
    this.removeAllSteps();
    const fields = this.popupEditForm.querySelectorAll("input, textarea");
    for (let elem of fields) {
      elem.value = "";
    }
  }

  validate() {
    const fields = this.popupEditForm.querySelectorAll("input, textarea");
    const minutes = this.popupEditForm.getElementsByClassName("input-time");
    let result = true;
    for (let elem of fields) {
      elem.classList.remove("incorrect");
      if (elem.value === "" || elem.value === undefined) {
        elem.classList.add("incorrect");
        result = false;
      }
    }

    for (let elem of minutes) {
      let val = parseInt(elem.value);
      if (Number.isInteger(val))
        if (val < elem.min || val > elem.max) {
          elem.classList.add("incorrect");
          result = false;
        }
    }

    if (!result) this.formValidationWarning.classList.add("visible");
    else this.formValidationWarning.classList.remove("visible");
    return result;
  }

  clearValidation() {
    this.formValidationWarning.classList.remove("visible");
    const fields = this.popupEditForm.querySelectorAll("input, textarea");
    for (let elem of fields) {
      elem.classList.remove("incorrect");
    }
  }

  export() {
    const newObj = {
      name: document.getElementById("input-name").value,
      ingredients: document.getElementById("input-ingredients").value,
      steps: [],
    };
    if (this.obj !== undefined) {
      newObj.id = this.obj.id;
      newObj.rating = Object.assign({}, this.obj.rating);
    } else {
      newObj.rating = { sum: 0, votes: 0 };
    }
    for (let i = 0; i < this.inputStepsList.childElementCount; i++) {
      newObj.steps.push({
        name: document.getElementById("input-step-" + (i + 1)).value,
        time: document.getElementById("input-time-" + (i + 1)).value,
      });
    }
    return newObj;
  }

  submit() {
    if (this.validate()) {
      this.close();
      this.saveRecipeCallback(this.export());
    }
  }
}

// -------------------------------------------------------
// DELETE POPUP
// -------------------------------------------------------
class DeletePopup extends Popup {
  constructor(deleteRecipeCallback) {
    super();
    this.open = this.open.bind(this);
    this.submit = this.submit.bind(this);
    this.popupContainer = document.getElementById("popup-delete-container");
    this.popupWindow = document.getElementById("popup-delete-window");
    this.obj = undefined;
    this.deleteRecipeCallback = deleteRecipeCallback;
    document.getElementById("delete-ok-button").onclick = this.submit;
    document.getElementById("delete-cancel-button").onclick = this.close;
  }

  open(obj) {
    this.obj = obj;
    super.open();
  }

  submit() {
    this.close();
    this.deleteRecipeCallback(this.obj);
  }
}

// -------------------------------------------------------
// MAIN APP
// -------------------------------------------------------
class MainApp {
  constructor(arr) {
    this.deleteRecipe = this.deleteRecipe.bind(this);
    this.saveRecipe = this.saveRecipe.bind(this);
    this.resetRecipes = this.resetRecipes.bind(this);
    this.displayRecipe = this.displayRecipe.bind(this);
    this.openEditor = this.openEditor.bind(this);
    this.openDelete = this.openDelete.bind(this);
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
    this.nav = new Nav(
      this.arr,
      this.displayRecipe,
      this.openEditor,
      this.resetRecipes
    );

    this.recipeWindow = new RecipeWindow(
      this.openEditor,
      this.openDelete,
      this.saveRecipe
    );

    this.editPopup = new EditPopup(this.saveRecipe);
    this.deletePopup = new DeletePopup(this.deleteRecipe);
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

  openEditor(obj) {
    this.editPopup.open(obj);
  }

  openDelete(obj) {
    this.deletePopup.open(obj);
  }
}

let recipes = [
  {
    id: 0,
    name: "Cookies",
    ingredients: "powder, sugar, milk, cocoa",
    steps: [
      {
        name: "Prepare dough",
        time: 15,
      },
      {
        name: "Form cookies",
        time: 15,
      },
      {
        name: "Cook",
        time: 45,
      },
    ],
    rating: {
      sum: 28,
      votes: 6,
      local: 2,
    },
  },

  {
    id: 1,
    name: "Soup",
    ingredients: "water, wegetables, pasta, potatos, mushrooms",
    steps: [
      {
        name: "Wash wegetables",
        time: 5,
      },
      {
        name: "Cut vegetables",
        time: 20,
      },
      {
        name: "Cook soup",
        time: 60,
      },
    ],
    rating: {
      sum: 45,
      votes: 12,
      local: 4,
    },
  },
  {
    id: 2,
    name: "Ice cream",
    ingredients: "milk, sugar, fruits",
    steps: [
      {
        name: "Prepare",
        time: 20,
      },
      {
        name: "Insert into freezer",
        time: 120,
      },
    ],
    rating: {
      sum: 17,
      votes: 5,
    },
  },
];

window.addEventListener("load", () => {
  const app = new MainApp(recipes);
});
