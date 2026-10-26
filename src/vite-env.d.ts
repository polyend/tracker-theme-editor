/// <reference types="vite/client" />
/// <reference types="vite-svg-loader" />

declare module '*.svg' {
  import type { FunctionalComponent, SVGAttributes } from 'vue';
  const src: FunctionalComponent<SVGAttributes>;
  export default src;
}
