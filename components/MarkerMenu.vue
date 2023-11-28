<script setup lang="ts">
import type { Data2d } from "~/utils/data2d";
import type { SelectButtonChangeEvent } from "primevue/selectbutton";
import ContextMenu from "primevue/contextMenu";

const menu = ref<ContextMenu | null>(null);

const markerIndex = ref<number | null>(null);
const show = (event: Event, newMarkerIndex: number) => {
  menu.value!.show(event);
  markerIndex.value = newMarkerIndex;
};
const hide = () => menu.value!.hide();
defineExpose({ show, hide });

const emits = defineEmits<{ onDelete: [markerIndex: number] }>();

const items = ref([
  {
    label: "Delete Marker",
    icon: "pi pi-trash",
    command: () => emits("onDelete", markerIndex.value!),
  },
  {
    label: "Close",
    icon: "pi pi-times",
    command: hide,
  },
]);
</script>

<template>
  <ContextMenu ref="menu" :model="items" />
</template>
