import { Mouse } from "https://blckbrry-pi.github.io/SkyShip/js/classes/mouse.js";
import { runnerStep, timeStep } from "https://blckbrry-pi.github.io/SkyShip/js/extraFunctions/globalFuncs.js";

/**
 * @param {import("./states").EditorState} editorState 
 */
export function setup(editorState) {
  editorState.playtestingLevel = _.cloneDeep(level);

  // @ts-ignore
  window.mouseWasPressed = false;
  
  // @ts-ignore
  window.runner = editorState.playtestingLevel.runner;

  // @ts-ignore
  window.attractors = editorState.playtestingLevel.attractors;

  // @ts-ignore
  window.zippers = editorState.playtestingLevel.zippers;

  // @ts-ignore
  window.obstacles = editorState.playtestingLevel.obstacles;

  // @ts-ignore
  window.finishLine = editorState.playtestingLevel.finishLine;

  // @ts-ignore
  window.timeMult = undefined;

  // @ts-ignore
  window.globalMouse = new Mouse();
}

/**
 * @param {import("./states").EditorState} editorState 
 */
export function loop(editorState) {
  const level = editorState.playtestingLevel;
  cursor("default");
  timeStep();
  runnerStep();
  if (
    level.attractors.find(attractor => {
      return attractor.collided(level.runner.pos.x, level.runner.pos.y);
    }) ||
    level.obstacles.find(obstacle => {
      return obstacle.pointInObstacle(level.runner.pos);
    }) ||
    level.finishLine.pointInLine(level.runner.pos)) {
    editorState.setState("playtestDone");
  }
  editorState.draw(editorState.playtestingLevel);
}