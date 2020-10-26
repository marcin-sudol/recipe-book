"use strict";

var recipes = [{
  id: 0,
  name: "Cookies",
  ingredients: "powder, sugar, milk, cocoa",
  steps: [{
    name: "Prepare dough",
    time: 15
  }, {
    name: "Form cookies",
    time: 15
  }, {
    name: "Cook",
    time: 45
  }],
  rating: {
    sum: 28,
    votes: 6
  }
}, {
  id: 1,
  name: "Soup",
  ingredients: "water, wegetables, pasta, potatos, mushrooms",
  steps: [{
    name: "Wash wegetables",
    time: 5
  }, {
    name: "Cut vegetables",
    time: 20
  }, {
    name: "Cook soup",
    time: 60
  }],
  rating: {
    sum: 45,
    votes: 12
  }
}, {
  id: 2,
  name: "Ice cream",
  ingredients: "milk, sugar, fruits",
  steps: [{
    name: "Prepare",
    time: 20
  }, {
    name: "Insert into freezer",
    time: 120
  }],
  rating: {
    sum: 17,
    votes: 5
  }
}];
var displayedRecipeId = undefined;
var changingRecipe = false; // -------------------------------------------------------
// ADDS NEW RECIPE TO THE END OF NAV LIST
// -------------------------------------------------------

var addRecipeToList = function addRecipeToList(recipe, list) {
  var rating = recipe.rating.sum / recipe.rating.votes;
  var item = document.createElement("li");
  var button = document.createElement("button");
  var divRating = document.createElement("div");
  var divTooltip = document.createElement("div");
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
}; // -------------------------------------------------------
// LOADS RECIPES INTO NAV LIST
// -------------------------------------------------------


var loadRecipesList = function loadRecipesList() {
  var list = document.querySelector("#nav .list");
  recipes.forEach(function (recipe) {
    addRecipeToList(recipe, list);
  });
}; // -------------------------------------------------------
// UPDATES MAIN DISPLAY WITH SELECTED RECIPE
// -------------------------------------------------------


var displayRecipe = function displayRecipe(recipe) {
  var recipeName = document.getElementById("recipe-name");
  var ingredients = document.querySelector("#ingredients .list");
  var steps = document.querySelector("#steps .list"); // UPDATE NAME

  recipeName.innerHTML = recipe.name; // UPDATE INGREDIENTS

  ingredients.innerHTML = "";
  recipe.ingredients.split(",").forEach(function (ingredient) {
    var liIngredient = document.createElement("li");
    liIngredient.innerText = ingredient;
    ingredients.appendChild(liIngredient);
  }); // UPDATE STEPS

  steps.innerHTML = "";
  recipe.steps.forEach(function (step) {
    var liStep = document.createElement("li");
    var spStep = document.createElement("span");
    var spTime = document.createElement("span");
    var icon = document.createElement("i");
    var txTime = document.createTextNode(" " + step.time + " min.");
    spStep.className = "step";
    spStep.innerText = step.name;
    spTime.className = "time";
    icon.className = "far fa-clock";
    steps.appendChild(liStep);
    liStep.appendChild(spStep);
    liStep.appendChild(spTime);
    spTime.appendChild(icon);
    spTime.appendChild(txTime);
  }); // UPDATE DISPLAYED RECIPE ID

  displayedRecipeId = recipe.id;
}; // -------------------------------------------------------
// HIDE & SHOW NAV
// -------------------------------------------------------


var hideNav = function hideNav() {
  document.getElementById("nav").classList.add("hidden");
  document.getElementById("c-nav").classList.add("collapsed");
  document.getElementById("recipe").classList.add("expanded");
};

var showNav = function showNav() {
  document.getElementById("nav").classList.remove("hidden");
  document.getElementById("c-nav").classList.remove("collapsed");
  document.getElementById("recipe").classList.remove("expanded");
}; // -------------------------------------------------------
// HIDE & SHOW RECIPE
// -------------------------------------------------------


var hideRecipe = function hideRecipe() {
  document.getElementById("recipe").classList.add("hidden");
};

var showRecipe = function showRecipe() {
  document.getElementById("recipe").classList.remove("hidden");
};

var getHideRecipeTime = function getHideRecipeTime() {
  return document.getElementById("recipe").transition - duration;
};

var recipeVisible = function recipeVisible() {
  return !document.getElementById("recipe").classList.contains("hidden");
}; // -------------------------------------------------------
// HANDLE CLICK ON RECIPE ON THE LIST
// -------------------------------------------------------


function clickedRecipeButton() {
  var recipeId = parseInt(this.parentNode.id.slice(7));

  if (!isNaN(recipeId) && recipeId !== displayedRecipeId && !changingRecipe) {
    changingRecipe = true;
    var recipe = recipes.find(function (recipe) {
      return recipe.id === recipeId;
    });

    if (recipeVisible()) {
      hideRecipe();
      setTimeout(function () {
        displayRecipe(recipe);
        showRecipe();
        setTimeout(function () {
          changingRecipe = false;
        }, 500);
      }, 500);
    } else {
      displayRecipe(recipe);
      showRecipe();
      setTimeout(function () {
        changingRecipe = false;
      }, 500);
    }
  }
} // -------------------------------------------------------
// INITIAL LOADING
// -------------------------------------------------------


var initialLoading = function initialLoading() {
  loadRecipesList();
  document.querySelector("#nav .menu-button").onclick = hideNav;
  document.querySelector("#c-nav .menu-button").onclick = showNav;
};

window.addEventListener("load", initialLoading);