"use strict";

var BREAKDOWN_MD = 800;

var wideWindow = function wideWindow() {
  return window.innerWidth >= BREAKDOWN_MD;
};

function log(str) {
  console.log(str);
}

window.addEventListener("load", function () {
  var app = new MainApp(recipes);
});