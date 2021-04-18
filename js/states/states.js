import * as panScrollZoom from './panScrollZoom.js';
import * as selectExisting from './selectExisting.js';
import * as selectNew from './selectNew.js';
import * as playtest from './playtest.js';
import * as playtestDone from './playtestDone.js';

/**
 * @callback StateCallback
 * @param {EditorState} editorState
 * @returns {void}
 */

/**
 * @callback UserMouseEvent
 * @param {MouseEvent} event
 * @returns {void} 
 */

/**
 * @typedef State
 * @property {StateCallback} [setup]
 * @property {StateCallback} loop
 * @property {StateCallback} [cleanup]
 * @property {UserMouseEvent} [onMouseClick]
 */

const states = {
  /** @type {State} */ panScrollZoom,
  /** @type {State} */ selectExisting,
  /** @type {State} */ selectNew,
  /** @type {State} */ playtest,
  /** @type {State} */ playtestDone
};

/**
 * Represents the state of the editor and associated metadata.
 */
export class EditorState {
  /**
   * @param {keyof typeof states} [state]
   */
  constructor(state = "panScrollZoom") {
    /**
     * Name of the current state.
     */
    this.stateName = state;

    /**
     * Type of selected object.
     * @type {"attractors" | "zippers" | "obstacles" | "finishLine" | "runner" | null}
     * **/
    this.objectType = null;

    /**
     * Index of selected attractor, zipper, or obstacle.
     * @type {number | null}
     */
    this.selectedIndex = null;

    /**
     * Index of selected attractor, zipper, or obstacle.
     * @type {number}
     */
    this.paramIndex = 0;

    /**
     * Translation of the editor's level view.
     * @type {p5.Vector}
     */
    this.viewTranslation = createVector();

    /**
     * Zoom level/scale of editor's level view.
     * @type {number}
     */
    this.viewScale = 1;

    /**
     * Stores the level-relative grid size.
     * @type {number}
     * **/
    this.gridSize = 25;

    /**
     * Stores whether the editor is quantizing inputs or not.
     * @type {boolean}
     * **/
    this.quantization = true;

    /**
     * Tool palette associated with the editor.
     * @type {import("../ui/toolPalette.js").ToolPalette | undefined}
     */
    this.toolPalette = undefined;

    /**
     * Level during adding new or editing existing.
     * @type {Level | null}
     */
    this.prevLevelState = _.cloneDeep(level);

    /**
     * Level during playtesting.
     * @type {Level | null}
     */
    this.playtestingLevel = null;

    /**
     * Stores position of previous mouse click
     * @type {p5.Vector}
     */
    this.prevClick = createVector(0, 0);

    /**
     * @typedef ObjectIndex
     * @property {"attractors" | "zippers" | "obstacles" | "finishLine" | "runner"} objType
     * @property {number} index
     */
    /**
     * Stores which objects are still possibly selected.
     * @type {ObjectIndex[]}
     */
    this.selectedObjs = [];

    if (states[this.stateName].setup) states[this.stateName].setup(this);
  }

  /**
   * Updates the current editor state.
   * @param {keyof typeof states} stateName
   * @param {"attractors" | "zippers" | "obstacles" | "finishLine" | "runner" | null} objectType
   * @param {number | null} selectedIndex
   * @param {number | null} paramIndex
   */
  setState(stateName, objectType = null, selectedIndex = null, paramIndex = 0) {
    if (states[this.stateName].cleanup) states[this.stateName].cleanup(this);

    this.prevLevelState = _.cloneDeep(level);

    this.stateName = stateName;
    this.objectType = objectType;
    this.selectedIndex = selectedIndex;
    this.paramIndex = paramIndex;
    this.toolPalette.update();

    if (states[this.stateName].setup) states[this.stateName].setup(this);
  }

  /**
   * Gets the selected object from a level.
   * Returns the object or null if there is no selected object.
   * @param {Level} level
   * @returns {import("https://blckbrry-pi.github.io/SkyShip/js/classes/attractor.js").Attractor | 
   *  import("https://blckbrry-pi.github.io/SkyShip/js/classes/zippers.js").Zipper |
   *  import("https://blckbrry-pi.github.io/SkyShip/js/classes/obstacles.js").Obstacle |
   *  import("https://blckbrry-pi.github.io/SkyShip/js/classes/finishLine.js").FinishLine |
   *  import("https://blckbrry-pi.github.io/SkyShip/js/classes/runner.js").Runner |
   *  null}
   */
  getSelectedObject(level) {
    if (!this.objectType) {
      return null;
    } else if (this.objectType === "finishLine" || this.objectType === "runner") {
      return level[this.objectType];
    } else {
      return level[this.objectType][this.selectedIndex];
    }
  }

  /**
   * Calls the function of the current state.
   */
  doStateLoop() {
    states[this.stateName].loop(this);
  }

  /**
   * Draws a level at the editor's current translation and scale.
   * @param {Level} level
   */
  draw(level) {
    [level.attractors, level.obstacles, level.zippers].flat().forEach(object => object.draw(this.viewScale, this.viewTranslation));

    if (level.finishLine) level.finishLine.draw(this.viewScale, this.viewTranslation);

    if (level.runner) level.runner.draw(0, this.viewScale, this.viewTranslation);
  }

  /**
   * Runs the mouse click even for each state.
   * @param {MouseEvent} event
   */
  doMouseClick(event) {
    if (states[this.stateName].onMouseClick) states[this.stateName].onMouseClick(event);
    this.prevClick = createVector(mouseX, mouseY);
  }
}