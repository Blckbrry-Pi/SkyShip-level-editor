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

  editorState.playtestingLevel = _.cloneDeep(level);

  window.mouseWasPressed = false;
  window.runner = editorState.playtestingLevel.runner;
  window.attractors = editorState.playtestingLevel.attractors;
  window.zippers = editorState.playtestingLevel.zippers;
  window.obstacles = editorState.playtestingLevel.obstacles;
  window.finishLine = editorState.playtestingLevel.finishLine;
  window.timeMult = undefined;
  window.globalMouse = new Mouse();
}

/**
 * @param {import("./states").EditorState} editorState 
 */
export function loop(editorState) {
  const level = editorState.playtestingLevel;
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
  editorState.draw(editorState.playtestingLevel);
}