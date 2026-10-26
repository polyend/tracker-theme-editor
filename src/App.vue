<template>
  <div class="app-layout">
    <AppHeader @open-font-editor="isFontEditorOpen = true" />

    <div class="app-workspace">
      <aside class="app-sidebar-container">
        <SidebarControls />
      </aside>

      <main class="app-viewport-container">
        <div class="viewport-content-wrapper">
          <div class="screen-tabs-bar">
            <div class="tabs-group">
              <button
                v-for="tab in screenTabs"
                :key="tab.id"
                type="button"
                class="tab-btn"
                :class="{ 'is-active': currentScreen === tab.id }"
                @click="switchScreen(tab.id)"
              >
                {{ tab.label }}
              </button>
            </div>

            <div class="pattern-subcontrols" :class="{ visible: currentScreen === 'pattern' }">
              <button
                type="button"
                class="pattern-popup-btn"
                :class="{ 'is-active': isRecMode }"
                title="Toggle between Normal Edit Mode (Green) and Record Mode (Red)"
                @click="toggleRecMode"
              >
                <span class="mode-label">Toggle Record</span>
              </button>

              <button
                type="button"
                class="pattern-popup-btn"
                :class="{ 'is-active': isInstPopupVisible }"
                title="Toggle Instruments Popup overlay"
                @click="toggleInstPopup"
              >
                <span>Toggle Instruments</span>
              </button>

              <button
                type="button"
                class="pattern-popup-btn"
                :class="{ 'is-active': isPlayheadVisible }"
                title="Toggle Playback playhead line overlay"
                @click="togglePlayhead"
              >
                <span>Toggle Playback</span>
              </button>

              <button
                type="button"
                class="pattern-popup-btn"
                :class="{ 'is-active': isMiniMenuVisible }"
                title="Toggle Tracker Mini Menu overlay (Hold Menu button)"
                @click="toggleMiniMenu"
              >
                <span>Toggle Mini Menu</span>
              </button>
            </div>
          </div>

          <div class="screen-bezel-wrapper">
            <TrackerBezel>
              <TrackerScreen />
            </TrackerBezel>
          </div>
        </div>
      </main>
    </div>

    <FontEditorModal
      :is-open="isFontEditorOpen"
      @close="isFontEditorOpen = false"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import {
  currentScreen,
  switchScreen,
  isRecMode,
  isInstPopupVisible,
  isMiniMenuVisible,
  isPlayheadVisible,
  toggleRecMode,
  toggleInstPopup,
  toggleMiniMenu,
  togglePlayhead
} from './stores/themeStore';
import type { ScreenId } from './types/theme';
import AppHeader from './components/layout/AppHeader.vue';
import SidebarControls from './components/sidebar/SidebarControls.vue';
import TrackerBezel from './components/screen/TrackerBezel.vue';
import TrackerScreen from './components/screen/TrackerScreen.vue';
import FontEditorModal from './components/modal/FontEditorModal.vue';

const isFontEditorOpen = ref(false);

const screenTabs: Array<{ id: ScreenId; label: string }> = [
  { id: 'pattern', label: 'Pattern' },
  { id: 'song', label: 'Song' },
  { id: 'sampleLoader', label: 'Sample Loader' },
  { id: 'waveform', label: 'Sample Editor' },
  { id: 'notes', label: 'Notes Grid' },
  { id: 'menu', label: 'Config' }
];
</script>

<style lang="scss">
.app-layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  background-color: #0b0c10;
  color: #e5e7eb;
}

.app-workspace {
  display: flex;
  flex: 1;
  overflow: hidden;
}

.app-sidebar-container {
  width: 380px;
  flex-shrink: 0;
  height: 100%;
  border-right: 1px solid #222;
  background-color: #0d1017;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.app-viewport-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 12px;
  background-color: #111;
  overflow: hidden;
  min-height: 0;
  position: relative;
}

.viewport-content-wrapper {
  width: 100%;
  max-width: 860px;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
  align-items: center;
  min-height: 0;
}

.screen-tabs-bar {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
  margin-bottom: 6px;
}

.tabs-group {
  display: flex;
  align-items: center;
  gap: 4px;
  background-color: #222;
  padding: 4px;
  border-radius: 8px;
  border: 1px solid #333;
}

.pattern-subcontrols {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  visibility: hidden;

  &.visible {
    visibility: visible;
  }
}


.pattern-popup-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 10px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s ease;
  background: #222;
  border: none;
  color: #9ca3af;

  &:hover {
    color: #ffffff;
  }

  &.is-active {
    background-color: #484848;
    color: #ffffff;
    font-weight: 600;
  }

  &:hover {
    border-color: #3e465e;
  }
}

.tab-btn {
  padding: 4px 10px;
  font-size: 12px;
  font-weight: 500;
  border-radius: 6px;
  background: transparent;
  border: none;
  color: #9ca3af;
  cursor: pointer;
  transition: all 0.15s ease;

  &:hover {
    color: #ffffff;
  }

  &.is-active {
    background-color: #484848;
    color: #ffffff;
    font-weight: 600;
  }
}

.screen-bezel-wrapper {
  position: relative;
  width: 100%;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  max-height: calc(100vh - 210px);
  top: -40px;
}
</style>
