<template>
  <div
    id="view-pattern"
    class="tracker-pattern-view"
    :style="{ backgroundColor: theme.patternTracker?.background || '#000000' }"
  >
    <div
      id="ui-stepColL"
      class="pattern-step-col is-left"
      :style="{
        borderRightColor: theme.patternTracker?.verticalDivider || '#181818',
        color: theme.patternTracker?.stepNumber || '#666666'
      }"
    >
      <div
        v-for="step in steps"
        :key="`l-${step}`"
        class="step-num-cell clickable-target"
        @click="selectField('patternTracker.stepNumber')"
      >
        {{ step }}
      </div>
    </div>

    <div
      id="ui-tracksColumns"
      class="pattern-tracks-container"
      :style="{ borderColor: theme.patternTracker?.verticalDivider || '#181818' }"
      @click="selectField('patternTracker.activeTrack', 'patternTracker.unfocusedTrack', 'patternTracker.verticalDivider')"
    >
      <div
        v-for="(trackName, tIdx) in trackNames"
        :key="trackName"
        :id="`ui-t${tIdx + 1}-col`"
        class="pattern-track-col"
        :style="{
          backgroundColor: tIdx === 0
            ? (theme.patternTracker?.activeTrack || '#060606')
            : (theme.patternTracker?.unfocusedTrack || '#060606'),
          borderRightColor: theme.patternTracker?.verticalDivider || '#181818'
        }"
      >
        <div
          v-for="step in steps"
          :key="`t-${tIdx}-${step}`"
          :id="tIdx === 0 && step === activeStep ? 'ui-selectionBox' : undefined"
          class="pattern-step-row"
          :class="{
            'is-beat-row': isBeat(step),
            'is-selected-cell': tIdx === 0 && step === activeStep
          }"
          :style="{
            backgroundColor: isBeat(step) ? (theme.patternTracker?.gridDivider || '#111111') : undefined,
            borderColor: tIdx === 0 && step === activeStep
              ? (isRecMode ? (theme.patternTracker?.selection || '#c81e1e') : (theme.patternTracker?.greenMode || '#32b846'))
              : undefined
          }"
          @click.stop="handleRowClick(tIdx, step)"
        >
          <div
            v-if="step === startStep"
            class="track-header-badge clickable-target"
            :style="{
              backgroundColor: theme.patternTracker?.activeTrack || '#060606',
              color: theme.patternTracker?.trackName || '#666666'
            }"
            @click.stop="selectField('patternTracker.trackName', 'patternTracker.activeTrack')"
          >
            {{ trackName }}
          </div>

          <span
            v-if="tIdx === 0 && step === activeStep"
            id="ui-selActiveBlock"
            class="note-cell-active clickable-target"
            :style="{
              backgroundColor: isRecMode ? (theme.patternTracker?.selection || '#c81e1e') : (theme.patternTracker?.greenMode || '#32b846'),
              color: theme.patternTracker?.selectionText || '#ffffff'
            }"
            @click.stop="selectField(isRecMode ? 'patternTracker.selection' : 'patternTracker.greenMode', 'patternTracker.selectionText')"
          >
            {{ formatNote(patternData[step][tIdx].note) }}
          </span>
          <span
            v-else
            class="note-cell clickable-target"
            :class="{
              'is-invisible': step === startStep,
              'is-dim': patternData[step][tIdx].note === '---'
            }"
            :style="{
              color: patternData[step][tIdx].note === '---'
                ? (theme.patternTracker?.inactiveNote || '#0e3830')
                : (theme.patternTracker?.note || '#22d6b8')
            }"
            @click.stop="selectField(patternData[step][tIdx].note === '---' ? 'patternTracker.inactiveNote' : 'patternTracker.note')"
          >
            {{ formatDash(patternData[step][tIdx].note) }}
          </span>

          <span
            class="inst-cell clickable-target"
            :class="{
              'is-dim': patternData[step][tIdx].inst === '--'
            }"
            :style="{
              color: patternData[step][tIdx].inst === '--'
                ? (theme.patternTracker?.inactiveInstrument || '#3a3510')
                : (theme.patternTracker?.instrument || '#f0e040')
            }"
            @click.stop="selectField(patternData[step][tIdx].inst === '--' ? 'patternTracker.inactiveInstrument' : 'patternTracker.instrument')"
          >
            {{ formatDash(patternData[step][tIdx].inst) }}
          </span>

          <span
            class="fx1-cell clickable-target"
            :class="{
              'is-dim': patternData[step][tIdx].fx1 === '----'
            }"
            :style="{
              color: patternData[step][tIdx].fx1 === '----'
                ? (theme.patternTracker?.inactiveFx1 || '#2e1642')
                : (theme.patternTracker?.fx1 || '#a855f7')
            }"
            @click.stop="selectField(patternData[step][tIdx].fx1 === '----' ? 'patternTracker.inactiveFx1' : 'patternTracker.fx1')"
          >
            {{ formatDash(patternData[step][tIdx].fx1) }}
          </span>

          <span
            class="fx2-cell clickable-target"
            :class="{
              'is-dim': patternData[step][tIdx].fx2 === '----'
            }"
            :style="{
              color: patternData[step][tIdx].fx2 === '----'
                ? (theme.patternTracker?.inactiveFx2 || '#103242')
                : (theme.patternTracker?.fx2 || '#38bdf8')
            }"
            @click.stop="selectField(patternData[step][tIdx].fx2 === '----' ? 'patternTracker.inactiveFx2' : 'patternTracker.fx2')"
          >
            {{ formatDash(patternData[step][tIdx].fx2) }}
          </span>
        </div>
      </div>
    </div>

    <div
      id="ui-stepColR"
      class="pattern-step-col is-right"
      :style="{
        borderLeftColor: theme.patternTracker?.verticalDivider || '#181818',
        color: theme.patternTracker?.stepNumber || '#666666'
      }"
    >
      <div
        v-for="step in steps"
        :key="`r-${step}`"
        class="step-num-cell clickable-target"
        @click="selectField('patternTracker.stepNumber')"
      >
        {{ step }}
      </div>
    </div>

    <div
      v-if="isPlayheadVisible"
      id="ui-playhead-line"
      class="pattern-playhead-overlay clickable-target"
    >
      <div
        class="playhead-gradient-top clickable-target"
        :style="{
          background: `linear-gradient(to bottom, ${theme.patternTracker?.background || '#000000'}, ${theme.patternTracker?.playhead || '#32b846'})`
        }"
        title="Playhead Line (patternTracker.playhead)"
        @click.stop="selectField('patternTracker.playhead')"
      />
      <div class="playhead-center-row" />
      <div
        class="playhead-gradient-bottom clickable-target"
        :style="{
          background: `linear-gradient(to bottom, ${theme.patternTracker?.playhead || '#32b846'}, transparent)`
        }"
        title="Playhead Line (patternTracker.playhead)"
        @click.stop="selectField('patternTracker.playhead')"
      />
      <div class="playhead-dividers">
        <div
          v-for="x in [27, 213.5, 400, 586.5, 773]"
          :key="x"
          class="playhead-divider"
          :style="{
            left: `${x}px`,
            backgroundColor: theme.patternTracker?.verticalDivider || '#181818'
          }"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { theme, isRecMode, isPlayheadVisible, selectField } from '@/stores/themeStore';

