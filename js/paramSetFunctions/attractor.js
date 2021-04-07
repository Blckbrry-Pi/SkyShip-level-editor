import { Attractor } from "https://blckbrry-pi.github.io/SkyShip/js/classes/attractor.js";
import { Param } from "./param.js"

export let attractorEdit = [
  new Param("Position",        editPosition),
  new Param("Field Radius",    editFieldRad),
  new Param("Physical Radius", editPhysRad),
];

function editPosition(attractor) {
  let mousePos = createVector(mouseX, mouseY);
  mousePos.div(editorState.viewScale);
  mousePos.add(editorState.viewTranslation);

  if (editorState.quantization) {
    mousePos.x = round(mousePos.x / editorState.gridSize) * editorState.gridSize;
    mousePos.y = round(mousePos.y / editorState.gridSize) * editorState.gridSize;
  }

  attractor.x = mousePos.x;
  attractor.y = mousePos.y;
}

function editFieldRad(attractor) {
  let mousePos = createVector(mouseX, mouseY);
  mousePos.div(editorState.viewScale);
  mousePos.add(editorState.viewTranslation);

  mousePos.sub(createVector(attractor.x, attractor.y));

  let mousePosMag = mousePos.mag();

  if (editorState.quantization) {
    mousePosMag = round(mousePosMag / editorState.gridSize) * editorState.gridSize;
  }

  mousePosMag = Math.max(editorState.gridSize * 2, mousePosMag);

  attractor.fieldSize = mousePosMag; 
}

function editPhysRad(attractor) {
  let mousePos = createVector(mouseX, mouseY);
  mousePos.div(editorState.viewScale);
  mousePos.add(editorState.viewTranslation);

  mousePos.sub(createVector(attractor.x, attractor.y));

  let mousePosMag = mousePos.mag();

  if (editorState.quantization) {
    mousePosMag = round(mousePosMag / editorState.gridSize) * editorState.gridSize;
  }

  mousePosMag = Math.min(Math.max(editorState.gridSize, mousePosMag), attractor.fieldSize - editorState.gridSize);

  attractor.physSize = mousePosMag; 
}