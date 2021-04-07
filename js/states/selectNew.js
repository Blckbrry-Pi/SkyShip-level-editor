import { FinishLine }     from "https://blckbrry-pi.github.io/SkyShip/js/classes/finishLine.js";
import { finishLineEdit } from "../paramSetFunctions/finishLine.js";

import { Runner }         from "https://blckbrry-pi.github.io/SkyShip/js/classes/runner.js";
import { runnerEdit }     from "../paramSetFunctions/runner.js";

import { Attractor }      from "https://blckbrry-pi.github.io/SkyShip/js/classes/attractor.js";
import { attractorEdit }  from "../paramSetFunctions/attractor.js";

/**
 * @param {import("states").EditorState} editorState
 */
export function setup(editorState) {
  switch (editorState.objectType) {
    case "attractors":
      level.attractors.push(new Attractor(0, 0, 100, 25, true));
      editorState.selectedIndex = level.attractors.length - 1;
      break;
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
      if (editorState.paramIndex === attractorEdit.length) {
        editorState.setState("panScrollZoom");
        break;
      }
      attractorEdit[editorState.paramIndex].editParam(editorState.getSelectedObject(level));
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
      finishLineEdit[editorState.paramIndex].editParam(editorState.getSelectedObject(level));
      break;
    case "runner":
      if (editorState.paramIndex === runnerEdit.length) {
        editorState.setState("panScrollZoom");
        break;
      }
      runnerEdit[editorState.paramIndex].editParam(editorState.getSelectedObject(level));
      break;
  }
}