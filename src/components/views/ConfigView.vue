<template>
  <div
    id="view-menu"
    class="tracker-config-view"
    :style="{ backgroundColor: theme.background || '#000000' }"
  >
    <div id="ui-config-col1" class="config-col-cat">
      <div id="ui-config-cat-list" class="config-cat-list">
        <div
          v-for="cat in categories"
          :key="cat"
        >
          <div
            v-if="cat === 'General'"
            id="ui-cfg-cat-active"
            class="config-cat-item is-selected clickable-target"
            :style="{
              borderColor: theme.labels?.active?.frame || '#ffffff',
              color: theme.labels?.active?.text || '#ffffff'
            }"
            @click="selectField('labels.active.frame', 'labels.active.text')"
          >
            {{ cat }}
          </div>

          <div
            v-else
            class="config-cat-item cfg-cat-item clickable-target"
            :style="{ color: theme.labels?.inactive?.text || theme.labels?.active?.text || '#ffffff' }"
            @click="selectField('labels.inactive.text')"
          >
            {{ cat }}
          </div>
        </div>
      </div>
    </div>

    <div
      id="ui-config-col2"
      class="config-col-params clickable-target"
      :style="{ borderColor: theme.frames?.active || '#c81e1e' }"
      @click="selectField('frames.active')"
    >
      <div id="ui-config-param-list" class="config-param-list">
        <div
          v-for="param in parameters"
          :key="param.name"
        >
          <div
            v-if="param.name === 'Pads brightness'"
            id="ui-cfg-param-active"
            class="config-param-item is-selected clickable-target"
            :style="{
              borderColor: theme.labels?.active?.frame || '#ffffff',
              color: theme.labels?.active?.text || '#ffffff'
            }"
            @click.stop="selectField('labels.active.frame', 'labels.active.text')"
          >
            <span>{{ param.name }}</span>
            <span>{{ param.value }}</span>
          </div>

          <div
            v-else
            class="config-param-item cfg-param-item clickable-target"
            :style="{ color: theme.labels?.inactive?.text || theme.labels?.active?.text || '#ffffff' }"
            @click.stop="selectField('labels.inactive.text')"
          >
            <span>{{ param.name }}</span>
            <span>{{ param.name === 'Display font' ? (activeFontName || param.value) : param.value }}</span>
          </div>
        </div>
      </div>
    </div>

    <div id="ui-config-col3" class="config-col-empty"></div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { theme, selectField } from '@/stores/themeStore';

const activeFontName = ref('New');

const categories = [
  'Project Settings', 'General', 'MIDI', 'Metronome', 'Firmware', 'Info'
];

const parameters = [
  { name: 'Radio region', value: 'Europe' },
  { name: 'Display brightness', value: 'Low' },
  { name: 'Display theme', value: 'Original' },
  { name: 'Display font', value: 'New' },
  { name: 'Pads brightness', value: 'Low' },
  { name: 'Pads preview', value: 'Pattern' },
  { name: 'Recording options', value: 'Microtiming + Velocity' },
  { name: 'Numbering mode', value: 'Decimal, Steps from 1' },
  { name: 'Pattern arrangement', value: 'Vertical Original' },
  { name: 'Pattern top info', value: 'Additional info' },
  { name: 'Line in channel', value: 'Stereo' }
];
</script>

<style lang="scss">
.tracker-config-view {
  height: 395px;
  width: 800px;
  display: flex;
  overflow: hidden;
  position: relative;
  user-select: none;
  box-sizing: border-box;
}

.config-col-cat {
  width: 200px;
  padding: 6px 8px;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  box-sizing: border-box;
}

.config-cat-list {
  display: flex;
  flex-direction: column;
  gap: 2px;
  font-size: 13px;
}

.config-cat-item {
  height: 26px;
  padding: 0 8px;
  display: flex;
  align-items: center;

  &.is-selected {
    height: 28px;
    border-width: 2px;
    border-style: solid;
    font-weight: 700;
  }
}

.config-col-params {
  width: 400px;
  height: 391px;
  margin: 2px 0;
  border-width: 2px;
  border-style: solid;
  padding: 4px 10px;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  position: relative;
  box-sizing: border-box;
}

.config-param-list {
  display: flex;
  flex-direction: column;
  gap: 2px;
  font-size: 13px;
}

.config-param-item {
  height: 26px;
  padding: 0 6px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &.is-selected {
    height: 28px;
    margin: 0 -4px;
    padding: 0 10px;
    border-width: 2px;
    border-style: solid;
    font-weight: 700;
  }
}

.config-col-empty {
  width: 200px;
  flex-shrink: 0;
}
</style>
