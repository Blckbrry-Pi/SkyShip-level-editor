import { exportLevel } from '../utils.js';
import { Modal } from './modal.js';

export class ExportModal extends Modal {
  /**
   * @param {HTMLElement} element
   * @param {Level} level
   */
  constructor(element, level) {
    super(element, {copy: () => {
      this.copy();
      return false;
    }, close: () => true});

    this.level = level;
    
    this.textarea = element.getElementsByTagName("textarea")[0];
  }

  open() {
    this.textarea.value = exportLevel(this.level);
    super.open();
  }

  copy() {
    navigator.clipboard.writeText(exportLevel(this.level));
  }
}