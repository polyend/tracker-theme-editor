<template>
  <div
    id="ui-bottomButtons"
    class="tracker-bottom-buttons clickable-target"
    :style="{
      backgroundColor: theme.bottomButtons?.background || '#000000',
      borderTopColor: theme.bottomButtons?.frame || '#1f1f1f'
    }"
    @click="selectField('bottomButtons.text', 'bottomButtons.background', 'bottomButtons.frame')"
  >
    <div
      v-for="(btn, idx) in buttonSpecs"
      :key="idx"
      class="bottom-btn-cell"
      :class="[
        btn.span ? `col-span-${btn.span}` : 'col-span-1',
        { 'is-active-red-box': btn.activeRedBox }
      ]"
      :style="btn.activeRedBox ? { borderColor: theme.frames?.active || '#c81e1e' } : {}"
      @click="handleCellClick($event, btn)"
    >
      <div
        v-if="idx < buttonSpecs.length - 1"
        class="bottom-btn-divider"
        :style="{ backgroundColor: theme.bottomButtons?.frame || '#1f1f1f' }"
      ></div>

      <template v-if="btn.type === 'more'">
        <span
          class="btn-label-bold"
          :style="{ color: theme.moreButton?.text || theme.bottomButtons?.text || '#888888' }"
        >
          More
        </span>
        <div class="more-dots">
          <span
            class="more-dot"
            :style="{ backgroundColor: theme.moreButton?.activeDot || '#888888' }"
          ></span>
          <span
            class="more-dot"
            :style="{ backgroundColor: theme.moreButton?.inactiveDot || '#2e2e2e' }"
          ></span>
          <span
            class="more-dot"
            :style="{ backgroundColor: theme.moreButton?.inactiveDot || '#2e2e2e' }"
          ></span>
        </div>
      </template>

      <template v-else-if="btn.type === 'arrows'">
        <div
          class="arrows-btn-content"
          :style="{ color: theme.bottomButtons?.text || '#888888' }"
        >
          <span class="arrow-icon">▲</span>
          <span class="arrows-label">{{ btn.label }}</span>
          <span class="arrow-icon">▼</span>
        </div>
      </template>

      <template v-else-if="btn.type === 'patternNav'">
        <div
          class="nav-btn-content"
          :style="{ color: theme.labels?.inactiveButton?.text || '#444444' }"
        >
          <span class="nav-arrows">◄◄</span>
          <span class="nav-label">Pattern</span>
          <span class="nav-arrows">►►</span>
        </div>
      </template>

      <template v-else-if="btn.type !== 'empty'">
        <span
          v-if="btn.t1"
          class="btn-label"
          :style="{ color: btn.dim ? (theme.labels?.inactiveButton?.text || '#444444') : (theme.bottomButtons?.text || '#888888') }"
        >
          {{ btn.t1 }}
        </span>
        <span
          v-if="btn.t1b"
          class="btn-label"
          :style="{ color: btn.dim ? (theme.labels?.inactiveButton?.text || '#444444') : (theme.bottomButtons?.text || '#888888') }"
        >
          {{ btn.t1b }}
        </span>
        <span
          v-if="btn.t2"
          class="btn-value"
          :style="{ color: theme.labels?.activeButton?.text2 || '#ffffff' }"
        >
          {{ btn.t2 }}
        </span>
      </template>

      <div
        v-if="btn.line === 'green' || btn.line === 'red'"
        class="btn-status-line clickable-target"
        :style="{
          backgroundColor: btn.line === 'green'
            ? (theme.labels?.activeButton?.frame || '#1a7a33')
            : (theme.labels?.inactiveButton?.frame || '#6b1515')
        }"
        @click.stop="selectField(btn.line === 'green' ? 'labels.activeButton.frame' : 'labels.inactiveButton.frame')"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { theme, currentScreen, isInstPopupVisible, selectField } from '@/stores/themeStore';

interface ButtonSpec {
  t1?: string;
  t1b?: string;
  t2?: string;
  dim?: boolean;
  line?: 'green' | 'red' | 'none';
  type?: 'more' | 'arrows' | 'patternNav' | 'empty';
  label?: string;
  span?: number;
  activeRedBox?: boolean;
}

