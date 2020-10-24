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
    ingredients: "water, wegetables, pasta, potatos",
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
];

const loadRecipesList = () => {
  const list = document.querySelector("#nav .list");

  recipes.forEach((recipe) => {
    let recipeItem = document.createElement("li");
    let recipeName = document.createTextNode(recipe.name);
    recipeItem.appendChild(recipeName);
    list.appendChild(recipeItem);
  });
};

const loadRecipe = (id) => {
  const recipeName = document.getElementById("recipe-name");
  const ingredients = document.querySelector("#ingredients .list");
  const steps = document.querySelector("#steps .list");

  const recipe = recipes.find((item) => item.id === id);

  recipeName.innerHTML = recipe.name;

  recipe.ingredients.split(",").forEach((item) => {
    let ingr = document.createElement("li");
    ingr.appendChild(document.createTextNode(item));
    ingredients.appendChild(ingr);
  });

  recipe.steps.forEach((item) => {
    let step = document.createElement("li");
    step.appendChild(
      document.createTextNode(item.name + " " + item.time + " min.")
    );
    steps.appendChild(step);
  });
};

window.addEventListener("load", loadRecipesList);
window.addEventListener("load", () => loadRecipe(0));
