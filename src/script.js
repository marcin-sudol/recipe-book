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
  },
];

const loadRecipes = () => {
  const list = document.getElementById("recipe-list");

  recipes.forEach((recipe) => {
    let recipeItem = document.createElement("li");
    let recipeName = document.createTextNode(recipe.name);
    recipeItem.appendChild(recipeName);
    list.appendChild(recipeItem);
  });
};

document.body.onload = loadRecipes;
