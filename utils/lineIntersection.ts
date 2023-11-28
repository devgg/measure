import type { Data2d } from "~/utils/data2d";

interface Line {
  p1: Data2d<number>;
  p2: Data2d<number>;
}

export function markIntersectingLinesInPolygon(
  points: Data2d<number>[],
): Set<number> {
  const result = new Set<number>();
  for (let i = 0; i < points.length - 1; i++) {
    for (let j = i + 2; j < points.length; j++) {
      if (i === 0 && j === points.length - 1) continue;

      const l1 = { p1: points[i], p2: points[i + 1] };
      const l2 = {
        p1: points[j],
        p2: points[(j + 1) % points.length],
      };

      if (doLinesIntersect(l1, l2)) {
        result.add(i);
        result.add(j);
      }
    }
  }
  return result;
}

// https://stackoverflow.com/a/9997374/1106899
function doLinesIntersect(l1: Line, l2: Line) {
  return (
    ccw(l1.p1, l2.p1, l2.p2) != ccw(l1.p2, l2.p1, l2.p2) &&
    ccw(l1.p1, l1.p2, l2.p1) != ccw(l1.p1, l1.p2, l2.p2)
  );
}

function ccw(p1: Data2d<number>, p2: Data2d<number>, p3: Data2d<number>) {
  return (p3.y - p1.y) * (p2.x - p1.x) > (p2.y - p1.y) * (p3.x - p1.x);
}