const startStep = 29;
const endStep = 43;
const activeStep = 36;
const trackNames = ['Drums', 'Hats', 'Bass', 'Lead'];

const steps = Array.from({ length: endStep - startStep + 1 }, (_, i) => startStep + i);

const patternData: Record<number, Array<{ note: string; inst: string; fx1: string; fx2: string }>> = {
  29: [
    { note: '---', inst: '--', fx1: '----', fx2: '----' },
    { note: '---', inst: '25', fx1: 'V  8', fx2: 'M 99' },
    { note: '---', inst: '--', fx1: '----', fx2: '----' },
    { note: '---', inst: '--', fx1: '----', fx2: '----' }
  ],
  30: [
    { note: '---', inst: '--', fx1: '----', fx2: '----' },
    { note: '---', inst: '--', fx1: '----', fx2: '----' },
    { note: '---', inst: '--', fx1: '----', fx2: '----' },
    { note: '---', inst: '--', fx1: '----', fx2: '----' }
  ],
  31: [
    { note: 'C5', inst: '13', fx1: 'R  1', fx2: '----' },
    { note: 'C5', inst: '26', fx1: 'V 29', fx2: 'M-27' },
    { note: '---', inst: '--', fx1: '----', fx2: '----' },
    { note: '---', inst: '--', fx1: '----', fx2: '----' }
  ],
  32: [
    { note: '---', inst: '--', fx1: '----', fx2: '----' },
    { note: '---', inst: '--', fx1: '----', fx2: '----' },
    { note: '---', inst: '--', fx1: '----', fx2: '----' },
    { note: '---', inst: '--', fx1: '----', fx2: '----' }
  ],
  33: [
    { note: 'C5', inst: '09', fx1: '----', fx2: '----' },
    { note: '---', inst: '--', fx1: '----', fx2: '----' },
    { note: 'C5', inst: '18', fx1: '----', fx2: '----' },
    { note: '---', inst: '--', fx1: '----', fx2: '----' }
  ],
  34: [
    { note: '---', inst: '--', fx1: '----', fx2: '----' },
    { note: '---', inst: '--', fx1: '----', fx2: '----' },
    { note: '---', inst: '--', fx1: '----', fx2: '----' },
    { note: '---', inst: '--', fx1: '----', fx2: '----' }
  ],
  35: [
    { note: '---', inst: '--', fx1: '----', fx2: '----' },
    { note: 'C5', inst: '23', fx1: 'V 32', fx2: 'M-24' },
    { note: '---', inst: '--', fx1: '----', fx2: '----' },
    { note: '---', inst: '--', fx1: '----', fx2: '----' }
  ],
  36: [
    { note: 'C5', inst: '08', fx1: '----', fx2: '----' },
    { note: '---', inst: '--', fx1: '----', fx2: '----' },
    { note: 'C5', inst: '18', fx1: '----', fx2: 'p  9' },
    { note: '---', inst: '--', fx1: '----', fx2: '----' }
  ],
  37: [
    { note: '---', inst: '--', fx1: '----', fx2: '----' },
    { note: '---', inst: '--', fx1: '----', fx2: '----' },
    { note: '---', inst: '--', fx1: '----', fx2: '----' },
    { note: '---', inst: '--', fx1: '----', fx2: '----' }
  ],
  38: [
    { note: '---', inst: '--', fx1: '----', fx2: '----' },
    { note: '---', inst: '--', fx1: '----', fx2: '----' },
    { note: '---', inst: '--', fx1: '----', fx2: '----' },
    { note: '---', inst: '--', fx1: '----', fx2: '----' }
  ],
  39: [
    { note: 'C5', inst: '10', fx1: '----', fx2: '----' },
    { note: 'C5', inst: '26', fx1: 'V 34', fx2: 'M-21' },
    { note: 'C5', inst: '18', fx1: 'm  2', fx2: '----' },
    { note: '---', inst: '--', fx1: '----', fx2: '----' }
  ],
  40: [
    { note: '---', inst: '--', fx1: '----', fx2: '----' },
    { note: '---', inst: '--', fx1: '----', fx2: '----' },
    { note: 'FAD', inst: '--', fx1: '----', fx2: '----' },
    { note: '---', inst: '--', fx1: '----', fx2: '----' }
  ],
  41: [
    { note: 'C5', inst: '11', fx1: '----', fx2: '----' },
    { note: '---', inst: '--', fx1: '----', fx2: '----' },
    { note: '---', inst: '--', fx1: '----', fx2: '----' },
    { note: '---', inst: '--', fx1: '----', fx2: '----' }
  ],
  42: [
    { note: '---', inst: '--', fx1: '----', fx2: '----' },
    { note: '---', inst: '--', fx1: '----', fx2: '----' },
    { note: '---', inst: '--', fx1: '----', fx2: '----' },
    { note: '---', inst: '--', fx1: '----', fx2: '----' }
  ],
  43: [
    { note: '---', inst: '--', fx1: '----', fx2: '----' },
    { note: 'C5', inst: '23', fx1: 'V 34', fx2: 'M-18' },
    { note: '---', inst: '--', fx1: '----', fx2: '----' },
    { note: '---', inst: '--', fx1: '----', fx2: '----' }
  ]
};

