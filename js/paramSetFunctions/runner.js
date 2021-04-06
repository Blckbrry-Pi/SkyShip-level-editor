import { Runner } from "https://blckbrry-pi.github.io/SkyShip/js/classes/runner.js";
import { drawArrow } from "./commonFuncs.js";
import { Param } from "./param.js"

export let runnerEdit = [
  new Param("Position",          editPosition),
  new Param("Starting Velocity", editStartVel),
  new Param("Target Velocity",   editTargetVel),
];

function editPosition(runner) {
  let mousePos = createVector(mouseX, mouseY);
  mousePos.div(editorState.viewScale);
  mousePos.add(editorState.viewTranslation);

  if (editorState.quantization) {
    mousePos.x = round(mousePos.x / (editorState.gridSize * editorState.viewScale)) * (editorState.gridSize * editorState.viewScale);
    mousePos.y = round(mousePos.y / (editorState.gridSize * editorState.viewScale)) * (editorState.gridSize * editorState.viewScale);
  }

  runner.pos = mousePos;
}

function editStartVel(runner) {
  let mousePos = createVector(mouseX, mouseY);
  mousePos.div(editorState.viewScale);
  mousePos.add(editorState.viewTranslation);

  mousePos.sub(runner.pos);

  mousePos.div(4);

  if (editorState.quantization) {
    mousePos.x = round(mousePos.x);
    mousePos.y = round(mousePos.y);
  }

  runner.vel = mousePos;

  drawArrow(runner.pos, p5.Vector.mult(mousePos, 4), color(0, 255, 0, 70));
}

function editTargetVel(runner) {
  let mousePos = createVector(mouseX, mouseY);
  mousePos.div(editorState.viewScale);
  mousePos.add(editorState.viewTranslation);

  mousePos.sub(runner.pos);

  mousePos.div(4);

  if (editorState.quantization) {
    mousePos.set(round(mousePos.mag()), 0);
  }

  runner.targetVelMag = mousePos.mag();


  mousePos.rotate(runner.vel.heading());
  drawArrow(runner.pos, p5.Vector.mult(mousePos, 4), color(0, 255, 0, 70));
}