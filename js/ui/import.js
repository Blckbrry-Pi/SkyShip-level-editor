import { JSON2Level } from 'https://blckbrry-pi.github.io/SkyShip/js/extraFunctions/levels.js';
import { Modal } from './modal.js';

export class ImportModal extends Modal {
  /**
   * @param {HTMLElement} element
   * @param {Level} level
   */
  constructor(element, level) {
    super(element, {
      cancel: () => {
        return true;
      },
      import: () => {
        try {
          this.import();
        } catch (/** @type {Error} */ e) {
          alert(`Failed to import level: ${e.message}`);
          return false;
        }
        return true;
      }
    });

    this.level = level;
    
    this.textarea = element.getElementsByTagName("textarea")[0];
  }

  open() {
    this.textarea.value = "";
    super.open();
  }

  import() {
    this.level = JSON2Level(this.textarea.value);
    
    // TODO: Resolve global state weirdness
    level = this.level;
  }
}