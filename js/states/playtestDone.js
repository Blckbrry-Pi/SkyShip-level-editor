/**
 * @param {import("./states").EditorState} editorState 
 */
export function setup(editorState) {
  level = editorState.playtestingLevel;
}

/**
 * @param {import("./states").EditorState} editorState 
 */
export function loop(editorState) {
  cursor("default");
}

/**
 * @param {import("./states").EditorState} editorState 
 */
export function cleanup(editorState) {
  level = editorState.prevLevelState;
}