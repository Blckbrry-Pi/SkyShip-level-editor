import { runnerEdit } from "../paramSetFunctions/runner.js";

/**
 * @param {import("states").EditorState} editorState 
 */
export default function selectNew(editorState) {
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
      level.runner.draw(0, editorState.viewScale, editorState.viewTranslation);
      break;
  }
  console.log(editorState.getSelectedObject(level));
}