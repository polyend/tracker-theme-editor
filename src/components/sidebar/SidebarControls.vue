<script setup lang="ts">
import { computed, ref } from 'vue';
import { theme } from '@/stores/themeStore';
import { COLOR_DEFINITIONS, SECTIONS } from '@/utils/colorDefinitions';
import SidebarSection from './SidebarSection.vue';
import ColorFieldRow from './ColorFieldRow.vue';

const searchQuery = ref('');

const filteredDefinitions = computed(() => {
  if (!searchQuery.value.trim()) return COLOR_DEFINITIONS;
  const q = searchQuery.value.toLowerCase();
  return COLOR_DEFINITIONS.filter(d =>
    d.id.toLowerCase().includes(q) ||
    d.label.toLowerCase().includes(q) ||
    d.desc.toLowerCase().includes(q)
  );
});

function getDefsForSection(secId: string) {
  return filteredDefinitions.value.filter(d => d.section === secId);
}

</script>

<template>
  <aside class="sidebar">
    <div class="sidebar__profile">
      <div class="sidebar__profile-header">
        <span class="sidebar__profile-title">Theme Profile</span>
      </div>
      <div class="sidebar__profile-grid">
        <div class="sidebar__field">
          <label class="sidebar__label">Name</label>
          <input
            type="text"
            v-model="theme.name"
            class="sidebar__input"
          />
        </div>
        <div class="sidebar__field">
          <label class="sidebar__label">Base Fallback</label>
          <select v-model="theme.base" class="sidebar__select">
            <option value="Original">Original</option>
            <option value="Monochrome">Monochrome</option>
            <option value="Anniversary">Anniversary</option>
          </select>
        </div>
      </div>
    </div>

    <div class="sidebar__search">
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Filter colors by name, id..."
        class="sidebar__search-input"
      />
    </div>

    <div class="sidebar__scrollable">
      <template v-for="sec in SECTIONS" :key="sec.id">
        <SidebarSection
          v-if="getDefsForSection(sec.id).length > 0"
          :id="sec.id"
          :label="sec.label"
          :force-open="!!searchQuery.trim()"
        >
          <ColorFieldRow
            v-for="def in getDefsForSection(sec.id)"
            :key="def.id"
            :def="def"
          />
        </SidebarSection>
      </template>
    </div>
  </aside>
</template>

<style lang="scss">
.sidebar {
  width: 380px;
  background-color: #191919;
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  user-select: none;

  &__profile {
    padding: 12px 14px;
    border-bottom: 1px solid #000;
    display: flex;
    flex-direction: column;
    gap: 8px;
    flex-shrink: 0;

    &-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    &-title {
      font-size: 11px;
      font-weight: 700;
      color: #9ca3af;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    &-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 8px;
    }
  }

  &__badge {
    font-size: 11px;
    color: #00ffff;
    font-family: 'JetBrains Mono', monospace;
  }

  &__field {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  &__label {
    font-size: 11px;
    color: #9ca3af;
  }

  &__input, &__select {
    width: 100%;
    background-color: #151515;
    border: 1px solid #333333;
    border-radius: 3px;
    padding: 6px 8px;
    min-height: 30px;
    font-size: 12px;
    color: #ffffff;
    outline: none;

    &:focus {
      border-color: #777;
    }
  }

  &__search {
    padding: 8px 12px;
    border-bottom: 1px solid #000;

    &-input {
      width: 100%;
      background-color: #151515;
      border: 1px solid #333333;
      border-radius: 4px;
      padding: 8px 8px;
      min-height: 30px;
      font-size: 11px;
      color: #fff;
      outline: none;

      &::placeholder {
        color: #aaaa;
      }

      &:focus {
        border-color: #777;
      }
    }
  }

  &__scrollable {
    flex: 1;
    overflow-y: auto;
    padding: 10px;
  }
}
</style>
