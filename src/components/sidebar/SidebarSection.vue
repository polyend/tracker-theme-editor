<script setup lang="ts">
import { computed } from 'vue';
import { isSectionOpen, toggleSection } from '@/stores/themeStore';
import SVGChevron from '@/assets/icon-chevron.svg?component';

const props = defineProps<{
  id: string;
  label: string;
  forceOpen?: boolean;
}>();

const isOpen = computed(() => props.forceOpen || isSectionOpen(props.id));
</script>

<template>
  <div class="sidebar-section" :data-section-id="id">
    <button class="sidebar-section__header" @click="toggleSection(id)">
      <SVGChevron :class="{ open: isOpen }"/>
      <span class="sidebar-section__title">
        {{ label }}
      </span>
    </button>
    <div v-show="isOpen" class="sidebar-section__body">
      <slot></slot>
    </div>
  </div>
</template>

<style lang="scss">
.sidebar-section {
  border-radius: 3px;
  background-color: #262626;
  border: 1px solid #2a2a2a;
  overflow: hidden;
  margin-bottom: 8px;

  &__header {
    width: 100%;
    padding: 8px 8px 6px;
    font-size: 12px;
    font-weight: 700;
    color: #d1d5db;
    background-color: #2f2f2f;
    border: none;
    border-bottom: 1px solid #333;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 4px;
    text-align: left;
    cursor: pointer;
    transition: background-color 0.15s ease;

    &:hover {
      background-color: #313131;
      color: #ffffff;
    }

    & > svg {
      position: relative;
      top: -1px;
      width: 14px;
      height: 14px;

      &.open {
        transform: rotate(90deg);
      }
    }
  }

  &__title {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  &__arrow {
    font-size: 10px;
    color: #6b7280;
  }

  &__body {
    padding: 8px;
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
}
</style>
