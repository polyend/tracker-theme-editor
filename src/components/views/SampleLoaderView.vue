<template>
  <div
    id="view-sampleLoader"
    class="tracker-sample-loader-view"
    :style="{ backgroundColor: theme.background || '#000000' }"
  >
    <div
      id="ui-loader-col1"
      class="loader-col-sd clickable-target"
      :style="{
        borderColor: theme.frames?.active || '#c81e1e',
        backgroundColor: theme.lists?.sampleLoader?.background || '#050505'
      }"
      @click="selectField('frames.active', 'lists.sampleLoader.frameSelect')"
    >
      <div
        id="ui-loader-hdr1"
        class="loader-col-header clickable-target"
        :style="{
          borderBottomColor: theme.frames?.inactive || '#1c1c1c',
          color: theme.lists?.sampleLoader?.textNormal || '#ffffff'
        }"
        @click.stop="selectField('lists.sampleLoader.textNormal')"
      >
        SD Card
      </div>

      <div id="ui-loader-sd-list" class="loader-list-body">
        <div
          v-for="folder in sdFolders"
          :key="folder"
        >
          <div
            v-if="folder === '/My-awesome-folder'"
            id="ui-loader-folder-act"
            class="loader-item-selected clickable-target"
            :style="{
              borderColor: theme.lists?.sampleLoader?.frameSelect || theme.frames?.active || '#c81e1e',
              color: theme.lists?.sampleLoader?.textSelect || '#ffffff'
            }"
            @click.stop="selectField('lists.sampleLoader.frameSelect', 'lists.sampleLoader.textSelect')"
          >
            {{ folder }}
          </div>

          <div
            v-else
            class="loader-item-normal clickable-target"
            :style="{ color: theme.lists?.sampleLoader?.textNormal || '#ffffff' }"
            @click.stop="selectField('lists.sampleLoader.textNormal')"
          >
            {{ folder }}
          </div>
        </div>

        <div
          id="ui-loader-sd-scroll"
          class="loader-scroll-thumb"
          :style="{ backgroundColor: theme.lists?.sampleLoader?.scrollbar || '#444444' }"
        ></div>
      </div>
    </div>

    <div
      id="ui-loader-col2"
      class="loader-col-inst clickable-target"
      :style="{
        borderColor: theme.frames?.inactive || '#1c1c1c',
        backgroundColor: theme.lists?.sampleLoaderInactive?.background || '#050505'
      }"
      @click="selectField('frames.inactive', 'lists.sampleLoaderInactive.frameSelect')"
    >
      <div
        id="ui-loader-hdr2"
        class="loader-col-header clickable-target"
        :style="{
          borderBottomColor: theme.frames?.inactive || '#1c1c1c',
          color: theme.lists?.sampleLoaderInactive?.textNormal || '#ffffff'
        }"
        @click.stop="selectField('lists.sampleLoaderInactive.textNormal')"
      >
        Instruments
      </div>

      <div id="ui-loader-inst-list" class="loader-list-body">
        <div
          v-for="inst in instPool"
          :key="inst.id"
        >
          <div
            v-if="inst.id === 8"
            id="ui-loader-inst-act"
            class="loader-item-selected clickable-target"
            :style="{
              borderColor: theme.lists?.sampleLoaderInactive?.frameSelect || '#ffffff',
              color: theme.lists?.sampleLoaderInactive?.textSelect || '#ffffff'
            }"
            @click.stop="selectField('lists.sampleLoaderInactive.frameSelect', 'lists.sampleLoaderInactive.textSelect')"
          >
            {{ inst.id }}.{{ inst.name }}
          </div>

          <div
            v-else
            class="loader-item-normal clickable-target"
            :style="{ color: theme.lists?.sampleLoaderInactive?.textNormal || '#ffffff' }"
            @click.stop="selectField('lists.sampleLoaderInactive.textNormal')"
          >
            {{ inst.id }}.{{ inst.name }}
          </div>
        </div>

        <div
          id="ui-loader-inst-scroll"
          class="loader-scroll-thumb is-inst"
          :style="{ backgroundColor: theme.lists?.sampleLoaderInactive?.scrollbar || '#444444' }"
        ></div>
      </div>
    </div>

    <div
      id="ui-loader-col3"
      class="loader-gauge-col is-vol clickable-target"
      :style="{ borderColor: theme.frames?.inactive || '#1c1c1c' }"
      @click="selectField('bars.active.primary', 'bars.active.background')"
    >
      <div
        id="ui-loader-vol-track"
        class="loader-gauge-track"
        :style="{ backgroundColor: theme.bars?.active?.background || '#060606' }"
      >
        <div
          id="ui-loader-vol-fill"
          class="loader-gauge-fill"
          style="height: 60%;"
          :style="{ backgroundColor: theme.bars?.active?.primary || '#ffffff' }"
        ></div>
      </div>
    </div>

    <div
      id="ui-loader-col4"
      class="loader-gauge-col is-mem clickable-target"
      @click="selectField('bars.sampleLoaderNormal.primary', 'bars.active.background')"
    >
      <div
        id="ui-loader-mem-track"
        class="loader-gauge-track"
        :style="{ backgroundColor: theme.bars?.sampleLoaderNormal?.background || theme.bars?.active?.background || '#060606' }"
      >
        <div
          id="ui-loader-mem-fill"
          class="loader-gauge-fill"
          style="height: 49%;"
          :style="{ backgroundColor: theme.bars?.sampleLoaderNormal?.primary || theme.bars?.active?.primary || '#ffffff' }"
        ></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { theme, selectField } from '@/stores/themeStore';

