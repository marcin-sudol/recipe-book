const BREAKDOWN_MD = 800;

// Constants for keyboard codes
const KEY_LEFT = "ArrowLeft";
const KEY_RIGHT = "ArrowRight";
const KEY_UP = "ArrowUp";
const KEY_DOWN = "ArrowDown";
const KEY_ESCAPE = "Escape";

const wideWindow = () => {
  return window.innerWidth >= BREAKDOWN_MD;
};

function log(str) {
  console.log(str);
}

window.addEventListener("load", () => {
  const app = new MainApp(recipes);
});
