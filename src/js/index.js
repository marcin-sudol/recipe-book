const BREAKDOWN_MD = 800;

const wideWindow = () => {
  return window.innerWidth >= BREAKDOWN_MD;
};

function log(str) {
  console.log(str);
}

window.addEventListener("load", () => {
  const app = new MainApp(recipes);
});
