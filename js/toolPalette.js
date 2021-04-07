export class ToolPalette {
  /**
   * @param {import("./states/states.js").EditorState} editorState 
   * @param {HTMLElement} domElement
   */
  constructor(editorState, domElement) {
    this.editorState = editorState;
    this.domElement = domElement;
  }

  setup() {
    this.domElement.childNodes.forEach(
      /**
       * @param {HTMLElement} button
       */
      button => {
        if (!(button instanceof HTMLElement)) return;
        button.addEventListener("click", e => {
          const {state, type, active} = (/** @type {HTMLElement} */ (e.target)).dataset;
          if (!active) {
            // We could theoretically do a type guard here but it really isn't necessary
            // @ts-ignore
            this.editorState.setState(state, type || null);
          }
        });
      }
    );

    this.domElement.addEventListener("click", e => {
      e.stopPropagation(); // Stop click events from propagating to the canvas behind it
    });

    this.update();
  }

  update() {
    this.domElement.childNodes.forEach(
      button => {
        if (!(button instanceof HTMLElement)) return;
        if (this.isActive(button.dataset.state, button.dataset.type)) {
          button.dataset.active = "true";
        } else {
          delete button.dataset.active;
        }
      }
    );
  }

  /**
   * @param {string} state 
   * @param {string} type 
   */
  isActive(state, type) {
    if (this.editorState.stateName === state) {
      if (!type || this.editorState.objectType === type) {
        return true;
      }
    }

    return false;
  }
}