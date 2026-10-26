export interface TargetFontMetric {
  id: number;
  size: number;
  desc: string;
  isBold: boolean;
  maxWidth: number;
  cellHeight: number;
  stride: number;
  baseline: number;
  firstChar: number;
}

/**
 * Exact FT812 hardware font slot definitions matching cDisplay::fontsData1 / fontsData2
 * in Tracker firmware (core/libs/NewDisplay/display.cpp):
 *  - Handle 1 (controlStyleFont1): 14px Regular (stride 7, 14x20, baseline 16)
 *  - Handle 2 (controlStyleFont2): 17px Regular (stride 8, 16x24, baseline 19)
 *  - Handle 3 (controlStyleFont3): 14px Bold    (stride 7, 14x20, baseline 16)
 *  - Handle 4 (controlStyleFont4): 17px Bold    (stride 9, 18x24, baseline 19, includes 0x18..0x1F hardware icons)
 *  - Handle 5 (controlStyleFont5): 12px Regular (stride 6, 12x17, baseline 13, includes 0x11..0x1F diacritics)
 */
export const TARGET_FONTS: TargetFontMetric[] = [
  { id: 1, size: 14, desc: "Main Lists & Values (Font 1 — 14px Regular)", isBold: false, maxWidth: 14, cellHeight: 20, stride: 7, baseline: 16, firstChar: 32 },
  { id: 2, size: 17, desc: "Large Notes & Popups (Font 2 — 17px Regular)", isBold: false, maxWidth: 16, cellHeight: 24, stride: 8, baseline: 19, firstChar: 32 },
  { id: 3, size: 14, desc: "Buttons & Active Labels (Font 3 — 14px Bold)", isBold: true,  maxWidth: 14, cellHeight: 20, stride: 7, baseline: 16, firstChar: 32 },
  { id: 4, size: 17, desc: "Headers, Transport & Icons (Font 4 — 17px Bold)", isBold: true, maxWidth: 18, cellHeight: 24, stride: 9, baseline: 19, firstChar: 24 },
  { id: 5, size: 12, desc: "Small UI & Descriptions (Font 5 — 12px Regular)", isBold: false, maxWidth: 12, cellHeight: 17, stride: 6, baseline: 13, firstChar: 17 }
];

