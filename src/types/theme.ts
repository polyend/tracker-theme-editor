export type ScreenId = 'pattern' | 'song' | 'sampleLoader' | 'waveform' | 'notes' | 'menu';

export interface ColorDefinition {
  id: string;
  label: string;
  desc: string;
  default: string;
  section: string;
}

export interface PresetManifestItem {
  id: string;
  name: string;
  file: string;
}

export interface ThemeQuad {
  text?: string;
  background?: string;
  frame?: string;
  text2?: string;
}

export interface ThemeBoxMenu {
  text?: string;
  boxBackground?: string;
  selectedBox?: string;
  background?: string;
  frame?: string;
  inactiveDot?: string;
  activeDot?: string;
}

export interface ThemeList {
  frameNormal?: string;
  frameSelect?: string;
  scrollbar?: string;
  background?: string;
  textNormal?: string;
  textSelect?: string;
  scrollbarTrack?: string;
}

export interface ThemeBar {
  primary?: string;
  container?: string;
  background?: string;
  frame?: string;
  accent?: string;
}

export interface ThemePatternTracker {
  note?: string;
  instrument?: string;
  fx1?: string;
  fx2?: string;
  greenMode?: string;
  selection?: string;
  selectionText?: string;
  playhead?: string;
  activeTrack?: string;
  unfocusedTrack?: string;
  inactiveTrack?: string;
  trackName?: string;
  stepNumber?: string;
  gridDivider?: string;
  verticalDivider?: string;
  inactiveNote?: string;
  inactiveInstrument?: string;
  inactiveFx1?: string;
  inactiveFx2?: string;
  background?: string;
  trackEnd?: string;
  [key: string]: string | undefined;
}

export interface ThemeSongPlayer {
  text?: string;
  activeBlock?: string;
  playheadActive?: string;
  playhead?: string;
  mutedBlock?: string;
  emptyTrack?: string;
  scrollbar?: string;
  scrollbarBackground?: string;
  inactiveText?: string;
  editMode?: string;
  background?: string;
  [key: string]: string | undefined;
}

export interface ThemeWaveform {
  audio?: string;
  background?: string;
  sliceMarker?: string;
  activeSlice?: string;
  slicePlayhead?: string;
  progress?: { text?: string; cursor?: string };
  points?: ThemeQuad;
  [key: string]: any;
}

export interface ThemePopups {
  stepTitle?: ThemeQuad;
  stepList?: ThemeList;
  note?: { padBackground?: string; padText?: string; selectionFrame?: string };
  noteKeyboard?: { text?: string; background?: string; activeText?: string };
  dialog?: ThemeQuad;
  [key: string]: any;
}

export interface ThemeLists {
  sampleLoader?: ThemeList;
  sampleLoaderInactive?: ThemeList;
  active?: ThemeList;
  inactive?: ThemeList;
  [key: string]: any;
}

export interface ThemeBars {
  active?: ThemeBar;
  sampleLoaderNormal?: ThemeBar;
  [key: string]: any;
}

export interface ThemeLabels {
  active?: ThemeQuad;
  inactive?: ThemeQuad;
  activeButton?: ThemeQuad;
  inactiveButton?: ThemeQuad;
  highlightedButton?: ThemeQuad;
  redButton?: ThemeQuad;
  [key: string]: any;
}

export interface Theme {
  name?: string;
  base?: string;
  background?: string;
  topBar?: ThemeQuad;
  songTimer?: ThemeQuad;
  labels?: ThemeLabels;
  moreButton?: { text?: string; background?: string; activeDot?: string; inactiveDot?: string };
  bottomButtons?: { text?: string; background?: string; frame?: string };
  patternTracker?: ThemePatternTracker;
  songPlayer?: ThemeSongPlayer;
  waveform?: ThemeWaveform;
  frames?: { active?: string; inactive?: string; green?: string; [key: string]: string | undefined };
  popups?: ThemePopups;
  miniMenu?: ThemeBoxMenu;
  bars?: ThemeBars;
  lists?: ThemeLists;
  accents?: {
    white?: string;
    red?: string;
    orange?: string;
    yellow?: string;
    green?: string;
    cyan?: string;
    grey?: string;
    [key: string]: string | undefined;
  };
  keyboard?: { keyBackground?: string; text?: string; activeKey?: string };
  editBox?: { text?: string; boxBackground?: string; frame?: string; selection?: string; outerBackground?: string };
  [key: string]: any;
}
