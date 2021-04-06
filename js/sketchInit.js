import { Runner } from 'https://blckbrry-pi.github.io/SkyShip/js/classes/runner.js';
import { initStars, starryBackground, rotateStars } from 'https://blckbrry-pi.github.io/SkyShip/js/extraFunctions/backgroundStars.js';
import { drawGrid } from './drawRoutine/grid.js';
import { runnerSelector } from "./selectorSketches/runnerScroll.js"
import { passCallbacks } from './selectorSketches/wrapperFunctions.js';
import { EditorState } from './states/states.js';

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
    () => {level.runner = new Runner(0, 0, 0, 0, 0); editorState.setState("selectNew", "runner", null, -1);}
  );

  for (let i = 0; i < 10; i++) new p5(runnerSketchMaker, div.elt);

  editorState = new EditorState();
  level = {
    name: "My Level",
    attractors: [],
    zippers: [],
    obstacles: []
  };
}

export function draw() {
  rotateStars(0.2);
  starryBackground(false);
  stroke(0, 255, 0);
  strokeWeight(4);
  rect(containerPos.x, containerPos.y, containerSize.x, containerSize.y);
  drawGrid();
  editorState.doStateLoop();
}

function mouseIsInContainer() {
  let xInBounds = containerPos.x < mouseX && mouseX < containerPos.x + containerSize.x;
  let yInBounds = containerPos.y < mouseY && mouseY < containerPos.y + containerSize.y;
  return xInBounds && yInBounds;
}

export function mouseWheel(event) {
  if (mouseIsInContainer()) return true;

  const maxScale = 4;
  const minScale = 0.25;

  let mousePos = createVector(mouseX, mouseY);

  let scaleAmount = Math.exp(-event.delta / 100);
  if (editorState.viewScale * scaleAmount > maxScale) scaleAmount = maxScale / editorState.viewScale;
  if (editorState.viewScale * scaleAmount < minScale) scaleAmount = minScale / editorState.viewScale;

  editorState.viewScale *= scaleAmount;

  mousePos.mult(1 - 1/scaleAmount);
  mousePos.div(editorState.viewScale);

  editorState.viewTranslation.add(mousePos);
  return false;
}

export function mouseDragged(event) {
  let movement = createVector(event.movementX, event.movementY);
  movement.div(editorState.viewScale);
  if (editorState.stateName == "panScrollZoom") editorState.viewTranslation.sub(movement);
}

export function mouseClicked() {
  switch (editorState.stateName) {
    case "selectExisting":
      editorState.setState("panScrollZoom");
      break;
    case "selectNew":
      editorState.paramIndex++;
      break;
  }
}