function isBeat(step: number): boolean {
  return step === 29 || step === 33 || step === 37 || step === 41;
}

function formatNote(str: string): string {
  return str;
}

function formatDash(str: string): string {
  if (str === '---') return '- - -';
  if (str === '--') return '- -';
  if (str === '----') return '- - - -';
  return str;
}

function handleRowClick(tIdx: number, step: number) {
  if (tIdx === 0 && step === activeStep) {
    selectField(isRecMode.value ? 'patternTracker.selection' : 'patternTracker.greenMode', 'patternTracker.selectionText');
  }
}
</script>

<style lang="scss">
.tracker-pattern-view {
  height: 395px;
  width: 800px;
  display: flex;
  position: relative;
  user-select: none;
  overflow: hidden;
  box-sizing: border-box;
}

.pattern-step-col {
  width: 27px;
  display: flex;
  flex-direction: column;
  text-align: center;
  font-size: 13px;
  flex-shrink: 0;
  box-sizing: border-box;

  &.is-left {
    border-right-width: 1px;
    border-right-style: solid;
  }

  &.is-right {
    border-left-width: 1px;
    border-left-style: solid;
  }
}

.step-num-cell {
  height: 26.33px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: inherit;
  position: relative;
  z-index: 9;
}

.pattern-tracks-container {
  width: 746px;
  display: flex;
  position: relative;
  box-sizing: border-box;
}

