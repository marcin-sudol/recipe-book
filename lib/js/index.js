"use strict";

var BREAKDOWN_MD = 800; // Constants for keyboard codes

var KEY_LEFT = "ArrowLeft";
var KEY_RIGHT = "ArrowRight";
var KEY_UP = "ArrowUp";
var KEY_DOWN = "ArrowDown";
var KEY_ESCAPE = "Escape";

var wideWindow = function wideWindow() {
  return window.innerWidth >= BREAKDOWN_MD;
};

function log(str) {
  console.log(str);
}

window.addEventListener("load", function () {
  var app = new MainApp(recipes);
});