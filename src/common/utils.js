// returns a number in millions
export const convertToMillions = (value) => {
  return value * 1e6
}

export const formatCurrency = (value, maxDigits = 5, removeCurrencyUnits = false) => {
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat
  const formattedCurrency = new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    maximumSignificantDigits: maxDigits,
    notation: 'compact'
  }).format(value)

  // removes £MB symbols from string if true
  return removeCurrencyUnits ? formattedCurrency.replaceAll(/[£MB]/g, '') : formattedCurrency
}

// returns the tax a person would pay
export const calculateTotalTax = (taxRate, grossWorth) => {
  const taxRateToDecimal = taxRate / 100
  const tenMillion = 10 * 1e6

  // add assets above 1B later
  // assets above 10M
  if (grossWorth > tenMillion) {
    return taxRateToDecimal * (grossWorth - tenMillion)
  } else {
    return 0
  }
}

// returns a person's wealth after tax
export const calculateWorthNet = (taxRate, grossWorth) => {
  const taxableAmount = calculateTotalTax(taxRate, grossWorth)

  return grossWorth - taxableAmount
}

// display images
export const getImage = (path) => {
  return new URL(`../assets/images/${path}`, import.meta.url).href
}
