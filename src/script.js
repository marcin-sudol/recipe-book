// -------------------------------------------------------
// UTILITIES
// -------------------------------------------------------
function log(str) {
  console.log(str);
}

// -------------------------------------------------------
// RECIPE WINDOW
// -------------------------------------------------------
class MainWindow {
  constructor(openEditorToEditCallback, openDeleteCallback) {
    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);
    this.slideIn = this.slideIn.bind(this);
    this.slideOut = this.slideOut.bind(this);
    this.fadeIn = this.fadeIn.bind(this);
    this.fadeOut = this.fadeOut.bind(this);
    this.display = this.display.bind(this);
    this.close = this.close.bind(this);
    this.clickedEdit = this.clickedEdit.bind(this);
    this.clickedDelete = this.clickedDelete.bind(this);
    this.element = document.getElementById("recipe-window");
    this.obj = "undefined";
    this.visible = false;
    this.changing = false;
    this.animationTime = 400;
    this.openEditorToEditCallback = openEditorToEditCallback;
    this.openDeleteCallback = openDeleteCallback;
    document.getElementById("recipe-close-button").onclick = this.close;
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
      itemIngredient.innerText = ingredient;
      ingredients.appendChild(itemIngredient);
    });

    const steps = document.getElementById("steps-list");
    steps.innerHTML = "";
    this.obj.steps.forEach((step) => {
      let itemStep = document.createElement("li");
      itemStep.className = "steps-item";
      steps.appendChild(itemStep);

      let stepSpan = document.createElement("span");
      stepSpan.className = "step-name";
      stepSpan.innerText = step.name;
      itemStep.appendChild(stepSpan);

      let timeSpan = document.createElement("span");
      timeSpan.className = "step-time";
      itemStep.appendChild(timeSpan);

      let icon = document.createElement("i");
      icon.className = "far fa-clock";
      timeSpan.appendChild(icon);

      let timeText = document.createTextNode(" " + step.time + " min.");
      timeSpan.appendChild(timeText);
    });
  }

  show(callback) {
    this.element.style.display = "flex";
    this.visible = true;
    callback();
  }

  hide(callback) {
    this.element.style.display = "none";
    this.visible = false;
    callback();
  }

  slideIn(callback) {
    this.element.style.display = "flex";
    this.element
      .animate(
        { left: ["-30vw", "0px"], opacity: [0, 1] },
        { duration: this.animationTime, easing: "ease-out" }
      )
      .finished.then(() => {
        this.show(callback);
      });
  }

  slideOut(callback) {
    this.element
      .animate(
        { left: ["0px", "-30vw"], opacity: [1, 0] },
        { duration: this.animationTime, easing: "ease-out" }
      )
      .finished.then(() => {
        this.hide(callback);
      });
  }

  fadeIn(callback) {
    this.element.style.display = "flex";
    this.element
      .animate(
        { opacity: [0, 1] },
        { duration: this.animationTime, easing: "ease-out" }
      )
      .finished.then(() => {
        this.show(callback);
      });
  }

  fadeOut(callback) {
    this.element
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

  clickedEdit() {
    this.openEditorToEditCallback(this.obj);
  }

  clickedDelete() {
    this.openDeleteCallback(this.obj);
  }
}

// -------------------------------------------------------
// NAV
// -------------------------------------------------------
class Nav {
  constructor(arr, displayRecipeCallback, openEditorToAddCallback) {
    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);
    this.clickedAdd = this.clickedAdd.bind(this);
    this.nav = document.getElementById("nav");
    this.bg = document.getElementById("nav-bg");
    this.elemList = document.getElementById("nav-list");
    this.displayRecipeCallback = displayRecipeCallback;
    this.openEditorToAddCallback = openEditorToAddCallback;
    document.getElementById("nav-menu-button").onclick = this.hide;
    document.getElementById("bg-menu-button").onclick = this.show;
    document.getElementById("nav-add-button").onclick = this.clickedAdd;
    arr.forEach((obj) => this.add(obj));
    this.elemList.animate(
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
    this.bg.classList.remove("collapsed");
  }

  hide() {
    this.nav.classList.add("hidden");
    this.bg.classList.add("collapsed");
  }

  add(obj) {
    const displayRecipeCallback = this.displayRecipeCallback;
    const item = document.createElement("li");
    item.className = "nav-item";
    item.id = "nav-item-" + obj.id;

    const button = document.createElement("button");
    button.className = "nav-item-button";
    button.type = "button";
    button.innerText = obj.name;
    button.onclick = function () {
      displayRecipeCallback(obj);
    };
    item.appendChild(button);

    const divRating = document.createElement("div");
    divRating.className = "nav-item-rating";
    if (obj.rating.votes > 0)
      divRating.innerText = (obj.rating.sum / obj.rating.votes).toFixed(1);
    else divRating.innerText = "-";
    item.appendChild(divRating);

    const divTooltip = document.createElement("div");
    divTooltip.className = "rating-tooltip";
    divTooltip.innerText = obj.rating.votes + " votes";
    divRating.appendChild(divTooltip);
    this.elemList.appendChild(item);
  }

