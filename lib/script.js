"use strict";

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

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
  item.className = "nav-item";
  item.id = "nav-item-" + recipe.id;
  button.className = "nav-item-button";
  button.type = "button";
  button.onclick = clickedRecipeButton;
  divRating.className = "nav-item-rating";
  divTooltip.className = "rating-tooltip";
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
  var item = document.getElementById("nav-item-" + recipeId);
  var button = item.querySelector(".nav-item-button");
  button.removeAttribute("onclick");
  item.animate({
    opacity: 0
  }, {
    duration: animationTime * 0.5
  }).finished.then(function () {
    item.style.opacity = 0;
    item.removeChild(item.querySelector(".nav-item-rating"));
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
  var list = document.getElementById("nav-list");
  recipes.forEach(function (recipe) {
    addRecipeToList(recipe, list);
  });
}; // -------------------------------------------------------
// UPDATES RECIPE WINDOW WITH SELECTED RECIPE
// -------------------------------------------------------


var updateDisplayedRecipe = function updateDisplayedRecipe(recipe) {
  var recipeName = document.getElementById("recipe-name");
  var ingredients = document.getElementById("ingredients-list");
  var steps = document.getElementById("steps-list"); // UPDATE NAME

  recipeName.innerHTML = recipe.name; // UPDATE INGREDIENTS

  ingredients.innerHTML = "";
  recipe.ingredients.split(",").forEach(function (ingredient) {
    var itemIngredient = document.createElement("li");
    itemIngredient.className = "ingredients-item";
    itemIngredient.innerText = ingredient;
    ingredients.appendChild(itemIngredient);
  }); // UPDATE STEPS

  steps.innerHTML = "";
  recipe.steps.forEach(function (step) {
    var itemStep = document.createElement("li");
    var spStep = document.createElement("span");
    var spTime = document.createElement("span");
    var icon = document.createElement("i");
    var txTime = document.createTextNode(" " + step.time + " min.");
    itemStep.className = "steps-item";
    spStep.className = "step-name";
    spStep.innerText = step.name;
    spTime.className = "step-time";
    icon.className = "far fa-clock";
    steps.appendChild(itemStep);
    itemStep.appendChild(spStep);
    itemStep.appendChild(spTime);
    spTime.appendChild(icon);
    spTime.appendChild(txTime);
  }); // UPDATE DISPLAYED RECIPE ID

  displayedRecipeId = recipe.id;
}; // -------------------------------------------------------
// HIDE NAV
// -------------------------------------------------------


var hideNav = function hideNav() {
  document.getElementById("nav").classList.add("hidden");
  document.getElementById("nav-bg").classList.add("collapsed");
}; // -------------------------------------------------------
// SHOW NAV
// -------------------------------------------------------


var showNav = function showNav() {
  document.getElementById("nav").classList.remove("hidden");
  document.getElementById("nav-bg").classList.remove("collapsed");
}; // -------------------------------------------------------
// SLIDE IN RECIPE WINDOW
// -------------------------------------------------------


var slideInRecipeWindow = function slideInRecipeWindow(animationTime, callback) {
  var recipe = document.getElementById("recipe-window");
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
  var recipe = document.getElementById("recipe-window");
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
  var recipe = document.getElementById("recipe-window");
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
  var recipe = document.getElementById("recipe-window");
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
  return window.getComputedStyle(document.getElementById("recipe-window")).opacity == 1;
}; // -------------------------------------------------------
// GET ANIMATION TIME
// -------------------------------------------------------


var getAnimationTime = function getAnimationTime() {
  return parseFloat(window.getComputedStyle(document.getElementById("nav")).transitionDuration.split(",")[0]) * 1000;
}; // -------------------------------------------------------
// CLICKED RECIPE ON THE LIST
// -------------------------------------------------------


function clickedRecipeButton() {
  var recipeId = parseInt(this.parentNode.id.slice(9));

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
// CLICKED CLOSE BUTTON
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
// CLICKED EDIT BUTTON
// -------------------------------------------------------


var clickedEditButton = function clickedEditButton() {
  var time = getAnimationTime();
  showPopup("popup-edit", time);
}; // -------------------------------------------------------
// CLICKED DELETE BUTTON
// -------------------------------------------------------


var clickedDeleteButton = function clickedDeleteButton() {
  var time = getAnimationTime();
  showPopup("popup-delete", time);
}; // -------------------------------------------------------
// SHOW POPUP
// -------------------------------------------------------


var showPopup = function showPopup(popupId, animationTime, callback) {
  var popup = document.getElementById(popupId);

  if (popup != null) {
    document.getElementById("popup").classList.add("popup-visible");
    popup.style.opacity = 0;
    popup.style.transform = "translateY(-200px)";
    popup.style.display = "block";
    popup.animate({
      opacity: 1,
      transform: "translateY(0px)"
    }, {
      duration: animationTime * 0.9,
      easing: "ease-out"
    }).finished.then(function () {
      popup.style.opacity = 1;
      popup.style.transform = "translateY(0px)";
    });

    if (callback !== undefined) {
      setTimeout(callback, animationTime);
    }
  }
}; // -------------------------------------------------------
// HIDE POPUP
// -------------------------------------------------------


var hidePopup = function hidePopup() {
  document.getElementById("popup").classList.remove("popup-visible");

  var _iterator = _createForOfIteratorHelper(document.getElementsByClassName("popup-window")),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var elem = _step.value;
      elem.style.display = "none";
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
}; // -------------------------------------------------------
// EDIT -> OK
// -------------------------------------------------------


var editButtonOK = function editButtonOK() {}; // -------------------------------------------------------
// EDIT -> CANCEL
// -------------------------------------------------------


var editButtonCancel = function editButtonCancel() {
  hidePopup();
}; // -------------------------------------------------------
// DELETE -> OK
// -------------------------------------------------------


var deleteButtonOK = function deleteButtonOK() {
  if (recipeWindowVisible() && displayedRecipeId !== undefined) {
    changingRecipe = true;
    var time = getAnimationTime();
    hidePopup();
    removeRecipeFromList(displayedRecipeId, time);
    deleteRecipe(displayedRecipeId);
    fadeOutRecipeWindow(time, function () {
      displayedRecipeId = undefined;
      changingRecipe = false;
    });
  }
}; // -------------------------------------------------------
// DELETE -> CANCEL
// -------------------------------------------------------


var deleteButtonCancel = function deleteButtonCancel() {
  hidePopup();
}; // -------------------------------------------------------
// INITIAL LOADING
// -------------------------------------------------------


var initialLoading = function initialLoading() {
  loadRecipesList();
  document.getElementById("nav-menu-button").onclick = hideNav;
  document.getElementById("bg-menu-button").onclick = showNav;
  document.getElementById("recipe-close-button").onclick = clickedCloseButton;
  document.getElementById("recipe-edit-button").onclick = clickedEditButton;
  document.getElementById("recipe-delete-button").onclick = clickedDeleteButton;
  document.getElementById("edit-ok-button").onclick = editButtonOK;
  document.getElementById("edit-cancel-button").onclick = editButtonCancel;
  document.getElementById("delete-ok-button").onclick = deleteButtonOK;
  document.getElementById("delete-cancel-button").onclick = deleteButtonCancel;
};

window.addEventListener("load", initialLoading);