// Polyend Tracker custom hardware icons at 0x18..0x1F in Font 4 (17px Bold, 18x24 L4, 216 bytes/glyph):
// 0x18:Pause, 0x19:Stop, 0x1A:Play, 0x1B:Rec, 0x1C:Folder, 0x1D:Up-dir, 0x1E:Loop, 0x1F:Arrow
const BOLD17_HARDWARE_ICONS_L4 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 102, 96, 6, 0, 0, 0, 0, 0, 0, 255, 240, 15, 0, 0, 0, 0, 0, 0, 255, 240, 15, 0, 0, 0, 0, 0, 0, 255, 240, 15, 0, 0, 0, 0, 0, 0, 255, 240, 15, 0, 0, 0, 0, 0, 0, 255, 240, 15, 0, 0, 0, 0, 0, 0, 255, 240, 15, 0, 0, 0, 0, 0, 0, 255, 240, 15, 0, 0, 0, 0, 0, 0, 255, 240, 15, 0, 0, 0, 0, 0, 0, 255, 240, 15, 0, 0, 0, 0, 0, 0, 255, 240, 15, 0, 0, 0, 0, 0, 0, 102, 96, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 102, 0, 0, 0, 0, 0, 0, 0, 0, 255, 0, 0, 0, 0, 0, 0, 0, 0, 255, 0, 0, 0, 0, 0, 0, 0, 0, 255, 0, 0, 0, 0, 0, 0, 0, 0, 255, 0, 0, 0, 0, 0, 0, 0, 0, 255, 0, 0, 0, 0, 0, 0, 0, 0, 255, 0, 0, 0, 0, 0, 0, 0, 0, 255, 0, 0, 0, 0, 0, 0, 0, 0, 255, 0, 0, 0, 0, 0, 0, 0, 0, 255, 0, 0, 0, 0, 0, 0, 0, 0, 255, 0, 0, 0, 0, 0, 0, 0, 0, 102, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 96, 0, 0, 0, 0, 0, 0, 0, 0, 253, 16, 0, 0, 0, 0, 0, 0, 0, 255, 253, 16, 0, 0, 0, 0, 0, 0, 255, 255, 250, 0, 0, 0, 0, 0, 0, 255, 255, 255, 0, 0, 0, 0, 0, 0, 255, 255, 255, 0, 0, 0, 0, 0, 0, 255, 255, 255, 0, 0, 0, 0, 0, 0, 255, 255, 255, 0, 0, 0, 0, 0, 0, 255, 255, 250, 0, 0, 0, 0, 0, 0, 255, 253, 16, 0, 0, 0, 0, 0, 0, 253, 16, 0, 0, 0, 0, 0, 0, 0, 96, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 247, 0, 0, 0, 0, 0, 0, 0, 0, 255, 245, 0, 0, 0, 0, 0, 0, 0, 255, 245, 0, 0, 0, 0, 0, 0, 0, 247, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24, 0, 0, 0, 0, 0, 0, 0, 0, 47, 0, 0, 0, 0, 0, 0, 0, 0, 27, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 128, 0, 0, 0, 0, 0, 0, 0, 2, 242, 0, 0, 0, 0, 0, 0, 0, 12, 253, 0, 0, 0, 0, 0, 0, 0, 47, 255, 48, 0, 0, 0, 0, 0, 0, 223, 255, 224, 0, 0, 0, 0, 0, 0, 188, 253, 178, 0, 0, 0, 0, 0, 0, 1, 251, 0, 0, 0, 0, 0, 0, 0, 0, 255, 0, 0, 0, 0, 0, 0, 0, 0, 143, 192, 0, 0, 0, 0, 0, 0, 0, 15, 250, 0, 0, 0, 0, 0, 0, 0, 2, 255, 247, 69, 0, 0, 0, 0, 0, 0, 31, 255, 255, 0, 0, 0, 0, 0, 0, 0, 90, 220, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 48, 0, 0, 0, 0, 0, 0, 0, 0, 255, 64, 0, 0, 0, 0, 0, 0, 0, 255, 248, 0, 0, 0, 0, 0, 0, 0, 6, 255, 80, 0, 0, 0, 0, 0, 0, 0, 79, 240, 0, 0, 0, 0, 0, 0, 0, 10, 246, 0, 0, 0, 0, 0, 0, 0, 2, 252, 0, 0, 0, 0, 0, 0, 0, 0, 255, 0, 0, 0, 0, 0, 0, 0, 0, 239, 0, 0, 0, 0, 0, 0, 0, 0, 255, 0, 0, 0, 0, 0, 0, 0, 0, 253, 0, 0, 0, 0, 0, 0, 0, 8, 248, 0, 0, 0, 0, 0, 0, 0, 15, 240, 0, 0, 0, 0, 0, 0, 1, 255, 144, 0, 0, 0, 0, 0, 0, 175, 253, 0, 0, 0, 0, 0, 0, 0, 255, 160, 0, 0, 0, 0, 0, 0, 0, 129, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 32, 0, 0, 2, 0, 0, 0, 255, 255, 249, 0, 0, 79, 0, 0, 0, 255, 255, 255, 64, 0, 255, 0, 0, 0, 34, 34, 255, 240, 11, 255, 0, 0, 0, 0, 0, 79, 253, 0, 251, 0, 0, 0, 0, 0, 9, 255, 176, 32, 0, 0, 0, 0, 0, 0, 223, 244, 0, 0, 0, 0, 0, 0, 0, 15, 255, 0, 0, 0, 0, 0, 0, 4, 4, 255, 208, 0, 0, 0, 0, 0, 79, 64, 159, 251, 0, 0, 0, 34, 34, 255, 240, 13, 255, 0, 0, 0, 255, 255, 255, 64, 0, 255, 0, 0, 0, 255, 255, 249, 0, 0, 47, 0, 0, 0, 0, 0, 32, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 15, 176, 0, 0, 0, 0, 0, 0, 0, 15, 255, 0, 0, 0, 0, 0, 0, 255, 255, 255, 246, 0, 0, 0, 0, 0, 255, 255, 255, 246, 0, 0, 0, 0, 0, 64, 15, 255, 0, 0, 0, 0, 0, 0, 0, 15, 176, 0, 0, 0, 0, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 15, 176, 0, 0, 0, 0, 0, 0, 64, 15, 255, 0, 0, 0, 0, 0, 0, 255, 255, 255, 246, 0, 0, 0, 0, 0, 255, 255, 255, 246, 0, 0, 0, 0, 0, 0, 15, 255, 0, 0, 0, 0, 0, 0, 0, 15, 176, 0, 0, 0, 0, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);

// Polish diacritic mapping for 0x11..0x1F in Font 5 (12px Regular)
const FONT5_DIACRITIC_MAP: Record<number, string> = {
  0x11: "\u0105", // ą
  0x12: "\u0107", // ć
  0x13: "\u0119", // ę
  0x14: "\u0142", // ł
  0x15: "\u0144", // ń
  0x16: "\u00f3", // ó
  0x17: "\u015b", // ś
  0x18: "\u017a", // ź
  0x19: "\u017c", // ż
  0x1A: "\u0104", // Ą
  0x1B: "\u0106", // Ć
  0x1C: "\u0118", // Ę
  0x1D: "\u0141", // Ł
  0x1E: "\u0143", // Ń
  0x1F: "\u00d3", // Ó
};

export interface RenderedFontBlock {
  target: TargetFontMetric;
  payload: Uint8Array;
  maxWidth: number;
  cellHeight: number;
  stride: number;
  fontFamily: string;
}

