import { localStorageKeys } from '../utils.js';
import { Modal } from './modal.js';

/**
 * @callback UpdateStarsCallback
 * @returns {void}
 */

export class SettingsModal extends Modal {
  /**
   * @param {HTMLElement} element
   * @param {UpdateStarsCallback} updateStars
   */
  constructor(element, updateStars) {
    super(element, {done: () => true});

    this.starMenu = element.getElementsByTagName("select")[0];

    this.starMenu.value = localStorage.getItem(localStorageKeys.stars) || "3000";

    this.starMenu.addEventListener("change", _ => {
      localStorage.setItem(localStorageKeys.stars, this.starMenu.value);
      updateStars();
    });
  }
}