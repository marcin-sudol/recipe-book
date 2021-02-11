class RecipeRating {
  constructor(saveRatingCallback) {
    // Saving callbacks
    this.saveRatingCallback = saveRatingCallback;

    // Setting DOM elements
    this.ratingButtons = [];
    for (let i = 1; i <= 5; i++) {
      this.ratingButtons.push(document.getElementById("recipe-rating-" + i));
    }

    // Binding methods
    this.clickedRating = this.clickedRating.bind(this);
    this.hoverRatingOn = this.hoverRatingOn.bind(this);
    this.hoverRatingOff = this.hoverRatingOff.bind(this);

    // Setting additional properties
    this.currentRating = 0;

    // Adding events listeners
    for (let button of this.ratingButtons) {
      button.onclick = this.clickedRating;
      button.onmouseenter = this.hoverRatingOn;
      button.onmouseleave = this.hoverRatingOff;
    }
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
}
