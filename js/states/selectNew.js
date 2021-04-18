import { FinishLine }     from "https://blckbrry-pi.github.io/SkyShip/js/classes/finishLine.js";
import { finishLineEdit } from "../paramSetFunctions/finishLine.js";

import { Runner }         from "https://blckbrry-pi.github.io/SkyShip/js/classes/runner.js";
import { runnerEdit }     from "../paramSetFunctions/runner.js";

import { Attractor }      from "https://blckbrry-pi.github.io/SkyShip/js/classes/attractor.js";
import { attractorEdit }  from "../paramSetFunctions/attractor.js";

import { Zipper }      from "https://blckbrry-pi.github.io/SkyShip/js/classes/zippers.js";
import { zipperEdit } from "../paramSetFunctions/zipper.js";

/**
 * @param {import("states").EditorState} editorState
 */
export function setup(editorState) {
  switch (editorState.objectType) {
    case "attractors":
      level.attractors.push(new Attractor(0, 0, 100, 25, true));
      editorState.selectedIndex = level.attractors.length - 1;
      break;
    case "zippers":
      level.zippers.push(new Zipper(0, 0, 0, 0, 50, 100, 1));
      editorState.selectedIndex = level.zippers.length - 1;
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
        editorState.prevLevelState = level;
        editorState.setState("panScrollZoom");
        break;
      }
      attractorEdit[editorState.paramIndex].editParam(editorState.getSelectedObject(level));
      break;
    case "zippers":
      if (editorState.paramIndex === zipperEdit.length) {
        editorState.prevLevelState = level;
        editorState.setState("panScrollZoom");
        break;
      }
      zipperEdit[editorState.paramIndex].editParam(editorState.getSelectedObject(level));
      break;
    case "obstacles":
      break;
    case "finishLine":
      if (editorState.paramIndex === finishLineEdit.length) {
        editorState.prevLevelState = level;
        editorState.setState("panScrollZoom");
        break;
      }
      finishLineEdit[editorState.paramIndex].editParam(editorState.getSelectedObject(level));
      break;
    case "runner":
      if (editorState.paramIndex === runnerEdit.length) {
        editorState.prevLevelState = level;
        editorState.setState("panScrollZoom");
        break;
      }
      runnerEdit[editorState.paramIndex].editParam(editorState.getSelectedObject(level));
      break;
  }
}

/**
 * @param {import("states").EditorState} editorState 
 */
export function cleanup(editorState) {
  level = editorState.prevLevelState;
}

/**
 * @param {MouseEvent} event 
 */
export function onMouseClick(event) {
  editorState.paramIndex++;
}