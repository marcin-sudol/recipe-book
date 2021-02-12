class RecipeRating {
  constructor(saveRatingCallback) {
    // Saving callbacks
    this.saveRatingCallback = saveRatingCallback;

    // Setting DOM elements
    this.ratingContainer = document.getElementById("recipe-rating-container");
    this.ratingButtons = [];
    for (let i = 1; i <= 5; i++) {
      this.ratingButtons.push(document.getElementById("recipe-rating-" + i));
    }

    // Binding methods
    this.clickedRating = this.clickedRating.bind(this);
    this.hoverRatingOn = this.hoverRatingOn.bind(this);
    this.hoverRatingOff = this.hoverRatingOff.bind(this);
    this.keyDown = this.keyDown.bind(this);

    // Setting additional properties
    this.currentRating = 0;
    this._selectedItem = 0;

    // Adding events listeners
    for (let button of this.ratingButtons) {
      button.onclick = this.clickedRating;
      button.onmouseenter = this.hoverRatingOn;
      button.onmouseleave = this.hoverRatingOff;
    }
    this.ratingContainer.onkeydown = this.keyDown;
  }

  // ----------------------------------------------------------------
  // Updating rating
  // ----------------------------------------------------------------

  // Update displayed and stored rating to given value
  update(newRating, style) {
    this.currentRating = newRating;
    for (let i = 0; i < 5; i++) {
      this.ratingButtons[i].classList.remove("checked");
      this.ratingButtons[i].setAttribute("aria-checked", false);
    }
    if (newRating > 0) {
      this.ratingButtons[newRating - 1].setAttribute("aria-checked", true);
      for (let i = 0; i < newRating; i++) {
        const button = this.ratingButtons[i];
        button.classList.add("checked");
        if (style === "fade") {
          button.classList.remove("hovered");
          button.animate(
            {
              transform: ["scale(1.4)", "scale(1.0)"],
              opacity: [0, 1],
            },
            { duration: 600, easing: "ease-out" }
          );
        }
      }
    }
  }

  // ----------------------------------------------------------------
  // Managing interactions with tab key
  // ----------------------------------------------------------------

  // Enable interaction with tab key
  enableTab() {
    // enabling tab key resets the selected item to current rating
    this.selectedItem = this.currentRating > 0 ? this.currentRating - 1 : 0;
  }

  // Disable interaction with tab key
  disableTab() {
    this.setTabIndex("-1");
  }

  // Getter for selected item (for roving tabindex)
  get selectedItem() {
    return this._selectedItem;
  }

  // Setter for selected item (for roving tabindex)
  set selectedItem(i) {
    if (i >= 0 && i < 5) {
      this.setTabIndex("-1");
      this.ratingButtons[i].tabIndex = "0";
      this._selectedItem = i;
    }
  }

  // Set tabindex for all interactive elements on component
  setTabIndex(tabIndex) {
    this.ratingButtons.forEach((b) => {
      b.tabIndex = tabIndex;
    });
  }

  // ----------------------------------------------------------------
  // Event handlers
  // ----------------------------------------------------------------

  // Clicked on rating
  clickedRating(event) {
    let button;
    if (event.target.tagName === "BUTTON") {
      button = event.target;
    } else if (event.target.parentElement.tagName === "BUTTON") {
      button = event.target.parentElement;
    }

    if (button !== undefined) {
      const newRating = parseInt(button.dataset.id);
      this.update(newRating, "fade");
      this.saveRatingCallback(newRating);
    }
  }

  // When mouse enters rating
  hoverRatingOn(event) {
    const rating = event.target.dataset.id;
    for (let i = 0; i < rating; i++)
      this.ratingButtons[i].classList.add("hovered");
  }

  // When mouse leaves rating
  hoverRatingOff(event) {
    const rating = event.target.dataset.id;
    for (let i = 0; i < rating; i++)
      this.ratingButtons[i].classList.remove("hovered");
  }

  // When pressed arrow on rating
  keyDown(event) {
    if (event.code === KEY_LEFT || event.code === KEY_UP) {
      event.preventDefault();
      if (this.selectedItem <= 0) {
        this.selectedItem = 4;
      } else {
        this.selectedItem--;
      }
      this.focusOnSelectedItem();
    } else if (event.code === KEY_RIGHT || event.code === KEY_DOWN) {
      event.preventDefault();
      if (this.selectedItem >= 4) {
        this.selectedItem = 0;
      } else {
        this.selectedItem++;
      }
      this.focusOnSelectedItem();
    }
  }

  // ----------------------------------------------------------------
  // Helper functions
  // ----------------------------------------------------------------

  focusOnSelectedItem() {
    this.ratingButtons[this.selectedItem].focus();
  }
}
