let viewTranslation;
let viewScale;

/**
 * @type {import("states/states").EditorState}
 */
let editorState;

/**
 * @type {Level}
 */
let level;

let drawFunc = undefined;
let mouseWheelFunc = undefined;
function preload() {
  import("./sketchInit.js").then(module => module.preload());
}
function setup() {
  import("./sketchInit.js").then(module => module.setup());
}
function draw() {
  if (typeof drawFunc != "function")
    import("./sketchInit.js").then(module => {
      drawFunc = module.draw;
      module.draw();
    });
  else
    drawFunc();
}
function mouseWheel(event) {
  if (typeof mouseWheelFunc != "function")
    import("./sketchInit.js").then(module => {
      mouseWheelFunc = module.mouseWheel;
      return module.mouseWheel(event);
    });
  else
    return mouseWheelFunc(event);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}