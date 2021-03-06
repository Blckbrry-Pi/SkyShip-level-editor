import { initStars, starryBackground, rotateStars } from 'https://blckbrry-pi.github.io/SkyShip/js/extraFunctions/backgroundStars.js';
import { drawGrid } from './drawRoutine/grid.js';
import { EditorState } from './states/states.js';
import { ExportModal } from './ui/export.js';
import { ImportModal } from './ui/import.js';
import { SettingsModal } from './ui/settings.js';
import { ToolPalette } from './ui/toolPalette.js';
import { localStorageKeys } from './utils.js';

export function preload() {
  
}

function configureStars() {
  let stars = parseInt(localStorage.getItem(localStorageKeys.stars));
  if (isNaN(stars)) stars = 3000;

  initStars(stars);
}

export function setup() {
  createCanvas(windowWidth, windowHeight);
  configureStars();

  editorState = new EditorState();
  
  editorState.toolPalette = new ToolPalette(editorState, document.getElementById("tool-palette"));
  editorState.toolPalette.setup();

  level = {
    name: "My Level",
    attractors: [],
    zippers: [],
    obstacles: []
  };

  const exportModal = new ExportModal(document.getElementById("export-modal"), level);
  document.getElementById("export-button").addEventListener("click", e => {
    e.stopPropagation();
    try {
      exportModal.open();
    } catch (/** @type {Error} */ error) {
      alert(error.message);
    }
  });

  const importModal = new ImportModal(document.getElementById("import-modal"), level);
  document.getElementById("import-button").addEventListener("click", e => {
    e.stopPropagation();
    importModal.open();
  });

  const settingsModal = new SettingsModal(document.getElementById("settings-modal"), () => configureStars());
  document.getElementById("settings-button").addEventListener("click", e => {
    e.stopPropagation();
    settingsModal.open();
  });
  
}

export function draw() {
  if (!editorState || !level) return;

  rotateStars(0.2);
  starryBackground(false);
  drawGrid();
  editorState.draw(level);
  editorState.doStateLoop();
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

export function mouseClicked(event) {
  editorState.doMouseClick(event);
}