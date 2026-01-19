<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  flat: {
    type: Boolean,
    default: true
  },
  hideDetails: {
    type: Boolean,
    default: true
  },
  density: {
    type: String,
    default: 'comfortable'
  },
  width: {
    type: [String, Number],
    default: ''
  },
  height: {
    type: [String, Number],
    default: ''
  },
  variant: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: ''
  },
  bgColor: {
    type: String,
    default: ''
  },
  autofocus: {
    type: Boolean,
    default: false
  }
})

const emits = defineEmits(['update:modelValue'])

const localValue = computed({
  get() {
    return props.modelValue
  },
  set(val) {
    emits('update:modelValue', val)
  }
})
</script>

<template>
  <v-text-field
    v-model="localValue"
    v-bind="$attrs"
    :flat="flat"
    :hide-details="hideDetails"
    :density="density"
    :width="width"
    :style="`height: ${height}px`"
    :variant="variant"
    :placeholder="placeholder"
    :bg-color="bgColor"
    :autofocus="autofocus"
  >
    <template v-slot:prepend-inner>
      <slot name="prepend-inner"></slot>
    </template>
  </v-text-field>
</template>

<style lang="scss" scoped>
:deep(.v-input__control) {
  height: inherit !important;
}
:deep(.v-field__input) {
  height: 100% !important;
}
</style>
