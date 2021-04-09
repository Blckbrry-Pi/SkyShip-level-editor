/**
 * @param {import("./states").EditorState} editorState 
 */
export function loop(editorState) {
  cursor("default");
  editorState.draw(editorState.playtestingLevel);
}