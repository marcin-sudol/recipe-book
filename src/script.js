// -------------------------------------------------------
// UTILITIES
// -------------------------------------------------------
const log = (str) => {
  console.log(str);
};

// -------------------------------------------------------
// RECIPE ITEM
// -------------------------------------------------------
class RecipeItem {
  constructor(obj, action) {
    this.element = document.createElement("li");
    this.element.className = "nav-item";
    this.element.id = "nav-item-" + obj.id;

    const button = document.createElement("button");
    button.className = "nav-item-button";
    button.type = "button";
    button.innerText = obj.name;
    button.onclick = function () {
      action(obj);
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
// RECIPES LIST
// -------------------------------------------------------
class RecipesList {
  constructor(arr) {
    this.clickedOnItem = this.clickedOnItem.bind(this);

    this.arr = arr;
    this.element = document.getElementById("nav-list");
    this.recipeWindow = new RecipeWindow();
    this.arr.forEach((obj) => this.addRecipeToList(obj));
    this.element.animate(
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
    const item = new RecipeItem(obj, this.clickedOnItem);
    this.element.appendChild(item.element);
  }

  addRecipe(obj) {
    this.addRecipeToArr(obj);
    this.addRecipeToList(obj);
  }

  // CONTINUE HERE
  deleteRecipe(obj) {
    this.arr = this.arr.filter((item) => item !== obj);
  }

  clickedOnItem(obj) {
    this.recipeWindow.display(obj);
  }
}

// -------------------------------------------------------
// RECIPE WINDOW
// -------------------------------------------------------
class RecipeWindow {
  constructor() {
    this.close = this.close.bind(this);

    this.element = document.getElementById("recipe-window");
    this.obj = "undefined";
    this.visible = false;
    this.changing = false;
    this.animationTime = 400;
    document.getElementById("recipe-close-button").onclick = this.close;
  }

  update(obj) {
    this.obj = obj;

    // UPDATE NAME
    const recipeName = document.getElementById("recipe-name");
    recipeName.innerHTML = this.obj.name;

    // UPDATE INGREDIENTS
    const ingredients = document.getElementById("ingredients-list");
    ingredients.innerHTML = "";
    this.obj.ingredients.split(",").forEach((ingredient) => {
      const itemIngredient = document.createElement("li");
      itemIngredient.className = "ingredients-item";
      itemIngredient.innerText = ingredient;
      ingredients.appendChild(itemIngredient);
    });

    // UPDATE STEPS
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

  display(obj) {
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
}

// -------------------------------------------------------
// NAV
// -------------------------------------------------------
class Nav {
  constructor() {
    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);

    this.nav = document.getElementById("nav");
    this.bg = document.getElementById("nav-bg");
    this.navMenuButton = document.getElementById("nav-menu-button");
    this.bgMenuButton = document.getElementById("bg-menu-button");
    this.navMenuButton.onclick = this.hide;
    this.bgMenuButton.onclick = this.show;
  }
  show() {
    this.nav.classList.remove("hidden");
    this.bg.classList.remove("collapsed");
  }
  hide() {
    this.nav.classList.add("hidden");
    this.bg.classList.add("collapsed");
  }
}

class Popup {
  constructor() {}
  show(name) {}
  hide() {}
}

class Editor {
  constructor() {}
  addStep() {}
  removeStep() {}
  clear() {}
}

const initialLoading = (arr) => {
  log("load");
  const recipesList = new RecipesList(arr);
  const nav = new Nav();
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
