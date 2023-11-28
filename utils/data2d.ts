export interface Data2d<T> {
  x: T;
  y: T;
}

export function distance(d1: Data2d<number>, d2: Data2d<number>): number {
  const x = d1.x - d2.x;
  const y = d1.y - d2.y;
  return Math.sqrt(x * x + y * y);
}

export interface Marker extends Data2d<number> {
  id?: number;
}
