const recipes = [
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

let displayedRecipeId = undefined;
let changingRecipe = false;

// -------------------------------------------------------
// LOG
// -------------------------------------------------------
const log = (str) => {
  console.log(str);
};

// -------------------------------------------------------
// ADDS NEW RECIPE TO THE END OF NAV LIST
// -------------------------------------------------------
const addRecipeToList = (recipe, list) => {
  let rating = recipe.rating.sum / recipe.rating.votes;
  let item = document.createElement("li");
  let button = document.createElement("button");
  let divRating = document.createElement("div");
  let divTooltip = document.createElement("div");
  item.id = "recipe-" + recipe.id;
  button.type = "button";
  button.onclick = clickedRecipeButton;
  divRating.className = "rating";
  divTooltip.className = "tooltip";
  button.innerText = recipe.name;
  divRating.innerText = rating.toFixed(1);
  divTooltip.innerText = recipe.rating.votes + " votes";
  list.appendChild(item);
  item.appendChild(button);
  item.appendChild(divRating);
  divRating.appendChild(divTooltip);
};

// -------------------------------------------------------
// LOADS RECIPES INTO NAV LIST
// -------------------------------------------------------
const loadRecipesList = () => {
  const list = document.querySelector("#nav .list");
  recipes.forEach((recipe) => {
    addRecipeToList(recipe, list);
  });
};

// -------------------------------------------------------
// UPDATES MAIN DISPLAY WITH SELECTED RECIPE
// -------------------------------------------------------
const updateDisplayedRecipe = (recipe) => {
  const recipeName = document.getElementById("recipe-name");
  const ingredients = document.querySelector("#ingredients .list");
  const steps = document.querySelector("#steps .list");
  // UPDATE NAME
  recipeName.innerHTML = recipe.name;
  // UPDATE INGREDIENTS
  ingredients.innerHTML = "";
  recipe.ingredients.split(",").forEach((ingredient) => {
    let liIngredient = document.createElement("li");
    liIngredient.innerText = ingredient;
    ingredients.appendChild(liIngredient);
  });
  // UPDATE STEPS
  steps.innerHTML = "";
  recipe.steps.forEach((step) => {
    let liStep = document.createElement("li");
    let spStep = document.createElement("span");
    let spTime = document.createElement("span");
    let icon = document.createElement("i");
    let txTime = document.createTextNode(" " + step.time + " min.");
    spStep.className = "step";
    spStep.innerText = step.name;
    spTime.className = "time";
    icon.className = "far fa-clock";
    steps.appendChild(liStep);
    liStep.appendChild(spStep);
    liStep.appendChild(spTime);
    spTime.appendChild(icon);
    spTime.appendChild(txTime);
  });
  // UPDATE DISPLAYED RECIPE ID
  displayedRecipeId = recipe.id;
};

// -------------------------------------------------------
// HIDE NAV
// -------------------------------------------------------
const hideNav = () => {
  document.getElementById("nav").classList.add("hidden");
  document.getElementById("c-nav").classList.add("collapsed");
};

// -------------------------------------------------------
// SHOW NAV
// -------------------------------------------------------
const showNav = () => {
  document.getElementById("nav").classList.remove("hidden");
  document.getElementById("c-nav").classList.remove("collapsed");
};

// -------------------------------------------------------
// GET ANIMATION TIME
// -------------------------------------------------------
const getAnimationTime = () => {
  return (
    parseFloat(
      window
        .getComputedStyle(document.getElementById("nav"))
        .transitionDuration.split(",")[0]
    ) * 1000
  );
};

// -------------------------------------------------------
// HIDE RECIPE WINDOW
// -------------------------------------------------------
const hideRecipe = (callback) => {
  const recipe = document.getElementById("recipe");
  const animationTime = getAnimationTime();

  recipe
    .animate(
      { left: "-100vw", opacity: 0 },
      { duration: animationTime, easing: "ease-out" }
    )
    .finished.then(() => {
      recipe.style.left = "-100vw";
      recipe.style.opacity = 0;
    });

  if (callback !== undefined) {
    setTimeout(callback, animationTime);
  }
};

// -------------------------------------------------------
// SHOW RECIPE WINDOW
// -------------------------------------------------------
const showRecipe = (callback) => {
  const recipe = document.getElementById("recipe");
  const animationTime = getAnimationTime();

  recipe
    .animate(
      { left: "0px", opacity: 1 },
      { duration: animationTime, easing: "ease-out" }
    )
    .finished.then(() => {
      recipe.style.left = "0px";
      recipe.style.opacity = 1;
    });

  if (callback !== undefined) {
    setTimeout(callback, animationTime);
  }
};

// -------------------------------------------------------
// CHECK IF RECIPE VISIBLE
// -------------------------------------------------------
const recipeVisible = () =>
  window.getComputedStyle(document.getElementById("recipe")).opacity == 1;

// -------------------------------------------------------
// HANDLE CLICK ON RECIPE ON THE LIST
// -------------------------------------------------------
function clickedRecipeButton() {
  const recipeId = parseInt(this.parentNode.id.slice(7));
  if (
    !isNaN(recipeId) &&
    !changingRecipe &&
    (!recipeVisible() || recipeId !== displayedRecipeId)
  ) {
    changingRecipe = true;
    const recipe = recipes.find((recipe) => recipe.id === recipeId);

    if (!recipeVisible()) {
      updateDisplayedRecipe(recipe);
      showRecipe(() => {
        changingRecipe = false;
      });
    } else if (recipeId !== displayedRecipeId) {
      hideRecipe(() => {
        updateDisplayedRecipe(recipe);
        showRecipe(() => {
          changingRecipe = false;
        });
      });
    }
  }
}

// -------------------------------------------------------
// HANDLE CLICK ON CLOSE BUTTON
// -------------------------------------------------------
const clickedCloseButton = () => {
  if (recipeVisible()) changingRecipe = true;
  hideRecipe(() => {
    changingRecipe = false;
  });
};

// -------------------------------------------------------
// INITIAL LOADING
// -------------------------------------------------------
const initialLoading = () => {
  loadRecipesList();
  document.querySelector("#nav .menu-button").onclick = hideNav;
  document.querySelector("#c-nav .menu-button").onclick = showNav;
  document.getElementById("close-button").onclick = clickedCloseButton;
};

window.addEventListener("load", initialLoading);
