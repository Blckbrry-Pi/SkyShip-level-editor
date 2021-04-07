/**
 * Serializes a vector.
 * @param {p5.Vector} vector 
 * @returns {{x: number, y: number}}
 */
export function serializeVector({x, y}) {
  return {x, y};
}

/**
 * Serializes a level.
 * @param {level} level
 */
export function serializeLevel(level) {
  if (!level.runner) throw new Error("Ensure the level contains a runner before exporting.");
  if (!level.finishLine) throw new Error("Ensure the level contains a finish line before exporting.");

  return {
    name: level.name,
    attractors: level.attractors.map(({x, y, fieldSize, physSize, spinDirection}) => ({
      x,
      y,
      fieldSize,
      physSize,
      spinDirection
    })),
    zippers: level.zippers.map(({line, width, leadingDist, strength}) => ({
      line: {
        startPoint: serializeVector(line.startPoint),
        endPoint: serializeVector(line.endPoint)
      },
      width,
      leadingDist,
      strength
    })),
    obstacles: level.obstacles.map(({points, isOuter}) => ({
      points: points.map(serializeVector),
      isOuter
    })),
    runner: {
      pos: serializeVector(level.runner.pos),
      vel: serializeVector(level.runner.vel),
      targetVelMag: level.runner.targetVelMag
    },
    finishLine: {
      pos: serializeVector(level.finishLine.pos),
      angle: level.finishLine.angle,
      size: serializeVector(level.finishLine.size)
    }
  };
}

/**
 * Exports a level to a JSON string.
 * @param {Level} level 
 * @param {boolean} pretty 
 * @returns {string}
 */
export function exportLevel(level, pretty = false) {
  return JSON.stringify(serializeLevel(level), null, pretty ? "  " : undefined);
}

/**
 * @param {EventTarget} element 
 */
export function stopPropagatingMouseEvents(element) {
  ["click", "mousedown", "mousemove"].forEach(event => element.addEventListener(event, e => e.stopPropagation()));
}