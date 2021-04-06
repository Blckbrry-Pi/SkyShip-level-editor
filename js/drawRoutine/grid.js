/**
 * Draws the grid at size and position denoted by viewTranslation and viewScale
 * **/
export function drawGrid() {
  if (editorState.gridSize == 0) return;
  let bigDivSize   = editorState.gridSize * 4 * editorState.viewScale;
  let medDivSize   = editorState.gridSize * 2 * editorState.viewScale;
  let smallDivSize = editorState.gridSize * 1 * editorState.viewScale;
  
  push();
    let toOriginTranslation = editorState.viewTranslation.copy();
    toOriginTranslation.mult(-editorState.viewScale);
    while (!(-bigDivSize <= toOriginTranslation.x && toOriginTranslation.x < 0)) {
      if (toOriginTranslation.x < 0) toOriginTranslation.add(bigDivSize, 0);
      else toOriginTranslation.sub(bigDivSize, 0);
    }
    while (!(-bigDivSize <= toOriginTranslation.y && toOriginTranslation.y < 0)) {
      if (toOriginTranslation.y < 0) toOriginTranslation.add(0, bigDivSize);
      else toOriginTranslation.sub(0, bigDivSize);
    }

    translate(toOriginTranslation);

    stroke(100);
    strokeWeight(1);
    for (let i = 0; i < width + bigDivSize; i+=bigDivSize) {
      let xPos;
      xPos = i;
      strokeWeight(3/3);
      line(xPos, 0, xPos, height + bigDivSize);
      xPos = i + smallDivSize;
      strokeWeight(1/3);
      line(xPos, 0, xPos, height + bigDivSize);
      xPos = i + medDivSize;
      strokeWeight(2/3);
      line(xPos, 0, xPos, height + bigDivSize);
      xPos = i + medDivSize + smallDivSize;
      strokeWeight(1/3);
      line(xPos, 0, xPos, height + bigDivSize);
    }
    for (let i = 0; i < height + bigDivSize; i+=bigDivSize) {
      let yPos;
      yPos = i;
      strokeWeight(3/3);
      line(0, yPos, width + bigDivSize, yPos);
      yPos = i + smallDivSize;
      strokeWeight(1/3);
      line(0, yPos, width + bigDivSize, yPos);
      yPos = i + medDivSize;
      strokeWeight(2/3);
      line(0, yPos, width + bigDivSize, yPos);
      yPos = i + medDivSize + smallDivSize;
      strokeWeight(1/3);
      line(0, yPos, width + bigDivSize, yPos);
    }
  pop();
}