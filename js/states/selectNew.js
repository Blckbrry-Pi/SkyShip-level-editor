import { FinishLine } from "https://blckbrry-pi.github.io/SkyShip/js/classes/finishLine.js";
import { finishLineEdit } from "../paramSetFunctions/finishLine.js";

import { Runner } from "https://blckbrry-pi.github.io/SkyShip/js/classes/runner.js";
import { runnerEdit } from "../paramSetFunctions/runner.js";

/**
 * @param {import("states").EditorState} editorState
 */
export function setup(editorState) {
  switch (editorState.objectType) {
    case "runner":
      level.runner = new Runner(0, 0, 0, 0, 0);
      break;
    case "finishLine":
      level.finishLine = new FinishLine(0, 0, 0, 200, 50);
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
      if (editorState.paramIndex === finishLineEdit.length) {
        editorState.setState("panScrollZoom");
        break;
      }
      if (editorState.paramIndex !== -1) finishLineEdit[editorState.paramIndex].editParam(level.finishLine);
      break;
    case "runner":
      if (editorState.paramIndex === runnerEdit.length) {
        editorState.setState("panScrollZoom");
        break;
      }
      if (editorState.paramIndex !== -1) runnerEdit[editorState.paramIndex].editParam(level.runner);
      break;
  }
}