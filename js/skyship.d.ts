// Don't import p5 here.
// That causes the type checker to yell and I have no idea why.

declare module "https://blckbrry-pi.github.io/SkyShip/js/sketchInit.js" {
  function preload(): void;
  function setup(): void;
  function draw(): void;
}

declare module "https://blckbrry-pi.github.io/SkyShip/js/classes/attractor.js" {
  class Attractor {
    constructor(xPos: number, yPos: number, fieldRadius: number, physicalRadius: number, spinClockwise: boolean);
    x: number;
    y: number;
    fieldSize: number;
    physSize: number;
    rotOffset: number;
    spinDirection: number;
    inRange(shipx: number, shipy: number): boolean;
    collided(shipx: number, shipy: number): boolean;
    drawBounds(): void;
    draw(): void;
    rotStep(timeMult: number = 1): void;
  }
}

declare module "https://blckbrry-pi.github.io/SkyShip/js/classes/finishLine.js" {
  class FinishLine {
    constructor(x: number, y: number, rot: number, w: number, h: number);
    pos: p5.Vector;
    draw(): void;
    pointInLine(pointToCheck: p5.Vector): boolean;
  }
}

declare module "https://blckbrry-pi.github.io/SkyShip/js/classes/mouse.js" {
  class Mouse {
    constructor(translation?: p5.Vector, public scale: number = 1);
    readonly x: number;
    readonly y: number;
    setTranslation(translation?: p5.Vector);
    setScale(scale: number = 1);
  }
}

declare module "https://blckbrry-pi.github.io/SkyShip/js/classes/obstacles.js" {
  class Obstacle {
    constructor(points?: p5.Vector[], obstType: boolean = false);
    points: p5.Vector[];
    isOuter: boolean;
    pointInObstacle(pointToCheckBounds: p5.Vector): boolean;
    draw(): void;
    drawOutline(): void;
    setClipShape(): void;
    drawClipRect(): void;
  }
}

declare module "https://blckbrry-pi.github.io/SkyShip/js/classes/runner.js" {
  import { Attractor } from "https://blckbrry-pi.github.io/SkyShip/js/classes/attractor.js";
  import { Zipper } from "https://blckbrry-pi.github.io/SkyShip/js/classes/zippers.js";

  class Runner {
    constructor(xPos: number, yPos: number, xVel: number = 0, yVel: number = 0, targetVel: number);
    pos: p5.Vector;
    vel: p5.Vector;
    targetVelMag: number;
    connectedAttractor: {index: number, springLen: number, pos: p5.Vector};
    draw(transparency: number): void;
    doPhysicsStep(attractors: Attractor[], zippers: Zipper[], timeMult: number = 1): void;
    getZipperVector(zippers: Zipper[], timeMult: number): p5.Vector;
    doSpringPhysics(attractors: Attractor[], timeMult: number): void;
    updateSpringLength(timeMult: number): void;
    onMouseDown(attractors: Attractor[]): void;
    onMouseRelease(attractors: Attractor[]): void;
  }
}

declare module "https://blckbrry-pi.github.io/SkyShip/js/classes/zippers.js" {
  class DirectionalLine {
    constructor(xS: number, yS: number, xE: number, yE: number);
    startPoint: p5.Vector;
    endPoint: p5.Vector;
    length(): number;
    isVertical(): boolean;
    slope(): number;
    slopeIntFormat(): { slope: number, yInt: number };
    pointIsOnLine(pointToCheck: p5.Vector): boolean;
    calculateLineIntersect(otherLine: DirectionalLine): p5.Vector | false;
    calculateLineSegIntersect(otherLine: DirectionalLine): p5.Vector | false;
    getVector(): p5.Vector;
    draw(): void;
  }

