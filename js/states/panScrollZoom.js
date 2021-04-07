/**
 * @param {import("states").EditorState} editorState 
 */
export function loop(editorState) {
  cursor(mouseIsPressed ? "grabbing" : "grab");
}