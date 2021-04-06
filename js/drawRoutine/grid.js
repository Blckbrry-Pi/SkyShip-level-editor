/**
 * Draws the grid at size and position denoted by viewTranslation and viewScale
 * **/
export function drawGrid() {
  if (editorState.gridSize == 0) return;

  let bigDivSize   = editorState.gridSize * 4 * editorState.viewScale;
  let medDivSize   = editorState.gridSize * 2 * editorState.viewScale;
  let smallDivSize = editorState.gridSize * 1 * editorState.viewScale;

  let startPoint = createVector();
  startPoint.add(
    editorState.viewTranslation.x % (editorState.gridSize * 4),
    editorState.viewTranslation.y % (editorState.gridSize * 4),
  );
  startPoint.sub(editorState.gridSize * 4, editorState.gridSize * 4)
  startPoint.mult(editorState.viewScale);

  stroke(100);
  strokeWeight(1);
  for (let i = startPoint.x; i < width; i+=bigDivSize) {
    let xPos;
    xPos = i;
    strokeWeight(3/3);
    line(xPos, 0, xPos, height);
    xPos = i + smallDivSize;
    strokeWeight(1/3);
    line(xPos, 0, xPos, height);
    xPos = i + medDivSize;
    strokeWeight(2/3);
    line(xPos, 0, xPos, height);
    xPos = i + medDivSize + smallDivSize;
    strokeWeight(1/3);
    line(xPos, 0, xPos, height);
  }
  for (let i = startPoint.y; i < height; i+=bigDivSize) {
    let yPos;
    yPos = i;
    strokeWeight(3/3);
    line(0, yPos, width, yPos);
    yPos = i + smallDivSize;
    strokeWeight(1/3);
    line(0, yPos, width, yPos);
    yPos = i + medDivSize;
    strokeWeight(2/3);
    line(0, yPos, width, yPos);
    yPos = i + medDivSize + smallDivSize;
    strokeWeight(1/3);
    line(0, yPos, width, yPos);
  }
}