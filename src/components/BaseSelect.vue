<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: Number,
    default: 0
  },
  flat: {
    type: Boolean,
    default: true
  },
  items: {
    type: Array,
    required: true
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
    default: 'outlined'
  },
  color: {
    type: String,
    default: ''
  },
  bgColor: {
    type: String,
    default: ''
  },
  itemColor: {
    type: String,
    default: ''
  },
  baseColor: {
    type: String,
    default: ''
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
  <v-select
    v-model="localValue"
    :items="items"
    :item-title="items.title"
    :item-value="items.value"
    :flat="flat"
    :hideDetails="hideDetails"
    :variant="variant"
    :density="density"
    :width="width"
    :style="`height: ${height}px`"
    :base-color="baseColor"
    :color="color"
    :bg-color="bgColor"
    :item-color="itemColor"
    menu-icon="mdi-chevron-down"
  ></v-select>
</template>

<style lang="scss" scoped>
:deep(.v-input__control) {
  height: inherit !important;
}

:deep(.v-field__input) {
  height: 100% !important;
}
</style>
