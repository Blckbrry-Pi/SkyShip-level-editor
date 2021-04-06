import panScrollZoom from './panScrollZoom.js';
import selectExisting from './selectExisting.js';
import selectNew from './selectNew.js';

const states = {
  panScrollZoom,
  selectExisting,
  selectNew
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
  }

  /**
   * Updates the current editor state.
   * @param {keyof typeof states} stateName
   * @param {"attractors" | "zippers" | "obstacles" | "finishLine" | "runner" | null} objectType
   * @param {number | null} selectedIndex
   * @param {number | null} paramIndex
   */
  setState(stateName, objectType = null, selectedIndex = null, paramIndex = 0) {
    this.stateName = stateName;
    this.objectType = objectType;
    this.selectedIndex = selectedIndex;
    this.paramIndex = paramIndex;
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
    if (this.stateName !== "selectExisting") return null;
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
    states[this.stateName](this);
  }

  /**
   * Draws a level at the editor's current translation and scale.
   * @param {Level} level
   * @param {number?} inGame
   */
  draw(level, inGame = 0) {
    // TODO: Uncomment when support for translation is added
    // [level.attractors, level.obstacles, level.zippers].flat().forEach(object => object.draw());

    if (level.runner) level.runner.draw(inGame, this.viewScale, this.viewTranslation);

    // TODO: Uncomment when support for translation is added
    // if (level.finishLine) level.finishLine.draw();
  }
}