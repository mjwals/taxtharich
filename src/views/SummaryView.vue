<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useStorePeople } from '@/stores/storePeople.js'
import { useStoreBasket } from '@/stores/storeBasket.js'
import { formatCurrency } from '@/common/utils.js'
import { summaryTable } from '@/common/constants.js'
import BaseTable from '@/components/BaseTable.vue'
import BaseButton from '@/components/BaseButton.vue'

const router = useRouter()
const storePeople = useStorePeople()
const storeBasket = useStoreBasket()

const displayIndividual = computed(() => {
  return storeBasket.people.length <= 1 ? 'individual' : 'individuals'
})

const displayMillion = computed(() => {
  return storeBasket.getTotalBasketWealth <= 1000000000 ? 'million' : 'billion'
})

const loading = ref(false)

const handleBack = () => {
  loading.value = true

  setTimeout(() => {
    loading.value = false
    storeBasket.removeAll()
    storeBasket.setTaxRate(1)
    storePeople.setBtnDisabled()
    router.push({ name: 'home' })
  }, 1500)
}
</script>

<template>
  <div class="wrapper d-none d-md-block bg-neutral-100">
    <main class="main">
      <p class="font-xl text-center text-medium-emphasis">
        A modest
        <span class="font-weight-bold text-high-emphasis">{{ storeBasket.taxRate }}%</span>
        wealth tax on just
        <span class="font-weight-bold text-high-emphasis">{{ storeBasket.people.length }}</span>
        {{ displayIndividual }} could generate an astounding
        <span class="font-weight-bold text-high-emphasis"
          >£{{ formatCurrency(storeBasket.getTotalBasketWealth, 5, true) }}</span
        >
        {{ displayMillion }} annually for the UK Treasury.
      </p>

      <!-- table -->
      <BaseTable
        :headers="summaryTable.headers"
        :items="storeBasket.people"
        :items-per-page="-1"
        class="table table-summary rounded mt-15"
      >
        <!-- name col -->
        <template v-slot:item.name="{ item }">
          <p class="font-base text-white text-medium-emphasis">{{ item.name }}</p>
        </template>

        <!-- worthGross col -->
        <template v-slot:item.worthGross="{ item }">
          <span class="font-lg font-weight-bold text-medium-emphasis">{{
            formatCurrency(item.worthGross)
          }}</span>
        </template>

        <!-- worthNet col -->
        <template v-slot:item.worthNet="{ item }">
          <div class="d-flex justify-end align-center">
            <span class="font-lg font-weight-bold text-white text-high-emphasis">{{
              formatCurrency(item.worthNet)
            }}</span>
          </div>
        </template>

        <!-- tax col -->
        <template v-slot:item.tax="{ item }">
          <div class="d-flex justify-end align-center">
            <span class="font-lg font-weight-bold text-accent"
              >+{{ formatCurrency(item.tax) }}</span
            >
          </div>
        </template>
      </BaseTable>

      <p class="font-sm text-white text-medium-emphasis text-center font-italic mt-2 mb-15">
        *These figures are for illustrative purposes only, based on a fixed
        {{ storeBasket.taxRate }}% tax on assets over £10 million.
      </p>

      <div class="d-flex justify-center align-center mt-8">
        <div class="button-bordered">
          <BaseButton
            :loading="loading"
            class="font-md font-weight-bold text-none"
            color="background"
            width="198"
            height="46"
            @click="handleBack"
          >
            <span>Start again</span>

            <template v-slot:loader>
              <v-progress-circular indeterminate />
              <span>&nbsp;{{ loading ? 'Loading...' : '' }}</span>
            </template>
          </BaseButton>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped lang="scss"></style>
