<template>
  <div v-if="isOpen" class="font-editor-backdrop" @click.self="close">
    <div class="font-editor-dialog">
      <div class="dialog-header">
        <div class="header-info">
          <div>
            <h2 class="dialog-title">
              Font Converter & Preview
            </h2>
            <p class="dialog-subtitle">Convert TTF or OTF fonts into <code>.ptfont</code> packages for your Tracker</p>
          </div>
        </div>

        <button type="button" class="close-btn" @click="close">
          <SVGClose />
        </button>
      </div>

      <div class="dialog-body">
        <div class="dialog-card">
          <div class="card-header">
            <h3 class="card-title">
              Font Files & Package Details
            </h3>
            <span class="card-hint">Supports .ttf and .otf</span>
          </div>

          <div class="upload-dropzones">
            <div class="dropzone" @click="regInputRef?.click()">
              <input
                ref="regInputRef"
                type="file"
                accept=".ttf,.otf"
                class="hidden-file-input"
                @change="onFileSelected($event, false)"
              />
              <span class="dropzone-title">Regular Font File <span class="required-star">*</span></span>
              <span class="dropzone-label">{{ regularFileName || 'Click to browse .ttf/.otf' }}</span>
              <span v-if="regularFileName" class="dropzone-status">Loaded successfully</span>
            </div>

            <div class="dropzone" @click="boldInputRef?.click()">
              <input
                ref="boldInputRef"
                type="file"
                accept=".ttf,.otf"
                class="hidden-file-input"
                @change="onFileSelected($event, true)"
              />
              <span class="dropzone-title">Bold Font File <span class="optional-tag">(Optional)</span></span>
              <span class="dropzone-label">{{ boldFileName || 'Click to browse .ttf/.otf' }}</span>
              <span class="dropzone-hint">{{ boldFileName ? 'Loaded successfully' : 'Regular font used if omitted' }}</span>
            </div>
          </div>

          <div class="package-name-row">
            <label class="package-label">Package Name:</label>
            <div class="package-input-box">
              <input
                v-model="pkgName"
                type="text"
                class="package-input"
                placeholder="CustomFont"
              />
              <span class="package-ext">.ptfont</span>
            </div>
          </div>
        </div>

        <div class="dialog-card">
          <div class="card-header">
            <h3 class="card-title">Hardware Font Sizes</h3>
            <span class="preview-status">{{ hasRegular ? 'Custom Font Loaded' : 'Default System Font' }}</span>
          </div>

          <div class="preview-cards-list">
            <div
              v-for="target in TARGET_FONTS"
              :key="target.id"
              class="preview-card-item"
            >
              <span class="preview-card-desc">
                {{ target.desc }}
              </span>
              <span
                class="preview-card-sample"
                :style="{
                  fontFamily: hasRegular ? (target.isBold && hasBold ? 'PTCustomBold, sans-serif' : 'PTCustomRegular, sans-serif') : 'monospace',
                  fontSize: `${target.size}px`,
                  fontWeight: target.isBold ? '700' : '400'
                }"
              >
                36 C5 08 R 1 | Drums
              </span>
            </div>
          </div>
        </div>
      </div>

      <div class="dialog-footer">
        <div class="footer-left">
          <Button outline large @click="resetFont">
            Reset Font
          </button>
        </div>

        <div class="footer-right">
          <Button outline large @click="close">
            Cancel
          </button>
          <Button secondary large @click="applyFontToPreview">
            Preview
          </button>
          <Button tertiary large @click="downloadPtFont">
            Convert & Download
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { TARGET_FONTS, buildPtFontBinary } from '@/utils/fontCompiler';
import Button from '@/components/layout/Button.vue';
import SVGClose from '@/assets/icon-close.svg?component'

defineProps<{
  isOpen: boolean;
}>();

const emit = defineEmits<{
  (e: 'close'): void;
}>();

const regInputRef = ref<HTMLInputElement | null>(null);
const boldInputRef = ref<HTMLInputElement | null>(null);

const regularFileName = ref('');
const boldFileName = ref('');
const pkgName = ref('CustomFont');
const hasRegular = ref(false);
const hasBold = ref(false);

async function onFileSelected(e: Event, isBold: boolean) {
  const target = e.target as HTMLInputElement;
  const file = target.files?.[0];
  if (!file) return;

  const arrayBuffer = await file.arrayBuffer();
  const faceName = isBold ? 'PTCustomBold' : 'PTCustomRegular';
  const fontFace = new FontFace(faceName, arrayBuffer);
  await fontFace.load();
  document.fonts.add(fontFace);

  if (isBold) {
    boldFileName.value = file.name;
    hasBold.value = true;
  } else {
    regularFileName.value = file.name;
    hasRegular.value = true;
  }
}

