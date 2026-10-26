<template>
  <div
    id="view-waveform"
    class="tracker-waveform-view"
    :style="{ backgroundColor: theme.background || '#000000' }"
  >
    <div
      id="ui-waveform-outer"
      class="waveform-outer clickable-target"
      :style="{ borderColor: theme.frames?.inactive || '#1c1c1c' }"
      @click="selectField('waveform.background')"
    >
      <div
        id="ui-waveform-bg"
        class="waveform-inner-box"
        :style="{ backgroundColor: theme.waveform?.background || '#080808' }"
      >
        <svg
          id="ui-waveform-svg"
          class="waveform-svg"
          viewBox="0 0 600 224"
          preserveAspectRatio="none"
        >
          <line
            id="ui-wf-zeroline"
            x1="0"
            y1="112"
            x2="600"
            y2="112"
            :stroke="theme.waveform?.audio || '#ffffff'"
            stroke-width="1.5"
          />

          <g
            id="ui-waveform-bars"
            class="clickable-target"
            @click.stop="selectField('waveform.audio')"
          >
            <line
              v-for="bar in waveformBars"
              :key="bar.x"
              :x1="bar.x"
              :y1="bar.y1"
              :x2="bar.x"
              :y2="bar.y2"
              stroke-width="1.4"
              :stroke="theme.waveform?.audio || '#ffffff'"
            />
          </g>

          <line
            id="ui-slice-marker-start"
            class="clickable-target"
            x1="1"
            y1="0"
            x2="1"
            y2="224"
            :stroke="theme.waveform?.sliceMarker || theme.frames?.active || '#d82b2b'"
            stroke-width="2"
            @click.stop="selectField('frames.active', 'waveform.sliceMarker')"
          />
          <polygon
            id="ui-slice-flag-start"
            points="1,-8 8,-4 1,0"
            fill="none"
            :stroke="theme.waveform?.sliceMarker || theme.frames?.active || '#d82b2b'"
            stroke-width="1.8"
          />

          <line
            id="ui-slice-marker-end"
            x1="599"
            y1="0"
            x2="599"
            y2="224"
            stroke="#ffffff"
            stroke-width="2"
          />
          <polygon
            id="ui-slice-flag-end"
            points="599,-8 592,-4 599,0"
            fill="none"
            stroke="#ffffff"
            stroke-width="1.8"
          />
        </svg>
      </div>
    </div>

    <div id="ui-waveform-effect-list" class="waveform-effect-col">
      <div id="ui-waveform-effect-items" class="waveform-effect-list">
        <div
          id="ui-wf-list-act"
          class="effect-item-selected clickable-target"
          :style="{
            borderColor: theme.labels?.active?.frame || '#ffffff',
            color: theme.labels?.active?.text || '#ffffff'
          }"
          @click="selectField('labels.active.text', 'labels.active.frame')"
        >
          Normalizer
        </div>

        <div
          v-for="eff in effectList"
          :key="eff"
          class="effect-item-normal clickable-target"
          :style="{ color: theme.labels?.inactive?.text || theme.labels?.active?.text || '#ffffff' }"
          @click="selectField('labels.inactive.text')"
        >
          {{ eff }}
        </div>
      </div>

      <div
        id="ui-wf-eff-scroll"
        class="effect-scrollbar-thumb"
        :style="{ backgroundColor: theme.popups?.stepList?.scrollbar || '#444444' }"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { theme, selectField } from '@/stores/themeStore';

const effectList = [
  'Crop', 'Reverse', 'Amplifier', 'Overdrive', 'Delay',
  'Bitcrusher', 'Chorus', 'Flanger', 'Equalizer', 'Limiter',
  'Compressor', 'WT Smoother', 'Timestretch Beat'
];

interface BarData {
  x: number;
  y1: number;
  y2: number;
}

const waveformBars = computed<BarData[]>(() => {
  const bars: BarData[] = [];
  for (let x = 3; x < 596; x += 2) {
    let amp = 0;
    if (x < 210) {
      const norm = x / 210;
      const decay = Math.pow(1 - norm, 2.1);
      const osc = Math.sin(x * 0.27) * Math.cos(x * 0.09);
      amp = osc * decay * 102;
      if (x === 17) amp = -104;
      if (x === 23) amp = 96;
    } else {
      amp = Math.sin(x * 0.9) * 1.2;
    }
    bars.push({
      x,
      y1: 112,
      y2: 112 - amp
    });
  }
  return bars;
});
</script>

<style lang="scss">
.tracker-waveform-view {
  height: 395px;
  width: 800px;
  display: flex;
  overflow: hidden;
  position: relative;
  user-select: none;
  box-sizing: border-box;
}

.waveform-outer {
  width: 600px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-right-width: 1px;
  border-right-style: solid;
  flex-shrink: 0;
  position: relative;
  box-sizing: border-box;
}

.waveform-inner-box {
  height: 224px;
  width: 100%;
  position: relative;
  overflow: visible;
  box-sizing: border-box;
}

.waveform-svg {
  width: 100%;
  height: 100%;
  overflow: visible;
}

.waveform-effect-col {
  width: 199px;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 6px 10px;
  flex-shrink: 0;
  position: relative;
  box-sizing: border-box;
}

.waveform-effect-list {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-size: 13px;
  box-sizing: border-box;
}

.effect-item-selected {
  height: 26px;
  margin: 0 -4px;
  padding: 0 8px;
  border-width: 2px;
  border-style: solid;
  display: flex;
  align-items: center;
  font-weight: 700;
  white-space: nowrap;
}

.effect-item-normal {
  height: 25px;
  padding: 0 4px;
  display: flex;
  align-items: center;
  white-space: nowrap;
}

.effect-scrollbar-thumb {
  position: absolute;
  right: 2px;
  top: 8px;
  bottom: 80px;
  width: 3px;
}
</style>
