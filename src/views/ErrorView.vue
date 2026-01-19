<script setup>
import { useRouter } from 'vue-router'
import BaseError from '@/components/BaseError.vue';
import BaseButton from '@/components/BaseButton.vue';

const router = useRouter()

const handleBack = () => {
  router.push({ name: 'home' })
}

</script>

<template>
  <div class="wrapper d-none d-md-block bg-neutral-100">
    <div class="d-flex h-100 pa-8 overflow-auto">
      <div class="d-flex flex-column align-center ma-auto">
        <BaseError errorHeading="Whoops!" errorMessage="This page doesn't exist." />

        <div class="button-bordered mt-4">
          <BaseButton 
            variant="flat"
            color="background"
            class="font-md font-weight-bold text-none"
            height="46"
            @click="handleBack"
          >
              <span>Back Home</span>
          </BaseButton>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>