export function drawArrow(base, vec, myColor) {
  let onScreenBase = base.copy();
  onScreenBase.sub(editorState.viewTranslation);
  onScreenBase.mult(editorState.viewScale);

  let onScreenVec = vec.copy();
  onScreenVec.mult(editorState.viewScale);

  push();
    stroke(myColor);
    strokeWeight(3);
    fill(myColor);

    translate(onScreenBase.x, onScreenBase.y);
    line(0, 0, onScreenVec.x, onScreenVec.y);

    rotate(vec.heading());

    let arrowSize = onScreenVec.mag() / 50;
    translate(onScreenVec.mag() - arrowSize, 0);
    triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);
  pop();
}