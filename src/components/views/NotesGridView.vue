<template>
  <div
    id="view-notes"
    class="tracker-notes-view"
    :style="{ backgroundColor: theme.background || '#000000' }"
  >
    <div id="ui-notes-grid" class="notes-grid-container">
      <template v-for="(octave, rIdx) in octaves" :key="octave">
        <div
          v-for="(note, cIdx) in notes"
          :key="`${note}${octave}`"
          class="note-pad-cell clickable-target"
          :class="{ 'is-active-pad': activeNote === `${note}${octave}` }"
          :style="{
            backgroundColor: theme.popups?.note?.padBackground || '#0c0c0c',
            color: theme.popups?.note?.padText || '#ffffff',
            borderColor: activeNote === `${note}${octave}`
              ? (theme.popups?.note?.selectionFrame || '#c81e1e')
              : '#000000'
          }"
          @click="selectPad(note, octave)"
        >
          {{ note }}{{ octave }}
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { theme, selectField } from '@/stores/themeStore';

const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
const octaves = [5, 4, 3, 2];
const activeNote = ref('C5');

function selectPad(note: string, octave: number) {
  activeNote.value = `${note}${octave}`;
  selectField('popups.note.selectionFrame', 'popups.note.padBackground', 'popups.note.padText');
}
</script>

<style lang="scss">
.tracker-notes-view {
  height: 452px;
  width: 800px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: relative;
  user-select: none;
  box-sizing: border-box;
}

.notes-grid-container {
  width: 776px;
  height: 256px;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: repeat(4, 1fr);
  gap: 2px;
  box-sizing: border-box;
}

.note-pad-cell {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  border-width: 1px;
  border-style: solid;
  transition: all 0.1s ease;
  user-select: none;
  box-sizing: border-box;

  &.is-active-pad {
    border-width: 2px;
    font-weight: 700;
  }
}
</style>
