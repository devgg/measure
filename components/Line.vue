<script setup lang="ts">
import type { Data2d } from "~/utils/data2d";
import { distance } from "~/utils/data2d";

const { width, height } = storeToRefs(useMainStore());

const props = defineProps<{
  point1: Data2d<number>;
  point2: Data2d<number>;
  dashed?: boolean;
  error?: boolean;
}>();

const dashArray = computed<string>(() => {
  const p1 = {
    x: props.point1.x * width.value,
    y: props.point1.y * height.value,
  };
  const p2 = {
    x: props.point2.x * width.value,
    y: props.point2.y * height.value,
  };

  const dist = distance(p1, p2);

  if (dist < 8) {
    return `0 ${dist}`;
  }

  if (dist < 52) {
    return `0 7 ${dist - 14} 7`;
  }

  // one pixel gap at the end
  const lineLength = dist - 51 - 1;

  const segmentSize = 10;
  const numSegments = Math.ceil(lineLength / segmentSize);

  const innerDashArray2 = new Array(numSegments);
  for (let i = 0; i < innerDashArray2.length; i++) {
    innerDashArray2[i] =
      i < innerDashArray2.length - 1 ? segmentSize : lineLength % segmentSize;
  }

  if (numSegments % 2 === 0) {
    innerDashArray2.push(0);
  }

  const innerDashArray = props.dashed ? innerDashArray2 : [lineLength];
  return `0 7 15 4 ${innerDashArray.join(" ")} 4 15 7`;
});
</script>

<template>
  <svg class="absolute line w-full h-full pointer-events-none">
    <line
      :class="{ 'error-color': error }"
      :x1="`${props.point1.x * 100}%`"
      :y1="`${props.point1.y * 100}%`"
      :x2="`${props.point2.x * 100}%`"
      :y2="`${props.point2.y * 100}%`"
      stroke-width="2"
      :stroke-dasharray="dashArray"
    />
  </svg>
</template>

<style scoped>
.line {
  left: 0;
  top: 0;
  z-index: 1;
  stroke: var(--marker-color);
}
</style>
