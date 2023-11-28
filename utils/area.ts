import type { Marker, Data2d } from "~/utils/data2d";

export function calculateArea(
  markers: Marker[],
  pixelWidth: number,
  pixelHeight: number,
  denominator: number,
): number | null {
  if (markers.length < 3) {
    return 0;
  }

  var sum = 0;
  for (var i = 0; i < markers.length; i++) {
    const marker1 = markers[i];
    const marker2 = markers[(i + 1) % markers.length];
    sum += marker1.x * marker2.y - marker1.y * marker2.x;
  }

  return (
    ((Math.abs(sum) / 2) * pixelWidth * pixelHeight) /
    (denominator * denominator)
  );
}
