import { usePrimeVue } from "primevue/config";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.provide("PrimeVue", usePrimeVue);
});