const buttonSpecs = computed<ButtonSpec[]>(() => {
  if (currentScreen.value === 'pattern') {
    return [
      { t1: 'Pattern', t2: '16', line: 'green' },
      { t1: 'Length', t2: '128', line: 'green' },
      { t1: 'Step jump', t2: '1', line: 'green' },
      { t1: 'Fill', dim: true, line: 'red' },
      { t1: 'Preview', line: 'green' },
      { t1: 'Undo', dim: true, line: 'red' },
      { t1: isInstPopupVisible.value ? '' : 'Redo', dim: true, line: isInstPopupVisible.value ? 'none' : 'red' },
      { type: isInstPopupVisible.value ? 'empty' : 'more' }
    ];
  } else if (currentScreen.value === 'song') {
    return [
      { t1: 'Play', t1b: 'Pattern' },
      { t1: 'Play', t1b: 'Song' },
      { t1: 'Undo', dim: true, line: 'red' },
      { t1: 'Add', t1b: 'Slot', dim: true, line: 'red' },
      { t1: 'Delete', t1b: 'Slot', dim: true, line: 'red' },
      { span: 2, type: 'patternNav', line: 'red' },
      { t1: 'Tempo', t2: '120.0 BPM' }
    ];
  } else if (currentScreen.value === 'sampleLoader') {
    return [
      { t1: 'Enter' },
      { t1: 'Add next', dim: true },
      { t1: 'Preview', dim: true },
      { t1: 'Rename', dim: true },
      { t1: 'Import', dim: true },
      { t1: 'Delete', t1b: 'unused', dim: true },
      { t1: 'Preview Vol', t2: '-10.80 dB' },
      { t1: 'Memory', t2: '49%' }
    ];
  } else if (currentScreen.value === 'waveform') {
    return [
      { t1: 'Start', t2: '0.000s', activeRedBox: true },
      { t1: 'End', t2: '0.404s' },
      { t1: 'Zoom', t2: '1.00' },
      { t1: 'Undo', dim: true },
      { type: 'empty' },
      { t1: 'Select', t1b: 'effect' },
      { span: 2, type: 'arrows', label: 'Effect' }
    ];
  } else if (currentScreen.value === 'menu') {
    return [
      { span: 2, type: 'arrows', label: 'General' },
      { span: 4, type: 'arrows', label: 'Pads brightness' },
      { type: 'empty' },
      { t1: 'Enter' }
    ];
  }
  return [];
});

function handleCellClick(e: MouseEvent, btn: ButtonSpec) {
  e.stopPropagation();
  if (btn.activeRedBox) {
    selectField('frames.active', 'labels.activeButton.text2');
  } else if (btn.type === 'more') {
    selectField('moreButton.text', 'moreButton.activeDot', 'moreButton.inactiveDot');
  } else {
    selectField('bottomButtons.text', 'bottomButtons.background', 'bottomButtons.frame');
  }
}
</script>

<style lang="scss">
.tracker-bottom-buttons {
  height: 57px;
  border-top-width: 1px;
  border-top-style: solid;
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  text-align: center;
  flex-shrink: 0;
  position: relative;
  z-index: 20;
  box-sizing: border-box;
}

.bottom-btn-cell {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 0 6px;
  user-select: none;
  box-sizing: border-box;

  &.col-span-1 { grid-column: span 1; }
  &.col-span-2 { grid-column: span 2; }
  &.col-span-4 { grid-column: span 4; }

  &.is-active-red-box {
    border-width: 2px;
    border-style: solid;
  }
}

.bottom-btn-divider {
  position: absolute;
  right: 0;
  top: 6px;
  bottom: 6px;
  width: 1px;
}

.btn-label {
  font-size: 12px;
  font-weight: 700;
  line-height: 1.1;
}

.btn-label-bold {
  font-size: 13px;
  font-weight: 700;
  margin-bottom: 4px;
}

.btn-value {
  font-size: 15px;
  font-weight: 400;
  line-height: 1.1;
  margin-top: 2px;
}

.more-dots {
  display: flex;
  align-items: center;
  gap: 6px;

  .more-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
  }
}

.arrows-btn-content {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 12px;
  font-size: 13px;
  font-weight: 700;

  .arrow-icon {
    font-size: 10px;
  }
}

.nav-btn-content {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  font-size: 13px;
  font-weight: 700;

  .nav-arrows {
    font-size: 11px;
    letter-spacing: -0.05em;
  }
}

.btn-status-line {
  position: absolute;
  bottom: 3px;
  left: 10px;
  right: 10px;
  height: 2px;
}
</style>
