<script setup>
import { getImage } from '@/common/utils.js'

const props = defineProps({
  errorHeading: {
    type: String,
    default: ''
  },
  errorMessage: {
    type: String,
    default: ''
  }
})
</script>

<template>
  <div class="d-flex flex-column align-center">
    <v-img :src="getImage('kevin.png')" alt="Home Alone Kevin" width="300px"></v-img>

    <p class="font-xl font-weight-bold text-center mt-2">{{ errorHeading }}</p>
    <p class="font-lg text-center text-medium-emphasis">{{ errorMessage }}</p>
  </div>
</template>

<style lang="scss" scoped></style>