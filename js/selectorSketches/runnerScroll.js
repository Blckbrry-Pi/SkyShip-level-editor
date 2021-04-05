export function runnerSelector(sketch, availabilityFunc, mouseInContainer, callbackOnClick) {
  let x = 100;
  let y = 100;

  sketch.setup = () => {
    sketch.createCanvas(200, 100);
  };

  sketch.draw = () => {
    let available = availabilityFunc();
    let pressed = sketch.mouseDownInBox()

    sketch.drawBackground(available, pressed);
    sketch.drawRunner(available);
    sketch.drawRunnerText(available);

    if (pressed && available) callbackOnClick();
  };

  sketch.mouseDownInBox = () => {
    let mouseInBoundsX = 0 < sketch.mouseX && sketch.mouseX < sketch.width;
    let mouseInBoundsY = 0 < sketch.mouseY && sketch.mouseY < sketch.height;
    let mouseValidPos = mouseInContainer() && mouseInBoundsX && mouseInBoundsY
    return sketch.mouseIsPressed && mouseValidPos;
  }

  sketch.drawBackground = (available, pressed) => {
    sketch.stroke(80);
    
    sketch.fill(available ? pressed ? 100 : 130 : 150);
    sketch.rect(0, 0, sketch.width, sketch.height);
  }

  sketch.drawRunner = (available) => {
    sketch.push();
      sketch.translate(sketch.width * 1/4, sketch.height * 1/2 - 8);
      sketch.rotate(PI * 5/4);

      sketch.fill(available ? 100 : 120);
      sketch.stroke(available ? 255 : 200);
      sketch.strokeWeight(1);
      sketch.quad(0, 10, 10, -20, 0, -10, -10, -20);
    sketch.pop();
  }

  sketch.drawRunnerText = (available) => {
    sketch.push();
      sketch.translate(sketch.width * 5/8, sketch.height * 1/2);
      sketch.textAlign(sketch.CENTER, sketch.CENTER);
      sketch.textSize(sketch.width / 8);
      sketch.textFont("Futura");
      sketch.fill(available ? 0 : 80);
      sketch.text("Runner", 0, 0);
      if (!available) sketch.line(-sketch.width * 1/4, 0, sketch.width * 1/4, 0);
    sketch.pop();
  }
};