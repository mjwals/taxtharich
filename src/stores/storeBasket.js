import { defineStore } from 'pinia'
import { calculateWorthNet, calculateTotalTax } from '@/common/utils.js'

export const useStoreBasket = defineStore('storeBasket', {
  state: () => {
    return {
      people: [],
      taxRate: 1
    }
  },
  actions: {
    add(person) {
      this.people.push({
        ...person
      })
    },
    setTaxRate(taxRate) {
      this.taxRate = taxRate
    },
    remove(person) {
      this.people = this.people.filter((p) => p.id !== person.id)
    },
    removeAll() {
      this.people = []
    },
    submit() {
      this.people.forEach((p) => (p.worthNet = calculateWorthNet(this.taxRate, p.worthGross)))
      this.people.forEach((p) => (p.tax = calculateTotalTax(this.taxRate, p.worthGross)))
    }
  },
  getters: {
    getTotalBasketWealth(state) {
      return state.people.reduce((acc, p) => {
        acc = acc + p.tax
        return acc
      }, 0)
    }
  }
})
