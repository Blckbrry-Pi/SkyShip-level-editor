let gridSize = 25;

export function drawGrid() {
  if (gridSize == 0) return;

  let bigDivSize   = gridSize * 4 / viewScale;
  let medDivSize   = gridSize * 2 / viewScale;
  let smallDivSize = gridSize * 1 / viewScale;

  let startPoint = createVector();
  startPoint.sub(
    viewTranslation.x % (gridSize * 4),
    viewTranslation.y % (gridSize * 4),
  );
  startPoint.sub(gridSize * 4, gridSize * 4)
  startPoint.div(viewScale);

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

export function setGridSize(newGridSize = 25) {
  gridSize = newGridSize;
}