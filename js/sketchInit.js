import { Runner } from 'https://blckbrry-pi.github.io/SkyShip/js/classes/runner.js';
import { initStars, starryBackground, rotateStars } from 'https://blckbrry-pi.github.io/SkyShip/js/extraFunctions/backgroundStars.js';
import { drawGrid } from './drawRoutine/grid.js';
import { EditorState } from './states/states.js';
import { ToolPalette } from './toolPalette.js';

const containerPos = createVector(100, 100);
const containerSize = createVector(200, 250);

export function preload() {
  
}

export function setup() {
  createCanvas(windowWidth, windowHeight);
  initStars(width * height / 320);

  editorState = new EditorState();
  editorState.toolPalette = new ToolPalette(editorState, document.getElementById("tool-palette"));
  editorState.toolPalette.setup();
  level = {
    name: "My Level",
    attractors: [],
    zippers: [],
    obstacles: []
  };
}

export function draw() {
  if (!editorState || !level) return;

  rotateStars(0.2);
  starryBackground(false);
  drawGrid();
  editorState.doStateLoop();
  editorState.draw(level);
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

  mousePos.mult(1 - scaleAmount);
  mousePos.div(-editorState.viewScale);

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
      break;
    case "selectNew":
      editorState.paramIndex++;
      break;
  }
}