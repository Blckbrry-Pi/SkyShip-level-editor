import { JSON2Level } from 'https://blckbrry-pi.github.io/SkyShip/js/extraFunctions/levels.js';
import { exportLevel } from '../utils.js';
import { Modal } from './modal.js';

export class ExportModal extends Modal {
  /**
   * @param {HTMLElement} element
   * @param {Level} level
   */
  constructor(element, level) {
    super(element, {
      copy: () => {
        this.copy();
        return false;
      }, 
      cancel: () => {
        return true;
      },
      import: () => {
        if (this.isDirty) {
          try {
            this.import();
          } catch (/** @type {Error} */ e) {
            alert(`Failed to import level: ${e.message}`);
            return false;
          }
        }
        return true;
      }
    });

    this.level = level;
    
    this.textarea = element.getElementsByTagName("textarea")[0];
    
    this.textarea.addEventListener("change", _ => {
      this.isDirty = true;
    });
  }

  open() {
    this.textarea.value = exportLevel(this.level);
    this.isDirty = false;
    super.open();
  }

  import() {
    this.level = JSON2Level(this.textarea.value);
    
    // TODO: Resolve global state weirdness
    level = this.level;
  }

  copy() {
    navigator.clipboard.writeText(this.textarea.value);
  }
}