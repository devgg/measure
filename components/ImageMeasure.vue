<script setup lang="ts">
import { ref, onBeforeMount, onUnmounted, onMounted } from "vue";
import { useDebounceFn } from "@vueuse/core";
import { useSizeStore } from "~/stores/main";
import { markIntersectingLinesInPolygon } from "~/utils/lineIntersection";
import { calculateArea } from "~/utils/area";

const mainStore = useMainStore();
const sizeStore = useSizeStore();
const measureStore = useMeasureStore();
const { areas, markers, area } = storeToRefs(measureStore);
const image = ref<{ element: HTMLElement } | null>(null);

function pointerDown(event: PointerEvent, index: number) {
  onPointerDown(event, image.value!.element, markers.value[index]);
  menu.value!.hide();
}

function addMarker(event: MouseEvent) {
  const containerRect = image.value!.element.getBoundingClientRect();
  measureStore.addMarker(
    event.offsetX / containerRect.width,
    event.offsetY / containerRect.height,
  );
}

watch(
  markers,
  (m) => {
    const intersectingLines = markIntersectingLinesInPolygon(m);
    const areaVal = calculateArea(
      m,
      mainStore.width,
      mainStore.height,
      sizeStore.denominator,
    );

    measureStore.$patch((state) => {
      state.areas[state.currentAreaIndex].intersectingLines = intersectingLines;
      state.areas[state.currentAreaIndex].size =
        intersectingLines.size === 0 ? areaVal : null;
    });
  },
  { immediate: true, deep: true },
);

const menu = ref<{
  show: (e: Event, i: number) => void;
  hide: () => void;
} | null>(null);
</script>

<template>
  <Image @onImageClicked="addMarker" ref="image">
    <Marker
      v-for="(marker, i) in markers"
      :key="marker.id"
      :marker="marker"
      @contextmenu="(e: Event) => menu!.show(e, i)"
      @click.stop.prevent
      @pointerdown.stop.prevent="(e: PointerEvent) => pointerDown(e, i)"
    />
    <MarkerMenu
      ref="menu"
      @onDelete="(markerIndex) => markers.splice(markerIndex, 1)"
    />

    <AreaBlur v-for="area in areas" :area="area" />

    <Line
      v-if="markers.length >= 2"
      v-for="i in markers.length - 1"
      :point1="markers[i - 1]"
      :point2="markers[i]"
      :error="area.intersectingLines.has(i - 1)"
    >
    </Line>
    <Line
      v-if="markers.length > 2"
      :point1="markers[0]"
      :point2="markers[markers.length - 1]"
      :dashed="true"
      :error="area.intersectingLines.has(markers.length - 1)"
    >
    </Line>
  </Image>
</template>
