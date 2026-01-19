<script setup>
import { RouterView } from 'vue-router'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'
import { useStorePeople } from '@/stores/storePeople.js'
import { convertToMillions } from '@/common/utils.js'
import BaseError from '@/components/BaseError.vue';

// init store
const storePeople = useStorePeople()

// init data from api
const getAppData = async () => {
  try {
    const res = await axios.get(
      'https://extras.thetimes.co.uk/web/2024/full-tables/full-table-rich-list.json'
    )

    return res.data.tableData.map((i) => {
      return {
        id: uuidv4(),
        rank: i.rank,
        name: i.name,
        worthGross: convertToMillions(i.worth),
        worthNet: 0,
        tax: 0,
        sourceOfWealth: i.source,
        isSelected: false
      }
    })
  } catch (error) {
    console.error('Error fetching data', error)
    return []
  }
}

const setAppData = async () => {
  // assign api data to store
  storePeople.setStoreData(await getAppData())
}

setAppData()
</script>

<template>
  <RouterView />

  <!-- mobile resize message -->
  <div class="wrapper d-block d-md-none bg-neutral-100">
    <div class="d-flex h-100 pa-8 overflow-auto">
      <div class="d-flex flex-column align-center ma-auto">
        <BaseError errorHeading="Whoops!" errorMessage="Make the window bigger to see more." />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
html,
body,
#app {
  height: 100%;
  overflow: hidden !important;
}

.wrapper {
  height: 100%;
  overflow: auto !important;
}

.main {
  max-width: 964px;
  padding: 32px;
  position: relative;
  z-index: 2;
  margin: 0 auto;
}
</style>
