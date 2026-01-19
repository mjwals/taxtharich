<script setup>
const props = defineProps({
  color: {
    type: String,
    default: ''
  }
})
</script>

<template>
  <v-sheet v-bind="$attrs" :color="color">
    <template v-slot:default>
      <slot name="default"></slot>
    </template>
  </v-sheet>
</template>

<style lang="scss" scoped></style>
