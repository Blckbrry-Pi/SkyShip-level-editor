import { Mouse } from "https://blckbrry-pi.github.io/SkyShip/js/classes/mouse.js";
import { runnerStep, timeStep } from "https://blckbrry-pi.github.io/SkyShip/js/extraFunctions/globalFuncs.js";

/**
 * @param {import("./states").EditorState} editorState 
 */
export function setup(editorState) {
  editorState.oldLevel = level;
  level = _.cloneDeep(level);

  // @ts-ignore
  window.mouseWasPressed = false;
  
  // @ts-ignore
  window.runner = level.runner;

  // @ts-ignore
  window.attractors = level.attractors;

  // @ts-ignore
  window.zippers = level.zippers;

  // @ts-ignore
  window.obstacles = level.obstacles;

  // @ts-ignore
  window.finishLine = level.finishLine;

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
}

/**
 * @param {import("./states").EditorState} editorState 
 */
export function cleanup(editorState) {
  level = editorState.oldLevel;
  editorState.oldLevel = null;
}