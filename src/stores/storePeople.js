import { defineStore } from 'pinia'
import { calculateTotalTax } from '@/common/utils.js'

export const useStorePeople = defineStore('storePeople', {
  state: () => {
    return {
      people: []
    }
  },
  actions: {
    setStoreData(data) {
      this.people = data
    },
    setBtnDisabled(person) {
      if (person) {
        this.people.find((p) => {
          if (p.id === person.id) {
            p.isSelected = !p.isSelected
          }
        })
      } else {
        this.people.forEach((p) => {
          p.isSelected = false
        })
      }
    }
  },
  getters: {
    getTotalPeople: (state) => state.people.length,
    getTotalWealth: (state) => {
      return state.people.reduce((acc, p) => {
        acc = acc + p.worthGross
        return acc
      }, 0)
    },
    getTotalPotentialTaxIncome: (state) => {
      const taxRate = 1

      return state.people.reduce((acc, p) => {
        acc = acc + calculateTotalTax(taxRate, p.worthGross)
        return acc
      }, 0)
    }
  }
})
