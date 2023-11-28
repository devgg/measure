<script setup lang="ts">
import { ref, onBeforeMount } from "vue";
import type { FileUploadSelectEvent } from "primevue/fileupload";
import { useMainStore } from "~/stores/main";

const fileSelectedEmit = "file-selected";
const emit = defineEmits([fileSelectedEmit]);

const mainStore = useMainStore();

let uploadButton: HTMLElement;
onBeforeMount(() => {
  uploadButton = document.getElementById("upload-button")!;
});

function uploadClicked() {
  uploadButton.click();
}

async function fileSelected(event: FileUploadSelectEvent) {
  if (event.files === null || event.files.length === 0) return;
  navigateForward(event.files[0]);
}

async function fileDropped(event: DragEvent) {
  if (event.dataTransfer === null || event.dataTransfer.files?.length !== 1) {
    return;
  }
  navigateForward(event.dataTransfer.files[0]);
}

async function navigateForward(file: File) {
  const bitmap = await createImageBitmap(file);
  mainStore.update(bitmap);
  await navigateTo("/size");
}

const dropping = ref(false);
</script>

<template>
  <div class="flex justify-center flex-col w-full grow h-full">
    <div
      id="upload-area"
      :class="{ dropping }"
      class="self-center flex justify-center flex-col card w-2/3 h-2/3"
      @drop.stop.prevent="fileDropped"
      @dragenter.prevent="dropping = true"
      @dragover.prevent
      @dragleave="dropping = false"
      @dragend="dropping = false"
    ></div>
    <FileUpload
      id="upload"
      mode="basic"
      accept="image/*"
      @select="fileSelected"
      chooseLabel="Upload Image or Drop Image Above"
    />
  </div>
</template>
<style scoped>
#upload-area {
  opacity: 1;
  background-image: radial-gradient(
      var(--primary-color) 0.8px,
      transparent 0.8px
    ),
    radial-gradient(var(--primary-color) 0.8px, var(--surface-0) 0.8px);
  background-size: 32px 32px;
  background-position:
    50% 50%,
    calc(50% + 16px) calc(50% + 16px);
}

#upload-area[data-theme="light"] {
}

@keyframes color {
  100% {
    background-position:
      50% 50%,
      calc(50% + 48px) calc(50% + 48px);
  }
}

.dropping {
  animation: color 2s infinite linear;
}

#upload {
  align-self: center;
}
</style>
