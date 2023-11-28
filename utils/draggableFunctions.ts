import type { Data2d, Marker } from "~/utils/data2d";

export function onPointerDown(
  event: PointerEvent,
  container: HTMLElement,
  marker: Marker,
) {
  const containerRect = container.getBoundingClientRect();
  const initialPosition = { x: marker.x, y: marker.y };

  const moveListener = (pointerMoveEvent: PointerEvent) =>
    onPointerMove(
      pointerMoveEvent,
      event,
      containerRect,
      initialPosition,
      marker,
    );

  const pointerId = event.pointerId;

  const markerElement = event.target as HTMLElement;
  markerElement.setPointerCapture(pointerId);
  markerElement.addEventListener("pointermove", moveListener);
  markerElement.addEventListener("pointerup", () => {
    markerElement.releasePointerCapture(pointerId);
    markerElement.removeEventListener("pointermove", moveListener);
  });
}

function onPointerMove(
  event: PointerEvent,
  pointerDownEvent: PointerEvent,
  containerRect: DOMRect,
  initialPosition: Data2d<number>,
  marker: Marker,
) {
  const xInRect = event.pageX - containerRect.left;
  const yInRect = event.pageY - containerRect.top;

  const mouseMoveDistX =
    (event.pageX - pointerDownEvent.pageX) / containerRect.width;
  const mouseMoveDistY =
    (event.pageY - pointerDownEvent.pageY) / containerRect.height;

  marker.x = Math.max(Math.min(initialPosition.x + mouseMoveDistX, 1), 0);
  marker.y = Math.max(Math.min(initialPosition.y + mouseMoveDistY, 1), 0);
}
