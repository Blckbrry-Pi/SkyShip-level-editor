import { FinishLine } from "https://blckbrry-pi.github.io/SkyShip/js/classes/finishLine.js";
import { Param } from "./param.js"

export let finishLineEdit = [
  new Param("Position", editPosition),
  new Param("Rotation", editRotation),
  new Param("Size",     editSize),
];

function editPosition(finishLine) {
  let mousePos = createVector(mouseX, mouseY);
  mousePos.div(editorState.viewScale);
  mousePos.add(editorState.viewTranslation);

  if (editorState.quantization) {
    mousePos.x = round(mousePos.x / editorState.gridSize) * editorState.gridSize;
    mousePos.y = round(mousePos.y / editorState.gridSize) * editorState.gridSize;
  }

  finishLine.pos = mousePos;
}

function editRotation(finishLine) {
  let mousePos = createVector(mouseX, mouseY);
  mousePos.div(editorState.viewScale);
  mousePos.add(editorState.viewTranslation);

  mousePos.sub(finishLine.pos);

  let mousePosHeading = mousePos.heading();

  if (editorState.quantization) {
    mousePosHeading = round(mousePosHeading / (PI / 8)) * (PI / 8);
  }

  finishLine.angle = mousePosHeading;
}

function editSize(finishLine) {
  let mousePos = createVector(mouseX, mouseY);
  mousePos.div(editorState.viewScale);
  mousePos.add(editorState.viewTranslation);

  mousePos.sub(finishLine.pos);
  mousePos.rotate(-finishLine.angle);

  if (editorState.quantization) {
    mousePos.x = round(mousePos.x / editorState.gridSize) * editorState.gridSize;
    mousePos.y = round(mousePos.y / editorState.gridSize) * editorState.gridSize;
  }

  mousePos.x = max(editorState.gridSize, mousePos.x);
  mousePos.y = max(editorState.gridSize, mousePos.y);

  finishLine.size = mousePos;
}