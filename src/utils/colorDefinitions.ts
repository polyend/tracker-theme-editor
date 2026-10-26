import type { ColorDefinition, ScreenId } from '../types/theme';

export interface FieldTarget {
  screen: ScreenId;
  popup?: boolean;
  selector: string;
}

export const COLOR_DEFINITIONS: ColorDefinition[] = [
  // Pattern Tracker Grid & Notes
  { id: "patternTracker.note", label: "Note Color", desc: "Notes in active patterns (e.g. C5, FAD)", default: "#22d6b8", section: "sec-pattern" },
  { id: "patternTracker.instrument", label: "Instrument", desc: "Instrument ID numbers (08..26)", default: "#f0e040", section: "sec-pattern" },
  { id: "patternTracker.fx1", label: "FX 1", desc: "First effect column (R 1, V 29, m 2)", default: "#a855f7", section: "sec-pattern" },
  { id: "patternTracker.fx2", label: "FX 2", desc: "Second effect column (M-27, p 9)", default: "#38bdf8", section: "sec-pattern" },
  { id: "patternTracker.greenMode", label: "Step Cursor (Edit)", desc: "Green cell cursor in normal edit mode", default: "#32b846", section: "sec-pattern" },
  { id: "patternTracker.selection", label: "Step Cursor (REC)", desc: "Red cell cursor in record mode", default: "#c81e1e", section: "sec-pattern" },
  { id: "patternTracker.selectionText", label: "Selection Text", desc: "Text color inside active cursor block", default: "#ffffff", section: "sec-pattern" },
  { id: "patternTracker.playhead", label: "Playhead Line", desc: "Horizontal active playback bar", default: "#32b846", section: "sec-pattern" },
  { id: "patternTracker.activeTrack", label: "Active Track Column", desc: "Background of focused track", default: "#060606", section: "sec-pattern" },
  { id: "patternTracker.unfocusedTrack", label: "Unfocused Track", desc: "Background of unfocused tracks", default: "#060606", section: "sec-pattern" },
  { id: "patternTracker.inactiveTrack", label: "Inactive Track", desc: "Muted or inactive track columns", default: "#000000", section: "sec-pattern" },
  { id: "patternTracker.trackName", label: "Track Header Text", desc: "Track name labels (Drums, Hats, etc.)", default: "#888888", section: "sec-pattern" },
  { id: "patternTracker.stepNumber", label: "Step Number Text", desc: "Vertical row step numbers (00..63)", default: "#777777", section: "sec-pattern" },
  { id: "patternTracker.gridDivider", label: "Beat Row Divider", desc: "4-step bar divider line across tracks", default: "#151515", section: "sec-pattern" },
  { id: "patternTracker.verticalDivider", label: "Vertical Column Line", desc: "Dividers separating track columns", default: "#222222", section: "sec-pattern" },
  { id: "patternTracker.inactiveNote", label: "Dim Note (- - -)", desc: "Unset note dashes in empty pattern steps", default: "#0e3830", section: "sec-pattern" },
  { id: "patternTracker.inactiveInstrument", label: "Dim Instrument (- -)", desc: "Unset instrument dashes", default: "#3a3510", section: "sec-pattern" },
  { id: "patternTracker.inactiveFx1", label: "Dim FX 1 (- - - -)", desc: "Unset first effect slot dashes", default: "#2e1642", section: "sec-pattern" },
  { id: "patternTracker.inactiveFx2", label: "Dim FX 2 (- - - -)", desc: "Unset second effect slot dashes", default: "#103242", section: "sec-pattern" },

  // Panels & Frames
  { id: "frames.active", label: "Active Frame", desc: "Primary 2px focus outline on widgets", default: "#c81e1e", section: "sec-frames" },
  { id: "frames.inactive", label: "Inactive Frame", desc: "Border on unfocused panes & boxes", default: "#2c2c2c", section: "sec-frames" },
  { id: "frames.green", label: "Green Frame", desc: "Green selection/status frame", default: "#32b846", section: "sec-frames" },

  // Popups & Instruments Sidebar
  { id: "popups.stepTitle.text", label: "Step Popup Title Text", desc: "Header title in step instrument popup", default: "#000000", section: "sec-popups" },
  { id: "popups.stepTitle.background", label: "Step Popup Title BG", desc: "Header background in step instrument popup", default: "#ffffff", section: "sec-popups" },
  { id: "popups.stepList.frameSelect", label: "Popup Selected Frame", desc: "White 2px selection box on active item", default: "#ffffff", section: "sec-popups" },
  { id: "popups.stepList.textNormal", label: "Popup Item Text", desc: "Standard text of unselected items", default: "#ffffff", section: "sec-popups" },
  { id: "popups.stepList.textSelect", label: "Popup Selected Text", desc: "Active item text color", default: "#ffffff", section: "sec-popups" },
  { id: "popups.stepList.background", label: "Popup List BG", desc: "Background of instruments popup overlay", default: "#080808", section: "sec-popups" },
  { id: "popups.stepList.scrollbar", label: "Popup Scrollbar", desc: "Vertical scrollbar thumb in popup", default: "#444444", section: "sec-popups" },

  // Sample Loader Lists
  { id: "lists.sampleLoader.frameSelect", label: "Selected Folder Frame", desc: "Red 2px selection on active SD folder", default: "#c81e1e", section: "sec-lists" },
  { id: "lists.sampleLoader.textNormal", label: "Folder / File Text", desc: "Unselected folder & file text", default: "#ffffff", section: "sec-lists" },
  { id: "lists.sampleLoader.textSelect", label: "Selected Folder Text", desc: "Active folder name text", default: "#ffffff", section: "sec-lists" },
  { id: "lists.sampleLoaderInactive.frameSelect", label: "Sample Pool Select Frame", desc: "White 2px frame on active sample slot", default: "#ffffff", section: "sec-lists" },
  { id: "lists.sampleLoaderInactive.textNormal", label: "Sample Pool Text", desc: "Unselected sample slot text", default: "#ffffff", section: "sec-lists" },
  { id: "lists.sampleLoaderInactive.textSelect", label: "Sample Pool Select Text", desc: "Active sample name text", default: "#ffffff", section: "sec-lists" },

  // Notes Grid & Overlays
  { id: "popups.note.padBackground", label: "Note Pad Surface", desc: "Background of octave pads in grid", default: "#0c0c0c", section: "sec-notes" },
  { id: "popups.note.padText", label: "Note Pad Text", desc: "Note name label (C5, D#4, etc.)", default: "#ffffff", section: "sec-notes" },
  { id: "popups.note.selectionFrame", label: "Active Note Frame", desc: "Red 2px outline on triggered/selected pad", default: "#c81e1e", section: "sec-notes" },
  { id: "popups.noteKeyboard.text", label: "Keyboard Base Text", desc: "Virtual keyboard note text", default: "#ffffff", section: "sec-notes" },
  { id: "popups.noteKeyboard.background", label: "Keyboard Surface", desc: "Virtual keyboard background", default: "#000000", section: "sec-notes" },

  // Bar Gauges & Meters
  { id: "bars.active.primary", label: "Primary Bar Fill", desc: "White fill of Tempo & Preview volume bars", default: "#ffffff", section: "sec-bars" },
  { id: "bars.sampleLoaderNormal.primary", label: "Memory Pool Bar Fill", desc: "White fill of Sample memory bar (49%)", default: "#ffffff", section: "sec-bars" },
  { id: "bars.active.background", label: "Bar Container BG", desc: "Dark background track of vertical bar gauges", default: "#060606", section: "sec-bars" },

  // Top App Bar & Song Timer
  { id: "topBar.text", label: "Top Bar Title", desc: "Header title text (Pattern 16)", default: "#ffffff", section: "sec-topbar" },
  { id: "topBar.background", label: "Top Bar Background", desc: "Header strip background", default: "#000000", section: "sec-topbar" },
  { id: "topBar.frame", label: "Top Bar Divider", desc: "Bottom border separating header from grid", default: "#222222", section: "sec-topbar" },
  { id: "songTimer.text", label: "Song Timer Text", desc: "Playback clock (0m:00s || P16.036)", default: "#ffffff", section: "sec-topbar" },
  { id: "songTimer.background", label: "Song Timer BG", desc: "Timer widget container background", default: "#000000", section: "sec-topbar" },
  { id: "songTimer.frame", label: "Song Timer Frame", desc: "Timer container border", default: "#000000", section: "sec-topbar" },

  // Function Buttons & Labels
  { id: "bottomButtons.text", label: "Bottom Button Text", desc: "Primary text on function buttons", default: "#888888", section: "sec-buttons" },
  { id: "bottomButtons.background", label: "Bottom Button BG", desc: "Function bar background surface", default: "#000000", section: "sec-buttons" },
  { id: "bottomButtons.frame", label: "Button Dividers", desc: "Vertical lines separating 8 function slots", default: "#1f1f1f", section: "sec-buttons" },
  { id: "moreButton.text", label: "'More' Button Text", desc: "Label for the page cycling More button", default: "#888888", section: "sec-buttons" },
  { id: "moreButton.activeDot", label: "Active Page Dot", desc: "First page indicator dot", default: "#888888", section: "sec-buttons" },
  { id: "moreButton.inactiveDot", label: "Inactive Page Dots", desc: "Other page indicator dots", default: "#2e2e2e", section: "sec-buttons" },
  { id: "labels.active.text", label: "Active Menu Text", desc: "Selected item text in Config / Sample Editor", default: "#ffffff", section: "sec-buttons" },
  { id: "labels.active.background", label: "Active Menu BG", desc: "Selected row background", default: "#000000", section: "sec-buttons" },
  { id: "labels.active.frame", label: "Active Menu Frame", desc: "White 2px outline on selected row", default: "#ffffff", section: "sec-buttons" },
  { id: "labels.inactive.text", label: "Inactive Menu Text", desc: "Normal unselected menu text", default: "#777777", section: "sec-buttons" },
  { id: "labels.activeButton.text", label: "Button Value Text", desc: "Active button secondary value", default: "#888888", section: "sec-buttons" },
  { id: "labels.activeButton.frame", label: "Button Green Underline", desc: "Green 2px indicator line on active buttons", default: "#1a7a33", section: "sec-buttons" },
  { id: "labels.inactiveButton.text", label: "Disabled Button Text", desc: "Dimmed button label (Fill, Undo, Redo)", default: "#444444", section: "sec-buttons" },
  { id: "labels.inactiveButton.frame", label: "Button Red Underline", desc: "Red 2px indicator line on disabled buttons", default: "#6b1515", section: "sec-buttons" },
  { id: "labels.highlightedButton.background", label: "Highlight Button", desc: "Primary highlighted button surface", default: "#ffffff", section: "sec-buttons" },
  { id: "labels.redButton.background", label: "Danger / Red Button", desc: "Red warning button surface", default: "#c81e1e", section: "sec-buttons" },

  // Sample Editor & Waveform
  { id: "waveform.audio", label: "Audio Waveform", desc: "Vertical waveform bars in Sample Editor", default: "#ffffff", section: "sec-waveform" },
  { id: "waveform.background", label: "Waveform Background", desc: "Sample editor waveform box background", default: "#080808", section: "sec-waveform" },
  { id: "waveform.sliceMarker", label: "Slice / Start Marker", desc: "Start marker line & triangle flag", default: "#c81e1e", section: "sec-waveform" },
  { id: "waveform.activeSlice", label: "Active Slice Area", desc: "Highlighted slice region", default: "#c81e1e", section: "sec-waveform" },
  { id: "waveform.slicePlayhead", label: "Sample Playhead", desc: "Audio playback cursor in waveform", default: "#32b846", section: "sec-waveform" },

  // Song Arranger
  { id: "songPlayer.text", label: "Song Pattern Text", desc: "Track names & pattern slot numbers", default: "#ffffff", section: "sec-songplayer" },
  { id: "songPlayer.inactiveText", label: "Muted Track Text", desc: "Header text of muted tracks in Song matrix", default: "#333333", section: "sec-songplayer" },
  { id: "songPlayer.activeBlock", label: "Active Track Block", desc: "Filled pattern blocks in matrix", default: "#ffffff", section: "sec-songplayer" },
  { id: "songPlayer.playhead", label: "Muted Track Block", desc: "Pattern blocks on muted tracks in matrix", default: "#444344", section: "sec-songplayer" },
  { id: "songPlayer.playheadActive", label: "Active Slot Frame", desc: "Outline on selected pattern slot / playhead", default: "#32b846", section: "sec-songplayer" },
  { id: "songPlayer.emptyTrack", label: "Empty Matrix Slot", desc: "Dark unassigned matrix cells", default: "#0e0e0e", section: "sec-songplayer" },
  { id: "songPlayer.scrollbar", label: "Song Scrollbar", desc: "Scrollbar thumb in Song screen", default: "#666666", section: "sec-songplayer" },
  { id: "songPlayer.scrollbarBackground", label: "Scrollbar Track", desc: "Scrollbar track in Song screen", default: "#141414", section: "sec-songplayer" },

  // Global & Accents
  { id: "background", label: "Global Background", desc: "Root LCD background color", default: "#000000", section: "sec-accents" },
  { id: "accents.white", label: "Accent White", desc: "System white accent", default: "#ffffff", section: "sec-accents" },
  { id: "accents.red", label: "Accent Red", desc: "System red accent", default: "#c81e1e", section: "sec-accents" },
  { id: "accents.yellow", label: "Accent Yellow", desc: "System yellow accent", default: "#f0e040", section: "sec-accents" },
  { id: "accents.green", label: "Accent Green", desc: "System green accent", default: "#32b846", section: "sec-accents" },
  { id: "accents.cyan", label: "Accent Cyan", desc: "System cyan accent", default: "#22d6b8", section: "sec-accents" },

  // Tracker Mini Menu Overlay
  { id: "miniMenu.text", label: "Module Label Text", desc: "Text label of module box in Tracker Mini menu", default: "#ffffff", section: "sec-mini-menu" },
  { id: "miniMenu.boxBackground", label: "Module Box Background", desc: "Background of unselected module boxes", default: "#222222", section: "sec-mini-menu" },
  { id: "miniMenu.selectedBox", label: "Active Box Background", desc: "Background of the currently highlighted/active module box", default: "#323232", section: "sec-mini-menu" },
  { id: "miniMenu.background", label: "Menu Backdrop / Grid", desc: "Outer backdrop and spacing between boxes", default: "#000000", section: "sec-mini-menu" },
  { id: "miniMenu.frame", label: "Selected Module Frame", desc: "Accent selection outline on active box", default: "#c81e1e", section: "sec-mini-menu" },
  { id: "miniMenu.inactiveDot", label: "Inactive Mode Dot", desc: "Dim indicator dot for multi-mode modules", default: "#121212", section: "sec-mini-menu" },
  { id: "miniMenu.activeDot", label: "Active Mode Dot", desc: "Bright indicator dot for active module mode", default: "#777777", section: "sec-mini-menu" }
];