function applyFontToPreview() {
  if (!hasRegular.value) {
    alert('Please select a Regular TTF/OTF font first.');
    return;
  }
  const screen = document.getElementById('trackerScreen');
  if (screen) {
    screen.style.fontFamily = `'PTCustomRegular', sans-serif`;
  }
  emit('close');
}

function resetFont() {
  const screen = document.getElementById('trackerScreen');
  if (screen) {
    screen.style.fontFamily = `var(--pt-font-sans)`;
  }
}

function downloadPtFont() {
  if (!hasRegular.value) {
    alert('Please select a Regular TTF/OTF font first.');
    return;
  }
  const binary = buildPtFontBinary(hasRegular.value, hasBold.value);
  const blob = new Blob([binary.buffer as ArrayBuffer], { type: 'application/octet-stream' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${(pkgName.value || 'CustomFont').trim()}.ptfont`;
  a.click();
  URL.revokeObjectURL(url);
}

function close() {
  emit('close');
}
</script>

<style lang="scss">
.font-editor-backdrop {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(8px);
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
}

.font-editor-dialog {
  background-color: #333;
  border: 1px solid #222;
  border-radius: 4px;
  width: 100%;
  max-width: 860px;
  max-height: 92vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.7);
  overflow: hidden;
}

.dialog-header {
  padding: 16px 24px;
  border-bottom: 1px solid #2222;
  background-color: #181818;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-shrink: 0;
}

.header-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.dialog-title {
  font-weight: 700;
  font-size: 16px;
  color: #ffffff;
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0;
}


.dialog-subtitle {
  font-size: 12px;
  color: #9ca3af;
  margin: 2px 0 0 0;
}

.close-btn {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: 6px;
  border-radius: 8px;
  background: transparent;
  border: none;
  color: #9ca3af;
  cursor: pointer;
  transition: all 0.15s ease;

  &:hover {
    color: #ffffff;
    background-color: #333;
  }

  & > svg {
    width: 20px;
    height: 20px;
  }
}

.dialog-body {
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.dialog-card {
  background-color: #222222;
  border-radius: 0;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.card-title {
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #d1d5db;
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0;
}

.step-num {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.3);
  color: #aaa;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: 700;
}

.card-hint {
  font-size: 11px;
  color: #9ca3af;
}

.upload-dropzones {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.dropzone {
  border: 2px dashed #666;
  padding: 16px;
  background-color: #333;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  cursor: pointer;
  transition: all 0.15s ease;

  &:hover {
    border-color: rgba(255, 255, 255, 0.6);
  }
}

.hidden-file-input {
  display: none;
}

.dropzone-title {
  font-size: 12px;
  font-weight: 700;
  color: #e5e7eb;
}

.required-star {
  color: #f87171;
}

.optional-tag {
  color: #888;
  font-weight: 400;
}

.dropzone-label {
  font-size: 11px;
  color: #9ca3af;
  margin-top: 4px;
  word-break: break-all;
}

.dropzone-status {
  font-size: 10px;
  color: #eaeaea;
  font-family: monospace;
  margin-top: 4px;
}

.dropzone-hint {
  font-size: 10px;
  color: #eaeaea;
  font-family: monospace;
  margin-top: 4px;
}

.package-name-row {
  display: flex;
  align-items: center;
  gap: 12px;
  padding-top: 8px;
}

.package-label {
  font-size: 12px;
  font-weight: 700;
  color: #d1d5db;
  flex-shrink: 0;
}

.package-input-box {
  flex: 1;
  display: flex;
  align-items: center;
  background-color: #151515;
  border: 1px solid #333333;
  border-radius: 3px;
  padding: 6px 8px;
  min-height: 30px;
}

.package-input {
  background: transparent;
  border: none;
  font-size: 12px;
  font-family: monospace;
  font-weight: 600;
  color: #ffffff;
  outline: none;
  width: 100%;
}

.package-ext {
  font-size: 12px;
  font-family: monospace;
  color: #aaa;
  flex-shrink: 0;
}

.preview-status {
  font-size: 11px;
  color: #aaa;
  font-family: monospace;
}

.preview-cards-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.preview-card-item {
  padding: 10px 12px;
  background-color: #151515;
  border: 1px solid #333333;
  border-radius: 3px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.preview-card-desc {
  font-size: 12px;
  font-weight: 700;
  color: #ffffff;
}

.preview-card-sample {
  padding: 6px 10px 4px;
  background-color: #000;
  border-radius: 4px;
  color: #fff;
}

.dialog-footer {
  padding: 16px;
  border-bottom: 1px solid #2222;
  background-color: #181818;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-shrink: 0;
}

.footer-left, .footer-right {
  display: flex;
  align-items: center;
  gap: 8px;
}
</style>
