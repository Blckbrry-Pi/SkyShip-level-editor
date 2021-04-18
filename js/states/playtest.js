import { Mouse } from "https://blckbrry-pi.github.io/SkyShip/js/classes/mouse.js";
import { runnerStep, timeStep } from "https://blckbrry-pi.github.io/SkyShip/js/extraFunctions/globalFuncs.js";

/**
 * @param {import("./states").EditorState} editorState 
 */
export function setup(editorState) {
  if (!level.runner) {
    alert("Ensure the level contains a runner before playtesting.");
    editorState.setState("panScrollZoom");
    return;
  }


  window.mouseWasPressed = false;
  window.runner = level.runner;
  window.attractors = level.attractors;
  window.zippers = level.zippers;
  window.obstacles = level.obstacles;
  window.finishLine = level.finishLine;
  window.timeMult = undefined;
  window.globalMouse = new Mouse();
}

/**
 * @param {import("./states").EditorState} editorState 
 */
export function loop(editorState) {
  cursor("default");
  window.globalMouse.setTranslation(editorState.viewTranslation);
  window.globalMouse.setScale(editorState.viewScale);
  timeStep();
  runnerStep();
  if (
    level.attractors.find(attractor => {
      return attractor.collided(level.runner.pos.x, level.runner.pos.y);
    }) ||
    level.obstacles.find(obstacle => {
      return obstacle.pointInObstacle(level.runner.pos);
    }) ||
    level.finishLine && level.finishLine.pointInLine(level.runner.pos)) {
    editorState.setState("playtestDone");
  }
}

/**
 * @param {import("./states").EditorState} editorState 
 */
export function cleanup(editorState) {
  editorState.playtestingLevel = level;
  level = editorState.prevLevelState;
}