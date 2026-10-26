<template>
  <div
    id="ui-mini-menu-overlay"
    class="mini-menu-overlay clickable-target"
    :style="{ backgroundColor: 'rgba(0, 0, 0, 0.45)' }"
    @click.self="toggleMiniMenu"
  >
    <div
      id="ui-mini-menu-box"
      class="mini-menu-container"
      :style="{
        backgroundColor: menuBg,
        borderColor: menuBg
      }"
      @click.stop="selectField('miniMenu.background')"
    >
      <div
        v-for="(mod, idx) in modules"
        :key="mod.name"
        :id="`ui-mini-menu-item-${idx}`"
        class="mini-menu-item clickable-target"
        :class="{ 'is-selected': selectedIdx === idx }"
        :style="{
          backgroundColor: selectedIdx === idx ? selectedBoxBg : boxBg,
          outlineColor: selectedIdx === idx ? frameColor : 'transparent'
        }"
        @click.stop="handleBoxClick(idx)"
      >
        <span
          class="mini-menu-label"
          :style="{ color: textColor }"
        >
          {{ mod.name }}
        </span>

        <!-- Mode dots if multi-mode module (e.g. Instrument Parameters, Master) -->
        <div v-if="mod.dots" class="mini-menu-dots">
          <span
            v-for="dotIdx in mod.dots"
            :key="dotIdx"
            class="mini-menu-dot"
            :style="{
              backgroundColor: dotIdx === 1 ? activeDotColor : inactiveDotColor
            }"
          ></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { theme, selectField, isMiniMenuVisible } from '@/stores/themeStore';

const selectedIdx = ref(0);

const modules = [
  { name: 'Pattern' },
  { name: 'Instrument Parameters', dots: 2 },
  { name: 'Sample Playback' },
  { name: 'Master', dots: 3 },
  { name: 'Song' },
  { name: 'Sample Loader' },
  { name: 'File' },
  { name: 'Config' },
  { name: 'Perform' },
  { name: 'Sample Editor' },
  { name: 'Sample Recorder' },
  { name: 'Games' }
];

const textColor = computed(() => {
  return theme.miniMenu?.text || '#ffffff';
});

const boxBg = computed(() => {
  return theme.miniMenu?.boxBackground || '#222222';
});

const selectedBoxBg = computed(() => {
  return theme.miniMenu?.selectedBox || '#323232';
});

const menuBg = computed(() => {
  return theme.miniMenu?.background || '#000000';
});

const frameColor = computed(() => {
  return theme.miniMenu?.frame || '#c81e1e';
});

const inactiveDotColor = computed(() => {
  return theme.miniMenu?.inactiveDot || '#121212';
});

const activeDotColor = computed(() => {
  return theme.miniMenu?.activeDot || '#777777';
});

function handleBoxClick(idx: number) {
  selectedIdx.value = idx;
  if (idx === 1 || idx === 3) {
    selectField('miniMenu.selectedBox', 'miniMenu.frame', 'miniMenu.activeDot');
  } else {
    selectField('miniMenu.selectedBox', 'miniMenu.frame', 'miniMenu.text');
  }
}

function toggleMiniMenu() {
  isMiniMenuVisible.value = false;
}
</script>

<style scoped lang="scss">
.mini-menu-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 800px;
  height: 480px;
  z-index: 85;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(1px);
}

.mini-menu-container {
  width: 440px;
  height: 330px;
  display: grid;
  grid-template-columns: repeat(4, 106px);
  grid-template-rows: repeat(3, 106px);
  gap: 3px;
  padding: 3px;
  box-sizing: border-box;
  border-radius: 1px;
}

.mini-menu-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 8px 6px;
  box-sizing: border-box;
  position: relative;
  cursor: pointer;
  user-select: none;
  outline-offset: -2px;

  &.is-selected {
    outline-width: 2px;
    outline-style: solid;
    z-index: 2;
  }
}

.mini-menu-label {
  font-family: inherit;
  font-size: 13px;
  line-height: 1.25;
  font-weight: 500;
  max-width: 96px;
  word-wrap: break-word;
}

.mini-menu-dots {
  position: absolute;
  bottom: 8px;
  display: flex;
  gap: 8px;
  align-items: center;
}

.mini-menu-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
}
</style>