  update(obj) {
    const displayRecipeCallback = this.displayRecipeCallback;
    const button = document
      .getElementById("nav-item-" + obj.id)
      .querySelector(".nav-item-button");
    button.innerText = obj.name;
    button.onclick = function () {
      displayRecipeCallback(obj);
    };
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
}

// -------------------------------------------------------
// RECIPE APP
// -------------------------------------------------------
class RecipeApp {
  constructor(arr) {
    this.deleteRecipe = this.deleteRecipe.bind(this);
    this.saveRecipe = this.saveRecipe.bind(this);
    this.arr = arr;
    this.popups = new Popups(this.saveRecipe, this.deleteRecipe);
    this.mainWindow = new MainWindow(
      this.popups.editor.openToEdit,
      this.popups.delete.open
    );
    this.nav = new Nav(
      this.arr,
      this.mainWindow.display,
      this.popups.editor.openToAdd
    );
  }

  addRecipe(obj) {
    this.arr.push(obj);
    this.nav.add(obj);
    this.mainWindow.display(obj, "no", "fade");
  }

  deleteRecipe(obj) {
    this.arr = this.arr.filter((item) => item !== obj);
    this.mainWindow.close("fade");
    this.nav.remove(obj);
  }

  saveRecipe(obj) {
    if (!obj.hasOwnProperty("id")) {
      obj.id = this.arr[this.arr.length - 1].id + 1;
      this.addRecipe(obj);
    } else {
      const index = this.arr.findIndex((item) => item.id === obj.id);
      this.arr[index] = obj;
      this.nav.update(obj);
      this.mainWindow.update(obj);
    }
  }
}

// -------------------------------------------------------
// POPUPS
// -------------------------------------------------------
class Popups {
  constructor(saveRecipeCallback, deleteRecipeCallback) {
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this.element = document.getElementById("popup");
    this.editor = new EditorPopup(this.open, this.close, saveRecipeCallback);
    this.delete = new DeletePopup(this.open, this.close, deleteRecipeCallback);
  }

  open() {
    this.element.classList.add("visible");
  }

  close() {
    this.element.classList.remove("visible");
  }
}

// -------------------------------------------------------
// POPUP WINDOW
// -------------------------------------------------------
class PopupWindow {
  constructor(openParentCallback, closeParentCallback) {
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this.element = undefined;
    this.openParentCallback = openParentCallback;
    this.closeParentCallback = closeParentCallback;
  }

  open() {
    this.openParentCallback();
    this.element.style.display = "block";
    this.element.animate(
      {
        opacity: [0, 1],
        transform: ["translateY(-200px)", "translateY(0px)"],
      },
      { duration: 400, easing: "ease-out" }
    );
  }

  close() {
    this.element.style.display = "none";
    this.closeParentCallback();
  }
}

// -------------------------------------------------------
// EDITOR POPUP
// -------------------------------------------------------
class EditorPopup extends PopupWindow {
  constructor(openParentCallback, closeParentCallback, saveRecipeCallback) {
    super(openParentCallback, closeParentCallback);
    this.openToAdd = this.openToAdd.bind(this);
    this.openToEdit = this.openToEdit.bind(this);
    this.addStep = this.addStep.bind(this);
    this.removeStep = this.removeStep.bind(this);
    this.clear = this.clear.bind(this);
    this.submit = this.submit.bind(this);
    this.element = document.getElementById("popup-edit");
    this.stepsElement = document.getElementById("input-steps-list");
    this.validationElement = document.getElementById("form-validation-warning");
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

    const stepInput = document.createElement("input");
    stepInput.type = "text";
    stepInput.className = "input-step";
    stepInput.id = "input-step-" + (this.stepsElement.childElementCount + 1);
    item.appendChild(stepInput);

    const timeLabel = document.createElement("label");
    timeLabel.className = "input-time-label";
    timeLabel.htmlFor =
      "input-time-" + (this.stepsElement.childElementCount + 1);
    timeLabel.innerText = "minutes:";
    item.appendChild(timeLabel);

    const timeInput = document.createElement("input");
    timeInput.className = "input-time";
    timeInput.id = "input-time-" + (this.stepsElement.childElementCount + 1);
    timeInput.type = "number";
    timeInput.min = "5";
    timeInput.max = "180";
    timeInput.step = "5";
    item.appendChild(timeInput);

    this.stepsElement.appendChild(item);

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
    if (this.stepsElement.childElementCount > 1) {
      const item = this.stepsElement.lastElementChild;

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
          this.stepsElement.removeChild(item);
        });
    }
  }

  removeAllSteps() {
    while (this.stepsElement.childElementCount > 1) {
      this.stepsElement.removeChild(this.stepsElement.lastElementChild);
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
    this.validationElement.classList.remove("visible");
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
    if (!result) this.validationElement.classList.add("visible");
    else this.validationElement.classList.remove("visible");
    return result;
  }

  export() {
    const newObj = {
      name: document.getElementById("input-name").value,
      ingredients: document.getElementById("input-ingredients").value,
      steps: [],
      rating: { sum: 0, votes: 0 },
    };
    if (this.obj !== undefined) newObj.id = this.obj.id;
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
class DeletePopup extends PopupWindow {
  constructor(openParentCallback, closeParentCallback, deleteRecipeCallback) {
    super(openParentCallback, closeParentCallback);
    this.open = this.open.bind(this);
    this.submit = this.submit.bind(this);
    this.element = document.getElementById("popup-delete");
    this.obj = undefined;
    this.openParentCallback = openParentCallback;
    this.closeParentCallback = closeParentCallback;
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
  const app = new RecipeApp(recipes);
});
