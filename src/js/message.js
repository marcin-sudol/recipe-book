class Message {
  constructor() {
    this.messageContainer = document.getElementById("message-container");
    this.messageTxt = document.getElementById("message-txt");
  }

  displayMessage(message) {
    this.messageTxt.textContent = message;
    this.messageContainer.style.display = "block";
    this.messageContainer
      .animate(
        [
          { top: "-2em", opacity: "0" },
          { top: "1em", opacity: "1" },
        ],
        { duration: 400 }
      )
      .finished.then(() => {
        this.messageContainer.style.top = "1em";
        setTimeout(() => {
          this.messageContainer
            .animate(
              [
                { right: "1em", opacity: "1" },
                { right: "-10em", opacity: "0" },
              ],
              {
                duration: 400,
              }
            )
            .finished.then(() => {
              this.messageContainer.style.display = "none";
              this.messageContainer.style.top = "-10em";
            });
        }, 1500);
      });
  }
}
