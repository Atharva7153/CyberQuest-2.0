/**
 * ZIP — Continuous Waypoint Grid Path Logic, Configuration & Validation
 */

export const DEFAULT_ZIP_CONFIG = {
  rows: 5,
  cols: 5,
  waypoints: [
    { num: 1, r: 0, c: 0 },
    { num: 2, r: 1, c: 2 },
    { num: 3, r: 2, c: 1 },
    { num: 4, r: 0, c: 3 },
    { num: 5, r: 3, c: 4 },
    { num: 6, r: 3, c: 0 },
    { num: 7, r: 4, c: 4 },
  ],
  blockedCells: [],
};

export const normalizeZipConfig = (gameConfig = {}) => {
  const rows = Number(gameConfig.rows) || DEFAULT_ZIP_CONFIG.rows;
  const cols = Number(gameConfig.cols) || DEFAULT_ZIP_CONFIG.cols;

  const waypoints =
    Array.isArray(gameConfig.waypoints) && gameConfig.waypoints.length >= 2
      ? [...gameConfig.waypoints]
          .map((w) => ({
            num: Number(w.num),
            r: Number(w.r),
            c: Number(w.c),
          }))
          .sort((a, b) => a.num - b.num)
      : DEFAULT_ZIP_CONFIG.waypoints;

  const blockedCells = Array.isArray(gameConfig.blockedCells)
    ? gameConfig.blockedCells.map((b) => ({
        r: Number(b.r),
        c: Number(b.c),
      }))
    : [];

  return {
    rows,
    cols,
    waypoints,
    blockedCells,
    maxWaypoint: waypoints[waypoints.length - 1]?.num || waypoints.length,
    instructions:
      gameConfig.instructions ||
      `Connect the numbers 1 to ${
        waypoints[waypoints.length - 1]?.num || waypoints.length
      } in order while visiting every playable cell on the grid exactly once.`,
  };
};

export const isAdjacentOrthogonal = (cellA, cellB) => {
  if (!cellA || !cellB) return false;
  return Math.abs(cellA.r - cellB.r) + Math.abs(cellA.c - cellB.c) === 1;
};

/**
 * Validate the current ZIP path against all waypoints and total cell coverage.
 */
export const validateZipPathClient = (path = [], config) => {
  const { rows, cols, waypoints, blockedCells } = config;
  const blockedSet = new Set(blockedCells.map((b) => `${b.r}-${b.c}`));
  const totalPlayableCells = rows * cols - blockedSet.size;

  const waypointByCell = new Map(waypoints.map((w) => [`${w.r}-${w.c}`, w.num]));
  const maxWaypoint = waypoints[waypoints.length - 1]?.num || waypoints.length;

  let lastWaypointReached = 0;
  let orderValid = true;
  let adjacencyValid = true;
  const visitedSet = new Set();

  for (let i = 0; i < path.length; i++) {
    const pt = path[i];
    const key = `${pt.r}-${pt.c}`;

    if (blockedSet.has(key) || visitedSet.has(key)) {
      adjacencyValid = false;
    }
    visitedSet.add(key);

    if (i > 0 && !isAdjacentOrthogonal(path[i - 1], pt)) {
      adjacencyValid = false;
    }

    const wpNum = waypointByCell.get(key);
    if (wpNum !== undefined) {
      if (wpNum === lastWaypointReached + 1) {
        lastWaypointReached = wpNum;
      } else {
        orderValid = false;
      }
    }
  }

  const head = path[path.length - 1] || null;
  const headWaypoint = head ? waypointByCell.get(`${head.r}-${head.c}`) : null;
  const isAllCellsVisited = visitedSet.size === totalPlayableCells;
  const isAtFinalWaypoint =
    lastWaypointReached === maxWaypoint && headWaypoint === maxWaypoint;

  const isComplete = isAllCellsVisited && isAtFinalWaypoint;
  const isValid = isComplete && orderValid && adjacencyValid;

  return {
    isComplete,
    isValid,
    visitedCount: visitedSet.size,
    totalPlayableCells,
    lastWaypointReached,
    nextWaypoint: Math.min(maxWaypoint, lastWaypointReached + 1),
    maxWaypoint,
    orderValid,
  };
};

export const serializeZipSubmission = (path = []) => {
  if (!Array.isArray(path) || path.length === 0) return '';
  return path.map((pt) => `${pt.r},${pt.c}`).join('>');
};
