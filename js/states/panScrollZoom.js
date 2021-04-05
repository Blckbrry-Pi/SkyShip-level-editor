/**
 * @param {import("states").EditorState} editorState 
 */
export default function panScrollZoom(editorState) {
  cursor(mouseIsPressed ? "grabbing" : "grab");
}