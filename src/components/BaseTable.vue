<script setup>
import { ref, computed } from 'vue'
import { useStorePeople } from '@/stores/storePeople.js'

const storePeople = useStorePeople()

const props = defineProps({
  headers: {
    type: Array,
    required: true
  },
  items: {
    type: Array,
    required: true
  },
  search: {
    type: String,
    default: ''
  },
  filterKeys: {
    type: [String, Array],
    default: ''
  },
  itemsPerPage: {
    type: Number,
    default: 10
  },
  hideDefaultFooter: {
    type: Boolean,
    default: true
  },
  hideExternalPagination: {
    type: Boolean,
    default: true
  },
  totalVisible: {
    type: Number,
    default: 4
  },
  chipColor: {
    type: String,
    default: ''
  }
})

// pagination
const page = ref(1)

const pageCount = computed(() => {
  return Math.ceil(storePeople.getTotalPeople / props.itemsPerPage)
})
</script>

<template>
  <v-data-table
    v-bind="$attrs"
    :page.sync="page"
    :headers="headers"
    :items="items"
    :search="search"
    :filter-keys="filterKeys"
    :items-per-page="itemsPerPage"
    :hide-default-footer="hideDefaultFooter"
  >
    <template v-for="header in headers" :key="header.key" v-slot:[`item.${header.key}`]="{ item }">
      <slot :name="`item.${header.key}`" :item="item"></slot>
    </template>

    <template v-slot:no-data>
      <slot name="no-data"></slot>
    </template>
  </v-data-table>

  <!-- pagination -->
  <div v-if="!hideExternalPagination" class="mt-8">
    <v-pagination v-model="page" :length="pageCount" :total-visible="totalVisible"></v-pagination>
  </div>
</template>

<style lang="scss" scoped>
@use 'sass:map';

.table.v-data-table {
  background-color: rgb(var(--v-theme-neutral-200));
}

.table :deep(thead) {
  tr {
    th {
      height: 46px !important;
      font-size: map.get($font-sizes, 'base');
      font-weight: normal !important;
      padding: 0 20px !important;
      color: rgba(255, 255, 255, var(--v-medium-emphasis-opacity));
    }
  }
}

.table :deep(tbody) {
  tr {
    height: 108px !important;

    td {
      padding: 20px !important;
    }
  }
}

// pagination styles
.v-pagination :deep(.v-pagination__item) {
  .v-btn {
    &:hover {
      background-color: rgb(var(--v-theme-neutral-200));
    }

    .v-btn__overlay {
      background: inherit !important;
    }
  }

  // active button
  &.v-pagination__item--is-active {
    .v-btn {
      background-color: rgb(var(--v-theme-neutral-200));

      .v-btn__overlay {
        background: inherit !important;
      }
    }
  }
}

// next/prev buttons
.v-pagination :deep(.v-pagination__prev),
.v-pagination :deep(.v-pagination__next) {
  .v-btn {
    &:hover {
      background-color: rgb(var(--v-theme-neutral-200));
    }

    .v-btn__overlay {
      background: inherit !important;
    }
  }
}
</style>
