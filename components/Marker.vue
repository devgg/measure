<script setup lang="ts">
import { ref, defineExpose } from "vue";
import type { Data2d } from "~/utils/data2d";

const markerSize = ref(50);

const { marker } = defineProps<{ marker: Marker }>();
</script>

<template>
  <div class="marker">
    <div class="marker-ring marker-ring-1" />
    <div class="marker-ring marker-ring-2" />
  </div>
</template>

<style scoped>
.marker {
  position: absolute;
  z-index: 2;
  left: v-bind("`${marker.x * 100}%`");
  top: v-bind("`${marker.y * 100}%`");
  transform: v-bind("`translate(-${markerSize / 2}px, -${markerSize / 2}px`");
  width: 50px;
  height: 50px;
  cursor: move;
}

.marker-ring {
  position: absolute;
  backdrop-filter: invert(100%) grayscale(100%);
  width: 50px;
  height: 50px;
}
.marker-ring-1 {
  clip-path: path(
    "m 25 0 a 25 25 0 0 1 0 50 m 0 -2 a 0.8 0.8 0 0 0 0 -46 m 0 -2 a 25 25 0 0 0 0 50 m 0 -2 a 0.8 0.8 0 0 1 0 -46"
  );
}

.marker-ring-2 {
  clip-path: path(
    "m 25 18 a 7 7 0 0 1 0 14 m 0 -2 a 0.8 0.8 0 0 0 0 -10 m 0 -2 a 7 7 0 0 0 0 14 m 0 -2 a 0.8 0.8 0 0 1 0 -10"
  );
}
.marker:hover .marker-ring {
  backdrop-filter: invert(100%);
}
</style>
