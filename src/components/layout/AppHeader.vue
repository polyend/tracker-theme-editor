<script setup lang="ts">
import { ref } from 'vue';
import { theme, currentPresetId, presetManifest, loadPreset } from '@/stores/themeStore';
import Button from '@/components/layout/Button.vue';

import SVGLogo from '@/assets/polyend-logo.svg?component';
import SVGFont from '@/assets/icon-font.svg?component';
import SVGImport from '@/assets/icon-import.svg?component';
import SVGExport from '@/assets/icon-export.svg?component';
import SVGClipboard from '@/assets/icon-copy.svg?component';

const emit = defineEmits<{
  (e: 'openFontEditor'): void;
}>();

const fileInput = ref<HTMLInputElement | null>(null);

function triggerFileInput() {
  fileInput.value?.click();
}

function handleFileImport(e: Event) {
  const target = e.target as HTMLInputElement;
  const file = target.files?.[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (evt) => {
    try {
      const parsed = JSON.parse(evt.target?.result as string);
      Object.keys(theme).forEach(k => delete (theme as any)[k]);
      Object.assign(theme, parsed);
      alert(`Imported theme: "${theme.name || file.name}"`);
    } catch (err) {
      alert('Error parsing theme JSON file: ' + err);
    }
  };
  reader.readAsText(file);
}

function exportJson() {
  const name = (theme.name || 'CustomTheme').trim().replace(/[^a-zA-Z0-9_\-]/g, '_');
  const jsonStr = JSON.stringify(theme, null, 2);
  const blob = new Blob([jsonStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${name}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

async function copyJson() {
  try {
    await navigator.clipboard.writeText(JSON.stringify(theme, null, 2));
    alert('Theme JSON copied to clipboard!');
  } catch (err) {
    alert('Could not copy to clipboard: ' + err);
  }
}
</script>

<template>
  <header class="app-header">
    <div class="app-header__branding">
      <div>
        <h1 class="app-header__title">
          <SVGLogo />
          <span>Tracker Themes</span>
        </h1>
      </div>
    </div>

    <div class="app-header__actions">
      <div class="app-header__preset-box">
        <span class="app-header__preset-label">Preset:</span>
        <select
          :value="currentPresetId"
          @change="loadPreset(($event.target as HTMLSelectElement).value)"
          class="app-header__preset-select"
        >
          <option
            v-for="p in presetManifest"
            :key="p.id"
            :value="p.id"
          >
            {{ p.name }}
          </option>
        </select>
      </div>

      <Button primary @click="emit('openFontEditor')">
        <SVGFont /><span>Font Editor</span>
      </Button>
      <Button secondary @click="triggerFileInput">
        <SVGImport /><span>Import Theme</span>
      </Button>
      <Button tertiary @click="exportJson">
        <SVGExport /><span>Export Theme</span>
      </Button>
      <Button quaternary @click="copyJson">
        <SVGClipboard /><span>Copy Theme</span>
      </Button>
      <input type="file" ref="fileInput" accept=".json" class="hidden-input" @change="handleFileImport" />
    </div>
  </header>
</template>

<style lang="scss">
.app-header {
  background-color: #222222;
  border-bottom: 1px solid #333333;
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-shrink: 0;
  user-select: none;

  &__branding {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  &__title {
    font-size: 14px;
    font-weight: 700;
    letter-spacing: 0.02em;
    align-items: flex-end;
    color: #ffffff;
    display: flex;
    gap: 10px;
    white-space: nowrap;

    & > span  {
      position: relative;
      font-size: 28.6px;
      font-weight: 500;
    }

    & > svg {
      width: auto;
      height: 32px;
    }
  }

  &__subtitle {
    font-size: 11px;
    color: #9ca3af;
  }

  &__actions {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  &__preset-box {
    display: flex;
    align-items: center;
    background-color: #151515;
    border: 1px solid #333333;
    border-radius: 6px;
    padding: 6px 10px;
  }

  &__preset-label {
    font-size: 12px;
    color: #9ca3af;
    margin-right: 8px;
    font-weight: 500;
  }

  &__preset-select {
    background: transparent;
    border: none;
    font-size: 12px;
    color: #fff;
    font-weight: 600;
    outline: none;
    cursor: pointer;

    option {
      background-color: #151515;
      color: #ffffff;
    }
  }
}

.hidden-input {
  display: none;
}
</style>
