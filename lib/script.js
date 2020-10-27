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
// LOG
// -------------------------------------------------------

var log = function log(str) {
  console.log(str);
}; // -------------------------------------------------------
// DELETE RECIPE
// -------------------------------------------------------


var deleteRecipe = function deleteRecipe(recipeId) {
  recipes = recipes.filter(function (recipe) {
    return recipe.id !== recipeId;
  });
}; // -------------------------------------------------------
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
// REMOVE RECIPE FROM LIST
// -------------------------------------------------------


var removeRecipeFromList = function removeRecipeFromList(recipeId, animationTime) {
  var item = document.getElementById("recipe-" + recipeId);
  var button = item.querySelector("button");
  button.removeAttribute("onclick");
  item.animate({
    opacity: 0
  }, {
    duration: animationTime * 0.5
  }).finished.then(function () {
    item.style.opacity = 0;
    item.removeChild(item.querySelector(".rating"));
    button.animate({
      padding: "0px",
      fontSize: "0px"
    }, {
      duration: animationTime * 0.5,
      easing: "ease-out"
    });
    item.animate({
      marginBottom: "0px"
    }, {
      duration: animationTime * 0.5,
      easing: "ease-out"
    }).finished.then(function () {
      item.remove();
    });
  });
}; // -------------------------------------------------------
// LOADS RECIPES INTO NAV LIST
// -------------------------------------------------------


var loadRecipesList = function loadRecipesList() {
  var list = document.querySelector("#nav .list");
  recipes.forEach(function (recipe) {
    addRecipeToList(recipe, list);
  });
}; // -------------------------------------------------------
// UPDATES RECIPE WINDOW WITH SELECTED RECIPE
// -------------------------------------------------------


var updateDisplayedRecipe = function updateDisplayedRecipe(recipe) {
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
// HIDE NAV
// -------------------------------------------------------


var hideNav = function hideNav() {
  document.getElementById("nav").classList.add("hidden");
  document.getElementById("c-nav").classList.add("collapsed");
}; // -------------------------------------------------------
// SHOW NAV
// -------------------------------------------------------


var showNav = function showNav() {
  document.getElementById("nav").classList.remove("hidden");
  document.getElementById("c-nav").classList.remove("collapsed");
}; // -------------------------------------------------------
// SLIDE IN RECIPE WINDOW
// -------------------------------------------------------


var slideInRecipeWindow = function slideInRecipeWindow(animationTime, callback) {
  var recipe = document.getElementById("recipe");
  recipe.animate({
    left: "0px",
    opacity: 1
  }, {
    duration: animationTime * 0.9,
    easing: "ease-out"
  }).finished.then(function () {
    recipe.style.left = "0px";
    recipe.style.opacity = 1;
  });

  if (callback !== undefined) {
    setTimeout(callback, animationTime);
  }
}; // -------------------------------------------------------
// SLIDE OUT RECIPE WINDOW
// -------------------------------------------------------


var slideOutRecipeWindow = function slideOutRecipeWindow(animationTime, callback) {
  var recipe = document.getElementById("recipe");
  recipe.animate({
    left: "-100vw",
    opacity: 0
  }, {
    duration: animationTime * 0.9,
    easing: "ease-out"
  }).finished.then(function () {
    recipe.style.left = "-100vw";
    recipe.style.opacity = 0;
  });

  if (callback !== undefined) {
    setTimeout(callback, animationTime);
  }
}; // -------------------------------------------------------
// FADE IN RECIPE WINDOW
// -------------------------------------------------------


var fadeInRecipeWindow = function fadeInRecipeWindow(animationTime, callback) {
  var recipe = document.getElementById("recipe");
  recipe.style.left = "0px";
  recipe.animate({
    opacity: 1
  }, {
    duration: animationTime * 0.9,
    easing: "ease-out"
  }).finished.then(function () {
    recipe.style.opacity = 1;
  });

  if (callback !== undefined) {
    setTimeout(callback, animationTime);
  }
}; // -------------------------------------------------------
// FADE OUT RECIPE WINDOW
// -------------------------------------------------------


var fadeOutRecipeWindow = function fadeOutRecipeWindow(animationTime, callback) {
  var recipe = document.getElementById("recipe");
  recipe.animate({
    opacity: 0
  }, {
    duration: animationTime * 0.9,
    easing: "ease-out"
  }).finished.then(function () {
    recipe.style.left = "-100vw";
    recipe.style.opacity = 0;
  });

  if (callback !== undefined) {
    setTimeout(callback, animationTime);
  }
}; // -------------------------------------------------------
// CHECK IF RECIPE WINDOW VISIBLE
// -------------------------------------------------------


var recipeWindowVisible = function recipeWindowVisible() {
  return window.getComputedStyle(document.getElementById("recipe")).opacity == 1;
}; // -------------------------------------------------------
// GET ANIMATION TIME
// -------------------------------------------------------


var getAnimationTime = function getAnimationTime() {
  return parseFloat(window.getComputedStyle(document.getElementById("nav")).transitionDuration.split(",")[0]) * 1000;
}; // -------------------------------------------------------
// HANDLE CLICK ON RECIPE ON THE LIST
// -------------------------------------------------------


function clickedRecipeButton() {
  var recipeId = parseInt(this.parentNode.id.slice(7));

  if (!isNaN(recipeId) && !changingRecipe && (!recipeWindowVisible() || recipeId !== displayedRecipeId)) {
    changingRecipe = true;
    var recipe = recipes.find(function (recipe) {
      return recipe.id === recipeId;
    });
    var time = getAnimationTime();

    if (!recipeWindowVisible()) {
      updateDisplayedRecipe(recipe);
      slideInRecipeWindow(time, function () {
        changingRecipe = false;
      });
    } else if (recipeId !== displayedRecipeId) {
      slideOutRecipeWindow(time, function () {
        updateDisplayedRecipe(recipe);
        slideInRecipeWindow(time, function () {
          changingRecipe = false;
        });
      });
    }
  }
} // -------------------------------------------------------
// HANDLE CLICK ON CLOSE BUTTON
// -------------------------------------------------------


var clickedCloseButton = function clickedCloseButton() {
  if (recipeWindowVisible()) {
    changingRecipe = true;
    var time = getAnimationTime();
    slideOutRecipeWindow(time, function () {
      changingRecipe = false;
    });
  }
}; // -------------------------------------------------------
// HANDLE CLICK ON DELETE BUTTON
// -------------------------------------------------------


var clickedDeleteButton = function clickedDeleteButton() {
  if (recipeWindowVisible() && displayedRecipeId !== undefined) {
    changingRecipe = true;
    var time = getAnimationTime();
    removeRecipeFromList(displayedRecipeId, time);
    deleteRecipe(displayedRecipeId);
    fadeOutRecipeWindow(time, function () {
      displayedRecipeId = undefined;
      changingRecipe = false;
    });
  }
}; // -------------------------------------------------------
// INITIAL LOADING
// -------------------------------------------------------


var initialLoading = function initialLoading() {
  loadRecipesList();
  document.querySelector("#nav .menu-button").onclick = hideNav;
  document.querySelector("#c-nav .menu-button").onclick = showNav;
  document.getElementById("close-button").onclick = clickedCloseButton;
  document.getElementById("delete-button").onclick = clickedDeleteButton;
};

window.addEventListener("load", initialLoading);