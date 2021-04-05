import { initStars, starryBackground } from 'https://blckbrry-pi.github.io/SkyShip/js/extraFunctions/backgroundStars.js';

export function preload() {
  
}
export function setup() {
  createCanvas(windowWidth, windowHeight);
  initStars(width * height / 320);
}
export function draw() {
  starryBackground(false);
  rect(100, 100, 200, 200);
}