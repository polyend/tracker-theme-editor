<template>
  <div
    id="view-song"
    class="tracker-song-view"
    :style="{ backgroundColor: theme.songPlayer?.background || '#000000' }"
  >
    <div
      id="ui-song-left-panel"
      class="song-left-panel"
      :style="{ borderColor: theme.patternTracker?.verticalDivider || '#181818' }"
    >
      <div class="song-matrix-container">
        <div
          id="ui-song-trkhdr"
          class="song-track-headers"
          :style="{ color: theme.songPlayer?.text || '#ffffff' }"
        >
          <div
            v-for="(name, hIdx) in trackHeaderNames"
            :key="name"
            class="header-col-wrapper clickable-target"
            :class="{ 'song-header-muted': hIdx === 5 }"
            :style="{
              color: hIdx === 5
                ? (theme.songPlayer?.inactiveText || '#444444')
                : (theme.songPlayer?.text || '#ffffff')
            }"
            @click="selectField(hIdx === 5 ? 'songPlayer.inactiveText' : 'songPlayer.text')"
          >
            <span class="vertical-track-label">{{ name }}</span>
          </div>
        </div>

        <div id="ui-song-matrix" class="song-matrix-grid">
          <div
            v-for="(row, rIdx) in songRows"
            :key="rIdx"
            class="matrix-row"
          >
            <div
              v-for="(isOccupied, cIdx) in row.blocks"
              :key="cIdx"
              class="matrix-block clickable-target"
              :class="isOccupied ? (cIdx === 5 ? 'song-block-muted' : 'song-block-active') : 'song-block-empty'"
              :style="{
                backgroundColor: isOccupied
                  ? (cIdx === 5
                      ? (theme.songPlayer?.mutedBlock || theme.songPlayer?.playhead || '#444344')
                      : (theme.songPlayer?.activeBlock || '#ffffff'))
                  : (theme.songPlayer?.emptyTrack || '#0e0e0e')
              }"
              @click="selectField(isOccupied ? (cIdx === 5 ? 'songPlayer.playhead' : 'songPlayer.activeBlock') : 'songPlayer.emptyTrack')"
            ></div>
          </div>
        </div>
      </div>

      <div id="ui-song-list-container" class="song-slot-container">
        <div
          id="ui-song-pattern-title"
          class="song-pattern-title"
          :style="{ color: theme.songPlayer?.text || '#ffffff' }"
        >
          Pattern
        </div>

        <div id="ui-song-slot-rows" class="song-slot-rows">
          <div
            v-for="(row, rIdx) in songRows"
            :key="rIdx"
            :id="row.active ? 'ui-song-slot-active' : undefined"
            class="slot-num-row clickable-target"
            :class="{ 'is-active-slot': row.active }"
            :style="row.active ? {
              borderColor: theme.songPlayer?.playheadActive || '#32b846',
              color: theme.songPlayer?.text || '#ffffff'
            } : {
              color: theme.songPlayer?.text || '#ffffff'
            }"
            @click="selectField(row.active ? 'songPlayer.playheadActive' : 'songPlayer.text')"
          >
            {{ row.pat }}
          </div>
        </div>

        <div
          id="ui-songScroll-track"
          class="song-scroll-track clickable-target"
          :style="{ backgroundColor: theme.songPlayer?.scrollbarBackground || '#141414' }"
          @click="selectField('songPlayer.scrollbarBackground', 'songPlayer.scrollbar')"
        >
          <div
            id="ui-songScroll-thumb"
            class="song-scroll-thumb"
            :style="{ backgroundColor: theme.songPlayer?.scrollbar || '#666666' }"
          ></div>
        </div>
      </div>
    </div>

    <div
      id="ui-song-tempo-bar"
      class="song-tempo-col clickable-target"
      @click="selectField('bars.active.primary', 'bars.active.background')"
    >
      <div
        id="ui-tempo-track"
        class="tempo-bar-track"
        :style="{ backgroundColor: theme.bars?.active?.background || '#060606' }"
      >
        <div
          id="ui-tempo-gauge"
          class="tempo-bar-fill"
          :style="{ backgroundColor: theme.bars?.active?.primary || '#ffffff' }"
        ></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { theme, selectField } from '@/stores/themeStore';

