<script setup lang="ts">
import { ref, onMounted } from "vue";
import { distance } from "~/utils/data2d";

const mainStore = useMainStore();
const measureStore = useMeasureStore();
const sizeStore = useSizeStore();
const { areas, markers, currentAreaIndex, area } = storeToRefs(measureStore);
const image = ref<{ element: HTMLElement }>();

function getAreaString(size: number | null) {
  if (size === null) {
    return "Lines intersect, can not calculate area.";
  }

  const options =
    size >= 1
      ? {}
      : {
          maximumFractionDigits: 20,
          maximumSignificantDigits: 4,
        };
  return ` ${size.toLocaleString(undefined, options)} ${
    sizeStore.unit ? sizeStore.unit + "²" : ""
  }`;
}

function getAllAreasString() {
  let sum = 0;
  for (const area of areas.value) {
    if (area.size === null) {
      return getAreaString(null);
    }

    sum += area.size;
  }
  return getAreaString(sum);
}
</script>

<template>
  <MainContent>
    <template #sidebar>
      <div class="grid primary-border p-1 gap-3 justify-center">
        <div class="flex flex-col items-center">
          <div class="font-medium">
            Area {{ currentAreaIndex + 1 }} (current)
          </div>
          <div>{{ getAreaString(area.size) }}</div>
        </div>
        <div class="flex flex-col items-center">
          <div class="font-medium">Total Area</div>
          <div>{{ getAllAreasString() }}</div>
        </div>
      </div>
      <div class="grid gap-1 self-start">
        <div
          v-for="(area, i) in areas"
          class="areas primary-border grid items-center"
          :class="{ 'area-selected': i === currentAreaIndex }"
        >
          <Button
            class="area-button"
            :label="`Area ${i + 1}`"
            @click="measureStore.setCurrentArea(i)"
            size="small"
            :disabled="i === currentAreaIndex"
            :key="area.id"
            text
          ></Button>
          <Button @click.stop="measureStore.deleteArea(i)" text rounded>
            <i :class="`pi pi-trash`"></i>
          </Button>
        </div>
        <Button
          label="Add area"
          @click="measureStore.addArea()"
          outlined
          text
        />
      </div>
      <Help
        text="Click on the image to outline the area."
        :steps="[
          {
            text: 'Place 1st marker',
            doneFn: () => markers.length > 0,
            type: 'required',
          },
          {
            text: 'Place 2nd marker',
            doneFn: () => markers.length > 1,
            type: 'required',
          },
          {
            text: 'Place 3rd marker',
            doneFn: () => markers.length > 2,
            type: 'required',
          },
          {
            text: 'Rightclick on marker to delete',
            doneFn: () => false,
            type: 'info',
          },
        ]"
      />
    </template>
    <template #main>
      <ImageMeasure />
    </template>
  </MainContent>
</template>
<style scoped>
.areas {
  grid-template-columns: 1fr auto;
}

.area-selected {
  background-color: var(--primary-color);
  color: white;
}

.expanded {
  grid-template-rows: 50px 50px;
  gap: 0.25rem 0;
}

.areas > .area-button {
  opacity: 1;
}

.area-selected > Button {
  color: white;
}
</style>
