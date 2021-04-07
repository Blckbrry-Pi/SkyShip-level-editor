import { Runner } from 'https://blckbrry-pi.github.io/SkyShip/js/classes/runner.js';
import { initStars, starryBackground, rotateStars } from 'https://blckbrry-pi.github.io/SkyShip/js/extraFunctions/backgroundStars.js';
import { drawGrid } from './drawRoutine/grid.js';
import { EditorState } from './states/states.js';
import { ToolPalette } from './toolPalette.js';

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

export function mouseWheel(event) {
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