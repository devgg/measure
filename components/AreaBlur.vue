<script setup lang="ts">
import type { Area } from "~/stores/main";

const mainStore = useMainStore();

const props = defineProps<{
  area: Area;
}>();

const instance = getCurrentInstance();
const uid = ref(instance?.uid);
</script>

<template>
  <div
    class="area-blur absolute w-full h-full top-0 left-0"
    :class="{ invalid: area.intersectingLines.size > 0 }"
  >
    <svg class="w-0 h-0">
      <defs>
        <clipPath :id="`area-clip-path-${uid}`">
          <polygon
            :points="
              props.area.markers
                .map(
                  (m) => `${m.x * mainStore.width},${m.y * mainStore.height}`,
                )
                .join(' ')
            "
          />
        </clipPath>
      </defs>
    </svg>
  </div>
</template>
<style scoped>
.area-blur {
  clip-path: v-bind("`url(#area-clip-path-${uid})`");
  backdrop-filter: invert(20%) grayscale(50%) blur(2px);
}

.area-blur.invalid {
  background-color: rgb(255 255 255 / 0.3);
  filter: drop-shadow(0px 0px 0px red);
}
</style>
