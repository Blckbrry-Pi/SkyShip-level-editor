import { Attractor } from 'https://blckbrry-pi.github.io/SkyShip/js/classes/attractor.js';
import { Zipper } from 'https://blckbrry-pi.github.io/SkyShip/js/classes/zippers.js';
import { Obstacle } from 'https://blckbrry-pi.github.io/SkyShip/js/classes/obstacles.js';
import { FinishLine } from 'https://blckbrry-pi.github.io/SkyShip/js/classes/finishLine.js';
import { Runner } from 'https://blckbrry-pi.github.io/SkyShip/js/classes/runner.js';

/**
 * Represents the state of the editor and associated metadata.
 */
export class EditorState {
  constructor() {
    /** Name of the current state. */
    this.stateName = "selectExisting";

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
  }

  /**
   * Updates the current editor state.
   * @param {string} stateName
   * @param {"attractors" | "zippers" | "obstacles" | "finishLine" | "runner" | null} objectType
   * @param {number | null} selectedIndex
   */
  setState(stateName, objectType = null, selectedIndex = null) {
    this.stateName = stateName;
    this.objectType = objectType;
    this.selectedIndex = selectedIndex;
  }

  /**
   * Gets the selected object from a level.
   * Returns the object or null if there is no selected object.
   * @param {{attractors: Attractor[], zippers: Zipper[], obstacles: Obstacle[], finishLine: FinishLine, runner: Runner}} level
   * @returns {Attractor | Zipper | Obstacle | FinishLine | Runner | null}
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
}

export let editorState = new EditorState();

/**
 * @type {{name: string, attractors: Attractor[], zippers: Zipper[], obstacles: Obstacle[], finishLine: FinishLine, runner: Runner}}
 */
export let level;