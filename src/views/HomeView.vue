<script setup>
import { ref } from 'vue'
import { useStorePeople } from '@/stores/storePeople.js'
import { useStoreBasket } from '@/stores/storeBasket.js'
import { formatCurrency } from '@/common/utils.js'
import { richListTable } from '@/common/constants.js'
import BaseTable from '@/components/BaseTable.vue'
import BaseTile from '@/components/BaseTile.vue'
import BaseInput from '@/components/BaseInput.vue'
import BaseButton from '@/components/BaseButton.vue'
import TheBasket from '@/components/TheBasket.vue'

// init stores
const storePeople = useStorePeople()
const storeBasket = useStoreBasket()

// search
const search = ref('')

// table functions
const addPerson = (person) => {
  storePeople.setBtnDisabled(person)
  storeBasket.add(person)
}
</script>

<template>
  <div class="wrapper d-none d-md-block">
    <header class="header bg-neutral-100"></header>

    <main class="main main__home">
      <h1 class="mb-8 text-white text-high-emphasis">Tax tha rich</h1>

      <!-- stats -->
      <v-container class="fluid pa-0">
        <v-row class="mx-n4 my-0">
          <v-col cols="12" md="4" class="px-4 py-0 mb-8 mb-md-0">
            <BaseTile
              color="neutral-200"
              class="d-flex flex-column justify-space-between align-start rounded pa-5"
            >
              <span class="d-inline-flex rounded pa-2 mb-5 bg-gradient">
                <v-icon size="28" color="white">mdi-account-outline</v-icon>
              </span>
              <div>
                <label class="text-white text-medium-emphasis">People</label>
                <h1 class="font-xl text-white text-high-emphasis">
                  {{ storePeople.getTotalPeople }}
                </h1>
              </div>
            </BaseTile>
          </v-col>

          <v-col cols="12" md="4" class="px-4 py-0 mb-8 mb-md-0">
            <BaseTile
              color="neutral-200"
              class="d-flex flex-column justify-space-between align-start rounded pa-5"
            >
              <span class="d-inline-flex rounded pa-2 mb-5 bg-gradient">
                <v-icon size="28" color="white">mdi-piggy-bank-outline</v-icon>
              </span>
              <div>
                <label class="text-white text-medium-emphasis">Wealth</label>
                <h1 class="font-xl text-white text-high-emphasis">
                  {{ formatCurrency(storePeople.getTotalWealth, 4) }}
                </h1>
              </div>
            </BaseTile>
          </v-col>

          <v-col cols="12" md="4" class="px-4 py-0">
            <BaseTile
              color="neutral-200"
              class="d-flex flex-column justify-space-between align-start rounded pa-5"
            >
              <span class="d-inline-flex rounded pa-2 mb-5 bg-gradient">
                <v-icon size="28" color="white">mdi-scale-unbalanced</v-icon>
              </span>
              <div>
                <label class="text-white text-medium-emphasis">Minimum annual tax</label>
                <h1 class="font-xl text-white text-high-emphasis">
                  {{ formatCurrency(storePeople.getTotalPotentialTaxIncome, 4) }}
                </h1>
              </div>
            </BaseTile>
          </v-col>
        </v-row>
      </v-container>

      <!-- search -->
      <div class="py-8">
        <BaseInput
          v-model="search"
          variant="solo"
          placeholder='Explore the UK&apos;s top 350 richest "people"'
          icon="mdi-magnify"
          icon-position="prepend-inner"
          height="60"
          bg-color="neutral-200"
          autofocus
        >
          <template v-slot:prepend-inner>
            <v-icon size="28">mdi mdi-magnify</v-icon>
          </template>
        </BaseInput>
      </div>

      <!-- table -->
      <BaseTable
        :search="search"
        :headers="richListTable.headers"
        :items="storePeople.people"
        :filter-keys="richListTable.filterKeys"
        :items-per-page="10"
        :hide-actions="false"
        :hide-external-pagination="false"
        class="table table-home rounded"
      >
        <!-- rank col -->
        <template v-slot:item.rank="{ item }">
          <span class="font-base">#{{ item.rank }}</span>
        </template>

        <!-- name col -->
        <template v-slot:item.name="{ item }">
          <p class="font-base font-weight-bold">{{ item.name }}</p>
          <p class="mt-1 text-medium-emphasis">{{ item.sourceOfWealth }}</p>
        </template>

        <!-- worth col -->
        <template v-slot:item.worthGross="{ item }">
          <span class="font-lg font-weight-bold">{{ formatCurrency(item.worthGross) }}</span>
        </template>

        <!-- actions col -->
        <template v-slot:item.actions="{ item }">
          <div class="button-bordered">
            <BaseButton
              variant="flat"
              color="background"
              class="font-md font-weight-bold text-none"
              width="78"
              height="46"
              :disabled="item.isSelected"
              @click="addPerson(item)"
            >
              <v-icon v-if="item.isSelected" size="28">mdi-check</v-icon>
              <span v-else>Add</span>
            </BaseButton>
          </div>
        </template>

        <!-- no data -->
        <template v-slot:no-data>
          <div class="text-center">
            <p class="font-base text-white text-high-emphasis">No results found</p>
          </div>
        </template>
      </BaseTable>

      <!-- basket -->
      <TheBasket :data="storeBasket.people" />
    </main>
  </div>
</template>

<style scoped lang="scss">
.header {
  width: 100%;
  height: 350px;
  position: relative;
  z-index: 1;
}

.main__home {
  margin: -350px auto 0 auto;
}
</style>
