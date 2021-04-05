import { initStars, starryBackground } from 'https://blckbrry-pi.github.io/SkyShip/js/extraFunctions/backgroundStars.js';
import { runnerSelector } from "./selectorSketches/runnerScroll.js"
import { passCallbacks } from './selectorSketches/wrapperFunctions.js';

const containerPos = createVector(100, 100);
const containerSize = createVector(200, 250);

let runneravailable = 10;

export function preload() {
  
}
export function setup() {
  createCanvas(windowWidth, windowHeight);
  initStars(width * height / 320);

  let div = createDiv('');
  div.style('overflow', 'scroll');
  div.style('max-height', containerSize.y + 'px');
  div.position(containerPos.x, containerPos.y);

  let runnerSketchMaker = passCallbacks(
    runnerSelector,
    () => {return runneravailable > 0;},
    mouseIsInContainer,
    () => {console.log(runneravailable); runneravailable--;}
  );

  for (let i = 0; i < 10; i++) div.elt.appendChild(new p5(runnerSketchMaker).canvas);
}

export function draw() {
  starryBackground(false);
  stroke(0, 255, 0);
  strokeWeight(4);
  rect(containerPos.x, containerPos.y, containerSize.x, containerSize.y);
}

function mouseIsInContainer() {
  let xInBounds = containerPos.x < mouseX && mouseX < containerPos.x + containerSize.x;
  let yInBounds = containerPos.y < mouseY && mouseY < containerPos.y + containerSize.y;
  return xInBounds && yInBounds;
}