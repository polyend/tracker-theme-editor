<template>
  <div
    id="ui-topBar"
    class="tracker-topbar clickable-target"
    :style="{
      backgroundColor: theme.topBar?.background || '#000000',
      borderBottomColor: theme.topBar?.frame || '#666666',
      color: theme.topBar?.text || '#ffffff'
    }"
    @click="selectField('topBar.text', 'topBar.background', 'topBar.frame')"
  >
    <div class="topbar-title-wrapper">
      <span id="ui-topBar-title" class="topbar-title">{{ titleText }}</span>
    </div>

    <div
      v-if="showTimer"
      id="ui-songTimer"
      class="topbar-timer clickable-target"
      :style="{
        backgroundColor: theme.songTimer?.background || '#000000',
        borderColor: theme.songTimer?.frame || '#000000',
        color: theme.songTimer?.text || '#ffffff'
      }"
      @click.stop="selectField('songTimer.text', 'songTimer.background', 'songTimer.frame')"
    >
      <span>0m:00s</span>
      <span class="timer-pause-icon">
        <span class="timer-bar"></span>
        <span class="timer-bar"></span>
      </span>
      <span id="ui-songTimer-pos">{{ timerPos }}</span>
    </div>

    <div v-if="!isPopupHeaderVisible" class="topbar-right-wrapper">
      <span id="ui-topBar-right">{{ rightLabel }}</span>
    </div>

    <div
      v-if="isPopupHeaderVisible"
      id="ui-topbar-popup-header"
      class="topbar-popup-header clickable-target"
      :style="{
        backgroundColor: theme.popups?.stepTitle?.background || '#ffffff',
        borderColor: theme.popups?.stepTitle?.frame || '#ffffff',
        color: theme.popups?.stepTitle?.text || '#000000'
      }"
      @click.stop="selectField('popups.stepTitle.text', 'popups.stepTitle.background')"
    >
      <span>Instruments</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { theme, currentScreen, isInstPopupVisible, selectField } from '@/stores/themeStore';

const isPopupHeaderVisible = computed(() => {
  return currentScreen.value === 'pattern' && isInstPopupVisible.value;
});

const titleText = computed(() => {
  switch (currentScreen.value) {
    case 'pattern': return 'Pattern 16';
    case 'song': return 'Song';
    case 'sampleLoader': return 'Sample Loader';
    case 'waveform': return 'Sample Editor';
    case 'notes': return 'Notes Grid';
    case 'menu': return 'Config';
    default: return 'Pattern 16';
  }
});

const rightLabel = computed(() => {
  switch (currentScreen.value) {
    case 'pattern': return '8. Awesome sample';
    case 'song': return 'P02';
    case 'sampleLoader': return '8. Awesome sample';
    case 'waveform': return '8. Awesome sample';
    case 'notes': return '8. Awesome sample';
    case 'menu': return '';
    default: return '';
  }
});

const showTimer = computed(() => {
  if (currentScreen.value === 'pattern') {
    return !isInstPopupVisible.value;
  }
  return currentScreen.value === 'song';
});

const timerPos = computed(() => {
  return currentScreen.value === 'song' ? 'P02.001' : 'P16.036';
});
</script>

<style lang="scss">
.tracker-topbar {
  height: 28px;
  border-bottom-width: 1px;
  border-bottom-style: solid;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
  flex-shrink: 0;
  position: relative;
  z-index: 20;
  font-family: inherit;
  font-size: 15px;
  font-weight: 700;
  letter-spacing: -0.02em;
  box-sizing: border-box;
}

.topbar-title-wrapper {
  display: flex;
  align-items: center;
}

.topbar-title {
  font-weight: 700;
}

.topbar-timer {
  position: absolute;
  left: 288px;
  top: 0;
  height: 27px;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0 4px;
  border-width: 1px;
  border-style: solid;
  box-sizing: border-box;

  .timer-pause-icon {
    display: inline-flex;
    align-items: center;
    gap: 3px;
    padding: 0 2px;

    .timer-bar {
      width: 3px;
      height: 11px;
      background-color: currentColor;
      display: inline-block;
    }
  }
}

.topbar-right-wrapper {
  display: flex;
  align-items: center;
  padding-right: 2px;
}

.topbar-popup-header {
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  width: 199px;
  display: flex;
  align-items: center;
  padding: 0 8px;
  font-weight: 700;
  font-size: 15px;
  letter-spacing: -0.02em;
  box-sizing: border-box;
  flex-shrink: 0;
  z-index: 30;
  border-left: 1px solid transparent;
}
</style>
