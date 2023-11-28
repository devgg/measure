<script setup lang="ts">
interface Step {
  text: string;
  doneFn: () => boolean;
  type: "required" | "optional" | "info";
}

const props = defineProps<{
  text: string;
  steps: Step[];
}>();

const steps: Step[] = [];

const hidden = ref<boolean>(true);

function iconClasses(step: Step) {
  if (step.doneFn()) return "pi-check-circle primary-color";
  if (step.type === "required") return "pi-exclamation-circle error-color";
  if (step.type === "optional") return "pi-circle";
  return "pi-info-circle";
}
</script>

<template>
  <div>
    <div :class="{ hidden }">
      <div class="header py-4">{{ text }}</div>
      <div v-for="step in props.steps">
        <i class="pi" :class="iconClasses(step)" />
        {{ step.text }}
      </div>
    </div>
    <Button
      class="help-button w-full mt-4"
      type="button"
      icon="pi pi-question-circle"
      @click="hidden = !hidden"
      label="Help"
      :outlined="!hidden"
    />
  </div>
</template>
<style scoped>
.header {
  font-weight: 700;
  font-size: 1rem;
}

.help-button {
  animation-name: jackInTheBox;
  animation-duration: 1s;
  animation-iteration-count: 1;
}

@keyframes wiggle {
  0% {
    transform: translate(0, -50px) rotateZ(-10deg);
  }
  15% {
    transform: translate(0, -25px) rotateZ(-10deg);
  }
  20% {
    transform: rotateZ(8deg);
  }
  25% {
    transform: rotateZ(-8deg);
  }
  30% {
    transform: rotateZ(5deg);
  }
  35% {
    transform: rotateZ(-3deg);
  }
  40%,
  100% {
    transform: rotateZ(0);
  }
}

@keyframes jackInTheBox {
  from {
    opacity: 0;
    transform: scale(0.1) rotate(30deg);
    transform-origin: center bottom;
  }

  50% {
    transform: rotate(-10deg);
  }

  70% {
    transform: rotate(3deg);
  }

  to {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
