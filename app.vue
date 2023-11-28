<script setup lang="ts">
import { ref, onBeforeMount, onUnmounted, onMounted } from "vue";
import { useDebounceFn, useThrottleFn } from "@vueuse/core";

import { reroute } from "~/utils/routing";

const measureEnabled = ref(false);
const mainStore = useMainStore();

mainStore.$subscribe((_, state) => {
  console.log("main store", state);
});

const sizeStoreThrottleFun = useThrottleFn(
  (state: any) => console.log("size store", state),
  300,
);
useSizeStore().$subscribe((_, state) => {
  sizeStoreThrottleFun(state);
});

const measureStoreThrottleFun = useThrottleFn(
  (state: any) => console.log("measure store", state),
  300,
);
useMeasureStore().$subscribe((_, state) => {
  measureStoreThrottleFun(state);
});

const onWindowResize = useDebounceFn(
  () => {
    if (mainStore.bitmap === null) return;
    mainStore.update(mainStore.bitmap);
  },
  250,
  { maxWait: 250 },
);

onBeforeMount(() => {
  window.addEventListener("resize", onWindowResize);
});

onUnmounted(() => {
  window.removeEventListener("resize", onWindowResize);
});

const route = useRoute();
const items = ref<
  {
    route: string;
    label: string;
  }[]
>([
  { route: "/", label: "Upload" },
  { route: "/size", label: "Size" },
  { route: "/measure", label: "Measure" },
]);
const currentIndex = computed(() =>
  items.value.findIndex((i) => i.route === route.path),
);

function openGitHub() {
  window.open("github.com", "_blank");
}
</script>

<template>
  <div class="topbar grid w-full justify-center items-center">
    <div></div>
    <div class="buttons grid gap-3 relative w-fit justify-self-center">
      <div
        class="border absolute"
        :style="{ left: `${currentIndex * 140}px` }"
      />
      <template v-for="item in items">
        <Button
          :label="item.label"
          @click="navigateTo(item.route)"
          text
          :disabled="reroute(item.route) !== null"
          size="small"
        />
        <!-- :outlined="item.route === route.path" -->
        <!-- :text="item.route !== route.path" -->
        <i
          v-if="item != items[items.length - 1]"
          class="self-center pi pi-chevron-right primary-color"
        />
      </template>
    </div>
    <div class="justify-self-end flex flex-row">
      <ThemeSwitcher />
      <a
        href="https://github.com"
        target="_blank"
        rel="noopener noreferrer"
        class="p-button p-button-rounded p-button-text"
      >
        <i class="pi pi-github primary-color"></i>
      </a>
    </div>
  </div>
  <div class="content h-screen h-full">
    <NuxtPage />
  </div>
</template>

<style scoped>
.content {
  padding-top: var(--topbar-height);
}

.topbar {
  grid-template-columns: 1fr 1fr 1fr;

  position: fixed;
  width: 100%;
  height: var(--topbar-height);
  border-bottom: var(--card-border);
}

.buttons {
  grid-template-columns: 100px 16px 100px 16px 100px;
}

@keyframes example {
  from {
    background-color: red;
  }
  to {
    background-color: yellow;
  }
}

.border {
  top: 0;
  border: var(--primary-color) solid;
  border-radius: 6px;
  height: 100%;
  width: 100px;
  transition: left 0.7s cubic-bezier(0.65, 0, 0.35, 1);
}
</style>