export const SECTIONS = [
  { id: "sec-pattern", label: "Pattern Grid & Notes" },
  { id: "sec-frames", label: "Panels & Frames" },
  { id: "sec-popups", label: "Popups & Sidebar Lists" },
  { id: "sec-mini-menu", label: "Tracker Mini Menu Overlay" },
  { id: "sec-lists", label: "Sample Loader Lists" },
  { id: "sec-notes", label: "Notes Grid Overlay" },
  { id: "sec-bars", label: "Bar Gauges & Meters" },
  { id: "sec-topbar", label: "Top Bar & Song Timer" },
  { id: "sec-buttons", label: "Function Buttons & Labels" },
  { id: "sec-waveform", label: "Sample Editor & Waveform" },
  { id: "sec-songplayer", label: "Song Arranger Matrix" },
  { id: "sec-accents", label: "Global Background & Accents" }
];

export function getFieldPreviewTarget(fieldId: string, currentScreen: ScreenId): FieldTarget {
  if (fieldId.startsWith('miniMenu.')) {
    return { screen: currentScreen, selector: '#ui-mini-menu-box' };
  }
  if (fieldId.startsWith('topBar.')) {
    return { screen: currentScreen === 'notes' ? 'pattern' : currentScreen, selector: '#ui-topBar' };
  }
  if (fieldId.startsWith('songTimer.')) {
    return { screen: (currentScreen === 'waveform' || currentScreen === 'notes') ? 'pattern' : currentScreen, popup: false, selector: '#ui-songTimer' };
  }
  if (fieldId.startsWith('moreButton.')) {
    return { screen: 'pattern', popup: false, selector: '#ui-bottomButtons > div:last-child' };
  }
  if (fieldId.startsWith('bottomButtons.') || fieldId.startsWith('labels.activeButton.') || fieldId.startsWith('labels.inactiveButton.')) {
    return { screen: currentScreen === 'notes' ? 'pattern' : currentScreen, selector: '#ui-bottomButtons' };
  }
  if (fieldId === 'patternTracker.note') {
    return { screen: 'pattern', popup: false, selector: '#ui-selActiveBlock, .note-cell' };
  }
  if (fieldId === 'patternTracker.inactiveNote') {
    return { screen: 'pattern', selector: '.note-dim' };
  }
  if (fieldId === 'patternTracker.instrument') {
    return { screen: 'pattern', selector: '.inst-cell' };
  }
  if (fieldId === 'patternTracker.inactiveInstrument') {
    return { screen: 'pattern', selector: '.inst-dim' };
  }
  if (fieldId === 'patternTracker.fx1') {
    return { screen: 'pattern', selector: '.fx1-cell' };
  }
  if (fieldId === 'patternTracker.inactiveFx1') {
    return { screen: 'pattern', selector: '.fx1-dim' };
  }
  if (fieldId === 'patternTracker.fx2') {
    return { screen: 'pattern', selector: '.fx2-cell' };
  }
  if (fieldId === 'patternTracker.inactiveFx2') {
    return { screen: 'pattern', selector: '.fx2-dim' };
  }
  if (fieldId === 'patternTracker.selection' || fieldId === 'patternTracker.greenMode' || fieldId === 'patternTracker.selectionText') {
    return { screen: 'pattern', selector: '#ui-selActiveBlock, #ui-selectionBox' };
  }
  if (fieldId === 'patternTracker.trackName') {
    return { screen: 'pattern', selector: '.track-header-badge' };
  }
  if (fieldId === 'patternTracker.activeTrack') {
    return { screen: 'pattern', selector: '#ui-t1-col' };
  }
  if (fieldId === 'patternTracker.unfocusedTrack' || fieldId === 'patternTracker.inactiveTrack') {
    return { screen: 'pattern', selector: '#ui-t2-col' };
  }
  if (fieldId === 'patternTracker.stepNumber') {
    return { screen: 'pattern', selector: '#ui-stepColL, #ui-stepColR' };
  }
  if (fieldId === 'patternTracker.gridDivider') {
    return { screen: 'pattern', selector: '.grid-divider-row' };
  }
  if (fieldId === 'patternTracker.verticalDivider') {
    return { screen: 'pattern', selector: '#ui-t1-col, #ui-t2-col, #ui-t3-col' };
  }
  if (fieldId === 'patternTracker.playhead') {
    return { screen: 'pattern', popup: false, selector: '#ui-playhead-line' };
  }
  if (fieldId.startsWith('patternTracker.')) {
    return { screen: 'pattern', selector: '#ui-selectionBox' };
  }
  if (fieldId.startsWith('popups.stepTitle.')) {
    return { screen: 'pattern', popup: true, selector: '#ui-topbar-popup-header' };
  }
  if (fieldId === 'popups.stepList.frameSelect' || fieldId === 'popups.stepList.textSelect') {
    return { screen: 'pattern', popup: true, selector: '#ui-popup-inst-item8' };
  }
  if (fieldId === 'popups.stepList.scrollbar') {
    return { screen: 'pattern', popup: true, selector: '#ui-popup-inst-thumb' };
  }
  if (fieldId === 'popups.stepList.scrollbarTrack') {
    return { screen: 'pattern', popup: true, selector: '#ui-popup-inst-track' };
  }
  if (fieldId.startsWith('popups.stepList.')) {
    return { screen: 'pattern', popup: true, selector: '#ui-instruments-popup' };
  }
  if (fieldId.startsWith('popups.note')) {
    return { screen: 'notes', selector: '.note-pad.active-pad, #ui-notes-grid' };
  }
  if (fieldId === 'songPlayer.activeBlock') {
    return { screen: 'song', selector: '.song-block-active' };
  }
  if (fieldId === 'songPlayer.playhead' || fieldId === 'songPlayer.mutedBlock') {
    return { screen: 'song', selector: '.song-block-muted' };
  }
  if (fieldId === 'songPlayer.inactiveText') {
    return { screen: 'song', selector: '.song-header-muted' };
  }
  if (fieldId === 'songPlayer.emptyTrack') {
    return { screen: 'song', selector: '.song-block-empty' };
  }
  if (fieldId === 'songPlayer.playheadActive') {
    return { screen: 'song', selector: '#ui-song-slot-active' };
  }
  if (fieldId === 'songPlayer.text') {
    return { screen: 'song', selector: '#ui-song-pattern-title, .song-slot-text' };
  }
  if (fieldId === 'songPlayer.scrollbar') {
    return { screen: 'song', selector: '#ui-songScroll-thumb' };
  }
  if (fieldId === 'songPlayer.scrollbarBackground') {
    return { screen: 'song', selector: '#ui-songScroll-track' };
  }
  if (fieldId.startsWith('songPlayer.')) {
    return { screen: 'song', selector: '#ui-song-matrix' };
  }
  if (fieldId === 'waveform.audio') {
    return { screen: 'waveform', selector: '#ui-waveform-bars' };
  }
  if (fieldId === 'waveform.background') {
    return { screen: 'waveform', selector: '#ui-waveform-bg' };
  }
  if (fieldId === 'waveform.sliceMarker') {
    return { screen: 'waveform', selector: '#ui-slice-marker-start, #ui-slice-flag-start' };
  }
  if (fieldId.startsWith('waveform.')) {
    return { screen: 'waveform', selector: '#ui-waveform-outer' };
  }
  if (fieldId === 'lists.sampleLoader.frameSelect' || fieldId === 'lists.sampleLoader.textSelect') {
    return { screen: 'sampleLoader', selector: '#ui-loader-folder-act' };
  }
  if (fieldId.startsWith('lists.sampleLoader.')) {
    return { screen: 'sampleLoader', selector: '#ui-loader-col1' };
  }
  if (fieldId === 'lists.sampleLoaderInactive.frameSelect' || fieldId === 'lists.sampleLoaderInactive.textSelect') {
    return { screen: 'sampleLoader', selector: '#ui-loader-inst-act' };
  }
  if (fieldId.startsWith('lists.sampleLoaderInactive.')) {
    return { screen: 'sampleLoader', selector: '#ui-loader-col2' };
  }
  if (fieldId === 'bars.sampleLoaderNormal.primary') {
    return { screen: 'sampleLoader', selector: '#ui-loader-col4, #ui-loader-mem-fill' };
  }
  if (fieldId.startsWith('bars.active.')) {
    return { screen: currentScreen === 'sampleLoader' ? 'sampleLoader' : 'song', selector: currentScreen === 'sampleLoader' ? '#ui-loader-col3, #ui-loader-vol-fill' : '#ui-song-tempo-bar, #ui-tempo-gauge' };
  }
  if (fieldId === 'labels.active.text' || fieldId === 'labels.active.frame' || fieldId === 'labels.active.background') {
    return { screen: (currentScreen === 'waveform' || currentScreen === 'menu') ? currentScreen : 'menu', selector: currentScreen === 'waveform' ? '#ui-wf-list-act' : '#ui-cfg-param-active, #ui-cfg-cat-active' };
  }
  if (fieldId === 'labels.inactive.text') {
    return { screen: 'menu', selector: '.cfg-param-item, .cfg-cat-item' };
  }
  if (fieldId === 'frames.active') {
    if (currentScreen === 'waveform') return { screen: 'waveform', selector: '#ui-slice-marker-start' };
    if (currentScreen === 'sampleLoader') return { screen: 'sampleLoader', selector: '#ui-loader-col1' };
    return { screen: 'menu', selector: '#ui-config-col2, #ui-cfg-param-active' };
  }
  if (fieldId === 'frames.inactive') {
    return { screen: 'sampleLoader', selector: '#ui-loader-col2' };
  }
  if (fieldId === 'frames.green') {
    return { screen: 'pattern', selector: '#ui-selectionBox' };
  }
  return { screen: currentScreen, selector: '#trackerScreen' };
}
