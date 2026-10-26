<template>
  <div
    id="trackerScreen"
    class="pt-lcd tracker-screen-container"
    :style="{ backgroundColor: theme.background || '#000000' }"
  >
    <TopBar />

    <PatternView v-if="currentScreen === 'pattern'" />
    <SongView v-else-if="currentScreen === 'song'" />
    <SampleLoaderView v-else-if="currentScreen === 'sampleLoader'" />
    <WaveformView v-else-if="currentScreen === 'waveform'" />
    <NotesGridView v-else-if="currentScreen === 'notes'" />
    <ConfigView v-else-if="currentScreen === 'menu'" />

    <InstrumentsPopup v-if="currentScreen === 'pattern' && isInstPopupVisible" />
    <MiniMenuOverlay v-if="isMiniMenuVisible" />

    <BottomButtons v-if="currentScreen !== 'notes'" />
  </div>
</template>

<script setup lang="ts">
import { theme, currentScreen, isInstPopupVisible, isMiniMenuVisible } from '@/stores/themeStore';
import TopBar from './TopBar.vue';
import BottomButtons from './BottomButtons.vue';
import PatternView from '../views/PatternView.vue';
import InstrumentsPopup from '../views/InstrumentsPopup.vue';
import MiniMenuOverlay from '../views/MiniMenuOverlay.vue';
import SongView from '../views/SongView.vue';
import SampleLoaderView from '../views/SampleLoaderView.vue';
import WaveformView from '../views/WaveformView.vue';
import NotesGridView from '../views/NotesGridView.vue';
import ConfigView from '../views/ConfigView.vue';
</script>

<style lang="scss">
.tracker-screen-container {
  width: 800px;
  height: 480px;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  user-select: none;
  box-sizing: border-box;
}
</style>
