class RecipeRating {
  constructor(saveRatingCallback) {
    // Saving callbacks
    this.saveRatingCallback = saveRatingCallback;

    // Setting DOM elements
    this.recipeRatingButtons = [];
    for (let i = 1; i <= 5; i++) {
      this.recipeRatingButtons.push(
        document.getElementById("recipe-rating-" + i)
      );
    }

    // Setting additional properties
    this.currentRating = 0;

    // Binding methods
    this.clickedRating = this.clickedRating.bind(this);
    this.hoverRatingOn = this.hoverRatingOn.bind(this);
    this.hoverRatingOff = this.hoverRatingOff.bind(this);

    // Adding events listeners
    for (let button of this.recipeRatingButtons) {
      // button.onclick = this.clickedLocalRating;
      button.onmouseenter = this.hoverRatingOn;
      button.onmouseleave = this.hoverRatingOff;
    }
  }

  // ----------------------------------------------------------------
  // Updating displayed rating
  // ----------------------------------------------------------------

  // Update displayed rating to rating in stored obj
  updateRating(value, style) {
    //   for (let i = 0; i < 5; i++) {
    //     this.recipeRatingButtons[i].classList.remove("checked");
    //     this.recipeRatingButtons[i].setAttribute("aria-checked", false);
    //   }
    //   if (this.obj.rating.hasOwnProperty("local")) {
    //     const localRating = parseInt(this.obj.rating.local);
    //     this.recipeRatingButtons[localRating - 1].setAttribute(
    //       "aria-checked",
    //       true
    //     );
    //     for (let i = 0; i < localRating; i++) {
    //       const button = this.recipeRatingButtons[i];
    //       button.classList.add("checked");
    //       if (style === "fade") {
    //         button.classList.remove("hovered");
    //         button.animate(
    //           {
    //             transform: ["scale(1.4)", "scale(1.0)"],
    //             opacity: [0, 1],
    //           },
    //           { duration: 600, easing: "ease-out" }
    //         );
    //       }
    //     }
    //   }
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
      const rating = parseInt(button.dataset.id);
      this.updateRating(rating, "fade");
      this.saveRatingCallback(rating);
    }
  }

  // When mouse enters rating
  hoverRatingOn(event) {
    const rating = event.target.dataset.id;
    for (let i = 0; i < rating; i++)
      this.recipeRatingButtons[i].classList.add("hovered");
  }

  // When mouse leaves rating
  hoverRatingOff(event) {
    const rating = event.target.dataset.id;
    for (let i = 0; i < rating; i++)
      this.recipeRatingButtons[i].classList.remove("hovered");
  }
}
