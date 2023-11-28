<script setup lang="ts">
import { onMounted, watch, ref } from "vue";
import { useMainStore, useSizeStore } from "../stores/main";
import type { MainStoreType } from "../stores/main";

const { changed, size, unit } = storeToRefs(useSizeStore());

const unitRef = computed<{ name: string } | null>({
  get: (): { name: string } | null => {
    return unit.value !== null ? { name: unit.value } : null;
  },

  set: (val: { name: string } | null) => {
    unit.value = val !== null && val.name !== "none" ? val.name : null;
  },
});
</script>

<template>
  <MainContent>
    <template #sidebar>
      <div class="grid grid-cols-1 gap-y-4">
        <div>
          <label for="size" class="font-bold block mb-2">Size</label>
          <InputNumber
            v-model="size"
            placeholder="Enter Size..."
            icon="i-solar:ruler-linear"
            inputId="minmaxfraction"
            :maxFractionDigits="5"
            class="w-full"
            :class="{ 'p-invalid': size !== null && size <= 0 }"
          />
        </div>

        <div>
          <label for="unit" class="font-bold block mb-2">Unit</label>
          <CascadeSelect
            v-model="unitRef"
            placeholder="Select unit..."
            inputId="unit"
            :options="[
              {
                name: '🌍 Metric',
                units: [
                  { name: 'mm' },
                  { name: 'cm' },
                  { name: 'm' },
                  { name: 'km' },
                ],
              },
              {
                name: '🇺🇸 Imperial',
                units: [
                  { name: 'in' },
                  { name: 'ft' },
                  { name: 'yd' },
                  { name: 'mi' },
                ],
              },
              { name: 'none' },
            ]"
            optionLabel="name"
            optionGroupLabel="name"
            :optionGroupChildren="['units']"
            class="w-full"
          />
        </div>

        <Button
          label="Next"
          icon="pi pi-chevron-right"
          :disabled="!canAccessMeasurePage()"
          @click="navigateTo('/measure')"
        />
      </div>
      <Help
        text="Enter a known size on the image."
        :steps="[
          {
            text: 'Position markers',
            doneFn: () => changed,
            type: 'required',
          },
          {
            text: 'Enter distance',
            doneFn: () => size !== null && size > 0,
            type: 'required',
          },
          {
            text: 'Enter unit',
            doneFn: () => unit !== null,
            type: 'optional',
          },
        ]"
      />
    </template>
    <template #main>
      <ImageSize />
    </template>
  </MainContent>
</template>
