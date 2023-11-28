<script setup lang="ts">
import { ref, onBeforeMount, onUnmounted, onMounted } from "vue";
import { useDebounceFn } from "@vueuse/core";
import { useSizeStore } from "../stores/main";

const sizeStore = useSizeStore();
const image = ref<{ element: HTMLElement } | null>(null);

const markers = ref<Marker[]>([sizeStore.marker1, sizeStore.marker2]);

function pointerDown(event: PointerEvent, index: number) {
  onPointerDown(event, image.value!.element, markers.value[index]);
}
</script>

<template>
  <Image ref="image">
    <Marker
      v-for="(marker, i) in markers"
      :marker="marker"
      :key="marker.id"
      @pointerdown.stop.prevent="(e: PointerEvent) => pointerDown(e, i)"
    >
    </Marker>
    <Line :point1="markers[0]" :point2="markers[1]" />
  </Image>
</template>
