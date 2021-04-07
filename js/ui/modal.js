/**
 * @callback ModalAction
 * @param {Event} e
 * @returns {boolean} true if the modal should close
 */

import { stopPropagatingMouseEvents } from "../utils.js";

export class Modal {
  /**
   * @param {HTMLElement} element 
   * @param {Object.<string, ModalAction>} actions 
   */
  constructor(element, actions) {
    this.element = element;
    this.actions = actions;
    this.isOpen = false;

    stopPropagatingMouseEvents(element);

    const buttons = element.getElementsByTagName("button");
    for (let i = 0; i < buttons.length; i++) {
      const button = buttons[i];
      if (button.dataset.action) {
        button.addEventListener("click", e => {
          if (actions[button.dataset.action](e)) {
            this.close();
          }
        });
      }
    }
  }

  open() {
    this.isOpen = true;
    this.element.style.display = "block";
  }

  close() {
    this.isOpen = false;
    this.element.style.display = "none";
  }
}