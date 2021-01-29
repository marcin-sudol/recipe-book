class Message {
  constructor() {
    this.messageTemplate = document.getElementById("message-template");
    this.nextId = 0;
  }

  getNextId() {
    const nextId = this.nextId;
    this.nextId++;
    return nextId;
  }

  displayMessage(message) {
    const dataId = this.getNextId();
    // creates document fragment;
    const messageFragment = this.messageTemplate.content.cloneNode(true);
    messageFragment.querySelector(".message-container").dataset.id = dataId;
    messageFragment.querySelector(".message-txt").textContent = message;
    // append fragment's content into dom
    document.body.appendChild(messageFragment);
    // find added element and animate it
    const messageElement = document.querySelector(
      `.message-container[data-id="${dataId}"]`
    );
    messageElement
      .animate(
        [
          { top: "-2em", opacity: "0" },
          { top: "1em", opacity: "1" },
        ],
        { duration: 400 }
      )
      .finished.then(() => {
        setTimeout(() => {
          messageElement
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
              document.body.removeChild(messageElement);
            });
        }, 1500);
      });
  }
}
