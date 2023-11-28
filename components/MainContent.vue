<template>
  <div class="main-content grid w-full h-full">
    <div class="main-content-bg flex justify-center items-center">
      <slot name="main" />
    </div>
    <Sidebar>
      <slot name="sidebar" />
    </Sidebar>
  </div>
</template>
<style scoped>
.main-content {
  grid-template-columns: 1fr 240px;
}
</style>
