let viewTranslation;
let viewScale;

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