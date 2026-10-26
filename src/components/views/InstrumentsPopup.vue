<template>
  <div
    id="ui-instruments-popup"
    class="instruments-popup-overlay"
    :style="{
      backgroundColor: theme.popups?.stepList?.background || '#080808',
      borderLeftColor: theme.popups?.stepList?.frameNormal || '#1c1c1c'
    }"
    @click.stop
  >
    <div
      id="ui-popup-inst-list"
      class="popup-inst-list clickable-target"
      @click="selectField('popups.stepList.textNormal', 'popups.stepList.background')"
    >
      <div
        v-for="item in items"
        :key="item.id"
      >
        <div
          v-if="item.id === 8"
          id="ui-popup-inst-item8"
          class="popup-item-selected clickable-target"
          :style="{
            borderColor: theme.popups?.stepList?.frameSelect || '#ffffff',
            color: theme.popups?.stepList?.textSelect || '#ffffff'
          }"
          @click.stop="selectField('popups.stepList.frameSelect', 'popups.stepList.textSelect')"
        >
          <span>{{ item.id }}. {{ item.name }}</span>
        </div>

        <div
          v-else
          class="popup-item-normal"
          :style="{ color: theme.popups?.stepList?.textNormal || '#ffffff' }"
        >
          {{ item.id }}. {{ item.name }}
        </div>
      </div>

      <div
        id="ui-popup-inst-track"
        class="popup-scrollbar-track clickable-target"
        :style="{ backgroundColor: theme.popups?.stepList?.scrollbarTrack || '#000000' }"
        @click.stop="selectField('popups.stepList.scrollbar', 'popups.stepList.scrollbarTrack')"
      >
        <div
          id="ui-popup-inst-thumb"
          class="popup-scrollbar-thumb"
          :style="{ backgroundColor: theme.popups?.stepList?.scrollbar || '#444444' }"
        ></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { theme, selectField } from '@/stores/themeStore';

const items = [
  { id: 1, name: 'kick-monowave' },
  { id: 2, name: 'snare-monowave' },
  { id: 3, name: 'hat-monowave' },
  { id: 4, name: 'monowave' },
  { id: 5, name: 'monowave' },
  { id: 6, name: 'monowave' },
  { id: 7, name: 'monowave' },
  { id: 8, name: 'tpl_ik_kick_19' },
  { id: 9, name: 'tpl_ik_kick_20' },
  { id: 10, name: 'tpl_ik_kick_21' },
  { id: 11, name: 'tpl_ik_snare-acst' },
  { id: 12, name: 'tpl_ik_snare-acst' },
  { id: 13, name: 'tpl_ik_snare-acst' },
  { id: 14, name: 'tpl_ik_snare-roll' }
];
</script>

<style lang="scss">
.instruments-popup-overlay {
  position: absolute;
  right: 0;
  top: 28px;
  width: 199px;
  height: 452px;
  border-left-width: 1px;
  border-left-style: solid;
  display: flex;
  flex-direction: column;
  z-index: 30;
  user-select: none;
  box-sizing: border-box;
}

.popup-inst-list {
  flex: 1;
  padding: 4px 8px 4px 12px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-size: 13px;
  position: relative;
  box-sizing: border-box;
}

.popup-item-normal {
  height: 25px;
  padding: 0 6px;
  display: flex;
  align-items: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.popup-item-selected {
  height: 26px;
  margin: 0 -4px;
  padding: 0 8px;
  border-width: 2px;
  border-style: solid;
  display: flex;
  align-items: center;
  font-weight: 700;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.popup-scrollbar-track {
  position: absolute;
  right: 2px;
  top: 8px;
  bottom: 64px;
  width: 3px;
}

.popup-scrollbar-thumb {
  width: 100%;
  height: 96px;
}
</style>
