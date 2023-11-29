<script setup lang="ts">
import { ref, onBeforeMount, onUnmounted, onMounted } from "vue";
import { useDebounceFn } from "@vueuse/core";

import { useMainStore, useSizeStore } from "~/stores/main";

const themes = ref([
  {
    themePrefix: "lara",
    themeSuffix: "blue",
    lightColor: "#3B82F6",
    darkColor: "#60a5fa",
  },
  {
    themePrefix: "lara",
    themeSuffix: "teal",
    lightColor: "#10b981",
    darkColor: "#34d399",
  },
  {
    themePrefix: "lara",
    themeSuffix: "purple",
    lightColor: "#8B5CF6",
    darkColor: "#a78bfa",
  },
]);
const theme = ref(themes.value[0]);
const light = ref(true);
</script>

<template>
  <div class="flex">
    <Button v-for="(t, i) in themes" @click="theme = t" text rounded>
      <svg :width="16" :height="16">
        <defs>
          <radialGradient :id="`gradient-${i}`">
            <stop
              offset="0%"
              :stop-color="light ? t.lightColor : t.darkColor"
            />
            <stop
              offset="100%"
              :stop-color="light ? t.lightColor : t.darkColor"
            />
          </radialGradient>
        </defs>
        <circle :cx="8" :cy="8" :r="8" :fill="`url(#gradient-${i})`" />
      </svg>
    </Button>
    <Button aria-label="DarkMode" @click="light = !light" text rounded>
      <i :class="`pi pi-${light ? 'sun' : 'moon'}`"></i>
    </Button>
    <link
      rel="stylesheet"
      :href="`/measure/themes/${theme.themePrefix}-${
        light ? 'light' : 'dark'
      }-${theme.themeSuffix}/theme.css`"
    />
  </div>
</template>
<style scoped></style>
