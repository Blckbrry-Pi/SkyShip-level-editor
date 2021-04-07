import { Runner } from "https://blckbrry-pi.github.io/SkyShip/js/classes/runner.js";
import { runnerEdit } from "../paramSetFunctions/runner.js";

/**
 * @param {import("states").EditorState} editorState
 */
export function setup(editorState) {
  switch (editorState.objectType) {
    case "runner":
      if (!level.runner) level.runner = new Runner(0, 0, 0, 0, 0);
      break;
  }
}

/**
 * @param {import("states").EditorState} editorState 
 */
export function loop(editorState) {
  cursor("default");

  switch(editorState.objectType) {
    case "attractors":
      break;
    case "zippers":
      break;
    case "obstacles":
      break;
    case "finishLine":
      break;
    case "runner":
      if (editorState.paramIndex === runnerEdit.length) {
        editorState.setState("panScrollZoom");
        break;
      }
      if (editorState.paramIndex !== -1) runnerEdit[editorState.paramIndex].editParam(level.runner)
      editorState.draw(level);
      break;
  }
  console.log(editorState.getSelectedObject(level));
}