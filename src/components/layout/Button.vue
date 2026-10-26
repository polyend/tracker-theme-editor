<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
  primary: {
    type: Boolean,
    default: false,
  },
  secondary: {
    type: Boolean,
    default: false,
  },
  tertiary: {
    type: Boolean,
    default: false,
  },
  quaternary: {
    type: Boolean,
    default: false,
  },
  outline: {
    type: Boolean,
    default: false,
  },
  large: {
    type: Boolean,
    default: false,
  }
});

const emit = defineEmits(['click']);

const classList = computed(() => {
  return [
      'btn',
      ...(props.primary ? ['primary'] : []),
      ...(props.secondary ? ['secondary'] : []),
      ...(props.tertiary ? ['tertiary'] : []),
      ...(props.quaternary ? ['quaternary'] : []),
      ...(props.outline ? ['outline'] : []),
      ...(props.large ? ['large'] : []),
  ];
});

</script>

<template>
  <button :class="classList" type="button" @click="emit('click')">
    <slot/>
  </button>
</template>

<style lang="scss">
  button.btn {
    position: relative;
    padding: 3px 10px;
    border: 1px solid transparent;
    background-color: transparent;
    outline: none;
    font-size: 12px;
    font-family: inherit;
    font-weight: 500;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    cursor: pointer;
    color: inherit;
    z-index: 3;
    border-radius: 3px;
    box-shadow: 0 2px 2px rgba(0, 0, 0, 0.25);

    & > svg {
      width: 16px;
      height: 16px;
    }

    &.primary {
      color: black;
      border-color: black;
      background-color: #57CFC2;

      &:hover {
        filter: brightness(1.3);
      }
    }
    &.secondary {
      background-color: #DBD998;
      border-color: black;
      color: black;
      &:hover {
        filter: brightness(1.3);
      }
    }
    &.tertiary {
      background-color: #C185D2;
      border-color: black;
      color: black;
      &:hover {
        filter: brightness(1.3);
      }
    }
    &.quaternary {
      background-color: #59C8D0;
      border-color: black;
      color: black;
      &:hover {
        filter: brightness(1.3);
      }
    }

    &.outline {
      border: 1px dashed rgba(255, 255, 255, 0.1);
      box-shadow: none;
      &:hover {
        background-color: rgba(255, 255, 255, 0.1);
        filter: brightness(1.3);
      }
    }

    &.large {
      padding: 8px 10px;
    }
  }
</style>

<i18n/>
