<script setup>
const props = defineProps({
  variant: {
    type: String,
    default: 'flat'
  },
  color: {
    type: String,
    default: ''
  },
  density: {
    type: String,
    default: 'default'
  },
  width: {
    type: [String, Number],
    default: ''
  },
  height: {
    type: [String, Number],
    default: ''
  },
  icon: {
    type: Boolean,
    default: false
  },
  loading: {
    type: Boolean,
    default: false
  }
})

const emits = defineEmits(['click'])

const handleClick = () => {
  emits('click')
}
</script>

<template>
  <v-btn
    v-bind="$attrs"
    :variant="variant"
    :color="color"
    :density="density"
    :width="width"
    :height="height"
    :icon="icon"
    :loading="loading"
    @click="handleClick"
  >
    <template v-slot:default>
      <slot name="default"></slot>
    </template>

    <template v-slot:loader>
      <slot name="loader"></slot>
    </template>
  </v-btn>
</template>

<style lang="scss" scoped>
.v-btn {
  // disabled state
  &.v-btn--disabled {
    &:deep(.v-btn__overlay) {
      opacity: 0;
    }
  }
}
</style>
