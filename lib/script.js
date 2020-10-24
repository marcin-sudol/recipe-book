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
  ingredients: "water, wegetables, pasta, potatos",
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
}];

var loadRecipesList = function loadRecipesList() {
  var list = document.querySelector("#nav .list");
  recipes.forEach(function (recipe) {
    var recipeItem = document.createElement("li");
    var recipeName = document.createTextNode(recipe.name);
    recipeItem.appendChild(recipeName);
    list.appendChild(recipeItem);
  });
};

var loadRecipe = function loadRecipe(id) {
  var recipeName = document.getElementById("recipe-name");
  var ingredients = document.querySelector("#ingredients .list");
  var steps = document.querySelector("#steps .list");
  var recipe = recipes.find(function (item) {
    return item.id === id;
  });
  recipeName.innerHTML = recipe.name;
  recipe.ingredients.split(",").forEach(function (item) {
    var ingr = document.createElement("li");
    ingr.appendChild(document.createTextNode(item));
    ingredients.appendChild(ingr);
  });
  recipe.steps.forEach(function (item) {
    var step = document.createElement("li");
    step.appendChild(document.createTextNode(item.name + " " + item.time + " min."));
    steps.appendChild(step);
  });
};

window.addEventListener("load", loadRecipesList);
window.addEventListener("load", function () {
  return loadRecipe(0);
});