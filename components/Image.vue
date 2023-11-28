<script setup lang="ts">
import { onMounted, watch, ref } from "vue";
import { storeToRefs } from "pinia";

import { useMainStore } from "../stores/main";
import type { MainStoreType } from "../stores/main";

const element = ref<HTMLElement | null>(null);
defineExpose({ element });

const emits = defineEmits<{ onImageClicked: [event: MouseEvent] }>();

const mainStore = useMainStore();
mainStore.$subscribe((mutation, state) => {
  redraw(state);
});

async function redraw(state: MainStoreType) {
  ctx.canvas.width = state.width;
  ctx.canvas.height = state.height;
  ctx.drawImage(state.bitmap!, 0, 0, state.width, state.height);
}

const canvas = ref<HTMLCanvasElement | null>(null);
let ctx: CanvasRenderingContext2D;
onMounted(() => {
  ctx = canvas.value!.getContext("2d")!;
  redraw(mainStore);
});
</script>

<template>
  <div class="img-box p-6 shadow-xl rounded-md w-fit">
    <div
      ref="element"
      class="img-inner-box relative rounded-md"
      @click="(e) => emits('onImageClicked', e)"
    >
      <canvas ref="canvas" class="rounded-md" width="0" height="0"> </canvas>
      <slot />
    </div>
  </div>
</template>
<style scoped>
.img-box {
  background-color: var(--surface-0);
  opacity: 1;
  background-size: 8px 8px;
  box-shadow: 0 0 100px 0px var(--surface-300);

  /*border: var(--primary-color) solid;*/
  /*background-color: var(--surface-0);*/
  border: 1px solid var(--surface-300);
}

.img-inner-box {
  /*border: var(--primary-color) solid;*/
  border: 1px solid var(--surface-300);
}
</style>
