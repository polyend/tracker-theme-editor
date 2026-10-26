<template>
  <div class="tracker-bezel-wrapper">
    <div class="bezel-screen-frame">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style lang="scss">
.tracker-bezel-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #141414;
  border: 1px solid #242424;
  border-radius: 8px;
  padding: 12px;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.5), 0 8px 10px -6px rgba(0, 0, 0, 0.5);
  user-select: none;
}

.bezel-screen-frame {
  width: 800px;
  height: 480px;
  overflow: hidden;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.8) inset;
}
</style>
