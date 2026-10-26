<script setup lang="ts">
import { computed } from 'vue';
import type { ColorDefinition } from '@/types/theme';
import { getThemeVal, setThemeVal, onSidebarItemClicked, selectedPath } from '@/stores/themeStore';

const props = defineProps<{
  def: ColorDefinition;
}>();

const val = computed(() => getThemeVal(props.def.id) || props.def.default);
const isSelected = computed(() => selectedPath.value === props.def.id);

function onColorInput(e: Event) {
  const target = e.target as HTMLInputElement;
  setThemeVal(props.def.id, target.value);
}

function onHexInput(e: Event) {
  const target = e.target as HTMLInputElement;
  let hex = target.value.trim();
  if (!hex.startsWith('#')) hex = '#' + hex;
  if (/^#[0-9A-Fa-f]{6}$/.test(hex)) {
    setThemeVal(props.def.id, hex);
  }
}
</script>

<template>
  <div
    :id="`ctrl-row-${def.id.replace(/\./g, '-')}`"
    class="ctrl-row"
    :class="{ 'ctrl-row--selected': isSelected }"
    @click="onSidebarItemClicked(def.id)"
  >
    <div class="ctrl-row__info">
      <div class="ctrl-row__label">{{ def.label }}</div>
      <div class="ctrl-row__desc">{{ def.desc }}</div>
    </div>
    <div class="ctrl-row__inputs" @click.stop>
      <input
        type="color"
        :value="val"
        class="ctrl-row__picker"
        @focus="onSidebarItemClicked(def.id)"
        @input="onColorInput"
        @change="onColorInput"
      />
      <input
        type="text"
        :value="val.toUpperCase()"
        maxlength="7"
        class="ctrl-row__hex"
        @focus="onSidebarItemClicked(def.id)"
        @input="onHexInput"
        @change="onHexInput"
      />
    </div>
  </div>
</template>

<style lang="scss">
.ctrl-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 6px 8px;
  border-radius: 2px;
  cursor: pointer;
  transition: background-color 0.1s ease, border-color 0.1s ease;
  border: 1px solid transparent;

  &:hover {
    background-color: rgba(255, 255, 255, 0.05)
  }

  &--selected {
    background-color: rgba(255, 255, 255, 0.05) !important;
    border-color: rgba(255, 255, 255, 0.4) !important;
  }

  &__info {
    flex: 1;
    padding-right: 8px;
    min-width: 0;
  }

  &__label {
    font-size: 12px;
    font-weight: 500;
    color: #e5e7eb;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &__desc {
    font-size: 10px;
    color: #9ca3af;
    line-height: 1.2;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &__inputs {
    display: flex;
    align-items: center;
    gap: 6px;
    flex-shrink: 0;
  }

  &__picker {
    appearance: none;
    -webkit-appearance: none;
    width: 16px;
    height: 16px;
    border: none;
    border-radius: 16px;
    cursor: pointer;
    padding: 0;
    background: transparent;

    &::-webkit-color-swatch-wrapper {
      padding: 0;
    }
    &::-webkit-color-swatch {
      border: 1px solid rgba(255, 255, 255, 0.25);
      border-radius: 16px;
    }
  }

  &__hex {
    width: 62px;
    background-color: #151515;
    border: 1px solid #333333;
    border-radius: 4px;
    padding: 2px 6px;
    font-size: 11px;
    font-family: 'JetBrains Mono', monospace;
    color: #fff;
    text-transform: uppercase;
    outline: none;

    &:focus {
      border-color: #666;
    }
  }
}
</style>