const sdFolders = [
  '/My-awesome-folder', '/Export', '/Firmware', '/Fonts', '/Games',
  '/Instruments', '/Manual', '/Mod', '/Projects', '/Recordings',
  '/Samples', '/Snapshots', '/Themes'
];

const instPool = [
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
  { id: 11, name: 'tpl_ik_snare-acstc_66' },
  { id: 12, name: 'tpl_ik_snare-acstc_67' },
  { id: 13, name: 'tpl_ik_snare-acstc_68' }
];
</script>

<style lang="scss">
.tracker-sample-loader-view {
  height: 395px;
  width: 800px;
  display: flex;
  overflow: hidden;
  position: relative;
  user-select: none;
  box-sizing: border-box;
}

.loader-col-sd {
  width: 300px;
  height: 100%;
  border-width: 2px;
  border-style: solid;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  position: relative;
  box-sizing: border-box;
}

.loader-col-inst {
  width: 300px;
  height: 100%;
  border-right-width: 1px;
  border-right-style: solid;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  position: relative;
  box-sizing: border-box;
}

.loader-col-header {
  height: 33px;
  font-size: 15px;
  font-weight: 700;
  border-bottom-width: 1px;
  border-bottom-style: solid;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  box-sizing: border-box;
}

.loader-list-body {
  flex: 1;
  padding: 4px 8px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-size: 13px;
  position: relative;
  box-sizing: border-box;
}

.loader-item-normal {
  height: 25px;
  padding: 0 4px;
  display: flex;
  align-items: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.loader-item-selected {
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

.loader-scroll-thumb {
  position: absolute;
  right: 2px;
  top: 4px;
  bottom: 4px;
  width: 3px;

  &.is-inst {
    bottom: 112px;
  }
}

.loader-gauge-col {
  width: 100px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px;
  flex-shrink: 0;
  box-sizing: border-box;

  &.is-vol {
    border-right-width: 1px;
    border-right-style: solid;
  }
}

.loader-gauge-track {
  width: 76px;
  height: 370px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  position: relative;
  box-sizing: border-box;
}

.loader-gauge-fill {
  width: 100%;
}
</style>
