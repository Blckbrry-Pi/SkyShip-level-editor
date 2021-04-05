import { initStars, starryBackground } from 'https://blckbrry-pi.github.io/SkyShip/js/extraFunctions/backgroundStars.js';

const sketchHeight = 100;
const containerPos = createVector(100, 100);
const containerSize = createVector(200, 250);

function s(sketch) {

  let x = 100;
  let y = 100;

  sketch.setup = () => {
    sketch.createCanvas(200, 100);
  };

  sketch.draw = () => {
    sketch.stroke(200, 0, 0);
    sketch.strokeWeight(3);
    sketch.fill(255);
    sketch.rect(0, 0, sketch.width, sketch.height)
    sketch.noStroke();
    sketch.fill(0);
    sketch.textAlign(LEFT, TOP);
    sketch.text(sketch.mouseX + ", " + sketch.mouseY, 3, 3);
  };
};

export function preload() {
  
}
export function setup() {
  createCanvas(windowWidth, windowHeight);
  initStars(width * height / 320);

  let div = createDiv('');
  div.style('overflow', 'scroll');
  div.style('max-height', containerSize.y + 'px');
  div.position(containerPos.x, containerPos.y);

  for (let i = 0; i < 10; i++) div.elt.appendChild(new p5(s).canvas);
}
export function draw() {
  starryBackground(false);
  stroke(0, 255, 0);
  strokeWeight(4);
  rect(containerPos.x, containerPos.y, containerSize.x, containerSize.y);
}