export function renderFontBlock(
  target: TargetFontMetric,
  hasRegular: boolean,
  hasBold: boolean
): RenderedFontBlock {
  const useCustomBold = target.isBold && hasBold;
  const fontFamily = hasRegular ? (useCustomBold ? "PTCustomBold" : "PTCustomRegular") : "monospace";
  const fontWeight = target.isBold && !useCustomBold ? "bold " : "";
  const size = target.size;
  const { maxWidth, cellHeight, stride, baseline, firstChar } = target;

  const offscreen = document.createElement("canvas");
  offscreen.width = maxWidth;
  offscreen.height = cellHeight;
  const offCtx = offscreen.getContext("2d", { willReadFrequently: true })!;
  const fontSpec = `${fontWeight}${size}px "${fontFamily}"`;
  offCtx.font = fontSpec;

  const widths = new Uint8Array(128);

  if (target.id === 4) {
    // Hardware icons 0x18..0x1F have fixed 18px cell advance width
    for (let c = 24; c <= 31; c++) {
      widths[c] = 18;
    }
  } else if (target.id === 5) {
    for (let c = 17; c <= 31; c++) {
      const ch = FONT5_DIACRITIC_MAP[c] || " ";
      const w = Math.round(offCtx.measureText(ch).width);
      widths[c] = Math.min(Math.max(w, 1), maxWidth);
    }
  }

  for (let c = 32; c <= 126; c++) {
    const w = Math.round(offCtx.measureText(String.fromCharCode(c)).width);
    widths[c] = Math.min(Math.max(w, 1), maxWidth);
  }

  const metricHeader = new Uint8Array(148);
  metricHeader.set(widths, 0);
  const hv = new DataView(metricHeader.buffer);
  hv.setUint32(128, 2, true);    // Format 2 (L4)
  hv.setUint32(132, stride, true);     // Line stride in bytes
  hv.setUint32(136, maxWidth, true);   // Max width in pixels
  hv.setUint32(140, cellHeight, true); // Height in pixels

  const glyphSize = stride * cellHeight;
  const numGlyphs = 126 - firstChar + 1;
  const bitmapsData = new Uint8Array(numGlyphs * glyphSize);

  let glyphIdx = 0;
  for (let c = firstChar; c <= 126; c++, glyphIdx++) {
    if (target.id === 4 && c >= 24 && c <= 31) {
      const iconOffset = (c - 24) * 216;
      bitmapsData.set(BOLD17_HARDWARE_ICONS_L4.subarray(iconOffset, iconOffset + 216), glyphIdx * glyphSize);
      continue;
    }

    const ch = (target.id === 5 && c < 32) ? (FONT5_DIACRITIC_MAP[c] || " ") : String.fromCharCode(c);
    offCtx.fillStyle = "#000";
    offCtx.fillRect(0, 0, maxWidth, cellHeight);
    offCtx.font = fontSpec;
    offCtx.fillStyle = "#fff";
    offCtx.textBaseline = "alphabetic";
    offCtx.fillText(ch, 0, baseline);
    const img = offCtx.getImageData(0, 0, maxWidth, cellHeight).data;

    let dst = glyphIdx * glyphSize;
    for (let y = 0; y < cellHeight; y++) {
      for (let xb = 0; xb < stride; xb++) {
        const x0 = xb * 2;
        const x1 = x0 + 1;
        const p0 = (x0 < maxWidth) ? (img[(y * maxWidth + x0) * 4] >> 4) : 0;
        const p1 = (x1 < maxWidth) ? (img[(y * maxWidth + x1) * 4] >> 4) : 0;
        bitmapsData[dst++] = ((p0 & 0x0F) << 4) | (p1 & 0x0F);
      }
    }
  }

  const payload = new Uint8Array(148 + bitmapsData.byteLength);
  payload.set(metricHeader, 0);
  payload.set(bitmapsData, 148);

  return { target, payload, maxWidth, cellHeight, stride, fontFamily };
}

export function buildPtFontBinary(hasRegular: boolean, hasBold: boolean): Uint8Array {
  const payloads = TARGET_FONTS.map(t => renderFontBlock(t, hasRegular, hasBold).payload);
  const dirSize = 16 + 5 * 12;
  const totalSize = dirSize + payloads.reduce((acc, p) => acc + p.byteLength, 0);
  const buf = new Uint8Array(totalSize);
  const view = new DataView(buf.buffer);

  // Magic "PTFN"
  buf.set([0x50, 0x54, 0x46, 0x4E], 0);
  view.setUint16(4, 1, true); // Version 1
  view.setUint16(6, 5, true); // 5 Fonts

  let off = dirSize;
  payloads.forEach((p, i) => {
    const eo = 16 + i * 12;
    view.setUint32(eo, off, true);
    view.setUint32(eo + 4, p.byteLength, true);
    view.setUint16(eo + 8, i + 1, true);
    view.setUint16(eo + 10, 2, true); // L4 format
    buf.set(p, off);
    off += p.byteLength;
  });

  return buf;
}
