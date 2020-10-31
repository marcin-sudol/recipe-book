// -------------------------------------------------------
// UTILITIES
// -------------------------------------------------------
function log(str) {
  console.log(str);
}

// -------------------------------------------------------
// RECIPE ITEM
// -------------------------------------------------------
class RecipeItem {
  constructor(obj, displayCallback) {
    this.element = document.createElement("li");
    this.element.className = "nav-item";
    this.element.id = "nav-item-" + obj.id;

    const button = document.createElement("button");
    button.className = "nav-item-button";
    button.type = "button";
    button.innerText = obj.name;
    button.onclick = function () {
      displayCallback(obj);
    };
    this.element.appendChild(button);

    const divRating = document.createElement("div");
    divRating.className = "nav-item-rating";
    divRating.innerText = (obj.rating.sum / obj.rating.votes).toFixed(1);
    this.element.appendChild(divRating);

    const divTooltip = document.createElement("div");
    divTooltip.className = "rating-tooltip";
    divTooltip.innerText = obj.rating.votes + " votes";
    divRating.appendChild(divTooltip);
  }
}

// -------------------------------------------------------
// RECIPE WINDOW
// -------------------------------------------------------
class RecipeWindow {
  constructor(editorCallback, deleteCallback) {
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this.openEditorToEdit = this.openEditorToEdit.bind(this);
    this.openDelete = this.openDelete.bind(this);
    this.element = document.getElementById("recipe-window");
    this.obj = "undefined";
    this.visible = false;
    this.changing = false;
    this.animationTime = 400;
    this.editorCallback = editorCallback;
    this.deleteCallback = deleteCallback;
    document.getElementById("recipe-close-button").onclick = this.close;
    document.getElementById(
      "recipe-edit-button"
    ).onclick = this.openEditorToEdit;
    document.getElementById("recipe-delete-button").onclick = this.openDelete;
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

  slideIn() {
    this.element.style.display = "flex";
    this.element
      .animate(
        { left: ["-30vw", "0px"], opacity: [0, 1] },
        { duration: this.animationTime, easing: "ease-out" }
      )
      .finished.then(() => {
        this.visible = true;
      });
  }

  slideOut() {
    this.element
      .animate(
        { left: ["0px", "-30vw"], opacity: [1, 0] },
        { duration: this.animationTime, easing: "ease-out" }
      )
      .finished.then(() => {
        this.element.style.display = "none";
        this.visible = false;
      });
  }

  fadeIn() {
    this.element.style.display = "flex";
    this.element
      .animate(
        { opacity: [0, 1] },
        { duration: this.animationTime, easing: "ease-out" }
      )
      .finished.then(() => {
        this.visible = true;
      });
  }

  fadeOut() {
    this.element
      .animate(
        { opacity: [1, 0] },
        { duration: this.animationTime, easing: "ease-out" }
      )
      .finished.then(() => {
        this.element.style.display = "none";
        this.visible = false;
      });
  }

  close() {
    if (this.visible) {
      this.changing = true;
      this.slideOut();
      setTimeout(() => {
        this.changing = false;
        this.visible = false;
      }, this.animationTime);
    }
  }

  open(obj) {
    if (!this.changing && (!this.visible || obj !== this.obj)) {
      this.changing = true;

      if (!this.visible) {
        this.update(obj);
        this.slideIn();
        setTimeout(() => {
          this.changing = false;
          this.visible = true;
        }, this.animationTime);
      } else if (obj !== this.obj) {
        this.slideOut();
        setTimeout(() => {
          this.update(obj);
          this.slideIn();
          setTimeout(() => {
            this.changing = false;
            this.visible = true;
          }, this.animationTime);
        }, this.animationTime + 100);
      }
    }
  }

  openEditorToEdit() {
    this.editorCallback(this.obj);
  }

  openDelete() {
    this.deleteCallback(this.obj);
  }
}

// -------------------------------------------------------
// NAV
// -------------------------------------------------------
class Nav {
  constructor(addCallback) {
    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);
    this.openEditorToAdd = this.openEditorToAdd.bind(this);
    this.nav = document.getElementById("nav");
    this.bg = document.getElementById("nav-bg");
    this.addCallback = addCallback;
    document.getElementById("nav-menu-button").onclick = this.hide;
    document.getElementById("bg-menu-button").onclick = this.show;
    document.getElementById("nav-add-button").onclick = this.openEditorToAdd;
  }

  show() {
    this.nav.classList.remove("hidden");
    this.bg.classList.remove("collapsed");
  }

  hide() {
    this.nav.classList.add("hidden");
    this.bg.classList.add("collapsed");
  }

  openEditorToAdd() {
    this.addCallback();
  }
}

