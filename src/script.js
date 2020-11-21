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
  constructor(arr, displayRecipeCallback, openEditorToAddCallback) {
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
    arr.forEach((obj) => this.add(obj));
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

  show() {
    this.nav.classList.remove("hidden");
    this.recipeWindow.classList.add("narrower");
  }

  hide() {
    this.nav.classList.add("hidden");
    this.recipeWindow.classList.remove("narrower");
  }

  add(obj) {
    const item = document.createElement("li");
    item.className = "nav-item";
    item.id = "nav-item-" + obj.id;
    item.dataset.id = obj.id;

    let rating;
    if (obj.rating.votes > 0)
      rating = (obj.rating.sum / obj.rating.votes).toFixed(1);
    else rating = "-";

    item.innerHTML = `<button class="nav-item-button" type="button">${obj.name}</button>
    <div class="nav-item-rating">${rating}<div class="rating-tooltip">${obj.rating.votes} votes</div>
    </div>`;
    this.navList.appendChild(item);

    item.querySelector(".nav-item-button").onclick = this.clickedDisplay;
  }

  update(obj) {
    const button = document
      .getElementById("nav-item-" + obj.id)
      .querySelector(".nav-item-button");
    button.textContent = obj.name;
  }

  remove(obj) {
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

  clickedAdd() {
    this.openEditorToAddCallback();
  }

  clickedDisplay(event) {
    const id = parseInt(event.target.parentElement.dataset.id);
    this.displayRecipeCallback(id);
  }
}
// -------------------------------------------------------
// RECIPE WINDOW
// -------------------------------------------------------
class RecipeWindow {
  constructor(openEditorToEditCallback, openDeleteCallback) {
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
    document.getElementById(
      "recipe-delete-button"
    ).onclick = this.clickedDelete;
  }

  update(obj) {
    this.obj = obj;

    const recipeName = document.getElementById("recipe-name");
    recipeName.innerHTML = this.obj.name;

    const ingredients = document.getElementById("ingredients-list");
    ingredients.innerHTML = "";
    this.obj.ingredients.split(",").forEach((ingredient) => {
      const itemIngredient = document.createElement("li");
      itemIngredient.className = "ingredients-item";
      itemIngredient.textContent = ingredient;
      ingredients.appendChild(itemIngredient);
    });

    const steps = document.getElementById("steps-list");
    steps.innerHTML = "";
    this.obj.steps.forEach((step) => {
      let itemStep = document.createElement("li");
      itemStep.className = "steps-item";
      itemStep.innerHTML = `<span class="step-name">${step.name}</span>
      <span class="step-time">
      <i class="far fa-clock"></i> ${step.time} min.
      </span>`;
      steps.appendChild(itemStep);
    });
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
    this.openEditorToEditCallback(this.obj);
  }

  clickedDelete() {
    this.openDeleteCallback(this.obj);
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
    this.popupWindow.style.display = "block";
    this.popupWindow.animate(
      {
        opacity: [0, 1],
        transform: ["translateY(-200px)", "translateY(0px)"],
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
    this.openToAdd = this.openToAdd.bind(this);
    this.openToEdit = this.openToEdit.bind(this);
    this.addStep = this.addStep.bind(this);
    this.removeStep = this.removeStep.bind(this);
    this.clear = this.clear.bind(this);
    this.submit = this.submit.bind(this);
    this.popupContainer = document.getElementById("popup-edit-container");
    this.popupWindow = document.getElementById("popup-edit-window");
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

  openToAdd() {
    this.obj = undefined;
    this.clear();
    this.open();
  }

  openToEdit(obj) {
    this.obj = obj;
    this.load();
    this.open();
  }

  addStep() {
    const item = document.createElement("li");
    item.className = "input-steps-item";
    const nextId = this.inputStepsList.childElementCount + 1;
    item.innerHTML = `<input type="text" class="input-step" id="input-step-${nextId}">
    <label class="input-time-label" for="input-time-${nextId}">minutes:</label>
    <input class="input-time" id="input-time-${nextId}" type="number" min="5" max="180" step="5">`;
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
    this.removeAllSteps();
    this.formValidationWarning.classList.remove("visible");
    const fields = document
      .getElementById("popup-edit-form")
      .querySelectorAll("input, textarea");
    for (let elem of fields) {
      elem.value = "";
      elem.classList.remove("incorrect");
    }
  }

  validate() {
    const fields = document
      .getElementById("popup-edit-form")
      .querySelectorAll("input, textarea");
    const minutes = document
      .getElementById("popup-edit-form")
      .getElementsByClassName("input-time");
    let result = true;
    for (let elem of fields) {
      elem.classList.remove("incorrect");
      if (elem.value === "" || elem.value === undefined) {
        elem.classList.add("incorrect");
        result = false;
      }
    }
    // for (let elem of minutes) {
    //   if (elem.value < elem.min || elem.value > elem.max) {
    //     elem.classList.add("incorrect");
    //     result = false;
    //   }
    // }
    if (!result) this.formValidationWarning.classList.add("visible");
    else this.formValidationWarning.classList.remove("visible");
    return result;
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
    const steps = document.getElementById("input-steps-list");
    for (let i = 0; i < steps.childElementCount; i++) {
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
    this.displayRecipe = this.displayRecipe.bind(this);
    this.openEditorToAdd = this.openEditorToAdd.bind(this);
    this.openEditorToEdit = this.openEditorToEdit.bind(this);
    this.openDelete = this.openDelete.bind(this);
    this.startingArray = arr;
    this.storage = window.localStorage;
    const storedArr = this.storage.getItem("recipes");
    if (storedArr === null) {
      // no data in local storate
      this.arr = this.startingArray.slice();
      this.saveRecipesToLocalMemory();
    } else {
      // data in local storage
      this.arr = JSON.parse(storedArr);
    }
    this.nav = new Nav(this.arr, this.displayRecipe, this.openEditorToAdd);

    this.recipeWindow = new RecipeWindow(
      this.openEditorToEdit,
      this.openDelete
    );

    this.editPopup = new EditPopup(this.saveRecipe);
    this.deletePopup = new DeletePopup(this.deleteRecipe);
  }

  addRecipe(obj) {
    this.arr.push(obj);
    this.saveRecipesToLocalMemory();
    this.nav.add(obj);
    this.recipeWindow.display(obj, "no", "fade");
  }

  deleteRecipe(obj) {
    this.arr = this.arr.filter((item) => item !== obj);
    this.saveRecipesToLocalMemory();
    this.recipeWindow.close("fade");
    this.nav.remove(obj);
  }

  saveRecipe(obj) {
    if (!obj.hasOwnProperty("id")) {
      obj.id = this.arr[this.arr.length - 1].id + 1;
      this.addRecipe(obj);
    } else {
      const index = this.arr.findIndex((item) => item.id === obj.id);
      this.arr[index] = obj;
      this.saveRecipesToLocalMemory();
      this.nav.update(obj);
      this.recipeWindow.display(obj, "no", "fade");
    }
  }

  saveRecipesToLocalMemory() {
    this.storage.setItem("recipes", JSON.stringify(this.arr));
  }

  displayRecipe(id) {
    const obj = this.arr.find((item) => item.id === id);
    this.recipeWindow.display(obj, "slide", "slide");
  }

  openEditorToAdd() {
    this.editPopup.openToAdd();
  }

  openEditorToEdit(obj) {
    this.editPopup.openToEdit(obj);
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
