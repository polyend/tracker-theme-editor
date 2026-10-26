import { reactive, ref } from 'vue';
import type { Theme, ScreenId, PresetManifestItem } from '@/types/theme';
import { getFieldPreviewTarget } from '@/utils/colorDefinitions';

export const currentScreen = ref<ScreenId>('pattern');
export const isRecMode = ref(false);
export const isInstPopupVisible = ref(false);
export const isMiniMenuVisible = ref(false);
export const isPlayheadVisible = ref(false);
export const selectedPath = ref('patternTracker.note');
export const currentPresetId = ref('Original');
export const presetManifest = ref<PresetManifestItem[]>([]);
export const theme = reactive<Theme>({});
export const openSections = reactive<Set<string>>(new Set());
export const blinkingSelector = ref<string | null>(null);

let blinkTimer: any = null;

export function getThemeVal(path: string): string | undefined {
  const parts = path.split('.');
  let cur: any = theme;
  for (const p of parts) {
    if (!cur) return undefined;
    cur = cur[p];
  }
  return typeof cur === 'string' ? cur : undefined;
}

export function setThemeVal(path: string, val: string) {
  const parts = path.split('.');
  let cur: any = theme;
  for (let i = 0; i < parts.length - 1; i++) {
    if (!cur[parts[i]]) cur[parts[i]] = {};
    cur = cur[parts[i]];
  }
  cur[parts[parts.length - 1]] = val;
}

export async function initStore() {
  try {
    const res = await fetch(`${import.meta.env.BASE_URL}presets/index.json`);
    if (res.ok) {
      presetManifest.value = await res.json();
    }
  } catch (e) {
    console.warn('Could not load preset manifest, using defaults', e);
  }

  await loadPreset('Original');
}

export async function loadPreset(presetId: string) {
  currentPresetId.value = presetId;
  const item = presetManifest.value.find(p => p.id === presetId);
  const fileName = item ? item.file : `${presetId}.json`;
  try {
    const res = await fetch(`${import.meta.env.BASE_URL}presets/${fileName}`);
    if (res.ok) {
      const data = await res.json();
      Object.keys(theme).forEach(k => delete (theme as any)[k]);
      Object.assign(theme, data);
    }
  } catch (e) {
    console.error('Failed to load preset', presetId, e);
  }
}

export function switchScreen(screen: ScreenId) {
  currentScreen.value = screen;
}

export function toggleRecMode() {
  isRecMode.value = !isRecMode.value;
}

export function toggleInstPopup() {
  if (currentScreen.value !== 'pattern') {
    isInstPopupVisible.value = true;
    currentScreen.value = 'pattern';
  } else {
    isInstPopupVisible.value = !isInstPopupVisible.value;
  }
}

export function toggleMiniMenu() {
  isMiniMenuVisible.value = !isMiniMenuVisible.value;
}

export function togglePlayhead() {
  if (currentScreen.value !== 'pattern') {
    isPlayheadVisible.value = true;
    currentScreen.value = 'pattern';
  } else {
    isPlayheadVisible.value = !isPlayheadVisible.value;
  }
}

export function toggleSection(secId: string) {
  if (openSections.has(secId)) {
    openSections.delete(secId);
  } else {
    openSections.add(secId);
  }
}

export function isSectionOpen(secId: string): boolean {
  return openSections.has(secId);
}

export function selectField(...paths: string[]) {
  const path = paths[0];
  if (!path) return;
  selectedPath.value = path;

  // Find the row and auto-expand its section if collapsed
  setTimeout(() => {
    const row = document.getElementById(`ctrl-row-${path.replace(/\./g, '-')}`);
    if (row) {
      const secEl = row.closest('[data-section-id]') as HTMLElement | null;
      if (secEl) {
        const secId = secEl.getAttribute('data-section-id');
        if (secId && !openSections.has(secId)) {
          openSections.add(secId);
        }
      }
      row.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, 20);
}

export function blinkElement(selector: string) {
  if (!selector) return;
  if (blinkTimer) clearTimeout(blinkTimer);
  blinkingSelector.value = selector;

  document.querySelectorAll('.pt-blink').forEach(el => el.classList.remove('pt-blink'));
  const elements = document.querySelectorAll(selector);
  elements.forEach(el => {
    el.classList.remove('pt-blink');
    void (el as HTMLElement).offsetWidth;
    el.classList.add('pt-blink');
  });

  blinkTimer = setTimeout(() => {
    elements.forEach(el => el.classList.remove('pt-blink'));
    blinkingSelector.value = null;
  }, 1300);
}

export function onSidebarItemClicked(fieldId: string) {
  selectField(fieldId);
  const target = getFieldPreviewTarget(fieldId, currentScreen.value);
  if (!target) return;

  if (target.screen && target.screen !== currentScreen.value) {
    switchScreen(target.screen);
  }

  if (target.screen === 'pattern' && target.popup !== undefined && target.popup !== null) {
    isInstPopupVisible.value = target.popup;
  }

  if (fieldId.startsWith('miniMenu.')) {
    isMiniMenuVisible.value = true;
  }

  if (fieldId === 'patternTracker.playhead') {
    isPlayheadVisible.value = true;
  }

  setTimeout(() => {
    if (target.selector) {
      blinkElement(target.selector);
    }
  }, 60);
}
