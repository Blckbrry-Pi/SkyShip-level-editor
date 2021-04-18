import { Mouse } from "https://blckbrry-pi.github.io/SkyShip/js/classes/mouse.js";

import { finishLineEdit } from "../paramSetFunctions/finishLine.js";
import { runnerEdit }     from "../paramSetFunctions/runner.js";
import { attractorEdit }  from "../paramSetFunctions/attractor.js";
import { zipperEdit } from "../paramSetFunctions/zipper.js";

/**
 * @param {import("states").EditorState} editorState 
 */
export function setup(editorState) {
  editorState.paramIndex = -1;
  editorState.selectedObjs = [];
}

/**
 * @param {import("states").EditorState} editorState 
 */
 export function loop(editorState) {
  cursor("default");

  if (editorState.getSelectedObject(level) === null) {
    if (editorState.selectedObjs.length !== 0) {
      if (editorState.selectedObjs.length === 1) {
        editorState.objectType = editorState.selectedObjs[0].objType;
        editorState.selectedIndex = editorState.selectedObjs[0].index;
        return;
      }
      drawMenu(editorState.selectedObjs.map(element => {return {entryName: element.objType, index: element.index}}));
    }
  } else if (editorState.paramIndex === -1) {
    let editList = {
      runner:     runnerEdit,
      finishLine: finishLineEdit,
      attractors: attractorEdit,
      zippers:    zipperEdit,
    }[editorState.objectType];
    drawMenu(editList.map(element => {return {entryName: element.name, index: null}}));
  } else {
    let editList = {
      runner:     runnerEdit,
      finishLine: finishLineEdit,
      attractors: attractorEdit,
      zippers:    zipperEdit,
    }[editorState.objectType];

    editList[editorState.paramIndex].paramEditFunc(editorState.getSelectedObject(level));
  }
}


/**
 * 
 * @param {Level} level
 */
function getHoveredObjects(level) {
  let mouseObj = new Mouse(editorState.viewTranslation, editorState.viewScale);
  let mouseVec = createVector(mouseObj.x, mouseObj.y)

  /**
   * @typedef ObjectIndex
   * @property {"attractors" | "zippers" | "obstacles" | "finishLine" | "runner"} objType
   * @property {number} index
   */
  /**
   * @type {ObjectIndex[]}
   */
  let hoveredObjs = [];

  level.attractors.forEach(
    (attractor, index) => {
      if (attractor.inRange(mouseVec.x, mouseVec.y)) hoveredObjs.push({objType: "attractors", index: index});
    }
  );

  level.zippers.forEach(
    (zipper, index) => {
      if (zipper.pointInRange(mouseVec)) hoveredObjs.push({objType: "zippers", index: index});
    }
  );

  level.obstacles.forEach(
    (obstacle, index) => {
      if (obstacle.pointInObstacle(mouseVec)) hoveredObjs.push({objType: "obstacles", index: index});
    }
  );
  
  if (level.finishLine && level.finishLine.pointInLine(mouseVec)) hoveredObjs.push({objType: "finishLine", index: null});

  if (level.runner && level.runner.pos.dist(mouseVec) < editorState.gridSize * 2) hoveredObjs.push({objType: "runner", index: null});

  return hoveredObjs;
}

/**
 * @param {import("states").EditorState} editorState 
 */
 export function cleanup(editorState) {
  level = editorState.prevLevelState;
}

/**
 * @param {MouseEvent} event 
 */
export function onMouseClick(event) {
  if (editorState.getSelectedObject(level) === null) {
    if (editorState.selectedObjs.length === 0) {
      editorState.selectedObjs = getHoveredObjects(level);

      console.log(editorState.selectedObjs);
    } else {
      let newMenu = drawMenu(editorState.selectedObjs.map(element => {return {entryName: element.objType, index: element.index}}));
      if (newMenu !== null) {
        editorState.objectType = editorState.selectedObjs[newMenu].objType;
        editorState.selectedIndex = editorState.selectedObjs[newMenu].index;
      }
    }
  } else if (editorState.paramIndex === -1) {
    let editList = {
      runner:     runnerEdit,
      finishLine: finishLineEdit,
      attractors: attractorEdit,
      zippers:    zipperEdit,
    }[editorState.objectType];

    let paramInd2Edit = drawMenu(editList.map(element => {return {entryName: element.name, index: null}}));

    if(paramInd2Edit !== null) editorState.paramIndex = paramInd2Edit;

  } else {
    editorState.prevLevelState = level;
    editorState.setState("panScrollZoom");
  }
}

/**
 * @typedef MenuEntry
 * @property {string} entryName
 * @property {number} index
 */
/**
 * @param {MenuEntry[]} menuElements
 * @returns {number | null}
 */
function drawMenu(menuElements) {
  let selectedObject = null;

  let prevClickMut = editorState.prevClick.copy();

  push();
    menuElements.forEach(
      (element, index) => {
        stroke(200);
        fill(100);
        rect(prevClickMut.x, prevClickMut.y, 100, 20);

        let baseText = element.index === null ? element.entryName : element.entryName.slice(0, -1);
        let number = element.index === null ? "" : element.index;
        let finalText = baseText.charAt(0).toUpperCase() + baseText.slice(1) + " " + number;
        noStroke();
        fill(0);
        textAlign(LEFT, CENTER);
        textSize(10);
        text(finalText, prevClickMut.x + 5, prevClickMut.y + 10);

        let xInBounds = mouseX > prevClickMut.x && mouseX < prevClickMut.x + 100;
        let yInBounds = mouseY > prevClickMut.y && mouseY < prevClickMut.y + 20;

        if (xInBounds && yInBounds) selectedObject = index;

        prevClickMut.add(0, 20);
      }
    )
  pop();

  return selectedObject;
}