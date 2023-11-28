<script setup lang="ts">
import { ref } from "vue";

const { changed, size, unit } = storeToRefs(useSizeStore());

const op = ref();

const toggle = (event: any) => {
  op.value.toggle(event);
};
</script>

<template>
  <div class="sidebar grid gap-5 p-3 items-start justify-start">
    <slot></slot>
  </div>
</template>
<style scoped>
.sidebar {
  border-left: var(--card-border);
  grid-template-columns: 1fr;
  grid-template-rows: 1fr auto;
}
</style>