// -------------------------------------------------------
// RECIPE APP
// -------------------------------------------------------
class RecipeApp {
  constructor(arr) {
    this.deleteRecipe = this.deleteRecipe.bind(this);
    this.arr = arr;
    this.elemList = document.getElementById("nav-list");
    this.popups = new Popups(this.deleteRecipe);
    this.nav = new Nav(this.popups.openEditorToAdd);
    this.recipeWindow = new RecipeWindow(
      this.popups.openEditorToEdit,
      this.popups.openDelete
    );
    this.arr.forEach((obj) => this.addRecipeToList(obj));
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

  addRecipeToArr(obj) {
    this.arr.push(obj);
  }

  addRecipeToList(obj) {
    const item = new RecipeItem(obj, this.recipeWindow.open);
    this.elemList.appendChild(item.element);
  }

  addRecipe(obj) {
    this.addRecipeToArr(obj);
    this.addRecipeToList(obj);
  }

  deleteRecipe(obj) {
    this.arr = this.arr.filter((item) => item !== obj);
    this.popups.close();
    this.recipeWindow.close();
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
}

// -------------------------------------------------------
// POPUPS
// -------------------------------------------------------
class Popups {
  constructor(deleteCallback) {
    this.openEditorToAdd = this.openEditorToAdd.bind(this);
    this.openEditorToEdit = this.openEditorToEdit.bind(this);
    this.openDelete = this.openDelete.bind(this);
    this.close = this.close.bind(this);
    this.confirmDelete = this.confirmDelete.bind(this);
    this.addStepToEditor = this.addStepToEditor.bind(this);
    this.removeStepFromEditor = this.removeStepFromEditor.bind(this);
    this.clearEditor = this.clearEditor.bind(this);
    this.element = document.getElementById("popup");
    this.editorElement = document.getElementById("popup-edit");
    this.deleteElement = document.getElementById("popup-delete");
    this.stepsElement = document.getElementById("input-steps-list");
    this.obj = undefined;
    this.deleteCallback = deleteCallback;
    document.getElementById("add-step-button").onclick = this.addStepToEditor;
    document.getElementById(
      "remove-step-button"
    ).onclick = this.removeStepFromEditor;
    document.getElementById("edit-clear-button").onclick = this.clearEditor;
    document.getElementById("edit-cancel-button").onclick = this.close;
    document.getElementById("delete-ok-button").onclick = this.confirmDelete;
    document.getElementById("delete-cancel-button").onclick = this.close;
    this.addStepToEditor();
  }

  open(elem) {
    if (popup != null) {
      this.element.classList.add("popup-visible");
      elem.style.display = "block";
      elem.animate(
        {
          opacity: [0, 1],
          transform: ["translateY(-200px)", "translateY(0px)"],
        },
        { duration: 400, easing: "ease-out" }
      );
    }
  }

  openEditorToAdd() {
    this.clearEditor();
    this.open(this.editorElement);
  }

  openEditorToEdit(obj) {
    this.obj = obj;
    this.loadEditor();
    this.open(this.editorElement);
  }

  openDelete(obj) {
    this.obj = obj;
    this.open(this.deleteElement);
  }

  close() {
    this.obj = undefined;
    this.element.classList.remove("popup-visible");
    this.editorElement.style.display = "none";
    this.deleteElement.style.display = "none";
  }

  confirmDelete() {
    this.deleteCallback(this.obj);
  }

  addStepToEditor() {
    const item = document.createElement("li");
    item.className = "input-steps-item";

    const stepInput = document.createElement("input");
    stepInput.type = "text";
    stepInput.className = "input-step";
    stepInput.id = "input-step-" + (this.stepsElement.childElementCount + 1);
    stepInput.required = true;
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
    timeInput.required = true;
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

  removeStepFromEditor() {
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

  removeAllStepsFromEditor() {
    while (this.stepsElement.childElementCount > 1) {
      this.stepsElement.removeChild(this.stepsElement.lastElementChild);
    }
  }

  loadEditor() {
    if (this.obj !== undefined) {
      this.removeAllStepsFromEditor();
      document.getElementById("input-name").value = this.obj.name;
      document.getElementById("input-ingredients").value = this.obj.ingredients;
      for (let i = 1; i < this.obj.steps.length; i++) {
        this.addStepToEditor();
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

  clearEditor() {
    this.removeAllStepsFromEditor();
    const fields = document
      .getElementById("popup-edit-form")
      .querySelectorAll("input, textarea");
    for (let elem of fields) elem.value = "";
  }
}

class Editor {
  constructor() {}
  addStep() {}
  removeStep() {}
  clear() {}
}

const initialLoading = (arr) => {
  const app = new RecipeApp(arr);
};

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
  initialLoading(recipes);
});