.pattern-track-col {
  width: 186.5px;
  display: flex;
  flex-direction: column;
  position: relative;
  flex-shrink: 0;
  border-right-width: 1px;
  border-right-style: solid;
  box-sizing: border-box;

  &:last-child {
    border-right: none;
  }
}

.pattern-step-row {
  height: 26.33px;
  display: flex;
  align-items: center;
  padding: 0 6px;
  position: relative;
  font-family: var(--pt-font-mono);
  font-size: 14px;
  box-sizing: border-box;

  &.is-selected-cell {
    border-width: 2px;
    border-style: solid;
    z-index: 10;
  }
}

.track-header-badge {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: inherit;
  font-weight: 700;
  font-size: 14px;
  z-index: 10;
}

.note-cell-active {
  width: 46px;
  margin-left: -6px;
  padding-left: 6px;
  height: 100%;
  display: inline-flex;
  align-items: center;
  font-weight: 700;
}

.note-cell {
  width: 44px;
  display: inline-block;
  font-weight: 500;
  position: relative;
  z-index: 9;

  &.is-invisible {
    visibility: hidden;
  }

  &.is-dim {
    font-size: 11px;
    letter-spacing: -0.05em;
  }
}

.inst-cell {
  width: 32px;
  display: inline-block;
  text-align: center;
  font-weight: 500;
  position: relative;
  z-index: 9;

  &.is-dim {
    font-size: 11px;
    letter-spacing: -0.05em;
  }
}

.fx1-cell {
  width: 50px;
  display: inline-block;
  text-align: center;
  font-weight: 500;
  position: relative;
  z-index: 9;

  &.is-dim {
    font-size: 11px;
    letter-spacing: -0.05em;
  }
}

.fx2-cell {
  width: 50px;
  display: inline-block;
  text-align: right;
  font-weight: 500;
  position: relative;
  z-index: 9;

  &.is-dim {
    font-size: 11px;
    letter-spacing: -0.05em;
  }
}

.pattern-playhead-overlay {
  position: absolute;
  left: 0;
  right: 0;
  top: calc(7 * 26.33px - 11px);
  height: calc(26.33px + 22px);
  pointer-events: none;
  z-index: 8;
  display: flex;
  flex-direction: column;
}

.playhead-gradient-top {
  height: 11px;
  width: 100%;
  pointer-events: auto;
  cursor: pointer;
}

.playhead-center-row {
  height: 26.33px;
  width: 100%;
  pointer-events: none;
}

.playhead-gradient-bottom {
  height: 11px;
  width: 100%;
  pointer-events: auto;
  cursor: pointer;
}

.playhead-dividers {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  pointer-events: none;
}

.playhead-divider {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 1px;
}
</style>
