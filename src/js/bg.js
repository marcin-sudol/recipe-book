class Bg {
  constructor(showNavCallback) {
    this.bg = document.getElementById("bg");
    this.menuButton = document.getElementById("bg-menu-button");

    this.menuButton.addEventListener("click", showNavCallback);
  }

  setTabIndex(tabIndex) {
    this.menuButton.setAttribute("tabindex", tabIndex);
  }

  enableTab() {
    this.setTabIndex("0");
  }

  disableTab() {
    this.setTabIndex("-1");
  }
}
