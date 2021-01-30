class Nav {
  constructor(
    arr,
    displayRecipeCallback,
    openEditorCallback,
    resetRecipesCallback,
    updateTabIndexCallback
  ) {
    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);
    this.clickedAddRecipe = this.clickedAddRecipe.bind(this);
    this.clickedDisplayRecipe = this.clickedDisplayRecipe.bind(this);
    this.clickedResetList = this.clickedResetList.bind(this);
    this.showTooltip = this.showTooltip.bind(this);
    this.hideTooltip = this.hideTooltip.bind(this);
    this.nav = document.getElementById("nav");
    this.navList = document.getElementById("nav-list");
    this.navMenuButton = document.getElementById("nav-menu-button");
    this.bgMenuButton = document.getElementById("bg-menu-button");
    this.recipeWindow = document.getElementById("recipe-window");
    this.displayRecipeCallback = displayRecipeCallback;
    this.openEditorCallback = openEditorCallback;
    this.resetRecipesCallback = resetRecipesCallback;
    this.updateTabIndexCallback = updateTabIndexCallback;
    this.navMenuButton.onclick = this.hide;
    document.getElementById("nav-add-button").onclick = this.clickedAddRecipe;
    document.getElementById("nav-reset-button").onclick = this.clickedResetList;
    this.addList(arr, "fade");
  }

  show() {
    this.nav.classList.remove("hidden");
    this.recipeWindow.classList.add("narrower");
    this.updateTabIndexCallback();
    this.navMenuButton.focus();
  }

  hide() {
    this.nav.classList.add("hidden");
    this.recipeWindow.classList.remove("narrower");
    this.updateTabIndexCallback();
    this.bgMenuButton.focus();
  }

  setTabIndex(tabIndex) {
    const buttons = this.nav.querySelectorAll("button");
    buttons.forEach((button) => {
      button.setAttribute("tabindex", tabIndex);
    });
  }

  enableTab() {
    this.setTabIndex("0");
  }

  disableTab() {
    this.setTabIndex("-1");
  }

  isVisible() {
    return !this.nav.classList.contains("hidden");
  }

  getRating(obj) {
    let rating;
    if (obj.rating.votes > 0)
      rating = (obj.rating.sum / obj.rating.votes).toFixed(1);
    else rating = "-";
    return rating;
  }

  addItem(obj) {
    const item = document.createElement("li");
    item.className = "nav-item";
    item.id = "nav-item-" + obj.id;
    item.dataset.id = obj.id;

    item.innerHTML = `<button class="nav-item-button" type="button">${
      obj.name
    }</button>
    <div class="nav-item-rating"><span class="rating-value">${this.getRating(
      obj
    )}</span><div class="rating-tooltip">${obj.rating.votes} votes</div>
    </div>`;
    this.navList.appendChild(item);

    item.querySelector(".nav-item-button").onclick = this.clickedDisplayRecipe;

    item.querySelector(".nav-item-rating").onmouseenter = this.showTooltip;
    item.querySelector(".nav-item-rating").onmouseleave = this.hideTooltip;
  }

  updateItem(obj) {
    const item = document.getElementById("nav-item-" + obj.id);
    item.querySelector(".nav-item-button").textContent = obj.name;
    item.querySelector(".rating-value").textContent = this.getRating(obj);
    item.querySelector(".rating-tooltip").textContent =
      obj.rating.votes + " votes";
  }

  removeItem(obj) {
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

  addList(arr, styleIn) {
    arr.forEach((obj) => this.addItem(obj));
    if (styleIn === "fade") {
      this.navList.animate(
        {
          opacity: [0, 1],
        },
        {
          duration: 400,
          easing: "ease-out",
        }
      );
    }
  }

  clearList() {
    while (this.navList.childElementCount > 0) {
      this.navList.removeChild(this.navList.lastElementChild);
    }
  }

  updateList(arr, styleIn) {
    this.clearList();
    this.addList(arr, styleIn);
  }

  clickedAddRecipe() {
    this.openEditorCallback();
  }

  clickedDisplayRecipe(event) {
    const id = parseInt(event.target.parentElement.dataset.id);
    this.displayRecipeCallback(id);
  }

  clickedResetList() {
    this.resetRecipesCallback();
  }

  showTooltip(event) {
    const tooltip = event.target.querySelector(".rating-tooltip");
    const targetRect = event.target.getBoundingClientRect();
    tooltip.classList.add("visible");
    tooltip.style.left = targetRect.left - tooltip.clientWidth + 10 + "px";
    tooltip.style.top = targetRect.bottom - 25 + "px";
  }

  hideTooltip(event) {
    const tooltip = event.target.querySelector(".rating-tooltip");
    tooltip.classList.remove("visible");
  }
}
