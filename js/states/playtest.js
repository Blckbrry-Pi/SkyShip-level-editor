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
  cursor("default");
  timeStep();
  runnerStep();
  editorState.draw(editorState.playtestingLevel);
}