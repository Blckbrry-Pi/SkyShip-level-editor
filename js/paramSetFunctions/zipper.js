import { FinishLine } from "https://blckbrry-pi.github.io/SkyShip/js/classes/finishLine.js";
import { Zipper } from "https://blckbrry-pi.github.io/SkyShip/js/classes/zippers.js";
import { drawArrow } from "./commonFuncs.js";
import { Param } from "./param.js"

export let zipperEdit = [
  new Param("Begin Position",   editPosition1),
  new Param("End Position",     editPosition2),
  new Param("Width",            editWidth),
  new Param("Leading Distance", editLeadingDist),
  new Param("Strength",         editStrength),
];

/**
 * Edits the start point position.
 * @param {Zipper} zipper
 */
function editPosition1(zipper) {
  let mousePos = createVector(mouseX, mouseY);
  mousePos.div(editorState.viewScale);
  mousePos.add(editorState.viewTranslation);

  if (editorState.quantization) {
    mousePos.x = round(mousePos.x / editorState.gridSize) * editorState.gridSize;
    mousePos.y = round(mousePos.y / editorState.gridSize) * editorState.gridSize;
  }

  zipper.line.startPoint = mousePos;
  if (editorState.stateName == "selectNew") zipper.line.endPoint = mousePos;
}

/**
 * Edits the end point position.
 * @param {Zipper} zipper
 */
function editPosition2(zipper) {
  let mousePos = createVector(mouseX, mouseY);
  mousePos.div(editorState.viewScale);
  mousePos.add(editorState.viewTranslation);

  if (editorState.quantization) {
    mousePos.x = round(mousePos.x / editorState.gridSize) * editorState.gridSize;
    mousePos.y = round(mousePos.y / editorState.gridSize) * editorState.gridSize;
  }

  zipper.line.endPoint = mousePos;
}

/**
 * Edits the width of the zipper.
 * @param {Zipper} zipper
 */
function editWidth(zipper) {
  let mousePos = createVector(mouseX, mouseY);
  mousePos.div(editorState.viewScale);
  mousePos.add(editorState.viewTranslation);

  let zipperWidth = zipper.getPerpThroughPoint(mousePos).length();

  if (editorState.quantization) {
    zipperWidth = round(zipperWidth / editorState.gridSize) * editorState.gridSize;
  }

  zipperWidth = Math.max(editorState.gridSize, zipperWidth);

  zipper.width = zipperWidth;
}

/**
 * Edits the distance at which the zipper will attract ahead.
 * @param {Zipper} zipper
 */
function editLeadingDist(zipper) {
  let mousePos = createVector(mouseX, mouseY);
  mousePos.div(editorState.viewScale);
  mousePos.add(editorState.viewTranslation);

  let onZipperPoint = zipper.getPerpThroughPoint(mousePos).endPoint;
  let middlePoint = p5.Vector.lerp(zipper.line.startPoint, zipper.line.endPoint, 0.5);


  let distVec = p5.Vector.sub(onZipperPoint, middlePoint);


  let newMag = distVec.mag();

  if (editorState.quantization) {
    newMag = round(newMag / editorState.gridSize) * editorState.gridSize
  }

  newMag = Math.max(editorState.gridSize, newMag);


  zipper.leadingDist = newMag;


  distVec.setMag(newMag);
  onZipperPoint = p5.Vector.add(distVec, middlePoint);

  let zipperVec = zipper.line.getVector();
  zipperVec.rotate(PI / 2);
  zipperVec.setMag(editorState.gridSize * 4);

  let startPoint1 = p5.Vector.add(middlePoint, zipperVec);
  let startPoint2 = p5.Vector.sub(middlePoint, zipperVec);

  drawArrow(startPoint1, p5.Vector.sub(onZipperPoint, startPoint1), color(200));
  drawArrow(startPoint2, p5.Vector.sub(onZipperPoint, startPoint2), color(200));

}


const scaleMin = 1/4;
const scaleMax = 4;

/**
 * Edits the strength of the zipper.
 * @param {Zipper} zipper
 */
function editStrength(zipper) {
  let displayPoint = zipper.line.endPoint.copy();
  displayPoint.sub(editorState.viewTranslation);
  displayPoint.mult(editorState.viewScale);
    
  let mouseVec = createVector(mouseX, mouseY);
  mouseVec.sub(displayPoint);

  let strengthPos = constrain(mouseVec.y, -215, -15);
  let unCbPos = map(strengthPos, -15, -215, Math.cbrt(scaleMin), Math.cbrt(scaleMax));
  let cbPos = unCbPos * unCbPos * unCbPos;

  zipper.strength = cbPos;

  push();
    translate(displayPoint);
    fill(100);
    stroke(200);
    strokeWeight(1);
    rect(10, -220, 60, 210);

    for (let i = 0; i <= 1; i+= 0.0005) {
      stroke(lerpColor(color(255, 0, 0), color(0, 255, 0), i));
      strokeWeight(1);
      line(35, - 15 - i * 200, 65, - 15 - i * 200)
    }

    strokeWeight(2);
    stroke(0);
    line(35, strengthPos, 65, strengthPos);

    let numArr = [1/4, 1/2, 1, 2, 4];

    let posArr = numArr.map(
      element => {
        return (Math.cbrt(element) - Math.cbrt(scaleMin)) / (Math.cbrt(scaleMax) - Math.cbrt(scaleMin));
      }
    );

    strokeWeight(1);
    fill(0);
    textSize(10);
    textAlign(RIGHT, CENTER);
    _.zip(numArr, posArr).forEach(
      zippedElement => {
        noStroke();
        let yPos = map(zippedElement[1], 0, 1, -15, -215);
        text(zippedElement[0], 30, yPos);
        stroke(0);
        line(31.5, yPos, 34, yPos);
      }
    )

  pop();
}