  class Zipper {
    constructor(xS: number, yS: number, xE: number, yE: number, widthOfEffect: number, attractDistAhead: number, zipperStrength: number);
    line: DirectionalLine;
    width: number;
    leadingDist: number;
    strength: number;
    length(): number;
    getPerpThroughPoint(pointIn: p5.Vector): DirectionalLine | false;
    advanceLine(lineToAdvance: DirectionalLine): void;
    draw(): void;
  }
}

declare module "https://blckbrry-pi.github.io/SkyShip/js/extraFunctions/backgroundStars.js" {
  function initStars(starCount: number): void;
  function starryBackground(inAttractors: boolean): void;
}

declare module "https://blckbrry-pi.github.io/SkyShip/js/extraFunctions/globalFuncs.js" {
  function sleep(ms: number): Promise<void>;
  function timeStep(): void;
  function starStep(): void;
  function attractorStep(): void;
  function runnerStep(): void;
}

declare module "https://blckbrry-pi.github.io/SkyShip/js/extraFunctions/levels.js" {
  import { Attractor } from "https://blckbrry-pi.github.io/SkyShip/js/classes/attractor.js";
  import { FinishLine } from "https://blckbrry-pi.github.io/SkyShip/js/classes/finishLine.js";
  import { Obstacle } from "https://blckbrry-pi.github.io/SkyShip/js/classes/obstacles.js";
  import { Zipper } from "https://blckbrry-pi.github.io/SkyShip/js/classes/zippers.js";

  function addJSONs(levelsString: string);
  function JSON2Level(levelString: string): {
    name: string;
    attractors: Attractor[];
    zippers: Zipper[];
    obstacles: Obstacle[];
    finishLine: FinishLine;
    runner: Runner;
  };
  function loadLevel(levelIndex: number): void;
}

declare module "https://blckbrry-pi.github.io/SkyShip/js/extraFunctions/time.js" {
  import { Attractor } from "https://blckbrry-pi.github.io/SkyShip/js/classes/attractor.js";

  let attractorTimer: number;
  function getTimeMult(x: number, y: number, attractors: Attractor[]): number;
  function onConnect(timeMult: number): void;
  function onDisconnect(timeMult: number): void;
}

declare module "https://blckbrry-pi.github.io/SkyShip/js/states/stateContinue.js" {
  function stateContinue(stateTimer: number): void;
}

declare module "https://blckbrry-pi.github.io/SkyShip/js/states/stateCustom.js" {
  function stateCustom(stateTimer: number): void;
}

declare module "https://blckbrry-pi.github.io/SkyShip/js/states/stateDead.js" {
  function stateDead(stateTimer: number): void;
  function drawExplosion(frame: number, x: number, y: number): void;
}

declare module "https://blckbrry-pi.github.io/SkyShip/js/states/stateFlying.js" {
  function stateFlying(stateTimer: number): void;
}

declare module "https://blckbrry-pi.github.io/SkyShip/js/states/stateMenu.js" {
  function stateMenu(stateTimer: number): void;
}

declare module "https://blckbrry-pi.github.io/SkyShip/js/states/stateRestart.js" {
  function stateRestart(stateTimer: number): void;
}

declare module "https://blckbrry-pi.github.io/SkyShip/js/states/stateStart.js" {
  function stateStart(stateTimer: number): void;
}

declare module "https://blckbrry-pi.github.io/SkyShip/js/states/stateWin.js" {
  function stateWin(stateTimer: number): void;
}

enum StateIdentifier {
  menu = "Menu",
  custom = "Custom",
  start = "Start",
  flying = "Flying",
  dead = "Dead",
  restart = "Restart",
  win = "Win",
  continue = "Continue"
}

interface State {
  state: StateIdentifier;
  stateTimer: number;
}

declare module "https://blckbrry-pi.github.io/SkyShip/js/states/states.js" {
  let states: Record<keyof typeof StateIdentifier, StateIdentifier>;
  function newState(stateEnum: StateIdentifier): State;
  function doStateLoop(stateToDo: State): void;
}