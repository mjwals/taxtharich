<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStorePeople } from '@/stores/storePeople.js'
import { useStoreBasket } from '@/stores/storeBasket.js'
import { taxRateSelect } from '@/common/constants.js'
import BaseButton from '@/components/BaseButton.vue'
import BaseSelect from '@/components/BaseSelect.vue'

const router = useRouter()
const storePeople = useStorePeople()
const storeBasket = useStoreBasket()

const props = defineProps({
  data: {
    type: Array,
    required: true
  }
})

const emits = defineEmits(['click'])

const isShowBasket = ref(false)
const taxRateLocal = ref(storeBasket.taxRate)
const loading = ref(false)

const toggleBasket = () => {
  if (storeBasket.people.length) {
    isShowBasket.value = !isShowBasket.value
  }
}

const basketClose = (val) => {
  isShowBasket.value = val
}

const basketRemove = (selectedPerson) => {
  storePeople.setBtnDisabled(selectedPerson)
  storeBasket.remove(selectedPerson)

  if (storeBasket.people.length === 0) {
    taxRateLocal.value = 1
    storeBasket.setTaxRate(taxRateLocal.value)
    isShowBasket.value = false
  }
}

const basketRemoveAll = () => {
  storePeople.setBtnDisabled()
  storeBasket.removeAll()
  taxRateLocal.value = 1
  storeBasket.setTaxRate(taxRateLocal.value)
  isShowBasket.value = false
}

const setTaxRate = () => {
  storeBasket.setTaxRate(taxRateLocal.value)
}

const submit = () => {
  storeBasket.submit()
  loading.value = true

  setTimeout(() => {
    loading.value = false
    router.push({ name: 'summary' })
  }, 1500)
}
</script>

<template>
  <v-menu
    v-model="isShowBasket"
    location="top end"
    width="340"
    offset="20"
    content-class="basket"
    :open-on-click="false"
    :close-on-content-click="false"
  >
    <!-- basket button -->
    <template v-slot:activator="{ props }">
      <BaseButton
        v-bind="props"
        color="gradient"
        width="64"
        height="64"
        rounded="circle"
        class="basket-btn"
        @click="toggleBasket"
      >
        <v-icon size="28">mdi-account-outline</v-icon>
      </BaseButton>
    </template>

    <!-- basket contents -->
    <v-sheet color="neutral-300" elevation="0">
      <!-- header -->
      <div class="d-flex justify-space-between align-center pa-5">
        <div class="d-flex align-center">
          <a
            v-show="data.length"
            href="#"
            class="font-weight-bold text-decoration-underline text-white"
            @click.prevent="basketRemoveAll"
          >
            {{ `Remove all (${data.length})` }}
          </a>
        </div>

        <BaseButton variant="text" density="comfortable" icon @click="basketClose">
          <v-icon size="28">mdi-close</v-icon>
        </BaseButton>
      </div>

      <v-divider></v-divider>

      <!-- content -->
      <div class="pl-5 pr-0 py-8">
        <div class="scroll-container">
          <div
            v-for="person in data"
            :key="person.id"
            class="d-flex flex-column justify-center align-start mb-8 basket__item"
          >
            <p class="text-medium-emphasis">{{ person.name }}</p>
            <a
              href="#"
              class="font-weight-bold text-decoration-underline text-white"
              @click.prevent="basketRemove(person)"
              >Remove</a
            >
          </div>
        </div>
      </div>

      <v-divider></v-divider>

      <!-- footer -->
      <div class="pa-5">
        <BaseSelect
          v-model="taxRateLocal"
          class="mb-5"
          bg-color="neutral-400"
          height="48"
          variant="solo-filled"
          :items="taxRateSelect.items"
          @update:modelValue="setTaxRate"
        />
        <div class="button-bordered w-100">
          <BaseButton
            :loading="loading"
            color="background"
            width="100%"
            height="46"
            class="font-md font-weight-bold text-none"
            @click="submit"
          >
            <span>Tax tha rich</span>

            <template v-slot:loader>
              <v-progress-circular indeterminate />
              <span>&nbsp;{{ loading ? 'Calculating...' : '' }}</span>
            </template>
          </BaseButton>
        </div>
      </div>
    </v-sheet>
  </v-menu>

  <!-- basket tooltip -->
  <div class="basket-counter">
    <div class="basket-counter__inner">
      <span class="font-md font-weight-bold">{{ storeBasket.people.length }}</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.scroll-container {
  overflow-x: hidden;
  overflow-y: auto;
  height: 283px;
  margin: 0 6px 0 0;
  padding: 0 6px 0 0;

  /* width */
  &::-webkit-scrollbar {
    width: 6px;
  }

  /* Track */
  &::-webkit-scrollbar-track {
    background: transparent;
  }

  /* Handle */
  &::-webkit-scrollbar-thumb {
    border-radius: 1000px;
    background-color: rgba(255, 255, 255, var(--v-disabled-opacity));
  }

  /* Handle on hover */
  &::-webkit-scrollbar-thumb:hover {
    background-color: #fff;
  }
}

:deep(.basket) {
  .basket__item:last-child {
    margin: 0 !important;
  }

  // basket arrow
  &:after {
    content: '';
    position: absolute;
    bottom: -7px;
    right: 18px;
    z-index: -1;
    width: 0;
    height: 0;
    border-left: 14px solid transparent;
    border-right: 14px solid transparent;
    border-top: 14px solid rgb(var(--v-theme-neutral-300));
  }
}

.basket-btn {
  position: fixed;
  bottom: 80px;
  right: 97px;
}

.basket-counter {
  position: fixed;
  bottom: 164px;
  right: 97px;
  width: 64px;
  display: flex;
  justify-content: center;

  // tooltip content
  .basket-counter__inner {
    background-color: rgb(var(--v-theme-primary));
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 4px;
    padding: 2px 12px;

    // tooltip arrow
    :after {
      content: '';
      position: absolute;
      bottom: -6px;
      left: 0;
      right: 0;
      z-index: -1;
      width: 0;
      height: 0;
      margin: 0 auto;
      border-left: 14px solid transparent;
      border-right: 14px solid transparent;
      border-top: 14px solid rgb(var(--v-theme-primary));
    }
  }
}
</style>