const trackHeaderNames = [
  'Drums', 'Hats', 'Bass', 'Lead', 'Arp', 'Medusa',
  'Extras', 'Track 8', 'Midi 9', 'Midi 10', 'Midi 11', 'Midi 12'
];

const songRows = [
  { pat: '6',  blocks: [0,0,0,0,1,0,0,0,0,0,0,0] },
  { pat: '7',  blocks: [0,0,0,0,1,1,0,0,0,0,0,0] },
  { pat: '8',  blocks: [0,0,0,0,1,1,0,0,0,0,0,0] },
  { pat: '9',  blocks: [1,1,0,0,1,1,0,0,0,0,0,0] },
  { pat: '10', blocks: [1,1,0,0,1,1,0,0,0,0,0,0] },
  { pat: '11', blocks: [1,1,1,0,1,1,1,1,0,0,0,0] },
  { pat: '1',  blocks: [1,1,1,1,1,1,0,0,0,0,0,0] },
  { pat: '2 My cool pattern',  blocks: [1,1,1,1,1,1,0,0,0,0,0,0], active: true },
  { pat: '12', blocks: [1,1,1,1,1,1,0,0,0,0,0,0] },
  { pat: '13', blocks: [1,1,1,1,1,1,0,0,0,0,0,0] },
  { pat: '15', blocks: [1,1,1,0,1,1,0,0,0,0,0,0] },
  { pat: '16', blocks: [1,1,1,0,1,1,1,0,0,0,0,0] }
];
</script>

<style lang="scss">
.tracker-song-view {
  height: 395px;
  width: 800px;
  display: flex;
  overflow: hidden;
  position: relative;
  user-select: none;
  box-sizing: border-box;
}

.song-left-panel {
  width: 700px;
  height: 100%;
  display: flex;
  border-right-width: 1px;
  border-right-style: solid;
  position: relative;
  box-sizing: border-box;
}

.song-matrix-container {
  width: 484px;
  padding-left: 4px;
  padding-top: 4px;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  box-sizing: border-box;
}

.song-track-headers {
  height: 58px;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  font-size: 12px;
  padding-bottom: 4px;
  box-sizing: border-box;
}

.header-col-wrapper {
  display: flex;
  align-items: flex-end;
  justify-content: center;
}

.vertical-track-label {
  writing-mode: vertical-rl;
  transform: rotate(180deg);
  white-space: nowrap;
}

.song-matrix-grid {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-bottom: 6px;
  box-sizing: border-box;
}

.matrix-row {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 2px;
  height: 25px;
}

.matrix-block {
  height: 100%;
  width: 100%;
  border-radius: 1px;
}

.song-slot-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding-top: 4px;
  padding-right: 8px;
  position: relative;
  box-sizing: border-box;
}

.song-pattern-title {
  height: 58px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  padding-right: 16px;
  font-weight: 700;
}

.song-slot-rows {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-bottom: 6px;
  font-size: 13px;
  box-sizing: border-box;
}

.slot-num-row {
  height: 25px;
  padding-left: 28px;
  display: flex;
  align-items: center;

  &.is-active-slot {
    height: 26px;
    margin: 0 4px;
    padding-left: 24px;
    border-width: 2px;
    border-style: solid;
    font-weight: 700;
  }
}

.song-scroll-track {
  position: absolute;
  right: 5px;
  top: 62px;
  bottom: 8px;
  width: 4px;
}

.song-scroll-thumb {
  height: 180px;
  margin-top: 44px;
  width: 100%;
}

.song-tempo-col {
  width: 100px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px;
  flex-shrink: 0;
  box-sizing: border-box;
}

.tempo-bar-track {
  width: 78px;
  height: 370px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  position: relative;
  box-sizing: border-box;
}

.tempo-bar-fill {
  width: 100%;
  height: 17%;
}
</style>
